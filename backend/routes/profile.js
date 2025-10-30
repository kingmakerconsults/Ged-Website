// routes/profile.js
const express = require('express');
const { Pool } = require('pg');
const { assertUserIsActive } = require('../utils/userPresence');

const router = express.Router();

// create our own pool for this router
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

// --- helpers -------------------------------------------------

// Cache detected challenge tables/columns so we don't probe every request
let cachedChallengeInfo = null;

// Detect which tables/columns exist for challenge options and selections across envs
async function getChallengeInfo() {
  if (cachedChallengeInfo) return cachedChallengeInfo;

  const optionCandidates = ['challenge_options', 'challenge_catalog'];
  const selectionCandidates = ['user_challenge_tags', 'profile_challenges'];

  let optionTable = null;
  for (const t of optionCandidates) {
    try {
      await pool.query(`SELECT 1 FROM ${t} LIMIT 1`);
      optionTable = t;
      break;
    } catch (err) {
      // 42P01 = undefined_table; ignore and continue probing
      if (!err || err.code !== '42P01') {
        console.warn(`[profile] Option table probe failed for ${t}:`, err?.message || err);
      }
    }
  }
  if (!optionTable) optionTable = optionCandidates[optionCandidates.length - 1];

  // Determine ID column for option table
  const optionIdCandidates = ['id', 'challenge_id'];
  let optionIdColumn = 'id';
  try {
    const { rows } = await pool.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = $1`,
      [optionTable]
    );
    const cols = new Set(rows.map((r) => r.column_name));
    optionIdColumn = optionIdCandidates.find((c) => cols.has(c)) || optionIdColumn;
  } catch (err) {
    // non-fatal
  }

  let selectionTable = null;
  for (const t of selectionCandidates) {
    try {
      await pool.query(`SELECT 1 FROM ${t} LIMIT 1`);
      selectionTable = t;
      break;
    } catch (err) {
      if (!err || err.code !== '42P01') {
        console.warn(`[profile] Selection table probe failed for ${t}:`, err?.message || err);
      }
    }
  }
  if (!selectionTable) selectionTable = selectionCandidates[selectionCandidates.length - 1];

  const selectionIdCandidates = ['challenge_id', 'challenge', 'challenge_code', 'challenge_uid', 'challenge_uuid', 'tag_id'];
  let selectionIdColumn = 'challenge_id';
  try {
    const { rows } = await pool.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = $1`,
      [selectionTable]
    );
    const cols = new Set(rows.map((r) => r.column_name));
    selectionIdColumn = selectionIdCandidates.find((c) => cols.has(c)) || selectionIdColumn;
  } catch (err) {
    // non-fatal
  }

  cachedChallengeInfo = { optionTable, selectionTable, optionIdColumn, selectionIdColumn };
  return cachedChallengeInfo;
}

// Make sure profiles has a row for this user so selects don't come back empty
async function ensureProfileRow(userId) {
  // if there's already a row, do nothing
  const check = await pool.query(
    'SELECT user_id FROM profiles WHERE user_id = $1 LIMIT 1',
    [userId]
  );
  if (check.rowCount > 0) return;

  // insert defaults
  await pool.query(
    `INSERT INTO profiles (
        user_id,
        test_date,
        test_location,
        reminder_enabled,
        timezone,
        updated_at,
        font_size,
        theme,
        onboarding_complete,
        passed
     )
     VALUES (
        $1,
        NULL,
        NULL,
        TRUE,
        'America/New_York',
        NOW(),
        'md',
        'system',
        FALSE,
        FALSE
     )`,
    [userId]
  );
}

// Return per-subject test plan rows the way the UI wants them
async function getTestPlan(userId) {
  const { rows } = await pool.query(
    `SELECT
        subject,
        test_date      AS "testDate",
        test_location  AS "testLocation",
        passed,
        not_scheduled  AS "notScheduled"
     FROM test_plans
     WHERE user_id = $1
     ORDER BY subject`,
    [userId]
  );
  return rows; // [{subject, testDate, testLocation, passed}, ...]
}

