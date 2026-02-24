// Reading Comprehension  Test Ready: Textual Evidence  Practice 7
// 10 questions | evaluating evidence sufficiency, source reliability, and counter-evidence
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A school board voted to eliminate art and music classes to close a budget deficit, arguing that test-score data showed no correlation between arts participation and academic achievement. A parent coalition responded with a longitudinal study from a state university tracking 12,000 students over eight years. The study found that students who took at least two years of arts courses were 20% more likely to graduate and 15% less likely to be disciplined for behavioural issues, even after controlling for family income and prior academic performance.",
    question: "Why does the parent coalition's study pose a stronger challenge to the school board than simply asserting 'the arts are valuable'?",
    answerOptions: [
      { text: "It was conducted by a university, which automatically makes it correct.", isCorrect: false, rationale: "Institutional affiliation adds credibility but does not make findings automatically correct  the study's design features are what matter." },
      { text: "The study's longitudinal design, large sample size, and income controls address the claim that arts produce no measurable academic benefit by showing measurable long-term outcomes that the board's test-score data did not capture.", isCorrect: true, rationale: "The board looked at test scores in isolation. The coalition's study tracked graduation and behaviour over eight years while controlling for confounders  a broader and more rigorous measure of educational impact." },
      { text: "The coalition has more members than the school board.", isCorrect: false, rationale: "Group size is irrelevant to the quality of the evidence presented." },
      { text: "Art and music are constitutionally protected.", isCorrect: false, rationale: "No such constitutional protection exists  the debate is about evidence, not law." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'medium',
    passage: "An editorial in a regional newspaper argued that the town's declining downtown foot traffic proved that the new bypass highway was 'killing Main Street businesses.' The editor cited a merchant who said sales were down 30%. A transportation planner responded that three of the five largest downtown employers had relocated to a suburban office park eighteen months before the bypass opened, removing roughly 3,000 daily workers from the downtown area  and that the merchant's sales decline began before bypass construction started.",
    question: "What does the timeline evidence from the transportation planner reveal about the editorial's argument?",
    answerOptions: [
      { text: "The bypass was built in the wrong location.", isCorrect: false, rationale: "The planner's evidence concerns causation, not highway placement." },
      { text: "The editor conflated correlation with causation: the decline started before the bypass existed, and a major alternative cause  employer relocations  provides a more plausible and earlier-starting explanation for the foot traffic loss.", isCorrect: true, rationale: "The timeline shows decline predating the bypass. The employer relocations provide a concrete, quantifiable alternative cause that the editorial ignored." },
      { text: "Downtown businesses never have declining sales.", isCorrect: false, rationale: "The evidence confirms sales did decline  the dispute is about the cause." },
      { text: "Newspapers should not publish editorials about transportation.", isCorrect: false, rationale: "This is about evidence quality, not editorial scope." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A pharmaceutical company announced that clinical trials for its new migraine drug showed a 47% reduction in monthly migraine days compared to 22% for placebo. A medical journal review noted that the trial enrolled only patients who had already failed two previous migraine medications, that participants were 80% female, and that the trial lasted only 12 weeks. The review asked whether the drug's benefits would hold in a broader population, in men, and over longer treatment periods.",
    question: "What type of evidence limitations does the journal review identify?",
    answerOptions: [
      { text: "The drug is dangerous and should be recalled.", isCorrect: false, rationale: "The review questions generalisability, not safety." },
      { text: "The trial's narrow enrollment criteria, gender imbalance, and short duration limit the ability to generalise the 47% result to typical migraine patients, male patients, or long-term use  the efficacy number may be accurate for the studied group but misleading as a general claim.", isCorrect: true, rationale: "Trial results are only directly applicable to the population studied. Patients who failed two drugs may respond differently than first-time patients; 12 weeks doesn't capture long-term effects." },
      { text: "All clinical trials are fraudulent.", isCorrect: false, rationale: "The review raises legitimate methodological questions, not accusations of fraud." },
      { text: "Placebos are more effective than drugs.", isCorrect: false, rationale: "The drug outperformed placebo in the trial  the question is about who the results apply to." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A state governor touted a 'welfare-to-work' programme's success, stating that 60% of participants were employed within six months of completing the programme. An independent evaluation revealed that the programme had strict eligibility requirements that excluded anyone with a criminal record, a disability, or fewer than two years of prior work experience  effectively screening in only the most employable candidates. In a comparison group of similarly qualified people who did not participate, 55% found jobs within six months without any programme assistance.",
    question: "What does the comparison group data reveal about the programme's actual effectiveness?",
    answerOptions: [
      { text: "The programme is completely useless and should be shut down.", isCorrect: false, rationale: "A 5-percentage-point benefit may or may not justify the programme's cost  'completely useless' overstates the finding." },
      { text: "The programme's apparent 60% success rate is largely a product of selecting participants who were already likely to find jobs  the 5-percentage-point difference over the comparison group suggests the programme itself added minimal value beyond what participants' existing qualifications would have achieved.", isCorrect: true, rationale: "Screening in only the most employable people guaranteed a high baseline success rate. The true programme effect is the difference: 60% minus 55%, which is modest." },
      { text: "Criminal records don't affect employment.", isCorrect: false, rationale: "The passage implies the opposite  people with records were excluded precisely because they're harder to place." },
      { text: "All welfare programmes should have strict eligibility rules.", isCorrect: false, rationale: "The evaluation critiques the eligibility rules for inflating success metrics, not advocating for them." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "A nutritionist on a morning talk show said that coconut oil was 'the healthiest fat on Earth,' citing a study from a Southeast Asian university showing that populations in the Pacific Islands that consumed large amounts of coconut had low rates of heart disease. A cardiologist rebutted that the Pacific Island study did not control for the populations' high fish intake, low processed-food consumption, and high physical activity levels  all independently associated with heart health. The cardiologist also noted that the American Heart Association, after reviewing all available evidence, had advised against coconut oil due to its high saturated fat content.",
    question: "Which of the cardiologist's responses most effectively undermines the nutritionist's specific evidence?",
    answerOptions: [
      { text: "The American Heart Association's recommendation against coconut oil.", isCorrect: false, rationale: "The AHA recommendation is an appeal to authority  useful but less analytically precise than identifying the study's confounders." },
      { text: "Identifying the uncontrolled variables  fish intake, low processed-food consumption, and high physical activity  that could independently explain the Pacific Islanders' heart health, meaning the coconut consumption was never isolated as the cause.", isCorrect: true, rationale: "The nutritionist attributed heart health to coconut oil. The cardiologist shows the study failed to control for other protective factors, undermining the causal link between coconut and heart health specifically." },
      { text: "Saturated fat is always dangerous.", isCorrect: false, rationale: "This is a broad claim  the question asks about which rebuttal targets the nutritionist's specific evidence most effectively." },
      { text: "Morning talk shows are unreliable sources of health information.", isCorrect: false, rationale: "Criticising the platform doesn't address the evidence cited." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A senator argued for expanding a federal jobs programme to rural areas, citing the programme's strong results in urban centres where unemployment dropped 8 percentage points in pilot cities. An economist cautioned that rural areas have fundamentally different labour markets: fewer employers, longer commute distances, less public transit, and seasonal agricultural cycles. She noted that a similar urban-to-rural transfer of a housing programme in 2015 had achieved only a quarter of its urban success rate because the rural conditions were too different from the design assumptions.",
    question: "What reasoning principle does the economist use to question the programme expansion?",
    answerOptions: [
      { text: "Urban programmes are always superior to rural programmes.", isCorrect: false, rationale: "The economist doesn't rank programme quality by geography  she argues that context determines outcomes." },
      { text: "Historical precedent  a similar cross-context transfer failed, and the structural differences between urban and rural labour markets suggest the conditions that produced urban success don't exist in rural areas, making the 8-point result unlikely to transfer.", isCorrect: true, rationale: "The economist combines two lines of evidence: structural analysis of why rural markets differ and a historical case of cross-context policy failure, building a strong argument against assuming transferability." },
      { text: "The senator doesn't care about rural communities.", isCorrect: false, rationale: "The senator is proposing expansion to rural areas, suggesting the opposite." },
      { text: "Unemployment statistics are unreliable.", isCorrect: false, rationale: "The economist accepts the urban statistics  she questions their applicability elsewhere." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A school district claimed that its new reading programme raised third-grade reading scores by 12 points over two years. A researcher analysed the district's data and discovered that during the same two years, the district reclassified a significant number of struggling readers as special education students, effectively moving them into a different testing pool. The remaining students  those still in the general testing population  were, on average, already stronger readers. The researcher also found that neighbouring districts using different programmes saw 9-point increases over the same period.",
    question: "How do the researcher's two findings work together to challenge the district's claim?",
    answerOptions: [
      { text: "They prove the reading programme made students worse at reading.", isCorrect: false, rationale: "The findings suggest the improvement was inflated, not that students got worse." },
      { text: "The reclassification shows the score gains partly reflect a change in who was being measured rather than genuine improvement, and the 9-point regional comparison shows that most of the remaining gain could be attributed to broader trends  leaving little if any unique credit to the new programme.", isCorrect: true, rationale: "Finding 1: the tested group got artificially stronger by removing weak readers. Finding 2: the regional baseline explains most of the remaining gain. Together, they leave the programme with almost no unique contribution." },
      { text: "Special education students should not be tested separately.", isCorrect: false, rationale: "This may be a policy concern but doesn't address the evidence question." },
      { text: "Neighbouring districts always outperform this district.", isCorrect: false, rationale: "The neighbouring districts actually scored lower (9 points vs 12), but that comparison reveals the district's extra 3 points came from reclassification, not programme effectiveness." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A car manufacturer's advertisement claimed its new SUV was 'the safest vehicle in its class,' citing a five-star crash test rating from a federal safety agency. A consumer advocacy group noted that the five-star rating applied only to frontal and side crash tests conducted under laboratory conditions. The SUV had received only three stars for rollover resistance  the category most relevant to SUVs  and the manufacturer had lobbied successfully to exclude rollover ratings from the prominently displayed overall rating system.",
    question: "What evidence strategy did the manufacturer use to support its 'safest' claim?",
    answerOptions: [
      { text: "The manufacturer invented fake safety ratings.", isCorrect: false, rationale: "The five-star frontal/side ratings are real  the deception is in which ratings are highlighted and which are hidden." },
      { text: "The manufacturer selectively highlighted favourable ratings while suppressing the most relevant unfavourable one  and actively worked to change the rating system to hide the SUV's weakness in the category most important for its vehicle type.", isCorrect: true, rationale: "This is cherry-picking combined with systemic manipulation: emphasising strengths, hiding weaknesses, and changing the framework so the weakness doesn't appear in the headline number." },
      { text: "Crash tests are unreliable measures of vehicle safety.", isCorrect: false, rationale: "The consumer group relies on crash test data too  their point is about which tests matter most." },
      { text: "All SUVs are equally unsafe.", isCorrect: false, rationale: "The three-star rollover rating suggests this SUV has a specific weakness, not that all SUVs are equally poor." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A politician argued that immigration increases crime, citing FBI data showing that cities with larger immigrant populations had higher total crime numbers. A criminologist responded with per-capita analysis showing that immigrants committed crimes at lower rates than native-born citizens. The criminologist also noted that large immigrant populations tend to settle in large cities, and large cities have more total crime than small towns regardless of immigration  the politician's correlation reflected city size, not immigration effects.",
    question: "What two statistical errors does the criminologist identify in the politician's argument?",
    answerOptions: [
      { text: "The FBI's data is unreliable and immigrants never commit crimes.", isCorrect: false, rationale: "The criminologist doesn't question data reliability or claim zero immigrant crime  they reframe the data correctly." },
      { text: "First, using total crime numbers instead of per-capita rates ignores that larger populations naturally produce more total incidents; second, the correlation between immigrant populations and total crime is confounded by city size, which independently predicts both variables.", isCorrect: true, rationale: "Error 1: absolute numbers vs. rates. Error 2: confounding variable (city size correlates with both immigration and total crime). Both errors make a spurious correlation appear causal." },
      { text: "Crime statistics should not be used in policy debates.", isCorrect: false, rationale: "The criminologist uses the same statistics more accurately  they don't reject the data, they reject the analysis." },
      { text: "Small towns have more crime per capita than large cities.", isCorrect: false, rationale: "The passage says large cities have more total crime  per-capita comparisons by city size aren't addressed." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A tech CEO told shareholders that the company's AI hiring tool had eliminated bias from recruitment, pointing to data showing equal interview rates across racial groups. An investigative journalist obtained internal documents revealing that the tool achieved racial parity in interviews by lowering qualification thresholds for underrepresented groups rather than evaluating all candidates by the same standard. The journalist also found that offer rates after interviews still showed significant racial disparities  the tool equalised only one visible metric while leaving the underlying decision-making patterns untouched.",
    question: "How does the journalist's investigation reframe the CEO's 'equal interview rates' evidence?",
    answerOptions: [
      { text: "The AI tool is more racist than human recruiters.", isCorrect: false, rationale: "The journalist's evidence shows the tool manipulated inputs rather than removing bias  but doesn't compare it to human outcomes." },
      { text: "The equal interview rate was manufactured by changing standards rather than removing bias  and the persistent offer-rate disparities reveal that the appearance of fairness at one stage masked continuing discrimination at the decisive stage where hiring decisions are actually made.", isCorrect: true, rationale: "Two revelations: (1) the mechanism (different thresholds) undermines the equality claim, and (2) the downstream data (offer rates) shows the bias simply moved to a less visible stage." },
      { text: "AI should never be used in hiring.", isCorrect: false, rationale: "The journalist critiques this specific tool's design and the CEO's claims  not all AI hiring tools." },
      { text: "Interview rates are the best measure of hiring fairness.", isCorrect: false, rationale: "The entire investigation demonstrates that interview rates alone are insufficient  offer rates and threshold standards matter too." },
    ],
    challenge_tags: ['rla-2'],
  },
];
