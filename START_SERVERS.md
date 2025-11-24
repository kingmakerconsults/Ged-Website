# Quick Start Guide

## The Issue

Your backend and Vite dev servers need to both be running for the app to work properly.

## Start Both Servers

### Terminal 1 - Backend Server:

```powershell
cd C:\Users\Zacha\Ged-Website\backend
node server.js
```

Keep this terminal open. You should see:

```
Server listening on port 3002
```

### Terminal 2 - Vite Dev Server:

```powershell
cd C:\Users\Zacha\Ged-Website
npm run dev:frontend
```

Keep this terminal open. You should see:

```
Local: http://localhost:5173/
```

## Open the App

Visit: http://localhost:5173

## What Fixed

1. **Quiz loader now waits** - The React app won't start until quiz data loads
2. **Character encoding fixed** - No more weird symbols (��, ◆◆)
3. **Image paths corrected** - Logo and images use `/images/` for Vite public folder

## If Quizzes Still Don't Load

1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab - should see:

   - ✓ `/quizzes/math.quizzes.part1.json` - 200 OK
   - ✓ `/quizzes/math.quizzes.part2.json` - 200 OK
   - ✓ `/api/all-quizzes` - 200 OK
   - etc.

4. If you see 504 or "Unable to connect":

   - Backend server isn't running
   - Go back to Terminal 1 and start it

5. In console you should see:
   ```
   [quiz-loader] Starting quiz data load from: http://localhost:5173
   [quiz-loader] Quiz data loaded successfully
   [app] Quiz data loaded event received
   ```

## Troubleshooting

**"Most quizzes aren't loading"**

- Check both terminals are still running
- Refresh the page (Ctrl+R or Cmd+R)
- Check browser console for `[quiz-loader]` messages

**"Weird symbols showing"**

- Fixed! Was a UTF-8 encoding issue
- If still seeing them, let me know where

**"Logo not showing"**

- Logo is at `/images/kingmaker-logo.svg`
- Check browser Network tab for 404 errors
- Make sure `frontend/public/images/kingmaker-logo.svg` exists
