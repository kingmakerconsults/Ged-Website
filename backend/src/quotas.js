// src/quotas.js
// Daily generation quotas (Commit B).
//
// kinds:
//   - 'comprehensive' : 2 / day (full subject exams from /generate-quiz)
//   - 'ai_topic'      : 4 / day (smart topic quizzes from /api/generate/topic)
//
// Instructors / org-admins / super-admins can grant bonus attempts via
// POST /api/instructor/students/:userId/quota/replenish — those land in
// granted_bonus and stack on top of the daily limit. Quotas roll over at
// UTC midnight (CURRENT_DATE in Postgres uses the server timezone; deploy
// uses UTC).

const DAILY_LIMITS = Object.freeze({
  comprehensive: 2,
  ai_topic: 4,
});

class QuotaExceededError extends Error {
  constructor(kind, state) {
    super(`Quota exceeded for ${kind}`);
    this.name = 'QuotaExceededError';
    this.kind = kind;
    this.state = state;
  }
}

function isKnownKind(kind) {
  return Object.prototype.hasOwnProperty.call(DAILY_LIMITS, kind);
}

// db: pg Pool (uses .query). Returns { date, kinds: { comprehensive: {...}, ai_topic: {...} } }
async function getQuotaState(db, userId) {
  const numericUserId = Number(userId);
  if (!Number.isInteger(numericUserId)) {
    throw new Error('getQuotaState: invalid userId');
  }
  const { rows } = await db.query(
    `SELECT date::text AS date, kind, used, granted_bonus
       FROM user_quota_daily
      WHERE user_id = $1 AND date = CURRENT_DATE`,
    [numericUserId]
  );
  const today = new Date().toISOString().slice(0, 10);
  const byKind = {};
  for (const kind of Object.keys(DAILY_LIMITS)) {
    const row = rows.find((r) => r.kind === kind);
    const limit = DAILY_LIMITS[kind];
    const used = row ? Number(row.used) : 0;
    const grantedBonus = row ? Number(row.granted_bonus) : 0;
    const total = limit + grantedBonus;
    byKind[kind] = {
      limit,
      granted_bonus: grantedBonus,
      total,
      used,
      remaining: Math.max(0, total - used),
    };
  }
  return {
    date: rows[0]?.date || today,
    kinds: byKind,
    resets_at_utc_midnight: true,
  };
}

// Atomic upsert: increment used iff used < limit + granted_bonus.
// Returns { ok: true, state } on success, throws QuotaExceededError otherwise.
async function consumeQuota(db, userId, kind) {
  const numericUserId = Number(userId);
  if (!Number.isInteger(numericUserId)) {
    throw new Error('consumeQuota: invalid userId');
  }
  if (!isKnownKind(kind)) {
    throw new Error(`consumeQuota: unknown kind "${kind}"`);
  }
  const limit = DAILY_LIMITS[kind];

  // Single statement: insert if missing, increment iff under cap. Uses CTE
  // so we get atomicity without an explicit transaction.
  const sql = `
    WITH ins AS (
      INSERT INTO user_quota_daily (user_id, date, kind, used)
      VALUES ($1, CURRENT_DATE, $2, 1)
      ON CONFLICT (user_id, date, kind) DO UPDATE
        SET used = user_quota_daily.used + 1,
            updated_at = NOW()
        WHERE user_quota_daily.used < ($3::int + user_quota_daily.granted_bonus)
      RETURNING used, granted_bonus
    )
    SELECT used, granted_bonus FROM ins
  `;
  const { rows } = await db.query(sql, [numericUserId, kind, limit]);
  if (!rows.length) {
    // INSERT collided and the UPDATE WHERE clause filtered it out.
    const state = await getQuotaState(db, numericUserId);
    throw new QuotaExceededError(kind, state);
  }
  const state = await getQuotaState(db, numericUserId);
  return { ok: true, state };
}

// Used by instructor/org-admin/super replenish endpoint. Adds `amount` to
// granted_bonus for today. amount must be 1..5.
async function grantBonus(db, userId, kind, amount) {
  const numericUserId = Number(userId);
  const numericAmount = Number(amount);
  if (!Number.isInteger(numericUserId)) {
    throw new Error('grantBonus: invalid userId');
  }
  if (!isKnownKind(kind)) {
    throw new Error(`grantBonus: unknown kind "${kind}"`);
  }
  if (!Number.isInteger(numericAmount) || numericAmount < 1 || numericAmount > 5) {
    throw new Error('grantBonus: amount must be an integer 1..5');
  }
  await db.query(
    `INSERT INTO user_quota_daily (user_id, date, kind, granted_bonus)
     VALUES ($1, CURRENT_DATE, $2, $3)
     ON CONFLICT (user_id, date, kind) DO UPDATE
       SET granted_bonus = user_quota_daily.granted_bonus + EXCLUDED.granted_bonus,
           updated_at = NOW()`,
    [numericUserId, kind, numericAmount]
  );
  return getQuotaState(db, numericUserId);
}

module.exports = {
  DAILY_LIMITS,
  QuotaExceededError,
  getQuotaState,
  consumeQuota,
  grantBonus,
  isKnownKind,
};
