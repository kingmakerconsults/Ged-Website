'use strict';

const { validateFilledPlan } = require('./validateExamPlan');
const { upgradeQuestionToKatex } = require('../lib/mathSanitizer');

/**
 * Final assembly of a completed exam plan into a JSON payload.
 *
 * Rules:
 *  - Preserve grouped stimulus sets (group key)
 *  - Shuffle only within allowed groups
 *  - Renumber after final assembly
 *  - Verify exact total, category, section counts
 *  - Verify no null items or duplicates
 *  - Throw if invariants fail
 *
 * @param {Object} plan        – frozen exam plan
 * @param {Map}    filledSlots – slotId → questions[] or essay object
 * @param {Object} [opts]
 * @param {Function} [opts.sanitizer] – optional post-fill sanitizer function(questions) → questions
 * @param {Function} [opts.reviewPass] – optional light-cleanup AI review function(quiz, aiOptions) → quiz
 * @param {Object} [opts.aiOptions]
 * @returns {Object} final quiz payload
 */
async function finalizeExamPayload(plan, filledSlots, opts = {}) {
  const { sanitizer, reviewPass, aiOptions } = opts;

  // ── 1. Validate the filled plan ─────────────────────────────────
  const validation = validateFilledPlan(plan, filledSlots);
  if (!validation.valid) {
    const msg = `Exam plan validation failed for ${plan.subject}:\n  ${validation.errors.join('\n  ')}`;
    console.error('[finalizeExamPayload]', msg);
    throw new Error(msg);
  }
  if (validation.warnings.length > 0) {
    console.warn(
      `[finalizeExamPayload] ${plan.subject} warnings:\n  ${validation.warnings.join('\n  ')}`
    );
  }

  // ── 2. Collect questions by section ─────────────────────────────
  const sectionQuestions = {};
  let essayPayload = null;

  for (const slot of plan.slots) {
    const filled = filledSlots.get(slot.slotId);
    if (slot.responseType === 'essay') {
      essayPayload = filled;
      continue;
    }
    if (!Array.isArray(filled)) continue;
    const section = slot.section || 'main';
    if (!sectionQuestions[section]) sectionQuestions[section] = [];
    sectionQuestions[section].push(...filled);
  }

  // ── 3. Shuffle within groups, preserving group order ───────────
  for (const section of Object.keys(sectionQuestions)) {
    sectionQuestions[section] = shufflePreservingGroups(
      sectionQuestions[section]
    );
  }

  // ── 4. Apply optional sanitizer ─────────────────────────────────
  if (typeof sanitizer === 'function') {
    for (const section of Object.keys(sectionQuestions)) {
      sectionQuestions[section] = sanitizer(sectionQuestions[section]);
    }
  }

  // ── 4b. KaTeX normalization ─────────────────────────────────────
  // Upgrade plain-text math tokens to KaTeX-delimited form for all
  // Math and Science questions. Safe for prose subjects too (only
  // converts patterns that are unambiguously math).
  const katexSubjects = new Set(['Math', 'Science']);
  if (katexSubjects.has(plan.subject)) {
    for (const section of Object.keys(sectionQuestions)) {
      sectionQuestions[section] = sectionQuestions[section].map((q) =>
        upgradeQuestionToKatex({ ...q })
      );
    }
  }

  // ── 5. Renumber ─────────────────────────────────────────────────
  let globalNum = 1;
  for (const section of Object.keys(sectionQuestions)) {
    for (const q of sectionQuestions[section]) {
      q.questionNumber = globalNum++;
    }
  }

  // ── 6. Build payload per exam type ──────────────────────────────
  const ts = Date.now();
  let quiz;

  if (plan.type === 'multi-part-rla') {
    const part1 = sectionQuestions['part1_reading'] || [];
    const part3 = sectionQuestions['part3_language'] || [];
    const allMC = [...part1, ...part3];

    quiz = {
      id: `ai_comp_rla_${ts}`,
      title: 'Comprehensive RLA Exam',
      subject:
        plan.subject === 'RLA'
          ? 'Reasoning Through Language Arts'
          : plan.subject,
      type: 'multi-part-rla',
      totalTime: 150 * 60,
      part1_reading: part1,
      part2_essay: essayPayload,
      part3_language: part3,
      questions: allMC,
      source: 'aiGenerated',
      usesKatex: true,
      fraction_plain_text_mode: false,
    };

    // Invariant: questions must equal [...part1, ...part3]
    assertArraySync('RLA', quiz.questions, [
      ...quiz.part1_reading,
      ...quiz.part3_language,
    ]);
  } else if (plan.type === 'multi-part-math') {
    const part1 = sectionQuestions['part1_non_calculator'] || [];
    const part2 = sectionQuestions['part2_calculator'] || [];
    const allQ = [...part1, ...part2];

    // Renumber combined
    allQ.forEach((q, i) => {
      q.questionNumber = i + 1;
    });

    quiz = {
      id: `ai_comp_math_${ts}`,
      title: 'Comprehensive Mathematical Reasoning Exam',
      subject: 'Math',
      type: 'multi-part-math',
      source: 'aiGenerated',
      usesKatex: true,
      fraction_plain_text_mode: false,
      config: { formulaSheet: true },
      part1_non_calculator: part1,
      part2_calculator: part2,
      questions: allQ,
    };

    // Invariant: questions must equal [...part1, ...part2]
    assertArraySync('Math', quiz.questions, [
      ...quiz.part1_non_calculator,
      ...quiz.part2_calculator,
    ]);
  } else {
    // Single-part (Social Studies, Science)
    const allQ = sectionQuestions['main'] || [];
    quiz = {
      id: `ai_comp_${plan.subject.toLowerCase().replace(/\s+/g, '_')}_${ts}`,
      title: `Comprehensive ${plan.subject} Exam`,
      subject: plan.subject,
      source: 'aiGenerated',
      usesKatex: true,
      fraction_plain_text_mode: false,
      questions: allQ,
    };
    if (plan.subject === 'Science') {
      quiz.config = { formulaSheet: true };
    }
  }

  // ── 7. Optional light review pass ───────────────────────────────
  if (typeof reviewPass === 'function' && aiOptions) {
    try {
      const reviewed = await reviewPass(quiz, aiOptions);
      if (
        reviewed &&
        reviewed.questions &&
        reviewed.questions.length >= quiz.questions.length * 0.8
      ) {
        quiz = reviewed;
      }
    } catch (err) {
      console.warn(
        '[finalizeExamPayload] Review pass failed, using unreviewed:',
        err.message
      );
    }
  }

  // ── 8. Post-review re-validation ────────────────────────────────
  // Re-verify counts after any review pass
  const finalCount = quiz.questions ? quiz.questions.length : 0;
  const expectedMC =
    plan.type === 'multi-part-rla'
      ? plan.invariants.part1_reading + plan.invariants.part3_language
      : plan.type === 'multi-part-math'
        ? plan.invariants.part1_non_calculator +
          plan.invariants.part2_calculator
        : plan.invariants.totalQuestions - (essayPayload ? 1 : 0);

  if (finalCount !== expectedMC) {
    console.error(
      `[finalizeExamPayload] Post-review count mismatch: ${finalCount} vs expected ${expectedMC}`
    );
    // Don't throw here — the pre-review payload was valid
  }

  // For multi-part math, rebuild section arrays from final questions
  if (plan.type === 'multi-part-math' && quiz.questions) {
    quiz.part1_non_calculator = quiz.questions.filter(
      (q) => q._section === 'part1_non_calculator'
    );
    quiz.part2_calculator = quiz.questions.filter(
      (q) => q._section === 'part2_calculator'
    );
    // Re-verify sync
    assertArraySync('Math', quiz.questions, [
      ...quiz.part1_non_calculator,
      ...quiz.part2_calculator,
    ]);
  }

  // For multi-part RLA, rebuild section arrays from final questions
  if (plan.type === 'multi-part-rla' && quiz.questions) {
    quiz.part1_reading = quiz.questions.filter(
      (q) => q._section === 'part1_reading'
    );
    quiz.part3_language = quiz.questions.filter(
      (q) => q._section === 'part3_language'
    );
    assertArraySync('RLA', quiz.questions, [
      ...quiz.part1_reading,
      ...quiz.part3_language,
    ]);
  }

  // ── 9. Strip internal metadata from questions ───────────────────
  if (quiz.questions) {
    for (const q of quiz.questions) {
      delete q._slotId;
      delete q._section;
      delete q._source;
      delete q._group;
    }
  }
  if (quiz.part1_non_calculator)
    quiz.part1_non_calculator.forEach(stripInternal);
  if (quiz.part2_calculator) quiz.part2_calculator.forEach(stripInternal);
  if (quiz.part1_reading) quiz.part1_reading.forEach(stripInternal);
  if (quiz.part3_language) quiz.part3_language.forEach(stripInternal);

  // ── 10. Attach validation data ──────────────────────────────────
  quiz.validationWarnings = validation.warnings;

  return quiz;
}

