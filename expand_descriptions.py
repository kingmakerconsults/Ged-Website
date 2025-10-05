import json
import os

# This is a mock function to simulate calling an AI API like Gemini.
# In a real-world scenario, this function would make an HTTP request to the AI service.
def generate_ai_description(subject, alt_text, keywords):
    """
    Simulates a call to an AI to generate a detailed description.
    """
    # Create a detailed prompt based on the item's data
    prompt = f"""
    Based on the following metadata, write a new 'detailedDescription' that is objective, comprehensive, and useful for generating exam questions.

    **Existing Metadata:**
    - **Subject:** {subject}
    - **Alt Text:** {alt_text}
    - **Keywords:** {', '.join(keywords)}

    **Instructions for the new 'detailedDescription':**
    - If the image is a chart, graph, or map: Describe its type, title, labels, data, trends, and key takeaway.
    - If the image is a political cartoon: Describe the scene, characters, text, symbolism, and overall message.
    - If it's a scientific diagram: Describe the components, relationships, and the process it illustrates.
    - The tone should be neutral and encyclopedic. The description should be a paragraph or two long.
    """

    # --- AI Simulation Logic ---
    # This part simulates the AI's response based on the prompt.
    # A real implementation would involve an API call, error handling, etc.

    # A simple simulation: We'll build a description from the keywords and alt text.
    # This is a placeholder for a real AI's more sophisticated output.
    base_description = alt_text.replace("This is an image related to: ", "")
    keyword_string = ", ".join(keywords)

    if "chart" in base_description or "graph" in base_description:
        return f"This is a chart or graph illustrating the concept of '{base_description}'. It presents data related to topics such as {keyword_string}. Analysis of this visual information may require understanding trends, comparing data points, or interpreting the central message conveyed by the chart."
    elif "map" in base_description:
        return f"This is a map depicting '{base_description}'. It shows geographical information relevant to {keyword_string}. Understanding this map may involve interpreting its legend, understanding spatial relationships, or drawing conclusions about historical or political events shown."
    elif "cartoon" in base_description:
        return f"This is a political cartoon about '{base_description}'. It likely uses symbolism and caricature to comment on historical or political events related to {keyword_string}. Interpretation requires analyzing the visual elements and understanding the cartoon's persuasive message."
    else:
        return f"This image is related to '{base_description}'. It covers topics such as {keyword_string}. A detailed analysis would involve examining the visual components to understand its meaning or the process it illustrates."

def expand_metadata_descriptions(input_file, output_file):
    """
    Reads image metadata, generates expanded descriptions, and saves to a new file.
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            metadata_list = json.load(f)
    except FileNotFoundError:
        print(f"Error: Input file not found at {input_file}")
        return
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {input_file}")
        return

    print(f"Loaded {len(metadata_list)} items from {input_file}")

    # Iterate through each item and update the detailedDescription
    for i, item in enumerate(metadata_list):
        print(f"Processing item {i+1}/{len(metadata_list)}: {item.get('fileName')}")

        # Extract existing data
        subject = item.get('subject', 'N/A')
        alt_text = item.get('altText', '')
        keywords = item.get('keywords', [])

        # Generate the new description (simulated AI call)
        new_description = generate_ai_description(subject, alt_text, keywords)

        # Update the 'detailedDescription' field
        item['detailedDescription'] = new_description

    # Save the updated list to a new file
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(metadata_list, f, indent=2)
        print(f"\nSuccessfully saved expanded metadata to {output_file}")
    except IOError as e:
        print(f"Error writing to output file {output_file}: {e}")

if __name__ == '__main__':
    # Define the input and output file paths
    # Assuming the script is run from the root directory
    input_json_path = os.path.join('backend', 'image_metadata_final.json')
    output_json_path = os.path.join('backend', 'image_metadata_expanded.json')

    # Run the expansion process
    expand_metadata_descriptions(input_json_path, output_json_path)