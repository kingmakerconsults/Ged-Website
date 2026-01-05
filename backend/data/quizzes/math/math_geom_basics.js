/**
 * Geometry Basics
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    "questionNumber": 1,
    "challenge_tags": [
      "math-5"
    ],
    "calculator": false,
    "type": "multipleChoice",
    "question": "A triangle has a base of 8 units and a height of 6 units. What is its area?",
    "answerOptions": [
      {
        "text": "24 sq units",
        "isCorrect": true,
        "rationale": "Area of a triangle is $\\frac{1}{2} \\times base \\times height$. $A = 0.5 \\times 8 \\times 6 = 24$."
      },
      {
        "text": "48 sq units",
        "isCorrect": false,
        "rationale": "This is base times height, without multiplying by $\\frac{1}{2}$."
      },
      {
        "text": "14 sq units",
        "isCorrect": false,
        "rationale": "This is the sum of the base and height."
      },
      {
        "text": "30 sq units",
        "isCorrect": false,
        "rationale": "This is the perimeter of a 6-8-10 triangle."
      }
    ]
  },
  {
    "questionNumber": 2,
    "challenge_tags": [
      "math-5"
    ],
    "calculator": false,
    "question": "A box has a length of 6 inches, a width of 4 inches, and a height of 3 inches. What is its volume?",
    "answerOptions": [
      {
        "text": "13 cubic inches",
        "isCorrect": false,
        "rationale": "This is the sum of the dimensions."
      },
      {
        "text": "72 cubic inches",
        "isCorrect": true,
        "rationale": "Volume of a rectangular prism is length $\\times$ width $\\times$ height. $V = 6 \\times 4 \\times 3 = 72$."
      },
      {
        "text": "24 cubic inches",
        "isCorrect": false,
        "rationale": "This is just length times width."
      },
      {
        "text": "54 cubic inches",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 3,
    "challenge_tags": [
      "math-5"
    ],
    "calculator": false,
    "question": "What is the perimeter of a square with a side length of 7 cm?",
    "answerOptions": [
      {
        "text": "14 cm",
        "isCorrect": false,
        "rationale": "This is twice the side length."
      },
      {
        "text": "28 cm",
        "isCorrect": true,
        "rationale": "Perimeter of a square is $4s$. $P = 4 \\times 7 = 28$."
      },
      {
        "text": "49 cm",
        "isCorrect": false,
        "rationale": "This is the area of the square ($s^2$)."
      },
      {
        "text": "21 cm",
        "isCorrect": false,
        "rationale": "This is three times the side length."
      }
    ]
  },
  {
    "questionNumber": 4,
    "calculator": true,
    "question": "A cylinder has a radius of 3 meters and a height of 10 meters. What is its volume? (Use $\\pi \\approx 3.14$)",
    "answerOptions": [
      {
        "text": "94.2 cubic meters",
        "isCorrect": false,
        "rationale": "This is the lateral surface area."
      },
      {
        "text": "282.6 cubic meters",
        "isCorrect": true,
        "rationale": "Volume of a cylinder is $\\pi r^2 h$. $V = 3.14 \\times (3^2) \\times 10 = 3.14 \\times 9 \\times 10 = 282.6$."
      },
      {
        "text": "90 cubic meters",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "314 cubic meters",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "challenge_tags": [
      "math-5"
    ],
    "calculator": true,
    "question": "The perimeter of a rectangle is 30 feet. If the width is 5 feet, what is the length?",
    "answerOptions": [
      {
        "text": "10 feet",
        "isCorrect": true,
        "rationale": "Perimeter $P = 2l + 2w$. $30 = 2l + 2(5)$. $30 = 2l + 10$. $20 = 2l$. $l = 10$."
      },
      {
        "text": "12.5 feet",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "15 feet",
        "isCorrect": false,
        "rationale": "This is half the perimeter."
      },
      {
        "text": "20 feet",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 6,
    "challenge_tags": [
      "math-5"
    ],
    "calculator": true,
    "question": "What is the area of a circle with a diameter of 10 inches? (Use $\\pi \\approx 3.14$)",
    "answerOptions": [
      {
        "text": "31.4 sq inches",
        "isCorrect": false,
        "rationale": "This is the circumference."
      },
      {
        "text": "78.5 sq inches",
        "isCorrect": true,
        "rationale": "The diameter is 10, so the radius is 5. Area is $\\pi r^2$. $A = 3.14 \\times 5^2 = 3.14 \\times 25 = 78.5$."
      },
      {
        "text": "100 sq inches",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "314 sq inches",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 7,
    "calculator": true,
    "question": "Find the volume of a sphere with a radius of 3 cm. (Use $\\pi \\approx 3.14$ and formula $V = \\frac{4}{3}\\pi r^3$)",
    "answerOptions": [
      {
        "text": "37.68 cubic cm",
        "isCorrect": false,
        "rationale": "This is the surface area."
      },
      {
        "text": "113.04 cubic cm",
        "isCorrect": true,
        "rationale": "$V = \\frac{4}{3} \\times 3.14 \\times (3^3) = \\frac{4}{3} \\times 3.14 \\times 27 = 4 \\times 3.14 \\times 9 = 113.04$."
      },
      {
        "text": "84.78 cubic cm",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "28.26 cubic cm",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "calculator": true,
    "question": "A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?",
    "answerOptions": [
      {
        "text": "13",
        "isCorrect": true,
        "rationale": "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. $5^2 + 12^2 = 25 + 144 = 169$. The square root of 169 is 13."
      },
      {
        "text": "17",
        "isCorrect": false,
        "rationale": "This is the sum of the lengths."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "This is the difference of the lengths."
      },
      {
        "text": "60",
        "isCorrect": false,
        "rationale": "This is the product of the lengths."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "challenge_tags": [
      "math-5"
    ],
    "calculator": true,
    "question": "What is the surface area of a cube with a side length of 4 inches?",
    "answerOptions": [
      {
        "text": "64 sq inches",
        "isCorrect": false,
        "rationale": "This is the volume of the cube."
      },
      {
        "text": "96 sq inches",
        "isCorrect": true,
        "rationale": "A cube has 6 faces. The area of one face is $4 \\times 4 = 16$. The total surface area is $6 \\times 16 = 96$."
      },
      {
        "text": "16 sq inches",
        "isCorrect": false,
        "rationale": "This is the area of one face."
      },
      {
        "text": "32 sq inches",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 10,
    "challenge_tags": [
      "math-5"
    ],
    "calculator": true,
    "question": "A triangle has an area of 30 square meters. If its base is 10 meters, what is its height?",
    "answerOptions": [
      {
        "text": "3 meters",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "6 meters",
        "isCorrect": true,
        "rationale": "Area = $\\frac{1}{2}bh$. $30 = \\frac{1}{2}(10)h$. $30 = 5h$. $h = 6$."
      },
      {
        "text": "15 meters",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "300 meters",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 11,
    "calculator": true,
    "question": "The circumference of a circle is 18.84 cm. What is its radius? (Use $\\pi \\approx 3.14$)",
    "answerOptions": [
      {
        "text": "3 cm",
        "isCorrect": true,
        "rationale": "$C = 2 \\pi r$. $18.84 = 2 \\times 3.14 \\times r$. $18.84 = 6.28r$. $r = 18.84 / 6.28 = 3$."
      },
      {
        "text": "6 cm",
        "isCorrect": false,
        "rationale": "6 is the diameter."
      },
      {
        "text": "9.42 cm",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      },
      {
        "text": "12 cm",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "challenge_tags": [
      "math-5"
    ],
    "calculator": true,
    "question": "A parallelogram has a base of 12 inches and a height of 5 inches. What is its area?",
    "answerOptions": [
      {
        "text": "17 sq inches",
        "isCorrect": false,
        "rationale": "This is the sum of the base and height."
      },
      {
        "text": "60 sq inches",
        "isCorrect": true,
        "rationale": "Area of a parallelogram is base $\\times$ height. $A = 12 \\times 5 = 60$."
      },
      {
        "text": "30 sq inches",
        "isCorrect": false,
        "rationale": "This would be the area if it were a triangle."
      },
      {
        "text": "34 sq inches",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ]
  },
  {
    "questionNumber": 13,
    "calculator": true,
    "question": "A trapezoid has bases of length 8 and 12, and a height of 6. What is its area?",
    "answerOptions": [
      {
        "text": "60",
        "isCorrect": true,
        "rationale": "Area of a trapezoid is $\\frac{1}{2}h(b_1 + b_2)$. $A = 0.5 \\times 6 \\times (8 + 12) = 3 \\times 20 = 60$."
      },
      {
        "text": "120",
        "isCorrect": false,
        "rationale": "Forgot to multiply by $\\frac{1}{2}$."
      },
      {
        "text": "26",
        "isCorrect": false,
        "rationale": "This is the sum of the dimensions."
      },
      {
        "text": "576",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  }
];
