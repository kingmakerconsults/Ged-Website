"""
Comprehensive Question Tagging - Tag ALL Remaining Questions

This script will tag all remaining questions based on challenge areas.
Uses multiple strategies to ensure complete coverage.
"""

import re
import json

# Complete challenge tag definitions
CHALLENGE_TAGS = {
    # MATH
    'math-1': {
        'keywords': ['fraction', 'decimal', 'percent', '%', 'ratio', 'proportion', 'converting', 'equivalent'],
        'topic_keywords': ['fractions', 'decimals', 'percent', 'whole numbers']
    },
    'math-2': {
        'keywords': ['solve for', 'equation', '1-step', 'one-step', 'isolate variable', 'x ='],
        'topic_keywords': ['equations', 'solving', 'algebra basics']
    },
    'math-3': {
        'keywords': ['2-step', 'two-step', 'inequality', 'distributive', 'combine like'],
        'topic_keywords': ['inequalities', 'multi-step', 'expressions']
    },
    'math-4': {
        'keywords': ['word problem', 'real-world', 'translate', 'situation', 'cost', 'total', 'how much', 'how many'],
        'topic_keywords': ['word problems', 'applications', 'scenarios']
    },
    'math-5': {
        'keywords': ['perimeter', 'area', 'volume', 'surface area', 'rectangle', 'circle', 'triangle', 'cube', 'cylinder', 'geometry', 'measurement', 'length', 'width', 'height'],
        'topic_keywords': ['geometry', 'measurement', 'shapes', 'spatial']
    },
    'math-6': {
        'keywords': ['table', 'chart', 'graph', 'bar graph', 'line graph', 'scatter', 'data', 'interpret', 'according to.*graph', 'based on.*chart', 'statistics', 'mean', 'median', 'mode'],
        'topic_keywords': ['data', 'graphs', 'charts', 'statistics']
    },
    'math-7': {
        'keywords': ['calculator', 'ti-30xs', 'scientific calculator', 'square root', 'exponent', 'power'],
        'topic_keywords': ['calculator']
    },
    'math-8': {
        'keywords': ['multi-step', 'combined', 'synthesis', 'complex problem'],
        'topic_keywords': []
    },
    
    # SCIENCE
    'science-1': {
        'keywords': ['chart', 'graph', 'table', 'diagram', 'according to.*chart', 'based on.*graph', 'data shows'],
        'topic_keywords': ['data', 'graphs', 'interpreting']
    },
    'science-2': {
        'keywords': ['force', 'motion', 'energy', 'velocity', 'acceleration', 'newton', 'kinetic', 'potential', 'friction', 'gravity', 'mass', 'speed', 'physics', 'momentum', 'chemistry', 'chemical', 'reaction', 'atom', 'molecule', 'compound'],
        'topic_keywords': ['physics', 'chemistry', 'motion', 'energy', 'matter']
    },
    'science-3': {
        'keywords': ['cell', 'organelle', 'nucleus', 'mitochondria', 'chloroplast', 'membrane', 'tissue', 'organ', 'system', 'body', 'organism', 'photosynthesis', 'respiration', 'dna', 'gene', 'biology', 'evolution', 'species', 'adaptation', 'ecosystem'],
        'topic_keywords': ['life science', 'biology', 'cells', 'body', 'organisms', 'ecology']
    },
    'science-4': {
        'keywords': ['earth', 'weather', 'climate', 'atmosphere', 'ocean', 'rock', 'mineral', 'soil', 'water cycle', 'plate', 'volcano', 'earthquake', 'erosion', 'weathering', 'fossil', 'geology', 'planet', 'solar system', 'star', 'moon', 'astronomy'],
        'topic_keywords': ['earth', 'space', 'geology', 'astronomy', 'weather', 'climate']
    },
    'science-5': {
        'keywords': ['experiment', 'hypothesis', 'variable', 'control', 'dependent', 'independent', 'scientific method', 'test', 'procedure', 'observation', 'conclusion'],
        'topic_keywords': ['experimental', 'scientific method', 'investigation']
    },
    'science-6': {
        'keywords': ['cause', 'effect', 'because', 'therefore', 'result', 'consequence', 'relationship', 'correlation', 'leads to', 'due to'],
        'topic_keywords': ['reasoning', 'analysis']
    },
    
    # RLA
    'rla-1': {
        'keywords': ['main idea', 'central idea', 'theme', 'primarily about', 'best title', 'overall message', 'key point', 'supporting detail', 'main point'],
        'topic_keywords': ['comprehension', 'main idea', 'reading']
    },
    'rla-2': {
        'keywords': ['author.*purpose', 'author.*intent', 'tone', 'attitude', 'perspective', 'point of view', 'author believes', 'why.*write'],
        'topic_keywords': ['analysis', 'interpretation']
    },
    'rla-3': {
        'keywords': ['chart.*passage', 'graph.*text', 'table.*article', 'diagram', 'visual', 'both.*text'],
        'topic_keywords': ['informational', 'mixed media']
    },
    'rla-4': {
        'keywords': ['grammar', 'verb tense', 'subject.*verb', 'pronoun', 'modifier', 'parallel', 'usage', 'correct.*sentence'],
        'topic_keywords': ['grammar', 'language', 'mechanics']
    },
    'rla-5': {
        'keywords': ['punctuation', 'comma', 'semicolon', 'apostrophe', 'quotation', 'fragment', 'run-on', 'sentence boundary'],
        'topic_keywords': ['punctuation', 'editing']
    },
    'rla-6': {
        'keywords': ['organize', 'order', 'structure', 'thesis', 'introduction', 'conclusion', 'transition', 'paragraph', 'essay'],
        'topic_keywords': ['writing', 'organization']
    },
    'rla-7': {
        'keywords': ['according to', 'passage states', 'evidence', 'support', 'cite', 'quote', 'reference', 'text shows', 'passage suggests'],
        'topic_keywords': ['evidence', 'citing']
    },
    
    # SOCIAL STUDIES
    'social-1': {
        'keywords': ['government', 'constitution', 'amendment', 'congress', 'president', 'supreme court', 'federal', 'rights', 'democracy', 'civics', 'legislative', 'executive', 'judicial', 'checks and balances', 'bill of rights'],
        'topic_keywords': ['government', 'civics', 'constitution', 'political']
    },
    'social-2': {
        'keywords': ['map', 'geography', 'location', 'region', 'latitude', 'longitude', 'spatial', 'interpret.*map'],
        'topic_keywords': ['geography', 'maps']
    },
    'social-3': {
        'keywords': ['historical', 'history', 'event', 'century', 'era', 'period', 'timeline', 'war', 'revolution', 'when did', 'in.*year'],
        'topic_keywords': ['history', 'events', 'timeline']
    },
    'social-4': {
        'keywords': ['colonial', 'revolution', 'independence', 'civil war', 'slavery', 'reconstruction', 'founding fathers', '1776', '1865', 'confederation'],
        'topic_keywords': ['colonial', 'revolution', 'civil war', 'founding']
    },
    'social-5': {
        'keywords': ['economics', 'economy', 'supply', 'demand', 'market', 'trade', 'price', 'gdp', 'inflation', 'unemployment', 'business', 'consumer'],
        'topic_keywords': ['economics', 'economy', 'business']
    },
    'social-6': {
        'keywords': ['primary source', 'secondary source', 'document', 'letter', 'speech', 'declaration', 'artifact', 'historical document'],
        'topic_keywords': ['documents', 'sources', 'literacy']
    },
}

