// Each item: sentence with target word in **double asterisks**; the
// VocabInContext component will render that word bold.
export const VOCAB_ITEMS = [
  {
    id: 'v1',
    word: 'mitigate',
    sentence:
      'The new drainage system was designed to **mitigate** flooding during heavy storms.',
    options: [
      {
        text: 'make worse',
        correct: false,
        rationale:
          'The drainage system would not be designed to make flooding worse.',
      },
      {
        text: 'reduce the severity of',
        correct: true,
        rationale:
          'Correct. "Mitigate" means to lessen the impact of something.',
      },
      {
        text: 'predict in advance',
        correct: false,
        rationale:
          'No prediction is implied; the system actively reduces damage.',
      },
      {
        text: 'celebrate publicly',
        correct: false,
        rationale: 'Unrelated to the engineering context.',
      },
    ],
  },
  {
    id: 'v2',
    word: 'arbitrary',
    sentence:
      'The judge ruled that the fines were **arbitrary** because no clear standard guided them.',
    options: [
      {
        text: 'fair and consistent',
        correct: false,
        rationale: 'Opposite — the fines lacked consistency.',
      },
      {
        text: 'based on personal whim rather than rule',
        correct: true,
        rationale:
          'Correct. "Arbitrary" decisions are not based on system or reason.',
      },
      {
        text: 'extremely large in amount',
        correct: false,
        rationale: 'Size of the fine is not the issue here.',
      },
      {
        text: 'required by federal law',
        correct: false,
        rationale:
          'The judge faulted them for lacking standards, not following law.',
      },
    ],
  },
  {
    id: 'v3',
    word: 'concise',
    sentence:
      'A **concise** summary tells the reader exactly what happened without unnecessary detail.',
    options: [
      {
        text: 'long and decorated',
        correct: false,
        rationale: 'Opposite of concise.',
      },
      {
        text: 'brief but informative',
        correct: true,
        rationale: 'Correct. Concise = short and to the point.',
      },
      {
        text: 'difficult to understand',
        correct: false,
        rationale: 'Concise summaries aim for clarity.',
      },
      {
        text: 'full of personal opinion',
        correct: false,
        rationale: 'Unrelated to the meaning of concise.',
      },
    ],
  },
  {
    id: 'v4',
    word: 'tentative',
    sentence:
      'They reached a **tentative** agreement that still needed final approval from the board.',
    options: [
      {
        text: 'permanent and binding',
        correct: false,
        rationale: 'A tentative agreement is not yet final.',
      },
      {
        text: 'not yet certain or final',
        correct: true,
        rationale: 'Correct. Tentative means provisional, subject to change.',
      },
      {
        text: 'rejected outright',
        correct: false,
        rationale: 'They reached an agreement, not a rejection.',
      },
      {
        text: 'enforced immediately',
        correct: false,
        rationale:
          'It still required board approval, so it was not enforced yet.',
      },
    ],
  },
  {
    id: 'v5',
    word: 'feasible',
    sentence:
      'The committee studied whether expanding bus service was **feasible** with the current budget.',
    options: [
      {
        text: 'profitable in the short term',
        correct: false,
        rationale: 'Profitability is not the question being studied here.',
      },
      {
        text: 'capable of being done',
        correct: true,
        rationale: 'Correct. Feasible means doable or workable.',
      },
      {
        text: 'popular with riders',
        correct: false,
        rationale: 'Popularity is a separate concern from feasibility.',
      },
      {
        text: 'required by law',
        correct: false,
        rationale: 'No legal requirement is discussed.',
      },
    ],
  },
  {
    id: 'v6',
    word: 'novel',
    sentence:
      'The engineer proposed a **novel** approach to recycling industrial wastewater.',
    options: [
      {
        text: 'old-fashioned',
        correct: false,
        rationale: 'Opposite — novel means new.',
      },
      {
        text: 'new and original',
        correct: true,
        rationale: 'Correct. As an adjective, "novel" means newly invented.',
      },
      {
        text: 'related to a story',
        correct: false,
        rationale: 'That is the noun meaning; the sentence uses the adjective.',
      },
      {
        text: 'extremely cheap',
        correct: false,
        rationale: 'Cost is not implied by the word.',
      },
    ],
  },
  {
    id: 'v7',
    word: 'scrutinize',
    sentence:
      'Auditors **scrutinize** every receipt before approving the final report.',
    options: [
      {
        text: 'glance at briefly',
        correct: false,
        rationale: 'Auditors do the opposite of glancing.',
      },
      {
        text: 'examine closely and carefully',
        correct: true,
        rationale: 'Correct. To scrutinize is to inspect in detail.',
      },
      {
        text: 'discard without reading',
        correct: false,
        rationale: 'Opposite of careful review.',
      },
      {
        text: 'photocopy for storage',
        correct: false,
        rationale: 'Unrelated to the verb\u2019s meaning.',
      },
    ],
  },
  {
    id: 'v8',
    word: 'prudent',
    sentence:
      'A **prudent** investor diversifies across several industries instead of betting on one.',
    options: [
      { text: 'reckless', correct: false, rationale: 'Opposite of prudent.' },
      {
        text: 'showing careful judgment',
        correct: true,
        rationale: 'Correct. Prudent describes wise, careful choices.',
      },
      {
        text: 'inexperienced',
        correct: false,
        rationale: 'No comment on experience is implied.',
      },
      {
        text: 'wealthy',
        correct: false,
        rationale: 'Wealth is not the meaning here.',
      },
    ],
  },
  {
    id: 'v9',
    word: 'ambivalent',
    sentence:
      'Voters were **ambivalent** about the proposal, supporting some parts and rejecting others.',
    options: [
      {
        text: 'enthusiastic and unified',
        correct: false,
        rationale: 'Opposite of ambivalent.',
      },
      {
        text: 'having mixed feelings',
        correct: true,
        rationale:
          'Correct. Ambivalent describes simultaneous support and doubt.',
      },
      {
        text: 'strongly opposed',
        correct: false,
        rationale: 'Voters supported some parts, so not strongly opposed.',
      },
      {
        text: 'unaware of the issue',
        correct: false,
        rationale: 'They had opinions, so they were aware.',
      },
    ],
  },
  {
    id: 'v10',
    word: 'jeopardize',
    sentence: 'Skipping safety checks could **jeopardize** the entire project.',
    options: [
      {
        text: 'speed up',
        correct: false,
        rationale: 'Opposite of the threat implied here.',
      },
      {
        text: 'put at risk',
        correct: true,
        rationale: 'Correct. To jeopardize is to endanger.',
      },
      {
        text: 'document carefully',
        correct: false,
        rationale: 'Skipping checks is the opposite of documentation.',
      },
      {
        text: 'reorganize',
        correct: false,
        rationale: 'Reorganization is not implied.',
      },
    ],
  },
  {
    id: 'v11',
    word: 'bias',
    sentence:
      'A reliable news source works hard to keep personal **bias** out of its reporting.',
    options: [
      {
        text: 'a factual source',
        correct: false,
        rationale: 'Bias is unfair preference, not a source of facts.',
      },
      {
        text: 'an unfair preference',
        correct: true,
        rationale:
          'Correct. Bias is leaning toward one side without justification.',
      },
      {
        text: 'a printing error',
        correct: false,
        rationale: 'Unrelated to the meaning.',
      },
      {
        text: 'a financial profit',
        correct: false,
        rationale: 'Unrelated to the meaning.',
      },
    ],
  },
  {
    id: 'v12',
    word: 'inevitable',
    sentence:
      'Given the storm\u2019s strength, some power outages were **inevitable**.',
    options: [
      {
        text: 'avoidable with care',
        correct: false,
        rationale: 'Opposite of inevitable.',
      },
      {
        text: 'certain to happen',
        correct: true,
        rationale:
          'Correct. Inevitable describes something that cannot be prevented.',
      },
      {
        text: 'rare and surprising',
        correct: false,
        rationale: 'The opposite — outages were expected.',
      },
      {
        text: 'controlled by government',
        correct: false,
        rationale: 'Unrelated to the meaning.',
      },
    ],
  },
  {
    id: 'v13',
    word: 'rigorous',
    sentence:
      'Medical trials follow a **rigorous** process to ensure that results are reliable.',
    options: [
      {
        text: 'casual and flexible',
        correct: false,
        rationale: 'Opposite of rigorous.',
      },
      {
        text: 'strict and thorough',
        correct: true,
        rationale: 'Correct. Rigorous procedures leave little room for error.',
      },
      {
        text: 'optional',
        correct: false,
        rationale: 'Unrelated to the word\u2019s meaning.',
      },
      {
        text: 'inexpensive',
        correct: false,
        rationale: 'Cost is not implied.',
      },
    ],
  },
  {
    id: 'v14',
    word: 'curtail',
    sentence:
      'The city had to **curtail** weekend bus service when fuel prices spiked.',
    options: [
      { text: 'expand', correct: false, rationale: 'Opposite of curtail.' },
      {
        text: 'cut back',
        correct: true,
        rationale: 'Correct. To curtail is to reduce or limit.',
      },
      {
        text: 'modernize',
        correct: false,
        rationale: 'Unrelated to the meaning.',
      },
      {
        text: 'advertise',
        correct: false,
        rationale: 'Unrelated to the meaning.',
      },
    ],
  },
  {
    id: 'v15',
    word: 'resilient',
    sentence:
      'A **resilient** community recovers quickly after a natural disaster.',
    options: [
      { text: 'fragile', correct: false, rationale: 'Opposite of resilient.' },
      {
        text: 'able to recover from setbacks',
        correct: true,
        rationale: 'Correct. Resilience describes the capacity to bounce back.',
      },
      {
        text: 'wealthy',
        correct: false,
        rationale: 'Wealth is not the same as resilience.',
      },
      {
        text: 'isolated',
        correct: false,
        rationale: 'Isolation is unrelated to the meaning.',
      },
    ],
  },
];
