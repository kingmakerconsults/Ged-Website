// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "What is the mean (average) of the following set of numbers: 2, 5, 8, 9, 11?",
    "answerOptions": [
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is the median of the set."
      },
      {
        "text": "7.5",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "7",
        "isCorrect": true,
        "rationale": "The sum is 35. 35 divided by 5 (the number of values) is 7."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is the mode of a different set."
      }
    ],
    "rationale": "To find the mean, add all the numbers together (2+5+8+9+11 = 35) and divide by the count of the numbers (5). 35 / 5 = 7."
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the median of the data set: 3, 7, 1, 9, 4?",
    "correctAnswer": "4",
    "rationale": "First, order the data set from least to greatest: 1, 3, 4, 7, 9. The median is the middle number, which is 4."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the mode of the following data set: 6, 8, 9, 8, 6, 8, 7?",
    "answerOptions": [
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "6 appears twice, but 8 appears more often."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "7 only appears once."
      },
      {
        "text": "8",
        "isCorrect": true,
        "rationale": "The number 8 appears most frequently in the set (3 times)."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "9 only appears once."
      }
    ],
    "rationale": "The mode is the number that appears most often in a data set. In this set, 8 appears three times, more than any other number."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the range of the data set: 15, 2, 12, 25, 8?",
    "correctAnswer": "23",
    "rationale": "The range is the difference between the highest and lowest values. The highest is 25 and the lowest is 2. Range = 25 - 2 = 23."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If you roll a standard six-sided die, what is the probability of rolling an even number?",
    "answerOptions": [
      {
        "text": "1/6",
        "isCorrect": false,
        "rationale": "This is the probability of rolling one specific number."
      },
      {
        "text": "1/3",
        "isCorrect": false,
        "rationale": "This is the probability of rolling a 2 or a 4, but not 6."
      },
      {
        "text": "1/2",
        "isCorrect": true,
        "rationale": "There are three even numbers (2, 4, 6) out of six possible outcomes. So the probability is 3/6, which simplifies to 1/2."
      },
      {
        "text": "2/3",
        "isCorrect": false,
        "rationale": "This is the probability of rolling a number greater than 2."
      }
    ],
    "rationale": "A standard six-sided die has three even numbers (2, 4, 6) and a total of six possible outcomes. The probability is the number of favorable outcomes divided by the total number of outcomes: 3/6 = 1/2."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A bag contains 4 red marbles, 5 blue marbles, and 6 green marbles. What is the probability of drawing a blue marble at random?",
    "answerOptions": [
      {
        "text": "1/3",
        "isCorrect": true,
        "rationale": "There are 5 blue marbles and a total of 15 marbles (4+5+6). The probability is 5/15, which simplifies to 1/3."
      },
      {
        "text": "1/5",
        "isCorrect": false,
        "rationale": "This incorrectly uses the number of blue marbles as the denominator."
      },
      {
        "text": "4/15",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a red marble."
      },
      {
        "text": "2/5",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a green marble."
      }
    ],
    "rationale": "There are a total of 4 + 5 + 6 = 15 marbles. The number of blue marbles is 5. The probability is 5/15, which simplifies to 1/3."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "The scores on a test were 75, 80, 80, 85, 90, 95. What is the median score?",
    "correctAnswer": "82.5",
    "rationale": "For an even number of data points, the median is the average of the two middle numbers. First, order the data: 75, 80, 80, 85, 90, 95. The two middle numbers are 80 and 85. Their average is (80 + 85) / 2 = 82.5."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A spinner is divided into 8 equal sections, numbered 1 through 8. What is the probability of spinning a number greater than 5?",
    "answerOptions": [
      {
        "text": "1/8",
        "isCorrect": false,
        "rationale": "This is the probability of spinning one specific number."
      },
      {
        "text": "1/4",
        "isCorrect": false,
        "rationale": "This is the probability of spinning a 7 or 8."
      },
      {
        "text": "3/8",
        "isCorrect": true,
        "rationale": "The numbers greater than 5 are 6, 7, and 8. There are 3 favorable outcomes out of 8 total."
      },
      {
        "text": "1/2",
        "isCorrect": false,
        "rationale": "This is the probability of spinning an even number."
      }
    ],
    "rationale": "The numbers greater than 5 are 6, 7, and 8. This is 3 favorable outcomes out of 8 possible outcomes. So the probability is 3/8."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A student's grades are 88, 92, 85, and 95. What grade must the student get on the fifth test to have an average of 90?",
    "correctAnswer": "90",
    "rationale": "To have an average of 90 over 5 tests, the total score must be 90 * 5 = 450. The sum of the first four grades is 88 + 92 + 85 + 95 = 360. So, the fifth grade must be 450 - 360 = 90."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "Which of the following is NOT a measure of central tendency?",
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
        "rationale": "The range is a measure of spread or dispersion, not central tendency."
      }
    ],
    "rationale": "Measures of central tendency describe the center of a data set. The range describes how spread out the data is."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "If the probability of rain is 40%, what is the probability that it will NOT rain?",
    "answerOptions": [
      {
        "text": "40%",
        "isCorrect": false,
        "rationale": "This is the probability that it will rain."
      },
      {
        "text": "60%",
        "isCorrect": true,
        "rationale": "The total probability is 100%. If there's a 40% chance of rain, there's a 100% - 40% = 60% chance of no rain."
      },
      {
        "text": "100%",
        "isCorrect": false,
        "rationale": "This represents certainty."
      },
      {
        "text": "Cannot be determined",
        "isCorrect": false,
        "rationale": "The probability can be determined."
      }
    ],
    "rationale": "The sum of the probabilities of an event happening and not happening is 1 (or 100%). So, the probability of it not raining is 100% - 40% = 60%."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A coin is flipped twice. What is the probability of getting heads on both flips?",
    "answerOptions": [
      {
        "text": "1/4",
        "isCorrect": true,
        "rationale": "The probability of heads on the first flip is 1/2. The probability of heads on the second is 1/2. The combined probability is (1/2) * (1/2) = 1/4."
      },
      {
        "text": "1/2",
        "isCorrect": false,
        "rationale": "This is the probability of getting heads on a single flip."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This would mean it's a certain outcome."
      },
      {
        "text": "0",
        "isCorrect": false,
        "rationale": "This would mean it's an impossible outcome."
      }
    ],
    "rationale": "The probability of getting heads on one flip is 1/2. For two independent events, you multiply their probabilities. So, P(Heads and Heads) = (1/2) * (1/2) = 1/4."
  }
];
