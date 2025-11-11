// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the perimeter of a triangle with side lengths of 3, 4, and 5?",
    "answerOptions": [
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is 3+4."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is 4+5."
      },
      {
        "text": "12",
        "isCorrect": true,
        "rationale": "The perimeter is the sum of the side lengths: 3 + 4 + 5 = 12."
      },
      {
        "text": "60",
        "isCorrect": false,
        "rationale": "This is the product of the side lengths."
      }
    ],
    "rationale": "The perimeter of a polygon is the sum of the lengths of its sides. For this triangle, the perimeter is 3 + 4 + 5 = 12.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "medium",
    "question": "A circle has a diameter of 8. What is its area? Use 3.14 for $\\pi$.",
    "correctAnswer": "50.24",
    "rationale": "The radius is half the diameter, so r=4. Area = pi * $r^2$ = 3.14 * $4^2$ = 50.24.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the volume of a cube with a side length of 6?",
    "answerOptions": [
      {
        "text": "18",
        "isCorrect": false,
        "rationale": "This is 6*3."
      },
      {
        "text": "36",
        "isCorrect": false,
        "rationale": "This is the area of one face."
      },
      {
        "text": "216",
        "isCorrect": true,
        "rationale": "Volume = $6^3$ = 216."
      },
      {
        "text": "1296",
        "isCorrect": false,
        "rationale": "This is $6^4$."
      }
    ],
    "rationale": "The volume of a cube is the side length cubed. V = $6^3$ = 6 * 6 * 6 = 216.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "easy",
    "question": "How many sides does a quadrilateral have?",
    "correctAnswer": "4",
    "rationale": "A quadrilateral is a polygon with four sides.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which of the following is NOT a type of angle?",
    "answerOptions": [
      {
        "text": "Acute",
        "isCorrect": false,
        "rationale": "An acute angle is less than 90°."
      },
      {
        "text": "Obtuse",
        "isCorrect": false,
        "rationale": "An obtuse angle is greater than 90°."
      },
      {
        "text": "Parallel",
        "isCorrect": true,
        "rationale": "Parallel refers to lines, not angles."
      },
      {
        "text": "Right",
        "isCorrect": false,
        "rationale": "A right angle is 90°."
      }
    ],
    "rationale": "'Parallel' is a term used to describe lines that never intersect. Acute, obtuse, and right are all types of angles.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A rectangular room is 12 feet wide and 16 feet long. What is the distance from one corner to the opposite corner?",
    "answerOptions": [
      {
        "text": "20 feet",
        "isCorrect": true,
        "rationale": "d² = 12² + 16² = 144 + 256 = 400. d = sqrt(400) = 20."
      },
      {
        "text": "28 feet",
        "isCorrect": false,
        "rationale": "This is the sum of the sides."
      },
      {
        "text": "56 feet",
        "isCorrect": false,
        "rationale": "This is the perimeter."
      },
      {
        "text": "192 feet",
        "isCorrect": false,
        "rationale": "This is the area."
      }
    ],
    "rationale": "The diagonal of a rectangle forms the hypotenuse of a right triangle with the length and width as legs. Using the Pythagorean theorem: d² = 12² + 16² = 144 + 256 = 400. d = $\\sqrt{400}$ = 20 feet.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "calculator": false,
    "difficulty": "medium",
    "question": "If an angle is 70°, what is its supplementary angle?",
    "correctAnswer": "110°",
    "rationale": "Supplementary angles add up to 180°. 180 - 70 = 110.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the area of a circle with a circumference of 18.84? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "28.26",
        "isCorrect": true,
        "rationale": "C = 2*pi*r -> 18.84 = 2*3.14*r -> r=3. Area = pi*r² = 3.14*3² = 28.26."
      },
      {
        "text": "56.52",
        "isCorrect": false,
        "rationale": "This is the circumference if the radius was 9."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "This is r²."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is the radius."
      }
    ],
    "rationale": "First, find the radius from the circumference: C = 2 * pi * r. 18.84 = 2 * 3.14 * r. r = 18.84 / 6.28 = 3. Now, find the area: A = pi * r² = 3.14 * 3² = 28.26.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "calculator": true,
    "difficulty": "hard",
    "question": "A cube has a volume of 125 cubic inches. What is its surface area?",
    "correctAnswer": "150 square inches",
    "rationale": "The side length is the cube root of the volume: ³√125 = 5 inches. The area of one face is 5² = 25. The surface area is 6 * 25 = 150.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A triangle with all three sides of different lengths is called:",
    "answerOptions": [
      {
        "text": "Equilateral",
        "isCorrect": false,
        "rationale": "All sides are equal."
      },
      {
        "text": "Isosceles",
        "isCorrect": false,
        "rationale": "Two sides are equal."
      },
      {
        "text": "Scalene",
        "isCorrect": true,
        "rationale": "No sides are equal."
      },
      {
        "text": "Right",
        "isCorrect": false,
        "rationale": "Has a right angle."
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
    "question": "How many faces does a rectangular prism have?",
    "answerOptions": [
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "A pyramid has 4 faces."
      },
      {
        "text": "6",
        "isCorrect": true,
        "rationale": "A rectangular prism (like a box) has 6 faces."
      },
      {
        "text": "8",
        "isCorrect": false,
        "rationale": "A prism has 8 vertices."
      },
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "A prism has 12 edges."
      }
    ],
    "rationale": "A rectangular prism is a three-dimensional shape with six rectangular faces.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "The area of a parallelogram is 60 sq ft. If its base is 12 ft, what is its height?",
    "answerOptions": [
      {
        "text": "5 ft",
        "isCorrect": true,
        "rationale": "Area = base * height. 60 = 12 * h. h = 5."
      },
      {
        "text": "10 ft",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "24 ft",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "720 ft",
        "isCorrect": false,
        "rationale": "This is the product."
      }
    ],
    "rationale": "The formula for the area of a parallelogram is A = b * h. We have 60 = 12 * h. To find the height, divide the area by the base: h = 60 / 12 = 5 feet.",
    "challenge_tags": [
      "math-5"
    ]
  }
];
