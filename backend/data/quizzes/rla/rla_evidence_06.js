// Evidence & Argumentation — Core Skills: Practice 6
// Mirrors practice 4-5 depth, fresh passages
module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage: "Telemedicine — the practice of conducting medical consultations via video call — expanded dramatically during the 2020 pandemic. Usage surged by over 3,000% in the first months of the health crisis, according to the Centers for Medicare & Medicaid Services. Physicians reported that routine follow-ups, prescription renewals, and mental health consultations adapted well to remote formats. However, physical examinations, diagnostic tests, and procedures still require in-person visits.",
    question: "Which detail best supports the claim that telemedicine adapted well to some medical needs?",
    answerOptions: [
      { text: "Telemedicine existed before the pandemic.", isCorrect: false, rationale: "This is background, not evidence of adaptation." },
      { text: "Physical exams still require in-person visits.", isCorrect: false, rationale: "This is a limitation, not evidence of successful adaptation." },
      { text: "Routine follow-ups and mental health consultations worked well remotely.", isCorrect: true, rationale: "This directly shows which types of care adapted well — specific and relevant." },
      { text: "Usage surged 3,000% in early 2020.", isCorrect: false, rationale: "This shows demand growth, not effectiveness." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage: "The Northend Community Garden was established in 2018 on a vacant lot donated by the city. In five years, the garden has produced over 12,000 pounds of fresh vegetables, provided gardening plots to 80 families, and partnered with a local food bank to donate surplus produce. A survey of gardeners found that 92% reported feeling more connected to their neighbourhood since joining.",
    question: "Which piece of evidence best supports the garden's social impact — beyond food production?",
    answerOptions: [
      { text: "The lot was donated by the city.", isCorrect: false, rationale: "This describes how the garden started, not its social impact." },
      { text: "92% of gardeners felt more connected to their neighbourhood.", isCorrect: true, rationale: "This directly measures social connectedness — a social impact beyond produce." },
      { text: "12,000 pounds of vegetables were produced.", isCorrect: false, rationale: "This is evidence of agricultural — not social — impact." },
      { text: "80 families received garden plots.", isCorrect: false, rationale: "Access to plots is access, not a measure of social connection." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "School officials at Lakeview High School reported that after installing water bottle refill stations throughout the building, single-use plastic bottle waste in school recycling bins dropped by 68% within six months. A student survey found that 80% of students who had access to a refill station within 50 feet of their locker used it daily, compared to only 31% of students whose nearest station was more than 150 feet away.",
    question: "What does the difference in usage rates between the two student groups suggest?",
    answerOptions: [
      { text: "Students who received refill stations care more about the environment.", isCorrect: false, rationale: "No data on attitudes is provided — this is an unsupported inference about motivation." },
      { text: "Proximity is a significant factor in whether students use the refill stations.", isCorrect: true, rationale: "The 80% vs 31% usage gap based purely on distance strongly implies proximity determines use." },
      { text: "The school should not have installed the stations more than 150 feet from lockers.", isCorrect: false, rationale: "This is a possible policy conclusion, not what the data 'suggests' about usage patterns." },
      { text: "More students prefer reusable bottles when given a direct instruction.", isCorrect: false, rationale: "No instruction was given — the variable studied is distance, not instruction." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "In the debate over whether high schools should start later in the morning, the American Academy of Pediatrics recommends start times no earlier than 8:30 a.m., citing research linking early start times to sleep deprivation, increased car accidents among teen drivers, and lower academic performance. Critics of later start times argue that the change creates logistical complications for families with working parents and older students who also hold after-school jobs.",
    question: "Which of the following best explains why the critics' argument does not disprove the recommendation?",
    answerOptions: [
      { text: "Critics are not doctors and should not oppose medical recommendations.", isCorrect: false, rationale: "Non-experts can raise valid concerns; the argument is not automatically invalid because it comes from non-doctors." },
      { text: "The critics address logistical challenges, not the health and academic evidence the recommendation is based on.", isCorrect: true, rationale: "The recommendation rests on sleep, crash, and academic data. Critics raise family logistics — a different dimension entirely." },
      { text: "Sleep deprivation is more important than any logistical issue.", isCorrect: false, rationale: "Asserting one value is more important is opinion, not an analysis of argument strength." },
      { text: "The critics offer no statistics.", isCorrect: false, rationale: "Lack of statistics alone does not permanently invalidate an argument — anecdotal or experiential concerns can be valid." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "Testimony before a city council: 'Councillors, our town must invest in the arts. A National Endowment for the Arts report found that arts organisations across the country generate \$135 billion in economic activity annually. Our local arts festival alone brought in an estimated \$1.2 million to local businesses last summer. We cannot afford NOT to fund the arts.'

Councillor's response: 'The \$135 billion figure is national and includes major cities like New York and Los Angeles. Our town of 18,000 cannot reasonably extrapolate from national aggregates. And the \$1.2 million from the festival does not tell us how much of that was additional spending versus spending shifted from other local businesses.'",
    question: "The councillor's response is most effective in challenging the testimony because it:",
    answerOptions: [
      { text: "Provides its own research showing arts investments fail in small towns.", isCorrect: false, rationale: "The councillor provides no alternative research — they simply critique the evidence presented." },
      { text: "Identifies that the national figure may not apply to a small town and that the local figure may not represent genuine economic growth.", isCorrect: true, rationale: "Both critiques attack the applicability and interpretation of the evidence — a strong, targeted response." },
      { text: "Argues that arts funding is culturally unimportant.", isCorrect: false, rationale: "The councillor does not make a cultural argument; they challenge the economic evidence." },
      { text: "Proves the festival generated less than \$1.2 million.", isCorrect: false, rationale: "The councillor doesn't dispute the $1.2 million — they question what it means economically." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A researcher studying online misinformation found that false news stories spread six times faster than true stories on social media platforms in a study of 126,000 Twitter posts between 2006 and 2017. The researcher concluded that human users, not automated bots, were responsible for the spread — users were 70% more likely to retweet false news than verified news. The study's authors noted the results were limited to Twitter and may not extend to other platforms.",
    question: "A journalist wants to use this study to argue that 'social media algorithms are the primary driver of misinformation.' What is the main problem with that use of the evidence?",
    answerOptions: [
      { text: "The study was conducted only on Twitter.", isCorrect: false, rationale: "While platform limitation is noted, it's not the main problem with the journalist's specific claim." },
      { text: "The study found that human behaviour, not algorithms, drove misinformation spread — directly contradicting the journalist's claim.", isCorrect: true, rationale: "The study explicitly attributes the spread to human users (70% more likely to retweet false news), not algorithms. The journalist's conclusion contradicts the evidence." },
      { text: "The study is too old to be relevant.", isCorrect: false, rationale: "The study spans 2006–2017, which may limit recency but isn't the fundamental problem with the journalist's claim." },
      { text: "False news spreading faster does not mean it is harmful.", isCorrect: false, rationale: "This doesn't address the journalist's specific claim about algorithms." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A pharmaceutical company's press release states: 'In clinical trials, 87% of patients taking our new pain medication reported moderate-to-significant relief of symptoms within 48 hours.' The fine print of the trial report reveals: the trial had no placebo control group; participants were allowed to take over-the-counter pain relievers simultaneously; and 'moderate relief' was defined as any improvement on a self-reported 10-point scale — including movement from 8 to 7.",
    question: "Which detail from the fine print most significantly weakens the 87% claim?",
    answerOptions: [
      { text: "There was no placebo group.", isCorrect: true, rationale: "Without a placebo comparison, there is no way to know how much improvement was due to the drug versus natural recovery, OTC medications, or expectation — this is the most critical flaw." },
      { text: "Participants could take other pain relievers.", isCorrect: false, rationale: "This is a significant confound but secondary to having no placebo group to isolate the drug's effect." },
      { text: "'Moderate relief' included small improvements.", isCorrect: false, rationale: "This dilutes what 'success' means but matters less if there were a control group to compare against." },
      { text: "The trial was funded by the pharmaceutical company.", isCorrect: false, rationale: "Funding source is a concern for bias but is not mentioned in the passage and is not a 'fine print' detail provided." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "In a speech before a city council, a developer argues: 'Building luxury condominiums will benefit everyone. More high-end residents mean more tax revenue, which funds public schools and services. Trickle-down works: when wealthier people move in, local businesses thrive and everyone benefits.' A housing advocate responds: 'In neighbourhoods where luxury condos have been built in comparable cities, studies show that within five years, average rents in surrounding blocks rose 28%, displacing long-term residents who could no longer afford to live there.'",
    question: "The housing advocate's evidence is most effective because it:",
    answerOptions: [
      { text: "Proves that tax revenue never benefits schools.", isCorrect: false, rationale: "The advocate doesn't address tax revenue or schools." },
      { text: "Provides pattern-level evidence from comparable cities that directly contradicts the developer's 'everyone benefits' claim.", isCorrect: true, rationale: "Displacement of long-term residents at 28% rent increases from multiple comparable cities directly refutes the universality of the developer's claim." },
      { text: "Shows that luxury condos are always harmful.", isCorrect: false, rationale: "'Always' is too absolute — the advocate points to evidence from comparable cases, not a universal law." },
      { text: "Argues that trickle-down economics is wrong in theory.", isCorrect: false, rationale: "The advocate uses empirical displacement data, not a theoretical critique." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "Two newspaper editorials appear side by side:

Editorial A: 'Our city's new red-light camera programme is a proven safety measure. In the first year, intersection accidents dropped by 31% at monitored locations.'

Editorial B: 'The red-light camera programme is a revenue scheme, not a safety measure. While accidents dropped at monitored intersections, a University of Pennsylvania study found that rear-end collisions increased by 24% at those same intersections as drivers braked abruptly to avoid tickets.'",
    question: "Which statement most accurately evaluates the two editorials' use of evidence?",
    answerOptions: [
      { text: "Editorial A is correct and B is incorrect because A uses a higher percentage drop.", isCorrect: false, rationale: "Percentages cannot be compared without considering what they measure." },
      { text: "Both editorials measure different types of accidents, which means neither fully captures the safety picture alone.", isCorrect: true, rationale: "A measures all intersection accidents; B measures rear-end collisions specifically — each captures a real but partial view of the safety impact." },
      { text: "Editorial B proves that red-light cameras cause accidents.", isCorrect: false, rationale: "'Cause' is too strong a word; the study shows an association with increased rear-end collisions." },
      { text: "Editorial A proves the programme was a success overall.", isCorrect: false, rationale: "A 31% drop in some accidents alongside a 24% rise in another type means the full picture is unclear." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A public health agency's report argues that sugar-sweetened beverage taxes reduce consumption and obesity rates. It cites Mexico's 10% soda tax, which led to a 12% reduction in soda sales among lower-income households. Critics argue that such taxes are regressive — they take a higher percentage of income from poor families than from wealthy ones — and that consumption simply shifted to other high-calorie beverages.",
    question: "A policy analyst who supports the tax should acknowledge which of the following to make the strongest, most honest argument?",
    answerOptions: [
      { text: "Lower-income families should not be allowed to buy soda.", isCorrect: false, rationale: "This does not honestly grapple with the regressivity concern." },
      { text: "The tax burden does fall more heavily on lower-income consumers, but if revenue is directed to health programmes in low-income communities, the net effect may be progressive.", isCorrect: true, rationale: "Acknowledging the regressivity critique and offering a revenue-use solution is the most honest and complete defence of the tax." },
      { text: "The critics are wrong because the tax did reduce soda sales.", isCorrect: false, rationale: "Soda sales falling doesn't automatically address the regressivity or substitution concerns." },
      { text: "Other high-calorie beverages are not as harmful as soda.", isCorrect: false, rationale: "This makes an unverified health claim that isn't supported by evidence in the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
];