const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function findLatestAuditReport() {
  const reportsDir = path.join(ROOT, 'reports');
  const candidates = fs
    .readdirSync(reportsDir)
    .filter((name) => /^tier_progression_audit_\d+\.json$/i.test(name))
    .map((name) => ({
      name,
      abs: path.join(reportsDir, name),
      ts: Number(name.match(/(\d+)\.json$/)?.[1] || 0),
    }))
    .sort((a, b) => b.ts - a.ts);

  if (!candidates.length) {
    throw new Error('No tier progression audit reports found');
  }

  return candidates[0].abs;
}

function flattenQuestionsWithTopic(dataset) {
  const out = [];

  const pushQuestions = (arr, topicId) => {
    if (!Array.isArray(arr)) return;
    for (const q of arr) {
      out.push({ topicId: topicId || null, question: q });
    }
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
        const topicId = topic?.id || null;
        const quizzes = Array.isArray(topic?.quizzes) ? topic.quizzes : [];
        if (quizzes.length === 0) {
          pushQuestions(topic?.questions, topicId);
          continue;
        }
        for (const quiz of quizzes) {
          pushQuestions(quiz?.questions, topicId);
        }
      }
      return out;
    }

    pushQuestions(dataset, null);
    return out;
  }

  const categories = dataset?.categories;
  if (!categories || typeof categories !== 'object') {
    pushQuestions(dataset?.questions, dataset?.id || null);
    return out;
  }

  for (const category of Object.values(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    for (const topic of topics) {
      const topicId = topic?.id || null;
      const quizzes = Array.isArray(topic?.quizzes) ? topic.quizzes : [];
      if (quizzes.length === 0) {
        pushQuestions(topic?.questions, topicId);
        continue;
      }
      for (const quiz of quizzes) {
        pushQuestions(quiz?.questions, topicId);
      }
    }
  }

  return out;
}

function main() {
  const auditPath = process.argv[2]
    ? path.isAbsolute(process.argv[2])
      ? process.argv[2]
      : path.join(ROOT, process.argv[2])
    : findLatestAuditReport();

  const audit = readJson(auditPath);
  const result = {
    generatedAt: new Date().toISOString(),
    sourceAudit: path.relative(ROOT, auditPath),
    files: [],
  };

  for (const fileReport of audit.fileReports || []) {
    const warningIndices = new Set(
      (fileReport.warnings || []).map((w) => Number(w.index))
    );
    if (warningIndices.size === 0) {
      continue;
    }

    const filePath = path.join(ROOT, fileReport.file);
    const data = readJson(filePath);
    const flat = flattenQuestionsWithTopic(data);

    const topicCounts = {};
    for (const index of warningIndices) {
      const entry = flat[index];
      const topicId = entry?.topicId || 'UNKNOWN_TOPIC';
      topicCounts[topicId] = (topicCounts[topicId] || 0) + 1;
    }

    const sortedTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([topicId, count]) => ({ topicId, count }));

    result.files.push({
      file: fileReport.file,
      warningCount: warningIndices.size,
      topTopics: sortedTopics,
    });
  }

  const outPath = path.join(
    ROOT,
    'reports',
    `warning_topic_map_${Date.now()}.json`
  );
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');

  console.log(`Source audit: ${path.relative(ROOT, auditPath)}`);
  console.log(`Saved topic map: ${path.relative(ROOT, outPath)}`);
  for (const f of result.files) {
    const first = f.topTopics[0];
    console.log(
      `- ${f.file} warnings=${f.warningCount} top=${first ? `${first.topicId}:${first.count}` : 'none'}`
    );
  }
}

main();
