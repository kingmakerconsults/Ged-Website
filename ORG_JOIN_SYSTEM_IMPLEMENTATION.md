# Organization Join System Implementation

## Overview

Implemented a mandatory organization join system that requires students to select and join an organization before accessing the app. The system supports two organizations:

1. **Commonpoint Bronx** - Public (no access code required)
2. **Commonpoint Queens** - Protected (requires access code: `6709`)

## Database Changes

### Migration File

**Location**: `backend/migrations/2025-11-12-organization-join-system.sql`

**Changes**:

1. Inserts two organizations into the database
2. Adds `organization_join_code` column to `users` table to store the code used when joining
3. Cleans up any default organization assignments (sets NULL for non-admin users)

```sql
-- Insert organizations
INSERT INTO organizations (name, access_code) VALUES ('Commonpoint Bronx', NULL) ON CONFLICT (name) DO NOTHING;
INSERT INTO organizations (name, access_code) VALUES ('Commonpoint Queens', '6709') ON CONFLICT (name) DO NOTHING;

-- Add join code column
ALTER TABLE users ADD COLUMN IF NOT EXISTS organization_join_code TEXT;

-- Cleanup default assignments (optional)
UPDATE users SET organization_id = NULL, organization_join_code = NULL WHERE role = 'student';
```

## Backend Changes

### Modified Files

**File**: `backend/server.js`

#### 1. Updated `loadUserWithRole` function (line ~405-420)

Added `organization_join_code` and a computed `organization_requires_code` flag to the SELECT query:

```javascript
u.organization_join_code,
(o.access_code IS NOT NULL) AS organization_requires_code
```

#### 2. Updated `buildUserResponse` function (line ~445-461)

Added new fields to the user response object:

```javascript
organization_join_code: row.organization_join_code || null,
organization_requires_code: row.organization_requires_code || false,
```

#### 3. Added Public Organizations Endpoint

**Endpoint**: `GET /api/organizations`

- **Authentication**: None (public)
- **Purpose**: Returns list of all organizations for student selection
- **Response**:

```json
{
  "ok": true,
  "organizations": [
    {
      "id": 1,
      "name": "Commonpoint Bronx",
      "requires_code": false
    },
    {
      "id": 2,
      "name": "Commonpoint Queens",
      "requires_code": true
    }
  ]
}
```

#### 4. Added Student Join Organization Endpoint

**Endpoint**: `POST /api/student/select-organization`

- **Authentication**: Required (JWT token)
- **Purpose**: Allows students to join an organization with optional access code
- **Request Body**:

```json
{
  "organization_id": 2,
  "access_code": "6709"
}
```

- **Validation**:
  - Checks if organization exists
  - Verifies access code if organization requires one
  - Returns appropriate error messages for invalid codes
- **Response**:

```json
{
  "ok": true,
  "user": {
    "id": 123,
    "email": "student@example.com",
    "name": "John Doe",
    "role": "student",
    "organization_id": 2,
    "organization_name": "Commonpoint Queens",
    "organization_join_code": "6709",
    "organization_requires_code": true
  }
}
```

## Frontend Changes

### Modified Files

**File**: `frontend/app.jsx`

#### 1. Added `JoinOrganizationModal` Component (line ~23735)

Modal component that:

- Fetches available organizations on mount
- Displays a dropdown to select organization
- Shows access code input field when required
- Validates and submits join request
- Handles errors (invalid code, missing code, etc.)

**Props**:

- `onJoin(updatedUser)` - Callback when join succeeds
- `authToken` - JWT token for API authentication

#### 2. Added State Management

**New state variable**: `showJoinOrgModal` (line ~24248)

#### 3. Updated User Load Logic (line ~25918)

Modified the `useEffect` that loads stored user to check for `organization_id`:

- If student has no `organization_id`, show join modal and block access
- If student has `organization_id`, proceed with name prompt and quiz loading

#### 4. Updated `handleLogin` Function (line ~26026)

Added organization check after login:

- If student has no `organization_id`, show join modal
- Otherwise proceed with normal onboarding flow

#### 5. Added `handleJoinOrganization` Handler (line ~26106)

Handler that:

- Updates `currentUser` with the fresh user data from backend
- Persists updated user to localStorage
- Closes the join modal
- Proceeds to name prompt if needed
- Loads quiz attempts

#### 6. Updated `handleLogout` Function (line ~26130)

Added `setShowJoinOrgModal(false)` to reset state on logout

#### 7. Updated Render Output (line ~26999)

- Added modal to JSX with conditional rendering
- Added `aria-hidden` attribute to main content when modal is visible

```jsx
{
  showJoinOrgModal && (
    <JoinOrganizationModal
      onJoin={handleJoinOrganization}
      authToken={authToken}
    />
  );
}
```

## User Flow

### New Student Registration or Login

1. User authenticates (Google OAuth or email/password)
2. System checks if `organization_id` is NULL
3. If NULL, show `JoinOrganizationModal` (blocking modal)
4. User selects organization from dropdown
5. If organization requires code, show access code input
6. User submits join request
7. Backend validates:
   - Organization exists
   - Access code matches (if required)
8. Backend updates `users` table with `organization_id` and `organization_join_code`
9. Frontend receives updated user object
10. Modal closes and user proceeds to name setup or dashboard

### Existing Student Login

1. User authenticates
2. System checks if `organization_id` is present
3. If present, skip join modal and proceed to dashboard

### Super Admin / Org Admin

- Join modal never shows (checked by role)
- Super Admin explicitly has `organization_id = NULL` in database

## Security Considerations

1. **Access Code Protection**: Access codes are stored in the database and validated server-side
2. **Role-Based Bypass**: Admins are exempt from organization requirement
3. **No Client-Side Bypass**: Backend validates organization membership before allowing access
4. **JWT Authentication**: All join requests require valid JWT token

## Testing Checklist

- [ ] Run migration: `psql -d your_database -f backend/migrations/2025-11-12-organization-join-system.sql`
- [ ] Restart backend server
- [ ] Test new student flow:
  - [ ] Register/login as new student
  - [ ] Verify join modal appears
  - [ ] Try Commonpoint Bronx (should work without code)
  - [ ] Try Commonpoint Queens without code (should show error)
  - [ ] Try Commonpoint Queens with wrong code (should show error)
  - [ ] Try Commonpoint Queens with correct code `6709` (should succeed)
- [ ] Test existing student:
  - [ ] Login as student with organization_id already set
  - [ ] Verify join modal does NOT appear
- [ ] Test admin:
  - [ ] Login as super_admin or org_admin
  - [ ] Verify join modal does NOT appear
- [ ] Test logout and re-login
- [ ] Test browser refresh (state should persist)

## Future Enhancements

1. **Add Organization Management UI**: Allow super admins to create/edit organizations
2. **Add Code Rotation**: Allow orgs to change their access codes
3. **Add Join History**: Track when and how users joined organizations
4. **Add Bulk Import**: Allow importing students with pre-assigned organizations
5. **Add Organization Transfer**: Allow moving students between organizations
