-- Add not_scheduled flag so learners can indicate a test date is not scheduled yet.
ALTER TABLE test_plans
ADD COLUMN IF NOT EXISTS not_scheduled BOOLEAN NOT NULL DEFAULT FALSE;
