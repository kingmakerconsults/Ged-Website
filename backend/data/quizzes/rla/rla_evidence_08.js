// Evidence & Argumentation — Test Ready: Practice 8
// 11 questions | multi-source reasoning, fallacy ID
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A 2023 report from the Urban Institute found that cities with mandatory inclusionary zoning (IZ) policies — requiring developers to set aside 10–20% of new units as affordable — produced 14% more affordable housing units per year than comparable cities without IZ. However, the same report noted that total housing construction in IZ cities was 8% lower than in non-IZ cities, suggesting that the mandate may have slowed overall building.",
    question: "Which statement accurately reflects what both findings together imply about inclusionary zoning?",
    answerOptions: [
      { text: "IZ is an unqualified success because it creates more affordable units.", isCorrect: false, rationale: "The report also shows total construction fell 8%, which complicates that conclusion." },
      { text: "IZ produces more affordable units per year but may reduce total housing supply, presenting a trade-off policymakers must weigh.", isCorrect: true, rationale: "Both findings are real — more affordable units AND less overall building. A trade-off framing is accurate." },
      { text: "IZ policies should be eliminated because they slow construction.", isCorrect: false, rationale: "The data shows a cost–benefit situation, not a clear case for elimination." },
      { text: "Cities without IZ produce better housing outcomes overall.", isCorrect: false, rationale: "They build more total units but fewer affordable ones — 'better overall' depends on which outcome you prioritise." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'medium',
    passage: "A state senator argues: 'My opponent voted against the Veterans' Support Act two years ago. He clearly doesn't care about veterans.' The opponent responds: 'I voted against that bill because it included a provision directing funds away from mental health programmes — programmes veterans use most. I have consistently funded veterans' healthcare for 12 years.'",
    question: "How does the opponent's response address the senator's claim most effectively?",
    answerOptions: [
      { text: "By arguing that veterans don't need the act.", isCorrect: false, rationale: "The opponent doesn't make this claim." },
      { text: "By providing context that reframes the vote as supporting veterans — just not that specific act — and citing a 12-year record.", isCorrect: true, rationale: "The vote detail explains why opposition to the bill was pro-veteran, and the 12-year record rebuts the character claim." },
      { text: "By attacking the senator's own voting record.", isCorrect: false, rationale: "The opponent doesn't counter-attack — they defend and reframe." },
      { text: "By agreeing with the senator's characterisation.", isCorrect: false, rationale: "The opponent explicitly denies it." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "The FDA approved a new antidepressant based on two clinical trials. Trial 1 (500 participants, 12 weeks): the drug reduced depression scores by 35% vs. 18% for placebo. Trial 2 (300 participants, 8 weeks): the drug reduced scores by 22% vs. 19% for placebo — a difference the researchers acknowledged was not statistically significant. The FDA issued approval based on Trial 1 alone.",
    question: "A critic who argues the FDA approval was premature would be MOST strengthened by pointing to:",
    answerOptions: [
      { text: "Trial 1's strong results.", isCorrect: false, rationale: "Trial 1 supports approval." },
      { text: "Trial 2's non-significant result — suggesting the drug may not reliably outperform placebo across different study conditions.", isCorrect: true, rationale: "A second trial failing to show significant benefit is a serious concern; using only Trial 1 may overstate reliability." },
      { text: "The fact that 500 participants is too small for any study.", isCorrect: false, rationale: "500 is a reasonable clinical trial size; this is not the strongest critique." },
      { text: "The FDA's general approval history.", isCorrect: false, rationale: "General history is not specific to this drug's evidence quality." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "Source A (economics professor): 'Free trade agreements create net economic gains by allowing specialisation and efficiencies. Independent analyses of NAFTA show U.S. GDP grew and consumer prices fell measurably in the 20 years following its implementation.'

Source B (manufacturing union leader): 'NAFTA cost 700,000 U.S. manufacturing jobs and hollowed out Midwestern industrial communities. The gains went to corporations and consumers; the losses were concentrated among workers without college degrees who had no equivalent job options.'",
    question: "Both sources could simultaneously be correct if:",
    answerOptions: [
      { text: "Free trade is always good for everyone.", isCorrect: false, rationale: "Source B contradicts this." },
      { text: "NAFTA produced aggregate economic growth while distributing its costs unequally — benefiting some groups while harming specific workers and communities.", isCorrect: true, rationale: "GDP growth (A) and job losses concentrated in specific groups (B) are not mutually exclusive — this is the standard economic explanation for free-trade distributional effects." },
      { text: "Manufacturing jobs are more important than GDP.", isCorrect: false, rationale: "This is a values statement, not a reconciliation of facts." },
      { text: "The union leader's data is more reliable because he represents workers directly.", isCorrect: false, rationale: "Proximity to a topic doesn't determine data reliability." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "An editorial board endorses a ballot measure to fund a new light rail line, arguing it will ease traffic, reduce emissions, and stimulate economic development along the route. A transit economist questions one premise: 'Light rail stimulates development only when there is already significant demand density. In low-density suburban corridors, multiple studies find that transit-oriented development rarely materialises without additional zoning changes and density incentives.'",
    question: "The economist is challenging the editorial board's argument on which grounds?",
    answerOptions: [
      { text: "Light rail is too expensive to build.", isCorrect: false, rationale: "Cost is not the economist's point." },
      { text: "The claim that economic development will follow light rail is conditional on density and zoning, which the editorial ignores.", isCorrect: true, rationale: "The economist identifies a hidden assumption — that development follows transit — and shows it only holds under specific conditions." },
      { text: "Traffic reduction from light rail has never been documented.", isCorrect: false, rationale: "The economist doesn't address traffic reduction claims." },
      { text: "Ballot measures are an inappropriate way to fund infrastructure.", isCorrect: false, rationale: "The economist's critique is about evidence, not process." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A food company advertises: 'Clinical studies show that people who eat our oat brand daily lost an average of 5 pounds over 12 weeks!' The fine print: participants also followed a 1,500-calorie-per-day diet plan provided by the study team and were monitored weekly by a dietitian.",
    question: "Why does the fine print undermine the advertisement's implied claim?",
    answerOptions: [
      { text: "The oat brand is not a real food.", isCorrect: false, rationale: "Whether the food is real is not the issue." },
      { text: "The weight loss likely results from the calorie-restricted diet and dietitian oversight, not specifically from eating the oat brand.", isCorrect: true, rationale: "Confounding conditions (calorie plan + professional monitoring) mean the oats cannot be isolated as the cause." },
      { text: "Twelve weeks is too long for a valid study.", isCorrect: false, rationale: "12 weeks is a standard timeframe for nutrition studies." },
      { text: "5 pounds of weight loss is unhealthy.", isCorrect: false, rationale: "5 pounds over 12 weeks is a moderate, medically accepted rate of weight loss." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "In a congressional hearing, a tech executive testifies: 'We should not be blamed for harmful content on our platform. We are just a platform, like the post office — we don't write the letters people send.' A senator responds: 'The post office does not algorithmically recommend letters to you, amplify the most outrage-inducing ones, and profit from the time those letters keep you engaged.'",
    question: "The senator's response works by:",
    answerOptions: [
      { text: "Agreeing that the tech company is like the post office.", isCorrect: false, rationale: "The senator explicitly rejects this analogy." },
      { text: "Disproving that harmful content exists on the platform.", isCorrect: false, rationale: "Content existence isn't the argument." },
      { text: "Identifying a false analogy — showing that the tech company, unlike a passive mail carrier, actively shapes and profits from content distribution.", isCorrect: true, rationale: "The senator dismantles the analogy by listing active interventions (algorithms, amplification, profit motive) that distinguish the tech company from a neutral carrier." },
      { text: "Arguing that the post office also causes harm.", isCorrect: false, rationale: "The senator isn't attacking the post office; they're defending why the comparison doesn't hold." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A public defender argues against mandatory minimum sentencing for non-violent drug offences: 'Studies show mandatory minimums have not deterred drug use, cost states an average of \$35,000 per inmate annually, and disproportionately impact communities of colour due to disparities in policing and charging decisions — a documented pattern in federal sentencing commissions' own data.'

A prosecutor responds: 'Dangerous criminals must face serious consequences. Without mandatory minimums, judges give criminals a pass, and crime rates soar.'",
    question: "Evaluate the prosecutor's response. Which weakness is most significant?",
    answerOptions: [
      { text: "The prosecutor does not mention the cost of incarceration.", isCorrect: false, rationale: "Omitting a cost argument isn't the primary logical flaw." },
      { text: "The prosecutor uses emotionally charged language ('dangerous criminals,' 'crime rates soar') without providing evidence to rebut the defender's specific data points.", isCorrect: true, rationale: "The defender cited studies and commission data; the prosecutor responds with generalisations and fear-based language rather than addressing the evidence." },
      { text: "The prosecutor is not a public defender and thus lacks standing to disagree.", isCorrect: false, rationale: "Professional role doesn't determine argument validity." },
      { text: "The prosecutor's point about crime rates is factually false.", isCorrect: false, rationale: "We can identify the logical weakness without declaring the claim factually false." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2025 policy analysis on universal basic income (UBI) pilots:

'In a two-year UBI pilot in Stockton, California, recipients who received \$500/month showed a 40% increase in full-time employment compared to the control group. Reported mental health improved significantly, and recipients were more likely to pursue education or job training. Critics note the pilot involved only 125 participants and required external philanthropic funding — making scalability to a national programme unclear.'",
    question: "A senator uses the Stockton data to argue for a national UBI programme. Which additional evidence would most strengthen that argument?",
    answerOptions: [
      { text: "Evidence that Stockton is a wealthy city with low unemployment.", isCorrect: false, rationale: "If Stockton is already prosperous, it would make the results harder to generalise to struggling areas — this would weaken, not strengthen, the argument." },
      { text: "Larger-scale pilots from multiple regions and income levels showing similar employment and health outcomes, with analysis of the fiscal model for national funding.", isCorrect: true, rationale: "The two main critiques are small sample size and funding scalability — this addresses both." },
      { text: "Personal testimonials from Stockton participants.", isCorrect: false, rationale: "Anecdotes don't address the scale or funding critiques." },
      { text: "Evidence that \$500/month is too low, so a higher amount should be tested.", isCorrect: false, rationale: "This introduces a new version of the programme rather than strengthening the existing evidence." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "An opponent of a proposed carbon tax argues: 'This tax is bad — it punishes working families who have to drive to work. And besides, China emits more carbon than we do, so American reductions won't solve the problem anyway.'

Identify the logical fallacy used in the second part of the argument ('China emits more…').",
    question: "Which fallacy is used?",
    answerOptions: [
      { text: "Ad hominem — attacking the character of the tax's sponsors.", isCorrect: false, rationale: "Ad hominem attacks a person, not a competing action by another country." },
      { text: "Tu quoque (appeal to hypocrisy) — arguing that America need not act because another party also causes the problem.", isCorrect: true, rationale: "Pointing to China's emissions to excuse American inaction is a classic tu quoque fallacy — 'you/they do it too.'" },
      { text: "False dilemma — suggesting there are only two options.", isCorrect: false, rationale: "No two-choice framing is presented here." },
      { text: "Hasty generalisation — drawing a broad conclusion from limited evidence.", isCorrect: false, rationale: "The argument isn't a generalisation; it's a deflection." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 11, type: 'multipleChoice', difficulty: 'hard',
    passage: "Passage A: A school board member argues that banning cellphones in classrooms improves academic focus and test scores, citing a London School of Economics study showing a 6.4% improvement in test scores in schools that banned phones.

Passage B: An education technology researcher argues that smartphones, when used with structured teacher guidance, improve research skills, engagement, and equity — allowing students without home computers to access academic resources.",
    question: "A student writing a balanced analysis of both passages should acknowledge that:",
    answerOptions: [
      { text: "Passage B proves Passage A's study is wrong.", isCorrect: false, rationale: "They don't address the same conditions — one is about unstructured phone use, the other about guided use." },
      { text: "The two passages may not be contradictory — Passage A concerns unguided phone use as a distraction, while Passage B concerns structured, teacher-directed use as a tool.", isCorrect: true, rationale: "Context matters: the LSE study likely measures distraction in unguided settings, while the researcher describes intentional use — different scenarios." },
      { text: "Both passages agree that phones improve test scores.", isCorrect: false, rationale: "Passage A specifically found improved scores after a phone BAN." },
      { text: "Technology should be banned from all schools.", isCorrect: false, rationale: "This goes beyond what either passage argues." },
    ],
    challenge_tags: ['rla-2'],
  },
];