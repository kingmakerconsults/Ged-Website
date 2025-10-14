const jwt = require('jsonwebtoken');
const { setAuthCookie } = require('./auth');

const ADMIN_PREVIEW_PASSWORD = 'Kingmaker123';
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

function adminPreviewBypass(req, res) {
    const { password } = req.body || {};

    if (password !== ADMIN_PREVIEW_PASSWORD) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT secret not configured' });
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
