// Reading Comprehension — Challenge: Inference — Practice 10
// 10 questions | academic papers, primary sources, complex policy analysis, advanced literary criticism
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2024 economics paper: 'Countries that adopted austerity measures (government spending cuts + tax increases) in response to the 2010 European debt crisis averaged 3.1% GDP contraction in the following two years, compared to 0.6% GDP growth in comparable countries that instead adopted stimulus spending. The austerity-country group also saw unemployment rise an average of 4.2 percentage points, compared to 1.1 in the stimulus group. Critics of the paper note that austerity countries had significantly higher pre-crisis debt-to-GDP ratios, which may have constrained their policy choices.'",
    question: "What does the critics' note add to the interpretation of the study's findings?",
    answerOptions: [
      { text: "The critics prove that austerity is always the correct policy.", isCorrect: false, rationale: "The critics question comparability, not establish austerity's supremacy." },
      { text: "The note raises a confounding variable: austerity countries may have had worse outcomes partly because of their pre-existing debt levels, not solely due to austerity itself — making a direct causal comparison to stimulus countries less certain.", isCorrect: true, rationale: "Pre-crisis debt differences mean the two groups weren't truly comparable — the critics identify that worse outcomes may have multiple causes beyond the policy choice." },
      { text: "Pre-crisis debt is irrelevant to economic recovery policy.", isCorrect: false, rationale: "The critics specifically raise it as a possible confound — it's directly relevant." },
      { text: "The paper's findings are fabricated.", isCorrect: false, rationale: "The critics question methodology, not fabrication." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "From George Orwell's essay 'Politics and the English Language' (1946): 'When you think of something abstract you are more inclined to use words from the start, and unless you make a conscious effort to prevent it, the existing dialect will come rushing in and do the job for you, at the expense of blurring or even changing your meaning. Probably it is better to put off using words as long as possible and get one's meaning as clear as one can through pictures and sensations.'",
    question: "What is Orwell's implied concern about abstract language in political writing?",
    answerOptions: [
      { text: "Abstract writing is more difficult to publish than concrete writing.", isCorrect: false, rationale: "Publication difficulty is not Orwell's concern here." },
      { text: "Relying on pre-existing abstract phrases allows vague, conventional language to substitute for genuine clear thinking — the writer may believe they have expressed something when they have only deployed familiar terminology.", isCorrect: true, rationale: "Orwell's concern is that stock phrases do the thinking 'for you,' blurring or changing meaning — the writer loses control of their own thought through linguistic autopilot." },
      { text: "Concrete images are always more persuasive than abstract concepts in political speeches.", isCorrect: false, rationale: "Orwell's concern is about meaning accuracy, not persuasive power." },
      { text: "Orwell believed all political writing should avoid abstract concepts entirely.", isCorrect: false, rationale: "He recommends delaying abstraction until meaning is clear — not eliminating abstractions." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2023 policy analysis: 'Cities that implemented ranked-choice voting (RCV) in municipal elections saw a 28% increase in the number of candidates running compared to cities using plurality voting. Voter satisfaction surveys showed a 19% increase in the perception that \"the candidate I preferred had a real chance of winning.\" Turnout did not change significantly. However, ballot spoilage rates (incorrectly filled-out ballots) doubled in the first election cycle under RCV, declining to near-baseline in subsequent cycles.'",
    question: "Based on ALL the data, which conclusion is most balanced and defensible?",
    answerOptions: [
      { text: "RCV is an immediate and unqualified improvement over plurality voting.", isCorrect: false, rationale: "The doubled spoilage rate in the first cycle is a real short-term cost that 'unqualified improvement' ignores." },
      { text: "RCV failed because voter turnout did not increase.", isCorrect: false, rationale: "The analysis shows multiple positive indicators; turnout stagnation alone is insufficient to conclude failure." },
      { text: "RCV produced measurable benefits in candidate diversity and voter satisfaction, with an initial learning-curve cost in ballot errors that declined over time — suggesting it may be effective with appropriate voter education.", isCorrect: true, rationale: "This integrates all four data points: more candidates (+), more satisfaction (+), unchanged turnout (neutral), higher initial spoilage that declined (-/temporary)." },
      { text: "Ranked-choice voting should only be used in large cities with sophisticated voters.", isCorrect: false, rationale: "City size and voter sophistication are not mentioned as variables in the data." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2022 sociology paper: 'In interviews with 150 formerly incarcerated individuals, 83% reported that the greatest barrier to reintegration was not finding employment, as commonly assumed, but maintaining employment. Participants described a cycle: they would secure a job, but lack of stable housing, unreliable transportation, and the stigma of disclosure during background checks led to termination within the first 90 days. Of participants who maintained housing for six consecutive months, 74% retained employment beyond one year.'",
    question: "What does the housing-employment correlation most strongly suggest about reintegration policy?",
    answerOptions: [
      { text: "Employment programmes alone are sufficient to reduce recidivism.", isCorrect: false, rationale: "The study explicitly shows employment is lost without housing stability — job programmes alone are insufficient." },
      { text: "Housing stability may be a prerequisite for — not a result of — sustainable employment, suggesting that reintegration programmes should prioritise stable housing as the foundation upon which employment retention depends.", isCorrect: true, rationale: "74% retained jobs when housed for 6 months, while the broader group lost jobs within 90 days. Housing appears to enable employment, not the reverse." },
      { text: "All formerly incarcerated individuals should receive permanent government housing.", isCorrect: false, rationale: "The study identifies housing stability as critical, but 'permanent government housing' is a specific policy not recommended in the paper." },
      { text: "Background checks should be eliminated from all hiring processes.", isCorrect: false, rationale: "Background checks were one of several barriers — eliminating them alone would not address housing or transportation." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From Frederick Douglass's 1852 speech 'What to the Slave Is the Fourth of July?': 'What, to the American slave, is your Fourth of July? I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim. To him, your celebration is a sham; your boasted liberty, an unholy license; your national greatness, swelling vanity... your shouts of liberty and equality, hollow mockery.'",
    question: "What rhetorical strategy does Douglass's repeated use of 'your' (rather than 'our') serve?",
    answerOptions: [
      { text: "Douglass was not an American citizen and was therefore excluded from saying 'our.'", isCorrect: false, rationale: "Douglass's pronoun choice is rhetorical — he is forcing his audience to confront their own complicity, not making a legal claim about citizenship." },
      { text: "By using 'your' instead of 'our,' Douglass forces his white audience to see the holiday from the perspective of the enslaved — making them feel the exclusion that 'our' would have papered over, and refusing to share in a celebration that mocks his people.", isCorrect: true, rationale: "'Your' separates Douglass from the celebration, places the burden of the contradiction on the audience, and makes the gap between rhetoric and reality impossible to ignore." },
      { text: "Douglass did not want to celebrate the Fourth of July and wished it were abolished.", isCorrect: false, rationale: "His complaint is about the hypocrisy of celebrating liberty while practising slavery — not about the holiday's existence." },
      { text: "Douglass was simply being polite by not including himself in the celebration.", isCorrect: false, rationale: "The speech is confrontational, not polite — 'sham,' 'mockery,' and 'unholy license' are deliberate provocations." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A 2023 meta-analysis of 60 studies on standardised testing found that students from higher-income families scored an average of 1.2 standard deviations above students from lower-income families. When researchers controlled for access to test preparation materials, private tutoring, and number of practice tests taken, the gap narrowed to 0.3 standard deviations. The remaining 0.3 gap correlated with factors including nutrition, sleep quality, and stress levels associated with housing and food insecurity.",
    question: "What does the narrowing of the gap after controlling for test-prep access most critically reveal?",
    answerOptions: [
      { text: "Standardised tests perfectly measure innate intelligence with no outside influence.", isCorrect: false, rationale: "If the gap shrinks when access variables are controlled, the test is measuring access as well as ability." },
      { text: "The majority of the income-based testing gap reflects differences in preparation resources and living conditions rather than differences in underlying academic ability — calling into question whether the tests measure aptitude or advantage.", isCorrect: true, rationale: "The gap drops from 1.2 to 0.3 when resource access is controlled, and the remaining 0.3 correlates with poverty-related stress. Very little of the original gap appears to reflect ability differences." },
      { text: "Lower-income students should not be allowed to take standardised tests.", isCorrect: false, rationale: "Exclusion would compound the inequity — the study calls for understanding what tests measure, not who should take them." },
      { text: "Test preparation companies are solely responsible for educational inequality.", isCorrect: false, rationale: "Test prep is one of several factors — nutrition, sleep, and housing insecurity also contribute." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2024 climate adaptation report: 'Jakarta, Indonesia — a city of 10 million — is sinking at a rate of up to 25 centimetres per year in its northern districts due to excessive groundwater extraction by residents and industry. Simultaneously, sea levels are rising approximately 3 millimetres annually. The Indonesian government announced plans to relocate the capital to Nusantara, a new city on Borneo. Critics note that the relocation benefits government officials while the 10 million residents of Jakarta — primarily working-class — will remain in a sinking city.'",
    question: "What does the critics' objection reveal about the equity dimension of climate adaptation policy?",
    answerOptions: [
      { text: "Moving the capital will stop Jakarta from sinking.", isCorrect: false, rationale: "The capital relocation does nothing about groundwater extraction or sea-level rise in Jakarta." },
      { text: "Climate adaptation measures may protect political and economic elites while leaving the most vulnerable populations to bear the consequences — creating a two-tier system where the ability to relocate determines survival.", isCorrect: true, rationale: "Government officials move to safety while 10 million working-class residents remain. The adaptation benefits the powerful, not the exposed." },
      { text: "Jakarta's residents caused the sinking and therefore deserve the consequences.", isCorrect: false, rationale: "Groundwater extraction is driven by systemic infrastructure failures, not individual moral choice." },
      { text: "Indonesia should not adapt to climate change at all.", isCorrect: false, rationale: "The critics advocate for equitable adaptation, not against adaptation itself." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary analysis: 'In Kafka's The Metamorphosis, Gregor Samsa's family initially reacts to his transformation into an insect with horror and care. His sister brings food; his mother weeps. But as weeks pass, care gives way to resentment. The family begins referring to Gregor as \"it.\" When Gregor finally dies, the family takes a tram into the countryside, and Kafka describes the daughter stretching in the sunlight — a moment of unmistakable relief. The family's compassion, it seems, had a shelf life.'",
    question: "What does the analyst's phrase 'compassion had a shelf life' most critically argue?",
    answerOptions: [
      { text: "Kafka believed families should abandon disabled members quickly.", isCorrect: false, rationale: "The analyst describes what happens in the story, not what Kafka prescribes as morally correct." },
      { text: "Kafka depicts compassion as a depletable resource — the family's care was genuine but finite, and when the burden of Gregor's condition exceeded their capacity, love was replaced by self-preservation and eventual relief at his death.", isCorrect: true, rationale: "The progression from care to 'it' to relief shows compassion exhausting itself under sustained pressure. The analyst sees this as Kafka's comment on human emotional limits." },
      { text: "The family was never compassionate and faked their concern from the beginning.", isCorrect: false, rationale: "The analyst explicitly says the initial care was genuine — 'care gives way to resentment,' implying a real transition." },
      { text: "Kafka's story is a comedy about family dysfunction.", isCorrect: false, rationale: "The progression from compassion to dehumanisation to relief is described as tragic, not comedic." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A 2023 criminology study analysed the effects of body-worn cameras on 4,200 police officers across 12 departments. Departments where officers could not turn cameras off during encounters saw a 37% reduction in use-of-force incidents and a 41% drop in civilian complaints. Departments where officers could decide when to activate their cameras saw no statistically significant change in either metric compared to control departments without cameras.",
    question: "What does the contrast between mandatory and discretionary camera activation most strongly imply?",
    answerOptions: [
      { text: "Body cameras are useless technology and should be abandoned.", isCorrect: false, rationale: "Mandatory activation produced significant improvements — the technology works under the right policy." },
      { text: "The accountability mechanism of body cameras depends on removing officer control over recording — when officers can choose when to record, the deterrent effect on behaviour is neutralised because problematic encounters can go unrecorded.", isCorrect: true, rationale: "Mandatory recording produced large reductions; discretionary recording produced none. The difference isolates the policy variable: it's not the camera that changes behaviour, but the certainty of being recorded." },
      { text: "All police officers abuse their power when cameras are off.", isCorrect: false, rationale: "The study shows aggregate statistical patterns, not individual universal behaviour." },
      { text: "Civilian complaints are always fabricated.", isCorrect: false, rationale: "A 41% drop in complaints under mandatory recording suggests many complaints reflect real incidents that cameras help prevent." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From Hannah Arendt's Eichmann in Jerusalem (1963): 'The trouble with Eichmann was precisely that so many were like him, and that the many were neither perverted nor sadistic, that they were, and still are, terribly and terrifyingly normal. From the viewpoint of our legal institutions and of our moral standards of judgment, this normality was much more terrifying than all the atrocities put together, for it implied that this new type of criminal commits his crimes under circumstances that make it well-nigh impossible for him to know or to feel that he is doing wrong.'",
    question: "What is the central and most disturbing implication of Arendt's argument?",
    answerOptions: [
      { text: "Eichmann was secretly a sadist who concealed his true nature during the trial.", isCorrect: false, rationale: "Arendt explicitly argues he was not sadistic — his normality is the point." },
      { text: "Systemic evil does not require evil individuals — ordinary people operating within bureaucratic structures that diffuse responsibility can commit atrocities without recognising their own moral culpability, making such crimes both harder to prevent and harder to punish.", isCorrect: true, rationale: "Arendt's argument is that the system made it 'impossible for him to know he was doing wrong.' If atrocities don't require monsters, then moral vigilance must focus on systems, not just individuals." },
      { text: "Legal institutions successfully punished all Nazi war criminals.", isCorrect: false, rationale: "Arendt's concern is that normal people committed crimes under conditions that complicate legal and moral judgment — not that punishment was comprehensive." },
      { text: "Eichmann should have been acquitted because he was merely following orders.", isCorrect: false, rationale: "Arendt is describing the horror of the situation, not arguing for acquittal — her analysis is diagnostic, not exculpatory." },
    ],
    challenge_tags: ['rla-2'],
  },
];