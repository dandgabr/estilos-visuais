import { STYLES } from './styles/registry.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const stage = $('#stage');
const list = $('#list');
let currentStyle = null;
let currentView = 'painel';
let cleanup = null;
let link = null;

const store = {
  getStyle() { try { return localStorage.getItem('estilo'); } catch { return null; } },
  setStyle(v) { try { localStorage.setItem('estilo', v); } catch { /* ignore */ } },
  hasSeenWelcomeTour() { try { return localStorage.getItem('coacus-welcome-tour') === 'true'; } catch { return false; } },
  setSeenWelcomeTour() { try { localStorage.setItem('coacus-welcome-tour', 'true'); } catch { /* ignore */ } },
  hasSeenStyleTour(slug) { try { return localStorage.getItem(`coacus-style-tour-${slug}`) === 'true'; } catch { return false; } },
  setSeenStyleTour(slug) { try { localStorage.setItem(`coacus-style-tour-${slug}`, 'true'); } catch { /* ignore */ } },
  isAutoTourEnabled() { try { return localStorage.getItem('coacus-auto-tour') !== 'false'; } catch { return true; } },
  setAutoTourEnabled(enabled) { try { localStorage.setItem('coacus-auto-tour', enabled ? 'true' : 'false'); } catch { /* ignore */ } },
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
  $('#count').textContent = `${STYLES.length} estilos`;
}

// 2. Carregador Dinâmico de CSS com Troca Segura
function loadCss(slug) {
  return new Promise((resolve) => {
    const next = document.createElement('link');
    next.rel = 'stylesheet';
    next.href = `styles/${slug}.css`;
    next.onload = next.onerror = () => {
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

  // Carrega CSS
  await loadCss(s.slug);
  stage.dataset.style = s.slug;
  stage.scrollTop = 0;

  // Metadados no cabeçalho
  $('#cur-name').textContent = s.name;
  $('#cur-desc').textContent = s.desc;
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
      const mod = await import(`./styles/fx/${s.slug}.js`);
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
        title: '🏛️ Galeria de 82 Estilos',
        description: 'Explore o acervo completo organizado por famílias (Movimentos Históricos, Retrô, Punk, Minimalismos e Dark Themes). Use o campo de busca para encontrar estilos instantaneamente.',
        side: 'right',
        align: 'start',
      },
    },
    {
      element: '.stage-bar',
      popover: {
        title: '🎛️ Barra de Navegação',
        description: 'Alterne rapidamente com as setas do teclado (← / →), consulte a linhagem estética e abra o guia a qualquer momento.',
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '.topbar .nav',
      popover: {
        title: '📑 4 Visões Demonstrativas',
        description: 'Alterne entre Painel, Projetos, Equipe e Relatórios para avaliar como o estilo ativo trata formulários, quadros Kanban, avatares e tabelas densas com telemetria.',
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '#stage',
      popover: {
        title: '🎨 Palco Interativo',
        description: 'Cada componente adapta tipografia, física de materiais, contrastes WCAG 2.2 e shaders visuais específicos ao estilo selecionado.',
        side: 'top',
        align: 'center',
      },
    },
    {
      element: '#tour-btn',
      popover: {
        title: '💡 Ajuda e Recursos',
        description: 'Clique no botão "?" sempre que desejar rever este tour de introdução, ver a explicação do estilo em exibição ou ajustar a exibição automática de dicas.',
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
        title: `✨ Estilo: ${styleObj.name}`,
        description: `${styleObj.desc}. Este estilo aplica tokens de cor, tipografia e física de materiais autênticos ao seu período histórico.`,
        side: 'bottom',
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

if (autoTourToggle) {
  autoTourToggle.onchange = (e) => {
    store.setAutoTourEnabled(e.target.checked);
  };
}

$('#close-help-btn')?.addEventListener('click', () => helpDialog?.close());
$('#dismiss-help-btn')?.addEventListener('click', () => helpDialog?.close());

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
renderList();
handleHashChange();

// Dispara onboarding se for a primeira visita do usuário
if (!store.hasSeenWelcomeTour()) {
  setTimeout(() => startWelcomeTour(), 600);
}
