# Science & Social Studies Placeholder Audit — 2025-11-05

Objective: Perform a deeper content pass to ensure no placeholder/autogen content remains in Science and Social Studies quizzes.

## Scope

- Science directory: backend/data/quizzes/science (43 files)
- Social Studies directory: backend/data/quizzes/social-studies (18 files)

## Detection patterns

We scanned all files for common placeholder signatures used earlier in the project:

- __autogen
- "Case Study"
- "practice question"
- "placeholder"
- "autogen"
- "demo"
- "template"
- "Which option best demonstrates"
- "Learners explore"
- "scenario that highlights"
- "does not address the key skill emphasized"

## Findings

- Science: No matches found for the listed placeholder patterns.
- Social Studies: No matches found for the listed placeholder patterns.

Additionally, spot checks confirm:
- Object-style multiple-choice structure is used (answerOptions with isCorrect boolean and rationales).
- One correct answer per question (enforced by the global validator).
- Content is topical (no generic training phrases or scaffolding text).

## Validation

- Ran global validator (npm run validate-quizzes): PASS (2633 questions checked).

## Notes

- Scientific Numeracy directory exists but is currently empty—no action required.
- If desired, we can run a qualitative pass next (tone/reading level/rationale clarity) and balance difficulties across topics.
