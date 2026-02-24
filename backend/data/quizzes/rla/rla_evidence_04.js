// Reading Comprehension  Core: Textual Evidence  Practice 4
// 10 questions | evaluating evidence strength, distinguishing anecdote from data, identifying strongest support
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "A city report claimed that the new public library branch had 'greatly increased literacy engagement in the community.' The report cited the following: the branch registered 4,200 new library card holders in its first year, hosted 180 children's story-time sessions, and partnered with three local schools for after-school reading programmes. A resident quoted in the report said, 'My kids love going there.'",
    question: "Which piece of evidence from the report most directly supports the claim of 'increased literacy engagement'?",
    answerOptions: [
      { text: "A resident said her kids love going to the library.", isCorrect: false, rationale: "One family's enthusiasm is anecdotal  it does not measure community-wide engagement." },
      { text: "4,200 new library card registrations in the first year.", isCorrect: true, rationale: "Card registrations are a quantifiable measure of community members engaging with a literacy institution  this is the strongest direct evidence of 'increased engagement.'" },
      { text: "The branch hosted 180 story-time sessions.", isCorrect: false, rationale: "This shows programming was offered, but it doesn't tell us how many people attended or engaged." },
      { text: "The library partnered with three local schools.", isCorrect: false, rationale: "Partnerships indicate institutional effort, not community engagement outcomes." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "An editorial argued that the town's new dog park had reduced neighbourhood conflicts. The author pointed out that noise complaints related to barking dropped 41% in the surrounding blocks, animal control calls fell by 28%, and property values within a quarter-mile radius increased by 3%. The author also mentioned that her own neighbour's dog seemed calmer since the park opened.",
    question: "Which evidence is weakest in supporting the editorial's claim about reduced conflicts?",
    answerOptions: [
      { text: "Noise complaints dropped 41%.", isCorrect: false, rationale: "This is quantified data directly tied to the conflict claim." },
      { text: "Animal control calls fell 28%.", isCorrect: false, rationale: "Fewer animal control calls directly relates to fewer neighbourhood pet conflicts." },
      { text: "The author's neighbour's dog seems calmer.", isCorrect: true, rationale: "One dog's behaviour observed by one person is anecdotal and subjective  it is the weakest form of evidence compared to the statistical measures." },
      { text: "Property values increased 3%.", isCorrect: false, rationale: "While less directly relevant to conflicts, property values are at least a measurable data point." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "A nutritionist argued that school lunch programmes should include more whole grains. She cited a study of 1,500 students showing that those who ate whole-grain lunches maintained concentration 22% longer in afternoon classes than students eating refined-grain lunches. She also noted that whole grains cost approximately $0.03 more per serving than refined grains, and that the American Heart Association recommends whole grains for cardiovascular health.",
    question: "Which piece of evidence most directly supports the argument for whole grains specifically in a school setting?",
    answerOptions: [
      { text: "Whole grains cost only $0.03 more per serving.", isCorrect: false, rationale: "Cost feasibility supports implementation but doesn't argue for the educational benefit." },
      { text: "The American Heart Association recommends whole grains.", isCorrect: false, rationale: "A general health recommendation supports whole grains overall but isn't specific to the school context." },
      { text: "Students eating whole-grain lunches maintained concentration 22% longer in afternoon classes.", isCorrect: true, rationale: "This connects whole grains directly to a school-specific outcome  student focus  making it the most relevant evidence for the school-lunch argument." },
      { text: "The study included 1,500 students.", isCorrect: false, rationale: "Sample size adds credibility but is not itself evidence for the benefit of whole grains." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "A mayor defended the city's investment in electric buses by presenting the following data: diesel fuel costs dropped to zero for the 15 routes converted, maintenance costs per bus fell 34% due to fewer engine components, and rider satisfaction surveys showed 18% higher approval ratings. Opposition councillors countered that the buses' battery range of 150 miles per charge was insufficient for the city's longest route of 180 miles.",
    question: "How does the opposition's evidence relate to the mayor's argument?",
    answerOptions: [
      { text: "It disproves all three of the mayor's data points.", isCorrect: false, rationale: "The range limitation doesn't affect the cost or satisfaction data  those remain valid." },
      { text: "It identifies a specific operational limitation that the mayor's data did not address  the buses may be cost-effective and popular but physically unable to serve all routes.", isCorrect: true, rationale: "The opposition doesn't dispute cost savings or satisfaction. They raise a capability gap  a different dimension the mayor's evidence didn't cover." },
      { text: "It proves electric buses should be abandoned entirely.", isCorrect: false, rationale: "A range limitation on the longest route doesn't invalidate the programme for the 15 routes that work." },
      { text: "Battery range is irrelevant to public transit decisions.", isCorrect: false, rationale: "If a bus can't complete its route on a single charge, range is directly relevant." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "A workplace safety consultant argued that standing desks reduce back pain among office workers. She cited a 6-month study of 200 employees: those using standing desks reported 32% less lower-back pain than seated colleagues. However, the standing-desk group also received ergonomic training on proper posture, while the seated group did not.",
    question: "Why does the ergonomic training detail weaken the consultant's conclusion?",
    answerOptions: [
      { text: "Ergonomic training is unrelated to back pain.", isCorrect: false, rationale: "Posture training directly affects back pain  it is entirely relevant." },
      { text: "The back pain reduction could be partly or fully due to the ergonomic training rather than the standing desks themselves  since both variables changed simultaneously, we cannot isolate the desk's effect.", isCorrect: true, rationale: "When two interventions are applied together and only the combined result is measured, attributing the outcome to one factor alone is unsupported." },
      { text: "The study's sample size of 200 is too small to draw any conclusions.", isCorrect: false, rationale: "200 participants is a reasonable sample  the issue is the confounded variables, not the sample size." },
      { text: "Standing desks are more expensive than ergonomic training.", isCorrect: false, rationale: "Cost is not the question  the issue is which intervention caused the benefit." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A school board member argued for eliminating recess to add instructional time, citing a district where test scores rose 8% after recess was cut. A teacher responded with a study of 12,000 students across 40 schools showing that students with daily recess scored 11% higher on end-of-year assessments than students without recess. The teacher also noted that the board member's cited district simultaneously introduced a new reading curriculum when recess was cut.",
    question: "Why does mentioning the new reading curriculum strengthen the teacher's rebuttal?",
    answerOptions: [
      { text: "It proves the board member fabricated the data.", isCorrect: false, rationale: "The data may be real  the issue is what caused the improvement." },
      { text: "It reveals that the board member's evidence is confounded  the test score increase may have been caused by the new curriculum rather than the loss of recess, making the board member's causal claim unreliable.", isCorrect: true, rationale: "Two changes happened simultaneously. Attributing the improvement to recess elimination alone ignores the curriculum change  a classic confounding variable." },
      { text: "New reading curricula never improve test scores.", isCorrect: false, rationale: "The teacher is arguing the opposite  that the curriculum may be responsible for the improvement." },
      { text: "The teacher's study is too large to be accurate.", isCorrect: false, rationale: "Larger studies are generally more reliable, not less." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A company's annual report stated: 'Employee satisfaction reached an all-time high this year.' The report cited an internal survey showing 89% of employees rated their job satisfaction as 'good' or 'excellent.' However, the survey had a 34% response rate, and the company had laid off 200 employees (18% of the workforce) six months before the survey was conducted.",
    question: "Why do the response rate and the layoffs together undermine confidence in the survey result?",
    answerOptions: [
      { text: "34% is actually a high response rate for workplace surveys.", isCorrect: false, rationale: "Even if typical, a 34% response rate means 66% of employees are unrepresented  and the non-respondents may differ systematically from respondents." },
      { text: "The least satisfied employees may have been among those laid off or may have chosen not to respond  leaving a self-selected sample of more satisfied employees and producing an artificially high satisfaction score.", isCorrect: true, rationale: "If dissatisfied workers were laid off and dissatisfied remaining workers opted out of the survey, the 89% figure reflects a doubly filtered sample  not the full workforce's experience." },
      { text: "Layoffs always improve employee satisfaction.", isCorrect: false, rationale: "Layoffs often reduce morale among survivors  the concern is that the survey missed that impact." },
      { text: "The company should have surveyed former employees instead.", isCorrect: false, rationale: "Surveying laid-off workers is impractical  the issue is interpreting the current data honestly." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A news article claimed that violent video games cause aggression in teenagers. It cited a laboratory study in which teens who played a violent game for 30 minutes showed elevated heart rates and reported higher irritability than teens who played a puzzle game. A psychologist quoted in the article noted that elevated heart rate and short-term irritability in a lab setting do not equate to real-world violent behaviour.",
    question: "What gap in the evidence does the psychologist identify?",
    answerOptions: [
      { text: "The study should have used adult participants instead of teenagers.", isCorrect: false, rationale: "Age is not the psychologist's concern  the gap is between lab measurements and real-world behaviour." },
      { text: "The study measured short-term physiological and emotional responses in a controlled setting, but the article's claim is about real-world aggression  the evidence does not bridge the gap between temporary arousal and actual violent behaviour.", isCorrect: true, rationale: "Heart rate and irritability after 30 minutes in a lab do not demonstrate that the same teens will commit real-world aggression. The psychologist identifies the inferential leap." },
      { text: "Puzzle games are too easy to serve as a proper control.", isCorrect: false, rationale: "The type of control game is not the psychologist's objection." },
      { text: "The study proves video games are completely safe and have no effects.", isCorrect: false, rationale: "The psychologist says the effects shown don't equal real-world violence  not that no effects exist." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A political candidate claimed credit for a 12% reduction in the city's crime rate during her two-year term. Her campaign cited police staffing increases she authorised and three community policing programmes she funded. Her opponent pointed out that crime rates fell an average of 10% in comparable cities nationwide during the same period  cities that had not implemented the candidate's programmes.",
    question: "Why does the opponent's evidence significantly weaken the candidate's claim?",
    answerOptions: [
      { text: "A 12% reduction is not meaningful enough to claim credit.", isCorrect: false, rationale: "The size of the reduction isn't the issue  it's whether the candidate's policies caused it." },
      { text: "If comparable cities saw a 10% decline without the candidate's programmes, only the 2 percentage-point difference above the national trend could potentially be attributed to her policies  the broader decline was likely driven by factors beyond her control.", isCorrect: true, rationale: "The national trend provides a baseline. Taking credit for a 12% drop when 10% would have happened anyway overstates the candidate's impact by a factor of six." },
      { text: "The opponent's data includes cities that are not comparable.", isCorrect: false, rationale: "The question says 'comparable cities'  this premise is built into the evidence." },
      { text: "Crime statistics are always inaccurate.", isCorrect: false, rationale: "Both candidates are using crime statistics  dismissing the metric entirely helps neither argument." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A health department report argued that the county's water fluoridation programme had 'dramatically improved children's dental health.' The report showed that cavities in children under 12 dropped 45% over ten years. During the same period, the county had also expanded Medicaid dental coverage, introduced school-based dental screenings, and seen a 20% increase in households using fluoride toothpaste.",
    question: "What makes it difficult to attribute the dental improvement specifically to water fluoridation?",
    answerOptions: [
      { text: "45% is not a significant reduction in cavities.", isCorrect: false, rationale: "45% is a substantial reduction  significance is not the issue." },
      { text: "Multiple interventions occurred simultaneously  expanded dental coverage, school screenings, and increased fluoride toothpaste use could each have contributed to the improvement, making it impossible to isolate water fluoridation's specific effect.", isCorrect: true, rationale: "With four dental-health interventions overlapping, any one of them  or their combination  could explain the improvement. The report attributes it all to fluoridation without controlling for the others." },
      { text: "Water fluoridation has no scientific basis.", isCorrect: false, rationale: "Fluoridation has broad scientific support  the issue is isolating its contribution among multiple interventions." },
      { text: "Children under 12 are too young for dental health to matter.", isCorrect: false, rationale: "Childhood dental health has lifelong consequences  age is not a reason to dismiss the data." },
    ],
    challenge_tags: ['rla-2'],
  },
];
