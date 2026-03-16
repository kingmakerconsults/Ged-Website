'use strict';

const { validateQuestion } = require('./slotValidators');

/**
 * Fill an exam plan slot-by-slot using the source priority chain.
 *
 * @param {Object} plan        – frozen plan from buildComprehensivePlan
 * @param {Object} generators  – subject-specific generator functions:
 *   {
 *     bankFill(slot)           → Promise<Array<question>>
 *     templateFill(slot)       → Promise<Array<question>>
 *     aiFill(slot, aiOptions)  → Promise<Array<question>>
 *     essayFill(slot, aiOptions) → Promise<Object>  (for essay slots)
 *   }
 * @param {Object} aiOptions   – timeout, model config, etc.
 * @param {Object} [opts]
 * @param {number} [opts.maxRetries=2] – max retries per slot on validation failure
 * @returns {Promise<Object>} – { filledSlots: Map<slotId, questions[]>, log: Object }
 */
async function fillExamPlan(plan, generators, aiOptions, opts = {}) {
  const maxRetries = opts.maxRetries ?? 2;

  // Mutable working copy: slotId → array of questions (or essay object for essay slots)
  const filledSlots = new Map();

  // Generation log
  const log = {
    subject: plan.subject,
    planTotal: plan.totalQuestions,
    slotResults: [], // per-slot detail
    sourceBreakdown: { bank: 0, template: 0, ai: 0, fallback: 0 },
    retryTotal: 0,
    droppedItems: [],
  };

  for (const slot of plan.slots) {
    const slotLog = {
      slotId: slot.slotId,
      section: slot.section,
      category: slot.category,
      stimulusType: slot.stimulusType,
      questionsNeeded: slot.questionsNeeded,
      source: null,
      retries: 0,
      errors: [],
    };

    let filled = null; // Array<question> or essay object
    let source = null;
    let retries = 0;

    // Essay slots have a special path
    const isEssay = slot.responseType === 'essay';

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      if (attempt > 0) {
        retries++;
        log.retryTotal++;
      }

      filled = null;
      source = null;

      // Walk the source priority chain
      for (const src of slot.sourcePriority) {
        try {
          if (isEssay) {
            if (src === 'ai' && generators.essayFill) {
              filled = await generators.essayFill(slot, aiOptions);
            } else if (src === 'bank' && generators.essayBankFill) {
              filled = await generators.essayBankFill(slot);
            }
            if (filled && filled.passages && filled.prompt) {
              source = src;
              break;
            }
            filled = null;
          } else {
            let questions = null;
            if (src === 'bank' && generators.bankFill) {
              questions = await generators.bankFill(slot);
            } else if (src === 'template' && generators.templateFill) {
              questions = await generators.templateFill(slot);
            } else if (src === 'ai' && generators.aiFill) {
              questions = await generators.aiFill(slot, aiOptions);
            }

            if (
              Array.isArray(questions) &&
              questions.length >= slot.questionsNeeded
            ) {
              // Take exactly the needed count
              filled = questions.slice(0, slot.questionsNeeded);
              source = src;
              break;
            } else if (Array.isArray(questions) && questions.length > 0) {
              // Partial fill — keep trying other sources for remaining
              filled = questions.slice(0, slot.questionsNeeded);
              source = src;
              // If partial, try next source to complete
              if (filled.length < slot.questionsNeeded) {
                continue;
              }
              break;
            }
          }
        } catch (err) {
          slotLog.errors.push(`${src}: ${err.message || err}`);
        }
      }

      // Validate what we got
      if (isEssay) {
        const { validateEssaySlot } = require('./slotValidators');
        if (filled) {
          const result = validateEssaySlot(filled, slot);
          if (result.valid) break; // success
          slotLog.errors.push(
            `Attempt ${attempt + 1}: ${result.errors.join('; ')}`
          );
          filled = null;
        } else {
          slotLog.errors.push(`Attempt ${attempt + 1}: no essay generated`);
        }
      } else {
        if (filled && filled.length >= slot.questionsNeeded) {
          // Validate each question
          let allValid = true;
          for (const q of filled) {
            const result = validateQuestion(q, slot);
            if (!result.valid) {
              allValid = false;
              slotLog.errors.push(
                `Attempt ${attempt + 1}: ${result.errors.join('; ')}`
              );
              break;
            }
          }
          if (allValid) break; // success
          filled = null; // retry
        } else if (filled && filled.length > 0) {
          // Partial fill — validate what we have, accept and log gap
          const validQuestions = [];
          for (const q of filled) {
            const result = validateQuestion(q, slot);
            if (result.valid) validQuestions.push(q);
          }
          if (validQuestions.length > 0) {
            filled = validQuestions;
            break; // accept partial
          }
          filled = null;
        } else {
          slotLog.errors.push(`Attempt ${attempt + 1}: no questions generated`);
        }
      }
    }

    // Emergency fallback. Never bypass validation here.
    if (!filled && !isEssay) {
      try {
        let emergencyQs = [];

        if (generators.templateFill) {
          const templateQs = await generators.templateFill(slot);
          if (Array.isArray(templateQs) && templateQs.length > 0) {
            emergencyQs = templateQs;
            source = 'fallback';
          }
        }

        if (!emergencyQs.length && generators.bankFill) {
          const bankQs = await generators.bankFill(slot);
          if (Array.isArray(bankQs) && bankQs.length > 0) {
            emergencyQs = bankQs;
            source = 'fallback';
          }
        }

        if (emergencyQs.length > 0) {
          const validQuestions = [];
          for (const q of emergencyQs) {
            const result = validateQuestion(q, slot);
            if (result.valid) {
              validQuestions.push(q);
            } else {
              slotLog.errors.push(
                `Emergency fallback rejected: ${result.errors.join('; ')}`
              );
            }
            if (validQuestions.length >= slot.questionsNeeded) break;
          }

          if (validQuestions.length > 0) {
            filled = validQuestions.slice(0, slot.questionsNeeded);
          }
        }
      } catch (_) {
        /* ignore */
      }
    }

    // Tag questions with metadata from slot
    if (filled && !isEssay) {
      for (const q of filled) {
        q.category = q.category || slot.category;
        q.difficulty = q.difficulty || slot.difficulty;
        q.subject = q.subject || plan.subject;
        q._slotId = slot.slotId;
        q._section = slot.section;
        q._source = source;
        if (slot.group) q._group = slot.group;
        if (slot.calculatorAllowed !== null)
          q.calculator = slot.calculatorAllowed;
        if (slot.toolsAllowed) q.toolsAllowed = slot.toolsAllowed;
        if (
          slot.responseType === 'numeric' ||
          slot.responseType === 'fill_in'
        ) {
          q.responseType = slot.responseType;
        }
        if (slot.numeracy) q.numeracy = true;
      }
    }

    slotLog.source = source;
    slotLog.retries = retries;
    slotLog.filledCount = isEssay
      ? filled
        ? 1
        : 0
      : filled
        ? filled.length
        : 0;
    log.slotResults.push(slotLog);

    if (source) {
      log.sourceBreakdown[source === 'fallback' ? 'fallback' : source] =
        (log.sourceBreakdown[source === 'fallback' ? 'fallback' : source] ||
          0) + (isEssay ? 1 : filled ? filled.length : 0);
    }

    filledSlots.set(slot.slotId, filled || (isEssay ? null : []));
  }

  return { filledSlots, log };
}

module.exports = { fillExamPlan };
