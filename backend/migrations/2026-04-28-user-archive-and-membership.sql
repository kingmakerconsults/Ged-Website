-- 2026-04-28 \u2014 fresh-start gating: archive tables, membership requests,
-- per-user account_status state machine, NYC program metadata.
--
-- This migration is ADDITIVE and SAFE to run on a populated DB.
--   * No DROPs.
--   * Existing rows are backfilled to account_status='active' so the live
--     archive script (run separately) can choose what to flip.
--   * Archive tables only created if missing.
--
-- Run BEFORE backend/scripts/archive-users.js.

-- ===== organizations: program metadata =====
ALTER TABLE organizations
  ADD COLUMN IF NOT EXISTS slug         VARCHAR(100),
  ADD COLUMN IF NOT EXISTS region       VARCHAR(50)  DEFAULT 'NYC',
  ADD COLUMN IF NOT EXISTS program_type VARCHAR(100) DEFAULT 'GED Prep',
  ADD COLUMN IF NOT EXISTS website_url  TEXT;

-- Backfill slugs for existing rows (lowercase, hyphenated). We only set NULLs.
UPDATE organizations
   SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
 WHERE slug IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);

-- ===== users: account state =====
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS account_status          VARCHAR(30)  DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS pending_organization_id INTEGER      REFERENCES organizations(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS onboarding_state        JSONB        DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS test_dates              JSONB        DEFAULT '{}'::jsonb;

-- account_status values used by app code:
--   'pending_org'      \u2014 just signed up, no program selected yet
--   'pending_approval' \u2014 requested an org, waiting on org_admin
--   'active'           \u2014 approved (default for backfilled rows)
--   'denied'           \u2014 admin rejected the request
--   'archived'         \u2014 moved to users_archive by archive-users.js

CREATE INDEX IF NOT EXISTS idx_users_account_status ON users(account_status);

-- ===== membership requests =====
CREATE TABLE IF NOT EXISTS org_membership_requests (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id  INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  status           VARCHAR(20) NOT NULL DEFAULT 'pending',
                   -- pending | approved | denied | cancelled
  requested_role   VARCHAR(50) NOT NULL DEFAULT 'student',
  decided_by       INTEGER REFERENCES users(id) ON DELETE SET NULL,
  decided_at       TIMESTAMP,
  decision_note    TEXT,
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_membership_requests_user
  ON org_membership_requests (user_id);
CREATE INDEX IF NOT EXISTS idx_membership_requests_org_status
  ON org_membership_requests (organization_id, status);

-- Only one live pending request per (user, org) pair.
CREATE UNIQUE INDEX IF NOT EXISTS idx_membership_requests_unique_pending
  ON org_membership_requests (user_id, organization_id)
  WHERE status = 'pending';

-- ===== archive tables (snapshot rows before delete) =====
-- Each mirrors its source columns plus archived_at + archive_reason.

CREATE TABLE IF NOT EXISTS users_archive (
  archive_id       SERIAL PRIMARY KEY,
  archived_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason   TEXT,
  id               INTEGER,
  email            VARCHAR(255),
  name             VARCHAR(255),
  password_hash    TEXT,
  role             VARCHAR(50),
  organization_id  INTEGER,
  organization_join_code TEXT,
  picture_url      TEXT,
  created_at       TIMESTAMP,
  last_login       TIMESTAMP,
  last_seen_at     TIMESTAMP,
  account_status   VARCHAR(30),
  raw              JSONB  -- catch-all for any columns we miss
);
CREATE INDEX IF NOT EXISTS idx_users_archive_id ON users_archive(id);
CREATE INDEX IF NOT EXISTS idx_users_archive_email ON users_archive(email);

CREATE TABLE IF NOT EXISTS profiles_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_identities_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_attempts_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS essay_scores_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS study_plans_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS challenges_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS coach_composite_usage_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

-- Optional tables (may not exist in every deployment); the archive script
-- detects existence at runtime before archiving.
CREATE TABLE IF NOT EXISTS user_challenge_stats_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS user_challenge_suggestions_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS user_selected_challenges_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS essay_challenge_log_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS exam_sessions_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS notifications_archive (
  archive_id  SERIAL PRIMARY KEY,
  archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  raw         JSONB NOT NULL
);
