const jwt = require('jsonwebtoken');
const db = require('../../db');

function getCookieOptions(maxAgeMs) {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: maxAgeMs,
  };
}

function setAuthCookie(res, token, maxAgeMs = 12 * 60 * 60 * 1000) {
  res.cookie('auth', token, getCookieOptions(maxAgeMs));
}

function extractToken(req) {
  const cookieToken = req?.cookies?.auth;
  if (cookieToken) {
    return cookieToken;
  }

  const authorization = req?.headers?.authorization || '';
  if (authorization.startsWith('Bearer ')) {
    return authorization.slice('Bearer '.length).trim();
  }
  return null;
}

// Mirrors validateUserSession in server.js. Kept here so this middleware does
// not require a circular import. Both must stay in sync.
const SESSION_LAST_SEEN_BUMP_SECONDS = 30;

async function validateSessionForPayload(payload) {
  const sid = payload && typeof payload.sid === 'string' ? payload.sid : null;
  const userId = payload && (payload.sub ?? payload.userId ?? payload.user_id);
  if (!userId) {
    return { ok: false, reason: 'no_user' };
  }
  // Legacy tokens (issued by /api/login, /api/auth/google, etc.) do not
  // include a `sid` claim. Those endpoints don't write current_session_id
  // either, so single-session enforcement is opt-in: skip the DB check
  // entirely and accept the token, mirroring authenticateBearerToken.
  if (!sid) {
    return { ok: true };
  }
  try {
    const row = await db.oneOrNone(
      `SELECT current_session_id,
                    EXTRACT(EPOCH FROM (NOW() - COALESCE(last_seen_at, NOW()))) AS idle_seconds
               FROM users
              WHERE id = $1`,
      [userId]
    );
    if (!row) return { ok: false, reason: 'user_missing' };
    if (!row.current_session_id || row.current_session_id !== sid) {
      return { ok: false, reason: 'signed_in_elsewhere' };
    }
    const idle = Number(row.idle_seconds) || 0;
    if (idle > 2 * 60 * 60) {
      try {
        await db.query(
          `UPDATE users SET current_session_id = NULL WHERE id = $1`,
          [userId]
        );
      } catch (_) {}
      return { ok: false, reason: 'inactivity_timeout' };
    }
    if (idle > SESSION_LAST_SEEN_BUMP_SECONDS) {
      try {
        await db.query(`UPDATE users SET last_seen_at = NOW() WHERE id = $1`, [
          userId,
        ]);
      } catch (_) {}
    }
    return { ok: true };
  } catch (err) {
    // Fail open on transient DB errors so we don't lock everyone out.
    console.warn(
      '[auth] validateSessionForPayload failed:',
      err?.message || err
    );
    return { ok: true };
  }
}

function requireAuth(req, res, next) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error(
      'JWT_SECRET is not configured; authentication is unavailable.'
    );
    return res.status(500).json({ error: 'Authentication unavailable' });
  }

  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  validateSessionForPayload(payload)
    .then((result) => {
      if (!result.ok) {
        try {
          res.clearCookie('auth');
        } catch (_) {}
        return res
          .status(401)
          .json({ error: 'Unauthorized', reason: result.reason });
      }
      const normalizedId =
        payload?.sub ?? payload?.userId ?? payload?.user_id ?? null;
      const normalizedRole = payload?.role || 'student';
      const normalizedOrg = payload?.organization_id ?? null;
      const normalizedEmail = payload?.email || null;

      req.user = {
        ...payload,
        id: normalizedId,
        userId: normalizedId,
        role: normalizedRole,
        organization_id: normalizedOrg,
        email: normalizedEmail,
      };
      return next();
    })
    .catch(() => {
      const normalizedId =
        payload?.sub ?? payload?.userId ?? payload?.user_id ?? null;
      req.user = {
        ...payload,
        id: normalizedId,
        userId: normalizedId,
        role: payload?.role || 'student',
        organization_id: payload?.organization_id ?? null,
        email: payload?.email || null,
      };
      return next();
    });
}

module.exports = {
  requireAuth,
  setAuthCookie,
  validateSessionForPayload,
};
