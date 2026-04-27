const assert = require('assert');
const { test, describe } = require('node:test');

const {
  _hash,
  _newRawToken,
  canOrgAcceptNewMember,
} = require('../src/authTokens');

describe('authTokens helpers', () => {
  test('_hash returns 64-char hex (sha256)', () => {
    const h = _hash('hello');
    assert.match(h, /^[0-9a-f]{64}$/);
  });

  test('_hash is deterministic', () => {
    assert.strictEqual(_hash('abc'), _hash('abc'));
    assert.notStrictEqual(_hash('abc'), _hash('abcd'));
  });

  test('_newRawToken produces 64-char hex', () => {
    const t = _newRawToken();
    assert.match(t, /^[0-9a-f]{64}$/);
  });

  test('two raw tokens differ', () => {
    assert.notStrictEqual(_newRawToken(), _newRawToken());
  });
});

// Mock DB harness for canOrgAcceptNewMember.
function mockDb(handler) {
  return { query: async (sql, params) => handler(sql, params) };
}

describe('canOrgAcceptNewMember', () => {
  test('returns ok when seat_limit is NULL (unlimited)', async () => {
    const db = mockDb(async (sql) => {
      if (/FROM organizations/i.test(sql)) {
        return { rowCount: 1, rows: [{ id: 1, name: 'x', plan_tier: 'legacy', seat_limit: null, subscription_status: 'active', expires_at: null }] };
      }
      return { rowCount: 0, rows: [{ count: 0 }] };
    });
    const r = await canOrgAcceptNewMember(db, 1);
    assert.strictEqual(r.ok, true);
  });

  test('blocks when subscription canceled', async () => {
    const db = mockDb(async () => ({ rowCount: 1, rows: [{ id: 1, plan_tier: 'pro', seat_limit: 10, subscription_status: 'canceled' }] }));
    const r = await canOrgAcceptNewMember(db, 1);
    assert.strictEqual(r.ok, false);
    assert.strictEqual(r.reason, 'subscription_canceled');
  });

  test('blocks unknown organization', async () => {
    const db = mockDb(async () => ({ rowCount: 0, rows: [] }));
    const r = await canOrgAcceptNewMember(db, 999);
    assert.strictEqual(r.ok, false);
    assert.strictEqual(r.reason, 'org_not_found');
  });
});
