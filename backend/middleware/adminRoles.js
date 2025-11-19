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
  return r === 'org_admin' || r === 'admin';
}

function isInstructor(role) {
  const r = normalizeRoleValue(role);
  return r === 'instructor' || r === 'teacher';
}

function isInstructorOrAbove(role) {
  return isSuperAdmin(role) || isOrgAdmin(role) || isInstructor(role);
}

// Middleware functions
function requireSuperAdmin(req, res, next) {
  if (!req.user || !isSuperAdmin(req.user.role)) {
    return res.status(403).json({ error: 'Super admin only' });
  }
  return next();
}

function requireOrgAdmin(req, res, next) {
  if (
    !req.user ||
    !(isSuperAdmin(req.user.role) || isOrgAdmin(req.user.role))
  ) {
    return res.status(403).json({ error: 'Org admin only' });
  }
  return next();
}

// This allows instructors, org_admins, and super_admins
function requireOrgAdminOrSuper(req, res, next) {
  if (!req.user || !isInstructorOrAbove(req.user.role)) {
    return res.status(403).json({ error: 'admin_only' });
  }
  return next();
}

module.exports = {
  requireSuperAdmin,
  requireOrgAdmin,
  requireOrgAdminOrSuper,
  isSuperAdmin,
  isOrgAdmin,
  isInstructor,
  isInstructorOrAbove,
};
