#!/usr/bin/env node
/**
 * CURATE STUB QUIZZES (math_quant_numbers, ss_us_hist_foundations)
 * Build 12 rigorous questions each using mixed difficulty, rationales, tags.
 */

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const QUIZ_ROOT = path.join(ROOT, 'backend', 'data', 'quizzes');

function writeQuiz(subjectFolder, quizId, questions) {
  const file = path.join(QUIZ_ROOT, subjectFolder, `${quizId}.js`);
  const header = `/**\n * Curated stub expansion: ${quizId}\n * Generated ${new Date().toISOString()}\n */\n\n`;
  fs.writeFileSync(
    file,
    `${header}module.exports = ${JSON.stringify(questions, null, 2)};\n`,
    'utf8'
  );
  return file;
}

function numberQuestions(qs) {
  return qs.map((q, i) => ({ ...q, questionNumber: i + 1 }));
}

function mathQuantNumbers() {
  const tag = ['math-1'];
  const qs = [
    {
      question: 'Which expression correctly represents seven more than 5?',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        { text: '5 + 7', rationale: 'Adds 7 to 5.', isCorrect: true },
        { text: '7 - 5', rationale: 'This subtracts.', isCorrect: false },
        { text: '5 - 7', rationale: 'This yields -2.', isCorrect: false },
        {
          text: '7 × 5',
          rationale: 'Multiplication, not addition.',
          isCorrect: false,
        },
      ],
    },
    {
      question: 'What is the value of 3(4 + 2)?',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        {
          text: '18',
          rationale: 'Inside parentheses 4+2=6, times 3=18.',
          isCorrect: true,
        },
        {
          text: '14',
          rationale: 'Likely added 4+2+3 incorrectly.',
          isCorrect: false,
        },
        {
          text: '12',
          rationale: 'Mistakenly multiplied 3×4 only.',
          isCorrect: false,
        },
        { text: '24', rationale: 'Used 3×4×2 incorrectly.', isCorrect: false },
      ],
    },
    {
      question: 'Which fraction is equivalent to 3/4?',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        {
          text: '6/8',
          rationale: 'Multiply numerator and denominator by 2.',
          isCorrect: true,
        },
        { text: '9/16', rationale: 'Incorrect scaling.', isCorrect: false },
        {
          text: '3/8',
          rationale: 'Denominator doubled only.',
          isCorrect: false,
        },
        { text: '12/20', rationale: 'Not equal: 12/20=3/5.', isCorrect: false },
      ],
    },
    {
      question: 'Solve: 15 - (3 × 2)',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        { text: '9', rationale: '3×2=6, 15-6=9.', isCorrect: true },
        {
          text: '21',
          rationale: 'Added instead of subtracting.',
          isCorrect: false,
        },
        {
          text: '12',
          rationale: 'Subtracted 3 then 2 separately.',
          isCorrect: false,
        },
        { text: '3', rationale: 'Misapplied operations.', isCorrect: false },
      ],
    },
    {
      question: 'How many eighths are in 1/2?',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        { text: '4/8', rationale: '1/2 equals 4/8.', isCorrect: true },
        { text: '2/8', rationale: '2/8 simplifies to 1/4.', isCorrect: false },
        { text: '6/8', rationale: 'This equals 3/4.', isCorrect: false },
        { text: '8/8', rationale: 'That is 1 whole.', isCorrect: false },
      ],
    },
    {
      question: 'Which number is a multiple of both 3 and 4?',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        { text: '12', rationale: 'LCM of 3 and 4.', isCorrect: true },
        { text: '16', rationale: 'Multiple of 4 only.', isCorrect: false },
        { text: '9', rationale: 'Multiple of 3 only.', isCorrect: false },
        { text: '6', rationale: 'Multiple of 3 only.', isCorrect: false },
      ],
    },
    {
      question: 'Convert 0.75 to a fraction in simplest form.',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        {
          text: '3/4',
          rationale: '0.75 = 75/100 = 3/4 simplified.',
          isCorrect: true,
        },
        { text: '1/4', rationale: '0.25 = 1/4.', isCorrect: false },
        { text: '7/8', rationale: '0.875 = 7/8.', isCorrect: false },
        {
          text: '6/8',
          rationale: 'Equivalent but not simplest (3/4).',
          isCorrect: false,
        },
      ],
    },
    {
      question: 'Find the mean of 4, 7, 9.',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        { text: '20/3', rationale: 'Sum=20, divide by 3.', isCorrect: true },
        { text: '7', rationale: 'Only picked middle value.', isCorrect: false },
        {
          text: '6',
          rationale: 'Incorrect sum or division.',
          isCorrect: false,
        },
        { text: '4', rationale: 'Lowest value only.', isCorrect: false },
      ],
    },
    {
      question: 'Which comparison is true?',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        {
          text: '0.5 = 1/2',
          rationale: 'Decimal equals fraction.',
          isCorrect: true,
        },
        { text: '0.5 = 1/3', rationale: '1/3 ≈ 0.333.', isCorrect: false },
        { text: '0.25 = 1/2', rationale: '1/2=0.5.', isCorrect: false },
        { text: '0.2 = 1/4', rationale: '1/4=0.25.', isCorrect: false },
      ],
    },
    {
      question: 'Solve: 18 ÷ 3 + 4',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        { text: '10', rationale: '18÷3=6, +4=10.', isCorrect: true },
        { text: '7', rationale: 'Added before division.', isCorrect: false },
        {
          text: '22',
          rationale: 'Multiplied instead of divided.',
          isCorrect: false,
        },
        {
          text: '9',
          rationale: 'Divided correctly but +3 not +4.',
          isCorrect: false,
        },
      ],
    },
    {
      question: 'Which ratio is equivalent to 2:3?',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        {
          text: '4:6',
          rationale: 'Multiply both terms by 2.',
          isCorrect: true,
        },
        {
          text: '2:6',
          rationale: 'Only denominator scaled.',
          isCorrect: false,
        },
        { text: '3:2', rationale: 'Inverted ratio.', isCorrect: false },
        { text: '6:8', rationale: '6:8 simplifies to 3:4.', isCorrect: false },
      ],
    },
    {
      question: 'Which number is prime?',
      type: 'text',
      challenge_tags: tag,
      answerOptions: [
        {
          text: '13',
          rationale: 'Only divisible by 1 and itself.',
          isCorrect: true,
        },
        { text: '12', rationale: 'Composite.', isCorrect: false },
        { text: '15', rationale: 'Composite (3×5).', isCorrect: false },
        { text: '9', rationale: 'Composite (3×3).', isCorrect: false },
      ],
    },
  ];
  return numberQuestions(qs);
}

