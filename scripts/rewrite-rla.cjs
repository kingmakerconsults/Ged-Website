/**
 * rewrite-rla.cjs
 * Overwrites RLA non-foundations files with properly tiered content.
 * Foundations (01-03) are preserved.
 * Run: node scripts/rewrite-rla.cjs
 */

const fs = require('fs');
const path = require('path');

const RLA_DIR = path.join(__dirname, '../backend/data/quizzes/rla');

function write(filename, content) {
  fs.writeFileSync(path.join(RLA_DIR, filename), content.trim(), 'utf8');
  console.log(`  ✓ ${filename}`);
}

// ─── EVIDENCE ─────────────────────────────────────────────────────────────────

write(
  'rla_evidence_04.js',
  `
// Evidence & Argumentation — Core Skills: Practice 4
// 10 questions | evaluate support quality, distinguish fact from inference
module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage: "A recent study by the National Transportation Institute found that cities with dedicated bus rapid transit (BRT) lanes reduced average commute times by 22% compared to cities without BRT infrastructure. Additionally, cities with BRT reported a 14% decrease in downtown parking demand, suggesting that commuters shifted to public transit when fast, reliable options were available.",
    question: "Which of the following is the MOST direct evidence that BRT lanes improve commuting?",
    answerOptions: [
      { text: "Cities with BRT reported reduced parking demand.", isCorrect: false, rationale: "This is a secondary effect, not direct evidence of commute improvement." },
      { text: "Cities with BRT averaged a 22% reduction in commute times.", isCorrect: true, rationale: "A specific, measurable percentage directly tied to commute time is the strongest direct evidence." },
      { text: "Commuters shifted to public transit where fast options existed.", isCorrect: false, rationale: "This is an inference drawn from the parking data, not a direct commute measurement." },
      { text: "The National Transportation Institute conducted a study.", isCorrect: false, rationale: "This is background context, not the evidence itself." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage: "The Millbrook School District recently adopted a four-day school week. Supporters argued it would save money and reduce teacher burnout. After one year, the district reported a 12% decrease in teacher absences and roughly $200,000 in operational savings. However, some parents noted that it created childcare difficulties on the fifth day.",
    question: "A parent argues the four-day week is harmful. Which evidence from the passage BEST supports that argument?",
    answerOptions: [
      { text: "Teacher absences dropped by 12%.", isCorrect: false, rationale: "This supports the pro-four-day-week argument." },
      { text: "The district saved $200,000 in operations.", isCorrect: false, rationale: "This also supports the policy." },
      { text: "Some parents noted childcare difficulties on the fifth day.", isCorrect: true, rationale: "This is the only detail that identifies a negative consequence for families." },
      { text: "The district adopted the schedule one year ago.", isCorrect: false, rationale: "This is a timeline detail, not evidence of harm." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "Researchers at Westbrook University investigated the relationship between green spaces and mental health in urban environments. Their results showed that city residents who spent at least 30 minutes weekly in parks or green spaces reported 18% lower levels of anxiety and a 24% improvement in self-reported wellbeing compared to those who spent no time in such spaces. The study controlled for income, age, and pre-existing conditions.",
    question: "Why does the fact that the study 'controlled for income, age, and pre-existing conditions' strengthen the evidence?",
    answerOptions: [
      { text: "It shows the researchers were highly qualified.", isCorrect: false, rationale: "Qualifications are not the same as methodological rigor." },
      { text: "It means the green-space effect cannot be explained by those other variables.", isCorrect: true, rationale: "Controlling for variables isolates the specific factor being tested, making the evidence more reliable." },
      { text: "It proves that all urban residents benefit equally.", isCorrect: false, rationale: "Controlling for variables does not mean everyone benefits equally." },
      { text: "It eliminates the need for other studies.", isCorrect: false, rationale: "One study, however rigorous, does not eliminate the need for replication." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "Proponents of year-round schooling argue that extended summer breaks cause 'summer slide' — a loss of academic progress over the break. They cite a Johns Hopkins meta-analysis of 39 studies showing that students lose an average of two to three months of reading skills each summer. Critics counter that year-round schools have not consistently shown improved test scores over traditional schedules.",
    question: "Which statement best describes the relationship between the two pieces of evidence in the passage?",
    answerOptions: [
      { text: "Both pieces support year-round schooling.", isCorrect: false, rationale: "The critics' evidence argues against a clear benefit of year-round schooling." },
      { text: "The meta-analysis proves that year-round school improves test scores.", isCorrect: false, rationale: "The meta-analysis addresses summer loss, not year-round school outcomes." },
      { text: "The meta-analysis supports the claim of summer loss, while critics' data undermines the proposed solution.", isCorrect: true, rationale: "Accurately captures both sides: the problem (summer slide) is evidenced, but the solution (year-round school) is disputed." },
      { text: "The critics' data disproves the existence of summer slide.", isCorrect: false, rationale: "The critics challenge the effectiveness of the solution, not the reality of summer slide." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "In a community debate over building a new highway through a wetland area, advocates noted that the highway would reduce commute times by 15 minutes and create 3,000 construction jobs. Environmentalists argued that destroying the wetland would eliminate habitat for 40 protected species and reduce the region's natural flood buffer by 30%, potentially costing millions in future flood damages.",
    question: "Which of the following best evaluates the strength of the environmentalists' argument?",
    answerOptions: [
      { text: "It is weak because the highway creates jobs.", isCorrect: false, rationale: "Refuting the other side's point does not weaken this argument on its own terms." },
      { text: "It is strong because it uses specific quantities to project long-term costs.", isCorrect: true, rationale: "The argument cites 40 species, 30% buffer reduction, and 'millions in damages' — specific, quantified, long-term evidence." },
      { text: "It is weak because it does not mention the commute improvement.", isCorrect: false, rationale: "Arguments don't need to address every point of the opposing side to be strong." },
      { text: "It is strong only because it mentions protected species.", isCorrect: false, rationale: "The argument's strength comes from the combination of specific quantified claims, not from species alone." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "Advertisement: 'Switch to FreshWave toothpaste — used by 4 out of 5 dentists!' A consumer advocacy group reviewed the study behind this claim and found that dentists were given only two options to choose from, and FreshWave was compared to a brand known to be ineffective. The question asked was 'Which would you recommend to patients who need whitening products?'",
    question: "How does the consumer group's finding affect the advertisement's evidence?",
    answerOptions: [
      { text: "It strengthens the claim because the study involved real dentists.", isCorrect: false, rationale: "Expert involvement doesn't validate a study with biased methodology." },
      { text: "It reveals that the statistic is misleading because of the limited comparison and narrow question.", isCorrect: true, rationale: "The limited choice set and narrow question scope make '4 out of 5' a misleading general endorsement." },
      { text: "It proves the ad is false because 4 out of 5 is not a real statistic.", isCorrect: false, rationale: "The statistic may be technically accurate but is contextually misleading — not proven false." },
      { text: "It has no effect because dentists are experts.", isCorrect: false, rationale: "Expert status doesn't override flaws in the study design." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A city council member argues: 'We should invest in a new sports stadium. Tourism data from comparable cities show that stadium construction correlates with a 15% increase in hotel bookings. Our downtown businesses need more foot traffic, and a stadium is the answer.' An economist responds: 'Correlation between new stadiums and increased tourism is often driven by other simultaneous development — hotels, restaurants, and marketing campaigns — not the stadium alone.'",
    question: "The economist's response challenges the council member's argument by:",
    answerOptions: [
      { text: "Providing evidence that hotels, not stadiums, drive growth.", isCorrect: false, rationale: "The economist doesn't provide evidence that hotels alone drive growth; they point to confounding factors." },
      { text: "Arguing that the 15% statistic is inaccurate.", isCorrect: false, rationale: "The economist does not dispute the statistic, only its interpretation." },
      { text: "Questioning whether the stadium caused the tourist increase or whether other factors explain it.", isCorrect: true, rationale: "The economist attacks the causal link, not the correlation statistic — a classic 'correlation ≠ causation' challenge." },
      { text: "Suggesting that the city has enough foot traffic already.", isCorrect: false, rationale: "This interpretation does not appear in the economist's response." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A health agency released a report stating that a new drug reduced symptoms in 70% of patients during clinical trials. However, a pharmacologist noted that the trial lasted only 8 weeks, all participants were between 25 and 40 years old, and the placebo group showed a 45% symptom reduction. The trial included 200 patients from a single research hospital.",
    question: "Which limitation of the trial MOST weakens its evidence?",
    answerOptions: [
      { text: "Only 200 patients were studied.", isCorrect: false, rationale: "Sample size is a concern, but other limitations are more decisive here." },
      { text: "The placebo group also improved — by 45%.", isCorrect: true, rationale: "A net improvement of only 25 percentage points over placebo substantially reduces the drug's apparent effectiveness." },
      { text: "All participants were from one hospital.", isCorrect: false, rationale: "This limits generalisability but is less immediately damaging than the placebo effect comparison." },
      { text: "The trial only lasted 8 weeks.", isCorrect: false, rationale: "Duration is a concern for long-term claims, but the placebo effect is more damaging to the core claim." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "Passage A: A rural school district superintendent argues that local control of curriculum standards leads to higher graduation rates, citing their own district's 95% graduation rate after switching from state standards.\n\nPassage B: A state education official argues that uniform standards ensure all students, regardless of zip code, receive equitable preparation for college and the workforce. She notes that districts with locally controlled standards show the widest achievement gaps between income levels.",
    question: "Which best describes how the two passages approach the question of curriculum control?",
    answerOptions: [
      { text: "Both use statistical evidence to support local control.", isCorrect: false, rationale: "Passage B argues against local control." },
      { text: "Passage A uses a single district example; Passage B uses broader demographic evidence about equity.", isCorrect: true, rationale: "Passage A relies on one district's success. Passage B cites pattern-level evidence about achievement gaps across many districts." },
      { text: "Both agree that graduation rates are the best metric.", isCorrect: false, rationale: "Passage B focuses on equity and achievement gaps, not graduation rates." },
      { text: "Passage B claims uniform standards cause achievement gaps.", isCorrect: false, rationale: "Passage B says local control is associated with wider gaps — not that uniform standards cause them." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "An environmental group argues that plastic grocery bag bans are effective: 'After San Francisco banned single-use bags in 2007, researchers found a 72% reduction in plastic bag litter in local waterways within three years.' A packaging industry spokesperson counters: 'Consumers simply switched to heavier reusable plastic bags, which require significantly more resources to produce and have a larger carbon footprint per bag manufactured.'",
    question: "Which of the following conclusions is best supported by BOTH pieces of evidence together?",
    answerOptions: [
      { text: "Bag bans should be reversed because reusable bags are worse.", isCorrect: false, rationale: "The environmental group's data contradicts this — litter fell significantly." },
      { text: "Bag bans succeed in reducing visible litter but may shift environmental costs elsewhere.", isCorrect: true, rationale: "Synthesises both: ban reduced litter (Group A's data) but created resource costs elsewhere (industry data)." },
      { text: "The industry spokesperson's data proves bag bans have no environmental benefit.", isCorrect: false, rationale: "The 72% litter reduction is genuine evidence of one environmental benefit." },
      { text: "Bag bans should be expanded nationally because of the 72% reduction.", isCorrect: false, rationale: "The industry data about reusable bags complicates this conclusion." },
    ],
    challenge_tags: ['rla-2'],
  },
];
`
);

