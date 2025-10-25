const db = require('../db');

function normaliseUser(req, user) {
  if (!req.user) {
    req.user = {};
  }

  const id = user?.id;
  if (id === undefined || id === null || id === '') {
    return false;
  }

  const numericId = typeof id === 'string' && /^[0-9]+$/.test(id) ? Number(id) : id;

  req.user.id = numericId;
  req.user.userId = numericId;
  req.user.user_id = numericId;
  if (user?.email) {
    req.user.email = user.email;
  }

  req.userId = numericId;
  if (user?.email) {
    req.userEmail = user.email;
  }

  console.log('[devAuth] req.user =', req.user);

  return true;
}

module.exports = async function devAuth(req, res, next) {
  if (normaliseUser(req, req.user)) {
    return next();
  }

  if (normaliseUser(req, { id: req.userId, email: req.userEmail })) {
    return next();
  }

  const headerUserId = req.user?.userId || req.user?.sub || req.user?.user_id;
  if (normaliseUser(req, { id: headerUserId, email: req.user?.email || req.user?.userEmail })) {
    return next();
  }

  const fallbackIdRaw =
    process.env.DEV_AUTH_USER_ID || process.env.FALLBACK_USER_ID || process.env.TEST_USER_ID || '1';
  const fallbackId = /^[0-9]+$/.test(String(fallbackIdRaw)) ? Number(fallbackIdRaw) : fallbackIdRaw;

  if (process.env.NODE_ENV === 'production') {
    normaliseUser(req, { id: fallbackId });
    return next();
  }

  const email = req.headers['x-dev-email'];
  if (!email) {
    normaliseUser(req, { id: fallbackId });
    return next();
  }

  try {
    let user = await db.oneOrNone('SELECT id, email, name FROM users WHERE email = $1', [email]);
    if (!user) {
      user = await db.oneOrNone(
        'INSERT INTO users (email, name) VALUES ($1, NULL) RETURNING id, email, name',
        [email]
      );
    }

    if (!normaliseUser(req, user)) {
      normaliseUser(req, { id: fallbackId });
    }

    return next();
  } catch (e) {
    console.error('devAuth error:', e);
    return res.status(500).json({ error: 'Auth error' });
  }
};
