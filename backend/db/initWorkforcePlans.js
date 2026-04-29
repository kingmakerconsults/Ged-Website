const db = require('../db');

/**
 * Durable Workforce Readiness program tables.
 *
 * These tables turn the workforce tools from local, one-day practice widgets
 * into program-long records that instructors can assign/review and students can
 * continue across devices. Interview turn fields intentionally include
 * voice-ready metadata so a future realtime vocal interviewer API can plug into
 * the same transcript model.
 */
async function ensureWorkforcePlansTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS workforce_plans (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      organization_id INTEGER,
      created_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      class_id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      source TEXT NOT NULL DEFAULT 'self_directed',
      start_date DATE,
      target_date DATE,
      plan_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      archived_at TIMESTAMPTZ
    );
  `);

  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS organization_id INTEGER;`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS created_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS class_id INTEGER;`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS description TEXT;`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active';`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'self_directed';`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS start_date DATE;`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS target_date DATE;`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS plan_json JSONB NOT NULL DEFAULT '{}'::jsonb;`
  );
  await db.query(
    `ALTER TABLE workforce_plans ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;`
  );

  await db.query(`
    CREATE TABLE IF NOT EXISTS workforce_milestones (
      id SERIAL PRIMARY KEY,
      plan_id INTEGER NOT NULL REFERENCES workforce_plans(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      section_id TEXT,
      tool_id TEXT,
      career_id TEXT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'not_started',
      target_date DATE,
      completed_at TIMESTAMPTZ,
      evidence_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      milestone_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      position INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS section_id TEXT;`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS tool_id TEXT;`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS career_id TEXT;`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'not_started';`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS target_date DATE;`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS evidence_json JSONB NOT NULL DEFAULT '{}'::jsonb;`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS milestone_json JSONB NOT NULL DEFAULT '{}'::jsonb;`
  );
  await db.query(
    `ALTER TABLE workforce_milestones ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`
  );

  await db.query(`
    CREATE TABLE IF NOT EXISTS workforce_activity_events (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      organization_id INTEGER,
      plan_id INTEGER REFERENCES workforce_plans(id) ON DELETE SET NULL,
      milestone_id INTEGER REFERENCES workforce_milestones(id) ON DELETE SET NULL,
      section_id TEXT,
      tool_id TEXT,
      career_id TEXT,
      activity_type TEXT NOT NULL,
      status TEXT,
      score NUMERIC,
      evidence_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      metadata_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS workforce_artifacts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      organization_id INTEGER,
      plan_id INTEGER REFERENCES workforce_plans(id) ON DELETE SET NULL,
      milestone_id INTEGER REFERENCES workforce_milestones(id) ON DELETE SET NULL,
      section_id TEXT,
      tool_id TEXT,
      artifact_type TEXT NOT NULL,
      title TEXT NOT NULL,
      content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      metadata_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      archived_at TIMESTAMPTZ
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS interview_sessions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      organization_id INTEGER,
      plan_id INTEGER REFERENCES workforce_plans(id) ON DELETE SET NULL,
      milestone_id INTEGER REFERENCES workforce_milestones(id) ON DELETE SET NULL,
      career_id TEXT,
      role TEXT,
      experience_level TEXT,
      interview_style TEXT,
      session_mode TEXT,
      target_questions INTEGER NOT NULL DEFAULT 5,
      current_question_index INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'in_progress',
      input_mode TEXT NOT NULL DEFAULT 'text',
      realtime_session_ref TEXT,
      setup_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      feedback_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      score_report JSONB NOT NULL DEFAULT '{}'::jsonb,
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      completed_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS organization_id INTEGER;`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS plan_id INTEGER REFERENCES workforce_plans(id) ON DELETE SET NULL;`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS milestone_id INTEGER REFERENCES workforce_milestones(id) ON DELETE SET NULL;`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS career_id TEXT;`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS current_question_index INTEGER NOT NULL DEFAULT 0;`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS input_mode TEXT NOT NULL DEFAULT 'text';`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS realtime_session_ref TEXT;`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS setup_json JSONB NOT NULL DEFAULT '{}'::jsonb;`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS feedback_json JSONB NOT NULL DEFAULT '{}'::jsonb;`
  );
  await db.query(
    `ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS score_report JSONB NOT NULL DEFAULT '{}'::jsonb;`
  );

  await db.query(`
    CREATE TABLE IF NOT EXISTS interview_turns (
      id SERIAL PRIMARY KEY,
      session_id INTEGER NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role TEXT NOT NULL,
      text TEXT NOT NULL,
      turn_index INTEGER NOT NULL DEFAULT 0,
      input_mode TEXT NOT NULL DEFAULT 'text',
      transcript_source TEXT,
      audio_url TEXT,
      latency_ms INTEGER,
      realtime_event_ref TEXT,
      feedback_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      metadata_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (session_id, turn_index, role)
    );
  `);

  await db.query(
    `ALTER TABLE interview_turns ADD COLUMN IF NOT EXISTS input_mode TEXT NOT NULL DEFAULT 'text';`
  );
  await db.query(
    `ALTER TABLE interview_turns ADD COLUMN IF NOT EXISTS transcript_source TEXT;`
  );
  await db.query(
    `ALTER TABLE interview_turns ADD COLUMN IF NOT EXISTS audio_url TEXT;`
  );
  await db.query(
    `ALTER TABLE interview_turns ADD COLUMN IF NOT EXISTS latency_ms INTEGER;`
  );
  await db.query(
    `ALTER TABLE interview_turns ADD COLUMN IF NOT EXISTS realtime_event_ref TEXT;`
  );
  await db.query(
    `ALTER TABLE interview_turns ADD COLUMN IF NOT EXISTS feedback_json JSONB NOT NULL DEFAULT '{}'::jsonb;`
  );
  await db.query(
    `ALTER TABLE interview_turns ADD COLUMN IF NOT EXISTS metadata_json JSONB NOT NULL DEFAULT '{}'::jsonb;`
  );

  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_workforce_plans_user_status ON workforce_plans (user_id, status, updated_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_workforce_plans_org ON workforce_plans (organization_id, updated_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_workforce_milestones_plan_position ON workforce_milestones (plan_id, position, id);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_workforce_milestones_user_status ON workforce_milestones (user_id, status, target_date);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_workforce_activity_user_time ON workforce_activity_events (user_id, occurred_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_workforce_activity_org_time ON workforce_activity_events (organization_id, occurred_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_workforce_artifacts_user_time ON workforce_artifacts (user_id, created_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_interview_sessions_user_time ON interview_sessions (user_id, updated_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_interview_sessions_org_time ON interview_sessions (organization_id, updated_at DESC);`
  );
  await db.query(
    `CREATE INDEX IF NOT EXISTS idx_interview_turns_session_index ON interview_turns (session_id, turn_index);`
  );
}

module.exports = ensureWorkforcePlansTables;
