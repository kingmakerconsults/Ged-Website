// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the slope of a line that is parallel to $y = 5x - 3$?",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": true,
        "rationale": "Parallel lines have the same slope."
      },
      {
        "text": "-3",
        "isCorrect": false,
        "rationale": "This is the y-intercept."
      },
      {
        "text": "$-\\frac{1}{5}$",
        "isCorrect": false,
        "rationale": "This is the slope of a perpendicular line."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is an incorrect value."
      }
    ],
    "rationale": "Parallel lines have identical slopes. The slope of the given line is 5, so a parallel line will also have a slope of 5.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "If $f(x) = 15 - x$, what is $f(15)$?",
    "correctAnswer": "0",
    "rationale": "Substitute 15 for x: f(15) = 15 - 15 = 0.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Which point lies on the line $y = 3x + 1$?",
    "answerOptions": [
      {
        "text": "(1, 4)",
        "isCorrect": true,
        "rationale": "If x=1, y=3(1)+1=4."
      },
      {
        "text": "(2, 5)",
        "isCorrect": false,
        "rationale": "If x=2, y=3(2)+1=7."
      },
      {
        "text": "(0, 0)",
        "isCorrect": false,
        "rationale": "If x=0, y=1."
      },
      {
        "text": "(-1, -1)",
        "isCorrect": false,
        "rationale": "If x=-1, y=3(-1)+1=-2."
      }
    ],
    "rationale": "Plug in the x-coordinate from each point and see if it produces the correct y-coordinate. For (1, 4): y = 3(1) + 1 = 4. This matches.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the slope of a line passing through (4, 2) and (6, 10)?",
    "correctAnswer": "4",
    "rationale": "Slope = (10-2)/(6-4) = $\\frac{8}{2}$ = 4.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the y-intercept of the function $f(x) = x^2 - 9$?",
    "answerOptions": [
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is an x-intercept."
      },
      {
        "text": "-3",
        "isCorrect": false,
        "rationale": "This is an x-intercept."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is an incorrect value."
      },
      {
        "text": "-9",
        "isCorrect": true,
        "rationale": "The y-intercept is the value when x=0. f(0) = -9."
      }
    ],
    "rationale": "To find the y-intercept, set x=0. f(0) = 0Â² - 9 = -9.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A function is defined by $f(x) = 2x - 3$. If $f(x) = 7$, what is the value of x?",
    "answerOptions": [
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "f(2) = 1."
      },
      {
        "text": "5",
        "isCorrect": true,
        "rationale": "2x - 3 = 7 -> 2x = 10 -> x=5."
      },
      {
        "text": "11",
        "isCorrect": false,
        "rationale": "f(11) = 19."
      },
      {
        "text": "17",
        "isCorrect": false,
        "rationale": "f(17) = 31."
      }
    ],
    "rationale": "Set the function equal to 7: 2x - 3 = 7. Add 3 to both sides: 2x = 10. Divide by 2: x = 5.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the x-intercept of the line $y = 5x + 15$?",
    "correctAnswer": "-3",
    "rationale": "Set y=0: 0 = 5x + 15 -> -15 = 5x -> x=-3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The graph of $y = (x+1)^2 - 2$ is a parabola. What is its vertex?",
    "answerOptions": [
      {
        "text": "(1, -2)",
        "isCorrect": false,
        "rationale": "The x-coordinate is -1."
      },
      {
        "text": "(-1, -2)",
        "isCorrect": true,
        "rationale": "The vertex form y=(x-h)Â²+k gives the vertex (h,k)."
      },
      {
        "text": "(1, 2)",
        "isCorrect": false,
        "rationale": "Incorrect signs."
      },
      {
        "text": "(-1, 2)",
        "isCorrect": false,
        "rationale": "The y-coordinate is -2."
      }
    ],
    "rationale": "The vertex form of a parabola is y = a(x - h)Â² + k, where the vertex is (h, k). In this equation, h = -1 and k = -2.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A gym membership costs $25 per month. Write a function C(m) for the total cost of 'm' months.",
    "correctAnswer": "C(m) = 25m",
    "rationale": "The total cost is the monthly cost multiplied by the number of months.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the equation of a line with slope -2 that passes through (1, 3).",
    "answerOptions": [
      {
        "text": "y = -2x + 1",
        "isCorrect": false,
        "rationale": "This does not pass through (1,3)."
      },
      {
        "text": "y = -2x + 5",
        "isCorrect": true,
        "rationale": "Using y=mx+b: 3 = -2(1)+b -> b=5."
      },
      {
        "text": "y = x + 2",
        "isCorrect": false,
        "rationale": "This has the wrong slope."
      },
      {
        "text": "y = 3x - 2",
        "isCorrect": false,
        "rationale": "This has the wrong slope."
      }
    ],
    "rationale": "Use the point-slope form y - y1 = m(x - x1): y - 3 = -2(x - 1). y - 3 = -2x + 2. y = -2x + 5.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The range of a function is:",
    "answerOptions": [
      {
        "text": "All possible x-values.",
        "isCorrect": false,
        "rationale": "This is the domain."
      },
      {
        "text": "All possible y-values.",
        "isCorrect": true,
        "rationale": "The range is the set of all possible output values (y-values)."
      },
      {
        "text": "The x-intercepts.",
        "isCorrect": false,
        "rationale": "These are specific points."
      },
      {
        "text": "The y-intercepts.",
        "isCorrect": false,
        "rationale": "This is a specific point."
      }
    ],
    "rationale": "The range of a function is the set of all possible output values (y-values) that the function can produce.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the slope of the line $3x - y = 2$?",
    "answerOptions": [
      {
        "text": "3",
        "isCorrect": true,
        "rationale": "Rewrite as y = 3x - 2. The slope is 3."
      },
      {
        "text": "-1",
        "isCorrect": false,
        "rationale": "This is the coefficient of y."
      },
      {
        "text": "-2",
        "isCorrect": false,
        "rationale": "This is the y-intercept."
      },
      {
        "text": "$\\frac{2}{3}$",
        "isCorrect": false,
        "rationale": "This is the x-intercept."
      }
    ],
    "rationale": "To find the slope, rewrite the equation in slope-intercept form (y = mx + b). -y = -3x + 2. y = 3x - 2. The slope (m) is 3.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
