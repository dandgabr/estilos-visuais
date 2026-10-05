// Efeito lúdico e fofo: confetes pastéis, estrelinhas cintilantes e pop elástico nos cliques
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  const canvas = document.createElement('canvas');
  canvas.className = 'fx-kawaii-canvas';
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

  const confetti = [];
  const pastelColors = ['#ff8fab', '#ffb3c6', '#d8bbff', '#a0c4ff', '#ffd166', '#ffccd5'];

  // Gera partículas contínuas de estrelinhas, corações e bolhas flutuando
  for (let i = 0; i < 36; i++) {
    confetti.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.5 - Math.random() * 0.8, // sobe suavemente como balão
      size: 10 + Math.random() * 12,
      rotation: Math.random() * Math.PI * 2,
      color: pastelColors[i % pastelColors.length],
      type: i % 3 === 0 ? 'star' : (i % 3 === 1 ? 'heart' : 'bubble'),
      opacity: 0.6 + Math.random() * 0.35,
      bob: Math.random() * Math.PI * 2
    });
  }

  // Explosão alegre e elástica ao clicar
  const onClick = (e) => {
    if (reduce.matches) return;
    const r = stage.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.5;
      confetti.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 8 + Math.random() * 12,
        rotation: Math.random() * Math.PI * 2,
        color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
        type: Math.random() > 0.4 ? 'heart' : (Math.random() > 0.5 ? 'star' : 'bubble'),
        opacity: 0.95,
        gravity: 0.16,
        decay: 0.018,
        isTemp: true
      });
    }
  };

  stage.addEventListener('pointerdown', onClick, { capture: true });

  function drawStar(cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawHeart(x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, size * 0.3);
    ctx.bezierCurveTo(-size, -size * 0.5, -size * 0.5, -size, 0, -size * 0.4);
    ctx.bezierCurveTo(size * 0.5, -size, size, -size * 0.5, 0, size * 0.3);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    if (reduce.matches) return;

    ctx.clearRect(0, 0, width, height);

    for (let i = confetti.length - 1; i >= 0; i--) {
      const c = confetti[i];

      if (c.isTemp) {
        c.vy += c.gravity;
        c.x += c.vx;
        c.y += c.vy;
        c.opacity -= c.decay;
        if (c.opacity <= 0) {
          confetti.splice(i, 1);
          continue;
        }
      } else {
        c.bob += 0.03;
        c.x += c.vx + Math.sin(c.bob) * 0.6;
        c.y += c.vy;
        if (c.y < -20) {
          c.y = height + 20;
          c.x = Math.random() * width;
        }
      }

      if (c.type === 'star') {
        drawStar(c.x, c.y, 4, c.size, c.size * 0.45, c.color, c.opacity);
      } else if (c.type === 'heart') {
        drawHeart(c.x, c.y, c.size, c.color, c.opacity);
      } else {
        ctx.save();
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
    stage.removeEventListener('pointerdown', onClick, { capture: true });
    ro.disconnect();
    canvas.remove();
  };
}
