const db = require('../db');

/**
 * In-app notifications, scoped per recipient user.
 *
 *   type:    short canonical event id (e.g. 'question_report')
 *   link:    optional client-side route hint (e.g. '/instructor#reports/42')
 *   payload: JSONB blob with whatever extra data the UI needs to render
 *   read_at: NULL while unread; set when the user (or a "mark all" call)
 *            acknowledges it
 */
async function ensureNotificationsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type       TEXT NOT NULL,
      title      TEXT NOT NULL,
      body       TEXT,
      link       TEXT,
      payload    JSONB,
      read_at    TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
       ON notifications (user_id, created_at DESC)
       WHERE read_at IS NULL;`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_notifications_user_recent
       ON notifications (user_id, created_at DESC);`
  );
}

module.exports = ensureNotificationsTable;
