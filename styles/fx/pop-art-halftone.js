// Pop Art Halftone FX — Interactive Ben-Day dot registration shift & dynamic screening
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  const targets = stage.querySelectorAll('.card, .stat-card, .btn-primary, .hero');

  const onPointerMove = (e) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 8;
    const normY = (e.clientY / window.innerHeight - 0.5) * 8;

    targets.forEach((el) => {
      el.style.setProperty('--bended-shift-x', `${normX.toFixed(1)}px`);
      el.style.setProperty('--bended-shift-y', `${normY.toFixed(1)}px`);
    });
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  return () => {
    window.removeEventListener('pointermove', onPointerMove);
    targets.forEach((el) => {
      el.style.removeProperty('--bended-shift-x');
      el.style.removeProperty('--bended-shift-y');
    });
  };
}
