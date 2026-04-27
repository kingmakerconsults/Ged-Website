const db = require('./db');

/**
 * Best-effort notification dispatcher. Inserts one row per recipient.
 * Never throws — callers should not block their primary action on
 * notification delivery.
 */

async function notifyUser(userId, { type, title, body, link, payload }) {
  if (!userId || !type || !title) return null;
  try {
    const r = await db.query(
      `INSERT INTO notifications (user_id, type, title, body, link, payload)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        userId,
        String(type).slice(0, 64),
        String(title).slice(0, 200),
        body ? String(body).slice(0, 1000) : null,
        link ? String(link).slice(0, 500) : null,
        payload || null,
      ]
    );
    return r.rows[0]?.id || null;
  } catch (err) {
    console.warn('[notify] insert failed:', err.message);
    return null;
  }
}

async function notifyUsers(userIds, payload) {
  if (!Array.isArray(userIds) || userIds.length === 0) return 0;
  let count = 0;
  for (const id of userIds) {
    const ok = await notifyUser(id, payload);
    if (ok) count++;
  }
  return count;
}

/**
 * Notify every instructor in the given organization (excluding the
 * reporting student themselves, in case they happen to also be staff).
 */
async function notifyInstructorsInOrg(organizationId, excludeUserId, payload) {
  if (!organizationId) return 0;
  try {
    const { rows } = await db.query(
      `SELECT id FROM users
        WHERE organization_id = $1
          AND LOWER(COALESCE(role, '')) IN ('instructor','teacher','org_admin','admin')
          AND ($2::int IS NULL OR id <> $2)`,
      [organizationId, excludeUserId || null]
    );
    return await notifyUsers(
      rows.map((r) => r.id),
      payload
    );
  } catch (err) {
    console.warn('[notify] instructor lookup failed:', err.message);
    return 0;
  }
}

module.exports = {
  notifyUser,
  notifyUsers,
  notifyInstructorsInOrg,
};
