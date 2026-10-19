"""Contract tests for the deterministic default-style comparison oracle."""
import io
import unittest

from PIL import Image

from default_parity import compare_captures


def png(color):
    image = Image.new("RGB", (2, 2), color)
    stream = io.BytesIO()
    image.save(stream, format="PNG")
    return stream.getvalue()


class DefaultParityContract(unittest.TestCase):
    def test_identical_captures_pass(self):
        capture = {"state": {"hover": None, "focus": None, "stage": [0, 0, 320, 600]}, "png": png("white")}
        result = compare_captures(capture, capture)
        self.assertTrue(result["equal"])
        self.assertEqual(result["state_differences"], {})
        self.assertEqual(result["different_pixels"], 0)


    def test_expected_shell_origin_change_is_recorded_without_failing_stage_parity(self):
        first = {"state": {"hover": None, "originBeforeFixture": [0, 0, 320, 600]}, "png": png("white")}
        second = {"state": {"hover": None, "originBeforeFixture": [0, 8, 320, 600]}, "png": png("white")}
        result = compare_captures(first, second)
        self.assertTrue(result["equal"])
        self.assertEqual(result["state_differences"], {})
        self.assertEqual(result["expected_differences"], {"originBeforeFixture": {"left": [0, 0, 320, 600], "right": [0, 8, 320, 600]}})


    def test_real_interaction_difference_still_fails(self):
        first = {"state": {"hover": None, "originBeforeFixture": [0, 0, 320, 600]}, "png": png("white")}
        second = {"state": {"hover": "button", "originBeforeFixture": [0, 8, 320, 600]}, "png": png("white")}
        result = compare_captures(first, second)
        self.assertFalse(result["equal"])
        self.assertEqual(set(result["state_differences"]), {"hover"})
        self.assertIn("originBeforeFixture", result["expected_differences"])


    def test_hover_path_contamination_fails_parity(self):
        first = {"state": {"pointer": [1, 1], "pointerTarget": {"tag": "div", "class": "stage"}, "hoverPath": ["html", "body", "stage"]}, "png": png("white")}
        second = {"state": {"pointer": [1, 1], "pointerTarget": {"tag": "button", "class": "nav-tab"}, "hoverPath": ["html", "body", "stage", "button"]}, "png": png("white")}
        result = compare_captures(first, second)
        self.assertFalse(result["equal"])
        self.assertEqual(set(result["state_differences"]), {"hoverPath", "pointerTarget"})


    def test_pixel_drift_is_reported_independently_of_dom_state(self):
        first = {"state": {"stage": [0, 0, 320, 600]}, "png": png("white")}
        second = {"state": {"stage": [0, 0, 320, 600]}, "png": png("black")}
        result = compare_captures(first, second)
        self.assertFalse(result["equal"])
        self.assertEqual(result["state_differences"], {})
        self.assertEqual(result["different_pixels"], 4)
        tolerant = compare_captures(first, second, pixel_tolerance=255)
        self.assertTrue(tolerant["equal"])
        self.assertEqual(tolerant["different_pixels_raw"], 4)
        self.assertEqual(tolerant["max_channel_delta"], 255)


if __name__ == "__main__":
    unittest.main()
