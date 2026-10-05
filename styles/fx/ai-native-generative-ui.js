// "Composição" progressiva: blocos aparecem como skeleton e são preenchidos em sequência, com texto em streaming.
export default function mount(stage) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
  const status = document.createElement('div');
  status.className = 'fx-gen-status'; status.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span'); label.textContent = 'Pensando…'; status.append(label);
  stage.prepend(status);

  const hero = stage.querySelector('.hero');
  const display = hero?.querySelector('.display'), lead = hero?.querySelector('.lead');
  const heroRest = hero ? [...hero.querySelectorAll('.eyebrow, .actions')] : [];
  const blocks = [...stage.querySelectorAll('main .card, main .panel, main .toast')];
  const originals = new Map();
  [display, lead].forEach((el) => el && originals.set(el, el.textContent));
  let done = 0; const total = blocks.length + 1;
  const finishOne = () => { done++; if (done >= total) { label.textContent = 'Pronto · ' + blocks.length + ' componentes'; status.classList.add('done'); later(() => status.remove(), 2500); } };

  blocks.forEach((b) => b.classList.add('fx-gen-pending'));
  heroRest.forEach((e) => (e.style.visibility = 'hidden'));
  [display, lead].forEach((el) => { if (el) { el.style.minHeight = el.offsetHeight + 'px'; el.textContent = ''; } });

  const stream = (el, text, wps, cb) => {
    const words = text.split(' '); let i = 0;
    el.classList.add('fx-gen-caret');
    (function step() {
      if (!el.isConnected) return;
      el.textContent = words.slice(0, ++i).join(' ');
      if (i < words.length) later(step, 1000 / wps); else { el.classList.remove('fx-gen-caret'); cb?.(); }
    })();
  };

  // Todos os blocos entram em sequência rápida (independente da rolagem): conteúdo completo em ~2,3 s.
  const revealAll = () => {
    blocks.forEach((b, i) => later(() => {
      if (!b.classList.contains('fx-gen-pending')) return;
      b.classList.remove('fx-gen-pending'); b.classList.add('fx-gen-in'); finishOne();
      label.textContent = 'Compondo componente ' + done + '/' + (total - 1) + '…';
    }, i * 130));
  };
  // Rede de segurança: se algo travar, nenhum conteúdo fica escondido.
  later(() => {
    display && (display.textContent = originals.get(display)); lead && (lead.textContent = originals.get(lead));
    [display, lead].forEach((el) => el?.classList.remove('fx-gen-caret'));
    heroRest.forEach((e) => (e.style.visibility = ''));
    blocks.forEach((b) => b.classList.remove('fx-gen-pending'));
    status.classList.add('done'); label.textContent = 'Pronto · ' + blocks.length + ' componentes';
  }, 2600);

  later(() => {
    label.textContent = 'Gerando interface…';
    const startBlocks = () => { heroRest.forEach((e) => { e.style.visibility = ''; e.classList.add('fx-gen-in'); }); revealAll(); finishOne(); };
    if (display && lead) stream(display, originals.get(display), 18, () => stream(lead, originals.get(lead), 50, startBlocks));
    else startBlocks();
  }, 150);

  return () => {
    timers.forEach(clearTimeout); timers.clear(); status.remove();
    originals.forEach((txt, el) => { el.style.minHeight = ''; el.textContent = txt; el.classList.remove('fx-gen-caret'); });
    heroRest.forEach((e) => { e.style.visibility = ''; e.classList.remove('fx-gen-in'); });
    blocks.forEach((b) => { b.classList.remove('fx-gen-pending', 'fx-gen-in'); delete b._q; });
  };
}
