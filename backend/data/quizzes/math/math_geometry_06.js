// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the perimeter of a regular pentagon with a side length of 10 inches?",
    "answerOptions": [
      {
        "text": "30 in",
        "isCorrect": false,
        "rationale": "This would be for a triangle."
      },
      {
        "text": "40 in",
        "isCorrect": false,
        "rationale": "This would be for a square."
      },
      {
        "text": "50 in",
        "isCorrect": true,
        "rationale": "A regular pentagon has 5 equal sides. The perimeter is 5 * 10 = 50 inches."
      },
      {
        "text": "60 in",
        "isCorrect": false,
        "rationale": "This would be for a hexagon."
      }
    ],
    "rationale": "A regular pentagon has 5 equal sides. The perimeter is the side length multiplied by the number of sides: 10 inches * 5 = 50 inches.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A circle has a radius of 9 cm. What is its area? Use 3.14 for $\\pi$.",
    "correctAnswer": "254.34 $cm^2$",
    "rationale": "Area = pi * $r^2$. A = 3.14 * (9 cm)$^2$ = 3.14 * 81 = 254.34 $cm^2$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A rectangular box is 8 inches long, 5 inches wide, and 3 inches high. What is its volume?",
    "answerOptions": [
      {
        "text": "16 $in^3$",
        "isCorrect": false,
        "rationale": "This is the sum of the dimensions."
      },
      {
        "text": "120 $in^3$",
        "isCorrect": true,
        "rationale": "Volume = length * width * height = 8 * 5 * 3 = 120."
      },
      {
        "text": "158 $in^2$",
        "isCorrect": false,
        "rationale": "This is the surface area."
      },
      {
        "text": "40 $in^3$",
        "isCorrect": false,
        "rationale": "This is just length * width."
      }
    ],
    "rationale": "The volume of a rectangular prism (box) is found by multiplying its length, width, and height. V = 8 in * 5 in * 3 in = 120 $in^3$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "easy",
    "question": "An angle measuring exactly 90Â° is called what?",
    "correctAnswer": "Right angle",
    "rationale": "A right angle is an angle that measures exactly 90Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A triangle has side lengths of 8, 15, and 17. Is it a right triangle?",
    "answerOptions": [
      {
        "text": "Yes, because 8 + 15 > 17.",
        "isCorrect": false,
        "rationale": "The triangle inequality theorem confirms it's a triangle, but not if it's a right triangle."
      },
      {
        "text": "Yes, because $8^2 + 15^2 = 17^2$.",
        "isCorrect": true,
        "rationale": "The sides satisfy the Pythagorean theorem: 64 + 225 = 289."
      },
      {
        "text": "No, because the sides are all different lengths.",
        "isCorrect": false,
        "rationale": "This makes it scalene, but doesn't rule out a right triangle."
      },
      {
        "text": "No, because 8 + 15 is not equal to 17.",
        "isCorrect": false,
        "rationale": "This is an incorrect application of the Pythagorean theorem."
      }
    ],
    "rationale": "To determine if a triangle is a right triangle, we check if its side lengths satisfy the Pythagorean theorem ($a^2 + b^2 = c^2$). $8^2 + 15^2 = 64 + 225 = 289$. And $17^2 = 289$. Since they are equal, it is a right triangle.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A globe has a diameter of 16 inches. What is its surface area? Use 3.14 for $\\pi$ and the formula SA = $4\\pi r^2$.",
    "answerOptions": [
      {
        "text": "200.96 $in^2$",
        "isCorrect": false,
        "rationale": "This would be the surface area for a radius of 4 inches."
      },
      {
        "text": "803.84 $in^2$",
        "isCorrect": true,
        "rationale": "The radius is 8 inches. SA = 4 * 3.14 * $8^2$ = 803.84."
      },
      {
        "text": "2143.57 $in^3$",
        "isCorrect": false,
        "rationale": "This is the volume of the globe."
      },
      {
        "text": "3215.36 $in^2$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "The radius is half the diameter, so r = 16 / 2 = 8 inches. The surface area of a sphere is SA = 4 * pi * $r^2$. SA = 4 * 3.14 * (8 inches)$^2$ = 4 * 3.14 * 64 = 803.84 $in^2$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": false,
    "difficulty": "medium",
    "question": "If two angles in a triangle are 45Â° and 90Â°, what is the third angle?",
    "correctAnswer": "45Â°",
    "rationale": "The sum of the angles in a triangle is 180Â°. So, the third angle is 180Â° - 90Â° - 45Â° = 45Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the area of a trapezoid with bases 12 and 8, and height 6?",
    "answerOptions": [
      {
        "text": "26",
        "isCorrect": false,
        "rationale": "This is the sum of the dimensions."
      },
      {
        "text": "60",
        "isCorrect": true,
        "rationale": "Area = ($\\frac{1}{2}$) * (12 + 8) * 6 = ($\\frac{1}{2}$) * 20 * 6 = 60."
      },
      {
        "text": "120",
        "isCorrect": false,
        "rationale": "This omits the $\\frac{1}{2}$ from the formula."
      },
      {
        "text": "576",
        "isCorrect": false,
        "rationale": "This is 12*8*6."
      }
    ],
    "rationale": "The formula for the area of a trapezoid is A = $\\frac{1}{2}(b_1 + b_2)h$. A = $\\frac{1}{2}(12 + 8) \\times 6 = \\frac{1}{2}(20) \\times 6 = 10 \\times 6 = 60$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",\n  "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A rectangular field is 100 yards long and 50 yards wide. What is the length of the diagonal in yards?",
    "correctAnswer": "111.8 yards",
    "rationale": "The diagonal forms the hypotenuse of a right triangle. Using the Pythagorean theorem: dÂ² = 100Â² + 50Â² = 10000 + 2500 = 12500. d = sqrt(12500) â‰ˆ 111.8 yards.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the sum of the interior angles of a hexagon?",
    "answerOptions": [
      {
        "text": "360Â°",
        "isCorrect": false,
        "rationale": "This is for a quadrilateral."
      },
      {
        "text": "540Â°",
        "isCorrect": false,
        "rationale": "This is for a pentagon."
      },
      {
        "text": "720Â°",
        "isCorrect": true,
        "rationale": "The formula is (n-2) * 180Â°. For a hexagon, n=6. (6-2)*180 = 4*180 = 720Â°."
      },
      {
        "text": "1080Â°",
        "isCorrect": false,
        "rationale": "This is for an octagon."
      }
    ],
    "rationale": "The sum of the interior angles of a polygon is given by the formula (n-2) * 180Â°, where n is the number of sides. For a hexagon, n=6, so the sum is (6-2) * 180Â° = 720Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "A straight line is drawn through the center of a circle. This line is called the:",
    "answerOptions": [
      {
        "text": "Radius",
        "isCorrect": false,
        "rationale": "The radius is the distance from the center to the edge."
      },
      {
        "text": "Diameter",
        "isCorrect": true,
        "rationale": "The diameter is a chord that passes through the center of a circle."
      },
      {
        "text": "Chord",
        "isCorrect": false,
        "rationale": "A chord is a line segment connecting two points on a circle. The diameter is a special type of chord."
      },
      {
        "text": "Tangent",
        "isCorrect": false,
        "rationale": "A tangent is a line that touches the circle at only one point."
      }
    ],
    "rationale": "The diameter of a circle is any straight line segment that passes through the center of the circle and whose endpoints lie on the circle.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A cone has a radius of 6 cm and a height of 10 cm. What is its volume? Use 3.14 for $\\pi$ and the formula V = $\\frac{1}{3}\\pi r^2 h$.",
    "answerOptions": [
      {
        "text": "188.4 $cm^3$",
        "isCorrect": false,
        "rationale": "This is the lateral surface area."
      },
      {
        "text": "376.8 $cm^3$",
        "isCorrect": true,
        "rationale": "V = (\\frac{1}{3}) * 3.14 * $6^2$ * 10 = (\\frac{1}{3}) * 3.14 * 36 * 10 = 376.8."
      },
      {
        "text": "1130.4 $cm^3$",
        "isCorrect": false,
        "rationale": "This is the volume of a cylinder with the same dimensions."
      },
      {
        "text": "1884 $cm^3$",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "Using the formula for the volume of a cone, V = ($\\frac{1}{3}$) * pi * $r^2$ * h. V = ($\\frac{1}{3}$) * 3.14 * (6 cm)$^2$ * 10 cm = ($\\frac{1}{3}$) * 3.14 * 36 * 10 = 376.8 $cm^3$.",
    "challenge_tags": [
      "math-5"
    ]
  }
];
