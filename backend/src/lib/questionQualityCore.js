const GENERIC_STEM_OPENER_PATTERN =
  /^(what\s+general\s+conclusion|based on the data(?:\s+presented)?|based on the table|based on the passage|based on the information provided|based on the chart|based on the graph|according to the passage|which of the following|what general conclusion)\b[\s,]*/i;
// A stem is "generic" only if, after stripping a generic opener, the
// remaining tail is itself uninformative (e.g. "is correct", "applies",
// "best answers the question") or empty. A stem like "Which of the
// following is the basic unit of life?" is specific and should not fire.
const GENERIC_STEM_TAIL_PATTERN =
  /^(?:is\s+(?:correct|true|false|right|wrong|the\s+answer|accurate|the\s+best\s+answer)|are\s+(?:correct|true|false)|best\s+answers?\s+the\s+question|applies|is\s+appropriate|statement\s+is\s+true|statement\s+is\s+correct)\??\s*$/i;
function isGenericStem(text) {
  const trimmed = String(text || '').trim();
  if (!trimmed) return false;
  const m = trimmed.match(GENERIC_STEM_OPENER_PATTERN);
  if (!m) return false;
  const tail = trimmed
    .slice(m[0].length)
    .replace(/[?.!\s]+$/, '')
    .trim();
  if (!tail) return true;
  return GENERIC_STEM_TAIL_PATTERN.test(tail);
}
const WEAK_RATIONALE_PATTERN =
  /(^$|this answer is incorrect|this is incorrect|plausible but not the best answer|review the passage carefully|consider the key details|does not accurately reflect|while this might seem plausible)/i;
const PLACEHOLDER_OPTION_PATTERN =
  /(^no options generated$|^plausible but incorrect option\s*\d+$|^option\s*[a-d]\s*:|based on scientific principles|common misconception|alternative theory|incomplete understanding)/i;
const LOGIC_DEFECT_PATTERN =
  /(\nA\.|\nB\.|\nC\.|\nD\.|all of the above|none of the above)/i;
const GENERIC_TERSER_RATIONALE_PATTERN =
  /^(correct answer|correct coefficient\.?|incorrect coefficient\.?|incorrect answer\.?|not supported by evidence\.?|missing key factors\.?|plausible but incorrect\.?)$/i;
// Only treat the question as referencing an external stimulus if the prose
// explicitly directs the student to one (e.g. "the graph above", "see the
// diagram", "based on the chart"). Mentioning a graph or chart in the prose
// while *describing* it inline is not a stimulus reference.
const STIMULUS_REFERENCE_PATTERN = new RegExp(
  '\\b(?:passage|excerpt|article|text|table|chart|graph|diagram|image|map|photo|cartoon|figure|illustration)\\s+(?:above|below|shown|shows|provided|displayed|displays|depicts|depicted)\\b' +
    '|\\b(?:see|examine|observe|inspect|study|look\\s+at|refer(?:ring)?\\s+to|based\\s+on|according\\s+to|from|in)\\s+(?:the\\s+)?(?:passage|excerpt|article|text|table|chart|graph|diagram|image|map|photo|cartoon|figure|illustration)\\b',
  'i'
);

