import json
import re

def get_image_type(description):
    """Determine the image type from its description."""
    desc = description.lower()
    if "cartoon" in desc:
        return "Political Cartoon"
    if "map" in desc:
        return "Map"
    if "graph" in desc or "chart" in desc or "table" in desc:
        return "Data Chart"
    if "diagram" in desc or "illustrating" in desc or "system" in desc or "cycle" in desc:
        return "Diagram"
    if "painting" in desc or "allegorical" in desc:
        return "Illustration"
    return "Illustration"

def get_era(description):
    """Determine the historical era from the description."""
    desc = description.lower()
    if "1775" in desc or "colonial" in desc or "colonies" in desc:
        return "Colonial Period"
    if "encomienda" in desc or "triangular trade" in desc:
        return "Age of Exploration"
    if "19th century" in desc or "abolitionist" in desc or "manifest destiny" in desc:
        return "19th Century"
    return "N/A"

def get_topics(description, subject):
    """Generate a list of topics from the description."""
    # Normalize text: lowercase, remove non-alphanumeric characters
    normalized = re.sub(r"[^\w\s-]", "", description.lower())
    # Remove common stopwords
    stopwords = {"a", "an", "the", "of", "in", "with", "and", "or", "showing", "for", "suitable", "questions", "labeled", "diagram", "map", "graph", "chart", "illustrating", "illustration", "political", "cartoon"}
    tokens = [word for word in normalized.split() if word not in stopwords and len(word) > 3]

    # Add the subject as a topic
    topics = set(tokens)
    topics.add(subject.lower())
    return sorted(list(topics))

# Load existing and new data
try:
    with open("image_links.json", "r") as f:
        existing_images = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    existing_images = []

try:
    with open("non_redundant_images.json", "r") as f:
        new_images = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    new_images = []

# Process each new image to add the required fields
formatted_new_images = []
for image in new_images:
    description = image["description"]
    subject = image["subject"]

    formatted_image = {
        "url": image["url"],
        "description": description,
        "type": get_image_type(description),
        "subject": subject,
        "era": get_era(description),
        "topics": get_topics(description, subject)
    }
    formatted_new_images.append(formatted_image)

# Merge the lists and write back to the main file
final_image_list = existing_images + formatted_new_images

with open("image_links.json", "w") as f:
    json.dump(final_image_list, f, indent=2)

print(f"Successfully merged {len(formatted_new_images)} new images into image_links.json.")