// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the slope of a line that is horizontal?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "A slope of 1 means the line rises at a 45-degree angle."
      },
      {
        "text": "0",
        "isCorrect": true,
        "rationale": "A horizontal line has zero rise, so its slope is 0."
      },
      {
        "text": "Undefined",
        "isCorrect": false,
        "rationale": "A vertical line has an undefined slope."
      },
      {
        "text": "-1",
        "isCorrect": false,
        "rationale": "A slope of -1 means the line falls at a 45-degree angle."
      }
    ],
    "rationale": "A horizontal line has no 'rise' for its 'run'. The change in y is 0, so the slope (change in y / change in x) is always 0.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "If f(x) = x - 8, what is f(10)?",
    "correctAnswer": "2",
    "rationale": "Substitute 10 for x: f(10) = 10 - 8 = 2.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the y-intercept of the line that passes through the points (2, 8) and (4, 2).",
    "answerOptions": [
      {
        "text": "14",
        "isCorrect": true,
        "rationale": "The slope is (2-8)/(4-2) = -3. Using y=mx+b with (2,8): 8 = -3(2) + b -> 8 = -6 + b -> b=14."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "-3",
        "isCorrect": false,
        "rationale": "This is the slope."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is the average of the y-values."
      }
    ],
    "rationale": "First, find the slope: m = (2 - 8) / (4 - 2) = -6 / 2 = -3. Then, use the slope-intercept form y = mx + b with one of the points, for example (2, 8): 8 = -3(2) + b. 8 = -6 + b. So, b = 14.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the x-intercept of the line 4x + 3y = 12?",
    "correctAnswer": "3",
    "rationale": "To find the x-intercept, set y = 0. The equation becomes 4x + 3(0) = 12, so 4x = 12. Divide by 4 to get x = 3.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "The graph of which function would be a V-shape?",
    "answerOptions": [
      {
        "text": "$y = 2x$",
        "isCorrect": false,
        "rationale": "This is a straight line."
      },
      {
        "text": "$y = x^2$",
        "isCorrect": false,
        "rationale": "This is a U-shaped parabola."
      },
      {
        "text": "$y = |x|$",
        "isCorrect": true,
        "rationale": "The absolute value function creates a V-shaped graph."
      },
      {
        "text": "$y = 2^x$",
        "isCorrect": false,
        "rationale": "This is an exponential curve."
      }
    ],
    "rationale": "The graph of the absolute value function, y = |x|, is a V-shape with its vertex at the origin.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A line passes through (1, -1) and is perpendicular to the line $y = (1/2)x + 5$. What is its equation?",
    "answerOptions": [
      {
        "text": "$y = -2x + 1$",
        "isCorrect": true,
        "rationale": "The perpendicular slope is -2. Using y=mx+b: -1 = -2(1) + b -> -1 = -2 + b -> b=1."
      },
      {
        "text": "$y = (1/2)x - 1.5$",
        "isCorrect": false,
        "rationale": "This line is parallel."
      },
      {
        "text": "$y = 2x - 3$",
        "isCorrect": false,
        "rationale": "This slope is not the negative reciprocal."
      },
      {
        "text": "$y = -2x - 3$",
        "isCorrect": false,
        "rationale": "This has the correct slope but wrong y-intercept."
      }
    ],
    "rationale": "The slope of the given line is 1/2. The slope of a perpendicular line is the negative reciprocal, which is -2. Use the point-slope form y - y1 = m(x - x1): y - (-1) = -2(x - 1). y + 1 = -2x + 2. So, y = -2x + 1.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the range of the function $f(x) = x^2 + 5$?",
    "correctAnswer": "y >= 5",
    "rationale": "The parabola opens upward and its vertex is at (0, 5). Therefore, the minimum y-value is 5, and the range is all real numbers greater than or equal to 5.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "If the graph of $f(x) = x^3$ is shifted 2 units to the left and 3 units down, what is the new function?",
    "answerOptions": [
      {
        "text": "$g(x) = (x - 2)^3 - 3$",
        "isCorrect": false,
        "rationale": "This is a shift right and down."
      },
      {
        "text": "$g(x) = (x + 2)^3 - 3$",
        "isCorrect": true,
        "rationale": "A shift left by 2 is f(x+2), and a shift down by 3 is f(x)-3."
      },
      {
        "text": "$g(x) = (x + 2)^3 + 3$",
        "isCorrect": false,
        "rationale": "This is a shift left and up."
      },
      {
        "text": "$g(x) = (x - 3)^3 - 2$",
        "isCorrect": false,
        "rationale": "This reverses the shifts."
      }
    ],
    "rationale": "A horizontal shift to the left by 2 units is represented by replacing x with (x+2). A vertical shift down by 3 units is represented by subtracting 3 from the function. So, the new function is g(x) = $(x + 2)^3$ - 3.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "For the function $f(x) = 100(2)^x$, find the value of $f(3)$.",
    "correctAnswer": "800",
    "rationale": "Substitute 3 for x: f(3) = 100 * $(2)^3$ = 100 * 8 = 800.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Which point is the vertex of the parabola $y = (x-5)^2 + 1$?",
    "answerOptions": [
      {
        "text": "(-5, 1)",
        "isCorrect": false,
        "rationale": "The x-coordinate is h, not -h."
      },
      {
        "text": "(5, 1)",
        "isCorrect": true,
        "rationale": "The vertex form is y = (x-h)² + k, so the vertex is (h,k)."
      },
      {
        "text": "(1, 5)",
        "isCorrect": false,
        "rationale": "The coordinates are reversed."
      },
      {
        "text": "(5, -1)",
        "isCorrect": false,
        "rationale": "The y-coordinate is k, not -k."
      }
    ],
    "rationale": "The equation is in vertex form, y = a$(x - h)^2$ + k, where the vertex is (h, k). In this case, h=5 and k=1.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which of these functions has a graph that opens downward?",
    "answerOptions": [
      {
        "text": "$y = x^2 - 3$",
        "isCorrect": false,
        "rationale": "The coefficient of $x^2$ is positive, so it opens upward."
      },
      {
        "text": "$y = -x^2 + 4$",
        "isCorrect": true,
        "rationale": "A negative coefficient for the $x^2$ term means the parabola opens downward."
      },
      {
        "text": "$y = (x-2)^2$",
        "isCorrect": false,
        "rationale": "The coefficient of $x^2$ is positive."
      },
      {
        "text": "$y = 2x^2$",
        "isCorrect": false,
        "rationale": "The coefficient of $x^2$ is positive."
      }
    ],
    "rationale": "The direction of a parabola is determined by the sign of the coefficient of the $x^2$ term. A negative coefficient means the parabola opens downward.",
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "The table shows a linear relationship between x and y. What is the slope? (x=2, y=5), (x=4, y=9)",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "Slope = (9-5)/(4-2) = 4/2 = 2."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is the change in y."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is the average of x and y."
      }
    ],
    "rationale": "The slope is the change in y divided by the change in x. Using the two points: $m = \\frac{9 - 5}{4 - 2} = \\frac{4}{2} = 2$.",
    "challenge_tags": [
      "math-4"
    ]
  }
];
