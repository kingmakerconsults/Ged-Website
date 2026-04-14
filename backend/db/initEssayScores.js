const db = require('../db');

/**
 * Ensure the essay_scores table exists with full trait-level detail.
 *
 * Schema:
 *   id SERIAL PRIMARY KEY
 *   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
 *   total_score INTEGER NOT NULL -- 0..6 scale (sum of 3 traits)
 *   trait1_score SMALLINT        -- Argument & Evidence  (0-2)
 *   trait2_score SMALLINT        -- Organization          (0-2)
 *   trait3_score SMALLINT        -- Command of English    (0-2)
 *   feedback JSONB               -- full AI feedback (trait feedback, strengths, nextSteps, overallFeedback)
 *   prompt_id TEXT NULL          -- optional identifier for the prompt/topic
 *   word_count INTEGER           -- essay word count at submission
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 */
async function ensureEssayScoresTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS essay_scores (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      total_score INTEGER NOT NULL,
      prompt_id TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // Defensive ALTERs in case the table pre-existed with a partial schema
  await db.query(
    `ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS prompt_id TEXT;`
  );
  await db.query(
    `ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();`
  );
  // New trait-level columns
  await db.query(
    `ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS trait1_score SMALLINT;`
  );
  await db.query(
    `ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS trait2_score SMALLINT;`
  );
  await db.query(
    `ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS trait3_score SMALLINT;`
  );
  await db.query(
    `ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS feedback JSONB;`
  );
  await db.query(
    `ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS word_count INTEGER;`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_essay_scores_user_created_at ON essay_scores (user_id, created_at DESC);`
  );
}

module.exports = ensureEssayScoresTable;
