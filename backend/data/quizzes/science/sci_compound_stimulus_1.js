// Compound stimulus questions: passage (data table/text) + stimulusImage on the same item
// Modeled after official GED Q10 (sea level table + world map) pattern
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "Sea level rise can have a great impact on the natural environment and on human populations, particularly in coastal areas. Satellite data for mean global sea levels are presented in the following table.\n\n<table class=\"data-table\"><thead><tr><th>Year</th><th>Rise in Sea Level (mm)</th><th>Year</th><th>Rise in Sea Level (mm)</th></tr></thead><tbody><tr><td>1993</td><td>3.2</td><td>2002</td><td>5.2</td></tr><tr><td>1994</td><td>1.3</td><td>2003</td><td>2.7</td></tr><tr><td>1995</td><td>2.2</td><td>2004</td><td>3.3</td></tr><tr><td>1996</td><td>4.2</td><td>2005</td><td>4.9</td></tr><tr><td>1997</td><td>6.0</td><td>2006</td><td>0.0</td></tr><tr><td>1998</td><td>5.0</td><td>2007</td><td>1.6</td></tr><tr><td>1999</td><td>1.5</td><td>2008</td><td>6.2</td></tr><tr><td>2000</td><td>2.5</td><td>2009</td><td>1.9</td></tr><tr><td>2001</td><td>3.8</td><td>Average</td><td>3.3</td></tr></tbody></table>\n\nThe map below shows local increasing and decreasing sea level trends as measured by tide measurement stations located around the world.",
    "question": "Do the local tide measurement data support or contradict the global satellite data?",
    "stimulusImage": {
      "src": "/images/Science/earth_and_space_systems_0001.png",
      "alt": "World map showing sea level trends at global tide measurement stations with dots indicating increasing (red) and decreasing (blue) sea level trends"
    },
    "answerOptions": [
      {
        "text": "The tide measurement data contradict the satellite data because the tide measurement data show that the local sea level trends at some locations are decreasing.",
        "rationale": "A few local decreases do not contradict a global average; local effects like land uplift cause local variation.",
        "isCorrect": false
      },
      {
        "text": "The tide measurement data support the satellite data because the number of places where local sea levels are decreasing is so small that they can be ignored.",
        "rationale": "The decreasing locations should not simply be ignored; they are explained by local factors.",
        "isCorrect": false
      },
      {
        "text": "The tide measurement data contradict the satellite data because the number of decreasing local sea level trends is greater than the number of increasing local sea level trends.",
        "rationale": "The map shows most stations with increasing trends; this claim is factually incorrect.",
        "isCorrect": false
      },
      {
        "text": "The tide measurement data support the satellite data because the tide measurement data show that the number of increasing local sea level trends is significantly greater than the number of decreasing local sea level trends.",
        "rationale": "Correct. The overall pattern in the local data matches the global trend from satellite measurements.",
        "isCorrect": true
      }
    ],
    "challenge_tags": ["science-4"],
    "skillIntent": "evidence-tradeoff",
    "category": "Earth & Space Science"
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "Scientists collected data on the oxygen consumption rate of goldfish at different water temperatures. The experiment used 10 goldfish at each temperature. The rate of oxygen intake was indirectly measured by observing the rate at which the gill flap opens and closes. The data are summarized in the table below.\n\n<table class=\"data-table\"><thead><tr><th>Water Temperature</th><th>Mean Number of Gill Movements per Minute</th></tr></thead><tbody><tr><td>10°C</td><td>5</td></tr><tr><td>16°C</td><td>38</td></tr><tr><td>21°C</td><td>62</td></tr><tr><td>27°C</td><td>110</td></tr></tbody></table>\n\nThe graph below displays the same data visually.",
    "question": "Which is the independent variable and which is the dependent variable in this experiment?",
    "stimulusImage": {
      "src": "/images/Science/unclassified_0027.png",
      "alt": "Bar chart showing Effect of Temperature on Respiration Rate in Fish with bars at 10°C, 16°C, 21°C, and 27°C"
    },
    "answerOptions": [
      {
        "text": "The independent variable is the respiration rate; the dependent variable is the temperature.",
        "rationale": "Temperature was set by the scientist (independent), not determined by respiration rate.",
        "isCorrect": false
      },
      {
        "text": "The independent variable is the temperature; the dependent variable is the respiration rate.",
        "rationale": "Correct. The scientist chose the temperatures (independent variable) and measured the resulting gill movement rate (dependent variable).",
        "isCorrect": true
      },
      {
        "text": "The independent variable is the number of goldfish; the dependent variable is the temperature.",
        "rationale": "The number of goldfish was kept constant at 10 per temperature; it is a controlled variable.",
        "isCorrect": false
      },
      {
        "text": "The independent variable is the respiration rate; the dependent variable is the number of goldfish.",
        "rationale": "Neither the respiration rate nor the number of goldfish fits these roles correctly.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-6"],
    "skillIntent": "experimental-design",
    "category": "Life Science"
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "difficulty": "hard",
    "passage": "Scientists measured the concentration of carbon dioxide (CO₂) in the atmosphere at a Hawaiian observatory from 1960 to 2020. The table below shows selected readings.\n\n<table class=\"data-table\"><thead><tr><th>Year</th><th>CO₂ (ppm)</th></tr></thead><tbody><tr><td>1960</td><td>317</td></tr><tr><td>1970</td><td>326</td></tr><tr><td>1980</td><td>339</td></tr><tr><td>1990</td><td>354</td></tr><tr><td>2000</td><td>369</td></tr><tr><td>2010</td><td>390</td></tr><tr><td>2020</td><td>414</td></tr></tbody></table>\n\nCO₂ is a greenhouse gas: it absorbs and re-emits infrared radiation in Earth's atmosphere, trapping heat that would otherwise escape to space.",
    "question": "Based on the data table and information about the greenhouse effect, which conclusion is best supported?",
    "answerOptions": [
      {
        "text": "CO₂ levels are decreasing, which will reduce the greenhouse effect over time.",
        "rationale": "The data table clearly shows CO₂ levels increasing every decade, not decreasing.",
        "isCorrect": false
      },
      {
        "text": "Rising CO₂ concentrations are likely to increase heat trapping in the atmosphere, contributing to warming.",
        "rationale": "Correct. The table shows a steady increase in CO₂, and the passage explains that CO₂ traps heat. Together they support the conclusion that increasing CO₂ leads to more warming.",
        "isCorrect": true
      },
      {
        "text": "The CO₂ increase is too small to have any measurable effect on global temperatures.",
        "rationale": "A 97 ppm increase over 60 years is significant and well-documented to affect climate.",
        "isCorrect": false
      },
      {
        "text": "The greenhouse effect only applies to water vapor, not carbon dioxide.",
        "rationale": "The passage explicitly identifies CO₂ as a greenhouse gas that traps heat.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-4"],
    "skillIntent": "evidence-tradeoff",
    "category": "Earth & Space Science"
  }
];
