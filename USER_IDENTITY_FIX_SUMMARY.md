# User Identity Fix - Implementation Summary

**Date:** November 20, 2025  
**Objective:** Fix bug where display names bleed across users and lock first name, last name, and display name to the email account that logs in.

## Changes Implemented

### Phase 1: Database Schema Updates

#### New Migration: `backend/db/initUserNameColumns.js`

- **Purpose:** Extends the `users` table with identity columns and enforces email uniqueness
- **New Columns Added:**
  - `first_name TEXT` - User's first name
  - `last_name TEXT` - User's last name
  - `display_name TEXT` - User's preferred display name
- **Data Migration:**
  - Backfills `display_name` from existing `name` column
  - Splits existing `name` into `first_name` and `last_name` components
  - Handles duplicate emails (keeps oldest record)
- **Constraints:**
  - Adds `UNIQUE (email)` constraint to prevent duplicate accounts
- **Called from:** `backend/server.js` on startup (line ~4621)

### Phase 2: Backend API Updates

#### Updated Functions in `backend/server.js`

1. **`loadUserWithRole(userId)`** (line ~435)

   - Now selects `first_name`, `last_name`, `display_name` columns
   - Returns complete user identity data

2. **`buildAuthPayloadFromUserRow(row)`** (line ~467)

   - Includes `first_name`, `last_name`, `display_name` in auth payload
   - Computes display name with fallback chain: `display_name → name → email prefix`

3. **`buildUserResponse(row, fallbackPicture)`** (line ~486)

   - Returns structured response with all name fields
   - Uses `display_name` as primary name source
   - Legacy `name` field preserved for backwards compatibility

4. **`findUserByEmail(email)`** (line ~411)

   - Now includes name fields in SELECT query

5. **`createUser(email, rawName)`** (line ~418)

   - Parses provider name into components on user creation
   - Splits name on whitespace: first word → `first_name`, rest → `last_name`
   - Sets `display_name` to full name
   - Handles edge cases (single word names, missing names)

6. **Google OAuth Callback** (`/api/auth/google`) (line ~12420)
   - Parses Google profile name into `first_name`, `last_name` components
   - Updates name fields on each login using `COALESCE` to preserve existing values
   - Ensures `display_name` is populated from `name` if not already set
   - Name parsing logic:
     ```javascript
     const parts = baseName.trim().split(/\s+/);
     if (parts.length === 1) {
       firstName = parts[0];
     } else if (parts.length > 1) {
       firstName = parts[0];
       lastName = parts.slice(1).join(' ');
     }
     ```

#### New Endpoint: `PATCH /api/me/name`

