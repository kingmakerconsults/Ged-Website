// Reading Comprehension  Challenge: Practice 11 / Main Idea & Author's Purpose
// 10 questions | primary-source rhetoric, competing scholarly interpretations, advanced synthesis
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "In 1848, Elizabeth Cady Stanton and Lucretia Mott organised the Seneca Falls Convention, the first formal gathering in the United States devoted to women's rights. The convention produced the Declaration of Sentiments, modelled on the Declaration of Independence, which stated: 'We hold these truths to be self-evident: that all men and women are created equal.' By deliberately echoing the nation's founding document, Stanton framed women's suffrage not as a radical demand but as an unfulfilled promise  arguing that the founders' principles, honestly applied, required women's political participation.",
    question: "Why did Stanton model the Declaration of Sentiments on the Declaration of Independence?",
    answerOptions: [
      { text: "She could not think of an original format for the document.", isCorrect: false, rationale: "The parallel was strategic, not a failure of imagination  it deliberately borrowed the authority of the founding document." },
      { text: "By grounding women's rights in the language and logic of the nation's founding text, Stanton made opponents choose between rejecting women's equality and rejecting the principles they claimed to revere  transforming the suffrage argument from radical innovation into conservative fulfillment of existing American ideals.", isCorrect: true, rationale: "The rhetorical strategy is identical to Douglass's in his Fourth of July speech: using the audience's own stated principles against them. Stanton made women's rights a logical extension of 'all men are created equal,' not an alien concept." },
      { text: "Stanton believed the original Declaration of Independence was poorly written.", isCorrect: false, rationale: "Stanton built on the Declaration's authority  she critiqued its incomplete application, not its quality." },
      { text: "The convention was primarily about abolishing slavery.", isCorrect: false, rationale: "While some attendees were abolitionists, the Seneca Falls Convention was specifically devoted to women's rights." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "Philosopher John Rawls proposed a thought experiment called the 'veil of ignorance': imagine designing a society's rules without knowing what position you will occupy in it  your race, class, gender, talent, or disability. Rawls argued that rational people behind this veil would choose principles that protect the worst-off members, because anyone might end up in that position. Critics object that the experiment is impossible  people cannot truly strip away their identities  and that Rawls assumes risk-averse reasoning when many people would gamble on being in the elite. Nonetheless, the thought experiment remains influential for exposing how self-interest distorts ideas of fairness.",
    question: "What is the main purpose of Rawls's 'veil of ignorance' thought experiment?",
    answerOptions: [
      { text: "To prove that all people are naturally equal.", isCorrect: false, rationale: "Rawls's experiment is about designing fair rules, not asserting natural equality  he acknowledges inequality exists." },
      { text: "To reveal that principles people call 'fair' often reflect their own social position by asking: what rules would you endorse if you didn't know where you'd end up? By removing self-knowledge, the experiment forces purely impartial reasoning, exposing how much current 'fairness' judgements are shaped by privilege.", isCorrect: true, rationale: "The veil's purpose is diagnostic: it separates genuine fairness from self-interested fairness. If you'd only endorse a rule when you know it benefits you, the rule isn't truly fair  it's strategic." },
      { text: "Rawls believed society should be redesigned from scratch.", isCorrect: false, rationale: "The veil is a thought experiment for testing principles  not a practical proposal to rebuild society." },
      { text: "Risk-averse people are always more rational than risk-seekers.", isCorrect: false, rationale: "The passage notes that critics challenge Rawls's assumption of risk-aversion  the passage doesn't endorse it as always rational." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "Sociologist Erving Goffman's 'dramaturgical' theory proposed that social life is fundamentally performative: people present different versions of themselves depending on the audience, like actors on a stage. Goffman distinguished between 'front stage' behaviour (public performance calibrated to social expectations) and 'backstage' behaviour (the unguarded self visible to intimates). A job interview, for example, is a front-stage performance; complaining about the interview afterward with friends is backstage. Goffman's insight was not that people are dishonest but that identity itself is social and situational  there is no essential, context-free 'true self' behind the performances.",
    question: "What does Goffman's theory imply about the concept of authenticity?",
    answerOptions: [
      { text: "People should always be completely honest in all situations.", isCorrect: false, rationale: "Goffman doesn't make moral prescriptions about honesty  he describes how identity actually functions socially." },
      { text: "If identity is inherently performative and context-dependent, then the popular idea of a single 'authentic self' that exists independently of social context is an illusion  authenticity is not about finding one true performance but about navigating multiple genuine but situation-specific presentations.", isCorrect: true, rationale: "Goffman's theory destabilises the 'true self' concept: if every social context elicits a different version of the person, which version is 'real'? His answer: they all are, because selfhood is social, not fixed." },
      { text: "Job interviews are the only example of performative behaviour.", isCorrect: false, rationale: "The interview is one example  Goffman's theory applies to all social interaction." },
      { text: "Backstage behaviour is always morally superior to front-stage behaviour.", isCorrect: false, rationale: "Goffman describes two modes of social interaction  he doesn't rank their moral value." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "Rachel Carson's Silent Spring (1962) warned that widespread pesticide use was poisoning ecosystems and threatening human health. The chemical industry responded with a sustained campaign to discredit Carson personally  calling her 'hysterical,' noting she was unmarried (implying emotional instability), and questioning her qualifications despite her master's degree in zoology and career at the U.S. Fish and Wildlife Service. The attacks reveal a pattern: when scientific evidence threatens industrial profit, the response often targets the scientist's character rather than the science. Carson's research was eventually vindicated; DDT was banned in 1972.",
    question: "What does the passage argue about the chemical industry's response to Carson?",
    answerOptions: [
      { text: "The industry proved that Carson's science was incorrect.", isCorrect: false, rationale: "The passage states Carson was 'eventually vindicated'  the industry attacks were personal, not scientific." },
      { text: "The industry used ad hominem attacks  targeting Carson's gender, marital status, and qualifications rather than her data  revealing a broader pattern in which industries confronting unwelcome scientific findings discredit the messenger to avoid engaging with the evidence.", isCorrect: true, rationale: "The passage identifies specific personal attacks (hysterical, unmarried, unqualified) and frames them as a general industrial strategy: when evidence threatens profit, attack the scientist, not the science." },
      { text: "All scientific research is eventually vindicated.", isCorrect: false, rationale: "Carson's vindication is specific  the passage doesn't generalise about all research." },
      { text: "DDT should not have been banned.", isCorrect: false, rationale: "The passage presents the DDT ban as vindication of Carson's warnings  not as a mistake." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "Economist Ha-Joon Chang argues that wealthy nations practice 'kicking away the ladder'  using protectionist policies (tariffs, subsidies, industrial planning) to build their economies, then demanding that developing countries adopt free-trade policies that prevent them from using the same tools. Chang notes that the United States had some of the world's highest tariffs during its industrialisation in the 19th century, and that Britain used aggressive trade protections before becoming the world's largest advocate of free trade. The historical record, he argues, shows that today's free-trade orthodoxy contradicts the actual development strategies of the countries promoting it.",
    question: "What is Chang's central argument about the relationship between trade policy and economic development?",
    answerOptions: [
      { text: "Free trade has always been the best policy for all countries.", isCorrect: false, rationale: "Chang argues the exact opposite  historically successful countries industrialised behind protectionist barriers." },
      { text: "Wealthy nations that industrialised using protectionist policies now promote free trade for developing nations  effectively denying them the same tools that built wealthy nations' economies, creating a double standard that the historical record of development strategies directly contradicts.", isCorrect: true, rationale: "Chang's argument is about historical hypocrisy: the countries demanding free trade never practiced it during their own development. 'Kicking away the ladder' means removing the tools of development after you've already climbed." },
      { text: "Tariffs are always beneficial for every country.", isCorrect: false, rationale: "Chang argues tariffs were tools of development, not that they're universally beneficial in all contexts." },
      { text: "Britain never used protectionist trade policies.", isCorrect: false, rationale: "The passage explicitly states Britain used 'aggressive trade protections' before advocating free trade." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "Michel Foucault's analysis of the Panopticon  Jeremy Bentham's design for a prison in which inmates could be observed at all times without knowing when they were being watched  served as a metaphor for modern disciplinary power. Foucault argued that the Panopticon's genius was that inmates internalised the surveillance and began to monitor their own behaviour, making the actual presence of a guard unnecessary. He extended this logic to schools, hospitals, and workplaces, arguing that modern institutions discipline subjects not primarily through physical force but through the creation of environments in which people regulate themselves.",
    question: "What does Foucault argue about how power operates in modern institutions?",
    answerOptions: [
      { text: "Modern institutions use more physical force than prisons.", isCorrect: false, rationale: "Foucault's argument is precisely the opposite  modern power works through self-regulation, not physical force." },
      { text: "Power in modern institutions operates primarily through the internalisation of surveillance  people regulate their own behaviour not because they are physically forced but because institutional environments create the conditions for self-discipline, making external enforcement largely unnecessary.", isCorrect: true, rationale: "The Panopticon model shows that visibility itself is disciplinary. When you might be watched, you behave as if you are watched  the guard becomes unnecessary because the inmate becomes their own guard." },
      { text: "Jeremy Bentham built the most important prison in history.", isCorrect: false, rationale: "The Panopticon was a design, not a built prison  Foucault used it as a metaphor, not a historical case study." },
      { text: "Surveillance technology should be banned in all institutions.", isCorrect: false, rationale: "Foucault analysed how surveillance power works  he didn't propose policy prescriptions about banning technology." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "Historian Eric Williams argued in Capitalism and Slavery (1944) that the abolition of slavery in the British Empire was driven not by humanitarian sentiment but by economic calculation. As the sugar economy declined and free-labour industrial capitalism became more profitable, the economic rationale for slavery weakened. Williams did not deny that abolitionists were sincere; he argued that they gained political traction only when economic conditions made abolition financially convenient for the ruling class. 'The saints did not need to be told that the colonial system was out of date,' Williams wrote. 'They were told by the economists.'",
    question: "How does Williams's argument complicate the traditional narrative of abolition?",
    answerOptions: [
      { text: "Williams argues that abolitionists were insincere.", isCorrect: false, rationale: "Williams explicitly states he does not deny abolitionists' sincerity  he questions why they succeeded when they did." },
      { text: "Williams shifts the explanatory focus from moral progress to economic context: abolitionists succeeded not because their moral arguments became more persuasive, but because the economic conditions that had sustained slavery changed  making the timing of abolition coincide with the point at which slavery became less profitable than free labour.", isCorrect: true, rationale: "The complication is about causation: the traditional narrative credits moral awakening; Williams credits economic transformation. Moral arguments existed for centuries but only gained political power when aligned with economic interests." },
      { text: "The British Empire abolished slavery for entirely altruistic reasons.", isCorrect: false, rationale: "This is the traditional narrative that Williams specifically challenges." },
      { text: "Slavery was never economically profitable.", isCorrect: false, rationale: "Williams's argument assumes slavery was highly profitable during the sugar economy  it stopped being profitable, which enabled abolition." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "Psychologist Carol Dweck distinguishes between a 'fixed mindset'  the belief that intelligence and talent are innate and unchangeable  and a 'growth mindset'  the belief that abilities develop through effort, strategy, and learning from failure. Dweck's research showed that children praised for being 'smart' tended to avoid challenging tasks to protect their identity, while children praised for effort sought harder problems. Critics note that Dweck's framework has been oversimplified in popular culture: schools that merely post 'growth mindset' posters without changing assessment structures or teaching practices see no improvement, suggesting the concept requires institutional support, not just individual belief.",
    question: "How does the critics' observation refine the growth mindset concept?",
    answerOptions: [
      { text: "The critics prove growth mindset is completely false.", isCorrect: false, rationale: "The critics refine the concept  they show it's insufficient alone, not that it's false." },
      { text: "The critics show that growth mindset is a systemic concept, not just a psychological one  changing individuals' beliefs about intelligence has limited effect if assessment systems, grading practices, and institutional structures still reward fixed-mindset behaviour. The concept works when embedded in supportive systems, not when reduced to motivational slogans.", isCorrect: true, rationale: "The refinement is about level of intervention: Dweck's research demonstrated the psychological mechanism; the critics show that mechanism operates within institutional contexts that can either support or undermine it." },
      { text: "Posters are an effective educational intervention.", isCorrect: false, rationale: "The critics explicitly use poster-only interventions as an example of the concept's failure when oversimplified." },
      { text: "All children should be told they are smart.", isCorrect: false, rationale: "Dweck's research found that 'smart' praise was counterproductive  the passage describes effort praise as more effective." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "In a 1963 letter from Birmingham jail, Martin Luther King Jr. responded to white clergymen who called his protests 'untimely.' King wrote: 'For years now I have heard the word "Wait!" It rings in the ear of every Negro with piercing familiarity. This "Wait" has almost always meant "Never."' King argued that the clergymen's desire for order over justice revealed a preference for negative peace  the absence of tension  over positive peace  the presence of justice. He noted that 'the Negro's great stumbling block in the stride toward freedom is not the White Citizen's Counciler or the Ku Klux Klanner but the white moderate who is more devoted to order than to justice.'",
    question: "What is King's argument about the relationship between order and justice?",
    answerOptions: [
      { text: "Order and justice are always the same thing.", isCorrect: false, rationale: "King's central point is that they conflict  order without justice is not true peace." },
      { text: "King argues that prioritising social order over racial justice produces 'negative peace'  a superficial calm maintained by suppressing legitimate grievance  and that white moderates who prefer this calm to the discomfort of confronting injustice are more obstructive to progress than overt racists, because their preference for order provides moral cover for the status quo.", isCorrect: true, rationale: "King distinguishes two types of peace: absence of tension (negative) vs. presence of justice (positive). The moderate's demand for 'wait' and 'order' produces the first while preventing the second." },
      { text: "King believed violent protests were the only effective strategy.", isCorrect: false, rationale: "King practiced nonviolent civil disobedience  his argument is that even nonviolent disruption was labelled 'untimely' by moderates." },
      { text: "The white moderate was King's primary political ally.", isCorrect: false, rationale: "King explicitly identifies the white moderate as freedom's 'great stumbling block.'" },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "Literary scholar Edward Said's Orientalism (1978) argued that Western academic and cultural representations of the Middle East and Asia were not objective descriptions but projections that served colonial power. By constructing 'the Orient' as exotic, irrational, and unchanging, Western scholars created a foil that defined the West as rational, progressive, and modern. Said's argument was not that Eastern societies should not be studied but that scholarship presented as neutral observation was shaped by the political relationship between the observer's civilization and the observed  making knowledge itself a form of power.",
    question: "What is Said's main argument about the relationship between knowledge and power?",
    answerOptions: [
      { text: "Western scholars intentionally fabricated facts about the Middle East.", isCorrect: false, rationale: "Said's argument is about framing and perspective, not factual fabrication  scholars sincerely believed their representations were objective." },
      { text: "Academic knowledge about other cultures is never politically neutral  it is produced within power relationships that shape what questions are asked, what frameworks are applied, and what conclusions are drawn, meaning that scholarship about colonised societies often reflects and reinforces the coloniser's worldview while claiming objectivity.", isCorrect: true, rationale: "Said's key insight is that knowledge operates within power: the ability to define another culture is itself a form of dominance. 'Orientalism' is not lies about the East  it is knowledge structured by colonial power that presents the coloniser's perspective as universal truth." },
      { text: "No Western scholar has ever produced valuable research about the Middle East.", isCorrect: false, rationale: "Said critiques the framework within which scholarship occurs, not every individual piece of research  and he was himself a Western-based scholar of the Middle East." },
      { text: "Power and knowledge are completely separate domains.", isCorrect: false, rationale: "Said's entire thesis is that they are inseparable  knowledge is structured by and serves power." },
    ],
    challenge_tags: ['rla-2'],
  },
];
