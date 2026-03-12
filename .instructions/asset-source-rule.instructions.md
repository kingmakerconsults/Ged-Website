---
applyTo: "backend/data/quizzes/**"
---

# Asset Source Rule — Visual Stimuli for Exams & Quizzes

## MANDATORY POLICY

All comprehensive exam visual stimuli MUST come from the existing asset library
at `frontend/public/images/`. No exceptions.

## FORBIDDEN

- Do NOT generate random placeholder charts, fake diagrams, or generic AI-created visuals
- Do NOT rely on arbitrary stock imagery or external URLs
- Do NOT create visuals disconnected from the approved content set
- Do NOT reference temporary local files, zip-only resources, or broken legacy paths
- Do NOT use `https://` or `http://` image URLs

## REQUIRED WORKFLOW

### 1. Asset-First Selection
Before writing a visual question, FIRST search the internal asset pool for a matching
approved stimulus. The question must be built around the selected asset — not the reverse.

Run `node scripts/build-asset-manifest.js` to regenerate `scripts/asset-manifest.json`
if new images have been added.

### 2. Valid Asset Paths
All image paths MUST use one of these patterns:
- `/images/Math/{filename}.{png|jpg}`
- `/images/Science/{filename}.{png|jpg}`
- `/images/Social Studies/{filename}.{png|jpg|gif}`
- `/images/RLA/{filename}.{png|jpg}`

Use `%20` encoding for spaces in JSON: `/images/Social%20Studies/...`

### 3. Required Fields for Image Questions
```js
{
  "imageUrl": "/images/{Subject}/{file}",
  "imageURL": "/images/{Subject}/{file}",
  "content": {
    "imageURL": "/images/{Subject}/{file}",
    "passage": "Alt text: [description of the visual]...",
    "questionText": "..."
  }
}
```

### 4. Validation
Run `npm run validate-assets` to confirm all image references resolve to real files.
Run `npm run validate-quizzes` — this now includes asset integrity checks inline.

### 5. Fallback Rule
If no approved visual asset exists for a target slot:
- Replace with another approved asset-backed item, OR
- Use a strong passage/data/document-based item that meets mock GED standards
- NEVER fabricate a visual reference

## AVAILABLE ASSETS (375 total)
- **Math**: 2 images (bar graphs)
- **RLA**: 3 images (interpreting graphics)
- **Science**: 109 images (genetics, anatomy, chemistry, physics, earth science, graphs, tables)
- **Social Studies**: 260 images (maps, political cartoons, historical photos, charts, graphs)

See `scripts/asset-manifest.json` for the complete approved path list.
