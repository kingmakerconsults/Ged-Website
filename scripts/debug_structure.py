import json
from pathlib import Path

f = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes\rla.quizzes.part2.json")
with open(f,'r',encoding='utf-8') as fh:
    data = json.load(fh)

# Navigate to the first topic
main_idea_category = data['categories']['Main Idea']
topics = main_idea_category['topics']
first_topic = topics[0]

print("First topic ID:", first_topic.get('id'))
print("First topic keys:", list(first_topic.keys()))
print()

if 'sets' in first_topic:
    print("Found 'sets' key!")
    sets = first_topic['sets']
    print("Sets keys:", list(sets.keys()))
    set1 = sets['Set 1']
    print(f"Set 1 has {len(set1)} items")
    first_quiz = set1[0]
    print(f"First quiz has {len(first_quiz['questions'])} questions")
    q12 = first_quiz['questions'][11]  # Question 12
    print(f"\nQuestion 12:")
    print(f"  Text: {q12['question'][:60]}...")
    print(f"  First option: {q12['answerOptions'][0]['text'][:60]}...")
    print(f"  Has __autogen: {q12.get('__autogen')}")
