// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the area of a triangle with a base of 6 and a height of 8?",
    "answerOptions": [
      {
        "text": "14",
        "isCorrect": false,
        "rationale": "This is the sum of the base and height."
      },
      {
        "text": "24",
        "isCorrect": true,
        "rationale": "Area = (1/2) * base * height = (1/2) * 6 * 8 = 24."
      },
      {
        "text": "28",
        "isCorrect": false,
        "rationale": "This is the perimeter."
      },
      {
        "text": "48",
        "isCorrect": false,
        "rationale": "This is base * height, without multiplying by 1/2."
      }
    ],
    "rationale": "The area of a triangle is given by the formula A = 1/2 * b * h. So, A = 1/2 * 6 * 8 = 24."
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the circumference of a circle with a diameter of 15 cm? Use 3.14 for $\\pi$.",
    "correctAnswer": "47.1 cm",
    "rationale": "Circumference = pi * diameter. C = 3.14 * 15 cm = 47.1 cm."
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the volume of a rectangular prism with dimensions 2, 5, and 12.",
    "answerOptions": [
      {
        "text": "19",
        "isCorrect": false,
        "rationale": "This is the sum of the dimensions."
      },
      {
        "text": "120",
        "isCorrect": true,
        "rationale": "Volume = 2 * 5 * 12 = 120."
      },
      {
        "text": "158",
        "isCorrect": false,
        "rationale": "This is the surface area."
      },
      {
        "text": "60",
        "isCorrect": false,
        "rationale": "This is 5*12."
      }
    ],
    "rationale": "The volume of a rectangular prism is found by multiplying its three dimensions: length, width, and height. V = 2 * 5 * 12 = 120."
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "How many inches are in one foot?",
    "correctAnswer": "12",
    "rationale": "There are 12 inches in a standard foot."
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A square has an area of 49 square units. What is its perimeter?",
    "answerOptions": [
      {
        "text": "7 units",
        "isCorrect": false,
        "rationale": "This is the side length."
      },
      {
        "text": "28 units",
        "isCorrect": true,
        "rationale": "The side length is sqrt(49) = 7. The perimeter is 4 * 7 = 28."
      },
      {
        "text": "49 units",
        "isCorrect": false,
        "rationale": "This is the area."
      },
      {
        "text": "196 units",
        "isCorrect": false,
        "rationale": "This is 49*4."
      }
    ],
    "rationale": "First, find the side length of the square by taking the square root of the area: sqrt(49) = 7 units. Then, calculate the perimeter by multiplying the side length by 4: 7 units * 4 = 28 units."
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A right circular cone has a height of 12 cm and a radius of 5 cm. What is its volume? Use 3.14 for $\\pi$ and V = $\\frac{1}{3}\\pi r^2 h$.",
    "answerOptions": [
      {
        "text": "314 cm³",
        "isCorrect": true,
        "rationale": "V = (1/3) * 3.14 * 5² * 12 = 314."
      },
      {
        "text": "942 cm³",
        "isCorrect": false,
        "rationale": "This is the volume of a cylinder with the same dimensions."
      },
      {
        "text": "188.4 cm³",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "1570 cm³",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Using the formula for the volume of a cone, V = (1/3) * pi * r² * h. V = (1/3) * 3.14 * (5 cm)² * 12 cm = (1/3) * 3.14 * 25 * 12 = 314 cm³."
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the measure of each angle in an equilateral triangle?",
    "correctAnswer": "60°",
    "rationale": "An equilateral triangle has three equal angles. The sum of the angles is 180°, so each angle is 180° / 3 = 60°."
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the hypotenuse of a right triangle with legs of length 7 and 24.",
    "answerOptions": [
      {
        "text": "25",
        "isCorrect": true,
        "rationale": "7² + 24² = 49 + 576 = 625. sqrt(625) = 25."
      },
      {
        "text": "31",
        "isCorrect": false,
        "rationale": "This is the sum of the legs."
      },
      {
        "text": "17",
        "isCorrect": false,
        "rationale": "This is 24-7."
      },
      {
        "text": "168",
        "isCorrect": false,
        "rationale": "This is 7*24."
      }
    ],
    "rationale": "Using the Pythagorean theorem ($a^2 + b^2 = c^2$), we have $7^2 + 24^2 = c^2$. This becomes $49 + 576 = 625$. So, $c = \\sqrt{625} = 25$."
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A rectangular room is 5 yards long and 4 yards wide. What is its area in square feet?",
    "correctAnswer": "180 square feet",
    "rationale": "First convert yards to feet. 5 yards = 15 feet, 4 yards = 12 feet. The area is 15 ft * 12 ft = 180 sq ft."
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the name for a quadrilateral that has exactly one pair of parallel sides?",
    "answerOptions": [
      {
        "text": "Parallelogram",
        "isCorrect": false,
        "rationale": "A parallelogram has two pairs of parallel sides."
      },
      {
        "text": "Trapezoid",
        "isCorrect": true,
        "rationale": "A trapezoid is defined as a quadrilateral with at least one pair of parallel sides."
      },
      {
        "text": "Rhombus",
        "isCorrect": false,
        "rationale": "A rhombus has two pairs of parallel sides."
      },
      {
        "text": "Kite",
        "isCorrect": false,
        "rationale": "A kite does not necessarily have parallel sides."
      }
    ],
    "rationale": "A trapezoid is a quadrilateral with exactly one pair of parallel sides. (Note: some definitions allow for 'at least' one pair)."
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If an angle is 30°, what is its complementary angle?",
    "answerOptions": [
      {
        "text": "60°",
        "isCorrect": true,
        "rationale": "Complementary angles add to 90°. 90 - 30 = 60."
      },
      {
        "text": "150°",
        "isCorrect": false,
        "rationale": "This is the supplementary angle."
      },
      {
        "text": "30°",
        "isCorrect": false,
        "rationale": "This is the original angle."
      },
      {
        "text": "90°",
        "isCorrect": false,
        "rationale": "This is the sum of the two angles."
      }
    ],
    "rationale": "Complementary angles are two angles that sum to 90°. The complement of a 30° angle is 90° - 30° = 60°."
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A circular track has a circumference of 400 meters. What is its radius, to the nearest meter? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "64 meters",
        "isCorrect": true,
        "rationale": "C = 2 * pi * r. 400 = 2 * 3.14 * r. 400 = 6.28 * r. r = 400/6.28 ≈ 63.69, which is 64 to the nearest meter."
      },
      {
        "text": "127 meters",
        "isCorrect": false,
        "rationale": "This is the diameter."
      },
      {
        "text": "200 meters",
        "isCorrect": false,
        "rationale": "This is 400/2."
      },
      {
        "text": "12739 meters",
        "isCorrect": false,
        "rationale": "This is the area."
      }
    ],
    "rationale": "The formula for circumference is C = 2 * pi * r. We have 400 = 2 * 3.14 * r. First, divide by (2 * 3.14): r = 400 / 6.28 ≈ 63.69 meters. To the nearest meter, this is 64 meters."
  }
];
