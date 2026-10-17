"""Check that preview buttons stay within their section at mobile and desktop widths."""

import re
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parent.parent
SLUGS = re.findall(r"\['([a-z0-9-]+)',\s*'", (ROOT / "styles/registry.js").read_text())
ZONES = ".hero,.panel,.card,.topbar,.toast,.view-header,.kanban-card,.team-card,.table-toolbar"


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path="/usr/bin/chromium-browser", headless=True
        )
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.add_init_script(
            "localStorage.setItem('coacus-auto-tour', 'false'); "
            "localStorage.setItem('coacus-welcome-tour', 'true')"
        )
        page.goto("http://127.0.0.1:8000/#nordic")
        problems = []
        for width in (1280, 375, 320):
            page.set_viewport_size({"width": width, "height": 800})
            for slug in SLUGS:
                page.locator("#tab-painel").click()
                page.evaluate("slug => { location.hash = slug }", slug)
                page.wait_for_function(
                    "slug => document.querySelector('#stage').dataset.style === slug",
                    arg=slug,
                )
                for view in ("painel", "projetos", "equipe", "relatorios"):
                    page.locator(f"#tab-{view}").click()
                    found = page.evaluate(
                        """zones => {
                          const stage = document.querySelector('#stage').getBoundingClientRect();
                          return [...document.querySelectorAll('#stage .topbar button, #stage .view-pane:not([hidden]) button')].flatMap(button => {
                          if (button.closest('dialog:not([open])')) return [];
                          const rect = button.getBoundingClientRect();
                          if (!rect.width || !rect.height) return [{button: button.textContent.trim(), reason: 'hidden'}];
                          const zone = button.closest(zones);
                          if (!zone) return [{button: button.textContent.trim(), reason: 'no zone'}];
                          const box = zone.getBoundingClientRect();
                          const outside = Math.max(box.left - rect.left, rect.right - box.right,
                                                   box.top - rect.top, rect.bottom - box.bottom,
                                                   stage.left - rect.left, rect.right - stage.right);
                          return outside > 1 ? [{button: button.textContent.trim(), outside: +outside.toFixed(1)}] : [];
                        })}""",
                        ZONES,
                    )
                    problems.extend((slug, width, view, item) for item in found)
        browser.close()
        assert not problems, problems
        print(f"{len(SLUGS)} styles: buttons stay in their sections at 320px, 375px and 1280px")


if __name__ == "__main__":
    main()
