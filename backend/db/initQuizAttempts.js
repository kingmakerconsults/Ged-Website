const db = require('../db');

async function ensureQuizAttemptsTable() {
    await db.query(`
        CREATE TABLE IF NOT EXISTS quiz_attempts (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            subject TEXT NOT NULL,
            quiz_code TEXT NOT NULL,
            quiz_title TEXT NOT NULL,
            quiz_type TEXT,
            score INTEGER,
            total_questions INTEGER,
            scaled_score INTEGER,
            passed BOOLEAN DEFAULT FALSE,
            attempted_at TIMESTAMPTZ DEFAULT NOW()
        );
    `);

    await db.query(`ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS quiz_type TEXT;`);
    await db.query(`ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS quiz_code TEXT;`);
    await db.query(`ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS quiz_title TEXT;`);
    await db.query(`ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS score INTEGER;`);
    await db.query(`ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS total_questions INTEGER;`);
    await db.query(`ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS scaled_score INTEGER;`);
    await db.query(`ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS passed BOOLEAN DEFAULT FALSE;`);
    await db.query(`ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS attempted_at TIMESTAMPTZ DEFAULT NOW();`);

    await db.query(`CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_attempted_at ON quiz_attempts (user_id, attempted_at DESC);`);
}

module.exports = ensureQuizAttemptsTable;