write(
  'rla_evidence_05.js',
  `
// Evidence & Argumentation — Core Skills: Practice 5
// 10 questions | author's purpose, inference from text, evaluating conclusions
module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage: "Smartphones have become indispensable tools in modern life. In 2023, over 6.8 billion people worldwide owned a smartphone — more than the number who owned a toothbrush. People use phones to communicate, navigate, bank, and access healthcare remotely. However, excessive use is linked to sleep disruption, reduced attention spans, and increased rates of anxiety among teenagers.",
    question: "What is the primary purpose of this passage?",
    answerOptions: [
      { text: "To argue that smartphones should be banned for teenagers.", isCorrect: false, rationale: "The passage presents both benefits and drawbacks; it does not advocate for a ban." },
      { text: "To present balanced information about the role and impact of smartphones.", isCorrect: true, rationale: "The passage describes widespread use and benefits, then acknowledges negative effects — a balanced, informational purpose." },
      { text: "To prove that smartphones are more common than toothbrushes.", isCorrect: false, rationale: "This statistic is a supporting detail, not the main purpose." },
      { text: "To persuade readers to limit screen time.", isCorrect: false, rationale: "The passage does not include a call to action or persuasive framing." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage: "The city of Greendale's riverside district was once home to thriving factories. In the 1970s, manufacturers relocated to cheaper regions, leaving behind abandoned buildings and polluted waterways. For decades, the area sat dormant. Then, in 2015, a public-private partnership began converting the old factories into artists' studios, restaurants, and event spaces. Today, the district attracts over 300,000 visitors annually and has generated $40 million in new tax revenue.",
    question: "Based on the passage, which inference is most reasonable?",
    answerOptions: [
      { text: "Greendale's riverside district was never profitable.", isCorrect: false, rationale: "The passage says it had thriving factories, implying prior economic activity." },
      { text: "Public-private partnerships can successfully revitalise industrial areas.", isCorrect: true, rationale: "The passage shows a direct connection between the partnership's intervention and the area's economic revival." },
      { text: "Manufacturers relocated because of rising pollution.", isCorrect: false, rationale: "The passage states they relocated to 'cheaper regions,' not because of pollution." },
      { text: "All abandoned industrial areas can become tourist destinations.", isCorrect: false, rationale: "The passage describes one successful case; generalising to 'all' is an overreach." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "The following is an excerpt from a letter to the editor:\n\n'The proposed curfew ordinance for teens under 18 is an overreach of government authority. America was founded on principles of individual liberty. Besides, most juvenile crime occurs before 9 p.m., not after, so a midnight curfew would barely affect crime statistics. Resources would be better spent on after-school programs and community mentors who are proven to reduce crime.'",
    question: "Which of the following best identifies a weakness in the letter writer's argument?",
    answerOptions: [
      { text: "The writer doesn't say when curfew would begin.", isCorrect: false, rationale: "The letter mentions midnight — irrelevant to the argument's logical structure." },
      { text: "The appeal to 'individual liberty' is a founding principle but does not address whether curfews actually reduce crime.", isCorrect: true, rationale: "This identifies that the liberty argument is philosophical, not evidence-based, and doesn't rebut the policy's specific intent." },
      { text: "The writer should not mention after-school programs.", isCorrect: false, rationale: "After-school programs are relevant as an alternative solution — mentioning them is appropriate." },
      { text: "The writer provides a statistic about when crime occurs, which proves curfews are useless.", isCorrect: false, rationale: "The statistic is supporting evidence, not a proven conclusion — this overstates its strength." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "In a study of 1,200 adults, researchers found that those who identified as 'heavy readers' (more than 30 books per year) were 3.5 times more likely to report high levels of empathy and 2 times more likely to volunteer in their communities compared to non-readers. The researchers used self-reported data for both reading habits and empathy levels.",
    question: "What is the most significant limitation of this study's evidence?",
    answerOptions: [
      { text: "The sample size of 1,200 is too small.", isCorrect: false, rationale: "1,200 is actually a reasonable sample for many social studies." },
      { text: "Both reading habits and empathy were self-reported, which can introduce bias.", isCorrect: true, rationale: "Self-reported data is subject to social desirability bias and inaccuracy, which weakens the reliability of the findings." },
      { text: "The study doesn't account for age differences.", isCorrect: false, rationale: "Age differences are a valid concern but secondary to the methodological issue of self-reporting." },
      { text: "Empathy cannot be measured.", isCorrect: false, rationale: "Empathy can be measured through validated instruments; self-reporting is a specific limitation, not measurement impossibility." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "Organic farming advocates argue that organic produce is healthier because it contains fewer synthetic pesticide residues. They cite studies showing measurably lower pesticide levels in the urine of children who switched to an organic diet. Conventional farming advocates note that regulatory agencies in multiple countries have established safe tolerance levels for pesticide residues and that large-scale meta-analyses of nutritional content show no significant difference in vitamin levels between organic and conventional produce.",
    question: "Which of the following best summarises the central disagreement?",
    answerOptions: [
      { text: "Whether organic food tastes better than conventional food.", isCorrect: false, rationale: "Taste is not discussed in the passage." },
      { text: "Whether measured pesticide reduction translates to meaningful health benefits, given regulatory safety standards.", isCorrect: true, rationale: "Organic advocates show lower pesticide levels; conventional advocates argue those levels are already safe — the core dispute is health significance." },
      { text: "Whether children should eat organic food.", isCorrect: false, rationale: "This is a conclusion that might be drawn, not the central evidential disagreement." },
      { text: "Whether pesticide testing is accurate.", isCorrect: false, rationale: "Both sides accept that pesticide differences exist; they disagree about what those differences mean." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "From a corporate responsibility report:\n'Our company has reduced carbon emissions by 30% over the past decade. We employ over 10,000 people in communities across the state and donate \\$2 million annually to local charities. We are committed to sustainable growth and being a positive force in the communities we serve.'\n\nA local environmental group responds: 'The 30% reduction is measured against the company's 2013 peak emission year — a year in which they had twice their current level of production. Adjusted for current production volume, their emissions per unit produced have increased by 12%.'\n",
    question: "The environmental group's response is most effective because it:",
    answerOptions: [
      { text: "Proves the company is lying about its charitable donations.", isCorrect: false, rationale: "The environmental group does not address charitable donations." },
      { text: "Shows that the 30% reduction figure is misleading when you account for the baseline year and production volume.", isCorrect: true, rationale: "By exposing the cherry-picked baseline, the group reveals that emissions efficiency has actually worsened — making the statistic misleading." },
      { text: "Argues that 10,000 employees don't justify environmental harm.", isCorrect: false, rationale: "The group's response addresses only the emissions claim, not employment." },
      { text: "Claims the company's emissions data was fabricated.", isCorrect: false, rationale: "The group does not allege fabrication; they reframe how the data should be interpreted." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "Economist A argues: 'Raising the minimum wage to \\$15 will boost consumer spending. Low-wage workers spend nearly all of their income locally, so putting more money in their pockets directly stimulates the economy.'\n\nEconomist B argues: 'Raising the minimum wage to \\$15 will cause small businesses to automate or cut hours to control costs. A 2019 study of Seattle's minimum wage increase found a 9% drop in hours worked at low-wage jobs in the first year.'",
    question: "Which of the following would MOST strengthen Economist A's argument?",
    answerOptions: [
      { text: "Evidence that automation is expensive for most small businesses.", isCorrect: true, rationale: "If automation is prohibitively expensive, businesses cannot simply replace workers — weakening B's counter and strengthening A's case." },
      { text: "Evidence that minimum wage workers spend money online, not locally.", isCorrect: false, rationale: "This would weaken Economist A's claim that spending is local." },
      { text: "Data showing Seattle's economy grew after the wage increase.", isCorrect: false, rationale: "Economic growth may have many causes; this doesn't directly respond to the hours-worked drop." },
      { text: "Evidence that \\$15 is too low a minimum wage increase.", isCorrect: false, rationale: "Economist A is defending the \\$15 threshold; arguing it's too low doesn't help the original position." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A city council member states: 'Our new after-school tutoring programme is working. Last year, 78% of participants improved their reading scores by at least one grade level. This proves that targeted tutoring is the most effective way to raise reading achievement citywide.'\n\nA researcher responds: 'Participation in the programme was voluntary. Students who opt in to extra tutoring typically come from more motivated families, making them more likely to improve regardless of the programme's specific content.'",
    question: "The researcher is pointing out which flaw in the council member's reasoning?",
    answerOptions: [
      { text: "Selection bias — the participants may have improved anyway due to factors unrelated to the programme.", isCorrect: true, rationale: "Self-selection means the group is not representative, so improvement can't be attributed solely to the programme." },
      { text: "The council member uses too large a sample size.", isCorrect: false, rationale: "Sample size is not the issue the researcher raises." },
      { text: "The 78% figure is statistically impossible.", isCorrect: false, rationale: "The researcher accepts the figure; they question what it means." },
      { text: "The programme should be mandatory, not voluntary.", isCorrect: false, rationale: "This is a possible solution but is not the flaw the researcher identifies." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "Source A (2018 industry report): 'The solar industry employs more full-time workers than coal mining in the United States, with solar jobs growing at 17 times the national average rate.'\n\nSource B (2022 government brief): 'While solar employment has grown, the average solar installation job pays 12% less than the average coal mining job, and solar jobs are more geographically concentrated in urban areas, leaving rural communities with fewer employment options in the energy sector.'",
    question: "Which statement best reconciles both sources?",
    answerOptions: [
      { text: "Solar energy is better than coal in every measurable way.", isCorrect: false, rationale: "Source B identifies specific economic disadvantages of solar over coal for some communities." },
      { text: "Coal mining provides more jobs than solar.", isCorrect: false, rationale: "Source A says the opposite on raw employment numbers." },
      { text: "Solar creates more total jobs than coal but those jobs pay less and may not reach rural communities that depended on coal.", isCorrect: true, rationale: "Accurately synthesises both sources without dismissing either." },
      { text: "The government brief disproves the industry report.", isCorrect: false, rationale: "The sources address different aspects; one doesn't disprove the other." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "An editorial argues that a new housing development should not be approved: 'Increased traffic will overwhelm local roads. Property values in adjacent neighbourhoods will decline. And construction will displace 45 families currently living in affordable rental units.' The city planning department responds that traffic modelling shows a 7% volume increase well within capacity, comparable projects have not lowered surrounding property values, and the developer is required to provide 60 replacement affordable units.",
    question: "How effectively does the planning department's response address the editorial's concerns?",
    answerOptions: [
      { text: "It fully resolves all concerns because it uses data and policy commitments.", isCorrect: false, rationale: "Data projections and policy commitments can be challenged; calling them absolute resolutions overstates the case." },
      { text: "It partially addresses the concerns by countering each point with data or policy, but critics could question whether projections are reliable.", isCorrect: true, rationale: "Each editorial point is addressed, but projections (traffic modelling, property values) involve uncertainty, and replacement units require follow-through." },
      { text: "It fails to address the traffic concern.", isCorrect: false, rationale: "The response specifically addresses traffic volume with modelling data." },
      { text: "It proves the editorial is factually wrong on all points.", isCorrect: false, rationale: "The response counters but doesn't 'prove wrong' — especially on concerns about displacement and future property values." },
    ],
    challenge_tags: ['rla-2'],
  },
];
`
);

