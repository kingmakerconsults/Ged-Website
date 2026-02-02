module.exports = [
  {
    questionNumber: 1,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'Solve for y: \\(y + 12 = 20\\).',
    correctAnswer: '8',
    rationale: 'Subtract 12 from both sides of the equation: 20 - 12 = 8.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Evaluate \\(15 - 2b for b = 6\\).',
    answerOptions: [
      {
        text: '3',
        isCorrect: true,
        rationale: "Substitute 6 for 'b': 15 - 2(6) = 15 - 12 = 3.",
      },
      {
        text: '9',
        isCorrect: false,
        rationale: 'This is 15-6.',
      },
      {
        text: '13',
        isCorrect: false,
        rationale: 'This is 15-2.',
      },
      {
        text: '78',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale: 'Substitute 6 for b in the expression: 15 - 2(6) = 15 - 12 = 3.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'Solve for x: \\(-5x - 4 = 11\\).',
    answerOptions: [
      {
        text: '-3',
        isCorrect: true,
        rationale: 'Add 4 to both sides: -5x = 15. Divide by -5: x = -3.',
      },
      {
        text: '3',
        isCorrect: false,
        rationale: 'This ignores the negative sign on the 5.',
      },
      {
        text: '-1.4',
        isCorrect: false,
        rationale: 'This is the result if you subtract 4.',
      },
      {
        text: '-15',
        isCorrect: false,
        rationale: 'This is -5x.',
      },
    ],
    rationale:
      'First, add 4 to both sides: -5x = 11 + 4, so -5x = 15. Then, divide by -5: x = 15 / -5 = -3.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Simplify: \\(x(x + 5) - 3x\\).',
    correctAnswer: '\\(x^2\\) + 2x',
    rationale:
      'First, distribute x: \\(x^{2}\\) + 5x - 3x. Then, combine like terms: \\(x^{2}\\) + 2x.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'Which of the following equations has a slope of 2 and a y-intercept of -3?',
    answerOptions: [
      {
        text: '\\(y = -3x + 2\\)',
        isCorrect: false,
        rationale: 'This has a slope of -3 and a y-intercept of 2.',
      },
      {
        text: '\\(y = 2x - 3\\)',
        isCorrect: true,
        rationale:
          'This matches the slope-intercept form y = mx + b with m=2 and b=-3.',
      },
      {
        text: '\\(y = 2x + 3\\)',
        isCorrect: false,
        rationale: 'This has a y-intercept of 3.',
      },
      {
        text: '\\(y = 3x - 2\\)',
        isCorrect: false,
        rationale: 'This has a slope of 3 and a y-intercept of -2.',
      },
    ],
    rationale:
      "The slope-intercept form of a linear equation is y = mx + b, where 'm' is the slope and 'b' is the y-intercept. The equation with m=2 and b=-3 is y = 2x - 3.",
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question: 'Find the x-intercept of the line \\(5x - 3y = 15\\).',
    answerOptions: [
      {
        text: '3',
        isCorrect: true,
        rationale: 'Set y=0: 5x = 15. So x=3.',
      },
      {
        text: '-5',
        isCorrect: false,
        rationale: 'This is the y-intercept.',
      },
      {
        text: '5',
        isCorrect: false,
        rationale: 'This is the coefficient of x.',
      },
      {
        text: '-3',
        isCorrect: false,
        rationale: 'This is the coefficient of y.',
      },
    ],
    rationale:
      'To find the x-intercept, set y = 0. The equation becomes 5x - 3(0) = 15, so 5x = 15. Divide by 5 to get x = 3.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Solve the inequality: \\(4x - 5 < 11\\).',
    correctAnswer: 'x < 4',
    rationale: 'Add 5 to both sides: 4x < 16. Divide by 4: x < 4.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question: 'If \\(f(x) = |2x - 8|\\), what is \\(f(3)\\)?',
    answerOptions: [
      {
        text: '-2',
        isCorrect: false,
        rationale: 'The result of absolute value is always non-negative.',
      },
      {
        text: '2',
        isCorrect: true,
        rationale: 'f(3) = |2(3) - 8| = |6 - 8| = |-2| = 2.',
      },
      {
        text: '14',
        isCorrect: false,
        rationale: 'This is |2(3)+8|.',
      },
      {
        text: '-14',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Substitute 3 for x: f(3) = |2(3) - 8| = |6 - 8| = |-2|. The absolute value of -2 is 2.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the slope of the line that is perpendicular to the line passing through (2, 2) and (5, 8)?',
    correctAnswer: '-\\frac{1}{2}',
    rationale:
      'First, find the slope of the line: m = (8-2)/(5-2) = \\(\\frac{6}{3}\\) = 2. The slope of a perpendicular line is the negative reciprocal, which is -\\(\\frac{1}{2}\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      "A taxi charges a \\(3 flat fee plus \\)2 per mile. Which equation represents the total cost C for a trip of 'm' miles?",
    answerOptions: [
      {
        text: 'C = 3m + 2',
        isCorrect: false,
        rationale: 'This reverses the flat fee and the per-mile charge.',
      },
      {
        text: 'C = 2m + 3',
        isCorrect: true,
        rationale:
          'The total cost is the variable charge (2m) plus the fixed fee (3).',
      },
      {
        text: 'C = 5m',
        isCorrect: false,
        rationale: 'This combines the charges incorrectly.',
      },
      {
        text: 'C = 3(m+2)',
        isCorrect: false,
        rationale: 'This is an incorrect representation.',
      },
    ],
    rationale:
      'The total cost is the sum of the flat fee (\\(3) and the variable charge, which is \\)2 per mile times the number of miles (m). So, C = 2m + 3.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question: 'What is the solution set for the equation \\(x^2 - 6x + 5 = 0\\)?',
    answerOptions: [
      {
        text: '{1, 5}',
        isCorrect: true,
        rationale:
          'Factor the quadratic to (x-1)(x-5)=0. The solutions are x=1 and x=5.',
      },
      {
        text: '{-1, -5}',
        isCorrect: false,
        rationale: 'This gives a middle term of +6x.',
      },
      {
        text: '{1, -5}',
        isCorrect: false,
        rationale: 'This gives a constant term of -5.',
      },
      {
        text: '{-1, 5}',
        isCorrect: false,
        rationale: 'This gives a constant term of -5.',
      },
    ],
    rationale:
      'To solve the quadratic equation, factor the trinomial. We need two numbers that multiply to 5 and add to -6. These are -1 and -5. So, (x - 1)(x - 5) = 0. The solutions are x = 1 and x = 5.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Simplify: \\(\\frac{x^8}{x^2}\\)',
    answerOptions: [
      {
        text: '\\(x^4\\)',
        isCorrect: false,
        rationale: 'This is the result of dividing the exponents.',
      },
      {
        text: '\\(x^6\\)',
        isCorrect: true,
        rationale:
          'When dividing powers with the same base, subtract the exponents: 8 - 2 = 6.',
      },
      {
        text: '\\(x^{10}\\)',
        isCorrect: false,
        rationale: 'This is the result of adding the exponents.',
      },
      {
        text: '\\(x^{16}\\)',
        isCorrect: false,
        rationale: 'This is the result of multiplying the exponents.',
      },
    ],
    rationale:
      'When dividing exponential expressions with the same base, you subtract the exponents. So, \\(\\frac{x^8}{x^2}\\) = \\(x^{8-2}\\) = \\(x^6\\).',
    challenge_tags: ['math-3'],
  },
];
