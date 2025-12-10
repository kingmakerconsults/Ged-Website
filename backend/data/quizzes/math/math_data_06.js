module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'easy',
    question: 'Find the median of the data set: 20, 25, 15, 30, 20.',
    answerOptions: [
      {
        text: '15',
        isCorrect: false,
        rationale: 'This is the minimum value.',
      },
      {
        text: '20',
        isCorrect: true,
        rationale:
          'First, order the data: 15, 20, 20, 25, 30. The median is the middle value, 20.',
      },
      {
        text: '22',
        isCorrect: false,
        rationale: 'This is the mean.',
      },
      {
        text: '30',
        isCorrect: false,
        rationale: 'This is the maximum value.',
      },
    ],
    rationale:
      'To find the median, first order the numbers from least to greatest: 15, 20, 20, 25, 30. The median is the middle number, which is 20.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'What is the mode of the data set: 12, 15, 12, 18, 12, 20, 15?',
    correctAnswer: '12',
    rationale:
      'The mode is the value that appears most frequently. 12 appears 3 times, which is more than any other number in the set.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A test has 20 questions. If a student gets 80% correct, how many questions did they get wrong?',
    answerOptions: [
      {
        text: '4',
        isCorrect: true,
        rationale:
          'If 80% is correct, 20% is wrong. 20% of 20 is 0.20 * 20 = 4.',
      },
      {
        text: '5',
        isCorrect: false,
        rationale: 'This would be 75% correct.',
      },
      {
        text: '16',
        isCorrect: false,
        rationale: 'This is the number of questions answered correctly.',
      },
      {
        text: '20',
        isCorrect: false,
        rationale: 'This is the total number of questions.',
      },
    ],
    rationale:
      'If the student got 80% correct, they got 100% - 80% = 20% wrong. The number of questions they got wrong is 20% of 20, which is 0.20 * 20 = 4 questions.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Find the mean of the following numbers: 12, 15, 18, 21, 24.',
    correctAnswer: '18',
    rationale:
      'The sum of the numbers is 12+15+18+21+24 = 90. Divide by 5: $\\frac{90}{5}$ = 18. Since the numbers are evenly spaced, the mean is the middle number.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'A bag contains 10 red, 8 blue, and 2 green marbles. What is the probability of NOT drawing a blue marble?',
    answerOptions: [
      {
        text: '$\\frac{2}{5}$',
        isCorrect: false,
        rationale: 'This is the probability of drawing a blue marble.',
      },
      {
        text: '$\\frac{3}{5}$',
        isCorrect: true,
        rationale:
          'There are 12 non-blue marbles (10 red + 2 green) and 20 total marbles. The probability is $\\frac{12}{20}$, which is $\\frac{3}{5}$.',
      },
      {
        text: '$\\frac{1}{10}$',
        isCorrect: false,
        rationale: 'This is the probability of drawing a green marble.',
      },
      {
        text: '$\\frac{1}{2}$',
        isCorrect: false,
        rationale: 'This is the probability of drawing a red marble.',
      },
    ],
    rationale:
      'There are a total of 10 + 8 + 2 = 20 marbles. The number of non-blue marbles is 10 (red) + 2 (green) = 12. The probability is $\\frac{12}{20}$, which simplifies to $\\frac{3}{5}$.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A restaurant menu has 4 appetizers, 6 main courses, and 3 desserts. How many different three-course meals can be ordered?',
    answerOptions: [
      {
        text: '13',
        isCorrect: false,
        rationale: 'This is the sum of the choices.',
      },
      {
        text: '24',
        isCorrect: false,
        rationale: 'This is 4*6.',
      },
      {
        text: '72',
        isCorrect: true,
        rationale:
          'Multiply the number of choices for each course: 4 * 6 * 3 = 72.',
      },
      {
        text: '144',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'To find the total number of different meals, multiply the number of options for each course: 4 appetizers * 6 main courses * 3 desserts = 72 different meals.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      "A student's scores are 80, 85, 90, 95. What score is needed on the fifth test to achieve an average of 90?",
    correctAnswer: '100',
    rationale:
      'To have an average of 90 on 5 tests, the total score must be 5 * 90 = 450. The sum of the first four scores is 80+85+90+95 = 350. The fifth score must be 450 - 350 = 100.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the range of the data set: -8, -2, 0, 5, 10?',
    answerOptions: [
      {
        text: '2',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '8',
        isCorrect: false,
        rationale: 'This is 10-2.',
      },
      {
        text: '12',
        isCorrect: false,
        rationale: 'This is 10- (-2).',
      },
      {
        text: '18',
        isCorrect: true,
        rationale:
          'The range is the difference between the maximum (10) and minimum (-8). 10 - (-8) = 18.',
      },
    ],
    rationale:
      'The range is the difference between the highest and lowest values. Max = 10, Min = -8. Range = 10 - (-8) = 18.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A fair die is rolled. What is the probability of rolling a number less than 3?',
    correctAnswer: '$\\frac{1}{3}$',
    rationale:
      'The numbers less than 3 are 1 and 2. There are 2 favorable outcomes out of 6 possible outcomes. The probability is $\\frac{2}{6}$, which simplifies to $\\frac{1}{3}$.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'The median of a set of 7 numbers is 15. If six of the numbers are 8, 10, 12, 18, 20, 22, what is the seventh number?',
    answerOptions: [
      {
        text: '15',
        isCorrect: true,
        rationale:
          'For the median to be 15, it must be the middle number when ordered. The numbers are 8, 10, 12, __, 18, 20, 22. 15 fits in the middle.',
      },
      {
        text: '16',
        isCorrect: false,
        rationale:
          'This would also be in the middle, but the question implies a unique answer.',
      },
      {
        text: '14',
        isCorrect: false,
        rationale:
          'This would also be in the middle, but the question implies a unique answer.',
      },
      {
        text: 'Cannot be determined',
        isCorrect: false,
        rationale: 'It can be determined.',
      },
    ],
    rationale:
      'The median is the middle value of an ordered dataset. With 7 numbers, the median is the 4th number. Ordering the known numbers gives: 8, 10, 12, __, 18, 20, 22. For 15 to be the median, it must be the 4th number. Any number between 12 and 18 would also work, but 15 is the most direct answer.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      'Two dice are rolled. What is the probability that the sum of the numbers is 7?',
    answerOptions: [
      {
        text: '$\\frac{1}{36}$',
        isCorrect: false,
        rationale:
          'This is the probability of rolling a specific combination, like (1,6).',
      },
      {
        text: '$\\frac{1}{12}$',
        isCorrect: false,
        rationale: 'This is $\\frac{3}{36}$.',
      },
      {
        text: '$\\frac{1}{6}$',
        isCorrect: true,
        rationale:
          'There are 6 ways to get a sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). There are 36 total outcomes. P(sum=7) = $\\frac{6}{36}$ = $\\frac{1}{6}$.',
      },
      {
        text: '$\\frac{7}{36}$',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'There are 36 possible outcomes when rolling two dice. The combinations that sum to 7 are (1,6), (2,5), (3,4), (4,3), (5,2), and (6,1). There are 6 favorable outcomes. The probability is $\\frac{6}{36}$, which simplifies to $\\frac{1}{6}$.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'Which of the following is a true statement?',
    answerOptions: [
      {
        text: 'The mean is always one of the numbers in the data set.',
        isCorrect: false,
        rationale: 'The mean is often not one of the numbers.',
      },
      {
        text: 'The mode is always one of the numbers in the data set.',
        isCorrect: true,
        rationale:
          'The mode is the most frequent number in the data set, so it must be in the set.',
      },
      {
        text: 'The range is always one of the numbers in the data set.',
        isCorrect: false,
        rationale:
          'The range is a difference, not necessarily a value in the set.',
      },
      {
        text: 'The median is never one of the numbers in the data set.',
        isCorrect: false,
        rationale: 'The median is often one of the numbers.',
      },
    ],
    rationale:
      'The mode is defined as the value that appears most frequently in a data set. Therefore, it must be one of the values present in the set.',
    challenge_tags: ['math-6'],
  },
];
