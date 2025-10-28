module.exports = [
  {
    "questionNumber": 1,
    "type": "knowledge",
    "question": "Simplify the ratio 42:56 to lowest terms.",
    "answerOptions": [
      {
        "text": "2:3",
        "rationale": "Dividing by 21 instead of the greatest common factor leaves a fraction.",
        "isCorrect": false
      },
      {
        "text": "3:4",
        "rationale": "Correct. Divide both numbers by 14.",
        "isCorrect": true
      },
      {
        "text": "4:7",
        "rationale": "This reverses the ratio after simplifying.",
        "isCorrect": false
      },
      {
        "text": "6:7",
        "rationale": "This divides only the first term by 7.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "applied",
    "question": "Solve 5/8 = x/40.",
    "answerOptions": [
      {
        "text": "20",
        "rationale": "This multiplies 5 by 4 instead of 5 by 5.",
        "isCorrect": false
      },
      {
        "text": "25",
        "rationale": "Correct. Multiply both sides by 40 to get x = 25.",
        "isCorrect": true
      },
      {
        "text": "32",
        "rationale": "This multiplies 8 by 4 instead of cross-multiplying.",
        "isCorrect": false
      },
      {
        "text": "35",
        "rationale": "This treats 5/8 as 5/10.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "applied",
    "question": "A store marks up \\$240 by 12%. What is the new price?",
    "answerOptions": [
      {
        "text": "$254.40",
        "rationale": "This uses 6% instead of 12%.",
        "isCorrect": false
      },
      {
        "text": "$268.80",
        "rationale": "Correct. The markup is 0.12 \\times 240 = 28.80, so add it to 240.",
        "isCorrect": true
      },
      {
        "text": "$270.00",
        "rationale": "This rounds 12% of 240 to 30.",
        "isCorrect": false
      },
      {
        "text": "$300.00",
        "rationale": "This applies a 25% increase instead of 12%.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 4,
    "type": "knowledge",
    "question": "What percent is 18 out of 24?",
    "answerOptions": [
      {
        "text": "60%",
        "rationale": "This divides 18 by 30.",
        "isCorrect": false
      },
      {
        "text": "66 2/3%",
        "rationale": "This assumes the denominator is 27.",
        "isCorrect": false
      },
      {
        "text": "72%",
        "rationale": "This multiplies by 4 instead of 100 when converting.",
        "isCorrect": false
      },
      {
        "text": "75%",
        "rationale": "Correct. 18/24 = 0.75 = 75%.",
        "isCorrect": true
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "knowledge",
    "question": "Convert 0.085 to a percent.",
    "answerOptions": [
      {
        "text": "0.85%",
        "rationale": "This multiplies by 10 instead of 100.",
        "isCorrect": false
      },
      {
        "text": "0.0085%",
        "rationale": "This divides by 100 instead of multiplying.",
        "isCorrect": false
      },
      {
        "text": "8.5%",
        "rationale": "Correct. Move the decimal two places to the right.",
        "isCorrect": true
      },
      {
        "text": "85%",
        "rationale": "This multiplies by 1000.",
        "isCorrect": false
      }
    ]
  }
];
