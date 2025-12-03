// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "Solve for x: $3x = 33$.",
    "correctAnswer": "11",
    "rationale": "Divide both sides by 3: x = 33 / 3 = 11.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Evaluate $12 + 5x$ for $x = -2$.",
    "answerOptions": [
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "12 + 5(-2) = 12 - 10 = 2."
      },
      {
        "text": "17",
        "isCorrect": false,
        "rationale": "This is 12+5."
      },
      {
        "text": "22",
        "isCorrect": false,
        "rationale": "This is 12+10."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is 5*2."
      }
    ],
    "rationale": "Substitute -2 for x in the expression: 12 + 5(-2) = 12 - 10 = 2.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Solve for y: $5y - 8 = 12$.",
    "answerOptions": [
      {
        "text": "0.8",
        "isCorrect": false,
        "rationale": "This is 4/5."
      },
      {
        "text": "4",
        "isCorrect": true,
        "rationale": "Add 8 to both sides: 5y = 20. Divide by 5: y = 4."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is 5y."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, add 8 to both sides: 5y = 12 + 8, so 5y = 20. Then, divide by 5: y = 20 / 5 = 4.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "Simplify the expression: $3(2x + 1) - 4x$.",
    "correctAnswer": "2x + 3",
    "rationale": "Distribute the 3: 6x + 3 - 4x. Combine like terms: 2x + 3.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the slope of the line passing through (2, 3) and (2, 8)?",
    "answerOptions": [
      {
        "text": "0",
        "isCorrect": false,
        "rationale": "A horizontal line has a slope of 0."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is the change in y."
      },
      {
        "text": "Undefined",
        "isCorrect": true,
        "rationale": "The x-coordinates are the same, so it's a vertical line with an undefined slope."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Since the x-coordinates are the same, this is a vertical line. The slope of a vertical line is undefined.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A number is tripled, and then 7 is subtracted. The result is 20. What is the number?",
    "answerOptions": [
      {
        "text": "9",
        "isCorrect": true,
        "rationale": "Let n be the number. 3n - 7 = 20. 3n = 27. n = 9."
      },
      {
        "text": "13",
        "isCorrect": false,
        "rationale": "This is 20-7."
      },
      {
        "text": "27",
        "isCorrect": false,
        "rationale": "This is 3n."
      },
      {
        "text": "4.33",
        "isCorrect": false,
        "rationale": "This is 13/3."
      }
    ],
    "rationale": "Let the number be n. 'A number is tripled' is 3n. '7 is subtracted' is 3n - 7. Set this equal to 20: 3n - 7 = 20. Add 7: 3n = 27. Divide by 3: n = 9.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "If $f(x) = 10 - x^2$, what is $f(4)$?",
    "correctAnswer": "-6",
    "rationale": "Substitute 4 for x: f(4) = 10 - (4)Â² = 10 - 16 = -6.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which expression is the result of factoring $9x^2 - 16$?",
    "answerOptions": [
      {
        "text": "$(3x - 4)^2$",
        "isCorrect": false,
        "rationale": "This would give a middle term of -24x."
      },
      {
        "text": "$(3x - 4)(3x + 4)$",
        "isCorrect": true,
        "rationale": "This is a difference of squares: (3x)$^2$ - 4$^2$."
      },
      {
        "text": "$(9x - 4)(x + 4)$",
        "isCorrect": false,
        "rationale": "This gives a middle term of +32x."
      },
      {
        "text": "$(3x + 4)^2$",
        "isCorrect": false,
        "rationale": "This would give a middle term of +24x."
      }
    ],
    "rationale": "This is a difference of squares, $a^2 - b^2$, which factors to $(a-b)(a+b)$. Here, a=3x and b=4.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "Solve the inequality: $2x + 8 > 20$.",
    "correctAnswer": "x > 6",
    "rationale": "Subtract 8 from both sides: 2x > 12. Divide by 2: x > 6.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the equation of a line with a slope of 1/2 and a y-intercept of 4?",
    "answerOptions": [
      {
        "text": "$y = 4x + 1/2$",
        "isCorrect": false,
        "rationale": "This reverses the slope and y-intercept."
      },
      {
        "text": "$y = 1/2x + 4$",
        "isCorrect": true,
        "rationale": "This fits the y=mx+b form with the given values."
      },
      {
        "text": "$y = 1/2x - 4$",
        "isCorrect": false,
        "rationale": "This has the wrong y-intercept."
      },
      {
        "text": "$x = 1/2y + 4$",
        "isCorrect": false,
        "rationale": "This reverses x and y."
      }
    ],
    "rationale": "Using the slope-intercept form y = mx + b, substitute m = 1/2 and b = 4 to get y = (1/2)x + 4.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Solve the system of equations: $y = x + 3$ and $2x + y = 9$.",
    "answerOptions": [
      {
        "text": "$x=2, y=5$",
        "isCorrect": true,
        "rationale": "Substitute y=x+3 into the second equation: 2x + (x+3) = 9. 3x+3=9. 3x=6. x=2. Then y=2+3=5."
      },
      {
        "text": "$x=3, y=6$",
        "isCorrect": false,
        "rationale": "This satisfies the first equation but not the second."
      },
      {
        "text": "$x=1, y=4$",
        "isCorrect": false,
        "rationale": "This satisfies the first equation but not the second."
      },
      {
        "text": "$x=4, y=1$",
        "isCorrect": false,
        "rationale": "This satisfies the second equation but not the first."
      }
    ],
    "rationale": "Use substitution. Substitute the first equation into the second: 2x + (x + 3) = 9. Combine like terms: 3x + 3 = 9. Subtract 3: 3x = 6. Divide by 3: x = 2. Now find y using the first equation: y = 2 + 3 = 5. The solution is (2, 5).",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the degree of the polynomial $5x^3 - 2x^2 + 7$?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is the degree of a linear term."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "2 is an exponent, but not the highest."
      },
      {
        "text": "3",
        "isCorrect": true,
        "rationale": "The degree of a polynomial is the highest exponent of the variable. Here it is 3."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is a coefficient."
      }
    ],
    "rationale": "The degree of a polynomial is the highest exponent of its variable. In this case, the highest exponent is 3.",
    "challenge_tags": [
      "math-3"
    ]
  }
];
