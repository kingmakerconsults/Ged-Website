-- Phase 1.5: password reset + email verification (flag-gated OFF by default).
--
-- DO-NO-HARM CONTRACT:
--   * All existing users are GRANDFATHERED: email_verified = TRUE for any row
--     created before this migration runs. They will never see a verification
--     prompt and their login flow is unchanged.
--   * New columns are nullable / have safe defaults so legacy code that does
--     not reference them keeps working.
--   * Tables added are net-new and additive.

-- 1. Email verification (per-user)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP;

-- Backfill: every existing user is treated as already verified.
UPDATE users
   SET email_verified = TRUE,
       email_verified_at = COALESCE(email_verified_at, created_at, CURRENT_TIMESTAMP)
 WHERE email_verified = FALSE;

-- 2. One-time tokens for verification + password reset.
CREATE TABLE IF NOT EXISTS auth_tokens (
  id              BIGSERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose         VARCHAR(40) NOT NULL,                -- 'email_verify' | 'password_reset'
  token_hash      VARCHAR(128) NOT NULL,               -- SHA-256 hex of the raw token
  expires_at      TIMESTAMP NOT NULL,
  used_at         TIMESTAMP,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip              VARCHAR(64),
  user_agent      TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_auth_tokens_hash
  ON auth_tokens (token_hash);

CREATE INDEX IF NOT EXISTS idx_auth_tokens_user_purpose
  ON auth_tokens (user_id, purpose, used_at);
