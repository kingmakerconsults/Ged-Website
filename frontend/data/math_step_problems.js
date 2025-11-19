// frontend/data/math_step_problems.js
// Converted from module export to plain const + window assignment for UMD/Babel environment.
const MATH_STEP_PROBLEMS = [
  // LINEAR EQUATIONS
  {
    id: 'linear_1',
    topic: 'Linear Equations',
    difficulty: 'easy',
    problemText: 'Solve for x: 2x + 5 = 17',
    formattedProblem: '2x + 5 = 17',
    steps: [
      {
        explanation: 'Subtract 5 from both sides.',
        expression: '2x = 12',
      },
      {
        explanation: 'Divide both sides by 2.',
        expression: 'x = 6',
      },
    ],
    finalAnswerText: 'x = 6',
    numericAnswer: 6,
  },
  {
    id: 'linear_2',
    topic: 'Linear Equations',
    difficulty: 'easy',
    problemText: 'Solve for x: 3x - 7 = 8',
    formattedProblem: '3x - 7 = 8',
    steps: [
      {
        explanation: 'Add 7 to both sides.',
        expression: '3x = 15',
      },
      {
        explanation: 'Divide both sides by 3.',
        expression: 'x = 5',
      },
    ],
    finalAnswerText: 'x = 5',
    numericAnswer: 5,
  },
  {
    id: 'linear_3',
    topic: 'Linear Equations',
    difficulty: 'medium',
    problemText: 'Solve for x: 5x + 12 = 3x + 28',
    formattedProblem: '5x + 12 = 3x + 28',
    steps: [
      {
        explanation: 'Subtract 3x from both sides.',
        expression: '2x + 12 = 28',
      },
      {
        explanation: 'Subtract 12 from both sides.',
        expression: '2x = 16',
      },
      {
        explanation: 'Divide both sides by 2.',
        expression: 'x = 8',
      },
    ],
    finalAnswerText: 'x = 8',
    numericAnswer: 8,
  },
  {
    id: 'linear_4',
    topic: 'Linear Equations',
    difficulty: 'medium',
    problemText: 'Solve for x: 4(x - 3) = 20',
    formattedProblem: '4(x - 3) = 20',
    steps: [
      {
        explanation: 'Distribute the 4.',
        expression: '4x - 12 = 20',
      },
      {
        explanation: 'Add 12 to both sides.',
        expression: '4x = 32',
      },
      {
        explanation: 'Divide both sides by 4.',
        expression: 'x = 8',
      },
    ],
    finalAnswerText: 'x = 8',
    numericAnswer: 8,
  },
  {
    id: 'linear_5',
    topic: 'Linear Equations',
    difficulty: 'hard',
    problemText: 'Solve for x: 2(3x - 5) + 4 = 3(x + 2)',
    formattedProblem: '2(3x - 5) + 4 = 3(x + 2)',
    steps: [
      {
        explanation: 'Distribute on both sides.',
        expression: '6x - 10 + 4 = 3x + 6',
      },
      {
        explanation: 'Simplify the left side.',
        expression: '6x - 6 = 3x + 6',
      },
      {
        explanation: 'Subtract 3x from both sides.',
        expression: '3x - 6 = 6',
      },
      {
        explanation: 'Add 6 to both sides.',
        expression: '3x = 12',
      },
      {
        explanation: 'Divide both sides by 3.',
        expression: 'x = 4',
      },
    ],
    finalAnswerText: 'x = 4',
    numericAnswer: 4,
  },

  // FRACTIONS
  {
    id: 'fractions_1',
    topic: 'Fractions',
    difficulty: 'medium',
    problemText: 'Compute: 3/4 + 2/3',
    formattedProblem: '\\frac{3}{4} + \\frac{2}{3}',
    steps: [
      {
        explanation: 'Find a common denominator (12).',
        expression:
          '\\frac{3}{4} = \\frac{9}{12}, \\frac{2}{3} = \\frac{8}{12}',
      },
      {
        explanation: 'Add: 9/12 + 8/12 = 17/12.',
        expression: '\\frac{17}{12}',
      },
      {
        explanation: 'Convert to mixed number (optional).',
        expression: '1\\frac{5}{12}',
      },
    ],
    finalAnswerText: '17/12 or 1 5/12',
    numericAnswer: null,
  },
  {
    id: 'fractions_2',
    topic: 'Fractions',
    difficulty: 'medium',
    problemText: 'Compute: 5/6 - 1/4',
    formattedProblem: '\\frac{5}{6} - \\frac{1}{4}',
    steps: [
      {
        explanation: 'Find a common denominator (12).',
        expression:
          '\\frac{5}{6} = \\frac{10}{12}, \\frac{1}{4} = \\frac{3}{12}',
      },
      {
        explanation: 'Subtract: 10/12 - 3/12 = 7/12.',
        expression: '\\frac{7}{12}',
      },
    ],
    finalAnswerText: '7/12',
    numericAnswer: null,
  },
  {
    id: 'fractions_3',
    topic: 'Fractions',
    difficulty: 'medium',
    problemText: 'Compute: 2/5 × 3/7',
    formattedProblem: '\\frac{2}{5} \\times \\frac{3}{7}',
    steps: [
      {
        explanation: 'Multiply the numerators: 2 × 3 = 6.',
        expression: '\\text{Numerator: } 6',
      },
      {
        explanation: 'Multiply the denominators: 5 × 7 = 35.',
        expression: '\\text{Denominator: } 35',
      },
      {
        explanation: 'Result: 6/35.',
        expression: '\\frac{6}{35}',
      },
    ],
    finalAnswerText: '6/35',
    numericAnswer: null,
  },
  {
    id: 'fractions_4',
    topic: 'Fractions',
    difficulty: 'hard',
    problemText: 'Compute: 3/4 ÷ 2/5',
    formattedProblem: '\\frac{3}{4} \\div \\frac{2}{5}',
    steps: [
      {
        explanation: 'Multiply by the reciprocal: 3/4 × 5/2.',
        expression: '\\frac{3}{4} \\times \\frac{5}{2}',
      },
      {
        explanation: 'Multiply numerators: 3 × 5 = 15.',
        expression: '\\text{Numerator: } 15',
      },
      {
        explanation: 'Multiply denominators: 4 × 2 = 8.',
        expression: '\\text{Denominator: } 8',
      },
      {
        explanation: 'Result: 15/8.',
        expression: '\\frac{15}{8}',
      },
      {
        explanation: 'Convert to mixed number (optional).',
        expression: '1\\frac{7}{8}',
      },
    ],
    finalAnswerText: '15/8 or 1 7/8',
    numericAnswer: null,
  },

  // DECIMALS & PERCENTS
  {
    id: 'decimals_1',
    topic: 'Decimals & Percents',
    difficulty: 'easy',
    problemText: 'Convert 0.75 to a percent.',
    formattedProblem: '0.75 = ?\\%',
    steps: [
      {
        explanation: 'Multiply by 100.',
        expression: '0.75 \\times 100 = 75',
      },
      {
        explanation: 'Add the percent sign.',
        expression: '75\\%',
      },
    ],
    finalAnswerText: '75%',
    numericAnswer: 75,
  },
  {
    id: 'decimals_2',
    topic: 'Decimals & Percents',
    difficulty: 'easy',
    problemText: 'Convert 45% to a decimal.',
    formattedProblem: '45\\% = ?',
    steps: [
      {
        explanation: 'Divide by 100.',
        expression: '45 \\div 100 = 0.45',
      },
    ],
    finalAnswerText: '0.45',
    numericAnswer: 0.45,
  },
  {
    id: 'decimals_3',
    topic: 'Decimals & Percents',
    difficulty: 'medium',
    problemText: 'What is 20% of 150?',
    formattedProblem: '20\\% \\text{ of } 150',
    steps: [
      {
        explanation: 'Convert 20% to a decimal: 0.20.',
        expression: '0.20',
      },
      {
        explanation: 'Multiply: 0.20 × 150.',
        expression: '0.20 \\times 150 = 30',
      },
    ],
    finalAnswerText: '30',
    numericAnswer: 30,
  },
  {
    id: 'decimals_4',
    topic: 'Decimals & Percents',
    difficulty: 'medium',
    problemText:
      'A shirt costs $40 and is on sale for 25% off. What is the sale price?',
    formattedProblem: '\\$40 - 25\\% \\text{ of } \\$40',
    steps: [
      {
        explanation: 'Find 25% of $40: 0.25 × 40 = 10.',
        expression: '\\$10',
      },
      {
        explanation: 'Subtract from original price: $40 - $10.',
        expression: '\\$30',
      },
    ],
    finalAnswerText: '$30',
    numericAnswer: 30,
  },

  // EXPONENTS & ROOTS
  {
    id: 'exponents_1',
    topic: 'Exponents & Roots',
    difficulty: 'medium',
    problemText: 'Simplify: 3² · 3³',
    formattedProblem: '3^2 \\cdot 3^3',
    steps: [
      {
        explanation: 'Add exponents: 2 + 3 = 5.',
        expression: '3^5',
      },
      {
        explanation: 'Compute 3⁵.',
        expression: '243',
      },
    ],
    finalAnswerText: '243',
    numericAnswer: 243,
  },
  {
    id: 'exponents_2',
    topic: 'Exponents & Roots',
    difficulty: 'medium',
    problemText: 'Simplify: (2³)²',
    formattedProblem: '(2^3)^2',
    steps: [
      {
        explanation: 'Multiply exponents: 3 × 2 = 6.',
        expression: '2^6',
      },
      {
        explanation: 'Compute 2⁶.',
        expression: '64',
      },
    ],
    finalAnswerText: '64',
    numericAnswer: 64,
  },
  {
    id: 'exponents_3',
    topic: 'Exponents & Roots',
    difficulty: 'medium',
    problemText: 'Simplify: 5⁴ ÷ 5²',
    formattedProblem: '5^4 \\div 5^2',
    steps: [
      {
        explanation: 'Subtract exponents: 4 - 2 = 2.',
        expression: '5^2',
      },
      {
        explanation: 'Compute 5².',
        expression: '25',
      },
    ],
    finalAnswerText: '25',
    numericAnswer: 25,
  },
  {
    id: 'exponents_4',
    topic: 'Exponents & Roots',
    difficulty: 'easy',
    problemText: 'What is the square root of 144?',
    formattedProblem: '\\sqrt{144}',
    steps: [
      {
        explanation: 'Find the number that when squared equals 144.',
        expression: '12 \\times 12 = 144',
      },
      {
        explanation: 'The square root of 144 is 12.',
        expression: '12',
      },
    ],
    finalAnswerText: '12',
    numericAnswer: 12,
  },
  {
    id: 'exponents_5',
    topic: 'Exponents & Roots',
    difficulty: 'medium',
    problemText: 'What is the cube root of 27?',
    formattedProblem: '\\sqrt[3]{27}',
    steps: [
      {
        explanation: 'Find the number that when cubed equals 27.',
        expression: '3 \\times 3 \\times 3 = 27',
      },
      {
        explanation: 'The cube root of 27 is 3.',
        expression: '3',
      },
    ],
    finalAnswerText: '3',
    numericAnswer: 3,
  },

  // WORD PROBLEMS
  {
    id: 'word_1',
    topic: 'Word Problems',
    difficulty: 'easy',
    problemText:
      'Sarah has 15 apples. She gives away 6 apples. How many apples does she have left?',
    formattedProblem: '15 - 6',
    steps: [
      {
        explanation: 'Start with 15 apples.',
        expression: '15',
      },
      {
        explanation: 'Subtract the 6 apples given away.',
        expression: '15 - 6 = 9',
      },
    ],
    finalAnswerText: '9 apples',
    numericAnswer: 9,
  },
  {
    id: 'word_2',
    topic: 'Word Problems',
    difficulty: 'medium',
    problemText:
      'A rectangle has a length of 8 cm and a width of 5 cm. What is its area?',
    formattedProblem: 'A = l \\times w',
    steps: [
      {
        explanation: 'Use the formula: Area = length × width.',
        expression: 'A = l \\times w',
      },
      {
        explanation: 'Substitute: A = 8 cm × 5 cm.',
        expression: 'A = 8 \\times 5',
      },
      {
        explanation: 'Calculate: A = 40 cm².',
        expression: '40 \\text{ cm}^2',
      },
    ],
    finalAnswerText: '40 cm²',
    numericAnswer: 40,
  },
  {
    id: 'word_3',
    topic: 'Word Problems',
    difficulty: 'medium',
    problemText:
      'John earns $12 per hour. If he works 8 hours, how much does he earn?',
    formattedProblem: '12 \\times 8',
    steps: [
      {
        explanation: 'Multiply the hourly rate by the number of hours.',
        expression: '12 \\times 8',
      },
      {
        explanation: 'Calculate: 12 × 8 = 96.',
        expression: '96',
      },
    ],
    finalAnswerText: '$96',
    numericAnswer: 96,
  },
  {
    id: 'word_4',
    topic: 'Word Problems',
    difficulty: 'hard',
    problemText:
      'A train travels 240 miles in 4 hours. What is its average speed in miles per hour?',
    formattedProblem: 'v = \\frac{d}{t}',
    steps: [
      {
        explanation: 'Use the formula: speed = distance ÷ time.',
        expression: 'v = \\frac{d}{t}',
      },
      {
        explanation: 'Substitute: v = 240 miles ÷ 4 hours.',
        expression: 'v = \\frac{240}{4}',
      },
      {
        explanation: 'Calculate: v = 60 mph.',
        expression: '60 \\text{ mph}',
      },
    ],
    finalAnswerText: '60 mph',
    numericAnswer: 60,
  },
  {
    id: 'word_5',
    topic: 'Word Problems',
    difficulty: 'hard',
    problemText:
      'A store sells notebooks for $3 each. If you have $50, how many notebooks can you buy and how much money will you have left?',
    formattedProblem: '50 \\div 3',
    steps: [
      {
        explanation: 'Divide $50 by $3 per notebook.',
        expression: '50 \\div 3 = 16 \\text{ remainder } 2',
      },
      {
        explanation: 'You can buy 16 notebooks.',
        expression: '16 \\text{ notebooks}',
      },
      {
        explanation: 'You will have $2 left over.',
        expression: '\\$2 \\text{ remaining}',
      },
    ],
    finalAnswerText: '16 notebooks with $2 left',
    numericAnswer: 16,
  },
  // --- Additional Extended Problem Bank (Linear Equations) ---
  {
    id: 'linear_6',
    topic: 'Linear Equations',
    difficulty: 'easy',
    problemText: 'Solve for x: x + 9 = 14',
    formattedProblem: 'x + 9 = 14',
    steps: [
      { explanation: 'Subtract 9 from both sides.', expression: 'x = 5' },
    ],
    finalAnswerText: 'x = 5',
    numericAnswer: 5,
  },
  {
    id: 'linear_7',
    topic: 'Linear Equations',
    difficulty: 'easy',
    problemText: 'Solve for x: 7 + x = 20',
    formattedProblem: '7 + x = 20',
    steps: [
      { explanation: 'Subtract 7 from both sides.', expression: 'x = 13' },
    ],
    finalAnswerText: 'x = 13',
    numericAnswer: 13,
  },
  {
    id: 'linear_8',
    topic: 'Linear Equations',
    difficulty: 'medium',
    problemText: 'Solve for x: 9x - 4 = 5x + 16',
    formattedProblem: '9x - 4 = 5x + 16',
    steps: [
      {
        explanation: 'Subtract 5x from both sides.',
        expression: '4x - 4 = 16',
      },
      { explanation: 'Add 4 to both sides.', expression: '4x = 20' },
      { explanation: 'Divide by 4.', expression: 'x = 5' },
    ],
    finalAnswerText: 'x = 5',
    numericAnswer: 5,
  },
  {
    id: 'linear_9',
    topic: 'Linear Equations',
    difficulty: 'medium',
    problemText: 'Solve for x: 3(x + 2) = 2(x + 7)',
    formattedProblem: '3(x + 2) = 2(x + 7)',
    steps: [
      { explanation: 'Distribute both sides.', expression: '3x + 6 = 2x + 14' },
      { explanation: 'Subtract 2x from both sides.', expression: 'x + 6 = 14' },
      { explanation: 'Subtract 6 from both sides.', expression: 'x = 8' },
    ],
    finalAnswerText: 'x = 8',
    numericAnswer: 8,
  },
  {
    id: 'linear_10',
    topic: 'Linear Equations',
    difficulty: 'hard',
    problemText: 'Solve for x: 4(2x - 3) - 5 = 3(3x - 2)',
    formattedProblem: '4(2x - 3) - 5 = 3(3x - 2)',
    steps: [
      {
        explanation: 'Distribute on both sides.',
        expression: '8x - 12 - 5 = 9x - 6',
      },
      { explanation: 'Combine like terms.', expression: '8x - 17 = 9x - 6' },
      {
        explanation: 'Subtract 8x from both sides.',
        expression: '-17 = x - 6',
      },
      { explanation: 'Add 6 to both sides.', expression: '-11 = x' },
    ],
    finalAnswerText: 'x = -11',
    numericAnswer: -11,
  },
  // --- Additional Fractions ---
  {
    id: 'fractions_5',
    topic: 'Fractions',
    difficulty: 'easy',
    problemText: 'Compute: 1/2 + 1/3',
    formattedProblem: '\\frac{1}{2} + \\frac{1}{3}',
    steps: [
      {
        explanation: 'Common denominator is 6.',
        expression: '\\frac{3}{6} + \\frac{2}{6}',
      },
      { explanation: 'Add: 3/6 + 2/6 = 5/6.', expression: '\\frac{5}{6}' },
    ],
    finalAnswerText: '5/6',
    numericAnswer: null,
  },
  {
    id: 'fractions_6',
    topic: 'Fractions',
    difficulty: 'hard',
    problemText: 'Compute: (2/3 + 5/9) - 1/3',
    formattedProblem: '( \\frac{2}{3} + \\frac{5}{9} ) - \\frac{1}{3}',
    steps: [
      {
        explanation: 'Convert 2/3 and 1/3 to ninths.',
        expression: '\\frac{6}{9} + \\frac{5}{9} - \\frac{3}{9}',
      },
      {
        explanation: 'Add first two: 6/9 + 5/9 = 11/9.',
        expression: '\\frac{11}{9} - \\frac{3}{9}',
      },
      {
        explanation: 'Subtract: 11/9 - 3/9 = 8/9.',
        expression: '\\frac{8}{9}',
      },
    ],
    finalAnswerText: '8/9',
    numericAnswer: null,
  },
  // --- Additional Decimals & Percents ---
  {
    id: 'decimals_5',
    topic: 'Decimals & Percents',
    difficulty: 'hard',
    problemText:
      'A $120 jacket is discounted 15% then taxed 8%. What is the final price (ignore cents rounding)?',
    formattedProblem: '120 - 0.15(120) + 0.08(120 - 0.15(120))',
    steps: [
      {
        explanation: 'Find discount: 15% of 120 = 18.',
        expression: '120 - 18 = 102',
      },
      {
        explanation: 'Tax base is 102. Compute 8% tax: 0.08 × 102 = 8.16.',
        expression: '102 + 8.16',
      },
      { explanation: 'Add tax: 102 + 8.16 = 110.16.', expression: '110.16' },
    ],
    finalAnswerText: '$110.16',
    numericAnswer: 110.16,
  },
  // --- Additional Exponents & Roots ---
  {
    id: 'exponents_6',
    topic: 'Exponents & Roots',
    difficulty: 'hard',
    problemText: 'Simplify: 2^3 * 5^2 * 2^2',
    formattedProblem: '2^3 \\cdot 5^2 \\cdot 2^2',
    steps: [
      {
        explanation: 'Combine powers of 2: 2^(3+2) = 2^5.',
        expression: '2^5 \\cdot 5^2',
      },
      {
        explanation: 'Compute 2^5 = 32 and 5^2 = 25.',
        expression: '32 \\cdot 25',
      },
      { explanation: 'Multiply: 32 × 25 = 800.', expression: '800' },
    ],
    finalAnswerText: '800',
    numericAnswer: 800,
  },
  // --- Additional Word Problems ---
  {
    id: 'word_6',
    topic: 'Word Problems',
    difficulty: 'easy',
    problemText: 'A book costs $9. You buy 4. How much do you spend?',
    formattedProblem: '9 \\times 4',
    steps: [
      {
        explanation: 'Multiply price by quantity.',
        expression: '9 \\times 4 = 36',
      },
    ],
    finalAnswerText: '$36',
    numericAnswer: 36,
  },
  {
    id: 'word_7',
    topic: 'Word Problems',
    difficulty: 'medium',
    problemText:
      'A car travels 180 miles in 3 hours. What is its average speed?',
    formattedProblem: '\\frac{180}{3}',
    steps: [
      {
        explanation: 'Use speed = distance ÷ time.',
        expression: '180 \\div 3 = 60',
      },
    ],
    finalAnswerText: '60 mph',
    numericAnswer: 60,
  },
  {
    id: 'word_8',
    topic: 'Word Problems',
    difficulty: 'hard',
    problemText:
      'A tank holds 250 liters. It leaks 12 liters per hour. How many hours until 1/5 of the tank remains?',
    formattedProblem: '250 - 12h = 50',
    steps: [
      { explanation: '1/5 of 250 is 50.', expression: '250 - 12h = 50' },
      {
        explanation: 'Subtract 250 from both sides.',
        expression: '-12h = -200',
      },
      { explanation: 'Divide by -12.', expression: 'h = 16.66...' },
    ],
    finalAnswerText: 'Approximately 16.7 hours',
    numericAnswer: 16.67,
  },
];

// Make available globally for components
if (typeof window !== 'undefined') {
  window.MATH_STEP_PROBLEMS = MATH_STEP_PROBLEMS;
}
