import json
import random
from pathlib import Path
from copy import deepcopy

# Try to import a larger shared question bank if present
try:
    from scripts.question_bank import (
        GRAMMAR_QUESTIONS as EXT_GRAMMAR,
        MAIN_IDEA_QUESTIONS as EXT_MAIN_IDEA,
        INFERENCE_QUESTIONS as EXT_INFERENCE,
        EVIDENCE_QUESTIONS as EXT_EVIDENCE,
        VOCABULARY_QUESTIONS as EXT_VOCAB,
    )
except Exception:
    EXT_GRAMMAR = []
    EXT_MAIN_IDEA = []
    EXT_INFERENCE = []
    EXT_EVIDENCE = []
    EXT_VOCAB = []

# Question banks for different topic types
# Baseline banks (augmented by any external banks if available)
GRAMMAR_QUESTIONS = [
    {
        "passage": "The committee have reviewed all the proposals and selected three finalists. The decision was unanimous, and we plan to announce the winners next week.",
        "question": "Which correction should be made to improve the grammar in this passage?",
        "options": [
            ("Change 'have reviewed' to 'has reviewed'", True, "Correct. 'Committee' is a singular collective noun and requires the singular verb 'has'."),
            ("Change 'selected' to 'selecting'", False, "This would create incorrect tense inconsistency."),
            ("Change 'was' to 'were'", False, "The decision is singular, so 'was' is correct."),
            ("Change 'plan' to 'plans'", False, "The subject 'we' correctly takes the plural verb 'plan'.")
        ]
    },
    {
        "passage": "Between you and I, this project is going to require more time than we originally thought.",
        "question": "What correction should be made to this sentence?",
        "options": [
            ("Change 'Between you and I' to 'Between you and me'", True, "Correct. After the preposition 'between', the object pronoun 'me' should be used, not the subject pronoun 'I'."),
            ("Change 'is going' to 'are going'", False, "'Project' is singular and correctly takes 'is'."),
            ("Change 'we' to 'us'", False, "'We' is the subject and is used correctly."),
            ("Change 'thought' to 'think'", False, "The past tense 'thought' is appropriate here.")
        ]
    },
    {
        "passage": "Maria works hard every day, studies diligently, and she is volunteering at the local shelter on weekends.",
        "question": "How should this sentence be revised for parallel structure?",
        "options": [
            ("Change 'she is volunteering' to 'volunteers'", True, "Correct. This creates parallel structure with 'works' and 'studies'."),
            ("Change 'works' to 'is working'", False, "This doesn't solve the parallel structure issue."),
            ("Remove 'diligently'", False, "Removing the adverb doesn't address the structural problem."),
            ("Add 'she' before 'studies'", False, "This would make the sentence more wordy without fixing the parallel structure.")
        ]
    },
    {
        "passage": "The manager asked that each employee submit their report by Friday afternoon.",
        "question": "Which revision corrects the pronoun-antecedent agreement?",
        "options": [
            ("Change 'their' to 'his or her'", True, "Correct. 'Each employee' is singular and requires a singular pronoun."),
            ("Change 'asked' to 'asks'", False, "The past tense is appropriate in context."),
            ("Change 'submit' to 'submits'", False, "After 'asked that', the subjunctive 'submit' is correct."),
            ("Change 'employee' to 'employees'", False, "'Each employee' is correct and singular.")
        ]
    },
    {
        "passage": "Having finished the assignment early, the rest of the afternoon was spent relaxing by the pool.",
        "question": "How should this sentence be revised to correct the dangling modifier?",
        "options": [
            ("Having finished the assignment early, she spent the rest of the afternoon relaxing by the pool.", True, "Correct. This revision clearly identifies who finished the assignment."),
            ("The assignment having been finished early, the rest of the afternoon was spent relaxing.", False, "This still doesn't clearly identify the subject."),
            ("The afternoon was spent relaxing by the pool after finishing the assignment early.", False, "While better, this is passive and less clear than the correct answer."),
            ("Having finished the assignment, relaxing by the pool was done in the afternoon.", False, "This still has modifier issues and is awkwardly constructed.")
        ]
    },
    {
        "passage": "The documentary was both informative and it entertained viewers with compelling stories.",
        "question": "How should this sentence be revised for better clarity and parallel structure?",
        "options": [
            ("The documentary was both informative and entertaining.", True, "Correct. This creates parallel structure using two adjectives."),
            ("The documentary both informed and it entertained viewers.", False, "This still lacks parallel structure."),
            ("The documentary was informative and viewers were entertained.", False, "This changes the sentence structure but doesn't improve parallelism."),
            ("Both the documentary informed and entertained viewers.", False, "This is grammatically awkward.")
        ]
    },
    {
        "passage": "Neither the supervisor nor the employees was aware of the policy change until the memo arrived.",
        "question": "What correction should be made to this sentence?",
        "options": [
            ("Change 'was' to 'were'", True, "Correct. With 'neither...nor', the verb agrees with the closer subject 'employees', which is plural."),
            ("Change 'arrived' to 'arrives'", False, "The past tense is appropriate."),
            ("Change 'Neither' to 'Either'", False, "This changes the meaning of the sentence."),
            ("Change 'nor' to 'or'", False, "'Neither...nor' is the correct correlative conjunction pair.")
        ]
    },
    {
        "passage": "The report, which was submitted last week, contains several errors that needs to be corrected before publication.",
        "question": "Which correction is needed in this sentence?",
        "options": [
            ("Change 'needs' to 'need'", True, "Correct. The subject 'errors' is plural and requires the plural verb 'need'."),
            ("Remove the comma after 'report'", False, "The comma is correct for setting off the nonessential clause."),
            ("Change 'which' to 'that'", False, "'Which' is appropriate for a nonessential clause."),
            ("Change 'submitted' to 'submitting'", False, "The past participle is correct here.")
        ]
    },
    {
        "passage": "When writing a professional email it's important to proofread carefully and maintain a courteous tone.",
        "question": "How should this sentence be punctuated correctly?",
        "options": [
            ("Add a comma after 'email'", True, "Correct. An introductory dependent clause should be followed by a comma."),
            ("Change 'it's' to 'its'", False, "'It's' (it is) is correct here; 'its' is possessive."),
            ("Add a semicolon after 'carefully'", False, "A semicolon would be incorrect; 'and' properly connects the verbs."),
            ("Remove the comma before 'and'", False, "There is no comma before 'and' in the original sentence.")
        ]
    },
    {
        "passage": "The team has worked together for five years and they have developed an efficient workflow.",
        "question": "How can these two clauses be most effectively combined?",
        "options": [
            ("The team has worked together for five years, developing an efficient workflow.", True, "Correct. This creates a more concise sentence using a participial phrase."),
            ("The team has worked together for five years; they have developed an efficient workflow.", False, "While grammatically correct, it's less concise."),
            ("The team worked together and developed a workflow for five years.", False, "This changes the meaning of the sentence."),
            ("Working together for five years, an efficient workflow was developed by the team.", False, "This creates a dangling modifier and uses awkward passive voice.")
        ]
    }
]

