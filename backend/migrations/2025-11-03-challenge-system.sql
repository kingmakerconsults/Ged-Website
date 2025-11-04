-- Challenge system tables

-- Catalog of challenge tags (distinct from profile challenge options)
CREATE TABLE IF NOT EXISTS challenge_tag_catalog (
  challenge_tag TEXT PRIMARY KEY,
  subject TEXT,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Per-user aggregated stats for challenge tags
CREATE TABLE IF NOT EXISTS user_challenge_stats (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_tag TEXT NOT NULL,
  correct_count INTEGER NOT NULL DEFAULT 0,
  wrong_count INTEGER NOT NULL DEFAULT 0,
  last_seen TIMESTAMPTZ,
  last_wrong_at TIMESTAMPTZ,
  source TEXT,
  PRIMARY KEY (user_id, challenge_tag)
);
CREATE INDEX IF NOT EXISTS idx_user_challenge_stats_user ON user_challenge_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenge_stats_tag ON user_challenge_stats(challenge_tag);

-- Suggestions to modify the user's active challenges
CREATE TABLE IF NOT EXISTS user_challenge_suggestions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_tag TEXT NOT NULL,
  suggestion_type TEXT NOT NULL CHECK (suggestion_type IN ('add','remove')),
  source TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_user_challenge_suggestions_user ON user_challenge_suggestions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenge_suggestions_unresolved ON user_challenge_suggestions(user_id, resolved_at) WHERE resolved_at IS NULL;

-- Audit log for essay-sourced tags
CREATE TABLE IF NOT EXISTS essay_challenge_log (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_tag TEXT NOT NULL,
  essay_id TEXT,
  source TEXT DEFAULT 'essay',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_essay_challenge_log_user ON essay_challenge_log(user_id);
