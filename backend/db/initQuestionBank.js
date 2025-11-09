// db/initQuestionBank.js
const db = require('./index');

async function ensureQuestionBankTable() {
  await db.none(`
    CREATE TABLE IF NOT EXISTS ai_question_bank (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      fingerprint TEXT NOT NULL,
      subject TEXT NOT NULL,
      topic TEXT,
      source_model TEXT,
      generated_for_user_id UUID,
      origin_quiz_id TEXT,
      question_json JSONB NOT NULL,
      times_served INTEGER NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE UNIQUE INDEX IF NOT EXISTS ai_question_bank_fingerprint_idx
      ON ai_question_bank(fingerprint);
  `);
  console.log('[init] ai_question_bank table ensured');
}

module.exports = ensureQuestionBankTable;
