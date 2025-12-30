const fs = require('fs');
const path = require('path');

const files = [
  'public/quizzes/social-studies.extras.json',
  'public/quizzes/social-studies.quizzes.json',
  'public/quizzes/science.quizzes.part1.json',
];

function scan(obj, path = '') {
  if (!obj) return;

  if (typeof obj === 'string') {
    if (obj.match(/\.(png|jpg|jpeg|gif)/i) || obj.includes('Images/')) {
      console.log(`Found image ref in value at ${path}: ${obj}`);
    }
    return;
  }

  if (typeof obj === 'object') {
    for (const key in obj) {
      if (key.match(/image|graphic|stimulus/i)) {
        console.log(
          `Found potential image key at ${path}.${key}:`,
          JSON.stringify(obj[key]).substring(0, 100)
        );
      }
      scan(obj[key], `${path}.${key}`);
    }
  }
}

files.forEach((f) => {
  console.log(`Scanning ${f}...`);
  try {
    const data = JSON.parse(fs.readFileSync(f, 'utf8'));
    scan(data);
  } catch (e) {
    console.error(`Error reading ${f}:`, e.message);
  }
});
