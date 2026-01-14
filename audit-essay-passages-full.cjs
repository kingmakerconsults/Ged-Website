/**
 * Essay Passage Audit - Full Analysis
 * Analyzes all essay practice passages from LegacyRootApp.jsx
 */

const fs = require('fs');
const path = require('path');

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

function extractAuthor(title) {
  if (!title) return null;
  let clean = title.replace(/\s*\([^)]*\)/g, '');
  clean = clean.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+/i, '');
  clean = clean.replace(/,.*$/, '');
  return clean.trim();
}

console.log('Reading source file...');
const sourcePath = path.join(
  __dirname,
  'frontend',
  'src',
  'legacy',
  'LegacyRootApp.jsx'
);
const content = fs.readFileSync(sourcePath, 'utf8');

// Extract passagesData array - more robust pattern
const arrayMatch = content.match(/const passagesData = \[([\s\S]*?)\n  \];/);
if (!arrayMatch) {
  console.error('Could not find passagesData array');
  process.exit(1);
}

console.log('\n' + '='.repeat(80));
console.log('ESSAY PASSAGE AUDIT REPORT');
console.log('='.repeat(80));

let totalTopics = 0;
let totalPassages = 0;
let compliantPassages = 0;
const wordCounts = [];
let missingAuthors = 0;
let outOfRange = 0;
const issues = [];

// Split by topic blocks more carefully
const topicRegex = /\{\s*topic:\s*['"]([^'"]+)['"]/g;
let match;
const topics = [];

while ((match = topicRegex.exec(arrayMatch[1])) !== null) {
  topics.push({
    name: match[1],
    startIndex: match.index,
  });
}

totalTopics = topics.length;
totalPassages = totalTopics * 2;

// Process each topic
topics.forEach((topic, idx) => {
  const nextTopicIndex =
    idx < topics.length - 1 ? topics[idx + 1].startIndex : arrayMatch[1].length;
  const topicBlock = arrayMatch[1].substring(topic.startIndex, nextTopicIndex);

  console.log('\n' + '─'.repeat(80));
  console.log(`TOPIC ${idx + 1}: ${topic.name}`);
  console.log('─'.repeat(80));

  // Extract passage1
  const p1TitleMatch = topicBlock.match(
    /passage1:\s*\{\s*title:\s*['"]([^'"]+)['"]/
  );
  const p1ContentMatch = topicBlock.match(
    /passage1:[\s\S]*?content:[^'"]*['"]+([\s\S]*?)['"],?\s*\}/
  );

  // Extract passage2
  const p2TitleMatch = topicBlock.match(
    /passage2:\s*\{\s*title:\s*['"]([^'"]+)['"]/
  );
  const p2ContentMatch = topicBlock.match(
    /passage2:[\s\S]*?content:[^'"]*['"]+([\s\S]*?)['"],?\s*\}/
  );

  const passages = [
    {
      title: p1TitleMatch?.[1],
      content: p1ContentMatch?.[1],
      label: 'Article A',
    },
    {
      title: p2TitleMatch?.[1],
      content: p2ContentMatch?.[1],
      label: 'Article B',
    },
  ];

  passages.forEach((p, pIdx) => {
    if (!p.title) {
      console.log(`\n  ${p.label}: NOT FOUND`);
      issues.push(`${topic.name} - ${p.label}: Missing passage data`);
      return;
    }

    const author = extractAuthor(p.title);
    const text = stripHtml(p.content || '');
    const wordCount = countWords(text);
    const isStrong = /stronger/i.test(p.title);
    const isWeak = /weaker/i.test(p.title);
    const inRange = wordCount >= 230 && wordCount <= 270;

    wordCounts.push(wordCount);
    if (!author) {
      missingAuthors++;
      issues.push(`${topic.name} - ${p.label}: Missing author`);
    }
    if (!inRange) {
      outOfRange++;
      issues.push(
        `${topic.name} - ${p.label}: Word count ${wordCount} (need 230-270)`
      );
    }

    const goodEvidence = (
      p.content?.match(/<span class='good-evidence'>/g) || []
    ).length;
    const badEvidence = (p.content?.match(/<span class='bad-evidence'>/g) || [])
      .length;
    const totalEvidence = goodEvidence + badEvidence;

    if (totalEvidence === 0) {
      issues.push(`${topic.name} - ${p.label}: No evidence markers`);
    }

    console.log(`\n  ${p.label}: ${p.title}`);
    console.log(`    Author: ${author || 'MISSING ✗'}`);
    console.log(
      `    Word Count: ${wordCount} ${inRange ? '✓' : '✗ (target: 230-270)'}`
    );
    console.log(
      `    Designated: ${isStrong ? 'STRONG' : isWeak ? 'WEAK' : 'UNCLEAR'}`
    );
    console.log(
      `    Evidence: ${goodEvidence} good, ${badEvidence} bad (total: ${totalEvidence})`
    );

    const isCompliant = author && inRange && totalEvidence >= 2;
    if (isCompliant) {
      console.log(`    Status: ✓ COMPLIANT`);
      compliantPassages++;
    } else {
      console.log(`    Status: ✗ NEEDS WORK`);
    }
  });
});

console.log('\n' + '='.repeat(80));
console.log('SUMMARY STATISTICS');
console.log('='.repeat(80));
console.log(`Total Topics: ${totalTopics}`);
console.log(`Total Passages: ${totalPassages}`);
console.log(
  `Compliant: ${compliantPassages} (${Math.round(
    (compliantPassages / totalPassages) * 100
  )}%)`
);
console.log(
  `Need Work: ${totalPassages - compliantPassages} (${Math.round(
    ((totalPassages - compliantPassages) / totalPassages) * 100
  )}%)`
);

if (wordCounts.length > 0) {
  const avg = Math.round(
    wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length
  );
  const min = Math.min(...wordCounts);
  const max = Math.max(...wordCounts);

  console.log(`\nWord Count Analysis:`);
  console.log(`  Average: ${avg} words`);
  console.log(`  Range: ${min} - ${max} words`);
  console.log(`  Target Range: 230-270 words`);
  console.log(
    `  Out of range: ${outOfRange} passages (${Math.round(
      (outOfRange / totalPassages) * 100
    )}%)`
  );
}

console.log(`\nAuthor Attribution:`);
console.log(`  Missing Authors: ${missingAuthors} passages`);

console.log(`\nTotal Issues: ${issues.length}`);
if (issues.length > 0 && issues.length <= 20) {
  console.log('\nDetailed Issues:');
  issues.forEach((issue) => console.log(`  - ${issue}`));
} else if (issues.length > 20) {
  console.log(`\n(Too many to list individually - see categories above)`);
}

console.log('\n' + '='.repeat(80));
console.log('AUDIT COMPLETE');
console.log('='.repeat(80));
console.log('\nNext Steps:');
console.log('  1. Adjust passage word counts to 230-270 range');
console.log('  2. Ensure all passages have clean author names');
console.log('  3. Add 2-3 evidence markers per passage');
console.log('  4. Verify strong passages use <span class="good-evidence">');
console.log('  5. Verify weak passages use <span class="bad-evidence">');
console.log('='.repeat(80));
