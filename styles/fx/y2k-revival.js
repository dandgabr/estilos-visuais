// Y2K Revival FX — Liquid chrome specular reflection shift & starburst twinkle
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  // Track pointer for specular reflections across buttons and cards
  const cards = stage.querySelectorAll('.card, .btn-primary');

  const onPointerMove = (e) => {
    const rect = stage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    stage.style.setProperty('--y2k-specular-x', `${x.toFixed(1)}%`);
    stage.style.setProperty('--y2k-specular-y', `${y.toFixed(1)}%`);
  };

  stage.addEventListener('pointermove', onPointerMove, { passive: true });

  // Add twinkling starbursts in corners
  const starburst = document.createElement('div');
  starburst.className = 'fx-y2k-starburst';
  starburst.setAttribute('aria-hidden', 'true');
  starburst.style.position = 'absolute';
  starburst.style.top = '12px';
  starburst.style.right = '24px';
  starburst.style.pointerEvents = 'none';
  starburst.style.fontSize = '1.2rem';
  starburst.style.color = '#00f0ff';
  starburst.textContent = '✦';
  starburst.style.filter = 'drop-shadow(0 0 6px #ff007f)';
  starburst.style.transition = 'transform 0.4s ease, opacity 0.4s ease';

  stage.style.position = 'relative';
  stage.appendChild(starburst);

  let twinkleTimer = setInterval(() => {
    starburst.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
    starburst.style.transform = `scale(${0.8 + Math.random() * 0.5}) rotate(${Math.random() * 45}deg)`;
  }, 600);

  return () => {
    stage.removeEventListener('pointermove', onPointerMove);
    clearInterval(twinkleTimer);
    if (starburst.parentNode) starburst.parentNode.removeChild(starburst);
    stage.style.removeProperty('--y2k-specular-x');
    stage.style.removeProperty('--y2k-specular-y');
  };
}
