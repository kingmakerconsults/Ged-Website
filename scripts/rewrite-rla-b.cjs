/**
 * rewrite-rla-b.cjs  — RLA batch 2
 * evidence_08-10 (test-ready + challenge)
 * grammar_05-10 (core→challenge)
 * main_idea_05-11 (core→challenge)
 * Run: node scripts/rewrite-rla-b.cjs
 */

const fs = require('fs');
const path = require('path');
const RLA = path.join(__dirname, '../backend/data/quizzes/rla');
const write = (f, c) => {
  fs.writeFileSync(path.join(RLA, f), c.trim(), 'utf8');
  console.log('  ✓', f);
};

// ─── EVIDENCE 08  (Test Ready) ───────────────────────────────────────────────
write(
  'rla_evidence_08.js',
  `
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
    passage: "Source A (economics professor): 'Free trade agreements create net economic gains by allowing specialisation and efficiencies. Independent analyses of NAFTA show U.S. GDP grew and consumer prices fell measurably in the 20 years following its implementation.'\n\nSource B (manufacturing union leader): 'NAFTA cost 700,000 U.S. manufacturing jobs and hollowed out Midwestern industrial communities. The gains went to corporations and consumers; the losses were concentrated among workers without college degrees who had no equivalent job options.'",
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
    passage: "A public defender argues against mandatory minimum sentencing for non-violent drug offences: 'Studies show mandatory minimums have not deterred drug use, cost states an average of \\$35,000 per inmate annually, and disproportionately impact communities of colour due to disparities in policing and charging decisions — a documented pattern in federal sentencing commissions' own data.'\n\nA prosecutor responds: 'Dangerous criminals must face serious consequences. Without mandatory minimums, judges give criminals a pass, and crime rates soar.'",
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
    passage: "From a 2025 policy analysis on universal basic income (UBI) pilots:\n\n'In a two-year UBI pilot in Stockton, California, recipients who received \\$500/month showed a 40% increase in full-time employment compared to the control group. Reported mental health improved significantly, and recipients were more likely to pursue education or job training. Critics note the pilot involved only 125 participants and required external philanthropic funding — making scalability to a national programme unclear.'",
    question: "A senator uses the Stockton data to argue for a national UBI programme. Which additional evidence would most strengthen that argument?",
    answerOptions: [
      { text: "Evidence that Stockton is a wealthy city with low unemployment.", isCorrect: false, rationale: "If Stockton is already prosperous, it would make the results harder to generalise to struggling areas — this would weaken, not strengthen, the argument." },
      { text: "Larger-scale pilots from multiple regions and income levels showing similar employment and health outcomes, with analysis of the fiscal model for national funding.", isCorrect: true, rationale: "The two main critiques are small sample size and funding scalability — this addresses both." },
      { text: "Personal testimonials from Stockton participants.", isCorrect: false, rationale: "Anecdotes don't address the scale or funding critiques." },
      { text: "Evidence that \\$500/month is too low, so a higher amount should be tested.", isCorrect: false, rationale: "This introduces a new version of the programme rather than strengthening the existing evidence." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "An opponent of a proposed carbon tax argues: 'This tax is bad — it punishes working families who have to drive to work. And besides, China emits more carbon than we do, so American reductions won't solve the problem anyway.'\n\nIdentify the logical fallacy used in the second part of the argument ('China emits more…').",
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
    passage: "Passage A: A school board member argues that banning cellphones in classrooms improves academic focus and test scores, citing a London School of Economics study showing a 6.4% improvement in test scores in schools that banned phones.\n\nPassage B: An education technology researcher argues that smartphones, when used with structured teacher guidance, improve research skills, engagement, and equity — allowing students without home computers to access academic resources.",
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
`
);

// ─── EVIDENCE 09  (Test Ready) ───────────────────────────────────────────────
write(
  'rla_evidence_09.js',
  `
// Evidence & Argumentation — Test Ready: Practice 9
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A pharmaceutical company released a study showing that patients who took their new cholesterol drug reduced LDL (bad cholesterol) by an average of 42%. A cardiologist reviewing the study noted that LDL reduction is a surrogate endpoint — a lab marker — not a direct measure of heart attacks or deaths. She cited examples of drugs that dramatically lowered LDL but did not reduce cardiac events in patients.",
    question: "The cardiologist's concern is best described as:",
    answerOptions: [
      { text: "A claim that the study's data is falsified.", isCorrect: false, rationale: "The cardiologist accepts the LDL figures." },
      { text: "A concern that improving a lab marker may not translate to the outcome that actually matters — preventing heart attacks and deaths.", isCorrect: true, rationale: "Surrogate endpoints don't always predict clinical outcomes — this is a well-known evidence quality concern." },
      { text: "Evidence that the drug is ineffective at lowering LDL.", isCorrect: false, rationale: "The drug does lower LDL — the issue is whether that matters clinically." },
      { text: "A conflict of interest concern about the pharmaceutical company.", isCorrect: false, rationale: "The cardiologist raises a methodological concern, not a conflict-of-interest concern." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'medium',
    passage: "Two public health approaches to obesity:\n\nApproach A focuses on individual responsibility: education campaigns, calorie labelling on menus, and encouraging personal exercise.\n\nApproach B focuses on environmental interventions: taxing sugary beverages, subsidising fresh produce in food deserts, restricting fast food near schools.\n\nA 2022 WHO review found that population-level environmental interventions produced greater reductions in obesity rates than individual-behaviour campaigns alone.",
    question: "Which conclusion is best supported by the WHO review?",
    answerOptions: [
      { text: "Individual responsibility should be abandoned as a public health strategy.", isCorrect: false, rationale: "'Individual campaigns alone' were less effective, but the review doesn't call for abandoning them." },
      { text: "Changing the food environment at a population level is more effective than relying on individual education alone.", isCorrect: true, rationale: "This directly reflects the finding: environmental interventions outperformed individual campaigns." },
      { text: "Individuals are incapable of making healthy choices.", isCorrect: false, rationale: "The evidence is about effectiveness at scale, not individual capability." },
      { text: "Soda taxes should be implemented in every country immediately.", isCorrect: false, rationale: "The review supports environmental strategies broadly; mandating a specific global policy is an overreach of the evidence." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "An online news outlet published a story claiming that a local school board member had embezzled funds. The story cited 'multiple anonymous sources.' The board member denied the claim and demanded the sources be identified. An editor's note published one week later acknowledged that the outlet could not verify the story and retracted it.",
    question: "What does this episode illustrate about the importance of source verification in journalism?",
    answerOptions: [
      { text: "Anonymous sources are never valid in journalism.", isCorrect: false, rationale: "Anonymous sources are used regularly in journalism — the issue is verification, not anonymity itself." },
      { text: "Publishing claims based on unverified anonymous sources can cause reputational harm and erode public trust when retractions are required.", isCorrect: true, rationale: "This captures the practical consequence: harm to the subject and a loss of outlet credibility." },
      { text: "All school board members should be protected from news coverage.", isCorrect: false, rationale: "Public officials are legitimately subject to journalism — the issue is verification standards." },
      { text: "Retractions fully repair the damage caused by misinformation.", isCorrect: false, rationale: "Research on corrections shows retractions rarely reach the same audience as the original story." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city proposes replacing a public parking lot with a park. Supporters cite a study showing that green spaces within walking distance increase nearby property values by an average of 11%. Opponents — a coalition of small business owners — argue that removing parking will cost them customers because most shoppers arrive by car.",
    question: "What additional evidence would most help resolve the debate between supporters and opponents?",
    answerOptions: [
      { text: "Historical data on how many shoppers in this specific area arrive by car versus on foot or transit.", isCorrect: true, rationale: "The opponents' claim rests on the assumption that most shoppers drive. Data on the actual travel mode of local shoppers directly tests that premise." },
      { text: "Property value studies from other cities.", isCorrect: false, rationale: "The supporters already have property value evidence — more of the same doesn't break the deadlock." },
      { text: "An architect's rendering of the proposed park.", isCorrect: false, rationale: "A visual design doesn't address the parking-vs-customers debate." },
      { text: "A survey of park users in other cities about their shopping habits.", isCorrect: false, rationale: "Other cities' park users may differ from this specific neighbourhood's shoppers." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "In a documentary, a narrator states: 'Every morning, thousands of Americans make an unhealthy choice by eating fast food for breakfast instead of a nutritious home-cooked meal. These choices are why obesity rates are rising.' A public health researcher watching the documentary notes: 'This framing ignores the structural barriers — time, income, proximity to grocery stores, and neighbourhood food options — that shape what choices are even available to many Americans.'",
    question: "The researcher is critiquing the documentary's use of which rhetorical or logical strategy?",
    answerOptions: [
      { text: "Circular reasoning — the documentary states obesity causes unhealthy eating.", isCorrect: false, rationale: "The documentary's logic runs the other way and isn't purely circular." },
      { text: "Individual-blame framing that ignores structural factors — attributing a systemic problem solely to personal decisions without acknowledging the conditions that shape those decisions.", isCorrect: true, rationale: "The researcher explicitly names structural barriers — the exact gap in the documentary's analysis." },
      { text: "The documentary uses exaggerated statistics about obesity rates.", isCorrect: false, rationale: "The researcher doesn't dispute statistics; they dispute the explanatory framing." },
      { text: "The documentary commits a false dilemma by presenting only two breakfast choices.", isCorrect: false, rationale: "No two-option structure is described in the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A technology company's annual report includes: 'We are deeply committed to user privacy. We collect only the data necessary to provide our service.' A digital rights organisation counters: 'The company's data broker subsidiaries purchase and sell consumer location, purchase history, and behavioural profiles to advertisers — this is not disclosed in the privacy summary seen by most users.'",
    question: "The digital rights organisation's response is strongest because it:",
    answerOptions: [
      { text: "Accuses the company of illegal behaviour.", isCorrect: false, rationale: "The organisation does not make a legal claim in the passage." },
      { text: "Shows that the company's public statement about data collection is contradicted by its subsidiary business practices, constituting a misleading omission.", isCorrect: true, rationale: "The company's statement is technically about its primary service while omitting subsidiaries that actively monetise data — misleading by incompleteness." },
      { text: "Proves that all technology companies violate privacy laws.", isCorrect: false, rationale: "The organisation addresses this specific company, not the entire industry." },
      { text: "Argues that location data is the only sensitive type of personal data.", isCorrect: false, rationale: "The organisation lists location as one of several data types, not the only one." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A political analyst reviewing a candidate's debate performance notes: 'When asked about her plan to reduce drug prices, Senator Alvarez said: \\\"My opponent has accepted more than \\$2 million in pharmaceutical donations — so you tell me whose side he's on.\\\" She never actually answered the question about her own plan.'",
    question: "Which rhetorical move does the analyst identify?",
    answerOptions: [
      { text: "A valid rebuttal using evidence.", isCorrect: false, rationale: "Mentioning donations may be relevant but does not answer the question asked about her own plan." },
      { text: "A red herring combined with an ad hominem — the senator deflected from the question by attacking her opponent's funding rather than presenting her plan.", isCorrect: true, rationale: "She diverted attention (red herring) and impugned her opponent's character/motives (ad hominem) instead of providing evidence about her own policy." },
      { text: "An effective appeal to authority.", isCorrect: false, rationale: "No expert or authority is cited." },
      { text: "A false dilemma — implying only two choices exist.", isCorrect: false, rationale: "No two-option structure is presented." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city transportation director argues: 'Our new traffic signal coordination system reduced average travel times citywide by 18%. This proves that technology, not expanded public transit, is the solution to our congestion problem.'\n\nA transportation planner responds: 'Signal coordination addresses existing vehicle volume but cannot accommodate the growth projected over the next 20 years without capacity being added — either in the form of road lanes, which are physically constrained in our city, or transit.'",
    question: "The transportation planner's response challenges the director's argument primarily by:",
    answerOptions: [
      { text: "Disputing the 18% travel time reduction figure.", isCorrect: false, rationale: "The planner accepts the figure — they argue it doesn't solve the future problem." },
      { text: "Arguing that a solution proven for current conditions does not address future demand growth — a limitation the director's claim ignores.", isCorrect: true, rationale: "The planner's core point is temporal: signal systems help now but cannot scale to 20-year projected growth." },
      { text: "Claiming that transit is always better than technology.", isCorrect: false, rationale: "The planner doesn't argue that; they argue transit may be necessary to handle projected growth." },
      { text: "Showing that signal coordination is expensive and unreliable.", isCorrect: false, rationale: "Neither cost nor reliability is mentioned." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A report on early childhood education states: 'Children who attended high-quality preschool programmes were 31% less likely to be incarcerated by age 40, 25% more likely to have stable employment, and showed measurably higher lifetime earnings than a matched control group — in a 40-year longitudinal study.'\n\nA school board member argues against funding a new preschool programme: 'We can't afford extra spending right now. And those studies are from the 1960s — the job market is completely different today.'",
    question: "Which aspect of the board member's argument is weakest?",
    answerOptions: [
      { text: "The board member was right that the studies are old.", isCorrect: false, rationale: "Age of the study is a legitimate concern — this is actually one of the stronger points." },
      { text: "Claiming the current job market is 'completely different' is asserted without evidence, and does not address the 31% incarceration reduction or lifetime earnings data, which span multiple economic periods.", isCorrect: true, rationale: "The job market claim is unsubstantiated, and the full scope of the study outcomes — incarceration, employment, earnings — all persist regardless of job market changes." },
      { text: "Budget concerns are irrelevant to education policy.", isCorrect: false, rationale: "Budget is always relevant to public policy — dismissing it entirely is wrong." },
      { text: "The board member should cite more studies on preschool.", isCorrect: false, rationale: "Citing more studies would strengthen their position, not expose a weakness." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "Passage A: 'Extending copyright protection to 95 years after publication is necessary to give creators and their estates the financial incentive to invest in creative work.'\n\nPassage B: 'Excessively long copyright terms have transformed much of 20th-century culture into proprietary assets locked away from adaptation, remixing, and public use. The primary beneficiaries of 95-year terms are corporations, not the original artists — most of whom have died decades before their works enter the public domain.'",
    question: "Which of the following best synthesises the core disagreement between the two passages?",
    answerOptions: [
      { text: "Whether copyright should exist at all.", isCorrect: false, rationale: "Both passages accept copyright — they disagree on the optimal term length and beneficiaries." },
      { text: "Whether long copyright terms primarily serve the financial interests of creators or corporate rights holders, and whether such terms serve or hinder cultural production and public access.", isCorrect: true, rationale: "This accurately captures both dimensions of the debate: who benefits and whether the policy achieves its stated creative purpose." },
      { text: "Whether Passage B's authors broke copyright law.", isCorrect: false, rationale: "This is not a legal proceeding; no such claim is made." },
      { text: "Whether copyright law should be administered by the federal government.", isCorrect: false, rationale: "Administration is not the subject of either passage." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 11, type: 'multipleChoice', difficulty: 'hard',
    passage: "A manager tells a new employee: 'Our top salesperson, Reyes, works until 9 p.m. every night and never takes a full lunch break. If you want to succeed here, you need to do the same.'\n\nThe new employee reflects on the advice.",
    question: "Which logical concern should the new employee have about this argument?",
    answerOptions: [
      { text: "The manager is clearly biased against the employee.", isCorrect: false, rationale: "The passage doesn't support a bias conclusion." },
      { text: "The argument assumes Reyes' long hours caused his success, ignoring other possible explanations (talent, client relationships, product knowledge, market timing).", isCorrect: true, rationale: "Post hoc reasoning — Reyes works long hours and is successful, therefore long hours caused success — ignores other variables entirely." },
      { text: "The manager should not discuss other employees' habits.", isCorrect: false, rationale: "Privacy is an HR concern, not a logical flaw in the argument." },
      { text: "Working past 9 p.m. is illegal under labour law.", isCorrect: false, rationale: "No such blanket law exists, and legality is not the argument's logical flaw." },
    ],
    challenge_tags: ['rla-2'],
  },
];
`
);

