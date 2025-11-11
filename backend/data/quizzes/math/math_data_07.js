// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "What is the mean of the numbers 5, 10, 15, 20?",
    "answerOptions": [
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is one of the numbers."
      },
      {
        "text": "12.5",
        "isCorrect": true,
        "rationale": "The sum is 50. 50/4 = 12.5."
      },
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is the median."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is the maximum value."
      }
    ],
    "rationale": "To find the mean, add the numbers together (5 + 10 + 15 + 20 = 50) and divide by the number of values (4). 50 / 4 = 12.5.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "A spinner has 8 equal sections, 3 of which are blue. What is the probability of landing on blue?",
    "correctAnswer": "3/8",
    "rationale": "The probability is the number of favorable outcomes (3 blue sections) divided by the total number of outcomes (8 sections).",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the median of the following numbers: 19, 12, 16, 19, 24.",
    "answerOptions": [
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "This is one of the numbers."
      },
      {
        "text": "18",
        "isCorrect": false,
        "rationale": "This is the mean."
      },
      {
        "text": "19",
        "isCorrect": true,
        "rationale": "First, order the numbers: 12, 16, 19, 19, 24. The median is the middle number, 19."
      },
      {
        "text": "24",
        "isCorrect": false,
        "rationale": "This is the maximum value."
      }
    ],
    "rationale": "First, order the numbers from least to greatest: 12, 16, 19, 19, 24. The median is the middle value in the ordered set, which is 19.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the mode of the data set: 10, 20, 10, 30, 20, 10?",
    "correctAnswer": "10",
    "rationale": "The mode is the value that appears most frequently. The number 10 appears 3 times, which is more than any other number.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Find the range of the temperatures: 34, 45, 29, 38, 31.",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "11",
        "isCorrect": false,
        "rationale": "This is the difference between 45 and 34."
      },
      {
        "text": "16",
        "isCorrect": true,
        "rationale": "The range is the difference between the highest (45) and the lowest (29) values."
      },
      {
        "text": "35.4",
        "isCorrect": false,
        "rationale": "This is the mean."
      }
    ],
    "rationale": "The range is the difference between the maximum and minimum values. Max = 45, Min = 29. Range = 45 - 29 = 16.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A library has 2000 books. 40% are fiction, 30% are non-fiction, and the rest are reference. How many books are reference books?",
    "answerOptions": [
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is the percentage."
      },
      {
        "text": "600",
        "isCorrect": true,
        "rationale": "The percentage of reference books is 100% - 40% - 30% = 30%. 30% of 2000 is 0.30 * 2000 = 600."
      },
      {
        "text": "700",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "800",
        "isCorrect": false,
        "rationale": "This is the number of fiction books."
      }
    ],
    "rationale": "First, find the percentage of reference books: 100% - 40% - 30% = 30%. Then, calculate the number of reference books: 0.30 * 2000 = 600.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A car is chosen at random from a lot containing 15 red cars, 20 blue cars, and 10 green cars. What is the probability that the car is NOT red?",
    "correctAnswer": "2/3",
    "rationale": "There are 30 non-red cars (20 blue + 10 green) and a total of 45 cars. The probability is 30/45, which simplifies to 2/3.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If you roll a die, which of the following is an impossible event?",
    "answerOptions": [
      {
        "text": "Rolling a 7",
        "isCorrect": true,
        "rationale": "A standard die is numbered 1 through 6."
      },
      {
        "text": "Rolling an even number",
        "isCorrect": false,
        "rationale": "2, 4, 6 are even."
      },
      {
        "text": "Rolling a prime number",
        "isCorrect": false,
        "rationale": "2, 3, 5 are prime."
      },
      {
        "text": "Rolling a number greater than 1",
        "isCorrect": false,
        "rationale": "2, 3, 4, 5, 6 are all greater than 1."
      }
    ],
    "rationale": "A standard die has faces numbered 1, 2, 3, 4, 5, and 6. It is impossible to roll a 7.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the median of the data set: 10, 8, 12, 10, 14, 16.",
    "correctAnswer": "11",
    "rationale": "Order the data: 8, 10, 10, 12, 14, 16. The median is the average of the two middle numbers: (10 + 12) / 2 = 11.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A student's average score on 4 tests is 88. What must they score on the 5th test to have an average of 90?",
    "answerOptions": [
      {
        "text": "90",
        "isCorrect": false,
        "rationale": "This would not raise the average."
      },
      {
        "text": "92",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "98",
        "isCorrect": true,
        "rationale": "Total for 4 tests: 4*88=352. Desired total for 5 tests: 5*90=450. Score needed: 450-352=98."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This would raise the average to 90.4"
      }
    ],
    "rationale": "The total points for the first 4 tests are 4 * 88 = 352. To have an average of 90 on 5 tests, the total points needed are 5 * 90 = 450. The score needed on the fifth test is 450 - 352 = 98.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "You have 3 shirts and 4 pairs of pants. How many different outfits can you make?",
    "answerOptions": [
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is the sum of the choices."
      },
      {
        "text": "12",
        "isCorrect": true,
        "rationale": "Multiply the number of shirts by the number of pants: 3 * 4 = 12."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "24",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "This is a counting principle problem. The total number of outfits is the product of the number of choices for each item of clothing: 3 shirts * 4 pants = 12 outfits.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A survey found that 2 out of 3 people prefer dogs. If 30 people were surveyed, how many prefer dogs?",
    "answerOptions": [
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is the number of people who do not prefer dogs."
      },
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This would be if 1 out of 2 people preferred dogs."
      },
      {
        "text": "20",
        "isCorrect": true,
        "rationale": "2/3 of 30 is (2/3) * 30 = 60/3 = 20."
      },
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is the total number of people surveyed."
      }
    ],
    "rationale": "To find the number of people who prefer dogs, multiply the fraction by the total number of people: $\\frac{2}{3} \\times 30 = 20$ people.",
    "challenge_tags": [
      "math-6"
    ]
  }
];
