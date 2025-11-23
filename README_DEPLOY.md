# Deployment Guide - quiz.ez-ged.com

## ✅ Migration Complete

This project has been **fully migrated to Vite + React**. The legacy UMD React + Babel Standalone setup has been removed.

---

## 📦 What Gets Deployed

**Production site serves:** `frontend/dist/index.html` and its compiled assets.

- ✅ Built with Vite into `frontend/dist/`
- ✅ ES modules bundled into `/assets/*.js`
- ✅ Code-split by route and subject
- ✅ React vendor chunk separate for caching
- ❌ NO raw `.jsx` files
- ❌ NO `<script type="text/babel">`
- ❌ NO UMD React from CDN

---

## 🚀 Netlify Configuration

### Site Settings

In your Netlify site dashboard, configure:

```
Build command:        npm run build:frontend
Publish directory:    frontend/dist
```

**Note**: No base directory needed - build runs from repo root.

### Using `netlify.toml` (Recommended)

The included `netlify.toml` in repo root:

```toml
[build]
  command = "npm run build:frontend"
  publish = "frontend/dist"

[build.environment]
  NODE_VERSION = "18"

# Redirect API calls to backend
[[redirects]]
  from = "/api/*"
  to = "https://ged-website.onrender.com/api/:splat"
  status = 200
  force = true

# SPA fallback for client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🛠️ Manual Build & Deploy

### Local Build

From repository root:

```bash
npm install
npm run build:frontend
```

This creates:

- `frontend/dist/index.html` - Entry HTML
- `frontend/dist/assets/index-*.js` - Main app bundle (~59 KB)
- `frontend/dist/assets/vendor-react-*.js` - React libs (~162 KB)
- `frontend/dist/assets/*.js` - Code-split chunks (quiz data)

### Verify Build

```bash
# Check dist structure
ls frontend/dist

# Verify no raw .jsx references
grep -r "\.jsx" frontend/dist/
# Should only find .jsx in URLs like /assets/index-xxx.js, NOT in script src

# Preview locally
npm run preview:frontend
# Opens http://localhost:4173
```

### Deploy to Netlify

**Option 1: Drag & Drop**

1. Go to https://app.netlify.com/drop
2. Drag `frontend/dist` folder
3. Test the preview URL

**Option 2: Netlify CLI**

```bash
npm install -g netlify-cli
cd frontend/dist
netlify deploy --prod
```

**Option 3: Git-based (Recommended)**

1. Connect GitHub repo to Netlify
2. Set build settings as above
3. Push to `main` branch → auto-deploy

---

## 🔍 Verification Checklist

After deployment, verify at quiz.ez-ged.com:

- [ ] **No console errors** about "text/babel"
- [ ] **No MIME type errors** - all `.js` files load as `application/javascript`
- [ ] **No 404s** in Network tab for `/assets/*.js`
- [ ] **App renders** - not just white screen
- [ ] **Login works** - can authenticate
- [ ] **Quiz loads** - can select subject and start quiz
- [ ] **Math rendering** - KaTeX formulas display correctly

### Debugging

**White screen?**

- Open DevTools Console - check for errors
- Network tab - verify all assets load (200 status)
- Hard refresh: Ctrl+Shift+R

**MIME type errors?**

- Netlify serves correct types by default
- If custom server: ensure `.js` → `application/javascript`

**404 on /assets/\*.js?**

- Verify published `frontend/dist`, not `frontend`
- Check build logs for errors

---

## 📂 Project Structure

```
Ged-Website/
├── frontend/                # Vite project
│   ├── src/
│   │   ├── main.jsx        # Entry point (imports React)
│   │   ├── App.jsx         # Root component
│   │   └── ...
│   ├── index.html          # Source HTML (Vite processes this)
│   └── dist/               # Build output (deploy THIS)
│       ├── index.html      # Built HTML with hashed assets
│       └── assets/         # Compiled JS/CSS bundles
├── backend/                # Express API
│   └── server.js
├── vite.config.mts         # Vite configuration
└── package.json            # Scripts: build:frontend, preview:frontend
```

---

## 🧹 Legacy Files Removed

The following files have been **deleted** (no longer needed):

- ❌ Root `app.jsx` (37,547 lines - UMD React)
- ❌ `frontend/app.jsx` (24,060 lines - Babel standalone)
- ❌ Any root-level `index.html` with `<script type="text/babel">`

The app now lives in:

- ✅ `frontend/src/App.jsx` (100 lines - ES modules)
- ✅ `frontend/src/main.jsx` (entry point)

---

## 🔄 Development Workflow

### Dev Mode (Hot Reload)

```bash
npm run dev:frontend    # Vite dev server :5173
npm start              # Backend API :3002
```

Visit http://localhost:5173 - changes hot-reload instantly.

### Production Preview (Local)

```bash
npm run build:frontend
npm run preview:frontend
```

Visit http://localhost:4173 - test production build locally.

---

## 🌐 Backend Deployment (Separate)

The backend API is deployed separately:

- **Platform**: Render.com / Railway / Heroku
- **Root**: Point to `backend/` directory
- **Start command**: `npm start`
- **Env vars**: Set `NODE_ENV=production`, `PORT`, database URLs

Frontend on Netlify calls backend at:

- Dev: `http://localhost:3002/api/*` (via Vite proxy)
- Prod: `https://ged-website.onrender.com/api/*` (via Netlify redirects)

---

## ✨ Benefits of Vite

- ⚡ **Lightning fast** hot module replacement
- 📦 **Optimized bundles** - tree-shaking, minification
- 🔀 **Code-splitting** - lazy load heavy quiz data
- 🎯 **Modern ESM** - no Babel runtime overhead
- 🚀 **Instant deploys** - static files, no server-side rendering

---

## 📞 Support

If deployment fails:

1. Check Netlify build logs for errors
2. Verify `npm run build:frontend` succeeds locally
3. Test `frontend/dist/index.html` in browser (file://)
4. Review this guide's verification checklist

---

**Last updated**: November 23, 2025  
**Migration status**: ✅ Complete - ready for production
