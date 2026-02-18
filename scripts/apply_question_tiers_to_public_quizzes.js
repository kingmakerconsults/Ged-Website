import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  tierFromQuizId,
  toLearnerFacingTier,
} from '../frontend/src/config/gedTaxonomy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeQuestionTier(raw) {
  const t = String(raw || '')
    .trim()
    .toLowerCase();
  if (!t) return null;
  if (t === 'foundation' || t === 'test-ready' || t === 'challenge') return t;
  if (t === 'foundations' || t === 'core') return 'foundation';
  return null;
}

function estimateTierFromQuestion(question) {
  const explicitDifficulty = String(question?.difficulty || '')
    .trim()
    .toLowerCase();
  if (explicitDifficulty === 'hard') return 'challenge';
  if (explicitDifficulty === 'medium') return 'test-ready';
  if (explicitDifficulty === 'easy') return 'foundation';

  const text = `${
    question?.question ||
    question?.prompt ||
    question?.stem ||
    question?.content?.questionText ||
    ''
  } ${question?.passage || question?.content?.passage || ''}`
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  const cues = [
    /\bcompare\b|\bcontrast\b|\banalyze\b|\bevaluate\b|\binfer\b|\bjustify\b/,
    /\bmost likely\b|\bbest supports\b|\bbased on\b|\baccording to\b/,
    /\bsystem\b|\bquadratic\b|\bfunction\b|\bprobability\b|\bmodel\b/,
    /\bafter\b.+\bthen\b|\bfirst\b.+\bthen\b|\bmulti[-\s]?step\b/,
  ].filter((pattern) => pattern.test(text)).length;

  if (cues >= 3) return 'challenge';
  if (cues >= 1) return 'test-ready';
  return 'foundation';
}

function targetQuestionTier(question, learnerTier) {
  const estimated = estimateTierFromQuestion(question);
  if (learnerTier === 'challenge') {
    if (estimated === 'foundation') return 'test-ready';
    return estimated;
  }
  if (learnerTier === 'test-ready') {
    if (estimated === 'challenge') return 'test-ready';
    return estimated;
  }
  return 'foundation';
}

function learnerTierFromTopic(topicTier, fallbackId = '') {
  const fromTopic = toLearnerFacingTier(topicTier);
  if (fromTopic) return fromTopic;
  const inferred = tierFromQuizId(fallbackId || '');
  return toLearnerFacingTier(inferred) || 'foundation';
}

function ensureQuestionTiersInDataset(data, fileName) {
  const rebalanceMode =
    String(process.env.REBALANCE_QUESTION_TIERS || '').trim() === '1';
  let updates = 0;
  let totalQuestions = 0;

  if (!data || typeof data !== 'object') {
    return { updates, totalQuestions };
  }

  const categories = data?.categories;
  if (!categories || typeof categories !== 'object') {
    if (Array.isArray(data?.questions)) {
      const learnerTier = learnerTierFromTopic(
        data?.tier,
        data?.quizId || data?.id || fileName
      );
      for (const q of data.questions) {
        totalQuestions += 1;
        const current = normalizeQuestionTier(
          q?.tier ?? q?.questionTier ?? q?.level
        );
        const target = targetQuestionTier(q, learnerTier);
        if (!current || rebalanceMode) {
          if (current === target) continue;
          q.tier = target;
          updates += 1;
        }
      }
    }
    return { updates, totalQuestions };
  }

  for (const category of Object.values(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    for (const topic of topics) {
      const topicId = topic?.id || null;
      const topicTier = topic?.tier || null;

      const quizzes = Array.isArray(topic?.quizzes) ? topic.quizzes : [];
      if (quizzes.length === 0 && Array.isArray(topic?.questions)) {
        const learnerTier = learnerTierFromTopic(
          topicTier,
          topicId || fileName
        );
        for (const q of topic.questions) {
          totalQuestions += 1;
          const current = normalizeQuestionTier(
            q?.tier ?? q?.questionTier ?? q?.level
          );
          const target = targetQuestionTier(q, learnerTier);
          if (!current || rebalanceMode) {
            if (current === target) continue;
            q.tier = target;
            updates += 1;
          }
        }
        continue;
      }

      for (const quiz of quizzes) {
        const quizId = quiz?.quizId || quiz?.id || topicId || fileName;
        const quizTier = quiz?.tier || topicTier;
        const learnerTier = learnerTierFromTopic(quizTier, quizId);

        const questions = Array.isArray(quiz?.questions) ? quiz.questions : [];
        for (const q of questions) {
          totalQuestions += 1;
          const current = normalizeQuestionTier(
            q?.tier ?? q?.questionTier ?? q?.level
          );
          const target = targetQuestionTier(q, learnerTier);
          if (!current || rebalanceMode) {
            if (current === target) continue;
            q.tier = target;
            updates += 1;
          }
        }
      }
    }
  }

  return { updates, totalQuestions };
}

function main() {
  const publicDir = path.join(root, 'public', 'quizzes');
  const files = fs
    .readdirSync(publicDir)
    .filter((name) => name.endsWith('.json'))
    .filter((name) => !name.includes('.bak'))
    .filter((name) => !name.includes('.utf8'));

  const details = [];
  let totalUpdated = 0;
  let totalQuestions = 0;
  let filesUpdated = 0;

  for (const name of files) {
    const abs = path.join(publicDir, name);
    const data = readJson(abs);

    const before = JSON.stringify(data);
    const { updates, totalQuestions: qCount } = ensureQuestionTiersInDataset(
      data,
      name
    );

    totalUpdated += updates;
    totalQuestions += qCount;

    const after = JSON.stringify(data);
    if (after !== before) {
      fs.writeFileSync(abs, after, 'utf8');
      filesUpdated += 1;
    }

    details.push({
      file: path.join('public', 'quizzes', name),
      updates,
      totalQuestions: qCount,
    });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    filesScanned: files.length,
    filesUpdated,
    totalQuestions,
    totalUpdated,
    details,
  };

  const reportsDir = path.join(root, 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const outPath = path.join(
    reportsDir,
    `question_tier_apply_${Date.now()}.json`
  );
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`Scanned files: ${files.length}`);
  console.log(`Updated files: ${filesUpdated}`);
  console.log(`Questions scanned: ${totalQuestions}`);
  console.log(`Question tiers added: ${totalUpdated}`);
  console.log(
    `Rebalance mode: ${String(process.env.REBALANCE_QUESTION_TIERS || '').trim() === '1' ? 'ON' : 'OFF'}`
  );
  console.log(`Saved report: ${path.relative(root, outPath)}`);
}

main();
