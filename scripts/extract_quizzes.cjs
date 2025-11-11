#!/usr/bin/env node
/**
 * QUIZ EXTRACTOR - Extract frontend quizzes to backend
 *
 * Parses frontend/app.jsx AppData, extracts missing quizzes,
 * creates individual backend files, updates supplemental.topics.json
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
  return ids;
}

function parseAppData() {
  log('📖 Parsing frontend/app.jsx...');
  const content = fs.readFileSync(APP_JSX, 'utf8');

  // Find the AppData constant definition
  const appDataStart = content.indexOf('const AppData = {');
  if (appDataStart === -1) {
    throw new Error('Could not find AppData object in app.jsx');
  }

  // Extract all id: 'xxx' patterns within the AppData section
  const appDataSection = content.substring(appDataStart);
  const idPattern = /id:\s*['"]([a-z_0-9]+(?:_quiz\d+)?)['"]/gi;
  const matches = appDataSection.matchAll(idPattern);

  const ids = new Set();
  const topics = [];

  for (const match of matches) {
    const id = match[1];
    // Filter to only quiz-like IDs (skip UI element IDs, icon names, etc.)
    if (
      (id.startsWith('math_') ||
        id.startsWith('sci_') ||
        id.startsWith('ss_') ||
        id.startsWith('rla_')) &&
      !ids.has(id)
    ) {
      ids.add(id);
      topics.push({ id });
    }
  }

  log(`Found ${topics.length} unique quiz IDs in AppData`, 1);
  return topics;
}

function extractMissingQuizzes() {
  log('🚀 Starting quiz extraction...\n');

  const backendIds = getBackendQuizIds();
  log(`Backend has ${backendIds.size} quizzes`);

  const topics = parseAppData();
  log(`Found ${topics.length} total topics in frontend`);

  const missing = topics.filter((t) => !backendIds.has(t.id));
  log(`Found ${missing.length} missing quizzes\n`);

  const extracted = [];
  const errors = [];
  const content = fs.readFileSync(APP_JSX, 'utf8');

  missing.forEach((topic) => {
    try {
      // Determine subject and folder from ID prefix
      let subject, folder, category;

      if (topic.id.startsWith('math_')) {
        subject = 'Math';
        folder = 'math';
        category = 'Math Concepts';
      } else if (topic.id.startsWith('sci_')) {
        subject = 'Science';
        folder = 'science';
        category = 'Science Topics';
      } else if (topic.id.startsWith('ss_')) {
        subject = 'Social Studies';
        folder = 'social-studies';
        category = 'Social Studies Topics';
      } else if (topic.id.startsWith('rla_')) {
        subject = 'Reasoning Through Language Arts (RLA)';
        folder = 'rla';
        category = 'RLA Topics';
      } else {
        errors.push({ id: topic.id, error: 'Unknown subject prefix' });
        return;
      }

      // Extract the full topic object from app.jsx
      const topicObj = extractFullTopicObject(content, topic.id);

      if (!topicObj) {
        errors.push({ id: topic.id, error: 'Could not extract full object' });
        return;
      }

      const filename = `${topic.id}.js`;
      const filepath = path.join(BACKEND_QUIZZES, folder, filename);

      // Generate the file content
      const fileContent = generateQuizFile(topicObj, subject, category);

      // Write the file
      fs.writeFileSync(filepath, fileContent, 'utf8');

      extracted.push({
        subject,
        folder,
        category,
        id: topic.id,
        title: topicObj.title || topic.id,
        filepath,
        questionCount: topicObj.questions?.length || 0,
      });
    } catch (err) {
      errors.push({ id: topic.id, error: err.message });
    }
  });

  return { extracted, errors };
}

function extractFullTopicObject(content, topicId) {
  // Find the topic object by its ID
  const idPattern = new RegExp(`\\{\\s*id:\\s*['"]${topicId}['"]`, 'g');
  const match = idPattern.exec(content);

  if (!match) return null;

  // Find the matching closing brace
  let start = match.index;
  let braceCount = 0;
  let inString = false;
  let stringChar = null;
  let end = start;

  for (let i = start; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';

    // Track string boundaries
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = null;
      }
    }

    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          end = i + 1;
          break;
        }
      }
    }
  }

  const objectStr = content.substring(start, end);

  // Convert to valid JSON-like string then eval it
  try {
    // Wrap in parens for eval
    return eval('(' + objectStr + ')');
  } catch (err) {
    return null;
  }
}

function generateQuizFile(topic, subject, category) {
  const now = new Date().toISOString().split('T')[0];

  return `/**
 * ${topic.title}
 * Extracted from frontend app.jsx on ${now}
 * Subject: ${subject}
 * Category: ${category}
 */

module.exports = ${JSON.stringify(topic, null, 2)};
`;
}

function updateSupplemental(extracted) {
  log('\n📝 Updating supplemental.topics.json...');

  const supplemental = JSON.parse(fs.readFileSync(SUPPLEMENTAL, 'utf8'));

  extracted.forEach((quiz) => {
    const entry = {
      subjectKey: quiz.subject,
      subjectFolder: quiz.folder,
      categoryName: quiz.category,
      topic: {
        id: quiz.id,
        title: quiz.title,
        description: '',
        config: {
          totalTime: 900,
          calculator: quiz.subject === 'Math',
          formulaSheet: quiz.subject === 'Math',
          parts: [
            {
              name: 'Quiz',
              questionCount: quiz.questionCount,
            },
          ],
        },
        file: `backend/data/quizzes/${quiz.folder}/${quiz.id}.js`,
      },
    };

    supplemental.push(entry);
  });

  // Write back
  fs.writeFileSync(SUPPLEMENTAL, JSON.stringify(supplemental, null, 2), 'utf8');

  log(`Added ${extracted.length} entries to supplemental.topics.json`, 1);
}

function main() {
  const { extracted, errors } = extractMissingQuizzes();

  log(`\n📊 Extraction Results:`);
  log(`✅ Extracted: ${extracted.length} quizzes`, 1);
  log(`❌ Errors: ${errors.length}`, 1);

  if (errors.length > 0) {
    log(`\n⚠️  Errors:`, 1);
    errors.forEach((err) => log(`${err.id}: ${err.error}`, 2));
  }

  if (extracted.length > 0) {
    // Group by subject
    const bySubject = {};
    extracted.forEach((q) => {
      if (!bySubject[q.subject]) bySubject[q.subject] = [];
      bySubject[q.subject].push(q);
    });

    log(`\n📋 By Subject:`);
    Object.entries(bySubject).forEach(([subj, quizzes]) => {
      log(`${subj}: ${quizzes.length} quizzes`, 1);
      quizzes.slice(0, 5).forEach((q) => {
        log(`${q.id} (${q.questionCount}Q)`, 2);
      });
      if (quizzes.length > 5) {
        log(`... and ${quizzes.length - 5} more`, 2);
      }
    });

    // Update supplemental
    updateSupplemental(extracted);

    log(`\n✅ Extraction complete!`);
    log(`\n🔄 Next steps:`, 1);
    log(`1. Restart backend to load new quizzes`, 2);
    log(`2. Run verification test`, 2);
    log(`3. Run audit on all quizzes`, 2);
  }
}

main();
