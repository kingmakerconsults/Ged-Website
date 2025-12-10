// Graphing concepts demo: replaced placeholders with real multiple-choice items.
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "What is the slope of the line passing through (2, 3) and (5, 9)?",
    "answerOptions": [
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "Slope = (9−3)/(5−2) = $\frac{6}{3}$ = 2."
      },
      {
        "text": "$\frac{3}{2}$",
        "isCorrect": false,
        "rationale": "Swapped rise/run; correct is $\frac{6}{3}$, not $\frac{3}{2}$."
      },
      {
        "text": "$\frac{1}{2}$",
        "isCorrect": false,
        "rationale": "This would be $\frac{3}{6}$, but rise/run is $\frac{6}{3}$."
      },
      {
        "text": "-2",
        "isCorrect": false,
        "rationale": "Rise and run are both positive, so slope is positive."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "What is the y-intercept of y = 4x − 7?",
    "answerOptions": [
      {
        "text": "-7",
        "isCorrect": true,
        "rationale": "In y = mx + b, the y-intercept is b = −7."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "4 is the slope (m), not the y-intercept."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "Sign matters; the intercept is −7."
      },
      {
        "text": "0",
        "isCorrect": false,
        "rationale": "The graph crosses the y-axis at (0, −7)."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Which equation represents a line parallel to y = −($\frac{1}{3}$)x + 2 and passing through (0, 5)?",
    "answerOptions": [
      {
        "text": "y = −($\frac{1}{3}$)x + 5",
        "isCorrect": true,
        "rationale": "Parallel lines have the same slope (−$\frac{1}{3}$) and (0,5) implies b=5."
      },
      {
        "text": "y = ($\frac{1}{3}$)x + 5",
        "isCorrect": false,
        "rationale": "This has the opposite slope; not parallel."
      },
      {
        "text": "y = −3x + 5",
        "isCorrect": false,
        "rationale": "Slope −3 is not equal to −$\frac{1}{3}$."
      },
      {
        "text": "y = −($\frac{1}{3}$)x − 5",
        "isCorrect": false,
        "rationale": "This crosses the y-axis at −5, not at 5."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 4,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "A line is perpendicular to y = 2x + 1 and has a y-intercept of 3. Which is its equation?",
    "answerOptions": [
      {
        "text": "y = −($\frac{1}{2}$)x + 3",
        "isCorrect": true,
        "rationale": "Perpendicular slope is the negative reciprocal of 2, which is −$\frac{1}{2}$."
      },
      {
        "text": "y = 2x + 3",
        "isCorrect": false,
        "rationale": "This would be parallel, not perpendicular."
      },
      {
        "text": "y = ($\frac{1}{2}$)x + 3",
        "isCorrect": false,
        "rationale": "Reciprocal is correct but sign must be negative."
      },
      {
        "text": "y = −2x + 3",
        "isCorrect": false,
        "rationale": "This uses the negative of the slope, not the negative reciprocal."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "A line has slope 3 and passes through (1, 4). Which point lies on the line?",
    "answerOptions": [
      {
        "text": "(3, 10)",
        "isCorrect": true,
        "rationale": "y − 4 = 3(x − 1) ⇒ y = 3x + 1; at x=3, y=10."
      },
      {
        "text": "(3, 7)",
        "isCorrect": false,
        "rationale": "Plugging x=3 into y=3x+1 gives 10, not 7."
      },
      {
        "text": "(0, 1)",
        "isCorrect": false,
        "rationale": "(0,1) is on y=3x+1 but doesn’t pass through (1,4)."
      },
      {
        "text": "(2, 4)",
        "isCorrect": false,
        "rationale": "At x=2, y should be 7, not 4."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "Which statement is true about y = −2x + 5?",
    "answerOptions": [
      {
        "text": "It has slope −2 and y-intercept 5.",
        "isCorrect": true,
        "rationale": "In slope-intercept form y=mx+b, m=−2 and b=5."
      },
      {
        "text": "It has slope 5 and y-intercept −2.",
        "isCorrect": false,
        "rationale": "Swapped the slope and intercept."
      },
      {
        "text": "It increases as x increases.",
        "isCorrect": false,
        "rationale": "Negative slope means the line decreases as x increases."
      },
      {
        "text": "It crosses the y-axis at (5, 0).",
        "isCorrect": false,
        "rationale": "It crosses at (0,5), not (5,0)."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 7,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "For y = ($\frac{1}{2}$)x − 6, if x increases by 4, how does y change?",
    "answerOptions": [
      {
        "text": "+2",
        "isCorrect": true,
        "rationale": "Δy = m·Δx = ($\frac{1}{2}$)·4 = 2."
      },
      {
        "text": "+8",
        "isCorrect": false,
        "rationale": "That would use slope 2, not $\frac{1}{2}$."
      },
      {
        "text": "−2",
        "isCorrect": false,
        "rationale": "Slope is positive, so y increases when x increases."
      },
      {
        "text": "−8",
        "isCorrect": false,
        "rationale": "Both sign and magnitude are incorrect."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Find the equation of the line with slope 4 that passes through (0, −2).",
    "answerOptions": [
      {
        "text": "y = 4x − 2",
        "isCorrect": true,
        "rationale": "Through (0,−2) means y-intercept −2; slope m=4."
      },
      {
        "text": "y = 4x + 2",
        "isCorrect": false,
        "rationale": "This crosses the y-axis at (0,2), not (0,−2)."
      },
      {
        "text": "y = −4x − 2",
        "isCorrect": false,
        "rationale": "The slope is wrong (−4 instead of 4)."
      },
      {
        "text": "y = x − 2",
        "isCorrect": false,
        "rationale": "The slope is 1, not 4."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 9,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "Consider L1: y = 3x + 1 and L2: y = 3x − 5. What is their relationship?",
    "answerOptions": [
      {
        "text": "Parallel and distinct",
        "isCorrect": true,
        "rationale": "Same slope (3) but different intercepts ⇒ parallel distinct lines."
      },
      {
        "text": "Perpendicular",
        "isCorrect": false,
        "rationale": "Perpendicular slopes are negative reciprocals, not equal."
      },
      {
        "text": "Intersect at (0, 0)",
        "isCorrect": false,
        "rationale": "Different y-intercepts; they never intersect."
      },
      {
        "text": "Coincident (same line)",
        "isCorrect": false,
        "rationale": "Intercepts differ, so they are not the same line."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "What is the x-intercept of y = −5x + 10?",
    "answerOptions": [
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "Set y=0: −5x + 10 = 0 ⇒ x = 2."
      },
      {
        "text": "−2",
        "isCorrect": false,
        "rationale": "Sign error; solving gives x = 2."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "10 is the y-intercept when x=0."
      },
      {
        "text": "−5",
        "isCorrect": false,
        "rationale": "−5 is the slope, not an intercept."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Which line has the greater rate of change?",
    "answerOptions": [
      {
        "text": "y = 0.75x + 2",
        "isCorrect": true,
        "rationale": "Slope 0.75 is greater than $\frac{2}{3}$ ≈ 0.666…."
      },
      {
        "text": "y = ($\frac{2}{3}$)x − 1",
        "isCorrect": false,
        "rationale": "Slope $\frac{2}{3}$ is smaller than 0.75."
      },
      {
        "text": "They have equal slopes",
        "isCorrect": false,
        "rationale": "0.75 ≠ $\frac{2}{3}$."
      },
      {
        "text": "Cannot be determined",
        "isCorrect": false,
        "rationale": "Slopes are explicit; comparison is straightforward."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "difficulty": "hard",
    "question": "Find the equation of the line through (−2, 1) and (4, −11).",
    "answerOptions": [
      {
        "text": "y = −2x − 3",
        "isCorrect": true,
        "rationale": "Slope = (−11−1)/(4−(−2)) = −$\frac{12}{6}$ = −2; solve b with 1 = −2(−2) + b ⇒ b = −3."
      },
      {
        "text": "y = −2x + 3",
        "isCorrect": false,
        "rationale": "Slope correct, intercept sign is wrong (should be −3)."
      },
      {
        "text": "y = 2x − 3",
        "isCorrect": false,
        "rationale": "Slope should be −2, not 2."
      },
      {
        "text": "y = 2x + 3",
        "isCorrect": false,
        "rationale": "Both slope and intercept are incorrect."
      }
    ],
    "challenge_tags": [
      "math-4"
    ]
  }
];
