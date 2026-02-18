// Reading Comprehension — Core: Inference — Practice 6
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: "easy",
    passage: "A 2022 poll of 3,000 American adults found that 61% could not name all three branches of the federal government. Among adults under 35, the figure was 71%. The same poll found that 44% of respondents said they could not explain what the First Amendment protects.",
    question: "What can be reasonably inferred from the poll results about civic knowledge?",
    answerOptions: [
      { text: "The majority of Americans have taken civics courses and passed them.", isCorrect: false, rationale: "No data on course completion is given." },
      { text: "There is a significant and widespread gap in basic civic knowledge among American adults, with younger adults showing even lower familiarity.", isCorrect: true, rationale: "61% unable to name three branches and 71% among under-35s directly support a widespread knowledge gap." },
      { text: "All Americans who can name all three branches are also familiar with the First Amendment.", isCorrect: false, rationale: "The poll measures two separate knowledge areas — no such correlation is stated." },
      { text: "The U.S. should eliminate its three-branch government structure.", isCorrect: false, rationale: "The poll reveals knowledge gaps, not a policy prescription." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: "medium",
    passage: "A small fishing village recorded 400 annual fishing trips in 1980. By 2000, the total catch per trip had fallen by 58% despite the use of more efficient modern boats and equipment. By 2020, many fishing families had abandoned the trade entirely.",
    question: "What is the most reasonable inference about the state of fish populations over this period?",
    answerOptions: [
      { text: "Modern equipment caused fish to swim to deeper water temporarily.", isCorrect: false, rationale: "Temporary depth migration doesn't explain a 40-year decline across catch totals." },
      { text: "The fish population in the village's fishing waters likely declined substantially due to overfishing or environmental change.", isCorrect: true, rationale: "More efficient equipment plus dramatically lower catch per trip across 40 years strongly suggests resource depletion." },
      { text: "The fishing families left because they found higher-paying industries.", isCorrect: false, rationale: "The passage doesn't mention employment alternatives — the most direct inference is about fish populations." },
      { text: "Fishing in 2000 was less efficient than fishing in 1980.", isCorrect: false, rationale: "The passage says modern boats are more efficient — catch decline despite efficiency gains points to resource depletion." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: "hard",
    passage: "The following data appeared in a city crime report: burglary rates in Westside fell by 34% in the year a neighbourhood watch programme was introduced. However, burglary rates in the adjacent Northside neighbourhood — with no watch programme — rose by 28% in the same year.",
    question: "What do these two data points together most reasonably suggest?",
    answerOptions: [
      { text: "The neighbourhood watch eliminated burglary from the entire city.", isCorrect: false, rationale: "Northside rates rose — the programme clearly did not eliminate citywide burglary." },
      { text: "Some burglars may have shifted their activity from Westside to Northside rather than stopping burglary altogether.", isCorrect: true, rationale: "A simultaneous fall in one area and rise in the adjacent area is a classic displacement pattern — burglars shifted locations rather than stopping." },
      { text: "Neighbourhood watches always reduce crime in every area they operate.", isCorrect: false, rationale: "This case shows crime displaced to an adjacent area — 'always' and 'every area' are unsupported generalisations." },
      { text: "The police failed to respond effectively to the Northside increase.", isCorrect: false, rationale: "Police response is not discussed — the data pattern is about displacement, not policing." },
    ],
    challenge_tags: ['rla-2'],
  }
];