/**
 * Interpreting Graphics
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    "questionNumber": 1,
    "challenge_tags": [
      "rla-7"
    ],
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src=\"Images/WorldWarII-MilitaryDeaths-Allies-Piechart.png\" alt=\"A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 48%, China: 22%, United States: 5%, United Kingdom: 5%, Other Allies: 20%.\" class=\"bg-white p-2 rounded\"></div>",
    "question": "According to the pie chart, which two Allied nations suffered the highest number of military deaths in World War II?",
    "answerOptions": [
      {
        "text": "The Soviet Union and China",
        "rationale": "Correct. The chart shows the Soviet Union and China with the two largest percentages of military deaths among the Allies.",
        "isCorrect": true
      },
      {
        "text": "The United States and the United Kingdom",
        "rationale": "The chart shows the U.S. and U.K. with relatively small percentages compared to the Soviet Union and China.",
        "isCorrect": false
      },
      {
        "text": "China and the United States",
        "rationale": "While China's losses were very high, the U.S. losses were significantly smaller.",
        "isCorrect": false
      },
      {
        "text": "The Soviet Union and the United Kingdom",
        "rationale": "While the Soviet Union's losses were the highest, the U.K.'s were much smaller.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "challenge_tags": [
      "math-1"
    ],
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src=\"Images/WorldWarII-MilitaryDeaths-Allies-Piechart.png\" alt=\"A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 48%, China: 22%, United States: 5%, United Kingdom: 5%, Other Allies: 20%.\" class=\"bg-white p-2 rounded\"></div>",
    "question": "The combined military deaths of the United States and the United Kingdom make up approximately what percentage of the total Allied deaths shown?",
    "answerOptions": [
      {
        "text": "5%",
        "rationale": "This is the approximate percentage for each country individually, not combined.",
        "isCorrect": false
      },
      {
        "text": "10%",
        "rationale": "Correct. The chart shows the U.S. at 5% and the U.K. at 5%, for a combined total of 10%.",
        "isCorrect": true
      },
      {
        "text": "22%",
        "rationale": "This is the approximate percentage for China alone.",
        "isCorrect": false
      },
      {
        "text": "48%",
        "rationale": "This is the approximate percentage for the Soviet Union alone.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src=\"Images/WorldWarII-MilitaryDeaths-Allies-Piechart.png\" alt=\"A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 48%, China: 22%, United States: 5%, United Kingdom: 5%, Other Allies: 20%.\" class=\"bg-white p-2 rounded\"></div>",
    "question": "What can be inferred from the pie chart about the human cost of World War II for the Soviet Union?",
    "answerOptions": [
      {
        "text": "It was minimal compared to other Allies.",
        "rationale": "The chart shows the Soviet Union had the highest proportion of deaths by a large margin.",
        "isCorrect": false
      },
      {
        "text": "It was immense, accounting for nearly half of all Allied military deaths shown.",
        "rationale": "Correct. The Soviet Union's slice of the pie is 48%, which is almost half, indicating a staggering human cost.",
        "isCorrect": true
      },
      {
        "text": "It was less than the combined losses of the United States and the United Kingdom.",
        "rationale": "It was significantly greater than the combined losses of the U.S. and U.K.",
        "isCorrect": false
      },
      {
        "text": "It was roughly equal to the losses of China.",
        "rationale": "The chart shows the Soviet Union's losses were more than double those of China.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  },
  {
    "questionNumber": 4,
    "challenge_tags": [
      "rla-7"
    ],
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Electricity Consumption by Sector</b><br><img src=\"Images/ged-grsph-1.png\" alt=\"A bar chart showing electricity consumption. Industrial: 40%, Residential: 35%, Commercial: 24%, Transportation: 1%.\" class=\"bg-white p-2 rounded\"></div>",
    "question": "Which sector is the largest consumer of electricity according to the bar chart?",
    "answerOptions": [
      {
        "text": "Residential",
        "isCorrect": false,
        "rationale": "This is not the correct answer based on the information provided."
      },
      {
        "text": "Commercial",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Review the passage carefully to find the correct information."
      },
      {
        "text": "Transportation",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "Industrial",
        "isCorrect": true,
        "rationale": "Industrial"
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Electricity Consumption by Sector</b><br><img src=\"Images/ged-grsph-1.png\" alt=\"A bar chart showing electricity consumption. Industrial: 40%, Residential: 35%, Commercial: 24%, Transportation: 1%.\" class=\"bg-white p-2 rounded\"></div>",
    "question": "What is the combined percentage of electricity consumed by the Residential and Commercial sectors?",
    "answerOptions": [
      {
        "text": "40%",
        "isCorrect": false,
        "rationale": "While this might seem plausible, it is not supported by the information given."
      },
      {
        "text": "59%",
        "isCorrect": true,
        "rationale": "59%"
      },
      {
        "text": "75%",
        "isCorrect": false,
        "rationale": "While this might seem plausible, it is not supported by the information given."
      },
      {
        "text": "99%",
        "isCorrect": false,
        "rationale": "While this might seem plausible, it is not supported by the information given."
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  },
  {
    "questionNumber": 6,
    "challenge_tags": [
      "rla-3"
    ],
    "type": "multi-source",
    "passage": "<div class=\"passage-text\">Refer to both the article text and the \"Electricity Consumption by Sector\" bar chart.</div><img src=\"Images/ged-grsph-1.png\" alt=\"A bar chart showing electricity consumption. Industrial: 40%, Residential: 35%, Commercial: 24%, Transportation: 1%.\" class=\"bg-white p-2 rounded\">",
    "question": "The article states that electricity use for transportation is expected to grow. Based on the chart, why would this growth be significant?",
    "answerOptions": [
      {
        "text": "Because transportation already uses the most electricity.",
        "isCorrect": false,
        "rationale": "This option does not accurately reflect the passage or question context."
      },
      {
        "text": "Because transportation currently represents a very small fraction of electricity use, so any growth will be a large relative change.",
        "isCorrect": true,
        "rationale": "Because transportation currently represents a very small fraction of electricity use, so any growth will be a large relative change."
      },
      {
        "text": "Because the industrial sector's electricity use is declining rapidly.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "Because transportation is the only sector where electricity use is measured.",
        "isCorrect": false,
        "rationale": "This is not the correct answer based on the information provided."
      }
    ]
  },
  {
    "questionNumber": 7,
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Average Test Scores by Subject</b><br><table class=\"w-full text-left mt-2\"><thead><tr><th class=\"p-2 border-b\">Subject</th><th class=\"p-2 border-b\">Score</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"p-2\">Math</td><td class=\"p-2\">82</td></tr><tr class=\"border-b\"><td class=\"p-2\">Reading</td><td class=\"p-2\">88</td></tr><tr class=\"border-b\"><td class=\"p-2\">Science</td><td class=\"p-2\">85</td></tr><tr class=\"border-b\"><td class=\"p-2\">Social Studies</td><td class=\"p-2\">83</td></tr></tbody></table></div>",
    "question": "Which subject has the highest average test score?",
    "answerOptions": [
      {
        "text": "Math",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "Reading",
        "isCorrect": true,
        "rationale": "Reading"
      },
      {
        "text": "Science",
        "isCorrect": false,
        "rationale": "This option does not accurately reflect the passage or question context."
      },
      {
        "text": "Social Studies",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  },
  {
    "questionNumber": 8,
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Average Test Scores by Subject</b><br><table class=\"w-full text-left mt-2\"><thead><tr><th class=\"p-2 border-b\">Subject</th><th class=\"p-2 border-b\">Score</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"p-2\">Math</td><td class=\"p-2\">82</td></tr><tr class=\"border-b\"><td class=\"p-2\">Reading</td><td class=\"p-2\">88</td></tr><tr class=\"border-b\"><td class=\"p-2\">Science</td><td class=\"p-2\">85</td></tr><tr class=\"border-b\"><td class=\"p-2\">Social Studies</td><td class=\"p-2\">83</td></tr></tbody></table></div>",
    "question": "What is the range of the average test scores?",
    "answerOptions": [
      {
        "text": "6",
        "isCorrect": true,
        "rationale": "6"
      },
      {
        "text": "82",
        "isCorrect": false,
        "rationale": "This option does not accurately reflect the passage or question context."
      },
      {
        "text": "84.5",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "88",
        "isCorrect": false,
        "rationale": "This option does not accurately reflect the passage or question context."
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  },
  {
    "questionNumber": 9,
    "challenge_tags": [
      "social-3"
    ],
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Projected Population Growth of City X</b><br><img src=\"Images/Questions-are-based-on-the-following-graph.-7.png\" alt=\"A line graph showing population over time. 2020: 100k, 2025: 110k, 2030: 125k, 2035: 145k, 2040: 170k.\" class=\"bg-white p-2 rounded\"></div>",
    "question": "During which 5-year period is the population of City X projected to grow the most?",
    "answerOptions": [
      {
        "text": "2020-2025",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "2025-2030",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "2030-2035",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "2035-2040",
        "isCorrect": true,
        "rationale": "2035-2040"
      }
    ]
  },
  {
    "questionNumber": 10,
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Projected Population Growth of City X</b><br><img src=\"Images/Questions-are-based-on-the-following-graph.-7.png\" alt=\"A line graph showing population over time. 2020: 100k, 2025: 110k, 2030: 125k, 2035: 145k, 2040: 170k.\" class=\"bg-white p-2 rounded\"></div>",
    "question": "What is the overall trend shown in the graph?",
    "answerOptions": [
      {
        "text": "The population is projected to decrease over time.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Review the passage carefully to find the correct information."
      },
      {
        "text": "The population is projected to grow at a steady, constant rate.",
        "isCorrect": false,
        "rationale": "While this might seem plausible, it is not supported by the information given."
      },
      {
        "text": "The population is projected to grow at an accelerating rate.",
        "isCorrect": true,
        "rationale": "The population is projected to grow at an accelerating rate."
      },
      {
        "text": "The population is projected to remain stable after 2030.",
        "isCorrect": false,
        "rationale": "This is not the correct answer based on the information provided."
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  },
  {
    "questionNumber": 11,
    "type": "knowledge",
    "question": "What is the primary purpose of a map key or legend?",
    "answerOptions": [
      {
        "text": "To show the title of the map.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "To explain the meaning of the symbols and colors used on the map.",
        "isCorrect": true,
        "rationale": "To explain the meaning of the symbols and colors used on the map."
      },
      {
        "text": "To indicate the scale or distance.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "To show the direction of North.",
        "isCorrect": false,
        "rationale": "This is not the correct answer based on the information provided."
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  },
  {
    "questionNumber": 12,
    "challenge_tags": [
      "social-1"
    ],
    "type": "knowledge",
    "question": "A political map is a type of map that primarily shows:",
    "answerOptions": [
      {
        "text": "Physical features like mountains and rivers.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "Climate zones and vegetation.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "The boundaries of countries, states, and cities.",
        "isCorrect": true,
        "rationale": "The boundaries of countries, states, and cities."
      },
      {
        "text": "Population density.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      }
    ]
  },
  {
    "questionNumber": 13,
    "type": "knowledge",
    "question": "On a map, what does the scale '1 inch = 100 miles' mean?",
    "answerOptions": [
      {
        "text": "The map is 100 miles wide.",
        "isCorrect": false,
        "rationale": "This is not the correct answer based on the information provided."
      },
      {
        "text": "Every inch on the map represents 100 miles in the real world.",
        "isCorrect": true,
        "rationale": "Every inch on the map represents 100 miles in the real world."
      },
      {
        "text": "The map is not accurate.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "Every 100 inches on the map represents 1 mile in the real world.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  },
  {
    "questionNumber": 14,
    "type": "knowledge",
    "question": "A bar chart is most effective for:",
    "answerOptions": [
      {
        "text": "Showing a trend over a continuous period of time.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "Comparing distinct categories or groups.",
        "isCorrect": true,
        "rationale": "Comparing distinct categories or groups."
      },
      {
        "text": "Showing the parts of a whole or percentages.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "Displaying the exact location of geographical features.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Review the passage carefully to find the correct information."
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  },
  {
    "questionNumber": 15,
    "type": "knowledge",
    "question": "A pie chart is most effective for:",
    "answerOptions": [
      {
        "text": "Showing a trend over a continuous period of time.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Consider the key details in the question."
      },
      {
        "text": "Comparing distinct categories or groups.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Review the passage carefully to find the correct information."
      },
      {
        "text": "Showing the parts of a whole or percentages.",
        "isCorrect": true,
        "rationale": "Showing the parts of a whole or percentages."
      },
      {
        "text": "Displaying the exact location of geographical features.",
        "isCorrect": false,
        "rationale": "This answer is incorrect. Review the passage carefully to find the correct information."
      }
    ],
    "challenge_tags": [
      "rla-3"
    ]
  }
];
