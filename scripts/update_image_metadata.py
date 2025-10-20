import json
import os
import time
from pathlib import Path

import google.generativeai as genai
from dotenv import load_dotenv
from PIL import Image

# --- Configuration ---
BASE_DIR = Path(__file__).resolve().parents[1]
# Load environment variables from optional local files
load_dotenv(BASE_DIR / '.env')
load_dotenv(BASE_DIR / 'backend' / '.env')

# Constants
IMAGES_DIR = BASE_DIR / "frontend" / "Images"
METADATA_FILE = BASE_DIR / "backend" / "data" / "image_metadata_final.json"
BASE_URL = "https://ezged.netlify.app/Images/"

# --- Main Functions ---

def configure_ai():
    """Configures the Generative AI model."""
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("Error: GOOGLE_API_KEY not found in environment variables.")
        print("Please create a .env file and add your key: GOOGLE_API_KEY='your_key_here'")
        return None
    genai.configure(api_key=api_key)
    # Using a model that is confirmed to be available and supports image inputs.
    return genai.GenerativeModel('models/gemini-2.5-flash-image-preview')

def load_existing_metadata(filepath):
    """Loads the existing metadata from the JSON file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Warning: Metadata file not found at '{filepath}'. A new one will be created.")
        return []
    except json.JSONDecodeError:
        print(f"Warning: Could not decode JSON from '{filepath}'. Starting with an empty list.")
        return []

def get_existing_filenames(metadata):
    """Creates a set of existing filenames for quick lookup."""
    return {item.get('fileName') for item in metadata if 'fileName' in item}

def scan_image_directories(path):
    """Scans all subdirectories for valid image files."""
    supported_suffixes = {'.png', '.jpg', '.jpeg', '.gif'}
    return [p for p in path.rglob('*') if p.suffix.lower() in supported_suffixes]

def identify_new_images(image_paths, existing_filenames):
    """Identifies new images that are not in the metadata file."""
    new_images = []
    for path in image_paths:
        filename = path.name
        if filename not in existing_filenames:
            new_images.append(path)
    return new_images

def generate_description(model, image_path):
    """
    Generates a detailed description for an image using the Gemini Vision model.
    """
    prompt = """
You are a data enrichment specialist for a GED educational website. Your task is to analyze the provided image and write a new, comprehensive 'detailedDescription' that is objective and useful for generating exam questions for both Social Studies and Science.

Your description MUST follow this two-part structure:

1.  **Sentence 1 (Identification):** Start by identifying the image type (e.g., bar graph, map, political cartoon, scientific diagram, data table, flowchart), its official title if present, and its main subject or purpose.

2.  **Sentence 2 (Detailed Observation):** In a second sentence, describe the key data, components, or relationships shown in the image. Follow these guidelines for different image types:
    * **For Graphs or Charts:** Mention the title, axes, data points, and identify the main trend or comparison being shown.
    * **For Maps:** Describe the title, legend, key geographical areas, and the historical, political, or demographic information being represented.
    * **For Political Cartoons:** Describe the characters, symbols, text, and the overall political or social message.
    * **For Scientific Diagrams (e.g., a food web, cell, or cycle):** Identify the key components and explain the process or relationships the arrows and labels illustrate.
    * **For Flowcharts:** Explain the sequence of steps, decisions, or cause-and-effect relationships shown.

**Crucially, base your entire description ONLY on the visual information present in the image. Do not add any information or context that cannot be directly seen.**

Provide only the new, two-part detailedDescription as your output.
"""
    try:
        image_name = Path(image_path).name
        print(f"INFO: Processing image '{image_name}'...")
        img = Image.open(image_path)
        response = model.generate_content([prompt, img])

        # Improved error handling for blocked or empty responses
        try:
            return response.text.strip()
        except ValueError:
            if response.prompt_feedback.block_reason:
                block_reason_name = response.prompt_feedback.block_reason.name
                print(f"WARN: Description for '{image_name}' was blocked. Reason: {block_reason_name}")
                return f"Error: Description generation blocked due to {block_reason_name}."
            else:
                print(f"WARN: Could not generate description for '{image_name}'. Response was empty.")
                return "Error: Could not generate a description for this image. The response was empty."

    except Exception as e:
        error_message = str(e)
        print(f"ERROR: Failed to generate description for '{image_path}'. Reason: {error_message}")
        if "API key not valid" in error_message:
            return "STOP: The provided GOOGLE_API_KEY is not valid. Please check your key."
        if "429" in error_message or "Resource has been exhausted" in error_message:
            print("INFO: Rate limit likely reached. Waiting for 60 seconds before retry...")
            time.sleep(60)
            return generate_description(model, image_path) # Retry once
        return f"Error: Could not generate description. Details: {error_message}"


def main():
    """Main function to scan for new images and update metadata."""
    print("--- Starting Image Metadata Update Process ---")

    model = configure_ai()
    if not model:
        return

    existing_metadata = load_existing_metadata(METADATA_FILE)
    existing_filenames = get_existing_filenames(existing_metadata)
    print(f"Found {len(existing_metadata)} existing image entries.")

    all_image_paths = scan_image_directories(IMAGES_DIR)
    images_dir_display = IMAGES_DIR.relative_to(BASE_DIR)
    print(f"Found {len(all_image_paths)} total images in '{images_dir_display}'.")

    new_image_paths = identify_new_images(all_image_paths, existing_filenames)

    if not new_image_paths:
        print("No new images found. Metadata is already up-to-date.")
        print("--- Process Complete ---")
        return

    print(f"Found {len(new_image_paths)} new images to process.")

    new_metadata_entries = []
    for path in new_image_paths:
        filename = path.name
        relative_path = path.relative_to(IMAGES_DIR)
        relative_parts = relative_path.parts
        subject = relative_parts[0] if len(relative_parts) > 1 else 'General'
        if len(relative_parts) > 1:
            relative_url = '/'.join(relative_parts)
        else:
            relative_url = f"{subject}/{relative_parts[0]}"

        image_url = BASE_URL + relative_url

        description = generate_description(model, path)

        if "STOP:" in description:
            print(f"Halting process due to critical error: {description}")
            return

        new_entry = {
            "fileName": filename,
            "filePath": image_url,
            "subject": subject,
            "detailedDescription": description,
            "altText": f"Image of {filename}",
            "keywords": [subject]
        }
        new_metadata_entries.append(new_entry)

        time.sleep(2) # Add a 2-second delay to respect rate limits

    updated_metadata = existing_metadata + new_metadata_entries
    try:
        with open(METADATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(updated_metadata, f, ensure_ascii=False, indent=4)
        print(f"Successfully added {len(new_metadata_entries)} new image entries to '{METADATA_FILE.relative_to(BASE_DIR)}'.")
    except IOError as e:
        print(f"ERROR: Could not write to metadata file '{METADATA_FILE}'. Reason: {e}")

    print("--- Process Complete ---")


if __name__ == "__main__":
    main()
