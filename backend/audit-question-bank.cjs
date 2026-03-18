#!/usr/bin/env node
/**
 * Audit the ai_question_bank in Postgres.
 * Run: node scripts/audit-question-bank.js
 */
require('dotenv').config({
  path: require('path').join(__dirname, '..', 'backend', '.env'),
});
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  // ── 1. Topic breakdown ─────────────────────────────────────────
  const topics = await pool.query(
    'SELECT subject, topic, COUNT(*) as count FROM ai_question_bank GROUP BY subject, topic ORDER BY subject, count DESC'
  );
  console.log('=== TOPIC BREAKDOWN ===');
  let curSubj = '';
  for (const r of topics.rows) {
    if (r.subject !== curSubj) {
      curSubj = r.subject;
      console.log('\n' + curSubj + ':');
    }
    console.log('  ' + (r.topic || '(no topic)') + ': ' + r.count);
  }

  // ── 2. Quality flags ──────────────────────────────────────────
  console.log('\n=== QUALITY FLAGS ===');

  const noOptions = await pool.query(
    "SELECT COUNT(*) FROM ai_question_bank WHERE question_json->'answerOptions' IS NULL OR jsonb_array_length(question_json->'answerOptions') = 0"
  );
  console.log('Questions with no answer options:', noOptions.rows[0].count);

  const noCorrect = await pool.query(
    "SELECT COUNT(*) FROM ai_question_bank WHERE NOT EXISTS (SELECT 1 FROM jsonb_array_elements(question_json->'answerOptions') elem WHERE (elem->>'isCorrect')::boolean = true)"
  );
  console.log('Questions with no correct answer:', noCorrect.rows[0].count);

  const noText = await pool.query(
    "SELECT COUNT(*) FROM ai_question_bank WHERE question_json->>'questionText' IS NULL OR LENGTH(question_json->>'questionText') < 10"
  );
  console.log('Questions with missing/short text:', noText.rows[0].count);

  const hasStimulus = await pool.query(
    'SELECT COUNT(*) FROM ai_question_bank WHERE has_stimulus = true'
  );
  console.log(
    'Questions with stimulus (passage/image):',
    hasStimulus.rows[0].count
  );

  // ── 3. Difficulty spread ───────────────────────────────────────
  const diff = await pool.query(
    'SELECT difficulty, COUNT(*) as count FROM ai_question_bank GROUP BY difficulty ORDER BY count DESC'
  );
  console.log('\nDifficulty spread:');
  for (const r of diff.rows) {
    console.log('  ' + (r.difficulty || 'unset') + ': ' + r.count);
  }

  // ── 4. Double-letter prefix check ─────────────────────────────
  const doubleLetter = await pool.query(
    "SELECT COUNT(*) FROM ai_question_bank WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(question_json->'answerOptions') elem WHERE elem->>'text' ~ '^[A-Da-d][.):]\\s')"
  );
  console.log(
    '\nQuestions with A./B./C./D. prefix in answer text:',
    doubleLetter.rows[0].count
  );

  // ── 5. Broken HTML / truncated questions ──────────────────────
  const brokenHtml = await pool.query(
    "SELECT COUNT(*) FROM ai_question_bank WHERE question_json->>'questionText' ~ '<[^>]*$' OR question_json->>'passage' ~ '<[^>]*$'"
  );
  console.log(
    'Questions with broken/truncated HTML:',
    brokenHtml.rows[0].count
  );

  // ── 6. Duplicate question text ────────────────────────────────
  const dupes = await pool.query(
    "SELECT COUNT(*) FROM (SELECT question_json->>'questionText' as qt, COUNT(*) as c FROM ai_question_bank GROUP BY qt HAVING COUNT(*) > 1) sub"
  );
  console.log(
    'Distinct question texts that appear more than once:',
    dupes.rows[0].count
  );

  // ── 7. Sample 3 questions per subject ─────────────────────────
  const subjects = [
    'Math',
    'Science',
    'Social Studies',
    'Reasoning Through Language Arts (RLA)',
  ];
  for (const subj of subjects) {
    const sample = await pool.query(
      "SELECT fingerprint, topic, difficulty, question_json->>'questionText' as text, jsonb_array_length(question_json->'answerOptions') as opt_count FROM ai_question_bank WHERE subject = $1 ORDER BY created_at DESC LIMIT 3",
      [subj]
    );
    console.log('\n--- Sample from ' + subj + ' ---');
    for (const r of sample.rows) {
      const preview = (r.text || '').replace(/\s+/g, ' ').slice(0, 120);
      console.log(
        '  [' +
          (r.difficulty || '?') +
          '] (' +
          r.opt_count +
          ' opts) ' +
          (r.topic || '') +
          ': ' +
          preview
      );
    }
  }

  // ── 8. Source model breakdown ─────────────────────────────────
  const models = await pool.query(
    'SELECT source_model, COUNT(*) as count FROM ai_question_bank GROUP BY source_model ORDER BY count DESC'
  );
  console.log('\n=== SOURCE MODEL BREAKDOWN ===');
  for (const r of models.rows) {
    console.log('  ' + (r.source_model || 'unknown') + ': ' + r.count);
  }

  // ── 9. item_type breakdown ────────────────────────────────────
  const types = await pool.query(
    'SELECT item_type, COUNT(*) as count FROM ai_question_bank GROUP BY item_type ORDER BY count DESC'
  );
  console.log('\n=== ITEM TYPE BREAKDOWN ===');
  for (const r of types.rows) {
    console.log('  ' + (r.item_type || 'unset') + ': ' + r.count);
  }

  await pool.end();
  console.log('\nDone.');
}

run().catch((e) => {
  console.error('FATAL:', e.message);
  process.exit(1);
});
