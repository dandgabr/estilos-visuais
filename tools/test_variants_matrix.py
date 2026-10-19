"""Responsive default/alternate QA for authored candidates in a review fixture.

With no --slugs, this is the release-wide gate and fails closed if any canonical
style lacks an alternate source. A selected pilot run measures only those real
authored candidates; it never fabricates approval metadata.
"""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import threading

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / "tools"
sys.path.insert(0, str(TOOLS))

from chromium_runtime import chromium_executable  # noqa: E402
import generate_variant_design as generator  # noqa: E402

VIEWPORTS = (320, 375, 768, 1054, 1280)
STATES = ("default", "alternate")
LEGACY_IDS = ("c1", "c2", "c3", "e1", "e2", "e3")


def has_running_motion(nodes):
    """Return true when a target or descendant has a running Web Animation."""
    return any(
        animation.get("playState") == "running" and animation.get("currentTime") is not None
        for node in nodes
        for animation in node.get("animations", [])
    )


def running_motion_advanced(before, after):
    """Match each target/descendant animation independently and require clock progress."""
    def indexed(nodes):
        result = {}
        for node_index, node in enumerate(nodes):
            counts = {}
            for animation in node.get("animations", []):
                if animation.get("playState") != "running" or animation.get("currentTime") is None:
                    continue
                name = animation.get("name", "")
                ordinal = counts.get(name, 0)
                counts[name] = ordinal + 1
                result[(node_index, name, ordinal)] = animation["currentTime"]
        return result

    previous, current = indexed(before), indexed(after)
    return any(key in current and current[key] > time for key, time in previous.items())


MOTION_NODES_JS = """selector => {
  const target = document.querySelector(selector);
  if (!target) return [];
  const timeValue = animation => {
    const time = animation.currentTime;
    if (time == null) return null;
    if (typeof time === 'number') return time;
    if (typeof time.value === 'number') return time.value;
    const numeric = Number(time);
    return Number.isFinite(numeric) ? numeric : null;
  };
  return [target, ...target.querySelectorAll('*')].map(element => ({
    transform: typeof getComputedStyle === 'function' ? getComputedStyle(element).transform : '',
    animations: element.getAnimations().map(animation => ({
      name: animation.animationName || '',
      playState: animation.playState,
      currentTime: timeValue(animation),
    })),
  }));
}"""

BACKGROUND_PSEUDO_MOTION_JS = """selector => {
  const stage = document.querySelector(selector);
  if (!stage) return [];
  const timeValue = animation => {
    const time = animation.currentTime;
    if (time == null) return null;
    if (typeof time === 'number') return time;
    if (typeof time.value === 'number') return time.value;
    const numeric = Number(time);
    return Number.isFinite(numeric) ? numeric : null;
  };
  return ['::before', '::after'].map(pseudo => ({
    pseudo,
    computedNames: getComputedStyle(stage, pseudo).animationName.split(',').map(name => name.trim()),
    computedTransform: getComputedStyle(stage, pseudo).transform,
    computedOpacity: getComputedStyle(stage, pseudo).opacity,
    animations: document.getAnimations()
      .filter(animation => animation.effect?.target === stage && animation.effect?.pseudoElement === pseudo)
      .map(animation => ({
        name: animation.animationName || '',
        playState: animation.playState,
        currentTime: timeValue(animation),
      })),
  }));
}"""


def background_motion_advanced(before, after):
    """Require each running pseudo-element animation to advance, regardless of keyframe name."""
    before_running = {
        (pseudo["pseudo"], animation["name"]): animation
        for pseudo in before
        for animation in pseudo.get("animations", [])
        if animation.get("playState") == "running" and animation.get("currentTime") is not None
    }
    after_running = {
        (pseudo["pseudo"], animation["name"]): animation
        for pseudo in after
        for animation in pseudo.get("animations", [])
        if animation.get("playState") == "running" and animation.get("currentTime") is not None
    }
    return bool(before_running) and all(
        key in after_running and after_running[key]["currentTime"] > animation["currentTime"]
        for key, animation in before_running.items()
    )


def background_motion_is_reduced(pseudos):
    """Accept canceled/absent or paused pseudo animations, never running motion."""
    for pseudo in pseudos:
        animations = pseudo.get("animations", [])
        if animations:
            if any(animation.get("playState") not in ("paused", "idle") for animation in animations):
                return False
        elif any(name not in ("", "none") for name in pseudo.get("computedNames", [])):
            return False
    return bool(pseudos)


def visual_motion_advanced(before, after):
    """Accept CSS scroll/view timelines when scrolling changes the rendered transform."""
    for index, item in enumerate(before):
        if index >= len(after):
            continue
        current = after[index]
        if item.get("computedTransform") != current.get("computedTransform"):
            return True
        if item.get("computedOpacity") != current.get("computedOpacity"):
            return True
        if item.get("transform") != current.get("transform"):
            return True
    return False


def timeline_progressed(before, after):
    """Compare scroll/view timeline offsets even when the browser labels them finished."""
    def keyed(nodes):
        values = {}
        for node_index, node in enumerate(nodes):
            counts = {}
            for animation in node.get("animations", []):
                value = animation.get("currentTime")
                name = animation.get("name", "")
                ordinal = counts.get(name, 0)
                counts[name] = ordinal + 1
                values[(node_index, name, ordinal)] = value
        return values

    previous, current = keyed(before), keyed(after)
    # Scroll/view timelines can be unresolved (currentTime=None) at the top of
    # the page and acquire a numeric offset only after the source scrolls.
    return any(
        key in current and current[key] is not None and current[key] != value
        for key, value in previous.items()
    )


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format, *_args):
        pass


class FixtureServer:
    def __init__(self, root):
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root)))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.server.server_port}"

    def close(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)


def inventory():
    slugs = generator.canonical_slugs(ROOT)
    sources = generator.load_sources(ROOT / "styles/variants/source", slugs, allow_missing=True, snapshot_root=ROOT)
    return slugs, sources


def require_candidates(slugs, sources):
    missing = [slug for slug in slugs if slug not in sources]
    if missing:
        raise ValueError(
            "alternate matrix requires authored source for every selected style; "
            f"missing {len(missing)}: {', '.join(missing)}"
        )
    return sources


def generate_review_fixture(root, slugs):
    command = [sys.executable, str(TOOLS / "generate_variant_design.py"), "--review-root", str(root), "--slugs", *slugs]
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True, check=False)
    if result.returncode:
        raise AssertionError(f"review fixture generation failed: {result.stderr}")
    fixture_sources = generator.load_sources(root / "styles/variants/source", slugs, snapshot_root=root)
    registry_script = "import {VARIANTS,BUILD_KIND} from './styles/variants/registry.js'; console.log(JSON.stringify({variants:VARIANTS,build:BUILD_KIND}));"
    registry_result = subprocess.run(
        ["node", "--input-type=module", "-e", registry_script],
        cwd=root,
        text=True,
        capture_output=True,
        check=True,
    )
    artifact = json.loads(registry_result.stdout.strip().splitlines()[-1])
    if artifact["build"] != "review":
        raise AssertionError("matrix fixture must use BUILD_KIND=review")
    for slug in slugs:
        entries = artifact["variants"][slug]
        if set(entries) != set(STATES):
            raise AssertionError(f"{slug}: fixture must expose exactly default and alternate")
        if entries["alternate"]["status"] != fixture_sources[slug]["status"]:
            raise AssertionError(f"{slug}: fixture altered the authored review status")
    return fixture_sources, artifact["variants"]


