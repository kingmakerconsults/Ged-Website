module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'For the function \\(f(x) = 7x + 2\\), what is \\(f(3)\\)?',
    answerOptions: [
      {
        text: '12',
        isCorrect: false,
        rationale: 'This is 7+3+2.',
      },
      {
        text: '21',
        isCorrect: false,
        rationale: 'This is 7*3.',
      },
      {
        text: '23',
        isCorrect: true,
        rationale: 'f(3) = 7(3) + 2 = 21 + 2 = 23.',
      },
      {
        text: '30',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Substitute 3 for x in the function: f(3) = 7(3) + 2 = 21 + 2 = 23.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question:
      'What is the y-intercept of the line \\(y = \\frac{1}{2}x - 6\\)?',
    correctAnswer: '-6',
    rationale:
      "In the slope-intercept form y = mx + b, 'b' represents the y-intercept. In this case, b = -6.",
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the slope of the line passing through the points (3, -1) and (5, 3)?',
    answerOptions: [
      {
        text: '-2',
        isCorrect: false,
        rationale: 'This is an incorrect calculation of the slope.',
      },
      {
        text: '\\(\\frac{1}{2}\\)',
        isCorrect: false,
        rationale: 'This is the reciprocal of the slope.',
      },
      {
        text: '2',
        isCorrect: true,
        rationale: 'Slope = (3 - (-1)) / (5 - 3) = 4 / 2 = 2.',
      },
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is the change in y, not the slope.',
      },
    ],
    rationale:
      'The slope is calculated as the change in y divided by the change in x: \\(m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{3 - (-1)}{5 - 3} = \\frac{4}{2} = 2\\).',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'Given the function \\(f(x) = 10\\), what is the value of \\(f(7)\\)?',
    correctAnswer: '10',
    rationale:
      'This is a constant function, which means the output is always 10, regardless of the input value for x.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Which of the following points is on the line \\(y = 4x - 5\\)?',
    answerOptions: [
      {
        text: '(1, -1)',
        isCorrect: true,
        rationale: 'If x=1, y = 4(1) - 5 = -1.',
      },
      {
        text: '(2, 2)',
        isCorrect: false,
        rationale: 'If x=2, y = 4(2) - 5 = 3.',
      },
      {
        text: '(3, 6)',
        isCorrect: false,
        rationale: 'If x=3, y = 4(3) - 5 = 7.',
      },
      {
        text: '(0, 5)',
        isCorrect: false,
        rationale: 'If x=0, y = 4(0) - 5 = -5.',
      },
    ],
    rationale:
      'Plug the x-coordinate of each point into the equation to see if it produces the correct y-coordinate. For (1, -1): y = 4(1) - 5 = 4 - 5 = -1. It matches.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      "A personal trainer charges a one-time consultation fee of \\(60\\) and \\(35\\) per session. What function C(s) represents the total cost for 's' sessions?",
    answerOptions: [
      {
        text: 'C(s) = 60s + 35',
        isCorrect: false,
        rationale: 'This reverses the fee and session cost.',
      },
      {
        text: 'C(s) = 35s + 60',
        isCorrect: true,
        rationale:
          'The total cost is the variable cost per session plus the fixed consultation fee.',
      },
      {
        text: 'C(s) = 95s',
        isCorrect: false,
        rationale: 'This incorrectly combines the costs.',
      },
      {
        text: 'C(s) = 60(s + 35)',
        isCorrect: false,
        rationale: 'This is an incorrect representation.',
      },
    ],
    rationale:
      'The total cost C(s) is the sum of the one-time fee (\\(60\\)) and the cost per session (\\(35\\)) multiplied by the number of sessions (s). So, C(s) = 35s + 60.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'What is the x-intercept of the line \\(y = -3x + 9\\)?',
    correctAnswer: '3',
    rationale:
      'To find the x-intercept, set y = 0. 0 = -3x + 9. Add 3x to both sides: 3x = 9. Divide by 3: x = 3.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question: 'The graph of a quadratic function is a:',
    answerOptions: [
      {
        text: 'Straight line',
        isCorrect: false,
        rationale: 'This is the graph of a linear function.',
      },
      {
        text: 'V-shape',
        isCorrect: false,
        rationale: 'This is the graph of an absolute value function.',
      },
      {
        text: 'Parabola',
        isCorrect: true,
        rationale:
          'A quadratic function (e.g., y=\\(x^{2}\\)) creates a U-shaped curve called a parabola.',
      },
      {
        text: 'Circle',
        isCorrect: false,
        rationale: 'A circle is not a function.',
      },
    ],
    rationale:
      'The graph of a quadratic equation of the form \\(y = ax^{2} + bx + c\\) is a parabola.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A line has a slope of 4 and a y-intercept of -2. What is the equation of the line?',
    correctAnswer: 'y = 4x - 2',
    rationale:
      'Using the slope-intercept form y = mx + b, substitute the given slope for m and the y-intercept for b.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the slope of the line represented by the equation \\(6x - 2y = 8\\)?',
    answerOptions: [
      {
        text: '-3',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '3',
        isCorrect: true,
        rationale:
          'Rewrite the equation as -2y = -6x + 8. Divide by -2 to get y = 3x - 4. The slope is 3.',
      },
      {
        text: '6',
        isCorrect: false,
        rationale: 'This is the coefficient of x.',
      },
      {
        text: '-4',
        isCorrect: false,
        rationale: 'This is the y-intercept.',
      },
    ],
    rationale:
      'To find the slope, convert the equation into slope-intercept form (y = mx + b). -2y = -6x + 8. Divide all terms by -2 to get y = 3x - 4. The slope (m) is 3.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      'Given \\(g(x) = x+3\\), what is the new function if the graph is shifted down by 5 units?',
    answerOptions: [
      {
        text: '\\(h(x) = x + 8\\)',
        isCorrect: false,
        rationale: 'This is a shift up by 5 units.',
      },
      {
        text: '\\(h(x) = x - 2\\)',
        isCorrect: true,
        rationale:
          'To shift down by 5, subtract 5 from the function: (x+3) - 5 = x - 2.',
      },
      {
        text: '\\(h(x) = x - 5\\)',
        isCorrect: false,
        rationale: 'This would be a shift down of x, not x+3.',
      },
      {
        text: '\\(h(x) = -5x + 3\\)',
        isCorrect: false,
        rationale: 'This changes the slope.',
      },
    ],
    rationale:
      'A vertical shift down by k units is represented by h(x) = g(x) - k. So, h(x) = (x + 3) - 5 = x - 2.',
    challenge_tags: ['math-7'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'If a line passes through (2, 6) and has a slope of 0, what is the equation of the line?',
    answerOptions: [
      {
        text: 'x = 2',
        isCorrect: false,
        rationale: 'This is a vertical line with an undefined slope.',
      },
      {
        text: 'y = 2',
        isCorrect: false,
        rationale: 'This line does not pass through (2, 6).',
      },
      {
        text: 'y = 6',
        isCorrect: true,
        rationale:
          'A line with a slope of 0 is a horizontal line. Since it passes through (2, 6), the y-value is constant at 6.',
      },
      {
        text: 'y = 6x',
        isCorrect: false,
        rationale: 'This line has a slope of 6.',
      },
    ],
    rationale:
      "A slope of 0 indicates a horizontal line. The equation of a horizontal line is y = c, where 'c' is the constant y-value. Since the line passes through (2, 6), the y-value must be 6. The equation is y = 6.",
    challenge_tags: ['math-7'],
  },
];
