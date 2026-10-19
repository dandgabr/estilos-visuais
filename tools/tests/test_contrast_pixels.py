import unittest

from tools.oracles.contrast_pixels import paired_pixel_contrast


class PairedPixelContrastTests(unittest.TestCase):
    def test_ignores_unrelated_gradient_area_around_text(self):
        normal = [(0, 0, 0)] * 4 + [(255, 255, 255)] * 4
        background = [(0, 0, 0)] * 4 + [(255, 255, 255)] * 4
        normal[0] = (255, 255, 255)  # A light glyph pixel over the dark part of a gradient.
        background[0] = (0, 0, 0)
        normal[4] = (0, 0, 0)  # A dark glyph pixel over the light part.
        background[4] = (255, 255, 255)

        ratio = paired_pixel_contrast(normal, background)

        self.assertIsNotNone(ratio)
        self.assertGreaterEqual(ratio, 12)

    def test_detects_low_contrast_glyph_pixels(self):
        normal = [(120, 120, 120)] * 8
        background = [(140, 140, 140)] * 8

        ratio = paired_pixel_contrast(normal, background)

        self.assertLess(ratio, 2)

    def test_no_changed_pixels_returns_no_measurement(self):
        pixels = [(20, 30, 40)] * 4
        self.assertIsNone(paired_pixel_contrast(pixels, pixels))

    def test_mismatched_pixel_arrays_fail_closed(self):
        with self.assertRaises(ValueError):
            paired_pixel_contrast([(0, 0, 0)], [])


if __name__ == "__main__":
    unittest.main()