def bounds(page):
    return page.evaluate("""() => {
      const stage=document.querySelector('#stage'), r=stage.getBoundingClientRect();
      const controls=[...stage.querySelectorAll('button,a,input,select,textarea,[role=button]')].filter(e=>{const s=getComputedStyle(e),b=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&b.width>0&&b.height>0&&!e.closest('[hidden]')});
      const bad=controls.filter(e=>{const b=e.getBoundingClientRect(),wrap=e.closest('.table-wrap'),scrollable=wrap&&wrap.scrollWidth>wrap.clientWidth;return !scrollable&&(b.left<r.left-1||b.right>r.right+1)}).map(e=>({selector:e.className||e.tagName,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right}));
      const clipped=[];
      for(const e of controls){const b=e.getBoundingClientRect();for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const s=getComputedStyle(a),ar=a.getBoundingClientRect(),left=ar.left+a.clientLeft,top=ar.top+a.clientTop,right=left+a.clientWidth,bottom=top+a.clientHeight;const cutsX=['hidden','clip'].includes(s.overflowX)&&(b.left<left-1||b.right>right+1),cutsY=['hidden','clip'].includes(s.overflowY)&&(b.top<top-1||b.bottom>bottom+1);if(cutsX||cutsY){clipped.push({selector:e.className||e.tagName,ancestor:a.className||a.tagName,axes:[cutsX?'x':null,cutsY?'y':null].filter(Boolean)});break}}}
      const overlaps=[];
      for(const grid of (stage.dataset.style==='bento-grid' ? stage.querySelectorAll('.grid') : [])) {
        const items=[...grid.children].filter(e=>{const b=e.getBoundingClientRect(),s=getComputedStyle(e);return b.width>1&&b.height>1&&s.display!=='none'});
        for(let i=0;i<items.length;i++) for(let j=i+1;j<items.length;j++) {
          const a=items[i].getBoundingClientRect(),b=items[j].getBoundingClientRect();
          const w=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left)),h=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
          if(w*h>4) overlaps.push({first:items[i].className||items[i].tagName,second:items[j].className||items[j].tagName,area:Math.round(w*h)});
        }
      }
      return {overflow:document.documentElement.scrollWidth>innerWidth+1||r.bottom>innerHeight+1||r.top<0,bad,clipped,overlaps};
    }""")


def contrast(page):
    return page.locator("#stage").evaluate("""e => {
      const c=getComputedStyle(e);
      const cssColor=x=>{const el=document.createElement('i');el.style.color=x.trim();document.body.append(el);const value=getComputedStyle(el).color;el.remove();return value};
      const rgb=x=>{const m=cssColor(x).match(/[\\d.]+/g).map(Number);return m.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4})};
      const lum=x=>{const [r,g,b]=rgb(x);return .2126*r+.7152*g+.0722*b};
      const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
      return {textBg:ratio(c.getPropertyValue('--fg'),c.getPropertyValue('--bg')),textSurface:ratio(c.getPropertyValue('--fg'),c.getPropertyValue('--surface')),muted:ratio(c.getPropertyValue('--muted'),c.getPropertyValue('--surface')),accent:ratio(c.getPropertyValue('--accent-fg'),c.getPropertyValue('--accent')),borderBg:ratio(c.getPropertyValue('--border'),c.getPropertyValue('--bg')),borderSurface:ratio(c.getPropertyValue('--border'),c.getPropertyValue('--surface')),borderSurface2:ratio(c.getPropertyValue('--border'),c.getPropertyValue('--surface-2'))};
    }""")


def rendered_text_contrast(page):
    """Measure actual visible text against its nearest rendered solid background."""
    return page.locator("#stage").evaluate("""stage => {
      const parse = value => {
        const m = value.match(/rgba?\\(([^)]+)\\)/i);
        if (!m) return null;
        const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
        return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};
      };
      const over = (a,b) => ({r:a.r*a.a+b.r*(1-a.a),g:a.g*a.a+b.g*(1-a.a),b:a.b*a.a+b.b*(1-a.a),a:1});
      const lum = c => { const f=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}; return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b); };
      const walker=document.createTreeWalker(stage,NodeFilter.SHOW_TEXT), seen=new Set(), issues=[];
      while(walker.nextNode()) {
        const node=walker.currentNode, text=node.nodeValue.trim(), el=node.parentElement;
        if(!text||!el||seen.has(el)) continue; seen.add(el);
        const cs=getComputedStyle(el), rect=el.getBoundingClientRect();
        if(cs.display==='none'||cs.visibility==='hidden'||Number(cs.opacity)===0||rect.width<2||rect.height<2) continue;
        const fill=cs.webkitTextFillColor && cs.webkitTextFillColor!=='currentcolor' ? cs.webkitTextFillColor : cs.color;
        let fg=parse(fill), bg={r:255,g:255,b:255,a:1}, opacity=1, complex=false;
        const layers=[];
        for(let cur=el;cur;cur=cur.parentElement) {
          const style=getComputedStyle(cur); opacity*=Number(style.opacity);
          if(style.backgroundImage!=='none') complex=true;
          const color=parse(style.backgroundColor); if(color&&color.a>0) layers.push(color);
          // An opaque panel hides ancestor artwork. Only paint that can
          // actually show through belongs in this contrast calculation.
          if((color&&color.a>=1)||cur===stage) break;
        }
        for(const color of layers.reverse()) bg=over(color,bg);
        // Raster/pattern/gradient paint needs pixel sampling; avoid declaring a
        // failure from its underlay, and skip transparent gradient-clipped text.
        if(!fg || fg.a < 0.05 || complex) continue;
        const alpha=fg.a*opacity;
        fg={r:fg.r*alpha+bg.r*(1-alpha),g:fg.g*alpha+bg.g*(1-alpha),b:fg.b*alpha+bg.b*(1-alpha),a:1};
        const l1=lum(fg),l2=lum(bg),ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);
        const size=parseFloat(cs.fontSize), bold=parseInt(cs.fontWeight)>=700, threshold=(size>=24||(size>=18.66&&bold))?3:4.5;
        if(ratio<threshold) issues.push({text:text.slice(0,80),selector:el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className.trim()?'.'+el.className.trim().split(/\\s+/).join('.'):''),color:fill,background:`rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,ratio:+ratio.toFixed(2),threshold,complexBackground:complex});
      }
      return issues;
    }""")


def split_screen_layout(page, slug, state, width, failures):
    if slug != "split-screen-dualism":
        return
    if width >= 861:
        geometry = page.evaluate("""() => {
          const stage=document.querySelector('#stage').getBoundingClientRect();
          const hero=document.querySelector('#view-painel > .hero').getBoundingClientRect();
          const metrics=document.querySelector('#view-painel > section[aria-labelledby="t-metricas"]').getBoundingClientRect();
          const middle=stage.left+stage.width/2;
          return {middle,hero:{left:hero.left,right:hero.right,top:hero.top},metrics:{left:metrics.left,right:metrics.right,top:metrics.top}};
        }""")
        if abs(geometry["hero"]["top"]-geometry["metrics"]["top"]) > 3 or geometry["hero"]["right"] > geometry["middle"]+2 or geometry["metrics"]["left"] < geometry["middle"]-2:
            failures.append({"slug":slug,"variant":state,"width":width,"splitLayout":"dashboard content does not stay on opposite sides of the meridian","geometry":geometry})
        if width == 1280:
            page.locator("#tab-projetos").click()
            page.wait_for_function("!document.querySelector('#view-projetos')?.hasAttribute('hidden')")
            project = page.locator("#view-projetos .kanban-col").evaluate_all("els => els.map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right}})")
            middle = page.locator("#stage").evaluate("e=>{const r=e.getBoundingClientRect();return r.left+r.width/2}")
            if len(project) < 3 or project[0]["right"] > middle+2 or any(item["left"] < middle-2 for item in project[1:3]):
                failures.append({"slug":slug,"variant":state,"width":width,"splitLayout":"Kanban columns cross the visual meridian","geometry":{"middle":middle,"columns":project}})
            page.locator("#tab-equipe").click()
            page.wait_for_function("!document.querySelector('#view-equipe')?.hasAttribute('hidden')")
            team = page.locator("#view-equipe .team-grid > *").evaluate_all("els => els.map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right}})")
            if any((item["right"] > middle+2 if index%2==0 else item["left"] < middle-2) for index,item in enumerate(team)):
                failures.append({"slug":slug,"variant":state,"width":width,"splitLayout":"team cards cross the visual meridian","geometry":{"middle":middle,"cards":team}})
            page.locator("#tab-relatorios").click()
            page.wait_for_function("!document.querySelector('#view-relatorios')?.hasAttribute('hidden')")
            analytics = page.locator("#view-relatorios .analytics-strip > *").evaluate_all("els => els.map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right}})")
            if any((item["right"] > middle+2 if index%2==0 else item["left"] < middle-2) for index,item in enumerate(analytics)):
                failures.append({"slug":slug,"variant":state,"width":width,"splitLayout":"analytics cards cross the visual meridian","geometry":{"middle":middle,"cards":analytics}})
            page.locator("#tab-painel").click()
            page.wait_for_function("!document.querySelector('#view-painel')?.hasAttribute('hidden')")


