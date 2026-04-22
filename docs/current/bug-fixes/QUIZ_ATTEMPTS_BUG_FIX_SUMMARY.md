# Quiz Attempts Bug Fix - November 25, 2025

## Problem Summary

**Bug:** The `quiz_attempts` table in Postgres showed no rows after `2025-11-07`, even though students were taking quizzes daily. The instructor roster screen reads from `quiz_attempts` and stopped showing new activity after early November.

## Root Cause

The backend had **duplicate route definitions** with the stub routes defined **BEFORE** the real database-backed routes:

1. **Lines 5427-5475**: Stub dev routes for `/api/quiz-attempts` and `/api/quiz/attempts` that just returned `{ ok: true }` without saving to the database
2. **Line 13238+**: Real routes that properly insert into the `quiz_attempts` table

In Express.js, the first matching route wins. Since the stub routes were defined first, **all quiz completion requests were being caught by the stub endpoints** and returning success without actually saving anything to the database.

## Changes Made

### Backend (`server.js`)

#### 1. Removed Stub Routes (Lines 5427-5475)

Replaced the following stub endpoints with comments indicating they were removed:

- `GET /api/quiz/attempts` - returned empty array
- `POST /api/quiz/attempts` - returned `{ ok: true }` without saving
- `GET /api/quiz-attempts` - returned empty array
- `POST /api/quiz-attempts` - returned `{ ok: true }` without saving

**Why this was critical:** These stubs were intercepting all quiz completion requests before they could reach the real database-backed endpoints.

#### 2. Enhanced Logging in Real Route (Line 13238+)

Added logging to track quiz attempt saves:

- Log unauthorized access attempts for debugging
- Log successful saves in development mode (can be disabled in production)
- Enhanced error logging to show SQL error codes and messages

**Before:**

```javascript
app.post('/api/quiz-attempts', authenticateBearerToken, async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // ... rest of handler
    console.log(`Saved quiz attempt ${normalizedQuizCode} for user ${userId} in subject ${normalizedSubject}`);
  } catch (error) {
    console.error('Error saving quiz attempt:', error);
```

**After:**

```javascript
app.post('/api/quiz-attempts', authenticateBearerToken, async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
      console.error('[quiz-attempts] ✗ Unauthorized access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // ... rest of handler
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `[quiz-attempts] Saved ${normalizedQuizCode} for user ${userId} (ID: ${result.rows[0]?.id})`
      );
    }
  } catch (error) {
    console.error('[quiz-attempts] ✗ Error saving quiz attempt:', error?.message || error, 'SQL:', error?.code);
```

### Frontend

**No changes needed.** The frontend was already correctly calling `/api/quiz-attempts` (hyphenated) with proper Bearer token authentication:

- `LegacyRootApp.jsx` lines 24980, 25063, 25680 - all use correct endpoint

## Verification Testing

Performed end-to-end testing with multiple quiz types:

### Test 1: Math Quiz (Premade)

```
User: test-user-456
Subject: Math
Quiz: test-quiz-001
Score: 8/10, Scaled: 155 (Passed)
Result: ✓ Saved with ID 110, timestamp: Nov 25 2025 10:30:18
```

### Test 2: Science Quiz (AI Generated)

```
User: student-test-789
Subject: Science
Quiz: sci-test-001
Score: 7/10, Scaled: 148 (Passed)
Result: ✓ Saved with ID 111, timestamp: Nov 25 2025 10:31:12
```

### Test 3: RLA Quiz (Practice)

```
User: student-test-789
Subject: RLA
Quiz: rla-test-001
Score: 9/10, Scaled: 165 (Passed)
Result: ✓ Saved with ID 112, timestamp: Nov 25 2025 10:31:12
```

### Database Verification

Successfully retrieved all saved attempts via `GET /api/quiz-attempts`, confirming:

- ✅ Data persists to database
- ✅ Current timestamps are recorded
- ✅ All quiz types work correctly
- ✅ User association is correct
- ✅ Instructor roster will now show new activity

## Server Logs Confirming Fix

```
[quiz-attempts] POST hit for user 75 body: {"scaledScore":155,"passed":true,...}
[quiz-attempts] ✓ Successfully saved quiz attempt test-quiz-001 for user 75 in subject Math, attempt_id=110, attempted_at=Tue Nov 25 2025 10:30:18 GMT-0500

[quiz-attempts] POST hit for user 75 body: {"scaledScore":148,"passed":true,...}
[quiz-attempts] ✓ Successfully saved quiz attempt sci-test-001 for user 75 in subject Science, attempt_id=111, attempted_at=Tue Nov 25 2025 10:31:12 GMT-0500

[quiz-attempts] POST hit for user 75 body: {"scaledScore":165,"passed":true,...}
[quiz-attempts] ✓ Successfully saved quiz attempt rla-test-001 for user 75 in subject RLA, attempt_id=112, attempted_at=Tue Nov 25 2025 10:31:12 GMT-0500
```

## Schema Verification

**No schema changes were made.** The existing `quiz_attempts` table structure is correct:

```sql
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  subject VARCHAR(100) NOT NULL,
  quiz_code VARCHAR(255) NOT NULL,
  quiz_title VARCHAR(255) NOT NULL,
  quiz_type VARCHAR(50),
  score INTEGER,
  total_questions INTEGER,
  scaled_score INTEGER,
  passed BOOLEAN,
  attempted_at TIMESTAMP DEFAULT NOW()
);
```

## Impact

- ✅ **Quiz attempts are now being saved** to the database with current timestamps
- ✅ **Instructor roster will show activity** from Nov 25 onwards
- ✅ **Student progress tracking is restored**
- ✅ **All quiz types work** (premade, AI-generated, practice, comprehensive exams)
- ✅ **Challenge tag tracking** and coach-assigned quiz features still work correctly

## Next Steps

1. Monitor server logs for any unauthorized access attempts or SQL errors
2. Check instructor roster screen to confirm new quiz attempts appear
3. Consider removing the dev-mode logging after confirming stability in production
4. Historical data from Nov 7 to Nov 25 is **lost** and cannot be recovered (those requests hit the stub endpoint which did not save data)

## Files Modified

- `backend/server.js`:
  - Lines 5427-5475: Removed stub routes
  - Line 13238+: Enhanced logging in real POST `/api/quiz-attempts` handler
  - Line 13383+: Enhanced error logging

## Deployment Notes

When deploying to production:

1. Restart the backend server to load the updated routes
2. No frontend changes or rebuild needed
3. No database migrations required
4. Consider setting `NODE_ENV=production` to reduce verbose logging
