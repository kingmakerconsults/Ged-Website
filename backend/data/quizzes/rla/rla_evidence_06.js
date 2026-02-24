// Reading Comprehension  Core: Textual Evidence  Practice 6
// 10 questions | evaluating competing evidence, source credibility, evidence gaps
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "A local newspaper reported that the town's new community garden had 'transformed the neighbourhood.' The article cited three facts: the garden produced 2,000 pounds of vegetables in its first season, 45 families volunteered regularly, and a retired teacher who helped start the garden said, 'This is the best thing that ever happened to our block.'",
    question: "Which evidence most directly supports the claim of neighbourhood transformation?",
    answerOptions: [
      { text: "The retired teacher's quote about it being the best thing on the block.", isCorrect: false, rationale: "One person's enthusiasm is anecdotal  'best thing ever' is subjective and cannot measure transformation." },
      { text: "45 families volunteering regularly, showing sustained, broad community participation.", isCorrect: true, rationale: "Ongoing participation by 45 families indicates community-level engagement  a stronger indicator of social transformation than one person's quote or raw produce weight." },
      { text: "The garden produced 2,000 pounds of vegetables.", isCorrect: false, rationale: "Produce output measures agricultural success, not neighbourhood transformation." },
      { text: "The newspaper reported on the garden.", isCorrect: false, rationale: "Media coverage is not evidence of transformation  it's evidence of newsworthiness." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "A gym advertised: 'Our members lose an average of 15 pounds in their first three months!' A fitness magazine investigated and found that the statistic included only members who maintained their membership for the full three months. Members who quit early  about 40% of new sign-ups  were excluded from the average.",
    question: "How does the excluded data affect the reliability of the gym's claim?",
    answerOptions: [
      { text: "It doesn't affect reliability, because quitters didn't complete the programme.", isCorrect: false, rationale: "Excluding 40% of customers who may have quit because they saw no results creates a biased sample that overstates success." },
      { text: "By counting only members who stayed, the gym excluded those most likely to have seen poor results  inflating the average weight loss and making the programme appear more effective than the full member experience suggests.", isCorrect: true, rationale: "If people who quit saw less benefit, including them would lower the average. The gym's statistic reflects survivor success, not typical member outcomes." },
      { text: "The gym should not track member weight at all.", isCorrect: false, rationale: "Tracking is fine  the issue is how the data is reported, not whether it's collected." },
      { text: "All gyms falsify their weight loss data.", isCorrect: false, rationale: "The gym's claim may be technically true  it's misleading due to selection, not fabrication." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "A city official argued that installing speed cameras on Highway 9 had saved lives, citing a 35% drop in fatal accidents on that highway over two years. An insurance industry analyst noted that fatal accident rates had dropped 22% statewide during the same period  on highways with and without cameras  due to improved vehicle safety features and a statewide texting-while-driving ban.",
    question: "What does the analyst's evidence suggest about the city's claim?",
    answerOptions: [
      { text: "Speed cameras had zero effect on Highway 9.", isCorrect: false, rationale: "The analyst's data doesn't eliminate the camera's effect  a 35% local drop versus a 22% statewide average leaves a 13-point gap that cameras might explain." },
      { text: "A significant portion of the reduction would have occurred anyway due to statewide trends, so the cameras' specific contribution may be limited to the difference between 35% and 22% rather than the full 35% the official claimed.", isCorrect: true, rationale: "The statewide baseline shows most of the improvement was systemic. The cameras may have added 13 percentage points of benefit  real but much smaller than the official implied." },
      { text: "Vehicle safety features are more dangerous than speed cameras.", isCorrect: false, rationale: "Nothing in the passage suggests safety features are dangerous." },
      { text: "The city should remove all speed cameras immediately.", isCorrect: false, rationale: "Even a 13-point incremental benefit may justify the cameras  the data calls for accurate attribution, not removal." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "A university study claimed that students who took handwritten notes performed better on conceptual exam questions than students who typed notes on laptops. The study compared 65 students in a single lecture. A critic pointed out that the handwriting group was self-selected  students who chose to handwrite may already have been more studious or attentive, which could explain their higher scores independently of the note-taking method.",
    question: "What type of evidence problem does the critic identify?",
    answerOptions: [
      { text: "The study used too many students.", isCorrect: false, rationale: "65 students is a modest sample, but the critic's concern is about selection, not size." },
      { text: "Self-selection bias  students who chose handwriting may differ from laptop users in ways that affect performance, making it impossible to attribute the score difference to the note-taking method alone.", isCorrect: true, rationale: "When participants choose their own condition, pre-existing differences between the groups confound the results." },
      { text: "Laptops are always better for learning than handwriting.", isCorrect: false, rationale: "The critic questions the study's methodology, not the general superiority of laptops." },
      { text: "The lecture topic was too difficult for students.", isCorrect: false, rationale: "Lecture difficulty is not the critic's concern." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "A food company's website stated: 'Our organic cereal is the healthiest choice for your family.' As evidence, the site listed that the cereal contains no artificial colours, is made with whole grains, and has 'been enjoyed by over 2 million families.' It also featured a testimonial from a mother of three who said her children had 'more energy' since switching to the cereal.",
    question: "Which of the company's claims is presented without supporting evidence?",
    answerOptions: [
      { text: "The cereal contains no artificial colours.", isCorrect: false, rationale: "This is a verifiable ingredient claim  its evidence is the ingredient list." },
      { text: "The cereal is 'the healthiest choice for your family.'", isCorrect: true, rationale: "No comparative data is provided against other cereals. The supporting points (no artificial colours, whole grains, popularity, one testimonial) do not prove it is the healthiest option  only that it has some healthy attributes." },
      { text: "The cereal is made with whole grains.", isCorrect: false, rationale: "This is a verifiable ingredient claim." },
      { text: "Over 2 million families have enjoyed the cereal.", isCorrect: false, rationale: "This is a sales figure claim  questionable as health evidence but potentially verifiable." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A think tank argued that minimum wage increases cause job losses, citing a study showing that restaurants in Seattle cut hours by an average of 9% after a minimum wage increase. A labour economist responded with a study of 138 paired counties straddling state borders  where one county had a higher minimum wage  showing no significant difference in employment rates across the border pairs.",
    question: "Why is the border-county study design particularly effective at challenging the think tank's evidence?",
    answerOptions: [
      { text: "It uses more counties than the Seattle study used restaurants.", isCorrect: false, rationale: "Size matters, but the design is the key advantage  the question asks about design, not just scale." },
      { text: "Adjacent counties share similar economies, demographics, and consumer bases, so comparing them isolates the minimum wage variable more effectively than studying a single city where many factors change simultaneously.", isCorrect: true, rationale: "Border-county pairs control for regional economic conditions naturally. Seattle's study couldn't isolate the minimum wage from other changes in a booming tech-driven city." },
      { text: "Counties are more important economic units than cities.", isCorrect: false, rationale: "The advantage is the comparative design, not the geographic unit." },
      { text: "The labour economist has better credentials than the think tank.", isCorrect: false, rationale: "The question asks about evidence design, not credentialing." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A hospital CEO announced that patient satisfaction had improved, citing a score increase from 72% to 81% on post-discharge surveys. A nurse union representative noted that the hospital had simultaneously shortened average hospital stays from 4.2 to 2.8 days. The representative suggested that patients who leave sooner may rate their experience higher simply because they spent less time in an uncomfortable environment  not because care quality improved.",
    question: "What alternative explanation does the nurse representative propose for the satisfaction increase?",
    answerOptions: [
      { text: "Patients lie on satisfaction surveys.", isCorrect: false, rationale: "The representative doesn't suggest dishonesty  they question what the scores actually measure." },
      { text: "Shorter stays may reduce dissatisfaction by reducing exposure to hospital discomfort, creating higher scores without any improvement in the quality of care delivered  the score change may reflect duration of stay, not care quality.", isCorrect: true, rationale: "If discomfort accumulates with time, shorter stays could boost scores mechanically. The CEO attributes improvement to care quality, but the representative offers an alternative mechanism." },
      { text: "Nurses are better caregivers than doctors.", isCorrect: false, rationale: "The representative's argument is about statistical interpretation, not staff comparisons." },
      { text: "Patient satisfaction surveys should be eliminated.", isCorrect: false, rationale: "The representative questions interpretation, not the existence of surveys." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A wildlife conservation group argued that reintroducing wolves to Yellowstone had restored ecological balance. They cited evidence that elk populations decreased, overgrazing of riverside willows stopped, beaver dam building resumed, and stream erosion decreased. A sceptic argued that the wolves' effect was exaggerated because a multi-year drought during the same period also reduced elk populations and changed vegetation patterns.",
    question: "How should the competing claims be evaluated based on the evidence presented?",
    answerOptions: [
      { text: "The drought disproves the wolf reintroduction theory entirely.", isCorrect: false, rationale: "Multiple downstream effects (beaver dams, stream erosion) are harder to attribute to drought  the sceptic weakens the wolf-only narrative but doesn't disprove it." },
      { text: "Both wolves and drought likely contributed to the ecological changes  the conservation group's error is attributing all changes to wolves, while the sceptic's contribution is identifying an additional variable that complicates the causal story.", isCorrect: true, rationale: "The truth likely involves both factors. The conservation group oversimplified by ignoring drought; the sceptic correctly identifies a confound without necessarily disproving the wolf effect." },
      { text: "Wolves have no effect on ecosystems.", isCorrect: false, rationale: "Predator effects on ecosystems are well-documented  the debate is about degree of effect, not zero effect." },
      { text: "Droughts are caused by wolf reintroduction.", isCorrect: false, rationale: "There is no mechanism by which wolves cause drought." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A tech company published a diversity report showing that women comprised 38% of new hires in the past year  up from 29% two years earlier. The report was headlined 'Making Real Progress on Gender Diversity.' A data analyst noted that during the same two years, the company's total workforce gender ratio remained at 24% women because most departures were also women, and the senior leadership team went from 2 women out of 12 to 1 out of 12.",
    question: "How does the analyst's context change the meaning of the '38% of new hires' figure?",
    answerOptions: [
      { text: "The hiring figure is fabricated.", isCorrect: false, rationale: "The analyst doesn't dispute the 38%  they add context that changes its significance." },
      { text: "Hiring more women is meaningless if the company cannot retain them and if leadership diversity is actually declining  the headline metric shows inflow improvement while masking outflow problems and stagnation where power is held.", isCorrect: true, rationale: "38% of new hires sounds progressive, but if overall representation is flat at 24% and leadership is declining, the company is losing women as fast as it hires them. The 'progress' is an illusion in the full context." },
      { text: "The company should stop hiring women.", isCorrect: false, rationale: "The analyst's point is that hiring alone is insufficient  not that it should stop." },
      { text: "Gender diversity has no business value.", isCorrect: false, rationale: "The analyst questions the company's claim of progress, not the value of diversity." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city council member argued against building a homeless shelter in a residential neighbourhood, citing a study from another city showing property values dropped 4% within a half-mile of a new shelter. A housing researcher countered with a meta-analysis of 28 studies across 15 cities showing that 22 of the 28 found no measurable impact on property values, and the 6 that did find impacts were all in areas with pre-existing high crime rates.",
    question: "Why is the housing researcher's evidence stronger than the council member's?",
    answerOptions: [
      { text: "The researcher's study was published more recently.", isCorrect: false, rationale: "Publication date is not the distinguishing factor  study design and scope are." },
      { text: "A meta-analysis of 28 studies across 15 cities provides a far broader evidence base than a single study from one city  and the finding that negative impacts cluster in already high-crime areas suggests the council member's cited case may not generalise to the proposed neighbourhood.", isCorrect: true, rationale: "One study can always find a result. Twenty-eight studies showing the opposite pattern in most cases is systematically stronger, and the high-crime qualifier explains when exceptions occur." },
      { text: "Property values are irrelevant to shelter placement decisions.", isCorrect: false, rationale: "Property values are a legitimate concern  the question is which evidence about them is more reliable." },
      { text: "Meta-analyses are always correct and cannot be wrong.", isCorrect: false, rationale: "Meta-analyses can have limitations, but they are stronger than single studies for generalisation." },
    ],
    challenge_tags: ['rla-2'],
  },
];
