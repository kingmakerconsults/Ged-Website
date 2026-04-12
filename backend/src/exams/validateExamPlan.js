'use strict';

const { findDuplicateStems } = require('./slotValidators');

/**
 * Validate that a fully filled exam plan meets all blueprint invariants.
 *
 * @param {Object} plan         – the original frozen plan
 * @param {Map}    filledSlots  – slotId → questions[] (or essay object)
 * @param {Object} [opts]
 * @param {number} [opts.tolerance] – 0-1, fraction of total that must be filled (default 1.0 = strict)
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
function validateFilledPlan(plan, filledSlots, opts = {}) {
  const tolerance = opts.tolerance ?? 1.0;
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
      const msg = `Slot ${slot.slotId} (${slot.category}/${slot.stimulusType}): has ${filled.length}, needs ${slot.questionsNeeded}`;
      if (tolerance < 1.0) {
        warnings.push(msg); // lenient — slot gaps are warnings
      } else {
        errors.push(msg); // strict — slot gaps are errors
      }
    }

    allQuestions.push(...filled);
  }

  // 1. Total count
  const totalFilled = allQuestions.length + (essaySlot ? 1 : 0);
  const minAcceptable = Math.floor(plan.totalQuestions * tolerance);
  if (totalFilled < minAcceptable) {
    errors.push(
      `Total questions: ${totalFilled}, expected ${plan.totalQuestions} (minimum ${minAcceptable})`
    );
  } else if (totalFilled !== plan.totalQuestions) {
    warnings.push(
      `Total questions: ${totalFilled}, expected ${plan.totalQuestions} (within tolerance)`
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
      const catMin = Math.floor(expected * tolerance);
      if (actual < catMin) {
        errors.push(
          `Category "${cat}": ${actual} questions, expected ${expected}`
        );
      } else if (actual !== expected) {
        warnings.push(
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
    const p1Min = Math.floor(plan.invariants.part1_reading * tolerance);
    if (p1Count < p1Min) {
      errors.push(
        `Part 1 Reading: ${p1Count}, expected ${plan.invariants.part1_reading}`
      );
    } else if (p1Count !== plan.invariants.part1_reading) {
      warnings.push(
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
    const p3Min = Math.floor(plan.invariants.part3_language * tolerance);
    if (p3Count < p3Min) {
      errors.push(
        `Part 3 Language: ${p3Count}, expected ${plan.invariants.part3_language}`
      );
    } else if (p3Count !== plan.invariants.part3_language) {
      warnings.push(
        `Part 3 Language: ${p3Count}, expected ${plan.invariants.part3_language}`
      );
    }
  }
  if (plan.invariants.part1_non_calculator !== undefined) {
    const p1Count = allQuestions.filter(
      (q) => q._section === 'part1_non_calculator'
    ).length;
    const p1Min = Math.floor(plan.invariants.part1_non_calculator * tolerance);
    if (p1Count < p1Min) {
      errors.push(
        `Part 1 Non-Calculator: ${p1Count}, expected ${plan.invariants.part1_non_calculator}`
      );
    } else if (p1Count !== plan.invariants.part1_non_calculator) {
      warnings.push(
        `Part 1 Non-Calculator: ${p1Count}, expected ${plan.invariants.part1_non_calculator}`
      );
    }
  }
  if (plan.invariants.part2_calculator !== undefined) {
    const p2Count = allQuestions.filter(
      (q) => q._section === 'part2_calculator'
    ).length;
    const p2Min = Math.floor(plan.invariants.part2_calculator * tolerance);
    if (p2Count < p2Min) {
      errors.push(
        `Part 2 Calculator: ${p2Count}, expected ${plan.invariants.part2_calculator}`
      );
    } else if (p2Count !== plan.invariants.part2_calculator) {
      warnings.push(
        `Part 2 Calculator: ${p2Count}, expected ${plan.invariants.part2_calculator}`
      );
    }
  }

  // 4. Slot-level stimulus integrity
  for (const q of allQuestions) {
    const slot = plan.slots.find((s) => s.slotId === q._slotId);
    if (!slot || slot.stimulusType === 'standalone') continue;

    const hasPassage =
      typeof q.passage === 'string' && q.passage.trim().length > 50;
    const hasImage = Boolean(q.stimulusImage || q.imageUrl || q.imageURL);
    const declaredStimulusType = String(
      q.stimulusType || q.itemType || ''
    ).toLowerCase();
    const hasData = Boolean(
      q.dataTable ||
      q.chartData ||
      /<table\b/i.test(String(q.questionText || '')) ||
      /<table\b/i.test(String(q.passage || ''))
    );

    const hasRequiredStimulus =
      slot.stimulusType === 'passage/data'
        ? hasPassage || hasData
        : ['chart', 'table'].includes(slot.stimulusType)
          ? hasData || (hasImage && declaredStimulusType === slot.stimulusType)
          : ['diagram', 'image'].includes(slot.stimulusType)
            ? hasImage
            : slot.stimulusType === 'passage'
              ? hasPassage
              : hasPassage || hasImage || hasData;

    if (!hasRequiredStimulus) {
      errors.push(
        `Slot ${slot.slotId} (${slot.category}/${slot.stimulusType}) finalized with no matching stimulus`
      );
    }
  }

  // 5. Stimulus counts (if specified)
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

  // 6. Science numeracy minimum
  if (plan.invariants.numeracyMinimum) {
    const numeracyCount = allQuestions.filter((q) => q.numeracy).length;
    if (numeracyCount < plan.invariants.numeracyMinimum) {
      errors.push(
        `Numeracy items: ${numeracyCount}, minimum ${plan.invariants.numeracyMinimum}`
      );
    }
  }

  // 7. Null item check
  const nullItems = allQuestions.filter((q) => !q || !q.questionText);
  if (nullItems.length > 0) {
    errors.push(`${nullItems.length} null or text-less questions found`);
  }

  // 8. Duplicate check (near-duplicate stems)
  const dupes = findDuplicateStems(allQuestions, 0.85);
  if (dupes.length > 0) {
    warnings.push(`${dupes.length} near-duplicate question pair(s) detected`);
  }

  // 9. Difficulty distribution (soft check)
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

  // 10. SkillIntent coverage (soft check — warnings only)
  if (plan.invariants.skillIntentMinimums) {
    const intentCounts = {};
    for (const q of allQuestions) {
      if (q.skillIntent) {
        intentCounts[q.skillIntent] = (intentCounts[q.skillIntent] || 0) + 1;
      }
    }
    for (const [intent, minimum] of Object.entries(
      plan.invariants.skillIntentMinimums
    )) {
      const actual = intentCounts[intent] || 0;
      if (actual < minimum) {
        warnings.push(
          `SkillIntent "${intent}": ${actual} questions, minimum ${minimum}`
        );
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

module.exports = { validateFilledPlan };
