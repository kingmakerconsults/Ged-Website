const AppData = {
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
                        questions: [
                            { questionNumber: 1, type: 'text', passage: "All living organisms are composed of cells, the basic units of life. The cell theory states that all living things are made of cells, cells are the basic unit of structure and function, and all cells come from pre-existing cells. Within a cell, organelles perform specific functions. The nucleus contains the cell's genetic material (DNA), and mitochondria are responsible for generating energy through cellular respiration.", question: "According to the passage, what is the primary function of mitochondria?", answerOptions: [ { text: "Storing the cell's genetic material.", rationale: "This is the function of the nucleus.", isCorrect: false }, { text: "Controlling all cell activities.", rationale: "This is a broader function of the nucleus.", isCorrect: false }, { text: "Generating energy for the cell.", rationale: "Correct. The passage states mitochondria generate energy.", isCorrect: true }, { text: "Creating new cells.", rationale: "New cells come from pre-existing cells, a process of the entire cell.", isCorrect: false } ] },
                            { questionNumber: 2, type: 'knowledge', question: "Which of the following is the correct order of organization in living things, from simplest to most complex?", answerOptions: [ { text: "Organism, Organ System, Organ, Tissue, Cell", rationale: "This order is reversed.", isCorrect: false }, { text: "Cell, Tissue, Organ, Organ System, Organism", rationale: "Correct. Cells form tissues, tissues form organs, organs form organ systems, and organ systems make up an organism.", isCorrect: true }, { text: "Tissue, Cell, Organ, Organism, Organ System", rationale: "This order is incorrect.", isCorrect: false }, { text: "Cell, Organ, Tissue, Organism, Organ System", rationale: "This order is incorrect.", isCorrect: false } ] },
                        ]
                    },
                    {
                        id: "sci_ecosystems_environment",
                        title: "Ecosystems & Environment",
                        description: "Ecology, food webs, and human impact on the environment.",
                        questions: [
                            { questionNumber: 1, type: 'text', passage: "An ecosystem consists of all the living organisms (biotic factors) in a particular area, along with all the non-living (abiotic) components of the environment, such as sunlight, soil, water, and temperature. These components are linked together through nutrient cycles and energy flows.", question: "Which of the following is an example of an abiotic factor in an ecosystem?", answerOptions: [ { text: "A tree", rationale: "A tree is a living organism (biotic).", isCorrect: false }, { text: "A fungus", rationale: "A fungus is a living organism (biotic).", isCorrect: false }, { text: "The amount of annual rainfall", rationale: "Correct. Rainfall is a non-living component of the environment.", isCorrect: true }, { text: "An insect", rationale: "An insect is a living organism (biotic).", isCorrect: false } ] },
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
                        questions: [
                            { questionNumber: 1, type: 'text', passage: "All matter is made up of atoms, which are the smallest units of an element that maintain the properties of that element. Atoms are composed of three main subatomic particles: protons, neutrons, and electrons. Protons have a positive charge, neutrons have no charge, and electrons have a negative charge.", question: "Which subatomic particle has a positive charge?", answerOptions: [ { text: "Proton", rationale: "Correct. The passage states that protons have a positive charge.", isCorrect: true }, { text: "Neutron", rationale: "Neutrons have no charge.", isCorrect: false }, { text: "Electron", rationale: "Electrons have a negative charge.", isCorrect: false }, { text: "Atom", rationale: "An atom is the whole unit, not a subatomic particle.", isCorrect: false } ] },
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
                        questions: [
                            { questionNumber: 1, type: 'knowledge', question: "A pizza is cut into 8 equal slices. If you eat 3 of the slices, what fraction of the pizza have you eaten?", answerOptions: [ { text: "1/8", rationale: "This would be one slice.", isCorrect: false }, { text: "3/8", rationale: "Correct. You ate 3 out of the 8 total slices.", isCorrect: true }, { text: "5/8", rationale: "This is the fraction of the pizza that is left.", isCorrect: false }, { text: "8/3", rationale: "This is an improper fraction representing more than one pizza.", isCorrect: false } ] },
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
                        questions: [
                           { questionNumber: 1, type: 'text', passage: "Mercantilism was the dominant economic theory during the Age of Exploration. It held that a nation's wealth was measured by its supply of gold and silver. Colonies were seen as essential to this system, existing to provide raw materials to the mother country and to serve as a market for its manufactured goods. This created a closed economic loop designed to make the mother country rich.", question: "Under the theory of mercantilism, what was the primary purpose of colonies?", answerOptions: [ { text: "To develop into independent, self-sufficient nations.", rationale: "This is the opposite of mercantilism, which required colonies to be dependent.", isCorrect: false }, { text: "To serve as military outposts against rival empires.", rationale: "While they could serve this function, their primary purpose under mercantilism was economic.", isCorrect: false }, { text: "To enrich the mother country by providing resources and buying its goods.", rationale: "Correct. The passage clearly states colonies existed to provide raw materials and serve as a market, enriching the mother country.", isCorrect: true }, { text: "To establish free trade agreements with indigenous populations.", rationale: "Mercantilism is a system of controlled, not free, trade.", isCorrect: false } ] }
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
                        questions: [
                            { questionNumber: 1, question: "Choose the correct verb to complete the sentence: 'Each of the students ___ responsible for their own project.'", answerOptions: [ { text: "are", isCorrect: false, "rationale": "The subject is 'Each,' which is a singular pronoun, so it requires a singular verb." }, { text: "is", isCorrect: true, "rationale": "The singular subject 'Each' requires the singular verb 'is'." }, { text: "were", isCorrect: false, "rationale": "'Were' is a plural verb." }, { text: "have been", isCorrect: false, "rationale": "'Have' is a plural verb." } ] }
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
                        type: "reading",
                        article: {},
                        questions: [
                            { "question": "This is a placeholder reading question.", "answerOptions": [ { "text": "Correct", "isCorrect": true }, { "text": "Incorrect", "isCorrect": false } ] }
                        ]
                    }
                ]
            }
        }
    }
};

module.exports = { AppData };