# Supplement baseline with external banks (if any)
if EXT_GRAMMAR:
    GRAMMAR_QUESTIONS.extend([q for q in EXT_GRAMMAR if q not in GRAMMAR_QUESTIONS])

MAIN_IDEA_QUESTIONS = [
    {
        "passage": "Recent advances in solar panel technology have made renewable energy more accessible to homeowners. Modern panels are more efficient, converting up to 22% of sunlight into electricity, compared to just 15% a decade ago. Additionally, installation costs have dropped by nearly 70% since 2010. Many states now offer tax incentives and rebate programs to encourage adoption. As a result, residential solar installations have increased by 35% annually over the past five years.",
        "question": "What is the main idea of this passage?",
        "difficulty": "easy",
        "options": [
            ("Improvements in technology and lower costs have made solar energy more accessible to homeowners.", True, "Correct. This captures both the technological advances and cost reductions that are the focus of the passage."),
            ("Solar panels can convert 22% of sunlight into electricity.", False, "This is a supporting detail about efficiency, not the main idea."),
            ("States offer tax incentives for solar panel installation.", False, "This is one supporting detail, not the central point."),
            ("Residential solar installations have increased by 35% annually.", False, "This is a result of the main idea, not the main idea itself.")
        ]
    },
    {
        "passage": "Community gardens provide numerous benefits to urban neighborhoods. They transform vacant lots into productive green spaces where residents can grow fresh vegetables and flowers. These gardens also serve as gathering places that strengthen community bonds and reduce social isolation. Studies show that neighborhoods with community gardens experience less crime and improved property values. Furthermore, they offer educational opportunities for children to learn about nutrition and environmental stewardship.",
        "question": "Which sentence best expresses the central message of this passage?",
        "difficulty": "easy",
        "options": [
            ("Community gardens offer multiple social, economic, and educational benefits to urban areas.", True, "Correct. This encompasses the various benefits described throughout the passage."),
            ("Community gardens transform vacant lots into productive spaces.", False, "This describes one aspect but not the comprehensive benefits discussed."),
            ("Children can learn about nutrition in community gardens.", False, "This is one specific benefit, not the overall main idea."),
            ("Community gardens reduce crime in neighborhoods.", False, "This is one supporting detail, not the central message.")
        ]
    },
    {
        "passage": "Employers increasingly value soft skills such as communication, teamwork, and adaptability alongside technical expertise. While technical knowledge remains important, the ability to collaborate effectively and navigate changing work environments has become essential. Many companies now incorporate behavioral interviews and team-based assessments into their hiring processes. Professional development programs often focus on building these interpersonal competencies. In today's dynamic workplace, success requires both specialized knowledge and strong people skills.",
        "question": "What main point is the author making?",
        "difficulty": "medium",
        "options": [
            ("Modern employers value both technical skills and soft skills like communication and adaptability.", True, "Correct. The passage emphasizes the importance of combining technical and interpersonal skills."),
            ("Companies use behavioral interviews in hiring.", False, "This is a supporting detail about hiring practices."),
            ("Professional development programs focus on interpersonal skills.", False, "This is one example, not the main point."),
            ("Technical knowledge is no longer important in the workplace.", False, "The passage states technical knowledge remains important.")
        ]
    }
]
if EXT_MAIN_IDEA:
    MAIN_IDEA_QUESTIONS.extend([q for q in EXT_MAIN_IDEA if q not in MAIN_IDEA_QUESTIONS])