def navigation_interaction(page, slug, state, width, failures):
    """Verify every theme's four visible navigation tabs switch their content panes."""
    if width != 1280:
        return
    for view in ("projetos", "equipe", "relatorios", "painel"):
        page.locator(f"#tab-{view}").click()
        try:
            page.wait_for_function(
                "view => { const panes=[...document.querySelectorAll('.view-pane')].filter(e=>!e.hidden&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>0); return panes.length===1&&panes[0].id===`view-${view}`; }",
                arg=view,
            )
        except Exception:
            failures.append({"slug": slug, "variant": state, "navigation": f"tab {view} did not open its pane"})
            break
        if view == "projetos":
            spacing = page.evaluate("""() => {
              const stage=document.querySelector('#stage').getBoundingClientRect();
              const controls=[...document.querySelectorAll('#view-projetos .view-header .view-actions > *')].map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right}});
              return {left:controls.length?Math.min(...controls.map(x=>x.left))-stage.left:null,right:controls.length?stage.right-Math.max(...controls.map(x=>x.right)):null};
            }""")
            if any(value is not None and value < 8 for value in spacing.values()):
                failures.append({"slug":slug,"variant":state,"width":width,"spacing":"project header actions are too close to the stage edge","clearance":spacing})


def view_header_alignment(page, slug, state, width, failures):
    """Check that title/subtitle groups and action buttons share a vertical center when they form one toolbar row."""
    for view in ("projetos", "equipe", "relatorios"):
        page.locator(f"#tab-{view}").click()
        page.wait_for_function("view => !document.querySelector(`#view-${view}`)?.hidden", arg=view)
        alignment = page.evaluate("""view => {
          const header=document.querySelector(`#view-${view} .view-header`);
          const title=header?.firstElementChild, actions=header?.querySelector('.view-actions');
          if(!header||!title||!actions) return {skipped:'missing header groups'};
          const a=title.getBoundingClientRect(), b=actions.getBoundingClientRect();
          const horizontal=a.right<=b.left+1||b.right<=a.left+1;
          const vertical=a.bottom>b.top+1&&b.bottom>a.top+1;
          if(!horizontal||!vertical) return {skipped:'responsive groups are not side by side'};
          return {titleCenter:(a.top+a.bottom)/2,actionsCenter:(b.top+b.bottom)/2,delta:Math.abs((a.top+a.bottom-b.top-b.bottom)/2)};
        }""", view)
        if "delta" in alignment and alignment["delta"] > 2:
            failures.append({"slug":slug,"variant":state,"width":width,"view":view,"alignment":"heading group and action buttons are not vertically centered","geometry":alignment})
    page.locator("#tab-painel").click()
    page.wait_for_function("!document.querySelector('#view-painel')?.hidden")


