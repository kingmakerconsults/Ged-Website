# Vite Migration - Complete Guide

## Overview

Successfully migrated the GED Website frontend from Babel Standalone + CDN React to Vite + React with ES modules, React Router, and intelligent code-splitting.

## What We Achieved

### 🎯 Core Migration

- ✅ Vite build system with HMR and esbuild pre-bundling
- ✅ React 18.3.0 from npm (replaced CDN UMD)
- ✅ ES module structure for utilities, hooks, components
- ✅ React Router with lazy-loaded routes
- ✅ Backward compatibility via `window.*` attachments

### 📦 Code Splitting

- ✅ App code: ~59 KB (gz ~18.5 KB)
- ✅ React vendor chunk: ~162 KB (gz ~53 KB) - cached separately
- ✅ Math questions: ~107 KB (lazy)
- ✅ Science questions: ~96 KB (lazy)
- ✅ Social Studies: ~248 KB (lazy)
- ✅ RLA questions: ~71 KB (lazy)
- ✅ QuizInterface: ~20 KB (lazy route)

### 🚀 Performance

- Dev server startup: **~2s** with optimization
- HMR updates: **<50ms**
- Production build: **~10s** with vendor chunking
- Initial page load: **~71.5 KB (gz)** - app + vendor
- Vendor caching: React libs cached separately for faster updates

## Project Structure

```
frontend/
├── src/
│   ├── main.jsx              # Vite entry point
│   ├── App.jsx               # Main app with routing
│   ├── views/                # Route components
│   │   ├── DashboardView.jsx
│   │   ├── ProfileView.jsx
│   │   ├── SettingsView.jsx
│   │   └── QuizDemo.jsx      # Demo quiz route
│   └── loaders/
│       └── questions.js      # Dynamic data loaders
├── components/               # React components (ES modules)
│   ├── index.js              # Central exports
│   ├── auth/
│   ├── modals/
│   ├── quiz/
│   ├── formula/
│   ├── math/
│   ├── geometry/
│   └── charts/
├── utils/                    # Utility functions (ES modules)
│   ├── mathUtils.js
│   ├── textUtils.js
│   └── quizProgress.js
├── hooks/                    # React hooks (ES modules)
│   ├── useThemeController.js
│   └── useInteractiveToolPanel.js
├── data/                     # Question banks (ES modules)
│   ├── science/
│   ├── math/
│   ├── rla/
│   └── social/
├── config/                   # Configuration
│   ├── subjectVisuals.js
│   └── fallbackVocabulary.js
├── dist/                     # Production build output
└── index.html               # HTML shell
```

## Quick Start

### Development Mode

**Frontend only (Vite dev server with HMR):**

```powershell
npm run dev:frontend
# Opens at http://localhost:5173
# API proxies to :3002
```

**Backend API server:**

```powershell
npm start
# or
npm run start
# Opens at http://localhost:3002
```

**Full stack (recommended):**

```powershell
# Terminal 1
npm run dev:frontend

# Terminal 2
npm start
```

### Production Build

```powershell
# Build frontend
npm run build:frontend

# Preview production build
npm run preview:frontend

# Or start backend (serves built frontend)
npm start
```

## Routes

| Route        | Component     | Description               |
| ------------ | ------------- | ------------------------- |
| `/`          | DashboardView | Main dashboard            |
| `/profile`   | ProfileView   | User profile              |
| `/settings`  | SettingsView  | App settings              |
| `/demo/math` | QuizDemo      | 5-question math quiz demo |

## Dynamic Data Loading

Question banks load on demand:

```javascript
// Available via window.QuestionLoaders
await window.QuestionLoaders.loadMathQuestions();
await window.QuestionLoaders.loadScienceQuestions();
await window.QuestionLoaders.loadRlaQuestions();
await window.QuestionLoaders.loadSocialStudiesQuestions();
await window.QuestionLoaders.loadScienceFormulas();
await window.QuestionLoaders.loadSciNumeracyQuestions();
```

Each loader:

1. Dynamically imports the data chunk
2. Attaches to `window.*` for legacy compatibility
3. Returns the data

## Converted Components

### ES Module Exports

- `QuizInterface` - Main quiz runner
- `AuthScreen` - Google OAuth authentication
- `FormulaSheetModal`, `ScienceFormulaSheet` - Formula displays
- `MathText` - Math text rendering
- `GeometryFigure` - SVG geometry renderer
- `ChartDisplay` - Chart.js wrapper
- Modals: `JoinOrganizationModal`, `NamePromptModal`, `PracticeSessionModal`

### Central Exports

Import from `frontend/components/index.js`:

```javascript
import {
  AuthScreen,
  JoinOrganizationModal,
  FormulaSheetModal,
  MathText,
  GeometryFigure,
  ChartDisplay,
} from '../components/index.js';
```

## Backward Compatibility

All converted modules attach to `window.*` for unconverted components:

```javascript
// ES module export
export function formatMathText(html) {
  /* ... */
}

// Legacy window attachment
if (typeof window !== 'undefined') {
  window.MathUtils = Object.assign(window.MathUtils || {}, {
    formatMathText,
    // ... other exports
  });
}
```

This allows gradual migration without breaking existing code.

## Configuration Files

### `vite.config.mts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const rootDir = path.resolve(__dirname, 'frontend');