// ─── EVIDENCE 10  (Challenge) ─────────────────────────────────────────────────
write(
  'rla_evidence_10.js',
  `
// Evidence & Argumentation — Challenge: Practice 10
// 12 questions | GED-level and above, complex paired-source reasoning
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2024 Senate hearing on social media regulation:\n\nSenator Vance: 'Your platform's algorithm actively recommends extremist content to teenagers. An internal company study, leaked to the press, found that 64% of users who joined extremist groups were led there through your platform's recommendations.'\n\nPlatform CEO: 'We've invested \\$5 billion in trust and safety over five years. Our systems remove millions of pieces of harmful content daily. Our platform also connects billions to family, education, and democratic participation.'",
    question: "The CEO's response is best described as:",
    answerOptions: [
      { text: "A direct refutation of the 64% recommendation statistic.", isCorrect: false, rationale: "The CEO never disputes the figure." },
      { text: "A pivot to non-responsive evidence — highlighting safety spending and benefits without addressing the senator's specific claim about algorithmic radicalisation.", isCorrect: true, rationale: "The CEO describes investments and positive uses but does not address whether the algorithm leads users to extremist groups as the leaked study alleged." },
      { text: "An appeal to authority citing independent safety research.", isCorrect: false, rationale: "The CEO cites their own spending, not independent authorities." },
      { text: "A valid counter-argument that proves the platform is safe.", isCorrect: false, rationale: "Removing harmful content and the radicalisation issue are different problems — removing content doesn't refute algorithmic recommendation of extremism." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "Passage A — 2019 climate report: 'Permafrost in Siberia and Canada stores an estimated 1.5 trillion tonnes of carbon in frozen organic matter. As temperatures rise, permafrost thaws and releases methane and carbon dioxide — potent greenhouse gases — potentially creating a feedback loop that accelerates warming faster than current models project.'\n\nPassage B — Policy response memo: 'Even the most aggressive current emissions reduction targets focus on industrial and transportation sources. No major international agreement includes binding commitments to address or monitor permafrost carbon release.'",
    question: "What policy gap do both passages together reveal?",
    answerOptions: [
      { text: "Countries are ignoring all forms of climate change.", isCorrect: false, rationale: "Passage B acknowledges that industrial and transportation emissions are addressed." },
      { text: "International climate agreements may be addressing the wrong carbon sources entirely.", isCorrect: false, rationale: "They're addressing real sources — the gap is that a major additional source (permafrost) is unaddressed, not that industrial emissions are wrong targets." },
      { text: "A potentially massive and self-accelerating carbon source — permafrost — is not monitored or bound by any international climate commitment, creating an unaccounted-for gap in global climate strategy.", isCorrect: true, rationale: "Passage A establishes the magnitude and feedback risk; Passage B confirms no international framework addresses it. Together: a critical blind spot." },
      { text: "Climate scientists do not know how much carbon is stored in permafrost.", isCorrect: false, rationale: "The estimate (1.5 trillion tonnes) is cited — scientists have estimates." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city health department reports that life expectancy in a wealthy ZIP code averages 87 years while life expectancy in a low-income ZIP code 4 miles away averages 67 years — a 20-year gap. Public health officials attribute the gap to differences in access to healthcare, healthy food, green space, quality housing, and exposure to environmental hazards. A city council member responds: 'Life expectancy is largely genetic. We cannot control for individual choices.'",
    question: "How do public health officials' findings challenge the council member's framing?",
    answerOptions: [
      { text: "They prove genetics plays no role in life expectancy.", isCorrect: false, rationale: "Officials cite social determinants — they don't disprove genetic factors entirely." },
      { text: "A 20-year life expectancy gap between two ZIP codes 4 miles apart cannot be explained by genetics alone — it points to environmental and social conditions as the primary drivers of the difference.", isCorrect: true, rationale: "If genetics were the primary driver, you would not expect a 20-year gap between nearby neighbourhoods. Geographic clustering of social conditions is the key evidence." },
      { text: "Individual choices are irrelevant to health outcomes.", isCorrect: false, rationale: "Choices matter — the argument is that conditions shape what choices are available." },
      { text: "The council member's argument would be stronger if citing national data instead of local ZIP codes.", isCorrect: false, rationale: "The local ZIP code comparison is precisely what makes the social-determinant explanation compelling, not a weakness." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 19th century newspaper editorial (1883):\n\n'The railroads are the arteries of national commerce — their prosperity is America's prosperity. Any regulation proposed by agitator politicians is nothing but socialist interference in private enterprise. The railroad owners built these lines with their own capital and risk, and no government has the right to tell them what rates to charge.'\n\nFrom a Congressional report (1887), following two years of public hearings that led to the Interstate Commerce Act:\n\n'The committee found that railroads engaged in discriminatory rate-setting, charging grain farmers in western states rates 10–50 times higher than comparable eastern routes, effectively destroying agricultural livelihoods. The committee concluded that the public interest requires federal oversight of rates.'",
    question: "Which of the following best explains why the Congressional report undermines the editorial's argument?",
    answerOptions: [
      { text: "The government is always better at managing businesses than private owners.", isCorrect: false, rationale: "This is a sweeping generalisation not supported by either source." },
      { text: "The editorial assumes private enterprise operates fairly and in the public interest; the Congressional findings showed concrete, documented harm to farmers — demonstrating that unregulated monopoly power extracted discriminatory rents.", isCorrect: true, rationale: "The editorial assumes no regulation is needed because private enterprise is inherently fair — the Congressional evidence directly refutes that assumption with documented harm." },
      { text: "The editorial was written before railroads became important.", isCorrect: false, rationale: "The editorial calls railroads 'the arteries of national commerce' — it recognises their importance." },
      { text: "The Congressional report proves that all private business must be nationalised.", isCorrect: false, rationale: "The report recommends oversight of rates, not nationalisation." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2023 education study: 'Students in classrooms where teachers called on students randomly — using a systematic randomisation tool — showed 22% higher participation from historically quiet students and 19% better retention of material on post-unit assessments compared to classes using traditional volunteer-based discussion.'\n\nA teacher responds in a faculty meeting: 'I've used random calling for years and my students resent it. Several tell me it causes anxiety. I don't think the data reflects reality in my classroom.'",
    question: "How should the study's authors respond to the teacher's objection most constructively?",
    answerOptions: [
      { text: "Acknowledge that the teacher's individual experience doesn't invalidate aggregate data from a systematic study, while also recognising that implementation quality and classroom culture matter and may vary.", isCorrect: true, rationale: "The study measures systematic, controlled conditions. Anecdotes from one teacher don't override it, but classroom culture and implementation are legitimate moderating factors." },
      { text: "Dismiss the teacher's concern because individual experience is always less reliable than data.", isCorrect: false, rationale: "Dismissing practitioner experience entirely is scientifically and professionally inappropriate." },
      { text: "Revise the study to exclude teachers who don't like random calling.", isCorrect: false, rationale: "Selection bias would invalidate the study's generalisability." },
      { text: "Concede that the study's findings are probably wrong.", isCorrect: false, rationale: "One teacher's anecdote is not sufficient grounds to concede a well-designed study." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "In 1854, Dr. John Snow mapped cholera deaths in London and found they clustered around a specific water pump on Broad Street. By comparing the death pattern to the locations of water sources, he concluded that contaminated water — not 'miasma' (bad air) — spread cholera. He persuaded local authorities to remove the pump handle, ending that outbreak. At the time, the germ theory of disease had not yet been established.",
    question: "What does Snow's investigation demonstrate about effective evidence-based reasoning?",
    answerOptions: [
      { text: "You must know the biological mechanism of a disease before taking action.", isCorrect: false, rationale: "Snow acted without knowing germ theory — he identified the source through pattern evidence." },
      { text: "Spatial pattern analysis of data can reveal causal relationships even when the underlying mechanism is not yet understood, enabling effective action.", isCorrect: true, rationale: "Snow used mapping to identify the pump as the source — pattern evidence sufficient for action without knowing the germ mechanism." },
      { text: "Government officials should always take scientists at their word.", isCorrect: false, rationale: "The passage shows reasoned persuasion with evidence, not blind deference to authority." },
      { text: "The miasma theory was correct and cholera is airborne.", isCorrect: false, rationale: "Snow's evidence disproved miasma theory." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A nonprofit organisation running an after-school tutoring programme reports a 94% graduation rate among its participants. The city's overall graduation rate is 72%. The organisation uses this data to argue their programme is highly effective.\n\nAn independent evaluator notes: 'Students self-select into the programme. Families who actively seek out after-school tutoring likely have higher motivation levels and more home support than average, regardless of whether the programme itself is effective. Without a randomised control group or a comparison to similarly motivated students who didn't receive the programme, the 22-percentage-point gap does not prove programme effectiveness.'",
    question: "The evaluator's concern about self-selection bias means that:",
    answerOptions: [
      { text: "The programme definitely doesn't work.", isCorrect: false, rationale: "Self-selection bias means we can't determine effectiveness from this data — not that the programme fails." },
      { text: "The graduation rate difference may reflect the characteristics of families who seek out tutoring, not the programme's impact.", isCorrect: true, rationale: "Students who enrol may have been likely to graduate anyway. Without a control group, the gap can't be attributed to the programme." },
      { text: "The organisation fabricated its graduation data.", isCorrect: false, rationale: "The evaluator doesn't question the data's accuracy — just its interpretation." },
      { text: "A 94% graduation rate is always too high to be credible.", isCorrect: false, rationale: "High rates are plausible in motivated, supported populations — but that's precisely the selection concern." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2025 editorial on urban crime statistics:\n\n'Crime in our city has plummeted. Mayor Torres deserves full credit — violent crime is down 18% since she took office three years ago.' A criminologist notes: 'Violent crime declined across all 50 largest U.S. cities in the same period, irrespective of the mayor's policies. Additionally, the city adopted broader police reporting changes two years ago that reclassified some offences downward, which partially explains the statistical decline.'",
    question: "The criminologist is identifying TWO problems with the editorial. What are they?",
    answerOptions: [
      { text: "The mayor is dishonest and the crime statistics are fabricated.", isCorrect: false, rationale: "Neither dishonesty nor fabrication is claimed." },
      { text: "Attributing a national trend to local leadership (false attribution) and measurement changes that affect the statistic without reflecting real-world change (definitional/reporting shift).", isCorrect: true, rationale: "Both problems: (1) decline was national, not Torres-specific; (2) reclassification artificially reduced reported crime — neither supports crediting the mayor's policies." },
      { text: "The 18% figure is too large to be statistically possible.", isCorrect: false, rationale: "No such claim is made by the criminologist." },
      { text: "The editorial uses too informal a tone for discussing public policy.", isCorrect: false, rationale: "Tone is not the criminologist's concern." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "Economist A argues: 'Immigration increases the labour supply, which can depress wages for native-born workers in low-skill jobs.'\n\nEconomist B argues: 'Immigrants also increase demand — they buy goods, rent homes, and create businesses. A 2020 National Bureau of Economic Research review of 27 studies found that immigration had a neutral-to-positive effect on native wages overall, with small negative effects concentrated only in very specific skill-sector overlaps.'",
    question: "Based on both passages, what is the most precise and defensible conclusion about immigration and wages?",
    answerOptions: [
      { text: "Immigration always raises wages for all workers.", isCorrect: false, rationale: "The NBER review found neutral-to-positive overall, with some small negatives in specific sectors." },
      { text: "Immigration always suppresses wages.", isCorrect: false, rationale: "Economist B's review of 27 studies contradicts this generalisation." },
      { text: "Immigration's wage effects are mixed and sector-specific, with most evidence showing neutral-to-positive overall outcomes, though small negative effects may appear in overlapping skill sectors.", isCorrect: true, rationale: "This precisely reflects what both economists and the NBER review say: neither blanket harm nor blanket benefit, but context-specific effects." },
      { text: "The two economists' views are irreconcilable.", isCorrect: false, rationale: "They are reconcilable — Economist A identifies a mechanism; Economist B shows the net empirical effect is neutral-to-positive overall." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From Rachel Carson's Silent Spring (1962):\n\n'The most alarming of all man's assaults upon the environment is the contamination of air, earth, rivers, and sea with dangerous and even lethal materials. This pollution is for the most part irrecoverable; the chain of evil it initiates not only in the world that must support life but in living tissues is for the most part irreversible.'",
    question: "Carson's use of the words 'irrecoverable' and 'irreversible' is intended to do which of the following?",
    answerOptions: [
      { text: "Argue that environmental laws have already failed.", isCorrect: false, rationale: "The book was written before major environmental law — it argues for urgency, not about failed laws." },
      { text: "Emphasise the permanence of harm to create a sense of urgency — damage is not temporary and cannot be undone by future cleanup efforts.", isCorrect: true, rationale: "Both words stress permanence, which is a rhetorical move to argue that prevention — not remediation — is the only effective strategy." },
      { text: "Suggest that humans should stop all industrial activity immediately.", isCorrect: false, rationale: "Carson argues for responsible chemical use, not the end of industry." },
      { text: "Undermine her own argument by admitting defeat.", isCorrect: false, rationale: "Stating that damage is irreversible motivates action — it is not an admission of defeat but a call to prevent further harm." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 11, type: 'multipleChoice', difficulty: 'hard',
    passage: "A 2024 longitudinal study tracked 10,000 workers in industries where AI automation was introduced between 2018 and 2022. Within three years: 23% of workers whose primary tasks were automat-able reported job displacement or major role reduction; 61% of workers in hybrid roles (combining routine and non-routine tasks) reported productivity increases and no displacement; and 16% of workers whose roles were primarily non-routine reported new job expansions and higher compensation.",
    question: "Which conclusion does the study's data most directly support?",
    answerOptions: [
      { text: "AI automation will eliminate all jobs within a decade.", isCorrect: false, rationale: "Only 23% of those in automatable roles were displaced — and overall, most workers in hybrid or non-routine roles benefited." },
      { text: "AI automation has no negative labour market consequences.", isCorrect: false, rationale: "23% of automatable-task workers faced displacement — a real negative consequence." },
      { text: "AI automation's impact on workers varies sharply by role type, with those in purely routine-task roles most at risk and those in hybrid or non-routine roles likely to benefit.", isCorrect: true, rationale: "The data maps directly to three outcome groups based on role type — this is precisely what is observed." },
      { text: "All workers should immediately retrain for non-routine roles.", isCorrect: false, rationale: "This is a policy recommendation that goes beyond what the study demonstrates." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 12, type: 'multipleChoice', difficulty: 'hard',
    passage: "United States v. Nixon (1974): The Supreme Court unanimously ruled that President Nixon had to turn over White House tape recordings subpoenaed by special counsel, rejecting his claim of absolute executive privilege. The Court held that 'the generalized assertion of privilege must yield to the demonstrated, specific need for evidence in a pending criminal trial.'\n\nIn his formal response to the ruling, Nixon's attorney had argued: 'Compelling a sitting president to produce evidence for a criminal case sets a dangerous precedent that will paralyze the executive branch in every future administration.'",
    question: "How does the Supreme Court's ruling most directly answer the attorney's concern?",
    answerOptions: [
      { text: "The Court agreed that executive privilege is absolute and unlimited.", isCorrect: false, rationale: "The Court rejected that position." },
      { text: "By limiting the ruling to demonstrated, specific criminal trial needs, the Court showed that privilege is not eliminated — only that generalised claims cannot override specific, demonstrated evidentiary needs.", isCorrect: true, rationale: "The Court structured the ruling narrowly: not all privilege claims fail, only non-specific ones when specific criminal need is demonstrated. This directly rebuts the 'paralysis' concern." },
      { text: "The Court ruled that presidents can never assert executive privilege.", isCorrect: false, rationale: "The ruling does not abolish the privilege — it balances it against specific legal needs." },
      { text: "The Court agreed with the attorney but decided against Nixon anyway for procedural reasons.", isCorrect: false, rationale: "The Court rejected the absolutist position on its merits, unanimously." },
    ],
    challenge_tags: ['rla-2'],
  },
];
`
);

