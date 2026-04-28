#!/usr/bin/env node
const path = require('path');
const { applyRulesToFile } = require('./propagate_rationale_rewrites.cjs');

const REPO = path.resolve(__dirname, '..');
const RULES_INDUSTRIAL = require('./phase_c_rules_industrial.cjs');
const RULES_COLD_WAR = require('./phase_c_rules_cold_war.cjs');
const RULES_MISC = require('./phase_c_rules_misc.cjs');
const RULES_EXTRAS = require('./phase_c_rules_extras.cjs');

const SS_TARGETS = [
  'backend/data/quizzes/social-studies/ss_us_hist_new_nation.js',
  'backend/data/quizzes/social-studies/ss_us_hist_new_nation_quiz1.js',
  'backend/data/quizzes/social-studies/ss_us_hist_new_nation_quiz2.js',
  'backend/data/quizzes/social-studies/ss_us_hist_new_nation_quiz3.js',
  'backend/data/quizzes/social-studies/ss_us_hist_industrial_america.js',
  'backend/data/quizzes/social-studies/ss_us_hist_industrial_america_quiz1.js',
  'backend/data/quizzes/social-studies/ss_us_hist_industrial_america_quiz2.js',
  'backend/data/quizzes/social-studies/ss_us_hist_industrial_america_quiz3.js',
  'backend/data/quizzes/social-studies/ss_us_hist_cold_war.js',
  'backend/data/quizzes/social-studies/ss_us_hist_cold_war_quiz1.js',
  'backend/data/quizzes/social-studies/ss_us_hist_cold_war_quiz2.js',
  'backend/data/quizzes/social-studies/ss_us_hist_cold_war_quiz3.js',
  'backend/data/quizzes/social-studies/ss_us_hist_divided_nation.js',
];

const RLA_TARGETS = [
  'backend/data/quizzes/rla/rla_info_structure_purpose.js',
  'backend/data/quizzes/rla/rla_info_graphics.js',
];

const SCI_MATH_TARGETS = [
  'backend/data/quizzes/science/sci_ged_ready_life_passages.js',
  'backend/data/quizzes/science/sci_physical_science_newtons_laws_10.js',
  'backend/data/quizzes/math/math_alg_expressions.js',
];

const ALL_TARGETS = [...SS_TARGETS, ...RLA_TARGETS, ...SCI_MATH_TARGETS];
const ALL_RULES = [
  ...RULES_INDUSTRIAL,
  ...RULES_COLD_WAR,
  ...RULES_MISC,
  ...RULES_EXTRAS,
];

let grand = 0;
for (const rel of ALL_TARGETS) {
  const abs = path.join(REPO, rel);
  try {
    const n = applyRulesToFile(abs, ALL_RULES);
    if (n > 0) console.log(`${n.toString().padStart(3)}  ${rel}`);
    grand += n;
  } catch (e) {
    console.error('FAIL', rel, e.message);
  }
}
console.log(`Total replacements: ${grand}`);
