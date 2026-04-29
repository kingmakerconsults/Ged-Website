/**
 * Frontend role helpers. Mirrors backend/middleware/adminRoles.js so role
 * checks across the app stop hand-rolling string comparisons.
 *
 * Hierarchy: SUPER_ADMIN > ORG_ADMIN > INSTRUCTOR > STUDENT
 */

export const ROLES = Object.freeze({
  SUPER_ADMIN: 'super_admin',
  ORG_ADMIN: 'org_admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student',
});

export function normalizeRole(role) {
  const r = typeof role === 'string' ? role.toLowerCase().trim() : '';
  if (r === 'super_admin' || r === 'superadmin') return ROLES.SUPER_ADMIN;
  if (r === 'org_admin' || r === 'orgadmin') return ROLES.ORG_ADMIN;
  if (r === 'instructor' || r === 'teacher') return ROLES.INSTRUCTOR;
  return ROLES.STUDENT;
}

export function isSuperAdmin(role) {
  return normalizeRole(role) === ROLES.SUPER_ADMIN;
}
export function isOrgAdmin(role) {
  return normalizeRole(role) === ROLES.ORG_ADMIN;
}
export function isInstructor(role) {
  return normalizeRole(role) === ROLES.INSTRUCTOR;
}
export function isStudent(role) {
  return normalizeRole(role) === ROLES.STUDENT;
}
export function isOrgAdminOrAbove(role) {
  const r = normalizeRole(role);
  return r === ROLES.SUPER_ADMIN || r === ROLES.ORG_ADMIN;
}
export function isInstructorOrAbove(role) {
  const r = normalizeRole(role);
  return (
    r === ROLES.SUPER_ADMIN || r === ROLES.ORG_ADMIN || r === ROLES.INSTRUCTOR
  );
}

export function roleLabel(role) {
  const r = normalizeRole(role);
  if (r === ROLES.SUPER_ADMIN) return 'Super Admin';
  if (r === ROLES.ORG_ADMIN) return 'Organization Admin';
  if (r === ROLES.INSTRUCTOR) return 'Instructor';
  return 'Student';
}
