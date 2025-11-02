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

// Expanded in-memory fallback list for profile challenges by subject/subtopic
// Used when the DB challenge catalog is unavailable or empty
const FALLBACK_PROFILE_CHALLENGES = [
  // MATH (algebra, geometry, data)
  { id: 'math-1', subject: 'Math', subtopic: 'Number Sense & Fluency', label: 'Fractions, decimals, %' },
  { id: 'math-2', subject: 'Math', subtopic: 'Algebra Foundations', label: 'Writing and solving 1-step equations' },
  { id: 'math-3', subject: 'Math', subtopic: 'Algebra Foundations', label: '2-step equations & inequalities' },
  { id: 'math-4', subject: 'Math', subtopic: 'Word Problems', label: 'Translating real situations to expressions' },
  { id: 'math-5', subject: 'Math', subtopic: 'Geometry & Measurement', label: 'Perimeter, area, and volume' },
  { id: 'math-6', subject: 'Math', subtopic: 'Data & Graphs', label: 'Reading tables, charts, and graphs' },
  { id: 'math-7', subject: 'Math', subtopic: 'Scientific Calculator', label: 'Using the calculator efficiently' },
  { id: 'math-8', subject: 'Math', subtopic: 'Test Skills', label: 'Multi-step GED-style math items' },

  // RLA (reading, grammar, extended response)
  { id: 'rla-1', subject: 'RLA', subtopic: 'Reading Comprehension', label: 'Main idea and supporting details' },
  { id: 'rla-2', subject: 'RLA', subtopic: 'Reading Comprehension', label: 'Author’s purpose & tone' },
  { id: 'rla-3', subject: 'RLA', subtopic: 'Informational Text', label: 'Reading charts / text together' },
  { id: 'rla-4', subject: 'RLA', subtopic: 'Language & Editing', label: 'Grammar, usage, and mechanics' },
  { id: 'rla-5', subject: 'RLA', subtopic: 'Language & Editing', label: 'Punctuation and sentence boundaries' },
  { id: 'rla-6', subject: 'RLA', subtopic: 'Writing', label: 'Organizing ideas for responses' },
  { id: 'rla-7', subject: 'RLA', subtopic: 'Writing', label: 'Citing evidence from the passage' },

  // SCIENCE (data, life, physical, reasoning)
  { id: 'science-1', subject: 'Science', subtopic: 'Data Interpretation', label: 'Reading charts and graphs' },
  { id: 'science-2', subject: 'Science', subtopic: 'Physical Science', label: 'Forces, motion, and energy' },
  { id: 'science-3', subject: 'Science', subtopic: 'Life Science', label: 'Cells and human body systems' },
  { id: 'science-4', subject: 'Science', subtopic: 'Earth & Space', label: 'Weather, climate, earth systems' },
  { id: 'science-5', subject: 'Science', subtopic: 'Scientific Practice', label: 'Experimental design & variables' },
  { id: 'science-6', subject: 'Science', subtopic: 'Reasoning in Science', label: 'Cause-and-effect in passages' },

  // SOCIAL STUDIES (civics, history, econ, reading graphs)
  { id: 'social-1', subject: 'Social Studies', subtopic: 'Civics', label: 'Government and civics concepts' },
  { id: 'social-2', subject: 'Social Studies', subtopic: 'Geography', label: 'Interpreting maps and data' },
  { id: 'social-3', subject: 'Social Studies', subtopic: 'History', label: 'Remembering historical events' },
  { id: 'social-4', subject: 'Social Studies', subtopic: 'US History', label: 'Colonial → Civil War sequence' },
  { id: 'social-5', subject: 'Social Studies', subtopic: 'Economics', label: 'Basic economics and graphs' },
  { id: 'social-6', subject: 'Social Studies', subtopic: 'Document Literacy', label: 'Reading primary/secondary sources' },
];

