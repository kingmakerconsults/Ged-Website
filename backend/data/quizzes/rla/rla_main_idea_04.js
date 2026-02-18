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
    passage: "Excerpt from a 1906 US federal report on meatpacking conditions:

'We saw meat shoveled from filthy wooden floors, piled on tables rarely washed, pushed from room to room in rotten box carts, in all of which processes it was in contact with splinters, floor dirt, and the expectoration of tuberculous workers. In these rooms the air was thick with the odor and the steam of the cooking fat and steam pipes, out of which the condensation constantly dripped onto the men and the food.'",
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
    passage: "Frederick Douglass wrote in his 1852 speech 'What to the Slave is the Fourth of July?':

'This Fourth July is YOURS, not MINE. You may rejoice, I must mourn. To drag a man in fetters into the grand illuminated temple of liberty, and call upon him to join you in joyous anthems, were inhuman mockery and sacrilegious irony.'",
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