module.exports = [
  {
    "questionNumber": 1,
    "type": "knowledge",
    "question": "In a right triangle with legs 6 and 8, what is the length of the hypotenuse?",
    "answerOptions": [
      {
        "text": "10",
        "rationale": "Correct. 6^2 + 8^2 = 36 + 64 = 100 and sqrt(100) = 10.",
        "isCorrect": true
      },
      {
        "text": "12",
        "rationale": "This adds the legs instead of using the Pythagorean theorem.",
        "isCorrect": false
      },
      {
        "text": "14",
        "rationale": "This multiplies the legs before taking a square root.",
        "isCorrect": false
      },
      {
        "text": "5",
        "rationale": "This subtracts the legs.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "knowledge",
    "question": "A right triangle has a hypotenuse of 13 and one leg of 5. What is the length of the other leg?",
    "answerOptions": [
      {
        "text": "12",
        "rationale": "Correct. 13^2 - 5^2 = 169 - 25 = 144 and sqrt(144) = 12.",
        "isCorrect": true
      },
      {
        "text": "8",
        "rationale": "This subtracts the leg from the hypotenuse without squaring.",
        "isCorrect": false
      },
      {
        "text": "18",
        "rationale": "This adds the hypotenuse and leg.",
        "isCorrect": false
      },
      {
        "text": "sqrt(30)",
        "rationale": "This fails to square before subtracting.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "knowledge",
    "question": "Do the side lengths 7, 24, and 25 form a right triangle?",
    "answerOptions": [
      {
        "text": "Yes, because 7^2 + 24^2 = 25^2.",
        "rationale": "Correct. 49 + 576 = 625 equals 25^2.",
        "isCorrect": true
      },
      {
        "text": "No, because 7 + 24 != 25.",
        "rationale": "Triangle classification depends on squared side lengths, not sums.",
        "isCorrect": false
      },
      {
        "text": "No, because the sides are not consecutive numbers.",
        "rationale": "Consecutive numbers are not required for right triangles.",
        "isCorrect": false
      },
      {
        "text": "Yes, because all sides are different.",
        "rationale": "Being scalene alone does not guarantee a right triangle.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 4,
    "type": "applied",
    "question": "A 15-foot ladder reaches the top of a wall 12 feet high. How far from the wall is the base of the ladder?",
    "answerOptions": [
      {
        "text": "9 feet",
        "rationale": "Correct. 15^2 - 12^2 = 225 - 144 = 81, so the base is sqrt(81) = 9 feet away.",
        "isCorrect": true
      },
      {
        "text": "3 feet",
        "rationale": "This subtracts 12 from 15 without squaring.",
        "isCorrect": false
      },
      {
        "text": "18 feet",
        "rationale": "This adds the ladder length and wall height.",
        "isCorrect": false
      },
      {
        "text": "13 feet",
        "rationale": "This misapplies the theorem by averaging the legs.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "applied",
    "question": "What is the distance between the points (2, -1) and (-4, 3)?",
    "answerOptions": [
      {
        "text": "2 * sqrt(13)",
        "rationale": "Correct. Differences of -6 and 4 give sqrt(36 + 16) = sqrt(52) = 2 * sqrt(13).",
        "isCorrect": true
      },
      {
        "text": "sqrt(20)",
        "rationale": "This squares only one coordinate difference.",
        "isCorrect": false
      },
      {
        "text": "10",
        "rationale": "This adds the coordinate differences without squaring.",
        "isCorrect": false
      },
      {
        "text": "8",
        "rationale": "This treats the differences as legs of a rectangle without squaring.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 6,
    "type": "knowledge",
    "question": "What is the midpoint of the segment with endpoints (5, 9) and (1, -3)?",
    "answerOptions": [
      {
        "text": "(3, 3)",
        "rationale": "Correct. Average the x-coordinates and y-coordinates separately.",
        "isCorrect": true
      },
      {
        "text": "(6, 6)",
        "rationale": "This adds the coordinates without dividing by 2.",
        "isCorrect": false
      },
      {
        "text": "(4, 0)",
        "rationale": "This averages only the x-values correctly.",
        "isCorrect": false
      },
      {
        "text": "(2, 12)",
        "rationale": "This subtracts instead of averaging.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 7,
    "type": "applied",
    "question": "What is the length of the diagonal of a rectangle that is 9 meters wide and 12 meters long?",
    "answerOptions": [
      {
        "text": "15 meters",
        "rationale": "Correct. 9^2 + 12^2 = 81 + 144 = 225, and sqrt(225) = 15.",
        "isCorrect": true
      },
      {
        "text": "21 meters",
        "rationale": "This adds the side lengths.",
        "isCorrect": false
      },
      {
        "text": "108 meters",
        "rationale": "This multiplies the side lengths.",
        "isCorrect": false
      },
      {
        "text": "13 meters",
        "rationale": "This forgets to square before adding.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 8,
    "type": "knowledge",
    "question": "In a 45°-45°-90° triangle with leg length 7, what is the hypotenuse?",
    "answerOptions": [
      {
        "text": "7 * sqrt(2)",
        "rationale": "Correct. Multiply a leg by sqrt(2) for the hypotenuse in this special triangle.",
        "isCorrect": true
      },
      {
        "text": "7",
        "rationale": "This would make the triangle equilateral.",
        "isCorrect": false
      },
      {
        "text": "14",
        "rationale": "This doubles the leg length instead of using sqrt(2).",
        "isCorrect": false
      },
      {
        "text": "7 * sqrt(3)",
        "rationale": "This corresponds to a 30°-60°-90° triangle.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 9,
    "type": "knowledge",
    "question": "In a 30°-60°-90° triangle, the shorter leg is 4. What is the hypotenuse?",
    "answerOptions": [
      {
        "text": "8",
        "rationale": "Correct. The hypotenuse is twice the shorter leg.",
        "isCorrect": true
      },
      {
        "text": "4 * sqrt(3)",
        "rationale": "This gives the length of the longer leg.",
        "isCorrect": false
      },
      {
        "text": "6",
        "rationale": "This averages the two legs.",
        "isCorrect": false
      },
      {
        "text": "2",
        "rationale": "This halves the shorter leg instead of doubling it.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 10,
    "type": "knowledge",
    "question": "What is the radius of the circle defined by x^2 + y^2 = 49?",
    "answerOptions": [
      {
        "text": "7",
        "rationale": "Correct. The equation is in standard form with r^2 = 49.",
        "isCorrect": true
      },
      {
        "text": "49",
        "rationale": "This treats r^2 as the radius itself.",
        "isCorrect": false
      },
      {
        "text": "14",
        "rationale": "This doubles the radius.",
        "isCorrect": false
      },
      {
        "text": "sqrt(49)",
        "rationale": "This restates the radius without simplifying.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 11,
    "type": "applied",
    "question": "What is the equation of a circle with center (3, -2) and radius 5?",
    "answerOptions": [
      {
        "text": "(x - 3)^2 + (y + 2)^2 = 25",
        "rationale": "Correct. Substitute the center and r^2 = 25 into the standard equation.",
        "isCorrect": true
      },
      {
        "text": "(x + 3)^2 + (y - 2)^2 = 5",
        "rationale": "This reverses the signs and forgets to square the radius.",
        "isCorrect": false
      },
      {
        "text": "(x - 3)^2 + (y - 2)^2 = 10",
        "rationale": "This uses 2r instead of r^2.",
        "isCorrect": false
      },
      {
        "text": "(x + 3)^2 + (y + 2)^2 = 25",
        "rationale": "This negates both coordinates of the center.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 12,
    "type": "applied",
    "question": "How far is the point (-3, 4) from the origin?",
    "answerOptions": [
      {
        "text": "5 units",
        "rationale": "Correct. (-3)^2 + 4^2 = 9 + 16 = 25, and sqrt(25) = 5.",
        "isCorrect": true
      },
      {
        "text": "1 unit",
        "rationale": "This subtracts the coordinates instead of using distance.",
        "isCorrect": false
      },
      {
        "text": "7 units",
        "rationale": "This adds the absolute values of the coordinates.",
        "isCorrect": false
      },
      {
        "text": "sqrt(7) units",
        "rationale": "This squares only one coordinate.",
        "isCorrect": false
      }
    ]
  }
];
