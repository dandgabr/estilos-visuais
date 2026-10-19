#!/usr/bin/env python3
"""Auditoria automática dos 82 estilos: console, overflow, contraste, foco, diálogo, reduced-motion.

Uso: python3 tools/audit.py [slug ...] [--port 8200] [--shots DIR] [--json out.json] [--strict]
Sobe seu próprio http.server e usa um navegador isolado.
"""
import argparse, json, re, subprocess, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
from chromium_runtime import chromium_executable

ROOT = Path(__file__).resolve().parent.parent
SLUGS = re.findall(r"\['([a-z0-9-]+)',\s*'", (ROOT / "styles/registry.js").read_text())


def load_variant_registry(path=ROOT / "styles/variants/registry.js"):
    """Read the generated JS registry (its payload is JSON-compatible)."""
    source = Path(path).read_text(encoding="utf-8")
    build = re.search(r'export\s+const\s+BUILD_KIND\s*=\s*(["\'])(.*?)\1\s*;', source)
    variants = re.search(r"export\s+const\s+VARIANTS\s*=\s*(\{.*?\})\s*;", source, re.S)
    if not build or not variants:
        raise ValueError(f"could not parse appearance registry: {path}")
    registry = json.loads(variants.group(1))
    if not isinstance(registry, dict):
        raise ValueError(f"appearance registry must be an object: {path}")
    return build.group(2), registry


def load_variant_inventory(source_dir=ROOT / "styles/variants/source"):
    """Read authored source status so release reports candidates omitted from its registry."""
    inventory = {}
    for path in sorted(Path(source_dir).glob("*.json")):
        item = json.loads(path.read_text(encoding="utf-8"))
        slug = item.get("slug")
        if not isinstance(slug, str) or slug != path.stem:
            raise ValueError(f"appearance inventory slug does not match filename: {path}")
        try:
            display_path = str(path.relative_to(ROOT))
        except ValueError:
            display_path = str(path)
        inventory[slug] = {"status": item.get("status"), "source": display_path}
    return inventory


def variant_cases(slugs, registry, inventory, *, build_kind):
    """Plan canonical and alternate audits using runtime availability and source status."""
    cases = []
    for slug in slugs:
        variants = registry.get(slug, {})
        default = variants.get("default", {"id": "default", "status": "canonical"})
        cases.append({"slug": slug, "appearance": "default", "status": default.get("status", "canonical"), "runnable": True})
        source = inventory.get(slug, {})
        alternate = variants.get("alternate")
        status = (alternate or {}).get("status") or source.get("status") or "missing"
        available = bool(alternate) and (status == "approved" or (build_kind == "review" and status == "ready_for_review"))
        cases.append({"slug": slug, "appearance": "alternate", "status": status, "runnable": available})
    return cases


def variant_release_gate(inventory, registry, *, expected_slugs):
    statuses = {slug: inventory.get(slug, {}).get("status") for slug in expected_slugs}
    missing = [slug for slug, status in statuses.items() if status is None]
    ready = [slug for slug, status in statuses.items() if status == "ready_for_review"]
    invalid = [f"{slug}:{status}" for slug, status in statuses.items() if status not in {None, "approved", "ready_for_review"}]
    unregistered = [slug for slug, status in statuses.items()
                    if status == "approved" and not registry.get(slug, {}).get("alternate")]
    registry_unapproved = [f"{slug}:{registry[slug]['alternate'].get('status')}"
                           for slug, status in statuses.items()
                           if status == "approved" and registry.get(slug, {}).get("alternate")
                           and registry[slug]["alternate"].get("status") != "approved"]
    return {
        "passed": len(missing) == 0 and len(ready) == 0 and len(invalid) == 0 and len(unregistered) == 0 and len(registry_unapproved) == 0,
        "expected": len(expected_slugs),
        "approved": sum(status == "approved" for status in statuses.values()),
        "ready_for_review": ready,
        "missing": missing,
        "invalid": invalid,
        "unregistered": unregistered,
        "registry_unapproved": registry_unapproved,
    }

