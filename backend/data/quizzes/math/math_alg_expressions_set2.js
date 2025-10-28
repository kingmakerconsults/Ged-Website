module.exports = [
  {
    "questionNumber": 1,
    "type": "knowledge",
    "question": "Solve for x: 3x + 5 = 20.",
    "answerOptions": [
      {
        "text": "x = 5",
        "rationale": "Correct. Subtract 5 and divide by 3 to find x.",
        "isCorrect": true
      },
      {
        "text": "x = 15",
        "rationale": "This forgets to divide by 3 after subtracting 5.",
        "isCorrect": false
      },
      {
        "text": "x = 15/3",
        "rationale": "This restates 15 without simplifying and ignores subtraction.",
        "isCorrect": false
      },
      {
        "text": "x = 5/3",
        "rationale": "This divides 5 by 3 instead of 15 by 3.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "applied",
    "question": "Solve for x: 2(x - 4) = 18.",
    "answerOptions": [
      {
        "text": "x = 13",
        "rationale": "Correct. Divide by 2 to get x - 4 = 9 and then add 4.",
        "isCorrect": true
      },
      {
        "text": "x = 7",
        "rationale": "This subtracts instead of adds after dividing.",
        "isCorrect": false
      },
      {
        "text": "x = 11",
        "rationale": "This adds 2 instead of 4 after dividing.",
        "isCorrect": false
      },
      {
        "text": "x = -5",
        "rationale": "This mismanages both the division and addition steps.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "knowledge",
    "question": "Solve for x: 1/2x - 4 = 2.",
    "answerOptions": [
      {
        "text": "x = 12",
        "rationale": "Correct. Add 4 to get 1/2x = 6 and multiply by 2.",
        "isCorrect": true
      },
      {
        "text": "x = 4",
        "rationale": "This stops after adding 4.",
        "isCorrect": false
      },
      {
        "text": "x = -12",
        "rationale": "This adds 4 incorrectly and multiplies by -2.",
        "isCorrect": false
      },
      {
        "text": "x = 3",
        "rationale": "This divides by 2 instead of multiplying after isolating.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 4,
    "type": "knowledge",
    "question": "Solve for x: 5 - 2x = 13.",
    "answerOptions": [
      {
        "text": "x = -4",
        "rationale": "Correct. Subtract 5 to get -2x = 8 and divide by -2.",
        "isCorrect": true
      },
      {
        "text": "x = 4",
        "rationale": "This ignores the negative coefficient on x.",
        "isCorrect": false
      },
      {
        "text": "x = -9",
        "rationale": "This subtracts 5 incorrectly to get -2x = -8.",
        "isCorrect": false
      },
      {
        "text": "x = 9",
        "rationale": "This divides 8 by 2 without addressing the sign.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "knowledge",
    "question": "Solve the inequality 4x - 7 < 9.",
    "answerOptions": [
      {
        "text": "x < 4",
        "rationale": "Correct. Add 7 and divide by 4 to isolate x.",
        "isCorrect": true
      },
      {
        "text": "x < 2",
        "rationale": "This divides by 2 instead of 4.",
        "isCorrect": false
      },
      {
        "text": "x > 4",
        "rationale": "The inequality direction should not reverse because we divided by a positive number.",
        "isCorrect": false
      },
      {
        "text": "x > -4",
        "rationale": "This adds instead of subtracts 7.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 6,
    "type": "applied",
    "question": "Solve the inequality -3(x + 2) <= 12.",
    "answerOptions": [
      {
        "text": "x >= -6",
        "rationale": "Correct. Divide by -3 and reverse the inequality sign.",
        "isCorrect": true
      },
      {
        "text": "x <= -6",
        "rationale": "This forgets to reverse the inequality when dividing by a negative.",
        "isCorrect": false
      },
      {
        "text": "x >= 6",
        "rationale": "This adds instead of subtracts when isolating x.",
        "isCorrect": false
      },
      {
        "text": "x <= 6",
        "rationale": "This mishandles both the sign and the direction of the inequality.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 7,
    "type": "knowledge",
    "question": "Solve for x: 2/3x + 1 = 7.",
    "answerOptions": [
      {
        "text": "x = 9",
        "rationale": "Correct. Subtract 1 to get 2/3x = 6 and multiply by 3/2.",
        "isCorrect": true
      },
      {
        "text": "x = 8",
        "rationale": "This divides 6 by 2 but forgets to multiply by 3.",
        "isCorrect": false
      },
      {
        "text": "x = 3",
        "rationale": "This multiplies 6 by 1/2 instead of 3/2.",
        "isCorrect": false
      },
      {
        "text": "x = -9",
        "rationale": "This subtracts 1 incorrectly and mishandles the fraction.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 8,
    "type": "applied",
    "question": "Solve |x - 3| = 5.",
    "answerOptions": [
      {
        "text": "x = 8 or x = -2",
        "rationale": "Correct. Set x - 3 = 5 and x - 3 = -5 to find both solutions.",
        "isCorrect": true
      },
      {
        "text": "x = 8 only",
        "rationale": "Absolute value equations typically yield two solutions.",
        "isCorrect": false
      },
      {
        "text": "x = -2 only",
        "rationale": "Both the positive and negative cases must be considered.",
        "isCorrect": false
      },
      {
        "text": "x = 5 or x = -5",
        "rationale": "This confuses the solutions with the absolute value outputs.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 9,
    "type": "knowledge",
    "question": "Solve for x: 3x + 4 = 2x - 6.",
    "answerOptions": [
      {
        "text": "x = -10",
        "rationale": "Correct. Subtract 2x and 4 to isolate x.",
        "isCorrect": true
      },
      {
        "text": "x = 10",
        "rationale": "This drops the negative sign when moving terms.",
        "isCorrect": false
      },
      {
        "text": "x = -2",
        "rationale": "This subtracts 4 on the wrong side.",
        "isCorrect": false
      },
      {
        "text": "x = 2",
        "rationale": "This divides -6 by 3 without collecting like terms.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 10,
    "type": "knowledge",
    "question": "Solve the inequality x/5 >= -2.",
    "answerOptions": [
      {
        "text": "x >= -10",
        "rationale": "Correct. Multiply both sides by 5, a positive number.",
        "isCorrect": true
      },
      {
        "text": "x <= -10",
        "rationale": "The inequality should not reverse when multiplying by a positive number.",
        "isCorrect": false
      },
      {
        "text": "x >= 10",
        "rationale": "This ignores the negative sign on the right-hand side.",
        "isCorrect": false
      },
      {
        "text": "x <= 10",
        "rationale": "This reverses the inequality and changes the sign incorrectly.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 11,
    "type": "applied",
    "question": "Solve for x: 4(x - 1) = 2x + 6.",
    "answerOptions": [
      {
        "text": "x = 5",
        "rationale": "Correct. Distribute to get 4x - 4 and then isolate x.",
        "isCorrect": true
      },
      {
        "text": "x = 3",
        "rationale": "This subtracts 4 from 6 incorrectly.",
        "isCorrect": false
      },
      {
        "text": "x = -5",
        "rationale": "This changes the sign when moving terms across the equation.",
        "isCorrect": false
      },
      {
        "text": "x = 10",
        "rationale": "This divides 10 by 1 instead of 2 after simplifying.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 12,
    "type": "applied",
    "question": "Five more than twice a number equals 23. What is the number?",
    "answerOptions": [
      {
        "text": "x = 9",
        "rationale": "Correct. Solve 2x + 5 = 23 to get 2x = 18 and x = 9.",
        "isCorrect": true
      },
      {
        "text": "x = 14",
        "rationale": "This adds 5 to 23 instead of subtracting.",
        "isCorrect": false
      },
      {
        "text": "x = 18",
        "rationale": "This equates twice the number directly to 23 without subtracting 5.",
        "isCorrect": false
      },
      {
        "text": "x = 9/2",
        "rationale": "This divides 23 by 2 without first removing the added 5.",
        "isCorrect": false
      }
    ]
  }
];
