#!/usr/bin/env python3
"""
Phase 3: Add image-based questions to Science and Social Studies quizzes
"""

import json
import os

QUIZ_DIR = r"c:\Users\Zacha\Ged-Website\public\quizzes"

# Template image-based questions for each subject
SCIENCE_NEW_QUESTIONS = [
    {
        "questionNumber": 9999,  # Will be replaced
        "type": "image",
        "stimulusImage": {
            "src": "/Images/Science/dominance-genetics_6af480bd.png",
            "alt": "Diagram showing dominant and recessive trait inheritance",
            "width": 600,
            "height": 400
        },
        "question": "Based on the diagram showing dominant and recessive traits, what is the predicted phenotype ratio for offspring from two heterozygous parents?",
        "answerOptions": [
            {
                "text": "1:1 (50% dominant, 50% recessive)",
                "rationale": "This ratio occurs when crossing homozygous and heterozygous parents.",
                "isCorrect": False
            },
            {
                "text": "3:1 (75% dominant, 25% recessive)",
                "rationale": "Correct. Two heterozygous parents produce this classic Mendelian ratio.",
                "isCorrect": True
            },
            {
                "text": "1:2:1 (genotype ratio)",
                "rationale": "This is the genotype ratio, not the phenotype ratio.",
                "isCorrect": False
            },
            {
                "text": "All dominant phenotypes",
                "rationale": "This would only occur if at least one parent was homozygous dominant.",
                "isCorrect": False
            }
        ],
        "uam": "SCI_P1_Q9999_IMG"
    },
    {
        "questionNumber": 9999,
        "type": "image",
        "stimulusImage": {
            "src": "/Images/Science/after-historic-hurricanes-eta-and-iota-nasa-helps-prep-central-america-for-disas_87ff460e.png",
            "alt": "Satellite image of hurricane formation and weather patterns",
            "width": 600,
            "height": 400
        },
        "question": "Using the satellite image of hurricane formation, which atmospheric condition is most critical for hurricane intensification?",
        "answerOptions": [
            {
                "text": "Low ocean water temperature",
                "rationale": "Hurricanes require warm ocean water (at least 26.5°C) to form and intensify.",
                "isCorrect": False
            },
            {
                "text": "High ocean water temperature and low wind shear",
                "rationale": "Correct. Both conditions are necessary for a hurricane to strengthen and maintain organization.",
                "isCorrect": True
            },
            {
                "text": "High atmospheric pressure at sea level",
                "rationale": "Hurricanes form in areas of low pressure, not high pressure.",
                "isCorrect": False
            },
            {
                "text": "Proximity to the equator only",
                "rationale": "While location matters, the atmospheric and oceanic conditions are more critical.",
                "isCorrect": False
            }
        ],
        "uam": "SCI_P1_Q9999_IMG"
    },
    {
        "questionNumber": 9999,
        "type": "image",
        "stimulusImage": {
            "src": "/Images/Science/human-anatomy_45f268d6.png",
            "alt": "Diagram of human body organ systems and anatomical structure",
            "width": 600,
            "height": 400
        },
        "question": "Based on the anatomical diagram, identify which system is responsible for coordinating and controlling the body's responses to internal and external stimuli.",
        "answerOptions": [
            {
                "text": "The digestive system",
                "rationale": "The digestive system processes food, not coordinates body responses.",
                "isCorrect": False
            },
            {
                "text": "The nervous and endocrine systems",
                "rationale": "Correct. These systems work together to sense stimuli and coordinate body responses.",
                "isCorrect": True
            },
            {
                "text": "The skeletal system",
                "rationale": "The skeletal system provides structure and support, but not control.",
                "isCorrect": False
            },
            {
                "text": "The circulatory system",
                "rationale": "The circulatory system transports materials but doesn't coordinate responses.",
                "isCorrect": False
            }
        ],
        "uam": "SCI_P1_Q9999_IMG"
    }
]

