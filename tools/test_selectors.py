"""Check language and appearance controls, keyboard behavior, and narrow layouts."""

from playwright.sync_api import sync_playwright


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path='/usr/bin/chromium-browser', headless=True)
        page = browser.new_page(viewport={'width': 375, 'height': 740})
        page.add_init_script("Object.defineProperty(navigator, 'languages', {get: () => ['de-DE']}); localStorage.setItem('coacus-locale','auto'); localStorage.setItem('coacus-appearance-nordic','default'); localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true')")
        page.goto('http://127.0.0.1:8000/#nordic/projetos')
        page.locator('#stage[data-style="nordic"]').wait_for()
        page.wait_for_function("document.documentElement.lang === 'de-DE'")
        initial_url = page.url
        initial_name = page.locator('#cur-name').inner_text()

        language = page.locator('#locale-trigger')
        language.click()
        assert language.get_attribute('aria-expanded') == 'true'
        assert page.locator('#locale-options input[type=radio]').count() == 12
        assert page.locator('#locale-options .locale-autonym[lang][dir="auto"]').count() == 11
        assert page.locator('#locale-options bdi[dir="ltr"]').count() == 11
        assert page.locator('#locale-options input:checked').get_attribute('value') == 'auto'
        assert page.locator('#locale-options input:checked').evaluate('e => document.activeElement === e')
        page.locator('#locale-options input[value="ja-JP"]').check()
        page.wait_for_function("document.documentElement.lang === 'ja-JP'")
        assert page.url == initial_url
        assert page.locator('#cur-name').inner_text() == initial_name
        assert page.evaluate("localStorage.getItem('coacus-locale')") == 'ja-JP'
        assert page.locator('#locale-trigger-value').inner_text().startswith('日本語')
        assert page.locator('#locale-trigger').get_attribute('aria-expanded') == 'false'

        appearance = page.locator('#appearance-trigger')
        appearance.focus()
        page.keyboard.press('Enter')
        assert appearance.get_attribute('aria-expanded') == 'true'
        assert page.locator('#appearance-options input[type=radio]').count() == 1
        assert page.locator('#appearance-options input:checked').get_attribute('value') == 'default'
        panel = page.locator('#appearance-panel').bounding_box()
        assert panel['x'] >= 0 and panel['y'] >= 0 and panel['x'] + panel['width'] <= 375 and panel['y'] + panel['height'] <= 740
        swatches = page.locator('#appearance-options .appearance-swatches i').evaluate_all("nodes => nodes.map(e => getComputedStyle(e).backgroundColor)")
        tokens = page.locator('#stage').evaluate("e => ['--bg','--surface','--accent'].map(k => { const sample=document.createElement('i'); sample.style.backgroundColor=getComputedStyle(e).getPropertyValue(k).trim(); document.body.append(sample); const value=getComputedStyle(sample).backgroundColor; sample.remove(); return value; })")
        assert swatches == tokens
        page.keyboard.press('Escape')
        assert appearance.get_attribute('aria-expanded') == 'false'
        assert appearance.evaluate('e => document.activeElement === e')

        page.keyboard.press('ArrowRight')
        assert page.locator('#stage').get_attribute('data-style') == 'nordic'

        language.click()
        page.locator('#locale-options input[value="ar-SA"]').check()
        page.wait_for_function("document.documentElement.lang === 'ar-SA'")
        assert page.locator('html').get_attribute('dir') == 'rtl'
        assert page.locator('#stage[data-style="nordic"]').count() == 1

        for width in (320, 375, 768, 1280):
            page.set_viewport_size({'width': width, 'height': 740})
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'horizontal page overflow at {width}px'
            for selector in ('#prev', '#next', '#tour-btn', '#style-skill-link', '#locale-trigger', '#appearance-trigger'):
                box = page.locator(selector).bounding_box()
                assert box['width'] >= 44 and box['height'] >= 44, (width, selector, box)
            assert page.locator('#cur-name').is_visible()

        page.evaluate("document.body.style.zoom='2'")
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert page.locator('#cur-name').is_visible()
        browser.close()


if __name__ == '__main__':
    main()
