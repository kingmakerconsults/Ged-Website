// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the result of adding -15 and 8?",
    "answerOptions": [
      {
        "text": "-23",
        "isCorrect": false,
        "rationale": "This is the result of subtraction."
      },
      {
        "text": "-7",
        "isCorrect": true,
        "rationale": "-15 + 8 = -7."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is 15-8."
      },
      {
        "text": "23",
        "isCorrect": false,
        "rationale": "This is 15+8."
      }
    ],
    "rationale": "Starting at -15 on the number line and moving 8 units to the right brings you to -7.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "Convert 2.5 to a fraction.",
    "correctAnswer": "$\\frac{5}{2}$",
    "rationale": "2.5 is two and a half, which can be written as the mixed number 2 $\\frac{1}{2}$. As an improper fraction, this is (2*2+1)/2 = $\\frac{5}{2}$.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A television costs $650. If there is a 7% sales tax, what is the total cost?",
    "answerOptions": [
      {
        "text": "$45.50",
        "isCorrect": false,
        "rationale": "This is the tax amount."
      },
      {
        "text": "$695.50",
        "isCorrect": true,
        "rationale": "Tax = 0.07 * 650 = $45.50. Total = 650 + 45.50 = $695.50."
      },
      {
        "text": "$657.00",
        "isCorrect": false,
        "rationale": "This is a 1% tax."
      },
      {
        "text": "$700.00",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, calculate the sales tax: 7% of $650 is 0.07 * 650 = $45.50. Then, add the tax to the original price: $650 + $45.50 = $695.50.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "Evaluate: $100 \\div 5^2$.",
    "correctAnswer": "4",
    "rationale": "Order of operations: Exponents first ($5^2$ = 25), then division (100 / 25 = 4).",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which number is a factor of 42?",
    "answerOptions": [
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "42 is not divisible by 4."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "42 is not divisible by 5."
      },
      {
        "text": "6",
        "isCorrect": true,
        "rationale": "42 is divisible by 6 (42 = 6 * 7)."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "42 is not divisible by 8."
      }
    ],
    "rationale": "A factor of a number is a number that divides it evenly. 42 divided by 6 is 7, so 6 is a factor of 42.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A city's population decreased from 25,000 to 24,000. What was the percent decrease?",
    "answerOptions": [
      {
        "text": "1%",
        "isCorrect": false,
        "rationale": "This would be a decrease of 250."
      },
      {
        "text": "4%",
        "isCorrect": true,
        "rationale": "The decrease was 1,000. (1,000 / 25,000) * 100 = 4%."
      },
      {
        "text": "5%",
        "isCorrect": false,
        "rationale": "This would be a decrease of 1250."
      },
      {
        "text": "10%",
        "isCorrect": false,
        "rationale": "This would be a decrease of 2500."
      }
    ],
    "rationale": "The amount of decrease is 25,000 - 24,000 = 1,000. The percent decrease is (decrease / original amount) * 100 = (1,000 / 25,000) * 100 = 0.04 * 100 = 4%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the next number in the sequence: 3, 6, 12, 24, ...?",
    "correctAnswer": "48",
    "rationale": "This is a geometric sequence where each term is multiplied by 2 to get the next term. 24 * 2 = 48.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is $\\frac{1}{2}$ of 50?",
    "answerOptions": [
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "25",
        "isCorrect": true,
        "rationale": "Half of 50 is 25."
      },
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This is the original number."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This is double the number."
      }
    ],
    "rationale": "Taking $\\frac{1}{2}$ of a number is the same as dividing it by 2. 50 / 2 = 25.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A plane flies 1,200 miles in 3 hours. What is its average speed in miles per hour?",
    "correctAnswer": "400 mph",
    "rationale": "Speed = Distance / Time. Speed = 1200 miles / 3 hours = 400 miles per hour.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following is the largest?",
    "answerOptions": [
      {
        "text": "0.8",
        "isCorrect": true,
        "rationale": "0.8 is the largest decimal value among the choices."
      },
      {
        "text": "75%",
        "isCorrect": false,
        "rationale": "75% is 0.75."
      },
      {
        "text": "$\\frac{3}{5}$",
        "isCorrect": false,
        "rationale": "$\\frac{3}{5}$ is 0.6."
      },
      {
        "text": "$\\frac{1}{2}$",
        "isCorrect": false,
        "rationale": "$\\frac{1}{2}$ is 0.5."
      }
    ],
    "rationale": "To compare, convert all values to decimals: 75% = 0.75, $\\frac{3}{5}$ = 0.6, $\\frac{1}{2}$ = 0.5. The largest value is 0.8.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A person's salary is $50,000 per year. If they get a 4% raise, what is their new salary?",
    "answerOptions": [
      {
        "text": "$50,400",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$52,000",
        "isCorrect": true,
        "rationale": "The raise is 0.04 * 50000 = $2000. New salary is 50000 + 2000 = $52,000."
      },
      {
        "text": "$54,000",
        "isCorrect": false,
        "rationale": "This would be an 8% raise."
      },
      {
        "text": "$70,000",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, calculate the raise amount: 4% of $50,000 is 0.04 * 50000 = $2,000. Then, add the raise to the original salary: $50,000 + $2,000 = $52,000.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Evaluate: $\\sqrt{81} \\times 2$.",
    "answerOptions": [
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is just sqrt(81)."
      },
      {
        "text": "18",
        "isCorrect": true,
        "rationale": "sqrt(81) = 9. 9 * 2 = 18."
      },
      {
        "text": "81",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "162",
        "isCorrect": false,
        "rationale": "This is 81*2."
      }
    ],
    "rationale": "First, find the square root of 81, which is 9. Then, multiply by 2: 9 * 2 = 18.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
