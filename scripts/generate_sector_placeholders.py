"""Cargo Flow Africa — Sector placeholder image generator.

Produces six cinematic, 16:9 placeholder backdrops for the Industries
(home page) sections. Each image is a procedural "scene" built from brand
palette gradients, terrain silhouettes, sector-specific vehicle/structure
shapes, atmospheric haze, film grain, a vignette, and clearly marked
dimension + sector labels so they read as intentional staging assets.

Usage:
    python scripts/generate_sector_placeholders.py            # 1920x1080 webp
    python scripts/generate_sector_placeholders.py --height 720
    python scripts/generate_sector_placeholders.py --format png --outdir other

Output: public/images/sectors/<industry-id>.webp (deterministic output).
"""

from __future__ import annotations

import argparse
import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

# ── Brand palette (mirrors app/tokens.css) ──────────────────────────────────
INK = (18, 56, 47)          # deep forest green
INK_DARK = (8, 26, 21)      # near-black green (scrims / night sky)
CHARCOAL = (24, 28, 26)     # vehicle silhouettes
CREAM = (248, 244, 235)     # text / highlights
GOLD = (212, 164, 76)       # accent
GOLD_SOFT = (232, 198, 130)
TERRACOTTA = (185, 98, 62)  # accent
OCHRE = (196, 141, 62)
CANVAS_ALT = (232, 216, 185)

W_DEFAULT, H_DEFAULT = 1920, 1080
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images" / "sectors"


# ── Small helpers ───────────────────────────────────────────────────────────
def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp_color(c1, c2, t: float):
    return tuple(int(round(lerp(c1[i], c2[i], t))) for i in range(3))


def vertical_gradient(size, stops) -> Image.Image:
    """Vertical multi-stop gradient. stops = [(y_frac, color), ...] sorted."""
    w, h = size
    img = Image.new("RGB", (1, h))
    px = img.load()
    for y in range(h):
        t = y / max(1, h - 1)
        color = stops[0][1]
        for i in range(len(stops) - 1):
            t0, c0 = stops[i]
            t1, c1 = stops[i + 1]
            if t0 <= t <= t1:
                color = lerp_color(c0, c1, (t - t0) / max(1e-6, t1 - t0))
                break
            if t > t1:
                color = stops[-1][1]
        px[0, y] = color
    return img.resize((w, h), Image.BILINEAR)


def terrain_points(w, h, base_y, amplitude, seed, resolution=64):
    """Jagged horizon line points (left -> right)."""
    rng = random.Random(seed)
    ys = []
    for i in range(resolution + 1):
        x = i / resolution
        n = rng.random()
        # Smooth-broken ridge: two octaves.
        oct1 = math.sin(x * math.pi * (1 + seed % 3)) * 0.6
        oct2 = (n - 0.5) * 0.8
        ea = 1.0 if 0.12 < x < 0.9 else 0.35  # ease terrain at the edges
        y = base_y + (oct1 + oct2) * amplitude * ea
        ys.append((int(x * w), int(y)))
    return ys


def fill_terrain(img, points, color, blur=0, alpha=255):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    w, h = img.size
    pts = points + [(w, h), (0, h)]
    d.polygon(pts, fill=color + (alpha,))
    if blur:
        layer = layer.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(layer)


def sun_glow(img, cx, cy, core_r, color, halo_r=None, halo_alpha=70):
    """Soft sun / light source with layered halo."""
    halo_r = halo_r or core_r * 4
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    steps = 14
    for i in range(steps, 0, -1):
        t = i / steps
        r = core_r + (halo_r - core_r) * t
        a = int(halo_alpha * (1 - t) ** 1.6)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (a,))
    d.ellipse([cx - core_r, cy - core_r, cx + core_r, cy + core_r],
              fill=lerp_color(color, CREAM, 0.55) + (200,))
    layer = layer.filter(ImageFilter.GaussianBlur(core_r * 0.12))
    img.alpha_composite(layer)


def haze_band(img, y_top, y_bottom, color, alpha):
    """Atmospheric haze strip between depth layers."""
    w, h = img.size
    grad = Image.new("RGBA", (1, max(1, int(y_bottom - y_top))))
    d = ImageDraw.Draw(grad)
    steps = grad.height
    for i in range(steps):
        t = i / max(1, steps - 1)
        # Fades in then out vertically.
        a = int(alpha * math.sin(t * math.pi))
        d.point((0, i), fill=color + (a,))
    grad = grad.resize((w, grad.height), Image.BILINEAR)
    img.alpha_composite(grad, (0, int(y_top)))


