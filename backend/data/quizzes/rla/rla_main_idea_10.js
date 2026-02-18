// Reading Comprehension — Test Ready: Practice 10 / Main Idea & Author's Purpose
// 11 questions
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice',
    difficulty: 'medium',
    passage: "In ecology, a keystone species is an organism whose impact on its ecosystem is disproportionately large relative to its abundance. The sea otter is a classic example: otters eat sea urchins, which eat kelp. Without otters, urchin populations explode and devour kelp forests that shelter hundreds of species. When otters were hunted nearly to extinction in the 19th century, kelp forests along the Pacific coast collapsed. After conservation efforts allowed otter recovery, kelp ecosystems rebounded dramatically — demonstrating how removing one species can trigger cascading collapse through an entire ecosystem.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Sea otters are interesting animals, but they have little effect on ocean ecosystems.", isCorrect: false, rationale: "The passage uses otters to demonstrate their outsized ecological importance." },
      { text: "The keystone species concept explains how a single species with disproportionate ecological influence can, if removed, trigger cascading collapse throughout an entire ecosystem.", isCorrect: true,  rationale: "Correctly identifies the passage as an explanation of the keystone species concept, using otters as its example." },
      { text: "Sea otter conservation programs are the most successful conservation efforts in American history.", isCorrect: false, rationale: "The passage uses otters as an ecological example — it makes no comparative claim about conservation program success." },
      { text: "Overfishing, not species interdependence, primarily explains declining Pacific fish populations.", isCorrect: false, rationale: "Overfishing is not mentioned — the passage attributes kelp forest collapse to loss of the otter keystone species." },
    ],
    challenge_tags: ['rla-2'],
  },
];