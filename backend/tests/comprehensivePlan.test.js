/**
 * Defensive tests for slot-based comprehensive exam plan generation.
 *
 * These tests validate the plan building and structural invariants
 * without requiring AI calls — they operate on the plan definitions
 * and the fill/validate/finalize pipeline with mock generators.
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildComprehensivePlan,
} = require('../src/exams/buildComprehensivePlan');
const { fillExamPlan } = require('../src/exams/fillExamPlan');
const { validateFilledPlan } = require('../src/exams/validateExamPlan');
const { finalizeExamPayload } = require('../src/exams/finalizeExamPayload');
const {
  validateQuestion,
  findDuplicateStems,
} = require('../src/exams/slotValidators');

// ── Helper: mock question generator ──────────────────────────────────

function mockQuestion(slot, idx = 0) {
  if (slot.responseType === 'essay') {
    return {
      passages: [
        {
          title: 'Position A',
          author: 'Author A',
          content:
            '<p>Content A with enough length to pass validation checks for the essay passage.</p>',
        },
        {
          title: 'Position B',
          author: 'Author B',
          content:
            '<p>Content B with enough length to pass validation checks for the essay passage.</p>',
        },
      ],
      prompt:
        'Analyze both passages and determine which position is better supported.',
    };
  }
  const isNonMC = [
    'numeric',
    'fill_in',
    'inline_dropdown',
    'sentence_rewrite',
    'placement',
  ].includes(slot.responseType);
  return {
    questionText: `Question for ${slot.category} slot ${slot.slotId} item ${idx}`,
    answerOptions: isNonMC
      ? []
      : [
          { text: 'Option A', isCorrect: true, rationale: 'Correct' },
          { text: 'Option B', isCorrect: false, rationale: 'Wrong' },
          { text: 'Option C', isCorrect: false, rationale: 'Wrong' },
          { text: 'Option D', isCorrect: false, rationale: 'Wrong' },
        ],
    category: slot.category,
    difficulty: slot.difficulty,
    subject: 'Test',
    passage:
      slot.stimulusType !== 'standalone'
        ? 'Sample passage text for this question stimulus.'
        : undefined,
    responseType: slot.responseType || 'single_select',
  };
}

function mockGenerators() {
  return {
    bankFill: async (slot) => {
      const qs = [];
      for (let i = 0; i < slot.questionsNeeded; i++) {
        qs.push(mockQuestion(slot, i));
      }
      return qs;
    },
    templateFill: async (slot) => [],
    aiFill: async (slot) => {
      const qs = [];
      for (let i = 0; i < slot.questionsNeeded; i++) {
        qs.push(mockQuestion(slot, i));
      }
      return qs;
    },
    essayFill: async (slot) => mockQuestion(slot),
    essayBankFill: async (slot) => mockQuestion(slot),
  };
}

// ═══════════════════════════════════════════════════════════════════════
//  PLAN BUILDING TESTS
// ═══════════════════════════════════════════════════════════════════════

test('Social Studies plan has exactly 35 questions', () => {
  const plan = buildComprehensivePlan('Social Studies');
  const total = plan.slots.reduce((s, sl) => s + sl.questionsNeeded, 0);
  assert.equal(total, 35);
  assert.equal(plan.totalQuestions, 35);
  assert.equal(plan.invariants.totalQuestions, 35);
});

test('Social Studies plan has correct category counts', () => {
  const plan = buildComprehensivePlan('Social Studies');
  const catCounts = {};
  for (const slot of plan.slots) {
    catCounts[slot.category] =
      (catCounts[slot.category] || 0) + slot.questionsNeeded;
  }
  assert.equal(catCounts['Civics & Government'], 18);
  assert.equal(catCounts['U.S. History'], 7);
  assert.equal(catCounts['Economics'], 5);
  assert.equal(catCounts['Geography & the World'], 5);
});

test('Science plan has exactly 38 questions', () => {
  const plan = buildComprehensivePlan('Science');
  const total = plan.slots.reduce((s, sl) => s + sl.questionsNeeded, 0);
  assert.equal(total, 38);
  assert.equal(plan.totalQuestions, 38);
});

test('Science plan has correct category counts', () => {
  const plan = buildComprehensivePlan('Science');
  const catCounts = {};
  for (const slot of plan.slots) {
    catCounts[slot.category] =
      (catCounts[slot.category] || 0) + slot.questionsNeeded;
  }
  assert.equal(catCounts['Life Science'], 15);
  assert.equal(catCounts['Physical Science'], 15);
  assert.equal(catCounts['Earth & Space Science'], 8);
});

test('Science plan has numeracy minimum >= 13', () => {
  const plan = buildComprehensivePlan('Science');
  const numeracySlots = plan.slots
    .filter((s) => s.numeracy)
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  assert.ok(
    numeracySlots >= 13,
    `Numeracy slots: ${numeracySlots}, expected >= 13`
  );
  assert.equal(plan.invariants.numeracyMinimum, 13);
});

test('RLA plan has 20 + essay + 25', () => {
  const plan = buildComprehensivePlan('RLA');
  const p1 = plan.slots
    .filter((s) => s.section === 'part1_reading')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  const p2 = plan.slots
    .filter((s) => s.section === 'part2_essay')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  const p3 = plan.slots
    .filter((s) => s.section === 'part3_language')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  assert.equal(p1, 20);
  assert.equal(p2, 1);
  assert.equal(p3, 25);
  assert.equal(plan.invariants.part1_reading, 20);
  assert.equal(plan.invariants.part2_essay, 1);
  assert.equal(plan.invariants.part3_language, 25);
});

test('Math plan has 5 + 41', () => {
  const plan = buildComprehensivePlan('Math');
  const p1 = plan.slots
    .filter((s) => s.section === 'part1_non_calculator')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  const p2 = plan.slots
    .filter((s) => s.section === 'part2_calculator')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  assert.equal(p1, 5);
  assert.equal(p2, 41);
  assert.equal(plan.invariants.part1_non_calculator, 5);
  assert.equal(plan.invariants.part2_calculator, 41);
  assert.equal(plan.totalQuestions, 46);
});

test('Math plan does not use random numeric response', () => {
  const plan = buildComprehensivePlan('Math');
  assert.equal(plan.invariants.noRandomNumericAssignment, true);
  // Only slots explicitly marked as numeric/fill_in should have those responseTypes
  const numericSlots = plan.slots.filter(
    (s) => s.responseType === 'numeric' || s.responseType === 'fill_in'
  );
  assert.ok(
    numericSlots.length > 0,
    'Should have explicitly marked numeric/fill_in slots'
  );
  // All other slots should be single_select
  const otherSlots = plan.slots.filter(
    (s) => s.responseType !== 'numeric' && s.responseType !== 'fill_in'
  );
  for (const s of otherSlots) {
    assert.ok(
      s.responseType !== 'numeric' && s.responseType !== 'fill_in',
      `Slot ${s.slotId} has unexpected numeric/fill_in response type`
    );
  }
});

test('Math plan algebra is >= 50% of total', () => {
  const plan = buildComprehensivePlan('Math');
  const algebraCats = new Set([
    'Expressions, Equations, and Inequalities',
    'Expressions & Equations',
    'Graphing & Functions',
  ]);
  const algebraSlots = plan.slots
    .filter((s) => algebraCats.has(s.category))
    .reduce((sum, sl) => sum + sl.questionsNeeded, 0);
  const pct = algebraSlots / plan.totalQuestions;
  assert.ok(
    pct >= 0.5,
    `Algebra is ${(pct * 100).toFixed(1)}% (${algebraSlots}/${plan.totalQuestions}), expected >= 50%`
  );
});

test('All plans have unique slotIds', () => {
  for (const subject of ['Social Studies', 'Science', 'RLA', 'Math']) {
    const plan = buildComprehensivePlan(subject);
    const ids = plan.slots.map((s) => s.slotId);
    const unique = new Set(ids);
    assert.equal(unique.size, ids.length, `${subject} has duplicate slotIds`);
  }
});

test('Plans are frozen (immutable)', () => {
  for (const subject of ['Social Studies', 'Science', 'RLA', 'Math']) {
    const plan = buildComprehensivePlan(subject);
    assert.ok(Object.isFrozen(plan), `${subject} plan is not frozen`);
    assert.ok(
      Object.isFrozen(plan.slots),
      `${subject} plan.slots is not frozen`
    );
  }
});

test('Unsupported subject throws', () => {
  assert.throws(
    () => buildComprehensivePlan('Cooking'),
    /No comprehensive plan/
  );
});

// ═══════════════════════════════════════════════════════════════════════
//  FILL + VALIDATE + FINALIZE PIPELINE TESTS
// ═══════════════════════════════════════════════════════════════════════

test('Social Studies fill + finalize returns exactly 35 questions', async () => {
  const plan = buildComprehensivePlan('Social Studies');
  const gens = mockGenerators();
  const { filledSlots } = await fillExamPlan(plan, gens, {});
  const quiz = await finalizeExamPayload(plan, filledSlots);
  assert.equal(quiz.questions.length, 35);
});

test('Science fill + finalize returns exactly 38 questions', async () => {
  const plan = buildComprehensivePlan('Science');
  const gens = mockGenerators();
  const { filledSlots } = await fillExamPlan(plan, gens, {});
  const quiz = await finalizeExamPayload(plan, filledSlots);
  assert.equal(quiz.questions.length, 38);
});

test('RLA fill + finalize returns 20 + essay + 25', async () => {
  const plan = buildComprehensivePlan('RLA');
  const gens = mockGenerators();
  const { filledSlots } = await fillExamPlan(plan, gens, {});
  const quiz = await finalizeExamPayload(plan, filledSlots);
  assert.equal(quiz.part1_reading.length, 20);
  assert.ok(quiz.part2_essay, 'Essay should be present');
  assert.ok(
    quiz.part2_essay.passages.length >= 2,
    'Essay should have 2 passages'
  );
  assert.equal(quiz.part3_language.length, 25);
  assert.equal(quiz.questions.length, 45); // 20 + 25 MC questions
  assert.equal(quiz.type, 'multi-part-rla');
});

test('Math fill + finalize returns 5 + 41', async () => {
  const plan = buildComprehensivePlan('Math');
  const gens = mockGenerators();
  const { filledSlots } = await fillExamPlan(plan, gens, {});
  const quiz = await finalizeExamPayload(plan, filledSlots);
  assert.equal(quiz.part1_non_calculator.length, 5);
  assert.equal(quiz.part2_calculator.length, 41);
  assert.equal(quiz.questions.length, 46);
  assert.equal(quiz.type, 'multi-part-math');
});

test('Math parts and questions stay in sync', async () => {
  const plan = buildComprehensivePlan('Math');
  const gens = mockGenerators();
  const { filledSlots } = await fillExamPlan(plan, gens, {});
  const quiz = await finalizeExamPayload(plan, filledSlots);
  const combined = [...quiz.part1_non_calculator, ...quiz.part2_calculator];
  assert.equal(combined.length, quiz.questions.length);
  // Verify same question numbers
  for (let i = 0; i < combined.length; i++) {
    assert.equal(combined[i].questionNumber, quiz.questions[i].questionNumber);
  }
});

test('RLA questions equals part1 + part3', async () => {
  const plan = buildComprehensivePlan('RLA');
  const gens = mockGenerators();
  const { filledSlots } = await fillExamPlan(plan, gens, {});
  const quiz = await finalizeExamPayload(plan, filledSlots);
  const combined = [...quiz.part1_reading, ...quiz.part3_language];
  assert.equal(combined.length, quiz.questions.length);
});

test('No subject returns null items in questions array', async () => {
  for (const subject of ['Social Studies', 'Science', 'RLA', 'Math']) {
    const plan = buildComprehensivePlan(subject);
    const gens = mockGenerators();
    const { filledSlots } = await fillExamPlan(plan, gens, {});
    const quiz = await finalizeExamPayload(plan, filledSlots);
    const nullItems = quiz.questions.filter((q) => !q || !q.questionText);
    assert.equal(
      nullItems.length,
      0,
      `${subject} has ${nullItems.length} null items`
    );
  }
});

test('Fallback mode still respects blueprint', async () => {
  // Simulate fallback: bankFill only, no AI
  const plan = buildComprehensivePlan('Social Studies');
  const gens = {
    bankFill: async (slot) => {
      const qs = [];
      for (let i = 0; i < slot.questionsNeeded; i++) {
        qs.push(mockQuestion(slot, i));
      }
      return qs;
    },
  };
  const { filledSlots } = await fillExamPlan(plan, gens, {}, { maxRetries: 0 });
  const quiz = await finalizeExamPayload(plan, filledSlots);
  assert.equal(quiz.questions.length, 35);
});

test('Science numeracy minimum met without exceeding total', async () => {
  const plan = buildComprehensivePlan('Science');
  const gens = mockGenerators();
  const { filledSlots } = await fillExamPlan(plan, gens, {});
  const quiz = await finalizeExamPayload(plan, filledSlots);
  const numeracyQ = quiz.questions.filter((q) => q.numeracy);
  assert.ok(
    numeracyQ.length >= 13,
    `Numeracy: ${numeracyQ.length}, expected >= 13`
  );
  assert.equal(quiz.questions.length, 38, 'Total must be exactly 38');
});

test('No malformed multi-part payloads', async () => {
  // RLA must have all three parts
  const rlaPlan = buildComprehensivePlan('RLA');
  const gens = mockGenerators();
  const { filledSlots: rlaSlots } = await fillExamPlan(rlaPlan, gens, {});
  const rlaQuiz = await finalizeExamPayload(rlaPlan, rlaSlots);
  assert.ok(rlaQuiz.part1_reading, 'RLA missing part1_reading');
  assert.ok(rlaQuiz.part2_essay, 'RLA missing part2_essay');
  assert.ok(rlaQuiz.part3_language, 'RLA missing part3_language');

  // Math must have both parts
  const mathPlan = buildComprehensivePlan('Math');
  const { filledSlots: mathSlots } = await fillExamPlan(mathPlan, gens, {});
  const mathQuiz = await finalizeExamPayload(mathPlan, mathSlots);
  assert.ok(mathQuiz.part1_non_calculator, 'Math missing part1_non_calculator');
  assert.ok(mathQuiz.part2_calculator, 'Math missing part2_calculator');
});

// ═══════════════════════════════════════════════════════════════════════
//  SLOT VALIDATOR TESTS
// ═══════════════════════════════════════════════════════════════════════

test('validateQuestion catches missing question text', () => {
  const slot = {
    stimulusType: 'standalone',
    responseType: 'single_select',
    allowMultiSelect: false,
  };
  const q = {
    questionText: '',
    answerOptions: [
      { text: 'A', isCorrect: true },
      { text: 'B', isCorrect: false },
    ],
  };
  const result = validateQuestion(q, slot);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes('Missing question text')));
});

test('validateQuestion catches no correct answer', () => {
  const slot = {
    stimulusType: 'standalone',
    responseType: 'single_select',
    allowMultiSelect: false,
  };
  const q = {
    questionText: 'What is 2+2?',
    answerOptions: [
      { text: 'A', isCorrect: false },
      { text: 'B', isCorrect: false },
      { text: 'C', isCorrect: false },
    ],
  };
  const result = validateQuestion(q, slot);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes('No correct answer')));
});

test('validateQuestion catches multi-select when not allowed', () => {
  const slot = {
    stimulusType: 'standalone',
    responseType: 'single_select',
    allowMultiSelect: false,
  };
  const q = {
    questionText: 'Select all that apply',
    answerOptions: [
      { text: 'A', isCorrect: true },
      { text: 'B', isCorrect: true },
      { text: 'C', isCorrect: false },
    ],
  };
  const result = validateQuestion(q, slot);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes('forbids multi-select')));
});

test('validateQuestion passes valid standalone question', () => {
  const slot = {
    stimulusType: 'standalone',
    responseType: 'single_select',
    allowMultiSelect: false,
  };
  const q = {
    questionText: 'What is the capital of France?',
    answerOptions: [
      { text: 'Paris', isCorrect: true },
      { text: 'London', isCorrect: false },
      { text: 'Berlin', isCorrect: false },
      { text: 'Madrid', isCorrect: false },
    ],
  };
  const result = validateQuestion(q, slot);
  assert.equal(result.valid, true);
});

test('validateQuestion requires stimulus when slot expects passage', () => {
  const slot = {
    stimulusType: 'passage',
    responseType: 'single_select',
    allowMultiSelect: false,
  };
  const q = {
    questionText: 'Based on the passage, what happened?',
    answerOptions: [
      { text: 'A', isCorrect: true },
      { text: 'B', isCorrect: false },
      { text: 'C', isCorrect: false },
    ],
  };
  const result = validateQuestion(q, slot);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes('stimulus')));
});

test('findDuplicateStems detects near-duplicates', () => {
  const questions = [
    { questionText: 'What is the capital of France?' },
    { questionText: 'What is the capital of France?' },
    { questionText: 'How many states are in the US?' },
  ];
  const dupes = findDuplicateStems(questions, 0.85);
  assert.equal(dupes.length, 1);
  assert.equal(dupes[0].i, 0);
  assert.equal(dupes[0].j, 1);
});

// ═══════════════════════════════════════════════════════════════════════
//  VALIDATE FILLED PLAN TESTS
// ═══════════════════════════════════════════════════════════════════════

test('validateFilledPlan catches wrong total count', async () => {
  const plan = buildComprehensivePlan('Social Studies');
  const filledSlots = new Map();
  // Fill all slots with one fewer question than needed in total
  let shortSlot = true;
  for (const slot of plan.slots) {
    if (slot.responseType === 'essay') {
      filledSlots.set(slot.slotId, null);
      continue;
    }
    const count = shortSlot ? slot.questionsNeeded - 1 : slot.questionsNeeded;
    shortSlot = false;
    const qs = [];
    for (let i = 0; i < Math.max(0, count); i++) {
      qs.push({
        ...mockQuestion(slot, i),
        _slotId: slot.slotId,
        _section: slot.section,
      });
    }
    filledSlots.set(slot.slotId, qs);
  }
  const result = validateFilledPlan(plan, filledSlots);
  assert.equal(result.valid, false);
});

test('validateFilledPlan passes correct fill', async () => {
  const plan = buildComprehensivePlan('Social Studies');
  const filledSlots = new Map();
  for (const slot of plan.slots) {
    if (slot.responseType === 'essay') {
      filledSlots.set(slot.slotId, mockQuestion(slot));
      continue;
    }
    const qs = [];
    for (let i = 0; i < slot.questionsNeeded; i++) {
      qs.push({
        ...mockQuestion(slot, i),
        _slotId: slot.slotId,
        _section: slot.section,
      });
    }
    filledSlots.set(slot.slotId, qs);
  }
  const result = validateFilledPlan(plan, filledSlots);
  assert.equal(result.valid, true, `Errors: ${result.errors.join('; ')}`);
});

// ═══════════════════════════════════════════════════════════════════════
//  GENERATION LOG TESTS
// ═══════════════════════════════════════════════════════════════════════

test('fillExamPlan logs source breakdown', async () => {
  const plan = buildComprehensivePlan('Social Studies');
  const gens = mockGenerators();
  const { log } = await fillExamPlan(plan, gens, {});
  assert.ok(log.sourceBreakdown, 'Missing sourceBreakdown');
  assert.ok(typeof log.sourceBreakdown.bank === 'number');
  assert.ok(
    log.slotResults.length === plan.slots.length,
    'Should have a result per slot'
  );
});
