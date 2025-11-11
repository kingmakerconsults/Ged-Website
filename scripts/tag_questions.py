"""
Question Tagging Helper Script

This script helps you add challenge_tags to questions in app.jsx.
It will show you each question and let you select appropriate tags.

Challenge Tag Reference:
MATH:
  math-1: Fractions, decimals, %
  math-2: Writing and solving 1-step equations
  math-3: 2-step equations & inequalities
  math-4: Translating real situations to expressions
  math-5: Perimeter, area, and volume
  math-6: Reading tables, charts, and graphs
  math-7: Using the calculator efficiently
  math-8: Multi-step GED-style math items

RLA:
  rla-1: Main idea and supporting details
  rla-2: Author's purpose & tone
  rla-3: Reading charts / text together
  rla-4: Grammar, usage, and mechanics
  rla-5: Punctuation and sentence boundaries
  rla-6: Organizing ideas for responses
  rla-7: Citing evidence from the passage

SCIENCE:
  science-1: Reading charts and graphs
  science-2: Forces, motion, and energy
  science-3: Cells and human body systems
  science-4: Weather, climate, earth systems
  science-5: Experimental design & variables
  science-6: Cause-and-effect in passages

SOCIAL STUDIES:
  social-1: Government and civics concepts
  social-2: Interpreting maps and data
  social-3: Remembering historical events
  social-4: Colonial → Civil War sequence
  social-5: Basic economics and graphs
  social-6: Reading primary/secondary sources
"""

import re
import json

# Tag definitions
TAG_INFO = {
    'math-1': 'Fractions, decimals, %',
    'math-2': 'Writing and solving 1-step equations',
    'math-3': '2-step equations & inequalities',
    'math-4': 'Translating real situations to expressions',
    'math-5': 'Perimeter, area, and volume',
    'math-6': 'Reading tables, charts, and graphs',
    'math-7': 'Using the calculator efficiently',
    'math-8': 'Multi-step GED-style math items',
    'rla-1': 'Main idea and supporting details',
    'rla-2': "Author's purpose & tone",
    'rla-3': 'Reading charts / text together',
    'rla-4': 'Grammar, usage, and mechanics',
    'rla-5': 'Punctuation and sentence boundaries',
    'rla-6': 'Organizing ideas for responses',
    'rla-7': 'Citing evidence from the passage',
    'science-1': 'Reading charts and graphs',
    'science-2': 'Forces, motion, and energy',
    'science-3': 'Cells and human body systems',
    'science-4': 'Weather, climate, earth systems',
    'science-5': 'Experimental design & variables',
    'science-6': 'Cause-and-effect in passages',
    'social-1': 'Government and civics concepts',
    'social-2': 'Interpreting maps and data',
    'social-3': 'Remembering historical events',
    'social-4': 'Colonial → Civil War sequence',
    'social-5': 'Basic economics and graphs',
    'social-6': 'Reading primary/secondary sources',
}

def print_tag_reference():
    """Print tag reference for easy lookup"""
    print("\n" + "="*60)
    print("CHALLENGE TAG REFERENCE")
    print("="*60)
    for tag_id, description in TAG_INFO.items():
        print(f"  {tag_id:12} : {description}")
    print("="*60 + "\n")

def extract_question_text(content, start_pos):
    """Extract question text for display"""
    # Find the question field
    question_match = re.search(r'question:\s*[\'"](.{0,200})', content[start_pos:start_pos+1000])
    if question_match:
        return question_match.group(1)[:150] + "..."
    return "Question text not found"

def find_untagged_questions(file_path):
    """Find all questions without challenge_tags"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all question objects
    pattern = r'\{\s*questionNumber:\s*\d+,'
    matches = list(re.finditer(pattern, content))
    
    untagged = []
    for match in matches:
        start = match.start()
        # Check if this question already has challenge_tags within next 500 chars
        snippet = content[start:start+500]
        if 'challenge_tags' not in snippet:
            question_text = extract_question_text(content, start)
            untagged.append({
                'position': start,
                'question_preview': question_text,
                'context': snippet[:300]
            })
    
    return untagged, content

def add_tags_to_question(content, position, tags):
    """Add challenge_tags array to a question"""
    # Find the question object start
    snippet_start = max(0, position - 50)
    snippet_end = min(len(content), position + 500)
    snippet = content[snippet_start:snippet_end]
    
    # Find where to insert challenge_tags (after questionNumber)
    match = re.search(r'(questionNumber:\s*\d+,)', snippet)
    if not match:
        return content
    
    insert_pos = snippet_start + match.end()
    tags_str = f"\n                challenge_tags: {json.dumps(tags)},"
    
    new_content = content[:insert_pos] + tags_str + content[insert_pos:]
    return new_content

def interactive_tagging(file_path):
    """Interactive CLI for tagging questions"""
    print_tag_reference()
    
    untagged, content = find_untagged_questions(file_path)
    
    print(f"\nFound {len(untagged)} untagged questions.\n")
    
    if not untagged:
        print("All questions are tagged!")
        return
    
    print("Instructions:")
    print("- Enter tag IDs separated by commas (e.g., math-1, math-6)")
    print("- Press 'r' to show tag reference")
    print("- Press 's' to skip")
    print("- Press 'q' to quit and save")
    print()
    
    modified_content = content
    changes_made = 0
    
    for i, q in enumerate(untagged, 1):
        print(f"\n{'='*60}")
        print(f"Question {i} of {len(untagged)}")
        print(f"{'='*60}")
        print(f"Preview: {q['question_preview']}")
        print(f"\nContext:\n{q['context'][:250]}...")
        print(f"\n{'-'*60}")
        
        while True:
            user_input = input("\nEnter tags (or r/s/q): ").strip().lower()
            
            if user_input == 'q':
                print(f"\nSaving {changes_made} changes...")
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                print("Done!")
                return
            elif user_input == 'r':
                print_tag_reference()
                continue
            elif user_input == 's':
                print("Skipped.")
                break
            elif user_input:
                # Parse tags
                tags = [t.strip() for t in user_input.split(',')]
                valid_tags = [t for t in tags if t in TAG_INFO]
                
                if not valid_tags:
                    print("No valid tags entered. Try again.")
                    continue
                
                print(f"Adding tags: {', '.join(valid_tags)}")
                modified_content = add_tags_to_question(modified_content, q['position'], valid_tags)
                changes_made += 1
                break
            else:
                print("Please enter tags, or r/s/q")
    
    # Save at the end
    if changes_made > 0:
        print(f"\nSaving {changes_made} changes...")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(modified_content)
        print("All changes saved!")
    else:
        print("\nNo changes made.")

if __name__ == '__main__':
    import sys
    
    file_path = r'c:\Users\Zacha\Ged-Website\frontend\app.jsx'
    
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    
    print(f"Tagging questions in: {file_path}\n")
    interactive_tagging(file_path)
