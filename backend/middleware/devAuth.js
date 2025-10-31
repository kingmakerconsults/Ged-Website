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
      `INSERT INTO users (email, name, role)
       VALUES ($1, $2, 'student')
       RETURNING id, email, name`,
      [email, name]
    );
  }
  return user;
}

async function upsertUserByExternalIdentity(provider, providerUserId, email = null, name = null) {
  if (!provider || !providerUserId) return null;
  const existing = await db.oneOrNone(
    `SELECT u.id, u.email, u.name
       FROM auth_identities ai
       JOIN users u ON u.id = ai.user_id
      WHERE ai.provider = $1 AND ai.provider_user_id = $2
      LIMIT 1`,
    [provider, providerUserId]
  );
  if (existing) return existing;

  const created = await db.oneOrNone(
    `INSERT INTO users (email, name, role)
     VALUES ($1, $2, 'student')
     RETURNING id, email, name`,
    [email, name]
  );

  if (created && created.id) {
    await db.query(
      `INSERT INTO auth_identities (user_id, provider, provider_user_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (provider, provider_user_id) DO NOTHING`,
      [created.id, provider, providerUserId]
    );
  }

  return created;
}

async function ensureProfile(userId) {
  if (!userId) return;
  try {
    await db.query(
      `INSERT INTO profiles (user_id, timezone)
       VALUES ($1, 'America/New_York')
       ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    );
  } catch (e) {
    try {
      await db.query(
        `INSERT INTO profiles (user_id)
         VALUES ($1)
         ON CONFLICT (user_id) DO NOTHING`,
        [userId]
      );
    } catch (_) {}
  }
}

module.exports = async function devAuth(req, res, next) {
  if (normaliseUser(req, req.user)) {
    await ensureProfile(req.user.id);
    return next();
  }

  if (normaliseUser(req, { id: req.userId, email: req.userEmail })) {
    await ensureProfile(req.user.id);
    return next();
  }

  const headerUserId = req.user?.userId || req.user?.sub || req.user?.user_id;
  if (normaliseUser(req, { id: headerUserId, email: req.user?.email || req.user?.userEmail })) {
    await ensureProfile(req.user.id);
    return next();
  }

  // 1) Try cookie/header app token first
  try {
    const secret = process.env.JWT_SECRET;
    const cookieToken = req.cookies && req.cookies.appToken ? req.cookies.appToken : null;
    const headerToken = req.headers['x-app-token'] || null;
    const rawToken = cookieToken || headerToken || null;
    if (rawToken && secret) {
      try {
        const payload = jwt.verify(rawToken, secret);
        const sub = payload?.sub ?? payload?.userId ?? payload?.user_id ?? null;
        const email = payload?.email || null;
        if (sub) {
          if (normaliseUser(req, { id: sub, email })) {
            await ensureProfile(req.user.id);
            return next();
          }
        }
        if (!sub && email) {
          const user = await upsertUserByEmail(email);
          if (normaliseUser(req, user)) {
            await ensureProfile(req.user.id);
            return next();
          }
        }
      } catch (_) {
        // ignore token errors; fall through
      }
    }
  } catch (_) {}

  // 2) Try Authorization: Bearer <JWT>
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
            await ensureProfile(req.user.id);
            return next();
          }
        }
        if (!sub && email) {
          const user = await upsertUserByEmail(email);
          if (normaliseUser(req, user)) {
            await ensureProfile(req.user.id);
            return next();
          }
        }
      } catch (_) {
        // ignore token errors; fall through to header-based identities
      }
    }
  } catch (_) {}

  // 3) Try explicit headers for dev/local: x-user-email / x-dev-email / x-auth-email
  const email = req.headers['x-user-email'] || req.headers['x-dev-email'] || req.headers['x-auth-email'];
  if (email) {
    try {
      const user = await upsertUserByEmail(email);
      if (normaliseUser(req, user)) {
        await ensureProfile(req.user.id);
        return next();
      }
    } catch (e) {
      console.error('devAuth error (email):', e);
      return res.status(500).json({ error: 'Auth error' });
    }
  }

  // 4) Try external identity headers: x-user-sub + x-auth-provider
  const extSub = req.headers['x-user-sub'];
  const extProvider = req.headers['x-auth-provider'];
  if (extSub && extProvider) {
    try {
      const user = await upsertUserByExternalIdentity(String(extProvider), String(extSub));
      if (normaliseUser(req, user)) {
        await ensureProfile(req.user.id);
        return next();
      }
    } catch (e) {
      console.error('devAuth error (external id):', e);
      return res.status(500).json({ error: 'Auth error' });
    }
  }

  // 5) Fallback to dev id
  const fallbackIdRaw =
    process.env.DEV_AUTH_USER_ID || process.env.FALLBACK_USER_ID || process.env.TEST_USER_ID || '1';
  const fallbackId = /^[0-9]+$/.test(String(fallbackIdRaw)) ? Number(fallbackIdRaw) : fallbackIdRaw;
  normaliseUser(req, { id: fallbackId });
  await ensureProfile(req.user.id);
  return next();
};
