import json
from pathlib import Path
import re

def analyze_math_quality():
    """Analyze math quiz files for any quality issues, including KaTeX validation"""
    
    public_dir = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes")
    issues = {
        'incomplete': [],
        'generic': [],
        'duplicate': [],
        'short': [],
        'katex_issues': []
    }
    
    # Common KaTeX syntax patterns to validate
    katex_patterns = {
        'unmatched_delimiters': r'(?<!\\)\$(?![^\$]*\$)',  # Single $ without matching pair
        'empty_katex': r'\$\s*\$',  # Empty KaTeX blocks
        'unclosed_frac': r'\\frac\{[^}]*(?!\})',  # Unclosed fractions
        'unclosed_sqrt': r'\\sqrt\{[^}]*(?!\})',  # Unclosed square roots
    }
    
    for file in ["math.quizzes.part1.json", "math.quizzes.part2.json"]:
        filepath = public_dir / file
        
        if not filepath.exists():
            print(f"Warning: {file} not found")
            continue
        
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        if 'categories' not in data:
            continue
        
        def check_katex_in_text(text, file, cat_name, topic_id, qid, q_num, field_name):
            """Check for potential KaTeX issues in text"""
            if not text:
                return
            
            # Skip currency $ signs AND inline math $ signs
            # Currency: $123 or $1.23
            # Inline math KaTeX: $x + 5$ or $5x - 3$
            # We want to check if $ delimiters are balanced for KaTeX
            
            # First, check if there are any $ signs at all
            if '$' not in text:
                return
            
            # Count $ signs - they should be paired (even number)
            dollar_count = text.count('$')
            
            # If odd number, check if they're all currency (followed by digits)
            if dollar_count % 2 != 0:
                # Extract all $ occurrences with context
                # Find $ that are NOT part of currency (not followed by digit)
                # and NOT part of balanced KaTeX pairs
                non_currency_dollars = []
                for match in re.finditer(r'\$', text):
                    pos = match.start()
                    # Check if it's currency: $ followed by digit
                    if pos + 1 < len(text) and text[pos + 1].isdigit():
                        continue  # This is currency
                    non_currency_dollars.append(pos)
                
                # Only report if we have odd non-currency dollars (unbalanced KaTeX)
                if len(non_currency_dollars) % 2 != 0:
                    issues['katex_issues'].append(
                        f"{file} | {cat_name} | {topic_id} | {qid} | Q{q_num} | {field_name}: "
                        f"Unbalanced KaTeX $ delimiters (found {len(non_currency_dollars)} non-currency $)"
                    )
            
            # Check for empty KaTeX blocks like $ $
            if re.search(r'\$\s*\$', text):
                issues['katex_issues'].append(
                    f"{file} | {cat_name} | {topic_id} | {qid} | Q{q_num} | {field_name}: "
                    f"Empty KaTeX block found"
                )
            
            # Check for common LaTeX commands that might be unclosed
            frac_open = text.count(r'\frac{')
            if frac_open > 0:
                frac_text = text[text.find(r'\frac'):]
                if frac_text.count('{') > frac_text.count('}'):
                    issues['katex_issues'].append(
                        f"{file} | {cat_name} | {topic_id} | {qid} | Q{q_num} | {field_name}: "
                        f"Possible unclosed \\frac command"
                    )
        
        def traverse(obj, cat_name, topic_id, quiz_id):
            if isinstance(obj, list):
                for item in obj:
                    traverse(item, cat_name, topic_id, quiz_id)
            elif isinstance(obj, dict):
                if 'questions' in obj and isinstance(obj['questions'], list):
                    qid = obj.get('quizId', obj.get('title', quiz_id))
                    for idx, q in enumerate(obj['questions'], 1):
                        q_num = q.get('questionNumber', idx)  # Use index if questionNumber is missing
                        
                        # Get question text from either schema
                        question_text = q.get('question') or q.get('content', {}).get('questionText', '') or q.get('passage', '')
                        
                        # Check for incomplete questions
                        missing_parts = []
                        if not question_text or len(question_text) < 10:
                            missing_parts.append('question')
                        
                        # Check answer options (skip for fill-in-the-blank questions)
                        answer_options = q.get('answerOptions', [])
                        has_correct_answer = 'correctAnswer' in q
                        
                        # If it has correctAnswer but no answerOptions, it's fill-in-the-blank (valid)
                        if not has_correct_answer and len(answer_options) < 4:
                            missing_parts.append(f'only_{len(answer_options)}_options')
                        
                        if missing_parts:
                            issues['incomplete'].append(
                                f"{file} | {cat_name} | {topic_id} | {qid} | Q{q_num} [{', '.join(missing_parts)}]"
                            )
                        
                        # Check for generic questions - but allow math-specific phrasing
                        if question_text:
                            qtext_lower = question_text.lower()
                            if ('which option' in qtext_lower and 'best reflects' in qtext_lower) or 'practice placeholder' in qtext_lower:
                                issues['generic'].append(
                                    f"{file} | {cat_name} | {topic_id} | {qid} | Q{q_num}: {question_text[:60]}"
                                )
                        
                        # Check for very short passages (likely incomplete)
                        passage = q.get('passage') or q.get('content', {}).get('passage', '')
                        if passage and len(passage) < 50 and not question_text:
                            issues['short'].append(
                                f"{file} | {cat_name} | {topic_id} | {qid} | Q{q_num}: passage={len(passage)} chars"
                            )
                        
                        # KaTeX validation in question text
                        if question_text:
                            check_katex_in_text(question_text, file, cat_name, topic_id, qid, q_num, "question")
                        
                        # KaTeX validation in passage
                        if passage:
                            check_katex_in_text(passage, file, cat_name, topic_id, qid, q_num, "passage")
                        
                        # Check answer options for placeholders and KaTeX issues
                        for idx, opt in enumerate(q.get('answerOptions', []), 1):
                            if isinstance(opt, dict):
                                opt_text = opt.get('text', '')
                                if 'placeholder' in opt_text.lower():
                                    issues['generic'].append(
                                        f"{file} | {cat_name} | {topic_id} | {qid} | Q{q_num}: placeholder in option {idx}"
                                    )
                                # Check KaTeX in option text
                                if opt_text:
                                    check_katex_in_text(opt_text, file, cat_name, topic_id, qid, q_num, f"option_{idx}")
                                
                                # Check KaTeX in rationale
                                rationale = opt.get('rationale', '')
                                if rationale:
                                    check_katex_in_text(rationale, file, cat_name, topic_id, qid, q_num, f"rationale_{idx}")
                            elif isinstance(opt, str) and 'placeholder' in opt.lower():
                                issues['generic'].append(
                                    f"{file} | {cat_name} | {topic_id} | {qid} | Q{q_num}: placeholder in option {idx}"
                                )
                
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
    print("Analyzing Math Quiz Quality (including KaTeX validation)...")
    print("=" * 80)
    
    issues = analyze_math_quality()
    
    total_issues = sum(len(v) for v in issues.values())
    
    if total_issues == 0:
        print("\n✅ No quality issues found in math quizzes!")
        print("All questions appear to be complete, properly formatted, and KaTeX is valid.")
    else:
        print(f"\n⚠️  Found {total_issues} potential issues:\n")
        
        for issue_type, items in issues.items():
            if items:
                print(f"\n{issue_type.upper().replace('_', ' ')} ({len(items)} issues):")
                for item in items[:15]:  # Show first 15
                    print(f"  - {item}")
                if len(items) > 15:
                    print(f"  ... and {len(items) - 15} more")
    
    print("\n" + "=" * 80)
