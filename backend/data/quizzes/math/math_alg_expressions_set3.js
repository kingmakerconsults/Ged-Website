module.exports = [
  {
    "questionNumber": 1,
    "type": "knowledge",
    "question": "Solve x^2 - 9 = 0.",
    "answerOptions": [
      {
        "text": "x = 3 or x = -3",
        "rationale": "Correct. Take the square root of both sides after factoring as (x - 3)(x + 3) = 0.",
        "isCorrect": true
      },
      {
        "text": "x = 9",
        "rationale": "This squares instead of square roots the constant.",
        "isCorrect": false
      },
      {
        "text": "x = 0",
        "rationale": "This is only a solution when the constant term is 0.",
        "isCorrect": false
      },
      {
        "text": "x = ± sqrt(9)",
        "rationale": "This repeats the expression without simplifying to numerical values.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "knowledge",
    "question": "Solve x^2 + 6x + 8 = 0.",
    "answerOptions": [
      {
        "text": "x = -2 or x = -4",
        "rationale": "Correct. Factor to (x + 2)(x + 4) = 0.",
        "isCorrect": true
      },
      {
        "text": "x = 2 or x = 4",
        "rationale": "This ignores the signs needed to make the factors zero.",
        "isCorrect": false
      },
      {
        "text": "x = -8",
        "rationale": "This adds the constant and linear coefficients instead of factoring.",
        "isCorrect": false
      },
      {
        "text": "x = 6",
        "rationale": "This sets the coefficient of x equal to zero.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "knowledge",
    "question": "Factor x^2 - 5x - 14.",
    "answerOptions": [
      {
        "text": "(x - 7)(x + 2)",
        "rationale": "Correct. The factors multiply to -14 and add to -5.",
        "isCorrect": true
      },
      {
        "text": "(x - 2)(x + 7)",
        "rationale": "This expands to x^2 + 5x - 14 with the wrong sign on the linear term.",
        "isCorrect": false
      },
      {
        "text": "(x - 7)(x - 2)",
        "rationale": "The product of the constants would be 14, not -14.",
        "isCorrect": false
      },
      {
        "text": "(x + 7)(x + 2)",
        "rationale": "This results in a positive linear term.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 4,
    "type": "applied",
    "question": "Use the quadratic formula to solve 2x^2 - 3x - 2 = 0.",
    "answerOptions": [
      {
        "text": "x = 2 or x = -1/2",
        "rationale": "Correct. Substitute a = 2, b = -3, and c = -2 into the formula.",
        "isCorrect": true
      },
      {
        "text": "x = -2 or x = 1/2",
        "rationale": "This switches the signs of both solutions.",
        "isCorrect": false
      },
      {
        "text": "x = 3 or x = -3/4",
        "rationale": "This divides by 4 incorrectly inside the formula.",
        "isCorrect": false
      },
      {
        "text": "x = 3 ± sqrt(5)/2",
        "rationale": "This omits dividing the discriminant by 2a = 4.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "knowledge",
    "question": "What is the vertex of y = (x - 4)^2 + 3?",
    "answerOptions": [
      {
        "text": "(4, 3)",
        "rationale": "Correct. Vertex form y = (x - h)^2 + k has vertex (h, k).",
        "isCorrect": true
      },
      {
        "text": "(4, -3)",
        "rationale": "This changes the sign of the k value.",
        "isCorrect": false
      },
      {
        "text": "( -4, 3)",
        "rationale": "This changes the sign of the h value.",
        "isCorrect": false
      },
      {
        "text": "( -4, -3)",
        "rationale": "Both coordinates have incorrect signs.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 6,
    "type": "knowledge",
    "question": "What is the axis of symmetry for y = x^2 - 6x + 5?",
    "answerOptions": [
      {
        "text": "x = 3",
        "rationale": "Correct. Use x = -b/2a = --6/2 = 3.",
        "isCorrect": true
      },
      {
        "text": "x = -3",
        "rationale": "This neglects the negative sign in the formula.",
        "isCorrect": false
      },
      {
        "text": "x = 5",
        "rationale": "This confuses the constant term with the axis.",
        "isCorrect": false
      },
      {
        "text": "x = 6",
        "rationale": "This uses the coefficient of x directly.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 7,
    "type": "applied",
    "question": "Evaluate y = x^2 - 4x + 7 for x = 1.",
    "answerOptions": [
      {
        "text": "y = 4",
        "rationale": "Correct. Substitute to get 1 - 4 + 7 = 4.",
        "isCorrect": true
      },
      {
        "text": "y = -2",
        "rationale": "This subtracts the constant instead of adding it.",
        "isCorrect": false
      },
      {
        "text": "y = 0",
        "rationale": "This assumes the expression factors with a root at x = 1.",
        "isCorrect": false
      },
      {
        "text": "y = 6",
        "rationale": "This multiplies -4 and 7 instead of adding.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 8,
    "type": "knowledge",
    "question": "Does the equation y = x^2 + 4x + 8 have real solutions?",
    "answerOptions": [
      {
        "text": "No, because the discriminant is negative.",
        "rationale": "Correct. b^2 - 4ac = 16 - 32 = -16 < 0.",
        "isCorrect": true
      },
      {
        "text": "Yes, because every quadratic has two real solutions.",
        "rationale": "A negative discriminant produces complex solutions.",
        "isCorrect": false
      },
      {
        "text": "Yes, because c is positive.",
        "rationale": "The sign of c alone does not determine the nature of the roots.",
        "isCorrect": false
      },
      {
        "text": "No, because the leading coefficient is positive.",
        "rationale": "The sign of a determines concavity, not root type.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 9,
    "type": "knowledge",
    "question": "What is the y-intercept of the quadratic y = x^2 - 5x + 6?",
    "answerOptions": [
      {
        "text": "(0, 6)",
        "rationale": "Correct. Set x = 0 to find the y-intercept.",
        "isCorrect": true
      },
      {
        "text": "(6, 0)",
        "rationale": "This is an x-intercept, not the y-intercept.",
        "isCorrect": false
      },
      {
        "text": "(0, -5)",
        "rationale": "This uses the coefficient of x instead of the constant term.",
        "isCorrect": false
      },
      {
        "text": "(1, 6)",
        "rationale": "This substitutes x = 1 rather than x = 0.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 10,
    "type": "applied",
    "question": "Solve -2(x + 1)^2 + 8 = 0.",
    "answerOptions": [
      {
        "text": "x = 1 or x = -3",
        "rationale": "Correct. Move 8, divide by -2, and take square roots.",
        "isCorrect": true
      },
      {
        "text": "x = -1 or x = 3",
        "rationale": "This reverses the shifts inside the parentheses.",
        "isCorrect": false
      },
      {
        "text": "x = 2",
        "rationale": "This assumes a single root without considering symmetry.",
        "isCorrect": false
      },
      {
        "text": "x = -4",
        "rationale": "This substitutes x for (x + 1) directly.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 11,
    "type": "knowledge",
    "question": "For x^2 + kx + 9 = 0 to have exactly one real solution, what value of k is required?",
    "answerOptions": [
      {
        "text": "k = 6 or k = -6",
        "rationale": "Correct. Set the discriminant k^2 - 36 equal to zero.",
        "isCorrect": true
      },
      {
        "text": "k = 0",
        "rationale": "This gives a negative discriminant of -36.",
        "isCorrect": false
      },
      {
        "text": "k = 3",
        "rationale": "This results in 9 - 36 < 0, producing two complex roots.",
        "isCorrect": false
      },
      {
        "text": "k = 9",
        "rationale": "This leads to a positive discriminant, not a single solution.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 12,
    "type": "applied",
    "question": "What is the maximum value of y = -x^2 + 4x + 1?",
    "answerOptions": [
      {
        "text": "5",
        "rationale": "Correct. The vertex at x = 2 gives y = -4 + 8 + 1 = 5.",
        "isCorrect": true
      },
      {
        "text": "-5",
        "rationale": "This negates the correct value.",
        "isCorrect": false
      },
      {
        "text": "1",
        "rationale": "This is the constant term, not the vertex value.",
        "isCorrect": false
      },
      {
        "text": "4",
        "rationale": "This evaluates the function at x = 1 instead of the vertex.",
        "isCorrect": false
      }
    ]
  }
];