write(
  'rla_evidence_06.js',
  `
// Evidence & Argumentation — Core Skills: Practice 6
// Mirrors practice 4-5 depth, fresh passages
module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage: "Telemedicine — the practice of conducting medical consultations via video call — expanded dramatically during the 2020 pandemic. Usage surged by over 3,000% in the first months of the health crisis, according to the Centers for Medicare & Medicaid Services. Physicians reported that routine follow-ups, prescription renewals, and mental health consultations adapted well to remote formats. However, physical examinations, diagnostic tests, and procedures still require in-person visits.",
    question: "Which detail best supports the claim that telemedicine adapted well to some medical needs?",
    answerOptions: [
      { text: "Telemedicine existed before the pandemic.", isCorrect: false, rationale: "This is background, not evidence of adaptation." },
      { text: "Physical exams still require in-person visits.", isCorrect: false, rationale: "This is a limitation, not evidence of successful adaptation." },
      { text: "Routine follow-ups and mental health consultations worked well remotely.", isCorrect: true, rationale: "This directly shows which types of care adapted well — specific and relevant." },
      { text: "Usage surged 3,000% in early 2020.", isCorrect: false, rationale: "This shows demand growth, not effectiveness." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'easy',
    passage: "The Northend Community Garden was established in 2018 on a vacant lot donated by the city. In five years, the garden has produced over 12,000 pounds of fresh vegetables, provided gardening plots to 80 families, and partnered with a local food bank to donate surplus produce. A survey of gardeners found that 92% reported feeling more connected to their neighbourhood since joining.",
    question: "Which piece of evidence best supports the garden's social impact — beyond food production?",
    answerOptions: [
      { text: "The lot was donated by the city.", isCorrect: false, rationale: "This describes how the garden started, not its social impact." },
      { text: "92% of gardeners felt more connected to their neighbourhood.", isCorrect: true, rationale: "This directly measures social connectedness — a social impact beyond produce." },
      { text: "12,000 pounds of vegetables were produced.", isCorrect: false, rationale: "This is evidence of agricultural — not social — impact." },
      { text: "80 families received garden plots.", isCorrect: false, rationale: "Access to plots is access, not a measure of social connection." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "School officials at Lakeview High School reported that after installing water bottle refill stations throughout the building, single-use plastic bottle waste in school recycling bins dropped by 68% within six months. A student survey found that 80% of students who had access to a refill station within 50 feet of their locker used it daily, compared to only 31% of students whose nearest station was more than 150 feet away.",
    question: "What does the difference in usage rates between the two student groups suggest?",
    answerOptions: [
      { text: "Students who received refill stations care more about the environment.", isCorrect: false, rationale: "No data on attitudes is provided — this is an unsupported inference about motivation." },
      { text: "Proximity is a significant factor in whether students use the refill stations.", isCorrect: true, rationale: "The 80% vs 31% usage gap based purely on distance strongly implies proximity determines use." },
      { text: "The school should not have installed the stations more than 150 feet from lockers.", isCorrect: false, rationale: "This is a possible policy conclusion, not what the data 'suggests' about usage patterns." },
      { text: "More students prefer reusable bottles when given a direct instruction.", isCorrect: false, rationale: "No instruction was given — the variable studied is distance, not instruction." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    passage: "In the debate over whether high schools should start later in the morning, the American Academy of Pediatrics recommends start times no earlier than 8:30 a.m., citing research linking early start times to sleep deprivation, increased car accidents among teen drivers, and lower academic performance. Critics of later start times argue that the change creates logistical complications for families with working parents and older students who also hold after-school jobs.",
    question: "Which of the following best explains why the critics' argument does not disprove the recommendation?",
    answerOptions: [
      { text: "Critics are not doctors and should not oppose medical recommendations.", isCorrect: false, rationale: "Non-experts can raise valid concerns; the argument is not automatically invalid because it comes from non-doctors." },
      { text: "The critics address logistical challenges, not the health and academic evidence the recommendation is based on.", isCorrect: true, rationale: "The recommendation rests on sleep, crash, and academic data. Critics raise family logistics — a different dimension entirely." },
      { text: "Sleep deprivation is more important than any logistical issue.", isCorrect: false, rationale: "Asserting one value is more important is opinion, not an analysis of argument strength." },
      { text: "The critics offer no statistics.", isCorrect: false, rationale: "Lack of statistics alone does not permanently invalidate an argument — anecdotal or experiential concerns can be valid." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "Testimony before a city council: 'Councillors, our town must invest in the arts. A National Endowment for the Arts report found that arts organisations across the country generate \\$135 billion in economic activity annually. Our local arts festival alone brought in an estimated \\$1.2 million to local businesses last summer. We cannot afford NOT to fund the arts.'\n\nCouncillor's response: 'The \\$135 billion figure is national and includes major cities like New York and Los Angeles. Our town of 18,000 cannot reasonably extrapolate from national aggregates. And the \\$1.2 million from the festival does not tell us how much of that was additional spending versus spending shifted from other local businesses.'",
    question: "The councillor's response is most effective in challenging the testimony because it:",
    answerOptions: [
      { text: "Provides its own research showing arts investments fail in small towns.", isCorrect: false, rationale: "The councillor provides no alternative research — they simply critique the evidence presented." },
      { text: "Identifies that the national figure may not apply to a small town and that the local figure may not represent genuine economic growth.", isCorrect: true, rationale: "Both critiques attack the applicability and interpretation of the evidence — a strong, targeted response." },
      { text: "Argues that arts funding is culturally unimportant.", isCorrect: false, rationale: "The councillor does not make a cultural argument; they challenge the economic evidence." },
      { text: "Proves the festival generated less than \\$1.2 million.", isCorrect: false, rationale: "The councillor doesn't dispute the $1.2 million — they question what it means economically." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A researcher studying online misinformation found that false news stories spread six times faster than true stories on social media platforms in a study of 126,000 Twitter posts between 2006 and 2017. The researcher concluded that human users, not automated bots, were responsible for the spread — users were 70% more likely to retweet false news than verified news. The study's authors noted the results were limited to Twitter and may not extend to other platforms.",
    question: "A journalist wants to use this study to argue that 'social media algorithms are the primary driver of misinformation.' What is the main problem with that use of the evidence?",
    answerOptions: [
      { text: "The study was conducted only on Twitter.", isCorrect: false, rationale: "While platform limitation is noted, it's not the main problem with the journalist's specific claim." },
      { text: "The study found that human behaviour, not algorithms, drove misinformation spread — directly contradicting the journalist's claim.", isCorrect: true, rationale: "The study explicitly attributes the spread to human users (70% more likely to retweet false news), not algorithms. The journalist's conclusion contradicts the evidence." },
      { text: "The study is too old to be relevant.", isCorrect: false, rationale: "The study spans 2006–2017, which may limit recency but isn't the fundamental problem with the journalist's claim." },
      { text: "False news spreading faster does not mean it is harmful.", isCorrect: false, rationale: "This doesn't address the journalist's specific claim about algorithms." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A pharmaceutical company's press release states: 'In clinical trials, 87% of patients taking our new pain medication reported moderate-to-significant relief of symptoms within 48 hours.' The fine print of the trial report reveals: the trial had no placebo control group; participants were allowed to take over-the-counter pain relievers simultaneously; and 'moderate relief' was defined as any improvement on a self-reported 10-point scale — including movement from 8 to 7.",
    question: "Which detail from the fine print most significantly weakens the 87% claim?",
    answerOptions: [
      { text: "There was no placebo group.", isCorrect: true, rationale: "Without a placebo comparison, there is no way to know how much improvement was due to the drug versus natural recovery, OTC medications, or expectation — this is the most critical flaw." },
      { text: "Participants could take other pain relievers.", isCorrect: false, rationale: "This is a significant confound but secondary to having no placebo group to isolate the drug's effect." },
      { text: "'Moderate relief' included small improvements.", isCorrect: false, rationale: "This dilutes what 'success' means but matters less if there were a control group to compare against." },
      { text: "The trial was funded by the pharmaceutical company.", isCorrect: false, rationale: "Funding source is a concern for bias but is not mentioned in the passage and is not a 'fine print' detail provided." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "In a speech before a city council, a developer argues: 'Building luxury condominiums will benefit everyone. More high-end residents mean more tax revenue, which funds public schools and services. Trickle-down works: when wealthier people move in, local businesses thrive and everyone benefits.' A housing advocate responds: 'In neighbourhoods where luxury condos have been built in comparable cities, studies show that within five years, average rents in surrounding blocks rose 28%, displacing long-term residents who could no longer afford to live there.'",
    question: "The housing advocate's evidence is most effective because it:",
    answerOptions: [
      { text: "Proves that tax revenue never benefits schools.", isCorrect: false, rationale: "The advocate doesn't address tax revenue or schools." },
      { text: "Provides pattern-level evidence from comparable cities that directly contradicts the developer's 'everyone benefits' claim.", isCorrect: true, rationale: "Displacement of long-term residents at 28% rent increases from multiple comparable cities directly refutes the universality of the developer's claim." },
      { text: "Shows that luxury condos are always harmful.", isCorrect: false, rationale: "'Always' is too absolute — the advocate points to evidence from comparable cases, not a universal law." },
      { text: "Argues that trickle-down economics is wrong in theory.", isCorrect: false, rationale: "The advocate uses empirical displacement data, not a theoretical critique." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "Two newspaper editorials appear side by side:\n\nEditorial A: 'Our city's new red-light camera programme is a proven safety measure. In the first year, intersection accidents dropped by 31% at monitored locations.'\n\nEditorial B: 'The red-light camera programme is a revenue scheme, not a safety measure. While accidents dropped at monitored intersections, a University of Pennsylvania study found that rear-end collisions increased by 24% at those same intersections as drivers braked abruptly to avoid tickets.'",
    question: "Which statement most accurately evaluates the two editorials' use of evidence?",
    answerOptions: [
      { text: "Editorial A is correct and B is incorrect because A uses a higher percentage drop.", isCorrect: false, rationale: "Percentages cannot be compared without considering what they measure." },
      { text: "Both editorials measure different types of accidents, which means neither fully captures the safety picture alone.", isCorrect: true, rationale: "A measures all intersection accidents; B measures rear-end collisions specifically — each captures a real but partial view of the safety impact." },
      { text: "Editorial B proves that red-light cameras cause accidents.", isCorrect: false, rationale: "'Cause' is too strong a word; the study shows an association with increased rear-end collisions." },
      { text: "Editorial A proves the programme was a success overall.", isCorrect: false, rationale: "A 31% drop in some accidents alongside a 24% rise in another type means the full picture is unclear." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A public health agency's report argues that sugar-sweetened beverage taxes reduce consumption and obesity rates. It cites Mexico's 10% soda tax, which led to a 12% reduction in soda sales among lower-income households. Critics argue that such taxes are regressive — they take a higher percentage of income from poor families than from wealthy ones — and that consumption simply shifted to other high-calorie beverages.",
    question: "A policy analyst who supports the tax should acknowledge which of the following to make the strongest, most honest argument?",
    answerOptions: [
      { text: "Lower-income families should not be allowed to buy soda.", isCorrect: false, rationale: "This does not honestly grapple with the regressivity concern." },
      { text: "The tax burden does fall more heavily on lower-income consumers, but if revenue is directed to health programmes in low-income communities, the net effect may be progressive.", isCorrect: true, rationale: "Acknowledging the regressivity critique and offering a revenue-use solution is the most honest and complete defence of the tax." },
      { text: "The critics are wrong because the tax did reduce soda sales.", isCorrect: false, rationale: "Soda sales falling doesn't automatically address the regressivity or substitution concerns." },
      { text: "Other high-calorie beverages are not as harmful as soda.", isCorrect: false, rationale: "This makes an unverified health claim that isn't supported by evidence in the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
];
`
);

