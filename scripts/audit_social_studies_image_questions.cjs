#!/usr/bin/env node
/**
 * Audit Social Studies image-based questions in backend/data/quizzes/social-studies.
 * Produces a report of image questions and flags likely low-quality prompts.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'backend', 'data', 'quizzes', 'social-studies');

const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.js'));

const lowQualityPatterns = [
  /which term or label appears/i,
  /which pair of labels both appears/i,
  /which year appears/i,
  /image text\/labels/i,
  /not shown in the visual/i,
];

const report = [];

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let data;
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    data = require(filePath);
  } catch (err) {
    console.warn(`Skipping ${file}: ${err.message}`);
    continue;
  }
  if (!Array.isArray(data)) continue;

  data.forEach((q) => {
    const imageUrl = q?.imageUrl || q?.imageURL || q?.content?.imageURL || null;
    if (!imageUrl) return;

    const questionText = q?.content?.questionText || q?.questionText || '';
    const passage = q?.content?.passage || '';
    const answerOptions = Array.isArray(q?.answerOptions)
      ? q.answerOptions
      : [];
    const isLowQuality =
      !questionText ||
      lowQualityPatterns.some((rx) => rx.test(questionText)) ||
      answerOptions.some((opt) =>
        lowQualityPatterns.some((rx) => rx.test(opt?.rationale || ''))
      );

    report.push({
      file,
      questionNumber: q?.questionNumber || null,
      imageUrl,
      questionText,
      passagePreview: passage.substring(0, 220),
      isLowQuality,
    });
  });
}

const lowQuality = report.filter((r) => r.isLowQuality);

console.log(`Total image questions: ${report.length}`);
console.log(`Flagged low-quality: ${lowQuality.length}`);

lowQuality.forEach((q, idx) => {
  console.log(`\n${idx + 1}. ${q.file} #${q.questionNumber}`);
  console.log(`   Q: ${q.questionText}`);
  console.log(`   Image: ${q.imageUrl}`);
});

const outPath = path.join(root, 'social-studies-image-questions-audit.json');
fs.writeFileSync(outPath, JSON.stringify({ report, lowQuality }, null, 2));
console.log(`\nSaved report to ${outPath}`);
