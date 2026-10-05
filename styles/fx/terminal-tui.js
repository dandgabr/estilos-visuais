export default function mount(stage) {
  const h1 = stage.querySelector('.display');
  if (!h1) return () => {};
  const original = h1.textContent;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cursor = document.createElement('span');
  cursor.className = 'tui-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.style.pointerEvents = 'none';
  h1.setAttribute('aria-label', original);
  const text = document.createTextNode(reduce ? original : '');
  h1.textContent = '';
  h1.append(text, cursor);
  let i = 0, timer = null;
  if (!reduce) {
    const tick = () => {
      i++;
      text.data = original.slice(0, i);
      if (i < original.length) timer = setTimeout(tick, 38);
    };
    timer = setTimeout(tick, 250);
  }
  return () => {
    clearTimeout(timer);
    h1.textContent = original;
    h1.removeAttribute('aria-label');
  };
}
