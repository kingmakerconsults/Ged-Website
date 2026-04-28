// Tests for src/quotas.js — daily generation quota logic.
//
// Uses a mock db that simulates the user_quota_daily table with a small
// in-memory map keyed by (user_id, date, kind).

const assert = require('assert');
const { test, describe } = require('node:test');

const {
  DAILY_LIMITS,
  QuotaExceededError,
  getQuotaState,
  consumeQuota,
  grantBonus,
  isKnownKind,
} = require('../src/quotas');

// Build a mock pg pool whose .query(sql, params) reproduces the SQL used
// by quotas.js: a SELECT, an INSERT … ON CONFLICT DO UPDATE … WHERE used
// < limit (returns 0 rows when capped), and an INSERT … ON CONFLICT DO
// UPDATE granted_bonus.
function buildMockDb({ today = '2026-04-29' } = {}) {
  // key = `${userId}|${date}|${kind}` -> { used, granted_bonus }
  const rows = new Map();
  const state = { today };
  const keyOf = (uid, date, kind) => `${uid}|${date}|${kind}`;

  const db = {
    rows,
    get today() {
      return state.today;
    },
    set today(v) {
      state.today = v;
    },
    async query(sql, params) {
      // SELECT date::text, kind, used, granted_bonus FROM user_quota_daily WHERE user_id = $1 AND date = CURRENT_DATE
      if (/SELECT[\s\S]+FROM user_quota_daily/i.test(sql)) {
        const [userId] = params;
        const out = [];
        for (const [k, v] of rows.entries()) {
          const [uid, date, kind] = k.split('|');
          if (Number(uid) === Number(userId) && date === state.today) {
            out.push({
              date: state.today,
              kind,
              used: v.used,
              granted_bonus: v.granted_bonus,
            });
          }
        }
        return { rows: out };
      }

      // INSERT INTO user_quota_daily ... (used) VALUES ($1, CURRENT_DATE, $2, 1) ON CONFLICT ... DO UPDATE SET used = used + 1 ... WHERE used < ($3::int + granted_bonus) RETURNING used, granted_bonus
      if (
        /INSERT INTO user_quota_daily[\s\S]+used = user_quota_daily\.used \+ 1/i.test(
          sql
        )
      ) {
        const [userId, kind, limit] = params;
        const k = keyOf(userId, state.today, kind);
        const existing = rows.get(k);
        if (!existing) {
          rows.set(k, { used: 1, granted_bonus: 0 });
          return { rows: [{ used: 1, granted_bonus: 0 }] };
        }
        const cap = Number(limit) + Number(existing.granted_bonus);
        if (existing.used < cap) {
          existing.used += 1;
          return {
            rows: [
              { used: existing.used, granted_bonus: existing.granted_bonus },
            ],
          };
        }
        // Capped — UPDATE WHERE filtered, no row returned.
        return { rows: [] };
      }

      // INSERT INTO user_quota_daily ... (granted_bonus) VALUES ($1, CURRENT_DATE, $2, $3) ON CONFLICT ... DO UPDATE SET granted_bonus = granted_bonus + EXCLUDED.granted_bonus
      if (
        /INSERT INTO user_quota_daily[\s\S]+granted_bonus = user_quota_daily\.granted_bonus/i.test(
          sql
        )
      ) {
        const [userId, kind, amount] = params;
        const k = keyOf(userId, state.today, kind);
        const existing = rows.get(k);
        if (!existing) {
          rows.set(k, { used: 0, granted_bonus: Number(amount) });
        } else {
          existing.granted_bonus += Number(amount);
        }
        return { rows: [] };
      }

      throw new Error(`Unexpected SQL in mock db: ${sql.slice(0, 80)}…`);
    },
  };
  return db;
}

describe('quotas: helpers', () => {
  test('DAILY_LIMITS is the expected shape', () => {
    assert.strictEqual(DAILY_LIMITS.comprehensive, 2);
    assert.strictEqual(DAILY_LIMITS.ai_topic, 4);
  });

  test('isKnownKind validates kinds', () => {
    assert.strictEqual(isKnownKind('comprehensive'), true);
    assert.strictEqual(isKnownKind('ai_topic'), true);
    assert.strictEqual(isKnownKind('coach'), false);
    assert.strictEqual(isKnownKind(''), false);
    assert.strictEqual(isKnownKind(null), false);
  });
});

