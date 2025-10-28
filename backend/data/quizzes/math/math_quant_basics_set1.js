module.exports = [
  {
    "questionNumber": 1,
    "type": "knowledge",
    "question": "Compute 63 + 48.",
    "answerOptions": [
      {
        "text": "109",
        "rationale": "This subtracts 2 from the correct total.",
        "isCorrect": false
      },
      {
        "text": "111",
        "rationale": "Correct. 63 + 48 = 111.",
        "isCorrect": true
      },
      {
        "text": "112",
        "rationale": "This adds 49 instead of 48.",
        "isCorrect": false
      },
      {
        "text": "113",
        "rationale": "This adds 50 instead of 48.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "knowledge",
    "question": "Evaluate 215 - 87.",
    "answerOptions": [
      {
        "text": "118",
        "rationale": "This subtracts 97 instead of 87.",
        "isCorrect": false
      },
      {
        "text": "126",
        "rationale": "This subtracts 89 instead of 87.",
        "isCorrect": false
      },
      {
        "text": "128",
        "rationale": "Correct. 215 - 87 = 128.",
        "isCorrect": true
      },
      {
        "text": "132",
        "rationale": "This subtracts only 83.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "applied",
    "question": "Find 4.2 \\times 1.5.",
    "answerOptions": [
      {
        "text": "5.7",
        "rationale": "This multiplies 3.8 by 1.5 instead.",
        "isCorrect": false
      },
      {
        "text": "6.0",
        "rationale": "This rounds 1.5 down to 1.4 before multiplying.",
        "isCorrect": false
      },
      {
        "text": "6.3",
        "rationale": "Correct. 4.2 \\times 1.5 = 6.3.",
        "isCorrect": true
      },
      {
        "text": "6.7",
        "rationale": "This adds 4.2 and 1.5 instead of multiplying.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 4,
    "type": "knowledge",
    "question": "What is 18.75 \\div 0.25?",
    "answerOptions": [
      {
        "text": "7.5",
        "rationale": "This divides by 2.5 instead of 0.25.",
        "isCorrect": false
      },
      {
        "text": "37.5",
        "rationale": "This multiplies by 2 instead of dividing by 0.25.",
        "isCorrect": false
      },
      {
        "text": "75",
        "rationale": "Correct. Dividing by 0.25 is the same as multiplying by 4.",
        "isCorrect": true
      },
      {
        "text": "94",
        "rationale": "This adds 18.75 and 75.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "knowledge",
    "question": "Add 2/5 + 3/10.",
    "answerOptions": [
      {
        "text": "1/2",
        "rationale": "This treats 3/10 as 1/5 before adding.",
        "isCorrect": false
      },
      {
        "text": "7/10",
        "rationale": "Correct. Convert 2/5 to 4/10, then add 4/10 + 3/10.",
        "isCorrect": true
      },
      {
        "text": "9/10",
        "rationale": "This adds 2/5 to 1/2 instead of 3/10.",
        "isCorrect": false
      },
      {
        "text": "1 1/5",
        "rationale": "This adds the denominators directly.",
        "isCorrect": false
      }
    ]
  }
];
