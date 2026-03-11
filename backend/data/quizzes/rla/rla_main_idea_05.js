// Reading Comprehension  Core: Practice 5 / Main Idea & Author's Purpose
// 10 questions | identifying central claims, distinguishing main ideas from details
module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage:
      'The Great Migration refers to the movement of approximately six million Black Americans from the rural South to northern and western cities between 1910 and 1970. Pushed by Jim Crow laws, limited economic opportunity, and racial violence, and pulled by industrial jobs and the promise of greater freedom, this mass relocation reshaped American culture, politics, and demographics in ways still felt today.',
    question: 'What is the main idea of the passage?',
    answerOptions: [
      {
        text: 'The Great Migration was primarily an economic movement in which Black Americans relocated to find better-paying industrial positions, significantly transforming northern urban labor markets over several decades.',
        isCorrect: false,
        rationale:
          'Jobs were one pull factor, but the passage identifies multiple push factors including Jim Crow laws, limited opportunity, and racial violence -- reducing the cause to economics alone distorts the main idea.',
      },
      {
        text: 'The Great Migration describes a period when southern cities drew workers from northern states, reversing earlier migration patterns across the United States during the early and middle twentieth century.',
        isCorrect: false,
        rationale:
          'The passage states the opposite direction -- people moved from the South to northern and western cities, not the reverse.',
      },
      {
        text: "The Great Migration's demographic patterns reflected an endogenous pull-factor model driven entirely by destination attractiveness rather than by systemic displacement pressures originating in Southern institutions and customs.",
        isCorrect: false,
        rationale:
          "This inverts the passage's emphasis on push factors like Jim Crow and violence, using technical jargon to obscure the fact that it ignores half the causal explanation the passage provides.",
      },
      {
        text: 'The Great Migration was a massive population shift driven by both oppressive conditions in the South and opportunities elsewhere, permanently reshaping American culture, politics, and demographics.',
        isCorrect: true,
        rationale:
          "This captures the passage's full scope: the scale of the movement, the dual push-pull causes, and the lasting impact on American society.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage:
      'Many cities are converting vacant lots into pocket parks  small green spaces typically less than a quarter acre. These mini-parks provide shade that reduces local temperatures, capture rainwater that would otherwise overwhelm storm drains, and give residents in dense neighbourhoods a place to sit, read, or let children play. Because they require relatively little funding compared to traditional parks, pocket parks are especially attractive to cash-strapped municipalities.',
    question: 'Which statement best expresses the main idea of this passage?',
    answerOptions: [
      {
        text: 'Pocket parks are primarily valued for their ability to reduce urban heat through increased tree shade coverage, making them an essential environmental tool for cities combating rising temperatures.',
        isCorrect: false,
        rationale:
          'Heat reduction is one of several benefits listed, but the passage equally emphasizes stormwater management, recreation, and affordability -- this answer elevates one detail over the full argument.',
      },
      {
        text: 'Pocket parks offer environmental, social, and financial advantages that make them a practical and affordable green-space solution for cities struggling with limited budgets and dense development.',
        isCorrect: true,
        rationale:
          'This synthesizes the three benefit categories -- temperature and stormwater control, resident recreation, and low cost -- into a single main idea.',
      },
      {
        text: 'Pocket parks are mainly decorative features that cities install to improve neighborhood aesthetics, providing little measurable benefit to the environmental conditions or daily lives of local residents.',
        isCorrect: false,
        rationale:
          'The passage explicitly lists measurable benefits including temperature reduction, stormwater capture, and recreation -- calling them merely decorative contradicts the evidence presented.',
      },
      {
        text: 'Pocket parks function as microclimate regulators whose principal municipal value derives from stormwater attenuation capacity rather than from the social or recreational utility these small spaces provide.',
        isCorrect: false,
        rationale:
          'This uses technical language to overemphasize one function while dismissing the social benefits and cost savings the passage treats as equally important.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage:
      'In 2010, a massive oil spill in the Gulf of Mexico released approximately 4.9 million barrels of crude oil over 87 days. The disaster killed eleven workers, devastated fishing and tourism industries along the coast, and caused widespread damage to marine and coastal ecosystems. Cleanup efforts lasted years and cost billions of dollars, and some environmental effects are still being studied more than a decade later.',
    question: 'What is the central point of the passage?',
    answerOptions: [
      {
        text: 'The 2010 Gulf oil spill was a catastrophic event whose human, economic, and environmental consequences were severe and long-lasting, with some effects still being studied over a decade afterward.',
        isCorrect: true,
        rationale:
          'This covers all three categories of impact -- human lives lost, economic devastation, and environmental damage -- plus their lasting nature, capturing the full scope of the passage.',
      },
      {
        text: 'The primary significance of the Gulf oil spill was its economic impact on the fishing and tourism industries, which suffered billions of dollars in losses during the prolonged and costly cleanup period.',
        isCorrect: false,
        rationale:
          'Economic damage to fishing and tourism is one part of the story, but the passage gives equal weight to worker deaths and environmental destruction -- narrowing to economics alone misses the central point.',
      },
      {
        text: "The Gulf spill's ecological damage is best understood through bioaccumulation cascades in marine food webs rather than through the surface-level economic indicators most commonly cited in broader policy discussions.",
        isCorrect: false,
        rationale:
          'The passage never discusses bioaccumulation or food-web science -- this uses scientific jargon to create a false emphasis while ignoring the human and economic dimensions of the disaster.',
      },
      {
        text: 'The 2010 Gulf oil spill was a relatively contained industrial incident that was resolved fairly quickly, with cleanup costs remaining well within the range industry experts had originally predicted.',
        isCorrect: false,
        rationale:
          'The passage describes the spill as massive, lasting 87 days with years of cleanup costing billions -- calling it contained and quickly resolved directly contradicts the passage.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage:
      "Sleep researchers have found that teenagers' circadian rhythms shift during puberty, making them naturally inclined to fall asleep later and wake later than younger children or adults. Despite this biological reality, most American high schools start before 8:00 AM, forcing students to learn during their least alert hours. Schools that have shifted to later start times report improvements in attendance, grades, and student mental health  but many districts resist the change due to complications with bus schedules, after-school sports, and parent work hours.",
    question: "What is the author's main purpose in this passage?",
    answerOptions: [
      {
        text: 'The passage mainly argues that early morning physical activity routines can help teenagers overcome the natural fatigue associated with puberty and lead to better overall academic performance results.',
        isCorrect: false,
        rationale:
          'The passage argues the opposite -- early start times conflict with teen biology. It never suggests that early routines help overcome fatigue.',
      },
      {
        text: "The author's main purpose is to present scientific evidence that teenagers' circadian rhythms shift during puberty, educating readers about an important finding in adolescent sleep biology and health outcomes.",
        isCorrect: false,
        rationale:
          "The biological finding is the passage's starting point, not its main purpose -- the author uses it to argue for later start times and explain why change has been slow.",
      },
      {
        text: 'The author aims to show that biology supports later school start times for teens and that evidence confirms the benefits of such changes, while explaining why practical logistics barriers have hindered wider adoption.',
        isCorrect: true,
        rationale:
          'The passage has three layers -- the biological basis, the evidence of benefits, and the practical obstacles -- and this answer captures all three.',
      },
      {
        text: 'The passage employs a circadian-phase-delay framework to critique institutional chronotype misalignment, arguing that systemic schedule inertia perpetuates suboptimal cognitive engagement windows for adolescent learners.',
        isCorrect: false,
        rationale:
          'While loosely related to the topic, this uses dense jargon to restate only part of the argument and omits the practical barriers and evidence of benefits that are central to the passage.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage:
      'The Dust Bowl of the 1930s was not simply a natural disaster. While severe drought triggered the crisis, decades of aggressive farming practices had stripped the Great Plains of native grasses whose deep root systems held topsoil in place. When the rains stopped, millions of tons of exposed soil became airborne, burying farms, sickening families, and forcing hundreds of thousands of people to abandon their land. The catastrophe ultimately led to the creation of the Soil Conservation Service and new farming regulations designed to prevent a recurrence.',
    question: 'What is the main idea of this passage?',
    answerOptions: [
      {
        text: 'The Dust Bowl was a devastating natural disaster triggered entirely by unprecedented drought conditions that stripped the Great Plains of topsoil and displaced hundreds of thousands of farming families in the region.',
        isCorrect: false,
        rationale:
          "The passage's opening sentence explicitly states it was 'not simply a natural disaster' -- this answer ignores the human role in causing the crisis through decades of poor farming practices.",
      },
      {
        text: 'The Dust Bowl was a human-amplified disaster in which decades of unsustainable farming left the land vulnerable to drought, causing massive displacement and ultimately prompting lasting soil conservation policies.',
        isCorrect: true,
        rationale:
          'This captures the human causation, the devastating consequences, and the policy response -- the full argument arc of the passage.',
      },
      {
        text: "The Dust Bowl's primary causal mechanism involved wind erosion feedback loops intensified by depletion of native root structures, creating self-reinforcing soil loss that operated independently of any human agricultural intervention.",
        isCorrect: false,
        rationale:
          "This uses scientific-sounding language to describe erosion while claiming it was independent of human intervention -- directly contradicting the passage's central argument that farming practices were a key cause.",
      },
      {
        text: 'The Dust Bowl was a brief weather event that had little lasting effect on American agricultural policies and did not prompt significant changes in government oversight of farming or land management practices.',
        isCorrect: false,
        rationale:
          'The passage explicitly states the catastrophe led to the Soil Conservation Service and new farming regulations -- claiming no policy impact directly contradicts the text.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage:
      "A letter to the editor argues: 'The city council's plan to widen Oak Avenue will not reduce traffic congestion. Research on induced demand consistently shows that adding highway capacity encourages more people to drive, eventually restoring the original congestion level. Meanwhile, the widening will destroy 200 mature trees, displace three small businesses, and cost taxpayers $14 million. Instead of widening roads, the city should invest in bus rapid transit, which moves more people per lane and doesn't require destroying neighbourhoods.'",
    question: "What is the author's primary purpose in writing this letter?",
    answerOptions: [
      {
        text: 'The author argues against the road-widening plan by demonstrating it will not reduce congestion due to induced demand, highlighting the community harm it would cause, and proposing bus rapid transit as a better option.',
        isCorrect: true,
        rationale:
          'The letter has three argumentative moves: the widening will not work, it will cause harm, and a better alternative exists -- this captures all three.',
      },
      {
        text: "The author's main purpose is to express strong enthusiasm for the Oak Avenue widening project and encourage city council members to proceed quickly while increasing the construction budget beyond fourteen million dollars.",
        isCorrect: false,
        rationale:
          "The letter clearly opposes the widening, calling it ineffective and harmful -- this answer describes the exact opposite of the author's stated position.",
      },
      {
        text: 'The letter employs an induced-demand elasticity model to illustrate that marginal lane-capacity additions paradoxically increase aggregate vehicle miles traveled, though the author ultimately concedes the widening may be justified.',
        isCorrect: false,
        rationale:
          'This uses transportation jargon to partially describe induced demand but then falsely claims the author concedes the widening may be justified -- the author never makes any such concession.',
      },
      {
        text: 'The author primarily aims to educate readers about the academic research behind the concept of induced demand, explaining how adding road capacity leads to more driving that eventually restores congestion.',
        isCorrect: false,
        rationale:
          "Induced demand is one piece of evidence supporting the argument, not the letter's purpose -- the author's goal is persuasion against the widening, not academic education about traffic theory.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage:
      "The Erie Canal, completed in 1825, connected the Great Lakes to the Atlantic Ocean via a 363-mile waterway across New York State. Before the canal, shipping a ton of goods from Buffalo to New York City cost about $100 and took two weeks. After the canal opened, the same shipment cost $10 and took five days. This dramatic reduction in transportation costs transformed New York City into the nation's commercial capital, opened western territories to settlement, and demonstrated the economic power of infrastructure investment.",
    question: 'Which sentence best states the main idea of the passage?',
    answerOptions: [
      {
        text: 'The passage focuses on the Erie Canal as an impressive feat of civil engineering that connected the Great Lakes to the Atlantic Ocean across more than three hundred miles of New York State terrain.',
        isCorrect: false,
        rationale:
          "The canal's physical specifications are introductory context -- the passage's main argument is about the economic and social transformation the canal produced, not the engineering achievement itself.",
      },
      {
        text: "The passage illustrates how reduced freight costs along inland waterways generated downstream economic multiplier effects, though the canal's influence on patterns of westward settlement was merely incidental.",
        isCorrect: false,
        rationale:
          'This uses economic jargon and dismisses the settlement impact as incidental, when the passage presents it as one of three equally important consequences alongside commerce and the value of infrastructure.',
      },
      {
        text: 'The Erie Canal had minimal effect on American commerce or westward migration patterns and was widely considered a financial failure that discouraged future investments in large-scale infrastructure projects.',
        isCorrect: false,
        rationale:
          'The passage states the exact opposite -- the canal transformed commerce, opened the West, and demonstrated the power of infrastructure investment.',
      },
      {
        text: 'The Erie Canal slashed shipping costs and travel time so dramatically that it transformed New York City into a commercial hub, spurred western settlement, and demonstrated the lasting economic value of infrastructure.',
        isCorrect: true,
        rationale:
          "This links the cause -- cost and time reduction -- to the three effects the passage identifies: commercial transformation, western expansion, and proof of infrastructure's value.",
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      'The Americans with Disabilities Act of 1990 was groundbreaking legislation, but its implementation reveals the limits of legal mandates alone. While the ADA required physical accessibility  ramps, elevators, accessible restrooms  many businesses installed the minimum features necessary to avoid lawsuits without creating genuinely welcoming environments. Employment discrimination complaints filed under the ADA have remained consistently high, and the unemployment rate for people with disabilities has barely changed since 1990. Legal protection, it turns out, is necessary but insufficient without cultural change.',
    question: "What is the author's central argument?",
    answerOptions: [
      {
        text: "The ADA's physical accessibility requirements, including ramps and elevators, have been the most effective component of the legislation and should serve as a model for designing future disability rights reforms.",
        isCorrect: false,
        rationale:
          'The passage uses physical features as examples of minimum compliance, not success stories -- the argument is that such minimums fall short of achieving genuine inclusion.',
      },
      {
        text: 'The passage applies a compliance-gap analysis to demonstrate that statutory mandates produce only performative accommodation behaviors, suggesting that legal formalism paradoxically deepens the structural exclusion it was designed to eliminate.',
        isCorrect: false,
        rationale:
          "While related to the topic, this uses dense jargon and distorts the argument -- the author says legal protection is 'necessary but insufficient,' not that it paradoxically deepens exclusion.",
      },
      {
        text: 'The ADA established vital legal protections for people with disabilities, but legal mandates alone have not produced genuine inclusion because many entities comply only minimally and broader cultural change is still needed.',
        isCorrect: true,
        rationale:
          "This captures the passage's thesis: the ADA was necessary and groundbreaking, but the gap between legal compliance and real inclusion shows that cultural change must accompany legal mandates.",
      },
      {
        text: 'The ADA has been so thoroughly successful in eliminating disability discrimination that employment rates for disabled workers have risen dramatically since 1990 and businesses now fully embrace inclusive workplace cultures.',
        isCorrect: false,
        rationale:
          'The passage states the opposite -- discrimination complaints remain high and unemployment rates have barely changed, clearly showing the ADA alone has not achieved its full goals.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      'Public libraries have quietly evolved from book repositories into essential social infrastructure. In many communities, they are the only spaces offering free internet access, job-search assistance, and ESL classes. During extreme weather events, libraries serve as cooling centres and emergency shelters. They host voter registration drives, tax preparation clinics, and after-school programmes. Yet library funding has declined in most states over the past decade, creating a paradox: as libraries become more critical to more people, they receive fewer resources to fulfil those expanding roles.',
    question: "What is the author's primary purpose?",
    answerOptions: [
      {
        text: 'The author argues that public libraries have evolved into indispensable community institutions serving far more functions than book lending, yet their increasingly vital roles are dangerously undermined by steadily declining funding.',
        isCorrect: true,
        rationale:
          'The passage builds toward the paradox in the final sentence -- increasing need meets decreasing funding -- and the listed services are evidence for why this gap is dangerous.',
      },
      {
        text: "The author's primary purpose is to catalog the wide range of modern services public libraries now provide, from free internet access and job-search help to emergency shelter and civic engagement opportunities.",
        isCorrect: false,
        rationale:
          'The services listed are supporting evidence, not the purpose -- the author uses them to build the argument that underfunding endangers institutions communities rely on.',
      },
      {
        text: "The author contends that public libraries have become outdated institutions whose traditional book-lending mission is no longer relevant in today's digital era, making their continued public funding increasingly difficult to justify.",
        isCorrect: false,
        rationale:
          'The passage argues the opposite -- libraries are more relevant than ever because they have expanded well beyond books, which makes declining funding paradoxical rather than justified.',
      },
      {
        text: 'The passage frames libraries as social-infrastructure nodes whose programmatic diversification has inadvertently diluted their core informational mandate, weakening the institutional rationale that historically justified their public expenditure.',
        isCorrect: false,
        rationale:
          'This uses technical language to invert the argument -- the passage says expansion makes libraries more essential, not that diversification has weakened their purpose or justification.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage:
      "A newspaper editorial argued that standardised testing should remain the primary measure of school quality because test scores are 'objective, comparable, and resistant to the biases of subjective evaluation.' The editorial acknowledged that critics complain about 'teaching to the test' but dismissed the concern, stating: 'Any measurement system influences what is measured. The question is whether we prefer a flawed objective measure or no common measure at all.'",
    question:
      'What rhetorical strategy does the editorial use to defend standardised testing?',
    answerOptions: [
      {
        text: 'The editorial leverages an epistemological objectivism framework to privilege quantitative psychometric instruments while dismissing construct-validity concerns as inherent and unavoidable features of any evaluative methodology.',
        isCorrect: false,
        rationale:
          "This uses dense academic jargon to describe the editorial's stance but fails to accurately identify the key rhetorical moves: the false binary framing and the strategic concession followed by dismissal.",
      },
      {
        text: 'The editorial frames the debate as a false choice between keeping standardised tests or having no common measure at all, while acknowledging the teaching-to-the-test criticism only to minimize it as an unavoidable feature of measurement.',
        isCorrect: true,
        rationale:
          'Two rhetorical moves are at work: creating a false dilemma that excludes alternative assessments, and strategically conceding a criticism to appear balanced while reframing it as universal and therefore dismissible.',
      },
      {
        text: 'The editorial relies on extensive statistical data and peer-reviewed research studies to demonstrate that standardised test scores correlate strongly with long-term student success in both higher education and professional careers.',
        isCorrect: false,
        rationale:
          'The editorial presents no statistics or research data -- it relies entirely on logical framing and assertions about objectivity rather than on any empirical evidence.',
      },
      {
        text: 'The editorial defends standardised testing primarily by emphasizing the objectivity and comparability of test scores, arguing that these specific qualities make testing inherently superior to every other form of educational assessment.',
        isCorrect: false,
        rationale:
          'While the editorial mentions objectivity and comparability, its key rhetorical strategy is the false binary and strategic concession -- this answer misses the false dilemma that defines its persuasive approach.',
      },
    ],
    challenge_tags: ['rla-2'],
  },
];