function ssFoundations() {
  const tag = ['social-1'];
  const qs = [];
  // Mix of civics / founding docs reasoning
  qs.push({
    question:
      'What principle is emphasized in the Declaration excerpt about governments deriving “just powers from the consent of the governed”?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Popular sovereignty',
        rationale: 'People are the source of legitimate power.',
        isCorrect: true,
      },
      {
        text: 'Judicial supremacy',
        rationale: 'Not referenced in the excerpt.',
        isCorrect: false,
      },
      {
        text: 'Divine right monarchy',
        rationale: 'Opposite of popular consent.',
        isCorrect: false,
      },
      {
        text: 'Hereditary succession',
        rationale: 'Not a republican principle.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question:
      'Which document first established the separation of powers at the national level?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'U.S. Constitution',
        rationale: 'Framework dividing legislative, executive, judicial.',
        isCorrect: true,
      },
      {
        text: 'Declaration of Independence',
        rationale: 'Statement of grievances and principles.',
        isCorrect: false,
      },
      {
        text: 'Articles of Confederation',
        rationale: 'Created weak central gov without clear separation.',
        isCorrect: false,
      },
      {
        text: 'Bill of Rights',
        rationale: 'Amendments protecting liberties.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question:
      'What was a core weakness of the Articles of Confederation corrected by the Constitution?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Lack of power to tax',
        rationale: 'Constitution granted Congress taxing authority.',
        isCorrect: true,
      },
      {
        text: 'Overly powerful executive branch',
        rationale: 'Articles had no separate executive.',
        isCorrect: false,
      },
      {
        text: 'Excessive national judiciary',
        rationale: 'Articles had no national courts.',
        isCorrect: false,
      },
      {
        text: 'Guaranteed equal rights for all citizens',
        rationale: 'Rights framework incomplete until later documents.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question: 'Federalism refers to:',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Division of power between national and state governments',
        rationale: 'Shared and reserved powers define federalism.',
        isCorrect: true,
      },
      {
        text: 'A system of military rule',
        rationale: 'Unrelated.',
        isCorrect: false,
      },
      {
        text: 'Complete dominance by the national government',
        rationale: 'States retain significant authority.',
        isCorrect: false,
      },
      {
        text: 'Rule only by local town councils',
        rationale: 'Too narrow for federalism.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question:
      'Which principle prevents any one branch from becoming too powerful?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Checks and balances',
        rationale: 'Allows branches to limit each other.',
        isCorrect: true,
      },
      {
        text: 'Manifest destiny',
        rationale: 'Expansion ideology, not structural principle.',
        isCorrect: false,
      },
      {
        text: 'Isolationism',
        rationale: 'Foreign policy stance.',
        isCorrect: false,
      },
      {
        text: 'Judicial review alone',
        rationale: 'Part of system but not whole principle.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question: 'Why was adding a Bill of Rights critical to ratification?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'It protected individual liberties and eased Anti-Federalist concerns.',
        rationale: 'Core reason for adoption.',
        isCorrect: true,
      },
      {
        text: 'It created a powerful king-like executive.',
        rationale: 'Opposite of intent.',
        isCorrect: false,
      },
      {
        text: 'It eliminated state governments.',
        rationale: 'Federal balance preserved states.',
        isCorrect: false,
      },
      {
        text: 'It abolished all taxes.',
        rationale: 'No such provision.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question:
      '“Separation of Church and State” was articulated in a letter by which founder?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Thomas Jefferson',
        rationale: 'Letter to Danbury Baptists outlined concept.',
        isCorrect: true,
      },
      {
        text: 'George Washington',
        rationale: 'Farewell Address focused on unity and foreign affairs.',
        isCorrect: false,
      },
      {
        text: 'James Madison',
        rationale:
          'Advocated religious liberty but phrase linked to Jefferson.',
        isCorrect: false,
      },
      {
        text: 'John Adams',
        rationale: 'Not origin of phrase in this context.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question: 'What does “limited government” mean in the U.S. system?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Government powers are constrained by law and the Constitution.',
        rationale: 'Structural and legal limits apply.',
        isCorrect: true,
      },
      {
        text: 'Government can act without constitutional restrictions.',
        rationale: 'Contradicts principle.',
        isCorrect: false,
      },
      {
        text: 'Only state governments have authority.',
        rationale: 'Shared sovereignty exists.',
        isCorrect: false,
      },
      {
        text: 'Citizens cannot challenge laws.',
        rationale: 'Rights allow challenge and redress.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question: 'Which feature allows the Constitution to adapt over time?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Amendment process',
        rationale: 'Article V defines update mechanism.',
        isCorrect: true,
      },
      {
        text: 'Lifetime rule of presidents',
        rationale: 'Presidents serve limited terms.',
        isCorrect: false,
      },
      {
        text: 'Permanent state veto of all laws',
        rationale: 'No universal state veto exists.',
        isCorrect: false,
      },
      {
        text: 'Ban on judicial interpretation',
        rationale: 'Courts interpret laws and Constitution.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question: 'Judicial review empowers courts to:',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Invalidate laws violating the Constitution.',
        rationale: 'Established firmly in Marbury v. Madison.',
        isCorrect: true,
      },
      {
        text: 'Write new federal statutes.',
        rationale: 'Legislative power only.',
        isCorrect: false,
      },
      {
        text: 'Appoint members of Congress.',
        rationale: 'Separation of roles.',
        isCorrect: false,
      },
      {
        text: 'Ratify constitutional amendments alone.',
        rationale: 'Amendments follow Article V process.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question: 'The phrase “We the People” primarily reflects which principle?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'Popular sovereignty',
        rationale: 'Authority originates with the people.',
        isCorrect: true,
      },
      {
        text: 'Direct monarchy',
        rationale: 'Opposed in founding ideals.',
        isCorrect: false,
      },
      {
        text: 'Colonial mercantilism',
        rationale: 'Economic system unrelated.',
        isCorrect: false,
      },
      {
        text: 'Totalitarian rule',
        rationale: 'Antithetical to democratic consent.',
        isCorrect: false,
      },
    ],
  });
  qs.push({
    question: 'Why were enumerated powers listed for Congress?',
    type: 'text',
    challenge_tags: tag,
    answerOptions: [
      {
        text: 'To define and limit legislative authority.',
        rationale: 'Prevents unlimited power claim.',
        isCorrect: true,
      },
      {
        text: 'To guarantee unchecked executive action.',
        rationale: 'Opposite effect.',
        isCorrect: false,
      },
      {
        text: 'To abolish all state authority.',
        rationale: 'States retain reserved powers.',
        isCorrect: false,
      },
      {
        text: 'To ban future amendments.',
        rationale: 'No such ban; amendment process exists.',
        isCorrect: false,
      },
    ],
  });
  return numberQuestions(qs);
}

function main() {
  const mathQs = mathQuantNumbers();
  const ssQs = ssFoundations();
  const mathFile = writeQuiz('math', 'math_quant_numbers', mathQs);
  const ssFile = writeQuiz('social-studies', 'ss_us_hist_foundations', ssQs);
  console.log('Curated stub quizzes:');
  console.log('  ', mathFile, '→', mathQs.length, 'questions');
  console.log('  ', ssFile, '→', ssQs.length, 'questions');
}

main();
