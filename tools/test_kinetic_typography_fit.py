"""The mounted character animation must fit the alternate's actual columns."""
import tempfile
import unittest
from pathlib import Path
from playwright.sync_api import sync_playwright
import test_variants_matrix as matrix


class KineticFit(unittest.TestCase):
    def test_words_and_hover_stay_inside_the_title(self):
        with tempfile.TemporaryDirectory(prefix='kinetic-fit-') as tmp:
            root=Path(tmp)/'review';matrix.generate_review_fixture(root,['kinetic-typography'])
            server=matrix.FixtureServer(root)
            try:
                with sync_playwright() as p:
                    browser=p.chromium.launch(executable_path=matrix.chromium_executable(),headless=True)
                    page=browser.new_page()
                    page.add_init_script("localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true');")
                    for motion in ('reduce','no-preference'):
                        page.emulate_media(reduced_motion=motion)
                        for w,h in ((375,812),(768,1024),(1080,2550),(1280,900),(2550,1080)):
                            page.set_viewport_size({'width':w,'height':h})
                            page.goto(f'{server.base_url}/#kinetic-typography')
                            page.wait_for_function("document.querySelector('#stage')?.dataset.style==='kinetic-typography'")
                            if page.locator('#appearance-trigger').get_attribute('aria-pressed')!='true':page.locator('#appearance-trigger').click()
                            page.wait_for_function("document.querySelector('#stage')?.dataset.variant==='alternate'")
                            page.locator('.kt-word').first.wait_for()
                            page.evaluate('document.fonts.ready')
                            page.wait_for_function("document.querySelector('.display').classList.contains('kt-in')")
                            page.locator('.kt-word').nth(1).locator('.kt-ch').first.hover(force=True)
                            page.wait_for_timeout(350)
                            paint=page.locator('.display').evaluate("""e=>{
                              const r=e.getBoundingClientRect();
                              return {width:e.clientWidth,scroll:e.scrollWidth,words:Array.from(e.querySelectorAll('.kt-word')).map(w=>({width:w.getBoundingClientRect().width,scroll:w.scrollWidth})),outside:Array.from(e.querySelectorAll('.kt-ch')).filter(c=>{const a=c.getBoundingClientRect();return a.left<r.left-2||a.right>r.right+2}).map(c=>c.textContent)};
                            }""")
                            with self.subTest(viewport=(w,h),motion=motion):
                                self.assertLessEqual(paint['scroll'],paint['width']+2,paint)
                                self.assertFalse(paint['outside'],paint)
                                self.assertTrue(all(x['scroll']<=paint['width']+2 for x in paint['words']),paint)
                            colors=page.evaluate("""()=>{
                              const stage=document.querySelector('#stage'),probe=document.createElement('span');probe.style.color='var(--accent)';stage.append(probe);const accent=getComputedStyle(probe).color;probe.remove();
                              return {accent,hover:getComputedStyle(document.querySelector('.kt-ch:hover')).webkitTextFillColor};
                            }""")
                            with self.subTest(viewport=(w,h),motion=motion,content='hover palette'):
                                self.assertEqual(colors['hover'],colors['accent'],colors)
                            page.locator('.kpi').first.hover(force=True)
                            page.wait_for_timeout(350)
                            kpi=page.locator('.kpi-value').first.evaluate('e=>getComputedStyle(e).webkitTextFillColor')
                            self.assertEqual(kpi,colors['accent'])
                    browser.close()
            finally:server.close()


if __name__=='__main__':unittest.main()
