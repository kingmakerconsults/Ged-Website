// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "Evaluate the expression $x/3 + 2$ for $x = 12$.",
    "correctAnswer": "6",
    "rationale": "Substitute 12 for x: 12/3 + 2 = 4 + 2 = 6."
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Solve for x: $7x = 42$.",
    "answerOptions": [
      {
        "text": "6",
        "isCorrect": true,
        "rationale": "Divide both sides by 7: 42 / 7 = 6."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is the coefficient of x."
      },
      {
        "text": "49",
        "isCorrect": false,
        "rationale": "This is the result of adding 7."
      },
      {
        "text": "294",
        "isCorrect": false,
        "rationale": "This is the result of multiplying by 7."
      }
    ],
    "rationale": "To solve for x, divide both sides of the equation by 7. x = 42 / 7 = 6."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Simplify the expression: $4(x - 3) + 2(x + 1)$.",
    "answerOptions": [
      {
        "text": "6x - 11",
        "isCorrect": false,
        "rationale": "Check the constant term: -12 + 2 = -10."
      },
      {
        "text": "6x - 10",
        "isCorrect": true,
        "rationale": "Distribute: 4x - 12 + 2x + 2. Combine like terms: 6x - 10."
      },
      {
        "text": "2x - 11",
        "isCorrect": false,
        "rationale": "This subtracts 2x from 4x."
      },
      {
        "text": "6x - 14",
        "isCorrect": false,
        "rationale": "This subtracts 2 from -12."
      }
    ],
    "rationale": "First, distribute the numbers: (4x - 12) + (2x + 2). Then, combine like terms: (4x + 2x) + (-12 + 2) = 6x - 10."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the slope of the line passing through (2, 5) and (4, 1)?",
    "correctAnswer": "-2",
    "rationale": "Slope = (change in y) / (change in x) = (1 - 5) / (4 - 2) = -4 / 2 = -2."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following ordered pairs is a solution to the equation $y = 3x - 2$?",
    "answerOptions": [
      {
        "text": "(1, 1)",
        "isCorrect": true,
        "rationale": "If x=1, y = 3(1) - 2 = 1. So (1, 1) is a solution."
      },
      {
        "text": "(2, 5)",
        "isCorrect": false,
        "rationale": "If x=2, y = 3(2) - 2 = 4."
      },
      {
        "text": "(0, 2)",
        "isCorrect": false,
        "rationale": "If x=0, y = 3(0) - 2 = -2."
      },
      {
        "text": "(-1, -4)",
        "isCorrect": false,
        "rationale": "If x=-1, y = 3(-1) - 2 = -5."
      }
    ],
    "rationale": "Substitute the x-value from each ordered pair into the equation and check if it produces the corresponding y-value. For (1,1): y = 3(1) - 2 = 3 - 2 = 1. This matches."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "Solve for x: $3x + 8 = 5x - 6$.",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "This is the result if you add 6 and 8 on the same side."
      },
      {
        "text": "7",
        "isCorrect": true,
        "rationale": "Subtract 3x from both sides: 8 = 2x - 6. Add 6 to both sides: 14 = 2x. Divide by 2: x = 7."
      },
      {
        "text": "14",
        "isCorrect": false,
        "rationale": "This is 2x, not x."
      }
    ],
    "rationale": "To solve for x, first get the x terms on one side: 8 = 2x - 6. Then isolate the x term by adding 6 to both sides: 14 = 2x. Finally, divide by 2: x = 7."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Factor the expression: $x^2 - 49$.",
    "correctAnswer": "(x - 7)(x + 7)",
    "rationale": "This is a difference of squares, which factors into (a - b)(a + b). Here, a=x and b=7."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The equation of a line is $y = \\frac{1}{2}x + 3$. What is the equation of a line that is parallel to it and passes through the origin (0,0)?",
    "answerOptions": [
      {
        "text": "$y = -2x$",
        "isCorrect": false,
        "rationale": "This is a perpendicular line."
      },
      {
        "text": "$y = \\frac{1}{2}x$",
        "isCorrect": true,
        "rationale": "A parallel line has the same slope (1/2). A line passing through the origin has a y-intercept of 0."
      },
      {
        "text": "$y = 2x$",
        "isCorrect": false,
        "rationale": "This is an incorrect slope."
      },
      {
        "text": "$y = \\frac{1}{2}x - 3$",
        "isCorrect": false,
        "rationale": "This does not pass through the origin."
      }
    ],
    "rationale": "A parallel line must have the same slope, which is 1/2. A line that passes through the origin has a y-intercept of 0. So the equation is y = (1/2)x + 0, or y = (1/2)x."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "If $f(x) = 2x^2 - 3x + 1$, find $f(4)$.",
    "correctAnswer": "21",
    "rationale": "Substitute 4 for x: f(4) = 2(4)$^2$ - 3(4) + 1 = 2(16) - 12 + 1 = 32 - 12 + 1 = 21."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Tickets to a concert cost $15 for adults and $10 for children. If a group of 4 adults and 3 children buy tickets, what is the total cost?",
    "answerOptions": [
      {
        "text": "$75",
        "isCorrect": false,
        "rationale": "This is the cost for 5 adults."
      },
      {
        "text": "$80",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$90",
        "isCorrect": true,
        "rationale": "Cost for adults: 4 * $15 = $60. Cost for children: 3 * $10 = $30. Total cost: $60 + $30 = $90."
      },
      {
        "text": "$105",
        "isCorrect": false,
        "rationale": "This is the cost for 7 adults."
      }
    ],
    "rationale": "Calculate the cost for each group and then add them together. Adult cost = 4 * $15 = $60. Child cost = 3 * $10 = $30. Total = $60 + $30 = $90."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Factor the trinomial: $x^2 + 8x + 15$.",
    "answerOptions": [
      {
        "text": "$(x + 8)(x + 15)$",
        "isCorrect": false,
        "rationale": "The constants would multiply to 120."
      },
      {
        "text": "$(x + 3)(x + 5)$",
        "isCorrect": true,
        "rationale": "We need two numbers that multiply to 15 and add to 8. These numbers are 3 and 5."
      },
      {
        "text": "$(x - 3)(x - 5)$",
        "isCorrect": false,
        "rationale": "This would result in a middle term of -8x."
      },
      {
        "text": "$(x + 1)(x + 15)$",
        "isCorrect": false,
        "rationale": "The middle term would be 16x."
      }
    ],
    "rationale": "To factor the trinomial, we look for two numbers that multiply to 15 and add up to 8. These two numbers are 3 and 5. So, the factored form is (x + 3)(x + 5)."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following inequalities corresponds to the statement 'x is at least 12'?",
    "answerOptions": [
      {
        "text": "$x < 12$",
        "isCorrect": false,
        "rationale": "This means x is less than 12."
      },
      {
        "text": "$x > 12$",
        "isCorrect": false,
        "rationale": "This means x is strictly greater than 12."
      },
      {
        "text": "$x \\leq 12$",
        "isCorrect": false,
        "rationale": "This means x is at most 12."
      },
      {
        "text": "$x \\geq 12$",
        "isCorrect": true,
        "rationale": "'At least' means greater than or equal to."
      }
    ],
    "rationale": "The phrase 'at least 12' means that x can be 12 or any number greater than 12. This is represented by the inequality $x \\geq 12$."
  }
];
