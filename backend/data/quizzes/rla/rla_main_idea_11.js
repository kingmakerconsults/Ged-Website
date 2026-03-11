// Reading Comprehension  Challenge: Practice 11 / Main Idea & Author's Purpose
// 10 questions | primary-source rhetoric, competing scholarly interpretations, advanced synthesis
module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "In 1848, Elizabeth Cady Stanton and Lucretia Mott organised the Seneca Falls Convention, the first formal gathering in the United States devoted to women's rights. The convention produced the Declaration of Sentiments, modelled on the Declaration of Independence, which stated: 'We hold these truths to be self-evident: that all men and women are created equal.' By deliberately echoing the nation's founding document, Stanton framed women's suffrage not as a radical demand but as an unfulfilled promise  arguing that the founders' principles, honestly applied, required women's political participation.",
    question:
      'Why did Stanton model the Declaration of Sentiments on the Declaration of Independence?',
    answerOptions: [
      {
        text: "By grounding women's rights in the founders' own language, Stanton made opponents choose between rejecting equality and rejecting principles they claimed to revere.",
        isCorrect: true,
        rationale:
          "The rhetorical strategy used the audience's own stated principles against them, framing suffrage as a logical extension of 'all men are created equal.'",
      },
      {
        text: 'Stanton believed the original Declaration of Independence was poorly written and needed significant literary improvement.',
        isCorrect: false,
        rationale:
          "Stanton built on the Declaration's authority; she critiqued its incomplete application to women, not its literary quality.",
      },
      {
        text: 'She could not develop an original format for the document because the convention was organised on very short notice.',
        isCorrect: false,
        rationale:
          'The parallel was a deliberate rhetorical strategy, not a failure of imagination or time constraint.',
      },
      {
        text: "The Seneca Falls Convention was primarily devoted to abolishing slavery rather than advancing women's political rights.",
        isCorrect: false,
        rationale:
          "While some attendees were abolitionists, the convention was specifically devoted to women's rights, as the passage states.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "Philosopher John Rawls proposed a thought experiment called the 'veil of ignorance': imagine designing a society's rules without knowing what position you will occupy in it  your race, class, gender, talent, or disability. Rawls argued that rational people behind this veil would choose principles that protect the worst-off members, because anyone might end up in that position. Critics object that the experiment is impossible  people cannot truly strip away their identities  and that Rawls assumes risk-averse reasoning when many people would gamble on being in the elite. Nonetheless, the thought experiment remains influential for exposing how self-interest distorts ideas of fairness.",
    question:
      "What is the main purpose of Rawls's 'veil of ignorance' thought experiment?",
    answerOptions: [
      {
        text: 'To expose how self-interest shapes fairness judgements by asking what rules people would endorse without knowing their own social position.',
        isCorrect: true,
        rationale:
          "The veil separates genuine fairness from self-interested fairness: if you'd only endorse a rule knowing it benefits you, the rule isn't truly fair.",
      },
      {
        text: 'To prove that all human beings are born with naturally equal abilities and therefore deserve identical economic outcomes.',
        isCorrect: false,
        rationale:
          "Rawls's experiment is about designing fair rules, not asserting natural equality; he acknowledges differences in talent and ability.",
      },
      {
        text: 'To demonstrate that risk-averse people are always more rational and morally superior to those who are willing to gamble.',
        isCorrect: false,
        rationale:
          "The passage notes that critics challenge Rawls's assumption of risk-aversion; the passage doesn't endorse it as always rational.",
      },
      {
        text: "To propose a practical plan for completely rebuilding society's institutions from scratch based on philosophical principles.",
        isCorrect: false,
        rationale:
          'The veil is a thought experiment for testing principles of fairness, not a practical proposal to rebuild society.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "Sociologist Erving Goffman's 'dramaturgical' theory proposed that social life is fundamentally performative: people present different versions of themselves depending on the audience, like actors on a stage. Goffman distinguished between 'front stage' behaviour (public performance calibrated to social expectations) and 'backstage' behaviour (the unguarded self visible to intimates). A job interview, for example, is a front-stage performance; complaining about the interview afterward with friends is backstage. Goffman's insight was not that people are dishonest but that identity itself is social and situational  there is no essential, context-free 'true self' behind the performances.",
    question:
      "What does Goffman's theory imply about the concept of authenticity?",
    answerOptions: [
      {
        text: "If identity is inherently performative and context-dependent, then the idea of a single 'authentic self' independent of social context is an illusion.",
        isCorrect: true,
        rationale:
          "Goffman's theory destabilises the 'true self' concept: if every context elicits a different version, selfhood is social, not fixed.",
      },
      {
        text: 'People should always display completely honest behaviour in every situation to achieve true personal authenticity.',
        isCorrect: false,
        rationale:
          "Goffman doesn't make moral prescriptions about honesty; he describes how identity actually functions in social situations.",
      },
      {
        text: 'Job interviews are the only meaningful example of performative behaviour because all other social interactions are genuine.',
        isCorrect: false,
        rationale:
          "The interview is one example; Goffman's theory applies to all social interaction, including family, friendships, and casual encounters.",
      },
      {
        text: "Backstage behaviour is always morally superior to front-stage behaviour because it reveals the person's true character.",
        isCorrect: false,
        rationale:
          'Goffman describes two modes of social interaction without ranking their moral value; both are genuine social performances.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "Rachel Carson's Silent Spring (1962) warned that widespread pesticide use was poisoning ecosystems and threatening human health. The chemical industry responded with a sustained campaign to discredit Carson personally  calling her 'hysterical,' noting she was unmarried (implying emotional instability), and questioning her qualifications despite her master's degree in zoology and career at the U.S. Fish and Wildlife Service. The attacks reveal a pattern: when scientific evidence threatens industrial profit, the response often targets the scientist's character rather than the science. Carson's research was eventually vindicated; DDT was banned in 1972.",
    question:
      "What does the passage argue about the chemical industry's response to Carson?",
    answerOptions: [
      {
        text: "The industry used ad hominem attacks targeting Carson's gender and personal life rather than engaging with her scientific evidence.",
        isCorrect: true,
        rationale:
          'The passage identifies specific personal attacks (hysterical, unmarried, unqualified) and frames them as a general pattern of attacking the messenger to avoid the evidence.',
      },
      {
        text: "The industry successfully disproved Carson's scientific claims about pesticide harm through rigorous independent laboratory research.",
        isCorrect: false,
        rationale:
          'The passage states Carson was eventually vindicated and DDT was banned; the industry attacks were personal, not scientific.',
      },
      {
        text: "Carson's lack of formal scientific credentials meant the industry's criticisms of her qualifications were largely justified.",
        isCorrect: false,
        rationale:
          "The passage emphasises Carson held a master's degree in zoology and worked at the U.S. Fish and Wildlife Service, contradicting claims about her qualifications.",
      },
      {
        text: 'All scientific research is eventually vindicated regardless of its methodology or the quality of evidence involved.',
        isCorrect: false,
        rationale:
          "Carson's vindication is specific to her case; the passage doesn't generalise about all scientific research being eventually proved correct.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "Economist Ha-Joon Chang argues that wealthy nations practice 'kicking away the ladder'  using protectionist policies (tariffs, subsidies, industrial planning) to build their economies, then demanding that developing countries adopt free-trade policies that prevent them from using the same tools. Chang notes that the United States had some of the world's highest tariffs during its industrialisation in the 19th century, and that Britain used aggressive trade protections before becoming the world's largest advocate of free trade. The historical record, he argues, shows that today's free-trade orthodoxy contradicts the actual development strategies of the countries promoting it.",
    question:
      "What is Chang's central argument about the relationship between trade policy and economic development?",
    answerOptions: [
      {
        text: 'Wealthy nations industrialised using protectionism but now demand free trade from developing nations, creating a hypocritical double standard.',
        isCorrect: true,
        rationale:
          "Chang's 'kicking away the ladder' means removing the tools of development after you've already climbed; the historical record contradicts the current free-trade orthodoxy.",
      },
      {
        text: 'Free trade has consistently been the most effective development strategy for every country throughout all periods of modern economic history.',
        isCorrect: false,
        rationale:
          'Chang argues the opposite: historically successful countries industrialised behind protectionist barriers before promoting free trade.',
      },
      {
        text: 'Tariffs are universally beneficial for every country at every stage of development and should always be maintained permanently.',
        isCorrect: false,
        rationale:
          "Chang argues tariffs were tools of development at specific stages, not that they're universally beneficial in all contexts and times.",
      },
      {
        text: 'Britain consistently practiced free trade throughout its economic history and never relied on protectionist policies during industrialisation.',
        isCorrect: false,
        rationale:
          "The passage explicitly states Britain used 'aggressive trade protections' before becoming a free-trade advocate.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "Michel Foucault's analysis of the Panopticon  Jeremy Bentham's design for a prison in which inmates could be observed at all times without knowing when they were being watched  served as a metaphor for modern disciplinary power. Foucault argued that the Panopticon's genius was that inmates internalised the surveillance and began to monitor their own behaviour, making the actual presence of a guard unnecessary. He extended this logic to schools, hospitals, and workplaces, arguing that modern institutions discipline subjects not primarily through physical force but through the creation of environments in which people regulate themselves.",
    question:
      'What does Foucault argue about how power operates in modern institutions?',
    answerOptions: [
      {
        text: 'Modern power works through internalised surveillance: people regulate their own behaviour because institutional environments create conditions for self-discipline.',
        isCorrect: true,
        rationale:
          'The Panopticon model shows that visibility itself is disciplinary; when you might be watched, you behave as if you are watched.',
      },
      {
        text: 'Modern institutions rely primarily on physical force and direct punishment to control the behaviour of individuals within them.',
        isCorrect: false,
        rationale:
          "Foucault's argument is precisely the opposite: modern power works through self-regulation, not physical force.",
      },
      {
        text: 'Jeremy Bentham successfully built the most important prison in history, which became the model for all subsequent correctional facilities.',
        isCorrect: false,
        rationale:
          'The Panopticon was a design concept, not a built prison; Foucault used it as a metaphor for power, not a historical case study.',
      },
      {
        text: 'Surveillance technology should be banned across all institutions because it inevitably leads to totalitarian control of populations.',
        isCorrect: false,
        rationale:
          "Foucault analysed how surveillance power works; he didn't propose policy prescriptions about banning technology.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "Historian Eric Williams argued in Capitalism and Slavery (1944) that the abolition of slavery in the British Empire was driven not by humanitarian sentiment but by economic calculation. As the sugar economy declined and free-labour industrial capitalism became more profitable, the economic rationale for slavery weakened. Williams did not deny that abolitionists were sincere; he argued that they gained political traction only when economic conditions made abolition financially convenient for the ruling class. 'The saints did not need to be told that the colonial system was out of date,' Williams wrote. 'They were told by the economists.'",
    question:
      "How does Williams's argument complicate the traditional narrative of abolition?",
    answerOptions: [
      {
        text: 'Williams shifts focus from moral progress to economic context, arguing abolitionists succeeded when slavery became less profitable than free labour.',
        isCorrect: true,
        rationale:
          'The complication is about causation: the traditional narrative credits moral awakening; Williams credits economic transformation and timing.',
      },
      {
        text: 'Williams argues that abolitionists were entirely insincere and only pretended to oppose slavery for personal political advancement.',
        isCorrect: false,
        rationale:
          "Williams explicitly states he does not deny abolitionists' sincerity; he questions why they succeeded when they did.",
      },
      {
        text: 'The British Empire abolished slavery purely for altruistic humanitarian reasons without any consideration of economic factors.',
        isCorrect: false,
        rationale:
          'This is the traditional narrative that Williams specifically challenges with his economic analysis.',
      },
      {
        text: 'Slavery was never economically profitable at any point during the British colonial sugar trade in the Caribbean.',
        isCorrect: false,
        rationale:
          "Williams's argument assumes slavery was highly profitable during the sugar economy; it became less profitable, which enabled abolition.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "Psychologist Carol Dweck distinguishes between a 'fixed mindset'  the belief that intelligence and talent are innate and unchangeable  and a 'growth mindset'  the belief that abilities develop through effort, strategy, and learning from failure. Dweck's research showed that children praised for being 'smart' tended to avoid challenging tasks to protect their identity, while children praised for effort sought harder problems. Critics note that Dweck's framework has been oversimplified in popular culture: schools that merely post 'growth mindset' posters without changing assessment structures or teaching practices see no improvement, suggesting the concept requires institutional support, not just individual belief.",
    question:
      "How does the critics' observation refine the growth mindset concept?",
    answerOptions: [
      {
        text: 'Growth mindset requires systemic support through changed assessment structures and practices, not just individual belief changes or motivational messaging.',
        isCorrect: true,
        rationale:
          'The refinement is about level of intervention: the psychological mechanism works when embedded in supportive institutional systems, not when reduced to slogans.',
      },
      {
        text: "The critics definitively prove that Dweck's entire growth mindset framework is completely false and should be abandoned.",
        isCorrect: false,
        rationale:
          "The critics refine the concept by showing it's insufficient alone; they don't claim it's false, just oversimplified in application.",
      },
      {
        text: 'Motivational posters in classrooms are an effective educational intervention that consistently improves student academic performance.',
        isCorrect: false,
        rationale:
          "The critics explicitly use poster-only interventions as an example of the concept's failure when oversimplified.",
      },
      {
        text: 'Praising children for being smart is the most effective way to encourage them to seek out increasingly challenging academic tasks.',
        isCorrect: false,
        rationale:
          "Dweck's research found the opposite: 'smart' praise was counterproductive; effort praise was more effective at encouraging challenge-seeking.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "In a 1963 letter from Birmingham jail, Martin Luther King Jr. responded to white clergymen who called his protests 'untimely.' King wrote: 'For years now I have heard the word \"Wait!\" It rings in the ear of every Negro with piercing familiarity. This \"Wait\" has almost always meant \"Never.\"' King argued that the clergymen\'s desire for order over justice revealed a preference for negative peace  the absence of tension  over positive peace  the presence of justice. He noted that 'the Negro\'s great stumbling block in the stride toward freedom is not the White Citizen\'s Counciler or the Ku Klux Klanner but the white moderate who is more devoted to order than to justice.'",
    question:
      "What is King's argument about the relationship between order and justice?",
    answerOptions: [
      {
        text: 'Prioritising order over justice produces a false peace that suppresses legitimate grievance, and white moderates who prefer calm are more obstructive than overt racists.',
        isCorrect: true,
        rationale:
          "King distinguishes negative peace (absence of tension) from positive peace (presence of justice); the moderate's call to 'wait' produces the former while preventing the latter.",
      },
      {
        text: 'Order and justice are always identical concepts, so maintaining social stability automatically ensures fair treatment for all citizens.',
        isCorrect: false,
        rationale:
          "King's central point is that order and justice conflict; order without justice is not true peace but suppression.",
      },
      {
        text: 'King believed that violent protests were the only effective strategy for achieving civil rights in the American South.',
        isCorrect: false,
        rationale:
          "King practiced nonviolent civil disobedience; his argument is that even nonviolent disruption was labelled 'untimely' by moderates.",
      },
      {
        text: "The white moderate was King's most reliable political ally in the fight for civil rights and desegregation.",
        isCorrect: false,
        rationale:
          "King explicitly identifies the white moderate as freedom's 'great stumbling block,' not an ally.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "Literary scholar Edward Said's Orientalism (1978) argued that Western academic and cultural representations of the Middle East and Asia were not objective descriptions but projections that served colonial power. By constructing 'the Orient' as exotic, irrational, and unchanging, Western scholars created a foil that defined the West as rational, progressive, and modern. Said's argument was not that Eastern societies should not be studied but that scholarship presented as neutral observation was shaped by the political relationship between the observer's civilization and the observed  making knowledge itself a form of power.",
    question:
      "What is Said's main argument about the relationship between knowledge and power?",
    answerOptions: [
      {
        text: 'Academic knowledge about other cultures is produced within power relationships that shape its frameworks and conclusions, making it never politically neutral.',
        isCorrect: true,
        rationale:
          "Said's key insight is that knowledge operates within power relations: the ability to define another culture is itself a form of dominance presented as objectivity.",
      },
      {
        text: 'Western scholars intentionally fabricated false facts about the Middle East as part of a coordinated government disinformation campaign.',
        isCorrect: false,
        rationale:
          "Said's argument is about framing and perspective bias, not deliberate factual fabrication; scholars sincerely believed their representations were objective.",
      },
      {
        text: 'No Western scholar has ever produced any valuable or accurate research about Middle Eastern or Asian societies.',
        isCorrect: false,
        rationale:
          'Said critiques the framework, not every individual piece of research; he was himself a Western-based scholar of the Middle East.',
      },
      {
        text: 'Knowledge and power operate in completely separate domains and have no meaningful influence on each other in academic institutions.',
        isCorrect: false,
        rationale:
          "Said's entire thesis is that knowledge and power are inseparable; scholarship about colonised societies often reinforces the coloniser's worldview.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
];