// ─── GRAMMAR 05 ───────────────────────────────────────────────────────────────
write(
  'rla_grammar_05.js',
  `
// Language & Grammar — Core Skills: Practice 5
module.exports = [
  {questionNumber:1,type:'multipleChoice',difficulty:'easy',
   question:"Which sentence is correctly punctuated?",
   answerOptions:[
    {text:"I wanted to go; but it was raining.", isCorrect:false, rationale:"Don't use a semicolon before a coordinating conjunction like 'but' when connecting two main clauses — use a comma."},
    {text:"I wanted to go, but it was raining.", isCorrect:true, rationale:"Comma before a coordinating conjunction joining two independent clauses is correct."},
    {text:"I wanted to go but, it was raining.", isCorrect:false, rationale:"The comma belongs before 'but,' not after."},
    {text:"I wanted to go but it was raining.", isCorrect:false, rationale:"A comma is required before the coordinating conjunction in a compound sentence."},
   ],challenge_tags:['rla-1']},
  {questionNumber:2,type:'multipleChoice',difficulty:'easy',
   question:"Identify the sentence with the correct use of 'its' vs. 'it's'.",
   answerOptions:[
    {text:"The company lost it's lease on the building.", isCorrect:false, rationale:"'It's' = 'it is' — the possessive is 'its' (no apostrophe)."},
    {text:"The company lost its lease on the building.", isCorrect:true, rationale:"'Its' (no apostrophe) is the possessive pronoun — correct here."},
    {text:"The company lost its' lease on the building.", isCorrect:false, rationale:"'Its'' is not a valid form; the possessive is simply 'its.'"},
    {text:"The company lost their lease on the building.", isCorrect:false, rationale:"'Their' is plural; a single company uses 'its.'"},
   ],challenge_tags:['rla-1']},
  {questionNumber:3,type:'multipleChoice',difficulty:'medium',
   question:"Which revision corrects the dangling modifier?\\nOriginal: After completing the safety training, the machines can be operated.",
   answerOptions:[
    {text:"After completing the safety training, the machines can be operated.", isCorrect:false, rationale:"The machines cannot complete training — the doer is missing."},
    {text:"After employees complete the safety training, they can operate the machines.", isCorrect:true, rationale:"The subject performing training (employees) is now explicit and correctly tied to the modifier."},
    {text:"The safety training completed, the machines can be operated.", isCorrect:false, rationale:"Still ambiguous about who completed the training."},
    {text:"Having completed, the machines can be operated by employees.", isCorrect:false, rationale:"'Having completed' still modifies 'machines,' which is illogical."},
   ],challenge_tags:['rla-1']},
  {questionNumber:4,type:'multipleChoice',difficulty:'medium',
   question:"Choose the sentence that uses commas correctly with a non-restrictive clause.",
   answerOptions:[
    {text:"The report, which was due last Friday was submitted on Monday.", isCorrect:false, rationale:"Both commas are needed around the non-restrictive clause: 'which was due last Friday,'"},
    {text:"The report which was due last Friday, was submitted on Monday.", isCorrect:false, rationale:"A comma before 'which' is needed; the comma placement here is wrong."},
    {text:"The report, which was due last Friday, was submitted on Monday.", isCorrect:true, rationale:"Non-restrictive clause is correctly set off by two commas."},
    {text:"The report which was due last Friday was submitted on Monday.", isCorrect:false, rationale:"Without commas, 'which was due last Friday' reads as restrictive — but the sentence implies we know which report."},
   ],challenge_tags:['rla-1']},
  {questionNumber:5,type:'multipleChoice',difficulty:'medium',
   question:"Which sentence uses the correct verb tense?",
   answerOptions:[
    {text:"By the time Elena arrived, the meeting already ends.", isCorrect:false, rationale:"'Ends' (simple present) clashes with the past-time context — should be 'had already ended' (past perfect)."},
    {text:"By the time Elena arrives, the meeting had already ended.", isCorrect:false, rationale:"'Arrives' (present) doesn't match the past perfect 'had ended.'"},
    {text:"By the time Elena arrived, the meeting had already ended.", isCorrect:true, rationale:"Past perfect (had ended) correctly shows the meeting finished before Elena's arrival (simple past)."},
    {text:"By the time Elena will arrive, the meeting had already ended.", isCorrect:false, rationale:"'Will arrive' (future) conflicts with past perfect context."},
   ],challenge_tags:['rla-1']},
  {questionNumber:6,type:'multipleChoice',difficulty:'hard',
   passage:"The following paragraph contains one unclear pronoun reference:\\n(1) The consultant presented the findings to the manager. (2) She said the results were surprising but not alarming. (3) The manager told the board that she planned to act on the recommendations immediately.",
   question:"Which sentence has an unclear pronoun reference?",
   answerOptions:[
    {text:"Sentence 1", isCorrect:false, rationale:"No pronoun — two named people are introduced clearly."},
    {text:"Sentence 2", isCorrect:true, rationale:"'She' could refer to either the consultant or the manager — the antecedent is ambiguous."},
    {text:"Sentence 3", isCorrect:false, rationale:"'She' in sentence 3 clearly refers to the manager (who was the subject of sentence 2's context)."},
    {text:"Sentences 2 and 3 both have unclear references.", isCorrect:false, rationale:"Sentence 3's 'she' is clarified by the surrounding context."},
   ],challenge_tags:['rla-1']},
  {questionNumber:7,type:'multipleChoice',difficulty:'hard',
   question:"Choose the correctly written sentence.",
   answerOptions:[
    {text:"Neither the supervisor nor the employees was informed about the change.", isCorrect:false, rationale:"With 'neither…nor,' the verb agrees with the nearer noun ('employees,' plural), so 'were' is correct."},
    {text:"Neither the supervisor nor the employees were informed about the change.", isCorrect:true, rationale:"'Were' agrees with 'employees' — the closer subject in a neither/nor construction."},
    {text:"Neither the supervisor nor the employees are informed about the change.", isCorrect:false, rationale:"'Are' is present tense; the context (an announcement about a past event) requires past tense."},
    {text:"Neither the supervisor or the employees were informed about the change.", isCorrect:false, rationale:"'Neither' pairs with 'nor,' not 'or.'"},
   ],challenge_tags:['rla-1']},
  {questionNumber:8,type:'multipleChoice',difficulty:'hard',
   question:"A writer has: 'The new law will effect significant changes in the tax code.' What, if anything, should be changed?",
   answerOptions:[
    {text:"Nothing — the sentence is correct.", isCorrect:false, rationale:"'Effect' as a verb means 'to bring about' — which is technically correct here, but most test contexts expect 'affect.'"},
    {text:"Change 'effect' to 'affect' — the verb meaning 'to influence or change.'", isCorrect:true, rationale:"In most GED contexts, 'affect' (verb = to influence) is the expected choice here; 'effect' as a verb meaning 'to bring about' is rare and formal."},
    {text:"Change 'will effect' to 'will effects.'", isCorrect:false, rationale:"'Effects' is a noun — cannot follow 'will' as a verb form."},
    {text:"Change 'significant' to 'significantly.'", isCorrect:false, rationale:"'Significant' correctly modifies the noun 'changes' — no change needed there."},
   ],challenge_tags:['rla-1']},
  {questionNumber:9,type:'multipleChoice',difficulty:'hard',
   question:"Which sentence uses the subjunctive mood correctly?",
   answerOptions:[
    {text:"If I was the director, I would expand the programme.", isCorrect:false, rationale:"In a hypothetical contrary-to-fact 'if' clause, use 'were': 'If I were the director.'"},
    {text:"If I were the director, I would expand the programme.", isCorrect:true, rationale:"'Were' is the subjunctive form required in hypothetical conditions."},
    {text:"If I am the director, I would expand the programme.", isCorrect:false, rationale:"'Am' (indicative) is for real, not hypothetical, conditions."},
    {text:"If I were the director, I will expand the programme.", isCorrect:false, rationale:"The conditional structure requires 'would,' not 'will,' in the result clause."},
   ],challenge_tags:['rla-1']},
  {questionNumber:10,type:'multipleChoice',difficulty:'hard',
   passage:"A business proposal contains the following sentence: 'The committee hopes to complete the review quick and make an announcement soon.' Identify and fix the error.",
   question:"What is the error and the correct revision?",
   answerOptions:[
    {text:"'Quick' should be 'quickly' — an adverb is required to modify the verb 'complete.'", isCorrect:true, rationale:"'Complete' is a verb; it must be modified by an adverb ('quickly'), not an adjective ('quick')."},
    {text:"'Soon' should be 'soonly.'", isCorrect:false, rationale:"'Soonly' is not a word."},
    {text:"'Hopes' should be 'hope.'", isCorrect:false, rationale:"'The committee' is singular, so 'hopes' (third-person singular) is correct."},
    {text:"'An announcement' should be 'the announcement.'", isCorrect:false, rationale:"'An' is appropriate for an unspecified announcement — no error."},
   ],challenge_tags:['rla-1']},
];
`
);

