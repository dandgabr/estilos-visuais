"""Deterministic capture and comparison helpers for canonical style parity."""
from __future__ import annotations

import io

from PIL import Image, ImageChops


def compare_captures(left, right, pixel_tolerance=0):
    """Compare recorded interaction/layout state and screenshot pixels exactly."""
    left_state = left["state"]
    right_state = right["state"]
    keys = sorted((set(left_state) | set(right_state)) - {"originBeforeFixture"})
    state_differences = {
        key: {"left": left_state.get(key), "right": right_state.get(key)}
        for key in keys
        if left_state.get(key) != right_state.get(key)
    }
    expected_differences = {}
    if left_state.get("originBeforeFixture") != right_state.get("originBeforeFixture"):
        expected_differences["originBeforeFixture"] = {
            "left": left_state.get("originBeforeFixture"),
            "right": right_state.get("originBeforeFixture"),
        }
    with Image.open(io.BytesIO(left["png"])) as source:
        left_image = source.convert("RGBA")
    with Image.open(io.BytesIO(right["png"])) as source:
        right_image = source.convert("RGBA")
    if left_image.size != right_image.size:
        different_pixels = max(left_image.width * left_image.height, right_image.width * right_image.height)
        diff_image = None
    else:
        diff = ImageChops.difference(left_image, right_image)
        channel_max = ImageChops.lighter(ImageChops.lighter(*diff.convert("RGB").split()[:2]), diff.convert("RGB").split()[2])
        histogram = channel_max.histogram()
        different_pixels_raw = sum(histogram[1:])
        different_pixels = 0 if pixel_tolerance >= 255 else sum(histogram[max(0, pixel_tolerance + 1):])
        max_channel_delta = next((value for value in range(255, 0, -1) if histogram[value]), 0)
        diff_image = diff
    return {
        "equal": not state_differences and different_pixels == 0,
        "state_differences": state_differences,
        "expected_differences": expected_differences,
        "different_pixels": different_pixels,
        "different_pixels_raw": different_pixels_raw if left_image.size == right_image.size else different_pixels,
        "max_channel_delta": max_channel_delta if left_image.size == right_image.size else 255,
        "dimensions": {"left": list(left_image.size), "right": list(right_image.size)},
        "diff_image": diff_image,
    }
