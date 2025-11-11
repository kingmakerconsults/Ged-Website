// Backend premade quiz questions
// This file contains quiz content loaded into the backend

const ALL_QUIZZES = {
  "Science": {
    "icon": "BeakerIcon",
    "categories": {
      "Life Science": {
        "description": "Explore the fundamental principles of living organisms, from the cellular level to entire ecosystems.",
        "topics": [
          {
            "id": "sci_life_science_basics",
            "title": "Life Science Basics",
            "description": "Cell structure, function, photosynthesis, and cellular respiration.",
            "config": {
              "totalTime": 1500,
              "calculator": true,
              "formulaSheet": false,
              "parts": [
                {
                  "name": "Quiz",
                  "questionCount": 12
                }
              ]
            },
            "questions": [
              {
                "questionNumber": 1,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "All living organisms are composed of cells, the basic units of life. The cell theory states that all living things are made of cells, cells are the basic unit of structure and function, and all cells come from pre-existing cells. Within a cell, organelles perform specific functions. The nucleus contains the cell's genetic material (DNA), and mitochondria are responsible for generating energy through cellular respiration.",
                  "imageURL": "",
                  "questionText": "According to the passage, what is the primary function of mitochondria?"
                },
                "answerOptions": [
                  {
                    "text": "Storing the cell's genetic material.",
                    "rationale": "This is the function of the nucleus.",
                    "isCorrect": false
                  },
                  {
                    "text": "Controlling all cell activities.",
                    "rationale": "This is a broader function of the nucleus.",
                    "isCorrect": false
                  },
                  {
                    "text": "Generating energy for the cell.",
                    "rationale": "Correct. The passage states mitochondria generate energy.",
                    "isCorrect": true
                  },
                  {
                    "text": "Creating new cells.",
                    "rationale": "New cells come from pre-existing cells, a process of the entire cell.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 2,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "The hierarchy of biological organization is the arrangement of biological structures from the simplest to the most complex. The simplest level is the cell. A group of similar cells that perform a specific function is a tissue. Tissues of several different types combine to form an organ, which performs a more complex role. Organs work together in organ systems, and all the organ systems of an organism work together to sustain life.",
                  "imageURL": "",
                  "questionText": "Based on the text, which of the following correctly represents the hierarchy of biological organization from simplest to most complex?"
                },
                "answerOptions": [
                  {
                    "text": "Organism, Organ System, Organ, Tissue, Cell",
                    "rationale": "This order is reversed.",
                    "isCorrect": false
                  },
                  {
                    "text": "Cell, Tissue, Organ, Organ System, Organism",
                    "rationale": "Correct. The passage describes this exact order of organization.",
                    "isCorrect": true
                  },
                  {
                    "text": "Tissue, Cell, Organ, Organism, Organ System",
                    "rationale": "This order is incorrect as tissues are made of cells.",
                    "isCorrect": false
                  },
                  {
                    "text": "Cell, Organ, Tissue, Organism, Organ System",
                    "rationale": "This order is incorrect as tissues combine to form organs.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 3,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy. The process uses sunlight, water, and carbon dioxide to create glucose (sugar for energy) and oxygen. This is why plants are called producers; they create their own food.",
                  "imageURL": "",
                  "questionText": "What are the three essential inputs for photosynthesis?"
                },
                "answerOptions": [
                  {
                    "text": "Sunlight, oxygen, and water.",
                    "rationale": "Oxygen is an output, not an input.",
                    "isCorrect": false
                  },
                  {
                    "text": "Sunlight, carbon dioxide, and glucose.",
                    "rationale": "Glucose is a product of photosynthesis.",
                    "isCorrect": false
                  },
                  {
                    "text": "Sunlight, water, and carbon dioxide.",
                    "rationale": "Correct. These are the materials that enter the process.",
                    "isCorrect": true
                  },
                  {
                    "text": "Water, oxygen, and glucose.",
                    "rationale": "Oxygen and glucose are outputs.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 4,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "Which human body system is responsible for transporting oxygen, nutrients, and hormones to cells and removing waste products?"
                },
                "answerOptions": [
                  {
                    "text": "Respiratory system",
                    "rationale": "The respiratory system handles gas exchange in the lungs.",
                    "isCorrect": false
                  },
                  {
                    "text": "Nervous system",
                    "rationale": "The nervous system coordinates signals through nerves.",
                    "isCorrect": false
                  },
                  {
                    "text": "Digestive system",
                    "rationale": "The digestive system breaks down food.",
                    "isCorrect": false
                  },
                  {
                    "text": "Circulatory system",
                    "rationale": "Correct. The circulatory system moves blood and dissolved materials throughout the body.",
                    "isCorrect": true
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 5,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "DNA (deoxyribonucleic acid) is a molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known organisms. A gene is a specific sequence of DNA that codes for a functional product, either RNA or a protein.",
                  "imageURL": "",
                  "questionText": "What is the relationship between DNA and genes?"
                },
                "answerOptions": [
                  {
                    "text": "A gene is a segment of DNA that codes for a specific product.",
                    "rationale": "Correct. Genes are individual sections of the DNA molecule.",
                    "isCorrect": true
                  },
                  {
                    "text": "DNA is a type of gene.",
                    "rationale": "DNA is the entire molecule that contains many genes.",
                    "isCorrect": false
                  },
                  {
                    "text": "DNA and genes are completely unrelated.",
                    "rationale": "Genes are made of DNA, so they are directly related.",
                    "isCorrect": false
                  },
                  {
                    "text": "A gene is larger than a DNA molecule.",
                    "rationale": "Genes are smaller pieces of the DNA molecule.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 6,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "In genetics, what does a Punnett square predict?"
                },
                "answerOptions": [
                  {
                    "text": "The exact genetic makeup of an offspring.",
                    "rationale": "Punnett squares estimate probabilities, not guaranteed outcomes.",
                    "isCorrect": false
                  },
                  {
                    "text": "The probability of an offspring inheriting a particular trait.",
                    "rationale": "Correct. Punnett squares show likely combinations of alleles.",
                    "isCorrect": true
                  },
                  {
                    "text": "The number of chromosomes in a cell.",
                    "rationale": "Chromosome counts are determined with a karyotype.",
                    "isCorrect": false
                  },
                  {
                    "text": "The rate of cellular respiration.",
                    "rationale": "This is unrelated to Punnett squares.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 7,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "Which part of the plant cell is primarily responsible for photosynthesis?"
                },
                "answerOptions": [
                  {
                    "text": "Nucleus",
                    "rationale": "The nucleus stores the cell's genetic information.",
                    "isCorrect": false
                  },
                  {
                    "text": "Mitochondrion",
                    "rationale": "Mitochondria carry out cellular respiration.",
                    "isCorrect": false
                  },
                  {
                    "text": "Chloroplast",
                    "rationale": "Correct. Chloroplasts contain chlorophyll to capture light energy.",
                    "isCorrect": true
                  },
                  {
                    "text": "Cell wall",
                    "rationale": "The cell wall provides structural support.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 8,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Homeostasis is the state of steady internal, physical, and chemical conditions maintained by living systems. This includes keeping body temperature, pH, and fluid balance within certain limits despite external changes.",
                  "imageURL": "",
                  "questionText": "Shivering when you are cold is an example of the body trying to maintain homeostasis by?"
                },
                "answerOptions": [
                  {
                    "text": "Generating heat through muscle contractions.",
                    "rationale": "Correct. Shivering raises body temperature by producing heat.",
                    "isCorrect": true
                  },
                  {
                    "text": "Reducing the body's core temperature.",
                    "rationale": "Shivering acts to increase temperature, not reduce it.",
                    "isCorrect": false
                  },
                  {
                    "text": "Saving energy.",
                    "rationale": "Shivering actually uses additional energy.",
                    "isCorrect": false
                  },
                  {
                    "text": "Increasing fluid balance.",
                    "rationale": "Shivering primarily affects temperature regulation.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 9,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "In the human respiratory system, what is the primary function of the alveoli?"
                },
                "answerOptions": [
                  {
                    "text": "To filter dust and particles from the air.",
                    "rationale": "Filtering happens mainly in the nasal passages and trachea.",
                    "isCorrect": false
                  },
                  {
                    "text": "To produce sound for speech.",
                    "rationale": "The larynx produces sound.",
                    "isCorrect": false
                  },
                  {
                    "text": "To exchange oxygen and carbon dioxide with the blood.",
                    "rationale": "Correct. Gas exchange occurs in the alveoli.",
                    "isCorrect": true
                  },
                  {
                    "text": "To pump air into and out of the lungs.",
                    "rationale": "The diaphragm moves air in and out of the lungs.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 10,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "An allele is a variant form of a gene. If an individual has two identical alleles for a particular gene, they are?"
                },
                "answerOptions": [
                  {
                    "text": "Heterozygous for that gene.",
                    "rationale": "Heterozygous individuals have two different alleles.",
                    "isCorrect": false
                  },
                  {
                    "text": "Homozygous for that gene.",
                    "rationale": "Correct. 'Homo-' means the alleles are the same.",
                    "isCorrect": true
                  },
                  {
                    "text": "Recessive for that gene.",
                    "rationale": "Recessive describes how an allele behaves, not whether the alleles match.",
                    "isCorrect": false
                  },
                  {
                    "text": "Dominant for that gene.",
                    "rationale": "Dominant alleles can be present in homozygous or heterozygous individuals.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 11,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "The nervous system is composed of two main parts: the central nervous system (CNS), which consists of the brain and spinal cord, and the peripheral nervous system (PNS), which consists of the nerves that branch out from the CNS to the rest of the body.",
                  "imageURL": "",
                  "questionText": "A nerve in your arm that sends a signal to your brain is part of which system?"
                },
                "answerOptions": [
                  {
                    "text": "The central nervous system (CNS)",
                    "rationale": "The CNS is limited to the brain and spinal cord.",
                    "isCorrect": false
                  },
                  {
                    "text": "The peripheral nervous system (PNS)",
                    "rationale": "Correct. Nerves outside the brain and spinal cord belong to the PNS.",
                    "isCorrect": true
                  },
                  {
                    "text": "Both the CNS and PNS",
                    "rationale": "Signals travel to the CNS, but the nerve itself is part of the PNS.",
                    "isCorrect": false
                  },
                  {
                    "text": "The circulatory system",
                    "rationale": "This system moves blood, not nerve signals.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 12,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "What is the primary function of the digestive system?"
                },
                "answerOptions": [
                  {
                    "text": "To break down food and absorb nutrients.",
                    "rationale": "Correct. The digestive system processes food for energy and nutrients.",
                    "isCorrect": true
                  },
                  {
                    "text": "To eliminate waste from the blood.",
                    "rationale": "The urinary system primarily removes dissolved wastes from the blood.",
                    "isCorrect": false
                  },
                  {
                    "text": "To send signals throughout the body.",
                    "rationale": "Signal transmission is the job of the nervous system.",
                    "isCorrect": false
                  },
                  {
                    "text": "To produce hormones.",
                    "rationale": "Hormone production is a function of the endocrine system.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              }
            ]
          },
          {
            "id": "sci_ecosystems_environment",
            "title": "Ecosystems & Environment",
            "description": "Ecology, food webs, and human impact on the environment.",
            "config": {
              "totalTime": 1200,
              "calculator": true,
              "formulaSheet": false,
              "parts": [
                {
                  "name": "Quiz",
                  "questionCount": 12
                }
              ]
            },
            "questions": [
              {
                "questionNumber": 1,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "An ecosystem consists of all the living organisms (biotic factors) in a particular area, along with all the non-living (abiotic) components of the environment, such as sunlight, soil, water, and temperature. These components are linked together through nutrient cycles and energy flows.",
                  "imageURL": "",
                  "questionText": "A scientist is studying a forest ecosystem. Which of the following is an abiotic factor she might measure?"
                },
                "answerOptions": [
                  {
                    "text": "The total number of deer.",
                    "rationale": "A deer is a living (biotic) component.",
                    "isCorrect": false
                  },
                  {
                    "text": "The variety of mushroom species.",
                    "rationale": "Mushrooms are living organisms.",
                    "isCorrect": false
                  },
                  {
                    "text": "The average daily temperature.",
                    "rationale": "Correct. Temperature is a non-living environmental factor.",
                    "isCorrect": true
                  },
                  {
                    "text": "The population of pollinating insects.",
                    "rationale": "Insects are biotic components.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 2,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "In a food web, an organism that produces its own food, usually through photosynthesis, is called a?"
                },
                "answerOptions": [
                  {
                    "text": "Consumer",
                    "rationale": "Consumers must eat other organisms.",
                    "isCorrect": false
                  },
                  {
                    "text": "Producer",
                    "rationale": "Correct. Producers make their own food and form the base of most food webs.",
                    "isCorrect": true
                  },
                  {
                    "text": "Decomposer",
                    "rationale": "Decomposers break down dead matter.",
                    "isCorrect": false
                  },
                  {
                    "text": "Scavenger",
                    "rationale": "Scavengers feed on dead organisms but do not produce their own food.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 3,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Consider a simple food web: grasses capture sunlight to grow, rabbits eat the grasses, and hawks prey on the rabbits while fungi break down dead organisms.",
                  "imageURL": "",
                  "questionText": "In this food web, which organism is a primary consumer?"
                },
                "answerOptions": [
                  {
                    "text": "Grasses",
                    "rationale": "Grasses are producers because they make their own food.",
                    "isCorrect": false
                  },
                  {
                    "text": "Rabbits",
                    "rationale": "Correct. Rabbits eat producers and are primary consumers.",
                    "isCorrect": true
                  },
                  {
                    "text": "Hawks",
                    "rationale": "Hawks eat other consumers and are secondary or tertiary consumers.",
                    "isCorrect": false
                  },
                  {
                    "text": "Fungi",
                    "rationale": "Fungi are decomposers that recycle nutrients.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 4,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "The energy pyramid illustrates how energy decreases from one trophic level to the next in an ecosystem. Typically, only about 10% of the energy from one level is transferred to the level above it.",
                  "imageURL": "",
                  "questionText": "If producers contain 10,000 units of energy, about how much energy would be available to secondary consumers?"
                },
                "answerOptions": [
                  {
                    "text": "10,000 units",
                    "rationale": "That amount remains only at the producer level.",
                    "isCorrect": false
                  },
                  {
                    "text": "1,000 units",
                    "rationale": "This is the approximate energy available to primary consumers.",
                    "isCorrect": false
                  },
                  {
                    "text": "100 units",
                    "rationale": "Correct. Secondary consumers receive roughly 10% of the energy eaten by primary consumers.",
                    "isCorrect": true
                  },
                  {
                    "text": "10 units",
                    "rationale": "This is closer to what tertiary consumers might receive.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 5,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "The process by which water evaporates from Earth's surface, condenses into clouds, falls as precipitation, and returns again is called the?"
                },
                "answerOptions": [
                  {
                    "text": "Carbon cycle",
                    "rationale": "The carbon cycle tracks carbon, not water.",
                    "isCorrect": false
                  },
                  {
                    "text": "Nitrogen cycle",
                    "rationale": "The nitrogen cycle follows nitrogen through ecosystems.",
                    "isCorrect": false
                  },
                  {
                    "text": "Water cycle",
                    "rationale": "Correct. It describes the continuous movement of water.",
                    "isCorrect": true
                  },
                  {
                    "text": "Photosynthesis",
                    "rationale": "Photosynthesis is the process plants use to make food.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 6,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Human activities such as burning fossil fuels release large amounts of carbon dioxide into the atmosphere. Carbon dioxide is a greenhouse gas that traps heat and contributes to climate change.",
                  "imageURL": "",
                  "questionText": "According to the passage, what is the primary cause of the recent increase in atmospheric carbon dioxide?"
                },
                "answerOptions": [
                  {
                    "text": "Volcanic eruptions",
                    "rationale": "Volcanoes emit CO₂, but the passage points to human activities.",
                    "isCorrect": false
                  },
                  {
                    "text": "Deforestation",
                    "rationale": "Tree loss matters, but the passage highlights burning fossil fuels.",
                    "isCorrect": false
                  },
                  {
                    "text": "Burning fossil fuels",
                    "rationale": "Correct. The passage names fossil fuels as the main source.",
                    "isCorrect": true
                  },
                  {
                    "text": "Photosynthesis",
                    "rationale": "Photosynthesis removes carbon dioxide from the air.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 7,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "A symbiotic relationship where one organism benefits and the other is neither helped nor harmed is called?"
                },
                "answerOptions": [
                  {
                    "text": "Mutualism",
                    "rationale": "In mutualism, both organisms benefit.",
                    "isCorrect": false
                  },
                  {
                    "text": "Parasitism",
                    "rationale": "Parasitism benefits one organism while harming the other.",
                    "isCorrect": false
                  },
                  {
                    "text": "Commensalism",
                    "rationale": "Correct. One organism benefits and the other is unaffected.",
                    "isCorrect": true
                  },
                  {
                    "text": "Competition",
                    "rationale": "Competition occurs when organisms vie for the same resources.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 8,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Biodiversity refers to the variety of life in a particular habitat or ecosystem. High biodiversity is often a sign of a healthy ecosystem because it increases stability and resilience.",
                  "imageURL": "",
                  "questionText": "What is a primary benefit of high biodiversity in an ecosystem?"
                },
                "answerOptions": [
                  {
                    "text": "All organisms become the same size.",
                    "rationale": "Biodiversity is about variety, not uniform size.",
                    "isCorrect": false
                  },
                  {
                    "text": "The ecosystem becomes more stable and resilient.",
                    "rationale": "Correct. Diverse ecosystems can better withstand disturbances.",
                    "isCorrect": true
                  },
                  {
                    "text": "The total number of organisms decreases.",
                    "rationale": "Biodiversity usually coincides with many different organisms.",
                    "isCorrect": false
                  },
                  {
                    "text": "The food web becomes simpler.",
                    "rationale": "High biodiversity makes food webs more complex.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 9,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "What is the main role of decomposers, such as bacteria and fungi, in an ecosystem?"
                },
                "answerOptions": [
                  {
                    "text": "To produce energy from sunlight.",
                    "rationale": "Producers, not decomposers, capture sunlight.",
                    "isCorrect": false
                  },
                  {
                    "text": "To consume other organisms for energy.",
                    "rationale": "This is the role of consumers.",
                    "isCorrect": false
                  },
                  {
                    "text": "To break down dead matter and recycle nutrients.",
                    "rationale": "Correct. Decomposers return nutrients to the environment.",
                    "isCorrect": true
                  },
                  {
                    "text": "To control the population of primary consumers.",
                    "rationale": "Predators perform that role.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 10,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Natural selection is the process through which populations adapt to their environment. Individuals with traits better suited to the environment are more likely to survive and reproduce.",
                  "imageURL": "",
                  "questionText": "Which of the following is required for natural selection to occur?"
                },
                "answerOptions": [
                  {
                    "text": "All individuals must be identical.",
                    "rationale": "Variation is essential for natural selection.",
                    "isCorrect": false
                  },
                  {
                    "text": "The environment must never change.",
                    "rationale": "Environmental change often drives natural selection.",
                    "isCorrect": false
                  },
                  {
                    "text": "There must be heritable variation within the population.",
                    "rationale": "Correct. Without genetic differences, there is nothing to select.",
                    "isCorrect": true
                  },
                  {
                    "text": "Organisms must choose to adapt.",
                    "rationale": "Adaptation through natural selection is not a conscious choice.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 11,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "An invasive species is an organism that is not native to a location and tends to spread, causing environmental or economic damage.",
                  "imageURL": "",
                  "questionText": "Why are invasive species often so successful in new ecosystems?"
                },
                "answerOptions": [
                  {
                    "text": "They are always larger than native species.",
                    "rationale": "Size alone does not determine success.",
                    "isCorrect": false
                  },
                  {
                    "text": "They often lack natural predators in the new environment.",
                    "rationale": "Correct. Without predators, their populations can grow quickly.",
                    "isCorrect": true
                  },
                  {
                    "text": "They only eat food native species do not use.",
                    "rationale": "They frequently compete directly with native species for food.",
                    "isCorrect": false
                  },
                  {
                    "text": "They reproduce more slowly than native species.",
                    "rationale": "Invasive species often reproduce rapidly.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              },
              {
                "questionNumber": 12,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "The gradual process by which ecosystems change and develop over time is called?"
                },
                "answerOptions": [
                  {
                    "text": "Evolution",
                    "rationale": "Evolution describes changes in populations over generations.",
                    "isCorrect": false
                  },
                  {
                    "text": "Succession",
                    "rationale": "Correct. Ecological succession tracks how communities change over time.",
                    "isCorrect": true
                  },
                  {
                    "text": "Homeostasis",
                    "rationale": "Homeostasis refers to maintaining internal balance.",
                    "isCorrect": false
                  },
                  {
                    "text": "Photosynthesis",
                    "rationale": "Photosynthesis is the process plants use to make food.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-3"
                ]
              }
            ]
          }
        ]
      },
      "Physical Science": {
        "description": "Investigate the principles of chemistry and physics that govern the world around us.",
        "topics": [
          {
            "id": "sci_chem_fundamentals",
            "title": "Chemistry Fundamentals",
            "description": "Properties of matter, atoms, elements, and the periodic table.",
            "config": {
              "totalTime": 1200,
              "calculator": true,
              "formulaSheet": false,
              "parts": [
                {
                  "name": "Quiz",
                  "questionCount": 12
                }
              ]
            },
            "questions": [
              {
                "questionNumber": 1,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "All matter is made up of atoms, which are the smallest units of an element that maintain the properties of that element. Atoms are composed of three main subatomic particles: protons, neutrons, and electrons. Protons have a positive charge, neutrons have no charge, and electrons have a negative charge. The nucleus, at the center of the atom, contains the protons and neutrons.",
                  "imageURL": "",
                  "questionText": "An atom has a neutral charge overall. Based on the passage, what must be true about the number of subatomic particles in this atom?"
                },
                "answerOptions": [
                  {
                    "text": "The number of protons must equal the number of electrons.",
                    "rationale": "Correct. Equal numbers of opposite charges balance to make the atom neutral.",
                    "isCorrect": true
                  },
                  {
                    "text": "The number of protons must equal the number of neutrons.",
                    "rationale": "Neutron counts affect mass but not electrical charge.",
                    "isCorrect": false
                  },
                  {
                    "text": "The number of electrons must equal the number of neutrons.",
                    "rationale": "This relationship is not required for neutrality.",
                    "isCorrect": false
                  },
                  {
                    "text": "There must be no protons.",
                    "rationale": "Without protons, it would not be an atom of an element.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 2,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "Which of Newton's laws of motion is also known as the law of inertia?"
                },
                "answerOptions": [
                  {
                    "text": "First law",
                    "rationale": "Correct. The first law states that objects resist changes in motion unless acted upon by a net force.",
                    "isCorrect": true
                  },
                  {
                    "text": "Second law",
                    "rationale": "The second law relates force, mass, and acceleration (F = ma).",
                    "isCorrect": false
                  },
                  {
                    "text": "Third law",
                    "rationale": "The third law addresses action-reaction force pairs.",
                    "isCorrect": false
                  },
                  {
                    "text": "Law of gravitation",
                    "rationale": "This describes the attraction between masses.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 3,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "What is the unit of force in the International System of Units (SI)?"
                },
                "answerOptions": [
                  {
                    "text": "Joule",
                    "rationale": "The joule measures energy, not force.",
                    "isCorrect": false
                  },
                  {
                    "text": "Watt",
                    "rationale": "The watt measures power.",
                    "isCorrect": false
                  },
                  {
                    "text": "Newton",
                    "rationale": "Correct. The SI unit of force is named after Isaac Newton.",
                    "isCorrect": true
                  },
                  {
                    "text": "Kilogram",
                    "rationale": "The kilogram measures mass.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 4,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Energy cannot be created or destroyed, but it can be transformed from one form to another. For example, a light bulb converts electrical energy into light and heat energy.",
                  "imageURL": "",
                  "questionText": "This principle is known as the law of?"
                },
                "answerOptions": [
                  {
                    "text": "Conservation of mass",
                    "rationale": "That law applies to mass in chemical reactions, not energy.",
                    "isCorrect": false
                  },
                  {
                    "text": "Conservation of energy",
                    "rationale": "Correct. Total energy remains constant, though it changes form.",
                    "isCorrect": true
                  },
                  {
                    "text": "Thermodynamics",
                    "rationale": "Thermodynamics is the broader field; this statement is specifically the conservation of energy.",
                    "isCorrect": false
                  },
                  {
                    "text": "Relativity",
                    "rationale": "Relativity deals with space, time, and gravity.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 5,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "A simple machine that consists of a rigid bar that pivots around a fixed point is called a?"
                },
                "answerOptions": [
                  {
                    "text": "Pulley",
                    "rationale": "A pulley uses a wheel and rope to lift loads.",
                    "isCorrect": false
                  },
                  {
                    "text": "Lever",
                    "rationale": "Correct. A lever rotates around a fulcrum to move loads.",
                    "isCorrect": true
                  },
                  {
                    "text": "Wedge",
                    "rationale": "A wedge is used to split or separate objects.",
                    "isCorrect": false
                  },
                  {
                    "text": "Screw",
                    "rationale": "A screw is an inclined plane wrapped around a cylinder.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 6,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "What is the energy of motion called?"
                },
                "answerOptions": [
                  {
                    "text": "Potential energy",
                    "rationale": "Potential energy is stored energy based on position or condition.",
                    "isCorrect": false
                  },
                  {
                    "text": "Kinetic energy",
                    "rationale": "Correct. Kinetic energy depends on the motion of an object.",
                    "isCorrect": true
                  },
                  {
                    "text": "Chemical energy",
                    "rationale": "Chemical energy is stored in chemical bonds.",
                    "isCorrect": false
                  },
                  {
                    "text": "Thermal energy",
                    "rationale": "Thermal energy relates to temperature and particle motion collectively.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 7,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "A person pushes a box with a force of 50 newtons and the box moves 5 meters. How much work is done on the box?"
                },
                "answerOptions": [
                  {
                    "text": "10 joules",
                    "rationale": "This divides force by distance instead of multiplying.",
                    "isCorrect": false
                  },
                  {
                    "text": "250 joules",
                    "rationale": "Correct. Work equals force multiplied by distance (50 N × 5 m).",
                    "isCorrect": true
                  },
                  {
                    "text": "55 joules",
                    "rationale": "This mistakenly adds the force and distance.",
                    "isCorrect": false
                  },
                  {
                    "text": "0 joules",
                    "rationale": "Work is done because the box moves in the direction of the force.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 8,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "What is the rate at which work is done or energy is transferred?"
                },
                "answerOptions": [
                  {
                    "text": "Force",
                    "rationale": "Force is a push or pull, not a rate of doing work.",
                    "isCorrect": false
                  },
                  {
                    "text": "Power",
                    "rationale": "Correct. Power measures how quickly work is performed.",
                    "isCorrect": true
                  },
                  {
                    "text": "Momentum",
                    "rationale": "Momentum is mass times velocity.",
                    "isCorrect": false
                  },
                  {
                    "text": "Inertia",
                    "rationale": "Inertia is the resistance to a change in motion.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 9,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "Which of the following is an example of a non-contact force?"
                },
                "answerOptions": [
                  {
                    "text": "Friction",
                    "rationale": "Friction requires surfaces to touch.",
                    "isCorrect": false
                  },
                  {
                    "text": "Tension",
                    "rationale": "Tension is transmitted through contact such as a rope.",
                    "isCorrect": false
                  },
                  {
                    "text": "Gravity",
                    "rationale": "Correct. Gravity acts over a distance without direct contact.",
                    "isCorrect": true
                  },
                  {
                    "text": "Air resistance",
                    "rationale": "Air resistance involves contact with air particles.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 10,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "What is the tendency of an object to resist a change in its state of motion?"
                },
                "answerOptions": [
                  {
                    "text": "Inertia",
                    "rationale": "Correct. Inertia increases with mass and resists changes in motion.",
                    "isCorrect": true
                  },
                  {
                    "text": "Acceleration",
                    "rationale": "Acceleration is the rate of change of velocity.",
                    "isCorrect": false
                  },
                  {
                    "text": "Velocity",
                    "rationale": "Velocity describes speed and direction, not resistance to change.",
                    "isCorrect": false
                  },
                  {
                    "text": "Weight",
                    "rationale": "Weight is the force of gravity on an object.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 11,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "Which type of energy is stored in the nucleus of an atom?"
                },
                "answerOptions": [
                  {
                    "text": "Nuclear energy",
                    "rationale": "Correct. Nuclear reactions release energy stored in the nucleus.",
                    "isCorrect": true
                  },
                  {
                    "text": "Chemical energy",
                    "rationale": "Chemical energy resides in chemical bonds between atoms.",
                    "isCorrect": false
                  },
                  {
                    "text": "Elastic energy",
                    "rationale": "Elastic energy is stored in stretched or compressed objects.",
                    "isCorrect": false
                  },
                  {
                    "text": "Gravitational potential energy",
                    "rationale": "This energy depends on height in a gravitational field.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              },
              {
                "questionNumber": 12,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "",
                  "imageURL": "",
                  "questionText": "According to Newton's second law of motion, if you double the net force on an object while its mass stays the same, its acceleration will?"
                },
                "answerOptions": [
                  {
                    "text": "Double",
                    "rationale": "Correct. Acceleration is directly proportional to net force when mass is constant.",
                    "isCorrect": true
                  },
                  {
                    "text": "Be cut in half",
                    "rationale": "Acceleration would decrease if the mass increased, not if force increased.",
                    "isCorrect": false
                  },
                  {
                    "text": "Remain the same",
                    "rationale": "Changing the force changes the acceleration unless the mass also changes.",
                    "isCorrect": false
                  },
                  {
                    "text": "Be quadrupled",
                    "rationale": "Doubling the force does not produce four times the acceleration.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-2"
                ]
              }
            ]
          }
        ]
      },
      "Scientific Numeracy": {
        "description": "Math-in-science skills: density, speed, force, interpreting tables/graphs. No long reading.",
        "topics": [
          {
            "id": "sci_scientific_numeracy_core",
            "title": "Scientific Numeracy Core Skills",
            "description": "Unit rate, density, force, speed, lab tables, conservation of mass.",
            "config": {
              "totalTime": 1200,
              "calculator": true,
              "formulaSheet": true,
              "parts": [
                {
                  "name": "Quiz",
                  "questionCount": 12
                }
              ]
            },
            "questions": [
              {
                "questionNumber": 1,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A botanist measures the height (in cm) of five plants: 15, 18, 15, 22, and 20.</p>",
                "question": "What is the <strong>mean (average)</strong> height of the plants?",
                "answerOptions": [
                  {
                    "text": "15 cm",
                    "rationale": "15 is the mode (most common), not the mean.",
                    "isCorrect": false
                  },
                  {
                    "text": "18 cm",
                    "rationale": "Correct. (15+18+15+22+20)=90; 90÷5=18.",
                    "isCorrect": true
                  },
                  {
                    "text": "18.5 cm",
                    "rationale": "Close, but not the exact average.",
                    "isCorrect": false
                  },
                  {
                    "text": "22 cm",
                    "rationale": "22 is just the tallest plant.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 2,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>In pea plants, purple flowers (P) are dominant over white flowers (p). Two heterozygous plants (Pp × Pp) are crossed.</p>",
                "question": "What percent of offspring are expected to have <strong>white</strong> flowers?",
                "answerOptions": [
                  {
                    "text": "0%",
                    "rationale": "Incorrect. White can appear if the plant gets pp.",
                    "isCorrect": false
                  },
                  {
                    "text": "25%",
                    "rationale": "Correct. The Punnett square gives PP, Pp, Pp, pp → 1 of 4 is pp (white).",
                    "isCorrect": true
                  },
                  {
                    "text": "50%",
                    "rationale": "50% would be too high; only 1 of 4 is pp.",
                    "isCorrect": false
                  },
                  {
                    "text": "75%",
                    "rationale": "75% would be purple, not white.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 3,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A rock has a mass of 60 g and displaces 20 cm³ of water.</p>",
                "question": "What is the rock’s density?",
                "answerOptions": [
                  {
                    "text": "1 g/cm³",
                    "rationale": "That would be 20 g ÷ 20 cm³.",
                    "isCorrect": false
                  },
                  {
                    "text": "3 g/cm³",
                    "rationale": "Correct. Density = mass ÷ volume = 60 ÷ 20 = 3 g/cm³.",
                    "isCorrect": true
                  },
                  {
                    "text": "20 g/cm³",
                    "rationale": "That’s just the volume, not density.",
                    "isCorrect": false
                  },
                  {
                    "text": "40 g/cm³",
                    "rationale": "Not based on 60 ÷ 20.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 4,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A car travels 150 km in 3 hours at a constant speed.</p>",
                "question": "What is the car’s average speed?",
                "answerOptions": [
                  {
                    "text": "50 km/h",
                    "rationale": "Correct. 150 km ÷ 3 h = 50 km/h.",
                    "isCorrect": true
                  },
                  {
                    "text": "30 km/h",
                    "rationale": "Too low. That would be 90 km over 3 h.",
                    "isCorrect": false
                  },
                  {
                    "text": "100 km/h",
                    "rationale": "Too high. That would be 300 km in 3 h.",
                    "isCorrect": false
                  },
                  {
                    "text": "450 km/h",
                    "rationale": "Impossible for the data given.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 5,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A student pushes a box with a force of 50 N across the floor for 4 m.</p>",
                "question": "How much work was done on the box?",
                "answerOptions": [
                  {
                    "text": "12.5 J",
                    "rationale": "This divides instead of multiplying.",
                    "isCorrect": false
                  },
                  {
                    "text": "46 N",
                    "rationale": "Newtons measure force, not work (energy).",
                    "isCorrect": false
                  },
                  {
                    "text": "200 J",
                    "rationale": "Correct. Work W = F × d = 50 N × 4 m = 200 J.",
                    "isCorrect": true
                  },
                  {
                    "text": "200 N",
                    "rationale": "Units are wrong — work is in joules.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 6,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A 2 kg cart accelerates at 3 m/s².</p>",
                "question": "What net force is acting on the cart?",
                "answerOptions": [
                  {
                    "text": "0.67 N",
                    "rationale": "That divides instead of multiplies.",
                    "isCorrect": false
                  },
                  {
                    "text": "1.5 N",
                    "rationale": "Still dividing, not multiplying.",
                    "isCorrect": false
                  },
                  {
                    "text": "5 N",
                    "rationale": "Close, but 2 × 3 is 6, not 5.",
                    "isCorrect": false
                  },
                  {
                    "text": "6 N",
                    "rationale": "Correct. F = m × a = 2 kg × 3 m/s² = 6 N.",
                    "isCorrect": true
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 7,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A student heats four samples of the same liquid:</p>\n          <table>\n            <thead><tr><th>Trial</th><th>Start Temp (°C)</th><th>End Temp (°C)</th></tr></thead>\n            <tbody>\n              <tr><td>A</td><td>22</td><td>30</td></tr>\n              <tr><td>B</td><td>22</td><td>29</td></tr>\n              <tr><td>C</td><td>22</td><td>35</td></tr>\n              <tr><td>D</td><td>22</td><td>28</td></tr>\n            </tbody>\n          </table>",
                "question": "Which trial had the greatest temperature increase?",
                "answerOptions": [
                  {
                    "text": "Trial A",
                    "rationale": "Increase was 30−22 = 8°C.",
                    "isCorrect": false
                  },
                  {
                    "text": "Trial B",
                    "rationale": "Increase was 7°C.",
                    "isCorrect": false
                  },
                  {
                    "text": "Trial C",
                    "rationale": "Correct. Increase was 35−22 = 13°C, the largest.",
                    "isCorrect": true
                  },
                  {
                    "text": "Trial D",
                    "rationale": "Increase was 6°C.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 8,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>Colony counts of bacteria on 5 plates were 12, 15, 15, 18, and 30 (in thousands).</p>",
                "question": "What is the <strong>range</strong> of the data?",
                "answerOptions": [
                  {
                    "text": "12",
                    "rationale": "12 is just the smallest value.",
                    "isCorrect": false
                  },
                  {
                    "text": "18",
                    "rationale": "18 is not max − min.",
                    "isCorrect": false
                  },
                  {
                    "text": "30",
                    "rationale": "30 is just the largest value.",
                    "isCorrect": false
                  },
                  {
                    "text": "18 (thousand)",
                    "rationale": "Correct. Range = 30 − 12 = 18.",
                    "isCorrect": true
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 9,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>In the first 20 minutes of a run, a runner goes 10 km. After 10 minutes the runner had 5 km. Assume constant speed.</p>",
                "question": "What is the runner’s speed during this period (in km/min)?",
                "answerOptions": [
                  {
                    "text": "0.25 km/min",
                    "rationale": "Too low (that would be 5 km in 20 min).",
                    "isCorrect": false
                  },
                  {
                    "text": "0.5 km/min",
                    "rationale": "Correct. 10 km ÷ 20 min = 0.5 km/min.",
                    "isCorrect": true
                  },
                  {
                    "text": "2 km/min",
                    "rationale": "Too high. That would be 40 km in 20 min.",
                    "isCorrect": false
                  },
                  {
                    "text": "20 km/min",
                    "rationale": "Way too high for a human runner.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 10,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A sealed container (nothing can enter or escape) has a total mass of 120 g before a chemical reaction and 120 g after.</p>",
                "question": "Which statement is best supported by this data?",
                "answerOptions": [
                  {
                    "text": "Mass is created during the reaction.",
                    "rationale": "No; mass didn't increase.",
                    "isCorrect": false
                  },
                  {
                    "text": "Mass is destroyed during the reaction.",
                    "rationale": "No; mass didn't decrease.",
                    "isCorrect": false
                  },
                  {
                    "text": "Mass is conserved during the reaction.",
                    "rationale": "Correct. The total stayed 120 g.",
                    "isCorrect": true
                  },
                  {
                    "text": "The container leaked gas.",
                    "rationale": "If it leaked, mass would drop.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 11,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A pump moves 12 liters of water in 4 minutes at a constant rate.</p>",
                "question": "How many liters will it move in 10 minutes?",
                "answerOptions": [
                  {
                    "text": "20 L",
                    "rationale": "That assumes 2 L/min. Actual rate is 3 L/min.",
                    "isCorrect": false
                  },
                  {
                    "text": "24 L",
                    "rationale": "That’s 12 L in 4 min scaled to 8 min, not 10.",
                    "isCorrect": false
                  },
                  {
                    "text": "30 L",
                    "rationale": "Correct. 12 ÷ 4 = 3 L/min. 3 × 10 = 30 L.",
                    "isCorrect": true
                  },
                  {
                    "text": "120 L",
                    "rationale": "Way too high for this rate.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              },
              {
                "questionNumber": 12,
                "qaProfileKey": "numeracy",
                "type": "knowledge",
                "passage": "<p>A household budget is $3,000 per month. Housing is 35% of the budget.</p>",
                "question": "How much money goes to housing each month?",
                "answerOptions": [
                  {
                    "text": "$700",
                    "rationale": "That’s 700 / 3000 ≈ 23%. Too low.",
                    "isCorrect": false
                  },
                  {
                    "text": "$900",
                    "rationale": "That’s 30% of $3,000.",
                    "isCorrect": false
                  },
                  {
                    "text": "$1,050",
                    "rationale": "Correct. 35% of $3,000 = 0.35 × 3000 = $1,050.",
                    "isCorrect": true
                  },
                  {
                    "text": "$1,500",
                    "rationale": "That would be 50%, not 35%.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "science-5",
                  "science-6"
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "Math": {
    "icon": "CalculatorIcon",
    "categories": {
      "Quantitative Problem Solving": {
        "description": "Solve problems using basic math skills like fractions, decimals, percentages, and data analysis.",
        "topics": [
          {
            "id": "math_quant_numbers",
            "title": "Number Sense & Operations",
            "description": "Fractions, decimals, percentages, and ratios.",
            "config": {
              "totalTime": 900,
              "calculator": true,
              "formulaSheet": true,
              "parts": [
                {
                  "name": "Quiz",
                  "questionCount": 1
                }
              ]
            },
            "questions": [
              {
                "questionNumber": 1,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "A baker is making a large batch of cookies. The original recipe calls for 2.5 cups of sugar, but he needs to make 3.5 times the normal amount.",
                  "imageURL": "",
                  "questionText": "How many cups of sugar does the baker need for the large batch?"
                },
                "answerOptions": [
                  {
                    "text": "6.0 cups",
                    "rationale": "This is the result of 2.5 + 3.5, not multiplication.",
                    "isCorrect": false
                  },
                  {
                    "text": "8.75 cups",
                    "rationale": "Correct. 2.5 cups * 3.5 = 8.75 cups.",
                    "isCorrect": true
                  },
                  {
                    "text": "7.5 cups",
                    "rationale": "This is the result of 2.5 * 3, not 3.5.",
                    "isCorrect": false
                  },
                  {
                    "text": "1.0 cups",
                    "rationale": "This is the result of 3.5 - 2.5, not multiplication.",
                    "isCorrect": false
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "Social Studies": {
    "icon": "GlobeIcon",
    "categories": {
      "U.S. History": {
        "description": "Explore the events, figures, and ideas that shaped the United States, from its origins to the present day.",
        "topics": [
          {
            "id": "ss_us_hist_foundations",
            "title": "Foundations (1491-1763)",
            "description": "Exploration, Colonial Regions, Mercantilism, French & Indian War.",
            "config": {
              "totalTime": 900,
              "calculator": false,
              "formulaSheet": false,
              "parts": [
                {
                  "name": "Quiz",
                  "questionCount": 1
                }
              ]
            },
            "questions": [
              {
                "questionNumber": 1,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Mercantilism was the dominant economic theory during the Age of Exploration. It held that a nation's wealth was measured by its supply of gold and silver. Colonies were seen as essential to this system, existing to provide raw materials to the mother country and to serve as a market for its manufactured goods. This created a closed economic loop designed to make the mother country rich.",
                  "imageURL": "",
                  "questionText": "Based on the principles of mercantilism described, which of the following actions would a mother country most likely take?"
                },
                "answerOptions": [
                  {
                    "text": "Encourage its colonies to trade freely with other nations.",
                    "rationale": "This contradicts the idea of a closed economic loop designed to benefit only the mother country.",
                    "isCorrect": false
                  },
                  {
                    "text": "Import manufactured goods from its colonies.",
                    "rationale": "The system dictates that colonies provide raw materials, not manufactured goods.",
                    "isCorrect": false
                  },
                  {
                    "text": "Impose tariffs and restrictions on goods imported into the colonies from other nations.",
                    "rationale": "Correct. This action would protect the mother country's monopoly and ensure the colony remains a dedicated market for its goods.",
                    "isCorrect": true
                  },
                  {
                    "text": "Grant its colonies political independence.",
                    "rationale": "Political control was necessary to maintain economic control under mercantilism.",
                    "isCorrect": false
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "Reasoning Through Language Arts (RLA)": {
    "icon": "BookOpenIcon",
    "categories": {
      "Language & Grammar": {
        "description": "Master the rules of standard English grammar, punctuation, and sentence structure.",
        "topics": [
          {
            "id": "rla_grammar_usage",
            "title": "Grammar & Usage",
            "description": "Subject-verb agreement, pronoun usage, and correct word choice.",
            "config": {
              "totalTime": 900,
              "calculator": false,
              "formulaSheet": false,
              "parts": [
                {
                  "name": "Quiz",
                  "questionCount": 12
                }
              ]
            },
            "questions": [
              {
                "questionNumber": 1,
                "type": "dropdown",
                "content": {
                  "passage": "Read the following sentence: The management team, after reviewing the quarterly reports, [CHOICE] ready to announce its decision.",
                  "imageURL": "",
                  "questionText": "Select the verb that correctly completes the sentence."
                },
                "answerOptions": [
                  {
                    "text": "is",
                    "isCorrect": true,
                    "rationale": "The subject 'team' is a collective noun acting as a single unit, so it takes the singular verb 'is'."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "Even though a team contains many people, here it functions as one body and therefore does not take a plural verb."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "'Were' is past tense and plural, so it does not fit the present-tense context."
                  },
                  {
                    "text": "have been",
                    "isCorrect": false,
                    "rationale": "This plural verb phrase mismatches the singular subject."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 2,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: Neither the players nor the coach [CHOICE] willing to postpone the tournament.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "is",
                    "isCorrect": true,
                    "rationale": "With 'neither...nor,' the verb agrees with the subject closest to it; 'coach' is singular, so use 'is'."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "'Are' would agree with 'players,' but the verb must match the nearer subject 'coach'."
                  },
                  {
                    "text": "be",
                    "isCorrect": false,
                    "rationale": "The base form does not agree with the sentence structure."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "This plural past-tense verb does not match the present context."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 3,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: The boxes of donated books [CHOICE] stacked neatly in the hallway.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "are",
                    "isCorrect": true,
                    "rationale": "The true subject is 'boxes,' which is plural, requiring the verb 'are'."
                  },
                  {
                    "text": "is",
                    "isCorrect": false,
                    "rationale": "A singular verb would be used only if the subject were singular."
                  },
                  {
                    "text": "was",
                    "isCorrect": false,
                    "rationale": "This is past tense and does not match the present tense of the sentence."
                  },
                  {
                    "text": "has been",
                    "isCorrect": false,
                    "rationale": "This perfect tense construction does not align with the simple present structure."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 4,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: Each of the applicants [CHOICE] submitted a portfolio for review.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "has",
                    "isCorrect": true,
                    "rationale": "'Each' is singular, so the verb must be singular: 'has'."
                  },
                  {
                    "text": "have",
                    "isCorrect": false,
                    "rationale": "'Have' is plural and does not agree with the singular subject 'Each'."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "This plural past-tense verb does not match the sentence."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "This plural present-tense verb does not agree with the subject."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 5,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: My brother, along with his friends, [CHOICE] planning a surprise party.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "is",
                    "isCorrect": true,
                    "rationale": "The subject is 'My brother'; the phrase 'along with his friends' is additional information and does not change the singular verb."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "'Are' would agree with a plural subject, but the main subject is singular."
                  },
                  {
                    "text": "be",
                    "isCorrect": false,
                    "rationale": "This form is grammatically incomplete in the sentence."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "This past-tense plural form does not agree with the present singular subject."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 6,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: Either the printers or the fax machine [CHOICE] responsible for the noise in the office.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "is",
                    "isCorrect": true,
                    "rationale": "With 'either...or,' the verb agrees with the subject nearer to it; 'machine' is singular, so 'is' is required."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "'Are' would agree with the plural 'printers,' but the verb must match the nearer subject."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "This plural past-tense verb does not fit the sentence."
                  },
                  {
                    "text": "have been",
                    "isCorrect": false,
                    "rationale": "This plural perfect tense does not agree with the singular subject."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 7,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: The data from the latest studies [CHOICE] especially promising for future treatments.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "are",
                    "isCorrect": true,
                    "rationale": "In academic contexts, 'data' is treated as a plural noun, so it pairs with the plural verb 'are'."
                  },
                  {
                    "text": "is",
                    "isCorrect": false,
                    "rationale": "Using 'is' would treat 'data' as singular, which is not standard in formal writing."
                  },
                  {
                    "text": "was",
                    "isCorrect": false,
                    "rationale": "This past tense does not match the present-tense description."
                  },
                  {
                    "text": "be",
                    "isCorrect": false,
                    "rationale": "The base form cannot serve as the main verb here."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 8,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: The number of volunteers [CHOICE] increasing every week as the event approaches.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "is",
                    "isCorrect": true,
                    "rationale": "'The number' is singular, so the verb must be singular: 'is'."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "'Are' would agree with 'volunteers,' but the true subject is the singular phrase 'The number'."
                  },
                  {
                    "text": "have",
                    "isCorrect": false,
                    "rationale": "This plural verb form does not agree with the subject."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "This past-tense plural verb does not match the present context."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 9,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: A bouquet of roses [CHOICE] waiting on the table when we arrived.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "was",
                    "isCorrect": true,
                    "rationale": "The subject is the singular noun 'bouquet,' so the singular past-tense verb 'was' is appropriate."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "'Were' would be used with a plural subject, but 'bouquet' is singular."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "This plural present-tense verb does not match the sentence."
                  },
                  {
                    "text": "be",
                    "isCorrect": false,
                    "rationale": "The infinitive form does not fit grammatically."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 10,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: Neither of the solutions [CHOICE] acceptable to the client.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "is",
                    "isCorrect": true,
                    "rationale": "'Neither' takes a singular verb, so 'is' is the correct choice."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "This plural verb does not agree with the singular subject 'Neither'."
                  },
                  {
                    "text": "have been",
                    "isCorrect": false,
                    "rationale": "This plural verb phrase disagrees with the singular subject."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "This past-tense plural verb does not match the structure."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 11,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: The team of engineers [CHOICE] completing its prototype ahead of schedule.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "is",
                    "isCorrect": true,
                    "rationale": "The subject 'team' is singular even though it contains many members, so the verb must be 'is'."
                  },
                  {
                    "text": "are",
                    "isCorrect": false,
                    "rationale": "'Are' would treat 'team' as plural, which is inconsistent with the collective noun usage here."
                  },
                  {
                    "text": "be",
                    "isCorrect": false,
                    "rationale": "The base form does not work as the main verb."
                  },
                  {
                    "text": "were",
                    "isCorrect": false,
                    "rationale": "This plural past-tense verb does not match the sentence."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              },
              {
                "questionNumber": 12,
                "type": "dropdown",
                "content": {
                  "passage": "Choose the verb that completes the sentence: Both the manager and the assistants [CHOICE] attending the regional conference this month.",
                  "imageURL": "",
                  "questionText": "Which option correctly completes the sentence?"
                },
                "answerOptions": [
                  {
                    "text": "are",
                    "isCorrect": true,
                    "rationale": "'Both...and' creates a plural subject, so the plural verb 'are' is needed."
                  },
                  {
                    "text": "is",
                    "isCorrect": false,
                    "rationale": "A singular verb would not agree with the compound subject."
                  },
                  {
                    "text": "was",
                    "isCorrect": false,
                    "rationale": "This past-tense singular verb does not match the present plural subject."
                  },
                  {
                    "text": "has been",
                    "isCorrect": false,
                    "rationale": "This singular verb phrase still fails to agree with the plural subject."
                  }
                ],
                "challenge_tags": [
                  "rla-6"
                ]
              }
            ]
          }
        ]
      },
      "Reading Comprehension: Informational Texts": {
        "description": "Practice analyzing non-fiction texts to find main ideas, evaluate arguments, and interpret graphics.",
        "topics": [
          {
            "id": "rla_info_main_idea",
            "title": "Main Idea & Details",
            "description": "Finding the central idea and supporting evidence in non-fiction.",
            "config": {
              "totalTime": 900,
              "calculator": false,
              "formulaSheet": false,
              "parts": [
                {
                  "name": "Quiz",
                  "questionCount": 12
                }
              ]
            },
            "questions": [
              {
                "questionNumber": 1,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "The rise of automation in the 21st century presents both opportunities and challenges. On one hand, it can lead to increased productivity and economic growth. On the other hand, it threatens to displace human workers in many industries, from manufacturing to customer service. A key challenge for society is to manage this transition by investing in education and retraining programs that equip workers for the jobs of the future.",
                  "imageURL": "",
                  "questionText": "What is the central challenge presented in the passage?"
                },
                "answerOptions": [
                  {
                    "text": "The lack of economic growth.",
                    "rationale": "The passage states automation can lead to growth.",
                    "isCorrect": false
                  },
                  {
                    "text": "The need to re-skill the workforce in response to automation.",
                    "rationale": "Correct. The passage identifies retraining workers as the main challenge.",
                    "isCorrect": true
                  },
                  {
                    "text": "The failure of automation technology.",
                    "rationale": "The passage assumes automation is successful and expanding.",
                    "isCorrect": false
                  },
                  {
                    "text": "The decline of the manufacturing industry.",
                    "rationale": "This is one example of disruption, not the passage's central challenge.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 2,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "A neighborhood library recently expanded its digital services. Patrons can now borrow e-books, stream educational videos, and attend online author talks. Librarians report that more working parents are participating because the flexible schedule fits their routines.",
                  "imageURL": "",
                  "questionText": "Which statement best expresses the main idea of the passage?"
                },
                "answerOptions": [
                  {
                    "text": "The library stopped offering in-person programs.",
                    "rationale": "The passage does not say in-person events ended.",
                    "isCorrect": false
                  },
                  {
                    "text": "Digital services help the library reach patrons with busy schedules.",
                    "rationale": "Correct. The passage emphasizes how the new digital options engage working parents.",
                    "isCorrect": true
                  },
                  {
                    "text": "Educational videos are the most popular resource at the library.",
                    "rationale": "The passage does not compare resource popularity.",
                    "isCorrect": false
                  },
                  {
                    "text": "Libraries should only host events in the evening.",
                    "rationale": "The passage never recommends a specific time for events.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 3,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "The city introduced a curbside composting program to reduce landfill waste. Residents received small kitchen bins and instructions for separating food scraps. After six months, landfill contributions dropped by 20 percent, and community gardens benefited from free compost.",
                  "imageURL": "",
                  "questionText": "What is the main idea of the passage?"
                },
                "answerOptions": [
                  {
                    "text": "Composting is too complicated for most residents to try.",
                    "rationale": "The passage shows residents succeeded with composting.",
                    "isCorrect": false
                  },
                  {
                    "text": "The new composting program helped the city reduce waste and support gardens.",
                    "rationale": "Correct. The passage focuses on the program's positive results.",
                    "isCorrect": true
                  },
                  {
                    "text": "Landfills are the only place to dispose of food scraps.",
                    "rationale": "The passage describes composting as an alternative.",
                    "isCorrect": false
                  },
                  {
                    "text": "Kitchen bins are expensive to provide to residents.",
                    "rationale": "Cost is not mentioned in the passage.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 4,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "An after-school robotics club meets twice a week at the community center. Students build machines that solve real-world problems, such as sorting recyclables or monitoring water quality. Coaches say the projects teach coding, teamwork, and persistence when early designs fail.",
                  "imageURL": "",
                  "questionText": "Which statement best summarizes the passage?"
                },
                "answerOptions": [
                  {
                    "text": "Students only learn coding by copying online tutorials.",
                    "rationale": "The passage highlights hands-on projects, not copying tutorials.",
                    "isCorrect": false
                  },
                  {
                    "text": "The robotics club gives students practical experience solving problems and collaborating.",
                    "rationale": "Correct. The passage stresses real-world projects that build teamwork and perseverance.",
                    "isCorrect": true
                  },
                  {
                    "text": "Robotics projects never face setbacks during testing.",
                    "rationale": "The passage states students persist when designs fail.",
                    "isCorrect": false
                  },
                  {
                    "text": "Only high school seniors may join the robotics club.",
                    "rationale": "Eligibility is not mentioned.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 5,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "To improve public transportation, the city added more express bus routes and built sheltered stops with digital timetables. Commuters now spend less time waiting, and local businesses near the upgraded stops report increased customer visits.",
                  "imageURL": "",
                  "questionText": "What is the main idea of the passage?"
                },
                "answerOptions": [
                  {
                    "text": "Digital timetables are confusing for most riders.",
                    "rationale": "The passage indicates the upgrades helped riders, not confused them.",
                    "isCorrect": false
                  },
                  {
                    "text": "City transportation upgrades made commuting more efficient and supported nearby businesses.",
                    "rationale": "Correct. The passage connects the improvements to benefits for riders and local shops.",
                    "isCorrect": true
                  },
                  {
                    "text": "Commuters should avoid express buses during rush hour.",
                    "rationale": "The passage suggests express routes improved service during busy times.",
                    "isCorrect": false
                  },
                  {
                    "text": "Businesses near bus stops prefer fewer customers.",
                    "rationale": "The passage says businesses saw increased visits, not fewer.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 6,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "A science museum unveiled an interactive exhibit about ecosystems. Visitors manipulate touchscreens to adjust rainfall, temperature, and animal populations, watching how each change affects the environment. Teachers report that students now better understand the balance that ecosystems require.",
                  "imageURL": "",
                  "questionText": "Which statement best captures the main idea?"
                },
                "answerOptions": [
                  {
                    "text": "Interactive exhibits distract students from learning.",
                    "rationale": "The passage shows the exhibit improves understanding.",
                    "isCorrect": false
                  },
                  {
                    "text": "Hands-on exhibits can help visitors grasp complex science concepts.",
                    "rationale": "Correct. The passage highlights how the interactive display deepens comprehension.",
                    "isCorrect": true
                  },
                  {
                    "text": "Museums should limit technology in their displays.",
                    "rationale": "The passage praises technology's impact rather than criticizing it.",
                    "isCorrect": false
                  },
                  {
                    "text": "Teachers prefer to avoid taking students on field trips.",
                    "rationale": "The passage indicates teachers value the museum visits.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 7,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "A local business incubator offers mentorship, shared office space, and marketing workshops for new entrepreneurs. Participants say the guidance helps them avoid costly mistakes and launch products faster than they could alone.",
                  "imageURL": "",
                  "questionText": "What is the main idea of the passage?"
                },
                "answerOptions": [
                  {
                    "text": "Business incubators only provide free rent to companies.",
                    "rationale": "The passage stresses mentorship and workshops, not just space.",
                    "isCorrect": false
                  },
                  {
                    "text": "Support from the incubator helps entrepreneurs develop their businesses more effectively.",
                    "rationale": "Correct. The passage focuses on how the incubator's resources speed progress.",
                    "isCorrect": true
                  },
                  {
                    "text": "Entrepreneurs should avoid outside feedback when launching products.",
                    "rationale": "The passage suggests guidance is valuable, not harmful.",
                    "isCorrect": false
                  },
                  {
                    "text": "Marketing workshops are unnecessary for startups.",
                    "rationale": "The passage describes the workshops as helpful, not unnecessary.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 8,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "The school district created a virtual tutoring program that pairs students with teachers after class. Sessions are recorded so families can review strategies at home. Early data shows improved homework completion and higher quiz scores for participants.",
                  "imageURL": "",
                  "questionText": "Which choice states the main idea of the passage?"
                },
                "answerOptions": [
                  {
                    "text": "Virtual tutoring has not changed student performance.",
                    "rationale": "The passage says quiz scores improved for participants.",
                    "isCorrect": false
                  },
                  {
                    "text": "The new online tutoring program is helping students complete homework and raise scores.",
                    "rationale": "Correct. The passage emphasizes the program's positive impact.",
                    "isCorrect": true
                  },
                  {
                    "text": "Families should avoid reviewing recorded lessons.",
                    "rationale": "Recordings are presented as a helpful resource, not something to avoid.",
                    "isCorrect": false
                  },
                  {
                    "text": "Teachers no longer hold classes during the day.",
                    "rationale": "The passage discusses additional tutoring, not replacing classes.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 9,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "Volunteers organized a monthly neighborhood cleanup to address litter in local parks. They track the amount of trash collected and share progress with residents. After three months, the parks require fewer cleanups because people are throwing away less waste.",
                  "imageURL": "",
                  "questionText": "What is the main idea of the passage?"
                },
                "answerOptions": [
                  {
                    "text": "The cleanup events failed to make any difference in the parks.",
                    "rationale": "The passage reports that litter decreased over time.",
                    "isCorrect": false
                  },
                  {
                    "text": "Community cleanups encouraged residents to reduce litter in local parks.",
                    "rationale": "Correct. The passage highlights the positive results of the cleanup initiative.",
                    "isCorrect": true
                  },
                  {
                    "text": "Volunteers should focus on cleaning only one park.",
                    "rationale": "The passage does not limit the effort to a single park.",
                    "isCorrect": false
                  },
                  {
                    "text": "Trash data should be kept private from residents.",
                    "rationale": "The passage says volunteers share progress with the community.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 10,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "After recent flooding, the city invested in new stormwater drains and restored wetlands along the river. Engineers explain that these upgrades absorb excess rainwater and reduce the strain on older infrastructure.",
                  "imageURL": "",
                  "questionText": "Which statement best captures the main idea?"
                },
                "answerOptions": [
                  {
                    "text": "Wetlands have no effect on flooding.",
                    "rationale": "The passage states wetlands help absorb rainwater.",
                    "isCorrect": false
                  },
                  {
                    "text": "The city's flood-control investments aim to manage heavy rainfall more effectively.",
                    "rationale": "Correct. The passage focuses on new drains and wetlands reducing flood risk.",
                    "isCorrect": true
                  },
                  {
                    "text": "Engineers prefer to ignore aging infrastructure.",
                    "rationale": "The passage shows engineers upgrading systems, not ignoring them.",
                    "isCorrect": false
                  },
                  {
                    "text": "Flooding is unavoidable, so preparation is unnecessary.",
                    "rationale": "The passage describes proactive steps to handle flooding.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 11,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "A regional hospital launched a wellness program for staff members. Participants receive nutrition counseling, fitness classes, and stress-management workshops. Administrators note that employees are taking fewer sick days and report higher job satisfaction.",
                  "imageURL": "",
                  "questionText": "What is the main idea of the passage?"
                },
                "answerOptions": [
                  {
                    "text": "Wellness programs have no effect on employees.",
                    "rationale": "The passage states workers report higher satisfaction and fewer sick days.",
                    "isCorrect": false
                  },
                  {
                    "text": "The hospital's wellness program is improving staff health and morale.",
                    "rationale": "Correct. The passage highlights the positive outcomes of the program.",
                    "isCorrect": true
                  },
                  {
                    "text": "Stress-management workshops replaced all medical training.",
                    "rationale": "Medical training is not mentioned in the passage.",
                    "isCorrect": false
                  },
                  {
                    "text": "Employees dislike fitness classes offered at work.",
                    "rationale": "The passage suggests staff members appreciate the offerings.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              },
              {
                "questionNumber": 12,
                "type": "multiple-choice-text",
                "content": {
                  "passage": "The community theater partnered with local schools to produce a historical play. Students interviewed long-time residents, crafted set pieces, and performed for families. Audience members said the production strengthened connections between generations.",
                  "imageURL": "",
                  "questionText": "Which statement best states the main idea?"
                },
                "answerOptions": [
                  {
                    "text": "The theater production created conflict between students and residents.",
                    "rationale": "The passage explains the project built connections, not conflict.",
                    "isCorrect": false
                  },
                  {
                    "text": "Collaboration on the play brought students and community members together.",
                    "rationale": "Correct. The passage emphasizes how the partnership strengthened relationships.",
                    "isCorrect": true
                  },
                  {
                    "text": "Set design was more important than the interviews.",
                    "rationale": "The passage does not rank the tasks in importance.",
                    "isCorrect": false
                  },
                  {
                    "text": "Families refused to attend the performance.",
                    "rationale": "Audience members attended and praised the production.",
                    "isCorrect": false
                  }
                ],
                "challenge_tags": [
                  "rla-1"
                ]
              }
            ]
          }
        ]
      }
    }
  }
};

module.exports = { ALL_QUIZZES };
