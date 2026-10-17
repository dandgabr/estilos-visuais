const catalogLoaders = {
  'pt-BR': () => import('./locales/pt-BR.js'),
  'en-US': () => import('./locales/en-US.js'),
};

const aliases = new Map([['pt', 'pt-BR'], ['en', 'en-US']]);
let catalog = {};
let fallback = {};
let activeLocale = 'en-US';
export const missingKeys = new Set();

export function availableLocales() {
  return Object.keys(catalogLoaders);
}

function canonical(tag) {
  try { return Intl.getCanonicalLocales(tag)[0]; } catch { return null; }
}

export function resolveLocale(savedMode, preferredLanguages = [], available = availableLocales()) {
  if (savedMode !== 'auto' && savedMode != null) {
    const manual = canonical(savedMode);
    if (manual && available.includes(manual)) return manual;
  }
  for (const candidate of preferredLanguages || []) {
    const tag = canonical(candidate);
    if (!tag) continue;
    if (available.includes(tag)) return tag;
    const alias = aliases.get(tag.split('-')[0].toLowerCase());
    if (alias && available.includes(alias)) return alias;
  }
  return available.includes('en-US') ? 'en-US' : available[0];
}

export function t(key, vars = {}) {
  let value = catalog[key];
  if (value == null) {
    missingKeys.add(`${activeLocale}:${key}`);
    value = fallback[key] ?? key;
  }
  return String(value).replace(/\{([\w.-]+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}

export async function setLocale(locale) {
  const resolved = catalogLoaders[locale] ? locale : 'en-US';
  const [next, english] = await Promise.all([catalogLoaders[resolved](), catalogLoaders['en-US']()]);
  catalog = next.default;
  fallback = english.default;
  activeLocale = resolved;
  document.documentElement.lang = resolved;
  document.documentElement.dir = resolved === 'ar-SA' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-attr]').forEach((node) => {
    for (const pair of node.dataset.i18nAttr.split(';')) {
      const [attribute, key] = pair.split(':');
      if (attribute && key) node.setAttribute(attribute, t(key));
    }
  });
  return resolved;
}

export function currentLocale() { return activeLocale; }