INFERENCE_QUESTIONS = [
    {
        "passage": "Dr. Chen closed her notebook with unusual abruptness and glanced at the clock for the third time in five minutes. 'I think we've covered enough for today,' she said, though they were only twenty minutes into the scheduled hour. She stood and walked to the window, her arms crossed tightly.",
        "question": "What can be inferred about Dr. Chen's state of mind?",
        "difficulty": "medium",
        "options": [
            ("She is distracted or uncomfortable and wants to end the session early.", True, "Correct. Her actions—closing the notebook abruptly, checking the clock repeatedly, and ending early—suggest discomfort."),
            ("She is pleased with how the session is progressing.", False, "Her behavior suggests the opposite."),
            ("She is running late for another appointment.", False, "While she checks the clock, nothing explicitly indicates another appointment."),
            ("She is bored with routine work.", False, "The passage suggests something more immediate is bothering her.")
        ]
    },
    {
        "passage": "The advertisement features a pristine kitchen with marble countertops and state-of-the-art appliances. A family laughs together while preparing dinner. The tagline reads: 'Where memories are made.' The price and specifications appear in small print at the bottom.",
        "question": "What can be inferred about the advertisement's strategy?",
        "difficulty": "medium",
        "options": [
            ("It emphasizes emotional appeal over practical details.", True, "Correct. The focus on family and memories, with pricing downplayed, indicates an emotional strategy."),
            ("It targets only wealthy customers.", False, "While it shows luxury, the strategy is about emotion, not exclusivity."),
            ("It provides comprehensive product information.", False, "Specifications are minimized in the ad."),
            ("It discourages potential buyers with high prices.", False, "The price is de-emphasized, not prominently displayed.")
        ]
    },
    {
        "passage": "After reading the rejection letter, Marcus crumpled it slowly, then smoothed it out again and placed it in a folder labeled 'Attempts.' He opened his laptop and began searching for similar opportunities, his jaw set with determination.",
        "question": "What does Marcus's response suggest about his character?",
        "difficulty": "medium",
        "options": [
            ("He is resilient and committed to pursuing his goals despite setbacks.", True, "Correct. Saving the letter and immediately continuing his search shows determination."),
            ("He is defeated and ready to give up.", False, "His immediate return to searching contradicts this."),
            ("He is angry and bitter about the rejection.", False, "While he may be disappointed, his actions show forward movement."),
            ("He doesn't care about the rejection.", False, "Crumpling the letter shows he cares, but he perseveres anyway.")
        ]
    }
]
if EXT_INFERENCE:
    INFERENCE_QUESTIONS.extend([q for q in EXT_INFERENCE if q not in INFERENCE_QUESTIONS])

