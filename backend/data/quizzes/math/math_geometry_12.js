// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the area of a triangle with a base of 10 and height of 5?",
    "answerOptions": [
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is the sum."
      },
      {
        "text": "25",
        "isCorrect": true,
        "rationale": "Area = ($\\frac{1}{2}$)*10*5 = 25."
      },
      {
        "text": "30",
        "isCorrect": false,
        "rationale": "This is the perimeter of a different triangle."
      },
      {
        "text": "50",
        "isCorrect": false,
        "rationale": "This is base*height."
      }
    ],
    "rationale": "The area of a triangle is A = $\\frac{1}{2}$ * b * h. A = $\\frac{1}{2}$ * 10 * 5 = 25.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A circle's area is 314 sq. units. What is its radius? Use 3.14 for $\\pi$.",
    "correctAnswer": "10",
    "rationale": "Area = pi*$r^2$. 314 = 3.14 * $r^2$. $r^2$ = 100. r = 10.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the volume of a cylinder with r=3 and h=10? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "94.2",
        "isCorrect": false,
        "rationale": "This is the surface area of the side."
      },
      {
        "text": "282.6",
        "isCorrect": true,
        "rationale": "V = pi * $3^2$ * 10 = 282.6."
      },
      {
        "text": "314",
        "isCorrect": false,
        "rationale": "This is if r=10, h=1."
      },
      {
        "text": "942",
        "isCorrect": false,
        "rationale": "This is if r=10, h=3."
      }
    ],
    "rationale": "The volume of a cylinder is V = pi * $r^2$ * h. V = 3.14 * ($3)^2$ * 10 = 282.6.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "An angle of 180Â° is a ___ angle.",
    "correctAnswer": "straight",
    "rationale": "A straight angle is an angle of 180Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A rectangle has a perimeter of 30 and a width of 5. What is its length?",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": false,
        "rationale": "This is the width."
      },
      {
        "text": "10",
        "isCorrect": true,
        "rationale": "P=2(L+W). 30=2(L+5). 15=L+5. L=10."
      },
      {
        "text": "15",
        "isCorrect": false,
        "rationale": "This is half the perimeter."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "This is 30-10."
      }
    ],
    "rationale": "Perimeter P = 2(L + W). 30 = 2(L + 5). 15 = L + 5. L = 10.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "Find the surface area of a sphere with a diameter of 10. Use 3.14 for $\\pi$ and SA=$4\\pi r^2$.",
    "answerOptions": [
      {
        "text": "31.4",
        "isCorrect": false,
        "rationale": "This is the circumference."
      },
      {
        "text": "78.5",
        "isCorrect": false,
        "rationale": "This is the area of a circle with this diameter."
      },
      {
        "text": "314",
        "isCorrect": true,
        "rationale": "The radius is 5. SA = 4*3.14*5Â² = 314."
      },
      {
        "text": "523.33",
        "isCorrect": false,
        "rationale": "This is the volume."
      }
    ],
    "rationale": "The radius is half the diameter, so r=5. The surface area is SA = 4 * pi * $r^2$ = 4 * 3.14 * $5^2$ = 314.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the area of a square with perimeter 48?",
    "correctAnswer": "144",
    "rationale": "The side length is \\frac{48}{4} = 12. The area is $12^2$ = 144.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A right triangle has legs of 1.5 and 2. What is the hypotenuse?",
    "answerOptions": [
      {
        "text": "2.5",
        "isCorrect": true,
        "rationale": "$1.5^2$ + $2^2$ = 2.25 + 4 = 6.25. sqrt(6.25) = 2.5."
      },
      {
        "text": "3.5",
        "isCorrect": false,
        "rationale": "This is the sum."
      },
      {
        "text": "6.25",
        "isCorrect": false,
        "rationale": "This is the hypotenuse squared."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "This is 1.5*2."
      }
    ],
    "rationale": "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. $1.5^2 + 2^2 = 2.25 + 4 = 6.25$. c = $\\sqrt{6.25}$ = 2.5.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "How many feet are in half a mile? (1 mile = 5280 feet)",
    "correctAnswer": "2640 feet",
    "rationale": "Half a mile is 5280 / 2 = 2640 feet.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Which shape does not have any parallel sides?",
    "answerOptions": [
      {
        "text": "Square",
        "isCorrect": false,
        "rationale": "A square has two pairs of parallel sides."
      },
      {
        "text": "Trapezoid",
        "isCorrect": false,
        "rationale": "A trapezoid has one pair of parallel sides."
      },
      {
        "text": "Kite",
        "isCorrect": true,
        "rationale": "A kite has no parallel sides (unless it's a rhombus)."
      },
      {
        "text": "Hexagon",
        "isCorrect": false,
        "rationale": "A regular hexagon has three pairs of parallel sides."
      }
    ],
    "rationale": "A kite is a quadrilateral with two pairs of equal-length sides that are adjacent to each other. It typically has no parallel sides.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If an angle is 120Â°, what is its supplementary angle?",
    "answerOptions": [
      {
        "text": "30Â°",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "60Â°",
        "isCorrect": true,
        "rationale": "180 - 120 = 60."
      },
      {
        "text": "90Â°",
        "isCorrect": false,
        "rationale": "This is a right angle."
      },
      {
        "text": "240Â°",
        "isCorrect": false,
        "rationale": "This is 120*2."
      }
    ],
    "rationale": "Supplementary angles add up to 180Â°. The supplement of 120Â° is 180Â° - 120Â° = 60Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "The volume of a cone is 100. If a cylinder has the same base and height, what is its volume?",
    "answerOptions": [
      {
        "text": "100",
        "isCorrect": false,
        "rationale": "The volume of a cone is $\\frac{1}{3}$ that of a cylinder with the same base and height."
      },
      {
        "text": "200",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "300",
        "isCorrect": true,
        "rationale": "The volume of a cylinder is 3 times the volume of a cone with the same base and height. 3 * 100 = 300."
      },
      {
        "text": "Cannot be determined",
        "isCorrect": false,
        "rationale": "It can be determined."
      }
    ],
    "rationale": "The volume of a cone is given by V = ($\\frac{1}{3}$) * pi * rÂ² * h, while the volume of a cylinder is V = pi * rÂ² * h. Therefore, a cylinder's volume is 3 times that of a cone with the same base and height. 3 * 100 = 300.",
    "challenge_tags": [
      "math-5"
    ]
  }
];
