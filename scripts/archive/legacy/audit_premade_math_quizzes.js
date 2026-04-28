import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateQuizArray } from '../utils/quizValidator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function enumerateMathQuestions(dataset) {
  const items = [];
  const subject = dataset?.subject === 'Math' ? dataset : null;
  if (!subject) return items;
  const categories = dataset.categories || {};
  for (const cat of Object.values(categories)) {
    for (const topic of cat.topics || []) {
      for (const quiz of topic.quizzes || []) {
        for (const q of quiz.questions || []) {
          // Attach quizId for context in output
          items.push({
            ...q,
            __quizId: quiz.quizId || quiz.id || topic.id || 'unknown',
          });
        }
      }
    }
  }
  return items;
}

function main() {
  const sources = [
    path.join(root, 'public', 'quizzes', 'math.quizzes.part1.json'),
    path.join(root, 'public', 'quizzes', 'math.quizzes.part2.json'),
  ].filter(fs.existsSync);

  const report = [];
  for (const src of sources) {
    const data = readJson(src);
    const questions = enumerateMathQuestions(data);
    const problems = validateQuizArray(questions, { verbose: false });
    report.push({
      file: path.relative(root, src),
      total: questions.length,
      problems,
    });
    console.log(
      `[audit] ${path.basename(src)} -> questions=${
        questions.length
      } problems=${problems.length}`
    );
  }

  const outBase = `math_quiz_audit_${Date.now()}`;
  const outJson = path.join(root, 'reports', `${outBase}.json`);
  fs.writeFileSync(outJson, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Saved report: ${path.relative(root, outJson)}`);
}

main();
