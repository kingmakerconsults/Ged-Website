// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "In a box of 24 donuts, 8 are glazed. What is the ratio of glazed donuts to the total number of donuts, in simplest form?",
    "answerOptions": [
      {
        "text": "8:24",
        "isCorrect": false,
        "rationale": "This is the correct ratio but not simplified."
      },
      {
        "text": "1:3",
        "isCorrect": true,
        "rationale": "Divide both parts of the ratio 8:24 by their greatest common divisor, 8."
      },
      {
        "text": "1:2",
        "isCorrect": false,
        "rationale": "This is the ratio of glazed to non-glazed donuts."
      },
      {
        "text": "3:1",
        "isCorrect": false,
        "rationale": "This is the inverse of the simplified ratio."
      }
    ],
    "rationale": "The ratio of glazed donuts to total is 8:24. Both numbers are divisible by 8. 8/8 = 1 and 24/8 = 3. The simplified ratio is 1:3.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A computer that was originally $1200 is now on sale for $900. What is the percent decrease in price?",
    "correctAnswer": "25%",
    "rationale": "The price decreased by $1200 - $900 = $300. The percent decrease is (decrease / original price) * 100 = ($300 / $1200) * 100 = 0.25 * 100 = 25%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A cyclist travels at 15 miles per hour. How far will she travel in 2.5 hours?",
    "answerOptions": [
      {
        "text": "30 miles",
        "isCorrect": false,
        "rationale": "This is the distance for 2 hours."
      },
      {
        "text": "37.5 miles",
        "isCorrect": true,
        "rationale": "Distance = Speed * Time = 15 mph * 2.5 hours = 37.5 miles."
      },
      {
        "text": "45 miles",
        "isCorrect": false,
        "rationale": "This is the distance for 3 hours."
      },
      {
        "text": "6 miles",
        "isCorrect": false,
        "rationale": "This is the speed divided by time."
      }
    ],
    "rationale": "Use the formula Distance = Speed x Time. Distance = 15 mph * 2.5 hours = 37.5 miles.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "If 3 oranges cost $1.50, what is the cost of one orange?",
    "correctAnswer": "$0.50",
    "rationale": "To find the cost of one orange, divide the total cost by the number of oranges: $1.50 / 3 = $0.50.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A city's population grew by 5% this year. If the population last year was 80,000, what is the population now?",
    "answerOptions": [
      {
        "text": "4000",
        "isCorrect": false,
        "rationale": "This is the amount of the increase, not the new population."
      },
      {
        "text": "76,000",
        "isCorrect": false,
        "rationale": "This is the population after a 5% decrease."
      },
      {
        "text": "84,000",
        "isCorrect": true,
        "rationale": "The increase is 5% of 80,000, which is 4,000. The new population is 80,000 + 4,000 = 84,000."
      },
      {
        "text": "85,000",
        "isCorrect": false,
        "rationale": "This would be a 6.25% increase."
      }
    ],
    "rationale": "First, calculate the population increase: 5% of 80,000 is 0.05 * 80,000 = 4,000. Then, add this to the original population: 80,000 + 4,000 = 84,000.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A survey of 150 people found that 90 preferred comedies. What percentage of people preferred comedies?",
    "answerOptions": [
      {
        "text": "30%",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "60%",
        "isCorrect": true,
        "rationale": "(90 / 150) * 100 = 0.6 * 100 = 60%."
      },
      {
        "text": "75%",
        "isCorrect": false,
        "rationale": "This would be 112.5 people."
      },
      {
        "text": "90%",
        "isCorrect": false,
        "rationale": "This is the number of people, not the percentage."
      }
    ],
    "rationale": "To find the percentage, divide the number of people who preferred comedies by the total number of people surveyed, and multiply by 100: (90 / 150) * 100 = 0.6 * 100 = 60%.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A recipe requires flour and sugar in a ratio of 5:2. If you use 8 cups of flour, how much sugar do you need?",
    "correctAnswer": "3.2 cups",
    "rationale": "Set up a proportion: 5/2 = 8/x. Cross-multiply: 5x = 16. Solve for x: x = 16/5 = 3.2 cups.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Solve the proportion: $\\frac{2}{3} = \\frac{x}{12}$",
    "answerOptions": [
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is 12/3."
      },
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is 12/2."
      },
      {
        "text": "8",
        "isCorrect": true,
        "rationale": "To get from 3 to 12, you multiply by 4. So, multiply 2 by 4 to get x = 8."
      },
      {
        "text": "18",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "To solve for x, you can see that the denominator is multiplied by 4 (3 * 4 = 12). So, the numerator must also be multiplied by 4: 2 * 4 = 8.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "You pay $12 for a movie ticket that was 25% off. What was the original price?",
    "correctAnswer": "$16",
    "rationale": "If the ticket was 25% off, you paid 75% of the original price. Let P be the original price. 0.75 * P = $12. P = $12 / 0.75 = $16.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "On a school trip, there is 1 teacher for every 15 students. If there are 120 students, how many teachers are there?",
    "answerOptions": [
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "8",
        "isCorrect": true,
        "rationale": "Divide the number of students by the student-to-teacher ratio: 120 / 15 = 8."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This would be for 150 students."
      },
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is the number of students per teacher."
      }
    ],
    "rationale": "To find the number of teachers, divide the total number of students by the number of students per teacher: 120 students / 15 students/teacher = 8 teachers.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "The ratio of boys to girls in a school is 4:5. If there are 360 students in total, how many are boys?",
    "answerOptions": [
      {
        "text": "160",
        "isCorrect": true,
        "rationale": "The ratio parts are 4+5=9. 360/9 = 40. Boys = 4 * 40 = 160."
      },
      {
        "text": "180",
        "isCorrect": false,
        "rationale": "This would be if the ratio was 1:1."
      },
      {
        "text": "200",
        "isCorrect": false,
        "rationale": "This is the number of girls."
      },
      {
        "text": "288",
        "isCorrect": false,
        "rationale": "This is 4/5 of 360."
      }
    ],
    "rationale": "The total number of parts in the ratio is 4 + 5 = 9. Divide the total number of students by the total number of parts to find the value of one part: 360 / 9 = 40. The number of boys is 4 parts, so 4 * 40 = 160.",
    "challenge_tags": [
      "math-1"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A map has a scale where 2 inches represents 75 miles. How many miles does 5 inches represent?",
    "answerOptions": [
      {
        "text": "150 miles",
        "isCorrect": false,
        "rationale": "This is for 4 inches."
      },
      {
        "text": "187.5 miles",
        "isCorrect": true,
        "rationale": "The rate is 75/2 = 37.5 miles per inch. 5 inches * 37.5 miles/inch = 187.5 miles."
      },
      {
        "text": "225 miles",
        "isCorrect": false,
        "rationale": "This would be for 6 inches."
      },
      {
        "text": "375 miles",
        "isCorrect": false,
        "rationale": "This is 75*5."
      }
    ],
    "rationale": "First, find the unit rate: 75 miles / 2 inches = 37.5 miles per inch. Then, multiply by the new distance: 37.5 miles/inch * 5 inches = 187.5 miles.",
    "challenge_tags": [
      "math-1"
    ]
  }
];
