const db = require('../db');

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

  return {
    profile: { ...demoProfile, daysUntilTest: daysUntil(demoProfile.testDate) },
    challengeOptions: demoChallengeOptions,
    scores: demoScores,
    recentScoresDashboard: demoRecentScoresDashboard,
  };
}

function ensureBundle(userId) {
  if (!demoBundles.has(userId)) {
    demoBundles.set(userId, createDefaultBundle());
  }
  return demoBundles.get(userId);
}

async function loadProfileBundle(userId) {
  const bundle = ensureBundle(userId);
  const profile = { ...bundle.profile, daysUntilTest: daysUntil(bundle.profile.testDate) };
  return {
    profile,
    challengeOptions: bundle.challengeOptions.map((opt) => ({ ...opt })),
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
  bundle.profile.daysUntilTest = daysUntil(bundle.profile.testDate);
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

module.exports = {
  loadProfileBundle,
  updateProfileFields,
  replaceChallengeSelections,
  markOnboardingComplete,
  selectedChallengeCount,
};
