# Image Path Fix - Visual Guide

## Problem Screenshot

```
Browser shows:
❌ GET /Images/ged-scince-fig-12.png - 404 Not Found
❌ GET /frontend/Images/math-graph.png - 404 Not Found
```

## Solution Flow Diagram

```
Question Data
    ↓
    imageUrl: "Images/ged-scince-fig-12.png"
    ↓
[Rendering Component]
    ↓
resolveAssetUrl(src, selectedSubject)
    ↓
[Detection Logic]
  1. Check path segments → No
  2. Check filename pattern → "scince" found
  3. → Subject = "Science"
    ↓
Return: "/images/Science/ged-scince-fig-12.png"
    ↓
<img src="/images/Science/ged-scince-fig-12.png" />
    ↓
✅ Browser loads image successfully
```

## Code Changes at a Glance

### Function Signatures - Before & After

#### resolveAssetUrl()

```javascript
// BEFORE
function resolveAssetUrl(src)

// AFTER
function resolveAssetUrl(src, contextSubject = null)
```

#### sanitizeHtmlContent()

```javascript
// BEFORE
function sanitizeHtmlContent(content, { normalizeSpacing = false, skipPreprocess = false } = {})

// AFTER
function sanitizeHtmlContent(
  content,
  { normalizeSpacing = false, skipPreprocess = false, subject = null } = {}
)
```

#### Stem Component

```javascript
// BEFORE
function Stem({ item })

// AFTER
function Stem({ item, subject = null, isReview = false })
```

### Call Sites - Before & After

#### Image in Question

```javascript
// BEFORE
const imgSrc = resolveAssetUrl(rawImgSrc);

// AFTER
const imgSrc = resolveAssetUrl(rawImgSrc, selectedSubject);
```

#### HTML Content in Article

```javascript
// BEFORE
__html: sanitizeHtmlContent(paragraph, {
  normalizeSpacing: true,
});

// AFTER
__html: sanitizeHtmlContent(paragraph, {
  normalizeSpacing: true,
  subject: selectedSubject,
});
```

#### Stem Component Usage

```javascript
// BEFORE
<Stem item={currentQ} />

// AFTER
<Stem item={currentQ} subject={selectedSubject} />
```

## Subject Detection Examples

### Science Images

```
Input: "Images/ged-scince-fig-12.png"
Detection: Filename contains "scince"
Output: "/images/Science/ged-scince-fig-12.png"
```

### Math Images

```
Input: "Images/ged-math-function.png"
Detection: Path has "Math" OR filename has "math"
Output: "/images/Math/ged-math-function.png"
```

### Social Studies Images

```
Input: "Images/civil-war-photo.png"
Detection: Filename has "civil" or "war" or "history"
OR: Context parameter provided = "Social Studies"
Output: "/images/Social Studies/civil-war-photo.png"
```

### Unknown Images

```
Input: "Images/random-graphic.png"
Detection: No patterns match, no context provided
Output: "/images/Social Studies/random-graphic.png" (default)
```

## Browser Network Inspector

### What You'll See

```
GET /images/Science/ged-scince-fig-12.png        200 OK ✓
GET /images/Math/ged-math-calc.png               200 OK ✓
GET /images/RLA/grammar-rules.png                200 OK ✓
GET /images/Social Studies/civil-war.png         200 OK ✓
```

### NOT Seeing

```
❌ GET /Images/ged-scince-fig-12.png             404 Not Found
❌ GET /frontend/Images/...                      404 Not Found
❌ GET https://quiz.ez-ged.com/Images/...        Blocked/Failed
```

## Console Output

### In Browser DevTools Console

```
[IMG FIX] Images/ged-scince-fig-12.png -> /images/Science/ged-scince-fig-12.png (context: Science)
[IMG FIX] Images/ged-scince-fig-13.png -> /images/Science/ged-scince-fig-13.png (context: Science)
[IMG FIX] Images/math-calc.png -> /images/Math/math-calc.png (context: Math)
[sanitizeHtmlContent] Rewriting: Images/economy.png -> /images/Social Studies/economy.png
```

## Supported Subjects & Patterns

```
┌─────────────────────────────────────────────────────┐
│ SCIENCE                                              │
├─────────────────────────────────────────────────────┤
│ Patterns: "scince", "science", "fig", "formula"     │
│ Result: /images/Science/filename.png                │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ MATH                                                 │
├─────────────────────────────────────────────────────┤
│ Patterns: "math", "calc", "graph", "function"       │
│ Result: /images/Math/filename.png                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ RLA (Reading/Language Arts)                          │
├─────────────────────────────────────────────────────┤
│ Patterns: "rla", "english", "reading", "writing"    │
│ Result: /images/RLA/filename.png                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ SOCIAL STUDIES                                       │
├─────────────────────────────────────────────────────┤
│ Patterns: "social", "history", "civics", "geo"      │
│ Result: /images/Social Studies/filename.png         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ WORKFORCE READINESS                                  │
├─────────────────────────────────────────────────────┤
│ Patterns: "workforce", "readiness"                  │
│ Result: /images/Workforce Readiness/filename.png    │
└─────────────────────────────────────────────────────┘
```

## Impact Summary

### What Gets Fixed

✅ All images in practice questions
✅ All images in reading passages
✅ All stimulus images (diagrams, graphs)
✅ All article illustrations
✅ All HTML-embedded images in passages

### What Stays The Same

✓ Quiz functionality
✓ Question answering logic
✓ Review/grading system
✓ Performance
✓ Accessibility

### Affected Screens

- Practice Session (all subjects)
- Reading/Passage questions
- Quiz Review
- Image stimulus questions

## Quick Test

1. Open any Science quiz with images
2. Refresh page
3. Check DevTools Console
4. Look for `[IMG FIX]` logs
5. Verify images display
6. Check Network tab shows `/images/Science/` requests

✅ If you see `/images/{Subject}/` paths → Fix is working!