def reported_theme_layout(page, slug, state, width, failures):
    if slug == "y2k-revival" and state == "alternate":
        y2k_surfaces = page.evaluate("""() => {
          const stage=document.querySelector('#stage'),hero=document.querySelector('#view-painel .hero');
          const nav=document.querySelector('#stage .nav a, #stage .nav-tab'),topbar=document.querySelector('#stage .topbar');
          return {stageImage:getComputedStyle(stage).backgroundImage,displayFill:getComputedStyle(hero.querySelector('.display')).webkitTextFillColor,navColor:getComputedStyle(nav).color,topbarColor:getComputedStyle(topbar).color,topbarBackground:getComputedStyle(topbar).backgroundColor};
        }""")
        if y2k_surfaces["stageImage"] != "none" or y2k_surfaces["displayFill"] == "rgba(0, 0, 0, 0)" or y2k_surfaces["navColor"] == y2k_surfaces["topbarBackground"]:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"dark alternate retains light glass artwork or low-contrast text","surfaces":y2k_surfaces})
    if width == VIEWPORTS[0]:
        unthemed_controls = page.evaluate("""() => [...document.querySelectorAll('#stage input[type=checkbox],#stage input[type=range]')]
          .filter(input=>getComputedStyle(input).appearance!=='none' && getComputedStyle(input).accentColor==='auto')
          .map(input=>({type:input.type,appearance:getComputedStyle(input).appearance}));""")
        if unthemed_controls:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedControls":"native form control falls back to browser accent color","controls":unthemed_controls})
        inline_alignment = page.evaluate("""() => [...document.querySelectorAll('#view-painel .panel label.inline')].map(label=>{
          const input=label.querySelector('input'),text=label.querySelector('span');
          if(!input||!text) return {valid:false};
          const a=input.getBoundingClientRect(),b=text.getBoundingClientRect();
          return {valid:true,gap:b.left-a.right,display:getComputedStyle(label).display,justify:getComputedStyle(label).justifyContent};
        })""")
        if any(not item["valid"] or item["gap"] < -1 or item["gap"] > 20 for item in inline_alignment):
            failures.append({"slug":slug,"variant":state,"width":width,"reportedControls":"inline checkbox and label are not kept together","alignment":inline_alignment})
    if slug == "arts-and-crafts" and state == "alternate":
        theme_surfaces = page.evaluate("""() => {
          const stage=document.querySelector('#stage'),toast=document.querySelector('.toast'),label=toast.querySelector('span');
          return {backgroundImage:getComputedStyle(stage).backgroundImage,toastColor:getComputedStyle(label).color,toastBackground:getComputedStyle(toast).backgroundColor};
        }""")
        if theme_surfaces["backgroundImage"] != "none":
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"alternate light surface retains canonical dark background artwork","surfaces":theme_surfaces})
        if theme_surfaces["toastColor"] == theme_surfaces["toastBackground"]:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedControls":"success notice text matches its background","surfaces":theme_surfaces})
    if slug in ("synthwave", "vaporwave") and state == "alternate":
        theme_surfaces = page.evaluate("""() => {
          const stage=document.querySelector('#stage'),toast=document.querySelector('.toast'),label=toast?.querySelector('span');
          const rgb=value=>value.match(/[\\d.]+/g)?.slice(0,3).map(Number)||[0,0,0];
          const luminance=value=>{const channels=rgb(value).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4});return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722};
          const toastColor=label?getComputedStyle(label).color:'';
          const toastBackground=toast?getComputedStyle(toast).backgroundColor:'';
          const l1=luminance(toastColor),l2=luminance(toastBackground);
          return {backgroundImage:getComputedStyle(stage).backgroundImage,toastColor,toastBackground,toastContrast:(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)};
        }""")
        if theme_surfaces["backgroundImage"] != "none":
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"light alternate retains canonical dark background artwork","surfaces":theme_surfaces})
        if theme_surfaces["toastContrast"] < 4.5:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedControls":"success notice text lacks contrast on its background","surfaces":theme_surfaces})
    if slug == "retro-computing" and state == "alternate":
        workbench_surfaces = page.evaluate("""() => {
          const stage=document.querySelector('#stage'),title=document.querySelector('.section-title');
          const style=getComputedStyle(title),bg=getComputedStyle(stage).backgroundColor;
          return {backgroundImage:getComputedStyle(stage).backgroundImage,background:bg,titleColor:style.color,textShadow:getComputedStyle(title).textShadow};
        }""")
        if workbench_surfaces["backgroundImage"] != "none" or workbench_surfaces["textShadow"] != "none":
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"light Workbench variant retains the terminal backdrop or glowing text","surfaces":workbench_surfaces})
    if slug == "pixel-art" and state == "alternate":
        title_surface = page.evaluate("""() => {
          const title=document.querySelector('.section-title'),style=getComputedStyle(title);
          return {background:style.backgroundColor,color:style.color,display:style.display};
        }""")
        if title_surface["background"] in ("rgba(0, 0, 0, 0)", "transparent"):
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"8-bit headings are placed directly on the checkerboard","surface":title_surface})
    if slug == "cyberpunk" and state == "alternate":
        cyberpunk_surfaces = page.evaluate("""() => {
          const hero=document.querySelector('#view-painel .hero'),feature=document.querySelector('#view-painel .feature'),title=hero.querySelector('.display');
          const fit=title.getBoundingClientRect().right<=hero.getBoundingClientRect().right+1;
          const scan=getComputedStyle(document.querySelector('#stage'),'::before');
          return {hero:getComputedStyle(hero).backgroundColor,feature:getComputedStyle(feature).backgroundColor,featureImage:getComputedStyle(feature).backgroundImage,scanOverlay:{display:scan.display,opacity:Number(scan.opacity),image:scan.backgroundImage},titleFits:fit};
        }""")
        if cyberpunk_surfaces["featureImage"] != "none" or cyberpunk_surfaces["scanOverlay"]["display"] != "none" or not cyberpunk_surfaces["titleFits"]:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"light Cyberpunk has inherited dark panels, scan overlay, or clipped hero title","surfaces":cyberpunk_surfaces})
    if slug == "atompunk" and state == "alternate":
        atompunk_hero = page.evaluate("""() => {
          const hero=document.querySelector('#view-painel .hero'),title=hero.querySelector('.display');
          return {background:getComputedStyle(hero).backgroundColor,titleColor:getComputedStyle(title).color,titleShadow:getComputedStyle(title).textShadow};
        }""")
        if atompunk_hero["titleShadow"] != "none":
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"light AtomPunk hero title retains phosphor glow","hero":atompunk_hero})
    if slug == "dracula" and state == "alternate":
        feature_heading = page.evaluate("""() => {const grid=document.querySelector('#view-painel .grid'),g=getComputedStyle(grid),r=grid.getBoundingClientRect();return {grid:{width:r.width,columns:g.gridTemplateColumns,display:g.display},headings:[...grid.querySelectorAll('.feature h3')].map(title=>{const s=getComputedStyle(title),r=title.getBoundingClientRect(),p=title.parentElement.getBoundingClientRect();return {scrollWidth:title.scrollWidth,clientWidth:title.clientWidth,display:s.display,width:s.width,minWidth:s.minWidth,whiteSpace:s.whiteSpace,writingMode:s.writingMode,overflow:s.overflow,rectWidth:r.width,parentWidth:p.width,right:r.right,parentRight:p.right}})}}""")
        if any(item["clientWidth"] < 40 or item["scrollWidth"] > item["clientWidth"]+1 or item["right"] > item["parentRight"]+1 for item in feature_heading["headings"]):
            failures.append({"slug":slug,"variant":state,"width":width,"reportedLayout":"Dracula resource card heading escapes its available width","headings":feature_heading})
    if slug == "dungeon-synth":
        brand_contrast = page.evaluate("""() => {
          const brand=document.querySelector('.brand'),bar=document.querySelector('.topbar'),rgb=s=>s.match(/[\\d.]+/g).slice(0,3).map(Number);
          const lum=s=>rgb(s).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
          const a=lum(getComputedStyle(brand).color),b=lum(getComputedStyle(bar).backgroundColor);
          const title=document.querySelector('.hero .display'),hero=document.querySelector('.hero');
          return {ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),mark:getComputedStyle(document.querySelector('.brand-mark')).backgroundColor,heroBackground:getComputedStyle(hero).backgroundColor,heroImage:getComputedStyle(hero).backgroundImage,titleShadow:getComputedStyle(title).textShadow,titleColor:getComputedStyle(title).color};
        }""")
        if brand_contrast["ratio"] < 4.5 or (state == "alternate" and (brand_contrast["heroImage"] != "none" or brand_contrast["titleShadow"] != "none")):
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"Dungeon Synth logo or hero lacks readable contrast","surfaces":brand_contrast})
    if slug in {"dieselpunk", "gothicpunk"} and state == "alternate":
        board_surfaces = page.evaluate("""() => ['.kanban-col','.kanban-card'].map(selector=>{const e=document.querySelector(selector),s=getComputedStyle(e);return {selector,background:s.backgroundColor,image:s.backgroundImage,color:s.color,paragraphColor:getComputedStyle(e.querySelector('p')).color}})""")
        if any(item["image"] != "none" or item["background"] in ("rgb(20, 22, 26)", "rgb(30, 24, 31)") for item in board_surfaces):
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"light kanban board retains a dark painted surface","surfaces":board_surfaces})
    if slug == "indie-web-revival" and state == "alternate":
        table_colors = page.evaluate("""() => {
          const cell=document.querySelector('#view-relatorios td');
          const fg=getComputedStyle(cell).color,bg=getComputedStyle(cell).backgroundColor;
          const rgb=value=>value.match(/[\\d.]+/g)?.slice(0,3).map(Number)||[0,0,0];
          const luminance=value=>{const channels=rgb(value).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4});return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722};
          const a=luminance(fg),b=luminance(bg);
          return {color:fg,background:bg,contrast:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
        }""")
        if table_colors["contrast"] < 4.5:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"dark alternate has unreadable table cells","table":table_colors})
    if slug == "art-nouveau":
        controls = page.evaluate("""() => {
          const probe=document.createElement('span');
          probe.style.color='var(--accent)';
          document.querySelector('#stage').append(probe);
          const accent=getComputedStyle(probe).color;
          probe.remove();
          return [...document.querySelectorAll('#stage input[type=checkbox],#stage input[type=range]')]
            .map(input=>({type:input.type,accent:getComputedStyle(input).accentColor,expected:accent}));
        }""")
        if any(control["accent"] != control["expected"] for control in controls):
            failures.append({"slug":slug,"variant":state,"width":width,"reportedControls":"native checkbox/range uses a foreign accent color","controls":controls})
    toast_size=page.evaluate("""() => {
      const stage=document.querySelector('#stage').getBoundingClientRect(),element=document.querySelector('.toast'),toast=element.getBoundingClientRect(),style=getComputedStyle(element),parent=element.parentElement;
      return {ratio:toast.width/stage.width,width:toast.width,height:toast.height,display:style.display,writingMode:style.writingMode,gridColumn:style.gridColumn,parentClass:parent.className,parentColumns:getComputedStyle(parent).gridTemplateColumns};
    }""")
    if width >= 768 and (toast_size["ratio"]>.75 or toast_size["height"]>120):
        failures.append({"slug":slug,"variant":state,"width":width,"spacing":"success notice stretches into an empty column","toast":toast_size})
    if slug == "expressive-variable-typography" and width >= 1054:
        target=page.locator("#view-painel .feature").first
        if target.count():
            # The dashboard scrolls inside #stage. Bring the card into the
            # viewport before elementFromPoint; otherwise every sample is
            # outside the browser viewport and falsely reports an overlay.
            target.evaluate("e => e.scrollIntoView({block:'center',inline:'nearest'})")
            point=target.evaluate("""e=>{
              const r=e.getBoundingClientRect();
              for(let y=8;y<r.height-8;y+=Math.max(12,r.height/8)) for(let x=8;x<r.width-8;x+=Math.max(12,r.width/8)){
                const hit=document.elementFromPoint(r.left+x,r.top+y);
                if(hit&&(hit===e||e.contains(hit))) return {x:r.left+x,y:r.top+y};
              }
              return null;
            }""")
            if point:
                page.mouse.move(point["x"],point["y"])
                stacking=target.evaluate("e=>({position:getComputedStyle(e).position,zIndex:Number(getComputedStyle(e).zIndex)})")
                if stacking["position"] != "relative" or stacking["zIndex"] < 5:
                    failures.append({"slug":slug,"variant":state,"width":width,"reportedInteraction":"hovered card stays behind adjacent content","stacking":stacking})
            else:
                failures.append({"slug":slug,"variant":state,"width":width,"reportedInteraction":"card is fully blocked by another surface and cannot receive hover"})
    if state != "alternate":
        return
    if slug == "glassmorphism":
        geometry = page.evaluate("""() => {
          const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,top:r.top,right:r.right,bottom:r.bottom,left:r.left}};
          const stage=rect('#stage'),topbar=rect('.topbar'),hero=rect('.hero'),toast=rect('.toast'),chart=rect('.chart');
          const eyebrow=document.querySelector('.eyebrow'),eyebrowStyle=getComputedStyle(eyebrow);
          const bars=[...document.querySelectorAll('.chart .bars i')].map(e=>({height:e.getBoundingClientRect().height,background:getComputedStyle(e).backgroundImage}));
          return {stage,topbar,hero,toast,chart,eyebrow:{background:eyebrowStyle.backgroundColor,color:getComputedStyle(eyebrow).color},bars};
        }""")
        issues=[]
        if geometry["hero"]["left"]-geometry["stage"]["left"] < 16 or geometry["hero"]["top"]-geometry["topbar"]["bottom"] < 12:
            issues.append("hero lacks inset or separation from the top navigation")
        if width >= 1000 and (geometry["toast"]["width"] > geometry["stage"]["width"]*.65 or geometry["toast"]["height"] > 100):
            issues.append("success notice is oversized")
        if not geometry["bars"] or any(bar["height"] < 8 or bar["background"] == "none" for bar in geometry["bars"]):
            issues.append("monthly growth chart bars are missing or invisible")
        if geometry["eyebrow"]["background"] not in ("rgba(0, 0, 0, 0)", "transparent"):
            issues.append("eyebrow retains a dark capsule background")
        if issues:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedLayout":issues,"geometry":geometry})
    if slug == "holographic-foil-iridescent":
        foil=page.evaluate("""() => {
          const hero=document.querySelector('#view-painel .hero'),before=getComputedStyle(hero,'::before'),style=getComputedStyle(hero);
          return {heroImage:style.backgroundImage,heroAnimation:style.animationName,foilOverlay:before.content,overlayImage:before.backgroundImage,overlayAnimation:before.animationName,brand:getComputedStyle(document.querySelector('.brand-mark')).backgroundImage};
        }""")
        if "gradient" not in foil["heroImage"] or foil["foilOverlay"]=="none" or "gradient" not in foil["overlayImage"] or "gradient" not in foil["brand"]:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedLayout":"light counterpart lost its holographic foil accents","foil":foil})

    if slug == "weirdcore" and state == "alternate":
        surfaces = page.evaluate("""() => {
          const stage=document.querySelector('#stage'),hero=document.querySelector('#view-painel .hero');
          const metrics=document.querySelector('#view-painel [aria-labelledby="t-metricas"]');
          const display=document.querySelector('#view-painel .display');
          return {
            filter:getComputedStyle(stage).filter,
            stageBackground:getComputedStyle(stage).backgroundImage,
            heroBackground:getComputedStyle(hero).backgroundColor,
            heroColor:getComputedStyle(hero).color,
            displayColor:getComputedStyle(display).color,
            displayShadow:getComputedStyle(display).textShadow,
            metricsColor:getComputedStyle(metrics.querySelector('.section-title')).color,
            metricsBackground:getComputedStyle(metrics).backgroundColor
          };
        }""")
        issues=[]
        if surfaces["filter"] != "none":
            issues.append("alternate retains the canonical dark-stage filter")
        if surfaces["stageBackground"] != "none":
            issues.append("alternate retains the canonical dark background image")
        if surfaces["heroBackground"] == "rgb(13, 13, 13)":
            issues.append("hero retains the canonical near-black surface")
        if surfaces["displayShadow"] != "none":
            issues.append("display retains the canonical red shadow on the light surface")
        if issues:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedContrast":"light counterpart inherits dark styling","issues":issues,"surfaces":surfaces})

    if slug == "dreamcore" and state == "alternate":
        notice = page.evaluate("""() => {
          const stage=document.querySelector('#stage'),toast=document.querySelector('.toast'),label=toast.querySelector('span');
          return {stageColor:getComputedStyle(stage).backgroundColor,stageImage:getComputedStyle(stage).backgroundImage,
            toastColor:getComputedStyle(toast).color,toastBackground:getComputedStyle(toast).backgroundColor,
            labelColor:getComputedStyle(label).color};
        }""")
        parse=lambda color: [int(channel) for channel in re.findall(r"[\d.]+", color)[:3]]
        luminance=lambda color: sum(weight*(value/255/12.92 if value/255<=.04045 else ((value/255+.055)/1.055)**2) for value,weight in zip(color,(.2126,.7152,.0722)))
        foreground,background=parse(notice["labelColor"]),parse(notice["toastBackground"])
        ratio=(max(luminance(foreground),luminance(background))+.05)/(min(luminance(foreground),luminance(background))+.05)
        if notice["stageColor"] != "rgb(38, 38, 62)" or notice["stageImage"] != "none" or ratio < 4.5:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedContrast":"dark counterpart still appears light or its notice lacks contrast","notice":notice,"textContrastRatio":round(ratio,2)})

    if slug == "zine-independent" and state == "alternate":
        hero=page.evaluate("""() => {
          const element=document.querySelector('#view-painel .hero');
          return {background:getComputedStyle(element).backgroundColor,color:getComputedStyle(element).color,
            displayBackground:getComputedStyle(element.querySelector('.display')).backgroundColor,
            displayColor:getComputedStyle(element.querySelector('.display')).color};
        }""")
        if hero["background"] == "rgb(255, 255, 255)":
            failures.append({"slug":slug,"variant":state,"width":width,"reportedSurface":"dark zine counterpart retains a white paper hero","hero":hero})

    if slug == "collage-scrapbook" and state == "alternate":
        surfaces=page.evaluate("""() => {
          const hero=document.querySelector('#view-painel .hero'),display=hero.querySelector('.display'),field=document.querySelector('#view-painel input[type=text]');
          return {hero:getComputedStyle(hero).backgroundColor,displayBackground:getComputedStyle(display).backgroundColor,
            displayColor:getComputedStyle(display).color,fieldBackground:getComputedStyle(field).backgroundColor,fieldColor:getComputedStyle(field).color};
        }""")
        if surfaces["hero"] == "rgb(255, 255, 255)" or surfaces["fieldBackground"] == "rgb(255, 253, 245)":
            failures.append({"slug":slug,"variant":state,"width":width,"reportedContrast":"dark scrapbook retains light hero or form paper","surfaces":surfaces})

    if slug == "hand-drawn-sketch":
        for tab,pane in (("projetos","#view-projetos"),("equipe","#view-equipe")):
            page.locator(f"#tab-{tab}").click()
            margin=page.evaluate("""pane => {
              const stage=document.querySelector('#stage').getBoundingClientRect(),header=document.querySelector(`${pane} .view-header`);
              return header.getBoundingClientRect().left-stage.left;
            }""",pane)
            expected=60 if width>=900 else 20
            if margin < expected:
                failures.append({"slug":slug,"variant":state,"width":width,"reportedLayout":"secondary view header crosses the notebook red margin","view":tab,"leftInset":round(margin,2),"minimum":expected})
        page.locator("#tab-painel").click()


    if slug == "neumorphism" and width == 1280:
        spacing=page.evaluate("""() => {
          const box=document.querySelector('.topbar').getBoundingClientRect();
          const mark=document.querySelector('.brand-mark').getBoundingClientRect();
          return mark.left-box.left;
        }""")
        if spacing < 18:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedLayout":"brand mark is too close to the topbar edge","spacing":spacing})
    if slug == "metro-modern-ui":
        tiles = page.evaluate("""() => {
          const parse=s=>{const m=s.match(/[\\d.]+/g);return m?m.slice(0,3).map(Number):null};
          const lum=c=>{const f=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
          const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
          return [...document.querySelectorAll('#view-relatorios .analytics-strip .kpi')].map(card=>{
            const rect=card.getBoundingClientRect(), bg=parse(getComputedStyle(card).backgroundColor);
            const badge=card.querySelector('.badge'), br=badge.getBoundingClientRect(), badgeStyle=getComputedStyle(badge), badgeBg=parse(badgeStyle.backgroundColor);
            const fgNodes=[...card.querySelectorAll('.kpi-label,.kpi-value')].map(el=>{
              const style=getComputedStyle(el),color=parse(style.webkitTextFillColor||style.color);
              return {className:el.className,foreground:style.webkitTextFillColor||style.color,background:getComputedStyle(card).backgroundColor,ratio:color&&bg?ratio(color,bg):null};
            });
            const badgeFg=parse(badgeStyle.webkitTextFillColor||badgeStyle.color);
            const badgeContrast=badgeFg&&(badgeBg?.[3]??1)>.9?ratio(badgeFg,badgeBg.slice(0,3)):null;
            return {rect:{top:rect.top,bottom:rect.bottom},badge:{top:br.top,bottom:br.bottom},badgeContrast,text:fgNodes};
          });
        }""")
        tile_issues=[]
        for index,tile in enumerate(tiles):
            if any(item["ratio"] is not None and item["ratio"] < 4.5 for item in tile["text"]):
                tile_issues.append({"tile":index,"problem":"text contrast below 4.5:1","text":tile["text"]})
            if tile.get("badgeContrast") is not None and tile["badgeContrast"] < 4.5:
                tile_issues.append({"tile":index,"problem":"status badge contrast below 4.5:1","badgeContrast":tile["badgeContrast"]})
            bottom_gap=tile["rect"]["bottom"]-tile["badge"]["bottom"]
            if bottom_gap > 28:
                tile_issues.append({"tile":index,"problem":"status badge is not anchored near the bottom edge","bottomGap":bottom_gap})
        if tile_issues:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedLayout":"Metro Modern UI report tile contrast/alignment","issues":tile_issues})
    if slug in {"material-you", "dark-mode-first"} and state == "alternate":
        geometry = page.evaluate("""() => {
          const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
          const form=document.querySelector('#view-painel [data-label-panel="formulário"]');
          const activity=document.querySelector('#view-painel [data-label-panel="registro"]');
          const chart=document.querySelector('#view-painel .chart');
          const controls=[...form.querySelectorAll('input[type=checkbox],input.switch')].map(el=>({type:el.type,width:el.getBoundingClientRect().width,label:el.closest('label')?.innerText.trim()}));
          const inline=[...form.querySelectorAll('label.inline')].map(label=>{const control=label.querySelector('input'),text=label.querySelector('span'),range=document.createRange();if(text)range.selectNodeContents(text);const a=control.getBoundingClientRect(),b=range.getBoundingClientRect();return {label:label.innerText.trim(),display:getComputedStyle(label).display,centerDelta:Math.abs((a.top+a.bottom-b.top-b.bottom)/2),gap:b.left-a.right}});
          return {form:rect('#view-painel [data-label-panel="formulário"]'),activity:rect('#view-painel [data-label-panel="registro"]'),chart:rect('#view-painel .chart'),controls,inline};
        }""")
        issues=[]
        if width >= 1200 and (geometry["activity"]["top"] < geometry["chart"]["bottom"]-2 or geometry["activity"]["left"] < geometry["chart"]["left"]-2):
            issues.append("recent activity should follow the monthly growth chart in the same column")
        if width >= 1200 and geometry["form"]["left"] >= geometry["activity"]["left"]:
            issues.append("project form and report column are not aligned")
        if any(control["width"] > (64 if control["type"]=="checkbox" else 72) for control in geometry["controls"]):
            issues.append("checkbox or public-mode switch stretches across the form")
        if any(item["centerDelta"] > 4 or item["gap"] > 20 for item in geometry["inline"]):
            issues.append("inline form label and control are not aligned")
        if issues:
            failures.append({"slug":slug,"variant":state,"width":width,"reportedLayout":issues,"geometry":geometry})


