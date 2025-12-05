import fs from 'fs';

const data = JSON.parse(
  fs.readFileSync('backend/quizzes/math.quizzes.part1.json', 'utf8')
);

let unformatted = 0;
let formatted = 0;

for (const catKey in data.categories) {
  const topics = data.categories[catKey].topics;
  if (topics) {
    for (const t of topics) {
      if (t.quizzes) {
        for (const q of t.quizzes) {
          if (q.questions) {
            for (const qu of q.questions) {
              const fullText = JSON.stringify(qu);
              if (fullText.includes('^2') && !fullText.includes('^{2}')) {
                unformatted++;
                if (unformatted <= 3) console.log('UNFORMATTED:', qu.question);
              } else if (fullText.includes('^{2}')) {
                formatted++;
              }
            }
          }
        }
      }
    }
  }
}

console.log(`\nFormatted (^{2}): ${formatted}`);
console.log(`Unformatted (^2): ${unformatted}`);
