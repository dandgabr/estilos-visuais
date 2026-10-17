// Psychedelic 60s FX — Liquid light show overhead projector wave oscillation
export default function mount(stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  let animationId = null;
  let angle = 0;

  const loop = () => {
    angle = (angle + 0.25) % 360;
    const shift = Math.sin(angle * (Math.PI / 180)) * 12;
    stage.style.setProperty('--psych-hue-shift', `${shift.toFixed(1)}deg`);
    animationId = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    if (animationId) cancelAnimationFrame(animationId);
    stage.style.removeProperty('--psych-hue-shift');
  };
}
