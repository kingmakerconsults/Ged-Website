/**
 * Graphing & Functions
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    "questionNumber": 1,
    "challenge_tags": [
      "math-2"
    ],
    "calculator": false,
    "question": "Which of the following equations is written in slope-intercept form (\\(y = mx + b\\))?",
    "answerOptions": [
      {
        "text": "\\(y = 3x - 2\\)",
        "isCorrect": true,
        "rationale": "This equation is in the form \\(y = mx + b\\), where \\(m\\) is the slope and \\(b\\) is the y-intercept."
      },
      {
        "text": "\\(2x + 3y = 6\\)",
        "isCorrect": false,
        "rationale": "This is the standard form of a linear equation."
      },
      {
        "text": "\\(y - 4 = 2(x - 1)\\)",
        "isCorrect": false,
        "rationale": "This is the point-slope form."
      },
      {
        "text": "\\(x = 5\\)",
        "isCorrect": false,
        "rationale": "This is the equation of a vertical line."
      }
    ]
  },
  {
    "questionNumber": 2,
    "calculator": false,
    "question": "If \\(f(x) = 3x + 5\\), what is \\(f(4)\\)?",
    "answerOptions": [
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "This is just \\(3 \\times 4\\)."
      },
      {
        "text": "17",
        "isCorrect": true,
        "rationale": "Substitute \\(x\\) with 4: \\(f(4) = 3(4) + 5 = 12 + 5 = 17\\)."
      },
      {
        "text": "23",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 3,
    "calculator": false,
    "question": "What is the slope of the line with the equation \\(y = -2x + 7\\)?",
    "answerOptions": [
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "7 is the y-intercept."
      },
      {
        "text": "-2",
        "isCorrect": true,
        "rationale": "In the form \\(y = mx + b\\), \\(m\\) represents the slope. Here, m = -2."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "The slope is negative."
      },
      {
        "text": "-7",
        "isCorrect": false,
        "rationale": "This is an incorrect value."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 4,
    "calculator": true,
    "question": "Find the slope of the line that passes through the points \\((2, 3)\\) and \\((5, 9)\\).",
    "answerOptions": [
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "The slope formula is \\((y_2 - y_1) / (x_2 - x_1)\\). \\((9 - 3) / (5 - 2) = 6 / 3 = 2\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "isCorrect": false,
        "rationale": "This is the reciprocal of the correct slope."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is the change in x."
      },
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is the change in y."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 5,
    "calculator": true,
    "question": "If a line has a slope of 3 and passes through the point \\((1, 2)\\), what is its equation in point-slope form?",
    "answerOptions": [
      {
        "text": "\\(y - 2 = 3(x - 1)\\)",
        "isCorrect": true,
        "rationale": "Point-slope form is \\(y - y_1 = m(x - x_1)\\). Substituting the values gives \\(y - 2 = 3(x - 1)\\)."
      },
      {
        "text": "\\(y - 1 = 3(x - 2)\\)",
        "isCorrect": false,
        "rationale": "The x and y coordinates are swapped."
      },
      {
        "text": "\\(y = 3x - 1\\)",
        "isCorrect": false,
        "rationale": "This is the slope-intercept form, which would be \\(y-2=3x-3 -> y=3x-1\\)."
      },
      {
        "text": "\\(y + 2 = 3(x + 1)\\)",
        "isCorrect": false,
        "rationale": "The signs are incorrect."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 6,
    "calculator": true,
    "question": "What is the y-intercept of the line with the equation \\(4x + 2y = 10\\)?",
    "answerOptions": [
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "You must first solve for y."
      },
      {
        "text": "5",
        "isCorrect": true,
        "rationale": "First, convert to slope-intercept form. \\(2y = -4x + 10\\). \\(y = -2x + 5\\). The y-intercept (b) is 5."
      },
      {
        "text": "-2",
        "isCorrect": false,
        "rationale": "-2 is the slope."
      },
      {
        "text": "2.5",
        "isCorrect": false,
        "rationale": "This is the x-intercept."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 7,
    "calculator": true,
    "question": "If \(g(x) = x^2 - 10\), what is \(g(3)\)?",
    "answerOptions": [
      {
        "text": "-1",
        "isCorrect": true,
        "rationale": "\(g(3) = (3)^2 - 10 = 9 - 10 = -1\)."
      },
      {
        "text": "-4",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "19",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 8,
    "calculator": true,
    "question": "Which of the following lines is parallel to the line \(y = 4x - 1\)?",
    "answerOptions": [
      {
        "text": "\(y = -4x + 2\)",
        "isCorrect": false,
        "rationale": "This line has a different slope."
      },
      {
        "text": "\(y = 4x + 5\)",
        "isCorrect": true,
        "rationale": "Parallel lines have the same slope. Both lines have a slope of 4."
      },
      {
        "text": "\(y = (\(\frac{1}{4}\)\))x + 3",
        "isCorrect": false,
        "rationale": "This slope is the reciprocal, not the same."
      },
      {
        "text": "\(y = - (\(\frac{1}{4}\)\))x - 1",
        "isCorrect": false,
        "rationale": "This is the slope of a perpendicular line."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 9,
    "calculator": true,
    "question": "The function \(C(t) = 20t + 50\) represents the cost of a plumber's visit, where \(t\) is the number of hours. What is the cost of a 3-hour visit?",
    "answerOptions": [
      {
        "text": "\(70\)",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "110",
        "isCorrect": true,
        "rationale": "\(C(3) = 20(3) + 50 = 60 + 50 = \\110\)."
      },
      {
        "text": "\(60\)",
        "isCorrect": false,
        "rationale": "This is just the hourly charge for 3 hours."
      },
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This is the flat fee."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 10,
    "calculator": true,
    "question": "What is the x-intercept of the line \(3x + 6y = 18\)?",
    "answerOptions": [
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "3 is the y-intercept."
      },
      {
        "text": "6",
        "isCorrect": true,
        "rationale": "To find the x-intercept, set \(y = 0\). \(3x + 6(0) = 18\). \(3x = 18\). \(x = 6\). The point is \((6,0)\)."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "18",
        "isCorrect": false,
        "rationale": "This is the constant in the equation."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  }
];
