// Reading Comprehension — Test Ready: Inference — Practice 8
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: "medium",
    passage: "A marine biologist studying coral reef recovery found that reefs near areas with strong sea urchin populations recovered from bleaching events 40% faster than reefs in areas where urchins had been overharvested. Sea urchins eat the algae that smother recovering coral. In areas without urchins, algae blooms prevented coral larvae from attaching to rock surfaces.",
    question: "What can be inferred about the role of sea urchins in reef resilience?",
    answerOptions: [
      { text: "Sea urchins should be farmed commercially to produce food.", isCorrect: false, rationale: "Commercial farming is not suggested or supported by the passage." },
      { text: "Sea urchins serve a critical maintenance function in reef ecosystems, and their removal disrupts reef recovery capacity.", isCorrect: true, rationale: "The data directly shows urchin presence correlates with faster recovery via algae control — their removal has a documented negative consequence." },
      { text: "Coral bleaching only occurs in areas without sea urchins.", isCorrect: false, rationale: "Bleaching occurred in both urchin-rich and urchin-poor areas — urchins affect recovery speed, not bleaching occurrence." },
      { text: "Marine biologists caused the overharvesting of sea urchins.", isCorrect: false, rationale: "The biologist studied the effect — no claim about who caused overharvesting is made." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: "hard",
    passage: "From a business case study: In 2018, a national coffee chain introduced a mobile pre-ordering app. In the first year, mobile orders increased from $0 to 18% of total revenue. In-store wait times fell by an average of 4 minutes. However, barista turnover rates increased by 24% compared to the prior year. Exit interviews with departing baristas cited 'relentless order pressure with no human interaction' as the primary reason for leaving.",
    question: "What does the barista turnover data suggest about the app's impact that the revenue and wait-time data does not?",
    answerOptions: [
      { text: "The app was a complete failure for the business.", isCorrect: false, rationale: "18% revenue share and reduced wait times suggest customer-facing success — failure is too strong." },
      { text: "The app created operational and human costs at the staff level that the customer-facing metrics did not capture.", isCorrect: true, rationale: "Revenue and wait times improved from the customer's perspective; turnover and barista satisfaction deteriorated — these are real costs that the success metrics obscure." },
      { text: "Baristas should be replaced with machines to reduce turnover.", isCorrect: false, rationale: "This is a speculative policy recommendation — not an inference from the data." },
      { text: "Coffee chains should not use technology in their stores.", isCorrect: false, rationale: "The case study shows a trade-off, not a universal case against technology." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: "hard",
    passage: "From a biography: 'Lincoln rarely showed anger in public. When cabinet members reported to him that Secretary of War Stanton had called him a fool, Lincoln replied quietly: \\\"If Stanton said I was a d--- fool, then I must be one, for he is nearly always right and generally says what he means.\\\" The cabinet members expected a dismissal; instead they received a lesson in the strategic use of equanimity.'",
    question: "What does Lincoln's response to Stanton's insult most reveal?",
    answerOptions: [
      { text: "Lincoln secretly agreed that he was foolish and lacked confidence.", isCorrect: false, rationale: "The biographer frames it as 'strategic use of equanimity' — the response is a calculated de-escalation, not admission of self-doubt." },
      { text: "Lincoln used apparent self-deprecation to deflect the political tension created by the insult while subtly complimenting Stanton — demonstrating political and emotional intelligence.", isCorrect: true, rationale: "By agreeing with the insult, Lincoln avoided a confrontation, maintained cabinet stability, and actually praised Stanton's reliability — a masterful political move." },
      { text: "Lincoln and Stanton had a mutually hostile relationship.", isCorrect: false, rationale: "Lincoln's praise of Stanton as 'nearly always right' suggests respect, not hostility." },
      { text: "Lincoln was afraid of Stanton and could not fire him.", isCorrect: false, rationale: "Fear is not implied — strategic equanimity is the biographer's explicit interpretation." },
    ],
    challenge_tags: ['rla-2'],
  }
];