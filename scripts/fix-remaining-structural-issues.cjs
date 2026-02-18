const fs = require('fs');
const path = require('path');

const root = process.cwd();

const targets = [
  'public/quizzes/math.quizzes.part2.json',
  'public/quizzes/science.quizzes.part1.json',
  'public/quizzes/social-studies.quizzes.part1.json',
  'public/quizzes/social-studies.extras.json',
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data)}\n`, 'utf8');
}

function walk(node, visitor) {
  if (Array.isArray(node)) {
    node.forEach((item) => walk(item, visitor));
    return;
  }
  if (!node || typeof node !== 'object') {
    return;
  }

  visitor(node);

  for (const value of Object.values(node)) {
    walk(value, visitor);
  }
}

const changes = {
  mathWrongDuplicate: 0,
  scienceGenotypeOption: 0,
  scienceGenotypeRecessiveOption: 0,
  scienceTtOption: 0,
  socialDuplicateOption: 0,
  extrasMissingQuestion: 0,
};

for (const relativePath of targets) {
  const absolutePath = path.join(root, relativePath);
  const data = readJson(absolutePath);

  walk(data, (q) => {
    if (!q || typeof q !== 'object') return;

    if (
      q.question ===
        'GED Challenge Scenario: A jacket is marked down by 15% from its original price of $60. What is the sale price?' &&
      Array.isArray(q.answerOptions)
    ) {
      for (const option of q.answerOptions) {
        if (option && option.text === '$51' && option.isCorrect === false) {
          option.text = '$45';
          option.rationale = 'This is the price after a 25% discount, not 15%.';
          changes.mathWrongDuplicate += 1;
          break;
        }
      }
    }

    if (
      typeof q.question === 'string' &&
      q.question.includes(
        'In a certain species of plant, the allele for purple flowers (P) is dominant over the allele for white flowers (p).'
      ) &&
      q.question.includes(
        'What will be the genotype of all the offspring in the first generation (F1)?'
      ) &&
      Array.isArray(q.answerOptions)
    ) {
      const option = q.answerOptions.find((o) => o && o.text === 'PP');
      if (option) {
        option.text = 'Homozygous dominant (two dominant alleles)';
        option.rationale =
          'This is incorrect because each offspring receives one dominant allele and one recessive allele in this cross.';
        changes.scienceGenotypeOption += 1;
      }

      const recessiveOption = q.answerOptions.find((o) => o && o.text === 'pp');
      if (recessiveOption) {
        recessiveOption.text = 'Homozygous recessive (two recessive alleles)';
        recessiveOption.rationale =
          'This would require every offspring to inherit two recessive alleles, which cannot happen in a PP × pp cross.';
        changes.scienceGenotypeRecessiveOption += 1;
      }
    }

    if (
      q.question ===
        'GED Evidence Challenge: In pea plants, the allele for tallness (T) is dominant over the allele for shortness (t). A plant that is homozygous dominant (TT) is crossed with a plant that is homozygous recessive (tt). What will be the genotype of all the offspring in the first generation (F1)?' &&
      Array.isArray(q.answerOptions)
    ) {
      const option = q.answerOptions.find(
        (o) => o && o.text === 'All will be TT.'
      );
      if (option) {
        option.text = 'All will be homozygous dominant.';
        option.rationale =
          'This is incorrect because the recessive parent contributes a t allele to every offspring.';
        changes.scienceTtOption += 1;
      }
    }

    if (
      q.type === 'multiple-choice-text' &&
      q.content &&
      q.content.questionText ===
        'The map labels “British gains” with a year. What year is shown for “British gains”?' &&
      Array.isArray(q.answerOptions)
    ) {
      let seen = 0;
      for (const option of q.answerOptions) {
        if (
          option &&
          option.text === 'Not enough information is shown to decide.'
        ) {
          seen += 1;
          if (seen === 2) {
            option.text = '1754';
            option.rationale =
              'Incorrect. The map legend ties British gains to 1763, not 1754.';
            changes.socialDuplicateOption += 1;
            break;
          }
        }
      }
    }

    if (
      q.type === 'multipleChoice' &&
      !q.question &&
      q.passage ===
        'A historian writing a book about the American Civil War is an example of what type of source?'
    ) {
      q.question = q.passage;
      delete q.passage;
      changes.extrasMissingQuestion += 1;
    }
  });

  writeJson(absolutePath, data);
}

console.log('Applied structural fixes:', changes);
