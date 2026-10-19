"""Check explicit acceptance and cancellation of the help dialog preference."""

from playwright.sync_api import sync_playwright
from chromium_runtime import chromium_executable


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path=chromium_executable(), headless=True
        )
        page = browser.new_page(viewport={"width": 375, "height": 740})
        page.add_init_script(
            "localStorage.setItem('coacus-auto-tour', 'false'); "
            "localStorage.setItem('coacus-welcome-tour', 'true')"
        )
        page.goto("http://127.0.0.1:8000/#nordic")
        page.locator('#stage[data-style="nordic"]').wait_for()

        page.locator("#tour-btn").click()
        checkbox = page.locator("#auto-tour-toggle")
        assert not checkbox.is_checked()
        checkbox.check()
        page.locator("#dismiss-help-btn").click()
        assert page.evaluate("localStorage.getItem('coacus-auto-tour')") == "false"

        page.locator("#tour-btn").click()
        assert not checkbox.is_checked()
        checkbox.check()
        page.locator("#accept-help-btn").click()
        assert not page.locator("#help-dialog").evaluate("dialog => dialog.open")
        assert page.evaluate("localStorage.getItem('coacus-auto-tour')") == "true"

        page.locator("#tour-btn").click()
        assert checkbox.is_checked()
        checkbox.uncheck()
        page.locator("#close-help-btn").click()
        assert page.evaluate("localStorage.getItem('coacus-auto-tour')") == "true"
        browser.close()


if __name__ == "__main__":
    main()
