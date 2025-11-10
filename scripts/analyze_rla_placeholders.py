import json
import re
from pathlib import Path
from collections import defaultdict

def analyze_placeholders():
    """Analyze all placeholder questions in RLA quiz files"""
    
    public_dir = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes")
    results = defaultdict(lambda: {"count": 0, "quizzes": []})
    
    for file in ["rla.quizzes.part1.json", "rla.quizzes.part2.json"]:
        filepath = public_dir / file
        
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'categories' not in data:
            continue
            
        for category_name, category_data in data['categories'].items():
            if 'topics' not in category_data:
                continue
                
            for topic in category_data['topics']:
                topic_id = topic.get('id', 'unknown')
                topic_title = topic.get('title', 'unknown')
                
                if 'quizzes' not in topic:
                    continue
                    
                for quiz in topic['quizzes']:
                    quiz_id = quiz.get('quizId', 'unknown')
                    
                    if 'questions' not in quiz:
                        continue
                    
                    placeholder_count = 0
                    for question in quiz['questions']:
                        # Check if this is a placeholder question
                        is_placeholder = False
                        
                        # Check question text
                        if 'practice placeholder' in question.get('question', '').lower():
                            is_placeholder = True
                        
                        # Check answer options
                        for option in question.get('answerOptions', []):
                            if 'practice placeholder' in option.get('text', '').lower():
                                is_placeholder = True
                                break
                        
                        # Check explanation
                        if 'practice placeholder' in question.get('explanation', '').lower():
                            is_placeholder = True
                        
                        if is_placeholder:
                            placeholder_count += 1
                            
                    if placeholder_count > 0:
                        results[topic_id]["count"] += placeholder_count
                        results[topic_id]["quizzes"].append({
                            "file": file,
                            "category": category_name,
                            "topic_title": topic_title,
                            "quiz_id": quiz_id,
                            "placeholder_questions": placeholder_count,
                            "total_questions": len(quiz['questions'])
                        })
    
    return results

if __name__ == "__main__":
    print("Analyzing RLA placeholder questions...\n")
    print("=" * 80)
    
    results = analyze_placeholders()
    
    total_placeholders = 0
    for topic_id, info in sorted(results.items()):
        print(f"\nTopic ID: {topic_id}")
        print(f"Total placeholder questions: {info['count']}")
        total_placeholders += info['count']
        
        for quiz_info in info['quizzes']:
            print(f"  - {quiz_info['file']} | {quiz_info['category']} | {quiz_info['topic_title']}")
            print(f"    Quiz: {quiz_info['quiz_id']}")
            print(f"    Placeholders: {quiz_info['placeholder_questions']}/{quiz_info['total_questions']}")
    
    print("\n" + "=" * 80)
    print(f"\nTOTAL PLACEHOLDER QUESTIONS ACROSS ALL RLA QUIZZES: {total_placeholders}")
    print(f"NUMBER OF TOPICS WITH PLACEHOLDERS: {len(results)}")
