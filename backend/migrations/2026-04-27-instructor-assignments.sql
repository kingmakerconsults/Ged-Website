-- Phase 3 \u2014 instructor assignments (flag-gated OFF until UI ships).
--
-- DO-NO-HARM CONTRACT:
--   * Net-new tables; no existing rows touched.
--   * The existing `class_curriculum_items` table referenced by collab.js is
--     left intact \u2014 these new tables sit alongside it.
--   * Endpoints check FEATURE_INSTRUCTOR_ASSIGNMENTS; off => 404.

CREATE TABLE IF NOT EXISTS instructor_classes (
  id              SERIAL PRIMARY KEY,
  organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  instructor_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name            VARCHAR(255) NOT NULL,
  description     TEXT,
  archived_at     TIMESTAMP,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_instructor_classes_org_instructor
  ON instructor_classes (organization_id, instructor_id);

CREATE TABLE IF NOT EXISTS instructor_class_members (
  class_id        INTEGER NOT NULL REFERENCES instructor_classes(id) ON DELETE CASCADE,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  added_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_class_members_user
  ON instructor_class_members (user_id);

CREATE TABLE IF NOT EXISTS assignments (
  id              SERIAL PRIMARY KEY,
  organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  instructor_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id        INTEGER REFERENCES instructor_classes(id) ON DELETE SET NULL,
  title           VARCHAR(255) NOT NULL,
  subject         VARCHAR(100),
  quiz_id         VARCHAR(255),         -- references the JSON quiz catalog
  due_at          TIMESTAMP,
  notes           TEXT,
  archived_at     TIMESTAMP,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assignments_class
  ON assignments (class_id, archived_at);

CREATE INDEX IF NOT EXISTS idx_assignments_org_instructor
  ON assignments (organization_id, instructor_id);
