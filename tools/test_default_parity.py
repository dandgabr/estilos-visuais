#!/usr/bin/env python3
"""Compare the Padrão between a baseline commit and the current worktree.

Usage: python3 tools/test_default_parity.py [--base 9d88197] [--slugs nordic]
       [--viewports 320x720,375x800,768x900,1280x900] [--report PATH]

The complete run captures 82 styles x four tabs x four widths in both builds.
The stage is moved to a fixed origin only inside the capture fixture; the real
shell origin is recorded independently so layout changes remain visible. WebGL
canvas, its poster, and its grain layer are hidden by fixture CSS, including
nodes injected after fixture setup, because those layers are nondeterministic
decoration rather than canonical UI content.
"""
from __future__ import annotations

import argparse
import io
import json
import os
import re
import shutil
import socket
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

from default_parity import compare_captures
from oracles.snapshot_identity import snapshot_identity


ROOT = Path(__file__).resolve().parents[1]
TABS = ("painel", "projetos", "equipe", "relatorios")
DEFAULT_VIEWPORTS = "320x720,375x800,768x900,1280x900"
SLUGS = re.findall(r"\['([a-z0-9-]+)',\s*'", (ROOT / "styles/registry.js").read_text())
FX_SLUGS = set(re.findall(r"\['([a-z0-9-]+)',[^\]]*,\s*true\]", (ROOT / "styles/registry.js").read_text()))
FIXTURE_SETUP = r"""() => {
  const stage = document.querySelector('#stage');
  const before = (() => { const r=stage.getBoundingClientRect(); return [r.x,r.y,r.width,r.height].map(v=>Math.round(v*100)/100); })();
  stage.dataset.parityOrigin = JSON.stringify(before);
  let fixture = document.querySelector('#parity-fixture');
  if (!fixture) { fixture=document.createElement('style'); fixture.id='parity-fixture'; document.head.append(fixture); }
  fixture.textContent = `html,body{overflow:hidden!important}#stage{position:fixed!important;inset:0 auto auto 0!important;width:100vw!important;height:100vh!important;max-height:none!important;margin:0!important;z-index:2147483000!important;transform:none!important}#stage .fx-3d-canvas,#stage .fx-3d-poster,#stage[data-style="3d-immersive-webgl"] .app::before{visibility:hidden!important}`;
  stage.scrollTop=0;
  // Force style and layout to settle before the pointer is moved. Moving the
  // stage under a stationary pointer changes :hover and contaminates parity.
  getComputedStyle(stage).position;
  stage.getBoundingClientRect();
  return before;
}"""
FIXTURE_CAPTURE = r"""() => {
  const stage = document.querySelector('#stage');
  const pane = document.querySelector('.view-pane.is-active');
  const selectors = ['.app', '.topbar', '.nav', '.hero', '.section-title', '.kpis', '.kpi', '.grid', '.feature', '.chart', '.split', '.panel', 'form', 'table', '#modal'];
  const box = e => { if (!e) return null; const r=e.getBoundingClientRect(); return [r.x,r.y,r.width,r.height].map(v=>Math.round(v*100)/100); };
  const visible = e => { if(!e) return false; const s=getComputedStyle(e), r=e.getBoundingClientRect(); return s.display!=='none' && s.visibility!=='hidden' && r.width>0 && r.height>0 && !e.closest('[hidden]'); };
  stage.scrollTop=0;
  const stageBox=box(stage);
  const measured={};
  for(const selector of selectors){
    const nodes=[...pane.querySelectorAll(selector)];
    if(!nodes.length) continue;
    measured[selector]=nodes.map(e=>({box:box(e),visible:visible(e),text:e.innerText?.trim().replace(/\s+/g,' ').slice(0,180)||''}));
  }
  const style=getComputedStyle(stage);
  const tokens={}; for(const key of ['--bg','--surface','--surface-2','--fg','--muted','--accent','--border','--primary','--danger']) tokens[key]=style.getPropertyValue(key).trim();
  const pseudo=[]; for(const e of stage.querySelectorAll('*')) for(const p of ['::before','::after']) { const c=getComputedStyle(e,p).content; if(c && c!=='none' && c!=='normal' && c!=='""') pseudo.push([e.tagName.toLowerCase(),String(e.className||'').toString().split(' ')[0],p,c]); }
  const hovered=document.elementFromPoint(-8,-8);
  const hoverPath=[...document.querySelectorAll(':hover')].map(e=>({tag:e.tagName.toLowerCase(),id:e.id||'',class:String(e.className||'').toString().trim().replace(/\s+/g,'.')}));
  const focus=document.activeElement;
  const focusTag=focus?.tagName?.toLowerCase()||null;
  const fixtureNeutrality={pointerTargetOutside:!hovered,hoverOutsideApp:!hoverPath.some(e=>e.id==='stage'||e.class.split('.').includes('app')||e.class.split('.').includes('view-pane')),focusNeutral:!focus||focus===document.body||focus===document.documentElement,hoverPath};
  return {originBeforeFixture:JSON.parse(stage.dataset.parityOrigin||'null'),stageFixture:stageBox,scrollTop:stage.scrollTop,innerText:pane.innerText.trim().replace(/\s+/g,' '),pseudo,tokens,elements:measured,fonts:[...document.fonts].map(f=>({family:f.family,weight:f.weight,status:f.status})).sort((a,b)=>a.family.localeCompare(b.family)||a.weight.localeCompare(b.weight)),pointer:[-8,-8],pointerTarget:hovered?{tag:hovered.tagName.toLowerCase(),id:hovered.id||'',class:String(hovered.className||'').toString().trim().replace(/\s+/g,'.')}:null,hoverPath,focus:focusTag==='body'||focusTag==='html'?null:(focus?.id||focus?.className||null),fixtureNeutrality,tab:pane.id,viewport:[innerWidth,innerHeight],scale:devicePixelRatio,language:document.documentElement.lang,direction:document.documentElement.dir||'ltr',reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches};
}"""