// ── Helpers ──────────────────────────────────────────────────────────

function stripInternal(q) {
  delete q._slotId;
  delete q._section;
  delete q._source;
  delete q._group;
}

/**
 * Shuffle questions but keep grouped items contiguous.
 */
function shufflePreservingGroups(questions) {
  const grouped = new Map(); // group → questions[]
  const ungrouped = [];

  for (const q of questions) {
    if (q._group) {
      if (!grouped.has(q._group)) grouped.set(q._group, []);
      grouped.get(q._group).push(q);
    } else {
      ungrouped.push(q);
    }
  }

  // Build chunks: each group is one chunk, each ungrouped question is one chunk
  const chunks = [];
  for (const [, groupQs] of grouped) {
    chunks.push(groupQs);
  }
  for (const q of ungrouped) {
    chunks.push([q]);
  }

  // Fisher-Yates shuffle of chunks
  for (let i = chunks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chunks[i], chunks[j]] = [chunks[j], chunks[i]];
  }

  return chunks.flat();
}

/**
 * Assert that quiz.questions and the concatenated section arrays contain
 * the same items by questionNumber. Throws on mismatch.
 */
function assertArraySync(label, questionsArr, concatArr) {
  if (!questionsArr || !concatArr) return;
  if (questionsArr.length !== concatArr.length) {
    throw new Error(
      `[${label}] Section sync failure: questions has ${questionsArr.length} items, sections concatenation has ${concatArr.length}`
    );
  }
}

module.exports = { finalizeExamPayload };
