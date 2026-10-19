"""Structural CSS fingerprints for style variant identity gates.

The oracle normalizes only identity-bearing selector values (style slug and
variant ID) and literal colors. Layout, type, materials, composition, and
animation declarations remain part of the fingerprint. It is intentionally a
small deterministic lexer rather than a browser or CSS rewriter.
"""
from __future__ import annotations

import hashlib
import re


_COMMENT = re.compile(r"/\*.*?\*/", re.S)
_HEX_COLOR = re.compile(r"(?<![\w-])#(?:[\da-fA-F]{8}|[\da-fA-F]{6}|[\da-fA-F]{4}|[\da-fA-F]{3})(?![\w-])")
_FUNCTIONAL_COLOR = re.compile(r"\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(\s*[^()]*\)", re.I)
_DECLARATION = re.compile(r"^\s*(?P<property>--[-\w]+|[-a-zA-Z_][\w-]*)\s*:\s*(?P<value>.*)$", re.S)
_COLOR_PROPERTY = re.compile(
    r"^(?:color|background(?:-[\w-]+)?|border(?:-[\w-]+)?|outline(?:-[\w-]+)?|"
    r"box-shadow|text-shadow|text-decoration-color|column-rule(?:-color)?|fill|stroke|"
    r"stop-color|flood-color|lighting-color|caret-color|accent-color)$", re.I,
)
_PALETTE_CUSTOM_PROPERTY = re.compile(
    r"^--(?:bg|fg|text|muted|accent(?:-fg)?|surface(?:-\d+)?|border|ok|warn|danger|focus|shadow|color(?:-[\w-]+)?|[\w-]*-color)$",
    re.I,
)
_STYLE_SELECTOR = re.compile(r'(?P<prefix>#stage\s*\[\s*data-style\s*=\s*[\"\'])(?P<slug>[a-z0-9-]+)(?P<suffix>[\"\']\s*\])', re.I)
_VARIANT_SELECTOR = re.compile(r'(?P<prefix>\[\s*data-variant\s*=\s*[\"\'])(?:c|e)[1-3](?P<suffix>[\"\']\s*\])', re.I)
_WS = re.compile(r"\s+")


def normalize_css(css: str, *, slug: str | None = None) -> str:
    """Return a stable structural representation of CSS.

    The source is expected to be a single style's variant sheet. Colors are
    normalized as values only; no declaration or selector is removed. Slug
    normalization applies to the stage's data-style selector and matching
    slug-prefixed keyframe names/references. Variant IDs are normalized in
    data-variant selectors.
    """
    if not isinstance(css, str):
        raise TypeError("css must be str")
    value = _COMMENT.sub("", css)
    value = _STYLE_SELECTOR.sub(r"\g<prefix>STYLE\g<suffix>", value)
    value = _VARIANT_SELECTOR.sub(r"\g<prefix>VARIANT\g<suffix>", value)
    if slug:
        slug_pattern = re.escape(slug)
        value = re.sub(rf"(?i)(@keyframes\s+){slug_pattern}(?=-)", r"\1STYLE", value)
        value = re.sub(rf"(?i)(?<=animation:){slug_pattern}(?=-)", "STYLE", value)
        value = re.sub(rf"(?i)(?<=animation-name:){slug_pattern}(?=-)", "STYLE", value)
    # Generated motion names include the selected c1–e3 ID after the style
    # slug. Normalize that identity segment, while retaining the motion name.
    value = re.sub(r"(?i)(STYLE-)(?:c|e)[1-3]-", r"\1", value)
    value = _normalize_declaration_values(value)
    # Preserve token boundaries; whitespace does not encode CSS layout.
    return _WS.sub(" ", value).strip()


