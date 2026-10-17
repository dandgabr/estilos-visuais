// Steampunk FX — Analog pressure needle mechanical flutter & valve oscillation
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  // Inject pressure needle into the first stat card or header
  const statCard = stage.querySelector('.stat-card') || stage.querySelector('.card');
  if (!statCard) return () => {};

  const gauge = document.createElement('div');
  gauge.className = 'fx-steampunk-manometer';
  gauge.setAttribute('aria-hidden', 'true');
  gauge.style.display = 'inline-flex';
  gauge.style.alignItems = 'center';
  gauge.style.justifyContent = 'center';
  gauge.style.width = '38px';
  gauge.style.height = '38px';
  gauge.style.borderRadius = '50%';
  gauge.style.border = '2px solid #b5893a';
  gauge.style.background = 'radial-gradient(circle, #efe3c8 0%, #d2a95a 100%)';
  gauge.style.boxShadow = 'inset 0 0 5px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)';
  gauge.style.position = 'relative';
  gauge.style.marginLeft = '10px';
  gauge.style.verticalAlign = 'middle';

  const needle = document.createElement('div');
  needle.style.position = 'absolute';
  needle.style.bottom = '50%';
  needle.style.left = 'calc(50% - 1px)';
  needle.style.width = '2px';
  needle.style.height = '14px';
  needle.style.background = '#8b0a1a';
  needle.style.transformOrigin = '50% 100%';
  needle.style.transform = 'rotate(-25deg)';
  needle.style.transition = 'transform 0.1s ease-out';

  const pivot = document.createElement('div');
  pivot.style.position = 'absolute';
  pivot.style.width = '6px';
  pivot.style.height = '6px';
  pivot.style.borderRadius = '50%';
  pivot.style.background = '#2b1d12';

  gauge.appendChild(needle);
  gauge.appendChild(pivot);

  const header = statCard.querySelector('.stat-label') || statCard.querySelector('h3') || statCard;
  header.appendChild(gauge);

  let timer = setInterval(() => {
    // Subtle physical pressure jitter: -30deg to +35deg
    const jitter = -25 + (Math.random() * 45);
    needle.style.transform = `rotate(${jitter.toFixed(1)}deg)`;
  }, 180);

  return () => {
    clearInterval(timer);
    if (gauge.parentNode) gauge.parentNode.removeChild(gauge);
  };
}
