// Reading Comprehension — Test Ready: Inference — Practice 9
// 10 questions | sociology, scientific studies, literary fiction, policy analysis
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
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
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
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
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A short story excerpt: 'At the community meeting, every speaker who took the microphone praised Councillor Webb — her dedication, her accessibility, her listening. The applause was warm. Councillor Webb sat at the front table and smiled. Only the recorder, who had attended such meetings for 22 years, noticed that none of the speakers had addressed the specific proposal on the evening's agenda: the rezoning of the waterfront.'",
    question: "What does the recorder's observation imply about the meeting?",
    answerOptions: [
      { text: "The speakers did not support Councillor Webb.", isCorrect: false, rationale: "They praised her warmly — support is not in question." },
      { text: "The praise of Webb, while genuine, functioned to fill the meeting's time without producing any substantive engagement with the actual policy question — whether intentionally or not.", isCorrect: true, rationale: "The recorder notes that praise consumed the evening while the rezoning agenda item went unaddressed — function over form." },
      { text: "The waterfront rezoning had already been approved before the meeting.", isCorrect: false, rationale: "Nothing in the passage supports this — the proposal is described as 'on the agenda.'" },
      { text: "The recorder was jealous of Councillor Webb's popularity.", isCorrect: false, rationale: "The recorder's 22 years of experience frames their observation as professional, not personal." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A longitudinal study followed 2,000 children who participated in early childhood music education (ages 3-6). By age 18, they scored an average of 14% higher on standardised tests in mathematics than a matched control group. However, the music group also came from families with higher average incomes, more books in the home, and parents who were more likely to attend parent-teacher conferences.",
    question: "Why does the information about family background complicate the study's conclusion?",
    answerOptions: [
      { text: "It proves that music education has no effect on mathematics ability.", isCorrect: false, rationale: "The confounding variables weaken the causal claim but don't disprove it — the effect could be real but smaller than measured." },
      { text: "Higher-income families with more educational resources may have produced the math advantage regardless of music education — making it impossible to attribute the 14% difference solely to music.", isCorrect: true, rationale: "Family income, books, and parental engagement are all independently associated with academic performance. Without controlling for these, music education's specific contribution is unclear." },
      { text: "Only wealthy children should receive music education.", isCorrect: false, rationale: "This is a policy prescription not supported by the study — the issue is about confounding variables, not access recommendations." },
      { text: "The study should have excluded children from wealthy families.", isCorrect: false, rationale: "Excluding them would create a different bias — the solution is controlling for variables, not excluding participants." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a novel: 'Thomas rebuilt the stone wall every spring. It never needed rebuilding — the stones held through every winter — but each April he carried them down, stacked them on the grass, and set them back one by one. His wife watched from the kitchen and understood: his hands needed the work the way a river needs a channel. Without the wall, the restlessness would flood everything.'",
    question: "What does the wife's metaphor of the river reveal about Thomas?",
    answerOptions: [
      { text: "Thomas is an unskilled builder who cannot construct a wall that lasts.", isCorrect: false, rationale: "The wall holds through winter — the rebuilding is not about construction failure." },
      { text: "Thomas carries an internal restlessness or anxiety that he manages through the physical, repetitive act of rebuilding — the wall is therapeutic structure, not practical maintenance.", isCorrect: true, rationale: "The river metaphor frames the restlessness as a force that needs a channel — without the wall as an outlet, it would overwhelm him." },
      { text: "Thomas enjoys destroying his own work.", isCorrect: false, rationale: "The rebuilding is described as careful, deliberate work — not destructive pleasure." },
      { text: "The wife is annoyed that Thomas wastes time on unnecessary projects.", isCorrect: false, rationale: "She 'understood' — her observation is compassionate insight, not annoyance." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A pharmaceutical company's internal study found that its new pain medication was 15% more effective than a placebo. When the data was analysed by age group, researchers discovered the drug was 32% more effective than placebo in patients over 60, but showed no statistically significant difference from placebo in patients under 40. The company's press release described the drug as 'effective for adults of all ages.'",
    question: "What is misleading about the company's press release?",
    answerOptions: [
      { text: "The drug does not work at all and the study was fabricated.", isCorrect: false, rationale: "The drug does work — for patients over 60. The issue is selective reporting, not fabrication." },
      { text: "The overall 15% figure masks the fact that the drug's effectiveness is concentrated in older patients, and the 'all ages' claim misrepresents the age-specific data showing no benefit for younger adults.", isCorrect: true, rationale: "Aggregating data that shows a strong age-dependent effect into a single number — and then claiming universal effectiveness — hides the finding that matters most for younger patients." },
      { text: "Press releases should never discuss clinical trial results.", isCorrect: false, rationale: "The issue is accuracy, not whether press releases should exist." },
      { text: "The placebo effect is more dangerous than the drug's side effects.", isCorrect: false, rationale: "Side effects and placebo danger are not discussed in the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A historian studied newspaper editorials published during the 1918 influenza pandemic. Cities that acknowledged the severity of the outbreak and published honest health guidance experienced an average of 50% lower peak mortality than cities whose newspapers and officials downplayed the threat to maintain public morale. Philadelphia held a large parade during the outbreak despite warnings; within 72 hours, every hospital bed in the city was full.",
    question: "What does the comparison between transparent and non-transparent cities most strongly suggest?",
    answerOptions: [
      { text: "Newspapers caused the 1918 pandemic.", isCorrect: false, rationale: "Newspapers reported on the pandemic — they didn't cause the virus." },
      { text: "Honest public communication during a health crisis can directly influence behaviour in ways that reduce mortality, while downplaying risk to protect morale may actually increase it.", isCorrect: true, rationale: "Cities that communicated honestly had lower mortality — the Philadelphia example shows that suppressing risk information led directly to a catastrophic outcome." },
      { text: "Parades should be permanently banned in all cities.", isCorrect: false, rationale: "The issue was holding a parade during a pandemic, not parades in general." },
      { text: "Modern cities would never make the same mistakes as 1918 officials.", isCorrect: false, rationale: "The passage makes no claim about modern officials — and history suggests similar mistakes can recur." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "An economics professor presented students with two job offers. Job A pays $75,000 in a company where the average salary is $60,000. Job B pays $85,000 in a company where the average salary is $100,000. In anonymous surveys, 62% of students chose Job A despite its lower absolute salary. When asked to explain, most cited 'feeling valued' and 'being above average' as factors.",
    question: "What does this experiment most strongly suggest about how people evaluate compensation?",
    answerOptions: [
      { text: "Students are bad at math and didn't realise $85,000 is more than $75,000.", isCorrect: false, rationale: "Students were given clear numbers — the issue is not mathematical error but psychological preference." },
      { text: "Many people evaluate pay not only in absolute terms but relative to their peers — perceived standing within a group can outweigh objective monetary gain.", isCorrect: true, rationale: "Choosing $10,000 less to be above average reveals that relative position, not absolute amount, drives satisfaction for many people." },
      { text: "All employees should be paid the same salary to prevent comparison.", isCorrect: false, rationale: "This is a policy suggestion not implied by the experiment — the study reveals preference patterns, not prescriptions." },
      { text: "Job B is objectively worse because the company pays too much.", isCorrect: false, rationale: "Higher salaries don't make a company worse — the students' choice reflects psychology, not job quality." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary essay: 'The ending of Gatsby is often taught as a tragedy of one man's romantic delusion. But Fitzgerald's last lines — \"So we beat on, boats against the current, borne back ceaselessly into the past\" — use \"we,\" not \"he.\" The tragedy is not Gatsby's alone. Fitzgerald indicts an entire culture that mistakes accumulation for progress and novelty for possibility.'",
    question: "What does the essayist's focus on Fitzgerald's pronoun choice ('we' vs. 'he') reveal about their interpretation?",
    answerOptions: [
      { text: "The essayist believes Fitzgerald made a grammatical error in the final sentence.", isCorrect: false, rationale: "The pronoun choice is treated as deliberate and meaningful — not an error." },
      { text: "The essayist argues that Fitzgerald intentionally broadened the tragedy from one character to an entire society, and the pronoun shift is the evidence — 'we' implicates the reader and the culture, not just Gatsby.", isCorrect: true, rationale: "By highlighting 'we' over 'he,' the essayist shows Fitzgerald extending the indictment beyond one man to a collective cultural condition." },
      { text: "The essayist believes Gatsby is not a tragic character.", isCorrect: false, rationale: "The essayist says the tragedy is 'not Gatsby's alone' — they expand, not deny, the tragedy." },
      { text: "Fitzgerald wrote the ending carelessly and did not intend 'we.'", isCorrect: false, rationale: "The essayist treats the word choice as precise and purposeful — the opposite of careless." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A study of professional chess players found that grandmasters spent an average of 30 seconds evaluating a position before making a move. Intermediate players spent an average of 90 seconds. Researchers found that grandmasters did not simply think faster — brain imaging showed they activated pattern-recognition centres, while intermediate players activated calculation centres. Grandmasters were essentially remembering, while intermediates were computing.",
    question: "What does this finding most strongly suggest about the nature of expertise?",
    answerOptions: [
      { text: "Grandmasters are more intelligent than intermediate players.", isCorrect: false, rationale: "Intelligence as a general trait is not measured — the study identifies different cognitive processes, not different intelligence levels." },
      { text: "Deep expertise transforms problem-solving from effortful calculation into rapid pattern recognition — experts may 'see' solutions that novices must laboriously derive.", isCorrect: true, rationale: "The brain imaging reveals a qualitative shift in cognitive strategy. Years of experience converted the task from computation to recognition — a fundamentally different process." },
      { text: "Intermediate players should stop calculating and rely on intuition instead.", isCorrect: false, rationale: "Intuition in grandmasters is built on years of study — skipping to intuition without the foundation would not work." },
      { text: "Brain imaging is unreliable and the study's findings should be disregarded.", isCorrect: false, rationale: "The passage presents brain imaging as an accepted research methodology — no reliability concerns are raised." },
    ],
    challenge_tags: ['rla-2'],
  },
];