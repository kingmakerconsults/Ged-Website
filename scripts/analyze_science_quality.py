import json
from pathlib import Path

def analyze_science_quality():
    """Analyze science quiz files for any quality issues"""
    
    public_dir = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes")
    issues = {
        'incomplete': [],
        'generic': [],
        'duplicate': [],
        'short': []
    }
    
    for file in ["science.quizzes.part1.json", "science.quizzes.part2.json"]:
        filepath = public_dir / file
        
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'categories' not in data:
            continue
        
        def traverse(obj, cat_name, topic_id, quiz_id):
            if isinstance(obj, list):
                for item in obj:
                    traverse(item, cat_name, topic_id, quiz_id)
            elif isinstance(obj, dict):
                if 'questions' in obj and isinstance(obj['questions'], list):
                    qid = obj.get('quizId', obj.get('title', quiz_id))
                    for q in obj['questions']:
                        # Get question text from either schema
                        question_text = q.get('question') or q.get('content', {}).get('questionText', '')
                        
                        # Check for incomplete questions
                        missing_parts = []
                        if not question_text or len(question_text) < 10:
                            missing_parts.append('question')
                        
                        # Check answer options
                        if len(q.get('answerOptions', [])) < 4:
                            missing_parts.append(f'only_{len(q.get("answerOptions", []))}_options')
                        
                        if missing_parts:
                            issues['incomplete'].append(f"{file} | {cat_name} | {topic_id} | {qid} | Q{q.get('questionNumber')} [{', '.join(missing_parts)}]")
                        
                        # Check for generic questions
                        if question_text:
                            qtext_lower = question_text.lower()
                            if 'which option' in qtext_lower or 'best reflects' in qtext_lower or 'science practice' in qtext_lower:
                                issues['generic'].append(f"{file} | {cat_name} | {topic_id} | {qid} | Q{q.get('questionNumber')}: {question_text[:60]}")
                        
                        # Check for very short passages (likely incomplete)
                        # Get passage from either schema
                        passage = q.get('passage') or q.get('content', {}).get('passage', '')
                        if passage and len(passage) < 50:
                            issues['short'].append(f"{file} | {cat_name} | {topic_id} | {qid} | Q{q.get('questionNumber')}: passage={len(passage)} chars")
                        
                        # Check answer options
                        # (removed - now handled above)
                        
                        for opt in q.get('answerOptions', []):
                            if 'placeholder' in opt.get('text', '').lower():
                                issues['generic'].append(f"{file} | {cat_name} | {topic_id} | {qid} | Q{q.get('questionNumber')}: placeholder in option")
                
                for k, v in obj.items():
                    if k != 'questions':
                        traverse(v, cat_name, topic_id, quiz_id)
        
        for cat_name, cat_data in data['categories'].items():
            # Check topics
            for topic in cat_data.get('topics', []):
                topic_id = topic.get('id', 'unknown')
                traverse(topic, cat_name, topic_id, 'unknown')
            
            # Check sets
            if 'sets' in cat_data:
                for set_name, set_quizzes in cat_data['sets'].items():
                    traverse(set_quizzes, cat_name, set_name, 'unknown')
    
    return issues

if __name__ == "__main__":
    print("Analyzing Science Quiz Quality...")
    print("=" * 80)
    
    issues = analyze_science_quality()
    
    total_issues = sum(len(v) for v in issues.values())
    
    if total_issues == 0:
        print("\n✅ No quality issues found in science quizzes!")
        print("All questions appear to be complete and properly formatted.")
    else:
        print(f"\n⚠️  Found {total_issues} potential issues:\n")
        
        for issue_type, items in issues.items():
            if items:
                print(f"\n{issue_type.upper()} ({len(items)} issues):")
                for item in items[:10]:  # Show first 10
                    print(f"  - {item}")
                if len(items) > 10:
                    print(f"  ... and {len(items) - 10} more")
    
    print("\n" + "=" * 80)
