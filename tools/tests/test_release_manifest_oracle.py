from copy import deepcopy
from pathlib import Path
import sys
import json
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "tools"))
from oracles.release_manifest_oracle import (  # noqa: E402
    build_manifests,
    validate_manifest,
)


class ReleaseManifestOracleTests(unittest.TestCase):
    def test_staging_manifests_reflect_current_alternate_inventory(self):
        manifests = build_manifests()
        self.assertEqual(set(manifests), {"canonical-parity", "structural", "primary-locales", "complementary-locales"})
        canonical = manifests["canonical-parity"]
        structural = manifests["structural"]
        primary = manifests["primary-locales"]
        complementary = manifests["complementary-locales"]

        self.assertEqual(canonical["expectedCases"], 1312)
        self.assertEqual(canonical["axes"]["canonicalStyleCount"], 82)
        self.assertEqual(canonical["axes"]["alternateCount"], 82)
        self.assertEqual(structural["expectedCases"], 16 * (82 + 82))
        self.assertEqual(primary["expectedCases"], 8 * (2 * (82 + 82) + 9 * 82))
        self.assertEqual(complementary["expectedCases"], 88 * (82 + 82))

        alternates = [case for case in structural["cases"] if case["variant"] == "alternate"]
        self.assertTrue(alternates)
        self.assertTrue({case["status"] for case in alternates} <= {"ready_for_review", "approved"})
        self.assertEqual(len({case["slug"] for case in alternates}), 82)

    def test_release_refuses_unapproved_or_incomplete_inventory(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "styles").mkdir()
            (root / "styles/registry.js").write_text(
                "export const STYLE_REGISTRY = [\n" + "".join(
                    f"  ['style-{i:02d}', 'Style {i}'],\n" for i in range(82)
                ) + "];\n",
                encoding="utf-8",
            )
            source = root / "styles/variants/source"
            source.mkdir(parents=True)
            for i in range(82):
                status = "approved" if i < 81 else "ready_for_review"
                (source / f"style-{i:02d}.json").write_text(
                    f'{{"slug":"style-{i:02d}","status":"{status}"}}', encoding="utf-8"
                )
            with self.assertRaisesRegex(ValueError, "release requires 82 approved alternates"):
                build_manifests(root, mode="release")

    def test_complete_release_has_the_plan_mandated_case_counts(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "styles").mkdir()
            (root / "styles/registry.js").write_text(
                "export const STYLE_REGISTRY = [\n" + "".join(
                    f"  ['style-{i:02d}', 'Style {i}'],\n" for i in range(82)
                ) + "];\n",
                encoding="utf-8",
            )
            source = root / "styles/variants/source"
            source.mkdir(parents=True)
            for i in range(82):
                (source / f"style-{i:02d}.json").write_text(
                    f'{{"slug":"style-{i:02d}","status":"approved"}}', encoding="utf-8"
                )
            manifests = build_manifests(root, mode="release")

        self.assertEqual([m["expectedCases"] for m in manifests.values()], [1312, 2624, 8528, 14432])
        self.assertEqual({case["status"] for case in manifests["structural"]["cases"]
                          if case["variant"] == "alternate"}, {"approved"})

    def test_missing_and_duplicate_cases_fail_validation(self):
        valid = build_manifests()["structural"]
        missing = deepcopy(valid)
        missing["cases"].pop()
        with self.assertRaisesRegex(ValueError, "missing cases"):
            validate_manifest(missing)

        duplicated = deepcopy(valid)
        duplicated["cases"].append(deepcopy(duplicated["cases"][0]))
        with self.assertRaisesRegex(ValueError, "duplicate cases"):
            validate_manifest(duplicated)

    def test_duplicate_sources_and_unknown_status_fail_closed(self):
        manifests = build_manifests()
        self.assertEqual(len(manifests["structural"]["cases"]), 16 * 164)

        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "styles").mkdir()
            (root / "styles/registry.js").write_text(
                "export const STYLE_REGISTRY = [\n" + "".join(
                    f"  ['style-{i:02d}', 'Style {i}'],\n" for i in range(82)
                ) + "];\n",
                encoding="utf-8",
            )
            source = root / "styles/variants/source"
            source.mkdir(parents=True)
            (source / "style-00.json").write_text(
                '{"slug":"style-00","status":"ready_for_review"}', encoding="utf-8"
            )
            (source / "zstyle.json").write_text(
                '{"slug":"style-00","status":"approved"}', encoding="utf-8"
            )
            with self.assertRaisesRegex(ValueError, "duplicate alternate source"):
                build_manifests(root)

            (source / "zstyle.json").unlink()
            (source / "style-00.json").write_text(
                '{"slug":"style-00","status":"draft"}', encoding="utf-8"
            )
            with self.assertRaisesRegex(ValueError, "unsupported alternate status"):
                build_manifests(root)

    def test_manifests_are_deterministic_and_contain_no_legacy_ids(self):
        first = build_manifests()
        second = build_manifests()
        self.assertEqual(first, second)
        for manifest in first.values():
            self.assertTrue({case["variant"] for case in manifest["cases"]} <= {"default", "alternate"})


if __name__ == "__main__":
    unittest.main()
