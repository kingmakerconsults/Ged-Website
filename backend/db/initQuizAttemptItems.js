const db = require('../db');

/**
 * Normalised per-question records for every quiz attempt.
 *
 * One row per question per attempt.  Enables:
 *   – domain / topic mastery computed from real item data
 *   – confidence calibration (lucky-guess / misconception detection)
 *   – per-question timing analytics
 *   – student attempt drill-down ("show me every question I got wrong")
 *   – admin weakness clustering across cohorts
 */
async function ensureQuizAttemptItemsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS quiz_attempt_items (
      id              SERIAL PRIMARY KEY,
      attempt_id      INTEGER NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
      question_index  SMALLINT NOT NULL,           -- 0-based position in the quiz
      question_id     TEXT,                         -- stable identifier when available
      subject         TEXT,                         -- per-item subject (for diagnostics with mixed subjects)
      domain          TEXT,                         -- GED content domain  (e.g. "algebra", "reading")
      topic           TEXT,                         -- finer-grained topic (e.g. "linear-equations")
      challenge_tags  TEXT[],                       -- array of challenge tags
      user_answer     TEXT,                         -- what the student selected / typed
      correct_answer  TEXT,                         -- the expected answer
      is_correct      BOOLEAN NOT NULL DEFAULT FALSE,
      confidence      TEXT,                         -- 'sure', 'guessing', or NULL
      time_spent_ms   INTEGER,                      -- milliseconds on this question
      question_type   TEXT,                         -- 'multiple-choice', 'fill-in', 'numeric', 'multi-select', 'short-response'
      points_earned   REAL DEFAULT 0,
      points_possible REAL DEFAULT 1
    );
  `);

  // Indexes
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_qai_attempt   ON quiz_attempt_items (attempt_id);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_qai_user_date ON quiz_attempt_items (attempt_id, is_correct);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_qai_domain    ON quiz_attempt_items (domain) WHERE domain IS NOT NULL;`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_qai_topic     ON quiz_attempt_items (topic)  WHERE topic  IS NOT NULL;`
  );
}

module.exports = ensureQuizAttemptItemsTable;
