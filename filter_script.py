import json
import re

# Load existing and new data
try:
    with open("image_links.json", "r") as f:
        existing_images = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    existing_images = []

try:
    with open("new_images.json", "r") as f:
        new_data = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    new_data = {}

# --- Enhanced Duplicate Detection Logic ---

# Set of existing URLs for fast lookup
existing_urls = {img["url"] for img in existing_images}

# Define a list of key phrases that indicate a specific concept.
key_phrases = [
    "plant cell", "dna double helix", "atom structure", "periodic table",
    "water cycle", "earth's internal layers", "branches of government",
    "supply & demand", "rosie the riveter", "lewis and clark", "join, or die",
    "bosses of the senate", "13 colonies", "thirteen colonies", "roman empire",
    "columbus' voyages", "iron curtain", "civil war map", "louisiana purchase",
    "checks and balances", "electoral map", "u.s. territorial gains", "territorial acquisitions",
    "punnett square", "food chain", "food web", "states of matter", "triangular trade",
    "encomienda system", "manifest destiny", "circulatory", "respiratory", "rock cycle"
]

def normalize_text(text):
    """Lowercase and remove punctuation."""
    return re.sub(r"[^\w\s]", "", text.lower())

def get_concepts_from_desc(description, phrases):
    """Extract a set of concepts from a description based on key phrases."""
    found_concepts = set()
    normalized_desc = normalize_text(description)
    for phrase in phrases:
        # Use word boundaries to avoid partial matches (e.g., 'atom' in 'automatic')
        if re.search(r'\b' + re.escape(normalize_text(phrase)) + r'\b', normalized_desc):
            concept = phrase.replace(" ", "_").replace("'", "")
            if "colonies" in concept:
                concept = "13_colonies"
            if "territorial" in concept:
                concept = "territorial_gains"
            found_concepts.add(concept)
    return found_concepts

# Build a set of all concepts covered by the existing images
existing_concepts = set()
for img in existing_images:
    concepts = get_concepts_from_desc(img["description"], key_phrases)
    existing_concepts.update(concepts)

# --- Filter the New Images ---

non_redundant_images = []
processed_urls = set(existing_urls)

# Flatten the new data into a single list
flat_new_images = []
for subject, images in new_data.items():
    for image in images:
        image["subject"] = subject
        flat_new_images.append(image)

for new_img in flat_new_images:
    is_duplicate = False

    # 1. Check for URL duplication
    if new_img["url"] in processed_urls:
        is_duplicate = True
        continue

    # 2. Check for conceptual duplication
    new_concepts = get_concepts_from_desc(new_img["description"], key_phrases)

    if new_concepts and new_concepts.issubset(existing_concepts):
        print(f"Found duplicate for concept(s): {new_concepts}. URL: {new_img['url']}")
        is_duplicate = True

    if not is_duplicate:
        non_redundant_images.append(new_img)
        processed_urls.add(new_img["url"])
        existing_concepts.update(new_concepts)

# Overwrite the file with the properly filtered list
with open("non_redundant_images.json", "w") as f:
    json.dump(non_redundant_images, f, indent=2)

print("Filtered non-redundant images with enhanced logic and saved to non_redundant_images.json")