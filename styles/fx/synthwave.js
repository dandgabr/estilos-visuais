// Synthwave FX — Neon perspective horizon grid pulse & neon glow
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  // Neon horizon grid at the bottom of the stage
  const grid = document.createElement('div');
  grid.className = 'fx-synthwave-grid';
  grid.setAttribute('aria-hidden', 'true');
  grid.style.position = 'absolute';
  grid.style.bottom = '0';
  grid.style.left = '0';
  grid.style.right = '0';
  grid.style.height = '140px';
  grid.style.pointerEvents = 'none';
  grid.style.zIndex = '0';
  grid.style.opacity = '0.35';
  grid.style.background = `
    linear-gradient(180deg, transparent 0%, rgba(255, 0, 127, 0.4) 100%),
    repeating-linear-gradient(90deg, rgba(0, 240, 255, 0.4) 0 1px, transparent 1px 40px),
    repeating-linear-gradient(0deg, rgba(255, 0, 127, 0.4) 0 1px, transparent 1px 20px)
  `;
  grid.style.transform = 'perspective(200px) rotateX(60deg)';
  grid.style.transformOrigin = 'bottom center';
  grid.style.transition = 'opacity 0.6s ease';

  stage.style.position = 'relative';
  stage.insertBefore(grid, stage.firstChild);

  let pulse = 0;
  let rafId = null;

  const tick = () => {
    pulse += 0.03;
    const opacity = 0.25 + (Math.sin(pulse) * 0.12);
    grid.style.opacity = opacity.toFixed(3);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (grid.parentNode) grid.parentNode.removeChild(grid);
  };
}
