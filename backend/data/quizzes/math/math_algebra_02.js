module.exports = [
  {
    questionNumber: 1,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'Solve for b: \\(b - 9 = 2\\).',
    correctAnswer: '11',
    rationale:
      'To solve for b, add 9 to both sides of the equation: $2 + 9 = 11\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Which expression is equivalent to \\(5x + 3x - x\\)?',
    answerOptions: [
      {
        text: '\\(8x\\)',
        isCorrect: false,
        rationale:
          'This is the result of \\(5x + 3x\\), but does not subtract x.',
      },
      {
        text: '\\(7x\\)',
        isCorrect: true,
        rationale: 'Combine the like terms: $5 + 3 - 1 = 7\\). So, \\(7x\\).',
      },
      {
        text: '\\(9x\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x^7\\)',
        isCorrect: false,
        rationale: 'This is an incorrect application of exponent rules.',
      },
    ],
    rationale:
      'Combine the coefficients of the like terms: $5 + 3 - 1 = 7\\). The simplified expression is \\(7x\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'Solve for z: \\(\\frac{z}{5} + 3 = 7\\).',
    answerOptions: [
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is the result before multiplying by 5.',
      },
      {
        text: '10',
        isCorrect: false,
        rationale:
          'This is the result if you subtract 3 from 7 and then add 5.',
      },
      {
        text: '20',
        isCorrect: true,
        rationale:
          'Subtract 3 from both sides to get \\(z/5 = 4\\), then multiply by 5 to get \\(z = 20\\).',
      },
      {
        text: '50',
        isCorrect: false,
        rationale: 'This is the result if you add 3 to 7.',
      },
    ],
    rationale:
      'First, subtract 3 from both sides: \\(z/5 = 7 - 3\\), so \\(z/5 = 4\\). Then, multiply by 5: \\(z = 4 \\times 5 = 20\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Expand the expression: \\((x - 4)(x + 4)\\).',
    correctAnswer: '\\(x^2 - 16\\)',
    rationale:
      'This is a difference of squares. Using the FOIL method: First (\\(x \\times x = x^2\\)), Outer (\\(x \\times 4 = 4x\\)), Inner (\\(-4 \\times x = -4x\\)), Last (\\(-4 \\times 4 = -16\\)). The middle terms cancel out: \\(x^2 + 4x - 4x - 16 = x^2 - 16\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the slope of a horizontal line?',
    answerOptions: [
      {
        text: '1',
        isCorrect: false,
        rationale:
          'A slope of 1 means the line rises one unit for every one unit it runs.',
      },
      {
        text: '0',
        isCorrect: true,
        rationale:
          "A horizontal line has zero 'rise' for any 'run', so the slope is 0.",
      },
      {
        text: 'Undefined',
        isCorrect: false,
        rationale: 'A vertical line has an undefined slope.',
      },
      {
        text: '-1',
        isCorrect: false,
        rationale:
          'A line with a slope of -1 falls one unit for every one unit it runs.',
      },
    ],
    rationale:
      'A horizontal line has no change in its y-value (rise = 0). Therefore, the slope (rise/run) is 0.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question: 'Solve the equation for x: \\(5(x - 2) = 2(x + 4)\\).',
    answerOptions: [
      {
        text: '2',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '3',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '6',
        isCorrect: true,
        rationale:
          'Distribute on both sides: \\(5x - 10 = 2x + 8\\). Subtract \\(2x\\) from both sides: \\(3x - 10 = 8\\). Add 10 to both sides: \\(3x = 18\\). Divide by 3: \\(x = 6\\).',
      },
      {
        text: '9',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'First, distribute the numbers on both sides: \\(5x - 10 = 2x + 8\\). Next, get the x terms on one side: \\(3x - 10 = 8\\). Then, isolate the x term: \\(3x = 18\\). Finally, divide by 3: \\(x = 6\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'If \\(f(x) = -4x + 7\\), what is \\(f(-3)\\)?',
    correctAnswer: '19',
    rationale: 'Substitute -3 for x: \\(f(-3) = -4(-3) + 7 = 12 + 7 = 19\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question: 'Solve the inequality: \\(-3x + 4 \\leq 16\\).',
    answerOptions: [
      {
        text: '\\(x \\leq -4\\)',
        isCorrect: false,
        rationale:
          'The inequality sign should be reversed when dividing by a negative number.',
      },
      {
        text: '\\(x \\geq -4\\)',
        isCorrect: true,
        rationale:
          'Subtract 4: \\(-3x \\leq 12\\). Divide by -3 and reverse the inequality sign: \\(x \\ge -4\\).',
      },
      {
        text: '\\(x \\leq 4\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x \\geq 4\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'First, subtract 4 from both sides: \\(-3x \\leq 12\\). Then, divide by -3. Remember to reverse the inequality sign when dividing by a negative number: \\(x \\ge -4\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'What is the y-intercept of the line \\(3x - 2y = 6\\)?',
    correctAnswer: '-3',
    rationale:
      'To find the y-intercept, set \\(x = 0\\). The equation becomes \\(3(0) - 2y = 6\\), so \\(-2y = 6\\). Solve for y to get \\(y = -3\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'The sum of two consecutive integers is 37. What are the integers?',
    answerOptions: [
      {
        text: '17 and 18',
        isCorrect: false,
        rationale: '17+18 = 35.',
      },
      {
        text: '18 and 19',
        isCorrect: true,
        rationale:
          'Let the integers be \\(n\\) and \\(n+1\\). \\(n + (n+1) = 37\\). \\(2n + 1 = 37\\). \\(2n = 36\\). \\(n = 18\\). The integers are 18 and 19.',
      },
      {
        text: '19 and 20',
        isCorrect: false,
        rationale: '19+20 = 39.',
      },
      {
        text: '15 and 16',
        isCorrect: false,
        rationale: '15+16 = 31.',
      },
    ],
    rationale:
      'Let the first integer be \\(n\\). The next consecutive integer is \\(n+1\\). Their sum is \\(n + (n+1) = 37\\). Combine like terms: \\(2n + 1 = 37\\). Subtract 1: \\(2n = 36\\). Divide by 2: \\(n = 18\\). The integers are 18 and 19.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question: 'What is the slope of a line perpendicular to \\(2x + 3y = 6\\)?',
    answerOptions: [
      {
        text: '\\(-\\frac{2}{3}\\)',
        isCorrect: false,
        rationale: 'This is the slope of the original line.',
      },
      {
        text: '\\(\\frac{2}{3}\\)',
        isCorrect: false,
        rationale: 'This is the negative of the slope.',
      },
      {
        text: '\\(-\\frac{3}{2}\\)',
        isCorrect: false,
        rationale: 'This is the reciprocal, but not the negative reciprocal.',
      },
      {
        text: '\\(\\frac{3}{2}\\)',
        isCorrect: true,
        rationale:
          'First, find the slope of the line by rewriting in \\(y=mx+b\\) form: \\(y = -\\frac{2}{3}x + 2\\). The slope is \\(-\\frac{2}{3}\\). The perpendicular slope is the negative reciprocal, which is \\(\\frac{3}{2}\\).',
      },
    ],
    rationale:
      'First, convert the equation to slope-intercept form (\\(y = mx + b\\)). \\(3y = -2x + 6\\), so \\(y = -\\frac{2}{3}x + 2\\). The slope of this line is \\(-\\frac{2}{3}\\). The slope of a perpendicular line is the negative reciprocal, which is \\(\\frac{3}{2}\\).',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question:
      "Translate the following sentence into an equation: 'A number increased by 10 is 25.'",
    answerOptions: [
      {
        text: '\\(n - 10 = 25\\)',
        isCorrect: false,
        rationale: "This represents 'a number decreased by 10'.",
      },
      {
        text: '\\(10n = 25\\)',
        isCorrect: false,
        rationale: "This represents '10 times a number'.",
      },
      {
        text: '\\(n + 10 = 25\\)',
        isCorrect: true,
        rationale: "'Increased by' means addition.",
      },
      {
        text: '\\(\\frac{n}{10} = 25\\)',
        isCorrect: false,
        rationale: "This represents 'a number divided by 10'.",
      },
    ],
    rationale:
      "Let \\(n\\) be the number. 'Increased by 10' means adding 10, so the equation is \\(n + 10 = 25\\).",
    challenge_tags: ['math-3'],
  },
];
