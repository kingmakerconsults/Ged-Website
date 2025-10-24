const db = require('../db');

module.exports = async function devAuth(req, res, next) {
  if (!req.userId) {
    const existingUserId = req.user?.userId || req.user?.sub;
    if (existingUserId) {
      req.userId = Number(existingUserId);
      req.userEmail = req.user?.email || req.user?.userEmail || null;
      return next();
    }
  } else {
    return next();
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  const email = req.headers['x-dev-email'];
  if (!email) {
    return res.status(401).json({ error: 'Unauthenticated (dev). Add x-dev-email header.' });
  }

  try {
    let user = await db.oneOrNone('SELECT id, email, name FROM users WHERE email = $1', [email]);
    if (!user) {
      user = await db.oneOrNone('INSERT INTO users (email, name) VALUES ($1, NULL) RETURNING id, email, name', [email]);
    }
    req.userId = user.id;
    req.userEmail = user.email;
    return next();
  } catch (e) {
    console.error('devAuth error:', e);
    return res.status(500).json({ error: 'Auth error' });
  }
};
