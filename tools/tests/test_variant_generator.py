"""Tests for the source-driven appearance registry generator."""
from __future__ import annotations

import importlib.util
import hashlib
import json
import tempfile
import unittest
from unittest import mock
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location(
    "generate_variant_design", ROOT / "tools/generate_variant_design.py"
)
generator = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(generator)


def write_source(root: Path, slug: str, *, status: str = "ready_for_review") -> None:
    directory = root / "source"
    directory.mkdir(parents=True, exist_ok=True)
    tokens = {
        "--bg": "#101010", "--surface": "#202020", "--surface-2": "#303030",
        "--fg": "#FFFFFF", "--muted": "#CCCCCC", "--accent": "#FFAA00",
        "--accent-fg": "#000000", "--border": "#888888", "--ok": "#00AA00",
        "--warn": "#FFCC00", "--danger": "#FF5555", "--focus": "#FFFF00",
    }
    locales = {
        locale: {"name": f"Name {locale}", "description": f"Description {locale}"}
        for locale in generator.LOCALES
    }
    data = {
        "schemaVersion": 1,
        "slug": slug,
        "status": status,
        "classification": {"defaultPolarity": "light", "alternatePolarity": "dark"},
        "palette": {"tokens": tokens},
        "designSignals": [{"selector": ".hero", "signal": "grid", "skillReference": "skill", "evidence": "observed"}],
        "layoutChanges": [{"selector": ".hero", "property": "display", "before": "block", "after": "grid", "breakpoints": {"320": {"before": "block", "after": "grid"}}}],
        "motion": {
            "element": {"selector": ".hero", "animation": "reveal", "trigger": "scroll", "duration": "1s", "fallback": "static", "reducedMotion": "static", "pauseResume": "scroll", "cleanup": "CSS"},
            "background": {"selector": "#stage::before", "animation": "field", "trigger": "scroll", "duration": "2s", "fallback": "static", "reducedMotion": "static", "pauseResume": "scroll", "cleanup": "CSS"},
        },
        "locales": locales,
        "sources": [{"title": "Test design source", "url": "https://example.invalid/skill", "kind": "domain skill", "claim": "Design rationale"}],
    }
    declarations = '; '.join(f'{key}: {value}' for key, value in tokens.items())
    css_text = f'#stage[data-style="{slug}"][data-variant="alternate"] {{ {declarations}; }}\n'
    if status == "approved":
        data["author"] = "pilot-author"
        data["snapshotDigest"] = "a" * 64
        artifacts = {}
        for name, content in (("render-audit.json", b"render"), ("qa-report.json", b"qa"), ("ux-report.json", b"ux")):
            (directory.parent / name).write_bytes(content)
            artifacts[name] = hashlib.sha256(content).hexdigest()
        data["evidence"] = {"artifacts": [{"path": "render-audit.json", "sha256": artifacts["render-audit.json"]}]}
        data["generatedDigest"] = generator.generated_artifact_digest(data, css_text)
        data["contentDigest"] = generator.content_digest(
            data, css_text, snapshot_digest=data["snapshotDigest"]
        )
        data["reviews"] = [
            {"reviewer": reviewer, "role": role, "verdict": "ACCEPT",
             "contentDigest": data["contentDigest"],
             "evidence": [{"path": artifact, "sha256": artifacts[artifact]}]}
            for reviewer, role, artifact in (
                ("qa-reviewer", "QA", "qa-report.json"),
                ("ux-reviewer", "UX/UI", "ux-report.json"),
            )
        ]
    (directory / f"{slug}.json").write_text(json.dumps(data), encoding="utf-8")
    (directory / f"{slug}.css").write_text(css_text, encoding="utf-8")


