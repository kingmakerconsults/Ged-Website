/**
 * requireActiveAccount \u2014 fresh-start gating middleware (2026-04-28).
 *
 * Use AFTER `requireAuth`/`requireAuthInProd`. Loads the current user's
 * account_status from the DB and short-circuits any non-active user with a
 * 403 + structured payload the client uses to route to the appropriate
 * onboarding screen.
 *
 * Account status state machine:
 *   pending_org      \u2014 just signed up, no program selected yet
 *   pending_approval \u2014 requested an org, waiting on org_admin
 *   active           \u2014 approved, full access
 *   denied           \u2014 admin rejected the request
 *   archived         \u2014 row moved to users_archive
 *
 * Privileged roles (super_admin, org_admin, instructor) bypass this gate
 * because the org-management UI itself needs to load before approval is
 * possible. Students are the only ones gated.
 *
 * The middleware is itself flag-gated by ORG_GATED_ONBOARDING; when off, it
 * is a no-op so deploys can roll back instantly.
 */

const { isEnabled } = require('../src/featureFlags');

const PRIVILEGED_ROLES = new Set([
  'super_admin',
  'org_admin',
  'instructor',
  'teacher',
]);

/**
 * @param {import('pg').PoolClient | { query: Function }} db
 */
function requireActiveAccount(db) {
  return async function _requireActiveAccount(req, res, next) {
    if (!isEnabled('ORG_GATED_ONBOARDING')) return next();

    const userId = req.user?.id || req.user?.userId;
    if (!userId) return next(); // requireAuth should have rejected; defer

    const role = String(req.user?.role || 'student').toLowerCase();
    if (PRIVILEGED_ROLES.has(role)) return next();

    try {
      const r = await db.query(
        `SELECT account_status, pending_organization_id, organization_id
           FROM users WHERE id = $1`,
        [userId]
      );
      const status = r.rows[0]?.account_status || 'active';
      if (status === 'active') {
        // Hot-path: most requests land here.
        return next();
      }
      // Non-active: refuse with structured payload so the SPA can route.
      return res.status(403).json({
        error: 'account_not_active',
        account_status: status,
        pending_organization_id: r.rows[0]?.pending_organization_id || null,
      });
    } catch (err) {
      // Failing closed would brick the app on a transient DB blip; fail open
      // so existing students keep working. Status mismatch is recoverable on
      // the next request.
      console.error(
        '[requireActiveAccount] DB error, allowing request:',
        err.message || err
      );
      return next();
    }
  };
}

module.exports = { requireActiveAccount, PRIVILEGED_ROLES };
