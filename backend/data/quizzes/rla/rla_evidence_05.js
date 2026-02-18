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
    passage: "The following is an excerpt from a letter to the editor:

'The proposed curfew ordinance for teens under 18 is an overreach of government authority. America was founded on principles of individual liberty. Besides, most juvenile crime occurs before 9 p.m., not after, so a midnight curfew would barely affect crime statistics. Resources would be better spent on after-school programs and community mentors who are proven to reduce crime.'",
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
    passage: "From a corporate responsibility report:
'Our company has reduced carbon emissions by 30% over the past decade. We employ over 10,000 people in communities across the state and donate \$2 million annually to local charities. We are committed to sustainable growth and being a positive force in the communities we serve.'

A local environmental group responds: 'The 30% reduction is measured against the company's 2013 peak emission year — a year in which they had twice their current level of production. Adjusted for current production volume, their emissions per unit produced have increased by 12%.'
",
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
    passage: "Economist A argues: 'Raising the minimum wage to \$15 will boost consumer spending. Low-wage workers spend nearly all of their income locally, so putting more money in their pockets directly stimulates the economy.'

Economist B argues: 'Raising the minimum wage to \$15 will cause small businesses to automate or cut hours to control costs. A 2019 study of Seattle's minimum wage increase found a 9% drop in hours worked at low-wage jobs in the first year.'",
    question: "Which of the following would MOST strengthen Economist A's argument?",
    answerOptions: [
      { text: "Evidence that automation is expensive for most small businesses.", isCorrect: true, rationale: "If automation is prohibitively expensive, businesses cannot simply replace workers — weakening B's counter and strengthening A's case." },
      { text: "Evidence that minimum wage workers spend money online, not locally.", isCorrect: false, rationale: "This would weaken Economist A's claim that spending is local." },
      { text: "Data showing Seattle's economy grew after the wage increase.", isCorrect: false, rationale: "Economic growth may have many causes; this doesn't directly respond to the hours-worked drop." },
      { text: "Evidence that \$15 is too low a minimum wage increase.", isCorrect: false, rationale: "Economist A is defending the \$15 threshold; arguing it's too low doesn't help the original position." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    passage: "A city council member states: 'Our new after-school tutoring programme is working. Last year, 78% of participants improved their reading scores by at least one grade level. This proves that targeted tutoring is the most effective way to raise reading achievement citywide.'

A researcher responds: 'Participation in the programme was voluntary. Students who opt in to extra tutoring typically come from more motivated families, making them more likely to improve regardless of the programme's specific content.'",
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
    passage: "Source A (2018 industry report): 'The solar industry employs more full-time workers than coal mining in the United States, with solar jobs growing at 17 times the national average rate.'

Source B (2022 government brief): 'While solar employment has grown, the average solar installation job pays 12% less than the average coal mining job, and solar jobs are more geographically concentrated in urban areas, leaving rural communities with fewer employment options in the energy sector.'",
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