#!/usr/bin/env node
/**
 * quiz-manifest.js
 *
 * Generates a complete manifest of every unique quiz across all data sources.
 * Run BEFORE and AFTER reorganization to verify zero quizzes are lost.
 *
 * Usage:  node scripts/quiz-manifest.js [--output manifest.json]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(import.meta.url);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeRead(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

function listJsFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.js') && !f.includes('.conflict-backup'))
    .map((f) => f.replace(/\.js$/, ''))
    .sort();
}

function tryRequire(p) {
  try {
    return requireCJS(p);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Source 1: Backend quiz JS files
// ---------------------------------------------------------------------------

function collectBackendFiles() {
  const quizzesDir = path.join(root, 'backend', 'data', 'quizzes');
  const subjects = {
    math: path.join(quizzesDir, 'math'),
    science: path.join(quizzesDir, 'science'),
    'social-studies': path.join(quizzesDir, 'social-studies'),
    rla: path.join(quizzesDir, 'rla'),
  };

  const results = {};
  for (const [subj, dir] of Object.entries(subjects)) {
    const files = listJsFiles(dir);
    results[subj] = files.map((id) => ({
      id,
      source: 'backend-js',
      subject: subj,
      file: path.join(dir, `${id}.js`),
      hasQuestions: null, // filled below
    }));
    // Check if file actually exports questions
    for (const entry of results[subj]) {
      try {
        const mod = requireCJS(entry.file);
        const arr = Array.isArray(mod) ? mod : mod?.questions || mod?.default;
        entry.hasQuestions = Array.isArray(arr) && arr.length > 0;
        entry.questionCount = Array.isArray(arr) ? arr.length : 0;
      } catch {
        entry.hasQuestions = false;
        entry.questionCount = 0;
      }
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Source 2: quiz_data.js (frontend base data)
// ---------------------------------------------------------------------------

async function collectQuizDataSets() {
  const filePath = path.join(root, 'frontend', 'data', 'quiz_data.js');
  const results = [];
  try {
    const mod = await import(pathToFileURL(filePath).href);
    const data = mod.expandedQuizData || mod.default;
    if (!data) return results;

    for (const [subjectName, subject] of Object.entries(data)) {
      const cats = subject?.categories || {};
      for (const [catName, cat] of Object.entries(cats)) {
        const topics = Array.isArray(cat?.topics) ? cat.topics : [];
        for (const topic of topics) {
          if (!topic) continue;
          // Quiz sets
          if (Array.isArray(topic.quizzes)) {
            for (const quiz of topic.quizzes) {
              const qid = quiz?.quizId || quiz?.id;
              if (!qid) continue;
              const qCount = Array.isArray(quiz?.questions)
                ? quiz.questions.length
                : 0;
              results.push({
                id: qid,
                source: 'quiz_data.js',
                subject: subjectName,
                category: catName,
                topicId: topic.id,
                topicTitle: topic.title,
                hasQuestions: qCount > 0,
                questionCount: qCount,
              });
            }
          }
          // Topic-level questions (no quizzes array)
          if (
            !Array.isArray(topic.quizzes) &&
            Array.isArray(topic.questions) &&
            topic.questions.length > 0
          ) {
            results.push({
              id: topic.id || `${catName}::${topic.title}`,
              source: 'quiz_data.js',
              subject: subjectName,
              category: catName,
              topicId: topic.id,
              topicTitle: topic.title,
              hasQuestions: true,
              questionCount: topic.questions.length,
            });
          }
        }
      }
    }
  } catch (e) {
    console.warn('[quiz-manifest] Could not load quiz_data.js:', e.message);
  }
  return results;
}

// ---------------------------------------------------------------------------
// Source 3: Public quiz JSON files (look for IDs not in backend)
// ---------------------------------------------------------------------------

function collectJsonOnlyQuizzes(backendIds) {
  const quizzesDir = path.join(root, 'public', 'quizzes');
  if (!fs.existsSync(quizzesDir)) return [];

  const results = [];
  const jsonFiles = fs
    .readdirSync(quizzesDir)
    .filter((f) => f.endsWith('.json'));

  for (const filename of jsonFiles) {
    try {
      const raw = safeRead(path.join(quizzesDir, filename));
      if (!raw) continue;
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object') continue;

      const subjectName = data.subject || filename.replace(/\..*$/, '');
      const cats = data.categories || {};
      for (const [catName, cat] of Object.entries(cats)) {
        const topics = Array.isArray(cat?.topics) ? cat.topics : [];
        for (const topic of topics) {
          if (!topic) continue;
          const topicId = topic.id;
          // Check quizzes inside topics
          if (Array.isArray(topic.quizzes)) {
            for (const quiz of topic.quizzes) {
              const qid = quiz?.quizId || quiz?.id;
              if (!qid) continue;
              if (backendIds.has(qid)) continue; // already in backend
              const qCount = Array.isArray(quiz?.questions)
                ? quiz.questions.length
                : 0;
              if (qCount === 0) continue;
              results.push({
                id: qid,
                source: `json:${filename}`,
                subject: subjectName,
                category: catName,
                topicId,
                topicTitle: topic.title,
                hasQuestions: true,
                questionCount: qCount,
              });
            }
          }
          // Topic-level questions
          if (topicId && !backendIds.has(topicId)) {
            const qCount = Array.isArray(topic.questions)
              ? topic.questions.length
              : 0;
            if (qCount > 0) {
              results.push({
                id: topicId,
                source: `json:${filename}`,
                subject: subjectName,
                category: catName,
                topicId,
                topicTitle: topic.title,
                hasQuestions: true,
                questionCount: qCount,
              });
            }
          }
        }
      }
    } catch {
      // skip unparseable
    }
  }

  // Deduplicate by id
  const seen = new Set();
  return results.filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Source 4: Workforce quizzes (separate subject)
// ---------------------------------------------------------------------------

function collectWorkforceQuizzes() {
  const wfPath = path.join(root, 'public', 'quizzes', 'workforce.quizzes.json');
  const results = [];
  try {
    const raw = safeRead(wfPath);
    if (!raw) return results;
    const data = JSON.parse(raw);
    const cats = data?.categories || {};
    for (const [catName, cat] of Object.entries(cats)) {
      const topics = Array.isArray(cat?.topics) ? cat.topics : [];
      for (const topic of topics) {
        if (!topic) continue;
        const id = topic.id || topic.title;
        const qCount = Array.isArray(topic.questions)
          ? topic.questions.length
          : 0;
        results.push({
          id,
          source: 'workforce.json',
          subject: 'Workforce Readiness',
          category: catName,
          topicTitle: topic.title,
          hasQuestions: qCount > 0,
          questionCount: qCount,
        });
      }
    }
  } catch {
    /* skip */
  }
  return results;
}

