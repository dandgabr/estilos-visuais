"""The style skill action must always follow the currently selected style."""

from pathlib import Path
import re

from playwright.sync_api import sync_playwright
from chromium_runtime import chromium_executable


ROOT = Path(__file__).resolve().parents[1]
BASE = "https://github.com/dandgabr/Coacus/blob/main/knowledge/skills/domains/design/"


def main():
    registry = (ROOT / "styles/registry.js").read_text()
    slugs = re.findall(r"\['([^']+)',\s*'[^']+'", registry)
    assert len(slugs) == 82

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.add_init_script("localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true')")
        page.goto("http://127.0.0.1:8000/#nordic")
        for slug in slugs:
            page.evaluate("slug => { location.hash = '#' + slug; }", slug)
            page.locator(f'#stage[data-style="{slug}"]').wait_for()
            expected = f"{BASE}ui-style-{slug}/SKILL.md"
            bar = page.locator("#style-skill-link")
            assert bar.get_attribute("href") == expected, (slug, bar.get_attribute("href"))
            # Open through the help dialog so the test does not depend on automatic-tour timing.
            page.locator("#tour-btn").click()
            page.locator("#start-style-tour-btn").click()
            page.locator(".driver-popover").wait_for()
            cta = page.locator(".driver-popover #style-skill-tour-link")
            assert cta.get_attribute("href") == expected, slug
            assert cta.get_attribute("target") == "_blank"
            assert "noopener" in cta.get_attribute("rel") and "noreferrer" in cta.get_attribute("rel")
            style_tour_text = []
            for _ in range(3):
                if not page.locator(".driver-popover").is_visible():
                    break
                style_tour_text.append(page.locator(".driver-popover").inner_text())
                next_button = page.locator(".driver-popover-next-btn")
                if not next_button.is_visible():
                    break
                next_button.click()
            joined_style_tour = "\n".join(style_tour_text)
            assert "Idioma" not in joined_style_tour and "Language" not in joined_style_tour
            assert "Aparência" not in joined_style_tour and "Appearance" not in joined_style_tour
            page.keyboard.press("Escape")

        # The full onboarding owns the global language and appearance controls.
        page.locator("#tour-btn").click()
        page.locator("#start-welcome-tour-btn").click()
        page.locator(".driver-popover").wait_for()
        full_tour_text = []
        for _ in range(8):
            if not page.locator(".driver-popover").is_visible():
                break
            full_tour_text.append(page.locator(".driver-popover").inner_text())
            next_button = page.locator(".driver-popover-next-btn")
            if not next_button.is_visible():
                break
            next_button.click()
        joined = "\n".join(full_tour_text)
        assert "Idioma" in joined or "Language" in joined
        assert "Aparência" in joined or "Appearance" in joined
        browser.close()


if __name__ == "__main__":
    main()
