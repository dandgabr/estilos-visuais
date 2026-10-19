"""Sample painted backgrounds, including gradients hidden from the solid oracle.

Text fill is hidden for the reference image while CSS color is preserved, so
currentColor artwork remains intact. Each text line is compared with the median
of nine interior background samples. This is a review aid, not a WCAG certificate.
"""
import argparse
import io
import json
import re
import statistics
import tempfile
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright
import test_variants_matrix as matrix


def luminance(rgb):
    c=[v/255 for v in rgb[:3]]
    c=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in c]
    return sum(a*b for a,b in zip(c,(.2126,.7152,.0722)))


TEXT_JS="""app=>{
 const a=app.getBoundingClientRect(),w=document.createTreeWalker(app,NodeFilter.SHOW_TEXT),out=[];
 while(w.nextNode()) {
  const n=w.currentNode,e=n.parentElement,s=getComputedStyle(e),t=n.textContent.trim();
  if(!t||e.closest('[hidden],script,style')||s.visibility==='hidden')continue;
  const range=document.createRange();range.selectNodeContents(n);
  let opacity=1;for(let p=e;p&&p!==app.parentElement;p=p.parentElement)opacity*=Number(getComputedStyle(p).opacity);
  const rects=Array.from(range.getClientRects()).map(r=>{
   let left=r.left,right=r.right,top=r.top,bottom=r.bottom;
   for(let p=e;p&&p!==app.parentElement;p=p.parentElement){
    const s=getComputedStyle(p),b=p.getBoundingClientRect();
    if(s.overflowX!=='visible'){left=Math.max(left,b.left);right=Math.min(right,b.right)}
    if(s.overflowY!=='visible'){top=Math.max(top,b.top);bottom=Math.min(bottom,b.bottom)}
   }
   return {x:left-a.left,y:top-a.top,w:right-left,h:bottom-top};
  }).filter(r=>r.w>2&&r.h>2);
  if(!rects.length||opacity<.1)continue;
  out.push({text:t.slice(0,80),selector:e.tagName.toLowerCase()+'.'+e.className,color:s.webkitTextFillColor||s.color,opacity,threshold:parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&parseInt(s.fontWeight)>=700)?3:4.5,rects});
 }
 return out;
}"""


def run(slugs,output,width=1280):
    cases=[]
    with tempfile.TemporaryDirectory(prefix='painted-contrast-') as tmp:
        root=Path(tmp)/'review';matrix.generate_review_fixture(root,slugs)
        server=matrix.FixtureServer(root)
        try:
            with sync_playwright() as p:
                browser=p.chromium.launch(executable_path=matrix.chromium_executable(),headless=True)
                page=browser.new_page(viewport={'width':width,'height':900},reduced_motion='reduce')
                page.add_init_script("localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true');")
                for slug in slugs:
                    for variant in matrix.STATES:
                        page.goto(f'{server.base_url}/#{slug}')
                        page.wait_for_function('s=>document.querySelector("#stage")?.dataset.style===s',arg=slug)
                        if (page.locator('#appearance-trigger').get_attribute('aria-pressed')=='true')!=(variant=='alternate'):page.locator('#appearance-trigger').click()
                        page.wait_for_function('v=>(document.querySelector("#stage")?.dataset.variant==="alternate")===v',arg=variant=='alternate')
                        page.evaluate('document.fonts.ready')
                        page.mouse.move(0,0)
                        page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                        height=page.locator('#stage').evaluate('e=>e.clientHeight')
                        backdrop=page.locator('#stage').evaluate('e=>getComputedStyle(e).background')
                        expand=page.add_style_tag(content=f'body{{background:{backdrop}!important}} html,body{{height:auto!important;overflow:visible!important;scrollbar-width:none!important}} .shell{{height:auto!important;align-items:start!important}} #gallery{{height:100vh!important}} #stage{{flex:none!important;height:{height}px!important;overflow:visible!important;scroll-snap-type:none!important}}')
                        app=page.locator('#stage .app');texts=app.evaluate(TEXT_JS)
                        hide=page.add_style_tag(content='#stage#stage#stage .app * { -webkit-text-fill-color:transparent!important;text-shadow:none!important; }')
                        shot=Image.open(io.BytesIO(app.screenshot(timeout=20000))).convert('RGB')
                        hide.evaluate('e=>e.remove()');expand.evaluate('e=>e.remove()')
                        issues=[]
                        for t in texts:
                            nums=re.findall(r'[\d.]+',t['color'])
                            if len(nums)<3:continue
                            fg=list(map(float,nums));alpha=(fg[3] if len(fg)>3 else 1)*t['opacity']
                            if alpha<.05:continue  # Gradient-clipped text requires visual review.
                            ratios=[]
                            for r in t.pop('rects'):
                                samples=[]
                                for dx in (.2,.5,.8):
                                    for dy in (.2,.5,.8):
                                        x,y=round(r['x']+r['w']*dx),round(r['y']+r['h']*dy)
                                        if 0<=x<shot.width and 0<=y<shot.height:
                                            bg=shot.getpixel((x,y));paint=[fg[i]*alpha+bg[i]*(1-alpha) for i in range(3)]
                                            a,b=luminance(paint),luminance(bg);samples.append((max(a,b)+.05)/(min(a,b)+.05))
                                if samples:ratios.append(statistics.median(samples))
                            if ratios and min(ratios)+.05<t['threshold']:issues.append({**t,'ratio':round(min(ratios),2)})
                        cases.append({'slug':slug,'variant':variant,'issues':issues})
                    print(slug,flush=True)
                browser.close()
        finally:server.close()
    report={'checked':len(cases),'width':width,'method':'median of nine painted background samples per visible text line','cases':cases}
    output.parent.mkdir(parents=True,exist_ok=True);output.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'checked':len(cases),'issues':sum(len(c['issues']) for c in cases),'report':str(output)}))


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--slugs',nargs='*');parser.add_argument('--output',type=Path,required=True);parser.add_argument('--width',type=int,default=1280)
    args=parser.parse_args();run(args.slugs or matrix.inventory()[0],args.output,args.width)
