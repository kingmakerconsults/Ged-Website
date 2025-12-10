module.exports = [
  {
    "questionNumber": 1,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "easy",
    "question": "Solve for x: $x - 7 = 11$.",
    "correctAnswer": "18",
    "rationale": "Add 7 to both sides of the equation: 11 + 7 = 18.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Evaluate $5c + 4$ for $c = 3$.",
    "answerOptions": [
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "19",
        "isCorrect": true,
        "rationale": "Substitute 3 for c: 5(3) + 4 = 15 + 4 = 19."
      },
      {
        "text": "27",
        "isCorrect": false,
        "rationale": "This is 5*(3+4)."
      },
      {
        "text": "35",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Substitute 3 for c in the expression: 5(3) + 4 = 15 + 4 = 19.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Solve for p: $6p + 5 = 41$.",
    "answerOptions": [
      {
        "text": "6",
        "isCorrect": true,
        "rationale": "Subtract 5 from both sides: 6p = 36. Divide by 6: p = 6."
      },
      {
        "text": "7.67",
        "isCorrect": false,
        "rationale": "This is $\\frac{46}{6}$."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "36",
        "isCorrect": false,
        "rationale": "This is 6p."
      }
    ],
    "rationale": "First, subtract 5 from both sides: 6p = 41 - 5, so 6p = 36. Then, divide by 6: p = 36 / 6 = 6.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "Simplify the expression: $8(y - 2) - 3y$.",
    "correctAnswer": "5y - 16",
    "rationale": "First, distribute the 8: 8y - 16 - 3y. Then, combine like terms: (8y - 3y) - 16 = 5y - 16.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following is the equation of a line parallel to $y = -2x + 1$?",
    "answerOptions": [
      {
        "text": "$y = 2x + 3$",
        "isCorrect": false,
        "rationale": "This line has a different slope."
      },
      {
        "text": "$y = -2x - 5$",
        "isCorrect": true,
        "rationale": "Parallel lines have the same slope. This line also has a slope of -2."
      },
      {
        "text": "$y = (\\frac{1}{2})x + 1$",
        "isCorrect": false,
        "rationale": "This is a perpendicular line."
      },
      {
        "text": "$y = x - 2$",
        "isCorrect": false,
        "rationale": "This line has a different slope."
      }
    ],
    "rationale": "Parallel lines have the same slope. The given line has a slope of -2, and this option is the only other line with a slope of -2.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "Factor the expression: $2x^2 + 7x + 3$.",
    "answerOptions": [
      {
        "text": "$(2x + 1)(x + 3)$",
        "isCorrect": true,
        "rationale": "Using FOIL, (2x)(x) = 2$x^2$, (2x)(3) = 6x, (1)(x) = x, (1)(3) = 3. 2$x^2$ + 6x + x + 3 = 2$x^2$ + 7x + 3."
      },
      {
        "text": "$(2x + 3)(x + 1)$",
        "isCorrect": false,
        "rationale": "This gives a middle term of 5x."
      },
      {
        "text": "$(2x - 1)(x - 3)$",
        "isCorrect": false,
        "rationale": "This gives a middle term of -7x."
      },
      {
        "text": "$(x + 1)(x + 3)$",
        "isCorrect": false,
        "rationale": "This would be for $x^2$."
      }
    ],
    "rationale": "To factor this trinomial, we look for two binomials that multiply to give the original expression. By trial and error (or other factoring methods), we find that (2x + 1)(x + 3) expands to 2$x^2$ + 7x + 3.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the slope of a line passing through (5, 2) and (5, 8)?",
    "correctAnswer": "Undefined",
    "rationale": "The x-coordinates are the same, which means this is a vertical line. The slope of a vertical line is undefined.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Solve for x: $|x - 4| = 9$.",
    "answerOptions": [
      {
        "text": "x = 13",
        "isCorrect": false,
        "rationale": "This is only one of the solutions."
      },
      {
        "text": "x = -5",
        "isCorrect": false,
        "rationale": "This is only one of the solutions."
      },
      {
        "text": "x = 13 and x = -5",
        "isCorrect": true,
        "rationale": "Set x - 4 = 9 and x - 4 = -9. The solutions are x = 13 and x = -5."
      },
      {
        "text": "x = 5 and x = -13",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "An absolute value equation has two cases. Case 1: x - 4 = 9, which gives x = 13. Case 2: x - 4 = -9, which gives x = -5.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "Given $f(x) = (x+2)^2$, find $f(4)$.",
    "correctAnswer": "36",
    "rationale": "Substitute 4 for x: f(4) = (4 + 2)Â² = (6)Â² = 36.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Three times a number, decreased by 5, is 16. What is the number?",
    "answerOptions": [
      {
        "text": "7",
        "isCorrect": true,
        "rationale": "Let n be the number. 3n - 5 = 16. 3n = 21. n = 7."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "21",
        "isCorrect": false,
        "rationale": "This is 3n."
      }
    ],
    "rationale": "Translate the sentence into an equation: 3n - 5 = 16. Add 5 to both sides: 3n = 21. Divide by 3: n = 7.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "What is the vertex of the parabola $y = 2(x + 1)^2 - 4$?",
    "answerOptions": [
      {
        "text": "(1, -4)",
        "isCorrect": false,
        "rationale": "The x-coordinate of the vertex is -1."
      },
      {
        "text": "(-1, -4)",
        "isCorrect": true,
        "rationale": "The equation is in vertex form y = a(x - h)Â² + k, so the vertex is (h, k). Here h=-1 and k=-4."
      },
      {
        "text": "(-1, 4)",
        "isCorrect": false,
        "rationale": "The y-coordinate of the vertex is -4."
      },
      {
        "text": "(2, -4)",
        "isCorrect": false,
        "rationale": "The 'a' value does not affect the vertex's location."
      }
    ],
    "rationale": "The vertex form of a parabola is y = a(x - h)Â² + k, where (h, k) is the vertex. In this equation, h = -1 and k = -4.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following expressions is equivalent to $4(3x)$?",
    "answerOptions": [
      {
        "text": "$7x$",
        "isCorrect": false,
        "rationale": "This is the sum, not the product."
      },
      {
        "text": "$12x$",
        "isCorrect": true,
        "rationale": "This is the product of 4 and 3x."
      },
      {
        "text": "$43x$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$12x^2$",
        "isCorrect": false,
        "rationale": "There is only one x."
      }
    ],
    "rationale": "This is a simple multiplication problem. 4 * 3x = 12x.",
    "challenge_tags": [
      "math-3"
    ]
  }
];
