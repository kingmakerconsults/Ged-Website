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
];
