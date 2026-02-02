const db = require('../db');

module.exports = async function ensureOnboardingColumns() {
  try {
    await db.query(
      "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_step TEXT DEFAULT 'account'"
    );
    await db.query(
      'ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE'
    );
    await db.query(
      "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_payload JSONB DEFAULT '{}'::jsonb"
    );
  } catch (err) {
    console.error(
      '[initOnboardingColumns] Failed to add onboarding columns:',
      err
    );
  }
};
