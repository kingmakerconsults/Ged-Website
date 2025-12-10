// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the perimeter of a rectangle with length 12 ft and width 8 ft?",
    "answerOptions": [
      {
        "text": "20 ft",
        "isCorrect": false,
        "rationale": "This is the sum of the length and width."
      },
      {
        "text": "40 ft",
        "isCorrect": true,
        "rationale": "Perimeter = 2 * (length + width) = 2 * (12 + 8) = 40 ft."
      },
      {
        "text": "96 ft",
        "isCorrect": false,
        "rationale": "This is the area of the rectangle."
      },
      {
        "text": "48 ft",
        "isCorrect": false,
        "rationale": "This is 2*12 + 8."
      }
    ],
    "rationale": "The perimeter of a rectangle is calculated as P = 2(l + w). So, P = 2(12 ft + 8 ft) = 2(20 ft) = 40 ft.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the area of a triangle with a base of 15 cm and a height of 10 cm.",
    "correctAnswer": "75 cmÂ²",
    "rationale": "The area of a triangle is A = $\\frac{1}{2}$ * b * h. So, A = $\\frac{1}{2}$ * 15 cm * 10 cm = 75 cmÂ².",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A circle has a diameter of 20 inches. What is its circumference? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "31.4 inches",
        "isCorrect": false,
        "rationale": "This would be the circumference for a diameter of 10 inches."
      },
      {
        "text": "62.8 inches",
        "isCorrect": true,
        "rationale": "Circumference = pi * diameter = 3.14 * 20 = 62.8."
      },
      {
        "text": "314 inches",
        "isCorrect": false,
        "rationale": "This is the area of the circle."
      },
      {
        "text": "125.6 inches",
        "isCorrect": false,
        "rationale": "This is double the circumference."
      }
    ],
    "rationale": "The formula for the circumference of a circle is C = pi * d. So, C = 3.14 * 20 inches = 62.8 inches.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "An angle measuring 150Â° is what type of angle?",
    "correctAnswer": "Obtuse",
    "rationale": "An obtuse angle is an angle that measures more than 90Â° but less than 180Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A right triangle has legs of 5 cm and 12 cm. What is the length of the hypotenuse?",
    "answerOptions": [
      {
        "text": "13 cm",
        "isCorrect": true,
        "rationale": "Using the Pythagorean theorem, 5Â² + 12Â² = 25 + 144 = 169. The square root of 169 is 13."
      },
      {
        "text": "17 cm",
        "isCorrect": false,
        "rationale": "This is the sum of the legs."
      },
      {
        "text": "60 cm",
        "isCorrect": false,
        "rationale": "This is the product of the legs."
      },
      {
        "text": "119 cm",
        "isCorrect": false,
        "rationale": "This is 12Â²-5Â²."
      }
    ],
    "rationale": "According to the Pythagorean theorem, $a^2 + b^2 = c^2$. So, $5^2 + 12^2 = c^2$, which is $25 + 144 = 169$. Thus, c = $\\sqrt{169}$ = 13 cm.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A circular garden has a radius of 12 feet. If you want to put a fence around it, how many feet of fencing will you need? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "37.68 feet",
        "isCorrect": false,
        "rationale": "This would be the circumference for a radius of 6 feet."
      },
      {
        "text": "75.36 feet",
        "isCorrect": true,
        "rationale": "The length of the fencing is the circumference of the circle. C = 2 * pi * r = 2 * 3.14 * 12 = 75.36."
      },
      {
        "text": "452.16 feet",
        "isCorrect": false,
        "rationale": "This is the area of the garden."
      },
      {
        "text": "113.04 feet",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The amount of fencing needed is the circumference of the circle. C = 2 * pi * r = 2 * 3.14 * 12 feet = 75.36 feet.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "How many degrees are in a right angle?",
    "correctAnswer": "90Â°",
    "rationale": "A right angle is an angle that measures exactly 90Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the volume of a cube with a side length of 4 cm?",
    "answerOptions": [
      {
        "text": "12 cmÂ³",
        "isCorrect": false,
        "rationale": "This is the sum of three side lengths."
      },
      {
        "text": "16 cmÂ³",
        "isCorrect": false,
        "rationale": "This is the area of one face."
      },
      {
        "text": "48 cmÂ²",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "64 cmÂ³",
        "isCorrect": true,
        "rationale": "Volume of a cube is sideÂ³. 4Â³ = 4 * 4 * 4 = 64."
      }
    ],
    "rationale": "The volume of a cube is calculated as V = sÂ³. So, V = (4 cm)Â³ = 64 cmÂ³.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A room is 12 feet long and 15 feet wide. How many square yards of carpet are needed to cover the floor?",
    "correctAnswer": "20 square yards",
    "rationale": "First, find the area in square feet: 12 ft * 15 ft = 180 sq ft. There are 9 square feet in 1 square yard. So, 180 sq ft / 9 sq ft/sq yd = 20 square yards.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the name of a triangle with no equal sides?",
    "answerOptions": [
      {
        "text": "Equilateral",
        "isCorrect": false,
        "rationale": "An equilateral triangle has all sides equal."
      },
      {
        "text": "Isosceles",
        "isCorrect": false,
        "rationale": "An isosceles triangle has at least two equal sides."
      },
      {
        "text": "Scalene",
        "isCorrect": true,
        "rationale": "A scalene triangle has no sides of equal length."
      },
      {
        "text": "Right",
        "isCorrect": false,
        "rationale": "A right triangle has a right angle."
      }
    ],
    "rationale": "A scalene triangle is a triangle in which all three sides have different lengths.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If two parallel lines are cut by a transversal, the alternate interior angles are:",
    "answerOptions": [
      {
        "text": "Complementary",
        "isCorrect": false,
        "rationale": "They are not necessarily complementary."
      },
      {
        "text": "Supplementary",
        "isCorrect": false,
        "rationale": "Consecutive interior angles are supplementary."
      },
      {
        "text": "Congruent",
        "isCorrect": true,
        "rationale": "Alternate interior angles are equal in measure."
      },
      {
        "text": "Unequal",
        "isCorrect": false,
        "rationale": "They are equal."
      }
    ],
    "rationale": "A key theorem in geometry states that when two parallel lines are intersected by a transversal, the alternate interior angles are congruent (equal).",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "Find the surface area of a rectangular prism with length 6m, width 4m, and height 2m.",
    "answerOptions": [
      {
        "text": "48 mÂ²",
        "isCorrect": false,
        "rationale": "This is the volume of the prism."
      },
      {
        "text": "24 mÂ²",
        "isCorrect": false,
        "rationale": "This is the area of the largest face."
      },
      {
        "text": "88 mÂ²",
        "isCorrect": true,
        "rationale": "SA = 2(lw + lh + wh) = 2(6*4 + 6*2 + 4*2) = 2(24 + 12 + 8) = 2(44) = 88."
      },
      {
        "text": "44 mÂ²",
        "isCorrect": false,
        "rationale": "This is half the surface area."
      }
    ],
    "rationale": "The formula for the surface area of a rectangular prism is SA = 2(lw + lh + wh). SA = 2((6)(4) + (6)(2) + (4)(2)) = 2(24 + 12 + 8) = 2(44) = 88 mÂ².",
    "challenge_tags": [
      "math-5"
    ]
  }
];
