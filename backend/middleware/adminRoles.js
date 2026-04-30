// Phase 1.4 — automatic admin audit logging.
// Loaded lazily so this module can still be required from contexts where the
// audit log table / db handle aren't initialized yet (and so a circular import
// can't happen).
let _audit = null;
function _getAudit() {
  if (_audit) return _audit;
  try {
    _audit = require('./auditLog');
  } catch (_) {
    _audit = { recordAuditEvent: async () => false };
  }
  return _audit;
}

function _fireAudit(req, action, status) {
  // Fire-and-forget. Never throws, never blocks the request.
  setImmediate(() => {
    try {
      const db = req.db || req.app?.locals?.db || null;
      _getAudit()
        .recordAuditEvent({
          db,
          req,
          action,
          target: { type: 'route', id: req.originalUrl || req.url },
          payload: { method: req.method },
          status,
        })
        .catch(() => {});
    } catch (_) {}
  });
}

// Helper functions for role hierarchy
function normalizeRoleValue(role) {
  return typeof role === 'string' ? role.toLowerCase() : 'student';
}

function isSuperAdmin(role) {
  const r = normalizeRoleValue(role);
  return r === 'super_admin' || r === 'superadmin';
}

function isOrgAdmin(role) {
  const r = normalizeRoleValue(role);
  return r === 'org_admin' || r === 'orgadmin';
}

function isInstructor(role) {
  const r = normalizeRoleValue(role);
  return r === 'instructor' || r === 'teacher';
}

function isSupport(role) {
  const r = normalizeRoleValue(role);
  return r === 'support';
}

function isInstructorOrAbove(role) {
  return isSuperAdmin(role) || isOrgAdmin(role) || isInstructor(role);
}

function isSupportOrAbove(role) {
  return isInstructorOrAbove(role) || isSupport(role);
}

// Middleware functions
function requireSuperAdmin(req, res, next) {
  if (!req.user || !isSuperAdmin(req.user.role)) {
    _fireAudit(req, 'admin.access.denied.super_admin', 'denied');
    return res.status(403).json({ error: 'Super admin only' });
  }
  _fireAudit(req, 'admin.access.super_admin', 'ok');
  return next();
}

function requireOrgAdmin(req, res, next) {
  if (
    !req.user ||
    !(isSuperAdmin(req.user.role) || isOrgAdmin(req.user.role))
  ) {
    _fireAudit(req, 'admin.access.denied.org_admin', 'denied');
    return res.status(403).json({ error: 'Org admin only' });
  }
  _fireAudit(req, 'admin.access.org_admin', 'ok');
  return next();
}

// Strict: org_admin or super_admin only (NOT instructors)
function requireOrgAdminOrSuper(req, res, next) {
  if (
    !req.user ||
    !(isSuperAdmin(req.user.role) || isOrgAdmin(req.user.role))
  ) {
    _fireAudit(req, 'admin.access.denied.org_admin_or_super', 'denied');
    return res.status(403).json({ error: 'Admins only' });
  }
  _fireAudit(req, 'admin.access.org_admin_or_super', 'ok');
  return next();
}

// This allows instructors, org_admins, and super_admins
function requireInstructorOrOrgAdminOrSuper(req, res, next) {
  if (!req.user || !isInstructorOrAbove(req.user.role)) {
    _fireAudit(req, 'admin.access.denied.instructor_or_above', 'denied');
    return res.status(403).json({ error: 'Instructor/Admin only' });
  }
  _fireAudit(req, 'admin.access.instructor_or_above', 'ok');
  return next();
}

// This allows the read-only "support" role plus instructors and admins.
// Use ONLY on GET endpoints — support is strictly read-only.
function requireSupportOrAbove(req, res, next) {
  if (!req.user || !isSupportOrAbove(req.user.role)) {
    _fireAudit(req, 'admin.access.denied.support_or_above', 'denied');
    return res.status(403).json({ error: 'Support/Instructor/Admin only' });
  }
  _fireAudit(req, 'admin.access.support_or_above', 'ok');
  return next();
}

module.exports = {
  requireSuperAdmin,
  requireOrgAdmin,
  requireOrgAdminOrSuper,
  requireInstructorOrOrgAdminOrSuper,
  requireSupportOrAbove,
  isSuperAdmin,
  isOrgAdmin,
  isInstructor,
  isSupport,
  isInstructorOrAbove,
  isSupportOrAbove,
};
