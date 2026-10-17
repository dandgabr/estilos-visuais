"""The style skill action must always follow the currently selected style."""

from pathlib import Path
import re

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
COACUS = Path("/home/daniel/Code/Coacus")
SKILLS = COACUS / "knowledge/skills/domains/design"
BASE = "https://github.com/dandgabr/Coacus/blob/main/knowledge/skills/domains/design/"


def main():
    registry = (ROOT / "styles/registry.js").read_text()
    slugs = re.findall(r"\['([^']+)',\s*'[^']+'", registry)
    expected_slugs = sorted(p.parent.name.removeprefix("ui-style-") for p in SKILLS.glob("ui-style-*/SKILL.md"))
    assert sorted(slugs) == expected_slugs, "local style list and synchronized Coacus skill directories differ"
    assert len(slugs) == 82

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path="/usr/bin/chromium-browser", headless=True)
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
            page.keyboard.press("Escape")
        browser.close()


if __name__ == "__main__":
    main()