// ---------------------------------------------------------------------------
// Source 5: supplemental.topics.json entries (cross-reference)
// ---------------------------------------------------------------------------

function collectSupplementalEntries() {
  const stPath = path.join(
    root,
    'backend',
    'data',
    'quizzes',
    'supplemental.topics.json'
  );
  try {
    const raw = safeRead(stPath);
    if (!raw) return [];
    const entries = JSON.parse(raw);
    if (!Array.isArray(entries)) return [];
    return entries
      .map((e) => ({
        id: e?.topic?.id,
        subjectKey: e?.subjectKey,
        categoryName: e?.categoryName,
        title: e?.topic?.title,
        file: e?.topic?.file,
      }))
      .filter((e) => e.id);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const outputArg = process.argv.indexOf('--output');
  const outputPath =
    outputArg >= 0 && process.argv[outputArg + 1]
      ? path.resolve(process.argv[outputArg + 1])
      : path.join(root, 'quiz-manifest.json');

  console.log('=== Quiz Manifest Generator ===\n');

  // 1. Backend JS files
  console.log('Scanning backend quiz JS files...');
  const backendFiles = collectBackendFiles();
  const allBackendIds = new Set();
  const backendStats = {};
  for (const [subj, entries] of Object.entries(backendFiles)) {
    entries.forEach((e) => allBackendIds.add(e.id));
    const withQuestions = entries.filter((e) => e.hasQuestions);
    const empty = entries.filter((e) => !e.hasQuestions);
    backendStats[subj] = {
      total: entries.length,
      withQuestions: withQuestions.length,
      empty: empty.length,
    };
    console.log(
      `  ${subj}: ${entries.length} files (${withQuestions.length} with questions, ${empty.length} empty)`
    );
    if (empty.length) {
      console.log(`    Empty: ${empty.map((e) => e.id).join(', ')}`);
    }
  }

  // 2. quiz_data.js
  console.log('\nScanning quiz_data.js...');
  const quizDataSets = await collectQuizDataSets();
  const qdBySubject = {};
  for (const entry of quizDataSets) {
    const key = entry.subject;
    if (!qdBySubject[key]) qdBySubject[key] = [];
    qdBySubject[key].push(entry);
  }
  for (const [subj, entries] of Object.entries(qdBySubject)) {
    console.log(`  ${subj}: ${entries.length} quiz sets`);
  }

  // 3. JSON-only quizzes
  console.log('\nScanning public/quizzes/ for JSON-only quizzes...');
  const jsonOnly = collectJsonOnlyQuizzes(allBackendIds);
  if (jsonOnly.length) {
    console.log(`  Found ${jsonOnly.length} quizzes only in JSON files:`);
    jsonOnly.forEach((q) =>
      console.log(`    ${q.id} (${q.source}, ${q.questionCount} questions)`)
    );
  } else {
    console.log('  None found.');
  }

  // 4. Workforce
  console.log('\nScanning workforce quizzes...');
  const workforce = collectWorkforceQuizzes();
  console.log(`  ${workforce.length} workforce quizzes`);

  // 5. Supplemental cross-reference
  console.log('\nCross-referencing supplemental.topics.json...');
  const supplemental = collectSupplementalEntries();
  const supplementalIds = new Set(supplemental.map((e) => e.id));
  const backendNotInSupplemental = [];
  const supplementalNotInBackend = [];
  for (const id of allBackendIds) {
    if (!supplementalIds.has(id) && !id.startsWith('diag_')) {
      backendNotInSupplemental.push(id);
    }
  }
  for (const entry of supplemental) {
    if (!allBackendIds.has(entry.id)) {
      supplementalNotInBackend.push(entry.id);
    }
  }
  if (backendNotInSupplemental.length) {
    console.log(
      `  ${backendNotInSupplemental.length} backend files NOT in supplemental.topics.json:`
    );
    backendNotInSupplemental.forEach((id) => console.log(`    ${id}`));
  }
  if (supplementalNotInBackend.length) {
    console.log(
      `  ${supplementalNotInBackend.length} supplemental entries with NO backend file:`
    );
    supplementalNotInBackend.forEach((id) => console.log(`    ${id}`));
  }

  // Build unified manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    summary: {
      backendFiles: backendStats,
      quizDataSets: Object.fromEntries(
        Object.entries(qdBySubject).map(([k, v]) => [k, v.length])
      ),
      jsonOnlyQuizzes: jsonOnly.length,
      workforceQuizzes: workforce.length,
      supplementalEntries: supplemental.length,
      backendNotInSupplemental: backendNotInSupplemental.length,
      supplementalNotInBackend: supplementalNotInBackend.length,
    },
    totals: {
      math:
        (backendStats.math?.total || 0) +
        (qdBySubject.Math?.length || 0) +
        jsonOnly.filter((q) => q.subject?.toLowerCase().includes('math'))
          .length,
      science:
        (backendStats.science?.total || 0) + (qdBySubject.Science?.length || 0),
      socialStudies:
        (backendStats['social-studies']?.total || 0) +
        (qdBySubject['Social Studies']?.length || 0) +
        jsonOnly.filter((q) => q.subject?.toLowerCase().includes('social'))
          .length,
      rla:
        (backendStats.rla?.total || 0) +
        (qdBySubject['Reasoning Through Language Arts (RLA)']?.length || 0) +
        (qdBySubject.RLA?.length || 0),
      workforce: workforce.length,
    },
    quizzes: {
      backend: backendFiles,
      quizData: quizDataSets,
      jsonOnly,
      workforce,
      supplementalEntries: supplemental,
    },
  };

  manifest.totals.grandTotal =
    manifest.totals.math +
    manifest.totals.science +
    manifest.totals.socialStudies +
    manifest.totals.rla +
    manifest.totals.workforce;

  // Print summary
  console.log('\n=== TOTALS ===');
  console.log(`  Math:            ${manifest.totals.math}`);
  console.log(`  Science:         ${manifest.totals.science}`);
  console.log(`  Social Studies:  ${manifest.totals.socialStudies}`);
  console.log(`  RLA:             ${manifest.totals.rla}`);
  console.log(`  Workforce:       ${manifest.totals.workforce}`);
  console.log(`  ─────────────────────`);
  console.log(`  Grand Total:     ${manifest.totals.grandTotal}`);

  // Write manifest
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
