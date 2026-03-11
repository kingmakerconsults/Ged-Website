// Reading Comprehension  Test Ready: Practice 9 / Main Idea & Author's Purpose
// 10 questions | synthesising multi-source arguments, detecting unstated premises, tone shifts
module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage:
      "The Marshall Plan, formally the European Recovery Program (1948-1952), provided $13 billion in American economic assistance to rebuild Western European economies devastated by World War II. Critics have long debated whether the programme's primary motivation was humanitarian concern, Cold War strategy, or American economic self-interest. Historian Alan Milward argued that European recovery was already underway before Marshall funds arrived, suggesting the programme's importance was political rather than economic  it bound Western Europe to the United States at a moment when Soviet influence was expanding.",
    question: 'What is the main idea of the passage?',
    answerOptions: [
      {
        text: "The Marshall Plan's true significance is debated, with historians questioning whether it served humanitarian, strategic, or economic goals.",
        isCorrect: true,
        rationale:
          "The passage presents a multi-perspective debate and introduces Milward's reinterpretation, making the interpretive controversy the central point.",
      },
      {
        text: 'The Marshall Plan was primarily a humanitarian effort to feed starving European civilians after the war.',
        isCorrect: false,
        rationale:
          'Humanitarian concern is listed as one possible motive, but the passage frames this as one of several competing interpretations rather than the accepted view.',
      },
      {
        text: "The Marshall Plan was the largest aid programme in history and fundamentally rebuilt Europe's infrastructure.",
        isCorrect: false,
        rationale:
          "Scale is implied but not stated, and the passage focuses on the debate over motivation, not the programme's size or achievements.",
      },
      {
        text: 'Alan Milward proved that the Marshall Plan had no meaningful economic impact on Western Europe.',
        isCorrect: false,
        rationale:
          'Milward argued recovery was already underway, but the passage presents his view as one interpretation, not proven fact.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "A school principal writes to parents: 'This year we are eliminating honour roll announcements. Research consistently shows that public recognition of academic achievement motivates students who are already high-performing while discouraging those who are not. We want every student to pursue improvement, not to compare themselves to classmates. We will replace honour roll with individual goal-setting conferences where each student, regardless of starting point, tracks personal progress with a teacher.'",
    question: "What unstated assumption underlies the principal's decision?",
    answerOptions: [
      {
        text: 'Internal motivation through personal growth is more educationally valuable than external motivation based on public comparison.',
        isCorrect: true,
        rationale:
          "The unspoken assumption is that education should optimise for all students' motivation, and that personal growth-based motivation is superior to competition-based motivation.",
      },
      {
        text: 'Public recognition systems like honour rolls primarily benefit students who are already struggling academically.',
        isCorrect: false,
        rationale:
          'The principal says the opposite: honour rolls motivate already high-performing students while discouraging struggling ones.',
      },
      {
        text: 'Individual conferences take less time and cost less money than organising honour roll ceremonies each semester.',
        isCorrect: false,
        rationale:
          'Cost and efficiency are never mentioned; the justification is entirely motivational and educational.',
      },
      {
        text: 'High-performing students will maintain their effort levels even without any form of external recognition or reward.',
        isCorrect: false,
        rationale:
          "The principal doesn't address whether top performers might lose motivation; her concern is about improving outcomes for the broader student body.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "A sociologist writes: 'The \'pull yourself up by your bootstraps\' narrative in American culture serves a double function. For those who succeed, it validates their achievement as purely personal merit. For those who struggle, it transforms structural barriers  discriminatory lending, underfunded schools, lack of healthcare  into personal failures. The narrative is psychologically effective because it simplifies an uncomfortable reality: if success is entirely a matter of effort, then inequality is morally acceptable, and systemic reform is unnecessary.'",
    question:
      "What is the sociologist's central argument about the 'bootstrap' narrative?",
    answerOptions: [
      {
        text: 'The bootstrap narrative functions as ideology, reframing systemic inequality as individual responsibility and eliminating the case for structural reform.',
        isCorrect: true,
        rationale:
          'The argument is that the narrative serves an ideological purpose: it makes inequality feel natural and reform unnecessary by reducing all outcomes to personal effort.',
      },
      {
        text: 'The bootstrap narrative accurately describes how individual effort overcomes most structural obstacles in American society.',
        isCorrect: false,
        rationale:
          "The sociologist argues the narrative exaggerates effort's role and obscures structural barriers like discriminatory lending and underfunded schools.",
      },
      {
        text: 'Hard work and personal determination have never played any meaningful role in individual economic success.',
        isCorrect: false,
        rationale:
          "The sociologist doesn't deny effort contributes to success; she argues the narrative exaggerates effort's role and ignores structural factors.",
      },
      {
        text: 'American culture uniquely promotes individualism, while other Western nations emphasise collective responsibility for outcomes.',
        isCorrect: false,
        rationale:
          'The sociologist analyses one specific narrative, not all of American culture relative to other nations.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      'A museum curator writes: \'When we exhibit African masks in a glass case labelled "Tribal Art, 19th Century," we strip them of their original context  the ceremonies, music, and community participation that gave them meaning. The mask on a pedestal is no longer a mask; it is a sculpture. Our framing turns functional, sacred objects into aesthetic ones, inviting viewers to admire craft while erasing purpose. To display a culture\'s sacred objects as "art" is an act of translation, and like all translations, something essential is lost.\'',
    question:
      'What tension does the curator identify in museum display practices?',
    answerOptions: [
      {
        text: 'Museum display preserves physical objects but destroys their original meaning by removing them from the ceremonial context that defined them.',
        isCorrect: true,
        rationale:
          'The tension is between preservation and decontextualisation: the museum saves the object but fundamentally changes what it is.',
      },
      {
        text: 'Museums intentionally misrepresent African culture by labelling sacred objects as merely decorative artwork from an unspecified era.',
        isCorrect: false,
        rationale:
          'The curator identifies an inherent tension in display, not intentional misrepresentation; the issue is structural, not malicious.',
      },
      {
        text: 'Glass display cases cause long-term physical deterioration of wooden masks because of humidity and temperature fluctuations.',
        isCorrect: false,
        rationale:
          "The curator's concern is conceptual (context removal), not physical (material damage to artefacts).",
      },
      {
        text: 'Western museums should immediately return all non-Western sacred objects to their cultures of origin without exception.',
        isCorrect: false,
        rationale:
          "The curator identifies a tension but doesn't propose repatriation; she observes that display involves unavoidable loss of meaning.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "An environmental lawyer writes: 'The polluter-pays principle sounds straightforward: companies that contaminate bear the cleanup costs. In practice, polluters delay litigation for decades, declare bankruptcy to avoid judgments, and pass costs to consumers through price increases. By the time a court orders cleanup, the original executives have retired with their bonuses, and the contaminated community has lived with poisoned water for a generation. The principle exists on paper; the harm exists in bodies.'",
    question: "What is the lawyer's main argument?",
    answerOptions: [
      {
        text: 'The polluter-pays principle fails in practice because legal and financial mechanisms allow corporations to evade accountability while communities absorb the harm.',
        isCorrect: true,
        rationale:
          'The argument is about the gap between legal principle and lived reality: companies use delay, bankruptcy, and cost-passing to avoid true accountability.',
      },
      {
        text: 'The polluter-pays principle is a fundamentally flawed concept that should be replaced with direct government-funded environmental cleanup programs.',
        isCorrect: false,
        rationale:
          "The lawyer doesn't argue against the principle itself; she argues it fails in implementation due to enforcement gaps.",
      },
      {
        text: 'Environmental contamination rarely causes serious harm to communities because modern water treatment eliminates most pollutants before exposure.',
        isCorrect: false,
        rationale:
          'The lawyer explicitly describes communities living with poisoned water for a generation, directly contradicting this claim.',
      },
      {
        text: 'Corporate executives hold personal responsibility but face criminal charges that effectively deter future environmental violations.',
        isCorrect: false,
        rationale:
          'The lawyer describes executives retiring with bonuses, showing they escape personal consequences rather than facing deterrent punishment.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "A historian notes: 'The GI Bill of 1944 is often celebrated as the programme that created the American middle class, providing returning veterans with college education, job training, and home loans. What is less frequently discussed is that the programme\'s benefits were administered through local agencies that routinely denied Black veterans access. White veterans used GI Bill home loans to buy houses in newly built suburbs; Black veterans were steered to overcrowded urban neighbourhoods or denied loans entirely. The same programme that built white middle-class wealth deepened the racial wealth gap.'",
    question: "What is the historian's main purpose in this passage?",
    answerOptions: [
      {
        text: 'To complicate the celebration of the GI Bill by showing its benefits were distributed along racial lines, deepening existing inequality.',
        isCorrect: true,
        rationale:
          "The historian's purpose is revisionist: she adds the racial dimension that the conventional 'created the middle class' narrative omits.",
      },
      {
        text: 'To argue that the GI Bill was entirely unsuccessful and should never have been enacted by the federal government.',
        isCorrect: false,
        rationale:
          "The historian acknowledges the Bill built white middle-class wealth; her critique targets discriminatory implementation, not the programme's existence.",
      },
      {
        text: 'To explain the detailed process of how federal home loan applications were submitted and approved during the 1940s.',
        isCorrect: false,
        rationale:
          'Home loans are mentioned as one GI Bill benefit, but the passage analyses racial discrimination, not loan application mechanics.',
      },
      {
        text: 'To demonstrate that local agencies faithfully implemented the GI Bill according to its intended design for all veterans.',
        isCorrect: false,
        rationale:
          "The passage shows the opposite: local agencies routinely denied Black veterans access, undermining the programme's stated universality.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "A technology ethicist writes: 'Social media platforms are often compared to public squares  neutral spaces where anyone can speak. But a public square has no algorithm determining whose voice is amplified. A public square does not profit from outrage. A public square does not know your political affiliation, recent purchases, or relationship status and use that information to decide what you see. The comparison flatters platforms by borrowing the legitimacy of a democratic institution while obscuring the commercial logic that actually governs their operation.'",
    question: 'What argumentative strategy does the ethicist use?',
    answerOptions: [
      {
        text: "She dismantles the 'public square' analogy by listing features of social media that have no equivalent in actual public squares.",
        isCorrect: true,
        rationale:
          'The strategy is point-by-point analogy destruction: she accepts the comparison, then shows how each relevant feature differs from the reality of platforms.',
      },
      {
        text: 'She endorses the public square comparison and uses it to argue that social media deserves the same legal protections as public forums.',
        isCorrect: false,
        rationale:
          'She deconstructs the comparison to undermine it, not to endorse or extend it to legal protections.',
      },
      {
        text: 'She provides statistical evidence from research studies showing that social media algorithms increase political polarisation.',
        isCorrect: false,
        rationale:
          'She uses logical comparison and rhetorical analysis, not statistical evidence from studies.',
      },
      {
        text: 'She argues that traditional public squares should adopt algorithmic systems to become more efficient at distributing information.',
        isCorrect: false,
        rationale:
          'The argument flows in the opposite direction: she critiques platforms for lacking the neutrality of public squares, not the reverse.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "A policy analyst writes: 'Mandatory minimum sentencing was sold to the public as \'tough on crime\'  ensuring that all offenders received serious punishment regardless of circumstances. Thirty years later, the data shows that mandatory minimums did not reduce crime rates, did overpopulate prisons at enormous taxpayer expense, and did disproportionately affect Black and Latino defendants who were more likely to be charged with offences carrying mandatory terms. The policy achieved consistency by sacrificing justice  treating a first-time drug courier the same as a cartel leader.'",
    question:
      "What does the analyst mean by 'achieved consistency by sacrificing justice'?",
    answerOptions: [
      {
        text: 'Mandatory minimums ensured uniform sentences but removed the ability to distinguish between vastly different circumstances, producing disproportionate outcomes.',
        isCorrect: true,
        rationale:
          'The tradeoff is explicit: mandatory minimums eliminated sentencing variation (consistency) at the cost of proportionality (justice).',
      },
      {
        text: 'Mandatory minimums successfully reduced crime rates while creating minor administrative challenges for the court system.',
        isCorrect: false,
        rationale:
          'The analyst states mandatory minimums did not reduce crime rates, directly contradicting this claim.',
      },
      {
        text: 'The policy achieved both consistency and justice by ensuring that identical crimes received identical sentences across all jurisdictions.',
        isCorrect: false,
        rationale:
          'The analyst explicitly states the policy sacrificed justice; treating a first-time courier like a cartel leader illustrates the injustice.',
      },
      {
        text: 'Sentencing judges appreciated mandatory minimums because the guidelines simplified their workload and eliminated appeals.',
        isCorrect: false,
        rationale:
          'The analyst describes mandatory minimums as removing judicial discretion, which represents a loss of case-by-case reasoning, not a welcomed simplification.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "A short story begins: 'Mrs. Chen kept the garden exactly as Mr. Chen had left it  the roses pruned to his specifications, the same brand of fertiliser, the walking path swept clear every morning at seven. Neighbours praised her dedication. Only her daughter knew that Mrs. Chen had always hated gardening. She maintained the garden not out of love for the plants, but because abandoning it would mean accepting a change she could not yet name.'",
    question:
      "What narrative technique does the author use to reveal Mrs. Chen's inner state?",
    answerOptions: [
      {
        text: 'The author contrasts public perception with private reality, using the gap between what neighbours see and what the daughter knows to reveal grief.',
        isCorrect: true,
        rationale:
          'The technique is dramatic irony through layered perception: neighbours see dedication, daughter knows avoidance, reader synthesises both as grief.',
      },
      {
        text: 'The author has Mrs. Chen explain her complicated feelings about gardening directly through an extended dialogue with her daughter.',
        isCorrect: false,
        rationale:
          "Mrs. Chen doesn't speak in the passage; her state is revealed through action and the daughter's knowledge, not dialogue.",
      },
      {
        text: "The author uses a series of flashbacks to Mr. Chen's life, showing how he originally planted and designed the garden.",
        isCorrect: false,
        rationale:
          'No flashbacks appear in the passage; it stays in the present while referencing past details.',
      },
      {
        text: "The garden clearly symbolises Mrs. Chen's happiness and contentment with her current stage of life after loss.",
        isCorrect: false,
        rationale:
          "The garden symbolises stasis and avoidance; Mrs. Chen hates it but maintains it to resist confronting her husband's absence.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "An economic historian writes: 'The 2008 financial crisis is often narrated as a failure of individual greed  reckless bankers pursuing personal bonuses. This narrative is emotionally satisfying but analytically incomplete. The crisis was systemic: rating agencies had financial incentives to approve bad loans, regulators had been stripped of enforcement power by decades of deregulation, and consumers were offered mortgages designed to be unaffordable because the lenders planned to sell the risk before it materialised. Blaming individuals obscures the architecture of a system designed to distribute risk downward while concentrating profit upward.'",
    question:
      "What is the historian's central argument about how the 2008 crisis should be understood?",
    answerOptions: [
      {
        text: 'The crisis was a systemic failure, not just individual greed, because incentive structures and regulatory gaps enabled reckless behaviour at every level.',
        isCorrect: true,
        rationale:
          'The historian argues individual blame is analytically incomplete without understanding the system that incentivised and enabled the behaviour.',
      },
      {
        text: 'Individual bankers were entirely innocent victims who were forced by government regulations to make risky lending decisions.',
        isCorrect: false,
        rationale:
          "The historian doesn't absolve individuals; she argues individual blame alone is insufficient without systemic analysis.",
      },
      {
        text: 'Financial deregulation consistently strengthens economic stability by removing bureaucratic obstacles to efficient market operations.',
        isCorrect: false,
        rationale:
          'The historian identifies deregulation as a contributing cause of the crisis, arguing it stripped regulators of enforcement power.',
      },
      {
        text: 'The 2008 crisis was an unpredictable event that no regulatory framework or oversight system could have anticipated or prevented.',
        isCorrect: false,
        rationale:
          'By identifying specific systemic causes, the historian implies that structural reforms could have reduced or prevented the crisis.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
];
