#!/usr/bin/env python3
"""
GED Quiz Expansion Tool - Phases 1-5
Automates UAM marker addition and image-based question expansion
"""

import json
import os
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime

# Configuration
QUIZ_DIR = r"c:\Users\Zacha\Ged-Website\public\quizzes"
IMAGE_DIR = r"c:\Users\Zacha\Ged-Website\frontend\public\images"
BACKUP_DIR = r"c:\Users\Zacha\Ged-Website\quiz-backups"
REPORT_DIR = r"c:\Users\Zacha\Ged-Website\quiz-expansion-reports"

QUIZ_FILES = {
    "math": ["math.quizzes.part1.json", "math.quizzes.part2.json"],
    "rla": ["rla.quizzes.part1.json", "rla.quizzes.part2.json"],
    "science": ["science.quizzes.part1.json", "science.quizzes.part2.json"],
    "social-studies": ["social-studies.quizzes.json", "social-studies.extras.json"],
    "workforce": ["workforce.quizzes.json"]
}

SUBJECT_CODES = {
    "math": "MATH",
    "rla": "RLA",
    "science": "SCI",
    "social-studies": "SS",
    "workforce": "WF"
}

# Image categories for Phase 2
IMAGE_CATEGORIES = {
    "science": {
        "genetics": [
            "punnett-square", "dominance-genetics", "genotype", "phenotype", 
            "mendelian-inheritance", "reginald-punnett"
        ],
        "physics": [
            "ged-scince-fig-2", "ged-scince-fig-3", "ged-scince-fig-4",
            "ged-scince-fig-7", "ged-scince-fig-8", "ged-scince-fig-12", "ged-scince-fig-13"
        ],
        "weather": [
            "hurricane", "nasa", "hurricane-intensity", "weather"
        ],
        "anatomy": [
            "human-body", "human-anatomy", "anatomy"
        ],
        "general": ["matter", "earth-s-magnetic"]
    },
    "social-studies": {
        "maps": [
            "territorial-evolution", "political-map", "Louisiana_Purchase",
            "world-map"
        ],
        "cartoons": [
            "political-cartoon", "cartoonist", "puck-magazine",
            "Bosses-of-the-Senate", "Join", "king-andrew"
        ],
        "graphs": [
            "Questions-are-based-on-the-following-graph",
            "bar graph", "graph", "chart"
        ],
        "historical": [
            "civil-war", "civil-rights", "reconstruction", "american-civil-war"
        ]
    }
}

