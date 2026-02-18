// Evidence & Argumentation — Test Ready: Practice 7
// 11 questions | paired sources, logical fallacies, multi-step evidence chains
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A state legislator proposes mandatory financial literacy courses in high schools, citing a Federal Reserve survey showing that 40% of American adults cannot cover a \$400 emergency without borrowing or selling something. She argues, 'If we teach students budgeting and saving, we will eliminate financial insecurity in a generation.'

An opponent responds: 'Financial insecurity is caused primarily by low wages and economic inequality, not by lack of knowledge. Studies show that financial literacy courses have modest, short-term effects on behaviour and that knowledge alone does not overcome structural economic barriers.'",
    question: "The opponent's argument rests primarily on which of the following claims?",
    answerOptions: [
      { text: "Financial literacy courses are too expensive to implement.", isCorrect: false, rationale: "Cost is not raised." },
      { text: "The root cause of financial insecurity is structural (low wages, inequality) rather than informational (lack of knowledge).", isCorrect: true, rationale: "The opponent's core argument is that the legislator misidentifies the cause." },
      { text: "The Federal Reserve survey is inaccurate.", isCorrect: false, rationale: "The survey accuracy is not challenged." },
      { text: "High school students are too young to learn financial concepts.", isCorrect: false, rationale: "Age is not mentioned." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'medium',
    passage: "Same passages as question 1.",
    question: "Which evidence would most strengthen the legislator's argument?",
    answerOptions: [
      { text: "Evidence that wages have fallen in real terms over the past decade.", isCorrect: false, rationale: "This supports the opponent's structural argument." },
      { text: "A longitudinal study showing students who took financial literacy courses were 40% less likely to carry credit card debt 10 years later.", isCorrect: true, rationale: "Long-term behaviour change directly supports the claim that financial education improves financial outcomes." },
      { text: "Data showing that 40% of adults also lack general numeracy skills.", isCorrect: false, rationale: "This doesn't directly connect financial literacy education to better outcomes." },
      { text: "Evidence that financial literacy is taught in private schools.", isCorrect: false, rationale: "Where it's taught doesn't show it works." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "In a letter to shareholders, a technology CEO writes: 'Our company invested \$500 million in artificial intelligence research last year. We are confident this will lead to breakthrough products. After all, our last major investment — in cloud computing in 2012 — yielded returns of 400% over five years. AI is the cloud computing of our era.'
",
    question: "The CEO uses an analogy comparing AI to cloud computing. What is the primary logical risk of this type of argument?",
    answerOptions: [
      { text: "The analogy proves the investment will fail.", isCorrect: false, rationale: "An analogy alone cannot prove success or failure." },
      { text: "The two technologies may differ in ways that make the past outcome a poor predictor of future results.", isCorrect: true, rationale: "Analogical reasoning breaks down when the compared situations differ significantly in relevant ways." },
      { text: "Cloud computing is not relevant to the technology sector.", isCorrect: false, rationale: "Cloud computing is clearly relevant — the comparison lacks merit for other reasons." },
      { text: "The CEO should not disclose investment figures.", isCorrect: false, rationale: "Disclosure is a legal and governance matter, not a logical error." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "Excerpt from a public health report: 'Our city's opioid overdose death rate fell by 22% in the year following the opening of a supervised consumption facility (SCF). In the five neighbouring communities without SCFs, the overdose rate rose an average of 8% in the same period.'

A city council member states: 'The SCF clearly caused the drop in overdose deaths.'",
    question: "What would a researcher need to know before agreeing that the SCF CAUSED the reduction?",
    answerOptions: [
      { text: "Whether the SCF is publicly or privately funded.", isCorrect: false, rationale: "Funding source does not affect the causal question." },
      { text: "Whether other interventions (law enforcement changes, naloxone distribution, etc.) also changed in the city during the same period.", isCorrect: true, rationale: "Without ruling out confounding variables, the decline cannot be attributed solely to the SCF." },
      { text: "How many people used the SCF in the first year.", isCorrect: false, rationale: "Usage volume is relevant to scale but doesn't resolve whether the SCF caused the reduction." },
      { text: "Whether the council member supports the SCF programme.", isCorrect: false, rationale: "The council member's political position does not affect the causal analysis." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a debate on extending daylight saving time year-round:

Source A (Retail Association): 'Extending daylight saving time increases consumer spending. Studies show shoppers spend more when they can shop after work in daylight — and America's economy is 70% driven by consumer spending.'

Source B (Sleep Medicine Association): 'Permanent daylight saving time means darker mornings year-round. Sleep scientists have documented increased cardiovascular events, traffic accidents, and workplace injuries in the weeks following the spring clock change, when people lose one hour of sleep. A permanent shift creates a chronic, year-round misalignment with the body's natural light-dark cycle in winter months.'",
    question: "Which statement best reconciles both sources for a policymaker?",
    answerOptions: [
      { text: "The economic benefit outweighs the health risk, so the policy should pass.", isCorrect: false, rationale: "This is a value judgement, not a reconciliation of evidence." },
      { text: "Permanent daylight saving time may boost consumer spending but may also create year-round health risks. Policymakers must weigh economic benefits against public health costs.", isCorrect: true, rationale: "Accurately captures what each source establishes and frames the decision correctly as a trade-off." },
      { text: "Source B disproves Source A because health is more important than shopping.", isCorrect: false, rationale: "Health importance is a value judgement; the sources address different domains and neither disproves the other." },
      { text: "Both sources support extending daylight saving time.", isCorrect: false, rationale: "Source B argues against the change on health grounds." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a policy brief on urban tree canopy:

'Cities that increased tree canopy cover by 10% or more over a decade saw average summer temperatures fall by 1.5°C in dense urban areas compared to cities with stagnant or declining canopy. Tree canopy also reduced stormwater runoff ey 18%–25% in study areas and was associated with lower rates of respiratory illness in children. However, tree-planting programmes historically have been concentrated in wealthier neighbourhoods, reinforcing environmental inequity.'",
    question: "A journalist writes: 'Urban trees solve the problem of climate change in cities.' What is wrong with this conclusion?",
    answerOptions: [
      { text: "Trees do not reduce temperatures.", isCorrect: false, rationale: "The report says they do reduce temperatures." },
      { text: "The report shows trees provide local benefits (lower temperatures, less runoff, better health) but 'solving climate change' overstates localised mitigation as a global-scale solution.", isCorrect: true, rationale: "Local temperature reductions and runoff improvements are not equivalent to solving climate change, which is a global systemic problem." },
      { text: "The journalist should only write about wealthy neighbourhoods.", isCorrect: false, rationale: "Irrelevant to the logical flaw in the conclusion." },
      { text: "The report doesn't mention climate change, so journalism about it is inappropriate.", isCorrect: false, rationale: "The report discusses related urban heat and runoff issues; journalism drawing connections is appropriate if done accurately." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "An advocacy group argues that social media companies should be legally liable for the spread of health misinformation on their platforms. They cite data showing a measurable rise in vaccine hesitancy correlating with exposure to anti-vaccine content online. A First Amendment scholar responds that imposing liability would incentivise over-censorship, chilling legitimate speech and making platforms risk-averse about any health-related discussion.",
    question: "The First Amendment scholar's argument introduces which type of concern?",
    answerOptions: [
      { text: "An empirical claim about vaccine hesitancy.", isCorrect: false, rationale: "The scholar does not dispute the vaccine hesitancy data." },
      { text: "A slippery slope concern — that the intended remedy could cause a disproportionate secondary harm (suppression of legitimate speech).", isCorrect: true, rationale: "The scholar argues liability for misinformation will lead to over-censoring of all health speech — a slippery slope argument." },
      { text: "A claim that misinformation is not widespread.", isCorrect: false, rationale: "The scholar does not dispute the prevalence of misinformation." },
      { text: "An economic argument about the cost of litigation.", isCorrect: false, rationale: "Litigation cost is not mentioned." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "Passage A — Public health official: 'The mask mandate in our county during the respiratory virus season resulted in a 35% decline in hospitalizations compared to the prior year.'

Passage B — County commissioner: 'Neighbouring counties without mask mandates also saw hospitalizations decline — by 28% — because the entire region experienced the same mild virus season this year.'",
    question: "The commissioner's evidence is most useful to someone who wants to argue that:",
    answerOptions: [
      { text: "Mask mandates should be permanent.", isCorrect: false, rationale: "The commissioner's evidence undermines, not supports, mask mandate effectiveness." },
      { text: "The mask mandate may not have caused the hospitalisation decline, since unmasked counties also improved.", isCorrect: true, rationale: "A confounding factor — a milder regional virus season — makes attribution of the decline to masking uncertain." },
      { text: "The mask mandate harmed hospitalisation rates.", isCorrect: false, rationale: "The mandate county improved more — the commissioner just argues the improvement may not be caused by masks." },
      { text: "Neighbouring counties are more health-conscious than the mandate county.", isCorrect: false, rationale: "No data supports this conclusion." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A government official argues that expanding highway capacity by adding lanes will reduce traffic congestion: 'Wide highways move more cars faster.' Transportation researchers have documented a phenomenon called 'induced demand': when highway capacity increases, more people choose to drive rather than use transit or carpool, eventually filling the new capacity and restoring previous congestion levels. Multiple studies find that after expansion, long-term congestion returns to pre-expansion levels within 5–10 years.",
    question: "The induced-demand research most directly challenges which assumption in the official's argument?",
    answerOptions: [
      { text: "That wider highways cost more to build.", isCorrect: false, rationale: "Cost is not the assumption being challenged." },
      { text: "That adding lane capacity will result in lasting congestion reduction, when in fact it may generate sufficient additional demand to offset the capacity gain.", isCorrect: true, rationale: "The official assumes supply (lanes) reduces congestion; induced demand research shows new supply generates new demand, neutralising the benefit." },
      { text: "That cars are the dominant form of transport.", isCorrect: false, rationale: "The demand research doesn't challenge the role of cars; it describes how more cars appear when lanes are added." },
      { text: "That public transit is always better than driving.", isCorrect: false, rationale: "This is a different argument not advanced by the research cited." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From two op-eds on prison recidivism:

Op-Ed A: 'Mandatory minimum sentencing has increased the prison population and done little to deter crime. A 2020 Sentencing Commission report found that offenders subject to mandatory minimums had similar recidivism rates to those who received discretionary sentences.'

Op-Ed B: 'Reducing mandatory minimums is naive. When we lowered sentences in the 1970s, crime rates rose dramatically in urban areas. We cannot gamble with public safety.'",
    question: "Which response would most effectively challenge Op-Ed B's historical argument?",
    answerOptions: [
      { text: "A list of countries that have no mandatory minimums.", isCorrect: false, rationale: "International comparison alone doesn't address the US 1970s claim directly." },
      { text: "Evidence that crime rates in the 1970s rose due to economic factors, demographic shifts, and police underfunding — not sentence reductions.", isCorrect: true, rationale: "This directly challenges Op-Ed B's causal claim that lower sentences caused 1970s crime increases by providing alternative explanations." },
      { text: "Op-Ed A's 2020 Sentencing Commission data.", isCorrect: false, rationale: "This addresses recidivism, not the 1970s-era decline in sentencing that Op-Ed B raises." },
      { text: "An argument that all crime is economically motivated.", isCorrect: false, rationale: "This is too broad and unverified — and doesn't specifically refute the 1970s claim." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 11, type: 'multipleChoice', difficulty: 'hard',
    passage: "A nutritionist writes: 'People who eat breakfast daily are 20% less likely to be overweight than those who skip breakfast, according to our survey of 2,000 adults. Therefore, eating breakfast prevents obesity.'

A statistician responds that the conclusion does not follow from the data.",
    question: "Which of the following best explains why the statistician is correct?",
    answerOptions: [
      { text: "The sample of 2,000 is too small to draw any conclusion.", isCorrect: false, rationale: "2,000 is a reasonable survey sample size." },
      { text: "The correlation between breakfast eating and lower weight does not establish that breakfast prevents obesity — other factors could explain both habits.", isCorrect: true, rationale: "People who eat breakfast may also exercise more, have more structured routines, or better access to food — correlation does not equal causation." },
      { text: "Nutritionists cannot conduct surveys.", isCorrect: false, rationale: "Professional qualifications aren't the issue." },
      { text: "The 20% figure is not statistically significant.", isCorrect: false, rationale: "Statistical significance isn't addressed in the passage and cannot be assumed." },
    ],
    challenge_tags: ['rla-2'],
  },
];