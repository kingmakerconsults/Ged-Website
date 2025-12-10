// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the slope of the line with equation $y = 8 - x$?",
    "answerOptions": [
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is the y-intercept."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is the coefficient of x if it were positive."
      },
      {
        "text": "-1",
        "isCorrect": true,
        "rationale": "The equation can be rewritten as y = -1x + 8. The slope is -1."
      },
      {
        "text": "-8",
        "isCorrect": false,
        "rationale": "This is the x-intercept."
      }
    ],
    "rationale": "The slope-intercept form is y = mx + b. Rearranging the equation gives y = -x + 8, so the slope (m) is -1.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "If $f(x) = 5x + 1$, what is $f(-1)$?",
    "correctAnswer": "-4",
    "rationale": "Substitute -1 for x: f(-1) = 5(-1) + 1 = -5 + 1 = -4.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A line passes through (4, 7) and (6, 1). What is its slope?",
    "answerOptions": [
      {
        "text": "-3",
        "isCorrect": true,
        "rationale": "Slope = (1 - 7) / (6 - 4) = -6 / 2 = -3."
      },
      {
        "text": "$-\\frac{1}{3}$",
        "isCorrect": false,
        "rationale": "This is the negative reciprocal."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This has the wrong sign."
      },
      {
        "text": "$\\frac{1}{3}$",
        "isCorrect": false,
        "rationale": "This is the reciprocal."
      }
    ],
    "rationale": "The slope is the change in y divided by the change in x: $m = \\frac{1 - 7}{6 - 4} = \\frac{-6}{2} = -3$.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the y-intercept of a line with slope 3 that passes through (2, 5)?",
    "correctAnswer": "-1",
    "rationale": "Using y = mx + b: 5 = 3(2) + b. 5 = 6 + b. b = -1.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of these functions will have a U-shaped graph?",
    "answerOptions": [
      {
        "text": "$y = 3x$",
        "isCorrect": false,
        "rationale": "This is a line."
      },
      {
        "text": "$y = x^3$",
        "isCorrect": false,
        "rationale": "This is a cubic curve."
      },
      {
        "text": "$y = x^2$",
        "isCorrect": true,
        "rationale": "A quadratic function (with $x^2$) has a U-shaped graph (a parabola)."
      },
      {
        "text": "$y = 3^x$",
        "isCorrect": false,
        "rationale": "This is an exponential curve."
      }
    ],
    "rationale": "A function with a term raised to the second power (a quadratic function) produces a U-shaped graph called a parabola.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A line is parallel to $y = (\\frac{2}{3})x + 1$ and passes through (6, 2). What is its equation?",
    "answerOptions": [
      {
        "text": "$y = (\\frac{2}{3})x - 2$",
        "isCorrect": true,
        "rationale": "The slope is $\\frac{2}{3}$. Using y=mx+b: 2 = ($\\frac{2}{3}$)(6) + b -> 2 = 4 + b -> b=-2."
      },
      {
        "text": "$y = (-\\frac{3}{2})x + 11$",
        "isCorrect": false,
        "rationale": "This is a perpendicular line."
      },
      {
        "text": "$y = (\\frac{2}{3})x + 2$",
        "isCorrect": false,
        "rationale": "This does not pass through the given point."
      },
      {
        "text": "$y = (\\frac{2}{3})x + 6$",
        "isCorrect": false,
        "rationale": "This does not pass through the given point."
      }
    ],
    "rationale": "A parallel line has the same slope, $\\frac{2}{3}$. Use the point-slope form y - y1 = m(x - x1): y - 2 = ($\\frac{2}{3}$)(x - 6). y - 2 = ($\\frac{2}{3}$)x - 4. So, y = ($\\frac{2}{3}$)x - 2.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "Find the x-intercept of the line $y = -4x + 12$.",
    "correctAnswer": "3",
    "rationale": "Set y=0: 0 = -4x + 12. 4x = 12. x = 3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "What is the domain of the function $f(x) = \\sqrt{x+4}$?",
    "answerOptions": [
      {
        "text": "$x \\geq -4$",
        "isCorrect": true,
        "rationale": "The expression under the square root must be non-negative. x+4 >= 0 -> x >= -4."
      },
      {
        "text": "$x > -4$",
        "isCorrect": false,
        "rationale": "x can be equal to -4."
      },
      {
        "text": "All real numbers",
        "isCorrect": false,
        "rationale": "If x < -4, the value under the square root is negative."
      },
      {
        "text": "$x \\leq -4$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "For the function to be defined in the real numbers, the expression inside the square root must be greater than or equal to zero. $x+4 \\geq 0$, which means $x \\geq -4$.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A company's cost function is C(x) = 10x + 500, where x is the number of units produced. What is the cost of producing 50 units?",
    "correctAnswer": "$1000",
    "rationale": "C(50) = 10(50) + 500 = 500 + 500 = 1000.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the vertex of the parabola $y = x^2 + 4x + 3$.",
    "answerOptions": [
      {
        "text": "(-2, -1)",
        "isCorrect": true,
        "rationale": "The x-coordinate of the vertex is -b/(2a) = -$\\frac{4}{2}$ = -2. y = (-2)Â² + 4(-2) + 3 = 4 - 8 + 3 = -1."
      },
      {
        "text": "(2, 15)",
        "isCorrect": false,
        "rationale": "This uses x=2."
      },
      {
        "text": "(-4, 3)",
        "isCorrect": false,
        "rationale": "This uses b and c."
      },
      {
        "text": "(4, 35)",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The x-coordinate of the vertex is given by the formula $x = \\frac{-b}{2a}$. Here, a=1 and b=4, so $x = \\frac{-4}{2(1)} = -2$. To find the y-coordinate, substitute x=-2 into the equation: y = $(-2)^2$ + 4(-2) + 3 = 4 - 8 + 3 = -1. The vertex is (-2, -1).",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which function represents exponential decay?",
    "answerOptions": [
      {
        "text": "$y = 2x$",
        "isCorrect": false,
        "rationale": "This is linear growth."
      },
      {
        "text": "$y = (1.5)^x$",
        "isCorrect": false,
        "rationale": "The base is greater than 1, so this is exponential growth."
      },
      {
        "text": "$y = (0.5)^x$",
        "isCorrect": true,
        "rationale": "The base is between 0 and 1, which represents exponential decay."
      },
      {
        "text": "$y = x^2$",
        "isCorrect": false,
        "rationale": "This is a quadratic function."
      }
    ],
    "rationale": "An exponential function of the form $y = b^x$ represents decay when the base 'b' is between 0 and 1.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A function is defined by the set of points {(-1, 2), (0, 1), (1, 2), (2, 5)}. What is the value of f(1)?",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is f(2)."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is f(0)."
      },
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "The point (1, 2) indicates that when the input (x) is 1, the output (y or f(x)) is 2."
      },
      {
        "text": "-1",
        "isCorrect": false,
        "rationale": "This is an input value."
      }
    ],
    "rationale": "The notation f(1) asks for the output of the function when the input is 1. The point (1, 2) shows that the output is 2 when the input is 1.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
