"""Contrast measurement from paired rendered text/background pixel samples."""
from math import ceil


def relative_luminance(rgb):
    channels = []
    for value in rgb[:3]:
        value = value / 255
        channels.append(value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4)
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]


def paired_pixel_contrast(normal_pixels, background_pixels, *, delta_threshold=12):
    """Return a conservative rendered contrast ratio for pixels changed by text.

    `background_pixels` is the same crop with text fill/stroke/shadow hidden. Pixels
    unchanged between the pair are excluded, so empty parts of a large element or
    an unrelated gradient cannot become the measured text background.
    """
    if len(normal_pixels) != len(background_pixels):
        raise ValueError("pixel arrays must have equal length")

    pairs = []
    for foreground, background in zip(normal_pixels, background_pixels):
        delta = max(abs(foreground[channel] - background[channel]) for channel in range(3))
        if delta >= delta_threshold:
            pairs.append((delta, foreground, background))
    if not pairs:
        return None

    # Keep only the strongest changed pixels. This samples glyph interiors and
    # excludes antialiased edges, text-shadow falloff and empty areas in large boxes.
    pairs.sort(key=lambda pair: pair[0], reverse=True)
    pairs = pairs[:max(1, ceil(len(pairs) / 10))]
    ratios = []
    for _, foreground, background in pairs:
        a, b = relative_luminance(foreground), relative_luminance(background)
        ratios.append((max(a, b) + 0.05) / (min(a, b) + 0.05))
    ratios.sort()
    return ratios[max(0, ceil(len(ratios) * 0.1) - 1)]
