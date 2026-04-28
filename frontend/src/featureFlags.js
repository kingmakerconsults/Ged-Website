/**
 * Centralized feature flag registry — frontend.
 *
 * "Do No Harm" policy: every flag added for the licensing rollout defaults to
 * the value that preserves existing behavior. New behavior is opt-in via:
 *   1. window.__FEATURE_FLAGS__  (set at runtime, e.g. from a server bootstrap)
 *   2. localStorage 'feature:<NAME>' = 'on' | 'off'  (per-browser override; useful for dev)
 *   3. URL ?ff=<NAME>:on,<NAME>:off  (one-shot override; persists to localStorage)
 *
 * Usage:
 *   import { isFeatureEnabled } from '../featureFlags.js';
 *   if (isFeatureEnabled('ONBOARDING_TOUR', { user })) { ... }
 *
 * Mirrors backend/src/featureFlags.js. Keep in sync.
 */

const DEFAULTS = {
  // Phase 4 \u2014 student-facing additions (flipped ON 2026-04-28 for fresh-start)
  ONBOARDING_TOUR: true,
  ACCOUNT_SETTINGS_EXTENDED: true,
  ACCESSIBILITY_TTS: false,
  ACCESSIBILITY_HIGH_CONTRAST: false,
  STREAKS: true,
  RECOMMENDATIONS: true,

  // Phase 2 \u2014 org admin
  ORG_INVITATIONS: true,
  ORG_BRANDING: true,
  ORG_USER_MANAGEMENT: true,
  ORG_CSV_EXPORT: true,

  // Phase 3 \u2014 instructor
  INSTRUCTOR_ROSTER_UI: true,
  INSTRUCTOR_ASSIGNMENTS: false,
  INSTRUCTOR_REPORTS: false,

  // Phase 5 \u2014 SSO/MFA
  SSO_OIDC: false,
  SSO_SAML: false,
  MFA: false,

  // Fresh-start (2026-04-28)
  ORG_GATED_ONBOARDING: true,
};

// Apply ?ff=NAME:on,OTHER:off URL overrides once per page load.
function consumeUrlOverrides() {
  try {
    if (typeof window === 'undefined' || !window.location) return;
    const params = new URLSearchParams(window.location.search);
    const ff = params.get('ff');
    if (!ff) return;
    ff.split(',').forEach((pair) => {
      const [name, val] = pair.split(':').map((s) => (s || '').trim());
      if (!name) return;
      const v = String(val || '').toLowerCase();
      if (['on', 'true', '1'].includes(v)) {
        try {
          localStorage.setItem(`feature:${name}`, 'on');
        } catch (_) {}
      } else if (['off', 'false', '0'].includes(v)) {
        try {
          localStorage.setItem(`feature:${name}`, 'off');
        } catch (_) {}
      } else if (['clear', 'reset', ''].includes(v)) {
        try {
          localStorage.removeItem(`feature:${name}`);
        } catch (_) {}
      }
    });
  } catch (_) {
    // Never let flag plumbing break the app.
  }
}

let _consumed = false;

/**
 * Determine whether a feature is enabled for the current browser/user.
 * Resolution order (highest priority first):
 *   1. localStorage 'feature:<NAME>'
 *   2. window.__FEATURE_FLAGS__[NAME]
 *   3. user.feature_overrides[NAME]   (when context.user provided)
 *   4. organization.feature_overrides[NAME]  (when context.organization provided)
 *   5. DEFAULTS[NAME]
 *   6. false
 */
export function isFeatureEnabled(name, context) {
  if (!_consumed) {
    _consumed = true;
    consumeUrlOverrides();
  }
  // 1. localStorage per-browser override
  try {
    if (typeof localStorage !== 'undefined') {
      const v = localStorage.getItem(`feature:${name}`);
      if (v === 'on') return true;
      if (v === 'off') return false;
    }
  } catch (_) {}
  // 2. Window-level (server bootstrap)
  try {
    if (
      typeof window !== 'undefined' &&
      window.__FEATURE_FLAGS__ &&
      name in window.__FEATURE_FLAGS__
    ) {
      return Boolean(window.__FEATURE_FLAGS__[name]);
    }
  } catch (_) {}
  // 3-4. Per-user / per-org overrides
  try {
    const u = context?.user?.feature_overrides;
    if (u && name in u) return Boolean(u[name]);
    const o = context?.organization?.feature_overrides;
    if (o && name in o) return Boolean(o[name]);
  } catch (_) {}
  // 5. Default
  if (name in DEFAULTS) return DEFAULTS[name];
  return false;
}

/**
 * Returns true ONLY for accounts created on/after the given ISO date.
 * Useful for "show new feature only to new signups" gating without disrupting
 * existing students.
 */
export function isNewUserSince(user, isoDate) {
  if (!user || !isoDate) return false;
  const created = user.created_at || user.createdAt;
  if (!created) return false;
  try {
    return new Date(created).getTime() >= new Date(isoDate).getTime();
  } catch (_) {
    return false;
  }
}

export const FEATURE_FLAG_DEFAULTS = DEFAULTS;