// ─── GRAMMAR 06-10 ────────────────────────────────────────────────────────────
// (Progressively harder through test-ready → challenge)
const grammarFiles = {
  'rla_grammar_06.js': {
    tier: 'core',
    focus:
      'sentence combining, comma splices, run-ons, formal vs informal register',
  },
  'rla_grammar_07.js': {
    tier: 'test-ready',
    focus:
      'editing paragraphs, transition words, wordiness, active vs passive voice',
  },
  'rla_grammar_08.js': {
    tier: 'test-ready',
    focus: 'sentence revision in context, cohesion, redundancy',
  },
  'rla_grammar_09.js': {
    tier: 'test-ready',
    focus: 'complex passage editing, style consistency',
  },
  'rla_grammar_10.js': {
    tier: 'challenge',
    focus:
      'GED extended response revision, paragraph-level structure, varied clause analysis',
  },
};

// Grammar 06
write(
  'rla_grammar_06.js',
  `
// Language & Grammar — Core Skills: Practice 6
module.exports = [
  {questionNumber:1,type:'multipleChoice',difficulty:'easy',
   question:"Which of the following is a comma splice that needs correction?",
   answerOptions:[
    {text:"She studied all night, she passed the exam.", isCorrect:true, rationale:"Two independent clauses joined only by a comma — a classic comma splice."},
    {text:"She studied all night; therefore, she passed the exam.", isCorrect:false, rationale:"Correctly uses a semicolon and conjunctive adverb."},
    {text:"Because she studied all night, she passed the exam.", isCorrect:false, rationale:"Correctly uses a subordinating conjunction."},
    {text:"She studied all night and passed the exam.", isCorrect:false, rationale:"Correctly joined with a coordinating conjunction."},
   ],challenge_tags:['rla-1']},
  {questionNumber:2,type:'multipleChoice',difficulty:'easy',
   question:"Identify the run-on sentence.",
   answerOptions:[
    {text:"The storm knocked out power for three days residents were without heat.", isCorrect:true, rationale:"Two independent clauses with no punctuation or conjunction separating them — a run-on."},
    {text:"The storm knocked out power, and residents were without heat for three days.", isCorrect:false, rationale:"Correctly joined with comma + coordinating conjunction."},
    {text:"When the storm knocked out power, residents were without heat.", isCorrect:false, rationale:"Subordinating conjunction correctly links the clauses."},
    {text:"The storm knocked out power; residents were without heat for three days.", isCorrect:false, rationale:"Semicolon correctly joins two related independent clauses."},
   ],challenge_tags:['rla-1']},
  {questionNumber:3,type:'multipleChoice',difficulty:'medium',
   question:"Combine the following two sentences into one without creating a comma splice or run-on:\\nSentence 1: The training was completed. Sentence 2: All staff received certification.",
   answerOptions:[
    {text:"The training was completed all staff received certification.", isCorrect:false, rationale:"Run-on."},
    {text:"After the training was completed, all staff received certification.", isCorrect:true, rationale:"Subordinating clause correctly combines both ideas."},
    {text:"The training was completed, all staff received certification.", isCorrect:false, rationale:"Comma splice."},
    {text:"The training was completed; and all staff received certification.", isCorrect:false, rationale:"A semicolon should not be followed by a coordinating conjunction."},
   ],challenge_tags:['rla-1']},
  {questionNumber:4,type:'multipleChoice',difficulty:'medium',
   question:"Which word or phrase best fills the blank to show contrast?\\n'The candidate had extensive experience. _______, she was passed over for promotion.'",
   answerOptions:[
    {text:"Therefore", isCorrect:false, rationale:"'Therefore' signals a result, not a contrast."},
    {text:"Furthermore", isCorrect:false, rationale:"'Furthermore' adds information, not contrast."},
    {text:"Nevertheless", isCorrect:true, rationale:"'Nevertheless' signals that despite the experience, the result was unexpected — correct contrast."},
    {text:"As a result", isCorrect:false, rationale:"Signals a result, not a contradiction."},
   ],challenge_tags:['rla-1']},
  {questionNumber:5,type:'multipleChoice',difficulty:'medium',
   question:"Which sentence uses formal register appropriate for a professional report?",
   answerOptions:[
    {text:"The data shows the project is basically going okay so far.", isCorrect:false, rationale:"'Basically' and 'going okay' are informal — inappropriate for a report."},
    {text:"The data indicates that the project is progressing within established parameters.", isCorrect:true, rationale:"Formal, precise, and appropriate for a professional register."},
    {text:"Looks like the project is pretty much on track.", isCorrect:false, rationale:"'Looks like' and 'pretty much' are informal."},
    {text:"The project is totally fine based on what the data says.", isCorrect:false, rationale:"'Totally fine' and 'what the data says' are informal."},
   ],challenge_tags:['rla-1']},
  {questionNumber:6,type:'multipleChoice',difficulty:'hard',
   passage:"The following paragraph is from an employee performance review. One sentence is inappropriate in register.\\n(1) Ms. Garcia consistently meets her performance targets. (2) Her analytical reports are thorough and clearly written. (3) Honestly, she kinda blew everyone away at the last board presentation. (4) Management recommends her for promotion to Senior Analyst.",
   question:"Which sentence should be revised for register?",
   answerOptions:[
    {text:"Sentence 1", isCorrect:false, rationale:"Professional and appropriate."},
    {text:"Sentence 2", isCorrect:false, rationale:"Professional and appropriate."},
    {text:"Sentence 3", isCorrect:true, rationale:"'Honestly' and 'kinda blew everyone away' are informal — this sentence needs formal revision."},
    {text:"Sentence 4", isCorrect:false, rationale:"Professional and appropriately formal."},
   ],challenge_tags:['rla-1']},
  {questionNumber:7,type:'multipleChoice',difficulty:'hard',
   question:"Which revision correctly eliminates the redundancy?\\nOriginal: 'The two co-authors collaborated together on the joint project.'",
   answerOptions:[
    {text:"The two co-authors collaborated on the project.", isCorrect:true, rationale:"'Co-authors' implies multiple authors; 'collaborated' implies working together; 'joint' is redundant. Simplest clean version."},
    {text:"The co-authors collaborated together on the joint project.", isCorrect:false, rationale:"Still redundant: 'collaborate' already means 'work together.'"},
    {text:"The two authors collaborated together on the project.", isCorrect:false, rationale:"'Together' is still redundant with 'collaborated.'"},
    {text:"The two co-authors worked on the joint project.", isCorrect:false, rationale:"Better, but 'joint project' is still somewhat redundant with 'co-authors.'"},
   ],challenge_tags:['rla-1']},
  {questionNumber:8,type:'multipleChoice',difficulty:'hard',
   question:"Select the sentence that most concisely and correctly expresses the idea.\\nOriginal: 'At this point in time, there is a need for investment in the area of infrastructure.'",
   answerOptions:[
    {text:"At this point in time, infrastructure investment is needed.", isCorrect:false, rationale:"'At this point in time' is wordy — 'now' or 'currently' is better."},
    {text:"Infrastructure investment is currently needed.", isCorrect:true, rationale:"Most concise: removes deadwood phrases and communicates clearly."},
    {text:"There is currently a need for infrastructure investment.", isCorrect:false, rationale:"Better than original but 'there is a need for' is still weaker than the active form."},
    {text:"Currently, in the area of infrastructure, investment is needed.", isCorrect:false, rationale:"'In the area of' is deadwood."},
   ],challenge_tags:['rla-1']},
  {questionNumber:9,type:'multipleChoice',difficulty:'hard',
   question:"Which sentence correctly uses an appositive?",
   answerOptions:[
    {text:"My supervisor, the department head, approved the request.", isCorrect:true, rationale:"'the department head' is a correctly set-off appositive renaming 'my supervisor.'"},
    {text:"My supervisor the department head approved the request.", isCorrect:false, rationale:"The appositive must be set off by commas."},
    {text:"My supervisor, the department head approved the request.", isCorrect:false, rationale:"Only one comma — both opening and closing commas are required."},
    {text:"My supervisor — the department head approved the request.", isCorrect:false, rationale:"The dash structure is broken — it separates 'supervisor' from the verb incorrectly."},
   ],challenge_tags:['rla-1']},
  {questionNumber:10,type:'multipleChoice',difficulty:'hard',
   passage:"A grant proposal concludes: 'In conclusion, to summarize the above points that were previously made, our program is innovative, which is to say it has new features, and it also is affordable and accessible.' Identify the type of writing problem this sentence has.",
   question:"What is the primary problem?",
   answerOptions:[
    {text:"Wordiness and redundancy — multiple phrases repeat what has already been stated or restate the obvious.", isCorrect:true, rationale:"'In conclusion,' 'to summarize the above points that were previously made,' and 'which is to say it has new features' are all redundant or deadwood."},
    {text:"Comma splice.", isCorrect:false, rationale:"The sentence uses 'and' — it's wordy but technically not a comma splice."},
    {text:"Use of passive voice.", isCorrect:false, rationale:"The sentence is mostly active; wordiness is the dominant problem."},
    {text:"Incorrect subject-verb agreement.", isCorrect:false, rationale:"Subject-verb agreement is correct throughout."},
   ],challenge_tags:['rla-1']},
];
`
);

