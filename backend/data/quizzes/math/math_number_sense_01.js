// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the absolute value of -15?",
    "answerOptions": [
      {
        "text": "15",
        "isCorrect": true,
        "rationale": "The absolute value of a number is its distance from zero, which is always positive."
      },
      {
        "text": "-15",
        "isCorrect": false,
        "rationale": "The absolute value is always a non-negative number."
      },
      {
        "text": "0",
        "isCorrect": false,
        "rationale": "Only the absolute value of 0 is 0."
      },
      {
        "text": "1.5",
        "isCorrect": false,
        "rationale": "This is a decimal representation, not the absolute value."
      }
    ],
    "rationale": "The absolute value of -15, written as |-15|, is its distance from 0 on the number line, which is 15."
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following is equivalent to $3 \\frac{1}{4}$?",
    "answerOptions": [
      {
        "text": "3.14",
        "isCorrect": false,
        "rationale": "This is an approximation of pi, not the decimal for 1/4."
      },
      {
        "text": "3.25",
        "isCorrect": true,
        "rationale": "The fraction 1/4 is equal to 0.25, so 3 1/4 is 3.25."
      },
      {
        "text": "3.50",
        "isCorrect": false,
        "rationale": "3.50 is equivalent to 3 1/2."
      },
      {
        "text": "3.75",
        "isCorrect": false,
        "rationale": "3.75 is equivalent to 3 3/4."
      }
    ],
    "rationale": "To convert the fraction 1/4 to a decimal, divide 1 by 4, which equals 0.25. Add this to the whole number 3 to get 3.25."
  },
  {
    "questionNumber": 3,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Evaluate the expression: $12 + (5 - 2) \\times 3^2$.",
    "correctAnswer": "39",
    "rationale": "Following the order of operations (PEMDAS): Parentheses (5-2=3), Exponents ($3^2$=9), Multiplication (3*9=27), Addition (12+27=39)."
  },
  {
    "questionNumber": 4,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A jacket that originally costs $80 is on sale for 25% off. What is the sale price?",
    "answerOptions": [
      {
        "text": "$20",
        "isCorrect": false,
        "rationale": "This is the discount amount, not the final price."
      },
      {
        "text": "$55",
        "isCorrect": false,
        "rationale": "This is a 31.25% discount, not 25%."
      },
      {
        "text": "$60",
        "isCorrect": true,
        "rationale": "The discount is 0.25 * $80 = $20. The sale price is $80 - $20 = $60."
      },
      {
        "text": "$100",
        "isCorrect": false,
        "rationale": "This is the price after a 25% markup, not a discount."
      }
    ],
    "rationale": "Calculate the discount: 25% of $80 is $20. Subtract the discount from the original price: $80 - $20 = $60."
  },
  {
    "questionNumber": 5,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is $\\frac{3}{5}$ as a percentage?",
    "correctAnswer": "60%",
    "rationale": "To convert a fraction to a percentage, divide the numerator by the denominator and multiply by 100. (3 / 5) * 100 = 0.6 * 100 = 60%."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "The price of a stock increased from $50 to $58. What was the percent increase?",
    "answerOptions": [
      {
        "text": "8%",
        "isCorrect": false,
        "rationale": "This is the difference in price, not the percent increase."
      },
      {
        "text": "13.8%",
        "isCorrect": false,
        "rationale": "This results from dividing the old price by the new price."
      },
      {
        "text": "16%",
        "isCorrect": true,
        "rationale": "The increase is $8. The percent increase is (8 / 50) * 100 = 16%."
      },
      {
        "text": "84%",
        "isCorrect": false,
        "rationale": "This incorrectly calculates the percent change."
      }
    ],
    "rationale": "The formula for percent increase is [(New Price - Original Price) / Original Price] * 100. So, [($58 - $50) / $50] * 100 = ($8 / $50) * 100 = 0.16 * 100 = 16%."
  },
  {
    "questionNumber": 7,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Simplify the expression: $5 \\times (4 + 2) - 10 \\div 2$.",
    "answerOptions": [
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This result comes from subtracting before dividing."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This result ignores the order of operations."
      },
      {
        "text": "25",
        "isCorrect": true,
        "rationale": "Parentheses first: 5 * 6 - 10 / 2. Then multiplication/division: 30 - 5. Finally, subtraction: 25."
      },
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This result ignores the division operation."
      }
    ],
    "rationale": "Using PEMDAS: Parentheses (4+2=6), then Multiplication/Division from left to right (5*6=30, 10/2=5), then Addition/Subtraction (30-5=25)."
  },
  {
    "questionNumber": 8,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A recipe calls for $2 \\frac{1}{2}$ cups of flour, but you only want to make half the recipe. How many cups of flour do you need?",
    "correctAnswer": "1.25 cups",
    "rationale": "First, convert $2 \\frac{1}{2}$ to a decimal, which is 2.5. Then, divide by 2 to make half the recipe: 2.5 / 2 = 1.25 cups."
  },
  {
    "questionNumber": 9,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following numbers is an integer?",
    "answerOptions": [
      {
        "text": "-3.5",
        "isCorrect": false,
        "rationale": "This is a decimal, not an integer."
      },
      {
        "text": "$\\frac{1}{2}$",
        "isCorrect": false,
        "rationale": "This is a fraction, not an integer."
      },
      {
        "text": "-8",
        "isCorrect": true,
        "rationale": "Integers are whole numbers, including negatives."
      },
      {
        "text": "$\\sqrt{2}$",
        "isCorrect": false,
        "rationale": "This is an irrational number."
      }
    ],
    "rationale": "Integers are the set of whole numbers and their opposites (...-3, -2, -1, 0, 1, 2, 3...). -8 is an integer."
  },
  {
    "questionNumber": 10,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "hard",
    "question": "A car travels 150 miles on 5 gallons of gas. What is the car's fuel efficiency in miles per gallon (MPG)?",
    "correctAnswer": "30 MPG",
    "rationale": "To find the miles per gallon, divide the total miles traveled by the number of gallons used: 150 miles / 5 gallons = 30 MPG."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A survey of 200 people found that 65% prefer coffee to tea. How many people prefer tea?",
    "answerOptions": [
      {
        "text": "35",
        "isCorrect": false,
        "rationale": "This is the percentage of people who prefer tea, not the number of people."
      },
      {
        "text": "65",
        "isCorrect": false,
        "rationale": "This is the percentage of people who prefer coffee."
      },
      {
        "text": "70",
        "isCorrect": true,
        "rationale": "If 65% prefer coffee, then 100% - 65% = 35% prefer tea. 35% of 200 is 0.35 * 200 = 70."
      },
      {
        "text": "130",
        "isCorrect": false,
        "rationale": "This is the number of people who prefer coffee."
      }
    ],
    "rationale": "First, find the percentage of people who prefer tea: 100% - 65% = 35%. Then, calculate 35% of 200: 0.35 * 200 = 70 people."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Estimate the result of $48.7 \\times 10.2$.",
    "answerOptions": [
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This is too low. It's closer to 50 * 1."
      },
      {
        "text": "500",
        "isCorrect": true,
        "rationale": "Rounding 48.7 to 50 and 10.2 to 10 gives an estimate of 50 * 10 = 500."
      },
      {
        "text": "5000",
        "isCorrect": false,
        "rationale": "This is too high. It's closer to 50 * 100."
      },
      {
        "text": "487",
        "isCorrect": false,
        "rationale": "This is simply multiplying by 10, ignoring the .2"
      }
    ],
    "rationale": "To estimate, round 48.7 to 50 and 10.2 to 10. The estimated product is 50 * 10 = 500. The actual answer is 496.74."
  }
];
