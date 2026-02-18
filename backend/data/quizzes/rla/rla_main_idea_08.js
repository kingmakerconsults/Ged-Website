// Reading Comprehension — Test Ready: Practice 8 / Main Idea & Author's Purpose
// 11 questions
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice',
    difficulty: 'medium',
    passage: "The psychological concept of cognitive dissonance, developed by Leon Festinger in 1957, describes the mental discomfort a person feels when holding two conflicting beliefs or when behaviour contradicts strongly held values. To relieve this discomfort, people typically either change the belief, change the behaviour, or rationalise the inconsistency. Festinger's research showed that people will often go to surprising lengths to rationalise away inconsistency rather than confront the contradiction directly — a finding with broad applications in marketing, politics, and public health behaviour.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Cognitive dissonance means people always change their behaviour when confronted with contradicting evidence.", isCorrect: false, rationale: "The passage says people often rationalise rather than change beliefs or behaviour." },
      { text: "Festinger's cognitive dissonance theory explains how people cope with conflicting beliefs — typically through rationalisation rather than honest self-correction — with implications across multiple fields.", isCorrect: true,  rationale: "Reflects both the theory and its key empirical finding (rationalisation over correction), plus its broad applicability." },
      { text: "Cognitive dissonance only applies to children and does not affect adult reasoning.", isCorrect: false, rationale: "No age limitation is stated or implied anywhere in the passage." },
      { text: "Festinger's work proved that marketing and politics are inherently dishonest fields.", isCorrect: false, rationale: "The passage lists these as application areas for the concept — it does not make a normative judgement about those fields." },
    ],
    challenge_tags: ['rla-2'],
  },
];