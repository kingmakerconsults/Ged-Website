Quiz data inventory and consolidation status

This document lists primary quiz/question sources and tracks consolidation into `backend/data/quizzes/<subject>/<topic>.js` files. Counts are approximate unless noted.

Sources scanned on 2025-10-29:

- backend/data/premade-questions.js (legacy source of truth)
  - Subject area: mixed (Science, Scientific Numeracy, Math, Social Studies, RLA)
  - Questions (exact): 52 topics across 8 topics
  - Notes: Exports ALL_QUIZZES consumed by backend/server.js; used as input to generated per-topic files.

- frontend/data/quiz_data.js
  - Subject area: mixed (Science, etc.)
  - Questions (approx.): 396
  - Notes: Used by scripts/tests; not imported by backend

- frontend/New Exams/new_math_exams.js
  - Subject area: math
  - Questions (approx.): 60
  - Notes: Static JSON-like sample exercises

- frontend/New Exams/new_math_exams2.js
  - Subject area: math
  - Questions (approx.): 112
  - Notes: Static JSON-like sample exercises

- frontend/New Exams/index.html.bak.html.bak.html.bak
  - Subject area: mixed (includes Scientific Numeracy and others)
  - Questions (approx.): 552
  - Notes: Backup HTML with large embedded arrays; not used in production

- quizzes.txt (root)
  - Subject area: social-studies (U.S. History)
  - Questions (approx.): 6
  - Notes: Minimal structure differing from backend shape

- reports/math_validation_bypass_*.json
  - Subject area: N/A (metadata only)
  - Questions: 0 (no embedded questions)

Consolidation output (generated 2025-10-29):
- backend/data/quizzes/science/sci_life_science_basics.js (questions array)
- backend/data/quizzes/science/sci_ecosystems_environment.js (questions array)
- backend/data/quizzes/science/sci_chem_fundamentals.js (questions array)
- backend/data/quizzes/science/sci_scientific_numeracy_core.js (questions array)
- backend/data/quizzes/math/math_quant_numbers.js (questions array)
- backend/data/quizzes/social-studies/ss_us_hist_foundations.js (questions array)
- backend/data/quizzes/rla/rla_grammar_usage.js (questions array)
- backend/data/quizzes/rla/rla_info_main_idea.js (questions array)

Verification reports:
- reports/quiz_consolidation_report.json (per-subject/topic counts)
- reports/quiz_loader_status.{json,md} (legacy vs per-topic counts)

Switching the loader (deferred):
- The server now imports `./data/quizzes`, which uses a dynamic loader that preserves the original `ALL_QUIZZES` shape (subject → categories → topics with id/title/description/config) while replacing `topic.questions` from per-topic files when they exist.
- If a per-topic file does not exist for a topic id, the loader falls back to the legacy questions for that topic, maintaining safe behavior.

Other files reviewed but do not embed quiz data directly:
- scripts/clean_quiz_data.js (imports frontend/data/quiz_data.js)
- scripts/validate_math_quizzes.js (imports frontend/data/quiz_data.js)
- scripts/validate_math_quizzes.js.bak (imports frontend/data/quiz_data.js)
- tests/math_quizzes.test.js (imports frontend/data/quiz_data.js)
- tests/verify_rla_expansion.py (UI verification; no embedded data)

Methodology: Counts were computed via string matching for "answerOptions" and may slightly differ from actual question counts. Final consolidation will preserve original text, math formatting, and rationale fields.
