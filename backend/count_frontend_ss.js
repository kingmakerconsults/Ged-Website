// Count Social Studies questions in frontend AppData
const fs = require('fs');
const path = require('path');

// Read app.jsx and extract the Social Studies data structure
const appJsxPath = path.join(__dirname, '..', 'frontend', 'app.jsx');
const content = fs.readFileSync(appJsxPath, 'utf8');

// Find the Social Studies section starting at line 9439
const lines = content.split('\n');
let inSocialStudies = false;
let braceCount = 0;
let socialStudiesStart = -1;
let socialStudiesEnd = -1;

for (let i = 9438; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes("'Social Studies': {")) {
    inSocialStudies = true;
    socialStudiesStart = i;
    braceCount = 0;
  }

  if (inSocialStudies) {
    // Count braces
    for (const char of line) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }

    // When we close all braces, we've reached the end
    if (braceCount === 0 && socialStudiesStart !== i) {
      socialStudiesEnd = i;
      break;
    }
  }
}

console.log('=== FRONTEND APP.JSX SOCIAL STUDIES ===');
console.log(`Start line: ${socialStudiesStart + 1}`);
console.log(`End line: ${socialStudiesEnd + 1}`);
console.log(`Total lines: ${socialStudiesEnd - socialStudiesStart}`);

// Now count topics by searching for "id: 'ss_"
const ssSection = lines
  .slice(socialStudiesStart, socialStudiesEnd + 1)
  .join('\n');
const topicMatches = ssSection.match(/id: 'ss_[^']+'/g) || [];
const uniqueTopics = [...new Set(topicMatches)];

console.log(`\nUnique topic IDs: ${uniqueTopics.length}`);
uniqueTopics.forEach((t) => console.log(`  ${t}`));

// Count questions
const questionMatches = ssSection.match(/questionNumber: \d+/g) || [];
console.log(`\nTotal questions in frontend: ${questionMatches.length}`);

// Now compare with backend
console.log('\n=== BACKEND COMPARISON ===');
const { ALL_QUIZZES } = require('./data/quizzes/index.js');
const ss = ALL_QUIZZES['Social Studies'];
let backendQuestions = 0;
let backendTopics = 0;

if (ss && ss.categories) {
  Object.values(ss.categories).forEach((cat) => {
    if (cat.topics) {
      cat.topics.forEach((topic) => {
        backendTopics++;
        if (topic.questions) backendQuestions += topic.questions.length;
      });
    }
  });
}

console.log(`Backend topics: ${backendTopics}`);
console.log(`Backend questions: ${backendQuestions}`);
console.log(
  `\nDifference: ${
    questionMatches.length - backendQuestions
  } questions not in backend`
);
