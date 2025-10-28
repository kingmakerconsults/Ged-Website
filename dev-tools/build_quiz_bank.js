#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const SUBJECT_SLUGS = {
  'Science': 'science',
  'Math': 'math',
  'Social Studies': 'social-studies',
  'Reasoning Through Language Arts (RLA)': 'rla',
  'Simulations': 'other'
};

const quizRoot = path.join(repoRoot, 'backend', 'data', 'quizzes');

function ensureDirectories() {
  fs.mkdirSync(quizRoot, { recursive: true });
  Object.values(SUBJECT_SLUGS).forEach((slug) => {
    const dir = path.join(quizRoot, slug);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
  });
}

function readAppData() {
  const indexPath = path.join(repoRoot, 'frontend', 'index.html');
  const html = fs.readFileSync(indexPath, 'utf-8');
  const sciMatch = html.match(/const SCI_NUMERACY_QUESTIONS = (\[[\s\S]*?\n\]);/);
  const appMatch = html.match(/const AppData = ([\s\S]*?\n};)/);
  let targetSci = sciMatch ? sciMatch[1] : null;
  let targetApp = appMatch ? appMatch[1] : null;
  if (targetApp && !targetApp.trim().startsWith('{')) {
    targetApp = null;
  }
  if (!targetApp) {
    const backupPath = path.join(repoRoot, 'frontend', 'index.html.bak');
    if (!fs.existsSync(backupPath)) {
      return null;
    }
    const backup = fs.readFileSync(backupPath, 'utf-8');
    const backupSci = backup.match(/const SCI_NUMERACY_QUESTIONS = (\[[\s\S]*?\n\]);/);
    const backupApp = backup.match(/const AppData = ([\s\S]*?\n};)/);
    if (!backupApp) {
      return null;
    }
    targetSci = backupSci ? backupSci[1] : null;
    targetApp = backupApp[1];
  }
  const context = {};
  vm.createContext(context);
  const scriptParts = [];
  if (targetSci) {
    scriptParts.push(`const SCI_NUMERACY_QUESTIONS = ${targetSci};`);
  } else {
    scriptParts.push('const SCI_NUMERACY_QUESTIONS = [];');
  }
  scriptParts.push(`const AppData = ${targetApp}`);
  scriptParts.push('globalThis.__EXTRACTED_APP_DATA__ = AppData;');
  const script = scriptParts.join('\n');
  vm.runInContext(script, context, { filename: 'appdata.js' });
  const appData = context.__EXTRACTED_APP_DATA__;
  if (!appData || typeof appData !== 'object') {
    throw new Error('Failed to extract AppData definition.');
  }
  return appData;
}

async function readExpandedQuizData() {
  const expandedPath = path.join(repoRoot, 'frontend', 'data', 'quiz_data.js');
  const moduleUrl = pathToFileURL(expandedPath).href;
  const expandedModule = await import(moduleUrl);
  const data = expandedModule.expandedQuizData || expandedModule.default;
  if (!data || typeof data !== 'object') {
    throw new Error('Failed to import expandedQuizData from frontend/data/quiz_data.js');
  }
  return data;
}

function deepClone(input) {
  return JSON.parse(JSON.stringify(input));
}

function normaliseQuizId(quiz) {
  return quiz.quizId || quiz.id;
}

