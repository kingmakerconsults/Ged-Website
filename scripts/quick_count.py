import json
from pathlib import Path

# Simplified placeholder detection
def is_placeholder(q):
    qtext = q.get('question', '').lower()
    if 'practice placeholder' in qtext:
        return True
    if 'which option best reflects standard reading comprehension' in qtext:
        return True
    for opt in q.get('answerOptions', []):
        if 'practice placeholder' in opt.get('text', '').lower():
            return True
    if 'practice placeholder' in q.get('explanation', '').lower():
        return True
    if q.get('__autogen'):
        return True
    return False

f = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes\rla.quizzes.part2.json")
with open(f,'r',encoding='utf-8') as fh:
    data = json.load(fh)

count = 0
for cat_name, cat_data in data['categories'].items():
    for topic in cat_data.get('topics', []):
        topic_id = topic.get('id', 'unknown')
        # Check if topic has 'Set 1', 'Set 2', etc.
        for key, val in topic.items():
            if isinstance(val, list):
                for item in val:
                    if isinstance(item, dict) and 'questions' in item:
                        for q in item['questions']:
                            if is_placeholder(q):
                                count += 1
                                if count <= 3:  # Print first few
                                    print(f"Found placeholder in {cat_name} / {topic_id} / {key}")
                                    print(f"  Question: {q.get('question', '')[:80]}")

print(f"\nTotal placeholders found: {count}")
