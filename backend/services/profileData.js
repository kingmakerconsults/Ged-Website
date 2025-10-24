const TEST_SUBJECTS = ['Math', 'RLA', 'Science', 'Social Studies'];

function normalizeDateValue(value) {
  if (!value) return null;
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  const str = String(value).trim();
  if (!str) return null;
  // Expecting YYYY-MM-DD; keep simple passthrough for demo purposes.
  return str;
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [y, m, d] = dateStr.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    const diffMs = target - today;
    return diffMs < 0 ? 0 : Math.floor(diffMs / 86400000);
  } catch {
    return null;
  }
}

const demoBundles = new Map();

function createDefaultBundle() {
  // TODO: SELECT u.name, p.test_date, p.test_location, p.passed,
  // p.onboarding_complete, p.reminder_enabled, p.timezone,
  // p.font_size, p.theme FROM users u JOIN profiles p ...
  const demoProfile = {
    name: 'Zachary',
    testDate: null,
    testLocation: null,
    passed: false,
    onboardingComplete: false,
    reminderEnabled: true,
    timezone: 'America/New_York',
    fontSize: 'md',
    theme: 'system',
  };

  // TODO: SELECT challenge_catalog.*, (user_challenge_tags.user_id IS NOT NULL) AS selected
  const demoChallengeOptions = [
    {
      id: 'uuid1',
      subject: 'Math',
      subtopic: 'Fractions',
      label: 'Word problems with fractions',
      selected: true,
    },
    {
      id: 'uuid2',
      subject: 'Social Studies',
      subtopic: 'Civics',
      label: 'Branches of government',
      selected: false,
    },
    {
      id: 'uuid3',
      subject: 'Science',
      subtopic: 'Physics',
      label: 'Forces and motion basics',
      selected: false,
    },
    {
      id: 'uuid4',
      subject: 'RLA',
      subtopic: 'Reading Comprehension',
      label: 'Identify main ideas in passages',
      selected: false,
    },
  ];

  // TODO: build rollups from assessment_scores (bySubject / bySubtopic)
  const demoScores = {
    bySubject: [],
    bySubtopic: [],
  };

  // TODO: dashboard summary of recent scores
  const demoRecentScoresDashboard = {
    overall: null,
  };

  const demoTestPlan = TEST_SUBJECTS.map((subject) => ({
    subject,
    testDate: null,
    testLocation: null,
    passed: false,
  }));

  return {
    profile: { ...demoProfile, daysUntilTest: daysUntil(demoProfile.testDate) },
    challengeOptions: demoChallengeOptions,
    scores: demoScores,
    recentScoresDashboard: demoRecentScoresDashboard,
    testPlanEntries: demoTestPlan,
  };
}

function ensureBundle(userId) {
  if (!demoBundles.has(userId)) {
    demoBundles.set(userId, createDefaultBundle());
  }
  return demoBundles.get(userId);
}

async function loadChallengeOptions(userId) {
  // TODO:
  // SELECT c.id, c.subject, c.subtopic, c.label,
  //        (t.user_id IS NOT NULL) AS selected
  // FROM challenge_catalog c
  // LEFT JOIN user_challenge_tags t
  //   ON t.challenge_id = c.id
  //  AND t.user_id = $1
  // ORDER BY c.subject, c.subtopic, c.label;
  const bundle = ensureBundle(userId);
  if (!Array.isArray(bundle.challengeOptions)) {
    bundle.challengeOptions = [];
  }
  bundle.challengeOptions = bundle.challengeOptions.map((opt) => ({
    ...opt,
    selected: !!opt.selected,
  }));
  return bundle.challengeOptions.map((opt) => ({ ...opt }));
}

async function loadTestPlan(userId) {
  const bundle = ensureBundle(userId);

  // TODO: SELECT user_id, subject, test_date, test_location, passed FROM test_plans WHERE user_id = $1
  const storedRows = Array.isArray(bundle.testPlanEntries) ? bundle.testPlanEntries : [];
  const rowMap = new Map();
  storedRows.forEach((row) => {
    if (!row || !row.subject) {
      return;
    }
    const subject = String(row.subject);
    rowMap.set(subject, {
      subject,
      testDate: normalizeDateValue(row.testDate ?? row.test_date),
      testLocation: row.testLocation ?? row.test_location ?? null,
      passed: !!row.passed,
    });
  });

  const testPlan = TEST_SUBJECTS.map((subject) => {
    const existing = rowMap.get(subject) || { subject, testDate: null, testLocation: null, passed: false };
    const normalizedDate = normalizeDateValue(existing.testDate);
    return {
      subject,
      testDate: normalizedDate,
      testLocation: existing.testLocation || null,
      passed: !!existing.passed,
      daysUntil: normalizedDate ? daysUntil(normalizedDate) : null,
    };
  });

  bundle.testPlanEntries = testPlan.map(({ subject, testDate, testLocation, passed }) => ({
    subject,
    testDate,
    testLocation,
    passed,
  }));

  const upcoming = testPlan
    .filter((entry) => !!entry.testDate)
    .sort((a, b) => {
      if (!a.testDate && !b.testDate) return 0;
      if (!a.testDate) return 1;
      if (!b.testDate) return -1;
      return new Date(a.testDate) - new Date(b.testDate);
    })[0];

  const nextUpcomingTest = upcoming
    ? {
        subject: upcoming.subject,
        testDate: upcoming.testDate,
        daysUntil: upcoming.daysUntil,
      }
    : null;

  return { testPlan, nextUpcomingTest };
}

