// Reading Comprehension  Core: Practice 6 / Main Idea & Author's Purpose
// 10 questions | implied main ideas, author's purpose, tone identification
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "Coral reefs cover less than 1% of the ocean floor, yet they support approximately 25% of all marine species. They serve as nurseries for fish populations that sustain commercial fisheries, protect coastlines from storm surges, and generate billions of dollars annually through tourism. Despite their importance, coral reefs worldwide are threatened by rising ocean temperatures, acidification, and pollution.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Rising ocean temperatures, acidification, and pollution pose the greatest current challenges to the health of marine ecosystems worldwide", isCorrect: false, rationale: "Threats are only part of the passage; the main idea also emphasizes the disproportionate value reefs provide despite their small area." },
      { text: "Commercial fisheries that depend on reef nursery habitats generate significantly more economic output than revenue from coastal tourism", isCorrect: false, rationale: "The passage mentions both fisheries and tourism as benefits but never compares their economic contributions to each other." },
      { text: "Despite their tiny footprint, coral reefs deliver immense ecological and economic value that is now endangered by growing environmental changes", isCorrect: true, rationale: "This captures the core contrast between small ocean coverage and enormous ecological and economic impact, plus the escalating threat to that value." },
      { text: "The proportion of marine species a reef system can support is largely determined by how much of the total ocean floor the reef covers", isCorrect: false, rationale: "The passage states reefs support 25% of species despite covering less than 1% of the floor, which is the opposite of a proportional relationship." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "After decades of decline, the bald eagle population in the lower 48 states has quadrupled since 2009, with an estimated 316,700 individual birds counted in a 2021 survey. The recovery is attributed to the 1972 ban on the pesticide DDT, which had thinned eagle eggshells to the point of collapse, and to decades of habitat protection under the Endangered Species Act.",
    question: "Which statement best expresses the main idea?",
    answerOptions: [
      { text: "The bald eagle's dramatic recovery demonstrates that targeted regulations like the DDT ban and habitat protections can effectively reverse species decline", isCorrect: true, rationale: "The passage connects the DDT ban and habitat protections directly to the population quadrupling, framing recovery as proof of regulatory effectiveness." },
      { text: "The 1972 ban on DDT was the single most consequential environmental policy decision of the twentieth century for American wildlife conservation", isCorrect: false, rationale: "The DDT ban is one of two key factors cited; the passage is about eagle recovery from combined regulations, not about ranking policy decisions." },
      { text: "Population surveys counting bald eagle numbers since 2009 suggest that wildlife recovery rates depend heavily on how the surveys are actually conducted", isCorrect: false, rationale: "The 2021 survey is cited as evidence of recovery, not as commentary on how survey methodology affects reported population numbers." },
      { text: "Federal habitat protections under the Endangered Species Act have been applied too broadly to justify the ongoing costs of enforcement and monitoring", isCorrect: false, rationale: "The passage portrays the Endangered Species Act positively as a contributor to the eagle's success, not as an overly broad or costly program." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'easy',
    passage: "To all residents of Building C: The management company has scheduled a water main replacement for Thursday, March 14. Water service will be interrupted from 9:00 AM to approximately 3:00 PM. Please fill containers with water for drinking and sanitary use before 9:00 AM. The laundry room will be closed for the day. We apologise for the inconvenience and appreciate your patience.",
    question: "What is the primary purpose of this notice?",
    answerOptions: [
      { text: "To explain the technical reasons a water main replacement is necessary and describe how the infrastructure upgrade will be carried out", isCorrect: false, rationale: "The notice announces the shutoff and offers preparation steps but does not explain why the replacement is needed or describe the construction process." },
      { text: "To promote the management company by highlighting the quality and overall reliability of its building maintenance and repair service offerings", isCorrect: false, rationale: "The notice is a practical advisory about a temporary disruption, not a promotional piece; it even includes an apology rather than a sales pitch." },
      { text: "To require that all building residents permanently reduce their daily household water consumption in order to prevent future infrastructure problems", isCorrect: false, rationale: "The shutoff is a single-day event, not a permanent conservation mandate; the notice asks residents to store water temporarily, not to reduce usage." },
      { text: "To alert residents to a scheduled water service interruption on a specific date and provide practical steps they should take to prepare in advance", isCorrect: true, rationale: "The notice specifies the date, time window, and actions residents should take such as filling containers and avoiding laundry, making preparation its clear purpose." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "The Green Revolution of the 1960s and 1970s introduced high-yield crop varieties, synthetic fertilisers, and mechanised farming to developing countries, dramatically increasing food production and averting predicted famines. However, the same techniques depleted soil nutrients, contaminated groundwater, reduced crop genetic diversity, and concentrated land ownership among wealthier farmers who could afford the new inputs  leaving small subsistence farmers worse off than before.",
    question: "What is the author's main purpose in this passage?",
    answerOptions: [
      { text: "To recommend that modern farmers abandon synthetic fertilizers entirely and return to exclusively traditional and organic methods of cultivation", isCorrect: false, rationale: "The passage acknowledges the Green Revolution saved lives; it critiques specific consequences rather than calling for a wholesale return to older methods." },
      { text: "To present the Green Revolution as a double-edged advance that prevented widespread famine but also caused environmental harm and deepened inequality", isCorrect: true, rationale: "The passage's 'However' pivot explicitly presents both life-saving benefits and environmental and social costs, framing the overall outcome as mixed." },
      { text: "To argue that small subsistence farmers in the developing world suffered far more harm from modern agricultural practices than they ever gained", isCorrect: false, rationale: "The passage notes small farmers were left worse off, but it also credits the Green Revolution with averting famine; the argument is balanced, not one-sided." },
      { text: "To compare the crop yields of mechanized farming techniques against the genetic diversity levels maintained by older traditional crop variety systems", isCorrect: false, rationale: "The passage does not set up a direct statistical comparison between yields and genetic diversity; it lists consequences in sequence rather than comparing data." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "In many American cities, food deserts  neighbourhoods with limited access to affordable, nutritious food  overlap almost perfectly with maps of historical redlining, the practice by which banks and the federal government systematically denied mortgages and investment to Black neighbourhoods in the mid-20th century. The lack of investment meant fewer grocery stores, which meant less fresh food, which contributed to higher rates of diet-related illness that persist today. The geography of health inequality, in other words, was designed.",
    question: "What does the author mean by the final sentence, 'The geography of health inequality was designed'?",
    answerOptions: [
      { text: "Today's health disparities are a direct product of deliberate redlining policies that systematically denied investment to Black neighborhoods over decades", isCorrect: true, rationale: "The author traces a causal chain from redlining to fewer stores to less fresh food to worse health, calling these patterned outcomes 'designed' by past policy." },
      { text: "City planners in the mid-twentieth century intentionally drew up food deserts to restrict access to nutritious food in specifically targeted communities", isCorrect: false, rationale: "The author attributes the outcome to systemic redlining policy, not to a deliberate blueprint by city planners aiming to create food deserts specifically." },
      { text: "Food desert research relies on overlapping historical and modern maps to determine which urban neighborhoods currently receive adequate grocery coverage", isCorrect: false, rationale: "The passage uses map overlaps as evidence of a systemic causal link, not as a description of how researchers study food deserts methodologically." },
      { text: "All American cities exhibit identical patterns of health disparity because federal housing policies were applied uniformly across every metropolitan area", isCorrect: false, rationale: "The passage describes geographic inequality with different outcomes in different neighborhoods, not uniform patterns applied identically in every city." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'medium',
    passage: "A company memo reads: 'Effective January 1, our remote work policy will be updated. Employees who have been remote since 2020 will now be required to work from the office three days per week. This change reflects our commitment to collaboration and preserving company culture. Employees who cannot comply should discuss alternative arrangements with their managers by December 15.'",
    question: "What is the author's primary purpose, and what assumption underlies the policy?",
    answerOptions: [
      { text: "To discipline employees who have not met their remote productivity benchmarks during the past several years of working from home full time", isCorrect: false, rationale: "The memo's tone is administrative, not disciplinary, and it offers alternative arrangements with managers rather than consequences for poor performance." },
      { text: "To collect data on employee commuting preferences so the company can design a flexible hybrid schedule based on the results of an internal survey", isCorrect: false, rationale: "The policy is being announced as a decision already made and implemented, not proposed as a survey or collaborative schedule-design exercise." },
      { text: "To announce a mandatory return-to-office policy based on the unexamined assumption that physical presence is necessary for collaboration and culture", isCorrect: true, rationale: "The memo asserts collaboration and culture as justifications but provides no evidence that remote work harmed either, leaving the core assumption unexamined." },
      { text: "To invite employees to negotiate their own preferred hybrid work schedules by beginning an open dialogue with their managers before the stated deadline", isCorrect: false, rationale: "The memo requires compliance and directs those who cannot comply to discuss alternatives; it is not an open invitation to negotiate preferences freely." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "The Flint, Michigan, water crisis began in 2014 when the city switched its water source to the Flint River to save money. The river water was more corrosive than the previous supply and was not treated with anti-corrosion agents, causing lead to leach from aging pipes into drinking water. State officials dismissed residents' complaints about discoloured, foul-smelling water for over a year. Independent testing eventually confirmed lead levels far above safe limits. The crisis exposed how cost-cutting decisions, infrastructure neglect, and dismissal of a predominantly Black community's concerns could converge into a public health catastrophe.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Cost-cutting measures by city officials were the sole cause of the Flint water crisis and should remain the primary focus of all accountability efforts", isCorrect: false, rationale: "Cost-cutting triggered the crisis, but the main idea is about how multiple systemic failures, not budget decisions alone, converged to cause it." },
      { text: "The discolored appearance and unpleasant odor of the water supply were the most reliable early indicators that dangerous lead contamination was present", isCorrect: false, rationale: "Discoloration was a symptom residents noticed, but the passage focuses on the systemic causes and institutional dismissal, not on sensory indicators." },
      { text: "Independent water testing confirmed that applying standard corrosion-control treatment to the river supply could have kept lead within safe limits", isCorrect: false, rationale: "Anti-corrosion treatment is mentioned as an omission that worsened the problem, but the main idea is the systemic convergence, not one technical fix." },
      { text: "The Flint crisis resulted from budget cuts, infrastructure neglect, and institutional dismissal of residents' concerns all converging into environmental injustice", isCorrect: true, rationale: "The passage builds toward its final sentence identifying cost-cutting, neglect, and dismissal of complaints as intersecting causes of a public health catastrophe." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A historian writes: 'The popular image of the American frontier as a space of rugged individualism obscures a more complex reality. Settlers depended heavily on federal land grants, military protection from Indigenous resistance, and government-funded railroads. The frontier was not conquered by lone pioneers; it was opened by public investment and secured by organised violence. To celebrate frontier individualism without acknowledging this foundation is to build national mythology on selective memory.'",
    question: "What is the historian's central argument?",
    answerOptions: [
      { text: "The myth of frontier individualism conceals the essential roles of government support and organized military force in actually enabling westward expansion", isCorrect: true, rationale: "The historian argues the 'popular image' of rugged individualism 'obscures' government funding, land grants, and organized violence that actually drove expansion." },
      { text: "Federal land grants and government railroad funding were more important to western settlement than any individual pioneer effort or personal initiative was", isCorrect: false, rationale: "The historian's point is not ranking contributions but exposing a myth; the passage critiques mythology, not just the relative importance of policies." },
      { text: "Government-funded railroads were the single most important technological development that made large-scale westward territorial expansion a practical possibility", isCorrect: false, rationale: "Railroads are one example cited among several forms of government investment; the argument addresses a full pattern of public support and military force." },
      { text: "National mythology about the frontier rests on selective memory, which shows that all widely held historical narratives are similarly unreliable and biased", isCorrect: false, rationale: "The historian critiques one specific frontier myth, not all historical narratives; extending the claim to all of history overgeneralizes the argument." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "An op-ed argues: 'Opponents of universal pre-K claim it is too expensive, projecting annual costs of $30 billion. They rarely mention that the United States spends $80 billion annually on incarceration, or that longitudinal studies show every dollar invested in quality early childhood education returns $7-12 in reduced crime, higher earnings, and lower welfare costs. The question is not whether we can afford pre-K. It is whether we can afford not to invest in it.'",
    question: "What rhetorical technique does the author use in the final two sentences?",
    answerOptions: [
      { text: "The author draws a direct equivalence between incarceration and education budgets to argue that federal spending priorities should be completely reversed", isCorrect: false, rationale: "The author uses incarceration costs for comparative scale, not to propose budget equivalence; the technique is reframing affordability, not advocating spending swaps." },
      { text: "The author reframes the cost debate from whether we can afford pre-K to whether we can afford inaction, turning the opponent's cost argument against them", isCorrect: true, rationale: "The final sentences shift 'Can we afford it?' to 'Can we afford not to?', flipping the cost concern so that inaction, not investment, carries the burden of proof." },
      { text: "The author relies on emotional language rather than factual evidence to persuade the audience that childhood education programs deserve more financial support", isCorrect: false, rationale: "The author cites specific dollar figures and longitudinal study findings; the technique is evidence-based reframing, not an emotional appeal." },
      { text: "The author concedes that universal pre-K is expensive but argues long-term savings from reduced crime and higher earnings justify the large initial spending", isCorrect: false, rationale: "This describes a cost-benefit argument, but the specific rhetorical technique in the final sentences is reframing the question itself, not listing benefits." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "Two newspaper columnists reviewed the same restaurant. Columnist A wrote: 'The truffle risotto was transcendent  creamy, earthy, and finished with just enough Parmesan to add salt without obscuring the truffle. Service was attentive without hovering.' Columnist B wrote: 'Forty-two dollars for a small bowl of rice with a few truffle shavings. The server checked on us every three minutes. If I wanted to be surveilled while eating, I'd dine in a prison cafeteria.'",
    question: "How do the two reviewers describe the same dining experience differently?",
    answerOptions: [
      { text: "Columnist A provides a more trustworthy review because detailed sensory descriptions of food indicate greater culinary expertise than price-focused criticism", isCorrect: false, rationale: "The passage does not rank the reviewers' credibility; it illustrates how different value systems produce contrasting descriptions of the same meal." },
      { text: "Both columnists agree on the factual details of the meal but arrive at different conclusions because they visited the restaurant on entirely separate occasions", isCorrect: false, rationale: "The passage states they reviewed the same restaurant; their differing conclusions stem from perspective and values, not from separate visits." },
      { text: "Both reviewers present identical facts but frame them through opposing values, revealing how an author's perspective shapes the portrayal of the same experience", isCorrect: true, rationale: "Columnist A values quality and attentiveness while B values cost-efficiency and privacy; identical facts yield opposite characterizations depending on perspective." },
      { text: "Restaurant reviews are fundamentally subjective and therefore cannot provide the reliability that consumers need when making well-informed dining decisions", isCorrect: false, rationale: "The passage demonstrates perspective dependence in one specific comparison, not that all restaurant reviews are too unreliable to be useful." },
    ],
    challenge_tags: ['rla-2'],
  },
];
