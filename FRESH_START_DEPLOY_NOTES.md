# Fresh-Start Relicense Deploy Notes (2026-04-28)

This release archives all existing user accounts (except two preserved
admin accounts), gates new signups behind org-admin approval, and
introduces a 4-step onboarding tour.

## Preserved accounts

The archive script keeps these two accounts active:

- `kingmakerconsults@gmail.com` (super_admin)
- `zsmith@commonpoint.org`      (org_admin, Commonpoint Bronx)

Both will need to log in via Google OAuth (no passwords are seeded).

## Pre-deploy checklist

1. **Backup the database** \u2014 `pg_dump` snapshot to safe storage.
2. Confirm `JWT_SECRET` is set in production env.
3. Confirm `GOOGLE_CLIENT_ID` is set so the preserved super_admin can log in.

## Migration & data steps (in order)

```bash
# 1. Apply schema migration (additive: adds users.account_status, archive tables, etc.)
psql "$DATABASE_URL" -f backend/migrations/2026-04-28-user-archive-and-membership.sql

# 2. Seed the 10 NYC GED programs (idempotent: ON CONFLICT DO NOTHING)
psql "$DATABASE_URL" -f backend/migrations/2026-04-28-seed-nyc-programs.sql

# 3. DRY RUN the archive script. Verify expected counts in stdout.
node backend/scripts/archive-users.js

# 4. COMMIT the archive. This is destructive (rows are moved to *_archive tables).
node backend/scripts/archive-users.js --commit
```

## Deploy & verify

5. Deploy the new backend + frontend builds.
6. Log in as `kingmakerconsults@gmail.com` \u2014 should see Super Admin dashboard.
7. Log in as `zsmith@commonpoint.org` \u2014 should see Org Admin dashboard with new "Pending Approvals" tab.
8. From an incognito window, register a new account. You should see:
   - Program-search wizard (10 NYC programs)
   - After submitting a request \u2192 "Waiting for approval" screen
9. As `zsmith` (or super_admin), approve the request from the Pending Approvals tab.
10. Refresh the student tab \u2192 should advance to onboarding tour, then main app.

## Feature flags

These flags now default ON in production:

- `ORG_GATED_ONBOARDING` \u2014 enables the new gating middleware
- `ORG_INVITATIONS`, `ORG_USER_MANAGEMENT`, `ORG_BRANDING`, `ORG_CSV_EXPORT`
- `INSTRUCTOR_ROSTER_UI`
- `ONBOARDING_TOUR`, `ACCOUNT_SETTINGS_EXTENDED`, `STREAKS`, `RECOMMENDATIONS`

Rollback any of them with `FEATURE_<NAME>=false` in env.

## Rollback

- Setting `FEATURE_ORG_GATED_ONBOARDING=false` removes the access gate, so all
  archived/pending users instantly become functional again (their rows still
  exist in `users` with `account_status` set, but the middleware no-ops).
- Restoring archived activity data: every archive table contains the original
  row as JSONB in the `raw` column. A future operator script can replay them.