EVIDENCE_QUESTIONS = [
    {
        "passage": "Urban planners advocate for increased green spaces in cities. Parks and tree-lined streets reduce air pollution by filtering particulates and absorbing carbon dioxide. A 2022 study found that neighborhoods with more tree coverage had 25% lower rates of respiratory illnesses. Green spaces also reduce urban heat island effects, with tree-shaded areas measuring up to 10 degrees cooler than nearby concrete surfaces. Additionally, residents living within walking distance of parks report 18% higher life satisfaction scores.",
        "question": "Which evidence best supports the claim that urban green spaces improve public health?",
        "difficulty": "medium",
        "options": [
            ("Neighborhoods with more trees had 25% lower rates of respiratory illnesses.", True, "Correct. This directly links green spaces to measurable health outcomes."),
            ("Tree-shaded areas are 10 degrees cooler than concrete.", False, "This shows temperature effects, but doesn't directly address health."),
            ("Residents near parks report higher life satisfaction.", False, "While related to well-being, this is more about satisfaction than physical health."),
            ("Parks and trees filter particulates and absorb carbon dioxide.", False, "This describes the mechanism but doesn't provide outcome data.")
        ]
    },
    {
        "passage": "The principal argues that extending the school day by 30 minutes would improve academic performance. She notes that students currently spend less time in school than their international peers. However, recent research shows that simply adding instructional time without changing teaching methods yields minimal gains. The study found that quality of instruction and student engagement matter more than quantity of hours. Schools that improved teaching strategies saw achievement gains even without additional time.",
        "question": "Which detail best contradicts the principal's proposal?",
        "difficulty": "medium",
        "options": [
            ("Research shows that adding time without improving instruction yields minimal gains.", True, "Correct. This directly challenges the effectiveness of simply extending the school day."),
            ("Students spend less time in school than international peers.", False, "This supports the principal's argument."),
            ("Quality of instruction matters more than quantity of hours.", False, "While true, this doesn't directly address the time extension proposal."),
            ("Some schools improved achievement without adding time.", False, "This is relevant but less direct than showing extended time doesn't work.")
        ]
    }
]
if EXT_EVIDENCE:
    EVIDENCE_QUESTIONS.extend([q for q in EXT_EVIDENCE if q not in EVIDENCE_QUESTIONS])