describe('quotas: getQuotaState', () => {
  test('returns full daily limits when no rows exist', async () => {
    const db = buildMockDb();
    const state = await getQuotaState(db, 42);
    assert.strictEqual(state.kinds.comprehensive.used, 0);
    assert.strictEqual(state.kinds.comprehensive.total, 2);
    assert.strictEqual(state.kinds.comprehensive.remaining, 2);
    assert.strictEqual(state.kinds.ai_topic.used, 0);
    assert.strictEqual(state.kinds.ai_topic.remaining, 4);
  });

  test('reflects used + granted_bonus', async () => {
    const db = buildMockDb();
    db.rows.set(`7|${db.today}|comprehensive`, { used: 1, granted_bonus: 3 });
    const state = await getQuotaState(db, 7);
    assert.strictEqual(state.kinds.comprehensive.used, 1);
    assert.strictEqual(state.kinds.comprehensive.granted_bonus, 3);
    assert.strictEqual(state.kinds.comprehensive.total, 5); // 2 + 3
    assert.strictEqual(state.kinds.comprehensive.remaining, 4);
  });
});

describe('quotas: consumeQuota', () => {
  test('first 2 comprehensive consumes succeed, third throws', async () => {
    const db = buildMockDb();
    await consumeQuota(db, 11, 'comprehensive');
    await consumeQuota(db, 11, 'comprehensive');
    await assert.rejects(
      () => consumeQuota(db, 11, 'comprehensive'),
      (err) =>
        err instanceof QuotaExceededError &&
        err.kind === 'comprehensive' &&
        err.state.kinds.comprehensive.remaining === 0
    );
  });

  test('granted_bonus extends the cap', async () => {
    const db = buildMockDb();
    // Pre-grant +2 on top of the base 2 → cap of 4.
    await grantBonus(db, 22, 'comprehensive', 2);
    for (let i = 0; i < 4; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await consumeQuota(db, 22, 'comprehensive');
    }
    await assert.rejects(
      () => consumeQuota(db, 22, 'comprehensive'),
      QuotaExceededError
    );
  });

  test('ai_topic and comprehensive caps are independent', async () => {
    const db = buildMockDb();
    for (let i = 0; i < 4; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await consumeQuota(db, 33, 'ai_topic');
    }
    await assert.rejects(() => consumeQuota(db, 33, 'ai_topic'), QuotaExceededError);
    // Comprehensive still untouched.
    const ok = await consumeQuota(db, 33, 'comprehensive');
    assert.strictEqual(ok.ok, true);
  });

  test('rejects unknown kinds', async () => {
    const db = buildMockDb();
    await assert.rejects(() => consumeQuota(db, 1, 'coach'), /unknown kind/i);
  });
});

describe('quotas: grantBonus', () => {
  test('1..5 are accepted, 0 / 6 / non-int are rejected', async () => {
    const db = buildMockDb();
    await grantBonus(db, 5, 'ai_topic', 1);
    await grantBonus(db, 5, 'ai_topic', 5);
    await assert.rejects(() => grantBonus(db, 5, 'ai_topic', 0), /1\.\.5/);
    await assert.rejects(() => grantBonus(db, 5, 'ai_topic', 6), /1\.\.5/);
    await assert.rejects(() => grantBonus(db, 5, 'ai_topic', 1.5), /1\.\.5/);
  });

  test('rejects unknown kinds', async () => {
    const db = buildMockDb();
    await assert.rejects(
      () => grantBonus(db, 1, 'coach', 2),
      /unknown kind/i
    );
  });

  test('grantBonus accumulates across calls', async () => {
    const db = buildMockDb();
    await grantBonus(db, 99, 'comprehensive', 1);
    await grantBonus(db, 99, 'comprehensive', 2);
    const state = await getQuotaState(db, 99);
    assert.strictEqual(state.kinds.comprehensive.granted_bonus, 3);
    assert.strictEqual(state.kinds.comprehensive.total, 5);
  });
});

describe('quotas: midnight rollover (mock CURRENT_DATE)', () => {
  test('a fresh date returns full quota even if previous date was capped', async () => {
    const db = buildMockDb({ today: '2026-04-29' });
    for (let i = 0; i < 2; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await consumeQuota(db, 77, 'comprehensive');
    }
    await assert.rejects(
      () => consumeQuota(db, 77, 'comprehensive'),
      QuotaExceededError
    );
    // Roll the date forward.
    db.today = '2026-04-30';
    const state = await getQuotaState(db, 77);
    assert.strictEqual(state.kinds.comprehensive.used, 0);
    assert.strictEqual(state.kinds.comprehensive.remaining, 2);
  });
});
