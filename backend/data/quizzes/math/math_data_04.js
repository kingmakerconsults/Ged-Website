// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "What is the mode of the data set: 5, 6, 7, 7, 8, 9, 7?",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "5 appears only once."
      },
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "6 appears only once."
      },
      {
        "text": "7",
        "isCorrect": true,
        "rationale": "7 is the number that appears most frequently."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "8 appears only once."
      }
    ],
    "rationale": "The mode is the value that appears most often in a data set. The number 7 appears three times, which is more than any other number."
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the range of the following temperatures: 22, 15, 28, 12, 30?",
    "correctAnswer": "18",
    "rationale": "The range is the difference between the highest and lowest values. Max = 30, Min = 12. Range = 30 - 12 = 18."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the mean of the data set: 100, 110, 120, 130, 140.",
    "answerOptions": [
      {
        "text": "110",
        "isCorrect": false,
        "rationale": "This is the second number."
      },
      {
        "text": "120",
        "isCorrect": true,
        "rationale": "The sum is 600. 600/5 = 120. As the numbers are evenly spaced, the mean is the middle number."
      },
      {
        "text": "130",
        "isCorrect": false,
        "rationale": "This is the fourth number."
      },
      {
        "text": "140",
        "isCorrect": false,
        "rationale": "This is the highest number."
      }
    ],
    "rationale": "To find the mean, sum the numbers (100+110+120+130+140 = 600) and divide by the number of values (5). 600 / 5 = 120."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "A drawer contains 6 black socks, 4 white socks, and 2 brown socks. What is the probability of randomly selecting a white sock?",
    "correctAnswer": "1/3",
    "rationale": "There are 4 white socks and a total of 12 socks (6+4+2). The probability is 4/12, which simplifies to 1/3."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Find the median of the data set: 25, 15, 20, 10, 30, 15.",
    "answerOptions": [
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is the mode."
      },
      {
        "text": "17.5",
        "isCorrect": true,
        "rationale": "Order the data: 10, 15, 15, 20, 25, 30. The median is the average of the two middle numbers: (15+20)/2 = 17.5."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is one of the middle numbers, but not the average."
      },
      {
        "text": "19.17",
        "isCorrect": false,
        "rationale": "This is the mean."
      }
    ],
    "rationale": "First, order the numbers: 10, 15, 15, 20, 25, 30. Since there is an even number of values, the median is the average of the two middle numbers (15 and 20). (15 + 20) / 2 = 17.5."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "An ice cream shop offers 5 flavors of ice cream and 3 different toppings. How many different single-scoop, single-topping combinations can be made?",
    "answerOptions": [
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is the sum of the choices."
      },
      {
        "text": "15",
        "isCorrect": true,
        "rationale": "Multiply the number of flavor choices by the number of topping choices: 5 * 3 = 15."
      },
      {
        "text": "2",
        "isCorrect": false,
        "rationale": "This is the difference."
      },
      {
        "text": "25",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "This is a fundamental counting principle problem. To find the total number of combinations, multiply the number of options for each choice: 5 flavors * 3 toppings = 15 combinations."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "The average score of 5 students on a test is 82. If a sixth student scores a 94, what is the new average?",
    "correctAnswer": "84",
    "rationale": "The total score of the first 5 students is 5 * 82 = 410. The new total score is 410 + 94 = 504. The new average for 6 students is 504 / 6 = 84."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A spinner is divided into 4 equal sections: Red, Green, Blue, Yellow. What is the probability of the spinner NOT landing on Red?",
    "answerOptions": [
      {
        "text": "1/4",
        "isCorrect": false,
        "rationale": "This is the probability of landing on Red."
      },
      {
        "text": "1/2",
        "isCorrect": false,
        "rationale": "This would be the case for a 2-section spinner."
      },
      {
        "text": "3/4",
        "isCorrect": true,
        "rationale": "There are 3 outcomes that are not Red (Green, Blue, Yellow) out of 4 total outcomes."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This would mean it's certain not to land on Red."
      }
    ],
    "rationale": "There are 4 possible outcomes. The probability of landing on Red is 1/4. The probability of NOT landing on Red is 1 - P(Red) = 1 - 1/4 = 3/4."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the mode of the following numbers? 1, 2, 2, 3, 3, 3, 4, 4, 5",
    "correctAnswer": "3",
    "rationale": "The mode is the number that appears most frequently. The number 3 appears three times, which is more than any other number."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "In a survey of 300 people, 120 said they prefer cats. What percentage of people prefer cats?",
    "answerOptions": [
      {
        "text": "30%",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "40%",
        "isCorrect": true,
        "rationale": "(120 / 300) * 100 = 0.4 * 100 = 40%."
      },
      {
        "text": "50%",
        "isCorrect": false,
        "rationale": "This would be 150 people."
      },
      {
        "text": "60%",
        "isCorrect": false,
        "rationale": "This is the percentage of people who do not prefer cats."
      }
    ],
    "rationale": "To find the percentage, divide the number of people who prefer cats by the total number of people surveyed and multiply by 100: (120 / 300) * 100 = 0.4 * 100 = 40%."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "You have a bag with 5 red balls and 5 blue balls. What is the probability of drawing two red balls in a row without replacement?",
    "answerOptions": [
      {
        "text": "1/4",
        "isCorrect": false,
        "rationale": "This is 25/100."
      },
      {
        "text": "2/9",
        "isCorrect": true,
        "rationale": "P(1st is red) = 5/10. P(2nd is red) = 4/9. P(both red) = (5/10) * (4/9) = 20/90 = 2/9."
      },
      {
        "text": "1/2",
        "isCorrect": false,
        "rationale": "This is the probability of drawing one red ball."
      },
      {
        "text": "5/9",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The probability of the first ball being red is 5/10. After drawing one red ball, there are 4 red balls left and a total of 9 balls. So, the probability of the second ball being red is 4/9. The total probability is (5/10) * (4/9) = 20/90 = 2/9."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A dataset has a mean of 50. If you add 5 to every number in the dataset, what is the new mean?",
    "answerOptions": [
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "The mean will change."
      },
      {
        "text": "55",
        "isCorrect": true,
        "rationale": "If a constant is added to every value in a set, the mean increases by that constant."
      },
      {
        "text": "250",
        "isCorrect": false,
        "rationale": "This is 50*5."
      },
      {
        "text": "Cannot be determined",
        "isCorrect": false,
        "rationale": "This can be determined."
      }
    ],
    "rationale": "When a constant value is added to every number in a dataset, the mean of the new dataset will be the original mean plus that constant. So, the new mean is 50 + 5 = 55."
  }
];
