"""Contract checks for the current default/alternate appearance model."""
import json
import re
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SLUGS = re.findall(r"\['([a-z0-9-]+)',\s*'", (ROOT / "styles/registry.js").read_text())
LEGACY_IDS = ("c1", "c2", "c3", "e1", "e2", "e3")


def registry_data():
    script = """
      import {VARIANTS} from './styles/variants/registry.js';
      import {STYLES} from './styles/registry.js';
      console.log(JSON.stringify({variants:VARIANTS, slugs:STYLES.map(style=>style.slug)}));
    """
    result = subprocess.run(
        ["node", "--input-type=module", "-e", script],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode:
        raise AssertionError(result.stderr)
    return json.loads(result.stdout.strip().splitlines()[-1])


class VariantDesignContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = registry_data()

    def test_registry_contains_defaults_and_only_approved_alternates(self):
        self.assertEqual(len(self.data["slugs"]), 82, "canonical registry must contain the frozen 82 styles")
        self.assertEqual(set(self.data["variants"]), set(self.data["slugs"]))
        sources = ROOT / "styles/variants/source"
        approved = {
            path.stem
            for path in sources.glob("*.json")
            if json.loads(path.read_text(encoding="utf-8")).get("status") == "approved"
        }
        failures = {}
        for slug, entries in self.data["variants"].items():
            expected = {"default", "alternate"} if slug in approved else {"default"}
            if set(entries) != expected:
                failures[slug] = {"actual": sorted(entries), "expected": sorted(expected)}
        self.assertFalse(
            failures,
            f"registry may contain only canonical defaults and source-approved alternates: {dict(list(failures.items())[:8])}",
        )
        self.assertEqual(
            sum("alternate" in entries for entries in self.data["variants"].values()),
            len(approved),
            "review candidates must not enter the generated release registry",
        )

    def test_current_registry_and_generator_do_not_emit_legacy_ids(self):
        legacy_pattern = re.compile(r"['\"](?:" + "|".join(LEGACY_IDS) + r")['\"]")
        registry = (ROOT / "styles/variants/registry.js").read_text()
        generator = (ROOT / "tools/generate_variant_design.py").read_text()
        self.assertIsNone(legacy_pattern.search(registry), "generated registry still contains C1–E3 identifiers")
        self.assertIsNone(legacy_pattern.search(generator), "generator still emits or depends on C1–E3 identifiers")

    def test_alternate_css_is_separate_from_canonical_style_sources(self):
        generator = (ROOT / "tools/generate_variant_design.py").read_text()
        self.assertIn("styles/variants/source/", generator, "generator must consume authored alternate sources")
        self.assertNotRegex(
            generator,
            r"\(ROOT\s*/\s*f?['\"]styles/\{slug\}\.css['\"]\)\.write_text",
            "generator must never overwrite canonical style CSS",
        )
        for slug in SLUGS:
            canonical = ROOT / f"styles/{slug}.css"
            alternate = ROOT / f"styles/variants/{slug}.css"
            self.assertNotEqual(canonical.resolve(), alternate.resolve(), slug)


if __name__ == "__main__":
    unittest.main()