async function loadProfileBundle(userId) {
  const bundle = ensureBundle(userId);
  const { testPlan, nextUpcomingTest } = await loadTestPlan(userId);
  const challengeOptions = await loadChallengeOptions(userId);

  const profile = { ...bundle.profile };
  const allPassed = testPlan.length > 0 && testPlan.every((entry) => entry.passed);
  const upcomingEntry = nextUpcomingTest
    ? testPlan.find(
        (entry) =>
          entry.subject === nextUpcomingTest.subject &&
          entry.testDate === nextUpcomingTest.testDate
      ) || null
    : null;

  profile.passed = allPassed;
  profile.testDate = nextUpcomingTest ? nextUpcomingTest.testDate : null;
  profile.daysUntilTest = nextUpcomingTest ? nextUpcomingTest.daysUntil : null;
  profile.testLocation = upcomingEntry ? upcomingEntry.testLocation : null;

  bundle.profile = {
    ...bundle.profile,
    passed: profile.passed,
    testDate: profile.testDate,
    daysUntilTest: profile.daysUntilTest,
    testLocation: profile.testLocation,
  };

  return {
    profile: { ...profile },
    challengeOptions: challengeOptions.map((opt) => ({ ...opt })),
    testPlan: testPlan.map((entry) => ({ ...entry })),
    nextUpcomingTest: nextUpcomingTest ? { ...nextUpcomingTest } : null,
    scores: {
      bySubject: Array.isArray(bundle.scores?.bySubject)
        ? bundle.scores.bySubject.map((row) => ({ ...row }))
        : [],
      bySubtopic: Array.isArray(bundle.scores?.bySubtopic)
        ? bundle.scores.bySubtopic.map((row) => ({ ...row }))
        : [],
    },
    recentScoresDashboard: { ...(bundle.recentScoresDashboard || {}) },
  };
}

function updateProfileFields(userId, patch = {}) {
  const bundle = ensureBundle(userId);
  bundle.profile = {
    ...bundle.profile,
    ...patch,
  };
  if (Object.prototype.hasOwnProperty.call(patch, 'testDate')) {
    bundle.profile.daysUntilTest = daysUntil(bundle.profile.testDate);
  }
  return bundle.profile;
}

function replaceChallengeSelections(userId, selectedIds = []) {
  const bundle = ensureBundle(userId);
  const set = new Set(Array.isArray(selectedIds) ? selectedIds : []);
  bundle.challengeOptions = bundle.challengeOptions.map((opt) => ({
    ...opt,
    selected: set.has(opt.id),
  }));
  return bundle.challengeOptions;
}

function markOnboardingComplete(userId, value) {
  const bundle = ensureBundle(userId);
  bundle.profile.onboardingComplete = !!value;
  return bundle.profile.onboardingComplete;
}

function selectedChallengeCount(userId) {
  const bundle = ensureBundle(userId);
  return bundle.challengeOptions.filter((opt) => opt.selected).length;
}

function upsertTestPlanEntry(userId, entry = {}) {
  const bundle = ensureBundle(userId);
  if (!Array.isArray(bundle.testPlanEntries)) {
    bundle.testPlanEntries = [];
  }
  const subject = entry.subject ? String(entry.subject) : null;
  if (!subject) {
    return;
  }
  const normalizedDate = normalizeDateValue(entry.testDate);
  const normalizedLocation = entry.testLocation ? String(entry.testLocation).trim() : null;
  const passed = !!entry.passed;

  const idx = bundle.testPlanEntries.findIndex((row) => row.subject === subject);
  const payload = {
    subject,
    testDate: normalizedDate,
    testLocation: normalizedLocation,
    passed,
  };
  if (idx >= 0) {
    bundle.testPlanEntries[idx] = payload;
  } else {
    bundle.testPlanEntries.push(payload);
  }
  return payload;
}

module.exports = {
  TEST_SUBJECTS,
  loadProfileBundle,
  loadTestPlan,
  loadChallengeOptions,
  updateProfileFields,
  replaceChallengeSelections,
  markOnboardingComplete,
  selectedChallengeCount,
  upsertTestPlanEntry,
};
