// Reading Comprehension  Test Ready: Practice 8 / Main Idea & Author's Purpose
// 10 questions | complex author purpose, unstated assumptions, multi-paragraph synthesis
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "The psychological concept of cognitive dissonance, developed by Leon Festinger in 1957, describes the mental discomfort a person feels when holding two conflicting beliefs or when behaviour contradicts beliefs. Festinger discovered that people resolve this discomfort not by changing their behaviour but by adjusting their beliefs to justify the behaviour. A classic experiment showed that participants paid $1 to lie about an enjoyable task rated the task more favourably than those paid $20  the lower-paid group needed to convince themselves the task was genuinely interesting to justify lying for so little money.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "People who are paid less work harder.", isCorrect: false, rationale: "The experiment shows belief adjustment, not work effort  the $1 group changed their attitudes, not their performance." },
      { text: "Cognitive dissonance causes people to alter their beliefs to match their behaviour, rather than the reverse  and the less external justification (such as money) people have for their actions, the more they must adjust their internal beliefs to reduce the discomfort of inconsistency.", isCorrect: true, rationale: "This captures both the general principle (belief adjustment to resolve dissonance) and the experiment's key insight (less justification = more belief change)." },
      { text: "Leon Festinger was the most important psychologist of the 20th century.", isCorrect: false, rationale: "The passage describes one of Festinger's contributions  it doesn't rank him among all psychologists." },
      { text: "Lying is always harmful to mental health.", isCorrect: false, rationale: "The passage describes how people resolve the discomfort of lying  it doesn't argue lying is always harmful." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city council debated whether to allow a technology company to build a new campus in a low-income neighbourhood. Proponents said the campus would create 3,000 jobs and generate $15 million in annual tax revenue. Opponents noted that previous tech campuses in other cities had driven housing prices up by 40-60%, displacing long-time residents who could no longer afford rent. The council ultimately approved the project with a condition: the company must fund 500 units of affordable housing. An urban planner commented, '500 units will protect roughly 1,200 people in a neighbourhood of 22,000  better than nothing, but not equity.'",
    question: "What does the urban planner's comment reveal about the compromise?",
    answerOptions: [
      { text: "The planner opposes all technology development.", isCorrect: false, rationale: "The planner critiques the scale of mitigation, not the existence of the campus." },
      { text: "The affordable housing condition addresses displacement for about 5% of the neighbourhood  acknowledging the problem without solving it at the scale the evidence about previous campuses suggests will be needed, meaning most residents remain unprotected from the predicted rent increases.", isCorrect: true, rationale: "1,200 of 22,000 is roughly 5%. The planner's 'better than nothing, but not equity' signals that the mitigation is symbolically important but quantitatively insufficient." },
      { text: "500 affordable units is more than enough housing.", isCorrect: false, rationale: "The planner explicitly says the opposite  'not equity.'" },
      { text: "Technology companies should never build in low-income areas.", isCorrect: false, rationale: "The debate is about adequate mitigation conditions, not about banning development." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A journalist investigated the practice of 'greenwashing' in the fashion industry. She found that a major clothing brand labelled a line '100% recycled' while the recycled content applied only to the tags, which made up less than 2% of the garment's total material. Another brand claimed 'carbon-neutral shipping' but achieved this only by purchasing cheap carbon offsets from programmes later found to have counted trees that were never actually planted. A third brand cut emissions per garment by 10% while increasing total production by 30%, resulting in higher overall emissions despite the per-unit improvement.",
    question: "What common pattern does the journalist identify across all three examples?",
    answerOptions: [
      { text: "All three brands committed outright fraud.", isCorrect: false, rationale: "The claims are technically defensible (recycled tags, purchased offsets, lower per-unit emissions)  the deception is in framing, not necessarily illegality." },
      { text: "Each brand used technically accurate but fundamentally misleading claims  structuring narrow truths to create an impression of environmental responsibility that the full picture contradicts, making deception a feature of how claims are framed rather than whether they are factually false.", isCorrect: true, rationale: "Pattern: each claim is true in an extremely limited sense but creates a false overall impression. The journalist shows that greenwashing operates in the gap between technical accuracy and honest communication." },
      { text: "Fashion cannot be environmentally sustainable.", isCorrect: false, rationale: "The journalist critiques specific deceptive practices, not the possibility of sustainable fashion." },
      { text: "Carbon offsets are the best way to address climate change.", isCorrect: false, rationale: "One example shows offsets being gamed  the journalist implies scepticism, not endorsement." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "An education researcher writes: 'The claim that class size doesn't matter relies heavily on studies from the 1990s that measured only standardised test scores. When researchers expanded their outcome measures to include suspension rates, graduation rates, and college enrollment, smaller classes showed significant advantages  effects that compounded over time. A student in a class of 15 receives more individual attention, better behaviour management, and more opportunities to participate than a student in a class of 30. That the test-score studies missed this reflects the narrowness of their lens, not the ineffectiveness of smaller classes.'",
    question: "What is the researcher's main argument about class size research?",
    answerOptions: [
      { text: "Standardised tests are completely useless.", isCorrect: false, rationale: "The researcher says test scores are too narrow as the sole measure  not that they're useless." },
      { text: "Earlier research that found class size didn't matter was limited by its reliance on test scores as the only outcome measure  when broader outcomes like behaviour, graduation, and college enrollment are included, smaller classes show clear benefits that the earlier, narrower studies failed to detect.", isCorrect: true, rationale: "The argument is methodological: the conclusion ('class size doesn't matter') was an artefact of what was measured, not of what actually happened. Broader measures reveal effects that test scores alone missed." },
      { text: "All classes should have exactly 15 students.", isCorrect: false, rationale: "15 is used as an example comparison  the researcher argues for smaller classes generally, not a specific number." },
      { text: "Class size is the only factor that affects student outcomes.", isCorrect: false, rationale: "The researcher argues class size matters  not that it's the only thing that matters." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "A veteran teacher writes in a professional journal: 'The annual cycle of education reform follows a predictable script. A crisis is declared. A new programme is purchased. Teachers receive a two-day training. Implementation begins. Within eighteen months, before the programme can be fairly evaluated, a new crisis is declared and a new programme replaces it. The only constant is disruption. I have survived seven literacy programmes in twenty-two years. My students' needs have not changed; the labels on the binders have.'",
    question: "What is the teacher's central critique?",
    answerOptions: [
      { text: "Literacy programmes are ineffective.", isCorrect: false, rationale: "The teacher's complaint is that programmes are replaced before they can be evaluated  she doesn't claim any specific programme is ineffective." },
      { text: "The education system cycles through reform initiatives too rapidly for any single programme to be properly implemented and assessed  creating an illusion of action while the constant disruption itself becomes the obstacle to improvement, and the underlying student needs remain unaddressed.", isCorrect: true, rationale: "The critique is structural: the system's reform cycle is self-defeating. Programmes are abandoned not because they failed but because the cycle demands novelty. The final line  'my students' needs have not changed; the labels on the binders have'  encapsulates the futility." },
      { text: "Teachers should refuse all professional development.", isCorrect: false, rationale: "The teacher criticises programme churn, not the concept of training." },
      { text: "Education was better twenty-two years ago.", isCorrect: false, rationale: "The teacher doesn't compare eras  she identifies a recurring pattern across her career." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "Non-compete agreements  contracts preventing employees from working for competitors after leaving a company  were originally designed to protect trade secrets and major investments in employee training. But their use has expanded far beyond engineers and executives: an estimated 18% of American workers are bound by non-competes, including sandwich makers, yoga instructors, and dog walkers. For low-wage workers, these agreements don't protect proprietary knowledge  they suppress wages by preventing job-hopping, the primary way hourly workers negotiate higher pay.",
    question: "What is the implied argument about how non-compete agreements function for low-wage workers?",
    answerOptions: [
      { text: "Low-wage workers should never sign employment contracts.", isCorrect: false, rationale: "The passage critiques non-competes specifically, not all employment contracts." },
      { text: "When applied to low-wage workers, non-compete agreements serve as wage-suppression tools rather than trade-secret protections  they keep workers from their primary negotiating leverage (the ability to leave for a competitor) without any legitimate business justification, since sandwich making and dog walking involve no proprietary knowledge.", isCorrect: true, rationale: "The argument emerges from the contrast: the original purpose (protecting secrets) doesn't apply to the expanded use (restricting low-wage workers), which means the actual function must be something else  and the passage identifies that function as wage suppression." },
      { text: "Non-compete agreements are illegal.", isCorrect: false, rationale: "The passage describes their widespread use  they are legal in most states, which is part of the problem the author identifies." },
      { text: "All non-compete agreements should be eliminated for everyone.", isCorrect: false, rationale: "The passage's original-use framing ('designed to protect trade secrets') implies some applications may be legitimate  the critique targets the expansion to low-wage workers." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A literary critic writes about a novel: 'On the surface, the story follows a woman renovating an old farmhouse. But the house is not really a house  it is a metaphor for the protagonist's attempt to reconstruct an identity after divorce. Every wall she tears down parallels a belief she abandons; every room she restores corresponds to a relationship she repairs. The novel's genius is that neither layer  the literal renovation nor the emotional reconstruction  works without the other. Readers who see only a home-improvement story miss the psychology; readers who allegorise every pipe fitting miss the sensory pleasure of the physical world the author builds.'",
    question: "What is the critic's main argument about how the novel works?",
    answerOptions: [
      { text: "The novel is about home renovation and nothing else.", isCorrect: false, rationale: "The critic explicitly identifies the metaphorical layer  reading only the surface misses half the novel." },
      { text: "The novel operates on two interdependent levels  physical renovation and emotional reconstruction  and its achievement is that both layers are necessary. Reducing the story to either pure allegory or pure realism diminishes it.", isCorrect: true, rationale: "The critic's central claim is interdependence: neither layer alone captures the novel. The critic warns against both under-reading (just a house story) and over-reading (just an allegory)." },
      { text: "All novels use metaphor in the same way.", isCorrect: false, rationale: "The critic praises this novel's specific technique  'genius' implies it's distinctive, not universal." },
      { text: "Divorce novels are always metaphorical.", isCorrect: false, rationale: "The critic analyses one novel  no generalisation about the genre is made." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A psychology textbook explains: 'The bystander effect  the finding that people are less likely to help in emergencies when others are present  is often attributed to diffusion of responsibility: each person assumes someone else will act. But more recent research suggests a second mechanism: pluralistic ignorance. When bystanders see others remaining calm, each interprets the group's inaction as evidence that the situation isn't actually an emergency. The result is a feedback loop in which everyone's passivity reinforces everyone else's, not because they don't care, but because they are reading each other's visible behaviour as a signal that help is unnecessary.'",
    question: "What does the passage add to the traditional explanation of the bystander effect?",
    answerOptions: [
      { text: "It replaces the old explanation with a completely new one.", isCorrect: false, rationale: "The textbook presents the new mechanism as a 'second mechanism'  supplementing, not replacing, diffusion of responsibility." },
      { text: "Beyond diffusion of responsibility, the passage identifies pluralistic ignorance as an additional mechanism: bystanders interpret each other's inaction as informational signals that the situation is not an emergency, creating a self-reinforcing feedback loop where the group's collective passivity becomes its own evidence against intervention.", isCorrect: true, rationale: "The key addition is the informational mechanism: people aren't just assuming others will help (diffusion)  they're using others' inaction as evidence that help isn't needed (pluralistic ignorance). The feedback loop is the critical insight." },
      { text: "Bystanders are always indifferent to emergencies.", isCorrect: false, rationale: "The passage explicitly states the opposite: 'not because they don't care'  the mechanism is about information, not apathy." },
      { text: "The bystander effect has been disproven by recent research.", isCorrect: false, rationale: "Recent research adds a mechanism  the effect itself is not disputed." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A transportation engineer writes: 'American cities built around cars face a paradox: the more roads we build, the more driving increases, the more congestion returns, and the more roads we feel we need. Meanwhile, cities that invest in public transit, cycling infrastructure, and walkable neighbourhoods see the reverse: as alternatives to driving improve, driving decreases, congestion eases, and less road capacity is needed. We have spent seventy years trying to solve a problem by making it worse. The car dependency was never inevitable; it was engineered, subsidised, and mandated through zoning codes, parking minimums, and highway funding formulas.'",
    question: "What does the engineer mean by the final two sentences?",
    answerOptions: [
      { text: "Cars were invented by the government.", isCorrect: false, rationale: "The engineer argues car dependency (not cars themselves) was created by policy choices." },
      { text: "American car dependency resulted from specific policy decisions  zoning, parking requirements, highway funding  not from natural consumer preference or geographic necessity. The 'solution' of building more roads perpetuated the pattern, while the true solution requires changing the underlying policy framework.", isCorrect: true, rationale: "The engineer distinguishes between a natural outcome and an engineered one. Car dependency feels inevitable because it's all Americans know, but the engineer shows it was created by design  which means it can be redesigned." },
      { text: "Public transit is always superior to driving.", isCorrect: false, rationale: "The engineer argues for transportation choice and reversing car-only infrastructure  not that transit is universally superior." },
      { text: "Congestion can never be reduced in any city.", isCorrect: false, rationale: "The passage describes cities where congestion decreased through alternative investment." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A memoir passage reads: 'When my grandfather died, my grandmother did not cry at the funeral. She cried three months later when she found his reading glasses in a coat pocket. I think grief works that way  it waits for the small, specific things. The ceremony is too large to absorb; the glasses, bent slightly at the temple where he always pushed them up, are small enough to hold. She kept them in her bedside drawer, and sometimes when I visited, she would put them on and read the newspaper, though they gave her headaches because his prescription was nothing like hers.'",
    question: "What is the central insight of this passage about grief?",
    answerOptions: [
      { text: "Funerals are unhelpful for processing grief.", isCorrect: false, rationale: "The passage says the funeral was 'too large to absorb'  not that funerals are unhelpful generally." },
      { text: "Grief is triggered by intimate, specific objects rather than ceremonial occasions  the grandmother's emotional response was unlocked not by the public rituals of mourning but by a private encounter with an ordinary object that carried the physical imprint of her husband, and her continued use of his glasses was a way of maintaining sensory connection despite the impractical fit.", isCorrect: true, rationale: "The passage argues that grief is specific and tactile. The glasses work because they carry physical evidence of the grandfather (the bend from his habit). Wearing them despite the wrong prescription is a form of continued intimacy." },
      { text: "Reading glasses are important family heirlooms.", isCorrect: false, rationale: "The glasses' significance is personal and emotional, not monetary or cultural." },
      { text: "People should not keep belongings of deceased family members.", isCorrect: false, rationale: "The passage presents the grandmother's keeping the glasses as a meaningful act of love, not an unhealthy behaviour." },
    ],
    challenge_tags: ['rla-2'],
  },
];
