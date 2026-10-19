"""Authoring contract for the Split-Screen Dualism alternate pilot."""
from __future__ import annotations

import json
import hashlib
import re
import unittest
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "styles/variants/source/split-screen-dualism.json"
CSS = ROOT / "styles/variants/source/split-screen-dualism.css"
RENDER_AUDIT = ROOT / "docs/temp/reports/2026-10-18-split-screen-dualism-render-audit.json"
SLUG = "split-screen-dualism"
BREAKPOINTS = {"320", "375", "768", "1280"}
LOCALES = {"pt-BR", "en-US", "es-ES", "fr-FR", "de-DE", "ru-RU", "ar-SA", "hi-IN", "zh-CN", "ja-JP", "ko-KR"}
SIGNALS = {"vertical meridian", "complementary hemispheres"}


class SplitScreenSourceContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads(SOURCE.read_text(encoding="utf-8"))
        cls.css = CSS.read_text(encoding="utf-8")

    def test_source_identifies_a_reviewable_alternate_without_changing_default(self):
        data = self.data
        self.assertEqual(data["schemaVersion"], 1)
        self.assertEqual(data["slug"], SLUG)
        self.assertIn(data["status"], {"ready_for_review", "approved"})
        classification = data["classification"]
        self.assertEqual(classification["defaultPolarity"], "dark")
        self.assertEqual(classification["alternatePolarity"], "light")
        self.assertTrue(classification["rationale"].strip())
        self.assertTrue(classification["evidence"])

    def test_palette_has_semantic_tokens_and_contrast_pairs_for_both_poles(self):
        tokens = self.data["palette"]["tokens"]
        for key in ("--bg", "--surface", "--surface-2", "--fg", "--muted", "--accent",
                    "--accent-fg", "--border", "--ok", "--warn", "--danger",
                    "--focus", "--shadow", "--split-left-bg", "--split-right-bg",
                    "--split-meridian"):
            self.assertIn(key, tokens)
        for pair in self.data["palette"]["contrastPairs"]:
            self.assertIn("foreground", pair)
            self.assertIn("background", pair)
            self.assertGreaterEqual(pair["ratio"], 4.5)
            self.assertEqual(pair["measurement"], "computed-sRGB-WCAG2")
            self.assertAlmostEqual(pair["ratio"], self.contrast(pair["foreground"], pair["background"]), places=2)

    @staticmethod
    def contrast(foreground, background):
        def luminance(color):
            channels = [int(color[index:index + 2], 16) / 255 for index in (1, 3, 5)]
            linear = [value / 12.92 if value <= .04045 else ((value + .055) / 1.055) ** 2.4
                      for value in channels]
            return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2]
        high, low = sorted((luminance(foreground), luminance(background)), reverse=True)
        return (high + .05) / (low + .05)

    def test_two_identity_signals_cite_the_domain_skill_and_exact_selectors(self):
        signals = self.data["designSignals"]
        self.assertGreaterEqual(len(signals), 2)
        combined = " ".join(signal["signal"].lower() for signal in signals)
        for required in SIGNALS:
            self.assertIn(required, combined)
        for signal in signals:
            self.assertTrue(signal["selector"])
            self.assertIn("ui-style-split-screen-dualism/SKILL.md", signal["skillReference"])
            self.assertTrue(signal["evidence"])

    def test_layout_records_real_order_or_geometry_change_at_every_required_width(self):
        changes = self.data["layoutChanges"]
        self.assertGreaterEqual(len(changes), 3)
        changed_widths = set()
        for change in changes:
            self.assertTrue(change["selector"])
            self.assertTrue(change["property"])
            self.assertNotEqual(change["before"], change["after"])
            self.assertEqual(set(change["breakpoints"]), BREAKPOINTS)
            for width, geometry in change["breakpoints"].items():
                self.assertTrue(geometry.get("measurement", "").startswith(("pending:", "captured:")), width)
                if geometry["before"] != geometry["after"]:
                    changed_widths.add(width)
        self.assertEqual(changed_widths, BREAKPOINTS)

    def test_localized_alternate_has_all_eleven_supported_locales(self):
        self.assertEqual(set(self.data["locales"]), LOCALES)
        for locale, value in self.data["locales"].items():
            with self.subTest(locale=locale):
                self.assertTrue(value["name"].strip())
                self.assertTrue(value["description"].strip())

    def test_both_motion_tracks_include_reduced_motion_and_lifecycle_contracts(self):
        for key in ("element", "background"):
            motion = self.data["motion"][key]
            for field in ("selector", "animation", "trigger", "duration", "fallback",
                          "reducedMotion", "pauseResume", "cleanup"):
                self.assertTrue(motion[field], f"{key}.{field}")
            self.assertIn("prefers-reduced-motion", motion["reducedMotion"])
            self.assertIn("pendente", motion["pauseResume"].lower())
            self.assertIn("pendente", motion["cleanup"].lower())

    def test_background_timing_metadata_matches_each_css_animation_direction(self):
        motion = self.data["motion"]["background"]
        self.assertEqual(motion["animation"], "ssd-polar-fields 34s ease-in-out infinite alternate; ::after uses alternate-reverse.")
        self.assertEqual(motion["duration"], "34s; ease-in-out; infinite alternate; ::after alternate-reverse")
        self.assertIn("animation: ssd-polar-fields 34s ease-in-out infinite alternate;", self.css)
        self.assertIn("animation-direction: alternate-reverse;", self.css)
        element = self.data["motion"]["element"]
        self.assertEqual(element["animation"], "ssd-meridian-turn 8s ease-in-out infinite")
        self.assertEqual(element["duration"], "8s ease-in-out infinite")
        self.assertIn("animation: ssd-meridian-turn 8s ease-in-out infinite;", self.css)

    def test_render_audit_contains_screenshots_and_surface_contrast_for_all_viewports(self):
        audit_metadata = self.data["evidence"]["renderAudit"]
        self.assertEqual(audit_metadata["path"], "docs/temp/reports/2026-10-18-split-screen-dualism-render-audit.json")
        audit = json.loads(RENDER_AUDIT.read_text(encoding="utf-8"))
        self.assertEqual(audit["status"], "superseded-source-change")
        self.assertEqual(audit["supersededBy"]["path"], "docs/temp/reports/2026-10-18-variant-matrix.json")
        self.assertIn("--border", audit["supersededBy"]["reason"])
        fixture = audit["fixture"]
        self.assertEqual(fixture["activeStyleSlug"], SLUG)
        self.assertEqual(fixture["stageDataStyle"], SLUG)
        self.assertEqual(fixture["stylesheetMode"], "isolated-source-css")
        self.assertIn("data-variant=alternate", fixture["alternateMarker"])
        self.assertEqual(fixture["canonicalCssSha256"], "49737ef9784b07a5f9055d91df57f8f0e5b329082c6d590b405d9f36f4b2980e")
        self.assertNotEqual(fixture["alternateCssSha256"], hashlib.sha256(CSS.read_bytes()).hexdigest())
        self.assertEqual(audit["supersededSourceSha256"], fixture["alternateCssSha256"])
        self.assertIn("split-screen-dualism", fixture["activeStylesheetHrefs"][0])
        self.assertEqual(fixture["activeStylesheetHashes"], [fixture["canonicalCssSha256"], fixture["alternateCssSha256"]])
        self.assertEqual(set(audit["viewports"]), BREAKPOINTS)
        for width, entry in audit["viewports"].items():
            self.assertEqual(set(entry["modes"]), {"default", "alternate"}, width)
            for mode, result in entry["modes"].items():
                capture = ROOT / result["screenshot"]
                self.assertTrue(capture.is_file(), f"missing {width}px {mode} screenshot")
                self.assertEqual(len(result["sha256"]), 64)
                self.assertEqual(hashlib.sha256(capture.read_bytes()).hexdigest(), result["sha256"])
                self.assertEqual(result["viewportWidth"], int(width))
                self.assertEqual(result["documentScrollWidth"], int(width))
                self.assertEqual(result["stageDataStyle"], SLUG)
                self.assertEqual(result["activeStyleSlug"], SLUG)
                self.assertEqual(result["activeStylesheetHashes"], fixture["activeStylesheetHashes"])
                self.assertEqual(result["stylesheetSources"], fixture["activeStylesheetHrefs"])
                markers = result["stageProof"]["styleMarkers"]
                self.assertEqual([marker["source"] for marker in markers], fixture["activeStylesheetHrefs"])
                self.assertTrue(all(marker["active"] and marker["characters"] > 0 for marker in markers))
                self.assertEqual(result["stageProof"]["stageDataStyle"], SLUG)
                self.assertEqual(result["stageProof"]["activeStyleSlug"], SLUG)
                self.assertEqual(result["stageProof"]["stageVariant"], "alternate" if mode == "alternate" else "default")
                self.assertTrue(result["twoPoleGeometry"]["leftPole"])
                self.assertTrue(result["twoPoleGeometry"]["rightPole"])
                self.assertGreaterEqual(result["surfacesAudited"], 20)
                self.assertTrue(result["contrastPairs"])
                categories = {pair["category"] for pair in result["contrastPairs"]}
                self.assertTrue({"muted", "link", "status", "focus"}.issubset(categories))
                selectors = {pair["selector"] for pair in result["contrastPairs"]}
                self.assertTrue(any("badge.ok" in selector for selector in selectors))
                self.assertTrue(any("badge.warn" in selector for selector in selectors))
                self.assertTrue(any("badge.danger" in selector for selector in selectors))
                geometry = result["geometry"]
                for key in ("topbar", "hero", "display", "lead", "actions", "metrics",
                            "resources", "chart", "splitPanels", "formFields", "links",
                            "statusBadges", "toast"):
                    self.assertTrue(geometry.get(key), f"{width}/{mode} missing geometry {key}")
                self.assertEqual(result["documentScrollWidth"], result["viewportWidth"])
                for pair in result["contrastPairs"]:
                    threshold = 3.0 if pair["category"] == "focus" else 4.5
                    self.assertEqual(pair["threshold"], threshold)
                    if mode == "alternate":
                        self.assertGreaterEqual(pair["ratio"], threshold,
                                                f"{width}/{mode}/{pair['selector']}")
            if width in {"320", "375"}:
                mobile = entry["modes"]["alternate"]["mobileComposition"]
                self.assertIs(mobile["centralMeridianCrossesText"], False)
                self.assertEqual(mobile["stageBackgroundImage"], "none")
        self.assertTrue(RENDER_AUDIT.is_file())

    def test_source_records_skill_hash_and_explicit_measurement_limits(self):
        skill = self.data["classification"]["skill"]
        self.assertEqual(skill["sha256"], "bcc8b62b45688f4514788f35a87750e22e4e9626761d1f1b2216387939b7f4a2")
        self.assertTrue(self.data["sources"])
        self.assertTrue(any("pending" in source["claim"].lower() for source in self.data["sources"]))
        self.assertEqual(self.data["sources"][0]["url"],
                         "https://github.com/dandgabr/Coacus/blob/main/knowledge/skills/domains/design/ui-style-split-screen-dualism/SKILL.md")

    def test_rendered_claims_match_audit_and_keep_unverified_work_explicit(self):
        audit_path = self.data["evidence"]["renderAudit"]["path"]
        for signal in self.data["designSignals"]:
            self.assertIn(audit_path, signal["evidence"])
            self.assertNotRegex(signal["evidence"].lower(), r"capturas? pendente")
        for source in self.data["sources"][1:3]:
            self.assertIn(audit_path, source["claim"])
            self.assertNotIn("measurement remains pending", source["claim"].lower())
            self.assertNotIn("geometry and actual visual deltas are pending", source["claim"].lower())
        limits = " ".join(source["claim"].lower() for source in self.data["sources"])
        for pending in ("runtime integration", "lifecycle", "performance", "human density", "tablet", "mobile"):
            self.assertIn(pending, limits)

    def test_css_reverses_dominant_polarity_reflows_layout_and_preserves_two_poles(self):
        self.assertIn("#stage[data-style=\"split-screen-dualism\"]", self.css)
        self.assertRegex(self.css, r"background\s*:\s*linear-gradient\(90deg")
        self.assertRegex(self.css, r"#view-painel[^{}]*\{[^}]*display\s*:\s*grid")
        self.assertIn("grid-template-areas", self.css)
        self.assertIn("@media (min-width: 861px)", self.css)
        self.assertIn("@media (min-width: 720px) and (max-width: 860px)", self.css)
        self.assertIn("grid-template-columns: minmax(0, 1fr)", self.css)
        self.assertIn("@media (prefers-reduced-motion: reduce)", self.css)
        self.assertIn('[data-motion-active="true"]', self.css)
        self.assertIn('[data-motion-visible="true"]', self.css)
        self.assertIn("::before", self.css)
        self.assertIn("::after", self.css)
        self.assertIn("animation-play-state", self.css)

    def test_mobile_composition_keeps_meridian_out_of_text_while_retaining_two_poles(self):
        mobile = self.css.split("@media (max-width: 540px)", 1)[1]
        self.assertIn("background: var(--split-left-bg)", mobile)
        self.assertIn("box-shadow: inset 4px 0 0 var(--split-left-accent), inset -4px 0 0 var(--split-right-accent)", mobile)
        self.assertIn("#view-painel > section,", mobile)

    def test_actual_split_css_activates_in_isolated_fixture_before_capture(self):
        fixture_html = '''<!doctype html><html><body>
          <main id="stage" data-style="split-screen-dualism" data-audit-source="split-screen-dualism-pilot">
            <div class="app"><header class="topbar"><div class="brand"><span class="brand-mark"></span>COACUS STUDIO</div><nav class="nav"><a class="is-active">Dashboard</a></nav></header>
              <section id="view-painel" class="is-active"><div class="hero"><p class="eyebrow">DESIGN PLATFORM</p><h1 class="display">Create interfaces</h1><p class="lead">Example reading content.</p><button class="btn btn-primary">Start</button></div>
                <section aria-labelledby="t-metricas"><h2 id="t-metricas">Metrics</h2><div class="kpis"><article class="card">KPI</article></div></section>
              </section>
            </div>
          </main></body></html>'''
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path="/usr/bin/chromium-browser")
            page = browser.new_page(viewport={"width": 1280, "height": 900}, reduced_motion="reduce")
            page.set_content(fixture_html)
            canonical = page.add_style_tag(content=(ROOT / "styles/split-screen-dualism.css").read_text(encoding="utf-8"))
            canonical.evaluate("style => style.dataset.auditSource = 'styles/split-screen-dualism.css'")
            alternate = page.add_style_tag(content=self.css)
            alternate.evaluate("style => style.dataset.auditSource = 'styles/variants/source/split-screen-dualism.css'")
            proof = page.locator("#stage").evaluate("""stage => ({
              slug: stage.dataset.style,
              source: stage.dataset.auditSource,
              background: getComputedStyle(stage).backgroundImage,
              markers: [...document.querySelectorAll('style[data-audit-source]')].map(x => x.dataset.auditSource)
            })""")
            self.assertEqual(proof["slug"], SLUG)
            self.assertEqual(proof["source"], "split-screen-dualism-pilot")
            self.assertIn("linear-gradient", proof["background"])
            self.assertEqual(proof["markers"], ["styles/split-screen-dualism.css", "styles/variants/source/split-screen-dualism.css"])
            page.locator("#stage").screenshot()

            page.set_viewport_size({"width": 320, "height": 900})
            page.locator("#stage").evaluate("stage => stage.dataset.variant = 'alternate'")
            mobile = page.locator("#stage").evaluate("""stage => ({
              slug: stage.dataset.style,
              variant: stage.dataset.variant,
              background: getComputedStyle(stage).backgroundImage,
              rails: getComputedStyle(stage.querySelector('.hero')).boxShadow,
              hero: (() => { const r=stage.querySelector('.hero').getBoundingClientRect(); return {x:r.x,width:r.width}; })(),
              leftPole: getComputedStyle(stage).getPropertyValue('--split-left-accent').trim(),
              rightPole: getComputedStyle(stage).getPropertyValue('--split-right-accent').trim()
            })""")
            self.assertEqual(mobile["slug"], SLUG)
            self.assertEqual(mobile["variant"], "alternate")
            self.assertEqual(mobile["background"], "none")
            self.assertIn("rgb(142, 52, 39)", mobile["rails"])
            self.assertIn("rgb(13, 86, 134)", mobile["rails"])
            self.assertTrue(mobile["leftPole"] and mobile["rightPole"])
            page.locator("#stage").screenshot()
            browser.close()


if __name__ == "__main__":
    unittest.main()
