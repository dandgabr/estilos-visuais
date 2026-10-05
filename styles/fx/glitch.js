// Glitch: aplica data-text (cópias RGB via CSS), camadas scanline/tear decorativas e rajadas curtas e raras.
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const targets = [...stage.querySelectorAll('.display, .section-title, .kpi-value')];
  const prev = targets.map((el) => el.getAttribute('data-text'));
  targets.forEach((el) => el.setAttribute('data-text', el.textContent.trim()));

  const scan = document.createElement('div');
  scan.className = 'glx-scan'; scan.setAttribute('aria-hidden', 'true');
  const tear = document.createElement('div');
  tear.className = 'glx-tear'; tear.setAttribute('aria-hidden', 'true');
  stage.append(scan, tear);

  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
  const burst = (el) => {
    el.classList.add('is-glitching');
    later(() => el.classList.remove('is-glitching'), 300);
  };
  const onEnter = (e) => { if (!reduce.matches && e.currentTarget) burst(e.currentTarget); };
  targets.forEach((el) => el.addEventListener('mouseenter', onEnter));

  let alive = true;
  const loop = () => {
    if (!alive) return;
    if (!reduce.matches) {
      burst(targets[Math.floor(Math.random() * targets.length)]);
      tear.style.top = Math.random() * 90 + '%';
      tear.classList.remove('on'); void tear.offsetWidth; tear.classList.add('on');
    }
    later(loop, 2800 + Math.random() * 3500);
  };
  later(loop, 1200);

  return () => {
    alive = false;
    timers.forEach(clearTimeout); timers.clear();
    targets.forEach((el, i) => {
      el.removeEventListener('mouseenter', onEnter);
      el.classList.remove('is-glitching');
      if (prev[i] === null) el.removeAttribute('data-text'); else el.setAttribute('data-text', prev[i]);
    });
    scan.remove(); tear.remove();
  };
}