function toFileSlug(id) {
  return id
    .toString()
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

function createQuestionModule(subjectName, identifier, questions, registry) {
  if (!Array.isArray(questions) || !questions.length) {
    return null;
  }
  const key = `${subjectName}::${identifier}`;
  if (registry.has(key)) {
    return registry.get(key);
  }
  const subjectSlug = SUBJECT_SLUGS[subjectName] || 'other';
  const fileSlug = toFileSlug(identifier);
  const fileName = `${fileSlug}.js`;
  const moduleRef = path.join(subjectSlug, fileSlug);
  const targetPath = path.join(quizRoot, `${moduleRef}.js`);
  const fileContents = `module.exports = ${JSON.stringify(questions, null, 2)};\n`;
  fs.writeFileSync(targetPath, fileContents, 'utf-8');
  registry.set(key, moduleRef);
  return moduleRef;
}

function transformAppData(appData, registry) {
  const appMeta = {};
  for (const [subjectName, subjectData] of Object.entries(appData)) {
    const subjectClone = { ...subjectData, categories: {} };
    for (const [categoryName, category] of Object.entries(subjectData.categories || {})) {
      const categoryClone = { ...category, topics: [] };
      for (const topic of category.topics || []) {
        const topicClone = { ...topic };
        if (Array.isArray(topic.questions) && topic.questions.length) {
          const moduleRef = createQuestionModule(subjectName, `topic_${topic.id || toFileSlug(topic.title || 'topic')}`, topic.questions, registry);
          topicClone.questionModuleRef = moduleRef;
        }
        delete topicClone.questions;
        if (Array.isArray(topic.quizzes) && topic.quizzes.length) {
          topicClone.quizzes = topic.quizzes.map((quiz) => {
            const quizClone = { ...quiz };
            const quizId = normaliseQuizId(quizClone);
            if (Array.isArray(quizClone.questions) && quizClone.questions.length) {
              const moduleRef = createQuestionModule(subjectName, quizId, quizClone.questions, registry);
              quizClone.questionModuleRef = moduleRef;
            }
            delete quizClone.questions;
            return quizClone;
          });
        }
        categoryClone.topics.push(topicClone);
      }
      subjectClone.categories[categoryName] = categoryClone;
    }
    appMeta[subjectName] = subjectClone;
  }
  return appMeta;
}

function transformExpandedData(expandedData, registry) {
  const expandedMeta = {};
  for (const [subjectName, subjectData] of Object.entries(expandedData)) {
    const subjectClone = { ...subjectData, categories: {} };
    for (const [categoryName, category] of Object.entries(subjectData.categories || {})) {
      const categoryClone = { ...category, topics: [] };
      for (const topic of category.topics || []) {
        const topicClone = { ...topic };
        if (Array.isArray(topic.questions) && topic.questions.length) {
          const moduleRef = createQuestionModule(subjectName, `topic_${topic.id || toFileSlug(topic.title || 'topic')}`, topic.questions, registry);
          topicClone.questionModuleRef = moduleRef;
        }
        delete topicClone.questions;
        if (Array.isArray(topic.quizzes) && topic.quizzes.length) {
          topicClone.quizzes = topic.quizzes.map((quiz) => {
            const quizClone = { ...quiz };
            const quizId = normaliseQuizId(quizClone);
            if (Array.isArray(quizClone.questions) && quizClone.questions.length) {
              const moduleRef = createQuestionModule(subjectName, quizId, quizClone.questions, registry);
              quizClone.questionModuleRef = moduleRef;
            } else if (quizClone.questionSourceTopicId && topicClone.questionModuleRef) {
              quizClone.questionModuleRef = topicClone.questionModuleRef;
            }
            delete quizClone.questions;
            return quizClone;
          });
        }
        categoryClone.topics.push(topicClone);
      }
      subjectClone.categories[categoryName] = categoryClone;
    }
    expandedMeta[subjectName] = subjectClone;
  }
  return expandedMeta;
}

function injectLegacyQuizzes(appData) {
  let legacyPath = path.join(repoRoot, 'quizzes.txt');
  if (!fs.existsSync(legacyPath)) {
    const archiveCandidate = path.join(repoRoot, 'dev-tools', 'archive', 'quizzes.txt');
    if (fs.existsSync(archiveCandidate)) {
      legacyPath = archiveCandidate;
    } else {
      return;
    }
  }
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(legacyPath, 'utf-8'));
  } catch (err) {
    console.warn('[build_quiz_bank] Unable to parse quizzes.txt:', err.message);
    return;
  }
  if (!Array.isArray(parsed) || !parsed.length) {
    return;
  }
  const socialStudies = appData['Social Studies'];
  if (!socialStudies || !socialStudies.categories) {
    return;
  }
  const usHistory = socialStudies.categories['U.S. History'];
  if (!usHistory) {
    return;
  }
  const targetTopicId = 'legacy_us_history_review';
  let targetTopic = (usHistory.topics || []).find((topic) => topic.id === targetTopicId);
  if (!targetTopic) {
    targetTopic = {
      id: targetTopicId,
      title: 'Legacy U.S. History Review',
      description: 'Historical quiz sets migrated from quizzes.txt.',
      quizzes: []
    };
    if (!Array.isArray(usHistory.topics)) {
      usHistory.topics = [];
    }
    usHistory.topics.push(targetTopic);
  }
  const nextQuestionArray = (entries) => entries.map((question, index) => {
    const answers = Array.isArray(question.answerOptions) ? question.answerOptions : [];
    return {
      questionNumber: index + 1,
      type: question.type || 'text',
      question: question.question,
      passage: question.passage || '',
      answerOptions: answers.map((text) => ({
        text,
        isCorrect: text === question.correctAnswer,
        rationale: question.rationale || ''
      }))
    };
  });
  parsed.forEach((entry) => {
    if (!entry || !entry.id || !Array.isArray(entry.questions)) {
      return;
    }
    const quizId = entry.id;
    const normalizedQuestions = nextQuestionArray(entry.questions);
    targetTopic.quizzes = targetTopic.quizzes || [];
    targetTopic.quizzes.push({
      id: quizId,
      title: entry.title || quizId,
      questions: normalizedQuestions
    });
  });
}

