module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the y-intercept of the line \\(y = -4x + 8\\)?',
    answerOptions: [
      {
        text: '-4',
        isCorrect: false,
        rationale: 'This is the slope.',
      },
      {
        text: '2',
        isCorrect: false,
        rationale: 'This is the x-intercept.',
      },
      {
        text: '8',
        isCorrect: true,
        rationale: 'In y=mx+b form, b is the y-intercept.',
      },
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      "The equation is in slope-intercept form (y = mx + b), where 'b' is the y-intercept. In this case, b=8.",
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'Given \\(f(x) = 20 - 3x\\), find \\(f(5)\\).',
    correctAnswer: '5',
    rationale: 'Substitute 5 for x: f(5) = 20 - 3(5) = 20 - 15 = 5.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the slope of a line passing through (-2, -1) and (4, 3)?',
    answerOptions: [
      {
        text: '\\(\\(\frac{2}{3}\\)',
        isCorrect: true,
        rationale:
          'Slope = (3 - (-1)) / (4 - (-2)) = 4 / 6 = \\(\\(\frac{2}{3}\\).',
      },
      {
        text: '\\(\\(\frac{3}{2}\\)',
        isCorrect: false,
        rationale: 'This is the reciprocal of the slope.',
      },
      {
        text: '\\(-\\(\frac{2}{3}\\)',
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
      'The slope is the change in y divided by the change in x. \\(m = \\(\frac{3 - (-1)}{4 - (-2)}\\) = \\(\frac{4}{6}\\) = \\(\frac{2}{3}\\).',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Find the x-intercept of the line \\(y = 2x - 10\\).',
    correctAnswer: '5',
    rationale: 'Set y=0: 0 = 2x - 10. 10 = 2x. x = 5.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Which of the following functions is linear?',
    answerOptions: [
      {
        text: '\\(y = x^2 + 1\\)',
        isCorrect: false,
        rationale: 'This is a quadratic function.',
      },
      {
        text: '\\(y = 3x - 4\\)',
        isCorrect: true,
        rationale: 'A linear function has a constant rate of change (slope).',
      },
      {
        text: '\\(y = 1/x\\)',
        isCorrect: false,
        rationale: 'This is a rational function.',
      },
      {
        text: '\\(y = |x|\\)',
        isCorrect: false,
        rationale: 'This is an absolute value function.',
      },
    ],
    rationale:
      'A linear function can be written in the form y = mx + b, where m and b are constants. This equation fits that form.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A line is perpendicular to \\(y = -4x + 1\\) and passes through (8, 2). What is its equation?',
    answerOptions: [
      {
        text: '\\(y = 4x - 30\\)',
        isCorrect: false,
        rationale: 'This has an incorrect slope.',
      },
      {
        text: '\\(y = -\\frac{1}{4}x + 4\\)',
        isCorrect: false,
        rationale: 'This is a parallel line.',
      },
      {
        text: '\\(y = \\frac{1}{4}x\\)',
        isCorrect: true,
        rationale:
          'The perpendicular slope is \\(\\frac{1}{4}\\). Using y=mx+b: 2 = (\\(\\frac{1}{4}\\))(8) + b -> 2 = 2 + b -> b=0.',
      },
      {
        text: '\\(y = \\frac{1}{4}x + 2\\)',
        isCorrect: false,
        rationale: 'This does not pass through the given point.',
      },
    ],
    rationale:
      'The slope of the given line is -4. The slope of a perpendicular line is the negative reciprocal, which is \\(\\frac{1}{4}\\). Use the point-slope form y - y1 = m(x - x1): y - 2 = (\\(\\frac{1}{4}\\))(x - 8). y - 2 = (\\(\\frac{1}{4}\\))x - 2. So, y = \\(\\frac{1}{4}x\\).',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Find the value of \\(f(x) = x^2 - 3x when x=-4\\).',
    correctAnswer: '28',
    rationale: 'f(-4) = \\((-4)^2\\) - 3(-4) = 16 + 12 = 28.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      'Which of these points is in the solution set of the inequality \\(y < 2x - 1\\)?',
    answerOptions: [
      {
        text: '(3, 5)',
        isCorrect: false,
        rationale: '5 is not less than 2(3)-1=5.',
      },
      {
        text: '(2, 3)',
        isCorrect: false,
        rationale: '3 is not less than 2(2)-1=3.',
      },
      {
        text: '(4, 6)',
        isCorrect: true,
        rationale: '6 is less than 2(4)-1=7.',
      },
      {
        text: '(1, 1)',
        isCorrect: false,
        rationale: '1 is not less than 2(1)-1=1.',
      },
    ],
    rationale:
      'Plug each point into the inequality. For (4, 6): 6 < 2(4) - 1. 6 < 8 - 1. 6 < 7. This is a true statement.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      "A phone's value V(t) after t years is given by \\(V(t) = 800 - 150t\\). What is the phone's value after 3 years?",
    correctAnswer: '\\(350\\)',
    rationale: 'V(3) = 800 - 150(3) = 800 - 450 = 350.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'Find the distance between the points (-3, 2) and (3, 10).',
    answerOptions: [
      {
        text: '8',
        isCorrect: false,
        rationale: 'This is the change in y.',
      },
      {
        text: '10',
        isCorrect: true,
        rationale:
          'd = sqrt(\\((3 - (-3))^2 + (10 - 2)^2) = sqrt(\\)\\(6^{2}\\) + \\(8\\)^{2}) = sqrt(36+64) = sqrt(100) = 10.',
      },
      {
        text: '14',
        isCorrect: false,
        rationale: 'This is 6+8.',
      },
      {
        text: '100',
        isCorrect: false,
        rationale: 'This is the distance squared.',
      },
    ],
    rationale:
      'Use the distance formula: \\(d = \\(\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)\\(.  d = \\(\sqrt{(3 - (-3))^2 + (10 - 2)^2}\\) = \\(\sqrt{6^{2} + 8^{2}}\\) = \\(\sqrt{36 + 64}\\) = \\(\sqrt{100}\\) = 10.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      'What is the domain of the function \\(f(x) = \\(\frac{1}{x-5}\\)?',
    answerOptions: [
      {
        text: 'All real numbers',
        isCorrect: false,
        rationale: 'The function is undefined at x=5.',
      },
      {
        text: 'All real numbers except 5',
        isCorrect: true,
        rationale: 'The denominator cannot be zero, so x cannot be 5.',
      },
      {
        text: 'All real numbers except 0',
        isCorrect: false,
        rationale: 'The function is defined at x=0.',
      },
      {
        text: 'x > 5',
        isCorrect: false,
        rationale: 'The function is also defined for x < 5.',
      },
    ],
    rationale:
      'The domain of a rational function is all real numbers except for the values that make the denominator zero. In this case, x - 5 cannot equal 0, so x cannot equal 5.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'If a function has a constant slope, it is a:',
    answerOptions: [
      {
        text: 'Quadratic function',
        isCorrect: false,
        rationale: 'A quadratic function has a changing slope.',
      },
      {
        text: 'Linear function',
        isCorrect: true,
        rationale: 'A linear function is defined by \\(its constant slope\\).',
      },
      {
        text: 'Exponential function',
        isCorrect: false,
        rationale: 'An exponential function has a changing slope.',
      },
      {
        text: 'Absolute value function',
        isCorrect: false,
        rationale: 'An absolute value function has two different slopes.',
      },
    ],
    rationale:
      'A key characteristic of a linear function is that its rate of change, or slope, is constant.',
    challenge_tags: ['math-4'],
  },
];
