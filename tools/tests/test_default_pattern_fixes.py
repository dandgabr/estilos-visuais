"""Regression tests for confirmed responsive defects in canonical defaults."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import unittest
import sys

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))

from chromium_runtime import chromium_executable  # noqa: E402


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format, *_args):
        pass


class FixtureServer:
    def __init__(self):
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT)))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.server.server_port}"

    def close(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)


class CanonicalDefaultResponsiveFixTests(unittest.TestCase):
    def test_swiss_resources_at_768_has_no_implicit_narrow_column(self):
        server = FixtureServer()
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
                try:
                    page = browser.new_page(viewport={"width": 768, "height": 900})
                    page.add_init_script("localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true');")
                    page.goto(f"{server.base_url}/#swiss-web-minimalism/painel")
                    page.locator('#stage[data-style="swiss-web-minimalism"]').wait_for()
                    metrics = page.locator("#view-painel .grid").evaluate("""grid => {
                      const features = [...grid.querySelectorAll('.feature')];
                      const chart = grid.querySelector('.chart');
                      return {
                        columns: getComputedStyle(grid).gridTemplateColumns,
                        featureWidths: features.map(node => node.getBoundingClientRect().width),
                        chartWidth: chart.getBoundingClientRect().width
                      };
                    }""")
                    self.assertEqual(len(metrics["featureWidths"]), 2)
                    self.assertLessEqual(abs(metrics["featureWidths"][0] - metrics["featureWidths"][1]), 1, metrics)
                    self.assertLessEqual(abs(metrics["featureWidths"][0] - metrics["chartWidth"]), 1, metrics)
                finally:
                    browser.close()
        finally:
            server.close()

    def test_lunarpunk_mobile_halo_does_not_cover_copy_and_keeps_lunar_marks(self):
        server = FixtureServer()
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
                try:
                    page = browser.new_page(viewport={"width": 320, "height": 900})
                    page.add_init_script("localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true');")
                    page.goto(f"{server.base_url}/#lunarpunk/painel")
                    page.locator('#stage[data-style="lunarpunk"]').wait_for()
                    for width in (320, 375, 768, 1280):
                        page.set_viewport_size({"width": width, "height": 900})
                        state = page.locator("#stage").evaluate("""stage => {
                          const eyebrow=stage.querySelector('.eyebrow');
                          const mark=stage.querySelector('.brand-mark');
                          const title=stage.querySelector('.section-title');
                          const eyebrowRect=eyebrow.getBoundingClientRect();
                          const stageRect=stage.getBoundingClientRect();
                          const markStyle=getComputedStyle(mark);
                          const lunarTitle=getComputedStyle(title,'::before');
                          return {
                            width:innerWidth,
                            moonLayer:getComputedStyle(stage).getPropertyValue('--lunar-moon-layer').trim(),
                            backgroundImage:getComputedStyle(stage).backgroundImage,
                            eyebrowText:eyebrow.innerText,
                            eyebrowWithinStage:eyebrowRect.left>=stageRect.left && eyebrowRect.right<=stageRect.right,
                            brandMark:{display:markStyle.display,background:markStyle.backgroundColor,radius:markStyle.borderRadius,box:mark.getBoundingClientRect().toJSON()},
                            sectionMoon:{width:lunarTitle.width,height:lunarTitle.height,shadow:lunarTitle.boxShadow},
                            overflow:document.documentElement.scrollWidth>innerWidth
                          };
                        }""")
                        with self.subTest(width=width):
                            if width <= 640:
                                self.assertEqual(state["moonLayer"], "none", state)
                                self.assertIn("radial-gradient", state["backgroundImage"], "starfield and nebula layers must remain")
                            else:
                                self.assertTrue(state["moonLayer"].startswith("radial-gradient("), state)
                            self.assertIn("V2.6", state["eyebrowText"])
                            self.assertTrue(state["eyebrowWithinStage"], state)
                            self.assertNotEqual(state["brandMark"]["display"], "none", state)
                            self.assertGreater(state["brandMark"]["box"]["width"], 0, state)
                            self.assertEqual(state["brandMark"]["background"], "rgb(242, 211, 107)", state)
                            self.assertEqual(state["brandMark"]["radius"], "50%", state)
                            self.assertEqual(state["sectionMoon"]["width"], "18px", state)
                            self.assertEqual(state["sectionMoon"]["height"], "18px", state)
                            self.assertFalse(state["overflow"], state)
                finally:
                    browser.close()
        finally:
            server.close()


if __name__ == "__main__":
    unittest.main()
