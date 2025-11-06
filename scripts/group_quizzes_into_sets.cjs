#!/usr/bin/env node
/**
 * Group quizzes into sets of 3 per subject/category.
 *
 * Non-destructive: preserves original structure and adds a new `sets` object under each category.
 * Also sets a `title` field on each quiz to the computed set title.
 * Optionally adds a top-level `meta` summary.
 */

const fs = require('fs');
const path = require('path');

const TARGET_FILES = [
  'public/quizzes/math.quizzes.part1.json',
  'public/quizzes/math.quizzes.part2.json',
  'public/quizzes/science.quizzes.part1.json',
  'public/quizzes/science.quizzes.part2.json',
  'public/quizzes/rla.quizzes.part1.json',
  'public/quizzes/rla.quizzes.part2.json',
  'public/quizzes/social-studies.quizzes.json',
];

function toAbs(p) {
  return path.resolve(process.cwd(), p);
}

function groupIntoChunks(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function ensureObject(obj) {
  return obj && typeof obj === 'object' ? obj : {};
}

function collectQuizzesFromCategory(catObj) {
  // Supports two shapes:
  // 1) { topics: [ { id, title, quizzes: [quiz...] }, ... ] }
  // 2) [ quiz, quiz, ... ]
  const collected = [];
  if (Array.isArray(catObj)) {
    for (const q of catObj) {
      if (q && typeof q === 'object') collected.push({ quiz: q, topicId: null, topicTitle: null });
    }
  } else if (catObj && Array.isArray(catObj.topics)) {
    for (const t of catObj.topics) {
      const tId = t?.id ?? null;
      const tTitle = t?.title ?? null;
      const list = Array.isArray(t?.quizzes) ? t.quizzes : [];
      for (const q of list) {
        if (q && typeof q === 'object') collected.push({ quiz: q, topicId: tId, topicTitle: tTitle });
      }
    }
  }
  return collected;
}

function applySetTitles(collected, subject, categoryName) {
  const chunks = groupIntoChunks(collected, 3);
  const sets = {};
  let setIndex = 1;
  for (const chunk of chunks) {
    const setName = `Set ${setIndex}`;
    const setTitle = `${subject} — ${categoryName} ${setName}`;
    for (const item of chunk) {
      try {
        // Set or update a stable title; leave existing label intact
        item.quiz.title = setTitle;
      } catch {}
    }
    // Store direct references to the existing quiz objects to avoid duplication issues
    sets[setName] = chunk.map((x) => x.quiz);
    setIndex++;
  }
  return sets;
}

function addMetaSummary(data) {
  const categories = Object.keys(ensureObject(data.categories));
  let totalSets = 0;
  let totalQuestions = 0;
  let totalSetItems = 0;
  for (const catName of categories) {
    const cat = data.categories[catName];
    const sets = ensureObject(cat?.sets);
    const setNames = Object.keys(sets);
    totalSets += setNames.length;
    for (const s of setNames) {
      const arr = Array.isArray(sets[s]) ? sets[s] : [];
      totalSetItems += arr.length;
      for (const q of arr) {
        const questions = Array.isArray(q?.questions) ? q.questions : [];
        totalQuestions += questions.length;
      }
    }
  }
  data.meta = {
    totalCategories: categories.length,
    totalSets,
    averageQuestionsPerSet: totalSets ? Math.round(totalQuestions / totalSets) : 0,
    averageQuizzesPerSet: totalSets ? Math.round(totalSetItems / totalSets) : 0,
  };
}

function processFile(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8');
  if (!raw || !raw.trim()) {
    console.warn(`[skip] Empty or missing content: ${absPath}`);
    return { skipped: true };
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error(`[error] Failed to parse JSON: ${absPath}`);
    throw e;
  }
  const subject = data?.subject ?? 'Unknown Subject';
  const categories = ensureObject(data.categories);

  let report = [];

  for (const categoryName of Object.keys(categories)) {
    const catObj = categories[categoryName];
    const collected = collectQuizzesFromCategory(catObj);
    if (!collected.length) {
      // Ensure we still add an empty sets object for consistency
      if (catObj && typeof catObj === 'object') {
        catObj.sets = {};
      }
      report.push(`${categoryName}: 0 sets (no quizzes found)`);
      continue;
    }
    const sets = applySetTitles(collected, subject, categoryName);

    // Attach sets non-destructively
    if (catObj && typeof catObj === 'object') {
      catObj.sets = sets;
    } else if (Array.isArray(catObj)) {
      // If the category was an array, convert it to an object with `items` and `sets`
      categories[categoryName] = { items: catObj, sets };
    } else {
      // Fallback to object
      categories[categoryName] = { sets };
    }

    const setCount = Object.keys(sets).length;
    report.push(`${categoryName}: grouped into ${setCount} set(s)`);
  }

  // Optionally add meta summary
  addMetaSummary(data);

  // Write back
  fs.writeFileSync(absPath, JSON.stringify({ subject, categories, meta: data.meta }, null, 2));

  return { subject, report };
}

function main() {
  let totalProcessed = 0;
  for (const rel of TARGET_FILES) {
    const abs = toAbs(rel);
    if (!fs.existsSync(abs)) {
      console.warn(`[skip] File not found: ${rel}`);
      continue;
    }
    try {
      const { skipped, subject, report } = processFile(abs);
      if (skipped) continue;
      totalProcessed++;
      console.log(`\nProcessed: ${rel} [${subject}]`);
      for (const line of report) console.log(`  - ${line}`);
    } catch (e) {
      console.error(`[failed] ${rel}:`, e.message);
    }
  }
  console.log(`\nDone. Files processed: ${totalProcessed}`);
}

if (require.main === module) {
  main();
}
