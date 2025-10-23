# Backend Setup for Mr. Smith's Learning Canvas

The backend provides an AI-only exam generation service. All quizzes and exams are composed on-demand by the Gemini API and structured through lightweight templates that only describe counts and section mixes—no premade or topic bank data remains in the repository.

## Environment Variables

The server looks for a Gemini-compatible API key at boot and will exit with a clear error if none is configured. It checks the following variables in order:

1. `GOOGLE_API_KEY`
2. `GOOGLE_AI_API_KEY`
3. `GEMINI_API_KEY`

You can use any one of these variable names; the first match wins. During boot the server logs which variable name was detected (the value is never printed).

### Local Development

The backend only loads `.env` when `NODE_ENV !== 'production'`. To run the server locally:

1. Copy `backend/.env.example` to `backend/.env`.
2. Set one of the supported API keys inside the file, for example:

   ```env
   GOOGLE_API_KEY=your_local_key
   ```

3. Install dependencies and start the server:

   ```bash
   cd backend
   npm install
   node server.js
   ```

### Render (and other production hosts)

Render ignores `.env` files that are present in the repository. Instead, define the environment variable from the dashboard:

1. Open your Render service.
2. Navigate to **Environment** → **Environment Variables**.
3. Add the variable `GOOGLE_API_KEY`, `GOOGLE_AI_API_KEY`, or `GEMINI_API_KEY` with the desired value.
4. Use build/start commands that install dependencies and launch the backend, for example:

   ```bash
   # Build command
   cd frontend && npm ci && npm run build && cd ../backend && npm ci

   # Start command
   cd backend && node server.js
   ```

## AI Exam Generation

The backend exposes a single canonical endpoint for exam creation:

```
POST /api/exams/generate
```

### Request Body

```json
{
  "subject": "Social Studies",
  "examType": "smitha",
  "totalQuestions": 12,
  "sectionMix": { "image": 4, "reading": 4, "standalone": 4 },
  "useImages": true
}
```

* `subject` and `examType` select a minimal structural template.
* `totalQuestions` overrides the template count when supplied.
* `sectionMix` is optional; omit or partially specify keys to fall back to the template mix.
* `useImages` disables image prompts when set to `false`.

Any legacy bank fields (topic/category/source) are ignored and should be removed from client calls.

### Response Body

```json
{
  "meta": {
    "subject": "Social Studies",
    "examType": "smitha",
    "totalQuestions": 12,
    "sections": { "image": 4, "reading": 4, "standalone": 4 },
    "generatedCounts": { "image": 4, "reading": 4, "standalone": 4 },
    "generationTimeMs": 12345,
    "notes": ["Only 3 eligible images found; 1 item backfilled as standalone."]
  },
  "items": [
    {
      "questionNumber": 1,
      "type": "image",
      "stem": "…",
      "answerOptions": [ … ],
      "answerKey": "B",
      "rationale": "…",
      "imageRef": { "imageUrl": "https://…", "altText": "…" }
    }
  ],
  "errors": [
    "Image generation failed: timeout"
  ]
}
```

All questions are generated via Gemini. Image questions originate from curated metadata (`image_metadata_final.json`), and reading/standalone questions come from AI prompts only. Before responding, the backend validates each item so the payload is clean and consistent.

## Minimal Templates

Templates are defined in `backend/server.js` as small configuration objects that contain:

* Default `totalQuestions`
* Desired `sectionMix` per exam type
* Subject-specific topic hints to steer the AI

Templates never include question content. Adjust them to tweak structure without reintroducing a bank.

## Testing

After making backend changes, run the existing lint/tests (if configured) and perform manual checks against the `/api/exams/generate` endpoint to confirm it returns the expected structure and honors the template counts.
