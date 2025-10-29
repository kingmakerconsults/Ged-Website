// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "A soccer team won 15 games and lost 5. What is the ratio of wins to total games played?",
    "answerOptions": [
      {
        "text": "15:5",
        "isCorrect": false,
        "rationale": "This is the ratio of wins to losses."
      },
      {
        "text": "3:1",
        "isCorrect": false,
        "rationale": "This is the simplified ratio of wins to losses."
      },
      {
        "text": "3:4",
        "isCorrect": true,
        "rationale": "Total games = 20. Ratio of wins to total is 15:20, which simplifies to 3:4."
      },
      {
        "text": "4:3",
        "isCorrect": false,
        "rationale": "This is the ratio of total games to wins."
      }
    ],
    "rationale": "The total number of games played is 15 (wins) + 5 (losses) = 20. The ratio of wins to total games is 15:20. To simplify, divide both numbers by 5. 15/5 = 3 and 20/5 = 4. The simplified ratio is 3:4."
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "You get 18 questions right on a 20-question test. What is your score as a percentage?",
    "correctAnswer": "90%",
    "rationale": "To find the percentage, divide the number of correct questions by the total number of questions and multiply by 100: (18 / 20) * 100 = 0.90 * 100 = 90%."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A company produces 3,000 items, and 90 are defective. What percentage of items are defective?",
    "answerOptions": [
      {
        "text": "3%",
        "isCorrect": true,
        "rationale": "(90 / 3000) * 100 = 0.03 * 100 = 3%."
      },
      {
        "text": "9%",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "30%",
        "isCorrect": false,
        "rationale": "This would be 900 defective items."
      },
      {
        "text": "90%",
        "isCorrect": false,
        "rationale": "This is the number of defective items."
      }
    ],
    "rationale": "To find the percentage, divide the number of defective items by the total number of items and multiply by 100: (90 / 3000) * 100 = 0.03 * 100 = 3%."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "A map has a scale of 1 inch to 50 miles. How many inches on the map represent 200 miles?",
    "correctAnswer": "4 inches",
    "rationale": "To find the map distance, divide the actual distance by the scale factor: 200 miles / 50 miles/inch = 4 inches."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A phone bill is $50 per month. With taxes and fees, the total is $54. What is the percentage of the bill that is taxes and fees?",
    "answerOptions": [
      {
        "text": "4%",
        "isCorrect": false,
        "rationale": "This is the amount of taxes and fees in dollars."
      },
      {
        "text": "8%",
        "isCorrect": true,
        "rationale": "The fees are $4. ($4 / $50) * 100 = 8%."
      },
      {
        "text": "92.6%",
        "isCorrect": false,
        "rationale": "This is the percentage of the bill that is the base cost."
      },
      {
        "text": "108%",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The amount of taxes and fees is $54 - $50 = $4. To find the percentage, divide this amount by the original bill and multiply by 100: ($4 / $50) * 100 = 0.08 * 100 = 8%."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If 1 kilogram is approximately 2.2 pounds, how many pounds is a 5-kilogram bag of flour?",
    "answerOptions": [
      {
        "text": "2.2 lbs",
        "isCorrect": false,
        "rationale": "This is the weight of 1 kg."
      },
      {
        "text": "10 lbs",
        "isCorrect": false,
        "rationale": "This is 5*2."
      },
      {
        "text": "11 lbs",
        "isCorrect": true,
        "rationale": "5 kg * 2.2 lbs/kg = 11 lbs."
      },
      {
        "text": "2.7 lbs",
        "isCorrect": false,
        "rationale": "This is 5/2.2."
      }
    ],
    "rationale": "To convert kilograms to pounds, multiply the number of kilograms by the conversion factor: 5 kg * 2.2 lbs/kg = 11 pounds."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "The ratio of fiction to non-fiction books in a library is 4:3. If there are 1200 fiction books, how many non-fiction books are there?",
    "correctAnswer": "900",
    "rationale": "Set up the proportion 4/3 = 1200/x. 4x = 3600. x = 900."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "A survey of 50 people showed 30 preferred tea and 20 preferred coffee. What is the ratio of coffee drinkers to tea drinkers?",
    "answerOptions": [
      {
        "text": "3:2",
        "isCorrect": false,
        "rationale": "This is tea to coffee."
      },
      {
        "text": "2:3",
        "isCorrect": true,
        "rationale": "The ratio is 20:30, which simplifies to 2:3."
      },
      {
        "text": "2:5",
        "isCorrect": false,
        "rationale": "This is coffee to total."
      },
      {
        "text": "3:5",
        "isCorrect": false,
        "rationale": "This is tea to total."
      }
    ],
    "rationale": "The ratio of coffee drinkers to tea drinkers is 20 to 30. To simplify, divide both numbers by their greatest common divisor, 10. The simplified ratio is 2:3."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Solve the proportion: $\\frac{7}{3} = \\frac{x}{9}$.",
    "correctAnswer": "21",
    "rationale": "To get from 3 to 9, you multiply by 3. So, multiply the numerator by 3: 7 * 3 = 21."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A car is traveling at an average speed of 55 mph. How long will it take to travel 330 miles?",
    "answerOptions": [
      {
        "text": "5 hours",
        "isCorrect": false,
        "rationale": "This would be a 275-mile trip."
      },
      {
        "text": "6 hours",
        "isCorrect": true,
        "rationale": "Time = Distance / Speed = 330 miles / 55 mph = 6 hours."
      },
      {
        "text": "7 hours",
        "isCorrect": false,
        "rationale": "This would be a 385-mile trip."
      },
      {
        "text": "385 hours",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "To find the time, divide the distance by the speed: Time = 330 miles / 55 mph = 6 hours."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The ratio of the angles in a triangle is 1:2:3. What is the measure of the largest angle?",
    "answerOptions": [
      {
        "text": "30°",
        "isCorrect": false,
        "rationale": "This is the smallest angle."
      },
      {
        "text": "60°",
        "isCorrect": false,
        "rationale": "This is the middle angle."
      },
      {
        "text": "90°",
        "isCorrect": true,
        "rationale": "The total ratio parts is 6. 180/6 = 30. The largest angle is 3 * 30 = 90."
      },
      {
        "text": "180°",
        "isCorrect": false,
        "rationale": "This is the sum of the angles."
      }
    ],
    "rationale": "The angles of a triangle sum to 180°. The ratio 1:2:3 has a total of 1+2+3=6 parts. The value of one part is 180° / 6 = 30°. The largest angle is 3 parts, so 3 * 30° = 90°."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A recipe for 4 servings requires 1.5 cups of milk. How much milk is needed for 6 servings?",
    "answerOptions": [
      {
        "text": "1.5 cups",
        "isCorrect": false,
        "rationale": "This is for 4 servings."
      },
      {
        "text": "2 cups",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "2.25 cups",
        "isCorrect": true,
        "rationale": "6 servings is 1.5 times the original recipe. 1.5 * 1.5 = 2.25."
      },
      {
        "text": "3 cups",
        "isCorrect": false,
        "rationale": "This is for 8 servings."
      }
    ],
    "rationale": "First, find the amount of milk per serving: 1.5 cups / 4 servings = 0.375 cups/serving. Then, multiply by the desired number of servings: 0.375 * 6 = 2.25 cups."
  }
];
