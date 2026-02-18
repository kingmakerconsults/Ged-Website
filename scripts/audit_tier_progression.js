import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildTierReviewReport } from '../utils/quizValidator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function normalizeTopicTier(raw) {
  const tier = String(raw || '')
    .trim()
    .toLowerCase();
  if (!tier) return null;
  if (tier === 'foundation') return 'foundations';
  if (['foundations', 'core', 'test-ready', 'challenge'].includes(tier)) {
    return tier;
  }
  return null;
}

function toLearnerTier(rawTopicTier) {
  const t = normalizeTopicTier(rawTopicTier);
  if (!t) return 'unknown';
  if (t === 'test-ready' || t === 'challenge') return t;
  return 'foundation';
}

function buildTopicTierLookup() {
  const supplementalPath = path.join(
    root,
    'backend',
    'data',
    'quizzes',
    'supplemental.topics.json'
  );
  if (!fs.existsSync(supplementalPath)) {
    return { byTopicId: new Map(), byFileName: new Map() };
  }

  const entries = readJson(supplementalPath);
  const byTopicId = new Map();
  const byFileName = new Map();

  for (const entry of entries) {
    const tier = entry?.topic?.tier;
    const id = entry?.topic?.id;
    const file = entry?.topic?.file;
    if (id && tier) byTopicId.set(String(id), String(tier));
    if (file && tier) byFileName.set(path.basename(String(file)), String(tier));
  }

  return { byTopicId, byFileName };
}

function extractQuestionsFromDataset(dataset, sourceFile, lookups) {
  const output = [];

  const pushQuestion = ({
    q,
    subject,
    categoryName,
    topicId,
    topicTitle,
    quizId,
    topicTier,
  }) => {
    output.push({
      ...q,
      __sourceFile: sourceFile,
      __subject: subject || 'Unknown',
      __category: categoryName || null,
      __topicId: topicId || null,
      __topicTitle: topicTitle || null,
      __quizId: quizId || null,
      __topicTier: topicTier || null,
    });
  };

  const inferTopicTier = ({ topicTier, quizTier, topicId, fileHint }) => {
    if (topicTier) return topicTier;
    if (quizTier) return quizTier;
    if (topicId && lookups.byTopicId.has(topicId))
      return lookups.byTopicId.get(topicId);
    if (fileHint && lookups.byFileName.has(fileHint))
      return lookups.byFileName.get(fileHint);
    return null;
  };

  const processQuestionArray = (arr, ctx) => {
    if (!Array.isArray(arr)) return;
    for (const q of arr) pushQuestion({ q, ...ctx });
  };

  if (Array.isArray(dataset)) {
    const looksLikeTopicArray = dataset.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        (Array.isArray(item.questions) || Array.isArray(item.quizzes))
    );

    if (looksLikeTopicArray) {
      for (const topic of dataset) {
        const subject = topic?.subject || 'Unknown';
        const topicId = topic?.id || null;
        const topicTitle = topic?.title || topic?.topic || null;
        const topicTier = inferTopicTier({
          topicTier: topic?.tier,
          quizTier: null,
          topicId,
          fileHint: topic?.file ? path.basename(topic.file) : null,
        });

        const quizzes = Array.isArray(topic?.quizzes) ? topic.quizzes : [];
        if (quizzes.length === 0 && Array.isArray(topic?.questions)) {
          processQuestionArray(topic.questions, {
            subject,
            categoryName: topic?.topic || null,
            topicId,
            topicTitle,
            quizId: topic?.quizId || topicId,
            topicTier,
          });
          continue;
        }

        for (const quiz of quizzes) {
          processQuestionArray(quiz?.questions, {
            subject,
            categoryName: topic?.topic || null,
            topicId,
            topicTitle,
            quizId: quiz?.quizId || quiz?.id || topicId || null,
            topicTier: inferTopicTier({
              topicTier,
              quizTier: quiz?.tier,
              topicId,
              fileHint: topic?.file ? path.basename(topic.file) : null,
            }),
          });
        }
      }

      return output;
    }

    processQuestionArray(dataset, {
      subject: 'Unknown',
      categoryName: null,
      topicId: null,
      topicTitle: null,
      quizId: null,
      topicTier: null,
    });
    return output;
  }

  const subject = dataset?.subject || 'Unknown';
  const categories = dataset?.categories;

  if (!categories || typeof categories !== 'object') {
    if (Array.isArray(dataset?.questions)) {
      processQuestionArray(dataset.questions, {
        subject,
        categoryName: dataset?.categoryName || null,
        topicId: dataset?.id || null,
        topicTitle: dataset?.title || null,
        quizId: dataset?.quizId || dataset?.id || null,
        topicTier: inferTopicTier({
          topicTier: dataset?.tier,
          quizTier: dataset?.tier,
          topicId: dataset?.id,
          fileHint: dataset?.file ? path.basename(dataset.file) : null,
        }),
      });
    }
    return output;
  }

  for (const [categoryName, category] of Object.entries(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];

    for (const topic of topics) {
      const topicId = topic?.id || null;
      const topicTitle = topic?.title || null;
      const topicFileName = topic?.file ? path.basename(topic.file) : null;
      const topicTier = inferTopicTier({
        topicTier: topic?.tier,
        quizTier: null,
        topicId,
        fileHint: topicFileName,
      });

      const quizzes = Array.isArray(topic?.quizzes) ? topic.quizzes : [];
      if (quizzes.length === 0 && Array.isArray(topic?.questions)) {
        processQuestionArray(topic.questions, {
          subject,
          categoryName,
          topicId,
          topicTitle,
          quizId: topic?.quizId || topic?.id || null,
          topicTier,
        });
        continue;
      }

      for (const quiz of quizzes) {
        const quizId = quiz?.quizId || quiz?.id || topicId || null;
        const quizTier = inferTopicTier({
          topicTier,
          quizTier: quiz?.tier,
          topicId,
          fileHint: topicFileName,
        });

        processQuestionArray(quiz?.questions, {
          subject,
          categoryName,
          topicId,
          topicTitle,
          quizId,
          topicTier: quizTier,
        });
      }
    }
  }

  return output;
}

