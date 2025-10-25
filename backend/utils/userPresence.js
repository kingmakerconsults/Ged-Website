const db = require('../db');

async function assertUserIsActive(userId) {
    if (!userId) {
        return false;
    }

    try {
        const { rows } = await db.query(
            `SELECT (NOW() - last_seen_at) < INTERVAL '2 minutes' AS is_active
               FROM users
              WHERE id = $1`,
            [userId]
        );

        if (!rows || rows.length === 0) {
            return false;
        }

        return !!rows[0].is_active;
    } catch (err) {
        console.error('[assertUserIsActive] failed:', err?.message || err);
        return false;
    }
}

module.exports = {
    assertUserIsActive
};
