const db = require('../db');

/**
 * Vocabulary attempt log — one row per term answered.
 *
 * Powers per-student vocabulary proficiency analytics:
 *   – per-term accuracy (was the student right last 3 times?)
 *   – per-subject mastery rollups
 *   – terms that need review (lowest accuracy)
 */
async function ensureVocabularyAttemptsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS vocabulary_attempts (
      id           SERIAL PRIMARY KEY,
      user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      subject      TEXT NOT NULL,
      term         TEXT NOT NULL,
      is_correct   BOOLEAN NOT NULL DEFAULT FALSE,
      user_answer  TEXT,
      attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_vocab_attempts_user_subject_date
       ON vocabulary_attempts (user_id, subject, attempted_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_vocab_attempts_user_term
       ON vocabulary_attempts (user_id, term);`
  );
}

module.exports = ensureVocabularyAttemptsTable;
