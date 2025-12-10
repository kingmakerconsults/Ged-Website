module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "The area of a square is 64 square inches. What is the length of one of its sides?",
    "answerOptions": [
      {
        "text": "4 in",
        "isCorrect": false,
        "rationale": "4*4 = 16."
      },
      {
        "text": "8 in",
        "isCorrect": true,
        "rationale": "The side length is the square root of the area. The square root of 64 is 8."
      },
      {
        "text": "16 in",
        "isCorrect": false,
        "rationale": "This is $\\frac{64}{4}$."
      },
      {
        "text": "32 in",
        "isCorrect": false,
        "rationale": "This is the perimeter of the square."
      }
    ],
    "rationale": "The area of a square is side * side. To find the side length, take the square root of the area: sqrt(64) = 8 inches.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the area of a circle with a radius of 10 cm? Use 3.14 for $\\pi$.",
    "correctAnswer": "314 $cm^2$",
    "rationale": "Area of a circle is A = pi * $r^2$. So, A = 3.14 * (10 cm)$^2$ = 3.14 * 100 = 314 $cm^2$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A rectangular swimming pool is 50 meters long, 25 meters wide, and 2 meters deep. What is its volume?",
    "answerOptions": [
      {
        "text": "77 $m^3$",
        "isCorrect": false,
        "rationale": "This is the sum of the dimensions."
      },
      {
        "text": "150 $m^3$",
        "isCorrect": false,
        "rationale": "This is the perimeter."
      },
      {
        "text": "1250 $m^3$",
        "isCorrect": false,
        "rationale": "This is the surface area of the water."
      },
      {
        "text": "2500 $m^3$",
        "isCorrect": true,
        "rationale": "Volume = length * width * depth = 50 * 25 * 2 = 2500 $m^3$."
      }
    ],
    "rationale": "The volume of a rectangular prism is length x width x height (or depth). V = 50 m * 25 m * 2 m = 2500 $m^3$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "easy",
    "question": "What is the measure of a straight angle?",
    "correctAnswer": "180Â°",
    "rationale": "A straight angle is an angle that forms a straight line, and its measure is 180Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "If two angles of a triangle are 30Â° and 70Â°, what kind of triangle is it?",
    "answerOptions": [
      {
        "text": "Acute",
        "isCorrect": false,
        "rationale": "An acute triangle has all angles less than 90Â°. The third angle is 80Â°, so this is correct, but 'Isosceles' is a better description."
      },
      {
        "text": "Obtuse",
        "isCorrect": false,
        "rationale": "An obtuse triangle has one angle greater than 90Â°."
      },
      {
        "text": "Right",
        "isCorrect": false,
        "rationale": "A right triangle has one 90Â° angle."
      },
      {
        "text": "Isosceles",
        "isCorrect": false,
        "rationale": "An isosceles triangle has two equal angles. The angles are 30, 70, and 80."
      },
      {
        "text": "Scalene",
        "isCorrect": true,
        "rationale": "The third angle is 180-30-70 = 80. Since all angles are different, all sides are different, making it a scalene triangle."
      }
    ],
    "rationale": "The sum of angles in a triangle is 180Â°. The third angle is 180Â° - 30Â° - 70Â° = 80Â°. Since all three angles (30Â°, 70Â°, 80Â°) are different, the triangle is scalene. Since all angles are less than 90Â°, it is also an acute triangle, but scalene is a more specific classification based on the side lengths implied by the angles.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A cylindrical container has a volume of 314 cubic inches and a height of 4 inches. What is its radius? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "5 inches",
        "isCorrect": true,
        "rationale": "Volume = pi * $r^2$ * h. 314 = 3.14 * $r^2$ * 4. 100 = 4$r^2$. 25 = $r^2$. r = 5."
      },
      {
        "text": "10 inches",
        "isCorrect": false,
        "rationale": "This is the diameter."
      },
      {
        "text": "25 inches",
        "isCorrect": false,
        "rationale": "This is $r^2$."
      },
      {
        "text": "78.5 inches",
        "isCorrect": false,
        "rationale": "This is the area of the base."
      }
    ],
    "rationale": "The formula for the volume of a cylinder is V = pi * $r^2$ * h. We have 314 = 3.14 * $r^2$ * 4. Divide by 3.14: 100 = 4$r^2$. Divide by 4: 25 = $r^2$. Take the square root: r = 5 inches.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 7,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the perimeter of an equilateral triangle with a side length of 9 cm?",
    "correctAnswer": "27 cm",
    "rationale": "An equilateral triangle has three equal sides. The perimeter is the sum of the side lengths: 9 cm + 9 cm + 9 cm = 27 cm.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "Find the surface area of a cube with a side length of 5 inches.",
    "answerOptions": [
      {
        "text": "25 $in^2$",
        "isCorrect": false,
        "rationale": "This is the area of one face."
      },
      {
        "text": "100 $in^2$",
        "isCorrect": false,
        "rationale": "This is the area of four faces."
      },
      {
        "text": "125 $in^3$",
        "isCorrect": false,
        "rationale": "This is the volume of the cube."
      },
      {
        "text": "150 $in^2$",
        "isCorrect": true,
        "rationale": "A cube has 6 faces. The area of each face is 5*5=25 $in^2$. Total surface area is 6 * 25 = 150 $in^2$."
      }
    ],
    "rationale": "A cube has 6 identical square faces. The area of one face is 5 inches * 5 inches = 25 $in^2$. The total surface area is 6 * 25 $in^2$ = 150 $in^2$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "hard",
    "question": "A ladder leaning against a wall forms a right triangle. If the ladder is 10 feet long and the base is 6 feet from the wall, how high up the wall does the ladder reach?",
    "correctAnswer": "8 feet",
    "rationale": "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. $a^2 + 6^2 = 10^2$. $a^2 + 36 = 100$. $a^2 = 64$. a = 8 feet.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the name of a polygon with 5 sides?",
    "answerOptions": [
      {
        "text": "Hexagon",
        "isCorrect": false,
        "rationale": "A hexagon has 6 sides."
      },
      {
        "text": "Pentagon",
        "isCorrect": true,
        "rationale": "A pentagon is a 5-sided polygon."
      },
      {
        "text": "Octagon",
        "isCorrect": false,
        "rationale": "An octagon has 8 sides."
      },
      {
        "text": "Quadrilateral",
        "isCorrect": false,
        "rationale": "A quadrilateral has 4 sides."
      }
    ],
    "rationale": "A polygon with 5 sides is called a pentagon.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "Complementary angles are two angles that add up to:",
    "answerOptions": [
      {
        "text": "45Â°",
        "isCorrect": false,
        "rationale": "This is half of a right angle."
      },
      {
        "text": "90Â°",
        "isCorrect": true,
        "rationale": "Complementary angles sum to 90Â°."
      },
      {
        "text": "180Â°",
        "isCorrect": false,
        "rationale": "Supplementary angles sum to 180Â°."
      },
      {
        "text": "360Â°",
        "isCorrect": false,
        "rationale": "This is the sum of angles in a circle."
      }
    ],
    "rationale": "By definition, two angles are complementary if their measures add up to 90 degrees.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "A circular pizza has a diameter of 14 inches. What is its area? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "43.96 $in^2$",
        "isCorrect": false,
        "rationale": "This is the circumference of the pizza."
      },
      {
        "text": "153.86 $in^2$",
        "isCorrect": true,
        "rationale": "The radius is 7 inches. Area = pi * $r^2$ = 3.14 * $7^2$ = 153.86."
      },
      {
        "text": "615.44 $in^2$",
        "isCorrect": false,
        "rationale": "This is the area if the radius was 14 inches."
      },
      {
        "text": "196 $in^2$",
        "isCorrect": false,
        "rationale": "This is the result of squaring the diameter."
      }
    ],
    "rationale": "The radius is half the diameter, so r = 14 / 2 = 7 inches. The area is A = pi * $r^2$ = 3.14 * (7 inches)$^2$ = 3.14 * 49 = 153.86 $in^2$.",
    "challenge_tags": [
      "math-5"
    ]
  }
];
