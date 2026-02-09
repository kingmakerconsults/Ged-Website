module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question:
      'A classroom has 14 girls and 16 boys. What is the ratio of boys to girls in simplest form?',
    answerOptions: [
      {
        text: '14:16',
        isCorrect: false,
        rationale: 'This is the ratio of girls to boys, not simplified.',
      },
      {
        text: '7:8',
        isCorrect: false,
        rationale: 'This is the simplified ratio of girls to boys.',
      },
      {
        text: '8:7',
        isCorrect: true,
        rationale:
          'The ratio is 16:14, which simplifies to 8:7 by dividing both by 2.',
      },
      {
        text: '16:30',
        isCorrect: false,
        rationale: 'This is the ratio of boys to total students.',
      },
    ],
    rationale:
      'The ratio of boys to girls is 16 to 14. To simplify, find the greatest common divisor, which is 2. Divide both parts of the ratio by 2: \\(\\frac{16}{2} = 8\\) and \\(\\frac{14}{2} = 7\\). The simplified ratio is 8:7.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A dinner bill is \\(85\\). You want to leave an 18% tip. How much is the tip?',
    correctAnswer: '15.30',
    rationale:
      'To find the tip amount, convert the percentage to a decimal and multiply by the bill: 0.18 * \\(85\\) = \\(15.30\\).',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A model airplane has a scale of 1:72. If the model is 10 inches long, how long is the actual airplane in feet?',
    answerOptions: [
      {
        text: '60 feet',
        isCorrect: true,
        rationale:
          'The actual length is 10 * 72 = 720 inches. To convert to feet, divide by 12: 720 / 12 = 60 feet.',
      },
      {
        text: '72 feet',
        isCorrect: false,
        rationale: 'This would be for a 1-foot model.',
      },
      {
        text: '720 feet',
        isCorrect: false,
        rationale: 'This is the length in inches.',
      },
      {
        text: '86.4 feet',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'First, find the actual length in inches: 10 inches * 72 = 720 inches. Then, convert inches to feet by dividing by 12: 720 inches / 12 inches/foot = 60 feet.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'Solve for y: \\(\\frac{5}{2} = \\frac{y}{10}\\).',
    correctAnswer: '25',
    rationale:
      'To get from 2 to 10 in the denominator, you multiply by 5. So, multiply the numerator by 5 as well: 5 * 5 = 25.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'The number of members in a club increased by 150%, from 20 to what new number?',
    answerOptions: [
      {
        text: '30',
        isCorrect: false,
        rationale: 'This is a 50% increase.',
      },
      {
        text: '35',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '50',
        isCorrect: true,
        rationale:
          'A 150% increase means the new number is 250% of the original. 2.50 * 20 = 50. Or, the increase is 1.50*20=30, so the new number is 20+30=50.',
      },
      {
        text: '200',
        isCorrect: false,
        rationale: 'This is a 900% increase.',
      },
    ],
    rationale:
      'A 150% increase means the amount of increase is 1.50 times the original number. Increase = 1.50 * 20 = 30. The new number is the original number plus the increase: 20 + 30 = 50.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'If a construction crew can pave 2 miles of road in 5 hours, how many hours will it take them to pave 7 miles?',
    answerOptions: [
      {
        text: '14 hours',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '15 hours',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '17.5 hours',
        isCorrect: true,
        rationale:
          'The rate is 5 hours / 2 miles = 2.5 hours per mile. For 7 miles, it will take 7 * 2.5 = 17.5 hours.',
      },
      {
        text: '20 hours',
        isCorrect: false,
        rationale: 'This would be for 8 miles.',
      },
    ],
    rationale:
      'First, find the unit rate of paving: 5 hours / 2 miles = 2.5 hours per mile. Then, multiply this rate by the desired distance: 2.5 hours/mile * 7 miles = 17.5 hours.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A product is marked up 25% from its wholesale price of $80. What is the retail price?',
    correctAnswer: '100',
    rationale:
      'The markup is 25% of $80, which is 0.25 \\(\times\\) 80 = 20. The retail price is the wholesale price plus the markup: $80 + $20 = $100.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question:
      'A poll shows that 6 out of 10 people prefer summer over winter. What is this ratio in simplest form?',
    answerOptions: [
      {
        text: '6:10',
        isCorrect: false,
        rationale: 'This ratio is not simplified.',
      },
      {
        text: '3:5',
        isCorrect: true,
        rationale: 'Divide both parts of the ratio 6:10 by 2.',
      },
      {
        text: '5:3',
        isCorrect: false,
        rationale: 'This is the inverse ratio.',
      },
      {
        text: '2:5',
        isCorrect: false,
        rationale:
          'This is the ratio of people who prefer winter to the total.',
      },
    ],
    rationale:
      'The ratio is 6 to 10. Both numbers are divisible by 2. \\(\frac{6}{2}\\) = 3 and \\(\frac{10}{2}\\) = 5. The simplified ratio is 3:5.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A car rental company charges $50 per day. If a customer paid $250, how many days did they rent the car for?',
    correctAnswer: '5 days',
    rationale:
      'Divide the total cost by the daily rate: $250 / $50 per day = 5 days.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'If a 12-ounce bottle of shampoo costs 3.60, what is the price per ounce?',
    answerOptions: [
      {
        text: '\\(0.25\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '0.30',
        isCorrect: true,
        rationale:
          'Divide the total cost by the number of ounces: 3.60 / 12 oz = 0.30 per oz.',
      },
      {
        text: '\\(0.36\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '3.00',
        isCorrect: false,
        rationale: 'This would be the price for 10 ounces.',
      },
    ],
    rationale:
      'To find the price per ounce, divide the total cost by the number of ounces: 3.60 / 12 ounces = $0.30 per ounce.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      "The ratio of an object's weight on Mars to its weight on Earth is approximately 2:5. If a person weighs 180 pounds on Earth, what would they weigh on Mars?",
    answerOptions: [
      {
        text: '36 pounds',
        isCorrect: false,
        rationale: 'This would be a 1:5 ratio.',
      },
      {
        text: '72 pounds',
        isCorrect: true,
        rationale:
          'Set up the proportion \\(\\(\frac{2}{5}\\) = x/180. 5x = 360. x = 72.',
      },
      {
        text: '90 pounds',
        isCorrect: false,
        rationale: 'This would be a 1:2 ratio.',
      },
      {
        text: '450 pounds',
        isCorrect: false,
        rationale: 'This is 180 * 5 / 2.',
      },
    ],
    rationale:
      'Set up a proportion: \\(\\frac{2 \\text{ (Mars)}}{5 \\text{ (Earth)}} = \\frac{x \\text{ pounds (Mars)}}{180 \\text{ pounds (Earth)}}\\). Cross-multiply: \\(5x = 2 \\(\times\\) 180\\), so \\(5x = 360\\). Divide by 5: \\(x = 72 pounds.\\)',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A company with 300 employees finds that 24 of them are left-handed. What percentage of employees are left-handed?',
    answerOptions: [
      {
        text: '8%',
        isCorrect: true,
        rationale: '(24 / 300) * 100 = 0.08 * 100 = 8%.',
      },
      {
        text: '12.5%',
        isCorrect: false,
        rationale: 'This is \\(\\(\frac{24}{192}\\).',
      },
      {
        text: '24%',
        isCorrect: false,
        rationale: 'This is the number of left-handed employees.',
      },
      {
        text: '92%',
        isCorrect: false,
        rationale: 'This is the percentage of right-handed employees.',
      },
    ],
    rationale:
      'To find the percentage, divide the number of left-handed employees by the total number of employees and multiply by 100: (24 / 300) * 100 = 0.08 * 100 = 8%.',
    challenge_tags: ['math-1'],
  },
];
