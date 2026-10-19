// Revela etapas (seções) com IntersectionObserver, barra de progresso e pontos de navegação.
export default function mount(stage) {
  const sections = [...stage.querySelectorAll('#view-painel > section')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let wheelUntil = 0, wheelDelta = 0, lastWheel = 0;
  const bar = document.createElement('div'); bar.className = 'fx-st-bar'; bar.setAttribute('aria-hidden', 'true');
  const fill = document.createElement('b'); bar.append(fill);
  const dotsWrap = document.createElement('div'); dotsWrap.className = 'fx-st-dots'; dotsWrap.setAttribute('aria-hidden', 'true');
  const ol = document.createElement('ol'); dotsWrap.append(ol);
  const dots = sections.map(() => { const li = document.createElement('li'); ol.append(li); return li; });
  const app = stage.querySelector('.app');
  const topbar = app.querySelector('.topbar');
  const previousHeight = stage.style.getPropertyValue('--story-scene-height');
  const previousOffset = stage.style.getPropertyValue('--story-header-offset');
  const sizeScenes = () => {
    wheelUntil=0;wheelDelta=0;lastWheel=0;
    const appTop = app.getBoundingClientRect().top - stage.getBoundingClientRect().top + stage.scrollTop;
    const offset = appTop + parseFloat(getComputedStyle(app).paddingTop || 0)
      + topbar.offsetHeight + parseFloat(getComputedStyle(topbar).marginBottom || 0);
    stage.style.setProperty('--story-header-offset', `${Math.round(offset)}px`);
    stage.style.setProperty('--story-scene-height', `${Math.max(160,stage.clientHeight-offset)}px`);
  };
  const resize = new ResizeObserver(sizeScenes);
  resize.observe(stage);resize.observe(topbar);sizeScenes();
  stage.prepend(bar); app.prepend(dotsWrap);
  stage.dataset.fx = 'on';

  const setActive = (i) => { sections.forEach((s, k) => s.classList.toggle('is-active', k === i)); dots.forEach((d, k) => d.classList.toggle('on', k === i)); };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-in'); });
    let best = -1, bestR = 0;
    sections.forEach((s, k) => { const r = s.getBoundingClientRect(), sr = stage.getBoundingClientRect(); const mid = sr.top + sr.height / 2; if (r.top <= mid && r.bottom >= mid) best = k; });
    if (best >= 0) setActive(best);
  }, { root: stage, threshold: [0, .15, .4, .7] });
  sections.forEach((s) => io.observe(s));
  setActive(0);
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      fill.style.transform = `scaleX(${(stage.scrollTop / Math.max(1, stage.scrollHeight - stage.clientHeight)).toFixed(4)})`;
      const sr = stage.getBoundingClientRect(), mid = sr.top + sr.height / 2;
      sections.forEach((s, k) => { const r = s.getBoundingClientRect(); if (r.top <= mid && r.bottom >= mid && !s.classList.contains('is-active')) setActive(k); });
    });
  };
  stage.addEventListener('scroll', onScroll, { passive: true });
  const advance = (direction) => {
    if (stage.querySelector('#view-painel').hidden) return false;
    const viewport = stage.getBoundingClientRect();
    const offset = parseFloat(getComputedStyle(stage).scrollPaddingTop) || 0;
    const midpoint = viewport.top + offset + (stage.clientHeight-offset)/2;
    let index = sections.findIndex(section => {
      const r=section.getBoundingClientRect();return r.top<=midpoint && r.bottom>=midpoint;
    });
    if (index<0) index=0;
    const current=sections[index].getBoundingClientRect();
    // A tall scene must remain scrollable through all its fields and cards.
    if (direction>0 && current.bottom>viewport.bottom+2) return false;
    if (direction<0 && current.top<viewport.top+offset-2) return false;
    const target=sections[index+direction];
    if (!target) return false;
    stage.scrollTo({top:stage.scrollTop+target.getBoundingClientRect().top-viewport.top-offset,behavior:reduce.matches?'instant':'smooth'});
    return true;
  };
  const editable = target => target.closest('input,textarea,select,[contenteditable="true"],.table-wrap');
  const onWheel = event => {
    if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX)>Math.abs(event.deltaY)
        || editable(event.target) || stage.querySelector('#view-painel').hidden) return;
    const now=performance.now();
    if (now<wheelUntil) { event.preventDefault();return; }
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?stage.clientHeight:1);
    wheelDelta=now-lastWheel<160?wheelDelta+delta:delta;lastWheel=now;
    if (Math.abs(wheelDelta)<40) return;
    const direction=Math.sign(wheelDelta);wheelDelta=0;
    if (advance(direction)) { event.preventDefault();wheelUntil=now+650; }
  };
  const onKey = event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey
        || editable(event.target) || event.target.closest('button,a')) return;
    const direction=({PageDown:1,PageUp:-1,ArrowDown:1,ArrowUp:-1,' ':event.shiftKey?-1:1})[event.key];
    if (direction && advance(direction)) event.preventDefault();
  };
  stage.addEventListener('wheel',onWheel,{passive:false});
  stage.addEventListener('keydown',onKey);
  onScroll();
  return () => {
    io.disconnect(); stage.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf);
    stage.removeEventListener('wheel',onWheel);stage.removeEventListener('keydown',onKey);
    resize.disconnect();
    if (previousHeight) stage.style.setProperty('--story-scene-height',previousHeight);
    else stage.style.removeProperty('--story-scene-height');
    if (previousOffset) stage.style.setProperty('--story-header-offset',previousOffset);
    else stage.style.removeProperty('--story-header-offset');
    bar.remove(); dotsWrap.remove(); delete stage.dataset.fx;
    sections.forEach((s) => s.classList.remove('is-in', 'is-active'));
  };
}