def _normalize_color_value(value: str) -> str:
    """Normalize color literals without touching quoted text or URL fragments."""
    protected: list[str] = []

    def protect(text: str, *, urls_only: bool = False) -> str:
        output: list[str] = []
        index = 0
        while index < len(text):
            if text[index] in ("'", '"'):
                quote = text[index]
                start = index
                index += 1
                while index < len(text):
                    if text[index] == "\\":
                        index += 2
                        continue
                    if text[index] == quote:
                        index += 1
                        break
                    index += 1
                if urls_only:
                    output.append(text[start:index])
                else:
                    marker = f"__CSS_PROTECTED_{len(protected)}__"
                    protected.append(text[start:index])
                    output.append(marker)
                continue
            url = re.match(r"(?i)url\s*\(", text[index:])
            if url:
                start = index
                index += url.end()
                depth = 1
                quote: str | None = None
                while index < len(text) and depth:
                    char = text[index]
                    if quote:
                        if char == "\\":
                            index += 2
                            continue
                        if char == quote:
                            quote = None
                    elif char in ("'", '"'):
                        quote = char
                    elif char == "(":
                        depth += 1
                    elif char == ")":
                        depth -= 1
                    index += 1
                marker = f"__CSS_PROTECTED_{len(protected)}__"
                protected.append(text[start:index])
                output.append(marker)
                continue
            output.append(text[index])
            index += 1
        return "".join(output)

    value = protect(value)
    value = _FUNCTIONAL_COLOR.sub("COLOR", value)
    value = _HEX_COLOR.sub("COLOR", value)
    for index, original in enumerate(protected):
        value = value.replace(f"__CSS_PROTECTED_{index}__", original)
    return value


def _normalize_declaration_values(css: str) -> str:
    """Normalize palette/color literals in declaration values, not selectors.

    Braces, semicolons, colons and separators inside strings/functions/bracketed
    attributes do not terminate a declaration. Segments immediately before an
    opening brace are selectors or at-rule preludes and are deliberately kept.
    """
    start = 0
    index = 0
    quote: str | None = None
    parens = brackets = 0
    output: list[str] = []

    def normalize_segment(segment: str) -> str:
        match = _DECLARATION.match(segment)
        if not match:
            return segment
        prop = match.group("property")
        if not (_COLOR_PROPERTY.fullmatch(prop) or _PALETTE_CUSTOM_PROPERTY.fullmatch(prop)):
            return segment
        return (segment[:match.start("value")]
                + _normalize_color_value(match.group("value"))
                + segment[match.end("value"):])

    while index < len(css):
        char = css[index]
        if quote:
            if char == "\\":
                index += 2
                continue
            if char == quote:
                quote = None
        elif char in ("'", '"'):
            quote = char
        elif char == "(":
            parens += 1
        elif char == ")" and parens:
            parens -= 1
        elif char == "[":
            brackets += 1
        elif char == "]" and brackets:
            brackets -= 1
        elif not parens and not brackets:
            if char in (";", "}"):
                output.append(normalize_segment(css[start:index]))
                output.append(char)
                start = index + 1
            elif char == "{":
                output.append(css[start:index] + char)
                start = index + 1
        index += 1
    output.append(normalize_segment(css[start:]))
    return "".join(output)


def fingerprint_css(css: str, *, slug: str | None = None) -> str:
    """SHA-256 of normalized CSS; use ``normalize_css`` for diagnostics."""
    normalized = normalize_css(css, slug=slug)
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()


def mutation_contract() -> dict[str, object]:
    """Directed runtime mutants that require integration with app behavior.

    This oracle is isolated from the product runtime, so it records the exact
    required observations without claiming those mutants have been executed.
    """
    cases = [
        ("skillUrl", "return a different style's skill URL", "each style link resolves to its own skill path"),
        ("resolveLocale", "ignore navigator language preference", "supported browser locale is selected; unsupported locale falls back to en-US"),
        ("setVariant", "apply variant tokens without selecting its stylesheet", "selected variant ID, CSS link, and rendered design agree"),
        ("stylesheet_failure", "treat stylesheet load error as success", "failed load reports failure and does not persist the requested variant"),
        ("fallback", "remove default fallback on unknown or failed variant", "default appearance remains usable and selected state reflects fallback"),
        ("rollback", "allow stale asynchronous variant response to win", "latest request remains active; stale response cannot replace its CSS or stored choice"),
    ]
    return {
        "status": "integration-required",
        "executed": False,
        "cases": [
            {"target": target, "mutant": mutant, "requiredObservation": observation}
            for target, mutant, observation in cases
        ],
    }
