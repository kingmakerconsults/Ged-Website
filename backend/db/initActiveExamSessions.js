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
  `);

  console.log('[init] active_exam_sessions table ensured');
}

module.exports = ensureActiveExamSessionsTable;
