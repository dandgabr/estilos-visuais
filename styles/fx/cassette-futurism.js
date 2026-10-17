// Cassette Futurism FX — CRT scanline drift & tape reel rotation
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  // Inject scanline overlay
  const overlay = document.createElement('div');
  overlay.className = 'fx-cassette-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '2';
  overlay.style.background = 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 1px, transparent 1px 3px)';
  overlay.style.opacity = '0.6';

  stage.style.position = 'relative';
  stage.appendChild(overlay);

  // Animate tape reels on badges/meters if present
  const badges = stage.querySelectorAll('.badge, .stat-value');
  const reels = [];
  badges.forEach((el) => {
    const reel = document.createElement('span');
    reel.className = 'fx-cassette-reel';
    reel.setAttribute('aria-hidden', 'true');
    reel.textContent = ' ◓';
    reel.style.display = 'inline-block';
    reel.style.color = 'var(--accent, #d97706)';
    reel.style.fontSize = '0.85em';
    reel.style.marginLeft = '4px';
    el.appendChild(reel);
    reels.push(reel);
  });

  let angle = 0;
  let rafId = null;

  const tick = () => {
    angle = (angle + 1.5) % 360;
    reels.forEach((r) => {
      r.style.transform = `rotate(${angle}deg)`;
    });
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    reels.forEach((r) => {
      if (r.parentNode) r.parentNode.removeChild(r);
    });
  };
}
