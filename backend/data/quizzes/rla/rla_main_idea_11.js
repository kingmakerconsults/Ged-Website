// Reading Comprehension — Challenge: Practice 11 / Main Idea & Author's Purpose
// 12 questions
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice',
    difficulty: 'medium',
    passage: "In 1848, Elizabeth Cady Stanton and Lucretia Mott organised the Seneca Falls Convention, the first formal gathering in the United States devoted to women's rights. The convention produced the Declaration of Sentiments — modelled deliberately on the Declaration of Independence — which listed 18 grievances against laws denying women citizenship rights, property ownership, educational access, and the vote. Not all attendees agreed on including suffrage; Mott initially feared it would make the movement appear radical. Frederick Douglass spoke in support of the suffrage resolution, which narrowly passed. The convention launched a 72-year campaign culminating in the 19th Amendment in 1920.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "The Seneca Falls Convention was primarily about property rights, and its suffrage resolution was defeated.", isCorrect: false, rationale: "Suffrage was included and narrowly passed — it was not defeated." },
      { text: "The Seneca Falls Convention launched the American women's rights movement with a formal declaration of grievances, including a contested but successful suffrage resolution that began a 72-year campaign ending in the vote.", isCorrect: true,  rationale: "Integrates all key elements: the founding event, the Declaration, the internal suffrage debate, Douglass's role, and the long arc to 1920." },
      { text: "Lucretia Mott's opposition to suffrage ultimately caused the resolution to fail.", isCorrect: false, rationale: "Mott initially objected but the resolution narrowly passed, with Douglass's support." },
      { text: "The 19th Amendment was passed in the immediate years following the Seneca Falls Convention.", isCorrect: false, rationale: "The passage states the amendment came 72 years later, in 1920." },
    ],
    challenge_tags: ['rla-2'],
  },
];