def box_containment(page, slug, state, width, failures):
    """Ensure direct content boxes remain inside their visual parent panels."""
    violations = page.evaluate("""() => {
      const selectors = '.hero,.feature,.kpi,.chart,.panel,.toast,.view-header,.topbar,.table-wrap,.kanban-col,.team-card,.grid,.kpis,.split,.analytics-strip,.team-grid,.view-actions';
      const containers = [...document.querySelectorAll(`#stage ${selectors}`)].filter(el => {
        const r=el.getBoundingClientRect(),s=getComputedStyle(el);
        return !el.closest('[hidden]') && s.display!=='none' && r.width>0 && r.height>0;
      });
      const results=[];
      for(const parent of containers){
        const p=parent.getBoundingClientRect();
        for(const child of parent.children){
          const s=getComputedStyle(child),r=child.getBoundingClientRect();
          if(s.display==='none'||s.position==='absolute'||s.position==='fixed'||r.width===0||r.height===0) continue;
          if(parent.classList.contains('table-wrap')&&child.tagName==='TABLE'&&['auto','scroll'].includes(getComputedStyle(parent).overflowX)) continue;
          const overflow={left:Math.max(0,p.left-r.left),right:Math.max(0,r.right-p.right),top:Math.max(0,p.top-r.top),bottom:Math.max(0,r.bottom-p.bottom)};
          if(overflow.left>2||overflow.right>2||overflow.top>2||overflow.bottom>2){
            results.push({parent:parent.className||parent.id||parent.tagName,child:child.className||child.id||child.tagName,overflow:Object.fromEntries(Object.entries(overflow).map(([k,v])=>[k,Math.round(v*100)/100]))});
          }
        }
      }
      const controls=[...document.querySelectorAll('#stage button,#stage a,#stage input,#stage select,#stage textarea,[role="button"]')].filter(el=>{
        const r=el.getBoundingClientRect(),s=getComputedStyle(el);
        return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&!el.closest('[hidden]');
      });
      for(const control of controls){
        const parent=control.closest('.hero,.feature,.kpi,.chart,.panel,.toast,.view-header,.topbar,.table-wrap,.kanban-col,.team-card');
        if(!parent) continue;
        const p=parent.getBoundingClientRect(),r=control.getBoundingClientRect();
        const overflow={left:Math.max(0,p.left-r.left),right:Math.max(0,r.right-p.right),top:Math.max(0,p.top-r.top),bottom:Math.max(0,r.bottom-p.bottom)};
        if(overflow.left>2||overflow.right>2||overflow.top>2||overflow.bottom>2){
          results.push({parent:parent.className||parent.id||parent.tagName,child:control.className||control.id||control.tagName,overflow:Object.fromEntries(Object.entries(overflow).map(([k,v])=>[k,Math.round(v*100)/100]))});
        }
      }
      return results.slice(0,30);
    }""")
    if violations:
        failures.append({"slug":slug,"variant":state,"width":width,"containment":"direct content box escapes its panel","elements":violations})


