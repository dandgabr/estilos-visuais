import { STYLES } from './styles/registry.js';
import { resolveLocale, setLocale, t } from './i18n/index.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const stage = $('#stage');
const list = $('#list');
let currentStyle = null;
let currentView = 'painel';
let cleanup = null;
let link = null;
let styleLoadId = 0;

function skillUrl(slug) {
  if (!STYLES.some((style) => style.slug === slug)) return '';
  return `https://github.com/dandgabr/Coacus/blob/main/knowledge/skills/domains/design/ui-style-${slug}/SKILL.md`;
}

function appendSkillAction(popover, styleObj) {
  const description = popover?.description;
  if (!description || !skillUrl(styleObj.slug)) return;
  const link = document.createElement('a');
  link.id = 'style-skill-tour-link';
  link.href = skillUrl(styleObj.slug);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'driver-skill-action';
  link.textContent = t('skill.tourAction');
  link.setAttribute('aria-label', t('skill.tourActionLabel', { name: styleObj.name }));
  description.append(link);
}

const store = {
  getStyle() { try { return localStorage.getItem('estilo'); } catch { return null; } },
  setStyle(v) { try { localStorage.setItem('estilo', v); } catch { /* ignore */ } },
  hasSeenWelcomeTour() { try { return localStorage.getItem('coacus-welcome-tour') === 'true'; } catch { return false; } },
  setSeenWelcomeTour() { try { localStorage.setItem('coacus-welcome-tour', 'true'); } catch { /* ignore */ } },
  hasSeenStyleTour(slug) { try { return localStorage.getItem(`coacus-style-tour-${slug}`) === 'true'; } catch { return false; } },
  setSeenStyleTour(slug) { try { localStorage.setItem(`coacus-style-tour-${slug}`, 'true'); } catch { /* ignore */ } },
  isAutoTourEnabled() { try { return localStorage.getItem('coacus-auto-tour') !== 'false'; } catch { return true; } },
  setAutoTourEnabled(enabled) { try { localStorage.setItem('coacus-auto-tour', enabled ? 'true' : 'false'); } catch { /* ignore */ } },
  getLocale() { try { return localStorage.getItem('coacus-locale') || 'auto'; } catch { return 'auto'; } },
  setLocale(locale) { try { localStorage.setItem('coacus-locale', locale); } catch { /* session-only */ } },
};

// 1. Renderização da Lista Lateral de Estilos
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
    const h = document.createElement('h2');
    h.textContent = group;
    list.append(h);
    for (const s of items) {
      const a = document.createElement('a');
      a.href = '#' + s.slug + (currentView !== 'painel' ? '/' + currentView : '');
      a.textContent = s.name;
      a.dataset.slug = s.slug;
      if (s.slug === currentStyle) a.setAttribute('aria-current', 'true');
      list.append(a);
    }
  }
  $('#count').textContent = t('gallery.count', { count: STYLES.length });
}

// 2. Carregador Dinâmico de CSS com Troca Segura
function loadCss(slug, loadId) {
  return new Promise((resolve) => {
    const next = document.createElement('link');
    next.rel = 'stylesheet';
    next.href = `styles/${slug}.css${new URL(import.meta.url).search}`;
    next.onload = next.onerror = () => {
      if (loadId !== styleLoadId) {
        next.remove();
        resolve();
        return;
      }
      link?.remove();
      link = next;
      resolve();
    };
    document.head.append(next);
  });
}

