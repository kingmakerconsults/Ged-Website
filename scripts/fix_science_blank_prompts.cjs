#!/usr/bin/env node
/**
 * Fix science questions with missing/blank prompts by matching known answer choices
 * and injecting authored, unique question stems (no cloning of existing items).
 */
const fs = require('fs');
const path = require('path');

const QUIZ_DIR = path.resolve(__dirname, '..', 'public', 'quizzes');

function readJSON(fp){ return JSON.parse(fs.readFileSync(fp, 'utf8')); }
function writeJSON(fp, obj){ fs.writeFileSync(fp, JSON.stringify(obj, null, 2) + '\n', 'utf8'); }

const norm = (s) => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
const hasBlankPrompt = (q) => {
  const p = q?.prompt ?? q?.question ?? q?.stem ?? '';
  return typeof p !== 'string' || norm(p) === '';
};
function setPrompt(q, text){
  if ('prompt' in q) q.prompt = text; else if ('question' in q) q.question = text; else if ('stem' in q) q.stem = text; else q.prompt = text;
}
function getAnswerOptions(q){
  const ao = q?.answerOptions;
  if (Array.isArray(ao) && ao.every(o => o && typeof o.text === 'string')) return ao;
  const opts = q?.options || q?.answers || q?.choices;
  if (Array.isArray(opts) && opts.every(o => typeof o === 'string')) return opts.map((text,i)=>({ text, isCorrect: i===q?.correctAnswerIndex }));
  return null;
}
function getChoicesText(answerOptions){ return answerOptions.map(o => String(o.text||'').trim()); }
function getCorrectText(answerOptions, q){
  const idx = typeof q?.correctAnswerIndex === 'number' ? q.correctAnswerIndex : -1;
  if (idx >= 0 && idx < answerOptions.length) return String(answerOptions[idx].text || '').trim();
  const hit = answerOptions.find(o => o.isCorrect === true);
  return hit ? String(hit.text||'').trim() : null;
}
function ensureCorrectIndexByText(q, answerOptions, wanted){
  const idx = answerOptions.findIndex(o => norm(o.text) === norm(wanted));
  if (idx >= 0) q.correctAnswerIndex = idx;
}

// Choice patterns from screenshots
const P = {
  DNA_REL: [
    'DNA and genes are completely unrelated.',
    'DNA is a type of gene.',
    'A gene is a segment of DNA that codes for a specific product.',
    'A gene is larger than a DNA molecule.',
  ],
  LEVELS: [
    'Cell, Tissue, Organ, Organ System, Organism',
    'Tissue, Cell, Organ, Organism, Organ System',
    'Cell, Organ, Tissue, Organism, Organ System',
    'Organism, Organ System, Organ, Tissue, Cell',
  ],
  CARBON: [
    'Deforestation',
    'Burning fossil fuels',
    'Volcanic eruptions',
    'Photosynthesis',
  ],
  SHIVER: [
    "Reducing the body's core temperature",
    'Saving energy',
    'Increasing fluid balance',
    'Generating heat through muscle contractions',
  ],
  HETERO: [
    'Heterozygous for that gene',
    'Dominant for that gene',
    'Homozygous for that gene',
    'Recessive for that gene',
  ],
};

// Unique prompt variants per pattern
const VARIANTS = {
  DNA_REL: [
    'Which statement best describes the relationship between DNA and genes?',
    'Which option accurately explains how genes relate to DNA?',
    'Which choice correctly defines what a gene is in terms of DNA?',
    'Which statement is true about DNA and genes?',
  ],
  LEVELS: [
    'Which list shows the levels of biological organization from smallest to largest?',
    'Select the correct order of organization in living things, least complex to most complex.',
    'Which sequence correctly goes from cell to organism?',
    'Choose the correct progression of levels of organization in biology.',
  ],
  CARBON: {
    remove: [
      'Which process removes carbon dioxide from the atmosphere?',
      'Which process most directly takes CO2 out of the air?',
      'Which natural process reduces atmospheric carbon dioxide?',
      'Which process captures atmospheric CO2 into biomass?',
    ],
    add: [
      'Which human activity adds the most carbon dioxide to the atmosphere?',
      'Which action most directly increases atmospheric CO2 levels?',
      'Which of these releases large amounts of CO2 into the air?',
      'Which process contributes most to rising atmospheric CO2?',
    ],
  },
  SHIVER: [
    'What is the primary function of shivering in humans?',
    'Why does the body shiver when a person is cold?',
    'Shivering is a response that mainly serves what purpose?',
    'What is the main purpose of shivering as a thermoregulatory response?',
  ],
  HETERO: [
    'An individual with two different alleles for a gene is:',
    'What term describes having two different alleles for a trait?',
    'Which term applies when the pair of alleles for a gene are different?',
    'If a person has two different alleles at a gene locus, they are:',
  ],
};

