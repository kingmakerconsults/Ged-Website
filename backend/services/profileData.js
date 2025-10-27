const db = require('../db');

async function ensureProfileExists(userId) {
  if (!userId) {
    return;
  }
  try {
    await db.query(
      'INSERT INTO profiles (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
      [userId]
    );
  } catch (err) {
    console.error('ensureProfileExists error', err);
  }
}

// Utility: days until a YYYY-MM-DD date string
function daysUntil(dateStr) {
  if (!dateStr) return null;
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [y, m, d] = dateStr.split('-').map(Number);
    const tgt = new Date(y, m - 1, d);
    const diff = tgt - today;
    if (diff < 0) return 0;
    return Math.floor(diff / 86400000);
  } catch {
    return null;
  }
}

/**
 * loadChallengeOptions(userId)
 *
 * Returns array of:
 * [
 *   { id, subject, subtopic, label, selected: true/false },
 *   ...
 * ]
 *
 * This is driven by challenge_catalog + user_challenge_tags.
 */
async function loadChallengeOptions(userId) {
  const rows = await db.many(
    `
    SELECT
      c.id,
      c.subject,
      c.subtopic,
      c.label,
      (t.user_id IS NOT NULL) AS selected
    FROM challenge_catalog c
    LEFT JOIN user_challenge_tags t
      ON t.challenge_id = c.id
     AND t.user_id = $1
    ORDER BY c.subject, c.subtopic, c.label
    `,
    [userId]
  ).catch(() => {
    // Fallback: no crash if query fails
    return [];
  });

  return rows.map(r => ({
    id: r.id,
    subject: r.subject,
    subtopic: r.subtopic,
    label: r.label,
    selected: r.selected
  }));
}

/**
 * loadTestPlan(userId)
 *
 * We need to return:
 * {
 *   testPlan: [
 *     { subject, testDate, testLocation, passed, daysUntil },
 *     ...
 *   ],
 *   nextUpcomingTest: {
 *     subject,
 *     testDate,
 *     daysUntil
 *   } | null
 * }
 *
 * Data comes from test_plans.
 * We ALWAYS include these 4 subjects even if not in DB: Math, RLA, Science, Social Studies.
 */
async function loadTestPlan(userId) {
  const dbRows = await db.many(
    `
    SELECT subject,
           test_date,
           test_location,
           passed,
           not_scheduled
    FROM test_plans
    WHERE user_id = $1
    `,
    [userId]
  ).catch(() => {
    return [];
  });

  const SUBJECTS = ['Math', 'RLA', 'Science', 'Social Studies'];

  // index rows by subject
  const map = {};
  for (const r of dbRows) {
    map[r.subject] = {
      subject: r.subject,
      testDate: r.test_date ? r.test_date.toISOString().slice(0,10) : null,
      testLocation: r.test_location || null,
      passed: !!r.passed,
      notScheduled: !!r.not_scheduled
    };
  }

  // build full list with defaults
  const full = SUBJECTS.map(subj => {
    const info = map[subj] || {
      subject: subj,
      testDate: null,
      testLocation: null,
      passed: false,
      notScheduled: false
    };
    return {
      ...info,
      daysUntil: daysUntil(info.testDate)
    };
  });

  // pick next upcoming test (earliest non-null, future date)
  let soonest = null;
  for (const tp of full) {
    if (!tp.testDate) continue;
    const du = daysUntil(tp.testDate);
    if (du === null) continue;
    if (soonest === null || du < soonest.daysUntil) {
      soonest = {
        subject: tp.subject,
        testDate: tp.testDate,
        daysUntil: du
      };
    }
  }

  return {
    testPlan: full,
    nextUpcomingTest: soonest
  };
}

/**
 * loadScoresSafe(userId)
 *
 * Summaries from assessment_scores.
 *
 * This MUST NOT crash if assessment_scores is empty or schema changes.
 * If anything fails, return empty arrays/objects.
 *
 * bySubject: [{ subject, latest, avg }, ... ]
 * bySubtopic: [{ subject, subtopic, latest, avg }, ... ]
 * recentScoresDashboard: {} <-- placeholder for dashboard summary
 */
async function loadScoresSafe(userId) {
  try {
    // We are intentionally returning empty structures for now
    // so that profile doesn't 500 if queries are incomplete.
    // We'll wire in real rollup SQL later.
    return {
      bySubject: [],
      bySubtopic: [],
      recentScoresDashboard: {}
    };
  } catch (err) {
    console.error('loadScoresSafe error', err);
    return {
      bySubject: [],
      bySubtopic: [],
      recentScoresDashboard: {}
    };
  }
}

/**
 * loadProfileBundle(userId)
 *
 * The main data shape returned by GET /api/profile/me.
 */
async function loadProfileBundle(userId) {
  if (!userId) {
    throw new Error('loadProfileBundle requires a userId');
  }

  await ensureProfileExists(userId);

  // 1. basic profile info (users + profiles)
  const row = await db.oneOrNone(
    `
    SELECT
      u.name,
      p.test_date,
      p.test_location,
      p.passed,
      p.onboarding_complete,
      p.reminder_enabled,
      p.timezone,
      p.font_size,
      p.theme
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
    WHERE u.id = $1
    `,
    [userId]
  ).catch(() => null);

  const profile = {
    name: row?.name || "",
    testDate: row?.test_date
      ? row.test_date.toISOString().slice(0,10)
      : null,
    testLocation: row?.test_location || null,
    passed: !!row?.passed,
    onboardingComplete: !!row?.onboarding_complete,
    reminderEnabled: !!row?.reminder_enabled,
    timezone: row?.timezone || 'America/New_York',
    fontSize: row?.font_size || 'md',
    theme: row?.theme || 'system',
    daysUntilTest: row?.test_date
      ? daysUntil(row.test_date.toISOString().slice(0,10))
      : null
  };

  // 2. per-subject plan
  const { testPlan, nextUpcomingTest } = await loadTestPlan(userId);

  // 3. learning challenges
  const challengeOptions = await loadChallengeOptions(userId);

  // 4. scores (safe wrapper so we never crash)
  const scoreData = await loadScoresSafe(userId);
  const safeBySubject = Array.isArray(scoreData?.bySubject)
    ? scoreData.bySubject
    : [];
  const safeBySubtopic = Array.isArray(scoreData?.bySubtopic)
    ? scoreData.bySubtopic
    : [];
  const safeDashboard =
    scoreData && typeof scoreData.recentScoresDashboard === 'object' && scoreData.recentScoresDashboard !== null
      ? scoreData.recentScoresDashboard
      : {};

  return {
    profile,
    challengeOptions,
    scores: {
      bySubject: safeBySubject,
      bySubtopic: safeBySubtopic
    },
    recentScoresDashboard: safeDashboard,
    testPlan,
    nextUpcomingTest
  };
}

module.exports = {
  loadProfileBundle,
  loadChallengeOptions,
  loadTestPlan,
  loadScoresSafe,
  daysUntil
};
