-- Phase 1.4: persistent audit log for org_admin / super_admin / role-changing actions.
--
-- Do No Harm: this migration is purely additive (new table). It does not modify
-- any existing user, organization, or quiz data.

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id              BIGSERIAL PRIMARY KEY,
  actor_user_id   INTEGER REFERENCES users(id) ON DELETE SET NULL,
  actor_email     VARCHAR(255),
  actor_role      VARCHAR(50),
  organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
  action          VARCHAR(100) NOT NULL,
  target_type     VARCHAR(50),
  target_id       VARCHAR(255),
  payload         JSONB,
  ip              VARCHAR(64),
  user_agent      TEXT,
  status          VARCHAR(20) DEFAULT 'ok',
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_org_created
  ON admin_audit_log (organization_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_actor_created
  ON admin_audit_log (actor_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_action_created
  ON admin_audit_log (action, created_at DESC);
