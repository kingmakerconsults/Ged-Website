const SCIENCE_CURATED_IMAGE_BANK = {
  '/images/Science/ged_scince_fig_13_0001.png': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['rain-shadow', 'climate', 'weather'],
    qualityRank: 1,
    questions: [
      {
        questionText:
          'Moist air moves inland from the ocean in the direction of the prevailing winds. Based on the diagram, which labeled location would most likely receive the least precipitation?',
        answerOptions: [
          {
            text: 'Point A',
            isCorrect: false,
            rationale:
              'Point A is beside the ocean on the windward side, where moist air first arrives.',
          },
          {
            text: 'Point B',
            isCorrect: false,
            rationale:
              'Point B is on the rising side of the mountain, where cooling air is more likely to condense.',
          },
          {
            text: 'Point C',
            isCorrect: false,
            rationale:
              'Point C is near the mountain crest, not in the driest rain-shadow location.',
          },
          {
            text: 'Point E',
            isCorrect: true,
            rationale:
              'Correct. Point E is on the leeward side, where descending air is warmer and drier.',
          },
        ],
      },
    ],
  },
  '/images/Science/ged_scince_fig_8_0001.png': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['diagram', 'chart', 'image'],
    topicTags: ['orographic-lift', 'weather', 'temperature'],
    qualityRank: 2,
    questions: [
      {
        questionText:
          'Based on the diagram, why is the leeward side of the mountain drier than the windward side?',
        answerOptions: [
          {
            text: 'Air descends on the leeward side, warms, and holds more water vapor before rain can form.',
            isCorrect: true,
            rationale:
              'Correct. The diagram shows rising air cooling and releasing precipitation on the windward side, while descending air on the leeward side becomes warmer and drier.',
          },
          {
            text: 'Air on the leeward side is always colder than air on the windward side.',
            isCorrect: false,
            rationale:
              'The leeward side is typically warmer because the air is descending after losing moisture.',
          },
          {
            text: 'The mountain blocks sunlight from reaching the leeward side.',
            isCorrect: false,
            rationale:
              'The rain-shadow effect is caused by air movement and temperature change, not lack of sunlight.',
          },
          {
            text: 'Ocean water evaporates only on the windward side of the mountain.',
            isCorrect: false,
            rationale:
              'Evaporation from the ocean supplies moisture before the air reaches the mountain; it is not limited to one side of the mountain.',
          },
        ],
      },
      {
        questionText:
          'Which process shown in the diagram happens first as moist ocean air moves toward the mountain?',
        answerOptions: [
          {
            text: 'The air rises along the windward slope and cools.',
            isCorrect: true,
            rationale:
              'Correct. The diagram shows moist air forced upward first, which leads to cooling and later precipitation.',
          },
          {
            text: 'The air descends on the leeward side and becomes drier.',
            isCorrect: false,
            rationale:
              'That occurs after the air has already risen, cooled, and lost moisture on the windward side.',
          },
          {
            text: 'Groundwater collects at the base of the mountain.',
            isCorrect: false,
            rationale:
              'Groundwater is not the first atmospheric process shown in the diagram.',
          },
          {
            text: 'The ocean temperature falls below freezing.',
            isCorrect: false,
            rationale:
              'The diagram is about orographic lifting, not ocean freezing.',
          },
        ],
      },
    ],
  },
  '/images/Science/ged_sci_1_1024x847_0001.png': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['table', 'image', 'chart'],
    topicTags: ['hurricane', 'temperature', 'climate-data'],
    qualityRank: 3,
    questions: [
      {
        questionText:
          'What conclusion is best supported by the hurricane image and the sea-surface temperature data shown with it?',
        answerOptions: [
          {
            text: 'Warmer ocean water can provide energy that helps a hurricane strengthen.',
            isCorrect: true,
            rationale:
              'Correct. The paired image and data are meant to connect hurricane strength with warm ocean water as an energy source.',
          },
          {
            text: 'Hurricanes form only when ocean water is below freezing.',
            isCorrect: false,
            rationale:
              'The figure links hurricanes with warm water, not freezing conditions.',
          },
          {
            text: 'Ocean temperature has no effect on storm intensity.',
            isCorrect: false,
            rationale:
              'The purpose of the table is to show that water temperature is relevant to storm development.',
          },
          {
            text: 'Hurricanes get all of their energy from land surfaces.',
            isCorrect: false,
            rationale:
              'The image focuses on an ocean-based storm and water-temperature data, not land heating.',
          },
        ],
      },
      {
        questionText:
          'Why is the temperature table useful alongside the satellite view of the storm?',
        answerOptions: [
          {
            text: 'It gives numerical evidence that can be used to explain the storm conditions shown in the image.',
            isCorrect: true,
            rationale:
              'Correct. The table adds measured data that helps explain what is seen in the satellite image.',
          },
          {
            text: 'It identifies the names of every city in the storm path.',
            isCorrect: false,
            rationale:
              'A temperature table provides environmental measurements, not city labels.',
          },
          {
            text: 'It proves the storm has already ended.',
            isCorrect: false,
            rationale:
              'Temperature data can support analysis of storm conditions, but it does not by itself prove the storm has ended.',
          },
          {
            text: 'It replaces the need to interpret the satellite image at all.',
            isCorrect: false,
            rationale:
              'The two sources are strongest when interpreted together rather than used as substitutes for each other.',
          },
        ],
      },
    ],
  },
  '/images/Science/unclassified_0052.png': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['plate-tectonics', 'boundaries', 'geology'],
    qualityRank: 4,
    questions: [
      {
        questionText:
          'Which statement about a transform plate boundary is best supported by the diagram?',
        answerOptions: [
          {
            text: 'Two plates slide past each other, often causing earthquakes.',
            isCorrect: true,
            rationale:
              'Correct. A transform boundary involves sideways motion, which commonly produces earthquakes.',
          },
          {
            text: 'Magma rises and creates a mid-ocean ridge between separating plates.',
            isCorrect: false,
            rationale:
              'That describes a divergent boundary, not a transform boundary.',
          },
          {
            text: 'One plate sinks beneath another and forms a trench.',
            isCorrect: false,
            rationale: 'That describes a convergent subduction boundary.',
          },
          {
            text: 'Both plates stop moving once they touch.',
            isCorrect: false,
            rationale:
              'The diagram shows that plate boundaries are places of ongoing movement, not complete stillness.',
          },
        ],
      },
      {
        questionText:
          'If two oceanic plates move away from each other, which feature would most likely form according to the plate-boundary diagram?',
        answerOptions: [
          {
            text: 'A ridge where new crust forms',
            isCorrect: true,
            rationale:
              'Correct. Divergent oceanic boundaries are associated with ridges and the formation of new crust.',
          },
          {
            text: 'A folded mountain range caused by compression',
            isCorrect: false,
            rationale:
              'Folded mountain ranges are more associated with convergent collisions.',
          },
          {
            text: 'A fossil-fuel deposit created by plant decay',
            isCorrect: false,
            rationale:
              'That is not the tectonic feature represented by separating oceanic plates.',
          },
          {
            text: 'A stationary hotspot volcano unrelated to plate movement',
            isCorrect: false,
            rationale:
              'The question asks about a feature caused by plates moving apart, which is a ridge.',
          },
        ],
      },
    ],
  },
  '/images/Science/unclassified_0041.png': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['earth-layers', 'lithosphere', 'asthenosphere'],
    qualityRank: 5,
    questions: [
      {
        questionText:
          'According to the Earth-layer diagram, which layer lies directly beneath the lithosphere?',
        answerOptions: [
          {
            text: 'The asthenosphere',
            isCorrect: true,
            rationale:
              'Correct. The diagram places the asthenosphere below the rigid lithosphere.',
          },
          {
            text: 'The inner core',
            isCorrect: false,
            rationale: 'The inner core is far deeper than the lithosphere.',
          },
          {
            text: 'The troposphere',
            isCorrect: false,
            rationale:
              'The troposphere is part of the atmosphere, not Earth’s solid interior.',
          },
          {
            text: 'The hydrosphere',
            isCorrect: false,
            rationale:
              'The hydrosphere refers to Earth’s water, not the solid layer shown beneath the lithosphere.',
          },
        ],
      },
      {
        questionText:
          'Why do many diagrams of plate motion include the asthenosphere beneath the lithosphere?',
        answerOptions: [
          {
            text: 'Because the asthenosphere can flow slowly, allowing tectonic plates above it to move.',
            isCorrect: true,
            rationale:
              'Correct. The asthenosphere is shown as a softer layer that helps explain plate movement.',
          },
          {
            text: 'Because the asthenosphere is the coldest part of Earth.',
            isCorrect: false,
            rationale:
              'The asthenosphere is not identified as the coldest layer.',
          },
          {
            text: 'Because the asthenosphere is where all weather occurs.',
            isCorrect: false,
            rationale:
              'Weather occurs in the atmosphere, not in Earth’s interior.',
          },
          {
            text: 'Because the asthenosphere is made entirely of liquid water.',
            isCorrect: false,
            rationale:
              'The asthenosphere is part of Earth’s mantle, not liquid water.',
          },
        ],
      },
    ],
  },
  '/images/Science/unclassified_0032.png': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['water-cycle', 'earth-systems'],
    qualityRank: 6,
    questions: [
      {
        questionText:
          'In the water-cycle diagram, which process changes liquid water at the surface into water vapor in the air?',
        answerOptions: [
          {
            text: 'Evaporation',
            isCorrect: true,
            rationale:
              'Correct. Evaporation is the process that turns liquid water into water vapor.',
          },
          {
            text: 'Condensation',
            isCorrect: false,
            rationale:
              'Condensation is the reverse process, when water vapor cools into liquid droplets.',
          },
          {
            text: 'Runoff',
            isCorrect: false,
            rationale:
              'Runoff is surface movement of liquid water, not the change to vapor.',
          },
          {
            text: 'Precipitation',
            isCorrect: false,
            rationale:
              'Precipitation is water falling from clouds, not water changing from liquid to gas.',
          },
        ],
      },
      {
        questionText:
          'After precipitation falls on land in the diagram, which pathway returns some of that water directly across the ground toward larger bodies of water?',
        answerOptions: [
          {
            text: 'Runoff',
            isCorrect: true,
            rationale:
              'Correct. Runoff is the overland flow that carries water downhill toward streams, lakes, or oceans.',
          },
          {
            text: 'Photosynthesis',
            isCorrect: false,
            rationale:
              'Photosynthesis is a biological process, not the movement of surface water.',
          },
          {
            text: 'Radioactive decay',
            isCorrect: false,
            rationale: 'That process is unrelated to the hydrologic cycle.',
          },
          {
            text: 'Subduction',
            isCorrect: false,
            rationale:
              'Subduction is a plate-tectonics process, not a water-cycle process.',
          },
        ],
      },
    ],
  },
  '/images/Science/unclassified_0033.png': {
    subjectAreas: ['Earth & Space Science', 'Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['carbon-cycle', 'ecosystems', 'climate'],
    qualityRank: 7,
    questions: [
      {
        questionText:
          'According to the carbon-cycle diagram, which process removes carbon dioxide from the atmosphere and stores it in organic matter?',
        answerOptions: [
          {
            text: 'Photosynthesis',
            isCorrect: true,
            rationale:
              'Correct. Photosynthesis takes in atmospheric carbon dioxide and converts it into organic carbon in plants.',
          },
          {
            text: 'Auto and factory emissions',
            isCorrect: false,
            rationale:
              'Those emissions add carbon dioxide to the atmosphere rather than removing it.',
          },
          {
            text: 'Animal respiration',
            isCorrect: false,
            rationale:
              'Respiration releases carbon dioxide back to the atmosphere.',
          },
          {
            text: 'Combustion of fossil fuels',
            isCorrect: false,
            rationale: 'Burning fossil fuels adds carbon dioxide to the air.',
          },
        ],
      },
      {
        questionText:
          'Which change would most directly increase the amount of carbon dioxide entering the atmosphere in the diagram?',
        answerOptions: [
          {
            text: 'An increase in auto and factory emissions',
            isCorrect: true,
            rationale:
              'Correct. The diagram explicitly shows emissions from cars and factories sending carbon dioxide into the atmosphere.',
          },
          {
            text: 'An increase in plant photosynthesis',
            isCorrect: false,
            rationale:
              'Photosynthesis removes carbon dioxide from the air instead of increasing it.',
          },
          {
            text: 'Greater ocean uptake of carbon dioxide',
            isCorrect: false,
            rationale: 'Ocean uptake reduces atmospheric carbon dioxide.',
          },
          {
            text: 'A decrease in animal respiration',
            isCorrect: false,
            rationale:
              'A decrease in respiration would not increase carbon dioxide entering the atmosphere.',
          },
        ],
      },
    ],
  },
  '/images/Science/licensed_image_0009.jpg': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['earth-layers', 'atmosphere'],
    qualityRank: 8,
    questions: [
      {
        questionText:
          'If a student wants to identify the lowest layer of Earth’s atmosphere on the diagram, which layer should the student choose?',
        answerOptions: [
          {
            text: 'Troposphere',
            isCorrect: true,
            rationale:
              'Correct. The troposphere is the lowest major atmospheric layer shown above Earth’s surface.',
          },
          {
            text: 'Mesosphere',
            isCorrect: false,
            rationale:
              'The mesosphere lies above the stratosphere, not closest to Earth’s surface.',
          },
          {
            text: 'Outer core',
            isCorrect: false,
            rationale: 'The outer core is inside Earth, not in the atmosphere.',
          },
          {
            text: 'Inner core',
            isCorrect: false,
            rationale:
              'The inner core is the deepest part of Earth, not the lowest layer of the atmosphere.',
          },
        ],
      },
      {
        questionText:
          'How does the combined Earth-and-atmosphere diagram help a student compare the two systems?',
        answerOptions: [
          {
            text: 'It shows that Earth can be divided into internal layers and also surrounded by layered gases.',
            isCorrect: true,
            rationale:
              'Correct. The value of the combined figure is that it lets students compare layered structure inside Earth and above its surface.',
          },
          {
            text: 'It proves the atmosphere is made of solid rock.',
            isCorrect: false,
            rationale: 'The atmosphere is not shown as solid rock.',
          },
          {
            text: 'It shows that the crust is outside the atmosphere.',
            isCorrect: false,
            rationale:
              'The crust is part of Earth’s interior structure beneath the atmosphere.',
          },
          {
            text: 'It demonstrates that all layers have the same composition and temperature.',
            isCorrect: false,
            rationale:
              'The diagram distinguishes different layers because they are not all the same.',
          },
        ],
      },
    ],
  },
  '/images/Science/unclassified_0007.png': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['chart', 'graph', 'image'],
    topicTags: ['humidity', 'weather', 'line-graph'],
    qualityRank: 9,
    questions: [
      {
        questionText:
          'What variable is plotted on the y-axis of the relative humidity graph?',
        answerOptions: [
          {
            text: 'Humidity as a percentage',
            isCorrect: true,
            rationale:
              'Correct. The vertical axis is labeled with humidity percentages.',
          },
          {
            text: 'Air temperature in degrees Celsius',
            isCorrect: false,
            rationale:
              'The graph is specifically labeled as relative humidity, not temperature.',
          },
          {
            text: 'Wind speed in kilometers per hour',
            isCorrect: false,
            rationale: 'Wind speed is not the variable shown on the y-axis.',
          },
          {
            text: 'Rainfall in centimeters',
            isCorrect: false,
            rationale: 'The graph does not plot precipitation totals.',
          },
        ],
      },
      {
        questionText:
          'Why is this graph useful for studying weather over the eight-day period?',
        answerOptions: [
          {
            text: 'It makes it easier to see changes and trends in humidity from day to day.',
            isCorrect: true,
            rationale:
              'Correct. A line graph is useful because it shows how a measured quantity changes over time.',
          },
          {
            text: 'It proves that humidity never changes during a week.',
            isCorrect: false,
            rationale:
              'The point of the graph is to show variation, not no change.',
          },
          {
            text: 'It identifies the chemical composition of the atmosphere.',
            isCorrect: false,
            rationale:
              'The graph tracks humidity, not atmospheric composition.',
          },
          {
            text: 'It measures how deep groundwater is below the surface.',
            isCorrect: false,
            rationale: 'Groundwater depth is unrelated to the graph’s axes.',
          },
        ],
      },
    ],
  },
  '/images/Science/unclassified_0008.png': {
    subjectAreas: ['Earth & Space Science', 'Physical Science'],
    stimulusTypes: ['chart', 'graph', 'image'],
    topicTags: ['energy', 'trends', 'data-interpretation'],
    qualityRank: 10,
    questions: [
      {
        questionText:
          'Which energy source is projected to have the highest total consumption in 2040 on the graph?',
        answerOptions: [
          {
            text: 'Petroleum',
            isCorrect: true,
            rationale:
              'Correct. The petroleum line remains above the other energy-source lines at the end of the graph.',
          },
          {
            text: 'Nuclear',
            isCorrect: false,
            rationale: 'Nuclear is much lower than petroleum on the graph.',
          },
          {
            text: 'Other energy',
            isCorrect: false,
            rationale: 'Other energy does not reach the highest level shown.',
          },
          {
            text: 'None of the sources increase by 2040',
            isCorrect: false,
            rationale: 'Several lines increase across the time period shown.',
          },
        ],
      },
      {
        questionText:
          'What is the main advantage of showing all five energy sources on the same graph?',
        answerOptions: [
          {
            text: 'It allows direct comparison of long-term trends among different energy sources.',
            isCorrect: true,
            rationale:
              'Correct. A shared graph makes it easier to compare relative growth and overall levels across sources.',
          },
          {
            text: 'It guarantees every energy source will grow at the same rate.',
            isCorrect: false,
            rationale:
              'The graph compares trends; it does not force them to be equal.',
          },
          {
            text: 'It shows the exact location of each power plant in the world.',
            isCorrect: false,
            rationale: 'This is a consumption graph, not a geographic map.',
          },
          {
            text: 'It measures atmospheric humidity instead of energy use.',
            isCorrect: false,
            rationale:
              'The graph is explicitly about world energy consumption.',
          },
        ],
      },
    ],
  },
  '/images/Science/unclassified_0027.png': {
    subjectAreas: ['Earth & Space Science', 'Physical Science'],
    stimulusTypes: ['chart', 'graph', 'image'],
    topicTags: ['energy', 'consumption', 'pie-chart'],
    qualityRank: 11,
    questions: [
      {
        questionText:
          'According to the 2012 energy-consumption pie chart, what percentage of U.S. energy came from fossil fuels?',
        answerOptions: [
          {
            text: '81%',
            isCorrect: true,
            rationale:
              'Correct. Petroleum (36%), natural gas (27%), and coal (18%) add to 81%.',
          },
          {
            text: '36%',
            isCorrect: false,
            rationale: 'That is only the share from petroleum.',
          },
          {
            text: '45%',
            isCorrect: false,
            rationale:
              'That total is too low for the combined fossil-fuel share.',
          },
          {
            text: '95%',
            isCorrect: false,
            rationale:
              'Ninety-five is the total quadrillion Btu shown, not the fossil-fuel percentage.',
          },
        ],
      },
      {
        questionText:
          'Why does the figure include both a main pie chart and a breakdown of renewable energy sources?',
        answerOptions: [
          {
            text: 'To show both renewable energy’s share of total use and the different sources within that category.',
            isCorrect: true,
            rationale:
              'Correct. The main pie chart shows renewable energy as one category, and the expanded graphic shows what makes up that category.',
          },
          {
            text: 'To prove renewable energy was larger than all fossil fuels combined.',
            isCorrect: false,
            rationale:
              'The chart shows the opposite; fossil fuels make up the much larger share.',
          },
          {
            text: 'To show that nuclear power is a form of renewable energy.',
            isCorrect: false,
            rationale:
              'Nuclear electric power is shown as a separate category.',
          },
          {
            text: 'To replace the need for any percentages in the graphic.',
            isCorrect: false,
            rationale:
              'The figure still relies on percentages and totals for interpretation.',
          },
        ],
      },
    ],
  },
  '/images/Science/unclassified_0058.png': {
    subjectAreas: ['Earth & Space Science'],
    stimulusTypes: ['chart', 'graph', 'image'],
    topicTags: ['co2', 'emissions', 'environment'],
    qualityRank: 12,
  },
  '/images/Science/unclassified_0059.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['chart', 'graph', 'image'],
    topicTags: ['disease', 'line-graph', 'population-data'],
    qualityRank: 13,
  },
  '/images/Science/ged_scince_fig_3_0001.png': {
    subjectAreas: ['Physical Science'],
    stimulusTypes: ['table', 'chart', 'image'],
    topicTags: ['atomic-structure', 'ions', 'chemistry'],
    qualityRank: 14,
    questions: [
      {
        questionText:
          'In the element table, lithium has an atomic mass of 7 and 3 protons. What value should replace X for the number of neutrons in lithium?',
        answerOptions: [
          {
            text: '3',
            isCorrect: false,
            rationale:
              'Three is the number of protons, not the number of neutrons.',
          },
          {
            text: '4',
            isCorrect: true,
            rationale:
              'Correct. Neutrons equal atomic mass minus protons, so 7 − 3 = 4.',
          },
          {
            text: '7',
            isCorrect: false,
            rationale: 'Seven is the atomic mass, not the neutron count.',
          },
          {
            text: '10',
            isCorrect: false,
            rationale:
              'This does not match the relationship shown in the table.',
          },
        ],
      },
      {
        questionText:
          'The table shows aluminum forms a 3+ ion and combines with chlorine. Which formula should replace Z for the sample compound with chlorine?',
        answerOptions: [
          {
            text: 'AlCl',
            isCorrect: false,
            rationale:
              'One chlorine atom would not balance the 3+ charge on aluminum.',
          },
          {
            text: 'AlCl2',
            isCorrect: false,
            rationale:
              'Two chlorine atoms would create a total charge of 2−, not 3−.',
          },
          {
            text: 'AlCl3',
            isCorrect: true,
            rationale:
              'Correct. Three chloride ions balance the 3+ charge on aluminum.',
          },
          {
            text: 'Al3Cl',
            isCorrect: false,
            rationale:
              'This does not follow the charge pattern shown in the table.',
          },
        ],
      },
    ],
  },
  '/images/Science/earth_and_space_systems_0001.png': {
    subjectAreas: ['Physical Science'],
    stimulusTypes: ['table', 'chart', 'image'],
    topicTags: ['ph', 'indicators', 'chemistry'],
    qualityRank: 15,
  },
  '/images/Science/matter_0001.png': {
    subjectAreas: ['Physical Science'],
    stimulusTypes: ['diagram', 'chart', 'image'],
    topicTags: ['phase-diagram', 'matter', 'temperature', 'pressure'],
    qualityRank: 16,
  },
  '/images/Science/ged_scince_fig_2_0001.png': {
    subjectAreas: ['Physical Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['sound', 'sonar', 'echo'],
    qualityRank: 17,
  },
  '/images/Science/unclassified_0043.png': {
    subjectAreas: ['Physical Science'],
    stimulusTypes: ['table', 'diagram', 'image'],
    topicTags: ['endothermic', 'exothermic', 'energy-change'],
    qualityRank: 18,
  },
  '/images/Science/human_body_0003.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['immune-response', 'cells', 'biology'],
    qualityRank: 19,
    questions: [
      {
        questionText:
          'According to the immune-response diagram, which cells are produced after B-lymphocyte activation and release specific antibodies?',
        answerOptions: [
          {
            text: 'Macrophages',
            isCorrect: false,
            rationale:
              'Macrophages engulf pathogens earlier in the response but do not release specific antibodies.',
          },
          {
            text: 'Cytotoxic T cells',
            isCorrect: false,
            rationale:
              'Cytotoxic T cells destroy infected body cells rather than releasing antibodies.',
          },
          {
            text: 'Plasma cells',
            isCorrect: true,
            rationale:
              'Correct. The diagram shows activated B cells producing plasma cells that release antibodies.',
          },
          {
            text: 'Memory cells',
            isCorrect: false,
            rationale:
              'Memory cells help future responses but are not the cells that release antibodies in the diagram.',
          },
        ],
      },
    ],
  },
  '/images/Science/human_body_0004.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['heart', 'blood-flow', 'circulatory-system'],
    qualityRank: 20,
  },
  '/images/Science/human_body_0001.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['skin', 'anatomy', 'structure-function'],
    qualityRank: 21,
  },
  '/images/Science/human_body_0002.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['urinary-system', 'anatomy'],
    qualityRank: 22,
  },
  '/images/Science/licensed_image_0001.jpg': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['dna', 'base-pairing', 'molecular-biology'],
    qualityRank: 23,
  },
  '/images/Science/ged_science_0001.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['evolution', 'phylogenetic-tree', 'classification'],
    qualityRank: 24,
  },
  '/images/Science/ged_scince_fig_4_0001.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['photosynthesis', 'chloroplast', 'energy-transfer'],
    qualityRank: 25,
  },
  '/images/Science/unclassified_0021.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['food-pyramid', 'ecosystems', 'energy-flow'],
    qualityRank: 26,
  },
  '/images/Science/unclassified_0009.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['chart', 'graph', 'image'],
    topicTags: ['respiration', 'gas-composition', 'data-interpretation'],
    qualityRank: 27,
  },
  '/images/Science/unclassified_0011.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['chart', 'graph', 'image'],
    topicTags: ['oxygen-consumption', 'exercise', 'line-graph'],
    qualityRank: 28,
  },
  '/images/Science/dominance_genetics_0001.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['genetics', 'punnett-square', 'ratio'],
    qualityRank: 29,
    toolsAllowed: ['punnett-square'],
    questions: [
      {
        questionText:
          'The completed Punnett square shows offspring genotypes GG, Gg, Gg, and gg. What is the genotype ratio for this cross?',
        answerOptions: [
          {
            text: '1 GG : 2 Gg : 1 gg',
            isCorrect: true,
            rationale:
              'Correct. The four boxes show one GG, two Gg, and one gg outcome.',
          },
          {
            text: '3 GG : 1 gg',
            isCorrect: false,
            rationale:
              'The completed square includes two heterozygous outcomes, not three GG outcomes.',
          },
          {
            text: '2 GG : 1 Gg : 1 gg',
            isCorrect: false,
            rationale: 'Only one GG box appears in the completed square.',
          },
          {
            text: '1 GG : 1 Gg : 2 gg',
            isCorrect: false,
            rationale:
              'Only one recessive homozygous box appears in the completed square.',
          },
        ],
      },
    ],
  },
  '/images/Science/phenotype_0001.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'table', 'image'],
    topicTags: ['blood-type', 'genetics', 'codominance'],
    qualityRank: 30,
  },
  '/images/Science/mendelian_inheritance_0001.png': {
    subjectAreas: ['Life Science'],
    stimulusTypes: ['diagram', 'image'],
    topicTags: ['genetics', 'dihybrid', 'ratio'],
    qualityRank: 31,
  },
};

module.exports = {
  SCIENCE_CURATED_IMAGE_BANK,
};
