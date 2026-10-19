"""Exercise review/release appearance gating in an isolated generated fixture."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import threading
import unittest

ROOT = Path(__file__).resolve().parents[2]
TOOLS = ROOT / "tools"
sys.path.insert(0, str(TOOLS))

from chromium_runtime import chromium_executable  # noqa: E402
from playwright.sync_api import sync_playwright  # noqa: E402


SLUG = "swiss-web-minimalism"
PSEUDO_TARGET_SLUGS = ("swiss-web-minimalism", "lunarpunk")


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format, *_args):
        pass


class FixtureServer:
    def __init__(self, root: Path):
        self.server = ThreadingHTTPServer(
            ("127.0.0.1", 0), partial(QuietHandler, directory=str(root))
        )
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.server.server_port}"

    def close(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)


class VariantFixtureRuntimeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temporary = tempfile.TemporaryDirectory(prefix="coacus-variant-fixture-test-")
        root = Path(cls.temporary.name)
        cls.review_root = root / "review"
        generated = subprocess.run(
            [
                sys.executable,
                str(TOOLS / "generate_variant_design.py"),
                "--review-root",
                str(cls.review_root),
                "--slugs",
                *PSEUDO_TARGET_SLUGS,
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        if generated.returncode:
            raise AssertionError(f"review fixture generation failed: {generated.stderr}")

        registry_path = cls.review_root / "styles/variants/registry.js"
        registry_text = registry_path.read_text(encoding="utf-8")
        # Exercise candidate gating even after the actual product is approved.
        registry_text = registry_text.replace('"status": "approved"', '"status": "ready_for_review"')
        registry_path.write_text(registry_text, encoding="utf-8")
        for slug in PSEUDO_TARGET_SLUGS:
            cls.assert_ready_candidate_in_registry(registry_text, slug)
            source = json.loads(
                (cls.review_root / "styles/variants/source" / f"{slug}.json").read_text(
                    encoding="utf-8"
                )
            )
            selector = source["motion"]["element"]["selector"]
            if "::before" not in selector and "::after" not in selector:
                raise AssertionError(f"{slug} fixture no longer exercises a pseudo-element target")
            if json.dumps(selector)[1:-1] not in registry_text:
                raise AssertionError(f"{slug} generated registry lost its pseudo-element target")

        # This copied fixture intentionally retains a ready_for_review candidate
        # but carries a release marker, to prove runtime fail-closed behavior.
        cls.release_root = root / "release-policy"
        shutil.copytree(cls.review_root, cls.release_root)
        release_registry = cls.release_root / "styles/variants/registry.js"
        release_text = release_registry.read_text(encoding="utf-8")
        if 'export const BUILD_KIND = "review";' not in release_text:
            raise AssertionError("generated fixture does not declare BUILD_KIND=review")
        release_registry.write_text(
            release_text.replace(
                'export const BUILD_KIND = "review";',
                'export const BUILD_KIND = "release";',
                1,
            ),
            encoding="utf-8",
        )

    @classmethod
    def tearDownClass(cls):
        cls.temporary.cleanup()

    @staticmethod
    def assert_ready_candidate_in_registry(registry_text, slug):
        candidate = registry_text.split(f'"{slug}": {{', 1)[1].split("\n  },", 1)[0]
        if '"alternate"' not in candidate or '"status": "ready_for_review"' not in candidate:
            raise AssertionError(f"{slug} review fixture must register its ready_for_review alternate")
        if 'export const BUILD_KIND = "review";' not in registry_text:
            raise AssertionError("generated fixture does not declare BUILD_KIND=review")

    def test_swiss_review_toggle_migrates_legacy_and_preserves_url(self):
        review_server = FixtureServer(self.review_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path=chromium_executable(), headless=True
                )
                try:
                    review = browser.new_page(
                        viewport={"width": 1280, "height": 900}, reduced_motion="reduce"
                    )
                    review.set_default_timeout(5000)
                    review.add_init_script(
                        "localStorage.setItem('coacus-appearance-swiss-web-minimalism','c2');"
                        "localStorage.setItem('coacus-locale','pt-BR');"
                        "localStorage.setItem('coacus-auto-tour','false');"
                        "localStorage.setItem('coacus-welcome-tour','true');"
                    )
                    review_url = f"{review_server.base_url}/#{SLUG}/projetos"
                    review.goto(review_url)
                    review.locator(f'#stage[data-style="{SLUG}"]').wait_for()
                    review.wait_for_function(
                        "localStorage.getItem('coacus-appearance-swiss-web-minimalism') === 'default'"
                    )
                    review.wait_for_function(
                        "document.querySelector('#appearance-live')?.textContent.trim()"
                    )
                    review_button = review.locator("#appearance-trigger")
                    self.assertEqual(review_button.get_attribute("aria-disabled"), "false")
                    self.assertEqual(review_button.get_attribute("aria-pressed"), "false")
                    self.assertIsNone(review.locator("#stage").get_attribute("data-variant"))
                    default_state = review.locator("#appearance-state").inner_text()
                    self.assertIn("claro", default_state.lower())
                    default_live = review.locator("#appearance-live").inner_text()

                    original_url = review.url
                    original_hash = review.evaluate("location.hash")
                    review_button.click()
                    review.wait_for_function(
                        "document.querySelector('#stage')?.dataset.variant === 'alternate'"
                    )
                    self.assertEqual(review.url, original_url)
                    self.assertEqual(review.evaluate("location.hash"), original_hash)
                    self.assertEqual(review_button.get_attribute("aria-pressed"), "true")
                    alternate_state = review.locator("#appearance-state").inner_text()
                    self.assertNotEqual(alternate_state, default_state)
                    self.assertIn("escuro", alternate_state.lower())
                    live_alternate = review.locator("#appearance-live").inner_text()
                    self.assertTrue(live_alternate.strip(), "alternate state must be announced")
                    self.assertNotEqual(live_alternate, default_live)
                    stylesheet = review.locator(
                        'link[data-variant-stylesheet="alternate"]'
                    )
                    stylesheet.wait_for(state="attached")
                    self.assertIn(
                        f"styles/variants/{SLUG}.css", stylesheet.get_attribute("href")
                    )
                    self.assertEqual(
                        review.evaluate(
                            "document.querySelector('link[data-variant-stylesheet=alternate]')"
                            ".sheet !== null"
                        ),
                        True,
                    )
                    self.assertEqual(
                        review.evaluate(
                            "localStorage.getItem('coacus-appearance-swiss-web-minimalism')"
                        ),
                        "alternate",
                    )

                    self.assertTrue(review.locator('#view-painel').evaluate('e=>e.hidden'))
                    review.wait_for_function(
                        "document.querySelector('#t-recursos')?.getAttribute('data-motion-visible') === 'false'"
                    )

                    review_button.click()
                    review.wait_for_function(
                        "document.querySelector('#stage')?.dataset.variant === undefined"
                    )
                    self.assertEqual(review_button.get_attribute("aria-pressed"), "false")
                    self.assertIn("Padrão", review.locator("#appearance-state").inner_text())
                    self.assertNotIn(
                        'link[data-variant-stylesheet="alternate"]',
                        review.locator("head").inner_html(),
                    )
                    self.assertEqual(review.url, original_url)
                    self.assertEqual(review.evaluate("location.hash"), original_hash)
                    self.assertEqual(
                        review.evaluate(
                            "localStorage.getItem('coacus-appearance-swiss-web-minimalism')"
                        ),
                        "default",
                    )

                finally:
                    browser.close()
        finally:
            review_server.close()

    def test_lunarpunk_pseudo_element_motion_target_does_not_break_toggle(self):
        review_server = FixtureServer(self.review_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path=chromium_executable(), headless=True
                )
                try:
                    page = browser.new_page(
                        viewport={"width": 1280, "height": 900}, reduced_motion="reduce"
                    )
                    page.set_default_timeout(5000)
                    page.add_init_script(
                        "localStorage.setItem('coacus-locale','pt-BR');"
                        "localStorage.setItem('coacus-auto-tour','false');"
                        "localStorage.setItem('coacus-welcome-tour','true');"
                    )
                    page.goto(f"{review_server.base_url}/#lunarpunk/painel")
                    page.locator('#stage[data-style="lunarpunk"]').wait_for()
                    errors = []
                    page.on("pageerror", lambda error: errors.append(str(error)))
                    page.locator("#appearance-trigger").click()
                    page.wait_for_function(
                        "document.querySelector('#stage')?.dataset.variant === 'alternate'"
                    )
                    self.assertFalse(errors, f"runtime initialization threw: {errors}")
                    self.assertEqual(page.locator("#appearance-trigger").get_attribute("aria-pressed"), "true")
                    page.locator('link[data-variant-stylesheet="alternate"]').wait_for(state="attached")
                    self.assertTrue(
                        page.locator('link[data-variant-stylesheet="alternate"]').evaluate(
                            "element => element.sheet !== null"
                        )
                    )
                    page.locator(".hero").scroll_into_view_if_needed()
                    page.wait_for_function(
                        "document.querySelector('.hero')?.getAttribute('data-motion-visible') === 'false'"
                    )
                finally:
                    browser.close()
        finally:
            review_server.close()

    def test_variant_motion_pauses_and_resumes_when_document_becomes_hidden(self):
        """Exercise the runtime's visibilitychange lifecycle branch in Chromium.

        Headless Chromium's Page.setWebLifecycleState(frozen) freezes script
        execution but does not change document.hidden. The test therefore
        overrides the read-only visibility property in the isolated page and
        dispatches the same visibilitychange event the browser emits. This
        keeps the application/runtime real while making the lifecycle input
        deterministic.
        """
        review_server = FixtureServer(self.review_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path=chromium_executable(), headless=True
                )
                try:
                    page = browser.new_page(
                        viewport={"width": 1280, "height": 900}, reduced_motion="no-preference"
                    )
                    page.set_default_timeout(5000)
                    page.add_init_script("""
                        Object.defineProperty(document, 'hidden', {
                          configurable: true,
                          get: () => window.__testDocumentHidden ?? false
                        });
                        window.__setDocumentHiddenForTest = (hidden) => {
                          window.__testDocumentHidden = hidden;
                          document.dispatchEvent(new Event('visibilitychange'));
                        };
                        localStorage.setItem('coacus-locale', 'pt-BR');
                        localStorage.setItem('coacus-auto-tour', 'false');
                        localStorage.setItem('coacus-welcome-tour', 'true');
                    """)
                    page.goto(f"{review_server.base_url}/#lunarpunk/painel")
                    page.locator('#stage[data-style="lunarpunk"]').wait_for()
                    page.locator("#appearance-trigger").click()
                    page.wait_for_function(
                        "document.querySelector('#stage')?.dataset.variant === 'alternate'"
                    )
                    stage = page.locator("#stage")
                    page.wait_for_function(
                        "document.querySelector('#stage')?.dataset.motionActive === 'true'"
                    )
                    self.assertEqual(page.evaluate("document.hidden"), False)
                    self.assertEqual(stage.get_attribute("data-motion-active"), "true")
                    page.wait_for_function(
                        "document.querySelector('.hero')?.getAttribute('data-motion-visible') === 'true'"
                    )
                    page.wait_for_function("""
                        getComputedStyle(document.querySelector('.hero'), '::before').animationName
                          === 'lunar-phase-sweep' &&
                        getComputedStyle(document.querySelector('.hero'), '::before').animationPlayState
                          === 'running' &&
                        getComputedStyle(document.querySelector('.app'), '::before').animationName
                          === 'lunar-constellation-drift' &&
                        getComputedStyle(document.querySelector('.app'), '::before').animationPlayState
                          === 'running'
                    """)

                    page.evaluate("window.__setDocumentHiddenForTest(true)")
                    page.wait_for_function("document.hidden === true")
                    page.wait_for_function(
                        "document.querySelector('#stage')?.dataset.motionActive === 'false'"
                    )
                    page.wait_for_function(
                        "document.querySelector('.hero')?.getAttribute('data-motion-visible') === 'false'"
                    )
                    page.wait_for_function("""
                        getComputedStyle(document.querySelector('.hero'), '::before').animationPlayState
                          === 'paused' &&
                        getComputedStyle(document.querySelector('.app'), '::before').animationPlayState
                          === 'paused'
                    """)

                    page.evaluate("window.__setDocumentHiddenForTest(false)")
                    page.wait_for_function("document.hidden === false")
                    page.wait_for_function(
                        "document.querySelector('#stage')?.dataset.motionActive === 'true'"
                    )
                    page.wait_for_function(
                        "document.querySelector('.hero')?.getAttribute('data-motion-visible') === 'true'"
                    )
                    page.wait_for_function("""
                        getComputedStyle(document.querySelector('.hero'), '::before').animationPlayState
                          === 'running' &&
                        getComputedStyle(document.querySelector('.app'), '::before').animationPlayState
                          === 'running'
                    """)
                finally:
                    browser.close()
        finally:
            review_server.close()

    def test_motion_fallback_pauses_targets_outside_viewport_without_intersection_observer(self):
        review_server = FixtureServer(self.review_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path=chromium_executable(), headless=True
                )
                try:
                    page = browser.new_page(
                        viewport={"width": 375, "height": 720}, reduced_motion="no-preference"
                    )
                    page.set_default_timeout(5000)
                    page.add_init_script("""
                        Object.defineProperty(window, 'IntersectionObserver', {
                          configurable: true, value: undefined
                        });
                        localStorage.setItem('coacus-locale', 'pt-BR');
                        localStorage.setItem('coacus-auto-tour', 'false');
                        localStorage.setItem('coacus-welcome-tour', 'true');
                    """)
                    page.goto(f"{review_server.base_url}/#lunarpunk/painel")
                    page.locator('#stage[data-style="lunarpunk"]').wait_for()
                    page.locator("#appearance-trigger").click()
                    page.wait_for_function(
                        "document.querySelector('#stage')?.dataset.variant === 'alternate'"
                    )
                    page.wait_for_function(
                        "document.querySelector('.hero')?.getAttribute('data-motion-visible') === 'true'"
                    )

                    page.evaluate("document.querySelector('#stage').scrollTo(0, document.querySelector('#stage').scrollHeight)")
                    page.wait_for_function("document.querySelector('#stage').scrollTop > 0")
                    page.wait_for_function(
                        "document.querySelector('.hero')?.getAttribute('data-motion-visible') === 'false'"
                    )

                    page.evaluate("document.querySelector('#stage').scrollTo(0, 0)")
                    page.wait_for_function("document.querySelector('#stage').scrollTop === 0")
                    page.wait_for_function(
                        "document.querySelector('.hero')?.getAttribute('data-motion-visible') === 'true'"
                    )
                finally:
                    browser.close()
        finally:
            review_server.close()

    def test_auto_locale_tracks_languagechange_but_manual_locale_does_not(self):
        review_server = FixtureServer(self.review_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path=chromium_executable(), headless=True
                )
                try:
                    page = browser.new_page(viewport={"width": 1280, "height": 900})
                    page.set_default_timeout(5000)
                    page.add_init_script("""
                        Object.defineProperty(navigator, 'languages', {
                          configurable: true,
                          get: () => window.__testLanguages || ['de-DE']
                        });
                        localStorage.setItem('coacus-locale', 'auto');
                        localStorage.setItem('coacus-auto-tour', 'false');
                        localStorage.setItem('coacus-welcome-tour', 'true');
                    """)
                    page.goto(f"{review_server.base_url}/#nordic/painel")
                    page.locator('#stage[data-style="nordic"]').wait_for()
                    page.wait_for_function("document.documentElement.lang === 'de-DE'")

                    page.evaluate("window.__testLanguages = ['ja-JP']; window.dispatchEvent(new Event('languagechange'))")
                    page.wait_for_function("document.documentElement.lang === 'ja-JP'")

                    page.locator("#locale-trigger").click()
                    page.locator('#locale-options input[name="locale"][value="pt-BR"]').check()
                    page.wait_for_function("document.documentElement.lang === 'pt-BR'")
                    page.evaluate("window.__testLanguages = ['fr-FR']; window.dispatchEvent(new Event('languagechange'))")
                    page.wait_for_timeout(150)
                    self.assertEqual(page.locator("html").get_attribute("lang"), "pt-BR")
                finally:
                    browser.close()
        finally:
            review_server.close()

    def test_appearance_preference_survives_style_switch_when_storage_writes_fail(self):
        review_server = FixtureServer(self.review_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path=chromium_executable(), headless=True
                )
                try:
                    page = browser.new_page(
                        viewport={"width": 1280, "height": 900}, reduced_motion="reduce"
                    )
                    page.set_default_timeout(5000)
                    page.add_init_script("""
                        const originalGetItem = Storage.prototype.getItem;
                        Storage.prototype.getItem = function(key) {
                          if (key === 'coacus-auto-tour') return 'false';
                          if (key === 'coacus-welcome-tour') return 'true';
                          return originalGetItem.call(this, key);
                        };
                        Storage.prototype.setItem = function() {
                          throw new DOMException('Storage blocked for test', 'SecurityError');
                        };
                    """)
                    page.goto(f"{review_server.base_url}/#{SLUG}/painel")
                    page.locator(f'#stage[data-style="{SLUG}"]').wait_for()
                    page.locator("#appearance-trigger").click()
                    page.wait_for_function(
                        "document.querySelector('#stage')?.dataset.variant === 'alternate'"
                    )
                    page.evaluate("location.hash = '#lunarpunk/painel'")
                    page.locator('#stage[data-style="lunarpunk"]').wait_for()
                    page.evaluate(f"location.hash = '#{SLUG}/painel'")
                    page.locator(f'#stage[data-style="{SLUG}"]').wait_for()
                    self.assertEqual(
                        page.locator("#stage").get_attribute("data-variant"), "alternate"
                    )
                    self.assertEqual(
                        page.locator("#appearance-trigger").get_attribute("aria-pressed"), "true"
                    )
                finally:
                    browser.close()
        finally:
            review_server.close()

    def test_release_disables_ready_for_review_candidate_and_normalizes_storage(self):
        release_server = FixtureServer(self.release_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path=chromium_executable(), headless=True
                )
                try:
                    release = browser.new_page(
                        viewport={"width": 1280, "height": 900}, reduced_motion="reduce"
                    )
                    release.set_default_timeout(5000)
                    release.add_init_script(
                        "localStorage.setItem('coacus-appearance-swiss-web-minimalism','e3');"
                        "localStorage.setItem('coacus-locale','pt-BR');"
                        "localStorage.setItem('coacus-auto-tour','false');"
                        "localStorage.setItem('coacus-welcome-tour','true');"
                    )
                    release.goto(f"{release_server.base_url}/#{SLUG}/projetos")
                    release.locator(f'#stage[data-style="{SLUG}"]').wait_for()
                    release.wait_for_function(
                        "localStorage.getItem('coacus-appearance-swiss-web-minimalism') === 'default'"
                    )
                    release_button = release.locator("#appearance-trigger")
                    self.assertEqual(release_button.get_attribute("aria-disabled"), "true")
                    self.assertEqual(release_button.get_attribute("aria-pressed"), "false")
                    release_hash = release.evaluate("location.hash")
                    release_button.focus()
                    release.keyboard.press("Enter")
                    release.keyboard.press("Space")
                    self.assertIsNone(release.locator("#stage").get_attribute("data-variant"))
                    self.assertEqual(release_button.get_attribute("aria-pressed"), "false")
                    self.assertEqual(release.evaluate("location.hash"), release_hash)
                    self.assertEqual(
                        release.evaluate(
                            "localStorage.getItem('coacus-appearance-swiss-web-minimalism')"
                        ),
                        "default",
                    )
                finally:
                    browser.close()
        finally:
            release_server.close()

    def test_release_does_not_guess_polarity_for_unclassified_default(self):
        release_server = FixtureServer(self.release_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    executable_path=chromium_executable(), headless=True
                )
                try:
                    page = browser.new_page()
                    page.add_init_script(
                        "localStorage.setItem('coacus-locale','pt-BR');"
                        "localStorage.setItem('coacus-auto-tour','false');"
                        "localStorage.setItem('coacus-welcome-tour','true');"
                    )
                    page.goto(f"{release_server.base_url}/#nordic/painel")
                    page.locator('#stage[data-style="nordic"]').wait_for()
                    state = page.locator("#appearance-state").inner_text().lower()
                    self.assertIn("pendente", state)
                    self.assertNotIn("padrão · escuro", state)
                    self.assertEqual(page.locator("#appearance-trigger").get_attribute("aria-disabled"), "true")
                finally:
                    browser.close()
        finally:
            release_server.close()


if __name__ == "__main__":
    unittest.main()
