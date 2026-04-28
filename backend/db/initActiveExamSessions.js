// db/initActiveExamSessions.js
const db = require('../db');

async function ensureActiveExamSessionsTable() {
  await db.none(`
    CREATE TABLE IF NOT EXISTS active_exam_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id INTEGER NOT NULL,
      quiz_id TEXT NOT NULL,
      subject TEXT NOT NULL,
      quiz_type TEXT,
      quiz_title TEXT,
      quiz_payload JSONB NOT NULL,
      answers JSONB NOT NULL DEFAULT '[]'::jsonb,
      marked JSONB NOT NULL DEFAULT '[]'::jsonb,
      confidence JSONB NOT NULL DEFAULT '[]'::jsonb,
      time_spent JSONB NOT NULL DEFAULT '[]'::jsonb,
      current_question_index INTEGER NOT NULL DEFAULT 0,
      current_part TEXT,
      time_remaining_ms INTEGER,
      essay_text TEXT NOT NULL DEFAULT '',
      runner_state JSONB,
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours')
    );
    CREATE UNIQUE INDEX IF NOT EXISTS active_exam_sessions_quiz_id_idx
      ON active_exam_sessions(quiz_id);
    CREATE INDEX IF NOT EXISTS active_exam_sessions_user_subject_idx
      ON active_exam_sessions(user_id, subject);
  `);

  // Add columns for existing tables (idempotent)
  await db.none(`
    ALTER TABLE active_exam_sessions ADD COLUMN IF NOT EXISTS essay_text TEXT NOT NULL DEFAULT '';
    ALTER TABLE active_exam_sessions ADD COLUMN IF NOT EXISTS runner_state JSONB;
    -- 2026-04-29: server-authoritative timer + AI-quiz dup-gen lock
    ALTER TABLE active_exam_sessions ADD COLUMN IF NOT EXISTS deadline_at TIMESTAMPTZ;
    ALTER TABLE active_exam_sessions ADD COLUMN IF NOT EXISTS duration_ms INTEGER;
    ALTER TABLE active_exam_sessions ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ;
    ALTER TABLE active_exam_sessions ADD COLUMN IF NOT EXISTS auto_submitted BOOLEAN NOT NULL DEFAULT FALSE;
    ALTER TABLE active_exam_sessions ADD COLUMN IF NOT EXISTS kind TEXT;
    ALTER TABLE active_exam_sessions ADD COLUMN IF NOT EXISTS topic TEXT;
  `);

  // Backfill deadline_at = started_at + time_remaining_ms for any pre-existing rows.
  await db.none(`
    UPDATE active_exam_sessions
       SET deadline_at = started_at + (COALESCE(time_remaining_ms, 0) || ' milliseconds')::interval
     WHERE deadline_at IS NULL
  `);

  // Index used by /api/generate/* dup-gen lock (only counts unsubmitted sessions).
  await db.none(`
    CREATE INDEX IF NOT EXISTS active_exam_sessions_user_kind_subject_topic_idx
      ON active_exam_sessions(user_id, kind, subject, topic)
      WHERE submitted_at IS NULL;
  `);

  console.log('[init] active_exam_sessions table ensured');
}

module.exports = ensureActiveExamSessionsTable;
