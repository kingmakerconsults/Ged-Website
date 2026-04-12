// Experimental design: flaw identification, confounding variables, study critique
// (official GED pattern — goes beyond simple "identify the variable" questions)
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "An average pumpkin weighs between 10 and 20 pounds. Those that win giant pumpkin contests weigh up to 1,000 pounds. Growers state that soil, fertilizer N-P-K (nitrogen-phosphorus-potassium) ratio, watering schedule, and fertilizer type are the main factors that lead to success in growing giant pumpkins.\n\nThe table below shows an experimental design that compares three methods of growing a giant pumpkin.\n\n<table><tr><th></th><th>Method 1</th><th>Method 2</th><th>Method 3</th></tr><tr><td><strong>Seed</strong></td><td>Type A</td><td>Type A</td><td>Type A</td></tr><tr><td><strong>Watering schedule</strong></td><td colspan=\"3\">every other day until soil is moist</td></tr><tr><td><strong>Soil fertilized with manure before planting</strong></td><td>yes</td><td>yes</td><td>yes</td></tr><tr><td><strong>Fertilizer N-P-K ratio</strong></td><td>16-4-8</td><td>18-24-6</td><td>10-10-10</td></tr><tr><td><strong>Fertilizer type</strong></td><td>liquid, premixed</td><td>granular, slow release</td><td>water soluble, not premixed</td></tr></table>",
    "question": "Which statement describes a solution for the error in the experiment?",
    "answerOptions": [
      {
        "text": "Manure should not be used.",
        "rationale": "Manure is applied the same way to all methods. It is a controlled variable, not the error.",
        "isCorrect": false
      },
      {
        "text": "Fertilizer should not be used.",
        "rationale": "Removing fertilizer entirely would not help test which method works best; the goal is to compare fertilizer approaches.",
        "isCorrect": false
      },
      {
        "text": "A single fertilizer type should be used.",
        "rationale": "Correct. Both the fertilizer N-P-K ratio and the fertilizer type change between methods. A valid experiment should change only one variable at a time. Using the same type across all methods would isolate the effect of the N-P-K ratio.",
        "isCorrect": true
      },
      {
        "text": "Different types of seeds could be used.",
        "rationale": "Using different seeds would add another variable, making the experiment less controlled, not more.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-6"],
    "skillIntent": "experimental-design",
    "category": "Life Science"
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "A student wanted to test whether the type of music played in a room affects how quickly people can solve math problems. She recruited 30 volunteers and divided them into three groups of 10. Group 1 solved problems in silence, Group 2 solved problems while classical music played, and Group 3 solved problems while pop music played. She recorded the average time each group took to complete 20 problems.\n\nHowever, the student allowed participants to choose which group they wanted to join.",
    "question": "What is the main flaw in this experimental design?",
    "answerOptions": [
      {
        "text": "The sample size of 30 people is too small to draw conclusions.",
        "rationale": "While a larger sample is always better, the sample size is not the main design flaw described in the passage.",
        "isCorrect": false
      },
      {
        "text": "She should have tested more types of music.",
        "rationale": "Adding more music types would increase complexity but does not address the fundamental design problem.",
        "isCorrect": false
      },
      {
        "text": "Allowing participants to choose their group introduces selection bias that could confound the results.",
        "rationale": "Correct. When participants self-select, people who prefer silence might already be better at focusing, creating a confound. Random assignment would eliminate this bias.",
        "isCorrect": true
      },
      {
        "text": "She should have used the same math problems for all three groups.",
        "rationale": "The passage states all groups solved the same 20 problems, so this is not a flaw.",
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
    "passage": "A group of scientists studied the environmental impact of internal combustion engines burning hydrocarbon fuels. The scientists equipped four vehicles with devices to capture and measure particulate emissions. One vehicle burned diesel fuel, one burned ordinary gasoline, one burned a gasoline/ethanol mixture, and one burned natural gas. The four vehicles had equal masses and carried identical cargo. The scientists drove each vehicle 400 kilometers, recording the volume of fuel burned and the quantity of particulate emissions generated.",
    "question": "What is the independent variable in this experiment?",
    "answerOptions": [
      {
        "text": "type of fuel",
        "rationale": "Correct. The type of fuel is the factor that the scientists deliberately varied across the four vehicles.",
        "isCorrect": true
      },
      {
        "text": "distance traveled",
        "rationale": "Distance was kept constant at 400 km for all vehicles. It is a controlled variable.",
        "isCorrect": false
      },
      {
        "text": "mass of vehicle and cargo",
        "rationale": "The vehicles had equal masses and identical cargo. Mass was controlled, not varied.",
        "isCorrect": false
      },
      {
        "text": "quantity of particulate emissions",
        "rationale": "Particulate emissions are the measured outcome (dependent variable), not the factor being changed.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-6"],
    "skillIntent": "experimental-design",
    "category": "Physical Science"
  },
  {
    "questionNumber": 4,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "A researcher investigated whether a new brand of plant fertilizer increases the growth rate of tomato plants. She planted 20 tomato seedlings in identical pots with the same soil. Half received the new fertilizer mixed into their water once a week, and the other half received plain water. After six weeks, she measured the height of each plant.\n\nThe researcher placed the fertilized group in a sunny greenhouse and the unfertilized group in a shaded outdoor area.",
    "question": "Which factor makes the results of this experiment unreliable?",
    "answerOptions": [
      {
        "text": "She used only one type of plant.",
        "rationale": "Using one plant type is appropriate for controlling variables; it does not weaken the experiment.",
        "isCorrect": false
      },
      {
        "text": "She measured plant height instead of weight.",
        "rationale": "Height is a valid measurement of growth. The measurement type is not the flaw.",
        "isCorrect": false
      },
      {
        "text": "The two groups were kept in different light conditions, creating a confounding variable.",
        "rationale": "Correct. Because the groups experienced different amounts of sunlight, any changes in growth could be due to light rather than the fertilizer. This confound makes it impossible to attribute the results to fertilizer alone.",
        "isCorrect": true
      },
      {
        "text": "She used too many plants in each group.",
        "rationale": "Ten plants per group is a reasonable number. Using more plants improves reliability.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-6"],
    "skillIntent": "experimental-design",
    "category": "Life Science"
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "A biology class wanted to test whether salt concentration in water affects the hatching rate of brine shrimp eggs. Students prepared five containers with different salt concentrations: 0%, 1%, 2%, 3%, and 4%. They added 50 brine shrimp eggs to each container and counted how many hatched after 48 hours. All containers were kept at the same temperature and light level.",
    "question": "Which container serves as the control in this experiment?",
    "answerOptions": [
      {
        "text": "The container with 0% salt concentration",
        "rationale": "Correct. The 0% salt container provides a baseline for comparison: it shows how many eggs hatch without any salt, so the effect of adding salt can be measured against it.",
        "isCorrect": true
      },
      {
        "text": "The container with 2% salt concentration",
        "rationale": "The 2% container is one of the experimental treatments, not the baseline for comparison.",
        "isCorrect": false
      },
      {
        "text": "The container with the most hatched eggs",
        "rationale": "The control is defined before results are collected, not identified based on the outcome.",
        "isCorrect": false
      },
      {
        "text": "The container with 4% salt concentration",
        "rationale": "The highest concentration is an experimental treatment, not the control.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-6"],
    "skillIntent": "experimental-design",
    "category": "Life Science"
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "difficulty": "hard",
    "passage": "A nutritionist conducted a study to determine whether drinking green tea improves memory in older adults. She recruited 100 volunteers aged 60–75 and divided them into two groups. Group A drank three cups of green tea daily for 12 weeks. Group B drank three cups of water daily for 12 weeks. At the end of the study, both groups took a standardized memory test.\n\nThe nutritionist found that Group A scored 15% higher on the memory test. She concluded that green tea improves memory.",
    "question": "Which statement identifies the biggest limitation of this study's conclusion?",
    "answerOptions": [
      {
        "text": "The study did not last long enough to see memory improvements.",
        "rationale": "Twelve weeks is a reasonable duration; the passage shows results were observed. Duration is not the biggest limitation.",
        "isCorrect": false
      },
      {
        "text": "The participants in Group A knew they were drinking green tea, which could create a placebo effect.",
        "rationale": "Correct. Because participants knew their group assignment, their expectations could influence performance on the memory test. A blinded study would be needed to rule out the placebo effect.",
        "isCorrect": true
      },
      {
        "text": "Group B should have drunk coffee instead of water.",
        "rationale": "Using water as the control is a valid choice; coffee would introduce additional variables like caffeine.",
        "isCorrect": false
      },
      {
        "text": "The memory test may not be accurate for older adults.",
        "rationale": "The test is described as standardized; there is no evidence it is invalid for this age group.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-6"],
    "skillIntent": "experimental-design",
    "category": "Life Science"
  },
  {
    "questionNumber": 7,
    "type": "multipleChoice",
    "difficulty": "medium",
    "passage": "A student tested whether the color of light affects the rate of photosynthesis in aquatic plants. She placed identical plants in five identical beakers of water under red, blue, green, white, and no light. She counted the number of oxygen bubbles produced by each plant in 10 minutes.\n\nThe room temperature was 22°C throughout the experiment.",
    "question": "Why did the student include a beaker with no light?",
    "answerOptions": [
      {
        "text": "To confirm that the plants are still alive without light exposure",
        "rationale": "The purpose of a control is not just to check survival but to provide a baseline for comparison.",
        "isCorrect": false
      },
      {
        "text": "To provide a control that shows the baseline oxygen production without the influence of light",
        "rationale": "Correct. The no-light condition serves as the control, allowing the student to compare how much additional oxygen each light color produces relative to the baseline.",
        "isCorrect": true
      },
      {
        "text": "To test whether oxygen bubbles can form in the dark",
        "rationale": "The experiment is about photosynthesis rates under different light colors, not whether bubbles form in darkness.",
        "isCorrect": false
      },
      {
        "text": "To increase the total number of beakers so the experiment looks more thorough",
        "rationale": "The number of beakers is not what makes an experiment valid; a control group is included for scientific comparison.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-6"],
    "skillIntent": "experimental-design",
    "category": "Life Science"
  },
  {
    "questionNumber": 8,
    "type": "multipleChoice",
    "difficulty": "hard",
    "passage": "A scientist studied the effect of soil pH on the growth of corn plants. She grew corn in 6 plots of soil with pH values of 4.0, 5.0, 6.0, 7.0, 8.0, and 9.0. Each plot was 2 meters by 2 meters and contained 20 corn seeds. After 8 weeks, she measured the average height of the plants in each plot.\n\nShe found that the plot with pH 7.0 produced the tallest plants. However, she later noticed that the pH 7.0 plot received approximately 2 more hours of direct sunlight per day than the other plots because of its location in the field.",
    "question": "How does the sunlight difference affect the scientist's ability to draw conclusions?",
    "answerOptions": [
      {
        "text": "It has no effect because sunlight is not related to plant growth.",
        "rationale": "Sunlight is a major factor in plant growth through photosynthesis, so the difference clearly matters.",
        "isCorrect": false
      },
      {
        "text": "It means the results for all six plots are invalid and should be discarded.",
        "rationale": "The results for the other plots may still be valid; only the comparison involving the pH 7.0 plot is compromised.",
        "isCorrect": false
      },
      {
        "text": "It introduces a confounding variable, so the taller growth in pH 7.0 cannot be attributed to pH alone.",
        "rationale": "Correct. Because the pH 7.0 plot also received more sunlight, it is impossible to determine whether the increased growth was due to the pH or the extra sunlight. This is a confound.",
        "isCorrect": true
      },
      {
        "text": "It proves that sunlight is more important than pH for corn growth.",
        "rationale": "The study was not designed to compare sunlight and pH, and the confound prevents drawing conclusions about either factor in this plot.",
        "isCorrect": false
      }
    ],
    "challenge_tags": ["science-6"],
    "skillIntent": "experimental-design",
    "category": "Life Science"
  }
];
