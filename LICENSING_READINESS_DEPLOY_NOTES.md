# Licensing Readiness — Phase 1-5 Deploy Notes

> Status: backend complete. Smoke-boot OK. Unit tests pass (12/12).
> Frontend instructor/org-admin UI works as before — new endpoints are
> all flag-gated OFF and never alter the existing student experience.

## What changed

### New backend files

- `backend/src/featureFlags.js` — flag registry with env override
- `backend/middleware/rateLimits.js` — login/register/join/reset/api limiters
- `backend/middleware/auditLog.js` — `recordAuditEvent` + admin role auto-audit
- `backend/src/authTokens.js` — token issue/verify + seat-cap check
- `backend/migrations/2026-04-27-admin-audit-log.sql`
- `backend/migrations/2026-04-27-email-verify-and-reset.sql`
- `backend/migrations/2026-04-27-license-seats-branding.sql`
- `backend/migrations/2026-04-27-org-invitations.sql`
- `backend/migrations/2026-04-27-instructor-assignments.sql`
- `backend/tests/featureFlags.test.js`
- `backend/tests/authTokens.test.js`

### Modified files

- `backend/server.js` — helmet, rate limiters on auth+join, JWT_SECRET fail-fast,
  4 new auth routes (password reset / email verify), seat enforcement on join,
  Phase 2 org-admin endpoints (invitations, branding, user mgmt, CSV, audit log),
  Phase 3 instructor endpoints (per-student detail, classes, assignments,
  `/api/me/assignments`), Phase 4 student endpoints (password change, email change,
  streak, recommendations), Phase 5 SSO/MFA stubs.
- `backend/middleware/adminRoles.js` — auto-audit all 30+ admin endpoints via
  the shared role middleware (no per-route changes required).
- `frontend/src/featureFlags.js`, `frontend/src/roles.js` — mirror utilities
  for future flag-gated UI work.

### Deleted (dead frontend scaffolding, verified zero imports)

- `frontend/src/App.jsx` and 15 unused `frontend/src/views/*.jsx` files.

## Required deploy steps (in order)

1. **Set `JWT_SECRET`** in production env. Server now exits at boot without it
   unless `ALLOW_MISSING_JWT_SECRET=true`.
2. **Run the new migrations** in order:
   - `2026-04-27-admin-audit-log.sql`
   - `2026-04-27-email-verify-and-reset.sql` (backfills existing users to verified)
   - `2026-04-27-license-seats-branding.sql` (orgs grandfathered to plan_tier='legacy', seat_limit=NULL)
   - `2026-04-27-org-invitations.sql`
   - `2026-04-27-instructor-assignments.sql`
3. **Deploy.** Defaults are safe: rate limiting / helmet / audit log are ON;
   every new user-visible feature is OFF.

## Kill switches

If anything misbehaves, set the env var on the host and restart:

- `FEATURE_RATE_LIMITING=false`
- `FEATURE_HELMET=false`
- `FEATURE_AUDIT_LOG=false`

## Enabling new functionality (per-org rollout when ready)

All default OFF. Flip via env vars on the backend host:

- `FEATURE_EMAIL_VERIFICATION_REQUIRED` — gate new signups on email verify
- `FEATURE_PASSWORD_RESET` — enable password reset endpoints
- `FEATURE_SEAT_LIMIT_ENFORCEMENT` — enforce per-org seat caps on join
- `FEATURE_ORG_INVITATIONS` — invitation endpoints (UI work pending)
- `FEATURE_ORG_BRANDING` — display_name/logo_url/brand_color (UI work pending)
- `FEATURE_ORG_USER_MANAGEMENT` — change role / deactivate (UI work pending)
- `FEATURE_ORG_CSV_EXPORT` — `/api/org/users.csv` + `/api/org/activity.csv`
- `FEATURE_INSTRUCTOR_ROSTER_UI` — per-student detail endpoint
- `FEATURE_INSTRUCTOR_ASSIGNMENTS` — classes + assignments endpoints
- `FEATURE_ACCOUNT_SETTINGS_EXTENDED` — password/email change for existing users
- `FEATURE_STREAKS`, `FEATURE_RECOMMENDATIONS` — student dashboard polish
- `FEATURE_SSO_OIDC`, `FEATURE_SSO_SAML`, `FEATURE_MFA` — return 501 until wired

## Outstanding work (not done in this pass)

- **Phase 2 frontend** — Org admin dashboard tabs (Invitations / Settings /
  User Actions / Audit Log / CSV buttons). Backend ready, UI unchanged.
- **Phase 3 frontend** — Classes / Assignments tabs in instructor dashboard.
  Existing student roster + activity feed continues to work as today.
- **Phase 4 frontend** — Password/email change UI in `SettingsView`,
  onboarding tour for new signups, streak badge, recommendation card.
  All gated by `isNewUserSince(user, '2026-04-27T00:00:00Z')` so existing
  students see no change.
- **Phase 5** — Real OIDC/SAML/MFA wiring (currently 501 stubs).
- **Phase 6** — Playwright cross-role smoke tests.
- **CSP** — helmet CSP intentionally disabled; needs separate workstream
  before enabling because legacy frontend uses inline scripts + Tailwind CDN.
- **Pre-existing npm vulnerabilities** — 10 reported during install
  (1 low / 3 moderate / 6 high). Triage before licensing.

## Verification done this pass

- `get_errors` clean on every modified backend file after each batch.
- Server boots cleanly on port 3004 with empty stderr after all changes.
- 12/12 unit tests pass for the new helpers (featureFlags + authTokens).
