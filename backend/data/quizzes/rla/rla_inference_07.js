// Reading Comprehension — Test Ready: Inference — Practice 7
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: "hard",
    passage: "During the Second World War, the U.S. government conducted a study of military aircraft that returned from missions and plotted the locations of bullet damage. Engineers proposed reinforcing the areas with the most hits. Statistician Abraham Wald argued the opposite: the areas that should be reinforced were the ones with NO bullet damage on returning planes — because damage in those areas meant the aircraft didn't return.",
    question: "What principle does Wald's reasoning illustrate?",
    answerOptions: [
      { text: "Pilots who survived were better at avoiding bullets.", isCorrect: false, rationale: "The argument is about where the damage was, not pilot skill." },
      { text: "Survivorship bias — studying only surviving cases can lead to false conclusions about where protection is most needed.", isCorrect: true, rationale: "Planes hit in critical areas didn't return — so the returning planes' damage pattern omits the fatal hits, creating a biased sample." },
      { text: "Aircraft should not be reinforced at all because reinforcement adds weight.", isCorrect: false, rationale: "Wald's argument is about where to reinforce, not whether to reinforceempty." },
      { text: "Statistical analysis should only be applied to aircraft that were destroyed.", isCorrect: false, rationale: "Wald was analysing the returning planes precisely to infer about the destroyed ones." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: "hard",
    passage: "A city conducted a study on its park system. Parks with regular programming — concerts, fitness classes, farmers' markets — attracted an average of 2,400 visitors per week. Parks with no programming averaged 310 visitors per week. The city's parks commissioner concluded: 'Programming is what people want in parks. We should convert all parks to programmed spaces.'",
    question: "What inference problem is present in the commissioner's conclusion?",
    answerOptions: [
      { text: "Parks with 310 visitors are clearly not functioning as public spaces.", isCorrect: false, rationale: "310 visitors is still meaningful use; the statement mischaracterises the comparison." },
      { text: "The commissioner ignores that some people may specifically value unprogrammed parks for quiet, nature, and unstructured use — higher attendance at programmed parks doesn't mean all parks should be programmed.", isCorrect: true, rationale: "High attendance at programmed parks shows those are valued; it doesn't follow that all visitors want programming, or that unprogrammed parks serve no purpose." },
      { text: "Farmers' markets are not appropriate for parks.", isCorrect: false, rationale: "Appropriateness of specific programming is not the logical flaw being discussed." },
      { text: "The study should have used a larger sample of parks.", isCorrect: false, rationale: "Sample size may be a concern, but the commissioner's logical error is about the scope of the conclusion, not sample size." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: "medium",
    passage: "From a novel: Olivia could count on one hand the times her father had talked about his childhood. He spoke freely about books, politics, and food, but when the conversation approached the years before he turned eighteen, something shifted in his face — a shuttering, slight and practiced — and he would find a reason to leave the room. She had learned not to ask.",
    question: "What can be inferred about Olivia's father's relationship with his childhood?",
    answerOptions: [
      { text: "He had a happy childhood and simply prefers not to be nostalgic.", isCorrect: false, rationale: "People who shut down discussion of a happy childhood with a 'practiced' expression and room-leaving are not typically described this way in literary contexts." },
      { text: "Something painful or difficult about his childhood has led him to avoid the subject — the 'practiced' nature of his shutdown suggests it has been a pattern for years.", isCorrect: true, rationale: "The involuntary expression, the practiced deflection, the pattern Olivia has 'learned' — all suggest long-standing avoidance of something painful." },
      { text: "Olivia's father had no childhood and was created as an adult.", isCorrect: false, rationale: "Not supported — the passage refers to 'the years before he turned eighteen.'" },
      { text: "Olivia doesn't care about her father's past and has moved on.", isCorrect: false, rationale: "Her observation and learning 'not to ask' suggests she is attentive and curious, not indifferent." },
    ],
    challenge_tags: ['rla-2'],
  }
];