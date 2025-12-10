// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "A recipe uses 1 cup of sugar for every 2 cups of flour. If you use 6 cups of flour, how much sugar do you need?",
    "answerOptions": [
      {
        "text": "2 cups",
        "isCorrect": false,
        "rationale": "This is the original amount of flour."
      },
      {
        "text": "3 cups",
        "isCorrect": true,
        "rationale": "The amount of flour is 3 times the original, so you need 3 times the sugar: 1*3=3."
      },
      {
        "text": "4 cups",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "6 cups",
        "isCorrect": false,
        "rationale": "This is the amount of flour."
      }
    ],
    "rationale": "The ratio of sugar to flour is 1:2. Since you are using 6 cups of flour, which is 3 times the amount in the ratio, you need 3 times the amount of sugar. 1 cup * 3 = 3 cups.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A laptop is on sale for $450, which is 25% off the original price. What was the original price?",
    "correctAnswer": "$600",
    "rationale": "If the price is 25% off, it is 75% of the original price. Let P be the original price. 0.75 * P = $450. P = $450 / 0.75 = $600.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A train travels 350 miles in 5 hours. What is its average speed in miles per hour?",
    "answerOptions": [
      {
        "text": "60 mph",
        "isCorrect": false,
        "rationale": "This would be for a 300-mile trip."
      },
      {
        "text": "70 mph",
        "isCorrect": true,
        "rationale": "Speed = 350 miles / 5 hours = 70 mph."
      },
      {
        "text": "75 mph",
        "isCorrect": false,
        "rationale": "This would be for a 375-mile trip."
      },
      {
        "text": "1750 mph",
        "isCorrect": false,
        "rationale": "This is the product of distance and time."
      }
    ],
    "rationale": "Speed is calculated by dividing distance by time. Speed = 350 miles / 5 hours = 70 mph.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "A basketball player makes 7 out of 10 free throws. What is the ratio of made free throws to missed free throws?",
    "correctAnswer": "7:3",
    "rationale": "If 7 are made out of 10, then 3 are missed. The ratio of made to missed is 7:3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A restaurant bill is $120. A 15% tip is added, and then a 5% local tax is added to the total. What is the final amount?",
    "answerOptions": [
      {
        "text": "$144.90",
        "isCorrect": true,
        "rationale": "Bill with tip: $120 * 1.15 = $138. Total with tax: $138 * 1.05 = $144.90."
      },
      {
        "text": "$144.00",
        "isCorrect": false,
        "rationale": "This is a 20% increase."
      },
      {
        "text": "$138.00",
        "isCorrect": false,
        "rationale": "This is the bill with the tip, but before tax."
      },
      {
        "text": "$126.00",
        "isCorrect": false,
        "rationale": "This is the bill with tax, but before tip."
      }
    ],
    "rationale": "First, add the 15% tip: $120 * 1.15 = $138. Then, add the 5% tax to this new total: $138 * 1.05 = $144.90.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If 2.5 centimeters on a map represents 100 kilometers, how many kilometers does 4 centimeters represent?",
    "answerOptions": [
      {
        "text": "150 km",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "160 km",
        "isCorrect": true,
        "rationale": "The scale is $\\frac{100}{2}$.5 = 40 km/cm. So, 4 cm represents 4 * 40 = 160 km."
      },
      {
        "text": "250 km",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "400 km",
        "isCorrect": false,
        "rationale": "This is 100*4."
      }
    ],
    "rationale": "First, find the unit rate: 100 km / 2.5 cm = 40 km per cm. Then, multiply by the new map distance: 40 km/cm * 4 cm = 160 km.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A company's profits increased from $200,000 to $250,000. What was the percent increase?",
    "correctAnswer": "25%",
    "rationale": "The increase is $50,000. The percent increase is (increase / original amount) * 100 = (50,000 / 200,000) * 100 = 0.25 * 100 = 25%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Simplify the ratio 45:60.",
    "answerOptions": [
      {
        "text": "3:4",
        "isCorrect": true,
        "rationale": "Both numbers are divisible by 15. $\\frac{45}{15}$=3, $\\frac{60}{15}$=4."
      },
      {
        "text": "4:3",
        "isCorrect": false,
        "rationale": "This is the inverse ratio."
      },
      {
        "text": "9:12",
        "isCorrect": false,
        "rationale": "This is simplified by 5, but not to the lowest terms."
      },
      {
        "text": "15:20",
        "isCorrect": false,
        "rationale": "This is simplified by 3, but not to the lowest terms."
      }
    ],
    "rationale": "The greatest common divisor of 45 and 60 is 15. Divide both parts of the ratio by 15: $\\frac{45}{15}$ = 3 and $\\frac{60}{15}$ = 4. The simplified ratio is 3:4.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "A survey of 80 students showed that 48 of them have a sibling. What is this ratio as a percentage?",
    "correctAnswer": "60%",
    "rationale": "The fraction of students with a sibling is $\\frac{48}{80}$. This simplifies to $\\frac{6}{10}$ or $\\frac{3}{5}$. As a percentage, $\\frac{3}{5}$ is 60%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If 4 tickets to a play cost $90, what is the cost of 7 tickets?",
    "answerOptions": [
      {
        "text": "$157.50",
        "isCorrect": true,
        "rationale": "The cost per ticket is $\\frac{90}{4} = $22.50. So, 7 tickets cost 7 * $22.50 = $157.50."
      },
      {
        "text": "$135.00",
        "isCorrect": false,
        "rationale": "This is for 6 tickets."
      },
      {
        "text": "$180.00",
        "isCorrect": false,
        "rationale": "This is for 8 tickets."
      },
      {
        "text": "$22.50",
        "isCorrect": false,
        "rationale": "This is the cost of one ticket."
      }
    ],
    "rationale": "First, find the cost of one ticket: $90 / 4 = $22.50. Then, multiply by the number of tickets you want to buy: $22.50 * 7 = $157.50.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "A recipe needs a sugar to flour ratio of 2:5. You have 15 cups of flour. How much sugar do you need?",
    "answerOptions": [
      {
        "text": "6 cups",
        "isCorrect": true,
        "rationale": "The amount of flour is 3 times the ratio amount ($\\frac{15}{5}$=3). So you need 3 times the sugar (2*3=6)."
      },
      {
        "text": "7.5 cups",
        "isCorrect": false,
        "rationale": "This is $\\frac{15}{2}$."
      },
      {
        "text": "10 cups",
        "isCorrect": false,
        "rationale": "This is 15-5."
      },
      {
        "text": "37.5 cups",
        "isCorrect": false,
        "rationale": "This is 15*$\\frac{5}{2}$."
      }
    ],
    "rationale": "Set up a proportion: $\\frac{2 \\text{ sugar}}{5 \\text{ flour}} = \\frac{x \\text{ sugar}}{15 \\text{ flour}}$. Cross-multiply: $5x = 30$. Divide by 5: $x = 6$ cups of sugar.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A salesperson earns a 5% commission. If they sell a car for $22,000, what is their commission?",
    "answerOptions": [
      {
        "text": "$500",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$1100",
        "isCorrect": true,
        "rationale": "Commission = 0.05 * $22,000 = $1100."
      },
      {
        "text": "$2200",
        "isCorrect": false,
        "rationale": "This would be a 10% commission."
      },
      {
        "text": "$5500",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "To find the commission, multiply the sale price by the commission rate: 0.05 * $22,000 = $1,100.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
