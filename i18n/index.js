const catalogLoaders = {
  'pt-BR': () => import('./locales/pt-BR.js'),
  'en-US': () => import('./locales/en-US.js'),
  'es-ES': () => import('./locales/es-ES.js'),
  'fr-FR': () => import('./locales/fr-FR.js'),
  'de-DE': () => import('./locales/de-DE.js'),
  'ru-RU': () => import('./locales/ru-RU.js'),
  'ar-SA': () => import('./locales/ar-SA.js'),
  'hi-IN': () => import('./locales/hi-IN.js'),
  'zh-CN': () => import('./locales/zh-CN.js'),
  'ja-JP': () => import('./locales/ja-JP.js'),
  'ko-KR': () => import('./locales/ko-KR.js'),
};

const aliases = new Map([
  ['pt', 'pt-BR'], ['en', 'en-US'], ['es', 'es-ES'], ['fr', 'fr-FR'], ['de', 'de-DE'],
  ['ru', 'ru-RU'], ['ar', 'ar-SA'], ['hi', 'hi-IN'], ['zh', 'zh-CN'], ['zh-Hans', 'zh-CN'],
  ['ja', 'ja-JP'], ['ko', 'ko-KR'],
]);
let catalog = {};
let fallback = {};
let staticStrings = {};
let styleDescriptions = {};
let activeLocale = 'en-US';
export const missingKeys = new Set();
const textSources = new WeakMap();
const attrSources = new WeakMap();

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
    const alias = aliases.get(tag) ?? aliases.get(tag.split('-')[0].toLowerCase());
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
  catalog = next.default.keys ?? next.default;
  fallback = english.default.keys ?? english.default;
  staticStrings = next.default.strings ?? {};
  styleDescriptions = next.default.styleDescriptions ?? {};
  activeLocale = resolved;
  document.documentElement.lang = resolved;
  document.documentElement.dir = resolved === 'ar-SA' ? 'rtl' : 'ltr';
  applyStaticTranslations();
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-attr]').forEach((node) => {
    for (const pair of node.dataset.i18nAttr.split(';')) {
      const [attribute, key] = pair.split(':');
      if (attribute && key) node.setAttribute(attribute, t(key));
    }
  });
  return resolved;
}

function applyStaticTranslations() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('script, style, [data-i18n]')) continue;
    if (!textSources.has(node)) textSources.set(node, node.nodeValue);
    const source = textSources.get(node);
    const trimmed = source.trim();
    if (!trimmed || staticStrings[trimmed] == null) continue;
    const start = source.match(/^\s*/)?.[0] ?? '';
    const end = source.match(/\s*$/)?.[0] ?? '';
    node.nodeValue = `${start}${staticStrings[trimmed]}${end}`;
  }
  document.querySelectorAll('*').forEach((element) => {
    const explicit = new Set((element.dataset.i18nAttr ?? '').split(';').map((entry) => entry.split(':')[0]));
    const candidates = ['placeholder', 'title', 'aria-label', 'alt', ...[...element.attributes].map((attribute) => attribute.name).filter((name) => name.startsWith('data-label-'))];
    for (const name of candidates) {
      if (explicit.has(name) || !element.hasAttribute(name)) continue;
      let sources = attrSources.get(element);
      if (!sources) { sources = new Map(); attrSources.set(element, sources); }
      if (!sources.has(name)) sources.set(name, element.getAttribute(name));
      const source = sources.get(name);
      if (staticStrings[source] != null) element.setAttribute(name, staticStrings[source]);
    }
  });
}

export function currentLocale() { return activeLocale; }
export function localizedStyleDescription(slug, fallbackDescription) {
  return styleDescriptions[slug] ?? fallbackDescription;
}
export function localizedString(value) {
  return staticStrings[value] ?? value;
}
