// Camadas fixas deslocadas pelo scroll do #stage em velocidades diferentes.
export default function mount(stage) {
  const root = document.createElement('div');
  root.className = 'fx-px'; root.setAttribute('aria-hidden', 'true');
  const layers = [['stars', .04], ['sun', .09], ['cloud', .14], ['cloud c2', .2], ['m1', .3], ['m2', .45], ['m3', .62]].map(([cls, speed]) => {
    const el = document.createElement('i'); el.className = cls; root.append(el);
    return { el, speed, top: cls.startsWith('cloud') ? (cls === 'cloud' ? 22 : 12) : null };
  });
  layers.forEach((l) => { if (l.top != null) l.el.style.top = l.top + '%'; });
  stage.prepend(root);
  const hero = stage.querySelector('.hero');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0;
  const apply = () => {
    raf = 0;
    if (reduce.matches) { layers.forEach((l) => (l.el.style.transform = '')); if (hero) { hero.style.transform = ''; hero.style.opacity = ''; } return; }
    const y = stage.scrollTop, cap = stage.clientHeight * .5;
    layers.forEach((l) => { l.el.style.transform = `translate3d(0,${Math.max(-cap, -y * l.speed).toFixed(1)}px,0)`; });
    if (hero) { hero.style.transform = `translate3d(0,${(y * .22).toFixed(1)}px,0)`; }
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
  stage.addEventListener('scroll', onScroll, { passive: true });
  reduce.addEventListener('change', apply);
  apply();
  return () => {
    stage.removeEventListener('scroll', onScroll); reduce.removeEventListener('change', apply);
    cancelAnimationFrame(raf); root.remove();
    if (hero) { hero.style.transform = ''; hero.style.opacity = ''; }
  };
}
