// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which ordered pair is a solution to the equation $y = x + 5$?",
    "answerOptions": [
      {
        "text": "(2, 7)",
        "isCorrect": true,
        "rationale": "If x=2, y = 2 + 5 = 7."
      },
      {
        "text": "(7, 2)",
        "isCorrect": false,
        "rationale": "This reverses x and y."
      },
      {
        "text": "(5, 0)",
        "isCorrect": false,
        "rationale": "If x=5, y=10."
      },
      {
        "text": "(0, -5)",
        "isCorrect": false,
        "rationale": "If x=0, y=5."
      }
    ],
    "rationale": "Substitute the x-coordinate from the ordered pair into the equation and check if it yields the correct y-coordinate. For (2, 7): y = 2 + 5 = 7. This matches.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the slope of the line that passes through (1, 3) and (4, 9)?",
    "correctAnswer": "2",
    "rationale": "Slope = (change in y) / (change in x) = (9 - 3) / (4 - 1) = 6 / 3 = 2.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Given the function $f(x) = 3x^2 - 5$, what is the value of $f(-2)$?",
    "answerOptions": [
      {
        "text": "-11",
        "isCorrect": false,
        "rationale": "This is 3(-2)-5."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "7",
        "isCorrect": true,
        "rationale": "f(-2) = 3$(-2)^2$ - 5 = 3(4) - 5 = 12 - 5 = 7."
      },
      {
        "text": "31",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Substitute -2 for x in the function: f(-2) = 3$(-2)^2$ - 5 = 3(4) - 5 = 12 - 5 = 7.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the y-intercept of the line $2x - 3y = 12$?",
    "correctAnswer": "-4",
    "rationale": "To find the y-intercept, set x = 0. The equation becomes -3y = 12. Divide by -3 to get y = -4.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following lines is parallel to the line $y = 4x - 1$?",
    "answerOptions": [
      {
        "text": "$y = -4x + 2$",
        "isCorrect": false,
        "rationale": "This line has a different slope."
      },
      {
        "text": "$y = 4x + 5$",
        "isCorrect": true,
        "rationale": "Parallel lines have the same slope. This line also has a slope of 4."
      },
      {
        "text": "$y = (1/4)x - 1$",
        "isCorrect": false,
        "rationale": "This is a perpendicular line."
      },
      {
        "text": "$y = x + 4$",
        "isCorrect": false,
        "rationale": "This line has a different slope."
      }
    ],
    "rationale": "Parallel lines have the same slope. The given line has a slope of 4. This option is the only other line with a slope of 4.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "What is the equation of the line that passes through the origin and has a slope of -3?",
    "answerOptions": [
      {
        "text": "$y = -3x$",
        "isCorrect": true,
        "rationale": "A line passing through the origin has a y-intercept of 0. So, y = -3x + 0."
      },
      {
        "text": "$y = -3x + 1$",
        "isCorrect": false,
        "rationale": "This line does not pass through the origin."
      },
      {
        "text": "$y = x - 3$",
        "isCorrect": false,
        "rationale": "This has the wrong slope."
      },
      {
        "text": "$y = 3x$",
        "isCorrect": false,
        "rationale": "This has the wrong slope."
      }
    ],
    "rationale": "A line that passes through the origin (0,0) has a y-intercept of 0. Using the slope-intercept form y = mx + b, the equation is y = -3x + 0, which simplifies to y = -3x.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "If $f(x) = 2x$ and $g(x) = x - 1$, find $f(g(4))$.",
    "correctAnswer": "6",
    "rationale": "First, find g(4): g(4) = 4 - 1 = 3. Then, find f(3): f(3) = 2 * 3 = 6.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The vertex of a parabola is at (2, -5). What is the axis of symmetry?",
    "answerOptions": [
      {
        "text": "x = 2",
        "isCorrect": true,
        "rationale": "The axis of symmetry for a parabola is a vertical line that passes through the vertex. Its equation is x = h, where h is the x-coordinate of the vertex."
      },
      {
        "text": "y = -5",
        "isCorrect": false,
        "rationale": "This is a horizontal line through the vertex."
      },
      {
        "text": "x = -5",
        "isCorrect": false,
        "rationale": "This uses the y-coordinate."
      },
      {
        "text": "y = 2",
        "isCorrect": false,
        "rationale": "This uses the x-coordinate for a horizontal line."
      }
    ],
    "rationale": "The axis of symmetry of a parabola is the vertical line that passes through its vertex. The equation of this line is x = h, where h is the x-coordinate of the vertex. So, the axis of symmetry is x = 2.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A bank account balance B(t) after t years is modeled by $B(t) = 500(1.03)^t$. What is the balance after 2 years?",
    "correctAnswer": "$530.45",
    "rationale": "Substitute 2 for t: B(2) = 500 * $(1.03)^2$ = 500 * 1.0609 = 530.45.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the midpoint of the line segment with endpoints (-2, 4) and (6, 8)?",
    "answerOptions": [
      {
        "text": "(2, 6)",
        "isCorrect": true,
        "rationale": "Midpoint = ((-2+6)/2, (4+8)/2) = (4/2, 12/2) = (2, 6)."
      },
      {
        "text": "(4, 12)",
        "isCorrect": false,
        "rationale": "This is the sum of the coordinates."
      },
      {
        "text": "(8, 4)",
        "isCorrect": false,
        "rationale": "This is the difference of the coordinates."
      },
      {
        "text": "(4, 2)",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The midpoint formula is $(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})$. So, the midpoint is $(\\frac{-2+6}{2}, \\frac{4+8}{2}) = (\\frac{4}{2}, \\frac{12}{2}) = (2, 6)$.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which of the following functions has a y-intercept of -2?",
    "answerOptions": [
      {
        "text": "$y = -2x$",
        "isCorrect": false,
        "rationale": "The y-intercept is 0."
      },
      {
        "text": "$y = x - 2$",
        "isCorrect": true,
        "rationale": "In y=mx+b form, b=-2."
      },
      {
        "text": "$y = 2x + 1$",
        "isCorrect": false,
        "rationale": "The y-intercept is 1."
      },
      {
        "text": "$2x + 3y = 6$",
        "isCorrect": false,
        "rationale": "The y-intercept is 2."
      }
    ],
    "rationale": "The y-intercept is the value of y when x=0. For y = x - 2, if x=0, y = -2.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A linear function passes through (0, 5) and has a slope of -1/2. What is its value at x=4?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "3",
        "isCorrect": true,
        "rationale": "The equation is y = (-1/2)x + 5. At x=4, y = (-1/2)(4) + 5 = -2 + 5 = 3."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is the input value."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is the y-intercept."
      }
    ],
    "rationale": "The equation of the line is y = mx + b. We are given m = -1/2 and the y-intercept b = 5. So, y = (-1/2)x + 5. To find the value at x=4, substitute it into the equation: y = (-1/2)(4) + 5 = -2 + 5 = 3.",
    "challenge_tags": [
      "math-4"
    ]
  }
];
