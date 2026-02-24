// Reading Comprehension  Core: Practice 5 / Main Idea & Author's Purpose
// 10 questions | identifying central claims, distinguishing main ideas from details
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "The Great Migration refers to the movement of approximately six million Black Americans from the rural South to northern and western cities between 1910 and 1970. Pushed by Jim Crow laws, limited economic opportunity, and racial violence, and pulled by industrial jobs and the promise of greater freedom, this mass relocation reshaped American culture, politics, and demographics in ways still felt today.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "The Great Migration was caused solely by the availability of industrial jobs in northern cities.", isCorrect: false, rationale: "Jobs were a pull factor, but the passage identifies multiple push factors (Jim Crow, limited opportunity, violence)  reducing the cause to one factor misrepresents the main idea." },
      { text: "The Great Migration was a massive demographic shift driven by both oppressive conditions in the South and opportunities in the North, with lasting effects on American society.", isCorrect: true, rationale: "This captures the passage's full scope: the scale (six million), the dual push-pull causes, and the lasting impact." },
      { text: "Six million people moved to northern cities between 1910 and 1970.", isCorrect: false, rationale: "This is a supporting detail (the scale), not the main idea, which includes causes and effects." },
      { text: "Jim Crow laws were the worst period in American history.", isCorrect: false, rationale: "The passage mentions Jim Crow as one push factor  it doesn't make a comparative historical judgement." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "Many cities are converting vacant lots into pocket parks  small green spaces typically less than a quarter acre. These mini-parks provide shade that reduces local temperatures, capture rainwater that would otherwise overwhelm storm drains, and give residents in dense neighbourhoods a place to sit, read, or let children play. Because they require relatively little funding compared to traditional parks, pocket parks are especially attractive to cash-strapped municipalities.",
    question: "Which statement best expresses the main idea of this passage?",
    answerOptions: [
      { text: "Pocket parks are smaller than traditional parks.", isCorrect: false, rationale: "Size is a defining detail, not the central point  the passage argues for pocket parks' multiple benefits." },
      { text: "Pocket parks offer environmental, social, and financial advantages that make them a practical green-space solution for cities with limited resources.", isCorrect: true, rationale: "This synthesises the three benefit categories (temperature/stormwater, recreation, low cost) into a single main idea." },
      { text: "Cities should eliminate all traditional parks and replace them with pocket parks.", isCorrect: false, rationale: "The passage doesn't argue against traditional parks  it explains why pocket parks are attractive additions." },
      { text: "Children need safe places to play outdoors.", isCorrect: false, rationale: "Children's play is one of several uses mentioned  not the passage's central argument." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'easy',
    passage: "In 2010, a massive oil spill in the Gulf of Mexico released approximately 4.9 million barrels of crude oil over 87 days. The disaster killed eleven workers, devastated fishing and tourism industries along the coast, and caused widespread damage to marine and coastal ecosystems. Cleanup efforts lasted years and cost billions of dollars, and some environmental effects are still being studied more than a decade later.",
    question: "What is the central point of the passage?",
    answerOptions: [
      { text: "The 2010 Gulf oil spill was a catastrophic event with severe human, economic, and environmental consequences that persisted long after the spill itself.", isCorrect: true, rationale: "This covers all three categories of impact (human lives, economic damage, environmental harm) and their lasting nature." },
      { text: "Oil spills always last exactly 87 days.", isCorrect: false, rationale: "87 days describes this specific spill  the passage doesn't generalise about all oil spills." },
      { text: "Eleven workers died in the oil spill.", isCorrect: false, rationale: "Worker deaths are a supporting detail within the broader catastrophe described." },
      { text: "Cleanup efforts for oil spills are too expensive.", isCorrect: false, rationale: "The passage mentions cost but doesn't argue cleanup is 'too expensive'  that's a judgement the passage doesn't make." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "Sleep researchers have found that teenagers' circadian rhythms shift during puberty, making them naturally inclined to fall asleep later and wake later than younger children or adults. Despite this biological reality, most American high schools start before 8:00 AM, forcing students to learn during their least alert hours. Schools that have shifted to later start times report improvements in attendance, grades, and student mental health  but many districts resist the change due to complications with bus schedules, after-school sports, and parent work hours.",
    question: "What is the author's main purpose in this passage?",
    answerOptions: [
      { text: "To explain that teenagers are lazy and stay up too late.", isCorrect: false, rationale: "The passage specifically attributes later sleep timing to biological circadian shifts, not laziness." },
      { text: "To argue that biology supports later school start times for teens, acknowledge the evidence of benefits, and explain why practical barriers have prevented widespread adoption.", isCorrect: true, rationale: "The passage has three layers: the biological basis, the evidence of benefit, and the obstacles  this captures all three." },
      { text: "To describe how bus schedules work in American school districts.", isCorrect: false, rationale: "Bus scheduling is one of several practical obstacles mentioned  not the passage's focus." },
      { text: "To prove that all schools must immediately change their start times.", isCorrect: false, rationale: "The passage presents evidence and acknowledges barriers  it doesn't demand immediate universal change." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "The Dust Bowl of the 1930s was not simply a natural disaster. While severe drought triggered the crisis, decades of aggressive farming practices had stripped the Great Plains of native grasses whose deep root systems held topsoil in place. When the rains stopped, millions of tons of exposed soil became airborne, burying farms, sickening families, and forcing hundreds of thousands of people to abandon their land. The catastrophe ultimately led to the creation of the Soil Conservation Service and new farming regulations designed to prevent a recurrence.",
    question: "What is the main idea of this passage?",
    answerOptions: [
      { text: "The Dust Bowl was caused by drought in the 1930s.", isCorrect: false, rationale: "The passage's opening sentence explicitly states it was 'not simply a natural disaster'  drought was a trigger, not the sole cause." },
      { text: "The Dust Bowl was a human-amplified disaster in which unsustainable farming practices made the land vulnerable to drought, causing massive displacement and prompting lasting policy changes.", isCorrect: true, rationale: "This captures the human causation, the consequences, and the policy response  the passage's full argument arc." },
      { text: "The Soil Conservation Service was created in the 1930s.", isCorrect: false, rationale: "This is a concluding detail about the policy response  not the main idea." },
      { text: "Native grasses have deep root systems.", isCorrect: false, rationale: "Root systems are a supporting scientific detail explaining the mechanism, not the central point." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'medium',
    passage: "A letter to the editor argues: 'The city council's plan to widen Oak Avenue will not reduce traffic congestion. Research on induced demand consistently shows that adding highway capacity encourages more people to drive, eventually restoring the original congestion level. Meanwhile, the widening will destroy 200 mature trees, displace three small businesses, and cost taxpayers $14 million. Instead of widening roads, the city should invest in bus rapid transit, which moves more people per lane and doesn't require destroying neighbourhoods.'",
    question: "What is the author's primary purpose in writing this letter?",
    answerOptions: [
      { text: "To inform readers about the concept of induced demand.", isCorrect: false, rationale: "Induced demand is used as evidence, not as the letter's purpose  the author's goal is to oppose the widening and propose an alternative." },
      { text: "To argue against the road-widening plan by showing it won't solve congestion, will cause significant harm, and to propose bus rapid transit as a superior alternative.", isCorrect: true, rationale: "The letter has three argumentative moves: the widening won't work (induced demand), it will cause harm (trees, businesses, cost), and an alternative exists (BRT). The purpose is persuasion, not information." },
      { text: "To explain how bus rapid transit systems work.", isCorrect: false, rationale: "BRT is proposed as an alternative in one sentence  the letter doesn't explain how it works." },
      { text: "To describe the scientific research on induced demand.", isCorrect: false, rationale: "Induced demand is one piece of evidence  the letter's purpose is advocacy, not scientific description." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'medium',
    passage: "The Erie Canal, completed in 1825, connected the Great Lakes to the Atlantic Ocean via a 363-mile waterway across New York State. Before the canal, shipping a ton of goods from Buffalo to New York City cost about $100 and took two weeks. After the canal opened, the same shipment cost $10 and took five days. This dramatic reduction in transportation costs transformed New York City into the nation's commercial capital, opened western territories to settlement, and demonstrated the economic power of infrastructure investment.",
    question: "Which sentence best states the main idea of the passage?",
    answerOptions: [
      { text: "The Erie Canal was 363 miles long and connected the Great Lakes to the Atlantic.", isCorrect: false, rationale: "Physical specifications are introductory details, not the central argument." },
      { text: "The Erie Canal drastically reduced shipping costs and time, which transformed commerce, expanded westward settlement, and proved the transformative economic value of infrastructure.", isCorrect: true, rationale: "This links the cause (cost and time reduction) to the effects (commercial, territorial, and conceptual)  the passage's core argument." },
      { text: "Shipping costs dropped from $100 to $10 per ton.", isCorrect: false, rationale: "These numbers are supporting evidence for the main idea, not the main idea itself." },
      { text: "New York City became the nation's commercial capital because of its location.", isCorrect: false, rationale: "The passage credits the canal specifically  not just NYC's location." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "The Americans with Disabilities Act of 1990 was groundbreaking legislation, but its implementation reveals the limits of legal mandates alone. While the ADA required physical accessibility  ramps, elevators, accessible restrooms  many businesses installed the minimum features necessary to avoid lawsuits without creating genuinely welcoming environments. Employment discrimination complaints filed under the ADA have remained consistently high, and the unemployment rate for people with disabilities has barely changed since 1990. Legal protection, it turns out, is necessary but insufficient without cultural change.",
    question: "What is the author's central argument?",
    answerOptions: [
      { text: "The ADA was a failure and should be repealed.", isCorrect: false, rationale: "The author calls the ADA 'groundbreaking' and 'necessary'  the argument is that it isn't sufficient, not that it should be repealed." },
      { text: "Physical ramps and elevators are the most important accessibility features.", isCorrect: false, rationale: "Physical features are mentioned as examples of minimum compliance  the passage argues these aren't enough." },
      { text: "The ADA established essential legal protections, but legal mandates alone have not achieved genuine inclusion because many entities comply minimally and underlying employment discrimination persists  real progress requires cultural change alongside legal requirements.", isCorrect: true, rationale: "The passage's thesis is the gap between legal mandate and actual outcome  'necessary but insufficient' is the core claim." },
      { text: "Employment discrimination doesn't exist in the United States.", isCorrect: false, rationale: "The passage explicitly states discrimination complaints remain high  it argues the opposite." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "Public libraries have quietly evolved from book repositories into essential social infrastructure. In many communities, they are the only spaces offering free internet access, job-search assistance, and ESL classes. During extreme weather events, libraries serve as cooling centres and emergency shelters. They host voter registration drives, tax preparation clinics, and after-school programmes. Yet library funding has declined in most states over the past decade, creating a paradox: as libraries become more critical to more people, they receive fewer resources to fulfil those expanding roles.",
    question: "What is the author's primary purpose?",
    answerOptions: [
      { text: "To list the programmes offered by public libraries.", isCorrect: false, rationale: "The programmes are evidence supporting the argument, not the purpose itself." },
      { text: "To argue that public libraries have become indispensable community institutions whose expanding roles are dangerously underfunded  creating a growing gap between what communities need and what libraries can provide.", isCorrect: true, rationale: "The passage builds toward the paradox in the final sentence: increasing need meets decreasing funding. The services listed are evidence for why this gap is dangerous." },
      { text: "To explain why libraries should stop lending books.", isCorrect: false, rationale: "The passage describes evolution, not abandonment  libraries still lend books while also doing much more." },
      { text: "To praise library workers for their dedication.", isCorrect: false, rationale: "The passage discusses institutional roles and funding, not individual staff members." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A newspaper editorial argued that standardised testing should remain the primary measure of school quality because test scores are 'objective, comparable, and resistant to the biases of subjective evaluation.' The editorial acknowledged that critics complain about 'teaching to the test' but dismissed the concern, stating: 'Any measurement system influences what is measured. The question is whether we prefer a flawed objective measure or no common measure at all.'",
    question: "What rhetorical strategy does the editorial use to defend standardised testing?",
    answerOptions: [
      { text: "It presents overwhelming statistical evidence proving tests are accurate.", isCorrect: false, rationale: "The editorial offers no statistics  it relies on logical framing rather than data." },
      { text: "The editorial frames the debate as a false binary  either keep standardised tests or have 'no common measure at all'  ignoring alternative assessment methods while acknowledging the teaching-to-the-test criticism only to minimise it by normalising measurement influence.", isCorrect: true, rationale: "Two rhetorical moves: (1) creating a false dilemma (tests vs. nothing) that excludes alternative measures, and (2) acknowledging criticism to appear balanced while reframing it as universal and therefore dismissible." },
      { text: "It quotes educational researchers who support testing.", isCorrect: false, rationale: "No researchers are quoted  the editorial relies on its own assertions." },
      { text: "It argues that teachers enjoy giving standardised tests.", isCorrect: false, rationale: "Teacher opinions about administering tests are not mentioned." },
    ],
    challenge_tags: ['rla-2'],
  },
];
