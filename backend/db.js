const { Pool } = require('pg');

const isProd = process.env.NODE_ENV === 'production';

// Prefer DATABASE_URL when it is explicitly configured (e.g., in production),
// otherwise fall back to discrete PG* env vars for local development.
const rawDatabaseUrl = process.env.DATABASE_URL;
const looksLikePlaceholder = rawDatabaseUrl && /username:password@localhost:5432\/database/.test(rawDatabaseUrl);
const hasValidDatabaseUrl = rawDatabaseUrl && !looksLikePlaceholder;

const baseConfig = hasValidDatabaseUrl
  ? { connectionString: rawDatabaseUrl }
  : {
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT || 5432),
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    };

const pool = new Pool({
  ...baseConfig,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  oneOrNone: async (text, params) => {
    const r = await pool.query(text, params);
    return r.rows[0] || null;
  },
  many: async (text, params) => {
    const r = await pool.query(text, params);
    return r.rows;
  }
};
