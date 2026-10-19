"""Geometry contract for the language and appearance controls."""

from playwright.sync_api import sync_playwright
import unittest

from tools.chromium_runtime import chromium_executable


class ShellControlsVisualTests(unittest.TestCase):
    def test_language_and_appearance_triggers_align_without_overflow(self):
      with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path=chromium_executable(), headless=True
        )
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.add_init_script(
            "localStorage.setItem('coacus-auto-tour','false');"
            "localStorage.setItem('coacus-welcome-tour','true')"
        )
        page.goto("http://127.0.0.1:8000/#nordic")
        page.locator('#stage[data-style="nordic"]').wait_for()

        for width in (320, 375, 768, 1280):
            page.set_viewport_size({"width": width, "height": 800})
            locale = page.locator("#locale-trigger").bounding_box()
            appearance = page.locator("#appearance-trigger").bounding_box()
            state = page.locator("#appearance-state").bounding_box()
            assert abs(locale["y"] - appearance["y"]) <= 2, (
                width,
                locale,
                appearance,
            )
            assert locale["width"] >= 44 and locale["height"] >= 44
            assert appearance["width"] >= 44 and appearance["height"] >= 44
            assert state["y"] >= appearance["y"] + appearance["height"] - 1
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (
                width,
                page.evaluate("[document.documentElement.scrollWidth, innerWidth]"),
            )

        browser.close()