function sameChoices(a,b){
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  return a.every((v,i)=> norm(v) === norm(b[i]));
}

function pickVariant(variants, usedSet){
  for (const v of variants){ if (!usedSet.has(v)) { usedSet.add(v); return v; } }
  // If all used, append a suffix to keep uniqueness
  const v = variants[0] + ' (revised)';
  usedSet.add(v);
  return v;
}

function fixQuizBlankPrompts(quiz){
  const qs = Array.isArray(quiz?.questions) ? quiz.questions : [];
  const used = { DNA_REL:new Set(), LEVELS:new Set(), CARBON_REMOVE:new Set(), CARBON_ADD:new Set(), SHIVER:new Set(), HETERO:new Set() };
  let fixed = 0;
  for (const q of qs){
    if (!q || typeof q !== 'object') continue;
    if (!hasBlankPrompt(q)) continue;
    const ao = getAnswerOptions(q); if (!ao) continue;
    const choices = getChoicesText(ao);

    if (sameChoices(choices, P.DNA_REL)){
      const prompt = pickVariant(VARIANTS.DNA_REL, used.DNA_REL);
      setPrompt(q, prompt);
      ensureCorrectIndexByText(q, ao, 'A gene is a segment of DNA that codes for a specific product.');
      if (!q.rationale) q.rationale = 'Genes are specific DNA segments that code for proteins/traits.';
      fixed++; continue;
    }
    if (sameChoices(choices, P.LEVELS)){
      const prompt = pickVariant(VARIANTS.LEVELS, used.LEVELS);
      setPrompt(q, prompt);
      ensureCorrectIndexByText(q, ao, 'Cell, Tissue, Organ, Organ System, Organism');
      if (!q.rationale) q.rationale = 'Biological organization proceeds from cells to tissues to organs to organ systems to organism.';
      fixed++; continue;
    }
    if (sameChoices(choices, P.CARBON)){
      // Choose add/remove branch by current correct marking if present
      const correct = getCorrectText(ao, q);
      if (correct && norm(correct) === norm('Burning fossil fuels')){
        const prompt = pickVariant(VARIANTS.CARBON.add, used.CARBON_ADD);
        setPrompt(q, prompt);
        ensureCorrectIndexByText(q, ao, 'Burning fossil fuels');
        if (!q.rationale) q.rationale = 'Burning fossil fuels releases CO2; photosynthesis removes it.';
      } else {
        const prompt = pickVariant(VARIANTS.CARBON.remove, used.CARBON_REMOVE);
        setPrompt(q, prompt);
        ensureCorrectIndexByText(q, ao, 'Photosynthesis');
        if (!q.rationale) q.rationale = 'Photosynthesis uses CO2 to build sugars, lowering atmospheric CO2.';
      }
      fixed++; continue;
    }
    if (sameChoices(choices, P.SHIVER)){
      const prompt = pickVariant(VARIANTS.SHIVER, used.SHIVER);
      setPrompt(q, prompt);
      ensureCorrectIndexByText(q, ao, 'Generating heat through muscle contractions');
      if (!q.rationale) q.rationale = 'Shivering increases heat production via rapid muscle contractions to warm the body.';
      fixed++; continue;
    }
    if (sameChoices(choices, P.HETERO)){
      const prompt = pickVariant(VARIANTS.HETERO, used.HETERO);
      setPrompt(q, prompt);
      ensureCorrectIndexByText(q, ao, 'Heterozygous for that gene');
      if (!q.rationale) q.rationale = 'Heterozygous means two different alleles; homozygous means two identical alleles.';
      fixed++; continue;
    }
  }
  return fixed;
}

function traverseAndFix(obj){
  let count = 0;
  const categories = obj?.categories || {};
  for (const cat of Object.values(categories)){
    const topics = Array.isArray(cat?.topics) ? cat.topics : [];
    for (const topic of topics){
      const quizzes = Array.isArray(topic?.quizzes) ? topic.quizzes : [];
      for (const quiz of quizzes){
        count += fixQuizBlankPrompts(quiz);
      }
    }
  }
  return count;
}

function main(){
  const files = fs.readdirSync(QUIZ_DIR).filter(f => /science.*\.json$/i.test(f)).map(f => path.join(QUIZ_DIR, f));
  let totalFixed = 0; let filesChanged = 0;
  for (const fp of files){
    const data = readJSON(fp);
    const before = JSON.stringify(data);
    const fixed = traverseAndFix(data);
    const after = JSON.stringify(data);
    if (fixed > 0 && after !== before){
      writeJSON(fp, data);
      filesChanged++; totalFixed += fixed;
      console.log(`Updated ${path.basename(fp)}: fixed ${fixed} blank prompt(s).`);
    }
  }
  console.log(`Done. Files changed: ${filesChanged}, total questions fixed: ${totalFixed}.`);
}

if (require.main === module) main();
