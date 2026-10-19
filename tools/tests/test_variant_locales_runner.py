"""Regression contract for the end-to-end appearance locale runner."""
import importlib.util
from pathlib import Path
import unittest
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))
SPEC = importlib.util.spec_from_file_location("test_variant_locales", ROOT / "tools/test_variant_locales.py")
RUNNER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(RUNNER)


class VariantLocalesRunnerContractTests(unittest.TestCase):
    def test_runner_uses_the_eleven_supported_locales_and_default_alternate_modes(self):
        self.assertEqual(len(RUNNER.LOCALES), 11)
        self.assertIn("ar-SA", RUNNER.LOCALES)
        self.assertEqual(RUNNER.VARIANTS, ("default", "alternate"))

    def test_all_authored_sources_have_copy_for_every_supported_locale(self):
        source_dir = ROOT / "styles/variants/source"
        sources = [source_dir / path for path in source_dir.glob("*.json")]
        self.assertGreaterEqual(len(sources), 3)
        for path in sources:
            import json
            source = json.loads(path.read_text(encoding="utf-8"))
            self.assertEqual(set(source["locales"]), set(RUNNER.LOCALES), path.name)
            for locale in RUNNER.LOCALES:
                self.assertTrue(source["locales"][locale]["name"], f"{path.name}:{locale}:name")
                self.assertTrue(source["locales"][locale]["description"], f"{path.name}:{locale}:description")

    def test_runner_contract_exposes_review_fixture_and_release_default_checks(self):
        self.assertTrue(callable(getattr(RUNNER, "run_review_matrix", None)))
        self.assertTrue(callable(getattr(RUNNER, "check_release_defaults", None)))


if __name__ == "__main__":
    unittest.main()
