/**
 * Centralized feature flag registry — backend.
 *
 * "Do No Harm" policy: every flag added for the licensing rollout must default
 * to the value that preserves existing behavior. New behavior is opt-in via
 * env var (or, later, per-user / per-org override).
 *
 * Pattern:
 *   const { isEnabled } = require('./src/featureFlags');
 *   if (isEnabled('STREAKS')) { ... }
 *
 * Per-user / per-org overrides (future): pass a context object:
 *   isEnabled('STREAKS', { user, organization })
 */

function envFlag(name, defaultValue) {
  const raw = process.env[`FEATURE_${name}`];
  if (raw === undefined || raw === null || raw === '') return defaultValue;
  const v = String(raw).trim().toLowerCase();
  if (['1', 'true', 'on', 'yes', 'enabled'].includes(v)) return true;
  if (['0', 'false', 'off', 'no', 'disabled'].includes(v)) return false;
  return defaultValue;
}

const FLAGS = {
  // ---- Phase 1: security/licensing (default ON in production once verified) ----
  RATE_LIMITING: { default: true, description: 'Enable express-rate-limit on auth + join endpoints' },
  HELMET: { default: true, description: 'Enable helmet security headers' },
  AUDIT_LOG: { default: true, description: 'Persist admin actions to admin_audit_log table' },

  // ---- Phase 1: licensing additions (default OFF — additive, not yet wired) ----
  EMAIL_VERIFICATION_REQUIRED: { default: false, description: 'Require new signups to verify email before access. Existing users grandfathered.' },
  SEAT_LIMIT_ENFORCEMENT: { default: false, description: 'Reject new joins to an org once seat_limit is reached. Existing members grandfathered.' },
  PASSWORD_RESET: { default: false, description: 'Enable /api/password-reset endpoints' },

  // ---- Phase 2: org admin (default OFF) ----
  ORG_INVITATIONS: { default: false, description: 'Enable invitation system endpoints + tab' },
  ORG_BRANDING: { default: false, description: 'Allow org admin to set logo/brand color' },
  ORG_USER_MANAGEMENT: { default: false, description: 'Allow org admin to change role / remove / deactivate' },
  ORG_CSV_EXPORT: { default: false, description: 'Enable CSV export endpoints' },

  // ---- Phase 3: instructor (default OFF) ----
  INSTRUCTOR_ROSTER_UI: { default: false, description: 'Render real instructor roster instead of stub' },
  INSTRUCTOR_ASSIGNMENTS: { default: false, description: 'Enable assignment creation + tracking' },
  INSTRUCTOR_REPORTS: { default: false, description: 'Enable instructor reports tab' },

  // ---- Phase 4: student polish (default OFF — surfaced only to NEW users) ----
  ONBOARDING_TOUR: { default: false, description: 'Guided 4-step onboarding tour for new students' },
  ACCOUNT_SETTINGS_EXTENDED: { default: false, description: 'Show password/email change in Settings' },
  ACCESSIBILITY_TTS: { default: false, description: 'Show TTS toggle' },
  ACCESSIBILITY_HIGH_CONTRAST: { default: false, description: 'Show high-contrast theme option' },
  STREAKS: { default: false, description: 'Track and display study streaks' },
  RECOMMENDATIONS: { default: false, description: 'Show "next recommended quiz" card' },

  // ---- Phase 5: SSO (default OFF) ----
  SSO_OIDC: { default: false, description: 'Enable OIDC SSO endpoints' },
  SSO_SAML: { default: false, description: 'Enable SAML SSO endpoints' },
  MFA: { default: false, description: 'Allow TOTP MFA for admin roles' },
};

/**
 * Resolve a flag's effective value.
 * @param {string} name
 * @param {{ user?: object, organization?: object }} [context] - reserved for per-user / per-org overrides
 */
function isEnabled(name, _context) {
  const def = FLAGS[name];
  if (!def) {
    console.warn(`[featureFlags] Unknown flag requested: ${name}`);
    return false;
  }
  // Future: consult context.organization.feature_overrides / context.user.feature_overrides
  return envFlag(name, def.default);
}

function listFlags() {
  return Object.entries(FLAGS).map(([name, def]) => ({
    name,
    enabled: envFlag(name, def.default),
    default: def.default,
    description: def.description,
  }));
}

module.exports = { isEnabled, listFlags, FLAGS };
