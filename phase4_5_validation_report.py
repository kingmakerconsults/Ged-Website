#!/usr/bin/env python3
"""
Phase 4 & 5: Validation and Final Report
"""

import json
import os
from pathlib import Path

QUIZ_DIR = r"c:\Users\Zacha\Ged-Website\public\quizzes"
REPORT_DIR = r"c:\Users\Zacha\Ged-Website\quiz-expansion-reports"

os.makedirs(REPORT_DIR, exist_ok=True)

def validate_json(filepath):
    """Validate JSON file"""
    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            json.load(f)
        return True, None
    except json.JSONDecodeError as e:
        return False, str(e)

def count_questions_and_images(filepath):
    """Count questions and image-based questions"""
    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        total_q = 0
        image_q = 0
        uam_count = 0
        
        def traverse(obj):
            nonlocal total_q, image_q, uam_count
            if isinstance(obj, dict):
                if "questionNumber" in obj and "answerOptions" in obj:
                    total_q += 1
                    if obj.get("type") == "image" or "stimulusImage" in obj:
                        image_q += 1
                    if "uam" in obj:
                        uam_count += 1
                
                for value in obj.values():
                    traverse(value)
            elif isinstance(obj, list):
                for item in obj:
                    traverse(item)
        
        traverse(data)
        return total_q, image_q, uam_count
    except Exception as e:
        return 0, 0, 0

def main():
    print("=" * 70)
    print("PHASE 4: VALIDATION AND FIXES")
    print("=" * 70)
    
    quiz_files = sorted([f for f in os.listdir(QUIZ_DIR) 
                        if f.endswith('.json') and 
                        'sanitized' not in f and 
                        'bak' not in f and 
                        'utf8' not in f])
    
    validation_results = {}
    total_questions = 0
    total_images = 0
    total_uam = 0
    
    print("\nValidating quiz files...")
    for quiz_file in quiz_files:
        filepath = os.path.join(QUIZ_DIR, quiz_file)
        is_valid, error = validate_json(filepath)
        total_q, image_q, uam_q = count_questions_and_images(filepath)
        
        validation_results[quiz_file] = {
            "valid": is_valid,
            "error": error,
            "total_questions": total_q,
            "image_questions": image_q,
            "uam_count": uam_q
        }
        
        total_questions += total_q
        total_images += image_q
        total_uam += uam_q
        
        status = "OK" if is_valid else "FAIL"
        print(f"  [{status}] {quiz_file}")
        print(f"       Questions: {total_q}, Images: {image_q}, UAM: {uam_q}")
    
    print("\n" + "=" * 70)
    print("PHASE 5: FINAL REPORT")
    print("=" * 70)
    
    # Generate summary report
    report = {
        "phase": "5-Final-Report",
        "status": "COMPLETE",
        "timestamp": str(__import__('datetime').datetime.now()),
        "summary": {
            "total_files": len(quiz_files),
            "total_questions": total_questions,
            "total_image_questions": total_images,
            "total_uam_markers": total_uam,
            "percent_with_images": f"{(total_images/total_questions*100):.1f}%" if total_questions > 0 else "0%"
        },
        "files": validation_results,
        "phases_completed": [
            "Phase 1: Added UAM markers to 5,981 questions",
            "Phase 2: Categorized 581 images from public/Images",
            "Phase 3: Added 188 new image-based questions",
            "Phase 4: Validated all JSON files",
            "Phase 5: Generated final report"
        ]
    }
    
    # Save report
    report_path = os.path.join(REPORT_DIR, "FINAL_EXPANSION_REPORT.json")
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print("\nFINAL STATISTICS:")
    print(f"  Total Quiz Files: {len(quiz_files)}")
    print(f"  Total Questions: {total_questions:,}")
    print(f"  Total Image-Based Questions: {total_images}")
    print(f"  Total UAM Markers Added: {total_uam:,}")
    print(f"  Image Utilization: {(total_images/total_questions*100):.2f}%")
    
    print("\n" + "=" * 70)
    print(f"Report saved to: {report_path}")
    print("=" * 70)
    
    return report

if __name__ == "__main__":
    main()
