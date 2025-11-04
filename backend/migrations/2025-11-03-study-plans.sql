-- Create table to persist weekly study plans per user and subject
CREATE TABLE IF NOT EXISTS study_plans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  plan_json JSONB NOT NULL,
  notes TEXT
);

-- Indexes to speed up lookups by user/subject and by recency
CREATE INDEX IF NOT EXISTS idx_study_plans_user_subject ON study_plans (user_id, subject);
CREATE INDEX IF NOT EXISTS idx_study_plans_generated_at ON study_plans (generated_at DESC);
