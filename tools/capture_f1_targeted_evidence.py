#!/usr/bin/env python3
"""Capture the exact F1 delta set with the frozen parity fixture (no full matrix)."""

from __future__ import annotations

import argparse
import json
from collections import defaultdict
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

from default_parity import compare_captures
from test_default_parity import (
    CaptureSession,
    prepare_baseline,
    record_fixture_neutrality,
    serve,
)

ROOT = Path(__file__).resolve().parents[1]
REPORT_DIR = ROOT / "docs/temp/reports"
F0 = REPORT_DIR / "2026-10-17-default-parity-isolated-neutrality-full.json"
DIAG = REPORT_DIR / "2026-10-17-f1-delta-diagnosis.json"
TABLES = REPORT_DIR / "2026-10-17-f1-table-delta-diagnosis.json"
PSEUDO = REPORT_DIR / "2026-10-17-f1-pseudo-locale-diagnosis.json"
TABS_ORDER = {"painel": 0, "projetos": 1, "equipe": 2, "relatorios": 3}

LAYOUT_METRICS = r"""() => {
  const selectors=['#stage','.app','#main-content','.split','.panel','form','.table-wrap','table'];
  const summary=e=>{
    if(!e)return null;
    const r=e.getBoundingClientRect(),s=getComputedStyle(e),p=e.parentElement,pr=p?.getBoundingClientRect();
    const round=n=>Math.round(n*100)/100;
    return {
      box:[r.x,r.y,r.width,r.height].map(round),
      client:[e.clientWidth,e.clientHeight],
      scroll:[e.scrollWidth,e.scrollHeight],
      overflow:[e.scrollWidth>e.clientWidth,e.scrollHeight>e.clientHeight],
      computed:{width:s.width,minWidth:s.minWidth,overflowX:s.overflowX,overflowY:s.overflowY,display:s.display,gridTemplateColumns:s.gridTemplateColumns},
      parent:p?{tag:p.tagName.toLowerCase(),id:p.id||'',class:String(p.className||'').toString(),client:[p.clientWidth,p.clientHeight],scroll:[p.scrollWidth,p.scrollHeight],box:pr?[round(pr.x),round(pr.y),round(pr.width),round(pr.height)]:null}:null,
    };
  };
  const pane=document.querySelector('.view-pane.is-active');
  const result={viewport:[innerWidth,innerHeight],document:[document.documentElement.clientWidth,document.documentElement.scrollWidth],selectors:{}};
  for(const selector of selectors){
    const nodes=[...(pane||document).querySelectorAll(selector)];
    if(selector==='#stage'||selector==='.app'||selector==='#main-content'){
      const node=document.querySelector(selector); if(node)result.selectors[selector]=[summary(node)];
    }else if(nodes.length)result.selectors[selector]=nodes.map(summary);
  }
  return result;
}"""


def key_for(record: dict) -> tuple[str, str, int, int]:
    return record["slug"], record["tab"], int(record["viewport"][0]), int(record["viewport"][1])


def target_cases() -> tuple[list[dict], set[tuple[str, str, int, int]]]:
    f0 = json.loads(F0.read_text(encoding="utf-8"))
    diag = json.loads(DIAG.read_text(encoding="utf-8"))
    case_by_key = {key_for(entry): entry for entry in diag["entries"]}
    tags: dict[tuple[str, str, int, int], set[str]] = defaultdict(set)
    for record in f0["expectedShellOriginChanges"]:
        tags[key_for(record)].add("shell-origin-320")
    for record in f0["baselineCurrentMismatches"]:
        if record.get("differentPixelsRaw", 0) and not record.get("stateDifferences"):
            tags[key_for(record)].add("raster-only")
    for record in json.loads(TABLES.read_text(encoding="utf-8"))["entries"]:
        if record["classification"] != "table-box-unchanged":
            tags[key_for(record)].add("table-box-delta")
    for record in json.loads(PSEUDO.read_text(encoding="utf-8"))["records"]:
        tags[key_for(record)].add("pseudo-delta")

    ordered = sorted(
        tags,
        key=lambda k: (k[0], TABS_ORDER.get(k[1], 99), k[2], k[3]),
    )
    cases = []
    for index, key in enumerate(ordered, 1):
        current = case_by_key.get(key)
        cases.append({
            "id": current["id"] if current else f"F1-SHELL-{index:03d}",
            "slug": key[0], "tab": key[1], "viewport": [key[2], key[3]],
            "tags": sorted(tags[key]),
            "inventoryStatus": current["status"] if current else "shell-origin-only",
        })
    return cases, set(ordered)


