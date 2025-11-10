import json
from pathlib import Path
from fix_rla_placeholders import is_placeholder_question

f = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes\rla.quizzes.part2.json")
with open(f,'r',encoding='utf-8') as fh:
    data = json.load(fh)

# Navigate to Main Idea -> first topic -> 'Set 1' first quiz -> last question
cat = data['categories']['Main Idea']
first_topic = cat['topics'][0]
set1 = first_topic.get('Set 1') or first_topic.get('Set1') or first_topic.get('quizzes')
quiz = set1[0]
q12 = quiz['questions'][-1]
print('Question text:', q12.get('question'))
print('Has options placeholder?', any('practice placeholder' in (o.get('text','').lower()) for o in q12.get('answerOptions',[])))
print('is_placeholder_question=', is_placeholder_question(q12))
