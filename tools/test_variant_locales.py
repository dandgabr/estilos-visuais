"""Exercise default/alternate appearance behavior in all supported locales."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import re
from pathlib import Path
import shutil
import sys
import tempfile
import threading

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / "tools"
sys.path.insert(0, str(TOOLS))

from chromium_runtime import chromium_executable  # noqa: E402
import generate_variant_design as generator  # noqa: E402

LOCALES = ("pt-BR", "en-US", "es-ES", "fr-FR", "de-DE", "ru-RU", "ar-SA", "hi-IN", "zh-CN", "ja-JP", "ko-KR")
VARIANTS = ("default", "alternate")
SOURCE_DIR = ROOT / "styles/variants/source"


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


def source_inventory():
    slugs = generator.canonical_slugs(ROOT)
    sources = generator.load_sources(SOURCE_DIR, slugs, allow_missing=True, snapshot_root=ROOT)
    return slugs, sources


def check_release_defaults(release_root, slugs, sources):
    if len(slugs) != 82:
        raise AssertionError(f"release inventory must remain exactly 82 styles, got {len(slugs)}")
    registry = (release_root / "styles/variants/registry.js").read_text(encoding="utf-8")
    if 'export const BUILD_KIND = "release";' not in registry:
        raise AssertionError("release fixture is not marked BUILD_KIND=release")
    for slug in slugs:
        entry = registry.split(f'"{slug}": {{', 1)[1].split("\n  },", 1)[0]
        if '"default"' not in entry:
            raise AssertionError(f"{slug}: release registry is missing default")
        if slug not in sources or sources[slug]["status"] != "approved":
            if '"alternate"' in entry or (release_root / "styles/variants" / f"{slug}.css").exists():
                raise AssertionError(f"{slug}: unapproved alternate leaked into release")
    legacy = re.compile(r"appearance\.[^.]+\.(?:c[1-3]|e[1-3])\.(?:name|description)")
    for path in (release_root / "i18n/locales").glob("*.js"):
        if legacy.search(path.read_text(encoding="utf-8")):
            raise AssertionError(f"legacy C/E locale key remains in {path.name}")


def run_release_defaults(release_root, source_slugs):
    """Smoke-test runtime fail-closed defaults for every available unapproved source."""
    server = FixtureServer(release_root)
    failures = []
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
            try:
                page = browser.new_page(viewport={"width": 1280, "height": 900}, reduced_motion="reduce")
                page.set_default_timeout(5000)
                for slug in source_slugs:
                    page.add_init_script(
                        f"localStorage.setItem('coacus-appearance-{slug}','e3');"
                        "localStorage.setItem('coacus-locale','en-US');"
                        "localStorage.setItem('coacus-auto-tour','false');"
                        "localStorage.setItem('coacus-welcome-tour','true');"
                    )
                    page.goto(f"{server.base_url}/#{slug}")
                    page.locator(f'#stage[data-style="{slug}"]').wait_for()
                    page.wait_for_function(
                        f"localStorage.getItem('coacus-appearance-{slug}') === 'default'"
                    )
                    trigger = page.locator("#appearance-trigger")
                    if trigger.get_attribute("aria-disabled") != "true":
                        failures.append({"slug": slug, "error": "unapproved release toggle is enabled"})
                    if page.locator("#stage").get_attribute("data-variant") is not None:
                        failures.append({"slug": slug, "error": "unapproved alternate became active"})
            finally:
                browser.close()
    finally:
        server.close()
    return failures


def check_source_locales(review_root, sources):
    """Confirm every available alternate's authored copy survives fixture generation."""
    locale_dir = review_root / "i18n/locales"
    for slug, source in sources.items():
        for locale in LOCALES:
            path = locale_dir / f"{locale}.js"
            text = path.read_text(encoding="utf-8")
            for field in ("name", "description"):
                value = json.dumps(source["locales"][locale][field], ensure_ascii=False)
                key = json.dumps(f"appearance.{slug}.alternate.{field}", ensure_ascii=False)
                if f"{key}: {value}" not in text:
                    raise AssertionError(f"{slug}/{locale}: generated alternate {field} missing/mismatched")


