const { spawnSync } = require('child_process');
const jwt = require('jsonwebtoken');

let bcrypt;
try {
    // Optional dependency; falls back to PHP CLI when unavailable (local dev).
    bcrypt = require('bcryptjs');
} catch (error) {
    bcrypt = null;
}

function isBypassEnabled() {
    return String(process.env.ADMIN_BYPASS_ENABLED || '').toLowerCase() === 'true';
}

function getCookieOptions(maxAgeMs) {
    return {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: maxAgeMs
    };
}

function setAuthCookie(res, token, maxAgeMs = 12 * 60 * 60 * 1000) {
    res.cookie('auth', token, getCookieOptions(maxAgeMs));
}

function requireAuth(req, res, next) {
    const token = req?.cookies?.auth;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

async function adminBypassLogin(req, res) {
    if (!isBypassEnabled()) {
        return res.status(404).json({ error: 'Not found' });
    }

    const { password } = req.body || {};
    if (typeof password !== 'string' || password.length === 0) {
        return res.status(400).json({ error: 'Password required' });
    }

    const hash = process.env.ADMIN_BYPASS_HASH;
    if (!hash) {
        return res.status(500).json({ error: 'Bypass not configured' });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT secret not configured' });
    }

    let valid;
    try {
        valid = await comparePassword(password, hash);
    } catch (error) {
        return res.status(500).json({ error: 'Bypass authentication unavailable' });
    }
    if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ sub: 'admin-bypass', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
    setAuthCookie(res, token);
    return res.status(200).json({ ok: true });
}

module.exports = {
    requireAuth,
    adminBypassLogin,
    setAuthCookie
};

async function comparePassword(password, hash) {
    if (bcrypt && typeof bcrypt.compare === 'function') {
        return bcrypt.compare(password, hash);
    }

    const script = '[$p,$h]=[$argv[1],$argv[2]];exit(password_verify($p,$h)?0:1);';
    const result = spawnSync('php', ['-r', script, password, hash]);
    if (result.error) {
        throw new Error('Bcrypt comparison unavailable');
    }
    return result.status === 0;
}
