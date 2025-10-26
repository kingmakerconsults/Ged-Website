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
        passed
     FROM test_plans
     WHERE user_id = $1
     ORDER BY subject`,
    [userId]
  );
  return rows; // [{subject, testDate, testLocation, passed}, ...]
}

// Build the challenge options list, plus whether the user has selected each
async function getChallengeOptions(userId) {
  const { rows } = await pool.query(
    `
    SELECT
      c.id,
      c.subject,
      c.subtopic,
      c.label,
      CASE WHEN u.user_id IS NULL THEN FALSE ELSE TRUE END AS selected
    FROM challenge_catalog c
    LEFT JOIN user_challenge_tags u
      ON u.challenge_id = c.id
     AND u.user_id = $1
    ORDER BY c.subject, c.subtopic, c.label
    `,
    [userId]
  );

  return rows.map(r => ({
    id: r.id,
    subject: r.subject,
    subtopic: r.subtopic,
    label: r.label,
    selected: r.selected,
  }));
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

    const bundle = await buildProfileBundle(userId);
    return res.json(bundle);
  } catch (err) {
    console.error('GET /api/profile/me failed:', err);
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

    await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, userId]);

    return res.json({ name });
  } catch (err) {
    console.error('PATCH /api/profile/name failed:', err);
    return res.status(500).json({ error: 'Failed to save name' });
  }
});

// PATCH /api/profile/test
// Body: { subject, testDate, testLocation, passed }
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

    const { subject, testDate, testLocation, passed } = req.body || {};
    const subj = (subject || '').toString().trim();
    if (!subj) {
      return res.status(400).json({ error: 'Missing subject' });
    }

    // Allow blank date or null
    let normalizedDate = null;
    if (testDate) {
      const d = new Date(testDate);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: 'Invalid test date' });
      }
      // store as YYYY-MM-DD
      normalizedDate = d.toISOString().slice(0, 10);
    }

    const normLocation = (testLocation || '').toString().trim() || null;
    const normPassed = !!passed;

    await pool.query(
      `
      INSERT INTO test_plans (user_id, subject, test_date, test_location, passed, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (user_id, subject)
      DO UPDATE SET
        test_date = EXCLUDED.test_date,
        test_location = EXCLUDED.test_location,
        passed = EXCLUDED.passed,
        updated_at = NOW()
      `,
      [userId, subj, normalizedDate, normLocation, normPassed]
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

    await client.query('BEGIN');

    // If user cleared everything, just delete all their tags
    if (selectedIds.length === 0) {
      await client.query(
        'DELETE FROM user_challenge_tags WHERE user_id = $1',
        [userId]
      );
    } else {
      // Remove any tags not in the new list
      const placeholders = selectedIds
        .map((_, i) => `$${i + 2}`)
        .join(', ');
      await client.query(
        `
        DELETE FROM user_challenge_tags
        WHERE user_id = $1
          AND challenge_id NOT IN (${placeholders})
        `,
        [userId, ...selectedIds]
      );

      // Add the ones that are missing
      for (const cid of selectedIds) {
        await client.query(
          `
          INSERT INTO user_challenge_tags (user_id, challenge_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
          `,
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
