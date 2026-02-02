module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the result of 1,000 - 99?',
    answerOptions: [
      {
        text: '901',
        isCorrect: true,
        rationale: '1000 - 99 = 901.',
      },
      {
        text: '911',
        isCorrect: false,
        rationale: 'This is 1000-89.',
      },
      {
        text: '891',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '991',
        isCorrect: false,
        rationale: 'This is 1000-9.',
      },
    ],
    rationale: 'This is a basic subtraction problem. 1000 - 99 = 901.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'What is 25% of 200?',
    correctAnswer: '50',
    rationale:
      '25% is the same as \(\frac{1}{4}\). \(\frac{1}{4}\) of 200 is 200 / 4 = 50.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A jacket is marked down by 15% from its original price of $60. What is the sale price?',
    answerOptions: [
      {
        text: '9',
        isCorrect: false,
        rationale: 'This is the discount amount.',
      },
      {
        text: '$45',
        isCorrect: false,
        rationale: 'This is a 25% discount.',
      },
      {
        text: '51',
        isCorrect: true,
        rationale:
          'The discount is 0.15 \(\times\) 60 = 9. The sale price is 60 - 9 = 51.',
      },
      {
        text: '69',
        isCorrect: false,
        rationale: 'This is the price after a 15% markup.',
      },
    ],
    rationale:
      'First, calculate the discount: 15% of $60 is 0.15 \(\times\) 60 = 9. Then, subtract the discount from the original price: $60 - $9 = $51.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Evaluate: \(10 + 4 \\times 2^3\).',
    correctAnswer: '42',
    rationale:
      'Order of operations (PEMDAS): Exponents (\(2^3\)=8), Multiplication (4*8=32), Addition (10+32=42).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Which fraction is equivalent to 80%?',
    answerOptions: [
      {
        text: '\(\frac{3}{4}\)',
        isCorrect: false,
        rationale: '\(\frac{3}{4}\) is 75%.',
      },
      {
        text: '\(\frac{4}{5}\)',
        isCorrect: true,
        rationale:
          '80% is \(\frac{80}{100}\), which simplifies to \(\frac{4}{5}\).',
      },
      {
        text: '\(\frac{5}{6}\)',
        isCorrect: false,
        rationale: '\(\frac{5}{6}\) is approx 83.3%.',
      },
      {
        text: '\(\frac{7}{8}\)',
        isCorrect: false,
        rationale: '\(\frac{7}{8}\) is 87.5%.',
      },
    ],
    rationale:
      '80% means 80 out of 100, or \(\frac{80}{100}\). This fraction can be simplified by dividing both the numerator and denominator by 20, which results in \(\frac{4}{5}\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A company with 80 employees finds that 5% of them are late to work each day. How many employees are on time?',
    answerOptions: [
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is the number of employees who are late.',
      },
      {
        text: '75',
        isCorrect: false,
        rationale: 'This is the percentage of employees on time.',
      },
      {
        text: '76',
        isCorrect: true,
        rationale:
          'If 5% are late, 95% are on time. 95% of 80 is 0.95 * 80 = 76.',
      },
      {
        text: '84',
        isCorrect: false,
        rationale: 'This is 80+4.',
      },
    ],
    rationale:
      'First, find the percentage of employees who are on time: 100% - 5% = 95%. Then, calculate this number: 0.95 * 80 = 76 employees.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'What is the result of \(\frac{1}{2}\) - \(\frac{1}{3}\)?',
    correctAnswer: '\(\frac{1}{6}\)',
    rationale:
      'The common denominator is 6. \(\frac{1}{2}\) = \(\frac{3}{6}\) and \(\frac{1}{3}\) = \(\frac{2}{6}\). \(\frac{3}{6}\) - \(\frac{2}{6}\) = \(\frac{1}{6}\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Which of the following numbers is the largest?',
    answerOptions: [
      {
        text: '-100',
        isCorrect: false,
        rationale: 'This is the smallest number.',
      },
      {
        text: '-10',
        isCorrect: false,
        rationale: '-10 is larger than -100.',
      },
      {
        text: '-1',
        isCorrect: true,
        rationale: '-1 is the largest negative integer.',
      },
      {
        text: '-1000',
        isCorrect: false,
        rationale: 'This is smaller than -100.',
      },
    ],
    rationale:
      'When comparing negative numbers, the one with the smallest absolute value is the largest. -1 is closest to 0.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A car is traveling at 60 miles per hour. How many miles does it travel in 45 minutes?',
    correctAnswer: '45 miles',
    rationale:
      '45 minutes is \(\frac{3}{4}\) of an hour (0.75 hours). Distance = Speed \(\times\) Time = 60 mph \(\times\) 0.75 hours = 45 miles.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the scientific notation for 0.00058?',
    answerOptions: [
      {
        text: '\(5.8 \times 10^{4}\)',
        isCorrect: false,
        rationale: 'The exponent should be negative.',
      },
      {
        text: '\(5.8 \times 10^{-3}\)',
        isCorrect: false,
        rationale: 'The decimal moved 4 places.',
      },
      {
        text: '\(5.8 \times 10^{-4}\)',
        isCorrect: true,
        rationale:
          'The decimal point is moved 4 places to the right, so the exponent is -4.',
      },
      {
        text: '\(58 \times 10^{-5}\)',
        isCorrect: false,
        rationale: 'The number must be between 1 and 10.',
      },
    ],
    rationale:
      'To write a number in scientific notation, move the decimal point until there is one non-zero digit to its left. The decimal is moved 4 places to the right, so the exponent is -4.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'You have a loan of 5000 with a simple interest rate of 6% per year. How much interest will you pay in total over 4 years?',
    answerOptions: [
      {
        text: '\(300\)',
        isCorrect: false,
        rationale: 'This is the interest for one year.',
      },
      {
        text: '1200',
        isCorrect: true,
        rationale:
          'Interest = Principal * Rate * Time = 5000 * 0.06 * 4 = \(1200.\)',
      },
      {
        text: '6200',
        isCorrect: false,
        rationale: 'This is the total amount to be repaid.',
      },
      {
        text: '\(120\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Simple interest is calculated using the formula I = P * r * t. So, I = \(5000 * 0.06 * 4 =  1200.\)',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the next number in the pattern: 1, 4, 9, 16, 25, ...?',
    answerOptions: [
      {
        text: '30',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '36',
        isCorrect: true,
        rationale:
          'The pattern is the sequence of square numbers (\(1^2, 2^2, 3^2, 4^2, 5^2\)). The next is \(6^2\), which is 36.',
      },
      {
        text: '49',
        isCorrect: false,
        rationale: 'This is \(7^2\).',
      },
      {
        text: '64',
        isCorrect: false,
        rationale: 'This is \(8^2\).',
      },
    ],
    rationale:
      'This sequence consists of the squares of the positive integers. \(1^2=1, 2^2=4, 3^2=9, 4^2=16, 5^2=25\). The next term is \(6^2\), which is 36.',
    challenge_tags: ['math-1'],
  },
];
