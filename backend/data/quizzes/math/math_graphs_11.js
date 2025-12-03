// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the slope of a line that goes down 2 units for every 3 units it moves to the right?",
    "answerOptions": [
      {
        "text": "2/3",
        "isCorrect": false,
        "rationale": "This is a positive slope."
      },
      {
        "text": "-2/3",
        "isCorrect": true,
        "rationale": "Slope is rise over run. Down 2 is a rise of -2, and right 3 is a run of 3."
      },
      {
        "text": "3/2",
        "isCorrect": false,
        "rationale": "This is the reciprocal."
      },
      {
        "text": "-3/2",
        "isCorrect": false,
        "rationale": "This is the negative reciprocal."
      }
    ],
    "rationale": "Slope is defined as 'rise over run'. A downward movement is a negative rise. So, the slope is -2/3.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "If $f(x) = 3x$, what is $f(10)$?",
    "correctAnswer": "30",
    "rationale": "Substitute 10 for x: f(10) = 3 * 10 = 30.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the equation of a line that passes through the points (1, 1) and (3, 5)?",
    "answerOptions": [
      {
        "text": "y = 2x - 1",
        "isCorrect": true,
        "rationale": "The slope is (5-1)/(3-1) = 2. Using y=mx+b with (1,1): 1=2(1)+b -> b=-1."
      },
      {
        "text": "y = 2x + 1",
        "isCorrect": false,
        "rationale": "This does not pass through (1,1)."
      },
      {
        "text": "y = x",
        "isCorrect": false,
        "rationale": "This does not have the correct slope."
      },
      {
        "text": "y = 1/2x + 0.5",
        "isCorrect": false,
        "rationale": "This has the wrong slope."
      }
    ],
    "rationale": "First, find the slope: m = (5 - 1) / (3 - 1) = 4 / 2 = 2. Then use the point-slope form with (1,1): y - 1 = 2(x - 1). y - 1 = 2x - 2. y = 2x - 1.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the y-intercept of the line $4x - 2y = 8$?",
    "correctAnswer": "-4",
    "rationale": "To find the y-intercept, set x = 0. -2y = 8. y = -4.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of these graphs would be a vertical line?",
    "answerOptions": [
      {
        "text": "y = 3",
        "isCorrect": false,
        "rationale": "This is a horizontal line."
      },
      {
        "text": "x = 3",
        "isCorrect": true,
        "rationale": "An equation of the form x=c is always a vertical line."
      },
      {
        "text": "y = x",
        "isCorrect": false,
        "rationale": "This is a diagonal line."
      },
      {
        "text": "y = 3x",
        "isCorrect": false,
        "rationale": "This is a diagonal line."
      }
    ],
    "rationale": "An equation of the form x = c, where c is a constant, represents a vertical line. All points on this line have an x-coordinate of 3.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "If a function is defined by $f(x) = x^2 - 4x + 3$, what is its y-intercept?",
    "answerOptions": [
      {
        "text": "(0, 3)",
        "isCorrect": true,
        "rationale": "The y-intercept is the value when x=0. f(0) = 3."
      },
      {
        "text": "(3, 0)",
        "isCorrect": false,
        "rationale": "This is one of the x-intercepts."
      },
      {
        "text": "(1, 0)",
        "isCorrect": false,
        "rationale": "This is one of the x-intercepts."
      },
      {
        "text": "(2, -1)",
        "isCorrect": false,
        "rationale": "This is the vertex."
      }
    ],
    "rationale": "The y-intercept of a function is the point where its graph crosses the y-axis, which occurs when x=0. For this function, f(0) = 0Â² - 4(0) + 3 = 3.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the slope of a line perpendicular to $y = -1/5x + 2$?",
    "correctAnswer": "5",
    "rationale": "The slope of the given line is -1/5. The slope of a perpendicular line is the negative reciprocal, which is 5.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "Which of the following points is a solution to the system of inequalities: $y > x$ and $x > 2$?",
    "answerOptions": [
      {
        "text": "(1, 3)",
        "isCorrect": false,
        "rationale": "x is not > 2."
      },
      {
        "text": "(3, 1)",
        "isCorrect": false,
        "rationale": "y is not > x."
      },
      {
        "text": "(3, 4)",
        "isCorrect": true,
        "rationale": "Both inequalities are satisfied: 4 > 3 and 3 > 2."
      },
      {
        "text": "(2, 2)",
        "isCorrect": false,
        "rationale": "Neither inequality is strictly satisfied."
      }
    ],
    "rationale": "Check each point against both inequalities. For (3, 4): Is 4 > 3? Yes. Is 3 > 2? Yes. Since both are true, this point is a solution.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A function models the height of a ball, h(t) = -16tÂ² + 32t, where t is time in seconds. What is the height of the ball at t=1 second?",
    "correctAnswer": "16",
    "rationale": "h(1) = -16(1)Â² + 32(1) = -16 + 32 = 16.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the x-intercept of the function $f(x) = 2x - 6$?",
    "answerOptions": [
      {
        "text": "-6",
        "isCorrect": false,
        "rationale": "This is the y-intercept."
      },
      {
        "text": "-3",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "3",
        "isCorrect": true,
        "rationale": "Set f(x)=0: 0=2x-6 -> 6=2x -> x=3."
      },
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is -y-intercept."
      }
    ],
    "rationale": "The x-intercept is the point where the graph crosses the x-axis, which occurs when f(x) = 0. So, 0 = 2x - 6. Add 6 to both sides: 6 = 2x. Divide by 2: x = 3.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The graph of $y = x^2$ is shifted 3 units down. What is the new equation?",
    "answerOptions": [
      {
        "text": "$y = x^2 - 3$",
        "isCorrect": true,
        "rationale": "A vertical shift down by k units is f(x)-k."
      },
      {
        "text": "$y = x^2 + 3$",
        "isCorrect": false,
        "rationale": "This is a shift up."
      },
      {
        "text": "$y = (x-3)^2$",
        "isCorrect": false,
        "rationale": "This is a shift right."
      },
      {
        "text": "$y = (x+3)^2$",
        "isCorrect": false,
        "rationale": "This is a shift left."
      }
    ],
    "rationale": "A vertical shift of a function f(x) down by k units is represented by the new function g(x) = f(x) - k. So, the new equation is y = xÂ² - 3.",
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If a function is represented by the points {(1,2), (2,4), (3,6)}, what is the slope of the function?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is the change in x."
      },
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "For every 1-unit increase in x, y increases by 2."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is an input value."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is an output value."
      }
    ],
    "rationale": "The slope is the change in y divided by the change in x. Using the first two points: m = (4 - 2) / (2 - 1) = 2 / 1 = 2.",
    "challenge_tags": [
      "math-3"
    ]
  }
];