JS_CONTRAST = r"""
() => {
  const stage = document.querySelector('#stage');
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const lum = ({r,g,b}) => { const f = v => { v/=255; return v<=.03928? v/12.92 : Math.pow((v+.055)/1.055,2.4); }; return .2126*f(r)+.7152*f(g)+.0722*f(b); };
  const over = (top, bot) => { const a = top.a; return {r:top.r*a+bot.r*(1-a), g:top.g*a+bot.g*(1-a), b:top.b*a+bot.b*(1-a), a:1}; };
  const bgOf = (el) => {
    // percorre ancestrais acumulando camadas; se achar imagem/gradiente, marca incerto
    const layers = []; let uncertain = false;
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') uncertain = true;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
      if (n === stage) break;
    }
    let base = {r:255,g:255,b:255,a:1};
    for (let i = layers.length-1; i >= 0; i--) base = over(layers[i], base);
    return {c: base, uncertain};
  };
  const out = [];
  const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode; if (!t.nodeValue.trim()) continue;
    const el = t.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    if (el.closest('[aria-hidden="true"]')) continue;
    const fg = parse(cs.color); if (!fg) continue;
    const {c: bg, uncertain} = bgOf(el);
    // opacidade acumulada
    let op = 1; for (let n = el; n && n !== stage.parentElement; n = n.parentElement) op *= +getComputedStyle(n).opacity;
    const f = over({...fg, a: fg.a*op}, bg);
    const L1 = lum(f), L2 = lum(bg);
    const ratio = (Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    if (uncertain || ratio < need) {
      const idx = out.length; el.setAttribute('data-audit', idx);
      const backgroundLayers = [];
      for (let n = el; n; n = n.parentElement) {
        const color = getComputedStyle(n).backgroundColor;
        if (color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') backgroundLayers.push({tag:n.tagName.toLowerCase(), class:(n.className||'').toString().split(' ')[0], color});
        if (n === stage) break;
      }
      out.push({idx, text: t.nodeValue.trim().slice(0,30), tag: el.tagName.toLowerCase()+'.'+(el.className||'').toString().split(' ')[0], ratio: +ratio.toFixed(2), need, uncertain, fg: [fg.r,fg.g,fg.b,+(fg.a*op).toFixed(3)], bg: [Math.round(bg.r),Math.round(bg.g),Math.round(bg.b)], backgroundLayers});
    }
  }
  return out;
}
"""

JS_OVERFLOW = "() => { const s=document.querySelector('#stage'); return [s.scrollWidth, s.clientWidth]; }"

JS_FOCUS = r"""
() => {
  const res = [];
  for (const el of document.querySelectorAll('#stage .btn, #stage input[type=text], #stage select, #stage a[href]')) {
    el.focus({focusVisible: true});
    const cs = getComputedStyle(el);
    const ok = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none');
    if (!ok) res.push((el.className || el.tagName) + ': ' + el.textContent.trim().slice(0,20));
    el.blur();
  }
  return res;
}
"""


def lum(c):
    f = lambda v: (v/255/12.92) if v/255 <= .03928 else ((v/255+.055)/1.055) ** 2.4
    return .2126*f(c[0]) + .7152*f(c[1]) + .0722*f(c[2])


