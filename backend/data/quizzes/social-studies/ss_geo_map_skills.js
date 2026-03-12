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
    imageUrl: '/images/Social%20Studies/map_and_data_skills_0003.jpg',
    question:
      'This political world map shows continents and national borders. According to the map, which of these countries is located in South America?',
    answerOptions: [
      {
        text: 'Brazil',
        rationale:
          'Correct. Brazil is labeled in eastern South America on the map.',
        isCorrect: true,
      },
      {
        text: 'India',
        rationale: 'India is located in South Asia, not South America.',
        isCorrect: false,
      },
      {
        text: 'Egypt',
        rationale: 'Egypt is located in northeastern Africa.',
        isCorrect: false,
      },
      {
        text: 'Spain',
        rationale: 'Spain is located in southwestern Europe.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'image',
    imageUrl: '/images/Social%20Studies/map_and_data_skills_0003.jpg',
    question: 'According to the map, Australia is part of which world region?',
    answerOptions: [
      {
        text: 'Europe',
        rationale: 'Australia is not part of Europe.',
        isCorrect: false,
      },
      {
        text: 'Oceania',
        rationale:
          'Correct. Australia is located in the Oceania region on the world map.',
        isCorrect: true,
      },
      {
        text: 'South America',
        rationale: 'Australia is southeast of Asia, not in South America.',
        isCorrect: false,
      },
      {
        text: 'North America',
        rationale:
          'North America includes countries such as the United States and Canada.',
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
      '<div class="passage-text"><b>Company Profits (in millions)</b><br><img src="/images/Social%20Studies/map_and_data_skills_0004.png" alt="A line graph showing profits over time. 2016: \(1.5M, 2017: \)1.8M, 2018: \(1.7M, 2019: \)2.1M, 2020: \(2.5M" class="bg-white p-2 rounded"></div>',
    question:
      "According to the line graph, in which year did the company's profits decrease compared to the previous year?",
    answerOptions: [
      {
        text: '2017',
        rationale: 'In 2017, profits increased from \)1.5M to \(1.8M.',
        isCorrect: false,
      },
      {
        text: '2018',
        rationale:
          'Correct. In 2018, profits fell to \)1.7M from \(1.8M in 2017.',
        isCorrect: true,
      },
      {
        text: '2019',
        rationale: 'In 2019, profits increased from \)1.7M to \(2.1M.',
        isCorrect: false,
      },
      {
        text: '2020',
        rationale: 'In 2020, profits increased from \)2.1M to \(2.5M.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 9,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Company Profits (in millions)</b><br><img src="/images/Social%20Studies/map_and_data_skills_0004.png" alt="A line graph showing profits over time. 2016: \)1.5M, 2017: \(1.8M, 2018: \)1.7M, 2019: \(2.1M, 2020: \)2.5M" class="bg-white p-2 rounded"></div>',
    question:
      'What was the approximate total profit for the company over the 5-year period shown?',
    answerOptions: [
      {
        text: '\(2.5 million',
        rationale: 'This was the profit for 2020 alone.',
        isCorrect: false,
      },
      {
        text: '\)5.3 million',
        rationale: 'This is an incorrect sum.',
        isCorrect: false,
      },
      {
        text: '\(9.6 million',
        rationale:
          'Correct. Adding the approximate profits for each year: 1.5 + 1.8 + 1.7 + 2.1 + 2.5 = 9.6.',
        isCorrect: true,
      },
      {
        text: '\)1.92 million',
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
    imageUrl: '/images/Social%20Studies/map_and_data_skills_0002.jpg',
    question:
      'This historical map shows the Roman Empire at its greatest extent in 117 AD. Which city is marked as the capital of the empire?',
    answerOptions: [
      {
        text: 'Carthage',
        rationale:
          'Carthage was an important city in North Africa, but it is not marked as the capital.',
        isCorrect: false,
      },
      {
        text: 'Alexandria',
        rationale:
          'Alexandria was a major city in Egypt, but not the capital of the empire.',
        isCorrect: false,
      },
      {
        text: 'Roma',
        rationale:
          'Correct. The map labels Roma as the political center of the Roman Empire.',
        isCorrect: true,
      },
      {
        text: 'Athens',
        rationale:
          "Athens was a major Greek city, but it is not marked as the empire's capital.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 11,
    type: 'image',
    imageUrl: '/images/Social%20Studies/map_and_data_skills_0002.jpg',
    question:
      "Which body of water shown on the map borders much of the Roman Empire's territory in southern Europe and northern Africa?",
    answerOptions: [
      {
        text: 'The Atlantic Ocean',
        rationale:
          "The Atlantic Ocean is west of Iberia, but it does not border most of the empire's central lands.",
        isCorrect: false,
      },
      {
        text: 'The Mediterranean Sea',
        rationale:
          'Correct. The Mediterranean Sea, labeled on the map, touches large portions of southern Europe and northern Africa.',
        isCorrect: true,
      },
      {
        text: 'The North Sea',
        rationale:
          'The North Sea is not the central sea around which most Roman territory is shown.',
        isCorrect: false,
      },
      {
        text: 'The Black Sea only',
        rationale:
          "The Black Sea is shown, but it does not border most of the empire's territory.",
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
      '<div class="passage-text"><b>Household Budget (Total: \(3,000/month)</b><br><img src="/images/Social%20Studies/map_and_data_skills_0001.png" alt="A pie chart showing a budget. Housing: 35%, Transportation: 15%, Food: 20%, Savings: 10%, Utilities: 5%, Other: 15%" class="bg-white p-2 rounded"></div>',
    question:
      'According to the pie chart, how much money is allocated to Housing each month?',
    answerOptions: [
      {
        text: '\)700',
        rationale: 'This would be approximately 23%.',
        isCorrect: false,
      },
      {
        text: '\(1,050',
        rationale:
          'Correct. Housing accounts for 35% of the budget. 35% of \)3,000 is (0.35 * 3000), which equals \(1,050.',
        isCorrect: true,
      },
      {
        text: '\)600',
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
