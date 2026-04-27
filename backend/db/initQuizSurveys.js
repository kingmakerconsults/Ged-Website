const db = require('../db');

/**
 * Post-quiz survey responses (3-5 short feedback questions per submission).
 *
 * One row per survey submission. Optional `attempt_id` ties the survey
 * back to a specific quiz_attempts row for drill-down. Free-text + a
 * JSONB `extras` column give us forward-compat without future migrations.
 */
async function ensureQuizSurveysTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS quiz_surveys (
      id                  SERIAL PRIMARY KEY,
      user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      attempt_id          INTEGER REFERENCES quiz_attempts(id) ON DELETE SET NULL,
      subject             TEXT,
      difficulty_rating   SMALLINT,    -- 1 (too easy) … 5 (too hard)
      confidence_rating   SMALLINT,    -- 1 (not at all) … 5 (very confident)
      pace_rating         TEXT,        -- 'too_slow' | 'just_right' | 'too_fast'
      free_text           TEXT,
      extras              JSONB,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_quiz_surveys_user_created
       ON quiz_surveys (user_id, created_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_quiz_surveys_attempt
       ON quiz_surveys (attempt_id) WHERE attempt_id IS NOT NULL;`
  );
}

module.exports = ensureQuizSurveysTable;
