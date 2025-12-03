// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "A recipe calls for 2 eggs for every 3 cups of flour. What is the ratio of eggs to flour?",
    "answerOptions": [
      {
        "text": "3:2",
        "isCorrect": false,
        "rationale": "This is the ratio of flour to eggs."
      },
      {
        "text": "2:3",
        "isCorrect": true,
        "rationale": "The ratio is 2 eggs to 3 cups of flour."
      },
      {
        "text": "2:5",
        "isCorrect": false,
        "rationale": "This is the ratio of eggs to total ingredients listed."
      },
      {
        "text": "3:5",
        "isCorrect": false,
        "rationale": "This is the ratio of flour to total ingredients listed."
      }
    ],
    "rationale": "The ratio is stated directly in the problem: 2 eggs for every 3 cups of flour, which is a ratio of 2:3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A TV is priced at $450. A 10% sales tax is added. What is the total cost?",
    "correctAnswer": "$495",
    "rationale": "Calculate the sales tax: 10% of $450 is 0.10 * 450 = $45. Add the tax to the original price: $450 + $45 = $495.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A runner travels 12 miles in 1.5 hours. What is her average speed in miles per hour?",
    "answerOptions": [
      {
        "text": "6 mph",
        "isCorrect": false,
        "rationale": "This would be for a 9-mile run."
      },
      {
        "text": "8 mph",
        "isCorrect": true,
        "rationale": "Speed = Distance / Time = 12 miles / 1.5 hours = 8 mph."
      },
      {
        "text": "10 mph",
        "isCorrect": false,
        "rationale": "This would be for a 15-mile run."
      },
      {
        "text": "18 mph",
        "isCorrect": false,
        "rationale": "This is the product of distance and time."
      }
    ],
    "rationale": "To find the speed, divide the distance traveled by the time it took: 12 miles / 1.5 hours = 8 miles per hour.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "If a box of 12 pencils costs $3, what is the cost per pencil in cents?",
    "correctAnswer": "25 cents",
    "rationale": "$3 is equal to 300 cents. The cost per pencil is 300 cents / 12 pencils = 25 cents.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A store increases the price of a $20 item by 20%, and then offers a 20% discount on the new price. What is the final price?",
    "answerOptions": [
      {
        "text": "$19.20",
        "isCorrect": true,
        "rationale": "New price: $20 * 1.20 = $24. Discounted price: $24 * 0.80 = $19.20."
      },
      {
        "text": "$20.00",
        "isCorrect": false,
        "rationale": "The discount is taken on the higher price, so the final price is lower."
      },
      {
        "text": "$20.80",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$24.00",
        "isCorrect": false,
        "rationale": "This is the price after the markup, before the discount."
      }
    ],
    "rationale": "First, the price is increased by 20%: $20 * 1.20 = $24. Then, this new price is discounted by 20%: $24 * (1 - 0.20) = $24 * 0.80 = $19.20.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Out of 500 students, 70% have a pet. How many students do NOT have a pet?",
    "answerOptions": [
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is the percentage of students who do not have a pet."
      },
      {
        "text": "150",
        "isCorrect": true,
        "rationale": "If 70% have a pet, 30% do not. 30% of 500 is 0.30 * 500 = 150."
      },
      {
        "text": "350",
        "isCorrect": false,
        "rationale": "This is the number of students who have a pet."
      },
      {
        "text": "430",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, find the percentage of students who do not have a pet: 100% - 70% = 30%. Then, calculate this number: 0.30 * 500 = 150 students.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A car's value decreased from $15,000 to $12,000. What was the percent decrease?",
    "correctAnswer": "20%",
    "rationale": "The decrease in value is $15,000 - $12,000 = $3,000. The percent decrease is (decrease / original value) * 100 = ($3,000 / $15,000) * 100 = 0.20 * 100 = 20%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which ratio is equivalent to 3:4?",
    "answerOptions": [
      {
        "text": "4:3",
        "isCorrect": false,
        "rationale": "This is the inverse ratio."
      },
      {
        "text": "6:9",
        "isCorrect": false,
        "rationale": "This simplifies to 2:3."
      },
      {
        "text": "9:12",
        "isCorrect": true,
        "rationale": "Multiply both parts of 3:4 by 3 to get 9:12."
      },
      {
        "text": "12:15",
        "isCorrect": false,
        "rationale": "This simplifies to 4:5."
      }
    ],
    "rationale": "To find an equivalent ratio, multiply both parts by the same number. 3 * 3 = 9 and 4 * 3 = 12, so 9:12 is equivalent.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "A factory produces 2 defective items for every 500 produced. What is the ratio of defective to non-defective items, in simplest form?",
    "correctAnswer": "1:249",
    "rationale": "If 2 are defective out of 500, then 498 are non-defective. The ratio is 2:498, which simplifies to 1:249 by dividing both by 2.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If a 6-foot person casts a 4-foot shadow, how long is the shadow of a 9-foot tall signpost at the same time?",
    "answerOptions": [
      {
        "text": "4 feet",
        "isCorrect": false,
        "rationale": "This is the shadow length of the person."
      },
      {
        "text": "6 feet",
        "isCorrect": true,
        "rationale": "The ratio of height to shadow is 6:4 or 3:2. So, for a 9-foot signpost, the shadow is (2/3)*9 = 6 feet."
      },
      {
        "text": "9 feet",
        "isCorrect": false,
        "rationale": "This is the height of the signpost."
      },
      {
        "text": "13.5 feet",
        "isCorrect": false,
        "rationale": "This is the height of an object that would cast a 9-foot shadow."
      }
    ],
    "rationale": "Set up a proportion of height to shadow length: $\\frac{6}{4} = \\frac{9}{x}$. Cross-multiply: $6x = 36$. Divide by 6: $x = 6$ feet.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "You get a 15% commission on all sales. If you want to earn $600 in commission, how much must you sell?",
    "answerOptions": [
      {
        "text": "$90",
        "isCorrect": false,
        "rationale": "This is 15% of $600."
      },
      {
        "text": "$4000",
        "isCorrect": true,
        "rationale": "Let S be the total sales. 0.15 * S = $600. S = $600 / 0.15 = $4000."
      },
      {
        "text": "$6000",
        "isCorrect": false,
        "rationale": "This would be a 10% commission rate."
      },
      {
        "text": "$9000",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Let S be the total sales. The commission is 15% of S, so 0.15 * S = $600. To find S, divide $600 by 0.15: S = 4000.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A company has 80 employees. 20 of them are managers. What is the ratio of managers to non-managers?",
    "answerOptions": [
      {
        "text": "1:4",
        "isCorrect": false,
        "rationale": "This is the ratio of managers to total employees."
      },
      {
        "text": "1:3",
        "isCorrect": true,
        "rationale": "There are 20 managers and 60 non-managers. The ratio is 20:60, which simplifies to 1:3."
      },
      {
        "text": "3:4",
        "isCorrect": false,
        "rationale": "This is the ratio of non-managers to total employees."
      },
      {
        "text": "3:1",
        "isCorrect": false,
        "rationale": "This is the ratio of non-managers to managers."
      }
    ],
    "rationale": "If there are 80 employees and 20 are managers, then 80 - 20 = 60 are non-managers. The ratio of managers to non-managers is 20:60. This simplifies to 1:3 by dividing both by 20.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
