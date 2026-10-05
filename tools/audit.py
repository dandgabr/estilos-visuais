#!/usr/bin/env python3
"""Auditoria automática dos 62 estilos: console, overflow, contraste, foco, diálogo, reduced-motion.

Uso: python3 tools/audit.py [slug ...] [--port 8200] [--shots DIR] [--json out.json]
Sobe seu próprio http.server e usa um navegador isolado.
"""
import argparse, json, re, subprocess, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SLUGS = re.findall(r"\['([a-z0-9-]+)',\s*'", (ROOT / "styles/registry.js").read_text())

JS_CONTRAST = r"""
() => {
  const stage = document.querySelector('#stage');
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const lum = ({r,g,b}) => { const f = v => { v/=255; return v<=.03928? v/12.92 : Math.pow((v+.055)/1.055,2.4); }; return .2126*f(r)+.7152*f(g)+.0722*f(b); };
  const over = (top, bot) => { const a = top.a; return {r:top.r*a+bot.r*(1-a), g:top.g*a+bot.g*(1-a), b:top.b*a+bot.b*(1-a), a:1}; };
  const bgOf = (el) => {
    // percorre ancestrais acumulando camadas; se achar imagem/gradiente, marca incerto
    const layers = []; let uncertain = false;
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') uncertain = true;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
      if (n === stage) break;
    }
    let base = {r:255,g:255,b:255,a:1};
    for (let i = layers.length-1; i >= 0; i--) base = over(layers[i], base);
    return {c: base, uncertain};
  };
  const out = [];
  const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode; if (!t.nodeValue.trim()) continue;
    const el = t.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    if (el.closest('[aria-hidden="true"]')) continue;
    const fg = parse(cs.color); if (!fg) continue;
    const {c: bg, uncertain} = bgOf(el);
    // opacidade acumulada
    let op = 1; for (let n = el; n && n !== stage.parentElement; n = n.parentElement) op *= +getComputedStyle(n).opacity;
    const f = over({...fg, a: fg.a*op}, bg);
    const L1 = lum(f), L2 = lum(bg);
    const ratio = (Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    if (uncertain || ratio < need) {
      const idx = out.length; el.setAttribute('data-audit', idx);
      out.push({idx, text: t.nodeValue.trim().slice(0,30), tag: el.tagName.toLowerCase()+'.'+(el.className||'').toString().split(' ')[0], ratio: +ratio.toFixed(2), need, uncertain, fg: [fg.r,fg.g,fg.b,+(fg.a*op).toFixed(3)]});
    }
  }
  return out;
}
"""

JS_OVERFLOW = "() => { const s=document.querySelector('#stage'); return [s.scrollWidth, s.clientWidth]; }"

JS_FOCUS = r"""
() => {
  const res = [];
  for (const el of document.querySelectorAll('#stage .btn, #stage input[type=text], #stage select, #stage a[href]')) {
    el.focus({focusVisible: true});
    const cs = getComputedStyle(el);
    const ok = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none');
    if (!ok) res.push((el.className || el.tagName) + ': ' + el.textContent.trim().slice(0,20));
    el.blur();
  }
  return res;
}
"""


def lum(c):
    f = lambda v: (v/255/12.92) if v/255 <= .03928 else ((v/255+.055)/1.055) ** 2.4
    return .2126*f(c[0]) + .7152*f(c[1]) + .0722*f(c[2])


