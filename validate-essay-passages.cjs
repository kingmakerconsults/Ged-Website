/**
 * Essay Passage Validation Script
 * Verifies all standardized passages meet GED requirements
 */

const fs = require('fs');
const path = require('path');

// Import the standardized passages
const passagesPath = path.join(
  __dirname,
  'frontend',
  'data',
  'rla',
  'essayPassagesStandardized.js'
);
let passagesContent = fs.readFileSync(passagesPath, 'utf8');

// Extract the array manually since it's an ES6 module
const arrayMatch = passagesContent.match(
  /export const essayPassages = \[([\s\S]*?)\];/
);
if (!arrayMatch) {
  console.error('Could not parse essay passages file');
  process.exit(1);
}

// Utility functions
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

function validatePassage(article, topicId, articleLabel) {
  const issues = [];
  const text = stripHtml(article.text || '');
  const wordCount = countWords(text);

  // Word count validation
  if (wordCount < 230) {
    issues.push(`Too short: ${wordCount} words (minimum 230)`);
  } else if (wordCount > 270) {
    issues.push(`Too long: ${wordCount} words (maximum 270)`);
  }

  // Author validation
  if (!article.author || article.author.trim() === '') {
    issues.push('Missing author');
  } else if (
    article.author.includes('(') ||
    article.author.includes(',') ||
    article.author.match(/^(Dr|Mr|Ms|Mrs|Prof)\./)
  ) {
    issues.push(
      `Author format incorrect: "${article.author}" (should be "First Last" only)`
    );
  }

  // Evidence marker validation
  const goodEvidence = (
    article.text?.match(/<span class="good-evidence">/g) || []
  ).length;
  const badEvidence = (
    article.text?.match(/<span class="bad-evidence">/g) || []
  ).length;
  const totalEvidence = goodEvidence + badEvidence;

  if (totalEvidence < 2) {
    issues.push(`Insufficient evidence: ${totalEvidence} markers (minimum 2)`);
  } else if (totalEvidence > 4) {
    issues.push(
      `Too many evidence markers: ${totalEvidence} (maximum 4 recommended)`
    );
  }

  // Evidence type consistency
  if (article.strength === 'strong' && badEvidence > 0) {
    issues.push(
      `Strong article has ${badEvidence} bad-evidence markers (should be 0)`
    );
  } else if (article.strength === 'weak' && goodEvidence > 0) {
    issues.push(
      `Weak article has ${goodEvidence} good-evidence markers (should be 0)`
    );
  }

  // Required fields
  if (!article.label) issues.push('Missing label');
  if (!article.title) issues.push('Missing title');
  if (!article.strength) issues.push('Missing strength designation');

  return {
    valid: issues.length === 0,
    wordCount,
    evidence: { good: goodEvidence, bad: badEvidence, total: totalEvidence },
    issues,
  };
}

console.log('='.repeat(80));
console.log('ESSAY PASSAGE VALIDATION REPORT');
console.log('='.repeat(80));
console.log('');

