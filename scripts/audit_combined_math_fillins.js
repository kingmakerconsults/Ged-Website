// Quick audit for fill-in questions missing correctAnswer in combined_math_quizzes.js
// Heuristic: after a line with type: "fillIn", look ahead up to 25 lines for a `correctAnswer:` key.
// Reports quiz title, questionNumber and a small snippet when missing.

import fs from 'fs';
import path from 'path';

const file = path.resolve('frontend', 'Expanded', 'combined_math_quizzes.js');
const src = fs.readFileSync(file, 'utf8').split(/\r?\n/);

let currentQuizTitle = null;
let currentQuizId = null;
const missing = [];

for (let i = 0; i < src.length; i++) {
  const line = src[i];
  // Track quiz metadata
  const titleMatch = line.match(/title:\s*"([^"]+)"/);
  if (titleMatch) currentQuizTitle = titleMatch[1];
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  if (idMatch) currentQuizId = idMatch[1];

  if (line.includes('type: "fillIn"')) {
    let hasCorrect = false;
    let qNumber = null;
    for (let j = i; j < Math.min(i + 30, src.length); j++) {
      const l = src[j];
      if (l.includes('correctAnswer:')) { hasCorrect = true; break; }
      const qn = l.match(/questionNumber:\s*(\d+)/);
      if (qn) qNumber = Number(qn[1]);
      // Stop scanning if we hit the next question entry
      if (j !== i && l.includes('type:')) break;
    }
    if (!hasCorrect) {
      missing.push({
        quizId: currentQuizId,
        title: currentQuizTitle,
        questionNumber: qNumber,
        line: i + 1
      });
    }
  }
}

if (!missing.length) {
  console.log('PASS: All fill-in questions appear to have a correctAnswer.');
} else {
  console.log(`Found ${missing.length} fill-in question(s) without correctAnswer:`);
  for (const m of missing) {
    console.log(`- ${m.title || '(no title)'} [${m.quizId || 'unknown'}] Q${m.questionNumber || '?'} (near line ${m.line})`);
  }
  process.exitCode = 1;
}
