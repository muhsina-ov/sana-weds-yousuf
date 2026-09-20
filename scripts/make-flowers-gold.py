import os
import numpy as np
from PIL import Image, ImageFilter

def make_bouquet_gold():
    src_path = 'public/assets/layers/layer-05-bouquet.png'
    backup_path = 'public/assets/layers/layer-05-bouquet-white-orig.png'
    if not os.path.exists(backup_path):
        Image.open(src_path).save(backup_path)

    im = Image.open(backup_path).convert('RGBA')
    arr = np.array(im, dtype=np.float32)

    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]
    a = arr[:, :, 3]

    lum = 0.299 * r + 0.587 * g + 0.114 * b
    h, w = arr.shape[:2]
    y_coords, x_coords = np.mgrid[0:h, 0:w]

    # Flower petals are in the upper region (y < 460)
    # Stems are distinctly green (g > r + 15) and lum < 185
    is_stem = (g > r + 15) & (lum < 185) & (y_coords > 220)
    # The ribbon bow is around y > 440 in the center, bright white with horizontal bow shape
    # Petals: y_coords < 455, not stem, visible alpha, brightness > 80
    petal_mask = (y_coords < 455) & (a > 30) & (~is_stem) & (lum > 70)

    # Convert petal_mask to soft float mask
    mask_im = Image.fromarray((petal_mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius=2.0))
    soft_mask = np.array(mask_im, dtype=np.float32) / 255.0

    # Normalized luminance of petals [0, 1]
    norm_lum = np.clip((lum - 60.0) / (255.0 - 60.0), 0.0, 1.0)

    # Rich metallic gold palette:
    # Deep shadow: (150, 95, 15)
    # Warm gold midtone: (220, 168, 35)
    # Radiant gold: (252, 218, 90)
    # Shimmer highlight: (255, 242, 165)
    gold_r = 150.0 + (255.0 - 150.0) * np.power(norm_lum, 0.75)
    gold_g = 95.0 + (242.0 - 95.0) * np.power(norm_lum, 0.95)
    gold_b = 15.0 + (165.0 - 15.0) * np.power(norm_lum, 1.5)

    # Blend original with gold based on soft_mask
    blend = soft_mask[:, :, np.newaxis]
    out_rgb = arr[:, :, :3] * (1.0 - blend) + np.stack([gold_r, gold_g, gold_b], axis=-1) * blend
    out_arr = np.concatenate([np.clip(out_rgb, 0, 255), arr[:, :, 3:4]], axis=-1).astype(np.uint8)

    Image.fromarray(out_arr).save(src_path, optimize=True)
    print('Created golden bouquet at', src_path)

if __name__ == '__main__':
    make_bouquet_gold()
