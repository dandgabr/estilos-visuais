"""Deterministic quality gates for captured DOM layout snapshots.

The browser adapter is deliberately outside this module. Callers provide the
measured geometry and computed overflow metadata; this module only evaluates
those facts, which makes defects reproducible and unit-testable.
"""
from __future__ import annotations

import math
from typing import Any


_CLIPPING = {"hidden", "clip"}
_E3_FIELDS = ("target", "technique", "layer", "trigger", "fallback", "durationSeconds")


def _finding(code: str, subject: str, detail: str) -> dict[str, str]:
    return {"code": code, "subject": subject, "detail": detail}


def _valid_rect(value: Any) -> bool:
    return (isinstance(value, dict)
            and all(_number(value.get(k)) for k in ("x", "y", "width", "height"))
            and value["width"] >= 0 and value["height"] >= 0)


def _number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def _bounded_tolerance(value: float) -> float:
    """Cap caller tolerance so it cannot disable meaningful geometry gates."""
    if not _number(value):
        return 1.0
    return min(8.0, max(0.0, float(value)))


def _right(rect: dict[str, float]) -> float:
    return rect["x"] + rect["width"]


def _bottom(rect: dict[str, float]) -> float:
    return rect["y"] + rect["height"]


def analyze_snapshot(snapshot: dict[str, Any], *, tolerance: float = 1.0) -> dict[str, Any]:
    """Report document overflow, hidden required controls and content clipping.

    Snapshot contract:
      viewport: width, height, scrollWidth, scrollHeight
      elements: selector, rect, visible, required, optional content and
                clipAncestors (rect + client box + overflowX/overflowY)

    `auto`, `scroll`, and `overlay` ancestors are treated as intentional
    scroll regions. A caller can mark intrinsically truncated content as
    optional with ``content.required = false``; required text is never silently
    accepted when its scroll extent exceeds its client extent.
    """
    tolerance = _bounded_tolerance(tolerance)
    findings: list[dict[str, str]] = []
    if not isinstance(snapshot, dict):
        return {"passed": False, "findings": [_finding("invalid-snapshot", "snapshot", "snapshot must be an object")]}
    viewport = snapshot.get("viewport")
    if not isinstance(viewport, dict):
        findings.append(_finding("invalid-viewport", "viewport", "viewport must be an object"))
        viewport = {}
    width, height = viewport.get("width"), viewport.get("height")
    # Keep malformed input a failed gate rather than throwing an opaque error.
    if not all(_number(v) and v > 0 for v in (width, height)):
        findings.append(_finding("invalid-viewport", "viewport", "width and height must be positive numbers"))
        width = width if _number(width) else 0
        height = height if _number(height) else 0
    for extent in ("scrollWidth", "scrollHeight"):
        if not _number(viewport.get(extent)) or viewport[extent] < 0:
            findings.append(_finding("missing-viewport-extent", extent,
                                     f"viewport.{extent} must be a non-negative number"))
    if _number(viewport.get("scrollWidth")) and _number(width) and viewport["scrollWidth"] > width + tolerance:
        findings.append(_finding("document-horizontal-overflow", "document", "scrollWidth exceeds viewport width"))
    elements = snapshot.get("elements", [])
    if not isinstance(elements, list):
        findings.append(_finding("invalid-elements", "elements", "elements must be a list"))
        elements = []
    for index, element in enumerate(elements):
        if not isinstance(element, dict):
            findings.append(_finding("invalid-element", f"elements[{index}]", "element must be an object"))
            continue
        subject = str(element.get("selector") or f"elements[{index}]")
        if element.get("required", False) and not element.get("visible", False):
            findings.append(_finding("required-element-hidden", subject, "required element is not visible"))
        rect = element.get("rect")
        if not _valid_rect(rect):
            findings.append(_finding("invalid-element-rect", subject, "element rectangle is missing or invalid"))
            continue
        if element.get("required", False) and (rect["width"] <= 0 or rect["height"] <= 0):
            findings.append(_finding("required-element-zero-area", subject,
                                     "required element must have positive width and height"))
        if element.get("visible", False) and (rect["x"] < -tolerance or _right(rect) > width + tolerance):
            findings.append(_finding("element-outside-viewport", subject,
                                     "visible element extends beyond horizontal viewport bounds"))
        content = element.get("content") or {}
        if not isinstance(content, dict):
            findings.append(_finding("invalid-content-measurement", subject, "content measurement must be an object"))
            content = {}
        if content.get("required", True):
            for axis, scroll_key, client_key in (("x", "scrollWidth", "clientWidth"),
                                                  ("y", "scrollHeight", "clientHeight")):
                scroll_extent, client_extent = content.get(scroll_key), content.get(client_key)
                overflow = content.get("overflowX" if axis == "x" else "overflowY", "visible")
                if not _number(scroll_extent) or not _number(client_extent):
                    findings.append(_finding("missing-content-extent", subject,
                                             f"required content needs numeric {scroll_key} and {client_key}"))
                elif scroll_extent > client_extent + tolerance and overflow in _CLIPPING:
                    findings.append(_finding("content-clipped", subject,
                                             f"required {axis}-axis content is clipped by {overflow}"))
        clip_ancestors = element.get("clipAncestors", [])
        if not isinstance(clip_ancestors, list):
            findings.append(_finding("invalid-clip-ancestors", subject, "clipAncestors must be a list"))
            clip_ancestors = []
        for ancestor_index, ancestor in enumerate(clip_ancestors):
            if not isinstance(ancestor, dict):
                findings.append(_finding("invalid-clip-ancestor", f"{subject}[{ancestor_index}]",
                                         "clip ancestor must be an object"))
                continue
            ancestor_selector = str(ancestor.get("selector") or "ancestor")
            clip_rect = ancestor.get("rect")
            if not _valid_rect(clip_rect):
                findings.append(_finding("invalid-clip-rect", ancestor_selector, "ancestor rectangle is missing or invalid"))
                continue
            box_fields = ("clientLeft", "clientTop", "clientWidth", "clientHeight")
            missing_box = [field for field in box_fields if not _number(ancestor.get(field))]
            if missing_box:
                findings.append(_finding("missing-clip-box-extent", ancestor_selector,
                                         "clip ancestor needs numeric " + ", ".join(missing_box)))
                continue
            if not isinstance(ancestor.get("overflowX"), str) or not isinstance(ancestor.get("overflowY"), str):
                findings.append(_finding("missing-clip-overflow", ancestor_selector,
                                         "clip ancestor needs overflowX and overflowY strings"))
                continue
            left = clip_rect["x"] + ancestor["clientLeft"]
            top = clip_rect["y"] + ancestor["clientTop"]
            right = left + ancestor["clientWidth"]
            bottom = top + ancestor["clientHeight"]
            cuts_x = (ancestor.get("overflowX") in _CLIPPING and
                      (rect["x"] < left - tolerance or _right(rect) > right + tolerance))
            cuts_y = (ancestor.get("overflowY") in _CLIPPING and
                      (rect["y"] < top - tolerance or _bottom(rect) > bottom + tolerance))
            if cuts_x or cuts_y:
                axes = ",".join(axis for axis, cuts in (("x", cuts_x), ("y", cuts_y)) if cuts)
                findings.append(_finding("ancestor-clips-element", subject,
                                         f"{ancestor_selector} clips visible element on axis {axes}"))
        # Clip-paths can cut non-rectangular areas whose bounding box still
        # contains the element. The browser adapter therefore records both
        # the computed clip box and a geometry-derived `clipsElement` result.
        clip_paths = element.get("clipPaths", [])
        if not isinstance(clip_paths, list):
            findings.append(_finding("invalid-clip-paths", subject, "clipPaths must be a list"))
            clip_paths = []
        for clip_index, clip_path in enumerate(clip_paths):
            if not isinstance(clip_path, dict):
                findings.append(_finding("invalid-clip-path", f"{subject}[{clip_index}]",
                                         "clip path measurement must be an object"))
                continue
            clip_selector = str(clip_path.get("selector") or "clip-path")
            clip_box = clip_path.get("clipBox")
            if not _valid_rect(clip_box) or not isinstance(clip_path.get("clipsElement"), bool):
                findings.append(_finding("invalid-clip-path-measurement", clip_selector,
                                         "clip path needs a clipBox rect and boolean clipsElement"))
                continue
            box_excludes = (rect["x"] < clip_box["x"] - tolerance
                            or rect["y"] < clip_box["y"] - tolerance
                            or _right(rect) > _right(clip_box) + tolerance
                            or _bottom(rect) > _bottom(clip_box) + tolerance)
            if clip_path["clipsElement"] or box_excludes:
                findings.append(_finding("clip-path-clips-element", subject,
                                         f"{clip_selector} clips element (clip-box exclusion={box_excludes})"))
    findings.sort(key=lambda item: (item["code"], item["subject"], item["detail"]))
    return {"passed": not findings, "findings": findings}


