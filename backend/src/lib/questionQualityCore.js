const GENERIC_STEM_PATTERN =
  /(^what\s+general\s+conclusion\b|^based on the data\b|^based on the table\b|^based on the passage\b|^based on the data presented\b|^based on the information provided\b|^according to the passage\b|^which of the following\b)/i;
const WEAK_RATIONALE_PATTERN =
  /(^$|this answer is incorrect|this is incorrect|plausible but not the best answer|review the passage carefully|consider the key details|does not accurately reflect|while this might seem plausible)/i;
const PLACEHOLDER_OPTION_PATTERN =
  /(^no options generated$|^plausible but incorrect option\s*\d+$|^option\s*[a-d]\s*:|based on scientific principles|common misconception|alternative theory|incomplete understanding)/i;
const LOGIC_DEFECT_PATTERN =
  /(\nA\.|\nB\.|\nC\.|\nD\.|all of the above|none of the above)/i;
const GENERIC_TERSER_RATIONALE_PATTERN =
  /^(correct answer|correct coefficient\.?|incorrect coefficient\.?|incorrect answer\.?|not supported by evidence\.?|missing key factors\.?|plausible but incorrect\.?)$/i;
const STIMULUS_REFERENCE_PATTERN =
  /\b(passage|table|chart|graph|diagram|image|map|photo|cartoon|figure|illustration)\b/i;

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
  const seen = new Set();
  for (const option of options) {
    const key = normalizeQuestionText(option?.text || '');
    if (!key) return true;
    if (seen.has(key)) return true;
    seen.add(key);
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
  return STIMULUS_REFERENCE_PATTERN.test(String(text || ''));
}

function classifyCoreQuestionQualityIssues(question) {
  const issues = [];
  const questionText = getQuestionText(question);
  const options = normalizeAnswerOptions(
    question?.answerOptions || question?.choices
  );
  const subject = String(question?.subject || '').trim();
  const referencesStimulus = questionReferencesStimulus(questionText);

  if (!questionText || questionText.length < 15) {
    issues.push('short-question-text');
  }
  if (GENERIC_STEM_PATTERN.test(questionText)) {
    issues.push('generic-stem');
  }
  if (LOGIC_DEFECT_PATTERN.test(questionText)) {
    issues.push('logic-defect');
  }
  if (/\bA\.|\bB\.|\bC\.|\bD\./.test(questionText)) {
    issues.push('embedded-choice-text');
  }
  if (options.length !== 4) {
    issues.push('non-four-options');
  }
  if (countCorrectOptions(options) !== 1) {
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
  if (
    referencesStimulus &&
    !String(getQuestionPassage(question) || '').trim() &&
    !String(getQuestionImage(question) || '').trim()
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
