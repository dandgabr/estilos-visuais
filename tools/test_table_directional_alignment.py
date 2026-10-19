"""Prove LTR table alignment remains unchanged while RTL uses right alignment."""
import threading
import unittest
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright
from chromium_runtime import chromium_executable


ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *_args):
        pass


class DirectionalTableAlignment(unittest.TestCase):
    def test_default_ltr_and_explicit_rtl_alignment(self):
        server = ThreadingHTTPServer(("127.0.0.1", 0), QuietHandler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
                try:
                    page = browser.new_page(viewport={"width": 1280, "height": 900}, locale="pt-BR")
                    page.add_init_script("localStorage.clear(); localStorage.setItem('coacus-locale','pt-BR'); localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true')")
                    page.goto(f"http://127.0.0.1:{server.server_port}/#nordic/relatorios", wait_until="domcontentloaded")
                    page.wait_for_function("document.querySelector('#stage')?.dataset.style === 'nordic' && document.querySelector('.view-pane.is-active')?.id === 'view-relatorios'")
                    cell = page.locator("#stage .view-pane.is-active table td").first
                    cell.wait_for(state="attached")
                    ltr = cell.evaluate("e => getComputedStyle(e).textAlign")
                    page.locator("html").evaluate("e => e.dir='rtl'")
                    rtl = cell.evaluate("e => getComputedStyle(e).textAlign")
                finally:
                    browser.close()
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)
        self.assertEqual(ltr, "left")
        self.assertEqual(rtl, "right")


if __name__ == "__main__":
    unittest.main()
