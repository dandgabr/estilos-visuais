"""Check language and appearance controls, keyboard behavior, and narrow layouts."""

from playwright.sync_api import sync_playwright
from chromium_runtime import chromium_executable


def main(base_url='http://127.0.0.1:8000'):
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
        page = browser.new_page(viewport={'width': 375, 'height': 740})
        page.set_default_timeout(6000)
        page.add_init_script("window.__testLanguages=['de-DE']; Object.defineProperty(navigator, 'languages', {get: () => window.__testLanguages}); if (!localStorage.getItem('coacus-locale')) localStorage.setItem('coacus-locale','auto'); localStorage.setItem('coacus-appearance-nordic','default'); localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true')")
        page.goto(f'{base_url}/#nordic/projetos')
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
        assert page.locator('#search').get_attribute('placeholder') == 'スタイルを検索…'
        assert page.locator('#stage h1.display').inner_text() == '独自のアイデンティティを持つインターフェースを作成する'
        assert page.locator('#stage p.lead').inner_text() == '各ビジュアル スタイルがタイポグラフィ、色、表面、形状、動きをどのように扱うかを比較するサンプル パネル。'
        assert page.locator('#cur-desc').inner_text() != ''
        # Locale changes must reach every view, including currently hidden panes.
        # Otherwise the language menu can update while the mock application stays
        # in its previous language until that view is rebuilt.
        expected_japanese_headings = {
            'painel': '今週の指標',
            'projetos': 'プロジェクトボード',
            'equipe': 'チームメンバー',
            'relatorios': 'テレメトリーおよび分析レポート',
        }
        for view, expected in expected_japanese_headings.items():
            headings = page.locator(f'#view-{view} h2').all_inner_texts()
            assert expected in headings, f'{view} view did not switch to Japanese: {headings}'
        for view in ('painel', 'projetos', 'equipe', 'relatorios'):
            assert page.locator(f'#view-{view} h2').first.inner_text() != ''
        assert page.evaluate("localStorage.getItem('coacus-locale')") == 'ja-JP'
        assert page.locator('#locale-trigger-value').inner_text().startswith('日本語')
        assert page.locator('#locale-trigger').get_attribute('aria-expanded') == 'false'
        page.evaluate("window.__testLanguages=['fr-FR']; dispatchEvent(new Event('languagechange'))")
        page.wait_for_timeout(100)
        assert page.locator('html').get_attribute('lang') == 'ja-JP', 'manual choice must ignore device languagechange'

        language.click()
        page.locator('#locale-options input[value="pt-BR"]').check()
        page.wait_for_function("document.documentElement.lang === 'pt-BR'")
        assert page.locator('#search').get_attribute('placeholder') == 'Buscar estilo…'
        assert page.locator('#stage h1.display').inner_text() == 'Crie interfaces com identidade própria'
        assert page.locator('#stage p.lead').inner_text() == 'Um painel de exemplo para comparar como cada estilo visual trata tipografia, cor, superfície, forma e movimento.'
        page.evaluate("window.__testLanguages=['ru-RU']; document.querySelector('#locale-trigger').click(); document.querySelector('#locale-options input[value=auto]').click()")
        page.wait_for_function("document.documentElement.lang === 'ru-RU'")
        assert page.evaluate("localStorage.getItem('coacus-locale')") == 'auto'
        page.evaluate("window.__testLanguages=['it-IT']; dispatchEvent(new Event('languagechange'))")
        page.wait_for_function("document.documentElement.lang === 'en-US'")
        assert 'English' in page.locator('#locale-trigger-value').inner_text()
        language.click()
        page.locator('#locale-options input[value="pt-BR"]').check()
        page.wait_for_function("document.documentElement.lang === 'pt-BR'")
        assert page.evaluate("localStorage.getItem('coacus-locale')") == 'pt-BR'
        page.reload()
        page.locator('#stage[data-style="nordic"]').wait_for()
        page.wait_for_function("document.documentElement.lang === 'pt-BR'")
        assert page.url == initial_url
        assert page.locator('#stage').get_attribute('data-variant') is None

        appearance = page.locator('#appearance-trigger')
        assert appearance.get_attribute('aria-pressed') == 'false'
        assert appearance.get_attribute('aria-describedby')
        assert appearance.inner_text().strip() == 'Modo claro/escuro'
        assert page.locator('#appearance-panel').count() == 0
        assert page.locator('#appearance-options input[type=radio]').count() == 0
        assert page.locator('#appearance-reset').count() == 0
        live = page.locator('#appearance-live')
        assert live.get_attribute('aria-live') == 'polite'
        assert live.get_attribute('aria-atomic') == 'true'
        state_id = appearance.get_attribute('aria-describedby')
        assert state_id
        assert 'Padrão' in page.locator(f'#{state_id}').inner_text()

        appearance.focus()
        if appearance.get_attribute('aria-disabled') == 'true':
            # A default-only fixture must fail closed for every activation path.
            appearance.dispatch_event('click')
            page.keyboard.press('Enter')
            page.keyboard.press('Space')
        else:
            # Approved releases must support both pointer and keyboard activation.
            appearance.click()
            page.wait_for_function("document.querySelector('#stage').dataset.variant==='alternate'")
            page.keyboard.press('Enter')
            page.wait_for_function("!document.querySelector('#stage').dataset.variant")
            page.keyboard.press('Space')
            page.wait_for_function("document.querySelector('#stage').dataset.variant==='alternate'")
            appearance.click()
            page.wait_for_function("!document.querySelector('#stage').dataset.variant")
        assert appearance.get_attribute('aria-pressed') == 'false'
        assert appearance.evaluate('e => document.activeElement === e')
        assert page.locator('#stage').get_attribute('data-variant') is None
        assert 'Padrão' in page.locator(f'#{state_id}').inner_text()
        assert page.evaluate("localStorage.getItem('coacus-appearance-nordic')") == 'default'

        for width in (320, 375, 768, 1280):
            page.set_viewport_size({'width': width, 'height': 740})
            box = appearance.bounding_box()
            assert box['width'] >= 44 and box['height'] >= 44, (width, box)
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
