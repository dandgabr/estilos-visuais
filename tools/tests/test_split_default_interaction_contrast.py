"""Regression for the confirmed light-pole button states in Split-Screen Padrão."""
from pathlib import Path
import re
import unittest

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]


def contrast_ratio(foreground: str, background: str) -> float:
    def luminance(color: str) -> float:
        channels = [int(part) / 255 for part in re.findall(r"\d+", color)[:3]]
        linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4
                  for value in channels]
        return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2]

    high, low = sorted((luminance(foreground), luminance(background)), reverse=True)
    return (high + .05) / (low + .05)


class SplitDefaultInteractionContrastTests(unittest.TestCase):
    def test_panel_secondary_normal_hover_and_keyboard_focus_are_distinguishable(self):
        html = """<!doctype html><html><body><main id="stage" data-style="split-screen-dualism">
          <section class="panel"><button class="btn btn-secondary">Open dialog</button></section>
        </main></body></html>"""
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path="/usr/bin/chromium-browser")
            page = browser.new_page()
            page.set_content(html)
            page.add_style_tag(content=(ROOT / "styles/base.css").read_text(encoding="utf-8"))
            page.add_style_tag(content=(ROOT / "styles/split-screen-dualism.css").read_text(encoding="utf-8"))
            button = page.locator(".panel .btn-secondary")

            def colors():
                return button.evaluate("el => ({fg:getComputedStyle(el).color, bg:getComputedStyle(el).backgroundColor, outline:getComputedStyle(el).outlineColor})")

            normal = colors()
            self.assertGreaterEqual(contrast_ratio(normal["fg"], normal["bg"]), 4.5, normal)

            button.hover()
            page.wait_for_timeout(200)  # allow the theme's 150 ms transition to settle
            hover = colors()
            self.assertGreaterEqual(contrast_ratio(hover["fg"], hover["bg"]), 4.5, hover)

            button.evaluate("el => el.blur()")
            page.mouse.move(0, 0)
            page.wait_for_timeout(200)
            page.keyboard.press("Tab")
            focused = colors()
            self.assertEqual(button.evaluate("el => el.matches(':focus-visible')"), True)
            self.assertGreaterEqual(contrast_ratio(focused["outline"], focused["bg"]), 3.0, focused)
            browser.close()


if __name__ == "__main__":
    unittest.main()
