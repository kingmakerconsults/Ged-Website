module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "Find the mode of the data set: 1, 3, 5, 3, 1, 3, 4.",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "1 appears twice, but 3 appears more often."
      },
      {
        "text": "3",
        "isCorrect": true,
        "rationale": "The number 3 appears most frequently (3 times)."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "5 appears only once."
      },
      {
        "text": "2.86",
        "isCorrect": false,
        "rationale": "This is the mean."
      }
    ],
    "rationale": "The mode is the value that appears most often in a data set. In this set, 3 appears three times, which is more than any other number.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "easy",
    "question": "A card is drawn from a standard 52-card deck. What is the probability that the card is a spade?",
    "correctAnswer": "$\\frac{1}{4}$",
    "rationale": "There are 13 spades in a 52-card deck. The probability is $\\frac{13}{52}$, which simplifies to $\\frac{1}{4}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the mean of the numbers: 20, 30, 40, 50, 60.",
    "answerOptions": [
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is one of the numbers."
      },
      {
        "text": "40",
        "isCorrect": true,
        "rationale": "The sum is 200. $\\frac{200}{5}$ = 40. Since the numbers are evenly spaced, the mean is the middle number."
      },
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This is one of the numbers."
      },
      {
        "text": "200",
        "isCorrect": false,
        "rationale": "This is the sum."
      }
    ],
    "rationale": "To find the mean, add the numbers (20+30+40+50+60 = 200) and divide by the count of the numbers (5). 200 / 5 = 40.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the median of the data set: 5, 2, 8, 4, 9, 2?",
    "correctAnswer": "4.5",
    "rationale": "Order the data: 2, 2, 4, 5, 8, 9. The median is the average of the two middle numbers: (4 + 5) / 2 = 4.5.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A bag has 4 green marbles, 3 red marbles, and 5 blue marbles. What is the probability of drawing a red OR a green marble?",
    "answerOptions": [
      {
        "text": "$\\frac{1}{4}$",
        "isCorrect": false,
        "rationale": "This is the probability of red."
      },
      {
        "text": "$\\frac{1}{3}$",
        "isCorrect": false,
        "rationale": "This is the probability of green."
      },
      {
        "text": "$\\frac{7}{12}$",
        "isCorrect": true,
        "rationale": "There are 7 red or green marbles out of a total of 12. The probability is $\\frac{7}{12}$."
      },
      {
        "text": "$\\frac{5}{12}$",
        "isCorrect": false,
        "rationale": "This is the probability of blue."
      }
    ],
    "rationale": "There are a total of 4 + 3 + 5 = 12 marbles. The number of red or green marbles is 4 + 3 = 7. So, the probability is $\\frac{7}{12}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A license plate consists of 3 letters followed by 3 numbers. How many different license plates are possible if repetition is allowed?",
    "answerOptions": [
      {
        "text": "17,576,000",
        "isCorrect": true,
        "rationale": "26 choices for each of the 3 letters (26Â³) and 10 choices for each of the 3 numbers (10Â³). Total = 26Â³ * 10Â³ = 17,576,000."
      },
      {
        "text": "1,757,600",
        "isCorrect": false,
        "rationale": "This is off by a factor of 10."
      },
      {
        "text": "11,232,000",
        "isCorrect": false,
        "rationale": "This is for no repetition."
      },
      {
        "text": "36",
        "isCorrect": false,
        "rationale": "This is 26+10."
      }
    ],
    "rationale": "There are 26 choices for each of the 3 letter positions and 10 choices for each of the 3 number positions. The total number of combinations is 26 * 26 * 26 * 10 * 10 * 10 = 17,576,000.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "The mean of a set of 5 numbers is 70. If a 6th number is added and the new mean is 75, what is the 6th number?",
    "correctAnswer": "100",
    "rationale": "The sum of the first 5 numbers is 5 * 70 = 350. The sum of the 6 numbers must be 6 * 75 = 450. The 6th number is 450 - 350 = 100.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the range of the data set: 10, 10, 10, 10, 10?",
    "answerOptions": [
      {
        "text": "0",
        "isCorrect": true,
        "rationale": "The range is the difference between the max and min values. Here, they are the same, so the range is 0."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is the value of all the numbers."
      },
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This is the sum."
      }
    ],
    "rationale": "The range is the difference between the maximum and minimum values. Since all the numbers are 10, the range is 10 - 10 = 0.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A coin is flipped 3 times. What is the probability of getting tails all 3 times?",
    "correctAnswer": "$\\frac{1}{8}$",
    "rationale": "The probability of tails on one flip is $\\frac{1}{2}$. For 3 flips, the probability is ($\\frac{1}{2}$) * ($\\frac{1}{2}$) * ($\\frac{1}{2}$) = $\\frac{1}{8}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A student has scores of 70, 75, and 80. What is the lowest score they can get on the 4th test to have at least an average of 80?",
    "answerOptions": [
      {
        "text": "80",
        "isCorrect": false,
        "rationale": "This would give an average of 78.75"
      },
      {
        "text": "90",
        "isCorrect": false,
        "rationale": "This would give an average of 78.75"
      },
      {
        "text": "95",
        "isCorrect": true,
        "rationale": "To average 80 on 4 tests, the total must be 320. The current sum is 225. 320-225=95."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This would give an average of 81.25"
      }
    ],
    "rationale": "To have an average of at least 80 on 4 tests, the total score must be at least 4 * 80 = 320. The sum of the first three scores is 70 + 75 + 80 = 225. The fourth score must be at least 320 - 225 = 95.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "A committee of 3 is to be selected from a group of 10 people. This is an example of a:",
    "answerOptions": [
      {
        "text": "Permutation",
        "isCorrect": false,
        "rationale": "A permutation is an arrangement where order matters."
      },
      {
        "text": "Combination",
        "isCorrect": true,
        "rationale": "A combination is a selection where order does not matter."
      },
      {
        "text": "Probability",
        "isCorrect": false,
        "rationale": "Probability is the chance of an event occurring."
      },
      {
        "text": "Statistic",
        "isCorrect": false,
        "rationale": "A statistic is a piece of data from a study."
      }
    ],
    "rationale": "Since the order in which the people are selected for the committee does not matter, this is a combination problem.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If there is a 20% chance of rain, what are the odds against rain?",
    "answerOptions": [
      {
        "text": "1 to 4",
        "isCorrect": false,
        "rationale": "These are the odds in favor of rain."
      },
      {
        "text": "4 to 1",
        "isCorrect": true,
        "rationale": "The probability of no rain is 80%. The odds are P(no rain) to P(rain), which is 80:20 or 4:1."
      },
      {
        "text": "1 to 5",
        "isCorrect": false,
        "rationale": "This relates probability to total outcomes."
      },
      {
        "text": "5 to 1",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "A 20% chance of rain means the probability is 0.20 or $\\frac{1}{5}$. The probability of no rain is 80% or $\\frac{4}{5}$. The odds against rain are the ratio of the probability of no rain to the probability of rain, which is ($\\frac{4}{5}$) to ($\\frac{1}{5}$), or 4 to 1.",
    "challenge_tags": [
      "math-6"
    ]
  }
];
