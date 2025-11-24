# Vite Migration Complete - Setup Guide

## What Was Fixed

### 1. Quiz Data Loading

- **Created comprehensive quiz loader** in `index.html` that:
  - Fetches all quiz JSON files from `/quizzes/*.json`
  - Fetches unified catalog from `/api/all-quizzes`
  - Merges all data into `window.AppData`
  - Creates legacy compatibility aliases:
    - `window.ExpandedQuizData`
    - `window.MergedExpandedQuizData`
    - `window.Data.expandedQuizData`
    - `window.UnifiedQuizCatalog`

### 2. Image Assets

- **Created `frontend/public/` directory** with proper structure:

  - `/public/images/kingmaker-logo.svg` - Main logo
  - `/public/images/Math/` - Math subject images
  - `/public/images/Science/` - Science subject images
  - `/public/images/Social Studies/` - Social Studies images
  - `/public/badges/` - Subject badges

- **Updated all image references** in `LegacyRootApp.jsx`:
  - Logo paths changed from `Logo.svg` to `/images/kingmaker-logo.svg`
  - All passage image paths changed from `Images/...` to `/images/...`

### 3. Backend Configuration

- Backend already properly configured to serve:
  - Quiz JSON files at `/quizzes/*.json`
  - Unified catalog at `/api/all-quizzes`
  - Static assets with proper CORS and UTF-8 headers

### 4. Vite Configuration

- Updated `vite.config.mts` to proxy both:
  - `/api` → backend API
  - `/quizzes` → backend quiz files

## How to Use

### Development

```bash
# Terminal 1: Start backend (if not already running)
cd backend
npm start

# Terminal 2: Start Vite dev server
cd frontend
npm run dev
```

Visit `http://localhost:5173`

### Production Build

```bash
cd frontend
npm run build
```

This creates `frontend/dist/` with:

- Bundled JavaScript and CSS
- Public assets (images, badges) copied automatically
- Ready to deploy to static hosting

### Deployment

The `frontend/dist/` folder should be deployed to your static host (Netlify, Vercel, etc.).

**Important:** Ensure your backend is running and accessible at the URL configured in:

- `frontend/index.html` → `window.API_BASE_URL`
- Or via environment variable/config

## Verification Checklist

Open the browser dev tools and check:

- [ ] Console shows `[quiz-loader] Quiz data loaded successfully`
- [ ] Console shows subject counts (Math, RLA, Science, Social Studies, Workforce)
- [ ] Network tab shows successful `200` responses for:
  - `/quizzes/math.quizzes.part1.json`
  - `/quizzes/math.quizzes.part2.json`
  - `/quizzes/rla.quizzes.part1.json`
  - `/quizzes/rla.quizzes.part2.json`
  - `/quizzes/science.quizzes.part1.json`
  - `/quizzes/science.quizzes.part2.json`
  - `/quizzes/social-studies.quizzes.json`
  - `/quizzes/social-studies.extras.json`
  - `/quizzes/workforce.quizzes.json`
  - `/api/all-quizzes`
- [ ] Dashboard shows premade quiz counts (not 0/0)
- [ ] Progress bars display correctly
- [ ] Kingmaker logo displays in header and footer
- [ ] Subject images display in quiz passages
- [ ] No 404 errors for images or quiz files

## Troubleshooting

### Quizzes showing 0/0

1. Check browser console for `[quiz-loader]` messages
2. Check Network tab for failed quiz file requests
3. Verify backend is running and accessible
4. Check `window.AppData` in console - should be populated object

### Images not loading

1. Verify files exist in `frontend/public/images/`
2. Check Network tab for 404s
3. Ensure paths start with `/images/` (root-relative)
4. For dev: Vite serves public folder at root
5. For prod: Ensure build copies public folder to dist

### API calls failing

1. Check `window.API_BASE_URL` in console
2. Verify backend URL is correct
3. Check CORS settings on backend
4. Verify proxy in `vite.config.mts` for dev mode

## File Structure

```
frontend/
├── public/              # Static assets (served at root)
│   ├── images/
│   │   ├── kingmaker-logo.svg
│   │   ├── Math/
│   │   ├── Science/
│   │   └── Social Studies/
│   └── badges/
├── src/
│   ├── main.jsx        # Entry point
│   └── legacy/
│       └── LegacyRootApp.jsx  # Main app component
├── index.html          # HTML template with quiz loader
├── vite.config.mts     # Vite configuration
└── dist/               # Build output (generated)
```

## Next Steps

1. Test all quiz types load correctly
2. Verify progress tracking works
3. Test image display in all subjects
4. Run production build and test
5. Deploy to staging environment
6. Full regression testing