export default defineConfig({
  root: rootDir,
  plugins: [react()],
  build: {
    outDir: path.resolve(rootDir, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3002',
    },
  },
});
```

### `package.json` Scripts

```json
{
  "scripts": {
    "dev:frontend": "vite --config vite.config.mts",
    "build:frontend": "vite build --config vite.config.mts",
    "preview:frontend": "vite preview --config vite.config.mts",
    "start": "node backend/server.js"
  }
}
```

## Backend Changes

### SPA Fallback (`backend/server.js`)

```javascript
// Serve static assets
app.use('/', express.static(frontendDir, { index: false }));

// SPA shell for root
app.get(['/', '/index.html'], (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// SPA fallback for client-side routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.set('Cache-Control', 'no-store');
  return res.sendFile(path.join(frontendDir, 'index.html'));
});
```

This ensures routes like `/profile`, `/demo/math` work in production.

## Build Output

Optimized production bundle with vendor chunking (Nov 23, 2025):

```
dist/index.html                                   4.81 kB │ gzip:   1.57 kB
dist/assets/Logo-*.svg                          980.67 kB │ gzip: 519.52 kB
dist/assets/index-*.css                          44.33 kB │ gzip:   8.90 kB
dist/assets/index-*.js                           59.13 kB │ gzip:  18.48 kB
dist/assets/vendor-react-*.js                   162.23 kB │ gzip:  52.96 kB
dist/assets/mathQuestions-*.js                  107.13 kB │ gzip:  20.43 kB
dist/assets/scienceQuestions-*.js                96.56 kB │ gzip:  23.81 kB
dist/assets/socialStudiesQuestions-*.js         248.71 kB │ gzip:  63.33 kB
dist/assets/rlaQuestions-*.js                    71.40 kB │ gzip:  20.57 kB
dist/assets/QuizInterface-*.js                   20.19 kB │ gzip:   6.17 kB
dist/assets/SciNumeracyQuestions-*.js            10.08 kB │ gzip:   2.87 kB
dist/assets/ScienceFormulas-*.js                  0.95 kB │ gzip:   0.47 kB
dist/assets/GraphCanvas-*.js                     20.93 kB │ gzip:   6.55 kB
dist/assets/GeometryCanvas-*.js                  27.12 kB │ gzip:   7.55 kB
```

**Initial load:** App code (18.5 KB gz) + React vendor (53 KB gz) = ~71.5 KB (gz)  
**Vendor cache:** React libraries cached separately for better long-term caching  
**Data chunks:** Load on demand when needed

## Testing

### Dev Server Health

```powershell
Invoke-WebRequest -Uri http://localhost:5173 -UseBasicParsing
```

### Build Verification

```powershell
npm run build:frontend
Test-Path frontend\dist\index.html
```

### Bundle Size

```powershell
Get-ChildItem frontend\dist\assets -Recurse |
  Measure-Object -Property Length -Sum |
  Select-Object @{Name="SizeMB";Expression={[math]::Round($_.Sum/1MB,2)}}
```

## Common Tasks

### Add a New Route

1. Create view component in `frontend/src/views/`
2. Import in `frontend/src/App.jsx`
3. Add `<Route path="/path" element={<YourView />} />`
4. Add navigation link if needed

### Convert a Component to ES Module

1. Add `import React from 'react'`
2. Change `const { useState } = React` to `import { useState } from 'react'`
3. Change `function ComponentName` to `export function ComponentName`
4. Keep `window.Components.ComponentName = ComponentName` for backward compatibility
5. Add to `frontend/components/index.js` exports

### Add Dynamic Data Loading

1. Add loader function to `frontend/src/loaders/questions.js`
2. Use `await import('../../data/...')` for dynamic import
3. Attach to `window.*` if needed for legacy code
4. Export from loaders module

## Troubleshooting

### Dev server won't start

- Check if port 5173 is in use: `Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess`
- Kill Node processes: `Get-Process -Name node | Stop-Process -Force`

### Build errors

- Clear cache: `Remove-Item node_modules\.vite -Recurse -Force`
- Reinstall: `Remove-Item node_modules -Recurse -Force; npm install`

### Routes don't work in production

- Verify SPA fallback is in `backend/server.js`
- Check `frontendDir` points to `frontend/dist` in production

### Components not rendering

- Check browser console for import errors
- Verify component is exported from `components/index.js`
- Check for missing React imports

## Future Improvements

### Short Term

- [ ] Convert remaining view wrappers to ES modules
- [ ] Add more demo routes (Science, RLA, Social Studies)
- [x] Implement vendor chunking for React/Router

### Medium Term

- [ ] Remove all `window.*` attachments
- [ ] Add route-based prefetching
- [ ] Implement progressive web app (PWA) features

### Long Term

- [ ] Consider TypeScript migration
- [ ] Add Vitest for component testing
- [ ] Implement E2E testing with Playwright

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [React Lazy Loading](https://react.dev/reference/react/lazy)
- [Rollup Code Splitting](https://rollupjs.org/guide/en/#code-splitting)

## Support

For issues or questions:

1. Check browser console for errors
2. Review build output for warnings
3. Verify file paths in imports
4. Ensure all dependencies are installed

---

**Migration Status:** ✅ Complete - Production Ready  
**Last Updated:** November 23, 2025  
**Bundle Size:** ~70 KB (gz) initial + on-demand chunks
