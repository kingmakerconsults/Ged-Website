// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "A class has 15 boys and 10 girls. What is the ratio of girls to boys?",
    "answerOptions": [
      {
        "text": "15:10",
        "isCorrect": false,
        "rationale": "This is the ratio of boys to girls."
      },
      {
        "text": "10:15",
        "isCorrect": false,
        "rationale": "This is the correct ratio but it is not simplified."
      },
      {
        "text": "2:3",
        "isCorrect": true,
        "rationale": "The ratio is 10:15, which simplifies to 2:3 by dividing both by 5."
      },
      {
        "text": "3:2",
        "isCorrect": false,
        "rationale": "This is the simplified ratio of boys to girls."
      }
    ],
    "rationale": "The ratio of girls to boys is 10 to 15, or 10:15. Simplified by dividing both numbers by 5, the ratio is 2:3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "If a car travels 180 miles in 3 hours, what is its average speed in miles per hour?",
    "correctAnswer": "60 mph",
    "rationale": "To find the unit rate (speed), divide the distance by the time: 180 miles / 3 hours = 60 miles per hour.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A recipe for 4 people requires 2 cups of flour. How much flour is needed for 10 people?",
    "answerOptions": [
      {
        "text": "4 cups",
        "isCorrect": false,
        "rationale": "This is the amount for 8 people, not 10."
      },
      {
        "text": "5 cups",
        "isCorrect": true,
        "rationale": "The ratio is 2 cups / 4 people = 0.5 cups per person. For 10 people, 10 * 0.5 = 5 cups."
      },
      {
        "text": "6 cups",
        "isCorrect": false,
        "rationale": "This overestimates the amount of flour needed."
      },
      {
        "text": "8 cups",
        "isCorrect": false,
        "rationale": "This is the amount for 16 people."
      }
    ],
    "rationale": "Set up a proportion: (2 cups / 4 people) = (x cups / 10 people). Cross-multiply to solve for x: 4x = 20, so x = 5 cups.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A map has a scale of 1 inch : 50 miles. If two cities are 3.5 inches apart on the map, how far apart are they in reality?",
    "correctAnswer": "175 miles",
    "rationale": "Multiply the map distance by the scale factor: 3.5 inches * 50 miles/inch = 175 miles.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A store owner buys a shirt for $15 and marks it up by 60%. What is the selling price?",
    "answerOptions": [
      {
        "text": "$9",
        "isCorrect": false,
        "rationale": "This is the markup amount, not the final price."
      },
      {
        "text": "$21",
        "isCorrect": false,
        "rationale": "This is a 40% markup, not 60%."
      },
      {
        "text": "$24",
        "isCorrect": true,
        "rationale": "The markup is 0.60 * $15 = $9. The selling price is $15 + $9 = $24."
      },
      {
        "text": "$30",
        "isCorrect": false,
        "rationale": "This is a 100% markup."
      }
    ],
    "rationale": "Calculate the markup amount: 60% of $15 is 0.60 * 15 = $9. Add the markup to the original cost: $15 + $9 = $24.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If 3 pounds of apples cost $4.50, what is the cost of 5 pounds of apples?",
    "answerOptions": [
      {
        "text": "$1.50",
        "isCorrect": false,
        "rationale": "This is the price per pound."
      },
      {
        "text": "$6.00",
        "isCorrect": false,
        "rationale": "This is the cost for 4 pounds."
      },
      {
        "text": "$7.50",
        "isCorrect": true,
        "rationale": "The price per pound is $4.50 / 3 = $1.50. So, 5 pounds cost 5 * $1.50 = $7.50."
      },
      {
        "text": "$9.00",
        "isCorrect": false,
        "rationale": "This is the cost for 6 pounds."
      }
    ],
    "rationale": "First, find the unit price: $4.50 / 3 pounds = $1.50 per pound. Then multiply by the desired quantity: $1.50 * 5 = $7.50.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "A team won 12 games and lost 8. What is the ratio of wins to total games played, in simplest form?",
    "correctAnswer": "3:5",
    "rationale": "The total games played is 12 + 8 = 20. The ratio of wins to total games is 12:20. Dividing both by 4 simplifies the ratio to 3:5.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A restaurant bill is $62.50. If you want to leave a 20% tip, what is the total amount you will pay?",
    "answerOptions": [
      {
        "text": "$12.50",
        "isCorrect": false,
        "rationale": "This is the amount of the tip, not the total bill."
      },
      {
        "text": "$70.00",
        "isCorrect": false,
        "rationale": "This is the result of a calculation error."
      },
      {
        "text": "$75.00",
        "isCorrect": true,
        "rationale": "The tip is 0.20 * $62.50 = $12.50. The total amount is $62.50 + $12.50 = $75.00."
      },
      {
        "text": "$82.50",
        "isCorrect": false,
        "rationale": "This is the result of a 32% tip."
      }
    ],
    "rationale": "Calculate the tip amount: 20% of $62.50 is $12.50. Add the tip to the bill: $62.50 + $12.50 = $75.00.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "Solve the proportion: $\\frac{x}{9} = \\frac{10}{15}$",
    "correctAnswer": "6",
    "rationale": "To solve for x, you can cross-multiply: 15 * x = 9 * 10, which gives 15x = 90. Divide by 15 to get x = 6. Alternatively, simplify 10/15 to 2/3 and solve x/9 = 2/3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following ratios is equivalent to 4:7?",
    "answerOptions": [
      {
        "text": "7:4",
        "isCorrect": false,
        "rationale": "This ratio is the inverse."
      },
      {
        "text": "8:12",
        "isCorrect": false,
        "rationale": "8:12 simplifies to 2:3."
      },
      {
        "text": "12:21",
        "isCorrect": true,
        "rationale": "If you multiply both parts of the ratio 4:7 by 3, you get 12:21."
      },
      {
        "text": "16:24",
        "isCorrect": false,
        "rationale": "16:24 simplifies to 2:3."
      }
    ],
    "rationale": "To find an equivalent ratio, multiply both parts of the original ratio by the same number. 4 * 3 = 12 and 7 * 3 = 21, so 12:21 is equivalent.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A company produces 5 defective light bulbs for every 1000 produced. What is the ratio of defective bulbs to total bulbs, expressed as a percentage?",
    "answerOptions": [
      {
        "text": "0.05%",
        "isCorrect": false,
        "rationale": "This is 10 times too small."
      },
      {
        "text": "0.5%",
        "isCorrect": true,
        "rationale": "The ratio is 5/1000 = 0.005. To convert to a percentage, multiply by 100, which gives 0.5%."
      },
      {
        "text": "5%",
        "isCorrect": false,
        "rationale": "This would be 50 defective bulbs per 1000."
      },
      {
        "text": "20%",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The ratio of defective to total is 5/1000. As a decimal, this is 0.005. To express this as a percentage, multiply by 100: 0.005 * 100 = 0.5%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Out of 30 students, 18 are wearing sneakers. What is the ratio of students NOT wearing sneakers to the total number of students?",
    "answerOptions": [
      {
        "text": "12:30",
        "isCorrect": false,
        "rationale": "This is the correct ratio, but it is not in simplest form."
      },
      {
        "text": "18:30",
        "isCorrect": false,
        "rationale": "This is the ratio of students wearing sneakers to the total."
      },
      {
        "text": "2:5",
        "isCorrect": true,
        "rationale": "12 students are not wearing sneakers (30-18). The ratio is 12:30, which simplifies to 2:5."
      },
      {
        "text": "3:5",
        "isCorrect": false,
        "rationale": "This is the simplified ratio of students wearing sneakers to the total."
      }
    ],
    "rationale": "First, find the number of students not wearing sneakers: 30 - 18 = 12. The ratio is 12 to 30. Divide both numbers by the greatest common divisor, 6, to simplify the ratio to 2:5.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
