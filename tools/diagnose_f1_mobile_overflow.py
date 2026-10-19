#!/usr/bin/env python3
"""Collect descendant overflow evidence for the exact residual F1 mobile cases."""

from __future__ import annotations

import json
import tempfile
from pathlib import Path

from playwright.sync_api import sync_playwright

from test_default_parity import CaptureSession, prepare_baseline, record_fixture_neutrality, serve

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs/temp/reports/2026-10-17-f1-mobile-overflow-descendants.json"
SLUGS = [
    "acid-anti-design", "collage-scrapbook", "constructivism", "hand-drawn-sketch",
    "maximalism", "memphis", "neo-brutalism", "risograph", "synthwave", "zine-independent",
]
SCAN = r"""() => {
  const main=document.querySelector('#main-content');
  const rect=e=>{const r=e.getBoundingClientRect();return [r.x,r.y,r.width,r.height].map(n=>Math.round(n*100)/100)};
  const label=e=>{
    const id=e.id?`#${e.id}`:'';
    const cls=typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).filter(Boolean).join('.'):'';
    return `${e.tagName.toLowerCase()}${id}${cls}`;
  };
  if(!main)return {error:'main-content missing'};
  const mainRect=main.getBoundingClientRect();
  const offenders=[];
  for(const e of main.querySelectorAll('*')){
    const r=e.getBoundingClientRect(),s=getComputedStyle(e);
    const spillLeft=mainRect.left-r.left,spillRight=r.right-mainRect.right;
    if(spillLeft>1||spillRight>1||e.scrollWidth>e.clientWidth+1){
      offenders.push({selector:label(e),box:rect(e),client:[e.clientWidth,e.clientHeight],scroll:[e.scrollWidth,e.scrollHeight],spillLeft:Math.round(spillLeft*100)/100,spillRight:Math.round(spillRight*100)/100,position:s.position,overflowX:s.overflowX,whiteSpace:s.whiteSpace,transform:s.transform,pseudo:{before:getComputedStyle(e,'::before').content,after:getComputedStyle(e,'::after').content},text:(e.innerText||'').replace(/\s+/g,' ').slice(0,180)});
    }
  }
  return {viewport:[innerWidth,innerHeight],main:{box:rect(main),client:[main.clientWidth,main.clientHeight],scroll:[main.scrollWidth,main.scrollHeight]},offenders:offenders.slice(0,80)};
}"""


def main() -> None:
    result = {"baseline": "9d88197", "cases": [], "failures": []}
    with tempfile.TemporaryDirectory(prefix="f1-overflow-baseline-") as temporary:
        baseline_dir = Path(temporary) / "baseline"
        baseline_dir.mkdir()
        prepare_baseline("9d88197", baseline_dir)
        baseline_server, baseline_port = serve(baseline_dir)
        current_server, current_port = serve(ROOT)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path="/usr/lib64/chromium-browser/chromium-browser",
                    headless=True,
                    args=["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
                )
                baseline = CaptureSession(browser, baseline_port)
                current = CaptureSession(browser, current_port)
                try:
                    for slug in SLUGS:
                        metadata = {"slug": slug, "tab": "painel", "viewport": [320, 720]}
                        try:
                            baseline_capture = baseline.capture(slug, "painel", 320, 720)
                            record_fixture_neutrality(result, metadata, "baseline", baseline_capture)
                            baseline_metrics = baseline.page.evaluate(SCAN)
                            current_capture = current.capture(slug, "painel", 320, 720)
                            record_fixture_neutrality(result, metadata, "current", current_capture)
                            current_metrics = current.page.evaluate(SCAN)
                            result["cases"].append({**metadata, "baseline": baseline_metrics, "candidate": current_metrics})
                            print(f"{slug}: baseline offenders={len(baseline_metrics['offenders'])}; candidate offenders={len(current_metrics['offenders'])}", flush=True)
                        except Exception as error:
                            result["failures"].append({**metadata, "error": repr(error)})
                finally:
                    baseline.close(); current.close(); browser.close()
        finally:
            baseline_server.terminate(); current_server.terminate()
            baseline_server.wait(timeout=5); current_server.wait(timeout=5)
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"cases": len(result["cases"]), "failures": result["failures"], "report": str(OUT.relative_to(ROOT))}, ensure_ascii=False))


if __name__ == "__main__":
    main()
