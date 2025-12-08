export const SCIENCE_QUESTIONS = {
  Science: {
    icon: 'BeakerIcon',
    categories: {
      'Life Science': {
        description:
          'Explore the fundamental principles of living organisms, from the cellular level to entire ecosystems.',
        topics: [
          {
            id: 'sci_life_science_basics',
            title: 'Life Science Basics',
            description:
              'Cell structure, function, photosynthesis, and cellular respiration.',
            questions: [
              {
                questionNumber: 1,
                type: 'text',
                challenge_tags: ['science-3'],
                passage:
                  "All living organisms are composed of cells, the basic units of life. The cell theory states that all living things are made of cells, cells are the basic unit of structure and function, and all cells come from pre-existing cells. Within a cell, organelles perform specific functions. The nucleus contains the cell's genetic material (DNA), and mitochondria are responsible for generating energy through cellular respiration.",
                question:
                  'According to the passage, what is the primary function of mitochondria?',
                answerOptions: [
                  {
                    text: "Storing the cell's genetic material.",
                    rationale: 'This is the function of the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'Controlling all cell activities.',
                    rationale: 'This is a broader function of the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'Generating energy through cellular respiration.',
                    rationale:
                      'Correct. Mitochondria are known as the powerhouses of the cell because they produce ATP through cellular respiration.',
                    isCorrect: true,
                  },
                  {
                    text: 'Breaking down cellular waste.',
                    rationale: 'This is primarily the function of lysosomes.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                type: 'knowledge',
                question: 'What is the primary function of the cell membrane?',
                answerOptions: [
                  {
                    text: 'To produce energy for the cell.',
                    rationale: 'This is the function of mitochondria.',
                    isCorrect: false,
                  },
                  {
                    text: 'To store genetic information.',
                    rationale: 'This is the function of the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'To control what enters and exits the cell.',
                    rationale:
                      'Correct. The cell membrane is selectively permeable and regulates the movement of substances.',
                    isCorrect: true,
                  },
                  {
                    text: 'To synthesize proteins.',
                    rationale: 'This is the function of ribosomes.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                type: 'knowledge',
                question: 'What process do plants use to make their own food?',
                answerOptions: [
                  {
                    text: 'Cellular respiration',
                    rationale:
                      'This is the process of breaking down glucose for energy.',
                    isCorrect: false,
                  },
                  {
                    text: 'Photosynthesis',
                    rationale:
                      'Correct. Plants use photosynthesis to convert light energy into chemical energy stored in glucose.',
                    isCorrect: true,
                  },
                  {
                    text: 'Fermentation',
                    rationale:
                      'This is an anaerobic process for producing energy.',
                    isCorrect: false,
                  },
                  {
                    text: 'Digestion',
                    rationale:
                      'This is the process of breaking down food, not making it.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'knowledge',
                question:
                  'Which organelle is responsible for protein synthesis?',
                answerOptions: [
                  {
                    text: 'Ribosome',
                    rationale:
                      'Correct. Ribosomes are the sites of protein synthesis in the cell.',
                    isCorrect: true,
                  },
                  {
                    text: 'Golgi apparatus',
                    rationale:
                      'The Golgi apparatus modifies and packages proteins.',
                    isCorrect: false,
                  },
                  {
                    text: 'Lysosome',
                    rationale: 'Lysosomes break down waste materials.',
                    isCorrect: false,
                  },
                  {
                    text: 'Vacuole',
                    rationale: 'Vacuoles store water and other materials.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                type: 'knowledge',
                question:
                  'What is the function of the cell wall in plant cells?',
                answerOptions: [
                  {
                    text: 'To produce energy',
                    rationale: 'This is not the function of the cell wall.',
                    isCorrect: false,
                  },
                  {
                    text: 'To provide structural support and protection',
                    rationale:
                      'Correct. The cell wall provides rigidity and protection to plant cells.',
                    isCorrect: true,
                  },
                  {
                    text: 'To control cell division',
                    rationale:
                      'This is not the primary function of the cell wall.',
                    isCorrect: false,
                  },
                  {
                    text: 'To synthesize proteins',
                    rationale: 'This is the function of ribosomes.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                type: 'knowledge',
                question: 'In genetics, what does a Punnett square predict?',
                answerOptions: [
                  {
                    text: 'The exact genetic makeup of an offspring.',
                    rationale:
                      'It predicts probability, not the exact outcome.',
                    isCorrect: false,
                  },
                  {
                    text: 'The probability of an offspring inheriting a particular trait.',
                    rationale:
                      'Correct. A Punnett square is a tool used to predict the possible genetic outcomes and their probabilities.',
                    isCorrect: true,
                  },
                  {
                    text: 'The number of chromosomes in a cell.',
                    rationale:
                      'This is determined by a karyotype, not a Punnett square.',
                    isCorrect: false,
                  },
                  {
                    text: 'The rate of cellular respiration.',
                    rationale: 'This is unrelated to Punnett squares.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['rla-6'],
                type: 'knowledge',
                question:
                  'Which part of the plant cell is primarily responsible for photosynthesis?',
                answerOptions: [
                  {
                    text: 'Nucleus',
                    rationale:
                      "The nucleus contains the cell's genetic material.",
                    isCorrect: false,
                  },
                  {
                    text: 'Mitochondrion',
                    rationale:
                      'Mitochondria are responsible for cellular respiration.',
                    isCorrect: false,
                  },
                  {
                    text: 'Chloroplast',
                    rationale:
                      'Correct. Chloroplasts contain chlorophyll, the pigment that captures light energy.',
                    isCorrect: true,
                  },
                  {
                    text: 'Cell Wall',
                    rationale: 'The cell wall provides structural support.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'Homeostasis is the state of steady internal, physical, and chemical conditions maintained by living systems. This is the condition of optimal functioning for the organism and includes many variables, such as body temperature and fluid balance, being kept within certain pre-set limits.',
                question:
                  'Shivering when you are cold is an example of the body trying to maintain homeostasis by:',
                answerOptions: [
                  {
                    text: 'generating heat through muscle contractions.',
                    rationale:
                      'Correct. Shivering is an involuntary muscle contraction that generates heat to raise body temperature.',
                    isCorrect: true,
                  },
                  {
                    text: "reducing the body's core temperature.",
                    rationale:
                      'It is an attempt to increase, not reduce, temperature.',
                    isCorrect: false,
                  },
                  {
                    text: 'saving energy.',
                    rationale: 'Shivering consumes energy.',
                    isCorrect: false,
                  },
                  {
                    text: 'increasing fluid balance.',
                    rationale:
                      'This is unrelated to the primary purpose of shivering.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'knowledge',
                question:
                  'In the human respiratory system, what is the primary function of the alveoli?',
                answerOptions: [
                  {
                    text: 'To filter dust and particles from the air.',
                    rationale:
                      'This is mainly done by hairs and mucus in the nasal passages and trachea.',
                    isCorrect: false,
                  },
                  {
                    text: 'To produce sound for speech.',
                    rationale:
                      'This is the function of the larynx (voice box).',
                    isCorrect: false,
                  },
                  {
                    text: 'To exchange oxygen and carbon dioxide with the blood.',
                    rationale:
                      'Correct. The alveoli are tiny air sacs where gas exchange occurs.',
                    isCorrect: true,
                  },
                  {
                    text: 'To pump air into and out of the lungs.',
                    rationale: 'This is the function of the diaphragm muscle.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'An allele is a variant form of a gene. If an individual has two identical alleles for a particular gene, they are:',
                answerOptions: [
                  {
                    text: 'Heterozygous for that gene.',
                    rationale:
                      'Heterozygous means having two different alleles.',
                    isCorrect: false,
                  },
                  {
                    text: 'Homozygous for that gene.',
                    rationale: "Correct. 'Homo-' means same.",
                    isCorrect: true,
                  },
                  {
                    text: 'Recessive for that gene.',
                    rationale:
                      'Recessive describes an allele that is masked by a dominant one.',
                    isCorrect: false,
                  },
                  {
                    text: 'Dominant for that gene.',
                    rationale:
                      'Dominant describes an allele that masks a recessive one.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'The nervous system is composed of two main parts: the Central Nervous System (CNS), which consists of the brain and spinal cord, and the Peripheral Nervous System (PNS), which consists of the nerves that branch out from the CNS to the rest of the body.',
                question:
                  'A nerve in your arm that sends a signal to your brain is part of which system?',
                answerOptions: [
                  {
                    text: 'The Central Nervous System (CNS)',
                    rationale: 'The CNS is the brain and spinal cord.',
                    isCorrect: false,
                  },
                  {
                    text: 'The Peripheral Nervous System (PNS)',
                    rationale:
                      'Correct. Nerves outside the brain and spinal cord are part of the PNS.',
                    isCorrect: true,
                  },
                  {
                    text: 'Both the CNS and PNS',
                    rationale: 'It is part of the PNS.',
                    isCorrect: false,
                  },
                  {
                    text: 'The Circulatory System',
                    rationale: 'This is a different body system.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'knowledge',
                question:
                  'What is the primary function of the digestive system?',
                answerOptions: [
                  {
                    text: 'To break down food and absorb nutrients.',
                    rationale:
                      'Correct. The digestive system processes food for energy and nutrients.',
                    isCorrect: true,
                  },
                  {
                    text: 'To eliminate waste from the blood.',
                    rationale:
                      'This is primarily the function of the urinary system.',
                    isCorrect: false,
                  },
                  {
                    text: 'To send signals throughout the body.',
                    rationale: 'This is the function of the nervous system.',
                    isCorrect: false,
                  },
                  {
                    text: 'To produce hormones.',
                    rationale: 'This is the function of the endocrine system.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  "Cellular respiration is a set of metabolic reactions and processes that take place in the cells of organisms to convert chemical energy from nutrients into adenosine triphosphate (ATP), and then release waste products. It is the process of 'burning' glucose for energy.",
                question: 'Cellular respiration occurs in which organelle?',
                answerOptions: [
                  {
                    text: 'Chloroplast',
                    rationale: 'Chloroplasts are for photosynthesis.',
                    isCorrect: false,
                  },
                  {
                    text: 'Nucleus',
                    rationale: 'The nucleus contains genetic material.',
                    isCorrect: false,
                  },
                  {
                    text: 'Mitochondria',
                    rationale:
                      "Correct. Mitochondria are known as the 'powerhouses' of the cell because this is where cellular respiration happens.",
                    isCorrect: true,
                  },
                  {
                    text: 'Ribosome',
                    rationale:
                      'Ribosomes are responsible for protein synthesis.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                type: 'knowledge',
                question:
                  'Which of the following is an example of an inherited trait in humans?',
                answerOptions: [
                  {
                    text: 'Eye color',
                    rationale:
                      'Correct. Eye color is determined by genes passed from parents to offspring.',
                    isCorrect: true,
                  },
                  {
                    text: 'A scar from an injury',
                    rationale:
                      'This is an acquired characteristic, not inherited.',
                    isCorrect: false,
                  },
                  {
                    text: 'The ability to speak English',
                    rationale: 'This is a learned behavior.',
                    isCorrect: false,
                  },
                  {
                    text: 'A tattoo',
                    rationale: 'This is an acquired body modification.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'What is the difference between a dominant and a recessive allele?',
                answerOptions: [
                  {
                    text: 'A dominant allele is always better than a recessive allele.',
                    rationale: 'Dominance does not imply superiority.',
                    isCorrect: false,
                  },
                  {
                    text: 'A dominant allele will mask the expression of a recessive allele.',
                    rationale:
                      'Correct. If a dominant allele is present, its trait will be expressed.',
                    isCorrect: true,
                  },
                  {
                    text: 'Recessive alleles are more common in the population.',
                    rationale:
                      'Dominance is not related to how common an allele is.',
                    isCorrect: false,
                  },
                  {
                    text: 'Dominant alleles are only found in homozygous individuals.',
                    rationale:
                      'Dominant alleles are expressed in both homozygous and heterozygous individuals.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_ecosystems_environment',
            title: 'Ecosystems & Environment',
            description:
              'Ecology, food webs, and human impact on the environment.',
            questions: [
              {
                questionNumber: 1,
                type: 'text',
                passage:
                  'An ecosystem consists of all the living organisms (biotic factors) in a particular area, along with all the non-living (abiotic) components of the environment, such as sunlight, soil, water, and temperature. These components are linked together through nutrient cycles and energy flows.',
                question:
                  'Which of the following is an example of an abiotic factor in an ecosystem?',
                answerOptions: [
                  {
                    text: 'A tree',
                    rationale: 'A tree is a living organism (biotic).',
                    isCorrect: false,
                  },
                  {
                    text: 'A fungus',
                    rationale: 'A fungus is a living organism (biotic).',
                    isCorrect: false,
                  },
                  {
                    text: 'The amount of annual rainfall',
                    rationale:
                      'Correct. Rainfall is a non-living component of the environment.',
                    isCorrect: true,
                  },
                  {
                    text: 'An insect',
                    rationale: 'An insect is a living organism (biotic).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['rla-6'],
                type: 'knowledge',
                question:
                  'In a food web, an organism that produces its own food, usually through photosynthesis, is called a:',
                answerOptions: [
                  {
                    text: 'Consumer',
                    rationale: 'Consumers eat other organisms.',
                    isCorrect: false,
                  },
                  {
                    text: 'Producer',
                    rationale:
                      'Correct. Producers, like plants, form the base of the food web.',
                    isCorrect: true,
                  },
                  {
                    text: 'Decomposer',
                    rationale: 'Decomposers break down dead organic matter.',
                    isCorrect: false,
                  },
                  {
                    text: 'Scavenger',
                    rationale: 'Scavengers are a type of consumer.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['science-3', 'science-2'],
                type: 'image',
                imageUrl: '/Images/Science/ged-scince-fig-12.png',
                question:
                  'In this food web, which organism is a primary consumer?',
                answerOptions: [
                  {
                    text: 'The grass',
                    rationale: 'The grass is a producer.',
                    isCorrect: false,
                  },
                  {
                    text: 'The rabbit',
                    rationale:
                      'Correct. The rabbit eats the producer (grass), making it a primary consumer.',
                    isCorrect: true,
                  },
                  {
                    text: 'The hawk',
                    rationale:
                      'The hawk eats other consumers, making it a secondary or tertiary consumer.',
                    isCorrect: false,
                  },
                  {
                    text: 'The fungi',
                    rationale: 'The fungi are decomposers.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['science-2', 'science-3'],
                type: 'text',
                passage:
                  'The energy pyramid illustrates the flow of energy from one trophic (feeding) level to the next in an ecosystem. A large amount of energy is lost at each level, usually as heat. Typically, only about 10% of the energy from one level is transferred to the level above it.',
                question:
                  'If the producers in an ecosystem contain 10,000 units of energy, approximately how much energy would be available to the secondary consumers?',
                answerOptions: [
                  {
                    text: '10,000 units',
                    rationale: 'This is the energy at the producer level.',
                    isCorrect: false,
                  },
                  {
                    text: '1,000 units',
                    rationale:
                      'This is the energy available to the primary consumers (10% of 10,000).',
                    isCorrect: false,
                  },
                  {
                    text: '100 units',
                    rationale:
                      'Correct. Secondary consumers are two levels up. 10% of 10,000 is 1,000 (primary consumers), and 10% of 1,000 is 100.',
                    isCorrect: true,
                  },
                  {
                    text: '10 units',
                    rationale:
                      'This would be the energy available to tertiary consumers.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                type: 'knowledge',
                question:
                  'The process by which water evaporates from oceans, condenses into clouds, falls as precipitation, and returns to the ocean is known as:',
                answerOptions: [
                  {
                    text: 'The carbon cycle',
                    rationale:
                      'The carbon cycle describes the movement of carbon.',
                    isCorrect: false,
                  },
                  {
                    text: 'The nitrogen cycle',
                    rationale:
                      'The nitrogen cycle describes the movement of nitrogen.',
                    isCorrect: false,
                  },
                  {
                    text: 'The water cycle',
                    rationale:
                      'Correct. This describes the continuous movement of water on, above, and below the surface of the Earth.',
                    isCorrect: true,
                  },
                  {
                    text: 'Photosynthesis',
                    rationale:
                      'Photosynthesis is a process used by plants to create energy.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['rla-7', 'science-4'],
                type: 'text',
                passage:
                  'Human activities, such as the burning of fossil fuels (coal, oil, and natural gas), release large amounts of carbon dioxide into the atmosphere. Carbon dioxide is a greenhouse gas, which traps heat and contributes to the warming of the planet, a phenomenon known as global warming or climate change.',
                question:
                  'According to the passage, what is the primary cause of the recent increase in atmospheric carbon dioxide?',
                answerOptions: [
                  {
                    text: 'Volcanic eruptions',
                    rationale:
                      'While volcanoes release CO2, human activities are the primary cause of the recent increase.',
                    isCorrect: false,
                  },
                  {
                    text: 'Deforestation',
                    rationale:
                      'Deforestation contributes, but the burning of fossil fuels is the primary cause mentioned.',
                    isCorrect: false,
                  },
                  {
                    text: 'The burning of fossil fuels',
                    rationale:
                      'Correct. The passage explicitly states this as the main source.',
                    isCorrect: true,
                  },
                  {
                    text: 'The process of photosynthesis',
                    rationale:
                      'Photosynthesis removes carbon dioxide from the atmosphere.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'A symbiotic relationship where one organism benefits and the other is neither harmed nor helped is called:',
                answerOptions: [
                  {
                    text: 'Mutualism',
                    rationale: 'In mutualism, both organisms benefit.',
                    isCorrect: false,
                  },
                  {
                    text: 'Parasitism',
                    rationale:
                      'In parasitism, one organism benefits and the other is harmed.',
                    isCorrect: false,
                  },
                  {
                    text: 'Commensalism',
                    rationale:
                      'Correct. A classic example is a barnacle on a whale.',
                    isCorrect: true,
                  },
                  {
                    text: 'Competition',
                    rationale:
                      'Competition is a relationship where two or more organisms vie for the same limited resources.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'Biodiversity refers to the variety of life in a particular habitat or ecosystem. High biodiversity is often a sign of a healthy ecosystem. It increases ecosystem productivity and resilience, meaning the ecosystem is better able to withstand and recover from disasters.',
                question:
                  'What is the primary benefit of high biodiversity in an ecosystem?',
                answerOptions: [
                  {
                    text: 'It ensures that all organisms are the same size.',
                    rationale: 'Biodiversity means variety, not uniformity.',
                    isCorrect: false,
                  },
                  {
                    text: "It increases the ecosystem's stability and resilience.",
                    rationale:
                      'Correct. The passage states that high biodiversity makes an ecosystem more resilient.',
                    isCorrect: true,
                  },
                  {
                    text: 'It decreases the total number of organisms.',
                    rationale:
                      'High biodiversity usually correlates with a high number of organisms.',
                    isCorrect: false,
                  },
                  {
                    text: 'It simplifies the food web.',
                    rationale:
                      'High biodiversity leads to more complex food webs.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                challenge_tags: ['science-3'],
                type: 'knowledge',
                question:
                  'What is the main role of decomposers, such as bacteria and fungi, in an ecosystem?',
                answerOptions: [
                  {
                    text: 'To produce energy from sunlight.',
                    rationale: 'This is the role of producers.',
                    isCorrect: false,
                  },
                  {
                    text: 'To consume other organisms for energy.',
                    rationale: 'This is the role of consumers.',
                    isCorrect: false,
                  },
                  {
                    text: 'To break down dead organic matter and return nutrients to the soil.',
                    rationale:
                      'Correct. Decomposers are essential for recycling nutrients.',
                    isCorrect: true,
                  },
                  {
                    text: 'To control the population of primary consumers.',
                    rationale:
                      'This is a role of secondary consumers (predators).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                challenge_tags: ['science-3'],
                type: 'text',
                passage:
                  'Natural selection is the process through which populations of living organisms adapt and change. Individuals in a population are naturally variable, meaning that they are all different in some ways. This variation means that some individuals have traits better suited to the environment than others. Individuals with adaptive traits are more likely to survive and reproduce, passing those traits on to their offspring.',
                question:
                  'Which of the following is a key requirement for natural selection to occur?',
                answerOptions: [
                  {
                    text: 'All individuals in a population must be identical.',
                    rationale:
                      'Variation is necessary for natural selection to act upon.',
                    isCorrect: false,
                  },
                  {
                    text: 'The environment must remain constant over time.',
                    rationale:
                      'Environmental changes are often the driving force of natural selection.',
                    isCorrect: false,
                  },
                  {
                    text: 'There must be variation in heritable traits within a population.',
                    rationale:
                      "Correct. Without variation, some individuals would not be better suited than others, and there would be nothing to 'select'.",
                    isCorrect: true,
                  },
                  {
                    text: 'Organisms must consciously choose to adapt.',
                    rationale:
                      'Adaptation through natural selection is a passive process, not a conscious choice.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-3', 'social-5'],
                type: 'knowledge',
                question:
                  'An invasive species is an organism that is not native to a specific location and has a tendency to spread to a degree believed to cause damage to the environment, economy, or human health. Why are invasive species often so successful in new ecosystems?',
                answerOptions: [
                  {
                    text: 'Because they are usually larger than native species.',
                    rationale: 'Size is not the determining factor.',
                    isCorrect: false,
                  },
                  {
                    text: 'Because they often lack natural predators in the new environment.',
                    rationale:
                      'Correct. Without predators to control their population, they can multiply rapidly and outcompete native species.',
                    isCorrect: true,
                  },
                  {
                    text: 'Because they only eat food that native species do not.',
                    rationale:
                      'They often compete directly with native species for food.',
                    isCorrect: false,
                  },
                  {
                    text: 'Because they reproduce more slowly than native species.',
                    rationale: 'They often reproduce more quickly.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'knowledge',
                question:
                  'The gradual process by which ecosystems change and develop over time is called:',
                answerOptions: [
                  {
                    text: 'Evolution',
                    rationale:
                      'Evolution refers to the change in heritable traits of populations over generations.',
                    isCorrect: false,
                  },
                  {
                    text: 'Succession',
                    rationale:
                      'Correct. Ecological succession is the process of change in the species structure of an ecological community over time.',
                    isCorrect: true,
                  },
                  {
                    text: 'Homeostasis',
                    rationale:
                      'Homeostasis is the maintenance of a stable internal environment.',
                    isCorrect: false,
                  },
                  {
                    text: 'Photosynthesis',
                    rationale:
                      'This is the process of creating energy from sunlight.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                challenge_tags: ['science-4', 'science-6'],
                type: 'text',
                passage:
                  'Acid rain is caused by emissions of sulfur dioxide and nitrogen oxide, which react with the water molecules in the atmosphere to produce acids. These emissions primarily come from the burning of fossil fuels in power plants and vehicles. Acid rain can have harmful effects on soil, forests, and aquatic ecosystems.',
                question: 'What is the primary cause of acid rain?',
                answerOptions: [
                  {
                    text: 'An increase in the pH of rainwater.',
                    rationale:
                      'Acid rain involves a decrease in pH (making it more acidic).',
                    isCorrect: false,
                  },
                  {
                    text: 'Pollutants from burning fossil fuels reacting with water in the atmosphere.',
                    rationale:
                      'Correct. The passage identifies sulfur dioxide and nitrogen oxide from fossil fuels as the primary cause.',
                    isCorrect: true,
                  },
                  {
                    text: 'The natural carbonation of rainwater.',
                    rationale:
                      'Natural rainwater is slightly acidic, but acid rain is much more so due to pollution.',
                    isCorrect: false,
                  },
                  {
                    text: 'Runoff from agricultural fertilizers.',
                    rationale:
                      'Fertilizer runoff causes other problems, like eutrophication, but not acid rain.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'A food chain shows a single pathway of energy transfer. Which of the following is a correct and logical food chain?',
                answerOptions: [
                  {
                    text: 'Hawk -> Snake -> Mouse -> Grass',
                    rationale: 'This food chain is backwards.',
                    isCorrect: false,
                  },
                  {
                    text: 'Grass -> Mouse -> Snake -> Hawk',
                    rationale:
                      'Correct. This shows the correct flow of energy from producer to primary consumer to secondary consumer to tertiary consumer.',
                    isCorrect: true,
                  },
                  {
                    text: 'Mouse -> Grass -> Hawk -> Snake',
                    rationale: 'This order is illogical.',
                    isCorrect: false,
                  },
                  {
                    text: 'Sun -> Grass -> Hawk -> Mouse',
                    rationale: 'This order is illogical.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'knowledge',
                question: "The concept of a 'carbon footprint' refers to:",
                answerOptions: [
                  {
                    text: 'The total amount of carbon stored in the soil.',
                    rationale:
                      'This is part of the carbon cycle, but not a carbon footprint.',
                    isCorrect: false,
                  },
                  {
                    text: 'The total amount of greenhouse gases generated by our actions.',
                    rationale:
                      "Correct. It is a measure of an individual's or organization's impact on the climate.",
                    isCorrect: true,
                  },
                  {
                    text: 'The physical mark left by carbon-based life forms.',
                    rationale:
                      'This is a literal interpretation, not the correct meaning.',
                    isCorrect: false,
                  },
                  {
                    text: 'The number of trees planted to offset carbon emissions.',
                    rationale:
                      'This is a way to reduce a carbon footprint, not the footprint itself.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      'Physical Science': {
        description:
          'Investigate the principles of chemistry and physics that govern the world around us.',
        topics: [
          {
            id: 'sci_chem_fundamentals',
            title: 'Chemistry Fundamentals',
            description:
              'Properties of matter, atoms, elements, and the periodic table.',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'All matter is made up of atoms, which are the smallest units of an element that maintain the properties of that element. Atoms are composed of three main subatomic particles: protons, neutrons, and electrons. Protons have a positive charge, neutrons have no charge, and electrons have a negative charge.',
                question: 'Which subatomic particle has a positive charge?',
                answerOptions: [
                  {
                    text: 'Proton',
                    rationale:
                      'Correct. The passage states that protons have a positive charge.',
                    isCorrect: true,
                  },
                  {
                    text: 'Neutron',
                    rationale: 'Neutrons have no charge.',
                    isCorrect: false,
                  },
                  {
                    text: 'Electron',
                    rationale: 'Electrons have a negative charge.',
                    isCorrect: false,
                  },
                  {
                    text: 'Atom',
                    rationale:
                      'An atom is the whole unit, not a subatomic particle.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'In an atom, which two subatomic particles are found in the nucleus?',
                answerOptions: [
                  {
                    text: 'Protons and electrons',
                    rationale: 'Electrons orbit the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'Protons and neutrons',
                    rationale:
                      'Correct. The nucleus at the center of the atom contains the protons and neutrons.',
                    isCorrect: true,
                  },
                  {
                    text: 'Neutrons and electrons',
                    rationale: 'Electrons orbit the nucleus.',
                    isCorrect: false,
                  },
                  {
                    text: 'Only protons',
                    rationale:
                      'The nucleus also contains neutrons (except for the most common isotope of hydrogen).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'The periodic table of elements arranges all known elements in order of increasing atomic number. The atomic number of an element is equal to the number of protons in the nucleus of an atom of that element. This number is unique to each element.',
                question:
                  'The identity of an element is determined by its number of:',
                answerOptions: [
                  {
                    text: 'Neutrons',
                    rationale:
                      'The number of neutrons can vary, creating isotopes.',
                    isCorrect: false,
                  },
                  {
                    text: 'Electrons',
                    rationale:
                      'The number of electrons can change when an atom forms an ion.',
                    isCorrect: false,
                  },
                  {
                    text: 'Protons',
                    rationale:
                      'Correct. The passage states that the atomic number, which is the number of protons, is unique to each element.',
                    isCorrect: true,
                  },
                  {
                    text: 'Energy levels',
                    rationale: 'The number of energy levels can change.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'image',
                imageUrl:
                  'Images/Social Studies/Social Studies/licensed-image (5).jpg',
                question:
                  'This image shows a typical entry on the periodic table for the element Carbon (C). What is the atomic number of Carbon?',
                answerOptions: [
                  {
                    text: '12.011',
                    rationale: 'This is the atomic mass.',
                    isCorrect: false,
                  },
                  {
                    text: '6',
                    rationale:
                      'Correct. The number at the top is the atomic number.',
                    isCorrect: true,
                  },
                  {
                    text: 'C',
                    rationale: 'This is the element symbol.',
                    isCorrect: false,
                  },
                  {
                    text: 'Carbon',
                    rationale: 'This is the element name.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'What is the difference between an element and a compound?',
                answerOptions: [
                  {
                    text: 'An element is a liquid, while a compound is a solid.',
                    rationale:
                      'Elements and compounds can exist in any state of matter.',
                    isCorrect: false,
                  },
                  {
                    text: 'An element consists of only one type of atom, while a compound consists of two or more different types of atoms chemically bonded together.',
                    rationale:
                      'Correct. For example, oxygen (O) is an element, while water (Hâ‚‚O) is a compound.',
                    isCorrect: true,
                  },
                  {
                    text: 'Elements are found in nature, while compounds are man-made.',
                    rationale:
                      'Many compounds, like water and carbon dioxide, are found in nature.',
                    isCorrect: false,
                  },
                  {
                    text: 'There is no difference.',
                    rationale: 'There is a fundamental chemical difference.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'A chemical reaction is a process that leads to the chemical transformation of one set of chemical substances to another. The substances initially involved in a chemical reaction are called reactants, and the substances produced are called products. The law of conservation of mass states that mass is neither created nor destroyed in a chemical reaction.',
                question:
                  'If 10 grams of reactant A are combined with 5 grams of reactant B in a sealed container and react completely, what will be the total mass of the products?',
                answerOptions: [
                  {
                    text: '5 grams',
                    rationale:
                      'This would violate the law of conservation of mass.',
                    isCorrect: false,
                  },
                  {
                    text: '10 grams',
                    rationale:
                      'This would violate the law of conservation of mass.',
                    isCorrect: false,
                  },
                  {
                    text: '15 grams',
                    rationale:
                      'Correct. According to the law of conservation of mass, the total mass of the reactants must equal the total mass of the products.',
                    isCorrect: true,
                  },
                  {
                    text: 'It is impossible to tell.',
                    rationale:
                      'The law of conservation of mass allows us to determine the mass.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'knowledge',
                question:
                  'Which of the following represents a physical change, not a chemical change?',
                answerOptions: [
                  {
                    text: 'Burning wood',
                    rationale:
                      'Burning is a chemical change (combustion) that creates new substances like ash and smoke.',
                    isCorrect: false,
                  },
                  {
                    text: 'Rusting iron',
                    rationale:
                      'Rusting is a chemical change (oxidation) that creates a new substance, iron oxide.',
                    isCorrect: false,
                  },
                  {
                    text: 'Boiling water',
                    rationale:
                      'Correct. Boiling water changes its state from liquid to gas (steam), but it is still chemically Hâ‚‚O. This is a physical change.',
                    isCorrect: true,
                  },
                  {
                    text: 'Baking a cake',
                    rationale:
                      'Baking involves chemical reactions that change the ingredients into a new substance.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                type: 'text',
                passage:
                  'The pH scale measures how acidic or basic a substance is. The scale ranges from 0 to 14. A pH of 7 is neutral. A pH less than 7 indicates acidity, while a pH greater than 7 indicates a base (alkalinity).',
                question: 'A substance with a pH of 3 is considered:',
                answerOptions: [
                  {
                    text: 'Acidic',
                    rationale: 'Correct. A pH less than 7 is acidic.',
                    isCorrect: true,
                  },
                  {
                    text: 'Basic (alkaline)',
                    rationale: 'A pH greater than 7 is basic.',
                    isCorrect: false,
                  },
                  {
                    text: 'Neutral',
                    rationale: 'A pH of 7 is neutral.',
                    isCorrect: false,
                  },
                  {
                    text: 'A solid',
                    rationale: 'pH measures acidity, not state of matter.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'knowledge',
                question:
                  'What is a substance that is dissolved in another substance to form a solution called?',
                answerOptions: [
                  {
                    text: 'Solvent',
                    rationale:
                      'The solvent is the substance that does the dissolving (e.g., water).',
                    isCorrect: false,
                  },
                  {
                    text: 'Solute',
                    rationale:
                      'Correct. The solute is the substance that is dissolved (e.g., salt in saltwater).',
                    isCorrect: true,
                  },
                  {
                    text: 'Mixture',
                    rationale:
                      'A mixture is the combination of two or more substances that are not chemically bonded.',
                    isCorrect: false,
                  },
                  {
                    text: 'Element',
                    rationale:
                      'An element is a pure substance consisting of only one type of atom.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                question:
                  "In the chemical formula for water, Hâ‚‚O, what does the subscript '2' indicate?",
                answerOptions: [
                  {
                    text: 'There are two water molecules.',
                    rationale:
                      'A coefficient in front of the formula would indicate the number of molecules.',
                    isCorrect: false,
                  },
                  {
                    text: 'There are two oxygen atoms.',
                    rationale: "The '2' is next to the 'H', not the 'O'.",
                    isCorrect: false,
                  },
                  {
                    text: 'There are two hydrogen atoms.',
                    rationale:
                      'Correct. The subscript indicates the number of atoms of the element immediately preceding it.',
                    isCorrect: true,
                  },
                  {
                    text: 'The molecule has a charge of +2.',
                    rationale: 'A superscript would indicate the charge.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  "The columns of the periodic table are called 'groups' or 'families.' Elements in the same group have similar:",
                answerOptions: [
                  {
                    text: 'Atomic masses',
                    rationale: 'Atomic masses increase as you go down a group.',
                    isCorrect: false,
                  },
                  {
                    text: 'Chemical properties',
                    rationale:
                      'Correct. Elements in the same group have the same number of valence electrons, which gives them similar chemical behaviors.',
                    isCorrect: true,
                  },
                  {
                    text: 'Numbers of protons',
                    rationale: 'The number of protons increases down a group.',
                    isCorrect: false,
                  },
                  {
                    text: 'Numbers of energy shells',
                    rationale:
                      'The number of energy shells increases as you go down a group.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'A covalent bond is a chemical bond that involves the sharing of electron pairs between atoms. An ionic bond is formed when one atom transfers one or more electrons to another atom, creating ionsâ€”charged atoms that are then attracted to each other.',
                question:
                  'What is the key difference between a covalent bond and an ionic bond?',
                answerOptions: [
                  {
                    text: 'Covalent bonds involve sharing electrons, while ionic bonds involve transferring electrons.',
                    rationale:
                      'Correct. The passage defines this as the fundamental difference.',
                    isCorrect: true,
                  },
                  {
                    text: 'Covalent bonds are stronger than ionic bonds.',
                    rationale:
                      'The relative strength can vary depending on the specific atoms involved.',
                    isCorrect: false,
                  },
                  {
                    text: 'Covalent bonds form between metals, and ionic bonds form between nonmetals.',
                    rationale:
                      'Ionic bonds typically form between a metal and a nonmetal, while covalent bonds form between nonmetals.',
                    isCorrect: false,
                  },
                  {
                    text: 'Covalent bonds create ions, while ionic bonds do not.',
                    rationale:
                      'This is the opposite of what the passage states.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                type: 'knowledge',
                question: 'Which of the following is a property of a solid?',
                answerOptions: [
                  {
                    text: 'It takes the shape of its container.',
                    rationale: 'This is a property of liquids and gases.',
                    isCorrect: false,
                  },
                  {
                    text: 'It has a definite shape and a definite volume.',
                    rationale:
                      'Correct. The particles in a solid are tightly packed and vibrate in fixed positions.',
                    isCorrect: true,
                  },
                  {
                    text: 'It is easily compressible.',
                    rationale: 'This is a property of gases.',
                    isCorrect: false,
                  },
                  {
                    text: 'It has no definite shape or volume.',
                    rationale: 'This is a property of gases.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'A substance that speeds up a chemical reaction without being consumed in the reaction is called a(n):',
                answerOptions: [
                  {
                    text: 'Reactant',
                    rationale: 'A reactant is consumed in the reaction.',
                    isCorrect: false,
                  },
                  {
                    text: 'Product',
                    rationale: 'A product is formed by the reaction.',
                    isCorrect: false,
                  },
                  {
                    text: 'Catalyst',
                    rationale:
                      'Correct. Catalysts lower the activation energy of a reaction, making it happen faster.',
                    isCorrect: true,
                  },
                  {
                    text: 'Inhibitor',
                    rationale: 'An inhibitor slows down a chemical reaction.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'text',
                passage:
                  'Isotopes are variants of a particular chemical element which differ in neutron number, and consequently in mass number. All isotopes of a given element have the same number of protons in each atom.',
                question:
                  'Carbon-12 and Carbon-14 are isotopes of carbon. What is different between an atom of Carbon-12 and an atom of Carbon-14?',
                answerOptions: [
                  {
                    text: 'The number of protons.',
                    rationale:
                      'They are both carbon, so they must have the same number of protons (6).',
                    isCorrect: false,
                  },
                  {
                    text: 'The number of electrons.',
                    rationale:
                      'In a neutral atom, the number of electrons equals the number of protons.',
                    isCorrect: false,
                  },
                  {
                    text: 'The number of neutrons.',
                    rationale:
                      'Correct. Carbon-14 has two more neutrons than Carbon-12, which accounts for the difference in their mass numbers.',
                    isCorrect: true,
                  },
                  {
                    text: 'Their chemical symbol.',
                    rationale: 'They both have the chemical symbol C.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_chem_equations_balancing',
            title: 'Chemical Equations & Balancing',
            description: 'Law of conservation of mass and balancing equations.',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'A chemical equation shows reactants and products. To satisfy the Law of Conservation of Mass, equations must be balanced so each element has the same number of atoms on both sides.',
                question:
                  'Balance: $\\text{H}_2 + \\text{O}_2 \\rightarrow \\text{H}_2\\text{O}$',
                answerOptions: [
                  {
                    text: '$\\text{H}_2 + \\text{O}_2 \\rightarrow \\text{H}_2\\text{O}$',
                    rationale: 'Unbalanced: oxygen atoms differ.',
                    isCorrect: false,
                  },
                  {
                    text: '$2\\text{H}_2 + \\text{O}_2 \\rightarrow 2 \\text{H}_2\\text{O}$',
                    rationale: 'Correct. 4 H and 2 O on each side.',
                    isCorrect: true,
                  },
                  {
                    text: '$\\text{H}_2 + 2\\text{O}_2 \\rightarrow \\text{H}_2\\text{O}_2$',
                    rationale: 'Changes product; still unbalanced.',
                    isCorrect: false,
                  },
                  {
                    text: '$4\\text{H}_2 + 2\\text{O}_2 \\rightarrow 4 \\text{H}_2\\text{O}$',
                    rationale: 'Balanced but not simplest whole-number ratio.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'Coefficient in balanced: $2\\text{Na} + \\text{Cl}_2 \\rightarrow 2\\text{NaCl}$ for NaCl?',
                answerOptions: [
                  {
                    text: '1',
                    rationale: 'Equation shows 2.',
                    isCorrect: false,
                  },
                  {
                    text: '2',
                    rationale: 'Correct. Two units of product.',
                    isCorrect: true,
                  },
                  { text: '3', rationale: 'Not present.', isCorrect: false },
                  { text: '4', rationale: 'Not present.', isCorrect: false },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Combustion of methane produces carbon dioxide and water.',
                question:
                  'Balance: $\\text{CH}_4 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$',
                answerOptions: [
                  {
                    text: '$\\text{CH}_4 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$',
                    rationale: 'Unbalanced H & O.',
                    isCorrect: false,
                  },
                  {
                    text: '$\\text{CH}_4 + 2\\text{O}_2 \rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}$',
                    rationale: 'Correct.',
                    isCorrect: true,
                  },
                  {
                    text: '$2\\text{CH}_4 + 3\\text{O}_2 \rightarrow 2\\text{CO}_2 + 4\\text{H}_2\\text{O}$',
                    rationale: 'Balanced but not simplest ratio.',
                    isCorrect: false,
                  },
                  {
                    text: '$\\text{CH}_4 + 3\\text{O}_2 \rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}$',
                    rationale: 'O atoms mismatch.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'Reaction type: $\\text{AB} \rightarrow \\text{A} + \\text{B}$?',
                answerOptions: [
                  {
                    text: 'Synthesis',
                    rationale: 'Reverse pattern.',
                    isCorrect: false,
                  },
                  {
                    text: 'Decomposition',
                    rationale: 'Correct.',
                    isCorrect: true,
                  },
                  {
                    text: 'Single replacement',
                    rationale: 'Different pattern.',
                    isCorrect: false,
                  },
                  {
                    text: 'Double replacement',
                    rationale: 'Requires two compounds.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Synthesis combines simpler substances to make a compound.',
                question:
                  'Balance: $\\text{Al} + \\text{O}_2 \rightarrow \\text{Al}_2\\text{O}_3$',
                answerOptions: [
                  {
                    text: '$\\text{Al} + \\text{O}_2 \rightarrow \\text{Al}_2\\text{O}_3$',
                    rationale: 'Unbalanced Al & O.',
                    isCorrect: false,
                  },
                  {
                    text: '$2\\text{Al} + 3\\text{O}_2 \rightarrow \\text{Al}_2\\text{O}_3$',
                    rationale: 'O mismatch.',
                    isCorrect: false,
                  },
                  {
                    text: '$4\\text{Al} + 3\\text{O}_2 \rightarrow 2\\text{Al}_2\\text{O}_3$',
                    rationale: 'Correct.',
                    isCorrect: true,
                  },
                  {
                    text: '$2\\text{Al} + \\text{O}_2 \rightarrow 2\\text{Al}_2\\text{O}_3$',
                    rationale: 'Al mismatch.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'Total atoms in reactants: $\\text{N}_2 + 3\\text{H}_2$ ?',
                answerOptions: [
                  {
                    text: '4',
                    rationale: 'Counts molecules not atoms.',
                    isCorrect: false,
                  },
                  {
                    text: '5',
                    rationale: 'Incorrect count.',
                    isCorrect: false,
                  },
                  {
                    text: '8',
                    rationale: 'Correct (2 N + 6 H).',
                    isCorrect: true,
                  },
                  { text: '10', rationale: 'Overcount.', isCorrect: false },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Thermal decomposition: $\\text{CaCO}_3 \rightarrow \\text{CaO} + \\text{CO}_2$ releases COâ‚‚.',
                question:
                  'Is $\\text{CaCO}_3 \rightarrow \\text{CaO} + \\text{CO}_2$ balanced?',
                answerOptions: [
                  {
                    text: 'No, needs 2 CaO',
                    rationale: 'Would miscount Ca.',
                    isCorrect: false,
                  },
                  {
                    text: 'No, needs 2 COâ‚‚',
                    rationale: 'Would add excess carbon.',
                    isCorrect: false,
                  },
                  {
                    text: 'Yes, already balanced',
                    rationale: 'Correct: 1 Ca, 1 C, 3 O both sides.',
                    isCorrect: true,
                  },
                  {
                    text: 'No, needs 2 CaCOâ‚ƒ',
                    rationale: 'Would unbalance products.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question: 'Single replacement reaction definition?',
                answerOptions: [
                  {
                    text: 'Two compounds exchange parts',
                    rationale: 'Double replacement.',
                    isCorrect: false,
                  },
                  {
                    text: 'One element replaces another in a compound',
                    rationale: 'Correct.',
                    isCorrect: true,
                  },
                  {
                    text: 'Compound breaks to elements',
                    rationale: 'Decomposition.',
                    isCorrect: false,
                  },
                  {
                    text: 'Elements combine to form a compound',
                    rationale: 'Synthesis.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Photosynthesis equation: $6\\text{CO}_2 + 6\\text{H}_2\\text{O} \rightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$.',
                question: 'O atoms on reactant side?',
                answerOptions: [
                  {
                    text: '6',
                    rationale: 'Counts only one reactant.',
                    isCorrect: false,
                  },
                  { text: '12', rationale: 'Under-count.', isCorrect: false },
                  {
                    text: '18',
                    rationale: 'Correct (12 + 6).',
                    isCorrect: true,
                  },
                  { text: '24', rationale: 'Over-count.', isCorrect: false },
                ],
              },
              {
                questionNumber: 10,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'Balance: $\\text{Fe} + \\text{O}_2 \rightarrow \\text{Fe}_2\\text{O}_3$',
                answerOptions: [
                  {
                    text: '$\\text{Fe} + \\text{O}_2 \rightarrow \\text{Fe}_2\\text{O}_3$',
                    rationale: 'Unbalanced.',
                    isCorrect: false,
                  },
                  {
                    text: '$2\\text{Fe} + 3\\text{O}_2 \rightarrow \\text{Fe}_2\\text{O}_3$',
                    rationale: 'O mismatch.',
                    isCorrect: false,
                  },
                  {
                    text: '$4\\text{Fe} + 3\\text{O}_2 \rightarrow 2\\text{Fe}_2\\text{O}_3$',
                    rationale: 'Correct.',
                    isCorrect: true,
                  },
                  {
                    text: '$3\\text{Fe} + 2\\text{O}_2 \rightarrow \\text{Fe}_2\\text{O}_3$',
                    rationale: 'Unbalanced.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Cellular respiration: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O}$.',
                question: 'Why add coefficient 6 before $\\text{O}_2$?',
                answerOptions: [
                  {
                    text: 'To conserve total oxygen atoms',
                    rationale: 'Correct. Balances 18 O each side.',
                    isCorrect: true,
                  },
                  {
                    text: 'To increase reaction speed',
                    rationale: 'Coefficients express stoichiometry, not rate.',
                    isCorrect: false,
                  },
                  {
                    text: 'To form water only',
                    rationale: 'Products include COâ‚‚ and Hâ‚‚O.',
                    isCorrect: false,
                  },
                  {
                    text: 'To reduce hydrogen atoms',
                    rationale: 'Hydrogen count comes from glucose.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question: 'Balanced equation means:',
                answerOptions: [
                  {
                    text: 'Same number of molecules both sides',
                    rationale: 'Molecule counts can differ.',
                    isCorrect: false,
                  },
                  {
                    text: 'Coefficients all equal',
                    rationale: 'They can vary.',
                    isCorrect: false,
                  },
                  {
                    text: 'Same number of atoms of each element on both sides',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Reactants heavier than products',
                    rationale: 'Mass conserved, not heavier.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_chem_reaction_types_stoichiometry',
            title: 'Reaction Types & Stoichiometry',
            description:
              'Classifying reactions, mole ratios, limiting reactants.',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Stoichiometry uses mole ratios from balanced equations to predict product amounts.',
                question:
                  'From $2\\text{H}_2 + \\text{O}_2 \rightarrow 2\\text{H}_2\\text{O}$, moles water from 4 moles $\\text{H}_2$?',
                answerOptions: [
                  {
                    text: '2',
                    rationale: 'That would be from 2 moles Hâ‚‚.',
                    isCorrect: false,
                  },
                  {
                    text: '4',
                    rationale: 'Correct 2:2 ratio doubles proportionally.',
                    isCorrect: true,
                  },
                  {
                    text: '6',
                    rationale: 'Exceeds stoichiometric ratio.',
                    isCorrect: false,
                  },
                  {
                    text: '8',
                    rationale: 'Not supported by equation.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'Classify: $\\text{Zn} + \\text{CuSO}_4 \rightarrow \\text{ZnSO}_4 + \\text{Cu}$',
                answerOptions: [
                  {
                    text: 'Synthesis',
                    rationale: 'Not combining into one.',
                    isCorrect: false,
                  },
                  {
                    text: 'Decomposition',
                    rationale: 'Not breaking apart.',
                    isCorrect: false,
                  },
                  {
                    text: 'Single replacement',
                    rationale: 'Correct; Zn displaces Cu.',
                    isCorrect: true,
                  },
                  {
                    text: 'Double replacement',
                    rationale: 'Only one exchange.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Neutralization: acid + base -> salt + water. Example $\\text{HCl} + \\text{NaOH} \rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$.',
                question:
                  'Water produced from 2 moles HCl (complete reaction)?',
                answerOptions: [
                  {
                    text: '1 mole',
                    rationale: 'Ratio is 1:1.',
                    isCorrect: false,
                  },
                  {
                    text: '2 moles',
                    rationale: 'Correct 1:1 ratio.',
                    isCorrect: true,
                  },
                  {
                    text: '3 moles',
                    rationale: 'Exceeds ratio.',
                    isCorrect: false,
                  },
                  {
                    text: '4 moles',
                    rationale: 'Exceeds ratio.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'Classify: $\\text{AgNO}_3 + \\text{NaCl} \rightarrow \\text{AgCl} + \\text{NaNO}_3$',
                answerOptions: [
                  {
                    text: 'Synthesis',
                    rationale: 'Not forming single product.',
                    isCorrect: false,
                  },
                  {
                    text: 'Decomposition',
                    rationale: 'Not breaking down.',
                    isCorrect: false,
                  },
                  {
                    text: 'Single replacement',
                    rationale: 'Two ions swap.',
                    isCorrect: false,
                  },
                  {
                    text: 'Double replacement',
                    rationale: 'Correct.',
                    isCorrect: true,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Limiting reactant is consumed first, restricting product formation.',
                question:
                  'Max moles $\\text{NH}_3$ from 1 mol $\\text{N}_2$, 2 mol $\\text{H}_2$ ($\\text{N}_2 + 3\\text{H}_2 \rightarrow 2\\text{NH}_3$)?',
                answerOptions: [
                  {
                    text: '1',
                    rationale: 'More produced than 1.',
                    isCorrect: false,
                  },
                  {
                    text: '1.33',
                    rationale: 'Correct via ratio (0.67 Ã— 2).',
                    isCorrect: true,
                  },
                  {
                    text: '2',
                    rationale: 'Needs 3 mol Hâ‚‚.',
                    isCorrect: false,
                  },
                  {
                    text: '3',
                    rationale: 'Insufficient Hâ‚‚.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'Reactant coefficient ratio in combustion: $\\text{C}_3\\text{H}_8 + 5\\text{O}_2$?',
                answerOptions: [
                  {
                    text: '1:5',
                    rationale: 'Correct propane:oxygen ratio.',
                    isCorrect: true,
                  },
                  {
                    text: '1:3',
                    rationale: 'Not matching equation.',
                    isCorrect: false,
                  },
                  {
                    text: '3:4',
                    rationale: 'These are product coefficients.',
                    isCorrect: false,
                  },
                  { text: '5:8', rationale: 'Not present.', isCorrect: false },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage: 'Percent yield = actual/theoretical Ã— 100%.',
                question: 'Percent yield: theoretical 25 g, actual 20 g?',
                answerOptions: [
                  {
                    text: '75%',
                    rationale: 'Miscalculation.',
                    isCorrect: false,
                  },
                  {
                    text: '80%',
                    rationale: 'Correct (20/25 Ã— 100).',
                    isCorrect: true,
                  },
                  {
                    text: '85%',
                    rationale: 'Miscalculation.',
                    isCorrect: false,
                  },
                  {
                    text: '125%',
                    rationale: 'Exceeds possible ideal.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question: 'Endothermic reactions:',
                answerOptions: [
                  {
                    text: 'Release energy',
                    rationale: 'Exothermic property.',
                    isCorrect: false,
                  },
                  {
                    text: 'Absorb energy',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Have no energy change',
                    rationale: 'All reactions exchange energy.',
                    isCorrect: false,
                  },
                  {
                    text: 'Only occur at high temperature',
                    rationale: 'Can occur at varied temperatures.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Reaction: $2\\text{Al} + 3\\text{Cl}_2 \rightarrow 2\\text{AlCl}_3$ mole ratio 2:3.',
                question: 'Moles $\\text{Cl}_2$ needed for 6 moles Al?',
                answerOptions: [
                  {
                    text: '4',
                    rationale: 'Not following 2:3 ratio.',
                    isCorrect: false,
                  },
                  {
                    text: '6',
                    rationale: 'Would imply 1:1 ratio.',
                    isCorrect: false,
                  },
                  {
                    text: '9',
                    rationale: 'Correct (6 Ã— 3/2).',
                    isCorrect: true,
                  },
                  {
                    text: '12',
                    rationale: 'Excess beyond ratio.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question: 'Exothermic reactions:',
                answerOptions: [
                  {
                    text: 'Absorb heat',
                    rationale: 'Endothermic.',
                    isCorrect: false,
                  },
                  {
                    text: 'Release heat',
                    rationale: 'Correct.',
                    isCorrect: true,
                  },
                  {
                    text: 'Require continuous energy input',
                    rationale: 'They produce energy.',
                    isCorrect: false,
                  },
                  {
                    text: 'Never spontaneous',
                    rationale: 'Many are spontaneous.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-2', 'science-4'],
                type: 'text',
                passage:
                  'Molar mass: sum of atomic masses. COâ‚‚ has C=12, O=16 each.',
                question: 'Molar mass COâ‚‚?',
                answerOptions: [
                  {
                    text: '28 g/mol',
                    rationale: 'Misses second oxygen.',
                    isCorrect: false,
                  },
                  {
                    text: '32 g/mol',
                    rationale: 'Only oxygen contribution.',
                    isCorrect: false,
                  },
                  {
                    text: '44 g/mol',
                    rationale: 'Correct (12 + 32).',
                    isCorrect: true,
                  },
                  {
                    text: '60 g/mol',
                    rationale: 'Over-count.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question: 'Catalyst definition:',
                answerOptions: [
                  {
                    text: 'Consumed during reaction',
                    rationale: 'Not consumed.',
                    isCorrect: false,
                  },
                  {
                    text: 'Speeds reaction without being consumed',
                    rationale: 'Correct.',
                    isCorrect: true,
                  },
                  {
                    text: 'Slows reaction',
                    rationale: 'That is an inhibitor.',
                    isCorrect: false,
                  },
                  {
                    text: 'Changes products formed',
                    rationale: 'Affects rate, not product identity.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_chem_acids_bases',
            title: 'Acids, Bases & pH',
            description:
              'pH scale, neutralization, strong vs weak acids/bases.',
            questions: [
              {
                questionNumber: 1,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'The pH scale ranges from 0 (strong acid) to 14 (strong base); 7 is neutral. Each unit represents a tenfold change in hydrogen ion concentration.',
                question:
                  'Compared to a solution at pH 5, a solution at pH 3 has:',
                answerOptions: [
                  {
                    text: '10Ã— more Hâº ions',
                    rationale:
                      'One pH unit = 10Ã— difference; two units = 100Ã—.',
                    isCorrect: false,
                  },
                  {
                    text: '100Ã— more Hâº ions',
                    rationale: 'Correct. Difference of 2 units = 10Â².',
                    isCorrect: true,
                  },
                  {
                    text: '2Ã— more Hâº ions',
                    rationale: 'Underestimates logarithmic scale.',
                    isCorrect: false,
                  },
                  {
                    text: 'Same [Hâº]',
                    rationale: 'Different pH implies different concentrations.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Arrhenius acid produces:',
                answerOptions: [
                  {
                    text: 'OHâ» in water',
                    rationale: 'Bases produce hydroxide.',
                    isCorrect: false,
                  },
                  {
                    text: 'Hâº in water',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Electrons in water',
                    rationale:
                      'Electrons are not released free in solution like this.',
                    isCorrect: false,
                  },
                  {
                    text: 'Salt directly',
                    rationale:
                      'Salt forms after reaction, not intrinsic definition.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Neutralization: acid + base â†’ salt + water. Example: $\\text{HCl} + \\text{NaOH} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$.',
                question: 'Products of neutralization?',
                answerOptions: [
                  {
                    text: 'Acid only',
                    rationale: 'Products differ from reactants.',
                    isCorrect: false,
                  },
                  {
                    text: 'Base only',
                    rationale: 'Products differ from reactants.',
                    isCorrect: false,
                  },
                  {
                    text: 'Salt and water',
                    rationale: 'Correct general products.',
                    isCorrect: true,
                  },
                  {
                    text: 'Oxygen gas',
                    rationale: 'Not typical neutralization product.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Weak acid characteristic:',
                answerOptions: [
                  {
                    text: 'Fully dissociates',
                    rationale: 'That is strong acid behavior.',
                    isCorrect: false,
                  },
                  {
                    text: 'Partially dissociates',
                    rationale:
                      'Correct; equilibrium favors undissociated form.',
                    isCorrect: true,
                  },
                  {
                    text: 'Contains no hydrogen',
                    rationale: 'Acids donate hydrogen ions.',
                    isCorrect: false,
                  },
                  {
                    text: 'Solid at room temperature always',
                    rationale: 'Physical state not defining feature.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'For monoprotic acids: $pH = -\\log[H^+]$. If $[H^+] = 1.0 \\times 10^{-4}\\,M$, then pH = 4.',
                question:
                  'pH of solution with $[H^+] = 1.0 \\times 10^{-6}\\,M$?',
                answerOptions: [
                  {
                    text: '2',
                    rationale: 'Would require $1.0\\times10^{-2}$ M.',
                    isCorrect: false,
                  },
                  {
                    text: '4',
                    rationale: 'Would require $1.0\\times10^{-4}$ M.',
                    isCorrect: false,
                  },
                  {
                    text: '6',
                    rationale: 'Correct: exponent gives pH for powers of 10.',
                    isCorrect: true,
                  },
                  {
                    text: '8',
                    rationale: 'Higher than hydrogen exponent.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'A buffer solution:',
                answerOptions: [
                  {
                    text: 'Has no pH change when huge acid added',
                    rationale: 'Buffer capacity limited.',
                    isCorrect: false,
                  },
                  {
                    text: 'Resists pH change upon small additions of acid or base',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Has pH = 7 always',
                    rationale: 'Buffers can be acidic/basic.',
                    isCorrect: false,
                  },
                  {
                    text: 'Is always a strong acid plus strong base',
                    rationale: 'Typically weak acid/base with conjugate.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Indicators change color over a narrow pH range (e.g., phenolphthalein: colorless below ~8.2, pink above).',
                question: 'Pink phenolphthalein implies solution is:',
                answerOptions: [
                  {
                    text: 'Strongly acidic',
                    rationale: 'Colorless in acidic range.',
                    isCorrect: false,
                  },
                  {
                    text: 'Neutral exactly',
                    rationale: 'Neutral may still be colorless.',
                    isCorrect: false,
                  },
                  {
                    text: 'Basic (pH above indicator transition)',
                    rationale: 'Correct inference.',
                    isCorrect: true,
                  },
                  {
                    text: 'Unable to determine pH at all',
                    rationale: 'Indicator gives qualitative range.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Conjugate base forms when an acid:',
                answerOptions: [
                  {
                    text: 'Gains a proton',
                    rationale: 'Gaining proton gives conjugate acid.',
                    isCorrect: false,
                  },
                  {
                    text: 'Loses a proton',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Loses electrons only',
                    rationale: 'Proton transfer defines conjugates.',
                    isCorrect: false,
                  },
                  {
                    text: 'Combines with water forming gas',
                    rationale: 'Irrelevant process.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Titration uses known concentration (standard) to determine unknown; equivalence point moles acid = moles base (adjusted for stoichiometry).',
                question:
                  'At equivalence point in strong acidâ€“strong base titration:',
                answerOptions: [
                  {
                    text: 'pH < 3',
                    rationale:
                      'Solution is not strongly acidic at equivalence.',
                    isCorrect: false,
                  },
                  {
                    text: 'pH â‰ˆ 7',
                    rationale: 'Correct neutral products (salt + water).',
                    isCorrect: true,
                  },
                  {
                    text: 'pH â‰ˆ 12',
                    rationale: 'That would indicate excess base.',
                    isCorrect: false,
                  },
                  {
                    text: 'No ions present',
                    rationale: 'Salt ions remain in solution.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Pure water at 25Â°C has $[H^+]$:',
                answerOptions: [
                  {
                    text: '1.0Ã—10â»Â¹ M',
                    rationale: 'Too high for neutral water.',
                    isCorrect: false,
                  },
                  {
                    text: '1.0Ã—10â»â· M',
                    rationale: 'Correct neutral concentration.',
                    isCorrect: true,
                  },
                  {
                    text: '1.0Ã—10â»Â¹â´ M',
                    rationale: 'Product of $[H^+][OH^-]$ equals 1e-14.',
                    isCorrect: false,
                  },
                  {
                    text: 'Zero',
                    rationale: 'Autoionization supplies small concentration.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Strong acids (HCl, HNOâ‚ƒ) dissociate completely; weak acids (CHâ‚ƒCOOH) only partiallyâ€”equilibrium arrows ($\\rightleftharpoons$).',
                question:
                  'Equation symbol for weak acid dissociation should be:',
                answerOptions: [
                  {
                    text: 'Single arrow (â†’)',
                    rationale: 'Implies completeness.',
                    isCorrect: false,
                  },
                  {
                    text: 'Double equilibrium arrows ($\\rightleftharpoons$)',
                    rationale: 'Correct reversible process.',
                    isCorrect: true,
                  },
                  {
                    text: 'No arrow',
                    rationale: 'Reaction direction must be shown.',
                    isCorrect: false,
                  },
                  {
                    text: 'Dashed arrow only',
                    rationale: 'Not standard chemical notation.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question:
                  'If $[OH^-] = 1.0 \\times 10^{-4}$ M at 25Â°C, $[H^+]$ is:',
                answerOptions: [
                  {
                    text: '1.0Ã—10â»â´ M',
                    rationale: 'Would give product 1e-8.',
                    isCorrect: false,
                  },
                  {
                    text: '1.0Ã—10â»Â¹â° M',
                    rationale: 'Correct via $1e-14 / 1e-4$.',
                    isCorrect: true,
                  },
                  {
                    text: '1.0Ã—10â»â· M',
                    rationale: 'Neutral only.',
                    isCorrect: false,
                  },
                  {
                    text: 'Cannot be found',
                    rationale: 'Use $K_w = 1e-14$.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_chem_gas_laws',
            title: 'Gas Laws & Kinetic Theory',
            description:
              'Pressure, volume, temperature relationships; PV = nRT.',
            questions: [
              {
                questionNumber: 1,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  "Boyle's Law: $P_1 V_1 = P_2 V_2$ (constant temperature, moles). Pressure inversely proportional to volume.",
                question: 'If volume halves, pressure (ideal gas) will:',
                answerOptions: [
                  {
                    text: 'Double',
                    rationale: 'Correct inverse relationship.',
                    isCorrect: true,
                  },
                  {
                    text: 'Halve',
                    rationale: 'Would require direct proportion.',
                    isCorrect: false,
                  },
                  {
                    text: 'Stay same',
                    rationale: 'Change occurs when volume changes.',
                    isCorrect: false,
                  },
                  {
                    text: 'Drop to zero',
                    rationale: 'Pressure remains finite.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: "Charles's Law relates:",
                answerOptions: [
                  {
                    text: 'Pressure & moles',
                    rationale: "That is not Charles's Law.",
                    isCorrect: false,
                  },
                  {
                    text: 'Volume & temperature',
                    rationale: 'Correct: $V \\propto T$ at constant P, n.',
                    isCorrect: true,
                  },
                  {
                    text: 'Temperature & mass',
                    rationale: 'Mass not in law expression.',
                    isCorrect: false,
                  },
                  {
                    text: 'Pressure & temperature only at constant volume',
                    rationale: "That is Gay-Lussac's Law.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Ideal Gas Law: $PV = nRT$. $R = 0.0821$ LÂ·atmÂ·molâ»Â¹Â·Kâ»Â¹ (common units).',
                question: 'Solve moles: $P=2.0$ atm, $V=4.10$ L, $T=300$ K.',
                answerOptions: [
                  {
                    text: 'n â‰ˆ 0.33 mol',
                    rationale: 'Correct: n = (2Ã—4.10)/(0.0821Ã—300) â‰ˆ 0.33.',
                    isCorrect: true,
                  },
                  {
                    text: 'n â‰ˆ 0.08 mol',
                    rationale: 'Underestimates numerator.',
                    isCorrect: false,
                  },
                  {
                    text: 'n â‰ˆ 2.0 mol',
                    rationale: 'Too large; misapplies formula.',
                    isCorrect: false,
                  },
                  {
                    text: 'n â‰ˆ 1.0 mol',
                    rationale: 'Computation mismatch.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question:
                  'At STP (standard temperature and pressure) one mole of ideal gas occupies:',
                answerOptions: [
                  {
                    text: '11.2 L',
                    rationale: 'Half the actual standard molar volume.',
                    isCorrect: false,
                  },
                  {
                    text: '22.4 L',
                    rationale: 'Correct molar volume at 0Â°C, 1 atm.',
                    isCorrect: true,
                  },
                  {
                    text: '1.0 L',
                    rationale: 'Far too small.',
                    isCorrect: false,
                  },
                  {
                    text: '44.8 L',
                    rationale: 'Double the correct value.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  "Dalton's Law: total pressure equals sum of partial pressures of component gases (ideal mixture).",
                question:
                  'If $P_{total} = 1.00$ atm; $P_{O_2}=0.21$ atm & $P_{N_2}=0.78$ atm, remaining gas partial pressure is:',
                answerOptions: [
                  {
                    text: '0.01 atm',
                    rationale: 'Correct (1.00 - 0.99).',
                    isCorrect: true,
                  },
                  {
                    text: '0.99 atm',
                    rationale: 'That is combined Oâ‚‚ + Nâ‚‚.',
                    isCorrect: false,
                  },
                  {
                    text: '1.00 atm',
                    rationale: 'That is total, not remainder.',
                    isCorrect: false,
                  },
                  {
                    text: '0 atm',
                    rationale: 'There is a small remainder.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question:
                  'Kinetic molecular theory: average kinetic energy depends on:',
                answerOptions: [
                  {
                    text: 'Gas identity',
                    rationale: 'Depends on temperature, not identity.',
                    isCorrect: false,
                  },
                  {
                    text: 'Temperature',
                    rationale: 'Correct proportional relationship.',
                    isCorrect: true,
                  },
                  {
                    text: 'Volume only',
                    rationale: 'Volume affects collisions, not KE directly.',
                    isCorrect: false,
                  },
                  {
                    text: 'Pressure only',
                    rationale: 'Pressure emerges from motion, not driver.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  "Avogadro's Law: equal volumes of gases at same T and P contain equal numbers of molecules.",
                question:
                  'Two 1 L containers at same T & P, one COâ‚‚ one He. Molecule counts:',
                answerOptions: [
                  {
                    text: 'COâ‚‚ has more',
                    rationale: 'Counts are equal.',
                    isCorrect: false,
                  },
                  {
                    text: 'He has more',
                    rationale: 'Counts are equal.',
                    isCorrect: false,
                  },
                  {
                    text: 'Equal number',
                    rationale: 'Correct per Avogadro.',
                    isCorrect: true,
                  },
                  {
                    text: 'Cannot be determined',
                    rationale: 'Law provides determination.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Gas deviates from ideal behavior most under:',
                answerOptions: [
                  {
                    text: 'High T, low P',
                    rationale: 'These favor ideality.',
                    isCorrect: false,
                  },
                  {
                    text: 'Low T, high P',
                    rationale:
                      'Correct conditions (intermolecular forces matter).',
                    isCorrect: true,
                  },
                  {
                    text: 'Moderate T & P',
                    rationale: 'Less deviation.',
                    isCorrect: false,
                  },
                  {
                    text: 'Vacuum',
                    rationale: 'Behaves ideally near zero pressure.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  "Gay-Lussac\\'s Law: $P \\propto T$ (constant volume).",
                question:
                  'If temperature (Kelvin) doubles at constant volume, pressure will:',
                answerOptions: [
                  {
                    text: 'Double',
                    rationale: 'Direct proportionality.',
                    isCorrect: true,
                  },
                  {
                    text: 'Halve',
                    rationale: "Inverse would be Boyle's.",
                    isCorrect: false,
                  },
                  {
                    text: 'Stay same',
                    rationale: 'Change expected.',
                    isCorrect: false,
                  },
                  {
                    text: 'Drop to zero',
                    rationale: 'Not physical.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Symbol n in $PV=nRT$ stands for:',
                answerOptions: [
                  {
                    text: 'Number of molecules',
                    rationale: 'Moles, not raw count.',
                    isCorrect: false,
                  },
                  {
                    text: 'Moles of gas',
                    rationale: 'Correct variable.',
                    isCorrect: true,
                  },
                  {
                    text: 'Mass of gas',
                    rationale: 'Mass not directly inserted.',
                    isCorrect: false,
                  },
                  {
                    text: 'Density of gas',
                    rationale: 'Density not variable here.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  "Diffusion: spread of gas; effusion: escape through small opening. Graham's Law: rate âˆ 1/âˆšmolar mass.",
                question:
                  'Which effuses faster: He (4 g/mol) or Oâ‚‚ (32 g/mol)?',
                answerOptions: [
                  {
                    text: 'He',
                    rationale: 'Lower molar mass â‡’ faster.',
                    isCorrect: true,
                  },
                  {
                    text: 'Oâ‚‚',
                    rationale: 'Higher molar mass â‡’ slower.',
                    isCorrect: false,
                  },
                  {
                    text: 'Same rate',
                    rationale: 'Rates differ.',
                    isCorrect: false,
                  },
                  {
                    text: 'Cannot compare',
                    rationale: 'Law enables comparison.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Standard temperature is:',
                answerOptions: [
                  {
                    text: '0Â°C',
                    rationale: 'Correct (273 K).',
                    isCorrect: true,
                  },
                  {
                    text: '25Â°C',
                    rationale: 'Room temperature.',
                    isCorrect: false,
                  },
                  {
                    text: '100Â°C',
                    rationale: 'Boiling point of water.',
                    isCorrect: false,
                  },
                  {
                    text: '-273Â°C',
                    rationale: 'Absolute zero approximately -273Â°C.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_chem_thermochemistry',
            title: 'Thermochemistry & Energy',
            description:
              'Enthalpy, endothermic/exothermic processes, calorimetry.',
            questions: [
              {
                questionNumber: 1,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Enthalpy change (Î”H) negative for exothermic reactions; positive for endothermic.',
                question: 'Î”H = -250 kJ indicates reaction is:',
                answerOptions: [
                  {
                    text: 'Endothermic',
                    rationale: 'Would be positive.',
                    isCorrect: false,
                  },
                  {
                    text: 'Exothermic',
                    rationale: 'Correct negative sign.',
                    isCorrect: true,
                  },
                  {
                    text: 'At equilibrium',
                    rationale: 'Î”H sign not about equilibrium.',
                    isCorrect: false,
                  },
                  {
                    text: 'Impossible',
                    rationale: 'Negative Î”H common.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Calorimetry measures:',
                answerOptions: [
                  {
                    text: 'Mass directly',
                    rationale: 'Measures heat change.',
                    isCorrect: false,
                  },
                  {
                    text: 'Heat (q) absorbed or released',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'pH change only',
                    rationale: 'Different technique.',
                    isCorrect: false,
                  },
                  {
                    text: 'Electric current',
                    rationale: 'That is ammeter use.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Specific heat (c): $q = mcÎ”T$. Higher c â‡’ resists temperature change.',
                question: 'Substance with highest specific heat warms:',
                answerOptions: [
                  {
                    text: 'Fastest',
                    rationale: 'It warms more slowly.',
                    isCorrect: false,
                  },
                  {
                    text: 'Slowest',
                    rationale: 'Correctâ€”needs more energy per degree.',
                    isCorrect: true,
                  },
                  {
                    text: 'Unpredictably',
                    rationale: 'Property defines behavior.',
                    isCorrect: false,
                  },
                  {
                    text: 'Instantly',
                    rationale: 'Contradicts concept.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Heat vs temperature: temperature measures:',
                answerOptions: [
                  {
                    text: 'Total energy',
                    rationale: 'That is related to heat content.',
                    isCorrect: false,
                  },
                  {
                    text: 'Average kinetic energy of particles',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Potential energy only',
                    rationale: 'Not solely.',
                    isCorrect: false,
                  },
                  {
                    text: 'Chemical composition',
                    rationale: 'Different property.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Endothermic process: system absorbs heat from surroundings (e.g., dissolving ammonium nitrate).',
                question: 'Feeling cold pack indicates:',
                answerOptions: [
                  {
                    text: 'Heat released to skin',
                    rationale: 'Pack absorbs heat.',
                    isCorrect: false,
                  },
                  {
                    text: 'Endothermic dissolution',
                    rationale: 'Correct explanation.',
                    isCorrect: true,
                  },
                  {
                    text: 'No energy transfer',
                    rationale: 'Temperature drop implies transfer.',
                    isCorrect: false,
                  },
                  {
                    text: 'Exothermic neutralization',
                    rationale: 'Different reaction type.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question:
                  'Standard enthalpy of formation for elements in their standard state is:',
                answerOptions: [
                  {
                    text: '1 kJ/mol',
                    rationale: 'Defined as zero.',
                    isCorrect: false,
                  },
                  {
                    text: '0 kJ/mol',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Varies widely',
                    rationale: 'Convention fixes it.',
                    isCorrect: false,
                  },
                  {
                    text: 'Negative always',
                    rationale: 'Not required.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  "Hess's Law: overall Î”H is sum of steps; pathway independent.",
                question: "Using Hess's Law helps calculate:",
                answerOptions: [
                  {
                    text: 'Reaction rate',
                    rationale: 'Kinetics, not enthalpy pathway.',
                    isCorrect: false,
                  },
                  {
                    text: 'Overall enthalpy change',
                    rationale: 'Correct usage.',
                    isCorrect: true,
                  },
                  {
                    text: 'Equilibrium constant',
                    rationale: 'Requires Î”G or K data.',
                    isCorrect: false,
                  },
                  {
                    text: 'Atomic number',
                    rationale: 'Not related.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question:
                  'Exothermic reaction surroundings temperature typically:',
                answerOptions: [
                  {
                    text: 'Decrease',
                    rationale: 'Heat released warms surroundings.',
                    isCorrect: false,
                  },
                  {
                    text: 'Increase',
                    rationale: 'Correct effect.',
                    isCorrect: true,
                  },
                  {
                    text: 'Become absolute zero',
                    rationale: 'Physical impossibility.',
                    isCorrect: false,
                  },
                  {
                    text: 'Stay constant always',
                    rationale: 'Depends on system isolation.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Activation energy (E_a): minimum energy required for effective collisions.',
                question: 'Catalyst effect on E_a:',
                answerOptions: [
                  {
                    text: 'Raises it',
                    rationale: 'Catalyst lowers E_a.',
                    isCorrect: false,
                  },
                  {
                    text: 'Lowers it',
                    rationale: 'Correctâ€”alternate pathway.',
                    isCorrect: true,
                  },
                  {
                    text: 'Eliminates need for collisions',
                    rationale: 'Collisions still needed.',
                    isCorrect: false,
                  },
                  {
                    text: 'Converts potential energy to mass',
                    rationale: 'Not valid description.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Symbol Î”H represents:',
                answerOptions: [
                  {
                    text: 'Entropy change',
                    rationale: 'Entropy is Î”S.',
                    isCorrect: false,
                  },
                  {
                    text: 'Enthalpy change',
                    rationale: 'Correct parameter.',
                    isCorrect: true,
                  },
                  {
                    text: 'Internal energy exactly',
                    rationale: 'Different symbol (Î”U).',
                    isCorrect: false,
                  },
                  {
                    text: 'Rate constant',
                    rationale: 'Rate uses k.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Calorimeter: insulated device limiting heat exchange.',
                question: 'Purpose of insulation:',
                answerOptions: [
                  {
                    text: 'Increase outside heat flow',
                    rationale: 'Opposite effect.',
                    isCorrect: false,
                  },
                  {
                    text: 'Minimize heat loss for accurate q measurement',
                    rationale: 'Correct reason.',
                    isCorrect: true,
                  },
                  {
                    text: 'Change reaction pathway',
                    rationale: 'Pathway unaffected.',
                    isCorrect: false,
                  },
                  {
                    text: 'Neutralize acids',
                    rationale: 'Different process.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question:
                  'Exothermic graph shows products energy relative to reactants:',
                answerOptions: [
                  {
                    text: 'Higher',
                    rationale: 'That indicates endothermic.',
                    isCorrect: false,
                  },
                  {
                    text: 'Lower',
                    rationale: 'Correct energy release.',
                    isCorrect: true,
                  },
                  {
                    text: 'Equal always',
                    rationale: 'Energy change differentiates.',
                    isCorrect: false,
                  },
                  {
                    text: 'Cannot compare visually',
                    rationale: 'Diagram depicts difference.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_chem_solutions_concentration',
            title: 'Solutions & Concentration',
            description: 'Solubility, molarity, dilution, saturation.',
            questions: [
              {
                questionNumber: 1,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Molarity (M) = moles solute / liters solution. 0.50 mol dissolved to make 2.0 L â‡’ 0.25 M.',
                question: 'Molarity of 0.75 mol solute in 3.0 L?',
                answerOptions: [
                  {
                    text: '0.25 M',
                    rationale: 'Correct (0.75/3.0).',
                    isCorrect: true,
                  },
                  {
                    text: '0.50 M',
                    rationale: 'Would require 1.5 mol.',
                    isCorrect: false,
                  },
                  {
                    text: '2.25 M',
                    rationale: 'Not division result.',
                    isCorrect: false,
                  },
                  {
                    text: '3.75 M',
                    rationale: 'Not division result.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Solvent in saltwater (NaCl(aq)) is:',
                answerOptions: [
                  {
                    text: 'Salt',
                    rationale: 'Solute dissolves.',
                    isCorrect: false,
                  },
                  {
                    text: 'Water',
                    rationale: 'Correct primary component.',
                    isCorrect: true,
                  },
                  {
                    text: 'Sodium only',
                    rationale: 'Ion part of solute.',
                    isCorrect: false,
                  },
                  {
                    text: 'Chloride only',
                    rationale: 'Ion part of solute.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Dilution formula: $M_1 V_1 = M_2 V_2$ (moles conserved).',
                question:
                  'From 2.0 M stock make 0.50 L of 0.40 M. $V_1$ needed?',
                answerOptions: [
                  {
                    text: '0.10 L',
                    rationale: 'Correct: (0.40Ã—0.50)/2.0 = 0.10.',
                    isCorrect: true,
                  },
                  {
                    text: '0.40 L',
                    rationale: 'Uses final volume incorrectly.',
                    isCorrect: false,
                  },
                  {
                    text: '0.25 L',
                    rationale: 'Miscalculated proportion.',
                    isCorrect: false,
                  },
                  {
                    text: '2.0 L',
                    rationale: 'Exceeds final volume.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Saturated solution:',
                answerOptions: [
                  {
                    text: 'Cannot dissolve more solute at given conditions',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Contains no solute',
                    rationale: 'That is pure solvent.',
                    isCorrect: false,
                  },
                  {
                    text: 'Always a gas',
                    rationale: 'Applies to all phases.',
                    isCorrect: false,
                  },
                  {
                    text: 'Has variable pH only',
                    rationale: 'Unrelated property.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Increasing temperature generally increases solubility of solids in liquids (exceptions exist).',
                question: 'Heating solvent typically makes solid solute:',
                answerOptions: [
                  {
                    text: 'More soluble',
                    rationale: 'Correct general trend.',
                    isCorrect: true,
                  },
                  {
                    text: 'Less soluble',
                    rationale: 'Opposite of common behavior.',
                    isCorrect: false,
                  },
                  {
                    text: 'Exactly insoluble',
                    rationale: 'Not typical outcome.',
                    isCorrect: false,
                  },
                  {
                    text: 'React chemically always',
                    rationale: 'Dissolving is physical.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Unsaturated solution can:',
                answerOptions: [
                  {
                    text: 'Precipitate immediately',
                    rationale:
                      'Precipitation indicates supersaturation/saturation.',
                    isCorrect: false,
                  },
                  {
                    text: 'Dissolve additional solute',
                    rationale: 'Correct ability.',
                    isCorrect: true,
                  },
                  {
                    text: 'Hold no solvent',
                    rationale: 'Solution includes solvent.',
                    isCorrect: false,
                  },
                  {
                    text: 'Contain only gases',
                    rationale: 'Not a requirement.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Supersaturated solution holds more solute than equilibrium amount (metastable).',
                question: 'Disturbing supersaturated solution often causes:',
                answerOptions: [
                  {
                    text: 'Further dissolution',
                    rationale: 'Excess tends to precipitate.',
                    isCorrect: false,
                  },
                  {
                    text: 'Rapid crystallization',
                    rationale: 'Correct release of excess solute.',
                    isCorrect: true,
                  },
                  {
                    text: 'Permanent stability',
                    rationale: 'Metastable only.',
                    isCorrect: false,
                  },
                  {
                    text: 'Change to pure solvent',
                    rationale: 'Solute remains as solid.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Concentration unit mol/L is called:',
                answerOptions: [
                  {
                    text: 'Molality',
                    rationale: 'Molality is mol/kg solvent.',
                    isCorrect: false,
                  },
                  {
                    text: 'Molarity',
                    rationale: 'Correct definition.',
                    isCorrect: true,
                  },
                  {
                    text: 'Normality',
                    rationale: 'Different equivalent-based unit.',
                    isCorrect: false,
                  },
                  {
                    text: 'Titer',
                    rationale: 'Not standard concentration unit.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Polar solvents dissolve polar/ionic solutes ("like dissolves like").',
                question: 'Nonpolar solute dissolves best in:',
                answerOptions: [
                  {
                    text: 'Nonpolar solvent',
                    rationale: 'Correct compatibility.',
                    isCorrect: true,
                  },
                  {
                    text: 'Highly polar solvent',
                    rationale: 'Energy cost too high.',
                    isCorrect: false,
                  },
                  {
                    text: 'Pure water always',
                    rationale: 'Water is polar.',
                    isCorrect: false,
                  },
                  {
                    text: 'Acidic solution only',
                    rationale: 'Acidity unrelated to polarity match.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question: 'Increasing surface area (crushing solid) generally:',
                answerOptions: [
                  {
                    text: 'Speeds dissolution',
                    rationale: 'Correctâ€”greater contact area.',
                    isCorrect: true,
                  },
                  {
                    text: 'Stops dissolution',
                    rationale: 'Does not halt process.',
                    isCorrect: false,
                  },
                  {
                    text: 'Makes solute insoluble',
                    rationale: "Physical size doesn't remove solubility.",
                    isCorrect: false,
                  },
                  {
                    text: 'Reduces solvent volume',
                    rationale: 'Volume unaffected.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                type: 'text',
                challenge_tags: ['science-2'],
                passage:
                  'Colligative properties depend on particle count, not identity (e.g., boiling point elevation).',
                question: 'Adding nonvolatile solute to solvent boiling point:',
                answerOptions: [
                  {
                    text: 'Decreases',
                    rationale: 'Boiling point elevates.',
                    isCorrect: false,
                  },
                  {
                    text: 'Increases',
                    rationale: 'Correct effect.',
                    isCorrect: true,
                  },
                  {
                    text: 'Becomes zero',
                    rationale: 'Physical impossibility.',
                    isCorrect: false,
                  },
                  {
                    text: 'Unaffected',
                    rationale: 'Property changes.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'knowledge',
                challenge_tags: ['science-2'],
                question:
                  'Term for substance that dissolves uniformly forming single phase:',
                answerOptions: [
                  {
                    text: 'Homogeneous solution',
                    rationale: 'Correct descriptor.',
                    isCorrect: true,
                  },
                  {
                    text: 'Heterogeneous mixture',
                    rationale: 'Components visibly distinct.',
                    isCorrect: false,
                  },
                  {
                    text: 'Suspension only',
                    rationale: 'Suspension has settled particles.',
                    isCorrect: false,
                  },
                  {
                    text: 'Colloid only',
                    rationale: 'Colloid intermediate particle size.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'sci_physics_motion',
            title: 'Physics in Motion',
            description:
              "Newton's laws of motion, energy transformations, and waves.",
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  "Newton's First Law of Motion, often called the law of inertia, states that an object at rest will stay at rest, and an object in motion will stay in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
                question:
                  "A book is sitting on a table. According to Newton's First Law, it will not move unless:",
                answerOptions: [
                  {
                    text: 'it runs out of energy.',
                    rationale:
                      'An object at rest has no kinetic energy to run out of.',
                    isCorrect: false,
                  },
                  {
                    text: 'an unbalanced force acts on it.',
                    rationale:
                      'Correct. A force, like a push or a pull, is required to change its state of rest.',
                    isCorrect: true,
                  },
                  {
                    text: 'gravity stops acting on it.',
                    rationale:
                      'Gravity is a force constantly acting on the book.',
                    isCorrect: false,
                  },
                  {
                    text: 'its inertia is used up.',
                    rationale:
                      'Inertia is a property of mass, not something that can be used up.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  "Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is often written as the formula F = ma (Force = mass Ã— acceleration).",
                question:
                  'If you push two objects with the same amount of force, which one will accelerate more?',
                answerOptions: [
                  {
                    text: 'The object with the larger mass.',
                    rationale:
                      'According to F=ma, if F is constant, a larger mass (m) results in smaller acceleration (a).',
                    isCorrect: false,
                  },
                  {
                    text: 'The object with the smaller mass.',
                    rationale:
                      'Correct. If F is constant, a smaller mass (m) will experience a larger acceleration (a).',
                    isCorrect: true,
                  },
                  {
                    text: 'They will both accelerate at the same rate.',
                    rationale: 'Acceleration depends on mass.',
                    isCorrect: false,
                  },
                  {
                    text: 'Neither will accelerate.',
                    rationale:
                      'If a net force is applied, they will accelerate.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                type: 'knowledge',
                question:
                  "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. Which of the following is the best example of this law?",
                answerOptions: [
                  {
                    text: 'A rocket moving upwards by pushing exhaust gases downwards.',
                    rationale:
                      'Correct. The action is the rocket pushing the gas down; the reaction is the gas pushing the rocket up.',
                    isCorrect: true,
                  },
                  {
                    text: 'A car slowing down when the brakes are applied.',
                    rationale:
                      'This is an example of the First and Second Laws (a force causing deceleration).',
                    isCorrect: false,
                  },
                  {
                    text: 'A ball rolling to a stop due to friction.',
                    rationale:
                      "This is an example of the First Law (an unbalanced force, friction, changing the object's motion).",
                    isCorrect: false,
                  },
                  {
                    text: 'A person sitting on a chair.',
                    rationale:
                      'While action-reaction forces are present (person pushes on chair, chair pushes on person), the rocket is a more dynamic example of the law in action.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  "Energy can be classified into two main types: potential and kinetic. Potential energy is stored energy, often due to an object's position or state. Kinetic energy is the energy of motion.",
                question:
                  'A roller coaster car poised at the very top of a tall hill has its maximum:',
                answerOptions: [
                  {
                    text: 'Kinetic energy',
                    rationale:
                      'Kinetic energy is the energy of motion. At the top of the hill, the car is momentarily at rest, so its kinetic energy is at a minimum.',
                    isCorrect: false,
                  },
                  {
                    text: 'Potential energy',
                    rationale:
                      'Correct. Its height gives it the maximum amount of stored gravitational potential energy, which will be converted to kinetic energy as it rolls down.',
                    isCorrect: true,
                  },
                  {
                    text: 'Frictional energy',
                    rationale:
                      'Friction is a force that converts kinetic energy into heat, not a primary energy type in this context.',
                    isCorrect: false,
                  },
                  {
                    text: 'Both kinetic and potential energy are at a minimum.',
                    rationale: 'Potential energy is at its maximum.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question: 'The law of conservation of energy states that:',
                answerOptions: [
                  {
                    text: 'Energy can be created but not destroyed.',
                    rationale: 'Energy cannot be created.',
                    isCorrect: false,
                  },
                  {
                    text: 'Energy cannot be created or destroyed, only transformed from one form to another.',
                    rationale:
                      'Correct. This is the fundamental principle of energy conservation.',
                    isCorrect: true,
                  },
                  {
                    text: 'Kinetic energy is always greater than potential energy.',
                    rationale:
                      'The balance between kinetic and potential energy can vary.',
                    isCorrect: false,
                  },
                  {
                    text: 'Energy is lost as heat in every transformation.',
                    rationale:
                      'While some energy is often lost as heat, the total amount of energy is conserved.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'A wave is a disturbance that transfers energy from one place to another. In a transverse wave, the particles of the medium move perpendicular to the direction of energy transfer. In a longitudinal wave, the particles move parallel to the direction of energy transfer.',
                question:
                  'A sound wave, which consists of compressions and rarefactions of air particles, is an example of a:',
                answerOptions: [
                  {
                    text: 'Transverse wave',
                    rationale: 'Light is an example of a transverse wave.',
                    isCorrect: false,
                  },
                  {
                    text: 'Longitudinal wave',
                    rationale:
                      'Correct. In a sound wave, the air particles vibrate back and forth in the same direction that the sound is traveling.',
                    isCorrect: true,
                  },
                  {
                    text: 'Stationary wave',
                    rationale:
                      'A stationary wave does not transfer energy from one place to another.',
                    isCorrect: false,
                  },
                  {
                    text: 'Surface wave',
                    rationale:
                      'A surface wave occurs at the interface between two media.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'knowledge',
                question:
                  'What is the term for the number of complete wave cycles that pass a point in a given amount of time?',
                answerOptions: [
                  {
                    text: 'Wavelength',
                    rationale:
                      'Wavelength is the distance between two corresponding parts of a wave.',
                    isCorrect: false,
                  },
                  {
                    text: 'Amplitude',
                    rationale:
                      'Amplitude is the maximum displacement or distance moved by a point on a vibrating body or wave measured from its equilibrium position.',
                    isCorrect: false,
                  },
                  {
                    text: 'Frequency',
                    rationale:
                      'Correct. Frequency is typically measured in Hertz (Hz), which is cycles per second.',
                    isCorrect: true,
                  },
                  {
                    text: 'Speed',
                    rationale:
                      'Speed is the distance the wave travels per unit of time.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                type: 'knowledge',
                question:
                  'In an electrical circuit, what is the property that opposes the flow of electric current?',
                answerOptions: [
                  {
                    text: 'Voltage',
                    rationale:
                      'Voltage is the electrical potential difference that drives the current.',
                    isCorrect: false,
                  },
                  {
                    text: 'Current',
                    rationale: 'Current is the flow of electric charge.',
                    isCorrect: false,
                  },
                  {
                    text: 'Resistance',
                    rationale:
                      'Correct. Resistance, measured in ohms, is the opposition to the passage of an electric current.',
                    isCorrect: true,
                  },
                  {
                    text: 'Power',
                    rationale:
                      'Power is the rate at which electrical energy is transferred.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                type: 'text',
                passage:
                  "Ohm's Law describes the relationship between voltage (V), current (I), and resistance (R) in an electrical circuit. The formula is V = IR. This means that for a given resistance, the current is directly proportional to the voltage.",
                question:
                  'If the voltage in a circuit is increased while the resistance stays the same, what will happen to the current?',
                answerOptions: [
                  {
                    text: 'It will decrease.',
                    rationale:
                      'According to V=IR, if V increases and R is constant, I must also increase.',
                    isCorrect: false,
                  },
                  {
                    text: 'It will increase.',
                    rationale:
                      'Correct. The law states a direct proportionality between voltage and current.',
                    isCorrect: true,
                  },
                  {
                    text: 'It will stay the same.',
                    rationale:
                      'The current will change if the voltage changes.',
                    isCorrect: false,
                  },
                  {
                    text: 'It will reverse direction.',
                    rationale:
                      'The direction of the current is determined by the polarity of the voltage source.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                question:
                  'Which of the following is the best example of a conductor of electricity?',
                answerOptions: [
                  {
                    text: 'Rubber',
                    rationale: 'Rubber is an insulator.',
                    isCorrect: false,
                  },
                  {
                    text: 'Glass',
                    rationale: 'Glass is an insulator.',
                    isCorrect: false,
                  },
                  {
                    text: 'Copper',
                    rationale:
                      'Correct. Metals like copper have free electrons that allow electric current to flow easily.',
                    isCorrect: true,
                  },
                  {
                    text: 'Wood',
                    rationale: 'Wood is an insulator.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'The force of gravity between two objects depends on two factors:',
                answerOptions: [
                  {
                    text: 'Their masses and the distance between them.',
                    rationale:
                      "Correct. Newton's law of universal gravitation states that the force is proportional to the product of their masses and inversely proportional to the square of the distance between them.",
                    isCorrect: true,
                  },
                  {
                    text: 'Their speed and their temperature.',
                    rationale:
                      'These factors do not directly determine the force of gravity.',
                    isCorrect: false,
                  },
                  {
                    text: 'Their chemical composition and their electrical charge.',
                    rationale:
                      'These factors are not part of the law of gravitation.',
                    isCorrect: false,
                  },
                  {
                    text: 'Their volume and their shape.',
                    rationale:
                      'While related to mass and distance, it is mass itself, not volume or shape, that is the key factor.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                type: 'text',
                passage:
                  "Speed is a scalar quantity that refers to 'how fast an object is moving.' Velocity is a vector quantity that refers to 'the rate at which an object changes its position.' The key difference is that velocity includes direction.",
                question:
                  'A car is traveling at a constant 60 miles per hour as it goes around a circular track. Which of the following is true?',
                answerOptions: [
                  {
                    text: "The car's speed and velocity are both constant.",
                    rationale:
                      'The speed is constant, but the velocity is not.',
                    isCorrect: false,
                  },
                  {
                    text: "The car's speed is constant, but its velocity is changing.",
                    rationale:
                      "Correct. Even though the speed is constant, the car's direction is constantly changing, which means its velocity is also changing.",
                    isCorrect: true,
                  },
                  {
                    text: "The car's speed is changing, but its velocity is constant.",
                    rationale: 'The speed is stated as constant.',
                    isCorrect: false,
                  },
                  {
                    text: "The car's speed and velocity are both changing.",
                    rationale: 'The speed is constant.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                challenge_tags: ['science-2'],
                type: 'knowledge',
                question:
                  'What type of energy is stored in the bonds of chemical compounds, such as in food or batteries?',
                answerOptions: [
                  {
                    text: 'Kinetic energy',
                    rationale: 'Kinetic energy is the energy of motion.',
                    isCorrect: false,
                  },
                  {
                    text: 'Thermal energy',
                    rationale:
                      'Thermal energy is related to the temperature of an object.',
                    isCorrect: false,
                  },
                  {
                    text: 'Chemical potential energy',
                    rationale:
                      'Correct. This is the energy stored in the chemical bonds of a substance.',
                    isCorrect: true,
                  },
                  {
                    text: 'Gravitational potential energy',
                    rationale:
                      "This is energy stored due to an object's height.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                type: 'text',
                passage:
                  'Magnetism is a force produced by moving electric charges. All magnets have two poles, a north pole and a south pole. Like poles repel each other, while opposite poles attract each other.',
                question:
                  'If you bring the north pole of one magnet close to the north pole of another magnet, what will happen?',
                answerOptions: [
                  {
                    text: 'The magnets will attract each other.',
                    rationale: 'Opposite poles attract.',
                    isCorrect: false,
                  },
                  {
                    text: 'The magnets will repel each other.',
                    rationale:
                      'Correct. The passage states that like poles repel.',
                    isCorrect: true,
                  },
                  {
                    text: 'Nothing will happen.',
                    rationale: 'A magnetic force will be exerted.',
                    isCorrect: false,
                  },
                  {
                    text: 'The magnets will lose their magnetism.',
                    rationale:
                      'This will not cause them to lose their magnetism.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'knowledge',
                question: 'Which of the following is a unit of force?',
                answerOptions: [
                  {
                    text: 'Meter',
                    rationale: 'A meter is a unit of distance.',
                    isCorrect: false,
                  },
                  {
                    text: 'Kilogram',
                    rationale: 'A kilogram is a unit of mass.',
                    isCorrect: false,
                  },
                  {
                    text: 'Second',
                    rationale: 'A second is a unit of time.',
                    isCorrect: false,
                  },
                  {
                    text: 'Newton',
                    rationale:
                      'Correct. The Newton (N) is the standard unit of force in the International System of Units (SI).',
                    isCorrect: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      'Scientific Numeracy': {
        description:
          'Practice applying mathematical skills to interpret scientific data, charts, and formulas.',
        image: './images/scientific_numeracy_icon.png',
        topics: [
          {
            id: 'sci_scientific_numeracy_core',
            title: 'Scientific Numeracy',
            description: 'Core Skills Practice Set',
            config: {
              calculator: true,
              formulaSheet: true,
              totalTime: 20 * 60,
            },
            questions: SCI_NUMERACY_QUESTIONS,
          },
        ],
      },
      'Earth & Space Science': {
        description:
          'Study the systems of planet Earth and its place in the universe.',
        topics: [
          {
            id: 'sci_earth_space',
            title: 'Earth & Space Systems',
            description:
              'Plate tectonics, the rock cycle, and the solar system.',
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-4'],
                type: 'text',
                passage:
                  "The Earth's lithosphere is divided into several large and small tectonic plates that float on the semi-fluid asthenosphere beneath. The movement of these plates is responsible for major geological events such as earthquakes, volcanic eruptions, and the formation of mountain ranges.",
                question: 'The theory of plate tectonics helps to explain:',
                answerOptions: [
                  {
                    text: 'The changing of the seasons.',
                    rationale:
                      "The seasons are caused by the tilt of the Earth's axis.",
                    isCorrect: false,
                  },
                  {
                    text: 'The occurrence of earthquakes and the formation of mountains.',
                    rationale:
                      'Correct. The passage directly links plate movement to these geological events.',
                    isCorrect: true,
                  },
                  {
                    text: 'The phases of the moon.',
                    rationale:
                      "The moon's phases are caused by its orbit around the Earth.",
                    isCorrect: false,
                  },
                  {
                    text: 'The water cycle.',
                    rationale: 'The water cycle is driven by solar energy.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                type: 'knowledge',
                question:
                  'What type of plate boundary is formed when two tectonic plates collide with each other?',
                answerOptions: [
                  {
                    text: 'Divergent boundary',
                    rationale: 'At a divergent boundary, plates move apart.',
                    isCorrect: false,
                  },
                  {
                    text: 'Convergent boundary',
                    rationale: "Correct. 'Converge' means to come together.",
                    isCorrect: true,
                  },
                  {
                    text: 'Transform boundary',
                    rationale:
                      'At a transform boundary, plates slide past each other.',
                    isCorrect: false,
                  },
                  {
                    text: 'Static boundary',
                    rationale: 'There is no such term in plate tectonics.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['rla-7', 'science-4'],
                type: 'text',
                passage:
                  'The rock cycle is a model that describes the formation, breakdown, and reformation of a rock as a result of sedimentary, igneous, and metamorphic processes. For example, when magma or lava cools and solidifies, it forms igneous rock. When this rock is weathered and eroded, the sediments can be compacted to form sedimentary rock.',
                question:
                  'According to the passage, how is igneous rock formed?',
                answerOptions: [
                  {
                    text: 'From the cooling and solidification of magma or lava.',
                    rationale:
                      'Correct. The passage explicitly states this is how igneous rock is formed.',
                    isCorrect: true,
                  },
                  {
                    text: 'From the compaction and cementation of sediments.',
                    rationale:
                      'This describes the formation of sedimentary rock.',
                    isCorrect: false,
                  },
                  {
                    text: 'From the application of heat and pressure to existing rock.',
                    rationale:
                      'This describes the formation of metamorphic rock.',
                    isCorrect: false,
                  },
                  {
                    text: 'From the weathering of metamorphic rock.',
                    rationale:
                      'Weathering breaks down rock; it does not form it.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                type: 'knowledge',
                question:
                  'Which type of rock is formed from the shells, skeletons, and other remains of living organisms?',
                answerOptions: [
                  {
                    text: 'Igneous rock',
                    rationale: 'Igneous rock is formed from cooled magma.',
                    isCorrect: false,
                  },
                  {
                    text: 'Metamorphic rock',
                    rationale:
                      'Metamorphic rock is formed by heat and pressure.',
                    isCorrect: false,
                  },
                  {
                    text: 'Organic sedimentary rock',
                    rationale:
                      'Correct. Rocks like limestone and coal are formed from the accumulation of organic debris.',
                    isCorrect: true,
                  },
                  {
                    text: 'Chemical sedimentary rock',
                    rationale:
                      'Chemical sedimentary rocks form when minerals precipitate from a solution.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                challenge_tags: ['science-4'],
                type: 'text',
                passage:
                  "Weathering is the process that breaks down rocks, soils, and minerals as well as wood and artificial materials through contact with the Earth's atmosphere, water, and biological organisms. Erosion is the process by which soil and rock particles are worn away and moved elsewhere by gravity, or by a moving transport agent such as water, wind, or ice.",
                question:
                  'What is the key difference between weathering and erosion?',
                answerOptions: [
                  {
                    text: 'Weathering breaks down rocks, while erosion moves the broken pieces.',
                    rationale:
                      'Correct. Weathering is the breaking, and erosion is the taking.',
                    isCorrect: true,
                  },
                  {
                    text: 'Weathering only happens to soil, while erosion only happens to rock.',
                    rationale:
                      'Both processes can happen to both soil and rock.',
                    isCorrect: false,
                  },
                  {
                    text: 'Weathering is a chemical process, while erosion is a physical process.',
                    rationale:
                      'Both processes can be either physical or chemical.',
                    isCorrect: false,
                  },
                  {
                    text: 'There is no difference; they are the same process.',
                    rationale: 'They are two distinct but related processes.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['science-4'],
                type: 'knowledge',
                question:
                  'Which of the following is the best example of chemical weathering?',
                answerOptions: [
                  {
                    text: 'A rock breaking apart due to ice freezing and expanding in its cracks.',
                    rationale:
                      'This is an example of physical weathering (ice wedging).',
                    isCorrect: false,
                  },
                  {
                    text: 'The smoothing of a rock by a river.',
                    rationale:
                      'This is an example of physical weathering and erosion.',
                    isCorrect: false,
                  },
                  {
                    text: 'The dissolving of limestone by acid rain.',
                    rationale:
                      'Correct. This is a chemical reaction that breaks down the rock.',
                    isCorrect: true,
                  },
                  {
                    text: 'The roots of a tree growing into and splitting a rock.',
                    rationale:
                      'This is an example of physical weathering (biological).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'knowledge',
                question:
                  'What is the correct order of the planets in our solar system, starting from the one closest to the Sun?',
                answerOptions: [
                  {
                    text: 'Earth, Mars, Jupiter, Saturn, Venus, Mercury, Uranus, Neptune',
                    rationale: 'This order is incorrect.',
                    isCorrect: false,
                  },
                  {
                    text: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
                    rationale:
                      'Correct. This is the order of the eight planets.',
                    isCorrect: true,
                  },
                  {
                    text: 'Mercury, Venus, Mars, Earth, Jupiter, Saturn, Uranus, Neptune',
                    rationale: 'Earth and Mars are in the wrong order.',
                    isCorrect: false,
                  },
                  {
                    text: 'Jupiter, Saturn, Uranus, Neptune, Mercury, Venus, Earth, Mars',
                    rationale:
                      'This separates the gas giants and terrestrial planets but is not the correct order from the sun.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                challenge_tags: ['science-2'],
                type: 'text',
                passage:
                  'A star is a luminous ball of gas, mostly hydrogen and helium, held together by its own gravity. Nuclear fusion reactions in its core support the star against gravity and produce photons and heat, as well as small amounts of heavier elements. The Sun is the closest star to Earth.',
                question:
                  'What is the primary process that generates energy in a star like our Sun?',
                answerOptions: [
                  {
                    text: 'Nuclear fusion',
                    rationale:
                      "Correct. The passage states that nuclear fusion reactions in the core produce the star's energy.",
                    isCorrect: true,
                  },
                  {
                    text: 'Chemical combustion (burning)',
                    rationale:
                      "Stars are not 'burning' in the traditional sense; it is a nuclear process.",
                    isCorrect: false,
                  },
                  {
                    text: 'Gravitational collapse',
                    rationale:
                      'Gravity holds the star together, but fusion is what generates the outward energy.',
                    isCorrect: false,
                  },
                  {
                    text: 'Radioactive decay',
                    rationale:
                      "This process occurs but is not the primary source of a star's energy.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                challenge_tags: ['science-4'],
                type: 'knowledge',
                question: 'Why do we experience seasons on Earth?',
                answerOptions: [
                  {
                    text: "Because the Earth's distance from the Sun changes throughout the year.",
                    rationale:
                      'While the distance does change slightly, this is not the primary cause of the seasons.',
                    isCorrect: false,
                  },
                  {
                    text: "Because of the tilt of the Earth's axis relative to its orbit around the Sun.",
                    rationale:
                      'Correct. The tilt causes different parts of the Earth to receive more direct sunlight at different times of the year.',
                    isCorrect: true,
                  },
                  {
                    text: "Because the Sun's energy output changes throughout the year.",
                    rationale:
                      "The Sun's energy output is relatively constant.",
                    isCorrect: false,
                  },
                  {
                    text: 'Because of the changing phases of the Moon.',
                    rationale: "The Moon's phases do not affect the seasons.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                type: 'knowledge',
                question:
                  'What causes the phases of the Moon (e.g., new moon, full moon, quarter moon)?',
                answerOptions: [
                  {
                    text: "The Earth's shadow falling on the Moon.",
                    rationale:
                      'This describes a lunar eclipse, not the regular phases.',
                    isCorrect: false,
                  },
                  {
                    text: 'The changing amount of the sunlit side of the Moon that we can see from Earth as it orbits us.',
                    rationale:
                      "Correct. The phases are a result of our viewing angle of the Moon's illuminated surface.",
                    isCorrect: true,
                  },
                  {
                    text: 'Clouds blocking our view of the Moon.',
                    rationale:
                      'Clouds can obscure the moon, but they do not cause its phases.',
                    isCorrect: false,
                  },
                  {
                    text: 'The Moon physically changing its shape.',
                    rationale:
                      'The Moon is always a sphere; only our view of it changes.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                challenge_tags: ['science-4'],
                type: 'text',
                passage:
                  'Meteorology is the science dealing with the atmosphere and its phenomena, including weather and climate. Weather refers to the short-term conditions of the atmosphere at a particular time and place, including temperature, humidity, precipitation, and wind. Climate, on the other hand, is the long-term average of weather patterns in a region.',
                question:
                  'Which of the following is a description of climate, not weather?',
                answerOptions: [
                  {
                    text: 'It is currently raining in Chicago.',
                    rationale: 'This is a short-term condition (weather).',
                    isCorrect: false,
                  },
                  {
                    text: 'The Sahara Desert receives very little rainfall on average throughout the year.',
                    rationale:
                      'Correct. This describes a long-term average pattern, which is climate.',
                    isCorrect: true,
                  },
                  {
                    text: "Tomorrow's forecast is for a high of 75 degrees.",
                    rationale: 'This is a short-term prediction (weather).',
                    isCorrect: false,
                  },
                  {
                    text: 'The wind is blowing from the west today.',
                    rationale: 'This is a short-term condition (weather).',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['science-4'],
                type: 'knowledge',
                question:
                  'What is the layer of gases surrounding the Earth called?',
                answerOptions: [
                  {
                    text: 'The lithosphere',
                    rationale:
                      'The lithosphere is the rigid outer part of the earth, consisting of the crust and upper mantle.',
                    isCorrect: false,
                  },
                  {
                    text: 'The hydrosphere',
                    rationale:
                      "The hydrosphere is all the waters on the earth's surface, such as lakes and seas.",
                    isCorrect: false,
                  },
                  {
                    text: 'The atmosphere',
                    rationale:
                      'Correct. The atmosphere is the envelope of gases surrounding the earth.',
                    isCorrect: true,
                  },
                  {
                    text: 'The asthenosphere',
                    rationale:
                      "The asthenosphere is the upper layer of the earth's mantle, below the lithosphere.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 13,
                type: 'knowledge',
                question: 'A solar eclipse occurs when:',
                answerOptions: [
                  {
                    text: 'The Earth passes between the Sun and the Moon.',
                    rationale: 'This describes a lunar eclipse.',
                    isCorrect: false,
                  },
                  {
                    text: "The Moon passes between the Sun and the Earth, blocking the Sun's light.",
                    rationale:
                      'Correct. This alignment casts a shadow on the Earth.',
                    isCorrect: true,
                  },
                  {
                    text: 'The Sun passes between the Earth and the Moon.',
                    rationale: 'This is not a possible alignment.',
                    isCorrect: false,
                  },
                  {
                    text: 'Another planet passes between the Earth and the Sun.',
                    rationale: 'This is called a transit, not a solar eclipse.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                type: 'image',
                imageUrl: '/Images/Science/ged-scince-fig-7.png',
                question:
                  'This diagram illustrates the rock cycle. What process is required to turn a sedimentary rock into a metamorphic rock?',
                answerOptions: [
                  {
                    text: 'Weathering and erosion',
                    rationale: 'This would break the rock down into sediments.',
                    isCorrect: false,
                  },
                  {
                    text: 'Melting and cooling',
                    rationale: 'This would turn it into igneous rock.',
                    isCorrect: false,
                  },
                  {
                    text: 'Heat and pressure',
                    rationale:
                      'Correct. The diagram shows that heat and pressure transform existing rocks into metamorphic rocks.',
                    isCorrect: true,
                  },
                  {
                    text: 'Compaction and cementation',
                    rationale:
                      'This is the process that forms sedimentary rocks from sediment.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'knowledge',
                question:
                  "Which planet is known as the 'Red Planet' due to its reddish, iron-rich soil?",
                answerOptions: [
                  {
                    text: 'Jupiter',
                    rationale:
                      "Jupiter is a gas giant known for its Great Red Spot, but it is not the 'Red Planet.'",
                    isCorrect: false,
                  },
                  {
                    text: 'Venus',
                    rationale: 'Venus has a thick, yellowish atmosphere.',
                    isCorrect: false,
                  },
                  {
                    text: 'Mars',
                    rationale:
                      'Correct. Mars gets its distinctive red color from iron oxide (rust) on its surface.',
                    isCorrect: true,
                  },
                  {
                    text: 'Saturn',
                    rationale: 'Saturn is a gas giant known for its rings.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
};

// Legacy window attachment
if (typeof window !== 'undefined') {
  window.SCIENCE_QUESTIONS = SCIENCE_QUESTIONS;
}

// Legacy window attachment
if (typeof window !== 'undefined') {
  window.SCIENCE_QUESTIONS = SCIENCE_QUESTIONS;
}
