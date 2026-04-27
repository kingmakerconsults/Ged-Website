/**
 * electoral_college_scenarios.js - Electoral College Simulator data
 * Electoral vote math and winner-takes-all scenarios
 */

export const ELECTORAL_COLLEGE_SCENARIOS = [
  {
    id: 'simple_majority_1',
    difficulty: 'easy',
    tags: ['basics', 'electoral_votes', 'math'],
    title: 'Simple Electoral Vote Majority',
    prompt:
      'Candidate A has 260 electoral votes. Candidate B has 240. There are 38 electoral votes left. How many more votes does Candidate A need to win the presidency (270 required)?',
    type: 'numeric',
    correctAnswer: 10,
    explanation:
      'To reach 270, Candidate A needs 10 more electoral votes (270 - 260 = 10). This is the minimum needed to win the presidency.',
  },
  {
    id: 'winner_takes_all_1',
    difficulty: 'easy',
    tags: ['winner_takes_all', 'state_results'],
    title: 'Winner-Takes-All Scenario',
    prompt:
      'In a state with 20 electoral votes, Candidate A wins 51% of the popular vote and Candidate B wins 49%. Under winner-takes-all rules, how many electoral votes does Candidate A receive?',
    type: 'multiple_choice',
    choices: [
      { id: 'A', label: '10', isCorrect: false },
      { id: 'B', label: '20', isCorrect: true },
      { id: 'C', label: '11', isCorrect: false },
      { id: 'D', label: '0', isCorrect: false },
    ],
    explanation:
      'In most states, winner-takes-all means the candidate with the most votes in that state gets all of its electoral votes, regardless of the margin. Candidate A wins all 20 electoral votes despite the narrow margin.',
  },
  {
    id: 'map_flip_1',
    difficulty: 'medium',
    tags: ['swing_states', 'strategy', 'math'],
    title: 'Flipping a Swing State',
    prompt:
      'Candidate A currently has 268 electoral votes, and Candidate B has 270. A single swing state with 6 electoral votes is recounted and flips from B to A. Who wins after the recount?',
    type: 'multiple_choice',
    choices: [
      { id: 'A', label: 'Candidate A now wins (274-264)', isCorrect: true },
      { id: 'B', label: 'Candidate B still wins (270-274)', isCorrect: false },
      { id: 'C', label: 'There is a 270-270 tie', isCorrect: false },
      {
        id: 'D',
        label: 'The election is thrown to the Supreme Court',
        isCorrect: false,
      },
    ],
    explanation:
      'If 6 electoral votes move from B to A: A gains 6 (268 + 6 = 274) and B loses 6 (270 - 6 = 264), so Candidate A wins with 274 electoral votes.',
  },
  {
    id: 'popular_vote_vs_electoral',
    difficulty: 'hard',
    tags: ['popular_vote', 'electoral_college', 'disparity'],
    title: 'Popular Vote vs. Electoral Vote',
    prompt:
      'Candidate A wins the national popular vote by 3 million votes but loses the Electoral College. In 48 states, the race is very close. In 2 large states, Candidate B wins by overwhelming margins. How is this possible?',
    type: 'multiple_choice',
    choices: [
      {
        id: 'A',
        label: 'Candidate B concentrated wins in high-population states',
        isCorrect: true,
      },
      {
        id: 'B',
        label: 'The Electoral College votes are weighted by land area',
        isCorrect: false,
      },
      {
        id: 'C',
        label: 'Candidate A committed fraud in multiple states',
        isCorrect: false,
      },
      {
        id: 'D',
        label: 'Congress changed the rules after voting ended',
        isCorrect: false,
      },
    ],
    explanation:
      'The Electoral College system can produce outcomes where the winner of the national popular vote loses the presidency. This happens when the losing candidate wins some large states by huge margins (wasting votes) while losing close races in many smaller states. This has occurred 5 times in U.S. history.',
  },
  {
    id: 'state_electoral_votes_1',
    difficulty: 'easy',
    tags: ['state_votes', 'representation', 'congress'],
    title: 'How States Get Electoral Votes',
    prompt:
      'How many electoral votes does a state have in the Electoral College?',
    type: 'multiple_choice',
    choices: [
      {
        id: 'A',
        label: 'Equal to its state population divided by 100,000',
        isCorrect: false,
      },
      {
        id: 'B',
        label: 'Equal to its number of House members plus 2 Senators',
        isCorrect: true,
      },
      {
        id: 'C',
        label: 'Equal to the number of registered voters',
        isCorrect: false,
      },
      {
        id: 'D',
        label: 'Determined by the state legislature each year',
        isCorrect: false,
      },
    ],
    explanation:
      'Each state gets one electoral vote for each representative in the House (based on population) plus 2 electoral votes for its Senators. This means larger states have more electoral votes, but every state has at least 3.',
  },
  {
    id: 'total_electoral_votes',
    difficulty: 'easy',
    tags: ['basics', 'total_votes'],
    title: 'Total Electoral Votes',
    prompt:
      'What is the total number of electoral votes in a presidential election?',
    type: 'numeric',
    correctAnswer: 538,
    explanation:
      'There are 538 total electoral votes: 435 House members + 100 Senators + 3 for Washington, D.C. (from the 23rd Amendment). A candidate needs 270 votes to win (a simple majority).',
  },
  {
    id: 'swing_state_importance',
    difficulty: 'medium',
    tags: ['swing_states', 'strategy'],
    title: 'Why Swing States Matter',
    prompt:
      'Why do presidential campaigns focus most on "swing states" rather than safely Democratic or Republican states?',
    type: 'multiple_choice',
    choices: [
      {
        id: 'A',
        label: 'They have more electoral votes than other states',
        isCorrect: false,
      },
      {
        id: 'B',
        label:
          'The outcome in these states is uncertain and could decide the election',
        isCorrect: true,
      },
      {
        id: 'C',
        label: 'They have the lowest state populations',
        isCorrect: false,
      },
      {
        id: 'D',
        label: 'Federal law requires campaigns to visit swing states',
        isCorrect: false,
      },
    ],
    explanation:
      'Swing states are competitive battlegrounds where either candidate could win. Focusing resources there makes strategic sense because these states could determine the presidency. Safe states are less critical to campaign strategy.',
  },
  {
    id: 'electoral_tie_1',
    difficulty: 'hard',
    tags: ['tie', 'house_voting'],
    title: 'Electoral College Tie',
    prompt: 'What happens if the Electoral College results in a 269-269 tie?',
    type: 'multiple_choice',
    choices: [
      {
        id: 'A',
        label: 'There is an immediate runoff election',
        isCorrect: false,
      },
      {
        id: 'B',
        label: 'The House of Representatives votes to choose the president',
        isCorrect: true,
      },
      {
        id: 'C',
        label: 'The Supreme Court decides the winner',
        isCorrect: false,
      },
      {
        id: 'D',
        label: 'The sitting president continues in office',
        isCorrect: false,
      },
    ],
    explanation:
      'If no candidate wins 270 electoral votes, the House of Representatives votes to elect the president (with each state delegation getting one vote). The Senate elects the vice president. This process is outlined in the 12th Amendment.',
  },
  {
    id: 'early_voting_scenarios',
    difficulty: 'medium',
    tags: ['electoral_math', 'scenarios'],
    title: 'Early Election Scenario',
    prompt:
      'Before the last 5 states vote, Candidate A has 245 electoral votes and Candidate B has 247. The remaining 5 states have: 15, 12, 8, 5, and 3 electoral votes. Can Candidate A still win?',
    type: 'multiple_choice',
    choices: [
      {
        id: 'A',
        label: 'No, not enough electoral votes remain',
        isCorrect: false,
      },
      {
        id: 'B',
        label: 'Yes, if Candidate A wins all remaining states (243 total)',
        isCorrect: false,
      },
      {
        id: 'C',
        label: 'Yes, if Candidate A wins the largest 3 states',
        isCorrect: true,
      },
      {
        id: 'D',
        label: 'It depends on how many faithless electors there are',
        isCorrect: false,
      },
    ],
    explanation:
      'The remaining 43 electoral votes total: 15 + 12 + 8 + 5 + 3 = 43. If Candidate A wins the three largest states (15 + 12 + 8 = 35), they would have 245 + 35 = 280 electoral votes, which exceeds the 270 needed to win.',
  },
  {
    id: 'state_delegation_voting',
    difficulty: 'hard',
    tags: ['house_voting', 'contingent_election'],
    title: 'Contingent Election (House Vote)',
    prompt:
      'If the House of Representatives must elect the president because of an Electoral College tie, how many votes does each state get in the House vote?',
    type: 'multiple_choice',
    choices: [
      { id: 'A', label: 'One vote per House representative', isCorrect: false },
      {
        id: 'B',
        label: 'One vote per state (state delegation votes as a block)',
        isCorrect: true,
      },
      {
        id: 'C',
        label: 'Votes weighted by state population',
        isCorrect: false,
      },
      {
        id: 'D',
        label: 'Only representatives from swing states vote',
        isCorrect: false,
      },
    ],
    explanation:
      'In a contingent election, each state delegation votes as one unit. This means small states have the same influence as large states. A candidate needs 26 state votes (a simple majority of the 50 states) to become president.',
  },
  {
    id: 'faithless_elector',
    difficulty: 'hard',
    tags: ['electors', 'rare_scenarios'],
    title: 'Faithless Electors',
    prompt:
      'A "faithless elector" is an elector who votes contrary to how their state voted. How many faithless electors would it take to change the outcome if the election is decided 271-267?',
    type: 'numeric',
    correctAnswer: 5,
    explanation:
      'To flip a 271-267 result, you would need 5 electors to switch: the leader would drop 4 votes (271 - 4 = 267) and the challenger would gain 4 (267 + 4 = 271), but actually you need 5 to flip a 2-vote margin. In practice, faithless electors are extremely rare and have never decided an election.',
  },

  // ── Table-style GED-style questions ──────────────────────────────────────
  {
    id: 'table_swing_states_1',
    difficulty: 'medium',
    tags: ['table', 'swing_states', 'math'],
    title: 'Reading a Swing-State Table',
    type: 'table',
    tableData: {
      caption: 'Pre-election projection — remaining undecided states',
      headers: ['State', 'Electoral Votes', 'Leaning'],
      rows: [
        ['Pennsylvania', 19, 'Toss-up'],
        ['Michigan', 15, 'Toss-up'],
        ['Wisconsin', 10, 'Toss-up'],
        ['Arizona', 11, 'Toss-up'],
        ['Georgia', 16, 'Toss-up'],
      ],
    },
    prompt:
      'Candidate A already has 248 electoral votes from non-toss-up states. Based on the table, what is the FEWEST number of these toss-up states Candidate A must win to reach 270?',
    questionType: 'multiple_choice',
    choices: [
      { id: 'A', label: '1 state', isCorrect: false },
      { id: 'B', label: '2 states', isCorrect: true },
      { id: 'C', label: '3 states', isCorrect: false },
      { id: 'D', label: '4 states', isCorrect: false },
    ],
    explanation:
      'Candidate A needs 270 − 248 = 22 more EVs. The two largest toss-up states are PA (19) + GA (16) = 35, well over 22. Even PA (19) + WI (10) = 29 covers it. So 2 states are enough, but 1 state alone (max 19) is not.',
    mapAssignments: {
      // demo: assign all toss-ups + a stylized base for A
      PA: 'D', MI: 'D', WI: 'D', AZ: 'R', GA: 'R',
      CA: 'D', NY: 'D', IL: 'D', MA: 'D', WA: 'D', OR: 'D', NJ: 'D', MD: 'D',
      CT: 'D', RI: 'D', VT: 'D', DE: 'D', HI: 'D', NM: 'D', CO: 'D', MN: 'D',
      NV: 'D', VA: 'D', NH: 'D', ME: 'D', DC: 'D',
      TX: 'R', FL: 'R', OH: 'R', NC: 'R', TN: 'R', IN: 'R', KY: 'R', AL: 'R',
      MS: 'R', LA: 'R', AR: 'R', MO: 'R', KS: 'R', OK: 'R', SC: 'R', WV: 'R',
      IA: 'R', UT: 'R', ID: 'R', MT: 'R', WY: 'R', ND: 'R', SD: 'R', NE: 'R', AK: 'R',
    },
  },
  {
    id: 'table_state_ev_distribution',
    difficulty: 'easy',
    tags: ['table', 'representation'],
    title: 'Comparing State Electoral Votes',
    type: 'table',
    tableData: {
      caption: 'Selected state electoral vote totals',
      headers: ['State', 'Population (millions)', 'Electoral Votes'],
      rows: [
        ['California', 39, 54],
        ['Texas', 30, 40],
        ['Florida', 22, 30],
        ['Wyoming', 0.6, 3],
        ['Vermont', 0.6, 3],
      ],
    },
    prompt:
      'Based on the table, which best explains why Wyoming and Vermont have 3 electoral votes despite their tiny populations?',
    questionType: 'multiple_choice',
    choices: [
      { id: 'A', label: 'Each state gets at least 3 EVs (1 House + 2 Senators).', isCorrect: true },
      { id: 'B', label: 'They are guaranteed 3 EVs by the 23rd Amendment.', isCorrect: false },
      { id: 'C', label: 'EVs are based purely on land area.', isCorrect: false },
      { id: 'D', label: 'Small states are always swing states.', isCorrect: false },
    ],
    explanation:
      'Every state has at least 1 representative and 2 senators, so the EV minimum is 3. This gives small states proportionally more EV-per-person than large ones.',
  },
  {
    id: 'table_running_totals',
    difficulty: 'medium',
    tags: ['table', 'math', 'running_total'],
    title: 'Election Night Running Totals',
    type: 'table',
    tableData: {
      caption: 'Election night results so far',
      headers: ['Region called', 'Cand. A EVs', 'Cand. B EVs'],
      rows: [
        ['Northeast', 78, 14],
        ['South', 36, 121],
        ['Midwest', 49, 47],
        ['West (so far)', 65, 36],
      ],
    },
    prompt:
      'Using the table, what is each candidate’s current EV total, and how many EVs are still uncalled (538 total)?',
    questionType: 'multiple_choice',
    choices: [
      { id: 'A', label: 'A: 228, B: 218, uncalled: 92', isCorrect: true },
      { id: 'B', label: 'A: 218, B: 228, uncalled: 92', isCorrect: false },
      { id: 'C', label: 'A: 228, B: 218, uncalled: 102', isCorrect: false },
      { id: 'D', label: 'A: 270, B: 268, uncalled: 0', isCorrect: false },
    ],
    explanation:
      'A: 78+36+49+65 = 228. B: 14+121+47+36 = 218. Called total = 446, so uncalled = 538 − 446 = 92.',
  },
  {
    id: 'table_margin_per_ev',
    difficulty: 'hard',
    tags: ['table', 'analysis'],
    title: 'Wasted Votes & Margins',
    type: 'table',
    tableData: {
      caption: 'Three-state outcome',
      headers: ['State', 'EVs', 'Cand. A votes', 'Cand. B votes'],
      rows: [
        ['State X', 20, '2,500,000', '2,400,000'],
        ['State Y', 10, '900,000', '1,100,000'],
        ['State Z', 15, '700,000', '2,800,000'],
      ],
    },
    prompt:
      'Based on this table, who won the popular vote across these three states, and who won the electoral vote?',
    questionType: 'multiple_choice',
    choices: [
      { id: 'A', label: 'Cand. A won popular and electoral.', isCorrect: false },
      { id: 'B', label: 'Cand. B won popular and electoral.', isCorrect: true },
      { id: 'C', label: 'Cand. A won popular; Cand. B won electoral.', isCorrect: false },
      { id: 'D', label: 'They tied in both.', isCorrect: false },
    ],
    explanation:
      'Popular: A = 4,100,000 vs B = 6,300,000 → B wins. Electoral: A wins State X (20 EVs); B wins Y (10) + Z (15) = 25 EVs → B wins. The takeaway: B’s huge margin in State Z piles up "wasted" votes — sometimes the popular and electoral results agree, sometimes they don’t.',
  },
  {
    id: 'table_270_path',
    difficulty: 'medium',
    tags: ['table', 'strategy', 'math'],
    title: 'Mapping a Path to 270',
    type: 'table',
    tableData: {
      caption: 'Cand. A’s safe states',
      headers: ['State group', 'Total EVs'],
      rows: [
        ['Northeast safe', 92],
        ['West Coast safe', 74],
        ['Other safe', 43],
      ],
    },
    prompt:
      'According to the table, Cand. A starts with 209 EVs from safe states. The toss-ups left are PA (19), MI (15), WI (10), GA (16), AZ (11), and NV (6). Which combination is the smallest set that reaches at least 270?',
    questionType: 'multiple_choice',
    choices: [
      { id: 'A', label: 'PA + MI + WI + GA (60 EVs)', isCorrect: false },
      { id: 'B', label: 'PA + MI + GA (50 EVs)', isCorrect: false },
      { id: 'C', label: 'PA + MI + WI + AZ (55 EVs)', isCorrect: false },
      { id: 'D', label: 'PA + MI + GA + WI (60 EVs)', isCorrect: false },
      { id: 'E', label: 'PA + MI + GA + AZ (61 EVs)', isCorrect: true },
    ],
    explanation:
      'Need 270 − 209 = 61. Adding the four largest toss-ups gets you exactly there: 19 + 15 + 16 + 11 = 61 EVs. The other 4-state combinations only reach 55 or 60, which falls short.',
  },

  // ── Chart-style (bar chart) questions ────────────────────────────────────
  {
    id: 'chart_top_ev_states',
    difficulty: 'easy',
    tags: ['chart', 'reading'],
    title: 'Reading an EV Bar Chart',
    type: 'chart',
    chartData: {
      caption: 'Top-5 states by electoral votes',
      bars: [
        { label: 'CA', value: 54 },
        { label: 'TX', value: 40 },
        { label: 'FL', value: 30 },
        { label: 'NY', value: 28 },
        { label: 'PA', value: 19 },
      ],
      yAxisLabel: 'Electoral Votes',
      maxValue: 60,
    },
    prompt:
      'According to the chart, how many MORE electoral votes does California have than Pennsylvania?',
    questionType: 'multiple_choice',
    choices: [
      { id: 'A', label: '14', isCorrect: false },
      { id: 'B', label: '25', isCorrect: false },
      { id: 'C', label: '35', isCorrect: true },
      { id: 'D', label: '54', isCorrect: false },
    ],
    explanation:
      'CA has 54 and PA has 19. The difference is 54 − 19 = 35 electoral votes.',
  },
  {
    id: 'chart_swing_state_ev',
    difficulty: 'medium',
    tags: ['chart', 'swing_states'],
    title: 'Swing State EV Totals',
    type: 'chart',
    chartData: {
      caption: 'Major swing states (2024 cycle)',
      bars: [
        { label: 'PA', value: 19 },
        { label: 'GA', value: 16 },
        { label: 'NC', value: 16 },
        { label: 'MI', value: 15 },
        { label: 'AZ', value: 11 },
        { label: 'WI', value: 10 },
        { label: 'NV', value: 6 },
      ],
      yAxisLabel: 'Electoral Votes',
      maxValue: 25,
    },
    prompt:
      'Based on the chart, what is the TOTAL number of electoral votes across all the swing states shown?',
    questionType: 'numeric',
    correctAnswer: 93,
    explanation:
      'Add the bars: 19 + 16 + 16 + 15 + 11 + 10 + 6 = 93 electoral votes.',
  },
  {
    id: 'chart_path_after_swing',
    difficulty: 'hard',
    tags: ['chart', 'math', 'strategy'],
    title: 'Adding Swing-State Bars to a Base',
    type: 'chart',
    chartData: {
      caption: 'Swing states won by Cand. A',
      bars: [
        { label: 'PA', value: 19 },
        { label: 'MI', value: 15 },
        { label: 'GA', value: 16 },
      ],
      yAxisLabel: 'Electoral Votes',
      maxValue: 25,
    },
    prompt:
      'Cand. A starts with 226 safe EVs. According to the chart, which swing states does A win? After adding those, does Cand. A reach the 270 needed to win?',
    questionType: 'multiple_choice',
    choices: [
      { id: 'A', label: 'A wins PA, MI, and GA → 276 EVs → wins.', isCorrect: true },
      { id: 'B', label: 'A wins PA, MI, GA → 256 EVs → loses.', isCorrect: false },
      { id: 'C', label: 'A only wins PA → 245 EVs → loses.', isCorrect: false },
      { id: 'D', label: 'A wins all three but only reaches 270 exactly.', isCorrect: false },
    ],
    explanation:
      '226 + 19 + 15 + 16 = 276 electoral votes — over the 270 threshold, so Cand. A wins.',
  },
];
