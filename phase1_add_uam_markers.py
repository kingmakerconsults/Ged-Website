#!/usr/bin/env python3
"""
Phase 1: Add UAM markers to quiz questions
Adds unique audit markers to every question for tracking
"""

import json
import os
from datetime import datetime

QUIZ_DIR = r"c:\Users\Zacha\Ged-Website\public\quizzes"
BACKUP_DIR = r"c:\Users\Zacha\Ged-Website\quiz-backups"

# Create backup directory
os.makedirs(BACKUP_DIR, exist_ok=True)

SUBJECT_CODES = {
    "math": "MATH",
    "rla": "RLA",
    "science": "SCI",
    "social-studies": "SS",
    "workforce": "WF"
}

def get_subject_and_part(filename):
    """Extract subject code and part from filename"""
    for subject, code in SUBJECT_CODES.items():
        if subject in filename:
            part = "P2" if "part2" in filename else "P1"
            return code, part
    return None, None

def add_uam_markers(obj, subject_code, part, q_counter=[0]):
    """Recursively add UAM markers"""
    if isinstance(obj, dict):
        # Check if this is a question
        if "questionNumber" in obj and "answerOptions" in obj:
            if "uam" not in obj:
                q_num = obj.get("questionNumber", q_counter[0] + 1)
                q_type = obj.get("type", "MC")
                
                # Map question type to UAM code
                type_map = {
                    "text": "MC",
                    "knowledge": "MC",
                    "multiple-choice": "MC",
                    "multiple-choice-text": "MC",
                    "constructed-response": "CR",
                    "image": "IMG",
                    "drag-drop": "DD",
                    "fill-blank": "FB"
                }
                uam_type = type_map.get(q_type, "MC")
                
                obj["uam"] = f"{subject_code}_{part}_Q{q_num:02d}_{uam_type}"
                q_counter[0] += 1
        
        for value in obj.values():
            add_uam_markers(value, subject_code, part, q_counter)
    
    elif isinstance(obj, list):
        for item in obj:
            add_uam_markers(item, subject_code, part, q_counter)

def process_quiz_file(filepath):
    """Process a single quiz file"""
    filename = os.path.basename(filepath)
    subject_code, part = get_subject_and_part(filename)
    
    if not subject_code:
        print(f"  [SKIP] Unknown subject in {filename}")
        return 0
    
    try:
        # Read file
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        # Add UAM markers
        q_counter = [0]
        add_uam_markers(data, subject_code, part, q_counter)
        
        # Create backup
        backup_path = os.path.join(BACKUP_DIR, f"{filename}.bak.{datetime.now().strftime('%Y%m%d_%H%M%S')}")
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            original = f.read()
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(original)
        
        # Write updated file
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"  [OK] {filename}: Added UAM to {q_counter[0]} questions")
        return q_counter[0]
    
    except Exception as e:
        print(f"  [ERROR] {filename}: {str(e)}")
        return 0

def main():
    print("=" * 70)
    print("PHASE 1: ADD UAM MARKERS TO ALL QUIZ QUESTIONS")
    print("=" * 70)
    
    # Get all quiz files
    quiz_files = [f for f in os.listdir(QUIZ_DIR) if f.endswith('.json') and 'sanitized' not in f and 'bak' not in f and 'utf8' not in f]
    
    total_questions = 0
    processed_files = 0
    
    for quiz_file in sorted(quiz_files):
        filepath = os.path.join(QUIZ_DIR, quiz_file)
        questions_added = process_quiz_file(filepath)
        total_questions += questions_added
        if questions_added > 0:
            processed_files += 1
    
    print("\n" + "=" * 70)
    print(f"SUMMARY: Added UAM markers to {total_questions} questions in {processed_files} files")
    print("=" * 70)

if __name__ == "__main__":
    main()
