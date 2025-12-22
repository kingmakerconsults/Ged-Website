module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'In which quadrant is the point (-3, 5) located?',
    answerOptions: [
      {
        text: 'Quadrant I',
        isCorrect: false,
        rationale: 'Quadrant I has positive x and positive y values.',
      },
      {
        text: 'Quadrant II',
        isCorrect: true,
        rationale: 'Quadrant II has negative x and positive y values.',
      },
      {
        text: 'Quadrant III',
        isCorrect: false,
        rationale: 'Quadrant III has negative x and negative y values.',
      },
      {
        text: 'Quadrant IV',
        isCorrect: false,
        rationale: 'Quadrant IV has positive x and negative y values.',
      },
    ],
    rationale:
      'The coordinate plane is divided into four quadrants. Quadrant II is where the x-coordinates are negative and the y-coordinates are positive.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'What is the slope of a vertical line?',
    correctAnswer: 'Undefined',
    rationale:
      "A vertical line has a 'run' of 0. Since slope is rise/run, dividing by zero makes the slope undefined.",
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the equation of a line with slope 1/3 that passes through the point (3, 2)?',
    answerOptions: [
      {
        text: 'y = (1/3)x + 1',
        isCorrect: true,
        rationale:
          'Using y=mx+b: 2 = ($\\frac{1}{3}$)(3) + b -> 2 = 1 + b -> b=1.',
      },
      {
        text: 'y = 3x - 7',
        isCorrect: false,
        rationale: 'This uses the reciprocal of the slope.',
      },
      {
        text: 'y = (\\frac{1}{3})x + 3',
        isCorrect: false,
        rationale: 'This does not pass through the given point.',
      },
      {
        text: 'y = (1/3)x - 1',
        isCorrect: false,
        rationale: 'This has the wrong y-intercept.',
      },
    ],
    rationale:
      'Use the point-slope form y - y1 = m(x - x1): y - 2 = ($\\frac{1}{3}$)(x - 3). This simplifies to y - 2 = ($\\frac{1}{3}$)x - 1, so y = ($\\frac{1}{3}$)x + 1.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'If f(x) = 2x - 5, for what value of x is f(x) = 15?',
    correctAnswer: '10',
    rationale:
      'Set the function equal to 15: 2x - 5 = 15. Add 5 to both sides: 2x = 20. Divide by 2: x = 10.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: "What does the 'm' represent in the linear equation y = mx + b?",
    answerOptions: [
      {
        text: 'The y-intercept',
        isCorrect: false,
        rationale: "The 'b' represents the y-intercept.",
      },
      {
        text: 'The x-intercept',
        isCorrect: false,
        rationale: 'The x-intercept is not directly represented in this form.',
      },
      {
        text: 'The slope',
        isCorrect: true,
        rationale:
          "The coefficient of x, 'm', represents the slope of the line.",
      },
      {
        text: 'A point on the line',
        isCorrect: false,
        rationale: '(x, y) represents a point on the line.',
      },
    ],
    rationale:
      "In the slope-intercept form of a linear equation, 'm' is the variable used to represent the slope of the line.",
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'Which of the following lines is perpendicular to the line 3x + y = 5?',
    answerOptions: [
      {
        text: 'y = -3x + 2',
        isCorrect: false,
        rationale: 'This line is parallel.',
      },
      {
        text: 'y = $\\frac{1}{3}x - 1$',
        isCorrect: true,
        rationale:
          'The original line has a slope of -3. The perpendicular slope is the negative reciprocal, $\\frac{1}{3}$.',
      },
      {
        text: 'y = 3x + 5',
        isCorrect: false,
        rationale: 'This has an incorrect slope.',
      },
      {
        text: 'y = $-\\frac{1}{3}x + 4$',
        isCorrect: false,
        rationale: 'This is the reciprocal, but not the negative reciprocal.',
      },
    ],
    rationale:
      'First, find the slope of the given line by rewriting it in slope-intercept form: y = -3x + 5. The slope is -3. The slope of a perpendicular line is the negative reciprocal, which is $\\frac{1}{3}$.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Given $f(x) = x^3 - 1$, find $f(2)$.',
    correctAnswer: '7',
    rationale: 'Substitute 2 for x: f(2) = $(2)^3$ - 1 = 8 - 1 = 7.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      'What is the axis of symmetry for the parabola $y = x^2 - 6x + 8$?',
    answerOptions: [
      {
        text: 'x = -6',
        isCorrect: false,
        rationale: 'This uses -b.',
      },
      {
        text: 'x = 3',
        isCorrect: true,
        rationale:
          'The axis of symmetry is x = -b/(2a). Here, x = -(-6)/(2*1) = $\\frac{6}{2}$ = 3.',
      },
      {
        text: 'x = 6',
        isCorrect: false,
        rationale: 'This is -b.',
      },
      {
        text: 'x = -3',
        isCorrect: false,
        rationale: 'This is b/(2a).',
      },
    ],
    rationale:
      'The formula for the axis of symmetry of a parabola in the form $y = ax^2 + bx + c$ is $x = \\frac{-b}{2a}$. For this equation, a=1 and b=-6. So, $x = \\frac{-(-6)}{2(1)} = \\frac{6}{2} = 3$.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      "A company's profit P(t) in thousands of dollars, t years after 2010, is modeled by P(t) = 50t + 200. What was the profit in 2015?",
    correctAnswer: '450 thousand dollars',
    rationale:
      'The year 2015 is 5 years after 2010, so t=5. P(5) = 50(5) + 200 = 250 + 200 = 450. The profit is $450,000.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'What is the distance between the points (1, 2) and (4, 6)?',
    answerOptions: [
      {
        text: '3',
        isCorrect: false,
        rationale: 'This is the change in x.',
      },
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is the change in y.',
      },
      {
        text: '5',
        isCorrect: true,
        rationale:
          'Using the distance formula, sqrt($(4-1)^2 + (6-2)^2$) = sqrt($3^2 + 4^2$) = sqrt(9 + 16) = sqrt(25) = 5.',
      },
      {
        text: '7',
        isCorrect: false,
        rationale: 'This is the sum of the changes in x and y.',
      },
    ],
    rationale:
      'Use the distance formula: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. $d = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      'Which of the following represents the graph of an exponential function?',
    answerOptions: [
      {
        text: 'A straight line',
        isCorrect: false,
        rationale: 'This is a linear function.',
      },
      {
        text: 'A parabola',
        isCorrect: false,
        rationale: 'This is a quadratic function.',
      },
      {
        text: 'A curve that steadily increases or decreases at a changing rate',
        isCorrect: true,
        rationale:
          'Exponential functions show growth or decay that is proportional to the current value.',
      },
      {
        text: 'A V-shape',
        isCorrect: false,
        rationale: 'This is an absolute value function.',
      },
    ],
    rationale:
      'The graph of an exponential function, like $y = 2^x$, is a curve that shows rapid increase (growth) or decrease (decay).',
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A line has a y-intercept of 4 and an x-intercept of -2. What is the slope of the line?',
    answerOptions: [
      {
        text: '-2',
        isCorrect: false,
        rationale: 'This is the x-intercept.',
      },
      {
        text: '2',
        isCorrect: true,
        rationale:
          'The points are (0, 4) and (-2, 0). Slope = (0 - 4) / (-2 - 0) = -4 / -2 = 2.',
      },
      {
        text: '$\\frac{1}{2}$',
        isCorrect: false,
        rationale: 'This is the reciprocal of the slope.',
      },
      {
        text: '$-\\frac{1}{2}$',
        isCorrect: false,
        rationale: 'This is the negative reciprocal of the slope.',
      },
    ],
    rationale:
      'The y-intercept is the point (0, 4) and the x-intercept is the point (-2, 0). The slope is the change in y over the change in x: $m = \\frac{4 - 0}{0 - (-2)} = \\frac{4}{2} = 2$.',
    challenge_tags: ['math-4'],
  },
];
