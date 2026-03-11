// Reading Comprehension  Test Ready: Inference  Practice 9
// 10 questions | sociology, scientific studies, literary fiction, policy analysis
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "A sociologist studying voter behaviour found that in counties where a major employer closed in the two years before an election, the incumbent political party (regardless of which party) lost an average of 12 percentage points compared to surrounding counties. The effect held regardless of the party's policies on trade, factory employment, or retraining programmes.",
    question: "What does the 'regardless of policies' finding most strongly imply?",
    answerOptions: [
      { text: "Voters in affected counties likely shifted their support toward whichever party proposed stronger factory-protection legislation.", isCorrect: false, rationale: "If voters evaluated policy proposals, the effect would vary by party platform  but it held regardless of policies." },
      { text: "The study demonstrates that voter turnout declines sharply whenever a major employer permanently leaves a county.", isCorrect: false, rationale: "The study measures vote-share shifts for incumbents, not changes in overall turnout levels." },
      { text: "Voters may punish incumbents for local economic pain without distinguishing which policies caused it or which party offers better solutions.", isCorrect: true, rationale: "The 'regardless of policies' clause means the vote shift is driven by economic distress itself, not by analysis of competing policy platforms." },
      { text: "Economic conditions only influence election outcomes when both parties hold identical positions on trade and employment policy.", isCorrect: false, rationale: "The finding shows economic pain affects votes regardless of policy differences  not only when policies are identical." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "In a study published in the journal Nature, researchers found that migratory birds navigate using the Earth's magnetic field. When researchers applied a weak oscillating magnetic field around the birds' heads  disrupting their magnetic sensing  the birds lost directional orientation and flew in random patterns. Birds in a control group with no field disruption maintained accurate directional flight.",
    question: "What does the control group's performance allow the researchers to conclude?",
    answerOptions: [
      { text: "The disorientation in the experimental group resulted from the applied magnetic field rather than from handling, stress, or other conditions shared by both groups.", isCorrect: true, rationale: "Control groups that experience everything except the experimental variable allow researchers to isolate that variable's specific effect." },
      { text: "Migratory birds rely on multiple navigation systems working simultaneously, including both magnetic sensing and visual landmarks along their route.", isCorrect: false, rationale: "The study isolates magnetic sensing  it does not test or confirm the role of visual landmarks in navigation." },
      { text: "Migratory birds always prefer flying in straight lines rather than following the curved seasonal routes that researchers had previously mapped.", isCorrect: false, rationale: "The study tests directional orientation accuracy, not whether birds fly straight versus curved paths." },
      { text: "The oscillating magnetic field enhanced the experimental group's geomagnetic sensitivity, causing overstimulation rather than loss of orientation.", isCorrect: false, rationale: "The birds flew randomly, indicating lost orientation  not heightened sensitivity producing a different navigational pattern." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A short story excerpt: 'At the community meeting, every speaker who took the microphone praised Councillor Webb  her dedication, her accessibility, her listening. The applause was warm. Councillor Webb sat at the front table and smiled. Only the recorder, who had attended such meetings for 22 years, noticed that none of the speakers had addressed the specific proposal on the evening's agenda: the rezoning of the waterfront.'",
    question: "What does the recorder's observation imply about the meeting?",
    answerOptions: [
      { text: "The speakers coordinated their praise of Webb specifically to prevent public opposition to the rezoning plan from being voiced at the meeting.", isCorrect: false, rationale: "The passage does not indicate coordination or intent  it only notes the outcome that no one addressed the agenda item." },
      { text: "The recorder's lengthy tenure at community meetings made them unable to appreciate genuine expressions of support for effective local leaders.", isCorrect: false, rationale: "The recorder's experience is presented as a source of insight, not cynicism  they noticed what others missed." },
      { text: "The meeting's focus on personal praise shows that the rezoning proposal had broad enough support that no further public discussion was necessary.", isCorrect: false, rationale: "Nothing indicates broad support  the proposal simply went unaddressed, which the experienced recorder found notable." },
      { text: "The praise of Webb, though apparently sincere, consumed the meeting without anyone addressing the waterfront rezoning proposal that was on the agenda.", isCorrect: true, rationale: "The recorder's observation highlights the gap between the warm atmosphere and the absence of substantive engagement with the actual policy question." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A longitudinal study followed 2,000 children who participated in early childhood music education (ages 3-6). By age 18, they scored an average of 14% higher on standardised tests in mathematics than a matched control group. However, the music group also came from families with higher average incomes, more books in the home, and parents who were more likely to attend parent-teacher conferences.",
    question: "Why does the information about family background complicate the study's conclusion?",
    answerOptions: [
      { text: "The family background data proves that early music education only benefits children whose parents are already highly engaged in academic activities.", isCorrect: false, rationale: "The data introduces confounding variables but does not prove music education is limited to already-engaged families." },
      { text: "Families who enrolled children in music also had higher incomes, more books, and greater school involvement, so the math advantage may stem from those resources instead.", isCorrect: true, rationale: "Income, books, and parental engagement independently predict academic performance  without controlling for them, music's specific contribution remains unclear." },
      { text: "The study is flawed because standardised tests administered at age 18 cannot accurately measure mathematical skills that were acquired during early childhood.", isCorrect: false, rationale: "Standardised math tests at 18 measure current ability, which is what the study claims to assess  the issue is confounding variables, not test validity." },
      { text: "The family variables strengthen the conclusion by confirming that musically educated children receive consistent academic support throughout their entire development.", isCorrect: false, rationale: "Additional advantages weaken the causal claim about music by providing alternative explanations  they do not strengthen it." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a novel: 'Thomas rebuilt the stone wall every spring. It never needed rebuilding  the stones held through every winter  but each April he carried them down, stacked them on the grass, and set them back one by one. His wife watched from the kitchen and understood: his hands needed the work the way a river needs a channel. Without the wall, the restlessness would flood everything.'",
    question: "What does the wife's metaphor of the river reveal about Thomas?",
    answerOptions: [
      { text: "Thomas channels an inner restlessness through the repetitive physical labour of rebuilding, using the wall as an emotional outlet rather than practical maintenance.", isCorrect: true, rationale: "The river metaphor frames restlessness as a force needing a channel  without the wall as an outlet, it would overwhelm him." },
      { text: "The wife believes Thomas is gradually losing his physical strength and rebuilds the wall each year to prove he is still capable of demanding manual labour.", isCorrect: false, rationale: "The metaphor describes emotional need, not physical decline  and the wall holds perfectly, so his skill is not in question." },
      { text: "The river comparison implies that Thomas plans to redirect a nearby stream to irrigate the land on the far side of the stone wall.", isCorrect: false, rationale: "The river is figurative, describing his inner state  there is no literal waterway or irrigation plan mentioned in the passage." },
      { text: "The metaphor reveals that Thomas rebuilds because the stones shift during seasonal ground movement and must be reset to prevent the wall from eventually collapsing.", isCorrect: false, rationale: "The passage explicitly states the wall never needs rebuilding  the stones hold through every winter without issue." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A pharmaceutical company's internal study found that its new pain medication was 15% more effective than a placebo. When the data was analysed by age group, researchers discovered the drug was 32% more effective than placebo in patients over 60, but showed no statistically significant difference from placebo in patients under 40. The company's press release described the drug as 'effective for adults of all ages.'",
    question: "What is misleading about the company's press release?",
    answerOptions: [
      { text: "The press release is misleading because a 15% improvement over placebo is too small to be considered clinically meaningful for patients of any age.", isCorrect: false, rationale: "Clinical significance thresholds are not discussed  the issue is that the aggregated figure hides the age-specific pattern in the data." },
      { text: "The company should have tested the medication exclusively on patients over 60, since younger adults rarely experience significant chronic pain conditions.", isCorrect: false, rationale: "The issue is reporting accuracy, not study design  and the passage makes no claims about pain prevalence by age group." },
      { text: "The overall 15% figure hides that the drug only benefited patients over 60, making the 'all ages' claim a misrepresentation of the age-specific results.", isCorrect: true, rationale: "Aggregating data with a strong age-dependent effect into one number and claiming universal effectiveness conceals the finding that younger patients saw no benefit." },
      { text: "The age-group analysis supports the 'all ages' claim because the stronger benefit in older patients compensates for the weaker result in younger patients.", isCorrect: false, rationale: "No benefit for younger patients is not 'compensated' by benefit for older ones  each group either benefits or does not." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A historian studied newspaper editorials published during the 1918 influenza pandemic. Cities that acknowledged the severity of the outbreak and published honest health guidance experienced an average of 50% lower peak mortality than cities whose newspapers and officials downplayed the threat to maintain public morale. Philadelphia held a large parade during the outbreak despite warnings; within 72 hours, every hospital bed in the city was full.",
    question: "What does the comparison between transparent and non-transparent cities most strongly suggest?",
    answerOptions: [
      { text: "Cities that published honest guidance had lower mortality primarily because their residents already had better access to hospitals and medical treatment.", isCorrect: false, rationale: "The comparison focuses on communication transparency, not existing hospital infrastructure  access is not mentioned as a variable." },
      { text: "Newspaper editorials during the 1918 pandemic primarily served as entertainment for readers rather than as a genuine source of public health information.", isCorrect: false, rationale: "The entire study treats editorials as influential public health communication  the mortality data confirms they affected behaviour." },
      { text: "Philadelphia's parade caused high mortality because outdoor gatherings always weaken immune systems regardless of whether a disease outbreak is actively occurring.", isCorrect: false, rationale: "Gatherings during an epidemic spread disease through close contact  the issue is transmission, not a general weakening of immunity." },
      { text: "Honest public health communication can shape behaviour in ways that reduce death tolls, while downplaying risks to preserve morale may ultimately increase casualties.", isCorrect: true, rationale: "Transparent cities had 50% lower peak mortality, and Philadelphia's suppression of warnings led to immediate hospital overflow  honesty saved lives." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "An economics professor presented students with two job offers. Job A pays $75,000 in a company where the average salary is $60,000. Job B pays $85,000 in a company where the average salary is $100,000. In anonymous surveys, 62% of students chose Job A despite its lower absolute salary. When asked to explain, most cited 'feeling valued' and 'being above average' as factors.",
    question: "What does this experiment most strongly suggest about how people evaluate compensation?",
    answerOptions: [
      { text: "The experiment shows students prioritised job security over salary because companies with lower average pay tend to offer more stable long-term employment.", isCorrect: false, rationale: "Job security was not mentioned  students cited feeling valued and being above average, which are about relative standing." },
      { text: "Many people assess pay relative to their peers, and perceived standing within a group can matter more to them than the absolute dollar amount they receive.", isCorrect: true, rationale: "Choosing $10,000 less to be above the company average reveals that relative position, not absolute amount, drives satisfaction for many." },
      { text: "Most students chose Job A because they misread the salary figures on the survey and believed it offered the higher total compensation of the two options.", isCorrect: false, rationale: "Students explicitly explained their reasoning with references to feeling valued  the choice was deliberate, not a reading error." },
      { text: "The preference for Job A indicates students viewed the lower company average as a sign that the employer had greater capacity for salary raises in the future.", isCorrect: false, rationale: "Students cited present-tense feelings of being valued and above average  not future raise potential as their rationale." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary essay: 'The ending of Gatsby is often taught as a tragedy of one man's romantic delusion. But Fitzgerald's last lines  \"So we beat on, boats against the current, borne back ceaselessly into the past\"  use \"we,\" not \"he.\" The tragedy is not Gatsby's alone. Fitzgerald indicts an entire culture that mistakes accumulation for progress and novelty for possibility.'",
    question: "What does the essayist's focus on Fitzgerald's pronoun choice ('we' vs. 'he') reveal about their interpretation?",
    answerOptions: [
      { text: "The essayist argues Fitzgerald's use of 'we' deliberately extends the tragedy from one character to American culture as a whole, implicating the reader alongside Gatsby.", isCorrect: true, rationale: "By highlighting 'we' over 'he,' the essayist shows Fitzgerald broadening the indictment from one man's delusion to a collective cultural condition." },
      { text: "The pronoun shift shows that the narrator Nick Carraway finally accepts his own complicity in the events he has been recounting throughout the entire novel.", isCorrect: false, rationale: "The essayist's argument is about Fitzgerald's cultural critique, not about Nick's personal arc of self-awareness within the story." },
      { text: "The essayist highlights the pronoun to argue that Fitzgerald's editors altered the novel's ending without obtaining the author's knowledge or approval.", isCorrect: false, rationale: "The essayist treats the word choice as intentional and meaningful  there is no suggestion of editorial interference." },
      { text: "The choice of 'we' reveals that Fitzgerald identified personally with Gatsby and intended the closing sentence as autobiographical reflection rather than social critique.", isCorrect: false, rationale: "The essayist explicitly frames 'we' as a cultural indictment  not as Fitzgerald's personal identification with his character." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A study of professional chess players found that grandmasters spent an average of 30 seconds evaluating a position before making a move. Intermediate players spent an average of 90 seconds. Researchers found that grandmasters did not simply think faster  brain imaging showed they activated pattern-recognition centres, while intermediate players activated calculation centres. Grandmasters were essentially remembering, while intermediates were computing.",
    question: "What does this finding most strongly suggest about the nature of expertise?",
    answerOptions: [
      { text: "The brain-imaging data shows that grandmasters deliberately suppress their calculation centres to conserve mental energy for later rounds in long tournaments.", isCorrect: false, rationale: "The study describes a qualitative shift in brain activity with expertise  not a deliberate conservation strategy for tournament play." },
      { text: "The study indicates that intermediate players can never reach grandmaster level because their brains are permanently structured for calculation rather than recognition.", isCorrect: false, rationale: "The study compares current brain activity at different expertise levels  it does not claim the difference is permanent or unchangeable." },
      { text: "Deep expertise shifts problem-solving from deliberate calculation to rapid pattern recognition, allowing experts to perceive solutions that less experienced players must compute.", isCorrect: true, rationale: "Brain imaging reveals a qualitative change in cognitive strategy  years of experience convert the task from effortful computation to efficient recognition." },
      { text: "Grandmasters' reliance on pattern-recognition centres proves that chess ability is entirely innate and cannot be meaningfully developed through study or sustained practice.", isCorrect: false, rationale: "Pattern recognition in experts is built through years of study and practice  the finding shows the result of expertise development, not innate talent." },
    ],
    challenge_tags: ['rla-2'],
  },
];
