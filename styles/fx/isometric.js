// Efeito interativo isométrico: cubos flutuantes, grid 3D dinâmico e resposta à inclinação do cursor
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  const canvas = document.createElement('canvas');
  canvas.className = 'fx-iso-canvas';
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

  // Dimensões do bloco isométrico
  const isoAngle = Math.PI / 6; // 30 graus
  const cosA = Math.cos(isoAngle);
  const sinA = Math.sin(isoAngle);

  function toIso(x, y, z) {
    return {
      x: (x - y) * cosA + width / 2,
      y: (x + y) * sinA - z + height * 0.4
    };
  }

  // Lista de blocos/prismas flutuantes no espaço
  const blocks = [];
  const blockColors = [
    { top: '#7fd1ff', right: '#1d6aa8', left: '#2f8fd6' },
    { top: '#ffd37a', right: '#b87810', left: '#e9a02a' },
    { top: '#b4f0c8', right: '#2f8f5c', left: '#4fbf80' },
    { top: '#ff9fb2', right: '#a8344e', left: '#e0526f' }
  ];

  for (let i = 0; i < 22; i++) {
    blocks.push({
      gx: (Math.random() - 0.5) * 900,
      gy: (Math.random() - 0.5) * 800,
      baseZ: Math.random() * 260 - 80,
      size: 20 + Math.random() * 22,
      h: 24 + Math.random() * 36,
      phase: Math.random() * Math.PI * 2,
      speed: 0.015 + Math.random() * 0.02,
      colors: blockColors[i % blockColors.length]
    });
  }

  // Posição do cursor para paralaxe isométrica
  const pointer = { targetX: 0, targetY: 0, curX: 0, curY: 0 };
  const onPointerMove = (e) => {
    const r = stage.getBoundingClientRect();
    pointer.targetX = (e.clientX - (r.left + r.width / 2)) * 0.15;
    pointer.targetY = (e.clientY - (r.top + r.height / 2)) * 0.15;
  };
  stage.addEventListener('pointermove', onPointerMove, { passive: true });

  function drawPrism(x, y, z, s, h, colors) {
    const pTop = toIso(x, y, z + h);
    const pTopR = toIso(x + s, y, z + h);
    const pTopB = toIso(x + s, y + s, z + h);
    const pTopL = toIso(x, y + s, z + h);

    const pBotR = toIso(x + s, y, z);
    const pBotB = toIso(x + s, y + s, z);
    const pBotL = toIso(x, y + s, z);

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(18, 41, 74, 0.4)';

    // Face Esquerda
    ctx.fillStyle = colors.left;
    ctx.beginPath();
    ctx.moveTo(pTop.x, pTop.y);
    ctx.lineTo(pTopL.x, pTopL.y);
    ctx.lineTo(pBotL.x, pBotL.y);
    ctx.lineTo(toIso(x, y, z).x, toIso(x, y, z).y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Face Direita
    ctx.fillStyle = colors.right;
    ctx.beginPath();
    ctx.moveTo(pTopL.x, pTopL.y);
    ctx.lineTo(pTopB.x, pTopB.y);
    ctx.lineTo(pBotB.x, pBotB.y);
    ctx.lineTo(pBotL.x, pBotL.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Face Superior
    ctx.fillStyle = colors.top;
    ctx.beginPath();
    ctx.moveTo(pTop.x, pTop.y);
    ctx.lineTo(pTopR.x, pTopR.y);
    ctx.lineTo(pTopB.x, pTopB.y);
    ctx.lineTo(pTopL.x, pTopL.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function loop() {
    if (reduce.matches) return;

    ctx.clearRect(0, 0, width, height);

    // Suavização do cursor
    pointer.curX += (pointer.targetX - pointer.curX) * 0.08;
    pointer.curY += (pointer.targetY - pointer.curY) * 0.08;

    // Ordenar blocos por profundidade Y+X isométrica (painter's algorithm)
    const sorted = [...blocks].sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));

    ctx.save();
    ctx.translate(pointer.curX, pointer.curY);

    for (const b of sorted) {
      b.phase += b.speed;
      const floatZ = b.baseZ + Math.sin(b.phase) * 14;
      drawPrism(b.gx, b.gy, floatZ, b.size, b.h, b.colors);
    }

    ctx.restore();
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
    ro.disconnect();
    canvas.remove();
  };
}
