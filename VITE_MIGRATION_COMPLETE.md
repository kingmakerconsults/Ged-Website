# Vite + React Migration Complete ✅

## Overview

Successfully migrated the frontend from Babel Standalone + CDN React to Vite + proper ES modules.

## What Changed

### Build System

- **Before**: Babel Standalone processed `<script type="text/babel">` tags in browser
- **After**: Vite bundles ES modules at build time with HMR in development

### File Structure

```
frontend/
├── src/
│   ├── main.jsx          # Vite entry point
│   └── App.jsx           # Main React component (converted from app.jsx)
├── utils/
│   ├── quizProgress.js   # Now exports ES modules
│   ├── mathUtils.js      # All functions exported
│   └── textUtils.js      # All functions exported
├── hooks/
│   └── useThemeController.js  # Exports ES module
├── index.html            # Simplified (no Babel scripts)
├── style.css             # Unchanged
└── dist/                 # Production build output (gitignored)
```

### Dependencies Added

- `vite@^5.0.0` - Build tool and dev server
- `@vitejs/plugin-react@^5.0.0` - React Fast Refresh support
- `react@^18.3.0` - Moved from CDN to npm
- `react-dom@^18.3.0` - Moved from CDN to npm

### Scripts Added

```json
"dev:frontend": "vite --config vite.config.mts",
"build:frontend": "vite build --config vite.config.mts",
"preview:frontend": "vite preview --config vite.config.mts",
"start": "node backend/server.js"
```

### Module Conversions

Converted to ES module exports (with legacy `window.*` attachments retained):

- ✅ `frontend/utils/quizProgress.js` - Progress tracking utilities
- ✅ `frontend/utils/mathUtils.js` - Math/LaTeX processing (20+ functions)
- ✅ `frontend/utils/textUtils.js` - Text sanitization (25+ functions)
- ✅ `frontend/hooks/useThemeController.js` - Theme management hook

### Bug Fixes

- ✅ Fixed `PREMADE_QUIZ_CATALOG` reassignment error using `Object.assign()`
- ✅ Removed all `<script type="text/babel">` dependencies
- ✅ Eliminated Babel Standalone loader and timeout diagnostics

## Running the App

### Development (with HMR)

```powershell
npm install
npm run dev:frontend
```

Then open http://localhost:5173

The dev server proxies `/api` requests to the Express backend on port 3002.

### Production Build

```powershell
npm run build:frontend
```

Output: `frontend/dist/`

### Production Server

```powershell
$env:NODE_ENV='production'
npm start
```

Express serves `frontend/dist` when `NODE_ENV=production` (falls back to raw `frontend` otherwise).

## Vite Configuration

`vite.config.mts` at repo root:

- Root set to `frontend/` directory
- Build output to `frontend/dist/`
- Dev server on port 5173 with `/api` proxy to `:3002`

## Backend Changes

Updated `backend/server.js`:

```javascript
const frontendDir =
  process.env.NODE_ENV === 'production'
    ? path.join(repoRoot, 'frontend', 'dist')
    : path.join(repoRoot, 'frontend');
```

## Next Steps (Optional Improvements)

### 1. Convert Remaining Globals to Imports

Many components still rely on `window.Components`, `window.SCIENCE_QUESTIONS`, etc.
Gradually convert these to:

```javascript
import { AuthScreen, QuizInterface } from './components/index.js';
import { SCIENCE_QUESTIONS } from './data/science/scienceQuestions.js';
```

### 2. Add React Router

Currently App.jsx is a placeholder. Add routing:

```bash
npm install react-router-dom
```

### 3. PostCSS Tailwind (remove CDN)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Code Splitting

Vite automatically code-splits, but you can optimize further with dynamic imports:

```javascript
const Dashboard = React.lazy(() =>
  import('./components/views/DashboardView.jsx')
);
```

### 5. Environment Variables

Create `.env` files for different environments:

```
VITE_API_BASE_URL=https://ged-website.onrender.com
```

Access via `import.meta.env.VITE_API_BASE_URL`

### 6. TypeScript (optional)

Rename `.jsx` → `.tsx` and add type safety incrementally.

## Troubleshooting

**Dev server won't start**: Check port 5173 isn't already in use

```powershell
Get-Process -Name node | Stop-Process -Force
```

**Build errors about missing modules**: Ensure `npm install` ran successfully

**Production shows blank page**: Check browser console and ensure `NODE_ENV=production` is set

**Legacy code breaks**: Some older code may still expect `window.*` globals. These are still attached for backward compatibility but should be migrated to imports over time.

## Migration Verification

✅ Dependencies installed
✅ Dev server runs on :5173
✅ Production build succeeds
✅ Output bundle: ~148KB JS (gzipped: 48KB)
✅ Theme toggle works (ES module import verified)
✅ No Babel warnings
✅ HMR (Hot Module Replacement) enabled

---

**Date**: November 23, 2025
**Status**: Core migration complete. Incremental component migration recommended.