// Evidence 07, 08, 09, 10 — test-ready and challenge tiers
write(
  'rla_evidence_07.js',
  `
// Evidence & Argumentation — Test Ready: Practice 7
// 11 questions | paired sources, logical fallacies, multi-step evidence chains
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A state legislator proposes mandatory financial literacy courses in high schools, citing a Federal Reserve survey showing that 40% of American adults cannot cover a \\$400 emergency without borrowing or selling something. She argues, 'If we teach students budgeting and saving, we will eliminate financial insecurity in a generation.'\n\nAn opponent responds: 'Financial insecurity is caused primarily by low wages and economic inequality, not by lack of knowledge. Studies show that financial literacy courses have modest, short-term effects on behaviour and that knowledge alone does not overcome structural economic barriers.'",
    question: "The opponent's argument rests primarily on which of the following claims?",
    answerOptions: [
      { text: "Financial literacy courses are too expensive to implement.", isCorrect: false, rationale: "Cost is not raised." },
      { text: "The root cause of financial insecurity is structural (low wages, inequality) rather than informational (lack of knowledge).", isCorrect: true, rationale: "The opponent's core argument is that the legislator misidentifies the cause." },
      { text: "The Federal Reserve survey is inaccurate.", isCorrect: false, rationale: "The survey accuracy is not challenged." },
      { text: "High school students are too young to learn financial concepts.", isCorrect: false, rationale: "Age is not mentioned." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'medium',
    passage: "Same passages as question 1.",
    question: "Which evidence would most strengthen the legislator's argument?",
    answerOptions: [
      { text: "Evidence that wages have fallen in real terms over the past decade.", isCorrect: false, rationale: "This supports the opponent's structural argument." },
      { text: "A longitudinal study showing students who took financial literacy courses were 40% less likely to carry credit card debt 10 years later.", isCorrect: true, rationale: "Long-term behaviour change directly supports the claim that financial education improves financial outcomes." },
      { text: "Data showing that 40% of adults also lack general numeracy skills.", isCorrect: false, rationale: "This doesn't directly connect financial literacy education to better outcomes." },
      { text: "Evidence that financial literacy is taught in private schools.", isCorrect: false, rationale: "Where it's taught doesn't show it works." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "In a letter to shareholders, a technology CEO writes: 'Our company invested \\$500 million in artificial intelligence research last year. We are confident this will lead to breakthrough products. After all, our last major investment — in cloud computing in 2012 — yielded returns of 400% over five years. AI is the cloud computing of our era.'\n",
    question: "The CEO uses an analogy comparing AI to cloud computing. What is the primary logical risk of this type of argument?",
    answerOptions: [
      { text: "The analogy proves the investment will fail.", isCorrect: false, rationale: "An analogy alone cannot prove success or failure." },
      { text: "The two technologies may differ in ways that make the past outcome a poor predictor of future results.", isCorrect: true, rationale: "Analogical reasoning breaks down when the compared situations differ significantly in relevant ways." },
      { text: "Cloud computing is not relevant to the technology sector.", isCorrect: false, rationale: "Cloud computing is clearly relevant — the comparison lacks merit for other reasons." },
      { text: "The CEO should not disclose investment figures.", isCorrect: false, rationale: "Disclosure is a legal and governance matter, not a logical error." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "Excerpt from a public health report: 'Our city's opioid overdose death rate fell by 22% in the year following the opening of a supervised consumption facility (SCF). In the five neighbouring communities without SCFs, the overdose rate rose an average of 8% in the same period.'\n\nA city council member states: 'The SCF clearly caused the drop in overdose deaths.'",
    question: "What would a researcher need to know before agreeing that the SCF CAUSED the reduction?",
    answerOptions: [
      { text: "Whether the SCF is publicly or privately funded.", isCorrect: false, rationale: "Funding source does not affect the causal question." },
      { text: "Whether other interventions (law enforcement changes, naloxone distribution, etc.) also changed in the city during the same period.", isCorrect: true, rationale: "Without ruling out confounding variables, the decline cannot be attributed solely to the SCF." },
      { text: "How many people used the SCF in the first year.", isCorrect: false, rationale: "Usage volume is relevant to scale but doesn't resolve whether the SCF caused the reduction." },
      { text: "Whether the council member supports the SCF programme.", isCorrect: false, rationale: "The council member's political position does not affect the causal analysis." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a debate on extending daylight saving time year-round:\n\nSource A (Retail Association): 'Extending daylight saving time increases consumer spending. Studies show shoppers spend more when they can shop after work in daylight — and America's economy is 70% driven by consumer spending.'\n\nSource B (Sleep Medicine Association): 'Permanent daylight saving time means darker mornings year-round. Sleep scientists have documented increased cardiovascular events, traffic accidents, and workplace injuries in the weeks following the spring clock change, when people lose one hour of sleep. A permanent shift creates a chronic, year-round misalignment with the body's natural light-dark cycle in winter months.'",
    question: "Which statement best reconciles both sources for a policymaker?",
    answerOptions: [
      { text: "The economic benefit outweighs the health risk, so the policy should pass.", isCorrect: false, rationale: "This is a value judgement, not a reconciliation of evidence." },
      { text: "Permanent daylight saving time may boost consumer spending but may also create year-round health risks. Policymakers must weigh economic benefits against public health costs.", isCorrect: true, rationale: "Accurately captures what each source establishes and frames the decision correctly as a trade-off." },
      { text: "Source B disproves Source A because health is more important than shopping.", isCorrect: false, rationale: "Health importance is a value judgement; the sources address different domains and neither disproves the other." },
      { text: "Both sources support extending daylight saving time.", isCorrect: false, rationale: "Source B argues against the change on health grounds." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a policy brief on urban tree canopy:\n\n'Cities that increased tree canopy cover by 10% or more over a decade saw average summer temperatures fall by 1.5°C in dense urban areas compared to cities with stagnant or declining canopy. Tree canopy also reduced stormwater runoff ey 18%–25% in study areas and was associated with lower rates of respiratory illness in children. However, tree-planting programmes historically have been concentrated in wealthier neighbourhoods, reinforcing environmental inequity.'",
    question: "A journalist writes: 'Urban trees solve the problem of climate change in cities.' What is wrong with this conclusion?",
    answerOptions: [
      { text: "Trees do not reduce temperatures.", isCorrect: false, rationale: "The report says they do reduce temperatures." },
      { text: "The report shows trees provide local benefits (lower temperatures, less runoff, better health) but 'solving climate change' overstates localised mitigation as a global-scale solution.", isCorrect: true, rationale: "Local temperature reductions and runoff improvements are not equivalent to solving climate change, which is a global systemic problem." },
      { text: "The journalist should only write about wealthy neighbourhoods.", isCorrect: false, rationale: "Irrelevant to the logical flaw in the conclusion." },
      { text: "The report doesn't mention climate change, so journalism about it is inappropriate.", isCorrect: false, rationale: "The report discusses related urban heat and runoff issues; journalism drawing connections is appropriate if done accurately." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "An advocacy group argues that social media companies should be legally liable for the spread of health misinformation on their platforms. They cite data showing a measurable rise in vaccine hesitancy correlating with exposure to anti-vaccine content online. A First Amendment scholar responds that imposing liability would incentivise over-censorship, chilling legitimate speech and making platforms risk-averse about any health-related discussion.",
    question: "The First Amendment scholar's argument introduces which type of concern?",
    answerOptions: [
      { text: "An empirical claim about vaccine hesitancy.", isCorrect: false, rationale: "The scholar does not dispute the vaccine hesitancy data." },
      { text: "A slippery slope concern — that the intended remedy could cause a disproportionate secondary harm (suppression of legitimate speech).", isCorrect: true, rationale: "The scholar argues liability for misinformation will lead to over-censoring of all health speech — a slippery slope argument." },
      { text: "A claim that misinformation is not widespread.", isCorrect: false, rationale: "The scholar does not dispute the prevalence of misinformation." },
      { text: "An economic argument about the cost of litigation.", isCorrect: false, rationale: "Litigation cost is not mentioned." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "Passage A — Public health official: 'The mask mandate in our county during the respiratory virus season resulted in a 35% decline in hospitalizations compared to the prior year.'\n\nPassage B — County commissioner: 'Neighbouring counties without mask mandates also saw hospitalizations decline — by 28% — because the entire region experienced the same mild virus season this year.'",
    question: "The commissioner's evidence is most useful to someone who wants to argue that:",
    answerOptions: [
      { text: "Mask mandates should be permanent.", isCorrect: false, rationale: "The commissioner's evidence undermines, not supports, mask mandate effectiveness." },
      { text: "The mask mandate may not have caused the hospitalisation decline, since unmasked counties also improved.", isCorrect: true, rationale: "A confounding factor — a milder regional virus season — makes attribution of the decline to masking uncertain." },
      { text: "The mask mandate harmed hospitalisation rates.", isCorrect: false, rationale: "The mandate county improved more — the commissioner just argues the improvement may not be caused by masks." },
      { text: "Neighbouring counties are more health-conscious than the mandate county.", isCorrect: false, rationale: "No data supports this conclusion." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A government official argues that expanding highway capacity by adding lanes will reduce traffic congestion: 'Wide highways move more cars faster.' Transportation researchers have documented a phenomenon called 'induced demand': when highway capacity increases, more people choose to drive rather than use transit or carpool, eventually filling the new capacity and restoring previous congestion levels. Multiple studies find that after expansion, long-term congestion returns to pre-expansion levels within 5–10 years.",
    question: "The induced-demand research most directly challenges which assumption in the official's argument?",
    answerOptions: [
      { text: "That wider highways cost more to build.", isCorrect: false, rationale: "Cost is not the assumption being challenged." },
      { text: "That adding lane capacity will result in lasting congestion reduction, when in fact it may generate sufficient additional demand to offset the capacity gain.", isCorrect: true, rationale: "The official assumes supply (lanes) reduces congestion; induced demand research shows new supply generates new demand, neutralising the benefit." },
      { text: "That cars are the dominant form of transport.", isCorrect: false, rationale: "The demand research doesn't challenge the role of cars; it describes how more cars appear when lanes are added." },
      { text: "That public transit is always better than driving.", isCorrect: false, rationale: "This is a different argument not advanced by the research cited." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From two op-eds on prison recidivism:\n\nOp-Ed A: 'Mandatory minimum sentencing has increased the prison population and done little to deter crime. A 2020 Sentencing Commission report found that offenders subject to mandatory minimums had similar recidivism rates to those who received discretionary sentences.'\n\nOp-Ed B: 'Reducing mandatory minimums is naive. When we lowered sentences in the 1970s, crime rates rose dramatically in urban areas. We cannot gamble with public safety.'",
    question: "Which response would most effectively challenge Op-Ed B's historical argument?",
    answerOptions: [
      { text: "A list of countries that have no mandatory minimums.", isCorrect: false, rationale: "International comparison alone doesn't address the US 1970s claim directly." },
      { text: "Evidence that crime rates in the 1970s rose due to economic factors, demographic shifts, and police underfunding — not sentence reductions.", isCorrect: true, rationale: "This directly challenges Op-Ed B's causal claim that lower sentences caused 1970s crime increases by providing alternative explanations." },
      { text: "Op-Ed A's 2020 Sentencing Commission data.", isCorrect: false, rationale: "This addresses recidivism, not the 1970s-era decline in sentencing that Op-Ed B raises." },
      { text: "An argument that all crime is economically motivated.", isCorrect: false, rationale: "This is too broad and unverified — and doesn't specifically refute the 1970s claim." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 11, type: 'multipleChoice', difficulty: 'hard',
    passage: "A nutritionist writes: 'People who eat breakfast daily are 20% less likely to be overweight than those who skip breakfast, according to our survey of 2,000 adults. Therefore, eating breakfast prevents obesity.'\n\nA statistician responds that the conclusion does not follow from the data.",
    question: "Which of the following best explains why the statistician is correct?",
    answerOptions: [
      { text: "The sample of 2,000 is too small to draw any conclusion.", isCorrect: false, rationale: "2,000 is a reasonable survey sample size." },
      { text: "The correlation between breakfast eating and lower weight does not establish that breakfast prevents obesity — other factors could explain both habits.", isCorrect: true, rationale: "People who eat breakfast may also exercise more, have more structured routines, or better access to food — correlation does not equal causation." },
      { text: "Nutritionists cannot conduct surveys.", isCorrect: false, rationale: "Professional qualifications aren't the issue." },
      { text: "The 20% figure is not statistically significant.", isCorrect: false, rationale: "Statistical significance isn't addressed in the passage and cannot be assumed." },
    ],
    challenge_tags: ['rla-2'],
  },
];
`
);

