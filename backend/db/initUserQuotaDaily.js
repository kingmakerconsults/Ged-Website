// db/initUserQuotaDaily.js
// Per-user, per-day generation quotas (Commit B).
const db = require('../db');

async function ensureUserQuotaDailyTable() {
  await db.none(`
    CREATE TABLE IF NOT EXISTS user_quota_daily (
      user_id INTEGER NOT NULL,
      date    DATE    NOT NULL,
      kind    TEXT    NOT NULL,
      used           INTEGER NOT NULL DEFAULT 0,
      granted_bonus  INTEGER NOT NULL DEFAULT 0,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, date, kind)
    );
    CREATE INDEX IF NOT EXISTS user_quota_daily_user_date_idx
      ON user_quota_daily(user_id, date);
  `);
  console.log('[init] user_quota_daily table ensured');
}

module.exports = ensureUserQuotaDailyTable;
