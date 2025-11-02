const db = require('../db');

/**
 * Ensure the essay_scores table exists. We persist ONLY the total essay score
 * per submission to keep storage minimal. Trait-level details remain ephemeral
 * in the API response and are not stored.
 *
 * Schema:
 *   id SERIAL PRIMARY KEY
 *   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
 *   total_score INTEGER NOT NULL -- 0..6 scale
 *   prompt_id TEXT NULL          -- optional identifier for the prompt/topic
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
  await db.query(`ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS prompt_id TEXT;`);
  await db.query(`ALTER TABLE essay_scores ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();`);
  await db.query(`CREATE INDEX IF NOT EXISTS idx_essay_scores_user_created_at ON essay_scores (user_id, created_at DESC);`);
}

module.exports = ensureEssayScoresTable;