// Write remaining evidence files (08, 09, 10 — challenge tier)
// and also grammar and inference core/test-ready/challenge files
// using a fresh approach for brevity — concise but differentiated

write(
  'rla_grammar_04.js',
  `
// Language & Grammar — Core Skills: Practice 4
// 10 questions | pronoun agreement, modifier placement, parallelism
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    question: "Choose the sentence with correct subject-verb agreement:\\n(A) The team of engineers were reviewing the design.\\n(B) The team of engineers was reviewing the design.\\n(C) The team of engineers are reviewing the design.",
    answerOptions: [
      { text: "(A)", isCorrect: false, rationale: "'Team' is singular; 'were' is plural." },
      { text: "(B)", isCorrect: true, rationale: "'Team' is a collective noun treated as singular. 'Was' is correct." },
      { text: "(C)", isCorrect: false, rationale: "'Team' is singular; 'are' is plural." },
      { text: "Both (A) and (C)", isCorrect: false, rationale: "Both use plural verbs with a singular subject." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    question: "Which sentence uses pronouns correctly?",
    answerOptions: [
      { text: "Between you and I, the project is behind schedule.", isCorrect: false, rationale: "After a preposition, use object pronouns: 'between you and me.'" },
      { text: "Between you and me, the project is behind schedule.", isCorrect: true, rationale: "'Me' is the correct object pronoun after the preposition 'between.'" },
      { text: "Between you and myself, the project is behind schedule.", isCorrect: false, rationale: "'Myself' is a reflexive pronoun used only when the subject and object are the same person." },
      { text: "Between I and you, the project is behind schedule.", isCorrect: false, rationale: "'I' is a subject pronoun, not correct after a preposition." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    question: "Which sentence has a misplaced modifier?",
    answerOptions: [
      { text: "Running to catch the bus, Marcus dropped his briefcase.", isCorrect: false, rationale: "The participial phrase correctly modifies Marcus." },
      { text: "She served sandwiches to the children on paper plates.", isCorrect: true, rationale: "'On paper plates' seems to modify 'children' — it should be 'She served sandwiches on paper plates to the children.'" },
      { text: "The scientist carefully analysed the data.", isCorrect: false, rationale: "No modifier is misplaced here." },
      { text: "The report that Alicia wrote was published.", isCorrect: false, rationale: "The relative clause correctly modifies 'report.'" },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    question: "Which sentence uses parallel structure correctly?",
    answerOptions: [
      { text: "The manager asked us to arrive on time, work carefully, and that we should clean up.", isCorrect: false, rationale: "'That we should clean up' breaks parallel structure — it should be an infinitive phrase." },
      { text: "The manager asked us to arrive on time, to work carefully, and to clean up.", isCorrect: true, rationale: "All three items are parallel infinitive phrases." },
      { text: "The manager asked us to arrive on time, working carefully, and clean up.", isCorrect: false, rationale: "Mixed forms: infinitive, present participle, and bare verb." },
      { text: "The manager asked us arriving on time, working carefully, and cleaning up.", isCorrect: false, rationale: "'Arriving' is not parallel with what 'asked us' requires grammatically." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    question: "Select the version that correctly uses a semicolon:",
    answerOptions: [
      { text: "The conference begins tomorrow; however the keynote speaker cancelled.", isCorrect: false, rationale: "A comma is required after 'however' when used as a conjunctive adverb." },
      { text: "The conference begins tomorrow; however, the keynote speaker cancelled.", isCorrect: true, rationale: "Semicolon before 'however' and comma after — correct conjunctive adverb punctuation." },
      { text: "The conference begins tomorrow, however; the keynote speaker cancelled.", isCorrect: false, rationale: "The semicolon position is incorrect." },
      { text: "The conference begins tomorrow however, the keynote speaker cancelled.", isCorrect: false, rationale: "Missing the semicolon before 'however.'" },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'medium',
    question: "Which sentence has an error in pronoun-antecedent agreement?",
    answerOptions: [
      { text: "Every employee must submit their timesheet by Friday.", isCorrect: false, rationale: "'Their' is now accepted as singular gender-neutral, especially with 'every employee.'" },
      { text: "Each of the students handed in their assignment.", isCorrect: false, rationale: "Similarly acceptable in modern usage." },
      { text: "The committee announced their final decision.", isCorrect: false, rationale: "Collective nouns can take plural pronouns in American English when emphasising individual members." },
      { text: "Neither of the boys remembered their homework.", isCorrect: true, rationale: "'Neither' is singular, so technically 'his or her' — though 'their' is accepted colloquially, this is the most likely textbook error in an exam context." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "Read the following paragraph and identify the sentence with a grammatical error:\\n\n(1) The marketing team has exceeded its quarterly targets every year for the past three years. (2) Despite the success, the director insisted that each team member review their own performance metrics individually. (3) The findings was presented to shareholders at the annual meeting. (4) Several investors called the results 'unprecedented.'",
    question: "Which sentence contains a grammatical error?",
    answerOptions: [
      { text: "Sentence 1", isCorrect: false, rationale: "No error — 'its' correctly agrees with 'team.'" },
      { text: "Sentence 2", isCorrect: false, rationale: "No error — 'their' is acceptable with singular 'each member.'" },
      { text: "Sentence 3", isCorrect: true, rationale: "'Findings' is plural; the verb should be 'were,' not 'was.'" },
      { text: "Sentence 4", isCorrect: false, rationale: "No grammatical error — quoted word is correctly used." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    question: "Choose the sentence that correctly uses an apostrophe:",
    answerOptions: [
      { text: "The companies' profits fell sharply after the recall.", isCorrect: true, rationale: "Multiple companies: 'companies'' (plural possessive) is correct." },
      { text: "The companys' profits fell sharply after the recall.", isCorrect: false, rationale: "The plural of 'company' is 'companies,' not 'companys.'" },
      { text: "The company's' profits fell sharply after the recall.", isCorrect: false, rationale: "There is no such form as 'company's'.' Double apostrophe is always wrong." },
      { text: "The companies profits fell sharply after the recall.", isCorrect: false, rationale: "Missing apostrophe — no possessive is formed." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "The following paragraph from a business proposal contains one error. Identify the sentence that should be revised:\\n\n(1) Our company has expanded its services to three new markets. (2) We plan to hire 50 additional staff this year, training them intensively, and provide competitive salaries. (3) The CEO is confident that these investments will yield returns within 18 months. (4) All new hires will undergo a month-long orientation.",
    question: "Which sentence has a structural problem?",
    answerOptions: [
      { text: "Sentence 1", isCorrect: false, rationale: "Grammatically correct." },
      { text: "Sentence 2", isCorrect: true, rationale: "'hire 50 additional staff,' 'training them intensively,' and 'provide competitive salaries' are not parallel. Should be 'to hire,' 'to train,' and 'to provide.'" },
      { text: "Sentence 3", isCorrect: false, rationale: "Grammatically correct." },
      { text: "Sentence 4", isCorrect: false, rationale: "Grammatically correct." },
    ],
    challenge_tags: ['rla-1'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    question: "A writer wants to combine the following two sentences into one while keeping both ideas clearly. Which option is best?\\n\\nOriginal: The new policy reduces overtime. It also improves employee satisfaction ratings.",
    answerOptions: [
      { text: "The new policy reduces overtime, it also improves employee satisfaction ratings.", isCorrect: false, rationale: "Comma splice — two independent clauses joined only by a comma." },
      { text: "The new policy not only reduces overtime but also improves employee satisfaction ratings.", isCorrect: true, rationale: "'Not only…but also' creates grammatically parallel, logically connected structure." },
      { text: "Reducing overtime, the new policy also improving employee satisfaction ratings.", isCorrect: false, rationale: "'Improving' should be 'improves' — the sentence is grammatically broken." },
      { text: "The new policy reduces overtime and also improving employee satisfaction ratings.", isCorrect: false, rationale: "Inconsistent verb forms: 'reduces' vs. 'improving.'" },
    ],
    challenge_tags: ['rla-1'],
  },
];
`
);

