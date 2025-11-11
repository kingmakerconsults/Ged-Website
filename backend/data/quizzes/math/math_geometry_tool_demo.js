// Geometry concepts demo: replaced placeholders with real multiple-choice items.
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "What is the perimeter of a rectangle with length 8 and width 3?",
    "answerOptions": [
      {
        "text": "22",
        "isCorrect": true,
        "rationale": "Perimeter P = 2(l + w) = 2(8+3) = 22."
      },
      {
        "text": "24",
        "isCorrect": false,
        "rationale": "24 would be 2×(8+4); width is 3, not 4."
      },
      {
        "text": "11",
        "isCorrect": false,
        "rationale": "11 is l + w, not the perimeter."
      },
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "16 is 2×8; ignores the width."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "Find the area of a triangle with base 10 and height 6.",
    "answerOptions": [
      {
        "text": "30",
        "isCorrect": true,
        "rationale": "A = 1/2·b·h = 1/2·10·6 = 30."
      },
      {
        "text": "60",
        "isCorrect": false,
        "rationale": "This is b·h; must divide by 2 for a triangle."
      },
      {
        "text": "16",
        "isCorrect": false,
        "rationale": "Unrelated to the given base and height."
      },
      {
        "text": "36",
        "isCorrect": false,
        "rationale": "Incorrect multiplication or missing 1/2 factor."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Using π ≈ 3.14, what is the area of a circle with radius 5?",
    "answerOptions": [
      {
        "text": "78.5",
        "isCorrect": true,
        "rationale": "A = πr^2 = 3.14×25 = 78.5."
      },
      {
        "text": "31.4",
        "isCorrect": false,
        "rationale": "31.4 is the circumference for r=5 (≈ 2πr)."
      },
      {
        "text": "62.8",
        "isCorrect": false,
        "rationale": "62.8 is 2πr, not area."
      },
      {
        "text": "25",
        "isCorrect": false,
        "rationale": "25 is r^2; multiply by π to get area."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 4,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "A right triangle has legs 6 and 8. What is the length of the hypotenuse?",
    "answerOptions": [
      {
        "text": "10",
        "isCorrect": true,
        "rationale": "c = √(6^2 + 8^2) = √(36+64) = √100 = 10."
      },
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "12^2 = 144; legs give 100 under the square root."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "7^2 = 49; too small."
      },
      {
        "text": "14",
        "isCorrect": false,
        "rationale": "Too large; exact value is 10."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Which statement about a triangle with side lengths 5, 12, and 13 is true?",
    "answerOptions": [
      {
        "text": "It is a right triangle.",
        "isCorrect": true,
        "rationale": "5^2 + 12^2 = 25 + 144 = 169 = 13^2."
      },
      {
        "text": "It is an acute triangle.",
        "isCorrect": false,
        "rationale": "The Pythagorean triple indicates a right angle."
      },
      {
        "text": "It is an obtuse triangle.",
        "isCorrect": false,
        "rationale": "Largest angle is 90°, not >90°."
      },
      {
        "text": "It cannot form a triangle.",
        "isCorrect": false,
        "rationale": "Triangle inequality holds and it’s a known triple."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "Find the volume of a rectangular prism with length 4, width 3, and height 5.",
    "answerOptions": [
      {
        "text": "60",
        "isCorrect": true,
        "rationale": "V = l·w·h = 4·3·5 = 60."
      },
      {
        "text": "54",
        "isCorrect": false,
        "rationale": "54 is 3×3×6 or 6×3×3; not our dimensions."
      },
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "12 is l·w; must multiply by height."
      },
      {
        "text": "20",
        "isCorrect": false,
        "rationale": "20 is 4×5; missing the width factor."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 7,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "What is the surface area of a cube with edge length 3?",
    "answerOptions": [
      {
        "text": "54",
        "isCorrect": true,
        "rationale": "SA = 6a^2 = 6×9 = 54."
      },
      {
        "text": "27",
        "isCorrect": false,
        "rationale": "27 is the volume (3^3), not surface area."
      },
      {
        "text": "18",
        "isCorrect": false,
        "rationale": "18 would be 2a^2 for a=3, not 6a^2."
      },
      {
        "text": "36",
        "isCorrect": false,
        "rationale": "36 is 4a^2 for a=3; a cube has 6 faces."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "What is the sum of the interior angles of a regular hexagon?",
    "answerOptions": [
      {
        "text": "720°",
        "isCorrect": true,
        "rationale": "Sum = (n−2)·180° = 4·180° = 720° for n=6."
      },
      {
        "text": "540°",
        "isCorrect": false,
        "rationale": "540° is for a pentagon (n=5)."
      },
      {
        "text": "900°",
        "isCorrect": false,
        "rationale": "Too large for a hexagon; 900° is for n=7."
      },
      {
        "text": "360°",
        "isCorrect": false,
        "rationale": "360° is the sum around a point, not polygon interior sum for n=6."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 9,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "Two parallel lines are cut by a transversal. If one interior angle is 65°, what is the measure of the alternate interior angle?",
    "answerOptions": [
      {
        "text": "65°",
        "isCorrect": true,
        "rationale": "Alternate interior angles are congruent when lines are parallel."
      },
      {
        "text": "115°",
        "isCorrect": false,
        "rationale": "This is a supplementary angle, not the alternate interior."
      },
      {
        "text": "25°",
        "isCorrect": false,
        "rationale": "No standard relationship yields 25° here."
      },
      {
        "text": "90°",
        "isCorrect": false,
        "rationale": "Right angles arise in perpendicular contexts, not necessarily here."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 10,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Triangles ABC and A'B'C' are similar with a scale factor of 2 (from ABC to A'B'C'). If AB = 7, what is A'B'?",
    "answerOptions": [
      {
        "text": "14",
        "isCorrect": true,
        "rationale": "Corresponding sides scale by the factor: 7×2 = 14."
      },
      {
        "text": "9",
        "isCorrect": false,
        "rationale": "9 would imply a factor ≈ 1.29; not given."
      },
      {
        "text": "3.5",
        "isCorrect": false,
        "rationale": "3.5 is half, not double."
      },
      {
        "text": "7",
        "isCorrect": false,
        "rationale": "Unscaled length; must multiply by 2."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 11,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Using π ≈ 3.14, find the circumference of a circle with diameter 12.",
    "answerOptions": [
      {
        "text": "37.68",
        "isCorrect": true,
        "rationale": "C = πd = 3.14×12 = 37.68."
      },
      {
        "text": "75.36",
        "isCorrect": false,
        "rationale": "This doubles the correct circumference."
      },
      {
        "text": "18.84",
        "isCorrect": false,
        "rationale": "This is πr with r=6; circumference uses πd."
      },
      {
        "text": "12",
        "isCorrect": false,
        "rationale": "12 is the diameter, not the circumference."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  },
  {
    "questionNumber": 12,
    "type": "multipleChoice",
    "difficulty": "hard",
    "question": "What is the distance between points (1, 2) and (5, 5)?",
    "answerOptions": [
      {
        "text": "5",
        "isCorrect": true,
        "rationale": "Distance = √((5−1)^2 + (5−2)^2) = √(16+9) = √25 = 5."
      },
      {
        "text": "4",
        "isCorrect": false,
        "rationale": "4 is |Δx|; must combine both Δx and Δy."
      },
      {
        "text": "3",
        "isCorrect": false,
        "rationale": "3 is |Δy|; must combine both Δx and Δy."
      },
      {
        "text": "6",
        "isCorrect": false,
        "rationale": "Too large; exact distance is 5."
      }
    ],
    "challenge_tags": [
      "math-5"
    ]
  }
];