def refine(page, items):
    """Para itens com fundo incerto, mede pixels pareados com e sem os glifos."""
    from PIL import Image
    import io
    from oracles.contrast_pixels import paired_pixel_contrast

    out = []
    for it in items:
        if not it["uncertain"]:
            out.append(it); continue
        loc = page.locator(f'[data-audit="{it["idx"]}"]')
        try:
            loc.evaluate("""async e => {
              e.scrollIntoView({block:'center'});
              const transitions = [];
              for (let n = e; n; n = n.parentElement) {
                for (const a of n.getAnimations()) {
                  const timing = a.effect?.getComputedTiming();
                  const changesOpacity = a.effect?.getKeyframes().some(frame => 'opacity' in frame);
                  if (a.playState === 'running' && changesOpacity && timing && timing.iterations !== Infinity) transitions.push(a.finished.catch(() => null));
                }
              }
              await Promise.race([Promise.all(transitions), new Promise(resolve => setTimeout(resolve, 1200))]);
              await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            }""")
            box = loc.bounding_box()
            vp = page.viewport_size
            if not box or box["width"] < 2 or box["height"] < 2 or box["y"] < 0 or box["y"] + box["height"] > vp["height"] or box["x"] < 0:
                continue
            clip = {"x": box["x"], "y": box["y"], "width": min(box["width"], vp["width"] - box["x"]), "height": box["height"]}
            page.evaluate("""() => {
              const running = [...document.getAnimations()].filter(a => a.playState === 'running');
              window.__contrastAuditRunning = running;
              [...document.getAnimations()].forEach(a => a.pause());
            }""")
            saved = loc.evaluate("e => Object.fromEntries(['color','text-shadow','-webkit-text-fill-color','-webkit-text-stroke-color','background-image','background-clip','-webkit-background-clip'].map(k => [k, e.style.getPropertyValue(k)]))")
            gradient_text = loc.evaluate("""e => {
              const props = ['background-image','background-clip','-webkit-background-clip'];
              window.__contrastAuditGradientStyles = [];
              for (let n = e; n; n = n.parentElement) {
                const cs = getComputedStyle(n);
                if (!(cs.backgroundClip.includes('text') || cs.webkitBackgroundClip.includes('text'))) continue;
                const old = Object.fromEntries(props.map(k => [k, n.style.getPropertyValue(k)]));
                window.__contrastAuditGradientStyles.push([n, old]);
              }
              return window.__contrastAuditGradientStyles.length > 0;
            }""")
            try:
                loc.evaluate("""e => {
                  e.style.setProperty('text-shadow','none','important');
                  e.style.setProperty('-webkit-text-stroke-color','transparent','important');
                }""")
                page.wait_for_timeout(40)
                normal = Image.open(io.BytesIO(page.screenshot(clip=clip))).convert("RGB")
                loc.evaluate("""(e, gradientText) => {
                  e.style.setProperty('color','transparent','important');
                  e.style.setProperty('-webkit-text-fill-color','transparent','important');
                  if (gradientText) {
                    for (const [n] of (window.__contrastAuditGradientStyles || [])) {
                      n.style.setProperty('background-image','none','important');
                      n.style.setProperty('background-clip','border-box','important');
                      n.style.setProperty('-webkit-background-clip','border-box','important');
                    }
                  }
                }""", gradient_text)
                page.wait_for_timeout(40)
                background = Image.open(io.BytesIO(page.screenshot(clip=clip))).convert("RGB")
            finally:
                loc.evaluate("(e, old) => Object.entries(old).forEach(([k,v]) => v ? e.style.setProperty(k,v) : e.style.removeProperty(k))", saved)
                page.evaluate("""() => {
                  for (const [n, old] of (window.__contrastAuditGradientStyles || [])) {
                    Object.entries(old).forEach(([k,v]) => v ? n.style.setProperty(k,v) : n.style.removeProperty(k));
                  }
                  delete window.__contrastAuditGradientStyles;
                }""")
                page.evaluate("() => { (window.__contrastAuditRunning || []).forEach(a => { try { a.play(); } catch {} }); delete window.__contrastAuditRunning; }")

            normal_pixels = list(normal.get_flattened_data())
            background_pixels = list(background.get_flattened_data())
            measured = paired_pixel_contrast(normal_pixels, background_pixels)
            if measured is None:
                out.append(dict(it, error="paired pixel mask found no text", measured="paired-pixels"))
                continue
            it = dict(it, ratio=round(measured, 2), uncertain=False, measured="paired-pixels")
            if measured < it["need"]:
                out.append(it)
        except Exception as e:
            out.append(dict(it, ratio=0, error=str(e)[:100], measured="paired-pixels"))
    return out