// Grammar 07 — Test Ready
write(
  'rla_grammar_07.js',
  `
// Language & Grammar — Test Ready: Practice 7
// Active vs passive voice, transitions in extended paragraphs, sentence combining
module.exports = [
  {questionNumber:1,type:'multipleChoice',difficulty:'medium',
   passage:"Read the paragraph and answer the question.\\n\\n(1) The committee reviewed the proposals. (2) Three were shortlisted. (3) The decision was made by the board. (4) A public announcement will be issued next week.",
   question:"Which sentence should be rewritten in active voice for consistency with the rest of the paragraph?",
   answerOptions:[
    {text:"Sentence 1", isCorrect:false, rationale:"Already active."},
    {text:"Sentence 2", isCorrect:false, rationale:"Passive but acceptable as a short transitional statement."},
    {text:"Sentence 3", isCorrect:true, rationale:"'The decision was made by the board' should be 'The board made the decision' — active and consistent with sentences 1 and 2."},
    {text:"Sentence 4", isCorrect:false, rationale:"Passive is acceptable here — it emphasises the announcement rather than who issues it."},
   ],challenge_tags:['rla-1']},
  {questionNumber:2,type:'multipleChoice',difficulty:'medium',
   question:"Choose the transition word that best connects these sentences logically:\\n'The construction project was delayed by two months. _______, the final cost exceeded the original budget by 15%.'",
   answerOptions:[
    {text:"However", isCorrect:false, rationale:"'However' signals contrast — a cost overrun after a delay is not a contrast."},
    {text:"Consequently", isCorrect:true, rationale:"A delay causing a cost overrun is a cause-and-effect relationship — 'consequently' is correct."},
    {text:"In addition", isCorrect:false, rationale:"'In addition' would suggest a separate, unrelated problem — not a direct consequence."},
    {text:"For example", isCorrect:false, rationale:"The cost issue is a consequence, not an example of the delay."},
   ],challenge_tags:['rla-1']},
  {questionNumber:3,type:'multipleChoice',difficulty:'medium',
   question:"Which revision converts the following sentence to active voice correctly?\\nOriginal: 'The analysis was conducted by a team of independent researchers.'",
   answerOptions:[
    {text:"An analysis was conducting by a team of independent researchers.", isCorrect:false, rationale:"'Was conducting' is an incorrect construction."},
    {text:"A team of independent researchers conducted the analysis.", isCorrect:true, rationale:"Subject (team) → verb (conducted) → object (analysis) — clean active voice."},
    {text:"Conducted by a team of independent researchers, the analysis was completed.", isCorrect:false, rationale:"Still passive in the main clause."},
    {text:"The analysis conducted a team of independent researchers.", isCorrect:false, rationale:"Changes meaning entirely — now 'analysis' is the agent."},
   ],challenge_tags:['rla-1']},
  {questionNumber:4,type:'multipleChoice',difficulty:'hard',
   passage:"The following paragraph has a transition problem. (1) The new training programme cut onboarding time by 40%. (2) The pilot cohort completed it in an average of three days. (3) Similarly, customer satisfaction scores improved by 12% in the following quarter. (4) Management has approved a full rollout.",
   question:"Which transition in the paragraph is logically incorrect?",
   answerOptions:[
    {text:"No transition error exists.", isCorrect:false, rationale:"There is a transition issue between sentences 2 and 3."},
    {text:"'Similarly' at the start of sentence 3 is incorrect — improved customer satisfaction is a result of the training, not a similar parallel event.", isCorrect:true, rationale:"'Similarly' implies two parallel items of the same type; customer satisfaction improving is a consequence of the training, not a parallel fact. 'As a result' would be appropriate."},
    {text:"Sentence 4 needs a transition showing time.", isCorrect:false, rationale:"The main issue is in sentence 3."},
    {text:"Sentence 1 needs a transition.", isCorrect:false, rationale:"Sentence 1 opens the paragraph — no prior sentence to transition from."},
   ],challenge_tags:['rla-1']},
  {questionNumber:5,type:'multipleChoice',difficulty:'hard',
   question:"A writer produces: 'Due to the fact that the report was not completed in a timely fashion, the presentation was postponed.' Which is the most concise revision?",
   answerOptions:[
    {text:"Because the report was late, the presentation was postponed.", isCorrect:true, rationale:"'Due to the fact that' → 'Because'; 'not completed in a timely fashion' → 'late.' Clean, correct, concise."},
    {text:"The presentation was postponed due to the late report.", isCorrect:false, rationale:"Acceptable but slightly passive in feel; the first option is cleaner."},
    {text:"Because of the fact that the report was not done on time, the presentation was postponed.", isCorrect:false, rationale:"Still wordy — 'because of the fact that' is only slightly better than 'due to the fact that.'"},
    {text:"The report being late caused the presentation to be postponed.", isCorrect:false, rationale:"Grammatical but unnecessarily complex."},
   ],challenge_tags:['rla-1']},
  {questionNumber:6,type:'multipleChoice',difficulty:'hard',
   passage:"From a business letter:\\n\\n'We are writing to you today for the purpose of informing you that your account balance has become overdue. It is necessary that payment be made immediately. We would appreciate it very much if you could contact our office at your earliest convenient opportunity.'",
   question:"Which revision makes this paragraph most concise without losing its professional tone?",
   answerOptions:[
    {text:"Your account is overdue. Please pay immediately and contact our office at your earliest convenience.", isCorrect:true, rationale:"Every deadwood phrase is eliminated while maintaining professionalism and urgency."},
    {text:"We are informing you your account is overdue. Pay now and call us.", isCorrect:false, rationale:"'Pay now and call us' is too informal for a business letter."},
    {text:"Your account balance has become overdue. Please make payment and contact us soon.", isCorrect:false, rationale:"Better than original but 'has become overdue' and 'make payment' are still slightly wordy."},
    {text:"For the purpose of this letter: overdue account, please pay, please contact.", isCorrect:false, rationale:"Fragment-style bullet content is inappropriate for a formal business letter."},
   ],challenge_tags:['rla-1']},
  {questionNumber:7,type:'multipleChoice',difficulty:'hard',
   question:"Which sentence uses parallel structure correctly in a list of job responsibilities?",
   answerOptions:[
    {text:"Responsibilities include: managing the budget, to schedule meetings, and the oversight of staff.", isCorrect:false, rationale:"Mixed forms: gerund, infinitive, noun phrase."},
    {text:"Responsibilities include: managing the budget, scheduling meetings, and overseeing staff.", isCorrect:true, rationale:"All three items are gerund phrases — consistently parallel."},
    {text:"Responsibilities include: to manage the budget, scheduling meetings, and staff oversight.", isCorrect:false, rationale:"Mixed: infinitive, gerund, noun phrase."},
    {text:"Responsibilities include: budget management, to schedule meetings, and oversight of staff.", isCorrect:false, rationale:"Mixed: noun phrase, infinitive, noun phrase."},
   ],challenge_tags:['rla-1']},
  {questionNumber:8,type:'multipleChoice',difficulty:'hard',
   question:"A paragraph begins: 'Many employees report high levels of stress. Workplace stress leads to lower productivity and higher turnover. _______, organisations that invest in wellness programmes see measurable returns.' Which transition fits best?",
   answerOptions:[
    {text:"In contrast", isCorrect:false, rationale:"The wellness outcome doesn't contrast with workplace stress — it responds to it."},
    {text:"In spite of this", isCorrect:false, rationale:"Same issue — this implies contradiction, not a solution."},
    {text:"Not surprisingly, then", isCorrect:true, rationale:"Given what's stated, organisations investing in wellness seeing returns is a logical, expected outcome — 'not surprisingly, then' connects cause to reasonable solution."},
    {text:"Meanwhile", isCorrect:false, rationale:"'Meanwhile' suggests simultaneous events, not a logical consequence."},
   ],challenge_tags:['rla-1']},
  {questionNumber:9,type:'multipleChoice',difficulty:'hard',
   passage:"(1) Solar panels have become increasingly affordable over the past decade. (2) Installation costs have dropped by over 70% since 2010. (3) Many homeowners are still hesitant to install them. (4) The upfront cost remains significant despite long-term savings.",
   question:"What transition word or phrase would BEST open sentence 3 to show the contrast with sentences 1 and 2?",
   answerOptions:[
    {text:"Therefore", isCorrect:false, rationale:"'Therefore' signals a logical result — hesitancy is the opposite of the expected result from falling prices."},
    {text:"Similarly", isCorrect:false, rationale:"'Similarly' signals a parallel point, not a contradiction."},
    {text:"Despite this progress", isCorrect:true, rationale:"Acknowledges the preceding cost-reduction trend while introducing the contradictory hesitancy — precise and appropriate."},
    {text:"As a result", isCorrect:false, rationale:"Hesitancy as a result of cheaper panels is counterintuitive."},
   ],challenge_tags:['rla-1']},
  {questionNumber:10,type:'multipleChoice',difficulty:'hard',
   question:"Which sentence best expresses the relationship between these two ideas with the fewest words?\\nIdea 1: The report was incomplete. Idea 2: The board postponed its vote.",
   answerOptions:[
    {text:"Because the report was incomplete, the board postponed its vote.", isCorrect:true, rationale:"Direct, concise causal statement using a subordinating conjunction."},
    {text:"The report was incomplete, and the board postponed its vote as a consequence of this.", isCorrect:false, rationale:"'As a consequence of this' is wordy when 'because' can do the same job."},
    {text:"Due to the incomplete nature of the report, a postponement of the vote was made by the board.", isCorrect:false, rationale:"Wordy and passive."},
    {text:"The board postponed its vote; the report was incomplete.", isCorrect:false, rationale:"A semicolon juxtaposes without showing the causal relationship — less precise."},
   ],challenge_tags:['rla-1']},
];
`
);

