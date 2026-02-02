module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the perimeter of a square if one side is 10cm?',
    answerOptions: [
      {
        text: '10 cm',
        isCorrect: false,
        rationale: 'This is the length of one side.',
      },
      {
        text: '20 cm',
        isCorrect: false,
        rationale: 'This is the sum of two sides.',
      },
      {
        text: '40 cm',
        isCorrect: true,
        rationale: 'Perimeter = 4 * side = 4 * 10 = 40.',
      },
      {
        text: '100 cm',
        isCorrect: false,
        rationale: 'This is the area.',
      },
    ],
    rationale:
      'A square has four equal sides, so its perimeter is 4 times the length of one side. P = 4 * 10 cm = 40 cm.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the area of a circle with a diameter of 12 inches. Use 3.14 for \\(\\pi\\).',
    correctAnswer: '113.04 \\(in^2\\)',
    rationale:
      'The radius is half the diameter, so r = 6 inches. Area = pi * \\(r^{2}\\) = 3.14 * \\(6^{2}\\) = 113.04 \\(in^{2}\\).',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the volume of a sphere with a radius of 5 cm? Use 3.14 for \\(\\pi and the formula V = \\(\frac{4}{3}\\)\\pi \\(r^3\\).',
    answerOptions: [
      {
        text: '314 \\(cm^2\\)',
        isCorrect: false,
        rationale: 'This is the surface area.',
      },
      {
        text: '523.33 \\(cm^3\\)',
        isCorrect: true,
        rationale: 'V = (4/3) * 3.14 * 5^3 = 523.33.',
      },
      {
        text: '1256 \\(cm^3\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '1570 \\(cm^3\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Using the formula, V = (4/3) * pi * r^3. V = (4/3) * 3.14 * 125 ≈ 523.33 cm^3.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'How many grams are in a kilogram?',
    correctAnswer: '1000',
    rationale:
      "The prefix 'kilo-' means 1000. There are 1000 grams in a kilogram.",
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'If a right angle is divided into two smaller angles and one of them is 35°, what is the measure of the other angle?',
    answerOptions: [
      {
        text: '35°',
        isCorrect: false,
        rationale: 'This is the measure of the given angle.',
      },
      {
        text: '55°',
        isCorrect: true,
        rationale:
          'The two angles are complementary (add up to 90°). 90 - 35 = 55.',
      },
      {
        text: '145°',
        isCorrect: false,
        rationale: 'This would be the supplementary angle.',
      },
      {
        text: '90°',
        isCorrect: false,
        rationale: 'This is the measure of the original right angle.',
      },
    ],
    rationale:
      "A right angle measures 90°. If it's divided into two angles, those angles are complementary. The other angle is 90° - 35° = 55°.",
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A rectangular garden measures 25 feet by 40 feet. What is the length of the diagonal path that cuts across it?',
    answerOptions: [
      {
        text: '47.17 feet',
        isCorrect: true,
        rationale:
          'Using the Pythagorean theorem, \\(d^{2} = 25^{2} + 40^{2}\\) = 625 + 1600 = 2225. d = sqrt(2225) ≈ 47.17.',
      },
      {
        text: '65 feet',
        isCorrect: false,
        rationale: 'This is the sum of the sides.',
      },
      {
        text: '130 feet',
        isCorrect: false,
        rationale: 'This is the perimeter.',
      },
      {
        text: '1000 feet',
        isCorrect: false,
        rationale: 'This is the area.',
      },
    ],
    rationale:
      'The diagonal of a rectangle forms the hypotenuse of a right triangle with the length and width as its legs. Using the Pythagorean theorem: \\(d^{2} = 25^{2} + 40^{2}\\) = 625 + 1600 = 2225. d = sqrt(2225) ≈ 47.17 feet.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'What is the name for a polygon with eight sides?',
    correctAnswer: 'Octagon',
    rationale: 'An octagon is a polygon with eight sides.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the perimeter of a shape with sides of length 5, 7, 8, and 10.',
    answerOptions: [
      {
        text: '20',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '30',
        isCorrect: true,
        rationale:
          'The perimeter is the sum of the lengths of all sides: 5 + 7 + 8 + 10 = 30.',
      },
      {
        text: '2800',
        isCorrect: false,
        rationale: 'This is the product of the side lengths.',
      },
      {
        text: 'Cannot be determined',
        isCorrect: false,
        rationale: 'The perimeter can be determined.',
      },
    ],
    rationale:
      'The perimeter is the total distance around the shape, which is found by adding the lengths of all its sides. Perimeter = 5 + 7 + 8 + 10 = 30.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      "A car's wheel has a diameter of 24 inches. How many feet does the car travel in one full rotation of the wheel? Use 3.14 for \\(\\pi\\).",
    correctAnswer: '6.28 feet',
    rationale:
      'The distance of one rotation is the circumference. C = pi * d = 3.14 * 24 = 75.36 inches. To convert to feet, divide by 12: 75.36 / 12 = 6.28 feet.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'Which of the following describes parallel lines?',
    answerOptions: [
      {
        text: 'Lines that intersect at a 90° angle.',
        isCorrect: false,
        rationale: 'These are perpendicular lines.',
      },
      {
        text: 'Lines that never intersect and are in the same plane.',
        isCorrect: true,
        rationale: 'This is the definition of parallel lines.',
      },
      {
        text: 'Lines that intersect at any angle.',
        isCorrect: false,
        rationale: 'These are simply intersecting lines.',
      },
      {
        text: 'Lines that are in different planes.',
        isCorrect: false,
        rationale: 'These are skew lines.',
      },
    ],
    rationale:
      'Parallel lines are two or more lines in the same plane that are always the same distance apart and never intersect.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'An angle is 110°. What is its supplementary angle?',
    answerOptions: [
      {
        text: '-20°',
        isCorrect: false,
        rationale: 'Angles cannot be negative.',
      },
      {
        text: '20°',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '70°',
        isCorrect: true,
        rationale: 'Supplementary angles add up to 180°. 180 - 110 = 70.',
      },
      {
        text: '250°',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Supplementary angles are two angles that sum to 180°. The supplement of a 110° angle is 180° - 110° = 70°.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A triangular prism has a base that is a right triangle with legs of 6 and 8. The height of the prism is 10. What is the volume?',
    answerOptions: [
      {
        text: '120',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '240',
        isCorrect: true,
        rationale:
          'Area of the triangular base = (\\(\\(\frac{1}{2}\\))*6*8 = 24. Volume of the prism = base area * height = 24 * 10 = 240.',
      },
      {
        text: '480',
        isCorrect: false,
        rationale: 'This is the volume if the base was a rectangle.',
      },
      {
        text: '280',
        isCorrect: false,
        rationale:
          'This is the surface area of the two bases plus the area of one rectangular face.',
      },
    ],
    rationale:
      'First, find the area of the triangular base: A = \\(\\(\frac{1}{2}\\) * base * height = \\(\\(\frac{1}{2}\\) * 6 * 8 = 24. Then, multiply the base area by the height of the prism to find the volume: V = 24 * 10 = 240.',
    challenge_tags: ['math-5'],
  },
];
