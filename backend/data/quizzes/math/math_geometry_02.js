// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the perimeter of a square with a side length of 7 meters?",
    "answerOptions": [
      {
        "text": "14 m",
        "isCorrect": false,
        "rationale": "This is the sum of only two sides."
      },
      {
        "text": "21 m",
        "isCorrect": false,
        "rationale": "This is the sum of only three sides."
      },
      {
        "text": "28 m",
        "isCorrect": true,
        "rationale": "A square has 4 equal sides, so the perimeter is 4 * 7 = 28 m."
      },
      {
        "text": "49 m",
        "isCorrect": false,
        "rationale": "This is the area of the square."
      }
    ],
    "rationale": "The perimeter of a square is 4 times the side length. P = 4 * 7 m = 28 m.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A circle has a circumference of 50.24 cm. What is its radius? Use 3.14 for $\\pi$.",
    "correctAnswer": "8 cm",
    "rationale": "Circumference C = 2 * pi * r. So, 50.24 = 2 * 3.14 * r. 50.24 = 6.28 * r. Divide by 6.28 to find r = 8 cm.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the volume of a sphere with a radius of 3 inches? Use 3.14 for $\\pi$ and the formula V = $\\frac{4}{3}\\pi r^3$.",
    "answerOptions": [
      {
        "text": "37.68 inÂ³",
        "isCorrect": false,
        "rationale": "This is the surface area of the sphere."
      },
      {
        "text": "113.04 inÂ³",
        "isCorrect": true,
        "rationale": "V = (4/3) * 3.14 * 3Â³ = (4/3) * 3.14 * 27 = 113.04."
      },
      {
        "text": "254.34 inÂ³",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "904.32 inÂ³",
        "isCorrect": false,
        "rationale": "This is the volume of a sphere with a much larger radius."
      }
    ],
    "rationale": "Using the formula, V = (4/3) * 3.14 * (3 inches)Â³ = (4/3) * 3.14 * 27 = 113.04 inÂ³.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "An angle measuring 45Â° is what type of angle?",
    "correctAnswer": "Acute",
    "rationale": "An acute angle is an angle that measures less than 90Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Two lines that intersect to form a right angle are called:",
    "answerOptions": [
      {
        "text": "Parallel lines",
        "isCorrect": false,
        "rationale": "Parallel lines never intersect."
      },
      {
        "text": "Perpendicular lines",
        "isCorrect": true,
        "rationale": "Perpendicular lines intersect at a 90Â° angle."
      },
      {
        "text": "Skew lines",
        "isCorrect": false,
        "rationale": "Skew lines are in different planes and do not intersect."
      },
      {
        "text": "Collinear lines",
        "isCorrect": false,
        "rationale": "This is not a standard term for intersecting lines."
      }
    ],
    "rationale": "The definition of perpendicular lines is that they intersect at a right (90Â°) angle.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A right triangle has a hypotenuse of length 17 and one leg of length 8. What is the length of the other leg?",
    "answerOptions": [
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is the difference between 17 and 8."
      },
      {
        "text": "15",
        "isCorrect": true,
        "rationale": "Using the Pythagorean theorem, $a^2 + 8^2 = 17^2$. $a^2 + 64 = 289$. $a^2 = 225$. a = 15."
      },
      {
        "text": "25",
        "isCorrect": false,
        "rationale": "This is the sum of 17 and 8."
      },
      {
        "text": "225",
        "isCorrect": false,
        "rationale": "This is $a^2$ not a."
      }
    ],
    "rationale": "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. We have $a^2 + 8^2 = 17^2$, so $a^2 + 64 = 289$. Subtract 64 from both sides: $a^2 = 225$. The square root of 225 is 15.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the sum of the interior angles of a quadrilateral?",
    "correctAnswer": "360Â°",
    "rationale": "A quadrilateral can be divided into two triangles, and the sum of angles in each triangle is 180Â°. So, the total is 180Â° * 2 = 360Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A rectangular garden is 20 feet long and has a perimeter of 70 feet. What is its width?",
    "answerOptions": [
      {
        "text": "15 feet",
        "isCorrect": true,
        "rationale": "The perimeter is 2(L+W). 70 = 2(20+W). 35 = 20+W. W = 15."
      },
      {
        "text": "25 feet",
        "isCorrect": false,
        "rationale": "This is half the perimeter minus half the length."
      },
      {
        "text": "35 feet",
        "isCorrect": false,
        "rationale": "This is half the perimeter."
      },
      {
        "text": "50 feet",
        "isCorrect": false,
        "rationale": "This is the perimeter minus the length."
      }
    ],
    "rationale": "The formula for the perimeter of a rectangle is P = 2L + 2W. We have 70 = 2(20) + 2W, so 70 = 40 + 2W. Subtract 40: 30 = 2W. Divide by 2: W = 15 feet.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",`n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "How many inches are in 2.5 feet?",
    "correctAnswer": "30 inches",
    "rationale": "There are 12 inches in 1 foot. So, in 2.5 feet, there are 2.5 * 12 = 30 inches.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the area of a trapezoid with bases of 10 cm and 14 cm and a height of 5 cm.",
    "answerOptions": [
      {
        "text": "60 cmÂ²",
        "isCorrect": true,
        "rationale": "Area = (1/2) * (base1 + base2) * height = (1/2) * (10 + 14) * 5 = 60."
      },
      {
        "text": "120 cmÂ²",
        "isCorrect": false,
        "rationale": "This omits the (1/2) from the formula."
      },
      {
        "text": "29 cmÂ²",
        "isCorrect": false,
        "rationale": "This is the sum of the bases and the height."
      },
      {
        "text": "70 cmÂ²",
        "isCorrect": false,
        "rationale": "This is the result of multiplying the larger base by the height."
      }
    ],
    "rationale": "The formula for the area of a trapezoid is A = $\\frac{1}{2}(b_1 + b_2)h$. So, A = $\\frac{1}{2}(10 + 14) \\times 5 = \\frac{1}{2}(24) \\times 5 = 12 \\times 5 = 60$ cmÂ².",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A triangle has side lengths of 5, 5, and 7. What type of triangle is it?",
    "answerOptions": [
      {
        "text": "Equilateral",
        "isCorrect": false,
        "rationale": "An equilateral triangle has all sides equal."
      },
      {
        "text": "Isosceles",
        "isCorrect": true,
        "rationale": "An isosceles triangle has at least two equal sides."
      },
      {
        "text": "Scalene",
        "isCorrect": false,
        "rationale": "A scalene triangle has no equal sides."
      },
      {
        "text": "Right",
        "isCorrect": false,
        "rationale": "The side lengths do not satisfy the Pythagorean theorem (5Â²+5Â² != 7Â²)."
      }
    ],
    "rationale": "An isosceles triangle is defined as a triangle with at least two sides of equal length. This triangle has two sides of length 5.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "If two angles are supplementary and one angle is 110Â°, what is the measure of the other angle?",
    "answerOptions": [
      {
        "text": "-20Â°",
        "isCorrect": false,
        "rationale": "Angle measures cannot be negative."
      },
      {
        "text": "20Â°",
        "isCorrect": false,
        "rationale": "This is the complement of 70."
      },
      {
        "text": "70Â°",
        "isCorrect": true,
        "rationale": "Supplementary angles add up to 180Â°. So, 180Â° - 110Â° = 70Â°."
      },
      {
        "text": "250Â°",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Supplementary angles are two angles whose measures add up to 180Â°. The other angle is 180Â° - 110Â° = 70Â°.",
    "challenge_tags": [
      "math-5"
    ]
  }
];
