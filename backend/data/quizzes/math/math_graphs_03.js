// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which point is located on the y-axis?",
    "answerOptions": [
      {
        "text": "(3, 0)",
        "isCorrect": false,
        "rationale": "This point is on the x-axis."
      },
      {
        "text": "(0, -2)",
        "isCorrect": true,
        "rationale": "A point on the y-axis has an x-coordinate of 0."
      },
      {
        "text": "(3, -2)",
        "isCorrect": false,
        "rationale": "This point is in the fourth quadrant."
      },
      {
        "text": "(-2, 3)",
        "isCorrect": false,
        "rationale": "This point is in the second quadrant."
      }
    ],
    "rationale": "Points on the y-axis have an x-coordinate of 0.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the slope of the equation $y = -x + 4$?",
    "correctAnswer": "-1",
    "rationale": "The equation is in slope-intercept form (y = mx + b), where 'm' is the slope. The coefficient of x is -1.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If $f(x) = x^2 - 2x$, what is the value of $f(5)$?",
    "answerOptions": [
      {
        "text": "15",
        "isCorrect": true,
        "rationale": "f(5) = $5^2$ - 2(5) = 25 - 10 = 15."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is $5^2$ - 5."
      },
      {
        "text": "35",
        "isCorrect": false,
        "rationale": "This is $5^2$ + 2(5)."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Substitute 5 for x in the function: f(5) = $(5)^2$ - 2(5) = 25 - 10 = 15.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A line passes through (0, 1) and (3, 7). What is its y-intercept?",
    "correctAnswer": "1",
    "rationale": "The y-intercept is the y-value where the line crosses the y-axis, which occurs at x=0. The point (0, 1) is the y-intercept.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following functions is a quadratic function?",
    "answerOptions": [
      {
        "text": "$y = 2x + 1$",
        "isCorrect": false,
        "rationale": "This is a linear function."
      },
      {
        "text": "$y = 3x^2 - 4x + 2$",
        "isCorrect": true,
        "rationale": "A quadratic function has a term with x² as its highest power."
      },
      {
        "text": "$y = |x-3|$",
        "isCorrect": false,
        "rationale": "This is an absolute value function."
      },
      {
        "text": "$y = 2^x$",
        "isCorrect": false,
        "rationale": "This is an exponential function."
      }
    ],
    "rationale": "A quadratic function is a polynomial function of degree 2, meaning its highest exponent is 2.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "What is the vertex of the parabola given by the equation $y = (x - 3)^2 + 5$?",
    "answerOptions": [
      {
        "text": "(-3, 5)",
        "isCorrect": false,
        "rationale": "The x-coordinate of the vertex is h, not -h."
      },
      {
        "text": "(3, 5)",
        "isCorrect": true,
        "rationale": "The equation is in vertex form y = $(x - h)^2$ + k, where (h, k) is the vertex."
      },
      {
        "text": "(3, -5)",
        "isCorrect": false,
        "rationale": "The y-coordinate of the vertex is k, not -k."
      },
      {
        "text": "(5, 3)",
        "isCorrect": false,
        "rationale": "The coordinates are reversed."
      }
    ],
    "rationale": "The vertex form of a parabola is y = a$(x - h)^2$ + k, where the vertex is at the point (h, k). In this equation, h=3 and k=5.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the slope of the line given by the equation $4x + 2y = 10$?",
    "correctAnswer": "-2",
    "rationale": "Convert the equation to slope-intercept form (y = mx + b). 2y = -4x + 10. y = -2x + 5. The slope is -2.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "If the graph of $f(x) = x^2$ is shifted 4 units to the right, what is the new function?",
    "answerOptions": [
      {
        "text": "$g(x) = x^2 + 4$",
        "isCorrect": false,
        "rationale": "This is a shift of 4 units up."
      },
      {
        "text": "$g(x) = x^2 - 4$",
        "isCorrect": false,
        "rationale": "This is a shift of 4 units down."
      },
      {
        "text": "$g(x) = (x + 4)^2$",
        "isCorrect": false,
        "rationale": "This is a shift of 4 units to the left."
      },
      {
        "text": "$g(x) = (x - 4)^2$",
        "isCorrect": true,
        "rationale": "A horizontal shift to the right by h units is represented by f(x-h)."
      }
    ],
    "rationale": "A horizontal shift of a function f(x) by h units to the right is represented by the new function g(x) = f(x - h). So, the new function is g(x) = $(x - 4)^2$.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "For the function $h(t) = -16t^2 + 64t$, find the value of $h(2)$.",
    "correctAnswer": "64",
    "rationale": "Substitute 2 for t: h(2) = -16$(2)^2$ + 64(2) = -16(4) + 128 = -64 + 128 = 64.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Which equation represents a line that is perpendicular to $y = 5x - 2$?",
    "answerOptions": [
      {
        "text": "$y = 5x + 3$",
        "isCorrect": false,
        "rationale": "This line is parallel."
      },
      {
        "text": "$y = -5x - 2$",
        "isCorrect": false,
        "rationale": "This line has a negative slope, but not the negative reciprocal."
      },
      {
        "text": "$y = \\frac{1}{5}x + 1$",
        "isCorrect": false,
        "rationale": "This is the reciprocal slope, but not the negative reciprocal."
      },
      {
        "text": "$y = -\\frac{1}{5}x + 4$",
        "isCorrect": true,
        "rationale": "The slope of a perpendicular line is the negative reciprocal of the original slope. The negative reciprocal of 5 is -1/5."
      }
    ],
    "rationale": "The slope of the given line is 5. The slope of a perpendicular line is the negative reciprocal, which is -1/5. This equation has a slope of -1/5.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "What is the range of the function $f(x) = -x^2 + 3$?",
    "answerOptions": [
      {
        "text": "$y \\leq 3$",
        "isCorrect": true,
        "rationale": "This is a downward-opening parabola with a vertex at (0, 3). The maximum y-value is 3."
      },
      {
        "text": "$y \\geq 3$",
        "isCorrect": false,
        "rationale": "The parabola opens downward, so y cannot be greater than 3."
      },
      {
        "text": "$y \\leq 0$",
        "isCorrect": false,
        "rationale": "The vertex is at y=3."
      },
      {
        "text": "All real numbers",
        "isCorrect": false,
        "rationale": "The function has a maximum value."
      }
    ],
    "rationale": "This is a parabola that opens downward (because of the negative coefficient of $x^2$) and is shifted up by 3 units. Its vertex is at (0, 3), which is the maximum point. Therefore, the range is all real numbers less than or equal to 3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "The value of a car, V, after t years is given by the function $V(t) = 25000 - 1500t$. What does the number 1500 represent?",
    "answerOptions": [
      {
        "text": "The initial value of the car",
        "isCorrect": false,
        "rationale": "The initial value is $25,000."
      },
      {
        "text": "The value of the car after one year",
        "isCorrect": false,
        "rationale": "The value after one year would be $23,500."
      },
      {
        "text": "The yearly decrease in the car's value",
        "isCorrect": true,
        "rationale": "The slope of the linear function represents the rate of change, which is a decrease of $1500 per year."
      },
      {
        "text": "The number of years until the car has no value",
        "isCorrect": false,
        "rationale": "This would be 25000/1500."
      }
    ],
    "rationale": "In this linear function, the slope (-1500) represents the rate of change of the car's value per year. Since it's negative, it represents a decrease.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