VOCABULARY_QUESTIONS = [
    {
        "passage": "The scientist's hypothesis was corroborated by multiple independent studies, each reaching similar conclusions through different methodologies.",
        "question": "What does 'corroborated' mean in this context?",
        "difficulty": "medium",
        "options": [
            ("Confirmed or supported", True, "Correct. The passage indicates the hypothesis was supported by additional studies."),
            ("Contradicted", False, "This is opposite of the intended meaning."),
            ("Ignored", False, "The studies engaged with the hypothesis."),
            ("Created", False, "The hypothesis existed before the studies corroborated it.")
        ]
    },
    {
        "passage": "The committee's decision was met with unanimous approval; every single member voted in favor of the proposal without a single dissenting voice.",
        "question": "What does 'unanimous' mean in this passage?",
        "difficulty": "easy",
        "options": [
            ("Complete agreement by all", True, "Correct. The context shows that everyone agreed without exception."),
            ("Majority agreement", False, "'Unanimous' means all, not just most."),
            ("Partial support", False, "The passage indicates complete support."),
            ("Reluctant acceptance", False, "Nothing suggests reluctance.")
        ]
    },
    {
        "passage": "Despite the contentious nature of the debate, both candidates maintained a civil discourse, addressing each other respectfully even when disagreeing strongly.",
        "question": "What does 'contentious' mean in this context?",
        "difficulty": "medium",
        "options": [
            ("Controversial or causing disagreement", True, "Correct. The context shows the debate involved strong disagreement despite civil behavior."),
            ("Boring or uninteresting", False, "Strong disagreement suggests the opposite."),
            ("Friendly", False, "The need to note civility despite contention suggests otherwise."),
            ("Brief", False, "Nothing in the context relates to duration.")
        ]
    }
]
if EXT_VOCAB:
    VOCABULARY_QUESTIONS.extend([q for q in EXT_VOCAB if q not in VOCABULARY_QUESTIONS])

# -----------------------
# Uniqueness helpers
# -----------------------
NAME_POOL = [
    "Alex", "Jordan", "Taylor", "Casey", "Morgan", "Jamie", "Riley", "Cameron", "Dana", "Quinn",
    "Avery", "Hayden", "Rowan", "Parker", "Kendall", "Reese", "Skyler", "Devin", "Emerson", "Sage",
]

REPLACEABLE_NAMES = [
    "Maria", "John", "Sarah", "Marcus", "Dr. Chen", "Chen", "She", "He"
]

TOPIC_NOUN_POOL = [
    "project", "assignment", "report", "proposal", "presentation", "analysis", "brief", "memo", "summary", "draft"
]

def make_unique_text(text: str) -> str:
    """Create a light-weight variant by swapping common names and neutral nouns.
    Keeps grammar logic intact while reducing duplication across quizzes."""
    if not isinstance(text, str):
        return text
    new_text = text
    # Replace names
    if any(name in new_text for name in REPLACEABLE_NAMES):
        rand_name = random.choice(NAME_POOL)
        for n in REPLACEABLE_NAMES:
            new_text = new_text.replace(n, rand_name)
    # Replace a generic topic noun if present
    for noun in TOPIC_NOUN_POOL:
        if noun in new_text:
            alt = random.choice([n for n in TOPIC_NOUN_POOL if n != noun])
            new_text = new_text.replace(noun, alt)
            break
    return new_text

def uniquify_question(q: dict, max_tries: int = 5) -> dict:
    """Return a shallow-variant of a question to help ensure uniqueness."""
    for _ in range(max_tries):
        nq = deepcopy(q)
        if 'passage' in nq:
            nq['passage'] = make_unique_text(nq['passage'])
        nq['question'] = make_unique_text(nq['question'])
        for opt in nq.get('answerOptions', []):
            opt['text'] = make_unique_text(opt['text'])
            opt['rationale'] = make_unique_text(opt.get('rationale', ''))
        sig = question_signature(nq)
        if sig not in GLOBAL_SIGNATURES:
            return nq
    return nq

def question_signature(q: dict) -> str:
    base = (q.get('passage', '') + '|' + q.get('question', ''))
    return base.strip().lower()

GLOBAL_SIGNATURES: set[str] = set()

def generate_grammar_question(question_num, difficulty, used_indices):
    """Generate a unique grammar question"""
    available = [i for i in range(len(GRAMMAR_QUESTIONS)) if i not in used_indices]
    if not available:
        # If we've used all questions, start over with modifications
        available = list(range(len(GRAMMAR_QUESTIONS)))
    
    idx = random.choice(available)
    used_indices.add(idx)
    
    q = GRAMMAR_QUESTIONS[idx]
    new_q = {
        "questionNumber": question_num,
        "type": "multipleChoice",
        "difficulty": difficulty,
        "passage": q["passage"],
        "question": q["question"],
        "answerOptions": [
            {
                "text": opt[0],
                "isCorrect": opt[1],
                "rationale": opt[2]
            }
            for opt in q["options"]
        ]
    }
    new_q = uniquify_question(new_q)
    GLOBAL_SIGNATURES.add(question_signature(new_q))
    return new_q

