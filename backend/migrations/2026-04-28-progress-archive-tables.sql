-- 2026-04-28 — additive: archive tables for the per-user *progress* tables
-- that the earlier 2026-04-28-user-archive-and-membership.sql migration did
-- not cover. These are needed by backend/scripts/wipe-user-progress.js so
-- it can snapshot every score / attempt / mastery row before truncating.
--
-- Same conventions as the existing *_archive tables:
--   * archive_id, archived_at, archive_reason
--   * raw JSONB catch-all (so we don't have to mirror every column)
--
-- Safe + idempotent. No DROPs. Re-running is a no-op.

CREATE TABLE IF NOT EXISTS quiz_attempt_items_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_surveys_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS vocabulary_attempts_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS user_subject_status_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS user_premade_quiz_mastery_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS coach_daily_progress_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS coach_weekly_plans_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS coach_advice_usage_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS coach_chat_usage_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS coach_conversations_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS active_exam_sessions_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS user_quota_daily_archive (
  archive_id     SERIAL PRIMARY KEY,
  archived_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archive_reason TEXT,
  raw            JSONB NOT NULL
);
