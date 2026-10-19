"""Exercise a reviewed alternate and its atomic rollback in an isolated fixture."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import threading

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / "tools"
sys.path.insert(0, str(TOOLS))

from chromium_runtime import chromium_executable  # noqa: E402
import generate_variant_design as generator  # noqa: E402

PILOT = "swiss-web-minimalism"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, _format, *_args):
        pass


class FixtureServer:
    def __init__(self, root):
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(root)))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.server.server_port}"

    def close(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)


def create_review_fixture(root: Path):
    """Generate only from the authored source; never promote candidate status."""
    command = [
        sys.executable,
        str(TOOLS / "generate_variant_design.py"),
        "--review-root",
        str(root),
        "--slugs",
        PILOT,
    ]
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True, check=False)
    if result.returncode:
        raise AssertionError(f"review fixture generation failed: {result.stderr}")
    sources = generator.load_sources(root / "styles/variants/source", [PILOT], snapshot_root=root)
    if sources[PILOT]["status"] not in {"ready_for_review", "approved"}:
        raise AssertionError(f"{PILOT}: unexpected alternate status {sources[PILOT]['status']!r}")
    registry = json.loads(subprocess.run(
        ["node", "--input-type=module", "-e",
         "import {VARIANTS} from './styles/variants/registry.js'; console.log(JSON.stringify(VARIANTS));"],
        cwd=root, text=True, capture_output=True, check=True,
    ).stdout.strip().splitlines()[-1])
    if set(registry[PILOT]) != {"default", "alternate"}:
        raise AssertionError(f"{PILOT}: review registry must expose exactly default and alternate")
    if registry[PILOT]["alternate"]["status"] != sources[PILOT]["status"]:
        raise AssertionError("review registry changed authored approval status")
    return sources[PILOT], registry[PILOT]


def main():
    with tempfile.TemporaryDirectory(prefix="variant-pilot-review-") as temporary:
        fixture_root = Path(temporary) / "review"
        source, variants = create_review_fixture(fixture_root)
        server = FixtureServer(fixture_root)
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
                page = browser.new_page(viewport={"width": 1280, "height": 900}, reduced_motion="reduce")
                page.add_init_script(
                    "localStorage.setItem('coacus-locale','pt-BR');"
                    "localStorage.setItem('coacus-auto-tour','false');"
                    "localStorage.setItem('coacus-welcome-tour','true')"
                )
                page.goto(f"{server.base_url}/#{PILOT}/projetos")
                page.locator(f'#stage[data-style="{PILOT}"]').wait_for()
                assert page.locator("#stage").get_attribute("data-variant") is None
                assert page.locator("link[data-variant-stylesheet]").count() == 0
                assert page.locator("#appearance-trigger").get_attribute("aria-disabled") == "false"
                page.locator("#appearance-trigger").click()
                page.wait_for_function("document.querySelector('#stage').dataset.variant === 'alternate'")

                expected_colors = variants["alternate"]["colors"]
                computed = page.locator("#stage").evaluate(
                    "e => Object.fromEntries(['--bg','--surface','--accent'].map(k => [k, getComputedStyle(e).getPropertyValue(k).trim().toUpperCase()]))"
                )
                assert all(computed[key] == value.upper() for key, value in expected_colors.items()), (computed, expected_colors)
                ratio = page.locator("#stage").evaluate("""e => {
                  const s=getComputedStyle(e);
                  const rgb=x=>{const el=document.createElement('i');el.style.color=x.trim();document.body.append(el);const m=getComputedStyle(el).color.match(/[\\d.]+/g).map(Number);el.remove();return m.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4})};
                  const lum=x=>{const [r,g,b]=rgb(x);return .2126*r+.7152*g+.0722*b};
                  const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
                  return {textBg:cr(s.color,s.backgroundColor),textSurface:cr(s.color,s.getPropertyValue('--surface')),muted:cr(s.getPropertyValue('--muted'),s.getPropertyValue('--surface')),accent:cr(s.getPropertyValue('--accent-fg'),s.getPropertyValue('--accent')),border:cr(s.getPropertyValue('--border'),s.backgroundColor)};
                }""")
                assert min(ratio[key] for key in ("textBg", "textSurface", "muted", "accent")) >= 4.5, ratio
                assert ratio["border"] >= 3, ratio
                assert page.locator("#appearance-options").count() == 0
                assert page.locator("#appearance-trigger").get_attribute("aria-pressed") == "true"
                assert page.locator('link[data-variant-stylesheet="alternate"]').evaluate("e => e.sheet !== null")
                assert page.evaluate(f"localStorage.getItem('coacus-appearance-{PILOT}')") == "alternate"

                # The authored motion contract remains active in normal motion settings
                # and is fully suppressed when reduced motion is requested.
                assert source["motion"]["element"]["selector"]
                assert source["motion"]["background"]["selector"]
                page.emulate_media(reduced_motion="no-preference")
                page.locator("#stage").evaluate("e => e.scrollTop = e.scrollHeight")
                page.wait_for_timeout(120)
                page.emulate_media(reduced_motion="reduce")
                page.wait_for_function("""() => {
                  const stage=document.querySelector('#stage');
                  return !!stage && ['::before','::after'].every(p => getComputedStyle(stage,p).animationName.split(',').every(n=>n.trim()==='none'));
                }""")

                # A failed alternate stylesheet request must restore default atomically.
                page.locator("#appearance-trigger").click()
                page.wait_for_function("!document.querySelector('#stage')?.dataset.variant")
                page.route("**/styles/variants/swiss-web-minimalism.css*", lambda route: route.abort())
                page.locator("#appearance-trigger").click()
                page.wait_for_function("""() => document.querySelector('#stage')?.dataset.variant === undefined
                  && document.querySelector('#appearance-trigger')?.getAttribute('aria-pressed') === 'false'
                  && localStorage.getItem('coacus-appearance-swiss-web-minimalism') === 'default'""")
                page.wait_for_timeout(100)
                assert page.locator("link[data-variant-stylesheet]").count() == 0
                browser.close()
        finally:
            server.close()


if __name__ == "__main__":
    main()
