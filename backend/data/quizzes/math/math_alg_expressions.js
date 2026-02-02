/**
 * Expressions & Polynomials
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    "questionNumber": 1,
    "challenge_tags": [
      "math-4"
    ],
    "calculator": false,
    "question": "Simplify the expression: \(3x + 2y - x + 5y\)",
    "answerOptions": [
      {
        "text": "\(2x + 7y\)",
        "isCorrect": true,
        "rationale": "Combine like terms: \((3x - x) + (2y + 5y) = 2x + 7y\)."
      },
      {
        "text": "\(4x + 7y\)",
        "isCorrect": false,
        "rationale": "Incorrectly added \(3x and x\)."
      },
      {
        "text": "\(2x + 3y\)",
        "isCorrect": false,
        "rationale": "Incorrectly subtracted \(2y from 5y\)."
      },
      {
        "text": "\(9xy\)",
        "isCorrect": false,
        "rationale": "You cannot combine \(x and \(y terms.\)\)"
      }
    ]
  },
  {
    "questionNumber": 2,
    "challenge_tags": [
      "math-4"
    ],
    "calculator": false,
    "question": "If \(x = 4\), what is the value of the expression \(5x - 3\)?",
    "answerOptions": [
      {
        "text": "17",
        "isCorrect": true,
        "rationale": "Substitute \(x with 4: 5(4) - 3 = 20 - 3 = 17\)."
      },
      {
        "text": "23",
        "isCorrect": false,
        "rationale": "This would be the result if you added 3."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 3,
    "challenge_tags": [
      "math-4"
    ],
    "calculator": false,
    "question": "What is the result of \((2x + 3) + (x - 1)\)?",
    "answerOptions": [
      {
        "text": "\(3x + 2\)",
        "isCorrect": true,
        "rationale": "Combine like terms: \((2x + x) + (3 - 1) = 3x + 2\)."
      },
      {
        "text": "\(2x + 2\)",
        "isCorrect": false,
        "rationale": "Forgot to add the \(x terms correctly.\)"
      },
      {
        "text": "\(3x + 4\)",
        "isCorrect": false,
        "rationale": "Incorrectly added 3 and 1."
      },
      {
        "text": "\(2x^2 - 2\)",
        "isCorrect": false,
        "rationale": "This is incorrect; this is addition, not multiplication."
      }
    ]
  },
  {
    "questionNumber": 4,
    "calculator": false,
    "question": "Which of the following is equivalent to \(3(x + 5)\)?",
    "answerOptions": [
      {
        "text": "\(3x + 5\)",
        "isCorrect": false,
        "rationale": "You must distribute the 3 to both terms inside the parentheses."
      },
      {
        "text": "\(3x + 15\)",
        "isCorrect": true,
        "rationale": "Using the distributive property, \(3 \\(\times\) x + 3 \\(\times 5 = 3x + 15.\)\)"
      },
      {
        "text": "\(x + 15\)",
        "isCorrect": false,
        "rationale": "Forgot to multiply the \(x by 3.\)"
      },
      {
        "text": "\(8x\)",
        "isCorrect": false,
        "rationale": "This is an incorrect simplification."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 5,
    "calculator": false,
    "question": "Simplify: \((x^2 + 4x + 5) - (x^2 - 2x - 1)\)",
    "answerOptions": [
      {
        "text": "\(2x^2 + 2x + 4\)",
        "isCorrect": false,
        "rationale": "Incorrectly added the \(x^{2} terms.\)"
      },
      {
        "text": "\(6x + 6\)",
        "isCorrect": true,
        "rationale": "Distribute the negative: \(x^{2} + 4x + 5 - x^{2} + 2x + 1\). Combine like terms: \((x^{2}-x^{2}) + (4x+2x) + (5+1) = 6x + 6\)."
      },
      {
        "text": "\(2x + 4\)",
        "isCorrect": false,
        "rationale": "Incorrectly subtracted \(2x from 4x\)."
      },
      {
        "text": "\(6x + 4\)",
        "isCorrect": false,
        "rationale": "Incorrectly subtracted 1 from 5."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 6,
    "calculator": true,
    "question": "Evaluate the expression \(2a + 3b if a = 5 and b = -2\).",
    "answerOptions": [
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "This would be the result if \(b were 2.\)"
      },
      {
        "text": "4",
        "isCorrect": true,
        "rationale": "\(2(5) + 3(-2) = 10 - 6 = 4\)."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is just the first part of the expression."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 7,
    "calculator": true,
    "question": "What is the product of \((x + 2)(x + 3)\)?",
    "answerOptions": [
      {
        "text": "\(x^2 + 5x + 6\)",
        "isCorrect": true,
        "rationale": "Use the FOIL method: \((x \\cdot x) + (x \\cdot 3) + (2 \\cdot x) + (2 \\cdot 3) = x^{2} + 3x + 2x + 6 = x^{2} + 5x + 6\)."
      },
      {
        "text": "\(x^2 + 6\)",
        "isCorrect": false,
        "rationale": "Forgot the middle term (the 'OI' in FOIL)."
      },
      {
        "text": "\(x^2 + 6x + 5\)",
        "isCorrect": false,
        "rationale": "Incorrectly added the constants."
      },
      {
        "text": "\(2x + 5\)",
        "isCorrect": false,
        "rationale": "This is addition, not multiplication."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 8,
    "calculator": true,
    "question": "The expression \(x^2 - 9 is an example of:\)",
    "answerOptions": [
      {
        "text": "A perfect square trinomial",
        "isCorrect": false,
        "rationale": "A trinomial has three terms."
      },
      {
        "text": "The difference of squares",
        "isCorrect": true,
        "rationale": "This is in the form \(a^{2} - b^{2}\), where \(a=x and b=3\). It factors to \((x-3)(x+3)\)."
      },
      {
        "text": "A monomial",
        "isCorrect": false,
        "rationale": "A monomial has one term."
      },
      {
        "text": "A cubic expression",
        "isCorrect": false,
        "rationale": "A cubic expression has a degree of 3."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 9,
    "calculator": true,
    "question": "Factor the expression: \(x^2 + 7x + 12\)",
    "answerOptions": [
      {
        "text": "\((x + 6)(x + 2)\)",
        "isCorrect": false,
        "rationale": "\(6 \\(\times\) 2 = 12, but 6\) + 2 = 8, not 7."
      },
      {
        "text": "\((x + 3)(x + 4)\)",
        "isCorrect": true,
        "rationale": "You need two numbers that multiply to 12 and add to 7. These numbers are 3 and 4."
      },
      {
        "text": "\((x + 12)(x + 1)\)",
        "isCorrect": false,
        "rationale": "\(12 \\(\times\) 1 = 12, but 12\) + 1 = 13, not 7."
      },
      {
        "text": "\((x - 3)(x - 4)\)",
        "isCorrect": false,
        "rationale": "This would result in \(-7x\), not \(+7x\)."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 10,
    "calculator": true,
    "question": "Simplify: \(5(x - 2y) - 3(x + y)\)",
    "answerOptions": [
      {
        "text": "\(2x - 13y\)",
        "isCorrect": true,
        "rationale": "Distribute: \(5x - 10y - 3x - 3y\). Combine like terms: \((5x - 3x) + (-10y - 3y) = 2x - 13y\)."
      },
      {
        "text": "\(2x - 7y\)",
        "isCorrect": false,
        "rationale": "Incorrectly added \(-10y and 3y\)."
      },
      {
        "text": "\(8x - 13y\)",
        "isCorrect": false,
        "rationale": "Incorrectly added \(5x and 3x\)."
      },
      {
        "text": "\(2x + 13y\)",
        "isCorrect": false,
        "rationale": "Incorrectly handled the signs."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 11,
    "calculator": true,
    "question": "What is the degree of the polynomial \(4x^3 - 2x^5 + 7x - 1\)?",
    "answerOptions": [
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is the degree of the first term."
      },
      {
        "text": "5",
        "isCorrect": true,
        "rationale": "The degree of a polynomial is the highest exponent of its terms, which is 5."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is the number of terms."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is the degree of the third term."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 12,
    "calculator": true,
    "question": "If \(y = -3\), what is the value of \(y^2 + 2y - 1\)?",
    "answerOptions": [
      {
        "text": "-16",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "\((-3)^2 + 2(-3) - 1 = 9 - 6 - 1 = 2\)."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is a calculation error."
      },
      {
        "text": "-4",
        "isCorrect": false,
        "rationale": "Incorrectly calculated \((-3)^2 as -9.\)"
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 13,
    "calculator": true,
    "question": "Which expression represents '5 less than twice a number n'?",
    "answerOptions": [
      {
        "text": "\(5 - 2n\)",
        "isCorrect": false,
        "rationale": "This is '5 minus twice a number'."
      },
      {
        "text": "\(2n - 5\)",
        "isCorrect": true,
        "rationale": "'Twice a number n' is \(2n\), and '5 less than' means you subtract 5 from that."
      },
      {
        "text": "\(2(n - 5)\)",
        "isCorrect": false,
        "rationale": "This is 'twice the difference of a number and 5'."
      },
      {
        "text": "\(n - 5\)",
        "isCorrect": false,
        "rationale": "This is '5 less than a number'."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 14,
    "calculator": true,
    "question": "Expand the expression: \((2x - 1)^2\)",
    "answerOptions": [
      {
        "text": "\(4x^2 - 1\)",
        "isCorrect": false,
        "rationale": "Incorrectly squared each term. You must use FOIL: \((2x-1)(2x-1)\)."
      },
      {
        "text": "\(4x^2 + 1\)",
        "isCorrect": false,
        "rationale": "Incorrectly squared each term."
      },
      {
        "text": "\(4x^2 - 4x + 1\)",
        "isCorrect": true,
        "rationale": "\((2x - 1)(2x - 1) = 4x^{2} - 2x - 2x + 1 = 4x^{2} - 4x + 1\)."
      },
      {
        "text": "\(2x^2 - 4x + 1\)",
        "isCorrect": false,
        "rationale": "Incorrectly squared \(2x\)."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  },
  {
    "questionNumber": 15,
    "calculator": true,
    "question": "Simplify the expression: \((8x^6) / (2x^3)\)",
    "answerOptions": [
      {
        "text": "\(4x^2\)",
        "isCorrect": false,
        "rationale": "When dividing powers with the same base, you subtract the exponents."
      },
      {
        "text": "\(6x^3\)",
        "isCorrect": false,
        "rationale": "Incorrectly subtracted the coefficients."
      },
      {
        "text": "\(4x^3\)",
        "isCorrect": true,
        "rationale": "Divide the coefficients (\(\(\frac{8}{2}\)\) = 4) and subtract the exponents (\(6\)-3 = 3)."
      },
      {
        "text": "\(4x^9\)",
        "isCorrect": false,
        "rationale": "Incorrectly added the exponents."
      }
    ],
    "challenge_tags": [
      "math-3"
    ]
  }
];
