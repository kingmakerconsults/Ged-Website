// Reading Comprehension — Core: Practice 5 / Main Idea & Author's Purpose
// 10 questions
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice',
    difficulty: 'easy',
    passage: "The Great Migration refers to the movement of approximately six million Black Americans from the rural South to northern and western cities between 1910 and 1970. This shift was driven by the brutal conditions of sharecropping and Jim Crow laws in the South, combined with the promise of industrial jobs and greater civil liberties in cities like Chicago, Detroit, and New York. The Migration transformed American culture — contributing to the Harlem Renaissance, the birth of Chicago blues, and the development of a northern Black political voice that reshaped national politics.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Black Americans moved north only to find the same conditions as in the South.", isCorrect: false, rationale: "The passage says northern cities offered industrial jobs and greater civil liberties — conditions differed from the South." },
      { text: "The Great Migration was a massive demographic shift driven by southern injustice and northern opportunity, with lasting cultural and political consequences.", isCorrect: true,  rationale: "Captures all three elements: scale, causes (Jim Crow + opportunity), and cultural and political consequences." },
      { text: "The Harlem Renaissance was the most important cultural event caused by the Great Migration.", isCorrect: false, rationale: "The Renaissance is one of several outcomes listed — not the sole main idea." },
      { text: "The Great Migration ended permanently after 1970.", isCorrect: false, rationale: "The passage says Migration occurred 1910-1970 — it does not claim the movement ended then permanently." },
    ],
    challenge_tags: ['rla-2'],
  },
];