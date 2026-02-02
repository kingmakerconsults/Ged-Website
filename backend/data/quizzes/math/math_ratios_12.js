module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question:
      'In a class, there are 20 boys and 25 girls. What is the ratio of boys to girls in simplest form?',
    answerOptions: [
      {
        text: '20:25',
        isCorrect: false,
        rationale: 'This is not simplified.',
      },
      {
        text: '4:5',
        isCorrect: true,
        rationale: 'Divide both parts by 5.',
      },
      {
        text: '5:4',
        isCorrect: false,
        rationale: 'This is girls to boys.',
      },
      {
        text: '4:9',
        isCorrect: false,
        rationale: 'This is boys to total students.',
      },
    ],
    rationale:
      'The ratio of boys to girls is 20:25. The greatest common divisor is 5. \(\\(\frac{20}{5}\)\) = 4 and \(\\(\frac{25}{5}\)\) = 5. The simplified ratio is 4:5.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'A book costs \(18. The sales tax is 5%. What is the total cost?',
    correctAnswer: '18.90',
    rationale:
      'The tax is 0.05 * \)18 = \(0.90. The total cost is \)18 + \(0.90 = \)18.90.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A car travels 300 miles using 12 gallons of gas. How many miles per gallon does the car get?',
    answerOptions: [
      {
        text: '20 mpg',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '25 mpg',
        isCorrect: true,
        rationale: '300 miles / 12 gallons = 25 mpg.',
      },
      {
        text: '30 mpg',
        isCorrect: false,
        rationale: 'This would be for 10 gallons.',
      },
      {
        text: '36 mpg',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'To find miles per gallon, divide the distance by the gallons used: 300 miles / 12 gallons = 25 mpg.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question:
      'A recipe for lemonade uses 1 cup of lemon juice for every 4 cups of water. If you use 3 cups of lemon juice, how much water do you need?',
    correctAnswer: '12 cups',
    rationale:
      'The ratio is 1:4. If you use 3 times the lemon juice, you need 3 times the water: 4 * 3 = 12.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'An item is priced at 150. It is on sale for 20% off. What is the final price after the discount?',
    answerOptions: [
      {
        text: '\(120\)',
        isCorrect: true,
        rationale: 'The discount is 0.20 * 150 = \(30. 150 - 30 = \)120.',
      },
      {
        text: '30',
        isCorrect: false,
        rationale: 'This is the discount amount.',
      },
      {
        text: '\(130\)',
        isCorrect: false,
        rationale: 'This is a 20 discount.',
      },
      {
        text: '\(180\)',
        isCorrect: false,
        rationale: 'This is a 20% markup.',
      },
    ],
    rationale:
      'Calculate the discount: 20% of \(150 is 0.20 * 150 = \)30. Subtract the discount from the original price: $150 - $30 = 120.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'Out of 50 people, 15 have blue eyes. What percentage of people have blue eyes?',
    answerOptions: [
      {
        text: '15%',
        isCorrect: false,
        rationale: 'This is the number of people.',
      },
      {
        text: '30%',
        isCorrect: true,
        rationale: '(15 / 50) * 100 = 0.3 * 100 = 30%.',
      },
      {
        text: '35%',
        isCorrect: false,
        rationale: "This is the number of people who don't have blue eyes.",
      },
      {
        text: '70%',
        isCorrect: false,
        rationale: "This is the percentage of people who don't have blue eyes.",
      },
    ],
    rationale:
      'To find the percentage, divide the number of people with blue eyes by the total number of people and multiply by 100: (15 / 50) * 100 = 0.3 * 100 = 30%.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A population decreased from 800 to 760. What was the percent decrease?',
    correctAnswer: '5%',
    rationale: 'The decrease is 40. (40 / 800) * 100 = 0.05 * 100 = 5%.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'Solve the proportion: \(\\(\frac{1}{6}\)\) = \\(\frac{5}{x}\).',
    answerOptions: [
      {
        text: '5',
        isCorrect: false,
        rationale: 'This is the numerator.',
      },
      {
        text: '6',
        isCorrect: false,
        rationale: 'This is the denominator.',
      },
      {
        text: '30',
        isCorrect: true,
        rationale: 'Cross-multiply: 1*x = 6*5 -> x=30.',
      },
      {
        text: '1.2',
        isCorrect: false,
        rationale: 'This is \(\\(\frac{6}{5}\)\).',
      },
    ],
    rationale:
      'To solve for x, you can cross-multiply: 1 * x = 6 * 5, which means x = 30.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A map scale is 1 cm : 15 km. The distance between two cities is 12 cm. What is the actual distance?',
    correctAnswer: '180 km',
    rationale: '12 cm * 15 km/cm = 180 km.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A store buys a hat for \(10 and sells it for \)16. What is the percent markup?',
    answerOptions: [
      {
        text: '6%',
        isCorrect: false,
        rationale: 'This is the markup amount in dollars.',
      },
      {
        text: '37.5%',
        isCorrect: false,
        rationale: 'This is \(\\(\frac{6}{16}\)\).',
      },
      {
        text: '60%',
        isCorrect: true,
        rationale: 'The markup is \(6. (\\(\frac{6}{10}\))*100 = 60%.',
      },
      {
        text: '160%',
        isCorrect: false,
        rationale: 'This is the selling price as a percentage of the cost.',
      },
    ],
    rationale:
      'The markup amount is \)16 - \(10 = \)6. The percent markup is (markup / original cost) * 100 = ($6 / 10) * 100 = 0.6 * 100 = 60%.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    question:
      'The ratio of red to blue marbles is 3:5. If there are 25 blue marbles, how many red marbles are there?',
    answerOptions: [
      {
        text: '15',
        isCorrect: true,
        rationale:
          'The ratio of blue marbles is 5 times the ratio number (\(\\(\frac{25}{5}\)\)=5), so the number of red marbles is 3*5=15.',
      },
      {
        text: '25',
        isCorrect: false,
        rationale: 'This is the number of blue marbles.',
      },
      {
        text: '40',
        isCorrect: false,
        rationale: 'This would be the total number of marbles.',
      },
      {
        text: '9',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Set up the proportion: \(\\frac{3 \\text{ red}}{5 \\text{ blue}} = \\frac{x \\text{ red}}{25 \\text{ blue}}\). Cross-multiply: \(5x = 3 \\(\times\) 25 = 75\). Divide by 5: \(x = 15.\)',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A recipe for 4 people requires 500g of pasta. How much pasta is needed for 10 people?',
    answerOptions: [
      {
        text: '1000g',
        isCorrect: false,
        rationale: 'This is for 8 people.',
      },
      {
        text: '1250g',
        isCorrect: true,
        rationale: '10 people is 2.5 times the recipe. 2.5 * 500 = 1250g.',
      },
      {
        text: '2000g',
        isCorrect: false,
        rationale: 'This is for 16 people.',
      },
      {
        text: '2500g',
        isCorrect: false,
        rationale: 'This is for 20 people.',
      },
    ],
    rationale:
      'First, find the amount of pasta per person: 500g / 4 people = 125g/person. Then, multiply by the number of people: 125g/person * 10 people = 1250g.',
    challenge_tags: ['math-1'],
  },
];
