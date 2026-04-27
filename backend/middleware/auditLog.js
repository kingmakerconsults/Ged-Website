/**
 * Phase 1.4 — admin audit logging.
 *
 * Two surfaces:
 *   1. recordAuditEvent({ db, req, action, target, payload, status })
 *      - Imperative; call from inside endpoint handlers after the action succeeds (or fails).
 *   2. auditAdminAccess(action) middleware factory
 *      - Logs that an admin endpoint was hit. Does not log per-row mutation detail —
 *        use recordAuditEvent for that.
 *
 * Failure mode: logging is best-effort. A failed insert MUST NOT break the request.
 * If the FEATURE_AUDIT_LOG flag is off, we still console.log to retain visibility.
 */

const { isEnabled } = require('../src/featureFlags');

function _ipFrom(req) {
  try {
    const xff = req.headers?.['x-forwarded-for'];
    if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim().slice(0, 64);
    return (req.ip || req.connection?.remoteAddress || '').slice(0, 64);
  } catch (_) {
    return '';
  }
}

function _ua(req) {
  try {
    return String(req.headers?.['user-agent'] || '').slice(0, 1024);
  } catch (_) {
    return '';
  }
}

function _actorFrom(req) {
  const u = req.user || {};
  return {
    actor_user_id: u.id || u.userId || u.user_id || u.sub || null,
    actor_email: u.email || null,
    actor_role: u.role || null,
    organization_id: u.organization_id || u.organizationId || null,
  };
}

/**
 * Persist a single audit event. Resolves to true on success, false on failure
 * (always swallows errors).
 *
 * @param {object} opts
 * @param {{ query: Function }} opts.db - pg-style db with .query
 * @param {object} opts.req - Express request (for actor + ip + ua)
 * @param {string} opts.action - short verb, e.g. 'org.user.role_change'
 * @param {{ type?: string, id?: string|number }} [opts.target]
 * @param {object} [opts.payload] - JSON-serializable details (no PII unless necessary)
 * @param {'ok'|'denied'|'error'} [opts.status='ok']
 */
async function recordAuditEvent({ db, req, action, target = {}, payload = null, status = 'ok' }) {
  const actor = _actorFrom(req);
  const ip = _ipFrom(req);
  const ua = _ua(req);
  const ts = new Date().toISOString();

  // Always console-log so admins have visibility even when the flag/DB is unavailable.
  try {
    console.log(
      `[audit] ${ts} action=${action} actor_user=${actor.actor_user_id} org=${actor.organization_id} ` +
      `target=${target.type || ''}:${target.id || ''} status=${status}`
    );
  } catch (_) {}

  if (!isEnabled('AUDIT_LOG')) return false;
  if (!db || typeof db.query !== 'function') return false;

  try {
    let payloadJson = null;
    if (payload != null) {
      try {
        payloadJson = JSON.stringify(payload);
      } catch (_) {
        payloadJson = JSON.stringify({ _serialization_error: true });
      }
    }
    await db.query(
      `INSERT INTO admin_audit_log
         (actor_user_id, actor_email, actor_role, organization_id,
          action, target_type, target_id, payload, ip, user_agent, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11)`,
      [
        actor.actor_user_id,
        actor.actor_email,
        actor.actor_role,
        actor.organization_id,
        String(action).slice(0, 100),
        target.type ? String(target.type).slice(0, 50) : null,
        target.id != null ? String(target.id).slice(0, 255) : null,
        payloadJson,
        ip || null,
        ua || null,
        String(status).slice(0, 20),
      ]
    );
    return true;
  } catch (err) {
    // Swallow — audit failure must NEVER affect the user-facing response.
    console.error('[audit] recordAuditEvent failed:', err?.message || err);
    return false;
  }
}

/**
 * Express middleware that logs every hit to an admin endpoint. Useful for
 * read endpoints where there is no specific mutation to log. Does not block
 * the request even if logging fails.
 *
 * Usage: app.get('/api/org/users', requireOrgAdmin, auditAdminAccess('org.users.list'), handler)
 */
function auditAdminAccess(action) {
  return function (req, _res, next) {
    // Defer slightly so req.user is fully populated by upstream auth middleware.
    setImmediate(() => {
      try {
        // The db handle is attached to req by server.js (see app.use((req,_,next)=>{ req.db = pool; ... }))
        const db = req.db || req.app?.locals?.db || null;
        recordAuditEvent({ db, req, action, status: 'ok' }).catch(() => {});
      } catch (_) {}
    });
    next();
  };
}

module.exports = { recordAuditEvent, auditAdminAccess };
