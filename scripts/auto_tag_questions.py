"""
Automated Question Tagging Script

This script automatically tags questions based on topic titles and keywords.
Review the output and adjust as needed.
"""

import re
import json

# Mapping of keywords/patterns to challenge tags
AUTO_TAG_RULES = {
    # MATH
    'math-1': [
        'fraction', 'decimal', 'percent', '%', 'ratio', 'proportion',
        'converting', 'equivalence'
    ],
    'math-2': [
        'solve for x', '1-step', 'one-step', 'single-step', 'isolate',
        'basic equation'
    ],
    'math-3': [
        '2-step', 'two-step', 'multi-step equation', 'inequality',
        'compound', 'distributive'
    ],
    'math-4': [
        'word problem', 'translate', 'real-world', 'application',
        'expression from', 'situation', 'cost'
    ],
    'math-5': [
        'perimeter', 'area', 'volume', 'surface area', 'geometry',
        'rectangle', 'circle', 'triangle', 'measurement'
    ],
    'math-6': [
        'table', 'chart', 'graph', 'bar graph', 'line graph', 'scatter',
        'data', 'interpret', 'histogram'
    ],
    'math-7': [
        'calculator', 'ti-30xs', 'exponent', 'square root', 'scientific'
    ],
    'math-8': [
        'multi-step', 'complex', 'ged-style', 'combined', 'synthesis'
    ],
    
    # RLA
    'rla-1': [
        'main idea', 'central idea', 'theme', 'supporting detail',
        'summary', 'key point'
    ],
    'rla-2': [
        'author purpose', 'tone', 'mood', 'attitude', 'perspective',
        'point of view', 'intent'
    ],
    'rla-3': [
        'chart', 'graph', 'table', 'diagram', 'visual', 'infographic',
        'data with text'
    ],
    'rla-4': [
        'grammar', 'usage', 'syntax', 'verb tense', 'subject-verb',
        'pronoun', 'modifier', 'parallel'
    ],
    'rla-5': [
        'punctuation', 'comma', 'semicolon', 'apostrophe', 'quotation',
        'sentence boundary', 'fragment', 'run-on'
    ],
    'rla-6': [
        'organize', 'structure', 'outline', 'thesis', 'introduction',
        'conclusion', 'paragraph', 'transition'
    ],
    'rla-7': [
        'cite', 'evidence', 'support', 'reference', 'quote', 'passage',
        'text-based', 'according to'
    ],
    
    # SCIENCE
    'science-1': [
        'chart', 'graph', 'table', 'data', 'interpret', 'bar graph',
        'line graph', 'scatter plot', 'diagram'
    ],
    'science-2': [
        'force', 'motion', 'energy', 'velocity', 'acceleration',
        'newton', 'kinetic', 'potential', 'friction', 'gravity'
    ],
    'science-3': [
        'cell', 'organelle', 'nucleus', 'mitochondria', 'body system',
        'organ', 'tissue', 'human body', 'biology', 'anatomy'
    ],
    'science-4': [
        'weather', 'climate', 'earth', 'atmosphere', 'ocean',
        'rock', 'soil', 'water cycle', 'plate', 'geology'
    ],
    'science-5': [
        'experiment', 'hypothesis', 'variable', 'control', 'dependent',
        'independent', 'scientific method', 'test', 'procedure'
    ],
    'science-6': [
        'cause', 'effect', 'relationship', 'correlation', 'because',
        'reason', 'result', 'consequence'
    ],
    
    # SOCIAL STUDIES
    'social-1': [
        'government', 'civics', 'democracy', 'constitution', 'law',
        'rights', 'amendment', 'executive', 'legislative', 'judicial'
    ],
    'social-2': [
        'map', 'geography', 'location', 'region', 'latitude', 'longitude',
        'interpret data', 'spatial'
    ],
    'social-3': [
        'historical', 'event', 'date', 'timeline', 'century', 'era',
        'remember', 'recall', 'war', 'revolution'
    ],
    'social-4': [
        'colonial', 'revolution', 'independence', 'civil war', 'slavery',
        'reconstruction', '1776', '1865', 'founding'
    ],
    'social-5': [
        'economics', 'economy', 'supply', 'demand', 'market', 'trade',
        'gdp', 'inflation', 'unemployment'
    ],
    'social-6': [
        'primary source', 'secondary source', 'document', 'letter',
        'speech', 'declaration', 'artifact', 'historical document'
    ],
}

def score_question_for_tag(question_data, tag_id):
    """Score how well a question matches a tag based on keywords"""
    keywords = AUTO_TAG_RULES.get(tag_id, [])
    if not keywords:
        return 0
    
    text = (
        str(question_data.get('question', '')) + ' ' +
        str(question_data.get('passage', '')) + ' ' +
        str(question_data.get('title', ''))
    ).lower()
    
    score = 0
    for keyword in keywords:
        if keyword.lower() in text:
            score += 1
    
    return score

def auto_tag_questions(file_path, dry_run=True):
    """Automatically tag questions based on content analysis"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find questions without challenge_tags
    pattern = r'\{\s*questionNumber:\s*\d+,'
    matches = list(re.finditer(pattern, content))
    
    tagged_count = 0
    skipped_count = 0
    
    modified_content = content
    offset = 0  # Track position changes due to insertions
    
    for match in matches:
        start = match.start() + offset
        snippet = modified_content[start:start+1000]
        
        # Skip if already tagged
        if 'challenge_tags' in snippet:
            skipped_count += 1
            continue
        
        # Extract question info
        question_match = re.search(r'question:\s*[\'"]([^\'"]{0,300})', snippet)
        passage_match = re.search(r'passage:\s*[\'"]([^\'"]{0,300})', snippet)
        
        question_text = question_match.group(1) if question_match else ""
        passage_text = passage_match.group(1) if passage_match else ""
        
        # Score against all tags
        scores = {}
        for tag_id in AUTO_TAG_RULES.keys():
            score = score_question_for_tag({
                'question': question_text,
                'passage': passage_text
            }, tag_id)
            if score > 0:
                scores[tag_id] = score
        
        # Get top tags (score >= 2)
        top_tags = [tag for tag, score in sorted(scores.items(), key=lambda x: -x[1]) if score >= 2]
        
        if top_tags:
            # Insert tags
            insert_match = re.search(r'(questionNumber:\s*\d+,)', snippet)
            if insert_match:
                insert_pos = start + insert_match.end()
                tags_str = f"\n                challenge_tags: {json.dumps(top_tags[:3])},"  # Max 3 tags
                
                if not dry_run:
                    modified_content = modified_content[:insert_pos] + tags_str + modified_content[insert_pos:]
                    offset += len(tags_str)
                
                tagged_count += 1
                print(f"Tagged question with: {', '.join(top_tags[:3])}")
                print(f"  Q: {question_text[:80]}...")
                print()
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Questions tagged: {tagged_count}")
    print(f"  Already tagged: {skipped_count}")
    print(f"{'='*60}\n")
    
    if not dry_run and tagged_count > 0:
        backup_path = file_path + '.backup'
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
    
    print("Automated Question Tagging")
    print("="*60)
    print(f"File: {file_path}")
    print(f"Mode: {'DRY RUN' if dry_run else 'APPLY CHANGES'}")
    print("="*60 + "\n")
    
    auto_tag_questions(file_path, dry_run=dry_run)
