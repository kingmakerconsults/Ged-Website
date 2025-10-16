-- Schema for user authentication and score tracking
-- Run these statements against your Render PostgreSQL database.

-- Enable UUID generation for password-based registrations while still allowing
-- Google OAuth users to provide their own string identifiers.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    picture_url TEXT,
    password_hash TEXT,
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
