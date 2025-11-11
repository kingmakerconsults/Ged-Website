"""
Smart RLA Tagging Script

Tags RLA questions based on question text patterns and passage analysis.
"""

import re
import json

# RLA-specific patterns
RLA_PATTERNS = {
    'rla-1': [
        r'main idea',
        r'central idea',
        r'theme',
        r'best title',
        r'primarily about',
        r'main point',
        r'overall message',
        r'key idea',
        r'supporting detail',
        r'which detail',
        r'according to.*paragraph',
    ],
    'rla-2': [
        r'author.?s purpose',
        r'author.?s intent',
        r'why did.*write',
        r'tone',
        r'attitude',
        r'perspective',
        r'point of view',
        r'author believes',
        r'author suggests',
    ],
    'rla-3': [
        r'based on.*chart',
        r'according to.*graph',
        r'the table shows',
        r'the diagram',
        r'visual.*passage',
        r'both.*text and',
    ],
    'rla-4': [
        r'correct.*sentence',
        r'grammar',
        r'verb tense',
        r'subject.*verb',
        r'pronoun',
        r'modifier',
        r'parallel structure',
        r'which word',
        r'usage',
    ],
    'rla-5': [
        r'punctuation',
        r'comma',
        r'semicolon',
        r'apostrophe',
        r'quotation mark',
        r'sentence fragment',
        r'run-on',
        r'correctly punctuated',
    ],
    'rla-6': [
        r'organize',
        r'best order',
        r'thesis',
        r'introduction',
        r'conclusion',
        r'transition',
        r'paragraph',
        r'essay',
        r'argument',
    ],
    'rla-7': [
        r'according to',
        r'the passage states',
        r'evidence',
        r'support.*claim',
        r'which quote',
        r'cite',
        r'reference',
        r'text shows',
        r'passage suggests',
    ],
}

def score_rla_question(question_text, passage_text=""):
    """Score RLA question against all patterns"""
    combined = (question_text + " " + passage_text).lower()
    scores = {}
    
    for tag, patterns in RLA_PATTERNS.items():
        score = 0
        for pattern in patterns:
            if re.search(pattern, combined, re.IGNORECASE):
                score += 1
        if score > 0:
            scores[tag] = score
    
    return scores

def tag_rla_questions(file_path, dry_run=True):
    """Tag RLA questions intelligently"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all untagged questions
    pattern = r'\{\s*questionNumber:\s*\d+,'
    matches = list(re.finditer(pattern, content))
    
    modified_content = content
    offset = 0
    tagged_count = 0
    
    for match in matches:
        start = match.start() + offset
        snippet = modified_content[start:start+1500]
        
        # Skip if already tagged
        if 'challenge_tags' in snippet:
            continue
        
        # Extract question and passage
        question_match = re.search(r'question:\s*[\'"]([^\'"]{0,500})', snippet)
        passage_match = re.search(r'passage:\s*[\'"]([^\'"]{0,800})', snippet)
        
        if not question_match:
            continue
        
        question_text = question_match.group(1)
        passage_text = passage_match.group(1) if passage_match else ""
        
        # Score against RLA patterns
        scores = score_rla_question(question_text, passage_text)
        
        if not scores:
            continue
        
        # Get top 2 tags
        top_tags = sorted(scores.items(), key=lambda x: -x[1])[:2]
        tags = [tag for tag, score in top_tags if score >= 1]
        
        if not tags:
            continue
        
        # Insert tags
        insert_match = re.search(r'(questionNumber:\s*\d+,)', snippet)
        if insert_match:
            insert_pos = start + insert_match.end()
            tags_str = f"\n                challenge_tags: {json.dumps(tags)},"
            
            if not dry_run:
                modified_content = modified_content[:insert_pos] + tags_str + modified_content[insert_pos:]
                offset += len(tags_str)
            
            tagged_count += 1
            if tagged_count <= 20:  # Show first 20
                print(f"Tagged with {', '.join(tags)}")
                print(f"  Q: {question_text[:100]}...")
                print()
    
    print(f"\n{'='*70}")
    print(f"Summary: Tagged {tagged_count} RLA questions")
    print(f"{'='*70}\n")
    
    if not dry_run and tagged_count > 0:
        backup_path = file_path + '.backup3'
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
    
    print(f"Smart RLA Tagging Script")
    print(f"File: {file_path}")
    print(f"Mode: {'DRY RUN' if dry_run else 'APPLY CHANGES'}\n")
    print(f"{'='*70}\n")
    
    tag_rla_questions(file_path, dry_run=dry_run)