def run_review_matrix(review_root, slugs, sources, *, viewport=320):
    server = FixtureServer(review_root)
    failures = []
    default_cases = alternate_cases = 0
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(executable_path=chromium_executable(), headless=True)
            try:
                page = browser.new_page(viewport={"width": viewport, "height": 780}, reduced_motion="reduce")
                page.set_default_timeout(5000)
                for locale in LOCALES:
                    page.add_init_script(
                        f"localStorage.setItem('coacus-locale',{json.dumps(locale)});"
                        "localStorage.setItem('coacus-auto-tour','false');"
                        "localStorage.setItem('coacus-welcome-tour','true');"
                    )
                    page.goto(f"{server.base_url}/#nordic")
                    page.locator("#stage").wait_for()
                    page.wait_for_function("tag => document.documentElement.lang === tag", arg=locale)
                    expected_dir = "rtl" if locale == "ar-SA" else "ltr"
                    if page.locator("html").get_attribute("dir") != expected_dir:
                        failures.append({"locale": locale, "error": "wrong document direction"})

                    for slug in slugs:
                        page.evaluate("slug => { location.hash = `#${slug}`; }", slug)
                        page.wait_for_function("slug => document.querySelector('#stage')?.dataset.style === slug", arg=slug)
                        default_cases += 1
                        result = page.evaluate("""() => ({
                          width: document.documentElement.scrollWidth, viewport: innerWidth,
                          stageVariant: document.querySelector('#stage')?.dataset.variant || 'default',
                          pressed: document.querySelector('#appearance-trigger')?.getAttribute('aria-pressed'),
                          disabled: document.querySelector('#appearance-trigger')?.getAttribute('aria-disabled')
                        })""")
                        if result["width"] > result["viewport"] + 1 or result["stageVariant"] != "default":
                            failures.append({"locale": locale, "slug": slug, "mode": "default", **result})

                        if slug not in sources:
                            continue
                        trigger = page.locator("#appearance-trigger")
                        if trigger.get_attribute("aria-disabled") == "true":
                            failures.append({"locale": locale, "slug": slug, "error": "review alternate disabled"})
                            continue
                        trigger.click()
                        page.wait_for_function("document.querySelector('#stage')?.dataset.variant === 'alternate'")
                        alternate_cases += 1
                        result = page.evaluate("""() => {
                          const stage = document.querySelector('#stage').getBoundingClientRect();
                          return {width: document.documentElement.scrollWidth, viewport: innerWidth,
                            stageVariant: document.querySelector('#stage')?.dataset.variant,
                            pressed: document.querySelector('#appearance-trigger')?.getAttribute('aria-pressed'),
                            stage: [stage.left, stage.right]};
                        }""")
                        if result["width"] > viewport + 1 or result["stageVariant"] != "alternate":
                            failures.append({"locale": locale, "slug": slug, "mode": "alternate", **result})
                        trigger.click()
                        page.wait_for_function("!document.querySelector('#stage')?.dataset.variant")
                    # A fresh page for the next locale ensures localStorage preference takes effect.
                    page.goto("about:blank")
            finally:
                browser.close()
    finally:
        server.close()
    return {"defaultCases": default_cases, "alternateCases": alternate_cases, "failures": failures}


def main():
    slugs, sources = source_inventory()
    with tempfile.TemporaryDirectory(prefix="coacus-variant-locales-") as temporary:
        base = Path(temporary)
        review_root = base / "review"
        generator.create_review_root(review_root, slugs)
        review_sources = generator.load_sources(review_root / "styles/variants/source", slugs, allow_missing=True, snapshot_root=review_root)
        generator.write_outputs(review_root, slugs, review_sources, build_kind="review", source_dir=review_root / "styles/variants/source")
        check_source_locales(review_root, review_sources)

        release_root = base / "release"
        shutil.copytree(review_root, release_root)
        generator.write_outputs(release_root, slugs, review_sources, build_kind="release", source_dir=release_root / "styles/variants/source")
        check_release_defaults(release_root, slugs, review_sources)
        release_failures = run_release_defaults(
            release_root,
            [slug for slug, source in review_sources.items() if source["status"] != "approved"],
        )

        matrix = run_review_matrix(review_root, slugs, review_sources)
        report = {
            "locales": list(LOCALES), "styles": len(slugs), "availableSources": sorted(review_sources),
            "variantStates": list(VARIANTS), "viewport": 320, **matrix,
            "releaseDefaults": len(slugs), "releaseFailures": release_failures,
            "approvedAlternates": sum(source["status"] == "approved" for source in review_sources.values()),
            "releaseReady": len(slugs) == 82 and all(source["status"] == "approved" for source in review_sources.values()),
            "legacyIds": "absent",
        }
        report_path = ROOT / "docs/temp/reports/2026-10-17-variant-locales.json"
        report_path.parent.mkdir(parents=True, exist_ok=True)
        report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if matrix["failures"] or release_failures:
            raise SystemExit(json.dumps({"failures": matrix["failures"][:12], "releaseFailures": release_failures, "report": str(report_path)}, ensure_ascii=False, indent=2))
        print(json.dumps({k: report[k] for k in ("locales", "styles", "availableSources", "defaultCases", "alternateCases", "releaseDefaults", "approvedAlternates", "releaseReady", "legacyIds")}, ensure_ascii=False))


if __name__ == "__main__":
    main()
