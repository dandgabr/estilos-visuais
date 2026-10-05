// Camadas fixas deslocadas pelo scroll e pelo ponteiro em velocidades diferentes (profundidade 2.5D).
export default function mount(stage) {
  const root = document.createElement('div');
  root.className = 'fx-px'; root.setAttribute('aria-hidden', 'true');
  const layers = [
    ['stars', .06, .04],
    ['sun', .12, .06],
    ['cloud', .22, .14],
    ['cloud c2', .28, .18],
    ['m1', .45, .15],
    ['m2', .65, .22],
    ['m3', .85, .32]
  ].map(([cls, speedY, speedX]) => {
    const el = document.createElement('i'); el.className = cls; root.append(el);
    return { el, speedY, speedX, top: cls.startsWith('cloud') ? (cls === 'cloud' ? 20 : 10) : null };
  });
  layers.forEach((l) => { if (l.top != null) l.el.style.top = l.top + '%'; });
  stage.prepend(root);

  const hero = stage.querySelector('.hero');
  const cards = [...stage.querySelectorAll('.card, .panel')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let pointerX = 0, pointerY = 0, curPointerX = 0, curPointerY = 0;
  let time = 0;
  let raf = 0;

  const onPointerMove = (e) => {
    if (reduce.matches) return;
    const r = stage.getBoundingClientRect();
    pointerX = (e.clientX - (r.left + r.width / 2)) * 0.25;
    pointerY = (e.clientY - (r.top + r.height / 2)) * 0.25;
  };

  const apply = () => {
    if (reduce.matches) {
      layers.forEach((l) => (l.el.style.transform = ''));
      if (hero) { hero.style.transform = ''; hero.style.opacity = ''; }
      cards.forEach((c) => (c.style.transform = ''));
      return;
    }

    time += 0.015;
    curPointerX += (pointerX - curPointerX) * 0.08;
    curPointerY += (pointerY - curPointerY) * 0.08;

    const y = stage.scrollTop;
    layers.forEach((l) => {
      const scrollOffset = -y * l.speedY;
      // Deriva suave autônoma para nuvens
      const driftX = l.el.className.includes('cloud') ? Math.sin(time + l.speedX * 10) * 18 : 0;
      const mouseOffsetX = -curPointerX * l.speedX * 4 + driftX;
      const mouseOffsetY = -curPointerY * l.speedX * 2.5;
      l.el.style.transform = `translate3d(${mouseOffsetX.toFixed(1)}px,${(scrollOffset + mouseOffsetY).toFixed(1)}px,0)`;
    });

    if (hero) {
      hero.style.transform = `translate3d(${(curPointerX * 0.25).toFixed(1)}px,${(y * .18 + curPointerY * 0.25).toFixed(1)}px,0)`;
    }

    raf = requestAnimationFrame(apply);
  };

  stage.addEventListener('pointermove', onPointerMove, { passive: true });
  reduce.addEventListener('change', () => {
    if (reduce.matches && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      apply();
    } else if (!reduce.matches && !raf) {
      raf = requestAnimationFrame(apply);
    }
  });
  raf = requestAnimationFrame(apply);

  return () => {
    stage.removeEventListener('pointermove', onPointerMove);
    if (raf) cancelAnimationFrame(raf);
    root.remove();
    if (hero) { hero.style.transform = ''; hero.style.opacity = ''; }
    cards.forEach((c) => (c.style.transform = ''));
  };
}
