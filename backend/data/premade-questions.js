const SCIENTIFIC_NUMERACY_QUESTIONS = [
    {
        questionNumber: 1,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A botanist measures the height (in cm) of five plants: 15, 18, 15, 22, and 20.</p>",
        question: "What is the <strong>mean (average)</strong> height of the plants?",
        answerOptions: [
            { text: "15 cm", rationale: "15 is the mode (most common), not the mean.", isCorrect: false },
            { text: "18 cm", rationale: "Correct. (15+18+15+22+20)=90; 90÷5=18.", isCorrect: true },
            { text: "18.5 cm", rationale: "Close, but not the exact average.", isCorrect: false },
            { text: "22 cm", rationale: "22 is just the tallest plant.", isCorrect: false }
        ]
    },
    {
        questionNumber: 2,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>In pea plants, purple flowers (P) are dominant over white flowers (p). Two heterozygous plants (Pp × Pp) are crossed.</p>",
        question: "What percent of offspring are expected to have <strong>white</strong> flowers?",
        answerOptions: [
            { text: "0%", rationale: "Incorrect. White can appear if the plant gets pp.", isCorrect: false },
            { text: "25%", rationale: "Correct. The Punnett square gives PP, Pp, Pp, pp → 1 of 4 is pp (white).", isCorrect: true },
            { text: "50%", rationale: "50% would be too high; only 1 of 4 is pp.", isCorrect: false },
            { text: "75%", rationale: "75% would be purple, not white.", isCorrect: false }
        ]
    },
    {
        questionNumber: 3,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A rock has a mass of 60 g and displaces 20 cm³ of water.</p>",
        question: "What is the rock’s density?",
        answerOptions: [
            { text: "1 g/cm³", rationale: "That would be 20 g ÷ 20 cm³.", isCorrect: false },
            { text: "3 g/cm³", rationale: "Correct. Density = mass ÷ volume = 60 ÷ 20 = 3 g/cm³.", isCorrect: true },
            { text: "20 g/cm³", rationale: "That’s just the volume, not density.", isCorrect: false },
            { text: "40 g/cm³", rationale: "Not based on 60 ÷ 20.", isCorrect: false }
        ]
    },
    {
        questionNumber: 4,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A car travels 150 km in 3 hours at a constant speed.</p>",
        question: "What is the car’s average speed?",
        answerOptions: [
            { text: "50 km/h", rationale: "Correct. 150 km ÷ 3 h = 50 km/h.", isCorrect: true },
            { text: "30 km/h", rationale: "Too low. That would be 90 km over 3 h.", isCorrect: false },
            { text: "100 km/h", rationale: "Too high. That would be 300 km in 3 h.", isCorrect: false },
            { text: "450 km/h", rationale: "Impossible for the data given.", isCorrect: false }
        ]
    },
    {
        questionNumber: 5,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A student pushes a box with a force of 50 N across the floor for 4 m.</p>",
        question: "How much work was done on the box?",
        answerOptions: [
            { text: "12.5 J", rationale: "This divides instead of multiplying.", isCorrect: false },
            { text: "46 N", rationale: "Newtons measure force, not work (energy).", isCorrect: false },
            { text: "200 J", rationale: "Correct. Work W = F × d = 50 N × 4 m = 200 J.", isCorrect: true },
            { text: "200 N", rationale: "Units are wrong — work is in joules.", isCorrect: false }
        ]
    },
    {
        questionNumber: 6,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A 2 kg cart accelerates at 3 m/s².</p>",
        question: "What net force is acting on the cart?",
        answerOptions: [
            { text: "0.67 N", rationale: "That divides instead of multiplies.", isCorrect: false },
            { text: "1.5 N", rationale: "Still dividing, not multiplying.", isCorrect: false },
            { text: "5 N", rationale: "Close, but 2 × 3 is 6, not 5.", isCorrect: false },
            { text: "6 N", rationale: "Correct. F = m × a = 2 kg × 3 m/s² = 6 N.", isCorrect: true }
        ]
    },
    {
        questionNumber: 7,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: `<p>A student heats four samples of the same liquid:</p>
          <table class="min-w-full text-sm text-left">
            <thead><tr><th>Trial</th><th>Start Temp (°C)</th><th>End Temp (°C)</th></tr></thead>
            <tbody>
              <tr><td>A</td><td>22</td><td>30</td></tr>
              <tr><td>B</td><td>22</td><td>29</td></tr>
              <tr><td>C</td><td>22</td><td>35</td></tr>
              <tr><td>D</td><td>22</td><td>28</td></tr>
            </tbody>
          </table>`,
        question: "Which trial had the greatest temperature increase?",
        answerOptions: [
            { text: "Trial A", rationale: "Increase was 30−22 = 8°C.", isCorrect: false },
            { text: "Trial B", rationale: "Increase was 7°C.", isCorrect: false },
            { text: "Trial C", rationale: "Correct. Increase was 35−22 = 13°C, the largest.", isCorrect: true },
            { text: "Trial D", rationale: "Increase was 6°C.", isCorrect: false }
        ]
    },
    {
        questionNumber: 8,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>Colony counts of bacteria on 5 plates were 12, 15, 15, 18, and 30 (in thousands).</p>",
        question: "What is the <strong>range</strong> of the data?",
        answerOptions: [
            { text: "12", rationale: "12 is just the smallest value.", isCorrect: false },
            { text: "18", rationale: "18 is not max − min.", isCorrect: false },
            { text: "30", rationale: "30 is just the largest value.", isCorrect: false },
            { text: "18 (thousand)", rationale: "Correct. Range = 30 − 12 = 18.", isCorrect: true }
        ]
    },
    {
        questionNumber: 9,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>In the first 20 minutes of a run, a runner goes 10 km. After 10 minutes the runner had 5 km. Assume constant speed.</p>",
        question: "What is the runner’s speed during this period (in km/min)?",
        answerOptions: [
            { text: "0.25 km/min", rationale: "Too low (that would be 5 km in 20 min).", isCorrect: false },
            { text: "0.5 km/min", rationale: "Correct. 10 km ÷ 20 min = 0.5 km/min.", isCorrect: true },
            { text: "2 km/min", rationale: "Too high. That would be 40 km in 20 min.", isCorrect: false },
            { text: "20 km/min", rationale: "Way too high for a human runner.", isCorrect: false }
        ]
    },
    {
        questionNumber: 10,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A sealed container (nothing can enter or escape) has a total mass of 120 g before a chemical reaction and 120 g after.</p>",
        question: "Which statement is best supported by this data?",
        answerOptions: [
            { text: "Mass is created during the reaction.", rationale: "No; mass didn't increase.", isCorrect: false },
            { text: "Mass is destroyed during the reaction.", rationale: "No; mass didn't decrease.", isCorrect: false },
            { text: "Mass is conserved during the reaction.", rationale: "Correct. The total stayed 120 g.", isCorrect: true },
            { text: "The container leaked gas.", rationale: "If it leaked, mass would drop.", isCorrect: false }
        ]
    },
    {
        questionNumber: 11,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A pump moves 12 liters of water in 4 minutes at a constant rate.</p>",
        question: "How many liters will it move in 10 minutes?",
        answerOptions: [
            { text: "20 L", rationale: "That assumes 2 L/min. Actual rate is 3 L/min.", isCorrect: false },
            { text: "24 L", rationale: "That’s 12 L in 4 min scaled to 8 min, not 10.", isCorrect: false },
            { text: "30 L", rationale: "Correct. 12 ÷ 4 = 3 L/min. 3 × 10 = 30 L.", isCorrect: true },
            { text: "120 L", rationale: "Way too high for this rate.", isCorrect: false }
        ]
    },
    {
        questionNumber: 12,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A household budget is $3,000 per month. Housing is 35% of the budget.</p>",
        question: "How much money goes to housing each month?",
        answerOptions: [
            { text: "$700", rationale: "That’s 700 / 3000 ≈ 23%. Too low.", isCorrect: false },
            { text: "$900", rationale: "That’s 30% of $3,000.", isCorrect: false },
            { text: "$1,050", rationale: "Correct. 35% of $3,000 = 0.35 × 3000 = $1,050.", isCorrect: true },
            { text: "$1,500", rationale: "That would be 50%, not 35%.", isCorrect: false }
        ]
    }
];

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
            },
            "Scientific Numeracy": {
                description: "Math-in-science skills: density, speed, force, interpreting tables/graphs. No long reading.",
                topics: [
                    {
                        id: "sci_scientific_numeracy_core",
                        title: "Scientific Numeracy Core Skills",
                        description: "Unit rate, density, force, speed, lab tables, conservation of mass.",
                        config: {
                            totalTime: 20 * 60,
                            calculator: true,
                            formulaSheet: true,
                            parts: [{ name: "Quiz", questionCount: 12 }]
                        },
                        questions: SCIENTIFIC_NUMERACY_QUESTIONS
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