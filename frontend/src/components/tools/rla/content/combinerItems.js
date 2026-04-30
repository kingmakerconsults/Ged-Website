// Each item: list of choppy source sentences and four candidate combined
// versions. The correct one preserves meaning and uses parallel/clear structure.
export const COMBINER_ITEMS = [
  {
    id: 'c1',
    sources: [
      'Maya finished her shift at the bakery.',
      'She walked across the street to the library.',
      'She returned three overdue books.',
    ],
    options: [
      {
        text: 'After finishing her shift at the bakery, Maya walked across the street to the library and returned three overdue books.',
        correct: true,
        rationale:
          'Combines all three actions in clear sequence with parallel verbs.',
      },
      {
        text: 'Maya finishing her shift at the bakery, she walked across the street, and returning three overdue books to the library.',
        correct: false,
        rationale: 'Mixes participles and lacks a complete main clause.',
      },
      {
        text: 'Maya finished her shift at the bakery and she walked across the street to the library and she returned three overdue books.',
        correct: false,
        rationale: 'Stringy "and" repetition makes the sentence choppy.',
      },
      {
        text: 'After finishing her shift at the bakery, Maya, walking across the street to the library, returned three overdue books.',
        correct: false,
        rationale: 'Awkward modifier placement breaks the rhythm.',
      },
    ],
  },
  {
    id: 'c2',
    sources: [
      'The committee reviewed three traffic plans.',
      'They voted on each plan separately.',
      'They chose the second plan unanimously.',
    ],
    options: [
      {
        text: 'After reviewing three traffic plans and voting on each separately, the committee chose the second plan unanimously.',
        correct: true,
        rationale: 'Tight, parallel structure preserves meaning.',
      },
      {
        text: 'The committee, who reviewed three traffic plans, voting on each plan, separately chose the second plan unanimously.',
        correct: false,
        rationale: 'Misplaced commas and "separately" change the meaning.',
      },
      {
        text: 'Three traffic plans were reviewed and each was voted on separately, the committee chose the second one unanimously.',
        correct: false,
        rationale: 'Comma splice between two independent clauses.',
      },
      {
        text: 'The committee, reviewing three traffic plans and they voted on each separately, chose the second plan unanimously.',
        correct: false,
        rationale: 'Mixes participle and finite verb in the modifier.',
      },
    ],
  },
  {
    id: 'c3',
    sources: [
      'The factory installed solar panels last spring.',
      'Energy bills dropped by 25 percent.',
      'The savings paid for the panels in two years.',
    ],
    options: [
      {
        text: 'Since installing solar panels last spring, the factory has cut energy bills by 25 percent and recouped the cost of the panels in two years.',
        correct: true,
        rationale:
          'Combines cause and effect smoothly with consistent perfect tense.',
      },
      {
        text: 'The factory installed solar panels last spring; therefore, energy bills dropped by 25 percent, and so paying for the panels in two years.',
        correct: false,
        rationale:
          'Final clause is a fragment; transitions are stacked awkwardly.',
      },
      {
        text: 'Last spring solar panels were installed by the factory and energy bills dropped 25 percent, the savings paid for them in two years.',
        correct: false,
        rationale: 'Comma splice and unnecessary passive opening.',
      },
      {
        text: 'The factory installed solar panels last spring, paying for them in two years, when energy bills dropped 25 percent.',
        correct: false,
        rationale: 'Garbles the order of cause and effect.',
      },
    ],
  },
  {
    id: 'c4',
    sources: [
      'The training was scheduled for Saturday.',
      'It was postponed because of severe weather.',
      'It was rescheduled for the following Wednesday evening.',
    ],
    options: [
      {
        text: 'Originally scheduled for Saturday, the training was postponed because of severe weather and rescheduled for the following Wednesday evening.',
        correct: true,
        rationale: 'Compact, clear, with parallel verbs in past tense.',
      },
      {
        text: 'The training was scheduled for Saturday, however severe weather postponing it, and rescheduled for the following Wednesday evening.',
        correct: false,
        rationale:
          'Conjunctive adverb usage is wrong and the participle creates a fragment.',
      },
      {
        text: 'The training, that was scheduled for Saturday, postponed because of severe weather, and they rescheduled it for the following Wednesday evening.',
        correct: false,
        rationale: 'Choppy, with an extra subject "they" appearing late.',
      },
      {
        text: 'Saturday\u2019s training, severe weather postponed, was rescheduled for the following Wednesday evening.',
        correct: false,
        rationale: 'Inserts an awkward absolute phrase mid-sentence.',
      },
    ],
  },
  {
    id: 'c5',
    sources: [
      'The author surveyed 200 households.',
      'She analyzed how each household used water.',
      'Her report recommended low-flow fixtures.',
    ],
    options: [
      {
        text: 'After surveying 200 households and analyzing how each used water, the author recommended low-flow fixtures in her report.',
        correct: true,
        rationale: 'Sequential, parallel participles tied to one main clause.',
      },
      {
        text: 'The author, who surveyed 200 households, that analyzed how each household used water, recommended low-flow fixtures.',
        correct: false,
        rationale: 'Stacked relative clauses make the sentence hard to follow.',
      },
      {
        text: 'Surveying 200 households, the author analyzed water use and her report recommended low-flow fixtures.',
        correct: false,
        rationale: 'Subject shifts midway from "the author" to "her report".',
      },
      {
        text: 'The author surveyed 200 households, and analyzed how each household used water, recommending low-flow fixtures in her report.',
        correct: false,
        rationale:
          'Comma before "and" is unnecessary and the structure is uneven.',
      },
    ],
  },
  {
    id: 'c6',
    sources: [
      'Heavy rain fell overnight.',
      'The river rose three feet.',
      'Several roads near the bank were closed.',
    ],
    options: [
      {
        text: 'After heavy rain fell overnight, the river rose three feet, forcing the closure of several roads near the bank.',
        correct: true,
        rationale: 'Cause-and-effect chain with one strong main clause.',
      },
      {
        text: 'Heavy rain fell overnight, the river rose three feet, and several roads near the bank were closed.',
        correct: false,
        rationale: 'Comma splice between two independent clauses.',
      },
      {
        text: 'Because of heavy rain falling overnight, the river rising three feet, several roads near the bank closed.',
        correct: false,
        rationale: 'String of participles with no main verb.',
      },
      {
        text: 'The river rose three feet because heavy rain fell overnight and which closed several roads near the bank.',
        correct: false,
        rationale: '"And which" is ungrammatical.',
      },
    ],
  },
  {
    id: 'c7',
    sources: [
      'The school added breakfast service.',
      'Attendance improved.',
      'Test scores rose modestly.',
    ],
    options: [
      {
        text: 'After the school added breakfast service, attendance improved and test scores rose modestly.',
        correct: true,
        rationale:
          'One subordinate clause + two parallel results joined by "and".',
      },
      {
        text: 'The school added breakfast service, attendance improved and test scores rose modestly.',
        correct: false,
        rationale: 'Comma splice.',
      },
      {
        text: 'The school adding breakfast service, attendance improving, and test scores rising modestly.',
        correct: false,
        rationale: 'Three participles, no main verb.',
      },
      {
        text: 'The school added breakfast service which attendance improved and test scores rose modestly.',
        correct: false,
        rationale: 'Misuses "which" and lacks proper relative clause.',
      },
    ],
  },
  {
    id: 'c8',
    sources: [
      'The hiring manager reviewed each application.',
      'She compared candidates against the rubric.',
      'She invited five people to interview.',
    ],
    options: [
      {
        text: 'After reviewing each application and comparing candidates against the rubric, the hiring manager invited five people to interview.',
        correct: true,
        rationale: 'Two parallel participles preceding a single main clause.',
      },
      {
        text: 'The hiring manager reviewed each application, comparing candidates against the rubric, she invited five people to interview.',
        correct: false,
        rationale: 'Comma splice between two independent ideas.',
      },
      {
        text: 'The hiring manager, reviewed each application, compared candidates against the rubric, and inviting five people to interview.',
        correct: false,
        rationale:
          'Tense and form inconsistencies; trailing participle creates a fragment.',
      },
      {
        text: 'The hiring manager reviewed each application and which compared candidates against the rubric, inviting five people to interview.',
        correct: false,
        rationale: '"And which" misuses the relative pronoun.',
      },
    ],
  },
];
