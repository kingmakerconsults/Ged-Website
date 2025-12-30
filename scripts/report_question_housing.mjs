import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(import.meta.url);

function readJson(absPath) {
  return JSON.parse(fs.readFileSync(absPath, 'utf8'));
}

function isObj(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function extractQuestionsFromSubjectShape(subjectShape) {
  const questions = [];
  // Some quiz sources are raw arrays of questions (e.g., Social Studies extras).
  if (Array.isArray(subjectShape)) {
    for (const q of subjectShape) {
      if (q && typeof q === 'object') questions.push(q);
    }
    return questions;
  }
  if (!isObj(subjectShape)) return questions;

  const pushQ = (q) => {
    if (q && typeof q === 'object') questions.push(q);
  };

  // subject-level quizzes
  if (Array.isArray(subjectShape.quizzes)) {
    for (const quiz of subjectShape.quizzes) {
      if (Array.isArray(quiz?.questions)) quiz.questions.forEach(pushQ);
    }
  }

  const cats = subjectShape.categories || {};
  for (const cat of Object.values(cats)) {
    if (!isObj(cat)) continue;
    if (Array.isArray(cat.quizzes)) {
      for (const quiz of cat.quizzes) {
        if (Array.isArray(quiz?.questions)) quiz.questions.forEach(pushQ);
      }
    }
    const topics = Array.isArray(cat.topics) ? cat.topics : [];
    for (const topic of topics) {
      if (!isObj(topic)) continue;
      if (Array.isArray(topic.quizzes)) {
        for (const quiz of topic.quizzes) {
          if (Array.isArray(quiz?.questions)) quiz.questions.forEach(pushQ);
        }
      }
      if (Array.isArray(topic.questions)) topic.questions.forEach(pushQ);
    }
  }

  return questions;
}

function questionHasImage(q) {
  if (!q || typeof q !== 'object') return false;
  const direct = [q.image, q.imageUrl, q.imageURL, q.img, q.imgUrl, q.diagram];
  if (direct.some((v) => typeof v === 'string' && v.trim())) return true;
  if (q.type === 'image') return true;
  const stim = q.stimulus;
  if (stim && typeof stim === 'object') {
    const s = [stim.image, stim.imageUrl, stim.imageURL, stim.img, stim.imgUrl];
    if (s.some((v) => typeof v === 'string' && v.trim())) return true;
  }
  const htmlFields = [q.questionText, q.question, q.passage, q.prompt];
  for (const f of htmlFields) {
    if (typeof f === 'string' && /<img\b/i.test(f)) return true;
  }
  return false;
}

function summarizeQuestions(label, questions) {
  const total = questions.length;
  const withImages = questions.reduce(
    (n, q) => n + (questionHasImage(q) ? 1 : 0),
    0
  );
  return { label, totalQuestions: total, imageQuestions: withImages };
}

function main() {
  const backendAll = requireCJS(
    path.join(root, 'backend', 'data', 'quizzes', 'index.js')
  ).ALL_QUIZZES;

  const publicDir = path.join(root, 'public', 'quizzes');
  const publicFiles = [
    'math.quizzes.part1.json',
    'math.quizzes.part2.json',
    'rla.quizzes.part1.json',
    'rla.quizzes.part2.json',
    'science.quizzes.part1.json',
    'science.quizzes.part2.json',
    'social-studies.quizzes.part1.json',
    'social-studies.quizzes.part2.json',
    'social-studies.extras.json',
    'workforce.quizzes.json',
  ];

  const publicBySubject = new Map();
  for (const f of publicFiles) {
    const abs = path.join(publicDir, f);
    if (!fs.existsSync(abs)) continue;
    const obj = readJson(abs);
    const subj = obj?.subject || f;
    if (!publicBySubject.has(subj)) publicBySubject.set(subj, []);
    publicBySubject.get(subj).push(obj);
  }

  const summaries = [];

  // Backend (canonical)
  for (const [subjectName, subjectShape] of Object.entries(backendAll || {})) {
    const qs = extractQuestionsFromSubjectShape(subjectShape);
    summaries.push(
      summarizeQuestions(`backend ALL_QUIZZES :: ${subjectName}`, qs)
    );
  }

  // Public snapshot
  for (const [subjectName, parts] of publicBySubject.entries()) {
    const qs = parts.flatMap(extractQuestionsFromSubjectShape);
    summaries.push(
      summarizeQuestions(`public/quizzes snapshot :: ${subjectName}`, qs)
    );
  }

  // Print
  console.log('[Question Housing Report]');
  const sorted = summaries.sort((a, b) => a.label.localeCompare(b.label));
  for (const s of sorted) {
    console.log(`- ${s.label}`);
    console.log(`  totalQuestions: ${s.totalQuestions}`);
    console.log(`  imageQuestions: ${s.imageQuestions}`);
  }
}

main();
