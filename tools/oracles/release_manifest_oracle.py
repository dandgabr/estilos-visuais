"""Build deterministic F4 case manifests from the canonical and staged inventory."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
SLUG_RE = re.compile(r"\['([a-z0-9-]+)',\s*'")
SOURCE_STATUSES = {"ready_for_review", "approved"}
VARIANTS = ("default", "alternate")
TABS = ("painel", "projetos", "equipe", "relatorios")
VIEWPORTS = ((320, 720), (375, 800), (768, 900), (1280, 900))
RELEASE_VIEWPORTS = ((320, 720), (1280, 900))
BASE_LOCALES = ("pt-BR", "en-US")
ADDITIONAL_LOCALES = (
    "es-ES", "fr-FR", "de-DE", "ja-JP", "zh-CN", "ko-KR", "hi-IN", "ar-SA", "ru-RU"
)
MANIFEST_NAMES = ("canonical-parity", "structural", "primary-locales", "complementary-locales")


def load_slugs(root: Path = ROOT) -> list[str]:
    registry = root / "styles/registry.js"
    slugs = SLUG_RE.findall(registry.read_text(encoding="utf-8"))
    if len(slugs) != 82 or len(set(slugs)) != 82:
        raise ValueError(f"Expected 82 unique canonical style slugs in {registry}, got {len(slugs)}")
    return slugs


def load_alternate_inventory(root: Path = ROOT, *, mode: str = "staging") -> dict[str, str]:
    """Read real source status; staging includes reviewable candidates, release only approved."""
    if mode not in {"staging", "release"}:
        raise ValueError(f"unsupported manifest mode: {mode}")
    slugs = load_slugs(root)
    canonical = set(slugs)
    source_dir = root / "styles/variants/source"
    inventory: dict[str, str] = {}
    if source_dir.exists():
        for path in sorted(source_dir.glob("*.json"), key=lambda item: item.name):
            try:
                source = json.loads(path.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError) as error:
                raise ValueError(f"invalid alternate source {path}: {error}") from error
            slug = source.get("slug") if isinstance(source, dict) else None
            status = source.get("status") if isinstance(source, dict) else None
            if not isinstance(slug, str) or slug not in canonical:
                raise ValueError(f"alternate source slug mismatch or unknown slug: {path}")
            if slug in inventory:
                raise ValueError(f"duplicate alternate source for {slug}")
            if path.stem != slug:
                raise ValueError(f"alternate source slug mismatch: {path} declares {slug}")
            if status not in SOURCE_STATUSES:
                raise ValueError(f"unsupported alternate status for {slug}: {status!r}")
            inventory[slug] = status

    if mode == "release":
        approved = {slug for slug, status in inventory.items() if status == "approved"}
        if len(approved) != 82 or approved != canonical:
            raise ValueError(
                "release requires 82 approved alternates; "
                f"found {len(approved)} approved source(s) for 82 canonical style(s)"
            )
        return {slug: "approved" for slug in slugs}

    return {slug: inventory[slug] for slug in slugs if slug in inventory}


def _case(
    slug: str,
    variant: str,
    tab: str,
    viewport: tuple[int, int],
    locale: str,
    reduced_motion: str,
    status: str,
) -> dict[str, Any]:
    return {
        "slug": slug,
        "variant": variant,
        "status": status,
        "tab": tab,
        "viewport": {"width": viewport[0], "height": viewport[1]},
        "locale": locale,
        "reducedMotion": reduced_motion,
    }


def _identity(case: dict[str, Any]) -> tuple[Any, ...]:
    return (
        case.get("slug"), case.get("variant"), case.get("tab"),
        case.get("viewport", {}).get("width"), case.get("viewport", {}).get("height"),
        case.get("locale"), case.get("reducedMotion"),
    )


def validate_manifest(manifest: dict[str, Any]) -> None:
    """Fail on an absent, duplicate, malformed, or legacy case in a frozen manifest."""
    cases = manifest.get("cases")
    expected = manifest.get("expectedCases")
    gate = manifest.get("gate", "manifest")
    if not isinstance(cases, list) or not isinstance(expected, int):
        raise ValueError(f"{gate}: malformed manifest")
    identities = [_identity(case) for case in cases if isinstance(case, dict)]
    if len(identities) != len(cases):
        raise ValueError(f"{gate}: malformed case")
    if len(set(identities)) != len(identities):
        raise ValueError(f"{gate}: duplicate cases")
    if len(cases) != expected:
        raise ValueError(f"{gate}: missing cases (expected {expected}, got {len(cases)})")
    for case in cases:
        if case.get("variant") not in VARIANTS:
            raise ValueError(f"{gate}: invalid or legacy variant id {case.get('variant')!r}")


def _manifest(gate: str, axes: dict[str, Any], cases: list[dict[str, Any]], expected: int) -> dict[str, Any]:
    manifest = {
        "schemaVersion": 2,
        "gate": gate,
        "mode": axes["mode"],
        "expectedCases": expected,
        "axes": axes,
        "cases": cases,
    }
    validate_manifest(manifest)
    return manifest


def build_manifests(root: Path = ROOT, *, mode: str = "staging") -> dict[str, dict[str, Any]]:
    """Create the four required F4 universes for actual staging or a complete release."""
    slugs = load_slugs(root)
    alternates = load_alternate_inventory(root, mode=mode)
    variant_status = {slug: "canonical" for slug in slugs}
    variant_status.update(alternates)
    variants_by_slug = {
        slug: (("default", "canonical"), ("alternate", variant_status[slug]))
        if slug in alternates else (("default", "canonical"),)
        for slug in slugs
    }
    present_variants = ["default"] + (["alternate"] if alternates else [])
    n_styles = len(slugs) + len(alternates)
    common_axes = {
        "mode": mode,
        "canonicalStyles": slugs,
        "canonicalStyleCount": len(slugs),
        "alternateStatuses": {slug: alternates[slug] for slug in slugs if slug in alternates},
        "alternateCount": len(alternates),
        "variantIds": present_variants,
        "tabs": list(TABS),
    }

    canonical = [
        _case(slug, "default", tab, viewport, "pt-BR", "reduce", "canonical")
        for slug in slugs for tab in TABS for viewport in VIEWPORTS
    ]
    canonical_manifest = _manifest(
        "canonical-parity",
        {**common_axes, "viewports": [list(v) for v in VIEWPORTS], "localeFixed": "pt-BR",
         "reducedMotionFixed": "reduce"},
        canonical,
        16 * len(slugs),
    )

    structural = [
        _case(slug, variant, tab, viewport, "pt-BR", "reduce", status)
        for slug in slugs for variant, status in variants_by_slug[slug]
        for tab in TABS for viewport in VIEWPORTS
    ]
    structural_manifest = _manifest(
        "structural",
        {**common_axes, "viewports": [list(v) for v in VIEWPORTS], "localeFixed": "pt-BR",
         "reducedMotionFixed": "reduce"},
        structural,
        16 * n_styles,
    )

    primary: list[dict[str, Any]] = []
    for viewport in RELEASE_VIEWPORTS:
        for slug in slugs:
            for variant, status in variants_by_slug[slug]:
                for locale in BASE_LOCALES:
                    for tab in TABS:
                        primary.append(_case(slug, variant, tab, viewport, locale, "reduce", status))
            for locale in ADDITIONAL_LOCALES:
                for tab in TABS:
                    primary.append(_case(slug, "default", tab, viewport, locale, "reduce", "canonical"))
    primary_manifest = _manifest(
        "primary-locales",
        {**common_axes, "viewports": [list(v) for v in RELEASE_VIEWPORTS],
         "baseLocalesAcrossAllVariants": list(BASE_LOCALES),
         "additionalLocalesOnDefaultOnly": list(ADDITIONAL_LOCALES), "reducedMotionFixed": "reduce"},
        primary,
        8 * (2 * n_styles + 9 * len(slugs)),
    )

    complementary = [
        _case(slug, variant, tab, viewport, locale, "reduce", status)
        for viewport in ((375, 800), (768, 900))
        for slug in slugs for variant, status in variants_by_slug[slug]
        for locale in ("pt-BR", "en-US", *ADDITIONAL_LOCALES)
        for tab in TABS
    ]
    complementary_manifest = _manifest(
        "complementary-locales",
        {**common_axes, "viewports": [[375, 800], [768, 900]],
         "locales": [*BASE_LOCALES, *ADDITIONAL_LOCALES], "reducedMotionFixed": "reduce"},
        complementary,
        88 * n_styles,
    )
    return dict(zip(MANIFEST_NAMES, (
        canonical_manifest, structural_manifest, primary_manifest, complementary_manifest,
    ), strict=True))


def write_manifests(root: Path = ROOT, *, mode: str = "staging") -> tuple[Path, ...]:
    manifests = build_manifests(root, mode=mode)
    out = root / "docs/temp/reports"
    out.mkdir(parents=True, exist_ok=True)
    paths = tuple(out / f"2026-10-18-f4-{name}-manifest.json" for name in MANIFEST_NAMES)
    for path, name in zip(paths, MANIFEST_NAMES, strict=True):
        path.write_text(json.dumps(manifests[name], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return paths


if __name__ == "__main__":
    paths = write_manifests()
    manifests = build_manifests()
    for path, manifest in zip(paths, manifests.values(), strict=True):
        print(f"{path.relative_to(ROOT)}: {manifest['expectedCases']} cases ({manifest['mode']})")
