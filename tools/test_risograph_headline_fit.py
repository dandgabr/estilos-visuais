"""Regression test for the clipped Risograph display heading on mobile."""
from playwright.sync_api import sync_playwright

from chromium_runtime import chromium_executable


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
        page = browser.new_page(viewport={"width": 320, "height": 800})
        page.add_init_script("localStorage.setItem('coacus-locale','pt-BR'); localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true')")
        page.goto("http://127.0.0.1:8000/#risograph")
        page.wait_for_function("document.querySelector('#stage')?.dataset.style === 'risograph'")

        for width in (320, 375):
            page.set_viewport_size({"width": width, "height": 800})
            page.wait_for_timeout(100)
            measurements = page.locator("#stage .display").evaluate("""e => {
              const r = e.getBoundingClientRect();
              const p = e.parentElement.getBoundingClientRect();
              return {left: r.left, right: r.right, parentLeft: p.left, parentRight: p.right,
                      clientWidth: e.clientWidth, scrollWidth: e.scrollWidth};
            }""")
            assert measurements["left"] >= measurements["parentLeft"] - 1, (width, measurements)
            assert measurements["right"] <= measurements["parentRight"] + 1, (width, measurements)
            assert measurements["scrollWidth"] <= measurements["clientWidth"] + 1, (width, measurements)
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), width

        browser.close()


if __name__ == "__main__":
    main()