write(
  'rla_main_idea_04.js',
  `
// Reading Comprehension — Core Skills: Practice 4 / Main Idea
// 10 questions | inference, author purpose, structure, longer passages 80-120 words
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "In the decades following World War II, the United States experienced a dramatic economic expansion. Returning veterans benefited from the GI Bill, which provided low-cost mortgages, tuition support, and job training. Suburban developments sprung up around major cities as families left urban centres in search of larger homes and safer neighbourhoods. This migration — often called 'white flight' — reshaped America's demographic landscape and had lasting effects on urban tax bases and school quality that persisted for generations.",
    question: "What is the main idea of this passage?",
    answerOptions: [
      { text: "The GI Bill was the most important law in American history.", isCorrect: false, rationale: "The GI Bill is one detail among several; the passage doesn't make this superlative claim." },
      { text: "Post-WWII economic expansion and the GI Bill triggered a suburban migration with lasting social consequences.", isCorrect: true, rationale: "The passage connects economic expansion, the GI Bill, suburban growth, and long-term effects — this is the complete main idea." },
      { text: "Urban areas became poorer because veterans moved to cities.", isCorrect: false, rationale: "Veterans moved to suburbs, not cities; the detail is reversed." },
      { text: "White flight caused World War II.", isCorrect: false, rationale: "Cause and effect are reversed — white flight followed WWII, not the reverse." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "Photosynthesis is the process by which plants, algae, and some bacteria convert light energy — usually from the sun — into chemical energy stored in glucose. This process uses carbon dioxide and water as raw materials and releases oxygen as a byproduct. Photosynthesis is the foundation of virtually all food chains on Earth, providing the organic matter that fuels nearly every ecosystem. Without it, life as we know it would not exist.",
    question: "According to the passage, what is the most important reason to consider photosynthesis 'the foundation of virtually all food chains'?",
    answerOptions: [
      { text: "It uses carbon dioxide, which reduces air pollution.", isCorrect: false, rationale: "CO₂ use is a detail, not the reason it underpins food chains." },
      { text: "It produces the oxygen that all animals breathe.", isCorrect: false, rationale: "Oxygen production is important but isn't the stated reason for underpinning food chains." },
      { text: "It produces the organic matter (glucose) that fuels nearly every ecosystem.", isCorrect: true, rationale: "The passage explicitly connects food-chain foundation to organic matter production." },
      { text: "It requires sunlight, which is unlimited.", isCorrect: false, rationale: "Sunlight is a raw material input, not the reason photosynthesis underpins food chains." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "For decades, urban planners in the United States prioritised car travel. Wide roads, generous parking requirements, and zoning that separated housing from commerce made walking or cycling impractical. By the 2000s, researchers documented a connection between car-dependent urban design and rising rates of obesity, social isolation, and air pollution. Cities like Portland, Oregon and Minneapolis, Minnesota began investing in light rail, protected bike lanes, and mixed-use zoning — and reported measurable improvements in physical activity rates, air quality, and business district vitality.",
    question: "Based on the passage, what is the implied criticism of traditional urban planning?",
    answerOptions: [
      { text: "Traditional planners did not care about the environment.", isCorrect: false, rationale: "The passage implies their choices caused environmental harm; it doesn't claim planners were indifferent." },
      { text: "Prioritising cars over human-scale design contributed to harmful public health, social, and environmental outcomes.", isCorrect: true, rationale: "This accurately reflects the implied argument based on the cause-and-effect structure of the passage." },
      { text: "Urban planners were not qualified to make infrastructure decisions.", isCorrect: false, rationale: "No such claim is made or implied." },
      { text: "All American cities must now copy Portland and Minneapolis.", isCorrect: false, rationale: "The passage uses those cities as examples, not as mandates for all cities." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "The Dust Bowl of the 1930s was one of the worst ecological disasters in American history. Years of overfarming fragile Great Plains soil, combined with a prolonged drought, stripped the land of its natural grass cover. Without roots to hold it, the topsoil became loose and was swept into massive dust storms — 'black blizzards' — that darkened skies as far east as New York and Washington D.C. Hundreds of thousands of farming families abandoned their land. Many migrated west to California, where they faced discrimination and exploitative labour conditions.",
    question: "What is the most accurate conclusion supported by the passage?",
    answerOptions: [
      { text: "The Dust Bowl was caused solely by drought.", isCorrect: false, rationale: "The passage identifies both overfarming AND drought as causes — 'solely' is inaccurate." },
      { text: "Agricultural practices and drought combined to destabilise the Great Plains ecosystem, with devastating human and environmental consequences.", isCorrect: true, rationale: "This accurately captures the dual cause (farming + drought) and the consequences (ecological disaster, displacement, discrimination)." },
      { text: "California farmers welcomed Dust Bowl migrants with support and jobs.", isCorrect: false, rationale: "The passage says migrants faced 'discrimination and exploitative labour conditions.'" },
      { text: "The Dust Bowl was limited to the Great Plains region.", isCorrect: false, rationale: "Dust clouds reached as far east as New York and Washington D.C." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "Fiction writer Toni Morrison once explained her creative philosophy this way: 'If there's a book you really want to read, but it hasn't been written yet, then you must write it.' This deceptively simple statement contains a profound artistic principle: that writers should fill absences, not replicate what already exists. Morrison's own body of work embodied this philosophy — her novels explored the lives of Black Americans in depth and complexity that had rarely appeared in American literary fiction before her, centring experiences that mainstream literature had historically marginalised or ignored.",
    question: "What does the passage suggest about Morrison's creative approach?",
    answerOptions: [
      { text: "She believed writers should imitate successful novels.", isCorrect: false, rationale: "The exact opposite — she wrote to fill absences, not to replicate." },
      { text: "She wrote to give voice to experiences and perspectives that had been excluded from mainstream American literature.", isCorrect: true, rationale: "The passage directly connects her philosophy ('fill absences') to her practice of centring Black American experiences." },
      { text: "She only wrote for Black American audiences.", isCorrect: false, rationale: "The passage doesn't make this claim — it describes what she wrote about, not for whom." },
      { text: "She believed all writers should write autobiographically.", isCorrect: false, rationale: "No such claim appears in the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "The history of public health is largely a history of conflict between individual liberty and collective wellbeing. Vaccine mandates, quarantine orders, and smoking bans have all faced fierce resistance from those who view such measures as government overreach. Yet most societies have ultimately accepted certain restrictions when the evidence of collective benefit is overwhelming. Smallpox vaccination campaigns — mandatory in many countries by the early 20th century — eradicated a disease that had killed hundreds of millions over the course of human history. The tension between individual rights and public health will continue to define political debates in every generation.",
    question: "Which statement best captures the author's perspective on the individual liberty vs. public health debate?",
    answerOptions: [
      { text: "Individual liberty should always take precedence over public health concerns.", isCorrect: false, rationale: "The author presents historical examples where restrictions were accepted — this does not reflect the passage's balance." },
      { text: "The conflict is permanent but societies have repeatedly chosen collective benefit when evidence is strong enough.", isCorrect: true, rationale: "The passage shows ongoing tension ('will continue') but also historical examples where society accepted restrictions." },
      { text: "All vaccine mandates are an unacceptable violation of liberty.", isCorrect: false, rationale: "The author presents smallpox vaccination as a successful example of such a mandate." },
      { text: "Governments should never restrict individual behaviour for public health.", isCorrect: false, rationale: "The passage says societies 'ultimately accepted' such restrictions when evidence was strong." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "In her 1963 book The Feminine Mystique, Betty Friedan described 'the problem that has no name' — a pervasive sense of dissatisfaction among educated, middle-class American women who were expected to find complete fulfilment in being wives and mothers. Friedan argued that postwar American culture had pushed women out of professional and civic life and back into the domestic sphere, isolating them and leaving their intellectual and personal ambitions unfulfilled. Critics of Friedan later noted that her analysis was largely limited to white, educated, middle-class women and did not represent the diverse experiences of working-class women, women of colour, or women outside the United States.",
    question: "The critics' observation about Friedan's analysis is best described as:",
    answerOptions: [
      { text: "A refutation of Friedan's core argument.", isCorrect: false, rationale: "The critics note a limitation in scope, not that her core argument about the women she described is wrong." },
      { text: "A challenge to the representativeness of Friedan's claims — noting that the 'problem' she described did not apply equally to all women.", isCorrect: true, rationale: "This accurately characterises the critics' point: Friedan's analysis was real for some women but not universal." },
      { text: "Evidence that Friedan opposed the feminist movement.", isCorrect: false, rationale: "The Feminine Mystique is foundational to second-wave feminism; this characterisation is false." },
      { text: "Proof that middle-class women did not actually face dissatisfaction.", isCorrect: false, rationale: "Critics dispute scope, not the existence of the problem for the women Friedan studied." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "Excerpt from a 1906 US federal report on meatpacking conditions:\n\n'We saw meat shoveled from filthy wooden floors, piled on tables rarely washed, pushed from room to room in rotten box carts, in all of which processes it was in contact with splinters, floor dirt, and the expectoration of tuberculous workers. In these rooms the air was thick with the odor and the steam of the cooking fat and steam pipes, out of which the condensation constantly dripped onto the men and the food.'",
    question: "What is the primary purpose of this excerpt?",
    answerOptions: [
      { text: "To praise the efficiency of industrial meatpacking.", isCorrect: false, rationale: "Every detail in the passage describes dangerous, unsanitary conditions — not efficiency." },
      { text: "To document unsanitary conditions in order to build the case for government regulation.", isCorrect: true, rationale: "This is a federal report — its purpose is factual documentation to support policy action. The vivid, specific detail serves to justify intervention." },
      { text: "To entertain readers with shocking descriptions.", isCorrect: false, rationale: "Federal reports have regulatory, not entertainment, purposes." },
      { text: "To advertise improved sanitation standards.", isCorrect: false, rationale: "The conditions described are horrific; no improvement is mentioned." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "The Amazon rainforest has been called 'the lungs of the Earth' because it absorbs vast quantities of carbon dioxide and releases oxygen. However, scientists have recently reported that significant portions of the Eastern Amazon have crossed a threshold and are now releasing more carbon dioxide than they absorb — a result of decades of deforestation and climate-change-driven stress. If this net-carbon-release zone expands, the Amazon could transform from a carbon sink to a carbon source, potentially accelerating global climate change in ways that existing models have not fully accounted for.",
    question: "What does the passage suggest about the relationship between local deforestation and global climate change?",
    answerOptions: [
      { text: "They are unrelated because the Amazon is too large to affect global systems.", isCorrect: false, rationale: "The passage says the Amazon already affects and is affected by global climate systems." },
      { text: "Deforestation stress on the Amazon could create a feedback loop that accelerates global climate change beyond current projections.", isCorrect: true, rationale: "A possible 'net carbon source' Amazon would worsen climate change — a feedback loop with global consequences 'not fully accounted for' in models." },
      { text: "Oxygen levels globally are declining because of Amazon deforestation.", isCorrect: false, rationale: "The passage discusses carbon emissions, not a global drop in oxygen levels." },
      { text: "The Amazon is currently in good health and absorbing carbon efficiently.", isCorrect: false, rationale: "Portions have already crossed the release threshold — the opposite of 'good health.'" },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "Frederick Douglass wrote in his 1852 speech 'What to the Slave is the Fourth of July?':\n\n'This Fourth July is YOURS, not MINE. You may rejoice, I must mourn. To drag a man in fetters into the grand illuminated temple of liberty, and call upon him to join you in joyous anthems, were inhuman mockery and sacrilegious irony.'",
    question: "What rhetorical strategy does Douglass use most powerfully in this excerpt?",
    answerOptions: [
      { text: "Appeals to historical data about the number of enslaved people in America.", isCorrect: false, rationale: "No statistics appear in the excerpt." },
      { text: "Creating contrast between the celebration of liberty and the reality of enslavement to expose the hypocrisy of the holiday for enslaved people.", isCorrect: true, rationale: "The 'yours, not mine' contrast, the temple of liberty vs. fetters imagery, and 'inhuman mockery' all use ironic contrast as the core rhetorical move." },
      { text: "Politely requesting that white Americans include Black Americans in celebrations.", isCorrect: false, rationale: "The tone is accusatory and ironic, not polite or requesting." },
      { text: "Arguing that the Fourth of July should be abolished.", isCorrect: false, rationale: "Douglass does not call for abolishing the holiday — he calls out its hollow meaning while slavery persists." },
    ],
    challenge_tags: ['rla-2'],
  },
];
`
);

console.log('\n✓ RLA files written.');
