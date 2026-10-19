"""A wheel gesture advances between full-width story scenes in both modes."""
import tempfile
import unittest
from pathlib import Path
from playwright.sync_api import sync_playwright
import test_variants_matrix as matrix


class StoryScenes(unittest.TestCase):
    def test_scene_snap_and_other_tabs(self):
        with tempfile.TemporaryDirectory(prefix='story-scenes-') as tmp:
            root=Path(tmp)/'review';matrix.generate_review_fixture(root,['scrollytelling'])
            server=matrix.FixtureServer(root)
            try:
                with sync_playwright() as p:
                    browser=p.chromium.launch(executable_path=matrix.chromium_executable(),headless=True)
                    page=browser.new_page()
                    page.add_init_script("localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true');")
                    for variant in matrix.STATES:
                        for width,height in ((1280,900),(2550,1080),(768,1024)):
                            page.set_viewport_size({'width':width,'height':height})
                            page.goto(f'{server.base_url}/#scrollytelling')
                            page.wait_for_function("document.querySelector('#stage')?.dataset.style==='scrollytelling'")
                            if (page.locator('#appearance-trigger').get_attribute('aria-pressed')=='true')!=(variant=='alternate'):page.locator('#appearance-trigger').click()
                            page.wait_for_function('v=>(document.querySelector("#stage")?.dataset.variant==="alternate")===v',arg=variant=='alternate')
                            page.locator('.nav-tab[data-view="painel"]').click()
                            page.wait_for_function("document.querySelector('#stage')?.dataset.fx==='on'")
                            page.evaluate('document.fonts.ready')
                            page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                            stage=page.locator('#stage')
                            self.assertEqual(stage.evaluate('e=>getComputedStyle(e).scrollSnapType'),'y mandatory')
                            stage.evaluate('e=>e.scrollTo({top:0,behavior:"instant"})')
                            boxes=page.locator('#view-painel > section').evaluate_all('es=>es.map(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right}))')
                            with self.subTest(variant=variant,viewport=(width,height)):
                                self.assertGreaterEqual(boxes[1]['top'],boxes[0]['bottom']-2,boxes)
                                self.assertAlmostEqual(boxes[0]['left'],boxes[1]['left'],delta=2)
                                self.assertAlmostEqual(boxes[0]['right'],boxes[1]['right'],delta=2)
                            r=stage.bounding_box();page.mouse.move(r['x']+r['width']/2,r['y']+r['height']/2)
                            page.mouse.wheel(0,220)
                            with self.subTest(variant=variant,viewport=(width,height),action='wheel advances one scene'):
                                try:
                                    page.wait_for_function("""()=>{const stage=document.querySelector('#stage'),scene=document.querySelector('#view-painel > section:nth-of-type(2)');return Math.abs(scene.getBoundingClientRect().top-stage.getBoundingClientRect().top-parseFloat(getComputedStyle(stage).scrollPaddingTop))<3}""",timeout=4000)
                                except Exception:
                                    self.fail(page.evaluate("""()=>{const s=document.querySelector('#stage'),r=s.getBoundingClientRect();return {scroll:s.scrollTop,height:s.clientHeight,offset:getComputedStyle(s).scrollPaddingTop,scenes:[...document.querySelectorAll('#view-painel > section')].map(e=>({top:e.getBoundingClientRect().top-r.top,height:e.getBoundingClientRect().height}))}}"""))
                            # Hit testing includes the real stacking contexts of the menu.
                            bar=page.locator('.fx-st-bar')
                            above_menu=bar.evaluate("e=>{e.style.pointerEvents='auto';const r=e.getBoundingClientRect();const hit=document.elementFromPoint(r.left+Math.min(80,r.width/4),r.top+2);const visible=e===hit||e.contains(hit);e.style.removeProperty('pointer-events');return visible}")
                            with self.subTest(variant=variant,viewport=(width,height),action='progress above sticky menu'):
                                self.assertTrue(above_menu)
                            page.locator('.nav-tab[data-view="projetos"]').click()
                            self.assertEqual(stage.evaluate('e=>getComputedStyle(e).scrollSnapType'),'none')
                            self.assertTrue(page.locator('#view-painel').evaluate('e=>e.hidden'))
                        # Content taller than a phone screen must stay reachable.
                        page.set_viewport_size({'width':375,'height':812})
                        page.locator('.nav-tab[data-view="painel"]').click()
                        page.locator('#view-painel form button[type="submit"]').evaluate('e=>e.scrollIntoView({block:"center",behavior:"instant"})')
                        page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                        visible=page.locator('#view-painel form button[type="submit"]').evaluate('e=>{const a=e.getBoundingClientRect(),b=document.querySelector("#stage").getBoundingClientRect();return a.top>=b.top&&a.bottom<=b.bottom}')
                        self.assertTrue(visible,variant)
                    page.goto(f'{server.base_url}/#flat-design')
                    page.wait_for_function("document.querySelector('#stage')?.dataset.style==='flat-design'")
                    self.assertEqual(page.locator('.fx-st-bar,.fx-st-dots').count(),0)
                    self.assertEqual(page.locator('#stage').evaluate('e=>e.style.getPropertyValue("--story-scene-height")'),'')
                    browser.close()
            finally:server.close()


if __name__=='__main__':unittest.main()
