# GED Website

This repository contains the backend, frontend, data, and tools for the GED preparation website.

## Quizzes workflow

Centralized quiz content now lives under `backend/data/quizzes` with a dynamic loader that preserves the legacy `ALL_QUIZZES` structure while sourcing per-topic question arrays when available.

- Inventory all quiz-like sources and write a report:
  - PowerShell
    ```powershell
    npm run quizzes:inventory
    ```
  - Outputs: `reports/quiz_inventory.{json,md}`

- Convert legacy `ALL_QUIZZES` to per-topic arrays (non-destructive):
  - PowerShell
    ```powershell
    npm run quizzes:convert
    ```
  - Writes: `backend/data/quizzes/<subject>/<topicId>.js` and `reports/quiz_consolidation_report.json`

- Verify dynamic vs legacy counts:
  - PowerShell
    ```powershell
    npm run quizzes:verify
    ```
  - Outputs: `reports/quiz_loader_status.{json,md}`

- Validate per-topic question shapes (lightweight checks):
  - PowerShell
    ```powershell
    npm run quizzes:check-shape
    ```

- Optional: Prune old reports (default 45 days):
  - PowerShell
    ```powershell
    npm run reports:prune
    ```
  - Or specify days:
    ```powershell
    node scripts/prune_reports.js --days 30
    ```

Notes:
- The server imports `backend/data/quizzes/index.js`. It builds the legacy shape from `backend/data/premade-questions.js` and replaces `topic.questions` when a matching per-topic file exists. If a file is missing, it falls back to legacy questions.
- Do not edit `backend/data/premade-questions.js`’s structure unless you intend to update the legacy source of truth.
- For data-only edits, prefer updating or adding `backend/data/quizzes/<subject>/<topicId>.js`.
