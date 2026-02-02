/**
 * Quantitative Problem Solving - Interpreting Bar Graphs
 * Extracted from Social Studies "Map & Data Skills" (ss_geo_map_skills)
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Favorite Pizza Toppings of 100 Students</b><br><img src="//images/Math/interpreting_bar_graphs_0001.png" alt="A bar chart showing pizza topping preferences. Pepperoni is at 45, Mushrooms at 20, Onions at 15, Sausage at 12, and Olives at 8." class="bg-white p-2 rounded"></div>',
    question: 'How many more students chose Pepperoni than chose Sausage?',
    answerOptions: [
      {
        text: '25',
        rationale:
          'This is the difference between Pepperoni (45) and Mushrooms (20).',
        isCorrect: false,
      },
      {
        text: '30',
        rationale:
          'This is the difference between Pepperoni (45) and Onions (15).',
        isCorrect: false,
      },
      {
        text: '33',
        rationale:
          'Correct. Pepperoni received 45 votes and Sausage received 12 votes. 45 - 12 = 33.',
        isCorrect: true,
      },
      {
        text: '37',
        rationale:
          'This is the difference between Pepperoni (45) and Olives (8).',
        isCorrect: false,
      },
    ],
  },
];
