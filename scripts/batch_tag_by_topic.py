"""
Batch Tag Questions by Topic/Category

This script tags entire topics/categories at once based on their title.
Much faster than tagging individual questions.
"""

import re
import json

# Topic-to-tag mapping based on topic titles
TOPIC_TAG_MAP = {
    # MATH topics
    'fractions': ['math-1'],
    'decimals': ['math-1'],
    'percent': ['math-1'],
    'ratio': ['math-1'],
    'proportion': ['math-1'],
    'equations': ['math-2', 'math-3'],
    'inequalities': ['math-3'],
    'word problems': ['math-4'],
    'expressions': ['math-4'],
    'perimeter': ['math-5'],
    'area': ['math-5'],
    'volume': ['math-5'],
    'geometry': ['math-5'],
    'measurement': ['math-5'],
    'graphs': ['math-6'],
    'charts': ['math-6'],
    'data': ['math-6'],
    'tables': ['math-6'],
    'statistics': ['math-6'],
    'calculator': ['math-7'],
    
    # SCIENCE topics
    'life science': ['science-3'],
    'cells': ['science-3'],
    'body systems': ['science-3'],
    'human body': ['science-3'],
    'biology': ['science-3'],
    'photosynthesis': ['science-3'],
    'dna': ['science-3'],
    'genetics': ['science-3'],
    'evolution': ['science-3'],
    'ecology': ['science-3'],
    'physical science': ['science-2'],
    'forces': ['science-2'],
    'motion': ['science-2'],
    'energy': ['science-2'],
    'matter': ['science-2'],
    'chemistry': ['science-2'],
    'reactions': ['science-2'],
    'earth': ['science-4'],
    'weather': ['science-4'],
    'climate': ['science-4'],
    'geology': ['science-4'],
    'astronomy': ['science-4'],
    'space': ['science-4'],
    'planet': ['science-4'],
    'experimental': ['science-5'],
    'scientific method': ['science-5'],
    'hypothesis': ['science-5'],
    
    # RLA topics
    'main idea': ['rla-1'],
    'theme': ['rla-1'],
    'summary': ['rla-1'],
    'details': ['rla-1'],
    'comprehension': ['rla-1'],
    'author': ['rla-2'],
    'purpose': ['rla-2'],
    'tone': ['rla-2'],
    'perspective': ['rla-2'],
    'grammar': ['rla-4'],
    'usage': ['rla-4'],
    'verb': ['rla-4'],
    'pronoun': ['rla-4'],
    'punctuation': ['rla-5'],
    'comma': ['rla-5'],
    'sentence': ['rla-5'],
    'writing': ['rla-6'],
    'essay': ['rla-6'],
    'argument': ['rla-6'],
    'evidence': ['rla-7'],
    'cite': ['rla-7'],
    'support': ['rla-7'],
    
    # SOCIAL STUDIES topics
    'government': ['social-1'],
    'civics': ['social-1'],
    'constitution': ['social-1'],
    'amendment': ['social-1'],
    'rights': ['social-1'],
    'democracy': ['social-1'],
    'geography': ['social-2'],
    'maps': ['social-2'],
    'location': ['social-2'],
    'history': ['social-3'],
    'historical': ['social-3'],
    'civil war': ['social-4'],
    'colonial': ['social-4'],
    'revolution': ['social-4'],
    'independence': ['social-4'],
    'economics': ['social-5'],
    'economy': ['social-5'],
    'supply': ['social-5'],
    'demand': ['social-5'],
    'market': ['social-5'],
    'trade': ['social-5'],
    'documents': ['social-6'],
    'primary source': ['social-6'],
    'secondary source': ['social-6'],
}

def find_topic_title(content, question_pos):
    """Find the topic title for a question"""
    # Search backwards for topic title
    search_start = max(0, question_pos - 3000)
    snippet = content[search_start:question_pos]
    
    # Look for title field
    title_match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", snippet)
    if title_match:
        return title_match.group(1)
    
    # Look for id field
    id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", snippet)
    if id_match:
        return id_match.group(1)
    
    return None

def suggest_tags_for_topic(topic_title):
    """Suggest tags based on topic title"""
    if not topic_title:
        return []
    
    title_lower = topic_title.lower()
    suggested = set()
    
    for keyword, tags in TOPIC_TAG_MAP.items():
        if keyword in title_lower:
            suggested.update(tags)
    
    return sorted(suggested)

def batch_tag_by_topic(file_path, dry_run=True):
    """Batch tag questions by their topic"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all untagged questions
    pattern = r'\{\s*questionNumber:\s*\d+,'
    matches = list(re.finditer(pattern, content))
    
    modified_content = content
    offset = 0
    
    topic_tags = {}  # Track what we're tagging for each topic
    questions_by_topic = {}
    
    for match in matches:
        start = match.start() + offset
        snippet = modified_content[start:start+500]
        
        # Skip if already tagged
        if 'challenge_tags' in snippet:
            continue
        
        # Find topic
        topic = find_topic_title(modified_content, start)
        if not topic:
            continue
        
        # Track for display
        if topic not in questions_by_topic:
            questions_by_topic[topic] = 0
        questions_by_topic[topic] += 1
        
        # Get suggested tags if we haven't already
        if topic not in topic_tags:
            suggested = suggest_tags_for_topic(topic)
            if suggested:
                topic_tags[topic] = suggested
        
        # Apply tags if we have them
        if topic in topic_tags:
            tags = topic_tags[topic]
            insert_match = re.search(r'(questionNumber:\s*\d+,)', snippet)
            if insert_match:
                insert_pos = start + insert_match.end()
                tags_str = f"\n                challenge_tags: {json.dumps(tags)},"
                
                if not dry_run:
                    modified_content = modified_content[:insert_pos] + tags_str + modified_content[insert_pos:]
                    offset += len(tags_str)
    
    # Print summary
    print(f"\n{'='*70}")
    print(f"BATCH TAGGING BY TOPIC")
    print(f"{'='*70}\n")
    
    for topic in sorted(questions_by_topic.keys()):
        count = questions_by_topic[topic]
        tags = topic_tags.get(topic, [])
        if tags:
            print(f"✓ {topic}")
            print(f"  Questions: {count}")
            print(f"  Tags: {', '.join(tags)}")
            print()
    
    total_tagged = sum(questions_by_topic[t] for t in topic_tags.keys())
    total_untagged = sum(questions_by_topic.values())
    
    print(f"{'='*70}")
    print(f"Summary:")
    print(f"  Topics with suggested tags: {len(topic_tags)}")
    print(f"  Questions to be tagged: {total_tagged}")
    print(f"  Questions without topic match: {total_untagged - total_tagged}")
    print(f"{'='*70}\n")
    
    if not dry_run and total_tagged > 0:
        backup_path = file_path + '.backup2'
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Original backed up to: {backup_path}")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(modified_content)
        print(f"Changes written to: {file_path}")
    elif dry_run:
        print("DRY RUN - No changes written. Run with --apply to save changes.")

if __name__ == '__main__':
    import sys
    
    file_path = r'c:\Users\Zacha\Ged-Website\frontend\app.jsx'
    dry_run = '--apply' not in sys.argv
    
    print(f"File: {file_path}")
    print(f"Mode: {'DRY RUN' if dry_run else 'APPLY CHANGES'}\n")
    
    batch_tag_by_topic(file_path, dry_run=dry_run)
