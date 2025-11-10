import json
from copy import deepcopy
from pathlib import Path


ROOT = Path('public/quizzes')


def load_quiz_file(name: str):
    path = ROOT / name
    return json.loads(path.read_text(encoding='utf-8-sig'))


def save_quiz_file(name: str, data):
    path = ROOT / name
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding='utf-8')


def mc_question(number, qtype, prompt, options, correct_index, rationales, extra=None):
    if len(options) != len(rationales):
        raise ValueError('Options and rationales length mismatch')
    answer_options = []
    for idx, (text, rationale) in enumerate(zip(options, rationales)):
        answer_options.append({
            'text': text,
            'rationale': rationale,
            'isCorrect': idx == correct_index,
        })
    question = {
        'questionNumber': number,
        'type': qtype,
        'question': prompt,
        'answerOptions': answer_options,
    }
    if extra:
        question.update(extra)
    return question


def rla_question(number, passage, prompt, options, correct_index, rationales, *, difficulty='medium', qtype='multipleChoice'):
    if len(options) != len(rationales):
        raise ValueError('Options and rationales length mismatch')
    answer_options = []
    for idx, (text, rationale) in enumerate(zip(options, rationales)):
        answer_options.append({
            'text': text,
            'rationale': rationale,
            'isCorrect': idx == correct_index,
        })
    return {
        'questionNumber': number,
        'type': qtype,
        'difficulty': difficulty,
        'passage': passage,
        'question': prompt,
        'answerOptions': answer_options,
    }


def dedupe_real_questions(all_quizzes, title):
    seen = set()
    unique = []
    for quiz in all_quizzes:
        if quiz.get('title') != title:
            continue
        for question in quiz.get('questions', []):
            blob = json.dumps(question, sort_keys=True)
            if 'placeholder' in blob.lower():
                continue
            key = question.get('question') or question.get('content', {}).get('questionText')
            if not key or key in seen:
                continue
            seen.add(key)
            unique.append(deepcopy(question))
    return unique


def replace_questions(all_quizzes, title, questions):
    for quiz in all_quizzes:
        if quiz.get('title') == title:
            quiz['questions'] = renumber_questions(questions)


def sync_sets_with_quizzes(category):
    quiz_lookup = {}
    for topic in category.get('topics', []):
        for quiz in topic.get('quizzes', []):
            quiz_id = quiz.get('quizId')
            if not quiz_id:
                continue
            normalized = renumber_questions(quiz.get('questions', []))
            quiz['questions'] = [deepcopy(q) for q in normalized]
            quiz_lookup[quiz_id] = normalized
    for quiz_list in category.get('sets', {}).values():
        for quiz in quiz_list:
            quiz_id = quiz.get('quizId')
            if not quiz_id:
                continue
            questions = quiz_lookup.get(quiz_id)
            if questions:
                quiz['questions'] = [deepcopy(q) for q in questions]


def renumber_questions(questions):
    numbered = []
    for idx, question in enumerate(questions, 1):
        q_copy = deepcopy(question)
        q_copy['questionNumber'] = idx
        # Ensure answer options contain rationales for consistency
        options = q_copy.get('answerOptions') or []
        for option in options:
            option.setdefault('rationale', '')
        numbered.append(q_copy)
    return numbered


# --- Math Part 1 updates ---

math_part1 = load_quiz_file('math.quizzes.part1.json')

# Locate curated versions we want to replicate
canonical_qps_set2 = None
canonical_geometry_set2 = None
for category in math_part1['categories'].values():
    for topic in category['topics']:
        for quiz in topic['quizzes']:
            if quiz.get('title') == 'Math — Quantitative Problem Solving Set 2' and quiz.get('quizId') == 'math_quant_basics_set4':
                canonical_qps_set2 = deepcopy(quiz['questions'])
            if quiz.get('title') == 'Math — Geometry Set 2' and quiz.get('quizId') == 'math_geom_basics_set4':
                canonical_geometry_set2 = deepcopy(quiz['questions'])
if canonical_qps_set2 is None:
    raise RuntimeError('Unable to locate curated Quantitative Problem Solving Set 2 quiz')
if canonical_geometry_set2 is None:
    raise RuntimeError('Unable to locate curated Geometry Set 2 quiz')

qps3_questions = [
    mc_question(1, 'knowledge', 'What is 25% of 400?',
                ['50', '80', '100', '120'],
                2,
                [
                    'This is 25% of 200.',
                    'This uses 20% instead of 25%.',
                    'Correct. 0.25 × 400 = 100.',
                    'This applies 30% of 400.',
                ]),
    mc_question(2, 'knowledge', 'Convert 1.25 to a percentage.',
                ['12.5%', '125%', '1,250%', '150%'],
                1,
                [
                    'Moves the decimal only one place.',
                    'Correct. Multiply 1.25 by 100 to get 125%.',
                    'Moves the decimal three places.',
                    'Adds 25 percentage points without justification.',
                ]),
    mc_question(3, 'applied', 'A hat that costs $20 is on sale for 10% off. What is the sale price?',
                ['$18', '$18.50', '$19', '$22'],
                0,
                [
                    'Correct. The discount is $2, so $20 − $2 = $18.',
                    'This subtracts only 7.5% of the price.',
                    'This subtracts only 5% of the price.',
                    'This adds 10% instead of discounting.',
                ]),
    mc_question(4, 'knowledge', 'If a number increases from 40 to 50, what is the percent increase?',
                ['20%', '25%', '50%', '60%'],
                1,
                [
                    'Divides the change by the new value.',
                    'Correct. The increase is 10 and 10 ÷ 40 = 0.25 = 25%.',
                    'This doubles the original value.',
                    'Adds both numbers before dividing.',
                ]),
    mc_question(5, 'applied', 'You invest $500 at a simple interest rate of 4% per year. How much interest will you earn in 5 years?',
                ['$80', '$100', '$120', '$140'],
                1,
                [
                    'Uses 4 years instead of 5.',
                    'Correct. Interest = 500 × 0.04 × 5 = $100.',
                    'Multiplies by 6 years instead of 5.',
                    'Incorrectly adds the principal.',
                ]),
    mc_question(6, 'applied', 'A baker wants to make a cake that is 200% of the original recipe. If the original recipe calls for 3 cups of sugar, how many cups of sugar does the baker need?',
                ['4 cups', '5 cups', '6 cups', '7 cups'],
                2,
                [
                    'Halves the increase rather than doubling it.',
                    'Multiplies by 1.67 instead of 2.',
                    'Correct. 200% equals twice as much: 2 × 3 = 6 cups.',
                    'More than doubles the recipe.',
                ]),
    mc_question(7, 'applied', 'The price of a gallon of gas decreased from $4.00 to $3.50. What was the percent decrease?',
                ['10%', '12.5%', '14%', '15%'],
                1,
                [
                    'Divides by the new price instead of the original.',
                    'Correct. The decrease is $0.50 and 0.50 ÷ 4.00 = 0.125 = 12.5%.',
                    'Rounds the exact percentage.',
                    'Uses $3.50 as the base for the percentage.',
                ]),
    mc_question(8, 'applied', 'A dinner bill is $80. If you leave a 20% tip, what is the total amount you will pay?',
                ['$92', '$94', '$96', '$100'],
                2,
                [
                    'Adds a 15% tip instead of 20%.',
                    'Adds an 17.5% tip.',
                    'Correct. 20% of $80 is $16, and $80 + $16 = $96.',
                    'Assumes a 25% tip.',
                ]),
    mc_question(9, 'knowledge', 'In a survey of 200 people, 80 said they prefer coffee over tea. What percentage of people prefer coffee?',
                ['30%', '35%', '40%', '45%'],
                2,
                [
                    'Divides 80 by 260.',
                    'Uses 70 people instead of 80.',
                    'Correct. 80 ÷ 200 = 0.40 = 40%.',
                    'Divides 90 by 200.',
                ]),
    mc_question(10, 'applied', 'A computer is priced at $1,200. It is first discounted by 15% and then by an additional 10%. What is the final selling price?',
                ['$918', '$930', '$942', '$1,020'],
                0,
                [
                    'Correct. $1,200 × 0.85 = $1,020 and $1,020 × 0.90 = $918.',
                    'Applies 10% to the original price instead of the discounted amount.',
                    'Applies each discount to $1,200 separately before subtracting.',
                    'Stops after the first 15% discount.',
                ]),
    mc_question(11, 'applied', 'An investment of $1,500 earns compound interest at a rate of 3% per year, compounded annually. What is the value of the investment after 3 years? (Round to the nearest cent)',
                ['$1,556.36', '$1,593.60', '$1,639.09', '$1,655.00'],
                2,
                [
                    'Uses simple interest instead of compound interest.',
                    'Compounds for only two years.',
                    'Correct. $1,500 × 1.03³ ≈ $1,639.09.',
                    'Rounds up the compounded result.',
                ]),
    mc_question(12, 'applied', "A store's sales increased by 25% in one year and then decreased by 20% the next year. What was the overall percentage change in sales over the two years?",
                ['0%', '5% increase', '5% decrease', '10% decrease'],
                0,
                [
                    'Correct. $100 × 1.25 × 0.80 returns to $100, so there is no net change.',
                    'Suggests sales continued to rise after the decrease.',
                    'Implies the final amount is $95.',
                    'Overstates the impact of the decrease.',
                ]),
]

