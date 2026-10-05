import { STYLES } from './styles/registry.js';

const $ = (s) => document.querySelector(s);
const stage = $('#stage');
const list = $('#list');
let current = null;
let cleanup = null;
let link = null;

const store = {
  get() { try { return localStorage.getItem('estilo'); } catch { return null; } },
  set(v) { try { localStorage.setItem('estilo', v); } catch { /* ignora */ } },
};

function renderList(filter = '') {
  const q = filter.trim().toLowerCase();
  list.textContent = '';
  const groups = new Map();
  for (const s of STYLES) {
    if (q && !(s.name + ' ' + s.slug + ' ' + s.group).toLowerCase().includes(q)) continue;
    if (!groups.has(s.group)) groups.set(s.group, []);
    groups.get(s.group).push(s);
  }
  for (const [group, items] of groups) {
    const h = document.createElement('h2'); h.textContent = group; list.append(h);
    for (const s of items) {
      const a = document.createElement('a');
      a.href = '#' + s.slug; a.textContent = s.name; a.dataset.slug = s.slug;
      if (s.slug === current) a.setAttribute('aria-current', 'true');
      list.append(a);
    }
  }
  $('#count').textContent = `${STYLES.length} estilos`;
}

function loadCss(slug) {
  return new Promise((resolve) => {
    const next = document.createElement('link');
    next.rel = 'stylesheet'; next.href = `styles/${slug}.css`;
    next.onload = next.onerror = () => { link?.remove(); link = next; resolve(); };
    document.head.append(next);
  });
}

async function setStyle(slug) {
  const s = STYLES.find((x) => x.slug === slug) ?? STYLES[0];
  if (s.slug === current) return;
  try { cleanup?.(); } catch (e) { console.error(e); }
  cleanup = null; current = s.slug;
  await loadCss(s.slug);
  stage.dataset.style = s.slug;
  stage.scrollTop = 0;
  $('#cur-name').textContent = s.name;
  $('#cur-desc').textContent = s.desc;
  document.title = `${s.name} · Estilos Coacus`;
  list.querySelectorAll('a').forEach((a) => {
    if (a.dataset.slug === s.slug) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  list.querySelector(`a[data-slug="${s.slug}"]`)?.scrollIntoView({ block: 'nearest' });
  store.set(s.slug);
  if (s.fx) {
    try {
      const mod = await import(`./styles/fx/${s.slug}.js`);
      if (current === s.slug) cleanup = mod.default(stage) ?? null;
    } catch (e) { console.warn(`fx ${s.slug} indisponível`, e); }
  }
}

function go(delta) {
  const i = STYLES.findIndex((s) => s.slug === current);
  location.hash = STYLES[(i + delta + STYLES.length) % STYLES.length].slug;
}

$('#search').addEventListener('input', (e) => renderList(e.target.value));
$('#prev').onclick = () => go(-1);
$('#next').onclick = () => go(1);
$('#toggle').onclick = () => document.body.classList.toggle('gallery-open');
list.addEventListener('click', () => document.body.classList.remove('gallery-open'));
addEventListener('hashchange', () => setStyle(location.hash.slice(1)));
addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, select') || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowLeft') go(-1);
  if (e.key === 'ArrowRight') go(1);
});

// Diálogo do mockup
const modal = $('#modal');
$('#open-modal').onclick = () => modal.showModal();
$('#close-modal').onclick = $('#ok-modal').onclick = () => modal.close();

renderList();
setStyle(location.hash.slice(1) || store.get() || STYLES[0].slug);
