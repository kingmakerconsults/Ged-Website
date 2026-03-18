#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports');
const OUTPUT_DIR = path.join(__dirname, 'data', 'ai-question-bank');

const SUBJECT_ALIASES = new Map([
  ['RLA', 'Reasoning Through Language Arts (RLA)'],
  [
    'Reasoning Through Language Arts (RLA)',
    'Reasoning Through Language Arts (RLA)',
  ],
  ['Science', 'Science'],
  ['Social Studies', 'Social Studies'],
  ['Math', 'Math'],
]);

const SUBJECT_FILE_NAMES = {
  Math: 'math.accepted.json',
  Science: 'science.accepted.json',
  'Social Studies': 'social-studies.accepted.json',
};

const RLA_LANGUAGE_PATTERN =
  /\b(sentence\s+\d+|which\s+correction|which\s+revision|best\s+(?:way|revision|correction)|revise|rewrite|edit|grammar|usage|punctuation|comma|semicolon|colon|apostrophe|capitalize|capitalization|spelling|transition|combine\s+the\s+sentences|comparative\s+form|verb|pronoun)\b/i;
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

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function canonicalizeSubject(subject) {
  return (
    SUBJECT_ALIASES.get(String(subject || '').trim()) ||
    String(subject || '').trim()
  );
}

function findLatestAcceptedReport() {
  const files = fs
    .readdirSync(REPORTS_DIR)
    .filter((name) =>
      /^question_bank_vetting_accepted_\d{8}-\d{6}\.json$/.test(name)
    )
    .sort();

  if (!files.length) {
    throw new Error('No accepted vetting reports found in reports/.');
  }

  return path.join(REPORTS_DIR, files[files.length - 1]);
}

function pruneUndefined(value) {
  if (Array.isArray(value)) {
    return value.map(pruneUndefined);
  }
  if (value && typeof value === 'object') {
    const output = {};
    for (const [key, entry] of Object.entries(value)) {
      if (entry === undefined) continue;
      output[key] = pruneUndefined(entry);
    }
    return output;
  }
  return value;
}

function normalizeAnswerOptions(options) {
  return Array.isArray(options)
    ? options.map((option) => ({
        text: String(option?.text || '').trim(),
        isCorrect: option?.isCorrect === true,
        rationale: String(option?.rationale || '').trim(),
      }))
    : [];
}

function isRlaLanguageQuestion(questionText) {
  return RLA_LANGUAGE_PATTERN.test(String(questionText || ''));
}

function normalizeQuestionText(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
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

function classifyQualityIssues(question) {
  const issues = [];
  const questionText = String(question.questionText || '').trim();
  const options = Array.isArray(question.answerOptions)
    ? question.answerOptions
    : [];
  const subject = String(question.subject || '').trim();
  const referencesStimulus =
    /\b(passage|table|chart|graph|diagram|image|map|photo|cartoon)\b/i.test(
      questionText
    );

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
    !String(question.passage || '').trim() &&
    !String(question.imageUrl || question?.stimulusImage?.src || '').trim()
  ) {
    issues.push('missing-stimulus');
  }

  return issues;
}

function buildExportQuestion(entry, canonicalSubject) {
  const question = entry?.sanitizedQuestion || {};
  const imageSrc =
    question?.stimulusImage?.src ||
    question?.imageUrl ||
    question?.imageURL ||
    question?.image ||
    undefined;

  return pruneUndefined({
    questionText: String(
      question.questionText || question.question || ''
    ).trim(),
    passage: typeof question.passage === 'string' ? question.passage : '',
    answerOptions: normalizeAnswerOptions(question.answerOptions),
    difficulty: question.difficulty || 'medium',
    itemType: question.itemType || question.questionType || 'standalone',
    questionType: question.questionType || null,
    topic: entry?.topic || question.topic || null,
    subject: canonicalSubject,
    stimulusImage: imageSrc
      ? {
          ...(question.stimulusImage &&
          typeof question.stimulusImage === 'object'
            ? question.stimulusImage
            : {}),
          src: imageSrc,
        }
      : undefined,
    imageUrl: imageSrc,
    bankMeta: {
      fingerprint: entry?.fingerprint || null,
      sourceModel: entry?.sourceModel || null,
      createdAt: entry?.createdAt || null,
      originalSubject: entry?.subject || canonicalSubject,
      originalDifficulty: entry?.originalDifficulty || null,
      originalItemType: entry?.originalItemType || null,
      vettedSource: 'question_bank_vetting_accepted',
    },
  });
}

