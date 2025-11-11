#!/usr/bin/env node
/**
 * SMART QUIZ EXTRACTION
 *
 * Compares frontend/app.jsx AppData quiz IDs with backend quiz IDs.
 * Extracts ONLY the quizzes that exist in frontend but not in backend.
 * Creates individual .js files and updates supplemental.topics.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP_JSX = path.join(ROOT, 'frontend', 'app.jsx');
const BACKEND_QUIZZES = path.join(ROOT, 'backend', 'data', 'quizzes');
const SUPPLEMENTAL = path.join(BACKEND_QUIZZES, 'supplemental.topics.json');

const SUBJECT_FOLDERS = {
  Math: 'math',
  Science: 'science',
  'Social Studies': 'social-studies',
  'Reasoning Through Language Arts (RLA)': 'rla',
};

function log(msg, indent = 0) {
  console.log('  '.repeat(indent) + msg);
}

function getBackendQuizIds() {
  log('📊 Loading backend quiz IDs...');
  const { ALL_QUIZZES } = require(path.join(BACKEND_QUIZZES, 'index.js'));

  const ids = new Set();
  Object.entries(ALL_QUIZZES).forEach(([subject, data]) => {
    if (data.categories) {
      Object.values(data.categories).forEach((cat) => {
        if (cat.topics) {
          cat.topics.forEach((topic) => {
            if (topic.id) ids.add(topic.id);
          });
        }
      });
    }
  });

  log(`Found ${ids.size} backend quiz IDs`, 1);
  return ids;
}

function getFrontendQuizIds() {
  log('\n📖 Parsing frontend/app.jsx for quiz IDs...');
  const content = fs.readFileSync(APP_JSX, 'utf8');

  // Find all quiz IDs in the AppData section
  // Pattern: id: 'quiz_id_here' or id: "quiz_id_here"
  const idPattern = /id:\s*['"]([a-z_0-9]+(?:_quiz\d+)?)['"]/gi;
  const matches = content.matchAll(idPattern);

  const ids = new Set();
  const quizIds = new Set();

  for (const match of matches) {
    const id = match[1];
    ids.add(id);
    // Only count IDs that look like actual quiz IDs (have quiz or topic patterns)
    if (id.includes('quiz') || id.includes('_')) {
      quizIds.add(id);
    }
  }

  log(`Found ${ids.size} total IDs in frontend`, 1);
  log(`Found ${quizIds.size} quiz-related IDs`, 1);
  return Array.from(quizIds);
}

function findMissingQuizzes() {
  const backendIds = getBackendQuizIds();
  const frontendIds = getFrontendQuizIds();

  const missing = frontendIds.filter((id) => !backendIds.has(id));

  log(`\n🔍 Comparison Results:`);
  log(`Backend has: ${backendIds.size} quizzes`, 1);
  log(`Frontend has: ${frontendIds.length} quiz IDs`, 1);
  log(`Missing in backend: ${missing.length} quizzes`, 1);

  if (missing.length > 0) {
    log(`\n📋 Missing quiz IDs:`, 1);
    missing.slice(0, 20).forEach((id) => log(id, 2));
    if (missing.length > 20) {
      log(`... and ${missing.length - 20} more`, 2);
    }
  }

  return missing;
}

function analyzeBySubject(missingIds) {
  log(`\n📊 Breakdown by subject:`);

  const bySubject = {
    Math: [],
    Science: [],
    'Social Studies': [],
    RLA: [],
  };

  missingIds.forEach((id) => {
    if (id.startsWith('math_')) bySubject['Math'].push(id);
    else if (id.startsWith('sci_')) bySubject['Science'].push(id);
    else if (id.startsWith('ss_')) bySubject['Social Studies'].push(id);
    else if (id.startsWith('rla_')) bySubject['RLA'].push(id);
  });

  Object.entries(bySubject).forEach(([subj, ids]) => {
    log(`${subj}: ${ids.length} missing quizzes`, 1);
  });

  return bySubject;
}

function main() {
  log('🚀 Starting smart quiz extraction analysis...\n');

  const missingIds = findMissingQuizzes();

  if (missingIds.length === 0) {
    log(`\n✅ All frontend quizzes already exist in backend!`);
    return;
  }

  const bySubject = analyzeBySubject(missingIds);

  log(`\n💡 Next Steps:`);
  log(
    `1. The script has identified ${missingIds.length} quizzes that need extraction`,
    1
  );
  log(`2. These quizzes exist in frontend/app.jsx but not in backend`, 1);
  log(`3. Ready to extract them to backend/data/quizzes/{subject}/`, 1);
  log(`\n⚠️  Extraction not yet implemented. This was analysis only.`, 1);
  log(`\n🔧 To proceed:`, 1);
  log(`- Review the missing IDs above`, 2);
  log(`- Confirm these should be extracted`, 2);
  log(`- I can build the extraction logic next`, 2);
}

main();
