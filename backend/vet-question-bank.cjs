#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND_PUBLIC_ROOT = path.join(ROOT, 'frontend', 'public');
const REPORTS_DIR = path.join(ROOT, 'reports');
const IMAGE_METADATA_PATH = path.join(__dirname, 'image_metadata_final.json');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function timestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '-',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('');
}

function normalizeWhitespace(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeQuestionText(value) {
  return normalizeWhitespace(String(value || '').replace(/<[^>]+>/g, ' '));
}

function normalizeAssetPath(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') return '';
  const raw = rawPath.split(/[?#]/, 1)[0].trim();
  if (!raw) return '';
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {}
  const clean = decoded.replace(/^\/frontend/i, '');
  return clean.startsWith('/') ? clean : `/${clean}`;
}

function resolvePublicAssetPath(webPath) {
  const normalized = normalizeAssetPath(webPath);
  if (!normalized) return null;
  const relativePath = normalized.replace(/^\/+/, '').replace(/\//g, path.sep);
  const absolutePath = path.resolve(FRONTEND_PUBLIC_ROOT, relativePath);
  if (!absolutePath.startsWith(FRONTEND_PUBLIC_ROOT)) return null;
  return absolutePath;
}

function doesPublicAssetExist(webPath) {
  const abs = resolvePublicAssetPath(webPath);
  return abs ? fs.existsSync(abs) : false;
}

function buildMetadataMap(items) {
  const byPath = new Map();
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const rawPath = item.filePath || item.src || item.path;
    const normalized = normalizeAssetPath(rawPath);
    if (!normalized) continue;
    byPath.set(normalized, item);
    byPath.set(normalized.slice(1), item);
    if (rawPath) byPath.set(String(rawPath), item);
  }
  return byPath;
}

function countCorrectOptions(options) {
  return options.reduce(
    (acc, option) => acc + (option && option.isCorrect === true ? 1 : 0),
    0
  );
}

function stripOptionPrefix(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/^[A-Da-d][.):]\s*/, '').trim();
}

function hasBrokenHtml(html) {
  if (typeof html !== 'string' || !html) return false;
  if (/<[^>]*$/.test(html)) return true;
  const tableOpen = (html.match(/<table\b/gi) || []).length;
  const tableClose = (html.match(/<\/table>/gi) || []).length;
  const trOpen = (html.match(/<tr\b/gi) || []).length;
  const trClose = (html.match(/<\/tr>/gi) || []).length;
  const tdOpen = (html.match(/<td\b/gi) || []).length;
  const tdClose = (html.match(/<\/td>/gi) || []).length;
  const thOpen = (html.match(/<th\b/gi) || []).length;
  const thClose = (html.match(/<\/th>/gi) || []).length;
  return (
    tableOpen !== tableClose ||
    trOpen !== trClose ||
    tdOpen !== tdClose ||
    thOpen !== thClose
  );
}

function looksGenericRationale(text) {
  const value = normalizeWhitespace(text).toLowerCase();
  if (!value) return true;
  return [
    'this answer is incorrect',
    'this is an incorrect calculation',
    'this is not the correct answer based on the information provided',
    'while this might seem plausible',
    'review the passage carefully',
    'consider the key details',
    'does not accurately reflect the passage or question context',
    'correct.',
  ].some((fragment) => value.includes(fragment));
}

function inferStimulusType(question) {
  const passage = String(question.passage || '');
  const hasPassage = passage.trim().length >= 80;
  const imagePath = normalizeAssetPath(
    question?.stimulusImage?.src ||
      question?.imageUrl ||
      question?.imageURL ||
      question?.image ||
      ''
  );
  const hasImage = Boolean(imagePath);
  const hasTable =
    /<table\b/i.test(
      String(question.questionText || question.question || '')
    ) || /<table\b/i.test(passage);
  if (hasImage) return 'image';
  if (hasTable || hasPassage) return 'passage';
  return 'standalone';
}

function referencesStimulus(text) {
  const value = normalizeWhitespace(text).toLowerCase();
  return /(passage|chart|graph|table|map|diagram|image|photo|cartoon|based on the graph|based on the chart|according to the passage|according to the table|based on the image)/i.test(
    value
  );
}

function sanitizeQuestion(raw, subject, topic) {
  const questionText = String(raw.questionText || raw.question || '').trim();
  const passage = typeof raw.passage === 'string' ? raw.passage.trim() : '';
  const answerOptions = Array.isArray(raw.answerOptions)
    ? raw.answerOptions.map((option) => ({
        text: stripOptionPrefix(option?.text || ''),
        isCorrect: option?.isCorrect === true,
        rationale: String(option?.rationale || '').trim(),
      }))
    : [];

  const imageSrc = normalizeAssetPath(
    raw?.stimulusImage?.src ||
      raw?.imageUrl ||
      raw?.imageURL ||
      raw?.image ||
      ''
  );

  const sanitized = {
    questionText,
    passage,
    answerOptions,
    difficulty: raw.difficulty || 'medium',
    questionType: raw.questionType || raw.type || null,
    stimulusImage: imageSrc
      ? {
          ...(raw.stimulusImage && typeof raw.stimulusImage === 'object'
            ? raw.stimulusImage
            : {}),
          src: imageSrc,
        }
      : undefined,
    imageUrl: imageSrc || undefined,
    itemType: inferStimulusType({
      ...raw,
      questionText,
      passage,
      imageUrl: imageSrc,
    }),
    topic,
    subject,
  };

  if (raw.asset && typeof raw.asset === 'object') {
    sanitized.asset = { ...raw.asset };
    if (imageSrc) sanitized.asset.imagePath = imageSrc;
  } else if (imageSrc) {
    sanitized.asset = { imagePath: imageSrc };
  }

  return sanitized;
}

function addIssue(list, severity, code, detail) {
  list.push({ severity, code, detail });
}

async function run() {
  ensureDir(REPORTS_DIR);

  const metadata = fs.existsSync(IMAGE_METADATA_PATH)
    ? JSON.parse(fs.readFileSync(IMAGE_METADATA_PATH, 'utf8'))
    : [];
  const metadataByPath = buildMetadataMap(
    Array.isArray(metadata) ? metadata : []
  );

  const result = await pool.query(
    `SELECT fingerprint, subject, topic, source_model, difficulty, item_type, has_stimulus, created_at, question_json
       FROM ai_question_bank
      ORDER BY created_at ASC`
  );

  const seenQuestionText = new Map();
  const accepted = [];
  const review = [];
  const rejected = [];
  const summary = {
    total: result.rows.length,
    accepted: 0,
    review: 0,
    rejected: 0,
    bySubject: {},
    issueCounts: {},
    asset: {
      imageQuestions: 0,
      missingPublicAsset: 0,
      missingMetadata: 0,
      metadataMarkedMissing: 0,
      acceptedImageQuestions: 0,
    },
  };

  for (const row of result.rows) {
    const raw = row.question_json || {};
    const subject = row.subject || 'Unknown';
    const topic = row.topic || null;
    const sanitized = sanitizeQuestion(raw, subject, topic);
    const issues = [];

    const questionText = sanitized.questionText;
    const options = sanitized.answerOptions;
    const optionTextsNormalized = options
      .map((option) => normalizeQuestionText(option.text).toLowerCase())
      .filter(Boolean);
    const correctCount = countCorrectOptions(options);
    const imagePath = sanitized.stimulusImage?.src || '';
    const metadataEntry = imagePath
      ? metadataByPath.get(imagePath) || metadataByPath.get(imagePath.slice(1))
      : null;

    summary.bySubject[subject] ||= {
      total: 0,
      accepted: 0,
      review: 0,
      rejected: 0,
    };
    summary.bySubject[subject].total += 1;

    if (!questionText || questionText.length < 15) {
      addIssue(
        issues,
        'reject',
        'missing-question-text',
        'Question text is empty or too short.'
      );
    }

    if (!Array.isArray(options) || options.length === 0) {
      addIssue(
        issues,
        'reject',
        'missing-answer-options',
        'Question has no answer options.'
      );
    }

    if (Array.isArray(options) && options.length > 0 && options.length !== 4) {
      addIssue(
        issues,
        'reject',
        'non-four-option-mc',
        `Expected 4 answer options; found ${options.length}.`
      );
    }

    if (correctCount !== 1) {
      addIssue(
        issues,
        'reject',
        'invalid-correct-count',
        `Expected exactly 1 correct answer; found ${correctCount}.`
      );
    }

    if (hasBrokenHtml(sanitized.passage) || hasBrokenHtml(questionText)) {
      addIssue(
        issues,
        'reject',
        'broken-html',
        'Question or passage appears to have truncated/broken HTML.'
      );
    }

    const duplicateOptionTexts = optionTextsNormalized.filter(
      (text, index) => optionTextsNormalized.indexOf(text) !== index
    );
    if (duplicateOptionTexts.length > 0) {
      addIssue(
        issues,
        'reject',
        'duplicate-option-text',
        'Two or more answer options are identical after normalization.'
      );
    }

    const textKey = normalizeQuestionText(questionText).toLowerCase();
    if (textKey) {
      const seen = seenQuestionText.get(textKey);
      if (seen) {
        addIssue(
          issues,
          'reject',
          'duplicate-question-text',
          `Matches earlier question ${seen}.`
        );
      } else {
        seenQuestionText.set(textKey, row.fingerprint);
      }
    }

    if (referencesStimulus(questionText) && !sanitized.passage && !imagePath) {
      addIssue(
        issues,
        'reject',
        'missing-required-stimulus',
        'Question text references a stimulus, but none is attached.'
      );
    }

    if (
      sanitized.passage &&
      sanitized.passage.length < 40 &&
      /according to the passage|based on the passage/i.test(questionText)
    ) {
      addIssue(
        issues,
        'reject',
        'passage-too-thin',
        'Question depends on a passage that is too short to support it.'
      );
    }

    if (imagePath) {
      summary.asset.imageQuestions += 1;
      if (!doesPublicAssetExist(imagePath)) {
        summary.asset.missingPublicAsset += 1;
        addIssue(
          issues,
          'reject',
          'missing-public-asset',
          `Referenced image not found in frontend/public: ${imagePath}`
        );
      }
      if (!metadataEntry) {
        summary.asset.missingMetadata += 1;
        addIssue(
          issues,
          'review',
          'missing-asset-metadata',
          `Image exists but is not present in image_metadata_final.json: ${imagePath}`
        );
      } else if (metadataEntry.__exists === false) {
        summary.asset.metadataMarkedMissing += 1;
        addIssue(
          issues,
          'reject',
          'asset-marked-missing',
          `Image metadata marks this asset as unavailable: ${imagePath}`
        );
      }
      if (!sanitized.stimulusImage?.alt && metadataEntry?.altText) {
        sanitized.stimulusImage.alt = metadataEntry.altText;
      }
      if (!sanitized.stimulusImage?.alt && !metadataEntry?.altText) {
        addIssue(
          issues,
          'review',
          'missing-image-alt',
          'Image question has no alt text in question or metadata.'
        );
      }
    }

    if (row.has_stimulus && !sanitized.passage && !imagePath) {
      addIssue(
        issues,
        'review',
        'stimulus-flag-mismatch',
        'DB says question has stimulus but no passage/image was found in question_json.'
      );
    }

    if (
      options.some((option) =>
        /^[A-Da-d][.):]\s/.test(String(option.text || ''))
      )
    ) {
      addIssue(
        issues,
        'review',
        'option-prefix-found',
        'Answer option text still contains an A./B./C./D. prefix after normalization attempt.'
      );
    }

    const genericRationaleCount = options.reduce(
      (acc, option) => acc + (looksGenericRationale(option.rationale) ? 1 : 0),
      0
    );
    if (genericRationaleCount >= 2) {
      addIssue(
        issues,
        'review',
        'generic-rationales',
        `${genericRationaleCount} rationale(s) look templated or low-information.`
      );
    }

    if (
      subject === 'Social Studies' &&
      /science|lab report|organism|photosynthesis/i.test(questionText) &&
      !/economic|civic|histor|government|constitution|policy/i.test(
        questionText
      )
    ) {
      addIssue(
        issues,
        'review',
        'subject-drift',
        'Social Studies question text looks off-topic for the subject.'
      );
    }
    if (
      subject === 'Science' &&
      /constitution|amendment|senate|president|election|bill of rights/i.test(
        questionText
      )
    ) {
      addIssue(
        issues,
        'review',
        'subject-drift',
        'Science question text looks off-topic for the subject.'
      );
    }

    const rejectIssues = issues.filter((issue) => issue.severity === 'reject');
    const reviewIssues = issues.filter((issue) => issue.severity === 'review');

    const record = {
      fingerprint: row.fingerprint,
      subject,
      topic,
      sourceModel: row.source_model || null,
      createdAt: row.created_at,
      originalDifficulty: row.difficulty || null,
      originalItemType: row.item_type || null,
      sanitizedQuestion: sanitized,
      issues,
    };

    for (const issue of issues) {
      summary.issueCounts[issue.code] =
        (summary.issueCounts[issue.code] || 0) + 1;
    }

    if (rejectIssues.length > 0) {
      rejected.push(record);
      summary.rejected += 1;
      summary.bySubject[subject].rejected += 1;
      continue;
    }

    if (reviewIssues.length > 0) {
      review.push(record);
      summary.review += 1;
      summary.bySubject[subject].review += 1;
      continue;
    }

    if (imagePath) summary.asset.acceptedImageQuestions += 1;
    accepted.push(record);
    summary.accepted += 1;
    summary.bySubject[subject].accepted += 1;
  }

  const acceptedBySubject = {};
  for (const item of accepted) {
    const subjectKey = item.subject;
    const topicKey = item.topic || '(no-topic)';
    acceptedBySubject[subjectKey] ||= {};
    acceptedBySubject[subjectKey][topicKey] ||= [];
    acceptedBySubject[subjectKey][topicKey].push(item.sanitizedQuestion);
  }

  const stamp = timestamp();
  const summaryPath = path.join(
    REPORTS_DIR,
    `question_bank_vetting_summary_${stamp}.json`
  );
  const reviewPath = path.join(
    REPORTS_DIR,
    `question_bank_vetting_review_${stamp}.json`
  );
  const rejectedPath = path.join(
    REPORTS_DIR,
    `question_bank_vetting_rejected_${stamp}.json`
  );
  const acceptedPath = path.join(
    REPORTS_DIR,
    `question_bank_vetting_accepted_${stamp}.json`
  );
  const acceptedGroupedPath = path.join(
    REPORTS_DIR,
    `question_bank_vetting_accepted_by_subject_${stamp}.json`
  );

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  fs.writeFileSync(reviewPath, JSON.stringify(review, null, 2));
  fs.writeFileSync(rejectedPath, JSON.stringify(rejected, null, 2));
  fs.writeFileSync(acceptedPath, JSON.stringify(accepted, null, 2));
  fs.writeFileSync(
    acceptedGroupedPath,
    JSON.stringify(acceptedBySubject, null, 2)
  );

  console.log('Question bank vetting complete.');
  console.log('Summary:', summaryPath);
  console.log('Accepted:', acceptedPath);
  console.log('Review:', reviewPath);
  console.log('Rejected:', rejectedPath);
  console.log('Accepted by subject:', acceptedGroupedPath);
  console.log('Counts:', {
    total: summary.total,
    accepted: summary.accepted,
    review: summary.review,
    rejected: summary.rejected,
  });
  console.log('Asset summary:', summary.asset);

  await pool.end();
}

run().catch(async (error) => {
  console.error('FATAL:', error && error.stack ? error.stack : error);
  try {
    await pool.end();
  } catch {}
  process.exit(1);
});
