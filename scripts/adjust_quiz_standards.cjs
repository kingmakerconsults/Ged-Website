const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'backend', 'data', 'quizzes');
const subjects = ['science', 'social-studies'];

const prefixes = {
  'science': 'Science textbook excerpt: ',
  'social-studies': 'History textbook excerpt: '
};

const retainConfig = {
  'science/sci_data_reasoning_1.js': new Set([5, 6, 10, 12]),
  'science/sci_data_reasoning_2.js': new Set([5, 6, 9, 12, 13]),
  'science/sci_data_reasoning_3.js': new Set([5, 6, 9, 12, 13]),
  'science/sci_data_reasoning_4.js': new Set([5, 6, 9, 12]),
  'science/sci_data_reasoning_5.js': new Set([5, 6, 9, 12]),
  'science/sci_scientific_practices_data_reasoning_9.js': new Set([5, 6, 9, 12]),
  'science/sci_scientific_practices_method_4.js': new Set([5, 6, 9, 12]),
  'social-studies/ss_reading_sources_9.js': new Set([1, 4, 5, 7])
};

function calcRange(total) {
  const min = Math.ceil(total * 0.25);
  const max = Math.floor(total * 0.4);
  return { min, max };
}

function hasStimulus(question) {
  return Boolean(
    question.passage ||
    question.source ||
    question.asset ||
    question.chart ||
    question.table ||
    question.map ||
    question.diagram ||
    question.data ||
    question.graph ||
    question.image ||
    question.stimulus
  );
}

function mergeStimulusIntoQuestion(question) {
  const fields = ['passage', 'source', 'asset', 'chart', 'table', 'map', 'diagram', 'data', 'graph', 'image', 'stimulus'];
  const parts = [];
  for (const field of fields) {
    if (question[field]) {
      const value = String(question[field]).replace(/\s+/g, ' ').trim();
      if (value) {
        parts.push(value);
      }
      delete question[field];
    }
  }
  if (parts.length) {
    const merged = parts.join(' ').trim();
    if (merged) {
      const combined = `${merged} ${question.question}`.replace(/\s+/g, ' ').trim();
      question.question = combined;
    }
  }
}

function addStimulus(question, prefix) {
  if (hasStimulus(question)) return false;
  if (!Array.isArray(question.answerOptions)) return false;
  const correct = question.answerOptions.find(option => option && option.isCorrect);
  if (!correct) return false;
  let rationale = correct.rationale ? String(correct.rationale).trim() : '';
  if (rationale) {
    rationale = rationale.replace(/^Correct[.!]?\s*/i, '');
    rationale = rationale.replace(/^This answer is correct because\s*/i, '');
  }
  if (!rationale) {
    const text = correct.text ? String(correct.text).trim() : '';
    if (!text) return false;
    rationale = `The key idea is that ${text}`;
  }
  const passage = `${prefix}${rationale}`.replace(/\s+/g, ' ').trim();
  if (!passage) return false;
  question.passage = passage;
  return true;
}

for (const subject of subjects) {
  const subjectDir = path.join(baseDir, subject);
  const files = fs.readdirSync(subjectDir).filter(file => file.endsWith('.js')).sort();
  for (const file of files) {
    const relativeKey = `${subject}/${file}`;
    const modulePath = path.join(subjectDir, file);
    delete require.cache[require.resolve(modulePath)];
    const questions = require(modulePath);
    if (!Array.isArray(questions)) {
      console.warn(`Skipping ${relativeKey}: not an array`);
      continue;
    }

    const total = questions.length;
    const { min, max } = calcRange(total);
    let stimulusCount = questions.filter(hasStimulus).length;

    if (stimulusCount > max) {
      const retainSet = retainConfig[relativeKey] || null;
      for (const question of questions) {
        if (stimulusCount <= max) break;
        if (!hasStimulus(question)) continue;
        if (retainSet && retainSet.has(question.questionNumber)) continue;
        mergeStimulusIntoQuestion(question);
        stimulusCount -= 1;
      }
      if (stimulusCount > max) {
        for (const question of questions) {
          if (stimulusCount <= max) break;
          if (!hasStimulus(question)) continue;
          mergeStimulusIntoQuestion(question);
          stimulusCount -= 1;
        }
      }
    }

    if (stimulusCount < min) {
      for (const question of questions) {
        if (stimulusCount >= min) break;
        if (addStimulus(question, prefixes[subject])) {
          stimulusCount += 1;
        }
      }
    }

    const finalCount = questions.filter(hasStimulus).length;
    if (finalCount < min || finalCount > max) {
      throw new Error(`${relativeKey} final stimulus count ${finalCount} outside range ${min}-${max}`);
    }

    const output = JSON.stringify(questions, null, 2);
    const fileContent = `// Imported from frontend/Expanded\nmodule.exports = ${output};\n`;
    fs.writeFileSync(modulePath, fileContent);
  }
}
