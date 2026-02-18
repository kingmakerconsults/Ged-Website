// Language & Grammar — Core Skills: Practice 4
// 10 questions | pronoun agreement, modifier placement, parallelism
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    question: "Choose the sentence with correct subject-verb agreement:\n(A) The team of engineers were reviewing the design.\n(B) The team of engineers was reviewing the design.\n(C) The team of engineers are reviewing the design.",
    answerOptions: [
      { text: "(A)", isCorrect: false, rationale: "'Team' is singular; 'were' is plural." },
      { text: "(B)", isCorrect: true, rationale: "'Team' is a collective noun treated as singular. 'Was' is correct." },
      { text: "(C)", isCorrect: false, rationale: "'Team' is singular; 'are' is plural." },
      { text: "Both (A) and (C)", isCorrect: false, rationale: "Both use plural verbs with a singular subject." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    question: "Which sentence uses pronouns correctly?",
    answerOptions: [
      { text: "Between you and I, the project is behind schedule.", isCorrect: false, rationale: "After a preposition, use object pronouns: 'between you and me.'" },
      { text: "Between you and me, the project is behind schedule.", isCorrect: true, rationale: "'Me' is the correct object pronoun after the preposition 'between.'" },
      { text: "Between you and myself, the project is behind schedule.", isCorrect: false, rationale: "'Myself' is a reflexive pronoun used only when the subject and object are the same person." },
      { text: "Between I and you, the project is behind schedule.", isCorrect: false, rationale: "'I' is a subject pronoun, not correct after a preposition." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    question: "Which sentence has a misplaced modifier?",
    answerOptions: [
      { text: "Running to catch the bus, Marcus dropped his briefcase.", isCorrect: false, rationale: "The participial phrase correctly modifies Marcus." },
      { text: "She served sandwiches to the children on paper plates.", isCorrect: true, rationale: "'On paper plates' seems to modify 'children' — it should be 'She served sandwiches on paper plates to the children.'" },
      { text: "The scientist carefully analysed the data.", isCorrect: false, rationale: "No modifier is misplaced here." },
      { text: "The report that Alicia wrote was published.", isCorrect: false, rationale: "The relative clause correctly modifies 'report.'" },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    question: "Which sentence uses parallel structure correctly?",
    answerOptions: [
      { text: "The manager asked us to arrive on time, work carefully, and that we should clean up.", isCorrect: false, rationale: "'That we should clean up' breaks parallel structure — it should be an infinitive phrase." },
      { text: "The manager asked us to arrive on time, to work carefully, and to clean up.", isCorrect: true, rationale: "All three items are parallel infinitive phrases." },
      { text: "The manager asked us to arrive on time, working carefully, and clean up.", isCorrect: false, rationale: "Mixed forms: infinitive, present participle, and bare verb." },
      { text: "The manager asked us arriving on time, working carefully, and cleaning up.", isCorrect: false, rationale: "'Arriving' is not parallel with what 'asked us' requires grammatically." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    question: "Select the version that correctly uses a semicolon:",
    answerOptions: [
      { text: "The conference begins tomorrow; however the keynote speaker cancelled.", isCorrect: false, rationale: "A comma is required after 'however' when used as a conjunctive adverb." },
      { text: "The conference begins tomorrow; however, the keynote speaker cancelled.", isCorrect: true, rationale: "Semicolon before 'however' and comma after — correct conjunctive adverb punctuation." },
      { text: "The conference begins tomorrow, however; the keynote speaker cancelled.", isCorrect: false, rationale: "The semicolon position is incorrect." },
      { text: "The conference begins tomorrow however, the keynote speaker cancelled.", isCorrect: false, rationale: "Missing the semicolon before 'however.'" },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'medium',
    question: "Which sentence has an error in pronoun-antecedent agreement?",
    answerOptions: [
      { text: "Every employee must submit their timesheet by Friday.", isCorrect: false, rationale: "'Their' is now accepted as singular gender-neutral, especially with 'every employee.'" },
      { text: "Each of the students handed in their assignment.", isCorrect: false, rationale: "Similarly acceptable in modern usage." },
      { text: "The committee announced their final decision.", isCorrect: false, rationale: "Collective nouns can take plural pronouns in American English when emphasising individual members." },
      { text: "Neither of the boys remembered their homework.", isCorrect: true, rationale: "'Neither' is singular, so technically 'his or her' — though 'their' is accepted colloquially, this is the most likely textbook error in an exam context." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "Read the following paragraph and identify the sentence with a grammatical error:\n
(1) The marketing team has exceeded its quarterly targets every year for the past three years. (2) Despite the success, the director insisted that each team member review their own performance metrics individually. (3) The findings was presented to shareholders at the annual meeting. (4) Several investors called the results 'unprecedented.'",
    question: "Which sentence contains a grammatical error?",
    answerOptions: [
      { text: "Sentence 1", isCorrect: false, rationale: "No error — 'its' correctly agrees with 'team.'" },
      { text: "Sentence 2", isCorrect: false, rationale: "No error — 'their' is acceptable with singular 'each member.'" },
      { text: "Sentence 3", isCorrect: true, rationale: "'Findings' is plural; the verb should be 'were,' not 'was.'" },
      { text: "Sentence 4", isCorrect: false, rationale: "No grammatical error — quoted word is correctly used." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    question: "Choose the sentence that correctly uses an apostrophe:",
    answerOptions: [
      { text: "The companies' profits fell sharply after the recall.", isCorrect: true, rationale: "Multiple companies: 'companies'' (plural possessive) is correct." },
      { text: "The companys' profits fell sharply after the recall.", isCorrect: false, rationale: "The plural of 'company' is 'companies,' not 'companys.'" },
      { text: "The company's' profits fell sharply after the recall.", isCorrect: false, rationale: "There is no such form as 'company's'.' Double apostrophe is always wrong." },
      { text: "The companies profits fell sharply after the recall.", isCorrect: false, rationale: "Missing apostrophe — no possessive is formed." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "The following paragraph from a business proposal contains one error. Identify the sentence that should be revised:\n
(1) Our company has expanded its services to three new markets. (2) We plan to hire 50 additional staff this year, training them intensively, and provide competitive salaries. (3) The CEO is confident that these investments will yield returns within 18 months. (4) All new hires will undergo a month-long orientation.",
    question: "Which sentence has a structural problem?",
    answerOptions: [
      { text: "Sentence 1", isCorrect: false, rationale: "Grammatically correct." },
      { text: "Sentence 2", isCorrect: true, rationale: "'hire 50 additional staff,' 'training them intensively,' and 'provide competitive salaries' are not parallel. Should be 'to hire,' 'to train,' and 'to provide.'" },
      { text: "Sentence 3", isCorrect: false, rationale: "Grammatically correct." },
      { text: "Sentence 4", isCorrect: false, rationale: "Grammatically correct." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    question: "A writer wants to combine the following two sentences into one while keeping both ideas clearly. Which option is best?\n\nOriginal: The new policy reduces overtime. It also improves employee satisfaction ratings.",
    answerOptions: [
      { text: "The new policy reduces overtime, it also improves employee satisfaction ratings.", isCorrect: false, rationale: "Comma splice — two independent clauses joined only by a comma." },
      { text: "The new policy not only reduces overtime but also improves employee satisfaction ratings.", isCorrect: true, rationale: "'Not only…but also' creates grammatically parallel, logically connected structure." },
      { text: "Reducing overtime, the new policy also improving employee satisfaction ratings.", isCorrect: false, rationale: "'Improving' should be 'improves' — the sentence is grammatically broken." },
      { text: "The new policy reduces overtime and also improving employee satisfaction ratings.", isCorrect: false, rationale: "Inconsistent verb forms: 'reduces' vs. 'improving.'" },
    ],
    challenge_tags: ['rla-1'],
  },
];