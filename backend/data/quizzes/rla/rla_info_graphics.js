/**
 * Interpreting Graphics
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    challenge_tags: ['rla-7'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src="/images/RLA/interpreting_graphics_0003_0001.png" alt="A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 65%, China: 23%, Yugoslavia: 3%, United States: 2%, United Kingdom: 2%, France: 1%, Poland: 1%, Others: 3%." class="bg-white p-2 rounded"></div>',
    question:
      'According to the pie chart, which two Allied nations suffered the highest number of military deaths in World War II?',
    answerOptions: [
      {
        text: 'The Soviet Union and China',
        rationale:
          'Correct. The chart shows the Soviet Union and China with the two largest percentages of military deaths among the Allies.',
        isCorrect: true,
      },
      {
        text: 'The United States and the United Kingdom',
        rationale:
          'The chart shows the U.S. and U.K. with relatively small percentages compared to the Soviet Union and China.',
        isCorrect: false,
      },
      {
        text: 'China and the United States',
        rationale:
          "While China's losses were very high, the U.S. losses were significantly smaller.",
        isCorrect: false,
      },
      {
        text: 'The Soviet Union and the United Kingdom',
        rationale:
          "While the Soviet Union's losses were the highest, the U.K.'s were much smaller.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    challenge_tags: ['math-1'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src="/images/RLA/interpreting_graphics_0003_0001.png" alt="A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 65%, China: 23%, Yugoslavia: 3%, United States: 2%, United Kingdom: 2%, France: 1%, Poland: 1%, Others: 3%." class="bg-white p-2 rounded"></div>',
    question:
      'The combined military deaths of the United States and the United Kingdom make up approximately what percentage of the total Allied deaths shown?',
    answerOptions: [
      {
        text: '2%',
        rationale:
          'This is the approximate percentage for each country individually, not combined.',
        isCorrect: false,
      },
      {
        text: '4%',
        rationale:
          'Correct. The chart shows the U.S. at 2% and the U.K. at 2%, for a combined total of 4%.',
        isCorrect: true,
      },
      {
        text: '23%',
        rationale: 'This is the approximate percentage for China alone.',
        isCorrect: false,
      },
      {
        text: '65%',
        rationale:
          'This is the approximate percentage for the Soviet Union alone.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src="/images/RLA/interpreting_graphics_0003_0001.png" alt="A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 65%, China: 23%, Yugoslavia: 3%, United States: 2%, United Kingdom: 2%, France: 1%, Poland: 1%, Others: 3%." class="bg-white p-2 rounded"></div>',
    question:
      'What can be inferred from the pie chart about the human cost of World War II for the Soviet Union?',
    answerOptions: [
      {
        text: 'It was minimal compared to other Allies.',
        rationale:
          'The chart shows the Soviet Union had the highest proportion of deaths by a large margin.',
        isCorrect: false,
      },
      {
        text: 'It was immense, accounting for nearly two-thirds of all Allied military deaths shown.',
        rationale:
          "Correct. The Soviet Union's slice of the pie is 65%, which is nearly two-thirds, indicating a staggering human cost.",
        isCorrect: true,
      },
      {
        text: 'It was less than the combined losses of the United States and the United Kingdom.',
        rationale:
          'It was significantly greater than the combined losses of the U.S. and U.K.',
        isCorrect: false,
      },
      {
        text: 'It was roughly equal to the losses of China.',
        rationale:
          "The chart shows the Soviet Union's losses were nearly three times those of China.",
        isCorrect: false,
      },
    ],
    challenge_tags: ['rla-3'],
  },
  {
    questionNumber: 4,
    challenge_tags: ['rla-7'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Electricity Consumption by Sector</b><br><table class="w-full text-left mt-2 bg-white"><thead><tr><th class="p-2 border-b">Sector</th><th class="p-2 border-b">Percentage</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Industrial</td><td class="p-2">40%</td></tr><tr class="border-b"><td class="p-2">Residential</td><td class="p-2">35%</td></tr><tr class="border-b"><td class="p-2">Commercial</td><td class="p-2">24%</td></tr><tr class="border-b"><td class="p-2">Transportation</td><td class="p-2">1%</td></tr></tbody></table></div>',
    question:
      'Which sector is the largest consumer of electricity according to the data?',
    answerOptions: [
      {
        text: 'Residential',
        isCorrect: false,
        rationale:
          'Incorrect. The table shows Residential at 35%, which is below the Industrial sector’s 40%.',
      },
      {
        text: 'Commercial',
        isCorrect: false,
        rationale:
          'Incorrect. The Commercial sector accounts for less than the Industrial sector in the table; Industrial is the largest at 40%.',
      },
      {
        text: 'Transportation',
        isCorrect: false,
        rationale:
          'Incorrect. The table lists Transportation as one of the smallest shares of electricity use, not the largest.',
      },
      {
        text: 'Industrial',
        isCorrect: true,
        rationale:
          'Correct. The table lists the Industrial sector at 40%, the largest share of any sector listed and therefore the largest consumer of electricity.',
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Electricity Consumption by Sector</b><br><table class="w-full text-left mt-2 bg-white"><thead><tr><th class="p-2 border-b">Sector</th><th class="p-2 border-b">Percentage</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Industrial</td><td class="p-2">40%</td></tr><tr class="border-b"><td class="p-2">Residential</td><td class="p-2">35%</td></tr><tr class="border-b"><td class="p-2">Commercial</td><td class="p-2">24%</td></tr><tr class="border-b"><td class="p-2">Transportation</td><td class="p-2">1%</td></tr></tbody></table></div>',
    question:
      'What is the combined percentage of electricity consumed by the Residential and Commercial sectors?',
    answerOptions: [
      {
        text: '40%',
        isCorrect: false,
        rationale:
          '"40%" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: '59%',
        isCorrect: true,
        rationale:
          'Correct because the residential sector consumes 38% of electricity and the commercial sector consumes 21%, which combine to 38% + 21% = 59%.',
      },
      {
        text: '75%',
        isCorrect: false,
        rationale:
          '"75%" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: '99%',
        isCorrect: false,
        rationale:
          '"99%" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
    ],
    challenge_tags: ['rla-3'],
  },
  {
    questionNumber: 6,
    challenge_tags: ['rla-3'],
    type: 'multi-source',
    passage:
      '<div class="passage-text">Refer to the "Electricity Consumption by Sector" table.<br><br><table class="w-full text-left mt-2 bg-white"><thead><tr><th class="p-2 border-b">Sector</th><th class="p-2 border-b">Percentage</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Industrial</td><td class="p-2">40%</td></tr><tr class="border-b"><td class="p-2">Residential</td><td class="p-2">35%</td></tr><tr class="border-b"><td class="p-2">Commercial</td><td class="p-2">24%</td></tr><tr class="border-b"><td class="p-2">Transportation</td><td class="p-2">1%</td></tr></tbody></table><br>Note: Electricity use for transportation is expected to grow significantly with the adoption of electric vehicles.</div>',
    question:
      'Based on the table, why would growth in transportation electricity use be significant?',
    answerOptions: [
      {
        text: 'Because transportation already uses the most electricity.',
        isCorrect: false,
        rationale:
          'Incorrect. The table shows transportation as one of the smallest electricity consumers, not the largest, so this premise is wrong.',
      },
      {
        text: 'Because transportation currently represents a very small fraction of electricity use, so any growth will be a large relative change.',
        isCorrect: true,
        rationale:
          'Correct. Because transportation starts from a very small share in the table, even a modest absolute increase represents a large percentage growth — which is why a shift toward electric vehicles would be especially noteworthy.',
      },
      {
        text: "Because the industrial sector's electricity use is declining rapidly.",
        isCorrect: false,
        rationale:
          'Incorrect. The table provides only current shares; it does not show trends over time and gives no evidence that industrial electricity use is declining.',
      },
      {
        text: 'Because transportation is the only sector where electricity use is measured.',
        isCorrect: false,
        rationale:
          'Incorrect. The table reports electricity use for multiple sectors, including Industrial, Residential, and Commercial — not just transportation.',
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Average Test Scores by Subject</b><br><table class="w-full text-left mt-2"><thead><tr><th class="p-2 border-b">Subject</th><th class="p-2 border-b">Score</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Math</td><td class="p-2">82</td></tr><tr class="border-b"><td class="p-2">Reading</td><td class="p-2">88</td></tr><tr class="border-b"><td class="p-2">Science</td><td class="p-2">85</td></tr><tr class="border-b"><td class="p-2">Social Studies</td><td class="p-2">83</td></tr></tbody></table></div>',
    question: 'Which subject has the highest average test score?',
    answerOptions: [
      {
        text: 'Math',
        isCorrect: false,
        rationale:
          'Incorrect. The table shows Math at 82, lower than Reading’s 88, so Math is not the highest.',
      },
      {
        text: 'Reading',
        isCorrect: true,
        rationale:
          'Correct. The table lists Reading at 88, which is the highest score among the four subjects shown.',
      },
      {
        text: 'Science',
        isCorrect: false,
        rationale:
          'Incorrect. The Science score in the table is below Reading’s 88, so it is not the highest.',
      },
      {
        text: 'Social Studies',
        isCorrect: false,
        rationale:
          'Incorrect. The Social Studies score in the table is lower than Reading’s 88, so it is not the highest.',
      },
    ],
    challenge_tags: ['rla-3'],
  },
  {
    questionNumber: 8,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Average Test Scores by Subject</b><br><table class="w-full text-left mt-2"><thead><tr><th class="p-2 border-b">Subject</th><th class="p-2 border-b">Score</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Math</td><td class="p-2">82</td></tr><tr class="border-b"><td class="p-2">Reading</td><td class="p-2">88</td></tr><tr class="border-b"><td class="p-2">Science</td><td class="p-2">85</td></tr><tr class="border-b"><td class="p-2">Social Studies</td><td class="p-2">83</td></tr></tbody></table></div>',
    question: 'What is the range of the average test scores?',
    answerOptions: [
      {
        text: '6',
        isCorrect: true,
        rationale:
          'Correct. The range is the highest score minus the lowest score: 88 (Reading) − 82 (Math) = 6.',
      },
      {
        text: '82',
        isCorrect: false,
        rationale:
          '82 is the lowest score (Math), not the range. The range is the difference between the highest and lowest values.',
      },
      {
        text: '84.5',
        isCorrect: false,
        rationale:
          '84.5 is the mean of the four scores (82 + 88 + 85 + 83 = 338, ÷ 4 = 84.5), not the range.',
      },
      {
        text: '88',
        isCorrect: false,
        rationale:
          '88 is the highest score (Reading), not the range. The range is the highest minus the lowest.',
      },
    ],
    challenge_tags: ['rla-3'],
  },
  {
    questionNumber: 9,
    challenge_tags: ['social-3'],
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Projected Population Growth of City X</b><br><table class="w-full text-left mt-2 bg-white"><thead><tr><th class="p-2 border-b">Year</th><th class="p-2 border-b">Population</th></tr></thead><tbody><tr class="border-b"><td class="p-2">2020</td><td class="p-2">100,000</td></tr><tr class="border-b"><td class="p-2">2025</td><td class="p-2">110,000</td></tr><tr class="border-b"><td class="p-2">2030</td><td class="p-2">125,000</td></tr><tr class="border-b"><td class="p-2">2035</td><td class="p-2">145,000</td></tr><tr class="border-b"><td class="p-2">2040</td><td class="p-2">170,000</td></tr></tbody></table></div>',
    question:
      'During which 5-year period is the population of City X projected to grow the most?',
    answerOptions: [
      {
        text: '2020-2025',
        isCorrect: false,
        rationale:
          '"2020-2025" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: '2025-2030',
        isCorrect: false,
        rationale:
          '"2025-2030" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: '2030-2035',
        isCorrect: false,
        rationale:
          '"2030-2035" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: '2035-2040',
        isCorrect: true,
        rationale:
          'Correct because the chart shows the largest five-year increase in City X’s projected population occurs between 2035 and 2040, which is the period of greatest growth.',
      },
    ],
  },
  {
    questionNumber: 10,
    type: 'chart',
    passage:
      '<div class="passage-text"><b>Projected Population Growth of City X</b><br><table class="w-full text-left mt-2 bg-white"><thead><tr><th class="p-2 border-b">Year</th><th class="p-2 border-b">Population</th></tr></thead><tbody><tr class="border-b"><td class="p-2">2020</td><td class="p-2">100,000</td></tr><tr class="border-b"><td class="p-2">2025</td><td class="p-2">110,000</td></tr><tr class="border-b"><td class="p-2">2030</td><td class="p-2">125,000</td></tr><tr class="border-b"><td class="p-2">2035</td><td class="p-2">145,000</td></tr><tr class="border-b"><td class="p-2">2040</td><td class="p-2">170,000</td></tr></tbody></table></div>',
    question: 'What is the overall trend shown in the data?',
    answerOptions: [
      {
        text: 'The population is projected to decrease over time.',
        isCorrect: false,
        rationale:
          'Incorrect. The numbers in the table rise from 100,000 in 2020 to higher figures in later years, so the population is growing, not decreasing.',
      },
      {
        text: 'The population is projected to grow at a steady, constant rate.',
        isCorrect: false,
        rationale:
          'Incorrect. The increase between successive years gets larger over time, indicating accelerating (not constant) growth.',
      },
      {
        text: 'The population is projected to grow at an accelerating rate.',
        isCorrect: true,
        rationale:
          'Correct. Successive five-year increases in the table get larger over time (e.g., +10,000 then +15,000 then +20,000…), which is the defining pattern of accelerating growth.',
      },
      {
        text: 'The population is projected to remain stable after 2030.',
        isCorrect: false,
        rationale:
          'Incorrect. The table shows population values continuing to rise after 2030, not leveling off.',
      },
    ],
    challenge_tags: ['rla-3'],
  },
  {
    questionNumber: 11,
    type: 'knowledge',
    question: 'What is the primary purpose of a map key or legend?',
    answerOptions: [
      {
        text: 'To show the title of the map.',
        isCorrect: false,
        rationale:
          '"To show the title of the map." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'To explain the meaning of the symbols and colors used on the map.',
        isCorrect: true,
        rationale:
          'To explain the meaning of the symbols and colors used on the map.',
      },
      {
        text: 'To indicate the scale or distance.',
        isCorrect: false,
        rationale:
          '"To indicate the scale or distance." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'To show the direction of North.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
    ],
    challenge_tags: ['rla-3'],
  },
  {
    questionNumber: 12,
    challenge_tags: ['social-1'],
    type: 'knowledge',
    question: 'A political map is a type of map that primarily shows:',
    answerOptions: [
      {
        text: 'Physical features like mountains and rivers.',
        isCorrect: false,
        rationale:
          '"Physical features like mountains and rivers." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'Climate zones and vegetation.',
        isCorrect: false,
        rationale:
          '"Climate zones and vegetation." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'The boundaries of countries, states, and cities.',
        isCorrect: true,
        rationale: 'The boundaries of countries, states, and cities.',
      },
      {
        text: 'Population density.',
        isCorrect: false,
        rationale:
          '"Population density." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
    ],
  },
  {
    questionNumber: 13,
    type: 'knowledge',
    question: "On a map, what does the scale '1 inch = 100 miles' mean?",
    answerOptions: [
      {
        text: 'The map is 100 miles wide.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'Every inch on the map represents 100 miles in the real world.',
        isCorrect: true,
        rationale:
          'Every inch on the map represents 100 miles in the real world.',
      },
      {
        text: 'The map is not accurate.',
        isCorrect: false,
        rationale:
          '"The map is not accurate." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'Every 100 inches on the map represents 1 mile in the real world.',
        isCorrect: false,
        rationale:
          '"Every 100 inches on the map represents 1 mile in the real world." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
    ],
    challenge_tags: ['rla-3'],
  },
  {
    questionNumber: 14,
    type: 'knowledge',
    question: 'A bar chart is most effective for:',
    answerOptions: [
      {
        text: 'Showing a trend over a continuous period of time.',
        isCorrect: false,
        rationale:
          'Incorrect. Continuous trends over time are best displayed with line graphs; bar charts are better for comparing distinct categories.',
      },
      {
        text: 'Comparing distinct categories or groups.',
        isCorrect: true,
        rationale:
          'Correct. Bar charts are designed to compare values across discrete categories — for example, sales by region or scores by subject — by lining up bars of differing heights.',
      },
      {
        text: 'Showing the parts of a whole or percentages.',
        isCorrect: false,
        rationale:
          'Incorrect. Parts-of-a-whole relationships are best shown with pie charts (or stacked bars), not standard bar charts comparing categories side by side.',
      },
      {
        text: 'Displaying the exact location of geographical features.',
        isCorrect: false,
        rationale:
          'Incorrect. Geographical locations are shown on maps; bar charts cannot represent spatial position.',
      },
    ],
    challenge_tags: ['rla-3'],
  },
  {
    questionNumber: 15,
    type: 'knowledge',
    question: 'A pie chart is most effective for:',
    answerOptions: [
      {
        text: 'Showing a trend over a continuous period of time.',
        isCorrect: false,
        rationale:
          'Incorrect. Pie charts capture proportions at a single point in time; trends over time are better shown with line graphs.',
      },
      {
        text: 'Comparing distinct categories or groups.',
        isCorrect: false,
        rationale:
          'Incorrect. Direct category-to-category comparison is easier with bar charts; pie charts compare slices to the whole rather than to each other precisely.',
      },
      {
        text: 'Showing the parts of a whole or percentages.',
        isCorrect: true,
        rationale:
          'Correct. Pie charts divide a circle into slices that visually represent each category’s share of the total, making them ideal for showing how 100% of a quantity is distributed.',
      },
      {
        text: 'Displaying the exact location of geographical features.',
        isCorrect: false,
        rationale:
          'Incorrect. Geographical positions are shown on maps; pie charts represent proportions, not spatial locations.',
      },
    ],
    challenge_tags: ['rla-3'],
  },
];
