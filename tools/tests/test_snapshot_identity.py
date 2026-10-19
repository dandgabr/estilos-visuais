import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT_TOOLS = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT_TOOLS))
from oracles.snapshot_identity import snapshot_identity


class SnapshotIdentityTests(unittest.TestCase):
    def test_identity_covers_tracked_and_untracked_sources_but_not_report_outputs(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            subprocess.run(["git", "init", "-q"], cwd=root, check=True)
            subprocess.run(["git", "config", "user.email", "test@example.invalid"], cwd=root, check=True)
            subprocess.run(["git", "config", "user.name", "Snapshot Test"], cwd=root, check=True)
            (root / "tracked.css").write_text("body{color:black}")
            subprocess.run(["git", "add", "tracked.css"], cwd=root, check=True)
            subprocess.run(["git", "commit", "-qm", "fixture"], cwd=root, check=True)

            baseline = snapshot_identity(root)
            (root / "docs/temp/reports").mkdir(parents=True)
            (root / "docs/temp/reports/run.json").write_text("report")
            self.assertEqual(snapshot_identity(root), baseline)

            (root / "styles").mkdir()
            (root / "styles/new.css").write_text(".new{color:red}")
            added = snapshot_identity(root)
            self.assertNotEqual(added["sha256"], baseline["sha256"])
            self.assertEqual(added["fileCount"], baseline["fileCount"] + 1)

            (root / "tracked.css").write_text("body{color:blue}")
            self.assertNotEqual(snapshot_identity(root)["sha256"], added["sha256"])


if __name__ == "__main__":
    unittest.main()
