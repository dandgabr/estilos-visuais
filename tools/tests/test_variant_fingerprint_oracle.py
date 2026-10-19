"""Contracts for structural variant fingerprints and directed runtime mutants."""
from __future__ import annotations

import unittest
from collections import defaultdict
from pathlib import Path

from oracles.variant_fingerprint_oracle import fingerprint_css, mutation_contract, normalize_css


class VariantFingerprintOracleTests(unittest.TestCase):
    def test_repository_variant_sheets_have_no_slug_or_color_only_clones(self):
        root = Path(__file__).resolve().parents[2]
        sheets = sorted((root / "styles/variants/source").glob("*.css"))
        self.assertTrue(sheets, "expected variant CSS corpus")
        groups = defaultdict(list)
        for path in sheets:
            groups[fingerprint_css(path.read_text(encoding="utf-8"), slug=path.stem)].append(path.stem)
        clones = [sorted(slugs) for slugs in groups.values() if len(slugs) > 1]
        self.assertFalse(clones, f"variant CSS sheets clone another style after slug/color normalization: {clones}")

    def test_slug_variant_id_and_literal_color_differences_normalize_as_clone(self):
        first = '''/* comment */ #stage[data-style="nordic"][data-variant="c1"] .hero {
          color:#112233; background:rgba(10, 20, 30, .5); display:grid;
        } @keyframes nordic-c1-reveal { from { opacity:0; } to { opacity:1; } }
        #stage[data-style="nordic"][data-variant="c1"] .hero { animation:nordic-c1-reveal 500ms ease; }'''
        clone = '''#stage[data-style="cyberpunk"][data-variant="e3"] .hero {
          color:#abcdef; background:rgb(100 110 120); display:grid;
        } @keyframes cyberpunk-e3-reveal { from { opacity:0; } to { opacity:1; } }
        #stage[data-style="cyberpunk"][data-variant="e3"] .hero { animation:cyberpunk-e3-reveal 500ms ease; }'''
        self.assertEqual(fingerprint_css(first, slug="nordic"), fingerprint_css(clone, slug="cyberpunk"))

    def test_palette_variables_and_shorthand_color_values_normalize_as_clone(self):
        first = '''#stage[data-style="nordic"][data-variant="c1"]{--bg:#101112;--surface:#202122;--fg:#fefefe;--shadow:0 8px 24px rgba(0,0,0,.18)}
          #stage[data-style="nordic"][data-variant="c1"] .panel{border:1px solid #334455;background:linear-gradient(#101112,#202122);grid-template-columns:1fr 2fr}
          @keyframes nordic-c1-rise{from{opacity:0}to{opacity:1}}'''
        clone = '''#stage[data-style="cyberpunk"][data-variant="e3"]{--bg:#eeeeee;--surface:#dddddd;--fg:#010101;--shadow:0 8px 24px rgba(255,255,255,.7)}
          #stage[data-style="cyberpunk"][data-variant="e3"] .panel{border:1px solid #aabbcc;background:linear-gradient(#eeeeee,#dddddd);grid-template-columns:1fr 2fr}
          @keyframes cyberpunk-e3-rise{from{opacity:0}to{opacity:1}}'''
        self.assertEqual(fingerprint_css(first, slug="nordic"), fingerprint_css(clone, slug="cyberpunk"))

    def test_hash_ids_and_quoted_hash_content_outside_color_values_remain_distinct(self):
        first = '#abc .panel{color:#112233;background:#334455;content:"#aabbcc"}'
        changed_id = '#def .panel{color:#eeeeee;background:#778899;content:"#aabbcc"}'
        changed_content = '#abc .panel{color:#eeeeee;background:#778899;content:"#ddeeff"}'
        self.assertNotEqual(fingerprint_css(first), fingerprint_css(changed_id))
        self.assertNotEqual(fingerprint_css(first), fingerprint_css(changed_content))
        self.assertEqual(
            fingerprint_css(first),
            fingerprint_css('#abc .panel{color:#abcdef;background:#123456;content:"#aabbcc"}'),
            "literal color declarations normalize without rewriting selectors or content strings",
        )

    def test_url_fragment_is_not_treated_as_a_color_literal(self):
        first = '.icon{background-image:url(#icon-a);color:#123456}'
        changed_fragment = '.icon{background-image:url(#icon-b);color:#abcdef}'
        self.assertNotEqual(fingerprint_css(first), fingerprint_css(changed_fragment))

    def test_geometry_typography_material_and_composition_remain_fingerprint_inputs(self):
        base = '#stage[data-style="nordic"][data-variant="c1"] .hero{display:grid;grid-template-columns:1fr 1fr;gap:2rem;font-family:serif;letter-spacing:.04em;border-radius:2px;box-shadow:0 2px 4px #112233}'
        changes = (
            base.replace("grid-template-columns:1fr 1fr", "grid-template-columns:1fr"),
            base.replace("font-family:serif", "font-family:monospace"),
            base.replace("border-radius:2px", "border-radius:18px"),
            base.replace("gap:2rem", "gap:3rem"),
        )
        original = fingerprint_css(base, slug="nordic")
        for changed in changes:
            with self.subTest(changed=changed):
                self.assertNotEqual(original, fingerprint_css(changed, slug="nordic"))

    def test_keyframe_structure_and_timing_remain_fingerprint_inputs(self):
        base = '@keyframes nordic-c1-motion{from{transform:translateX(0)}to{transform:translateX(10px)}} .hero{animation:nordic-c1-motion 500ms ease}'
        changed_frames = base.replace("translateX(10px)", "translateY(10px)")
        changed_timing = base.replace("500ms", "700ms")
        self.assertNotEqual(fingerprint_css(base, slug="nordic"), fingerprint_css(changed_frames, slug="nordic"))
        self.assertNotEqual(fingerprint_css(base, slug="nordic"), fingerprint_css(changed_timing, slug="nordic"))

    def test_normalized_representation_is_available_for_failure_diagnostics(self):
        output = normalize_css('#stage[data-style="nordic"][data-variant="c1"]{color:#123456;gap:1rem}', slug="nordic")
        self.assertIn("STYLE", output)
        self.assertIn("VARIANT", output)
        self.assertIn("COLOR", output)
        self.assertIn("gap:1rem", output)

    def test_directed_runtime_mutation_matrix_is_explicitly_pending_integration(self):
        contract = mutation_contract()
        self.assertEqual(contract["status"], "integration-required")
        self.assertFalse(contract["executed"])
        cases = {case["target"]: case for case in contract["cases"]}
        self.assertEqual(set(cases), {"skillUrl", "resolveLocale", "setVariant", "stylesheet_failure", "fallback", "rollback"})
        for target, case in cases.items():
            with self.subTest(target=target):
                self.assertTrue(case["mutant"])
                self.assertTrue(case["requiredObservation"])


if __name__ == "__main__":
    unittest.main()
