// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "In the function $f(x) = 2x - 3$, what is the value of $f(4)$?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is the result of 4-3."
      },
      {
        "text": "5",
        "isCorrect": true,
        "rationale": "Substitute 4 for x: f(4) = 2(4) - 3 = 8 - 3 = 5."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is just 2*4, without subtracting 3."
      },
      {
        "text": "11",
        "isCorrect": false,
        "rationale": "This is the result if you add 3 instead of subtracting."
      }
    ],
    "rationale": "To evaluate f(4), substitute 4 for x in the function: f(4) = 2(4) - 3 = 8 - 3 = 5.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the slope of the line given by the equation $y = 5x + 2$?",
    "correctAnswer": "5",
    "rationale": "The equation is in slope-intercept form (y = mx + b), where 'm' is the slope. In this case, the slope is 5.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the y-intercept of the line that passes through the point (2, 7) and has a slope of 3?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": true,
        "rationale": "Using y = mx + b, we have 7 = 3(2) + b. So, 7 = 6 + b, which means b = 1."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "This is the x-coordinate of the given point."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is the slope."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is the y-coordinate of the given point."
      }
    ],
    "rationale": "Use the slope-intercept form y = mx + b. Plug in the known values: 7 = 3(2) + b. Solve for b: 7 = 6 + b, so b = 1.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the slope of the line passing through the points (1, 2) and (3, 10).",
    "correctAnswer": "4",
    "rationale": "The slope (m) is the change in y divided by the change in x. m = (10 - 2) / (3 - 1) = 8 / 2 = 4.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following points lies on the line $y = -2x + 6$?",
    "answerOptions": [
      {
        "text": "(1, 4)",
        "isCorrect": true,
        "rationale": "If x=1, y = -2(1) + 6 = 4. So (1, 4) is on the line."
      },
      {
        "text": "(2, 3)",
        "isCorrect": false,
        "rationale": "If x=2, y = -2(2) + 6 = 2. So (2, 3) is not on the line."
      },
      {
        "text": "(3, 1)",
        "isCorrect": false,
        "rationale": "If x=3, y = -2(3) + 6 = 0. So (3, 1) is not on the line."
      },
      {
        "text": "(4, -1)",
        "isCorrect": false,
        "rationale": "If x=4, y = -2(4) + 6 = -2. So (4, -1) is not on the line."
      }
    ],
    "rationale": "Substitute the x-coordinate of each point into the equation and see if it produces the correct y-coordinate. For (1, 4): y = -2(1) + 6 = -2 + 6 = 4. This matches.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "What is the equation of a line that is parallel to $y = 3x - 1$ and passes through the point (2, 5)?",
    "answerOptions": [
      {
        "text": "y = 3x + 1",
        "isCorrect": false,
        "rationale": "This line has the correct slope, but does not pass through (2,5)."
      },
      {
        "text": "y = -1/3x + 5",
        "isCorrect": false,
        "rationale": "This line has the slope of a perpendicular line."
      },
      {
        "text": "y = 3x + 5",
        "isCorrect": false,
        "rationale": "This line has the correct slope, but does not pass through (2,5)."
      },
      {
        "text": "y = 3x - 1",
        "isCorrect": true,
        "rationale": "A parallel line has the same slope (3). Use y=mx+b: 5 = 3(2)+b -> 5=6+b -> b=-1. So y=3x-1."
      }
    ],
    "rationale": "Parallel lines have the same slope, so the new line's slope is 3. Use the point-slope form y - y1 = m(x - x1): y - 5 = 3(x - 2). This simplifies to y - 5 = 3x - 6, so y = 3x - 1.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Given $f(x) = x^2 + 3$, find $f(-2)$.",
    "correctAnswer": "7",
    "rationale": "Substitute -2 for x: f(-2) = $(-2)^2 + 3 = 4 + 3 = 7$.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The graph of a vertical line has a slope that is:",
    "answerOptions": [
      {
        "text": "0",
        "isCorrect": false,
        "rationale": "A horizontal line has a slope of 0."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "A line with a slope of 1 rises one unit for every one unit it runs."
      },
      {
        "text": "undefined",
        "isCorrect": true,
        "rationale": "A vertical line has an infinite change in y over zero change in x, which is undefined."
      },
      {
        "text": "negative",
        "isCorrect": false,
        "rationale": "A line that falls from left to right has a negative slope."
      }
    ],
    "rationale": "The slope is 'rise over run'. A vertical line has an infinite rise but zero run. Division by zero is undefined, so the slope is undefined.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the x-intercept of the line $2x + 4y = 8$?",
    "correctAnswer": "(4, 0)",
    "rationale": "To find the x-intercept, set y = 0. The equation becomes 2x + 4(0) = 8, so 2x = 8. Solve for x to get x = 4. The x-intercept is the point (4, 0).",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A linear function is represented by the table of values: (x=0, y=3), (x=1, y=5), (x=2, y=7). What is the slope of this function?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "The y-value increases by 2 for each 1-unit increase in x."
      },
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "For every 1-unit increase in x, the y-value increases by 2. The slope is 2."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is the y-intercept, not the slope."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is the y-value when x=1."
      }
    ],
    "rationale": "The slope is the change in y divided by the change in x. Using the first two points: (5 - 3) / (1 - 0) = 2 / 1 = 2.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "What is the slope of a line that is perpendicular to the line $y = -\\frac{1}{4}x + 2$?",
    "answerOptions": [
      {
        "text": "-1/4",
        "isCorrect": false,
        "rationale": "This is the slope of a parallel line."
      },
      {
        "text": "1/4",
        "isCorrect": false,
        "rationale": "This is the reciprocal, but not the negative reciprocal."
      },
      {
        "text": "-4",
        "isCorrect": false,
        "rationale": "This is the negative, but not the reciprocal."
      },
      {
        "text": "4",
        "isCorrect": true,
        "rationale": "The slope of a perpendicular line is the negative reciprocal of the original slope. The negative reciprocal of -1/4 is 4."
      }
    ],
    "rationale": "Perpendicular lines have slopes that are negative reciprocals of each other. The slope of the given line is -1/4. The negative reciprocal is $-(\\frac{1}{-1/4}) = 4$.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If a function is defined as $g(x) = 3x + 1$, for which value of x does $g(x) = 10$?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "g(1) = 3(1)+1 = 4."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "g(2) = 3(2)+1 = 7."
      },
      {
        "text": "3",
        "isCorrect": true,
        "rationale": "Set 3x + 1 = 10. Subtract 1 to get 3x = 9, then divide by 3 to get x = 3."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "g(4) = 3(4)+1 = 13."
      }
    ],
    "rationale": "Set the function equal to 10: 3x + 1 = 10. Solve for x by subtracting 1 from both sides (3x = 9) and then dividing by 3 (x = 3).",
    "challenge_tags": [
      "math-4"
    ]
  }
];
