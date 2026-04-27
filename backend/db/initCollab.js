// db/initCollab.js
// Idempotent table init for collaboration ("Play Together") + classes.
const db = require('../db');

async function ensureCollabTables() {
  // Classes (admin UI exists; schema was missing)
  await db.none(`
    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
      teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      name TEXT NOT NULL,
      color TEXT,
      join_code VARCHAR(12) UNIQUE,
      open_date DATE,
      close_date DATE,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS classes_org_idx ON classes(organization_id);
    CREATE INDEX IF NOT EXISTS classes_teacher_idx ON classes(teacher_id);
  `);

  await db.none(`
    CREATE TABLE IF NOT EXISTS class_enrollments (
      id SERIAL PRIMARY KEY,
      class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(class_id, user_id)
    );
    CREATE INDEX IF NOT EXISTS class_enrollments_user_idx ON class_enrollments(user_id);
  `);

  // Collab sessions (rooms)
  await db.none(`
    CREATE TABLE IF NOT EXISTS collab_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      room_code VARCHAR(12) NOT NULL UNIQUE,
      session_type VARCHAR(20) NOT NULL,
      host_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
      organization_id INTEGER,
      title TEXT,
      subject TEXT,
      quiz_id TEXT,
      quiz_snapshot JSONB,
      quiz_config JSONB DEFAULT '{}'::jsonb,
      session_state JSONB NOT NULL DEFAULT '{"phase":"lobby","currentQuestion":0,"paceMode":"locked","revealedQuestions":[],"essayContent":"","essayTurn":null,"essayHistory":[]}'::jsonb,
      status VARCHAR(20) NOT NULL DEFAULT 'lobby',
      max_participants INTEGER NOT NULL DEFAULT 30,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '4 hours')
    );
    CREATE INDEX IF NOT EXISTS collab_sessions_org_idx ON collab_sessions(organization_id);
    CREATE INDEX IF NOT EXISTS collab_sessions_status_idx ON collab_sessions(status);
    CREATE INDEX IF NOT EXISTS collab_sessions_expires_idx ON collab_sessions(expires_at);
  `);

  await db.none(`
    CREATE TABLE IF NOT EXISTS collab_participants (
      id SERIAL PRIMARY KEY,
      session_id UUID NOT NULL REFERENCES collab_sessions(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      display_name TEXT,
      role VARCHAR(20) NOT NULL DEFAULT 'participant',
      answers JSONB NOT NULL DEFAULT '{}'::jsonb,
      socket_id VARCHAR(100),
      connected BOOLEAN NOT NULL DEFAULT FALSE,
      joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(session_id, user_id)
    );
    CREATE INDEX IF NOT EXISTS collab_participants_session_idx ON collab_participants(session_id);
  `);

  await db.none(`
    CREATE TABLE IF NOT EXISTS matchmaking_queue (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
      organization_id INTEGER,
      subject TEXT,
      topic TEXT,
      socket_id VARCHAR(100),
      queued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS matchmaking_queue_org_subject_idx
      ON matchmaking_queue(organization_id, subject);
  `);

  // ---------- Curriculum tables ----------
  await db.none(`
    CREATE TABLE IF NOT EXISTS class_curriculum_items (
      id SERIAL PRIMARY KEY,
      class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      subject TEXT,
      category_name TEXT,
      topic_id TEXT,
      quiz_id TEXT,
      title TEXT NOT NULL,
      planned_date DATE,
      manually_marked_covered BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS class_curriculum_items_class_idx
      ON class_curriculum_items(class_id, position);
    -- Optional end-of-timeframe date (instructors plan a span, not a single day).
    ALTER TABLE class_curriculum_items
      ADD COLUMN IF NOT EXISTS planned_end_date DATE;
  `);

  await db.none(`
    CREATE TABLE IF NOT EXISTS class_curriculum_coverage (
      id SERIAL PRIMARY KEY,
      class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
      curriculum_item_id INTEGER NOT NULL REFERENCES class_curriculum_items(id) ON DELETE CASCADE,
      session_id UUID REFERENCES collab_sessions(id) ON DELETE SET NULL,
      covered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      source VARCHAR(20) NOT NULL CHECK (source IN ('session','manual'))
    );
    CREATE INDEX IF NOT EXISTS class_curriculum_coverage_item_idx
      ON class_curriculum_coverage(class_id, curriculum_item_id);
    CREATE UNIQUE INDEX IF NOT EXISTS class_curriculum_coverage_session_unique
      ON class_curriculum_coverage(curriculum_item_id, session_id)
      WHERE session_id IS NOT NULL;
  `);

  // Add curriculum_item_id link on collab_sessions (if missing).
  await db.none(`
    ALTER TABLE collab_sessions
      ADD COLUMN IF NOT EXISTS curriculum_item_id INTEGER
      REFERENCES class_curriculum_items(id) ON DELETE SET NULL;
    CREATE INDEX IF NOT EXISTS collab_sessions_curriculum_item_idx
      ON collab_sessions(curriculum_item_id);
  `);
}

module.exports = ensureCollabTables;
