# Question Housing (Source of Truth)

This document is the "map" of where quiz questions live in this repo and how they flow into the running app.

## What counts as a question?

- **Premade questions**: curated/static question objects shipped with the app (the GED-style banks).
- **AI / dynamic questions**: generated on demand and stored in the database (question bank + quiz attempts).

This doc focuses on **premade questions**, because those are the ones that can silently drift across multiple files if we aren’t careful.

## Canonical premade source (authoritative)

**Backend unified catalog (source of truth):**

- backend/data/quizzes/index.js
  - Exports `ALL_QUIZZES`.
  - Builds `ALL_QUIZZES` by starting from legacy premade content and then applying supplemental topic imports + text normalization.

Supporting inputs:

- backend/data/premade-questions.js
  - Legacy base catalog (many topics live here).
- backend/data/quizzes/supplemental.topics.json
  - The list of “supplemental topics” to append/override.
- backend/data/quizzes/\*\*
  - Topic files referenced by `supplemental.topics.json`.

Runtime API that serves this canonical catalog:

- GET /api/all-quizzes
  - Returned payload is the backend `ALL_QUIZZES` object.

Static quiz file serving:

- The backend serves `/quizzes/*` from `public/quizzes` (canonical build artifacts).
- Backend-local overrides from `backend/quizzes` are **disabled by default**.
  - To temporarily re-enable overrides for debugging, start the server with:
    - `ALLOW_BACKEND_QUIZ_OVERRIDES=true`

## Public quiz JSON snapshots (distribution / fast-load)

These files are **build artifacts** generated from the canonical backend catalog.

- public/quizzes/\*.json

They exist so the client can load premade quizzes quickly and so the app still has a usable premade set even if the API is down.

Build command:

- npm run quizzes:build-json

Important notes:

- Some subjects are split into parts to keep file sizes manageable:
  - math.quizzes.part1.json + math.quizzes.part2.json
  - science.quizzes.part1.json + science.quizzes.part2.json
  - rla.quizzes.part1.json + rla.quizzes.part2.json
  - social-studies.quizzes.part1.json + social-studies.quizzes.part2.json
- Social Studies also has:
  - social-studies.extras.json (array-shaped extras)

## Frontend runtime: how the app gets the premade catalog

The premade catalog is assembled in the browser by the loader in:

- frontend/index.html

At runtime it:

1. Fetches public quiz snapshots from `/quizzes/*.json`.
2. Fetches the unified backend catalog from `/api/all-quizzes`.
3. Merges them and exposes the merged catalog via these globals (legacy compatibility):
   - window.UnifiedQuizCatalog
   - window.AppData
   - window.ExpandedQuizData
   - window.MergedExpandedQuizData

Then the React app boots and reads from those globals.

## Where the quiz list / quiz codes come from

Legacy app code assigns stable `quizCode` values and ensures topic-only question sets are treated like a quiz:

- frontend/src/legacy/LegacyRootApp.jsx
  - `assignPremadeQuizCodes()`

This is where “topics with direct `questions` arrays” become launchable premade quizzes.

## Practice/demo question banks (not the premade catalog)

These are separate, older “question bank” style datasets used for demos/tools, not the premade catalog.

- frontend/data/\*\*
- frontend/src/loaders/questions.js
- frontend/src/views/QuizDemo.jsx

If you’re adding or fixing GED premade quizzes, you generally should NOT edit these.

## AI / dynamic questions (database)

Dynamic question storage is backend/database-driven (separate from premade).

- backend/db/initQuestionBank.js
- backend/db/initQuizAttempts.js

## Images (metadata)

Image metadata and path lookups:

- backend/image_metadata_final.json (also served by the backend)

## Verification commands

Report where questions live + basic counts:

- npm run report:question-housing

Rebuild public quiz snapshots from canonical backend catalog:

- npm run quizzes:build-json

## Single-source-of-truth rule (future-proofing)

To avoid the “some questions exist but don’t show up in certain tools” problem:

- Treat backend `ALL_QUIZZES` as the only authoritative premade source.
- Treat public/quizzes as build outputs only.
- If a premade question/topic is missing in the app, fix the canonical backend catalog (or its supplemental topic inputs), then rebuild the public snapshots.
