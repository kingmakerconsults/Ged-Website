import json
from pathlib import Path

def generate_math_report():
    """Generate comprehensive report on Math quiz quality"""
    
    public_dir = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes")
    
    stats = {
        'part1': {'categories': {}, 'total_questions': 0, 'fill_in_blank': 0},
        'part2': {'categories': {}, 'total_questions': 0, 'fill_in_blank': 0}
    }
    
    for part, file in [('part1', 'math.quizzes.part1.json'), ('part2', 'math.quizzes.part2.json')]:
        filepath = public_dir / file
        
        if not filepath.exists():
            print(f"Warning: {file} not found")
            continue
        
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        for cat_name, cat_data in data['categories'].items():
            cat_stats = {
                'topics': 0,
                'quizzes': 0,
                'questions': 0,
                'multiple_choice': 0,
                'fill_in_blank': 0,
                'with_katex': 0,
                'placeholders': 0
            }
            
            # Count topics
            for topic in cat_data.get('topics', []):
                cat_stats['topics'] += 1
                for quiz in topic.get('quizzes', []):
                    cat_stats['quizzes'] += 1
                    for q in quiz.get('questions', []):
                        cat_stats['questions'] += 1
                        
                        # Check if fill-in-the-blank or multiple choice
                        if 'correctAnswer' in q and not q.get('answerOptions'):
                            cat_stats['fill_in_blank'] += 1
                            stats[part]['fill_in_blank'] += 1
                        else:
                            cat_stats['multiple_choice'] += 1
                        
                        # Check for KaTeX usage
                        question_text = q.get('question', '')
                        if '$' in question_text and not all(
                            question_text[i+1].isdigit() 
                            for i, c in enumerate(question_text) 
                            if c == '$' and i+1 < len(question_text)
                        ):
                            cat_stats['with_katex'] += 1
                        
                        # Check for placeholders
                        for opt in q.get('answerOptions', []):
                            if isinstance(opt, dict) and 'placeholder' in opt.get('text', '').lower():
                                cat_stats['placeholders'] += 1
                                break
            
            stats[part]['categories'][cat_name] = cat_stats
            stats[part]['total_questions'] += cat_stats['questions']
    
    return stats

if __name__ == "__main__":
    print("=" * 80)
    print("MATH QUIZ COMPREHENSIVE REPORT")
    print("=" * 80)
    
    stats = generate_math_report()
    
    for part in ['part1', 'part2']:
        print(f"\n{part.upper()}:")
        print("-" * 80)
        for cat_name, cat_stats in stats[part]['categories'].items():
            print(f"\n  {cat_name}:")
            print(f"    Topics: {cat_stats['topics']}")
            print(f"    Quizzes: {cat_stats['quizzes']}")
            print(f"    Questions: {cat_stats['questions']}")
            if cat_stats['questions'] > 0:
                print(f"    Multiple choice: {cat_stats['multiple_choice']} ({cat_stats['multiple_choice']/cat_stats['questions']*100:.1f}%)")
                print(f"    Fill-in-the-blank: {cat_stats['fill_in_blank']} ({cat_stats['fill_in_blank']/cat_stats['questions']*100:.1f}%)")
                print(f"    With KaTeX: {cat_stats['with_katex']} ({cat_stats['with_katex']/cat_stats['questions']*100:.1f}%)")
                if cat_stats['placeholders'] > 0:
                    print(f"    ⚠️  Placeholders: {cat_stats['placeholders']}")
        
        print(f"\n  TOTAL QUESTIONS in {part}: {stats[part]['total_questions']}")
        print(f"  FILL-IN-THE-BLANK: {stats[part]['fill_in_blank']}")
    
    print("\n" + "=" * 80)
    print("SUMMARY:")
    total_all = stats['part1']['total_questions'] + stats['part2']['total_questions']
    total_fib = stats['part1']['fill_in_blank'] + stats['part2']['fill_in_blank']
    total_placeholders = sum(
        cat['placeholders'] 
        for part_stats in stats.values() 
        for cat in part_stats['categories'].values()
    )
    print(f"  Total Math questions: {total_all}")
    print(f"  Part 1: {stats['part1']['total_questions']}")
    print(f"  Part 2: {stats['part2']['total_questions']}")
    print(f"  Fill-in-the-blank questions: {total_fib} ({total_fib/total_all*100:.1f}%)")
    if total_placeholders > 0:
        print(f"  ⚠️  Placeholder questions to fix: {total_placeholders}")
    print("=" * 80)
