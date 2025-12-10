module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "In a parking lot, there are 12 cars and 8 trucks. What is the ratio of trucks to cars in simplest form?",
    "answerOptions": [
      {
        "text": "12:8",
        "isCorrect": false,
        "rationale": "This is the ratio of cars to trucks."
      },
      {
        "text": "3:2",
        "isCorrect": false,
        "rationale": "This is the simplified ratio of cars to trucks."
      },
      {
        "text": "2:3",
        "isCorrect": true,
        "rationale": "The ratio is 8:12, which simplifies to 2:3 by dividing both by 4."
      },
      {
        "text": "8:20",
        "isCorrect": false,
        "rationale": "This is the ratio of trucks to total vehicles."
      }
    ],
    "rationale": "The ratio of trucks to cars is 8 to 12. To simplify, find the greatest common divisor, which is 4. Divide both parts of the ratio by 4: $\\frac{8}{4}$ = 2 and $\\frac{12}{4}$ = 3. The simplified ratio is 2:3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A product's price increased by 8%. If the original price was $75, what is the new price?",
    "correctAnswer": "$81",
    "rationale": "The price increase is 8% of $75, which is 0.08 * 75 = $6. The new price is the original price plus the increase: $75 + $6 = $81.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If a printer can print 240 pages in 8 minutes, what is its printing rate in pages per minute?",
    "answerOptions": [
      {
        "text": "20 ppm",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "30 ppm",
        "isCorrect": true,
        "rationale": "Rate = 240 pages / 8 minutes = 30 pages per minute."
      },
      {
        "text": "40 ppm",
        "isCorrect": false,
        "rationale": "This would be for 6 minutes."
      },
      {
        "text": "1920 ppm",
        "isCorrect": false,
        "rationale": "This is the product."
      }
    ],
    "rationale": "To find the rate in pages per minute (ppm), divide the total number of pages by the time in minutes: 240 pages / 8 minutes = 30 ppm.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "easy",
    "question": "A recipe requires a 3:2 ratio of flour to sugar. If you use 6 cups of sugar, how much flour do you need?",
    "correctAnswer": "9 cups",
    "rationale": "The amount of sugar is 3 times the ratio amount ($\\frac{6}{2}$=3). So you need 3 times the flour (3*3=9).",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A customer pays a total of $52.50 for an item, which includes a 5% sales tax. What was the original price of the item?",
    "answerOptions": [
      {
        "text": "$49.88",
        "isCorrect": false,
        "rationale": "This is the result of subtracting 5% of $52.50."
      },
      {
        "text": "$50.00",
        "isCorrect": true,
        "rationale": "Let P be the original price. P * 1.05 = $52.50. P = $52.50 / 1.05 = $50."
      },
      {
        "text": "$51.98",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$55.13",
        "isCorrect": false,
        "rationale": "This is the price after adding another 5% tax."
      }
    ],
    "rationale": "Let P be the original price. The total cost is P + 0.05P = 1.05P. So, 1.05P = $52.50. To find P, divide $52.50 by 1.05: P = $50.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A company has 1200 employees. If 35% of them work in production, how many employees work in production?",
    "answerOptions": [
      {
        "text": "35",
        "isCorrect": false,
        "rationale": "This is the percentage."
      },
      {
        "text": "420",
        "isCorrect": true,
        "rationale": "35% of 1200 is 0.35 * 1200 = 420."
      },
      {
        "text": "780",
        "isCorrect": false,
        "rationale": "This is the number of employees not in production."
      },
      {
        "text": "1235",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "To find the number of employees in production, convert the percentage to a decimal and multiply by the total number of employees: 0.35 * 1200 = 420.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "The ratio of cats to dogs at a shelter is 3:7. If there are 90 animals in total, how many are dogs?",
    "correctAnswer": "63",
    "rationale": "The total ratio parts are 3+7=10. Each part represents $\\frac{90}{10}$ = 9 animals. There are 7 parts dogs, so 7 * 9 = 63 dogs.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Solve the proportion: $\\frac{x}{4} = \\frac{9}{12}$.",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "3",
        "isCorrect": true,
        "rationale": "Simplify $\\frac{9}{12}$ to $\\frac{3}{4}$. So x/4 = $\\frac{3}{4}$, which means x=3."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is the denominator."
      },
      {
        "text": "36",
        "isCorrect": false,
        "rationale": "This is 9*4."
      }
    ],
    "rationale": "The fraction $\\frac{9}{12}$ can be simplified to $\\frac{3}{4}$. The proportion is then x/4 = $\\frac{3}{4}$, which means x must be 3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A painter can paint 3 rooms in 5 hours. At this rate, how many hours will it take to paint 12 rooms?",
    "correctAnswer": "20 hours",
    "rationale": "To paint 12 rooms, the painter needs to work 4 times as long as for 3 rooms ($\\frac{12}{3}$=4). So, 5 hours * 4 = 20 hours.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A survey of 60 people showed that 45 of them prefer coffee. What percentage of people prefer coffee?",
    "answerOptions": [
      {
        "text": "45%",
        "isCorrect": false,
        "rationale": "This is the number of people."
      },
      {
        "text": "60%",
        "isCorrect": false,
        "rationale": "This is the total number of people."
      },
      {
        "text": "75%",
        "isCorrect": true,
        "rationale": "(45 / 60) * 100 = 0.75 * 100 = 75%."
      },
      {
        "text": "25%",
        "isCorrect": false,
        "rationale": "This is the percentage that do not prefer coffee."
      }
    ],
    "rationale": "To find the percentage, divide the number of people who prefer coffee by the total number surveyed, and multiply by 100: (45 / 60) * 100 = 0.75 * 100 = 75%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The ratio of two numbers is 5:8. If the smaller number is 30, what is the larger number?",
    "answerOptions": [
      {
        "text": "40",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "48",
        "isCorrect": true,
        "rationale": "The ratio is 5:8. The smaller part (5) is 30, so the multiplier is $\\frac{30}{5}$=6. The larger number is 8*6=48."
      },
      {
        "text": "64",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is the smaller number."
      }
    ],
    "rationale": "Set up a proportion: $\\frac{5}{8} = \\frac{30}{x}$. Cross-multiply: $5x = 240$. Divide by 5: $x = 48$.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A car's gas tank holds 15 gallons. If the car gets 30 miles per gallon, how far can it travel on a full tank?",
    "answerOptions": [
      {
        "text": "2 miles",
        "isCorrect": false,
        "rationale": "This is $\\frac{30}{15}$."
      },
      {
        "text": "300 miles",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "450 miles",
        "isCorrect": true,
        "rationale": "Distance = 15 gallons * 30 miles/gallon = 450 miles."
      },
      {
        "text": "500 miles",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "To find the total distance, multiply the tank capacity by the fuel efficiency: 15 gallons * 30 miles/gallon = 450 miles.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
