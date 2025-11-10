import json
from pathlib import Path

def generate_social_studies_report():
    """Generate comprehensive report on Social Studies quiz quality"""
    
    public_dir = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes")
    
    stats = {
        'main': {'categories': {}, 'total_questions': 0},
        'extras': {'categories': {}, 'total_questions': 0}
    }
    
    for part, file in [('main', 'social-studies.quizzes.json'), ('extras', 'social-studies.extras.json')]:
        filepath = public_dir / file
        
        if not filepath.exists():
            print(f"Warning: {file} not found")
            continue
        
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        # Handle different file structures
        if isinstance(data, list):
            # Extras format - flat list of quizzes
            temp_categories = {}
            for quiz in data:
                topic = quiz.get('topic', 'Other')
                if topic not in temp_categories:
                    temp_categories[topic] = {'topics': [], 'quizzes': []}
                temp_categories[topic]['quizzes'].append(quiz)
            
            for cat_name, cat_content in temp_categories.items():
                cat_stats = {
                    'topics': 0,
                    'quizzes': len(cat_content['quizzes']),
                    'questions': 0,
                    'with_passage': 0,
                    'with_content_structure': 0,
                    'passage_as_question': 0
                }
                
                for quiz in cat_content['quizzes']:
                    for q in quiz.get('questions', []):
                        cat_stats['questions'] += 1
                        
                        has_passage = q.get('passage') or q.get('content', {}).get('passage')
                        has_question = q.get('question') or q.get('content', {}).get('questionText')
                        
                        if has_passage and not has_question:
                            cat_stats['passage_as_question'] += 1
                        elif has_passage:
                            cat_stats['with_passage'] += 1
                        
                        if 'content' in q:
                            cat_stats['with_content_structure'] += 1
                
                stats[part]['categories'][cat_name] = cat_stats
                stats[part]['total_questions'] += cat_stats['questions']
        
        else:
            # Main format - nested categories structure
            for cat_name, cat_data in data['categories'].items():
                cat_stats = {
                    'topics': 0,
                    'quizzes': 0,
                    'questions': 0,
                    'with_passage': 0,
                    'with_content_structure': 0,
                    'passage_as_question': 0
                }
                
                # Count topics
                for topic in cat_data.get('topics', []):
                    cat_stats['topics'] += 1
                    for quiz in topic.get('quizzes', []):
                        cat_stats['quizzes'] += 1
                        for q in quiz.get('questions', []):
                            cat_stats['questions'] += 1
                            
                            # Check if passage field is being used
                            has_passage = q.get('passage') or q.get('content', {}).get('passage')
                            has_question = q.get('question') or q.get('content', {}).get('questionText')
                            
                            if has_passage and not has_question:
                                # Passage field contains the question text
                                cat_stats['passage_as_question'] += 1
                            elif has_passage:
                                # Passage is actual passage content
                                cat_stats['with_passage'] += 1
                            
                            if 'content' in q:
                                cat_stats['with_content_structure'] += 1
                
                # Count sets (avoid double counting)
                for set_name, set_quizzes in cat_data.get('sets', {}).items():
                    for quiz in set_quizzes:
                        # These are duplicates from topics, skip counting
                        pass
                
                stats[part]['categories'][cat_name] = cat_stats
                stats[part]['total_questions'] += cat_stats['questions']
    
    return stats

if __name__ == "__main__":
    print("=" * 80)
    print("SOCIAL STUDIES QUIZ COMPREHENSIVE REPORT")
    print("=" * 80)
    
    stats = generate_social_studies_report()
    
    for part in ['main', 'extras']:
        if stats[part]['total_questions'] > 0:
            print(f"\n{part.upper()}:")
            print("-" * 80)
            for cat_name, cat_stats in stats[part]['categories'].items():
                print(f"\n  {cat_name}:")
                print(f"    Topics: {cat_stats['topics']}")
                print(f"    Quizzes: {cat_stats['quizzes']}")
                print(f"    Questions: {cat_stats['questions']}")
                if cat_stats['questions'] > 0:
                    print(f"    With passage: {cat_stats['with_passage']} ({cat_stats['with_passage']/cat_stats['questions']*100:.1f}%)")
                    print(f"    Passage as question: {cat_stats['passage_as_question']} ({cat_stats['passage_as_question']/cat_stats['questions']*100:.1f}%)")
                    print(f"    Using content structure: {cat_stats['with_content_structure']} ({cat_stats['with_content_structure']/cat_stats['questions']*100:.1f}%)")
            
            print(f"\n  TOTAL QUESTIONS in {part}: {stats[part]['total_questions']}")
    
    print("\n" + "=" * 80)
    print("SUMMARY:")
    total_all = stats['main']['total_questions'] + stats['extras']['total_questions']
    print(f"  Total Social Studies questions: {total_all}")
    print(f"  Main quizzes: {stats['main']['total_questions']}")
    print(f"  Extra quizzes: {stats['extras']['total_questions']}")
    print("=" * 80)
