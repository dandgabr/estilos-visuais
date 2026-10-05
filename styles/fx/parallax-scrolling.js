// Camadas fixas deslocadas pelo scroll e pelo ponteiro em velocidades diferentes (profundidade 2.5D).
export default function mount(stage) {
  const root = document.createElement('div');
  root.className = 'fx-px'; root.setAttribute('aria-hidden', 'true');
  const layers = [['stars', .04, .02], ['sun', .08, .04], ['cloud', .14, .06], ['cloud c2', .2, .09], ['m1', .3, .12], ['m2', .45, .18], ['m3', .62, .25]].map(([cls, speedY, speedX]) => {
    const el = document.createElement('i'); el.className = cls; root.append(el);
    return { el, speedY, speedX, top: cls.startsWith('cloud') ? (cls === 'cloud' ? 22 : 12) : null };
  });
  layers.forEach((l) => { if (l.top != null) l.el.style.top = l.top + '%'; });
  stage.prepend(root);

  const hero = stage.querySelector('.hero');
  const cards = [...stage.querySelectorAll('.card, .panel')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let pointerX = 0, pointerY = 0, curPointerX = 0, curPointerY = 0;
  let raf = 0;

  const onPointerMove = (e) => {
    if (reduce.matches) return;
    const r = stage.getBoundingClientRect();
    pointerX = (e.clientX - (r.left + r.width / 2)) * 0.12;
    pointerY = (e.clientY - (r.top + r.height / 2)) * 0.12;
    if (!raf) raf = requestAnimationFrame(apply);
  };

  const apply = () => {
    raf = 0;
    if (reduce.matches) {
      layers.forEach((l) => (l.el.style.transform = ''));
      if (hero) { hero.style.transform = ''; hero.style.opacity = ''; }
      cards.forEach((c) => (c.style.transform = ''));
      return;
    }

    curPointerX += (pointerX - curPointerX) * 0.1;
    curPointerY += (pointerY - curPointerY) * 0.1;

    const y = stage.scrollTop, cap = stage.clientHeight * .5;
    layers.forEach((l) => {
      const scrollOffset = Math.max(-cap, -y * l.speedY);
      const mouseOffsetX = -curPointerX * l.speedX * 4;
      const mouseOffsetY = -curPointerY * l.speedX * 2;
      l.el.style.transform = `translate3d(${mouseOffsetX.toFixed(1)}px,${(scrollOffset + mouseOffsetY).toFixed(1)}px,0)`;
    });

    if (hero) {
      hero.style.transform = `translate3d(${(curPointerX * 0.2).toFixed(1)}px,${(y * .22 + curPointerY * 0.2).toFixed(1)}px,0)`;
    }

    if (Math.abs(pointerX - curPointerX) > 0.1 || Math.abs(pointerY - curPointerY) > 0.1) {
      raf = requestAnimationFrame(apply);
    }
  };

  const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
  stage.addEventListener('scroll', onScroll, { passive: true });
  stage.addEventListener('pointermove', onPointerMove, { passive: true });
  reduce.addEventListener('change', apply);
  apply();

  return () => {
    stage.removeEventListener('scroll', onScroll);
    stage.removeEventListener('pointermove', onPointerMove);
    reduce.removeEventListener('change', apply);
    cancelAnimationFrame(raf);
    root.remove();
    if (hero) { hero.style.transform = ''; hero.style.opacity = ''; }
    cards.forEach((c) => (c.style.transform = ''));
  };
}
