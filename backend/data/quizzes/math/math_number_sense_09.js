module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is 400 divided by 20?',
    answerOptions: [
      {
        text: '20',
        isCorrect: true,
        rationale: '400 / 20 = 40 / 2 = 20.',
      },
      {
        text: '2',
        isCorrect: false,
        rationale: 'This is $\\frac{40}{20}$.',
      },
      {
        text: '200',
        isCorrect: false,
        rationale: 'This is $\\frac{400}{2}$.',
      },
      {
        text: '8000',
        isCorrect: false,
        rationale: 'This is 400*20.',
      },
    ],
    rationale:
      'To divide 400 by 20, you can simplify the problem by removing a zero from both numbers, which is equivalent to dividing both by 10. This leaves 40 / 2, which equals 20.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'What is the result of $1.5 \\times 4$?',
    correctAnswer: '6',
    rationale:
      '1.5 multiplied by 4 is the same as adding 1.5 four times: 1.5 + 1.5 + 1.5 + 1.5 = 6.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A concert ticket costs $80. A processing fee of 5% is added to the price. What is the total cost?',
    answerOptions: [
      {
        text: '$84',
        isCorrect: true,
        rationale: 'The fee is 0.05 * $80 = $4. Total cost = $80 + $4 = $84.',
      },
      {
        text: '$85',
        isCorrect: false,
        rationale: 'This would be a 6.25% fee.',
      },
      {
        text: '$4',
        isCorrect: false,
        rationale: 'This is the fee amount, not the total cost.',
      },
      {
        text: '$76',
        isCorrect: false,
        rationale: 'This is the result of subtracting the fee.',
      },
    ],
    rationale:
      'First, calculate the processing fee: 5% of $80 is 0.05 * 80 = $4. Then, add this fee to the ticket price: $80 + $4 = $84.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Evaluate: $50 - (10 - 4)^2$.',
    correctAnswer: '14',
    rationale:
      'Order of operations (PEMDAS): Parentheses first (10-4=6), then Exponents ($6^2$=36), then subtraction (50 - 36 = 14).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the greatest common factor (GCF) of 36 and 54?',
    answerOptions: [
      {
        text: '6',
        isCorrect: false,
        rationale: '6 is a common factor, but not the greatest.',
      },
      {
        text: '9',
        isCorrect: false,
        rationale: '9 is a common factor, but not the greatest.',
      },
      {
        text: '18',
        isCorrect: true,
        rationale:
          'Factors of 36: 1,2,3,4,6,9,12,18,36. Factors of 54: 1,2,3,6,9,18,27,54. The GCF is 18.',
      },
      {
        text: '108',
        isCorrect: false,
        rationale: 'This is the least common multiple (LCM).',
      },
    ],
    rationale:
      'List the factors of each number to find the greatest one they have in common. Factors of 36: {1, 2, 3, 4, 6, 9, 12, 18, 36}. Factors of 54: {1, 2, 3, 6, 9, 18, 27, 54}. The GCF is 18.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      "A phone's battery life is 8 hours. With a new software update, the battery life improves by 25%. What is the new battery life?",
    answerOptions: [
      {
        text: '2 hours',
        isCorrect: false,
        rationale: 'This is the amount of improvement.',
      },
      {
        text: '6 hours',
        isCorrect: false,
        rationale: 'This is the result of a 25% decrease.',
      },
      {
        text: '10 hours',
        isCorrect: true,
        rationale:
          'The improvement is 0.25 * 8 = 2 hours. New battery life is 8 + 2 = 10 hours.',
      },
      {
        text: '12 hours',
        isCorrect: false,
        rationale: 'This would be a 50% increase.',
      },
    ],
    rationale:
      'First, calculate the improvement: 25% of 8 hours is 0.25 * 8 = 2 hours. Then, add this to the original battery life: 8 + 2 = 10 hours.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'What is the result of multiplying -7 by -5?',
    correctAnswer: '35',
    rationale:
      'The product of two negative numbers is a positive number. 7 * 5 = 35.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Estimate the product of 19.8 and 5.1.',
    answerOptions: [
      {
        text: '25',
        isCorrect: false,
        rationale: 'This is 20+5.',
      },
      {
        text: '100',
        isCorrect: true,
        rationale:
          'Round 19.8 to 20 and 5.1 to 5. The estimated product is 20 * 5 = 100.',
      },
      {
        text: '80',
        isCorrect: false,
        rationale: 'This is 20*4.',
      },
      {
        text: '120',
        isCorrect: false,
        rationale: 'This is 20*6.',
      },
    ],
    rationale:
      'To estimate, round 19.8 to the nearest whole number (20) and 5.1 to the nearest whole number (5). The estimated product is 20 x 5 = 100.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A recipe for 12 cupcakes requires 1.5 cups of flour. How much flour is needed for 30 cupcakes?',
    correctAnswer: '3.75 cups',
    rationale:
      'First find the amount of flour per cupcake: 1.5 / 12 = 0.125 cups. Then multiply by 30: 0.125 * 30 = 3.75 cups.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the value of $10^4$?',
    answerOptions: [
      {
        text: '40',
        isCorrect: false,
        rationale: 'This is 10 * 4.',
      },
      {
        text: '1000',
        isCorrect: false,
        rationale: 'This is $10^3$.',
      },
      {
        text: '10000',
        isCorrect: true,
        rationale: '$10^4$ is 1 followed by 4 zeros.',
      },
      {
        text: '100000',
        isCorrect: false,
        rationale: 'This is $10^5$.',
      },
    ],
    rationale:
      'The exponent indicates how many times the base (10) is multiplied by itself. $10^4 = 10 \\times 10 \\times 10 \\times 10 = 10,000$.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      "A person's weight drops from 150 lbs to 135 lbs. What is the percentage decrease in weight?",
    answerOptions: [
      {
        text: '10%',
        isCorrect: true,
        rationale: 'The decrease is 15 lbs. ($\\frac{15}{150}$)*100 = 10%.',
      },
      {
        text: '15%',
        isCorrect: false,
        rationale: 'This is the amount of weight lost.',
      },
      {
        text: '11.1%',
        isCorrect: false,
        rationale: 'This is $\\frac{15}{135}$.',
      },
      {
        text: '90%',
        isCorrect: false,
        rationale: 'This is $\\frac{135}{150}$.',
      },
    ],
    rationale:
      'The amount of decrease is 150 - 135 = 15 lbs. The percent decrease is (decrease / original amount) * 100 = (15 / 150) * 100 = 0.10 * 100 = 10%.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the sum of the first five positive integers?',
    answerOptions: [
      {
        text: '10',
        isCorrect: false,
        rationale: 'This is the sum of the first four.',
      },
      {
        text: '15',
        isCorrect: true,
        rationale: '1 + 2 + 3 + 4 + 5 = 15.',
      },
      {
        text: '20',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '21',
        isCorrect: false,
        rationale: 'This is the sum of the first six.',
      },
    ],
    rationale:
      'The first five positive integers are 1, 2, 3, 4, and 5. Their sum is 1 + 2 + 3 + 4 + 5 = 15.',
    challenge_tags: ['math-1'],
  },
];
