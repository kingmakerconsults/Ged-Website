// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "Find the mean of the numbers: 10, 15, 20, 25, 30.",
    "answerOptions": [
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is the second number in the set."
      },
      {
        "text": "20",
        "isCorrect": true,
        "rationale": "The sum is 100. 100 / 5 = 20. Since the numbers are evenly spaced, the mean is the middle number."
      },
      {
        "text": "25",
        "isCorrect": false,
        "rationale": "This is the fourth number."
      },
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is the highest number."
      }
    ],
    "rationale": "To find the mean, sum the numbers (10+15+20+25+30 = 100) and divide by the count of the numbers (5). 100 / 5 = 20."
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "A bag has 3 red marbles and 2 blue marbles. What is the probability of picking a red marble?",
    "correctAnswer": "3/5",
    "rationale": "There are 3 red marbles and a total of 5 marbles. The probability is the number of red marbles divided by the total number of marbles, which is 3/5."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the median of the following test scores: 88, 92, 75, 88, 95?",
    "answerOptions": [
      {
        "text": "75",
        "isCorrect": false,
        "rationale": "This is the lowest score."
      },
      {
        "text": "88",
        "isCorrect": true,
        "rationale": "First, order the scores: 75, 88, 88, 92, 95. The median is the middle value, which is 88."
      },
      {
        "text": "87.6",
        "isCorrect": false,
        "rationale": "This is the mean of the scores."
      },
      {
        "text": "95",
        "isCorrect": false,
        "rationale": "This is the highest score."
      }
    ],
    "rationale": "First, arrange the scores in ascending order: 75, 88, 88, 92, 95. The median is the middle number in the ordered set, which is 88."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A set of data has a maximum value of 50 and a minimum value of 12. What is the range?",
    "correctAnswer": "38",
    "rationale": "The range is the difference between the maximum and minimum values in a data set. Range = 50 - 12 = 38."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A survey asks for a person's favorite color. Which measure of central tendency is most appropriate to use for this data?",
    "answerOptions": [
      {
        "text": "Mean",
        "isCorrect": false,
        "rationale": "The mean can only be calculated for numerical data."
      },
      {
        "text": "Median",
        "isCorrect": false,
        "rationale": "The median requires the data to be ordered, which is not possible with categorical data like color."
      },
      {
        "text": "Mode",
        "isCorrect": true,
        "rationale": "The mode, which is the most frequent response, is suitable for categorical data."
      },
      {
        "text": "Range",
        "isCorrect": false,
        "rationale": "The range is a measure of spread, not central tendency, and requires numerical data."
      }
    ],
    "rationale": "Since the data (favorite color) is categorical (non-numerical), the only appropriate measure of central tendency is the mode, which identifies the most frequently chosen color."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A restaurant offers a lunch special with a choice of 3 sandwiches, 2 side dishes, and 4 drinks. How many different lunch combinations are possible?",
    "answerOptions": [
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is the sum of the choices, not the product."
      },
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "This is 3*4, ignoring the side dishes."
      },
      {
        "text": "24",
        "isCorrect": true,
        "rationale": "To find the total number of combinations, multiply the number of choices for each category: 3 * 2 * 4 = 24."
      },
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "This is a counting principle problem. The total number of combinations is the product of the number of choices for each option: 3 sandwiches * 2 sides * 4 drinks = 24 combinations."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "The average of four numbers is 15. If three of the numbers are 10, 12, and 18, what is the fourth number?",
    "correctAnswer": "20",
    "rationale": "If the average of four numbers is 15, their sum must be 15 * 4 = 60. The sum of the three given numbers is 10 + 12 + 18 = 40. So, the fourth number is 60 - 40 = 20."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the probability of drawing a king from a standard deck of 52 playing cards?",
    "answerOptions": [
      {
        "text": "1/52",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a specific king (e.g., the King of Hearts)."
      },
      {
        "text": "1/13",
        "isCorrect": true,
        "rationale": "There are 4 kings in a deck of 52 cards. The probability is 4/52, which simplifies to 1/13."
      },
      {
        "text": "1/4",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a card of a specific suit."
      },
      {
        "text": "1/26",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a specific red card."
      }
    ],
    "rationale": "A standard deck of cards has 4 kings and 52 total cards. The probability is the number of favorable outcomes (4) divided by the total number of outcomes (52). 4/52 simplifies to 1/13."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A class of 25 students has an average test score of 80. A new student joins the class and scores 93. What is the new class average?",
    "correctAnswer": "80.5",
    "rationale": "The original total score is 25 * 80 = 2000. The new total score is 2000 + 93 = 2093. The new number of students is 26. The new average is 2093 / 26 = 80.5."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "A weather forecast states there is a 70% chance of sunshine. What is the probability that it will be cloudy?",
    "answerOptions": [
      {
        "text": "30%",
        "isCorrect": true,
        "rationale": "The total probability is 100%. If there's a 70% chance of sunshine, the chance of it not being sunny (cloudy) is 100% - 70% = 30%."
      },
      {
        "text": "50%",
        "isCorrect": false,
        "rationale": "This would imply an equal chance."
      },
      {
        "text": "70%",
        "isCorrect": false,
        "rationale": "This is the probability of sunshine."
      },
      {
        "text": "100%",
        "isCorrect": false,
        "rationale": "This represents certainty."
      }
    ],
    "rationale": "If the chance of sunshine is 70%, the chance of the opposite outcome (cloudy) is 100% - 70% = 30%."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A password must be 3 characters long, using the digits 0-9. How many different passwords can be created if digits can be repeated?",
    "answerOptions": [
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is 10*3."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This is $10^2$."
      },
      {
        "text": "729",
        "isCorrect": false,
        "rationale": "This is $9^3$."
      },
      {
        "text": "1000",
        "isCorrect": true,
        "rationale": "There are 10 choices for the first character, 10 for the second, and 10 for the third. So, 10 * 10 * 10 = 1000."
      }
    ],
    "rationale": "For each of the three characters, there are 10 possible digits (0-9). Since repetition is allowed, the total number of combinations is 10 * 10 * 10 = 1000."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A spinner is equally likely to land on red, blue, green, or yellow. What is the probability it does NOT land on green?",
    "answerOptions": [
      {
        "text": "1/4",
        "isCorrect": false,
        "rationale": "This is the probability it will land on green."
      },
      {
        "text": "1/2",
        "isCorrect": false,
        "rationale": "This would be the case if there were only two colors."
      },
      {
        "text": "3/4",
        "isCorrect": true,
        "rationale": "There are 3 outcomes that are not green (red, blue, yellow) out of 4 total outcomes."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This would mean it's certain not to land on green."
      }
    ],
    "rationale": "There are 4 possible outcomes. The probability of landing on green is 1/4. The probability of not landing on green is 1 - 1/4 = 3/4."
  }
];
