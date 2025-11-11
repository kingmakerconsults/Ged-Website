// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "Find the range of the data set: 4, 12, 8, 20, 15, 8.",
    "answerOptions": [
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is the mode and median."
      },
      {
        "text": "11.17",
        "isCorrect": false,
        "rationale": "This is the mean."
      },
      {
        "text": "16",
        "isCorrect": true,
        "rationale": "The range is the difference between the maximum (20) and minimum (4) values."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is the maximum value."
      }
    ],
    "rationale": "The range is the difference between the highest and lowest values in the dataset. The highest value is 20 and the lowest is 4. Range = 20 - 4 = 16.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "A coin is flipped. What is the probability of it landing on heads?",
    "correctAnswer": "1/2",
    "rationale": "A fair coin has two sides, heads and tails. There is 1 favorable outcome (heads) out of 2 possible outcomes.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the median of the scores: 85, 90, 70, 80, 95, 85?",
    "answerOptions": [
      {
        "text": "85",
        "isCorrect": true,
        "rationale": "Order the scores: 70, 80, 85, 85, 90, 95. The median is the average of the two middle scores (85 and 85), which is 85."
      },
      {
        "text": "84.17",
        "isCorrect": false,
        "rationale": "This is the mean."
      },
      {
        "text": "82.5",
        "isCorrect": false,
        "rationale": "This is the average of 80 and 85."
      },
      {
        "text": "70",
        "isCorrect": false,
        "rationale": "This is the minimum score."
      }
    ],
    "rationale": "First, order the scores from least to greatest: 70, 80, 85, 85, 90, 95. Since there is an even number of scores, the median is the average of the two middle numbers, 85 and 85. (85+85)/2 = 85.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the mean of the numbers: 2.5, 3.5, 4.0, 5.0.",
    "correctAnswer": "3.75",
    "rationale": "The sum of the numbers is 2.5 + 3.5 + 4.0 + 5.0 = 15.0. Divide by the count of the numbers (4): 15.0 / 4 = 3.75.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A deck of 52 cards is shuffled. What is the probability of drawing a heart?",
    "answerOptions": [
      {
        "text": "1/52",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a specific card."
      },
      {
        "text": "1/13",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a card of a specific rank."
      },
      {
        "text": "1/4",
        "isCorrect": true,
        "rationale": "There are 13 hearts in a deck of 52 cards. The probability is 13/52, which simplifies to 1/4."
      },
      {
        "text": "1/2",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a red card."
      }
    ],
    "rationale": "A standard deck of 52 cards has 4 suits, one of which is hearts. There are 13 heart cards. So the probability is 13/52, which simplifies to 1/4.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A company finds that 1 out of every 500 products is defective. If they produce 2,000 products, how many are likely to be defective?",
    "answerOptions": [
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "4",
        "isCorrect": true,
        "rationale": "The rate of defects is 1/500. For 2,000 products, the number of defects is (1/500) * 2000 = 4."
      },
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "40",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Set up a proportion: $\\frac{1 \\text{ defective}}{500 \\text{ total}} = \\frac{x \\text{ defective}}{2000 \\text{ total}}$. Solve for x: $500x = 2000$, so $x = 4$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the mode of the data set: Apple, Banana, Orange, Apple, Grape, Apple?",
    "correctAnswer": "Apple",
    "rationale": "The mode is the value that appears most frequently. 'Apple' appears 3 times, which is more than any other fruit.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A number cube (die) is rolled twice. What is the probability of rolling a 6 on the first roll and an odd number on the second roll?",
    "answerOptions": [
      {
        "text": "1/12",
        "isCorrect": true,
        "rationale": "P(rolling a 6) = 1/6. P(rolling an odd) = 3/6 = 1/2. P(both) = (1/6) * (1/2) = 1/12."
      },
      {
        "text": "1/6",
        "isCorrect": false,
        "rationale": "This is just the probability of rolling a 6."
      },
      {
        "text": "1/4",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "2/3",
        "isCorrect": false,
        "rationale": "This is 1/6 + 1/2."
      }
    ],
    "rationale": "These are independent events. The probability of rolling a 6 is 1/6. The probability of rolling an odd number (1, 3, or 5) is 3/6 = 1/2. The probability of both events occurring is (1/6) * (1/2) = 1/12.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "The average of 5 numbers is 30. The average of 3 of those numbers is 20. What is the average of the other two numbers?",
    "correctAnswer": "45",
    "rationale": "The sum of the 5 numbers is 5 * 30 = 150. The sum of the 3 numbers is 3 * 20 = 60. The sum of the other two numbers is 150 - 60 = 90. Their average is 90 / 2 = 45.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following describes the 'range' of a dataset?",
    "answerOptions": [
      {
        "text": "The average value",
        "isCorrect": false,
        "rationale": "This is the mean."
      },
      {
        "text": "The middle value",
        "isCorrect": false,
        "rationale": "This is the median."
      },
      {
        "text": "The most frequent value",
        "isCorrect": false,
        "rationale": "This is the mode."
      },
      {
        "text": "The difference between the highest and lowest values",
        "isCorrect": true,
        "rationale": "The range is a measure of the spread of the data."
      }
    ],
    "rationale": "The range is a measure of statistical dispersion, which is the difference between the maximum and minimum values in a set of data.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "There are 10 contestants in a race. In how many different ways can the first, second, and third places be awarded?",
    "answerOptions": [
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is 10*3."
      },
      {
        "text": "120",
        "isCorrect": false,
        "rationale": "This is a combination C(10,3)."
      },
      {
        "text": "720",
        "isCorrect": true,
        "rationale": "This is a permutation problem. 10 choices for 1st, 9 for 2nd, 8 for 3rd. 10 * 9 * 8 = 720."
      },
      {
        "text": "1000",
        "isCorrect": false,
        "rationale": "This is 10³."
      }
    ],
    "rationale": "This is a permutation problem because the order matters. For first place, there are 10 choices. For second, 9 remain. For third, 8 remain. Total ways = 10 * 9 * 8 = 720.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If an event is certain to happen, what is its probability?",
    "answerOptions": [
      {
        "text": "0",
        "isCorrect": false,
        "rationale": "0 means the event is impossible."
      },
      {
        "text": "0.5",
        "isCorrect": false,
        "rationale": "0.5 means there is an equal chance of the event happening or not happening."
      },
      {
        "text": "1",
        "isCorrect": true,
        "rationale": "A probability of 1 (or 100%) means the event is certain to occur."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "Probability is expressed as a number between 0 and 1, or as a percentage up to 100%."
      }
    ],
    "rationale": "In probability theory, an event that is certain to happen has a probability of 1. An impossible event has a probability of 0.",
    "challenge_tags": [
      "math-6"
    ]
  }
];