def chart_bar_visibility(page, slug, state, width, failures):
    bars = page.evaluate("""() => [...document.querySelectorAll('#stage .chart .bars i')].map(el=>{
      const style=getComputedStyle(el),parent=getComputedStyle(el.closest('.chart'));
      const rgba=value=>{const m=value.match(/rgba?\\(([^)]+)\\)/i);if(!m)return null;const p=m[1].split(/[ ,/]+/).filter(Boolean).map(Number);return {c:p.slice(0,3),a:p.length>3?p[3]:1}};
      const luminance=c=>{const f=x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
      const color=rgba(style.backgroundColor);
      let node=el.closest('.chart'),layers=[],surface=null,complex=false;
      while(node){
        const s=getComputedStyle(node),layer=rgba(s.backgroundColor);
        if(s.backgroundImage!=='none'){complex=true;break}
        if(layer&&layer.a>0){layers.push(layer);if(layer.a>=1){surface=layer.c;break}}
        if(node.id==='stage')break;
        node=node.parentElement;
      }
      if(!surface&&!complex){const stage=getComputedStyle(document.querySelector('#stage')),fallback=rgba(stage.backgroundColor);if(fallback?.a===1&&stage.backgroundImage==='none')surface=fallback.c;else complex=true}
      if(surface)for(const layer of layers.reverse()){surface=layer.c.map((v,i)=>v*layer.a+surface[i]*(1-layer.a))}
      const contrast=color&&surface?(Math.max(luminance(color),luminance(surface))+.05)/(Math.min(luminance(color),luminance(surface))+.05):null;
      return {height:el.getBoundingClientRect().height,background:style.backgroundColor,image:style.backgroundImage,contrast,complexBackground:complex};
    })""")
    failures_here=[]
    if not bars:
        failures_here.append("monthly growth bars are missing")
    for index,bar in enumerate(bars):
        if bar["height"]<6 or (bar["image"]=="none" and bar["contrast"] is not None and bar["contrast"]<3):
            failures_here.append({"bar":index,**bar})
    if failures_here:
        failures.append({"slug":slug,"variant":state,"width":width,"chartVisibility":failures_here})


