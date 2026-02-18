// Reading Comprehension — Challenge: Inference — Practice 10
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: "hard",
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
    questionNumber: 2, type: 'multipleChoice', difficulty: "hard",
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
    questionNumber: 3, type: 'multipleChoice', difficulty: "hard",
    passage: "From a 2023 policy analysis: 'Cities that implemented ranked-choice voting (RCV) in municipal elections saw a 28% increase in the number of candidates running compared to cities using plurality voting. Voter satisfaction surveys showed a 19% increase in the perception that 'the candidate I preferred had a real chance of winning.' Turnout did not change significantly. However, ballot spoilage rates (incorrectly filled-out ballots) doubled in the first election cycle under RCV, declining to near-baseline in subsequent cycles.'",
    question: "Based on ALL the data, which conclusion is most balanced and defensible?",
    answerOptions: [
      { text: "RCV is an immediate and unqualified improvement over plurality voting.", isCorrect: false, rationale: "The doubled spoilage rate in the first cycle is a real short-term cost that 'unqualified improvement' ignores." },
      { text: "RCV failed because voter turnout did not increase.", isCorrect: false, rationale: "The analysis shows multiple positive indicators; turnout stagnation alone is insufficient to conclude failure." },
      { text: "RCV produced measurable benefits in candidate diversity and voter satisfaction, with an initial learning-curve cost in ballot errors that declined over time — suggesting it may be effective with appropriate voter education.", isCorrect: true, rationale: "This integrates all four data points: more candidates (+), more satisfaction (+), unchanged turnout (neutral), higher initial spoilage that declined (-/temporary)." },
      { text: "Ranked-choice voting should only be used in large cities with sophisticated voters.", isCorrect: false, rationale: "City size and voter sophistication are not mentioned as variables in the data." },
    ],
    challenge_tags: ['rla-2'],
  }
];