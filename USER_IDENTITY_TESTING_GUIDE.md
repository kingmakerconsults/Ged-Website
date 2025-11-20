# User Identity Fix - Quick Testing Guide

## Quick Start

### 1. Start the Backend

```powershell
cd backend
npm start
```

The migration will run automatically on startup. Look for:

```
[initUserNameColumns] User name columns initialized successfully.
```

### 2. Test the Implementation

#### Test A: Check Database Schema

```sql
-- Connect to your database and run:

-- 1. Verify new columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name IN ('first_name', 'last_name', 'display_name');

-- Expected output: 3 rows showing the three new TEXT columns

-- 2. Verify email uniqueness constraint
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'users'
  AND constraint_type = 'UNIQUE';

-- Expected: users_email_key UNIQUE

-- 3. Check sample user data
SELECT id, email, name, first_name, last_name, display_name
FROM users
LIMIT 5;

-- Should see backfilled data from existing names
```

#### Test B: Test Login Flow

1. **Clear your browser's localStorage** (to simulate fresh login):

   - Open DevTools (F12)
   - Console tab
   - Run: `localStorage.clear()`

2. **Log in as User A** (e.g., your personal Google account)

3. **Open DevTools Console** and check:

   ```javascript
   // Check what's stored
   console.log('Generic:', localStorage.getItem('appUser'));
   console.log('Token:', localStorage.getItem('appToken'));

   // If you know your user ID (e.g., 1), check per-user cache:
   const user = JSON.parse(localStorage.getItem('appUser'));
   console.log('Per-user key:', localStorage.getItem(`appUser:${user.id}`));
   ```

4. **Check the Network tab**:
   - Look for the POST request to `/api/auth/google`
   - Check the response - should include:
     ```json
     {
       "user": {
         "id": 123,
         "email": "userA@example.com",
         "name": "Alice Smith",
         "first_name": "Alice",
         "last_name": "Smith",
         "display_name": "Alice Smith",
         "role": "student",
         ...
       },
       "token": "eyJ..."
     }
     ```

#### Test C: Test Name Update

1. **Navigate to Settings** (if your app has a settings page)

2. **Change your display name**:

   - Enter first name: "Jane"
   - Enter last name: "Doe"
   - Save

3. **Check DevTools Network tab**:

   - Look for PATCH request to `/api/me/name`
   - Request payload:
     ```json
     {
       "firstName": "Jane",
       "lastName": "Doe",
       "displayName": "Jane Doe"
     }
     ```
   - Response should return updated user object

4. **Verify in Database**:

   ```sql
   SELECT first_name, last_name, display_name
   FROM users
   WHERE email = 'userA@example.com';

   -- Should show: Jane | Doe | Jane Doe
   ```

5. **Verify in UI**:
   - Display name should immediately update
   - Refresh page - name should persist

#### Test D: Test Cross-Account Isolation (CRITICAL!)

1. **Log in as User A**, set display name to "Alice Anderson"

2. **Open DevTools Console**:

   ```javascript
   const userA = JSON.parse(localStorage.getItem('appUser'));
   console.log('User A ID:', userA.id);
   console.log('User A Name:', userA.display_name);
   console.log('User A Cache:', localStorage.getItem(`appUser:${userA.id}`));
   ```

3. **Log out**

4. **Log in as User B** (different Google account, same browser)

5. **Open DevTools Console again**:

   ```javascript
   const userB = JSON.parse(localStorage.getItem('appUser'));
   console.log('User B ID:', userB.id);
   console.log('User B Name:', userB.display_name);
   console.log('User B Cache:', localStorage.getItem(`appUser:${userB.id}`));

   // CRITICAL CHECK: User B should NOT see "Alice Anderson"
   // User B should see their own name from the database
   ```

6. **Log out and log back in as User A**:

   ```javascript
   const userA2 = JSON.parse(localStorage.getItem('appUser'));
   console.log('User A (return) Name:', userA2.display_name);

   // Should still be "Alice Anderson" - not affected by User B's session
   ```

#### Test E: Test API Security

Using PowerShell or curl:

```powershell
# Test 1: Try to update name without authentication
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/me/name" `
  -Method PATCH `
  -ContentType "application/json" `
  -Body '{"firstName":"Hacker","lastName":"Attack"}' `
  -UseBasicParsing `
  -ErrorAction SilentlyContinue

# Expected: 401 Unauthorized

# Test 2: Try with valid token (replace YOUR_TOKEN_HERE with real JWT)
$headers = @{
    "Authorization" = "Bearer YOUR_TOKEN_HERE"
    "Content-Type" = "application/json"
}

$body = @{
    firstName = "John"
    lastName = "Smith"
    displayName = "John Smith"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/me/name" `
  -Method PATCH `
  -Headers $headers `
  -Body $body

Write-Output $response
# Expected: { success: true, user: { ... } }
```

## Common Issues & Solutions

### Issue 1: Migration Fails on Startup

**Error:** `column "first_name" already exists`
**Solution:** This is normal if you restart the server. The migration is idempotent and checks for existing columns.

### Issue 2: Duplicate Email Error

**Error:** `duplicate key value violates unique constraint "users_email_key"`
**Solution:** The migration should have handled this. Check:

```sql
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

If duplicates exist, manually resolve them before restarting.

### Issue 3: Names Not Appearing in UI

**Cause:** Old cache from before the migration
**Solution:**

1. Log out
2. Clear localStorage: `localStorage.clear()`
3. Log back in - fresh data will be loaded from database

### Issue 4: Display Name Reverts After Refresh

**Cause:** localStorage not being updated after name change
**Solution:** Check that `handleSaveName` is calling the new `/api/me/name` endpoint (not the old `/api/profile/name`)

## Success Criteria

✅ **All tests pass when:**

1. Database has `first_name`, `last_name`, `display_name` columns
2. Email uniqueness constraint exists
3. Logging in populates all three name fields
4. Changing name via UI updates database and all caches
5. User A's name never appears when User B logs in
6. Logging back in as User A restores User A's name
7. API rejects unauthenticated name change requests

## Rollback Plan

If critical issues arise:

1. **Stop the server**

2. **Comment out the migration call** in `backend/server.js`:

   ```javascript
   // ensureUserNameColumns().catch((e) =>
   //   console.error('User name columns init error:', e)
   // );
   ```

3. **Revert frontend changes** (optional - old code will work with new columns):

   - `ensureUserProfile` can stay as-is
   - Just ensure backend is returning data

4. **Restart server** - system will work with legacy `name` column

5. **Later cleanup** (optional):
   ```sql
   ALTER TABLE users DROP COLUMN first_name;
   ALTER TABLE users DROP COLUMN last_name;
   ALTER TABLE users DROP COLUMN display_name;
   ALTER TABLE users DROP CONSTRAINT users_email_key;
   ```

## Next Steps After Verification

1. ✅ Test all scenarios above
2. ✅ Monitor error logs for 24 hours
3. ✅ Check for any user-reported name display issues
4. ✅ Consider adding audit logging for name changes
5. ✅ Document for team: new name fields are source of truth

## Support Information

If issues arise, check:

- Server logs: Look for `[initUserNameColumns]` messages
- Database logs: Check for constraint violations
- Browser console: Look for API errors or localStorage issues
- Network tab: Verify API requests include correct JWT tokens
