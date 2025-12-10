module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the result of 502 - 49?",
    "answerOptions": [
      {
        "text": "453",
        "isCorrect": true,
        "rationale": "502 - 49 = 453."
      },
      {
        "text": "451",
        "isCorrect": false,
        "rationale": "This is 500-49."
      },
      {
        "text": "551",
        "isCorrect": false,
        "rationale": "This is the sum."
      },
      {
        "text": "463",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "This is a basic subtraction problem. 502 - 49 = 453.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "easy",
    "question": "What is $\\frac{2}{5}$ of 40?",
    "correctAnswer": "16",
    "rationale": "To find the fraction of a number, multiply the number by the fraction. ($\\frac{2}{5}$) * 40 = $\\frac{80}{5}$ = 16.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "The price of a concert ticket is $110. A 10% service fee is added. What is the total cost?",
    "answerOptions": [
      {
        "text": "$11",
        "isCorrect": false,
        "rationale": "This is the fee amount."
      },
      {
        "text": "$121",
        "isCorrect": true,
        "rationale": "The fee is 0.10 * $110 = $11. Total cost = $110 + $11 = $121."
      },
      {
        "text": "$120",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$99",
        "isCorrect": false,
        "rationale": "This is a 10% discount."
      }
    ],
    "rationale": "First, calculate the service fee: 10% of $110 is 0.10 * 110 = $11. Then, add this to the ticket price: $110 + $11 = $121.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "Evaluate: $2  imes (3+4)^2$.",
    "correctAnswer": "98",
    "rationale": "Order of operations: Parentheses (3+4=7), Exponents ($7^2$=49), Multiplication (2*49=98).",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following is a prime number?",
    "answerOptions": [
      {
        "text": "27",
        "isCorrect": false,
        "rationale": "27 is divisible by 3 and 9."
      },
      {
        "text": "33",
        "isCorrect": false,
        "rationale": "33 is divisible by 3 and 11."
      },
      {
        "text": "39",
        "isCorrect": false,
        "rationale": "39 is divisible by 3 and 13."
      },
      {
        "text": "29",
        "isCorrect": true,
        "rationale": "29 is only divisible by 1 and itself."
      }
    ],
    "rationale": "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 29 fits this definition.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A company's profits increased from $300,000 to $360,000. What was the percent increase?",
    "answerOptions": [
      {
        "text": "15%",
        "isCorrect": false,
        "rationale": "This would be an increase of $45,000."
      },
      {
        "text": "20%",
        "isCorrect": true,
        "rationale": "The increase was $60,000. (60,000 / 300,000) * 100 = 20%."
      },
      {
        "text": "25%",
        "isCorrect": false,
        "rationale": "This would be an increase of $75,000."
      },
      {
        "text": "60%",
        "isCorrect": false,
        "rationale": "This is the increase in thousands of dollars."
      }
    ],
    "rationale": "The amount of increase is $360,000 - $300,000 = $60,000. The percent increase is (increase / original amount) * 100 = (60,000 / 300,000) * 100 = 0.20 * 100 = 20%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the least common multiple (LCM) of 9 and 15.",
    "correctAnswer": "45",
    "rationale": "Multiples of 9: 9, 18, 27, 36, 45... Multiples of 15: 15, 30, 45... The LCM is 45.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the result of multiplying 2.5 by 10?",
    "answerOptions": [
      {
        "text": "0.25",
        "isCorrect": false,
        "rationale": "This is division by 10."
      },
      {
        "text": "2.5",
        "isCorrect": false,
        "rationale": "This is the original number."
      },
      {
        "text": "25",
        "isCorrect": true,
        "rationale": "Multiplying by 10 moves the decimal point one place to the right."
      },
      {
        "text": "250",
        "isCorrect": false,
        "rationale": "This is multiplication by 100."
      }
    ],
    "rationale": "When multiplying a decimal by 10, you move the decimal point one place to the right. So, 2.5 becomes 25.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A runner completes a 10-kilometer race in 50 minutes. How many minutes does it take her to run one kilometer?",
    "correctAnswer": "5 minutes",
    "rationale": "To find the time per kilometer, divide the total time by the distance: 50 minutes / 10 kilometers = 5 minutes per kilometer.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the result of $\\frac{3}{4} + \\frac{1}{8}$?",
    "answerOptions": [
      {
        "text": "$\\frac{1}{2}$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$\\frac{5}{8}$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$\\frac{7}{8}$",
        "isCorrect": true,
        "rationale": "The common denominator is 8. $\\frac{3}{4}$ = $\\frac{6}{8}$. $\\frac{6}{8}$ + $\\frac{1}{8}$ = $\\frac{7}{8}$."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "To add the fractions, find a common denominator, which is 8. Convert $\\frac{3}{4}$ to $\\frac{6}{8}$. Then add: $\\frac{6}{8} + \\frac{1}{8} = \\frac{7}{8}$.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "An account with $4000 earns 5% compound interest annually. What will be the balance after 2 years?",
    "answerOptions": [
      {
        "text": "$4200",
        "isCorrect": false,
        "rationale": "This is the balance after one year."
      },
      {
        "text": "$4400",
        "isCorrect": false,
        "rationale": "This is simple interest for two years."
      },
      {
        "text": "$4410",
        "isCorrect": true,
        "rationale": "Year 1: 4000*1.05=4200. Year 2: 4200*1.05=4410."
      },
      {
        "text": "$4500",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "This is a compound interest problem. After year 1, the balance is $4000 * 1.05 = $4200. After year 2, the balance is $4200 * 1.05 = $4410.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Evaluate: $|-3|  imes |4 - 9|$.",
    "answerOptions": [
      {
        "text": "-15",
        "isCorrect": false,
        "rationale": "The result of absolute values must be positive."
      },
      {
        "text": "15",
        "isCorrect": true,
        "rationale": "|-3| = 3. |4-9| = |-5| = 5. 3 * 5 = 15."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "21",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, evaluate the absolute values: |-3| = 3 and |4 - 9| = |-5| = 5. Then, multiply the results: 3 * 5 = 15.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
