module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Which of the following is equal to $5^3$?',
    answerOptions: [
      {
        text: '15',
        isCorrect: false,
        rationale: 'This is 5 * 3.',
      },
      {
        text: '25',
        isCorrect: false,
        rationale: 'This is $5^2$.',
      },
      {
        text: '125',
        isCorrect: true,
        rationale: '$5^3$ = 5 * 5 * 5 = 125.',
      },
      {
        text: '625',
        isCorrect: false,
        rationale: 'This is $5^4$.',
      },
    ],
    rationale:
      'The expression $5^3$ means 5 multiplied by itself three times: 5 x 5 x 5 = 125.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'Find the product of 12 and 0.5.',
    correctAnswer: '6',
    rationale: 'Multiplying by 0.5 is the same as dividing by 2. 12 * 0.5 = 6.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A sweater is on sale for 40% off the original price of $50. What is the sale price?',
    answerOptions: [
      {
        text: '$10',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '$20',
        isCorrect: false,
        rationale: 'This is the discount amount, not the sale price.',
      },
      {
        text: '$30',
        isCorrect: true,
        rationale:
          'The discount is 0.40 * $50 = $20. The sale price is $50 - $20 = $30.',
      },
      {
        text: '$70',
        isCorrect: false,
        rationale: 'This is the result of adding the discount.',
      },
    ],
    rationale:
      'First, calculate the discount amount: 40% of $50 is 0.40 * 50 = $20. Then, subtract the discount from the original price: $50 - $20 = $30.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Evaluate: $5 \\times (6 - 2) + 3^2$.',
    correctAnswer: '29',
    rationale:
      'Order of operations (PEMDAS): Parentheses (6-2=4), Exponents ($3^2$=9), Multiplication (5*4=20), Addition (20+9=29).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'What is the improper fraction equivalent of \\(3 \\frac{2}{5}\\)?',
    answerOptions: [
      {
        text: '\\(\\frac{10}{5}\\)',
        isCorrect: false,
        rationale: 'This is equal to 2.',
      },
      {
        text: '\\(\\frac{17}{5}\\)',
        isCorrect: true,
        rationale: '(3 * 5 + 2) / 5 = \\(\\frac{17}{5}\\).',
      },
      {
        text: '\\(\\frac{6}{5}\\)',
        isCorrect: false,
        rationale: 'This is 3*\\(\\frac{2}{5}\\).',
      },
      {
        text: '\\(\\frac{32}{5}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'To convert a mixed number to an improper fraction, multiply the whole number by the denominator, add the numerator, and keep the same denominator: (3 * 5 + 2) / 5 = \\(\\frac{17}{5}\\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A car depreciates in value by 15% in its first year. If the car was bought for $22,000, what is its value after one year?',
    answerOptions: [
      {
        text: '$3300',
        isCorrect: false,
        rationale: 'This is the amount of depreciation, not the final value.',
      },
      {
        text: '$18700',
        isCorrect: true,
        rationale:
          'The depreciation is 0.15 * $22,000 = $3,300. The new value is $22,000 - $3,300 = $18,700.',
      },
      {
        text: '$20500',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '$25300',
        isCorrect: false,
        rationale: 'This is the value after a 15% increase.',
      },
    ],
    rationale:
      'First, calculate the depreciation amount: 15% of $22,000 is 0.15 * 22000 = $3,300. Then, subtract this from the original price: $22,000 - $3,300 = $18,700.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the least common denominator for the fractions \\(\\frac{1}{6}\\) and \\(\\frac{3}{8}\\)?',
    correctAnswer: '24',
    rationale:
      'The least common denominator is the least common multiple (LCM) of the denominators 6 and 8. The LCM of 6 and 8 is 24.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the result of $-4 + 10$?',
    answerOptions: [
      {
        text: '-14',
        isCorrect: false,
        rationale: 'This is -4 - 10.',
      },
      {
        text: '-6',
        isCorrect: false,
        rationale: 'This is 4-10.',
      },
      {
        text: '6',
        isCorrect: true,
        rationale:
          'Starting at -4 on a number line and moving 10 units to the right brings you to 6.',
      },
      {
        text: '14',
        isCorrect: false,
        rationale: 'This is 4+10.',
      },
    ],
    rationale:
      'Adding a positive number to a negative number is like moving to the right on a number line. -4 + 10 = 6.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'An electronics store marks up the price of a game console by 30%. If the store bought the console for $250, what is the selling price?',
    correctAnswer: '$325',
    rationale:
      'The markup amount is 30% of $250, which is 0.30 * 250 = $75. The selling price is the original cost plus the markup: $250 + $75 = $325.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is \\(\\sqrt{144}\\)?',
    answerOptions: [
      {
        text: '10',
        isCorrect: false,
        rationale: '10*10 = 100.',
      },
      {
        text: '12',
        isCorrect: true,
        rationale: '12 * 12 = 144.',
      },
      {
        text: '14',
        isCorrect: false,
        rationale: '14*14 = 196.',
      },
      {
        text: '72',
        isCorrect: false,
        rationale: 'This is \\(\\frac{144}{2}\\).',
      },
    ],
    rationale:
      'The square root of 144 is the number that, when multiplied by itself, equals 144. That number is 12.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'You have \\(\\frac{3}{4}\\) of a pizza left. If you eat \\(\\frac{1}{3}\\) of the leftover pizza, what fraction of the original pizza did you eat?',
    answerOptions: [
      {
        text: '\\(\\frac{1}{4}\\)',
        isCorrect: true,
        rationale:
          'You ate \\(\\frac{1}{3}\\) of \\(\\frac{3}{4}\\), which is \\(\\frac{1}{3}\\) * \\(\\frac{3}{4}\\) = \\(\\frac{3}{12}\\) = \\(\\frac{1}{4}\\).',
      },
      {
        text: '\\(\\frac{1}{3}\\)',
        isCorrect: false,
        rationale: 'This is the fraction of the leftover pizza you ate.',
      },
      {
        text: '\\(\\frac{5}{12}\\)',
        isCorrect: false,
        rationale:
          'This is the result of \\(\\frac{3}{4}\\) - \\(\\frac{1}{3}\\).',
      },
      {
        text: '\\(\\frac{1}{2}\\)',
        isCorrect: false,
        rationale: "This is what's left after you ate.",
      },
    ],
    rationale:
      'To find the fraction of the original pizza you ate, you need to calculate \\(\\frac{1}{3}\\) of \\(\\frac{3}{4}\\). This is a multiplication problem: \\(\\frac{1}{3}\\) \\times \\(\\frac{3}{4}\\) = \\(\\frac{3}{12}\\), which simplifies to \\(\\frac{1}{4}\\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Which of these numbers is divisible by 3?',
    answerOptions: [
      {
        text: '134',
        isCorrect: false,
        rationale:
          'The sum of the digits is 1+3+4=8, which is not divisible by 3.',
      },
      {
        text: '205',
        isCorrect: false,
        rationale:
          'The sum of the digits is 2+0+5=7, which is not divisible by 3.',
      },
      {
        text: '312',
        isCorrect: true,
        rationale: 'The sum of the digits is 3+1+2=6, which is divisible by 3.',
      },
      {
        text: '401',
        isCorrect: false,
        rationale:
          'The sum of the digits is 4+0+1=5, which is not divisible by 3.',
      },
    ],
    rationale:
      'A number is divisible by 3 if the sum of its digits is divisible by 3. For 312, the sum of the digits is 3 + 1 + 2 = 6. Since 6 is divisible by 3, 312 is also divisible by 3.',
    challenge_tags: ['math-1'],
  },
];
