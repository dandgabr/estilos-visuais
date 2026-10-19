"""Contract tests for the unapproved Nordic dark counterpart source."""
from __future__ import annotations

import colorsys
import json
import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "styles/variants/source/nordic.json"
CSS = ROOT / "styles/variants/source/nordic.css"
HTML = ROOT / "index.html"
LOCALES = {
    "pt-BR", "en-US", "es-ES", "fr-FR", "de-DE", "ru-RU",
    "ar-SA", "hi-IN", "zh-CN", "ja-JP", "ko-KR",
}
BREAKPOINTS = {"320", "375", "768", "1280"}
COLOR_TOKENS = {
    "--bg", "--surface", "--surface-2", "--fg", "--muted", "--accent",
    "--accent-fg", "--border", "--ok", "--warn", "--danger", "--focus",
}
REQUIRED_TOKENS = COLOR_TOKENS | {"--shadow", "--radius", "--border-width"}


def luminance(color: str) -> float:
    value = color.lstrip("#")
    if len(value) == 3:
        value = "".join(char * 2 for char in value)
    rgb = [int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    linear = [channel / 12.92 if channel <= .04045 else ((channel + .055) / 1.055) ** 2.4 for channel in rgb]
    return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2]


def contrast_ratio(foreground: str, background: str) -> float:
    first, second = luminance(foreground), luminance(background)
    return (max(first, second) + .05) / (min(first, second) + .05)


class NordicSourceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Deliberately report a normal assertion failure while the source pair
        # is absent; do not synthesize or approve a counterpart in this test.
        cls.source_exists = SOURCE.is_file() and CSS.is_file()
        cls.data = json.loads(SOURCE.read_text(encoding="utf-8")) if SOURCE.is_file() else None
        cls.css = CSS.read_text(encoding="utf-8") if CSS.is_file() else ""
        cls.html = HTML.read_text(encoding="utf-8")

    def setUp(self):
        if not self.source_exists and self._testMethodName != "test_nordic_source_pair_exists":
            self.skipTest("source missing; the source-existence test is the intentional RED")

    def test_nordic_source_pair_exists(self):
        self.assertTrue(SOURCE.is_file(), f"missing counterpart metadata: {SOURCE}")
        self.assertTrue(CSS.is_file(), f"missing counterpart stylesheet: {CSS}")

    def test_source_is_an_unapproved_dark_counterpart_to_the_light_default(self):
        self.assertEqual(self.data["schemaVersion"], 1)
        self.assertEqual(self.data["slug"], "nordic")
        self.assertIn(self.data["status"], {"ready_for_review", "approved"})
        self.assertEqual(self.data["classification"]["defaultPolarity"], "light")
        self.assertEqual(self.data["classification"]["alternatePolarity"], "dark")
        self.assertTrue(self.data["classification"]["rationale"].strip())
        self.assertTrue(self.data["classification"]["evidence"].strip())

    def test_palette_is_complete_legible_and_uses_crepuscular_wood_and_amber(self):
        palette = self.data["palette"]
        tokens = palette["tokens"]
        self.assertTrue(REQUIRED_TOKENS <= tokens.keys())
        for token in COLOR_TOKENS:
            self.assertRegex(tokens[token], r"^#[0-9A-Fa-f]{6}$", token)
        self.assertLess(luminance(tokens["--bg"]), .08, "alternate canvas must be genuinely dark")

        for foreground in ("--fg", "--muted"):
            for background in ("--bg", "--surface", "--surface-2"):
                self.assertGreaterEqual(
                    contrast_ratio(tokens[foreground], tokens[background]), 4.5,
                    f"{foreground} on {background}",
                )
        self.assertGreaterEqual(contrast_ratio(tokens["--accent-fg"], tokens["--accent"]), 4.5)
        self.assertGreaterEqual(contrast_ratio(tokens["--focus"], tokens["--bg"]), 3.0)
        for state in ("--ok", "--warn", "--danger"):
            self.assertGreaterEqual(contrast_ratio(tokens[state], tokens["--surface-2"]), 4.5, state)

        # Frost remains the functional accent. Hygge warmth belongs to a
        # decorative custom token, so it is intentionally excluded from the
        # contrast assertions above.
        red, green, blue = (int(tokens["--accent"][i:i + 2], 16) / 255 for i in (1, 3, 5))
        hue, _lightness, saturation = colorsys.rgb_to_hls(red, green, blue)
        self.assertTrue(.50 <= hue <= .72, f"--accent should remain cool Frost, got hue={hue:.3f}")
        decorative = {key: value for key, value in tokens.items() if key in {"--wood", "--amber", "--hygge"}}
        self.assertTrue(decorative, "wood/amber warmth must use a decorative token, not --accent")
        for key, value in decorative.items():
            self.assertRegex(value, r"^#[0-9A-Fa-f]{6}$", key)
            self.assertNotEqual(value.upper(), tokens["--accent"].upper(), key)
        self.assertGreater(saturation, .2, "Frost accent must remain distinguishable from gray")
        self.assertTrue(re.search(r"madeira|wood|âmbar|amber|hygge", palette["intent"], re.I))

    def test_design_signals_cite_the_nordic_skill(self):
        signals = self.data["designSignals"]
        self.assertGreaterEqual(len(signals), 2)
        for signal in signals:
            reference = f"{signal.get('skillReference', '')} {signal.get('evidence', '')}"
            self.assertRegex(reference, r"styles/nordic\.css|ficha local|ficha F[0-9]+ Nordic")
            self.assertTrue(signal["selector"])
            self.assertTrue(signal["evidence"])
            self.assertRegex(signal["selector"], r"[.#][A-Za-z0-9_-]+")

    def test_layout_changes_are_measured_and_have_a_real_hero_panel_rule(self):
        changes = self.data["layoutChanges"]
        self.assertTrue(changes)
        hero_changes = [change for change in changes if ".hero" in change["selector"]]
        self.assertTrue(hero_changes, "the ficha calls for a dark-wood hero panel")
        for change in changes:
            self.assertTrue(change["property"])
            self.assertNotEqual(change["before"], change["after"])
            self.assertEqual(set(change["breakpoints"]), BREAKPOINTS)
            for viewport, measured in change["breakpoints"].items():
                self.assertNotEqual(measured["before"], measured["after"], viewport)
                self.assertNotIn("pending", str(measured).casefold(), viewport)
            selector_token = change["selector"].split()[0].lstrip("#.")
            self.assertIn(selector_token, self.html)

        normalized = re.sub(r"\s+", " ", self.css).casefold()
        self.assertIn('data-style="nordic"][data-variant="alternate"]', normalized)
        hero_rule = re.search(
            r'#stage\[data-style="nordic"\]\[data-variant="alternate"\]\s+\.hero\s*\{([^}]*)\}',
            normalized,
        )
        self.assertIsNotNone(hero_rule, "alternate hero needs its own panel/layout rule")
        self.assertRegex(hero_rule.group(1), r"(?:display\s*:\s*grid|grid-template-columns\s*:|padding\s*:)")
        self.assertRegex(hero_rule.group(1), r"(?:background|border|box-shadow)\s*:")

    def test_element_and_background_motion_have_separate_accessible_contracts(self):
        motion = self.data["motion"]
        element = motion["element"]
        background = motion["background"]
        required = ("selector", "animation", "trigger", "duration", "fallback", "reducedMotion", "pauseResume", "cleanup")
        for kind, contract in (("element", element), ("background", background)):
            for key in required:
                self.assertTrue(contract.get(key), f"{kind}.{key}")
            self.assertIn("reduced", contract["reducedMotion"].casefold())
            self.assertIn("visibility", contract["pauseResume"].casefold())
            self.assertRegex(contract["cleanup"].casefold(), r"remov|limp|desmont|clean")
            self.assertIn(contract["animation"], self.css)

        self.assertIn(".kpi", element["selector"])
        self.assertRegex(element["duration"].casefold(), r"500\s*ms")
        self.assertRegex(element["trigger"].casefold(), r"viewport|intersect|foco|focus")
        self.assertIn("#stage::after", background["selector"])
        self.assertRegex(background["duration"].casefold(), r"30\s*s(?:ec|eg)?")
        self.assertRegex(background["trigger"].casefold(), r"scroll|rolagem|rolar|rola\b")

        normalized = re.sub(r"\s+", " ", self.css).casefold()
        self.assertRegex(normalized, r'#stage\[data-style="nordic"\]\[data-variant="alternate"\]\s+\.kpi\b')
        self.assertIn('#stage[data-style="nordic"][data-variant="alternate"]::after', normalized)
        self.assertRegex(normalized, r"animation-duration:\s*500ms")
        self.assertRegex(normalized, r"animation-duration:\s*30s")
        self.assertRegex(normalized, r"@media\s*\(prefers-reduced-motion:\s*reduce\)")
        self.assertRegex(normalized, r"@keyframes\s+nordic-[\w-]+")

    def test_css_changes_are_scoped_to_the_alternate(self):
        self.assertRegex(self.css, r'data-style="nordic"\]\[data-variant="alternate"\]')
        self.assertNotRegex(self.css, r'#stage\[data-style="nordic"\](?!\[data-variant="alternate"\])')
        self.assertIn("prefers-reduced-motion", self.css)

    def test_all_eleven_locales_have_distinct_names_and_descriptions(self):
        locales = self.data["locales"]
        self.assertEqual(set(locales), LOCALES)
        names = set()
        for locale, copy in locales.items():
            self.assertGreaterEqual(len(copy["name"].strip()), 2, f"{locale} name")
            self.assertGreaterEqual(len(copy["description"].strip()), 45, f"{locale} description")
            self.assertNotEqual(copy["name"].strip().casefold(), "dark mode", locale)
            names.add(copy["name"].strip().casefold())
        self.assertEqual(len(names), len(LOCALES), "alternate names must be localized, not copied")


if __name__ == "__main__":
    unittest.main()
