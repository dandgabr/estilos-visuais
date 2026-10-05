// Ripple em botões, hover magnético, feedback loading→sucesso no envio do formulário.
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
  const restore = new Map();

  const onDown = (e) => {
    const b = e.target.closest?.('.btn');
    if (!b || b.disabled || reduce.matches) return;
    const r = b.getBoundingClientRect(), d = Math.hypot(r.width, r.height) * 2;
    const s = document.createElement('span');
    s.className = 'fx-ripple'; s.setAttribute('aria-hidden', 'true');
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.append(s); later(() => s.remove(), 650);
  };
  const onMove = (e) => {
    if (reduce.matches || e.pointerType === 'touch') return;
    const b = e.target.closest?.('.actions .btn, .topbar .btn');
    if (!b || b.disabled) return;
    const r = b.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * .22, y = (e.clientY - (r.top + r.height / 2)) * .3;
    b.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
  };
  const onOut = (e) => { const b = e.target.closest?.('.btn'); if (b && !b.contains(e.relatedTarget)) b.style.transform = ''; };
  const onClick = (e) => {
    const b = e.target.closest?.('form .btn-primary');
    if (!b || b.dataset.state) return;
    const label = b.textContent; restore.set(b, label);
    b.dataset.state = 'loading'; b.textContent = 'Criando…'; b.setAttribute('aria-busy', 'true');
    later(() => { b.dataset.state = 'success'; b.textContent = 'Projeto criado'; b.removeAttribute('aria-busy'); }, 1000);
    later(() => reset(b), 2600);
  };
  const reset = (b) => { if (restore.has(b)) { b.textContent = restore.get(b); restore.delete(b); } delete b.dataset.state; b.removeAttribute('aria-busy'); };

  stage.addEventListener('pointerdown', onDown);
  stage.addEventListener('pointermove', onMove);
  stage.addEventListener('pointerout', onOut);
  stage.addEventListener('click', onClick);
  return () => {
    stage.removeEventListener('pointerdown', onDown); stage.removeEventListener('pointermove', onMove);
    stage.removeEventListener('pointerout', onOut); stage.removeEventListener('click', onClick);
    timers.forEach(clearTimeout); timers.clear();
    [...restore.keys()].forEach(reset);
    stage.querySelectorAll('.fx-ripple').forEach((n) => n.remove());
    stage.querySelectorAll('.btn').forEach((b) => (b.style.transform = ''));
  };
}
