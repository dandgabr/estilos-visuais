"""Isolated behavioral regression for persisted appearance migration.

This evaluates the real store methods from app.js with injected registry and
localStorage objects. It does not need a browser or running HTTP server.
"""
import json
import re
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
LEGACY = ("c1", "c2", "c3", "e1", "e2", "e3")


def run_store_contract():
    source = (ROOT / "app.js").read_text()
    match = re.search(r"const store = \{([\s\S]*?)\n\};", source)
    if not match:
        raise AssertionError("could not locate the runtime store object in app.js")
    store_body = match.group(1)
    inputs = {
        "legacy": list(LEGACY),
        "invalid": "unexpected-value",
        "absent": None,
        "default": "default",
        "approvedAlternate": "alternate",
        "unapprovedAlternate": "alternate",
    }
    script = r"""
      const body = %s;
      const {legacy, invalid, absent, default: defaultValue, approvedAlternate, unapprovedAlternate} = %s;
      function evaluate(initialValue, registry) {
        const values = new Map();
        if (initialValue !== null) values.set('coacus-appearance-nordic', initialValue);
        const localStorage = {
          getItem(key) { return values.has(key) ? values.get(key) : null; },
          setItem(key, value) { values.set(key, String(value)); },
        };
        const memoryAppearances = new Map();
        const store = new Function('DEFAULT_VARIANT','memoryAppearances','localStorage','VARIANTS','BUILD_KIND', `return ({${body}})`)
          ('default', memoryAppearances, localStorage, registry, 'release');
        const actual = store.getAppearance('nordic');
        return {actual, persisted: values.get('coacus-appearance-nordic') ?? null};
      }
      function evaluateWrite(value, registry) {
        const values = new Map();
        const localStorage = {
          getItem(key) { return values.has(key) ? values.get(key) : null; },
          setItem(key, next) { values.set(key, String(next)); },
        };
        const memoryAppearances = new Map();
        const store = new Function('DEFAULT_VARIANT','memoryAppearances','localStorage','VARIANTS','BUILD_KIND', `return ({${body}})`)
          ('default', memoryAppearances, localStorage, registry, 'release');
        store.setAppearance('nordic', value);
        return {memory: memoryAppearances.get('nordic') ?? null, persisted: values.get('coacus-appearance-nordic') ?? null};
      }
      const approved = {nordic:{alternate:{id:'alternate',status:'approved'}}};
      const unapproved = {nordic:{alternate:{id:'alternate',status:'ready_for_review'}}};
      const result = {
        legacy: Object.fromEntries(legacy.map(value=>[value,evaluate(value,approved)])),
        invalid: evaluate(invalid, approved),
        absent: evaluate(absent, approved),
        default: evaluate(defaultValue, approved),
        approvedAlternate: evaluate(approvedAlternate, approved),
        unapprovedAlternate: evaluate(unapprovedAlternate, unapproved),
        writes: {
          legacy: Object.fromEntries(legacy.map(value=>[value,evaluateWrite(value,approved)])),
          invalid: evaluateWrite(invalid, approved),
          default: evaluateWrite('default', approved),
          approvedAlternate: evaluateWrite('alternate', approved),
          unapprovedAlternate: evaluateWrite('alternate', unapproved),
        },
      };
      console.log(JSON.stringify(result));
    """ % (json.dumps(store_body), json.dumps(inputs))
    result = subprocess.run(
        ["node", "-e", script], cwd=ROOT, text=True, capture_output=True, check=False
    )
    if result.returncode:
        raise AssertionError(f"runtime store evaluation failed: {result.stderr}")
    return json.loads(result.stdout.strip().splitlines()[-1])


class AppearanceMigrationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.result = run_store_contract()

    def test_all_six_legacy_ids_migrate_to_and_persist_default(self):
        for legacy, outcome in self.result["legacy"].items():
            with self.subTest(legacy=legacy):
                self.assertEqual(outcome["actual"], "default")
                self.assertEqual(outcome["persisted"], "default")

    def test_invalid_and_absent_values_normalize_and_persist_default(self):
        for case in ("invalid", "absent"):
            with self.subTest(case=case):
                self.assertEqual(self.result[case]["actual"], "default")
                self.assertEqual(self.result[case]["persisted"], "default")

    def test_default_and_only_approved_alternate_are_readable(self):
        self.assertEqual(self.result["default"], {"actual": "default", "persisted": "default"})
        self.assertEqual(
            self.result["approvedAlternate"],
            {"actual": "alternate", "persisted": "alternate"},
        )
        self.assertEqual(
            self.result["unapprovedAlternate"],
            {"actual": "default", "persisted": "default"},
        )

    def test_store_writes_only_default_or_an_approved_alternate(self):
        for legacy, outcome in self.result["writes"]["legacy"].items():
            with self.subTest(legacy=legacy):
                self.assertEqual(outcome, {"memory": "default", "persisted": "default"})
        self.assertEqual(self.result["writes"]["invalid"], {"memory": "default", "persisted": "default"})
        self.assertEqual(self.result["writes"]["default"], {"memory": "default", "persisted": "default"})
        self.assertEqual(
            self.result["writes"]["approvedAlternate"],
            {"memory": "alternate", "persisted": "alternate"},
        )
        self.assertEqual(
            self.result["writes"]["unapprovedAlternate"],
            {"memory": "default", "persisted": "default"},
        )


if __name__ == "__main__":
    unittest.main()