// Parse passages manually
const passages = [];
const topicRegex = /\{\s*id:\s*"([^"]+)",\s*topic:\s*"([^"]+)"/g;
let match;

while ((match = topicRegex.exec(arrayMatch[1])) !== null) {
  const topicId = match[1];
  const topicName = match[2];
  const topicStartIndex = match.index;

  // Find the next topic or end of array
  const nextMatch = topicRegex.exec(arrayMatch[1]);
  const topicEndIndex = nextMatch ? nextMatch.index : arrayMatch[1].length;
  topicRegex.lastIndex = topicStartIndex + 1; // Reset for next iteration

  const topicBlock = arrayMatch[1].substring(topicStartIndex, topicEndIndex);

  // Extract articles
  const articlesMatch = topicBlock.match(/articles:\s*\[([\s\S]*?)\]/);
  if (!articlesMatch) continue;

  // Parse article data
  const labelMatches = [...articlesMatch[1].matchAll(/label:\s*"([^"]+)"/g)];
  const strengthMatches = [
    ...articlesMatch[1].matchAll(/strength:\s*"([^"]+)"/g),
  ];
  const authorMatches = [...articlesMatch[1].matchAll(/author:\s*"([^"]+)"/g)];
  const textMatches = [...articlesMatch[1].matchAll(/text:\s*`([^`]+)`/g)];

  const articles = [];
  for (let i = 0; i < Math.min(labelMatches.length, 2); i++) {
    articles.push({
      label: labelMatches[i]?.[1],
      strength: strengthMatches[i]?.[1],
      author: authorMatches[i]?.[1],
      text: textMatches[i]?.[1],
    });
  }

  passages.push({
    id: topicId,
    topic: topicName,
    articles,
  });
}

console.log(`Found ${passages.length} topics to validate\n`);

let totalPassages = 0;
let compliantPassages = 0;
let totalIssues = 0;
const wordCounts = [];
const allIssues = [];

passages.forEach((passage, idx) => {
  console.log('─'.repeat(80));
  console.log(`TOPIC ${idx + 1}: ${passage.topic}`);
  console.log(`ID: ${passage.id}`);
  console.log('─'.repeat(80));

  passage.articles.forEach((article, articleIdx) => {
    totalPassages++;
    const result = validatePassage(article, passage.id, article.label);
    wordCounts.push(result.wordCount);

    console.log(
      `\n  ${article.label || `Article ${articleIdx + 1}`}: ${
        article.title || 'NO TITLE'
      }`
    );
    console.log(`    Author: ${article.author || 'MISSING'}`);
    console.log(`    Strength: ${article.strength || 'MISSING'}`);
    console.log(
      `    Word Count: ${result.wordCount} ${
        result.wordCount >= 230 && result.wordCount <= 270 ? '✓' : '✗'
      }`
    );
    console.log(
      `    Evidence: ${result.evidence.good} good, ${result.evidence.bad} bad (total: ${result.evidence.total})`
    );

    if (result.valid) {
      console.log(`    Status: ✓ COMPLIANT`);
      compliantPassages++;
    } else {
      console.log(`    Status: ✗ ISSUES FOUND`);
      result.issues.forEach((issue) => {
        console.log(`      - ${issue}`);
        allIssues.push(`${passage.topic} - ${article.label}: ${issue}`);
        totalIssues++;
      });
    }
  });

  console.log('');
});

console.log('='.repeat(80));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(80));
console.log(`Total Topics: ${passages.length}`);
console.log(`Total Passages: ${totalPassages}`);
console.log(
  `Compliant: ${compliantPassages} (${Math.round(
    (compliantPassages / totalPassages) * 100
  )}%)`
);
console.log(
  `Need Fixes: ${totalPassages - compliantPassages} (${Math.round(
    ((totalPassages - compliantPassages) / totalPassages) * 100
  )}%)`
);
console.log(`Total Issues: ${totalIssues}`);

if (wordCounts.length > 0) {
  const avg = Math.round(
    wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length
  );
  const min = Math.min(...wordCounts);
  const max = Math.max(...wordCounts);
  const inRange = wordCounts.filter((wc) => wc >= 230 && wc <= 270).length;

  console.log(`\nWord Count Statistics:`);
  console.log(`  Average: ${avg} words`);
  console.log(`  Range: ${min} - ${max} words`);
  console.log(
    `  In Range (230-270): ${inRange}/${totalPassages} (${Math.round(
      (inRange / totalPassages) * 100
    )}%)`
  );
}

if (allIssues.length > 0 && allIssues.length <= 30) {
  console.log(`\nAll Issues:`);
  allIssues.forEach((issue, idx) => {
    console.log(`  ${idx + 1}. ${issue}`);
  });
}

console.log('\n' + '='.repeat(80));
if (totalIssues === 0) {
  console.log('✓ ALL PASSAGES VALIDATED SUCCESSFULLY');
} else {
  console.log(`✗ ${totalIssues} ISSUE(S) REQUIRE ATTENTION`);
}
console.log('='.repeat(80));

// Exit with error code if validation fails
process.exit(totalIssues > 0 ? 1 : 0);
