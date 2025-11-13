-- Migration: Organization Join System
-- Date: 2025-11-12
-- Description: Enforce mandatory organization join on login with code protection

-- 1. Ensure organizations exist (idempotent)
INSERT INTO organizations (name, access_code)
VALUES
  ('Commonpoint Bronx', NULL),
  ('Commonpoint Queens', '6709'),
  ('HANAC', '2740')
ON CONFLICT (name) DO UPDATE SET access_code = EXCLUDED.access_code;

-- 2. Add join_code snapshot column to users table (for audit/history)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS organization_join_code TEXT;

-- 3. Ensure organization_id column exists (should already exist from previous migration)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL;

-- 4. Ensure index exists for faster org lookups (should already exist)
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);

-- 5. Remove any default organization assignments (students must explicitly join)
-- This ensures no implicit org placement happens
UPDATE users
   SET organization_id = NULL,
       organization_join_code = NULL
 WHERE role = 'student'
   AND organization_id IS NOT NULL
   AND organization_join_code IS NULL; -- Only clear if they never explicitly joined

-- Note: Super admins and org_admins manually set by super admin, so we don't touch those
