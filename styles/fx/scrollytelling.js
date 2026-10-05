// Revela etapas (seções) com IntersectionObserver, barra de progresso e pontos de navegação.
export default function mount(stage) {
  const sections = [...stage.querySelectorAll('main > section')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const bar = document.createElement('div'); bar.className = 'fx-st-bar'; bar.setAttribute('aria-hidden', 'true');
  const fill = document.createElement('b'); bar.append(fill);
  const dotsWrap = document.createElement('div'); dotsWrap.className = 'fx-st-dots'; dotsWrap.setAttribute('aria-hidden', 'true');
  const ol = document.createElement('ol'); dotsWrap.append(ol);
  const dots = sections.map(() => { const li = document.createElement('li'); ol.append(li); return li; });
  const app = stage.querySelector('.app');
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
  onScroll();
  return () => {
    io.disconnect(); stage.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf);
    bar.remove(); dotsWrap.remove(); delete stage.dataset.fx;
    sections.forEach((s) => s.classList.remove('is-in', 'is-active'));
  };
}
