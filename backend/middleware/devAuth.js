const db = require('../db');
const jwt = require('jsonwebtoken');

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

async function upsertUserByEmail(email, name = null) {
  if (!email) return null;
  let user = await db.oneOrNone('SELECT id, email, name FROM users WHERE email = $1', [email]);
  if (!user) {
    user = await db.oneOrNone(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name',
      [email, name]
    );
  }
  return user;
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

  // 1) Try Authorization: Bearer <JWT>
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length).trim() : null;
    const secret = process.env.JWT_SECRET;
    if (token && secret) {
      try {
        const payload = jwt.verify(token, secret);
        const sub = payload?.sub ?? payload?.userId ?? payload?.user_id ?? null;
        const email = payload?.email || null;
        if (sub) {
          if (normaliseUser(req, { id: sub, email })) {
            return next();
          }
        }
        if (!sub && email) {
          const user = await upsertUserByEmail(email);
          if (normaliseUser(req, user)) {
            return next();
          }
        }
      } catch (e) {
        // ignore token errors; fall through to header-based dev identity
      }
    }
  } catch (e) {
    // ignore
  }

  // 2) Try explicit headers for dev/local: x-user-email / x-dev-email / x-auth-email
  const email = req.headers['x-user-email'] || req.headers['x-dev-email'] || req.headers['x-auth-email'];
  if (!email) {
    const fallbackIdRaw =
      process.env.DEV_AUTH_USER_ID || process.env.FALLBACK_USER_ID || process.env.TEST_USER_ID || '1';
    const fallbackId = /^[0-9]+$/.test(String(fallbackIdRaw)) ? Number(fallbackIdRaw) : fallbackIdRaw;
    normaliseUser(req, { id: fallbackId });
    return next();
  }

  try {
    const user = await upsertUserByEmail(email);

    if (!normaliseUser(req, user)) {
      normaliseUser(req, { id: fallbackId });
    }

    return next();
  } catch (e) {
    console.error('devAuth error:', e);
    return res.status(500).json({ error: 'Auth error' });
  }
};
