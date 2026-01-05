# Image Path Fixes - Complete Update

## Problem

Quiz questions with images were failing to load because:

1. Image URLs in the quiz data were stored as `Images/filename.png` without subject prefixes
2. The frontend image resolution functions weren't properly detecting which subject's image folder to use
3. Image paths weren't being consistently normalized across all rendering contexts

## Solution Implemented

### 1. Enhanced `resolveAssetUrl()` Function

**Location:** `frontend/src/legacy/LegacyRootApp.jsx` (lines 20494-20567)

**Changes:**

- Added optional `contextSubject` parameter to accept the current subject context
- Enhanced subject detection logic to recognize filename patterns:
  - `scince` → Science (handles misspelled filenames)
  - `math` patterns → Math
  - `rla`, `english`, `reading`, `writing` → RLA
  - `social`, `history`, `civics`, `economic`, `geography` → Social Studies
  - `workforce` → Workforce Readiness
- Falls back to path-based detection if filename pattern doesn't match
- Returns `/images/{Subject}/{filename}` format

**Function Signature:**

```javascript
function resolveAssetUrl(src, contextSubject = null)
```

### 2. Enhanced `normalizeImagePath()` Function

**Location:** `frontend/src/legacy/LegacyRootApp.jsx` (lines 20449-20473)

**Improvements:**

- Handles multiple path formats: `/frontend/Images`, `Images/`, etc.
- Normalizes to `/images/{filename}` intermediate format
- Subject folder names are capitalized properly
- Consistent slash handling (removes duplicates, ensures leading slash)

### 3. Updated `sanitizeHtmlContent()` Function

**Location:** `frontend/src/legacy/LegacyRootApp.jsx` (lines 2763-2821)

**Changes:**

- Added optional `subject` parameter to options object
- Passes subject context to `resolveAssetUrl()` for HTML img tags
- Processes all inline images in passages/articles with proper subject detection

**Function Signature:**

```javascript
function sanitizeHtmlContent(
  content,
  { normalizeSpacing = false, skipPreprocess = false, subject = null } = {}
)
```

### 4. Updated `Stem` Component

**Location:** `frontend/src/legacy/LegacyRootApp.jsx` (lines 33724-33765)

**Changes:**

- Added `subject` and `isReview` props
- Passes subject to both `resolveAssetUrl()` and `sanitizeHtmlContent()`
- Handles stimulus images with proper subject context

### 5. Updated All Image Rendering Locations

#### Practice Session Questions (lines 34461-34480)

```javascript
const imgSrc = resolveAssetUrl(rawImgSrc, selectedSubject);
```

#### Second Practice Variant (lines 34776-34795)

```javascript
const imgSrc = resolveAssetUrl(rawImgSrc, selectedSubject);
```

#### Reading Articles in Quiz (lines 34378-34415)

- Article title: `sanitizeHtmlContent(title, { ..., subject: selectedSubject })`
- Article image: `resolveAssetUrl(imageUrl, selectedSubject)`
- Article paragraphs: `sanitizeHtmlContent(paragraph, { ..., subject: selectedSubject })`

#### Quiz Review Section (lines 36657-36687)

- Quiz title: `sanitizeHtmlContent(quiz.article.title, { ..., subject: selectedSubject })`
- Quiz image: `resolveAssetUrl(quiz.imageUrl, selectedSubject)`
- Quiz paragraphs: `sanitizeHtmlContent(p, { ..., subject: selectedSubject })`

### 6. Updated Stem Component Calls

All 4 instances of `<Stem />` component now pass subject:

```javascript
<Stem item={currentQ} subject={selectedSubject} />
```

## Image Path Conversion Examples

### Input Formats

- `Images/ged-scince-fig-12.png` → `/images/Science/ged_scince_fig_12_0001.png`
- `Images/ged-scince-fig-13.png` → `/images/Science/ged_scince_fig_13_0001.png`
- `/frontend/Images/Math/someimage.png` → `/images/Math/someimage.png`
- `https://quiz.ez-ged.com/Images/Science/fig.png` → `/images/Science/fig.png`

### Detection Logic

1. **Path-based detection** (highest priority)
   - `/images/Science/` → Subject = Science
   - `/images/Math/` → Subject = Math
2. **Filename pattern detection**
   - Contains `scince` → Science
   - Contains `math` → Math
   - Contains `rla`, `english`, `reading` → RLA
3. **Context-based detection** (lowest priority)
   - Uses `contextSubject` parameter if provided
   - Falls back to "Social Studies" if no other detection matches

## Testing Notes

- Build successful: **325.46 kB gzipped**
- All image rendering paths updated
- Subject context available in all question rendering locations
- Backward compatible with existing image formats

## Files Modified

1. `frontend/src/legacy/LegacyRootApp.jsx` - Main changes (8 locations)

## Browser Console

Look for `[IMG FIX]` logs to verify image path corrections are working:

```
[IMG FIX] Images/ged-scince-fig-12.png -> /images/Science/ged_scince_fig_12_0001.png (context: Science)
```

## Verification Steps

1. Open a quiz with images
2. Check browser Developer Tools > Console for `[IMG FIX]` logs
3. Verify images display properly on screen
4. Test all subjects: Science, Math, RLA, Social Studies, Workforce Readiness
