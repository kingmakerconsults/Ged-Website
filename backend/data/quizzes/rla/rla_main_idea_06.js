// Reading Comprehension  Core: Practice 6 / Main Idea & Author's Purpose
// 10 questions | implied main ideas, author's purpose, tone identification
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "Coral reefs cover less than 1% of the ocean floor, yet they support approximately 25% of all marine species. They serve as nurseries for fish populations that sustain commercial fisheries, protect coastlines from storm surges, and generate billions of dollars annually through tourism. Despite their importance, coral reefs worldwide are threatened by rising ocean temperatures, acidification, and pollution.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Coral reefs are colourful and attract tourists.", isCorrect: false, rationale: "Tourism is one benefit mentioned  the main idea encompasses reefs' outsized ecological and economic importance alongside their vulnerability." },
      { text: "Although coral reefs occupy a tiny fraction of the ocean, they provide enormous ecological and economic value  and that value is increasingly at risk from environmental threats.", isCorrect: true, rationale: "This captures the contrast (small area, huge impact), the multiple values (species, fisheries, coast protection, tourism), and the threat." },
      { text: "Coral reefs cover less than 1% of the ocean floor.", isCorrect: false, rationale: "This is an opening statistic used to establish the contrast, not the main idea." },
      { text: "Ocean temperatures are rising worldwide.", isCorrect: false, rationale: "Rising temperatures are one of several threats listed  not the passage's central point." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "After decades of decline, the bald eagle population in the lower 48 states has quadrupled since 2009, with an estimated 316,700 individual birds counted in a 2021 survey. The recovery is attributed to the 1972 ban on the pesticide DDT, which had thinned eagle eggshells to the point of collapse, and to decades of habitat protection under the Endangered Species Act.",
    question: "Which statement best expresses the main idea?",
    answerOptions: [
      { text: "DDT was banned in 1972.", isCorrect: false, rationale: "The DDT ban is a supporting detail explaining one cause of recovery." },
      { text: "The bald eagle's dramatic population recovery demonstrates the effectiveness of targeted environmental regulations  specifically the DDT ban and habitat protections  in reversing species decline.", isCorrect: true, rationale: "The passage's main argument is that specific regulations worked, and the population rebound is the evidence." },
      { text: "There are 316,700 bald eagles in the United States.", isCorrect: false, rationale: "This is a quantitative detail supporting the recovery narrative." },
      { text: "Bald eagles are the national bird of the United States.", isCorrect: false, rationale: "The passage doesn't mention national symbolism  this is outside information." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'easy',
    passage: "To all residents of Building C: The management company has scheduled a water main replacement for Thursday, March 14. Water service will be interrupted from 9:00 AM to approximately 3:00 PM. Please fill containers with water for drinking and sanitary use before 9:00 AM. The laundry room will be closed for the day. We apologise for the inconvenience and appreciate your patience.",
    question: "What is the primary purpose of this notice?",
    answerOptions: [
      { text: "To apologise for past water problems.", isCorrect: false, rationale: "The apology is a courtesy closing  the notice's primary purpose is to inform about a future service interruption." },
      { text: "To inform residents of a planned water shutoff and advise them on how to prepare.", isCorrect: true, rationale: "The notice provides when (March 14, 9-3), what (water main replacement), and what to do (fill containers, laundry closed)." },
      { text: "To advertise the management company's services.", isCorrect: false, rationale: "This is a practical notice, not an advertisement." },
      { text: "To request that residents stop using too much water.", isCorrect: false, rationale: "The notice doesn't address water conservation  it announces a temporary shutoff." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "The Green Revolution of the 1960s and 1970s introduced high-yield crop varieties, synthetic fertilisers, and mechanised farming to developing countries, dramatically increasing food production and averting predicted famines. However, the same techniques depleted soil nutrients, contaminated groundwater, reduced crop genetic diversity, and concentrated land ownership among wealthier farmers who could afford the new inputs  leaving small subsistence farmers worse off than before.",
    question: "What is the author's main purpose in this passage?",
    answerOptions: [
      { text: "To celebrate the Green Revolution as humanity's greatest achievement.", isCorrect: false, rationale: "The passage presents both benefits and harms  it doesn't celebrate unconditionally." },
      { text: "To present the Green Revolution as a mixed outcome: a life-saving agricultural advance that also created serious environmental and social costs, particularly for the small farmers it was meant to help.", isCorrect: true, rationale: "The 'However' turn signals the dual-outcome structure: success (famine prevention) alongside harm (environmental damage, inequality)." },
      { text: "To argue that all modern farming is harmful.", isCorrect: false, rationale: "The passage acknowledges the Green Revolution saved lives  it critiques specific consequences, not all modern farming." },
      { text: "To explain how synthetic fertilisers are manufactured.", isCorrect: false, rationale: "Manufacturing processes are not discussed  fertilisers are mentioned as one input among several." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "In many American cities, food deserts  neighbourhoods with limited access to affordable, nutritious food  overlap almost perfectly with maps of historical redlining, the practice by which banks and the federal government systematically denied mortgages and investment to Black neighbourhoods in the mid-20th century. The lack of investment meant fewer grocery stores, which meant less fresh food, which contributed to higher rates of diet-related illness that persist today. The geography of health inequality, in other words, was designed.",
    question: "What does the author mean by the final sentence, 'The geography of health inequality was designed'?",
    answerOptions: [
      { text: "City planners intentionally created food deserts to harm certain populations.", isCorrect: false, rationale: "The author attributes the outcome to systemic policy (redlining), not to a deliberate plan to create food deserts specifically." },
      { text: "The health disparities visible today are not random  they trace directly to deliberate mid-20th-century policies that denied investment to Black neighbourhoods, creating conditions (fewer stores, less fresh food) whose health effects compound over generations.", isCorrect: true, rationale: "'Designed' refers to the policy choices (redlining) that created the geographic pattern. The author connects past policy to present health outcomes through a causal chain." },
      { text: "All American cities have the same health outcomes.", isCorrect: false, rationale: "The passage describes inequality  different outcomes in different neighbourhoods." },
      { text: "Food deserts are caused by residents' personal food choices.", isCorrect: false, rationale: "The passage attributes food deserts to structural investment patterns, not individual choices." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'medium',
    passage: "A company memo reads: 'Effective January 1, our remote work policy will be updated. Employees who have been remote since 2020 will now be required to work from the office three days per week. This change reflects our commitment to collaboration and preserving company culture. Employees who cannot comply should discuss alternative arrangements with their managers by December 15.'",
    question: "What is the author's primary purpose, and what assumption underlies the policy?",
    answerOptions: [
      { text: "To punish employees who have been working remotely.", isCorrect: false, rationale: "The tone is administrative, not punitive  the memo offers alternatives ('discuss with managers')." },
      { text: "To announce a mandatory return-to-office policy, justified by the assumption that physical presence is necessary for collaboration and culture  an assumption the memo asserts but does not support with evidence.", isCorrect: true, rationale: "The memo states collaboration and culture as reasons but provides no data showing remote work harmed either. The assumption that in-person work is inherently better is unexamined." },
      { text: "To explain the benefits of remote work.", isCorrect: false, rationale: "The memo moves away from remote work  it does not describe its benefits." },
      { text: "To invite employees to vote on the policy.", isCorrect: false, rationale: "The policy is being announced, not put to a vote." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "The Flint, Michigan, water crisis began in 2014 when the city switched its water source to the Flint River to save money. The river water was more corrosive than the previous supply and was not treated with anti-corrosion agents, causing lead to leach from aging pipes into drinking water. State officials dismissed residents' complaints about discoloured, foul-smelling water for over a year. Independent testing eventually confirmed lead levels far above safe limits. The crisis exposed how cost-cutting decisions, infrastructure neglect, and dismissal of a predominantly Black community's concerns could converge into a public health catastrophe.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Flint's water was discoloured and smelled bad.", isCorrect: false, rationale: "Discolouration was a symptom  the main idea is about the systemic causes and their convergence." },
      { text: "The Flint water crisis resulted from the intersection of budget-driven decisions, infrastructure decay, and institutional dismissal of residents' health concerns  illustrating how multiple systemic failures combine to produce environmental injustice.", isCorrect: true, rationale: "The passage builds from specific events to a systemic argument in the final sentence: cost-cutting + neglect + dismissal = catastrophe. This is the thesis." },
      { text: "Lead pipes are dangerous and should be replaced.", isCorrect: false, rationale: "Pipe safety is implied but the passage's argument is about the systemic conditions that allowed lead exposure to occur and persist." },
      { text: "Flint switched its water source in 2014.", isCorrect: false, rationale: "The water source switch is the triggering event, not the main idea." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A historian writes: 'The popular image of the American frontier as a space of rugged individualism obscures a more complex reality. Settlers depended heavily on federal land grants, military protection from Indigenous resistance, and government-funded railroads. The frontier was not conquered by lone pioneers; it was opened by public investment and secured by organised violence. To celebrate frontier individualism without acknowledging this foundation is to build national mythology on selective memory.'",
    question: "What is the historian's central argument?",
    answerOptions: [
      { text: "The American frontier was entirely peaceful and cooperative.", isCorrect: false, rationale: "The author mentions 'organised violence'  the argument is not that the frontier was peaceful." },
      { text: "The myth of frontier individualism hides the central role of government support and military force in westward expansion  and the selective memory that sustains this myth distorts national identity.", isCorrect: true, rationale: "The argument has two layers: the historical reality (government and military enabled expansion) and the critique of mythology (celebrating individualism while forgetting the public investment and violence)." },
      { text: "Railroads were the most important technology of the 19th century.", isCorrect: false, rationale: "Railroads are one example of government support  not the historian's central claim." },
      { text: "All American history is mythology.", isCorrect: false, rationale: "The historian critiques one specific myth, not all historical understanding." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "An op-ed argues: 'Opponents of universal pre-K claim it is too expensive, projecting annual costs of $30 billion. They rarely mention that the United States spends $80 billion annually on incarceration, or that longitudinal studies show every dollar invested in quality early childhood education returns $7-12 in reduced crime, higher earnings, and lower welfare costs. The question is not whether we can afford pre-K. It is whether we can afford not to invest in it.'",
    question: "What rhetorical technique does the author use in the final two sentences?",
    answerOptions: [
      { text: "The author uses statistics that are probably false.", isCorrect: false, rationale: "The author cites specific longitudinal studies  the question is about rhetorical technique, not data accuracy." },
      { text: "The author reframes the debate from 'Can we afford this?' to 'Can we afford inaction?'  inverting the cost argument by showing that not investing carries higher long-term costs than the investment itself.", isCorrect: true, rationale: "This is a reframing technique: accepting the opponent's cost concern, then showing the alternative (no pre-K) is more expensive. The question shifts from 'Can we pay?' to 'Can we afford not to?'" },
      { text: "The author attacks opponents personally.", isCorrect: false, rationale: "The author challenges the argument, not the people making it  there are no personal attacks." },
      { text: "The author changes the subject from education to incarceration.", isCorrect: false, rationale: "Incarceration costs are connected to education through the longitudinal data  they're the same argument, not a subject change." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "Two newspaper columnists reviewed the same restaurant. Columnist A wrote: 'The truffle risotto was transcendent  creamy, earthy, and finished with just enough Parmesan to add salt without obscuring the truffle. Service was attentive without hovering.' Columnist B wrote: 'Forty-two dollars for a small bowl of rice with a few truffle shavings. The server checked on us every three minutes. If I wanted to be surveilled while eating, I'd dine in a prison cafeteria.'",
    question: "How do the two reviewers describe the same dining experience differently?",
    answerOptions: [
      { text: "They went to different restaurants on different nights.", isCorrect: false, rationale: "The passage states they reviewed the same restaurant  the difference is in perspective, not venue." },
      { text: "They describe identical facts  risotto with truffle and Parmesan, frequent server visits  but frame them through opposing values: Columnist A emphasises quality and attentiveness, while Columnist B emphasises cost-to-value ratio and intrusiveness, showing how authorial perspective shapes description of the same experience.", isCorrect: true, rationale: "The risotto ingredients and server frequency are the same facts. A sees 'transcendent' and 'attentive'; B sees overpriced and intrusive. The lesson is that descriptive choices reveal the writer's evaluative framework." },
      { text: "Columnist A is honest and Columnist B is lying.", isCorrect: false, rationale: "Neither is dishonest  they apply different value systems to the same facts." },
      { text: "Restaurant reviews are always unreliable.", isCorrect: false, rationale: "The passage illustrates perspective dependence, not universal unreliability." },
    ],
    challenge_tags: ['rla-2'],
  },
];
