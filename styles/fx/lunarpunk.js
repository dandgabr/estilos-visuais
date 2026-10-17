// Lunarpunk FX — Nocturnal bioluminescent starlight & firefly drift
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  const canvas = document.createElement('canvas');
  canvas.className = 'lunarpunk-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '0',
    opacity: '0.65',
  });

  const parent = stage.querySelector('.content') || stage;
  parent.style.position = 'relative';
  parent.insertBefore(canvas, parent.firstChild);

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let width = 0;
  let height = 0;

  const resize = () => {
    width = canvas.width = parent.clientWidth || stage.clientWidth || 800;
    height = canvas.height = parent.clientHeight || stage.clientHeight || 600;
  };
  resize();
  window.addEventListener('resize', resize);

  const numMotes = 24;
  const motes = Array.from({ length: numMotes }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.2 + 0.8,
    baseAlpha: Math.random() * 0.5 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: -Math.random() * 0.3 - 0.1, // gently floating upwards
    hue: Math.random() > 0.4 ? 160 : 205, // bioluminescent cyan / emerald green
  }));

  let time = 0;
  const loop = () => {
    time += 0.02;
    ctx.clearRect(0, 0, width, height);

    motes.forEach((m) => {
      m.x += m.speedX + Math.sin(time + m.phase) * 0.2;
      m.y += m.speedY;
      if (m.y < -10) m.y = height + 10;
      if (m.x < -10) m.x = width + 10;
      if (m.x > width + 10) m.x = -10;

      const alpha = m.baseAlpha * (0.6 + 0.4 * Math.sin(time * 1.5 + m.phase));
      const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius * 3);
      grad.addColorStop(0, `hsla(${m.hue}, 90%, 75%, ${alpha.toFixed(2)})`);
      grad.addColorStop(0.5, `hsla(${m.hue}, 80%, 55%, ${(alpha * 0.5).toFixed(2)})`);
      grad.addColorStop(1, `hsla(${m.hue}, 70%, 40%, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    });

    animationId = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}