function normalizeQuestionText(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeAnswerOptions(options) {
  return Array.isArray(options)
    ? options.map((option) => {
        if (typeof option === 'string') {
          return {
            text: option.trim(),
            isCorrect: false,
            rationale: '',
          };
        }
        return {
          text: String(
            option?.text || option?.label || option?.value || ''
          ).trim(),
          isCorrect: option?.isCorrect === true,
          rationale: String(option?.rationale || '').trim(),
        };
      })
    : [];
}

function getQuestionText(question) {
  return String(
    question?.questionText ||
      question?.question ||
      question?.prompt ||
      question?.stem ||
      question?.content?.questionText ||
      question?.content?.question ||
      ''
  ).trim();
}

function getQuestionPassage(question) {
  if (typeof question?.passage === 'string') {
    return question.passage;
  }
  if (typeof question?.content?.passage === 'string') {
    return question.content.passage;
  }
  return '';
}

function getQuestionImage(question) {
  return String(
    question?.stimulusImage?.src ||
      question?.imageUrl ||
      question?.imageURL ||
      question?.image ||
      question?.graphic ||
      question?.content?.imageUrl ||
      question?.content?.imageURL ||
      question?.content?.image ||
      ''
  ).trim();
}

function countCorrectOptions(options) {
  return options.reduce(
    (total, option) => total + (option?.isCorrect === true ? 1 : 0),
    0
  );
}

function hasDuplicateOptions(options) {
  // Preserve case when comparing answer choices because some content (e.g.
  // genetics genotype labels PP/Pp/pp) is case-significant.
  const seen = new Set();
  for (const option of options) {
    const raw = String(option?.text || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!raw) return true;
    if (seen.has(raw)) return true;
    seen.add(raw);
  }
  return false;
}

function hasDuplicateRationales(options) {
  const seen = new Set();
  for (const option of options) {
    const key = normalizeQuestionText(option?.rationale || '');
    if (!key) continue;
    if (seen.has(key)) return true;
    seen.add(key);
  }
  return false;
}

function questionReferencesStimulus(text) {
  // Strip constitutional/legal "Article I/II/III..." and "Amendment X" so they
  // don't trigger the generic "...the article..." stimulus reference.
  const cleaned = String(text || '').replace(
    /\bArticle\s+(?:[IVX]+|\d+|One|Two|Three|Four|Five|Six|Seven)\b/g,
    ''
  );
  return STIMULUS_REFERENCE_PATTERN.test(cleaned);
}

const NON_OPTION_QUESTION_TYPES = new Set([
  'fillIn',
  'fill-in',
  'fillin',
  'fill_in',
  'numeric',
  'shortAnswer',
  'short-answer',
  'essay',
  'extendedResponse',
  'extended-response',
  'dragDrop',
  'drag-drop',
  'hotspot',
  'graph',
  'graphing',
  'plot',
]);

function isNonOptionType(question) {
  const rawType = String(question?.type || '')
    .trim()
    .toLowerCase();
  if (!rawType) return false;
  if (NON_OPTION_QUESTION_TYPES.has(question?.type)) return true;
  return NON_OPTION_QUESTION_TYPES.has(rawType);
}

function isMultiSelectQuestion(question) {
  if (!question) return false;
  if (question.multiSelect === true) return true;
  if (question.isMultiSelect === true) return true;
  const text = String(
    question.questionText || question.question || question.prompt || ''
  );
  return /select\s+(all|each|every|the\s+best\s+two|the\s+two|all\s+that\s+apply)/i.test(
    text
  );
}

function classifyCoreQuestionQualityIssues(question) {
  const issues = [];
  const questionText = getQuestionText(question);
  const options = normalizeAnswerOptions(
    question?.answerOptions || question?.choices
  );
  const subject = String(question?.subject || '').trim();
  const referencesStimulus = questionReferencesStimulus(questionText);
  const nonOptionType = isNonOptionType(question);
  // Inline-dropdown / cloze items use the surrounding passage as the prompt;
  // their explicit question field is intentionally empty.
  const itemType = String(question?.itemType || '').toLowerCase();
  const isClozeItem = itemType === 'inline_dropdown' || itemType === 'cloze';

  if (!isClozeItem && (!questionText || questionText.length < 15)) {
    issues.push('short-question-text');
  }
  if (isGenericStem(questionText)) {
    issues.push('generic-stem');
  }
  if (LOGIC_DEFECT_PATTERN.test(questionText)) {
    issues.push('logic-defect');
  }
  if (/\bA\.|\bB\.|\bC\.|\bD\./.test(questionText)) {
    // Detect actual embedded choice list (e.g. "A) red B) blue C) green") rather
    // than incidental capital-letter abbreviations like "Lyndon B. Johnson",
    // "Test Tube A", or "Layer A". Require at least two distinct choice
    // markers appearing at the start of a line or after sentence terminators.
    const choiceMarkers = questionText.match(
      /(?:^|[\n\r]|[.!?]\s+)\(?[A-D][.)\]]\s+\S/g
    );
    if (choiceMarkers && choiceMarkers.length >= 2) {
      issues.push('embedded-choice-text');
    }
  }
  if (nonOptionType) {
    // For fillIn / numeric / essay / graph-plot etc., expect a non-empty
    // correctAnswer (or sample answer) instead of multiple-choice options.
    // Some interactive types use `expectedAnswer` (graphPlot) or
    // `sampleAnswer` (essay) rather than `correctAnswer`; treat them all as
    // valid satisfaction of the constraint.
    if (
      Array.isArray(question?.answerOptions) &&
      question.answerOptions.length > 0
    ) {
      // Type is labelled as non-option but the question carries
      // multiple-choice options anyway (e.g. type: 'graph' with answerOptions
      // for "Read the chart" style questions). Fall through to the regular
      // MC checks below.
    } else {
      const correctAnswer = question?.correctAnswer;
      const expectedAnswer = question?.expectedAnswer;
      const sampleAnswer = question?.sampleAnswer;
      const hasArrayValue = (v) =>
        Array.isArray(v) && v.some((a) => String(a || '').trim().length > 0);
      const hasStringValue = (v) => String(v || '').trim().length > 0;
      const hasCorrect =
        hasArrayValue(correctAnswer) ||
        hasStringValue(correctAnswer) ||
        (expectedAnswer && typeof expectedAnswer === 'object'
          ? Object.keys(expectedAnswer).some((k) => {
              const v = expectedAnswer[k];
              return Array.isArray(v) ? v.length > 0 : hasStringValue(v);
            })
          : hasStringValue(expectedAnswer)) ||
        hasStringValue(sampleAnswer);
      if (!hasCorrect) {
        issues.push('missing-correct-answer');
      }
      const rationaleText = String(
        question?.rationale ||
          question?.graphInstructions ||
          question?.explanation ||
          ''
      ).trim();
      if (!rationaleText) {
        issues.push('missing-answer-rationale');
      } else if (rationaleText.length < 24) {
        issues.push('short-correct-rationale');
      }
      return issues;
    }
  }
  {
    const multiSelect = isMultiSelectQuestion(question);
    if (!multiSelect && options.length !== 4) {
      issues.push('non-four-options');
    }
    if (multiSelect) {
      if (options.length < 4) issues.push('non-four-options');
      if (countCorrectOptions(options) < 1) {
        issues.push('invalid-correct-count');
      }
    } else if (countCorrectOptions(options) !== 1) {
      issues.push('invalid-correct-count');
    }
    if (hasDuplicateOptions(options)) {
      issues.push('duplicate-options');
    }
    if (hasDuplicateRationales(options)) {
      issues.push('duplicate-rationales');
    }
    if (
      options.some((option) =>
        PLACEHOLDER_OPTION_PATTERN.test(String(option?.text || '').trim())
      )
    ) {
      issues.push('placeholder-option');
    }
    if (
      options.some((option) =>
        WEAK_RATIONALE_PATTERN.test(String(option?.rationale || '').trim())
      )
    ) {
      issues.push('weak-rationale');
    }
    if (
      options.some((option) =>
        GENERIC_TERSER_RATIONALE_PATTERN.test(
          String(option?.rationale || '').trim()
        )
      )
    ) {
      issues.push('terse-generic-rationale');
    }

    const correctOption = options.find((option) => option?.isCorrect === true);
    if (
      correctOption &&
      normalizeQuestionText(correctOption.rationale || '').length < 24
    ) {
      issues.push('short-correct-rationale');
    }
    if (subject === 'Science' && correctOption) {
      const rationale = String(correctOption.rationale || '').trim();
      const hasExplanatoryConnector =
        /(because|when|which|shows|indicates|means|results|therefore|so that|equals|due to|since)/i.test(
          rationale
        );
      if (
        /^Correctly balanced equation/i.test(rationale) ||
        (/^Correct\./i.test(rationale) && rationale.length < 55) ||
        (!hasExplanatoryConnector && rationale.length < 42)
      ) {
        issues.push('science-thin-rationale');
      }
    }
  }
  if (
    referencesStimulus &&
    !String(getQuestionPassage(question) || '').trim() &&
    !String(getQuestionImage(question) || '').trim() &&
    !question?.graphSpec &&
    !question?.content?.graphSpec
  ) {
    issues.push('missing-stimulus');
  }

  return issues;
}

module.exports = {
  classifyCoreQuestionQualityIssues,
  countCorrectOptions,
  getQuestionImage,
  getQuestionPassage,
  getQuestionText,
  hasDuplicateOptions,
  hasDuplicateRationales,
  normalizeAnswerOptions,
  normalizeQuestionText,
  questionReferencesStimulus,
};