// Build the challenge options list, plus whether the user has selected each
async function getChallengeOptions(userId) {
  try {
    const { optionTable, selectionTable, optionIdColumn, selectionIdColumn } = await getChallengeInfo();

    // Load all available options
    const optionRes = await pool.query(
      `SELECT ${optionIdColumn} AS id, subject, subtopic, label FROM ${optionTable} ORDER BY subject, subtopic, label`
    );

    // Load user's selected challenge ids
    const selectedRes = await pool.query(
      `SELECT ${selectionIdColumn} AS challenge_id FROM ${selectionTable} WHERE user_id = $1`,
      [userId]
    );

    const chosenSet = new Set(selectedRes.rows.map((r) => String(r.challenge_id)));

    return optionRes.rows.map((r) => ({
      id: String(r.id),
      subject: r.subject,
      subtopic: r.subtopic,
      label: r.label,
      selected: chosenSet.has(String(r.id)),
    }));
  } catch (err) {
    console.warn('[profile] getChallengeOptions failed; returning empty list:', err?.message || err);
    return [];
  }
}

// Summaries for Recent Scores (the UI will show "No scores yet." if arrays are empty)
async function getRecentScores(userId) {
  // summarize by subject
  const bySubjectRes = await pool.query(
    `
    SELECT
      subject,
      AVG(score_percent)::numeric(5,2) AS avg_percent,
      MAX(taken_at) AS latest_taken_at
    FROM assessment_scores
    WHERE user_id = $1
    GROUP BY subject
    ORDER BY MAX(taken_at) DESC
    LIMIT 10
    `,
    [userId]
  );

  // summarize by subtopic
  const bySubtopicRes = await pool.query(
    `
    SELECT
      subject,
      subtopic,
      AVG(score_percent)::numeric(5,2) AS avg_percent,
      MAX(taken_at) AS latest_taken_at
    FROM assessment_scores
    WHERE user_id = $1
    GROUP BY subject, subtopic
    ORDER BY MAX(taken_at) DESC
    LIMIT 20
    `,
    [userId]
  );

  return {
    bySubject: bySubjectRes.rows.map(r => ({
      subject: r.subject,
      avgPercent: Number(r.avg_percent),
      latestTakenAt: r.latest_taken_at,
    })),
    bySubtopic: bySubtopicRes.rows.map(r => ({
      subject: r.subject,
      subtopic: r.subtopic,
      avgPercent: Number(r.avg_percent),
      latestTakenAt: r.latest_taken_at,
    })),
  };
}

// Figure out the "next upcoming test" (used for dashboard countdown later)
function computeNextUpcomingTest(testPlanRows) {
  const today = new Date();
  const upcoming = testPlanRows
    .filter(t => t.testDate && !t.passed)
    .map(t => {
      const d = new Date(t.testDate);
      return isNaN(d.getTime()) ? null : { ...t, _d: d };
    })
    .filter(Boolean)
    .sort((a, b) => a._d - b._d)[0];

  if (!upcoming) {
    return null;
  }

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const daysUntil = Math.ceil((upcoming._d.getTime() - today.getTime()) / MS_PER_DAY);

  return {
    subject: upcoming.subject,
    testDate: upcoming.testDate,
    daysUntil,
  };
}

// Build the full "bundle" object the frontend expects
async function buildProfileBundle(userId) {
  // Make sure there IS a row in profiles first
  await ensureProfileRow(userId);

  // load profile prefs + name
  const profileRes = await pool.query(
    `
    SELECT
      u.name,
      p.font_size            AS "fontSize",
      p.theme                AS theme,
      p.timezone             AS timezone,
      p.reminder_enabled     AS "reminderEnabled",
      p.onboarding_complete  AS "onboardingComplete"
    FROM users u
    JOIN profiles p
      ON p.user_id = u.id
    WHERE u.id = $1
    LIMIT 1
    `,
    [userId]
  );

  const profileRow = profileRes.rows[0] || {
    name: null,
    fontSize: 'md',
    theme: 'system',
    timezone: 'America/New_York',
    reminderEnabled: true,
    onboardingComplete: false,
  };

  const testPlan = await getTestPlan(userId);
  const challengeOptions = await getChallengeOptions(userId);
  const recentScores = await getRecentScores(userId);
  const nextUpcomingTest = computeNextUpcomingTest(testPlan);

  return {
    profile: profileRow,
    testPlan,
    challengeOptions,
    recentScores,
    nextUpcomingTest,
  };
}

