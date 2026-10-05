// Efeito orgânico-biofílico: folhas e esporos flutuantes, respiração natural e ondulação tátil
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  const canvas = document.createElement('canvas');
  canvas.className = 'fx-bio-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0;
  let rafId = null;

  function resize() {
    width = canvas.width = stage.clientWidth;
    height = canvas.height = stage.clientHeight;
  }
  resize();

  // Partículas orgânicas: esporos de pólen e folhas flutuantes
  const particles = [];
  const count = 28;
  const leafColors = [
    'rgba(121, 152, 87, 0.45)', // verde folha
    'rgba(63, 107, 52, 0.35)',  // verde musgo profundo
    'rgba(231, 178, 74, 0.35)', // dourado pólen
    'rgba(193, 99, 58, 0.3)'    // terracota
  ];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.3 + Math.random() * 0.8,
      size: 4 + Math.random() * 12,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      color: leafColors[i % leafColors.length],
      isLeaf: i % 3 === 0,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.02 + Math.random() * 0.02
    });
  }

  // Interação do ponteiro (vento e dispersão suave)
  const pointer = { x: -1000, y: -1000, active: false };
  const onPointerMove = (e) => {
    const rect = stage.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top + stage.scrollTop;
    pointer.active = true;
  };
  const onPointerLeave = () => { pointer.active = false; };

  stage.addEventListener('pointermove', onPointerMove, { passive: true });
  stage.addEventListener('pointerleave', onPointerLeave);

  function drawLeaf(x, y, size, rot, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(size * 0.8, 0, 0, size);
    ctx.quadraticCurveTo(-size * 0.8, 0, 0, -size);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    if (reduce.matches) return;

    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.sway += p.swaySpeed;
      p.rotation += p.rotSpeed;
      p.x += p.vx + Math.sin(p.sway) * 0.9;
      p.y += p.vy;

      // Resposta ao vento provocado pelo cursor
      if (pointer.active) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180 && dist > 1) {
          const force = (180 - dist) / 180 * 1.5;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }
      }

      // Reiniciar no topo ao atingir o fundo
      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      if (p.isLeaf) {
        drawLeaf(p.x, p.y, p.size, p.rotation, p.color);
      } else {
        // Esporo sutil de luz/pólen
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafId = requestAnimationFrame(loop);
  }

  if (!reduce.matches) {
    rafId = requestAnimationFrame(loop);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(stage);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    stage.removeEventListener('pointermove', onPointerMove);
    stage.removeEventListener('pointerleave', onPointerLeave);
    ro.disconnect();
    canvas.remove();
  };
}
