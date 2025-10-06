import json
import os
import google.generativeai as genai
import time
import sys
import requests

# --- Configuration ---
BASE_URL = "https://ezged.netlify.app"
INPUT_FILE = "backend/image_metadata_final.json"
OUTPUT_FILE = "backend/image_metadata_expanded_v2.json"
# Set to True to process only the first image for testing purposes.
# Set to False to process all images.
DEBUG_MODE = False

# --- Model Configuration ---
VISION_MODEL = "models/gemini-2.5-flash-image"

print("--- Script Starting ---")

# --- Get API Key ---
print("Attempting to get API key...")
api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("API key is required. Set the GEMINI_API_KEY environment variable. Exiting.")
    exit(1)
print("API key found.")

print("Configuring Generative AI...")
try:
    genai.configure(api_key=api_key)
    print(f"Generative AI configured successfully. Using model: {VISION_MODEL}")
except Exception as e:
    print(f"Failed to configure Generative AI: {e}")
    exit(1)


# --- Multimodal Prompt Template ---
PROMPT_TEMPLATE = """
You are a data enrichment specialist for a GED educational website. Your task is to analyze the provided image and write a new, comprehensive 'detailedDescription' that is objective and useful for generating exam questions.

Your description MUST follow this two-part structure:
1.  **Sentence 1 (Identification):** Start by identifying the image type (e.g., flowchart, bar graph, political cartoon, map), its official title if present, and its main subject or purpose.
2.  **Sentence 2 (Detailed Observation):** In a second sentence, describe the key data, components, or symbolism shown in the image. For a graph, mention the axes and a key trend. For a map, describe the key areas or routes shown. For a diagram, explain the central process being illustrated.

**Crucially, base your entire description ONLY on the visual information present in the image. Do not add any information or context that cannot be directly seen.**

Provide only the new, two-part detailedDescription as your output.
"""

def generate_new_description(image_url, retries=3, delay=5):
    """
    Makes an API call to the Gemini model to generate a new description for the given image URL.
    Includes retry logic for handling potential API errors.
    """
    print(f"  - Generating description for: {image_url}")
    for attempt in range(retries):
        try:
            print(f"  - API Call Attempt {attempt + 1}/{retries}")

            # 1. Fetch the image data from the URL
            print("    - Fetching image content from URL...")
            response = requests.get(image_url, timeout=20)
            response.raise_for_status() # Raise an exception for bad status codes (like 404)
            image_data = response.content
            print("    - Image content fetched successfully.")

            # 2. Prepare the image part for the API call
            # The API expects the raw image bytes in the 'data' field.
            image_part = {
                "mime_type": "image/jpeg", # Assuming JPEG, but PNG/etc. should also work
                "data": image_data
            }

            # 3. Make the API call
            model = genai.GenerativeModel(VISION_MODEL)
            print("    - Making generate_content call to Gemini...")
            api_response = model.generate_content([PROMPT_TEMPLATE, image_part])

            if api_response.parts:
                description = api_response.text.strip().replace("```", "").strip()
                print("  - Successfully generated new description.")
                return description
            else:
                print(f"  - Warning: Received no content for {image_url}. Full response: {api_response}")
                return None

        except requests.exceptions.RequestException as e:
            print(f"  - Error fetching image URL on attempt {attempt + 1}: {e}")
        except Exception as e:
            print(f"  - Error during Gemini API call on attempt {attempt + 1}: {e}")

        if attempt < retries - 1:
            print(f"  - Retrying in {delay} seconds...")
            time.sleep(delay)
        else:
            print(f"  - Failed to generate description for {image_url} after {retries} attempts.")
            return None

def main():
    """
    Main function to run the script.
    """
    print("--- Main Function Started ---")

    # Load the input JSON data
    try:
        print(f"Loading input file: {INPUT_FILE}")
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            image_data = json.load(f)
        print(f"Successfully loaded {len(image_data)} image records.")
    except FileNotFoundError:
        print(f"Error: Input file not found at {INPUT_FILE}")
        return
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {INPUT_FILE}")
        return

    if DEBUG_MODE:
        print("--- RUNNING IN DEBUG MODE (processing first image only) ---")
        image_data = image_data[:1]
        global OUTPUT_FILE
        OUTPUT_FILE = "backend/image_metadata_expanded_debug.json"

    updated_data = []
    total_images = len(image_data)
    print(f"Processing {total_images} image(s).")

    for i, image_obj in enumerate(image_data):
        print(f"\nProcessing image {i + 1}/{total_images}: {image_obj.get('fileName', 'N/A')}")

        file_path = image_obj.get("filePath")
        if not file_path:
            print("  - Skipping image due to missing 'filePath'.")
            updated_data.append(image_obj)
            continue

        if file_path.startswith('/frontend/'):
            cleaned_path = file_path[len('/frontend'):]
        else:
            cleaned_path = file_path

        image_url = f"{BASE_URL}{cleaned_path.replace(' ', '%20')}"
        print(f"  - Constructed URL: {image_url}")

        new_description = generate_new_description(image_url)

        if new_description:
            image_obj["detailedDescription"] = new_description
        else:
            print("  - Using existing description due to generation failure.")

        updated_data.append(image_obj)

    try:
        print(f"\nSaving updated data to {OUTPUT_FILE}...")
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(updated_data, f, indent=2, ensure_ascii=False)
        print(f"Enrichment complete. Updated data saved to {OUTPUT_FILE}")
    except IOError as e:
        print(f"Error writing to output file {OUTPUT_FILE}: {e}")

if __name__ == "__main__":
    main()