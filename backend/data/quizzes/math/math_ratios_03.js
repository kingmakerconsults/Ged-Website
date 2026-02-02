module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question:
      'In a survey, 4 out of 5 dentists recommend a certain toothpaste. Which of the following is an equivalent ratio?',
    answerOptions: [
      {
        text: '5:4',
        isCorrect: false,
        rationale: 'This is the inverse ratio.',
      },
      {
        text: '8:12',
        isCorrect: false,
        rationale: 'This simplifies to 2:3.',
      },
      {
        text: '12:15',
        isCorrect: true,
        rationale: 'Multiplying both parts of the ratio 4:5 by 3 gives 12:15.',
      },
      {
        text: '16:25',
        isCorrect: false,
        rationale: 'The second part is not a multiple of 5.',
      },
    ],
    rationale:
      'An equivalent ratio is found by multiplying both parts of the ratio by the same number. 4 * 3 = 12 and 5 * 3 = 15, so 12:15 is equivalent to 4:5.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A jacket is on sale for \\(72 after a 20% discount. What was the original price?',
    correctAnswer: '90',
    rationale:
      'If the jacket is 20% off, the sale price is 80% of the original price. Let P be the original price. 0.80 * P = \\)72. P = \\(72 / 0.80 = \\)90.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A machine can produce 150 widgets in 30 minutes. What is the production rate in widgets per hour?',
    answerOptions: [
      {
        text: '5',
        isCorrect: false,
        rationale: 'This is the rate in widgets per minute.',
      },
      {
        text: '180',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '300',
        isCorrect: true,
        rationale:
          'If it produces 150 in 30 minutes, it will produce twice as many in 60 minutes (1 hour). 150 * 2 = 300.',
      },
      {
        text: '4500',
        isCorrect: false,
        rationale: 'This is the result of multiplying 150 by 30.',
      },
    ],
    rationale:
      'There are 60 minutes in an hour. Since the machine produces 150 widgets in 30 minutes, it will produce 150 * 2 = 300 widgets in 60 minutes.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question:
      'A recipe calls for 1 cup of sugar to make 12 cookies. How much sugar is needed for 36 cookies?',
    correctAnswer: '3 cups',
    rationale:
      '36 cookies is 3 times the original recipe of 12 cookies. So, you need 3 times the amount of sugar: 1 cup * 3 = 3 cups.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A investment of 500 earns 4% simple interest per year. How much interest is earned after 3 years?',
    answerOptions: [
      {
        text: '\\(20\\)',
        isCorrect: false,
        rationale: 'This is the interest earned in only one year.',
      },
      {
        text: '40',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '\\(60\\)',
        isCorrect: true,
        rationale:
          'Interest per year is 0.04 * \\(500 = 20. Over 3 years, the total interest is \\)20 * 3 = 60.',
      },
      {
        text: '560',
        isCorrect: false,
        rationale:
          'This is the total amount after 3 years, not just the interest.',
      },
    ],
    rationale:
      'Simple interest is calculated as I = P * r * t. So, I = \\(500 * 0.04 * 3 =  60.\\)',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'In a class of 40 students, 25 are girls. What percentage of the class is boys?',
    answerOptions: [
      {
        text: '15%',
        isCorrect: false,
        rationale: 'This is the number of boys, not the percentage.',
      },
      {
        text: '37.5%',
        isCorrect: true,
        rationale:
          'There are 40 - 25 = 15 boys. The percentage is (15 / 40) * 100 = 37.5%.',
      },
      {
        text: '60%',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '62.5%',
        isCorrect: false,
        rationale: 'This is the percentage of girls in the class.',
      },
    ],
    rationale:
      'First, find the number of boys: 40 - 25 = 15. Then, calculate the percentage: (15 boys / 40 total students) * 100 = 0.375 * 100 = 37.5%.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A car is traveling at a constant speed of 65 miles per hour. How many miles will it travel in 2.5 hours?',
    correctAnswer: '162.5 miles',
    rationale:
      'Distance = Speed * Time. So, Distance = 65 mph * 2.5 hours = 162.5 miles.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question:
      'A garden has 18 rose bushes and 6 lily plants. What is the ratio of rose bushes to lily plants in simplest form?',
    answerOptions: [
      {
        text: '18:6',
        isCorrect: false,
        rationale: 'This ratio is not simplified.',
      },
      {
        text: '3:1',
        isCorrect: true,
        rationale:
          'Divide both sides of the ratio 18:6 by their greatest common divisor, 6.',
      },
      {
        text: '1:3',
        isCorrect: false,
        rationale: 'This is the ratio of lilies to roses.',
      },
      {
        text: '3:4',
        isCorrect: false,
        rationale: 'This is the ratio of roses to total plants.',
      },
    ],
    rationale:
      'The ratio is 18 rose bushes to 6 lily plants. To simplify, divide both numbers by 6. \\(\\(\frac{18}{6}\\) = 3, and \\(\\(\frac{6}{6}\\) = 1. The simplified ratio is 3:1.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'An item costs \\(120. With sales tax, the total cost is \\)127.20. What is the sales tax rate?',
    correctAnswer: '6%',
    rationale:
      'The tax amount is $127.20 - $120 = \\(7.20. The tax rate is (tax amount / original price) * 100 = (\\)7.20 / \\(120) * 100 = 0.06 * 100 = 6%.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'If a person burns 120 calories by walking 1 mile, how many miles must they walk to burn 300 calories?',
    answerOptions: [
      {
        text: '2 miles',
        isCorrect: false,
        rationale: 'This would burn 240 calories.',
      },
      {
        text: '2.5 miles',
        isCorrect: true,
        rationale:
          'Set up a proportion: \\(\\(\frac{120}{1}\\)\\( = 300/x. 120x = 300. x = \\)\\(\frac{300}{120}\\) = 2.5.',
      },
      {
        text: '3 miles',
        isCorrect: false,
        rationale: 'This would burn 360 calories.',
      },
      {
        text: '4 miles',
        isCorrect: false,
        rationale: 'This would burn 480 calories.',
      },
    ],
    rationale:
      'To find the number of miles, divide the total calories to be burned by the calories burned per mile: 300 calories / 120 calories/mile = 2.5 miles.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Which of the following deals is the best value?',
    answerOptions: [
      {
        text: '3 apples for 1.50',
        isCorrect: false,
        rationale: 'This is \\(0.50 per apple.\\)',
      },
      {
        text: '4 apples for 1.80',
        isCorrect: true,
        rationale: 'This is \\)0.45 per apple, which is the lowest price.',
      },
      {
        text: '5 apples for 2.50',
        isCorrect: false,
        rationale: 'This is \\(0.50 per apple.\\)',
      },
      {
        text: '2 apples for 1.00',
        isCorrect: false,
        rationale: 'This is \\(0.50 per apple.\\)',
      },
    ],
    rationale:
      'To find the best value, calculate the unit price for each option: A) \\(1.\\(\frac{50}{3}\\) = \\)0.50/apple, B) \\(1.\\(\frac{80}{4}\\) = \\)0.45/apple, C) \\(2.\\(\frac{50}{5}\\) = \\)0.50/apple, D) \\(1.\\(\frac{00}{2}\\) = \\)0.50/apple. The lowest price per apple is 0.45.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A population of bacteria doubles every hour. If there are 100 bacteria initially, how many will there be after 4 hours?',
    answerOptions: [
      {
        text: '400',
        isCorrect: false,
        rationale: 'This is 100*4.',
      },
      {
        text: '800',
        isCorrect: false,
        rationale: 'This is 100*2*4.',
      },
      {
        text: '1600',
        isCorrect: true,
        rationale:
          'Initial: 100. Hour 1: 200. Hour 2: 400. Hour 3: 800. Hour 4: 1600.',
      },
      {
        text: '100000000',
        isCorrect: false,
        rationale: 'This is \\(100^{4}\\).',
      },
    ],
    rationale:
      'This is an example of exponential growth. The population is multiplied by 2 each hour. After 4 hours, the population will be \\(100 \\(\times\\)\\)\\(2^4\\) = 100 \\(\times\\)\\(16\\) = 1600.',
    challenge_tags: ['math-1'],
  },
];