def _relation(first: dict[str, float], second: dict[str, float], tolerance: float) -> str:
    if (_right(first) <= second["x"] + tolerance):
        return "left"
    if (_right(second) <= first["x"] + tolerance):
        return "right"
    if (_bottom(first) <= second["y"] + tolerance):
        return "above"
    if (_bottom(second) <= first["y"] + tolerance):
        return "below"
    return "overlap"


def _topology_signature(measurement: dict[str, Any], tolerance: float) -> tuple[Any, ...] | None:
    regions = measurement.get("regions")
    if not isinstance(regions, dict) or len(regions) < 2:
        return None
    names = sorted(regions)
    if not all(_valid_rect(regions[name]) for name in names):
        return None
    pairs = tuple((a, b, _relation(regions[a], regions[b], tolerance))
                  for i, a in enumerate(names) for b in names[i + 1:])
    # Aspect classes capture shape changes; raw normalized-to-tolerance boxes
    # capture meaningful position/size changes even when pair ordering stays.
    shapes = tuple((name, "wide" if regions[name]["width"] > regions[name]["height"] * 1.25
                    else "tall" if regions[name]["height"] > regions[name]["width"] * 1.25
                    else "square") for name in names)
    boxes = tuple((name, *(regions[name][field] for field in ("x", "y", "width", "height")))
                  for name in names)
    return pairs, shapes, boxes


