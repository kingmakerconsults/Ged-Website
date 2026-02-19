module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Which fraction is the largest?',
    answerOptions: [
      {
        text: '\\(\\frac{1}{2}\\)',
        isCorrect: false,
        rationale: '\\(\\frac{1}{2}\\) is equal to \\(\\frac{4}{8}\\).',
      },
      {
        text: '\\(\\frac{3}{8}\\)',
        isCorrect: false,
        rationale: '\\(\\frac{3}{8}\\) is smaller than \\(\\frac{5}{8}\\).',
      },
      {
        text: '\\(\\frac{5}{8}\\)',
        isCorrect: true,
        rationale:
          'With a common denominator, the fraction with the largest numerator is the largest. \\(\\frac{5}{8}\\) is greater than \\(\\frac{4}{8} = \\frac{1}{2}\\) and \\(\\frac{3}{8}\\).',
      },
      {
        text: '\\(\\frac{1}{4}\\)',
        isCorrect: false,
        rationale: '\\(\\frac{1}{4}\\) is equal to \\(\\frac{2}{8}\\).',
      },
    ],
    rationale:
      'To compare the fractions, find a common denominator, which is 8. The fractions become \\(\\frac{4}{8}, \\frac{3}{8}, \\frac{5}{8}, \\text{ and } \\frac{2}{8}\\). The largest is \\(\\frac{5}{8}\\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'What is 75% of 40?',
    correctAnswer: '30',
    rationale:
      'To find 75% of 40, convert the percentage to a decimal (0.75) and multiply by the number: 0.75 * 40 = 30.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Evaluate: \\(5 - (-3) + 2\\).',
    answerOptions: [
      {
        text: '0',
        isCorrect: false,
        rationale: 'This is the result if you subtract 3 and 2.',
      },
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is the result if you subtract 3 from 5.',
      },
      {
        text: '10',
        isCorrect: true,
        rationale:
          'Subtracting a negative is the same as adding: 5 + 3 + 2 = 10.',
      },
      {
        text: '6',
        isCorrect: false,
        rationale: 'This is the result of 5-3+2+2.',
      },
    ],
    rationale:
      'Subtracting a negative number is equivalent to addition. So, the expression becomes 5 + 3 + 2, which equals 10.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A lunch bill is $24.50. If you add a 15% tip, what is the total cost?',
    correctAnswer: '28.18',
    rationale:
      'First, calculate the tip: 15% of $24.50 is 0.15 * 24.50 = $3.675. Round to $3.68. Then add the tip to the bill: $24.50 + $3.68 = $28.18.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the result of \\(\\frac{2}{3} \\div \\frac{1}{4}\\)?',
    answerOptions: [
      {
        text: '\\(\\frac{1}{6}\\)',
        isCorrect: false,
        rationale: 'This is the result of multiplication, not division.',
      },
      {
        text: '\\(\\frac{3}{8}\\)',
        isCorrect: false,
        rationale: 'This is the result of inverting the first fraction.',
      },
      {
        text: '\\(\\frac{8}{3}\\)',
        isCorrect: true,
        rationale:
          'To divide by a fraction, multiply by its reciprocal: \\(\\frac{2}{3} \\times \\frac{4}{1} = \\frac{8}{3}\\).',
      },
      {
        text: '\\(\\frac{2}{12}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'To divide fractions, multiply the first fraction by the reciprocal of the second. So, \\(\frac{2}{3} \\times \frac{4}{1} = \frac{8}{3}\\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      "If a car's value depreciates by 10% each year, what is the value of a $20,000 car after 2 years?",
    answerOptions: [
      {
        text: '16,000',
        isCorrect: false,
        rationale:
          "This is a 20% total depreciation, but it doesn't account for compounding.",
      },
      {
        text: '\\(16,200\\)',
        isCorrect: true,
        rationale:
          'Year 1: $20,000 * 0.9 = 18,000. Year 2:  18,000 * 0.9 = 16,200.\\)',
      },
      {
        text: '18,000',
        isCorrect: false,
        rationale: 'This is the value after only one year.',
      },
      {
        text: '\\(19,800\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'After the first year, the value is 90% of the original: $20,000 * 0.90 = 18,000. After the second year, the value is 90% of the new value:  18,000 * 0.90 = 16,200.\\)',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'Order the following from least to greatest: 0.5, \\(\\frac{2}{5}\\), 45%, 0.42.',
    correctAnswer: '\\(\frac{2}{5}\\), 0.42, 45%, 0.5',
    rationale:
      'Convert all to decimals: \\(\\frac{2}{5} = 0.4\\), and \\(45\\% = 0.45\\). The order is 0.4, 0.42, 0.45, 0.5, which corresponds to \\(\\frac{2}{5}\\), 0.42, 45%, 0.5.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Which number is a prime number?',
    answerOptions: [
      {
        text: '9',
        isCorrect: false,
        rationale: '9 is divisible by 3.',
      },
      {
        text: '15',
        isCorrect: false,
        rationale: '15 is divisible by 3 and 5.',
      },
      {
        text: '17',
        isCorrect: true,
        rationale: '17 is only divisible by 1 and itself.',
      },
      {
        text: '21',
        isCorrect: false,
        rationale: '21 is divisible by 3 and 7.',
      },
    ],
    rationale:
      'A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 17 fits this definition.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question: 'What is the least common multiple (LCM) of 12 and 18?',
    correctAnswer: '36',
    rationale:
      'The multiples of 12 are 12, 24, 36, 48... The multiples of 18 are 18, 36, 54... The least common multiple is 36.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A computer is priced at 500. If the sales tax is 8%, what is the total cost?',
    answerOptions: [
      {
        text: '\\(40\\)',
        isCorrect: false,
        rationale: 'This is the sales tax amount, not the total cost.',
      },
      {
        text: '508',
        isCorrect: false,
        rationale: 'This is the result of an incorrect calculation.',
      },
      {
        text: '\\(540\\)',
        isCorrect: true,
        rationale:
          'The sales tax is \\(0.08 \\times 500 = 40\\). The total cost is $500 + 40 = 540\\).',
      },
      {
        text: '\\(900\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Calculate the sales tax: \\(8\\%\\) of 500 is 40. Add the tax to the price: $500 + 40 = 540\\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Simplify: \\(\\sqrt{64} + \\sqrt{36}\\).',
    answerOptions: [
      {
        text: '10',
        isCorrect: false,
        rationale: 'This is the square root of 100.',
      },
      {
        text: '14',
        isCorrect: true,
        rationale:
          'The square root of 64 is 8, and the square root of 36 is 6. 8 + 6 = 14.',
      },
      {
        text: '24',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '100',
        isCorrect: false,
        rationale: 'This is the sum of 64 and 36.',
      },
    ],
    rationale:
      'First, find the square roots: sqrt(64) = 8 and sqrt(36) = 6. Then add the results: 8 + 6 = 14.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question: 'What is \\(2^3 \\times 2^4\\)?',
    answerOptions: [
      {
        text: '\\(2^7\\)',
        isCorrect: true,
        rationale:
          'When multiplying powers with the same base, you add the exponents. 3 + 4 = 7.',
      },
      {
        text: '\\(2^{12}\\)',
        isCorrect: false,
        rationale: 'This is the result of multiplying the exponents.',
      },
      {
        text: '\\(4^7\\)',
        isCorrect: false,
        rationale: 'The base should not change.',
      },
      {
        text: '\\(4^{12}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'According to the laws of exponents, when you multiply two powers with the same base, you add the exponents. So, \\(2^3 \\times 2^4 = 2^{3+4} = 2^7\\).',
    challenge_tags: ['math-1'],
  },
];
