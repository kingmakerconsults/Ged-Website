/**
 * GED Ready-Style Science — Cross-Domain Data & Charts
 * Modeled after GED Ready® Science exam format:
 *   - Cross-domain (life, physical, earth) data interpretation
 *   - Control vs variable, scientific method, and graph/trend analysis
 *   - Calculator and formula sheet available
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'data_interpretation',
    calculatorAllowed: true,
    passage:
      'A student designs an experiment to test how the amount of fertilizer affects bean plant growth. She prepares four pots of bean seedlings of similar size, places each pot in the same sunny window, and gives all of them the same amount of water on the same schedule. Each pot receives a different amount of fertilizer per week, as shown in the table.\n\n<table><thead><tr><th>Pot</th><th>Fertilizer per Week (g)</th><th>Growth After 4 Weeks (cm)</th></tr></thead><tbody><tr><td>A</td><td>0</td><td>6</td></tr><tr><td>B</td><td>2</td><td>11</td></tr><tr><td>C</td><td>4</td><td>17</td></tr><tr><td>D</td><td>8</td><td>15</td></tr></tbody></table>',
    question:
      'In this experiment, which factor is the <strong>independent variable</strong>?',
    answerOptions: [
      {
        text: 'The amount of fertilizer applied per week.',
        rationale:
          'Correct. The independent variable is the factor the experimenter changes on purpose. Here, fertilizer per week is varied across the four pots, while light, water, and starting plant size are held constant.',
        isCorrect: true,
      },
      {
        text: 'The growth of the bean plants after 4 weeks.',
        rationale:
          'Plant growth is the dependent variable — the outcome measured to see the effect of the change.',
        isCorrect: false,
      },
      {
        text: 'The amount of water given to each pot.',
        rationale:
          'Water is held constant across pots and serves as a controlled variable, not the independent variable.',
        isCorrect: false,
      },
      {
        text: 'The amount of sunlight in the window.',
        rationale:
          'Sunlight is also held constant across pots in this design, so it is a controlled variable.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'data_interpretation',
    calculatorAllowed: true,
    passage:
      'A student designs an experiment to test how the amount of fertilizer affects bean plant growth. She prepares four pots of bean seedlings of similar size, places each pot in the same sunny window, and gives all of them the same amount of water on the same schedule. Each pot receives a different amount of fertilizer per week, as shown in the table.\n\n<table><thead><tr><th>Pot</th><th>Fertilizer per Week (g)</th><th>Growth After 4 Weeks (cm)</th></tr></thead><tbody><tr><td>A</td><td>0</td><td>6</td></tr><tr><td>B</td><td>2</td><td>11</td></tr><tr><td>C</td><td>4</td><td>17</td></tr><tr><td>D</td><td>8</td><td>15</td></tr></tbody></table>',
    question:
      'Which conclusion is most strongly supported by the data in the table?',
    answerOptions: [
      {
        text: 'More fertilizer always increases bean plant growth.',
        rationale:
          'Pot D received more fertilizer than Pot C but grew less (15 cm vs. 17 cm), so the relationship is not "always increases."',
        isCorrect: false,
      },
      {
        text: 'Bean plants grew more with some fertilizer than with none, but very high doses (8 g) reduced growth slightly.',
        rationale:
          'Correct. Growth rose from 6 cm with 0 g to a peak of 17 cm with 4 g, then fell to 15 cm at 8 g — fertilizer helps, but the highest dose tested reduces growth slightly.',
        isCorrect: true,
      },
      {
        text: 'Fertilizer has no effect on bean plant growth.',
        rationale:
          'Plants given fertilizer grew substantially more than the control (Pot A) — clearly an effect.',
        isCorrect: false,
      },
      {
        text: 'The control pot (Pot A) grew the most because it had no chemicals added.',
        rationale: 'Pot A grew the least (6 cm), not the most.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'data_interpretation',
    calculatorAllowed: true,
    passage:
      'A pharmaceutical company tests a new pain medication. Researchers randomly assign 600 adult patients with chronic back pain into two groups of 300. One group receives the new medication; the other group receives an identical-looking pill containing no active drug (a placebo). Neither the patients nor the doctors evaluating their pain know which group each patient is in. After 8 weeks, patients rate their pain on a 0-10 scale.\n\n<table><thead><tr><th>Group</th><th>Patients</th><th>Average Pain Score Before</th><th>Average Pain Score After</th></tr></thead><tbody><tr><td>New medication</td><td>300</td><td>7.4</td><td>3.9</td></tr><tr><td>Placebo</td><td>300</td><td>7.3</td><td>5.8</td></tr></tbody></table>',
    question:
      'Which group serves as the <strong>control group</strong>, and what is the purpose of including it?',
    answerOptions: [
      {
        text: 'The new-medication group is the control, used to make sure the medication does not harm patients.',
        rationale:
          'The control group is the one that does not receive the experimental treatment. Here, the placebo group fills that role.',
        isCorrect: false,
      },
      {
        text: "The placebo group is the control, used to compare the medication's effect against what would happen without active treatment.",
        rationale:
          'Correct. The placebo group receives no active drug. By comparing pain changes in the two groups, the researchers can tell whether the medication does anything beyond expectation, attention, and natural changes over time.',
        isCorrect: true,
      },
      {
        text: 'There is no control group because every patient took a pill.',
        rationale:
          'A control group is one that does not receive the active treatment, even if they receive a sham (placebo). The placebo group is therefore the control.',
        isCorrect: false,
      },
      {
        text: 'Both groups are control groups because they were assigned randomly.',
        rationale:
          'Random assignment is a separate concept; it ensures the groups start out similar, but does not make every group a control. Only the no-active-treatment group is the control.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'hard',
    topic: 'Scientific Practices',
    contentArea: 'data_interpretation',
    calculatorAllowed: true,
    passage:
      "Use the same medication trial described in the previous question. The new-medication group's average pain score fell from 7.4 to 3.9, while the placebo group's average score fell from 7.3 to 5.8.",
    question:
      'Approximately how much larger was the <strong>average drop in pain score</strong> for patients on the new medication compared with patients on the placebo?',
    answerOptions: [
      {
        text: 'About 0.1 point larger.',
        rationale:
          'This is the small difference in the starting averages (7.4 vs. 7.3), not the difference in how much the scores fell.',
        isCorrect: false,
      },
      {
        text: 'About 1.5 points larger.',
        rationale:
          "This is the change for the placebo group alone (7.3 − 5.8). The question asks how much larger the medication's drop was compared with the placebo.",
        isCorrect: false,
      },
      {
        text: 'About 2.0 points larger.',
        rationale:
          "Correct. Medication drop: 7.4 − 3.9 = 3.5 points. Placebo drop: 7.3 − 5.8 = 1.5 points. The medication's drop was 3.5 − 1.5 = 2.0 points larger on average.",
        isCorrect: true,
      },
      {
        text: 'About 3.5 points larger.',
        rationale:
          "This is the medication's total drop (7.4 − 3.9), not the difference between the two groups' drops. Patients on placebo also improved on average.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'text',
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'data_interpretation',
    calculatorAllowed: true,
    passage:
      'A physics class measures how the temperature of a 200 g block of ice changes when it is heated steadily on a hot plate. Students record the temperature every minute, then plot temperature versus time.\n\n<strong>Heating Curve of 200 g of Ice</strong>\n<table><thead><tr><th>Time (min)</th><th>Temperature (°C)</th><th>State of Water</th></tr></thead><tbody><tr><td>0</td><td>−10</td><td>Solid (ice)</td></tr><tr><td>2</td><td>0</td><td>Solid (ice)</td></tr><tr><td>3</td><td>0</td><td>Melting (ice + water)</td></tr><tr><td>5</td><td>0</td><td>Just finished melting (water)</td></tr><tr><td>8</td><td>40</td><td>Liquid water</td></tr><tr><td>10</td><td>70</td><td>Liquid water</td></tr><tr><td>13</td><td>100</td><td>Boiling (water + steam)</td></tr></tbody></table>',
    question:
      'Why does the temperature of the substance stay at 0 °C from minute 2 to minute 5 even though the hot plate continues to add energy?',
    answerOptions: [
      {
        text: 'The hot plate stops working during melting.',
        rationale:
          'The hot plate continues to add energy steadily; what changes is how that energy is being used, not whether it is being supplied.',
        isCorrect: false,
      },
      {
        text: 'The added energy is being used to break the bonds holding the ice together (melting it), rather than to raise the temperature of the water.',
        rationale:
          'Correct. During a phase change, energy goes into changing the state of matter (here, melting solid ice into liquid water) rather than into increasing the temperature, so the thermometer reading stays constant at 0 °C until melting is complete.',
        isCorrect: true,
      },
      {
        text: 'Water cannot warm above 0 °C.',
        rationale:
          'The table itself shows water reaching 40, 70, and 100 °C — clearly water can warm above 0 °C once melting is finished.',
        isCorrect: false,
      },
      {
        text: 'The thermometer is broken during the melting period.',
        rationale:
          'No evidence supports this; the same thermometer reads correctly before and after the melting period.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'text',
    difficulty: 'hard',
    topic: 'Scientific Practices',
    contentArea: 'data_interpretation',
    calculatorAllowed: true,
    passage:
      'A long-term ecological study tracks the populations of moose and wolves on Isle Royale, an island in Lake Superior. Wolves prey on moose, and the table below shows estimated populations at five-year intervals.\n\n<table><thead><tr><th>Year</th><th>Moose Population</th><th>Wolf Population</th></tr></thead><tbody><tr><td>1980</td><td>950</td><td>50</td></tr><tr><td>1985</td><td>1,300</td><td>22</td></tr><tr><td>1990</td><td>1,600</td><td>14</td></tr><tr><td>1995</td><td>2,400</td><td>16</td></tr><tr><td>2000</td><td>900</td><td>29</td></tr></tbody></table>',
    question:
      'Which pattern in the data is most consistent with a typical predator-prey relationship?',
    answerOptions: [
      {
        text: 'When the wolf population fell from 1980 to 1990, the moose population rose substantially, then crashed by 2000 as wolf numbers recovered and food/disease pressures rose.',
        rationale:
          'Correct. The data show wolves declining (50→14) while moose increased (950→2,400), then a moose crash (2,400→900) by 2000 as wolves rebounded — a classic boom-and-bust predator-prey dynamic.',
        isCorrect: true,
      },
      {
        text: 'The two populations stayed almost exactly the same throughout the study.',
        rationale:
          'Both populations changed dramatically — wolves from 50 to 14 and back up to 29; moose from 950 up to 2,400 and back down to 900.',
        isCorrect: false,
      },
      {
        text: 'Wolves and moose increased together steadily every year.',
        rationale:
          'The table shows the populations moving in roughly opposite directions for most years, not increasing together.',
        isCorrect: false,
      },
      {
        text: 'There is no possible relationship between the two populations because they are different species.',
        rationale:
          "Different species can absolutely affect each other's populations, especially in predator-prey systems — the data here illustrate exactly that.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'data_interpretation',
    calculatorAllowed: true,
    question:
      'A researcher reports that "people who drink more coffee tend to have higher rates of heart disease." A reporter writes a headline saying "Coffee causes heart disease." Why is this headline a misuse of the research?',
    answerOptions: [
      {
        text: 'It treats correlation as causation, ignoring other factors (such as smoking, sleep, stress, or age) that might explain the link.',
        rationale:
          'Correct. A correlation between two variables does not by itself prove that one causes the other. Other factors common to heavy coffee drinkers could be the real cause; that has to be tested with controlled research.',
        isCorrect: true,
      },
      {
        text: 'The headline is correct because correlation always proves causation.',
        rationale:
          'Correlation does not always (or even usually) prove causation; this is a fundamental rule in interpreting research.',
        isCorrect: false,
      },
      {
        text: 'The headline is wrong because coffee actually prevents heart disease in everyone.',
        rationale:
          'The data described in the question only show a correlation, not a protective effect. We cannot draw the opposite causal conclusion either.',
        isCorrect: false,
      },
      {
        text: 'Headlines about scientific research are always misleading and should be ignored.',
        rationale:
          'Headlines can be misleading, but a sweeping rule that all of them should be ignored is not the specific reason this one is flawed.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'data_interpretation',
    calculatorAllowed: true,
    question:
      'A scientist proposes a new explanation for why a certain bacterium becomes resistant to an antibiotic. Which of the following best describes how this idea becomes a well-supported <strong>scientific theory</strong>?',
    answerOptions: [
      {
        text: 'It is published in a magazine and many readers agree with it.',
        rationale:
          'Public agreement is not the test of a scientific theory. Theories are supported by evidence and testing, not by popularity.',
        isCorrect: false,
      },
      {
        text: 'It is repeatedly tested with experiments by independent researchers, and its predictions are confirmed by data over time.',
        rationale:
          'Correct. A scientific explanation becomes a well-supported theory by being tested, retested, and confirmed by independent researchers using evidence and reproducible experiments.',
        isCorrect: true,
      },
      {
        text: 'The original scientist insists strongly enough that other people accept it.',
        rationale:
          'Persuasion alone does not establish a scientific theory; evidence and reproducibility do.',
        isCorrect: false,
      },
      {
        text: 'It cannot be tested by any experiment, so it remains a theory by default.',
        rationale:
          'An idea that cannot be tested does not become a scientific theory; it falls outside the scope of empirical science.',
        isCorrect: false,
      },
    ],
  },
];