qps4_questions = [
    mc_question(1, 'knowledge', 'What is the decimal equivalent of the fraction 3⁄4?',
                ['0.25', '0.50', '0.75', '1.25'],
                2,
                [
                    'This equals 1⁄4, not 3⁄4.',
                    'This equals 1⁄2.',
                    'Correct. 3 ÷ 4 = 0.75.',
                    'Adds rather than divides the fraction.',
                ]),
    mc_question(2, 'knowledge', 'Add the decimals: 1.5 + 2.25.',
                ['3.65', '3.75', '3.85', '4.75'],
                1,
                [
                    'Misaligns the decimal places when adding.',
                    'Correct. 1.50 + 2.25 = 3.75.',
                    'Adds an extra tenth.',
                    'Adds the digits without considering place value.',
                ]),
    mc_question(3, 'knowledge', 'Subtract the fractions: 5⁄8 − 1⁄4.',
                ['1⁄8', '3⁄8', '1⁄2', '5⁄4'],
                1,
                [
                    'Assumes 1⁄4 equals 3⁄8.',
                    'Correct. Convert 1⁄4 to 2⁄8 and subtract: 5⁄8 − 2⁄8 = 3⁄8.',
                    'Adds instead of subtracting the fractions.',
                    'Larger than the starting amount.',
                ]),
    mc_question(4, 'knowledge', 'Multiply the fractions: 2⁄3 × 9⁄10.',
                ['2⁄5', '3⁄5', '4⁄5', '1⁄2'],
                1,
                [
                    'Reduces only one factor before multiplying.',
                    'Correct. (2 × 9) ÷ (3 × 10) = 18⁄30 = 3⁄5.',
                    'Mixes up the cross products.',
                    'Halves instead of multiplying.',
                ]),
    mc_question(5, 'knowledge', 'Divide the decimals: 15.6 ÷ 3.',
                ['4.2', '5.2', '5.6', '6.2'],
                1,
                [
                    'Divides 12.6 by 3.',
                    'Correct. 15.6 ÷ 3 = 5.2.',
                    'Shifts the decimal the wrong direction.',
                    'Adds one whole before dividing.',
                ]),
    mc_question(6, 'applied', 'A recipe requires 3⁄4 cup of sugar. If you are making half the recipe, how much sugar do you need?',
                ['1⁄4 cup', '3⁄8 cup', '1⁄2 cup', '5⁄8 cup'],
                1,
                [
                    'Halving 1⁄2 cup, not 3⁄4 cup.',
                    'Correct. 3⁄4 × 1⁄2 = 3⁄8 cup.',
                    'Halves 1 cup rather than 3⁄4 cup.',
                    'Uses 5⁄4 × 1⁄2 instead of 3⁄4 × 1⁄2.',
                ]),
    mc_question(7, 'knowledge', 'What is the result of 0.25 multiplied by 1.6?',
                ['0.04', '0.32', '0.40', '0.64'],
                2,
                [
                    'Moves the decimal two places instead of one.',
                    'Multiplies 0.20 by 1.6.',
                    'Correct. 0.25 × 1.6 = 0.40.',
                    'Doubles the product incorrectly.',
                ]),
    mc_question(8, 'applied', 'A piece of wood is 8.5 feet long. If you cut off a piece that is 3.75 feet long, how long is the remaining piece?',
                ['4.25 feet', '4.75 feet', '5.25 feet', '5.75 feet'],
                1,
                [
                    'Subtracts 4.25 feet instead of 3.75 feet.',
                    'Correct. 8.50 − 3.75 = 4.75 feet.',
                    'Adds the lengths.',
                    'Rounds 3.75 up to 2.75 before subtracting.',
                ]),
    mc_question(9, 'knowledge', 'Order the following from least to greatest: 0.8, 3⁄5, 0.75.',
                ['0.8, 0.75, 3⁄5', '0.75, 0.8, 3⁄5', '3⁄5, 0.75, 0.8', '3⁄5, 0.8, 0.75'],
                2,
                [
                    'Lists the numbers in descending order.',
                    'Places 0.75 before the smallest number.',
                    'Correct. 3⁄5 = 0.6, then 0.75, then 0.8.',
                    'Swaps the final two values.',
                ]),
    mc_question(10, 'knowledge', 'Divide the fractions: 5⁄6 ÷ 2⁄3.',
                ['5⁄9', '4⁄9', '5⁄4', '6⁄5'],
                2,
                [
                    'Multiplies numerator and denominator by 3.',
                    'Multiplies the denominators instead of reciprocating.',
                    'Correct. 5⁄6 × 3⁄2 = 15⁄12 = 5⁄4.',
                    'Uses the reciprocal of the wrong fraction.',
                ]),
    mc_question(11, 'applied', 'A car travels at a speed of 60.5 miles per hour. How far will it travel in 2.5 hours?',
                ['145 miles', '150.5 miles', '151.25 miles', '152.5 miles'],
                2,
                [
                    'Uses 2.4 hours instead of 2.5 hours.',
                    'Rounds 60.5 down to 60 before multiplying.',
                    'Correct. 60.5 × 2.5 = 151.25 miles.',
                    'Multiplies by 2.52 hours.',
                ]),
    mc_question(12, 'applied', 'A tank is 2⁄5 full of water. If 35 gallons are added, the tank is 3⁄4 full. What is the total capacity of the tank in gallons?',
                ['84 gallons', '100 gallons', '112 gallons', '140 gallons'],
                1,
                [
                    'Assumes the difference between 2⁄5 and 3⁄5.',
                    'Correct. (3⁄4 − 2⁄5) × Capacity = 35 ⇒ Capacity = 100 gallons.',
                    'Adds 35 gallons to a 3⁄5 full tank.',
                    'Multiplies 35 by 4 instead of dividing by the fractional change.',
                ]),
]

qps5_questions = [
    mc_question(1, 'knowledge', 'If h(x) = 4x − 3, what is the value of h(2)?',
                ['3', '5', '7', '9'],
                1,
                [
                    'Evaluates h(2) = 4(2) − 5.',
                    'Correct. 4 × 2 − 3 = 8 − 3 = 5.',
                    'Adds 3 after multiplying.',
                    'Squares x before multiplying.',
                ]),
    mc_question(2, 'knowledge', 'If a function is defined by k(n) = 2n + 1, what is k(4)?',
                ['7', '9', '11', '12'],
                1,
                [
                    'Uses n = 3 instead of 4.',
                    'Correct. 2 × 4 + 1 = 9.',
                    'Adds 3 to the correct value.',
                    'Multiplies 2 by 4 twice.',
                ]),
    mc_question(3, 'knowledge', "A cell phone plan costs $30 per month plus $0.10 per text message. Which function C(m) represents the monthly cost for m text messages?",
                ['C(m) = 30 + 0.10m', 'C(m) = 30.10m', 'C(m) = 30m + 0.10', 'C(m) = 30 − 0.10m'],
                0,
                [
                    'Correct. Fixed cost plus 10 cents per message.',
                    'Treats the base fee as part of the per-message rate.',
                    'Applies the fixed fee to every message.',
                    'Subtracts the usage charge instead of adding it.',
                ]),
    mc_question(4, 'knowledge', 'Find the slope of the line passing through the points (1, 5) and (3, 1).',
                ['−1', '−2', '−3', '−4'],
                1,
                [
                    'Uses the change in x divided by the change in y.',
                    'Correct. (1 − 5) ÷ (3 − 1) = −4 ÷ 2 = −2.',
                    'Subtracts the coordinates in the wrong order.',
                    'Divides the change in y by twice the change in x.',
                ]),
    mc_question(5, 'applied', 'A plumber charges a $50 service fee and $75 per hour of work. How much would a 3-hour job cost?',
                ['$225', '$275', '$300', '$325'],
                1,
                [
                    'Omits the service fee.',
                    'Correct. $50 + 3 × $75 = $275.',
                    'Adds an extra hour of labor.',
                    'Adds the service fee twice.',
                ]),
    mc_question(6, 'applied', 'The value of a car depreciates according to the function V(t) = 20,000 × (0.85)^t, where t is the number of years since purchase. What is the value of the car after 2 years?',
                ['$14,450', '$15,250', '$16,150', '$17,000'],
                0,
                [
                    'Correct. 20,000 × 0.85² = 20,000 × 0.7225 = $14,450.',
                    'Uses only one year of depreciation.',
                    'Rounds the depreciation rate upward.',
                    'Applies the 15% drop only once.',
                ]),
    mc_question(7, 'knowledge', 'A line has a y-intercept of −3 and a slope of 4. What is the equation of the line?',
                ['y = 4x − 3', 'y = 4x + 3', 'y = −3x + 4', 'y = 4x'],
                0,
                [
                    'Correct. y = mx + b with m = 4 and b = −3.',
                    'Uses the wrong sign for the intercept.',
                    'Swaps the slope and intercept.',
                    'Leaves out the y-intercept.',
                ]),
    mc_question(8, 'knowledge', 'If f(x) = x² + 1, what is f(f(2))?',
                ['10', '17', '26', '52'],
                2,
                [
                    'Computes f(2) only once.',
                    'Squares only the inner value.',
                    'Correct. f(2) = 5, then f(5) = 25 + 1 = 26.',
                    'Squares 26 instead of applying f.',
                ]),
    mc_question(9, 'knowledge', "Mary has d dimes and q quarters. Which expression represents the total value of her coins in cents?",
                ['0.10d + 0.25q', '10d + 25q', '25d + 10q', '10(d + q)'],
                1,
                [
                    'Expresses the total in dollars, not cents.',
                    'Correct. Each dime is 10 cents and each quarter is 25 cents.',
                    'Swaps the coin values.',
                    'Counts each coin as 10 cents regardless of type.',
                ]),
    mc_question(10, 'knowledge', 'The sum of two numbers is 30, and their difference is 6. What is the larger number?',
                ['12', '15', '18', '24'],
                2,
                [
                    'Solves for the smaller number.',
                    'Averages the two numbers incorrectly.',
                    'Correct. Solving the system gives the larger number as 18.',
                    'Doubles the smaller number.',
                ]),
    mc_question(11, 'knowledge', "A company's profit is modeled by P(x) = −x² + 20x − 50, where x is the number of units sold. What is the maximum possible profit?",
                ['$10', '$50', '$100', '$150'],
                1,
                [
                    'Evaluates the function at x = 1.',
                    'Correct. The vertex occurs at x = 10 and P(10) = 50.',
                    'Assumes the vertex occurs at x = 5.',
                    'Calculates the y-intercept.',
                ]),
    mc_question(12, 'applied', 'A boat travels upstream at 10 mph and downstream at 16 mph. What is the speed of the current?',
                ['2 mph', '3 mph', '4 mph', '5 mph'],
                1,
                [
                    'Uses the average of the two speeds.',
                    'Correct. Solve b − c = 10 and b + c = 16 to get c = 3 mph.',
                    'Divides the downstream speed by 4.',
                    'Subtracts the speeds instead of solving the system.',
                ]),
]


