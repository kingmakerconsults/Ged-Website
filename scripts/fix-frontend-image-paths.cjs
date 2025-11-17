#!/usr/bin/env node
/**
 * Fix frontend app.jsx embedded quiz image paths
 * Adds subject folder prefixes based on context
 */

const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, '..', 'frontend', 'app.jsx');

console.log('Fixing frontend app.jsx image paths...\n');

let content = fs.readFileSync(appJsxPath, 'utf8');
const before = content;

// Track which subject we're in based on comments or variable names
let changes = 0;

// Math quizzes - match patterns like: imageUrl: 'Images/math_*.png'
content = content.replace(
  /imageUrl:\s*'Images\/(math_[^']+)'/g,
  (match, filename) => {
    changes++;
    return `imageUrl: 'Images/Math/${filename}'`;
  }
);

// Science quizzes - match patterns like: imageUrl: 'Images/ged-scince-*.png' or sci-*.png
content = content.replace(
  /imageUrl:\s*'Images\/((?:ged-scince|sci-)[^']+)'/g,
  (match, filename) => {
    changes++;
    return `imageUrl: 'Images/Science/${filename}'`;
  }
);

// Social Studies - all remaining Images/ paths without subject folders
// Match specific social studies image patterns
const ssPatterns = [
  'join_or_die',
  'Louisiana_Purchase',
  'territorial-gains',
  'licensed-image',
  'Bosses-of-the-Senate',
  'Protectors-of-Our',
  'Questions-are-based',
  'Question-is-based',
  'political-map',
  'Iron_Curtain',
  'WorldWarII',
  'ged-grsph',
  'World energy',
  'social studies',
  '035fa172-',
];

for (const pattern of ssPatterns) {
  const regex = new RegExp(
    `imageUrl:\\s*'Images\\/([^']*${pattern}[^']*)`,
    'gi'
  );
  content = content.replace(regex, (match, filename) => {
    changes++;
    return `imageUrl: 'Images/Social Studies/${filename}`;
  });
}

// Also fix inline <img src="Images/..." in passages
content = content.replace(
  /<img\s+src="Images\/((?:social\s+studies|Questions-are-based|World\s+energy|WorldWarII|ged-grsph|035fa172)[^"]+)"/gi,
  (match, filename) => {
    changes++;
    return `<img src="Images/Social Studies/${filename}"`;
  }
);

if (content !== before) {
  fs.writeFileSync(appJsxPath, content, 'utf8');
  console.log(`✅ Fixed ${changes} image paths in app.jsx`);
} else {
  console.log('No changes needed in app.jsx');
}
