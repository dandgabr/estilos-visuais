"""Regression coverage for C3 animations applied to descendants of registry targets."""
from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOOLS = ROOT / "tools"
sys.path.insert(0, str(TOOLS))
spec = importlib.util.spec_from_file_location("test_variants_matrix", TOOLS / "test_variants_matrix.py")
matrix = importlib.util.module_from_spec(spec)
assert spec and spec.loader
spec.loader.exec_module(matrix)


class VariantMotionProbeTests(unittest.TestCase):
    def test_motion_clock_advancement_matches_each_running_animation(self):
        advance = getattr(matrix, "running_motion_advanced", None)
        self.assertTrue(callable(advance), "C3 oracle needs to compare each animation clock independently")
        before = [
            {"animations": [{"name": "first", "playState": "running", "currentTime": 450}]},
            {"animations": [{"name": "second", "playState": "running", "currentTime": 50}]},
        ]
        after = [
            {"animations": [{"name": "first", "playState": "finished", "currentTime": 500}]},
            {"animations": [{"name": "second", "playState": "running", "currentTime": 130}]},
        ]
        self.assertTrue(advance(before, after))

    def test_running_animation_on_child_counts_when_registry_target_is_static(self):
        probe = getattr(matrix, "has_running_motion", None)
        self.assertTrue(callable(probe), "matrix needs a reusable descendant-aware motion predicate")

        nodes = [
            {"selector": ".kpis", "animations": []},
            {"selector": ".kpis > .card", "animations": [
                {"name": "nordic-c3-snow-reveal", "playState": "running", "currentTime": 83}
            ]},
        ]
        self.assertTrue(probe(nodes))

    def test_browser_probe_collects_child_animation_when_target_has_none(self):
        script = f"""
const probe = eval(`(${{{json.dumps(matrix.MOTION_NODES_JS)}}})`);
const child = {{tagName:'ARTICLE', className:'card', querySelectorAll:()=>[],
  getAnimations:()=>[{{animationName:'nordic-c3-snow-reveal',playState:'running',currentTime:83}}]}};
const root = {{tagName:'DIV', className:'kpis', querySelectorAll:()=>[child], getAnimations:()=>[]}};
globalThis.document = {{querySelector:()=>root}};
console.log(JSON.stringify(probe('.kpis')));
"""
        result = subprocess.run(["node", "-e", script], text=True, capture_output=True, check=True)
        nodes = json.loads(result.stdout)
        self.assertEqual(len(nodes), 2, "probe must include registry target and its child")
        self.assertFalse(nodes[0]["animations"], "group container is intentionally static in this regression")
        self.assertTrue(matrix.has_running_motion(nodes))

    def test_finished_or_reduced_motion_animations_do_not_count_as_running(self):
        probe = getattr(matrix, "has_running_motion", None)
        self.assertTrue(callable(probe), "matrix needs a reusable descendant-aware motion predicate")
        self.assertFalse(probe([
            {"animations": [{"name": "nordic-c3-snow-reveal", "playState": "finished", "currentTime": 500}]},
            {"animations": []},
        ]))

    def test_background_motion_advance_accepts_style_specific_names_and_multiple_pseudos(self):
        advance = getattr(matrix, "background_motion_advanced", None)
        self.assertTrue(callable(advance), "E3 oracle needs name-independent pseudo animation progress detection")
        before = [
            {"pseudo": "::before", "animations": [{"name": "flat-design-e3-planes-a", "playState": "running", "currentTime": 32}]},
            {"pseudo": "::after", "animations": [{"name": "flat-design-e3-planes-b", "playState": "running", "currentTime": 32}]},
        ]
        after = [
            {"pseudo": "::before", "animations": [{"name": "flat-design-e3-planes-a", "playState": "running", "currentTime": 112}]},
            {"pseudo": "::after", "animations": [{"name": "flat-design-e3-planes-b", "playState": "running", "currentTime": 112}]},
        ]
        self.assertTrue(advance(before, after))

    def test_background_motion_advance_accepts_nordic_aurora_name(self):
        advance = getattr(matrix, "background_motion_advanced", None)
        self.assertTrue(callable(advance), "E3 oracle must not require a slug-derived suffix")
        self.assertTrue(advance(
            [{"pseudo": "::after", "animations": [{"name": "nordic-e3-aurora", "playState": "running", "currentTime": 100}]}],
            [{"pseudo": "::after", "animations": [{"name": "nordic-e3-aurora", "playState": "running", "currentTime": 180}]}],
        ))

    def test_reduced_background_motion_allows_paused_or_absent_animations_only(self):
        reduced = getattr(matrix, "background_motion_is_reduced", None)
        self.assertTrue(callable(reduced), "E3 oracle needs a reduced-motion state predicate")
        self.assertTrue(reduced([
            {"pseudo": "::before", "computedNames": ["none"], "animations": []},
            {"pseudo": "::after", "computedNames": ["flat-design-e3-planes-b"], "animations": [
                {"name": "flat-design-e3-planes-b", "playState": "paused", "currentTime": 100}
            ]},
        ]))
        self.assertFalse(reduced([
            {"pseudo": "::after", "computedNames": ["nordic-e3-aurora"], "animations": [
                {"name": "nordic-e3-aurora", "playState": "running", "currentTime": 100}
            ]},
        ]))

    def test_pseudo_probe_discovers_arbitrary_names_on_before_and_after(self):
        expression = getattr(matrix, "BACKGROUND_PSEUDO_MOTION_JS", None)
        self.assertTrue(isinstance(expression, str), "E3 probe must inspect both stage pseudo-elements")
        script = f"""
const probe = eval(`(${{{json.dumps(expression)}}})`);
const stage = {{}};
const animations = [
  {{animationName:'nordic-e3-aurora',playState:'running',currentTime:80,effect:{{target:stage,pseudoElement:'::after'}}}},
  {{animationName:'flat-design-e3-planes-a',playState:'running',currentTime:80,effect:{{target:stage,pseudoElement:'::before'}}}},
  {{animationName:'flat-design-e3-planes-b',playState:'running',currentTime:80,effect:{{target:stage,pseudoElement:'::after'}}}},
];
globalThis.document = {{querySelector:()=>stage,getAnimations:()=>animations}};
globalThis.getComputedStyle = (_element,pseudo)=>({{animationName:pseudo==='::before'?'flat-design-e3-planes-a':'nordic-e3-aurora, flat-design-e3-planes-b'}});
console.log(JSON.stringify(probe()));
"""
        result = subprocess.run(["node", "-e", script], text=True, capture_output=True, check=True)
        data = json.loads(result.stdout)
        self.assertEqual({item["pseudo"] for item in data}, {"::before", "::after"})
        names = {animation["name"] for item in data for animation in item["animations"]}
        self.assertEqual(names, {"nordic-e3-aurora", "flat-design-e3-planes-a", "flat-design-e3-planes-b"})

    def test_scroll_timeline_advancement_accepts_unresolved_to_numeric_progress(self):
        progressed = getattr(matrix, "timeline_progressed", None)
        self.assertTrue(callable(progressed), "scroll timeline oracle must handle an unresolved initial timeline")
        before = [{"animations": [{"name": "swiss-rule-reveal", "playState": "running", "currentTime": None}]}]
        after = [{"animations": [{"name": "swiss-rule-reveal", "playState": "finished", "currentTime": 0.33}]}]
        self.assertTrue(progressed(before, after))


if __name__ == "__main__":
    unittest.main()