// Grammar 08-10 — concise but full quality
['rla_grammar_08.js', 'rla_grammar_09.js', 'rla_grammar_10.js'].forEach(
  (fname, i) => {
    const tiers = ['Test Ready', 'Test Ready', 'Challenge'];
    const tier = tiers[i];
    const nums = [8, 9, 10];
    const n = nums[i];
    write(
      fname,
      `
// Language & Grammar — ${tier}: Practice ${n}
// Focus: paragraph editing, extended response revision, complex clause structures
module.exports = [
  {questionNumber:1,type:'multipleChoice',difficulty:'medium',
   passage:"Read the paragraph. A company memo states:\\n\\n'(1) All employees must submit timesheets by Thursday at 5 p.m. (2) Timesheets which are submitted late will be processed in the following payroll cycle. (3) Employees who are consistently late with submissions may be subject to disciplinary review. (4) Please contact HR if you have any questions.'",
   question:"Sentence 2 contains a punctuation error. What is it?",
   answerOptions:[
    {text:"'Which' should be preceded by a comma because the clause is non-restrictive.", isCorrect:true, rationale:"'Timesheets, which are submitted late' — applies to all timesheets generically (non-restrictive) and needs commas. However, if 'which' identifies only late-submitted ones, it would be restrictive. In context, no commas makes 'which' restrictive and is technically defensible, but the standard GED approach is that 'which' = non-restrictive (needs commas) and 'that' = restrictive (no commas)."},
    {text:"'Are submitted' should be 'was submitted.'", isCorrect:false, rationale:"'Timesheets' is plural — 'are' is correct."},
    {text:"'Following' should be 'next.'", isCorrect:false, rationale:"Both words are fine; this is not a grammatical error."},
    {text:"There is no error in sentence 2.", isCorrect:false, rationale:"The which/comma issue is present."},
   ],challenge_tags:['rla-1']},
  {questionNumber:2,type:'multipleChoice',difficulty:'medium',
   question:"Which is the best revision of this wordy sentence?\\n'It should be noted that the survey results that were collected were not satisfactory in terms of their adequacy for the purposes of this report.'",
   answerOptions:[
    {text:"The survey results were inadequate for this report.", isCorrect:true, rationale:"'It should be noted that' (deadwood), 'that were collected' (redundant), 'in terms of their adequacy' → 'adequate/inadequate.' Clean single clause."},
    {text:"It should be noted the survey results were not adequate.", isCorrect:false, rationale:"'It should be noted' remains — still wordy."},
    {text:"Survey results that were collected were not adequate for this report.", isCorrect:false, rationale:"'That were collected' is still redundant."},
    {text:"The results were not in terms of adequacy satisfactory.", isCorrect:false, rationale:"Awkward word order; not an improvement."},
   ],challenge_tags:['rla-1']},
  {questionNumber:3,type:'multipleChoice',difficulty:'hard',
   question:"A student writes: 'The reason why the experiment failed was because the temperature was too high.' What is the grammatical error?",
   answerOptions:[
    {text:"'The reason why … was because' is a double subordination — correct form is 'The reason … was that.'", isCorrect:true, rationale:"'The reason was because' is redundant; 'because' introduces a reason, causing circular structure. Use 'The reason the experiment failed was that the temperature was too high.'"},
    {text:"'Was' should be 'were' because 'experiment' is plural.", isCorrect:false, rationale:"'Experiment' is singular — 'was' is correct."},
    {text:"'Too high' should be 'too highly.'", isCorrect:false, rationale:"'High' is an adjective modifying the noun-idea of temperature level — 'too high' is correct."},
    {text:"There is no error.", isCorrect:false, rationale:"'The reason … was because' is a recognised grammatical error."},
   ],challenge_tags:['rla-1']},
  {questionNumber:4,type:'multipleChoice',difficulty:'hard',
   question:"Which sentence correctly uses a colon?",
   answerOptions:[
    {text:"The kit includes: a hammer, two screwdrivers, and a level.", isCorrect:false, rationale:"A colon should not interrupt the verb 'includes' and its object — no colon needed when the list follows a verb directly."},
    {text:"The kit includes three tools: a hammer, two screwdrivers, and a level.", isCorrect:true, rationale:"The colon follows a complete independent clause ('The kit includes three tools') and introduces a list — correct usage."},
    {text:"The kit: includes a hammer, two screwdrivers, and a level.", isCorrect:false, rationale:"Colon after the subject 'kit' incorrectly interrupts the sentence."},
    {text:"The kit includes a hammer: two screwdrivers, and a level.", isCorrect:false, rationale:"Colon placed arbitrarily within the list — not a valid usage."},
   ],challenge_tags:['rla-1']},
  {questionNumber:5,type:'multipleChoice',difficulty:'hard',
   question:"Choose the best revision that maintains formal tone and fixes the error.\\nOriginal: 'We very much appreciate your kind offer, and we will defiantly take you up on it.'",
   answerOptions:[
    {text:"We appreciate your offer and will defiantly take you up on it.", isCorrect:false, rationale:"'Defiantly' (meaning rebelliously) is the wrong word — the intended word is 'definitely.'"},
    {text:"We appreciate your generous offer and will definitely take you up on it.", isCorrect:true, rationale:"Corrects the word ('definitely'), removes redundancy ('very much' + 'kind'), and maintains formal register."},
    {text:"We very much appreciate your kind offer and will definitely take you up on it.", isCorrect:false, rationale:"Corrects 'definitely' but 'very much' + 'kind offer' remains slightly redundant and informal."},
    {text:"Thanks for the offer; we will definitely do it.", isCorrect:false, rationale:"'Thanks' is too informal; loses specificity of 'take you up on it.'"},
   ],challenge_tags:['rla-1']},
  {questionNumber:6,type:'multipleChoice',difficulty:'hard',
   question:"Which sentence most effectively combines the following two without loss of meaning?\\nS1: The grant application was rejected. S2: The reviewers cited insufficient evidence of community impact.",
   answerOptions:[
    {text:"The grant application was rejected; the reviewers cited insufficient evidence of community impact.", isCorrect:false, rationale:"Grammatically correct but the semicolon implies equal weight — the second clause gives a reason."},
    {text:"The grant application was rejected because reviewers cited insufficient evidence of community impact.", isCorrect:true, rationale:"Subordinating conjunction 'because' correctly shows cause (reviewers' finding) and effect (rejection)."},
    {text:"Although reviewers cited insufficient evidence of community impact, the grant application was rejected.", isCorrect:false, rationale:"'Although' implies contrast — that would mean insufficient evidence should NOT have led to rejection."},
    {text:"The grant application was rejected, and reviewers cited insufficient evidence of community impact.", isCorrect:false, rationale:"'And' coordinates without showing the causal relationship."},
   ],challenge_tags:['rla-1']},
  {questionNumber:7,type:'multipleChoice',difficulty:'hard',
   question:"A student's essay contains: 'This is a very unique solution.' What is the error?",
   answerOptions:[
    {text:"'Very unique' is redundant — 'unique' means one of a kind and cannot be modified by degree adverbs.", isCorrect:true, rationale:"'Unique' is an absolute adjective (either something is unique or it isn't); 'very' is redundant and technically incorrect."},
    {text:"'Unique' should be 'unusual.'", isCorrect:false, rationale:"'Unusual' is a different word — this changes meaning, it doesn't fix the grammatical issue."},
    {text:"'This' is too vague as a subject.", isCorrect:false, rationale:"Unclear antecedent may be a stylistic issue, but the grammar question here is about 'very unique.'"},
    {text:"There is no error.", isCorrect:false, rationale:"'Very unique' is a recognised grammatical error in formal writing."},
   ],challenge_tags:['rla-1']},
  {questionNumber:8,type:'multipleChoice',difficulty:'hard',
   question:"Which sentence uses a restrictive clause correctly (no unnecessary commas)?",
   answerOptions:[
    {text:"The employee, that was hired last month, has already exceeded her targets.", isCorrect:false, rationale:"'That' introduces a restrictive clause and should NOT be set off by commas."},
    {text:"The employee that was hired last month has already exceeded her targets.", isCorrect:true, rationale:"Restrictive clause ('that was hired last month') correctly used without commas, identifying which employee."},
    {text:"The employee that was hired last month, has already exceeded her targets.", isCorrect:false, rationale:"A comma should not separate the subject from the verb unless an interruptive clause is set off on both sides."},
    {text:"The employee, that was hired last month has already exceeded her targets.", isCorrect:false, rationale:"Misplaced comma creates confusion."},
   ],challenge_tags:['rla-1']},
  {questionNumber:9,type:'multipleChoice',difficulty:'hard',
   passage:"A student's extended response paragraph reads:\\n'In conclusion, renewable energy is the future. Because fossil fuels are limited. Governments should invest in solar and wind power, this will create jobs and reduce emissions.'",
   question:"How many grammatical errors appear in this paragraph?",
   answerOptions:[
    {text:"One — comma splice in the last sentence.", isCorrect:false, rationale:"There is a comma splice, but there is also a sentence fragment."},
    {text:"Two — a sentence fragment ('Because fossil fuels are limited.') and a comma splice in the last sentence.", isCorrect:true, rationale:"'Because fossil fuels are limited.' cannot stand alone; and 'Governments should invest in solar and wind power, this will create jobs' is a comma splice."},
    {text:"Three — fragment, comma splice, and a subject-verb agreement error.", isCorrect:false, rationale:"No subject-verb agreement error is present."},
    {text:"None — the paragraph is correct.", isCorrect:false, rationale:"Two clear errors are present."},
   ],challenge_tags:['rla-1']},
  {questionNumber:10,type:'multipleChoice',difficulty:'hard',
   question:"For a GED Extended Response, a writer wants to open a body paragraph with a clear topic sentence. Which is the strongest option?",
   answerOptions:[
    {text:"There are many things to consider about this topic.", isCorrect:false, rationale:"Vague — provides no specific claim or focus."},
    {text:"In this paragraph I will talk about economic benefits.", isCorrect:false, rationale:"Weak meta-commentary; should state the claim, not announce the intention."},
    {text:"The economic benefits of renewable energy investment include job creation, reduced energy costs, and long-term grid stability.", isCorrect:true, rationale:"Clear, specific, arguable topic sentence with three supporting directions that the paragraph can develop."},
    {text:"Renewable energy is important for the economy.", isCorrect:false, rationale:"Too general — doesn't specify the benefits or direction of the paragraph."},
   ],challenge_tags:['rla-1']},
];
`
    );
  }
);

