'use strict';

const { findDuplicateStems } = require('./slotValidators');

/**
 * Validate that a fully filled exam plan meets all blueprint invariants.
 *
 * @param {Object} plan         – the original frozen plan
 * @param {Map}    filledSlots  – slotId → questions[] (or essay object)
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
function validateFilledPlan(plan, filledSlots) {
  const errors = [];
  const warnings = [];

  // Collect all non-essay questions
  const allQuestions = [];
  let essaySlot = null;

  for (const slot of plan.slots) {
    const filled = filledSlots.get(slot.slotId);
    const isEssay = slot.responseType === 'essay';

    if (isEssay) {
      if (!filled || !filled.passages || !filled.prompt) {
        errors.push(`Essay slot ${slot.slotId} is missing or incomplete`);
      } else {
        essaySlot = filled;
      }
      continue;
    }

    if (!Array.isArray(filled)) {
      errors.push(`Slot ${slot.slotId} has no questions array`);
      continue;
    }

    if (filled.length < slot.questionsNeeded) {
      errors.push(
        `Slot ${slot.slotId} (${slot.category}/${slot.stimulusType}): has ${filled.length}, needs ${slot.questionsNeeded}`
      );
    }

    allQuestions.push(...filled);
  }

  // 1. Total count
  const totalFilled = allQuestions.length + (essaySlot ? 1 : 0);
  if (totalFilled !== plan.totalQuestions) {
    errors.push(
      `Total questions: ${totalFilled}, expected ${plan.totalQuestions}`
    );
  }

  // 2. Category counts
  if (plan.invariants.categories) {
    const catCounts = {};
    for (const q of allQuestions) {
      const cat = q.category || 'unknown';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    }
    for (const [cat, expected] of Object.entries(plan.invariants.categories)) {
      const actual = catCounts[cat] || 0;
      if (actual !== expected) {
        errors.push(
          `Category "${cat}": ${actual} questions, expected ${expected}`
        );
      }
    }
  }

  // 3. Section counts (multi-part exams)
  if (plan.invariants.part1_reading !== undefined) {
    const p1Count = allQuestions.filter(
      (q) => q._section === 'part1_reading'
    ).length;
    if (p1Count !== plan.invariants.part1_reading) {
      errors.push(
        `Part 1 Reading: ${p1Count}, expected ${plan.invariants.part1_reading}`
      );
    }
  }
  if (plan.invariants.part2_essay !== undefined) {
    if (!essaySlot) {
      errors.push('Part 2 Essay: missing');
    }
  }
  if (plan.invariants.part3_language !== undefined) {
    const p3Count = allQuestions.filter(
      (q) => q._section === 'part3_language'
    ).length;
    if (p3Count !== plan.invariants.part3_language) {
      errors.push(
        `Part 3 Language: ${p3Count}, expected ${plan.invariants.part3_language}`
      );
    }
  }
  if (plan.invariants.part1_non_calculator !== undefined) {
    const p1Count = allQuestions.filter(
      (q) => q._section === 'part1_non_calculator'
    ).length;
    if (p1Count !== plan.invariants.part1_non_calculator) {
      errors.push(
        `Part 1 Non-Calculator: ${p1Count}, expected ${plan.invariants.part1_non_calculator}`
      );
    }
  }
  if (plan.invariants.part2_calculator !== undefined) {
    const p2Count = allQuestions.filter(
      (q) => q._section === 'part2_calculator'
    ).length;
    if (p2Count !== plan.invariants.part2_calculator) {
      errors.push(
        `Part 2 Calculator: ${p2Count}, expected ${plan.invariants.part2_calculator}`
      );
    }
  }

  // 4. Stimulus counts (if specified)
  if (plan.invariants.stimulus) {
    const stimCounts = {};
    for (const q of allQuestions) {
      const slot = plan.slots.find((s) => s.slotId === q._slotId);
      if (!slot) continue;
      let stimType = slot.stimulusType;
      // Normalize grouped types
      if (['chart', 'table', 'diagram'].includes(stimType))
        stimType = 'chart/table/diagram';
      if (stimType === 'passage/data') stimType = 'passage/data';
      if (stimType === 'image') stimType = 'image';
      stimCounts[stimType] = (stimCounts[stimType] || 0) + 1;
    }
    // Log but don't hard-fail on stimulus — it's a softer constraint
    for (const [type, expected] of Object.entries(plan.invariants.stimulus)) {
      const actual = stimCounts[type] || 0;
      if (actual !== expected) {
        warnings.push(`Stimulus "${type}": ${actual}, expected ${expected}`);
      }
    }
  }

  // 5. Science numeracy minimum
  if (plan.invariants.numeracyMinimum) {
    const numeracyCount = allQuestions.filter((q) => q.numeracy).length;
    if (numeracyCount < plan.invariants.numeracyMinimum) {
      errors.push(
        `Numeracy items: ${numeracyCount}, minimum ${plan.invariants.numeracyMinimum}`
      );
    }
  }

  // 6. Null item check
  const nullItems = allQuestions.filter((q) => !q || !q.questionText);
  if (nullItems.length > 0) {
    errors.push(`${nullItems.length} null or text-less questions found`);
  }

  // 7. Duplicate check (near-duplicate stems)
  const dupes = findDuplicateStems(allQuestions, 0.85);
  if (dupes.length > 0) {
    warnings.push(`${dupes.length} near-duplicate question pair(s) detected`);
  }

  // 8. Difficulty distribution (soft check)
  if (plan.invariants.difficulty) {
    const diffCounts = {};
    for (const q of allQuestions) {
      diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
    }
    for (const [diff, expected] of Object.entries(plan.invariants.difficulty)) {
      const actual = diffCounts[diff] || 0;
      // Allow ±2 tolerance for difficulty
      if (Math.abs(actual - expected) > 2) {
        warnings.push(`Difficulty "${diff}": ${actual}, expected ~${expected}`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

module.exports = { validateFilledPlan };
