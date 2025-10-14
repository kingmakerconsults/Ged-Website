const { spawnSync } = require('child_process');
const jwt = require('jsonwebtoken');
const { setAuthCookie } = require('./auth');

let bcrypt;
try {
    // Optional dependency; falls back to PHP CLI when unavailable (local dev).
    bcrypt = require('bcryptjs');
} catch (error) {
    bcrypt = null;
}

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

function isPreviewBypassEnabled() {
    const flag = process.env.ADMIN_PREVIEW_BYPASS_ENABLED ?? process.env.ADMIN_BYPASS_ENABLED;
    return String(flag || '').toLowerCase() === 'true';
}

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

async function adminPreviewBypass(req, res) {
    if (!isPreviewBypassEnabled()) {
        return res.status(404).json({ error: 'Not found' });
    }

    const { password } = req.body || {};
    if (typeof password !== 'string' || password.length === 0) {
        return res.status(400).json({ error: 'Password required' });
    }

    const hash = process.env.ADMIN_PREVIEW_BYPASS_HASH || process.env.ADMIN_BYPASS_HASH;
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

    const token = jwt.sign({ sub: 'admin-preview', role: 'admin', preview: true }, process.env.JWT_SECRET, {
        expiresIn: '12h'
    });

    setAuthCookie(res, token, TWELVE_HOURS_MS);

    return res.status(200).json({ ok: true });
}

module.exports = {
    adminPreviewBypass
};
