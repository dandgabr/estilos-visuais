// Kinetic typography: divide o título em caracteres (revelação mascarada com stagger), faixa marquee decorativa e leve deslocamento por scroll.
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const h = stage.querySelector('.display');
  const hero = stage.querySelector('.hero');
  if (!h || !hero) return () => {};
  const original = h.innerHTML;
  const text = h.textContent.trim();
  h.setAttribute('aria-label', text);
  h.classList.add('kt-split');

  // quebra por palavras, preservando palavras inteiras na mesma linha
  h.textContent = '';
  let i = 0;
  text.split(/\s+/).forEach((w, wi, arr) => {
    const line = document.createElement('span'); line.className = 'kt-line'; line.setAttribute('aria-hidden', 'true');
    const word = document.createElement('span'); word.className = 'kt-word';
    for (const c of w) {
      const s = document.createElement('span'); s.className = 'kt-ch'; s.textContent = c; s.style.setProperty('--i', i++);
      word.append(s);
    }
    line.append(word); h.append(line);
  });

  const marquee = document.createElement('div');
  marquee.className = 'kt-marquee'; marquee.setAttribute('aria-hidden', 'true');
  const track = document.createElement('div'); track.className = 'kt-track';
  const phrase = ['Tipografia em movimento', '✦', 'Peso e largura variáveis', '✦', 'Coacus Studio', '✦'];
  for (let k = 0; k < 2; k++) phrase.forEach((p) => { const s = document.createElement('span'); s.textContent = p; track.append(s); });
  marquee.append(track);
  const actions = hero.querySelector('.actions');
  hero.insertBefore(marquee, actions ? actions.nextSibling : null);

  let raf = 0, t1 = 0;
  if (reduce.matches) h.classList.add('kt-in');
  else raf = requestAnimationFrame(() => { raf = requestAnimationFrame(() => h.classList.add('kt-in')); });

  // marquee reage à rolagem (velocidade da faixa) apenas com movimento permitido
  let lastY = stage.scrollTop;
  const onScroll = () => {
    if (reduce.matches) return;
    const d = Math.min(Math.abs(stage.scrollTop - lastY), 60); lastY = stage.scrollTop;
    track.style.animationDuration = Math.max(8, 22 - d / 4) + 's';
    clearTimeout(t1); t1 = setTimeout(() => { track.style.animationDuration = ''; }, 400);
  };
  stage.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    cancelAnimationFrame(raf); clearTimeout(t1);
    stage.removeEventListener('scroll', onScroll);
    marquee.remove();
    h.innerHTML = original;
    h.removeAttribute('aria-label');
    h.classList.remove('kt-split', 'kt-in');
  };
}
