import json
import os

def generate_metadata():
    # Load the consolidated list of all image paths
    try:
        with open('all_image_paths.json', 'r') as f:
            all_image_paths = json.load(f)
    except FileNotFoundError:
        print("Error: all_image_paths.json not found. Please run consolidate_images.py first.")
        return

    # Load existing metadata from image_links.json to use as a base
    existing_metadata = {}
    try:
        with open('image_links.json', 'r') as f:
            data = json.load(f)
            for item in data:
                existing_metadata[item['url']] = item
    except FileNotFoundError:
        print("Warning: image_links.json not found. All metadata will be generated from scratch.")

    master_metadata = []

    for path in all_image_paths:
        file_name = os.path.basename(path)

        # Default structure
        new_entry = {
            "fileName": file_name,
            "filePath": f"/{path}", # Prepend slash as per requirement
            "altText": f"An educational image titled '{file_name}'.",
            "description": f"A detailed description of the educational image '{file_name}'.",
            "subject": "Social Studies",
            "topics": ["History", "Civics"],
            "questionPrompts": [
                "Generate a question asking the user to identify the main idea of the image.",
                "Create a question that requires analyzing a specific detail within the image."
            ],
            "difficulty": "Medium"
        }

        # If we have existing metadata, use it to populate the new structure
        if path in existing_metadata:
            old_item = existing_metadata[path]
            new_entry["description"] = old_item.get("description", new_entry["description"])
            new_entry["subject"] = old_item.get("subject", new_entry["subject"])

            # Use old topics if they exist, otherwise keep the default
            if "topics" in old_item and old_item["topics"]:
                new_entry["topics"] = old_item["topics"]

            # Generate a more specific altText from the description if possible
            if new_entry["description"]:
                 new_entry["altText"] = f"A {old_item.get('type', 'image')} about {new_entry['topics'][0] if new_entry['topics'] else 'a topic'}. {new_entry['description'].split('.')[0]}."

            # Generate more specific question prompts based on existing data
            new_entry["questionPrompts"] = [
                f"Generate a question about the main subject of this {old_item.get('type', 'image')}, which deals with {', '.join(new_entry['topics'])}.",
                f"Create a question that requires a user to analyze the details of this image concerning {new_entry['topics'][0] if new_entry['topics'] else 'the main topic'}."
            ]

        # Handle the new Social Studies screenshots
        elif "Social Studies/Screenshot" in path:
            new_entry["subject"] = "Social Studies"
            new_entry["altText"] = "A screenshot of a political cartoon or historical document for a Social Studies question."
            new_entry["description"] = "This image is a screenshot, likely containing a political cartoon, map, or historical document, intended for analysis in a Social Studies context."
            new_entry["topics"] = ["U.S. History", "Government", "Political Cartoons", "Data Analysis"]
            new_entry["questionPrompts"] = [
                "Generate a question asking the user to identify the main argument of the political cartoon in the image.",
                "Create a question that requires analyzing the symbolism used in the provided historical image."
            ]
            new_entry["difficulty"] = "Medium"

        # Handle generic science images based on filename
        elif "ged-sci" in file_name:
             new_entry["subject"] = "Science"
             new_entry["topics"] = ["Biology", "Earth Science", "Physics", "Chemistry"]
             new_entry["altText"] = "A diagram or chart related to a science topic."
             new_entry["description"] = f"This image, {file_name}, is a diagram or chart illustrating a concept in science."
             new_entry["questionPrompts"] = [
                "Generate a question asking the user to interpret the scientific diagram.",
                "Create a question based on the data presented in the science chart."
            ]


        master_metadata.append(new_entry)

    # Write the final list to image_metadata.json
    with open('image_metadata.json', 'w') as f:
        json.dump(master_metadata, f, indent=2)

    print(f"Successfully generated and saved metadata for {len(master_metadata)} images to image_metadata.json")

if __name__ == '__main__':
    generate_metadata()