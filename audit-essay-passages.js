/**
 * Essay Passage Audit Script
 *
 * Analyzes all essay practice passages and reports:
 * - Word counts
 * - Author attribution
 * - Evidence quality indicators
 * - Structure compliance
 */

// Strip HTML tags for word counting
function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Count words in plain text
function countWords(text) {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

// Extract author name from title (remove title prefixes and role descriptions)
function extractAuthor(title) {
  if (!title) return null;

  // Remove everything in parentheses
  let clean = title.replace(/\s*\([^)]*\)/g, '');

  // Remove professional titles
  clean = clean.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+/i, '');

  // Remove trailing role descriptions
  clean = clean.replace(/,.*$/, '');

  return clean.trim();
}

// Count evidence markers
function countEvidence(content, type) {
  const goodMatches = (content.match(/<span class='good-evidence'>/g) || [])
    .length;
  const badMatches = (content.match(/<span class='bad-evidence'>/g) || [])
    .length;

  return {
    good: goodMatches,
    bad: badMatches,
    total: goodMatches + badMatches,
  };
}

// Analyze passage structure
function analyzePassage(passage, label) {
  const text = stripHtml(passage.content);
  const wordCount = countWords(text);
  const author = extractAuthor(passage.title);
  const evidence = countEvidence(passage.content);
  const isStrong = /stronger/i.test(passage.title);
  const isWeak = /weaker/i.test(passage.title);

  return {
    label,
    title: passage.title,
    author,
    wordCount,
    evidence,
    designatedStrength: isStrong ? 'strong' : isWeak ? 'weak' : 'unknown',
    status: {
      wordCountOk: wordCount >= 230 && wordCount <= 270,
      hasAuthor: !!author,
      hasEvidence: evidence.total > 0,
      evidenceMatch:
        (isStrong && evidence.good > 0) || (isWeak && evidence.bad > 0),
    },
  };
}

// Main audit data (truncated for brevity - paste full passagesData array here)
const passagesData = [
  {
    topic: 'Should the Voting Age Be Lowered to 16?',
    passage1: {
      title: 'Dr. Alisa Klein, Sociologist (Stronger Argument)',
      content: `<p>Lowering the voting age to 16 is a crucial step for a healthier democracy. At 16, many young people are employed, pay taxes on their earnings, and are subject to the laws of the land. It is a fundamental principle of democracy'no taxation without representation'that they should have a voice in shaping policies that directly affect them, from education funding to climate change.</p><p><span class='good-evidence'>Furthermore, research shows that voting is a habit; a 2020 study from Tufts University found that cities that allow 16-year-olds to vote in local elections see significantly higher youth turnout in subsequent national elections.</span> Enabling citizens to vote at an age when they are still living in a stable home and learning about civics in school increases the likelihood they will become lifelong voters.</p><p><span class='good-evidence'>As political scientist Dr. Mark Franklin notes, 'The earlier a citizen casts their first ballot, the more likely they are to become a consistent participant in our democracy.'</span> It is a vital step toward strengthening civic engagement for generations to come.</p>`,
    },
    passage2: {
      title: 'Marcus heavyweight, Political Analyst (Weaker Argument)',
      content: `<p>While the idealism behind lowering the voting age is appealing, the practical realities suggest it would be a mistake. The adolescent brain is still undergoing significant development, particularly in areas related to long-term decision-making and impulse control. The political landscape is complex, requiring a level of experience and cognitive maturity that most 16-year-olds have not yet developed.</p><p>We risk trivializing the profound responsibility of voting by extending it to a demographic that is, by and large, not yet equipped to handle it. <span class='bad-evidence'>I remember being 16, and my friends and I were far more concerned with prom dates and getting a driver's license than with monetary policy.</span> Their priorities are simply not aligned with the serious nature of national governance.</p><p>The current age of 18 strikes a reasonable balance, marking a clear transition into legal adulthood and the full spectrum of responsibilities that come with it. To change this is to experiment with the foundation of our republic for no clear gain.</p>`,
    },
  },
  // ... (additional topics would be included in full script)
];

// Run audit
console.log('='.repeat(80));
console.log('ESSAY PASSAGE AUDIT REPORT');
console.log('='.repeat(80));
console.log('');

const report = [];
let totalPassages = 0;
let compliantPassages = 0;

passagesData.forEach((topic, idx) => {
  console.log(`\n${'─'.repeat(80)}`);
  console.log(`TOPIC ${idx + 1}: ${topic.topic}`);
  console.log('─'.repeat(80));

  const p1 = analyzePassage(topic.passage1, 'Passage 1');
  const p2 = analyzePassage(topic.passage2, 'Passage 2');

  [p1, p2].forEach((p) => {
    totalPassages++;

    console.log(`\n  ${p.label}: ${p.title}`);
    console.log(`  Author: ${p.author || 'MISSING'}`);
    console.log(
      `  Word Count: ${p.wordCount} words ${
        p.status.wordCountOk ? '✓' : '✗ (target: 230-270)'
      }`
    );
    console.log(`  Designated: ${p.designatedStrength.toUpperCase()}`);
    console.log(
      `  Evidence: ${p.evidence.good} good, ${p.evidence.bad} bad (total: ${p.evidence.total})`
    );

    const issues = [];
    if (!p.status.wordCountOk) issues.push('Word count out of range');
    if (!p.status.hasAuthor) issues.push('Missing author');
    if (!p.status.hasEvidence) issues.push('No evidence markers');
    if (!p.status.evidenceMatch) issues.push('Evidence type mismatch');

    if (issues.length === 0) {
      console.log(`  Status: ✓ COMPLIANT`);
      compliantPassages++;
    } else {
      console.log(`  Status: ✗ NEEDS WORK`);
      issues.forEach((issue) => console.log(`    - ${issue}`));
    }

    report.push({
      topic: topic.topic,
      ...p,
    });
  });
});

console.log('\n' + '='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
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

// Word count distribution
const wordCounts = report.map((p) => p.wordCount);
const avgWords = Math.round(
  wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length
);
const minWords = Math.min(...wordCounts);
const maxWords = Math.max(...wordCounts);

console.log(`\nWord Count Stats:`);
console.log(`  Average: ${avgWords} words`);
console.log(`  Range: ${minWords} - ${maxWords} words`);
console.log(`  Target: 230-270 words`);

// Author attribution
const missingAuthors = report.filter((p) => !p.author).length;
console.log(`\nAuthor Attribution:`);
console.log(`  Missing: ${missingAuthors} passages`);

// Evidence markers
const noEvidence = report.filter((p) => p.evidence.total === 0).length;
console.log(`\nEvidence Markers:`);
console.log(`  No markers: ${noEvidence} passages`);

console.log('\n' + '='.repeat(80));
console.log('END REPORT');
console.log('='.repeat(80));