def compare_topology(baseline: dict[str, Any], variant: dict[str, Any], *,
                     required: bool = False, tolerance: float = 1.0) -> dict[str, Any]:
    """Compare non-color geometric relationships, optionally enforcing a change.

    For C2/E2 pass ``required=True`` and the expected Appendix target in both
    measurements. The signature only uses measured region positions/shapes;
    palette tokens cannot make a layout pass.
    """
    tolerance = _bounded_tolerance(tolerance)
    findings: list[dict[str, str]] = []
    expected_target = baseline.get("target")
    actual_target = variant.get("target")
    if not expected_target or not actual_target:
        findings.append(_finding("layout-target-missing", "layout", "both measurements require a target selector"))
    elif expected_target != actual_target:
        findings.append(_finding("layout-target-mismatch", str(actual_target),
                                 f"expected target {expected_target}"))
    base_signature = _topology_signature(baseline, tolerance)
    variant_signature = _topology_signature(variant, tolerance)
    if base_signature is None or variant_signature is None:
        findings.append(_finding("layout-regions-incomplete", str(actual_target or "layout"),
                                 "each measurement needs at least two valid named regions"))
        changed = False
    else:
        changed = base_signature[:2] != variant_signature[:2]
        # Geometry is compared directly to avoid quantization bucket edge
        # effects: differences at or below tolerance are noise; larger deltas
        # in any measured box dimension/location count as a real change.
        for name in sorted(set(baseline["regions"]) & set(variant["regions"])):
            before, after = baseline["regions"][name], variant["regions"][name]
            if any(abs(before[field] - after[field]) > max(0.0, tolerance)
                   for field in ("x", "y", "width", "height")):
                changed = True
                break
    if required and not changed:
        findings.append(_finding("layout-topology-unchanged", str(actual_target or "layout"),
                                 "required topology change was not measured"))
    findings.sort(key=lambda item: (item["code"], item["subject"], item["detail"]))
    return {"passed": not findings, "changed": changed, "baseline": base_signature,
            "variant": variant_signature, "findings": findings}


def validate_e3_contract(expected: dict[str, Any], observed: dict[str, Any]) -> dict[str, Any]:
    """Check Appendix A E3 technique metadata against variant/runtime evidence."""
    findings: list[dict[str, str]] = []
    for field in _E3_FIELDS:
        if expected.get(field) in (None, ""):
            findings.append(_finding("e3-appendix-field-missing", field, "Appendix E3 metadata is required"))
        elif expected.get(field) != observed.get(field):
            findings.append(_finding(f"e3-{field.lower()}-mismatch", field,
                                     f"Appendix={expected.get(field)!r}; observed={observed.get(field)!r}"))
    expected_layer = expected.get("layer")
    runtime_layer = observed.get("runtimeLayer")
    if runtime_layer != expected_layer:
        findings.append(_finding("e3-runtime-layer-mismatch", "runtimeLayer",
                                 f"expected runtime layer {expected_layer!r}; observed {runtime_layer!r}"))
    findings.sort(key=lambda item: (item["code"], item["subject"], item["detail"]))
    return {"passed": not findings, "findings": findings}
