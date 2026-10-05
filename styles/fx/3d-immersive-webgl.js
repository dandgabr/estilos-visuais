// Cena Three.js: icosaedro wireframe + campo de partículas, câmera ligada ao scroll e ao ponteiro.
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js';

export default function mount(stage) {
  let disposed = false, raf = 0, io = null, ro = null, visible = true;
  const cleanups = [];
  const poster = document.createElement('div');
  poster.className = 'fx-3d-poster'; poster.setAttribute('aria-hidden', 'true');
  stage.prepend(poster);
  cleanups.push(() => poster.remove());

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  (async () => {
    let THREE;
    try {
      const c = document.createElement('canvas');
      if (!(c.getContext('webgl2') || c.getContext('webgl'))) throw new Error('sem WebGL');
      THREE = await import(THREE_URL);
    } catch (e) { console.warn('3D: fallback estático', e.message); return; }
    if (disposed) return;

    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch (e) { console.warn('3D: fallback estático', e.message); return; }
    const canvas = renderer.domElement;
    canvas.className = 'fx-3d-canvas'; canvas.setAttribute('aria-hidden', 'true');
    stage.prepend(canvas);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group(); scene.add(group);
    const geo = new THREE.IcosahedronGeometry(1.7, 1);
    const solid = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x1a1048, transparent: true, opacity: .55 }));
    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x8ff0ff, wireframe: true, transparent: true, opacity: .75 }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6, .012, 8, 120), new THREE.MeshBasicMaterial({ color: 0x7c5cff }));
    ring.rotation.x = 1.2;
    group.add(solid, wire, ring);
    group.position.set(1.8, .6, 0);

    const N = 600, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { pos[i*3] = (Math.random()-.5)*20; pos[i*3+1] = (Math.random()-.5)*14; pos[i*3+2] = (Math.random()-.5)*12 - 2; }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pm = new THREE.PointsMaterial({ color: 0xbfb4ff, size: .035, transparent: true, opacity: .8, depthWrite: false });
    const points = new THREE.Points(pg, pm); scene.add(points);

    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    let scrollP = 0, last = performance.now();

    const resize = () => {
      const w = stage.clientWidth, h = stage.clientHeight || 600;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      group.position.x = w < 700 ? 0 : 1.8; group.position.y = w < 700 ? 1.6 : .6;
      camera.updateProjectionMatrix(); render(0);
    };
    const onScroll = () => { scrollP = stage.scrollTop / Math.max(1, stage.scrollHeight - stage.clientHeight); if (reduce.matches || !visible) render(0); };
    const onMove = (e) => { const r = stage.getBoundingClientRect(); target.x = ((e.clientX - r.left) / r.width - .5) * 2; target.y = ((e.clientY - r.top) / r.height - .5) * 2; };

    function render(dt) {
      const k = 1 - Math.exp(-4 * dt);
      cur.x += (target.x - cur.x) * k; cur.y += (target.y - cur.y) * k;
      if (!reduce.matches) { group.rotation.y += dt * .25; group.rotation.x += dt * .08; ring.rotation.z += dt * .3; points.rotation.y += dt * .01; }
      camera.position.x = cur.x * .6; camera.position.y = -cur.y * .4 - scrollP * 3;
      camera.position.z = 7 - scrollP * 3.5;
      camera.lookAt(0, -scrollP * 2, 0);
      renderer.render(scene, camera);
    }
    function loop(t) {
      raf = 0;
      if (disposed || !visible || reduce.matches) return;
      const dt = Math.min(.05, (t - last) / 1000); last = t;
      render(dt); raf = requestAnimationFrame(loop);
    }
    const start = () => { if (!raf && visible && !reduce.matches && !disposed) { last = performance.now(); raf = requestAnimationFrame(loop); } };

    io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else { cancelAnimationFrame(raf); raf = 0; } });
    io.observe(stage);
    const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else start(); };
    const onLost = (e) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; };
    const onRestored = () => { start(); };
    const onRM = () => { if (reduce.matches) { cancelAnimationFrame(raf); raf = 0; render(0); } else start(); };
    ro = new ResizeObserver(resize); ro.observe(stage);
    stage.addEventListener('scroll', onScroll, { passive: true });
    stage.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    reduce.addEventListener('change', onRM);
    poster.style.display = 'none';
    resize(); start();

    cleanups.push(() => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      stage.removeEventListener('scroll', onScroll); stage.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis); reduce.removeEventListener('change', onRM);
      canvas.removeEventListener('webglcontextlost', onLost); canvas.removeEventListener('webglcontextrestored', onRestored);
      geo.dispose(); pg.dispose(); pm.dispose(); ring.geometry.dispose();
      [solid, wire, ring].forEach((m) => m.material.dispose());
      renderer.dispose(); renderer.forceContextLoss?.(); canvas.remove();
    });
  })();

  return () => { disposed = true; cleanups.forEach((f) => { try { f(); } catch {} }); };
}
