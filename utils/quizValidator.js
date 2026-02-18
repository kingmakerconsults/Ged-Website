// Lightweight structural validator + tier progression review for quiz items.
// Structural checks are strict. Tier/complexity checks are report-only warnings.

const TOPIC_TIER_KEYS = new Set([
  'foundations',
  'core',
  'test-ready',
  'challenge',
]);
const LEARNER_TIER_KEYS = new Set(['foundation', 'test-ready', 'challenge']);

function normalizeTopicTier(raw) {
  const tier = String(raw || '')
    .trim()
    .toLowerCase();
  if (!tier) return null;
  if (tier === 'foundation') return 'foundations';
  return TOPIC_TIER_KEYS.has(tier) ? tier : null;
}

function toLearnerTier(rawTier) {
  const normalized = normalizeTopicTier(rawTier);
  if (!normalized) return null;
  if (normalized === 'test-ready' || normalized === 'challenge') {
    return normalized;
  }
  return 'foundation';
}

function normalizeQuestionTier(raw) {
  const tier = String(raw || '')
    .trim()
    .toLowerCase();
  if (!tier) return null;
  if (tier === 'foundations' || tier === 'core') return 'foundation';
  if (tier === 'foundation') return 'foundation';
  if (tier === 'test-ready') return 'test-ready';
  if (tier === 'challenge') return 'challenge';
  return null;
}

function pickChoicesArray(q) {
  // Normalize property name
  if (Array.isArray(q?.choices)) return q.choices;
  if (Array.isArray(q?.answerOptions)) return q.answerOptions;
  return null;
}

function getQuestionText(q) {
  return (
    q?.question ??
    q?.prompt ??
    q?.stem ??
    q?.content?.questionText ??
    q?.content?.question ??
    null
  );
}

function getPassageText(q) {
  return q?.passage ?? q?.content?.passage ?? '';
}

function getQuestionTier(q) {
  return (
    q?.tier ??
    q?.questionTier ??
    q?.level ??
    q?.difficultyTier ??
    q?.metadata?.tier ??
    null
  );
}

function estimateComplexityBand(q) {
  const text = `${getQuestionText(q) || ''} ${getPassageText(q) || ''}`
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  const wordCount = text ? text.split(' ').length : 0;
  const hasPassage = Boolean(getPassageText(q));
  const complexityCueCount = [
    /\bcompare\b|\bcontrast\b|\banalyze\b|\binfer\b|\bevaluate\b|\bjustify\b/,
    /\bbased on\b|\baccording to\b|\bfrom the (graph|table|passage|data)\b/,
    /\bsystem\b|\binequalit(y|ies)\b|\bfunction\b|\bquadratic\b|\bprobability\b|\bmodel\b/,
    /\bmost likely\b|\bbest supports\b|\bbest explains\b|\bwhich statement\b/,
    /\bafter\b.+\bthen\b|\bfirst\b.+\bthen\b|\bmulti[-\s]?step\b/,
  ].filter((re) => re.test(text)).length;

  const explicitDifficulty = String(q?.difficulty || '')
    .trim()
    .toLowerCase();
  if (explicitDifficulty === 'hard') return 'challenge';
  if (explicitDifficulty === 'medium') {
    if (hasPassage || complexityCueCount >= 2 || wordCount >= 45) {
      return 'test-ready';
    }
    return 'foundation';
  }

  if (hasPassage && complexityCueCount >= 2) return 'challenge';
  if (hasPassage || complexityCueCount >= 1 || wordCount >= 45)
    return 'test-ready';
  return 'foundation';
}

function makeTierWarning(index, reason, detail = undefined) {
  return {
    index,
    reason,
    ...(detail ? { detail } : {}),
    severity: 'warning',
    requiresManualReview: true,
  };
}

