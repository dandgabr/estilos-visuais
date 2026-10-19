#!/usr/bin/env python3
"""Capture computed contrast context and CDP rule traces for frozen styles/variants."""
from __future__ import annotations
import argparse, json, subprocess, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
from chromium_runtime import chromium_executable

ROOT = Path(__file__).resolve().parents[1]
SLUGS = ('nordic', 'flat-design')
VARIANTS = ('default', 'c1', 'c2', 'c3', 'e1', 'e2', 'e3')
VIEWPORTS = ((1280, 900), (375, 800))

COLLECT = r'''() => {
 const stage=document.querySelector('#stage'); if(!stage) throw new Error('stage missing');
 const parse=c=>{const m=c.match(/rgba?\(([^)]+)\)/); if(!m)return null;const p=m[1].split(/[ ,/]+/).filter(Boolean).map(Number);return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}};
 const lum=c=>{const f=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4};return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b)};
 const over=(a,b)=>({r:a.r*a.a+b.r*(1-a.a),g:a.g*a.a+b.g*(1-a.a),b:a.b*a.a+b.b*(1-a.a),a:1});
 const out=[];const walker=document.createTreeWalker(stage,NodeFilter.SHOW_TEXT);const seen=new Set();let id=0;
 while(walker.nextNode()) {const t=walker.currentNode;if(!t.nodeValue.trim())continue;const el=t.parentElement;if(!el||seen.has(el))continue;seen.add(el);const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0||el.closest('[aria-hidden="true"]'))continue;const r=el.getBoundingClientRect();if(r.width<2||r.height<2)continue;
  const fg=parse(cs.color);if(!fg)continue;let bg={r:255,g:255,b:255,a:1},layers=[],opacity=1,gradient=false;
  for(let n=el;n;n=n.parentElement){const s=getComputedStyle(n);opacity*=Number(s.opacity)||0;const c=parse(s.backgroundColor);layers.push({selector:n.id?'#'+n.id:n.tagName.toLowerCase()+(typeof n.className==='string'&&n.className.trim()?'.'+n.className.trim().split(/\s+/).join('.'):''),backgroundColor:s.backgroundColor,backgroundImage:s.backgroundImage,opacity:Number(s.opacity),color:s.color});if(s.backgroundImage!=='none')gradient=true;if(c&&c.a>0)bg=over(c,bg);if(n===stage)break;}
  const efffg={r:fg.r*fg.a*opacity+bg.r*(1-fg.a*opacity),g:fg.g*fg.a*opacity+bg.g*(1-fg.a*opacity),b:fg.b*fg.a*opacity+bg.b*(1-fg.a*opacity),a:1};const l1=lum(efffg),l2=lum(bg),ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);const fs=parseFloat(cs.fontSize),bold=parseInt(cs.fontWeight)>=700,need=(fs>=24||(fs>=18.66&&bold))?3:4.5;
  const pseudo={};for(const p of ['::before','::after']){const ps=getComputedStyle(el,p);pseudo[p]={content:ps.content,color:ps.color,backgroundColor:ps.backgroundColor,backgroundImage:ps.backgroundImage,opacity:ps.opacity,display:ps.display,visibility:ps.visibility,textFillColor:ps.webkitTextFillColor};}
  const key='contrast-evidence-'+(id++);el.setAttribute('data-contrast-evidence',key);out.push({key,text:t.nodeValue.trim().slice(0,80),selector:el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className.trim()?'.'+el.className.trim().split(/\s+/).join('.'):''),computed:{color:cs.color,fontSize:cs.fontSize,fontWeight:cs.fontWeight,opacity:cs.opacity,backgroundColor:cs.backgroundColor,backgroundImage:cs.backgroundImage,textFillColor:cs.webkitTextFillColor},pseudoComputed:pseudo,effectiveSolidBackground:bg,effectiveForeground:efffg,computedRatio:+ratio.toFixed(3),threshold:need,shortfall:ratio<need,gradientOrImageInAncestor:gradient,backgroundLayers:layers});
 }
 return out;
}'''

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--port',type=int,default=8212);ap.add_argument('--out',required=True);a=ap.parse_args()
 server=subprocess.Popen([sys.executable,'-m','http.server',str(a.port),'--bind','127.0.0.1'],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 time.sleep(.5); records=[]
 try:
  with sync_playwright() as p:
   browser=p.chromium.launch(executable_path=chromium_executable(),args=['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader'])
   for slug in SLUGS:
    for variant in VARIANTS:
     for width,height in VIEWPORTS:
      ctx=browser.new_context(viewport={'width':width,'height':height});page=ctx.new_page();cdp=ctx.new_cdp_session(page);cdp.send('DOM.enable');cdp.send('CSS.enable')
      try:
       page.add_init_script("localStorage.clear(); sessionStorage.clear(); localStorage.setItem('coacus-welcome-tour','true'); localStorage.setItem('coacus-auto-tour','false')")
       page.goto(f'http://127.0.0.1:{a.port}/#{slug}',wait_until='networkidle');page.wait_for_function('(s)=>document.querySelector("#stage")?.dataset.style===s',arg=slug,timeout=10000)
       if variant!='default':
        page.locator('#appearance-trigger').click(); radio=page.locator(f'#appearance-options input[name="appearance"][value="{variant}"]');radio.wait_for(state='visible',timeout=5000);radio.check();page.wait_for_function('(v)=>document.querySelector("#stage")?.dataset.variant===v',arg=variant,timeout=10000)
       else: page.wait_for_function("!document.querySelector('#stage')?.hasAttribute('data-variant')",timeout=5000)
       page.wait_for_timeout(250)
       state=page.evaluate(COLLECT);items=[]
       root_node=cdp.send('DOM.getDocument',{'depth':-1,'pierce':True})['root']['nodeId']
       for item in state:
        node=cdp.send('DOM.querySelector',{'nodeId':root_node,'selector':f"[data-contrast-evidence='{item['key']}']"})['nodeId']
        matched=cdp.send('CSS.getMatchedStylesForNode',{'nodeId':node})
        def slim(rule):
         h=rule.get('rule',{}); style=h.get('style',{}); props=[{'name':x.get('name'),'value':x.get('value'),'important':x.get('important',False),'parsedOk':x.get('parsedOk')} for x in style.get('cssProperties',[]) if x.get('name') in ('color','background','background-color','opacity','-webkit-text-fill-color','text-shadow')]
         if not props:return None
         return {'selector':h.get('selectorList',{}).get('text'),'origin':h.get('origin'),'sourceLine':style.get('range',{}).get('startLine'),'declarations':props}
        matched_rules=[x for x in (slim(r) for r in matched.get('matchedCSSRules',[])) if x]
        inherited=[]
        for group in matched.get('inherited',[]):
         rows=[x for x in (slim(r) for r in group.get('matchedCSSRules',[])) if x]
         if rows:inherited.append({'node':group.get('inlineStyle'),'rules':rows})
        pseudo_rules=[]
        for pseudo in matched.get('pseudoElements',[]):
         pseudo_id=pseudo.get('pseudoType');rows=[x for x in (slim(r) for r in pseudo.get('matches',[])) if x]
         if rows:pseudo_rules.append({'pseudoType':pseudo_id,'rules':rows})
        items.append({**item,'cascade':{'matchingRulesInProtocolOrder':matched_rules,'inheritedRules':inherited,'pseudoRules':pseudo_rules,'note':'Computed values above are browser truth; CDP matched rules are cascade candidates. Resolve the actual winner by computed value, specificity, importance and source order.'}})
       records.append({'slug':slug,'variant':variant,'viewport':[width,height],'stageVariant':page.locator('#stage').get_attribute('data-variant'),'items':items,'shortfallCount':sum(x['shortfall'] for x in items),'uncertainBackgroundCount':sum(x['gradientOrImageInAncestor'] for x in items)})
      except Exception as e:records.append({'slug':slug,'variant':variant,'viewport':[width,height],'error':str(e)[:500]})
      finally:ctx.close()
   browser.close()
 finally:server.terminate();server.wait(timeout=3)
 Path(a.out).write_text(json.dumps({'schema':'coacus.contrast-cascade-capture.v1','scope':'Frozen Nordic and Flat Design base sheets and their six registered variants; viewports 1280x900 and 375x800.','records':records},ensure_ascii=False,indent=2)+'\n')
 errors=[r for r in records if r.get('error')]
 print(f'records={len(records)} errors={len(errors)} shortfall={sum(r.get("shortfallCount",0) for r in records)}; output={a.out}')
 if errors:sys.exit(1)
if __name__=='__main__':main()