def refine(page, items):
    """Para itens com fundo incerto (imagem/gradiente), mede o contraste real por pixels com o texto oculto."""
    from PIL import Image
    import io
    out = []
    for it in items:
        if not it["uncertain"]:
            out.append(it); continue
        loc = page.locator(f'[data-audit="{it["idx"]}"]')
        try:
            loc.evaluate("e => { e.scrollIntoView({block:'center'}); e.dataset.auditColor = e.style.color; e.style.setProperty('color','transparent','important'); e.style.setProperty('text-shadow','none','important'); }")
            page.wait_for_timeout(60)
            box = loc.bounding_box()
            vp = page.viewport_size
            if not box or box["width"] < 2 or box["y"] < 0 or box["y"] + box["height"] > vp["height"] or box["x"] < 0:
                loc.evaluate("e => { e.style.removeProperty('color'); e.style.removeProperty('text-shadow'); if (e.dataset.auditColor) e.style.color = e.dataset.auditColor; }")
                continue
            img = Image.open(io.BytesIO(page.screenshot(clip={"x": box["x"], "y": box["y"], "width": min(box["width"], vp["width"] - box["x"]), "height": box["height"]}))).convert("RGB")
            loc.evaluate("e => { e.style.removeProperty('color'); e.style.removeProperty('text-shadow'); if (e.dataset.auditColor) e.style.color = e.dataset.auditColor; }")
            px = list(img.resize((min(img.width, 40), min(img.height, 12))).getdata())
            fr, fg_, fb, fa = it["fg"]
            ratios = []
            for (r, g, b) in px:
                f = (fr*fa + r*(1-fa), fg_*fa + g*(1-fa), fb*fa + b*(1-fa))
                L1, L2 = lum(f), lum((r, g, b))
                ratios.append((max(L1, L2) + .05) / (min(L1, L2) + .05))
            ratios.sort()
            worst = ratios[max(0, len(ratios)//10)]
            it = dict(it, ratio=round(worst, 2), measured="pixels")
            if worst < it["need"]:
                out.append(it)
        except Exception as e:
            out.append(dict(it, ratio=0, error=str(e)[:60]))
    return out


def focus_audit(page):
    """Navega com Tab e verifica se cada controle focado mostra indicador visível."""
    bad, seen = [], set()
    page.evaluate("document.querySelector('#stage').scrollTop=0")
    page.locator("#stage .brand").evaluate("e => e.focus()")
    for _ in range(40):
        page.keyboard.press("Tab")
        info = page.evaluate("""() => { const e=document.activeElement; if(!e||!e.closest('#stage')) return null; const cs=getComputedStyle(e);
          const ok=(cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>0)||(cs.boxShadow&&cs.boxShadow!=='none');
          return {key:e.outerHTML.slice(0,80), label:(e.className||e.tagName)+': '+(e.textContent||'').trim().slice(0,20), ok}; }""")
        if not info or info["key"] in seen:
            break
        seen.add(info["key"])
        if not info["ok"]:
            bad.append(info["label"])
    return bad


def audit(page, slug, port, shots):
    rep = {"slug": slug, "console": [], "overflow": {}, "contrast": {}, "focus": [], "dialog": None, "motion": None}
    page.on("console", lambda m: rep["console"].append(m.text[:160]) if m.type in ("error", "warning") and "GL Driver Message" not in m.text else None)
    page.on("pageerror", lambda e: rep["console"].append("pageerror: " + str(e)[:160]))
    for w, h in ((1280, 800), (375, 740)):
        page.set_viewport_size({"width": w, "height": h})
        page.goto(f"http://localhost:{port}/?x={w}#{slug}")
        page.reload()
        page.wait_for_function(f"document.querySelector('#stage').dataset.style === '{slug}'")
        page.wait_for_timeout(1500)
        sw, cw = page.evaluate(JS_OVERFLOW)
        rep["overflow"][w] = [sw, cw]
        # rola por toda a página para disparar revelações e medir contraste nas seções visíveis
        total = page.evaluate("document.querySelector('#stage').scrollHeight")
        for y in range(0, total, 600):
            page.evaluate(f"document.querySelector('#stage').scrollTop={y}")
            page.wait_for_timeout(120)
        page.wait_for_timeout(600)
        rep["contrast"][w] = refine(page, page.evaluate(JS_CONTRAST))
        page.evaluate("document.querySelector('#stage').scrollTop=0")
        page.wait_for_timeout(300)
        if shots:
            page.screenshot(path=str(Path(shots) / f"{slug}-{w}.png"))
            # tela cheia do stage a 1280 para revisão visual
            if w == 1280:
                page.evaluate("document.querySelector('#stage').scrollTop=1100")
                page.wait_for_timeout(500)
                page.screenshot(path=str(Path(shots) / f"{slug}-{w}-b.png"))
                page.evaluate("document.querySelector('#stage').scrollTop=0")
        if w == 1280:
            rep["focus"] = focus_audit(page)
            page.evaluate("document.querySelector('#open-modal').click()")
            page.wait_for_timeout(500)
            rep["dialog"] = page.evaluate("(()=>{const d=document.querySelector('#modal');const r=d.getBoundingClientRect();return {open:d.open,w:Math.round(r.width),h:Math.round(r.height),inView:r.left>=0&&r.right<=innerWidth}})()")
            if shots:
                page.screenshot(path=str(Path(shots) / f"{slug}-dialog.png"))
            page.evaluate("document.querySelector('#modal').close()")
    # reduced motion
    page.emulate_media(reduced_motion="reduce")
    page.reload(); page.wait_for_timeout(1500)
    rep["motion"] = page.evaluate("""() => { let n=0; for (const a of document.getAnimations()) { if (a.playState==='running' && a.effect && a.effect.getTiming().iterations===Infinity) n++; } return n; }""")
    page.emulate_media(reduced_motion="no-preference")
    return rep


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slugs", nargs="*")
    ap.add_argument("--port", type=int, default=8200)
    ap.add_argument("--shots")
    ap.add_argument("--json")
    a = ap.parse_args()
    slugs = a.slugs or SLUGS
    if a.shots: Path(a.shots).mkdir(parents=True, exist_ok=True)
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(a.port), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    reports = []
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
            for s in slugs:
                ctx = b.new_context()
                page = ctx.new_page()
                try:
                    r = audit(page, s, a.port, a.shots)
                except Exception as e:
                    r = {"slug": s, "error": str(e)[:300]}
                ctx.close()
                reports.append(r)
                bad = []
                if r.get("error"): bad.append("ERRO " + r["error"][:80])
                else:
                    if r["console"]: bad.append(f"console={len(r['console'])}")
                    for w, (sw, cw) in r["overflow"].items():
                        if sw > cw: bad.append(f"overflow@{w}={sw}>{cw}")
                    for w, c in r["contrast"].items():
                        if c: bad.append(f"contraste@{w}={len(c)}")
                    if r["focus"]: bad.append(f"foco={len(r['focus'])}")
                    if not r["dialog"] or not r["dialog"]["open"] or not r["dialog"]["inView"]: bad.append("dialog")
                    if r["motion"]: bad.append(f"motion={r['motion']}")
                print(f"{s:34} {'OK' if not bad else ' '.join(bad)}", flush=True)
            b.close()
    finally:
        srv.terminate()
    if a.json:
        Path(a.json).write_text(json.dumps(reports, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
