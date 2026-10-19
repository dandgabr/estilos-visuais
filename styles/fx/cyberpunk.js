// Cyberpunk FX — Tactical HUD reticle tracking & CRT scanline shimmer
export default function mount(stage, { variantId = 'default', colors = {} } = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};
  const palette = getComputedStyle(stage);
  const accent = variantId === 'default' ? '#00f0ff' : (colors['--cy'] || palette.getPropertyValue('--cy').trim() || colors['--accent'] || '#ff2a8a');
  const scanline = variantId === 'default' ? 'rgba(0, 240, 255, 0.03)' : `color-mix(in srgb, ${accent} 4%, transparent)`;
  const warn = variantId === 'default' ? '#fcee0a' : (colors['--warn'] || palette.getPropertyValue('--warn').trim() || '#f5e642');

  // Scanlines overlay
  const scanlines = document.createElement('div');
  scanlines.className = 'fx-cyberpunk-scanlines';
  scanlines.setAttribute('aria-hidden', 'true');
  scanlines.style.position = 'absolute';
  scanlines.style.inset = '0';
  scanlines.style.pointerEvents = 'none';
  scanlines.style.zIndex = '1';
  scanlines.style.background = `repeating-linear-gradient(0deg, ${scanline} 0 1px, transparent 1px 3px)`;

  // HUD reticle tracking cursor within stage
  const reticle = document.createElement('div');
  reticle.className = 'fx-cyberpunk-reticle';
  reticle.setAttribute('aria-hidden', 'true');
  reticle.style.position = 'absolute';
  reticle.style.width = '24px';
  reticle.style.height = '24px';
  reticle.style.border = `1px solid ${accent}`;
  reticle.style.pointerEvents = 'none';
  reticle.style.zIndex = '3';
  reticle.style.transform = 'translate(-50%, -50%)';
  reticle.style.boxShadow = variantId === 'default' ? '0 0 8px rgba(0, 240, 255, 0.4)' : `0 0 8px color-mix(in srgb, ${accent} 40%, transparent)`;
  reticle.style.display = 'none';
  reticle.style.transition = 'opacity 0.2s ease';

  // Inner crosshair
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.top = 'calc(50% - 1.5px)';
  dot.style.left = 'calc(50% - 1.5px)';
  dot.style.width = '3px';
  dot.style.height = '3px';
  dot.style.background = warn;
  reticle.appendChild(dot);

  stage.style.position = 'relative';
  stage.appendChild(scanlines);
  stage.appendChild(reticle);

  const onPointerMove = (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    reticle.style.display = 'block';
    reticle.style.left = `${x}px`;
    reticle.style.top = `${y}px`;
  };

  const onPointerLeave = () => {
    reticle.style.display = 'none';
  };

  stage.addEventListener('pointermove', onPointerMove, { passive: true });
  stage.addEventListener('pointerleave', onPointerLeave, { passive: true });

  return () => {
    stage.removeEventListener('pointermove', onPointerMove);
    stage.removeEventListener('pointerleave', onPointerLeave);
    if (scanlines.parentNode) scanlines.parentNode.removeChild(scanlines);
    if (reticle.parentNode) reticle.parentNode.removeChild(reticle);
  };
}
