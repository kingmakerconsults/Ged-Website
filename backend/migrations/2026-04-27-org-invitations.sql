-- Phase 2 \u2014 organization invitations (flag-gated OFF until Org Admin UI ships).
--
-- DO-NO-HARM CONTRACT:
--   * Net-new table; no existing rows touched.
--   * Endpoints that read/write this table check FEATURE_ORG_INVITATIONS;
--     when off, they return 404. So today's join-by-code flow is the only
--     path users will see.

CREATE TABLE IF NOT EXISTS org_invitations (
  id              BIGSERIAL PRIMARY KEY,
  organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email           VARCHAR(255) NOT NULL,
  role            VARCHAR(50) NOT NULL DEFAULT 'student',
  token_hash      VARCHAR(128) NOT NULL,
  expires_at      TIMESTAMP NOT NULL,
  invited_by      INTEGER REFERENCES users(id) ON DELETE SET NULL,
  accepted_at     TIMESTAMP,
  accepted_by     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  revoked_at      TIMESTAMP,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_org_invitations_token
  ON org_invitations (token_hash);

CREATE INDEX IF NOT EXISTS idx_org_invitations_org_email
  ON org_invitations (organization_id, lower(email));

CREATE INDEX IF NOT EXISTS idx_org_invitations_status
  ON org_invitations (organization_id, accepted_at, revoked_at, expires_at);