def topbar_spacing(page, slug, state, width, failures):
    gap = page.evaluate("""() => {
      const topbar=document.querySelector('.topbar'),pane=document.querySelector('#view-painel');
      return pane.getBoundingClientRect().top-topbar.getBoundingClientRect().bottom;
    }""")
    if gap < 12:
        failures.append({"slug":slug,"variant":state,"width":width,"spacing":"topbar is too close to dashboard content","gap":round(gap,2)})


def read_element_motion(page, targets):
    nodes = []
    for target in targets:
        if target["pseudo"]:
            pseudos = page.evaluate(BACKGROUND_PSEUDO_MOTION_JS, target["selector"])
            nodes.extend(
                {
                    "animations": item["animations"],
                    "transform": item.get("computedTransform"),
                    "computedOpacity": item.get("computedOpacity"),
                }
                for item in pseudos
                if item["pseudo"] == target["pseudo"]
            )
        else:
            nodes.extend(page.evaluate(MOTION_NODES_JS, target["selector"]))
    return nodes


def read_background_motion(page, targets):
    """Read a stage pseudo-element or the actual element animating a surface."""
    nodes = []
    for target in targets:
        if target["pseudo"]:
            nodes.extend(page.evaluate(BACKGROUND_PSEUDO_MOTION_JS, target["selector"]))
            continue
        current = page.evaluate(MOTION_NODES_JS, target["selector"])
        names = page.evaluate(
            "selector => { const e=document.querySelector(selector); return e ? getComputedStyle(e).animationName.split(',').map(x=>x.trim()) : []; }",
            target["selector"],
        )
        if current:
            current[0]["computedNames"] = names
        nodes.extend(current)
    return nodes


def motion_state(page, source, slug, failures):
    """Check authored element/background animation contracts, including reduce-motion."""
    def scoped(selector):
        selector = selector.strip()
        return selector if selector.startswith("#stage") else f"#stage {selector}"
    def parse_targets(raw):
        targets = []
        for item in raw.split(";"):
            item = item.strip()
            pseudo = re.search(r"::(?:before|after)\b", item)
            targets.append({
                "selector": scoped(re.sub(r"::(?:before|after)\b", "", item)),
                "pseudo": pseudo.group(0) if pseudo else "",
            })
        return targets
    element_targets = parse_targets(source["motion"]["element"]["selector"])
    background_targets = parse_targets(source["motion"]["background"]["selector"])
    element_selector = element_targets[0]["selector"]
    page.set_viewport_size({"width": 1280, "height": 480})
    # Start each motion probe with fresh timeline state; prior responsive cases
    # may already have scrolled this style past an entry range.
    page.reload()
    page.wait_for_function(
        "slug => document.querySelector('#stage')?.dataset.style === slug && document.querySelector('#stage')?.dataset.variant === 'alternate'",
        arg=slug,
    )
    page.locator("#stage").evaluate("stage => { stage.scrollTop = 0; }")
    page.emulate_media(reduced_motion="no-preference")
    timeline_element_before = read_element_motion(page, element_targets)
    timeline_background_before = read_background_motion(page, background_targets)
    element = page.locator(element_selector).first
    if element.count() == 0:
        failures.append({"slug": slug, "variant": "alternate", "motion": f"element target missing: {element_selector}"})
    else:
        element.evaluate("e => e.scrollIntoView({block:'center',inline:'nearest'})")
        try:
            page.wait_for_function(
                "selector => { const e=document.querySelector(selector); return !!e && e.getAttribute('data-motion-visible') === 'true'; }",
                arg=element_selector,
                timeout=3000,
            )
        except Exception:
            failures.append({"slug": slug, "variant": "alternate", "motion": "element target did not become visible"})
        try:
            page.wait_for_function(
                "document.querySelector('#stage')?.dataset.motionActive === 'true'",
                timeout=3000,
            )
        except Exception:
            failures.append({"slug": slug, "variant": "alternate", "motion": "alternate motion did not activate with reduced motion disabled"})

    # Scroll/view timelines advance only when their #stage source moves.
    element_before = read_element_motion(page, element_targets)
    background_before = read_background_motion(page, background_targets)
    scroll_positions = page.locator("#stage").evaluate("""stage => {
      const max=Math.max(0,stage.scrollHeight-stage.clientHeight);
      const start=stage.scrollTop;
      const end=Math.min(max,start+Math.min(220,Math.max(40,max-start)));
      stage.scrollTop=end;
      return {start,end};
    }""")
    page.wait_for_timeout(100)
    element_after = read_element_motion(page, element_targets)
    background_after = read_background_motion(page, background_targets)
    element_progress = (
        visual_motion_advanced(timeline_element_before, element_before)
        or visual_motion_advanced(element_before, element_after)
        or timeline_progressed(timeline_element_before, element_before)
        or timeline_progressed(element_before, element_after)
        or (has_running_motion(element_before) and running_motion_advanced(element_before, element_after))
    )
    if not element_progress:
        failures.append({"slug": slug, "variant": "alternate", "motion": "element target shows no animation or scroll-driven visual progress", "motionEvidence": {"initial": timeline_element_before, "beforeScroll": element_before, "afterScroll": element_after, "scroll": scroll_positions}})
    background_progress = (
        visual_motion_advanced(timeline_background_before, background_before)
        or visual_motion_advanced(background_before, background_after)
        or timeline_progressed(timeline_background_before, background_before)
        or timeline_progressed(background_before, background_after)
        or background_motion_advanced(background_before, background_after)
        or running_motion_advanced(background_before, background_after)
    )
    if not background_progress:
        failures.append({"slug": slug, "variant": "alternate", "motion": "background pseudo animation clock did not advance"})

    page.emulate_media(reduced_motion="reduce")
    page.wait_for_timeout(30)
    reduced_element = read_element_motion(page, element_targets)
    reduced_background = read_background_motion(page, background_targets)
    element_names = [animation.get("name") for node in reduced_element for animation in node.get("animations", [])]
    background_names = [name for item in reduced_background for name in item.get("computedNames", [])]
    if any(name != "none" for name in element_names + background_names):
        failures.append({"slug": slug, "variant": "alternate", "reducedMotion": "authored motion remains enabled"})
    if not background_motion_is_reduced(reduced_background):
        failures.append({"slug": slug, "variant": "alternate", "reducedMotion": "background pseudo animation is still running"})


