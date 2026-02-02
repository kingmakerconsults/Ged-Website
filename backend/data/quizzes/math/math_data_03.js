module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'easy',
    question:
      'Find the median of the following list of numbers: 10, 8, 14, 8, 12.',
    answerOptions: [
      {
        text: '8',
        isCorrect: false,
        rationale: 'This is the mode.',
      },
      {
        text: '10',
        isCorrect: true,
        rationale:
          'First, order the numbers: 8, 8, 10, 12, 14. The median is the middle number, 10.',
      },
      {
        text: '10.4',
        isCorrect: false,
        rationale: 'This is the mean.',
      },
      {
        text: '12',
        isCorrect: false,
        rationale: 'This is the third number in the original list.',
      },
    ],
    rationale:
      'To find the median, first put the numbers in order: 8, 8, 10, 12, 14. The median is the middle value, which is 10.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question:
      'A standard die is rolled once. What is the probability of rolling a 5?',
    correctAnswer: '\(\\(\frac{1}{6}\)\)',
    rationale:
      "There is one '5' on a standard six-sided die, so there is 1 favorable outcome out of 6 total possible outcomes.",
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the mean (average) of these test scores: 70, 80, 80, 90, 100?',
    answerOptions: [
      {
        text: '80',
        isCorrect: false,
        rationale: 'This is the median and the mode.',
      },
      {
        text: '84',
        isCorrect: true,
        rationale:
          'The sum of the scores is 70+80+80+90+100 = 420. Divide by 5 scores: \(\\(\frac{420}{5}\)\) = 84.',
      },
      {
        text: '85',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '90',
        isCorrect: false,
        rationale: 'This is one of the scores.',
      },
    ],
    rationale:
      'To find the mean, add the scores (70 + 80 + 80 + 90 + 100 = 420) and divide by the number of scores (5). The mean is 420 / 5 = 84.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A basketball player scores 15, 20, 22, and 18 points in four games. How many points must they score in the fifth game to have an average of 20 points per game?',
    correctAnswer: '25',
    rationale:
      'To average 20 points over 5 games, the total score must be 5 * 20 = 100. The sum of the first four games is 15+20+22+18 = 75. So, the player needs 100 - 75 = 25 points.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Find the range of the temperatures: 5°C, -2°C, 8°C, 0°C, -5°C.',
    answerOptions: [
      {
        text: '3°C',
        isCorrect: false,
        rationale: 'This is the difference between 8 and 5.',
      },
      {
        text: '8°C',
        isCorrect: false,
        rationale: 'This is the maximum temperature.',
      },
      {
        text: '13°C',
        isCorrect: true,
        rationale:
          'The range is the difference between the highest (8°C) and the lowest (-5°C). 8 - (-5) = 13.',
      },
      {
        text: '-5°C',
        isCorrect: false,
        rationale: 'This is the minimum temperature.',
      },
    ],
    rationale:
      'The range is the difference between the maximum and minimum values. The maximum is 8°C and the minimum is -5°C. The range is 8 - (-5) = 13°C.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A classroom has 12 girls and 18 boys. If a student is chosen at random, what is the probability that the student is a girl?',
    answerOptions: [
      {
        text: '\(\\(\frac{2}{5}\)\)',
        isCorrect: true,
        rationale:
          'There are 12 girls and a total of 30 students. The probability is \(\\(\frac{12}{30}\)\), which simplifies to \(\\(\frac{2}{5}\)\).',
      },
      {
        text: '\(\\(\frac{3}{5}\)\)',
        isCorrect: false,
        rationale: 'This is the probability of choosing a boy.',
      },
      {
        text: '\(\\(\frac{2}{3}\)\)',
        isCorrect: false,
        rationale: 'This is the ratio of girls to boys.',
      },
      {
        text: '\(\\(\frac{1}{2}\)\)',
        isCorrect: false,
        rationale:
          'This would be true if there were equal numbers of boys and girls.',
      },
    ],
    rationale:
      'There are a total of 12 + 18 = 30 students. The number of girls is 12. The probability of choosing a girl is \(\\(\frac{12}{30}\)\), which simplifies to \(\\(\frac{2}{5}\)\).',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the mode of the following set of data: red, blue, green, blue, red, blue.',
    correctAnswer: 'blue',
    rationale:
      "The mode is the value that appears most frequently. In this set, 'blue' appears 3 times, more than any other color.",
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'A coin is tossed, and a die is rolled. What is the probability of getting a tail and a 4?',
    answerOptions: [
      {
        text: '\(\\(\frac{1}{12}\)\)',
        isCorrect: true,
        rationale:
          'The probability of a tail is \(\\(\frac{1}{2}\)\). The probability of a 4 is \(\\(\frac{1}{6}\)\). The combined probability is (\(\\(\frac{1}{2}\)\)) * (\(\\(\frac{1}{6}\)\)) = \(\\(\frac{1}{12}\)\).',
      },
      {
        text: '\(\\(\frac{1}{8}\)\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\(\\(\frac{2}{3}\)\)',
        isCorrect: false,
        rationale: 'This is \(\\(\frac{1}{2}\)\) + \(\\(\frac{1}{6}\)\).',
      },
      {
        text: '\(\\(\frac{1}{6}\)\)',
        isCorrect: false,
        rationale: 'This is only the probability of rolling a 4.',
      },
    ],
    rationale:
      'These are independent events, so their probabilities are multiplied. The probability of a tail is \(\\(\frac{1}{2}\)\), and the probability of rolling a 4 is \(\\(\frac{1}{6}\)\). So, P(tail and 4) = \(\\(\frac{1}{2}\)\) * \(\\(\frac{1}{6}\)\) = \(\\(\frac{1}{12}\)\).',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A survey of 50 people shows that 35 like pop music, 25 like rock music, and 15 like both. How many people like neither?',
    correctAnswer: '5',
    rationale:
      'The number of people who like at least one is 35 (pop) + 25 (rock) - 15 (both) = 45. So, the number of people who like neither is 50 - 45 = 5.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: "The 'median' of a dataset is the:",
    answerOptions: [
      {
        text: 'Average value',
        isCorrect: false,
        rationale: 'This is the mean.',
      },
      {
        text: 'Most frequent value',
        isCorrect: false,
        rationale: 'This is the mode.',
      },
      {
        text: 'Middle value',
        isCorrect: true,
        rationale: 'The median is the middle value when the data is ordered.',
      },
      {
        text: 'Difference between the highest and lowest values',
        isCorrect: false,
        rationale: 'This is the range.',
      },
    ],
    rationale:
      'The median is the value that separates the higher half from the lower half of a data sample. When the data is ordered, it is the middle number.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'From a group of 5 people, a committee of 2 is to be chosen. How many different committees can be formed?',
    answerOptions: [
      {
        text: '10',
        isCorrect: true,
        rationale:
          'This is a combination problem. The formula is n! / (k!(n-k)!). 5! / (2!(3!)) = 120 / (2*6) = 10.',
      },
      {
        text: '20',
        isCorrect: false,
        rationale: 'This is a permutation (5P2).',
      },
      {
        text: '25',
        isCorrect: false,
        rationale: 'This is \(5^{2}\).',
      },
      {
        text: '7',
        isCorrect: false,
        rationale: 'This is 5+2.',
      },
    ],
    rationale:
      'This is a combination problem because the order of selection does not matter. The formula is C(n, k) = n! / (k!(n-k)!). C(5, 2) = 5! / (2!3!) = (5*4)/(2*1) = 10.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'A spinner has 5 equal sections: red, blue, green, yellow, purple. What is the probability of landing on a primary color (red, yellow, or blue)?',
    answerOptions: [
      {
        text: '\(\\(\frac{1}{5}\)\)',
        isCorrect: false,
        rationale: 'This is the probability of landing on one specific color.',
      },
      {
        text: '\(\\(\frac{2}{5}\)\)',
        isCorrect: false,
        rationale: 'This is the probability of landing on a secondary color.',
      },
      {
        text: '\(\\(\frac{3}{5}\)\)',
        isCorrect: true,
        rationale: 'There are 3 primary colors out of 5 total colors.',
      },
      {
        text: '\(\\(\frac{4}{5}\)\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'There are 3 favorable outcomes (red, yellow, blue) out of 5 possible outcomes. The probability is \(\\(\frac{3}{5}\)\).',
    challenge_tags: ['math-6'],
  },
];