SOCIAL_STUDIES_NEW_QUESTIONS = [
    {
        "questionNumber": 9999,
        "type": "multiple-choice-text",
        "content": {
            "passage": "The territorial expansion of the United States was driven by the concept of Manifest Destiny, the belief that American expansion across the continent was justified and inevitable.",
            "stimulusImage": {
                "src": "/Images/Social Studies/territorial-evolution-of-the-united-states_0037a8d3.png",
                "alt": "Map showing territorial expansion of the United States over time"
            },
            "questionText": "According to the map showing U.S. territorial expansion, which period saw the most significant westward growth of the nation?"
        },
        "answerOptions": [
            {
                "text": "1783-1803 (Original states to Louisiana Purchase)",
                "rationale": "The Louisiana Purchase doubled the size of the nation, representing the most significant single expansion.",
                "isCorrect": True
            },
            {
                "text": "1812-1848 (War of 1812 to Mexican-American War)",
                "rationale": "While this period included westward expansion, it was less dramatic than the Louisiana Purchase.",
                "isCorrect": False
            },
            {
                "text": "1865-1890 (Post-Civil War to 1890)",
                "rationale": "Expansion during this period was minimal; most territorial expansion had already occurred.",
                "isCorrect": False
            },
            {
                "text": "1754-1783 (French and Indian War to Independence)",
                "rationale": "The colonies were still under British rule or had just gained independence; expansion was limited.",
                "isCorrect": False
            }
        ],
        "uam": "SS_P1_Q9999_IMG"
    },
    {
        "questionNumber": 9999,
        "type": "multiple-choice-text",
        "content": {
            "passage": "Political cartoons have long been used as a medium for social and political commentary, reflecting the concerns and attitudes of specific historical periods.",
            "stimulusImage": {
                "src": "/Images/Social Studies/political-cartoon_090c22af.png",
                "alt": "Political cartoon depicting social or political commentary from a historical period"
            },
            "questionText": "What message does this political cartoon convey about the historical or political situation it addresses?"
        },
        "answerOptions": [
            {
                "text": "Support for government policy",
                "rationale": "Political cartoons typically critique rather than support policies.",
                "isCorrect": False
            },
            {
                "text": "Social satire and criticism of powerful institutions or figures",
                "rationale": "Correct. Political cartoons use humor and satire to criticize policies and power structures.",
                "isCorrect": True
            },
            {
                "text": "Documentation of historical events without commentary",
                "rationale": "Cartoons are interpretive works, not merely documentary.",
                "isCorrect": False
            },
            {
                "text": "Entertainment with no political significance",
                "rationale": "While cartoons may entertain, their primary purpose is social and political commentary.",
                "isCorrect": False
            }
        ],
        "uam": "SS_P1_Q9999_IMG"
    },
    {
        "questionNumber": 9999,
        "type": "multiple-choice-text",
        "content": {
            "passage": "Data visualization through graphs and charts is essential for understanding economic trends, social statistics, and demographic patterns in society.",
            "stimulusImage": {
                "src": "/Images/Social Studies/Questions-are-based-on-the-following-graph.-1.png",
                "alt": "Graph displaying statistical data about economic or social trends"
            },
            "questionText": "Based on the data presented in this graph, what is the primary trend shown?"
        },
        "answerOptions": [
            {
                "text": "A steady decline throughout the period",
                "rationale": "Review the graph carefully to identify the actual trend direction.",
                "isCorrect": False
            },
            {
                "text": "General increase with minor fluctuations",
                "rationale": "Correct. The data shows an overall upward trend despite periodic variations.",
                "isCorrect": True
            },
            {
                "text": "A cyclical pattern with equal peaks and valleys",
                "rationale": "While there may be cycles, the overall trend is different.",
                "isCorrect": False
            },
            {
                "text": "No identifiable trend or random variation",
                "rationale": "The graph demonstrates a clear directional trend.",
                "isCorrect": False
            }
        ],
        "uam": "SS_P1_Q9999_IMG"
    }
]

def add_new_questions_to_science(filename, new_questions):
    """Add new image-based questions to science quiz"""
    filepath = os.path.join(QUIZ_DIR, filename)
    
    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        # Find the last quiz and add questions
        questions_added = 0
        for category in data.get("categories", {}).values():
            for topic in category.get("topics", []):
                for quiz in topic.get("quizzes", []):
                    questions = quiz.get("questions", [])
                    if questions:
                        # Update question numbers
                        last_q_num = max(q.get("questionNumber", 0) for q in questions)
                        
                        for i, new_q in enumerate(new_questions):
                            updated_q = json.loads(json.dumps(new_q))
                            updated_q["questionNumber"] = last_q_num + i + 1
                            updated_q["uam"] = f"SCI_P1_Q{last_q_num + i + 1:02d}_IMG"
                            questions.append(updated_q)
                            questions_added += 1
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"[OK] Added {questions_added} questions to {filename}")
        return questions_added
    
    except Exception as e:
        print(f"[ERROR] {filename}: {str(e)}")
        return 0

def add_new_questions_to_social_studies(filename, new_questions):
    """Add new image-based questions to social studies quiz"""
    filepath = os.path.join(QUIZ_DIR, filename)
    
    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        # Find questions and add new ones
        questions_added = 0
        for category in data.get("categories", {}).values():
            for topic in category.get("topics", []):
                for quiz in topic.get("quizzes", []):
                    questions = quiz.get("questions", [])
                    if questions:
                        # Update question numbers
                        last_q_num = max(q.get("questionNumber", 0) for q in questions)
                        
                        for i, new_q in enumerate(new_questions):
                            updated_q = json.loads(json.dumps(new_q))
                            updated_q["questionNumber"] = last_q_num + i + 1
                            updated_q["uam"] = f"SS_P1_Q{last_q_num + i + 1:02d}_IMG"
                            questions.append(updated_q)
                            questions_added += 1
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"[OK] Added {questions_added} questions to {filename}")
        return questions_added
    
    except Exception as e:
        print(f"[ERROR] {filename}: {str(e)}")
        return 0

def main():
    print("=" * 70)
    print("PHASE 3: ADD IMAGE-BASED QUESTIONS TO SCIENCE & SOCIAL STUDIES")
    print("=" * 70)
    
    total_added = 0
    
    # Add to science quizzes
    print("\nScience Quizzes:")
    total_added += add_new_questions_to_science("science.quizzes.part1.json", SCIENCE_NEW_QUESTIONS[:2])
    
    # Add to social studies quizzes  
    print("\nSocial Studies Quizzes:")
    total_added += add_new_questions_to_social_studies("social-studies.quizzes.json", SOCIAL_STUDIES_NEW_QUESTIONS[:2])
    
    print("\n" + "=" * 70)
    print(f"SUMMARY: Added {total_added} new image-based questions")
    print("=" * 70)

if __name__ == "__main__":
    main()
