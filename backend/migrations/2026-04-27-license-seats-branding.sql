-- Phase 1.6: license / seat / branding columns on organizations (flag-gated OFF).
--
-- DO-NO-HARM CONTRACT:
--   * All existing orgs are GRANDFATHERED to plan_tier='legacy' with
--     seat_limit=NULL meaning UNLIMITED. They are never blocked by enforcement
--     even when SEAT_LIMIT_ENFORCEMENT flips on.
--   * Branding columns (logo_url, brand_color, display_name) default to NULL —
--     UI must fall back to today's hardcoded brand whenever they are unset.
--   * No data is destroyed or moved.

ALTER TABLE organizations
  ADD COLUMN IF NOT EXISTS plan_tier         VARCHAR(40)  NOT NULL DEFAULT 'legacy',
  ADD COLUMN IF NOT EXISTS seat_limit        INTEGER,                                -- NULL = unlimited
  ADD COLUMN IF NOT EXISTS billing_email     VARCHAR(255),
  ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(40) NOT NULL DEFAULT 'active', -- 'active'|'past_due'|'canceled'|'trial'
  ADD COLUMN IF NOT EXISTS expires_at        TIMESTAMP,
  ADD COLUMN IF NOT EXISTS logo_url          TEXT,
  ADD COLUMN IF NOT EXISTS brand_color       VARCHAR(20),
  ADD COLUMN IF NOT EXISTS display_name      VARCHAR(255),
  ADD COLUMN IF NOT EXISTS feature_overrides JSONB,
  ADD COLUMN IF NOT EXISTS updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Per-user feature overrides, also for grandfathering individual students out
-- of new behaviors if a support ticket comes in.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS feature_overrides JSONB,
  ADD COLUMN IF NOT EXISTS deactivated_at    TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_deactivated_at
  ON users (deactivated_at);
