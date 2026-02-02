/**
 * Equations & Inequalities
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    challenge_tags: ['math-2', 'math-3'],
    calculator: false,
    question: 'Solve for x: \\(3x + 7 = 19\\)',
    answerOptions: [
      {
        text: '\\(x = 4\\)',
        isCorrect: true,
        rationale:
          'Subtract 7 from both sides: \\(3x = 12\\). Divide by 3: \\(x = 4\\).',
      },
      {
        text: '\\(x = 8.7\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x = 3\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x = 12\\)',
        isCorrect: false,
        rationale: 'This is the value of \\(3x\\), not \\(x\\).',
      },
    ],
  },
  {
    questionNumber: 2,
    challenge_tags: ['math-2', 'math-3'],
    calculator: false,
    question: 'What is the solution to the inequality \\(2x - 5 > 11\\)?',
    answerOptions: [
      {
        text: '\\(x < 8\\)',
        isCorrect: false,
        rationale: 'The inequality sign should not be reversed.',
      },
      {
        text: '\\(x > 8\\)',
        isCorrect: true,
        rationale:
          'Add 5 to both sides: \\(2x > 16\\). Divide by 2: \\(x > 8\\).',
      },
      {
        text: '\\(x > 3\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x < 3\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
  },
  {
    questionNumber: 3,
    challenge_tags: ['math-2', 'math-3'],
    calculator: false,
    question: 'Solve for y: \\(5y - 8 = 2y + 7\\)',
    answerOptions: [
      {
        text: '\\(y = 3\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(y = 5\\)',
        isCorrect: true,
        rationale:
          'Subtract \\(2y\\) from both sides: \\(3y - 8 = 7\\). Add 8 to both sides: \\(3y = 15\\). Divide by 3: \\(y = 5\\).',
      },
      {
        text: '\\(y = -\\frac{1}{3}\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(y = 15\\)',
        isCorrect: false,
        rationale: 'This is the value of \\(3y\\), not \\(y\\).',
      },
    ],
  },
  {
    questionNumber: 4,
    calculator: false,
    question:
      'Which of the following is a solution to the equation \\(x^2 - 5x + 6 = 0\\)?',
    answerOptions: [
      {
        text: '\\(x = 1\\)',
        isCorrect: false,
        rationale: '\\(1^{2} - 5(1) + 6 = 1 - 5 + 6 = 2\\), not 0.',
      },
      {
        text: '\\(x = 2\\)',
        isCorrect: true,
        rationale:
          'The equation factors to \\((x-2)(x-3) = 0\\). The solutions are \\(x=2\\) and \\(x=3\\).',
      },
      {
        text: '\\(x = 5\\)',
        isCorrect: false,
        rationale: '\\(5^{2} - 5(5) + 6 = 25 - 25 + 6 = 6\\), not 0.',
      },
      {
        text: '\\(x = 6\\)',
        isCorrect: false,
        rationale: '\\(6^{2} - 5(6) + 6 = 36 - 30 + 6 = 12\\), not 0.',
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 5,
    calculator: false,
    question: 'Solve for x: \\(x/4 + 2 = 5\\)',
    answerOptions: [
      {
        text: '\\(x = 12\\)',
        isCorrect: true,
        rationale:
          'Subtract 2 from both sides: \\(x/4 = 3\\). Multiply by 4: \\(x = 12\\).',
      },
      {
        text: '\\(x = 28\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x = 3\\)',
        isCorrect: false,
        rationale: 'This is the value of \\(x/4\\), not \\(x\\).',
      },
      {
        text: '\\(x = 7\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 6,
    calculator: true,
    question: 'Solve the inequality: \\(-3x + 4 \\le 16\\)',
    answerOptions: [
      {
        text: '\\(x \\le -4\\)',
        isCorrect: false,
        rationale:
          'When dividing by a negative number, you must flip the inequality sign.',
      },
      {
        text: '\\(x \\ge -4\\)',
        isCorrect: true,
        rationale:
          'Subtract 4: \\(-3x \\le 12\\). Divide by -3 and flip the sign: \\(x \\ge -4\\).',
      },
      {
        text: '\\(x \\ge 4\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x \\le 4\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 7,
    calculator: true,
    question:
      'The sum of two consecutive integers is 35. What are the integers?',
    answerOptions: [
      {
        text: '15 and 20',
        isCorrect: false,
        rationale: 'These are not consecutive.',
      },
      {
        text: '17 and 18',
        isCorrect: true,
        rationale:
          'Let the integers be \\(x\\) and \\(x + 1\\). So, \\(x + (x + 1) = 35\\). \\(2x + 1 = 35\\). \\(2x = 34\\). \\(x = 17\\). The integers are 17 and 18.',
      },
      {
        text: '16 and 19',
        isCorrect: false,
        rationale: 'These are not consecutive.',
      },
      {
        text: '10 and 25',
        isCorrect: false,
        rationale: 'These are not consecutive.',
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 8,
    challenge_tags: ['math-5'],
    calculator: true,
    question:
      'Solve for b: \\(A = \\frac{1}{2}bh\\) (the formula for the area of a triangle)',
    answerOptions: [
      {
        text: '\\(b = \\frac{2A}{h}\\)',
        isCorrect: true,
        rationale:
          'Multiply both sides by 2: \\(2A = bh\\). Divide both sides by h: \\(b = \\frac{2A}{h}\\).',
      },
      {
        text: '\\(b = \\frac{A}{2h}\\)',
        isCorrect: false,
        rationale: 'Forgot to multiply by 2.',
      },
      {
        text: '\\(b = \\frac{Ah}{2}\\)',
        isCorrect: false,
        rationale: 'Incorrectly rearranged the formula.',
      },
      {
        text: '\\(b = \\frac{2h}{A}\\)',
        isCorrect: false,
        rationale: 'Incorrectly rearranged the formula.',
      },
    ],
  },
  {
    questionNumber: 9,
    calculator: true,
    question:
      'What are the solutions to the quadratic equation \\(x^2 - 16 = 0\\)?',
    answerOptions: [
      {
        text: '\\(x = 4\\)',
        isCorrect: false,
        rationale: 'This is only one of the solutions.',
      },
      {
        text: '\\(x = 4\\) and \\(x = -4\\)',
        isCorrect: true,
        rationale:
          'Add 16 to both sides: \\(x^{2} = 16\\). Take the square root of both sides: \\(x = \\pm 4\\).',
      },
      {
        text: '\\(x = 8\\) and \\(x = -8\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x = 16\\)',
        isCorrect: false,
        rationale: 'This is the value of \\(x^{2}\\).',
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 10,
    calculator: true,
    question: 'Solve for x: \\(2(x + 3) = 14\\)',
    answerOptions: [
      {
        text: '\\(x = 4\\)',
        isCorrect: true,
        rationale:
          'Distribute the 2: \\(2x + 6 = 14\\). Subtract 6: \\(2x = 8\\). Divide by 2: \\(x = 4\\).',
      },
      {
        text: '\\(x = 5.5\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x = 11\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x = 8\\)',
        isCorrect: false,
        rationale: 'This is the value of \\(2x\\).',
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 11,
    calculator: true,
    question:
      'A number is doubled and then 5 is subtracted from it. The result is 15. What is the number?',
    answerOptions: [
      {
        text: '5',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '10',
        isCorrect: true,
        rationale:
          'Let the number be \\(x\\). The equation is \\(2x - 5 = 15\\). Add 5 to both sides: \\(2x = 20\\). Divide by 2: \\(x = 10\\).',
      },
      {
        text: '12.5',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '20',
        isCorrect: false,
        rationale: 'This is the value of \\(2x\\).',
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 12,
    calculator: true,
    question: "Which inequality represents the statement 'x is at least 18'?",
    answerOptions: [
      {
        text: '\\(x < 18\\)',
        isCorrect: false,
        rationale: "This means 'x is less than 18'.",
      },
      {
        text: '\\(x > 18\\)',
        isCorrect: false,
        rationale: "This means 'x is greater than 18'.",
      },
      {
        text: '\\(x \\le 18\\)',
        isCorrect: false,
        rationale: "This means 'x is at most 18'.",
      },
      {
        text: '\\(x \\ge 18\\)',
        isCorrect: true,
        rationale:
          "'At least 18' means 18 or more, which is represented by the greater than or equal to symbol.",
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 13,
    challenge_tags: ['math-2'],
    calculator: true,
    question:
      'Solve the system of equations: \\(x + y = 10\\) and \\(x - y = 4\\)',
    answerOptions: [
      {
        text: '\\(x = 7, y = 3\\)',
        isCorrect: true,
        rationale:
          'Add the two equations together: \\((x+y) + (x-y) = 10+4\\), which simplifies to \\(2x = 14\\), so \\(x=7\\). Substitute \\(x=7\\) into the first equation: \\(7 + y = 10\\), so \\(y=3\\).',
      },
      {
        text: '\\(x = 6, y = 4\\)',
        isCorrect: false,
        rationale: 'This does not satisfy the second equation.',
      },
      {
        text: '\\(x = 8, y = 2\\)',
        isCorrect: false,
        rationale: 'This does not satisfy the second equation.',
      },
      {
        text: '\\(x = 5, y = 5\\)',
        isCorrect: false,
        rationale: 'This does not satisfy the second equation.',
      },
    ],
  },
  {
    questionNumber: 14,
    calculator: true,
    question: 'Solve for x: \\(3(x - 4) = 2(x + 1)\\)',
    answerOptions: [
      {
        text: '\\(x = 10\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x = 14\\)',
        isCorrect: true,
        rationale:
          'Distribute: \\(3x - 12 = 2x + 2\\). Subtract \\(2x\\) from both sides: \\(x - 12 = 2\\). Add 12 to both sides: \\(x = 14\\).',
      },
      {
        text: '\\(x = -13\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(x = 5\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 15,
    challenge_tags: ['math-5'],
    calculator: true,
    question:
      'The length of a rectangle is 5 more than its width. If the perimeter is 50, what is the width?',
    answerOptions: [
      {
        text: '10',
        isCorrect: true,
        rationale:
          'Let \\(w\\) be the width and \\(l\\) be the length. \\(l = w + 5\\). Perimeter \\(P = 2l + 2w\\). Substitute: \\(50 = 2(w+5) + 2w\\). \\(50 = 2w + 10 + 2w\\). \\(50 = 4w + 10\\). \\(40 = 4w\\). \\(w = 10\\).',
      },
      {
        text: '15',
        isCorrect: false,
        rationale: '15 is the length, not the width.',
      },
      {
        text: '20',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '25',
        isCorrect: false,
        rationale: 'This is half the perimeter.',
      },
    ],
  },
];
