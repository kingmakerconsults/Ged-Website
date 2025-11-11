#!/usr/bin/env node
/**
 * EXPAND QUIZZES TO 12 QUESTIONS
 *
 * For each supplemental quiz file exporting <12 questions, top up to 12 by
 * borrowing questions from related quizzes:
 * - Prefer same base topic (id without _quizN/_setN suffix) within same subject
 * - Then same category within same subject
 * - Then any quiz in same subject as last resort
 *
 * Ensures:
 * - No duplicate questions (by question text + passage hash)
 * - Renumbers questionNumber sequentially starting at 1
 * - Preserves file header comments
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QUIZ_ROOT = path.join(ROOT, 'backend', 'data', 'quizzes');
const SUPPLEMENTAL = path.join(QUIZ_ROOT, 'supplemental.topics.json');

function log(msg, indent = 0) {
  console.log('  '.repeat(indent) + msg);
}

function loadSupplemental() {
  const data = JSON.parse(fs.readFileSync(SUPPLEMENTAL, 'utf8'));
  return data.map((entry) => ({
    ...entry,
    absFile: path.join(ROOT, entry.topic.file),
  }));
}

function baseKey(id) {
  // Remove trailing _quizN or _setN or _quiz_N style suffixes
  return id.replace(/_(quiz|set)[-_]?\d+$/i, '');
}

function makeQuestionKey(q) {
  const t = (q.question || '').trim().toLowerCase();
  const p = (q.passage || '').trim().toLowerCase();
  // keep small size key
  return t.slice(0, 200) + '|' + p.slice(0, 200);
}

function safeRequire(p) {
  try {
    delete require.cache[require.resolve(p)];
    return require(p);
  } catch {
    return null;
  }
}

function writeQuestionsBack(filePath, questions) {
  // Preserve header up to module.exports
  const original = fs.readFileSync(filePath, 'utf8');
  const parts = original.split('module.exports');
  const header = parts[0] || '/** Auto-generated */\n';
  const content = `${header}module.exports = ${JSON.stringify(
    questions,
    null,
    2
  )};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

function renumber(questions) {
  return questions.map((q, i) => ({ ...q, questionNumber: i + 1 }));
}

function buildPools(entries) {
  // Build lookup structures for donors
  const bySubject = new Map();
  const byCategory = new Map();
  const byBase = new Map();

  for (const e of entries) {
    const subject = e.subjectFolder;
    const catKey = `${subject}::${e.categoryName}`;
    const bKey = `${subject}::${baseKey(e.topic.id)}`;

    if (!bySubject.has(subject)) bySubject.set(subject, []);
    bySubject.get(subject).push(e);

    if (!byCategory.has(catKey)) byCategory.set(catKey, []);
    byCategory.get(catKey).push(e);

    if (!byBase.has(bKey)) byBase.set(bKey, []);
    byBase.get(bKey).push(e);
  }
  return { bySubject, byCategory, byBase };
}

function gatherDonorQuestions(targetEntry, entries, pools, needed) {
  const subject = targetEntry.subjectFolder;
  const catKey = `${subject}::${targetEntry.categoryName}`;
  const bKey = `${subject}::${baseKey(targetEntry.topic.id)}`;
  const collected = [];

  // Helper to push unique questions from an entry
  const pushFrom = (entry, avoidSet) => {
    const arr = safeRequire(entry.absFile);
    if (!Array.isArray(arr)) return;
    for (const q of arr) {
      const key = makeQuestionKey(q);
      if (!avoidSet.has(key)) {
        collected.push(q);
        avoidSet.add(key);
        if (collected.length >= needed) return;
      }
    }
  };

  // Build avoidSet from target's existing questions
  const existing = safeRequire(targetEntry.absFile) || [];
  const avoidSet = new Set(existing.map(makeQuestionKey));

  // 1) Same base topic
  const baseList = pools.byBase.get(bKey) || [];
  for (const e of baseList) {
    if (e.absFile === targetEntry.absFile) continue;
    if (collected.length >= needed) break;
    pushFrom(e, avoidSet);
  }

  // 2) Same category
  if (collected.length < needed) {
    const catList = pools.byCategory.get(catKey) || [];
    for (const e of catList) {
      if (e.absFile === targetEntry.absFile) continue;
      if (baseList.includes(e)) continue;
      if (collected.length >= needed) break;
      pushFrom(e, avoidSet);
    }
  }

  // 3) Same subject
  if (collected.length < needed) {
    const subjList = pools.bySubject.get(subject) || [];
    for (const e of subjList) {
      if (e.absFile === targetEntry.absFile) continue;
      if (collected.length >= needed) break;
      pushFrom(e, avoidSet);
    }
  }

  return collected.slice(0, needed);
}

function main() {
  log('🚀 Expanding all quizzes to at least 12 questions...\n');
  const supplemental = loadSupplemental();
  const pools = buildPools(supplemental);

  let updatedFiles = 0;
  const updatedDetails = [];

  for (const entry of supplemental) {
    const arr = safeRequire(entry.absFile);
    if (!Array.isArray(arr)) continue; // skip non-array or invalid
    const current = arr.length;
    if (current >= 12) continue;

    const needed = 12 - current;
    const donors = gatherDonorQuestions(entry, supplemental, pools, needed);
    if (donors.length === 0) {
      log(`⚠️  Could not find donors for ${entry.topic.id} (${current}Q)`, 1);
      continue;
    }

    // Merge existing + donors and renumber
    const merged = renumber([...arr, ...donors]);
    writeQuestionsBack(entry.absFile, merged);
    updatedFiles++;
    updatedDetails.push({
      id: entry.topic.id,
      from: current,
      to: merged.length,
      file: entry.topic.file,
    });
  }

  log('\n📊 Results:');
  log(`Files updated: ${updatedFiles}`, 1);
  if (updatedDetails.length) {
    log('\n📋 Updated (first 10):', 1);
    updatedDetails
      .slice(0, 10)
      .forEach((d) => log(`${d.id}: ${d.from}Q → ${d.to}Q (${d.file})`, 2));
    if (updatedDetails.length > 10)
      log(`... and ${updatedDetails.length - 10} more`, 2);
  }
  log('\n✅ Expansion complete!');
}

main();