function main() {
  ensureDir(OUTPUT_DIR);

  const reportPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : findLatestAcceptedReport();
  const raw = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const accepted = Array.isArray(raw) ? raw : [];

  const grouped = {
    Math: [],
    Science: [],
    'Social Studies': [],
    rlaReading: [],
    rlaLanguage: [],
  };
  const report = {
    generatedAt: new Date().toISOString(),
    sourceReport: path.relative(ROOT, reportPath).replace(/\\/g, '/'),
    strictFilters: [
      'generic-stem',
      'logic-defect',
      'embedded-choice-text',
      'placeholder-option',
      'weak-rationale',
      'terse-generic-rationale',
      'short-correct-rationale',
      'science-thin-rationale',
      'invalid-correct-count',
      'duplicate-options',
      'duplicate-rationales',
      'missing-stimulus',
    ],
    inputCount: accepted.length,
    reviewPromoted: 0,
    keptCount: 0,
    removedCount: 0,
    bySubject: {},
  };

  for (const entry of accepted) {
    const canonicalSubject = canonicalizeSubject(entry?.subject);
    const question = buildExportQuestion(entry, canonicalSubject);
    const subjectBucket =
      canonicalSubject === 'Reasoning Through Language Arts (RLA)'
        ? isRlaLanguageQuestion(question.questionText)
          ? 'rlaLanguage'
          : 'rlaReading'
        : canonicalSubject;
    const subjectLabel =
      subjectBucket === 'rlaReading'
        ? 'RLA Reading'
        : subjectBucket === 'rlaLanguage'
          ? 'RLA Language'
          : canonicalSubject;

    report.bySubject[subjectLabel] ||= {
      input: 0,
      kept: 0,
      removed: 0,
      removalReasons: {},
    };
    report.bySubject[subjectLabel].input += 1;

    const qualityIssues = classifyQualityIssues(question);
    if (qualityIssues.length > 0) {
      report.removedCount += 1;
      report.bySubject[subjectLabel].removed += 1;
      for (const issue of new Set(qualityIssues)) {
        report.bySubject[subjectLabel].removalReasons[issue] =
          (report.bySubject[subjectLabel].removalReasons[issue] || 0) + 1;
      }
      continue;
    }

    report.keptCount += 1;
    report.bySubject[subjectLabel].kept += 1;

    if (subjectBucket === 'rlaLanguage') {
      grouped.rlaLanguage.push(question);
    } else if (subjectBucket === 'rlaReading') {
      grouped.rlaReading.push(question);
    } else if (grouped[canonicalSubject]) {
      grouped[canonicalSubject].push(question);
    }
  }

  const manifest = {
    generatedAt: report.generatedAt,
    sourceReport: report.sourceReport,
    counts: {
      Math: grouped.Math.length,
      Science: grouped.Science.length,
      'Social Studies': grouped['Social Studies'].length,
      'Reasoning Through Language Arts (RLA)':
        grouped.rlaReading.length + grouped.rlaLanguage.length,
      rlaReading: grouped.rlaReading.length,
      rlaLanguage: grouped.rlaLanguage.length,
      total:
        grouped.Math.length +
        grouped.Science.length +
        grouped['Social Studies'].length +
        grouped.rlaReading.length +
        grouped.rlaLanguage.length,
    },
    bySubject: report.bySubject,
    reviewPromoted: report.reviewPromoted,
    removedCount: report.removedCount,
  };

  for (const [subject, fileName] of Object.entries(SUBJECT_FILE_NAMES)) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, fileName),
      JSON.stringify(grouped[subject], null, 2) + '\n',
      'utf8'
    );
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'rla-reading.accepted.json'),
    JSON.stringify(grouped.rlaReading, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'rla-language.accepted.json'),
    JSON.stringify(grouped.rlaLanguage, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'quality-report.json'),
    JSON.stringify(report, null, 2) + '\n',
    'utf8'
  );

  console.log(
    JSON.stringify(
      {
        outputDir: path.relative(ROOT, OUTPUT_DIR).replace(/\\/g, '/'),
        ...manifest,
      },
      null,
      2
    )
  );
}

main();
