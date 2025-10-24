const { Pool } = require('pg');

const isProd = process.env.NODE_ENV === 'production';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
