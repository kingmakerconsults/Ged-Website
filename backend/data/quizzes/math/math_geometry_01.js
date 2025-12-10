module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "easy",
    "question": "What is the area of a rectangle with a length of 10 cm and a width of 5 cm?",
    "answerOptions": [
      {
        "text": "15 $cm^2$",
        "isCorrect": false,
        "rationale": "This is the sum of the length and width, not the area."
      },
      {
        "text": "30 $cm^2$",
        "isCorrect": false,
        "rationale": "This is the perimeter of the rectangle."
      },
      {
        "text": "50 $cm^2$",
        "isCorrect": true,
        "rationale": "Area of a rectangle is length times width: 10 * 5 = 50."
      },
      {
        "text": "100 $cm^2$",
        "isCorrect": false,
        "rationale": "This is the result of squaring the length."
      }
    ],
    "rationale": "The area of a rectangle is calculated by multiplying its length by its width. Area = 10 cm * 5 cm = 50 $cm^2$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 2,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "easy",
    "question": "A square has a perimeter of 24 inches. What is the length of one side?",
    "correctAnswer": "6 inches",
    "rationale": "A square has four equal sides. To find the length of one side, divide the perimeter by 4: 24 inches / 4 = 6 inches.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the area of a triangle with a base of 8 inches and a height of 6 inches?",
    "answerOptions": [
      {
        "text": "14 $in^2$",
        "isCorrect": false,
        "rationale": "This is the sum of the base and height."
      },
      {
        "text": "24 $in^2$",
        "isCorrect": true,
        "rationale": "The area is ($\\frac{1}{2}$) * base * height = ($\\frac{1}{2}$) * 8 * 6 = 24."
      },
      {
        "text": "28 $in^2$",
        "isCorrect": false,
        "rationale": "This is the perimeter of a different triangle."
      },
      {
        "text": "48 $in^2$",
        "isCorrect": false,
        "rationale": "This is the result of multiplying base by height, without multiplying by $\\frac{1}{2}$."
      }
    ],
    "rationale": "The formula for the area of a triangle is A = $\\frac{1}{2}$ * b * h. So, A = $\\frac{1}{2}$ * 8 inches * 6 inches = 24 $in^2$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 4,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "medium",
    "question": "A circle has a radius of 5 meters. What is its circumference? Use 3.14 for $\\pi$.",
    "correctAnswer": "31.4 meters",
    "rationale": "The formula for circumference is C = 2 * pi * r. C = 2 * 3.14 * 5 = 31.4 meters.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "In a right triangle, the two legs have lengths of 9 cm and 12 cm. What is the length of the hypotenuse?",
    "answerOptions": [
      {
        "text": "15 cm",
        "isCorrect": true,
        "rationale": "Using the Pythagorean theorem, $a^2 + b^2 = c^2$. So, $9^2 + 12^2$ = 81 + 144 = 225. The square root of 225 is 15."
      },
      {
        "text": "21 cm",
        "isCorrect": false,
        "rationale": "This is the sum of the two legs."
      },
      {
        "text": "108 cm",
        "isCorrect": false,
        "rationale": "This is the product of the two legs."
      },
      {
        "text": "42 cm",
        "isCorrect": false,
        "rationale": "This is an incorrect calculation."
      }
    ],
    "rationale": "According to the Pythagorean theorem, $a^2 + b^2 = c^2$. So, $9^2 + 12^2 = c^2$, which is $81 + 144 = 225$. Thus, c = $\\sqrt{225}$ = 15 cm.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "What is the volume of a rectangular prism with a length of 7 feet, a width of 3 feet, and a height of 4 feet?",
    "answerOptions": [
      {
        "text": "14 $ft^3$",
        "isCorrect": false,
        "rationale": "This is the sum of the dimensions."
      },
      {
        "text": "49 $ft^3$",
        "isCorrect": false,
        "rationale": "This is the result of an incorrect calculation."
      },
      {
        "text": "84 $ft^3$",
        "isCorrect": true,
        "rationale": "Volume is length * width * height = 7 * 3 * 4 = 84."
      },
      {
        "text": "100 $ft^3$",
        "isCorrect": false,
        "rationale": "This is the result of an incorrect calculation."
      }
    ],
    "rationale": "The volume of a rectangular prism is V = l * w * h. So, V = 7 ft * 3 ft * 4 ft = 84 $ft^3$.",
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
    "question": "Two angles in a triangle measure 40Â° and 60Â°. What is the measure of the third angle?",
    "correctAnswer": "80Â°",
    "rationale": "The sum of the angles in a triangle is always 180Â°. So, the third angle is 180Â° - 40Â° - 60Â° = 80Â°.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "hard",
    "question": "What is the area of a circle with a diameter of 10 inches? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "31.4 $in^2$",
        "isCorrect": false,
        "rationale": "This is the circumference of the circle."
      },
      {
        "text": "78.5 $in^2$",
        "isCorrect": true,
        "rationale": "The radius is half the diameter (5 in). Area = pi * $r^2$ = 3.14 * $5^2$ = 78.5."
      },
      {
        "text": "100 $in^2$",
        "isCorrect": false,
        "rationale": "This is the result of squaring the diameter."
      },
      {
        "text": "314 $in^2$",
        "isCorrect": false,
        "rationale": "This is the result of using the diameter in the area formula."
      }
    ],
    "rationale": "First, find the radius, which is half the diameter: 10 inches / 2 = 5 inches. The area formula is A = pi * $r^2$. So, A = 3.14 * (5 inches)$^2$ = 3.14 * 25 = 78.5 $in^2$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "type": "fillIn",
    "inputCalculator": true,
    "calculator": true,
    "difficulty": "easy",
    "question": "How many feet are in 3 yards?",
    "correctAnswer": "9 feet",
    "rationale": "There are 3 feet in 1 yard. So, in 3 yards, there are 3 * 3 = 9 feet.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "calculator": true,
    "difficulty": "medium",
    "question": "A cylindrical can has a radius of 2 inches and a height of 6 inches. What is its volume? Use 3.14 for $\\pi$.",
    "answerOptions": [
      {
        "text": "37.68 $in^3$",
        "isCorrect": false,
        "rationale": "This is the lateral surface area of the cylinder."
      },
      {
        "text": "75.36 $in^3$",
        "isCorrect": true,
        "rationale": "Volume = pi * $r^2$ * h = 3.14 * $2^2$ * 6 = 75.36."
      },
      {
        "text": "113.04 $in^3$",
        "isCorrect": false,
        "rationale": "This is the result of an incorrect calculation."
      },
      {
        "text": "226.08 $in^3$",
        "isCorrect": false,
        "rationale": "This is double the correct volume."
      }
    ],
    "rationale": "The formula for the volume of a cylinder is V = pi * $r^2$ * h. So, V = 3.14 * (2 inches)$^2$ * 6 inches = 3.14 * 4 * 6 = 75.36 $in^3$.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "hard",
    "question": "An angle that measures 95Â° is classified as what type of angle?",
    "answerOptions": [
      {
        "text": "Acute",
        "isCorrect": false,
        "rationale": "An acute angle is less than 90Â°."
      },
      {
        "text": "Obtuse",
        "isCorrect": true,
        "rationale": "An obtuse angle is greater than 90Â° but less than 180Â°."
      },
      {
        "text": "Right",
        "isCorrect": false,
        "rationale": "A right angle is exactly 90Â°."
      },
      {
        "text": "Straight",
        "isCorrect": false,
        "rationale": "A straight angle is exactly 180Â°."
      }
    ],
    "rationale": "Angles are classified based on their measure. An angle greater than 90Â° and less than 180Â° is an obtuse angle.",
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "calculator": false,
    "difficulty": "medium",
    "question": "What is the perimeter of a regular hexagon with a side length of 8 cm?",
    "answerOptions": [
      {
        "text": "40 cm",
        "isCorrect": false,
        "rationale": "This is the perimeter of a regular pentagon with this side length."
      },
      {
        "text": "48 cm",
        "isCorrect": true,
        "rationale": "A regular hexagon has 6 equal sides. Perimeter = 6 * 8 = 48."
      },
      {
        "text": "56 cm",
        "isCorrect": false,
        "rationale": "This is the perimeter of a regular heptagon."
      },
      {
        "text": "64 cm",
        "isCorrect": false,
        "rationale": "This is the perimeter of a regular octagon."
      }
    ],
    "rationale": "A regular hexagon has 6 equal sides. The perimeter is the sum of the lengths of all sides, so P = 6 * side length = 6 * 8 cm = 48 cm.",
    "challenge_tags": [
      "math-5"
    ]
  }
];
