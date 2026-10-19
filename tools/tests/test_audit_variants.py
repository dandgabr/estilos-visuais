"""Release-aware appearance selection for tools/audit.py."""
import tempfile
import unittest
from pathlib import Path
import sys

TOOLS = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(TOOLS))
import audit


class AuditVariantRegistryTests(unittest.TestCase):
    def test_release_reports_candidates_without_accepting_them(self):
        registry = {
            "nordic": {
                "default": {"id": "default", "status": "canonical"},
                "alternate": {"id": "alternate", "status": "approved"},
            },
            "dreamcore": {
                "default": {"id": "default", "status": "canonical"},
                "alternate": {"id": "alternate", "status": "ready_for_review"},
            },
        }

        inventory = {
            "nordic": {"status": "approved"},
            "dreamcore": {"status": "ready_for_review"},
        }
        cases = audit.variant_cases(["nordic", "dreamcore"], registry, inventory, build_kind="release")

        self.assertEqual([(c["slug"], c["appearance"], c["status"]) for c in cases], [
            ("nordic", "default", "canonical"), ("nordic", "alternate", "approved"),
            ("dreamcore", "default", "canonical"), ("dreamcore", "alternate", "ready_for_review"),
        ])
        self.assertTrue(cases[1]["runnable"])
        self.assertFalse(cases[3]["runnable"])
        gate = audit.variant_release_gate(inventory, registry, expected_slugs=["nordic", "dreamcore"])
        self.assertFalse(gate["passed"])
        self.assertEqual(gate["ready_for_review"], ["dreamcore"])

    def test_release_does_not_audit_unapproved_alternate_as_release_pass(self):
        inventory = {"nordic": {"status": "ready_for_review"}}

        gate = audit.variant_release_gate(inventory, {}, expected_slugs=["nordic"])

        self.assertFalse(gate["passed"])
        self.assertEqual(gate["ready_for_review"], ["nordic"])

    def test_missing_styles_keep_release_gate_closed(self):
        gate = audit.variant_release_gate({"nordic": {"status": "approved"}}, {}, expected_slugs=["nordic", "dreamcore"])

        self.assertFalse(gate["passed"])
        self.assertEqual(gate["missing"], ["dreamcore"])

    def test_approved_source_without_release_registry_entry_does_not_pass(self):
        inventory = {"nordic": {"status": "approved"}}

        gate = audit.variant_release_gate(inventory, {}, expected_slugs=["nordic"])

        self.assertFalse(gate["passed"])
        self.assertEqual(gate["unregistered"], ["nordic"])

    def test_approved_source_with_review_registry_status_does_not_pass(self):
        inventory = {"nordic": {"status": "approved"}}
        registry = {"nordic": {"alternate": {"id": "alternate", "status": "ready_for_review"}}}

        gate = audit.variant_release_gate(inventory, registry, expected_slugs=["nordic"])

        self.assertFalse(gate["passed"])
        self.assertEqual(gate["registry_unapproved"], ["nordic:ready_for_review"])

    def test_review_registry_parser_reads_default_and_alternate_records(self):
        registry_source = '''export const BUILD_KIND = "review";\nexport const VARIANTS = {\n  "nordic": {\n    "default": {"id": "default", "status": "canonical"},\n    "alternate": {"id": "alternate", "status": "ready_for_review"}\n  }\n};\n'''
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "registry.js"
            path.write_text(registry_source, encoding="utf-8")

            build_kind, registry = audit.load_variant_registry(path)

        self.assertEqual(build_kind, "review")
        self.assertEqual(registry["nordic"]["alternate"]["status"], "ready_for_review")


if __name__ == "__main__":
    unittest.main()
