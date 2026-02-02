module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question: 'What is the area of a square with a side length of 9 meters?',
    answerOptions: [
      {
        text: '18 \(m^2\)',
        isCorrect: false,
        rationale: 'This is the sum of two sides.',
      },
      {
        text: '36 \(m^2\)',
        isCorrect: false,
        rationale: 'This is the perimeter.',
      },
      {
        text: '81 \(m^2\)',
        isCorrect: true,
        rationale: 'Area = 9 * 9 = 81.',
      },
      {
        text: '90 \(m^2\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'The area of a square is the side length multiplied by itself. Area = 9 m * 9 m = 81 \(m^2\).',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A circle has a circumference of 31.4 inches. What is its radius? Use 3.14 for \(\\pi\).',
    correctAnswer: '5 inches',
    rationale:
      'C = 2 * pi * r. 31.4 = 2 * 3.14 * r. 31.4 = 6.28 * r. r = 31.4 / 6.28 = 5.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A rectangular prism has a volume of 300 cubic feet. If its length is 10 feet and its width is 5 feet, what is its height?',
    answerOptions: [
      {
        text: '6 feet',
        isCorrect: true,
        rationale: 'Volume = L*W*H. 300 = 10 * 5 * H. 300 = 50 * H. H = 6.',
      },
      {
        text: '10 feet',
        isCorrect: false,
        rationale: 'This is the length.',
      },
      {
        text: '15 feet',
        isCorrect: false,
        rationale: 'This is L+W.',
      },
      {
        text: '30 feet',
        isCorrect: false,
        rationale: 'This is \(\\(\frac{300}{10}\)\).',
      },
    ],
    rationale:
      'The volume of a rectangular prism is V = L * W * H. We have 300 = 10 * 5 * H. 300 = 50H. Divide by 50 to find H = 6 feet.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'A triangle has angles of 20° and 80°. What is the third angle?',
    correctAnswer: '80°',
    rationale:
      'The sum of the angles in a triangle is 180°. 180 - 20 - 80 = 80°.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the specific name of a triangle with two equal sides?',
    answerOptions: [
      {
        text: 'Equilateral',
        isCorrect: false,
        rationale: 'An equilateral triangle has three equal sides.',
      },
      {
        text: 'Isosceles',
        isCorrect: true,
        rationale: 'An isosceles triangle has at least two equal sides.',
      },
      {
        text: 'Scalene',
        isCorrect: false,
        rationale: 'A scalene triangle has no equal sides.',
      },
      {
        text: 'Right',
        isCorrect: false,
        rationale: 'A right triangle has a right angle.',
      },
    ],
    rationale:
      'An isosceles triangle is defined as a triangle with at least two sides of equal length.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A wheel has a radius of 1 foot. How many feet does it travel in 10 rotations? Use 3.14 for \(\\pi\).',
    answerOptions: [
      {
        text: '31.4 feet',
        isCorrect: false,
        rationale: 'This is the distance for 5 rotations.',
      },
      {
        text: '62.8 feet',
        isCorrect: true,
        rationale:
          'The circumference is 2 * 3.14 * 1 = 6.28 feet. For 10 rotations, the distance is 6.28 * 10 = 62.8 feet.',
      },
      {
        text: '10 feet',
        isCorrect: false,
        rationale: 'This is the number of rotations.',
      },
      {
        text: '20 feet',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'First, find the distance of one rotation, which is the circumference: C = 2 * pi * r = 2 * 3.14 * 1 foot = 6.28 feet. Then, multiply by the number of rotations: 6.28 feet/rotation * 10 rotations = 62.8 feet.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the perimeter of a regular octagon with a side length of 5 cm.',
    correctAnswer: '40 cm',
    rationale:
      'A regular octagon has 8 equal sides. The perimeter is 8 * 5 cm = 40 cm.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'A right triangle has legs of 12 and 16. What is the length of the hypotenuse?',
    answerOptions: [
      {
        text: '20',
        isCorrect: true,
        rationale: '12^2 + 16^2 = 144 + 256 = 400. sqrt(400) = 20.',
      },
      {
        text: '28',
        isCorrect: false,
        rationale: 'This is the sum of the legs.',
      },
      {
        text: '4',
        isCorrect: false,
        rationale: 'This is the difference of the legs.',
      },
      {
        text: '192',
        isCorrect: false,
        rationale: 'This is the product of the legs.',
      },
    ],
    rationale:
      'Using the Pythagorean theorem (\(a^2 + b^2 = c^2\)), we have \(12^2 + 16^2 = c^2\). This becomes \(144 + 256 = 400\). So, \(c = \\(\sqrt{400}\)\) = 20.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A cylindrical tank is 10 feet tall and has a radius of 3 feet. What is its volume? Use 3.14 for \(\\pi\).',
    correctAnswer: '282.6 cubic feet',
    rationale: 'Volume = pi * r^2 * h = 3.14 * 3^2 * 10 = 282.6.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'A quadrilateral with all four sides equal in length is a:',
    answerOptions: [
      {
        text: 'Rectangle',
        isCorrect: false,
        rationale:
          'A rectangle must have four right angles, but not necessarily equal sides.',
      },
      {
        text: 'Rhombus',
        isCorrect: true,
        rationale:
          'A rhombus is defined as a quadrilateral with all four sides of equal length.',
      },
      {
        text: 'Trapezoid',
        isCorrect: false,
        rationale: 'A trapezoid has only one pair of parallel sides.',
      },
      {
        text: 'Parallelogram',
        isCorrect: false,
        rationale:
          'A parallelogram has opposite sides equal, but not necessarily all four.',
      },
    ],
    rationale:
      'A rhombus is a quadrilateral where all four sides are of equal length. A square is a special type of rhombus.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'If two parallel lines are cut by a transversal, then the corresponding angles are:',
    answerOptions: [
      {
        text: 'Congruent',
        isCorrect: true,
        rationale:
          'Corresponding angles are in the same position at each intersection and are equal.',
      },
      {
        text: 'Supplementary',
        isCorrect: false,
        rationale: 'Consecutive interior angles are supplementary.',
      },
      {
        text: 'Complementary',
        isCorrect: false,
        rationale: 'They do not necessarily add to 90°.',
      },
      {
        text: 'Unequal',
        isCorrect: false,
        rationale: 'They are equal.',
      },
    ],
    rationale:
      'A theorem in geometry states that when a transversal intersects two parallel lines, the corresponding angles are congruent (equal).',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'The area of a trapezoid is 100 sq. units. Its height is 10 units and one of its bases is 8 units. What is the length of the other base?',
    answerOptions: [
      {
        text: '10 units',
        isCorrect: false,
        rationale: 'This is the height.',
      },
      {
        text: '12 units',
        isCorrect: true,
        rationale:
          '100 = (\(\\(\frac{1}{2}\)\))(8+b2)*10. 100 = 5(8+b2). 20 = 8+b2. b2 = 12.',
      },
      {
        text: '20 units',
        isCorrect: false,
        rationale: 'This is \(\\(\frac{100}{5}\)\).',
      },
      {
        text: '28 units',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Using the area formula for a trapezoid, A = \(\\(\frac{1}{2}\)\)(b_1 + b_2)h\). We have 100 = \(\\(\frac{1}{2}\)\)(8 + b_2) \\(\times10\). 100 = \(5(8 + b_2). 20 =  8 + b_2. So, \(b_2 = 12 units.\)',
    challenge_tags: ['math-5'],
  },
];
