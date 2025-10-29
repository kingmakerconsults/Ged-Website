// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "A bag contains 5 red balls and 7 blue balls. What is the ratio of red balls to the total number of balls?",
    "answerOptions": [
      {
        "text": "5:7",
        "isCorrect": false,
        "rationale": "This is the ratio of red to blue balls."
      },
      {
        "text": "7:5",
        "isCorrect": false,
        "rationale": "This is the ratio of blue to red balls."
      },
      {
        "text": "5:12",
        "isCorrect": true,
        "rationale": "There are 5 red balls and a total of 12 balls (5+7)."
      },
      {
        "text": "7:12",
        "isCorrect": false,
        "rationale": "This is the ratio of blue balls to the total."
      }
    ],
    "rationale": "The total number of balls is 5 (red) + 7 (blue) = 12. The ratio of red balls to the total is 5:12."
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A store has a 20% off sale. If a shirt is originally $35, what is the amount of the discount?",
    "correctAnswer": "$7",
    "rationale": "To find the discount amount, multiply the original price by the discount percentage: $35 * 0.20 = $7."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A car can travel 400 miles on 16 gallons of gas. What is the car's fuel efficiency in miles per gallon (mpg)?",
    "answerOptions": [
      {
        "text": "20 mpg",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "25 mpg",
        "isCorrect": true,
        "rationale": "Fuel efficiency = 400 miles / 16 gallons = 25 mpg."
      },
      {
        "text": "30 mpg",
        "isCorrect": false,
        "rationale": "This would be for a 480-mile trip."
      },
      {
        "text": "40 mpg",
        "isCorrect": false,
        "rationale": "This would be for a 640-mile trip."
      }
    ],
    "rationale": "To find the fuel efficiency, divide the total miles traveled by the number of gallons used: 400 miles / 16 gallons = 25 mpg."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "A recipe uses 3 eggs for every 24 cookies. How many eggs are needed for 48 cookies?",
    "correctAnswer": "6 eggs",
    "rationale": "48 cookies is double the original recipe, so you need double the number of eggs: 3 eggs * 2 = 6 eggs."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A population of 1200 increases by 10% in one year. What is the population after the increase?",
    "answerOptions": [
      {
        "text": "120",
        "isCorrect": false,
        "rationale": "This is the amount of the increase."
      },
      {
        "text": "1320",
        "isCorrect": true,
        "rationale": "The increase is 10% of 1200, which is 120. The new population is 1200 + 120 = 1320."
      },
      {
        "text": "1210",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "1080",
        "isCorrect": false,
        "rationale": "This is a 10% decrease."
      }
    ],
    "rationale": "First, calculate the population increase: 10% of 1200 is 0.10 * 1200 = 120. Then, add this to the original population: 1200 + 120 = 1320."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If 5 pounds of potatoes cost $3.00, what is the cost of 8 pounds of potatoes?",
    "answerOptions": [
      {
        "text": "$0.60",
        "isCorrect": false,
        "rationale": "This is the cost per pound."
      },
      {
        "text": "$4.80",
        "isCorrect": true,
        "rationale": "The cost per pound is $3.00/5 = $0.60. So, 8 pounds cost 8 * $0.60 = $4.80."
      },
      {
        "text": "$5.00",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$24.00",
        "isCorrect": false,
        "rationale": "This is 8*3."
      }
    ],
    "rationale": "First, find the price per pound: $3.00 / 5 pounds = $0.60 per pound. Then, multiply by the desired weight: $0.60 * 8 = $4.80."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A survey of 400 people found that 60% prefer brand X. How many people prefer a different brand?",
    "correctAnswer": "160",
    "rationale": "If 60% prefer brand X, then 40% prefer a different brand. 40% of 400 is 0.40 * 400 = 160."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Solve the proportion: $\\frac{4}{5} = \\frac{20}{x}$.",
    "answerOptions": [
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "This is 4*4."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is the numerator."
      },
      {
        "text": "25",
        "isCorrect": true,
        "rationale": "The numerator is multiplied by 5 (4*5=20), so multiply the denominator by 5: 5*5=25."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This is 20*5."
      }
    ],
    "rationale": "To get from 4 to 20 in the numerator, you multiply by 5. Therefore, you must also multiply the denominator by 5: 5 * 5 = 25."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "The ratio of teachers to students in a school is 1:25. If there are 20 teachers, how many students are there?",
    "correctAnswer": "500 students",
    "rationale": "Set up the proportion 1/25 = 20/x. Cross-multiply to find x = 20 * 25 = 500."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "In a class, 18 out of 30 students passed an exam. What percentage of students passed?",
    "answerOptions": [
      {
        "text": "18%",
        "isCorrect": false,
        "rationale": "This is the number of students who passed."
      },
      {
        "text": "30%",
        "isCorrect": false,
        "rationale": "This is the total number of students."
      },
      {
        "text": "60%",
        "isCorrect": true,
        "rationale": "(18 / 30) * 100 = 0.6 * 100 = 60%."
      },
      {
        "text": "82%",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "To find the percentage, divide the number of students who passed by the total number of students and multiply by 100: (18 / 30) * 100 = 0.6 * 100 = 60%."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The ratio of two supplementary angles is 2:3. What is the measure of the larger angle?",
    "answerOptions": [
      {
        "text": "36°",
        "isCorrect": false,
        "rationale": "This is the result for one part of the ratio."
      },
      {
        "text": "72°",
        "isCorrect": false,
        "rationale": "This is the measure of the smaller angle."
      },
      {
        "text": "108°",
        "isCorrect": true,
        "rationale": "The total ratio parts is 5. 180/5 = 36. The larger angle is 3 * 36 = 108."
      },
      {
        "text": "180°",
        "isCorrect": false,
        "rationale": "This is the total measure."
      }
    ],
    "rationale": "Supplementary angles add up to 180°. The ratio 2:3 has a total of 5 parts. Divide 180° by 5 to find the value of one part: 180 / 5 = 36°. The larger angle is 3 parts, so 3 * 36° = 108°."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "If a person works 8 hours and earns $120, what is their hourly wage?",
    "answerOptions": [
      {
        "text": "$12/hour",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "$15/hour",
        "isCorrect": true,
        "rationale": "Wage = $120 / 8 hours = $15/hour."
      },
      {
        "text": "$20/hour",
        "isCorrect": false,
        "rationale": "This would be for 6 hours."
      },
      {
        "text": "$960/hour",
        "isCorrect": false,
        "rationale": "This is the product."
      }
    ],
    "rationale": "To find the hourly wage, divide the total earnings by the number of hours worked: $120 / 8 hours = $15 per hour."
  }
];
