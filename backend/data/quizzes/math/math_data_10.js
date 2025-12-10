module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "Find the mean of the numbers: 2, 4, 6, 8, 10.",
    "answerOptions": [
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This is one of the numbers."
      },
      {
        "text": "6",
        "isCorrect": true,
        "rationale": "The sum is 30. $\\frac{30}{5}$ = 6. Since the numbers are evenly spaced, the mean is the middle number."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is one of the numbers."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is the maximum value."
      }
    ],
    "rationale": "To find the mean, add the numbers together (2+4+6+8+10 = 30) and divide by the number of values (5). 30 / 5 = 6.",
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
    "question": "What is the mode of the data set: cat, dog, dog, fish, cat, dog?",
    "correctAnswer": "dog",
    "rationale": "The mode is the value that appears most frequently. 'Dog' appears 3 times, more than any other animal.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the median of the data set: 11, 22, 11, 33, 44, 11?",
    "answerOptions": [
      {
        "text": "11",
        "isCorrect": false,
        "rationale": "This is the mode."
      },
      {
        "text": "16.5",
        "isCorrect": true,
        "rationale": "Order the data: 11, 11, 11, 22, 33, 44. The median is the average of the two middle numbers: (11+22)/2 = 16.5."
      },
      {
        "text": "22",
        "isCorrect": false,
        "rationale": "This is one of the middle numbers."
      },
      {
        "text": "22.83",
        "isCorrect": false,
        "rationale": "This is the mean."
      }
    ],
    "rationale": "First, order the numbers: 11, 11, 11, 22, 33, 44. Since there is an even number of values, the median is the average of the two middle numbers (11 and 22). (11 + 22) / 2 = 16.5.",
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
    "question": "A spinner has 10 equal sections, numbered 1 to 10. What is the probability of spinning a prime number?",
    "correctAnswer": "$\\frac{2}{5}$",
    "rationale": "The prime numbers between 1 and 10 are 2, 3, 5, and 7. There are 4 prime numbers out of 10 total. The probability is $\\frac{4}{10}$, which simplifies to $\\frac{2}{5}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Find the range of the data set: 50, 40, 60, 30, 70.",
    "answerOptions": [
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is the minimum value."
      },
      {
        "text": "40",
        "isCorrect": true,
        "rationale": "The range is the difference between the max (70) and min (30) values."
      },
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This is the mean and median."
      }
    ],
    "rationale": "The range is the difference between the highest and lowest values in the dataset. The highest value is 70 and the lowest is 30. Range = 70 - 30 = 40.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A student's scores are 85, 90, and 95. What do they need to score on their fourth test to have a mean score of 90?",
    "answerOptions": [
      {
        "text": "85",
        "isCorrect": false,
        "rationale": "This would result in a mean of 88.75."
      },
      {
        "text": "90",
        "isCorrect": true,
        "rationale": "To average 90 on 4 tests, the total must be 360. The current sum is 270. 360-270=90."
      },
      {
        "text": "95",
        "isCorrect": false,
        "rationale": "This would result in a mean of 91.25."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This would result in a mean of 92.5."
      }
    ],
    "rationale": "To have an average of 90 on 4 tests, the total score must be 4 * 90 = 360. The sum of the first three scores is 85 + 90 + 95 = 270. The fourth score must be 360 - 270 = 90.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A restaurant offers 5 main courses and 4 desserts. How many different two-course meals (main + dessert) are possible?",
    "correctAnswer": "20",
    "rationale": "To find the total number of combinations, multiply the number of choices for each course: 5 main courses * 4 desserts = 20.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A die is rolled. What is the probability of rolling a number that is a multiple of 3?",
    "answerOptions": [
      {
        "text": "$\\frac{1}{6}$",
        "isCorrect": false,
        "rationale": "This is the probability of rolling a 3."
      },
      {
        "text": "$\\frac{1}{3}$",
        "isCorrect": true,
        "rationale": "The multiples of 3 are 3 and 6. There are 2 favorable outcomes out of 6 total. $\\frac{2}{6}$ = $\\frac{1}{3}$."
      },
      {
        "text": "$\\frac{1}{2}$",
        "isCorrect": false,
        "rationale": "This is the probability of rolling an even number."
      },
      {
        "text": "$\\frac{2}{3}$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "On a standard six-sided die, the multiples of 3 are 3 and 6. This means there are 2 favorable outcomes out of 6 possible outcomes. The probability is $\\frac{2}{6}$, which simplifies to $\\frac{1}{3}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "The probability of winning a game is 0.4. If you play the game 50 times, how many times would you expect to win?",
    "correctAnswer": "20",
    "rationale": "The expected number of wins is the probability of winning multiplied by the number of times you play: 0.4 * 50 = 20.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "In a pie chart, what does a sector representing 25% of the data look like?",
    "answerOptions": [
      {
        "text": "A straight line",
        "isCorrect": false,
        "rationale": "This is not a feature of a pie chart."
      },
      {
        "text": "A quarter of the circle",
        "isCorrect": true,
        "rationale": "25% is one quarter of 100%, so the sector would be a quarter of the circle."
      },
      {
        "text": "Half of the circle",
        "isCorrect": false,
        "rationale": "This would represent 50%."
      },
      {
        "text": "The whole circle",
        "isCorrect": false,
        "rationale": "This would represent 100%."
      }
    ],
    "rationale": "A pie chart represents a whole (100%). A sector representing 25% of the data would take up 25% of the circle's area, which is a quarter of the circle.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "From a group of 7 people, how many ways can a president and vice-president be selected?",
    "answerOptions": [
      {
        "text": "14",
        "isCorrect": false,
        "rationale": "This is 7*2."
      },
      {
        "text": "21",
        "isCorrect": false,
        "rationale": "This is C(7,2)."
      },
      {
        "text": "42",
        "isCorrect": true,
        "rationale": "This is a permutation. 7 choices for president, 6 for vice-president. 7 * 6 = 42."
      },
      {
        "text": "49",
        "isCorrect": false,
        "rationale": "This is $7^2$."
      }
    ],
    "rationale": "This is a permutation because the order of selection matters (president is different from vice-president). There are 7 choices for president. Once the president is chosen, there are 6 people left to be vice-president. The total number of ways is 7 * 6 = 42.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If the probability of an event is \\frac{3}{8}, what is the probability that the event will NOT happen?",
    "answerOptions": [
      {
        "text": "$\\frac{3}{8}$",
        "isCorrect": false,
        "rationale": "This is the probability of the event happening."
      },
      {
        "text": "$\\frac{5}{8}$",
        "isCorrect": true,
        "rationale": "The total probability is 1. 1 - $\\frac{3}{8}$ = $\\frac{8}{8}$ - $\\frac{3}{8}$ = $\\frac{5}{8}$."
      },
      {
        "text": "$\\frac{8}{3}$",
        "isCorrect": false,
        "rationale": "This is the reciprocal."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This represents certainty."
      }
    ],
    "rationale": "The sum of the probability of an event happening and the probability of it not happening is 1. So, the probability of the event not happening is 1 - $\\frac{3}{8}$ = $\\frac{5}{8}$.",
    "challenge_tags": [
      "math-6"
    ]
  }
];
