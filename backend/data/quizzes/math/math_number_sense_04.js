// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is 50% of 90?",
    "answerOptions": [
      {
        "text": "40",
        "isCorrect": false,
        "rationale": "This is 50% of 80."
      },
      {
        "text": "45",
        "isCorrect": true,
        "rationale": "50% is half of a number. Half of 90 is 45."
      },
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This is 50% of 100."
      },
      {
        "text": "90",
        "isCorrect": false,
        "rationale": "This is 100% of 90."
      }
    ],
    "rationale": "50% is equivalent to one-half. To find 50% of 90, you can divide 90 by 2, which is 45.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "Calculate: $100 - 35$.",
    "correctAnswer": "65",
    "rationale": "This is a basic subtraction problem. 100 - 35 = 65.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A pair of shoes costs $75. If the sales tax is 6%, what is the total cost?",
    "answerOptions": [
      {
        "text": "$4.50",
        "isCorrect": false,
        "rationale": "This is the amount of the sales tax, not the total cost."
      },
      {
        "text": "$79.50",
        "isCorrect": true,
        "rationale": "The tax is 0.06 * $75 = $4.50. The total cost is $75 + $4.50 = $79.50."
      },
      {
        "text": "$81.00",
        "isCorrect": false,
        "rationale": "This would be an 8% sales tax."
      },
      {
        "text": "$75.06",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation of the tax."
      }
    ],
    "rationale": "First, calculate the sales tax amount: 6% of $75 is 0.06 * 75 = $4.50. Then, add this to the original price: $75 + $4.50 = $79.50.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "Evaluate the expression: $5 + 3 \\times (8 - 2)$.",
    "correctAnswer": "23",
    "rationale": "According to the order of operations (PEMDAS), first solve the parentheses: 8 - 2 = 6. Then, do the multiplication: 3 * 6 = 18. Finally, the addition: 5 + 18 = 23.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the decimal equivalent of $\\frac{7}{20}$?",
    "answerOptions": [
      {
        "text": "0.35",
        "isCorrect": true,
        "rationale": "To convert a fraction to a decimal, divide the numerator by the denominator: 7 / 20 = 0.35."
      },
      {
        "text": "0.7",
        "isCorrect": false,
        "rationale": "This would be $\\frac{7}{10}$."
      },
      {
        "text": "0.20",
        "isCorrect": false,
        "rationale": "This is the denominator as a decimal."
      },
      {
        "text": "3.5",
        "isCorrect": false,
        "rationale": "This is $\\frac{7}{2}$."
      }
    ],
    "rationale": "To convert a fraction to a decimal, divide the numerator by the denominator. 7 Ã· 20 = 0.35.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A population of 5,000 increases by 15%. What is the new population?",
    "answerOptions": [
      {
        "text": "750",
        "isCorrect": false,
        "rationale": "This is the amount of the increase, not the new total population."
      },
      {
        "text": "5,150",
        "isCorrect": false,
        "rationale": "This would be a 3% increase."
      },
      {
        "text": "5,750",
        "isCorrect": true,
        "rationale": "The increase is 0.15 * 5000 = 750. The new population is 5000 + 750 = 5,750."
      },
      {
        "text": "8,250",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, calculate the increase: 15% of 5,000 is 0.15 * 5000 = 750. Then, add this increase to the original population: 5,000 + 750 = 5,750.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the product of $-6$ and $9$?",
    "correctAnswer": "-54",
    "rationale": "The product of a negative number and a positive number is negative. 6 * 9 = 54, so the answer is -54.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which number is the smallest?",
    "answerOptions": [
      {
        "text": "-10",
        "isCorrect": true,
        "rationale": "On a number line, -10 is further to the left than the other numbers, making it the smallest."
      },
      {
        "text": "-5",
        "isCorrect": false,
        "rationale": "-5 is greater than -10."
      },
      {
        "text": "0",
        "isCorrect": false,
        "rationale": "0 is greater than both -5 and -10."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "3 is a positive number and the largest in this set."
      }
    ],
    "rationale": "When comparing negative numbers, the number with the larger absolute value is smaller. -10 is the smallest.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A recipe requires \\frac{3}{4} cup of sugar. If you are making 2.5 times the recipe, how many cups of sugar do you need?",
    "correctAnswer": "1.875 cups",
    "rationale": "Convert the fraction to a decimal: $\\frac{3}{4}$ = 0.75. Then multiply by 2.5: 0.75 * 2.5 = 1.875 cups.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is $4^3$?",
    "answerOptions": [
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "This is 4 * 3."
      },
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "This is $4^2$."
      },
      {
        "text": "64",
        "isCorrect": true,
        "rationale": "$4^3$ means 4 * 4 * 4 = 64."
      },
      {
        "text": "256",
        "isCorrect": false,
        "rationale": "This is $4^4$."
      }
    ],
    "rationale": "The expression $4^3$ means 4 multiplied by itself 3 times: 4 x 4 x 4 = 64.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A bank account has $2,000 and earns 3% simple interest annually. What is the balance after 5 years?",
    "answerOptions": [
      {
        "text": "$2,060",
        "isCorrect": false,
        "rationale": "This is the balance after one year."
      },
      {
        "text": "$2,300",
        "isCorrect": true,
        "rationale": "The total interest is $2000 * 0.03 * 5 = $300. The new balance is $2000 + $300 = $2,300."
      },
      {
        "text": "$300",
        "isCorrect": false,
        "rationale": "This is the total interest earned, not the final balance."
      },
      {
        "text": "$2,150",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, calculate the total simple interest earned: I = P * r * t = $2,000 * 0.03 * 5 = $300. Then, add the interest to the initial principal: $2,000 + $300 = $2,300.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Subtract: $\\frac{5}{6} - \\frac{1}{3}$.",
    "answerOptions": [
      {
        "text": "$\\frac{4}{3}$",
        "isCorrect": false,
        "rationale": "This is the result of adding the fractions."
      },
      {
        "text": "$\\frac{1}{2}$",
        "isCorrect": true,
        "rationale": "Find a common denominator (6). The problem becomes $\\frac{5}{6}$ - $\\frac{2}{6}$ = $\\frac{3}{6}$, which simplifies to $\\frac{1}{2}$."
      },
      {
        "text": "$\\frac{2}{3}$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$\\frac{4}{6}$",
        "isCorrect": false,
        "rationale": "This simplifies to $\\frac{2}{3}$."
      }
    ],
    "rationale": "To subtract the fractions, find a common denominator, which is 6. Convert $\\frac{1}{3}$ to $\\frac{2}{6}$. The problem becomes $\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6}$, which simplifies to $\\frac{1}{2}$.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
