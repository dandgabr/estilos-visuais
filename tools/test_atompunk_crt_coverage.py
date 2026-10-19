"""The CRT paint must cover the complete app while its viewport scrolls."""
import tempfile
import unittest
from pathlib import Path
from playwright.sync_api import sync_playwright
import test_variants_matrix as matrix


class AtompunkCRT(unittest.TestCase):
    def test_overlay_covers_app_after_scroll_and_resize(self):
        with tempfile.TemporaryDirectory(prefix='atompunk-crt-') as tmp:
            root=Path(tmp)/'review';matrix.generate_review_fixture(root,['atompunk'])
            server=matrix.FixtureServer(root)
            try:
                with sync_playwright() as p:
                    browser=p.chromium.launch(executable_path=matrix.chromium_executable(),headless=True)
                    page=browser.new_page(reduced_motion='no-preference')
                    page.add_init_script("localStorage.setItem('coacus-auto-tour','false');localStorage.setItem('coacus-welcome-tour','true');")
                    page.goto(f'{server.base_url}/#atompunk')
                    page.wait_for_function("document.querySelector('#stage')?.dataset.style==='atompunk'")
                    page.locator('#appearance-trigger').click()
                    page.wait_for_function("document.querySelector('#stage')?.dataset.variant==='alternate'")
                    page.locator('.fx-atompunk-crt').wait_for()
                    page.evaluate('document.fonts.ready')
                    for width,height in ((2550,1080),(1080,2550),(768,1024),(375,812)):
                        page.set_viewport_size({'width':width,'height':height})
                        for position in (0,.5,1):
                            page.locator('#stage').evaluate('(e,p)=>e.scrollTop=(e.scrollHeight-e.clientHeight)*p',position)
                            paint=page.evaluate("""()=>{
                              const a=document.querySelector('.app').getBoundingClientRect(),b=document.querySelector('.fx-atompunk-crt').getBoundingClientRect();
                              return {app:{top:a.top,bottom:a.bottom,left:a.left,right:a.right},overlay:{top:b.top,bottom:b.bottom,left:b.left,right:b.right}};
                            }""")
                            with self.subTest(viewport=(width,height),scroll=position):
                                self.assertLessEqual(paint['overlay']['top'],paint['app']['top']+2,paint)
                                self.assertGreaterEqual(paint['overlay']['bottom'],paint['app']['bottom']-2,paint)
                                self.assertLessEqual(paint['overlay']['left'],paint['app']['left']+2,paint)
                                self.assertGreaterEqual(paint['overlay']['right'],paint['app']['right']-2,paint)
                    page.goto(f'{server.base_url}/#flat-design')
                    page.wait_for_function("document.querySelector('#stage')?.dataset.style==='flat-design'")
                    self.assertEqual(page.locator('.fx-atompunk-crt,.fx-atompunk-geiger').count(),0)
                    browser.close()
            finally:server.close()


if __name__=='__main__':unittest.main()