# --- Math Part 2 updates ---

math_part2 = load_quiz_file('math.quizzes.part2.json')

algebraic_ps_set1_questions = [
    mc_question(1, 'knowledge', 'Simplify the expression: 3x + 5x − 2x.',
                ['4x', '5x', '6x', '8x'],
                2,
                [
                    'Adds only the first two terms.',
                    'Subtracts 5x from 3x.',
                    'Correct. Combine like terms: (3 + 5 − 2)x = 6x.',
                    'Doubles the expression before subtracting.',
                ]),
    mc_question(2, 'knowledge', 'Solve for x: x + 7 = 15.',
                ['7', '8', '9', '22'],
                1,
                [
                    'Stops after subtracting 7 from 7.',
                    'Correct. x = 15 − 7 = 8.',
                    'Adds 7 instead of subtracting.',
                    'Adds both sides instead of isolating x.',
                ]),
    mc_question(3, 'knowledge', 'Evaluate the expression 2a + 3b for a = 4 and b = 2.',
                ['10', '12', '14', '16'],
                2,
                [
                    'Computes 2a + b.',
                    'Evaluates only 2a.',
                    'Correct. 2 × 4 + 3 × 2 = 8 + 6 = 14.',
                    'Squares a before multiplying.',
                ]),
    mc_question(4, 'knowledge', 'Solve for y: 3y − 5 = 16.',
                ['5', '6', '7', '8'],
                2,
                [
                    'Divides 16 by 3 without adding 5 back.',
                    'Uses 3y = 11.',
                    'Correct. 3y = 21 so y = 7.',
                    'Adds 5 twice before dividing.',
                ]),
    mc_question(5, 'knowledge', 'Simplify the expression: 4(2x − 3) + 5.',
                ['8x − 7', '8x + 5', '8x − 12', '2x − 7'],
                0,
                [
                    'Correct. Distribute to get 8x − 12 and add 5 to get 8x − 7.',
                    'Adds 5 before distributing.',
                    'Distributes but forgets to add 5.',
                    'Divides the entire expression by 2.',
                ]),
    mc_question(6, 'knowledge', 'Solve for z: z/4 + 2 = 5.',
                ['8', '10', '12', '14'],
                2,
                [
                    'Multiplies only the constant by 4.',
                    'Adds 4 instead of multiplying.',
                    'Correct. z/4 = 3 so z = 12.',
                    'Subtracts 4 after isolating z/4.',
                ]),
    mc_question(7, 'knowledge', 'The sum of three consecutive integers is 45. What is the smallest of the three integers?',
                ['13', '14', '15', '16'],
                1,
                [
                    'Centers the numbers around 45 instead of dividing by 3.',
                    'Correct. The integers are 14, 15, and 16.',
                    'Gives the middle integer.',
                    'Gives the largest integer.',
                ]),
    mc_question(8, 'knowledge', 'Solve for a: 5a + 9 = 2a + 24.',
                ['3', '4', '5', '11'],
                2,
                [
                    'Divides 24 by 5.',
                    'Subtracts 9 from 24 and stops.',
                    'Correct. 3a = 15 so a = 5.',
                    'Adds 9 to both sides before isolating a.',
                ]),
    mc_question(9, 'knowledge', "Write an algebraic expression for 'five less than twice a number x'.",
                ['x − 5', '2x − 5', '2(x − 5)', 'x/2 − 5'],
                1,
                [
                    'Represents five less than x, not twice x.',
                    'Correct. Twice the number is 2x, then subtract 5.',
                    'Subtracts 5 before doubling.',
                    'Halves the number before subtracting 5.',
                ]),
    mc_question(10, 'knowledge', 'Solve for x: 2(x + 3) − 3(x − 1) = 10.',
                ['−4', '−1', '1', '4'],
                1,
                [
                    'Sets 2(x + 3) equal to 10.',
                    'Correct. Simplifying gives −x + 9 = 10 so x = −1.',
                    'Assumes the terms combine to x + 9.',
                    'Forgets to distribute the −3.',
                ]),
    mc_question(11, 'knowledge', 'Solve the inequality: 3x − 7 > 2x + 1.',
                ['x > 8', 'x > −8', 'x < 8', 'x < −8'],
                0,
                [
                    'Correct. Subtract 2x and add 7 to get x > 8.',
                    'Places the negative on the wrong side of the inequality.',
                    'Reverses the inequality symbol unnecessarily.',
                    'Solves for x < −8.',
                ]),
    mc_question(12, 'applied', 'A rectangle has a perimeter of 40 cm. The length is 4 cm more than the width. What is the area of the rectangle?',
                ['64 cm²', '80 cm²', '96 cm²', '112 cm²'],
                2,
                [
                    'Assumes the width and length are both 10 cm.',
                    'Calculates the perimeter again instead of the area.',
                    'Correct. Width = 8 cm, length = 12 cm, area = 8 × 12 = 96 cm².',
                    'Uses 14 cm as the width before multiplying.',
                ]),
]

# Apply math updates
for category in math_part1['categories'].values():
    for topic in category['topics']:
        quizzes = topic['quizzes']
        replace_questions(quizzes, 'Math — Quantitative Problem Solving Set 2', canonical_qps_set2)
        replace_questions(quizzes, 'Math — Quantitative Problem Solving Set 3', qps3_questions)
        replace_questions(quizzes, 'Math — Quantitative Problem Solving Set 4', qps4_questions)
        replace_questions(quizzes, 'Math — Quantitative Problem Solving Set 5', qps5_questions)
        replace_questions(quizzes, 'Math — Geometry Set 2', canonical_geometry_set2)

for category in math_part1['categories'].values():
    sync_sets_with_quizzes(category)

for category in math_part2['categories'].values():
    for topic in category['topics']:
        quizzes = topic['quizzes']
        replace_questions(quizzes, 'Math — Algebraic Problem Solving Set 1', algebraic_ps_set1_questions)

for category in math_part2['categories'].values():
    sync_sets_with_quizzes(category)

# Persist math updates
save_quiz_file('math.quizzes.part1.json', math_part1)
save_quiz_file('math.quizzes.part2.json', math_part2)

rla_part1 = load_quiz_file('rla.quizzes.part1.json')
rla_part1_quizzes = []
for category in rla_part1['categories'].values():
    for topic in category['topics']:
        rla_part1_quizzes.extend(topic['quizzes'])

rla_part1_titles = [
    'Reasoning Through Language Arts (RLA) — Evidence Selection Set 1',
    'Reasoning Through Language Arts (RLA) — Evidence Selection Set 2',
    'Reasoning Through Language Arts (RLA) — Evidence Selection Set 3',
    'Reasoning Through Language Arts (RLA) — Evidence Selection Set 4',
    'Reasoning Through Language Arts (RLA) — Grammar, Clarity, and Revision Set 2',
    'Reasoning Through Language Arts (RLA) — Grammar, Clarity, and Revision Set 3',
    'Reasoning Through Language Arts (RLA) — Grammar, Clarity, and Revision Set 4',
    'Reasoning Through Language Arts (RLA) — Inference, Tone, and Purpose Set 2',
    'Reasoning Through Language Arts (RLA) — Inference, Tone, and Purpose Set 3',
    'Reasoning Through Language Arts (RLA) — Inference, Tone, and Purpose Set 4',
    'Reasoning Through Language Arts (RLA) — Language & Grammar Set 1',
    'Reasoning Through Language Arts (RLA) — Language & Grammar Set 2',
    'Reasoning Through Language Arts (RLA) — Reading Comprehension: Informational Texts Set 1',
    'Reasoning Through Language Arts (RLA) — Reading Comprehension: Informational Texts Set 2',
]

rla_part1_canon = {
    title: dedupe_real_questions(rla_part1_quizzes, title)
    for title in rla_part1_titles
}