// Fixed configuration for challenge tables/columns
async function getChallengeInfo() {
  if (cachedChallengeInfo) return cachedChallengeInfo;

  const optionTable = 'challenge_catalog';
  const optionIdColumn = 'id';
  const selectionTable = 'user_selected_challenges';
  const selectionIdColumn = 'challenge_id';
  const selectionUserIdType = 'integer';

  cachedChallengeInfo = {
    optionTable,
    selectionTable,
    optionIdColumn,
    selectionIdColumn,
    selectionUserIdType,
  };
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
  const { optionTable, selectionTable, optionIdColumn, selectionIdColumn, selectionUserIdType } = await getChallengeInfo();

    // Load all available options
    const optionRes = await pool.query(
      `SELECT ${optionIdColumn} AS id, subject, subtopic, label FROM ${optionTable} ORDER BY subject, subtopic, label`
    );

    const optionRows = Array.isArray(optionRes?.rows) ? optionRes.rows : [];
    const allOptions = optionRows.length > 0
      ? optionRows
      : FALLBACK_PROFILE_CHALLENGES.map((o) => ({ id: o.id, subject: o.subject, subtopic: o.subtopic, label: o.label }));

    // Load user's selected challenge ids
    let paramUserId = userId;
    if (selectionUserIdType === 'integer') {
      const parsed = parseInt(String(userId), 10);
      if (Number.isNaN(parsed)) {
        // Token is not numeric but table expects int – treat as no selections
        paramUserId = null;
      } else {
        paramUserId = parsed;
      }
    } else if (selectionUserIdType === 'uuid') {
      // leave as-is; DB will validate uuid type
      paramUserId = String(userId);
    } else {
      // text or unknown – use string form
      paramUserId = String(userId);
    }

    let selectedRows = [];
    if (paramUserId !== null && paramUserId !== undefined && paramUserId !== '') {
      const selectedRes = await pool.query(
        `SELECT ${selectionIdColumn} AS challenge_id FROM ${selectionTable} WHERE user_id = $1`,
        [paramUserId]
      );
      selectedRows = selectedRes.rows;
    }

    const chosenSet = new Set(selectedRows.map((r) => String(r.challenge_id)));

    return allOptions.map((r) => ({
      id: String(r.id),
      subject: r.subject,
      subtopic: r.subtopic,
      label: r.label,
      selected: chosenSet.has(String(r.id)),
    }));
  } catch (err) {
    console.warn('[profile] getChallengeOptions failed; returning empty list:', err?.message || err);
    // fall back to in-memory catalog if DB query fails entirely
    return FALLBACK_PROFILE_CHALLENGES.map((o) => ({
      id: String(o.id),
      subject: o.subject,
      subtopic: o.subtopic,
      label: o.label,
      selected: false,
    }));
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
  const selectedChallenges = Array.isArray(challengeOptions)
    ? challengeOptions.filter((o) => o && o.selected).map((o) => String(o.id))
    : [];

  return {
    profile: profileRow,
    testPlan,
    challengeOptions,
    selectedChallenges,
    challenges: selectedChallenges,
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

    const saved = await pool.query(
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
      RETURNING user_id, subject, test_date, test_location, passed, not_scheduled;
      `,
      [userId, subj, normalizedDate, normLocation, normPassed, normNotScheduled]
    );

    const savedRow = saved?.rows?.[0] || null;
    if (savedRow) {
      console.log('[profile/test] saved =>', {
        subject: savedRow.subject,
        testDate: savedRow.test_date,
        testLocation: savedRow.test_location || '',
        passed: !!savedRow.passed,
        notScheduled: !!savedRow.not_scheduled,
      });
    }

    const bundle = await buildProfileBundle(userId);
    return res.json({
      success: true,
      test: savedRow,
      ...bundle,
    });
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

    const selectionTable = 'public.user_selected_challenges';
    const selectionIdColumn = 'challenge_id';
    // Coerce user id to integer for Render DB
    let selUserId = req.user?.userId ?? req.user?.id;
    selUserId = parseInt(String(selUserId), 10);
    if (Number.isNaN(selUserId)) {
      // No-op if we cannot coerce user id; still return bundle later
      selUserId = null;
    }

    // If user cleared everything, just delete all their tags
    if (selectedIds.length === 0) {
      if (selUserId !== null) {
        await client.query(
          `DELETE FROM ${selectionTable} WHERE user_id = $1`,
          [selUserId]
        );
      }
    } else {
      // Remove any tags not in the new list
      const placeholders = selectedIds
        .map((_, i) => `$${i + 2}`)
        .join(', ');
      if (selUserId !== null) {
        await client.query(
          `DELETE FROM ${selectionTable}
           WHERE user_id = $1 AND ${selectionIdColumn} NOT IN (${placeholders})`,
          [selUserId, ...selectedIds]
        );
      }

      // Add the ones that are missing
      if (selUserId !== null) {
        for (const cid of selectedIds) {
          await client.query(
            `INSERT INTO ${selectionTable} (user_id, ${selectionIdColumn})
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
            [selUserId, cid]
          );
        }
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
        const { selectionTable, selectionIdColumn, selectionUserIdType } = await getChallengeInfo();
        let selUserId = userId;
        if (selectionUserIdType === 'integer') {
          const parsed = parseInt(String(selUserId), 10);
          selUserId = Number.isNaN(parsed) ? null : parsed;
        } else if (selectionUserIdType === 'uuid') {
          selUserId = String(selUserId);
        } else {
          selUserId = String(selUserId);
        }

        if (selUserId !== null) {
          if (selectedIds.length === 0) {
            await client.query(`DELETE FROM ${selectionTable} WHERE user_id = $1`, [selUserId]);
          } else {
            const placeholders = selectedIds.map((_, i) => `$${i + 2}`).join(', ');
            await client.query(
              `DELETE FROM ${selectionTable} WHERE user_id = $1 AND ${selectionIdColumn} NOT IN (${placeholders})`,
              [selUserId, ...selectedIds]
            );
            for (const cid of selectedIds) {
              await client.query(
                `INSERT INTO ${selectionTable} (user_id, ${selectionIdColumn})
                 VALUES ($1, $2)
                 ON CONFLICT DO NOTHING`,
                [selUserId, cid]
              );
            }
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

