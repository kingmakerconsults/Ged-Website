// Reading Comprehension  Test Ready: Practice 7 / Main Idea & Author's Purpose
// 10 questions | inferring implicit main ideas, evaluating author purpose and tone in complex texts
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "In the early 20th century, American cities faced a sanitation crisis. Rapidly growing industrial populations produced volumes of waste that overwhelmed existing systems. Tuberculosis, typhoid, and cholera spread through contaminated water and crowded tenements. Progressive reformers responded not primarily with medical interventions but with infrastructure: sewage systems, water treatment plants, building codes mandating light and ventilation, and garbage collection. The dramatic decline in urban mortality rates that followed was less a triumph of medicine than of engineering and political will.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Progressive reformers focused on containing the spread of tuberculosis and cholera mainly through medical quarantine programs in overcrowded tenements.", isCorrect: false, rationale: "The passage states reformers responded 'not primarily with medical interventions but with infrastructure' \u2014 this answer reverses the passage's central claim." },
      { text: "Industrial populations in the early 20th century preferred building solutions to disease because physicians were too scarce and expensive for most urban workers.", isCorrect: false, rationale: "The passage does not discuss doctor availability or public preference \u2014 it credits reformers and political will, not popular demand for engineering over medicine." },
      { text: "The decline in urban death rates resulted mainly from infrastructure improvements and political reform rather than from medical treatment, making it an engineering achievement.", isCorrect: true, rationale: "The final sentence states the decline was 'less a triumph of medicine than of engineering and political will,' and the details about sewage, water treatment, and codes support this." },
      { text: "Building codes that mandated light and ventilation proved far more effective than water treatment plants in reducing the rates of urban mortality in cities.", isCorrect: false, rationale: "The passage lists building codes and water treatment as parts of the same infrastructure response \u2014 it never ranks one above the other." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'medium',
    passage: "The Marshall Plan, formally the European Recovery Program (1948-1952), provided $13 billion in American economic assistance to rebuild Western European economies devastated by World War II. While humanitarian motives were genuine, the programme also served strategic Cold War objectives: prosperous Western European nations were far less likely to elect communist governments. By tying aid to the purchase of American goods, the Plan also stimulated U.S. exports. Critics argue the Plan was less about generosity than about securing American economic and geopolitical dominance; supporters counter that good outcomes for multiple parties do not diminish the achievement.",
    question: "What is the author's approach to presenting the Marshall Plan?",
    answerOptions: [
      { text: "The author presents multiple motivations for the Plan and includes both critics' and supporters' perspectives, offering a balanced and multi-layered analysis.", isCorrect: true, rationale: "The passage acknowledges humanitarian, anti-communist, and economic motivations and then explicitly gives voice to both critics and supporters \u2014 a deliberately balanced approach." },
      { text: "The author argues that the Marshall Plan was mainly a Cold War strategy designed to stop communist governments from gaining power across Western European nations.", isCorrect: false, rationale: "Cold War strategy is presented as one of several motivations, not the primary framing \u2014 the passage also credits genuine humanitarian motives and economic benefits." },
      { text: "The author focuses primarily on how the Marshall Plan stimulated American exports by requiring that European nations purchase goods from United States companies.", isCorrect: false, rationale: "Export stimulation is mentioned as one effect of tying aid to purchases \u2014 it is not the author's primary focus or framing of the entire programme." },
      { text: "The author presents the supporters' view as more convincing while conceding that critics raise legitimate concerns about American economic self-interest in Europe.", isCorrect: false, rationale: "The passage gives the final word to supporters but does not signal agreement \u2014 it presents both views without choosing a side." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "When a city installs surveillance cameras in a high-crime area and crime drops 15%, officials celebrate. Rarely do they mention that crime in adjacent, uncovered areas rose 12% during the same period. Criminologists call this 'crime displacement'  the cameras didn't eliminate criminal behaviour; they redistributed it to softer targets. The net city-wide crime reduction was only 3%, and it came at the cost of concentrating risk in neighbourhoods too poor or politically weak to demand their own cameras.",
    question: "What is the author's implicit argument about surveillance cameras?",
    answerOptions: [
      { text: "Surveillance cameras reduce crime in targeted areas but officials exaggerate overall effectiveness by ignoring the increased crime that appears in surrounding zones.", isCorrect: false, rationale: "This captures the displacement data but misses the equity argument \u2014 the author's deeper point is about which communities bear the shifted risk, not just about statistical exaggeration." },
      { text: "Criminologists believe that crime is a fixed quantity that simply relocates from one neighborhood to another whenever any prevention method is applied in any area.", isCorrect: false, rationale: "The passage describes displacement in this specific case \u2014 it does not claim criminologists view all crime as a fixed amount that always moves completely." },
      { text: "Crime displacement means that installing cameras in isolated high-crime areas is wholly counterproductive since the net citywide crime reduction is too small to justify costs.", isCorrect: false, rationale: "The author acknowledges a 3% net reduction \u2014 the core argument is about inequitable distribution of risk, not that the policy is entirely counterproductive." },
      { text: "Camera placement shifts danger from politically powerful areas to vulnerable ones, creating an illusion of safety gains while making the policy an equity failure.", isCorrect: true, rationale: "The passage builds toward the final equity claim: risk concentrates in neighborhoods 'too poor or politically weak to demand their own cameras,' making this a justice issue, not just a statistics issue." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A biologist writes: 'De-extinction  the attempt to recreate vanished species using preserved DNA  captures public imagination but diverts attention from a more productive goal: preventing current extinctions. The resources needed to bring back a single woolly mammoth could protect hundreds of endangered species and their habitats. We risk building a narrative in which extinction becomes reversible and therefore less urgent, when in reality genetic reconstruction produces Frankenstein approximations, not ecological restoration. The species is not the sequence; it is the web of relationships in which it evolved.'",
    question: "What is the biologist's central argument?",
    answerOptions: [
      { text: "Preserved DNA from extinct species degrades too rapidly for scientists to reconstruct complete genomes, which makes de-extinction technically unfeasible at present.", isCorrect: false, rationale: "The biologist does not claim de-extinction is impossible \u2014 she argues it is misguided and wasteful, calling the results 'Frankenstein approximations' rather than impossible ones." },
      { text: "De-extinction diverts conservation resources, fosters a dangerous illusion that extinction is reversible, and confuses genetic code with the ecological relationships that truly define a species.", isCorrect: true, rationale: "This captures all three layers: resource misallocation, moral hazard of reduced urgency, and the philosophical claim in the final sentence that species are ecological webs, not just sequences." },
      { text: "The biologist believes that all funding currently directed toward genetic reconstruction projects should be redirected toward protecting the habitats of endangered species.", isCorrect: false, rationale: "The biologist argues resources are better spent on conservation, but the central argument also includes the false reversibility narrative and the ecological definition of species." },
      { text: "Woolly mammoth reconstruction projects show that species are products of evolutionary webs, which means any organism recreated through genetics would be ecologically incomplete.", isCorrect: false, rationale: "The mammoth is used as a cost example, not as the basis for the ecological argument \u2014 this conflates two separate points from different parts of the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "In 1911, the Triangle Shirtwaist Factory fire killed 146 garment workers, mostly young immigrant women, who were unable to escape because the factory owners had locked exit doors to prevent unauthorised breaks. The tragedy shocked the nation and led to landmark workplace safety laws, fire codes, and labour regulations. Yet the factory owners were acquitted of manslaughter charges. The fire did more to advance worker protection than any legislative campaign before it  a bitter reminder that rights are often won not through persuasion but through catastrophe.",
    question: "What does the author's final sentence reveal about the passage's deeper argument?",
    answerOptions: [
      { text: "Systemic reform often requires catastrophic loss because normal political processes cannot overcome institutional inertia, and the human cost of that progress exposes a moral failure.", isCorrect: true, rationale: "The word 'bitter' signals that while reform followed, needing 146 deaths to achieve what lobbying could not indicts the system itself \u2014 progress through tragedy reveals political and moral inadequacy." },
      { text: "The acquittal of the factory owners proves that the legal system of the early 20th century was unable to hold employers responsible for the deaths of their workers.", isCorrect: false, rationale: "The acquittal is mentioned but the final sentence is about how reform happens through catastrophe, not about legal system failures specifically." },
      { text: "The fire advanced worker protection more than prior legislative efforts, proving that public outrage following a disaster is the most reliable driver of political change.", isCorrect: false, rationale: "This restates the factual claim but misses the moral weight \u2014 the author calls this 'bitter,' framing it as a tragic failure of normal processes, not a reliable strategy." },
      { text: "Immigrant workers were most vulnerable to industrial disasters because they lacked the political influence needed to demand safer working conditions from factory owners.", isCorrect: false, rationale: "The workers' immigrant status is biographical context \u2014 the deeper argument is about how societal reform depends on catastrophe, not about immigrant vulnerability specifically." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "Two researchers studied the same inner-city after-school programme. Researcher A used a quantitative approach: she compared test scores of 200 programme participants with 200 similar non-participants and found no significant academic improvement. Researcher B used qualitative methods: she spent six months observing the programme and interviewing 30 participants. She found that students developed stronger study habits, greater confidence in asking teachers for help, and a sense of belonging in school  none of which were captured by test scores. Both researchers published their findings in reputable journals.",
    question: "What does the contrast between the two studies illustrate about research methodology?",
    answerOptions: [
      { text: "Qualitative research reveals important developmental outcomes that quantitative methods cannot detect, which makes it the more complete approach for evaluating programmes.", isCorrect: false, rationale: "The passage shows each method captures different valid outcomes \u2014 it does not declare qualitative research superior overall, since quantitative data on test scores is also meaningful." },
      { text: "Researcher A's larger sample of 200 participants gives her statistical findings more weight and generalizability than Researcher B's smaller interview-based study.", isCorrect: false, rationale: "The passage presents both studies as valid contributions published in reputable journals \u2014 sample size is not used to rank one above the other." },
      { text: "Research methods determine which outcomes become visible, so quantitative and qualitative approaches answer different questions and neither alone provides the full picture.", isCorrect: true, rationale: "The passage illustrates methodological complementarity: test scores missed behavioral growth, while interviews missed academic metrics. What you measure shapes what you find." },
      { text: "Both studies appeared in reputable journals, which shows that contradictory conclusions can coexist in scholarship when researchers use fundamentally different methodologies.", isCorrect: false, rationale: "The findings are not contradictory \u2014 they measure different outcomes. The publication detail establishes credibility, not a point about contradictory results coexisting." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A climate scientist writes: 'The debate about whether climate change is happening is over. The remaining debate  how to respond  is not primarily scientific but economic and political. Any honest assessment must acknowledge trade-offs: aggressive emissions reduction will raise energy costs in the short term and may disproportionately burden low-income households. Inaction, however, will produce costs measured in drowned cities, collapsed fisheries, and climate refugees. The choice is not between costs and no costs. It is between manageable costs now and catastrophic costs later.'",
    question: "What rhetorical strategy does the scientist use to frame the climate response debate?",
    answerOptions: [
      { text: "She appeals to fear by describing drowned cities and climate refugees in order to pressure readers into supporting immediate and aggressive emissions reduction policies.", isCorrect: false, rationale: "She acknowledges costs on both sides \u2014 the strategy is reframing the cost structure, not simply using fear to push one position." },
      { text: "She reframes the debate from whether to act to which costs society prefers, accepting that mitigation has real short-term expenses but showing that inaction is far more costly.", isCorrect: true, rationale: "The final two sentences are the key rhetorical move: both paths cost something, so the real question is timing and magnitude \u2014 she turns 'should we act?' into 'when do we pay?'" },
      { text: "She concedes that aggressive emissions cuts will burden low-income households, then argues that this distributional trade-off is acceptable given the catastrophic alternative.", isCorrect: false, rationale: "She mentions the burden on low-income households as part of an honest assessment but her rhetorical strategy is reframing costs, not arguing that one trade-off is acceptable." },
      { text: "She dismisses the scientific debate as already settled and shifts the entire discussion to economic trade-offs, suggesting that political leaders bear sole responsibility.", isCorrect: false, rationale: "She does declare the science settled, but she does not assign sole responsibility to political leaders \u2014 her framing addresses collective societal choice about cost timing." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A memoir excerpt reads: 'My mother cooked every meal from scratch  not because she loved cooking, but because we could not afford prepared food. She never once described this as sacrifice; she called it \u2018doing what\u2019s necessary.\u2019 I did not understand until I became a parent that her refusal to name her labour as sacrifice was itself a form of protection. She shielded us from knowing we were poor by treating scarcity as ordinary.'",
    question: "What is the central insight of this passage?",
    answerOptions: [
      { text: "The author's family experienced financial hardship because the mother insisted on cooking homemade meals rather than purchasing more convenient prepared food.", isCorrect: false, rationale: "The passage says they couldn't afford prepared food \u2014 cooking from scratch was the cheaper option born of necessity, not a choice that caused hardship." },
      { text: "The mother's refusal to voice complaints about hardship taught her children the value of resilience and self-sufficiency, lessons the author recognized as a parent.", isCorrect: false, rationale: "The insight is about deliberate protective framing, not about teaching resilience \u2014 the children did not learn toughness; they were kept from knowing there was anything to be tough about." },
      { text: "Cooking meals from scratch rather than buying prepared food was a practical budget strategy that the mother successfully normalized by calling it simply what was necessary.", isCorrect: false, rationale: "This describes the surface facts but misses the central insight \u2014 the normalization was not about budgeting but about shielding her children from awareness of poverty." },
      { text: "The mother framed economic necessity as ordinary routine to shield her children from recognizing their poverty, a protective act of reframing the author grasps only as an adult.", isCorrect: true, rationale: "The passage's insight is that not naming sacrifice as sacrifice was itself a deliberate protective strategy \u2014 the author only understands this retrospectively after becoming a parent." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "The concept of 'digital redlining' describes how algorithms reproduce historical discrimination in new forms. Insurance companies charge higher premiums in certain ZIP codes based on historical claims data  data shaped by decades of underinvestment in those same neighbourhoods. Hiring algorithms trained on a company's past successful employees perpetuate the demographics of a historically non-diverse workforce. In each case, the technology appears neutral because it relies on 'data,' but the data itself encodes past discrimination, which the algorithm then automates and scales.",
    question: "What is the author's main argument about algorithmic decision-making?",
    answerOptions: [
      { text: "Algorithms trained on historical data inherit the biases embedded in that data and automate past discrimination at scale while appearing neutral because they rely on numbers.", isCorrect: true, rationale: "The passage's core paradox is that data feels objective but carries historical bias \u2014 algorithms do not create new discrimination; they perpetuate and scale existing patterns behind a veneer of neutrality." },
      { text: "Insurance companies and hiring managers should discontinue using algorithmic tools because the historical data those tools depend on reflects decades of systemic discrimination.", isCorrect: false, rationale: "The passage diagnoses the mechanism of bias inheritance but does not prescribe discontinuing algorithms \u2014 it explains how bias enters the system, not what policy should follow." },
      { text: "Digital redlining shows how historical claims data from underinvested neighborhoods creates a feedback loop that algorithms then encode into what appears to be an objective risk assessment.", isCorrect: false, rationale: "This describes only the insurance example \u2014 the main argument is broader, covering any algorithm trained on biased historical data, not just ZIP-code-based insurance pricing." },
      { text: "Technology companies intentionally design their algorithms to replicate racial and economic discrimination from previous decades in order to maintain existing societal power structures.", isCorrect: false, rationale: "The passage argues that bias enters through training data, not through intentional design \u2014 the point is that even well-intentioned algorithms reproduce bias when data encodes it." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "An economist writes: 'GDP growth is the most commonly cited indicator of national prosperity, yet it counts a car accident as economic progress  the ambulance, the hospital visit, the car repair all add to GDP  while ignoring unpaid caregiving, environmental depletion, and the distribution of wealth. A country can show rising GDP while most citizens grow poorer, if the gains concentrate at the top. GDP measures activity, not welfare. Using it as a synonym for national well-being is like judging a person\u2019s health by how much time they spend in a doctor\u2019s office.'",
    question: "What does the economist's final analogy illustrate?",
    answerOptions: [
      { text: "GDP fails to account for the distribution of wealth, so a country with rising GDP may actually see growing poverty among most of its citizens while the top earners gain.", isCorrect: false, rationale: "Wealth distribution is a separate point made earlier in the passage \u2014 the final analogy specifically targets the confusion between activity volume and actual well-being." },
      { text: "Spending time in a doctor's office correlates with illness rather than health, just as rising GDP correlates with increased economic activity that may stem from negative events.", isCorrect: false, rationale: "This paraphrases the analogy but misses the deeper point \u2014 the analogy illustrates that using an activity metric as a welfare metric is a fundamental category error, not merely a correlation issue." },
      { text: "Just as frequent doctor visits measure medical activity rather than actual health, GDP measures economic activity that can rise from harmful events rather than from genuine well-being.", isCorrect: true, rationale: "The analogy drives home the passage's thesis: GDP counts all activity including misfortune, just as doctor visits increase with illness. Both metrics can rise precisely because of negative circumstances." },
      { text: "The analogy suggests that economists should replace GDP entirely with direct health and welfare metrics since medical spending distorts national prosperity calculations.", isCorrect: false, rationale: "The economist argues GDP is misused as a welfare measure but does not call for abolishing it or replacing it with health metrics \u2014 the analogy critiques misinterpretation, not the metric itself." },
    ],
    challenge_tags: ['rla-2'],
  },
];
