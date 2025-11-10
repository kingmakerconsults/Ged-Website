import json
from pathlib import Path

f = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes\rla.quizzes.part2.json")
with open(f,'r',encoding='utf-8') as fh:
    data = json.load(fh)

# Find topics with 'sets'
for cat_name, cat_data in data['categories'].items():
    for i, topic in enumerate(cat_data.get('topics', [])):
        topic_id = topic.get('id', 'unknown')
        if 'sets' in topic:
            print(f"Category: {cat_name}")
            print(f"  Topic #{i}: {topic_id}")
            print(f"  Has sets: {list(topic['sets'].keys())}")
            # Check for placeholders in first set
            first_set_name = list(topic['sets'].keys())[0]
            first_set = topic['sets'][first_set_name]
            if first_set and 'questions' in first_set[0]:
                has_placeholder = False
                for q in first_set[0]['questions']:
                    if 'practice placeholder' in str(q).lower():
                        has_placeholder = True
                        break
                print(f"  Has placeholders in {first_set_name}: {has_placeholder}")
            print()
