// Glassmorphism FX — Pointer specular tracking on frosted glass cards
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  const cards = stage.querySelectorAll('.card, .stat-card, .btn-primary');

  const onPointerMove = (e) => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (x >= -20 && x <= 120 && y >= -20 && y <= 120) {
        card.style.setProperty('--glass-specular-x', `${x.toFixed(1)}%`);
        card.style.setProperty('--glass-specular-y', `${y.toFixed(1)}%`);
      }
    });
  };

  stage.addEventListener('pointermove', onPointerMove, { passive: true });

  return () => {
    stage.removeEventListener('pointermove', onPointerMove);
    cards.forEach((card) => {
      card.style.removeProperty('--glass-specular-x');
      card.style.removeProperty('--glass-specular-y');
    });
  };
}
