// Reading Comprehension — Test Ready: Inference — Practice 9
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: "hard",
    passage: "A sociologist studying voter behaviour found that in counties where a major employer closed in the two years before an election, the incumbent political party (regardless of which party) lost an average of 12 percentage points compared to surrounding counties. The effect held regardless of the party's policies on trade, factory employment, or retraining programmes.",
    question: "What does the 'regardless of policies' finding most strongly imply?",
    answerOptions: [
      { text: "Voters carefully evaluate the incumbent's specific economic policies before voting.", isCorrect: false, rationale: "If policy analysis drove votes, policy differences would change the outcome — but the effect held regardless of policies." },
      { text: "Voters may punish incumbents for local economic pain without carefully evaluating which policies caused it or which party's policies would help.", isCorrect: true, rationale: "The 'regardless of policies' clause means the vote shift is driven by economic conditions and feeling, not policy assessment." },
      { text: "Factory closures are always caused by the incumbent political party.", isCorrect: false, rationale: "The sociologist studies voting effects of closures — not their causes." },
      { text: "Counties with factory closures are always economically depressed for decades.", isCorrect: false, rationale: "Long-term economic effects are not the subject of this study." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: "hard",
    passage: "In a study published in the journal Nature, researchers found that migratory birds navigate using the Earth's magnetic field. When researchers applied a weak oscillating magnetic field around the birds' heads — disrupting their magnetic sensing — the birds lost directional orientation and flew in random patterns. Birds in a control group with no field disruption maintained accurate directional flight.",
    question: "What does the control group's performance allow the researchers to conclude?",
    answerOptions: [
      { text: "All birds navigate exclusively by sight.", isCorrect: false, rationale: "The study shows birds use magnetic sensing — and the control group confirms accurate navigation exists without disruption." },
      { text: "The disorientation seen in the experimental group was caused by the applied magnetic field — not by stress, handling, or other factors — because the control group maintained accurate navigation under the same conditions minus the field.", isCorrect: true, rationale: "Control groups that experience everything except the experimental variable allow isolation of that variable's effect." },
      { text: "Birds in the experimental group were improperly trained before the study.", isCorrect: false, rationale: "Training quality is not mentioned — the control group's orientation rules out general handling issues." },
      { text: "The Earth's magnetic field is getting weaker and will eventually stop working.", isCorrect: false, rationale: "The study's subject is bird navigation — not the Earth's magnetic field strength over time." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: "hard",
    passage: "A short story excerpt: 'At the community meeting, every speaker who took the microphone praised Councillor Webb — her dedication, her accessibility, her listening. The applause was warm. Councillor Webb sat at the front table and smiled. Only the recorder, who had attended such meetings for 22 years, noticed that none of the speakers had addressed the specific proposal on the evening's agenda: the rezoning of the waterfront.'",
    question: "What does the recorder's observation imply about the meeting?",
    answerOptions: [
      { text: "The speakers did not support Councillor Webb.", isCorrect: false, rationale: "They praised her warmly — support is not in question." },
      { text: "The praise of Webb, while genuine, functioned to fill the meeting's time without producing any substantive engagement with the actual policy question — whether intentionally or not.", isCorrect: true, rationale: "The recorder notes that praise consumed the evening while the rezoning agenda item went unaddressed — function over form." },
      { text: "The waterfront rezoning had already been approved before the meeting.", isCorrect: false, rationale: "Nothing in the passage supports this — the proposal is described as 'on the agenda.'" },
      { text: "The recorder was jealous of Councillor Webb's popularity.", isCorrect: false, rationale: "The recorder's 22 years of experience frames their observation as professional, not personal." },
    ],
    challenge_tags: ['rla-2'],
  }
];