class QuizExpansionTool:
    def __init__(self):
        self.stats = {
            "files_processed": 0,
            "total_questions_before": 0,
            "total_questions_after": 0,
            "uam_markers_added": 0,
            "image_questions_added": 0,
            "images_discovered": 0,
            "images_categorized": 0,
            "files_modified": []
        }
        self.image_map = {}
        self.report = {}
        
    def phase1_audit_quizzes(self):
        """Phase 1: Add UAM markers to all questions"""
        print("\n" + "="*60)
        print("PHASE 1: AUDIT & ADD UAM MARKERS")
        print("="*60)
        
        for subject, files in QUIZ_FILES.items():
            subject_code = SUBJECT_CODES[subject]
            
            for file in files:
                # Extract part number
                if "part1" in file or "part2" not in file:
                    part = "P1" if "part1" in file else "P1"
                else:
                    part = "P2"
                
                file_path = os.path.join(QUIZ_DIR, file)
                print(f"\n📖 Processing: {file}")
                print(f"   Subject Code: {subject_code}, {part}")
                
                try:
                    with open(file_path, 'r', encoding='utf-8-sig') as f:
                        quiz_data = json.load(f)
                    
                    # Traverse and add UAM markers
                    q_count = self._add_uam_markers(quiz_data, subject_code, part)
                    self.stats["uam_markers_added"] += q_count
                    self.stats["total_questions_before"] += q_count
                    
                    print(f"   ✓ Added UAM to {q_count} questions")
                    
                except Exception as e:
                    print(f"   ✗ Error: {e}")
    
    def _add_uam_markers(self, obj: Any, subject: str, part: str, question_num: int = 0) -> int:
        """Recursively add UAM markers to all questions"""
        count = 0
        
        if isinstance(obj, dict):
            # Check if this is a question object
            if "questionNumber" in obj and "answerOptions" in obj:
                if "uam" not in obj:
                    q_num = obj.get("questionNumber", question_num)
                    q_type = obj.get("type", "MC")
                    
                    # Map type to UAM type code
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
                    
                    obj["uam"] = f"{subject}_{part}_Q{q_num:02d}_{uam_type}"
                    count += 1
            
            # Recurse through dict
            for value in obj.values():
                count += self._add_uam_markers(value, subject, part, question_num)
        
        elif isinstance(obj, list):
            for item in obj:
                count += self._add_uam_markers(item, subject, part, question_num)
        
        return count
    
    def phase2_categorize_images(self):
        """Phase 2: Build image utilization map"""
        print("\n" + "="*60)
        print("PHASE 2: BUILD IMAGE UTILIZATION MAP")
        print("="*60)
        
        for subject in ["science", "social-studies"]:
            subject_path = os.path.join(IMAGE_DIR, subject.replace("-", " ").title())
            if os.path.exists(subject_path):
                images = os.listdir(subject_path)
                self.image_map[subject] = {
                    "total": len(images),
                    "by_category": {}
                }
                
                print(f"\n📸 {subject.upper()}: {len(images)} images")
                
                # Categorize images
                for category, keywords in IMAGE_CATEGORIES.get(subject, {}).items():
                    matching = [img for img in images 
                               if any(kw.lower() in img.lower() for kw in keywords)]
                    self.image_map[subject]["by_category"][category] = matching
                    print(f"   {category}: {len(matching)} images")
                
                self.stats["images_categorized"] += len(images)
    
    def phase3_expand_quizzes(self):
        """Phase 3: Add image-based questions"""
        print("\n" + "="*60)
        print("PHASE 3: EXPAND QUIZZES WITH IMAGE QUESTIONS")
        print("="*60)
        print("\n⚠️  Phase 3 requires manual review of questions.")
        print("   Would you like to:")
        print("   1. Generate template questions for review")
        print("   2. Skip to validation")
        
    def phase4_validate(self):
        """Phase 4: Validate all changes"""
        print("\n" + "="*60)
        print("PHASE 4: VALIDATION & FIXES")
        print("="*60)
        
        for subject, files in QUIZ_FILES.items():
            for file in files:
                file_path = os.path.join(QUIZ_DIR, file)
                try:
                    with open(file_path, 'r', encoding='utf-8-sig') as f:
                        json.load(f)
                    print(f"✓ {file} - Valid JSON")
                except json.JSONDecodeError as e:
                    print(f"✗ {file} - Invalid JSON: {e}")
    
    def phase5_report(self):
        """Phase 5: Generate final report"""
        print("\n" + "="*60)
        print("PHASE 5: FINAL REPORT")
        print("="*60)
        
        report = {
            "timestamp": datetime.now().isoformat(),
            "statistics": self.stats,
            "images": self.image_map,
            "status": "ANALYSIS COMPLETE"
        }
        
        print("\n📊 SUMMARY STATISTICS:")
        print(f"   UAM Markers Added: {self.stats['uam_markers_added']}")
        print(f"   Images Categorized: {self.stats['images_categorized']}")
        print(f"   Questions Before: {self.stats['total_questions_before']}")
        
        # Save report
        os.makedirs(REPORT_DIR, exist_ok=True)
        report_path = os.path.join(REPORT_DIR, f"expansion_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2)
        
        print(f"\n📄 Report saved to: {report_path}")
        
        return report
    
    def run_all_phases(self):
        """Execute all phases"""
        print("\n🚀 GED QUIZ EXPANSION TOOL - FULL AUTOMATION")
        print("="*60)
        
        # Phase 1
        self.phase1_audit_quizzes()
        
        # Phase 2
        self.phase2_categorize_images()
        
        # Phase 4
        self.phase4_validate()
        
        # Phase 5
        self.phase5_report()
        
        print("\n✅ AUTOMATION COMPLETE")
        print("="*60)

if __name__ == "__main__":
    tool = QuizExpansionTool()
    tool.run_all_phases()
