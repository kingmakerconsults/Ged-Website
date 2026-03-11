// Reading Comprehension  Test Ready: Practice 8 / Main Idea & Author's Purpose
// 10 questions | complex author purpose, unstated assumptions, multi-paragraph synthesis
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "The psychological concept of cognitive dissonance, developed by Leon Festinger in 1957, describes the mental discomfort a person feels when holding two conflicting beliefs or when behaviour contradicts beliefs. Festinger discovered that people resolve this discomfort not by changing their behaviour but by adjusting their beliefs to justify the behaviour. A classic experiment showed that participants paid $1 to lie about an enjoyable task rated the task more favourably than those paid $20  the lower-paid group needed to convince themselves the task was genuinely interesting to justify lying for so little money.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Financial incentives are the primary factor determining how people evaluate their experiences, with lower payment consistently leading to lower satisfaction", isCorrect: false, rationale: "The passage shows the opposite: the lower-paid group rated the task more positively because they needed to justify lying for minimal compensation." },
      { text: "Festinger's experiment demonstrated that participants given larger payments consistently reported more favorable attitudes toward the assigned task", isCorrect: false, rationale: "The experiment found the reverse. Participants paid one dollar rated the task higher than those paid twenty dollars, contradicting this claim." },
      { text: "People resolve cognitive dissonance by adjusting their beliefs to match their behavior, and the less external justification they have, the more they change their beliefs", isCorrect: true, rationale: "This captures the general principle of belief adjustment and the experiment's key finding that less external justification produces greater internal belief change." },
      { text: "Cognitive dissonance is the disagreement that arises when people are compensated at different rates for identical tasks, leading to disputes about the task's value", isCorrect: false, rationale: "Cognitive dissonance is an internal psychological conflict, not an interpersonal dispute about compensation fairness. The passage describes a personal process." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city council debated whether to allow a technology company to build a new campus in a low-income neighbourhood. Proponents said the campus would create 3,000 jobs and generate $15 million in annual tax revenue. Opponents noted that previous tech campuses in other cities had driven housing prices up by 40-60%, displacing long-time residents who could no longer afford rent. The council ultimately approved the project with a condition: the company must fund 500 units of affordable housing. An urban planner commented, '500 units will protect roughly 1,200 people in a neighbourhood of 22,000  better than nothing, but not equity.'",
    question: "What does the urban planner's comment reveal about the compromise?",
    answerOptions: [
      { text: "The housing condition covers roughly five percent of the neighborhood, recognizing the displacement risk without matching the scale that evidence from similar campuses suggests will be needed", isCorrect: true, rationale: "1,200 of 22,000 is about five percent. The planner's phrase 'better than nothing, but not equity' confirms the mitigation is symbolically important but quantitatively insufficient." },
      { text: "The council's requirement demonstrates that economic development and neighborhood protection can be fully balanced through mandated corporate investment in affordable housing units", isCorrect: false, rationale: "The planner's statement directly contradicts this. 'Not equity' means the compromise fell short of a genuine balance between development benefits and resident protection." },
      { text: "The fifteen million dollars in annual tax revenue will eventually fund enough additional housing to close the gap between the 500 required units and the neighborhood's full need", isCorrect: false, rationale: "The passage does not link tax revenue to future housing construction. This conflates two separate arguments and ignores the planner's stated concern about scale." },
      { text: "The urban planner endorses the affordable housing requirement as a sufficient and comprehensive response to the anticipated displacement of current neighborhood residents", isCorrect: false, rationale: "The planner explicitly calls the measure insufficient by saying it is 'better than nothing, but not equity,' which directly contradicts calling it sufficient or comprehensive." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A journalist investigated the practice of 'greenwashing' in the fashion industry. She found that a major clothing brand labelled a line '100% recycled' while the recycled content applied only to the tags, which made up less than 2% of the garment's total material. Another brand claimed 'carbon-neutral shipping' but achieved this only by purchasing cheap carbon offsets from programmes later found to have counted trees that were never actually planted. A third brand cut emissions per garment by 10% while increasing total production by 30%, resulting in higher overall emissions despite the per-unit improvement.",
    question: "What common pattern does the journalist identify across all three examples?",
    answerOptions: [
      { text: "All three companies violated environmental advertising regulations by making promotional claims that had no factual basis in their actual manufacturing or shipping practices", isCorrect: false, rationale: "The claims are technically defensible: tags were recycled, offsets were purchased, and per-unit emissions did drop. The deception lies in misleading framing, not in outright falsehood." },
      { text: "The journalist concludes that the fashion industry has made substantial environmental progress through its recycling initiatives and carbon offset purchasing programs", isCorrect: false, rationale: "The passage presents each brand's claims as misleading. Recycled tags on two percent of material and phantom offsets are failures of integrity, not evidence of real progress." },
      { text: "Each brand achieved meaningful reductions in environmental impact but failed to communicate those improvements effectively to environmentally conscious consumers", isCorrect: false, rationale: "The brands did not achieve genuine improvements. Recycled tags, bogus offsets, and higher total emissions despite per-unit reductions are not real environmental gains." },
      { text: "Each brand framed a narrow technical truth to create a broader impression of environmental responsibility that the complete evidence directly contradicts", isCorrect: true, rationale: "The shared pattern is using technically accurate but misleading claims. Each brand operates in the gap between what is literally true and what is honestly communicated." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "An education researcher writes: 'The claim that class size doesn't matter relies heavily on studies from the 1990s that measured only standardised test scores. When researchers expanded their outcome measures to include suspension rates, graduation rates, and college enrollment, smaller classes showed significant advantages  effects that compounded over time. A student in a class of 15 receives more individual attention, better behaviour management, and more opportunities to participate than a student in a class of 30. That the test-score studies missed this reflects the narrowness of their lens, not the ineffectiveness of smaller classes.'",
    question: "What is the researcher's main argument about class size research?",
    answerOptions: [
      { text: "Standardized test scores are unreliable measures of academic achievement and should be eliminated from all educational research and related policy discussions", isCorrect: false, rationale: "The researcher says test scores are too narrow as the sole measure, not that they are unreliable or should be eliminated. Narrowness and unreliability are different critiques." },
      { text: "Earlier studies found class size didn't matter only because they measured test scores alone, and broader outcomes like graduation rates reveal clear benefits of smaller classes", isCorrect: true, rationale: "The argument is methodological: the earlier conclusion was an artifact of limited measurement. Broader outcome measures reveal effects that test scores alone could not detect." },
      { text: "The researcher recommends that every school immediately reduce class sizes to fifteen students regardless of the available budget or current staffing levels", isCorrect: false, rationale: "Fifteen is one illustrative comparison in the passage. The researcher argues for the value of smaller classes in general, not for a specific universal class size mandate." },
      { text: "Earlier research using standardized test data strongly supported reducing class sizes, which is why schools have been investing in smaller classes for the past three decades", isCorrect: false, rationale: "The passage states the opposite: earlier test-focused studies concluded class size did not matter. This answer reverses the researcher's central claim about what that research found." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "A veteran teacher writes in a professional journal: 'The annual cycle of education reform follows a predictable script. A crisis is declared. A new programme is purchased. Teachers receive a two-day training. Implementation begins. Within eighteen months, before the programme can be fairly evaluated, a new crisis is declared and a new programme replaces it. The only constant is disruption. I have survived seven literacy programmes in twenty-two years. My students' needs have not changed; the labels on the binders have.'",
    question: "What is the teacher's central critique?",
    answerOptions: [
      { text: "The education system replaces reform programs too quickly for any to be properly evaluated, making constant disruption itself the primary obstacle to meaningful student improvement", isCorrect: true, rationale: "The critique is structural: the cycle abandons programs before assessment is possible, so the disruption meant to help students actually becomes the barrier to helping them." },
      { text: "The seven literacy programs implemented during the teacher's career each failed to improve student reading outcomes because they were poorly designed from the beginning", isCorrect: false, rationale: "The teacher does not say the programs failed. Her complaint is that each was replaced before it could be fairly assessed, making judgments about design quality impossible." },
      { text: "Professional development training has no value for experienced teachers because educators with two decades of classroom practice already know how to teach literacy effectively", isCorrect: false, rationale: "The teacher objects to the cycle of constant program replacement, not to training itself. The critique targets institutional impatience, not professional development as a concept." },
      { text: "The teacher's long career demonstrates that the earliest literacy programs she used were more effective than the six newer programs that subsequently replaced them", isCorrect: false, rationale: "The teacher identifies a recurring pattern without comparing any program's quality to another. No program is described as more or less effective than the ones before or after it." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "Non-compete agreements  contracts preventing employees from working for competitors after leaving a company  were originally designed to protect trade secrets and major investments in employee training. But their use has expanded far beyond engineers and executives: an estimated 18% of American workers are bound by non-competes, including sandwich makers, yoga instructors, and dog walkers. For low-wage workers, these agreements don't protect proprietary knowledge  they suppress wages by preventing job-hopping, the primary way hourly workers negotiate higher pay.",
    question: "What is the implied argument about how non-compete agreements function for low-wage workers?",
    answerOptions: [
      { text: "Non-compete agreements should be eliminated for all categories of workers because they restrict individual freedom and serve no legitimate business purpose in any industry", isCorrect: false, rationale: "The passage's description of the original purpose implies some applications may be legitimate. The critique targets the expansion to low-wage roles, not non-competes as a whole." },
      { text: "Low-wage workers benefit from non-compete agreements because the contracts provide job stability and prevent employers from terminating them during the restricted employment period", isCorrect: false, rationale: "Non-competes restrict where workers can go after leaving, not whether they can be fired. This reverses the power dynamic the passage describes and invents a protection that does not exist." },
      { text: "For low-wage workers, non-competes function as wage-suppression tools rather than trade-secret protections, since jobs like sandwich making involve no proprietary knowledge to guard", isCorrect: true, rationale: "The argument rests on contrasting original purpose with current use. Where no proprietary knowledge exists, the only remaining function of the agreement is suppressing worker leverage." },
      { text: "The expansion of non-competes reflects the increasing technical complexity of service-sector jobs like sandwich making that now require the protection of proprietary business methods", isCorrect: false, rationale: "The passage cites sandwich makers as examples of jobs with no trade secrets. This answer inverts the example by arguing those jobs have become complex, which the passage directly contradicts." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A literary critic writes about a novel: 'On the surface, the story follows a woman renovating an old farmhouse. But the house is not really a house  it is a metaphor for the protagonist's attempt to reconstruct an identity after divorce. Every wall she tears down parallels a belief she abandons; every room she restores corresponds to a relationship she repairs. The novel's genius is that neither layer  the literal renovation nor the emotional reconstruction  works without the other. Readers who see only a home-improvement story miss the psychology; readers who allegorise every pipe fitting miss the sensory pleasure of the physical world the author builds.'",
    question: "What is the critic's main argument about how the novel works?",
    answerOptions: [
      { text: "The novel succeeds primarily as a psychological allegory, with the renovation details serving only as a decorative surface that guides readers toward the emotional narrative beneath", isCorrect: false, rationale: "The critic explicitly warns against prioritizing the allegorical layer. The novel's strength is that both layers are necessary, not that one merely serves the other." },
      { text: "The critic argues the novel would be stronger if the author had focused entirely on the realistic renovation narrative without adding the metaphorical layer of emotional reconstruction", isCorrect: false, rationale: "The critic praises the novel's dual structure as its genius and never suggests either layer should be removed. This contradicts the entire argument about interdependence." },
      { text: "The farmhouse renovation story resonates as a universal homeownership experience that any reader can connect with regardless of whether they have personally been through a divorce", isCorrect: false, rationale: "The critic analyzes how the novel's two layers function together, not whether its themes are universally relatable. No claim about broad reader identification is made in the passage." },
      { text: "The novel's literal renovation and emotional reconstruction are fully interdependent, and reducing the story to either pure realism or pure allegory diminishes its achievement", isCorrect: true, rationale: "The critic's central claim is that neither layer works without the other. The warning against both under-reading and over-reading confirms that interdependence is the key insight." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A psychology textbook explains: 'The bystander effect  the finding that people are less likely to help in emergencies when others are present  is often attributed to diffusion of responsibility: each person assumes someone else will act. But more recent research suggests a second mechanism: pluralistic ignorance. When bystanders see others remaining calm, each interprets the group's inaction as evidence that the situation isn't actually an emergency. The result is a feedback loop in which everyone's passivity reinforces everyone else's, not because they don't care, but because they are reading each other's visible behaviour as a signal that help is unnecessary.'",
    question: "What does the passage add to the traditional explanation of the bystander effect?",
    answerOptions: [
      { text: "Recent studies have replaced diffusion of responsibility with pluralistic ignorance as the sole correct explanation, showing the original bystander theory was fundamentally incorrect", isCorrect: false, rationale: "The textbook presents pluralistic ignorance as a second mechanism that supplements the original explanation. It adds to diffusion of responsibility rather than replacing it." },
      { text: "It identifies pluralistic ignorance as an additional mechanism in which bystanders interpret each other's calm reactions as evidence no emergency exists, creating a self-reinforcing cycle", isCorrect: true, rationale: "The key addition is informational: bystanders use each other's inaction as evidence about the situation itself, not just as reason to delegate. The feedback loop is the critical insight." },
      { text: "Bystanders in emergencies deliberately choose not to help because they are indifferent to the wellbeing of people around them and fundamentally lack empathy for strangers in distress", isCorrect: false, rationale: "The passage explicitly states the opposite: people fail to act 'not because they don't care' but because they misread the signals of others around them as evidence against acting." },
      { text: "Diffusion of responsibility and pluralistic ignorance are two names describing the same underlying psychological process in which each person waits for someone else to act first", isCorrect: false, rationale: "The two mechanisms are distinct. Diffusion is about delegating action to others; pluralistic ignorance is about misreading the situation itself. They produce inaction through different paths." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A transportation engineer writes: 'American cities built around cars face a paradox: the more roads we build, the more driving increases, the more congestion returns, and the more roads we feel we need. Meanwhile, cities that invest in public transit, cycling infrastructure, and walkable neighbourhoods see the reverse: as alternatives to driving improve, driving decreases, congestion eases, and less road capacity is needed. We have spent seventy years trying to solve a problem by making it worse. The car dependency was never inevitable; it was engineered, subsidised, and mandated through zoning codes, parking minimums, and highway funding formulas.'",
    question: "What does the engineer mean by the final two sentences?",
    answerOptions: [
      { text: "American car dependency resulted from deliberate policy choices like zoning codes, parking minimums, and highway funding, and can be reversed by changing those same policy frameworks", isCorrect: true, rationale: "The final sentences argue that car dependency was created through specific policies, meaning it was a design choice rather than an inevitability and can therefore be redesigned." },
      { text: "Expanding highway capacity remains the most practical solution to congestion because American development patterns are too dispersed for public transit systems to serve effectively", isCorrect: false, rationale: "The passage describes expanding roads as making congestion worse through induced demand. The engineer advocates for alternatives to road building, not a continuation of it." },
      { text: "The engineer argues that all personal vehicle use should be immediately prohibited in American cities and replaced entirely with public transit and cycling infrastructure", isCorrect: false, rationale: "The engineer advocates for transportation choice and reversing car-only infrastructure policy, not for a complete ban on personal vehicles in every American city." },
      { text: "The paradox of induced demand proves that every form of transportation infrastructure inevitably generates more usage than it can handle, whether the investment is in roads or transit", isCorrect: false, rationale: "Induced demand in the passage applies to roads specifically. The engineer shows that transit investment reduces driving rather than replicating the same congestion cycle." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A memoir passage reads: 'When my grandfather died, my grandmother did not cry at the funeral. She cried three months later when she found his reading glasses in a coat pocket. I think grief works that way  it waits for the small, specific things. The ceremony is too large to absorb; the glasses, bent slightly at the temple where he always pushed them up, are small enough to hold. She kept them in her bedside drawer, and sometimes when I visited, she would put them on and read the newspaper, though they gave her headaches because his prescription was nothing like hers.'",
    question: "What is the central insight of this passage about grief?",
    answerOptions: [
      { text: "The grandmother's delayed emotional response three months after the funeral indicates an unhealthy pattern of grief suppression that would have benefited from professional counseling", isCorrect: false, rationale: "The passage presents the delayed response as natural rather than pathological. Grief arriving through a specific object is described as how grief works, not as a sign of suppression." },
      { text: "Funeral ceremonies serve no meaningful role in the grieving process because actual healing can only occur through private encounters with the personal belongings of the deceased", isCorrect: false, rationale: "The passage says the funeral was too large to absorb, not that funerals are unnecessary. The grandmother's experience adds a dimension to grief without dismissing formal ceremonies." },
      { text: "Grief is triggered by specific personal objects carrying physical traces of the deceased rather than by formal ceremonies, because small concrete details hold emotional weight that broad rituals cannot", isCorrect: true, rationale: "The passage argues grief is specific and tactile. The glasses work because they carry physical evidence of the grandfather, and wearing them despite the wrong prescription is an act of continued connection." },
      { text: "The grandmother continued wearing her husband's reading glasses despite the wrong prescription because she was in denial about his death and refused to accept the permanent reality of his absence", isCorrect: false, rationale: "The passage presents wearing the glasses as a form of sensory closeness and continued intimacy, not denial. The grandmother knows he is gone; the glasses maintain a physical link." },
    ],
    challenge_tags: ['rla-2'],
  },
];
