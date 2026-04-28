/**
 * GED Ready-Style Data Interpretation & Scenario Questions
 * HTML tables, timelines, graphs described in text, and short scenarios.
 * Modeled after GED Ready® Social Studies exam format.
 */

module.exports = [
  {
    "questionNumber": 1,
    "type": "text",
    "difficulty": "medium",
    "topic": "Civics & Government",
    "contentArea": "data_interpretation",
    "passage": "This information is from the U.S. House of Representatives.\n\n<strong>U.S. Presidential Vetoes in the Late Twentieth Century</strong>\n<table><thead><tr><th>President</th><th>Terms in Office</th><th>Regular Vetoes</th><th>Pocket Vetoes</th><th>Total Vetoes</th><th>Overridden Vetoes</th></tr></thead><tbody><tr><td>James Earl Carter</td><td>1</td><td>13</td><td>18</td><td>31</td><td>2</td></tr><tr><td>Ronald Reagan</td><td>2</td><td>39</td><td>39</td><td>78</td><td>9</td></tr><tr><td>George H.W. Bush</td><td>1</td><td>29</td><td>15</td><td>44</td><td>1</td></tr><tr><td>William J. Clinton</td><td>2</td><td>36</td><td>1</td><td>37</td><td>2</td></tr></tbody></table>",
    "question": "Which statement is based on the information in the table?",
    "answerOptions": [
      {
        "text": "There were fewer pieces of legislation passed during President Carter's administration than during other presidencies of the era.",
        "rationale": "The table shows veto counts, not total legislation passed. Fewer vetoes does not necessarily mean fewer bills were enacted.",
        "isCorrect": false
      },
      {
        "text": "The veto process played a larger role in Ronald Reagan's presidency than it did in other presidencies of the era.",
        "rationale": "Correct. Reagan had the highest total vetoes (78) — more than double any other president listed — and the most overridden vetoes (9), indicating the veto process was used more extensively during his presidency.",
        "isCorrect": true
      },
      {
        "text": "Compared to other presidents of the era, George H.W. Bush had more members of his own party in Congress.",
        "rationale": "The table contains no information about party composition in Congress. This claim cannot be supported by the data presented.",
        "isCorrect": false
      },
      {
        "text": "Compared to other presidents of the era, President Clinton had a closer working relationship with Congress.",
        "rationale": "While Clinton had fewer total vetoes than Reagan, the table does not provide information about the quality of the presidential-congressional relationship.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "text",
    "difficulty": "medium",
    "topic": "Civics & Government",
    "contentArea": "data_interpretation",
    "passage": "This graph uses information from the Bureau of the Census. It shows the total voting age population (in thousands) for U.S. elections by age group from 1972 to 2008.\n\n<strong>Voters in U.S. Elections by Age Group, 1970–2010</strong>\n<table><thead><tr><th>Year</th><th>18–24</th><th>25–44</th><th>45–64</th><th>65 and over</th></tr></thead><tbody><tr><td>1972</td><td>25,000</td><td>49,000</td><td>40,000</td><td>20,000</td></tr><tr><td>1980</td><td>28,000</td><td>60,000</td><td>42,000</td><td>25,000</td></tr><tr><td>1988</td><td>26,000</td><td>73,000</td><td>46,000</td><td>30,000</td></tr><tr><td>1996</td><td>25,000</td><td>80,000</td><td>53,000</td><td>32,000</td></tr><tr><td>2004</td><td>28,000</td><td>82,000</td><td>66,000</td><td>35,000</td></tr><tr><td>2008</td><td>27,000</td><td>80,000</td><td>72,000</td><td>38,000</td></tr></tbody></table>\n(Numbers are in thousands)",
    "question": "Based on the trends shown in the data, which age group will be the largest group of voters by 2020?",
    "answerOptions": [
      {
        "text": "18–24",
        "rationale": "The 18–24 group has remained relatively flat around 25,000–28,000 over decades. There is no trend suggesting rapid growth.",
        "isCorrect": false
      },
      {
        "text": "25–44",
        "rationale": "The 25–44 group peaked around 2004 at 82,000 and appears to have stabilized or declined slightly by 2008.",
        "isCorrect": false
      },
      {
        "text": "45–64",
        "rationale": "Correct. The 45–64 group has shown the strongest and most consistent growth trend, rising from 40,000 in 1972 to 72,000 in 2008. If this trend continues, it would likely surpass or match the 25–44 group by 2020.",
        "isCorrect": true
      },
      {
        "text": "65 and over",
        "rationale": "While the 65+ group has grown steadily, its total (38,000 in 2008) is still far behind the two largest groups, and its growth rate is not rapid enough to overtake them by 2020.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "text",
    "difficulty": "medium",
    "topic": "U.S. History",
    "contentArea": "data_interpretation",
    "passage": "<strong>Events During George Washington's Presidency</strong>\n\n<table><thead><tr><th>Date</th><th>Event</th></tr></thead><tbody><tr><td>October 1789</td><td>Washington sets aside November 26 as \"A Day of Public Thanksgiving and Prayer.\"</td></tr><tr><td>January 1790</td><td>Washington delivers the first State of the Union address.</td></tr><tr><td>August 1790</td><td>This is the official enumeration date of the first U.S. Census.</td></tr><tr><td>September 1791</td><td>Washington, D.C., is established as the U.S. capital.</td></tr><tr><td>February 1792</td><td>The U.S. Post Office is officially established as a federal department.</td></tr><tr><td>March 1794</td><td>Eli Whitney is granted a patent for the cotton gin.</td></tr><tr><td>October 1794</td><td>Federal troops under Washington stop the Whiskey Rebellion.</td></tr><tr><td>September 1796</td><td>Washington announces he will not seek a third term as president.</td></tr></tbody></table>",
    "question": "Which conclusion is supported by the information in the timeline?",
    "answerOptions": [
      {
        "text": "In January 1790, Washington exercised his power of executive privilege to deliver his first State of the Union address.",
        "rationale": "The State of the Union is a constitutional duty, not an exercise of 'executive privilege.' Executive privilege refers to the president's right to withhold information from Congress.",
        "isCorrect": false
      },
      {
        "text": "In August, 1790, Washington violated the terms of his office by ordering the first official count of the U.S. population.",
        "rationale": "The Census was mandated by the Constitution (Article I, Section 2), so conducting it was a constitutional duty, not a violation.",
        "isCorrect": false
      },
      {
        "text": "In October 1794, Washington exercised his power as commander in chief to restore peace in the United States.",
        "rationale": "Correct. The timeline shows Washington used federal troops to stop the Whiskey Rebellion, which is an exercise of his constitutional role as commander in chief of the armed forces to maintain domestic order.",
        "isCorrect": true
      },
      {
        "text": "In September 1796, Washington established by executive order a limit of two terms in office for presidents.",
        "rationale": "Washington chose not to seek a third term but did not establish a formal limit. The two-term limit was not codified until the 22nd Amendment in 1951.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 4,
    "type": "text",
    "difficulty": "medium",
    "topic": "Economics",
    "contentArea": "economics",
    "passage": "<strong>Global Competition</strong>\n\nA tool manufacturer employs more than half of the workers in a small town. Global competition has led to falling company profits. Three years ago, the company automated more of its manufacturing processes, but profits continued to decrease. To further reduce labor costs, the business decided to move its manufacturing plant from the small town to a foreign country.",
    "question": "Which statement identifies a condition directly caused by higher unemployment in the town?",
    "answerOptions": [
      {
        "text": "The number of urban improvement projects increased.",
        "rationale": "Higher unemployment typically reduces tax revenue and consumer spending, making it less likely that urban improvement projects would increase.",
        "isCorrect": false
      },
      {
        "text": "The failure of local businesses increased.",
        "rationale": "Correct. When the town's major employer leaves and unemployment rises, workers have less income to spend at local businesses. This reduced consumer spending directly causes more local businesses to fail.",
        "isCorrect": true
      },
      {
        "text": "The high-school dropout rate increased.",
        "rationale": "While economic hardship can indirectly affect education, a higher dropout rate is not a direct and immediate consequence of unemployment in the way that business failures are.",
        "isCorrect": false
      },
      {
        "text": "The price of groceries increased.",
        "rationale": "Higher unemployment typically leads to decreased demand, which would be more likely to lower or stabilize prices rather than increase them.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "type": "text",
    "difficulty": "easy",
    "topic": "Civics & Government",
    "contentArea": "civics",
    "passage": "<strong>Reelection Speech</strong>\n\nA U.S. senator is running for reelection. Her opponent is a former leader of a well-known interest group. The senator makes a speech about interest groups to a large crowd of her constituents.",
    "question": "Which statement from the senator's speech is an example of campaign propaganda?",
    "answerOptions": [
      {
        "text": "\"Interest groups organize based on a shared opinion about public policy.\"",
        "rationale": "This is a neutral, factual description of how interest groups function. It is informational, not propaganda.",
        "isCorrect": false
      },
      {
        "text": "\"Interest groups only attempt to influence a limited range of policies.\"",
        "rationale": "This is a factual claim about the scope of interest group activity. While somewhat simplified, it is not propagandistic in tone.",
        "isCorrect": false
      },
      {
        "text": "\"Interest groups communicate their views to government leaders.\"",
        "rationale": "This is a factual statement about how interest groups engage in the political process — lobbying and communication with leaders.",
        "isCorrect": false
      },
      {
        "text": "\"Interest groups only benefit the wealthiest people in society.\"",
        "rationale": "Correct. This is propaganda because it makes a sweeping, misleading generalization designed to cast her opponent (a former interest group leader) in a negative light. Many interest groups advocate for a wide range of causes including workers' rights, environmental protection, and civil liberties.",
        "isCorrect": true
      }
    ]
  },
  {
    "questionNumber": 6,
    "type": "text",
    "difficulty": "medium",
    "topic": "Economics",
    "contentArea": "economics",
    "passage": "The table below shows average household income and spending patterns in a U.S. city.\n\n<strong>Average Annual Household Income and Spending (in dollars)</strong>\n<table><thead><tr><th>Income Level</th><th>Average Income</th><th>Housing</th><th>Food</th><th>Transportation</th><th>Healthcare</th><th>Savings</th></tr></thead><tbody><tr><td>Low income</td><td>\25,000</td><td>\10,000</td><td>\5,500</td><td>\4,200</td><td>\2,800</td><td>\500</td></tr><tr><td>Middle income</td><td>\55,000</td><td>\16,500</td><td>\8,250</td><td>\7,700</td><td>\4,400</td><td>\5,500</td></tr><tr><td>High income</td><td>\120,000</td><td>\30,000</td><td>\12,000</td><td>\10,800</td><td>\7,200</td><td>\24,000</td></tr></tbody></table>",
    "question": "Based on the data in the table, which conclusion is best supported?",
    "answerOptions": [
      {
        "text": "Low-income households spend a larger percentage of their income on housing than high-income households.",
        "rationale": "Correct. Low-income households spend \\(10,000 / \\)25,000 = 40% on housing, while high-income households spend \\(30,000 / \\)120,000 = 25%. Low-income households devote a significantly larger share of their income to housing.",
        "isCorrect": true
      },
      {
        "text": "High-income households spend the most on food as a percentage of income.",
        "rationale": "High-income households spend \\(12,000 / \\)120,000 = 10% on food, while low-income households spend \\(5,500 / \\)25,000 = 22%. Low-income households spend a higher percentage.",
        "isCorrect": false
      },
      {
        "text": "Middle-income households save a higher percentage of their income than high-income households.",
        "rationale": "Middle-income households save \\(5,500 / \\)55,000 = 10%, while high-income households save \\(24,000 / \\)120,000 = 20%. High-income households save a higher percentage.",
        "isCorrect": false
      },
      {
        "text": "Transportation costs are roughly the same percentage of income for all income levels.",
        "rationale": "Low-income: \\(4,200 / \\)25,000 = 16.8%. Middle-income: \\(7,700 / \\)55,000 = 14%. High-income: \\(10,800 / \\)120,000 = 9%. The percentages differ significantly.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 7,
    "type": "text",
    "difficulty": "hard",
    "topic": "Economics",
    "contentArea": "economics",
    "passage": "The following table shows economic indicators for five countries.\n\n<strong>Economic Indicators by Country (2019)</strong>\n<table><thead><tr><th>Country</th><th>GDP per Capita</th><th>Unemployment Rate</th><th>Inflation Rate</th><th>Literacy Rate</th></tr></thead><tbody><tr><td>Country A</td><td>\62,000</td><td>3.7%</td><td>1.8%</td><td>99%</td></tr><tr><td>Country B</td><td>\10,500</td><td>11.5%</td><td>3.7%</td><td>94%</td></tr><tr><td>Country C</td><td>\2,100</td><td>23.1%</td><td>9.2%</td><td>62%</td></tr><tr><td>Country D</td><td>\42,300</td><td>5.4%</td><td>1.4%</td><td>99%</td></tr><tr><td>Country E</td><td>$8,700</td><td>6.1%</td><td>4.5%</td><td>97%</td></tr></tbody></table>",
    "question": "Which country's data most strongly suggests a developing economy facing significant economic challenges?",
    "answerOptions": [
      {
        "text": "Country A",
        "rationale": "Country A has a high GDP per capita ($62,000), low unemployment (3.7%), low inflation (1.8%), and near-universal literacy — all indicators of a developed, stable economy.",
        "isCorrect": false
      },
      {
        "text": "Country B",
        "rationale": "Country B shows moderate challenges (lower GDP, higher unemployment), but Country C's indicators are far more severe across all categories.",
        "isCorrect": false
      },
      {
        "text": "Country C",
        "rationale": "Correct. Country C has the lowest GDP per capita ($2,100), the highest unemployment (23.1%), the highest inflation (9.2%), and the lowest literacy rate (62%). Together, these indicators strongly suggest a developing economy facing significant economic challenges.",
        "isCorrect": true
      },
      {
        "text": "Country E",
        "rationale": "Country E has a moderate GDP per capita and relatively controlled unemployment and inflation. While not as wealthy as Countries A or D, it does not show severe economic challenges.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 8,
    "type": "text",
    "difficulty": "medium",
    "topic": "Civics & Government",
    "contentArea": "civics",
    "passage": "The table below shows the steps in the process of how a bill becomes a law in the United States.\n\n<strong>How a Bill Becomes a Law</strong>\n<table><thead><tr><th>Step</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>A member of Congress introduces a bill.</td></tr><tr><td>2</td><td>The bill is assigned to a committee for review.</td></tr><tr><td>3</td><td>The committee debates, may amend, and votes on the bill.</td></tr><tr><td>4</td><td>If approved, the bill goes to the full chamber (House or Senate) for debate and vote.</td></tr><tr><td>5</td><td>If one chamber passes the bill, it goes to the other chamber for consideration.</td></tr><tr><td>6</td><td>If both chambers pass different versions, a conference committee resolves differences.</td></tr><tr><td>7</td><td>Both chambers vote on the final version of the bill.</td></tr><tr><td>8</td><td>The bill is sent to the President, who may sign it into law or veto it.</td></tr></tbody></table>",
    "question": "At which step does the system of checks and balances between the legislative and executive branches first come into play?",
    "answerOptions": [
      {
        "text": "Step 3, when the committee votes on the bill",
        "rationale": "Committee action involves only members of Congress (the legislative branch). No interaction with the executive branch occurs at this step.",
        "isCorrect": false
      },
      {
        "text": "Step 6, when a conference committee resolves differences",
        "rationale": "Conference committees involve members of both chambers of Congress, but this is still entirely within the legislative branch.",
        "isCorrect": false
      },
      {
        "text": "Step 7, when both chambers vote on the final version",
        "rationale": "Voting in Congress is a legislative branch function. The executive branch is not involved until the bill reaches the president.",
        "isCorrect": false
      },
      {
        "text": "Step 8, when the President may sign or veto the bill",
        "rationale": "Correct. Step 8 is the first point where the executive branch (the President) exercises a check on the legislative branch by deciding whether to sign the bill into law or veto it.",
        "isCorrect": true
      }
    ]
  }
];
