"""Exercise locale negotiation and document language application."""

import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]


def main():
    script = r'''
      import assert from 'node:assert/strict';
      import {resolveLocale, availableLocales, t, setLocale, localizedStyleDescription} from './i18n/index.js';
      const available = availableLocales();
      assert.equal(available.length, 11);
      assert.equal(resolveLocale('pt-BR', ['en-US']), 'pt-BR');
      assert.equal(resolveLocale('invalid_tag', ['pt-PT']), 'pt-BR');
      assert.equal(resolveLocale('auto', ['xx-ZZ', 'en-GB']), 'en-US');
      assert.equal(resolveLocale('auto', ['en-GB']), 'en-US');
      assert.equal(resolveLocale('auto', ['pt-BR', 'en-US']), 'pt-BR');
      assert.equal(resolveLocale('auto', []), 'en-US');
      assert.equal(resolveLocale('auto', ['%%%']), 'en-US');
      globalThis.document = {documentElement: {}, querySelectorAll: () => []};
      globalThis.NodeFilter = {SHOW_TEXT: 4};
      document.createTreeWalker = () => ({nextNode: () => null});
      await setLocale('en-US');
      assert.equal(t('gallery.count', {count: 4}), '4 styles');
      await setLocale('ja-JP');
      assert.equal(document.documentElement.lang, 'ja-JP');
      assert.notEqual(t('gallery.search'), 'Buscar estilo…');
      assert.ok(localizedStyleDescription('nordic', 'fallback').length > 4);
      const catalogs = await Promise.all(available.map(async (tag) => {
        const module = await import(`./i18n/locales/${tag}.js`);
        const data = module.default.keys ? module.default : {keys: module.default};
        return [tag, data];
      }));
      const canonicalKeys = Object.keys(catalogs[0][1].keys).sort();
      for (const [tag, data] of catalogs) {
        assert.deepEqual(Object.keys(data.keys).sort(), canonicalKeys, `${tag} key set`);
        if (data.styleDescriptions) assert.equal(Object.keys(data.styleDescriptions).length, 82, `${tag} style descriptions`);
      }
      assert.equal(resolveLocale('auto', ['zh-Hans']), 'zh-CN');
      assert.equal(resolveLocale('auto', ['pt-PT', 'de-DE']), 'pt-BR');
      assert.equal(resolveLocale('auto', ['es-MX', 'fr-FR']), 'es-ES');
      await setLocale('ar-SA');
      assert.equal(document.documentElement.dir, 'rtl');
    '''
    result = subprocess.run(['node', '--input-type=module', '-e', script], cwd=ROOT, text=True, capture_output=True)
    assert result.returncode == 0, result.stderr

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path='/usr/bin/chromium-browser', headless=True)
        page = browser.new_page(viewport={'width': 375, 'height': 740})
        page.add_init_script("Object.defineProperty(navigator, 'languages', {get: () => ['ru-RU']}); if (!localStorage.getItem('coacus-locale')) localStorage.setItem('coacus-locale','auto'); localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true')")
        page.goto('http://127.0.0.1:8000/#nordic')
        page.locator('#stage[data-style="nordic"]').wait_for()
        assert page.locator('html').get_attribute('lang') == 'ru-RU'
        assert page.locator('#cur-desc').inner_text() != 'Paleta Nord (Polar Night & Frost), funcionalismo gélido e calor acolhedor hygge.'
        assert page.locator('#search').get_attribute('placeholder') != 'Buscar estilo…'
        assert page.locator('#list h2').first.inner_text() != 'Limpo e funcional'
        page.evaluate("location.hash='#scrollytelling'")
        page.locator('#stage[data-style="scrollytelling"]').wait_for()
        chapter = page.locator('#inicio').evaluate("e => getComputedStyle(e, '::before').content")
        assert 'Capítulo' not in chapter and 'Chapter' not in chapter
        page.evaluate("location.hash='#web-brutalism'")
        page.locator('#stage[data-style="web-brutalism"]').wait_for()
        notice = page.locator('.toast').evaluate("e => getComputedStyle(e, '::before').content")
        assert 'AVISO' not in notice and 'NOTICE' not in notice
        page.evaluate("localStorage.setItem('coacus-locale','ar-SA')")
        page.reload()
        page.wait_for_function("document.documentElement.lang === 'ar-SA'")
        assert page.locator('html').get_attribute('dir') == 'rtl'
        assert page.locator('#stage[data-style="web-brutalism"]').count() == 1
        browser.close()


if __name__ == '__main__':
    main()
