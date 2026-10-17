"""Regression check for the scrollytelling preview in Chromium."""

from playwright.sync_api import sync_playwright


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path="/usr/bin/chromium-browser", headless=True
        )
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.add_init_script(
            "localStorage.setItem('coacus-auto-tour', 'false'); "
            "localStorage.setItem('coacus-welcome-tour', 'true')"
        )
        page.goto("http://127.0.0.1:8000/#scrollytelling")
        page.locator('#stage[data-style="scrollytelling"][data-fx="on"]').wait_for()
        script_src = page.locator('script[type="module"][src^="app.js?"]').get_attribute("src")
        assert script_src and "v=" in script_src
        version = script_src.split("?", 1)[1]
        page.wait_for_function(
            "suffix => performance.getEntriesByType('resource').some(entry => "
            "entry.name.endsWith('/styles/fx/scrollytelling.js?' + suffix))",
            arg=version,
        )
        assert page.locator(f'link[href="styles/scrollytelling.css?{version}"]').count() == 1

        sections = page.locator("#view-painel > section")
        assert sections.count() == 4
        assert page.locator(".fx-st-dots li").count() == sections.count()
        assert page.locator("#view-painel > section.is-in").count() >= 1

        for index in range(sections.count()):
            sections.nth(index).evaluate(
                "element => element.scrollIntoView({block: 'center', behavior: 'instant'})"
            )
            page.wait_for_function(
                "index => document.querySelectorAll('.fx-st-dots li')[index]?.classList.contains('on')",
                arg=index,
            )
            page.wait_for_function(
                "index => +getComputedStyle(document.querySelectorAll('#view-painel > section')[index]).opacity >= .9",
                arg=index,
            )

        chart = page.locator("#view-painel .chart")
        chart.scroll_into_view_if_needed()
        page.wait_for_function(
            "() => getComputedStyle(document.querySelector('#view-painel .bars i')).transform === 'none'"
        )
        assert chart.locator(".bars i").evaluate_all(
            "bars => bars.length === 7 && bars.every(bar => bar.getBoundingClientRect().height > 30)"
        )

        page.locator("#stage").evaluate("stage => stage.scrollTop = stage.scrollHeight")
        page.wait_for_function(
            "() => parseFloat(document.querySelector('.fx-st-bar b').style.transform.match(/scaleX\\(([^)]+)\\)/)?.[1]) > .99"
        )

        split = page.locator("#view-painel > section.split")
        assert abs(
            split.locator(".panel").first.bounding_box()["x"]
            - split.bounding_box()["x"]
        ) < 3

        page.locator('#list a[data-slug="nordic"]').click()
        page.locator('#stage[data-style="nordic"]').wait_for()
        assert page.locator(".fx-st-dots").count() == 0
        assert page.locator("#stage[data-fx]").count() == 0
        browser.close()


if __name__ == "__main__":
    main()
