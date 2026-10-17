// Atompunk FX — Geiger counter needle oscillation & cathode phosphor hum
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  // CRT phosphor scanline vignette overlay
  const crtOverlay = document.createElement('div');
  crtOverlay.className = 'fx-atompunk-crt';
  crtOverlay.setAttribute('aria-hidden', 'true');
  crtOverlay.style.position = 'absolute';
  crtOverlay.style.inset = '0';
  crtOverlay.style.pointerEvents = 'none';
  crtOverlay.style.zIndex = '2';
  crtOverlay.style.background = `
    radial-gradient(circle at 50% 50%, rgba(39, 255, 72, 0.05) 0%, rgba(6, 20, 10, 0.4) 100%),
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0 1px, transparent 1px 2px)
  `;
  crtOverlay.style.opacity = '0.7';

  // Geiger indicator needle in a stat badge or header
  const target = stage.querySelector('.stat-card') || stage.querySelector('.card');
  let geigerBox = null;
  let timer = null;

  if (target) {
    geigerBox = document.createElement('div');
    geigerBox.className = 'fx-atompunk-geiger';
    geigerBox.setAttribute('aria-hidden', 'true');
    geigerBox.style.display = 'inline-flex';
    geigerBox.style.alignItems = 'center';
    geigerBox.style.padding = '2px 8px';
    geigerBox.style.marginLeft = '10px';
    geigerBox.style.background = '#06140a';
    geigerBox.style.border = '1px solid #27ff48';
    geigerBox.style.color = '#27ff48';
    geigerBox.style.fontFamily = "'Share Tech Mono', monospace";
    geigerBox.style.fontSize = '0.75rem';
    geigerBox.style.boxShadow = '0 0 6px rgba(39, 255, 72, 0.3)';

    const label = document.createElement('span');
    label.textContent = 'RAD: ';
    const value = document.createElement('span');
    value.textContent = '0.14 µSv/h';

    geigerBox.appendChild(label);
    geigerBox.appendChild(value);

    const header = target.querySelector('.stat-label') || target.querySelector('h3') || target;
    header.appendChild(geigerBox);

    timer = setInterval(() => {
      // Stochastic radiation count fluctuations
      const rad = (0.12 + Math.random() * 0.08).toFixed(2);
      value.textContent = `${rad} µSv/h`;
    }, 450);
  }

  stage.style.position = 'relative';
  stage.appendChild(crtOverlay);

  return () => {
    if (timer) clearInterval(timer);
    if (crtOverlay.parentNode) crtOverlay.parentNode.removeChild(crtOverlay);
    if (geigerBox && geigerBox.parentNode) geigerBox.parentNode.removeChild(geigerBox);
  };
}
