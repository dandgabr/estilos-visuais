// Efeito de metaballs interativo em canvas e física de fluidez orgânica
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  // Criar elemento canvas de fundo para metaballs orgânicos
  const canvas = document.createElement('canvas');
  canvas.className = 'fx-liquid-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.prepend(canvas);

  let width = 0, height = 0;
  const ctx = canvas.getContext('2d');
  let rafId = null;

  // Bolhas líquidas orgânicas
  const count = 12;
  const balls = [];
  const colors = [
    { r: 255, g: 94, b: 126 },   // #ff5e7e coral pink
    { r: 132, g: 94, b: 194 },   // #845ec2 royal purple
    { r: 214, g: 93, b: 177 },   // magenta
    { r: 0, g: 201, b: 167 },     // turquoise
  ];

  function resize() {
    width = canvas.width = stage.clientWidth;
    height = canvas.height = Math.max(stage.clientHeight, stage.scrollHeight);
  }
  resize();

  for (let i = 0; i < count; i++) {
    balls.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.8,
      vy: (Math.random() - 0.5) * 1.8,
      radius: 60 + Math.random() * 90,
      color: colors[i % colors.length],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03
    });
  }

  // Interação do cursor / ponteiro como gota líquida
  const pointer = { x: -1000, y: -1000, active: false, radius: 100 };
  const onPointerMove = (e) => {
    const rect = stage.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top + stage.scrollTop;
    pointer.active = true;
  };
  const onPointerLeave = () => { pointer.active = false; };

  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerleave', onPointerLeave);

  // Efeito de ondulação (ripple gelatinoso) nos cliques
  const onPointerDown = (e) => {
    if (reduce.matches) return;
    const rect = stage.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top + stage.scrollTop;

    // Adiciona uma bolha temporária expansiva e colorida no ponto de clique
    balls.push({
      x: clickX,
      y: clickY,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -1,
      radius: 20,
      maxRadius: 110,
      growth: 3.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      temporary: true,
      alpha: 0.8
    });
  };
  stage.addEventListener('pointerdown', onPointerDown);

  function loop() {
    if (reduce.matches) return;

    ctx.clearRect(0, 0, width, height);

    // Renderizar metaballs com gradientes radiais suaves e blend screen/lighter
    ctx.globalCompositeOperation = 'screen';

    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];

      if (b.temporary) {
        b.radius += b.growth;
        b.alpha -= 0.018;
        if (b.alpha <= 0 || b.radius >= b.maxRadius) {
          balls.splice(i, 1);
          continue;
        }
      } else {
        b.pulse += b.pulseSpeed;
        const currentR = b.radius + Math.sin(b.pulse) * 15;

        b.x += b.vx;
        b.y += b.vy;

        // Rebater nas bordas
        if (b.x - currentR < 0) { b.x = currentR; b.vx *= -1; }
        if (b.x + currentR > width) { b.x = width - currentR; b.vx *= -1; }
        if (b.y - currentR < 0) { b.y = currentR; b.vy *= -1; }
        if (b.y + currentR > height) { b.y = height - currentR; b.vy *= -1; }

        // Atração / repulsão com o ponteiro
        if (pointer.active) {
          const dx = pointer.x - b.x;
          const dy = pointer.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 220 && dist > 1) {
            const force = (220 - dist) / 220 * 0.6;
            b.x += (dx / dist) * force * 3;
            b.y += (dy / dist) * force * 3;
          }
        }
      }

      const alpha = b.temporary ? b.alpha : 0.45;
      const r = b.temporary ? b.radius : (b.radius + Math.sin(b.pulse) * 15);

      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
      grad.addColorStop(0, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);
      grad.addColorStop(0.65, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    rafId = requestAnimationFrame(loop);
  }

  if (!reduce.matches) {
    rafId = requestAnimationFrame(loop);
  }

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(stage);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    stage.removeEventListener('pointermove', onPointerMove);
    stage.removeEventListener('pointerleave', onPointerLeave);
    stage.removeEventListener('pointerdown', onPointerDown);
    resizeObserver.disconnect();
    canvas.remove();
  };
}