// --- routes -------------------------------------------------

// GET /api/profile/me
// Used by the profile screen to load everything.
// MUST return {profile, testPlan, challengeOptions, recentScores, nextUpcomingTest}
router.get('/me', async (req, res) => {
  try {
    const userId = req.user && req.user.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Not signed in' });
    }

    console.log('[GET] /api/profile/me', { userId });
    const bundle = await buildProfileBundle(userId);
    return res.json(bundle);
  } catch (err) {
    console.error('GET /api/profile/me failed:', err);
    return res.status(500).json({ error: 'Failed to load profile' });
  }
});

// GET /api/profile (alias)
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Not signed in' });
    }
    console.log('[GET] /api/profile', { userId });
    const bundle = await buildProfileBundle(userId);
    return res.json(bundle);
  } catch (err) {
    console.error('GET /api/profile failed:', err);
    return res.status(500).json({ error: 'Failed to load profile' });
  }
});

// PATCH /api/profile/name
// Body: { name: "New Name" }
// Updates users.name, returns { name }
router.patch('/name', express.json(), async (req, res) => {
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Not signed in' });
    }

    if (!(await assertUserIsActive(userId))) {
      return res.status(403).json({ error: 'user_not_active' });
    }

    const rawName = req.body?.name;
    const name = (rawName || '').toString().trim().slice(0, 80);
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    console.log('[PATCH] /api/profile/name', { userId, nameLength: name.length });
    await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, userId]);

    return res.json({ name });
  } catch (err) {
    console.error('PATCH /api/profile/name failed:', err);
    return res.status(500).json({ error: 'Failed to save name' });
  }
});

// PATCH /api/profile/test
// Body: { subject, testDate, testLocation, passed, notScheduled }
// Upserts into test_plans, then returns the full profile bundle again.
router.patch('/test', express.json(), async (req, res) => {
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Not signed in' });
    }

    if (!(await assertUserIsActive(userId))) {
      return res.status(403).json({ error: 'user_not_active' });
    }

    const { subject, testDate, testLocation, passed, notScheduled } = req.body || {};
    const subj = (subject || '').toString().trim();
    if (!subj) {
      return res.status(400).json({ error: 'Missing subject' });
    }

    // Allow blank date or null
    let normalizedDate = null;
    const normNotScheduled = !!notScheduled;
    if (!normNotScheduled && testDate) {
      const d = new Date(testDate);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: 'Invalid test date' });
      }
      // store as YYYY-MM-DD
      normalizedDate = d.toISOString().slice(0, 10);
    }

  const normLocation = (testLocation || '').toString().trim() || null;
  const normPassed = normNotScheduled ? false : !!passed;

  console.log('[PATCH] /api/profile/test', { userId, subject: subj, notScheduled: normNotScheduled, hasDate: !!normalizedDate, passed: normPassed });

    await pool.query(
      `
      INSERT INTO test_plans (user_id, subject, test_date, test_location, passed, not_scheduled, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (user_id, subject)
      DO UPDATE SET
        test_date = EXCLUDED.test_date,
        test_location = EXCLUDED.test_location,
        passed = EXCLUDED.passed,
        not_scheduled = EXCLUDED.not_scheduled,
        updated_at = NOW()
      `,
      [userId, subj, normalizedDate, normLocation, normPassed, normNotScheduled]
    );

    const bundle = await buildProfileBundle(userId);
    return res.json(bundle);
  } catch (err) {
    console.error('PATCH /api/profile/test failed:', err);
    return res.status(500).json({ error: 'Failed to save test plan' });
  }
});

