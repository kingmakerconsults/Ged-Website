// Each item: two sentences (or a sentence with a blank) and the best
// transition word/phrase to link them.
export const TRANSITION_ITEMS = [
  {
    id: 't1',
    a: 'The new bus route was added in March.',
    b: 'Ridership in the area more than doubled by July.',
    relation: 'cause-and-effect',
    options: [
      {
        text: 'However',
        correct: false,
        rationale:
          '"However" signals contrast, but the second sentence supports rather than contradicts the first.',
      },
      {
        text: 'As a result',
        correct: true,
        rationale: 'Correct. The second sentence is the outcome of the first.',
      },
      {
        text: 'In contrast',
        correct: false,
        rationale: 'No contrast is being drawn.',
      },
      {
        text: 'For example',
        correct: false,
        rationale:
          'The second sentence is a result, not an example of the first.',
      },
    ],
  },
  {
    id: 't2',
    a: 'Many residents asked the council to approve the park renovation.',
    b: 'Several local businesses said the project would block parking.',
    relation: 'contrast',
    options: [
      {
        text: 'Therefore',
        correct: false,
        rationale: '"Therefore" signals a result, not a contrast.',
      },
      {
        text: 'However',
        correct: true,
        rationale:
          'Correct. The two sides hold opposing views, which "however" signals.',
      },
      {
        text: 'Similarly',
        correct: false,
        rationale: '"Similarly" implies agreement, not opposition.',
      },
      {
        text: 'Meanwhile',
        correct: false,
        rationale:
          '"Meanwhile" suggests simultaneous action, missing the contrast.',
      },
    ],
  },
  {
    id: 't3',
    a: 'The training covered budgeting basics, time management, and email etiquette.',
    b: 'It also reviewed how to schedule a meeting in the company calendar.',
    relation: 'addition',
    options: [
      {
        text: 'In addition',
        correct: true,
        rationale:
          'Correct. The second sentence adds another item to the list.',
      },
      {
        text: 'On the other hand',
        correct: false,
        rationale: 'Signals contrast, not addition.',
      },
      { text: 'Nevertheless', correct: false, rationale: 'Signals contrast.' },
      {
        text: 'In short',
        correct: false,
        rationale: '"In short" introduces a summary.',
      },
    ],
  },
  {
    id: 't4',
    a: 'The author argues that voter turnout is rising.',
    b: 'Turnout in the most recent midterm dropped by five percentage points.',
    relation: 'contradiction',
    options: [
      {
        text: 'For instance',
        correct: false,
        rationale: 'This evidence does not support the claim.',
      },
      {
        text: 'On the contrary',
        correct: true,
        rationale: 'Correct. The data contradicts the author\u2019s claim.',
      },
      {
        text: 'In addition',
        correct: false,
        rationale:
          '"In addition" signals more support, but the second sentence undercuts the first.',
      },
      { text: 'Therefore', correct: false, rationale: 'No causal link.' },
    ],
  },
  {
    id: 't5',
    a: 'Many small farms struggle with rising fertilizer costs.',
    b: 'A 30% jump in fertilizer prices last year forced several farms to scale back planting.',
    relation: 'example',
    options: [
      {
        text: 'For example',
        correct: true,
        rationale:
          'Correct. The second sentence offers a concrete instance of the problem.',
      },
      {
        text: 'On the other hand',
        correct: false,
        rationale: 'Signals contrast.',
      },
      {
        text: 'In conclusion',
        correct: false,
        rationale: '"In conclusion" signals a summary, not an example.',
      },
      { text: 'However', correct: false, rationale: 'No contrast is implied.' },
    ],
  },
  {
    id: 't6',
    a: 'The council reviewed three traffic plans.',
    b: 'They voted to adopt the second plan unanimously.',
    relation: 'sequence/result',
    options: [
      {
        text: 'Eventually',
        correct: true,
        rationale:
          'Correct. "Eventually" connects the review to the resulting decision.',
      },
      {
        text: 'Otherwise',
        correct: false,
        rationale: '"Otherwise" introduces an alternative, not a sequence.',
      },
      { text: 'In contrast', correct: false, rationale: 'No contrast.' },
      { text: 'For example', correct: false, rationale: 'Not an example.' },
    ],
  },
  {
    id: 't7',
    a: 'Recycling rates dropped sharply in 2024.',
    b: 'Several cities reported losing key processing contracts that year.',
    relation: 'explanation',
    options: [
      {
        text: 'In other words',
        correct: false,
        rationale:
          'The second sentence explains a cause, not restates the first.',
      },
      {
        text: 'This is partly because',
        correct: true,
        rationale: 'Correct. The second sentence offers an underlying reason.',
      },
      { text: 'Nevertheless', correct: false, rationale: 'No contrast.' },
      {
        text: 'For example',
        correct: false,
        rationale: 'It is a cause, not an example of dropping rates.',
      },
    ],
  },
  {
    id: 't8',
    a: 'The factory installed solar panels last spring.',
    b: 'Energy bills have fallen by nearly a quarter since then.',
    relation: 'cause-and-effect',
    options: [
      {
        text: 'Consequently',
        correct: true,
        rationale:
          'Correct. Lower bills are the consequence of installing panels.',
      },
      { text: 'On the other hand', correct: false, rationale: 'No contrast.' },
      { text: 'Similarly', correct: false, rationale: 'Not a comparison.' },
      {
        text: 'Despite this',
        correct: false,
        rationale: 'Implies contrast that isn\u2019t present.',
      },
    ],
  },
  {
    id: 't9',
    a: 'Many job seekers list teamwork as a strength on their r\u00e9sum\u00e9.',
    b: 'Few provide concrete examples that demonstrate it.',
    relation: 'contrast',
    options: [
      {
        text: 'Yet',
        correct: true,
        rationale:
          'Correct. The second sentence contrasts a claim with weak follow-through.',
      },
      {
        text: 'Therefore',
        correct: false,
        rationale: 'Signals a result, not contrast.',
      },
      {
        text: 'Similarly',
        correct: false,
        rationale: 'Implies agreement, but the sentences contrast.',
      },
      {
        text: 'Furthermore',
        correct: false,
        rationale: 'Signals more of the same, not contrast.',
      },
    ],
  },
  {
    id: 't10',
    a: 'The committee gathered survey responses, interviewed shop owners, and reviewed police data.',
    b: 'They released a 40-page report summarizing their findings.',
    relation: 'sequence',
    options: [
      {
        text: 'Finally',
        correct: true,
        rationale:
          'Correct. After the steps, the report came at the end of the process.',
      },
      { text: 'However', correct: false, rationale: 'No contrast is implied.' },
      {
        text: 'For instance',
        correct: false,
        rationale: 'Not an example of the steps.',
      },
      { text: 'In contrast', correct: false, rationale: 'No contrast.' },
    ],
  },
  {
    id: 't11',
    a: 'Studies show that exercise improves mood.',
    b: 'Even short walks can reduce symptoms of mild depression.',
    relation: 'specification',
    options: [
      {
        text: 'Specifically',
        correct: true,
        rationale:
          'Correct. The second sentence narrows the general claim with a specific example.',
      },
      { text: 'Nevertheless', correct: false, rationale: 'No contrast.' },
      {
        text: 'Otherwise',
        correct: false,
        rationale: '"Otherwise" presents an alternative outcome.',
      },
      {
        text: 'Meanwhile',
        correct: false,
        rationale: '"Meanwhile" suggests simultaneous events.',
      },
    ],
  },
  {
    id: 't12',
    a: 'Most public libraries now offer free Wi-Fi and laptop loans.',
    b: 'They host job-search clinics and r\u00e9sum\u00e9 workshops.',
    relation: 'addition',
    options: [
      {
        text: 'Furthermore',
        correct: true,
        rationale:
          'Correct. Adds another service in support of the same point.',
      },
      { text: 'On the contrary', correct: false, rationale: 'No contrast.' },
      {
        text: 'In conclusion',
        correct: false,
        rationale: 'Not a summary statement.',
      },
      {
        text: 'Otherwise',
        correct: false,
        rationale: 'No alternative outcome.',
      },
    ],
  },
];
