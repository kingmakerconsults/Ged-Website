module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'easy',
    question: 'What is the mode of the data set: 10, 20, 30, 20, 10, 20?',
    answerOptions: [
      {
        text: '10',
        isCorrect: false,
        rationale: '10 appears twice, but 20 appears more.',
      },
      {
        text: '15',
        isCorrect: false,
        rationale: 'This is the median.',
      },
      {
        text: '18.33',
        isCorrect: false,
        rationale: 'This is the mean.',
      },
      {
        text: '20',
        isCorrect: true,
        rationale: 'The number 20 appears most frequently (3 times).',
      },
    ],
    rationale:
      'The mode is the value that appears most often in a data set. In this set, 20 appears three times, which is more than any other number.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question:
      'A bag has 5 red, 3 blue, and 2 green marbles. What is the probability of picking a blue marble?',
    correctAnswer: '\(\\(\frac{3}{10}\)\)',
    rationale:
      'There are 3 blue marbles and a total of 10 marbles (5+3+2). The probability is \(\\(\frac{3}{10}\)\).',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'Find the mean of the data set: 1, 1, 2, 3, 5, 8.',
    answerOptions: [
      {
        text: '2.5',
        isCorrect: false,
        rationale: 'This is the median.',
      },
      {
        text: '3.33',
        isCorrect: true,
        rationale: 'The sum is 20. \(\frac{20}{6}\) ≈ 3.33.',
      },
      {
        text: '1',
        isCorrect: false,
        rationale: 'This is the mode.',
      },
      {
        text: '7',
        isCorrect: false,
        rationale: 'This is the range.',
      },
    ],
    rationale:
      'To find the mean, add the numbers together (1+1+2+3+5+8 = 20) and divide by the number of values (6). 20 / 6 ≈ 3.33.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'What is the range of the data set: 1.5, 2.3, 0.8, 3.1, 1.9?',
    correctAnswer: '2.3',
    rationale:
      'The range is the difference between the maximum (3.1) and minimum (0.8) values. 3.1 - 0.8 = 2.3.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the median of the data set: 100, 200, 50, 300, 250?',
    answerOptions: [
      {
        text: '50',
        isCorrect: false,
        rationale: 'This is the minimum value.',
      },
      {
        text: '180',
        isCorrect: false,
        rationale: 'This is the mean.',
      },
      {
        text: '200',
        isCorrect: true,
        rationale:
          'Order the data: 50, 100, 200, 250, 300. The median is the middle value.',
      },
      {
        text: '250',
        isCorrect: false,
        rationale: 'This is the range.',
      },
    ],
    rationale:
      'First, order the numbers from least to greatest: 50, 100, 200, 250, 300. The median is the middle value in the ordered set, which is 200.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A test has 5 true/false questions. How many different ways can the test be answered?',
    answerOptions: [
      {
        text: '10',
        isCorrect: false,
        rationale: 'This is 5*2.',
      },
      {
        text: '25',
        isCorrect: false,
        rationale: 'This is \(5^{2}\).',
      },
      {
        text: '32',
        isCorrect: true,
        rationale:
          'There are 2 choices for each of the 5 questions. 2*2*2*2*2 = \(2^{5}\) = 32.',
      },
      {
        text: '120',
        isCorrect: false,
        rationale: 'This is 5!.',
      },
    ],
    rationale:
      'Each question has 2 possible answers (true or false). Since there are 5 questions, the total number of different ways to answer is 2 * 2 * 2 * 2 * 2 = $2^{5} = 32.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'The mean of five numbers is 12. Four of the numbers are 10, 12, 14, and 16. What is the fifth number?',
    correctAnswer: '8',
    rationale:
      'The sum of the five numbers must be 5 * 12 = 60. The sum of the four known numbers is 10+12+14+16 = 52. The fifth number is 60 - 52 = 8.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'What is the probability of drawing an Ace from a standard 52-card deck?',
    answerOptions: [
      {
        text: '\(\\(\frac{1}{52}\)\)',
        isCorrect: false,
        rationale: 'This is for a specific Ace.',
      },
      {
        text: '\(\\(\frac{1}{13}\)\)',
        isCorrect: true,
        rationale:
          'There are 4 Aces in a 52-card deck. \(\\(\frac{4}{52}\) simplifies to \\(\frac{1}{13}\)\).',
      },
      {
        text: '\(\\(\frac{1}{4}\)\)',
        isCorrect: false,
        rationale: 'This is the probability of drawing a specific suit.',
      },
      {
        text: '\(\\(\frac{4}{13}\)\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'A standard deck of 52 cards has 4 Aces. The probability is the number of Aces divided by the total number of cards: \(\\(\frac{4}{52}\)\), which simplifies to \(\\(\frac{1}{13}\)\).',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A jar has 15 red marbles and 5 green marbles. What are the odds in favor of drawing a red marble?',
    correctAnswer: '3:1',
    rationale:
      'The odds in favor are the ratio of favorable outcomes to unfavorable outcomes. There are 15 red (favorable) and 5 green (unfavorable). The ratio is 15:5, which simplifies to 3:1.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'Out of 800 students, 240 are in the band. What percentage of students are in the band?',
    answerOptions: [
      {
        text: '24%',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '30%',
        isCorrect: true,
        rationale: '(240 / 800) * 100 = 0.3 * 100 = 30%.',
      },
      {
        text: '33.3%',
        isCorrect: false,
        rationale: 'This is \(\\(\frac{1}{3}\)\).',
      },
      {
        text: '40%',
        isCorrect: false,
        rationale: 'This would be 320 students.',
      },
    ],
    rationale:
      'To find the percentage, divide the number of students in the band by the total number of students and multiply by 100: (240 / 800) * 100 = 0.3 * 100 = 30%.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question: 'Two events are independent if:',
    answerOptions: [
      {
        text: 'They have the same probability.',
        isCorrect: false,
        rationale: 'Probabilities do not determine independence.',
      },
      {
        text: 'The outcome of one event does not affect the outcome of the other.',
        isCorrect: true,
        rationale: 'This is the definition of independent events.',
      },
      {
        text: 'They cannot happen at the same time.',
        isCorrect: false,
        rationale: 'These are mutually exclusive events.',
      },
      {
        text: 'The outcome of one event is dependent on the outcome of the other.',
        isCorrect: false,
        rationale: 'This is the definition of dependent events.',
      },
    ],
    rationale:
      'In probability, two events are independent if the occurrence of one does not affect the probability of the occurrence of the other.',
    challenge_tags: ['math-6'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'If the probability that it will snow is 35%, what is the probability that it will not snow?',
    answerOptions: [
      {
        text: '35%',
        isCorrect: false,
        rationale: 'This is the probability it will snow.',
      },
      {
        text: '55%',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '65%',
        isCorrect: true,
        rationale: '100% - 35% = 65%.',
      },
      {
        text: '70%',
        isCorrect: false,
        rationale: 'This is double the probability.',
      },
    ],
    rationale:
      'The total probability of all possible outcomes is 100%. If the probability of snow is 35%, the probability of no snow is 100% - 35% = 65%.',
    challenge_tags: ['math-6'],
  },
];