rla_part1_additions = {
    'Reasoning Through Language Arts (RLA) — Evidence Selection Set 3': [
        rla_question(
            0,
            "City officials expanded the bike-share program by adding docks in three neighborhoods that previously lacked reliable transit. In the six months since the expansion, average daily ridership jumped from 750 to 1,200 trips, and subscription renewals climbed 45%. A rider survey found that 87% of respondents now rely on the service at least three times a week.",
            "Which detail best supports the claim that the expansion was worth the investment?",
            [
                "The program launched three years ago with a single downtown hub.",
                "New bike docks were installed in three neighborhoods that lacked transit options.",
                "Average daily ridership increased from 750 to 1,200 trips after the expansion.",
                "Most riders report that they already own personal helmets.",
            ],
            2,
            [
                "This provides background information but no measure of success.",
                "This describes a change in infrastructure, not evidence that the change worked.",
                "Correct. A significant ridership increase demonstrates that residents are using and valuing the expansion.",
                "Helmet ownership does not show whether the program achieved its goal.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A nonprofit launched an after-school tutoring program focused on reading fluency. In the first semester, 60 students attended at least twice a week. Benchmark assessments showed an average 18% gain in reading comprehension scores, and 88% of participating families reported their child reads more confidently at home. The waitlist now includes 40 additional students.",
            "Which detail best supports the claim that the program 'boosted reading skills'?",
            [
                "The program serves students twice each week after school.",
                "Benchmark assessments showed an average 18% gain in reading comprehension scores.",
                "Families reported that children read more confidently at home.",
                "The waitlist now includes 40 additional students.",
            ],
            1,
            [
                "This explains the schedule but not the impact on reading skills.",
                "Correct. A measurable improvement in reading scores directly supports the claim.",
                "This is positive feedback, but the comprehension scores provide stronger evidence of improved skills.",
                "A growing waitlist shows demand, not results.",
            ],
            difficulty='medium'
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Evidence Selection Set 4': [
        rla_question(
            0,
            "A neighborhood recycling campaign added curbside pickup for glass and metal. In the first quarter, the volume of recycled material increased by 62%, diverting an additional 18 tons from the landfill. Local waste-hauling costs dropped by $12,000, and contamination notices fell to their lowest level in five years.",
            "Which detail best supports the claim that the campaign 'significantly reduced waste'?",
            [
                "Curbside pickup for glass and metal was added to the route.",
                "The program diverted an additional 18 tons of material from the landfill in the first quarter.",
                "Waste-hauling costs dropped by $12,000 for the city.",
                "Contamination notices fell to their lowest level in five years.",
            ],
            1,
            [
                "This describes a change in service, not its outcome.",
                "Correct. Diverting 18 tons is direct evidence that less waste went to the landfill.",
                "Lower costs are helpful, but they do not directly quantify the waste reduction.",
                "Fewer contamination notices show better sorting, not necessarily less waste overall.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A hospital introduced a text-message reminder system for follow-up appointments. Within six months, no-show rates dropped from 28% to 9%, and patient satisfaction with scheduling rose to 94%. The clinic estimates that the reduction in missed appointments freed 210 additional slots for new patients.",
            "Which detail best supports the claim that the reminder system 'dramatically improved attendance'?",
            [
                "Patients received text messages before their appointments.",
                "No-show rates dropped from 28% to 9% after the system launched.",
                "Patient satisfaction with scheduling rose to 94%.",
                "The clinic freed 210 additional slots for new patients.",
            ],
            1,
            [
                "This explains how the system works, not its impact.",
                "Correct. A large reduction in missed appointments directly proves attendance improved.",
                "Higher satisfaction is positive but less direct than the no-show statistic.",
                "More available slots show a side benefit rather than direct evidence of attendance.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "To address food insecurity, a school district opened a weekend meal pantry. During the first semester, 340 families picked up meal boxes each week, up from 120 the previous year. Teachers reported a 30% decline in Monday morning nurse visits for hunger-related complaints, and community donations doubled.",
            "Which detail best supports the claim that the pantry 'reached far more families in need'?",
            [
                "Community donations to the pantry doubled this semester.",
                "Teachers reported fewer hunger-related nurse visits on Mondays.",
                "340 families picked up meal boxes each week, up from 120 the previous year.",
                "The pantry is open on weekends.",
            ],
            2,
            [
                "Donations increased, but this does not show how many families were served.",
                "This is a positive effect, but it does not quantify participation.",
                "Correct. Serving 340 families compared to 120 clearly shows the pantry reached more households.",
                "The operating schedule does not provide evidence of impact.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A manufacturing plant replaced old lighting with high-efficiency LEDs. Energy usage dropped by 35%, saving $18,500 in electricity over three months. Maintenance calls for lighting issues fell from 22 to 4 during the same period, and employee satisfaction surveys cited brighter work areas.",
            "Which detail best supports the claim that the upgrade 'significantly reduced energy consumption'?",
            [
                "Employee surveys cited brighter work areas.",
                "Maintenance calls for lighting issues fell from 22 to 4.",
                "Energy usage dropped by 35%, saving $18,500 in electricity over three months.",
                "The plant replaced old lighting with LEDs.",
            ],
            2,
            [
                "This indicates improved morale, not energy savings.",
                "This reflects reliability gains rather than energy use.",
                "Correct. The 35% decrease and cost savings directly measure reduced consumption.",
                "This restates the action taken, not the result.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A community college piloted an online advising portal. Within the first term, 78% of students scheduled advising sessions through the portal, compared with 32% the previous term. The percentage of students registering on time increased from 68% to 91%, and call center wait times dropped by half.",
            "Which detail best supports the claim that the portal 'helped students stay on track with registration'?",
            [
                "Call center wait times dropped by half.",
                "Students scheduled more advising sessions through the portal.",
                "On-time registration increased from 68% to 91% after the portal launched.",
                "The portal was piloted for one term.",
            ],
            2,
            [
                "Shorter wait times are helpful but not direct evidence of staying on track.",
                "More advising appointments are positive but do not confirm timely registration.",
                "Correct. A large increase in on-time registration shows the portal kept students on schedule.",
                "This only gives context for the timeline.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A startup released a budgeting app that sends real-time alerts. Beta users reported an average 22% decrease in overdraft fees within three months. The app logged 9,000 weekly sessions and maintained a 4.8-star rating. Half of the new features requested were added within six weeks.",
            "Which detail best supports the claim that the app 'helped users avoid overdraft fees'?",
            [
                "The app logged 9,000 weekly sessions.",
                "Users gave the app a 4.8-star rating.",
                "Beta users saw an average 22% decrease in overdraft fees within three months.",
                "Half of requested features were added within six weeks.",
            ],
            2,
            [
                "Usage statistics do not prove fewer overdrafts.",
                "A high rating shows satisfaction, not overdraft outcomes.",
                "Correct. Fewer overdraft fees directly demonstrate the app's effectiveness.",
                "Feature updates show responsiveness, not overdraft reduction.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A regional theater introduced pay-what-you-can preview nights. Attendance at previews rose from 220 to 480 patrons, and 38% of attendees were first-time ticket buyers. Donations collected at the door totaled $14,600, surpassing the theater's goal by 40%.",
            "Which detail best supports the claim that the preview nights 'attracted new audiences'?",
            [
                "Donations collected at the door totaled $14,600.",
                "Attendance at previews rose from 220 to 480 patrons.",
                "Thirty-eight percent of attendees were first-time ticket buyers.",
                "The theater introduced pay-what-you-can pricing.",
            ],
            2,
            [
                "Higher donations indicate support but not new attendees.",
                "More attendees overall is positive, but it does not confirm they were new patrons.",
                "Correct. The percentage of first-time ticket buyers shows the program drew new audiences.",
                "This explains the pricing model, not its impact.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A high school implemented peer mentoring for freshmen. After one year, the freshmen failure rate fell from 18% to 9%, and 92% of participants reported feeling more connected to the school. Counselors noted a 40% drop in discipline referrals among mentored students.",
            "Which detail best supports the claim that peer mentoring 'helped freshmen stay academically successful'?",
            [
                "Mentored students filed 40% fewer discipline referrals.",
                "Ninety-two percent of participants felt more connected to the school.",
                "The freshmen failure rate fell from 18% to 9% after the program began.",
                "Upperclass students volunteered as mentors.",
            ],
            2,
            [
                "Fewer referrals show improved behavior, not academic success.",
                "Stronger connections are valuable but do not directly show academic improvement.",
                "Correct. A drop in failure rates is direct evidence of academic success.",
                "This states who participated, not the result.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A local farmers market extended its season through November. Vendor participation stayed steady, and total customer visits increased 28% compared with the previous fall. The market processed $52,000 in food-assistance benefits, up from $33,000 the year before, and social media followers doubled.",
            "Which detail best supports the claim that extending the season 'allowed the market to serve more households'?",
            [
                "Vendor participation stayed steady from week to week.",
                "Total customer visits increased 28% compared with the previous fall.",
                "Food-assistance transactions grew from $33,000 to $52,000.",
                "The market's social media followers doubled.",
            ],
            1,
            [
                "Steady vendor participation shows consistency, not broader reach.",
                "Correct. More customer visits indicate more households were served.",
                "This shows more benefits redeemed but not the overall number of households served.",
                "Follower counts reflect marketing reach rather than direct service.",
            ],
            difficulty='medium'
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Grammar, Clarity, and Revision Set 4': [
        mc_question(
            0,
            'multipleChoice',
            'Which sentence uses parallel structure correctly?',
            [
                'The committee outlined goals: increasing enrollment, improving retention, and students graduate sooner.',
                'Our training focuses on practicing skills, receiving feedback, and applying strategies in the classroom.',
                'The director expects that we arrive on time, preparation of reports, and that we follow up quickly.',
                'Volunteers should sign the log, they will meet with staff, and attending orientation is required.',
            ],
            1,
            [
                'The final item (“students graduate sooner”) is not parallel with the gerunds.',
                'Correct. Each item is a gerund phrase that matches the others.',
                'The items switch between verbs and nouns, breaking parallel structure.',
                'The series mixes verbs and participial phrases, so it is not parallel.',
            ],
            extra={'difficulty': 'medium'}
        ),
        mc_question(
            0,
            'multipleChoice',
            'Which sentence maintains correct pronoun-antecedent agreement?',
            [
                'Every student must submit their application before Friday.',
                'Neither the nurses nor the doctor brought their badge.',
                'Each of the finalists shared his or her portfolio with the judges.',
                'The team finished its warm-up and took their places on the field.',
            ],
            2,
            [
                '“Every student” is singular, so the pronoun should be singular as well.',
                'The compound subject closest to the pronoun is “doctor,” which is singular.',
                'Correct. The singular indefinite pronoun pairs with a singular pronoun.',
                '“Team” is treated as a singular collective noun, so “its” is required.',
            ],
            extra={'difficulty': 'medium'}
        ),
        mc_question(
            0,
            'multipleChoice',
            'Which revision best eliminates unnecessary wordiness?',
            [
                'Due to the fact that attendance has decreased, we are going to postpone the lecture.',
                'Attendance has decreased, and as a result we are going to postpone the lecture.',
                'Because attendance has decreased, we will postpone the lecture.',
                'It is important to note that attendance has decreased, so therefore we will postpone the lecture.',
            ],
            2,
            [
                '“Due to the fact that” is a wordy phrase that can be replaced with “because.”',
                'This revision is clearer but still repeats the cause-and-effect idea.',
                'Correct. The sentence is concise while preserving the meaning.',
                'The phrase “it is important to note” and “so therefore” add redundancy.',
            ],
            extra={'difficulty': 'medium'}
        ),
        mc_question(
            0,
            'multipleChoice',
            'Which sentence uses punctuation correctly for an introductory phrase?',
            [
                'After the presentation we will distribute the handouts.',
                'In order to succeed, you must, practice consistently.',
                'Before leaving the lab, confirm that the equipment is powered down.',
                'During the storm however the power stayed on.',
            ],
            2,
            [
                'A comma is needed after the introductory phrase “After the presentation.”',
                'The second comma is misplaced and interrupts the verb phrase.',
                'Correct. The introductory clause is followed by a comma before the main clause.',
                'The sentence requires commas around the transitional word “however.”',
            ],
            extra={'difficulty': 'medium'}
        ),
        mc_question(
            0,
            'multipleChoice',
            'Which revision best corrects the dangling modifier?',
            [
                'Running down the hallway, the backpack slipped from Maya’s shoulder.',
                'While she was running down the hallway, Maya’s backpack slipped from her shoulder.',
                'Running down the hallway, there was a backpack slipping from Maya’s shoulder.',
                'To run down the hallway, the backpack slipped from Maya’s shoulder.',
            ],
            1,
            [
                'The modifier “Running down the hallway” appears to describe the backpack.',
                'Correct. The revised sentence makes it clear that Maya was running.',
                'The revision still leaves the modifier without a clear subject.',
                'The infinitive phrase does not connect the action to Maya.',
            ],
            extra={'difficulty': 'medium'}
        ),
        mc_question(
            0,
            'multipleChoice',
            'Which sentence maintains a formal tone appropriate for a business report?',
            [
                'Honestly, the pilot program was kind of a mess.',
                'The pilot program encountered several implementation problems that delayed results.',
                'It was a total disaster when the pilot program first launched.',
                'We were super frustrated about the pilot program’s start.',
            ],
            1,
            [
                '“Honestly” and “kind of a mess” sound informal.',
                'Correct. The sentence uses precise, professional language.',
                '“Total disaster” is overly emotional and informal.',
                '“Super frustrated” is slang that undermines the formal tone.',
            ],
            extra={'difficulty': 'medium'}
        ),
        mc_question(
            0,
            'multipleChoice',
            'Which option combines the sentences without creating a run-on?',
            [
                'The committee reviewed the proposal, it requested additional data before voting.',
                'Reviewing the proposal, the committee requested additional data before voting.',
                'The committee reviewed the proposal they requested additional data before voting.',
                'The committee reviewed the proposal, and requesting additional data before voting.',
            ],
            1,
            [
                'This is a comma splice; it needs a conjunction or separation.',
                'Correct. The participial phrase clearly links the two actions.',
                'This sentence lacks necessary punctuation between clauses.',
                'The second clause is a fragment and does not have a subject.',
            ],
            extra={'difficulty': 'medium'}
        ),
        mc_question(
            0,
            'multipleChoice',
            'Which sentence uses apostrophes correctly?',
            [
                'The interns report highlighted the departments achievements.',
                'The interns’ report highlighted the department’s achievements.',
                'The intern’s report highlighted the departments’ achievements.',
                'The interns report highlighted the department’s achievements.',
            ],
            1,
            [
                '“Interns” needs an apostrophe to show possession, and “department’s” needs one as well.',
                'Correct. The plural possessive “interns’” and singular possessive “department’s” are both accurate.',
                'This implies one intern wrote the report and multiple departments own the achievements.',
                'The report belongs to the interns collectively, so an apostrophe is needed.',
            ],
            extra={'difficulty': 'medium'}
        ),
        mc_question(
            0,
            'multipleChoice',
            'Which revision clarifies the ambiguous reference?',
            [
                'When Maria met with Tasha, she explained the new policy.',
                'When Maria met with Tasha, Maria explained the new policy.',
                'When Maria met with Tasha, the new policy was explained.',
                'Meeting with Tasha, Maria explained the new policy.',
            ],
            3,
            [
                'It is unclear whether “she” refers to Maria or Tasha.',
                'Repeating “Maria” clarifies the subject, but it is unnecessarily repetitive.',
                'The passive voice obscures who explained the policy.',
                'Correct. The participial phrase clearly indicates that Maria did the explaining.',
            ],
            extra={'difficulty': 'medium'}
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Inference, Tone, and Purpose Set 4': [
        rla_question(
            0,
            "Thank you for refunding the service fee so quickly. I appreciate how promptly your support team responded this time. I hope that future shipments will arrive on the date promised so I won’t need to ask for help again.",
            "What can be inferred about the writer’s previous experience?",
            [
                "This was the first time the writer contacted customer support.",
                "A previous shipment arrived late, prompting the writer to ask for help.",
                "The writer usually refuses refunds even when orders are delayed.",
                "Customer support ignored the writer’s earlier messages entirely.",
            ],
            1,
            [
                "The letter implies the writer has contacted support before.",
                "Correct. The writer hopes future shipments arrive on time so help will not be needed again.",
                "Nothing suggests the writer refuses refunds.",
                "The writer thanks support for responding quickly, so prior messages were not ignored.",
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "When I walk past the vacant storefront where McAllen’s Bakery used to be, the street feels quieter. The warm aroma of cinnamon rolls has been replaced with the sterile glare of an “Available for Lease” sign. Progress, it seems, forgot to save a space for the places that made this neighborhood feel like home.",
            "What is the tone of the passage?",
            [
                "Playful and lighthearted",
                "Nostalgic and wistful",
                "Optimistic about new businesses",
                "Angry and confrontational",
            ],
            1,
            [
                'The passage reflects on loss, not humor.',
                'Correct. The writer longs for the warmth the bakery provided.',
                'The writer laments the changes rather than embracing them.',
                'The language is regretful, not aggressively angry.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "Board members, you have seen the enrollment data. Our tutoring program lifts struggling students by two grade levels within a semester. With modest funding, we can add evening sessions so working parents are not shut out. I urge you to approve this budget amendment tonight.",
            "What is the author’s primary purpose?",
            [
                "To entertain the board with success stories",
                "To persuade the board to approve additional funding",
                "To explain how the tutoring program measures success",
                "To criticize the board for delaying previous votes",
            ],
            1,
            [
                'The passage is argumentative, not entertaining.',
                'Correct. The writer appeals directly for a budget amendment.',
                'Explaining metrics supports the argument but is not the main purpose.',
                'The passage urges approval rather than attacking past decisions.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "Elena stayed late for the third night in a row, double-checking invoices before they went out. No one told her to do it; she simply refused to let a single error reach our clients. When she finally powered down her computer, the office was dark.",
            "What can be inferred about Elena?",
            [
                "She makes frequent mistakes on invoices.",
                "She is diligent about accuracy, even without being asked.",
                "She enjoys working late because the office is quiet.",
                "She was ordered by her supervisor to stay after hours.",
            ],
            1,
            [
                'The passage shows Elena is trying to prevent mistakes.',
                'Correct. She stays late voluntarily to ensure invoices are correct.',
                'The passage does not suggest she enjoys the late nights.',
                'It explicitly states no one told her to stay.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "Go ahead and celebrate the “innovative” parking meters, the ones that charge two dollars more per hour and still malfunction when it rains. Nothing says “welcoming downtown” like watching visitors frantically reload an app that can’t stay connected.",
            "What is the author’s tone toward the new parking meters?",
            [
                "Admiring",
                "Sarcastic",
                "Neutral",
                "Confused",
            ],
            1,
            [
                'The author clearly disapproves of the meters.',
                'Correct. The exaggerated praise reveals sarcasm.',
                'The diction is far from neutral.',
                'The author understands the issue; confusion is not expressed.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "Team, we have eight hours to restore power to the clinic. Families are depending on those freezers to keep medication stable. Assign one crew to the generators and another to the transfer switch. Radio me every 30 minutes with status updates so we can remove obstacles quickly.",
            "What is the primary purpose of this message?",
            [
                "To recount how the power failure happened",
                "To motivate the team with praise",
                "To give urgent instructions for completing a task",
                "To request volunteers for future assignments",
            ],
            2,
            [
                'The message does not describe the cause of the failure.',
                'While the situation is serious, the focus is on directing action, not praise.',
                'Correct. The speaker assigns tasks and timelines to restore power quickly.',
                'The message is about the current emergency, not future staffing.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "As curator, I am thrilled to accept your grandfather’s sketches. They complete the story of our city’s waterfront—his detailed notes on the backs will guide our historians for years. We will catalog the pieces this month and unveil them in the spring exhibition.",
            "What can be inferred from the curator’s message?",
            [
                "The sketches are duplicates of works the museum already owns.",
                "The sketches provide valuable historical context for the museum.",
                "The curator is unsure whether the sketches are authentic.",
                "The museum cannot display the sketches until it receives more funding.",
            ],
            1,
            [
                'The curator implies the sketches fill a gap, not that they are duplicates.',
                'Correct. The curator notes that the sketches and notes will guide historians.',
                'Nothing suggests doubt about authenticity.',
                'The curator plans to unveil them in spring, showing no funding barrier.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "If the condo developers win again, we lose the last stretch of shoreline where families can watch the tide without buying a ticket. They promise boutiques; I promise you higher rents and a view blocked by glass towers. Call the council before Thursday’s vote if you believe this waterfront belongs to everyone.",
            "What best describes the author’s tone toward the proposed development?",
            [
                "Resigned",
                "Earnest and cautionary",
                "Detached",
                "Amused",
            ],
            1,
            [
                'The author urges action, not resignation.',
                'Correct. The writer earnestly warns readers about the consequences.',
                'The passage is passionate, not detached.',
                'There is no humor in the plea.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            "A memo on my desk says the audit “unexpectedly uncovered opportunities.” Translation: we overspent, and leadership wants fixes by Friday. I’ll be spending the next few evenings combing through invoices instead of seeing my family.",
            "What can be inferred about the writer’s perspective on the audit findings?",
            [
                "The writer views the audit results as positive opportunities.",
                "The writer believes the audit exposed problems that require urgent work.",
                "The writer thinks the audit findings are unimportant.",
                "The writer is confused about what the memo means.",
            ],
            1,
            [
                'The quotation marks around “opportunities” suggest skepticism.',
                'Correct. The writer expects significant extra work to address overspending.',
                'The writer’s frustration indicates the findings are serious.',
                'The writer understands the memo’s implications even if they are unwelcome.',
            ],
            difficulty='medium'
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Language & Grammar Set 2': [
        mc_question(
            0,
            'knowledge',
            'Which sentence uses the correct verb tense?',
            [
                'By the time we arrived, the speaker begins the presentation.',
                'By the time we arrived, the speaker had begun the presentation.',
                'By the time we arrived, the speaker has begun the presentation.',
                'By the time we arrived, the speaker would begin the presentation.',
            ],
            1,
            [
                'The past perfect tense is required to show the presentation started earlier.',
                'Correct. “Had begun” shows the action happened before we arrived.',
                'The present perfect tense is inconsistent with the past time frame.',
                '“Would begin” suggests a future action that has not yet occurred.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which sentence uses commas correctly in a compound sentence?',
            [
                'The proposal is thorough, and we should approve it.',
                'The proposal is thorough and, we should approve it.',
                'The proposal is thorough, and should be approved.',
                'The proposal is thorough and we, should approve it.',
            ],
            0,
            [
                'Correct. A comma precedes the coordinating conjunction joining two independent clauses.',
                'The comma incorrectly separates the subject from the verb.',
                'The comma separates the subject from the predicate in the second clause.',
                'The second clause is split awkwardly by the comma.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Select the pronoun that correctly completes the sentence: “Neither Jordan nor the interns remembered to bring ____ ID badges.”',
            ['his or her', 'their', 'its', 'our'],
            0,
            [
                'Correct. “Neither...nor” with singular nouns takes a singular pronoun.',
                '“Their” is plural, but the structure requires a singular pronoun.',
                '“Its” would refer to a singular nonhuman antecedent.',
                '“Our” does not match the antecedents.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which sentence avoids a double negative?',
            [
                'We don’t need no additional copies.',
                'No one hardly noticed the change in schedule.',
                'She never said nothing about the deadline.',
                'We received no additional copies.',
            ],
            3,
            [
                '“Don’t” and “no” create a double negative.',
                '“No one” and “hardly” function together as a double negative.',
                '“Never” and “nothing” form a double negative.',
                'Correct. The sentence uses a single negative construction.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which sentence uses the hyphen correctly?',
            [
                'The community launched a three-year plan.',
                'The community launched a three year-plan.',
                'The community launched a three year plan.',
                'The community launched a plan three-year.',
            ],
            0,
            [
                'Correct. A hyphen joins a compound adjective before a noun.',
                'The hyphen is placed incorrectly after “year.”',
                'The compound adjective should be hyphenated.',
                'The hyphen is misplaced at the end.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which sentence uses the semicolon correctly?',
            [
                'Our team finished the report; and delivered it on time.',
                'Our team finished the report; we delivered it on time.',
                'Our team; finished the report and delivered it on time.',
                'Our team finished; the report and delivered it on time.',
            ],
            1,
            [
                'A semicolon should not precede a conjunction.',
                'Correct. The semicolon joins two closely related independent clauses.',
                'The semicolon improperly splits the subject from the verb.',
                'The semicolon interrupts the verb phrase.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which sentence uses the comparative adjective correctly?',
            [
                'This route is the most short way to campus.',
                'This route is shorter than the one we took yesterday.',
                'This route is more shorter than the one we took yesterday.',
                'This route is short than the one we took yesterday.',
            ],
            1,
            [
                '“Most short” is incorrect; “shortest” would be the superlative form.',
                'Correct. “Shorter” is the appropriate comparative form.',
                '“More shorter” is redundant.',
                '“Short than” is grammatically incorrect.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which sentence capitalizes titles correctly?',
            [
                'I met Director of Finance Carla Gomez in the lobby.',
                'I met director of finance Carla Gomez in the lobby.',
                'I met Director of finance Carla Gomez in the lobby.',
                'I met director of Finance Carla Gomez in the lobby.',
            ],
            0,
            [
                'Correct. The formal title is capitalized because it precedes the name.',
                'When a title precedes a name in a formal context, it should be capitalized.',
                'Both words in the official title should be capitalized before the name.',
                'Only one word in the title is capitalized, which is inconsistent.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which sentence uses an adverb correctly to modify the verb?',
            [
                'The driver navigated the detour smooth.',
                'The driver navigated the detour smoothly.',
                'The driver smooth navigated the detour.',
                'The driver navigated smooth the detour.',
            ],
            1,
            [
                'An adverb is needed to modify the verb “navigated.”',
                'Correct. “Smoothly” is the proper adverb form.',
                'The adverb should follow the verb it modifies.',
                'This word order is incorrect.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which option corrects the run-on sentence?',
            [
                'The grant was approved we ordered the new equipment.',
                'The grant was approved, we ordered the new equipment.',
                'The grant was approved, so we ordered the new equipment.',
                'The grant was approved and ordered the new equipment.',
            ],
            2,
            [
                'This version still lacks necessary punctuation.',
                'A comma alone cannot join two independent clauses.',
                'Correct. The coordinating conjunction creates a complete compound sentence.',
                'The second clause lacks a subject.',
            ]
        ),
        mc_question(
            0,
            'knowledge',
            'Which sentence maintains a consistent point of view?',
            [
                'When one works remotely, you must set boundaries for your day.',
                'When you work remotely, you must set boundaries for your day.',
                'When we work remotely, one must set boundaries for your day.',
                'When they work remotely, you must set boundaries for your day.',
            ],
            1,
            [
                'The sentence shifts from third person (“one”) to second person (“you”).',
                'Correct. The sentence consistently uses second-person point of view.',
                'The sentence shifts between first and second person.',
                'The sentence shifts between third and second person.',
            ]
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Reading Comprehension: Informational Texts Set 2': [
        rla_question(
            0,
            'The city’s pilot composting program collected 18 tons of food scraps in its first month. Residents received countertop bins, and collection trucks visited every Thursday. The city estimates that if the program expands citywide, it could divert 12% of household waste from the landfill each year.',
            'Which statement best summarizes the passage?',
            [
                'The city’s garbage trucks run every Thursday.',
                'Residents complained about countertop compost bins.',
                'The pilot composting program showed promising results that could reduce landfill waste.',
                'Household waste increased after the pilot program began.',
            ],
            2,
            [
                'The day of collection is a supporting detail, not the summary.',
                'The passage does not mention complaints.',
                'Correct. The pilot program collected significant waste and could reduce landfill volume.',
                'The passage predicts a reduction in waste, not an increase.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'Researchers tracking monarch butterflies found that the insects now migrate two weeks later than they did a decade ago. The team attributes the shift to warmer autumn temperatures, which allow milkweed—the butterflies’ primary food source—to bloom longer.',
            'Which detail explains why the migration is occurring later?',
            [
                'Monarch butterflies are being tracked by researchers.',
                'Milkweed is blooming longer because of warmer autumn temperatures.',
                'The butterflies feed on many different plants during migration.',
                'The insects migrated earlier a decade ago.',
            ],
            1,
            [
                'This is background information, not the reason for the shift.',
                'Correct. Longer-blooming milkweed provides food later into the season.',
                'The passage specifies milkweed as the primary food source.',
                'This restates the change but not the cause.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'To keep the trails safe during winter, the parks department is asking hikers to report fallen branches using the new Parks Connect app. Reports automatically include GPS coordinates, allowing maintenance crews to respond within 24 hours.',
            'What is the primary purpose of the Parks Connect app in this passage?',
            [
                'To send hiking tips to residents',
                'To track wildlife sightings along the trails',
                'To help hikers report hazards so crews can respond quickly',
                'To schedule guided tours of the park',
            ],
            2,
            [
                'The passage does not mention hiking tips.',
                'Wildlife tracking is not discussed.',
                'Correct. The app allows hikers to report issues with precise locations.',
                'Guided tours are not referenced.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'A hospital newsletter describes a new telehealth clinic that provides evening appointments. The article notes that patients can now speak with nurses after work hours, reducing the need for emergency room visits for minor issues.',
            'Which outcome does the newsletter highlight?',
            [
                'Patients will have shorter hospital stays.',
                'Nurses no longer work daytime shifts.',
                'Evening telehealth appointments may reduce unnecessary emergency room visits.',
                'Insurance companies will offer new discounts.',
            ],
            2,
            [
                'Length of hospital stays is not addressed.',
                'Daytime shifts are not mentioned.',
                'Correct. The newsletter emphasizes fewer emergency visits for minor issues.',
                'No information about insurance discounts is provided.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'Minutes from the neighborhood association explain that traffic calming measures reduced speeding by 35% on Elm Street. However, the minutes also state that delivery drivers now park in bike lanes because they cannot stop near storefronts.',
            'What conclusion can be drawn from the minutes?',
            [
                'Traffic calming has only negative effects.',
                'The association values parking more than pedestrian safety.',
                'The measures reduced speeding but created a parking challenge for delivery drivers.',
                'Bike lanes will be removed next month.',
            ],
            2,
            [
                'The minutes acknowledge both benefits and drawbacks.',
                'The passage does not indicate the association’s priorities.',
                'Correct. Speeding dropped, yet delivery parking became difficult.',
                'The minutes do not mention removing bike lanes.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'The state agriculture department warned growers that a late frost could damage budding fruit trees. Officials advised farmers to run irrigation systems overnight because a thin layer of ice can insulate blossoms from freezing air.',
            'According to the advisory, how can farmers protect their crops?',
            [
                'By harvesting the fruit earlier in the season',
                'By covering trees with plastic tarps during the day',
                'By using irrigation systems to create a protective ice layer',
                'By planting new trees after the frost passes',
            ],
            2,
            [
                'Harvesting earlier is not suggested.',
                'Tarping during the day is not mentioned.',
                'Correct. The advisory recommends forming a protective ice layer with irrigation.',
                'Planting new trees is not discussed.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'An internal memo notes that customer wait times have dropped from 18 minutes to 7 minutes since the help center added live chat support. The memo instructs managers to schedule at least one employee per shift to monitor chat requests during peak hours.',
            'What is the memo asking managers to do?',
            [
                'Eliminate live chat support because it is ineffective',
                'Rotate employees into the live chat queue during busy periods',
                'Increase phone staffing while reducing online support',
                'Survey customers about their chat experience',
            ],
            1,
            [
                'The memo says wait times dropped, indicating the feature is effective.',
                'Correct. Managers must assign at least one employee to monitor chat during peak times.',
                'The memo does not suggest reducing online support.',
                'Customer surveys are not mentioned.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'A news article reports that the regional airport installed solar panels that now generate 40% of the terminal’s electricity. Airport officials state that the project will pay for itself in seven years through reduced utility bills.',
            'What benefit do officials emphasize?',
            [
                'The panels make the airport completely energy independent.',
                'Reduced utility costs will offset the installation over time.',
                'Flights will become less expensive for passengers.',
                'The panels were donated by a local nonprofit.',
            ],
            1,
            [
                'The panels provide 40%, not 100%, of the terminal’s electricity.',
                'Correct. Officials highlight long-term savings on utility bills.',
                'Ticket prices are not discussed.',
                'The article does not mention donations.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'An editorial argues that the public library’s makerspace should remain open on weekends. The writer notes that attendance nearly doubles on Saturdays and that families rely on the 3D printers for school projects they cannot complete at home.',
            'What evidence does the editorial use to support keeping the makerspace open?',
            [
                'Weekend attendance almost doubles, and families need access to specialized equipment.',
                'The makerspace sells 3D printers to local schools.',
                'Weekday programs are overstaffed.',
                'The library plans to close permanently.',
            ],
            0,
            [
                'Correct. The writer cites high attendance and reliance on the equipment.',
                'Selling printers is not mentioned.',
                'Staffing levels are not discussed.',
                'The editorial argues to keep the makerspace open, not close the library.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'In a press release, a college announced that incoming freshmen will receive free transit passes. Administrators expect the passes to ease parking demand and help students afford commuting costs.',
            'Which reason does the press release give for offering transit passes?',
            [
                'To encourage students to move off campus',
                'To reduce parking demand and lower commuting costs for students',
                'To limit students’ course schedules',
                'To replace the campus shuttle system',
            ],
            1,
            [
                'Moving off campus is not discussed.',
                'Correct. The passes are intended to ease parking and save students money.',
                'Course scheduling is unrelated.',
                'The campus shuttle is not mentioned.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'A workplace safety bulletin states that minor injuries dropped by 22% after the company introduced mandatory stretch breaks. Supervisors are reminded to log the breaks daily and to report any skipped sessions to HR.',
            'What does the bulletin require supervisors to do?',
            [
                'Cancel the stretch break program because injuries decreased',
                'Log the daily stretch breaks and report when sessions are skipped',
                'Assign longer shifts to employees',
                'Allow workers to skip stretch breaks if the schedule is busy',
            ],
            1,
            [
                'The bulletin credits the program with reducing injuries.',
                'Correct. Supervisors must document breaks and report missed sessions.',
                'Longer shifts are not mentioned.',
                'The bulletin emphasizes compliance, not skipping breaks.',
            ],
            difficulty='medium',
            qtype='text'
        ),
    ],
}

for title, questions in rla_part1_canon.items():
    extras = rla_part1_additions.get(title, [])
    combined = questions + extras
    if len(combined) < 12:
        raise RuntimeError(f'Not enough vetted questions for {title}')
    rla_part1_canon[title] = renumber_questions(combined[:12])

for category in rla_part1['categories'].values():
    for topic in category['topics']:
        quizzes = topic['quizzes']
        for title, questions in rla_part1_canon.items():
            replace_questions(quizzes, title, questions)

for category in rla_part1['categories'].values():
    sync_sets_with_quizzes(category)

# Persist RLA Part 1 updates
save_quiz_file('rla.quizzes.part1.json', rla_part1)









rla_part2 = load_quiz_file('rla.quizzes.part2.json')
rla_part2_quizzes = []
for category in rla_part2['categories'].values():
    for topic in category['topics']:
        rla_part2_quizzes.extend(topic['quizzes'])

rla_part2_titles = [
    'Reasoning Through Language Arts (RLA) — Main Idea Set 1',
    'Reasoning Through Language Arts (RLA) — Main Idea Set 2',
    'Reasoning Through Language Arts (RLA) — Main Idea Set 3',
    'Reasoning Through Language Arts (RLA) — Main Idea Set 4',
    'Reasoning Through Language Arts (RLA) — Vocabulary in Context Set 1',
    'Reasoning Through Language Arts (RLA) — Vocabulary in Context Set 2',
    'Reasoning Through Language Arts (RLA) — Vocabulary in Context Set 3',
    'Reasoning Through Language Arts (RLA) — Vocabulary in Context Set 4',
]

rla_part2_canon = {
    title: dedupe_real_questions(rla_part2_quizzes, title)
    for title in rla_part2_titles
}

rla_part2_additions = {
    'Reasoning Through Language Arts (RLA) — Main Idea Set 2': [
        rla_question(
            0,
            'The city council’s budget committee recommended restoring library hours that were cut last year. The committee argued that evening hours would give students a safe study space and help job seekers use online applications after work.',
            'What is the main idea of the passage?',
            [
                'Library hours were cut last year and will remain reduced.',
                'The committee wants to restore library hours because extended access benefits students and job seekers.',
                'The council plans to close the library permanently.',
                'Job seekers prefer to work in the evenings.',
            ],
            1,
            [
                'The passage focuses on restoring hours, not keeping them reduced.',
                'Correct. The committee argues that longer hours will help specific groups of patrons.',
                'The passage does not mention closing the library.',
                'Job seekers’ preferences are not discussed.',
            ],
            difficulty='medium',
            qtype='text'
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Main Idea Set 3': [
        rla_question(
            0,
            'An environmental nonprofit launched a campaign to replace aging streetlights with energy-efficient LEDs. The organization estimates the switch will reduce electricity use by 20% and save the city $95,000 annually.',
            'Which sentence best states the main idea of the passage?',
            [
                'The nonprofit is concerned about recycling streetlight parts.',
                'The nonprofit is encouraging the city to adopt LED streetlights to save energy and money.',
                'LED lights are more expensive than traditional bulbs.',
                'The city refuses to change its streetlights.',
            ],
            1,
            [
                'Recycling parts is not mentioned.',
                'Correct. The campaign promotes LED streetlights for efficiency and savings.',
                'The passage does not compare costs.',
                'No resistance from the city is described.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'A health department report explained that installing water bottle filling stations in schools cut plastic bottle purchases by 60%. The report recommends adding the stations to all district buildings.',
            'What is the central idea of the report?',
            [
                'Students dislike drinking fountains.',
                'Water bottle filling stations significantly reduced plastic bottle usage, so the report recommends expanding the program.',
                'Plastic bottles are cheaper than reusable bottles.',
                'The district plans to sell reusable bottles to students.',
            ],
            1,
            [
                'The passage does not discuss student preferences.',
                'Correct. The report highlights reduced plastic use and suggests expanding the stations.',
                'Cost comparisons are not provided.',
                'The report does not mention selling bottles.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'An arts council newsletter features a partnership with local businesses that sponsor free lunchtime concerts downtown. According to the article, foot traffic increased during the performances, boosting sales for nearby restaurants.',
            'What is the main idea of the newsletter article?',
            [
                'The arts council is charging restaurants to host concerts.',
                'Lunchtime concerts supported by businesses draw crowds that benefit nearby restaurants.',
                'Downtown restaurants are closing due to low sales.',
                'The arts council plans to end the concert series.',
            ],
            1,
            [
                'The article describes sponsorship, not fees charged to restaurants.',
                'Correct. The concerts increase foot traffic and help local businesses.',
                'The article indicates sales increased, not decreased.',
                'The series is portrayed as successful, not ending.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'A company memo announces that employees will receive two additional paid volunteer days. Leadership believes the policy will strengthen relationships with local nonprofits and improve employee morale.',
            'Which sentence summarizes the memo?',
            [
                'Employees must volunteer on weekends only.',
                'The company is expanding paid volunteer time to support nonprofits and morale.',
                'Nonprofits are required to sponsor employee events.',
                'The company is canceling its volunteer program.',
            ],
            1,
            [
                'The memo does not limit volunteering to weekends.',
                'Correct. The company adds volunteer days to benefit the community and staff morale.',
                'Nonprofit sponsorships are not mentioned.',
                'The memo expands the program instead of canceling it.',
            ],
            difficulty='easy',
            qtype='text'
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Main Idea Set 4': [
        rla_question(
            0,
            'A statewide broadband initiative laid fiber-optic cable to rural communities. The project’s report notes that 3,200 households gained high-speed access and that small businesses now process online orders without relying on spotty cellular service.',
            'What is the central idea of the report?',
            [
                'Cellular service in rural areas is getting worse.',
                'The initiative expanded high-speed internet to thousands of rural households, improving service for residents and businesses.',
                'Rural residents are canceling their internet service.',
                'The state plans to abandon the broadband initiative.',
            ],
            1,
            [
                'The report addresses improved access, not declining cellular service.',
                'Correct. The report emphasizes expanded access and benefits for residents and businesses.',
                'Residents are gaining access, not canceling it.',
                'The report highlights progress rather than cancellation.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'A hospital bulletin describes a new bedside pharmacy service that delivers prescriptions before patients are discharged. Administrators report that the service reduced readmissions linked to missed medications by 15%.',
            'What is the main idea of the bulletin?',
            [
                'The pharmacy will raise prices on prescriptions.',
                'Delivering prescriptions at the bedside lowered readmissions related to missed medications.',
                'Patients prefer to fill prescriptions at outside pharmacies.',
                'Nurses will no longer review medication instructions with patients.',
            ],
            1,
            [
                'Pricing changes are not mentioned.',
                'Correct. The bulletin explains that bedside delivery reduced readmissions.',
                'Outside pharmacies are not discussed.',
                'The bulletin does not mention nurse responsibilities.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'An economic development report highlights a new apprenticeship program that pairs high school seniors with manufacturing employers. Early data show that 82% of participants accepted full-time positions after graduation.',
            'Which sentence best captures the main idea of the report?',
            [
                'Manufacturing employers are struggling to hire graduates.',
                'The apprenticeship program connects students with manufacturing jobs, leading to high post-graduation employment.',
                'High school seniors are leaving the area after graduation.',
                'The report criticizes manufacturing employers for poor training.',
            ],
            1,
            [
                'The report offers a solution, not just a problem.',
                'Correct. The program helps students secure jobs in manufacturing.',
                'The passage does not mention students leaving.',
                'The report highlights success, not criticism.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'A transportation newsletter details a pilot program allowing bus riders to pay fares with their smartphones. Early adopters say the app shortens boarding times and eliminates the need for exact change.',
            'What is the main idea of the newsletter?',
            [
                'Bus riders are upset about losing paper tickets.',
                'The smartphone fare pilot is making bus boarding faster and more convenient.',
                'The transit agency is raising fares.',
                'Smartphone payments are required for all riders immediately.',
            ],
            1,
            [
                'The newsletter reports positive feedback, not complaints.',
                'Correct. The pilot aims to streamline fare payment and boarding.',
                'Fare increases are not mentioned.',
                'The program is described as a pilot, not a mandatory change for all riders.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'A grant summary explains that community gardens in food deserts now supply 12,000 pounds of produce annually. Volunteers partner with food banks to distribute the harvest to low-income families.',
            'What is the main idea of the grant summary?',
            [
                'Volunteers will sell the produce at farmers markets.',
                'Community gardens are providing significant amounts of produce to families in need.',
                'Food banks have too many volunteers.',
                'Residents dislike working in community gardens.',
            ],
            1,
            [
                'The summary states produce is distributed, not sold.',
                'Correct. The gardens yield large harvests for families facing food insecurity.',
                'Volunteer levels are not addressed.',
                'The summary does not mention resident attitudes.',
            ],
            difficulty='medium',
            qtype='text'
        ),
        rla_question(
            0,
            'A nonprofit update celebrates a partnership with a local college that provides pro bono tax preparation. Last year the program helped 1,400 households claim $2.6 million in refunds.',
            'What is the main idea of the update?',
            [
                'The nonprofit is ending its partnership with the college.',
                'The partnership helps households receive tax refunds by offering free preparation services.',
                'Households must pay for tax preparation services.',
                'Tax refunds are no longer available from the IRS.',
            ],
            1,
            [
                'The partnership is being celebrated, not ended.',
                'Correct. The update highlights free services leading to significant refunds.',
                'The passage emphasizes free services, not paid ones.',
                'IRS refunds are still available.',
            ],
            difficulty='easy',
            qtype='text'
        ),
        rla_question(
            0,
            'A university press release describes installing filtered water stations that prevented 150,000 disposable bottles from entering landfills in one semester. The release encourages students to carry reusable bottles.',
            'What best states the main idea of the press release?',
            [
                'Students are required to purchase bottled water on campus.',
                'Filtered water stations have reduced plastic bottle waste and the university encourages reusable bottles.',
                'The university is closing campus dining halls.',
                'Reusable bottles are not allowed in classrooms.',
            ],
            1,
            [
                'The release promotes reusables, not bottle purchases.',
                'Correct. The main idea is the waste reduction achieved by the stations.',
                'Dining halls are not mentioned.',
                'The release encourages reusable bottles.',
            ],
            difficulty='easy',
            qtype='text'
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Vocabulary in Context Set 3': [
        rla_question(
            0,
            'The governor characterized the plan as “pragmatic,” noting that it prioritizes repairs communities can afford.',
            'In this sentence, what does the word “pragmatic” most nearly mean?',
            [
                'Idealistic',
                'Practical',
                'Expensive',
                'Stubborn',
            ],
            1,
            [
                '“Idealistic” is the opposite of the intended meaning.',
                'Correct. “Pragmatic” means practical or realistic.',
                'Cost is not implied.',
                '“Pragmatic” does not mean stubborn.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'After months of negotiation, the two companies reached an “amicable” agreement.',
            'As used in the sentence, what does “amicable” mean?',
            [
                'Friendly',
                'Complex',
                'Temporary',
                'Secret',
            ],
            0,
            [
                'Correct. “Amicable” describes a friendly or cooperative agreement.',
                '“Complex” does not fit the context.',
                'There is no indication the agreement is temporary.',
                'The agreement is not described as hidden.',
            ],
            difficulty='easy'
        ),
        rla_question(
            0,
            'The manager warned that ignoring the safety checklist would be “perilous” for the crew.',
            'What is the meaning of “perilous” in this context?',
            [
                'Safe',
                'Dangerous',
                'Convenient',
                'Optional',
            ],
            1,
            [
                '“Perilous” is nearly the opposite of safe.',
                'Correct. “Perilous” means dangerous or risky.',
                'Convenience is not mentioned.',
                '“Perilous” does not imply the checklist is optional.',
            ],
            difficulty='medium'
        ),
    ],
    'Reasoning Through Language Arts (RLA) — Vocabulary in Context Set 4': [
        rla_question(
            0,
            'Despite the “austere” budget, the program delivered impressive results.',
            'What does “austere” mean in this sentence?',
            [
                'Strict and limited',
                'Extravagant',
                'Chaotic',
                'Mysterious',
            ],
            0,
            [
                'Correct. “Austere” describes something simple or severely limited.',
                'The sentence implies the opposite of extravagance.',
                '“Chaotic” does not relate to budget size.',
                '“Mysterious” is unrelated to funding.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'The spokesperson said the new regulations were “onerous” for small businesses.',
            'As used here, what does “onerous” mean?',
            [
                'Beneficial',
                'Burdensome',
                'Voluntary',
                'Inexpensive',
            ],
            1,
            [
                '“Onerous” suggests difficulty, not benefit.',
                'Correct. “Onerous” means burdensome or difficult to bear.',
                'The regulations are mandatory, not voluntary.',
                'Cost is not directly referenced.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'The artist’s “idiosyncratic” style quickly became the gallery’s signature look.',
            'What does “idiosyncratic” most nearly mean?',
            [
                'Predictable',
                'Ordinary',
                'Distinctive',
                'Rigid',
            ],
            2,
            [
                'The style is notable, not predictable.',
                '“Idiosyncratic” means unique or distinctive.',
                'Correct. The gallery became known for the artist’s distinctive style.',
                'Rigidity is not implied.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'The board praised the CEO’s “alacrity” in addressing the data breach.',
            'What is the meaning of “alacrity” in this context?',
            [
                'Caution',
                'Reluctance',
                'Speed and enthusiasm',
                'Disappointment',
            ],
            2,
            [
                '“Alacrity” implies quick, eager action.',
                'Reluctance is the opposite of alacrity.',
                'Correct. “Alacrity” means prompt and eager responsiveness.',
                'Disappointment is unrelated.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'Council members deemed the report “incendiary,” warning that its language could inflame tensions.',
            'What does “incendiary” mean in this sentence?',
            [
                'Calming',
                'Divisive',
                'Lengthy',
                'Private',
            ],
            1,
            [
                'The passage says the language could inflame tensions, the opposite of calming.',
                'Correct. “Incendiary” describes language likely to provoke conflict.',
                'Length is not implied.',
                'Privacy is unrelated.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'The committee called the proposal “untenable” given the current budget constraints.',
            'As used in the sentence, what does “untenable” mean?',
            [
                'Impossible to maintain',
                'Easy to understand',
                'Highly profitable',
                'Widely popular',
            ],
            0,
            [
                'Correct. “Untenable” means unsustainable or impossible to support.',
                'Comprehension is not the issue.',
                'Profitability is not mentioned.',
                'Popularity is not addressed.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'The mayor described the transit expansion as a “nascent” project awaiting community feedback.',
            'What does “nascent” suggest about the project?',
            [
                'It is in its early stages.',
                'It has been operating for years.',
                'It is failing.',
                'It is unnecessary.',
            ],
            0,
            [
                'Correct. “Nascent” means newly formed or beginning.',
                'The word implies the opposite of long-standing.',
                'Nothing indicates failure.',
                'The sentence does not comment on necessity.',
            ],
            difficulty='easy'
        ),
        rla_question(
            0,
            'The director’s “equivocal” response left the staff unsure whether the project would continue.',
            'In this context, “equivocal” most nearly means:',
            [
                'Clear',
                'Vague',
                'Excited',
                'Supportive',
            ],
            1,
            [
                'The response did not offer clarity.',
                'Correct. “Equivocal” means ambiguous or unclear.',
                'Excitement is not suggested.',
                'Support is not implied.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'The community praised the volunteer’s “indefatigable” efforts during the storm cleanup.',
            'What is the meaning of “indefatigable”?',
            [
                'Easily discouraged',
                'Tireless',
                'Reluctant',
                'Untrained',
            ],
            1,
            [
                'The word implies stamina, not discouragement.',
                'Correct. “Indefatigable” means tireless or persistent.',
                'Reluctance is not conveyed.',
                'Training is not addressed.',
            ],
            difficulty='medium'
        ),
        rla_question(
            0,
            'The speaker’s “succinct” closing remarks captured the audience’s attention.',
            'What does “succinct” mean as used here?',
            [
                'Brief and to the point',
                'Confusing',
                'Lengthy',
                'Humorous',
            ],
            0,
            [
                'Correct. “Succinct” means concise.',
                'Confusion is not implied.',
                'The passage suggests the remarks were concise, not long.',
                'Humor is not mentioned.',
            ],
            difficulty='easy'
        ),
    ],
}

for title, questions in rla_part2_canon.items():
    extras = rla_part2_additions.get(title, [])
    combined = questions + extras
    if len(combined) < 12:
        raise RuntimeError(f'Not enough vetted questions for {title}')
    rla_part2_canon[title] = renumber_questions(combined[:12])

for category in rla_part2['categories'].values():
    for topic in category['topics']:
        quizzes = topic['quizzes']
        for title, questions in rla_part2_canon.items():
            replace_questions(quizzes, title, questions)

for category in rla_part2['categories'].values():
    sync_sets_with_quizzes(category)

# Persist RLA Part 2 updates
save_quiz_file('rla.quizzes.part2.json', rla_part2)
