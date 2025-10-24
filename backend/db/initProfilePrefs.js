const db = require('../db');

module.exports = async function ensureProfilePreferenceColumns() {
  await db.query(`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS font_size TEXT DEFAULT 'md'`);
  await db.query(`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'system'`);
};
