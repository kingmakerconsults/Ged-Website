const jwt = require('jsonwebtoken');

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

function requireAuth(req, res, next) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT_SECRET is not configured; authentication is unavailable.');
        return res.status(500).json({ error: 'Authentication unavailable' });
    }

    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, secret);
        const normalizedId = payload?.sub ?? payload?.userId ?? payload?.user_id ?? null;
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
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = {
    requireAuth,
    setAuthCookie,
};