def road(img, y, color, dashed_center=True):
    w, h = img.size
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle([0, y, w, h], fill=color + (255,))
    img.alpha_composite(layer)
    if dashed_center:
        layer2 = Image.new("RGBA", img.size, (0, 0, 0, 0))
        d2 = ImageDraw.Draw(layer2)
        import random as _r
        rnd = _r.Random(42)
        yy = y + int((h - y) * 0.18)
        x = -40
        while x < w:
            seg = rnd.randint(60, 130)
            d2.rectangle([x, yy, x + seg, yy + max(3, img.height // 240)],
                         fill=CREAM + (60,))
            x += seg + rnd.randint(50, 110)
        img.alpha_composite(layer2)


def grain(img, amount=12, alpha=28):
    w, h = img.size
    noise = Image.effect_noise((w // 3, h // 3), amount).resize((w, h), Image.NEAREST)
    g = Image.new("RGBA", img.size, (255, 255, 255, 0))
    g.putalpha(noise.point(lambda v: alpha if v > 128 else alpha // 3))
    g = Image.composite(Image.new("RGBA", img.size, (255, 255, 255, alpha)),
                        Image.new("RGBA", img.size, (0, 0, 0, alpha)), noise)
    g.putalpha(noise.point(lambda v: alpha // 3 if v > 128 else alpha // 5))
    img.alpha_composite(g)


def vignette(img, strength=110):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle(
        [int(w * -0.18), int(h * -0.22), int(w * 1.18), int(h * 1.22)],
        radius=int(min(w, h) * 0.55), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.22))
    dark = Image.new("RGBA", img.size, INK_DARK + (strength,))
    dark.putalpha(Image.eval(mask, lambda v: (strength * v) // 255))
    img.alpha_composite(dark)


# ── Vehicle / structure primitives ─────────────────────────────────────────
def wheel(d, x, y, r, color=CHARCOAL):
    d.ellipse([x - r, y - r, x + r, y + r], fill=color + (255,))
    d.ellipse([x - r * 0.45, y - r * 0.45, x + r * 0.45, y + r * 0.45],
              fill=(90, 96, 92, 255))


def bulk_truck(d, x, y, s, color=CHARCOAL, tub=True, load_color=None):
    """Side-view haul truck facing right. (x, y) = front-bumper ground point."""
    cab_l, cab_h = 2.6 * s, 2.2 * s
    d.polygon([  # cab nose with slight windscreen rake
        (x - cab_l - 1.6 * s, y), (x - cab_l - 1.6 * s, y - cab_h * 0.92),
        (x - cab_l - 0.95 * s, y - cab_h * 1.18), (x - cab_l, y - cab_h * 1.18),
        (x - cab_l, y)], fill=color + (255,))
    d.rectangle([x - cab_l - 0.2 * s, y - cab_h * 0.58, x - cab_l + 0.12 * s,
                 y - cab_h * 0.3], fill=GOLD_SOFT + (150,))  # light
    if tub:
        tub_len, tub_h = 7.4 * s, 1.9 * s
        tx0 = x - cab_l - tub_len - 0.35 * s
        d.polygon([(tx0, y - tub_h * 0.4 - 0.9 * s), (x - cab_l - 0.1 * s, y - tub_h * 0.62),
                   (x - cab_l - 0.1 * s, y - 0.9 * s), (tx0, y - 0.9 * s)],
                  fill=color + (255,))
        if load_color:  # heaped load above the tub
            d.polygon([(tx0 + 0.2 * s, y - tub_h * 0.42 - 0.9 * s),
                       (x - cab_l - 0.25 * s, y - tub_h * 0.66 - 0.2 * s),
                       (x - cab_l - 0.25 * s, y - tub_h * 0.62),
                       (tx0 + 0.2 * s, y - tub_h * 0.46)],
                      fill=load_color + (230,))
    r = 0.52 * s
    axle_positions = [x - cab_l - (tub_len * 0.7 if tub else 5.2 * s),
                      x - cab_l - (tub_len * 0.3 if tub else 3.6 * s),
                      x - 0.62 * s]
    for ax in axle_positions:
        wheel(d, ax, y - r + 1, r)
    # chassis shadow line
    if tub:
        d.rectangle([x - cab_l - tub_len - 0.35 * s, y - 0.95 * s,
                     x - cab_l, y - 0.55 * s], fill=lerp_color(color, (0, 0, 0), 0.25) + (255,))


def box_truck(d, x, y, s, box_color=None, color=CHARCOAL, tautliner=False):
    """(x, y) = front-bumper ground point. Facing right."""
    box_c = box_color or lerp_color(INK, (60, 74, 66), 0.35)
    cab_l, cab_h = 2.4 * s, 2.4 * s
    d.polygon([(x - cab_l - 1.4 * s, y), (x - cab_l - 1.4 * s, y - cab_h * 0.9),
               (x - cab_l - 0.75 * s, y - cab_h * 1.12), (x - cab_l, y - cab_h * 1.12),
               (x - cab_l, y)], fill=color + (255,))
    box_l, box_h, box_t = 8.2 * s, 3.0 * s, cab_h * 1.06
    bx0 = x - cab_l - box_l
    d.rectangle([bx0, y - box_h - box_t, x - cab_l + 0.05 * s, y - box_t],
                fill=box_c + (255,))
    if tautliner:  # vertical curtain folds
        for i in range(1, 12):
            fx = bx0 + (box_l / 12) * i
            d.line([(fx, y - box_h - box_t), (fx, y - box_t)],
                   fill=lerp_color(box_c, (0, 0, 0), 0.35) + (120,), width=max(1, int(s * 0.07)))
    r = 0.5 * s
    for ax in (x - cab_l - box_l * 0.75, x - cab_l - box_l * 0.22, x - 0.6 * s):
        wheel(d, ax, y - r + 1, r)


def crane(d, x, y, s, color=CHARCOAL):
    """Lattice tower crane, mast at (x), ground at y."""
    d.rectangle([x - 0.5 * s, y - 16 * s, x + 0.5 * s, y], fill=color + (255,))
    jib_y = y - 16 * s
    d.rectangle([x - 0.7 * s, jib_y - 0.8 * s, x + 9 * s, jib_y - 0.2 * s],
                fill=color + (255,))
    d.polygon([(x - 3.4 * s, jib_y - 0.8 * s), (x - 0.6 * s, jib_y - 3.2 * s),
               (x + 0.6 * s, jib_y - 3.2 * s), (x - 2.2 * s, jib_y - 0.8 * s)],
              fill=color + (255,))  # operator tower
    d.line([(x + 1.2 * s, jib_y - 0.9 * s), (x + 4.2 * s, y - 2.2 * s)],
           fill=color + (180,), width=max(2, int(s * 0.12)))  # hoist cable
    d.rectangle([x + 3.9 * s, y - 2.9 * s, x + 4.9 * s, y - 2.2 * s],
                fill=GOLD + (255,))  # hook block
    for i in range(1, 6):  # tie stays
        ax = x + 9 * s * (i / 6)
        d.line([(x, jib_y - 2.6 * s), (ax, jib_y - 0.4 * s)],
               fill=color + (120,), width=1)


def container(d, x, y, c, s=1.0):
    w_, h_ = 3.4 * s, 1.1 * s
    d.rectangle([x, y - h_, x + w_, y], fill=c + (255,))
    for i in range(1, 8):
        d.line([(x + w_ / 8 * i, y - h_), (x + w_ / 8 * i, y)],
               fill=(0, 0, 0, 60), width=1)


def silo(d, x, y, hgt, s, color=CHARCOAL, cone=True):
    w_ = 2.6 * s
    ry = y - hgt
    d.rectangle([x - w_ / 2, ry + hgt * 0.28, x + w_ / 2, y], fill=color + (255,))
    if cone:
        d.polygon([(x - w_ / 2 - 0.3 * s, ry + hgt * 0.30),
                   (x + w_ / 2 + 0.3 * s, ry + hgt * 0.30),
                   (x + 0.2 * s, ry + 0.02), (x - 0.2 * s, ry + 0.02)],
                  fill=color + (255,))
    # conical roof
    d.polygon([(x - w_ / 2, ry + hgt * 0.28), (x + w_ / 2, ry + hgt * 0.28),
               (x, ry + hgt * 0.16)], fill=lerp_color(color, (0, 0, 0), 0.2) + (255,))
    for i in range(4):  # ribs
        fx = x - w_ / 2 + w_ * (i + 1) / 5
        d.line([(fx, ry + hgt * 0.3), (fx, y)], fill=(0, 0, 0, 70), width=1)


def escort_pickup(d, x, y, s, color=CHARCOAL, lightbar=True):
    d.rounded_rectangle([x - 4.2 * s, y - 1.5 * s, x, y - 0.62 * s],
                        radius=0.25 * s, fill=color + (255,))
    d.rounded_rectangle([x - 3.35 * s, y - 2.05 * s, x - 1.45 * s, y - 1.4 * s],
                        radius=0.2 * s, fill=lerp_color(color, (0, 0, 0), 0.2) + (255,))
    if lightbar:
        d.rectangle([x - 2.9 * s, y - 2.35 * s, x - 1.9 * s, y - 2.1 * s],
                    fill=GOLD + (255,))
    r = 0.42 * s
    wheel(d, x - 3.1 * s, y - r + 1, r)
    wheel(d, x - 0.75 * s, y - r + 1, r)


def chevron_strip(d, x, y, w_, h_, color_1=GOLD, color_2=CHARCOAL, s=1.0):
    """Hazard chevrons on a strip — used on lowloaders."""
    seg = h_ / 3
    i = 0
    xx = x
    while xx < x + w_:
        d.polygon([(xx, y + h_), (xx + seg, y), (xx + seg * 2, y + h_)],
                  fill=(color_1 if i % 2 == 0 else color_2) + (255,))
        xx += seg
        i += 1


def pit_terraces(d, cx, cy, s, colors):
    """Amphitheatre terraces of an open pit (concentric arcs)."""
    for i, c in enumerate(colors):
        r = (7 + i * 2.6) * s
        d.arc([cx - r, cy - r * 0.38, cx + r, cy + r * 0.38],
              start=200, end=340, fill=c + (235,), width=max(2, int(0.34 * s)))


# ── Label overlay ───────────────────────────────────────────────────────────
FONT_CANDIDATES_BOLD = [
    "C:/Windows/Fonts/seguisb.ttf", "C:/Windows/Fonts/segoeuib.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
]
FONT_CANDIDATES_MONO = [
    "C:/Windows/Fonts/consolab.ttf", "C:/Windows/Fonts/consola.ttf",
]


def _load_font(candidates, size):
    for c in candidates:
        if Path(c).exists():
            try:
                return ImageFont.truetype(c, size)
            except OSError:
                continue
    try:
        return ImageFont.load_default(size)
    except TypeError:
        return ImageFont.load_default()


def add_label(img, index, title, w, h):
    d = ImageDraw.Draw(img, "RGBA")
    sc = w / 1920
    pad = int(64 * sc)

    f_brow = _load_font(FONT_CANDIDATES_MONO, int(30 * sc))
    f_title = _load_font(FONT_CANDIDATES_BOLD, int(96 * sc))
    f_sub = _load_font(FONT_CANDIDATES_MONO, int(26 * sc))
    f_dim = _load_font(FONT_CANDIDATES_MONO, int(24 * sc))

    # Top eyebrow
    brow = f"CARGO FLOW AFRICA — SECTOR PLACEHOLDER {index:02d}"
    # Big title (two lines allowed via '\n' in title)
    lines = title.split("\n")
    y = int(h * 0.52)
    d.text((pad, y), brow, font=f_brow, fill=GOLD + (255,))
    y += int(52 * sc)
    for ln in lines:
        d.text((pad, y), ln, font=f_title, fill=CREAM + (245,))
        y += int(122 * sc)
    y += int(14 * sc)
    d.text((pad, y), f"{w} x {h} — TEMPORARY STAGING ASSET", font=f_sub,
           fill=lerp_color(CREAM, (0, 0, 0), 0.25) + (255,))

    # Dimension chip, bottom-right
    chip = f"{w} x {h} · 16:9"
    tw = d.textlength(chip, font=f_dim)
    ch_y = h - int(56 * sc)
    d.rounded_rectangle([w - pad - tw - 34 * sc, ch_y - 30 * sc, w - pad, ch_y + 26 * sc],
                        radius=24 * sc, fill=INK_DARK + (200,))
    d.text((w - pad - tw - 17 * sc, ch_y - 22 * sc), chip, font=f_dim, fill=GOLD + (255,))
    d.text((pad, ch_y - 22 * sc), "cargoflowafrica.co.za", font=f_dim,
           fill=lerp_color(CREAM, (0, 0, 0), 0.15) + (230,))

    # Thin frame + corner ticks
    m = int(30 * sc)
    d.rectangle([m, m, w - m, h - m], outline=CREAM + (38,), width=1)


# ── Scenes ──────────────────────────────────────────────────────────────────
def scene_mining(img, rng):
    w, h = img.size
    s = h / 1080
    sun_glow(img, int(w * 0.74), int(h * 0.36), int(60 * s), GOLD_SOFT, halo_alpha=80)
    fill_terrain(img, terrain_points(w, h, int(h * 0.44), 60 * s, 11),
                 lerp_color(INK_DARK, INK, 0.55), blur=6 * s)          # far ridge
    fill_terrain(img, terrain_points(w, h, int(h * 0.56), 80 * s, 23),
                 lerp_color(INK, (36, 66, 50), 0.6), blur=2.5 * s)     # mid ridge
    pit_terraces(ImageDraw.Draw(img, "RGBA"), int(w * 0.66), int(h * 0.62),
                 46 * s, [OCHRE, lerp_color(OCHRE, INK_DARK, 0.35), GOLD,
                          lerp_color(GOLD, TERRACOTTA, 0.4)])
    road(img, int(h * 0.72), lerp_color(INDUSTRIAL_GROUND, INK_DARK, 0.25))
    dust = Image.new("RGBA", img.size, (0, 0, 0, 0))
    dd = ImageDraw.Draw(dust)
    for _ in range(26):
        cx = rng.randrange(int(w * 0.25), w)
        cy = int(h * 0.68) + rng.randrange(int(-30 * s), int(40 * s))
        r = rng.randrange(int(30 * s), int(90 * s))
        dd.ellipse([cx - r, cy - r // 2, cx + r, cy + r // 2], fill=OCHRE + (14,))
    dust = dust.filter(ImageFilter.GaussianBlur(22 * s))
    img.alpha_composite(dust)
    bulk_truck(ImageDraw.Draw(img, "RGBA"), int(w * 0.34), int(h * 0.665), 34 * s,
               load_color=lerp_color(OCHRE, (70, 60, 45), 0.4))         # loaded tipper
    bulk_truck(ImageDraw.Draw(img, "RGBA"), int(w * 0.13), int(h * 0.615), 17 * s,
               tub=False)                                               # distant hauler


def scene_agriculture(img, rng):
    w, h = img.size
    s = h / 1080
    sun_glow(img, int(w * 0.30), int(h * 0.30), int(52 * s), GOLD_SOFT, halo_alpha=85)
    fill_terrain(img, terrain_points(w, h, int(h * 0.46), 40 * s, 7),
                 lerp_color(INK_DARK, (52, 84, 58), 0.5), blur=5 * s)
    # Field rows converging to horizon
    d = ImageDraw.Draw(img, "RGBA")
    horizon = int(h * 0.56)
    for i in range(-7, 13):
        x_top = w * 0.5 + i * 34 * s
        x_bot = w * 0.5 + i * 300 * s
        c = lerp_color((90, 120, 70), (140, 120, 60), (i % 2) and 0.5 or 0.0)
        d.polygon([(x_top, horizon), (x_bot, h), (x_bot + 70 * s, h),
                   (x_top + 26 * s, horizon)], fill=c + ((70 if i % 2 else 120),))
    road(img, int(h * 0.66), lerp_color(INDUSTRIAL_GROUND, INK_DARK, 0.15))
    silo(d, int(w * 0.78), int(h * 0.575), 240 * s, 34 * s, color=lerp_color(CHARCOAL, INK, 0.35))
    silo(d, int(w * 0.68), int(h * 0.578), 170 * s, 26 * s, color=lerp_color(CHARCOAL, INK, 0.3))
    # Hopper truck (grain trailer with sloped grain)
    x, y, sc_ = int(w * 0.40), int(h * 0.71), 30 * s
    box_truck(d, x, y, sc_, box_color=lerp_color(INK, (64, 52, 38), 0.5))
    d.polygon([(x - 3.2 * sc_, y - 4.9 * sc_), (x - 8.3 * sc_, y - 3.9 * sc_),
               (x - 8.3 * sc_, y - 4.4 * sc_), (x - 3.2 * sc_, y - 5.3 * sc_)],
              fill=OCHRE + (255,))  # grain heap through the hopper top


def scene_construction(img, rng):
    w, h = img.size
    s = h / 1080
    sun_glow(img, int(w * 0.78), int(h * 0.34), int(48 * s), lerp_color(GOLD, TERRACOTTA, 0.4),
             halo_alpha=85)
    fill_terrain(img, terrain_points(w, h, int(h * 0.50), 55 * s, 5),
                 lerp_color(INK_DARK, TERRACOTTA, 0.28), blur=5 * s)
    d = ImageDraw.Draw(img, "RGBA")
    crane(d, int(w * 0.70), int(h * 0.80), 30 * s)
    # Building skeleton columns
    bx = int(w * 0.09)
    for lvl, x in enumerate(range(bx, bx + int(560 * s), int(84 * s))):
        d.rectangle([x, int(h * 0.60) - lvl * int(4 * s), x + int(40 * s), int(h * 0.80)],
                    fill=lerp_color(INK_DARK, (52, 62, 58), 0.5) + (255,))
    for gy in range(int(h * 0.60), int(h * 0.80), int(26 * s)):
        d.line([(bx, gy), (bx + int(530 * s), gy)], fill=(0, 0, 0, 60), width=2)
    road(img, int(h * 0.78), lerp_color(INDUSTRIAL_GROUND, INK_DARK, 0.2))
    # Cement tanker truck (barrel + cone) and escort pickup
    d2 = ImageDraw.Draw(img, "RGBA")
    x, y, sc_ = int(w * 0.47), int(h * 0.845), 28 * s
    cab_l, cab_h = 2.4 * sc_, 2.3 * sc_
    d2.polygon([(x - cab_l - 1.4 * sc_, y), (x - cab_l - 1.4 * sc_, y - cab_h * 0.9),
                (x - cab_l - 0.75 * sc_, y - cab_h * 1.12), (x - cab_l, y - cab_h * 1.12),
                (x - cab_l, y)], fill=CHARCOAL + (255,))
    tx0 = x - cab_l - 7.6 * sc_
    top, bottom = y - 4.6 * sc_, y - 1.85 * sc_
    d2.rounded_rectangle([tx0, top, x - cab_l + 0.05 * sc_, bottom],
                         radius=1.15 * sc_, fill=(196, 152, 88, 255))
    for fx in (tx0 + 2.4 * sc_, tx0 + 4.8 * sc_):  # barrel bands
        d2.line([(fx, top + 0.3 * sc_), (fx, bottom - 0.3 * sc_)],
                fill=(0, 0, 0, 70), width=2)
    for ax in (x - cab_l - 5.6 * sc_, x - cab_l - 6.8 * sc_, x - 0.6 * sc_):
        wheel(d2, ax, y - 0.5 * sc_ + 1, 0.52 * sc_)
    escort_pickup(d2, int(w * 0.12), int(h * 0.87), 15 * s, lightbar=True)


def scene_manufacturing(img, rng):
    w, h = img.size
    s = h / 1080
    sun_glow(img, int(w * 0.22), int(h * 0.32), int(44 * s), lerp_color(GOLD, (120, 200, 160), 0.25),
             halo_alpha=70)
    fill_terrain(img, terrain_points(w, h, int(h * 0.47), 36 * s, 31),
                 lerp_color(INK_DARK, (44, 74, 60), 0.45), blur=5 * s)
    d = ImageDraw.Draw(img, "RGBA")
    base = int(h * 0.56)
    # Factory skyline: sheds, stacks
    for i, (sw, sh) in enumerate([(300, 170), (380, 220), (260, 150)]):
        x0 = int(w * 0.03 + i * 320 * s)
        d.rectangle([x0, base - int(sh * s), x0 + int(sw * s), base],
                    fill=lerp_color(INK_DARK, (46, 60, 52), 0.5) + (255,))
        d.polygon([(x0 - 10 * s, base - int(sh * s)), (x0 + sw * s + 10 * s, base - int(sh * s)),
                   (x0 + sw * 0.5 * s, base - int(sh * s) - 46 * s)],
                  fill=lerp_color(INK_DARK, (34, 46, 40), 0.5) + (255,))
        for k in range(3):  # roller doors
            d.rectangle([x0 + int((28 + k * 62) * s), base - int(64 * s),
                         x0 + int((64 + k * 62) * s), base], fill=GOLD + (90,))
    # Stacks with steam puffs
    for sx in (0.34, 0.42):
        px = int(w * sx)
        d.rectangle([px, base - int(300 * s), px + int(26 * s), base],
                    fill=lerp_color(INK_DARK, (40, 52, 46), 0.4) + (255,))
        for j in range(3):
            cy = base - int((320 + j * 60) * s) - rng.randrange(0, int(20 * s))
            r = int((26 + j * 9) * s)
            d.ellipse([px - r + 10 * s, cy - r // 2, px + r + 10 * s, cy + r // 2],
                      fill=CREAM + (26 - j * 6,))
    road(img, int(h * 0.70), lerp_color(INDUSTRIAL_GROUND, INK_DARK, 0.18))
    # Tautliner trucks in both directions
    x, y, sc_ = int(w * 0.52), int(h * 0.775), 30 * s
    box_truck(ImageDraw.Draw(img, "RGBA"), x, y, sc_, tautliner=True,
              box_color=lerp_color(INK, (70, 88, 74), 0.4))
    box_truck(ImageDraw.Draw(img, "RGBA"), int(w * 0.88), int(h * 0.735), 16 * s,
              tautliner=True, box_color=lerp_color(INK, (60, 78, 66), 0.4))


def scene_trade(img, rng):
    w, h = img.size
    s = h / 1080
    sun_glow(img, int(w * 0.70), int(h * 0.28), int(46 * s), GOLD_SOFT, halo_alpha=75)
    fill_terrain(img, terrain_points(w, h, int(h * 0.42), 34 * s, 17),
                 lerp_color(INK_DARK, (38, 60, 52), 0.55), blur=5 * s)
    d = ImageDraw.Draw(img, "RGBA")
    base = int(h * 0.60)
    # Container stack wall
    palette = [GOLD, lerp_color(TERRACOTTA, (0, 0, 0), 0.2), lerp_color(INK, (70, 92, 80), 0.2),
               lerp_color(GOLD, TERRACOTTA, 0.35)]
    for row in range(4):
        y0 = base - (row + 1) * int(52 * s)
        for col in range(9):
            cx0 = int(w * 0.04 + col * 172 * s)
            jitter = rng.randrange(-6, 7) * s
            c = palette[(row + col) % 4]
            container(d, cx0 + jitter, y0, c, s=52 * s / 3.4)
    # Gantry crane legs + boom
    gx = int(w * 0.60)
    for leg in (-1, 1):
        d.rectangle([gx + leg * int(230 * s) - int(10 * s), base - int(360 * s),
                     gx + leg * int(230 * s) + int(10 * s), base],
                    fill=lerp_color(CHARCOAL, INK, 0.3) + (255,))
    d.rectangle([gx - int(330 * s), base - int(368 * s), gx + int(360 * s),
                 base - int(340 * s)], fill=lerp_color(CHARCOAL, INK, 0.3) + (255,))
    road(img, int(h * 0.685), lerp_color(INDUSTRIAL_GROUND, INK_DARK, 0.22))
    # Container truck passing
    x, y, sc_ = int(w * 0.60), int(h * 0.80), 28 * s
    box_truck(d, x, y, sc_, box_color=lerp_color(TERRACOTTA, (0, 0, 0), 0.15))
    d.rectangle([x - 3.0 * sc_ - 10.4 * sc_, y - 5.2 * sc_, x - 3.0 * sc_, y - 3.35 * sc_],
                fill=(150, 90, 58, 255))  # raised container


def scene_project(img, rng):
    w, h = img.size
    s = h / 1080
    sun_glow(img, int(w * 0.26), int(h * 0.30), int(50 * s), GOLD_SOFT, halo_alpha=80)
    fill_terrain(img, terrain_points(w, h, int(h * 0.49), 46 * s, 41),
                 lerp_color(INK_DARK, (42, 70, 56), 0.42), blur=5 * s)
    fill_terrain(img, terrain_points(w, h, int(h * 0.58), 60 * s, 43),
                 lerp_color(INK_DARK, INK, 0.35), blur=1.5 * s)
    road(img, int(h * 0.74), lerp_color(INDUSTRIAL_GROUND, INK_DARK, 0.2))
    d = ImageDraw.Draw(img, "RGBA")
    # Low-loader with OOG steel beam
    x, y, sc_ = int(w * 0.64), int(h * 0.83), 29 * s
    cab_l, cab_h = 2.4 * sc_, 2.25 * sc_
    d.polygon([(x - cab_l - 1.4 * sc_, y), (x - cab_l - 1.4 * sc_, y - cab_h * 0.9),
               (x - cab_l - 0.75 * sc_, y - cab_h * 1.1), (x - cab_l, y - cab_h * 1.1),
               (x - cab_l, y)], fill=CHARCOAL + (255,))
    deck_l = 13.5 * sc_
    dx0 = x - cab_l - deck_l
    deck_y0 = y - 2.3 * sc_
    d.rectangle([dx0, deck_y0, x - cab_l + 0.05 * sc_, y - 0.7 * sc_], fill=INK_DARK + (255,))
    chevron_strip(d, dx0 + 0.4 * sc_, deck_y0 - 0.55 * sc_, deck_l - 0.8 * sc_, 0.5 * sc_)
    # OOG beam load riding above deck
    beam_h = 2.1 * sc_
    d.polygon([(dx0 + deck_l * 0.52, deck_y0 - beam_h), (x - cab_l - 1.0 * sc_, deck_y0 - beam_h * 1.06),
               (x - cab_l - 1.0 * sc_, deck_y0 - beam_h * 0.5), (dx0 + deck_l * 0.52, deck_y0 - beam_h * 0.46)],
              fill=lerp_color(OCHRE, (0, 0, 0), 0.3) + (255,))
    for sx in (dx0 + deck_l * 0.2, dx0 + deck_l * 0.42, dx0 + deck_l * 0.62):
        d.rectangle([sx, deck_y0 - beam_h * 0.5, sx + 0.5 * sc_, deck_y0],
                    fill=lerp_color(CHARCOAL, (0, 0, 0), 0.3) + (255,))  # cradle legs
    r = 0.55 * sc_
    for ax in (x - cab_l - 1.0 * sc_, x - cab_l - deck_l * 0.86,
               x - cab_l - deck_l * 0.55, x - 0.6 * sc_):
        wheel(d, ax, y - r + 1, r)
    # Escort convoy: lead pickup ahead of the load + staging pickup behind
    escort_pickup(d, int(w * 0.88), int(h * 0.80), 21 * s, lightbar=True)
    escort_pickup(d, int(w * 0.38), int(h * 0.795), 13 * s, lightbar=True)


INDUSTRIAL_GROUND = (38, 38, 34)


SCENES = [
    ("mining-minerals", "Mining & Minerals", scene_mining, (INK_DARK, lerp_color(INK_DARK, INK, 0.5), lerp_color(CHARCOAL, TERRACOTTA, 0.28))),
    ("agriculture", "Agriculture", scene_agriculture, (INK_DARK, lerp_color(INK_DARK, (52, 84, 58), 0.55), GOLD)),
    ("construction", "Construction &\nInfrastructure", scene_construction, (INK_DARK, lerp_color(INK_DARK, TERRACOTTA, 0.42), lerp_color(TERRACOTTA, GOLD, 0.4))),
    ("manufacturing", "Manufacturing &\nIndustry", scene_manufacturing, (INK_DARK, lerp_color(INK_DARK, (40, 74, 60), 0.6), lerp_color(GOLD, (120, 190, 150), 0.3))),
    ("trade-distribution", "Trade &\nDistribution", scene_trade, (INK_DARK, lerp_color(INK_DARK, (34, 62, 52), 0.55), lerp_color(GOLD, TERRACOTTA, 0.2))),
    ("project-cargo", "Project &\nSpecialised Cargo", scene_project, (INK_DARK, lerp_color(INK_DARK, (48, 66, 52), 0.5), lerp_color(OCHRE, GOLD, 0.3))),
]


def build(scene_fn, index, title, sky, w, h, seed):
    # sky = 3 colors (top, middle, horizon) → multi-stop gradient fractions.
    stops = [(0.0, sky[0]), (0.55, sky[1]), (1.0, sky[2])]
    rng = random.Random(seed)
    img = vertical_gradient((w, h), stops).convert("RGBA")
    scene_fn(img, rng)
    grain(img, alpha=26)
    vignette(img, strength=95)
    img = img.convert("RGB")
    add_label(img, index, title, w, h)
    return img


def main(argv=None):
    ap = argparse.ArgumentParser(description="Generate sector placeholder images.")
    ap.add_argument("--width", type=int, default=W_DEFAULT)
    ap.add_argument("--height", type=int, default=H_DEFAULT)
    ap.add_argument("--format", choices=["webp", "png", "jpg"], default="webp")
    ap.add_argument("--outdir", type=Path, default=OUT_DIR)
    ap.add_argument("--seed", type=int, default=20261110)
    args = ap.parse_args(argv)

    args.outdir.mkdir(parents=True, exist_ok=True)
    base_seed = args.seed

    for i, (sem_id, title, fn, sky) in enumerate(SCENES, start=1):
        img = build(fn, i, title, sky, args.width, args.height, base_seed + i * 17)
        out = args.outdir / f"{sem_id}.{args.format}"
        kw = {}
        if args.format == "webp":
            kw = dict(quality=82, method=6)
        elif args.format == "jpg":
            kw = dict(quality=82, optimize=True)
        img.save(out, **kw)
        kb = out.stat().st_size / 1024
        print(f"[OK] {out.relative_to(out.parent.parent.parent)}  {kb:7.1f} KB")
        if args.format == "webp" and kb > 300:
            print("  [WARN] over 300 KB target - lower --width or quality", file=sys.stderr)
    print(f"\nDone - {len(SCENES)} images in {args.outdir}")


if __name__ == "__main__":
    main()
