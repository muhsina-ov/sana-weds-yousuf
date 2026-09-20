#!/usr/bin/env python3
"""Edge flood-fill cream removal — preserves white dress / skin interiors."""

from __future__ import annotations

import math
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path("/Users/amnasahamed/.cursor/projects/Users-amnasahamed-Desktop-m3-lists/assets")
OUT = ROOT / "public" / "assets" / "layers"
OUT.mkdir(parents=True, exist_ok=True)


def color_dist(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)


def sample_bg(px, w: int, h: int) -> tuple[float, float, float]:
    samples = [
        px[4, 4][:3],
        px[w - 5, 4][:3],
        px[4, h - 5][:3],
        px[w - 5, h - 5][:3],
        px[w // 2, 4][:3],
        px[4, h // 2][:3],
        px[w - 5, h // 2][:3],
    ]
    return (
        sum(s[0] for s in samples) / len(samples),
        sum(s[1] for s in samples) / len(samples),
        sum(s[2] for s in samples) / len(samples),
    )


def edge_flood_alpha(src: Path, dst: Path, *, tol: float = 28.0, feather: int = 2) -> None:
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()
    bg = sample_bg(px, w, h)

    visited = [[False] * w for _ in range(h)]
    bg_mask = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def try_seed(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not visited[y][x]:
            r, g, b, _ = px[x, y]
            if color_dist((r, g, b), bg) <= tol:
                visited[y][x] = True
                bg_mask[y][x] = True
                q.append((x, y))

    for x in range(w):
        try_seed(x, 0)
        try_seed(x, h - 1)
    for y in range(h):
        try_seed(0, y)
        try_seed(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                r, g, b, _ = px[nx, ny]
                if color_dist((r, g, b), bg) <= tol:
                    visited[ny][nx] = True
                    bg_mask[ny][nx] = True
                    q.append((nx, ny))

    # Feather: soft alpha near mask edge
    alpha = [[255] * w for _ in range(h)]
    for y in range(h):
        for x in range(w):
            if bg_mask[y][x]:
                alpha[y][x] = 0

    if feather > 0:
        for y in range(h):
            for x in range(w):
                if alpha[y][x] == 0:
                    continue
                near = False
                for dy in range(-feather, feather + 1):
                    for dx in range(-feather, feather + 1):
                        yy, xx = y + dy, x + dx
                        if 0 <= xx < w and 0 <= yy < h and bg_mask[yy][xx]:
                            near = True
                            break
                    if near:
                        break
                if near:
                    r, g, b, a = px[x, y]
                    # distance-ish softness based on color proximity to bg
                    d = color_dist((r, g, b), bg)
                    t = min(1.0, d / (tol + 12))
                    alpha[y][x] = int(a * (0.35 + 0.65 * t))

    out = Image.new("RGBA", (w, h))
    opx = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            opx[x, y] = (r, g, b, min(a, alpha[y][x]))

    out.save(dst, optimize=True)
    print(f"wrote {dst.name} ({w}x{h})")


def main() -> None:
    bg = ASSETS / "layer-01-background.png"
    if bg.exists():
        Image.open(bg).convert("RGB").save(OUT / "layer-01-background.png", optimize=True)
        print("copied layer-01-background.png")

    # Shadows: keep as soft overlay — use aggressive global key (shadows are darker)
    shadows = ASSETS / "layer-02-shadows.png"
    if shadows.exists():
        # For shadows image, flood-fill cream and keep only darker residual
        edge_flood_alpha(shadows, OUT / "layer-02-shadows.png", tol=24.0, feather=3)

    for name, tol in (
        ("layer-03-groom.png", 30.0),
        ("layer-04-bride.png", 28.0),
        ("layer-05-bouquet.png", 26.0),
    ):
        src = ASSETS / name
        if src.exists():
            edge_flood_alpha(src, OUT / name, tol=tol, feather=2)

    source = OUT / "source-full.png"
    if not source.exists():
        source = ASSETS / "image-f9c7953e-7f01-4a1a-8932-fd0ebe3c2a93.png"
    edge_flood_alpha(source, OUT / "layer-couple.png", tol=26.0, feather=2)

    print("done")


if __name__ == "__main__":
    main()
