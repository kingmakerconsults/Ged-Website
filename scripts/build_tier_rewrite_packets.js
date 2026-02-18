import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function findLatestReport(prefix) {
  const reportsDir = path.join(root, 'reports');
  const files = fs
    .readdirSync(reportsDir)
    .filter((name) => name.startsWith(prefix) && name.endsWith('.json'))
    .map((name) => ({
      name,
      abs: path.join(reportsDir, name),
      ts: Number(name.match(/(\d+)\.json$/)?.[1] || 0),
    }))
    .sort((a, b) => b.ts - a.ts);

  if (!files.length) {
    throw new Error(`No report files found for prefix: ${prefix}`);
  }

  return files[0].abs;
}

function normalizeTier(raw) {
  const t = String(raw || '')
    .trim()
    .toLowerCase();
  if (!t) return 'foundation';
  if (t === 'test-ready' || t === 'challenge') return t;
  return 'foundation';
}

function getQuestionText(q) {
  return q?.question || q?.prompt || q?.stem || q?.content?.questionText || '';
}

function getPassageText(q) {
  return q?.passage || q?.content?.passage || '';
}

function extractQuestionsFromDataset(dataset, sourceFile) {
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
      __topicTier: normalizeTier(topicTier || q?.tier),
    });
  };

  const processQuestionArray = (arr, ctx) => {
    if (!Array.isArray(arr)) return;
    for (const q of arr) pushQuestion({ q, ...ctx });
  };

  if (Array.isArray(dataset)) {
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
    processQuestionArray(dataset?.questions, {
      subject,
      categoryName: dataset?.categoryName || null,
      topicId: dataset?.id || null,
      topicTitle: dataset?.title || null,
      quizId: dataset?.quizId || dataset?.id || null,
      topicTier: dataset?.tier || null,
    });
    return output;
  }

  for (const [categoryName, category] of Object.entries(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    for (const topic of topics) {
      const topicId = topic?.id || null;
      const topicTitle = topic?.title || null;
      const topicTier = topic?.tier || null;

      const quizzes = Array.isArray(topic?.quizzes) ? topic.quizzes : [];
      if (quizzes.length === 0 && Array.isArray(topic?.questions)) {
        processQuestionArray(topic?.questions, {
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
        processQuestionArray(quiz?.questions, {
          subject,
          categoryName,
          topicId,
          topicTitle,
          quizId: quiz?.quizId || quiz?.id || topicId || null,
          topicTier: quiz?.tier || topicTier,
        });
      }
    }
  }

  return output;
}

function mapQuestionsByFile() {
  const publicDir = path.join(root, 'public', 'quizzes');
  const files = fs
    .readdirSync(publicDir)
    .filter((name) => name.endsWith('.json'))
    .filter((name) => !name.includes('.bak'))
    .filter((name) => !name.includes('.utf8'));

  const map = new Map();

  for (const name of files) {
    const abs = path.join(publicDir, name);
    const rel = path.join('public', 'quizzes', name).replace(/\\/g, '\\');
    const data = readJson(abs);
    const flattened = extractQuestionsFromDataset(data, rel);
    map.set(rel.replace(/\\/g, '\\'), flattened);
  }

  return map;
}

function recommendationByTier(tier, subject) {
  if (tier === 'challenge') {
    return `${subject}: increase multi-step reasoning, stronger distractors, and mixed-skill synthesis.`;
  }
  if (tier === 'test-ready') {
    return `${subject}: align to GED-style scenario reasoning and moderate time-pressure complexity.`;
  }
  return `${subject}: keep direct fundamentals, remove filler, and ensure one clear skill target.`;
}

function toMarkdown(packet, srcReportName) {
  const lines = [];
  lines.push('# Tier Rewrite Packets');
  lines.push('');
  lines.push(`- Generated: ${packet.generatedAt}`);
  lines.push(`- Source remediation queue: ${srcReportName}`);
  lines.push('');

  for (const section of packet.sections) {
    lines.push(`## ${section.subject} — ${section.file}`);
    lines.push(`- Priority score: ${section.weightedScore}`);
    lines.push(`- Complexity flags: ${section.complexityFlags}`);
    lines.push('');

    section.samples.forEach((sample, idx) => {
      lines.push(`### Sample ${idx + 1}`);
      lines.push(`- Tier: ${sample.tier}`);
      lines.push(`- Quiz: ${sample.quizId || 'unknown'}`);
      lines.push(`- Topic: ${sample.topicTitle || 'unknown'}`);
      lines.push(`- Recommendation: ${sample.recommendation}`);
      lines.push(`- Question: ${sample.question}`);
      if (sample.passage) {
        lines.push(`- Passage: ${sample.passage}`);
      }
      lines.push('');
    });
  }

  return lines.join('\n');
}

function main() {
  const queuePath = findLatestReport('tier_remediation_queue_');
  const queue = readJson(queuePath);
  const questionsByFile = mapQuestionsByFile();

  const targets = (queue?.deepRewrite || []).slice(0, 8);
  const sections = [];

  for (const target of targets) {
    const file = String(target?.file || '').replace(/\\/g, '\\');
    const allQuestions = questionsByFile.get(file) || [];

    const candidateQuestions = allQuestions
      .filter(
        (q) =>
          normalizeTier(q?.tier || q?.__topicTier) !== 'foundation' ||
          q?.difficulty === 'hard'
      )
      .slice(0, 12);

    const samples = candidateQuestions.slice(0, 6).map((q) => {
      const tier = normalizeTier(q?.tier || q?.__topicTier);
      return {
        tier,
        quizId: q?.__quizId || null,
        topicTitle: q?.__topicTitle || null,
        question: getQuestionText(q),
        passage: getPassageText(q),
        recommendation: recommendationByTier(tier, q?.__subject || 'Subject'),
      };
    });

    sections.push({
      subject: target?.subject || 'Unknown',
      file,
      weightedScore: target?.weightedScore || 0,
      complexityFlags: target?.complexityFlags || 0,
      samples,
    });
  }

  const packet = {
    generatedAt: new Date().toISOString(),
    sourceQueue: path.basename(queuePath),
    sections,
  };

  const outDir = path.join(root, 'reports');
  fs.mkdirSync(outDir, { recursive: true });
  const ts = Date.now();
  const jsonPath = path.join(outDir, `tier_rewrite_packets_${ts}.json`);
  const mdPath = path.join(outDir, `tier_rewrite_packets_${ts}.md`);

  fs.writeFileSync(jsonPath, JSON.stringify(packet, null, 2), 'utf8');
  fs.writeFileSync(
    mdPath,
    toMarkdown(packet, path.basename(queuePath)),
    'utf8'
  );

  console.log(`Source queue: ${path.relative(root, queuePath)}`);
  console.log(`Saved packet JSON: ${path.relative(root, jsonPath)}`);
  console.log(`Saved packet MD: ${path.relative(root, mdPath)}`);
}

main();
