-- 2026-04-29 — Add "support" role (read-only student data hub).
-- Also fixes the existing role CHECK constraint which omitted 'instructor',
-- a role already used elsewhere in the codebase.

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
          FROM information_schema.table_constraints
         WHERE table_name = 'users'
           AND constraint_name = 'users_role_check'
    ) THEN
        ALTER TABLE users DROP CONSTRAINT users_role_check;
    END IF;
END$$ LANGUAGE plpgsql;

ALTER TABLE users
    ADD CONSTRAINT users_role_check
    CHECK (role IN ('student', 'instructor', 'support', 'org_admin', 'super_admin'));
