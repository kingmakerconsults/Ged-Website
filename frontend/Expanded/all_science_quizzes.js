export const allScienceQuizzes = [
{
        subject: 'Science',
        topic: 'Life Science',
        id: 'sci_life_science_1',
        title: 'Life Science Concepts',
        questions: [
            {
                questionNumber: 1,
                type: 'multipleChoice',
                difficulty: 'easy',
                question: 'Which of the following is the basic unit of life?',
                answerOptions: [
                    { text: 'Atom', rationale: 'Atoms are the basic units of matter, not life.', isCorrect: false },
                    { text: 'Molecule', rationale: 'Molecules are groups of atoms, but not the basic unit of life.', isCorrect: false },
                    { text: 'Cell', rationale: 'Correct. The cell is the fundamental structural and functional unit of all known living organisms.', isCorrect: true },
                    { text: 'Organ', rationale: 'Organs are collections of tissues, which are made of cells. So, organs are at a higher level of organization.', isCorrect: false }
                ]
            },
            {
                questionNumber: 2,
                type: 'multipleChoice',
                difficulty: 'easy',
                question: 'What is the process by which plants use sunlight to create their own food?',
                answerOptions: [
                    { text: 'Respiration', rationale: 'Respiration is the process of converting food into energy.', isCorrect: false },
                    { text: 'Photosynthesis', rationale: 'Correct. Photosynthesis uses sunlight, water, and carbon dioxide to create glucose (sugar).', isCorrect: true },
                    { text: 'Transpiration', rationale: 'Transpiration is the process of water movement through a plant and its evaporation from leaves.', isCorrect: false },
                    { text: 'Germination', rationale: 'Germination is the process of a seed sprouting.', isCorrect: false }
                ]
            },
            {
                questionNumber: 3,
                type: 'multipleChoice',
                difficulty: 'easy',
                question: 'Which human organ is primarily responsible for pumping blood throughout the body?',
                answerOptions: [
                    { text: 'Lungs', rationale: 'The lungs are responsible for gas exchange (breathing).', isCorrect: false },
                    { text: 'Brain', rationale: 'The brain is the control center of the nervous system.', isCorrect: false },
                    { text: 'Stomach', rationale: 'The stomach is a key organ in the digestive system.', isCorrect: false },
                    { text: 'Heart', rationale: 'Correct. The heart is a muscular organ that pumps blood through the circulatory system.', isCorrect: true }
                ]
            },
            {
                questionNumber: 4,
                type: 'multipleChoice',
                difficulty: 'easy',
                question: 'A group of similar cells performing a specific function is called a(n):',
                answerOptions: [
                    { text: 'Organ', rationale: 'An organ is made of different types of tissues.', isCorrect: false },
                    { text: 'Organism', rationale: 'An organism is a complete living being.', isCorrect: false },
                    { text: 'Tissue', rationale: 'Correct. Tissues are groups of specialized cells that work together.', isCorrect: true },
                    { text: 'Organelle', rationale: 'An organelle is a structure within a cell.', isCorrect: false }
                ]
            },
            {
                questionNumber: 5,
                type: 'multipleChoice',
                difficulty: 'medium',
                passage: 'A student is investigating cellular respiration, the process by which cells convert glucose (sugar) into ATP (energy). The student sets up two test tubes. Both contain yeast and a sugar solution. Test Tube A is sealed to prevent oxygen from entering. Test Tube B is left open to the air. The student observes that the yeast in Test Tube B produces significantly more ATP than the yeast in Test Tube A.',
                question: 'Based on the scenario, what can the student conclude about the role of oxygen in cellular respiration?',
                answerOptions: [
                    { text: 'Oxygen is not necessary for cellular respiration.', rationale: 'The experiment shows that significantly more energy is produced in the presence of oxygen.', isCorrect: false },
                    { text: 'Cellular respiration is more efficient in the presence of oxygen.', rationale: 'Correct. The yeast in Test Tube B, which had oxygen, produced more ATP, indicating a more efficient process.', isCorrect: true },
                    { text: 'Oxygen is a waste product of cellular respiration.', rationale: 'Carbon dioxide is a waste product of aerobic respiration; oxygen is an input.', isCorrect: false },
                    { text: 'Yeast can only produce ATP without oxygen.', rationale: 'The experiment shows yeast can produce ATP with and without oxygen, but it is more effective with it.', isCorrect: false }
                ]
            },
            {
                questionNumber: 6,
                type: 'multipleChoice',
                difficulty: 'medium',
                passage: 'A student is investigating cellular respiration, the process by which cells convert glucose (sugar) into ATP (energy). The student sets up two test tubes. Both contain yeast and a sugar solution. Test Tube A is sealed to prevent oxygen from entering. Test Tube B is left open to the air. The student observes that the yeast in Test Tube B produces significantly more ATP than the yeast in Test Tube A.',
                question: 'The process occurring in Test Tube A is known as anaerobic respiration. What is the most likely byproduct of this process in yeast?',
                answerOptions: [
                    { text: 'Lactic acid', rationale: 'Lactic acid is a byproduct of anaerobic respiration in muscle cells, but not typically yeast.', isCorrect: false },
                    { text: 'Oxygen', rationale: 'Oxygen is an input for aerobic respiration, not a byproduct of anaerobic respiration.', isCorrect: false },
                    { text: 'Alcohol and carbon dioxide', rationale: 'Correct. Yeast undergoes alcoholic fermentation in the absence of oxygen, producing ethanol and CO2.', isCorrect: true },
                    { text: 'Water', rationale: 'Water is a byproduct of aerobic respiration.', isCorrect: false }
                ]
            },
            {
                questionNumber: 7,
                type: 'multipleChoice',
                difficulty: 'medium',
                question: 'Which of the following describes the concept of natural selection?',
                answerOptions: [
                    { text: 'Organisms consciously change their traits to better suit their environment.', rationale: 'Natural selection is a passive process, not a conscious choice.', isCorrect: false },
                    { text: 'All individuals in a population are genetically identical.', rationale: 'Genetic variation is a requirement for natural selection.', isCorrect: false },
                    { text: 'Organisms with traits better suited to their environment are more likely to survive and reproduce.', rationale: 'Correct. This is the core principle of natural selection, often summarized as "survival of the fittest".', isCorrect: true },
                    { text: 'Humans select which organisms will breed based on desired traits.', rationale: 'This is artificial selection, not natural selection.', isCorrect: false }
                ]
            },
            {
                questionNumber: 8,
                type: 'multipleChoice',
                difficulty: 'medium',
                question: 'In genetics, what term describes the observable physical characteristics of an organism?',
                answerOptions: [
                    { text: 'Genotype', rationale: 'The genotype is the set of genes in an organism\'s DNA.', isCorrect: false },
                    { text: 'Phenotype', rationale: 'Correct. The phenotype is the physical expression of the genotype (e.g., eye color, height).', isCorrect: true },
                    { text: 'Allele', rationale: 'An allele is a specific version of a gene.', isCorrect: false },
                    { text: 'Chromosome', rationale: 'A chromosome is a structure that contains the genetic material.', isCorrect: false }
                ]
            },
            {
                questionNumber: 9,
                type: 'multipleChoice',
                difficulty: 'medium',
                question: 'Which human body system is responsible for breaking down food and absorbing nutrients?',
                answerOptions: [
                    { text: 'Circulatory System', rationale: 'The circulatory system transports nutrients, but does not break down food.', isCorrect: false },
                    { text: 'Respiratory System', rationale: 'The respiratory system is responsible for gas exchange.', isCorrect: false },
                    { text: 'Nervous System', rationale: 'The nervous system is the body\'s command center.', isCorrect: false },
                    { text: 'Digestive System', rationale: 'Correct. This system includes the stomach, intestines, and other organs that process food.', isCorrect: true }
                ]
            },
            {
                questionNumber: 10,
                type: 'multipleChoice',
                difficulty: 'hard',
                question: 'A DNA strand has the sequence A-T-T-G-C-A. What will be the sequence of the complementary mRNA strand?',
                answerOptions: [
                    { text: 'T-A-A-C-G-T', rationale: 'This would be the complementary DNA strand. In RNA, Uracil (U) replaces Thymine (T).', isCorrect: false },
                    { text: 'U-A-A-C-G-U', rationale: 'Correct. In RNA, Adenine (A) pairs with Uracil (U), and Guanine (G) pairs with Cytosine (C).', isCorrect: true },
                    { text: 'A-T-T-G-C-A', rationale: 'This is the original DNA sequence.', isCorrect: false },
                    { text: 'U-G-G-C-A-U', rationale: 'This sequence does not follow the base-pairing rules.', isCorrect: false }
                ]
            },
            {
                questionNumber: 11,
                type: 'multipleChoice',
                difficulty: 'hard',
                question: 'What is the primary function of a cell\'s mitochondria?',
                answerOptions: [
                    { text: 'To store genetic information.', rationale: 'This is the function of the nucleus.', isCorrect: false },
                    { text: 'To synthesize proteins.', rationale: 'This is the function of ribosomes.', isCorrect: false },
                    { text: 'To generate most of the cell\'s supply of adenosine triphosphate (ATP).', rationale: 'Correct. Mitochondria are known as the "powerhouses" of the cell because they are the site of cellular respiration.', isCorrect: true },
                    { text: 'To control what enters and leaves the cell.', rationale: 'This is the function of the cell membrane.', isCorrect: false }
                ]
            },
            {
                questionNumber: 12,
                type: 'multipleChoice',
                difficulty: 'hard',
                question: 'Homeostasis is the maintenance of a stable internal environment. Which of the following is an example of a physiological process that helps maintain homeostasis?',
                answerOptions: [
                    { text: 'The contraction of a muscle to lift a weight.', rationale: 'This is a voluntary action, not a direct homeostatic regulation.', isCorrect: false },
                    { text: 'The increase in heart rate during exercise to deliver more oxygen to muscles.', rationale: 'Correct. This is an automatic response to a change in the body\'s needs, helping to maintain stable oxygen levels in tissues.', isCorrect: true },
                    { text: 'The learning of a new skill through practice.', rationale: 'This is a function of the nervous system, but not a direct homeostatic process.', isCorrect: false },
                    { text: 'The growth of hair and nails.', rationale: 'This is a long-term biological process, not a rapid homeostatic adjustment.', isCorrect: false }
                ]
            }
        ]
    },
{
    subject: 'Science',
    topic: 'Physical Science',
    id: 'sci_physical_science_1',
    title: 'Physical Science Principles',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is a measure of an object\'s inertia?',
            answerOptions: [
                { text: 'Weight', rationale: 'Weight is the force of gravity on an object.', isCorrect: false },
                { text: 'Mass', rationale: 'Correct. Mass is the measure of how much an object resists a change in its motion (inertia).', isCorrect: true },
                { text: 'Volume', rationale: 'Volume is the amount of space an object occupies.', isCorrect: false },
                { text: 'Speed', rationale: 'Speed is the rate at which an object is moving.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What type of energy is possessed by a moving object?',
            answerOptions: [
                { text: 'Potential Energy', rationale: 'Potential energy is stored energy based on position or state.', isCorrect: false },
                { text: 'Chemical Energy', rationale: 'Chemical energy is stored in the bonds of chemical compounds.', isCorrect: false },
                { text: 'Kinetic Energy', rationale: 'Correct. Kinetic energy is the energy of motion.', isCorrect: true },
                { text: 'Thermal Energy', rationale: 'Thermal energy is related to the temperature of an object.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A push or a pull on an object is known as a(n):',
            answerOptions: [
                { text: 'Force', rationale: 'Correct. A force is an interaction that, when unopposed, will change the motion of an object.', isCorrect: true },
                { text: 'Friction', rationale: 'Friction is a specific type of force that opposes motion.', isCorrect: false },
                { text: 'Inertia', rationale: 'Inertia is a property of matter, not a direct push or pull.', isCorrect: false },
                { text: 'Work', rationale: 'Work is done when a force causes an object to move a distance.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is the best example of a chemical change?',
            answerOptions: [
                { text: 'Boiling water', rationale: 'This is a physical change (phase change).', isCorrect: false },
                { text: 'Melting ice', rationale: 'This is a physical change (phase change).', isCorrect: false },
                { text: 'Burning wood', rationale: 'Correct. Burning (combustion) is a chemical reaction that creates new substances like ash and smoke.', isCorrect: true },
                { text: 'Chopping an apple', rationale: 'This is a physical change (change in form).', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'An experiment is conducted to test the effect of force on acceleration. A block with a mass of 5 kg is placed on a frictionless surface. A student applies different forces and records the resulting acceleration. The data is shown below: Force (Newtons): 10, 20, 30. Acceleration (m/s²): 2, 4, 6.',
            question: 'Based on the data, what is the relationship between the force applied to the block and its resulting acceleration?',
            answerOptions: [
                { text: 'As the force increases, the acceleration decreases.', rationale: 'The data shows that as force increases, acceleration also increases.', isCorrect: false },
                { text: 'The acceleration is directly proportional to the force.', rationale: 'Correct. When the force doubles from 10 N to 20 N, the acceleration also doubles from 2 m/s² to 4 m/s². This demonstrates a direct relationship, consistent with Newton\'s Second Law (F=ma).', isCorrect: true },
                { text: 'The acceleration of the block is constant.', rationale: 'The data clearly shows that the acceleration changes when the force changes.', isCorrect: false },
                { text: 'There is no clear relationship between force and acceleration.', rationale: 'There is a very clear and consistent pattern in the data.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'An experiment is conducted to test the effect of force on acceleration. A block with a mass of 5 kg is placed on a frictionless surface. A student applies different forces and records the resulting acceleration. The data is shown below: Force (Newtons): 10, 20, 30. Acceleration (m/s²): 2, 4, 6.',
            question: 'If the student applied a force of 40 Newtons to the 5 kg block, what would be the predicted acceleration?',
            answerOptions: [
                { text: '6 m/s²', rationale: 'This is the acceleration for a force of 30 N.', isCorrect: false },
                { text: '7 m/s²', rationale: 'The relationship is linear, so the acceleration should increase by 2 m/s² for every 10 N increase in force.', isCorrect: false },
                { text: '8 m/s²', rationale: 'Correct. The data shows that acceleration = Force / mass (a = F/m). So, a = 40 N / 5 kg = 8 m/s². This follows the pattern in the table.', isCorrect: true },
                { text: '10 m/s²', rationale: 'This does not fit the pattern established by the experiment.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The law of conservation of energy states that:',
            answerOptions: [
                { text: 'Energy can be created from nothing.', rationale: 'The law states energy cannot be created.', isCorrect: false },
                { text: 'Energy cannot be created or destroyed, only transformed.', rationale: 'Correct. This is the fundamental principle of the law of conservation of energy.', isCorrect: true },
                { text: 'The total energy in the universe is decreasing.', rationale: 'The law states the total energy remains constant.', isCorrect: false },
                { text: 'Kinetic energy is always equal to potential energy.', rationale: 'Energy can be transformed between kinetic and potential forms, but they are not always equal.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the primary way heat is transferred from the sun to the Earth?',
            answerOptions: [
                { text: 'Conduction', rationale: 'Conduction requires direct contact and cannot occur through the vacuum of space.', isCorrect: false },
                { text: 'Convection', rationale: 'Convection requires a fluid medium (like air or water) and cannot occur through the vacuum of space.', isCorrect: false },
                { text: 'Radiation', rationale: 'Correct. Heat from the sun travels as electromagnetic radiation through the vacuum of space.', isCorrect: true },
                { text: 'Refraction', rationale: 'Refraction is the bending of light, not a primary mode of heat transfer.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A simple machine consisting of a wheel with a groove for a rope is called a:',
            answerOptions: [
                { text: 'Lever', rationale: 'A lever is a rigid bar that pivots on a fulcrum.', isCorrect: false },
                { text: 'Inclined Plane', rationale: 'An inclined plane is a flat supporting surface tilted at an angle.', isCorrect: false },
                { text: 'Wedge', rationale: 'A wedge is a triangular shaped tool.', isCorrect: false },
                { text: 'Pulley', rationale: 'Correct. Pulleys are used to lift heavy objects by changing the direction of the force.', isCorrect:true }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'An atom has 6 protons, 7 neutrons, and 6 electrons. What is its atomic number?',
            answerOptions: [
                { text: '13', rationale: 'This is the mass number (protons + neutrons).', isCorrect: false },
                { text: '6', rationale: 'Correct. The atomic number of an element is determined by the number of protons in its nucleus.', isCorrect: true },
                { text: '1', rationale: 'This would be the charge of the atom if it lost one electron.', isCorrect: false },
                { text: '19', rationale: 'This is the sum of all the particles.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A solution has a pH of 3. How would this solution be classified?',
            answerOptions: [
                { text: 'Strongly acidic', rationale: 'Correct. A pH less than 7 is acidic, and a pH of 3 is considered strongly acidic.', isCorrect: true },
                { text: 'Slightly acidic', rationale: 'A pH closer to 7 (like 5 or 6) would be slightly acidic.', isCorrect: false },
                { text: 'Neutral', rationale: 'A pH of 7 is neutral.', isCorrect: false },
                { text: 'Strongly basic', rationale: 'A pH greater than 7 is basic (alkaline).', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Newton\'s Third Law of Motion states that for every action, there is an equal and opposite reaction. Which of the following is the best example of this law?',
            answerOptions: [
                { text: 'A book remains at rest on a table.', rationale: 'This is an example of Newton\'s First Law (inertia).', isCorrect: false },
                { text: 'It takes more force to accelerate a truck than a car.', rationale: 'This is an example of Newton\'s Second Law (F=ma).', isCorrect: false },
                { text: 'A rocket propels itself forward by expelling hot gases downward.', rationale: 'Correct. The action is the rocket pushing the gas down, and the reaction is the gas pushing the rocket up.', isCorrect: true },
                { text: 'A passenger continues to move forward when a car suddenly stops.', rationale: 'This is an example of Newton\'s First Law (inertia).', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Earth & Space Science',
    id: 'sci_earth_space_1',
    title: 'Earth and Space Systems',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the primary cause of the Earth\'s seasons?',
            answerOptions: [
                { text: 'The distance between the Earth and the Sun.', rationale: 'While the Earth\'s orbit is elliptical, the distance is not the primary cause of the seasons.', isCorrect: false },
                { text: 'The tilt of the Earth\'s axis.', rationale: 'Correct. The 23.5-degree tilt of the Earth\'s axis causes different parts of the Earth to receive more direct sunlight at different times of the year.', isCorrect: true },
                { text: 'The rotation of the Earth on its axis.', rationale: 'The Earth\'s rotation causes day and night.', isCorrect: false },
                { text: 'The phases of the Moon.', rationale: 'The Moon\'s phases are caused by its position relative to the Earth and Sun, and they do not affect the Earth\'s seasons.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The process of water vapor turning into liquid water is called:',
            answerOptions: [
                { text: 'Evaporation', rationale: 'Evaporation is the process of a liquid turning into a gas.', isCorrect: false },
                { text: 'Precipitation', rationale: 'Precipitation is any form of water that falls from clouds (e.g., rain, snow).', isCorrect: false },
                { text: 'Condensation', rationale: 'Correct. This process is what forms clouds.', isCorrect: true },
                { text: 'Transpiration', rationale: 'Transpiration is the release of water vapor from plants.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is considered a renewable resource?',
            answerOptions: [
                { text: 'Coal', rationale: 'Coal is a fossil fuel and is non-renewable.', isCorrect: false },
                { text: 'Natural Gas', rationale: 'Natural gas is a fossil fuel and is non-renewable.', isCorrect: false },
                { text: 'Petroleum', rationale: 'Petroleum (oil) is a fossil fuel and is non-renewable.', isCorrect: false },
                { text: 'Wind', rationale: 'Correct. Wind is generated by natural processes and is considered a renewable resource.', isCorrect: true }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The layer of the Earth that we live on is called the:',
            answerOptions: [
                { text: 'Core', rationale: 'The core is the innermost layer of the Earth.', isCorrect: false },
                { text: 'Mantle', rationale: 'The mantle is the layer between the crust and the core.', isCorrect: false },
                { text: 'Crust', rationale: 'Correct. The crust is the outermost, rocky layer of the Earth.', isCorrect: true },
                { text: 'Atmosphere', rationale: 'The atmosphere is the layer of gases surrounding the Earth.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A geologist is studying the rock cycle. She observes a sample of sedimentary rock, which is characterized by visible layers of sand and small pebbles. This rock is then subjected to intense heat and pressure deep within the Earth\'s crust, causing its mineral composition and texture to change. The original layers are no longer visible, and the new rock is much denser.',
            question: 'What type of rock has the sedimentary rock become after being subjected to intense heat and pressure?',
            answerOptions: [
                { text: 'Igneous rock', rationale: 'Igneous rock is formed from the cooling of magma or lava.', isCorrect: false },
                { text: 'Metamorphic rock', rationale: 'Correct. Metamorphic rock is formed when existing rock is changed by heat and pressure.', isCorrect: true },
                { text: 'A different type of sedimentary rock', rationale: 'The process described (intense heat and pressure) leads to metamorphism, not the formation of a new sedimentary rock.', isCorrect: false },
                { text: 'Magma', rationale: 'If the rock melted completely, it would become magma, but the description says its composition and texture changed, not that it melted.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A geologist is studying the rock cycle. She observes a sample of sedimentary rock, which is characterized by visible layers of sand and small pebbles. This rock is then subjected to intense heat and pressure deep within the Earth\'s crust, causing its mineral composition and texture to change. The original layers are no longer visible, and the new rock is much denser.',
            question: 'How was the original sedimentary rock most likely formed?',
            answerOptions: [
                { text: 'By the cooling of lava on the Earth\'s surface.', rationale: 'This process forms extrusive igneous rock.', isCorrect: false },
                { text: 'By the compaction and cementation of sediments.', rationale: 'Correct. Sedimentary rocks are formed from the accumulation of sediments (like sand and pebbles) that are then pressed and glued together over time.', isCorrect: true },
                { text: 'By a volcanic eruption.', rationale: 'Volcanic eruptions produce igneous rocks.', isCorrect: false },
                { text: 'By the crystallization of minerals under high pressure.', rationale: 'This is more descriptive of metamorphic rock formation.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the primary cause of tectonic plate movement?',
            answerOptions: [
                { text: 'The Earth\'s rotation.', rationale: 'While the rotation has effects, it does not drive plate tectonics.', isCorrect: false },
                { text: 'Convection currents in the Earth\'s mantle.', rationale: 'Correct. The slow movement of hot, softened rock in the mantle pushes and pulls on the tectonic plates above.', isCorrect: true },
                { text: 'The gravitational pull of the Moon.', rationale: 'The Moon\'s gravity primarily causes the tides.', isCorrect: false },
                { text: 'Erosion on the Earth\'s surface.', rationale: 'Erosion is a surface process and does not cause plate movement.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The greenhouse effect is a natural process that warms the Earth. An increase in which of the following gases is considered a major cause of enhanced global warming?',
            answerOptions: [
                { text: 'Oxygen', rationale: 'Oxygen is not a significant greenhouse gas.', isCorrect: false },
                { text: 'Nitrogen', rationale: 'Nitrogen makes up most of our atmosphere but is not a major greenhouse gas.', isCorrect: false },
                { text: 'Carbon Dioxide (CO2)', rationale: 'Correct. CO2, released by burning fossil fuels, is a potent greenhouse gas that traps heat in the atmosphere.', isCorrect: true },
                { text: 'Argon', rationale: 'Argon is an inert gas and not a greenhouse gas.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which of the following astronomical bodies is a star?',
            answerOptions: [
                { text: 'Mars', rationale: 'Mars is a planet in our solar system.', isCorrect: false },
                { text: 'The Moon', rationale: 'The Moon is a natural satellite of the Earth.', isCorrect: false },
                { text: 'Jupiter', rationale: 'Jupiter is a planet in our solar system.', isCorrect: false },
                { text: 'The Sun', rationale: 'Correct. The Sun is a star that is the center of our solar system.', isCorrect: true }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Weathering is the breakdown of rocks at the Earth’s surface. Which of the following is an example of chemical weathering?',
            answerOptions: [
                { text: 'The freezing and thawing of water in rock cracks.', rationale: 'This is a type of physical weathering called frost wedging.', isCorrect: false },
                { text: 'The scraping of a rock surface by a glacier.', rationale: 'This is a type of physical weathering called abrasion.', isCorrect: false },
                { text: 'The dissolving of limestone by acid rain.', rationale: 'Correct. Acid rain is a chemical agent that reacts with the minerals in limestone, causing it to dissolve. This is a chemical change.', isCorrect: true },
                { text: 'The breaking of a rock by the roots of a tree.', rationale: 'This is a type of physical weathering.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A lunar eclipse occurs when:',
            answerOptions: [
                { text: 'The Sun passes between the Earth and the Moon.', rationale: 'The Sun cannot pass between the Earth and Moon.', isCorrect: false },
                { text: 'The Moon passes between the Earth and the Sun.', rationale: 'This describes a solar eclipse.', isCorrect: false },
                { text: 'The Earth passes between the Sun and the Moon.', rationale: 'Correct. This alignment causes the Earth\'s shadow to be cast upon the Moon.', isCorrect: true },
                { text: 'The Moon\'s shadow falls on the Sun.', rationale: 'The Moon cannot cast a shadow on the Sun.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The theory of plate tectonics explains how the Earth\'s continents have moved over time. Which of the following is a major piece of evidence supporting this theory?',
            answerOptions: [
                { text: 'The existence of fossils of the same species on continents that are now widely separated.', rationale: 'Correct. This suggests that the continents were once joined together, allowing the species to be distributed across them.', isCorrect: true },
                { text: 'The fact that the Earth is a sphere.', rationale: 'While true, this does not directly support the theory of continental movement.', isCorrect: false },
                { text: 'The presence of volcanoes around the world.', rationale: 'While volcanoes are often located at plate boundaries, their mere existence is not the strongest evidence for continental drift.', isCorrect: false },
                { text: 'The daily rotation of the Earth.', rationale: 'The Earth\'s rotation is not related to the movement of continents.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Scientific Practices / Data Reasoning',
    id: 'sci_data_reasoning_1',
    title: 'Scientific Reasoning and Data Analysis',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'In a scientific experiment, the factor that is deliberately changed or manipulated by the researcher is called the:',
            answerOptions: [
                { text: 'Control group', rationale: 'The control group is the group that does not receive the experimental treatment.', isCorrect: false },
                { text: 'Dependent variable', rationale: 'The dependent variable is what is measured in the experiment.', isCorrect: false },
                { text: 'Independent variable', rationale: 'Correct. The independent variable is the one thing the scientist changes to see its effect.', isCorrect: true },
                { text: 'Constant', rationale: 'A constant is a factor that is kept the same throughout the experiment.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the first step in the scientific method?',
            answerOptions: [
                { text: 'Formulating a hypothesis', rationale: 'This comes after making an observation and asking a question.', isCorrect: false },
                { text: 'Making an observation and asking a question', rationale: 'Correct. The scientific method begins with observing a phenomenon and asking a question about it.', isCorrect: true },
                { text: 'Conducting an experiment', rationale: 'The experiment is designed to test the hypothesis.', isCorrect: false },
                { text: 'Analyzing data', rationale: 'Data analysis occurs after the experiment is conducted.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A proposed explanation for a phenomenon that can be tested through experimentation is called a:',
            answerOptions: [
                { text: 'Theory', rationale: 'A theory is a well-substantiated explanation of some aspect of the natural world, based on a body of facts that have been repeatedly confirmed through observation and experiment.', isCorrect: false },
                { text: 'Law', rationale: 'A scientific law is a statement based on repeated experimental observations that describes some aspect of the universe.', isCorrect: false },
                { text: 'Hypothesis', rationale: 'Correct. A hypothesis is a testable prediction about the relationship between variables.', isCorrect: true },
                { text: 'Conclusion', rationale: 'A conclusion is a summary of the results of an experiment.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'In an experiment, the group that does not receive the experimental treatment and is used for comparison is called the:',
            answerOptions: [
                { text: 'Experimental group', rationale: 'The experimental group is the one that receives the treatment.', isCorrect: false },
                { text: 'Control group', rationale: 'Correct. The control group serves as a baseline to compare the effects of the treatment.', isCorrect: true },
                { text: 'Independent group', rationale: 'This is not a standard term for a group in an experiment.', isCorrect: false },
                { text: 'Dependent group', rationale: 'This is not a standard term for a group in an experiment.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student wants to test the effect of different types of soil on the growth of bean plants. She plants three bean seeds in three separate pots. Pot A contains sandy soil, Pot B contains clay soil, and Pot C contains potting soil. She gives each plant the same amount of water and sunlight each day. She measures the height of each plant every day for three weeks.',
            question: 'What is the independent variable in this experiment?',
            answerOptions: [
                { text: 'The height of the bean plants.', rationale: 'The height is what is being measured, so it is the dependent variable.', isCorrect: false },
                { text: 'The type of soil.', rationale: 'Correct. The type of soil is the factor that the student is deliberately changing to see its effect.', isCorrect: true },
                { text: 'The amount of water.', rationale: 'The amount of water is kept the same for all plants, so it is a constant.', isCorrect: false },
                { text: 'The amount of sunlight.', rationale: 'The amount of sunlight is kept the same for all plants, so it is a constant.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student wants to test the effect of different types of soil on the growth of bean plants. She plants three bean seeds in three separate pots. Pot A contains sandy soil, Pot B contains clay soil, and Pot C contains potting soil. She gives each plant the same amount of water and sunlight each day. She measures the height of each plant every day for three weeks.',
            question: 'Which of the following is a constant in this experiment?',
            answerOptions: [
                { text: 'The type of soil.', rationale: 'The type of soil is the independent variable.', isCorrect: false },
                { text: 'The final height of the plants.', rationale: 'The final height is a result that will likely vary, so it is part of the dependent variable.', isCorrect: false },
                { text: 'The amount of water given to each plant.', rationale: 'Correct. To ensure a fair test, factors like water, sunlight, and pot size should be kept the same for all groups.', isCorrect: true },
                { text: 'The number of leaves on each plant.', rationale: 'This is another potential dependent variable that could be measured.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A data table shows the average monthly temperature in a city. January: 35°F, February: 40°F, March: 50°F, April: 60°F, May: 70°F.',
            question: 'What is the rate of change in the average temperature between March and May?',
            answerOptions: [
                { text: '10°F per month', rationale: 'Correct. The temperature increased by 20°F (from 50°F to 70°F) over two months, so the average rate of change is 20°F / 2 months = 10°F per month.', isCorrect: true },
                { text: '20°F per month', rationale: 'This is the total change, not the rate per month.', isCorrect: false },
                { text: '5°F per month', rationale: 'This is the rate of change between January and February.', isCorrect: false },
                { text: '15°F per month', rationale: 'This is not the correct rate of change for the specified period.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which of the following is the best example of a scientific claim supported by evidence?',
            answerOptions: [
                { text: 'I believe that aliens have visited Earth.', rationale: 'This is a personal belief, not a claim supported by scientific evidence.', isCorrect: false },
                { text: 'My horoscope says I will have a good day.', rationale: 'Horoscopes are not based on scientific evidence.', isCorrect: false },
                { text: 'Studies have shown that smoking increases the risk of lung cancer.', rationale: 'Correct. This claim is based on extensive scientific research and data.', isCorrect: true },
                { text: 'Everyone knows that chocolate is the best flavor of ice cream.', rationale: 'This is a statement of opinion.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A scientist wants to publish her research in a peer-reviewed journal. What is the primary purpose of the peer-review process?',
            answerOptions: [
                { text: 'To ensure that the research is interesting to the public.', rationale: 'While public interest can be a factor, the primary purpose is to ensure scientific quality.', isCorrect: false },
                { text: 'To check the research for spelling and grammar errors.', rationale: 'While important, this is a secondary concern to the scientific validity.', isCorrect: false },
                { text: 'To have other scientists in the same field evaluate the research for validity and quality.', rationale: 'Correct. Peer review is a critical process where experts scrutinize a study\'s methods, results, and conclusions before it is published.', isCorrect: true },
                { text: 'To guarantee that the research will receive funding.', rationale: 'Publication can help with funding, but the purpose of the review is to validate the science.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'In an experiment, it is important to have a large sample size. Why is this?',
            answerOptions: [
                { text: 'To make the experiment more expensive.', rationale: 'Cost is a practical consideration, but not the scientific reason for a large sample size.', isCorrect: false },
                { text: 'To make the data more difficult to analyze.', rationale: 'While more data can be complex, the goal is to improve the analysis, not complicate it.', isCorrect: false },
                { text: 'To increase the likelihood that the results are representative of the whole population and not due to random chance.', rationale: 'Correct. A larger sample size reduces the impact of random variation and makes the results more reliable and generalizable.', isCorrect: true },
                { text: 'To ensure that the hypothesis is proven correct.', rationale: 'The goal of an experiment is to test a hypothesis, not to prove it correct. A large sample size helps ensure the test is fair.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            passage: 'A pharmaceutical company develops a new drug to lower blood pressure. In a clinical trial, 200 volunteers with high blood pressure are divided into two groups. Group A receives the new drug. Group B receives a placebo (a sugar pill with no active ingredient). After one month, the average blood pressure of Group A has decreased by 15 points, while the average blood pressure of Group B has decreased by 2 points.',
            question: 'What is the purpose of giving Group B a placebo?',
            answerOptions: [
                { text: 'To see if the drug is more effective than no treatment at all.', rationale: 'The placebo is not "no treatment"; it is a control for the psychological effect of taking a pill.', isCorrect: false },
                { text: 'To control for the placebo effect, where patients\' symptoms can improve simply because they believe they are receiving treatment.', rationale: 'Correct. By comparing the drug\'s effect to the placebo effect, researchers can determine how much of the improvement is due to the drug itself.', isCorrect: true },
                { text: 'To determine if the drug has any negative side effects.', rationale: 'Side effects are monitored in both groups, but the primary purpose of the placebo is not to test for them.', isCorrect: false },
                { text: 'To ensure that all volunteers are receiving a real medication.', rationale: 'The placebo group is intentionally not receiving the real medication.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Correlation does not imply causation. Which of the following statements is the best example of this principle?',
            answerOptions: [
                { text: 'A study shows that as the number of firefighters at a fire increases, the amount of damage done by the fire also increases. Therefore, firefighters cause more damage.', rationale: 'Correct. This is a classic example. The number of firefighters and the amount of damage are correlated (both increase for larger fires), but the firefighters do not cause the damage; the size of the fire is the underlying cause.', isCorrect: true },
                { text: 'If you study more for a test, you are likely to get a better grade.', rationale: 'In this case, there is a likely causal relationship.', isCorrect: false },
                { text: 'The more you exercise, the more calories you burn.', rationale: 'This is a direct causal relationship.', isCorrect: false },
                { text: 'If you drop a ball, it will fall to the ground due to gravity.', rationale: 'This is a statement of scientific law (causation).', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Life Science',
    id: 'sci_life_science_2',
    title: 'Heredity and Ecosystems',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the name for the genetic material that carries instructions for an organism\'s development and function?',
            answerOptions: [
                { text: 'Protein', rationale: 'Proteins are built based on the instructions in the genetic material.', isCorrect: false },
                { text: 'RNA', rationale: 'RNA is involved in transmitting genetic information, but DNA is the primary long-term storage.', isCorrect: false },
                { text: 'DNA (Deoxyribonucleic acid)', rationale: 'Correct. DNA is the molecule that contains the genetic code.', isCorrect: true },
                { text: 'ATP', rationale: 'ATP is the main energy currency of the cell.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'An organism that produces its own food is called a(n):',
            answerOptions: [
                { text: 'Consumer', rationale: 'A consumer gets energy by eating other organisms.', isCorrect: false },
                { text: 'Decomposer', rationale: 'A decomposer breaks down dead organic matter.', isCorrect: false },
                { text: 'Producer (or Autotroph)', rationale: 'Correct. Producers, like plants, create their own food, usually through photosynthesis.', isCorrect: true },
                { text: 'Herbivore', rationale: 'A herbivore is a type of consumer that eats plants.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'In a food web, which organism is a primary consumer?',
            answerOptions: [
                { text: 'A lion that eats a zebra.', rationale: 'The lion is a secondary or tertiary consumer.', isCorrect: false },
                { text: 'A rabbit that eats grass.', rationale: 'Correct. Primary consumers eat producers (plants).', isCorrect: true },
                { text: 'A fungus that breaks down a dead tree.', rationale: 'The fungus is a decomposer.', isCorrect: false },
                { text: 'Grass that makes its own food.', rationale: 'The grass is a producer.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is an example of an abiotic (non-living) factor in an ecosystem?',
            answerOptions: [
                { text: 'A tree', rationale: 'A tree is a living (biotic) factor.', isCorrect: false },
                { text: 'Sunlight', rationale: 'Correct. Sunlight is a non-living component that provides energy for the ecosystem.', isCorrect: true },
                { text: 'An insect', rationale: 'An insect is a living (biotic) factor.', isCorrect: false },
                { text: 'A fungus', rationale: 'A fungus is a living (biotic) factor.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'In a certain species of plant, the allele for purple flowers (P) is dominant over the allele for white flowers (p). A botanist crosses a plant that is homozygous dominant (PP) with a plant that is homozygous recessive (pp).',
            question: 'What will be the genotype of all the offspring in the first generation (F1)?',
            answerOptions: [
                { text: 'PP', rationale: 'All offspring will receive one dominant allele (P) from the first parent and one recessive allele (p) from the second.', isCorrect: false },
                { text: 'Pp', rationale: 'Correct. A Punnett square for this cross shows that 100% of the offspring will have the heterozygous genotype (Pp).', isCorrect: true },
                { text: 'pp', rationale: 'This would only be possible if both parents contributed a recessive allele.', isCorrect: false },
                { text: '50% PP and 50% pp', rationale: 'This is not the correct outcome for this specific cross.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'In a certain species of plant, the allele for purple flowers (P) is dominant over the allele for white flowers (p). A botanist crosses a plant that is homozygous dominant (PP) with a plant that is homozygous recessive (pp).',
            question: 'What will be the phenotype (observable trait) of all the offspring in the first generation (F1)?',
            answerOptions: [
                { text: 'White flowers', rationale: 'Because the purple allele (P) is dominant, it will mask the recessive white allele (p).', isCorrect: false },
                { text: 'A mix of purple and white flowers', rationale: 'All offspring have the same genotype (Pp), so they will all have the same phenotype.', isCorrect: false },
                { text: 'Purple flowers', rationale: 'Correct. Since all offspring have the genotype Pp and P is dominant, they will all display the purple flower phenotype.', isCorrect: true },
                { text: 'No flowers will be produced', rationale: 'The cross describes the inheritance of flower color, not the ability to produce flowers.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is a mutation?',
            answerOptions: [
                { text: 'The process of a cell dividing.', rationale: 'This is mitosis or meiosis.', isCorrect: false },
                { text: 'A permanent change in the DNA sequence.', rationale: 'Correct. Mutations can be beneficial, harmful, or neutral and are the ultimate source of genetic variation.', isCorrect: true },
                { text: 'The physical appearance of an organism.', rationale: 'This is the phenotype.', isCorrect: false },
                { text: 'The transfer of genetic information from DNA to RNA.', rationale: 'This is transcription.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A symbiotic relationship where both organisms benefit is called:',
            answerOptions: [
                { text: 'Parasitism', rationale: 'In parasitism, one organism benefits and the other is harmed.', isCorrect: false },
                { text: 'Commensalism', rationale: 'In commensalism, one organism benefits and the other is unaffected.', isCorrect: false },
                { text: 'Mutualism', rationale: 'Correct. An example is a bee pollinating a flower while getting nectar.', isCorrect: true },
                { text: 'Predation', rationale: 'Predation is a relationship where one organism hunts and kills another.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which of the following shows the correct order of organization in an ecosystem, from simplest to most complex?',
            answerOptions: [
                { text: 'Community -> Population -> Organism -> Ecosystem', rationale: 'This order is incorrect.', isCorrect: false },
                { text: 'Organism -> Population -> Community -> Ecosystem', rationale: 'Correct. An individual organism is part of a population, which is part of a community, which is part of an ecosystem.', isCorrect: true },
                { text: 'Ecosystem -> Community -> Population -> Organism', rationale: 'This order is reversed.', isCorrect: false },
                { text: 'Population -> Organism -> Ecosystem -> Community', rationale: 'This order is incorrect.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The process by which nitrogen gas from the atmosphere is converted into a form that plants can use is called:',
            answerOptions: [
                { text: 'Denitrification', rationale: 'Denitrification is the process of converting nitrates back into nitrogen gas.', isCorrect: false },
                { text: 'Nitrogen fixation', rationale: 'Correct. This crucial process is carried out primarily by certain types of bacteria.', isCorrect: true },
                { text: 'Photosynthesis', rationale: 'Photosynthesis is the process of converting light energy into chemical energy.', isCorrect: false },
                { text: 'Respiration', rationale: 'Respiration is the process of converting food into energy.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'An energy pyramid illustrates the flow of energy between trophic levels. Approximately what percentage of energy is transferred from one trophic level to the next?',
            answerOptions: [
                { text: '100%', rationale: 'A large amount of energy is lost at each level, primarily as heat.', isCorrect: false },
                { text: '90%', rationale: 'This is the approximate amount of energy that is lost, not transferred.', isCorrect: false },
                { text: '50%', rationale: 'This is too high; the transfer is much less efficient.', isCorrect: false },
                { text: '10%', rationale: 'Correct. This is a general rule of thumb in ecology, known as the 10 percent rule.', isCorrect: true }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A new species is introduced to an ecosystem. It has no natural predators and reproduces quickly. This species is likely to:',
            answerOptions: [
                { text: 'Become an invasive species and outcompete native species for resources.', rationale: 'Correct. Without natural controls on its population, an introduced species can disrupt the balance of the ecosystem.', isCorrect: true },
                { text: 'Quickly go extinct due to lack of food.', rationale: 'If it reproduces quickly, it is likely finding an adequate food source.', isCorrect: false },
                { text: 'Form mutualistic relationships with all native species.', rationale: 'This is highly unlikely. It is more likely to compete with native species.', isCorrect: false },
                { text: 'Help increase the biodiversity of the ecosystem.', rationale: 'Invasive species typically decrease biodiversity by outcompeting and eliminating native species.', isCorrect: false }
            ]
        },
        {
            questionNumber: 13,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which part of a plant cell is responsible for converting light energy into chemical energy?',
            answerOptions: [
                { text: 'Nucleus', rationale: 'The nucleus contains the cell\'s genetic material.', isCorrect: false },
                { text: 'Mitochondrion', rationale: 'Mitochondria are responsible for cellular respiration, which releases energy from food.', isCorrect: false },
                { text: 'Chloroplast', rationale: 'Correct. Chloroplasts are the site of photosynthesis.', isCorrect: true },
                { text: 'Cell wall', rationale: 'The cell wall provides structural support.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Physical Science',
    id: 'sci_physical_science_2',
    title: 'Matter, Energy, and Waves',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is a unit of energy?',
            answerOptions: [
                { text: 'Newton', rationale: 'A Newton is a unit of force.', isCorrect: false },
                { text: 'Watt', rationale: 'A Watt is a unit of power (energy per unit of time).', isCorrect: false },
                { text: 'Joule', rationale: 'Correct. The Joule is the standard unit of energy in the International System of Units (SI).', isCorrect: true },
                { text: 'Kilogram', rationale: 'A kilogram is a unit of mass.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The three states of matter are:',
            answerOptions: [
                { text: 'Solid, Liquid, and Gas', rationale: 'Correct. These are the three common states of matter.', isCorrect: true },
                { text: 'Atom, Molecule, and Compound', rationale: 'These are levels of organization of matter.', isCorrect: false },
                { text: 'Proton, Neutron, and Electron', rationale: 'These are subatomic particles.', isCorrect: false },
                { text: 'Energy, Force, and Work', rationale: 'These are concepts in physics, not states of matter.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What kind of energy is stored in a battery?',
            answerOptions: [
                { text: 'Kinetic Energy', rationale: 'Kinetic energy is the energy of motion.', isCorrect: false },
                { text: 'Potential Energy', rationale: 'While it is a form of potential energy, "Chemical Energy" is more specific and correct.', isCorrect: false },
                { text: 'Mechanical Energy', rationale: 'Mechanical energy is the sum of kinetic and potential energy in an object.', isCorrect: false },
                { text: 'Chemical Energy', rationale: 'Correct. Batteries store energy in chemical compounds that can be released as electrical energy.', isCorrect: true }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The force that opposes motion between two surfaces in contact is called:',
            answerOptions: [
                { text: 'Gravity', rationale: 'Gravity is the force of attraction between masses.', isCorrect: false },
                { text: 'Friction', rationale: 'Correct. Friction is a force that resists the relative motion between surfaces.', isCorrect: true },
                { text: 'Inertia', rationale: 'Inertia is the resistance to a change in motion, a property of matter.', isCorrect: false },
                { text: 'Momentum', rationale: 'Momentum is the product of mass and velocity.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student is observing waves in a water tank. She notices that 3 complete waves pass a certain point every second. The distance between two consecutive crests (the highest points of the waves) is measured to be 0.5 meters.',
            question: 'What is the frequency of the waves?',
            answerOptions: [
                { text: '0.5 Hz', rationale: '0.5 meters is the wavelength, not the frequency.', isCorrect: false },
                { text: '3 Hz', rationale: 'Correct. Frequency is the number of waves that pass a point per second, measured in Hertz (Hz). The passage states that 3 waves pass per second.', isCorrect: true },
                { text: '1.5 m/s', rationale: 'This is the speed of the wave (frequency x wavelength).', isCorrect: false },
                { text: '1 second', rationale: 'This is the time interval over which the waves were counted.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student is observing waves in a water tank. She notices that 3 complete waves pass a certain point every second. The distance between two consecutive crests (the highest points of the waves) is measured to be 0.5 meters.',
            question: 'What is the wavelength of the waves?',
            answerOptions: [
                { text: '3 meters', rationale: '3 Hz is the frequency of the waves.', isCorrect: false },
                { text: '1 second', rationale: 'This is the time interval.', isCorrect: false },
                { text: '0.5 meters', rationale: 'Correct. Wavelength is the distance between two consecutive points in the same phase, such as two crests.', isCorrect: true },
                { text: '6 meters', rationale: 'This value is not derived from the information given.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'According to Newton\'s Second Law of Motion, if a constant force is applied to an object, its acceleration is:',
            answerOptions: [
                { text: 'Directly proportional to its mass.', rationale: 'Acceleration is inversely proportional to mass (a = F/m).', isCorrect: false },
                { text: 'Inversely proportional to its mass.', rationale: 'Correct. For a given force, a more massive object will accelerate less.', isCorrect: true },
                { text: 'Constant, regardless of its mass.', rationale: 'Mass has a direct impact on acceleration.', isCorrect: false },
                { text: 'Equal to the applied force.', rationale: 'Acceleration is force divided by mass.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A sound wave is an example of a:',
            answerOptions: [
                { text: 'Transverse wave', rationale: 'In a transverse wave, the oscillations are perpendicular to the direction of energy transfer (e.g., light).', isCorrect: false },
                { text: 'Longitudinal wave', rationale: 'Correct. In a longitudinal wave, the oscillations are parallel to the direction of energy transfer. Sound waves are compressions and rarefactions of a medium.', isCorrect: true },
                { text: 'Electromagnetic wave', rationale: 'Electromagnetic waves (like light, radio waves) do not require a medium to travel.', isCorrect: false },
                { text: 'Surface wave', rationale: 'Surface waves occur at the interface between two media.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the process of a solid changing directly into a gas, bypassing the liquid state?',
            answerOptions: [
                { text: 'Evaporation', rationale: 'Evaporation is the change from a liquid to a gas.', isCorrect: false },
                { text: 'Condensation', rationale: 'Condensation is the change from a gas to a liquid.', isCorrect: false },
                { text: 'Melting', rationale: 'Melting is the change from a solid to a liquid.', isCorrect: false },
                { text: 'Sublimation', rationale: 'Correct. An example is dry ice (solid carbon dioxide) turning into gas.', isCorrect: true }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A car accelerates from rest to a speed of 30 m/s in 10 seconds. What is the car\'s average acceleration?',
            answerOptions: [
                { text: '300 m/s²', rationale: 'This is the product of the final speed and time, not the acceleration.', isCorrect: false },
                { text: '3 m/s²', rationale: 'Correct. Acceleration is the change in velocity divided by the time taken. (30 m/s - 0 m/s) / 10 s = 3 m/s².', isCorrect: true },
                { text: '0.33 m/s²', rationale: 'This is the time divided by the final speed.', isCorrect: false },
                { text: '20 m/s²', rationale: 'This is the difference between the final speed and time.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The half-life of a radioactive isotope is 10 years. If you start with 100 grams of the isotope, how much will be left after 20 years?',
            answerOptions: [
                { text: '50 grams', rationale: 'This is the amount left after one half-life (10 years).', isCorrect: false },
                { text: '25 grams', rationale: 'Correct. After 10 years, 50 grams would be left. After another 10 years (total of 20), half of the remaining 50 grams would decay, leaving 25 grams.', isCorrect: true },
                { text: '0 grams', rationale: 'Radioactive decay approaches zero but never fully reaches it in a finite number of half-lives.', isCorrect: false },
                { text: '12.5 grams', rationale: 'This would be the amount left after 30 years.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Work is done on an object when:',
            answerOptions: [
                { text: 'The object is held stationary.', rationale: 'If the object does not move, no work is done, regardless of the force applied.', isCorrect: false },
                { text: 'A force is applied to the object, and the object moves in the direction of the force.', rationale: 'Correct. Work, in physics, is defined as force multiplied by the distance moved in the direction of the force.', isCorrect: true },
                { text: 'The object moves at a constant velocity without any force acting on it.', rationale: 'If there is no force, no work is done.', isCorrect: false },
                { text: 'The object has a large amount of potential energy.', rationale: 'Having potential energy does not mean that work is currently being done on the object.', isCorrect: false }
            ]
        },
        {
            questionNumber: 13,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'An element is defined by the number of ________ in its nucleus.',
            answerOptions: [
                { text: 'Neutrons', rationale: 'The number of neutrons can vary, creating different isotopes of the same element.', isCorrect: false },
                { text: 'Electrons', rationale: 'The number of electrons can change when an atom forms an ion.', isCorrect: false },
                { text: 'Protons', rationale: 'Correct. The number of protons (the atomic number) uniquely identifies an element.', isCorrect: true },
                { text: 'Quarks', rationale: 'Quarks are fundamental particles that make up protons and neutrons.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Earth & Space Science',
    id: 'sci_earth_space_2',
    title: 'Climate and Geology',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the name of the supercontinent that is theorized to have existed millions of years ago?',
            answerOptions: [
                { text: 'Eurasia', rationale: 'Eurasia is the combined continental landmass of Europe and Asia.', isCorrect: false },
                { text: 'Gondwana', rationale: 'Gondwana was a major part of the supercontinent, but not the whole thing.', isCorrect: false },
                { text: 'Pangaea', rationale: 'Correct. Pangaea was a supercontinent that existed during the late Paleozoic and early Mesozoic eras.', isCorrect: true },
                { text: 'Laurasia', rationale: 'Laurasia was the northern part of the supercontinent Pangaea.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The movement of weathered rock and soil by wind, water, or ice is called:',
            answerOptions: [
                { text: 'Weathering', rationale: 'Weathering is the breakdown of rocks.', isCorrect: false },
                { text: 'Erosion', rationale: 'Correct. Erosion is the process that transports rock and soil from one place to another.', isCorrect: true },
                { text: 'Deposition', rationale: 'Deposition is the process where eroded materials are laid down in a new location.', isCorrect: false },
                { text: 'Metamorphism', rationale: 'Metamorphism is the change of minerals or geologic texture in pre-existing rocks.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which planet is known as the "Red Planet"?',
            answerOptions: [
                { text: 'Venus', rationale: 'Venus is known for its thick, toxic atmosphere.', isCorrect: false },
                { text: 'Jupiter', rationale: 'Jupiter is a gas giant known for its Great Red Spot.', isCorrect: false },
                { text: 'Mars', rationale: 'Correct. Mars has a reddish appearance due to iron oxide (rust) on its surface.', isCorrect: true },
                { text: 'Saturn', rationale: 'Saturn is known for its prominent ring system.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the center of our solar system?',
            answerOptions: [
                { text: 'The Earth', rationale: 'This was a belief in early geocentric models, but we now know the Sun is the center.', isCorrect: false },
                { text: 'The Moon', rationale: 'The Moon is a satellite of the Earth.', isCorrect: false },
                { text: 'A black hole', rationale: 'There is a supermassive black hole at the center of our galaxy, but not our solar system.', isCorrect: false },
                { text: 'The Sun', rationale: 'Correct. All the planets in our solar system orbit the Sun.', isCorrect: true }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A scientist is analyzing climate data for a coastal city. The data table shows the average sea level in the city for the past 50 years. Year 1: 0 cm (baseline). Year 10: +2 cm. Year 20: +5 cm. Year 30: +8 cm. Year 40: +11 cm. Year 50: +15 cm.',
            question: 'What trend does the data show regarding the sea level in this city?',
            answerOptions: [
                { text: 'The sea level is decreasing over time.', rationale: 'The data shows a consistent increase in sea level.', isCorrect: false },
                { text: 'The sea level has remained constant.', rationale: 'The measurements clearly show a change from the baseline.', isCorrect: false },
                { text: 'The sea level is rising over time.', rationale: 'Correct. The measurements show a steady and accelerating increase in average sea level over the 50-year period.', isCorrect: true },
                { text: 'The sea level fluctuates randomly with no clear trend.', rationale: 'While there might be minor fluctuations year to year, the long-term data shows a clear upward trend.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A scientist is analyzing climate data for a coastal city. The data table shows the average sea level in the city for the past 50 years. Year 1: 0 cm (baseline). Year 10: +2 cm. Year 20: +5 cm. Year 30: +8 cm. Year 40: +11 cm. Year 50: +15 cm.',
            question: 'The primary cause of the trend shown in the data is most likely related to:',
            answerOptions: [
                { text: 'An increase in the number of earthquakes.', rationale: 'Earthquakes can cause sudden changes in land level but are not the cause of this steady global trend.', isCorrect: false },
                { text: 'Global climate change causing the melting of glaciers and thermal expansion of ocean water.', rationale: 'Correct. The rise in global temperatures is the main driver of sea-level rise, both by adding water from melting ice sheets and by causing the existing water to expand as it warms.', isCorrect: true },
                { text: 'A decrease in the amount of rainfall.', rationale: 'A decrease in rainfall would not directly cause the sea level to rise.', isCorrect: false },
                { text: 'The gravitational pull of the Moon.', rationale: 'The Moon\'s gravity causes daily tides, but not a long-term rise in the average sea level.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Rock that is formed from the cooling and solidification of magma or lava is called:',
            answerOptions: [
                { text: 'Sedimentary rock', rationale: 'Sedimentary rock is formed from compacted sediments.', isCorrect: false },
                { text: 'Metamorphic rock', rationale: 'Metamorphic rock is formed when existing rock is changed by heat and pressure.', isCorrect: false },
                { text: 'Igneous rock', rationale: 'Correct. Granite and basalt are examples of igneous rock.', isCorrect: true },
                { text: 'Fossilized rock', rationale: 'Fossils are found in rock (usually sedimentary), but it is not a class of rock itself.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The boundary where two tectonic plates collide is called a:',
            answerOptions: [
                { text: 'Divergent boundary', rationale: 'At a divergent boundary, plates are moving apart.', isCorrect: false },
                { text: 'Convergent boundary', rationale: 'Correct. This is where plates come together, often forming mountains or subduction zones.', isCorrect: true },
                { text: 'Transform boundary', rationale: 'At a transform boundary, plates slide past each other horizontally.', isCorrect: false },
                { text: 'Subduction boundary', rationale: 'A subduction zone is a type of convergent boundary, but "convergent" is the broader term.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the difference between weather and climate?',
            answerOptions: [
                { text: 'There is no difference; the terms are interchangeable.', rationale: 'The two terms have distinct meanings related to timescale.', isCorrect: false },
                { text: 'Weather refers to long-term atmospheric patterns, while climate refers to short-term conditions.', rationale: 'This is the reverse of the correct definition.', isCorrect: false },
                { text: 'Weather refers to short-term atmospheric conditions, while climate refers to the long-term average of weather in a specific region.', rationale: 'Correct. Climate is what you expect, weather is what you get.', isCorrect: true },
                { text: 'Weather is studied by meteorologists, while climate is studied by geologists.', rationale: 'Climate is studied by climatologists, not geologists.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The Earth\'s atmosphere is composed of several layers. In which layer does most weather occur?',
            answerOptions: [
                { text: 'Troposphere', rationale: 'Correct. The troposphere is the lowest layer of the atmosphere and contains most of the atmosphere\'s mass and water vapor.', isCorrect: true },
                { text: 'Stratosphere', rationale: 'The stratosphere is above the troposphere and contains the ozone layer.', isCorrect: false },
                { text: 'Mesosphere', rationale: 'The mesosphere is above the stratosphere and is where most meteors burn up.', isCorrect: false },
                { text: 'Thermosphere', rationale: 'The thermosphere is the outermost layer with very high temperatures.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A solar eclipse can only occur during which phase of the Moon?',
            answerOptions: [
                { text: 'Full Moon', rationale: 'A lunar eclipse occurs during a Full Moon.', isCorrect: false },
                { text: 'New Moon', rationale: 'Correct. A solar eclipse happens when the Moon is positioned between the Sun and Earth, which corresponds to the New Moon phase.', isCorrect: true },
                { text: 'First Quarter', rationale: 'During the first quarter, the Moon is at a 90-degree angle to the Sun and Earth.', isCorrect: false },
                { text: 'Third Quarter', rationale: 'During the third quarter, the Moon is also at a 90-degree angle to the Sun and Earth.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is the primary process that powers the Sun and other stars?',
            answerOptions: [
                { text: 'Nuclear fission', rationale: 'Nuclear fission is the splitting of atomic nuclei, used in nuclear power plants.', isCorrect: false },
                { text: 'Chemical combustion (burning)', rationale: 'The Sun is too hot for chemical bonds to exist; it is made of plasma.', isCorrect: false },
                { text: 'Gravitational collapse', rationale: 'Gravitational collapse is important in the formation of a star, but it is not what powers it for billions of years.', isCorrect: false },
                { text: 'Nuclear fusion', rationale: 'Correct. In the Sun\'s core, hydrogen atoms are fused together to form helium, releasing a vast amount of energy.', isCorrect: true }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Scientific Practices / Data Reasoning',
    id: 'sci_data_reasoning_2',
    title: 'Experimental Design and Interpretation',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the variable that is measured in a scientific experiment?',
            answerOptions: [
                { text: 'Independent variable', rationale: 'The independent variable is the one that is changed or manipulated.', isCorrect: false },
                { text: 'Dependent variable', rationale: 'Correct. The dependent variable is the outcome that is measured to see the effect of the independent variable.', isCorrect: true },
                { text: 'Control variable (Constant)', rationale: 'A control variable is a factor that is kept the same.', isCorrect: false },
                { text: 'Hypothesis', rationale: 'A hypothesis is a testable prediction, not a variable to be measured.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'When a scientist repeats an experiment conducted by another scientist to verify the results, it is called:',
            answerOptions: [
                { text: 'Replication', rationale: 'Correct. Replication is a cornerstone of the scientific process, ensuring that results are reliable and not a one-time fluke.', isCorrect: true },
                { text: 'Hypothesizing', rationale: 'Hypothesizing is the act of forming a testable explanation.', isCorrect: false },
                { text: 'Observation', rationale: 'Observation is the act of gathering information.', isCorrect: false },
                { text: 'Conclusion', rationale: 'A conclusion is a summary of the experiment\'s findings.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is an example of a quantitative observation?',
            answerOptions: [
                { text: 'The solution turned blue.', rationale: 'This is a qualitative observation (describing a quality).', isCorrect: false },
                { text: 'The plant has five leaves.', rationale: 'Correct. This is a quantitative observation because it involves a specific, measurable number.', isCorrect: true },
                { text: 'The rock feels smooth.', rationale: 'This is a qualitative observation (describing a texture).', isCorrect: false },
                { text: 'The gas has a strong odor.', rationale: 'This is a qualitative observation (describing a quality).', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The final step in the scientific method is often to:',
            answerOptions: [
                { text: 'Ask a question.', rationale: 'This is the first step.', isCorrect: false },
                { text: 'Form a hypothesis.', rationale: 'This is an early step.', isCorrect: false },
                { text: 'Communicate the results.', rationale: 'Correct. After analyzing data and drawing conclusions, scientists share their findings with the scientific community.', isCorrect: true },
                { text: 'Design an experiment.', rationale: 'This is done to test the hypothesis.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A researcher is testing the effectiveness of a new fertilizer on tomato plants. Group A consists of 50 plants that receive the new fertilizer. Group B consists of 50 plants that receive no fertilizer. Both groups are grown in the same type of soil, receive the same amount of sunlight, and are watered equally. The researcher measures the total weight of tomatoes produced by each plant.',
            question: 'What is the purpose of Group B in this experiment?',
            answerOptions: [
                { text: 'It is the experimental group.', rationale: 'Group A is the experimental group because it receives the new fertilizer.', isCorrect: false },
                { text: 'It serves as the control group.', rationale: 'Correct. Group B provides a baseline for comparison to see if the fertilizer has a significant effect compared to no treatment.', isCorrect: true },
                { text: 'It is the independent variable.', rationale: 'The presence or absence of fertilizer is the independent variable.', isCorrect: false },
                { text: 'It is the dependent variable.', rationale: 'The weight of the tomatoes is the dependent variable.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A researcher is testing the effectiveness of a new fertilizer on tomato plants. Group A consists of 50 plants that receive the new fertilizer. Group B consists of 50 plants that receive no fertilizer. Both groups are grown in the same type of soil, receive the same amount of sunlight, and are watered equally. The researcher measures the total weight of tomatoes produced by each plant.',
            question: 'What is the dependent variable in this experiment?',
            answerOptions: [
                { text: 'The type of fertilizer.', rationale: 'This is the independent variable.', isCorrect: false },
                { text: 'The amount of sunlight.', rationale: 'This is a constant (control variable).', isCorrect: false },
                { text: 'The total weight of tomatoes produced.', rationale: 'Correct. This is the outcome that is measured to assess the effect of the fertilizer.', isCorrect: true },
                { text: 'The type of soil.', rationale: 'This is a constant (control variable).', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A graph shows the population of a species of fish in a lake over 10 years. The y-axis is "Fish Population" and the x-axis is "Year". The line on the graph starts at 1,000 in Year 1, increases to 5,000 in Year 5, and then decreases to 2,000 in Year 10.',
            question: 'During which period did the fish population experience the fastest rate of growth?',
            answerOptions: [
                { text: 'Between Year 1 and Year 5', rationale: 'Correct. The population increased by 4,000 over 4 years (1,000 per year), which is a faster growth rate than the decline seen later.', isCorrect: true },
                { text: 'Between Year 5 and Year 10', rationale: 'During this period, the population decreased, it did not grow.', isCorrect: false },
                { text: 'The population growth was constant.', rationale: 'The graph shows a period of growth followed by a period of decline.', isCorrect: false },
                { text: 'The population did not grow.', rationale: 'The population grew significantly in the first five years.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A scientist makes a claim that a new diet pill helps people lose weight. Which of the following would be the most important factor in evaluating the validity of this claim?',
            answerOptions: [
                { text: 'The number of celebrities who endorse the pill.', rationale: 'Endorsements are a form of advertising, not scientific evidence.', isCorrect: false },
                { text: 'The results of a well-designed, controlled clinical trial published in a peer-reviewed journal.', rationale: 'Correct. This represents the highest standard of scientific evidence.', isCorrect: true },
                { text: 'Testimonials from a few people who say the pill worked for them.', rationale: 'Anecdotal evidence is not reliable as it can be biased and is not controlled for other factors.', isCorrect: false },
                { text: 'The professional appearance of the packaging and website.', rationale: 'Marketing and appearance have no bearing on the scientific validity of a product.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the mean (average) of the following set of numbers: 10, 15, 20, 25, 30?',
            answerOptions: [
                { text: '15', rationale: 'This is the second number in the set.', isCorrect: false },
                { text: '20', rationale: 'Correct. The sum of the numbers is 100. 100 divided by 5 (the number of values) is 20.', isCorrect: true },
                { text: '25', rationale: 'This is the fourth number in the set.', isCorrect: false },
                { text: '100', rationale: 'This is the sum of the numbers, not the average.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A study finds a strong positive correlation between ice cream sales and the number of drownings in a city. What is the most likely explanation for this correlation?',
            answerOptions: [
                { text: 'Eating ice cream causes people to be more likely to drown.', rationale: 'This confuses correlation with causation.', isCorrect: false },
                { text: 'A third factor, such as hot weather, is likely causing an increase in both ice cream sales and the number of people swimming.', rationale: 'Correct. Hot weather is a lurking variable that explains the relationship. Correlation does not imply causation.', isCorrect: true },
                { text: 'Drowning incidents cause people to buy more ice cream.', rationale: 'This is an illogical causal relationship.', isCorrect: false },
                { text: 'The correlation is purely coincidental and has no explanation.', rationale: 'While some correlations can be coincidental, in this case, there is a very likely third factor explaining the relationship.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'In order for a scientific theory to be valid, it must be:',
            answerOptions: [
                { text: 'Proven to be 100% correct without any doubt.', rationale: 'Scientific theories are always open to revision in light of new evidence; they are not considered "proven" in the absolute sense.', isCorrect: false },
                { text: 'Supported by a large body of evidence from multiple experiments and be falsifiable.', rationale: 'Correct. A valid theory is well-supported and it must be possible to conceive of an observation or argument which could negate it.', isCorrect: true },
                { text: 'Understood and accepted by the general public.', rationale: 'Public acceptance is not a requirement for scientific validity.', isCorrect: false },
                { text: 'An educated guess that has not yet been tested.', rationale: 'This describes a hypothesis, not a theory.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A student measures a block of wood and finds its length to be 10.5 cm, its width to be 5.2 cm, and its height to be 2.0 cm. What is the volume of the block, expressed with the correct number of significant figures?',
            answerOptions: [
                { text: '109.2 cm³', rationale: 'This is the exact calculated value, but it does not account for significant figures.', isCorrect: false },
                { text: '109 cm³', rationale: 'This rounds to three significant figures, but the measurement with the fewest (2.0 cm) has only two.', isCorrect: false },
                { text: '110 cm³', rationale: 'Correct. The measurement with the fewest significant figures is 2.0 cm (two significant figures). Therefore, the answer must be rounded to two significant figures. 109.2 rounded to two significant figures is 110.', isCorrect: true },
                { text: '100 cm³', rationale: 'This rounds to only one significant figure.', isCorrect: false }
            ]
        },
        {
            questionNumber: 13,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A scientist is studying the effect of a new drug on mice. What is the best way to avoid bias in the experiment?',
            answerOptions: [
                { text: 'The scientist should know which mice are getting the drug so they can observe them more closely.', rationale: 'This would introduce observer bias.', isCorrect: false },
                { text: 'The experiment should be designed as a double-blind study, where neither the researchers nor the participants know who is receiving the drug and who is receiving a placebo.', rationale: 'Correct. This minimizes bias from both the researchers and the subjects.', isCorrect: true },
                { text: 'Only healthy mice should be selected for the experiment.', rationale: 'This could create a biased sample, not representative of a real-world population.', isCorrect: false },
                { text: 'The results should only be published if they support the scientist\'s hypothesis.', rationale: 'This is a form of publication bias and is unethical.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Life Science',
    id: 'sci_life_science_3',
    title: 'Human Body Systems',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which system is primarily responsible for protecting the body from foreign invaders like bacteria and viruses?',
            answerOptions: [
                { text: 'Nervous System', rationale: 'The nervous system is the body\'s command and communication center.', isCorrect: false },
                { text: 'Endocrine System', rationale: 'The endocrine system produces hormones to regulate bodily functions.', isCorrect: false },
                { text: 'Immune System', rationale: 'Correct. The immune system is a complex network of cells, tissues, and organs that work together to defend the body against pathogens.', isCorrect: true },
                { text: 'Skeletal System', rationale: 'The skeletal system provides structure and support.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the primary function of the skeletal system?',
            answerOptions: [
                { text: 'To transport oxygen and nutrients.', rationale: 'This is the function of the circulatory system.', isCorrect: false },
                { text: 'To provide structure, support, and protection for the body.', rationale: 'Correct. The skeleton provides the framework for the body and protects vital organs.', isCorrect: true },
                { text: 'To break down food and absorb nutrients.', rationale: 'This is the function of the digestive system.', isCorrect: false },
                { text: 'To send electrical signals throughout the body.', rationale: 'This is the function of the nervous system.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which organ is the main control center of the nervous system?',
            answerOptions: [
                { text: 'The heart', rationale: 'The heart is the central organ of the circulatory system.', isCorrect: false },
                { text: 'The stomach', rationale: 'The stomach is an organ of the digestive system.', isCorrect: false },
                { text: 'The lungs', rationale: 'The lungs are the main organs of the respiratory system.', isCorrect: false },
                { text: 'The brain', rationale: 'Correct. The brain processes information, coordinates activity, and is the seat of consciousness.', isCorrect: true }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Muscles are attached to bones by tough, flexible bands of fibrous connective tissue called:',
            answerOptions: [
                { text: 'Ligaments', rationale: 'Ligaments connect bones to other bones.', isCorrect: false },
                { text: 'Tendons', rationale: 'Correct. Tendons connect muscle to bone, allowing for movement.', isCorrect: true },
                { text: 'Cartilage', rationale: 'Cartilage is a flexible connective tissue found in many parts of the body, such as joints and the ear.', isCorrect: false },
                { text: 'Nerves', rationale: 'Nerves transmit signals throughout the body.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'During vigorous exercise, a person\'s breathing rate and heart rate both increase. The lungs take in more oxygen from the air, and the heart pumps blood faster around the body. This coordinated response is crucial for supplying the body\'s muscles with the resources they need.',
            question: 'What is the primary reason that the heart rate increases during exercise?',
            answerOptions: [
                { text: 'To remove excess heat from the body.', rationale: 'While blood flow helps regulate temperature, the primary reason for the increased heart rate is to supply oxygen and nutrients.', isCorrect: false },
                { text: 'To deliver oxygen and nutrients to the muscles more quickly.', rationale: 'Correct. The muscles are working harder and require more oxygen for cellular respiration to produce energy. The increased heart rate speeds up this delivery.', isCorrect: true },
                { text: 'To strengthen the walls of the heart.', rationale: 'While exercise does strengthen the heart over time, this is a long-term adaptation, not the immediate reason for the rate increase.', isCorrect: false },
                { text: 'To signal to the brain that the body is tired.', rationale: 'The brain signals the heart to increase its rate; it is not the other way around.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'During vigorous exercise, a person\'s breathing rate and heart rate both increase. The lungs take in more oxygen from the air, and the heart pumps blood faster around the body. This coordinated response is crucial for supplying the body\'s muscles with the resources they need.',
            question: 'The interaction described in the passage is primarily between which two body systems?',
            answerOptions: [
                { text: 'Digestive and Skeletal Systems', rationale: 'These systems are not the primary ones involved in the immediate response to exercise described.', isCorrect: false },
                { text: 'Nervous and Endocrine Systems', rationale: 'While these systems control the response, the passage focuses on the systems doing the work of gas exchange and transport.', isCorrect: false },
                { text: 'Respiratory and Circulatory Systems', rationale: 'Correct. The respiratory system (lungs, breathing) takes in oxygen, and the circulatory system (heart, blood) transports it.', isCorrect: true },
                { text: 'Immune and Muscular Systems', rationale: 'The muscular system is using the oxygen, but the immune system is not primarily involved in this process.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which of the following is the primary function of the large intestine?',
            answerOptions: [
                { text: 'To absorb most of the nutrients from food.', rationale: 'This is the primary function of the small intestine.', isCorrect: false },
                { text: 'To produce bile to help digest fats.', rationale: 'This is a function of the liver.', isCorrect: false },
                { text: 'To absorb water from the remaining indigestible food matter and then to pass useless waste material from the body.', rationale: 'Correct. The large intestine plays a crucial role in water reabsorption and waste compaction.', isCorrect: true },
                { text: 'To secrete digestive enzymes that break down proteins.', rationale: 'This occurs in the stomach and small intestine.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Hormones, which are chemical messengers that regulate various bodily functions, are produced by which body system?',
            answerOptions: [
                { text: 'The Endocrine System', rationale: 'Correct. The endocrine system consists of glands (like the thyroid and pituitary) that produce and secrete hormones.', isCorrect: true },
                { text: 'The Nervous System', rationale: 'The nervous system uses electrical signals and neurotransmitters, not primarily hormones.', isCorrect: false },
                { text: 'The Excretory System', rationale: 'The excretory system (urinary system) removes waste from the body.', isCorrect: false },
                { text: 'The Integumentary System', rationale: 'The integumentary system is the skin, hair, and nails.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'In the human respiratory system, the actual exchange of gases (oxygen and carbon dioxide) occurs in the:',
            answerOptions: [
                { text: 'Trachea (windpipe)', rationale: 'The trachea is the main airway to the lungs.', isCorrect: false },
                { text: 'Bronchi', rationale: 'The bronchi are the large air tubes leading from the trachea to the lungs.', isCorrect: false },
                { text: 'Alveoli', rationale: 'Correct. These are tiny, balloon-like air sacs in the lungs where the gas exchange with the blood takes place.', isCorrect: true },
                { text: 'Diaphragm', rationale: 'The diaphragm is the muscle that controls breathing.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A reflex arc (like pulling your hand away from a hot object) is a rapid, involuntary response to a stimulus. What is the typical pathway of the nerve signal in a reflex arc?',
            answerOptions: [
                { text: 'Sensory neuron -> Brain -> Motor neuron', rationale: 'In many simple reflexes, the signal does not travel all the way to the brain for processing before a response is initiated.', isCorrect: false },
                { text: 'Sensory neuron -> Spinal cord -> Motor neuron', rationale: 'Correct. To ensure a rapid response, the signal goes from a sensory neuron to the spinal cord, which immediately sends a signal back via a motor neuron to cause a muscle contraction.', isCorrect: true },
                { text: 'Motor neuron -> Brain -> Sensory neuron', rationale: 'This reverses the direction of the signal flow.', isCorrect: false },
                { text: 'Brain -> Spinal cord -> Sensory neuron', rationale: 'This pathway is incorrect for a reflex response to a stimulus.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is the role of kidneys in the excretory system?',
            answerOptions: [
                { text: 'To store urine before it is expelled from the body.', rationale: 'This is the function of the bladder.', isCorrect: false },
                { text: 'To filter waste products from the blood and produce urine.', rationale: 'Correct. The kidneys are the primary organs of the urinary system, responsible for filtering blood and regulating water balance.', isCorrect: true },
                { text: 'To produce hormones that regulate blood sugar.', rationale: 'This is a function of the pancreas.', isCorrect: false },
                { text: 'To break down old red blood cells.', rationale: 'This is primarily a function of the spleen and liver.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Vaccination helps protect the body against disease by:',
            answerOptions: [
                { text: 'Directly killing any pathogens that are currently in the body.', rationale: 'Vaccines are typically preventative and do not act as a treatment to kill existing infections.', isCorrect: false },
                { text: 'Stimulating the immune system to produce memory cells and antibodies against a specific pathogen without causing the disease.', rationale: 'Correct. A vaccine introduces a harmless version or piece of a pathogen, allowing the immune system to "learn" how to fight it off in the future.', isCorrect: true },
                { text: 'Strengthening the muscular system to physically fight off infections.', rationale: 'Vaccines work through the immune system, not the muscular system.', isCorrect: false },
                { text: 'Providing the body with a permanent barrier against all types of bacteria and viruses.', rationale: 'Vaccines provide specific immunity to a particular pathogen, not a general barrier.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Physical Science',
    id: 'sci_physical_science_3',
    title: 'Electricity and Magnetism',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following particles has a negative electrical charge?',
            answerOptions: [
                { text: 'Proton', rationale: 'Protons have a positive charge.', isCorrect: false },
                { text: 'Neutron', rationale: 'Neutrons have no charge (they are neutral).', isCorrect: false },
                { text: 'Electron', rationale: 'Correct. Electrons are negatively charged particles that orbit the nucleus of an atom.', isCorrect: true },
                { text: 'Atom', rationale: 'An atom is typically neutral, containing an equal number of protons and electrons.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A material that allows electric current to flow through it easily is called a(n):',
            answerOptions: [
                { text: 'Insulator', rationale: 'An insulator is a material that resists the flow of electric current.', isCorrect: false },
                { text: 'Conductor', rationale: 'Correct. Metals like copper and aluminum are excellent conductors.', isCorrect: true },
                { text: 'Semiconductor', rationale: 'A semiconductor has properties between those of a conductor and an insulator.', isCorrect: false },
                { text: 'Resistor', rationale: 'A resistor is a component in a circuit that is designed to have a specific resistance.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The flow of electric charge is known as:',
            answerOptions: [
                { text: 'Voltage', rationale: 'Voltage is the electric potential difference.', isCorrect: false },
                { text: 'Resistance', rationale: 'Resistance is the opposition to the flow of current.', isCorrect: false },
                { text: 'Current', rationale: 'Correct. Electric current is the rate of flow of electric charge, measured in amperes (amps).', isCorrect: true },
                { text: 'Power', rationale: 'Power is the rate at which electrical energy is transferred.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What happens when two north poles of a magnet are brought close together?',
            answerOptions: [
                { text: 'They attract each other.', rationale: 'Opposite poles attract (north and south).', isCorrect: false },
                { text: 'They repel each other.', rationale: 'Correct. Like poles of a magnet repel each other.', isCorrect: true },
                { text: 'They cancel each other out.', rationale: 'The magnetic fields interact, but they do not cancel out.', isCorrect: false },
                { text: 'They have no effect on each other.', rationale: 'Magnets exert forces on each other.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student builds a simple circuit consisting of a 6-volt battery, a switch, and a light bulb. When the switch is closed, the light bulb turns on. The student uses an ammeter to measure the current flowing through the circuit and finds it to be 2 amperes (A).',
            question: 'According to Ohm\'s Law (Voltage = Current × Resistance), what is the resistance of the light bulb?',
            answerOptions: [
                { text: '12 ohms (Ω)', rationale: 'This is the product of voltage and current, not the resistance.', isCorrect: false },
                { text: '3 ohms (Ω)', rationale: 'Correct. Resistance = Voltage / Current = 6 V / 2 A = 3 Ω.', isCorrect: true },
                { text: '0.33 ohms (Ω)', rationale: 'This is the result of dividing the current by the voltage.', isCorrect: false },
                { text: '8 ohms (Ω)', rationale: 'This is the sum of the voltage and current.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student builds a simple circuit consisting of a 6-volt battery, a switch, and a light bulb. When the switch is closed, the light bulb turns on. The student uses an ammeter to measure the current flowing through the circuit and finds it to be 2 amperes (A).',
            question: 'If the student replaces the 6-volt battery with a 12-volt battery, what would be the expected current, assuming the resistance of the bulb stays the same?',
            answerOptions: [
                { text: '2 A', rationale: 'According to Ohm\'s Law, if the voltage increases and resistance stays the same, the current must also increase.', isCorrect: false },
                { text: '1 A', rationale: 'This would happen if the voltage were halved, not doubled.', isCorrect: false },
                { text: '4 A', rationale: 'Correct. Since the voltage is doubled, the current will also double. Current = Voltage / Resistance = 12 V / 3 Ω = 4 A.', isCorrect: true },
                { text: '6 A', rationale: 'This does not correctly follow the relationship in Ohm\'s Law.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'An electric generator works by converting:',
            answerOptions: [
                { text: 'Mechanical energy into electrical energy.', rationale: 'Correct. A generator uses motion (like a spinning turbine) within a magnetic field to induce an electric current.', isCorrect: true },
                { text: 'Electrical energy into mechanical energy.', rationale: 'This is what an electric motor does.', isCorrect: false },
                { text: 'Chemical energy into electrical energy.', rationale: 'This is what a battery does.', isCorrect: false },
                { text: 'Heat energy into electrical energy.', rationale: 'This is the principle of a thermocouple or thermoelectric generator.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'In a series circuit, what happens if one light bulb burns out?',
            answerOptions: [
                { text: 'All the other light bulbs stay on.', rationale: 'This is true for a parallel circuit.', isCorrect: false },
                { text: 'All the other light bulbs go out.', rationale: 'Correct. In a series circuit, there is only one path for the current. If the path is broken at any point, the entire circuit is opened and the current stops flowing.', isCorrect: true },
                { text: 'The other light bulbs get brighter.', rationale: 'The flow of current is stopped completely.', isCorrect: false },
                { text: 'The voltage of the battery increases.', rationale: 'The battery\'s voltage is not affected by the bulb burning out.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the region around a magnet where its magnetic force can be detected?',
            answerOptions: [
                { text: 'The magnetic pole', rationale: 'The poles are the parts of the magnet where the force is strongest, but the force extends beyond them.', isCorrect: false },
                { text: 'The electric circuit', rationale: 'An electric circuit is a path for electric current.', isCorrect: false },
                { text: 'The magnetic field', rationale: 'Correct. A magnetic field is a vector field that describes the magnetic influence on moving electric charges, electric currents, and magnetic materials.', isCorrect: true },
                { text: 'The gravitational field', rationale: 'A gravitational field is the region of space surrounding a body in which another body experiences a force of gravitational attraction.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is the relationship between electricity and magnetism?',
            answerOptions: [
                { text: 'They are two separate and unrelated forces.', rationale: 'They are very closely related.', isCorrect: false },
                { text: 'A moving electric charge (current) creates a magnetic field, and a changing magnetic field can create an electric current.', rationale: 'Correct. This is the fundamental principle of electromagnetism, described by Maxwell\'s Equations.', isCorrect: true },
                { text: 'Static electricity is a form of magnetism.', rationale: 'Static electricity is due to an imbalance of electric charges, not magnetism.', isCorrect: false },
                { text: 'Only permanent magnets can create an electric current.', rationale: 'Changing magnetic fields from electromagnets can also induce currents.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The electrical power (P) consumed by a device is calculated as P = Voltage (V) × Current (I). If a device connected to a 120-volt outlet draws a current of 2 amps, how much power does it consume?',
            answerOptions: [
                { text: '60 watts', rationale: 'This is the result of dividing the voltage by the current.', isCorrect: false },
                { text: '240 watts', rationale: 'Correct. Power = 120 V × 2 A = 240 W.', isCorrect: true },
                { text: '122 watts', rationale: 'This is the sum of the voltage and current.', isCorrect: false },
                { text: '0.017 watts', rationale: 'This is the result of dividing the current by the voltage.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Why are the wires in a household electrical cord covered in plastic or rubber?',
            answerOptions: [
                { text: 'To make the cord more colorful and attractive.', rationale: 'While color can be a feature, it is not the primary purpose.', isCorrect: false },
                { text: 'To increase the flow of electricity through the wire.', rationale: 'The covering does not increase the flow; the metal wire is the conductor.', isCorrect: false },
                { text: 'To act as an insulator, preventing electric shock and short circuits.', rationale: 'Correct. Plastic and rubber are electrical insulators that prevent the current from leaving the intended path.', isCorrect: true },
                { text: 'To make the wire heavier and more durable.', rationale: 'While it adds some durability, its primary function is electrical insulation.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Earth & Space Science',
    id: 'sci_earth_space_3',
    title: 'Earth\'s Systems and Human Impact',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The layer of gases surrounding the Earth is known as the:',
            answerOptions: [
                { text: 'Hydrosphere', rationale: 'The hydrosphere includes all the water on Earth.', isCorrect: false },
                { text: 'Lithosphere', rationale: 'The lithosphere is the rigid outer part of the earth, consisting of the crust and upper mantle.', isCorrect: false },
                { text: 'Atmosphere', rationale: 'Correct. The atmosphere is the envelope of gases that surrounds our planet.', isCorrect: true },
                { text: 'Biosphere', rationale: 'The biosphere is the zone where all life exists.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is a primary cause of air pollution?',
            answerOptions: [
                { text: 'Planting trees', rationale: 'Planting trees helps to improve air quality.', isCorrect: false },
                { text: 'The burning of fossil fuels', rationale: 'Correct. Burning coal, oil, and gas for energy releases pollutants like sulfur dioxide, nitrogen oxides, and particulate matter into the air.', isCorrect: true },
                { text: 'The water cycle', rationale: 'The water cycle is a natural process that does not cause pollution.', isCorrect: false },
                { text: 'Recycling', rationale: 'Recycling helps to reduce pollution.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The large-scale clearing of trees from forests is known as:',
            answerOptions: [
                { text: 'Reforestation', rationale: 'Reforestation is the process of replanting trees.', isCorrect: false },
                { text: 'Urbanization', rationale: 'Urbanization is the process of making an area more urban (city-like).', isCorrect: false },
                { text: 'Deforestation', rationale: 'Correct. This is a major environmental issue that contributes to climate change and loss of biodiversity.', isCorrect: true },
                { text: 'Erosion', rationale: 'Erosion is the wearing away of land by wind or water.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Resources that are consumed much faster than they can be naturally replaced are called:',
            answerOptions: [
                { text: 'Renewable resources', rationale: 'Renewable resources, like solar and wind, can be replenished naturally.', isCorrect: false },
                { text: 'Non-renewable resources', rationale: 'Correct. Fossil fuels like coal and oil are examples of non-renewable resources.', isCorrect: true },
                { text: 'Sustainable resources', rationale: 'Sustainable resources are managed in a way that they will be available for future generations.', isCorrect: false },
                { text: 'Abiotic resources', rationale: 'Abiotic resources are non-living parts of an ecosystem, which can be either renewable or non-renewable.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A scientist presents a graph showing two trends from the year 1950 to 2020. The first line shows the concentration of atmospheric carbon dioxide (CO2), which rises steadily from 310 parts per million (ppm) to 415 ppm. The second line shows the average global temperature, which also shows a clear upward trend, closely following the rise in CO2.',
            question: 'What is the most likely conclusion that can be drawn from this graph?',
            answerOptions: [
                { text: 'Global temperatures are causing an increase in CO2.', rationale: 'While there is a relationship, the widely accepted scientific consensus is that the increase in CO2 (a greenhouse gas) is trapping heat and causing the temperature to rise.', isCorrect: false },
                { text: 'There is a positive correlation between atmospheric CO2 and average global temperature.', rationale: 'Correct. The graph shows that as one variable (CO2) increases, the other variable (temperature) also increases, indicating a positive correlation.', isCorrect: true },
                { text: 'The concentration of CO2 in the atmosphere has remained stable.', rationale: 'The data explicitly states that CO2 has risen significantly.', isCorrect: false },
                { text: 'Global temperatures have been decreasing since 1950.', rationale: 'The graph shows a clear upward trend in temperature.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A scientist presents a graph showing two trends from the year 1950 to 2020. The first line shows the concentration of atmospheric carbon dioxide (CO2), which rises steadily from 310 parts per million (ppm) to 415 ppm. The second line shows the average global temperature, which also shows a clear upward trend, closely following the rise in CO2.',
            question: 'Which human activity is the most significant contributor to the increase in atmospheric CO2 shown in the data?',
            answerOptions: [
                { text: 'Planting large forests (reforestation).', rationale: 'Forests act as "carbon sinks," absorbing CO2 from the atmosphere. So, this would help decrease CO2.', isCorrect: false },
                { text: 'Using solar and wind power for energy.', rationale: 'These are renewable energy sources that do not produce CO2.', isCorrect: false },
                { text: 'Burning fossil fuels for energy and transportation.', rationale: 'Correct. The combustion of coal, oil, and natural gas releases large amounts of stored carbon into the atmosphere as CO2.', isCorrect: true },
                { text: 'Increased recycling programs worldwide.', rationale: 'Recycling helps reduce the need for new materials and can save energy, which would have a small effect on decreasing CO2.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The natural process that keeps the Earth warm enough for life to exist is called the:',
            answerOptions: [
                { text: 'Water cycle', rationale: 'The water cycle describes the movement of water on Earth.', isCorrect: false },
                { text: 'Greenhouse effect', rationale: 'Correct. Certain gases in the atmosphere trap heat from the sun, which is a natural and necessary process. Human activities have enhanced this effect.', isCorrect: true },
                { text: 'Rock cycle', rationale: 'The rock cycle describes the transformation of rocks between igneous, sedimentary, and metamorphic types.', isCorrect: false },
                { text: 'Carbon cycle', rationale: 'The carbon cycle is related, but the greenhouse effect is the specific name for the warming process.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The process of eutrophication in a lake is often caused by:',
            answerOptions: [
                { text: 'Acid rain.', rationale: 'Acid rain can harm lakes, but eutrophication is a separate issue.', isCorrect: false },
                { text: 'Runoff of fertilizers from agricultural fields.', rationale: 'Correct. The excess nutrients (nitrogen and phosphorus) in the fertilizers cause a massive algae bloom. When the algae die and decompose, it depletes the oxygen in the water, harming aquatic life.', isCorrect: true },
                { text: 'An increase in the fish population.', rationale: 'An increase in fish would not directly cause eutrophication.', isCorrect: false },
                { text: 'The introduction of an invasive species.', rationale: 'Invasive species can disrupt an ecosystem, but they are not the direct cause of eutrophication.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the primary role of the ozone layer in the stratosphere?',
            answerOptions: [
                { text: 'To regulate the Earth\'s temperature.', rationale: 'While it has a minor effect on temperature, its primary role is absorbing UV radiation.', isCorrect: false },
                { text: 'To absorb harmful ultraviolet (UV) radiation from the Sun.', rationale: 'Correct. The ozone layer protects life on Earth from the damaging effects of excessive UV radiation.', isCorrect: true },
                { text: 'To produce the oxygen we breathe.', rationale: 'The oxygen we breathe is primarily produced by plants through photosynthesis.', isCorrect: false },
                { text: 'To cause weather phenomena like clouds and rain.', rationale: 'Weather occurs in the troposphere, below the stratosphere.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The term "biodiversity" refers to:',
            answerOptions: [
                { text: 'The total number of individual organisms in an ecosystem.', rationale: 'This is a measure of abundance, but not biodiversity itself.', isCorrect: false },
                { text: 'The variety of life in the world or in a particular habitat or ecosystem.', rationale: 'Correct. Biodiversity includes diversity at the genetic, species, and ecosystem levels.', isCorrect: true },
                { text: 'The biomass (total mass of organisms) in a given area.', rationale: 'Biomass is a measure of the total mass, not the variety.', isCorrect: false },
                { text: 'The study of how animals behave in their natural habitats.', rationale: 'This is the field of ethology.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'How does deforestation contribute to an increase in atmospheric carbon dioxide?',
            answerOptions: [
                { text: 'By increasing the rate of cellular respiration in animals.', rationale: 'Deforestation does not directly impact animal respiration rates.', isCorrect: false },
                { text: 'By reducing the number of plants that can absorb carbon dioxide from the atmosphere through photosynthesis.', rationale: 'Correct. Trees are a major "carbon sink," and removing them reduces the planet\'s ability to absorb CO2. Often, the trees are also burned, which releases the stored carbon.', isCorrect: true },
                { text: 'By releasing large amounts of water vapor into the atmosphere.', rationale: 'While forests play a role in the water cycle, this is not how deforestation increases CO2.', isCorrect: false },
                { text: 'By causing the soil to release methane gas.', rationale: 'While soil can release greenhouse gases, the primary impact of deforestation on CO2 is through the loss of photosynthesis.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Ocean acidification is a direct consequence of the increasing concentration of what gas in the atmosphere?',
            answerOptions: [
                { text: 'Ozone (O3)', rationale: 'Ozone depletion is a separate environmental issue.', isCorrect: false },
                { text: 'Methane (CH4)', rationale: 'Methane is a powerful greenhouse gas, but CO2 is the primary driver of ocean acidification.', isCorrect: false },
                { text: 'Carbon Dioxide (CO2)', rationale: 'Correct. The ocean absorbs about a quarter of the CO2 that humans release into the atmosphere. When CO2 dissolves in seawater, it forms carbonic acid, which lowers the pH of the water.', isCorrect: true },
                { text: 'Sulfur Dioxide (SO2)', rationale: 'Sulfur dioxide is a primary cause of acid rain.', isCorrect: false }
            ]
        },
        {
            questionNumber: 13,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Which of the following describes a positive feedback loop in the context of climate change?',
            answerOptions: [
                { text: 'Increased plant growth due to higher CO2 levels, which then absorbs more CO2.', rationale: 'This is an example of a negative feedback loop, which counteracts the initial change.', isCorrect: false },
                { text: 'The melting of Arctic sea ice, which reduces the Earth\'s reflectivity (albedo), causing more solar radiation to be absorbed and leading to further warming and melting.', rationale: 'Correct. This is a classic example of a positive feedback loop, where the effect of a change amplifies the original change.', isCorrect: true },
                { text: 'The oceans absorbing more CO2 from the atmosphere as CO2 levels rise.', rationale: 'This is a stabilizing (negative) feedback, although this process leads to ocean acidification.', isCorrect: false },
                { text: 'Switching from fossil fuels to renewable energy sources to reduce emissions.', rationale: 'This is a human intervention to mitigate climate change, not a natural feedback loop.', isCorrect: false }
            ]
        },
        {
            questionNumber: 14,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The concept of a "carbon footprint" refers to:',
            answerOptions: [
                { text: 'The amount of carbon stored in fossil fuels in the ground.', rationale: 'This is a carbon reserve, not a footprint.', isCorrect: false },
                { text: 'The total amount of greenhouse gases (including CO2) emitted as a result of an individual\'s, organization\'s, or community\'s actions.', rationale: 'Correct. It is a measure of one\'s impact on the climate.', isCorrect: true },
                { text: 'The physical mark left by carbon-based organisms in fossils.', rationale: 'This is a literal interpretation, not the correct environmental term.', isCorrect: false },
                { text: 'The process of planting trees to offset carbon emissions.', rationale: 'This is a method of reducing a carbon footprint, not the footprint itself.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Scientific Practices / Data Reasoning',
    id: 'sci_data_reasoning_3',
    title: 'Interpreting Experiments and Data',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'In order for a scientific hypothesis to be valid, it must be:',
            answerOptions: [
                { text: 'Complex', rationale: 'A good hypothesis is often simple and clear, not necessarily complex.', isCorrect: false },
                { text: 'Popular', rationale: 'The popularity of a hypothesis has no bearing on its scientific validity.', isCorrect: false },
                { text: 'Testable', rationale: 'Correct. A hypothesis must be able to be tested through experiments or observations.', isCorrect: true },
                { text: 'Final', rationale: 'A hypothesis is a starting point for investigation and is subject to being revised or rejected.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following would be the best tool for measuring 15.5 milliliters (mL) of a liquid?',
            answerOptions: [
                { text: 'A beaker', rationale: 'A beaker is used for holding or mixing liquids, but it is not very accurate for precise measurements.', isCorrect: false },
                { text: 'A graduated cylinder', rationale: 'Correct. A graduated cylinder is specifically designed for accurate measurement of liquid volumes.', isCorrect: true },
                { text: 'A test tube', rationale: 'A test tube is used for holding small samples, not for measuring volume.', isCorrect: false },
                { text: 'A stopwatch', rationale: 'A stopwatch is used for measuring time.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A student records the following measurements for the length of a table: 2.5 m, 2.6 m, 2.4 m, 2.5 m. What is the average (mean) length?',
            answerOptions: [
                { text: '2.4 m', rationale: 'This is the lowest measurement, not the average.', isCorrect: false },
                { text: '2.5 m', rationale: 'Correct. The sum of the measurements is 10.0 m. 10.0 m / 4 = 2.5 m.', isCorrect: true },
                { text: '2.6 m', rationale: 'This is the highest measurement, not the average.', isCorrect: false },
                { text: '10.0 m', rationale: 'This is the sum of the measurements, not the average.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the purpose of a control group in an experiment?',
            answerOptions: [
                { text: 'To receive a double dose of the independent variable.', rationale: 'The control group does not receive the independent variable.', isCorrect: false },
                { text: 'To provide a baseline for comparison with the experimental group.', rationale: 'Correct. The control group helps scientists determine if the independent variable actually had an effect.', isCorrect: true },
                { text: 'To ensure the experiment is exciting.', rationale: 'The purpose is scientific validity, not entertainment.', isCorrect: false },
                { text: 'To help the scientist prove their hypothesis is correct.', rationale: 'The purpose is to fairly test the hypothesis, not to force a particular outcome.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A chemist is studying the rate of a chemical reaction at different temperatures. She mixes two chemicals and measures the time it takes for a color change to occur. The data is recorded in the table below. Temperature (°C): 10, 20, 30, 40. Reaction Time (seconds): 120, 60, 30, 15.',
            question: 'What is the relationship between temperature and reaction time according to the data?',
            answerOptions: [
                { text: 'As the temperature increases, the reaction time increases.', rationale: 'The data shows the opposite; as temperature goes up, the reaction time goes down.', isCorrect: false },
                { text: 'As the temperature increases, the reaction time decreases.', rationale: 'Correct. The reaction happens faster (takes less time) at higher temperatures. For every 10°C increase, the reaction time is halved.', isCorrect: true },
                { text: 'Temperature has no effect on the reaction time.', rationale: 'The data clearly shows a strong relationship between the two variables.', isCorrect: false },
                { text: 'The reaction time is always 10 times the temperature.', rationale: 'This is not the mathematical relationship shown in the data.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A chemist is studying the rate of a chemical reaction at different temperatures. She mixes two chemicals and measures the time it takes for a color change to occur. The data is recorded in the table below. Temperature (°C): 10, 20, 30, 40. Reaction Time (seconds): 120, 60, 30, 15.',
            question: 'Based on the trend in the data, what is the predicted reaction time at a temperature of 50°C?',
            answerOptions: [
                { text: '15 seconds', rationale: 'This is the reaction time at 40°C.', isCorrect: false },
                { text: '7.5 seconds', rationale: 'Correct. The pattern shows that for each 10°C increase in temperature, the reaction time is halved. Half of 15 seconds is 7.5 seconds.', isCorrect: true },
                { text: '0 seconds', rationale: 'The reaction would still take some amount of time.', isCorrect: false },
                { text: '10 seconds', rationale: 'This does not fit the pattern of halving the time for every 10°C increase.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A student is writing a lab report. In which section should they describe the step-by-step process of how they conducted the experiment?',
            answerOptions: [
                { text: 'Introduction', rationale: 'The introduction provides background information and the hypothesis.', isCorrect: false },
                { text: 'Methods/Procedure', rationale: 'Correct. This section details the experimental setup and the steps taken so that another scientist could replicate the experiment.', isCorrect: true },
                { text: 'Results', rationale: 'The results section presents the data that was collected, often in tables or graphs.', isCorrect: false },
                { text: 'Conclusion', rationale: 'The conclusion interprets the results and discusses whether the hypothesis was supported.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the median of the following data set: 5, 8, 12, 15, 20?',
            answerOptions: [
                { text: '8', rationale: 'This is the second number in the ordered set.', isCorrect: false },
                { text: '12', rationale: 'Correct. The median is the middle value in an ordered data set. In this case, 12 is the middle number.', isCorrect: true },
                { text: '15', rationale: 'This is the fourth number in the ordered set.', isCorrect: false },
                { text: '60', rationale: 'This is the sum of the numbers, not the median.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'An inference is:',
            answerOptions: [
                { text: 'A direct observation made using the five senses.', rationale: 'This is an observation.', isCorrect: false },
                { text: 'A conclusion reached on the basis of evidence and reasoning.', rationale: 'Correct. An inference is an interpretation of observations.', isCorrect: true },
                { text: 'A summary of the data collected in an experiment.', rationale: 'This is a result.', isCorrect: false },
                { text: 'A question that a scientist wants to answer.', rationale: 'This is a research question.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A student concludes that all plants need soil to grow. Which of the following observations would challenge this conclusion?',
            answerOptions: [
                { text: 'Seeing a large oak tree growing in a field.', rationale: 'This observation supports the conclusion.', isCorrect: false },
                { text: 'Observing a plant growing in a hydroponic system (using only water and nutrients).', rationale: 'Correct. This provides a counterexample, showing that plants can grow without soil if they are provided with the necessary nutrients and water.', isCorrect: true },
                { text: 'Reading that plants need sunlight for photosynthesis.', rationale: 'This is a related but separate fact that does not directly challenge the conclusion about soil.', isCorrect: false },
                { text: 'Noticing that a plant in dry soil is wilting.', rationale: 'This shows that plants need water, but it does not challenge the need for soil.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A scientific model (like a model of the solar system or an atom) is useful because it can:',
            answerOptions: [
                { text: 'Perfectly represent every detail of the real object or system.', rationale: 'Models are simplifications and cannot represent every detail perfectly.', isCorrect: false },
                { text: 'Help scientists visualize and understand complex systems or concepts.', rationale: 'Correct. Models are tools that make it easier to study things that are too large, too small, or too complex to observe directly.', isCorrect: true },
                { text: 'Provide a physical replacement for the real system.', rationale: 'A model is a representation, not a replacement.', isCorrect: false },
                { text: 'Prove that a scientific theory is absolutely true.', rationale: 'Models are used to test and refine theories, but they cannot "prove" them with absolute certainty.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A scientist is measuring the temperature of a liquid. The thermometer is not calibrated correctly and consistently reads 2°C higher than the actual temperature. This type of error is called:',
            answerOptions: [
                { text: 'Human error', rationale: 'Human error would be a mistake in reading the thermometer, not a consistent issue with the instrument itself.', isCorrect: false },
                { text: 'Random error', rationale: 'Random error would cause the measurements to be sometimes too high and sometimes too low, with no clear pattern.', isCorrect: false },
                { text: 'Systematic error', rationale: 'Correct. A systematic error is a consistent, repeatable error associated with a faulty instrument or a flawed experimental design.', isCorrect: true },
                { text: 'Computational error', rationale: 'A computational error would be a mistake in the analysis of the data, not in the measurement itself.', isCorrect: false }
            ]
        },
        {
            questionNumber: 13,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Which of the following claims is the most scientifically testable?',
            answerOptions: [
                { text: 'Blue is a prettier color than green.', rationale: 'This is a matter of personal opinion and cannot be tested scientifically.', isCorrect: false },
                { text: 'Dogs are more loyal companions than cats.', rationale: 'Loyalty is a complex trait that is difficult to define and measure objectively.', isCorrect: false },
                { text: 'Increasing the concentration of salt in water will increase its boiling point.', rationale: 'Correct. This is a specific, measurable, and falsifiable hypothesis that can be tested through a controlled experiment.', isCorrect: true },
                { text: 'It is unethical to conduct experiments on animals.', rationale: 'This is a question of ethics, not a scientifically testable claim.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Life Science',
    id: 'sci_life_science_4',
    title: 'Cells, Genetics, and Evolution',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the function of the cell membrane?',
            answerOptions: [
                { text: 'To produce energy for the cell.', rationale: 'This is the function of the mitochondria.', isCorrect: false },
                { text: 'To control what enters and leaves the cell.', rationale: 'Correct. The cell membrane is selectively permeable, regulating the passage of substances.', isCorrect: true },
                { text: 'To store the cell\'s genetic material.', rationale: 'This is the function of the nucleus.', isCorrect: false },
                { text: 'To provide rigid support for the cell.', rationale: 'This is the function of the cell wall in plant cells.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'An organism that is made of only one cell is called:',
            answerOptions: [
                { text: 'Multicellular', rationale: 'Multicellular organisms are made of many cells.', isCorrect: false },
                { text: 'Eukaryotic', rationale: 'Eukaryotic cells have a nucleus. An organism can be eukaryotic and either single-celled or multicellular.', isCorrect: false },
                { text: 'Unicellular', rationale: 'Correct. "Uni-" means one.', isCorrect: true },
                { text: 'Prokaryotic', rationale: 'Prokaryotic cells lack a nucleus. While many prokaryotes are unicellular, this term describes the cell type, not the number of cells.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The passing of traits from parents to offspring is known as:',
            answerOptions: [
                { text: 'Metabolism', rationale: 'Metabolism refers to the chemical processes within a living organism.', isCorrect: false },
                { text: 'Homeostasis', rationale: 'Homeostasis is the maintenance of a stable internal environment.', isCorrect: false },
                { text: 'Heredity', rationale: 'Correct. Heredity is the study of how genetic information is passed down through generations.', isCorrect: true },
                { text: 'Evolution', rationale: 'Evolution is the change in heritable traits of biological populations over successive generations.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the primary role of ribosomes in a cell?',
            answerOptions: [
                { text: 'To store water.', rationale: 'This is the function of the vacuole.', isCorrect: false },
                { text: 'To generate energy.', rationale: 'This is the function of mitochondria.', isCorrect: false },
                { text: 'To synthesize (make) proteins.', rationale: 'Correct. Ribosomes are the protein factories of the cell.', isCorrect: true },
                { text: 'To contain the DNA.', rationale: 'This is the function of the nucleus.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A population of deer lives in a forest ecosystem. Due to a series of unusually mild winters and an abundance of food, the deer population grows rapidly. As the deer population increases, they consume a large amount of the available vegetation, including young saplings.',
            question: 'Which of the following is a likely long-term consequence of the rapid growth in the deer population?',
            answerOptions: [
                { text: 'The population will continue to grow indefinitely.', rationale: 'No population can grow indefinitely due to limiting factors.', isCorrect: false },
                { text: 'The amount of vegetation in the forest will increase.', rationale: 'A larger deer population will lead to a decrease in vegetation.', isCorrect: false },
                { text: 'The deer population may eventually decrease due to a shortage of food.', rationale: 'Correct. The overconsumption of resources will lead to a decline in the food supply, which will then limit the deer population. This is an example of a limiting factor.', isCorrect: true },
                { text: 'The predators of the deer, such as wolves, will disappear from the forest.', rationale: 'An increase in the deer population would likely lead to an increase in the predator population, not a decrease.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A population of deer lives in a forest ecosystem. Due to a series of unusually mild winters and an abundance of food, the deer population grows rapidly. As the deer population increases, they consume a large amount of the available vegetation, including young saplings.',
            question: 'In this scenario, the availability of vegetation is an example of a:',
            answerOptions: [
                { text: 'Limiting factor', rationale: 'Correct. A limiting factor is a resource or environmental condition that limits the growth, abundance, or distribution of an organism or a population of organisms in an ecosystem.', isCorrect: true },
                { text: 'Mutualistic relationship', rationale: 'This describes a symbiotic relationship where both species benefit.', isCorrect: false },
                { text: 'Genetic mutation', rationale: 'A genetic mutation is a change in the DNA sequence.', isCorrect: false },
                { text: 'Trophic level', rationale: 'A trophic level is the position an organism occupies in a food web.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the difference between a prokaryotic cell and a eukaryotic cell?',
            answerOptions: [
                { text: 'Prokaryotic cells have a nucleus, while eukaryotic cells do not.', rationale: 'This is the reverse of the correct answer.', isCorrect: false },
                { text: 'Eukaryotic cells have a nucleus and other membrane-bound organelles, while prokaryotic cells do not.', rationale: 'Correct. This is the primary distinction. Prokaryotic cells (like bacteria) are simpler in structure.', isCorrect: true },
                { text: 'Prokaryotic cells are always larger than eukaryotic cells.', rationale: 'Eukaryotic cells are generally much larger and more complex.', isCorrect: false },
                { text: 'Only eukaryotic cells have a cell membrane.', rationale: 'All cells have a cell membrane.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'If a dominant allele (A) and a recessive allele (a) are both present in an organism (Aa), which trait will be expressed?',
            answerOptions: [
                { text: 'The recessive trait.', rationale: 'The recessive trait is only expressed if two copies are present (aa).', isCorrect: false },
                { text: 'The dominant trait.', rationale: 'Correct. A dominant allele masks the expression of a recessive allele.', isCorrect: true },
                { text: 'A blend of both traits.', rationale: 'This can occur in some cases (incomplete dominance), but in standard Mendelian genetics, the dominant trait is expressed.', isCorrect: false },
                { text: 'Neither trait will be expressed.', rationale: 'One of the traits will be expressed.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The process of cell division that results in four daughter cells each with half the number of chromosomes of the parent cell, as in the production of gametes, is called:',
            answerOptions: [
                { text: 'Mitosis', rationale: 'Mitosis produces two identical daughter cells with the same number of chromosomes.', isCorrect: false },
                { text: 'Meiosis', rationale: 'Correct. Meiosis is essential for sexual reproduction.', isCorrect: true },
                { text: 'Fertilization', rationale: 'Fertilization is the fusion of gametes to form a zygote.', isCorrect: false },
                { text: 'Replication', rationale: 'Replication is the process of copying DNA.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The theory of evolution by natural selection was proposed by:',
            answerOptions: [
                { text: 'Gregor Mendel', rationale: 'Mendel is known as the father of modern genetics for his work with pea plants.', isCorrect: false },
                { text: 'James Watson and Francis Crick', rationale: 'They are credited with discovering the structure of DNA.', isCorrect: false },
                { text: 'Charles Darwin', rationale: 'Correct. Darwin published his theory in his 1859 book "On the Origin of Species".', isCorrect: true },
                { text: 'Louis Pasteur', rationale: 'Pasteur is known for his discoveries in vaccination, microbial fermentation, and pasteurization.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Fossils are most commonly found in which type of rock?',
            answerOptions: [
                { text: 'Igneous rock', rationale: 'The high temperatures of magma and lava that form igneous rock would destroy any organic remains.', isCorrect: false },
                { text: 'Metamorphic rock', rationale: 'The intense heat and pressure that form metamorphic rock would typically destroy fossils.', isCorrect: false },
                { text: 'Sedimentary rock', rationale: 'Correct. The process of sediment accumulation and compaction allows for the preservation of organic remains.', isCorrect: true },
                { text: 'All types of rock equally.', rationale: 'Fossils are overwhelmingly found in sedimentary rock.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is the role of ATP (adenosine triphosphate) in a cell?',
            answerOptions: [
                { text: 'To serve as the primary carrier of genetic information.', rationale: 'This is the role of DNA.', isCorrect: false },
                { text: 'To provide the main source of usable energy for cellular processes.', rationale: 'Correct. ATP is often called the "energy currency" of the cell, powering everything from muscle contraction to DNA replication.', isCorrect: true },
                { text: 'To catalyze biochemical reactions.', rationale: 'This is the role of enzymes (which are proteins).', isCorrect: false },
                { text: 'To form the structural components of the cell membrane.', rationale: 'This is the role of lipids and proteins.', isCorrect: false }
            ]
        },
        {
            questionNumber: 13,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Homologous structures, such as the forelimb of a human, the wing of a bat, and the flipper of a whale, are considered evidence for evolution because they:',
            answerOptions: [
                { text: 'Perform the exact same function in each organism.', rationale: 'They perform different functions (grasping, flying, swimming).', isCorrect: false },
                { text: 'Suggest a common ancestry among these organisms.', rationale: 'Correct. The underlying similarity in the bone structure, despite different functions, indicates that these organisms evolved from a common ancestor.', isCorrect: true },
                { text: 'Are the result of random chance.', rationale: 'The similarity in structure is too great to be the result of random chance.', isCorrect: false },
                { text: 'Show that these organisms live in the same environment.', rationale: 'They live in very different environments (land, air, water).', isCorrect: false }
            ]
        },
        {
            questionNumber: 14,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the term for a group of organisms of the same species living in a particular area?',
            answerOptions: [
                { text: 'A community', rationale: 'A community consists of all the different species in an area.', isCorrect: false },
                { text: 'An ecosystem', rationale: 'An ecosystem includes all the living organisms and the non-living environment.', isCorrect: false },
                { text: 'A population', rationale: 'Correct. A population refers to a group of interbreeding individuals of a single species.', isCorrect: true },
                { text: 'The biosphere', rationale: 'The biosphere is the sum of all ecosystems on Earth.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Physical Science',
    id: 'sci_physical_science_4',
    title: 'Chemical Reactions and Properties of Matter',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the smallest unit of a chemical element that retains the properties of that element?',
            answerOptions: [
                { text: 'Molecule', rationale: 'A molecule is composed of two or more atoms bonded together.', isCorrect: false },
                { text: 'Compound', rationale: 'A compound is a substance formed from two or more different elements.', isCorrect: false },
                { text: 'Atom', rationale: 'Correct. The atom is the basic building block of all matter.', isCorrect:true },
                { text: 'Electron', rationale: 'An electron is a subatomic particle within an atom.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The measure of the amount of matter in an object is its:',
            answerOptions: [
                { text: 'Weight', rationale: 'Weight is the force of gravity on an object\'s mass.', isCorrect: false },
                { text: 'Volume', rationale: 'Volume is the amount of space an object occupies.', isCorrect: false },
                { text: 'Density', rationale: 'Density is mass per unit volume.', isCorrect: false },
                { text: 'Mass', rationale: 'Correct. Mass is a fundamental property of matter.', isCorrect: true }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A substance with a definite shape and a definite volume is a:',
            answerOptions: [
                { text: 'Solid', rationale: 'Correct. Solids have a fixed shape and volume.', isCorrect: true },
                { text: 'Liquid', rationale: 'Liquids have a definite volume but take the shape of their container.', isCorrect: false },
                { text: 'Gas', rationale: 'Gases have neither a definite shape nor a definite volume.', isCorrect: false },
                { text: 'Plasma', rationale: 'Plasma is a state of matter similar to gas in which a certain portion of the particles are ionized.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'In the chemical equation 2H₂ + O₂ → 2H₂O, what are the reactants?',
            answerOptions: [
                { text: 'H₂O only', rationale: 'H₂O is the product of the reaction.', isCorrect: false },
                { text: 'H₂ and O₂', rationale: 'Correct. Reactants are the substances that start a chemical reaction.', isCorrect: true },
                { text: 'H₂ and H₂O', rationale: 'H₂O is a product, not a reactant.', isCorrect: false },
                { text: 'O₂ and H₂O', rationale: 'H₂O is a product, not a reactant.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student investigates the rate of a reaction between a solid metal and an acid. To do this, they place a 5-gram strip of metal into a beaker containing 100 mL of acid and measure the amount of hydrogen gas produced over time. The student wants to see how surface area affects the reaction rate.',
            question: 'To test the effect of surface area, which of the following changes should the student make in their next experiment?',
            answerOptions: [
                { text: 'Use a more concentrated acid.', rationale: 'This would change the concentration, not the surface area.', isCorrect: false },
                { text: 'Heat the beaker during the reaction.', rationale: 'This would change the temperature, not the surface area.', isCorrect: false },
                { text: 'Use 5 grams of the same metal, but cut into small pieces.', rationale: 'Correct. Cutting the metal into pieces increases its surface area, which will allow the acid to react with it more quickly.', isCorrect: true },
                { text: 'Use a different type of metal.', rationale: 'This would change the type of reactant, not the surface area.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student investigates the rate of a reaction between a solid metal and an acid. To do this, they place a 5-gram strip of metal into a beaker containing 100 mL of acid and measure the amount of hydrogen gas produced over time. The student wants to see how surface area affects the reaction rate.',
            question: 'In this experiment, the amount of hydrogen gas produced is the:',
            answerOptions: [
                { text: 'Independent variable', rationale: 'The independent variable is the factor being changed, which is surface area.', isCorrect: false },
                { text: 'Dependent variable', rationale: 'Correct. The amount of gas produced is the outcome being measured to determine the reaction rate.', isCorrect: true },
                { text: 'Constant', rationale: 'The constants are factors kept the same, like the acid volume and initial metal mass.', isCorrect: false },
                { text: 'Control group', rationale: 'A control group would be an experiment run under standard conditions for comparison, for example, the initial experiment with the metal strip.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The pH scale measures how acidic or basic a substance is. A substance with a pH of 7 is considered:',
            answerOptions: [
                { text: 'Strongly acidic', rationale: 'Strongly acidic substances have a low pH (e.g., 1-3).', isCorrect: false },
                { text: 'Slightly basic', rationale: 'Slightly basic substances have a pH just above 7 (e.g., 8-9).', isCorrect: false },
                { text: 'Neutral', rationale: 'Correct. Pure water has a pH of 7.', isCorrect: true },
                { text: 'Strongly basic', rationale: 'Strongly basic substances have a high pH (e.g., 12-14).', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is a solution?',
            answerOptions: [
                { text: 'A substance that cannot be broken down into simpler substances.', rationale: 'This is an element.', isCorrect: false },
                { text: 'A homogeneous mixture of two or more substances.', rationale: 'Correct. In a solution, the solute is dissolved evenly throughout the solvent.', isCorrect: true },
                { text: 'A substance in which the components are not evenly distributed.', rationale: 'This is a heterogeneous mixture.', isCorrect: false },
                { text: 'A pure substance consisting of two or more elements chemically bonded together.', rationale: 'This is a compound.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The law of conservation of mass states that:',
            answerOptions: [
                { text: 'Mass can be created but not destroyed.', rationale: 'The law states that mass cannot be created.', isCorrect: false },
                { text: 'The total mass of the reactants must equal the total mass of the products in a chemical reaction.', rationale: 'Correct. Mass is neither created nor destroyed in a chemical reaction.', isCorrect: true },
                { text: 'Heavier objects have more mass.', rationale: 'While often true, this is not a statement of the law of conservation of mass.', isCorrect: false },
                { text: 'Mass is a form of energy.', rationale: 'This is related to Einstein\'s E=mc², not the law of conservation of mass in chemical reactions.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'An atom that has gained or lost electrons and has an electrical charge is called a(n):',
            answerOptions: [
                { text: 'Isotope', rationale: 'An isotope is an atom with a different number of neutrons.', isCorrect: false },
                { text: 'Ion', rationale: 'Correct. An atom that loses electrons becomes a positive ion (cation), and one that gains electrons becomes a negative ion (anion).', isCorrect: true },
                { text: 'Molecule', rationale: 'A molecule is a neutral group of two or more atoms held together by chemical bonds.', isCorrect: false },
                { text: 'Element', rationale: 'An element is a pure substance consisting only of atoms that all have the same numbers of protons in their atomic nuclei.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What type of chemical bond is formed when two atoms share electrons?',
            answerOptions: [
                { text: 'Ionic bond', rationale: 'An ionic bond is formed when one atom transfers electrons to another, creating ions that are attracted to each other.', isCorrect: false },
                { text: 'Covalent bond', rationale: 'Correct. Covalent bonds form molecules, like H₂O.', isCorrect: true },
                { text: 'Metallic bond', rationale: 'A metallic bond is the type of bond found in metals, where electrons are delocalized in a "sea".', isCorrect: false },
                { text: 'Hydrogen bond', rationale: 'A hydrogen bond is a weaker attraction between molecules, not a bond that forms molecules by sharing electrons between atoms.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A catalyst is a substance that:',
            answerOptions: [
                { text: 'Is a reactant in a chemical reaction.', rationale: 'A catalyst participates in the reaction but is not consumed.', isCorrect: false },
                { text: 'Increases the amount of product formed in a reaction.', rationale: 'A catalyst does not change the total amount of product, only how fast it is formed.', isCorrect: false },
                { text: 'Increases the rate of a chemical reaction without being consumed by the reaction.', rationale: 'Correct. Catalysts work by providing an alternative reaction pathway with a lower activation energy.', isCorrect: true },
                { text: 'Stops a chemical reaction from occurring.', rationale: 'A substance that stops a reaction is called an inhibitor.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Earth & Space Science',
    id: 'sci_earth_space_4',
    title: 'Geology and Planetary Science',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the solid, rocky outer layer of the Earth called?',
            answerOptions: [
                { text: 'The Mantle', rationale: 'The mantle is the layer beneath the crust.', isCorrect: false },
                { text: 'The Core', rationale: 'The core is the innermost part of the Earth.', isCorrect: false },
                { text: 'The Crust', rationale: 'Correct. The crust is the thinnest and outermost layer of the Earth.', isCorrect: true },
                { text: 'The Atmosphere', rationale: 'The atmosphere is the layer of gases surrounding the Earth.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which type of rock is formed from the cooling of magma or lava?',
            answerOptions: [
                { text: 'Sedimentary', rationale: 'Sedimentary rocks are formed from the accumulation of sediments.', isCorrect: false },
                { text: 'Metamorphic', rationale: 'Metamorphic rocks are formed by the alteration of pre-existing rocks by heat and pressure.', isCorrect: false },
                { text: 'Igneous', rationale: 'Correct. This is the definition of an igneous rock.', isCorrect: true },
                { text: 'Fossil', rationale: 'Fossils are found within rocks, but it is not a type of rock.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A sudden shaking of the ground caused by the movement of tectonic plates is called:',
            answerOptions: [
                { text: 'A volcano', rationale: 'A volcano is an opening in the Earth\'s crust from which lava, ash, and gases erupt.', isCorrect: false },
                { text: 'A hurricane', rationale: 'A hurricane is a large rotating storm with high-speed winds that forms over warm waters.', isCorrect: false },
                { text: 'An earthquake', rationale: 'Correct. Earthquakes are caused by the release of energy from the Earth\'s crust.', isCorrect: true },
                { text: 'A tsunami', rationale: 'A tsunami is a large ocean wave, often caused by an underwater earthquake.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of these is the largest planet in our solar system?',
            answerOptions: [
                { text: 'Earth', rationale: 'Earth is the fifth largest planet.', isCorrect: false },
                { text: 'Saturn', rationale: 'Saturn is the second largest planet.', isCorrect: false },
                { text: 'Jupiter', rationale: 'Correct. Jupiter is a gas giant and is more than twice as massive as all the other planets combined.', isCorrect: true },
                { text: 'Neptune', rationale: 'Neptune is the fourth largest planet.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A geological cross-section diagram shows several horizontal layers of sedimentary rock. Layer A is at the bottom, followed by Layer B, then Layer C on top. A fault (a crack in the rock) cuts through Layer A and Layer B, but not through Layer C. An igneous intrusion (a body of igneous rock) is shown to have pushed up through Layer A, B, and C.',
            question: 'Based on the Principle of Superposition, which rock layer is the oldest?',
            answerOptions: [
                { text: 'Layer A', rationale: 'Correct. The Principle of Superposition states that in an undisturbed sequence of sedimentary rocks, the oldest layers are at the bottom and the youngest are at the top.', isCorrect: true },
                { text: 'Layer B', rationale: 'Layer B is younger than Layer A.', isCorrect: false },
                { text: 'Layer C', rationale: 'Layer C is the youngest of the three sedimentary layers.', isCorrect: false },
                { text: 'The igneous intrusion', rationale: 'The intrusion must be younger than the layers it cuts through.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'hard',
            passage: 'A geological cross-section diagram shows several horizontal layers of sedimentary rock. Layer A is at the bottom, followed by Layer B, then Layer C on top. A fault (a crack in the rock) cuts through Layer A and Layer B, but not through Layer C. An igneous intrusion (a body of igneous rock) is shown to have pushed up through Layer A, B, and C.',
            question: 'Which of the following events occurred most recently?',
            answerOptions: [
                { text: 'The deposition of Layer A.', rationale: 'This is the oldest event.', isCorrect: false },
                { text: 'The faulting that cut through Layers A and B.', rationale: 'The fault is younger than A and B, but older than C.', isCorrect: false },
                { text: 'The deposition of Layer C.', rationale: 'Layer C was deposited after the fault occurred, but before the igneous intrusion.', isCorrect: false },
                { text: 'The igneous intrusion.', rationale: 'Correct. According to the Principle of Cross-Cutting Relationships, the intrusion must be the youngest event because it cuts through all three layers.', isCorrect: true }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the primary driver of the Earth\'s water cycle?',
            answerOptions: [
                { text: 'Energy from the Sun', rationale: 'Correct. Solar energy drives evaporation, the process that lifts water into the atmosphere.', isCorrect: true },
                { text: 'The Earth\'s internal heat', rationale: 'The Earth\'s internal heat drives plate tectonics, not the water cycle.', isCorrect: false },
                { text: 'The gravitational pull of the Moon', rationale: 'The Moon\'s gravity causes tides.', isCorrect: false },
                { text: 'Wind patterns', rationale: 'Wind helps move water vapor, but it is not the primary energy source for the cycle.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A light-year is a unit of:',
            answerOptions: [
                { text: 'Time', rationale: 'Although it has "year" in the name, it is not a unit of time.', isCorrect: false },
                { text: 'Speed', rationale: 'The speed of light is a constant, but a light-year is a unit of distance.', isCorrect: false },
                { text: 'Distance', rationale: 'Correct. It is the distance that light travels in one year.', isCorrect: true },
                { text: 'Brightness', rationale: 'Brightness is measured in units like lumens or magnitude.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The "Ring of Fire" is an area in the basin of the Pacific Ocean known for a high number of:',
            answerOptions: [
                { text: 'Hurricanes and typhoons', rationale: 'While this region experiences these storms, it is primarily known for its geological activity.', isCorrect: false },
                { text: 'Earthquakes and volcanic eruptions', rationale: 'Correct. The Ring of Fire is a direct result of the movement and collisions of tectonic plates.', isCorrect: true },
                { text: 'Deep ocean trenches', rationale: 'While trenches are part of the geology, the name refers to the volcanic and seismic activity.', isCorrect: false },
                { text: 'Coral reefs', rationale: 'There are many coral reefs in the Pacific, but this is not the defining feature of the Ring of Fire.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is the main difference between a star and a planet?',
            answerOptions: [
                { text: 'A star is much larger than a planet.', rationale: 'While generally true, size is not the defining difference. Some brown dwarf stars can be similar in size to large gas giant planets.', isCorrect: false },
                { text: 'A star is made of gas, while a planet is made of rock.', rationale: 'Gas giant planets like Jupiter are also made of gas.', isCorrect: false },
                { text: 'A star produces its own light through nuclear fusion, while a planet reflects light from a star.', rationale: 'Correct. This is the fundamental difference between a star and a planet.', isCorrect: true },
                { text: 'A star is stationary, while a planet orbits it.', rationale: 'Stars are also in motion; they orbit the center of their galaxy.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The process of physical weathering breaks down rocks into smaller pieces without changing their chemical composition. Which of the following is an example of physical weathering?',
            answerOptions: [
                { text: 'The formation of rust on an iron-rich rock.', rationale: 'This is a chemical change called oxidation.', isCorrect: false },
                { text: 'The dissolving of limestone by acid rain.', rationale: 'This is a chemical change.', isCorrect: false },
                { text: 'The expansion of water as it freezes in the cracks of a rock, causing it to break apart.', rationale: 'Correct. This process, called frost wedging, is a form of physical weathering.', isCorrect: true },
                { text: 'The reaction of a rock\'s minerals with oxygen.', rationale: 'This is a chemical change (oxidation).', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Our solar system is located in which galaxy?',
            answerOptions: [
                { text: 'The Andromeda Galaxy', rationale: 'The Andromeda Galaxy is the nearest major galaxy to our own, but it is not our home galaxy.', isCorrect: false },
                { text: 'The Milky Way Galaxy', rationale: 'Correct. Our solar system is in the Orion Arm of the Milky Way, a spiral galaxy.', isCorrect: true },
                { text: 'The Triangulum Galaxy', rationale: 'This is another galaxy in our Local Group.', isCorrect: false },
                { text: 'The Sombrero Galaxy', rationale: 'This is a galaxy located much farther away.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Scientific Practices / Data Reasoning',
    id: 'sci_data_reasoning_4',
    title: 'Data Representation and Scientific Inquiry',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is an example of making a qualitative observation?',
            answerOptions: [
                { text: 'The liquid has a volume of 50 mL.', rationale: 'This is a quantitative observation as it involves a measurement.', isCorrect: false },
                { text: 'The reaction produced a fizzing sound.', rationale: 'Correct. This describes a quality (the sound) rather than a numerical measurement.', isCorrect: true },
                { text: 'The plant grew 3 cm in one week.', rationale: 'This is a quantitative observation.', isCorrect: false },
                { text: 'The temperature of the water is 25°C.', rationale: 'This is a quantitative observation.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'In a well-designed experiment, how many independent variables should be tested at a time?',
            answerOptions: [
                { text: 'None', rationale: 'An experiment needs an independent variable to test its effect.', isCorrect: false },
                { text: 'Only one', rationale: 'Correct. To determine a clear cause-and-effect relationship, it is important to change only one variable at a time.', isCorrect: true },
                { text: 'Two or three', rationale: 'Testing multiple variables at once makes it difficult to determine which variable caused the observed effect.', isCorrect: false },
                { text: 'As many as possible', rationale: 'This would lead to an uncontrolled and inconclusive experiment.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the mode of the following data set: 4, 7, 8, 7, 5, 9, 7?',
            answerOptions: [
                { text: '7', rationale: 'Correct. The mode is the value that appears most frequently in a data set.', isCorrect: true },
                { text: '8', rationale: 'The number 8 appears only once.', isCorrect: false },
                { text: '6.7', rationale: 'This is the approximate mean (average) of the data set.', isCorrect: false },
                { text: '5', rationale: 'The range of the data is 5 (9 - 4), but 5 is not the mode.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A scientific theory is:',
            answerOptions: [
                { text: 'A wild guess or an opinion.', rationale: 'This is a common misuse of the word "theory." In science, a theory is a well-supported explanation.', isCorrect: false },
                { text: 'A well-substantiated explanation for a natural phenomenon that is supported by a large body of evidence.', rationale: 'Correct. Theories like the theory of gravity or the theory of evolution are backed by extensive evidence.', isCorrect: true },
                { text: 'An initial idea that has not yet been tested.', rationale: 'This is a hypothesis.', isCorrect: false },
                { text: 'A law of nature that is absolutely proven and cannot be changed.', rationale: 'Scientific theories are always subject to refinement or revision based on new evidence.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A bar graph displays the results of an experiment on the effectiveness of three different fertilizers (X, Y, and Z) on the average height of corn plants. The y-axis is labeled "Average Plant Height (cm)". The bar for the control group (no fertilizer) shows a height of 20 cm. The bar for Fertilizer X shows 30 cm. The bar for Fertilizer Y shows 45 cm. The bar for Fertilizer Z shows 30 cm.',
            question: 'Based on the graph, which fertilizer was the most effective?',
            answerOptions: [
                { text: 'Fertilizer X', rationale: 'Fertilizer X resulted in less growth than Fertilizer Y.', isCorrect: false },
                { text: 'Fertilizer Y', rationale: 'Correct. The bar for Fertilizer Y is the highest, indicating the greatest average plant height.', isCorrect: true },
                { text: 'Fertilizer Z', rationale: 'Fertilizer Z produced the same result as Fertilizer X, and less than Y.', isCorrect: false },
                { text: 'The control group', rationale: 'The control group showed the least growth, as expected.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A bar graph displays the results of an experiment on the effectiveness of three different fertilizers (X, Y, and Z) on the average height of corn plants. The y-axis is labeled "Average Plant Height (cm)". The bar for the control group (no fertilizer) shows a height of 20 cm. The bar for Fertilizer X shows 30 cm. The bar for Fertilizer Y shows 45 cm. The bar for Fertilizer Z shows 30 cm.',
            question: 'What can be concluded about Fertilizers X and Z?',
            answerOptions: [
                { text: 'They were less effective than having no fertilizer.', rationale: 'Both produced more growth (30 cm) than the control group (20 cm).', isCorrect: false },
                { text: 'They had a similar effect on plant height.', rationale: 'Correct. The bars for both X and Z show the same average height of 30 cm.', isCorrect: true },
                { text: 'They were more effective than Fertilizer Y.', rationale: 'Fertilizer Y produced the most growth.', isCorrect: false },
                { text: 'They stopped the plants from growing.', rationale: 'The plants grew more with these fertilizers than without.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the range of the following temperature measurements: 12°C, 15°C, 9°C, 18°C, 11°C?',
            answerOptions: [
                { text: '9°C', rationale: 'Correct. The range is the difference between the highest and lowest values in a data set (18°C - 9°C = 9°C).', isCorrect: true },
                { text: '18°C', rationale: 'This is the highest value, not the range.', isCorrect: false },
                { text: '13°C', rationale: 'This is the mean (average) of the data.', isCorrect: false },
                { text: '12°C', rationale: 'This is the median of the data.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A scientist is studying a population of birds on an island. Which of the following is a necessary component of a valid scientific investigation?',
            answerOptions: [
                { text: 'The scientist must already know the outcome of the study.', rationale: 'If the outcome is already known, it is not a true investigation.', isCorrect: false },
                { text: 'The study must be able to be replicated by other scientists.', rationale: 'Correct. Replicability is a key principle of the scientific method, ensuring that results are reliable.', isCorrect: true },
                { text: 'The study must use the most expensive equipment available.', rationale: 'The quality of the equipment is important, but its cost is not a measure of the validity of the study.', isCorrect: false },
                { text: 'The study must prove the scientist\'s personal beliefs to be true.', rationale: 'Science aims to be objective and test hypotheses, not confirm personal beliefs.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'An unproven statement that is temporarily accepted as the basis for further investigation is a(n):',
            answerOptions: [
                { text: 'Law', rationale: 'A law is a statement that has been repeatedly verified by observation.', isCorrect: false },
                { text: 'Theory', rationale: 'A theory is a well-substantiated explanation.', isCorrect: false },
                { text: 'Hypothesis', rationale: 'Correct. A hypothesis is a tentative assumption made in order to draw out and test its logical or empirical consequences.', isCorrect: true },
                { text: 'Fact', rationale: 'A fact is an objective and verifiable observation.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'In a pie chart that represents the composition of a rock, one sector is labeled "Quartz - 40%". If the total mass of the rock is 500 grams, what is the mass of quartz in the rock?',
            answerOptions: [
                { text: '40 grams', rationale: 'This would be 40% of a 100-gram rock.', isCorrect: false },
                { text: '200 grams', rationale: 'Correct. To find the mass of quartz, calculate 40% of 500 grams (0.40 × 500 = 200).', isCorrect: true },
                { text: '250 grams', rationale: 'This would be 50% of the rock.', isCorrect: false },
                { text: '400 grams', rationale: 'This would be 80% of the rock.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A study is conducted to see if a new medication improves memory. The researchers find a statistically significant improvement in the group that took the medication compared to the placebo group. What does "statistically significant" mean?',
            answerOptions: [
                { text: 'The improvement was very large and noticeable.', rationale: 'The size of the effect is different from its statistical significance. A small effect can still be statistically significant.', isCorrect: false },
                { text: 'The results are unlikely to be due to random chance.', rationale: 'Correct. Statistical significance is a measure of the probability that the observed difference between groups is not just a random fluctuation.', isCorrect: true },
                { text: 'The experiment was conducted perfectly without any errors.', rationale: 'No experiment is ever perfect; statistical significance accounts for the possibility of random error.', isCorrect: false },
                { text: 'All participants in the medication group improved their memory.', rationale: 'The improvement is usually an average; not every individual will necessarily improve.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'When drawing a line of best fit on a scatter plot, the line should:',
            answerOptions: [
                { text: 'Connect all the data points in order.', rationale: 'This would create a jagged line, not a line of best fit.', isCorrect: false },
                { text: 'Pass through the first and last data points.', rationale: 'The line should represent the overall trend, not just the beginning and end points.', isCorrect: false },
                { text: 'Be as close as possible to all the data points, with roughly an equal number of points above and below the line.', rationale: 'Correct. The line of best fit is a straight line that minimizes the distance from the line to all of the data points, representing the general trend.', isCorrect: true },
                { text: 'Always have a positive slope.', rationale: 'The slope can be positive, negative, or zero, depending on the trend in the data.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Life Science',
    id: 'sci_life_science_5',
    title: 'Ecosystems and Cell Biology',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the main function of a cell\'s nucleus?',
            answerOptions: [
                { text: 'To produce energy.', rationale: 'This is the function of the mitochondria.', isCorrect: false },
                { text: 'To control the cell\'s activities and store DNA.', rationale: 'Correct. The nucleus is often called the "brain" or "control center" of the cell.', isCorrect: true },
                { text: 'To package and transport proteins.', rationale: 'This is the function of the Golgi apparatus.', isCorrect: false },
                { text: 'To break down waste materials.', rationale: 'This is the function of lysosomes.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'An organism that eats both plants and animals is called a(n):',
            answerOptions: [
                { text: 'Herbivore', rationale: 'An herbivore eats only plants.', isCorrect: false },
                { text: 'Carnivore', rationale: 'A carnivore eats only other animals.', isCorrect: false },
                { text: 'Omnivore', rationale: 'Correct. Humans, bears, and raccoons are examples of omnivores.', isCorrect: true },
                { text: 'Producer', rationale: 'A producer makes its own food.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is an inherited trait?',
            answerOptions: [
                { text: 'A scar on your knee', rationale: 'This is an acquired characteristic resulting from an injury.', isCorrect: false },
                { text: 'Your natural eye color', rationale: 'Correct. Eye color is determined by genes passed down from your parents.', isCorrect: true },
                { text: 'The language you speak', rationale: 'This is a learned behavior.', isCorrect: false },
                { text: 'Your ability to ride a bicycle', rationale: 'This is a learned skill.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The process by which organisms better adapted to their environment tend to survive and produce more offspring is known as:',
            answerOptions: [
                { text: 'Artificial selection', rationale: 'Artificial selection is when humans select for desirable traits.', isCorrect: false },
                { text: 'Genetic drift', rationale: 'Genetic drift is the change in the frequency of an existing gene variant in a population due to random sampling of organisms.', isCorrect: false },
                { text: 'Natural selection', rationale: 'Correct. This is the main mechanism of evolution.', isCorrect: true },
                { text: 'Gene flow', rationale: 'Gene flow is the transfer of genetic variation from one population to another.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'In a forest ecosystem, grass is eaten by rabbits. The rabbits are eaten by foxes, and the foxes are eaten by owls. When any of these organisms die, they are broken down by fungi.',
            question: 'In this food web, what is the role of the fungi?',
            answerOptions: [
                { text: 'Producer', rationale: 'Producers, like grass, make their own food.', isCorrect: false },
                { text: 'Primary consumer', rationale: 'Primary consumers, like rabbits, eat producers.', isCorrect: false },
                { text: 'Secondary consumer', rationale: 'Secondary consumers, like foxes, eat primary consumers.', isCorrect: false },
                { text: 'Decomposer', rationale: 'Correct. Decomposers break down dead organic material and return nutrients to the ecosystem.', isCorrect: true }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'In a forest ecosystem, grass is eaten by rabbits. The rabbits are eaten by foxes, and the foxes are eaten by owls. When any of these organisms die, they are broken down by fungi.',
            question: 'If a disease were to suddenly wipe out the rabbit population, which organism would be most directly affected?',
            answerOptions: [
                { text: 'The grass', rationale: 'The grass population would likely increase due to the loss of a primary consumer.', isCorrect: false },
                { text: 'The foxes', rationale: 'Correct. The foxes rely on the rabbits as a primary food source. A loss of rabbits would directly impact their survival.', isCorrect: true },
                { text: 'The owls', rationale: 'While the owls might be indirectly affected if the fox population declines, the most direct impact is on the foxes.', isCorrect: false },
                { text: 'The fungi', rationale: 'The fungi decompose all organisms, so they would still have a source of dead organic matter.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the primary function of a plant\'s roots?',
            answerOptions: [
                { text: 'To perform photosynthesis.', rationale: 'Photosynthesis primarily occurs in the leaves.', isCorrect: false },
                { text: 'To anchor the plant and absorb water and nutrients from the soil.', rationale: 'Correct. Roots provide stability and are the primary site of water and nutrient uptake.', isCorrect: true },
                { text: 'To produce flowers for reproduction.', rationale: 'Flowers are typically produced on the stem.', isCorrect: false },
                { text: 'To transport water to the leaves.', rationale: 'While roots are part of the transport system, their primary function is absorption.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A chromosome is a structure found in the nucleus of a eukaryotic cell. What is a chromosome primarily made of?',
            answerOptions: [
                { text: 'Proteins and ATP', rationale: 'ATP is an energy molecule.', isCorrect: false },
                { text: 'DNA tightly coiled around proteins.', rationale: 'Correct. Chromosomes are highly organized structures of DNA and proteins (called histones).', isCorrect: true },
                { text: 'Lipids and carbohydrates', rationale: 'These are other types of organic molecules, but they do not make up chromosomes.', isCorrect: false },
                { text: 'RNA and ribosomes', rationale: 'Ribosomes are involved in protein synthesis, and RNA is a nucleic acid, but they do not form chromosomes.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which of the following is a key difference between plant and animal cells?',
            answerOptions: [
                { text: 'Animal cells have a nucleus, but plant cells do not.', rationale: 'Both plant and animal cells are eukaryotic and have a nucleus.', isCorrect: false },
                { text: 'Plant cells have a cell wall and chloroplasts, while animal cells do not.', rationale: 'Correct. The rigid cell wall provides support, and chloroplasts are the site of photosynthesis.', isCorrect: true },
                { text: 'Animal cells have mitochondria, but plant cells do not.', rationale: 'Both cell types have mitochondria to carry out cellular respiration.', isCorrect: false },
                { text: 'Plant cells have a cell membrane, but animal cells do not.', rationale: 'All cells have a cell membrane.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is the role of enzymes in biological systems?',
            answerOptions: [
                { text: 'They are a source of energy.', rationale: 'ATP is the main source of energy.', isCorrect: false },
                { text: 'They act as catalysts to speed up chemical reactions.', rationale: 'Correct. Enzymes are proteins that lower the activation energy of reactions, allowing them to happen much faster.', isCorrect: true },
                { text: 'They are the building blocks of proteins.', rationale: 'Amino acids are the building blocks of proteins (and enzymes are proteins).', isCorrect: false },
                { text: 'They store and transmit genetic information.', rationale: 'This is the role of DNA.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'In a DNA molecule, the base adenine (A) always pairs with:',
            answerOptions: [
                { text: 'Guanine (G)', rationale: 'Guanine (G) always pairs with Cytosine (C).', isCorrect: false },
                { text: 'Cytosine (C)', rationale: 'Cytosine (C) always pairs with Guanine (G).', isCorrect: false },
                { text: 'Thymine (T)', rationale: 'Correct. This is one of the fundamental base-pairing rules in DNA.', isCorrect: true },
                { text: 'Uracil (U)', rationale: 'Uracil (U) is found in RNA and pairs with adenine.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Which process is responsible for the exchange of gases (oxygen and carbon dioxide) between the blood and the body\'s tissues?',
            answerOptions: [
                { text: 'Osmosis', rationale: 'Osmosis is the movement of water across a membrane.', isCorrect: false },
                { text: 'Active transport', rationale: 'Active transport requires energy to move substances against a concentration gradient.', isCorrect: false },
                { text: 'Diffusion', rationale: 'Correct. Gases move from an area of higher concentration to an area of lower concentration, which is the process of diffusion.', isCorrect: true },
                { text: 'Photosynthesis', rationale: 'Photosynthesis is the process by which plants make food.', isCorrect: false }
            ]
        },
        {
            questionNumber: 13,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is a species?',
            answerOptions: [
                { text: 'A group of organisms that live in the same area.', rationale: 'This is a community or population.', isCorrect: false },
                { text: 'A group of organisms that can successfully interbreed and produce fertile offspring.', rationale: 'Correct. This is the biological species concept.', isCorrect: true },
                { text: 'All the organisms in an ecosystem that are at the same trophic level.', rationale: 'This describes a trophic level, not a species.', isCorrect: false },
                { text: 'A group of organisms that are genetically identical.', rationale: 'There is genetic variation within a species.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Physical Science',
    id: 'sci_physical_science_5',
    title: 'Forces, Motion, and Energy Applications',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of Newton\'s Laws of Motion is also known as the Law of Inertia?',
            answerOptions: [
                { text: 'First Law', rationale: 'Correct. The First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.', isCorrect: true },
                { text: 'Second Law', rationale: 'The Second Law relates force, mass, and acceleration (F=ma).', isCorrect: false },
                { text: 'Third Law', rationale: 'The Third Law states that for every action, there is an equal and opposite reaction.', isCorrect: false },
                { text: 'Law of Universal Gravitation', rationale: 'This law describes the force of gravity between two objects.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The transfer of heat through direct contact is called:',
            answerOptions: [
                { text: 'Convection', rationale: 'Convection is the transfer of heat through the movement of fluids.', isCorrect: false },
                { text: 'Radiation', rationale: 'Radiation is the transfer of heat through electromagnetic waves.', isCorrect: false },
                { text: 'Conduction', rationale: 'Correct. An example is the handle of a metal pot getting hot when the pot is on the stove.', isCorrect: true },
                { text: 'Insulation', rationale: 'Insulation is a material that reduces the rate of heat transfer.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the unit of electric current?',
            answerOptions: [
                { text: 'Volt', rationale: 'A volt is the unit of electric potential difference.', isCorrect: false },
                { text: 'Ohm', rationale: 'An ohm is the unit of electrical resistance.', isCorrect: false },
                { text: 'Watt', rationale: 'A watt is the unit of power.', isCorrect: false },
                { text: 'Ampere (Amp)', rationale: 'Correct. The ampere is the SI unit of electric current.', isCorrect: true }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A change in the state of matter from a gas to a liquid is called:',
            answerOptions: [
                { text: 'Melting', rationale: 'Melting is the change from solid to liquid.', isCorrect: false },
                { text: 'Freezing', rationale: 'Freezing is the change from liquid to solid.', isCorrect: false },
                { text: 'Condensation', rationale: 'Correct. An example is water droplets forming on the outside of a cold glass.', isCorrect: true },
                { text: 'Evaporation', rationale: 'Evaporation is the change from liquid to gas.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student is trying to determine the density of a small, irregularly shaped rock. First, she measures the mass of the rock using a balance and finds it to be 60 grams. Then, she takes a graduated cylinder containing 50 mL of water and carefully places the rock inside. The water level rises to 70 mL.',
            question: 'What is the volume of the rock?',
            answerOptions: [
                { text: '50 mL', rationale: 'This is the initial volume of the water.', isCorrect: false },
                { text: '70 mL', rationale: 'This is the final volume of the water and the rock together.', isCorrect: false },
                { text: '20 mL', rationale: 'Correct. The volume of the rock is the difference between the final and initial water levels (70 mL - 50 mL = 20 mL). This is the method of volume displacement.', isCorrect: true },
                { text: '60 mL', rationale: 'This is the mass of the rock in grams, not its volume.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A student is trying to determine the density of a small, irregularly shaped rock. First, she measures the mass of the rock using a balance and finds it to be 60 grams. Then, she takes a graduated cylinder containing 50 mL of water and carefully places the rock inside. The water level rises to 70 mL.',
            question: 'What is the density of the rock? (Density = Mass / Volume)',
            answerOptions: [
                { text: '3.0 g/mL', rationale: 'Correct. The density is the mass (60 g) divided by the volume (20 mL), which is 3.0 g/mL.', isCorrect: true },
                { text: '0.86 g/mL', rationale: 'This is calculated by dividing the mass by the final water level.', isCorrect: false },
                { text: '1.2 g/mL', rationale: 'This is calculated by dividing the mass by the initial water level.', isCorrect: false },
                { text: '0.33 g/mL', rationale: 'This is calculated by dividing the volume by the mass.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'If you push a large box with a force of 200 N and it does not move, what is the force of static friction?',
            answerOptions: [
                { text: '0 N', rationale: 'If the friction were 0 N, the box would accelerate.', isCorrect: false },
                { text: 'Less than 200 N', rationale: 'If the friction were less than the applied force, the box would move.', isCorrect: false },
                { text: 'Exactly 200 N', rationale: 'Correct. Static friction is a responsive force. It matches the applied force exactly, up to its maximum limit, to keep the object from moving.', isCorrect: true },
                { text: 'Greater than 200 N', rationale: 'Static friction cannot be greater than the applied force.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which of the following is an example of an object with potential energy?',
            answerOptions: [
                { text: 'A car driving down the highway.', rationale: 'A moving car has kinetic energy.', isCorrect: false },
                { text: 'A boulder resting at the top of a hill.', rationale: 'Correct. It has gravitational potential energy due to its position.', isCorrect: true },
                { text: 'A baseball flying through the air.', rationale: 'A flying baseball has both kinetic and potential energy, but the key is that it is in motion.', isCorrect: false },
                { text: 'A fan that is turned on and spinning.', rationale: 'A spinning fan has kinetic energy.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The pitch of a sound is determined by its:',
            answerOptions: [
                { text: 'Amplitude', rationale: 'Amplitude determines the loudness or volume of a sound.', isCorrect: false },
                { text: 'Frequency', rationale: 'Correct. High-frequency sound waves have a high pitch, and low-frequency waves have a low pitch.', isCorrect: true },
                { text: 'Wavelength', rationale: 'Wavelength is related to frequency, but frequency is the direct determinant of pitch.', isCorrect: false },
                { text: 'Speed', rationale: 'The speed of sound depends on the medium it travels through.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A ball is thrown straight up into the air. At the very top of its path, its velocity is momentarily zero. What is its acceleration at that point?',
            answerOptions: [
                { text: '0 m/s²', rationale: 'Although the velocity is zero, the acceleration is not. Velocity is changing (from going up to going down), so there must be acceleration.', isCorrect: false },
                { text: 'Approximately 9.8 m/s² upward.', rationale: 'The acceleration due to gravity is always directed downward.', isCorrect: false },
                { text: 'Approximately 9.8 m/s² downward.', rationale: 'Correct. The force of gravity is constantly acting on the ball, causing a constant downward acceleration, even when its instantaneous velocity is zero.', isCorrect: true },
                { text: 'It depends on the mass of the ball.', rationale: 'The acceleration due to gravity is the same for all objects near the Earth\'s surface, regardless of their mass.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Why does a white t-shirt feel cooler than a black t-shirt on a sunny day?',
            answerOptions: [
                { text: 'White absorbs more wavelengths of light than black.', rationale: 'Black absorbs more wavelengths of light.', isCorrect: false },
                { text: 'White reflects more wavelengths of light than black.', rationale: 'Correct. Black objects absorb most of the light that hits them, converting it into heat. White objects reflect most of the light, absorbing less energy and staying cooler.', isCorrect: true },
                { text: 'Black is a better insulator than white.', rationale: 'The color\'s properties of absorption and reflection are more significant for temperature than its insulating properties in this context.', isCorrect: false },
                { text: 'White allows more air to pass through the fabric.', rationale: 'This is not a general property of the color white.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is nuclear fission?',
            answerOptions: [
                { text: 'The process of combining two light atomic nuclei to form a heavier nucleus, releasing energy.', rationale: 'This is nuclear fusion, which powers the sun.', isCorrect: false },
                { text: 'The process of splitting a heavy, unstable atomic nucleus into two or more lighter nuclei, releasing energy.', rationale: 'Correct. This is the principle behind nuclear power plants and atomic bombs.', isCorrect: true },
                { text: 'The spontaneous decay of an atomic nucleus resulting in the emission of radiation.', rationale: 'This is radioactive decay.', isCorrect: false },
                { text: 'The sharing of electrons between two atoms.', rationale: 'This is a covalent bond.', isCorrect: false }
            ]
        },
        {
            questionNumber: 13,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'An object is in equilibrium when:',
            answerOptions: [
                { text: 'It is moving at a constant acceleration.', rationale: 'Constant acceleration means there is a net force acting on the object.', isCorrect: false },
                { text: 'The net force acting on it is zero.', rationale: 'Correct. This means the object is either at rest or moving at a constant velocity (constant speed in a straight line).', isCorrect: true },
                { text: 'It has no forces acting on it.', rationale: 'It is possible for multiple forces to be acting on an object, but if they are balanced, the net force is zero.', isCorrect: false },
                { text: 'Its kinetic energy equals its potential energy.', rationale: 'This can be true at a specific point for a moving object, but it is not the definition of equilibrium.', isCorrect: false }
            ]
        },
        {
            questionNumber: 14,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Work is calculated as Force × Distance. If you lift a 10 N box a distance of 2 meters, how much work have you done?',
            answerOptions: [
                { text: '5 Joules', rationale: 'This is calculated by dividing force by distance.', isCorrect: false },
                { text: '12 Joules', rationale: 'This is the sum of the force and distance.', isCorrect: false },
                { text: '20 Joules', rationale: 'Correct. Work = 10 N × 2 m = 20 J.', isCorrect: true },
                { text: '0 Joules', rationale: 'Work is done because a force caused the object to move a distance.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Earth & Space Science',
    id: 'sci_earth_space_5',
    title: 'Astronomy and Earth\'s Cycles',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the name of the galaxy that contains our Solar System?',
            answerOptions: [
                { text: 'Andromeda', rationale: 'Andromeda is the closest major galaxy to our own, but not the one we are in.', isCorrect: false },
                { text: 'The Milky Way', rationale: 'Correct. Our solar system is located in a spiral arm of the Milky Way galaxy.', isCorrect: true },
                { text: 'Orion Nebula', rationale: 'The Orion Nebula is a star-forming region within our galaxy, not the galaxy itself.', isCorrect: false },
                { text: 'Proxima Centauri', rationale: 'Proxima Centauri is the closest star to our sun.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The spinning of the Earth on its axis is called:',
            answerOptions: [
                { text: 'Rotation', rationale: 'Correct. Earth\'s rotation is what causes day and night.', isCorrect: true },
                { text: 'Revolution', rationale: 'Revolution is the movement of the Earth in its orbit around the Sun.', isCorrect: false },
                { text: 'Tilt', rationale: 'Tilt refers to the angle of the Earth\'s axis.', isCorrect: false },
                { text: 'Orbit', rationale: 'Orbit is the path the Earth takes around the Sun.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A natural satellite that orbits a planet is called a:',
            answerOptions: [
                { text: 'Star', rationale: 'A star is a celestial body that produces its own light.', isCorrect: false },
                { text: 'Planet', rationale: 'A planet orbits a star.', isCorrect: false },
                { text: 'Moon', rationale: 'Correct. Earth has one moon, while other planets like Jupiter have many.', isCorrect: true },
                { text: 'Comet', rationale: 'A comet is an icy body that orbits the Sun.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The continuous movement of water on, above, and below the surface of the Earth is called:',
            answerOptions: [
                { text: 'The rock cycle', rationale: 'The rock cycle describes the transformation of rocks.', isCorrect: false },
                { text: 'The water cycle', rationale: 'Correct. It includes processes like evaporation, condensation, and precipitation.', isCorrect: true },
                { text: 'The carbon cycle', rationale: 'The carbon cycle describes the movement of carbon through the Earth\'s systems.', isCorrect: false },
                { text: 'Plate tectonics', rationale: 'Plate tectonics describes the movement of the Earth\'s crust.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'The Earth is tilted on its axis at an angle of approximately 23.5 degrees. This tilt remains constant as the Earth revolves around the Sun. When the Northern Hemisphere is tilted towards the Sun, it receives more direct sunlight and experiences summer. When it is tilted away from the Sun, it receives less direct sunlight and experiences winter.',
            question: 'What season is it in the Southern Hemisphere when the Northern Hemisphere is tilted towards the Sun?',
            answerOptions: [
                { text: 'Summer', rationale: 'When the Northern Hemisphere is tilted towards the Sun, the Southern Hemisphere is tilted away.', isCorrect: false },
                { text: 'Winter', rationale: 'Correct. The seasons are opposite in the Northern and Southern Hemispheres due to the Earth\'s tilt.', isCorrect: true },
                { text: 'Spring', rationale: 'This is a transitional season.', isCorrect: false },
                { text: 'Autumn', rationale: 'This is a transitional season.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'The Earth is tilted on its axis at an angle of approximately 23.5 degrees. This tilt remains constant as the Earth revolves around the Sun. When the Northern Hemisphere is tilted towards the Sun, it receives more direct sunlight and experiences summer. When it is tilted away from the Sun, it receives less direct sunlight and experiences winter.',
            question: 'If the Earth\'s axis were not tilted, what would be the most significant effect on the seasons?',
            answerOptions: [
                { text: 'The seasons would be much more extreme.', rationale: 'The tilt is what causes the seasons; no tilt would mean less extreme variation.', isCorrect: false },
                { text: 'The length of a year would be shorter.', rationale: 'The length of a year is determined by the Earth\'s revolution around the Sun, not its tilt.', isCorrect: false },
                { text: 'There would be no significant seasonal changes.', rationale: 'Correct. Without the tilt, the amount of direct sunlight a particular location receives would be nearly the same all year round, leading to a lack of distinct seasons.', isCorrect: true },
                { text: 'The Earth would have two summers and two winters each year.', rationale: 'This does not logically follow from a lack of tilt.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the main cause of the tides in Earth\'s oceans?',
            answerOptions: [
                { text: 'The gravitational pull of the Sun and Moon.', rationale: 'Correct. The Moon has a stronger effect because it is much closer to Earth, but the Sun also plays a role.', isCorrect: true },
                { text: 'The rotation of the Earth.', rationale: 'The Earth\'s rotation influences the timing and pattern of tides, but gravity is the fundamental cause.', isCorrect: false },
                { text: 'Wind blowing across the ocean surface.', rationale: 'Wind causes waves, not tides.', isCorrect: false },
                { text: 'Underwater earthquakes.', rationale: 'Underwater earthquakes can cause tsunamis, which are different from regular tides.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'A geologist finds a rock with clear layers of sand, silt, and pebbles. This rock is most likely:',
            answerOptions: [
                { text: 'Igneous', rationale: 'Igneous rocks are formed from cooled magma and typically have a crystalline structure.', isCorrect: false },
                { text: 'Metamorphic', rationale: 'Metamorphic rocks are formed by heat and pressure, often showing banding or distortion, but not typically distinct layers of different sediments.', isCorrect: false },
                { text: 'Sedimentary', rationale: 'Correct. The presence of layers of different sediments is a key characteristic of sedimentary rocks.', isCorrect: true },
                { text: 'A meteorite', rationale: 'A meteorite is a rock from outer space and would not be formed in this way.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is a nebula?',
            answerOptions: [
                { text: 'A large, hot star that is about to explode.', rationale: 'This describes a supernova.', isCorrect: false },
                { text: 'A large cloud of gas and dust in space, often where new stars are formed.', rationale: 'Correct. Nebulae are the "nurseries" of stars.', isCorrect: true },
                { text: 'A collection of billions of stars, gas, and dust held together by gravity.', rationale: 'This is a galaxy.', isCorrect: false },
                { text: 'The remnant of a star after it has exhausted its nuclear fuel.', rationale: 'This could be a white dwarf, neutron star, or black hole.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A solar eclipse occurs when:',
            answerOptions: [
                { text: 'The Earth passes between the Sun and the Moon.', rationale: 'This describes a lunar eclipse.', isCorrect: false },
                { text: 'The Moon passes between the Sun and the Earth.', rationale: 'Correct. The Moon blocks the Sun\'s light, casting a shadow on a part of the Earth.', isCorrect: true },
                { text: 'The Sun passes between the Earth and the Moon.', rationale: 'This is a physically impossible alignment.', isCorrect: false },
                { text: 'A planet passes between the Sun and the Earth.', rationale: 'This is called a transit, not an eclipse.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The movement of the Earth\'s tectonic plates is driven by:',
            answerOptions: [
                { text: 'Convection currents in the mantle.', rationale: 'Correct. The slow circulation of hot rock in the mantle pushes and pulls the plates above.', isCorrect: true },
                { text: 'Erosion on the surface of the continents.', rationale: 'Erosion is a surface process and does not drive plate tectonics.', isCorrect: false },
                { text: 'The Earth\'s magnetic field.', rationale: 'The magnetic field is a result of processes in the core, but it does not drive the plates.', isCorrect: false },
                { text: 'The gravitational force from the Sun.', rationale: 'The Sun\'s gravity keeps the Earth in orbit but does not move its crustal plates.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Why do we always see the same side of the Moon from Earth?',
            answerOptions: [
                { text: 'Because the Moon does not rotate.', rationale: 'The Moon does rotate on its axis.', isCorrect: false },
                { text: 'Because the Moon\'s rotational period is the same as its orbital period around Earth.', rationale: 'Correct. This phenomenon is called synchronous rotation or tidal locking.', isCorrect: true },
                { text: 'Because the other side of the Moon does not reflect sunlight.', rationale: 'The "dark side" of the Moon does receive sunlight; we just don\'t see it from Earth.', isCorrect: false },
                { text: 'Because the Earth\'s gravity has pulled one side of the Moon to permanently face us.', rationale: 'While gravity is the cause of the tidal locking, this statement is an oversimplification. The key is the synchronization of rotation and orbit.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Scientific Practices / Data Reasoning',
    id: 'sci_data_reasoning_5',
    title: 'Scientific Method and Conclusions',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is the most important for laboratory safety?',
            answerOptions: [
                { text: 'Memorizing the periodic table.', rationale: 'While useful for chemistry, this is not a general safety rule.', isCorrect: false },
                { text: 'Following all instructions and wearing appropriate personal protective equipment (PPE).', rationale: 'Correct. Safety is the top priority, and this includes following procedures and using gear like goggles and gloves.', isCorrect: true },
                { text: 'Working as quickly as possible.', rationale: 'Rushing can lead to accidents and mistakes.', isCorrect: false },
                { text: 'Changing the steps of the experiment to see what happens.', rationale: 'Unauthorized changes to a procedure can be dangerous and invalidate the results.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A scientist uses a graph to present their data. What is the primary purpose of a graph in a scientific report?',
            answerOptions: [
                { text: 'To make the report look more colorful and interesting.', rationale: 'While graphs can be visually appealing, their main purpose is to present data clearly.', isCorrect: false },
                { text: 'To show a visual representation of the relationship between the variables.', rationale: 'Correct. Graphs make it easier to see trends, patterns, and relationships in the data.', isCorrect: true },
                { text: 'To hide the results of the experiment.', rationale: 'The purpose of a graph is to clarify the results, not to hide them.', isCorrect: false },
                { text: 'To prove that the hypothesis is correct.', rationale: 'A graph presents the data, which can either support or refute a hypothesis, but it does not "prove" it.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is a constant in a scientific experiment?',
            answerOptions: [
                { text: 'The variable that is measured.', rationale: 'This is the dependent variable.', isCorrect: false },
                { text: 'The variable that is changed by the scientist.', rationale: 'This is the independent variable.', isCorrect: false },
                { text: 'A factor that is kept the same for all groups in the experiment.', rationale: 'Correct. Constants are controlled to ensure that only the independent variable is affecting the outcome.', isCorrect: true },
                { text: 'The final conclusion of the experiment.', rationale: 'A conclusion is an interpretation, not a constant.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'An educated guess that can be tested through an experiment is known as a(n):',
            answerOptions: [
                { text: 'Observation', rationale: 'An observation is the act of gathering information.', isCorrect: false },
                { text: 'Hypothesis', rationale: 'Correct. This is the definition of a scientific hypothesis.', isCorrect: true },
                { text: 'Theory', rationale: 'A theory is a well-supported explanation, not just an initial guess.', isCorrect: false },
                { text: 'Law', rationale: 'A law describes a natural phenomenon, but does not explain why it happens.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'An experiment was conducted to determine the boiling point of salt water. Four beakers, each containing 500 mL of water, were prepared. Beaker 1 had 0 g of salt, Beaker 2 had 10 g, Beaker 3 had 20 g, and Beaker 4 had 30 g. The beakers were heated, and the temperature at which the water boiled was recorded. The results were: Beaker 1 (0g salt): 100°C, Beaker 2 (10g salt): 101°C, Beaker 3 (20g salt): 102°C, Beaker 4 (30g salt): 103°C.',
            question: 'What is the independent variable in this experiment?',
            answerOptions: [
                { text: 'The volume of water.', rationale: 'The volume of water was kept constant at 500 mL.', isCorrect: false },
                { text: 'The boiling point of the water.', rationale: 'The boiling point is what was measured, making it the dependent variable.', isCorrect: false },
                { text: 'The amount of salt dissolved in the water.', rationale: 'Correct. This is the factor that the experimenter deliberately changed.', isCorrect: true },
                { text: 'The type of beaker used.', rationale: 'It is assumed that the same type of beaker was used for all trials, making it a constant.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'An experiment was conducted to determine the boiling point of salt water. Four beakers, each containing 500 mL of water, were prepared. Beaker 1 had 0 g of salt, Beaker 2 had 10 g, Beaker 3 had 20 g, and Beaker 4 had 30 g. The beakers were heated, and the temperature at which the water boiled was recorded. The results were: Beaker 1 (0g salt): 100°C, Beaker 2 (10g salt): 101°C, Beaker 3 (20g salt): 102°C, Beaker 4 (30g salt): 103°C.',
            question: 'What is a valid conclusion based on the results of this experiment?',
            answerOptions: [
                { text: 'Adding salt to water does not affect its boiling point.', rationale: 'The results clearly show that the boiling point increased as salt was added.', isCorrect: false },
                { text: 'The more salt is added to water, the higher the boiling point.', rationale: 'Correct. The data shows a direct, positive relationship between the amount of salt and the boiling point.', isCorrect: true },
                { text: 'The more salt is added to water, the lower the boiling point.', rationale: 'The results show the opposite trend.', isCorrect: false },
                { text: 'Water boils at 100°C regardless of any dissolved substances.', rationale: 'Beaker 1 (pure water) boiled at 100°C, but the others did not.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which of the following is a key component of a good scientific argument?',
            answerOptions: [
                { text: 'Making a claim based on personal opinion.', rationale: 'Scientific arguments must be based on evidence, not opinion.', isCorrect: false },
                { text: 'Ignoring data that contradicts the claim.', rationale: 'A good scientific argument must account for all relevant data.', isCorrect: false },
                { text: 'Using evidence and logical reasoning to support a claim.', rationale: 'Correct. A scientific argument connects a claim to evidence using sound reasoning.', isCorrect: true },
                { text: 'Attacking the character of scientists who disagree with the claim.', rationale: 'This is an ad hominem fallacy and is not a part of a scientific argument.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the purpose of using a control in an experiment?',
            answerOptions: [
                { text: 'To have a standard of comparison to see if the independent variable has an effect.', rationale: 'Correct. The control group provides a baseline against which the experimental group can be compared.', isCorrect: true },
                { text: 'To make sure the experiment gives the results the scientist wants.', rationale: 'The purpose is to test a hypothesis objectively, not to force a desired result.', isCorrect: false },
                { text: 'To complicate the experiment.', rationale: 'A control simplifies interpretation of the results.', isCorrect: false },
                { text: 'To prove the hypothesis is correct.', rationale: 'A control helps to fairly test the hypothesis, which may be supported or refuted.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'An explanation for a natural phenomenon that is supported by a vast body of evidence is called a:',
            answerOptions: [
                { text: 'Hypothesis', rationale: 'A hypothesis is a testable prediction, but it is not as well-supported as a theory.', isCorrect: false },
                { text: 'Theory', rationale: 'Correct. Scientific theories are broad explanations that have been repeatedly tested and confirmed.', isCorrect: true },
                { text: 'Guess', rationale: 'A guess is an opinion without evidence.', isCorrect: false },
                { text: 'Law', rationale: 'A law describes what happens, but a theory explains why it happens.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Why is it important for a scientist to keep detailed and accurate records of their experiments?',
            answerOptions: [
                { text: 'So they can remember what they had for lunch on the day of the experiment.', rationale: 'Personal details are not relevant to the scientific record.', isCorrect: false },
                { text: 'To allow other scientists to replicate the experiment and verify the results.', rationale: 'Correct. Detailed records are essential for the verifiability and transparency of science.', isCorrect: true },
                { text: 'To make the experiment seem more complicated and impressive.', rationale: 'The goal is clarity and accuracy, not to impress.', isCorrect: false },
                { text: 'To keep their discoveries secret from other scientists.', rationale: 'The goal of scientific record-keeping is to share information, not to keep it secret.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'Which of the following is an example of an inference?',
            answerOptions: [
                { text: 'The leaf is 5 cm long.', rationale: 'This is a direct, quantitative observation.', isCorrect: false },
                { text: 'The liquid in the beaker is clear and colorless.', rationale: 'This is a direct, qualitative observation.', isCorrect: false },
                { text: 'The fossilized bones are from a dinosaur that was a herbivore, based on the shape of its teeth.', rationale: 'Correct. This is a conclusion based on evidence (the shape of the teeth) and prior knowledge. It is an interpretation, not a direct observation.', isCorrect: true },
                { text: 'The beaker contains 100 mL of water.', rationale: 'This is a direct, quantitative observation.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'A scientist develops a new hypothesis. What is the next logical step in the scientific method?',
            answerOptions: [
                { text: 'Immediately declare the hypothesis as a new theory.', rationale: 'A hypothesis must be tested and supported by evidence before it can be considered for theory status.', isCorrect: false },
                { text: 'Design and conduct an experiment to test the hypothesis.', rationale: 'Correct. The next step is to gather data that will either support or refute the hypothesis.', isCorrect: true },
                { text: 'Change the data from previous experiments to fit the new hypothesis.', rationale: 'This is scientific fraud and is unethical.', isCorrect: false },
                { text: 'Ignore the hypothesis if it disagrees with their personal beliefs.', rationale: 'Scientific inquiry should be objective and not influenced by personal beliefs.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Life Science',
    id: 'sci_life_science_6',
    title: 'Ecology and Human Impact',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'All the living and nonliving things in a particular area make up a(n):',
            answerOptions: [
                { text: 'Population', rationale: 'A population is a group of individuals of the same species.', isCorrect: false },
                { text: 'Community', rationale: 'A community is all the living organisms in an area.', isCorrect: false },
                { text: 'Ecosystem', rationale: 'Correct. An ecosystem includes the biotic (living) and abiotic (nonliving) components.', isCorrect: true },
                { text: 'Biosphere', rationale: 'The biosphere is the part of Earth where life exists.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'An organism that must consume other organisms for energy is called a(n):',
            answerOptions: [
                { text: 'Producer', rationale: 'A producer (like a plant) makes its own food.', isCorrect: false },
                { text: 'Autotroph', rationale: 'An autotroph is another name for a producer.', isCorrect: false },
                { text: 'Consumer (or Heterotroph)', rationale: 'Correct. Consumers obtain energy by feeding on other organisms.', isCorrect: true },
                { text: 'Decomposer', rationale: 'A decomposer breaks down dead organic matter.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Which of the following is an example of a human activity that can have a negative impact on the environment?',
            answerOptions: [
                { text: 'Reforestation', rationale: 'Reforestation (planting trees) is generally beneficial for the environment.', isCorrect: false },
                { text: 'Using renewable energy sources', rationale: 'Using sources like solar and wind power helps reduce pollution.', isCorrect: false },
                { text: 'Pollution from factories', rationale: 'Correct. Industrial pollution can contaminate air, water, and soil.', isCorrect: true },
                { text: 'Creating wildlife preserves', rationale: 'Wildlife preserves help to protect ecosystems and biodiversity.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'A relationship between two species in which one species benefits and the other is harmed is called:',
            answerOptions: [
                { text: 'Mutualism', rationale: 'In mutualism, both species benefit.', isCorrect: false },
                { text: 'Commensalism', rationale: 'In commensalism, one species benefits and the other is unaffected.', isCorrect: false },
                { text: 'Parasitism', rationale: 'Correct. An example is a tick feeding on a dog.', isCorrect: true },
                { text: 'Competition', rationale: 'Competition is when two or more organisms vie for the same limited resources.', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A certain pesticide is used on crops to kill insects. This pesticide is not biodegradable and accumulates in the tissues of organisms. The pesticide is present in the water, which is absorbed by algae. Small fish eat the algae, larger fish eat the small fish, and a bird of prey eats the larger fish.',
            question: 'In which organism would the concentration of the pesticide be the highest?',
            answerOptions: [
                { text: 'The algae', rationale: 'The algae absorb the pesticide from the water, but the concentration will be lowest at this level.', isCorrect: false },
                { text: 'The small fish', rationale: 'The small fish will accumulate the pesticide from all the algae they eat.', isCorrect: false },
                { text: 'The larger fish', rationale: 'The larger fish will accumulate the pesticide from all the small fish they eat.', isCorrect: false },
                { text: 'The bird of prey', rationale: 'Correct. The concentration of the toxin increases at each successive trophic level. This process is called biomagnification.', isCorrect: true }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A certain pesticide is used on crops to kill insects. This pesticide is not biodegradable and accumulates in the tissues of organisms. The pesticide is present in the water, which is absorbed by algae. Small fish eat the algae, larger fish eat the small fish, and a bird of prey eats the larger fish.',
            question: 'The process described in the passage, where the concentration of a toxin increases at higher trophic levels in a food web, is called:',
            answerOptions: [
                { text: 'Eutrophication', rationale: 'Eutrophication is the enrichment of a body of water with nutrients.', isCorrect: false },
                { text: 'Biomagnification', rationale: 'Correct. This is the specific term for the increasing concentration of a substance in organisms at successively higher levels in a food chain.', isCorrect: true },
                { text: 'Natural selection', rationale: 'Natural selection is the process by which organisms better adapted to their environment tend to survive and reproduce.', isCorrect: false },
                { text: 'Succession', rationale: 'Ecological succession is the process of change in the species structure of an ecological community over time.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the main role of decomposers (like bacteria and fungi) in an ecosystem?',
            answerOptions: [
                { text: 'To produce food from sunlight.', rationale: 'This is the role of producers.', isCorrect: false },
                { text: 'To recycle nutrients by breaking down dead organic matter.', rationale: 'Correct. Decomposers are essential for returning nutrients to the soil, where they can be used by producers.', isCorrect: true },
                { text: 'To control the population of herbivores.', rationale: 'This is a role of carnivores (predators).', isCorrect: false },
                { text: 'To form the base of the food web.', rationale: 'Producers form the base of the food web.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The variety of life within a particular habitat or ecosystem is known as:',
            answerOptions: [
                { text: 'Biodiversity', rationale: 'Correct. High biodiversity is often an indicator of a healthy ecosystem.', isCorrect: true },
                { text: 'Carrying capacity', rationale: 'Carrying capacity is the maximum population size an environment can sustain.', isCorrect: false },
                { text: 'A niche', rationale: 'A niche is the role an organism plays in its ecosystem.', isCorrect: false },
                { text: 'A population', rationale: 'A population is a group of individuals of the same species.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Acid rain is primarily caused by which of the following pollutants?',
            answerOptions: [
                { text: 'Carbon dioxide and methane', rationale: 'These are the primary greenhouse gases responsible for climate change.', isCorrect: false },
                { text: 'Sulfur dioxide and nitrogen oxides', rationale: 'Correct. These pollutants, primarily from the burning of fossil fuels, react with water in the atmosphere to form sulfuric and nitric acids.', isCorrect: true },
                { text: 'Ozone and chlorofluorocarbons (CFCs)', rationale: 'CFCs are responsible for the depletion of the ozone layer.', isCorrect: false },
                { text: 'Pesticides and herbicides', rationale: 'These can cause water and soil pollution but do not cause acid rain.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What is the concept of carrying capacity in an ecosystem?',
            answerOptions: [
                { text: 'The maximum rate at which a population can grow.', rationale: 'This is related to biotic potential, not carrying capacity.', isCorrect: false },
                { text: 'The total amount of energy that is transferred from one trophic level to the next.', rationale: 'This relates to the 10% rule.', isCorrect: false },
                { text: 'The maximum population size of a species that the environment can sustain indefinitely.', rationale: 'Correct. Carrying capacity is determined by the availability of resources like food, water, and space.', isCorrect: true },
                { text: 'The role that an organism plays in its environment.', rationale: 'This is a niche.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'An invasive species is a species that is not native to an ecosystem and whose introduction causes or is likely to cause economic or environmental harm. Why are invasive species often so successful?',
            answerOptions: [
                { text: 'Because they are usually better adapted to the new environment than the native species.', rationale: 'This is a possible reason, but the most common reason is the lack of natural controls.', isCorrect: false },
                { text: 'Because they often lack natural predators, competitors, and diseases in the new environment.', rationale: 'Correct. This allows their populations to grow unchecked and outcompete native species.', isCorrect: true },
                { text: 'Because they reproduce more slowly than native species.', rationale: 'They often reproduce much more quickly.', isCorrect: false },
                { text: 'Because they help to increase the biodiversity of the ecosystem.', rationale: 'They typically decrease biodiversity.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'How does the greenhouse effect contribute to climate change?',
            answerOptions: [
                { text: 'It allows more harmful UV radiation to reach the Earth\'s surface.', rationale: 'This is a result of ozone layer depletion.', isCorrect: false },
                { text: 'It creates acid rain, which harms forests and lakes.', rationale: 'Acid rain is caused by sulfur and nitrogen oxides.', isCorrect: false },
                { text: 'An increase in greenhouse gases (like CO2) traps more heat in the atmosphere, leading to a rise in global temperatures.', rationale: 'Correct. While the greenhouse effect is a natural process, human activities have enhanced it, leading to global warming.', isCorrect: true },
                { text: 'It causes the Earth\'s tectonic plates to move more rapidly.', rationale: 'The greenhouse effect is related to the atmosphere, not plate tectonics.', isCorrect: false }
            ]
        }
    ]
},
{
    subject: 'Science',
    topic: 'Physical Science',
    id: 'sci_physical_science_6',
    title: 'Thermodynamics and Modern Physics',
    questions: [
        {
            questionNumber: 1,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'Temperature is a measure of the average _____ of the particles in a substance.',
            answerOptions: [
                { text: 'Kinetic energy', rationale: 'Correct. Temperature is directly related to the average kinetic energy (motion) of atoms or molecules.', isCorrect: true },
                { text: 'Potential energy', rationale: 'Potential energy is stored energy, not directly measured by temperature.', isCorrect: false },
                { text: 'Mass', rationale: 'Mass is the amount of matter in an object.', isCorrect: false },
                { text: 'Volume', rationale: 'Volume is the amount of space an object occupies.', isCorrect: false }
            ]
        },
        {
            questionNumber: 2,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'The transfer of energy as electromagnetic waves is called:',
            answerOptions: [
                { text: 'Conduction', rationale: 'Conduction is heat transfer through direct contact.', isCorrect: false },
                { text: 'Convection', rationale: 'Convection is heat transfer through the movement of fluids.', isCorrect: false },
                { text: 'Radiation', rationale: 'Correct. This is how the sun heats the Earth.', isCorrect: true },
                { text: 'Insulation', rationale: 'Insulation is a material that resists heat transfer.', isCorrect: false }
            ]
        },
        {
            questionNumber: 3,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'What is the law of conservation of energy?',
            answerOptions: [
                { text: 'Energy can be created from nothing.', rationale: 'The law states that energy cannot be created.', isCorrect: false },
                { text: 'Energy cannot be created or destroyed, only transformed from one form to another.', rationale: 'Correct. This is the First Law of Thermodynamics.', isCorrect: true },
                { text: 'The total energy in the universe is always decreasing.', rationale: 'The law states that the total energy remains constant.', isCorrect: false },
                { text: 'Energy is lost as heat in every transformation.', rationale: 'While some energy is often lost as heat (Second Law), the First Law states that the total energy is conserved.', isCorrect: false }
            ]
        },
        {
            questionNumber: 4,
            type: 'multipleChoice',
            difficulty: 'easy',
            question: 'An object\'s resistance to a change in its state of motion is called:',
            answerOptions: [
                { text: 'Force', rationale: 'A force is a push or a pull that can cause a change in motion.', isCorrect: false },
                { text: 'Acceleration', rationale: 'Acceleration is the rate of change of velocity.', isCorrect: false },
                { text: 'Inertia', rationale: 'Correct. Inertia is a property of mass.', isCorrect: true },
                { text: 'Momentum', rationale: 'Momentum is mass in motion (mass × velocity).', isCorrect: false }
            ]
        },
        {
            questionNumber: 5,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A person is holding a metal rod in a campfire. After a few moments, the end of the rod they are holding becomes hot. In a separate situation, the person warms their hands by holding them near, but not touching, the fire.',
            question: 'How is heat transferred to the person\'s hand through the metal rod?',
            answerOptions: [
                { text: 'Through radiation', rationale: 'Radiation does not require a medium.', isCorrect: false },
                { text: 'Through convection', rationale: 'Convection involves the movement of fluids, not a solid rod.', isCorrect: false },
                { text: 'Through conduction', rationale: 'Correct. Conduction is the transfer of heat through a substance by direct contact of particles.', isCorrect: true },
                { text: 'Through insulation', rationale: 'Insulation would prevent heat transfer.', isCorrect: false }
            ]
        },
        {
            questionNumber: 6,
            type: 'multipleChoice',
            difficulty: 'medium',
            passage: 'A person is holding a metal rod in a campfire. After a few moments, the end of the rod they are holding becomes hot. In a separate situation, the person warms their hands by holding them near, but not touching, the fire.',
            question: 'How is heat transferred to the person\'s hands when they hold them near the fire?',
            answerOptions: [
                { text: 'Through conduction', rationale: 'Conduction requires direct contact.', isCorrect: false },
                { text: 'Through radiation', rationale: 'Correct. The fire emits infrared radiation, which travels through the air and warms the person\'s hands.', isCorrect: true },
                { text: 'Through convection', rationale: 'While some heat is transferred by convection as the hot air rises, the primary method of heat transfer from a fire to a nearby object is radiation.', isCorrect: false },
                { text: 'Through reflection', rationale: 'Reflection is the bouncing of waves, not the primary method of heat transfer here.', isCorrect: false }
            ]
        },
        {
            questionNumber: 7,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'The Second Law of Thermodynamics states that the entropy (disorder) of an isolated system always:',
            answerOptions: [
                { text: 'Decreases', rationale: 'The law states that entropy tends to increase.', isCorrect: false },
                { text: 'Increases or stays the same', rationale: 'Correct. This law explains why heat flows from hot to cold objects and why some processes are irreversible.', isCorrect: true },
                { text: 'Remains constant', rationale: 'Entropy can increase.', isCorrect: false },
                { text: 'Cycles between high and low', rationale: 'There is no cyclical pattern described by the law.', isCorrect: false }
            ]
        },
        {
            questionNumber: 8,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'What is the theory of special relativity, as proposed by Albert Einstein, based on?',
            answerOptions: [
                { text: 'The idea that gravity is a curvature of spacetime.', rationale: 'This is the basis of the theory of general relativity.', isCorrect: false },
                { text: 'The principle that the laws of physics are the same for all observers in uniform motion and that the speed of light in a vacuum is the same for all observers.', rationale: 'Correct. These two postulates are the foundation of special relativity.', isCorrect: true },
                { text: 'The law of universal gravitation.', rationale: 'Newton proposed this law.', isCorrect: false },
                { text: 'The laws of thermodynamics.', rationale: 'These laws govern heat and energy.', isCorrect: false }
            ]
        },
        {
            questionNumber: 9,
            type: 'multipleChoice',
            difficulty: 'medium',
            question: 'Which of the following is an example of nuclear fusion?',
            answerOptions: [
                { text: 'The splitting of a uranium atom in a nuclear power plant.', rationale: 'This is nuclear fission.', isCorrect: false },
                { text: 'The combining of hydrogen atoms to form helium in the Sun\'s core.', rationale: 'Correct. This process releases a tremendous amount of energy.', isCorrect: true },
                { text: 'The burning of wood in a fire.', rationale: 'This is a chemical reaction (combustion).', isCorrect: false },
                { text: 'The decay of a radioactive isotope.', rationale: 'This is radioactive decay.', isCorrect: false }
            ]
        },
        {
            questionNumber: 10,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'What does Einstein\'s famous equation, E=mc², represent?',
            answerOptions: [
                { text: 'The relationship between force, mass, and acceleration.', rationale: 'This is Newton\'s Second Law, F=ma.', isCorrect: false },
                { text: 'The equivalence of mass and energy.', rationale: 'Correct. The equation shows that mass can be converted into a very large amount of energy, and vice versa.', isCorrect: true },
                { text: 'The law of conservation of energy.', rationale: 'While related, this equation specifically describes mass-energy equivalence.', isCorrect: false },
                { text: 'The relationship between voltage, current, and resistance.', rationale: 'This is Ohm\'s Law, V=IR.', isCorrect: false }
            ]
        },
        {
            questionNumber: 11,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'The phenomenon where certain materials emit electrons when light shines on them is called the:',
            answerOptions: [
                { text: 'Photoelectric effect', rationale: 'Correct. The explanation of this effect by Einstein was a key step in the development of quantum mechanics.', isCorrect: true },
                { text: 'Greenhouse effect', rationale: 'The greenhouse effect is the trapping of heat in the atmosphere.', isCorrect: false },
                { text: 'Doppler effect', rationale: 'The Doppler effect is the change in frequency of a wave in relation to an observer who is moving relative to the wave source.', isCorrect: false },
                { text: 'Placebo effect', rationale: 'The placebo effect is a psychological phenomenon in medicine.', isCorrect: false }
            ]
        },
        {
            questionNumber: 12,
            type: 'multipleChoice',
            difficulty: 'hard',
            question: 'In quantum mechanics, the principle of wave-particle duality means that:',
            answerOptions: [
                { text: 'Particles are always waves, and never particles.', rationale: 'It means they can exhibit properties of both.', isCorrect: false },
                { text: 'All particles have a corresponding antiparticle.', rationale: 'This is another concept in particle physics.', isCorrect: false },
                { text: 'Light and matter can exhibit the properties of both waves and particles.', rationale: 'Correct. For example, light can act as a wave (diffraction) and as a particle (photoelectric effect).', isCorrect: true },
                { text: 'The position and momentum of a particle cannot both be known with perfect accuracy.', rationale: 'This is the Heisenberg Uncertainty Principle.', isCorrect: false }
            ]
        }
    ]
}
];
