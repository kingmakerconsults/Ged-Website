// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the y-intercept of the line $y = x$? ",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "The slope is 1."
      },
      {
        "text": "0",
        "isCorrect": true,
        "rationale": "The equation is y = 1x + 0. The y-intercept is 0."
      },
      {
        "text": "-1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "Cannot be determined",
        "isCorrect": false,
        "rationale": "The y-intercept is determined."
      }
    ],
    "rationale": "The line y=x passes through the origin (0,0), so its y-intercept is 0."
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "If $f(x) = 100 / x$, what is $f(20)$?",
    "correctAnswer": "5",
    "rationale": "Substitute 20 for x: f(20) = 100 / 20 = 5."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the slope of a line passing through the points (3, 7) and (5, 7).",
    "answerOptions": [
      {
        "text": "0",
        "isCorrect": true,
        "rationale": "The y-coordinates are the same, so this is a horizontal line with a slope of 0."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "Undefined",
        "isCorrect": false,
        "rationale": "This would be a vertical line."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is the y-coordinate."
      }
    ],
    "rationale": "The slope is the change in y divided by the change in x. $m = \\frac{7 - 7}{5 - 3} = \\frac{0}{2} = 0$. This indicates a horizontal line."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the equation of a line with a slope of 5 and a y-intercept of -1?",
    "correctAnswer": "y = 5x - 1",
    "rationale": "Using the slope-intercept form y = mx + b, substitute m=5 and b=-1."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of these points is NOT on the graph of the function $y = x^2 + 1$?",
    "answerOptions": [
      {
        "text": "(0, 1)",
        "isCorrect": false,
        "rationale": "If x=0, y = $0^2$+1=1. This point is on the graph."
      },
      {
        "text": "(2, 5)",
        "isCorrect": false,
        "rationale": "If x=2, y = $2^2$+1=5. This point is on the graph."
      },
      {
        "text": "(-1, 2)",
        "isCorrect": false,
        "rationale": "If x=-1, y = $(-1)^2$+1=2. This point is on the graph."
      },
      {
        "text": "(1, 3)",
        "isCorrect": true,
        "rationale": "If x=1, y = $1^2$+1=2. So (1, 3) is not on the graph."
      }
    ],
    "rationale": "Plug the x-coordinate of each point into the equation to see if it produces the correct y-coordinate. For (1, 3): y = $(1)^2$ + 1 = 2. Since 2 is not equal to 3, this point is not on the graph."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "The cost to produce 'x' items is given by the function $C(x) = 20x + 1000$. What is the cost of producing 200 items?",
    "answerOptions": [
      {
        "text": "$1020",
        "isCorrect": false,
        "rationale": "This is C(1)."
      },
      {
        "text": "$3000",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$5000",
        "isCorrect": true,
        "rationale": "C(200) = 20(200) + 1000 = 4000 + 1000 = 5000."
      },
      {
        "text": "$21000",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Substitute 200 for x in the cost function: C(200) = 20(200) + 1000 = 4000 + 1000 = $5,000."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Find the x-intercept for the line $5x + 2y = 20$.",
    "correctAnswer": "4",
    "rationale": "To find the x-intercept, set y = 0. 5x + 2(0) = 20. 5x = 20. x = 4."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "A function is defined by $f(x) = 2^x$. What type of function is this?",
    "answerOptions": [
      {
        "text": "Linear",
        "isCorrect": false,
        "rationale": "A linear function has the form y = mx + b."
      },
      {
        "text": "Quadratic",
        "isCorrect": false,
        "rationale": "A quadratic function has the form y = a$x^2$ + bx + c."
      },
      {
        "text": "Exponential",
        "isCorrect": true,
        "rationale": "A function with the variable in the exponent is an exponential function."
      },
      {
        "text": "Absolute Value",
        "isCorrect": false,
        "rationale": "An absolute value function involves |x|."
      }
    ],
    "rationale": "A function where the independent variable (x) appears in the exponent is called an exponential function. This function shows exponential growth."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A line with a slope of -1 passes through the point (5, 5). What is its y-intercept?",
    "correctAnswer": "10",
    "rationale": "Using y = mx + b: 5 = -1(5) + b. 5 = -5 + b. b = 10."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the vertex of the parabola $y = -(x+2)^2$?",
    "answerOptions": [
      {
        "text": "(2, 0)",
        "isCorrect": false,
        "rationale": "The x-coordinate is -2."
      },
      {
        "text": "(-2, 0)",
        "isCorrect": true,
        "rationale": "In vertex form y=a$(x-h)^2$+k, the vertex is (h,k). Here, h=-2 and k=0."
      },
      {
        "text": "(0, -4)",
        "isCorrect": false,
        "rationale": "This is the y-intercept."
      },
      {
        "text": "(0, 4)",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The vertex form of a parabola is y = a$(x - h)^2$ + k, where the vertex is (h, k). In this equation, h = -2 and k = 0."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which of the following lines is perpendicular to the y-axis?",
    "answerOptions": [
      {
        "text": "x = 5",
        "isCorrect": false,
        "rationale": "This line is parallel to the y-axis."
      },
      {
        "text": "y = 3",
        "isCorrect": true,
        "rationale": "A horizontal line (y=c) is perpendicular to the vertical y-axis."
      },
      {
        "text": "y = x",
        "isCorrect": false,
        "rationale": "This line is not perpendicular to the y-axis."
      },
      {
        "text": "y = -x",
        "isCorrect": false,
        "rationale": "This line is not perpendicular to the y-axis."
      }
    ],
    "rationale": "The y-axis is a vertical line. A line that is perpendicular to a vertical line must be a horizontal line. The equation of a horizontal line is y = c."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If f(x) has a slope of 3 and f(2) = 8, what is f(5)?",
    "answerOptions": [
      {
        "text": "11",
        "isCorrect": false,
        "rationale": "This is 8+3."
      },
      {
        "text": "17",
        "isCorrect": true,
        "rationale": "For a linear function, the change in y is slope * change in x. Change in x is 3. Change in y is 3*3=9. New y is 8+9=17."
      },
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is 3*5."
      },
      {
        "text": "23",
        "isCorrect": false,
        "rationale": "This is 3*5+8."
      }
    ],
    "rationale": "For a linear function, the change in the output is the slope times the change in the input. The change in x is 5 - 2 = 3. The change in y is slope * 3 = 3 * 3 = 9. So, f(5) = f(2) + 9 = 8 + 9 = 17."
  }
];
