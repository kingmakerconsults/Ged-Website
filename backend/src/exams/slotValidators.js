'use strict';

/**
 * Per-slot and per-question validators for generated exam content.
 *
 * Each validator returns { valid: boolean, errors: string[] }.
 */

const MULTI_SELECT_TYPES = new Set([
  'multi_select',
  'multipleSelect',
  'multiple_select',
  'select_all',
]);

const NON_MC_RESPONSE_TYPES = new Set([
  'numeric',
  'fill_in',
  'short_constructed_response',
  'sentence_rewrite',
  'drag_drop_ordering',
  'drag_drop',
  'placement',
  'inline_dropdown',
  'essay',
]);

const ESSAY_RESPONSE_TYPES = new Set(['essay', 'extended_response']);

/**
 * Validate a single generated question against its slot definition.
 */
function validateQuestion(question, slot) {
  const errors = [];
  if (!question) {
    errors.push('Question is null or undefined');
    return { valid: false, errors };
  }

  // 1. Required fields
  const qText = question.questionText || question.question || '';
  if (!qText.trim()) {
    errors.push('Missing question text');
  }

  // 2. Essay validation
  if (ESSAY_RESPONSE_TYPES.has(slot.responseType)) {
    return validateEssaySlot(question, slot);
  }

  // 3. Answer options validation (skip for non-MC types)
  const responseType = (
    question.responseType ||
    slot.responseType ||
    ''
  ).toLowerCase();
  const isNonMC = NON_MC_RESPONSE_TYPES.has(responseType);

  if (!isNonMC) {
    const opts = Array.isArray(question.answerOptions)
      ? question.answerOptions
      : [];

    if (opts.length < 2) {
      errors.push(`Only ${opts.length} answer options (need ≥2)`);
    } else if (opts.length > 6) {
      errors.push(`${opts.length} answer options (max 6)`);
    }

    // Check correct answer count
    const correctCount = opts.filter((o) => o && o.isCorrect === true).length;
    if (correctCount === 0 && opts.length >= 2) {
      errors.push('No correct answer marked');
    }

    // Multi-select guard
    if (
      correctCount > 1 &&
      !slot.allowMultiSelect &&
      !MULTI_SELECT_TYPES.has(responseType)
    ) {
      errors.push(
        `Multiple correct answers (${correctCount}) but slot forbids multi-select`
      );
    }

    // Check for empty option text
    const emptyOpts = opts.filter((o) => !o || !String(o.text || '').trim());
    if (emptyOpts.length > 0) {
      errors.push(`${emptyOpts.length} answer option(s) have empty text`);
    }
  }

  // 4. Stimulus check
  if (slot.stimulusType !== 'standalone') {
    const hasPassage =
      typeof question.passage === 'string' &&
      question.passage.trim().length > 10;
    const hasImage =
      question.stimulusImage || question.imageUrl || question.imageURL;
    const hasData = question.dataTable || question.chartData;
    if (!hasPassage && !hasImage && !hasData) {
      errors.push(
        `Slot requires stimulus (${slot.stimulusType}) but question has none`
      );
    }
  }

  // 5. Malformed markup check
  if (qText.includes('<table') && !qText.includes('</table>')) {
    errors.push('Malformed table HTML (unclosed <table> tag)');
  }
  if (qText.includes('<img') && /alt=["']?(chart|graph|table)/i.test(qText)) {
    // Passage-chart mismatch — phantom image reference
    errors.push('Contains phantom chart/graph image reference');
  }

  // 5b. KaTeX delimiter balance check (warning-level, not a hard failure)
  const allText = [qText];
  if (Array.isArray(question.answerOptions)) {
    for (const opt of question.answerOptions) {
      allText.push(opt?.text || '');
    }
  }
  const combined = allText.join(' ');
  const openInline = (combined.match(/\\\(/g) || []).length;
  const closeInline = (combined.match(/\\\)/g) || []).length;
  if (openInline !== closeInline) {
    errors.push(
      `Unbalanced KaTeX inline delimiters: ${openInline} \\( vs ${closeInline} \\)`
    );
  }

  // 6. Category preservation
  if (
    slot.category &&
    question.category &&
    question.category !== slot.category
  ) {
    // Soft warning - not a hard failure
  }

  // 7. Content-quality checks (reject fact-recall and contaminated stems)
  const stemLower = qText.toLowerCase();

  // Reject cross-subject contamination (social studies stems in science banks)
  const contaminationPatterns = [
    /civic context/i,
    /historical.*context/i,
    /political significance/i,
    /constitutional/i,
    /government policy/i,
  ];
  for (const pat of contaminationPatterns) {
    if (pat.test(stemLower)) {
      errors.push(`Cross-subject contamination detected: "${pat.source}"`);
      break;
    }
  }

  // Reject pure fact-recall stems (for Science exams) — these should have stimulus
  if (slot.stimulusType === 'standalone') {
    const factRecallPatterns = [
      /^what is the (?:name|term|definition) (?:for|of)\b/,
      /^what is a [a-z]+\?$/,
      /^an? \w+ is defined by\b/,
      /^which of the following (?:is|are) (?:the )?(?:correct )?definition/,
    ];
    for (const pat of factRecallPatterns) {
      if (pat.test(stemLower)) {
        errors.push(
          `Fact-recall stem rejected (not comprehension-based): "${pat.source}"`
        );
        break;
      }
    }
  }

  // Reject questions with "subject": "Social Studies" in a Science slot
  if (
    slot.category &&
    /science/i.test(slot.category) &&
    question.subject &&
    /social.?studies/i.test(question.subject)
  ) {
    errors.push('Question subject is Social Studies but slot is Science');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate an essay slot (RLA Part 2).
 */
function validateEssaySlot(essay, slot) {
  const errors = [];

  if (!essay) {
    errors.push('Essay object is null');
    return { valid: false, errors };
  }

  if (!Array.isArray(essay.passages) || essay.passages.length < 2) {
    errors.push(
      `Essay must have 2 opposing passages (got ${essay.passages?.length || 0})`
    );
  } else {
    for (let i = 0; i < essay.passages.length; i++) {
      const p = essay.passages[i];
      if (!p.title || !String(p.title).trim()) {
        errors.push(`Essay passage ${i + 1} missing title`);
      }
      if (!p.content || String(p.content).trim().length < 50) {
        errors.push(`Essay passage ${i + 1} content too short`);
      }
    }
  }

  if (!essay.prompt || !String(essay.prompt).trim()) {
    errors.push('Essay missing prompt');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Check for near-duplicate stems in a question set.
 * Returns pairs of indices that are too similar.
 */
function findDuplicateStems(questions, threshold = 0.85) {
  const duplicates = [];
  const stems = questions.map((q) => {
    const text = (q.questionText || q.question || '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
    return text;
  });

  for (let i = 0; i < stems.length; i++) {
    for (let j = i + 1; j < stems.length; j++) {
      if (!stems[i] || !stems[j]) continue;
      const similarity = jaccardSimilarity(stems[i], stems[j]);
      if (similarity >= threshold) {
        duplicates.push({ i, j, similarity });
      }
    }
  }
  return duplicates;
}

function jaccardSimilarity(a, b) {
  const setA = new Set(a.split(/\s+/));
  const setB = new Set(b.split(/\s+/));
  let intersection = 0;
  for (const word of setA) {
    if (setB.has(word)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

module.exports = {
  validateQuestion,
  validateEssaySlot,
  findDuplicateStems,
  MULTI_SELECT_TYPES,
  NON_MC_RESPONSE_TYPES,
};
