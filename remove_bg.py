from PIL import Image
import os
import sys

def remove_white_bg(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        
        # Save with a new name
        filename = os.path.basename(image_path)
        name, ext = os.path.splitext(filename)
        new_path = os.path.join(os.path.dirname(image_path), f"{name}_nobg{ext}")
        img.save(new_path, "PNG")
        print(f"Processed {image_path} -> {new_path}")
        return new_path
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None

if __name__ == "__main__":
    files = [
        "public/bear_idle_1764444049947.png",
        "public/bear_happy_1764444072743.png",
        "public/bear_sad_1764444095714.png",
        "public/bear_holding_heart_1764444112445.png",
        "public/bear_pleading_1764445551598.png"
    ]
    
    for f in files:
        if os.path.exists(f):
            remove_white_bg(f)
        else:
            print(f"File not found: {f}")
