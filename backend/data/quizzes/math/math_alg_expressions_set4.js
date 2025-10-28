module.exports = [
  {
    "questionNumber": 1,
    "type": "knowledge",
    "question": "Evaluate f(5) when f(x) = 3x - 4.",
    "answerOptions": [
      {
        "text": "11",
        "rationale": "Correct. Substitute x = 5 to get 15 - 4.",
        "isCorrect": true
      },
      {
        "text": "19",
        "rationale": "This adds instead of subtracts the constant.",
        "isCorrect": false
      },
      {
        "text": "-11",
        "rationale": "This changes the sign of the output unnecessarily.",
        "isCorrect": false
      },
      {
        "text": "1",
        "rationale": "This subtracts 4 from 5 before multiplying by 3.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "applied",
    "question": "Evaluate g(-2) when g(t) = 2t^2 - 1.",
    "answerOptions": [
      {
        "text": "7",
        "rationale": "Correct. 2(4) - 1 = 7.",
        "isCorrect": true
      },
      {
        "text": "-7",
        "rationale": "This forgets that squaring -2 gives a positive 4.",
        "isCorrect": false
      },
      {
        "text": "-3",
        "rationale": "This substitutes -2 without squaring.",
        "isCorrect": false
      },
      {
        "text": "3",
        "rationale": "This halves the correct answer.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "knowledge",
    "question": "What is the slope of the line y = (-1/2)x + 6?",
    "answerOptions": [
      {
        "text": "-1/2",
        "rationale": "Correct. The coefficient of x in slope-intercept form gives the slope.",
        "isCorrect": true
      },
      {
        "text": "1/2",
        "rationale": "This ignores the negative sign.",
        "isCorrect": false
      },
      {
        "text": "6",
        "rationale": "This is the y-intercept, not the slope.",
        "isCorrect": false
      },
      {
        "text": "-6",
        "rationale": "This multiplies the slope and intercept.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 4,
    "type": "knowledge",
    "question": "What is the domain of f(x) = sqrt(x - 3)?",
    "answerOptions": [
      {
        "text": "x >= 3",
        "rationale": "Correct. The expression under the square root must be nonnegative.",
        "isCorrect": true
      },
      {
        "text": "x > 0",
        "rationale": "This ignores the -3 inside the radical.",
        "isCorrect": false
      },
      {
        "text": "All real numbers",
        "rationale": "Square roots of negative numbers are not real.",
        "isCorrect": false
      },
      {
        "text": "x <= 3",
        "rationale": "This reverses the inequality needed to keep the radicand nonnegative.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "knowledge",
    "question": "What is the range of y = x^2 + 2?",
    "answerOptions": [
      {
        "text": "y >= 2",
        "rationale": "Correct. The parabola opens upward and has a minimum of 2.",
        "isCorrect": true
      },
      {
        "text": "y > 0",
        "rationale": "This ignores the vertical shift of +2.",
        "isCorrect": false
      },
      {
        "text": "All real numbers",
        "rationale": "Quadratic functions with positive leading coefficient are bounded below.",
        "isCorrect": false
      },
      {
        "text": "y <= 2",
        "rationale": "This would describe a downward-opening parabola.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 6,
    "type": "applied",
    "question": "For f(x) = 2x + 3, what value of x produces f(x) = 11?",
    "answerOptions": [
      {
        "text": "x = 4",
        "rationale": "Correct. Solve 2x + 3 = 11 to find x = 4.",
        "isCorrect": true
      },
      {
        "text": "x = 8",
        "rationale": "This forgets to subtract 3 before dividing by 2.",
        "isCorrect": false
      },
      {
        "text": "x = -4",
        "rationale": "This changes the sign when isolating x.",
        "isCorrect": false
      },
      {
        "text": "x = 14",
        "rationale": "This sets x equal to the function output.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 7,
    "type": "knowledge",
    "question": "What is the y-intercept of y = 5 - 3x?",
    "answerOptions": [
      {
        "text": "(0, 5)",
        "rationale": "Correct. Set x = 0 to find where the graph crosses the y-axis.",
        "isCorrect": true
      },
      {
        "text": "(5, 0)",
        "rationale": "This is the x-intercept instead.",
        "isCorrect": false
      },
      {
        "text": "(0, -3)",
        "rationale": "This uses the slope rather than the constant term.",
        "isCorrect": false
      },
      {
        "text": "(1, 2)",
        "rationale": "This substitutes x = 1 instead of x = 0.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 8,
    "type": "knowledge",
    "question": "Evaluate h(2) when h(x) = |x - 2|.",
    "answerOptions": [
      {
        "text": "0",
        "rationale": "Correct. |2 - 2| = 0.",
        "isCorrect": true
      },
      {
        "text": "2",
        "rationale": "This omits subtracting before taking the absolute value.",
        "isCorrect": false
      },
      {
        "text": "-2",
        "rationale": "Absolute value outputs are never negative.",
        "isCorrect": false
      },
      {
        "text": "1",
        "rationale": "This evaluates |2 - 1| instead.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 9,
    "type": "applied",
    "question": "Compute f(g(3)) when f(x) = x + 4 and g(x) = 2x.",
    "answerOptions": [
      {
        "text": "10",
        "rationale": "Correct. First find g(3) = 6 and then compute f(6) = 10.",
        "isCorrect": true
      },
      {
        "text": "14",
        "rationale": "This adds 4 to 3 before doubling.",
        "isCorrect": false
      },
      {
        "text": "6",
        "rationale": "This stops after finding g(3) without applying f.",
        "isCorrect": false
      },
      {
        "text": "12",
        "rationale": "This multiplies f(3) by g(3).",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 10,
    "type": "knowledge",
    "question": "Does the relation y = x^2 - 1 define y as a function of x?",
    "answerOptions": [
      {
        "text": "Yes, each input x produces exactly one output y.",
        "rationale": "Correct. The relation passes the vertical line test.",
        "isCorrect": true
      },
      {
        "text": "No, because x has two possible outputs.",
        "rationale": "Each value of x gives a single value of y.",
        "isCorrect": false
      },
      {
        "text": "No, because the graph is a curve.",
        "rationale": "Being curved does not prevent a relation from being a function.",
        "isCorrect": false
      },
      {
        "text": "Yes, because it is symmetric about the y-axis.",
        "rationale": "Symmetry alone does not define a function; the unique output rule does.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 11,
    "type": "applied",
    "question": "What is the average rate of change of f(x) = x^2 from x = 1 to x = 4?",
    "answerOptions": [
      {
        "text": "5",
        "rationale": "Correct. f(4) - f(1)/4 - 1 = 16 - 1/3 = 5.",
        "isCorrect": true
      },
      {
        "text": "3",
        "rationale": "This divides by 4 instead of 3.",
        "isCorrect": false
      },
      {
        "text": "7",
        "rationale": "This subtracts 1 from 16 incorrectly.",
        "isCorrect": false
      },
      {
        "text": "15",
        "rationale": "This omits dividing by the change in x.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 12,
    "type": "applied",
    "question": "A function maps each input x to 2x - 1. If the output is 9, what input produced it?",
    "answerOptions": [
      {
        "text": "x = 5",
        "rationale": "Correct. Solve 2x - 1 = 9 to get x = 5.",
        "isCorrect": true
      },
      {
        "text": "x = 4",
        "rationale": "This subtracts 1 from 9 but forgets to divide by 2.",
        "isCorrect": false
      },
      {
        "text": "x = 10",
        "rationale": "This sets the input equal to twice the output.",
        "isCorrect": false
      },
      {
        "text": "x = -5",
        "rationale": "This changes the sign while solving.",
        "isCorrect": false
      }
    ]
  }
];
