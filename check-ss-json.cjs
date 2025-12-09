#!/usr/bin/env node

const fs = require('fs');

try {
  const buffer = fs.readFileSync('public/quizzes/social-studies.quizzes.json');
  const text = buffer.toString('utf8');

  // Check for BOM
  if (text.charCodeAt(0) === 0xfeff) {
    console.log('File has UTF-8 BOM');
  }

  // Try to parse
  const data = JSON.parse(text);

  let count = 0;
  const traverse = (obj) => {
    if (Array.isArray(obj)) {
      obj.forEach(traverse);
    } else if (obj && typeof obj === 'object') {
      if (obj.questionNumber !== undefined) count++;
      Object.values(obj).forEach(traverse);
    }
  };

  traverse(data);
  console.log('Social Studies questions:', count);
} catch (e) {
  console.log('Error:', e.message.substring(0, 200));

  // Try to find where parsing fails
  try {
    const buffer = fs.readFileSync(
      'public/quizzes/social-studies.quizzes.json'
    );
    const text = buffer.toString('utf8');

    // Find first invalid character
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
        console.log(
          `Invalid character at position ${i}: code ${code} (${text.substring(
            Math.max(0, i - 50),
            i + 50
          )})`
        );
        break;
      }
    }
  } catch (e2) {
    console.log('Error reading file:', e2.message);
  }
}