function main() {
  const publicDir = path.join(root, 'public', 'quizzes');
  const sourceFiles = fs
    .readdirSync(publicDir)
    .filter((name) => name.endsWith('.json'))
    .filter((name) => !name.includes('.bak'))
    .filter((name) => !name.includes('.utf8'))
    .map((name) => path.join(publicDir, name));

  const lookups = buildTopicTierLookup();
  const report = [];
  const rollup = {};

  for (const src of sourceFiles) {
    const data = readJson(src);
    const questions = extractQuestionsFromDataset(
      data,
      path.basename(src),
      lookups
    );

    const review = buildTierReviewReport(questions, {
      verbose: false,
      getTopicTier: (q) => q.__topicTier,
      requireQuestionTier: true,
    });

    review.warnings.forEach((warning) => {
      const q = questions[warning.index] || {};
      const subject = q.__subject || 'Unknown';
      const learnerTier = toLearnerTier(q.__topicTier);
      const key = `${subject}::${learnerTier}`;

      if (!rollup[key]) {
        rollup[key] = {
          subject,
          learnerTier,
          totalQuestions: 0,
          warnings: 0,
          structuralProblems: 0,
          warningReasons: {},
        };
      }
      rollup[key].warnings += 1;
      rollup[key].warningReasons[warning.reason] =
        (rollup[key].warningReasons[warning.reason] || 0) + 1;
    });

    questions.forEach((q) => {
      const subject = q.__subject || 'Unknown';
      const learnerTier = toLearnerTier(q.__topicTier);
      const key = `${subject}::${learnerTier}`;
      if (!rollup[key]) {
        rollup[key] = {
          subject,
          learnerTier,
          totalQuestions: 0,
          warnings: 0,
          structuralProblems: 0,
          warningReasons: {},
        };
      }
      rollup[key].totalQuestions += 1;
    });

    review.structuralProblems.forEach((problem) => {
      const q = questions[problem.index] || {};
      const subject = q.__subject || 'Unknown';
      const learnerTier = toLearnerTier(q.__topicTier);
      const key = `${subject}::${learnerTier}`;
      if (!rollup[key]) {
        rollup[key] = {
          subject,
          learnerTier,
          totalQuestions: 0,
          warnings: 0,
          structuralProblems: 0,
          warningReasons: {},
        };
      }
      rollup[key].structuralProblems += 1;
    });

    report.push({
      file: path.relative(root, src),
      questionCount: questions.length,
      summary: review.summary,
      warnings: review.warnings,
      structuralProblems: review.structuralProblems,
    });

    console.log(
      `[tier-audit] ${path.basename(src)} -> questions=${questions.length} structural=${review.summary.structuralProblemCount} warnings=${review.summary.warningCount}`
    );
  }

  const outBase = `tier_progression_audit_${Date.now()}`;
  const outDir = path.join(root, 'reports');
  fs.mkdirSync(outDir, { recursive: true });

  const output = {
    generatedAt: new Date().toISOString(),
    mode: 'report-only-manual-review',
    learnerFacingTiers: ['foundation', 'test-ready', 'challenge'],
    fileReports: report,
    rollup: Object.values(rollup).sort((a, b) => {
      const s = a.subject.localeCompare(b.subject);
      if (s !== 0) return s;
      return a.learnerTier.localeCompare(b.learnerTier);
    }),
  };

  const outJson = path.join(outDir, `${outBase}.json`);
  fs.writeFileSync(outJson, JSON.stringify(output, null, 2), 'utf8');

  console.log(`Saved report: ${path.relative(root, outJson)}`);
}

main();
