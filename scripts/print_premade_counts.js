// Prints the number of premade exams (quizzes) by subject, based on the expanded frontend bundle
// Definition of an exam for counting purposes matches frontend flattener intent:
// - Count each item in topic.quizzes (if present)
// - Count +1 when a topic has questions directly (topic.questions)
// - Count each item in category.quizzes (if present)
// - Count each item in subject.quizzes (if present)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function loadExpandedBundleObject() {
  const abs = path.join(root, 'frontend', 'Expanded', 'expanded.quizzes.bundle.js');
  const raw = fs.readFileSync(abs, 'utf8');
  const marker = 'window.ExpandedQuizData = ';
  const idx = raw.indexOf(marker);
  if (idx === -1) throw new Error('Could not find ExpandedQuizData marker');
  const jsonStart = raw.indexOf('{', idx);
  const jsonEnd = raw.lastIndexOf('}');
  const jsonStr = raw.slice(jsonStart, jsonEnd + 1);
  const data = JSON.parse(jsonStr);
  return data;
}

function countExamsBySubject(data) {
  const counts = {};
  for (const [subjectName, subject] of Object.entries(data || {})) {
    let count = 0;
    const categories = subject?.categories || {};
    for (const category of Object.values(categories)) {
      const topics = category?.topics || [];
      for (const topic of topics) {
        if (Array.isArray(topic?.quizzes)) {
          count += topic.quizzes.length;
        }
        if (Array.isArray(topic?.questions) && topic.questions.length) {
          count += 1; // treat topic with direct questions as one exam
        }
      }
      if (Array.isArray(category?.quizzes)) {
        count += category.quizzes.length;
      }
    }
    if (Array.isArray(subject?.quizzes)) {
      count += subject.quizzes.length;
    }
    counts[subjectName] = count;
  }
  return counts;
}

function main() {
  const data = loadExpandedBundleObject();
  const counts = countExamsBySubject(data);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log('[Premade exams by subject]');
  for (const [subject, n] of Object.entries(counts)) {
    console.log(`- ${subject}: ${n}`);
  }
  console.log(`Total: ${total}`);
}

try {
  main();
} catch (err) {
  console.error('Failed to compute counts:', err.message);
  process.exit(1);
}