def git(*args, cwd=ROOT):
    return subprocess.check_output(["git", *args], cwd=cwd, text=True).strip()


def free_port():
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def serve(directory):
    port = free_port()
    process = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"], cwd=directory, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    deadline = time.time() + 8
    while time.time() < deadline:
        if process.poll() is not None:
            raise RuntimeError(f"server exited early with status {process.returncode}: {directory}")
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=.1):
                return process, port
        except OSError:
            time.sleep(.05)
    process.terminate()
    raise RuntimeError(f"server did not become ready: {directory}")


def prepare_baseline(commit, destination):
    archive = subprocess.Popen(["git", "archive", commit], cwd=ROOT, stdout=subprocess.PIPE)
    untar = subprocess.Popen(["tar", "-x", "-C", str(destination)], stdin=archive.stdout)
    archive.stdout.close()
    tar_status = untar.wait()
    git_status = archive.wait()
    if git_status or tar_status:
        raise RuntimeError(f"could not extract baseline {commit}: git={git_status}, tar={tar_status}")


class CaptureSession:
    def __init__(self, browser, port):
        self.context = browser.new_context(viewport={"width": 1280, "height": 900}, device_scale_factor=1, locale="pt-BR", reduced_motion="reduce", color_scheme="light")
        self.context.add_init_script("""localStorage.clear(); localStorage.setItem('coacus-locale','pt-BR'); localStorage.setItem('coacus-auto-tour','false'); localStorage.setItem('coacus-welcome-tour','true');
          let seed=0x5eed1234; Math.random=()=>{ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; };""")
        self.page = None
        self.slug = None
        self.port = port

    def capture(self, slug, tab, width, height):
        # A clean page per style prevents CSS/FX lifecycle residue across
        # themes, while reusing it for that style's four tabs and viewports.
        if self.page is None or self.slug != slug:
            if self.page is not None:
                self.page.close()
            self.page = self.context.new_page()
            self.page.goto(f"http://127.0.0.1:{self.port}/#nordic", wait_until="domcontentloaded")
            self.slug = slug
        page = self.page
        page.set_viewport_size({"width": width, "height": height})
        target_hash = f"#{slug}" + (f"/{tab}" if tab != "painel" else "")
        if page.evaluate("location.hash") != target_hash:
            page.evaluate("value => { location.hash = value; }", target_hash)
        page.wait_for_function("slug => document.querySelector('#stage')?.dataset.style === slug", arg=slug)
        page.wait_for_function("tab => document.querySelector('.view-pane.is-active')?.id === `view-${tab}`", arg=tab)
        if slug in FX_SLUGS:
            page.wait_for_timeout(750)
        return self._capture_ready(page, width, height)

    def _capture_ready(self, page, width, height):
        page.evaluate("""async () => {
          const stage = document.querySelector('#stage');
          const samples = [stage, ...stage.querySelectorAll('*')];
          const fonts = new Set(samples.map(element => {
            const style = getComputedStyle(element);
            return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          }));
          await Promise.all([...fonts].map(font => document.fonts.load(font, stage.innerText || 'Coacus')));
          await document.fonts.ready;
        }""")
        page.evaluate(FIXTURE_SETUP)
        page.wait_for_function("getComputedStyle(document.querySelector('#stage')).position === 'fixed'")
        page.evaluate("() => { if(document.activeElement && document.activeElement !== document.body) document.activeElement.blur(); document.querySelector('#stage').scrollTop=0; }")
        # Move outside the viewport after fixture layout settles, so no element
        # can retain hover from the pre-normalized shell geometry.
        page.mouse.move(-8, -8)
        page.evaluate("() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
        state = page.evaluate(FIXTURE_CAPTURE)
        page.wait_for_timeout(100)
        image = page.screenshot(animations="disabled", caret="hide")
        return {"state": state, "png": image}

    def close(self):
        self.context.close()


def capture(browser, port, slug, tab, width, height):
    session = CaptureSession(browser, port)
    try:
        return session.capture(slug, tab, width, height)
    finally:
        session.close()


def record_fixture_neutrality(report, label, name, captured):
    report["neutralityChecks"] += 1
    neutrality = captured["state"].get("fixtureNeutrality", {})
    failed = [key for key in ("pointerTargetOutside", "hoverOutsideApp", "focusNeutral") if neutrality.get(key) is not True]
    if failed:
        report["neutralityFailures"].append({**label, "capture": name, "failedChecks": failed, "details": neutrality})


def parse_viewports(value):
    result=[]
    for entry in value.split(','):
        width,height=map(int,entry.lower().split('x'))
        if width < 320 or height < 320:
            raise argparse.ArgumentTypeError(f"invalid viewport {entry}")
        result.append((width,height))
    return result


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base",default="9d88197")
    parser.add_argument("--slugs",nargs="*")
    parser.add_argument("--tabs",nargs="*",choices=TABS)
    parser.add_argument("--viewports",default=DEFAULT_VIEWPORTS)
    parser.add_argument("--report",default="docs/temp/reports/2026-10-17-default-parity.json")
    parser.add_argument("--sample-repeat",action="store_true",help="capture the current build twice per case to measure natural variance")
    parser.add_argument("--save-captures",action="store_true",help="save both source screenshots for mismatching pairs under the ignored SDD workspace")
    parser.add_argument("--pixel-tolerance",type=int,default=0,help="maximum per-channel raster delta; release parity requires exact pixels")
    args=parser.parse_args()
    viewports=parse_viewports(args.viewports)
    slugs=args.slugs or SLUGS
    unknown=sorted(set(slugs)-set(SLUGS))
    if unknown: parser.error(f"unknown style slug(s): {', '.join(unknown)}")
    git("rev-parse","--verify",args.base)
    git_root=Path(git("rev-parse","--show-toplevel"))
    dirty=git("status","--porcelain")
    candidate_snapshot_start=snapshot_identity(git_root)
    tabs=args.tabs or list(TABS)
    if not 0 <= args.pixel_tolerance <= 255:
        parser.error("--pixel-tolerance must be between 0 and 255")
    report={"baseline":args.base,"currentHead":git("rev-parse","HEAD"),"currentDirty":bool(dirty),"chromium":"/usr/lib64/chromium-browser/chromium-browser (ELF; bypasses browser-harness wrapper)","locale":"pt-BR","reducedMotion":True,"scale":1,"pixelTolerance":args.pixel_tolerance,"fixture":"stage origin and viewport normalized in capture only; pointer moved outside viewport after fixture layout settles; hover/focus neutrality asserted per capture; real origin retained in state; nondeterministic 3D canvas/poster/grain suppressed only when present","viewports":[list(v) for v in viewports],"tabs":tabs,"stylesExpected":len(slugs),"pairsExpected":len(slugs)*len(tabs)*len(viewports),"candidateSnapshotStart":candidate_snapshot_start,"candidateSnapshotEnd":None,"candidateSnapshotStable":False,"pairsCompared":0,"replicatePairs":0,"neutralityChecks":0,"neutralityFailures":[],"expectedShellOriginChanges":[],"baselineCurrentMismatches":[],"replicateMeasurements":[],"replicateMismatches":[],"failures":[]}
    report_path=ROOT/args.report
    report_path.parent.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="default-parity-") as temporary:
        baseline_dir=Path(temporary)/"baseline"
        baseline_dir.mkdir()
        prepare_baseline(args.base,baseline_dir)
        base_server,base_port=serve(baseline_dir)
        current_server,current_port=serve(ROOT)
        try:
            with sync_playwright() as playwright:
                # Use the Chromium ELF directly. /usr/bin/chromium-browser is
                # a system wrapper that inherits CHROMIUM_USER_FLAGS and may
                # launch through the user's visible browser-harness profile.
                browser=playwright.chromium.launch(executable_path="/usr/lib64/chromium-browser/chromium-browser",headless=True,args=["--no-sandbox","--use-gl=swiftshader","--enable-unsafe-swiftshader"])
                baseline_session=CaptureSession(browser,base_port)
                current_session=CaptureSession(browser,current_port)
                try:
                    total=report["pairsExpected"]
                    for slug in slugs:
                        for tab in tabs:
                            for width,height in viewports:
                                label={"slug":slug,"tab":tab,"viewport":[width,height]}
                                try:
                                    base=baseline_session.capture(slug,tab,width,height)
                                    record_fixture_neutrality(report,label,"baseline",base)
                                    current=current_session.capture(slug,tab,width,height)
                                    record_fixture_neutrality(report,label,"current",current)
                                    result=compare_captures(base,current,pixel_tolerance=args.pixel_tolerance)
                                    if result["expected_differences"]:
                                        report["expectedShellOriginChanges"].append({**label,**result["expected_differences"]})
                                    if not result["equal"]:
                                        diff_name=f"{slug}-{tab}-{width}x{height}"
                                        if result["different_pixels_raw"] and result["diff_image"] is not None:
                                            directory=ROOT/".superpowers/sdd/2026-10-17-corrigir-divergencias-visuais/parity-diffs"
                                            directory.mkdir(parents=True,exist_ok=True)
                                            result["diff_image"].save(directory/f"{diff_name}.png")
                                            if args.save_captures:
                                                from PIL import Image
                                                Image.open(io.BytesIO(base["png"])).save(directory/f"{diff_name}-base.png")
                                                Image.open(io.BytesIO(current["png"])).save(directory/f"{diff_name}-current.png")
                                        report["baselineCurrentMismatches"].append({**label,"stateDifferences":result["state_differences"],"differentPixels":result["different_pixels"],"differentPixelsRaw":result["different_pixels_raw"],"maxChannelDelta":result["max_channel_delta"],"dimensions":result["dimensions"]})
                                    if args.sample_repeat:
                                        repeat=current_session.capture(slug,tab,width,height)
                                        record_fixture_neutrality(report,label,"repeat",repeat)
                                        repeat_result=compare_captures(current,repeat,pixel_tolerance=args.pixel_tolerance)
                                        report["replicatePairs"]+=1
                                        report["replicateMeasurements"].append({**label,"differentPixelsRaw":repeat_result["different_pixels_raw"],"differentPixelsBeyondTolerance":repeat_result["different_pixels"],"maxChannelDelta":repeat_result["max_channel_delta"],"stateDifferences":repeat_result["state_differences"]})
                                        if not repeat_result["equal"]:
                                            report["replicateMismatches"].append({**label,"stateDifferences":repeat_result["state_differences"],"differentPixels":repeat_result["different_pixels"],"differentPixelsRaw":repeat_result["different_pixels_raw"],"maxChannelDelta":repeat_result["max_channel_delta"]})
                                            if repeat_result["diff_image"] is not None:
                                                directory=ROOT/".superpowers/sdd/2026-10-17-corrigir-divergencias-visuais/replicate-diffs"
                                                directory.mkdir(parents=True,exist_ok=True)
                                                stem=f"{slug}-{tab}-{width}x{height}"
                                                repeat_result["diff_image"].save(directory/f"{stem}.png")
                                                from PIL import Image
                                                Image.open(io.BytesIO(current["png"])).save(directory/f"{stem}-first.png")
                                                Image.open(io.BytesIO(repeat["png"])).save(directory/f"{stem}-second.png")
                                    report["pairsCompared"]+=1
                                except Exception as exc:
                                    report["failures"].append({**label,"error":str(exc)[:500]})
                                done=report["pairsCompared"]+len(report["failures"])
                                if done%32==0 or done==total:
                                    print(f"{done}/{total} pairs; diffs={len(report['baselineCurrentMismatches'])}; errors={len(report['failures'])}",flush=True)
                                if done%128==0:
                                    report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n")
                finally:
                    baseline_session.close()
                    current_session.close()
                    browser.close()
        finally:
            for process in (current_server,base_server):
                process.terminate()
                try: process.wait(timeout=2)
                except subprocess.TimeoutExpired: process.kill()
    expected_neutrality_checks=report["pairsExpected"]*(3 if args.sample_repeat else 2)
    report["candidateSnapshotEnd"]=snapshot_identity(git_root)
    report["candidateSnapshotStable"]=report["candidateSnapshotStart"]==report["candidateSnapshotEnd"]
    report["gatePassed"]=report["candidateSnapshotStable"] and report["pairsCompared"]==report["pairsExpected"] and report["neutralityChecks"]==expected_neutrality_checks and not report["neutralityFailures"] and not report["failures"] and not report["baselineCurrentMismatches"] and not report["replicateMismatches"]
    report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n")
    print(json.dumps({"pairsExpected":report["pairsExpected"],"pairsCompared":report["pairsCompared"],"replicatePairs":report["replicatePairs"],"neutralityChecks":report["neutralityChecks"],"neutralityFailureCount":len(report["neutralityFailures"]),"expectedShellOriginChangeCount":len(report["expectedShellOriginChanges"]),"baselineCurrentMismatchCount":len(report["baselineCurrentMismatches"]),"replicateMismatchCount":len(report["replicateMismatches"]),"captureFailureCount":len(report["failures"]),"pixelTolerance":report["pixelTolerance"],"candidateSnapshotStable":report["candidateSnapshotStable"],"candidateSnapshotSha256":report["candidateSnapshotStart"]["sha256"],"gatePassed":report["gatePassed"],"report":str(report_path)},ensure_ascii=False,indent=2))
    return 0 if report["gatePassed"] else 1


if __name__=="__main__":
    raise SystemExit(main())
