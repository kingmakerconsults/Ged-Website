module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the result of 805 - 102?',
    answerOptions: [
      {
        text: '703',
        isCorrect: true,
        rationale: '805 - 102 = 703.',
      },
      {
        text: '705',
        isCorrect: false,
        rationale: 'This is 805 - 100.',
      },
      {
        text: '693',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '907',
        isCorrect: false,
        rationale: 'This is the sum.',
      },
    ],
    rationale:
      'This is a straightforward subtraction problem. 805 - 102 = 703.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'Convert 0.45 to a fraction in simplest form.',
    correctAnswer: '\\(\\frac{9}{20}\\)',
    rationale:
      '0.45 is \\(\\frac{45}{100}\\). Both numbers are divisible by 5. \\(\\frac{45}{5} = 9\\) and \\(\\frac{100}{5} = 20\\). So, the fraction is \\(\\frac{9}{20}\\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'The temperature was -5°F in the morning and rose to 12°F in the afternoon. What was the change in temperature?',
    answerOptions: [
      {
        text: '7°F',
        isCorrect: false,
        rationale: 'This is 12-5.',
      },
      {
        text: '17°F',
        isCorrect: true,
        rationale:
          'The change is the difference between the final and initial temperatures: 12 - (-5) = 17.',
      },
      {
        text: '-17°F',
        isCorrect: false,
        rationale: 'The temperature rose, so the change is positive.',
      },
      {
        text: '-7°F',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'To find the change in temperature, subtract the initial temperature from the final temperature: 12°F - (-5°F) = 12°F + 5°F = 17°F.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'Find the least common multiple (LCM) of 8 and 10.',
    correctAnswer: '40',
    rationale:
      'Multiples of 8 are 8, 16, 24, 32, 40... Multiples of 10 are 10, 20, 30, 40... The smallest number they have in common is 40.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the value of \\(|-10| - |5|\\)?',
    answerOptions: [
      {
        text: '-15',
        isCorrect: false,
        rationale: 'This is -10-5.',
      },
      {
        text: '-5',
        isCorrect: false,
        rationale: 'This is 5-10.',
      },
      {
        text: '5',
        isCorrect: true,
        rationale: '|-10| = 10 and |5| = 5. So, 10 - 5 = 5.',
      },
      {
        text: '15',
        isCorrect: false,
        rationale: 'This is the sum of the absolute values.',
      },
    ],
    rationale:
      'First, evaluate the absolute values: |-10| = 10 and |5| = 5. Then, perform the subtraction: 10 - 5 = 5.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A store has a 30% discount on all items. You also have a coupon for an additional 10% off the discounted price. What is the total percent discount?',
    answerOptions: [
      {
        text: '40%',
        isCorrect: false,
        rationale: 'Discounts are applied sequentially, not added.',
      },
      {
        text: '37%',
        isCorrect: true,
        rationale:
          'After a 30% discount, the price is 70% of the original. An additional 10% off this price is 0.10 * 0.70 = 0.07, or 7%. Total discount is 30% + 7% = 37%.',
      },
      {
        text: '35%',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '33%',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Let the original price be P. The first discount makes the price 0.70P. The second discount is 10% off this price, so you pay 90% of it: 0.90 * (0.70P) = 0.63P. This means the total discount is 1 - 0.63 = 0.37, or 37%.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A car travels 220 miles on 8 gallons of gas. What is its fuel efficiency in miles per gallon?',
    correctAnswer: '27.5 MPG',
    rationale:
      'Divide the total miles by the number of gallons: 220 miles / 8 gallons = 27.5 miles per gallon.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Which number is an irrational number?',
    answerOptions: [
      {
        text: '\\(\\sqrt{25}\\)',
        isCorrect: false,
        rationale: 'The square root of 25 is 5, which is a rational number.',
      },
      {
        text: '\\(\\pi\\)',
        isCorrect: true,
        rationale:
          'Pi is a non-terminating, non-repeating decimal, which is the definition of an irrational number.',
      },
      {
        text: '0.333...',
        isCorrect: false,
        rationale:
          'This is a repeating decimal, which is a rational number (\\(\\frac{1}{3}\\)).',
      },
      {
        text: '\\(\\frac{7}{2}\\)',
        isCorrect: false,
        rationale: 'This is a fraction, which is a rational number.',
      },
    ],
    rationale:
      'An irrational number cannot be expressed as a simple fraction. Pi is a famous example of an irrational number.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question: 'Evaluate: \\((2^3 + 2)^2\\).',
    correctAnswer: '100',
    rationale:
      'Follow the order of operations. Inside the parentheses: \\(2^3\\) = 8, so 8+2 = 10. Then square the result: \\(10^2\\) = 100.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question: 'What is 150% of 60?',
    answerOptions: [
      {
        text: '40',
        isCorrect: false,
        rationale:
          'This comes from dividing 60 by 1.5 instead of finding 150% of 60.',
      },
      {
        text: '90',
        isCorrect: true,
        rationale: '150% is 1.5. So, 1.5 * 60 = 90.',
      },
      {
        text: '100',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '210',
        isCorrect: false,
        rationale: 'This is 150+60.',
      },
    ],
    rationale:
      'To find 150% of 60, convert the percentage to a decimal (1.5) and multiply: 1.5 * 60 = 90.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Which expression is not equivalent to the others?',
    answerOptions: [
      {
        text: '0.75',
        isCorrect: false,
        rationale: 'This is equivalent to \\(\\frac{3}{4}\\).',
      },
      {
        text: '75%',
        isCorrect: false,
        rationale: 'This is equivalent to \\(\\frac{3}{4}\\).',
      },
      {
        text: '\\(\\frac{3}{4}\\)',
        isCorrect: false,
        rationale: 'This is the base fraction.',
      },
      {
        text: '\\(\\frac{4}{3}\\)',
        isCorrect: true,
        rationale:
          '\\(\\frac{4}{3}\\) is greater than 1, while the others are all equal to 0.75.',
      },
    ],
    rationale:
      'The values 0.75, 75%, and \\(\\frac{3}{4}\\) are all equivalent. The fraction \\(\\frac{4}{3}\\) is equal to 1.333..., which is different.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'You have $1000 in a savings account. It grows by 2% each year. How much will be in the account after 2 years?',
    answerOptions: [
      {
        text: '1020.00',
        isCorrect: false,
        rationale: 'This is the amount after one year.',
      },
      {
        text: '1040.00',
        isCorrect: false,
        rationale: 'This is simple interest, not compound.',
      },
      {
        text: '1040.40',
        isCorrect: true,
        rationale: 'Year 1: 1000 * 1.02 = 1020. Year 2: 1020 * 1.02 = 1040.40.',
      },
      {
        text: '1020.20',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'This is a compound growth problem. After the first year, the balance is 1000 * 1.02 = 1020. After the second year, the new balance is 1020 * 1.02 = 1040.40.',
    challenge_tags: ['math-1'],
  },
];
