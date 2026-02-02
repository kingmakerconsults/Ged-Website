module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the result of 305 + 198?',
    answerOptions: [
      {
        text: '403',
        isCorrect: false,
        rationale: 'This is 305+98.',
      },
      {
        text: '503',
        isCorrect: true,
        rationale: '305 + 198 = 503.',
      },
      {
        text: '493',
        isCorrect: false,
        rationale: 'This is 305+188.',
      },
      {
        text: '107',
        isCorrect: false,
        rationale: 'This is the difference.',
      },
    ],
    rationale: 'This is a basic addition problem. 305 + 198 = 503.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'What is 10% of 350?',
    correctAnswer: '35',
    rationale:
      'To find 10% of a number, you can move the decimal point one place to the left. 10% of 350 is 35.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'A lunch bill is $42.00. How much is a 20% tip?',
    answerOptions: [
      {
        text: '$4.20',
        isCorrect: false,
        rationale: 'This would be a 10% tip.',
      },
      {
        text: '$8.40',
        isCorrect: true,
        rationale: 'A 20% tip is 0.20 \(\times\) 42.00 = 8.40.',
      },
      {
        text: '$6.30',
        isCorrect: false,
        rationale: 'This would be a 15% tip.',
      },
      {
        text: '$50.40',
        isCorrect: false,
        rationale: 'This is the total bill with the tip.',
      },
    ],
    rationale:
      'To calculate the tip, convert the percentage to a decimal and multiply by the bill amount: 0.20 \(\times\) 42.00 = 8.40.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Evaluate: \(60 \\(\div\) (5 \\(\times\) 3) + 2\).',
    correctAnswer: '6',
    rationale:
      'Order of operations (PEMDAS): Parentheses (5 × 3 = 15), Division (\(\\(\frac{60}{15}\)\) = 4), Addition (4 + 2 = 6).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Which of the following numbers is the smallest?',
    answerOptions: [
      {
        text: '0.5',
        isCorrect: false,
        rationale: 'This is the largest.',
      },
      {
        text: '\(\frac{1}{3}\)',
        isCorrect: true,
        rationale: '\(\frac{1}{3}\) is approx 0.333, which is the smallest.',
      },
      {
        text: '40%',
        isCorrect: false,
        rationale: '40% is 0.4.',
      },
      {
        text: '0.45',
        isCorrect: false,
        rationale: 'This is 0.45.',
      },
    ],
    rationale:
      'To compare, convert all values to decimals: \(\frac{1}{3}\) ≈ 0.333, 40% = 0.4. The smallest value is 0.333..., which is \(\frac{1}{3}\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A population of a town was 10,000. It increased by 10% one year, and then decreased by 10% the next year. What is the population after the two years?',
    answerOptions: [
      {
        text: '10,000',
        isCorrect: false,
        rationale:
          "The decrease is calculated on the larger population, so it won't return to the original.",
      },
      {
        text: '9,900',
        isCorrect: true,
        rationale: 'Year 1: 10000*1.1=11000. Year 2: 11000*0.9=9900.',
      },
      {
        text: '9,000',
        isCorrect: false,
        rationale: 'This is a 10% decrease from the original.',
      },
      {
        text: '11,000',
        isCorrect: false,
        rationale: 'This is the population after the first year.',
      },
    ],
    rationale:
      'After the first year, the population is 10,000 * 1.10 = 11,000. For the second year, the 10% decrease is calculated on the new population: 11,000 * (1 - 0.10) = 11,000 * 0.90 = 9,900.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the result of multiplying \(\frac{1}{2}\) by \(\frac{3}{4}\)?',
    correctAnswer: '\(\frac{3}{8}\)',
    rationale:
      'To multiply fractions, multiply the numerators together and the denominators together: (1*3) / (2*4) = \(\frac{3}{8}\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: "What is the number for 'five thousand two hundred six'?",
    answerOptions: [
      {
        text: '5260',
        isCorrect: false,
        rationale: 'This is five thousand two hundred sixty.',
      },
      {
        text: '5206',
        isCorrect: true,
        rationale:
          'This correctly places the digits in the thousands, hundreds, and ones places.',
      },
      {
        text: '5026',
        isCorrect: false,
        rationale: 'This is five thousand twenty-six.',
      },
      {
        text: '5200.6',
        isCorrect: false,
        rationale: 'This is an incorrect representation.',
      },
    ],
    rationale:
      'The number is composed of 5 thousands, 2 hundreds, and 6 ones, which is written as 5,206.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      "A company's total expenses are 30,000. If salaries account for 65% of the expenses, how much is spent on salaries?",
    correctAnswer: '19,500',
    rationale:
      'To find the amount spent on salaries, multiply the total expenses by the percentage: 30,000 \(\times\) 0.65 = 19,500.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is \(\sqrt{49}\) + \(3^2\)?',
    answerOptions: [
      {
        text: '13',
        isCorrect: false,
        rationale: 'This is 7+6.',
      },
      {
        text: '16',
        isCorrect: true,
        rationale: '\(\sqrt{49}\) = 7 and \(3^2\) = 9. So, 7 + 9 = 16.',
      },
      {
        text: '25',
        isCorrect: false,
        rationale: 'This is \((7+3)^2\).',
      },
      {
        text: '58',
        isCorrect: false,
        rationale: 'This is 49+9.',
      },
    ],
    rationale:
      'First, evaluate the square root and the exponent: \(\sqrt{49}\) = 7 and \(3^2\) = 9. Then, add the results: 7 + 9 = 16.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A recipe for a batch of 24 cookies needs 1.5 cups of sugar. If you only have 1 cup of sugar, how many cookies can you make?',
    answerOptions: [
      {
        text: '12',
        isCorrect: false,
        rationale: 'This is half the recipe.',
      },
      {
        text: '16',
        isCorrect: true,
        rationale:
          'The ratio is 24 cookies / 1.5 cups. With 1 cup, you can make 24 \(\div\) 1.5 = 16 cookies.',
      },
      {
        text: '18',
        isCorrect: false,
        rationale: 'This is \(\frac{3}{4}\) of the recipe.',
      },
      {
        text: '20',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'The ratio of cookies to sugar is 24 cookies / 1.5 cups = 16 cookies per cup. With 1 cup of sugar, you can make 16 cookies.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the absolute value of the difference between 10 and 20?',
    answerOptions: [
      {
        text: '-10',
        isCorrect: false,
        rationale: 'Absolute value cannot be negative.',
      },
      {
        text: '10',
        isCorrect: true,
        rationale:
          'The difference is 10-20 = -10. The absolute value of -10 is 10.',
      },
      {
        text: '20',
        isCorrect: false,
        rationale: 'This is one of the numbers.',
      },
      {
        text: '30',
        isCorrect: false,
        rationale: 'This is the sum.',
      },
    ],
    rationale:
      'The difference between 10 and 20 is 10 - 20 = -10. The absolute value of -10, written as |-10|, is 10.',
    challenge_tags: ['math-1'],
  },
];
