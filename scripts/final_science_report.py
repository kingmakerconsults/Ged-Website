import json
from pathlib import Path

def generate_science_report():
    """Generate comprehensive report on Science quiz quality"""
    
    public_dir = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes")
    
    stats = {
        'part1': {'categories': {}, 'total_questions': 0},
        'part2': {'categories': {}, 'total_questions': 0}
    }
    
    for part, file in [('part1', 'science.quizzes.part1.json'), ('part2', 'science.quizzes.part2.json')]:
        filepath = public_dir / file
        
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        for cat_name, cat_data in data['categories'].items():
            cat_stats = {
                'topics': 0,
                'quizzes': 0,
                'questions': 0,
                'with_passage': 0,
                'with_content_structure': 0
            }
            
            # Count topics
            for topic in cat_data.get('topics', []):
                cat_stats['topics'] += 1
                for quiz in topic.get('quizzes', []):
                    cat_stats['quizzes'] += 1
                    for q in quiz.get('questions', []):
                        cat_stats['questions'] += 1
                        if q.get('passage') or q.get('content', {}).get('passage'):
                            cat_stats['with_passage'] += 1
                        if 'content' in q:
                            cat_stats['with_content_structure'] += 1
            
            # Count sets
            for set_name, set_quizzes in cat_data.get('sets', {}).items():
                for quiz in set_quizzes:
                    # Don't double count quizzes in topics
                    for q in quiz.get('questions', []):
                        if q.get('passage') or q.get('content', {}).get('passage'):
                            pass  # Already counted in topics
                        if 'content' in q:
                            pass  # Already counted in topics
            
            stats[part]['categories'][cat_name] = cat_stats
            stats[part]['total_questions'] += cat_stats['questions']
    
    return stats

if __name__ == "__main__":
    print("=" * 80)
    print("SCIENCE QUIZ COMPREHENSIVE REPORT")
    print("=" * 80)
    
    stats = generate_science_report()
    
    for part in ['part1', 'part2']:
        print(f"\n{part.upper()}:")
        print("-" * 80)
        for cat_name, cat_stats in stats[part]['categories'].items():
            print(f"\n  {cat_name}:")
            print(f"    Topics: {cat_stats['topics']}")
            print(f"    Quizzes: {cat_stats['quizzes']}")
            print(f"    Questions: {cat_stats['questions']}")
            print(f"    With passage: {cat_stats['with_passage']} ({cat_stats['with_passage']/cat_stats['questions']*100:.1f}%)")
            print(f"    Using content structure: {cat_stats['with_content_structure']} ({cat_stats['with_content_structure']/cat_stats['questions']*100:.1f}%)")
        
        print(f"\n  TOTAL QUESTIONS in {part}: {stats[part]['total_questions']}")
    
    print("\n" + "=" * 80)
    print("SUMMARY:")
    total_all = stats['part1']['total_questions'] + stats['part2']['total_questions']
    print(f"  Total Science questions: {total_all}")
    print(f"  Part 1: {stats['part1']['total_questions']}")
    print(f"  Part 2: {stats['part2']['total_questions']}")
    print("=" * 80)
