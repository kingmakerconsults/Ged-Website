module.exports = [
  {
    "questionNumber": 1,
    "type": "applied",
    "question": "A rectangular room is 12 feet by 15 feet. What is its area in square feet?",
    "answerOptions": [
      {
        "text": "24 square feet",
        "rationale": "This multiplies 12 by 2 instead of 15.",
        "isCorrect": false
      },
      {
        "text": "27 square feet",
        "rationale": "This adds the side lengths before multiplying.",
        "isCorrect": false
      },
      {
        "text": "180 square feet",
        "rationale": "Correct. Area equals length \\times width = 12 \\times 15.",
        "isCorrect": true
      },
      {
        "text": "360 square feet",
        "rationale": "This doubles the correct product.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "applied",
    "question": "Evaluate 3(2x + 5) for x = 4.",
    "answerOptions": [
      {
        "text": "27",
        "rationale": "This multiplies 3 by (2 \\times 4) only.",
        "isCorrect": false
      },
      {
        "text": "33",
        "rationale": "This adds 3 after multiplying 2x + 5.",
        "isCorrect": false
      },
      {
        "text": "39",
        "rationale": "Correct. Substitute x = 4 to get 3(8 + 5) = 3 \\times 13 = 39.",
        "isCorrect": true
      },
      {
        "text": "78",
        "rationale": "This multiplies by 6 instead of 3 after substitution.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "knowledge",
    "question": "Solve 2x + 7 = 31.",
    "answerOptions": [
      {
        "text": "x = 9",
        "rationale": "This divides 31 by 3 instead of subtracting 7 first.",
        "isCorrect": false
      },
      {
        "text": "x = 12",
        "rationale": "Correct. Subtract 7 to get 2x = 24, then divide by 2.",
        "isCorrect": true
      },
      {
        "text": "x = 15",
        "rationale": "This adds 7 to 31 before dividing.",
        "isCorrect": false
      },
      {
        "text": "x = 38",
        "rationale": "This multiplies 31 by 2 instead of isolating x.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 4,
    "type": "knowledge",
    "question": "What is \\sqrt{196}?",
    "answerOptions": [
      {
        "text": "10",
        "rationale": "10^2 = 100, not 196.",
        "isCorrect": false
      },
      {
        "text": "12",
        "rationale": "12^2 = 144.",
        "isCorrect": false
      },
      {
        "text": "14",
        "rationale": "Correct. 14^2 = 196.",
        "isCorrect": true
      },
      {
        "text": "28",
        "rationale": "This doubles the correct square root.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "applied",
    "question": "A savings account earns simple interest on $900 at 4% annually. How much interest is earned in one year?",
    "answerOptions": [
      {
        "text": "$18",
        "rationale": "This uses a 2% rate.",
        "isCorrect": false
      },
      {
        "text": "$27",
        "rationale": "This applies a 3% rate.",
        "isCorrect": false
      },
      {
        "text": "$36",
        "rationale": "Correct. Interest = principal \\times rate \\times time = 900 \\times 0.04 \\times 1.",
        "isCorrect": true
      },
      {
        "text": "$45",
        "rationale": "This applies a 5% rate.",
        "isCorrect": false
      }
    ]
  }
];
