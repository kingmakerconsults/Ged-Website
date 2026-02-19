/**
 * Interactive Graphing Quiz — Students plot points and draw lines as answers.
 *
 * answerType: 'graphPlot' — the student's graph IS the answer (graded automatically).
 * Questions without answerType use standard multipleChoice with graphSpec as a visual aid.
 *
 * expectedAnswer: { points: [{x, y}], lines: [{slope, intercept}] }
 * tolerance (default 0.5): how far a student point can be from the expected point.
 */
module.exports = [
  // ─── Q1: Plot a single point ───────────────────────────────────────────
  {
    questionNumber: 1,
    type: 'graph',
    answerType: 'graphPlot',
    difficulty: 'easy',
    calculator: true,
    question: 'Plot the point \\((3, 4)\\) on the coordinate plane.',
    graphInstructions:
      'Click "Add Point" in the toolbar, then click on the coordinate plane at the location (3, 4). The point will snap to the nearest grid intersection.',
    graphSpec: {
      objects: [], // empty — student starts with a blank graph
    },
    expectedAnswer: {
      points: [{ x: 3, y: 4 }],
    },
    tolerance: 0.5,
    points: 1,
    challenge_tags: ['math-3'],
    subject: 'Math',
  },

  // ─── Q2: Plot two intercepts ───────────────────────────────────────────
  {
    questionNumber: 2,
    type: 'graph',
    answerType: 'graphPlot',
    difficulty: 'medium',
    calculator: true,
    question:
      'The equation of a line is \\(y = 2x - 4\\). Plot the x-intercept and the y-intercept on the coordinate plane.',
    graphInstructions:
      'Use "Add Point" to place two points: one where the line crosses the x-axis and one where it crosses the y-axis.',
    graphSpec: {
      objects: [], // blank — student plots from scratch
    },
    expectedAnswer: {
      points: [
        { x: 2, y: 0 }, // x-intercept
        { x: 0, y: -4 }, // y-intercept
      ],
    },
    tolerance: 0.5,
    points: 2,
    challenge_tags: ['math-4'],
    subject: 'Math',
  },

  // ─── Q3: Draw a line ──────────────────────────────────────────────────
  {
    questionNumber: 3,
    type: 'graph',
    answerType: 'graphPlot',
    difficulty: 'medium',
    calculator: true,
    question: 'Draw the line \\(y = -x + 3\\) on the coordinate plane.',
    graphInstructions:
      'Click "Draw Line" in the toolbar, then click two points that lie on the line y = −x + 3. A line will be drawn through both points.',
    graphSpec: {
      objects: [],
    },
    expectedAnswer: {
      lines: [{ slope: -1, intercept: 3 }],
    },
    slopeTolerance: 0.15,
    interceptTolerance: 0.5,
    points: 2,
    challenge_tags: ['math-4'],
    subject: 'Math',
  },

  // ─── Q4: Read a graph (MC with visual aid) ────────────────────────────
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'easy',
    calculator: true,
    question: 'The graph below shows a line. What is the slope of this line?',
    graphSpec: {
      objects: [
        {
          id: 'display-line',
          type: 'line',
          definition: { slope: -2, intercept: 5 },
        },
      ],
    },
    answerOptions: [
      {
        text: '-2',
        isCorrect: true,
        rationale:
          'The line falls 2 units for every 1 unit to the right, so the slope is −2.',
      },
      {
        text: '2',
        isCorrect: false,
        rationale:
          'The line is decreasing (going down from left to right), so the slope is negative.',
      },
      {
        text: '5',
        isCorrect: false,
        rationale: '5 is the y-intercept, not the slope.',
      },
      {
        text: '-5',
        isCorrect: false,
        rationale:
          'The y-intercept is 5, not the slope. The slope measures the steepness of the line.',
      },
    ],
    challenge_tags: ['math-3'],
    subject: 'Math',
  },

  // ─── Q5: Find the intersection (graph + plot answer) ──────────────────
  {
    questionNumber: 5,
    type: 'graph',
    answerType: 'graphPlot',
    difficulty: 'hard',
    calculator: true,
    question:
      'The graph shows two lines: \\(y = x + 1\\) and \\(y = -x + 5\\). Plot the point where these two lines intersect.',
    graphInstructions:
      'Look at where the two lines cross. Use "Add Point" to place a point at that intersection.',
    graphSpec: {
      objects: [
        {
          id: 'line-a',
          type: 'line',
          definition: { slope: 1, intercept: 1 },
        },
        {
          id: 'line-b',
          type: 'line',
          definition: { slope: -1, intercept: 5 },
        },
      ],
    },
    expectedAnswer: {
      points: [{ x: 2, y: 3 }],
    },
    tolerance: 0.5,
    points: 2,
    challenge_tags: ['math-5'],
    subject: 'Math',
  },
];
