-- Ad-hoc one-off (2026-04-28): clear org membership + onboarding for every
-- student so the instructor/org rosters read 0 and each student is sent
-- through the org-pick wizard on next login. Staff (instructor / org_admin /
-- super_admin) keep their org access. Auto-admit for Commonpoint Bronx /
-- Queens stays intact in backend/server.js.
BEGIN;

INSERT INTO users_archive
  (archive_reason, id, email, name, password_hash, role, organization_id,
   organization_join_code, picture_url, created_at, last_login, last_seen_at,
   account_status, raw)
SELECT
  '2026-04-28-clear-student-org-memberships',
  id, email, name, password_hash, role, organization_id,
  organization_join_code, picture_url, created_at, last_login, last_seen_at,
  account_status, to_jsonb(u.*)
FROM users u
WHERE LOWER(role) = 'student';

UPDATE users
   SET organization_id = NULL,
       pending_organization_id = NULL,
       account_status = 'pending_org',
       onboarding_state = '{}'::jsonb
 WHERE LOWER(role) = 'student';

DELETE FROM org_membership_requests
 WHERE user_id IN (SELECT id FROM users WHERE LOWER(role) = 'student');

SELECT 'archived_students'    AS what, COUNT(*) FROM users_archive
  WHERE archive_reason = '2026-04-28-clear-student-org-memberships'
UNION ALL
SELECT 'students_pending_org', COUNT(*) FROM users
  WHERE LOWER(role)='student' AND account_status='pending_org' AND organization_id IS NULL
UNION ALL
SELECT 'students_with_org',    COUNT(*) FROM users
  WHERE LOWER(role)='student' AND organization_id IS NOT NULL
UNION ALL
SELECT 'staff_with_org',       COUNT(*) FROM users
  WHERE LOWER(role) IN ('instructor','org_admin','super_admin') AND organization_id IS NOT NULL;

COMMIT;
