'use strict';

const {
  buildSocialStudiesPlan,
  buildSciencePlan,
  buildRlaPlan,
  buildMathPlan,
} = require('./subjectPlans');

/**
 * Build an immutable exam plan for the given subject.
 * Returns a deep-frozen plan object with slot definitions.
 *
 * @param {string} subject – 'Social Studies' | 'Science' | 'RLA' | 'Math'
 * @returns {Object} plan
 */
function buildComprehensivePlan(subject) {
  let plan;

  switch (subject) {
    case 'Social Studies':
      plan = buildSocialStudiesPlan();
      break;
    case 'Science':
      plan = buildSciencePlan();
      break;
    case 'RLA':
    case 'Reasoning Through Language Arts':
      plan = buildRlaPlan();
      break;
    case 'Math':
    case 'Mathematical Reasoning':
      plan = buildMathPlan();
      break;
    default:
      throw new Error(`No comprehensive plan defined for subject: ${subject}`);
  }

  // Validate plan integrity before returning
  const totalFromSlots = plan.slots.reduce(
    (s, sl) => s + sl.questionsNeeded,
    0
  );
  const expectedTotal = plan.totalQuestions;

  if (totalFromSlots !== expectedTotal) {
    throw new Error(
      `Plan integrity failure for ${subject}: slots sum to ${totalFromSlots}, expected ${expectedTotal}`
    );
  }

  // Verify no duplicate slotIds
  const ids = plan.slots.map((s) => s.slotId);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    throw new Error(`Plan has duplicate slotIds for ${subject}`);
  }

  // Deep freeze the plan so it cannot be mutated during fill
  return deepFreeze(plan);
}

function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  Object.freeze(obj);
  for (const key of Object.getOwnPropertyNames(obj)) {
    const val = obj[key];
    if (val !== null && typeof val === 'object' && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  }
  return obj;
}

module.exports = { buildComprehensivePlan };
