// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "Solve for y: $y - 15 = 2$.",
    "correctAnswer": "17",
    "rationale": "Add 15 to both sides of the equation: 2 + 15 = 17."
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Evaluate $a/4 + 1$ for $a = 16$.",
    "answerOptions": [
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is 16/4."
      },
      {
        "text": "5",
        "isCorrect": true,
        "rationale": "Substitute 16 for a: 16/4 + 1 = 4 + 1 = 5."
      },
      {
        "text": "17",
        "isCorrect": false,
        "rationale": "This is 16+1."
      },
      {
        "text": "4.25",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Substitute 16 for a in the expression: 16/4 + 1 = 4 + 1 = 5."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Solve for x: $10 - 2x = 4$.",
    "answerOptions": [
      {
        "text": "-3",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "3",
        "isCorrect": true,
        "rationale": "Subtract 10: -2x = -6. Divide by -2: x = 3."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is 10/2."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is (14)/2."
      }
    ],
    "rationale": "First, subtract 10 from both sides: -2x = 4 - 10, so -2x = -6. Then, divide by -2: x = -6 / -2 = 3."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the slope of a line passing through (-1, 5) and (3, 5)?",
    "correctAnswer": "0",
    "rationale": "The y-coordinates are the same, so this is a horizontal line. The slope of a horizontal line is 0."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which expression represents '10 less than the quotient of a number and 2'?",
    "answerOptions": [
      {
        "text": "$10 - n/2$",
        "isCorrect": false,
        "rationale": "This is '10 minus the quotient'."
      },
      {
        "text": "$n/2 - 10$",
        "isCorrect": true,
        "rationale": "The quotient is n/2, and '10 less than' means subtract 10."
      },
      {
        "text": "$(n-10)/2$",
        "isCorrect": false,
        "rationale": "This is 'the quotient of 10 less than a number and 2'."
      },
      {
        "text": "$2n - 10$",
        "isCorrect": false,
        "rationale": "This is '10 less than twice a number'."
      }
    ],
    "rationale": "Let 'n' be the number. 'The quotient of a number and 2' is n/2. '10 less than' this expression means you subtract 10 from it, resulting in n/2 - 10."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "Solve for x: $2(3x - 1) = 4(x + 3)$.",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "7",
        "isCorrect": true,
        "rationale": "Distribute: 6x - 2 = 4x + 12. 2x = 14. x = 7."
      },
      {
        "text": "14",
        "isCorrect": false,
        "rationale": "This is 2x."
      }
    ],
    "rationale": "First, distribute on both sides: 6x - 2 = 4x + 12. Subtract 4x from both sides: 2x - 2 = 12. Add 2 to both sides: 2x = 14. Divide by 2: x = 7."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Factor: $4x^2 - 25$.",
    "correctAnswer": "(2x - 5)(2x + 5)",
    "rationale": "This is a difference of squares, $a^2 - b^2$, which factors to $(a-b)(a+b)$. Here, a=2x and b=5."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which of the following values of x is a solution to the inequality $5 - 3x > 11$?",
    "answerOptions": [
      {
        "text": "-1",
        "isCorrect": false,
        "rationale": "5-3(-1)=8, which is not > 11."
      },
      {
        "text": "-2",
        "isCorrect": false,
        "rationale": "5-3(-2)=11, which is not > 11."
      },
      {
        "text": "-3",
        "isCorrect": true,
        "rationale": "5-3(-3)=14, which is > 11. Solving gives x < -2."
      },
      {
        "text": "-4",
        "isCorrect": false,
        "rationale": "This is another solution, but -3 is the first listed option that works."
      }
    ],
    "rationale": "First, solve the inequality. Subtract 5: -3x > 6. Divide by -3 and reverse the inequality sign: x < -2. Of the choices given, only -3 is less than -2."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "If $f(x) = (x-4)^2 + 3$, find $f(1)$.",
    "correctAnswer": "12",
    "rationale": "f(1) = (1-4)² + 3 = (-3)² + 3 = 9 + 3 = 12."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "The length of a rectangle is 3 more than twice its width. If the perimeter is 30, what is the width?",
    "answerOptions": [
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "4",
        "isCorrect": true,
        "rationale": "Let W be width, L=2W+3. P=2(L+W)=2(2W+3+W)=2(3W+3)=6W+6. 30=6W+6 -> 24=6W -> W=4."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This would give a perimeter of 38."
      },
      {
        "text": "11",
        "isCorrect": false,
        "rationale": "This is the length."
      }
    ],
    "rationale": "Let W be the width and L be the length. L = 2W + 3. The perimeter is P = 2(L + W). 30 = 2((2W + 3) + W). 30 = 2(3W + 3). 30 = 6W + 6. 24 = 6W. W = 4."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "What are the solutions to $x^2 + 5x = 0$?",
    "answerOptions": [
      {
        "text": "{0, -5}",
        "isCorrect": true,
        "rationale": "Factor out x: x(x+5)=0. The solutions are x=0 and x=-5."
      },
      {
        "text": "{0, 5}",
        "isCorrect": false,
        "rationale": "The second solution is -5."
      },
      {
        "text": "{5, -5}",
        "isCorrect": false,
        "rationale": "0 is a solution."
      },
      {
        "text": "{0}",
        "isCorrect": false,
        "rationale": "There are two solutions."
      }
    ],
    "rationale": "To solve, factor out the common term x: x(x + 5) = 0. For the product to be zero, one of the factors must be zero. So, either x = 0 or x + 5 = 0, which means x = -5."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following is equivalent to $y cdot y cdot y cdot y$?",
    "answerOptions": [
      {
        "text": "$4y$",
        "isCorrect": false,
        "rationale": "This is y+y+y+y."
      },
      {
        "text": "$y^4$",
        "isCorrect": true,
        "rationale": "Exponents represent repeated multiplication."
      },
      {
        "text": "$y+4$",
        "isCorrect": false,
        "rationale": "This is addition."
      },
      {
        "text": "$4^y$",
        "isCorrect": false,
        "rationale": "This reverses the base and exponent."
      }
    ],
    "rationale": "Exponents are used to denote repeated multiplication. Since 'y' is multiplied by itself 4 times, it can be written as y⁴."
  }
];
