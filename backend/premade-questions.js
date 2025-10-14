const ALL_QUIZZES = {
    "Science": {
        icon: "BeakerIcon",
        categories: {
            "Life Science": {
                description: "Explore the fundamental principles of living organisms, from the cellular level to entire ecosystems.",
                topics: [
                    {
                        id: "sci_life_science_basics",
                        title: "Life Science Basics",
                        description: "Cell structure, function, photosynthesis, and cellular respiration.",
                        config: {
                            totalTime: 25 * 60,
                            calculator: true,
                            formulaSheet: false,
                            parts: [{ name: "Quiz", questionCount: 2 }]
                        },
                        questions: [
                            {
                                questionNumber: 1,
                                type: 'multiple-choice-text',
                                content: {
                                    passage: "All living organisms are composed of cells, the basic units of life. The cell theory states that all living things are made of cells, cells are the basic unit of structure and function, and all cells come from pre-existing cells. Within a cell, organelles perform specific functions. The nucleus contains the cell's genetic material (DNA), and mitochondria are responsible for generating energy through cellular respiration.",
                                    imageURL: "",
                                    questionText: "According to the passage, what is the primary function of mitochondria?"
                                },
                                answerOptions: [ { text: "Storing the cell's genetic material.", rationale: "This is the function of the nucleus.", isCorrect: false }, { text: "Controlling all cell activities.", rationale: "This is a broader function of the nucleus.", isCorrect: false }, { text: "Generating energy for the cell.", rationale: "Correct. The passage states mitochondria generate energy.", isCorrect: true }, { text: "Creating new cells.", rationale: "New cells come from pre-existing cells, a process of the entire cell.", isCorrect: false } ]
                            },
                            {
                                questionNumber: 2,
                                type: 'multiple-choice-text',
                                content: {
                                    passage: "The hierarchy of biological organization is the arrangement of biological structures from the simplest to the most complex. The simplest level is the cell. A group of similar cells that perform a specific function is a tissue. Tissues of several different types combine to form an organ, which performs a more complex role. Organs work together in organ systems, and all the organ systems of an organism work together to sustain life.",
                                    imageURL: "",
                                    questionText: "Based on the text, which of the following correctly represents the hierarchy of biological organization from simplest to most complex?"
                                },
                                answerOptions: [ { text: "Organism, Organ System, Organ, Tissue, Cell", rationale: "This order is reversed.", isCorrect: false }, { text: "Cell, Tissue, Organ, Organ System, Organism", rationale: "Correct. The passage describes this exact order of organization.", isCorrect: true }, { text: "Tissue, Cell, Organ, Organism, Organ System", rationale: "This order is incorrect as tissues are made of cells.", isCorrect: false }, { text: "Cell, Organ, Tissue, Organism, Organ System", rationale: "This order is incorrect as tissues combine to form organs.", isCorrect: false } ]
                            }
                        ]
                    },
                    {
                        id: "sci_ecosystems_environment",
                        title: "Ecosystems & Environment",
                        description: "Ecology, food webs, and human impact on the environment.",
                        config: {
                            totalTime: 15 * 60,
                            calculator: true,
                            formulaSheet: false,
                            parts: [{ name: "Quiz", questionCount: 1 }]
                        },
                        questions: [
                            {
                                questionNumber: 1,
                                type: 'multiple-choice-text',
                                content: {
                                    passage: "An ecosystem consists of all the living organisms (biotic factors) in a particular area, along with all the non-living (abiotic) components of the environment, such as sunlight, soil, water, and temperature. These components are linked together through nutrient cycles and energy flows.",
                                    imageURL: "",
                                    questionText: "A scientist is studying a forest ecosystem. Which of the following is an abiotic factor she might measure?"
                                },
                                answerOptions: [ { text: "The total number of deer.", rationale: "A deer is a living organism (biotic).", isCorrect: false }, { text: "The variety of mushroom species.", rationale: "A fungus is a living organism (biotic).", isCorrect: false }, { text: "The average daily temperature.", rationale: "Correct. Temperature is a non-living component of the environment.", isCorrect: true }, { text: "The population of pollinating insects.", rationale: "An insect is a living organism (biotic).", isCorrect: false } ]
                            }
                        ]
                    }
                ]
            },
            "Physical Science": {
                description: "Investigate the principles of chemistry and physics that govern the world around us.",
                topics: [
                    {
                        id: "sci_chem_fundamentals",
                        title: "Chemistry Fundamentals",
                        description: "Properties of matter, atoms, elements, and the periodic table.",
                        config: {
                            totalTime: 15 * 60,
                            calculator: true,
                            formulaSheet: false,
                            parts: [{ name: "Quiz", questionCount: 1 }]
                        },
                        questions: [
                            {
                                questionNumber: 1,
                                type: 'multiple-choice-text',
                                content: {
                                    passage: "All matter is made up of atoms, which are the smallest units of an element that maintain the properties of that element. Atoms are composed of three main subatomic particles: protons, neutrons, and electrons. Protons have a positive charge, neutrons have no charge, and electrons have a negative charge. The nucleus, at the center of the atom, contains the protons and neutrons.",
                                    imageURL: "",
                                    questionText: "An atom has a neutral charge overall. Based on the passage, what must be true about the number of subatomic particles in this atom?"
                                },
                                answerOptions: [ { text: "The number of protons must equal the number of electrons.", rationale: "Correct. To have a neutral charge, the positive charges (protons) must be balanced by an equal number of negative charges (electrons).", isCorrect: true }, { text: "The number of protons must equal the number of neutrons.", rationale: "The number of neutrons affects the atom's mass (isotope), not its charge.", isCorrect: false }, { text: "The number of electrons must equal the number of neutrons.", rationale: "This does not determine the charge.", isCorrect: false }, { text: "There must be no protons.", rationale: "If there were no protons, it would not be an atom of an element.", isCorrect: false } ]
                            }
                        ]
                    }
                ]
            }
        }
    },
    "Math": {
        icon: "CalculatorIcon",
        categories: {
            "Quantitative Problem Solving": {
                description: "Solve problems using basic math skills like fractions, decimals, percentages, and data analysis.",
                topics: [
                    {
                        id: "math_quant_numbers",
                        title: "Number Sense & Operations",
                        description: "Fractions, decimals, percentages, and ratios.",
                        config: {
                            totalTime: 15 * 60,
                            calculator: true,
                            formulaSheet: true,
                            parts: [{ name: "Quiz", questionCount: 1 }]
                        },
                        questions: [
                            {
                                questionNumber: 1,
                                type: 'multiple-choice-text',
                                content: {
                                    passage: "A baker is making a large batch of cookies. The original recipe calls for 2.5 cups of sugar, but he needs to make 3.5 times the normal amount.",
                                    imageURL: "",
                                    questionText: "How many cups of sugar does the baker need for the large batch?"
                                },
                                answerOptions: [ { text: "6.0 cups", rationale: "This is the result of 2.5 + 3.5, not multiplication.", isCorrect: false }, { text: "8.75 cups", rationale: "Correct. 2.5 cups * 3.5 = 8.75 cups.", isCorrect: true }, { text: "7.5 cups", rationale: "This is the result of 2.5 * 3, not 3.5.", isCorrect: false }, { text: "1.0 cups", rationale: "This is the result of 3.5 - 2.5, not multiplication.", isCorrect: false } ]
                            }
                        ]
                    }
                ]
            }
        }
    },
    "Social Studies": {
        icon: "GlobeIcon",
        categories: {
            "U.S. History": {
                description: "Explore the events, figures, and ideas that shaped the United States, from its origins to the present day.",
                topics: [
                    {
                        id: "ss_us_hist_foundations",
                        title: "Foundations (1491-1763)",
                        description: "Exploration, Colonial Regions, Mercantilism, French & Indian War.",
                        config: {
                            totalTime: 15 * 60,
                            calculator: false,
                            formulaSheet: false,
                            parts: [{ name: "Quiz", questionCount: 1 }]
                        },
                        questions: [
                           {
                                questionNumber: 1,
                                type: 'multiple-choice-text',
                                content: {
                                    passage: "Mercantilism was the dominant economic theory during the Age of Exploration. It held that a nation's wealth was measured by its supply of gold and silver. Colonies were seen as essential to this system, existing to provide raw materials to the mother country and to serve as a market for its manufactured goods. This created a closed economic loop designed to make the mother country rich.",
                                    imageURL: "",
                                    questionText: "Based on the principles of mercantilism described, which of the following actions would a mother country most likely take?"
                                },
                                answerOptions: [ { text: "Encourage its colonies to trade freely with other nations.", rationale: "This contradicts the idea of a closed economic loop designed to benefit only the mother country.", isCorrect: false }, { text: "Import manufactured goods from its colonies.", rationale: "The system dictates that colonies provide raw materials, not manufactured goods.", isCorrect: false }, { text: "Impose tariffs and restrictions on goods imported into the colonies from other nations.", rationale: "Correct. This action would protect the mother country's monopoly and ensure the colony remains a dedicated market for its goods.", isCorrect: true }, { text: "Grant its colonies political independence.", rationale: "Political control was necessary to maintain economic control under mercantilism.", isCorrect: false } ]
                           }
                        ]
                    }
                ]
            }
        }
    },
    "Reasoning Through Language Arts (RLA)": {
        icon: "BookOpenIcon",
        categories: {
            "Language & Grammar": {
                description: "Master the rules of standard English grammar, punctuation, and sentence structure.",
                topics: [
                    {
                        id: "rla_grammar_usage",
                        title: "Grammar & Usage",
                        description: "Subject-verb agreement, pronoun usage, and correct word choice.",
                        config: {
                            totalTime: 15 * 60,
                            calculator: false,
                            formulaSheet: false,
                            parts: [{ name: "Quiz", questionCount: 1 }]
                        },
                        questions: [
                            {
                                questionNumber: 1,
                                type: 'dropdown',
                                content: {
                                    passage: "Read the following sentence: The management team, after reviewing the quarterly reports, [CHOICE] ready to announce its decision.",
                                    imageURL: "",
                                    questionText: "Select the verb that correctly completes the sentence."
                                },
                                answerOptions: [ { text: "is", isCorrect: true, rationale: "The subject 'team' is a collective noun that acts as a single unit, so it requires the singular verb 'is'." }, { text: "are", isCorrect: false, rationale: "While 'team' is made of multiple people, in this context it is acting as one body, making the singular verb correct." }, { text: "were", isCorrect: false, rationale: "'Were' is a plural, past-tense verb and does not fit the context." }, { text: "have been", isCorrect: false, rationale: "'Have' is a plural verb." } ]
                            }
                        ]
                    }
                ]
            },
            "Reading Comprehension: Informational Texts": {
                description: "Practice analyzing non-fiction texts to find main ideas, evaluate arguments, and interpret graphics.",
                topics: [
                    {
                        id: "rla_info_main_idea",
                        title: "Main Idea & Details",
                        description: "Finding the central idea and supporting evidence in non-fiction.",
                        config: {
                            totalTime: 15 * 60,
                            calculator: false,
                            formulaSheet: false,
                            parts: [{ name: "Quiz", questionCount: 1 }]
                        },
                        questions: [
                            {
                                questionNumber: 1,
                                type: 'multiple-choice-text',
                                content: {
                                    passage: "The rise of automation in the 21st century presents both opportunities and challenges. On one hand, it can lead to increased productivity and economic growth. On the other hand, it threatens to displace human workers in many industries, from manufacturing to customer service. A key challenge for society is to manage this transition by investing in education and retraining programs that equip workers for the jobs of the future.",
                                    imageURL: "",
                                    questionText: "What is the central challenge presented in the passage?"
                                },
                                answerOptions: [ { text: "The lack of economic growth.", rationale: "The passage states automation can lead to growth.", isCorrect: false }, { text: "The need to re-skill the workforce in response to automation.", rationale: "Correct. The passage identifies managing the transition through education and retraining as the key challenge.", isCorrect: true }, { text: "The failure of automation technology.", rationale: "The passage assumes automation is rising and effective.", isCorrect: false }, { text: "The decline of the manufacturing industry.", rationale: "This is mentioned as one affected area, but the central challenge is broader.", isCorrect: false } ]
                            }
                        ]
                    }
                ]
            }
        }
    }
};

module.exports = { ALL_QUIZZES };