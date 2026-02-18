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
    passage: "Two public health approaches to obesity:

Approach A focuses on individual responsibility: education campaigns, calorie labelling on menus, and encouraging personal exercise.

Approach B focuses on environmental interventions: taxing sugary beverages, subsidising fresh produce in food deserts, restricting fast food near schools.

A 2022 WHO review found that population-level environmental interventions produced greater reductions in obesity rates than individual-behaviour campaigns alone.",
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
    passage: "A political analyst reviewing a candidate's debate performance notes: 'When asked about her plan to reduce drug prices, Senator Alvarez said: \"My opponent has accepted more than \$2 million in pharmaceutical donations — so you tell me whose side he's on.\" She never actually answered the question about her own plan.'",
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
    passage: "A city transportation director argues: 'Our new traffic signal coordination system reduced average travel times citywide by 18%. This proves that technology, not expanded public transit, is the solution to our congestion problem.'

A transportation planner responds: 'Signal coordination addresses existing vehicle volume but cannot accommodate the growth projected over the next 20 years without capacity being added — either in the form of road lanes, which are physically constrained in our city, or transit.'",
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
    passage: "A report on early childhood education states: 'Children who attended high-quality preschool programmes were 31% less likely to be incarcerated by age 40, 25% more likely to have stable employment, and showed measurably higher lifetime earnings than a matched control group — in a 40-year longitudinal study.'

A school board member argues against funding a new preschool programme: 'We can't afford extra spending right now. And those studies are from the 1960s — the job market is completely different today.'",
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
    passage: "Passage A: 'Extending copyright protection to 95 years after publication is necessary to give creators and their estates the financial incentive to invest in creative work.'

Passage B: 'Excessively long copyright terms have transformed much of 20th-century culture into proprietary assets locked away from adaptation, remixing, and public use. The primary beneficiaries of 95-year terms are corporations, not the original artists — most of whom have died decades before their works enter the public domain.'",
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
    passage: "A manager tells a new employee: 'Our top salesperson, Reyes, works until 9 p.m. every night and never takes a full lunch break. If you want to succeed here, you need to do the same.'

The new employee reflects on the advice.",
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