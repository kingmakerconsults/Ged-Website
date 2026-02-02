module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'easy',
    question:
      'What is the area of a rectangle with a width of 6 inches and a length of 9 inches?',
    answerOptions: [
      {
        text: '15 in^2',
        isCorrect: false,
        rationale: 'This is the sum of the sides.',
      },
      {
        text: '30 in^2',
        isCorrect: false,
        rationale: 'This is the perimeter.',
      },
      {
        text: '54 in^2',
        isCorrect: true,
        rationale: 'Area = 6 * 9 = 54.',
      },
      {
        text: '81 in^2',
        isCorrect: false,
        rationale: 'This is 9*9.',
      },
    ],
    rationale:
      'The area of a rectangle is calculated by multiplying its length and width. Area = 9 inches * 6 inches = 54 in^2.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'A circle has a radius of 20 meters. What is its circumference? Use 3.14 for \\(\\pi\\).',
    correctAnswer: '125.6 meters',
    rationale:
      'Circumference = 2 * pi * r. C = 2 * 3.14 * 20 meters = 125.6 meters.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the volume of a cylinder with radius 4 and height 10. Use 3.14 for \\(\\pi\\).',
    answerOptions: [
      {
        text: '125.6',
        isCorrect: false,
        rationale: 'This is the volume if r=2, h=10.',
      },
      {
        text: '502.4',
        isCorrect: true,
        rationale:
          'Volume = pi * \\(r^{2}\\) * h = 3.14 * \\(4^{2}\\) * 10 = 502.4.',
      },
      {
        text: '1256',
        isCorrect: false,
        rationale: 'This is the volume if r=10, h=4.',
      },
      {
        text: '400',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'The formula for the volume of a cylinder is V = pi * \\(r^{2}\\) * h. V = 3.14 * (4)\\(^2\\) * 10 = 3.14 * 16 * 10 = 502.4.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 4,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'easy',
    question: 'How many centimeters are in a meter?',
    correctAnswer: '100',
    rationale:
      "The prefix 'centi-' means one-hundredth. There are 100 centimeters in a meter.",
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'A triangle has angles measuring 100°, 40°, and 40°. What type of triangle is it?',
    answerOptions: [
      {
        text: 'Acute',
        isCorrect: false,
        rationale: 'An acute triangle must have all angles less than 90°.',
      },
      {
        text: 'Obtuse Isosceles',
        isCorrect: true,
        rationale: 'It has one obtuse angle (100°) and two equal angles/sides.',
      },
      {
        text: 'Right',
        isCorrect: false,
        rationale: 'It does not have a 90° angle.',
      },
      {
        text: 'Equilateral',
        isCorrect: false,
        rationale: 'An equilateral triangle has all angles equal to 60°.',
      },
    ],
    rationale:
      'The triangle has one angle greater than 90° (100°), making it obtuse. It also has two equal angles (40°), which means the sides opposite those angles are equal, making it isosceles.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'A cube has a surface area of 24 square feet. What is its volume?',
    answerOptions: [
      {
        text: '4 \\(ft^3\\)',
        isCorrect: false,
        rationale: 'This is the area of one face.',
      },
      {
        text: '8 \\(ft^3\\)',
        isCorrect: true,
        rationale:
          'Surface area is 6\\(s^{2}\\). 24=6\\(s^{2}\\), so \\(s^{2}\\)=4 and s=2. Volume = \\(s^{3}\\) = \\(2^{3}\\) = 8.',
      },
      {
        text: '16 \\(ft^3\\)',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '64 \\(ft^3\\)',
        isCorrect: false,
        rationale: 'This is the volume if s=4.',
      },
    ],
    rationale:
      'The surface area of a cube is 6\\(s^{2}\\), where s is the side length. 24 = 6\\(s^{2}\\), so \\(s^{2}\\) = 4, and s = 2 feet. The volume is \\(s^{3}\\), so V = \\(2^{3}\\) = 8 cubic feet.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 7,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'medium',
    question:
      'What is the perimeter of a rectangle if its length is 15 and its width is 10?',
    correctAnswer: '50',
    rationale:
      'Perimeter = 2 * (length + width) = 2 * (15 + 10) = 2 * 25 = 50.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    question:
      'Find the length of a leg of a right triangle if the other leg is 9 and the hypotenuse is 41.',
    answerOptions: [
      {
        text: '32',
        isCorrect: false,
        rationale: 'This is 41-9.',
      },
      {
        text: '40',
        isCorrect: true,
        rationale:
          '\\(a^{2} + 9^{2} = 41^{2}\\). \\(a^{2} + 81 = 1681\\). \\(a^{2} = 1600\\). a = 40.',
      },
      {
        text: '50',
        isCorrect: false,
        rationale: 'This is 41+9.',
      },
      {
        text: '1600',
        isCorrect: false,
        rationale: 'This is \\(a^{2}\\).',
      },
    ],
    rationale:
      'Using the Pythagorean theorem (\\(a^{2} + b^{2} = c^{2}\\)), we have \\(a^{2} + 9^{2} = 41^{2}\\). \\(a^{2} + 81 = 1681\\). \\(a^{2} = 1681 - 81 = 1600\\). So, \\(a = \\(\sqrt{1600}\\) = 40.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    question:
      'A wheel has a radius of 1.5 feet. How many full rotations does it make in 1 mile (5280 feet)? Use 3.14 for \\(\\pi\\).',
    correctAnswer: '560 rotations',
    rationale:
      'The circumference of the wheel is C = 2 * 3.14 * 1.5 = 9.42 feet. The number of rotations is the total distance divided by the circumference: 5280 / 9.42 ≈ 560.5. The number of full rotations is 560.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question: 'What is the sum of the interior angles of a pentagon?',
    answerOptions: [
      {
        text: '360°',
        isCorrect: false,
        rationale: 'This is for a quadrilateral.',
      },
      {
        text: '540°',
        isCorrect: true,
        rationale:
          'The formula is (n-2) * 180°. For a pentagon, n=5. (5-2)*180 = 3*180 = 540°.',
      },
      {
        text: '720°',
        isCorrect: false,
        rationale: 'This is for a hexagon.',
      },
      {
        text: '900°',
        isCorrect: false,
        rationale: 'This is for a heptagon.',
      },
    ],
    rationale:
      'The sum of the interior angles of a polygon is given by the formula (n-2) * 180°, where n is the number of sides. For a pentagon, n=5, so the sum is (5-2) * 180° = 540°.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    question:
      'A line segment from the center of a circle to its perimeter is called a:',
    answerOptions: [
      {
        text: 'Radius',
        isCorrect: true,
        rationale: 'This is the definition of a radius.',
      },
      {
        text: 'Diameter',
        isCorrect: false,
        rationale:
          'A diameter passes through the center and touches two points on the perimeter.',
      },
      {
        text: 'Chord',
        isCorrect: false,
        rationale: 'A chord connects two points on the perimeter.',
      },
      {
        text: 'Arc',
        isCorrect: false,
        rationale: 'An arc is a portion of the perimeter.',
      },
    ],
    rationale:
      'The radius of a circle is any of the line segments from its center to its perimeter.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    question:
      'What is the area of a regular hexagon with a side length of 6? Use the formula A = \\(\\frac{3\\(\sqrt{3}\\)}{2}\\(s^2\\).',
    answerOptions: [
      {
        text: '54',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '93.53',
        isCorrect: true,
        rationale: 'A = (3 * sqrt(3) / 2) * 6^2 ≈ 93.53.',
      },
      {
        text: '108',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
      {
        text: '127.28',
        isCorrect: false,
        rationale: 'This is an incorrect calculation.',
      },
    ],
    rationale:
      'Using the formula, A = \\(\\frac{3\\(\sqrt{3}\\)}{2}$s^{2}\\). A = \\(\\frac{3\\(\sqrt{3}\\)}{2}(6)\\)^2\\( = \\frac{3\\(\sqrt{3}\\)}{2}(36) = 54\\(\\(\sqrt{3}\\) \\approx 93.53.',
    challenge_tags: ['math-5'],
  },
];