def score_question(question_text, passage_text, topic_title):
    """Score a question against all challenge tags"""
    combined = (question_text + " " + passage_text + " " + topic_title).lower()
    scores = {}
    
    for tag_id, tag_info in CHALLENGE_TAGS.items():
        score = 0
        
        # Check keywords in question/passage
        for keyword in tag_info['keywords']:
            if re.search(keyword, combined, re.IGNORECASE):
                score += 2
        
        # Check topic keywords
        for topic_kw in tag_info['topic_keywords']:
            if topic_kw in combined:
                score += 3
        
        if score > 0:
            scores[tag_id] = score
    
    return scores

def find_topic_title(content, question_pos):
    """Find the topic title for a question"""
    search_start = max(0, question_pos - 3000)
    snippet = content[search_start:question_pos]
    
    title_match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", snippet)
    if title_match:
        return title_match.group(1)
    
    id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", snippet)
    if id_match:
        return id_match.group(1)
    
    return ""

def tag_all_questions(file_path, dry_run=True):
    """Tag ALL remaining questions"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    pattern = r'\{\s*questionNumber:\s*\d+,'
    matches = list(re.finditer(pattern, content))
    
    modified_content = content
    offset = 0
    tagged_count = 0
    skipped_count = 0
    failed_count = 0
    
    print(f"Found {len(matches)} total questions...\n")
    
    for i, match in enumerate(matches, 1):
        start = match.start() + offset
        snippet = modified_content[start:start+2000]
        
        # Skip if already tagged
        if 'challenge_tags' in snippet:
            skipped_count += 1
            continue
        
        # Extract info
        question_match = re.search(r'question:\s*[\'"]([^\'"]{0,500})', snippet)
        passage_match = re.search(r'passage:\s*[\'"]([^\'"]{0,800})', snippet)
        topic = find_topic_title(modified_content, start)
        
        if not question_match:
            failed_count += 1
            continue
        
        question_text = question_match.group(1)
        passage_text = passage_match.group(1) if passage_match else ""
        
        # Score
        scores = score_question(question_text, passage_text, topic)
        
        if not scores:
            failed_count += 1
            if not dry_run:
                print(f"⚠ Could not auto-tag question {i}: {question_text[:80]}...")
            continue
        
        # Get top tags (max 3, score >= 3)
        top_tags = sorted(scores.items(), key=lambda x: -x[1])[:3]
        tags = [tag for tag, score in top_tags if score >= 3]
        
        if not tags:
            failed_count += 1
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
            if tagged_count <= 30 or tagged_count % 50 == 0:
                print(f"[{i}/{len(matches)}] Tagged with {', '.join(tags)}")
    
    print(f"\n{'='*70}")
    print(f"SUMMARY:")
    print(f"  Total questions: {len(matches)}")
    print(f"  Already tagged: {skipped_count}")
    print(f"  Newly tagged: {tagged_count}")
    print(f"  Could not tag: {failed_count}")
    print(f"  Final coverage: {skipped_count + tagged_count}/{len(matches)} ({round((skipped_count + tagged_count)/len(matches)*100, 1)}%)")
    print(f"{'='*70}\n")
    
    if not dry_run and tagged_count > 0:
        backup_path = file_path + '.backup_full'
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Original backed up to: {backup_path}")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(modified_content)
        print(f"✓ Changes written to: {file_path}")
    elif dry_run:
        print("DRY RUN - Run with --apply to save changes.")

if __name__ == '__main__':
    import sys
    
    file_path = r'c:\Users\Zacha\Ged-Website\frontend\app.jsx'
    dry_run = '--apply' not in sys.argv
    
    print("="*70)
    print("COMPREHENSIVE QUESTION TAGGING")
    print("="*70)
    print(f"File: {file_path}")
    print(f"Mode: {'DRY RUN' if dry_run else 'APPLY CHANGES'}")
    print("="*70 + "\n")
    
    tag_all_questions(file_path, dry_run=dry_run)
