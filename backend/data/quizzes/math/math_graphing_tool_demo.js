// Graphing concepts demo with interactive graphing tool questions
module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'medium',
    question: 'Which point is plotted on the graph?',
    graphSpec: {
      objects: [
        {
          id: 'point1',
          type: 'point',
          definition: { x: 3, y: 4, label: 'A' },
        },
      ],
    },
    answerOptions: [
      {
        text: '(3, 4)',
        isCorrect: true,
        rationale: 'Point A is located at x=3, y=4.',
      },
      {
        text: '(4, 3)',
        isCorrect: false,
        rationale:
          'The coordinates are reversed. The x-coordinate is 3, not 4.',
      },
      {
        text: '(-3, 4)',
        isCorrect: false,
        rationale: 'The point is in the positive x region.',
      },
      {
        text: '(3, -4)',
        isCorrect: false,
        rationale: 'The point is in the positive y region.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'easy',
    question: 'What is the slope of the line shown on the graph?',
    graphSpec: {
      objects: [
        {
          id: 'line1',
          type: 'line',
          definition: { slope: 2, intercept: -1 },
        },
      ],
    },
    answerOptions: [
      {
        text: '2',
        isCorrect: true,
        rationale: 'The line rises 2 units for every 1 unit to the right.',
      },
      {
        text: '-1',
        isCorrect: false,
        rationale: '-1 is the y-intercept, not the slope.',
      },
      {
        text: '\\(\\(\frac{1}{2}\\)',
        isCorrect: false,
        rationale: 'The slope is 2, not \\(\\(\frac{1}{2}\\).',
      },
      {
        text: '-2',
        isCorrect: false,
        rationale: 'The line has a positive slope, not negative.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'medium',
    question: 'Which two points are plotted on the graph?',
    graphSpec: {
      objects: [
        {
          id: 'point1',
          type: 'point',
          definition: { x: -2, y: 3 },
        },
        {
          id: 'point2',
          type: 'point',
          definition: { x: 4, y: -1 },
        },
      ],
    },
    answerOptions: [
      {
        text: '(-2, 3) and (4, -1)',
        isCorrect: true,
        rationale: 'The two points are correctly identified.',
      },
      {
        text: '(2, 3) and (4, 1)',
        isCorrect: false,
        rationale: 'The signs of the coordinates are incorrect.',
      },
      {
        text: '(3, -2) and (-1, 4)',
        isCorrect: false,
        rationale: 'The x and y coordinates are swapped.',
      },
      {
        text: '(-2, -3) and (4, 1)',
        isCorrect: false,
        rationale: 'The y-coordinates are incorrect.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    question: 'What is the y-intercept of the line shown on the graph?',
    graphSpec: {
      objects: [
        {
          id: 'line2',
          type: 'line',
          definition: { slope: -0.5, intercept: 3 },
        },
      ],
    },
    answerOptions: [
      {
        text: '3',
        isCorrect: true,
        rationale: 'The line crosses the y-axis at (0, 3).',
      },
      {
        text: '-0.5',
        isCorrect: false,
        rationale: '-0.5 is the slope, not the y-intercept.',
      },
      {
        text: '-3',
        isCorrect: false,
        rationale: 'The y-intercept is positive 3.',
      },
      {
        text: '0',
        isCorrect: false,
        rationale: 'The line does not pass through the origin.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'medium',
    question:
      'What is the slope of the line passing through (2, 3) and (5, 9)?',
    answerOptions: [
      {
        text: '2',
        isCorrect: true,
        rationale: 'Slope = (9−3)/(5−2) = \\(\\(\frac{6}{3}\\) = 2.',
      },
      {
        text: '\\(\\(\frac{3}{2}\\)',
        isCorrect: false,
        rationale:
          'Swapped rise/run; correct is \\(\\(\frac{6}{3}\\), not \\(\\(\frac{3}{2}\\).',
      },
      {
        text: '\\(\\(\frac{1}{2}\\)',
        isCorrect: false,
        rationale:
          'This would be \\(\\(\frac{3}{6}\\), but rise/run is \\(\\(\frac{6}{3}\\).',
      },
      {
        text: '-2',
        isCorrect: false,
        rationale: 'Rise and run are both positive, so slope is positive.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'easy',
    question: 'What is the y-intercept of y = 4x − 7?',
    answerOptions: [
      {
        text: '-7',
        isCorrect: true,
        rationale: 'In y = mx + b, the y-intercept is b = −7.',
      },
      {
        text: '4',
        isCorrect: false,
        rationale: '4 is the slope (m), not the y-intercept.',
      },
      {
        text: '7',
        isCorrect: false,
        rationale: 'Sign matters; the intercept is −7.',
      },
      {
        text: '0',
        isCorrect: false,
        rationale: 'The graph crosses the y-axis at (0, −7).',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'medium',
    question:
      'Which equation represents a line parallel to y = −(\\(\\(\frac{1}{3}\\))x + 2 and passing through (0, 5)?',
    answerOptions: [
      {
        text: 'y = −(\\(\\(\frac{1}{3}\\))x + 5',
        isCorrect: true,
        rationale:
          'Parallel lines have the same slope (−\\(\\(\frac{1}{3}\\)) and (0,5) implies b=5.',
      },
      {
        text: 'y = (\\(\\(\frac{1}{3}\\))x + 5',
        isCorrect: false,
        rationale: 'This has the opposite slope; not parallel.',
      },
      {
        text: 'y = −3x + 5',
        isCorrect: false,
        rationale: 'Slope −3 is not equal to −\\(\\(\frac{1}{3}\\).',
      },
      {
        text: 'y = −(\\(\\(\frac{1}{3}\\))x − 5',
        isCorrect: false,
        rationale: 'This crosses the y-axis at −5, not at 5.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'medium',
    question:
      'A line is perpendicular to y = 2x + 1 and has a y-intercept of 3. Which is its equation?',
    answerOptions: [
      {
        text: 'y = −(\\(\\(\frac{1}{2}\\))x + 3',
        isCorrect: true,
        rationale:
          'Perpendicular slope is the negative reciprocal of 2, which is −\\(\\(\frac{1}{2}\\).',
      },
      {
        text: 'y = 2x + 3',
        isCorrect: false,
        rationale: 'This would be parallel, not perpendicular.',
      },
      {
        text: 'y = (\\(\\(\frac{1}{2}\\))x + 3',
        isCorrect: false,
        rationale: 'Reciprocal is correct but sign must be negative.',
      },
      {
        text: 'y = −2x + 3',
        isCorrect: false,
        rationale:
          'This uses the negative of the slope, not the negative reciprocal.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'medium',
    question: 'What type of line is shown on the graph?',
    graphSpec: {
      objects: [
        {
          id: 'line3',
          type: 'line',
          definition: { slope: 0, intercept: 2 },
        },
      ],
    },
    answerOptions: [
      {
        text: 'Horizontal line',
        isCorrect: true,
        rationale: 'The line has a slope of 0, making it horizontal at y = 2.',
      },
      {
        text: 'Vertical line',
        isCorrect: false,
        rationale: 'Vertical lines have undefined slope, not 0.',
      },
      {
        text: 'Positive slope',
        isCorrect: false,
        rationale: 'The slope is 0, not positive.',
      },
      {
        text: 'Negative slope',
        isCorrect: false,
        rationale: 'The slope is 0, not negative.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    question:
      'The graph shows three collinear points. What is the slope of the line?',
    graphSpec: {
      objects: [
        {
          id: 'point1',
          type: 'point',
          definition: { x: 0, y: 1 },
        },
        {
          id: 'point2',
          type: 'point',
          definition: { x: 2, y: 5 },
        },
        {
          id: 'point3',
          type: 'point',
          definition: { x: 4, y: 9 },
        },
      ],
    },
    answerOptions: [
      {
        text: '2',
        isCorrect: true,
        rationale: 'Using any two points: slope = (5-1)/(2-0) = \\(\\frac{4}{2}\\) = 2.',
      },
      {
        text: '\\(\\(\frac{1}{2}\\)',
        isCorrect: false,
        rationale: 'This is the reciprocal of the correct slope.',
      },
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is the rise, not the slope.',
      },
      {
        text: '1',
        isCorrect: false,
        rationale: 'The line rises 2 units for each 1 unit horizontally.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    difficulty: 'medium',
    question:
      'A line has slope 3 and passes through (1, 4). Which point lies on the line?',
    answerOptions: [
      {
        text: '(3, 10)',
        isCorrect: true,
        rationale: 'y − 4 = 3(x − 1) ⇒ y = 3x + 1; at x=3, y=10.',
      },
      {
        text: '(3, 7)',
        isCorrect: false,
        rationale: 'Plugging x=3 into y=3x+1 gives 10, not 7.',
      },
      {
        text: '(0, 1)',
        isCorrect: false,
        rationale: '(0,1) is the y-intercept but we need x=3.',
      },
      {
        text: '(2, 4)',
        isCorrect: false,
        rationale: 'At x=2, y should be 7, not 4.',
      },
    ],
    challenge_tags: ['math-4'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    difficulty: 'hard',
    question:
      'What is the equation of the line passing through (−2, 1) and (4, −11)?',
    answerOptions: [
      {
        text: 'y = −2x − 3',
        isCorrect: true,
        rationale:
          'Slope = (−11−1)/(4−(−2)) = −\\(\\(\frac{12}{6}\\) = −2; solve b with 1 = −2(−2) + b ⇒ b = −3.',
      },
      {
        text: 'y = −2x + 3',
        isCorrect: false,
        rationale: 'Slope correct, intercept sign is wrong (should be −3).',
      },
      {
        text: 'y = 2x − 3',
        isCorrect: false,
        rationale: 'Slope should be −2, not 2.',
      },
      {
        text: 'y = 2x + 3',
        isCorrect: false,
        rationale: 'Both slope and intercept are incorrect.',
      },
    ],
    challenge_tags: ['math-4'],
  },
];
