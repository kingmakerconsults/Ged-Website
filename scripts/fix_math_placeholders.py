import json
import random
from pathlib import Path

# Math question bank for Number Sense & Operations
MATH_QUESTIONS = [
    {
        "type": "multiple-choice-text",
        "difficulty": "medium",
        "passage": "A grocery store is running a promotion. If you buy 3 cans of soup at $2.50 each, you get a 15% discount on the total.",
        "questionText": "What is the final cost after the discount?",
        "options": [
            {"text": "$6.38", "isCorrect": True, "rationale": "Correct. 3 × $2.50 = $7.50, then $7.50 × 0.85 = $6.375, rounded to $6.38."},
            {"text": "$7.50", "isCorrect": False, "rationale": "This is the cost before the discount is applied."},
            {"text": "$1.13", "isCorrect": False, "rationale": "This is the discount amount, not the final cost."},
            {"text": "$5.63", "isCorrect": False, "rationale": "This subtracts 15% from each can separately instead of the total."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "easy",
        "passage": "Maria needs to convert 3/4 to a decimal to enter it into a calculator.",
        "questionText": "What is 3/4 expressed as a decimal?",
        "options": [
            {"text": "0.75", "isCorrect": True, "rationale": "Correct. Dividing 3 by 4 gives 0.75."},
            {"text": "0.34", "isCorrect": False, "rationale": "This incorrectly places the digits side by side."},
            {"text": "1.33", "isCorrect": False, "rationale": "This is 4/3, the reciprocal."},
            {"text": "0.43", "isCorrect": False, "rationale": "This reverses the division."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "medium",
        "passage": "A recipe calls for 2 1/3 cups of flour, but Jason only has a 1/4 cup measuring cup.",
        "questionText": "How many 1/4 cup measurements does Jason need?",
        "options": [
            {"text": "9", "isCorrect": False, "rationale": "This divides 2 1/3 by 1/3 instead of 1/4."},
            {"text": "9 1/3", "isCorrect": True, "rationale": "Correct. 2 1/3 = 7/3 cups. Dividing by 1/4 gives (7/3) ÷ (1/4) = 28/3 = 9 1/3."},
            {"text": "7", "isCorrect": False, "rationale": "This multiplies instead of dividing."},
            {"text": "10", "isCorrect": False, "rationale": "This rounds up incorrectly."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "easy",
        "passage": "A store sells notebooks for $3.25 each. Tom buys 4 notebooks.",
        "questionText": "What is the total cost before tax?",
        "options": [
            {"text": "$12.75", "isCorrect": False, "rationale": "This adds $3.25 four times incorrectly."},
            {"text": "$13.00", "isCorrect": True, "rationale": "Correct. $3.25 × 4 = $13.00."},
            {"text": "$12.00", "isCorrect": False, "rationale": "This uses $3.00 instead of $3.25."},
            {"text": "$16.00", "isCorrect": False, "rationale": "This uses $4.00 per notebook."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "hard",
        "passage": "A swimming pool holds 18,000 gallons of water. It is currently 2/3 full and needs to be filled to 5/6 full.",
        "questionText": "How many gallons of water need to be added?",
        "options": [
            {"text": "3,000 gallons", "isCorrect": True, "rationale": "Correct. 5/6 - 2/3 = 5/6 - 4/6 = 1/6. Then 1/6 of 18,000 = 3,000 gallons."},
            {"text": "6,000 gallons", "isCorrect": False, "rationale": "This is 1/3 of the pool, not 1/6."},
            {"text": "12,000 gallons", "isCorrect": False, "rationale": "This is 2/3 of the pool."},
            {"text": "15,000 gallons", "isCorrect": False, "rationale": "This is 5/6 of the pool, not the difference."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "medium",
        "passage": "A carpenter needs to cut a 10-foot board into pieces that are each 1.25 feet long.",
        "questionText": "How many pieces can be cut from the board?",
        "options": [
            {"text": "7", "isCorrect": False, "rationale": "This doesn't account for all available length."},
            {"text": "8", "isCorrect": True, "rationale": "Correct. 10 ÷ 1.25 = 8 pieces exactly."},
            {"text": "9", "isCorrect": False, "rationale": "This would require more than 10 feet of board."},
            {"text": "6", "isCorrect": False, "rationale": "This leaves 2.5 feet unused."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "easy",
        "passage": "A parking meter costs $0.25 for every 15 minutes. Sarah needs to park for 1 hour.",
        "questionText": "How much will Sarah need to pay?",
        "options": [
            {"text": "$0.50", "isCorrect": False, "rationale": "This is only for 30 minutes."},
            {"text": "$0.75", "isCorrect": False, "rationale": "This is only for 45 minutes."},
            {"text": "$1.00", "isCorrect": True, "rationale": "Correct. 1 hour = 60 minutes = 4 periods of 15 minutes. 4 × $0.25 = $1.00."},
            {"text": "$1.50", "isCorrect": False, "rationale": "This calculates for 90 minutes instead of 60."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "hard",
        "passage": "A factory produces 450 widgets per hour. If the factory operates 16 hours per day, 5 days per week, how many widgets are produced in one week?",
        "questionText": "Calculate the total weekly production.",
        "options": [
            {"text": "7,200 widgets", "isCorrect": False, "rationale": "This is only one day's production (450 × 16)."},
            {"text": "36,000 widgets", "isCorrect": True, "rationale": "Correct. 450 × 16 = 7,200 per day. 7,200 × 5 = 36,000 widgets per week."},
            {"text": "22,500 widgets", "isCorrect": False, "rationale": "This uses only 5 hours per day instead of 16."},
            {"text": "3,600 widgets", "isCorrect": False, "rationale": "This is only for 8 hours total, not per day."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "medium",
        "passage": "A restaurant bill comes to $48.60. If you want to leave a 20% tip, what is the tip amount?",
        "questionText": "Calculate the tip.",
        "options": [
            {"text": "$9.60", "isCorrect": False, "rationale": "This miscalculates 20% of 48.60."},
            {"text": "$9.72", "isCorrect": True, "rationale": "Correct. $48.60 × 0.20 = $9.72."},
            {"text": "$10.00", "isCorrect": False, "rationale": "This rounds up too much."},
            {"text": "$8.60", "isCorrect": False, "rationale": "This subtracts 20 from 48.60 instead of calculating 20%."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "easy",
        "passage": "A box contains 36 markers. If the markers are divided equally among 9 students, how many markers does each student receive?",
        "questionText": "How many markers per student?",
        "options": [
            {"text": "3 markers", "isCorrect": False, "rationale": "This divides 9 by 3 instead."},
            {"text": "4 markers", "isCorrect": True, "rationale": "Correct. 36 ÷ 9 = 4 markers per student."},
            {"text": "5 markers", "isCorrect": False, "rationale": "This would require 45 markers total."},
            {"text": "6 markers", "isCorrect": False, "rationale": "This would require 54 markers total."}
        ]
    },
    {
        "type": "multiple-choice-text",
        "difficulty": "hard",
        "passage": "A train travels at an average speed of 75 miles per hour. If the trip takes 3.5 hours, how far does the train travel?",
        "questionText": "Calculate the distance traveled.",
        "options": [
            {"text": "225 miles", "isCorrect": False, "rationale": "This uses only 3 hours instead of 3.5."},
            {"text": "262.5 miles", "isCorrect": True, "rationale": "Correct. Distance = speed × time = 75 × 3.5 = 262.5 miles."},
            {"text": "300 miles", "isCorrect": False, "rationale": "This uses 4 hours instead of 3.5."},
            {"text": "250 miles", "isCorrect": False, "rationale": "This miscalculates the product."}
        ]
    }
]

def fix_math_placeholders():
    """Replace Math placeholder questions with authentic GED-style questions"""
    
    # Load the data
    filepath = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes\math.quizzes.part1.json")
    
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    replacements = 0
    
    # Find and replace placeholders in math_quant_numbers quiz
    for cat_name, cat_data in data['categories'].items():
        # Check topics
        for topic in cat_data.get('topics', []):
            if topic.get('id') == 'math_quant_numbers':
                for quiz in topic.get('quizzes', []):
                    replacements += replace_in_quiz(quiz)
        
        # Check sets
        for set_name, set_quizzes in cat_data.get('sets', {}).items():
            for quiz in set_quizzes:
                if quiz.get('quizId') == 'math_quant_numbers':
                    replacements += replace_in_quiz(quiz)
    
    # Save the updated data
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Successfully replaced {replacements} Math placeholder questions!")
    return replacements

def replace_in_quiz(quiz):
    """Replace placeholders in a single quiz"""
    questions = quiz['questions']
    count = 0
    
    # Track which questions in bank we've used
    used_questions = set()
    
    for i, q in enumerate(questions):
        # Check if this is a placeholder
        is_placeholder = (
            '__autogen' in q or
            any('placeholder' in opt.get('text', '').lower() 
                for opt in q.get('answerOptions', []))
        )
        
        if is_placeholder:
            # Get an unused question from the bank
            available = [idx for idx in range(len(MATH_QUESTIONS)) if idx not in used_questions]
            if not available:
                print(f"Warning: Ran out of unique questions, reusing from bank")
                available = list(range(len(MATH_QUESTIONS)))
            
            bank_idx = random.choice(available)
            used_questions.add(bank_idx)
            new_q = MATH_QUESTIONS[bank_idx]
            
            # Create replacement question in the correct format
            questions[i] = {
                "questionNumber": q.get('questionNumber', i + 1),
                "type": new_q['type'],
                "content": {
                    "passage": new_q['passage'],
                    "imageURL": "",
                    "questionText": new_q['questionText']
                },
                "answerOptions": new_q['options']
            }
            
            count += 1
            print(f"Replaced Q{q.get('questionNumber', i + 1)}: {new_q['questionText'][:60]}...")
    
    return count

if __name__ == "__main__":
    print("=" * 80)
    print("FIXING MATH PLACEHOLDER QUESTIONS")
    print("=" * 80)
    print("\nReplacing placeholders in math_quant_numbers quiz...")
    print("Using authentic GED-style Number Sense & Operations questions\n")
    
    count = fix_math_placeholders()
    
    print("\n" + "=" * 80)
    print(f"COMPLETE: {count} questions replaced")
    print("=" * 80)
