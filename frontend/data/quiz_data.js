export const expandedQuizData = {
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
                        quizzes: [
                            {
                                quizId: "sci_life_science_basics_set1",
                                label: "Quiz A",
                                questions: [
                                    { questionNumber: 1, type: 'text', passage: "All living organisms are composed of cells, the basic units of life. The cell theory states that all living things are made of cells, cells are the basic unit of structure and function, and all cells come from pre-existing cells. Within a cell, organelles perform specific functions. The nucleus contains the cell's genetic material (DNA), and mitochondria are responsible for generating energy through cellular respiration.", question: "According to the passage, what is the primary function of mitochondria?", answerOptions: [ { text: "Storing the cell's genetic material.", rationale: "This is the function of the nucleus.", isCorrect: false }, { text: "Controlling all cell activities.", rationale: "This is a broader function of the nucleus.", isCorrect: false }, { text: "Generating energy for the cell.", rationale: "Correct. The passage states mitochondria generate energy.", isCorrect: true }, { text: "Creating new cells.", rationale: "New cells come from pre-existing cells, a process of the entire cell.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "Which of the following is the correct order of organization in living things, from simplest to most complex?", answerOptions: [ { text: "Organism, Organ System, Organ, Tissue, Cell", rationale: "This order is reversed.", isCorrect: false }, { text: "Cell, Tissue, Organ, Organ System, Organism", rationale: "Correct. Cells form tissues, tissues form organs, organs form organ systems, and organ systems make up an organism.", isCorrect: true }, { text: "Tissue, Cell, Organ, Organism, Organ System", rationale: "This order is incorrect.", isCorrect: false }, { text: "Cell, Organ, Tissue, Organism, Organ System", rationale: "This order is incorrect.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'text', passage: "Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy. The process uses sunlight, water, and carbon dioxide to create glucose (sugar for energy) and oxygen. This is why plants are called producers; they create their own food.", question: "What are the three essential inputs for photosynthesis?", answerOptions: [ { text: "Sunlight, oxygen, and water.", rationale: "Oxygen is an output, not an input.", isCorrect: false }, { text: "Sunlight, carbon dioxide, and glucose.", rationale: "Glucose is an output.", isCorrect: false }, { text: "Sunlight, water, and carbon dioxide.", rationale: "Correct. The passage lists these three as the necessary ingredients.", isCorrect: true }, { text: "Water, oxygen, and glucose.", rationale: "Oxygen and glucose are outputs.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "Which human body system is responsible for transporting oxygen, nutrients, and hormones to cells and removing waste products?", answerOptions: [ { text: "Respiratory System", rationale: "The respiratory system is responsible for gas exchange (breathing).", isCorrect: false }, { text: "Nervous System", rationale: "The nervous system is the body's command center, using electrical signals.", isCorrect: false }, { text: "Digestive System", rationale: "The digestive system breaks down food.", isCorrect: false }, { text: "Circulatory System", rationale: "Correct. The circulatory system, including the heart, blood, and blood vessels, is the body's transport network.", isCorrect: true } ] },
                                    { questionNumber: 5, type: 'text', passage: "DNA (Deoxyribonucleic acid) is a molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known organisms. A gene is a specific sequence of DNA that codes for a functional product, either RNA or a protein.", question: "What is the relationship between DNA and genes?", answerOptions: [ { text: "A gene is a segment of DNA that codes for a specific product.", rationale: "Correct. The passage defines a gene as a specific sequence of DNA.", isCorrect: true }, { text: "DNA is a type of gene.", rationale: "This is reversed. A gene is a type of DNA sequence.", isCorrect: false }, { text: "DNA and genes are completely unrelated.", rationale: "They are directly related.", isCorrect: false }, { text: "A gene is larger than a DNA molecule.", rationale: "A gene is a part of a larger DNA molecule.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "In genetics, what does a Punnett square predict?", answerOptions: [ { text: "The exact genetic makeup of an offspring.", rationale: "It predicts probability, not the exact outcome.", isCorrect: false }, { text: "The probability of an offspring inheriting a particular trait.", rationale: "Correct. A Punnett square is a tool used to predict the possible genetic outcomes and their probabilities.", isCorrect: true }, { text: "The number of chromosomes in a cell.", rationale: "This is determined by a karyotype, not a Punnett square.", isCorrect: false }, { text: "The rate of cellular respiration.", rationale: "This is unrelated to Punnett squares.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "Which part of the plant cell is primarily responsible for photosynthesis?", answerOptions: [ { text: "Nucleus", rationale: "The nucleus contains the cell's genetic material.", isCorrect: false }, { text: "Mitochondrion", rationale: "Mitochondria are responsible for cellular respiration.", isCorrect: false }, { text: "Chloroplast", rationale: "Correct. Chloroplasts contain chlorophyll, the pigment that captures light energy.", isCorrect: true }, { text: "Cell Wall", rationale: "The cell wall provides structural support.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'text', passage: "Homeostasis is the state of steady internal, physical, and chemical conditions maintained by living systems. This is the condition of optimal functioning for the organism and includes many variables, such as body temperature and fluid balance, being kept within certain pre-set limits.", question: "Shivering when you are cold is an example of the body trying to maintain homeostasis by:", answerOptions: [ { text: "generating heat through muscle contractions.", rationale: "Correct. Shivering is an involuntary muscle contraction that generates heat to raise body temperature.", isCorrect: true }, { text: "reducing the body's core temperature.", rationale: "It is an attempt to increase, not reduce, temperature.", isCorrect: false }, { text: "saving energy.", rationale: "Shivering consumes energy.", isCorrect: false }, { text: "increasing fluid balance.", rationale: "This is unrelated to the primary purpose of shivering.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "In the human respiratory system, what is the primary function of the alveoli?", answerOptions: [ { text: "To filter dust and particles from the air.", rationale: "This is mainly done by hairs and mucus in the nasal passages and trachea.", isCorrect: false }, { text: "To produce sound for speech.", rationale: "This is the function of the larynx (voice box).", isCorrect: false }, { text: "To exchange oxygen and carbon dioxide with the blood.", rationale: "Correct. The alveoli are tiny air sacs where gas exchange occurs.", isCorrect: true }, { text: "To pump air into and out of the lungs.", rationale: "This is the function of the diaphragm muscle.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "An allele is a variant form of a gene. If an individual has two identical alleles for a particular gene, they are:", answerOptions: [ { text: "Heterozygous for that gene.", rationale: "Heterozygous means having two different alleles.", isCorrect: false }, { text: "Homozygous for that gene.", rationale: "Correct. 'Homo-' means same.", isCorrect: true }, { text: "Recessive for that gene.", rationale: "Recessive describes an allele that is masked by a dominant one.", isCorrect: false }, { text: "Dominant for that gene.", rationale: "Dominant describes an allele that masks a recessive one.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'text', passage: "The nervous system is composed of two main parts: the Central Nervous System (CNS), which consists of the brain and spinal cord, and the Peripheral Nervous System (PNS), which consists of the nerves that branch out from the CNS to the rest of the body.", question: "A nerve in your arm that sends a signal to your brain is part of which system?", answerOptions: [ { text: "The Central Nervous System (CNS)", rationale: "The CNS is the brain and spinal cord.", isCorrect: false }, { text: "The Peripheral Nervous System (PNS)", rationale: "Correct. Nerves outside the brain and spinal cord are part of the PNS.", isCorrect: true }, { text: "Both the CNS and PNS", rationale: "It is part of the PNS.", isCorrect: false }, { text: "The Circulatory System", rationale: "This is a different body system.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "What is the primary function of the digestive system?", answerOptions: [ { text: "To break down food and absorb nutrients.", rationale: "Correct. The digestive system processes food for energy and nutrients.", isCorrect: true }, { text: "To eliminate waste from the blood.", rationale: "This is primarily the function of the urinary system.", isCorrect: false }, { text: "To send signals throughout the body.", rationale: "This is the function of the nervous system.", isCorrect: false }, { text: "To produce hormones.", rationale: "This is the function of the endocrine system.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'text', passage: "Cellular respiration is a set of metabolic reactions and processes that take place in the cells of organisms to convert chemical energy from nutrients into adenosine triphosphate (ATP), and then release waste products. It is the process of 'burning' glucose for energy.", question: "Cellular respiration occurs in which organelle?", answerOptions: [ { text: "Chloroplast", rationale: "Chloroplasts are for photosynthesis.", isCorrect: false }, { text: "Nucleus", rationale: "The nucleus contains genetic material.", isCorrect: false }, { text: "Mitochondria", rationale: "Correct. Mitochondria are known as the 'powerhouses' of the cell because this is where cellular respiration happens.", isCorrect: true }, { text: "Ribosome", rationale: "Ribosomes are responsible for protein synthesis.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "Which of the following is an example of an inherited trait in humans?", answerOptions: [ { text: "Eye color", rationale: "Correct. Eye color is determined by genes passed from parents to offspring.", isCorrect: true }, { text: "A scar from an injury", rationale: "This is an acquired characteristic, not inherited.", isCorrect: false }, { text: "The ability to speak English", rationale: "This is a learned behavior.", isCorrect: false }, { text: "A tattoo", rationale: "This is an acquired body modification.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "What is the difference between a dominant and a recessive allele?", answerOptions: [ { text: "A dominant allele is always better than a recessive allele.", rationale: "Dominance does not imply superiority.", isCorrect: false }, { text: "A dominant allele will mask the expression of a recessive allele.", rationale: "Correct. If a dominant allele is present, its trait will be expressed.", isCorrect: true }, { text: "Recessive alleles are more common in the population.", rationale: "Dominance is not related to how common an allele is.", isCorrect: false }, { text: "Dominant alleles are only found in homozygous individuals.", rationale: "Dominant alleles are expressed in both homozygous and heterozygous individuals.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "sci_life_science_basics_set2",
                                label: "Quiz B",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "What is the function of a cell's nucleus?", answerOptions: [ { text: "To store water and nutrients.", rationale: "This is the function of vacuoles.", isCorrect: false }, { text: "To control the cell's activities and store genetic information.", rationale: "Correct. The nucleus is the control center of the cell.", isCorrect: true }, { text: "To provide energy for the cell.", rationale: "This is the function of the mitochondria.", isCorrect: false }, { text: "To protect the cell from its surroundings.", rationale: "This is the function of the cell membrane.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "What are the products of cellular respiration?", answerOptions: [ { text: "Glucose and oxygen.", rationale: "These are the reactants of cellular respiration.", isCorrect: false }, { text: "Carbon dioxide, water, and ATP (energy).", rationale: "Correct. Cellular respiration breaks down glucose to produce energy.", isCorrect: true }, { text: "Sunlight and water.", rationale: "These are reactants of photosynthesis.", isCorrect: false }, { text: "Lactic acid and alcohol.", rationale: "These are products of fermentation, a type of anaerobic respiration.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'knowledge', question: "Which of the following best describes the process of osmosis?", answerOptions: [ { text: "The movement of molecules from an area of high concentration to an area of low concentration.", rationale: "This is the definition of diffusion.", isCorrect: false }, { text: "The movement of water across a semipermeable membrane.", rationale: "Correct. Osmosis is the diffusion of water.", isCorrect: true }, { text: "The use of energy to move molecules against a concentration gradient.", rationale: "This is active transport.", isCorrect: false }, { text: "The process of a cell engulfing a large particle.", rationale: "This is endocytosis.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "What is the role of ribosomes in a cell?", answerOptions: [ { text: "To produce proteins.", rationale: "Correct. Ribosomes are the sites of protein synthesis.", isCorrect: true }, { text: "To store the cell's genetic material.", rationale: "This is the function of the nucleus.", isCorrect: false }, { text: "To break down waste materials.", rationale: "This is the function of lysosomes.", isCorrect: false }, { text: "To package and transport proteins.", rationale: "This is the function of the Golgi apparatus.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "What is the term for a group of similar cells that perform a specific function?", answerOptions: [ { text: "Organ.", rationale: "An organ is a group of tissues.", isCorrect: false }, { text: "Tissue.", rationale: "Correct. A tissue is a group of similar cells.", isCorrect: true }, { text: "Organism.", rationale: "An organism is a complete living being.", isCorrect: false }, { text: "Organ system.", rationale: "An organ system is a group of organs.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "Which of the following is a characteristic of all living things?", answerOptions: [ { text: "The ability to move.", rationale: "Not all living things move (e.g., plants).", isCorrect: false }, { text: "The ability to respond to stimuli.", rationale: "Correct. All living things react to changes in their environment.", isCorrect: true }, { text: "The ability to perform photosynthesis.", rationale: "Only plants, algae, and some bacteria perform photosynthesis.", isCorrect: false }, { text: "The ability to see.", rationale: "Not all living things can see.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "What is the main purpose of the cell wall in plant cells?", answerOptions: [ { text: "To regulate what enters and leaves the cell.", rationale: "This is the function of the cell membrane.", isCorrect: false }, { text: "To provide structural support and protection.", rationale: "Correct. The cell wall is a rigid layer that gives plant cells their shape.", isCorrect: true }, { text: "To store water.", rationale: "This is the function of the vacuole.", isCorrect: false }, { text: "To produce energy.", rationale: "This is the function of the mitochondria.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "What is the difference between prokaryotic and eukaryotic cells?", answerOptions: [ { text: "Prokaryotic cells have a nucleus, while eukaryotic cells do not.", rationale: "This is the opposite of the correct answer.", isCorrect: false }, { text: "Eukaryotic cells have a nucleus and membrane-bound organelles, while prokaryotic cells do not.", rationale: "Correct. This is the primary distinction between the two cell types.", isCorrect: true }, { text: "Prokaryotic cells are always larger than eukaryotic cells.", rationale: "Eukaryotic cells are generally larger.", isCorrect: false }, { text: "Eukaryotic cells are only found in plants, while prokaryotic cells are found in animals.", rationale: "Both plants and animals have eukaryotic cells.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "What is the name of the process by which a cell divides to create two identical daughter cells?", answerOptions: [ { text: "Meiosis.", rationale: "Meiosis produces four genetically different cells.", isCorrect: false }, { text: "Mitosis.", rationale: "Correct. Mitosis is the process of cell division for growth and repair.", isCorrect: true }, { text: "Fertilization.", rationale: "Fertilization is the fusion of gametes.", isCorrect: false }, { text: "Transcription.", rationale: "Transcription is the process of creating RNA from DNA.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "Which of the following is an example of a unicellular organism?", answerOptions: [ { text: "A mushroom.", rationale: "Mushrooms are multicellular.", isCorrect: false }, { text: "A human.", rationale: "Humans are multicellular.", isCorrect: false }, { text: "A bacterium.", rationale: "Correct. Bacteria are single-celled organisms.", isCorrect: true }, { text: "A tree.", rationale: "Trees are multicellular.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "What is the primary pigment used in photosynthesis?", answerOptions: [ { text: "Hemoglobin.", rationale: "Hemoglobin is the pigment in red blood cells that carries oxygen.", isCorrect: false }, { text: "Chlorophyll.", rationale: "Correct. Chlorophyll absorbs light energy for photosynthesis.", isCorrect: true }, { text: "Melanin.", rationale: "Melanin is the pigment that gives skin its color.", isCorrect: false }, { text: "Carotene.", rationale: "Carotene is a pigment that gives some plants their orange color.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "Which of the following is a function of the cell membrane?", answerOptions: [ { text: "To produce proteins.", rationale: "This is the function of ribosomes.", isCorrect: false }, { text: "To control what enters and leaves the cell.", rationale: "Correct. The cell membrane is selectively permeable.", isCorrect: true }, { text: "To store the cell's genetic information.", rationale: "This is the function of the nucleus.", isCorrect: false }, { text: "To provide rigid support for the cell.", rationale: "This is the function of the cell wall in plants.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'knowledge', question: "What is the term for an organism that cannot make its own food and must consume other organisms for energy?", answerOptions: [ { text: "Autotroph.", rationale: "Autotrophs, like plants, make their own food.", isCorrect: false }, { text: "Heterotroph.", rationale: "Correct. Heterotrophs are consumers.", isCorrect: true }, { text: "Producer.", rationale: "Producers, like plants, make their own food.", isCorrect: false }, { text: "Decomposer.", rationale: "Decomposers break down dead organic matter.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "Which of the following is a waste product of photosynthesis?", answerOptions: [ { text: "Carbon dioxide.", rationale: "Carbon dioxide is a reactant in photosynthesis.", isCorrect: false }, { text: "Water.", rationale: "Water is a reactant in photosynthesis.", isCorrect: false }, { text: "Oxygen.", rationale: "Correct. Oxygen is released as a byproduct of photosynthesis.", isCorrect: true }, { text: "Glucose.", rationale: "Glucose is the food produced by photosynthesis.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "What is the basic building block of proteins?", answerOptions: [ { text: "Nucleic acids.", rationale: "Nucleic acids are the building blocks of DNA and RNA.", isCorrect: false }, { text: "Amino acids.", rationale: "Correct. Proteins are polymers of amino acids.", isCorrect: true }, { text: "Lipids.", rationale: "Lipids are fats.", isCorrect: false }, { text: "Carbohydrates.", rationale: "Carbohydrates are sugars.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "sci_life_science_basics_set3",
                                label: "Quiz C",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "What is the function of the cytoplasm in a cell?", answerOptions: [ { text: "To control the cell's activities.", rationale: "This is the function of the nucleus.", isCorrect: false }, { text: "To hold the cell's organelles in place.", rationale: "Correct. The cytoplasm is the jelly-like substance that fills the cell.", isCorrect: true }, { text: "To produce energy.", rationale: "This is the function of the mitochondria.", isCorrect: false }, { text: "To store water.", rationale: "This is the function of the vacuole.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "Which of the following is a component of the cell theory?", answerOptions: [ { text: "All cells have a nucleus.", rationale: "Prokaryotic cells do not have a nucleus.", isCorrect: false }, { text: "All living things are made of one or more cells.", rationale: "Correct. This is a fundamental principle of the cell theory.", isCorrect: true }, { text: "All cells are the same size and shape.", rationale: "Cells vary greatly in size and shape.", isCorrect: false }, { text: "All cells can move.", rationale: "Not all cells can move.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'knowledge', question: "What is the chemical equation for photosynthesis?", answerOptions: [ { text: "6CO2 + 6H2O -> C6H12O6 + 6O2", rationale: "Correct. This equation represents the conversion of carbon dioxide and water into glucose and oxygen.", isCorrect: true }, { text: "C6H12O6 + 6O2 -> 6CO2 + 6H2O", rationale: "This is the equation for cellular respiration.", isCorrect: false }, { text: "H2 + O2 -> H2O", rationale: "This is the equation for the formation of water.", isCorrect: false }, { text: "N2 + 3H2 -> 2NH3", rationale: "This is the equation for the synthesis of ammonia.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "What is the function of the human skeletal system?", answerOptions: [ { text: "To transport oxygen to the cells.", rationale: "This is the function of the circulatory system.", isCorrect: false }, { text: "To provide structure, support, and protection for the body.", rationale: "Correct. The skeletal system provides the framework for the body.", isCorrect: true }, { text: "To break down food.", rationale: "This is the function of the digestive system.", isCorrect: false }, { text: "To send signals throughout the body.", rationale: "This is the function of the nervous system.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "What is the name of the process by which plants release water vapor into the atmosphere?", answerOptions: [ { text: "Photosynthesis.", rationale: "Photosynthesis is the process of making food.", isCorrect: false }, { text: "Transpiration.", rationale: "Correct. Transpiration is the evaporation of water from plants.", isCorrect: true }, { text: "Respiration.", rationale: "Respiration is the process of breaking down food for energy.", isCorrect: false }, { text: "Condensation.", rationale: "Condensation is the process of water vapor turning into liquid.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "What is the difference between a gene and a chromosome?", answerOptions: [ { text: "A gene is made of chromosomes.", rationale: "This is the opposite of the correct answer.", isCorrect: false }, { text: "A chromosome is a structure that contains many genes.", rationale: "Correct. Chromosomes are the structures that carry genetic information in the form of DNA.", isCorrect: true }, { text: "Genes and chromosomes are the same thing.", rationale: "They are not the same thing.", isCorrect: false }, { text: "Genes are only found in plants, while chromosomes are only found in animals.", rationale: "Both are found in plants and animals.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "Which organelle is known as the 'powerhouse' of the cell?", answerOptions: [ { text: "Nucleus.", rationale: "The nucleus is the control center.", isCorrect: false }, { text: "Mitochondria.", rationale: "Correct. Mitochondria produce the energy for the cell.", isCorrect: true }, { text: "Ribosome.", rationale: "Ribosomes produce proteins.", isCorrect: false }, { text: "Chloroplast.", rationale: "Chloroplasts are the site of photosynthesis.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "What is the term for a trait that is masked by another trait?", answerOptions: [ { text: "Dominant.", rationale: "A dominant trait masks a recessive trait.", isCorrect: false }, { text: "Recessive.", rationale: "Correct. A recessive trait is only expressed when two copies of the allele are present.", isCorrect: true }, { text: "Homozygous.", rationale: "Homozygous refers to having two identical alleles.", isCorrect: false }, { text: "Heterozygous.", rationale: "Heterozygous refers to having two different alleles.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "What is the main function of red blood cells?", answerOptions: [ { text: "To fight infection.", rationale: "This is the function of white blood cells.", isCorrect: false }, { text: "To carry oxygen to the body's tissues.", rationale: "Correct. Red blood cells contain hemoglobin, which binds to oxygen.", isCorrect: true }, { text: "To help with blood clotting.", rationale: "This is the function of platelets.", isCorrect: false }, { text: "To transport nutrients.", rationale: "While the blood transports nutrients, this is not the primary function of red blood cells.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "Which of the following is a type of asexual reproduction?", answerOptions: [ { text: "Fertilization.", rationale: "Fertilization is a key part of sexual reproduction.", isCorrect: false }, { text: "Binary fission.", rationale: "Correct. Binary fission is a form of asexual reproduction where a single-celled organism divides into two.", isCorrect: true }, { text: "Meiosis.", rationale: "Meiosis is the process of producing gametes for sexual reproduction.", isCorrect: false }, { text: "Pollination.", rationale: "Pollination is part of the process of sexual reproduction in plants.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "What is the role of enzymes in a cell?", answerOptions: [ { text: "To store genetic information.", rationale: "This is the role of DNA.", isCorrect: false }, { text: "To speed up chemical reactions.", rationale: "Correct. Enzymes are biological catalysts.", isCorrect: true }, { text: "To provide energy.", rationale: "This is the role of ATP.", isCorrect: false }, { text: "To transport materials.", rationale: "This is a function of some proteins, but not the primary role of enzymes.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "What is the term for the genetic makeup of an organism?", answerOptions: [ { text: "Phenotype.", rationale: "Phenotype is the observable characteristics of an organism.", isCorrect: false }, { text: "Genotype.", rationale: "Correct. Genotype refers to the specific alleles an organism has.", isCorrect: true }, { text: "Karyotype.", rationale: "A karyotype is an individual's collection of chromosomes.", isCorrect: false }, { text: "Allele.", rationale: "An allele is a variant form of a gene.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'knowledge', question: "Which of the following is an example of a producer in an ecosystem?", answerOptions: [ { text: "A lion.", rationale: "A lion is a consumer.", isCorrect: false }, { text: "A mushroom.", rationale: "A mushroom is a decomposer.", isCorrect: false }, { text: "A tree.", rationale: "Correct. A tree produces its own food through photosynthesis.", isCorrect: true }, { text: "A human.", rationale: "A human is a consumer.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "What is the name of the sugar that is produced during photosynthesis?", answerOptions: [ { text: "Sucrose.", rationale: "Sucrose is table sugar.", isCorrect: false }, { text: "Fructose.", rationale: "Fructose is a sugar found in fruits.", isCorrect: false }, { text: "Glucose.", rationale: "Correct. Glucose is the simple sugar produced by photosynthesis.", isCorrect: true }, { text: "Lactose.", rationale: "Lactose is a sugar found in milk.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "Which of the following is NOT one of the four main types of organic molecules?", answerOptions: [ { text: "Proteins.", rationale: "Proteins are one of the four main types.", isCorrect: false }, { text: "Carbohydrates.", rationale: "Carbohydrates are one of the four main types.", isCorrect: false }, { text: "Water.", rationale: "Correct. Water is an inorganic molecule.", isCorrect: true }, { text: "Nucleic acids.", rationale: "Nucleic acids are one of the four main types.", isCorrect: false } ] }
                                ]
                            }
                        ]
                    },
                    {
                        id: "sci_ecosystems_environment",
                        title: "Ecosystems & Environment",
                        description: "Ecology, food webs, and human impact on the environment.",
                        quizzes: [
                            {
                                quizId: "sci_ecosystems_environment_set1",
                                label: "Quiz A",
                                questions: [
                                    { questionNumber: 1, type: 'text', passage: "An ecosystem consists of all the living organisms (biotic factors) in a particular area, along with all the non-living (abiotic) components of the environment, such as sunlight, soil, water, and temperature. These components are linked together through nutrient cycles and energy flows.", question: "Which of the following is an example of an abiotic factor in an ecosystem?", answerOptions: [ { text: "A tree", rationale: "A tree is a living organism (biotic).", isCorrect: false }, { text: "A fungus", rationale: "A fungus is a living organism (biotic).", isCorrect: false }, { text: "The amount of annual rainfall", rationale: "Correct. Rainfall is a non-living component of the environment.", isCorrect: true }, { text: "An insect", rationale: "An insect is a living organism (biotic).", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "In a food web, an organism that produces its own food, usually through photosynthesis, is called a:", answerOptions: [ { text: "Consumer", rationale: "Consumers eat other organisms.", isCorrect: false }, { text: "Producer", rationale: "Correct. Producers, like plants, form the base of the food web.", isCorrect: true }, { text: "Decomposer", rationale: "Decomposers break down dead organic matter.", isCorrect: false }, { text: "Scavenger", rationale: "Scavengers are a type of consumer.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'image', imageUrl: "Images/ged-scince-fig-12.png", question: "In this food web, which organism is a primary consumer?", answerOptions: [ { text: "The grass", rationale: "The grass is a producer.", isCorrect: false }, { text: "The rabbit", rationale: "Correct. The rabbit eats the producer (grass), making it a primary consumer.", isCorrect:true }, { text: "The hawk", rationale: "The hawk eats other consumers, making it a secondary or tertiary consumer.", isCorrect: false }, { text: "The fungi", rationale: "The fungi are decomposers.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'text', passage: "The energy pyramid illustrates the flow of energy from one trophic (feeding) level to the next in an ecosystem. A large amount of energy is lost at each level, usually as heat. Typically, only about 10% of the energy from one level is transferred to the level above it.", question: "If the producers in an ecosystem contain 10,000 units of energy, approximately how much energy would be available to the secondary consumers?", answerOptions: [ { text: "10,000 units", rationale: "This is the energy at the producer level.", isCorrect: false }, { text: "1,000 units", rationale: "This is the energy available to the primary consumers (10% of 10,000).", isCorrect: false }, { text: "100 units", rationale: "Correct. Secondary consumers are two levels up. 10% of 10,000 is 1,000 (primary consumers), and 10% of 1,000 is 100.", isCorrect: true }, { text: "10 units", rationale: "This would be the energy available to tertiary consumers.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "The process by which water evaporates from oceans, condenses into clouds, falls as precipitation, and returns to the ocean is known as:", answerOptions: [ { text: "The carbon cycle", rationale: "The carbon cycle describes the movement of carbon.", isCorrect: false }, { text: "The nitrogen cycle", rationale: "The nitrogen cycle describes the movement of nitrogen.", isCorrect: false }, { text: "The water cycle", rationale: "Correct. This describes the continuous movement of water on, above, and below the surface of the Earth.", isCorrect: true }, { text: "Photosynthesis", rationale: "Photosynthesis is a process used by plants to create energy.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'text', passage: "Human activities, such as the burning of fossil fuels (coal, oil, and natural gas), release large amounts of carbon dioxide into the atmosphere. Carbon dioxide is a greenhouse gas, which traps heat and contributes to the warming of the planet, a phenomenon known as global warming or climate change.", question: "According to the passage, what is the primary cause of the recent increase in atmospheric carbon dioxide?", answerOptions: [ { text: "Volcanic eruptions", rationale: "While volcanoes release CO2, human activities are the primary cause of the recent increase.", isCorrect: false }, { text: "Deforestation", rationale: "Deforestation contributes, but the burning of fossil fuels is the primary cause mentioned.", isCorrect: false }, { text: "The burning of fossil fuels", rationale: "Correct. The passage explicitly states this as the main source.", isCorrect: true }, { text: "The process of photosynthesis", rationale: "Photosynthesis removes carbon dioxide from the atmosphere.", isCorrect: false } ] },
                                    { questionNumber: 7, 'type': 'knowledge', question: "A symbiotic relationship where one organism benefits and the other is neither harmed nor helped is called:", answerOptions: [ { 'text': 'Mutualism', 'rationale': 'In mutualism, both organisms benefit.', 'isCorrect': false }, { 'text': 'Parasitism', 'rationale': 'In parasitism, one organism benefits and the other is harmed.', 'isCorrect': false }, { 'text': 'Commensalism', 'rationale': 'Correct. A classic example is a barnacle on a whale.', 'isCorrect': true }, { 'text': 'Competition', 'rationale': 'Competition is a relationship where two or more organisms vie for the same limited resources.', 'isCorrect': false } ] },
                                    { questionNumber: 8, type: 'text', passage: "Biodiversity refers to the variety of life in a particular habitat or ecosystem. High biodiversity is often a sign of a healthy ecosystem. It increases ecosystem productivity and resilience, meaning the ecosystem is better able to withstand and recover from disasters.", question: "What is the primary benefit of high biodiversity in an ecosystem?", answerOptions: [ { text: "It ensures that all organisms are the same size.", rationale: "Biodiversity means variety, not uniformity.", isCorrect: false }, { text: "It increases the ecosystem's stability and resilience.", rationale: "Correct. The passage states that high biodiversity makes an ecosystem more resilient.", isCorrect: true }, { text: "It decreases the total number of organisms.", rationale: "High biodiversity usually correlates with a high number of organisms.", isCorrect: false }, { text: "It simplifies the food web.", rationale: "High biodiversity leads to more complex food webs.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "What is the main role of decomposers, such as bacteria and fungi, in an ecosystem?", answerOptions: [ { text: "To produce energy from sunlight.", rationale: "This is the role of producers.", isCorrect: false }, { text: "To consume other organisms for energy.", rationale: "This is the role of consumers.", isCorrect: false }, { text: "To break down dead organic matter and return nutrients to the soil.", rationale: "Correct. Decomposers are essential for recycling nutrients.", isCorrect: true }, { text: "To control the population of primary consumers.", rationale: "This is a role of secondary consumers (predators).", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'text', passage: "Natural selection is the process through which populations of living organisms adapt and change. Individuals in a population are naturally variable, meaning that they are all different in some ways. This variation means that some individuals have traits better suited to the environment than others. Individuals with adaptive traits are more likely to survive and reproduce, passing those traits on to their offspring.", question: "Which of the following is a key requirement for natural selection to occur?", answerOptions: [ { text: "All individuals in a population must be identical.", rationale: "Variation is necessary for natural selection to act upon.", isCorrect: false }, { text: "The environment must remain constant over time.", rationale: "Environmental changes are often the driving force of natural selection.", isCorrect: false }, { text: "There must be variation in heritable traits within a population.", rationale: "Correct. Without variation, some individuals would not be better suited than others, and there would be nothing to 'select'.", isCorrect: true }, { text: "Organisms must consciously choose to adapt.", rationale: "Adaptation through natural selection is a passive process, not a conscious choice.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "An invasive species is an organism that is not native to a specific location and has a tendency to spread to a degree believed to cause damage to the environment, economy, or human health. Why are invasive species often so successful in new ecosystems?", answerOptions: [ { text: "Because they are usually larger than native species.", rationale: "Size is not the determining factor.", isCorrect: false }, { text: "Because they often lack natural predators in the new environment.", rationale: "Correct. Without predators to control their population, they can multiply rapidly and outcompete native species.", isCorrect: true }, { text: "Because they only eat food that native species do not.", rationale: "They often compete directly with native species for food.", isCorrect: false }, { text: "Because they reproduce more slowly than native species.", rationale: "They often reproduce more quickly.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "The gradual process by which ecosystems change and develop over time is called:", answerOptions: [ { text: "Evolution", rationale: "Evolution refers to the change in heritable traits of populations over generations.", isCorrect: false }, { text: "Succession", rationale: "Correct. Ecological succession is the process of change in the species structure of an ecological community over time.", isCorrect: true }, { text: "Homeostasis", rationale: "Homeostasis is the maintenance of a stable internal environment.", isCorrect: false }, { text: "Photosynthesis", rationale: "This is the process of creating energy from sunlight.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'text', passage: "Acid rain is caused by emissions of sulfur dioxide and nitrogen oxide, which react with the water molecules in the atmosphere to produce acids. These emissions primarily come from the burning of fossil fuels in power plants and vehicles. Acid rain can have harmful effects on soil, forests, and aquatic ecosystems.", question: "What is the primary cause of acid rain?", answerOptions: [ { text: "An increase in the pH of rainwater.", rationale: "Acid rain involves a decrease in pH (making it more acidic).", isCorrect: false }, { text: "Pollutants from burning fossil fuels reacting with water in the atmosphere.", rationale: "Correct. The passage identifies sulfur dioxide and nitrogen oxide from fossil fuels as the primary cause.", isCorrect: true }, { text: "The natural carbonation of rainwater.", rationale: "Natural rainwater is slightly acidic, but acid rain is much more so due to pollution.", isCorrect: false }, { text: "Runoff from agricultural fertilizers.", rationale: "Fertilizer runoff causes other problems, like eutrophication, but not acid rain.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "A food chain shows a single pathway of energy transfer. Which of the following is a correct and logical food chain?", answerOptions: [ { text: "Hawk -> Snake -> Mouse -> Grass", rationale: "This food chain is backwards.", isCorrect: false }, { text: "Grass -> Mouse -> Snake -> Hawk", rationale: "Correct. This shows the correct flow of energy from producer to primary consumer to secondary consumer to tertiary consumer.", isCorrect: true }, { text: "Mouse -> Grass -> Hawk -> Snake", rationale: "This order is illogical.", isCorrect: false }, { text: "Sun -> Grass -> Hawk -> Mouse", rationale: "This order is illogical.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "The concept of a 'carbon footprint' refers to:", answerOptions: [ { text: "The total amount of carbon stored in the soil.", rationale: "This is part of the carbon cycle, but not a carbon footprint.", isCorrect: false }, { text: "The total amount of greenhouse gases generated by our actions.", rationale: "Correct. It is a measure of an individual's or organization's impact on the climate.", isCorrect: true }, { text: "The physical mark left by carbon-based life forms.", rationale: "This is a literal interpretation, not the correct meaning.", isCorrect: false }, { text: "The number of trees planted to offset carbon emissions.", rationale: "This is a way to reduce a carbon footprint, not the footprint itself.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "sci_ecosystems_environment_set2",
                                label: "Quiz B",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "What is the term for a group of organisms of the same species living in the same area?", answerOptions: [ { text: "Community.", rationale: "A community includes all the different species in an area.", isCorrect: false }, { text: "Population.", rationale: "Correct. A population is a group of individuals of the same species.", isCorrect: true }, { text: "Ecosystem.", rationale: "An ecosystem includes all living and non-living factors.", isCorrect: false }, { text: "Biome.", rationale: "A biome is a large-scale community of organisms, such as a desert or forest.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "Which of the following is an example of a decomposer?", answerOptions: [ { text: "A tree.", rationale: "A tree is a producer.", isCorrect: false }, { text: "A rabbit.", rationale: "A rabbit is a consumer.", isCorrect: false }, { text: "A mushroom.", rationale: "Correct. Mushrooms and bacteria are decomposers that break down dead organic matter.", isCorrect: true }, { text: "A hawk.", rationale: "A hawk is a consumer.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'knowledge', question: "What is the term for the role an organism plays in its ecosystem?", answerOptions: [ { text: "Niche.", rationale: "Correct. An organism's niche includes its habitat, food source, and role in the food web.", isCorrect: true }, { text: "Habitat.", rationale: "A habitat is the physical environment where an organism lives.", isCorrect: false }, { text: "Trophic level.", rationale: "A trophic level is the position an organism occupies in a food web.", isCorrect: false }, { text: "Symbiosis.", rationale: "Symbiosis is a close relationship between two different species.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "What is the process by which nitrogen is converted into a usable form for plants?", answerOptions: [ { text: "Nitrogen fixation.", rationale: "Correct. Nitrogen fixation is the process by which atmospheric nitrogen is converted into ammonia, which plants can use.", isCorrect: true }, { text: "Denitrification.", rationale: "Denitrification is the process by which nitrates are converted back into nitrogen gas.", isCorrect: false }, { text: "Nitrification.", rationale: "Nitrification is the process by which ammonia is converted into nitrates.", isCorrect: false }, { text: "Ammonification.", rationale: "Ammonification is the process by which organic nitrogen is converted into ammonia.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "Which of the following is a renewable resource?", answerOptions: [ { text: "Coal.", rationale: "Coal is a non-renewable fossil fuel.", isCorrect: false }, { text: "Oil.", rationale: "Oil is a non-renewable fossil fuel.", isCorrect: false }, { text: "Natural gas.", rationale: "Natural gas is a non-renewable fossil fuel.", isCorrect: false }, { text: "Sunlight.", rationale: "Correct. Sunlight is a renewable resource that is not depleted by use.", isCorrect: true } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "What is the term for the variety of life in the world or in a particular habitat or ecosystem?", answerOptions: [ { text: "Biodiversity.", rationale: "Correct. Biodiversity refers to the variety of life at all levels of biological organization.", isCorrect: true }, { text: "Ecology.", rationale: "Ecology is the study of the relationships between living organisms and their environment.", isCorrect: false }, { text: "Evolution.", rationale: "Evolution is the process of change in the heritable characteristics of biological populations over successive generations.", isCorrect: false }, { text: "Genetics.", rationale: "Genetics is the study of genes, genetic variation, and heredity in living organisms.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "Which of the following is a primary cause of deforestation?", answerOptions: [ { text: "Urbanization.", rationale: "Correct. The expansion of cities often requires clearing forests.", isCorrect: true }, { text: "Recycling.", rationale: "Recycling helps to conserve resources and reduce the need for deforestation.", isCorrect: false }, { text: "Reforestation.", rationale: "Reforestation is the process of planting trees.", isCorrect: false }, { text: "Conservation.", rationale: "Conservation is the protection of natural resources.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "What is the term for the process by which a body of water becomes enriched in dissolved nutrients that stimulate the growth of aquatic plant life, usually resulting in the depletion of dissolved oxygen?", answerOptions: [ { text: "Eutrophication.", rationale: "Correct. Eutrophication is often caused by runoff from agricultural fertilizers.", isCorrect: true }, { text: "Acidification.", rationale: "Acidification is the process of becoming more acidic.", isCorrect: false }, { text: "Salinization.", rationale: "Salinization is the process of increasing the salt content.", isCorrect: false }, { text: "Pollution.", rationale: "Pollution is a general term for the introduction of contaminants into the natural environment.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "Which of the following is an example of a symbiotic relationship where both organisms benefit?", answerOptions: [ { text: "Mutualism.", rationale: "Correct. In mutualism, both species benefit from the relationship.", isCorrect: true }, { text: "Parasitism.", rationale: "In parasitism, one organism benefits and the other is harmed.", isCorrect: false }, { text: "Commensalism.", rationale: "In commensalism, one organism benefits and the other is unaffected.", isCorrect: false }, { text: "Predation.", rationale: "Predation is a relationship where one organism hunts and kills another.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "What is the term for the maximum population size of a species that the environment can sustain indefinitely?", answerOptions: [ { text: "Carrying capacity.", rationale: "Correct. The carrying capacity is determined by the available resources.", isCorrect: true }, { text: "Population density.", rationale: "Population density is the number of individuals per unit area.", isCorrect: false }, { text: "Limiting factor.", rationale: "A limiting factor is a resource or environmental condition that limits the growth of a population.", isCorrect: false }, { text: "Exponential growth.", rationale: "Exponential growth is a pattern of population growth where the rate of growth is proportional to the size of the population.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "Which of the following is a greenhouse gas that contributes to climate change?", answerOptions: [ { text: "Oxygen.", rationale: "Oxygen is not a greenhouse gas.", isCorrect: false }, { text: "Nitrogen.", rationale: "Nitrogen is not a greenhouse gas.", isCorrect: false }, { text: "Carbon dioxide.", rationale: "Correct. Carbon dioxide is a major greenhouse gas released by the burning of fossil fuels.", isCorrect: true }, { text: "Argon.", rationale: "Argon is not a greenhouse gas.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "What is the term for the process by which an organism's traits become better suited to its environment over time?", answerOptions: [ { text: "Adaptation.", rationale: "Correct. Adaptation is the process by which a species becomes better suited to its environment.", isCorrect: true }, { text: "Extinction.", rationale: "Extinction is the complete disappearance of a species.", isCorrect: false }, { text: "Mutation.", rationale: "A mutation is a change in the DNA sequence of an organism.", isCorrect: false }, { text: "Competition.", rationale: "Competition is the struggle between organisms for limited resources.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'knowledge', question: "What is the term for the study of the interactions between organisms and their environment?", answerOptions: [ { text: "Ecology.", rationale: "Correct. Ecology is the scientific study of the distribution and abundance of living organisms and how they are affected by interactions between the organisms and their environment.", isCorrect: true }, { text: "Biology.", rationale: "Biology is the study of life.", isCorrect: false }, { text: "Geology.", rationale: "Geology is the study of the Earth.", isCorrect: false }, { text: "Chemistry.", rationale: "Chemistry is the study of matter and its properties.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "Which of the following is a non-renewable resource?", answerOptions: [ { text: "Wind.", rationale: "Wind is a renewable resource.", isCorrect: false }, { text: "Solar energy.", rationale: "Solar energy is a renewable resource.", isCorrect: false }, { text: "Water.", rationale: "Water is a renewable resource.", isCorrect: false }, { text: "Petroleum.", rationale: "Correct. Petroleum is a fossil fuel that is consumed much faster than it is formed.", isCorrect: true } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "What is the term for the process by which a species completely disappears from the Earth?", answerOptions: [ { text: "Extinction.", rationale: "Correct. Extinction is the end of an organism or a group of organisms.", isCorrect: true }, { text: "Endangerment.", rationale: "Endangerment is the state of being at risk of extinction.", isCorrect: false }, { text: "Evolution.", rationale: "Evolution is the process of change in the heritable characteristics of biological populations over successive generations.", isCorrect: false }, { text: "Speciation.", rationale: "Speciation is the evolutionary process by which populations evolve to become distinct species.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "sci_ecosystems_environment_set3",
                                label: "Quiz C",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "What is the term for a series of organisms in which each one is the food source for the next?", answerOptions: [ { text: "Food web.", rationale: "A food web is a more complex network of interconnected food chains.", isCorrect: false }, { text: "Food chain.", rationale: "Correct. A food chain shows a single pathway of energy transfer.", isCorrect: true }, { text: "Trophic level.", rationale: "A trophic level is the position an organism occupies in a food web.", isCorrect: false }, { text: "Ecosystem.", rationale: "An ecosystem includes all living and non-living factors.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "Which of the following is an example of a consumer?", answerOptions: [ { text: "A plant.", rationale: "A plant is a producer.", isCorrect: false }, { text: "A fungus.", rationale: "A fungus is a decomposer.", isCorrect: false }, { text: "A rabbit.", rationale: "Correct. A rabbit consumes plants for energy.", isCorrect: true }, { text: "A bacterium.", rationale: "Bacteria are decomposers.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'knowledge', question: "What is the term for the physical environment where an organism lives?", answerOptions: [ { text: "Niche.", rationale: "A niche is an organism's role in its ecosystem.", isCorrect: false }, { text: "Habitat.", rationale: "Correct. A habitat is the natural home or environment of an animal, plant, or other organism.", isCorrect: true }, { text: "Community.", rationale: "A community includes all the different species in an area.", isCorrect: false }, { text: "Population.", rationale: "A population is a group of individuals of the same species.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "What is the main source of energy for most ecosystems on Earth?", answerOptions: [ { text: "The sun.", rationale: "Correct. The sun provides the energy for photosynthesis, which is the basis of most food chains.", isCorrect: true }, { text: "The moon.", rationale: "The moon does not provide a significant amount of energy to ecosystems.", isCorrect: false }, { text: "Geothermal heat.", rationale: "Geothermal heat is a source of energy for some ecosystems, but the sun is the main source for most.", isCorrect: false }, { text: "Fossil fuels.", rationale: "Fossil fuels are a source of energy for human societies, but not for most natural ecosystems.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "What is the term for the process by which carbon is exchanged between the atmosphere, oceans, land, and living things?", answerOptions: [ { text: "The carbon cycle.", rationale: "Correct. The carbon cycle is the process by which carbon is exchanged among the biosphere, pedosphere, geosphere, hydrosphere, and atmosphere of the Earth.", isCorrect: true }, { text: "The nitrogen cycle.", rationale: "The nitrogen cycle is the process by which nitrogen is converted into various chemical forms as it circulates among the atmosphere, terrestrial, and marine ecosystems.", isCorrect: false }, { text: "The water cycle.", rationale: "The water cycle is the continuous movement of water on, above, and below the surface of the Earth.", isCorrect: false }, { text: "Photosynthesis.", rationale: "Photosynthesis is a process used by plants to create energy.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "Which of the following is a consequence of ozone layer depletion?", answerOptions: [ { text: "Increased global temperatures.", rationale: "This is a consequence of the greenhouse effect.", isCorrect: false }, { text: "Increased levels of ultraviolet (UV) radiation reaching the Earth's surface.", rationale: "Correct. The ozone layer protects the Earth from the sun's harmful UV radiation.", isCorrect: true }, { text: "Acid rain.", rationale: "Acid rain is caused by emissions of sulfur dioxide and nitrogen oxide.", isCorrect: false }, { text: "Smog.", rationale: "Smog is a type of air pollution.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "What is the term for a species that is at risk of becoming extinct?", answerOptions: [ { text: "Endangered.", rationale: "Correct. An endangered species is a species that is very likely to become extinct in the near future.", isCorrect: true }, { text: "Extinct.", rationale: "An extinct species is one that no longer exists.", isCorrect: false }, { text: "Invasive.", rationale: "An invasive species is one that is not native to a specific location and has a tendency to spread.", isCorrect: false }, { text: "Keystone.", rationale: "A keystone species is one that has a disproportionately large effect on its environment relative to its abundance.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "Which of the following is an example of a parasitic relationship?", answerOptions: [ { text: "A bee pollinating a flower.", rationale: "This is an example of mutualism.", isCorrect: false }, { text: "A tick feeding on the blood of a dog.", rationale: "Correct. The tick benefits, and the dog is harmed.", isCorrect: true }, { text: "A barnacle living on a whale.", rationale: "This is an example of commensalism.", isCorrect: false }, { text: "A lion hunting a zebra.", rationale: "This is an example of predation.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "What is the term for the struggle between organisms for limited resources?", answerOptions: [ { text: "Competition.", rationale: "Correct. Competition can occur between members of the same species or between different species.", isCorrect: true }, { text: "Cooperation.", rationale: "Cooperation is when organisms work together.", isCorrect: false }, { text: "Symbiosis.", rationale: "Symbiosis is a close relationship between two different species.", isCorrect: false }, { text: "Predation.", rationale: "Predation is a relationship where one organism hunts and kills another.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "What is the term for a resource that limits the growth of a population?", answerOptions: [ { text: "Carrying capacity.", rationale: "Carrying capacity is the maximum population size that the environment can sustain.", isCorrect: false }, { text: "Population density.", rationale: "Population density is the number of individuals per unit area.", isCorrect: false }, { text: "Limiting factor.", rationale: "Correct. A limiting factor can be a resource like food or water, or an environmental condition like temperature.", isCorrect: true }, { text: "Exponential growth.", rationale: "Exponential growth is a pattern of population growth.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "Which of the following is a way to reduce one's carbon footprint?", answerOptions: [ { text: "Driving a car instead of walking.", rationale: "Driving a car increases one's carbon footprint.", isCorrect: false }, { text: "Using energy-efficient appliances.", rationale: "Correct. Using less energy reduces the amount of fossil fuels burned.", isCorrect: true }, { text: "Eating more meat.", rationale: "Meat production has a large carbon footprint.", isCorrect: false }, { text: "Using single-use plastics.", rationale: "Single-use plastics contribute to pollution and have a carbon footprint.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "What is the term for the process by which new species are formed?", answerOptions: [ { text: "Speciation.", rationale: "Correct. Speciation is the evolutionary process by which populations evolve to become distinct species.", isCorrect: true }, { text: "Extinction.", rationale: "Extinction is the complete disappearance of a species.", isCorrect: false }, { text: "Adaptation.", rationale: "Adaptation is the process by which a species becomes better suited to its environment.", isCorrect: false }, { text: "Mutation.", rationale: "A mutation is a change in the DNA sequence of an organism.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'knowledge', question: "What is the term for the layer of the Earth's atmosphere that contains the ozone layer?", answerOptions: [ { text: "Troposphere.", rationale: "The troposphere is the lowest layer of the atmosphere.", isCorrect: false }, { text: "Stratosphere.", rationale: "Correct. The stratosphere contains the ozone layer.", isCorrect: true }, { text: "Mesosphere.", rationale: "The mesosphere is the layer above the stratosphere.", isCorrect: false }, { text: "Thermosphere.", rationale: "The thermosphere is the outermost layer of the atmosphere.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "Which of the following is a benefit of biodiversity?", answerOptions: [ { text: "It increases the stability of ecosystems.", rationale: "Correct. A diverse ecosystem is more resilient to disturbances.", isCorrect: true }, { text: "It simplifies food webs.", rationale: "Biodiversity makes food webs more complex.", isCorrect: false }, { text: "It decreases the availability of resources.", rationale: "Biodiversity can increase the availability of resources.", isCorrect: false }, { text: "It leads to more disease.", rationale: "Biodiversity can help to control the spread of disease.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "What is the term for the process by which a liquid turns into a gas?", answerOptions: [ { text: "Condensation.", rationale: "Condensation is the process of a gas turning into a liquid.", isCorrect: false }, { text: "Evaporation.", rationale: "Correct. Evaporation is the process of a liquid turning into a gas.", isCorrect: true }, { text: "Freezing.", rationale: "Freezing is the process of a liquid turning into a solid.", isCorrect: false }, { text: "Melting.", rationale: "Melting is the process of a solid turning into a liquid.", isCorrect: false } ] }
                                ]
                            }
                        ]
                    },
                    {
                        id: "sci_genetics_heredity",
                        title: "Genetics & Heredity",
                        description: "DNA, genes, and the inheritance of traits.",
                        quizzes: [
                            {
                                quizId: "sci_genetics_heredity_set1",
                                label: "Quiz A",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "What is the primary function of DNA?", answerOptions: [ { text: "To create energy for the cell.", rationale: "This is the function of mitochondria.", isCorrect: false }, { text: "To store and transmit genetic information.", rationale: "Correct. DNA carries the instructions for building and maintaining an organism.", isCorrect: true }, { text: "To provide structural support to the cell.", rationale: "This is a function of the cytoskeleton and cell wall.", isCorrect: false }, { text: "To transport molecules across the cell membrane.", rationale: "This is a function of proteins in the cell membrane.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "A specific segment of DNA that codes for a particular protein is called a:", answerOptions: [ { text: "Chromosome", rationale: "A chromosome is a long, coiled structure of DNA.", isCorrect: false }, { text: "Gene", rationale: "Correct. A gene is a unit of heredity.", isCorrect: true }, { text: "Allele", rationale: "An allele is a specific version of a gene.", isCorrect: false }, { text: "Nucleotide", rationale: "A nucleotide is the basic building block of DNA.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'text', passage: "In genetics, some alleles are dominant and others are recessive. A dominant allele will always be expressed in the organism's appearance (phenotype) if it is present. A recessive allele will only be expressed if two copies are present.", question: "If 'B' is the dominant allele for brown eyes and 'b' is the recessive allele for blue eyes, what is the phenotype of an individual with the genotype 'Bb'?", answerOptions: [ { text: "Blue eyes", rationale: "The recessive blue eye trait is masked by the dominant brown eye trait.", isCorrect: false }, { text: "Brown eyes", rationale: "Correct. Since 'B' is dominant, only one copy is needed to express the brown eye phenotype.", isCorrect: true }, { text: "A mix of brown and blue eyes", rationale: "This is not how simple dominant-recessive inheritance works.", isCorrect: false }, { text: "Green eyes", rationale: "The genotype only contains alleles for brown and blue eyes.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "The process of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus, typical of ordinary tissue growth, is called:", answerOptions: [ { text: "Meiosis", rationale: "Meiosis produces four gamete cells with half the number of chromosomes.", isCorrect: false }, { text: "Mitosis", rationale: "Correct. Mitosis is essential for growth and repair.", isCorrect: true }, { text: "Fertilization", rationale: "Fertilization is the fusion of gametes.", isCorrect: false }, { text: "Transcription", rationale: "Transcription is the process of copying a segment of DNA into RNA.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "What is a change in the DNA sequence of an organism called?", answerOptions: [ { text: "A mutation", rationale: "Correct. Mutations can be beneficial, harmful, or neutral.", isCorrect: true }, { text: "A translation", rationale: "Translation is the process of synthesizing a protein from an mRNA template.", isCorrect: false }, { text: "A replication", rationale: "Replication is the process of copying a DNA molecule.", isCorrect: false }, { text: "An adaptation", rationale: "An adaptation is a trait that helps an organism survive and reproduce.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'image', imageUrl: "Images/ged-scince-fig-13.png", question: "This diagram, which is used to predict the genotypes of a particular cross or breeding experiment, is called a:", answerOptions: [ { text: "Pedigree chart", rationale: "A pedigree chart tracks a trait through a family tree.", isCorrect: false }, { text: "Karyotype", rationale: "A karyotype is an individual's collection of chromosomes.", isCorrect: false }, { text: "Punnett square", rationale: "Correct. It is named after Reginald C. Punnett.", isCorrect: true }, { text: "Genetic map", rationale: "A genetic map shows the relative locations of genes on a chromosome.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "An organism's observable traits, such as height, eye color, and blood type, are known as its:", answerOptions: [ { text: "Genotype", rationale: "The genotype is the set of genes in an organism's DNA.", isCorrect: false }, { text: "Phenotype", rationale: "Correct. The phenotype is the physical expression of the genotype.", isCorrect: true }, { text: "Genome", rationale: "The genome is the complete set of genetic material of an organism.", isCorrect: false }, { text: "Allele", rationale: "An allele is a variant form of a gene.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "Which molecule is responsible for carrying the genetic code from the DNA in the nucleus to the ribosome in the cytoplasm?", answerOptions: [ { text: "Transfer RNA (tRNA)", rationale: "tRNA brings amino acids to the ribosome.", isCorrect: false }, { text: "Ribosomal RNA (rRNA)", rationale: "rRNA is a component of the ribosome.", isCorrect: false }, { text: "Messenger RNA (mRNA)", rationale: "Correct. mRNA acts as a messenger, carrying the instructions for protein synthesis.", isCorrect: true }, { text: "Deoxyribonucleic acid (DNA)", rationale: "DNA stays in the nucleus.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "How many chromosomes are in a typical human body cell (somatic cell)?", answerOptions: [ { text: "23", rationale: "This is the number of chromosomes in a human gamete (sperm or egg).", isCorrect: false }, { text: "46", rationale: "Correct. Humans have 23 pairs of chromosomes.", isCorrect: true }, { text: "64", rationale: "This is the number of chromosomes in a horse.", isCorrect: false }, { text: "12", rationale: "This is the number of chromosomes in a fruit fly.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "If an organism has two identical alleles for a particular trait, it is said to be:", answerOptions: [ { text: "Homozygous", rationale: "Correct. For example, 'BB' or 'bb'.", isCorrect: true }, { text: "Heterozygous", rationale: "Heterozygous means having two different alleles, like 'Bb'.", isCorrect: false }, { text: "Dominant", rationale: "Dominant refers to an allele, not the combination of alleles.", isCorrect: false }, { text: "Recessive", rationale: "Recessive refers to an allele, not the combination of alleles.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'text', passage: "Gregor Mendel, through his work on pea plants, discovered the fundamental laws of inheritance. He deduced that genes come in pairs and are inherited as distinct units, one from each parent. Mendel tracked the segregation of parental genes and their appearance in the offspring as dominant or recessive traits.", question: "Gregor Mendel is often called the 'father of modern _______'.", answerOptions: [ { text: "Evolution", rationale: "Charles Darwin is known as the father of evolution.", isCorrect: false }, { text: "Genetics", rationale: "Correct. His experiments laid the groundwork for the field of genetics.", isCorrect: true }, { text: "Microbiology", rationale: "Louis Pasteur is considered a father of microbiology.", isCorrect: false }, { text: "Anatomy", rationale: "Andreas Vesalius is considered the father of modern human anatomy.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "The structure of DNA is a double _______.", answerOptions: [ { text: "Helix", rationale: "Correct. It resembles a twisted ladder.", isCorrect: true }, { text: "Strand", rationale: "It is composed of two strands, but the structure is a helix.", isCorrect: false }, { text: "Circle", rationale: "Bacterial DNA can be circular, but the structure is still a double helix.", isCorrect: false }, { text: "Loop", rationale: "This is not the correct term for the structure.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'knowledge', question: "Which of the following blood types is considered the 'universal donor' because it can be donated to people with any blood type?", answerOptions: [ { text: "A", rationale: "Type A can only be given to A and AB.", isCorrect: false }, { text: "B", rationale: "Type B can only be given to B and AB.", isCorrect: false }, { text: "AB", rationale: "Type AB is the universal recipient.", isCorrect: false }, { text: "O", rationale: "Correct. Type O negative blood has no antigens to trigger an immune response.", isCorrect: true } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "The process of cell division that produces gametes (sperm and egg cells) is called:", answerOptions: [ { text: "Mitosis", rationale: "Mitosis produces identical body cells.", isCorrect: false }, { text: "Meiosis", rationale: "Correct. Meiosis results in four cells with half the number of chromosomes, which is essential for sexual reproduction.", isCorrect: true }, { text: "Budding", rationale: "Budding is a form of asexual reproduction.", isCorrect: false }, { text: "Cloning", rationale: "Cloning is the process of creating a genetically identical copy.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "Down syndrome is a genetic condition caused by the presence of an extra copy of which chromosome?", answerOptions: [ { text: "Chromosome X", rationale: "An extra X chromosome causes other conditions, such as Klinefelter syndrome.", isCorrect: false }, { text: "Chromosome Y", rationale: "An extra Y chromosome causes other conditions.", isCorrect: false }, { text: "Chromosome 21", rationale: "Correct. This is why Down syndrome is also known as Trisomy 21.", isCorrect: true }, { text: "Chromosome 18", rationale: "An extra chromosome 18 causes Edwards syndrome.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "sci_genetics_heredity_set2",
                                label: "Quiz B",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "What are the four nitrogenous bases found in DNA?", answerOptions: [ { text: "Adenine, Guanine, Cytosine, Uracil", rationale: "Uracil is found in RNA, not DNA.", isCorrect: false }, { text: "Adenine, Guanine, Cytosine, Thymine", rationale: "Correct. These are the four bases that make up the genetic code.", isCorrect: true }, { text: "Adenine, Guanine, Alanine, Tyrosine", rationale: "Alanine and Tyrosine are amino acids.", isCorrect: false }, { text: "Adenine, Glucose, Cytosine, Thymine", rationale: "Glucose is a sugar.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "The passing of traits from parents to offspring is called:", answerOptions: [ { text: "Heredity", rationale: "Correct. Heredity is the study of how traits are passed on.", isCorrect: true }, { text: "Metabolism", rationale: "Metabolism refers to the chemical processes in an organism.", isCorrect: false }, { text: "Respiration", rationale: "Respiration is the process of creating energy.", isCorrect: false }, { text: "Evolution", rationale: "Evolution is the change in inherited traits over generations.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'knowledge', question: "An allele that is masked when a dominant allele is present is called:", answerOptions: [ { text: "Dominant", rationale: "A dominant allele is the one that is expressed.", isCorrect: false }, { text: "Recessive", rationale: "Correct. A recessive allele is only expressed when two copies are present.", isCorrect: true }, { text: "Heterozygous", rationale: "Heterozygous refers to having two different alleles.", isCorrect: false }, { text: "Homozygous", rationale: "Homozygous refers to having two identical alleles.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "What is the name of the sugar molecule found in DNA?", answerOptions: [ { text: "Ribose", rationale: "Ribose is the sugar found in RNA.", isCorrect: false }, { text: "Deoxyribose", rationale: "Correct. This is where DNA gets its name.", isCorrect: true }, { text: "Glucose", rationale: "Glucose is a simple sugar used for energy.", isCorrect: false }, { text: "Fructose", rationale: "Fructose is a sugar found in fruits.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "The process of making an identical copy of a DNA molecule is called:", answerOptions: [ { text: "Replication", rationale: "Correct. DNA replication occurs before cell division.", isCorrect: true }, { text: "Transcription", rationale: "Transcription is the process of making RNA from DNA.", isCorrect: false }, { text: "Translation", rationale: "Translation is the process of making a protein from RNA.", isCorrect: false }, { text: "Mutation", rationale: "A mutation is a change in the DNA sequence.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "A chart that shows the inheritance of a trait over several generations is called a:", answerOptions: [ { text: "Pedigree chart", rationale: "Correct. Pedigree charts are used to track genetic disorders.", isCorrect: true }, { text: "Punnett square", rationale: "A Punnett square predicts the outcome of a single cross.", isCorrect: false }, { text: "Karyotype", rationale: "A karyotype shows an individual's chromosomes.", isCorrect: false }, { text: "DNA fingerprint", rationale: "A DNA fingerprint is a technique used to identify individuals.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "The genetic makeup of an organism is called its:", answerOptions: [ { text: "Genotype", rationale: "Correct. The genotype is the set of genes in an organism's DNA.", isCorrect: true }, { text: "Phenotype", rationale: "The phenotype is the physical expression of the genotype.", isCorrect: false }, { text: "Genome", rationale: "The genome is the complete set of genetic material.", isCorrect: false }, { text: "Chromosome", rationale: "A chromosome is a structure that contains DNA.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "What is the process of converting the information in mRNA into a protein?", answerOptions: [ { text: "Translation", rationale: "Correct. This process occurs in the ribosomes.", isCorrect: true }, { text: "Transcription", rationale: "Transcription is the process of making RNA from DNA.", isCorrect: false }, { text: "Replication", rationale: "Replication is the process of copying DNA.", isCorrect: false }, { text: "Mutation", rationale: "A mutation is a change in the DNA sequence.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "What are the sex chromosomes for a human female?", answerOptions: [ { text: "XX", rationale: "Correct. Females have two X chromosomes.", isCorrect: true }, { text: "XY", rationale: "XY are the sex chromosomes for a human male.", isCorrect: false }, { text: "XO", rationale: "XO results in Turner syndrome.", isCorrect: false }, { text: "YY", rationale: "This is not a viable combination in humans.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "An organism with two different alleles for a trait is called:", answerOptions: [ { text: "Heterozygous", rationale: "Correct. For example, 'Bb'.", isCorrect: true }, { text: "Homozygous", rationale: "Homozygous means having two identical alleles, like 'BB' or 'bb'.", isCorrect: false }, { text: "Dominant", rationale: "Dominant refers to an allele, not the combination of alleles.", isCorrect: false }, { text: "Recessive", rationale: "Recessive refers to an allele, not the combination of alleles.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "A condition in which a person has an extra chromosome is called:", answerOptions: [ { text: "Trisomy", rationale: "Correct. Trisomy means having three copies of a chromosome instead of two.", isCorrect: true }, { text: "Monosomy", rationale: "Monosomy means having only one copy of a chromosome.", isCorrect: false }, { text: "Haploidy", rationale: "Haploidy refers to having a single set of unpaired chromosomes.", isCorrect: false }, { text: "Polyploidy", rationale: "Polyploidy refers to having more than two sets of chromosomes.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "knowledge", question: "What is the term for a version of a gene?", answerOptions: [ { text: "Allele", rationale: "Correct. An allele is a variant form of a given gene.", isCorrect: true }, { text: "Chromosome", rationale: "A chromosome is a structure containing many genes.", isCorrect: false }, { text: "Genotype", rationale: "A genotype is the combination of alleles an individual has.", isCorrect: false }, { text: "Locus", rationale: "A locus is the specific location of a gene on a chromosome.", isCorrect: false } ] },
                                    { questionNumber: 13, type: "knowledge", question: "In DNA, adenine always pairs with:", answerOptions: [ { text: "Guanine", rationale: "Guanine pairs with cytosine.", isCorrect: false }, { text: "Cytosine", rationale: "Cytosine pairs with guanine.", isCorrect: false }, { text: "Thymine", rationale: "Correct. This is known as a base pair.", isCorrect: true }, { text: "Uracil", rationale: "Uracil is found in RNA and pairs with adenine.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "Hemophilia is a sex-linked recessive trait. A woman who is a carrier for hemophilia marries a man who does not have hemophilia. What is the probability that they will have a son with hemophilia?", answerOptions: [ { text: "0%", rationale: "There is a chance, since the mother is a carrier.", isCorrect: false }, { text: "25%", rationale: "This is the probability of having a child with hemophilia, but the question asks about a son.", isCorrect: false }, { text: "50%", rationale: "Correct. There is a 50% chance that a son will inherit the recessive allele from his mother.", isCorrect: true }, { text: "100%", rationale: "The father does not have hemophilia, so he cannot pass on the allele.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "Which genetic disorder is known as 'the royal disease' because it affected the royal families of Europe?", answerOptions: [ { text: "Cystic fibrosis", rationale: "Cystic fibrosis is a common genetic disorder, but not known as 'the royal disease'.", isCorrect: false }, { text: "Hemophilia", rationale: "Correct. Hemophilia was passed down through Queen Victoria's descendants.", isCorrect: true }, { text: "Sickle cell anemia", rationale: "Sickle cell anemia is most common in people of African descent.", isCorrect: false }, { text: "Huntington's disease", rationale: "Huntington's disease is a neurodegenerative disorder.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "sci_genetics_heredity_set3",
                                label: "Quiz C",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "What is a genome?", answerOptions: [ { text: "The complete set of an organism's genetic material.", rationale: "Correct. The genome includes all of an organism's genes and other DNA.", isCorrect: true }, { text: "A single gene.", rationale: "A gene is a segment of DNA, not the entire set.", isCorrect: false }, { text: "A type of protein.", rationale: "Proteins are made based on instructions from genes, but are not the genome itself.", isCorrect: false }, { text: "The physical appearance of an organism.", rationale: "This is the phenotype.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "Who were the two scientists credited with discovering the structure of DNA?", answerOptions: [ { text: "Watson and Crick", rationale: "Correct. They published their discovery in 1953, based on work by Rosalind Franklin and others.", isCorrect: true }, { text: "Mendel and Darwin", rationale: "Mendel worked on inheritance, and Darwin on evolution.", isCorrect: false }, { text: "Pasteur and Koch", rationale: "Pasteur and Koch were pioneers in microbiology.", isCorrect: false }, { text: "Hooke and Leeuwenhoek", rationale: "Hooke and Leeuwenhoek were early pioneers in microscopy.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'knowledge', question: "An organism that has two identical alleles for a trait is called:", answerOptions: [ { text: "Homozygous", rationale: "Correct. For example, AA or aa.", isCorrect: true }, { text: "Heterozygous", rationale: "Heterozygous means having two different alleles, like Aa.", isCorrect: false }, { text: "Hybrid", rationale: "A hybrid is the offspring of two different species or varieties.", isCorrect: false }, { text: "Purebred", rationale: "Purebred is another term for homozygous.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "What is the term for a trait that is controlled by a gene on a sex chromosome?", answerOptions: [ { text: "Sex-linked trait", rationale: "Correct. Examples include color blindness and hemophilia.", isCorrect: true }, { text: "Dominant trait", rationale: "A dominant trait is one that is expressed when at least one copy of the allele is present.", isCorrect: false }, { text: "Recessive trait", rationale: "A recessive trait is one that is only expressed when two copies of the allele are present.", isCorrect: false }, { text: "Polygenic trait", rationale: "A polygenic trait is one that is controlled by multiple genes.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "What is the process of creating a genetically identical copy of an organism?", answerOptions: [ { text: "Cloning", rationale: "Correct. Cloning can occur naturally or be done in a lab.", isCorrect: true }, { text: "Fertilization", rationale: "Fertilization is the fusion of gametes.", isCorrect: false }, { text: "Meiosis", rationale: "Meiosis is the process of creating gametes.", isCorrect: false }, { text: "Mitosis", rationale: "Mitosis is the process of cell division for growth and repair.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "What is a carrier?", answerOptions: [ { text: "An individual who has a genetic disorder.", rationale: "A carrier has the allele for a disorder, but does not necessarily have the disorder itself.", isCorrect: false }, { text: "An individual who is heterozygous for a recessive genetic disorder.", rationale: "Correct. A carrier has one copy of the recessive allele and can pass it on to their offspring.", isCorrect: true }, { text: "An individual who is homozygous for a dominant genetic disorder.", rationale: "This individual would have the disorder.", isCorrect: false }, { text: "An individual who is immune to a genetic disorder.", rationale: "This is not the correct definition of a carrier.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "What is the term for the manipulation of an organism's genes using biotechnology?", answerOptions: [ { text: "Genetic engineering", rationale: "Correct. Genetic engineering is used in medicine, agriculture, and research.", isCorrect: true }, { text: "Artificial selection", rationale: "Artificial selection is the process of breeding organisms for desirable traits.", isCorrect: false }, { text: "Natural selection", rationale: "Natural selection is the process by which organisms better adapted to their environment tend to survive and reproduce.", isCorrect: false }, { text: "Gene therapy", rationale: "Gene therapy is a specific type of genetic engineering used to treat diseases.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "What is the Human Genome Project?", answerOptions: [ { text: "A project to create a human clone.", rationale: "The Human Genome Project was not about cloning.", isCorrect: false }, { text: "A project to map and sequence all of the genes in the human genome.", rationale: "Correct. The project was completed in 2003.", isCorrect: true }, { text: "A project to cure all genetic diseases.", rationale: "The project has helped in the understanding and treatment of genetic diseases, but has not cured all of them.", isCorrect: false }, { text: "A project to create a new species of human.", rationale: "This is not the purpose of the Human Genome Project.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "What is the term for a trait that is controlled by multiple genes?", answerOptions: [ { text: "Polygenic trait", rationale: "Correct. Examples include height, skin color, and eye color.", isCorrect: true }, { text: "Monogenic trait", rationale: "A monogenic trait is controlled by a single gene.", isCorrect: false }, { text: "Recessive trait", rationale: "A recessive trait is one that is only expressed when two copies of the allele are present.", isCorrect: false }, { text: "Dominant trait", rationale: "A dominant trait is one that is expressed when at least one copy of the allele is present.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "In RNA, adenine pairs with:", answerOptions: [ { text: "Thymine", rationale: "Thymine is found in DNA, not RNA.", isCorrect: false }, { text: "Uracil", rationale: "Correct. In RNA, uracil replaces thymine.", isCorrect: true }, { text: "Guanine", rationale: "Guanine pairs with cytosine.", isCorrect: false }, { text: "Cytosine", rationale: "Cytosine pairs with guanine.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "Which of the following is an example of a genetic mutation?", answerOptions: [ { text: "A broken bone.", rationale: "A broken bone is an injury, not a genetic mutation.", isCorrect: false }, { text: "A suntan.", rationale: "A suntan is a change in skin color due to sun exposure, not a genetic mutation.", isCorrect: false }, { text: "Albinism.", rationale: "Correct. Albinism is a genetic disorder characterized by a lack of pigment in the skin, hair, and eyes.", isCorrect: true }, { text: "A scar.", rationale: "A scar is a mark left on the skin after an injury has healed.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "What is a karyotype?", answerOptions: [ { text: "A picture of an individual's chromosomes.", rationale: "Correct. A karyotype can be used to diagnose chromosomal abnormalities.", isCorrect: true }, { text: "A type of cell.", rationale: "A karyotype is a property of a cell, but not the cell itself.", isCorrect: false }, { text: "A genetic disease.", rationale: "A karyotype can be used to diagnose a genetic disease, but is not the disease itself.", isCorrect: false }, { text: "A type of protein.", rationale: "Proteins are made based on instructions from genes.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'knowledge', question: "What is the term for a diagram that shows the relationships between family members and the inheritance of a particular trait?", answerOptions: [ { text: "Pedigree chart", rationale: "Correct. Pedigree charts are used to track genetic traits through generations.", isCorrect: true }, { text: "Punnett square", rationale: "A Punnett square predicts the outcome of a single cross.", isCorrect: false }, { text: "Family tree", rationale: "A family tree is a more general term for a diagram showing family relationships.", isCorrect: false }, { text: "Genetic map", rationale: "A genetic map shows the location of genes on a chromosome.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "Cystic fibrosis is a recessive genetic disorder. If two parents are carriers for cystic fibrosis, what is the probability that they will have a child with the disorder?", answerOptions: [ { text: "0%", rationale: "Since both parents are carriers, there is a chance they will have a child with the disorder.", isCorrect: false }, { text: "25%", rationale: "Correct. There is a 1 in 4 chance that the child will inherit two copies of the recessive allele.", isCorrect: true }, { text: "50%", rationale: "There is a 50% chance the child will be a carrier, like the parents.", isCorrect: false }, { text: "100%", rationale: "The child would need to inherit the recessive allele from both parents.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "What is the term for the process of using a person's DNA to identify them?", answerOptions: [ { text: "DNA fingerprinting", rationale: "Correct. DNA fingerprinting is used in forensics and paternity testing.", isCorrect: true }, { text: "Genetic screening", rationale: "Genetic screening is the process of testing for genetic disorders.", isCorrect: false }, { text: "Gene therapy", rationale: "Gene therapy is the process of treating genetic disorders.", isCorrect: false }, { text: "Cloning", rationale: "Cloning is the process of creating a genetically identical copy.", isCorrect: false } ] }
                                ]
                            }
                        ]
                    }
                ]
            },
            "Physical Science": {
                "description": "The study of matter, energy, and the fundamental forces of nature.",
                "topics": [
                    {
                        id: "sci_physical_science_basics",
                        title: "Force, Motion, and Energy",
                        description: "Newton's laws, simple machines, and the conservation of energy.",
                        quizzes: [
                            {
                                quizId: "sci_physical_science_basics_set1",
                                label: "Quiz A",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "Which of Newton's laws of motion is also known as the law of inertia?", answerOptions: [ { text: "First Law", rationale: "Correct. The first law states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.", isCorrect: true }, { text: "Second Law", rationale: "The second law relates force, mass, and acceleration (F=ma).", isCorrect: false }, { text: "Third Law", rationale: "The third law states that for every action, there is an equal and opposite reaction.", isCorrect: false }, { text: "Law of Gravitation", rationale: "The law of gravitation describes the attraction between two masses.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "What is the unit of force in the International System of Units (SI)?", answerOptions: [ { text: "Joule", rationale: "The joule is the unit of energy.", isCorrect: false }, { text: "Watt", rationale: "The watt is the unit of power.", isCorrect: false }, { text: "Newton", rationale: "Correct. It is named after Isaac Newton.", isCorrect: true }, { text: "Kilogram", rationale: "The kilogram is the unit of mass.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'text', passage: "Energy cannot be created or destroyed, but it can be transferred from one form to another. For example, when you turn on a light bulb, electrical energy is converted into light energy and heat energy.", question: "This principle is known as the law of:", answerOptions: [ { text: "Conservation of Mass", rationale: "The law of conservation of mass states that mass is not created or destroyed in a chemical reaction.", isCorrect: false }, { text: "Conservation of Energy", rationale: "Correct. This is a fundamental principle of physics.", isCorrect: true }, { text: "Thermodynamics", rationale: "This principle is part of the first law of thermodynamics, but 'Conservation of Energy' is the more specific name.", isCorrect: false }, { text: "Relativity", rationale: "Einstein's theory of relativity deals with gravity and the relationship between space and time.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "A simple machine that consists of a rigid bar that pivots around a fixed point is called a:", answerOptions: [ { text: "Pulley", rationale: "A pulley uses a wheel and rope to lift heavy objects.", isCorrect: false }, { text: "Lever", rationale: "Correct. A seesaw is an example of a lever.", isCorrect: true }, { text: "Wedge", rationale: "A wedge is used to separate two objects.", isCorrect: false }, { text: "Screw", rationale: "A screw is an inclined plane wrapped around a cylinder.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "What is the energy of motion called?", answerOptions: [ { text: "Potential energy", rationale: "Potential energy is stored energy.", isCorrect: false }, { text: "Kinetic energy", rationale: "Correct. The faster an object moves, the more kinetic energy it has.", isCorrect: true }, { text: "Chemical energy", rationale: "Chemical energy is stored in the bonds of chemical compounds.", isCorrect: false }, { text: "Thermal energy", rationale: "Thermal energy is related to the temperature of an object.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'image', imageUrl: "Images/ged-scince-fig-8.png", question: "If the person pushes the box with a force of 50 Newtons and the box moves 5 meters, how much work has been done?", answerOptions: [ { text: "10 Joules", rationale: "Work is calculated as Force x Distance, not Force / Distance.", isCorrect: false }, { text: "250 Joules", rationale: "Correct. Work = 50 N * 5 m = 250 J.", isCorrect: true }, { text: "55 Joules", rationale: "This is the sum of the force and distance, not the product.", isCorrect: false }, { text: "0 Joules", rationale: "Work is done because the box moved.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "What is the rate at which work is done or energy is transferred?", answerOptions: [ { text: "Force", rationale: "Force is a push or a pull.", isCorrect: false }, { text: "Power", rationale: "Correct. Power is measured in watts.", isCorrect: true }, { text: "Momentum", rationale: "Momentum is the product of mass and velocity.", isCorrect: false }, { text: "Inertia", rationale: "Inertia is the resistance to a change in motion.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "Which of the following is an example of a non-contact force?", answerOptions: [ { text: "Friction", rationale: "Friction is a contact force.", isCorrect: false }, { text: "Tension", rationale: "Tension is a contact force.", isCorrect: false }, { text: "Gravity", rationale: "Correct. Gravity acts over a distance.", isCorrect: true }, { text: "Air resistance", rationale: "Air resistance is a contact force.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "What is the tendency of an object to resist a change in its state of motion?", answerOptions: [ { text: "Inertia", rationale: "Correct. The more mass an object has, the more inertia it has.", isCorrect: true }, { text: "Acceleration", rationale: "Acceleration is the rate of change of velocity.", isCorrect: false }, { text: "Velocity", rationale: "Velocity is the rate of change of position.", isCorrect: false }, { text: "Weight", rationale: "Weight is the force of gravity on an object.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "Which type of energy is stored in the nucleus of an atom?", answerOptions: [ { text: "Nuclear energy", rationale: "Correct. This energy is released during nuclear reactions.", isCorrect: true }, { text: "Chemical energy", rationale: "Chemical energy is stored in chemical bonds.", isCorrect: false }, { text: "Elastic energy", rationale: "Elastic energy is stored in objects that are stretched or compressed.", isCorrect: false }, { text: "Gravitational potential energy", rationale: "This is energy stored due to an object's height.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "According to Newton's second law of motion, if you double the force on an object, its acceleration will:", answerOptions: [ { text: "Double", rationale: "Correct. Acceleration is directly proportional to force (F=ma).", isCorrect: true }, { text: "Be cut in half", rationale: "This would be true if you doubled the mass.", isCorrect: false }, { text: "Remain the same", rationale: "The acceleration will change if the force changes.", isCorrect: false }, { text: "Be quadrupled", rationale: "This is not the correct relationship.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "Which of the following is a unit of power?", answerOptions: [ { text: "Watt", rationale: "Correct. One watt is equal to one joule per second.", isCorrect: true }, { text: "Joule", rationale: "The joule is the unit of energy.", isCorrect: false }, { text: "Newton", rationale: "The newton is the unit of force.", isCorrect: false }, { text: "Volt", rationale: "The volt is the unit of electric potential.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'knowledge', question: "An object at rest has:", answerOptions: [ { text: "Kinetic energy", rationale: "An object at rest has zero kinetic energy.", isCorrect: false }, { text: "Potential energy", rationale: "Correct. An object can have stored energy even when it is not moving.", isCorrect: true }, { text: "Momentum", rationale: "An object at rest has zero momentum.", isCorrect: false }, { text: "Velocity", rationale: "An object at rest has zero velocity.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "What is the force that opposes motion between two surfaces that are in contact?", answerOptions: [ { text: "Gravity", rationale: "Gravity is a force of attraction.", isCorrect: false }, { text: "Friction", rationale: "Correct. Friction converts kinetic energy into heat.", isCorrect: true }, { text: "Inertia", rationale: "Inertia is a property of matter, not a force.", isCorrect: false }, { text: "Tension", rationale: "Tension is a pulling force.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "Newton's third law of motion is often stated as: 'For every action, there is an equal and opposite _______.'", answerOptions: [ { text: "Reaction", rationale: "Correct. This is the law of action-reaction.", isCorrect: true }, { text: "Force", rationale: "While a reaction is a force, 'reaction' is the specific term used in the law.", isCorrect: false }, { text: "Acceleration", rationale: "Acceleration is the result of a net force.", isCorrect: false }, { text: "Movement", rationale: "Movement is a change in position.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "sci_physical_science_basics_set2",
                                label: "Quiz B",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "What is the acceleration of a 10 kg object if a force of 50 N is applied to it?", answerOptions: [ { text: "5 m/s²", rationale: "Correct. According to Newton's second law, Acceleration = Force / Mass = 50 N / 10 kg = 5 m/s².", isCorrect: true }, { text: "0.2 m/s²", rationale: "This is the result of dividing mass by force.", isCorrect: false }, { text: "500 m/s²", rationale: "This is the result of multiplying force and mass.", isCorrect: false }, { text: "10 m/s²", rationale: "This is the mass of the object, not the acceleration.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "Energy that is stored due to an object's position or height is called:", answerOptions: [ { text: "Kinetic energy", rationale: "Kinetic energy is the energy of motion.", isCorrect: false }, { text: "Gravitational potential energy", rationale: "Correct. The higher an object is, the more gravitational potential energy it has.", isCorrect: true }, { text: "Elastic potential energy", rationale: "This is energy stored in objects that are stretched or compressed.", isCorrect: false }, { text: "Chemical energy", rationale: "Chemical energy is stored in chemical bonds.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'knowledge', question: "Which of the following is an example of a third-class lever?", answerOptions: [ { text: "A seesaw", rationale: "A seesaw is a first-class lever.", isCorrect: false }, { text: "A wheelbarrow", rationale: "A wheelbarrow is a second-class lever.", isCorrect: false }, { text: "A pair of tweezers", rationale: "Correct. In a third-class lever, the effort is between the fulcrum and the load.", isCorrect: true }, { text: "A bottle opener", rationale: "A bottle opener is a second-class lever.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "The sum of the kinetic and potential energy in an object is called:", answerOptions: [ { text: "Mechanical energy", rationale: "Correct. This is the total energy of motion and position.", isCorrect: true }, { text: "Thermal energy", rationale: "Thermal energy is related to temperature.", isCorrect: false }, { text: "Nuclear energy", rationale: "Nuclear energy is stored in the nucleus of an atom.", isCorrect: false }, { text: "Chemical energy", rationale: "Chemical energy is stored in chemical bonds.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "If a car accelerates from 0 to 60 mph, it is undergoing:", answerOptions: [ { text: "A change in velocity", rationale: "Correct. Acceleration is the rate of change of velocity.", isCorrect: true }, { text: "A change in mass", rationale: "The mass of the car does not change.", isCorrect: false }, { text: "A change in direction", rationale: "The car may be changing direction, but the primary change described is in speed.", isCorrect: false }, { text: "Constant velocity", rationale: "The velocity is changing, not constant.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "What is the momentum of a 5 kg object moving at a velocity of 2 m/s?", answerOptions: [ { text: "10 kg⋅m/s", rationale: "Correct. Momentum = Mass x Velocity = 5 kg * 2 m/s = 10 kg⋅m/s.", isCorrect: true }, { text: "2.5 kg⋅m/s", rationale: "This is the result of dividing mass by velocity.", isCorrect: false }, { text: "7 kg⋅m/s", rationale: "This is the sum of mass and velocity.", isCorrect: false }, { text: "0.4 kg⋅m/s", rationale: "This is the result of dividing velocity by mass.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "Which of the following is a type of friction?", answerOptions: [ { text: "Sliding friction", rationale: "Correct. This occurs when two solid surfaces slide over each other.", isCorrect: true }, { text: "Gravity", rationale: "Gravity is a fundamental force, not a type of friction.", isCorrect: false }, { text: "Tension", rationale: "Tension is a pulling force.", isCorrect: false }, { text: "Inertia", rationale: "Inertia is a property of matter, not a force.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "The energy stored in a stretched rubber band is an example of:", answerOptions: [ { text: "Elastic potential energy", rationale: "Correct. This is energy stored as a result of deformation of an elastic object.", isCorrect: true }, { text: "Gravitational potential energy", rationale: "This is energy stored due to height.", isCorrect: false }, { text: "Kinetic energy", rationale: "The rubber band is not in motion.", isCorrect: false }, { text: "Chemical energy", rationale: "Chemical energy is stored in chemical bonds.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "According to Newton's third law, if you push on a wall, the wall:", answerOptions: [ { text: "Pushes back on you with the same force.", rationale: "Correct. This is the law of action-reaction.", isCorrect: true }, { text: "Pushes back on you with a smaller force.", rationale: "The forces are equal.", isCorrect: false }, { text: "Pushes back on you with a larger force.", rationale: "The forces are equal.", isCorrect: false }, { text: "Does not push back on you.", rationale: "The wall does push back on you.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "The transfer of heat through the movement of fluids (liquids or gases) is called:", answerOptions: [ { text: "Conduction", rationale: "Conduction is the transfer of heat through direct contact.", isCorrect: false }, { text: "Convection", rationale: "Correct. Boiling water is an example of convection.", isCorrect: true }, { text: "Radiation", rationale: "Radiation is the transfer of heat through electromagnetic waves.", isCorrect: false }, { text: "Insulation", rationale: "Insulation is a material that reduces heat transfer.", isCorrect: false } ] },
                                    { questionNumber: 11, type: 'knowledge', question: "What is the weight of a 10 kg object on Earth? (The acceleration due to gravity is approximately 9.8 m/s²).", answerOptions: [ { text: "98 N", rationale: "Correct. Weight = Mass x Acceleration due to gravity = 10 kg * 9.8 m/s² = 98 N.", isCorrect: true }, { text: "10 N", rationale: "This is the mass of the object, not the weight.", isCorrect: false }, { text: "0.98 N", rationale: "This is the result of a calculation error.", isCorrect: false }, { text: "19.8 N", rationale: "This is the sum of the mass and acceleration.", isCorrect: false } ] },
                                    { questionNumber: 12, type: 'knowledge', question: "Which of the following is NOT a simple machine?", answerOptions: [ { text: "A bicycle", rationale: "Correct. A bicycle is a compound machine made up of several simple machines.", isCorrect: true }, { text: "An inclined plane", rationale: "An inclined plane is a simple machine.", isCorrect: false }, { text: "A wedge", rationale: "A wedge is a simple machine.", isCorrect: false }, { text: "A screw", rationale: "A screw is a simple machine.", isCorrect: false } ] },
                                    { questionNumber: 13, type: 'knowledge', question: "The energy from the sun reaches the Earth primarily through:", answerOptions: [ { text: "Radiation", rationale: "Correct. The sun emits electromagnetic radiation, including light and heat.", isCorrect: true }, { text: "Conduction", rationale: "Conduction requires direct contact, and space is a vacuum.", isCorrect: false }, { text: "Convection", rationale: "Convection requires a medium, and space is a vacuum.", isCorrect: false }, { text: "Reflection", rationale: "Reflection is the bouncing of light, not the primary mode of energy transfer.", isCorrect: false } ] },
                                    { questionNumber: 14, type: 'knowledge', question: "A measure of an object's inertia is its:", answerOptions: [ { text: "Mass", rationale: "Correct. The more mass an object has, the more it resists changes in motion.", isCorrect: true }, { text: "Weight", rationale: "Weight is the force of gravity on an object.", isCorrect: false }, { text: "Volume", rationale: "Volume is the amount of space an object occupies.", isCorrect: false }, { text: "Density", rationale: "Density is mass per unit volume.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "If a ball is thrown upwards, its kinetic energy _______ and its potential energy _______. ", answerOptions: [ { text: "increases, decreases", rationale: "This is what happens when the ball falls.", isCorrect: false }, { text: "decreases, increases", rationale: "Correct. As the ball slows down, its kinetic energy is converted into potential energy.", isCorrect: true }, { text: "increases, increases", rationale: "This would violate the law of conservation of energy.", isCorrect: false }, { text: "decreases, decreases", rationale: "This would violate the law of conservation of energy.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "sci_physical_science_basics_set3",
                                label: "Quiz C",
                                questions: [
                                    { questionNumber: 1, type: 'knowledge', question: "A force is a:", answerOptions: [ { text: "Push or a pull", rationale: "Correct. A force can cause an object to accelerate.", isCorrect: true }, { text: "Property of matter", rationale: "This is a description of inertia or mass.", isCorrect: false }, { text: "Measure of energy", rationale: "Energy is the ability to do work.", isCorrect: false }, { text: "Change in position", rationale: "This is displacement or movement.", isCorrect: false } ] },
                                    { questionNumber: 2, type: 'knowledge', question: "What is the net force on an object if it is not accelerating?", answerOptions: [ { text: "Zero", rationale: "Correct. If the net force is zero, the object is either at rest or moving at a constant velocity.", isCorrect: true }, { text: "Equal to its weight", rationale: "This is true if the object is at rest on a surface, but not in all cases.", isCorrect: false }, { text: "Increasing", rationale: "If the force were increasing, the object would be accelerating.", isCorrect: false }, { text: "Decreasing", rationale: "If the force were decreasing, the object would be decelerating.", isCorrect: false } ] },
                                    { questionNumber: 3, type: 'knowledge', question: "Which of the following is a fossil fuel?", answerOptions: [ { text: "Wood", rationale: "Wood is a biofuel, but not a fossil fuel.", isCorrect: false }, { text: "Coal", rationale: "Correct. Coal is formed from the remains of ancient plants.", isCorrect: true }, { text: "Uranium", rationale: "Uranium is a source of nuclear energy.", isCorrect: false }, { text: "Ethanol", rationale: "Ethanol is a biofuel made from crops like corn.", isCorrect: false } ] },
                                    { questionNumber: 4, type: 'knowledge', question: "The ability to do work is called:", answerOptions: [ { text: "Energy", rationale: "Correct. Work and energy are measured in the same unit (joules).", isCorrect: true }, { text: "Power", rationale: "Power is the rate at which work is done.", isCorrect: false }, { text: "Force", rationale: "Force is a push or a pull.", isCorrect: false }, { text: "Momentum", rationale: "Momentum is the product of mass and velocity.", isCorrect: false } ] },
                                    { questionNumber: 5, type: 'knowledge', question: "What is the speed of an object?", answerOptions: [ { text: "The rate of change of its velocity", rationale: "This is acceleration.", isCorrect: false }, { text: "The rate of change of its position", rationale: "Correct. Speed is distance divided by time.", isCorrect: true }, { text: "The product of its mass and velocity", rationale: "This is momentum.", isCorrect: false }, { text: "The force of gravity on it", rationale: "This is weight.", isCorrect: false } ] },
                                    { questionNumber: 6, type: 'knowledge', question: "Which of the following is a vector quantity (has both magnitude and direction)?", answerOptions: [ { text: "Velocity", rationale: "Correct. Velocity includes both speed and direction.", isCorrect: true }, { text: "Speed", rationale: "Speed only has magnitude.", isCorrect: false }, { text: "Mass", rationale: "Mass only has magnitude.", isCorrect: false }, { text: "Temperature", rationale: "Temperature only has magnitude.", isCorrect: false } ] },
                                    { questionNumber: 7, type: 'knowledge', question: "An inclined plane wrapped around a cylinder is a:", answerOptions: [ { text: "Screw", rationale: "Correct. A screw converts rotational motion to linear motion.", isCorrect: true }, { text: "Wedge", rationale: "A wedge is used to separate objects.", isCorrect: false }, { text: "Lever", rationale: "A lever pivots around a fulcrum.", isCorrect: false }, { text: "Pulley", rationale: "A pulley uses a wheel and rope.", isCorrect: false } ] },
                                    { questionNumber: 8, type: 'knowledge', question: "The energy of an object due to its motion is:", answerOptions: [ { text: "Kinetic energy", rationale: "Correct. The faster an object moves, the more kinetic energy it has.", isCorrect: true }, { text: "Potential energy", rationale: "Potential energy is stored energy.", isCorrect: false }, { text: "Chemical energy", rationale: "Chemical energy is stored in chemical bonds.", isCorrect: false }, { text: "Thermal energy", rationale: "Thermal energy is related to temperature.", isCorrect: false } ] },
                                    { questionNumber: 9, type: 'knowledge', question: "What is the SI unit of work?", answerOptions: [ { text: "Joule", rationale: "Correct. Work and energy are both measured in joules.", isCorrect: true }, { text: "Watt", rationale: "The watt is the unit of power.", isCorrect: false }, { text: "Newton", rationale: "The newton is the unit of force.", isCorrect: false }, { text: "Pascal", rationale: "The pascal is the unit of pressure.", isCorrect: false } ] },
                                    { questionNumber: 10, type: 'knowledge', question: "The transfer of heat by direct contact is called:", answerOptions: [ { text: "Conduction", rationale: "Correct. An example is a pan on a hot stove.", isCorrect: true }, { text: "Convection", rationale: "Convection is the transfer of heat through fluids.", isCorrect: false }, { text: "Radiation", rationale: "Radiation is the transfer of heat through electromagnetic waves.", isCorrect: false }, { text: "Insulation", rationale: "Insulation reduces heat transfer.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "knowledge", question: "If you drop a bowling ball and a feather from the same height in a vacuum, which will hit the ground first?", answerOptions: [ { text: "The bowling ball", rationale: "In a vacuum, there is no air resistance, so all objects fall at the same rate.", isCorrect: false }, { text: "The feather", rationale: "In a vacuum, there is no air resistance, so all objects fall at the same rate.", isCorrect: false }, { text: "They will hit the ground at the same time.", rationale: "Correct. This is because the acceleration due to gravity is the same for all objects, regardless of their mass.", isCorrect: true }, { text: "It is impossible to tell.", rationale: "It is possible to tell based on the principles of physics.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "knowledge", question: "What is the formula for work?", answerOptions: [ { text: "Work = Force x Distance", rationale: "Correct. Work is done when a force causes an object to move a certain distance.", isCorrect: true }, { text: "Work = Force / Distance", rationale: "This is not the correct formula.", isCorrect: false }, { text: "Work = Mass x Acceleration", rationale: "This is the formula for force.", isCorrect: false }, { text: "Work = Power / Time", rationale: "This is not the correct formula.", isCorrect: false } ] },
                                    { questionNumber: 13, type: "knowledge", question: "Which of the following is a renewable energy source?", answerOptions: [ { text: "Natural gas", rationale: "Natural gas is a non-renewable fossil fuel.", isCorrect: false }, { text: "Wind energy", rationale: "Correct. Wind is a renewable resource that can be used to generate electricity.", isCorrect: true }, { text: "Petroleum", rationale: "Petroleum is a non-renewable fossil fuel.", isCorrect: false }, { text: "Uranium", rationale: "Uranium is a non-renewable resource used for nuclear energy.", isCorrect: false } ] },
                                    { questionNumber: 14, type: "knowledge", question: "A book is sitting on a table. The force of gravity is pulling the book down. What is the reaction force?", answerOptions: [ { text: "The table pushing up on the book.", rationale: "This is the normal force, not the reaction force to gravity.", isCorrect: false }, { text: "The book pulling up on the Earth.", rationale: "Correct. According to Newton's third law, the book exerts an equal and opposite gravitational force on the Earth.", isCorrect: true }, { text: "The air pressure pushing down on the book.", rationale: "Air pressure is a separate force.", isCorrect: false }, { text: "There is no reaction force.", rationale: "Every action has an equal and opposite reaction.", isCorrect: false } ] },
                                    { questionNumber: 15, type: 'knowledge', question: "Temperature is a measure of the average _______ of the particles in a substance.", answerOptions: [ { text: "Kinetic energy", rationale: "Correct. The faster the particles move, the higher the temperature.", isCorrect: true }, { text: "Potential energy", rationale: "Potential energy is stored energy.", isCorrect: false }, { text: "Mass", rationale: "Mass is a measure of the amount of matter.", isCorrect: false }, { text: "Volume", rationale: "Volume is the amount of space an object occupies.", isCorrect: false } ] }
                                ]
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
                topics: [
                    {
                        id: "math_quant_basics",
                        quizzes: [
                            {
                                quizId: "math_quant_basics_set1",
                                label: "Quiz A",
                                description: "Master operations with whole numbers, fractions, and decimals in real-world contexts.",
                                questionSourceTopicId: "math_quant_basics",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "Compute \(47 + 58\).", answerOptions: [ { text: "\(100\)", rationale: "This sums \(47\) with \(53\), not \(58\).", isCorrect: false }, { text: "\(103\)", rationale: "This adds \(45\) and \(58\) instead of \(47\) and \(58\).", isCorrect: false }, { text: "\(105\)", rationale: "Correct. \(47 + 58 = 105\).", isCorrect: true }, { text: "\(115\)", rationale: "This adds an extra ten to the total.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "knowledge", question: "Evaluate \(213 - 96\).", answerOptions: [ { text: "\(107\)", rationale: "This subtracts \(106\) instead of \(96\).", isCorrect: false }, { text: "\(117\)", rationale: "Correct. \(213 - 96 = 117\).", isCorrect: true }, { text: "\(123\)", rationale: "This subtracts only \(90\).", isCorrect: false }, { text: "\(307\)", rationale: "This adds the numbers instead of subtracting.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "Find the product \(3.2 \times 1.5\).", answerOptions: [ { text: "\(4.7\)", rationale: "This adds the numbers instead of multiplying them.", isCorrect: false }, { text: "\(4.8\)", rationale: "Correct. \(3.2 \times 1.5 = 4.8\).", isCorrect: true }, { text: "\(4.05\)", rationale: "This misplaces the decimal when multiplying.", isCorrect: false }, { text: "\(5.2\)", rationale: "This uses \(3.2 + 2\) instead of the given product.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "knowledge", question: "Evaluate \(6 \times (4 + 3)\).", answerOptions: [ { text: "\(18\)", rationale: "This multiplies \(6\) and \(3\) before adding inside the parentheses.", isCorrect: false }, { text: "\(24\)", rationale: "This omits adding the \(3\) before multiplying.", isCorrect: false }, { text: "\(42\)", rationale: "Correct. Add inside the parentheses first to get \(7\), then multiply by \(6\).", isCorrect: true }, { text: "\(45\)", rationale: "This multiplies \(6\times4\) and then adds \(21\) instead of \(3\).", isCorrect: false } ] },
                                    { questionNumber: 5, type: "knowledge", question: "Compute \(\tfrac{5}{6} + \tfrac{1}{3}\).", answerOptions: [ { text: "\(\tfrac{1}{2}\)", rationale: "This subtracts the fractions instead of adding them.", isCorrect: false }, { text: "\(\tfrac{2}{3}\)", rationale: "This converts only one fraction to sixths.", isCorrect: false }, { text: "\(\tfrac{7}{6}\)", rationale: "Correct. Convert \(\tfrac{1}{3}\) to \(\tfrac{2}{6}\) and add to \(\tfrac{5}{6}\).", isCorrect: true }, { text: "\(\tfrac{8}{6}\)", rationale: "This adds the numerators but does not simplify properly.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "knowledge", question: "Express \(1\tfrac{7}{8}\) as an improper fraction.", answerOptions: [ { text: "\(\tfrac{7}{8}\)", rationale: "This keeps only the fractional part and ignores the whole number.", isCorrect: false }, { text: "\(\tfrac{15}{8}\)", rationale: "Correct. \(1 \times 8 + 7 = 15\).", isCorrect: true }, { text: "\(\tfrac{8}{15}\)", rationale: "This inverts the correct fraction.", isCorrect: false }, { text: "\(\tfrac{17}{8}\)", rationale: "This double-counts the numerator before combining.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "knowledge", question: "Find the difference \(9.75 - 4.28\).", answerOptions: [ { text: "\(5.37\)", rationale: "This subtracts \(4.38\) instead of \(4.28\).", isCorrect: false }, { text: "\(5.47\)", rationale: "Correct. Align the decimals to subtract accurately.", isCorrect: true }, { text: "\(5.63\)", rationale: "This adds the numbers instead of subtracting them.", isCorrect: false }, { text: "\(6.47\)", rationale: "This subtracts only \(3.28\).", isCorrect: false } ] },
                                    { questionNumber: 8, type: "applied", question: "A bag of 6 oranges costs \$4.50. What is the price per orange?", answerOptions: [ { text: "\$0.60", rationale: "This divides the total cost by 7.5 oranges.", isCorrect: false }, { text: "\$0.70", rationale: "This uses \$4.20 as the cost before dividing.", isCorrect: false }, { text: "\$0.75", rationale: "Correct. \$4.50 \div 6 = \$0.75.", isCorrect: true }, { text: "\$0.80", rationale: "This rounds the cost up before dividing by 6.", isCorrect: false } ] }
                                ]
                            },
                            {
                                quizId: "math_quant_basics_set2",
                                label: "Quiz B",
                                description: "Practice with ratios, proportions, and percentages.",
                                questionSourceTopicId: "math_quant_basics",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "Simplify \(\tfrac{42}{56}\).", answerOptions: [ { text: "\(\tfrac{2}{3}\)", rationale: "This leaves a common factor of \(7\) in the fraction.", isCorrect: false }, { text: "\(\tfrac{3}{4}\)", rationale: "Correct. Divide both numerator and denominator by \(14\).", isCorrect: true }, { text: "\(\tfrac{4}{7}\)", rationale: "This inverts the simplified fraction.", isCorrect: false }, { text: "\(\tfrac{6}{7}\)", rationale: "This divides only the denominator by \(8\).", isCorrect: false } ] },
                                    { questionNumber: 2, type: "applied", question: "A map scale shows that \(1\) inch represents \(12\) miles. How many miles does \(3.5\) inches represent?", answerOptions: [ { text: "\(30\) \text{ miles}", rationale: "This multiplies by \(2.5\) inches instead of \(3.5\).", isCorrect: false }, { text: "\(36\) \text{ miles}", rationale: "This assumes only \(3\) inches were measured.", isCorrect: false }, { text: "\(42\) \text{ miles}", rationale: "Correct. \(3.5 \times 12 = 42\).", isCorrect: true }, { text: "\(48\) \text{ miles}", rationale: "This uses \(4\) inches for the measurement.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "Find \(18\%\) of \(240\).", answerOptions: [ { text: "\(36\)", rationale: "This corresponds to \(15\%\) of \(240\).", isCorrect: false }, { text: "\(40.8\)", rationale: "This applies \(17\%\) instead of \(18\%\).", isCorrect: false }, { text: "\(43.2\)", rationale: "Correct. \(240 \times 0.18 = 43.2\).", isCorrect: true }, { text: "\(52\)", rationale: "This treats the percent as a little over \(21\%\).", isCorrect: false } ] },
                                    { questionNumber: 4, type: "knowledge", question: "Convert \(0.375\) to a fraction in simplest form.", answerOptions: [ { text: "\(\tfrac{3}{8}\)", rationale: "Correct. \(0.375 = \tfrac{375}{1000} = \tfrac{3}{8}\).", isCorrect: true }, { text: "\(\tfrac{3}{5}\)", rationale: "This equals \(0.6\).", isCorrect: false }, { text: "\(\tfrac{5}{8}\)", rationale: "This equals \(0.625\).", isCorrect: false }, { text: "\(\tfrac{37}{100}\)", rationale: "This truncates a digit and is not fully simplified.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "applied", question: "A coat originally costs \$96 and is discounted by \(25\%\). What is the sale price?", answerOptions: [ { text: "\$64", rationale: "This removes \(\tfrac{1}{3}\) of the price instead of \(25\%\).", isCorrect: false }, { text: "\$72", rationale: "Correct. The discount is \$24, so \$96 - \$24 = \$72.", isCorrect: true }, { text: "\$74", rationale: "This subtracts only \$22 from the original cost.", isCorrect: false }, { text: "\$84", rationale: "This subtracts just \(12.5\%\) of the price.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "applied", question: "In a class of \(32\) students, the ratio of boys to girls is \(3:5\). How many boys are in the class?", answerOptions: [ { text: "\(12\)", rationale: "Correct. There are \(3 + 5 = 8\) equal parts, and \(\tfrac{3}{8} \times 32 = 12\).", isCorrect: true }, { text: "\(15\)", rationale: "This treats the ratio as \(3:3\).", isCorrect: false }, { text: "\(18\)", rationale: "This assumes \(\tfrac{3}{5}\) of the students are boys.", isCorrect: false }, { text: "\(20\)", rationale: "This assumes equal numbers of boys and girls.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "applied", question: "A car travels \(210\) miles in \(3.5\) hours. What is its average speed in miles per hour?", answerOptions: [ { text: "\(55\,\text{mph}\)", rationale: "This divides the distance by \(3.8\) hours.", isCorrect: false }, { text: "\(60\,\text{mph}\)", rationale: "Correct. \(210 \div 3.5 = 60\).", isCorrect: true }, { text: "\(63\,\text{mph}\)", rationale: "This multiplies \(3.5\) by \(18\).", isCorrect: false }, { text: "\(75\,\text{mph}\)", rationale: "This assumes the trip took only \(2.8\) hours.", isCorrect: false } ] }
                                ]
                            }
                        ]
                    }
                ]
            },
            "Algebraic Reasoning": {
                topics: [
                    {
                        id: "math_alg_expressions",
                        quizzes: [
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "math_alg_expressions_set1",
                                label: "Quiz A",
                                description: "Practice simplifying expressions and working with polynomials.",
                                questionSourceTopicId: "math_alg_expressions",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "Combine like terms: 3x + 5x.", answerOptions: [ { text: "8x", rationale: "Correct. Add the coefficients of like terms: 3 + 5 = 8.", isCorrect: true }, { text: "15x", rationale: "This adds 3 and 5 as whole numbers instead of combining like terms.", isCorrect: false }, { text: "3x^2", rationale: "This incorrectly squares x when adding.", isCorrect: false }, { text: "5x^2", rationale: "This treats the expression as multiplication rather than addition.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "knowledge", question: "Combine like terms in 4x + 7 - 2x + 3.", answerOptions: [ { text: "2x + 10", rationale: "Correct. Combine 4x - 2x to get 2x and 7 + 3 to get 10.", isCorrect: true }, { text: "2x + 4", rationale: "This adds 7 + 3 incorrectly.", isCorrect: false }, { text: "6x + 10", rationale: "This adds the x coefficients instead of subtracting 2x.", isCorrect: false }, { text: "6x + 4", rationale: "Both the coefficient and constant terms are combined incorrectly.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "Use the distributive property to simplify 5(2x - 3).", answerOptions: [ { text: "10x - 15", rationale: "Correct. Multiply 5 by each term inside the parentheses.", isCorrect: true }, { text: "10x - 3", rationale: "Only the first term was multiplied by 5.", isCorrect: false }, { text: "7x - 8", rationale: "This combines unlike operations and coefficients.", isCorrect: false }, { text: "10x + 15", rationale: "This adds instead of subtracting for the second term.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "applied", question: "Expand (x + 4)(x - 1).", answerOptions: [ { text: "x^2 + 3x - 4", rationale: "Correct. Multiply term by term and combine like terms.", isCorrect: true }, { text: "x^2 + 4x - 1", rationale: "This omits the product of the constant terms.", isCorrect: false }, { text: "x^2 - x + 4", rationale: "This mixes signs for the middle term and constant.", isCorrect: false }, { text: "x^2 - 5", rationale: "This only multiplies the outer and inner terms.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "knowledge", question: "Combine like terms in 4x^2 - 3x + 2x^2 + 5x.", answerOptions: [ { text: "6x^2 + 2x", rationale: "Correct. Combine 4x^2 + 2x^2 and -3x + 5x separately.", isCorrect: true }, { text: "6x^2 - 8x", rationale: "This subtracts instead of adds the linear terms.", isCorrect: false }, { text: "6x^2 + 8x", rationale: "This adds the coefficients without considering the negative sign.", isCorrect: false }, { text: "8x^2 + 2x", rationale: "This adds 4x^2 and 2x^2 incorrectly.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "knowledge", question: "Factor 9x^2y + 12xy^2 completely.", answerOptions: [ { text: "3xy(3x + 4y)", rationale: "Correct. Factor out the greatest common factor 3xy.", isCorrect: true }, { text: "3x(3xy + 4y^2)", rationale: "This leaves a common factor of y inside the parentheses.", isCorrect: false }, { text: "xy(9x + 12y)", rationale: "This misses the numerical greatest common factor of 3.", isCorrect: false }, { text: "9xy(x + y)", rationale: "This does not reproduce the original coefficients when expanded.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "applied", question: "Evaluate p(x) = x^2 - 2x + 1 for x = -3.", answerOptions: [ { text: "16", rationale: "Correct. Substitute -3 to get 9 + 6 + 1 = 16.", isCorrect: true }, { text: "4", rationale: "This evaluates (-3)^2 - 2(-3) but omits the constant +1.", isCorrect: false }, { text: "-8", rationale: "This treats x^2 as (-3)^2 = -9 incorrectly.", isCorrect: false }, { text: "-16", rationale: "This changes the signs of all terms after substitution.", isCorrect: false } ] },
                                    { questionNumber: 8, type: "knowledge", question: "What is the coefficient of x^3 in 7x^3 - 5x + 2?", answerOptions: [ { text: "7", rationale: "Correct. The coefficient multiplying x^3 is 7.", isCorrect: true }, { text: "-5", rationale: "This is the coefficient of x.", isCorrect: false }, { text: "2", rationale: "This is the constant term, not a coefficient of x^3.", isCorrect: false }, { text: "0", rationale: "There is an x^3 term, so the coefficient is not zero.", isCorrect: false } ] },
                                    { questionNumber: 9, type: "knowledge", question: "Simplify (2x^2)(-3x^3).", answerOptions: [ { text: "-6x^5", rationale: "Correct. Multiply the coefficients and add the exponents of x.", isCorrect: true }, { text: "-6x^6", rationale: "This adds the exponents incorrectly: 2 + 3 != 6.", isCorrect: false }, { text: "-1x^5", rationale: "This multiplies the coefficients incorrectly.", isCorrect: false }, { text: "6x^5", rationale: "This ignores the negative sign from -3x^3.", isCorrect: false } ] },
                                    { questionNumber: 10, type: "knowledge", question: "What is the degree of the polynomial 6x^4 - 2x^2 + 9?", answerOptions: [ { text: "4", rationale: "Correct. The highest exponent on x is 4.", isCorrect: true }, { text: "3", rationale: "There is no x^3 term, but the degree depends on the highest exponent, not the middle term.", isCorrect: false }, { text: "2", rationale: "The quadratic term is not the highest power.", isCorrect: false }, { text: "0", rationale: "A constant polynomial would have degree 0, which is not the case here.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "applied", question: "Simplify (3x^2 + 5x - 2) - (x^2 - 4x + 7).", answerOptions: [ { text: "2x^2 + 9x - 9", rationale: "Correct. Distribute the negative sign and combine like terms.", isCorrect: true }, { text: "2x^2 + x + 5", rationale: "This subtracts 7 incorrectly and mishandles the linear terms.", isCorrect: false }, { text: "4x^2 + 9x + 5", rationale: "This adds the polynomials instead of subtracting.", isCorrect: false }, { text: "2x^2 + 9x + 9", rationale: "The constants were added rather than subtracted.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "knowledge", question: "Combine like terms: 1/2x + 3/4x.", answerOptions: [ { text: "5/4x", rationale: "Correct. Convert 1/2 to 2/4 and add to 3/4.", isCorrect: true }, { text: "3/8x", rationale: "This adds the denominators instead of the numerators.", isCorrect: false }, { text: "1/4x", rationale: "This subtracts the fractions rather than adding them.", isCorrect: false }, { text: "7/4x", rationale: "This adds an extra 1/2x.", isCorrect: false } ] }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "math_alg_expressions_set2",
                                label: "Quiz B",
                                description: "Solve linear equations and inequalities.",
                                questionSourceTopicId: "math_alg_expressions",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "Solve for x: 3x + 5 = 20.", answerOptions: [ { text: "x = 5", rationale: "Correct. Subtract 5 and divide by 3 to find x.", isCorrect: true }, { text: "x = 15", rationale: "This forgets to divide by 3 after subtracting 5.", isCorrect: false }, { text: "x = 15/3", rationale: "This restates 15 without simplifying and ignores subtraction.", isCorrect: false }, { text: "x = 5/3", rationale: "This divides 5 by 3 instead of 15 by 3.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "applied", question: "Solve for x: 2(x - 4) = 18.", answerOptions: [ { text: "x = 13", rationale: "Correct. Divide by 2 to get x - 4 = 9 and then add 4.", isCorrect: true }, { text: "x = 7", rationale: "This subtracts instead of adds after dividing.", isCorrect: false }, { text: "x = 11", rationale: "This adds 2 instead of 4 after dividing.", isCorrect: false }, { text: "x = -5", rationale: "This mismanages both the division and addition steps.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "Solve for x: 1/2x - 4 = 2.", answerOptions: [ { text: "x = 12", rationale: "Correct. Add 4 to get 1/2x = 6 and multiply by 2.", isCorrect: true }, { text: "x = 4", rationale: "This stops after adding 4.", isCorrect: false }, { text: "x = -12", rationale: "This adds 4 incorrectly and multiplies by -2.", isCorrect: false }, { text: "x = 3", rationale: "This divides by 2 instead of multiplying after isolating.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "knowledge", question: "Solve for x: 5 - 2x = 13.", answerOptions: [ { text: "x = -4", rationale: "Correct. Subtract 5 to get -2x = 8 and divide by -2.", isCorrect: true }, { text: "x = 4", rationale: "This ignores the negative coefficient on x.", isCorrect: false }, { text: "x = -9", rationale: "This subtracts 5 incorrectly to get -2x = -8.", isCorrect: false }, { text: "x = 9", rationale: "This divides 8 by 2 without addressing the sign.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "knowledge", question: "Solve the inequality 4x - 7 < 9.", answerOptions: [ { text: "x < 4", rationale: "Correct. Add 7 and divide by 4 to isolate x.", isCorrect: true }, { text: "x < 2", rationale: "This divides by 2 instead of 4.", isCorrect: false }, { text: "x > 4", rationale: "The inequality direction should not reverse because we divided by a positive number.", isCorrect: false }, { text: "x > -4", rationale: "This adds instead of subtracts 7.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "applied", question: "Solve the inequality -3(x + 2) <= 12.", answerOptions: [ { text: "x >= -6", rationale: "Correct. Divide by -3 and reverse the inequality sign.", isCorrect: true }, { text: "x <= -6", rationale: "This forgets to reverse the inequality when dividing by a negative.", isCorrect: false }, { text: "x >= 6", rationale: "This adds instead of subtracts when isolating x.", isCorrect: false }, { text: "x <= 6", rationale: "This mishandles both the sign and the direction of the inequality.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "knowledge", question: "Solve for x: 2/3x + 1 = 7.", answerOptions: [ { text: "x = 9", rationale: "Correct. Subtract 1 to get 2/3x = 6 and multiply by 3/2.", isCorrect: true }, { text: "x = 8", rationale: "This divides 6 by 2 but forgets to multiply by 3.", isCorrect: false }, { text: "x = 3", rationale: "This multiplies 6 by 1/2 instead of 3/2.", isCorrect: false }, { text: "x = -9", rationale: "This subtracts 1 incorrectly and mishandles the fraction.", isCorrect: false } ] },
                                    { questionNumber: 8, type: "applied", question: "Solve |x - 3| = 5.", answerOptions: [ { text: "x = 8 or x = -2", rationale: "Correct. Set x - 3 = 5 and x - 3 = -5 to find both solutions.", isCorrect: true }, { text: "x = 8 only", rationale: "Absolute value equations typically yield two solutions.", isCorrect: false }, { text: "x = -2 only", rationale: "Both the positive and negative cases must be considered.", isCorrect: false }, { text: "x = 5 or x = -5", rationale: "This confuses the solutions with the absolute value outputs.", isCorrect: false } ] },
                                    { questionNumber: 9, type: "knowledge", question: "Solve for x: 3x + 4 = 2x - 6.", answerOptions: [ { text: "x = -10", rationale: "Correct. Subtract 2x and 4 to isolate x.", isCorrect: true }, { text: "x = 10", rationale: "This drops the negative sign when moving terms.", isCorrect: false }, { text: "x = -2", rationale: "This subtracts 4 on the wrong side.", isCorrect: false }, { text: "x = 2", rationale: "This divides -6 by 3 without collecting like terms.", isCorrect: false } ] },
                                    { questionNumber: 10, type: "knowledge", question: "Solve the inequality x/5 >= -2.", answerOptions: [ { text: "x >= -10", rationale: "Correct. Multiply both sides by 5, a positive number.", isCorrect: true }, { text: "x <= -10", rationale: "The inequality should not reverse when multiplying by a positive number.", isCorrect: false }, { text: "x >= 10", rationale: "This ignores the negative sign on the right-hand side.", isCorrect: false }, { text: "x <= 10", rationale: "This reverses the inequality and changes the sign incorrectly.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "applied", question: "Solve for x: 4(x - 1) = 2x + 6.", answerOptions: [ { text: "x = 5", rationale: "Correct. Distribute to get 4x - 4 and then isolate x.", isCorrect: true }, { text: "x = 3", rationale: "This subtracts 4 from 6 incorrectly.", isCorrect: false }, { text: "x = -5", rationale: "This changes the sign when moving terms across the equation.", isCorrect: false }, { text: "x = 10", rationale: "This divides 10 by 1 instead of 2 after simplifying.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "applied", question: "Five more than twice a number equals 23. What is the number?", answerOptions: [ { text: "x = 9", rationale: "Correct. Solve 2x + 5 = 23 to get 2x = 18 and x = 9.", isCorrect: true }, { text: "x = 14", rationale: "This adds 5 to 23 instead of subtracting.", isCorrect: false }, { text: "x = 18", rationale: "This equates twice the number directly to 23 without subtracting 5.", isCorrect: false }, { text: "x = 9/2", rationale: "This divides 23 by 2 without first removing the added 5.", isCorrect: false } ] }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "math_alg_expressions_set3",
                                label: "Quiz C",
                                description: "Work with quadratic equations and functions.",
                                questionSourceTopicId: "math_alg_expressions",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "Solve x^2 - 9 = 0.", answerOptions: [ { text: "x = 3 or x = -3", rationale: "Correct. Take the square root of both sides after factoring as (x - 3)(x + 3) = 0.", isCorrect: true }, { text: "x = 9", rationale: "This squares instead of square roots the constant.", isCorrect: false }, { text: "x = 0", rationale: "This is only a solution when the constant term is 0.", isCorrect: false }, { text: "x = ± sqrt(9)", rationale: "This repeats the expression without simplifying to numerical values.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "knowledge", question: "Solve x^2 + 6x + 8 = 0.", answerOptions: [ { text: "x = -2 or x = -4", rationale: "Correct. Factor to (x + 2)(x + 4) = 0.", isCorrect: true }, { text: "x = 2 or x = 4", rationale: "This ignores the signs needed to make the factors zero.", isCorrect: false }, { text: "x = -8", rationale: "This adds the constant and linear coefficients instead of factoring.", isCorrect: false }, { text: "x = 6", rationale: "This sets the coefficient of x equal to zero.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "Factor x^2 - 5x - 14.", answerOptions: [ { text: "(x - 7)(x + 2)", rationale: "Correct. The factors multiply to -14 and add to -5.", isCorrect: true }, { text: "(x - 2)(x + 7)", rationale: "This expands to x^2 + 5x - 14 with the wrong sign on the linear term.", isCorrect: false }, { text: "(x - 7)(x - 2)", rationale: "The product of the constants would be 14, not -14.", isCorrect: false }, { text: "(x + 7)(x + 2)", rationale: "This results in a positive linear term.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "applied", question: "Use the quadratic formula to solve 2x^2 - 3x - 2 = 0.", answerOptions: [ { text: "x = 2 or x = -1/2", rationale: "Correct. Substitute a = 2, b = -3, and c = -2 into the formula.", isCorrect: true }, { text: "x = -2 or x = 1/2", rationale: "This switches the signs of both solutions.", isCorrect: false }, { text: "x = 3 or x = -3/4", rationale: "This divides by 4 incorrectly inside the formula.", isCorrect: false }, { text: "x = 3 ± sqrt(5)/2", rationale: "This omits dividing the discriminant by 2a = 4.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "knowledge", question: "What is the vertex of y = (x - 4)^2 + 3?", answerOptions: [ { text: "(4, 3)", rationale: "Correct. Vertex form y = (x - h)^2 + k has vertex (h, k).", isCorrect: true }, { text: "(4, -3)", rationale: "This changes the sign of the k value.", isCorrect: false }, { text: "( -4, 3)", rationale: "This changes the sign of the h value.", isCorrect: false }, { text: "( -4, -3)", rationale: "Both coordinates have incorrect signs.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "knowledge", question: "What is the axis of symmetry for y = x^2 - 6x + 5?", answerOptions: [ { text: "x = 3", rationale: "Correct. Use x = -b/2a = --6/2 = 3.", isCorrect: true }, { text: "x = -3", rationale: "This neglects the negative sign in the formula.", isCorrect: false }, { text: "x = 5", rationale: "This confuses the constant term with the axis.", isCorrect: false }, { text: "x = 6", rationale: "This uses the coefficient of x directly.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "applied", question: "Evaluate y = x^2 - 4x + 7 for x = 1.", answerOptions: [ { text: "y = 4", rationale: "Correct. Substitute to get 1 - 4 + 7 = 4.", isCorrect: true }, { text: "y = -2", rationale: "This subtracts the constant instead of adding it.", isCorrect: false }, { text: "y = 0", rationale: "This assumes the expression factors with a root at x = 1.", isCorrect: false }, { text: "y = 6", rationale: "This multiplies -4 and 7 instead of adding.", isCorrect: false } ] },
                                    { questionNumber: 8, type: "knowledge", question: "Does the equation y = x^2 + 4x + 8 have real solutions?", answerOptions: [ { text: "No, because the discriminant is negative.", rationale: "Correct. b^2 - 4ac = 16 - 32 = -16 < 0.", isCorrect: true }, { text: "Yes, because every quadratic has two real solutions.", rationale: "A negative discriminant produces complex solutions.", isCorrect: false }, { text: "Yes, because c is positive.", rationale: "The sign of c alone does not determine the nature of the roots.", isCorrect: false }, { text: "No, because the leading coefficient is positive.", rationale: "The sign of a determines concavity, not root type.", isCorrect: false } ] },
                                    { questionNumber: 9, type: "knowledge", question: "What is the y-intercept of the quadratic y = x^2 - 5x + 6?", answerOptions: [ { text: "(0, 6)", rationale: "Correct. Set x = 0 to find the y-intercept.", isCorrect: true }, { text: "(6, 0)", rationale: "This is an x-intercept, not the y-intercept.", isCorrect: false }, { text: "(0, -5)", rationale: "This uses the coefficient of x instead of the constant term.", isCorrect: false }, { text: "(1, 6)", rationale: "This substitutes x = 1 rather than x = 0.", isCorrect: false } ] },
                                    { questionNumber: 10, type: "applied", question: "Solve -2(x + 1)^2 + 8 = 0.", answerOptions: [ { text: "x = 1 or x = -3", rationale: "Correct. Move 8, divide by -2, and take square roots.", isCorrect: true }, { text: "x = -1 or x = 3", rationale: "This reverses the shifts inside the parentheses.", isCorrect: false }, { text: "x = 2", rationale: "This assumes a single root without considering symmetry.", isCorrect: false }, { text: "x = -4", rationale: "This substitutes x for (x + 1) directly.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "knowledge", question: "For x^2 + kx + 9 = 0 to have exactly one real solution, what value of k is required?", answerOptions: [ { text: "k = 6 or k = -6", rationale: "Correct. Set the discriminant k^2 - 36 equal to zero.", isCorrect: true }, { text: "k = 0", rationale: "This gives a negative discriminant of -36.", isCorrect: false }, { text: "k = 3", rationale: "This results in 9 - 36 < 0, producing two complex roots.", isCorrect: false }, { text: "k = 9", rationale: "This leads to a positive discriminant, not a single solution.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "applied", question: "What is the maximum value of y = -x^2 + 4x + 1?", answerOptions: [ { text: "5", rationale: "Correct. The vertex at x = 2 gives y = -4 + 8 + 1 = 5.", isCorrect: true }, { text: "-5", rationale: "This negates the correct value.", isCorrect: false }, { text: "1", rationale: "This is the constant term, not the vertex value.", isCorrect: false }, { text: "4", rationale: "This evaluates the function at x = 1 instead of the vertex.", isCorrect: false } ] }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "math_alg_expressions_set4",
                                label: "Quiz D",
                                description: "Explore functions and their graphs.",
                                questionSourceTopicId: "math_alg_expressions",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "Evaluate f(5) when f(x) = 3x - 4.", answerOptions: [ { text: "11", rationale: "Correct. Substitute x = 5 to get 15 - 4.", isCorrect: true }, { text: "19", rationale: "This adds instead of subtracts the constant.", isCorrect: false }, { text: "-11", rationale: "This changes the sign of the output unnecessarily.", isCorrect: false }, { text: "1", rationale: "This subtracts 4 from 5 before multiplying by 3.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "applied", question: "Evaluate g(-2) when g(t) = 2t^2 - 1.", answerOptions: [ { text: "7", rationale: "Correct. 2(4) - 1 = 7.", isCorrect: true }, { text: "-7", rationale: "This forgets that squaring -2 gives a positive 4.", isCorrect: false }, { text: "-3", rationale: "This substitutes -2 without squaring.", isCorrect: false }, { text: "3", rationale: "This halves the correct answer.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "What is the slope of the line y = (-1/2)x + 6?", answerOptions: [ { text: "-1/2", rationale: "Correct. The coefficient of x in slope-intercept form gives the slope.", isCorrect: true }, { text: "1/2", rationale: "This ignores the negative sign.", isCorrect: false }, { text: "6", rationale: "This is the y-intercept, not the slope.", isCorrect: false }, { text: "-6", rationale: "This multiplies the slope and intercept.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "knowledge", question: "What is the domain of f(x) = sqrt(x - 3)?", answerOptions: [ { text: "x >= 3", rationale: "Correct. The expression under the square root must be nonnegative.", isCorrect: true }, { text: "x > 0", rationale: "This ignores the -3 inside the radical.", isCorrect: false }, { text: "All real numbers", rationale: "Square roots of negative numbers are not real.", isCorrect: false }, { text: "x <= 3", rationale: "This reverses the inequality needed to keep the radicand nonnegative.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "knowledge", question: "What is the range of y = x^2 + 2?", answerOptions: [ { text: "y >= 2", rationale: "Correct. The parabola opens upward and has a minimum of 2.", isCorrect: true }, { text: "y > 0", rationale: "This ignores the vertical shift of +2.", isCorrect: false }, { text: "All real numbers", rationale: "Quadratic functions with positive leading coefficient are bounded below.", isCorrect: false }, { text: "y <= 2", rationale: "This would describe a downward-opening parabola.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "applied", question: "For f(x) = 2x + 3, what value of x produces f(x) = 11?", answerOptions: [ { text: "x = 4", rationale: "Correct. Solve 2x + 3 = 11 to find x = 4.", isCorrect: true }, { text: "x = 8", rationale: "This forgets to subtract 3 before dividing by 2.", isCorrect: false }, { text: "x = -4", rationale: "This changes the sign when isolating x.", isCorrect: false }, { text: "x = 14", rationale: "This sets x equal to the function output.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "knowledge", question: "What is the y-intercept of y = 5 - 3x?", answerOptions: [ { text: "(0, 5)", rationale: "Correct. Set x = 0 to find where the graph crosses the y-axis.", isCorrect: true }, { text: "(5, 0)", rationale: "This is the x-intercept instead.", isCorrect: false }, { text: "(0, -3)", rationale: "This uses the slope rather than the constant term.", isCorrect: false }, { text: "(1, 2)", rationale: "This substitutes x = 1 instead of x = 0.", isCorrect: false } ] },
                                    { questionNumber: 8, type: "knowledge", question: "Evaluate h(2) when h(x) = |x - 2|.", answerOptions: [ { text: "0", rationale: "Correct. |2 - 2| = 0.", isCorrect: true }, { text: "2", rationale: "This omits subtracting before taking the absolute value.", isCorrect: false }, { text: "-2", rationale: "Absolute value outputs are never negative.", isCorrect: false }, { text: "1", rationale: "This evaluates |2 - 1| instead.", isCorrect: false } ] },
                                    { questionNumber: 9, type: "applied", question: "Compute f(g(3)) when f(x) = x + 4 and g(x) = 2x.", answerOptions: [ { text: "10", rationale: "Correct. First find g(3) = 6 and then compute f(6) = 10.", isCorrect: true }, { text: "14", rationale: "This adds 4 to 3 before doubling.", isCorrect: false }, { text: "6", rationale: "This stops after finding g(3) without applying f.", isCorrect: false }, { text: "12", rationale: "This multiplies f(3) by g(3).", isCorrect: false } ] },
                                    { questionNumber: 10, type: "knowledge", question: "Does the relation y = x^2 - 1 define y as a function of x?", answerOptions: [ { text: "Yes, each input x produces exactly one output y.", rationale: "Correct. The relation passes the vertical line test.", isCorrect: true }, { text: "No, because x has two possible outputs.", rationale: "Each value of x gives a single value of y.", isCorrect: false }, { text: "No, because the graph is a curve.", rationale: "Being curved does not prevent a relation from being a function.", isCorrect: false }, { text: "Yes, because it is symmetric about the y-axis.", rationale: "Symmetry alone does not define a function; the unique output rule does.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "applied", question: "What is the average rate of change of f(x) = x^2 from x = 1 to x = 4?", answerOptions: [ { text: "5", rationale: "Correct. f(4) - f(1)/4 - 1 = 16 - 1/3 = 5.", isCorrect: true }, { text: "3", rationale: "This divides by 4 instead of 3.", isCorrect: false }, { text: "7", rationale: "This subtracts 1 from 16 incorrectly.", isCorrect: false }, { text: "15", rationale: "This omits dividing by the change in x.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "applied", question: "A function maps each input x to 2x - 1. If the output is 9, what input produced it?", answerOptions: [ { text: "x = 5", rationale: "Correct. Solve 2x - 1 = 9 to get x = 5.", isCorrect: true }, { text: "x = 4", rationale: "This subtracts 1 from 9 but forgets to divide by 2.", isCorrect: false }, { text: "x = 10", rationale: "This sets the input equal to twice the output.", isCorrect: false }, { text: "x = -5", rationale: "This changes the sign while solving.", isCorrect: false } ] }
                                ]
                            }
                        ]
                    }
                ]
            },
            "Geometry": {
                topics: [
                    {
                        id: "math_geom_basics",
                        quizzes: [
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "math_geom_basics_set1",
                                label: "Quiz A",
                                description: "Review perimeter, area, volume, and surface area applications.",
                                questionSourceTopicId: "math_geom_basics",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "What is the perimeter of a rectangle that is 8 units long and 5 units wide?", answerOptions: [ { text: "26 units", rationale: "Correct. 2(8 + 5) = 26.", isCorrect: true }, { text: "40 units", rationale: "This multiplies the length and width instead of adding.", isCorrect: false }, { text: "13 units", rationale: "This adds the length and width only once.", isCorrect: false }, { text: "30 units", rationale: "This adds an extra side length.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "knowledge", question: "Find the area of a triangle with a 12-unit base and a height of 5 units.", answerOptions: [ { text: "30 square units", rationale: "Correct. Use 1/2bh = 1/2(12)(5).", isCorrect: true }, { text: "60 square units", rationale: "This omits the 1/2 factor.", isCorrect: false }, { text: "17 square units", rationale: "This adds the base and height instead of multiplying.", isCorrect: false }, { text: "24 square units", rationale: "This multiplies 12 by 2 rather than 5.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "Determine the area of a circle with radius 4 units.", answerOptions: [ { text: "16π square units", rationale: "Correct. Use A = π r^2 = π(4^2) = 16π.", isCorrect: true }, { text: "8π square units", rationale: "This uses the diameter instead of the radius.", isCorrect: false }, { text: "32π square units", rationale: "This doubles the correct area.", isCorrect: false }, { text: "64π square units", rationale: "This squares the radius and multiplies by 4 again.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "knowledge", question: "A rectangular prism measures 3 cm by 4 cm by 5 cm. What is its volume in cubic centimeters?", answerOptions: [ { text: "60 cubic centimeters", rationale: "Correct. Multiply the dimensions: 3 × 4 × 5 = 60.", isCorrect: true }, { text: "12 cubic centimeters", rationale: "This multiplies only two of the dimensions.", isCorrect: false }, { text: "45 cubic centimeters", rationale: "This omits one dimension when multiplying.", isCorrect: false }, { text: "64 cubic centimeters", rationale: "This treats the prism as a cube with edge 4.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "knowledge", question: "What is the total surface area of a cube with side length 6 inches?", answerOptions: [ { text: "216 square inches", rationale: "Correct. 6 faces each with area 36.", isCorrect: true }, { text: "36 square inches", rationale: "This finds the area of just one face.", isCorrect: false }, { text: "1296 square inches", rationale: "This squares the volume instead of finding surface area.", isCorrect: false }, { text: "108 square inches", rationale: "This multiplies by 3 instead of 6.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "applied", question: "A trapezoid has bases of 10 meters and 6 meters with a height of 4 meters. What is its area in square meters?", answerOptions: [ { text: "32 square meters", rationale: "Correct. 1/2(10 + 6)(4) = 32.", isCorrect: true }, { text: "64 square meters", rationale: "This omits the 1/2 factor.", isCorrect: false }, { text: "16 square meters", rationale: "This averages the bases but forgets to multiply by height.", isCorrect: false }, { text: "20 square meters", rationale: "This uses only one base times the height.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "knowledge", question: "Find the circumference of a circle with radius 7 inches.", answerOptions: [ { text: "14π inches", rationale: "Correct. Use C = 2π r = 14π.", isCorrect: true }, { text: "7π inches", rationale: "This omits the factor of 2.", isCorrect: false }, { text: "49π inches", rationale: "This squares the radius incorrectly.", isCorrect: false }, { text: "28π inches", rationale: "This doubles the correct circumference.", isCorrect: false } ] },
                                    { questionNumber: 8, type: "applied", question: "What is the volume of a cylinder with radius 3 feet and height 10 feet?", answerOptions: [ { text: "90π cubic feet", rationale: "Correct. V = π r^2 h = π(9)(10).", isCorrect: true }, { text: "30π cubic feet", rationale: "This forgets to square the radius.", isCorrect: false }, { text: "60π cubic feet", rationale: "This multiplies only one radius by the height.", isCorrect: false }, { text: "180π cubic feet", rationale: "This doubles the correct product.", isCorrect: false } ] },
                                    { questionNumber: 9, type: "applied", question: "A square has an area of 81 square centimeters. What is the length of each side?", answerOptions: [ { text: "9 centimeters", rationale: "Correct. Take the square root of the area: sqrt(81) = 9.", isCorrect: true }, { text: "18 centimeters", rationale: "This doubles the correct side length.", isCorrect: false }, { text: "81 centimeters", rationale: "This uses the area itself as the side length.", isCorrect: false }, { text: "27 centimeters", rationale: "This cubes the side length unnecessarily.", isCorrect: false } ] },
                                    { questionNumber: 10, type: "applied", question: "A rectangular garden is 20 feet long and 15 feet wide. What is its area in square feet?", answerOptions: [ { text: "300 square feet", rationale: "Correct. Multiply length by width.", isCorrect: true }, { text: "70 square feet", rationale: "This adds the dimensions rather than multiplying.", isCorrect: false }, { text: "140 square feet", rationale: "This doubles the perimeter instead of finding area.", isCorrect: false }, { text: "225 square feet", rationale: "This multiplies 15 by itself.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "knowledge", question: "A rectangle has a perimeter of 54 meters and a length of 20 meters. What is its width?", answerOptions: [ { text: "7 meters", rationale: "Correct. 2(20 + w) = 54 leads to w = 7.", isCorrect: true }, { text: "14 meters", rationale: "This divides the perimeter by 4 without subtracting the length first.", isCorrect: false }, { text: "34 meters", rationale: "This subtracts the length just once instead of twice.", isCorrect: false }, { text: "17 meters", rationale: "This subtracts 20 from 54 without accounting for both lengths.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "applied", question: "A right triangular prism has a base area of 24 square inches and a height of 9 inches. What is its volume in cubic inches?", answerOptions: [ { text: "216 cubic inches", rationale: "Correct. Multiply the base area by the height: 24 × 9.", isCorrect: true }, { text: "48 cubic inches", rationale: "This doubles the base area but omits the prism height.", isCorrect: false }, { text: "33 cubic inches", rationale: "This averages the base area and height incorrectly.", isCorrect: false }, { text: "432 cubic inches", rationale: "This multiplies by the height twice.", isCorrect: false } ] }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "math_geom_basics_set2",
                                label: "Quiz B",
                                description: "Analyze geometric shapes and their properties.",
                                questionSourceTopicId: "math_geom_basics",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "Which statement is always true for any parallelogram?", answerOptions: [ { text: "Opposite sides are parallel.", rationale: "Correct. This property defines a parallelogram.", isCorrect: true }, { text: "All angles are right angles.", rationale: "Only rectangles and squares guarantee right angles.", isCorrect: false }, { text: "All sides are congruent.", rationale: "This describes a rhombus, not every parallelogram.", isCorrect: false }, { text: "Diagonals are congruent.", rationale: "This is true for rectangles, not all parallelograms.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "knowledge", question: "What is the sum of the interior angle measures of a pentagon?", answerOptions: [ { text: "540°", rationale: "Correct. (n - 2) × 180 = 3 × 180.", isCorrect: true }, { text: "360°", rationale: "This is the sum for a quadrilateral.", isCorrect: false }, { text: "720°", rationale: "This is the sum for a hexagon.", isCorrect: false }, { text: "900°", rationale: "This overestimates by using n × 180.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "A triangle has side lengths 7, 7, and 5. How is this triangle classified?", answerOptions: [ { text: "Isosceles", rationale: "Correct. Two sides are congruent.", isCorrect: true }, { text: "Equilateral", rationale: "Equilateral triangles have three equal sides.", isCorrect: false }, { text: "Scalene", rationale: "Scalene triangles have no equal sides.", isCorrect: false }, { text: "Right", rationale: "The side lengths do not satisfy the Pythagorean theorem.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "knowledge", question: "What is the measure of each interior angle in a regular octagon?", answerOptions: [ { text: "135°", rationale: "Correct. Use (n - 2) × 180/n = 6 × 180/8.", isCorrect: true }, { text: "120°", rationale: "This is the interior angle of a regular hexagon.", isCorrect: false }, { text: "140°", rationale: "This results from miscalculating the numerator.", isCorrect: false }, { text: "160°", rationale: "This assumes an incorrect angle sum.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "knowledge", question: "Which statement best defines a trapezoid using the inclusive definition?", answerOptions: [ { text: "A quadrilateral with at least one pair of parallel sides.", rationale: "Correct. Inclusive definitions allow parallelograms to count as trapezoids.", isCorrect: true }, { text: "A quadrilateral with both pairs of opposite sides parallel.", rationale: "This defines a parallelogram.", isCorrect: false }, { text: "A quadrilateral with all sides congruent.", rationale: "This describes a rhombus.", isCorrect: false }, { text: "A quadrilateral with exactly two right angles.", rationale: "Right angles are not required.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "knowledge", question: "What is the measure of each exterior angle of a regular decagon?", answerOptions: [ { text: "36°", rationale: "Correct. Exterior angles sum to 360°, so 360 / 10 = 36.", isCorrect: true }, { text: "18°", rationale: "This divides 180 by the number of sides instead of 360.", isCorrect: false }, { text: "54°", rationale: "This corresponds to a regular heptagon.", isCorrect: false }, { text: "144°", rationale: "This is an interior angle measurement.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "applied", question: "A triangle has angles measuring 90°, 45°, and 45°. How is the triangle classified?", answerOptions: [ { text: "Right isosceles triangle", rationale: "Correct. It has a right angle and two equal angles.", isCorrect: true }, { text: "Acute scalene triangle", rationale: "The triangle contains a right angle, not all acute angles.", isCorrect: false }, { text: "Obtuse isosceles triangle", rationale: "There is no obtuse angle.", isCorrect: false }, { text: "Equilateral triangle", rationale: "Equilateral triangles have three 60° angles.", isCorrect: false } ] },
                                    { questionNumber: 8, type: "knowledge", question: "How many diagonals can be drawn in a hexagon?", answerOptions: [ { text: "9", rationale: "Correct. Use n(n - 3)/2 = 6 × 3/2.", isCorrect: true }, { text: "6", rationale: "This counts only the sides.", isCorrect: false }, { text: "12", rationale: "This counts each diagonal twice.", isCorrect: false }, { text: "15", rationale: "This applies the formula for an octagon.", isCorrect: false } ] },
                                    { questionNumber: 9, type: "knowledge", question: "Which quadrilateral has four congruent sides and four right angles?", answerOptions: [ { text: "Square", rationale: "Correct. A square has both properties.", isCorrect: true }, { text: "Rhombus", rationale: "A rhombus has congruent sides but not necessarily right angles.", isCorrect: false }, { text: "Rectangle", rationale: "A rectangle has right angles but not necessarily congruent sides.", isCorrect: false }, { text: "Trapezoid", rationale: "Trapezoids do not require congruent sides or right angles.", isCorrect: false } ] },
                                    { questionNumber: 10, type: "knowledge", question: "Which statement about a rhombus is always true?", answerOptions: [ { text: "Its diagonals are perpendicular.", rationale: "Correct. The diagonals of a rhombus intersect at right angles.", isCorrect: true }, { text: "Its diagonals are congruent.", rationale: "This is true for rectangles, not all rhombi.", isCorrect: false }, { text: "All angles are acute.", rationale: "A rhombus can have obtuse angles.", isCorrect: false }, { text: "It has exactly one pair of parallel sides.", rationale: "A rhombus has two pairs of parallel sides.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "applied", question: "Two angles of a triangle measure 35° and 65°. What is the measure of the third angle?", answerOptions: [ { text: "80°", rationale: "Correct. The angles of a triangle sum to 180°.", isCorrect: true }, { text: "90°", rationale: "This assumes the triangle is right without calculation.", isCorrect: false }, { text: "70°", rationale: "This subtracts only one given angle from 180°.", isCorrect: false }, { text: "45°", rationale: "This averages the given angles instead of subtracting their sum.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "knowledge", question: "Which statement accurately describes a kite?", answerOptions: [ { text: "It has two distinct pairs of adjacent congruent sides.", rationale: "Correct. This property defines a kite.", isCorrect: true }, { text: "All four sides are congruent.", rationale: "That describes a rhombus.", isCorrect: false }, { text: "Opposite sides are parallel.", rationale: "This is a property of parallelograms, not kites.", isCorrect: false }, { text: "Its diagonals are both bisected.", rationale: "Only one diagonal is bisected in a kite.", isCorrect: false } ] }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "math_geom_basics_set3",
                                label: "Quiz C",
                                description: "Apply the Pythagorean theorem and other geometric theorems.",
                                questionSourceTopicId: "math_geom_basics",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "In a right triangle with legs 6 and 8, what is the length of the hypotenuse?", answerOptions: [ { text: "10", rationale: "Correct. 6^2 + 8^2 = 36 + 64 = 100 and sqrt(100) = 10.", isCorrect: true }, { text: "12", rationale: "This adds the legs instead of using the Pythagorean theorem.", isCorrect: false }, { text: "14", rationale: "This multiplies the legs before taking a square root.", isCorrect: false }, { text: "5", rationale: "This subtracts the legs.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "knowledge", question: "A right triangle has a hypotenuse of 13 and one leg of 5. What is the length of the other leg?", answerOptions: [ { text: "12", rationale: "Correct. 13^2 - 5^2 = 169 - 25 = 144 and sqrt(144) = 12.", isCorrect: true }, { text: "8", rationale: "This subtracts the leg from the hypotenuse without squaring.", isCorrect: false }, { text: "18", rationale: "This adds the hypotenuse and leg.", isCorrect: false }, { text: "sqrt(30)", rationale: "This fails to square before subtracting.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "knowledge", question: "Do the side lengths 7, 24, and 25 form a right triangle?", answerOptions: [ { text: "Yes, because 7^2 + 24^2 = 25^2.", rationale: "Correct. 49 + 576 = 625 equals 25^2.", isCorrect: true }, { text: "No, because 7 + 24 != 25.", rationale: "Triangle classification depends on squared side lengths, not sums.", isCorrect: false }, { text: "No, because the sides are not consecutive numbers.", rationale: "Consecutive numbers are not required for right triangles.", isCorrect: false }, { text: "Yes, because all sides are different.", rationale: "Being scalene alone does not guarantee a right triangle.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "applied", question: "A 15-foot ladder reaches the top of a wall 12 feet high. How far from the wall is the base of the ladder?", answerOptions: [ { text: "9 feet", rationale: "Correct. 15^2 - 12^2 = 225 - 144 = 81, so the base is sqrt(81) = 9 feet away.", isCorrect: true }, { text: "3 feet", rationale: "This subtracts 12 from 15 without squaring.", isCorrect: false }, { text: "18 feet", rationale: "This adds the ladder length and wall height.", isCorrect: false }, { text: "13 feet", rationale: "This misapplies the theorem by averaging the legs.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "applied", question: "What is the distance between the points (2, -1) and (-4, 3)?", answerOptions: [ { text: "2 * sqrt(13)", rationale: "Correct. Differences of -6 and 4 give sqrt(36 + 16) = sqrt(52) = 2 * sqrt(13).", isCorrect: true }, { text: "sqrt(20)", rationale: "This squares only one coordinate difference.", isCorrect: false }, { text: "10", rationale: "This adds the coordinate differences without squaring.", isCorrect: false }, { text: "8", rationale: "This treats the differences as legs of a rectangle without squaring.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "knowledge", question: "What is the midpoint of the segment with endpoints (5, 9) and (1, -3)?", answerOptions: [ { text: "(3, 3)", rationale: "Correct. Average the x-coordinates and y-coordinates separately.", isCorrect: true }, { text: "(6, 6)", rationale: "This adds the coordinates without dividing by 2.", isCorrect: false }, { text: "(4, 0)", rationale: "This averages only the x-values correctly.", isCorrect: false }, { text: "(2, 12)", rationale: "This subtracts instead of averaging.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "applied", question: "What is the length of the diagonal of a rectangle that is 9 meters wide and 12 meters long?", answerOptions: [ { text: "15 meters", rationale: "Correct. 9^2 + 12^2 = 81 + 144 = 225, and sqrt(225) = 15.", isCorrect: true }, { text: "21 meters", rationale: "This adds the side lengths.", isCorrect: false }, { text: "108 meters", rationale: "This multiplies the side lengths.", isCorrect: false }, { text: "13 meters", rationale: "This forgets to square before adding.", isCorrect: false } ] },
                                    { questionNumber: 8, type: "knowledge", question: "In a 45°-45°-90° triangle with leg length 7, what is the hypotenuse?", answerOptions: [ { text: "7 * sqrt(2)", rationale: "Correct. Multiply a leg by sqrt(2) for the hypotenuse in this special triangle.", isCorrect: true }, { text: "7", rationale: "This would make the triangle equilateral.", isCorrect: false }, { text: "14", rationale: "This doubles the leg length instead of using sqrt(2).", isCorrect: false }, { text: "7 * sqrt(3)", rationale: "This corresponds to a 30°-60°-90° triangle.", isCorrect: false } ] },
                                    { questionNumber: 9, type: "knowledge", question: "In a 30°-60°-90° triangle, the shorter leg is 4. What is the hypotenuse?", answerOptions: [ { text: "8", rationale: "Correct. The hypotenuse is twice the shorter leg.", isCorrect: true }, { text: "4 * sqrt(3)", rationale: "This gives the length of the longer leg.", isCorrect: false }, { text: "6", rationale: "This averages the two legs.", isCorrect: false }, { text: "2", rationale: "This halves the shorter leg instead of doubling it.", isCorrect: false } ] },
                                    { questionNumber: 10, type: "knowledge", question: "What is the radius of the circle defined by x^2 + y^2 = 49?", answerOptions: [ { text: "7", rationale: "Correct. The equation is in standard form with r^2 = 49.", isCorrect: true }, { text: "49", rationale: "This treats r^2 as the radius itself.", isCorrect: false }, { text: "14", rationale: "This doubles the radius.", isCorrect: false }, { text: "sqrt(49)", rationale: "This restates the radius without simplifying.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "applied", question: "What is the equation of a circle with center (3, -2) and radius 5?", answerOptions: [ { text: "(x - 3)^2 + (y + 2)^2 = 25", rationale: "Correct. Substitute the center and r^2 = 25 into the standard equation.", isCorrect: true }, { text: "(x + 3)^2 + (y - 2)^2 = 5", rationale: "This reverses the signs and forgets to square the radius.", isCorrect: false }, { text: "(x - 3)^2 + (y - 2)^2 = 10", rationale: "This uses 2r instead of r^2.", isCorrect: false }, { text: "(x + 3)^2 + (y + 2)^2 = 25", rationale: "This negates both coordinates of the center.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "applied", question: "How far is the point (-3, 4) from the origin?", answerOptions: [ { text: "5 units", rationale: "Correct. (-3)^2 + 4^2 = 9 + 16 = 25, and sqrt(25) = 5.", isCorrect: true }, { text: "1 unit", rationale: "This subtracts the coordinates instead of using distance.", isCorrect: false }, { text: "7 units", rationale: "This adds the absolute values of the coordinates.", isCorrect: false }, { text: "sqrt(7) units", rationale: "This squares only one coordinate.", isCorrect: false } ] }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "math_geom_basics_set4",
                                label: "Quiz D",
                                description: "Solve problems involving angles, lines, and coordinate geometry.",
                                questionSourceTopicId: "math_geom_basics",
                                questions: [
                                    { questionNumber: 1, type: "knowledge", question: "Which statement correctly describes complementary angles?", answerOptions: [ { text: "Two angles whose measures add to 90°.", rationale: "Correct. Complementary angles form a right angle when combined.", isCorrect: true }, { text: "Two angles whose measures add to 180°.", rationale: "This defines supplementary angles.", isCorrect: false }, { text: "Two angles that share a common side and vertex.", rationale: "This defines adjacent angles.", isCorrect: false }, { text: "Two angles that are equal in measure.", rationale: "Equal angles are congruent, not necessarily complementary.", isCorrect: false } ] },
                                    { questionNumber: 2, type: "knowledge", question: "Which statement correctly describes supplementary angles?", answerOptions: [ { text: "Two angles whose measures add to 180°.", rationale: "Correct. Supplementary angles form a straight line when combined.", isCorrect: true }, { text: "Two angles whose measures add to 90°.", rationale: "This describes complementary angles.", isCorrect: false }, { text: "Two angles that are vertical angles.", rationale: "Vertical angles are opposite each other and congruent.", isCorrect: false }, { text: "Two angles with a common vertex but no common side.", rationale: "This is not a standard angle relationship.", isCorrect: false } ] },
                                    { questionNumber: 3, type: "applied", question: "Angles measuring 3x + 15 and 2x + 45 form a linear pair. What is the value of x?", answerOptions: [ { text: "24", rationale: "Correct. Set 3x + 15 + 2x + 45 = 180 to solve 5x = 120.", isCorrect: true }, { text: "15", rationale: "This divides 180 by the number of angles.", isCorrect: false }, { text: "30", rationale: "This subtracts only one constant term before dividing.", isCorrect: false }, { text: "21", rationale: "This sets one angle equal to 180°.", isCorrect: false } ] },
                                    { questionNumber: 4, type: "knowledge", question: "When two parallel lines are cut by a transversal, which angle pair is always congruent?", answerOptions: [ { text: "Alternate interior angles", rationale: "Correct. They occupy opposite sides of the transversal and inside the lines.", isCorrect: true }, { text: "Same-side interior angles", rationale: "These are supplementary, not congruent.", isCorrect: false }, { text: "Consecutive exterior angles", rationale: "These are supplementary when lines are parallel.", isCorrect: false }, { text: "Adjacent angles", rationale: "Adjacent angles share a vertex and side but are not necessarily congruent.", isCorrect: false } ] },
                                    { questionNumber: 5, type: "applied", question: "If angle A and angle B are vertical angles and m∠A = 120°, what is m∠B?", answerOptions: [ { text: "120°", rationale: "Correct. Vertical angles are congruent.", isCorrect: true }, { text: "60°", rationale: "This halves the given angle without justification.", isCorrect: false }, { text: "180°", rationale: "This gives the supplementary angle instead.", isCorrect: false }, { text: "30°", rationale: "This divides the angle by four randomly.", isCorrect: false } ] },
                                    { questionNumber: 6, type: "knowledge", question: "What is the slope of the line passing through (1, -2) and (5, 6)?", answerOptions: [ { text: "2", rationale: "Correct. 6 - (-2)/5 - 1 = 8/4 = 2.", isCorrect: true }, { text: "-2", rationale: "This reverses the change in y.", isCorrect: false }, { text: "1/2", rationale: "This swaps the numerator and denominator.", isCorrect: false }, { text: "8", rationale: "This divides the change in y by 1.", isCorrect: false } ] },
                                    { questionNumber: 7, type: "knowledge", question: "A line has slope 3/4. What is the slope of a line perpendicular to it?", answerOptions: [ { text: "-4/3", rationale: "Correct. Perpendicular slopes are negative reciprocals.", isCorrect: true }, { text: "4/3", rationale: "This gives a parallel slope.", isCorrect: false }, { text: "-3/4", rationale: "This keeps the same slope but changes the sign.", isCorrect: false }, { text: "3/4", rationale: "This repeats the original slope.", isCorrect: false } ] },
                                    { questionNumber: 8, type: "applied", question: "What is the equation of the line with slope -1 that passes through (2, 3)?", answerOptions: [ { text: "y = -x + 5", rationale: "Correct. Use point-slope form: y - 3 = -1(x - 2).", isCorrect: true }, { text: "y = -x - 1", rationale: "This assumes the line passes through the origin.", isCorrect: false }, { text: "y = x - 5", rationale: "This uses the opposite slope.", isCorrect: false }, { text: "y = -x + 1", rationale: "This substitutes x for the y-intercept.", isCorrect: false } ] },
                                    { questionNumber: 9, type: "applied", question: "Are the lines y = 2x + 1 and y = (-1/2)x + 4 perpendicular?", answerOptions: [ { text: "Yes, because the product of the slopes is -1.", rationale: "Correct. 2 × -1/2 = -1.", isCorrect: true }, { text: "No, because the lines have different y-intercepts.", rationale: "Different intercepts do not prevent perpendicularity.", isCorrect: false }, { text: "Yes, because both lines have positive slopes.", rationale: "One slope is negative.", isCorrect: false }, { text: "No, because the slopes are reciprocals but not negatives.", rationale: "The slopes are negative reciprocals, satisfying the perpendicular condition.", isCorrect: false } ] },
                                    { questionNumber: 10, type: "applied", question: "Point (-3, 5) is translated 4 units right and 2 units down. What are the coordinates of the image point?", answerOptions: [ { text: "(1, 3)", rationale: "Correct. Add 4 to the x-coordinate and subtract 2 from the y-coordinate.", isCorrect: true }, { text: "(7, 7)", rationale: "This adds 4 and 2 to both coordinates.", isCorrect: false }, { text: "( -7, 3)", rationale: "This subtracts instead of adding to the x-coordinate.", isCorrect: false }, { text: "(1, 7)", rationale: "This adds 2 instead of subtracting for the vertical shift.", isCorrect: false } ] },
                                    { questionNumber: 11, type: "knowledge", question: "In a triangle, the exterior angle equals the sum of the two remote interior angles. If the remote angles are 40° and 55°, what is the measure of the exterior angle?", answerOptions: [ { text: "95°", rationale: "Correct. Add the measures of the two remote interior angles.", isCorrect: true }, { text: "85°", rationale: "This subtracts the smaller angle from the larger.", isCorrect: false }, { text: "125°", rationale: "This adds the remote angles to 180°.", isCorrect: false }, { text: "15°", rationale: "This finds the difference rather than the sum.", isCorrect: false } ] },
                                    { questionNumber: 12, type: "knowledge", question: "An angle measures 135°. How is this angle classified?", answerOptions: [ { text: "Obtuse", rationale: "Correct. Obtuse angles measure between 90° and 180°.", isCorrect: true }, { text: "Acute", rationale: "Acute angles are less than 90°.", isCorrect: false }, { text: "Right", rationale: "Right angles measure exactly 90°.", isCorrect: false }, { text: "Straight", rationale: "Straight angles measure 180°.", isCorrect: false } ] }
                                ]
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
            "Reading Comprehension: Informational Texts": {
                topics: [
                    {
                        id: "rla_info_main_idea",
                        quizzes: [
                            {
                                quizId: "rla_info_main_idea_set1",
                                label: "Quiz A",
                                description: "Analyze informational texts for central ideas, evidence, and author's claims.",
                                questionSourceTopicId: "rla_info_main_idea"
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "rla_info_main_idea_set2",
                                label: "Quiz B",
                                description: "Practice identifying supporting details and evidence in complex texts.",
                                questionSourceTopicId: "rla_info_main_idea",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'text',
                                        passage: "The rise of remote work, accelerated by the 2020 pandemic, has fundamentally altered the job market. Companies are now able to hire talent from a global pool, and employees are enjoying newfound flexibility. However, this shift is not without its challenges. Maintaining a strong company culture, ensuring data security, and combating employee burnout are significant hurdles that organizations must address to make remote work sustainable in the long term.",
                                        question: "Which of the following is presented as evidence of a challenge associated with remote work?",
                                        answerOptions: [
                                            { text: "Companies can hire from a global talent pool.", rationale: "This is presented as a benefit, not a challenge.", isCorrect: false },
                                            { text: "Employees enjoy newfound flexibility.", rationale: "This is a benefit for employees.", isCorrect: false },
                                            { text: "Maintaining a strong company culture.", rationale: "Correct. The passage explicitly lists this as a hurdle for organizations.", isCorrect: true },
                                            { text: "The job market has been fundamentally altered.", rationale: "This is the main idea, not a specific piece of evidence for a challenge.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'text',
                                        passage: "The Great Barrier Reef, the world's largest coral reef system, is facing an existential threat due to climate change. Rising ocean temperatures lead to coral bleaching, a phenomenon where corals expel the algae living in their tissues, causing them to turn completely white. While corals can survive a bleaching event, they are under more stress and are subject to mortality. According to a 2018 study, the reef has lost half of its coral populations over the past three decades.",
                                        question: "What specific detail does the author provide to support the claim that the Great Barrier Reef is under threat?",
                                        answerOptions: [
                                            { text: "It is the world's largest coral reef system.", rationale: "While true, this fact describes the reef but doesn't support the claim of it being under threat.", isCorrect: false },
                                            { text: "Corals can survive a bleaching event.", rationale: "This detail suggests resilience, which slightly contradicts the main claim of a threat.", isCorrect: false },
                                            { text: "The reef has lost half its coral populations in 30 years.", rationale: "Correct. This statistic is a direct piece of evidence supporting the central threat.", isCorrect: true },
                                            { text: "Coral bleaching is when corals expel algae.", rationale: "This explains the mechanism of bleaching but is not the evidence of the overall threat's impact.", isCorrect: false }
                                        ]
                                    }
                                    ,
                                    {
                                        questionNumber: 3,
                                        type: 'text',
                                        passage: "City council members are debating whether to invest in expanding public libraries. Supporters point to data showing that library usage has increased 25% in the past three years, especially for job-seeking resources. Opponents argue that funds should instead go toward road repairs, noting that pothole complaints have doubled over the same period. During the meeting, several residents shared stories about how library programs helped them learn new skills.",
                                        question: "Which detail best supports the argument in favor of expanding public libraries?",
                                        answerOptions: [
                                            { text: "Road repair complaints have doubled.", rationale: "This detail supports the argument against expanding libraries.", isCorrect: false },
                                            { text: "Library usage has increased 25% in three years.", rationale: "Correct. This statistic shows growing demand for library services, supporting expansion.", isCorrect: true },
                                            { text: "Some residents shared stories at the meeting.", rationale: "While anecdotal stories are persuasive, the question asks for the best supporting detail.", isCorrect: false },
                                            { text: "Council members are debating the proposal.", rationale: "This restates the scenario rather than offering supporting evidence.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 4,
                                        type: 'text',
                                        passage: "A recent report on urban agriculture highlights the benefits of rooftop gardens. According to the report, buildings with rooftop gardens reduce summer energy usage by an average of 15%, provide fresh produce to local communities, and help manage stormwater runoff by absorbing rainfall before it hits city streets. The report also notes that initial installation costs can be high but are often offset within five years.",
                                        question: "Which sentence from the passage provides evidence that rooftop gardens help the environment?",
                                        answerOptions: [
                                            { text: "Initial installation costs can be high.", rationale: "This addresses finances, not environmental impact.", isCorrect: false },
                                            { text: "Rooftop gardens provide fresh produce to local communities.", rationale: "This is a benefit, but it relates to food access rather than environmental impact.", isCorrect: false },
                                            { text: "Buildings with rooftop gardens reduce summer energy usage by an average of 15%.", rationale: "Correct. Lower energy usage reduces environmental strain.", isCorrect: true },
                                            { text: "The report highlights the benefits of rooftop gardens.", rationale: "This is too general to serve as specific evidence.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 5,
                                        type: 'text',
                                        passage: "An investigative article examined why a local river has become unsafe for swimming. The reporter cites state environmental tests showing elevated bacteria levels after heavy rains, interviews with farmers who use fertilizer near the riverbanks, and city budget documents revealing delays in upgrading the storm sewer system. The article concludes that runoff from both agriculture and aging infrastructure contributes to the pollution.",
                                        question: "What type of evidence does the reporter use to support the conclusion?",
                                        answerOptions: [
                                            { text: "Personal opinions from swimmers.", rationale: "The passage does not mention opinions from swimmers.", isCorrect: false },
                                            { text: "Laboratory tests, interviews, and budget documents.", rationale: "Correct. The reporter references scientific tests, expert interviews, and official records.", isCorrect: true },
                                            { text: "Photographs of the river.", rationale: "No visual evidence is described in the passage.", isCorrect: false },
                                            { text: "Anecdotes from city council meetings.", rationale: "Council meetings are not mentioned.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 6,
                                        type: 'text',
                                        passage: "A policy brief argues that expanding broadband access in rural areas will boost local economies. It cites a study showing that small businesses with high-speed internet grow their revenue 20% faster than those without it. The brief also highlights a pilot program where farmers used online marketplaces to sell produce directly to consumers, increasing profits. Finally, it mentions that students with reliable internet perform better on standardized tests.",
                                        question: "Which detail most directly supports the claim that broadband access improves local economies?",
                                        answerOptions: [
                                            { text: "Students with reliable internet perform better on standardized tests.", rationale: "While important, this detail focuses on education rather than local economies.", isCorrect: false },
                                            { text: "Farmers increased profits through online marketplaces.", rationale: "Correct. Increased profits for local farmers show an economic benefit.", isCorrect: true },
                                            { text: "The brief argues for expanding broadband access.", rationale: "Restating the argument does not provide evidence.", isCorrect: false },
                                            { text: "Small businesses use the internet for marketing.", rationale: "The passage specifically mentions revenue growth, not just marketing.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 7,
                                        type: 'text',
                                        passage: "In a newsletter, the superintendent explains the district's decision to shift to a later high school start time. She references medical research showing that teenagers need eight to ten hours of sleep and that later start times reduce tardiness. She also notes survey results indicating that 72% of parents support the change. The superintendent acknowledges transportation schedules will require adjustment but states the benefits outweigh the challenges.",
                                        question: "Which evidence best supports the superintendent's decision?",
                                        answerOptions: [
                                            { text: "Transportation schedules will require adjustment.", rationale: "This describes a challenge, not supporting evidence.", isCorrect: false },
                                            { text: "Medical research shows later start times reduce tardiness.", rationale: "Correct. This research-based evidence supports the decision.", isCorrect: true },
                                            { text: "The superintendent explains the decision in a newsletter.", rationale: "This is background information, not evidence.", isCorrect: false },
                                            { text: "Parents completed a survey.", rationale: "The survey is evidence, but the question asks for the best support, which is the research on outcomes.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 8,
                                        type: 'text',
                                        passage: "A nonprofit organization summarizes its annual impact in a report. The report emphasizes that its financial literacy workshops reached 1,200 participants, 85% of whom reported feeling more confident about budgeting afterward. It also mentions that partnerships with local banks allowed the nonprofit to offer free checking accounts to attendees.",
                                        question: "What statistic provides evidence that the workshops were effective?",
                                        answerOptions: [
                                            { text: "1,200 participants attended the workshops.", rationale: "Attendance alone does not show effectiveness.", isCorrect: false },
                                            { text: "Partnerships with local banks offered free checking accounts.", rationale: "This is a benefit, but it does not measure workshop effectiveness.", isCorrect: false },
                                            { text: "85% of participants reported feeling more confident about budgeting afterward.", rationale: "Correct. This directly indicates improved confidence, showing effectiveness.", isCorrect: true },
                                            { text: "The organization summarizes its impact annually.", rationale: "This is context, not evidence of effectiveness.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 9,
                                        type: 'text',
                                        passage: "A journalist profiles a new community center that offers free childcare while parents attend job-training classes. The article highlights that 60 parents have already completed the training, and half reported receiving job offers within a month. The director explains that the program partners with local employers who guarantee interviews for graduates.",
                                        question: "Which detail best supports the idea that the community center is helping parents find employment?",
                                        answerOptions: [
                                            { text: "The program partners with local employers.", rationale: "Partnerships are helpful, but the question asks for evidence that parents are finding jobs.", isCorrect: false },
                                            { text: "The center offers free childcare.", rationale: "This is a feature of the program, not direct evidence of employment outcomes.", isCorrect: false },
                                            { text: "Half of the parents reported receiving job offers within a month.", rationale: "Correct. This statistic directly connects the program to employment success.", isCorrect: true },
                                            { text: "Sixty parents completed the training.", rationale: "Completion numbers show participation, not job placement.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 10,
                                        type: 'text',
                                        passage: "An opinion column argues that community gardens should receive more city funding. The writer points out that neighborhoods with gardens have reported a 30% increase in neighbor-to-neighbor interactions, according to a recent survey. The column also references a university study showing that access to fresh produce improves residents' overall health scores. The author ends by describing a successful harvest festival attended by hundreds of residents.",
                                        question: "Which piece of evidence best supports the claim that community gardens benefit residents' health?",
                                        answerOptions: [
                                            { text: "A survey showed increased neighbor-to-neighbor interactions.", rationale: "This supports social benefits, not health.", isCorrect: false },
                                            { text: "A university study showed access to fresh produce improves overall health scores.", rationale: "Correct. This directly links gardens to better health outcomes.", isCorrect: true },
                                            { text: "Hundreds attended a harvest festival.", rationale: "Event attendance shows interest, not health impact.", isCorrect: false },
                                            { text: "The writer argues for more city funding.", rationale: "Restating the claim is not evidence.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 11,
                                        type: 'text',
                                        passage: "A public health briefing outlines the results of a vaccination campaign. Before the campaign, only 45% of residents received the recommended shots. After mobile clinics visited every neighborhood, vaccination rates rose to 78%. Hospitalizations for the targeted illness dropped by 40% within six months.",
                                        question: "Which statistic best supports the effectiveness of the vaccination campaign?",
                                        answerOptions: [
                                            { text: "Mobile clinics visited every neighborhood.", rationale: "This describes the strategy, not its effectiveness.", isCorrect: false },
                                            { text: "Vaccination rates rose from 45% to 78%.", rationale: "Correct. This shows the campaign successfully increased vaccinations.", isCorrect: true },
                                            { text: "Residents received recommended shots.", rationale: "This restates the goal rather than showing impact.", isCorrect: false },
                                            { text: "The campaign was outlined in a briefing.", rationale: "This provides context but not evidence of success.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 12,
                                        type: 'text',
                                        passage: "A transportation study compares neighborhoods with and without dedicated bike lanes. In areas with bike lanes, bicycle commuting increased by 40% over two years, and local businesses reported higher weekend sales as more cyclists stopped to shop. Neighborhoods without bike lanes saw no significant change in bicycle commuting.",
                                        question: "Which detail provides the strongest evidence that bike lanes can boost local commerce?",
                                        answerOptions: [
                                            { text: "Bicycle commuting increased by 40%.", rationale: "This shows more people biking but does not directly address commerce.", isCorrect: false },
                                            { text: "Neighborhoods without bike lanes saw no significant change.", rationale: "This comparison highlights differences but does not address commerce.", isCorrect: false },
                                            { text: "Local businesses reported higher weekend sales as more cyclists stopped to shop.", rationale: "Correct. Increased sales directly link bike lanes to local commerce.", isCorrect: true },
                                            { text: "The study compared neighborhoods.", rationale: "This explains the method rather than providing evidence.", isCorrect: false }
                                        ]
                                    }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "rla_info_main_idea_set3",
                                label: "Quiz C",
                                description: "Determine author's purpose, point of view, and tone.",
                                questionSourceTopicId: "rla_info_main_idea",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'text',
                                        passage: "It is imperative that we invest in high-speed rail infrastructure. Such a project would not only create thousands of jobs during construction but also provide a greener, more efficient alternative to air and car travel, reducing our nation's carbon footprint for generations to come. To delay is to deny ourselves a more prosperous and sustainable future.",
                                        question: "What is the author's primary purpose in writing this passage?",
                                        answerOptions: [
                                            { text: "To inform readers about the history of rail travel.", rationale: "The passage does not discuss history.", isCorrect: false },
                                            { text: "To persuade readers to support investment in high-speed rail.", rationale: "Correct. The use of words like 'imperative' and the focus on benefits clearly indicate a persuasive intent.", isCorrect: true },
                                            { text: "To entertain readers with a story about trains.", rationale: "The tone is serious and argumentative, not entertaining.", isCorrect: false },
                                            { text: "To describe the process of building a railway.", rationale: "The passage focuses on the 'why', not the 'how'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'text',
                                        passage: "While some critics have dismissed the new city ordinance as an overreach of government power, they fail to acknowledge the tangible benefits it will bring. The regulation, which limits single-use plastics in restaurants, is a crucial step toward reducing landfill waste and protecting our local waterways. The minor inconvenience of bringing a reusable bag is a small price to pay for a cleaner community.",
                                        question: "The author's point of view can best be described as:",
                                        answerOptions: [
                                            { text: "Neutral and objective.", rationale: "The author takes a clear side and uses persuasive language.", isCorrect: false },
                                            { text: "Strongly in favor of the ordinance.", rationale: "Correct. The author defends the ordinance and minimizes the arguments against it.", isCorrect: true },
                                            { text: "Strongly against the ordinance.", rationale: "The author is defending the ordinance, not opposing it.", isCorrect: false },
                                            { text: "Confused and uncertain.", rationale: "The author's tone is confident and assertive.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 3,
                                        type: 'text',
                                        passage: "Our town has long prided itself on its artistic spirit. Yet the proposed cuts to the community arts grant threaten to silence dozens of after-school programs and shutter the only gallery that showcases local talent. Investing in the arts is not a luxury; it is an investment in creativity, collaboration, and the heart of who we are.",
                                        question: "What is the author's primary purpose in this passage?",
                                        answerOptions: [
                                            { text: "To narrate a personal experience in the arts.", rationale: "The passage does not include a personal story.", isCorrect: false },
                                            { text: "To persuade readers to oppose cuts to the community arts grant.", rationale: "Correct. The author argues against the proposed funding cuts and appeals to shared values.", isCorrect: true },
                                            { text: "To analyze the history of the town's art scene.", rationale: "The passage focuses on current funding issues, not history.", isCorrect: false },
                                            { text: "To inform readers about how to apply for a grant.", rationale: "Instructions are not provided.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 4,
                                        type: 'text',
                                        passage: "Some critics argue that handwriting lessons are outdated in the digital age. However, recent studies show that students who practice handwriting develop stronger memory retention and improved reading fluency. Rather than abandoning handwriting, schools should integrate it with modern technology, reinforcing skills that support overall literacy.",
                                        question: "Which choice best describes the author's point of view?",
                                        answerOptions: [
                                            { text: "Handwriting should be replaced by typing in schools.", rationale: "This is the viewpoint the author is arguing against.", isCorrect: false },
                                            { text: "Handwriting has no impact on literacy.", rationale: "The author cites studies showing handwriting benefits literacy.", isCorrect: false },
                                            { text: "Handwriting instruction should complement technology in schools.", rationale: "Correct. The author supports a blended approach that keeps handwriting alongside modern tools.", isCorrect: true },
                                            { text: "Technology should be removed from classrooms.", rationale: "The author advocates integration, not removal.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 5,
                                        type: 'text',
                                        passage: "When the river finally receded, it left behind more than mud-caked streets and toppled fences. It revealed the resolve of neighbors who cooked for one another, the teachers who turned classrooms into temporary shelters, and the teenagers who spent spring break hauling sandbags. Disaster had come, but so had the proof that resilience lives on this block.",
                                        question: "Which word best describes the tone of the passage?",
                                        answerOptions: [
                                            { text: "Hopeless.", rationale: "The passage highlights perseverance, not despair.", isCorrect: false },
                                            { text: "Resentful.", rationale: "The narrator does not express bitterness or anger.", isCorrect: false },
                                            { text: "Determined.", rationale: "Correct. The passage emphasizes community resilience and resolve.", isCorrect: true },
                                            { text: "Humorous.", rationale: "There are no lighthearted or comedic elements.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 6,
                                        type: 'text',
                                        passage: "The scientist began her presentation with an apology for yet another graph. 'But this one,' she said, 'is the most important.' It showed global carbon emissions climbing steadily upward, despite decades of pledges to curb them. As she explained the data, the room fell silent—not from boredom, but from the weight of what the numbers meant.",
                                        question: "What is the effect of describing the audience as falling silent?",
                                        answerOptions: [
                                            { text: "It suggests the audience was confused by the graph.", rationale: "The silence stems from concern, not confusion.", isCorrect: false },
                                            { text: "It highlights the audience's apathy toward the topic.", rationale: "Silence indicates the seriousness of the information, not apathy.", isCorrect: false },
                                            { text: "It emphasizes the gravity of the information being presented.", rationale: "Correct. The silence reflects the audience's realization of the problem's seriousness.", isCorrect: true },
                                            { text: "It shows the presentation was too technical.", rationale: "Nothing indicates the content was overly technical.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 7,
                                        type: 'text',
                                        passage: "While opponents claim that the city's tree-planting initiative is cosmetic, they overlook the measurable benefits. Tree canopy lowers temperatures during heat waves, reduces energy consumption, and improves air quality. Residents in neighborhoods with more trees report higher satisfaction with their surroundings. Investing in urban forestry is a practical, evidence-based strategy, not mere decoration.",
                                        question: "Which statement best summarizes the author's viewpoint?",
                                        answerOptions: [
                                            { text: "Tree planting is largely a cosmetic effort.", rationale: "This reflects the position the author is rebutting.", isCorrect: false },
                                            { text: "The initiative lacks measurable benefits.", rationale: "The author lists multiple measurable benefits.", isCorrect: false },
                                            { text: "Tree planting is a practical strategy supported by evidence.", rationale: "Correct. The author provides data-driven reasons to support the initiative.", isCorrect: true },
                                            { text: "Urban forestry should be postponed until other needs are met.", rationale: "The author advocates investing now, not postponing.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 8,
                                        type: 'text',
                                        passage: "As a pediatric nurse for twenty years, I've watched children transform when hospitals create spaces that feel less clinical and more comforting. A mural on the wall can soften a scary diagnosis. A bookshelf in the waiting room can turn dread into distraction. These details matter; they remind young patients that they are more than their charts.",
                                        question: "How does the author establish credibility?",
                                        answerOptions: [
                                            { text: "By citing national statistics about hospital stays.", rationale: "No statistics are mentioned.", isCorrect: false },
                                            { text: "By describing personal experience as a pediatric nurse.", rationale: "Correct. The author references two decades of professional experience.", isCorrect: true },
                                            { text: "By quoting hospital administrators.", rationale: "No quotations from administrators appear in the passage.", isCorrect: false },
                                            { text: "By referencing medical textbooks.", rationale: "Textbooks are not referenced.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 9,
                                        type: 'text',
                                        passage: "The new downtown market has been open for just six months, yet it already feels like the beating heart of the neighborhood. Families pick up produce after work, musicians play on the plaza every Saturday, and small-business owners finally have a place to test their recipes. The market isn't simply a place to shop; it's where the community gathers to breathe and grow together.",
                                        question: "Which sentence best captures the passage's central idea?",
                                        answerOptions: [
                                            { text: "The downtown market struggles to attract customers.", rationale: "The passage emphasizes popularity, not struggle.", isCorrect: false },
                                            { text: "The market is an important community gathering place.", rationale: "Correct. The passage describes various ways the market brings people together.", isCorrect: true },
                                            { text: "Musicians play every day at the market.", rationale: "The passage mentions performances only on Saturdays.", isCorrect: false },
                                            { text: "Small-business owners avoid testing recipes at the market.", rationale: "The passage states the opposite.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 10,
                                        type: 'text',
                                        passage: "When my grandfather taught me to fix bicycles, he insisted on patience. 'Listen to the wheel,' he would say, 'and it will tell you what it needs.' Years later, as I mentor young mechanics, I realize he was teaching more than maintenance—he was teaching how to slow down and pay attention to the people in front of us.",
                                        question: "What inference can be made about the narrator's relationship with the grandfather?",
                                        answerOptions: [
                                            { text: "It was distant and formal.", rationale: "The anecdote shows closeness and shared lessons, not distance.", isCorrect: false },
                                            { text: "It was strained due to disagreements.", rationale: "No conflicts or disagreements are described.", isCorrect: false },
                                            { text: "It was close and influential.", rationale: "Correct. The narrator values lessons learned from the grandfather and passes them on.", isCorrect: true },
                                            { text: "It was limited to holiday visits.", rationale: "The passage describes hands-on teaching, indicating frequent interaction.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 11,
                                        type: 'text',
                                        passage: "Parents across the district packed the auditorium to hear the board's decision on arts funding. As the chair announced that the programs would continue, the crowd erupted into cheers. Cameras flashed, students hugged their teachers, and the band struck up the school song. For one night, debate gave way to celebration.",
                                        question: "Which sentence best describes the tone of the final sentence?",
                                        answerOptions: [
                                            { text: "It is gloomy because the programs were canceled.", rationale: "The programs continued, and the tone is celebratory.", isCorrect: false },
                                            { text: "It is relieved and joyful after a tense debate.", rationale: "Correct. The final sentence shows relief and celebration.", isCorrect: true },
                                            { text: "It is skeptical about the board's decision.", rationale: "No doubt or skepticism is expressed.", isCorrect: false },
                                            { text: "It is indifferent to the outcome.", rationale: "The description of cheering and music conveys excitement, not indifference.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 12,
                                        type: 'text',
                                        passage: "Before the new tutoring center opened, many adult learners in our county had to drive over an hour for help preparing for the GED exam. Now, volunteers meet them in the evenings, childcare is offered on-site, and laptops are available for practice tests. The waiting list has nearly disappeared, and pass rates climbed 18% in the first year.",
                                        question: "Which detail best supports the claim that the new tutoring center has improved access to GED preparation?",
                                        answerOptions: [
                                            { text: "Volunteers meet learners in the evenings.", rationale: "This shows convenience but not overall impact on access.", isCorrect: false },
                                            { text: "Childcare is offered on-site.", rationale: "While helpful, the best evidence of improved access is the decrease in waiting lists and increased pass rates.", isCorrect: false },
                                            { text: "The waiting list has nearly disappeared.", rationale: "Correct. This directly indicates that more learners can receive services when they need them.", isCorrect: true },
                                            { text: "Laptops are available for practice tests.", rationale: "This is a feature of the center but not the strongest evidence of improved access.", isCorrect: false }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "Reading Comprehension: Literary Texts": {
                topics: [
                    {
                        id: "rla_lit_analysis",
                        quizzes: [
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "rla_lit_analysis_set1",
                                label: "Quiz A",
                                description: "Analyze literary texts for themes, character development, and literary devices.",
                                questionSourceTopicId: "rla_lit_analysis",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'text',
                                        passage: "It was in the clove of seasons, summer was dead but autumn had not yet been born, that the ibis lit in the bleeding tree. The flower garden was strained with rotting brown magnolia petals and ironweeds grew rank amid the purple phlox. The five o’clocks by the chimney still marked time, but the oriole nest in the elm was untenanted and rocked back and forth like an empty cradle. The last graveyard flowers were blooming, and their smell drifted across the cotton field and through every room of our house, speaking softly the names of our dead.",
                                        question: "The mood of the passage can best be described as:",
                                        answerOptions: [
                                            { text: "Joyful and celebratory.", rationale: "The imagery of death, decay ('rotting brown magnolia petals'), and emptiness ('untenanted') creates a somber, not joyful, mood.", isCorrect: false },
                                            { text: "Suspenseful and tense.", rationale: "While the mood is heavy, there is no building of tension or suspense; it's more reflective and melancholic.", isCorrect: false },
                                            { text: "Somber and reflective.", rationale: "Correct. The author uses words like 'dead,' 'rotting,' 'untenanted,' and 'graveyard' to create a mood of melancholy and remembrance.", isCorrect: true },
                                            { text: "Hectic and chaotic.", rationale: "The pace of the passage is slow and descriptive, the opposite of hectic.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'text',
                                        passage: "It was in the clove of seasons, summer was dead but autumn had not yet been born, that the ibis lit in the bleeding tree. The flower garden was strained with rotting brown magnolia petals and ironweeds grew rank amid the purple phlox. The five o’clocks by the chimney still marked time, but the oriole nest in the elm was untenanted and rocked back and forth like an empty cradle. The last graveyard flowers were blooming, and their smell drifted across the cotton field and through every room of our house, speaking softly the names of our dead.",
                                        question: "The phrase 'the oriole nest in the elm was untenanted and rocked back and forth like an empty cradle' is an example of what literary device?",
                                        answerOptions: [
                                            { text: "Metaphor.", rationale: "A metaphor is a direct comparison (e.g., 'the nest was an empty cradle'). The use of 'like' makes this a simile.", isCorrect: false },
                                            { text: "Personification.", rationale: "Personification gives human qualities to inanimate objects. While the flowers' smell is personified later, this phrase is a simile.", isCorrect: false },
                                            { text: "Hyperbole.", rationale: "Hyperbole is an extreme exaggeration, which is not used here.", isCorrect: false },
                                            { text: "Simile.", rationale: "Correct. The nest is compared to a cradle using the word 'like', which is the definition of a simile.", isCorrect: true }
                                        ]
                                    },
                                    {
                                        questionNumber: 3,
                                        type: 'text',
                                        passage: "Lena traced her fingers over the worn cover of the journal before opening it to the page marked with a ribbon. Each entry ended with the same promise: 'Tomorrow I'll begin again.' She closed the book, straightened her shoulders, and reached for the sketchpad she had ignored for months.",
                                        question: "What does the repeated promise in the journal suggest about Lena?",
                                        answerOptions: [
                                            { text: "She rarely keeps track of her thoughts.", rationale: "The journal entries show she records her thoughts carefully.", isCorrect: false },
                                            { text: "She is committed to renewing her creative efforts.", rationale: "Correct. The repeated promise to 'begin again' shows determination to restart her art.", isCorrect: true },
                                            { text: "She plans to sell the journal.", rationale: "There is no evidence she intends to sell it.", isCorrect: false },
                                            { text: "She has given up on drawing entirely.", rationale: "She reaches for her sketchpad, showing she still intends to draw.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 4,
                                        type: 'text',
                                        passage: "The train coughed and lurched before settling into a steady rhythm. Mateo pressed his forehead against the window, watching the city lights recede like a constellation dissolving at dawn. He had never left home before, yet the thought of returning filled him with more dread than the miles of unknown track ahead.",
                                        question: "What can be inferred about Mateo's feelings toward his hometown?",
                                        answerOptions: [
                                            { text: "He feels relieved to be returning soon.", rationale: "He is leaving and feels dread at the idea of returning, not relief.", isCorrect: false },
                                            { text: "He is indifferent to leaving home.", rationale: "His physical reaction and strong comparison show he is not indifferent.", isCorrect: false },
                                            { text: "He is eager to escape his hometown despite his fears.", rationale: "Correct. He fears the unknown, yet returning seems worse, indicating a desire to leave.", isCorrect: true },
                                            { text: "He plans to live in the city permanently.", rationale: "The passage does not address his long-term plans.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 5,
                                        type: 'text',
                                        passage: "The violinist's bow danced across the strings, stitching a silver thread of melody through the hush of the auditorium until the final note fluttered down like a feather.",
                                        question: "Which literary device is used to describe the melody in this passage?",
                                        answerOptions: [
                                            { text: "Alliteration.", rationale: "While the sentence is musical, it does not rely on repeated initial consonant sounds.", isCorrect: false },
                                            { text: "Metaphor.", rationale: "Correct. The melody is compared to a 'silver thread' without using 'like' or 'as'.", isCorrect: true },
                                            { text: "Onomatopoeia.", rationale: "No word imitates sound directly.", isCorrect: false },
                                            { text: "Irony.", rationale: "There is no contrast between expectation and reality.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 6,
                                        type: 'text',
                                        passage: "'You always find the sunshine in a storm,' Mei said, handing her brother an umbrella. He shrugged, staring at the dark clouds. 'Maybe, but today the storm is inside.'",
                                        question: "What does the brother's response reveal about his character?",
                                        answerOptions: [
                                            { text: "He is amused by the weather.", rationale: "His tone suggests emotional turmoil, not amusement.", isCorrect: false },
                                            { text: "He is unconcerned about Mei's optimism.", rationale: "He acknowledges her optimism but reveals his own struggle.", isCorrect: false },
                                            { text: "He is dealing with internal conflict despite outward support.", rationale: "Correct. He implies his troubles are emotional rather than weather-related.", isCorrect: true },
                                            { text: "He is eager to go outside in the rain.", rationale: "Nothing indicates he wants to go out; he is preoccupied with inner turmoil.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 7,
                                        type: 'text',
                                        passage: "During the festival, booths crowded the square, but Aria kept returning to the storyteller seated near the fountain. With each tale, he wove the names of the town's founders into legends of bravery and sacrifice. When the last story ended, Aria looked at the familiar streets with new reverence.",
                                        question: "What theme is suggested by the passage?",
                                        answerOptions: [
                                            { text: "Legends make it difficult to appreciate the present.", rationale: "Aria gains appreciation, not difficulty.", isCorrect: false },
                                            { text: "History shapes how people value their community.", rationale: "Correct. The stories about founders deepen Aria's respect for her town.", isCorrect: true },
                                            { text: "Festivals distract people from learning about their town.", rationale: "Aria learns during the festival rather than being distracted.", isCorrect: false },
                                            { text: "Sacrifice always leads to regret.", rationale: "The stories inspire reverence, not regret.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 8,
                                        type: 'text',
                                        passage: "The letter was short—three sentences at most—but every word was deliberate. 'I am safe. I have found work. I am not returning.' Laila folded the paper and stared at the empty chair across the kitchen table.",
                                        question: "Which statement best describes the tone conveyed by the letter writer?",
                                        answerOptions: [
                                            { text: "Playful and teasing.", rationale: "The message is brief and serious, not playful.", isCorrect: false },
                                            { text: "Uncertain and hesitant.", rationale: "The sentences are direct and confident, showing no hesitation.", isCorrect: false },
                                            { text: "Resolute and independent.", rationale: "Correct. The writer clearly states decisions and intention not to return.", isCorrect: true },
                                            { text: "Angry and accusatory.", rationale: "No blame or anger appears in the letter.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 9,
                                        type: 'text',
                                        passage: "As the debate dragged into its fourth hour, Jordan's patience thinned. He leaned toward the microphone and said, 'If we continue to circle the issue like wary birds, we'll never land on a solution.'",
                                        question: "The phrase 'circle the issue like wary birds' is used to:",
                                        answerOptions: [
                                            { text: "Suggest the council should postpone the decision.", rationale: "Jordan wants progress, not delay.", isCorrect: false },
                                            { text: "Criticize the council for avoiding a direct decision.", rationale: "Correct. The simile shows frustration with indecision.", isCorrect: true },
                                            { text: "Compliment the council on careful planning.", rationale: "The tone conveys impatience, not praise.", isCorrect: false },
                                            { text: "Explain why birds migrate south.", rationale: "The comparison illustrates behavior in the debate, not bird migration.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 10,
                                        type: 'text',
                                        passage: "Nora's grandmother had always insisted that every recipe told a story. When Nora found the smeared card for honey cakes, she noticed the note at the bottom: 'For celebrations only—make sure you are truly joyful first.' Nora set down the card and went to call her brother with good news before preheating the oven.",
                                        question: "What motivates Nora's actions at the end of the passage?",
                                        answerOptions: [
                                            { text: "She wants to double-check the ingredients.", rationale: "She sets the card down to share news, not to review ingredients.", isCorrect: false },
                                            { text: "She plans to replace the recipe with a new one.", rationale: "She keeps the recipe; there is no replacement.", isCorrect: false },
                                            { text: "She follows her grandmother's advice to bake only when joyful.", rationale: "Correct. She ensures she is celebrating before starting the recipe.", isCorrect: true },
                                            { text: "She decides not to bake after all.", rationale: "She intends to bake after sharing the good news.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 11,
                                        type: 'text',
                                        passage: "'Everyone sees the crown,' the young queen whispered, 'but no one notices how heavy it is.' She placed it on the velvet stand and stared at the empty throne, wondering when her decisions would feel like her own.",
                                        question: "Which conflict is highlighted in the passage?",
                                        answerOptions: [
                                            { text: "Man vs. nature.", rationale: "The struggle is internal, not against natural forces.", isCorrect: false },
                                            { text: "Man vs. society.", rationale: "While expectations exist, the focus is on her personal struggle.", isCorrect: false },
                                            { text: "Man vs. self.", rationale: "Correct. The queen wrestles with the weight of responsibility and self-doubt.", isCorrect: true },
                                            { text: "Man vs. technology.", rationale: "Technology is not mentioned.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 12,
                                        type: 'text',
                                        passage: "I tucked the photograph back into my wallet, promising myself that next time I wouldn't let fear keep me silent. The bus jolted forward, and with it, my resolve.",
                                        question: "From which point of view is this passage most likely narrated?",
                                        answerOptions: [
                                            { text: "First person.", rationale: "Correct. The narrator uses 'I,' indicating a first-person perspective.", isCorrect: true },
                                            { text: "Second person.", rationale: "Second person would address the reader as 'you.'", isCorrect: false },
                                            { text: "Third person limited.", rationale: "Third person would refer to characters as 'he' or 'she.'", isCorrect: false },
                                            { text: "Third person omniscient.", rationale: "An omniscient narrator would describe multiple characters' thoughts.", isCorrect: false }
                                        ]
                                    }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "rla_lit_analysis_set2",
                                label: "Quiz B",
                                description: "Interpret figurative language and analyze character.",
                                questionSourceTopicId: "rla_lit_analysis",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'text',
                                        passage: "She was a small woman, but she carried herself with the confidence of a giant. Her eyes, the color of worn denim, missed nothing. When she entered a room, conversation didn't stop, but its pitch and cadence changed. It was the unconscious deference of the village to its unofficial queen. She never raised her voice, yet her softest whisper could quell a brewing argument or ignite a dormant hope. Her power was not in decree, but in presence.",
                                        question: "Which of the following statements best characterizes the woman?",
                                        answerOptions: [
                                            { text: "She is a loud and demanding leader.", rationale: "The passage states the opposite: 'She never raised her voice' and her power was quiet.", isCorrect: false },
                                            { text: "She is physically imposing and intimidating.", rationale: "The passage explicitly says she 'was a small woman.'", isCorrect: false },
                                            { text: "She possesses a quiet but powerful influence over others.", rationale: "Correct. The passage emphasizes her subtle, unspoken authority ('unconscious deference,' 'power was not in decree, but in presence').", isCorrect: true },
                                            { text: "She is unnoticed and ignored by the villagers.", rationale: "The passage shows the opposite is true; the villagers change their behavior when she enters.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'text',
                                        passage: "She was a small woman, but she carried herself with the confidence of a giant. Her eyes, the color of worn denim, missed nothing. When she entered a room, conversation didn't stop, but its pitch and cadence changed. It was the unconscious deference of the village to its unofficial queen. She never raised her voice, yet her softest whisper could quell a brewing argument or ignite a dormant hope. Her power was not in decree, but in presence.",
                                        question: "The phrase 'conversation didn't stop, but its pitch and cadence changed' suggests that:",
                                        answerOptions: [
                                            { text: "People ignored her when she entered the room.", rationale: "The conversation changed because of her presence; it didn't show that people ignored her.", isCorrect: false },
                                            { text: "Her presence had a subtle impact on the room.", rationale: "Correct. The shift in conversation's tone indicates that her presence influenced people without overt commands.", isCorrect: true },
                                            { text: "She deliberately interrupted every conversation.", rationale: "The passage states that the conversation did not stop, so she did not interrupt it.", isCorrect: false },
                                            { text: "The villagers disliked speaking when she was around.", rationale: "There is no indication of dislike; the change suggests respect, not avoidance.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 3,
                                        type: 'text',
                                        passage: "Whenever Malik walked past the boarded-up theater, he slowed his steps. The posters had long since faded, but he still imagined the applause that once shook its rafters. He kept the key to the front door on his keychain, though the lock had not turned in years.",
                                        question: "What do Malik's actions reveal about him?",
                                        answerOptions: [
                                            { text: "He wants to tear down the theater.", rationale: "Nothing indicates he wishes to demolish it; he cherishes it.", isCorrect: false },
                                            { text: "He is indifferent to the theater's history.", rationale: "Slowing down and keeping the key show he values its past.", isCorrect: false },
                                            { text: "He holds sentimental attachment to the theater.", rationale: "Correct. His imagination and the key signal emotional connection.", isCorrect: true },
                                            { text: "He plans to sell the theater soon.", rationale: "No plan to sell is mentioned.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 4,
                                        type: 'text',
                                        passage: "The poet compares her grandmother's hands to 'maps etched with rivers of resilience.'",
                                        question: "What is the effect of this figurative language?",
                                        answerOptions: [
                                            { text: "It suggests her grandmother is obsessed with geography.", rationale: "The comparison is symbolic, not literal.", isCorrect: false },
                                            { text: "It emphasizes the strength and history carried in her grandmother's hands.", rationale: "Correct. 'Maps' and 'rivers' evoke the endurance of a lifetime of work.", isCorrect: true },
                                            { text: "It indicates her grandmother is frail and weak.", rationale: "The imagery highlights resilience, not weakness.", isCorrect: false },
                                            { text: "It shows the grandmother is an artist.", rationale: "The line focuses on character, not occupation.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 5,
                                        type: 'text',
                                        passage: "'If you leave now,' Carlos said, 'the silence will be louder than any apology you could give.'",
                                        question: "What does Carlos mean by this statement?",
                                        answerOptions: [
                                            { text: "He believes silence is relaxing.", rationale: "He uses 'silence' to convey emotional impact, not relaxation.", isCorrect: false },
                                            { text: "Leaving would hurt more than an apology could fix later.", rationale: "Correct. He warns that walking away would cause lasting emotional damage.", isCorrect: true },
                                            { text: "He prefers not to talk about problems.", rationale: "He is urging conversation, not avoidance.", isCorrect: false },
                                            { text: "Apologies are unnecessary.", rationale: "He suggests an apology later would be inadequate, not unnecessary.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 6,
                                        type: 'text',
                                        passage: "Nadia reread the email from the director: 'Your revisions have transformed the play. The characters now breathe.' She exhaled, realizing she had been bracing for criticism.",
                                        question: "Which statement best explains Nadia's reaction?",
                                        answerOptions: [
                                            { text: "She expected harsh feedback and is relieved by praise.", rationale: "Correct. Her held breath and surprise reveal she anticipated criticism.", isCorrect: true },
                                            { text: "She is disappointed the director noticed her work.", rationale: "She is relieved, not disappointed.", isCorrect: false },
                                            { text: "She plans to quit the production.", rationale: "The passage suggests renewed confidence, not resignation.", isCorrect: false },
                                            { text: "She disagrees with the director's assessment.", rationale: "No disagreement is expressed.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 7,
                                        type: 'text',
                                        passage: "The wind rattled the café windows while patrons huddled over mugs. At the corner table, Priya flipped her notebook shut. 'We keep brainstorming new flavors,' she said, 'but the real recipe is already here—it's the way people linger.'",
                                        question: "What central idea does Priya express?",
                                        answerOptions: [
                                            { text: "The café's menu needs more variety.", rationale: "She implies the atmosphere, not new flavors, is key.", isCorrect: false },
                                            { text: "Customers should leave more quickly.", rationale: "She values that customers linger.", isCorrect: false },
                                            { text: "The café's sense of community is its greatest strength.", rationale: "Correct. She believes the gathered people are the 'real recipe.'", isCorrect: true },
                                            { text: "The storm will force the café to close early.", rationale: "Weather sets the scene but does not drive her conclusion.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 8,
                                        type: 'text',
                                        passage: "When the curtain fell, Jae bowed deeply before the small audience. The applause was polite, but his grin was genuine. 'I remembered every line,' he whispered, more to himself than anyone else.",
                                        question: "What does Jae value most about his performance?",
                                        answerOptions: [
                                            { text: "Receiving loud applause from the audience.", rationale: "The applause is polite, yet he is satisfied, indicating applause is not his main concern.", isCorrect: false },
                                            { text: "Perfecting the set design.", rationale: "The passage focuses on his acting, not the set.", isCorrect: false },
                                            { text: "Delivering his lines accurately.", rationale: "Correct. His whispered comment shows pride in remembering every line.", isCorrect: true },
                                            { text: "Ensuring the audience leaves early.", rationale: "There is no mention of wanting the audience to depart.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 9,
                                        type: 'text',
                                        passage: "The narrator describes the library as 'a lighthouse for restless minds,' drawing students in after midnight to study beneath the humming lamps.",
                                        question: "What does this metaphor suggest about the library?",
                                        answerOptions: [
                                            { text: "It is located near the ocean.", rationale: "The metaphor is figurative; there is no literal ocean.", isCorrect: false },
                                            { text: "It guides and supports learners who seek knowledge.", rationale: "Correct. A lighthouse guides travelers; the library guides students.", isCorrect: true },
                                            { text: "It only opens during storms.", rationale: "The passage mentions midnight study sessions, not weather events.", isCorrect: false },
                                            { text: "It is an outdated building needing repairs.", rationale: "The metaphor focuses on purpose, not condition.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 10,
                                        type: 'text',
                                        passage: "'You call it stubborn,' Rosa said, 'but I call it faith in what we've built.'",
                                        question: "What does Rosa's statement reveal about the conflict?",
                                        answerOptions: [
                                            { text: "She believes persistence is necessary to protect their work.", rationale: "Correct. She reframes stubbornness as faith in their efforts.", isCorrect: true },
                                            { text: "She agrees that they should abandon the project.", rationale: "She defends continuing, not abandoning.", isCorrect: false },
                                            { text: "She distrusts the people involved.", rationale: "Her statement expresses belief, not distrust.", isCorrect: false },
                                            { text: "She wants to start a new venture immediately.", rationale: "She is committed to the current project.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 11,
                                        type: 'text',
                                        passage: "In the final chapter, the narrator addresses the reader directly: 'You might think I regretted my choice, but I carry it like a compass, guiding every step.'",
                                        question: "How does this narrative technique affect the reader?",
                                        answerOptions: [
                                            { text: "It creates distance between the narrator and reader.", rationale: "Direct address invites closeness, not distance.", isCorrect: false },
                                            { text: "It encourages readers to consider the narrator's perspective personally.", rationale: "Correct. Addressing 'you' draws readers into the narrator's reflection.", isCorrect: true },
                                            { text: "It reveals that the narrator is unreliable.", rationale: "Nothing suggests dishonesty or unreliability.", isCorrect: false },
                                            { text: "It signals the beginning of a new chapter.", rationale: "The quotation appears in the final chapter, not at the beginning of a new one.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 12,
                                        type: 'text',
                                        passage: "The short story ends with the line, 'They planted the seedling together, neither certain it would survive, but both willing to return each morning with water.'",
                                        question: "Which theme is reinforced by the ending?",
                                        answerOptions: [
                                            { text: "Hope and shared effort can sustain uncertain futures.", rationale: "Correct. Despite uncertainty, the characters commit to caring for the seedling together.", isCorrect: true },
                                            { text: "Success requires abandoning fragile plans.", rationale: "The characters continue nurturing the plant; they do not abandon it.", isCorrect: false },
                                            { text: "Independence is more valuable than cooperation.", rationale: "The ending highlights cooperation, not independence.", isCorrect: false },
                                            { text: "Only experts should attempt new projects.", rationale: "The passage shows ordinary characters willing to try, not experts.", isCorrect: false }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "Language & Grammar": {
                topics: [
                    {
                        id: "rla_grammar_usage",
                        quizzes: [
                            {
                                quizId: "rla_grammar_usage_set1",
                                label: "Quiz A",
                                description: "Strengthen grammar, usage, and mechanics skills for the RLA test.",
                                questionSourceTopicId: "rla_grammar_usage"
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "rla_grammar_usage_set2",
                                label: "Quiz B",
                                description: "Focus on sentence structure, punctuation, and capitalization.",
                                questionSourceTopicId: "rla_grammar_usage",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'knowledge',
                                        question: "Which of the following sentences is capitalized correctly?",
                                        answerOptions: [
                                            { text: "We visited the Grand Canyon, a famous landmark in arizona.", rationale: "The state name 'Arizona' should be capitalized.", isCorrect: false },
                                            { text: "My favorite book is 'The Catcher In The Rye' by J.D. Salinger.", rationale: "In titles, prepositions like 'in' and articles like 'the' are typically not capitalized unless they are the first or last word.", isCorrect: false },
                                            { text: "She is studying french and european history at the university.", rationale: "'French' and 'European' should be capitalized as they are proper adjectives.", isCorrect: false },
                                            { text: "The President of the United States will address the nation on Tuesday.", rationale: "Correct. 'President' is capitalized as a title, and 'Tuesday' is a proper noun.", isCorrect: true }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'knowledge',
                                        question: "Which sentence uses commas correctly?",
                                        answerOptions: [
                                            { text: "After a long, and tiring day, we finally went home.", rationale: "There should not be a comma after 'long' or 'tiring' if 'and' is used. Also, no comma after 'day'.", isCorrect: false },
                                            { text: "She packed a sandwich, an apple, and a bottle of water.", rationale: "Correct. This sentence correctly uses the Oxford comma to separate items in a list.", isCorrect: true },
                                            { text: "He was, however, not ready to leave.", rationale: "While commas around 'however' can be correct, the flow here is awkward. A better structure would be 'He was not ready to leave, however.'", isCorrect: false },
                                            { text: "The man who was wearing a red hat, was my uncle.", rationale: "The clause 'who was wearing a red hat' is essential to identify the man, so it should not be set off by commas.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 3,
                                        type: 'knowledge',
                                        question: "Which sentence is punctuated correctly with a semicolon?",
                                        answerOptions: [
                                            { text: "We planned the fundraiser; and we designed the posters.", rationale: "A semicolon should not be used before a coordinating conjunction like 'and'.", isCorrect: false },
                                            { text: "The meeting ran late; everyone stayed to finish the report.", rationale: "Correct. The semicolon joins two closely related independent clauses.", isCorrect: true },
                                            { text: "It was raining;, so we canceled the picnic.", rationale: "The semicolon and comma together are incorrect.", isCorrect: false },
                                            { text: "She wanted to join the club; but she missed the deadline.", rationale: "A comma should be used with 'but,' not a semicolon.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 4,
                                        type: 'knowledge',
                                        question: "Select the sentence that correctly punctuates a compound sentence.",
                                        answerOptions: [
                                            { text: "The river flooded the road therefore we stayed home.", rationale: "A coordinating conjunction like 'therefore' needs a comma or semicolon before it.", isCorrect: false },
                                            { text: "The sky darkened, and thunder rolled across the hills.", rationale: "Correct. The comma before 'and' properly joins two independent clauses.", isCorrect: true },
                                            { text: "The lights flickered and, the television went silent.", rationale: "The comma is misplaced.", isCorrect: false },
                                            { text: "We hurried inside but, the rain had already started.", rationale: "The comma should come before 'but,' not after it.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 5,
                                        type: 'knowledge',
                                        question: "Which sentence uses a colon correctly?",
                                        answerOptions: [
                                            { text: "Her to-do list included: vacuuming the living room, washing the dishes, and folding laundry.", rationale: "A colon should not come directly after a verb unless the list is formally introduced.", isCorrect: false },
                                            { text: "There are three things I love about autumn: crisp air, colorful leaves, and warm cider.", rationale: "Correct. The independent clause before the colon introduces the list clearly.", isCorrect: true },
                                            { text: "He said: that he would arrive late.", rationale: "The colon interrupts the flow of the sentence unnecessarily.", isCorrect: false },
                                            { text: "Please bring: your ID and ticket to the event.", rationale: "A colon is not needed between the verb and its objects.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 6,
                                        type: 'knowledge',
                                        question: "Which option shows the correct use of a hyphen?",
                                        answerOptions: [
                                            { text: "We saw a well known author at the bookstore.", rationale: "'Well-known' should be hyphenated before a noun.", isCorrect: false },
                                            { text: "The twenty-four-year-old pianist won the competition.", rationale: "Correct. All parts of a compound adjective before a noun are hyphenated.", isCorrect: true },
                                            { text: "Please re-elect the vice president tomorrow.", rationale: "A hyphen is not needed in 're-elect' in modern usage.", isCorrect: false },
                                            { text: "Our plan is cost-effective because we cut unnecessary expenses.", rationale: "'Cost-effective' should be hyphenated when used before or after a noun, but this option is missing the hyphen.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 7,
                                        type: 'knowledge',
                                        question: "Which sentence uses apostrophes correctly?",
                                        answerOptions: [
                                            { text: "The womens' locker room was recently renovated.", rationale: "The plural possessive of 'women' is 'women's.'", isCorrect: false },
                                            { text: "James's guitar needs to be tuned before the show.", rationale: "Correct. Singular nouns ending in s typically add 's to show possession.", isCorrect: true },
                                            { text: "Its' wheels squeaked as it rolled down the hallway.", rationale: "'Its' is already possessive; no apostrophe is needed.", isCorrect: false },
                                            { text: "The dogs collar jingled as she ran.", rationale: "The possessive form should be 'dog's'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 8,
                                        type: 'knowledge',
                                        question: "Which sentence maintains parallel structure?",
                                        answerOptions: [
                                            { text: "The campers enjoy hiking, to swim, and sitting by the fire.", rationale: "The verbs are not in the same form.", isCorrect: false },
                                            { text: "The internship requires attention to detail, communicating clearly, and that you arrive on time.", rationale: "The third element does not match the structure of the first two.", isCorrect: false },
                                            { text: "He promised to proofread the report, to email the client, and to schedule the follow-up meeting.", rationale: "Correct. Each phrase begins with 'to,' creating a parallel structure.", isCorrect: true },
                                            { text: "She likes reading novels, to paint landscapes, and baking bread.", rationale: "The verb forms are inconsistent.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 9,
                                        type: 'knowledge',
                                        question: "Which sentence punctuates dialogue correctly?",
                                        answerOptions: [
                                        { text: "\"Let's head inside\", whispered Leo.", rationale: "The period should be inside the quotation marks, and the dialogue tag should follow after a comma.", isCorrect: false },
                                        { text: "\"Are you ready for the quiz?\" asked Ms. Patel.", rationale: "Correct. The question mark stays inside the quotation marks, and the tag follows.", isCorrect: true },
                                        { text: "\"I can't believe it!\", she said.", rationale: "The punctuation is out of order and excessive.", isCorrect: false },
                                        { text: "He replied, \"I think so?\"", rationale: "The punctuation after the quote is incorrect.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 10,
                                        type: 'knowledge',
                                        question: "Which revision correctly fixes the run-on sentence? 'The choir rehearsed for hours it wanted the concert to be perfect.'",
                                        answerOptions: [
                                            { text: "The choir rehearsed for hours wanting the concert to be perfect.", rationale: "This still creates a run-on by joining ideas without proper punctuation.", isCorrect: false },
                                            { text: "The choir rehearsed for hours, it wanted the concert to be perfect.", rationale: "This is a comma splice.", isCorrect: false },
                                            { text: "The choir rehearsed for hours because it wanted the concert to be perfect.", rationale: "Correct. Adding a subordinating conjunction creates a complete complex sentence.", isCorrect: true },
                                            { text: "The choir rehearsed for hours; wanting the concert to be perfect.", rationale: "The clause after the semicolon is not independent.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 11,
                                        type: 'knowledge',
                                        question: "Which sentence uses an em dash appropriately?",
                                        answerOptions: [
                                            { text: "The recipe called for three ingredients—flour, sugar, butter—and eggs.", rationale: "The sentence uses both a dash and 'and' redundantly.", isCorrect: false },
                                            { text: "Only one person—Jamal—volunteered to stay late and clean up.", rationale: "Correct. The em dashes set off an interruption that adds emphasis.", isCorrect: true },
                                            { text: "She packed her bag—, then she left for the airport.", rationale: "The dash and comma together are incorrect.", isCorrect: false },
                                            { text: "We will—we must—finish the project tomorrow?,", rationale: "The punctuation at the end is incorrect.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 12,
                                        type: 'knowledge',
                                        question: "Which sentence avoids unnecessary wordiness?",
                                        answerOptions: [
                                            { text: "Due to the fact that the train was late, we arrived behind schedule.", rationale: "'Due to the fact that' is wordy; 'Because' would be clearer.", isCorrect: false },
                                            { text: "Because the train was late, we arrived behind schedule.", rationale: "Correct. The sentence is concise and clear.", isCorrect: true },
                                            { text: "On account of the train having been late in its arrival, we were delayed.", rationale: "This sentence is wordy and awkward.", isCorrect: false },
                                            { text: "We were delayed for the reason that the train was late in arriving.", rationale: "This sentence is repetitive and wordy.", isCorrect: false }
                                        ]
                                    }
                                ]
                            },
                            // TODO: UNDER-MINIMUM originally. Added questions to reach 12.
                            {
                                quizId: "rla_grammar_usage_set3",
                                label: "Quiz C",
                                description: "Master verb tenses, subject-verb agreement, and pronoun usage.",
                                questionSourceTopicId: "rla_grammar_usage",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'knowledge',
                                        question: "Which sentence demonstrates correct subject-verb agreement?",
                                        answerOptions: [
                                            { text: "The team of players are ready for the game.", rationale: "'Team' is a singular noun, so the verb should be 'is'.", isCorrect: false },
                                            { text: "Each of the boys has his own ticket.", rationale: "Correct. 'Each' is a singular pronoun, so it takes the singular verb 'has'.", isCorrect: true },
                                            { text: "The news about the storms were frightening.", rationale: "'News' is a singular noun, so the verb should be 'was'.", isCorrect: false },
                                            { text: "There is three reasons for the delay.", rationale: "'Reasons' is plural, so the verb should be 'are'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'knowledge',
                                        question: "Choose the sentence that uses pronouns correctly.",
                                        answerOptions: [
                                            { text: "Her and her friends went to the movies.", rationale: "'Her' is an object pronoun and cannot be the subject of a sentence. It should be 'She'.", isCorrect: false },
                                            { text: "The teacher gave the award to John and I.", rationale: "'I' is a subject pronoun. The object of the preposition 'to' should be 'me'.", isCorrect: false },
                                            { text: "Just between you and me, I think the plan will fail.", rationale: "Correct. 'Me' is the correct object pronoun to use after the preposition 'between'.", isCorrect: true },
                                            { text: "Everyone must turn in their assignment by Friday.", rationale: "This is a common usage, but traditionally 'everyone' is singular and should be paired with 'his or her'. However, 'their' is increasingly accepted. In a strict grammar context, it's often considered incorrect.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 3,
                                        type: 'knowledge',
                                        question: "Which sentence maintains consistent verb tense?",
                                        answerOptions: [
                                            { text: "Maria finished her homework and goes outside to play.", rationale: "The verbs shift from past to present without reason.", isCorrect: false },
                                            { text: "The orchestra tunes their instruments and then performed the piece.", rationale: "The verbs shift from present to past unnecessarily.", isCorrect: false },
                                            { text: "After they packed the car, they drove to the campsite.", rationale: "Correct. Both verbs are in the past tense and logically ordered.", isCorrect: true },
                                            { text: "He will studies the notes before the exam.", rationale: "'Will studies' is not a correct verb form.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 4,
                                        type: 'knowledge',
                                        question: "Which sentence uses the correct pronoun in a compound object?",
                                        answerOptions: [
                                            { text: "The invitation was addressed to Carlos and I.", rationale: "'I' should be 'me' as part of the object of the preposition 'to'.", isCorrect: false },
                                            { text: "Grandma baked cookies for my sister and me.", rationale: "Correct. 'Me' is the appropriate object pronoun.", isCorrect: true },
                                            { text: "The coach congratulated she and I after the game.", rationale: "Both pronouns should be in object form: 'her and me'.", isCorrect: false },
                                            { text: "Our neighbors invited we to their barbecue.", rationale: "'We' should be 'us'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 5,
                                        type: 'knowledge',
                                        question: "Which sentence forms the comparative adjective correctly?",
                                        answerOptions: [
                                            { text: "This puzzle is more easier than the last one.", rationale: "'More' and '-er' should not be used together.", isCorrect: false },
                                            { text: "Of the two routes, the highway is faster.", rationale: "Correct. 'Faster' is the proper comparative form when comparing two items.", isCorrect: true },
                                            { text: "This recipe is gooder than the other one.", rationale: "'Gooder' is not a standard comparative form.", isCorrect: false },
                                            { text: "Our team played most well in the second half.", rationale: "The comparative form should be 'better'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 6,
                                        type: 'knowledge',
                                        question: "Which sentence places the modifier correctly?",
                                        answerOptions: [
                                            { text: "Running down the street, the backpack fell off Jamal's shoulder.", rationale: "It sounds like the backpack was running.", isCorrect: false },
                                            { text: "She nearly drove her brother to school every day.", rationale: "'Nearly drove' changes the meaning.", isCorrect: false },
                                            { text: "Walking into the auditorium, Maya spotted her friends in the front row.", rationale: "Correct. The introductory modifier clearly refers to Maya.", isCorrect: true },
                                            { text: "After finishing the experiment, the results were recorded by the students.", rationale: "The modifier should clearly reference the students, not the results.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 7,
                                        type: 'knowledge',
                                        question: "Which option correctly uses the past perfect tense?",
                                        answerOptions: [
                                            { text: "By the time we arrived, the movie started.", rationale: "The past perfect is needed to show which action happened first.", isCorrect: false },
                                            { text: "They had eaten dinner before the guests knocked on the door.", rationale: "Correct. 'Had eaten' shows the meal was finished before the knock.", isCorrect: true },
                                            { text: "When the bell had rung, students leave the classroom.", rationale: "Tense inconsistency makes the sentence incorrect.", isCorrect: false },
                                            { text: "She had goes to the store before it closed.", rationale: "'Had goes' is not a correct verb form.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 8,
                                        type: 'knowledge',
                                        question: "Which sentence uses 'who' or 'whom' correctly?",
                                        answerOptions: [
                                            { text: "To who should I address the letter?", rationale: "'Whom' is needed as the object of the preposition 'to'.", isCorrect: false },
                                            { text: "Whom is making the announcement this afternoon?", rationale: "'Who' should be used as the subject of the sentence.", isCorrect: false },
                                            { text: "We asked whom the scholarship committee selected.", rationale: "Correct. 'Whom' functions as the object of 'selected'.", isCorrect: true },
                                            { text: "The neighbors, who we admire, are moving next week.", rationale: "'Whom' should be used because it is the object of 'admire'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 9,
                                        type: 'knowledge',
                                        question: "Which sentence uses the correct pronoun to agree with its antecedent?",
                                        answerOptions: [
                                            { text: "Neither of the singers forgot their lyrics.", rationale: "A singular pronoun should refer back to 'neither'.", isCorrect: false },
                                            { text: "Each student must bring their own calculator.", rationale: "In traditional grammar rules, 'each' is singular and should pair with 'his or her'.", isCorrect: false },
                                            { text: "Anyone who wants a program should pick up his or her copy at the door.", rationale: "Correct. 'Anyone' is singular, so 'his or her' maintains agreement.", isCorrect: true },
                                            { text: "Everybody need to turn in their assignments.", rationale: "'Everybody' is singular and should take 'needs'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 10,
                                        type: 'knowledge',
                                        question: "Which sentence uses the correct form of the verb with an indefinite pronoun?",
                                        answerOptions: [
                                            { text: "All of the pie was eaten by the guests.", rationale: "Correct. 'All' refers to a singular noun ('pie'), so the singular verb 'was' is appropriate.", isCorrect: true },
                                            { text: "None of the cookies is missing from the plate.", rationale: "'None' with a plural noun typically takes a plural verb: 'are missing'.", isCorrect: false },
                                            { text: "Some of the students has finished the project.", rationale: "'Some' with a plural noun should take 'have'.", isCorrect: false },
                                            { text: "Most of the water have evaporated.", rationale: "'Water' is singular, so the verb should be 'has'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 11,
                                        type: 'knowledge',
                                        question: "Which sentence correctly distinguishes between 'its' and 'it's'?",
                                        answerOptions: [
                                            { text: "The company updated it's website after the launch.", rationale: "'It's' means 'it is' and is incorrect here.", isCorrect: false },
                                            { text: "The cat stretched its paws before curling up on the blanket.", rationale: "Correct. 'Its' shows possession without an apostrophe.", isCorrect: true },
                                            { text: "Its going to rain later this evening.", rationale: "'It's' (it is) should be used here.", isCorrect: false },
                                            { text: "The tree lost it's leaves early this year.", rationale: "The possessive pronoun should be 'its'.", isCorrect: false }
                                        ]
                                    },
                                    {
                                        questionNumber: 12,
                                        type: 'knowledge',
                                        question: "Which sentence avoids a double negative?",
                                        answerOptions: [
                                            { text: "I can't hardly hear the speaker from the back row.", rationale: "'Can't hardly' creates a double negative.", isCorrect: false },
                                            { text: "We didn't see no shooting stars last night.", rationale: "'Didn't' and 'no' create a double negative.", isCorrect: false },
                                            { text: "The librarian didn't tell anyone to remain quiet.", rationale: "Correct. Only one negative word is used.", isCorrect: true },
                                            { text: "He hasn't never tried sushi before.", rationale: "'Hasn't never' is a double negative.", isCorrect: false }
                                        ]
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
        icon: "GlobeIcon",
        categories: {
            "U.S. History": {
                topics: [
                    {
                        id: "ss_us_hist_colonial_period",
                        title: "Colonial Period",
                        description: "European settlement, development of the 13 colonies.",
                        quizzes: [
                            {
                                quizId: "ss_us_hist_colonial_period_set1",
                                label: "Quiz A",
                                description: "Quiz on European settlement and the 13 colonies.",
                                questionSourceTopicId: "ss_us_hist_colonial_period"
                            },
                            {
                                quizId: "ss_us_hist_colonial_period_set2",
                                label: "Quiz B",
                                description: "Quiz on the development of the 13 colonies.",
                                questionSourceTopicId: "ss_us_hist_colonial_period"
                            },
                            {
                                quizId: "ss_us_hist_colonial_period_set3",
                                label: "Quiz C",
                                description: "Quiz on colonial life and economy.",
                                questionSourceTopicId: "ss_us_hist_colonial_period"
                            }
                        ]
                    },
                    {
                        id: "ss_us_hist_american_revolution",
                        title: "The American Revolution",
                        description: "Causes, key events, and outcomes.",
                        quizzes: [
                            {
                                quizId: "ss_us_hist_american_revolution_set1",
                                label: "Quiz A",
                                description: "Quiz on the causes of the American Revolution.",
                                title: "Causes of the Revolution",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'knowledge',
                                        question: "What was the primary purpose of the Stamp Act of 1765?",
                                        answerOptions: [
                                            {
                                                text: "To restrict colonial trade with France.",
                                                rationale: "The Stamp Act placed taxes on paper goods; it did not target trade with France.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "To raise revenue from the colonies for Britain.",
                                                rationale: "Correct. Britain introduced the tax to help pay debts from the French and Indian War.",
                                                isCorrect: true
                                            },
                                            {
                                                text: "To pay for the housing of British soldiers.",
                                                rationale: "Housing troops was the focus of the Quartering Act, not the Stamp Act.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "To establish a colonial postal service.",
                                                rationale: "The Stamp Act concerned taxation on paper products, not mail delivery.",
                                                isCorrect: false
                                            }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'knowledge',
                                        question: "The Boston Tea Party was a protest against which British policy?",
                                        answerOptions: [
                                            {
                                                text: "The Townshend Acts",
                                                rationale: "The Townshend Acts taxed imports like glass and lead, but the Tea Party targeted a later tea tax.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "The Intolerable Acts",
                                                rationale: "These acts were passed in response to the Boston Tea Party, not the cause of it.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "The Tea Act",
                                                rationale: "Correct. Colonists dumped tea to protest the Tea Act's tax and monopoly for the British East India Company.",
                                                isCorrect: true
                                            },
                                            {
                                                text: "The Quartering Act",
                                                rationale: "The Quartering Act required colonists to house soldiers but was not the focus of the Tea Party protest.",
                                                isCorrect: false
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                quizId: "ss_us_hist_american_revolution_set2",
                                label: "Quiz B",
                                description: "Quiz on the key events of the American Revolution.",
                                title: "Key Figures and Battles",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'knowledge',
                                        question: "Who was the primary author of the Declaration of Independence?",
                                        answerOptions: [
                                            {
                                                text: "George Washington",
                                                rationale: "Washington commanded the Continental Army but did not draft the Declaration.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "Benjamin Franklin",
                                                rationale: "Franklin served on the committee but was not the principal author.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "John Adams",
                                                rationale: "Adams advocated strongly for independence but asked another delegate to draft the document.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "Thomas Jefferson",
                                                rationale: "Correct. Jefferson drafted the Declaration of Independence.",
                                                isCorrect: true
                                            }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'knowledge',
                                        question: "The Battle of Saratoga was a significant turning point in the war because it:",
                                        answerOptions: [
                                            {
                                                text: "Led to the capture of Philadelphia.",
                                                rationale: "The capture of Philadelphia was connected to battles elsewhere, not Saratoga.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "Was the first major victory for the Continental Army.",
                                                rationale: "Earlier battles such as those at Trenton and Princeton also provided major victories.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "Convinced France to form an alliance with the United States.",
                                                rationale: "Correct. The American victory at Saratoga helped secure French military support.",
                                                isCorrect: true
                                            },
                                            {
                                                text: "Resulted in the surrender of General Cornwallis.",
                                                rationale: "Cornwallis surrendered later at Yorktown, not Saratoga.",
                                                isCorrect: false
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                quizId: "ss_us_hist_american_revolution_set3",
                                label: "Quiz C",
                                description: "Quiz on the outcomes of the American Revolution.",
                                title: "Ideals and Consequences",
                                questions: [
                                    {
                                        questionNumber: 1,
                                        type: 'knowledge',
                                        question: "Which Enlightenment philosopher's ideas of natural rights heavily influenced the Declaration of Independence?",
                                        answerOptions: [
                                            {
                                                text: "Montesquieu",
                                                rationale: "Montesquieu influenced ideas about separation of powers but not the natural rights language in the Declaration.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "Voltaire",
                                                rationale: "Voltaire emphasized civil liberties, yet the Declaration's natural rights language drew more directly from another thinker.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "John Locke",
                                                rationale: "Correct. Locke's ideas about life, liberty, and property inspired Jefferson's writing.",
                                                isCorrect: true
                                            },
                                            {
                                                text: "Jean-Jacques Rousseau",
                                                rationale: "Rousseau wrote about the social contract, but the natural rights emphasis came from Locke.",
                                                isCorrect: false
                                            }
                                        ]
                                    },
                                    {
                                        questionNumber: 2,
                                        type: 'knowledge',
                                        question: "What was the name of the treaty that officially ended the American Revolutionary War?",
                                        answerOptions: [
                                            {
                                                text: "The Treaty of Ghent",
                                                rationale: "The Treaty of Ghent ended the War of 1812, not the Revolutionary War.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "The Treaty of Paris",
                                                rationale: "Correct. The 1783 Treaty of Paris recognized American independence and ended the war.",
                                                isCorrect: true
                                            },
                                            {
                                                text: "The Treaty of Versailles",
                                                rationale: "This treaty concluded World War I, not the American Revolution.",
                                                isCorrect: false
                                            },
                                            {
                                                text: "The Jay Treaty",
                                                rationale: "Jay's Treaty addressed lingering disputes with Britain in 1794 but did not end the war itself.",
                                                isCorrect: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: "ss_us_hist_early_republic",
                        title: "The Early Republic",
                        description: "The Constitution, nation-building, and early challenges.",
                        quizzes: [
                            {
                                quizId: "ss_us_hist_early_republic_set1",
                                label: "Quiz A",
                                description: "Quiz on the U.S. Constitution.",
                                questionSourceTopicId: "ss_us_hist_early_republic"
                            },
                            {
                                quizId: "ss_us_hist_early_republic_set2",
                                label: "Quiz B",
                                description: "Quiz on nation-building in the Early Republic.",
                                questionSourceTopicId: "ss_us_hist_early_republic"
                            },
                            {
                                quizId: "ss_us_hist_early_republic_set3",
                                label: "Quiz C",
                                description: "Quiz on the early challenges of the Republic.",
                                questionSourceTopicId: "ss_us_hist_early_republic"
                            }
                        ]
                    },
                    {
                        id: "ss_us_hist_westward_expansion",
                        title: "Westward Expansion",
                        description: "Manifest Destiny, territorial acquisitions, and impact on Native Americans.",
                        quizzes: [
                            {
                                quizId: "ss_us_hist_westward_expansion_set1",
                                label: "Quiz A",
                                description: "Quiz on Manifest Destiny.",
                                questionSourceTopicId: "ss_us_hist_westward_expansion"
                            },
                            {
                                quizId: "ss_us_hist_westward_expansion_set2",
                                label: "Quiz B",
                                description: "Quiz on territorial acquisitions.",
                                questionSourceTopicId: "ss_us_hist_westward_expansion"
                            },
                            {
                                quizId: "ss_us_hist_westward_expansion_set3",
                                label: "Quiz C",
                                description: "Quiz on the impact on Native Americans.",
                                questionSourceTopicId: "ss_us_hist_westward_expansion"
                            }
                        ]
                    },
                    {
                        id: "ss_us_hist_civil_war",
                        title: "Civil War and Reconstruction",
                        description: "Causes, major conflicts, and the rebuilding of the nation.",
                        quizzes: [
                            {
                                quizId: "ss_us_hist_civil_war_set1",
                                label: "Quiz A",
                                description: "Quiz on the causes of the Civil War.",
                                questionSourceTopicId: "ss_us_hist_civil_war"
                            },
                            {
                                quizId: "ss_us_hist_civil_war_set2",
                                label: "Quiz B",
                                description: "Quiz on the major conflicts of the Civil War.",
                                questionSourceTopicId: "ss_us_hist_civil_war"
                            },
                            {
                                quizId: "ss_us_hist_civil_war_set3",
                                label: "Quiz C",
                                description: "Quiz on the Reconstruction era.",
                                questionSourceTopicId: "ss_us_hist_civil_war"
                            }
                        ]
                    }
                ]
            },
            "Civics & Government": {
                topics: [
                    {
                        id: "ss_civics_constitutional_principles",
                        title: "Key Constitutional Principles",
                        description: "Popular sovereignty, federalism, separation of powers, checks and balances.",
                        quizzes: [
                            {
                                quizId: "ss_civics_constitutional_principles_set1",
                                label: "Quiz A",
                                description: "Quiz on popular sovereignty and federalism.",
                                questionSourceTopicId: "ss_civics_constitutional_principles"
                            },
                            {
                                quizId: "ss_civics_constitutional_principles_set2",
                                label: "Quiz B",
                                description: "Quiz on separation of powers.",
                                questionSourceTopicId: "ss_civics_constitutional_principles"
                            },
                            {
                                quizId: "ss_civics_constitutional_principles_set3",
                                label: "Quiz C",
                                description: "Quiz on checks and balances.",
                                questionSourceTopicId: "ss_civics_constitutional_principles"
                            }
                        ]
                    },
                    {
                        id: "ss_civics_bill_of_rights",
                        title: "The Bill of Rights",
                        description: "The first 10 amendments and their significance.",
                        quizzes: [
                            {
                                quizId: "ss_civics_bill_of_rights_set1",
                                label: "Quiz A",
                                description: "Quiz on the first 5 amendments.",
                                questionSourceTopicId: "ss_civics_bill_of_rights"
                            },
                            {
                                quizId: "ss_civics_bill_of_rights_set2",
                                label: "Quiz B",
                                description: "Quiz on amendments 6-10.",
                                questionSourceTopicId: "ss_civics_bill_of_rights"
                            },
                            {
                                quizId: "ss_civics_bill_of_rights_set3",
                                label: "Quiz C",
                                description: "Quiz on the significance of the Bill of Rights.",
                                questionSourceTopicId: "ss_civics_bill_of_rights"
                            }
                        ]
                    },
                    {
                        id: "ss_civics_gov_structure",
                        title: "Structure of the U.S. Government",
                        description: "The legislative, executive, and judicial branches.",
                        quizzes: [
                            {
                                quizId: "ss_civics_gov_structure_set1",
                                label: "Quiz A",
                                description: "Quiz on the legislative branch.",
                                questionSourceTopicId: "ss_civics_gov_structure"
                            },
                            {
                                quizId: "ss_civics_gov_structure_set2",
                                label: "Quiz B",
                                description: "Quiz on the executive branch.",
                                questionSourceTopicId: "ss_civics_gov_structure"
                            },
                            {
                                quizId: "ss_civics_gov_structure_set3",
                                label: "Quiz C",
                                description: "Quiz on the judicial branch.",
                                questionSourceTopicId: "ss_civics_gov_structure"
                            }
                        ]
                    },
                    {
                        id: "ss_civics_elections",
                        title: "Political Parties and Elections",
                        description: "The role of parties, the election process, and civic participation.",
                        quizzes: [
                            {
                                quizId: "ss_civics_elections_set1",
                                label: "Quiz A",
                                description: "Quiz on political parties.",
                                questionSourceTopicId: "ss_civics_elections"
                            },
                            {
                                quizId: "ss_civics_elections_set2",
                                label: "Quiz B",
                                description: "Quiz on the election process.",
                                questionSourceTopicId: "ss_civics_elections"
                            },
                            {
                                quizId: "ss_civics_elections_set3",
                                label: "Quiz C",
                                description: "Quiz on civic participation.",
                                questionSourceTopicId: "ss_civics_elections"
                            }
                        ]
                    },
                    {
                        id: "ss_civics_supreme_court",
                        title: "Landmark Supreme Court Cases",
                        description: "Key decisions and their impact on American society.",
                        quizzes: [
                            {
                                quizId: "ss_civics_supreme_court_set1",
                                label: "Quiz A",
                                description: "Quiz on early landmark cases.",
                                questionSourceTopicId: "ss_civics_supreme_court"
                            },
                            {
                                quizId: "ss_civics_supreme_court_set2",
                                label: "Quiz B",
                                description: "Quiz on 20th-century landmark cases.",
                                questionSourceTopicId: "ss_civics_supreme_court"
                            },
                            {
                                quizId: "ss_civics_supreme_court_set3",
                                label: "Quiz C",
                                description: "Quiz on recent landmark cases.",
                                questionSourceTopicId: "ss_civics_supreme_court"
                            }
                        ]
                    }
                ]
            },
            "Economics": {
                topics: [
                    {
                        id: "ss_econ_foundations",
                        quizzes: [
                            {
                                quizId: "ss_econ_foundations_set1",
                                label: "Quiz A",
                                description: "Understand core economic concepts, fiscal policy, and the role of government.",
                                questionSourceTopicId: "ss_econ_foundations"
                            }
                        ]
                    }
                ]
            },
            "Geography and the World": {
                topics: [
                    {
                        id: "ss_geo_map_skills",
                        quizzes: [
                            {
                                quizId: "ss_geo_map_skills_set1",
                                label: "Quiz A",
                                description: "Apply map, chart, and data analysis skills to geographic scenarios.",
                                questionSourceTopicId: "ss_geo_map_skills"
                            }
                        ]
                    }
                ]
            }
        }
    }
};


(function(global) {
    if (!global) {
        return;
    }
    global.ExpandedQuizData = expandedQuizData;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));

if (typeof module !== 'undefined' && module.exports) {
    module.exports = expandedQuizData;
}
