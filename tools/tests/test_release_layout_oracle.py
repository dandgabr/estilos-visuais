"""Mutation-style tests for the release snapshot oracle."""
import unittest

from tools.oracles.release_layout_oracle import analyze_snapshot, compare_topology, validate_e3_contract


def rect(x, y, width, height):
    return {"x": x, "y": y, "width": width, "height": height}


def snapshot(*, element_rect=None, clip=None, viewport_width=320, scroll_width=320,
             regions=None):
    element_rect = element_rect or rect(12, 20, 100, 30)
    return {
        "viewport": {"width": viewport_width, "height": 800,
                     "scrollWidth": scroll_width, "scrollHeight": 800},
        "elements": [{
            "selector": ".primary-action", "role": "button", "required": True,
            "visible": True, "rect": element_rect,
            "content": {"text": "Continuar", "scrollWidth": 100, "clientWidth": 100,
                        "scrollHeight": 30, "clientHeight": 30},
            "clipAncestors": [clip] if clip else [],
        }],
        "regions": regions or {},
    }


class SnapshotOracleTests(unittest.TestCase):
    def test_clean_snapshot_passes(self):
        result = analyze_snapshot(snapshot())
        self.assertEqual([], result["findings"])
        self.assertTrue(result["passed"])

    def test_hidden_required_control_fails(self):
        data = snapshot()
        data["elements"][0]["visible"] = False
        self.assertIn("required-element-hidden", {f["code"] for f in analyze_snapshot(data)["findings"]})

    def test_viewport_overflow_fails(self):
        findings = analyze_snapshot(snapshot(scroll_width=361))["findings"]
        self.assertIn("document-horizontal-overflow", {f["code"] for f in findings})

    def test_control_outside_viewport_fails(self):
        findings = analyze_snapshot(snapshot(element_rect=rect(290, 10, 40, 30)))["findings"]
        self.assertIn("element-outside-viewport", {f["code"] for f in findings})

    def test_hidden_overflow_ancestor_cut_fails_but_scrollable_axis_does_not(self):
        clip = {"selector": ".panel", "rect": rect(0, 0, 120, 100),
                "clientLeft": 0, "clientTop": 0, "clientWidth": 120, "clientHeight": 100,
                "overflowX": "hidden", "overflowY": "visible"}
        data = snapshot(element_rect=rect(105, 20, 30, 30), clip=clip)
        self.assertIn("ancestor-clips-element", {f["code"] for f in analyze_snapshot(data)["findings"]})
        clip["overflowX"] = "auto"
        self.assertNotIn("ancestor-clips-element", {f["code"] for f in analyze_snapshot(data)["findings"]})

    def test_text_content_clipping_is_detected(self):
        data = snapshot()
        data["elements"][0]["content"].update(scrollWidth=210, clientWidth=100,
                                               overflowX="hidden")
        findings = analyze_snapshot(data)["findings"]
        self.assertIn("content-clipped", {f["code"] for f in findings})

    def test_malformed_element_and_ancestor_types_fail_without_crashing(self):
        data = snapshot()
        data["elements"] = [None, {"selector": ".broken", "required": True,
                                  "visible": True, "rect": rect(0, 0, 10, 10),
                                  "content": {"scrollWidth": 10, "clientWidth": 10,
                                              "scrollHeight": 10, "clientHeight": 10},
                                  "clipAncestors": [None]}]
        codes = {f["code"] for f in analyze_snapshot(data)["findings"]}
        self.assertIn("invalid-element", codes)
        self.assertIn("invalid-clip-ancestor", codes)

    def test_missing_viewport_content_and_clip_box_extents_fail(self):
        data = snapshot()
        del data["viewport"]["scrollHeight"]
        del data["elements"][0]["content"]["clientWidth"]
        data["elements"][0]["clipAncestors"] = [{"selector": ".panel", "rect": rect(0, 0, 100, 100),
                                                  "overflowX": "hidden", "overflowY": "hidden"}]
        codes = {f["code"] for f in analyze_snapshot(data)["findings"]}
        self.assertIn("missing-viewport-extent", codes)
        self.assertIn("missing-content-extent", codes)
        self.assertIn("missing-clip-box-extent", codes)

    def test_required_zero_area_control_fails(self):
        data = snapshot(element_rect=rect(20, 20, 0, 24))
        self.assertIn("required-element-zero-area",
                      {f["code"] for f in analyze_snapshot(data)["findings"]})

    def test_clip_path_can_cut_content_inside_its_bounding_clip_box(self):
        data = snapshot()
        data["elements"][0]["clipPaths"] = [{"selector": ".angled-action",
                                               "clipBox": rect(0, 0, 200, 100),
                                               "clipsElement": True}]
        self.assertIn("clip-path-clips-element",
                      {f["code"] for f in analyze_snapshot(data)["findings"]})
        data["elements"][0]["clipPaths"][0]["clipsElement"] = False
        self.assertNotIn("clip-path-clips-element",
                         {f["code"] for f in analyze_snapshot(data)["findings"]})
        data["elements"][0]["clipPaths"][0]["clipBox"] = rect(80, 0, 40, 100)
        self.assertIn("clip-path-clips-element",
                      {f["code"] for f in analyze_snapshot(data)["findings"]})

    def test_topology_detects_a_mutated_layout_that_only_changed_color_elsewhere(self):
        baseline = {"target": ".hero", "regions": {
            "title": rect(0, 0, 300, 40), "actions": rect(0, 52, 300, 40)}}
        variant = {"target": ".hero", "regions": {
            "title": rect(0, 0, 300, 40), "actions": rect(0, 52, 300, 40)},
            "tokens": {"--bg": "#123456"}}
        self.assertFalse(compare_topology(baseline, variant)["changed"])
        variant["regions"]["actions"] = rect(160, 0, 140, 40)
        comparison = compare_topology(baseline, variant)
        self.assertTrue(comparison["changed"])
        self.assertTrue(comparison["passed"])

    def test_c2_e2_topology_gate_requires_target_and_real_change(self):
        base = {"target": ".grid", "regions": {"a": rect(0, 0, 100, 60), "b": rect(0, 70, 100, 60)}}
        same = compare_topology(base, {"target": ".grid", "regions": base["regions"]}, required=True)
        self.assertIn("layout-topology-unchanged", {f["code"] for f in same["findings"]})
        wrong_target = compare_topology(base, {"target": ".hero", "regions": base["regions"]}, required=True)
        self.assertIn("layout-target-mismatch", {f["code"] for f in wrong_target["findings"]})
        changed = compare_topology(base, {"target": ".grid", "regions": {
            "a": rect(0, 0, 100, 60), "b": rect(105, 0, 100, 60)}}, required=True)
        self.assertTrue(changed["passed"])

    def test_topology_detects_box_size_and_position_changes_with_bounded_tolerance(self):
        base = {"target": ".hero", "regions": {
            "title": rect(0, 0, 300, 40), "actions": rect(0, 60, 300, 40)}}
        shifted = {"target": ".hero", "regions": {
            "title": rect(4, 0, 300, 40), "actions": rect(0, 60, 303, 40)}}
        within_noise = compare_topology(base, shifted, tolerance=5)
        self.assertFalse(within_noise["changed"])
        meaningful = compare_topology(base, shifted, tolerance=2)
        self.assertTrue(meaningful["changed"])
        self.assertTrue(meaningful["passed"])
        # A caller-supplied huge tolerance is capped at 8 px.
        far_shift = {"target": ".hero", "regions": {
            "title": rect(20, 0, 300, 40), "actions": rect(0, 60, 300, 40)}}
        huge_tolerance = compare_topology(base, far_shift, tolerance=1000)
        self.assertTrue(huge_tolerance["changed"])

    def test_e3_technique_must_match_appendix_and_runtime_layer(self):
        expected = {"target": "#stage::after", "technique": "CSS radial-gradient + transform",
                    "layer": "pseudo-element", "trigger": "IntersectionObserver",
                    "fallback": "static-gradient", "durationSeconds": 36}
        observed = dict(expected)
        observed["runtimeLayer"] = "pseudo-element"
        self.assertTrue(validate_e3_contract(expected, observed)["passed"])
        mutated = dict(observed, technique="canvas metaballs")
        self.assertIn("e3-technique-mismatch", {f["code"] for f in validate_e3_contract(expected, mutated)["findings"]})
        mutated = dict(observed, runtimeLayer="document-background")
        self.assertIn("e3-runtime-layer-mismatch", {f["code"] for f in validate_e3_contract(expected, mutated)["findings"]})


if __name__ == "__main__":
    unittest.main()
