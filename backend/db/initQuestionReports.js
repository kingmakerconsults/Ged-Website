const db = require('../db');

/**
 * User-submitted reports of problematic quiz questions.
 *
 * Lets students flag bad/confusing/wrong AI- or hand-authored questions
 * so admins can triage and push fixes. We snapshot question_text and
 * source identifiers so reports stay useful even if the underlying
 * question is later edited or regenerated.
 *
 *   status:  'open' | 'triaged' | 'resolved' | 'dismissed'
 *   reason:  short canonical category (incorrect_answer, ambiguous,
 *            offensive, broken_image, typo, other)
 */
async function ensureQuestionReportsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS question_reports (
      id              SERIAL PRIMARY KEY,
      user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
      attempt_id      INTEGER REFERENCES quiz_attempts(id) ON DELETE SET NULL,
      question_id     TEXT,
      question_index  SMALLINT,
      quiz_code       TEXT,
      quiz_title      TEXT,
      subject         TEXT,
      source          TEXT,         -- 'ai' | 'premade' | 'practice' | 'unknown'
      reason          TEXT NOT NULL,
      details         TEXT,
      question_text   TEXT,         -- snapshot of question stem (truncated)
      status          TEXT NOT NULL DEFAULT 'open',
      resolution_note TEXT,
      resolved_by     INTEGER REFERENCES users(id) ON DELETE SET NULL,
      resolved_at     TIMESTAMPTZ,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_question_reports_status_created
       ON question_reports (status, created_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_question_reports_question
       ON question_reports (quiz_code, question_id);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_question_reports_user
       ON question_reports (user_id, created_at DESC) WHERE user_id IS NOT NULL;`
  );
}

module.exports = ensureQuestionReportsTable;