def focus_audit(page):
    """Navega com Tab e verifica se cada controle focado mostra indicador visível."""
    bad, seen = [], set()
    page.evaluate("document.querySelector('#stage').scrollTop=0")
    page.locator("#stage .brand").evaluate("e => e.focus()")
    for _ in range(40):
        page.keyboard.press("Tab")
        info = page.evaluate("""() => { const e=document.activeElement; if(!e||!e.closest('#stage')) return null; const cs=getComputedStyle(e);
          const ok=(cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>0)||(cs.boxShadow&&cs.boxShadow!=='none');
          return {key:e.outerHTML.slice(0,80), label:(e.className||e.tagName)+': '+(e.textContent||'').trim().slice(0,20), ok}; }""")
        if not info or info["key"] in seen:
            break
        seen.add(info["key"])
        if not info["ok"]:
            bad.append(info["label"])
    return bad


def audit(page, slug, port, shots, variant=None, variant_status="canonical"):
    rep = {"slug": slug, "appearance": variant or "default", "variantStatus": variant_status, "console": [], "overflow": {}, "contrast": {}, "focus": [], "dialog": None, "motion": None}
    page.on("console", lambda m: rep["console"].append(m.text[:160]) if m.type in ("error", "warning") and "GL Driver Message" not in m.text else None)
    page.on("pageerror", lambda e: rep["console"].append("pageerror: " + str(e)[:160]))
    for w, h in ((1280, 800), (375, 740)):
        page.set_viewport_size({"width": w, "height": h})
        page.goto(f"http://localhost:{port}/?x={w}#{slug}")
        page.reload()
        page.wait_for_function(f"document.querySelector('#stage').dataset.style === '{slug}'")
        if variant:
            page.locator("#appearance-trigger").click()
            page.locator(f'#appearance-options input[name="appearance"][value="{variant}"]').check()
            page.wait_for_function("id=>document.querySelector('#stage').dataset.variant===id", arg=variant)
            page.keyboard.press("Escape")
        page.wait_for_timeout(1500)
        sw, cw = page.evaluate(JS_OVERFLOW)
        rep["overflow"][w] = [sw, cw]
        # rola por toda a página para disparar revelações e medir contraste nas seções visíveis
        total = page.evaluate("document.querySelector('#stage').scrollHeight")
        for y in range(0, total, 600):
            page.evaluate(f"document.querySelector('#stage').scrollTop={y}")
            page.wait_for_timeout(120)
        page.wait_for_timeout(600)
        rep["contrast"][w] = refine(page, page.evaluate(JS_CONTRAST))
        page.evaluate("document.querySelector('#stage').scrollTop=0")
        page.wait_for_timeout(300)
        if shots:
            page.screenshot(path=str(Path(shots) / f"{slug}-{w}.png"))
            # tela cheia do stage a 1280 para revisão visual
            if w == 1280:
                page.evaluate("document.querySelector('#stage').scrollTop=1100")
                page.wait_for_timeout(500)
                page.screenshot(path=str(Path(shots) / f"{slug}-{w}-b.png"))
                page.evaluate("document.querySelector('#stage').scrollTop=0")
        if w == 1280:
            rep["focus"] = focus_audit(page)
            page.evaluate("document.querySelector('#open-modal').click()")
            page.wait_for_timeout(500)
            rep["dialog"] = page.evaluate("(()=>{const d=document.querySelector('#modal');const r=d.getBoundingClientRect();return {open:d.open,w:Math.round(r.width),h:Math.round(r.height),inView:r.left>=0&&r.right<=innerWidth}})()")
            if shots:
                page.screenshot(path=str(Path(shots) / f"{slug}-dialog.png"))
            page.evaluate("document.querySelector('#modal').close()")
    # reduced motion
    page.emulate_media(reduced_motion="reduce")
    page.reload(); page.wait_for_timeout(1500)
    rep["motion"] = page.evaluate("""() => { let n=0; for (const a of document.getAnimations()) { if (a.playState==='running' && a.effect && a.effect.getTiming().iterations===Infinity) n++; } return n; }""")
    page.emulate_media(reduced_motion="no-preference")
    return rep


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slugs", nargs="*")
    ap.add_argument("--port", type=int, default=8200)
    ap.add_argument("--shots")
    ap.add_argument("--json")
    ap.add_argument("--strict", action="store_true", help="retorna status não-zero se algum estilo falhar")
    ap.add_argument("--variants", action="store_true", help="audita default e alternate conforme o registro atual; alternates sem aprovação não liberam o gate de release")
    a = ap.parse_args()
    slugs = a.slugs or SLUGS
    if a.shots: Path(a.shots).mkdir(parents=True, exist_ok=True)
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(a.port), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    reports = []
    has_findings = False
    release_gate = None
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(executable_path=chromium_executable(), args=["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
            build_kind, registry = load_variant_registry()
            inventory = load_variant_inventory()
            if a.variants:
                cases = variant_cases(slugs, registry, inventory, build_kind=build_kind)
                release_gate = variant_release_gate(inventory, registry, expected_slugs=SLUGS)
            else:
                cases = [{"slug": s, "appearance": "default", "status": "canonical", "runnable": True} for s in slugs]
            for case in cases:
                s, variant = case["slug"], case["appearance"]
                if not case["runnable"]:
                    status = case["status"]
                    label = f"{s}/{variant}"
                    print(f"{label:42} SKIP status={status} (not available in {build_kind} registry)", flush=True)
                    reports.append({"slug": s, "appearance": variant, "variantStatus": status, "skipped": True,
                                    "reason": "alternate not available in generated registry", "buildKind": build_kind})
                    if variant == "alternate":
                        has_findings = True
                    continue
                ctx = b.new_context()
                ctx.add_init_script("localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true');")
                page = ctx.new_page()
                try:
                    r = audit(page, s, a.port, a.shots, None if variant == "default" else variant, case["status"])
                except Exception as e:
                    r = {"slug": s, "appearance": variant, "variantStatus": case["status"], "error": str(e)[:300]}
                ctx.close()
                reports.append(r)
                bad = []
                if r.get("error"): bad.append("ERRO " + r["error"][:80])
                else:
                    if r["console"]: bad.append(f"console={len(r['console'])}")
                    for w, (sw, cw) in r["overflow"].items():
                        if sw > cw: bad.append(f"overflow@{w}={sw}>{cw}")
                    for w, c in r["contrast"].items():
                        if c: bad.append(f"contraste@{w}={len(c)}")
                    if r["focus"]: bad.append(f"foco={len(r['focus'])}")
                    if not r["dialog"] or not r["dialog"]["open"] or not r["dialog"]["inView"]: bad.append("dialog")
                    if r["motion"]: bad.append(f"motion={r['motion']}")
                label = f"{s}/{variant}"
                print(f"{label:42} {'OK' if not bad else ' '.join(bad)}", flush=True)
                has_findings = has_findings or bool(bad)
            b.close()
    finally:
        srv.terminate()
    if a.json:
        if release_gate is not None:
            reports.append({"reportType": "variant-release-gate", **release_gate})
        Path(a.json).write_text(json.dumps(reports, ensure_ascii=False, indent=1))
    if release_gate is not None:
        print(f"variant release gate: {'OPEN' if release_gate['passed'] else 'CLOSED'}; approved={release_gate['approved']}/{release_gate['expected']}; ready_for_review={len(release_gate['ready_for_review'])}; missing={len(release_gate['missing'])}", flush=True)
        has_findings = has_findings or not release_gate["passed"]
    if a.strict and has_findings:
        sys.exit(1)


if __name__ == "__main__":
    main()
