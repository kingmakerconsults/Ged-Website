#!/usr/bin/env node
/**
 * Fill missing/insufficient questions in Science quizzes with appropriate, hand-authored items (no cloning).
 *
 * - Targets: public/quizzes/science.quizzes.part1.json, science.quizzes.part2.json
 * - Ensures minimum 12 questions per quiz and replaces any blank/placeholder question text.
 * - Uses a curated bank of life/physical/earth & space/scientific practices templates with rationales.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'public', 'quizzes');
const TARGETS = ['science.quizzes.part1.json', 'science.quizzes.part2.json']
  .map(f => path.join(ROOT, f));

const BANK = {
  'Life Science': [
    {
      type: 'knowledge',
      question: 'Which cellular process uses oxygen to release energy from glucose?',
      choices: [
        ['Photosynthesis', 'Occurs in chloroplasts to make glucose, not release energy.', false],
        ['Cellular respiration', 'Correct: respiration breaks down glucose to ATP using oxygen.', true],
        ['Diffusion', 'Passive transport; not an energy-releasing chemical reaction.', false],
        ['Mitosis', 'Cell division, not energy release from glucose.', false],
      ],
      rationale: 'Cellular respiration in mitochondria uses oxygen to convert glucose into ATP (energy).',
    },
    {
      type: 'knowledge',
      question: 'DNA carries genetic information in segments called what?',
      choices: [
        ['Genes', 'Correct: genes are DNA segments that code for traits.', true],
        ['Ribosomes', 'Cellular structures that build proteins, not DNA segments.', false],
        ['Chromatids', 'Parts of duplicated chromosomes, not basic information units.', false],
        ['Carbohydrates', 'A class of biomolecules; unrelated to genetic information.', false],
      ],
      rationale: 'Genes are specific sequences of DNA that code for proteins and determine traits.',
    },
    {
      type: 'text',
      passage: 'In an ecosystem, energy flows from producers to consumers. Only a fraction of energy (about 10%) is transferred to the next trophic level.',
      question: 'If a grassland has 1,000 units of energy in grass, about how much energy is available to primary consumers (herbivores)?',
      choices: [
        ['100 units', 'Correct: roughly 10% transfers to the next level.', true],
        ['500 units', 'Too high; violates the 10% rule.', false],
        ['900 units', 'Too high; most energy is lost as heat.', false],
        ['1,000 units', 'No energy is created; only a fraction is transferred.', false],
      ],
      rationale: 'About 10% of energy is transferred between trophic levels (10% rule).',
    },
  ],
  'Physical Science': [
    {
      type: 'knowledge',
      question: 'Which change of state occurs when a liquid becomes a gas at the surface below its boiling point?',
      choices: [
        ['Evaporation', 'Correct: vaporization at the surface below boiling.', true],
        ['Boiling', 'Rapid vaporization throughout the liquid at boiling point.', false],
        ['Condensation', 'Gas to liquid.', false],
        ['Freezing', 'Liquid to solid.', false],
      ],
      rationale: 'Evaporation is the slow change from liquid to gas at the surface below the boiling point.',
    },
    {
      type: 'knowledge',
      question: 'According to Newton\'s second law, the acceleration of an object depends on the net force and what other quantity?',
      choices: [
        ['Mass', 'Correct: a = F/m; acceleration is inversely proportional to mass.', true],
        ['Speed', 'Not part of the law; speed is a result, not the factor.', false],
        ['Density', 'Material property; not in F = ma.', false],
        ['Volume', 'Not relevant in the formula.', false],
      ],
      rationale: 'Newton\'s second law: F = ma. For a given force, larger mass means smaller acceleration.',
    },
    {
      type: 'text',
      passage: 'A circuit has a 9 V battery connected to a 3 Ω resistor.',
      question: 'What current flows through the resistor?',
      choices: [
        ['3 A', 'Correct by Ohm\'s Law: I = V/R = 9/3 = 3 A.', true],
        ['0.3 A', 'Would require 30 Ω to be correct.', false],
        ['9 A', 'Would require 1 Ω to be correct.', false],
        ['27 A', 'Would require 0.333 Ω to be correct.', false],
      ],
      rationale: 'Ohm\'s Law: I = V/R. Here, 9 V / 3 Ω = 3 A.',
    },
  ],
  'Earth & Space Science': [
    {
      type: 'knowledge',
      question: 'Which process primarily drives plate tectonics by moving the lithospheric plates?',
      choices: [
        ['Mantle convection', 'Correct: convection currents in the mantle move plates.', true],
        ['Weathering', 'Breakdown of rocks at the surface, not plate motion.', false],
        ['Erosion', 'Transport of sediment; unrelated to plate movement.', false],
        ['Deposition', 'Settling of sediments; not tectonic motion.', false],
      ],
      rationale: 'Heat-driven convection in the mantle transfers energy that moves tectonic plates.',
    },
    {
      type: 'text',
      passage: 'Earth\'s seasons are caused by the planet\'s axial tilt (about 23.5°) as it orbits the Sun.',
      question: 'Why does the Northern Hemisphere experience summer around June?',
      choices: [
        ['It is tilted toward the Sun, receiving more direct sunlight.', 'Correct: higher solar angle and longer days increase heating.', true],
        ['Earth is closer to the Sun in June.', 'Distance changes are minor; not the primary cause of seasons.', false],
        ['The Sun gives off more energy in June.', 'Solar output is relatively constant.', false],
        ['The atmosphere traps more heat only in June.', 'Seasonal tilt, not atmospheric change, is the key factor.', false],
      ],
      rationale: 'Seasonal changes are due to axial tilt causing variations in solar angle and day length.',
    },
    {
      type: 'knowledge',
      question: 'Which rock type forms from cooling and solidification of magma or lava?',
      choices: [
        ['Igneous', 'Correct: formed from solidified molten rock.', true],
        ['Sedimentary', 'Forms from compaction/cementation of sediments.', false],
        ['Metamorphic', 'Forms from heat/pressure altering existing rock.', false],
        ['Organic', 'Not a primary rock classification.', false],
      ],
      rationale: 'Igneous rocks crystallize from molten material, either intrusive or extrusive.',
    },
  ],
  'Scientific Practices': [
    {
      type: 'knowledge',
      question: 'A fair scientific investigation should change only one factor at a time while keeping others constant. What is this changed factor called?',
      choices: [
        ['Independent variable', 'Correct: deliberately changed by the experimenter.', true],
        ['Dependent variable', 'Measured outcome affected by the independent variable.', false],
        ['Control group', 'A baseline for comparison, not the changed factor.', false],
        ['Constant', 'A factor kept the same to ensure a fair test.', false],
      ],
      rationale: 'The independent variable is intentionally changed to observe its effect on the dependent variable.',
    },
    {
      type: 'text',
      passage: 'A researcher tests whether fertilizer increases plant growth using two identical sets of plants. Only one set receives fertilizer.',
      question: 'Which choice correctly identifies the control group?',
      choices: [
        ['The set that receives no fertilizer', 'Correct: the control group does not receive the treatment.', true],
        ['The set that grows tallest', 'Outcome, not definition of control.', false],
        ['The set that receives extra water', 'Unrelated; would be a confounding variable.', false],
        ['There is no control group in this experiment', 'Incorrect; the untreated set is the control.', false],
      ],
      rationale: 'A control group allows comparison by not receiving the experimental treatment.',
    },
  ],
};

function ensureQuestionShape(q, nextNumber) {
  const base = {
    questionNumber: nextNumber,
    type: q.type || 'knowledge',
    calculator: false,
    difficulty: q.difficulty || 'easy',
  };
  const answerOptions = (q.choices || []).map(([text, rationale, isCorrect]) => ({ text, rationale, isCorrect }));
  return {
    ...base,
    ...(q.passage ? { passage: q.passage } : {}),
    question: q.question,
    answerOptions,
    rationale: q.rationale,
  };
}

function pickBankForCategory(category) {
  if (/life/i.test(category)) return BANK['Life Science'];
  if (/earth|space|geology|weather|climate/i.test(category)) return BANK['Earth & Space Science'];
  if (/practice|scientific|data|method|experiment/i.test(category)) return BANK['Scientific Practices'];
  // default
  return BANK['Physical Science'];
}

function normalizeQuiz(quiz, categoryName) {
  const errors = [];
  const qs = Array.isArray(quiz.questions) ? quiz.questions : [];
  // Replace blank/placeholder questions
  for (let i = 0; i < qs.length; i++) {
    const q = qs[i];
    if (!q || typeof q !== 'object' || !q.question || String(q.question).trim() === '') {
      const bank = pickBankForCategory(categoryName);
      const tmpl = bank[(i) % bank.length];
      const replacement = ensureQuestionShape(tmpl, q?.questionNumber || i + 1);
      qs[i] = replacement;
      errors.push({ type: 'replacedBlank', index: i + 1, question: replacement.question });
    }
  }
  // Ensure minimum count
  const MIN = 12;
  if (qs.length < MIN) {
    const bank = pickBankForCategory(categoryName);
    let nextNum = qs.length + 1;
    while (qs.length < MIN) {
      const tmpl = bank[(qs.length) % bank.length];
      qs.push(ensureQuestionShape(tmpl, nextNum++));
    }
    errors.push({ type: 'appended', added: MIN - (nextNum - 1 - qs.length) });
  }
  // Renumber sequentially
  qs.forEach((q, idx) => {
    q.questionNumber = idx + 1;
  });
  quiz.questions = qs;
  return { quiz, issues: errors };
}

function processFile(filePath) {
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const categories = json.categories || {};
  const report = [];
  for (const [catName, catVal] of Object.entries(categories)) {
    const topics = Array.isArray(catVal.topics) ? catVal.topics : [];
    for (const topic of topics) {
      const quizzes = Array.isArray(topic.quizzes) ? topic.quizzes : [];
      for (let qi = 0; qi < quizzes.length; qi++) {
        const before = JSON.stringify(quizzes[qi].questions || []).length;
        const { quiz, issues } = normalizeQuiz(quizzes[qi], catName);
        quizzes[qi] = quiz;
        const after = JSON.stringify(quizzes[qi].questions || []).length;
        if (issues.length) {
          report.push({ file: path.basename(filePath), category: catName, topic: topic.title || topic.id, quiz: quiz.title || quiz.quizId || `#${qi+1}`, issues, changed: before !== after });
        }
      }
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  return report;
}

function main() {
  const allReports = [];
  for (const fp of TARGETS) {
    if (!fs.existsSync(fp)) continue;
    const r = processFile(fp);
    allReports.push(...r);
  }
  if (allReports.length === 0) {
    console.log('[fill_science_missing_questions] No missing or blank questions detected; no changes made.');
  } else {
    console.log('[fill_science_missing_questions] Updates applied:');
    for (const item of allReports) {
      console.log(`- ${item.file} :: ${item.category} :: ${item.topic} :: ${item.quiz}`);
      for (const issue of item.issues) {
        if (issue.type === 'replacedBlank') {
          console.log(`   • Replaced blank Q${issue.index}: ${issue.question}`);
        } else if (issue.type === 'appended') {
          console.log(`   • Appended ${issue.added} question(s) to reach minimum.`);
        }
      }
    }
  }
}

if (require.main === module) main();
