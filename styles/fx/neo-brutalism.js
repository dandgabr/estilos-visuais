// Neo-Brutalism FX — Mechanical hard-shadow tactile displacement & sticker micro-tilts
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  const buttons = stage.querySelectorAll('.btn-primary, .btn-secondary, button');
  const cards = stage.querySelectorAll('.card');

  // Random micro-tilts on badges/tags for sticker look
  const badges = stage.querySelectorAll('.badge');
  const originalTransforms = new Map();

  badges.forEach((b, idx) => {
    originalTransforms.set(b, b.style.transform);
    const tilt = idx % 2 === 0 ? '-2deg' : '2.5deg';
    b.style.transform = `rotate(${tilt})`;
    b.style.display = 'inline-block';
    b.style.transition = 'transform 0.15s ease';
  });

  const onPointerDown = (e) => {
    const btn = e.target.closest('button, .btn-primary, .btn-secondary');
    if (btn) {
      btn.style.transform = 'translate(3px, 3px)';
      btn.style.boxShadow = '1px 1px 0 #000000';
    }
  };

  const onPointerUp = (e) => {
    const btn = e.target.closest('button, .btn-primary, .btn-secondary');
    if (btn) {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    }
  };

  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointerup', onPointerUp);

  return () => {
    stage.removeEventListener('pointerdown', onPointerDown);
    stage.removeEventListener('pointerup', onPointerUp);
    badges.forEach((b) => {
      b.style.transform = originalTransforms.get(b) || '';
    });
  };
}
