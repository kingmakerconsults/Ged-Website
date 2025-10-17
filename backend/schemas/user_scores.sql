-- Schema for user authentication and score tracking
-- Run these statements against your Render PostgreSQL database.

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT,
    name TEXT,
    picture_url TEXT,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    score INTEGER NOT NULL,
    taken_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scores_user_id_taken_at
    ON scores (user_id, taken_at DESC);

-- To execute on Render, connect with the database credentials shown in the
-- Render dashboard. For example, from your local machine run:
--   psql "$DATABASE_URL" -f user_scores.sql
-- Replace $DATABASE_URL with the connection string provided by Render.
