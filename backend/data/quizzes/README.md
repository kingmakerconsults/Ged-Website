Quizzes data directory

Overview

- Legacy source of truth for structure (subjects → categories → topics with id/title/description/config) lives in `backend/data/premade-questions.js`.
- Per-topic question arrays are generated into `backend/data/quizzes/<subject>/<topicId>.js` by `npm run quizzes:convert`.
- The server imports `backend/data/quizzes/index.js`, which uses a dynamic loader to:
  - Start from the legacy structure for subjects/categories/topic metadata.
  - Replace `topic.questions` from per-topic files when they exist.
  - Fall back to the legacy `topic.questions` when a per-topic file is missing.

Why this design

- Preserves the existing public shape (`ALL_QUIZZES`) so no API/route code changes are needed.
- Allows gradual migration to per-topic files without breaking behavior.
- Makes topic question editing localized, diffable, and testable.

Scripts

- Inventory sources (writes `reports/quiz_inventory.{json,md}`):
  - `npm run quizzes:inventory`
- Convert legacy to per-topic arrays (writes files and `reports/quiz_consolidation_report.json`):
  - `npm run quizzes:convert`
- Verify dynamic vs legacy counts (writes `reports/quiz_loader_status.{json,md}`):
  - `npm run quizzes:verify`

Conventions

- Subject folders: `science`, `scientific-numeracy`, `math`, `social-studies`, `rla`, `other`.
- Topic filenames: `<topicId>.js` and must export an array of question objects.
- Do not add structure (subjects/categories/config) in per-topic files; that remains in the legacy module until we introduce metadata shims.

Notes

- Deprecated file `backend/data/quizzes/premade-questions.js` has been stubbed and archived to avoid confusion. Use the legacy module at `backend/data/premade-questions.js` or import `backend/data/quizzes`.