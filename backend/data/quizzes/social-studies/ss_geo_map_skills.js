/**
 * Map & Data Skills
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    challenge_tags: ['math-6'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Monthly Rainfall in Springfield (Inches)</b><br><table class="w-full text-left mt-2"><thead><tr><th class="p-2 border-b">Month</th><th class="p-2 border-b">Rainfall</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Jan</td><td class="p-2">3</td></tr><tr class="border-b"><td class="p-2">Feb</td><td class="p-2">2</td></tr><tr class="border-b"><td class="p-2">Mar</td><td class="p-2">4</td></tr><tr class="border-b"><td class="p-2">Apr</td><td class="p-2">4</td></tr><tr class="border-b"><td class="p-2">May</td><td class="p-2">5</td></tr></tbody></table></div>',
    question:
      'What is the mean (average) monthly rainfall for the period shown in the chart?',
    answerOptions: [
      {
        text: '3.6 inches',
        rationale:
          'Correct. To find the mean, add the values (3 + 2 + 4 + 4 + 5 = 18) and divide by the number of values (5). 18 / 5 = 3.6.',
        isCorrect: true,
      },
      {
        text: '4 inches',
        rationale:
          '4 is the mode (most frequent value) and the median, but not the mean.',
        isCorrect: false,
      },
      {
        text: '5 inches',
        rationale: '5 is the maximum rainfall in a single month.',
        isCorrect: false,
      },
      {
        text: '18 inches',
        rationale: '18 is the total rainfall, not the average.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    challenge_tags: ['math-6'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Monthly Rainfall in Springfield (Inches)</b><br><table class="w-full text-left mt-2"><thead><tr><th class="p-2 border-b">Month</th><th class="p-2 border-b">Rainfall</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Jan</td><td class="p-2">3</td></tr><tr class="border-b"><td class="p-2">Feb</td><td class="p-2">2</td></tr><tr class="border-b"><td class="p-2">Mar</td><td class="p-2">4</td></tr><tr class="border-b"><td class="p-2">Apr</td><td class="p-2">4</td></tr><tr class="border-b"><td class="p-2">May</td><td class="p-2">5</td></tr></tbody></table></div>',
    question: 'What is the median rainfall for the period shown in the chart?',
    answerOptions: [
      {
        text: '2 inches',
        rationale: '2 is the minimum value.',
        isCorrect: false,
      },
      {
        text: '3.6 inches',
        rationale: 'This is the mean, not the median.',
        isCorrect: false,
      },
      {
        text: '4 inches',
        rationale:
          'Correct. To find the median, first order the numbers: 2, 3, 4, 4, 5. The median is the middle value, which is 4.',
        isCorrect: true,
      },
      {
        text: '5 inches',
        rationale: '5 is the maximum value.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    challenge_tags: ['math-6', 'science-1'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Monthly Rainfall in Springfield (Inches)</b><br><table class="w-full text-left mt-2"><thead><tr><th class="p-2 border-b">Month</th><th class="p-2 border-b">Rainfall</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Jan</td><td class="p-2">3</td></tr><tr class="border-b"><td class="p-2">Feb</td><td class="p-2">2</td></tr><tr class="border-b"><td class="p-2">Mar</td><td class="p-2">4</td></tr><tr class="border-b"><td class="p-2">Apr</td><td class="p-2">4</td></tr><tr class="border-b"><td class="p-2">May</td><td class="p-2">5</td></tr></tbody></table></div>',
    question: 'What is the mode of the rainfall data shown in the chart?',
    answerOptions: [
      {
        text: '3 inches',
        rationale: '3 appears only once.',
        isCorrect: false,
      },
      {
        text: '3.6 inches',
        rationale: 'This is the mean.',
        isCorrect: false,
      },
      {
        text: '4 inches',
        rationale:
          'Correct. The mode is the value that appears most frequently in a data set. The number 4 appears twice, more than any other value.',
        isCorrect: true,
      },
      {
        text: '5 inches',
        rationale: '5 appears only once.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    challenge_tags: ['social-2'],
    type: 'image',
    imageUrl: 'Images/Social Studies/political-map-of-world.jpg',
    question:
      'This world map shows Gross Domestic Product (GDP) per capita, with darker colors representing higher GDP per capita. According to the map, which of these regions generally has the highest GDP per capita?',
    answerOptions: [
      {
        text: 'Central Africa',
        rationale:
          'Central Africa is shown in the lightest shades, indicating lower GDP per capita.',
        isCorrect: false,
      },
      {
        text: 'South America',
        rationale: 'South America is shown in light to medium shades.',
        isCorrect: false,
      },
      {
        text: 'North America and Western Europe',
        rationale:
          'Correct. The United States, Canada, and countries in Western Europe are shown in the darkest shades, indicating the highest GDP per capita.',
        isCorrect: true,
      },
      {
        text: 'Southeast Asia',
        rationale: 'Southeast Asia is shown in lighter shades.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'image',
    imageUrl: 'Images/Social Studies/political-map-of-world.jpg',
    question:
      "Based on the map's key, which shows that darker colors represent higher GDP per capita, what can be inferred about the economic status of Australia?",
    answerOptions: [
      {
        text: 'It has one of the lowest GDPs per capita in the world.',
        rationale: 'Australia is shown in one of the darkest shades.',
        isCorrect: false,
      },
      {
        text: 'It has a GDP per capita comparable to that of Western Europe and North America.',
        rationale:
          'Correct. Australia is shaded with the same dark color as the United States, Canada, and Western European countries, indicating a similar high level of GDP per capita.',
        isCorrect: true,
      },
      {
        text: 'It has a GDP per capita similar to that of most countries in Africa.',
        rationale:
          'Most countries in Africa are shown in the lightest shades, indicating much lower GDP per capita.',
        isCorrect: false,
      },
      {
        text: "The map does not provide enough information to determine Australia's economic status.",
        rationale:
          'The map clearly shows Australia and provides a key for interpretation.',
        isCorrect: false,
      },
    ],
    challenge_tags: ['social-5'],
  },
  {
    questionNumber: 8,
    challenge_tags: ['math-6', 'science-1'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Company Profits (in millions)</b><br><img src="Images/World energy consuption line graph.png" alt="A line graph showing profits over time. 2016: $1.5M, 2017: $1.8M, 2018: $1.7M, 2019: $2.1M, 2020: $2.5M" class="bg-white p-2 rounded"></div>',
    question:
      "According to the line graph, in which year did the company's profits decrease compared to the previous year?",
    answerOptions: [
      {
        text: '2017',
        rationale: 'In 2017, profits increased from $1.5M to $1.8M.',
        isCorrect: false,
      },
      {
        text: '2018',
        rationale:
          'Correct. In 2018, profits fell to $1.7M from $1.8M in 2017.',
        isCorrect: true,
      },
      {
        text: '2019',
        rationale: 'In 2019, profits increased from $1.7M to $2.1M.',
        isCorrect: false,
      },
      {
        text: '2020',
        rationale: 'In 2020, profits increased from $2.1M to $2.5M.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 9,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Company Profits (in millions)</b><br><img src="Images/World energy consuption line graph.png" alt="A line graph showing profits over time. 2016: $1.5M, 2017: $1.8M, 2018: $1.7M, 2019: $2.1M, 2020: $2.5M" class="bg-white p-2 rounded"></div>',
    question:
      'What was the approximate total profit for the company over the 5-year period shown?',
    answerOptions: [
      {
        text: '$2.5 million',
        rationale: 'This was the profit for 2020 alone.',
        isCorrect: false,
      },
      {
        text: '$5.3 million',
        rationale: 'This is an incorrect sum.',
        isCorrect: false,
      },
      {
        text: '$9.6 million',
        rationale:
          'Correct. Adding the approximate profits for each year: 1.5 + 1.8 + 1.7 + 2.1 + 2.5 = 9.6.',
        isCorrect: true,
      },
      {
        text: '$1.92 million',
        rationale: 'This is the mean (average) profit, not the total.',
        isCorrect: false,
      },
    ],
    challenge_tags: ['social-5'],
  },
  {
    questionNumber: 10,
    challenge_tags: ['social-1'],
    type: 'image',
    imageUrl: 'Images/Social Studies/licensed-image (16).jpg',
    question:
      'This is a political map of South America. Which country is located on the west coast of the continent, bordering Peru, Bolivia, and Argentina?',
    answerOptions: [
      {
        text: 'Brazil',
        rationale: 'Brazil is the largest country, located on the east coast.',
        isCorrect: false,
      },
      {
        text: 'Colombia',
        rationale:
          'Colombia is in the northwest, bordering Peru but not Bolivia or Argentina.',
        isCorrect: false,
      },
      {
        text: 'Chile',
        rationale:
          'Correct. The map shows Chile as a long, narrow country on the west coast, with borders matching the description.',
        isCorrect: true,
      },
      {
        text: 'Venezuela',
        rationale: 'Venezuela is on the northern coast of the continent.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 11,
    type: 'image',
    imageUrl: 'Images/Social Studies/licensed-image (16).jpg',
    question:
      "Using the map's scale of miles, the approximate distance from the capital of Colombia (Bogotá) to the capital of Venezuela (Caracas) is:",
    answerOptions: [
      {
        text: 'About 100 miles',
        rationale: 'This distance is significantly underestimated.',
        isCorrect: false,
      },
      {
        text: 'About 600 miles',
        rationale:
          'Correct. By visually applying the map scale, the distance between the two capitals is approximately 600 miles.',
        isCorrect: true,
      },
      {
        text: 'About 1,500 miles',
        rationale: 'This distance is significantly overestimated.',
        isCorrect: false,
      },
      {
        text: 'About 2,000 miles',
        rationale: 'This is a vast overestimation.',
        isCorrect: false,
      },
    ],
    challenge_tags: ['social-5'],
  },
  {
    questionNumber: 12,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Test Scores for a Class of 7 Students</b><br>The test scores are: 72, 85, 88, 90, 91, 91, 99</div>',
    question: 'What is the mode of the test scores?',
    answerOptions: [
      {
        text: '88',
        rationale: 'This is the median score.',
        isCorrect: false,
      },
      {
        text: '88._14',
        rationale: 'This is the mean (average) score.',
        isCorrect: false,
      },
      {
        text: '91',
        rationale:
          'Correct. The mode is the value that appears most often. The score 91 appears twice, while all other scores appear only once.',
        isCorrect: true,
      },
      {
        text: '27',
        rationale: 'This is the range (99 - 72), not the mode.',
        isCorrect: false,
      },
    ],
    challenge_tags: ['social-5'],
  },
  {
    questionNumber: 13,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Test Scores for a Class of 7 Students</b><br>The test scores are: 72, 85, 88, 90, 91, 91, 99</div>',
    question: 'What is the median of the test scores?',
    answerOptions: [
      {
        text: '90',
        rationale: '90 is one of the scores, but not the middle one.',
        isCorrect: false,
      },
      {
        text: '91',
        rationale: '91 is the mode, not the median.',
        isCorrect: false,
      },
      {
        text: '88',
        rationale:
          'Correct. The scores are already in order. The median is the middle value in a data set. In this set of 7 scores, the 4th score is the middle one.',
        isCorrect: true,
      },
      {
        text: '88.14',
        rationale: 'This is the mean (average) score.',
        isCorrect: false,
      },
    ],
    challenge_tags: ['social-5'],
  },
  {
    questionNumber: 14,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Test Scores for a Class of 7 Students</b><br>The test scores are: 72, 85, 88, 90, 91, 91, 99</div>',
    question: 'What is the range of the test scores?',
    answerOptions: [
      {
        text: '99',
        rationale: '99 is the highest score, not the range.',
        isCorrect: false,
      },
      {
        text: '72',
        rationale: '72 is the lowest score, not the range.',
        isCorrect: false,
      },
      {
        text: '27',
        rationale:
          'Correct. The range is the difference between the highest value and the lowest value in a data set (99 - 72 = 27).',
        isCorrect: true,
      },
      {
        text: '16',
        rationale:
          'This is the difference between the median and the lowest score.',
        isCorrect: false,
      },
    ],
    challenge_tags: ['social-5'],
  },
  {
    questionNumber: 15,
    challenge_tags: ['rla-7'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Household Budget (Total: $3,000/month)</b><br><img src="Images/035fa172-2083-4c13-9485-a5f4bfa28340.png" alt="A pie chart showing a budget. Housing: 35%, Transportation: 15%, Food: 20%, Savings: 10%, Utilities: 5%, Other: 15%" class="bg-white p-2 rounded"></div>',
    question:
      'According to the pie chart, how much money is allocated to Housing each month?',
    answerOptions: [
      {
        text: '$700',
        rationale: 'This would be approximately 23%.',
        isCorrect: false,
      },
      {
        text: '$1,050',
        rationale:
          'Correct. Housing accounts for 35% of the budget. 35% of $3,000 is (0.35 * 3000), which equals $1,050.',
        isCorrect: true,
      },
      {
        text: '$600',
        rationale: 'This is 20% of the budget, the amount for Food.',
        isCorrect: false,
      },
      {
        text: '$300',
        rationale: 'This is 10% of the budget, the amount for Savings.',
        isCorrect: false,
      },
    ],
  },
];
