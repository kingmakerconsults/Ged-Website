// Reading Comprehension — Core: Practice 6 / Main Idea & Author's Purpose
// 10 questions
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice',
    difficulty: 'easy',
    passage: "Coral reefs cover less than 1% of the ocean floor, yet they support approximately 25% of all marine species. They serve as nurseries for fish populations that sustain commercial fisheries, protect coastlines from storm surge, and generate billions of dollars in tourism revenue annually. Despite their importance, coral reefs face existential threats: rising ocean temperatures cause mass bleaching events, ocean acidification weakens coral skeletons, and pollution smothers reef ecosystems. Scientists estimate that without significant carbon emission reductions, up to 90% of reefs could be destroyed by 2050.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Coral reefs are decorative ocean features with minimal ecological importance.", isCorrect: false, rationale: "The passage describes reefs as critical ecological structures supporting 25% of marine species." },
      { text: "Coral reefs are among the most ecologically and economically important ecosystems on Earth, now facing potentially catastrophic threats from climate change and pollution.", isCorrect: true,  rationale: "Accurately reflects both dimensions — importance and threats — which together form the complete main idea." },
      { text: "Without coral reefs, all marine fish would immediately go extinct.", isCorrect: false, rationale: "The passage says reefs support 25% of marine species; immediate total extinction is an extreme overstatement." },
      { text: "Tourism revenue alone justifies protecting coral reefs.", isCorrect: false, rationale: "Tourism is one of several economic benefits — identifying it alone as the sole justification misrepresents the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
];