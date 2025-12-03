// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the value of the digit 7 in the number 4,725.3?",
    "answerOptions": [
      {
        "text": "70",
        "isCorrect": false,
        "rationale": "The digit is in the hundreds place, not the tens place."
      },
      {
        "text": "700",
        "isCorrect": true,
        "rationale": "The 7 is in the hundreds place, so its value is 700."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This would be the value if it were in the ones place."
      },
      {
        "text": "0.7",
        "isCorrect": false,
        "rationale": "This would be the value if it were in the tenths place."
      }
    ],
    "rationale": "The digit 7 is in the hundreds place, which means its value is 7 x 100 = 700.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the product of 15 and 4?",
    "correctAnswer": "60",
    "rationale": "The product is the result of multiplication. 15 * 4 = 60.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A bookstore has a 20% off sale. If a book's original price is $28.00, what is the sale price?",
    "answerOptions": [
      {
        "text": "$5.60",
        "isCorrect": false,
        "rationale": "This is the discount amount, not the final price."
      },
      {
        "text": "$22.40",
        "isCorrect": true,
        "rationale": "The discount is 0.20 * $28 = $5.60. The sale price is $28 - $5.60 = $22.40."
      },
      {
        "text": "$27.80",
        "isCorrect": false,
        "rationale": "This is the result of subtracting only 20 cents."
      },
      {
        "text": "$33.60",
        "isCorrect": false,
        "rationale": "This is the price after a 20% markup."
      }
    ],
    "rationale": "Calculate the discount: 20% of $28.00 is $5.60. Subtract the discount from the original price: $28.00 - $5.60 = $22.40.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "Evaluate: $3^3 - 2 \\times 5$.",
    "correctAnswer": "17",
    "rationale": "Order of operations (PEMDAS): Exponents first ($3^3$ = 27), then multiplication (2*5 = 10), then subtraction (27 - 10 = 17).",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following is equivalent to 0.65?",
    "answerOptions": [
      {
        "text": "$\\frac{6}{5}$",
        "isCorrect": false,
        "rationale": "6/5 is equal to 1.2."
      },
      {
        "text": "$\\frac{13}{20}$",
        "isCorrect": true,
        "rationale": "0.65 can be written as 65/100, which simplifies to 13/20."
      },
      {
        "text": "$\\frac{2}{3}$",
        "isCorrect": false,
        "rationale": "2/3 is approximately 0.67."
      },
      {
        "text": "$\\frac{65}{10}$",
        "isCorrect": false,
        "rationale": "65/10 is equal to 6.5."
      }
    ],
    "rationale": "The decimal 0.65 means 65 hundredths, or 65/100. This fraction can be simplified by dividing both the numerator and denominator by 5, which results in 13/20.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A computer's price was reduced from $800 to $680. What was the percent decrease?",
    "answerOptions": [
      {
        "text": "12%",
        "isCorrect": false,
        "rationale": "This is the price difference in hundreds of dollars."
      },
      {
        "text": "15%",
        "isCorrect": true,
        "rationale": "The price decreased by $120. The percent decrease is (120/800) * 100 = 15%."
      },
      {
        "text": "20%",
        "isCorrect": false,
        "rationale": "This would be a decrease of $160."
      },
      {
        "text": "85%",
        "isCorrect": false,
        "rationale": "This is the new price as a percentage of the old."
      }
    ],
    "rationale": "The amount of decrease is $800 - $680 = $120. The percent decrease is (decrease / original price) * 100 = ($120 / $800) * 100 = 0.15 * 100 = 15%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the greatest common factor (GCF) of 24 and 30?",
    "correctAnswer": "6",
    "rationale": "The factors of 24 are 1, 2, 3, 4, 6, 8, 12, 24. The factors of 30 are 1, 2, 3, 5, 6, 10, 15, 30. The greatest common factor is 6.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Round 3.856 to the nearest tenth.",
    "answerOptions": [
      {
        "text": "3.8",
        "isCorrect": false,
        "rationale": "This truncates the number instead of rounding."
      },
      {
        "text": "3.86",
        "isCorrect": false,
        "rationale": "This rounds to the nearest hundredth."
      },
      {
        "text": "3.9",
        "isCorrect": true,
        "rationale": "The digit in the hundredths place (5) is 5 or greater, so round up the tenths digit."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This rounds to the nearest whole number."
      }
    ],
    "rationale": "To round to the nearest tenth, look at the digit in the hundredths place. Since 5 is 5 or greater, we round up the tenths digit (8) to 9, resulting in 3.9.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A company has 120 employees. If 45% are in the sales department, how many employees are NOT in the sales department?",
    "correctAnswer": "66",
    "rationale": "If 45% are in sales, then 100% - 45% = 55% are not. 55% of 120 is 0.55 * 120 = 66.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the result of $1.2 \\times 10^3$?",
    "answerOptions": [
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "This is 1.2 * 10."
      },
      {
        "text": "120",
        "isCorrect": false,
        "rationale": "This is 1.2 * 100."
      },
      {
        "text": "1200",
        "isCorrect": true,
        "rationale": "Multiplying by 10Â³ moves the decimal point 3 places to the right."
      },
      {
        "text": "0.012",
        "isCorrect": false,
        "rationale": "This is the result of dividing by 100."
      }
    ],
    "rationale": "Multiplying a decimal by 10Â³ means moving the decimal point three places to the right. So, 1.2 becomes 1200.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A car rental costs $40 per day plus a one-time fee of $25. What is the total cost to rent the car for 5 days?",
    "answerOptions": [
      {
        "text": "$200",
        "isCorrect": false,
        "rationale": "This is the cost for the days, without the one-time fee."
      },
      {
        "text": "$225",
        "isCorrect": true,
        "rationale": "The daily cost is 5 * $40 = $200. Add the one-time fee: $200 + $25 = $225."
      },
      {
        "text": "$325",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$65",
        "isCorrect": false,
        "rationale": "This is the cost for one day."
      }
    ],
    "rationale": "The total cost is calculated as (cost per day * number of days) + one-time fee. So, ($40 * 5) + $25 = $200 + $25 = $225.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Simplify the expression: $|-8| + |3 - 5|$.",
    "answerOptions": [
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is the result if you subtract |-2|."
      },
      {
        "text": "10",
        "isCorrect": true,
        "rationale": "|-8| is 8. |3 - 5| is |-2|, which is 2. So, 8 + 2 = 10."
      },
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "-10",
        "isCorrect": false,
        "rationale": "The result of absolute value is always non-negative."
      }
    ],
    "rationale": "First, evaluate the absolute values. The absolute value of -8 is 8. The expression inside the second absolute value is 3 - 5 = -2, and its absolute value is 2. Finally, add the results: 8 + 2 = 10.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
