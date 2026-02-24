// Reading Comprehension  Test Ready: Practice 9 / Main Idea & Author's Purpose
// 10 questions | synthesising multi-source arguments, detecting unstated premises, tone shifts
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "The Marshall Plan, formally the European Recovery Program (1948-1952), provided $13 billion in American economic assistance to rebuild Western European economies devastated by World War II. Critics have long debated whether the programme's primary motivation was humanitarian concern, Cold War strategy, or American economic self-interest. Historian Alan Milward argued that European recovery was already underway before Marshall funds arrived, suggesting the programme's importance was political rather than economic  it bound Western Europe to the United States at a moment when Soviet influence was expanding.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "The Marshall Plan was the largest aid programme in history.", isCorrect: false, rationale: "Scale is implied but not stated, and the passage's focus is on the debate over motivation, not the programme's size." },
      { text: "The Marshall Plan's significance is debated: while it provided substantial aid, historians argue over whether its primary function was humanitarian, strategic, or economic  and some evidence suggests its political value in binding Europe to the U.S. may have mattered more than its economic impact.", isCorrect: true, rationale: "The passage presents a multi-perspective debate and introduces Milward's specific reinterpretation, making the interpretive controversy the central point." },
      { text: "Alan Milward was wrong about European recovery.", isCorrect: false, rationale: "The passage presents Milward's view without judging it right or wrong." },
      { text: "The Soviet Union benefited from the Marshall Plan.", isCorrect: false, rationale: "The passage describes the Plan as countering Soviet influence, not benefiting the USSR." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "A school principal writes to parents: 'This year we are eliminating honour roll announcements. Research consistently shows that public recognition of academic achievement motivates students who are already high-performing while discouraging those who are not. We want every student to pursue improvement, not to compare themselves to classmates. We will replace honour roll with individual goal-setting conferences where each student, regardless of starting point, tracks personal progress with a teacher.'",
    question: "What unstated assumption underlies the principal's decision?",
    answerOptions: [
      { text: "High-performing students will stop trying without honour roll.", isCorrect: false, rationale: "The principal doesn't address whether high performers might stop trying  her concern is for everyone else." },
      { text: "The principal assumes that internal motivation driven by personal progress is more educationally valuable than external motivation driven by public comparison  and that the majority of students, not just top achievers, should be the target of motivational strategies.", isCorrect: true, rationale: "The unspoken assumption is that education should optimise for all students' motivation, and that personal growth-based motivation is superior to competition-based motivation. This assumption drives the policy change." },
      { text: "Individual conferences are cheaper than honour roll ceremonies.", isCorrect: false, rationale: "Cost is not mentioned  the justification is motivational, not financial." },
      { text: "All students are equally capable of academic achievement.", isCorrect: false, rationale: "The principal acknowledges different starting points  the goal is personal improvement, which implies varying abilities." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A sociologist writes: 'The 'pull yourself up by your bootstraps' narrative in American culture serves a double function. For those who succeed, it validates their achievement as purely personal merit. For those who struggle, it transforms structural barriers  discriminatory lending, underfunded schools, lack of healthcare  into personal failures. The narrative is psychologically effective because it simplifies an uncomfortable reality: if success is entirely a matter of effort, then inequality is morally acceptable, and systemic reform is unnecessary.'",
    question: "What is the sociologist's central argument about the 'bootstrap' narrative?",
    answerOptions: [
      { text: "Hard work never leads to success.", isCorrect: false, rationale: "The sociologist doesn't deny that effort contributes to success  she argues the narrative exaggerates effort's role and ignores structural factors." },
      { text: "The bootstrap narrative functions as an ideology that reframes systemic inequality as individual responsibility  making those who benefit feel deserving and those who suffer feel culpable, while eliminating the case for structural reform by defining all outcomes as earned.", isCorrect: true, rationale: "The argument is that the narrative serves an ideological purpose: it makes inequality feel natural and reform feel unnecessary by reducing all outcomes to personal effort." },
      { text: "American culture is entirely individualistic.", isCorrect: false, rationale: "The sociologist analyses one narrative  she doesn't characterise all of American culture." },
      { text: "Systemic reform always fails.", isCorrect: false, rationale: "The sociologist argues the narrative prevents reform from being demanded  she doesn't argue reform fails when attempted." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A museum curator writes: 'When we exhibit African masks in a glass case labelled "Tribal Art, 19th Century," we strip them of their original context  the ceremonies, music, and community participation that gave them meaning. The mask on a pedestal is no longer a mask; it is a sculpture. Our framing turns functional, sacred objects into aesthetic ones, inviting viewers to admire craft while erasing purpose. To display a culture's sacred objects as "art" is an act of translation, and like all translations, something essential is lost.'",
    question: "What tension does the curator identify in museum display practices?",
    answerOptions: [
      { text: "Museums should never display objects from other cultures.", isCorrect: false, rationale: "The curator identifies a tension, not a prohibition  she doesn't say museums should stop, but that display involves loss." },
      { text: "Museum display transforms functional, context-dependent sacred objects into decontextualised aesthetic objects  preserving material form while erasing ceremonial meaning, which means the act of exhibition simultaneously educates and distorts.", isCorrect: true, rationale: "The tension is between preservation and decontextualisation. The museum saves the physical object but changes what it is by removing it from its living context." },
      { text: "Glass cases damage artefacts over time.", isCorrect: false, rationale: "The curator's concern is conceptual (context removal), not physical (material damage)." },
      { text: "All museum labels are inaccurate.", isCorrect: false, rationale: "The curator critiques the label's reductive framing, not factual inaccuracy." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "An environmental lawyer writes: 'The polluter-pays principle sounds straightforward: companies that contaminate bear the cleanup costs. In practice, polluters delay litigation for decades, declare bankruptcy to avoid judgments, and pass costs to consumers through price increases. By the time a court orders cleanup, the original executives have retired with their bonuses, and the contaminated community has lived with poisoned water for a generation. The principle exists on paper; the harm exists in bodies.'",
    question: "What is the lawyer's main argument?",
    answerOptions: [
      { text: "The polluter-pays principle should be abolished.", isCorrect: false, rationale: "The lawyer doesn't argue against the principle  she argues it fails in practice due to enforcement gaps." },
      { text: "The polluter-pays principle fails in practice because legal and financial mechanisms allow companies to evade or delay accountability  meaning the actual costs of pollution are borne by contaminated communities in the form of health damage while corporate decision-makers escape personal consequences.", isCorrect: true, rationale: "The argument is about the gap between legal principle and lived reality. The principle assigns costs to polluters theoretically; in practice, communities absorb the harm while corporations use delay, bankruptcy, and cost-passing to avoid true accountability." },
      { text: "All corporations are criminal organisations.", isCorrect: false, rationale: "The lawyer describes specific evasion strategies  she doesn't characterise all corporations as criminal." },
      { text: "Courts should process environmental cases faster.", isCorrect: false, rationale: "Speed of litigation is one issue mentioned, but the argument encompasses broader systemic failures beyond just timing." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A historian notes: 'The GI Bill of 1944 is often celebrated as the programme that created the American middle class, providing returning veterans with college education, job training, and home loans. What is less frequently discussed is that the programme's benefits were administered through local agencies that routinely denied Black veterans access. White veterans used GI Bill home loans to buy houses in newly built suburbs; Black veterans were steered to overcrowded urban neighbourhoods or denied loans entirely. The same programme that built white middle-class wealth deepened the racial wealth gap.'",
    question: "What is the historian's main purpose in this passage?",
    answerOptions: [
      { text: "To argue that the GI Bill should not have been enacted.", isCorrect: false, rationale: "The historian doesn't oppose the Bill's existence  she critiques its discriminatory implementation." },
      { text: "To complicate the conventional celebration of the GI Bill by revealing that its benefits were distributed along racial lines  making it simultaneously a wealth-building programme for white veterans and a mechanism that excluded Black veterans and deepened existing inequality.", isCorrect: true, rationale: "The historian's purpose is revisionist: she doesn't deny the GI Bill's importance but adds the racial dimension that the 'created the middle class' narrative typically omits." },
      { text: "To explain how home loans work.", isCorrect: false, rationale: "Home loans are mentioned as one GI Bill benefit  the passage's purpose is historical race analysis, not loan mechanics." },
      { text: "To celebrate the GI Bill's success.", isCorrect: false, rationale: "The passage opens by noting the 'celebration' and then complicates it  the purpose is critique, not celebration." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A technology ethicist writes: 'Social media platforms are often compared to public squares  neutral spaces where anyone can speak. But a public square has no algorithm determining whose voice is amplified. A public square does not profit from outrage. A public square does not know your political affiliation, recent purchases, or relationship status and use that information to decide what you see. The comparison flatters platforms by borrowing the legitimacy of a democratic institution while obscuring the commercial logic that actually governs their operation.'",
    question: "What argumentative strategy does the ethicist use?",
    answerOptions: [
      { text: "She compares social media platforms to public squares to praise them.", isCorrect: false, rationale: "She deconstructs the comparison to undermine it, not to praise platforms." },
      { text: "She systematically dismantles the 'public square' analogy by listing specific features of social media  algorithmic amplification, profit from outrage, personal data exploitation  that have no equivalent in an actual public square, exposing the comparison as a strategic frame that conceals platforms' commercial nature behind democratic language.", isCorrect: true, rationale: "The strategy is point-by-point analogy destruction: she accepts the comparison, then shows how each relevant feature of the compared object (public square) differs from the reality of the platform." },
      { text: "She argues that public squares should be regulated like social media.", isCorrect: false, rationale: "The argument flows in the opposite direction  she says platforms should not be given the benefit of the public-square frame." },
      { text: "She believes all technology is harmful.", isCorrect: false, rationale: "She critiques a specific analogy used to protect platforms  not technology generally." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A policy analyst writes: 'Mandatory minimum sentencing was sold to the public as 'tough on crime'  ensuring that all offenders received serious punishment regardless of circumstances. Thirty years later, the data shows that mandatory minimums did not reduce crime rates, did overpopulate prisons at enormous taxpayer expense, and did disproportionately affect Black and Latino defendants who were more likely to be charged with offences carrying mandatory terms. The policy achieved consistency by sacrificing justice  treating a first-time drug courier the same as a cartel leader.'",
    question: "What does the analyst mean by 'achieved consistency by sacrificing justice'?",
    answerOptions: [
      { text: "Justice and consistency are always identical.", isCorrect: false, rationale: "The analyst's point is precisely that they conflict  consistency in sentencing doesn't equal just outcomes." },
      { text: "Mandatory minimums ensured that all offenders of the same charge received the same sentence (consistency), but by removing judges' ability to consider individual circumstances  role in the crime, intent, personal history  the policy treated vastly different situations identically, producing outcomes that were uniform but frequently disproportionate.", isCorrect: true, rationale: "The tradeoff is explicit: mandatory minimums eliminated sentencing variation (consistency) at the cost of proportionality (justice). The drug courier vs. cartel leader example makes the absurdity concrete." },
      { text: "The analyst supports longer prison sentences.", isCorrect: false, rationale: "The analyst argues mandatory minimums failed  she doesn't advocate for more incarceration." },
      { text: "All drug offenders should receive the same sentence.", isCorrect: false, rationale: "This is exactly the position the analyst critiques  she argues circumstances should matter." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A short story begins: 'Mrs. Chen kept the garden exactly as Mr. Chen had left it  the roses pruned to his specifications, the same brand of fertiliser, the walking path swept clear every morning at seven. Neighbours praised her dedication. Only her daughter knew that Mrs. Chen had always hated gardening. She maintained the garden not out of love for the plants, but because abandoning it would mean accepting a change she could not yet name.'",
    question: "What narrative technique does the author use to reveal Mrs. Chen's inner state?",
    answerOptions: [
      { text: "The author has Mrs. Chen explain her feelings in dialogue.", isCorrect: false, rationale: "Mrs. Chen doesn't speak in the passage  her state is revealed through action and the daughter's knowledge." },
      { text: "The author creates a gap between public perception (neighbours see dedication) and private reality (the daughter knows Mrs. Chen hates gardening), using the discrepancy to reveal that Mrs. Chen's garden maintenance is a grief ritual  not devotion to gardening but resistance to accepting her husband's permanent absence.", isCorrect: true, rationale: "The technique is dramatic irony through layered perception: the neighbours see one thing, the daughter knows another, and the reader synthesises both to understand the emotional truth  maintaining the garden preserves the fiction that nothing has changed." },
      { text: "The author uses flashbacks to Mr. Chen's life.", isCorrect: false, rationale: "No flashbacks appear  the passage stays in the present with context about the past." },
      { text: "The garden symbolises happiness.", isCorrect: false, rationale: "The garden symbolises stasis and avoidance  Mrs. Chen hates it but maintains it to avoid confronting loss." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "An economic historian writes: 'The 2008 financial crisis is often narrated as a failure of individual greed  reckless bankers pursuing personal bonuses. This narrative is emotionally satisfying but analytically incomplete. The crisis was systemic: rating agencies had financial incentives to approve bad loans, regulators had been stripped of enforcement power by decades of deregulation, and consumers were offered mortgages designed to be unaffordable because the lenders planned to sell the risk before it materialised. Blaming individuals obscures the architecture of a system designed to distribute risk downward while concentrating profit upward.'",
    question: "What is the historian's central argument about how the 2008 crisis should be understood?",
    answerOptions: [
      { text: "Individual bankers were innocent victims of the system.", isCorrect: false, rationale: "The historian doesn't absolve individuals  she argues individual blame is incomplete without systemic analysis." },
      { text: "The crisis should be understood as a systemic failure rather than a collection of individual moral failings  the incentive structures, regulatory gaps, and risk-distribution mechanisms created a system in which the eventual collapse was built into the architecture, making the 'greedy bankers' narrative true but insufficient.", isCorrect: true, rationale: "The historian's argument is analytical: greed existed, but it operated within a system that rewarded recklessness at every level. Focusing on individuals misses the structure that enabled and incentivised their behaviour." },
      { text: "Deregulation is always good for the economy.", isCorrect: false, rationale: "The historian identifies deregulation as a contributing cause of the crisis  the opposite of this claim." },
      { text: "Financial crises can never be prevented.", isCorrect: false, rationale: "By identifying systemic causes, the historian implies systemic reforms could reduce future risk." },
    ],
    challenge_tags: ['rla-2'],
  },
];