class VariantGeneratorTests(unittest.TestCase):
    def test_localized_alternate_keys_are_source_driven_and_legacy_keys_removed(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            source_dir = root / "source"
            write_source(root, "approved-style", status="approved")
            write_source(root, "candidate-style", status="ready_for_review")
            sources = generator.load_sources(source_dir, ["approved-style", "candidate-style"])
            locale_dir = root / "i18n" / "locales"
            locale_dir.mkdir(parents=True)
            for locale in generator.LOCALES:
                if locale == "pt-BR":
                    module = {
                        "gallery.label": "Galeria",
                        "appearance.legacy-style.c1.name": "legado",
                    }
                else:
                    module = {
                        "strings": {"Galeria": "Gallery"},
                        "keys": {
                            "gallery.label": "Gallery",
                            "appearance.legacy-style.e3.description": "legacy",
                        },
                        "styleDescriptions": {"legacy-style": "Keep this"},
                    }
                (locale_dir / f"{locale}.js").write_text(
                    "export default " + json.dumps(module, ensure_ascii=False, indent=2) + ";\n",
                    encoding="utf-8",
                )

            generator.write_locale_outputs(locale_dir, sources, environment="review")
            review_snapshot = {path.name: path.read_text(encoding="utf-8") for path in locale_dir.glob("*.js")}
            for locale in generator.LOCALES:
                text = review_snapshot[f"{locale}.js"]
                self.assertIn(f'"appearance.approved-style.alternate.name": "Name {locale}"', text)
                self.assertIn(f'"appearance.candidate-style.alternate.description": "Description {locale}"', text)
                self.assertNotRegex(text, r'appearance\.legacy-style\.[ce][1-3]')
            generator.write_locale_outputs(locale_dir, sources, environment="review")
            self.assertEqual(review_snapshot, {path.name: path.read_text(encoding="utf-8") for path in locale_dir.glob("*.js")})

            generator.write_locale_outputs(locale_dir, sources, environment="release")
            for locale in generator.LOCALES:
                text = (locale_dir / f"{locale}.js").read_text(encoding="utf-8")
                self.assertIn(f'"appearance.approved-style.alternate.name": "Name {locale}"', text)
                self.assertNotIn("appearance.candidate-style.alternate.", text)
                self.assertNotRegex(text, r'appearance\.legacy-style\.[ce][1-3]')
                if locale != "pt-BR":
                    self.assertIn('"styleDescriptions": {\n    "legacy-style": "Keep this"', text)

    def test_release_registry_contains_only_approved_sources(self):
        with tempfile.TemporaryDirectory() as temp:
            source_dir = Path(temp) / "source"
            write_source(Path(temp), "approved-style", status="approved")
            write_source(Path(temp), "candidate-style", status="ready_for_review")
            sources = generator.load_sources(source_dir, ["approved-style", "candidate-style"])
            registry = generator.build_registry(
                ["approved-style", "candidate-style"], sources, environment="release", source_dir=source_dir
            )
        self.assertEqual(set(registry["approved-style"]), {"default", "alternate"})
        self.assertEqual(registry["candidate-style"].keys(), {"default"})
        self.assertEqual(registry["approved-style"]["alternate"]["status"], "approved")
        self.assertEqual(registry["approved-style"]["alternate"]["id"], "alternate")
        self.assertEqual(registry["candidate-style"]["default"]["polarity"], "light")

    def test_approved_sources_require_evidence_and_distinct_digest_bound_reviewers(self):
        with tempfile.TemporaryDirectory() as temp:
            source_dir = Path(temp) / "source"
            write_source(Path(temp), "approved-style", status="approved")
            source_path = source_dir / "approved-style.json"
            valid_source = json.loads(source_path.read_text(encoding="utf-8"))
            self.assertEqual(generator.load_sources(source_dir, ["approved-style"])['approved-style']['status'], "approved")

            for mutate, expected in (
                (lambda source: source.pop("evidence"), "evidence"),
                (lambda source: source.pop("reviews"), "reviews"),
                (lambda source: source.__setitem__("reviews", [source["reviews"][0], source["reviews"][0]]), "distinct reviewers"),
                (lambda source: source["reviews"][1].__setitem__("role", "QA"), "independent QA and UX/UI"),
                (lambda source: source["reviews"][0].__setitem__("reviewer", "PILOT-AUTHOR"), "different from the author"),
                (lambda source: source["reviews"][0].__setitem__("contentDigest", "f" * 64), "contentDigest"),
                (lambda source: source.__setitem__("contentDigest", "e" * 64), "contentDigest"),
                (lambda source: source["evidence"]["artifacts"][0].__setitem__("path", "../render-audit.json"), "inside the evidence root"),
                (lambda source: source["evidence"]["artifacts"][0].__setitem__("sha256", "f" * 64), "SHA-256 does not match"),
                (lambda source: source.__setitem__("generatedDigest", "f" * 64), "generatedDigest does not match"),
            ):
                candidate = json.loads(json.dumps(valid_source))
                mutate(candidate)
                source_path.write_text(json.dumps(candidate), encoding="utf-8")
                with self.subTest(expected=expected), self.assertRaisesRegex(ValueError, expected):
                    generator.load_sources(source_dir, ["approved-style"])

    def test_only_top_level_review_metadata_is_excluded_from_content_digest(self):
        source = {
            "slug": "candidate-style",
            "status": "ready_for_review",
            "evidence": {"render": "first"},
            "reviews": [],
            "designSignals": [{"signal": "grid", "evidence": "first proof"}],
            "palette": {"tokens": {"--bg": "#000000"}},
        }
        first = generator.content_digest(source, "css", snapshot_digest="a" * 64)
        changed_admin = json.loads(json.dumps(source))
        changed_admin["status"] = "approved"
        changed_admin["evidence"] = {"render": "second"}
        changed_admin["reviews"] = [{"verdict": "ACCEPT"}]
        self.assertEqual(first, generator.content_digest(changed_admin, "css", snapshot_digest="a" * 64))
        changed_product = json.loads(json.dumps(source))
        changed_product["designSignals"][0]["evidence"] = "different product evidence"
        self.assertNotEqual(first, generator.content_digest(changed_product, "css", snapshot_digest="a" * 64))

    def test_approved_source_is_rejected_after_shared_snapshot_changes(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "styles" / "fx").mkdir(parents=True)
            for relative, content in (
                ("app.js", "runtime"), ("index.html", "shell"), ("shell.css", "tokens"),
                ("styles/registry.js", "canonical registry"), ("styles/base.css", "base"),
                ("styles/approved-style.css", "canonical style"), ("styles/fx/effect.js", "fx"),
                ("i18n/index.js", "locale runtime"), ("tools/generate_variant_design.py", "generator"),
            ):
                path = root / relative
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(content, encoding="utf-8")
            for locale_tag in generator.LOCALES:
                locale_path = root / "i18n/locales" / f"{locale_tag}.js"
                locale_path.parent.mkdir(parents=True, exist_ok=True)
                locale_path.write_text('export default {\n  "keys": {}\n};\n', encoding="utf-8")
            write_source(root, "approved-style", status="approved")
            source_dir = root / "source"
            source_path = source_dir / "approved-style.json"
            data = json.loads(source_path.read_text(encoding="utf-8"))
            css_path = source_dir / "approved-style.css"
            data["snapshotDigest"] = generator.snapshot_digest(root)
            data["contentDigest"] = generator.content_digest(
                data, css_path.read_text(encoding="utf-8"), snapshot_digest=data["snapshotDigest"]
            )
            for review in data["reviews"]:
                review["contentDigest"] = data["contentDigest"]
            source_path.write_text(json.dumps(data), encoding="utf-8")
            generator.load_sources(source_dir, ["approved-style"], snapshot_root=root)

            (root / "app.js").write_text("changed runtime", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "snapshotDigest is stale"):
                generator.load_sources(source_dir, ["approved-style"], snapshot_root=root)

    def test_snapshot_digest_covers_shared_locales_generator_and_normalizes_generated_alternates(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "styles" / "fx").mkdir(parents=True)
            (root / "i18n" / "locales").mkdir(parents=True)
            for relative in (
                "app.js", "index.html", "shell.css", "styles/registry.js",
                "styles/base.css", "styles/demo.css", "styles/fx/demo.js",
                "tools/generate_variant_design.py", "i18n/index.js",
            ):
                path = root / relative
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("stable", encoding="utf-8")
            for locale_tag in generator.LOCALES:
                (root / "i18n/locales" / f"{locale_tag}.js").write_text(
                    'export default {\n  "keys": {\n    "home.title": "Home",\n'
                    '    "appearance.demo.alternate.name": "Candidate"\n  }\n};\n', encoding="utf-8"
                )
            locale = root / "i18n/locales/en-US.js"
            locale.write_text(
                'export default {\n  "keys": {\n    "home.title": "Home",\n'
                '    "appearance.demo.alternate.name": "Candidate"\n  }\n};\n', encoding="utf-8"
            )
            first = generator.snapshot_digest(root)
            locale.write_text(
                'export default {\n  "keys": {\n    "home.title": "Home",\n'
                '    "appearance.demo.alternate.name": "Generated later"\n  }\n};\n', encoding="utf-8"
            )
            self.assertEqual(first, generator.snapshot_digest(root))
            locale.write_text(locale.read_text(encoding="utf-8").replace("Home", "Inicio"), encoding="utf-8")
            self.assertNotEqual(first, generator.snapshot_digest(root))
            locale.write_text(locale.read_text(encoding="utf-8").replace("Inicio", "Home"), encoding="utf-8")
            first = generator.snapshot_digest(root)
            code = root / "tools/generate_variant_design.py"
            code.write_text("changed generator", encoding="utf-8")
            self.assertNotEqual(first, generator.snapshot_digest(root))

    def test_review_registry_includes_ready_candidates_and_marks_build_kind(self):
        with tempfile.TemporaryDirectory() as temp:
            write_source(Path(temp), "candidate-style")
            sources = generator.load_sources(Path(temp) / "source", ["candidate-style"])
            registry = generator.build_registry(["candidate-style"], sources, environment="review", source_dir=Path(temp) / "source")
        alternate = registry["candidate-style"]["alternate"]
        self.assertEqual(alternate["status"], "ready_for_review")
        self.assertEqual(alternate["css"], "styles/variants/candidate-style.css")
        self.assertEqual(alternate["polarity"], "dark")

    def test_missing_or_mismatched_source_fails_closed(self):
        with tempfile.TemporaryDirectory() as temp:
            source_dir = Path(temp) / "source"
            source_dir.mkdir()
            with self.assertRaisesRegex(ValueError, "missing alternate source"):
                generator.load_sources(source_dir, ["nordic"])
            write_source(Path(temp), "other-style")
            (source_dir / "nordic.json").write_text(
                (source_dir / "other-style.json").read_text(encoding="utf-8"), encoding="utf-8"
            )
            (source_dir / "nordic.css").write_text("#stage {}", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "slug mismatch"):
                generator.load_sources(source_dir, ["nordic"])

    def test_release_preflight_requires_82_approved_candidates(self):
        with tempfile.TemporaryDirectory() as temp:
            write_source(Path(temp), "candidate-style")
            sources = generator.load_sources(Path(temp) / "source", ["candidate-style"])
            with self.assertRaisesRegex(ValueError, "requires 82 approved alternates"):
                generator.validate_release(sources, ["candidate-style"])

    def test_default_cli_refuses_incomplete_release_before_writing_outputs(self):
        slugs = [f"style-{index}" for index in range(82)]
        with mock.patch.object(generator, "canonical_slugs", return_value=slugs), \
                mock.patch.object(generator, "load_sources", return_value={}), \
                mock.patch.object(generator, "write_outputs") as write_outputs:
            with self.assertRaisesRegex(ValueError, "requires 82 approved alternates"):
                generator.main([])
            write_outputs.assert_not_called()

    def test_rendered_registry_is_deterministic_and_has_build_kind(self):
        with tempfile.TemporaryDirectory() as temp:
            write_source(Path(temp), "candidate-style")
            sources = generator.load_sources(Path(temp) / "source", ["candidate-style"])
            registry = generator.build_registry(["candidate-style"], sources, environment="review", source_dir=Path(temp) / "source")
            first = generator.render_registry(registry, build_kind="review")
            second = generator.render_registry(registry, build_kind="review")
        self.assertEqual(first, second)
        self.assertIn('export const BUILD_KIND = "review";', first)
        self.assertNotIn("'c1'", first)

    def test_content_digest_ignores_administrative_review_fields_only(self):
        source = {
            "slug": "candidate-style",
            "status": "ready_for_review",
            "evidence": "first review note",
            "designSignals": [{"signal": "grid", "evidence": "first proof"}],
            "palette": {"tokens": {"--bg": "#000000"}},
        }
        first = generator.content_digest(source, "#stage { color: white; }")
        revised_review = json.loads(json.dumps(source))
        revised_review["status"] = "approved"
        revised_review["evidence"] = "second review note"
        self.assertEqual(first, generator.content_digest(revised_review, "#stage { color: white; }"))
        revised_product = json.loads(json.dumps(revised_review))
        revised_product["designSignals"][0]["evidence"] = "second proof"
        revised_product["palette"]["tokens"]["--bg"] = "#101010"
        self.assertNotEqual(first, generator.content_digest(revised_product, "#stage { color: white; }"))


if __name__ == "__main__":
    unittest.main()
