CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    access_code TEXT UNIQUE
);

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL;

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'student';

ALTER TABLE users
    ALTER COLUMN role SET DEFAULT 'student';

UPDATE users
    SET role = 'student'
  WHERE role IS NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
          FROM information_schema.table_constraints
         WHERE table_name = 'users'
           AND constraint_name = 'users_role_check'
    ) THEN
        ALTER TABLE users
            ADD CONSTRAINT users_role_check CHECK (role IN ('student', 'org_admin', 'super_admin'));
    END IF;
END$$ LANGUAGE plpgsql;

CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);

UPDATE users
   SET role = 'super_admin',
       organization_id = NULL
 WHERE email = 'kingmakerconsults@gmail.com';
