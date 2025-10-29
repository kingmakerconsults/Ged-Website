// Validate per-topic quiz file shapes. ESM script.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const quizzesRoot = path.join(workspaceRoot, 'backend', 'data', 'quizzes');
const require = createRequire(import.meta.url);

function isSubjectDir(name) {
  return [
    'science',
    'scientific-numeracy',
    'math',
    'social-studies',
    'rla',
    'other',
  ].includes(name);
}

function validateQuestion(q, idx, file) {
  const errs = [];
  if (typeof q !== 'object' || q == null) {
    errs.push(`Item #${idx} is not an object`);
    return errs;
  }
  // Require answerOptions array of objects with text and isCorrect
  if (!Array.isArray(q.answerOptions) || q.answerOptions.length < 2) {
    errs.push(`Item #${idx} missing answerOptions (>=2 required)`);
  } else {
    q.answerOptions.forEach((opt, oi) => {
      if (typeof opt !== 'object' || opt == null) {
        errs.push(`Item #${idx} option #${oi} is not an object`);
        return;
      }
      if (typeof opt.text !== 'string' || !opt.text.trim()) {
        errs.push(`Item #${idx} option #${oi} missing non-empty text`);
      }
      if (typeof opt.isCorrect !== 'boolean') {
        errs.push(`Item #${idx} option #${oi} missing boolean isCorrect`);
      }
    });
  }
  return errs;
}

function main() {
  const subjects = fs
    .readdirSync(quizzesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && isSubjectDir(d.name));

  let errors = [];
  let checkedFiles = 0;

  for (const subj of subjects) {
    const subjDir = path.join(quizzesRoot, subj.name);
    for (const entry of fs.readdirSync(subjDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.js')) {
        const full = path.join(subjDir, entry.name);
        try {
          const arr = require(full);
          if (!Array.isArray(arr)) {
            errors.push(`${path.relative(workspaceRoot, full)} does not export an array`);
          } else {
            arr.forEach((q, i) => {
              const errs = validateQuestion(q, i, full);
              if (errs.length) {
                errors.push(`${path.relative(workspaceRoot, full)}: ${errs.join('; ')}`);
              }
            });
          }
          checkedFiles += 1;
        } catch (e) {
          errors.push(`${path.relative(workspaceRoot, full)} threw on require: ${e.message}`);
        }
      }
    }
  }

  if (errors.length) {
    console.error(`Quiz shape validation found ${errors.length} issue(s) across ${checkedFiles} file(s):`);
    errors.slice(0, 100).forEach((e) => console.error(' -', e));
    process.exitCode = 1;
  } else {
    console.log(`Quiz shape validation passed for ${checkedFiles} file(s).`);
  }
}

main();
