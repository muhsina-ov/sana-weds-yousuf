import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

def generate_og():
    W, H = 1200, 630
    
    # 1. Base canvas: Luxury Ivory linen gradient (#f6f1e9 to #ebe3d5)
    base = Image.new("RGBA", (W, H), (245, 239, 230, 255))
    
    # Add subtle radial lighting from couple center (x=850, y=315)
    y_coords, x_coords = np.mgrid[0:H, 0:W]
    dist_light = np.sqrt(((x_coords - 850) / 1.4)**2 + (y_coords - 315)**2)
    light_norm = np.clip(1.0 - dist_light / 650.0, 0.0, 1.0)
    
    # Canvas texture / soft noise
    np.random.seed(42)
    noise = np.random.normal(0, 3.5, (H, W))
    
    base_arr = np.array(base, dtype=np.float32)
    # Warmer highlights near couple
    base_arr[:, :, 0] += light_norm * 8.0 + noise
    base_arr[:, :, 1] += light_norm * 6.0 + noise
    base_arr[:, :, 2] += light_norm * 2.0 + noise
    base_arr = np.clip(base_arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(base_arr)
    
    # 2. Draw luxury double gold frame border
    draw = ImageDraw.Draw(img)
    gold_frame = (205, 160, 45, 160)
    gold_thin = (218, 178, 70, 100)
    
    # Outer frame
    draw.rectangle([24, 24, W - 25, H - 25], outline=gold_thin, width=1)
    # Inner frame
    draw.rectangle([32, 32, W - 33, H - 33], outline=gold_frame, width=2)
    
    # Small corner diamond ornaments
    for cx, cy in [(32, 32), (W - 33, 32), (32, H - 33), (W - 33, H - 33)]:
        d = 5
        draw.polygon([(cx, cy - d), (cx + d, cy), (cx, cy + d), (cx - d, cy)], fill=(212, 168, 50, 220))
        
    # 3. Add couple illustration on the right
    couple_path = "public/assets/layers/layer-couple.png"
    if os.path.exists(couple_path):
        couple = Image.open(couple_path).convert("RGBA")
        cw, ch = couple.size
        target_h = 520
        target_w = int(cw * (target_h / ch))
        couple_resized = couple.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Soft shadow behind couple
        shadow = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
        shadow_alpha = np.array(couple_resized)[:, :, 3]
        shadow_arr = np.zeros((target_h, target_w, 4), dtype=np.uint8)
        shadow_arr[:, :, 3] = (shadow_alpha * 0.16).astype(np.uint8)
        shadow_img = Image.fromarray(shadow_arr).filter(ImageFilter.GaussianBlur(radius=8))
        
        couple_x = 760
        couple_y = 65
        img.paste(shadow_img, (couple_x + 6, couple_y + 12), shadow_img)
        img.paste(couple_resized, (couple_x, couple_y), couple_resized)
        
    # 4. Golden bouquet accent placed gracefully between text and couple or lower corner
    bouquet_path = "public/assets/layers/layer-05-bouquet.png"
    if os.path.exists(bouquet_path):
        bouquet = Image.open(bouquet_path).convert("RGBA")
        bw, bh = bouquet.size
        bw_target = 150
        bh_target = int(bh * (bw_target / bw))
        bouquet_resized = bouquet.resize((bw_target, bh_target), Image.Resampling.LANCZOS)
        # Position cleanly on right of text column, around x=610, y=340
        b_arr = np.array(bouquet_resized)
        b_arr[:, :, 3] = (b_arr[:, :, 3] * 0.85).astype(np.uint8)
        bouquet_soft = Image.fromarray(b_arr)
        img.paste(bouquet_soft, (605, 340), bouquet_soft)

    # 5. Typography on the left
    script_font_path = "scripts/fonts/GreatVibes-Regular.ttf"
    serif_bold = "C:/Windows/Fonts/georgiab.ttf"
    serif_reg = "C:/Windows/Fonts/georgia.ttf"
    
    font_script = ImageFont.truetype(script_font_path, 96)
    font_subscript = ImageFont.truetype(script_font_path, 48)
    font_eyebrow = ImageFont.truetype(serif_reg, 14)
    font_event = ImageFont.truetype(serif_bold, 27)
    font_details = ImageFont.truetype(serif_reg, 21)
    font_venue = ImageFont.truetype(serif_bold, 21)
    font_hashtag = ImageFont.truetype(serif_reg, 15)
    
    draw = ImageDraw.Draw(img)
    
    left_x = 85
    
    # Eyebrow
    draw.text((left_x, 82), "T O G E T H E R   W I T H   T H E I R   F A M I L I E S", fill=(125, 110, 95), font=font_eyebrow)
    
    # "Sana & Yousuf"
    sana_text = "Sana"
    draw.text((left_x, 115), sana_text, fill=(30, 25, 20), font=font_script)
    sana_bbox = draw.textbbox((left_x, 115), sana_text, font=font_script)
    
    amp_x = sana_bbox[2] + 20
    draw.text((amp_x, 142), "&", fill=(195, 148, 35), font=font_subscript)
    amp_bbox = draw.textbbox((amp_x, 142), "&", font=font_subscript)
    
    yousuf_x = amp_bbox[2] + 20
    draw.text((yousuf_x, 115), "Yousuf", fill=(30, 25, 20), font=font_script)
    
    # Golden divider line with small central diamond
    div_y = 246
    draw.line([(left_x, div_y), (left_x + 510, div_y)], fill=(212, 175, 55, 160), width=1)
    d = 4
    draw.polygon([(left_x + 255, div_y - d), (left_x + 255 + d, div_y), (left_x + 255, div_y + d), (left_x + 255 - d, div_y)], fill=(205, 160, 40))
    
    # Event title: "THE WALIMA CELEBRATION"
    draw.text((left_x, 272), "THE WALIMA CELEBRATION", fill=(40, 34, 28), font=font_event)
    
    # Date & Time
    draw.text((left_x, 325), "Sunday, 1st November 2026", fill=(65, 54, 42), font=font_details)
    draw.text((left_x, 362), "Reception & Feast at 7:00 PM", fill=(115, 100, 85), font=font_details)
    
    # Venue
    draw.text((left_x, 418), "Sapphire Suites, Metro City Centre", fill=(40, 34, 28), font=font_venue)
    draw.text((left_x, 452), "Nishatganj Bridge, Lucknow, Uttar Pradesh", fill=(105, 92, 78), font=font_details)
    
    # Monogram / Hashtag pill
    pill_w = 265
    pill_h = 36
    pill_y = 510
    draw.rounded_rectangle([left_x, pill_y, left_x + pill_w, pill_y + pill_h], radius=18, outline=(212, 175, 55, 160), width=1, fill=(255, 252, 246, 210))
    draw.text((left_x + 24, pill_y + 8), "#SanaWedsYousuf   ·   S · Y", fill=(140, 110, 40), font=font_hashtag)
    
    # Save output
    out_rgb = img.convert("RGB")
    out_rgb.save("public/og-image.jpg", "JPEG", quality=94, optimize=True)
    out_rgb.save("public/og-image.png", "PNG", optimize=True)
    print("Generated public/og-image.jpg and public/og-image.png (1200x630)")

if __name__ == "__main__":
    generate_og()
