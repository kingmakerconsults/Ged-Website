// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "Solve for m: $m + 11 = 30$.",
    "correctAnswer": "19",
    "rationale": "Subtract 11 from both sides of the equation: 30 - 11 = 19.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Evaluate $10 - 3x$ for $x = 2$.",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is 10-9."
      },
      {
        "text": "4",
        "isCorrect": true,
        "rationale": "Substitute 2 for x: 10 - 3(2) = 10 - 6 = 4."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is 10-3."
      },
      {
        "text": "14",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Substitute 2 for x in the expression: 10 - 3(2) = 10 - 6 = 4.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Solve for y: $\\frac{y}{3} - 2 = 5$.",
    "answerOptions": [
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is 3*3."
      },
      {
        "text": "17",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "21",
        "isCorrect": true,
        "rationale": "Add 2 to both sides: y/3 = 7. Multiply by 3: y = 21."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is 3/3."
      }
    ],
    "rationale": "First, add 2 to both sides: y/3 = 5 + 2, so y/3 = 7. Then, multiply by 3: y = 7 * 3 = 21.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Simplify the expression: $5a + 2b - 3a + 4b$.",
    "correctAnswer": "2a + 6b",
    "rationale": "Combine the 'a' terms: 5a - 3a = 2a. Combine the 'b' terms: 2b + 4b = 6b. The result is 2a + 6b.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the slope of a line perpendicular to $y = 3x - 1$?",
    "answerOptions": [
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is the slope of a parallel line."
      },
      {
        "text": "-3",
        "isCorrect": false,
        "rationale": "This is the negative of the slope."
      },
      {
        "text": "1/3",
        "isCorrect": false,
        "rationale": "This is the reciprocal, but not negative."
      },
      {
        "text": "-1/3",
        "isCorrect": true,
        "rationale": "The perpendicular slope is the negative reciprocal of the original slope."
      }
    ],
    "rationale": "The slope of the given line is 3. The slope of a perpendicular line is the negative reciprocal, which is -1/3.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "Solve for x: $4(x + 1) = 2(x + 6)$.",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "4",
        "isCorrect": true,
        "rationale": "Distribute: 4x + 4 = 2x + 12. 2x = 8. x = 4."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, distribute on both sides: 4x + 4 = 2x + 12. Subtract 2x from both sides: 2x + 4 = 12. Subtract 4 from both sides: 2x = 8. Divide by 2: x = 4.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Factor the expression $x^2 - 100$.",
    "correctAnswer": "(x - 10)(x + 10)",
    "rationale": "This is a difference of squares, $a^2 - b^2$, which factors to $(a-b)(a+b)$. Here, a=x and b=10.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Solve the inequality: $10 - x geq 15$.",
    "answerOptions": [
      {
        "text": "$x geq 5$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$x leq 5$",
        "isCorrect": false,
        "rationale": "The sign on 5 should be negative."
      },
      {
        "text": "$x geq -5$",
        "isCorrect": false,
        "rationale": "The inequality should be reversed."
      },
      {
        "text": "$x leq -5$",
        "isCorrect": true,
        "rationale": "Subtract 10: -x >= 5. Multiply by -1 and reverse the inequality: x <= -5."
      }
    ],
    "rationale": "First, subtract 10 from both sides: -x geq 5. Then, multiply by -1 to solve for x, and remember to reverse the inequality sign: x leq -5.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "If $f(x) = 2x - 7$, what is the value of x when $f(x) = 11$?",
    "correctAnswer": "9",
    "rationale": "Set the function equal to 11: 2x - 7 = 11. Add 7 to both sides: 2x = 18. Divide by 2: x = 9.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A number is doubled and then increased by 8. The result is 26. What is the number?",
    "answerOptions": [
      {
        "text": "9",
        "isCorrect": true,
        "rationale": "Let n be the number. 2n + 8 = 26. 2n = 18. n = 9."
      },
      {
        "text": "17",
        "isCorrect": false,
        "rationale": "This is 26-9."
      },
      {
        "text": "18",
        "isCorrect": false,
        "rationale": "This is 2n."
      },
      {
        "text": "34",
        "isCorrect": false,
        "rationale": "This is 26+8."
      }
    ],
    "rationale": "Let the number be n. 'A number is doubled' is 2n. 'Increased by 8' is 2n + 8. Set this equal to 26: 2n + 8 = 26. Subtract 8: 2n = 18. Divide by 2: n = 9.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Factor the trinomial: $x^2 - 3x - 10$.",
    "answerOptions": [
      {
        "text": "$(x - 5)(x + 2)$",
        "isCorrect": true,
        "rationale": "We need two numbers that multiply to -10 and add to -3. These are -5 and 2."
      },
      {
        "text": "$(x + 5)(x - 2)$",
        "isCorrect": false,
        "rationale": "This gives a middle term of +3x."
      },
      {
        "text": "$(x - 10)(x + 1)$",
        "isCorrect": false,
        "rationale": "This gives a middle term of -9x."
      },
      {
        "text": "$(x - 2)(x - 5)$",
        "isCorrect": false,
        "rationale": "This gives a constant term of +10."
      }
    ],
    "rationale": "To factor the trinomial, we look for two numbers that multiply to -10 and add to -3. These numbers are -5 and +2. So, the factored form is (x - 5)(x + 2).",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which point is the origin on the coordinate plane?",
    "answerOptions": [
      {
        "text": "(1, 1)",
        "isCorrect": false,
        "rationale": "This point is in Quadrant I."
      },
      {
        "text": "(0, 0)",
        "isCorrect": true,
        "rationale": "The origin is the point where the x-axis and y-axis intersect."
      },
      {
        "text": "(-1, 0)",
        "isCorrect": false,
        "rationale": "This point is on the x-axis."
      },
      {
        "text": "(0, 1)",
        "isCorrect": false,
        "rationale": "This point is on the y-axis."
      }
    ],
    "rationale": "The origin is the point of intersection of the x-axis and the y-axis, and its coordinates are (0, 0).",
    "challenge_tags": [
      "math-3"
    ]
  }
];