// PATCH /api/profile/challenges/tags
// Body: { selectedIds: [uuid, uuid, ...] }
// Syncs user_challenge_tags to match that list, then returns the fresh bundle.
router.patch('/challenges/tags', express.json(), async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      client.release();
      return res.status(401).json({ error: 'Not signed in' });
    }

    if (!(await assertUserIsActive(userId))) {
      client.release();
      return res.status(403).json({ error: 'user_not_active' });
    }

    const selectedIds = Array.isArray(req.body?.selectedIds)
      ? req.body.selectedIds
      : [];

    console.log('[PATCH] /api/profile/challenges/tags', { userId, selectedCount: selectedIds.length });

    await client.query('BEGIN');

    const { selectionTable, selectionIdColumn } = await getChallengeInfo();

    // If user cleared everything, just delete all their tags
    if (selectedIds.length === 0) {
      await client.query(
        `DELETE FROM ${selectionTable} WHERE user_id = $1`,
        [userId]
      );
    } else {
      // Remove any tags not in the new list
      const placeholders = selectedIds
        .map((_, i) => `$${i + 2}`)
        .join(', ');
      await client.query(
        `DELETE FROM ${selectionTable}
         WHERE user_id = $1 AND ${selectionIdColumn} NOT IN (${placeholders})`,
        [userId, ...selectedIds]
      );

      // Add the ones that are missing
      for (const cid of selectedIds) {
        await client.query(
          `INSERT INTO ${selectionTable} (user_id, ${selectionIdColumn})
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [userId, cid]
        );
      }
    }

    await client.query('COMMIT');
    client.release();

    const bundle = await buildProfileBundle(userId);
    return res.json(bundle);
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    client.release();
    console.error('PATCH /api/profile/challenges/tags failed:', err);
    return res.status(500).json({ error: 'Failed to update challenges' });
  }
});

// PATCH /api/profile/preferences
// Body: { fontSize: 'sm'|'md'|'lg'|'xl', theme: 'light'|'dark'|'system' }
// Updates profiles font_size and theme, returns { fontSize, theme }
router.patch('/preferences', express.json(), async (req, res) => {
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Not signed in' });
    }

    if (!(await assertUserIsActive(userId))) {
      return res.status(403).json({ error: 'user_not_active' });
    }

    const VALID_SIZES = new Set(['sm', 'md', 'lg', 'xl']);
    const VALID_THEMES = new Set(['light', 'dark', 'system']);
    let { fontSize, theme } = req.body || {};
    const normalizedSize = VALID_SIZES.has(fontSize) ? fontSize : 'md';
    const normalizedTheme = VALID_THEMES.has(theme) ? theme : 'light';

    await ensureProfileRow(userId);

    console.log('[PATCH] /api/profile/preferences', { userId, fontSize: normalizedSize, theme: normalizedTheme });
    await pool.query(
      `
      UPDATE profiles
         SET font_size = $1,
             theme = $2,
             updated_at = NOW()
       WHERE user_id = $3
      `,
      [normalizedSize, normalizedTheme, userId]
    );

    return res.json({ fontSize: normalizedSize, theme: normalizedTheme });
  } catch (err) {
    console.error('PATCH /api/profile/preferences failed:', err);
    return res.status(500).json({ error: 'Failed to save preferences' });
  }
});

// PATCH /api/profile/complete-onboarding
// Marks onboarding_complete = TRUE in profiles, then returns the new bundle
router.patch('/complete-onboarding', express.json(), async (req, res) => {
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Not signed in' });
    }

    if (!(await assertUserIsActive(userId))) {
      return res.status(403).json({ error: 'user_not_active' });
    }

    await ensureProfileRow(userId);

    console.log('[PATCH] /api/profile/complete-onboarding', { userId });
    await pool.query(
      `
      UPDATE profiles
      SET onboarding_complete = TRUE,
          updated_at = NOW()
      WHERE user_id = $1
      `,
      [userId]
    );

    const bundle = await buildProfileBundle(userId);
    return res.json(bundle);
  } catch (err) {
    console.error('PATCH /api/profile/complete-onboarding failed:', err);
    return res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

module.exports = router;
// PUT /api/profile
// Composite upsert endpoint. Body may include any of:
// { name, preferences: {fontSize, theme}, testPlan: [{subject, testDate, testLocation, passed, notScheduled}], challenges: { selectedIds: [] | challengeOptions: [] }, onboardingComplete }
router.put('/', express.json(), async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user?.userId ?? req.user?.id;
    if (!userId) {
      client.release();
      return res.status(401).json({ error: 'Not signed in' });
    }

    if (!(await assertUserIsActive(userId))) {
      client.release();
      return res.status(403).json({ error: 'user_not_active' });
    }

    const body = req.body || {};
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 80) : null;
    const prefs = body.preferences || {};
    const VALID_SIZES = new Set(['sm', 'md', 'lg', 'xl']);
    const VALID_THEMES = new Set(['light', 'dark', 'system']);
    const prefSize = VALID_SIZES.has(prefs.fontSize) ? prefs.fontSize : null;
    const prefTheme = VALID_THEMES.has(prefs.theme) ? prefs.theme : null;
    const testPlan = Array.isArray(body.testPlan) ? body.testPlan : [];
    const challenges = body.challenges || {};
    const onboardingComplete = body.onboardingComplete === true;

    await client.query('BEGIN');
    await ensureProfileRow(userId);

    if (name) {
      console.log('[PUT] /api/profile -> name', { userId });
      await client.query('UPDATE users SET name = $1 WHERE id = $2', [name, userId]);
    }

    if (prefSize || prefTheme) {
      console.log('[PUT] /api/profile -> preferences', { userId, fontSize: prefSize, theme: prefTheme });
      await client.query(
        `UPDATE profiles SET
           font_size = COALESCE($1, font_size),
           theme = COALESCE($2, theme),
           updated_at = NOW()
         WHERE user_id = $3`,
        [prefSize, prefTheme, userId]
      );
    }

    if (testPlan.length > 0) {
      console.log('[PUT] /api/profile -> testPlan', { userId, count: testPlan.length });
      for (const row of testPlan) {
        if (!row || !row.subject) continue;
        const subj = String(row.subject).trim();
        let normalizedDate = null;
        const normNotScheduled = !!row.notScheduled;
        if (!normNotScheduled && row.testDate) {
          const d = new Date(row.testDate);
          if (!isNaN(d.getTime())) {
            normalizedDate = d.toISOString().slice(0, 10);
          }
        }
        const normLocation = (row.testLocation || '').toString().trim() || null;
        const normPassed = normNotScheduled ? false : !!row.passed;

        await client.query(
          `INSERT INTO test_plans (user_id, subject, test_date, test_location, passed, not_scheduled, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, NOW())
           ON CONFLICT (user_id, subject)
           DO UPDATE SET test_date = EXCLUDED.test_date,
                         test_location = EXCLUDED.test_location,
                         passed = EXCLUDED.passed,
                         not_scheduled = EXCLUDED.not_scheduled,
                         updated_at = NOW()`,
          [userId, subj, normalizedDate, normLocation, normPassed, normNotScheduled]
        );
      }
    }

    if (challenges) {
      const selectedIds = Array.isArray(challenges.selectedIds)
        ? challenges.selectedIds
        : (Array.isArray(challenges.challengeOptions)
            ? challenges.challengeOptions.filter((c) => c && c.id && c.selected).map((c) => c.id)
            : []);
      if (selectedIds) {
        console.log('[PUT] /api/profile -> challenges', { userId, selectedCount: selectedIds.length });
        const { selectionTable, selectionIdColumn } = await getChallengeInfo();
        if (selectedIds.length === 0) {
          await client.query(`DELETE FROM ${selectionTable} WHERE user_id = $1`, [userId]);
        } else {
          const placeholders = selectedIds.map((_, i) => `$${i + 2}`).join(', ');
          await client.query(
            `DELETE FROM ${selectionTable} WHERE user_id = $1 AND ${selectionIdColumn} NOT IN (${placeholders})`,
            [userId, ...selectedIds]
          );
          for (const cid of selectedIds) {
            await client.query(
              `INSERT INTO ${selectionTable} (user_id, ${selectionIdColumn})
               VALUES ($1, $2)
               ON CONFLICT DO NOTHING`,
              [userId, cid]
            );
          }
        }
      }
    }

    if (onboardingComplete) {
      console.log('[PUT] /api/profile -> onboardingComplete', { userId });
      await client.query(
        `UPDATE profiles SET onboarding_complete = TRUE, updated_at = NOW() WHERE user_id = $1`,
        [userId]
      );
    }

    await client.query('COMMIT');
    client.release();
    const bundle = await buildProfileBundle(userId);
    return res.json(bundle);
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    client.release();
    console.error('PUT /api/profile failed:', err);
    return res.status(500).json({ error: 'Failed to save profile' });
  }
});

