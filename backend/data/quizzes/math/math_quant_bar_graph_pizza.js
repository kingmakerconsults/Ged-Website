/**
 * Quantitative Problem Solving - Interpreting Bar Graphs
 * Extracted from Social Studies "Map & Data Skills" (ss_geo_map_skills)
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Favorite Pizza Toppings of 100 Students</b><br><img src="/images/social studies bar graph.png" alt="A bar chart showing pizza topping preferences. Pepperoni is at 45, Mushrooms at 20, Onions at 15, Sausage at 12, and Olives at 8." class="bg-white p-2 rounded"></div>',
    question:
      'According to the bar chart, which two toppings are the most popular?',
    answerOptions: [
      {
        text: 'Onions and Olives',
        rationale: 'These are two of the least popular toppings.',
        isCorrect: false,
      },
      {
        text: 'Pepperoni and Mushrooms',
        rationale:
          'Correct. Pepperoni is the most popular with 45 votes, and Mushrooms are the second most popular with 20 votes.',
        isCorrect: true,
      },
      {
        text: 'Sausage and Olives',
        rationale: 'These are the two least popular toppings.',
        isCorrect: false,
      },
      {
        text: 'Pepperoni and Sausage',
        rationale:
          'While Pepperoni is the most popular, Sausage is the fourth most popular.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Favorite Pizza Toppings of 100 Students</b><br><img src="/images/social studies bar graph.png" alt="A bar chart showing pizza topping preferences. Pepperoni is at 45, Mushrooms at 20, Onions at 15, Sausage at 12, and Olives at 8." class="bg-white p-2 rounded"></div>',
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