async function generateFiles() {
  ensureDirectories();
  const appDataRaw = readAppData();
  const expandedRaw = await readExpandedQuizData();
  let metadata;
  const metadataPath = path.join(quizRoot, 'metadata.json');
  if (appDataRaw) {
    injectLegacyQuizzes(appDataRaw);
    const moduleRegistry = new Map();
    const appMeta = transformAppData(appDataRaw, moduleRegistry);
    const expandedMeta = transformExpandedData(expandedRaw, moduleRegistry);
    metadata = { app: appMeta, expanded: expandedMeta };
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log('[build_quiz_bank] Wrote quiz metadata and modules.');
  } else {
    metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    console.log('[build_quiz_bank] Skipped metadata regeneration (AppData block not found).');
  }
  await generateFrontendBundles(metadata);
}

async function generateFrontendBundles(metadata) {
  const require = createRequire(import.meta.url);
  const quizzes = require(path.join(repoRoot, 'backend', 'data', 'quizzes'));
  const appData = quizzes.buildAppData();
  const expandedData = quizzes.buildExpandedQuizData();
  writeFrontendDataset(appData, expandedData);
}

function buildAppDataModule(appData) {
  const payload = JSON.stringify(appData, null, 2);
  return `// AUTO-GENERATED BY dev-tools/build_quiz_bank.js\n// DO NOT EDIT MANUALLY\nexport const appData = ${payload};\n\n(function(global) {\n    if (!global) {\n        return;\n    }\n    global.AppData = appData;\n})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));\n\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = appData;\n}\n\nexport default appData;\n`;
}

function buildExpandedModule(expandedData) {
  const payload = JSON.stringify(expandedData, null, 2);
  return `// AUTO-GENERATED BY dev-tools/build_quiz_bank.js\n// DO NOT EDIT MANUALLY\nexport const expandedQuizData = ${payload};\n\n(function(global) {\n    if (!global) {\n        return;\n    }\n    global.ExpandedQuizData = expandedQuizData;\n})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));\n\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = expandedQuizData;\n}\n\nexport default expandedQuizData;\n`;
}

function writeFrontendDataset(appData, expandedData) {
  const frontendDir = path.join(repoRoot, 'frontend', 'data');
  fs.mkdirSync(frontendDir, { recursive: true });
  const appDataPath = path.join(frontendDir, 'app_data.js');
  const quizDataPath = path.join(frontendDir, 'quiz_data.js');
  fs.writeFileSync(appDataPath, buildAppDataModule(appData));
  fs.writeFileSync(quizDataPath, buildExpandedModule(expandedData));
  console.log('[build_quiz_bank] Regenerated frontend data bundles.');
}

generateFiles().catch((err) => {
  console.error('[build_quiz_bank] Failed to build quiz bank:', err);
  process.exit(1);
});