def changed_panel_form_cases() -> set[tuple[str, str, int, int]]:
    f0 = json.loads(F0.read_text(encoding="utf-8"))
    changed = set()
    for record in f0["baselineCurrentMismatches"]:
        elements = record.get("stateDifferences", {}).get("elements")
        if not elements:
            continue
        left, right = elements.get("left", {}), elements.get("right", {})
        changed_selectors = [s for s in set(left) | set(right) if left.get(s) != right.get(s)]
        if ".panel" in changed_selectors or "form" in changed_selectors:
            changed.add(key_for(record))
    return changed


def parent_child_metrics(session: CaptureSession) -> dict:
    return session.page.evaluate(LAYOUT_METRICS)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default="9d88197")
    parser.add_argument("--report", default="docs/temp/reports/2026-10-17-f1-targeted-captures.json")
    parser.add_argument("--capture-dir", default="docs/temp/reports/2026-10-17-f1-targeted-captures")
    parser.add_argument("--only", help="Capture one exact case as slug/tab/width/height")
    args = parser.parse_args()

    cases, case_keys = target_cases()
    if args.only:
        slug, tab, width, height = args.only.split("/")
        key = (slug, tab, int(width), int(height))
        diag = json.loads(DIAG.read_text(encoding="utf-8"))
        inventory = next((e for e in diag["entries"] if key_for(e) == key), None)
        if inventory is None:
            raise SystemExit(f"Case is not in the F1 inventory: {args.only}")
        cases = [{"id": inventory["id"], "slug": slug, "tab": tab, "viewport": [int(width), int(height)], "tags": ["inventory-correction"], "inventoryStatus": inventory["status"]}]
        case_keys = {key}
    elif len(cases) != 225:
        raise SystemExit(f"Expected the four target groups to deduplicate to 225 cases; got {len(cases)}")
    panel_form = changed_panel_form_cases()
    panel_form_320 = {key for key in panel_form if key[2] == 320}
    if not args.only and len(panel_form_320) != 80:
        raise SystemExit(f"Expected 80 .panel/form 320px cases; got {len(panel_form_320)}")

    output_path = ROOT / args.report
    capture_dir = ROOT / args.capture_dir
    capture_dir.mkdir(parents=True, exist_ok=True)
    result = {
        "baseline": args.base,
        "currentHead": __import__("subprocess").check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(),
        "currentDirty": bool(__import__("subprocess").check_output(["git", "status", "--porcelain"], cwd=ROOT, text=True).strip()),
        "captureMethod": "tools/test_default_parity.py CaptureSession + frozen FIXTURE_SETUP/FIXTURE_CAPTURE; same origin normalization, pointer (-8,-8), font wait and neutrality assertions; pixelTolerance=0",
        "groups": {"shellOrigin": 82, "rasterOnly": 81, "tableBoxDelta": 23, "pseudoDelta": 48, "uniqueCases": len(cases)},
        "panelForm320Cases": len(panel_form_320),
        "pairsExpected": len(cases), "pairsCaptured": 0,
        "neutralityChecks": 0, "neutralityFailures": [],
        "captureFailures": [], "cases": [],
        "gatePassed": False,
        "note": "Targeted evidence only; it does not replace the complete 1,312-pair gate or classify deltas automatically.",
    }

    import tempfile
    with tempfile.TemporaryDirectory(prefix="f1-targeted-baseline-") as temporary:
        baseline_dir = Path(temporary) / "baseline"
        baseline_dir.mkdir()
        prepare_baseline(args.base, baseline_dir)
        base_server, base_port = serve(baseline_dir)
        current_server, current_port = serve(ROOT)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path="/usr/lib64/chromium-browser/chromium-browser",
                    headless=True,
                    args=["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
                )
                base_session = CaptureSession(browser, base_port)
                current_session = CaptureSession(browser, current_port)
                try:
                    for index, label in enumerate(cases, 1):
                        slug, tab = label["slug"], label["tab"]
                        width, height = label["viewport"]
                        target_key = (slug, tab, width, height)
                        metadata = {"slug": slug, "tab": tab, "viewport": [width, height]}
                        try:
                            baseline = base_session.capture(slug, tab, width, height)
                            record_fixture_neutrality(result, metadata, "baseline", baseline)
                            baseline_layout = parent_child_metrics(base_session) if target_key in panel_form else None
                            current = current_session.capture(slug, tab, width, height)
                            record_fixture_neutrality(result, metadata, "current", current)
                            current_layout = parent_child_metrics(current_session) if target_key in panel_form else None
                            comparison = compare_captures(baseline, current, pixel_tolerance=0)

                            name = f"{label['id']}-{slug}-{tab}-{width}x{height}"
                            baseline_path = capture_dir / f"{name}-baseline.png"
                            current_path = capture_dir / f"{name}-candidate.png"
                            baseline_path.write_bytes(baseline["png"])
                            current_path.write_bytes(current["png"])
                            diff_path = None
                            diff_bbox = None
                            if comparison["diff_image"] is not None and comparison["different_pixels_raw"]:
                                rgb = comparison["diff_image"].convert("RGB")
                                bbox = rgb.getbbox()
                                if bbox:
                                    diff_bbox = list(bbox)
                                diff_path = capture_dir / f"{name}-diff.png"
                                comparison["diff_image"].save(diff_path)

                            layout_evidence = None
                            if target_key in panel_form:
                                layout_evidence = {
                                    "viewportGroup": "320px-all-80" if target_key in panel_form_320 else "other-viewport-panel-form-case",
                                    "baseline": baseline_layout,
                                    "candidate": current_layout,
                                }
                            result["cases"].append({
                                **label,
                                "comparison": {
                                    "stateDifferences": comparison["state_differences"],
                                    "differentPixels": comparison["different_pixels"],
                                    "differentPixelsRaw": comparison["different_pixels_raw"],
                                    "maxChannelDelta": comparison["max_channel_delta"],
                                    "differenceBoundingBox": diff_bbox,
                                    "dimensions": comparison["dimensions"],
                                    "equal": comparison["equal"],
                                    "shellOriginDifference": comparison["expected_differences"].get("originBeforeFixture"),
                                },
                                "neutrality": {
                                    "baseline": baseline["state"]["fixtureNeutrality"],
                                    "candidate": current["state"]["fixtureNeutrality"],
                                },
                                "panelFormLayout": layout_evidence,
                                "captures": {
                                    "baseline": str(baseline_path.relative_to(ROOT)),
                                    "candidate": str(current_path.relative_to(ROOT)),
                                    "diff": str(diff_path.relative_to(ROOT)) if diff_path else None,
                                },
                            })
                            result["pairsCaptured"] += 1
                        except Exception as error:  # retain an explicit failed case
                            result["captureFailures"].append({**metadata, "error": repr(error)})
                        if index % 25 == 0 or index == len(cases):
                            print(f"{index}/{len(cases)} pairs; neutrality_failures={len(result['neutralityFailures'])}; capture_failures={len(result['captureFailures'])}", flush=True)
                finally:
                    base_session.close()
                    current_session.close()
                    browser.close()
        finally:
            base_server.terminate()
            current_server.terminate()
            base_server.wait(timeout=5)
            current_server.wait(timeout=5)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "pairsExpected": result["pairsExpected"],
        "pairsCaptured": result["pairsCaptured"],
        "panelForm320Cases": result["panelForm320Cases"],
        "neutralityChecks": result["neutralityChecks"],
        "neutralityFailures": len(result["neutralityFailures"]),
        "captureFailures": len(result["captureFailures"]),
        "report": str(output_path.relative_to(ROOT)),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
