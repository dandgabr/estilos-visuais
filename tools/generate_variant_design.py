#!/usr/bin/env python3
"""Generate appearance registries and CSS from authored per-style sources."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
# Authored pairs live under `styles/variants/source/`; every generated variant
# is copied from that directory and the canonical `styles/<slug>.css` is read-only.
SOURCE_DIR = Path("styles/variants/source")
LOCALES = (
    "pt-BR", "en-US", "es-ES", "fr-FR", "de-DE", "ru-RU",
    "ar-SA", "hi-IN", "zh-CN", "ja-JP", "ko-KR",
)
STATUSES = {"ready_for_review", "approved"}
ADMIN_FIELDS = {"status", "reviews", "evidence", "contentDigest"}
REQUIRED_TOP_LEVEL = {
    "schemaVersion", "slug", "status", "classification", "palette",
    "designSignals", "layoutChanges", "motion", "locales", "sources",
}
REQUIRED_MOTION_FIELDS = {
    "selector", "animation", "trigger", "duration", "fallback",
    "reducedMotion", "pauseResume", "cleanup",
}
REQUIRED_CSS_PALETTE_TOKENS = {
    "--bg", "--surface", "--surface-2", "--fg", "--muted",
    "--accent", "--accent-fg", "--border", "--focus",
}


def canonical_slugs(root: Path = ROOT) -> list[str]:
    """Read slugs from the canonical JS registry without maintaining a shadow list."""
    script = "import {STYLES} from './styles/registry.js'; console.log(JSON.stringify(STYLES.map(style=>style.slug)));"
    result = subprocess.run(
        ["node", "--input-type=module", "-e", script],
        cwd=root,
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode:
        raise RuntimeError(f"could not read canonical style registry: {result.stderr.strip()}")
    slugs = json.loads(result.stdout.strip().splitlines()[-1])
    if len(slugs) != len(set(slugs)):
        raise ValueError("canonical style registry contains duplicate slugs")
    return slugs


def _validate_source(
    data: Any,
    slug: str,
    css_path: Path,
    *,
    snapshot_root: Path | None = None,
) -> dict[str, Any]:
    if not isinstance(data, dict):
        raise ValueError(f"{slug}: source JSON root must be an object")
    missing = REQUIRED_TOP_LEVEL - data.keys()
    if missing:
        raise ValueError(f"{slug}: source is missing required fields: {', '.join(sorted(missing))}")
    if data["schemaVersion"] != 1:
        raise ValueError(f"{slug}: unsupported schemaVersion {data['schemaVersion']!r}")
    if data["slug"] != slug:
        raise ValueError(f"{slug}: slug mismatch ({data['slug']!r})")
    if data["status"] not in STATUSES:
        raise ValueError(f"{slug}: status must be ready_for_review or approved")
    if not css_path.is_file():
        raise ValueError(f"{slug}: missing alternate source CSS: {css_path}")

    classification = data["classification"]
    if not isinstance(classification, dict):
        raise ValueError(f"{slug}: classification must be an object")
    polarities = (classification.get("defaultPolarity"), classification.get("alternatePolarity"))
    if polarities[0] not in {"light", "dark"} or polarities[1] not in {"light", "dark"}:
        raise ValueError(f"{slug}: classification must declare both light/dark polarities")
    if polarities[0] == polarities[1]:
        raise ValueError(f"{slug}: default and alternate polarities must be opposite")

    tokens = data["palette"].get("tokens") if isinstance(data["palette"], dict) else None
    if not isinstance(tokens, dict) or not tokens:
        raise ValueError(f"{slug}: palette.tokens must be a non-empty object")
    _validate_css_palette_tokens(tokens, slug, css_path)
    if not data["designSignals"] or not data["layoutChanges"]:
        raise ValueError(f"{slug}: at least one design signal and one layout change are required")
    for layer in ("element", "background"):
        motion = data["motion"].get(layer) if isinstance(data["motion"], dict) else None
        if not isinstance(motion, dict) or REQUIRED_MOTION_FIELDS - motion.keys():
            absent = REQUIRED_MOTION_FIELDS - motion.keys() if isinstance(motion, dict) else REQUIRED_MOTION_FIELDS
            raise ValueError(f"{slug}: motion.{layer} is missing: {', '.join(sorted(absent))}")
    if not isinstance(data["locales"], dict) or set(data["locales"]) != set(LOCALES):
        raise ValueError(f"{slug}: locales must contain exactly the eleven supported locale tags")
    for locale, strings in data["locales"].items():
        if not isinstance(strings, dict) or not strings.get("name") or not strings.get("description"):
            raise ValueError(f"{slug}: locale {locale} requires non-empty name and description")
    if not isinstance(data["sources"], list) or not data["sources"]:
        raise ValueError(f"{slug}: at least one cited source is required")
    if data["status"] == "approved":
        _validate_approval(data, slug, css_path, snapshot_root=snapshot_root)
    return data


def _validate_css_palette_tokens(tokens: dict[str, Any], slug: str, css_path: Path) -> None:
    """Ensure the alternate stylesheet applies the palette documented in JSON."""
    css_text = css_path.read_text(encoding="utf-8")
    selector = re.compile(
        rf'#stage\s*\[data-style=["\']{re.escape(slug)}["\']\]'
        rf'\s*\[data-variant=["\']alternate["\']\]\s*\{{([^}}]*)\}}',
        re.IGNORECASE | re.DOTALL,
    )
    match = selector.search(css_text)
    if not match:
        raise ValueError(f"{slug}: CSS must declare a root alternate rule scoped to #stage[data-style=...][data-variant=alternate]")
    declarations = {
        name.strip().lower(): re.sub(r"\s+", " ", value.strip()).casefold()
        for name, value in re.findall(r"(--[a-z0-9_-]+)\s*:\s*([^;]+)", match.group(1), re.IGNORECASE)
    }
    missing = sorted(REQUIRED_CSS_PALETTE_TOKENS - tokens.keys())
    if missing:
        raise ValueError(f"{slug}: palette.tokens is missing required CSS colors: {', '.join(missing)}")
    mismatched = []
    for name in sorted(REQUIRED_CSS_PALETTE_TOKENS):
        expected = re.sub(r"\s+", " ", str(tokens[name]).strip()).casefold()
        actual = declarations.get(name)
        if actual != expected:
            mismatched.append(f"{name}: JSON={expected!r}, CSS={actual!r}")
    if mismatched:
        raise ValueError(f"{slug}: palette.tokens disagree with alternate CSS: {'; '.join(mismatched)}")


def _validate_approval(
    data: dict[str, Any],
    slug: str,
    css_path: Path,
    *,
    snapshot_root: Path | None,
) -> None:
    author = data.get("author")
    if not isinstance(author, str) or not author.strip():
        raise ValueError(f"{slug}: approved source requires author")
    evidence = data.get("evidence")
    artifacts = evidence.get("artifacts") if isinstance(evidence, dict) else None
    if not isinstance(artifacts, list) or not artifacts:
        raise ValueError(f"{slug}: approved source requires evidence artifacts")
    evidence_root = (snapshot_root or css_path.parent.parent).resolve()
    for artifact in artifacts:
        _validate_artifact(artifact, evidence_root, slug, "evidence")

    recorded_snapshot = data.get("snapshotDigest")
    if not _is_sha256(recorded_snapshot):
        raise ValueError(f"{slug}: approved source requires snapshotDigest")
    if snapshot_root is not None and recorded_snapshot != snapshot_digest(snapshot_root):
        raise ValueError(f"{slug}: snapshotDigest is stale")

    css_text = css_path.read_text(encoding="utf-8")
    if data.get("generatedDigest") != generated_artifact_digest(data, css_text):
        raise ValueError(f"{slug}: generatedDigest does not match normalized generated output")
    expected_digest = content_digest(data, css_text, snapshot_digest=recorded_snapshot)
    if data.get("contentDigest") != expected_digest:
        raise ValueError(f"{slug}: contentDigest does not match current source")
    reviews = data.get("reviews")
    if not isinstance(reviews, list) or len(reviews) < 2:
        raise ValueError(f"{slug}: approved source requires independent QA and UX/UI reviews")
    reviewers: set[str] = set()
    roles: set[str] = set()
    for review in reviews:
        if not isinstance(review, dict):
            raise ValueError(f"{slug}: each review must be an object")
        reviewer = review.get("reviewer")
        if (not isinstance(reviewer, str) or not reviewer.strip()
                or reviewer.casefold() == author.casefold()
                or reviewer.casefold() in {item.casefold() for item in reviewers}):
            raise ValueError(f"{slug}: reviews require distinct reviewers different from the author")
        reviewers.add(reviewer)
        role = review.get("role")
        if not isinstance(role, str) or review.get("verdict") != "ACCEPT":
            raise ValueError(f"{slug}: approved source requires ACCEPT review verdicts and roles")
        roles.add(role.strip().casefold())
        if review.get("contentDigest") != expected_digest:
            raise ValueError(f"{slug}: review contentDigest does not match current source")
        review_evidence = review.get("evidence")
        if not isinstance(review_evidence, list) or not review_evidence:
            raise ValueError(f"{slug}: each review requires evidence")
        for artifact in review_evidence:
            _validate_artifact(artifact, evidence_root, slug, "review")
    if not {"qa", "ux/ui"}.issubset(roles):
        raise ValueError(f"{slug}: approved source requires independent QA and UX/UI reviews")


def _validate_artifact(artifact: Any, root: Path, slug: str, kind: str) -> None:
    if not isinstance(artifact, dict) or not artifact.get("path") or not _is_sha256(artifact.get("sha256")):
        raise ValueError(f"{slug}: {kind} artifacts require path and SHA-256")
    relative = Path(artifact["path"])
    if relative.is_absolute() or ".." in relative.parts:
        raise ValueError(f"{slug}: {kind} artifact path must stay inside the evidence root")
    path = (root / relative).resolve()
    if root not in path.parents or not path.is_file():
        raise ValueError(f"{slug}: {kind} artifact is missing or outside the evidence root")
    if hashlib.sha256(path.read_bytes()).hexdigest() != artifact["sha256"]:
        raise ValueError(f"{slug}: {kind} artifact SHA-256 does not match")


def _is_sha256(value: Any) -> bool:
    return isinstance(value, str) and re.fullmatch(r"[0-9a-f]{64}", value) is not None


def load_sources(
    source_dir: Path,
    slugs: list[str],
    *,
    allow_missing: bool = False,
    snapshot_root: Path | None = None,
) -> dict[str, dict[str, Any]]:
    """Load and validate authored JSON/CSS pairs; no defaults are fabricated."""
    sources: dict[str, dict[str, Any]] = {}
    for slug in slugs:
        json_path = source_dir / f"{slug}.json"
        css_path = source_dir / f"{slug}.css"
        if not json_path.is_file() or not css_path.is_file():
            if allow_missing and not json_path.exists() and not css_path.exists():
                continue
            raise ValueError(f"{slug}: missing alternate source JSON or CSS under {source_dir}")
        try:
            data = json.loads(json_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            raise ValueError(f"{slug}: unable to parse source JSON: {error}") from error
        sources[slug] = _validate_source(data, slug, css_path, snapshot_root=snapshot_root)
    return sources


def snapshot_digest(root: Path) -> str:
    """Hash shared runtime, generator, canonical CSS/FX and locale catalogs.

    Generated alternate locale entries are omitted because they are reproducible
    outputs of the reviewed source and would otherwise invalidate their own
    approval as soon as the release catalog is generated.
    """
    paths = [root / "app.js", root / "index.html", root / "shell.css",
             root / "styles" / "registry.js", root / "styles" / "base.css",
             root / "i18n" / "index.js", root / "tools" / "generate_variant_design.py"]
    paths.extend(sorted((root / "styles").glob("*.css")))
    paths.extend(sorted((root / "styles" / "fx").rglob("*.js")))
    paths.extend(root / "i18n" / "locales" / f"{locale}.js" for locale in LOCALES)
    unique = sorted({path.resolve() for path in paths})
    if not unique or any(not path.is_file() for path in unique):
        raise ValueError(f"snapshot root is missing a required product file: {root}")
    hasher = hashlib.sha256()
    for path in unique:
        relative = path.relative_to(root.resolve()).as_posix()
        hasher.update(relative.encode("utf-8"))
        hasher.update(b"\0")
        content = path.read_bytes()
        if path.parent == (root / "i18n" / "locales").resolve():
            try:
                text = content.decode("utf-8")
                key_map, start, end, _, _ = _locale_key_object(text)
                normalized = {
                    key: value for key, value in key_map.items()
                    if not re.fullmatch(r"appearance\.[^.]+\.alternate\.(?:name|description)", key)
                }
                content = (text[:start] + json.dumps(normalized, ensure_ascii=False, sort_keys=True)
                           + text[end:]).encode("utf-8")
            except (UnicodeDecodeError, ValueError) as error:
                raise ValueError(f"could not normalize locale snapshot {path}: {error}") from error
        hasher.update(content)
        hasher.update(b"\0")
    return hasher.hexdigest()


def content_digest(
    data: dict[str, Any],
    css_text: str,
    *,
    snapshot_digest: str | None = None,
) -> str:
    """Hash product JSON/CSS and the canonical/runtime snapshot, excluding only top-level review metadata."""
    semantic = {key: value for key, value in data.items() if key not in ADMIN_FIELDS}
    payload = json.dumps(semantic, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    snapshot = snapshot_digest or ""
    return hashlib.sha256((payload + "\n" + css_text + "\n" + snapshot).encode("utf-8")).hexdigest()


def generated_artifact_digest(data: dict[str, Any], css_text: str) -> str:
    """Digest the normalized generated candidate output, independent of build status."""
    slug = data["slug"]
    tokens = data["palette"]["tokens"]
    projection = {
        "id": "alternate",
        "status": "candidate",
        "polarity": data["classification"]["alternatePolarity"],
        "css": f"styles/variants/{slug}.css",
        "nameKey": f"appearance.{slug}.alternate.name",
        "descriptionKey": f"appearance.{slug}.alternate.description",
        "locales": data["locales"],
        "tokens": tokens,
        "colors": {key: tokens[key] for key in ("--bg", "--surface", "--accent") if key in tokens},
        "designSignals": data["designSignals"],
        "layoutChanges": data["layoutChanges"],
        "motion": data["motion"],
        "elementMotion": True,
        "backgroundMotion": True,
        "motionTarget": data["motion"]["element"]["selector"],
        "backgroundTarget": data["motion"]["background"]["selector"],
        "cssSha256": hashlib.sha256(css_text.encode("utf-8")).hexdigest(),
    }
    serialized = json.dumps(projection, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(serialized.encode("utf-8")).hexdigest()


def build_registry(
    slugs: list[str],
    sources: dict[str, dict[str, Any]],
    *,
    environment: str,
    source_dir: Path | None = None,
    snapshot_root: Path | None = None,
) -> dict[str, dict[str, Any]]:
    """Build deterministic default/alternate entries without changing source status."""
    if environment not in {"release", "review"}:
        raise ValueError("environment must be release or review")
    result: dict[str, dict[str, Any]] = {}
    for slug in slugs:
        source = sources.get(slug)
        default_entry: dict[str, Any] = {"id": "default", "status": "canonical"}
        if source:
            default_entry["polarity"] = source["classification"]["defaultPolarity"]
        entries: dict[str, Any] = {"default": default_entry}
        if source and (source["status"] == "approved" or environment == "review"):
            css_path = (source_dir / f"{slug}.css") if source_dir else ROOT / "styles/variants/source" / f"{slug}.css"
            css_text = css_path.read_text(encoding="utf-8")
            current_snapshot = snapshot_digest(snapshot_root) if snapshot_root is not None else source.get("snapshotDigest")
            current_content = content_digest(source, css_text, snapshot_digest=current_snapshot)
            entry: dict[str, Any] = {
                "id": "alternate",
                "status": source["status"],
                "polarity": source["classification"]["alternatePolarity"],
                "css": f"styles/variants/{slug}.css",
                "nameKey": f"appearance.{slug}.alternate.name",
                "descriptionKey": f"appearance.{slug}.alternate.description",
                "locales": source["locales"],
                "tokens": source["palette"]["tokens"],
                "colors": {
                    key: source["palette"]["tokens"][key]
                    for key in ("--bg", "--surface", "--accent")
                    if key in source["palette"]["tokens"]
                },
                "designSignals": source["designSignals"],
                "layoutChanges": source["layoutChanges"],
                "motion": source["motion"],
                "elementMotion": True,
                "backgroundMotion": True,
                "motionTarget": source["motion"]["element"]["selector"],
                "backgroundTarget": source["motion"]["background"]["selector"],
                "contentDigest": current_content,
                "generatedDigest": source.get("generatedDigest") or generated_artifact_digest(source, css_text),
            }
            if current_snapshot:
                entry["snapshotDigest"] = current_snapshot
            entries["alternate"] = entry
        result[slug] = entries
    return result


def render_registry(registry: dict[str, dict[str, Any]], *, build_kind: str) -> str:
    if build_kind not in {"release", "review"}:
        raise ValueError("build_kind must be release or review")
    serialized = json.dumps(registry, ensure_ascii=False, indent=2)
    return (
        "// Generated from styles/variants/source; do not edit by hand.\n"
        f"export const BUILD_KIND = {json.dumps(build_kind)};\n"
        f"export const VARIANTS = {serialized};\n\n"
        "export const DEFAULT_VARIANT = 'default';\n"
    )


def _locale_key_object(text: str) -> tuple[dict[str, Any], int, int, str, str]:
    """Return the locale key map and its source span/indentation for surgical rewrite."""
    match = re.search(r'(?m)^([ \t]*)"keys"\s*:\s*', text)
    nested = match is not None
    if nested:
        object_start = text.index("{", match.end())
        parent_indent = match.group(1)
    else:
        export = text.find("export default")
        if export < 0:
            raise ValueError("locale module has no `export default` object")
        object_start = text.index("{", export + len("export default"))
        parent_indent = ""

    decoder = json.JSONDecoder()
    try:
        value, consumed = decoder.raw_decode(text[object_start:])
    except json.JSONDecodeError as error:
        raise ValueError(f"locale key map is not JSON-compatible: {error}") from error
    if not isinstance(value, dict):
        raise ValueError("locale key map must be an object")
    object_end = object_start + consumed
    if nested:
        key_map = value
    else:
        key_map = value
    span = text[object_start:object_end]
    child_indent_match = re.search(r"\n([ \t]+)\S", span)
    child_indent = child_indent_match.group(1) if child_indent_match else parent_indent + "  "
    return key_map, object_start, object_end, parent_indent, child_indent


def write_locale_outputs(
    locale_dir: Path,
    sources: dict[str, dict[str, Any]],
    *,
    environment: str,
) -> None:
    """Regenerate localized alternate labels from source records, removing C/E residue."""
    if environment not in {"release", "review"}:
        raise ValueError("environment must be release or review")
    legacy = re.compile(r"^appearance\.[^.]+\.(?:c[1-3]|e[1-3])\.(?:name|description)$")
    alternate_key = re.compile(r"^appearance\.[^.]+\.alternate\.(?:name|description)$")
    include_status = {"approved"} if environment == "release" else {"approved", "ready_for_review"}
    localized = {
        slug: source["locales"]
        for slug, source in sources.items()
        if source["status"] in include_status
    }
    for locale in LOCALES:
        path = locale_dir / f"{locale}.js"
        text = path.read_text(encoding="utf-8")
        key_map, start, end, parent_indent, child_indent = _locale_key_object(text)
        for key in list(key_map):
            if legacy.fullmatch(key) or alternate_key.fullmatch(key):
                del key_map[key]
        for slug, translations in localized.items():
            translation = translations.get(locale)
            if not isinstance(translation, dict) or not translation.get("name") or not translation.get("description"):
                raise ValueError(f"{slug}: missing generated locale copy for {locale}")
            key_map[f"appearance.{slug}.alternate.name"] = translation["name"]
            key_map[f"appearance.{slug}.alternate.description"] = translation["description"]

        lines = ["{"]
        entries = list(key_map.items())
        for index, (key, value) in enumerate(entries):
            comma = "," if index < len(entries) - 1 else ""
            lines.append(f"{child_indent}{json.dumps(key, ensure_ascii=False)}: {json.dumps(value, ensure_ascii=False)}{comma}")
        lines.append(f"{parent_indent}}}")
        rendered = "\n".join(lines)
        text = text[:start] + rendered + text[end:]
        path.write_text(text, encoding="utf-8")


def validate_release(sources: dict[str, dict[str, Any]], slugs: list[str]) -> None:
    approved = [slug for slug in slugs if slug in sources and sources[slug]["status"] == "approved"]
    if len(slugs) != 82 or len(approved) != 82:
        raise ValueError(
            "release requires 82 approved alternates; "
            f"found {len(approved)} approved source(s) for {len(slugs)} canonical style(s)"
        )


def write_outputs(
    output_root: Path,
    slugs: list[str],
    sources: dict[str, dict[str, Any]],
    *,
    build_kind: str,
    source_dir: Path,
) -> None:
    variants_dir = output_root / "styles" / "variants"
    variants_dir.mkdir(parents=True, exist_ok=True)
    registry = build_registry(
        slugs, sources, environment=build_kind, source_dir=source_dir, snapshot_root=output_root
    )
    for slug, entries in registry.items():
        target = variants_dir / f"{slug}.css"
        if "alternate" in entries:
            shutil.copyfile(source_dir / f"{slug}.css", target)
        elif target.exists():
            target.unlink()
    (variants_dir / "registry.js").write_text(
        render_registry(registry, build_kind=build_kind), encoding="utf-8"
    )
    write_locale_outputs(output_root / "i18n" / "locales", sources, environment=build_kind)


def create_review_root(review_root: Path, slugs: list[str]) -> Path:
    """Copy an isolated app snapshot for local review without copying git/tool state."""
    destination = review_root.expanduser().resolve()
    root = ROOT.resolve()
    if destination == root or root in destination.parents:
        raise ValueError("--review-root must be outside the source repository")
    if destination.exists():
        if any(destination.iterdir()):
            raise ValueError("--review-root must not exist or must be empty")
        destination.rmdir()
    excluded = {".git", ".superpowers", "node_modules", "__pycache__", ".venv"}

    def ignore(directory: str, names: list[str]) -> set[str]:
        ignored = {name for name in names if name in excluded}
        if Path(directory).resolve() == root / "docs" / "temp":
            # Keep app documentation, but do not copy screenshot evidence into
            # every temporary browser fixture.
            ignored.add("reports")
        return ignored

    shutil.copytree(root, destination, ignore=ignore)
    return destination


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--release", action="store_true", help="require and emit a complete approved release registry")
    parser.add_argument("--review-root", type=Path, help="create an isolated local review fixture at this path")
    parser.add_argument("--slugs", nargs="+", help="limit a review fixture to these canonical slugs")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    slugs = canonical_slugs()
    if args.slugs:
        unknown = sorted(set(args.slugs) - set(slugs))
        if unknown:
            raise ValueError(f"unknown canonical slug(s): {', '.join(unknown)}")
    source_dir = ROOT / SOURCE_DIR
    if args.review_root:
        if not args.slugs:
            raise ValueError("--review-root requires --slugs to constrain the review snapshot")
        selected = list(dict.fromkeys(args.slugs))
        review_root = create_review_root(args.review_root, selected)
        review_source_dir = review_root / "styles" / "variants" / "source"
        sources = load_sources(review_source_dir, selected, snapshot_root=review_root)
        registry = build_registry(
            slugs, sources, environment="review", source_dir=review_source_dir, snapshot_root=review_root
        )
        write_outputs(review_root, slugs, sources, build_kind="review", source_dir=review_source_dir)
        # The registry contains the entire canonical style inventory, but only
        # explicitly selected candidates can be active in the fixture.
        del registry
        print(f"Review fixture generated: {review_root} ({len(selected)} candidate(s)); BUILD_KIND=review")
        return 0

    sources = load_sources(source_dir, slugs, allow_missing=True, snapshot_root=ROOT)
    # The repository output is always a release artifact. Candidate previews
    # must use --review-root so an incomplete registry can never masquerade as
    # a deployable BUILD_KIND="release" output.
    validate_release(sources, slugs)
    write_outputs(ROOT, slugs, sources, build_kind="release", source_dir=source_dir)
    alternate_count = sum(source["status"] == "approved" for source in sources.values())
    print(f"Release registry generated: {len(slugs)} canonical styles; {alternate_count}/82 approved alternate(s)")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, ValueError) as error:
        print(f"variant generator: {error}", file=sys.stderr)
        raise SystemExit(2)
