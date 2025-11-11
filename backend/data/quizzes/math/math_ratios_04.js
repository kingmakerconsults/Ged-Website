// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "A basketball team has a win-loss ratio of 5:3. If they played 24 games, how many games did they win?",
    "answerOptions": [
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is the number of losses multiplied by a factor of 1."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is the number of losses."
      },
      {
        "text": "15",
        "isCorrect": true,
        "rationale": "The ratio parts are 5+3=8. The factor is 24/8=3. So, wins are 5*3=15."
      },
      {
        "text": "21",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The ratio of wins to losses is 5:3, which means for every 8 games played (5+3), 5 are wins. Since they played 24 games (which is 8 * 3), they won 5 * 3 = 15 games.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A shirt that costs $40 is on sale for 15% off. What is the sale price?",
    "correctAnswer": "$34",
    "rationale": "First, calculate the discount: 15% of $40 is 0.15 * 40 = $6. Then, subtract the discount from the original price: $40 - $6 = $34.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "The price of a gallon of gas increased from $3.00 to $3.60. What was the percent increase?",
    "answerOptions": [
      {
        "text": "15%",
        "isCorrect": false,
        "rationale": "This would be a $0.45 increase."
      },
      {
        "text": "20%",
        "isCorrect": true,
        "rationale": "The increase was $0.60. The percent increase is (0.60 / 3.00) * 100 = 20%."
      },
      {
        "text": "25%",
        "isCorrect": false,
        "rationale": "This would be a $0.75 increase."
      },
      {
        "text": "60%",
        "isCorrect": false,
        "rationale": "This is the increase in cents."
      }
    ],
    "rationale": "The increase in price is $3.60 - $3.00 = $0.60. The percent increase is (increase / original price) * 100 = ($0.60 / $3.00) * 100 = 0.20 * 100 = 20%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "A map scale is 1 inch : 25 miles. If the distance on the map is 4 inches, what is the actual distance?",
    "correctAnswer": "100 miles",
    "rationale": "Multiply the map distance by the scale factor: 4 inches * 25 miles/inch = 100 miles.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A car is traveling at 50 miles per hour. How many minutes does it take to travel 30 miles?",
    "answerOptions": [
      {
        "text": "30 minutes",
        "isCorrect": false,
        "rationale": "This would be the time for a 25-mile trip."
      },
      {
        "text": "36 minutes",
        "isCorrect": true,
        "rationale": "Time = Distance / Speed = 30 miles / 50 mph = 0.6 hours. To convert to minutes, 0.6 * 60 = 36 minutes."
      },
      {
        "text": "40 minutes",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "1.67 minutes",
        "isCorrect": false,
        "rationale": "This is the result of dividing speed by distance."
      }
    ],
    "rationale": "Time = Distance / Speed. Time = 30 miles / 50 mph = 0.6 hours. To convert hours to minutes, multiply by 60: 0.6 * 60 = 36 minutes.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If 8 out of 20 students in a class have brown eyes, what percentage of students have brown eyes?",
    "answerOptions": [
      {
        "text": "20%",
        "isCorrect": false,
        "rationale": "This is the number of students."
      },
      {
        "text": "30%",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "40%",
        "isCorrect": true,
        "rationale": "The fraction is 8/20, which is equal to 4/10 or 0.4. As a percentage, this is 40%."
      },
      {
        "text": "50%",
        "isCorrect": false,
        "rationale": "This would be 10 out of 20 students."
      }
    ],
    "rationale": "To find the percentage, divide the number of students with brown eyes by the total number of students and multiply by 100: (8 / 20) * 100 = 0.4 * 100 = 40%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A meal costs $50. You leave a tip of $8. What percentage tip did you leave?",
    "correctAnswer": "16%",
    "rationale": "To find the percentage, divide the tip amount by the cost of the meal and multiply by 100: ($8 / $50) * 100 = 0.16 * 100 = 16%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "There are 10 pens and 15 pencils in a jar. What is the ratio of pencils to total items?",
    "answerOptions": [
      {
        "text": "10:15",
        "isCorrect": false,
        "rationale": "This is the ratio of pens to pencils."
      },
      {
        "text": "15:25",
        "isCorrect": false,
        "rationale": "This is the correct ratio but it's not simplified."
      },
      {
        "text": "2:3",
        "isCorrect": false,
        "rationale": "This is the simplified ratio of pens to pencils."
      },
      {
        "text": "3:5",
        "isCorrect": true,
        "rationale": "There are 15 pencils and 25 total items (10+15). The ratio is 15:25, which simplifies to 3:5."
      }
    ],
    "rationale": "The total number of items is 10 + 15 = 25. The ratio of pencils to total items is 15:25. Divide both numbers by 5 to simplify to 3:5.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "Solve the proportion: $\\frac{6}{x} = \\frac{18}{24}$",
    "correctAnswer": "8",
    "rationale": "Simplify the fraction 18/24 to 3/4. So, 6/x = 3/4. Cross-multiply: 3x = 24. Solve for x: x = 8.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A recipe for 12 muffins requires 2 cups of flour. How many cups of flour are needed for 18 muffins?",
    "answerOptions": [
      {
        "text": "2.5 cups",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "3 cups",
        "isCorrect": true,
        "rationale": "18 muffins is 1.5 times the original recipe. So, you need 1.5 * 2 = 3 cups of flour."
      },
      {
        "text": "4 cups",
        "isCorrect": false,
        "rationale": "This would be for 24 muffins."
      },
      {
        "text": "6 cups",
        "isCorrect": false,
        "rationale": "This would be for 36 muffins."
      }
    ],
    "rationale": "Set up a proportion: $\\frac{12 \\text{ muffins}}{2 \\text{ cups}} = \\frac{18 \\text{ muffins}}{x \\text{ cups}}$. Cross-multiply: $12x = 36$. Divide by 12: $x = 3$ cups.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "If a company has 200 employees and 45% are male, how many female employees are there?",
    "answerOptions": [
      {
        "text": "55",
        "isCorrect": false,
        "rationale": "This is the percentage of female employees."
      },
      {
        "text": "90",
        "isCorrect": false,
        "rationale": "This is the number of male employees."
      },
      {
        "text": "110",
        "isCorrect": true,
        "rationale": "If 45% are male, 55% are female. 55% of 200 is 0.55 * 200 = 110."
      },
      {
        "text": "155",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "First, find the percentage of female employees: 100% - 45% = 55%. Then, calculate the number of female employees: 0.55 * 200 = 110.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A model car is built with a scale of 1:18. If the model is 10 inches long, how long is the actual car in inches?",
    "answerOptions": [
      {
        "text": "1.8 inches",
        "isCorrect": false,
        "rationale": "This is the result of dividing by 10."
      },
      {
        "text": "28 inches",
        "isCorrect": false,
        "rationale": "This is 10+18."
      },
      {
        "text": "180 inches",
        "isCorrect": true,
        "rationale": "The actual car is 18 times longer than the model. 10 inches * 18 = 180 inches."
      },
      {
        "text": "1800 inches",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The scale 1:18 means the actual car is 18 times larger than the model. So, the actual length is 10 inches * 18 = 180 inches.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
