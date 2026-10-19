"""Capture every authored theme at real viewport sizes and record layout evidence."""
import argparse
import json
from pathlib import Path
import sys
import tempfile

from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
import test_variants_matrix as matrix
from test_dashboard_column_alignment import dashboard_geometry

VIEWPORTS=((375,812),(768,1024),(1080,2550),(1280,900),(2550,1080))
PAINT_JS="""() => {
 const stage=document.querySelector('#stage');
 const value=(selector,pseudo,property)=>{const e=stage.querySelector(selector);return e?getComputedStyle(e,pseudo).getPropertyValue(property):null};
 const tokens={};
 for(const name of ['bg','surface','surface-2','fg','muted','accent','accent-fg','border','ok','warn','danger','focus']){
   const probe=document.createElement('span');probe.style.color=`var(--${name})`;stage.append(probe);tokens[name]=getComputedStyle(probe).color;probe.remove();
 }
 return {tokens,paint:{
   switchThumb:value('input.switch','::after','background-color'),
   switchTrack:value('input.switch',null,'background-color'),
   switchBorder:value('input.switch','::after','border-top-color'),
   checkboxAccent:value('input[type="checkbox"]:not(.switch)',null,'accent-color'),
   sliderAccent:value('input[type="range"]',null,'accent-color'),
   tableHeader:value('th',null,'border-bottom-color'),
   tableRow:value('td',null,'border-bottom-color'),
   chartBar:value('.bars i',null,'background-color')
 }};
}"""


def make_sheet(output,slug,cases):
    cell_w,cell_h=260,1350
    sheet=Image.new('RGB',(cell_w*len(VIEWPORTS),cell_h*2),'#dadde1')
    draw=ImageDraw.Draw(sheet)
    for case in cases:
        col=VIEWPORTS.index(tuple(case['viewport']))
        row=matrix.STATES.index(case['variant'])
        x,y=col*cell_w,row*cell_h
        draw.text((x+8,y+6),f"{slug} / {case['variant']}",fill='black')
        draw.text((x+8,y+22),f"{case['viewport'][0]} x {case['viewport'][1]}",fill='black')
        with Image.open(output/case['image']) as shot:
            shot.thumbnail((cell_w-12,cell_h-48))
            sheet.paste(shot,(x+6,y+42))
    path=output/'sheets'/f'{slug}.jpg'
    path.parent.mkdir(exist_ok=True)
    sheet.save(path,quality=90)


def run(slugs,output,capture=True):
    output.mkdir(parents=True,exist_ok=True)
    (output/'screenshots').mkdir(exist_ok=True)
    (output/'cases').mkdir(exist_ok=True)
    records=[]
    with tempfile.TemporaryDirectory(prefix='theme-visual-') as temporary:
        root=Path(temporary)/'review'
        matrix.generate_review_fixture(root,slugs)
        server=matrix.FixtureServer(root)
        try:
            with sync_playwright() as p:
                browser=p.chromium.launch(executable_path=matrix.chromium_executable(),headless=True)
                page=browser.new_page(reduced_motion='reduce',device_scale_factor=1)
                page.set_default_timeout(10000)
                page.add_init_script("localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true');localStorage.setItem('coacus-locale','pt-BR');")
                for slug in slugs:
                    source=(matrix.ROOT/'styles/variants/source'/f'{slug}.css').read_text()
                    paired='"form activity"' in source
                    cases=[]
                    sizes=VIEWPORTS if capture else ((2550,1080),)
                    for viewport in sizes:
                        page.set_viewport_size(dict(zip(('width','height'),viewport)))
                        for state in matrix.STATES:
                            page.goto(f'{server.base_url}/#{slug}')
                            page.wait_for_function('s=>document.querySelector("#stage")?.dataset.style===s',arg=slug)
                            expected=state=='alternate'
                            if (page.locator('#appearance-trigger').get_attribute('aria-pressed')=='true')!=expected:
                                page.locator('#appearance-trigger').click()
                            page.wait_for_function('v=>(document.querySelector("#stage")?.dataset.variant==="alternate")===v',arg=expected)
                            page.evaluate('document.fonts.ready')
                            page.locator('#stage').evaluate('e=>e.scrollTop=0')
                            page.locator('.switch').evaluate('e=>e.checked=true')
                            record={'slug':slug,'variant':state,'viewport':viewport,'geometry':dashboard_geometry(page),'colors':page.evaluate(PAINT_JS)}
                            page.locator('.switch').evaluate('e=>e.checked=false')
                            record['switchOff']=page.evaluate(PAINT_JS)['paint']['switchTrack']
                            page.locator('.switch').evaluate('e=>e.checked=true')
                            issues=[]
                            matrix.box_containment(page,slug,state,viewport[0],issues)
                            record['containment']=issues
                            record['bounds']=matrix.bounds(page)
                            g=record['geometry']
                            record['columnErrors']=[]
                            if paired and expected and viewport[0]>=1200:
                                if abs(g['form']['top']-g['activity']['top'])>3:record['columnErrors'].append('project panels do not share a row')
                                if abs(g['form']['left']-g['pane']['left'])>3 or abs(g['activity']['right']-g['pane']['right'])>3:record['columnErrors'].append('project panels do not follow the dashboard columns')
                            if capture:
                                # Keep viewport height for scene sizing. Extend the stage backdrop
                                # behind overflow solely while taking the full-content image.
                                height=page.locator('#stage').evaluate('e=>e.clientHeight')
                                backdrop=page.locator('#stage').evaluate('e=>getComputedStyle(e).background')
                                style=page.add_style_tag(content=f'body{{background:{backdrop}!important}} html,body{{height:auto!important;overflow:visible!important;scrollbar-width:none!important}} .shell{{height:auto!important;align-items:start!important}} #gallery{{height:100vh!important}} #stage{{flex:none!important;height:{height}px!important;overflow:visible!important;scroll-snap-type:none!important}}')
                                filename=f'screenshots/{slug}-{state}-{viewport[0]}x{viewport[1]}.png'
                                page.locator('#stage .app').screenshot(path=str(output/filename),timeout=20000)
                                record['image']=filename
                                style.evaluate('e=>e.remove()')
                            records.append(record)
                            cases.append(record)
                    if capture:make_sheet(output,slug,cases)
                    (output/'cases'/f'{slug}.json').write_text(json.dumps(cases,ensure_ascii=False,indent=2)+'\n')
                    print(f'{slug}: {len(cases)} cases',flush=True)
                browser.close()
        finally:server.close()
    report={'viewports':VIEWPORTS,'styles':len(slugs),'checked':len(records),'cases':records}
    (output/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    if capture:
        links='\n'.join(f'<h2>{slug}</h2><a href="sheets/{slug}.jpg"><img loading="lazy" src="sheets/{slug}.jpg" style="width:100%;max-width:1300px"></a>' for slug in slugs)
        (output/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>Revisão visual dos temas</title><h1>Temas: padrão e alternativa em cinco resoluções</h1>'+links)
    print(json.dumps({'report':str(output/'report.json'),'checked':len(records),'columnErrors':sum(bool(x['columnErrors']) for x in records),'containmentCases':sum(bool(x['containment']) for x in records)}),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--slugs',nargs='*')
    parser.add_argument('--output',type=Path,required=True)
    parser.add_argument('--paints-only',action='store_true')
    args=parser.parse_args()
    run(args.slugs or matrix.inventory()[0],args.output.resolve(),not args.paints_only)
