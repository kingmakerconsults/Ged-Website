/**
 * Phase 1.5/1.6 helpers — token issuance + seat enforcement.
 *
 * Pure data-layer module. Endpoints in server.js wire these up only when
 * the matching feature flags are enabled.
 *
 * Tokens follow the standard "store hash, return raw" pattern: the raw token
 * is sent to the user (e.g. via email link) and never stored. The DB only
 * holds SHA-256 of the token, so a DB leak does not let an attacker mint
 * verified accounts or reset passwords.
 */

const crypto = require('crypto');

const TOKEN_BYTES = 32; // 256-bit raw token => 64-char hex
const VERIFY_TTL_HOURS = 72; // verify links live 3 days
const RESET_TTL_HOURS = 1; // reset links live 1 hour (industry norm)

function _hash(token) {
  return crypto
    .createHash('sha256')
    .update(String(token), 'utf8')
    .digest('hex');
}

function _newRawToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('hex');
}

/**
 * Issue a one-time auth token of the given purpose and persist its hash.
 * Returns the raw token (caller emails it). Caller is responsible for revoking
 * any older unused tokens of the same purpose for this user (we do that here).
 *
 * @param {{ query: Function }} db
 * @param {object} opts
 * @param {number} opts.userId
 * @param {'email_verify'|'password_reset'} opts.purpose
 * @param {object} [opts.req] - express req for ip/ua capture
 * @returns {Promise<{ token: string, expiresAt: Date }>}
 */
async function issueAuthToken(db, { userId, purpose, req }) {
  if (!userId || !purpose)
    throw new Error('issueAuthToken: userId and purpose required');
  const ttlHours =
    purpose === 'password_reset' ? RESET_TTL_HOURS : VERIFY_TTL_HOURS;
  const expiresAt = new Date(Date.now() + ttlHours * 3600 * 1000);
  const raw = _newRawToken();
  const hash = _hash(raw);

  // Invalidate prior unused tokens for the same purpose so a user can only
  // hold one live link at a time. Reduces phishing / replay surface.
  await db.query(
    `UPDATE auth_tokens
        SET used_at = NOW()
      WHERE user_id = $1 AND purpose = $2 AND used_at IS NULL`,
    [userId, purpose]
  );

  const ip = (req?.ip || '').slice(0, 64);
  const ua = String(req?.headers?.['user-agent'] || '').slice(0, 1024);

  await db.query(
    `INSERT INTO auth_tokens (user_id, purpose, token_hash, expires_at, ip, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [userId, purpose, hash, expiresAt, ip || null, ua || null]
  );

  return { token: raw, expiresAt };
}

/**
 * Look up a token by raw value, ensure it's unused + unexpired + matches the
 * expected purpose. Returns the auth_tokens row + user row, or null.
 * DOES NOT mark the token used — caller should call markTokenUsed() inside
 * the same transaction as the action it gates.
 */
async function findValidToken(db, { token, purpose }) {
  if (!token || !purpose) return null;
  const hash = _hash(token);
  const result = await db.query(
    `SELECT t.id, t.user_id, t.purpose, t.expires_at, t.used_at,
            u.id AS u_id, u.email, u.email_verified, u.role, u.organization_id
       FROM auth_tokens t
       JOIN users u ON u.id = t.user_id
      WHERE t.token_hash = $1
        AND t.purpose = $2
      LIMIT 1`,
    [hash, purpose]
  );
  if (!result.rowCount) return null;
  const row = result.rows[0];
  if (row.used_at) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) return null;
  return row;
}

async function markTokenUsed(db, tokenId) {
  await db.query(`UPDATE auth_tokens SET used_at = NOW() WHERE id = $1`, [
    tokenId,
  ]);
}

/**
 * Phase 1.6 — seat-limit check.
 *
 * Returns { ok: true } when the org can accept ONE MORE NEW member, or
 * { ok: false, reason } when at cap.
 *
 * GRANDFATHERING: existing members of the org are always counted; the cap
 * only blocks NEW joins. This function is purely a "can a NEW user join"
 * check. To check whether an existing user can stay, callers should not call
 * this function — existing members are never evicted by seat policy.
 */
async function canOrgAcceptNewMember(db, organizationId) {
  if (!organizationId) return { ok: false, reason: 'no_organization' };
  const orgRes = await db.query(
    `SELECT id, name, plan_tier, seat_limit, subscription_status, expires_at
       FROM organizations WHERE id = $1`,
    [organizationId]
  );
  if (!orgRes.rowCount) return { ok: false, reason: 'org_not_found' };
  const org = orgRes.rows[0];

  if (org.subscription_status === 'canceled') {
    return { ok: false, reason: 'subscription_canceled' };
  }
  if (org.expires_at && new Date(org.expires_at).getTime() < Date.now()) {
    return { ok: false, reason: 'subscription_expired' };
  }
  if (org.seat_limit == null) {
    // Unlimited (legacy default).
    return { ok: true, used: null, limit: null };
  }
  const countRes = await db.query(
    `SELECT COUNT(*)::int AS used
       FROM users
      WHERE organization_id = $1
        AND deactivated_at IS NULL`,
    [organizationId]
  );
  const used = countRes.rows[0]?.used || 0;
  if (used >= org.seat_limit) {
    return {
      ok: false,
      reason: 'seat_limit_reached',
      used,
      limit: org.seat_limit,
    };
  }
  return { ok: true, used, limit: org.seat_limit };
}

module.exports = {
  issueAuthToken,
  findValidToken,
  markTokenUsed,
  canOrgAcceptNewMember,
  // exported for tests
  _hash,
  _newRawToken,
};