**Location:** `backend/server.js` (line ~12493)  
**Authentication:** Requires valid JWT token via `requireAuth` middleware  
**Security:** Always uses `req.user.userId` - never accepts user ID from client

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "displayName": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": 123,
    "email": "user@example.com",
    "name": "John Doe",
    "first_name": "John",
    "last_name": "Doe",
    "display_name": "John Doe",
    "role": "student",
    "organization_id": null,
    "picture": "https://..."
  }
}
```

**Update Logic:**

- Uses `COALESCE` to only update fields that are provided
- If `firstName` is null/empty, existing value is preserved
- Reloads full user data with organization info after update
- Returns complete user profile via `buildUserResponse()`

### Phase 3: Frontend Updates

#### Updated: `frontend/app.jsx`

1. **`ensureUserProfile(user)`** (line ~248)

   - **OLD:** Derived name from various sources, could bleed across accounts
   - **NEW:** Strictly prefers backend-provided values
   - Name resolution order:
     1. `user.display_name` (if present and non-empty)
     2. `user.name` (legacy fallback)
     3. Email prefix (final fallback)
   - Extracts and preserves `first_name` and `last_name` from backend
   - Never re-computes names from other fields

2. **User Restoration on Page Load** (line ~30206)

   - **OLD:** Used generic `localStorage.getItem('appUser')`
   - **NEW:** Per-user localStorage keys
   - Key format: `appUser:${userId}` or `appUser:${email}`
   - Migration logic: Automatically migrates from old generic key to per-user key
   - Prevents User A's cached data from appearing when User B logs in

3. **`handleLogin(user, token)`** (line ~30249)

   - **NEW:** Stores user data in both generic and per-user keys
   - Generic key (`appUser`) maintained for backwards compatibility
   - Per-user key used as primary source of truth
   - Format: `appUser:${profile.id}` or `appUser:${profile.email}`

4. **`handleSaveName(firstName, lastName)`** (line ~30402)

   - **OLD:** Called `/api/profile/name` with combined name string
   - **NEW:** Calls `/api/me/name` with separate fields
   - Request includes `firstName`, `lastName`, and `displayName`
   - Updates local state from server response (single source of truth)
   - Updates per-user localStorage cache
   - Sets `customNameSet_${userId}` flag to prevent re-prompting

5. **`handleJoinOrganization(updatedUser)`** (line ~30485)
   - **NEW:** Stores user in per-user localStorage key
   - Maintains both generic and per-user keys for compatibility

## Security Improvements

1. **Email Uniqueness:** Database constraint prevents duplicate accounts
2. **User ID Binding:** Names are locked to database user ID, not editable by other users
3. **Authentication Required:** All name update operations require valid JWT
4. **No Client-Supplied IDs:** Server uses `req.user.userId` from token, never accepts user ID from client
5. **Per-User Caching:** localStorage keys include user ID to prevent cross-account data leaks

## Data Flow

### User Login Flow

1. User authenticates via Google OAuth
2. Backend creates or updates user record with name components
3. `buildUserResponse()` constructs standardized user object
4. Frontend stores in per-user localStorage key: `appUser:${userId}`
5. `ensureUserProfile()` normalizes data for UI consumption

### Name Update Flow

1. User submits first name and last name via settings UI
2. Frontend calls `PATCH /api/me/name` with structured data
3. Backend updates `first_name`, `last_name`, `display_name` columns
4. Backend returns updated user object via `buildUserResponse()`
5. Frontend updates local state and per-user localStorage
6. All UI components automatically reflect new name

### Page Refresh Flow

1. Frontend checks for `appToken` in localStorage
2. Reads generic `appUser` to get user ID
3. Loads data from per-user key: `appUser:${userId}`
4. If per-user key doesn't exist, migrates from generic key
5. User identity is locked to their specific cache

## Testing Checklist

✅ **Test 1: Single User Name Change**

- [ ] Log in as User A
- [ ] Change display name via settings
- [ ] Verify name appears in UI
- [ ] Check database: `SELECT first_name, last_name, display_name FROM users WHERE email = 'userA@example.com'`
- [ ] Verify only User A's row was updated

✅ **Test 2: Cross-Account Isolation**

- [ ] Log in as User A, set display name to "Alice"
- [ ] Log out
- [ ] Log in as User B (same browser)
- [ ] Verify User B sees their own name, NOT "Alice"
- [ ] Check localStorage: Both `appUser:A_ID` and `appUser:B_ID` should exist with different data

✅ **Test 3: Name Persistence**

- [ ] Log in as User A, set display name
- [ ] Log out
- [ ] Log in as User B, set different display name
- [ ] Log out
- [ ] Log in as User A again
- [ ] Verify User A's original name is still shown

✅ **Test 4: Database Integrity**

```sql
-- Check for duplicate emails (should return 0 rows)
SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;

-- Verify name columns exist
SELECT column_name FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name IN ('first_name', 'last_name', 'display_name');

-- Check email uniqueness constraint
SELECT constraint_name FROM information_schema.table_constraints
WHERE table_name = 'users' AND constraint_type = 'UNIQUE';
```

✅ **Test 5: API Endpoint Security**

```bash
# Test authentication requirement
curl -X PATCH http://localhost:3000/api/me/name \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Hacker","lastName":"Attempt"}'
# Expected: 401 Not authenticated

# Test with valid token (replace TOKEN with real JWT)
curl -X PATCH http://localhost:3000/api/me/name \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"firstName":"John","lastName":"Smith","displayName":"John Smith"}'
# Expected: 200 with updated user object
```

## Migration Notes

### Automatic Migrations on Startup

The server automatically runs `ensureUserNameColumns()` on startup, which:

1. Checks if columns exist before adding them (safe for multiple runs)
2. Backfills data from existing `name` column
3. Handles duplicate emails gracefully
4. Adds unique constraint on email

### Frontend Compatibility

- Generic `appUser` localStorage key is maintained for backwards compatibility
- Old sessions will automatically migrate to per-user keys on next login
- No breaking changes to existing user sessions

### Rollback Procedure

If issues arise:

1. Remove `ensureUserNameColumns()` call from `server.js`
2. Revert frontend `ensureUserProfile()` to original version
3. Database columns will remain (no harm) but won't be used
4. System will fall back to legacy `name` column behavior

## Known Limitations

1. **Existing Sessions:** Users with active sessions before deployment may need to log out and back in to get full per-user caching benefits
2. **Name Parsing:** Simple whitespace split may not handle all cultural name formats (e.g., "van der Berg", "Mary-Jane")
3. **Legacy `name` Column:** Still maintained for backwards compatibility; could be deprecated in future versions

## Future Enhancements

- [ ] Add support for middle names
- [ ] Implement more sophisticated name parsing (e.g., using NPM package like `parse-human-name`)
- [ ] Add API endpoint for bulk user import with proper name handling
- [ ] Create admin interface for correcting name parsing errors
- [ ] Add audit logging for name changes
