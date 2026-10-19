"""Regression for paired dashboard panels in wide and portrait viewports."""
import sys
import tempfile
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
import test_variants_matrix as matrix


SLUGS = ("linear-saas", "flat-design", "card-based-ui", "memphis", "hand-drawn-sketch", "blueprint-cad-schematic", "glassmorphism", "frutiger-aero", "aurora-mesh-gradient", "gradient-duotone", "grain-noise-texture", "editorial-archive-luxury")


def dashboard_geometry(page):
    return page.evaluate("""() => {
      const rect = selector => {
        const e=document.querySelector(selector), r=e.getBoundingClientRect();
        return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width};
      };
      return {
        pane:rect('#view-painel'),
        form:rect('#view-painel [data-label-panel="formulário"]'),
        activity:rect('#view-painel [data-label-panel="registro"]')
      };
    }""")


class DashboardColumnAlignment(unittest.TestCase):
    def test_project_panels_share_the_desktop_row_and_stack_in_portrait(self):
        with tempfile.TemporaryDirectory(prefix="dashboard-columns-") as temporary:
            root=Path(temporary)/"review"
            matrix.generate_review_fixture(root, SLUGS)
            server=matrix.FixtureServer(root)
            try:
                with sync_playwright() as p:
                    browser=p.chromium.launch(executable_path=matrix.chromium_executable(),headless=True)
                    page=browser.new_page(reduced_motion="reduce")
                    page.add_init_script("localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true');localStorage.setItem('coacus-locale','pt-BR');")
                    for width,height in ((2550,1080),(1280,900),(1080,2550)):
                        page.set_viewport_size({"width":width,"height":height})
                        for slug in SLUGS:
                            page.goto(f"{server.base_url}/#{slug}")
                            page.wait_for_function("s=>document.querySelector('#stage')?.dataset.style===s",arg=slug)
                            if page.locator('#appearance-trigger').get_attribute('aria-pressed')!='true':
                                page.locator('#appearance-trigger').click()
                            page.wait_for_function("document.querySelector('#stage')?.dataset.variant==='alternate'")
                            page.evaluate('document.fonts.ready')
                            page.mouse.move(0,0)
                            page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                            g=dashboard_geometry(page)
                            viewport_fits=page.locator('#stage').evaluate('e=>e.getBoundingClientRect().bottom<=innerHeight+1')
                            self.assertTrue(viewport_fits,slug)
                            with self.subTest(slug=slug,width=width):
                                if width>=1200:
                                    self.assertAlmostEqual(g['form']['top'],g['activity']['top'],delta=2,msg=g)
                                    self.assertAlmostEqual(g['form']['left'],g['pane']['left'],delta=2,msg=g)
                                    self.assertAlmostEqual(g['activity']['right'],g['pane']['right'],delta=2,msg=g)
                                    self.assertLess(g['form']['right'],g['activity']['left'],g)
                                else:
                                    beside=g['activity']['left']>=g['form']['right']-2
                                    below=g['activity']['top']>=g['form']['bottom']-2
                                    self.assertTrue(beside or below,g)
                                    self.assertGreaterEqual(g['form']['left'],g['pane']['left']-2,g)
                                    self.assertLessEqual(g['activity']['right'],g['pane']['right']+2,g)
                            if slug=='linear-saas':
                                values=page.locator('.kpi-value').evaluate_all('els=>els.map(e=>({height:e.getBoundingClientRect().height,font:parseFloat(getComputedStyle(e).fontSize)}))')
                                with self.subTest(slug=slug,width=width,content='unbroken KPI values'):
                                    self.assertTrue(all(v['height']<v['font']*1.8 for v in values),values)
                            links=page.locator('#view-painel .feature').evaluate_all('els=>els.slice(0,2).map(e=>({top:e.getBoundingClientRect().top,bottom:e.querySelector(".link-more").getBoundingClientRect().bottom}))')
                            if len(links)==2 and abs(links[0]['top']-links[1]['top'])<2:
                                with self.subTest(slug=slug,width=width,content='feature link alignment'):
                                    self.assertAlmostEqual(links[0]['bottom'],links[1]['bottom'],delta=2,msg=links)
                            if slug in ('aurora-mesh-gradient','gradient-duotone','grain-noise-texture'):
                                inset=page.locator('.topbar').evaluate("e=>{const r=e.getBoundingClientRect();return Array.from(e.children).filter(c=>c.getBoundingClientRect().width).map(c=>{const a=c.getBoundingClientRect();return Math.min(a.left-r.left,r.right-a.right)})}")
                                with self.subTest(slug=slug,width=width,content='topbar inset'):
                                    self.assertGreaterEqual(min(inset),12,inset)
                            if slug in ('blueprint-cad-schematic','glassmorphism','frutiger-aero'):
                                page.locator('.switch').check()
                                page.mouse.move(0,0)
                                page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                                colors=page.evaluate("""()=>{
                                  const stage=document.querySelector('#stage'),probe=document.createElement('span');
                                  const token=name=>{probe.style.color=`var(--${name})`;stage.append(probe);const c=getComputedStyle(probe).color;probe.remove();return c};
                                  return {accent:token('accent'),accentFg:token('accent-fg'),border:token('border'),thumb:getComputedStyle(stage.querySelector('.switch'),'::after').backgroundColor,track:getComputedStyle(stage.querySelector('.switch')).backgroundColor,header:getComputedStyle(stage.querySelector('th')).borderBottomColor,row:getComputedStyle(stage.querySelector('td')).borderBottomColor};
                                }""")
                                with self.subTest(slug=slug,width=width,control='switch and table'):
                                    self.assertEqual(colors['track'],colors['accent'],colors)
                                    self.assertEqual(colors['thumb'],colors['accentFg'],colors)
                                    self.assertEqual(colors['header'],colors['border'],colors)
                                    self.assertEqual(colors['row'],colors['border'],colors)
                                page.locator('.switch').uncheck()
                                page.mouse.move(0,0)
                                page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                                off=page.locator('.switch').evaluate('e=>getComputedStyle(e).backgroundColor')
                                with self.subTest(slug=slug,width=width,control='on/off color'):
                                    self.assertNotEqual(off,colors['track'],colors)
                    browser.close()
            finally:
                server.close()


if __name__=='__main__':
    unittest.main()
