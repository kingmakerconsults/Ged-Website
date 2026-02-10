module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the result of \\(25 \\(\times\\) 100?\\)',
    answerOptions: [
      {
        text: '250',
        isCorrect: false,
        rationale: 'This is 25 * 10.',
      },
      {
        text: '2500',
        isCorrect: true,
        rationale:
          'Multiplying by 100 adds two zeros to the end of the number.',
      },
      {
        text: '25000',
        isCorrect: false,
        rationale: 'This is 25 * 1000.',
      },
      {
        text: '2.5',
        isCorrect: false,
        rationale: 'This is 25 / 10.',
      },
    ],
    rationale:
      'To multiply a whole number by 100, you can simply add two zeros to the end. So, 25 * 100 = 2500.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'What is the next prime number after 19?',
    correctAnswer: '23',
    rationale:
      'A prime number is only divisible by 1 and itself. 20 is divisible by 2, 21 by 3, and 22 by 2. 23 is the next prime number.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'You buy items costing 3.50 dollars, 8.25 dollars, and 12.00 dollars. If you pay with a 30-dollar bill, how much change should you receive?',
    answerOptions: [
      {
        text: '6.25 dollars',
        isCorrect: true,
        rationale:
          'The total cost is 3.50 + 8.25 + 12.00 = 23.75 dollars. The change is 30.00 - 23.75 = 6.25 dollars.',
      },
      {
        text: '7.75 dollars',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '23.75 dollars',
        isCorrect: false,
        rationale: 'This is the total cost of the items.',
      },
      {
        text: '53.75 dollars',
        isCorrect: false,
        rationale: 'This is the result of adding the bill to the total.',
      },
    ],
    rationale:
      'First, find the total cost of the items: 3.50 + 8.25 + 12.00 = 23.75 dollars. Then, subtract the total cost from the amount paid: 30.00 - 23.75 = 6.25 dollars.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'Convert the improper fraction \\(\\frac{11}{4}\\) to a mixed number.',
    correctAnswer: '2 \\(\\frac{3}{4}\\)',
    rationale:
      'Divide 11 by 4. It goes in 2 times (2 * 4 = 8) with a remainder of 3. So the mixed number is 2 \\(\\frac{3}{4}\\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'Which of the following is the correct order from smallest to largest?',
    answerOptions: [
      {
        text: '-5, -2, 0, 3',
        isCorrect: true,
        rationale:
          'On a number line, numbers increase from left to right. -5 is the smallest, followed by -2, 0, and then 3.',
      },
      {
        text: '0, -2, -5, 3',
        isCorrect: false,
        rationale: 'The negative numbers are in the wrong order.',
      },
      {
        text: '-2, -5, 0, 3',
        isCorrect: false,
        rationale: '-5 is smaller than -2.',
      },
      {
        text: '3, 0, -2, -5',
        isCorrect: false,
        rationale: 'This is in order from largest to smallest.',
      },
    ],
    rationale:
      'When ordering numbers, visualize a number line. Negative numbers with a larger absolute value are smaller. So, -5 < -2 < 0 < 3.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      "A company's stock was valued at \\(75 per share. It dropped by 12% on Monday and then increased by 5% on Tuesday. What was the price after Tuesday's increase?",
    answerOptions: [
      {
        text: '69.30',
        isCorrect: true,
        rationale:
          'Monday: \\(75 * (1 - 0.12) =  66. Tuesday: \\(66 * (1 + 0.05) =  69.30.\\)\\)',
      },
      {
        text: '\\(70.88\\)',
        isCorrect: false,
        rationale: 'This is a 7% decrease from the original price.',
      },
      {
        text: '75.00',
        isCorrect: false,
        rationale: 'The price would not return to the original value.',
      },
      {
        text: '\\(66.00\\)',
        isCorrect: false,
        rationale: "This is the price after Monday's drop only.",
      },
    ],
    rationale:
      'First, calculate the price after the drop: \\)75 * (1 - 0.12) = 75 * 0.88 = \\(66. Then, calculate the price after the increase: \\)66 * (1 + 0.05) = \\(66 * 1.05 = 69.30.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'What is the sum of all prime numbers between 10 and 20?',
    correctAnswer: '60',
    rationale:
      'The prime numbers between 10 and 20 are 11, 13, 17, and 19. Their sum is 11 + 13 + 17 + 19 = 60.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is \\(20 \\div 4 + 6\\)?',
    answerOptions: [
      {
        text: '2',
        isCorrect: false,
        rationale: 'This is the result if you do addition before division.',
      },
      {
        text: '11',
        isCorrect: true,
        rationale:
          'Following order of operations, division comes first: \\(\\frac{20}{4}\\) = 5. Then addition: 5 + 6 = 11.',
      },
      {
        text: '10',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '30',
        isCorrect: false,
        rationale: 'This is 20+10.',
      },
    ],
    rationale:
      'According to the order of operations (PEMDAS), division is performed before addition. So, 20 ÷ 4 = 5, and then 5 + 6 = 11.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A piece of wood is 8 feet long. If you cut off a piece that is 2.25 feet long, how many inches is the remaining piece?',
    correctAnswer: '69 inches',
    rationale:
      'The remaining piece is 8 - 2.25 = 5.75 feet long. To convert feet to inches, multiply by 12: 5.75 * 12 = 69 inches.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the scientific notation for 3,450,000?',
    answerOptions: [
      {
        text: '\\(3.45 \\times 10^4\\)',
        isCorrect: false,
        rationale: 'The exponent should be 6.',
      },
      {
        text: '\\(3.45 \\times 10^5\\)',
        isCorrect: false,
        rationale: 'The exponent should be 6.',
      },
      {
        text: '\\(3.45 \\times 10^6\\)',
        isCorrect: true,
        rationale: 'The decimal point is moved 6 places to the left.',
      },
      {
        text: '\\(34.5 \\times 10^5\\)',
        isCorrect: false,
        rationale: "The number before the 'x' must be between 1 and 10.",
      },
    ],
    rationale:
      'To write a number in scientific notation, move the decimal point until there is one non-zero digit to its left. The number of places you moved the decimal is the exponent. Here, the decimal is moved 6 places, so the exponent is 6.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'If you work 40 hours per week at $15 per hour, what is your gross monthly income (assuming 4 weeks in a month)?',
    answerOptions: [
      {
        text: '$600',
        isCorrect: false,
        rationale: 'This is your weekly income.',
      },
      {
        text: '1200',
        isCorrect: false,
        rationale: 'This is your bi-weekly income.',
      },
      {
        text: '$2400',
        isCorrect: true,
        rationale:
          'Weekly income is 40 * $15 = $600. Monthly income is $600 * 4 = $2400.',
      },
      {
        text: '3000',
        isCorrect: false,
        rationale: 'This is the income for 5 weeks.',
      },
    ],
    rationale:
      'First, calculate the weekly income: 40 hours/week * $15/hour = $600/week. Then, calculate the monthly income: $600/week * 4 weeks/month = $2400/month.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Find the sum of \\(\\(\frac{1}{4}\\) and \\(\frac{2}{3}\\).',
    answerOptions: [
      {
        text: '\\(\\(\frac{3}{7}\\)',
        isCorrect: false,
        rationale: 'This is the result of adding numerators and denominators.',
      },
      {
        text: '\\(\\(\frac{11}{12}\\)',
        isCorrect: true,
        rationale:
          'The common denominator is 12. The sum is \\(\\(\frac{3}{12}\\) + \\(\\(\frac{8}{12}\\) = \\(\\(\frac{11}{12}\\).',
      },
      {
        text: '\\(\\(\frac{1}{2}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '1',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'To add these fractions, find a common denominator, which is 12. Convert the fractions: \\(\\(\frac{1}{4}\\) = \\(\frac{3}{12} and \\(\frac{2}{3}\\) = \\(\frac{8}{12}\\). Now add them: \\(\\(\frac{3}{12}\\) + \\(\frac{8}{12}\\) = \\(\frac{11}{12}\\).',
    challenge_tags: ['math-1'],
  },
];