// 3. Controle das 4 Abas Demonstrativas (WAI-ARIA)
function setView(viewId, updateHash = true) {
  const validViews = ['painel', 'projetos', 'equipe', 'relatorios'];
  if (!validViews.includes(viewId)) viewId = 'painel';
  currentView = viewId;

  // Atualiza estado das abas
  $$('.nav-tab').forEach((tab) => {
    const isActive = tab.dataset.view === viewId;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Alterna painéis
  $$('.view-pane').forEach((pane) => {
    const isTarget = pane.id === `view-${viewId}`;
    pane.hidden = !isTarget;
    pane.classList.toggle('is-active', isTarget);
  });

  if (updateHash && currentStyle) {
    const targetHash = viewId === 'painel' ? `#${currentStyle}` : `#${currentStyle}/${viewId}`;
    if (location.hash !== targetHash) {
      history.replaceState(null, '', targetHash);
    }
  }
}

// 4. Aplicação de Estilo Visual com Lifecycle Teardown
async function setStyle(slug, viewParam = null) {
  const s = STYLES.find((x) => x.slug === slug) ?? STYLES[0];
  const targetView = viewParam || currentView || 'painel';

  if (s.slug === currentStyle) {
    setView(targetView, false);
    return;
  }

  // Teardown de efeitos anteriores (garantia de zero memory-leaks)
  try {
    cleanup?.();
  } catch (e) {
    console.error('Erro no cleanup de FX anterior:', e);
  }
  cleanup = null;
  currentStyle = s.slug;
  const loadId = ++styleLoadId;

  // Carrega CSS
  await loadCss(s.slug, loadId);
  if (loadId !== styleLoadId) return;
  stage.dataset.style = s.slug;
  stage.scrollTop = 0;

  // Metadados no cabeçalho
  $('#cur-name').textContent = s.name;
  $('#cur-desc').textContent = s.desc;
  const skillLink = $('#style-skill-link');
  skillLink.href = skillUrl(s.slug);
  skillLink.setAttribute('aria-label', t('skill.open', { name: s.name }));
  skillLink.title = t('skill.title', { name: s.name });
  document.title = `${s.name} · Estilos Coacus`;

  // Atualiza seleção na galeria
  list.querySelectorAll('a').forEach((a) => {
    if (a.dataset.slug === s.slug) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
  list.querySelector(`a[data-slug="${s.slug}"]`)?.scrollIntoView({ block: 'nearest' });
  store.setStyle(s.slug);

  // Aplica a visualização da aba
  setView(targetView, false);

  // Montagem de efeito FX dedicado
  if (s.fx) {
    try {
      const mod = await import(`./styles/fx/${s.slug}.js${new URL(import.meta.url).search}`);
      if (currentStyle === s.slug) {
        cleanup = mod.default(stage) ?? null;
      }
    } catch (e) {
      console.warn(`Módulo FX de ${s.slug} indisponível`, e);
    }
  }

  // Tour guiado contextual do estilo (apenas na 1ª visita ou sob demanda, se ativado)
  if (store.isAutoTourEnabled() && !store.hasSeenStyleTour(s.slug) && store.hasSeenWelcomeTour()) {
    triggerStyleTour(s);
  }
}

// 5. Navegação Anterior / Próximo
function go(delta) {
  const i = STYLES.findIndex((s) => s.slug === currentStyle);
  const nextStyle = STYLES[(i + delta + STYLES.length) % STYLES.length];
  location.hash = nextStyle.slug + (currentView !== 'painel' ? '/' + currentView : '');
}

// 6. Roteador de Hash Suportando Deep-Link (#estilo/aba)
function handleHashChange() {
  const raw = location.hash.slice(1);
  if (!raw) {
    setStyle(store.getStyle() || STYLES[0].slug, 'painel');
    return;
  }
  const parts = raw.split('/');
  const slug = parts[0];
  const view = parts[1] || 'painel';
  setStyle(slug, view);
}

// 7. Integração Driver.js: Tours e Onboarding
function getDriverInstance(options = {}) {
  if (!window.driver?.js?.driver) return null;
  return window.driver.js.driver({
    showProgress: true,
    animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    allowClose: true,
    doneBtnText: 'Concluir',
    nextBtnText: 'Próximo →',
    prevBtnText: '← Anterior',
    ...options,
  });
}

function startWelcomeTour() {
  const driverObj = getDriverInstance();
  if (!driverObj) return;

  driverObj.setSteps([
    {
      element: '#gallery',
      popover: {
        title: t('tour.galleryTitle'),
        description: t('tour.galleryDescription'),
        side: 'right',
        align: 'start',
      },
    },
    {
      element: '.stage-bar',
      popover: {
        title: t('tour.barTitle'),
        description: t('tour.barDescription'),
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '.topbar .nav',
      popover: {
        title: t('tour.viewsTitle'),
        description: t('tour.viewsDescription'),
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '#style-skill-link',
      popover: {
        title: t('skill.tourTitle'),
        description: t('skill.tourDescription'),
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '#stage',
      popover: {
        title: t('tour.stageTitle'),
        description: t('tour.stageDescription'),
        side: 'top',
        align: 'center',
      },
    },
    {
      element: '#tour-btn',
      popover: {
        title: t('tour.helpTitle'),
        description: t('tour.helpDescription'),
        side: 'bottom',
        align: 'end',
      },
    },
  ]);

  driverObj.drive();
  store.setSeenWelcomeTour();
}

function triggerStyleTour(styleObj) {
  const driverObj = getDriverInstance({
    showProgress: false,
    doneBtnText: 'Entendi',
  });
  if (!driverObj) return;

  driverObj.setSteps([
    {
      element: '.stage-title',
      popover: {
        title: t('tour.styleTitle', { name: styleObj.name }),
        description: t('tour.styleDescription', { description: styleObj.desc }),
        side: 'bottom',
        onPopoverRender: (popover) => appendSkillAction(popover, styleObj),
      },
    },
  ]);

  driverObj.drive();
  store.setSeenStyleTour(styleObj.slug);
}

// 8. Event Listeners & Controles Globais
$('#search').addEventListener('input', (e) => renderList(e.target.value));
$('#prev').onclick = () => go(-1);
$('#next').onclick = () => go(1);
$('#toggle').onclick = () => document.body.classList.toggle('gallery-open');
list.addEventListener('click', () => document.body.classList.remove('gallery-open'));

// Abas do Mockup (clique sem quebrar o hash)
$$('.nav-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    setView(tab.dataset.view, true);
  });
});

// Diálogo de Ajuda & Configuração de Tours
const helpDialog = $('#help-dialog');
const autoTourToggle = $('#auto-tour-toggle');

$('#tour-btn').onclick = () => {
  if (autoTourToggle) autoTourToggle.checked = store.isAutoTourEnabled();
  helpDialog?.showModal();
};

$('#close-help-btn')?.addEventListener('click', () => helpDialog?.close());
$('#dismiss-help-btn')?.addEventListener('click', () => helpDialog?.close());
$('#accept-help-btn')?.addEventListener('click', () => {
  if (autoTourToggle) store.setAutoTourEnabled(autoTourToggle.checked);
  helpDialog?.close();
});

$('#start-style-tour-btn')?.addEventListener('click', () => {
  helpDialog?.close();
  const current = STYLES.find((x) => x.slug === currentStyle) || STYLES[0];
  triggerStyleTour(current);
});

$('#start-welcome-tour-btn')?.addEventListener('click', () => {
  helpDialog?.close();
  startWelcomeTour();
});

// Roteador de Hash
addEventListener('hashchange', handleHashChange);

// Teclado
addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, select') || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowLeft') go(-1);
  if (e.key === 'ArrowRight') go(1);
});

// Diálogo Modal de Exemplo
const modal = $('#modal');
$('#open-modal').onclick = () => modal.showModal();
$('#close-modal').onclick = $('#ok-modal').onclick = () => modal.close();

// Inicialização
await setLocale(resolveLocale(store.getLocale(), navigator.languages));
renderList();
handleHashChange();
addEventListener('languagechange', async () => {
  if (store.getLocale() === 'auto') await setLocale(resolveLocale('auto', navigator.languages));
  renderList($('#search').value);
});

// Dispara onboarding se for a primeira visita do usuário
if (!store.hasSeenWelcomeTour()) {
  setTimeout(() => startWelcomeTour(), 600);
}
