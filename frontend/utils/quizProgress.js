/**
 * Quiz Progress Utilities
 *
 * Handles premade quiz catalog, progress tracking, and score aggregation
 * across all GED subjects.
 */

// Subject progress keys used throughout the app
export const SUBJECT_PROGRESS_KEYS = [
  'Social Studies',
  'Reasoning Through Language Arts (RLA)',
  'Science',
  'Math',
];

// GED passing score threshold
export const GED_PASSING_SCORE = 145;

// In-memory catalog for premade quizzes, populated when quiz data is loaded
export const PREMADE_QUIZ_CATALOG = {};

/**
 * Get the total number of premade quizzes available for a subject
 */
export function getPremadeQuizTotal(subject) {
  return Array.isArray(PREMADE_QUIZ_CATALOG[subject])
    ? PREMADE_QUIZ_CATALOG[subject].length
    : 0;
}

/**
 * Create an empty progress object for all subjects
 */
export function createEmptyProgress() {
  return SUBJECT_PROGRESS_KEYS.reduce((acc, subject) => {
    acc[subject] = {
      attempts: [],
      attemptCount: 0,
      averageScaledScore: null,
      completedCount: 0,
      completionPercentage: 0,
      passedExamCodes: [],
      totalPremadeExams: getPremadeQuizTotal(subject),
      lastAttempt: null,
    };
    return acc;
  }, {});
}

/**
 * Build progress summary from quiz attempt history
 * @param {Array} attempts - Array of quiz attempt objects
 * @returns {Object} Progress object with stats per subject
 */
export function buildProgressFromAttempts(attempts = []) {
  const progress = createEmptyProgress();
  const subjectStats = SUBJECT_PROGRESS_KEYS.reduce((acc, subject) => {
    acc[subject] = { scoreSum: 0, count: 0, passed: new Set() };
    return acc;
  }, {});

  const normalizedAttempts = Array.isArray(attempts) ? attempts : [];

  normalizedAttempts.forEach((entry) => {
    const subjectKey = entry?.subject;
    if (!subjectKey || !progress[subjectKey]) return;

    const normalized = {
      id: entry?.id ?? null,
      quizCode:
        entry?.quizCode ||
        entry?.quiz_code ||
        entry?.quizId ||
        entry?.quiz_id ||
        null,
      quizTitle:
        entry?.quizTitle || entry?.quiz_title || entry?.quizName || null,
      quizType: entry?.quizType || entry?.quiz_type || null,
      score:
        typeof entry?.score === 'number'
          ? entry.score
          : Number.isFinite(Number(entry?.score))
          ? Math.round(Number(entry.score))
          : null,
      totalQuestions:
        typeof entry?.totalQuestions === 'number'
          ? entry.totalQuestions
          : Number.isFinite(Number(entry?.total_questions))
          ? Math.round(Number(entry.total_questions))
          : Number.isFinite(Number(entry?.totalQuestions))
          ? Math.round(Number(entry.totalQuestions))
          : null,
      scaledScore:
        typeof entry?.scaledScore === 'number'
          ? Math.round(entry.scaledScore)
          : Number.isFinite(Number(entry?.scaled_score))
          ? Math.round(Number(entry.scaled_score))
          : null,
      attemptedAt:
        entry?.attemptedAt || entry?.attempted_at || entry?.takenAt || null,
    };

    const derivedPassed = (() => {
      if (typeof entry?.passed === 'boolean') return entry.passed;
      if (typeof entry?.passed === 'string') {
        const lowered = entry.passed.trim().toLowerCase();
        if (lowered === 'true' || lowered === '1') return true;
        if (lowered === 'false' || lowered === '0') return false;
      }
      if (normalized.scaledScore != null)
        return normalized.scaledScore >= GED_PASSING_SCORE;
      return null;
    })();

    normalized.passed = derivedPassed;
    progress[subjectKey].attempts.push(normalized);
    if (normalized.scaledScore != null) {
      subjectStats[subjectKey].scoreSum += normalized.scaledScore;
      subjectStats[subjectKey].count += 1;
    }
    if (normalized.passed && normalized.quizCode) {
      subjectStats[subjectKey].passed.add(normalized.quizCode);
    }
  });

  SUBJECT_PROGRESS_KEYS.forEach((subject) => {
    const stats = subjectStats[subject];
    const subjectProgress = progress[subject];
    subjectProgress.attemptCount = subjectProgress.attempts.length;
    if (stats.count > 0) {
      subjectProgress.averageScaledScore = Math.round(
        stats.scoreSum / stats.count
      );
    }
    subjectProgress.completedCount = stats.count;
    subjectProgress.passedExamCodes = Array.from(stats.passed);
    const totalPremade = subjectProgress.totalPremadeExams || 0;
    subjectProgress.completionPercentage = totalPremade
      ? Math.round((subjectProgress.completedCount / totalPremade) * 100)
      : 0;
    subjectProgress.lastAttempt =
      subjectProgress.attempts.slice().sort((a, b) => {
        const atA = a?.attemptedAt ? new Date(a.attemptedAt).getTime() : 0;
        const atB = b?.attemptedAt ? new Date(b.attemptedAt).getTime() : 0;
        return atB - atA;
      })[0] || null;
  });

  return progress;
}

/**
 * Ensure user profile has valid structure and display name
 * @param {Object} user - User object
 * @returns {Object} Validated user object
 */
export function ensureUserProfile(user) {
  if (!user || typeof user !== 'object') {
    return null;
  }

  const email = typeof user.email === 'string' ? user.email : '';
  const displayName =
    (typeof user.display_name === 'string' && user.display_name.trim()) ||
    (typeof user.name === 'string' && user.name.trim()) ||
    (email && email.includes('@') ? email.split('@')[0] : 'Learner');

  const firstName =
    typeof user.first_name === 'string' && user.first_name.trim()
      ? user.first_name.trim()
      : null;

  const lastName =
    typeof user.last_name === 'string' && user.last_name.trim()
      ? user.last_name.trim()
      : null;

  const picture =
    user.picture && typeof user.picture === 'string' && user.picture.trim()
      ? user.picture.trim()
      : `https://ui-avatars.com/api/?background=0ea5e9&color=fff&name=${encodeURIComponent(
          displayName
        )}`;

  const role = typeof user.role === 'string' ? user.role : 'student';
  const organizationId = user.organization_id ?? null;
  const organizationName = user.organization_name ?? null;

  return {
    ...user,
    name: displayName,
    display_name: displayName,
    first_name: firstName,
    last_name: lastName,
    picture,
    role,
    organization_id: organizationId,
    organization_name: organizationName,
  };
}

// Attach to window for legacy compatibility
if (typeof window !== 'undefined') {
  window.SUBJECT_PROGRESS_KEYS = SUBJECT_PROGRESS_KEYS;
  window.GED_PASSING_SCORE = GED_PASSING_SCORE;
  window.PREMADE_QUIZ_CATALOG = PREMADE_QUIZ_CATALOG;
  window.getPremadeQuizTotal = getPremadeQuizTotal;
  window.createEmptyProgress = createEmptyProgress;
  window.buildProgressFromAttempts = buildProgressFromAttempts;
  window.ensureUserProfile = ensureUserProfile;
}
