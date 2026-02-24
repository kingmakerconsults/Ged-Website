// Reading Comprehension  Test Ready: Textual Evidence  Practice 9
// 10 questions | synthesising multiple sources, evaluating evidence hierarchies, detecting logical gaps
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A state legislator introduced a bill to require financial literacy courses in all high schools, citing a survey showing that 78% of adults wished they had learned about budgeting, credit, and investing in school. A policy analyst responded that wish-based surveys measure regret, not educational outcomes, and presented data from three states that had already mandated financial literacy courses. In those states, credit scores and savings rates among graduates showed no statistically significant improvement compared to graduates from states without the mandate.",
    question: "Why does the policy analyst consider the three-state outcome data stronger evidence than the survey?",
    answerOptions: [
      { text: "The analyst does not believe adults' opinions matter.", isCorrect: false, rationale: "The analyst acknowledges the wish  she distinguishes between wanting something and demonstrating that providing it changes outcomes." },
      { text: "The survey captures what adults feel they missed, but the three-state data captures what actually happened when the proposed intervention was implemented  and the lack of improvement in measurable financial behaviours suggests the courses may not achieve the legislator's goals.", isCorrect: true, rationale: "Outcome data from real implementations tests the causal theory: does the course improve financial behaviour? The survey only shows demand exists. The two pieces of evidence answer entirely different questions." },
      { text: "Credit scores are a perfect measure of financial literacy.", isCorrect: false, rationale: "Credit scores are imperfect but still more outcome-relevant than a wish survey." },
      { text: "Financial literacy cannot be taught.", isCorrect: false, rationale: "The data suggests the current course format may not work  not that financial literacy is unteachable." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "A veteran journalist wrote an op-ed arguing that local newspapers were essential to democracy, noting that towns losing their newspapers experienced a 20% increase in government borrowing costs because, without press scrutiny, municipal bond investors perceived higher corruption risk. A media economics professor confirmed the bond-cost finding but added that the same towns also experienced a 15% decline in voter turnout and a 30% decline in the number of candidates running for local office  effects the journalist had not mentioned.",
    question: "Does the professor's additional evidence strengthen or weaken the journalist's argument?",
    answerOptions: [
      { text: "Weaken it, because the professor contradicts the journalist.", isCorrect: false, rationale: "The professor confirms the journalist's evidence and adds to it  no contradiction exists." },
      { text: "Strengthen it  the additional findings about voter turnout and candidate numbers show the consequences of newspaper loss extend far beyond borrowing costs into democratic participation itself, making the journalist's core argument stronger with broader evidence than even the journalist provided.", isCorrect: true, rationale: "The professor doesn't dispute the journalist  she expands the evidence base. If losing newspapers raises borrowing costs AND reduces turnout AND reduces candidates, the democracy argument has three pillars instead of one." },
      { text: "Neither  they're discussing different topics.", isCorrect: false, rationale: "Both discuss consequences of newspaper closures on democratic governance." },
      { text: "Weaken it, because the journalist should have included all data.", isCorrect: false, rationale: "Incomplete evidence is a mild criticism of the op-ed's thoroughness, not a weakening of the core argument." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A district attorney announced that a new predictive policing algorithm had reduced burglaries by 18% in targeted neighbourhoods. Civil liberties advocates obtained the underlying data and found that the algorithm directed officers disproportionately to low-income, predominantly minority neighbourhoods  the same areas that had been heavily policed before the algorithm existed. The advocates argued that the 'predictions' simply replicated historical policing patterns, and that burglary reports in untargeted neighbourhoods had gone unrecorded because fewer officers were present to take reports.",
    question: "What two related problems do the civil liberties advocates identify in the algorithm's evidence?",
    answerOptions: [
      { text: "The algorithm is too expensive and too complicated.", isCorrect: false, rationale: "The advocates' concern is about bias and measurement, not cost or complexity." },
      { text: "First, the algorithm's predictions are circular  it sends officers to the same places that generated the historical crime data it was trained on, ensuring it 'predicts' what it already assumes. Second, the apparent reduction in untargeted areas may partly reflect underreporting, not actual crime reduction, because fewer officers means fewer reports filed.", isCorrect: true, rationale: "Problem 1: feedback loop bias (past policing  data  predictions  same policing). Problem 2: measurement bias (fewer officers  fewer reports  fewer crimes). Together they undermine both the algorithm's predictions and the claimed 18% reduction." },
      { text: "Algorithms should never be used in law enforcement.", isCorrect: false, rationale: "The advocates identify specific flaws in this algorithm  they may or may not oppose all algorithmic policing." },
      { text: "The district attorney fabricated the 18% figure.", isCorrect: false, rationale: "The advocates explain why the 18% may be an artefact of measurement and deployment bias, not fabrication." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A pharmaceutical company published a meta-analysis of 12 trials concluding its antidepressant was effective. A medical journal investigation found that of 12 company-sponsored trials for the drug, 8 showed positive results and 4 showed no benefit. All 8 positive trials were published; only 1 of the 4 negative trials appeared in a journal. The meta-analysis included only published trials. When the investigation included the unpublished data, the drug's effectiveness dropped below clinical significance.",
    question: "What is the term for the bias the investigation uncovered, and how did it distort the meta-analysis?",
    answerOptions: [
      { text: "Confirmation bias  researchers only believed the positive results.", isCorrect: false, rationale: "The bias occurs at the publication level, not the belief level  negative results were suppressed, not disbelieved." },
      { text: "Publication bias  selectively publishing positive trials while burying negative ones meant the meta-analysis drew from a systematically unrepresentative sample of evidence, inflating the drug's apparent effectiveness. Including all trials erased the benefit.", isCorrect: true, rationale: "When only positive results get published, any review of published literature will overestimate treatment effects. The 'file drawer problem'  negative results sitting unpublished  created an evidence base that was 8 wins out of 9 published studies instead of 8 out of 12 total." },
      { text: "The drug is dangerous and should be recalled.", isCorrect: false, rationale: "The concern is about efficacy evidence, not safety. A drug that doesn't work well isn't necessarily dangerous." },
      { text: "Meta-analyses are always unreliable.", isCorrect: false, rationale: "Meta-analyses are stronger than single studies  but only when they include all relevant evidence, which this one did not." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "A tech company announced that remote employees were '13% more productive' than in-office peers, citing an internal metric that counted lines of code written per day. A management consultant noted that lines of code is a notoriously poor productivity measure  developers can inflate it by writing verbose code, and high-quality work often involves deleting code rather than adding it. She also pointed out that the company's remote workers were senior engineers who chose remote arrangements, while in-office workers included many junior hires  making the groups incomparable.",
    question: "The consultant identifies problems at two distinct levels of the company's evidence. What are they?",
    answerOptions: [
      { text: "The measurement is bad and the sample is too small.", isCorrect: false, rationale: "The consultant questions measurement validity and group comparability  sample size isn't mentioned." },
      { text: "At the measurement level, lines of code is a flawed proxy for productivity that can be gamed and doesn't capture code quality. At the comparison level, the remote and in-office groups differ in seniority and self-selection, making any difference attributable to who the workers are rather than where they work.", isCorrect: true, rationale: "Even if lines of code were a valid metric, comparing senior self-selected remote workers to junior office workers would be unfair. And even if the groups were comparable, lines of code wouldn't capture real productivity. Both flaws must be fixed." },
      { text: "Remote work is always less productive than office work.", isCorrect: false, rationale: "The consultant doesn't argue against remote work  she argues against the company's evidence for it." },
      { text: "Only managers should evaluate productivity.", isCorrect: false, rationale: "The critique is about metrics and comparison groups, not who evaluates." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A governor claimed that building a new highway would create 25,000 jobs, citing the state transportation department's economic impact study. An economist noted that the study counted 'job-years' rather than permanent jobs  meaning one worker employed for one year counted as one 'job,' so 5,000 workers employed for five years of construction equalled '25,000 jobs.' After construction ended, the permanent jobs associated with the highway  maintenance, toll collection, rest stop operations  totalled approximately 800.",
    question: "How does the distinction between 'job-years' and 'permanent jobs' affect the governor's claim?",
    answerOptions: [
      { text: "The governor's number is mathematically correct, so the claim is honest.", isCorrect: false, rationale: "Mathematical accuracy doesn't equal honest communication  '25,000 jobs' implies 25,000 people employed, not 5,000 people counted five times." },
      { text: "The job-years metric makes a temporary construction project sound like mass permanent employment  '25,000 jobs' leads the public to imagine 25,000 paycheques, when the reality is 5,000 temporary positions and 800 permanent ones. The metric inflates the economic benefit by a factor of more than 30 compared to lasting employment.", isCorrect: true, rationale: "Job-years is a legitimate economic concept, but presenting it as 'jobs' without qualification invites misunderstanding. The ratio of claimed (25,000) to lasting (800) jobs reveals how much the metric inflates perceived benefit." },
      { text: "All highway projects create the same number of jobs.", isCorrect: false, rationale: "Job creation varies by project  the issue is how this specific project's jobs are counted." },
      { text: "The highway should not be built.", isCorrect: false, rationale: "The economist questions the jobs claim, not necessarily the highway's merit." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "An organic farming advocacy group claimed that organic produce was nutritionally superior, citing a Stanford meta-analysis that reviewed 240 studies. A science journalist read the actual Stanford paper and found that its conclusion stated: 'The published literature lacks strong evidence that organic foods are significantly more nutritious than conventional alternatives.' The journalist noted that the advocacy group had cited a single table within the paper showing marginally higher phosphorus levels in organic produce while ignoring the paper's overall conclusion.",
    question: "What evidence manipulation technique did the advocacy group use?",
    answerOptions: [
      { text: "They fabricated the Stanford study.", isCorrect: false, rationale: "The study is real  the group cited real data from within it." },
      { text: "Cherry-picking  they extracted one favourable data point (phosphorus levels) from a study whose overall conclusion contradicted their claim, presenting a fragment of evidence as if it represented the whole, when the comprehensive review found no significant nutritional superiority.", isCorrect: true, rationale: "Cherry-picking involves citing carefully selected portions of evidence that support your position while omitting the broader context  especially when that context, like the paper's own summary, contradicts the claim." },
      { text: "Organic produce has no nutritional value.", isCorrect: false, rationale: "The Stanford study says organic produce is not significantly MORE nutritious  not that it lacks nutritional value." },
      { text: "Stanford is biased against organic farming.", isCorrect: false, rationale: "The advocacy group cited Stanford's own data positively  they can't also claim Stanford is biased against their position." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A retired general argued for increased military spending by citing that China's military budget had grown 7% annually for a decade. A defence policy analyst pointed out that China's published budget excluded major categories like military research, foreign weapons purchases, and paramilitary forces  estimated to add 40-60% to the official figure. However, the analyst also noted that the United States already spent more than the next nine countries combined, and that much of China's growth was absorbing rising personnel costs rather than expanding combat capability.",
    question: "How does the analyst both strengthen and complicate the general's concern?",
    answerOptions: [
      { text: "The analyst agrees with the general entirely.", isCorrect: false, rationale: "The analyst adds context that cuts both ways  partially confirming and partially complicating the concern." },
      { text: "The hidden spending categories mean China's real military budget is substantially larger than the published 7% growth suggests  strengthening the argument that China is investing heavily. But the U.S. spending dominance and China's personnel cost absorption complicate the threat narrative by showing the gap remains enormous and much of the growth isn't capability expansion.", isCorrect: true, rationale: "The analyst provides a more nuanced picture: yes, China spends more than officially stated (strengthening concern), but no, this doesn't necessarily close the massive gap with U.S. capabilities (complicating the urgency argument)." },
      { text: "Military budgets are meaningless.", isCorrect: false, rationale: "The analyst uses budget data extensively  they consider it meaningful but requiring careful interpretation." },
      { text: "The United States should cut its military budget.", isCorrect: false, rationale: "The analyst provides factual context  no policy recommendation is stated." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A school board member proposed eliminating librarian positions, arguing that students now access all information online. She cited circulation statistics showing a 60% decline in physical book checkouts over five years. The school librarian responded with data showing that while physical checkouts declined, total resource access  including database searches, e-book downloads, and research consultation appointments  had increased 40%. She added that 85% of teachers reported the librarian was essential for teaching students to evaluate online source credibility.",
    question: "Why is the librarian's evidence framework more comprehensive than the board member's?",
    answerOptions: [
      { text: "The librarian has a personal interest in keeping her job, so her data is biased.", isCorrect: false, rationale: "Personal interest doesn't invalidate data  the question asks about the evidence framework's comprehensiveness, not the presenter's motivation." },
      { text: "The board member measured the librarian's value using a single declining metric (physical checkouts) that captures only one traditional function, while the librarian presented the full scope of services  digital resource access, research support, and credibility instruction  showing the role evolved rather than became obsolete.", isCorrect: true, rationale: "Measuring a modern librarian by book checkouts alone is like measuring a modern phone by voice call minutes. The role has changed, and the evidence framework must capture the whole role to make an informed decision." },
      { text: "Digital resources are always better than physical books.", isCorrect: false, rationale: "The librarian doesn't argue digital vs. physical superiority  she shows both are part of the library's service." },
      { text: "All school board members are uninformed about education.", isCorrect: false, rationale: "The board member used incomplete evidence  that doesn't characterise all board members." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "An energy company opposed a proposed wind farm by funding a study showing that homes within one mile of wind turbines sold for 8-12% less than comparable homes farther away. An independent review of the study found that the researchers measured home prices only in the first two years after turbine installation, when novelty aversion was highest. Studies from Europe tracking prices over ten years showed the discount disappeared after 3-4 years as residents adapted. The review also noted that the energy company's primary business was natural gas  a direct competitor to wind energy.",
    question: "What three factors identified by the review weaken the energy company's study?",
    answerOptions: [
      { text: "The study used incorrect home prices, too many homes, and biased researchers.", isCorrect: false, rationale: "The review doesn't question the raw price data or sample size  it questions timeframe, external validity, and funder conflict." },
      { text: "First, the two-year window captured only the novelty-aversion period while missing the longer-term price recovery documented in European data. Second, cross-national evidence showing price recovery after 3-4 years suggests the short-term discount is temporary, not permanent. Third, the funder's direct financial interest in wind energy's failure creates a conflict of interest that may have influenced study design choices like the truncated timeframe.", isCorrect: true, rationale: "Timeframe bias (measuring during peak aversion), contradicting long-term evidence (European recovery data), and funder conflict (natural gas company funding anti-wind research) all independently weaken the study." },
      { text: "Wind energy is always better than natural gas.", isCorrect: false, rationale: "The review evaluates the study's credibility  it doesn't make broad energy-source comparisons." },
      { text: "Property values never change near wind farms.", isCorrect: false, rationale: "The review acknowledges a short-term decline  it argues the decline is temporary." },
    ],
    challenge_tags: ['rla-2'],
  },
];
