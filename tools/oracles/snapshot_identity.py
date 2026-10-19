"""Stable content identity for a dirty Git worktree used by release audits."""
from __future__ import annotations

import hashlib
import os
import stat
import subprocess
from pathlib import Path


REPORT_PREFIX = "docs/temp/reports/"


def snapshot_identity(root: Path) -> dict:
    root = Path(root).resolve()
    head = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, text=True).strip()
    status = subprocess.check_output(
        ["git", "status", "--porcelain=v1", "--untracked-files=all"], cwd=root, text=True
    )
    source_status = "\n".join(
        line for line in status.splitlines()
        if not line[3:].strip(' "').startswith(REPORT_PREFIX)
    ).encode("utf-8", "surrogateescape")
    raw_paths = subprocess.check_output(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"], cwd=root
    )
    paths = sorted({item.decode("utf-8", "surrogateescape") for item in raw_paths.split(b"\0") if item})
    digest = hashlib.sha256()
    included = 0
    for relative in paths:
        if relative == REPORT_PREFIX.rstrip("/") or relative.startswith(REPORT_PREFIX):
            continue
        path = root / relative
        if not path.exists() and not path.is_symlink():
            continue
        digest.update(relative.encode("utf-8", "surrogateescape"))
        digest.update(b"\0")
        mode = stat.S_IMODE(path.lstat().st_mode)
        digest.update(f"{mode:o}".encode("ascii"))
        digest.update(b"\0")
        if path.is_symlink():
            digest.update(os.readlink(path).encode("utf-8", "surrogateescape"))
        elif path.is_file():
            with path.open("rb") as source:
                for chunk in iter(lambda: source.read(1024 * 1024), b""):
                    digest.update(chunk)
        included += 1
        digest.update(b"\0")
    return {
        "head": head,
        "dirty": bool(source_status),
        "statusSha256": hashlib.sha256(source_status).hexdigest(),
        "sha256": digest.hexdigest(),
        "fileCount": included,
        "excluded": [REPORT_PREFIX],
    }
