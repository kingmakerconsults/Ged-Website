// Imported from frontend/Expanded
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "difficulty": "easy",
    "question": "Which sentence is grammatically correct?",
    "answerOptions": [
      {
        "text": "The team lost their first game.",
        "rationale": "'Team' is a singular noun, so 'its' is the traditionally correct pronoun.",
        "isCorrect": false
      },
      {
        "text": "I could of done better.",
        "rationale": "The correct phrasing is 'could have'.",
        "isCorrect": false
      },
      {
        "text": "She is one of those people who are always on time.",
        "rationale": "Correct. The pronoun 'who' refers to 'people' (plural), so the plural verb 'are' is correct.",
        "isCorrect": true
      },
      {
        "text": "The data is not yet available.",
        "rationale": "'Data' is a plural noun (the singular is 'datum'), so the verb should be 'are'. However, 'data is' is becoming increasingly common.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "difficulty": "medium",
    "question": "Which sentence provides the most effective revision for 'The report was written by me.'?",
    "answerOptions": [
      {
        "text": "I wrote the report.",
        "rationale": "Correct. This changes the sentence from passive to active voice, making it more direct.",
        "isCorrect": true
      },
      {
        "text": "The report was written by myself.",
        "rationale": "'Myself' is a reflexive pronoun and is used incorrectly here.",
        "isCorrect": false
      },
      {
        "text": "It was me who wrote the report.",
        "rationale": "This is grammatically awkward.",
        "isCorrect": false
      },
      {
        "text": "My writing of the report is now finished.",
        "rationale": "This is wordy and indirect.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "difficulty": "hard",
    "question": "Which sentence correctly uses a semicolon?",
    "answerOptions": [
      {
        "text": "The meeting was long but we accomplished a lot.",
        "rationale": "A comma should be used before a coordinating conjunction like 'but'.",
        "isCorrect": false
      },
      {
        "text": "The attendees were: John, from marketing Sara, from sales and David, from engineering.",
        "rationale": "A colon should be used to introduce the list. Semicolons are correctly used to separate the items because the items themselves contain commas.",
        "isCorrect": true
      },
      {
        "text": "I need to go to the store because we are out of milk.",
        "rationale": "A semicolon should not be used to join a dependent clause to an independent clause.",
        "isCorrect": false
      },
      {
        "text": "Let's go for a walk it's a beautiful day.",
        "rationale": "Correct. A semicolon is used to join two closely related independent clauses.",
        "isCorrect": false
      }
    ]
  }
];