export function validateQuizArray(quizzes, { verbose = true } = {}) {
  const problems = [];

  quizzes.forEach((q, i) => {
    const idx = i;
    const choices = pickChoicesArray(q);
    const hasObjectStyle =
      Array.isArray(q?.answerOptions) &&
      typeof q?.answerOptions?.[0] === 'object';
    const qText = getQuestionText(q);
    const qType = String(q?.type || '').toLowerCase();
    const isMultipleChoice =
      qType.includes('multiple-choice') ||
      hasObjectStyle ||
      Array.isArray(q?.choices);

    // Presence checks
    if (!q || typeof q !== 'object') {
      problems.push({ index: idx, reason: 'invalid question object', q });
      return;
    }
    if (!qText || String(qText).trim() === '') {
      problems.push({ index: idx, reason: 'missing field: question', q });
      return;
    }
    if (isMultipleChoice && (!Array.isArray(choices) || choices.length === 0)) {
      problems.push({ index: idx, reason: 'missing field: choices', q });
      return;
    }

    // Ensure four choices when MC
    if (isMultipleChoice && choices.length < 4) {
      problems.push({
        index: idx,
        reason: `too few choices (${choices.length})`,
        q,
      });
    }

    // Rationale presence (object-style or top-level)
    if (hasObjectStyle) {
      const miss = q.answerOptions.some(
        (o) => !o || !o.rationale || String(o.rationale).trim() === ''
      );
      if (miss)
        problems.push({ index: idx, reason: 'missing option rationale', q });
    } else if (
      isMultipleChoice &&
      (!q.rationale || String(q.rationale).trim() === '')
    ) {
      problems.push({ index: idx, reason: 'missing field: rationale', q });
    }

    // Correct answer checks
    if (hasObjectStyle) {
      const correct = (q.answerOptions || []).filter(
        (o) => o && o.isCorrect === true
      );
      if (correct.length !== 1) {
        problems.push({
          index: idx,
          reason: `expected exactly 1 correct option, found ${correct.length}`,
        });
      }
    } else if (isMultipleChoice) {
      const ca = q.correctAnswer ?? q.answerKey;
      if (ca === undefined || ca === null || String(ca).trim() === '') {
        problems.push({
          index: idx,
          reason: 'missing field: correctAnswer',
          q,
        });
      } else {
        const inChoices = choices.some(
          (c) =>
            c === ca ||
            c?.value === ca ||
            String(c).trim() === String(ca).trim()
        );
        if (!inChoices)
          problems.push({
            index: idx,
            reason: 'correctAnswer not in choices',
            q,
          });
      }
    }

    // Duplicate choice texts (ignoring whitespace/case)
    if (isMultipleChoice) {
      const seen = new Set();
      const texts = choices.map((c) =>
        typeof c === 'string' ? c : (c?.text ?? '')
      );
      for (const t of texts) {
        const key = String(t).replace(/\s+/g, ' ').trim().toLowerCase();
        if (seen.has(key)) {
          problems.push({
            index: idx,
            reason: 'duplicate choice',
            choice: t,
            q,
          });
          break;
        }
        seen.add(key);
      }
    }
  });

  if (verbose) {
    // Keep console noise minimal in CI
    console.log('Math quiz audit report:', problems);
  }
  return problems;
}

export function buildTierReviewReport(
  quizzes,
  {
    verbose = true,
    topicTier = null,
    getTopicTier = null,
    requireQuestionTier = true,
  } = {}
) {
  const structuralProblems = validateQuizArray(quizzes, { verbose: false });
  const warnings = [];

  quizzes.forEach((q, i) => {
    const rawTopicTier =
      typeof getTopicTier === 'function' ? getTopicTier(q, i) : topicTier;
    const normalizedTopicTier = normalizeTopicTier(rawTopicTier);
    const learnerTopicTier = toLearnerTier(normalizedTopicTier);

    const rawQuestionTier = getQuestionTier(q);
    const learnerQuestionTier = normalizeQuestionTier(rawQuestionTier);

    if (rawTopicTier && !normalizedTopicTier) {
      warnings.push(
        makeTierWarning(i, 'invalid topic tier value', {
          topicTier: rawTopicTier,
        })
      );
    }

    if (rawQuestionTier && !learnerQuestionTier) {
      warnings.push(
        makeTierWarning(i, 'invalid question tier value', {
          questionTier: rawQuestionTier,
          allowed: Array.from(LEARNER_TIER_KEYS),
        })
      );
    }

    if (requireQuestionTier && !learnerQuestionTier) {
      warnings.push(
        makeTierWarning(i, 'missing question tier metadata', {
          expected: Array.from(LEARNER_TIER_KEYS),
        })
      );
    }

    if (learnerTopicTier && learnerQuestionTier) {
      const rank = { foundation: 1, 'test-ready': 2, challenge: 3 };
      const topicRank = rank[learnerTopicTier] || 1;
      const questionRank = rank[learnerQuestionTier] || 1;
      if (questionRank > topicRank) {
        warnings.push(
          makeTierWarning(i, 'question tier exceeds topic tier', {
            topicTier: learnerTopicTier,
            questionTier: learnerQuestionTier,
          })
        );
      }
    }

    if (learnerTopicTier) {
      const estimatedTier = estimateComplexityBand(q);
      const rank = { foundation: 1, 'test-ready': 2, challenge: 3 };
      const expected = rank[learnerTopicTier];
      const actual = rank[estimatedTier];
      if (actual < expected) {
        warnings.push(
          makeTierWarning(i, 'question complexity appears below topic tier', {
            topicTier: learnerTopicTier,
            estimatedComplexity: estimatedTier,
            difficulty: q?.difficulty || null,
          })
        );
      }
    }
  });

  const report = {
    structuralProblems,
    warnings,
    summary: {
      totalQuestions: quizzes.length,
      structuralProblemCount: structuralProblems.length,
      warningCount: warnings.length,
      requiresManualReview: warnings.length > 0,
    },
  };

  if (verbose) {
    console.log('Quiz tier review report:', JSON.stringify(report.summary));
  }

  return report;
}

export default { validateQuizArray, buildTierReviewReport };
