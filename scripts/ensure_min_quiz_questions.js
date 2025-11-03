// Enforce a minimum number of questions per quiz in public/quizzes JSON bundles.
// - Scans subject JSONs under public/quizzes (e.g., math.quizzes.part1.json)
// - For each quiz, ensures questions.length >= MIN_QUESTIONS (default 12)
// - Auto-generates neutral, subject-aware placeholder questions when short
// - Writes updated files and a summary report under reports/
//
// Usage:
//   node scripts/ensure_min_quiz_questions.js             # run with defaults (12)
//   MIN_QUESTIONS=15 node scripts/ensure_min_quiz_questions.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const quizzesDir = path.join(root, 'public', 'quizzes');
const reportsDir = path.join(root, 'reports');
const MIN_QUESTIONS = Math.max(2, parseInt(process.env.MIN_QUESTIONS || '12', 10) || 12);

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function safeRead(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return null; } }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2), 'utf8'); }

function detectSubjectFromFilename(file) {
  const f = file.toLowerCase();
  if (f.startsWith('math.')) return 'Math';
  if (f.startsWith('science.')) return 'Science';
  if (f.startsWith('rla.') || f.startsWith('language-arts.')) return 'Reasoning Through Language Arts (RLA)';
  if (f.startsWith('social-studies.')) return 'Social Studies';
  if (f.startsWith('simulations.')) return 'Simulations';
  return null;
}

function generateChoiceLabels() { return ['A', 'B', 'C', 'D']; }

function subjectAwareStem(subject, topicTitle, index) {
  const n = index; // starts at 1
  const t = topicTitle || 'this topic';
  switch (subject) {
    case 'Math':
      return `Which option best answers this practice item for ${t}?`;
    case 'Science':
      return `Based on basic scientific reasoning about ${t}, which option is most appropriate?`;
    case 'Social Studies':
      return `Considering general social studies knowledge related to ${t}, which option fits best?`;
    case 'Reasoning Through Language Arts (RLA)':
      return `Which option best reflects standard reading comprehension about ${t}?`;
    default:
      return `Choose the best answer for this practice item about ${t}.`;
  }
}

function subjectAwareRationale(subject, isCorrect) {
  if (isCorrect) {
    switch (subject) {
      case 'Math': return 'Correct. This choice aligns with the intended computation or reasoning.';
      case 'Science': return 'Correct. This reflects the most reasonable scientific inference.';
      case 'Social Studies': return 'Correct. This best matches standard civics/history fundamentals.';
      case 'Reasoning Through Language Arts (RLA)': return 'Correct. This choice best fits the intended reading comprehension.';
      default: return 'Correct. This option best satisfies the question.';
    }
  } else {
    switch (subject) {
      case 'Math': return 'Not the best choice. Review the intended arithmetic or reasoning.';
      case 'Science': return 'Not the best choice. It does not align with basic scientific reasoning.';
      case 'Social Studies': return 'Not the best choice. It does not reflect core civics/history principles.';
      case 'Reasoning Through Language Arts (RLA)': return 'Not the best choice. It does not support the intended reading comprehension.';
      default: return 'Not the best choice for this question.';
    }
  }
}

function makeAutogenQuestion(subject, topicTitle, questionNumber, seed) {
  const choices = generateChoiceLabels();
  const correctIndex = seed % choices.length; // pseudo-random but stable per call
  return {
    questionNumber,
    question: `${subjectAwareStem(subject, topicTitle, questionNumber)}`,
    answerOptions: choices.map((lbl, idx) => ({
      text: `${lbl}. ${subject} practice placeholder`,
      isCorrect: idx === correctIndex,
      rationale: subjectAwareRationale(subject, idx === correctIndex),
    })),
    explanation: 'Practice placeholder. Replace with a vetted item when available.',
    __autogen: true,
  };
}

function collectQuizzesFromSubjectPayload(payload) {
  // returns array of { categoryName, topic, quiz }
  const out = [];
  if (!payload || typeof payload !== 'object') return out;
  const cats = payload.categories || {};
  for (const [catName, cat] of Object.entries(cats)) {
    const topics = Array.isArray(cat?.topics) ? cat.topics : [];
    for (const topic of topics) {
      const quizzes = Array.isArray(topic?.quizzes) ? topic.quizzes : [];
      for (const quiz of quizzes) {
        out.push({ categoryName: catName, topic, quiz });
      }
    }
  }
  return out;
}

function enforceMinOnFile(absPath, fileName, report) {
  const raw = safeRead(absPath);
  if (!raw) { report.skipped.push({ file: fileName, reason: 'cannot read' }); return; }
  let json;
  try { json = JSON.parse(raw); } catch (e) { report.skipped.push({ file: fileName, reason: 'invalid json' }); return; }

  // Only operate on subject payloads that have {subject, categories}
  if (!json || typeof json !== 'object' || !json.subject || !json.categories) {
    report.skipped.push({ file: fileName, reason: 'not a subject payload' });
    return;
  }
  const subject = json.subject;
  const subjectFromName = detectSubjectFromFilename(fileName) || subject;

  let touchedQuizzes = 0;
  let addedQuestions = 0;

  const all = collectQuizzesFromSubjectPayload(json);
  for (const { topic, quiz } of all) {
    const topicTitle = topic?.title || topic?.id || 'Topic';
    const arr = Array.isArray(quiz.questions) ? quiz.questions : [];
    const present = arr.length;
    if (present >= MIN_QUESTIONS) continue;
    const need = MIN_QUESTIONS - present;

    // Normalize questionNumber for existing questions (1..n)
    for (let i = 0; i < arr.length; i++) {
      const q = arr[i];
      if (q && typeof q === 'object' && typeof q.questionNumber !== 'number') {
        q.questionNumber = i + 1;
      } else if (q && typeof q === 'object') {
        q.questionNumber = i + 1;
      }
    }

    // Append generated placeholders
    for (let i = 0; i < need; i++) {
      const qNum = present + i + 1;
      const q = makeAutogenQuestion(subjectFromName, topicTitle, qNum, (qNum * 9301 + 49297) % 233280);
      arr.push(q);
    }
    quiz.questions = arr;
    touchedQuizzes += 1;
    addedQuestions += need;
  }

  if (touchedQuizzes > 0) {
    writeJson(absPath, json);
    report.updated.push({ file: fileName, subject: subjectFromName, quizzesTouched: touchedQuizzes, questionsAdded: addedQuestions });
  } else {
    report.unchanged.push({ file: fileName, subject: subjectFromName });
  }
}

function main() {
  ensureDir(reportsDir);
  if (!fs.existsSync(quizzesDir)) {
    console.error(`[ERROR] public/quizzes not found at ${quizzesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(quizzesDir).filter(f => f.endsWith('.json'));
  const targetFiles = files.filter(f => /^(math|science|rla|social-studies|simulations)\.quizzes(\.part\d+)?\.json$/i.test(f));

  const report = { min: MIN_QUESTIONS, updated: [], unchanged: [], skipped: [], timestamp: new Date().toISOString() };
  for (const f of targetFiles) {
    const abs = path.join(quizzesDir, f);
    enforceMinOnFile(abs, f, report);
  }

  const outPath = path.join(reportsDir, `quiz_min_questions_summary_${Date.now()}.json`);
  writeJson(outPath, report);
  console.log(`[REPORT] ${outPath}`);
  console.log(`[SUMMARY] min=${MIN_QUESTIONS} updated=${report.updated.length} unchanged=${report.unchanged.length} skipped=${report.skipped.length}`);

  // Non-blocking: exit 0 regardless; the goal is augmentation
}

main();
