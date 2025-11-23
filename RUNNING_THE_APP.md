# How to Run the GED Website

## Two Ways to Run

### Option 1: Development Mode (Recommended for Development)

Use this when actively developing - gives you Hot Module Replacement (HMR).

**Terminal 1 - Frontend Dev Server:**

```powershell
npm run dev:frontend
```

- Runs Vite dev server at `http://localhost:5173`
- Has HMR (instant updates when you edit files)
- Proxies API calls to backend

**Terminal 2 - Backend API Server:**

```powershell
npm start
```

- Runs Express server at `http://localhost:3002`
- Serves API endpoints

**Access:** `http://localhost:5173` (use the Vite port)

---

### Option 2: Production Mode (Recommended for Testing Production Build)

Use this to test the actual production build.

**Step 1 - Build the frontend:**

```powershell
npm run build:frontend
```

- Creates optimized bundle in `frontend/dist/`
- Takes ~10 seconds

**Step 2 - Run backend in production mode:**

```powershell
npm run start:prod
```

- Runs Express server at `http://localhost:3002`
- Serves built files from `frontend/dist/`
- Serves API endpoints

**Access:** `http://localhost:3002` (backend serves everything)

---

## Common Issues

### "Failed to load module script" Error

**Problem:** You're running `npm start` (development mode) but haven't run the Vite dev server.

**Solution:** Either:

- Run both servers (Option 1 above), OR
- Build and run in production mode (Option 2 above)

### Port Already in Use

**Problem:** Port 5173 or 3002 is already taken.

**Solution:**

```powershell
# Kill all Node processes
Get-Process -Name node | Stop-Process -Force

# Or check specific port
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

### Changes Not Showing Up

**Development mode:** HMR should update automatically. If not, refresh browser.

**Production mode:** You need to rebuild:

```powershell
npm run build:frontend
# Then restart: npm run start:prod
```

---

## Quick Reference

| Command                    | What it does                           | Port |
| -------------------------- | -------------------------------------- | ---- |
| `npm run dev:frontend`     | Vite dev server with HMR               | 5173 |
| `npm start`                | Backend API (development)              | 3002 |
| `npm run start:prod`       | Backend API (production, serves dist/) | 3002 |
| `npm run build:frontend`   | Build production bundle                | -    |
| `npm run preview:frontend` | Preview production build               | 4173 |

---

## Recommended Workflow

1. **During Development:**

   - Run `npm run dev:frontend` in one terminal
   - Run `npm start` in another terminal
   - Code away with instant HMR updates!

2. **Before Committing:**

   ```powershell
   npm run build:frontend     # Make sure it builds
   npm run validate-quizzes   # Run tests
   ```

3. **Testing Production Build:**
   ```powershell
   npm run build:frontend
   npm run start:prod
   ```

---

## Routes Available

- `/` - Dashboard
- `/profile` - User profile
- `/settings` - App settings
- `/demo/math` - Math quiz demo (5 questions)
- All other paths redirect to `/` (SPA fallback)
