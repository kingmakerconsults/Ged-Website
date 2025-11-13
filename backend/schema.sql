-- Initial Database Schema for GED Learning Platform
-- Run this FIRST before any migrations

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash TEXT,
    role VARCHAR(50) DEFAULT 'student',
    organization_id INTEGER,
    organization_join_code TEXT,
    picture_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    last_seen_at TIMESTAMP
);

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    access_code VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    timezone VARCHAR(100) DEFAULT 'America/New_York',
    onboarding_complete BOOLEAN DEFAULT FALSE,
    font_size VARCHAR(20) DEFAULT 'medium',
    theme VARCHAR(20) DEFAULT 'light',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create auth_identities table (for OAuth)
CREATE TABLE IF NOT EXISTS auth_identities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider, provider_user_id)
);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_type VARCHAR(100),
    subject VARCHAR(100),
    category VARCHAR(255),
    quiz_id VARCHAR(255),
    score INTEGER,
    total_questions INTEGER,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quiz_data JSONB
);

-- Create essay_scores table
CREATE TABLE IF NOT EXISTS essay_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(100),
    score INTEGER,
    feedback TEXT,
    essay_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create question_bank table
CREATE TABLE IF NOT EXISTS question_bank (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(255),
    difficulty VARCHAR(50),
    question_text TEXT NOT NULL,
    question_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create study_plans table
CREATE TABLE IF NOT EXISTS study_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(100),
    plan_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_type VARCHAR(100),
    subject VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    progress INTEGER DEFAULT 0,
    target INTEGER,
    challenge_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Create coach_composite_usage table (rate limiting)
CREATE TABLE IF NOT EXISTS coach_composite_usage (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    used_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, week_start_date)
);

-- Add foreign key constraint for organization_id
ALTER TABLE users
ADD CONSTRAINT fk_users_organization
FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_organization ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_date ON quiz_attempts(attempted_at);
CREATE INDEX IF NOT EXISTS idx_essay_scores_user ON essay_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_user ON challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_identities_user ON auth_identities(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_identities_provider ON auth_identities(provider, provider_user_id);

-- Insert default super admin organization (NULL organization for super admins)
-- This is handled by the application, not by database constraint

-- Insert seed data for organizations
INSERT INTO organizations (name, access_code) 
VALUES ('Commonpoint Bronx', NULL) 
ON CONFLICT (name) DO NOTHING;

INSERT INTO organizations (name, access_code) 
VALUES ('Commonpoint Queens', '6709') 
ON CONFLICT (name) DO NOTHING;

INSERT INTO organizations (name, access_code) 
VALUES ('HANAC', '2740') 
ON CONFLICT (name) DO NOTHING;

COMMENT ON TABLE users IS 'Main users table with authentication and profile info';
COMMENT ON TABLE organizations IS 'Organizations that users can join';
COMMENT ON TABLE profiles IS 'Extended user profile settings and preferences';
COMMENT ON TABLE quiz_attempts IS 'History of all quiz attempts by users';
COMMENT ON TABLE essay_scores IS 'Essay submissions and scores';
COMMENT ON TABLE challenges IS 'User challenges and progress tracking';
