// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "Which sentence is grammatically correct?",
    "answerOptions": [
      {
        "text": "The dog wagged it's tail.",
        "rationale": "'It's' is a contraction of 'it is'. The correct possessive is 'its'.",
        "isCorrect": false
      },
      {
        "text": "Her and I are going to the movie.",
        "rationale": "'Her' is an object pronoun. The correct subject pronoun is 'She'.",
        "isCorrect": false
      },
      {
        "text": "There are two cats in the yard.",
        "rationale": "Correct. The plural verb 'are' correctly agrees with the plural subject 'cats'.",
        "isCorrect": true
      },
      {
        "text": "I did good on the exam.",
        "rationale": "'Good' is an adjective. The correct adverb to modify 'did' is 'well'.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Which sentence has a subject-verb agreement error?",
    "answerOptions": [
      {
        "text": "One of the students are late.",
        "rationale": "Correct. The subject is 'One' (singular), so the verb should be 'is', not 'are'.",
        "isCorrect": true
      },
      {
        "text": "The team is playing well today.",
        "rationale": "'Team' is a singular collective noun, and the verb 'is' is correct.",
        "isCorrect": false
      },
      {
        "text": "The man who owns the cars lives next door.",
        "rationale": "The subject 'man' is singular, and the verb 'lives' is correct.",
        "isCorrect": false
      },
      {
        "text": "Neither the players nor the coach was happy with the outcome.",
        "rationale": "The verb 'was' correctly agrees with the closer subject, 'coach'.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "difficulty": "hard",
    "question": "Which sentence provides the most effective revision for clarity and conciseness? 'The decision that was made by the committee was to postpone the meeting.'",
    "answerOptions": [
      {
        "text": "The committee made a decision, and it was to postpone the meeting.",
        "rationale": "This is grammatically correct but wordy.",
        "isCorrect": false
      },
      {
        "text": "The committee decided to postpone the meeting.",
        "rationale": "Correct. This sentence is in the active voice and is the most direct and concise way to state the idea.",
        "isCorrect": true
      },
      {
        "text": "The meeting was postponed, which was the decision made by the committee.",
        "rationale": "This is wordy and uses a passive construction.",
        "isCorrect": false
      },
      {
        "text": "Postponing the meeting was the decision that was made by the committee.",
        "rationale": "This is also wordy and uses a passive-like structure.",
        "isCorrect": false
      }
    ]
  }
];
