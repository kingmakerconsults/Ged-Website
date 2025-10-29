// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "Find the range of the data set: 100, 200, 150, 300, 250.",
    "answerOptions": [
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This is the minimum value."
      },
      {
        "text": "200",
        "isCorrect": true,
        "rationale": "The range is the difference between the max (300) and min (100) values."
      },
      {
        "text": "300",
        "isCorrect": false,
        "rationale": "This is the maximum value."
      },
      {
        "text": "150",
        "isCorrect": false,
        "rationale": "This is one of the values."
      }
    ],
    "rationale": "The range is the difference between the highest and lowest values in the dataset. The highest value is 300 and the lowest is 100. Range = 300 - 100 = 200."
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the probability of rolling an odd number on a standard six-sided die?",
    "correctAnswer": "1/2",
    "rationale": "There are three odd numbers (1, 3, 5) out of six possible outcomes. The probability is 3/6, which simplifies to 1/2."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the mean of the numbers: 7, 8, 8, 9, 13.",
    "answerOptions": [
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is the median and mode."
      },
      {
        "text": "9",
        "isCorrect": true,
        "rationale": "The sum is 45. 45/5 = 9."
      },
      {
        "text": "13",
        "isCorrect": false,
        "rationale": "This is the maximum value."
      },
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is the range."
      }
    ],
    "rationale": "To find the mean, add the numbers together (7 + 8 + 8 + 9 + 13 = 45) and divide by the number of values (5). 45 / 5 = 9."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the median of the data set: 3, 9, 1, 4, 3, 8?",
    "correctAnswer": "3.5",
    "rationale": "Order the data: 1, 3, 3, 4, 8, 9. The median is the average of the two middle numbers: (3 + 4) / 2 = 3.5."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A bag contains 20 marbles. If the probability of drawing a red marble is 1/4, how many red marbles are in the bag?",
    "answerOptions": [
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "This would be a probability of 1/5."
      },
      {
        "text": "5",
        "isCorrect": true,
        "rationale": "1/4 of 20 is (1/4) * 20 = 5."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This would be a probability of 1/2."
      },
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is the number of non-red marbles."
      }
    ],
    "rationale": "To find the number of red marbles, multiply the total number of marbles by the probability of drawing a red one: 20 * (1/4) = 5 red marbles."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A test has a mean score of 80 and a standard deviation of 5. A student scores a 90. This score is how many standard deviations above the mean?",
    "answerOptions": [
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "1 standard deviation would be a score of 85."
      },
      {
        "text": "2",
        "isCorrect": true,
        "rationale": "The score is 10 points above the mean. Since the standard deviation is 5, this is 10/5 = 2 standard deviations."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "3 standard deviations would be a score of 95."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is the difference in score."
      }
    ],
    "rationale": "The difference between the student's score and the mean is 90 - 80 = 10. To find how many standard deviations this is, divide the difference by the standard deviation: 10 / 5 = 2."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the mode of the data: A, B, C, A, B, A, D?",
    "correctAnswer": "A",
    "rationale": "The mode is the value that appears most frequently. 'A' appears 3 times, which is more than any other letter."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the probability of drawing a face card (Jack, Queen, or King) from a standard 52-card deck?",
    "answerOptions": [
      {
        "text": "3/52",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a Jack of a specific suit."
      },
      {
        "text": "1/13",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a card of a specific rank."
      },
      {
        "text": "3/13",
        "isCorrect": true,
        "rationale": "There are 12 face cards (3 in each of 4 suits) in a deck of 52 cards. 12/52 simplifies to 3/13."
      },
      {
        "text": "1/4",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a card of a specific suit."
      }
    ],
    "rationale": "There are 3 face cards (Jack, Queen, King) in each of the 4 suits, so there are a total of 12 face cards. The probability is 12/52, which simplifies to 3/13."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A student needs an average of at least 85 on three exams. Their scores on the first two exams are 80 and 82. What is the minimum score they need on the third exam?",
    "correctAnswer": "93",
    "rationale": "To average 85 on 3 exams, the total score must be 3 * 85 = 255. The sum of the first two scores is 80 + 82 = 162. The third score must be at least 255 - 162 = 93."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of these is a measure of the spread of data?",
    "answerOptions": [
      {
        "text": "Mean",
        "isCorrect": false,
        "rationale": "The mean is a measure of central tendency."
      },
      {
        "text": "Median",
        "isCorrect": false,
        "rationale": "The median is a measure of central tendency."
      },
      {
        "text": "Mode",
        "isCorrect": false,
        "rationale": "The mode is a measure of central tendency."
      },
      {
        "text": "Range",
        "isCorrect": true,
        "rationale": "The range measures how spread out the data is."
      }
    ],
    "rationale": "The range is a measure of statistical dispersion, which describes the spread of data points."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A code is formed using two different digits from 1 to 5. How many different codes are possible?",
    "answerOptions": [
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is C(5,2)."
      },
      {
        "text": "20",
        "isCorrect": true,
        "rationale": "This is a permutation. 5 choices for the first digit, 4 for the second. 5 * 4 = 20."
      },
      {
        "text": "25",
        "isCorrect": false,
        "rationale": "This is if repetition is allowed."
      },
      {
        "text": "120",
        "isCorrect": false,
        "rationale": "This is 5!."
      }
    ],
    "rationale": "This is a permutation problem because the order of the digits matters. There are 5 choices for the first digit. Since the digits must be different, there are 4 choices remaining for the second digit. The total number of codes is 5 * 4 = 20."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If an event has a probability of 0, it is:",
    "answerOptions": [
      {
        "text": "Certain",
        "isCorrect": false,
        "rationale": "A certain event has a probability of 1."
      },
      {
        "text": "Likely",
        "isCorrect": false,
        "rationale": "A likely event has a probability greater than 0.5."
      },
      {
        "text": "Unlikely",
        "isCorrect": false,
        "rationale": "An unlikely event has a probability less than 0.5."
      },
      {
        "text": "Impossible",
        "isCorrect": true,
        "rationale": "A probability of 0 means the event cannot happen."
      }
    ],
    "rationale": "In probability, an event with a probability of 0 is considered impossible."
  }
];