def run_matrix(fixture_root, slugs, sources, registry):
    server = FixtureServer(fixture_root)
    failures = []
    checked = 0
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
            page = browser.new_page(viewport={"width": 1280, "height": 900}, reduced_motion="reduce")
            page.set_default_timeout(5000)
            page.add_init_script(
                "localStorage.setItem('coacus-locale','pt-BR');"
                "localStorage.setItem('coacus-auto-tour','false');"
                "localStorage.setItem('coacus-welcome-tour','true')"
            )
            page.goto(f"{server.base_url}/#{slugs[0]}")
            page.locator("#stage").wait_for()
            for width in VIEWPORTS:
                page.set_viewport_size({"width": width, "height": 900})
                for slug in slugs:
                    page.evaluate("slug => { location.hash = `#${slug}`; }", slug)
                    page.wait_for_function("slug => document.querySelector('#stage')?.dataset.style === slug", arg=slug)
                    page.wait_for_function("""slug => {
                      const stage = document.querySelector('#stage');
                      const trigger = document.querySelector('#appearance-trigger');
                      if (!stage || !trigger || trigger.getAttribute('aria-disabled') !== 'false') return false;
                      const expectedAlternate = localStorage.getItem(`coacus-appearance-${slug}`) === 'alternate';
                      return trigger.getAttribute('aria-pressed') === String(expectedAlternate)
                        && stage.hasAttribute('data-variant') === expectedAlternate;
                    }""", arg=slug)
                    for state in STATES:
                        if state == "default":
                            page.locator("#appearance-trigger").evaluate("e => e.click()") if page.locator("#appearance-trigger").get_attribute("aria-pressed") == "true" else None
                            page.wait_for_function("!document.querySelector('#stage')?.hasAttribute('data-variant')")
                        else:
                            if page.locator("#appearance-trigger").get_attribute("aria-pressed") != "true":
                                page.locator("#appearance-trigger").evaluate("e => e.click()")
                            page.wait_for_function("document.querySelector('#stage')?.dataset.variant === 'alternate'")
                        page.evaluate('document.fonts.ready')
                        page.mouse.move(0,0)
                        page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                        checked += 1
                        measured = bounds(page)
                        if measured["overflow"] or measured["bad"] or measured["clipped"] or measured["overlaps"]:
                            failures.append({"slug": slug, "variant": state, "width": width, **measured})
                        text_contrast = rendered_text_contrast(page)
                        if text_contrast:
                            failures.append({"slug": slug, "variant": state, "width": width, "textContrast": text_contrast})
                        split_screen_layout(page, slug, state, width, failures)
                        navigation_interaction(page, slug, state, width, failures)
                        view_header_alignment(page, slug, state, width, failures)
                        reported_theme_layout(page, slug, state, width, failures)
                        box_containment(page, slug, state, width, failures)
                        chart_bar_visibility(page, slug, state, width, failures)
                        topbar_spacing(page, slug, state, width, failures)
                        if state == "alternate":
                            expected = registry[slug]["alternate"]["colors"]
                            actual = page.locator("#stage").evaluate(
                                "e => Object.fromEntries(['--bg','--surface','--accent'].map(k=>[k,getComputedStyle(e).getPropertyValue(k).trim().toUpperCase()]))"
                            )
                            if any(actual[token] != value.upper() for token, value in expected.items()):
                                failures.append({"slug": slug, "variant": state, "width": width, "tokens": actual, "expected": expected})
                            ratios = contrast(page)
                            if min(ratios[key] for key in ("textBg", "textSurface", "muted", "accent")) < 4.5 or min(ratios[key] for key in ("borderBg", "borderSurface", "borderSurface2")) < 3:
                                failures.append({"slug": slug, "variant": state, "width": width, "contrast": ratios})
                    if width == 1280:
                        motion_state(page, sources[slug], slug, failures)
                        # Leave this style in default before moving to the next style.
                        if page.locator("#appearance-trigger").get_attribute("aria-pressed") == "true":
                            page.locator("#appearance-trigger").evaluate("e => e.click()")
                            page.wait_for_function("!document.querySelector('#stage')?.hasAttribute('data-variant')")
            browser.close()
    finally:
        server.close()
    return checked, failures


def main():
    slugs, sources = inventory()
    parser = argparse.ArgumentParser()
    parser.add_argument("--slugs", nargs="*", choices=slugs, help="pilot subset; every selected style must have an authored alternate")
    parser.add_argument("--report", default="docs/temp/reports/2026-10-18-variant-matrix.json")
    args = parser.parse_args()
    selected = args.slugs if args.slugs else slugs
    selected_sources = require_candidates(selected, sources)
    legacy_pattern = re.compile(r"['\"](?:" + "|".join(LEGACY_IDS) + r")['\"]")
    if legacy_pattern.search((ROOT / "styles/variants/registry.js").read_text()) or legacy_pattern.search((TOOLS / "generate_variant_design.py").read_text()):
        raise ValueError("legacy C1–E3 identifiers remain in registry or generator")

    with tempfile.TemporaryDirectory(prefix="variant-matrix-review-") as temporary:
        fixture_root = Path(temporary) / "review"
        fixture_sources, registry = generate_review_fixture(fixture_root, selected)
        checked, failures = run_matrix(fixture_root, selected, fixture_sources, registry)
        report = {
            "buildKind": "review",
            "styles": len(selected),
            "availableAlternates": sorted(fixture_sources),
            "alternateStatuses": {slug: source["status"] for slug, source in fixture_sources.items()},
            "states": list(STATES),
            "viewports": list(VIEWPORTS),
            "textContrastMethod": "Computed foreground (including -webkit-text-fill-color) against composited solid ancestor backgrounds; gradients, image backgrounds, and transparent gradient-clipped text are skipped for visual inspection.",
            "checked": checked,
            "errors": failures,
            "releaseReady": len(selected) == 82 and all(source["status"] == "approved" for source in selected_sources.values()),
        }
        report_path = ROOT / args.report
        report_path.parent.mkdir(parents=True, exist_ok=True)
        report["report"] = str(report_path)
        report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if failures:
            raise SystemExit(json.dumps({"checked": checked, "errors": len(failures), "examples": failures[:20], "report": str(report_path)}, ensure_ascii=False, indent=2))
        print(json.dumps({key: report[key] for key in ("buildKind", "styles", "availableAlternates", "alternateStatuses", "states", "viewports", "checked", "releaseReady", "report")}, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, ValueError) as error:
        raise SystemExit(f"variant matrix: {error}")