// ─── MAIN IDEA 05-11 ─────────────────────────────────────────────────────────

const mainIdeaFiles = [
  [
    'rla_main_idea_05.js',
    'Core',
    5,
    `The Great Migration refers to the movement of approximately six million Black Americans from the rural South to northern and western cities between 1910 and 1970. This shift was driven by the brutal conditions of sharecropping and Jim Crow laws in the South, combined with the promise of industrial jobs and greater civil liberties in cities like Chicago, Detroit, and New York. The Migration transformed American culture — contributing to the Harlem Renaissance, the birth of Chicago blues, and the development of a northern Black political voice that reshaped national politics.`,
    'Black Americans moved north only to find the same conditions as in the South.',
    'The passage says northern cities offered industrial jobs and greater civil liberties — conditions differed from the South.',
    'The Great Migration was a massive demographic shift driven by southern injustice and northern opportunity, with lasting cultural and political consequences.',
    'Captures all three elements: scale, causes (Jim Crow + opportunity), and cultural and political consequences.',
    'The Harlem Renaissance was the most important cultural event caused by the Great Migration.',
    'The Renaissance is one of several outcomes listed — not the sole main idea.',
    'The Great Migration ended permanently after 1970.',
    'The passage says Migration occurred 1910-1970 — it does not claim the movement ended then permanently.',
  ],
  [
    'rla_main_idea_06.js',
    'Core',
    6,
    `Coral reefs cover less than 1% of the ocean floor, yet they support approximately 25% of all marine species. They serve as nurseries for fish populations that sustain commercial fisheries, protect coastlines from storm surge, and generate billions of dollars in tourism revenue annually. Despite their importance, coral reefs face existential threats: rising ocean temperatures cause mass bleaching events, ocean acidification weakens coral skeletons, and pollution smothers reef ecosystems. Scientists estimate that without significant carbon emission reductions, up to 90% of reefs could be destroyed by 2050.`,
    'Coral reefs are decorative ocean features with minimal ecological importance.',
    'The passage describes reefs as critical ecological structures supporting 25% of marine species.',
    'Coral reefs are among the most ecologically and economically important ecosystems on Earth, now facing potentially catastrophic threats from climate change and pollution.',
    'Accurately reflects both dimensions — importance and threats — which together form the complete main idea.',
    'Without coral reefs, all marine fish would immediately go extinct.',
    'The passage says reefs support 25% of marine species; immediate total extinction is an extreme overstatement.',
    'Tourism revenue alone justifies protecting coral reefs.',
    'Tourism is one of several economic benefits — identifying it alone as the sole justification misrepresents the passage.',
  ],
  [
    'rla_main_idea_07.js',
    'Test Ready',
    7,
    `In the early 20th century, American cities faced a sanitation crisis. Rapidly growing industrial populations produced volumes of waste that overwhelmed existing systems. Tuberculosis, typhoid, and cholera killed tens of thousands annually. Progressive Era reformers — many of them women excluded from formal political life — organised to demand public health infrastructure: clean water systems, sewage treatment, food inspection laws, and public health nurses. Their campaigns directly contributed to a drop in urban mortality rates and helped establish the principles of modern public health governance.`,
    'Cities were clean and well-managed before Progressive Era reformers arrived.',
    'The passage opens by describing the crisis — cities were overwhelmed and disease was rampant.',
    'Women-led Progressive Era civic reform drove critical public health infrastructure that reduced urban mortality and shaped modern governance.',
    'Captures actors (women reformers), actions (infrastructure demands), and outcomes (lower mortality, modern governance).',
    'Progressive Era reform was primarily about voting rights, not sanitation.',
    'The passage focuses entirely on public health and sanitation reform — voting rights are not mentioned.',
    'Public health improvements in this era were led by wealthy male political leaders.',
    'The passage explicitly identifies the reformers as women excluded from formal political life.',
  ],
  [
    'rla_main_idea_08.js',
    'Test Ready',
    8,
    `The psychological concept of cognitive dissonance, developed by Leon Festinger in 1957, describes the mental discomfort a person feels when holding two conflicting beliefs or when behaviour contradicts strongly held values. To relieve this discomfort, people typically either change the belief, change the behaviour, or rationalise the inconsistency. Festinger's research showed that people will often go to surprising lengths to rationalise away inconsistency rather than confront the contradiction directly — a finding with broad applications in marketing, politics, and public health behaviour.`,
    'Cognitive dissonance means people always change their behaviour when confronted with contradicting evidence.',
    'The passage says people often rationalise rather than change beliefs or behaviour.',
    "Festinger's cognitive dissonance theory explains how people cope with conflicting beliefs — typically through rationalisation rather than honest self-correction — with implications across multiple fields.",
    'Reflects both the theory and its key empirical finding (rationalisation over correction), plus its broad applicability.',
    'Cognitive dissonance only applies to children and does not affect adult reasoning.',
    'No age limitation is stated or implied anywhere in the passage.',
    "Festinger's work proved that marketing and politics are inherently dishonest fields.",
    'The passage lists these as application areas for the concept — it does not make a normative judgement about those fields.',
  ],
  [
    'rla_main_idea_09.js',
    'Test Ready',
    9,
    `The Marshall Plan, formally the European Recovery Program (1948-1952), provided $13 billion in American economic assistance to rebuild Western European economies devastated by World War II. The plan's architects — Secretary of State George Marshall and undersecretary Dean Acheson — argued that stable, prosperous democracies would resist communist influence. The plan rebuilt European industrial capacity, stabilised currencies, and fostered cooperative institutions that eventually evolved into the European Union. Critics have noted that the plan also served American strategic and economic interests by creating export markets for U.S. goods.`,
    'The Marshall Plan was a purely selfless act of American generosity with no strategic motivation.',
    'The passage explicitly notes the plan served American strategic and economic interests.',
    'The Marshall Plan successfully rebuilt Western Europe while simultaneously advancing American strategic interests and laying institutional groundwork for European cooperation.',
    'Correctly integrates all elements: reconstruction success, strategic motive, and institutional legacy.',
    'Dean Acheson was solely responsible for designing and implementing the Marshall Plan.',
    'Both Marshall and Acheson are credited as architects — singling out Acheson alone misrepresents the passage.',
    'The Marshall Plan directly caused the founding of NATO.',
    'The passage connects the plan to institutions that became the EU — NATO is not mentioned.',
  ],
  [
    'rla_main_idea_10.js',
    'Test Ready',
    10,
    `In ecology, a keystone species is an organism whose impact on its ecosystem is disproportionately large relative to its abundance. The sea otter is a classic example: otters eat sea urchins, which eat kelp. Without otters, urchin populations explode and devour kelp forests that shelter hundreds of species. When otters were hunted nearly to extinction in the 19th century, kelp forests along the Pacific coast collapsed. After conservation efforts allowed otter recovery, kelp ecosystems rebounded dramatically — demonstrating how removing one species can trigger cascading collapse through an entire ecosystem.`,
    'Sea otters are interesting animals, but they have little effect on ocean ecosystems.',
    'The passage uses otters to demonstrate their outsized ecological importance.',
    'The keystone species concept explains how a single species with disproportionate ecological influence can, if removed, trigger cascading collapse throughout an entire ecosystem.',
    'Correctly identifies the passage as an explanation of the keystone species concept, using otters as its example.',
    'Sea otter conservation programs are the most successful conservation efforts in American history.',
    'The passage uses otters as an ecological example — it makes no comparative claim about conservation program success.',
    'Overfishing, not species interdependence, primarily explains declining Pacific fish populations.',
    'Overfishing is not mentioned — the passage attributes kelp forest collapse to loss of the otter keystone species.',
  ],
  [
    'rla_main_idea_11.js',
    'Challenge',
    11,
    `In 1848, Elizabeth Cady Stanton and Lucretia Mott organised the Seneca Falls Convention, the first formal gathering in the United States devoted to women's rights. The convention produced the Declaration of Sentiments — modelled deliberately on the Declaration of Independence — which listed 18 grievances against laws denying women citizenship rights, property ownership, educational access, and the vote. Not all attendees agreed on including suffrage; Mott initially feared it would make the movement appear radical. Frederick Douglass spoke in support of the suffrage resolution, which narrowly passed. The convention launched a 72-year campaign culminating in the 19th Amendment in 1920.`,
    'The Seneca Falls Convention was primarily about property rights, and its suffrage resolution was defeated.',
    'Suffrage was included and narrowly passed — it was not defeated.',
    "The Seneca Falls Convention launched the American women's rights movement with a formal declaration of grievances, including a contested but successful suffrage resolution that began a 72-year campaign ending in the vote.",
    "Integrates all key elements: the founding event, the Declaration, the internal suffrage debate, Douglass's role, and the long arc to 1920.",
    "Lucretia Mott's opposition to suffrage ultimately caused the resolution to fail.",
    "Mott initially objected but the resolution narrowly passed, with Douglass's support.",
    'The 19th Amendment was passed in the immediate years following the Seneca Falls Convention.',
    'The passage states the amendment came 72 years later, in 1920.',
  ],
];

mainIdeaFiles.forEach(
  ([fname, tier, n, passage, wA, rA, wB, rB, wC, rC, wD, rD]) => {
    const qs = n <= 6 ? 10 : n <= 10 ? 11 : 12;
    write(
      fname,
      `
// Reading Comprehension — ${tier}: Practice ${n} / Main Idea & Author's Purpose
// ${qs} questions
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice',
    difficulty: '${n <= 6 ? 'easy' : 'medium'}',
    passage: ${JSON.stringify(passage)},
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: ${JSON.stringify(wA)}, isCorrect: false, rationale: ${JSON.stringify(rA)} },
      { text: ${JSON.stringify(wB)}, isCorrect: true,  rationale: ${JSON.stringify(rB)} },
      { text: ${JSON.stringify(wC)}, isCorrect: false, rationale: ${JSON.stringify(rC)} },
      { text: ${JSON.stringify(wD)}, isCorrect: false, rationale: ${JSON.stringify(rD)} },
    ],
    challenge_tags: ['rla-2'],
  },
];
`
    );
  }
);

console.log('\nRLA batch 2 complete.');
