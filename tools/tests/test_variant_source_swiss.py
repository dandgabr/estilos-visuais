"""Contract checks for the authored Swiss dark counterpart source."""
from __future__ import annotations

import json
import re
import socket
import threading
import unittest
from contextlib import closing
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

from tools.chromium_runtime import chromium_executable

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "styles/variants/source/swiss-web-minimalism.json"
CSS = ROOT / "styles/variants/source/swiss-web-minimalism.css"
HTML = ROOT / "index.html"
LOCALES = {
    "pt-BR", "en-US", "es-ES", "fr-FR", "de-DE", "ru-RU",
    "ar-SA", "hi-IN", "zh-CN", "ja-JP", "ko-KR",
}
REQUIRED_TOKENS = {
    "--bg", "--surface", "--surface-2", "--fg", "--muted", "--accent",
    "--accent-fg", "--border", "--ok", "--warn", "--danger", "--focus",
    "--shadow", "--radius", "--border-width",
}
BREAKPOINTS = {"320", "375", "768", "1280"}


def luminance(color: str) -> float:
    value = color.lstrip("#")
    if len(value) == 3:
        value = "".join(char * 2 for char in value)
    rgb = [int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    linear = [channel / 12.92 if channel <= .04045 else ((channel + .055) / 1.055) ** 2.4 for channel in rgb]
    return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2]


def ratio(fg: str, bg: str) -> float:
    a, b = luminance(fg), luminance(bg)
    return (max(a, b) + .05) / (min(a, b) + .05)


class SwissSourceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads(SOURCE.read_text(encoding="utf-8"))
        cls.css = CSS.read_text(encoding="utf-8")
        cls.html = HTML.read_text(encoding="utf-8")

    def test_schema_and_opposite_polarity_are_explicit(self):
        data = self.data
        self.assertEqual(data["schemaVersion"], 1)
        self.assertEqual(data["slug"], "swiss-web-minimalism")
        self.assertIn(data["status"], {"ready_for_review", "approved"})
        self.assertEqual(data["classification"]["defaultPolarity"], "light")
        self.assertEqual(data["classification"]["alternatePolarity"], "dark")
        self.assertGreater(data["classification"]["evidence"].count("#"), 0)

    def test_palette_is_complete_and_contrast_safe(self):
        tokens = self.data["palette"]["tokens"]
        self.assertTrue(REQUIRED_TOKENS <= tokens.keys())
        for key in REQUIRED_TOKENS - {"--shadow", "--radius", "--border-width"}:
            self.assertRegex(tokens[key], r"^#[0-9A-Fa-f]{6}$", key)
        self.assertLess(luminance(tokens["--bg"]), .08, "alternate needs a genuinely dark canvas")
        for fg in ("--fg", "--muted"):
            for bg in ("--bg", "--surface", "--surface-2"):
                self.assertGreaterEqual(ratio(tokens[fg], tokens[bg]), 4.5, f"{fg} on {bg}")
        self.assertGreaterEqual(ratio(tokens["--accent-fg"], tokens["--accent"]), 4.5)
        self.assertGreaterEqual(ratio(tokens["--focus"], tokens["--bg"]), 3.0)
        for state in ("--ok", "--warn", "--danger"):
            self.assertGreaterEqual(ratio(tokens[state], tokens["--surface-2"]), 4.5, state)

    def test_two_non_color_signals_are_specific_to_the_canonical_skill(self):
        signals = self.data["designSignals"]
        self.assertGreaterEqual(len(signals), 2)
        skill_ref = "knowledge/skills/domains/design/ui-style-swiss-web-minimalism/SKILL.md"
        for signal in signals:
            self.assertIn(skill_ref, signal["skillReference"])
            self.assertTrue(signal["selector"])
            self.assertTrue(signal["evidence"])
            self.assertTrue(re.search(r"#[A-Za-z0-9_-]+", signal["selector"]) or "." in signal["selector"])

    def test_layout_measurements_cover_real_targets_at_all_viewports(self):
        for change in self.data["layoutChanges"]:
            self.assertTrue(change["selector"])
            self.assertTrue(change["property"])
            self.assertNotEqual(change["before"], change["after"])
            self.assertEqual(set(change["breakpoints"]), BREAKPOINTS)
            for viewport, measured in change["breakpoints"].items():
                self.assertNotEqual(measured["before"], measured["after"], viewport)
                self.assertNotIn("pending", str(measured).lower(), viewport)
            self.assertIn(change["selector"].split()[0].lstrip("#."), self.html)

    def test_motion_contracts_have_fallback_visibility_and_cleanup(self):
        for kind in ("element", "background"):
            motion = self.data["motion"][kind]
            for key in ("selector", "animation", "trigger", "duration", "fallback", "reducedMotion", "pauseResume", "cleanup"):
                self.assertTrue(motion.get(key), f"{kind}.{key}")
            self.assertIn("reduced", motion["reducedMotion"].lower())
            self.assertIn("visibility", motion["pauseResume"].lower())
            self.assertRegex(motion["cleanup"].lower(), r"remov|limp|desmont|clean")
            self.assertRegex(motion["trigger"].lower(), r"scroll|rolagem|rolagem|rolar")
            self.assertIn("linear", motion["duration"].lower())
            self.assertNotRegex(motion["duration"].lower(), r"infinite|alternate")
            self.assertIn(motion["animation"], self.css)
            self.assertIn(motion["selector"].split("::")[-1], self.css)
        normalized = re.sub(r"\s+", "", self.css).lower()
        self.assertIn("animation-timeline:view(block)", normalized)
        self.assertIn("animation-range:entry0%entry80%", normalized)
        self.assertIn("animation-timeline:scroll(nearestblock)", normalized)
        self.assertIn("animation-range:0%100%", normalized)
        self.assertIn('data-variant="alternate"]::before', normalized)
        self.assertIn("transform:scalex(0)", normalized)
        self.assertIn("transform:scalex(1)", normalized)
        self.assertNotIn("background-size:100%100%", normalized, "scroll motion must not animate background geometry")
        self.assertNotIn("background-size:0%100%", normalized, "scroll motion must use a compositor-friendly pseudo layer")
        self.assertNotIn("swiss-grid-drift", normalized)
        self.assertNotRegex(normalized, r"animation:[^;]*(infinite|alternate)")

    def test_all_eleven_locale_labels_are_contextual(self):
        locales = self.data["locales"]
        self.assertEqual(set(locales), LOCALES)
        names = set()
        for locale, copy in locales.items():
            minimum = 2 if locale in {"zh-CN", "ja-JP", "ko-KR"} else 6
            self.assertGreaterEqual(len(copy["name"].strip()), minimum, locale)
            self.assertGreaterEqual(len(copy["description"].strip()), 45, locale)
            self.assertNotEqual(copy["name"].lower(), "dark mode", locale)
            names.add(copy["name"].casefold())
        self.assertEqual(len(names), len(LOCALES), "names must be localized, not copied")

    def test_css_is_alternate_scoped_and_preserves_flat_orthogonal_language(self):
        self.assertRegex(self.css, r'data-style="swiss-web-minimalism"\]\[data-variant="alternate"\]')
        for key, value in self.data["palette"]["tokens"].items():
            if value.startswith("#") or key in {"--shadow", "--radius", "--border-width"}:
                self.assertRegex(self.css, rf"{re.escape(key)}\s*:\s*{re.escape(value)}(?:\s*[;}}])", key)
        self.assertIn("prefers-reduced-motion", self.css)
        radii = re.findall(r"border-radius\s*:\s*([^;]+)", self.css)
        shadows = re.findall(r"box-shadow\s*:\s*([^;]+)", self.css)
        self.assertTrue(all(value.replace("!important", "").strip() in {"0", "0px"} for value in radii), radii)
        self.assertTrue(all(value.replace("!important", "").strip() == "none" for value in shadows), shadows)
        self.assertIn("text-align:left", self.css.replace(" ", ""))
        self.assertIn("grid-template-columns", self.css)

    def test_real_mockup_geometry_overflow_contrast_and_reduced_motion(self):
        class QuietHandler(SimpleHTTPRequestHandler):
            def log_message(self, _format, *_args):
                return

        with closing(socket.socket()) as sock:
            sock.bind(("127.0.0.1", 0))
            port = sock.getsockname()[1]
        server = ThreadingHTTPServer(("127.0.0.1", port), partial(QuietHandler, directory=str(ROOT)))
        threading.Thread(target=server.serve_forever, daemon=True).start()
        measured = []
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
                page = browser.new_page(viewport={"width": 320, "height": 900}, reduced_motion="reduce")
                page.add_init_script("localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true')")
                page.goto(f"http://127.0.0.1:{port}/#swiss-web-minimalism", wait_until="domcontentloaded")
                page.wait_for_function("document.querySelector('#stage')?.dataset.style === 'swiss-web-minimalism'")
                page.add_style_tag(content=self.css)
                for width in (320, 375, 768, 1280):
                    page.set_viewport_size({"width": width, "height": 900})
                    page.evaluate("document.querySelector('#stage').removeAttribute('data-variant')")
                    before = page.evaluate("""() => ({
                      panelDisplay:getComputedStyle(document.querySelector('#view-painel')).display,
                      panelColumns:getComputedStyle(document.querySelector('#view-painel')).gridTemplateColumns,
                      kpiColumns:getComputedStyle(document.querySelector('.kpis')).gridTemplateColumns,
                      resourceColumns:getComputedStyle(document.querySelector('#view-painel > section[aria-labelledby=t-recursos] .grid')).gridTemplateColumns,
                      stageBackground:getComputedStyle(document.querySelector('#stage')).backgroundColor,
                      displayColor:getComputedStyle(document.querySelector('#stage .display')).color,
                      metrics:(()=>{const r=document.querySelector('#view-painel > section[aria-labelledby=t-metricas]').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})(),
                      resources:(()=>{const r=document.querySelector('#view-painel > section[aria-labelledby=t-recursos]').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})(),
                      kpiBoxes:[...document.querySelectorAll('.kpis > *')].map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})
                    })""")
                    page.evaluate("document.querySelector('#stage').dataset.variant='alternate'")
                    page.wait_for_timeout(40)
                    after = page.evaluate("""() => {
                      const stage=document.querySelector('#stage'),panel=document.querySelector('#view-painel');
                      const kpis=document.querySelector('.kpis'),resources=panel.querySelector(':scope > section[aria-labelledby=t-recursos] .grid');
                      const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
                      const css=getComputedStyle(stage),root=getComputedStyle(document.documentElement);
                      const rgb=s=>{if(s.startsWith('#')){const h=s.slice(1);return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}const m=s.match(/[\\d.]+/g);return m&&m.length>=3?m.slice(0,3).map(Number):[0,0,0]};
                      const ratio=(a,b)=>{const lum=s=>{const c=rgb(s).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
                      const sample=s=>{const e=document.querySelector(s),style=getComputedStyle(e);return {foreground:style.color,background:style.backgroundColor,ratio:ratio(style.color,style.backgroundColor)}};
                      const tokens=['--bg','--surface','--surface-2','--fg','--muted','--accent','--accent-fg','--focus'];
                      const values=Object.fromEntries(tokens.map(k=>[k,css.getPropertyValue(k).trim()]));
                      return {panelDisplay:getComputedStyle(panel).display,panelColumns:getComputedStyle(panel).gridTemplateColumns,
                        kpiColumns:getComputedStyle(kpis).gridTemplateColumns,resourceColumns:getComputedStyle(resources).gridTemplateColumns,
                        displayFontSize:parseFloat(getComputedStyle(document.querySelector('.display')).fontSize),
                        resourceChildWidths:[...resources.children].map(e=>Math.round(e.getBoundingClientRect().width)),resourceWidth:Math.round(resources.getBoundingClientRect().width),
                        panel:box(panel),metrics:box(panel.querySelector(':scope > section[aria-labelledby=t-metricas]')),
                        resources:box(panel.querySelector(':scope > section[aria-labelledby=t-recursos]')),
                        viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,stageClientWidth:stage.clientWidth,stageScrollWidth:stage.scrollWidth,
                        contrast:{fgBg:ratio(values['--fg'],values['--bg']),fgSurface:ratio(values['--fg'],values['--surface']),mutedBg:ratio(values['--muted'],values['--bg']),accent:ratio(values['--accent-fg'],values['--accent']),focusBg:ratio(values['--focus'],values['--bg'])},
                        renderedContrast:{primary:sample('.btn-primary'),secondary:sample('.btn-secondary'),status:sample('.badge.ok'),
                          bar:ratio(getComputedStyle(document.querySelector('.bars i')).backgroundColor,getComputedStyle(document.querySelector('.chart')).backgroundColor)},
                        colors:{background:css.backgroundColor,backgroundImage:css.backgroundImage,values},
                        animations:[...stage.getAnimations({subtree:true})].map(a=>({name:a.animationName,state:a.playState,target:a.effect?.target?.selector}))};
                    }""")
                    self.assertLessEqual(after["documentWidth"], width + 1, f"document overflow at {width}px")
                    self.assertLessEqual(after["stageScrollWidth"], after["stageClientWidth"] + 1, f"stage overflow at {width}px")
                    self.assertNotEqual(before["kpiColumns"], after["kpiColumns"], f"KPI layout unchanged at {width}px")
                    self.assertEqual(before["stageBackground"], "rgb(255, 255, 255)", f"Padrão was not measured as light at {width}px")
                    self.assertEqual(before["displayColor"], "rgb(0, 0, 0)", f"Padrão text polarity changed at {width}px")
                    self.assertLessEqual(after["displayFontSize"], 72, f"Swiss display type exceeds 72px at {width}px")
                    # Both canonical and alternate compositions deliberately
                    # collapse resources to one full-width track through 900px.
                    # Compare this region's responsive resource geometry at
                    # desktop widths, where the alternate has room to differ.
                    if width > 900:
                        self.assertNotEqual(before["resourceColumns"], after["resourceColumns"], f"resource layout unchanged at {width}px")
                    if width < 1000:
                        self.assertEqual(len(after["resourceColumns"].split()), 1, f"tablet/mobile resources must stay one column: {after['resourceColumns']}")
                        self.assertTrue(all(child_width == after["resourceWidth"] for child_width in after["resourceChildWidths"]), after["resourceChildWidths"])
                        self.assertEqual(after["metrics"]["x"], after["resources"]["x"])
                        self.assertGreater(after["resources"]["y"], after["metrics"]["y"] + after["metrics"]["height"])
                    else:
                        self.assertLess(after["metrics"]["x"], after["resources"]["x"])
                        self.assertEqual(after["metrics"]["y"], after["resources"]["y"])
                    self.assertTrue(all(value >= 4.5 for key, value in after["contrast"].items() if key != "focusBg"), after["contrast"])
                    self.assertGreaterEqual(after["contrast"]["focusBg"], 3.0)
                    self.assertGreaterEqual(after["renderedContrast"]["primary"]["ratio"], 4.5, after["renderedContrast"])
                    self.assertGreaterEqual(after["renderedContrast"]["secondary"]["ratio"], 4.5, after["renderedContrast"])
                    self.assertGreaterEqual(after["renderedContrast"]["status"]["ratio"], 4.5, after["renderedContrast"])
                    self.assertGreaterEqual(after["renderedContrast"]["bar"], 3.0, after["renderedContrast"])
                    self.assertTrue(all(anim["state"] != "running" for anim in after["animations"]), after["animations"])
                    measured.append({"width": width, "before": before, "after": after})
                self.assertTrue(page.evaluate("CSS.supports('animation-timeline: scroll(self block)')"))
                page.set_viewport_size({"width": 320, "height": 900})
                page.emulate_media(reduced_motion="no-preference")
                page.evaluate("document.querySelector('#stage').dataset.variant='alternate'")
                page.evaluate("document.querySelector('#stage').scrollTop=0")
                page.wait_for_timeout(40)
                initial_motion = page.evaluate("""()=>Object.fromEntries([...document.querySelector('#stage').getAnimations({subtree:true})
                    .filter(a=>['swiss-grid-reveal','swiss-rule-reveal'].includes(a.animationName))
                    .map(a=>[a.animationName,a.currentTime?.value??a.currentTime])])""")
                self.assertEqual(set(initial_motion), {"swiss-grid-reveal", "swiss-rule-reveal"}, initial_motion)
                initial_grid_transform = page.evaluate("getComputedStyle(document.querySelector('#stage'),'::before').transform")
                page.wait_for_timeout(120)
                idle_motion = page.evaluate("""()=>Object.fromEntries([...document.querySelector('#stage').getAnimations({subtree:true})
                    .filter(a=>['swiss-grid-reveal','swiss-rule-reveal'].includes(a.animationName))
                    .map(a=>[a.animationName,a.currentTime?.value??a.currentTime])])""")
                self.assertEqual(idle_motion, initial_motion, "scroll-linked reveals must not advance with elapsed wall time")
                self.assertEqual(page.evaluate("getComputedStyle(document.querySelector('#stage'),'::before').transform"), initial_grid_transform)
                page.evaluate("""()=>{const stage=document.querySelector('#stage'),target=document.querySelector('#t-recursos');
                  const targetTop=target.getBoundingClientRect().top-stage.getBoundingClientRect().top+stage.scrollTop;
                  stage.scrollTop=Math.max(0,targetTop-stage.clientHeight+target.offsetHeight*.3)}""")
                page.wait_for_timeout(40)
                scrolled_motion = page.evaluate("""()=>Object.fromEntries([...document.querySelector('#stage').getAnimations({subtree:true})
                    .filter(a=>['swiss-grid-reveal','swiss-rule-reveal'].includes(a.animationName))
                    .map(a=>[a.animationName,a.currentTime?.value??a.currentTime])])""")
                self.assertNotEqual(scrolled_motion["swiss-grid-reveal"], initial_motion["swiss-grid-reveal"])
                self.assertNotEqual(scrolled_motion["swiss-rule-reveal"], initial_motion["swiss-rule-reveal"])
                scrolled_grid_transform = page.evaluate("getComputedStyle(document.querySelector('#stage'),'::before').transform")
                self.assertNotEqual(scrolled_grid_transform, initial_grid_transform, "pseudo-element reveal must visibly use compositor transform")
                page.emulate_media(reduced_motion="reduce")
                page.wait_for_timeout(20)
                reduced_running = page.evaluate("""()=>[...document.querySelector('#stage').getAnimations({subtree:true})]
                    .filter(a=>a.playState==='running').map(a=>a.animationName)""")
                self.assertEqual(reduced_running, [])
                measured.append({"motion": {"initial": initial_motion, "idle": idle_motion, "afterScroll": scrolled_motion,
                    "initialGridTransform": initial_grid_transform, "afterScrollGridTransform": scrolled_grid_transform,
                    "reducedRunning": reduced_running}})
                browser.close()
        finally:
            server.shutdown()
            server.server_close()
        report = ROOT / ".superpowers/sdd/2026-10-17-plano-fechar-bloqueios-release/swiss-measurements.json"
        report.parent.mkdir(parents=True, exist_ok=True)
        report.write_text(json.dumps({"engine": "headless Chromium", "viewports": measured}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    unittest.main()
