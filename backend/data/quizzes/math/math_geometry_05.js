module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the area of a square with a perimeter of 32 cm?',
    answerOptions: [
      {
        text: '8 \\(cm^2\\)',
        isCorrect: false,
        rationale: 'This is the side length.',
      },
      {
        text: '32 \\(cm^2\\)',
        isCorrect: false,
        rationale: 'This is the perimeter.',
      },
      {
        text: '64 \\(cm^2\\)',
        isCorrect: true,
        rationale:
          'The side length is \\(\\(\frac{32}{4}\\) = 8 cm. The area is 8*8 = 64 \\(cm^{2}\\).',
      },
      {
        text: '256 \\(cm^2\\)',
        isCorrect: false,
        rationale: 'This is 32 * 8.',
      },
    ],
    rationale:
      'First, find the length of one side by dividing the perimeter by 4: 32 cm / 4 = 8 cm. Then, find the area by squaring the side length: 8 cm * 8 cm = 64 \\(cm^{2}\\).',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the circumference of a circle with a radius of 4.5 inches. Use 3.14 for \\(\\pi\\).',
    correctAnswer: '28.26 inches',
    rationale:
      'Circumference C = 2 * pi * r. So, C = 2 * 3.14 * 4.5 inches = 28.26 inches.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A right triangle has a leg of 10m and a hypotenuse of 26m. What is the length of the other leg?',
    answerOptions: [
      {
        text: '16 m',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '24 m',
        isCorrect: true,
        rationale:
          'Using Pythagorean theorem, \\(a^{2} + 10^{2} = 26^{2}\\). \\(a^{2} + 100 = 676\\). \\(a^{2} = 576\\). a = 24.',
      },
      {
        text: '36 m',
        isCorrect: false,
        rationale: 'This is the sum of the sides.',
      },
      {
        text: '576 m',
        isCorrect: false,
        rationale: 'This is \\(a^{2}\\), not a.',
      },
    ],
    rationale:
      'Using the Pythagorean theorem, \\(a^{2} + b^{2} = c^{2}\\). We have \\(a^{2} + 10^{2} = 26^{2}\\), so \\(a^{2} + 100 = 676\\). Subtract 100 from both sides: \\(a^{2} = 576\\). The square root of 576 is 24.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'How many sides does a hexagon have?',
    correctAnswer: '6',
    rationale: 'A hexagon is a polygon with six sides.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'The sum of the interior angles of any triangle is:',
    answerOptions: [
      {
        text: '90°',
        isCorrect: false,
        rationale: 'This is the measure of a right angle.',
      },
      {
        text: '180°',
        isCorrect: true,
        rationale:
          'The sum of the three interior angles of any triangle is always 180°.',
      },
      {
        text: '270°',
        isCorrect: false,
        rationale: 'This is three right angles.',
      },
      {
        text: '360°',
        isCorrect: false,
        rationale: 'This is the sum of angles in a quadrilateral or circle.',
      },
    ],
    rationale:
      'A fundamental theorem of geometry states that the sum of the measures of the interior angles of a triangle is always 180 degrees.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'What is the volume of a cylinder with a diameter of 10 ft and a height of 8 ft? Use 3.14 for \\(\\pi\\).',
    answerOptions: [
      {
        text: '251.2 \\(ft^3\\)',
        isCorrect: false,
        rationale: 'This is the volume if the radius was 10.',
      },
      {
        text: '628 \\(ft^3\\)',
        isCorrect: true,
        rationale:
          'The radius is 5 ft. Volume = pi * \\(r^{2}\\) * h = 3.14 * \\(5^{2}\\) * 8 = 628.',
      },
      {
        text: '1256 \\(ft^3\\)',
        isCorrect: false,
        rationale: 'This is double the volume.',
      },
      {
        text: '2512 \\(ft^3\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'First, find the radius from the diameter: r = 10 ft / 2 = 5 ft. The formula for the volume of a cylinder is V = pi * \\(r^{2}\\) * h. So, V = 3.14 * (5 ft)\\(^2\\) * 8 ft = 3.14 * 25 * 8 = 628 \\(ft^{3}\\).',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question: 'How many milliliters are in 3.5 liters?',
    correctAnswer: '3500 ml',
    rationale:
      'There are 1000 milliliters in 1 liter. So, 3.5 liters * 1000 ml/liter = 3500 ml.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'An isosceles triangle has two angles that measure 50° each. What is the measure of the third angle?',
    answerOptions: [
      {
        text: '50°',
        isCorrect: false,
        rationale: 'This would make it an equilateral triangle.',
      },
      {
        text: '80°',
        isCorrect: true,
        rationale: 'The sum of angles is 180°. 180 - 50 - 50 = 80°.',
      },
      {
        text: '100°',
        isCorrect: false,
        rationale: 'This is the sum of the two given angles.',
      },
      {
        text: '130°',
        isCorrect: false,
        rationale: 'This is 180-50.',
      },
    ],
    rationale:
      'The sum of the angles in a triangle is 180°. The two given angles sum to 50° + 50° = 100°. The third angle is 180° - 100° = 80°.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A circular pool has an area of 200.96 square feet. What is its diameter? Use 3.14 for \\(\\pi\\).',
    correctAnswer: '16 feet',
    rationale:
      'Area = pi * \\(r^{2}\\). 200.96 = 3.14 * \\(r^{2}\\). \\(r^{2}\\) = 200.96 / 3.14 = 64. r = 8. The diameter is 2 * r = 16 feet.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'What is the most specific name for a quadrilateral with four right angles and four equal sides?',
    answerOptions: [
      {
        text: 'Rectangle',
        isCorrect: false,
        rationale:
          'A rectangle has four right angles but not necessarily equal sides.',
      },
      {
        text: 'Rhombus',
        isCorrect: false,
        rationale:
          'A rhombus has four equal sides but not necessarily right angles.',
      },
      {
        text: 'Square',
        isCorrect: true,
        rationale: 'A square has both four right angles and four equal sides.',
      },
      {
        text: 'Parallelogram',
        isCorrect: false,
        rationale: 'A parallelogram has opposite sides parallel.',
      },
    ],
    rationale:
      'A square is a quadrilateral that is both a rectangle (four right angles) and a rhombus (four equal sides).',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'If two angles are vertical angles, they are always:',
    answerOptions: [
      {
        text: 'Supplementary',
        isCorrect: false,
        rationale: 'Adjacent angles on a straight line are supplementary.',
      },
      {
        text: 'Complementary',
        isCorrect: false,
        rationale: 'Two angles that sum to 90° are complementary.',
      },
      {
        text: 'Congruent',
        isCorrect: true,
        rationale:
          'Vertical angles, formed by intersecting lines, are always equal in measure.',
      },
      {
        text: 'Adjacent',
        isCorrect: false,
        rationale: 'Vertical angles are opposite, not adjacent.',
      },
    ],
    rationale:
      'Vertical angles are the angles opposite each other when two lines cross. They are always congruent (equal).',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A box in the shape of a rectangular prism has a length of 20cm, a width of 10cm, and a height of 5cm. What is its surface area?',
    answerOptions: [
      {
        text: '1000 \\(cm^2\\)',
        isCorrect: false,
        rationale: 'This is the volume of the box.',
      },
      {
        text: '700 \\(cm^2\\)',
        isCorrect: true,
        rationale:
          'SA = 2(20*10 + 20*5 + 10*5) = 2(200 + 100 + 50) = 2(350) = 700.',
      },
      {
        text: '350 \\(cm^2\\)',
        isCorrect: false,
        rationale: 'This is half of the surface area.',
      },
      {
        text: '250 \\(cm^2\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'The surface area of a rectangular prism is given by the formula SA = 2(lw + lh + wh). SA = 2((20)(10) + (20)(5) + (10)(5)) = 2(200 + 100 + 50) = 2(350) = 700 \\(cm^{2}\\).',
    challenge_tags: ['math-5'],
  },
];
