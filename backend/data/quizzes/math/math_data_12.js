// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "easy",
    "question": "Find the mean of the data set: 5, 10, 5, 15, 5.",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is the mode and median."
      },
      {
        "text": "8",
        "isCorrect": true,
        "rationale": "The sum is 40. $\\frac{40}{5}$ = 8."
      },
      {
        "text": "10",
        "isCorrect": false,
        "rationale": "This is the range."
      },
      {
        "text": "40",
        "isCorrect": false,
        "rationale": "This is the sum."
      }
    ],
    "rationale": "To find the mean, add the numbers together (5+10+5+15+5 = 40) and divide by the number of values (5). 40 / 5 = 8.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "A drawer has 8 blue socks and 4 black socks. What is the probability of picking a black sock?",
    "correctAnswer": "$\\frac{1}{3}$",
    "rationale": "There are 4 black socks and a total of 12 socks. The probability is $\\frac{4}{12}$, which simplifies to $\\frac{1}{3}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the median of the data set: 4, 8, 2, 9, 8, 5?",
    "answerOptions": [
      {
        "text": "6.5",
        "isCorrect": true,
        "rationale": "Order the data: 2, 4, 5, 8, 8, 9. The median is the average of 5 and 8: (5+8)/2 = 6.5."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is the mode."
      },
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is the mean."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is the range."
      }
    ],
    "rationale": "First, order the numbers: 2, 4, 5, 8, 8, 9. Since there is an even number of values, the median is the average of the two middle numbers (5 and 8). (5 + 8) / 2 = 6.5.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "The range of a set of numbers is 20. If the highest number is 35, what is the lowest number?",
    "correctAnswer": "15",
    "rationale": "The range is the difference between the highest and lowest numbers. Range = Max - Min. 20 = 35 - Min. Min = 15.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A coin is flipped and a die is rolled. What is the total number of possible outcomes?",
    "answerOptions": [
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "This is the number of outcomes for the die."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "This is 2+6."
      },
      {
        "text": "12",
        "isCorrect": true,
        "rationale": "There are 2 outcomes for the coin and 6 for the die. Total outcomes = 2 * 6 = 12."
      },
      {
        "text": "36",
        "isCorrect": false,
        "rationale": "This is 6*6."
      }
    ],
    "rationale": "The coin has 2 possible outcomes (heads or tails), and the die has 6 possible outcomes. To find the total number of outcomes, multiply the outcomes for each event: 2 * 6 = 12.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "The average of 6 numbers is 10. What is the sum of the numbers?",
    "answerOptions": [
      {
        "text": "1.67",
        "isCorrect": false,
        "rationale": "This is $\\frac{10}{6}$."
      },
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "This is 10+6."
      },
      {
        "text": "60",
        "isCorrect": true,
        "rationale": "The sum is the average multiplied by the number of values. 10 * 6 = 60."
      },
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "This is 10*10."
      }
    ],
    "rationale": "The mean is the sum of the values divided by the number of values. Therefore, the sum of the values is the mean multiplied by the number of values. Sum = 10 * 6 = 60.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the mode of the data: 5, 1, 4, 1, 5, 1, 4?",
    "correctAnswer": "1",
    "rationale": "The number 1 appears 3 times, which is more than any other number in the set.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the probability of drawing a red Queen from a standard 52-card deck?",
    "answerOptions": [
      {
        "text": "$\\frac{1}{52}$",
        "isCorrect": false,
        "rationale": "This is for a specific red queen."
      },
      {
        "text": "$\\frac{1}{26}$",
        "isCorrect": true,
        "rationale": "There are 2 red Queens (Hearts and Diamonds) out of 52 cards. $\\frac{2}{52}$ = $\\frac{1}{26}$."
      },
      {
        "text": "$\\frac{1}{13}$",
        "isCorrect": false,
        "rationale": "This is the probability of drawing any Queen."
      },
      {
        "text": "$\\frac{1}{4}$",
        "isCorrect": false,
        "rationale": "This is the probability of drawing a card from a specific suit."
      }
    ],
    "rationale": "There are two red Queens in a deck of 52 cards (the Queen of Hearts and the Queen of Diamonds). The probability is $\\frac{2}{52}$, which simplifies to $\\frac{1}{26}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A survey of 120 people found that 45% prefer watching movies at home. How many people is that?",
    "correctAnswer": "54",
    "rationale": "45% of 120 is 0.45 * 120 = 54.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "If an event is equally likely to happen as not to happen, what is its probability?",
    "answerOptions": [
      {
        "text": "0",
        "isCorrect": false,
        "rationale": "This means it's impossible."
      },
      {
        "text": "1",
        "isCorrect": false,
        "rationale": "This means it's certain."
      },
      {
        "text": "0.5",
        "isCorrect": true,
        "rationale": "0.5 or $\\frac{1}{2}$ represents a 50% chance, which is equally likely."
      },
      {
        "text": "0.25",
        "isCorrect": false,
        "rationale": "This is a 1 in 4 chance."
      }
    ],
    "rationale": "An event that is equally likely to happen as not to happen has a 50% chance of occurring, which is a probability of 0.5 or $\\frac{1}{2}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A bag contains 5 red balls and 3 blue balls. You draw one ball, do not replace it, and then draw a second ball. What is the probability that both balls are red?",
    "answerOptions": [
      {
        "text": "$\\frac{25}{64}$",
        "isCorrect": false,
        "rationale": "This is if you replace the ball."
      },
      {
        "text": "$\\frac{5}{14}$",
        "isCorrect": true,
        "rationale": "P(1st is red) = $\\frac{5}{8}$. P(2nd is red) = $\\frac{4}{7}$. P(both) = ($\\frac{5}{8}$)*($\\frac{4}{7}$) = $\\frac{20}{56}$ = $\\frac{5}{14}$."
      },
      {
        "text": "$\\frac{15}{56}$",
        "isCorrect": false,
        "rationale": "This is P(red then blue)."
      },
      {
        "text": "$\\frac{9}{64}$",
        "isCorrect": false,
        "rationale": "This is P(blue then blue with replacement)."
      }
    ],
    "rationale": "The probability of the first ball being red is $\\frac{5}{8}$. After drawing one red ball, there are 4 red balls left and a total of 7 balls. The probability of the second ball being red is $\\frac{4}{7}$. The total probability is ($\\frac{5}{8}$) * ($\\frac{4}{7}$) = $\\frac{20}{56}$, which simplifies to $\\frac{5}{14}$.",
    "challenge_tags": [
      "math-6"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "The median score on a test was 80. What does this mean?",
    "answerOptions": [
      {
        "text": "Most people scored an 80.",
        "isCorrect": false,
        "rationale": "This describes the mode."
      },
      {
        "text": "The average score was 80.",
        "isCorrect": false,
        "rationale": "This describes the mean."
      },
      {
        "text": "Half the students scored 80 or above, and half scored 80 or below.",
        "isCorrect": true,
        "rationale": "This is the definition of the median."
      },
      {
        "text": "The difference between the highest and lowest score was 80.",
        "isCorrect": false,
        "rationale": "This describes the range."
      }
    ],
    "rationale": "The median is the value that separates the higher half from the lower half of a data sample. It is the middle value.",
    "challenge_tags": [
      "math-6"
    ]
  }
];