def generate_main_idea_question(question_num, difficulty, used_indices):
    """Generate a unique main idea question"""
    available = [i for i in range(len(MAIN_IDEA_QUESTIONS)) if i not in used_indices]
    if not available:
        available = list(range(len(MAIN_IDEA_QUESTIONS)))
    
    idx = random.choice(available)
    used_indices.add(idx)
    
    q = MAIN_IDEA_QUESTIONS[idx]
    new_q = {
        "questionNumber": question_num,
        "type": "multipleChoice",
        "difficulty": q["difficulty"],
        "passage": q["passage"],
        "question": q["question"],
        "answerOptions": [
            {
                "text": opt[0],
                "isCorrect": opt[1],
                "rationale": opt[2]
            }
            for opt in q["options"]
        ]
    }
    new_q = uniquify_question(new_q)
    GLOBAL_SIGNATURES.add(question_signature(new_q))
    return new_q

def generate_inference_question(question_num, difficulty, used_indices):
    """Generate a unique inference question"""
    available = [i for i in range(len(INFERENCE_QUESTIONS)) if i not in used_indices]
    if not available:
        available = list(range(len(INFERENCE_QUESTIONS)))
    
    idx = random.choice(available)
    used_indices.add(idx)
    
    q = INFERENCE_QUESTIONS[idx]
    new_q = {
        "questionNumber": question_num,
        "type": "multipleChoice",
        "difficulty": q["difficulty"],
        "passage": q["passage"],
        "question": q["question"],
        "answerOptions": [
            {
                "text": opt[0],
                "isCorrect": opt[1],
                "rationale": opt[2]
            }
            for opt in q["options"]
        ]
    }
    new_q = uniquify_question(new_q)
    GLOBAL_SIGNATURES.add(question_signature(new_q))
    return new_q

def generate_evidence_question(question_num, difficulty, used_indices):
    """Generate a unique evidence question"""
    available = [i for i in range(len(EVIDENCE_QUESTIONS)) if i not in used_indices]
    if not available:
        available = list(range(len(EVIDENCE_QUESTIONS)))
    
    idx = random.choice(available)
    used_indices.add(idx)
    
    q = EVIDENCE_QUESTIONS[idx]
    new_q = {
        "questionNumber": question_num,
        "type": "multipleChoice",
        "difficulty": q["difficulty"],
        "passage": q["passage"],
        "question": q["question"],
        "answerOptions": [
            {
                "text": opt[0],
                "isCorrect": opt[1],
                "rationale": opt[2]
            }
            for opt in q["options"]
        ]
    }
    new_q = uniquify_question(new_q)
    GLOBAL_SIGNATURES.add(question_signature(new_q))
    return new_q

def generate_vocabulary_question(question_num, difficulty, used_indices):
    """Generate a unique vocabulary question"""
    available = [i for i in range(len(VOCABULARY_QUESTIONS)) if i not in used_indices]
    if not available:
        available = list(range(len(VOCABULARY_QUESTIONS)))
    
    idx = random.choice(available)
    used_indices.add(idx)
    
    q = VOCABULARY_QUESTIONS[idx]
    new_q = {
        "questionNumber": question_num,
        "type": "multipleChoice",
        "difficulty": q["difficulty"],
        "passage": q["passage"],
        "question": q["question"],
        "answerOptions": [
            {
                "text": opt[0],
                "isCorrect": opt[1],
                "rationale": opt[2]
            }
            for opt in q["options"]
        ]
    }
    new_q = uniquify_question(new_q)
    GLOBAL_SIGNATURES.add(question_signature(new_q))
    return new_q

def get_question_generator(topic_id):
    """Return appropriate question generator based on topic"""
    if 'grammar' in topic_id.lower():
        return generate_grammar_question
    elif 'main_idea' in topic_id.lower() or 'info_main' in topic_id.lower():
        return generate_main_idea_question
    elif 'inference' in topic_id.lower():
        return generate_inference_question
    elif 'evidence' in topic_id.lower():
        return generate_evidence_question
    elif 'vocabulary' in topic_id.lower():
        return generate_vocabulary_question
    else:
        # Default to grammar for unknown types
        return generate_grammar_question

