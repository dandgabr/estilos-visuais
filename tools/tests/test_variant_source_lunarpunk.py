"""Contract tests for the authored Lunarpunk alternate source."""
import json
import re
import shutil
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
JSON_PATH = ROOT / "styles/variants/source/lunarpunk.json"
CSS_PATH = ROOT / "styles/variants/source/lunarpunk.css"
LOCALES = {"pt-BR", "en-US", "es-ES", "fr-FR", "de-DE", "ru-RU", "ar-SA", "hi-IN", "zh-CN", "ja-JP", "ko-KR"}


def contrast(a, b):
    def lum(color):
        rgb = [int(color[i:i+2], 16) / 255 for i in (1, 3, 5)]
        linear = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in rgb]
        return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2]
    x, y = sorted((lum(a), lum(b)), reverse=True)
    return (x + .05) / (y + .05)


class LunarpunkSourceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads(JSON_PATH.read_text())
        cls.css = CSS_PATH.read_text()

    def test_schema_classification_and_polarities(self):
        d = self.data
        self.assertEqual(d["schemaVersion"], 1)
        self.assertEqual(d["slug"], "lunarpunk")
        self.assertIn(d["status"], {"ready_for_review", "approved"})
        self.assertEqual(d["classification"]["defaultPolarity"], "dark")
        self.assertEqual(d["classification"]["alternatePolarity"], "light")
        self.assertTrue(d["classification"]["evidence"])

    def test_all_eleven_locales_have_distinct_meaningful_copy(self):
        self.assertEqual(set(self.data["locales"]), LOCALES)
        for locale, entry in self.data["locales"].items():
            with self.subTest(locale=locale):
                self.assertTrue(entry["name"].strip())
                self.assertGreaterEqual(len(entry["description"].strip()), 35)
        self.assertEqual(len({x["name"] for x in self.data["locales"].values()}), len(LOCALES))

    def test_two_skill_backed_signals_and_layout_measurement_contract(self):
        signals = self.data["designSignals"]
        self.assertGreaterEqual(len(signals), 2)
        for signal in signals:
            self.assertTrue(signal["selector"].startswith("#stage"))
            self.assertIn("ui-style-lunarpunk/SKILL.md", signal["skillReference"])
            self.assertTrue(signal["evidence"])
        self.assertGreaterEqual(len(self.data["layoutChanges"]), 2)
        for change in self.data["layoutChanges"]:
            self.assertTrue(change["selector"].startswith("#stage"))
            self.assertTrue(change["before"] and change["after"])
            self.assertEqual(set(change["breakpoints"]), {"320", "375", "768", "1280"})

    def test_palette_contrast_and_lightness(self):
        tokens = self.data["palette"]["tokens"]
        self.assertGreater(contrast(tokens["--fg"], tokens["--bg"]), 4.5)
        self.assertGreater(contrast(tokens["--fg"], tokens["--surface"]), 4.5)
        self.assertGreater(contrast(tokens["--muted"], tokens["--bg"]), 4.5)
        self.assertGreater(contrast(tokens["--accent-fg"], tokens["--accent"]), 4.5)
        self.assertGreater(contrast(tokens["--focus"], tokens["--surface"]), 3)
        self.assertGreater(contrast(tokens["--bg"], "#0E1224"), 7)

    def test_essential_border_colors_meet_three_to_one_on_declared_surfaces(self):
        tokens = self.data["palette"]["tokens"]
        for surface in ("--bg", "--surface", "--surface-2"):
            with self.subTest(surface=surface):
                self.assertGreaterEqual(contrast(tokens["--border"], tokens[surface]), 3)

        required_rules = (
            (".card,", r"border:\s*1px solid var\(--border\)"),
            (".btn-secondary", r"border:\s*1px solid var\(--border\)"),
            (".btn-ghost", r"border-color:\s*var\(--border\)"),
            (".kpi", r"border-inline-start:\s*3px solid #59417F"),
            (".badge", r"border-color:\s*var\(--border\)"),
            ('input[type="text"]', r"border:\s*1px solid var\(--border\)"),
            (" th", r"border-bottom:\s*1px solid var\(--border\)"),
            (" td", r"border-bottom:\s*1px solid var\(--border\)"),
            (".toast", r"border:\s*1px solid var\(--border\)"),
            (" dialog", r"border-color:\s*var\(--border\)"),
            (".footer", r"border-color:\s*var\(--border\)"),
        )
        rules = [(match.group(1), match.group(2)) for match in re.finditer(r"([^{}]+)\{([^{}]*)\}", self.css)]
        for selector, declaration in required_rules:
            with self.subTest(selector=selector):
                matching_blocks = [body for selectors, body in rules if selector in selectors]
                self.assertTrue(matching_blocks, f"missing rule for {selector}")
                self.assertTrue(any(re.search(declaration, body) for body in matching_blocks), selector)

    def test_alternate_css_is_scoped_and_changes_geometry(self):
        self.assertIn('#stage[data-style="lunarpunk"][data-variant="alternate"]', self.css)
        self.assertRegex(self.css, r"\.kpis\s*\{[^}]*grid-template-columns\s*:\s*repeat\(2")
        self.assertIn("@media", self.css)
        self.assertNotIn("#stage[data-style=\"lunarpunk\"] {", self.css)
        self.assertNotRegex(self.css, r"(?<!-)--bg\s*:\s*#0E1224")

    def test_element_and_independent_background_motion_with_fallback(self):
        for kind in ("element", "background"):
            motion = self.data["motion"][kind]
            self.assertTrue(motion["selector"])
            self.assertTrue(motion["animation"])
            self.assertTrue(motion["trigger"])
            self.assertTrue(motion["duration"])
            self.assertTrue(motion["fallback"])
            self.assertTrue(motion["reducedMotion"])
            self.assertTrue(motion["pauseResume"])
            self.assertTrue(motion["cleanup"])
            self.assertIn("transform-only", motion["performanceEvidence"])
            self.assertIn("No frozen performance trace", motion["performanceEvidence"])
            self.assertIn("data-motion-", motion["runtimeInstrumentation"])
            self.assertIn("running → paused → running", motion["cssPauseResumeVerification"])
        self.assertIn("prefers-reduced-motion: reduce", self.css)
        self.assertIn("animation-timeline", self.css)

    def test_motion_keyframes_use_only_compositor_friendly_properties(self):
        for name in ("lunar-phase-sweep", "lunar-constellation-drift"):
            with self.subTest(animation=name):
                block = re.search(rf"@keyframes\s+{name}\s*\{{([\s\S]*?)\n\}}", self.css)
                self.assertIsNotNone(block, f"missing {name} keyframes")
                properties = re.findall(r"\b([a-z-]+)\s*:", block.group(1))
                self.assertTrue(properties)
                self.assertLessEqual(
                    set(properties), {"transform", "opacity"},
                    f"{name} animates paint/layout properties: {set(properties)}",
                )

    def test_runtime_lifecycle_markers_pause_and_resume_css_animations_in_chromium(self):
        chromium = shutil.which("chromium-browser")
        if not chromium:
            self.skipTest("Chromium headless is required for lifecycle animation probe")
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            self.skipTest("Python Playwright is unavailable")
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path=chromium, args=["--no-sandbox"])
            try:
                page = browser.new_page(viewport={"width": 1280, "height": 900}, reduced_motion="no-preference")
                page.set_content('''<div id="stage" data-style="lunarpunk" data-variant="alternate"
                    data-motion-active="true"><div class="app"><section class="hero"
                    data-motion-visible="true"></section></div></div>''')
                page.add_style_tag(content=self.css)

                def play_states():
                    return page.evaluate("""() => ({
                      element: getComputedStyle(document.querySelector('.hero'), '::before').animationPlayState,
                      background: getComputedStyle(document.querySelector('.app'), '::before').animationPlayState,
                      names: [
                        getComputedStyle(document.querySelector('.hero'), '::before').animationName,
                        getComputedStyle(document.querySelector('.app'), '::before').animationName
                      ]
                    })""")

                self.assertEqual(play_states()["names"], ["lunar-phase-sweep", "lunar-constellation-drift"])
                self.assertEqual(play_states()["element"], "running")
                self.assertEqual(play_states()["background"], "running")

                page.locator("#stage").evaluate("el => el.dataset.motionActive = 'false'")
                page.locator(".hero").evaluate("el => el.dataset.motionVisible = 'false'")
                self.assertEqual(play_states()["element"], "paused")
                self.assertEqual(play_states()["background"], "paused")

                page.locator("#stage").evaluate("el => el.dataset.motionActive = 'true'")
                page.locator(".hero").evaluate("el => el.dataset.motionVisible = 'true'")
                self.assertEqual(play_states()["element"], "running")
                self.assertEqual(play_states()["background"], "running")
            finally:
                browser.close()

    def test_unsupported_timelines_have_explicit_static_fallback(self):
        for timeline, selector in (("view", r"\.hero::before"), ("scroll", r"\.app::before")):
            with self.subTest(timeline=timeline):
                block = re.search(
                    rf"@supports not \(animation-timeline:\s*{timeline}\(\)\)\s*\{{[\s\S]*?{selector}\s*\{{([^}}]*)\}}",
                    self.css,
                )
                self.assertIsNotNone(block, f"missing explicit static fallback for {timeline} timeline")
                self.assertRegex(block.group(1), r"animation\s*:\s*none")
        # Static art is the base rule; motion is an enhancement behind @supports.
        self.assertEqual(len(re.findall(r"animation\s*:\s*lunar-phase-sweep", self.css)), 1)
        self.assertEqual(len(re.findall(r"animation\s*:\s*lunar-constellation-drift", self.css)), 1)

    def test_visibility_change_claim_matches_runtime_css_and_pending_performance_evidence(self):
        for kind in ("element", "background"):
            pause = self.data["motion"][kind]["pauseResume"].lower()
            self.assertIn("document.hidden", pause)
            self.assertIn("data-motion-", pause)
            self.assertIn("running → paused → running", pause)
            self.assertIn("test_variant_fixture_runtime.py", pause)
            self.assertIn("No frozen performance trace", self.data["motion"][kind]["performanceEvidence"])

    def test_reduced_motion_disables_both_effects_explicitly(self):
        rule = re.search(r"@media \(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}", self.css)
        self.assertIsNotNone(rule)
        self.assertIn(".hero::before", rule.group(1))
        self.assertIn(".app::before", rule.group(1))
        self.assertRegex(rule.group(1), r"animation\s*:\s*none\s*!important")

    def test_static_fallback_renders_when_timeline_enhancements_are_removed(self):
        chromium = shutil.which("chromium-browser")
        if not chromium:
            self.skipTest("Chromium headless is required for the fallback render probe")
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            self.skipTest("Python Playwright is unavailable")

        def remove_at_rule(css, header):
            start = css.index(header)
            brace = css.index("{", start)
            depth = 0
            quote = None
            for index in range(brace, len(css)):
                char = css[index]
                if quote:
                    if char == quote and css[index - 1] != "\\":
                        quote = None
                    continue
                if char in ("'", '"'):
                    quote = char
                elif char == "{":
                    depth += 1
                elif char == "}":
                    depth -= 1
                    if depth == 0:
                        return css[:start] + css[index + 1:]
            self.fail(f"unclosed CSS block: {header}")

        fallback_css = remove_at_rule(self.css, "@supports (animation-timeline: view())")
        fallback_css = remove_at_rule(fallback_css, "@supports (animation-timeline: scroll())")
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path=chromium, args=["--no-sandbox"])
            try:
                page = browser.new_page(viewport={"width": 375, "height": 812}, reduced_motion="no-preference")
                page.set_content('<div id="stage" data-style="lunarpunk" data-variant="alternate"><div class="app"><section class="hero"></section></div></div>')
                page.add_style_tag(content=fallback_css)
                state = page.evaluate("""() => ({
                    elementAnimation: getComputedStyle(document.querySelector('.hero'), '::before').animationName,
                    backgroundAnimation: getComputedStyle(document.querySelector('.app'), '::before').animationName,
                    elementPainted: getComputedStyle(document.querySelector('.hero'), '::before').backgroundImage !== 'none',
                    backgroundPainted: getComputedStyle(document.querySelector('.app'), '::before').backgroundImage !== 'none',
                    overflow: document.documentElement.scrollWidth > innerWidth
                })""")
                self.assertEqual(state["elementAnimation"], "none")
                self.assertEqual(state["backgroundAnimation"], "none")
                self.assertTrue(state["elementPainted"])
                self.assertTrue(state["backgroundPainted"])
                self.assertFalse(state["overflow"])
            finally:
                browser.close()

    def test_reduced_motion_stops_both_effects_in_chromium(self):
        chromium = shutil.which("chromium-browser")
        if not chromium:
            self.skipTest("Chromium headless is required for the reduced-motion render probe")
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            self.skipTest("Python Playwright is unavailable")
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path=chromium, args=["--no-sandbox"])
            try:
                page = browser.new_page(viewport={"width": 375, "height": 812}, reduced_motion="reduce")
                page.set_content('<div id="stage" data-style="lunarpunk" data-variant="alternate"><div class="app"><section class="hero"></section></div></div>')
                page.add_style_tag(content=self.css)
                state = page.evaluate("""() => ({
                    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
                    elementAnimation: getComputedStyle(document.querySelector('.hero'), '::before').animationName,
                    elementDuration: getComputedStyle(document.querySelector('.hero'), '::before').animationDuration,
                    backgroundAnimation: getComputedStyle(document.querySelector('.app'), '::before').animationName,
                    backgroundDuration: getComputedStyle(document.querySelector('.app'), '::before').animationDuration,
                    elementPainted: getComputedStyle(document.querySelector('.hero'), '::before').backgroundImage !== 'none',
                    backgroundPainted: getComputedStyle(document.querySelector('.app'), '::before').backgroundImage !== 'none',
                    overflow: document.documentElement.scrollWidth > innerWidth
                })""")
                self.assertTrue(state["reduced"])
                self.assertEqual(state["elementAnimation"], "none")
                self.assertEqual(state["elementDuration"], "0s")
                self.assertEqual(state["backgroundAnimation"], "none")
                self.assertEqual(state["backgroundDuration"], "0s")
                self.assertTrue(state["elementPainted"])
                self.assertTrue(state["backgroundPainted"])
                self.assertFalse(state["overflow"])
            finally:
                browser.close()

    def test_sources_are_urls_and_claims_are_scoped(self):
        self.assertTrue(self.data["sources"])
        for source in self.data["sources"]:
            self.assertRegex(source["url"], r"^https://")
            self.assertTrue(source["claim"])


if __name__ == "__main__":
    unittest.main()
