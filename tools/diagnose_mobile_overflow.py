"""Locate descendants that cause horizontal overflow in canonical style views."""
import json, re
from pathlib import Path
from playwright.sync_api import sync_playwright
from chromium_runtime import chromium_executable

ROOT = Path(__file__).resolve().parents[1]
SLUGS = re.findall(r"\['([a-z0-9-]+)',\s*'", (ROOT / "styles/registry.js").read_text())

def main():
    results=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path=chromium_executable(),headless=True)
        page=browser.new_page(viewport={"width":320,"height":800})
        page.add_init_script("localStorage.setItem('coacus-locale','pt-BR');localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true')")
        page.goto('http://127.0.0.1:8000/#nordic');page.locator('#stage').wait_for()
        for slug in SLUGS:
            page.evaluate("slug=>location.hash=`#${slug}`",slug)
            page.wait_for_function("slug=>document.querySelector('#stage')?.dataset.style===slug",arg=slug)
            result=page.locator('#stage').evaluate("s=>{const r=s.getBoundingClientRect(),all=[...s.querySelectorAll('*')];return {scrollWidth:s.scrollWidth,clientWidth:s.clientWidth,offenders:all.map(e=>{const b=e.getBoundingClientRect(),cs=getComputedStyle(e);return {tag:e.tagName.toLowerCase(),cls:String(e.className||'').slice(0,70),id:e.id,left:+b.left.toFixed(1),right:+b.right.toFixed(1),width:+b.width.toFixed(1),position:cs.position,overflow:cs.overflowX}}).filter(e=>e.width>0&&(e.left<r.left-1||e.right>r.right+1)).slice(0,8)}}")
            if result['scrollWidth']>result['clientWidth']+1 or result['offenders']:
                results.append({"slug":slug,**result})
        browser.close()
    out=ROOT/'docs/temp/reports/2026-10-17-mobile-overflow-diagnostic.json'
    out.parent.mkdir(exist_ok=True,parents=True);out.write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({"styles":len(SLUGS),"overflowStyles":len(results),"report":str(out)},ensure_ascii=False))
if __name__=='__main__':main()