def is_placeholder_question(question):
    """Check if a question is a placeholder"""
    qtext = question.get('question', '').lower()
    if 'practice placeholder' in qtext:
        return True
    if 'which option best reflects standard reading comprehension' in qtext:
        return True
    for option in question.get('answerOptions', []):
        if 'practice placeholder' in option.get('text', '').lower():
            return True
    if 'practice placeholder' in question.get('explanation', '').lower():
        return True
    # Autogenerated flag
    if question.get('__autogen'):
        return True
    return False

def fix_placeholders_in_file(filepath):
    """Replace all placeholder questions in a file"""
    print(f"\nProcessing: {filepath.name}")
    print("=" * 80)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    total_replaced = 0
    
    if 'categories' not in data:
        print("No categories found")
        return 0
    
    def traverse_topic(topic_obj, topic_id):
        """Recursively find all quiz-like dicts containing 'questions' lists and replace placeholders."""
        nonlocal total_replaced

        if isinstance(topic_obj, list):
            for item in topic_obj:
                traverse_topic(item, topic_id)
            return
        if not isinstance(topic_obj, dict):
            return

        # If this object looks like a quiz (has questions list of dicts)
        if 'questions' in topic_obj and isinstance(topic_obj['questions'], list):
            if topic_obj['questions'] and isinstance(topic_obj['questions'][0], dict):
                quiz_id = topic_obj.get('quizId', topic_obj.get('title', 'unnamed_quiz'))
                placeholder_count = sum(1 for q in topic_obj['questions'] if is_placeholder_question(q))
                if placeholder_count:
                    print(f"\n  Topic: {topic_id}")
                    print(f"  Quiz: {quiz_id}")
                    print(f"  Replacing {placeholder_count} placeholder questions...")
                    generator = get_question_generator(topic_id)
                    used_indices = set()
                    for i, question in enumerate(topic_obj['questions']):
                        if is_placeholder_question(question):
                            qnum = question.get('questionNumber', i + 1)
                            if qnum <= 4:
                                difficulty = 'easy'
                            elif qnum <= 8:
                                difficulty = 'medium'
                            else:
                                difficulty = 'hard'
                            new_question = generator(qnum, difficulty, used_indices)
                            topic_obj['questions'][i] = new_question
                            total_replaced += 1
                    print(f"  ✓ Replaced {placeholder_count} questions")

        # Recurse into nested dict/list values
        for k, v in topic_obj.items():
            if k == 'questions':
                continue
            if isinstance(v, (dict, list)):
                traverse_topic(v, topic_id)

    for category_name, category_data in data['categories'].items():
        topics = category_data.get('topics', [])
        for topic in topics:
            topic_id = topic.get('id', topic.get('title', category_name))
            traverse_topic(topic, topic_id)
        
        # Check for 'sets' at the category level (sibling of 'topics')
        if 'sets' in category_data and isinstance(category_data['sets'], dict):
            for set_name, set_quizzes in category_data['sets'].items():
                # Use category name as topic_id for sets
                traverse_topic(set_quizzes, f"{category_name}_{set_name}")
    
    # Save the updated file
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Total replacements in {filepath.name}: {total_replaced}")
    return total_replaced

def main():
    print("=" * 80)
    print("RLA PLACEHOLDER QUESTION REPLACEMENT")
    print("=" * 80)
    
    public_dir = Path(r"c:\Users\Zacha\Ged-Website\public\quizzes")
    files = ["rla.quizzes.part1.json", "rla.quizzes.part2.json"]
    
    total_replaced = 0
    for filename in files:
        filepath = public_dir / filename
        if filepath.exists():
            replaced = fix_placeholders_in_file(filepath)
            total_replaced += replaced
    
    print("\n" + "=" * 80)
    print(f"COMPLETE! Total questions replaced: {total_replaced}")
    print("=" * 80)

if __name__ == "__main__":
    main()
