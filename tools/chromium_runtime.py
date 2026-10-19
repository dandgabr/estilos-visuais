"""Resolve a direct Chromium ELF executable for isolated Playwright tests."""

import os
from pathlib import Path


_CANDIDATES = (
    "/usr/lib64/chromium-browser/chromium-browser",
    "/usr/lib/chromium-browser/chromium-browser",
    "/usr/lib/chromium/chromium",
)


def chromium_executable():
    """Return an executable Chromium ELF, never a shell wrapper."""
    configured = os.environ.get("COACUS_CHROMIUM_EXECUTABLE")
    candidates = (configured,) if configured else _CANDIDATES
    for candidate in candidates:
        path = Path(candidate).expanduser()
        try:
            resolved = path.resolve(strict=True)
            with resolved.open("rb") as binary:
                is_elf = binary.read(4) == b"\x7fELF"
            if is_elf and os.access(resolved, os.X_OK):
                return str(resolved)
        except OSError:
            continue
    source = f"COACUS_CHROMIUM_EXECUTABLE={configured!r}" if configured else "known direct Chromium paths"
    raise RuntimeError(f"No executable ELF Chromium binary found from {source}; configure COACUS_CHROMIUM_EXECUTABLE")
