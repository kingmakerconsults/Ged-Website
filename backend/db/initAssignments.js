const db = require('../db');

/**
 * Assignments — instructor-issued work tied to a class or specific students.
 *
 * Targeting model:
 *   - If `class_id` is set, every member of that class (via class_enrollments)
 *     sees the assignment.
 *   - If rows exist in `assignment_targets` for the assignment, those
 *     specific users also see it.
 *   - Both can coexist (class-wide + extra individuals).
 *
 *   organization_id is denormalized so we can scope queries cheaply.
 */
async function ensureAssignmentsTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS assignments (
      id              SERIAL PRIMARY KEY,
      organization_id INTEGER NOT NULL,
      instructor_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      class_id        INTEGER REFERENCES classes(id) ON DELETE SET NULL,
      title           TEXT NOT NULL,
      subject         TEXT,
      quiz_id         TEXT,
      due_at          TIMESTAMPTZ,
      notes           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      archived_at     TIMESTAMPTZ
    );
  `);

  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_assignments_org_due
       ON assignments (organization_id, archived_at, due_at);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_assignments_instructor
       ON assignments (instructor_id, created_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_assignments_class
       ON assignments (class_id) WHERE class_id IS NOT NULL;`
  );

  await db.query(`
    CREATE TABLE IF NOT EXISTS assignment_targets (
      assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
      user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (assignment_id, user_id)
    );
  `);
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_assignment_targets_user
       ON assignment_targets (user_id);`
  );
}

module.exports = ensureAssignmentsTables;
