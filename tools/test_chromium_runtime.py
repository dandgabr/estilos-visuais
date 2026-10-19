import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from chromium_runtime import chromium_executable


class ChromiumRuntimeTests(unittest.TestCase):
    def test_accepts_an_explicit_chromium_elf(self):
        with tempfile.TemporaryDirectory() as tmp:
            binary = Path(tmp) / "chromium"
            binary.write_bytes(b"\x7fELF" + b"\x00" * 32)
            binary.chmod(0o755)
            with patch.dict(os.environ, {"COACUS_CHROMIUM_EXECUTABLE": str(binary)}):
                self.assertEqual(chromium_executable(), str(binary.resolve()))

    def test_rejects_a_wrapper_that_could_import_shared_browser_flags(self):
        with tempfile.TemporaryDirectory() as tmp:
            wrapper = Path(tmp) / "chromium-browser"
            wrapper.write_text("#!/bin/sh\nexec chromium \"$@\"\n")
            wrapper.chmod(0o755)
            with patch.dict(os.environ, {"COACUS_CHROMIUM_EXECUTABLE": str(wrapper)}):
                with self.assertRaisesRegex(RuntimeError, "ELF Chromium binary"):
                    chromium_executable()


if __name__ == "__main__":
    unittest.main()
