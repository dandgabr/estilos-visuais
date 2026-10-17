"""Exercise locale negotiation and document language application."""

import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def main():
    script = r'''
      import assert from 'node:assert/strict';
      import {resolveLocale, availableLocales, t, setLocale} from './i18n/index.js';
      const available = availableLocales();
      assert.deepEqual(available, ['pt-BR', 'en-US']);
      assert.equal(resolveLocale('pt-BR', ['en-US']), 'pt-BR');
      assert.equal(resolveLocale('invalid_tag', ['pt-PT']), 'pt-BR');
      assert.equal(resolveLocale('auto', ['xx-ZZ', 'en-GB']), 'en-US');
      assert.equal(resolveLocale('auto', ['en-GB']), 'en-US');
      assert.equal(resolveLocale('auto', ['pt-BR', 'en-US']), 'pt-BR');
      assert.equal(resolveLocale('auto', []), 'en-US');
      assert.equal(resolveLocale('auto', ['%%%']), 'en-US');
      globalThis.document = {documentElement: {}, querySelectorAll: () => []};
      await setLocale('en-US');
      assert.equal(t('gallery.count', {count: 4}), '4 styles');
    '''
    result = subprocess.run(['node', '--input-type=module', '-e', script], cwd=ROOT, text=True, capture_output=True)
    assert result.returncode == 0, result.stderr


if __name__ == '__main__':
    main()
