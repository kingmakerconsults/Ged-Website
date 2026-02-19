module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the y-intercept of the function \\(f(x) = 4x - 8\\)?',
    answerOptions: [
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is the slope of the line.',
      },
      {
        text: '-8',
        isCorrect: true,
        rationale:
          'The y-intercept is the value of the function when x=0. f(0) = -8.',
      },
      {
        text: '2',
        isCorrect: false,
        rationale: 'This is the x-intercept.',
      },
      {
        text: '8',
        isCorrect: false,
        rationale: 'This is the negative of the y-intercept.',
      },
    ],
    rationale:
      'The y-intercept occurs where x=0. In the form y = mx + b, the y-intercept is b. Here, it is -8.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'If \\(f(x) = 10 - 3x\\), what is the value of \\(f(2)\\)?',
    correctAnswer: '4',
    rationale:
      'Substitute 2 for x in the function: f(2) = 10 - 3(2) = 10 - 6 = 4.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the slope of the line that passes through the points (-1, 3) and (2, 9).',
    answerOptions: [
      {
        text: '\\(\\(\frac{1}{2}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '2',
        isCorrect: true,
        rationale:
          'Slope = (change in y) / (change in x) = (9 - 3) / (2 - (-1)) = 6 / 3 = 2.',
      },
      {
        text: '3',
        isCorrect: false,
        rationale: 'This is the change in x.',
      },
      {
        text: '6',
        isCorrect: false,
        rationale: 'This is the change in y.',
      },
    ],
    rationale:
      'The formula for the slope is \\(m = \\(\frac{y_2 - y_1}{x_2 - x_1}\\). So, \\(m = \\(\frac{9 - 3}{2 - (-1)}\\) = \\(\frac{6}{3}\\) = 2.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'What is the x-intercept of the function \\(f(x) = 5x - 15\\)?',
    correctAnswer: '3',
    rationale:
      'The x-intercept is the point where f(x) = 0. So, 0 = 5x - 15. Add 15 to both sides: 15 = 5x. Divide by 5: x = 3.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'Which of these equations represents a line with a negative slope?',
    answerOptions: [
      {
        text: 'y = x + 5',
        isCorrect: false,
        rationale: 'The slope is 1 (positive).',
      },
      {
        text: 'y = -2x + 3',
        isCorrect: true,
        rationale: 'The slope is -2, which is negative.',
      },
      {
        text: 'y = 5',
        isCorrect: false,
        rationale: 'This is a horizontal line with a slope of 0.',
      },
      {
        text: 'x = -2',
        isCorrect: false,
        rationale: 'This is a vertical line with an undefined slope.',
      },
    ],
    rationale:
      "In the slope-intercept form y = mx + b, 'm' is the slope. A negative value for 'm' indicates a negative slope.",
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      "The cost of renting a car is a flat fee of $50 plus $0.25 per mile. Which function represents the total cost, C(m), for driving 'm' miles?",
    answerOptions: [
      {
        text: 'C(m) = 50.25m',
        isCorrect: false,
        rationale: 'This implies the entire cost is variable.',
      },
      {
        text: 'C(m) = 50m + 0.25',
        isCorrect: false,
        rationale: 'This incorrectly assigns the variable to the flat fee.',
      },
      {
        text: 'C(m) = 50 + 0.25m',
        isCorrect: true,
        rationale:
          'The total cost is the fixed fee plus the variable cost per mile.',
      },
      {
        text: 'C(m) = (50 + 0.25)m',
        isCorrect: false,
        rationale: 'This incorrectly combines the costs.',
      },
    ],
    rationale:
      'The total cost is the sum of the fixed fee ($50) and the variable cost, which is $0.25 times the number of miles (m). So, C(m) = 50 + 0.25m.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'If a line has a slope of -2 and passes through the point (1, 5), what is its y-intercept?',
    correctAnswer: '7',
    rationale:
      'Using y = mx + b, plug in the values: 5 = -2(1) + b. So, 5 = -2 + b. Add 2 to both sides to find b = 7.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question: 'What is the domain of the function \\(f(x) = \\sqrt{x-2}\\)?',
    answerOptions: [
      {
        text: 'x > 2',
        isCorrect: false,
        rationale:
          'The value under the square root can be zero, so x can be equal to 2.',
      },
      {
        text: '\\(x\\geq2\\)',
        isCorrect: true,
        rationale:
          'The expression under a square root must be non-negative. So, \\(x-2 \\geq 0\\), which means \\(x\\geq2\\).',
      },
      {
        text: 'All real numbers',
        isCorrect: false,
        rationale:
          'If x < 2, the value under the square root would be negative.',
      },
      {
        text: '\\(x\\leq2\\)',
        isCorrect: false,
        rationale:
          'This would result in a negative value under the square root for x < 2.',
      },
    ],
    rationale:
      'For the function to have a real value, the expression inside the square root must be greater than or equal to zero. So, \\(x-2 \\geq 0\\), which simplifies to \\(x \\geq 2\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the value of \\(f(g(2))\\) when \\(f(x) = 3x\\) and \\(g(x) = x + 5\\).',
    correctAnswer: '21',
    rationale:
      'First, find g(2): g(2) = 2 + 5 = 7. Then, find f(7): f(7) = 3 * 7 = 21.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A line is graphed on a coordinate plane. It passes through (0, 4) and (2, 0). What is the equation of the line?',
    answerOptions: [
      {
        text: 'y = 2x + 4',
        isCorrect: false,
        rationale: 'This line has a positive slope.',
      },
      {
        text: 'y = -2x + 4',
        isCorrect: true,
        rationale:
          'The y-intercept is 4. The slope is (0-4)/(2-0) = -2. So, y = -2x + 4.',
      },
      {
        text: 'y = -2x + 2',
        isCorrect: false,
        rationale: 'This line has the correct slope but wrong y-intercept.',
      },
      {
        text: 'y = 4x + 2',
        isCorrect: false,
        rationale: 'This line has an incorrect slope and y-intercept.',
      },
    ],
    rationale:
      'First, find the slope: \\(m = \\(\frac{0 - 4}{2 - 0}\\) = -2. The y-intercept is the point where x=0, which is (0, 4). So, b = 4. The equation is y = -2x + 4.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      'Which of the following describes the graph of \\(y = x^2 - 1\\)?',
    answerOptions: [
      {
        text: 'A line that passes through the origin.',
        isCorrect: false,
        rationale: 'This is a parabola, not a line.',
      },
      {
        text: 'A parabola that opens upward with its vertex at (0, -1).',
        isCorrect: true,
        rationale:
          "The \\(x^2 term means it's a parabola opening upward. The -1 shifts the vertex down one unit from the origin.\\)",
      },
      {
        text: 'A parabola that opens downward with its vertex at (0, 1).',
        isCorrect: false,
        rationale:
          'The coefficient of \\(x^2 is positive, so it opens upward.\\)',
      },
      {
        text: 'A circle with a radius of 1.',
        isCorrect: false,
        rationale: 'The equation for a circle is different.',
      },
    ],
    rationale:
      "The \\(x^2 term indicates a parabola. Since the coefficient of \\(x^2 is positive, it opens upward. The '-1' term shifts the vertex of the parabola down by one unit from the origin to (0, -1).\\)\\)",
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'If a graph of a function is a straight line, the function is:',
    answerOptions: [
      {
        text: 'Linear',
        isCorrect: true,
        rationale: "A linear function's graph is a straight line.",
      },
      {
        text: 'Quadratic',
        isCorrect: false,
        rationale: "A quadratic function's graph is a parabola.",
      },
      {
        text: 'Exponential',
        isCorrect: false,
        rationale: "An exponential function's graph is a curve.",
      },
      {
        text: 'Absolute Value',
        isCorrect: false,
        rationale: "An absolute value function's graph is V-shaped.",
      },
    ],
    rationale:
      'By definition, a linear function is a function whose graph is a straight line.',
    challenge_tags: ['math-3'],
  },
];
