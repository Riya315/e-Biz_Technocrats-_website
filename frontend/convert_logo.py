import os

try:
    from PIL import Image
    print("Pillow is installed!")
    
    img_path = r"c:\Users\Riya\OneDrive\Desktop\ebiz gwl\assets\images\logo.jpg"
    out_path = r"c:\Users\Riya\OneDrive\Desktop\ebiz gwl\assets\images\logo.png"
    
    if os.path.exists(img_path):
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Check if the pixel is white or close to white
            # (R > 240, G > 240, B > 240)
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                # Make it transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(out_path, "PNG")
        print("Transparent logo.png created successfully!")
    else:
        print("logo.jpg does not exist at path.")
except ImportError:
    print("Pillow is NOT installed.")
