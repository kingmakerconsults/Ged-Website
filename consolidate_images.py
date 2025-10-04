import json
import os
import re

def find_image_paths():
    all_paths = set()

    # 1. Read from image_links.json
    try:
        with open('image_links.json', 'r') as f:
            data = json.load(f)
            for item in data:
                if 'url' in item:
                    all_paths.add(item['url'])
    except FileNotFoundError:
        print("image_links.json not found.")
    except json.JSONDecodeError:
        print("Could not decode image_links.json.")

    # 2. List files in frontend/Images/Social Studies/
    social_studies_dir = 'frontend/Images/Social Studies/'
    try:
        if os.path.exists(social_studies_dir):
            for filename in os.listdir(social_studies_dir):
                # Construct the full path relative to the repo root
                full_path = os.path.join(social_studies_dir, filename).replace('\\', '/')
                all_paths.add(full_path)
    except FileNotFoundError:
        print(f"Directory not found: {social_studies_dir}")


    # 3. Read from frontend/index.html
    try:
        with open('frontend/index.html', 'r', encoding='utf-8') as f:
            content = f.read()
            # Regex to find image URLs within imageUrl properties or src attributes
            # It looks for patterns like: imageUrl: "...", imageUrl: '...', src="..." etc.
            # It captures the path inside the quotes.
            image_urls = re.findall(r'(?:imageUrl|src):\s*["\'](Images/[^"\']+)["\']', content)
            for url in image_urls:
                # The regex captures the path starting with "Images/", so we prepend "frontend/"
                full_path = f"frontend/{url}"
                all_paths.add(full_path)
    except FileNotFoundError:
        print("frontend/index.html not found.")


    # 4. Save the consolidated list
    with open('all_image_paths.json', 'w') as f:
        json.dump(sorted(list(all_paths)), f, indent=4)

    print(f"Found and saved {len(all_paths)} unique image paths to all_image_paths.json")

if __name__ == '__main__':
    find_image_paths()