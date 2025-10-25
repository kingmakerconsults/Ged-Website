const express = require('express');
const db = require('../db');

const router = express.Router();

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function secretConfigured() {
  return typeof process.env.ADMIN_MAINTENANCE_SECRET === 'string' && process.env.ADMIN_MAINTENANCE_SECRET.length > 0;
}

router.post('/wipe-users', async (req, res) => {
  try {
    if (isProduction()) {
      if (!secretConfigured()) {
        return res.status(403).json({ error: 'Maintenance endpoint disabled' });
      }
      const providedSecret = req.headers['x-admin-maintenance-secret'];
      if (providedSecret !== process.env.ADMIN_MAINTENANCE_SECRET) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else if (secretConfigured()) {
      const providedSecret = req.headers['x-admin-maintenance-secret'];
      if (providedSecret !== process.env.ADMIN_MAINTENANCE_SECRET) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    }

    const operatorEmail = String(req.headers['x-operator-email'] || '').trim() || 'unknown@operator';
    console.log(`[Maintenance] wipe-users invoked by ${operatorEmail} at ${new Date().toISOString()}`);

    await db.query('TRUNCATE TABLE IF EXISTS sessions RESTART IDENTITY');
    await db.query(
      'TRUNCATE TABLE auth_identities, profile_challenges, assessment_scores, profiles, users RESTART IDENTITY CASCADE'
    );

    return res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/admin/wipe-users error:', err);
    return res.status(500).json({ error: 'Failed to wipe users' });
  }
});

module.exports = router;
