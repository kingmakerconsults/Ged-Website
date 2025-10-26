function requireSuperAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Super admin only' });
    }
    return next();
}

function requireOrgAdmin(req, res, next) {
    if (!req.user || (req.user.role !== 'org_admin' && req.user.role !== 'super_admin')) {
        return res.status(403).json({ error: 'Org admin only' });
    }
    return next();
}

module.exports = {
    requireSuperAdmin,
    requireOrgAdmin,
};
