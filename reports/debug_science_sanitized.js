var quizzes = [
{
    "subject": "Science",
    "topic": "Life Science",
    "id": "sci_life_science_cells_organelles_1",
    "title": "Life Science: Cells and Organelles",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which organelle is known as the 'powerhouse' of the cell because it generates most of the cell's supply of adenosine triphosphate (ATP)?",
            "answerOptions": [
                { "text": "Nucleus", "rationale": "The nucleus is the control center of the cell and contains the genetic material.", "isCorrect": false },
                { "text": "Ribosome", "rationale": "Ribosomes are responsible for protein synthesis.", "isCorrect": false },
                { "text": "Mitochondrion", "rationale": "Correct. Mitochondria are the sites of cellular respiration.", "isCorrect": true },
                { "text": "Chloroplast", "rationale": "Chloroplasts are the site of photosynthesis in plant cells.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the main function of the cell membrane?",
            "answerOptions": [
                { "text": "To provide rigid support for the cell.", "rationale": "This is the function of the cell wall in plant cells.", "isCorrect": false },
                { "text": "To control which substances enter and leave the cell.", "rationale": "Correct. The cell membrane is selectively permeable.", "isCorrect": true },
                { "text": "To store the cell's genetic material.", "rationale": "This is the function of the nucleus.", "isCorrect": false },
                { "text": "To synthesize proteins.", "rationale": "This is the function of ribosomes.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which of the following is a key difference between plant and animal cells?",
            "answerOptions": [
                { "text": "Animal cells have a nucleus, but plant cells do not.", "rationale": "Both plant and animal cells are eukaryotic and have a nucleus.", "isCorrect": false },
                { "text": "Plant cells have a cell wall and chloroplasts, while animal cells do not.", "rationale": "Correct. These are two of the most prominent differences.", "isCorrect": true },
                { "text": "Animal cells have mitochondria, but plant cells do not.", "rationale": "Both plant and animal cells have mitochondria for cellular respiration.", "isCorrect": false },
                { "text": "Plant cells are prokaryotic, while animal cells are eukaryotic.", "rationale": "Both are eukaryotic.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The genetic material within the nucleus of a cell is organized into structures called:",
            "answerOptions": [
                { "text": "Chromosomes", "rationale": "Correct. Chromosomes are made of DNA tightly coiled many times around proteins called histones.", "isCorrect": true },
                { "text": "Vacuoles", "rationale": "Vacuoles are storage bubbles found in cells.", "isCorrect": false },
                { "text": "Lysosomes", "rationale": "Lysosomes are organelles that contain digestive enzymes.", "isCorrect": false },
                { "text": "Cytoplasm", "rationale": "Cytoplasm is the jelly-like substance that fills the cell.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A scientist is observing a cell under a microscope. The cell has a distinct, regular shape. It contains a large central vacuole that takes up a significant portion of the cell's volume. Green, oval-shaped organelles are visible throughout the cytoplasm. The cell is surrounded by a thick outer layer outside of its membrane.",
            "question": "Based on these observations, what type of cell is the scientist most likely observing?",
            "answerOptions": [
                { "text": "A human red blood cell", "rationale": "Red blood cells are irregular in shape, lack a nucleus and most other organelles, and do not have a cell wall.", "isCorrect": false },
                { "text": "A bacterium", "rationale": "Bacteria are prokaryotic and lack a nucleus and other membrane-bound organelles like chloroplasts or a large central vacuole.", "isCorrect": false },
                { "text": "An animal nerve cell", "rationale": "Nerve cells have an irregular shape and lack a cell wall, chloroplasts, and a large central vacuole.", "isCorrect": false },
                { "text": "A plant leaf cell", "rationale": "Correct. The regular shape, cell wall, large central vacuole, and green chloroplasts are all characteristic features of a plant cell.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A scientist is observing a cell under a microscope. The cell has a distinct, regular shape. It contains a large central vacuole that takes up a significant portion of the cell's volume. Green, oval-shaped organelles are visible throughout the cytoplasm. The cell is surrounded by a thick outer layer outside of its membrane.",
            "question": "What is the function of the green, oval-shaped organelles mentioned in the passage?",
            "answerOptions": [
                { "text": "To store water and maintain turgor pressure.", "rationale": "This is the function of the large central vacuole.", "isCorrect": false },
                { "text": "To control the cell's activities.", "rationale": "This is the function of the nucleus (not explicitly mentioned but present in this cell type).", "isCorrect": false },
                { "text": "To perform photosynthesis.", "rationale": "Correct. These organelles are chloroplasts, the site of photosynthesis.", "isCorrect": true },
                { "text": "To break down waste materials.", "rationale": "This is the function of lysosomes.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the jelly-like substance that fills the cell and surrounds the organelles?",
            "answerOptions": [
                { "text": "Nucleolus", "rationale": "The nucleolus is a structure within the nucleus.", "isCorrect": false },
                { "text": "Cytoplasm", "rationale": "Correct. This is the medium for most of the cell's metabolic reactions.", "isCorrect": true },
                { "text": "Cellulose", "rationale": "Cellulose is the material that makes up the plant cell wall.", "isCorrect": false },
                { "text": "DNA", "rationale": "DNA is the genetic material found in the nucleus.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which organelle is responsible for synthesizing proteins?",
            "answerOptions": [
                { "text": "Golgi apparatus", "rationale": "The Golgi apparatus modifies, sorts, and packages proteins and lipids.", "isCorrect": false },
                { "text": "Endoplasmic reticulum", "rationale": "The endoplasmic reticulum is involved in protein and lipid synthesis, but the ribosomes are the direct site of protein synthesis.", "isCorrect": false },
                { "text": "Ribosome", "rationale": "Correct. Ribosomes read messenger RNA (mRNA) and assemble amino acids into proteins.", "isCorrect": true },
                { "text": "Lysosome", "rationale": "Lysosomes are involved in waste breakdown.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Prokaryotic cells, such as bacteria, differ from eukaryotic cells (like plant and animal cells) in that they lack:",
            "answerOptions": [
                { "text": "A cell membrane", "rationale": "All cells have a cell membrane.", "isCorrect": false },
                { "text": "Ribosomes", "rationale": "All cells have ribosomes to produce proteins.", "isCorrect": false },
                { "text": "A nucleus and other membrane-bound organelles", "rationale": "Correct. The genetic material in prokaryotes is located in a region called the nucleoid, not enclosed in a nucleus.", "isCorrect": true },
                { "text": "Genetic material (DNA)", "rationale": "All cells have DNA.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Which organelle acts as the 'packaging and shipping center' of the cell, modifying, sorting, and packaging proteins and lipids for secretion or delivery to other organelles?",
            "answerOptions": [
                { "text": "The endoplasmic reticulum", "rationale": "The ER is involved in synthesis, but the Golgi apparatus handles the final packaging and shipping.", "isCorrect": false },
                { "text": "The Golgi apparatus (or Golgi complex)", "rationale": "Correct. It receives proteins and lipids from the ER and prepares them for their final destinations.", "isCorrect": true },
                { "text": "The vacuole", "rationale": "The vacuole is primarily for storage.", "isCorrect": false },
                { "text": "The peroxisome", "rationale": "Peroxisomes are involved in breaking down fatty acids.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The basic unit of life is the:",
            "answerOptions": [
                { "text": "Atom", "rationale": "The atom is the basic unit of matter.", "isCorrect": false },
                { "text": "Molecule", "rationale": "A molecule is a group of atoms bonded together.", "isCorrect": false },
                { "text": "Cell", "rationale": "Correct. All living things are made of cells.", "isCorrect": true },
                { "text": "Organ", "rationale": "An organ is a group of tissues that perform a specific function.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What is the primary function of lysosomes?",
            "answerOptions": [
                { "text": "To generate energy for the cell.", "rationale": "This is the function of mitochondria.", "isCorrect": false },
                { "text": "To break down and recycle waste materials and cellular debris.", "rationale": "Correct. They act as the cell's 'recycling center'.", "isCorrect": true },
                { "text": "To provide a pathway for transporting molecules.", "rationale": "This is a function of the endoplasmic reticulum.", "isCorrect": false },
                { "text": "To give the cell its shape.", "rationale": "This is a function of the cytoskeleton and cell wall.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Physical Science",
    "id": "sci_physical_science_matter_energy_2",
    "title": "Physical Science: Matter and Energy",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of the following is a physical change?",
            "answerOptions": [
                { "text": "Burning wood", "rationale": "Burning wood is a chemical change because it creates new substances (ash, smoke).", "isCorrect": false },
                { "text": "Melting ice", "rationale": "Correct. This is a change of state from solid to liquid, but the substance (water) remains the same.", "isCorrect": true },
                { "text": "Rusting iron", "rationale": "Rusting is a chemical change where iron reacts with oxygen.", "isCorrect": false },
                { "text": "Baking a cake", "rationale": "Baking involves chemical reactions that change the ingredients.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The energy of motion is called:",
            "answerOptions": [
                { "text": "Potential energy", "rationale": "Potential energy is stored energy.", "isCorrect": false },
                { "text": "Chemical energy", "rationale": "Chemical energy is stored in the bonds of chemical compounds.", "isCorrect": false },
                { "text": "Kinetic energy", "rationale": "Correct. The faster an object moves, the more kinetic energy it has.", "isCorrect": true },
                { "text": "Nuclear energy", "rationale": "Nuclear energy is stored in the nucleus of an atom.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The law of conservation of energy states that:",
            "answerOptions": [
                { "text": "Energy can be created from nothing.", "rationale": "This violates the law.", "isCorrect": false },
                { "text": "Energy can be destroyed.", "rationale": "This violates the law.", "isCorrect": false },
                { "text": "Energy cannot be created or destroyed, only transformed from one form to another.", "rationale": "Correct. This is a fundamental principle of physics.", "isCorrect": true },
                { "text": "The total energy in the universe is decreasing.", "rationale": "The total energy is constant.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Heat transfer through direct contact is known as:",
            "answerOptions": [
                { "text": "Conduction", "rationale": "Correct. An example is a pan heating up on a stove.", "isCorrect": true },
                { "text": "Convection", "rationale": "Convection is heat transfer through the movement of fluids (liquids or gases).", "isCorrect": false },
                { "text": "Radiation", "rationale": "Radiation is heat transfer through electromagnetic waves, like the heat from the sun.", "isCorrect": false },
                { "text": "Insulation", "rationale": "Insulation is a material that reduces heat transfer.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A student places a metal spoon in a cup of hot soup. After a few minutes, the handle of the spoon, which was not in the soup, becomes warm.",
            "question": "This is an example of which type of heat transfer?",
            "answerOptions": [
                { "text": "Convection, because the heat is moving in a current.", "rationale": "Convection occurs in fluids, not through a solid spoon.", "isCorrect": false },
                { "text": "Radiation, because the heat is traveling through the air.", "rationale": "While some radiation occurs, the primary method of heat transfer up the solid spoon is conduction.", "isCorrect": false },
                { "text": "Conduction, because heat is being transferred directly through the solid material of the spoon.", "rationale": "Correct. The heat energy is transferred from particle to particle up the spoon's handle.", "isCorrect": true },
                { "text": "Specific heat, because the spoon has a low specific heat.", "rationale": "Specific heat is a property of the material, not the method of heat transfer.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "A student places a metal spoon in a cup of hot soup. After a few minutes, the handle of the spoon, which was not in the soup, becomes warm.",
            "question": "Why does the metal spoon heat up quickly?",
            "answerOptions": [
                { "text": "Because metals are good insulators.", "rationale": "Insulators resist heat transfer.", "isCorrect": false },
                { "text": "Because metals are good conductors.", "rationale": "Correct. Metals allow heat energy to pass through them easily.", "isCorrect": true },
                { "text": "Because the spoon is colder than the soup.", "rationale": "This explains the direction of heat flow, but not why it happens quickly.", "isCorrect": false },
                { "text": "Because the soup is a liquid.", "rationale": "The properties of the spoon, not the soup, determine how quickly the handle heats up.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The three common states of matter are:",
            "answerOptions": [
                { "text": "Solid, liquid, and gas", "rationale": "Correct. These are the three states of matter most commonly encountered on Earth.", "isCorrect": true },
                { "text": "Atom, molecule, and compound", "rationale": "These are levels of chemical organization, not states of matter.", "isCorrect": false },
                { "text": "Conduction, convection, and radiation", "rationale": "These are methods of heat transfer.", "isCorrect": false },
                { "text": "Proton, neutron, and electron", "rationale": "These are subatomic particles.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A substance's ability to be dissolved in another substance is called its:",
            "answerOptions": [
                { "text": "Density", "rationale": "Density is mass per unit volume.", "isCorrect": false },
                { "text": "Melting point", "rationale": "Melting point is the temperature at which a solid becomes a liquid.", "isCorrect": false },
                { "text": "Solubility", "rationale": "Correct. For example, sugar has a high solubility in water.", "isCorrect": true },
                { "text": "Flammability", "rationale": "Flammability is a chemical property describing how easily something ignites.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "At the top of a roller coaster hill, a cart has its maximum amount of ________ energy. As it goes down the hill, this energy is converted into ________ energy.",
            "answerOptions": [
                { "text": "kinetic; potential", "rationale": "This is the reverse of what happens.", "isCorrect": false },
                { "text": "potential; kinetic", "rationale": "Correct. The stored energy of position (potential) is converted into the energy of motion (kinetic) as the cart speeds down the hill.", "isCorrect": true },
                { "text": "chemical; thermal", "rationale": "These energy forms are not the primary ones involved in this mechanical process.", "isCorrect": false },
                { "text": "potential; chemical", "rationale": "The potential energy is converted to kinetic energy, not chemical energy.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What is the primary method of heat transfer that warms the Earth from the Sun?",
            "answerOptions": [
                { "text": "Conduction", "rationale": "Conduction requires direct contact, and space is a vacuum.", "isCorrect": false },
                { "text": "Convection", "rationale": "Convection requires a medium (fluid) to transfer heat, and space is a vacuum.", "isCorrect": false },
                { "text": "Radiation", "rationale": "Correct. The Sun emits electromagnetic radiation, which travels through the vacuum of space to reach Earth.", "isCorrect": true },
                { "text": "Fusion", "rationale": "Fusion is the process that powers the Sun, but it is not the method of heat transfer to Earth.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A chemical reaction that absorbs heat from its surroundings is called:",
            "answerOptions": [
                { "text": "Exothermic", "rationale": "Exothermic reactions release heat.", "isCorrect": false },
                { "text": "Endothermic", "rationale": "Correct. An example is the chemical reaction in a cold pack.", "isCorrect": true },
                { "text": "Combustion", "rationale": "Combustion (burning) is a type of exothermic reaction.", "isCorrect": false },
                { "text": "Neutralization", "rationale": "Neutralization reactions are typically exothermic.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Which of the following describes the process of sublimation?",
            "answerOptions": [
                { "text": "A solid turning directly into a gas.", "rationale": "Correct. Dry ice (solid carbon dioxide) turning into gas is a common example.", "isCorrect": true },
                { "text": "A gas turning directly into a solid.", "rationale": "This is called deposition.", "isCorrect": false },
                { "text": "A liquid turning into a gas.", "rationale": "This is evaporation or boiling.", "isCorrect": false },
                { "text": "A gas turning into a liquid.", "rationale": "This is condensation.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Earth and Space Science",
    "id": "sci_earth_space_science_rock_cycle_3",
    "title": "Earth & Space Science: The Rock Cycle",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which type of rock is formed from the cooling and solidification of magma or lava?",
            "answerOptions": [
                { "text": "Sedimentary rock", "rationale": "Sedimentary rock is formed from the compaction and cementation of sediments.", "isCorrect": false },
                { "text": "Metamorphic rock", "rationale": "Metamorphic rock is formed when existing rock is changed by heat and pressure.", "isCorrect": false },
                { "text": "Igneous rock", "rationale": "Correct. 'Igneous' comes from the Latin word for fire.", "isCorrect": true },
                { "text": "Fossilized rock", "rationale": "Fossils are found within rocks, usually sedimentary, but it is not a type of rock itself.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The process by which rocks are broken down into smaller pieces by wind, water, or ice is called:",
            "answerOptions": [
                { "text": "Erosion", "rationale": "Erosion is the transport of weathered material, not the breaking down itself.", "isCorrect": false },
                { "text": "Weathering", "rationale": "Correct. Weathering is the breakdown of rocks at the Earth's surface.", "isCorrect": true },
                { "text": "Deposition", "rationale": "Deposition is the process by which sediment settles in a new location.", "isCorrect": false },
                { "text": "Compaction", "rationale": "Compaction is part of the process of forming sedimentary rock.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Sandstone, limestone, and shale are all examples of which type of rock?",
            "answerOptions": [
                { "text": "Igneous rock", "rationale": "Examples of igneous rock include granite and basalt.", "isCorrect": false },
                { "text": "Metamorphic rock", "rationale": "Examples of metamorphic rock include marble and slate.", "isCorrect": false },
                { "text": "Sedimentary rock", "rationale": "Correct. These rocks are formed from layers of sand, organic matter, and mud.", "isCorrect": true },
                { "text": "Volcanic rock", "rationale": "Volcanic rock is a type of igneous rock.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What two forces are most responsible for forming metamorphic rocks?",
            "answerOptions": [
                { "text": "Heat and pressure", "rationale": "Correct. These forces change the texture and chemical composition of existing rocks.", "isCorrect": true },
                { "text": "Weathering and erosion", "rationale": "These processes break down rocks and transport sediments.", "isCorrect": false },
                { "text": "Cooling and solidification", "rationale": "This process forms igneous rocks.", "isCorrect": false },
                { "text": "Compaction and cementation", "rationale": "These processes form sedimentary rocks.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "The rock cycle is a continuous process through which rocks are created, changed from one form to another, destroyed, and then formed again. For example, an igneous rock on the surface can be weathered into sediment. This sediment can then be compacted and cemented to form a sedimentary rock. If this sedimentary rock is buried deep within the Earth, intense heat and pressure can transform it into a metamorphic rock.",
            "question": "According to the passage, how can an igneous rock become a sedimentary rock?",
            "answerOptions": [
                { "text": "By being subjected to intense heat and pressure.", "rationale": "This would turn it into a metamorphic rock.", "isCorrect": false },
                { "text": "By melting and then cooling again.", "rationale": "This would form a new igneous rock.", "isCorrect": false },
                { "text": "By being broken down into sediment, which is then compacted and cemented.", "rationale": "Correct. This sequence of weathering, erosion, deposition, compaction, and cementation is described in the passage.", "isCorrect": true },
                { "text": "An igneous rock cannot become a sedimentary rock.", "rationale": "The rock cycle shows that any rock type can be transformed into any other rock type.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "The rock cycle is a continuous process through which rocks are created, changed from one form to another, destroyed, and then formed again. For example, an igneous rock on the surface can be weathered into sediment. This sediment can then be compacted and cemented to form a sedimentary rock. If this sedimentary rock is buried deep within the Earth, intense heat and pressure can transform it into a metamorphic rock.",
            "question": "What would happen to the metamorphic rock described in the passage if it were exposed to even higher temperatures, causing it to melt completely and then cool?",
            "answerOptions": [
                { "text": "It would become a sedimentary rock.", "rationale": "This would require weathering and cementation.", "isCorrect": false },
                { "text": "It would become an igneous rock.", "rationale": "Correct. Melting turns any rock into magma, which then cools to form igneous rock, thus continuing the cycle.", "isCorrect": true },
                { "text": "It would remain a metamorphic rock.", "rationale": "Complete melting changes its classification.", "isCorrect": false },
                { "text": "It would weather into sediment.", "rationale": "This happens when the rock is exposed at the surface, not when it melts.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Fossils are most commonly found in which type of rock?",
            "answerOptions": [
                { "text": "Igneous rock", "rationale": "The heat from magma or lava would destroy any fossils.", "isCorrect": false },
                { "text": "Metamorphic rock", "rationale": "The heat and pressure that form metamorphic rock would typically destroy any fossils.", "isCorrect": false },
                { "text": "Sedimentary rock", "rationale": "Correct. The layering process of sediment can gently bury and preserve organisms.", "isCorrect": true },
                { "text": "All rock types equally.", "rationale": "Fossils are almost exclusively found in sedimentary rock.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Granite, an igneous rock with large crystals, is most likely formed from:",
            "answerOptions": [
                { "text": "Magma that cooled slowly beneath the Earth's surface.", "rationale": "Correct. Slow cooling allows time for large crystals to form. This is intrusive igneous rock.", "isCorrect": true },
                { "text": "Lava that cooled quickly on the Earth's surface.", "rationale": "Quick cooling results in small crystals. This is extrusive igneous rock, like basalt.", "isCorrect": false },
                { "text": "Layers of sand compacted together.", "rationale": "This would form sandstone, a sedimentary rock.", "isCorrect": false },
                { "text": "Limestone that has been subjected to heat and pressure.", "rationale": "This would form marble, a metamorphic rock.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Marble is a metamorphic rock that forms from which parent rock?",
            "answerOptions": [
                { "text": "Sandstone", "rationale": "Sandstone metamorphoses into quartzite.", "isCorrect": false },
                { "text": "Shale", "rationale": "Shale metamorphoses into slate.", "isCorrect": false },
                { "text": "Granite", "rationale": "Granite metamorphoses into gneiss.", "isCorrect": false },
                { "text": "Limestone", "rationale": "Correct. The heat and pressure recrystallize the calcite in limestone to form marble.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "The processes of the rock cycle are driven by energy from which two sources?",
            "answerOptions": [
                { "text": "The Sun and the Earth's interior", "rationale": "Correct. Energy from the sun drives surface processes like weathering and erosion, while heat from the Earth's interior drives melting and metamorphism.", "isCorrect": true },
                { "text": "The Moon's gravity and wind", "rationale": "These forces play a role in erosion but are not the primary drivers of the entire cycle.", "isCorrect": false },
                { "text": "Static electricity and magnetism", "rationale": "These forces are not the primary drivers of the rock cycle.", "isCorrect": false },
                { "text": "Fossil fuels and biomass", "rationale": "These are sources of energy for humans, not the geological rock cycle.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the term for molten rock found beneath the Earth's surface?",
            "answerOptions": [
                { "text": "Lava", "rationale": "Lava is molten rock that has erupted onto the Earth's surface.", "isCorrect": false },
                { "text": "Magma", "rationale": "Correct. Magma is molten rock stored in the Earth's crust.", "isCorrect": true },
                { "text": "Sediment", "rationale": "Sediment is small pieces of broken-down rock.", "isCorrect": false },
                { "text": "Crystal", "rationale": "Crystals are solid materials with a highly ordered microscopic structure.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which of the following describes the texture of an igneous rock that cooled very rapidly on the surface?",
            "answerOptions": [
                { "text": "Coarse-grained with large crystals.", "rationale": "This texture results from slow cooling.", "isCorrect": false },
                { "text": "Fine-grained or glassy with very small or no crystals.", "rationale": "Correct. Rapid cooling does not allow time for large crystals to form. Obsidian is an example of a glassy igneous rock.", "isCorrect": true },
                { "text": "Layered and containing fossils.", "rationale": "This describes a sedimentary rock.", "isCorrect": false },
                { "text": "Foliated with bands of minerals.", "rationale": "This describes a metamorphic rock.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Scientific Practices",
    "id": "sci_scientific_practices_method_4",
    "title": "Scientific Practices: The Scientific Method",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the first step in the scientific method?",
            "answerOptions": [
                { "text": "Forming a hypothesis", "rationale": "This comes after making an observation and asking a question.", "isCorrect": false },
                { "text": "Conducting an experiment", "rationale": "This is done to test a hypothesis.", "isCorrect": false },
                { "text": "Making an observation and asking a question", "rationale": "Correct. All scientific inquiry begins with an observation that leads to a question.", "isCorrect": true },
                { "text": "Analyzing data", "rationale": "This comes after the experiment is conducted.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A testable prediction or proposed explanation for an observation is a(n):",
            "answerOptions": [
                { "text": "Theory", "rationale": "A theory is a well-substantiated explanation, much broader than a single prediction.", "isCorrect": false },
                { "text": "Conclusion", "rationale": "A conclusion is drawn after an experiment is completed.", "isCorrect": false },
                { "text": "Hypothesis", "rationale": "Correct. A hypothesis must be testable through an experiment.", "isCorrect": true },
                { "text": "Variable", "rationale": "A variable is a factor that can be changed or measured in an experiment.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "In a controlled experiment, the factor that the scientist intentionally changes or manipulates is called the:",
            "answerOptions": [
                { "text": "Dependent variable", "rationale": "The dependent variable is what is measured in response to the change.", "isCorrect": false },
                { "text": "Independent variable", "rationale": "Correct. This is the one and only factor that should be different between the experimental group and the control group.", "isCorrect": true },
                { "text": "Control variable", "rationale": "Control variables (constants) are the factors that are kept the same for all groups.", "isCorrect": false },
                { "text": "Constant", "rationale": "Constants (or control variables) are kept the same, not changed.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The group in an experiment that does not receive the experimental treatment and is used as a baseline for comparison is the:",
            "answerOptions": [
                { "text": "Experimental group", "rationale": "The experimental group is the one that receives the treatment.", "isCorrect": false },
                { "text": "Independent group", "rationale": "This is not a standard term for a group in an experiment.", "isCorrect": false },
                { "text": "Dependent group", "rationale": "This is not a standard term for a group in an experiment.", "isCorrect": false },
                { "text": "Control group", "rationale": "Correct. The control group allows the researcher to see the effect of the independent variable.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A student wants to test the hypothesis that plants grow taller when given more sunlight. She places one plant on a sunny windowsill (Group A) and another identical plant in a dark closet (Group B). She gives both plants the same amount of water each day. She measures the height of each plant after two weeks.",
            "question": "In this experiment, what is the dependent variable?",
            "answerOptions": [
                { "text": "The amount of sunlight", "rationale": "The amount of sunlight is what the student is changing, making it the independent variable.", "isCorrect": false },
                { "text": "The amount of water", "rationale": "The amount of water is a controlled variable (a constant).", "isCorrect": false },
                { "text": "The height of the plants", "rationale": "Correct. The height is what is being measured, and it 'depends' on the amount of sunlight the plants receive.", "isCorrect": true },
                { "text": "The type of plant", "rationale": "The type of plant is a controlled variable.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A student wants to test the hypothesis that plants grow taller when given more sunlight. She places one plant on a sunny windowsill (Group A) and another identical plant in a dark closet (Group B). She gives both plants the same amount of water each day. She measures the height of each plant after two weeks.",
            "question": "Which of the following is an important controlled variable (constant) in this experiment?",
            "answerOptions": [
                { "text": "The final height of the plants", "rationale": "This is the dependent variable.", "isCorrect": false },
                { "text": "The location of the plants (windowsill vs. closet)", "rationale": "This is the independent variable.", "isCorrect": false },
                { "text": "The amount of water given to each plant", "rationale": "Correct. To ensure a fair test, all factors other than the independent variable must be kept the same.", "isCorrect": true },
                { "text": "The student's hypothesis", "rationale": "The hypothesis is what is being tested, not a condition of the experiment itself.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "After conducting an experiment and analyzing the data, a scientist will form a(n):",
            "answerOptions": [
                { "text": "Hypothesis", "rationale": "The hypothesis is formed before the experiment.", "isCorrect": false },
                { "text": "Observation", "rationale": "The observation is the first step.", "isCorrect": false },
                { "text": "Conclusion", "rationale": "Correct. The conclusion summarizes the findings and states whether the hypothesis was supported or refuted.", "isCorrect": true },
                { "text": "Question", "rationale": "The question is asked at the beginning of the process.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A scientific theory is:",
            "answerOptions": [
                { "text": "A guess or a hunch with little evidence.", "rationale": "This is the common usage of 'theory', but not the scientific meaning. A scientific hypothesis is closer to this definition.", "isCorrect": false },
                { "text": "A well-substantiated explanation of some aspect of the natural world, based on a body of facts that have been repeatedly confirmed through observation and experiment.", "rationale": "Correct. A theory is a high level of scientific understanding, like the theory of gravity or the theory of evolution.", "isCorrect": true },
                { "text": "An initial idea that has not yet been tested.", "rationale": "This describes a hypothesis.", "isCorrect": false },
                { "text": "An unchangeable fact.", "rationale": "All scientific knowledge, including theories, is subject to revision if new evidence emerges.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Why is it important for scientists to publish their findings?",
            "answerOptions": [
                { "text": "To become famous.", "rationale": "While fame can be a result, it is not the scientific reason.", "isCorrect": false },
                { "text": "To allow other scientists to review and replicate their work.", "rationale": "Correct. This process of peer review is crucial for verifying results and ensuring the reliability of scientific knowledge.", "isCorrect": true },
                { "text": "To keep their discoveries a secret.", "rationale": "Publication is the opposite of secrecy.", "isCorrect": false },
                { "text": "To prove that their hypothesis is always correct.", "rationale": "The goal is to share results, whether they support the hypothesis or not.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "If an experiment's results do not support the hypothesis, what is the most appropriate next step for a scientist?",
            "answerOptions": [
                { "text": "Change the data to match the hypothesis.", "rationale": "This is unethical and constitutes scientific fraud.", "isCorrect": false },
                { "text": "Discard the results and pretend the experiment never happened.", "rationale": "Results that refute a hypothesis are still valuable scientific information.", "isCorrect": false },
                { "text": "Revise the hypothesis or formulate a new one, and then design a new experiment.", "rationale": "Correct. Science is a process of refining ideas based on evidence. A refuted hypothesis leads to new questions and further investigation.", "isCorrect": true },
                { "text": "Conclude that the experiment was a failure.", "rationale": "An experiment that provides a clear answer, even if it's 'no', is a successful experiment.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Information gathered during an experiment is called:",
            "answerOptions": [
                { "text": "Data", "rationale": "Correct. Data can be quantitative (numbers) or qualitative (descriptions).", "isCorrect": true },
                { "text": "Theory", "rationale": "A theory is a broad explanation, not the raw information.", "isCorrect": false },
                { "text": "Inference", "rationale": "An inference is a conclusion based on data, not the data itself.", "isCorrect": false },
                { "text": "Opinion", "rationale": "Scientific data should be objective, not based on opinion.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A logical interpretation of an observation based on prior knowledge and experience is a(n):",
            "answerOptions": [
                { "text": "Observation", "rationale": "An observation is the direct gathering of information.", "isCorrect": false },
                { "text": "Inference", "rationale": "Correct. For example, if you see smoke, you might infer that there is a fire.", "isCorrect": true },
                { "text": "Law", "rationale": "A scientific law is a description of an observed phenomenon.", "isCorrect": false },
                { "text": "Hypothesis", "rationale": "A hypothesis is a testable prediction, which is a type of inference but more specific.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Life Science",
    "id": "sci_life_science_ecosystems_5",
    "title": "Life Science: Ecosystems",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "All the living organisms in an area and their non-living environment are collectively known as a(n):",
            "answerOptions": [
                { "text": "Population", "rationale": "A population is a group of organisms of the same species.", "isCorrect": false },
                { "text": "Community", "rationale": "A community consists of all the different populations of different species in an area.", "isCorrect": false },
                { "text": "Ecosystem", "rationale": "Correct. An ecosystem includes both biotic (living) and abiotic (non-living) factors.", "isCorrect": true },
                { "text": "Biosphere", "rationale": "The biosphere is the sum of all ecosystems on Earth.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of the following is an example of a biotic factor in an ecosystem?",
            "answerOptions": [
                { "text": "The temperature of the water in a pond.", "rationale": "Temperature is a non-living, abiotic factor.", "isCorrect": false },
                { "text": "The amount of sunlight a plant receives.", "rationale": "Sunlight is a non-living, abiotic factor.", "isCorrect": false },
                { "text": "A fungus that decomposes a fallen log.", "rationale": "Correct. A fungus is a living organism, making it a biotic factor.", "isCorrect": true },
                { "text": "The pH level of the soil.", "rationale": "Soil pH is a non-living, abiotic factor.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "In a food chain, what is the role of a herbivore?",
            "answerOptions": [
                { "text": "Producer", "rationale": "Producers, like plants, make their own food.", "isCorrect": false },
                { "text": "Primary consumer", "rationale": "Correct. Herbivores eat producers, making them the first level of consumers.", "isCorrect": true },
                { "text": "Secondary consumer", "rationale": "Secondary consumers eat primary consumers.", "isCorrect": false },
                { "text": "Decomposer", "rationale": "Decomposers break down dead organic matter.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A symbiotic relationship where one organism benefits and the other is harmed is called:",
            "answerOptions": [
                { "text": "Mutualism", "rationale": "In mutualism, both organisms benefit.", "isCorrect": false },
                { "text": "Commensalism", "rationale": "In commensalism, one benefits and the other is unaffected.", "isCorrect": false },
                { "text": "Parasitism", "rationale": "Correct. A tick feeding on a dog is an example of parasitism.", "isCorrect": true },
                { "text": "Competition", "rationale": "Competition is a struggle for resources.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "In a forest ecosystem, sunlight allows oak trees to produce acorns. Squirrels eat the acorns. Hawks, in turn, hunt and eat the squirrels. When a hawk dies, its body is broken down by bacteria and fungi, which return nutrients to the soil.",
            "question": "In this food web, what would be the most likely immediate effect if a disease wiped out most of the squirrel population?",
            "answerOptions": [
                { "text": "The oak tree population would decrease.", "rationale": "With fewer squirrels to eat acorns, the oak tree population might actually increase or be unaffected.", "isCorrect": false },
                { "text": "The hawk population would decrease due to a lack of food.", "rationale": "Correct. Hawks depend on squirrels for food in this ecosystem, so a decline in their primary food source would lead to a decline in the hawk population.", "isCorrect": true },
                { "text": "The population of bacteria and fungi would increase.", "rationale": "Decomposers would have less to break down initially if the hawk population also decreases.", "isCorrect": false },
                { "text": "The amount of sunlight would increase.", "rationale": "The squirrel population has no effect on the amount of sunlight.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "In a forest ecosystem, sunlight allows oak trees to produce acorns. Squirrels eat the acorns. Hawks, in turn, hunt and eat the squirrels. When a hawk dies, its body is broken down by bacteria and fungi, which return nutrients to the soil.",
            "question": "The role of the bacteria and fungi in this ecosystem is to:",
            "answerOptions": [
                { "text": "Serve as a food source for the squirrels.", "rationale": "Squirrels eat acorns.", "isCorrect": false },
                { "text": "Convert sunlight into energy.", "rationale": "This is the role of the producers (oak trees).", "isCorrect": false },
                { "text": "Recycle nutrients from dead organisms back into the ecosystem.", "rationale": "Correct. As decomposers, they play a crucial role in nutrient cycling.", "isCorrect": true },
                { "text": "Compete with the hawks for food.", "rationale": "Decomposers and hawks occupy completely different trophic levels and do not compete.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The primary source of energy for nearly all ecosystems on Earth is:",
            "answerOptions": [
                { "text": "The Earth's core (geothermal energy)", "rationale": "This is a source of energy for some deep-sea vent ecosystems, but not for most.", "isCorrect": false },
                { "text": "The Sun", "rationale": "Correct. The sun provides the light energy that producers use to create food, forming the base of almost all food webs.", "isCorrect": true },
                { "text": "Fossil fuels", "rationale": "Fossil fuels are a source of energy for human activities, but not for natural ecosystems.", "isCorrect": false },
                { "text": "The Moon", "rationale": "The Moon's gravity influences tides but is not a primary energy source.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The process by which an ecosystem gradually changes over time, such as a bare field becoming a forest, is called:",
            "answerOptions": [
                { "text": "Ecological succession", "rationale": "Correct. This is the predictable series of changes in an ecosystem over time.", "isCorrect": true },
                { "text": "Natural selection", "rationale": "Natural selection is a mechanism of evolution that acts on populations.", "isCorrect": false },
                { "text": "The water cycle", "rationale": "The water cycle is the movement of water through an ecosystem.", "isCorrect": false },
                { "text": "Biomagnification", "rationale": "Biomagnification is the increasing concentration of a substance in organisms at successive levels in a food chain.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "An organism's niche is best described as:",
            "answerOptions": [
                { "text": "The physical place where it lives.", "rationale": "This is its habitat.", "isCorrect": false },
                { "text": "Its role and position in the ecosystem, including what it eats and what eats it.", "rationale": "Correct. A niche includes all of an organism's interactions with the biotic and abiotic factors of its environment.", "isCorrect": true },
                { "text": "The trophic level it belongs to.", "rationale": "The trophic level is only one part of an organism's niche.", "isCorrect": false },
                { "text": "The size of its population.", "rationale": "Population size is a characteristic, but not the niche itself.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The maximum population size that an environment can sustain is known as its:",
            "answerOptions": [
                { "text": "Population density", "rationale": "Population density is the number of individuals per unit area.", "isCorrect": false },
                { "text": "Limiting factor", "rationale": "A limiting factor is a resource that constrains the population, thus determining the carrying capacity.", "isCorrect": false },
                { "text": "Carrying capacity", "rationale": "Correct. This is determined by the available resources like food, water, and space.", "isCorrect": true },
                { "text": "Biodiversity", "rationale": "Biodiversity is the variety of life in an ecosystem.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of the following shows a correct food chain?",
            "answerOptions": [
                { "text": "Sun -> Hawk -> Mouse -> Grass", "rationale": "This food chain is in the wrong order.", "isCorrect": false },
                { "text": "Grass -> Mouse -> Hawk", "rationale": "Correct. This shows the correct flow of energy from producer to primary consumer to secondary consumer.", "isCorrect": true },
                { "text": "Mouse -> Grass -> Hawk", "rationale": "A mouse eats grass, not the other way around.", "isCorrect": false },
                { "text": "Hawk -> Sun -> Grass -> Mouse", "rationale": "This order is incorrect.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "In the carbon cycle, how does carbon primarily enter the atmosphere?",
            "answerOptions": [
                { "text": "Through photosynthesis", "rationale": "Photosynthesis removes carbon from the atmosphere.", "isCorrect": false },
                { "text": "Through respiration of plants and animals, and the burning of fossil fuels.", "rationale": "Correct. Respiration releases carbon dioxide, as does the combustion of carbon-based fuels.", "isCorrect": true },
                { "text": "Through nitrogen fixation", "rationale": "This is part of the nitrogen cycle.", "isCorrect": false },
                { "text": "Through transpiration", "rationale": "Transpiration is the release of water vapor from plants.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Physical Science",
    "id": "sci_physical_science_chemistry_6",
    "title": "Physical Science: Chemistry",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The three fundamental particles that make up an atom are:",
            "answerOptions": [
                { "text": "Protons, neutrons, and electrons", "rationale": "Correct. Protons and neutrons are in the nucleus, and electrons orbit the nucleus.", "isCorrect": true },
                { "text": "Quarks, leptons, and bosons", "rationale": "These are more fundamental subatomic particles, but not the three that constitute the basic model of the atom.", "isCorrect": false },
                { "text": "Atoms, molecules, and compounds", "rationale": "These are levels of organization of matter, not particles within an atom.", "isCorrect": false },
                { "text": "Solid, liquid, and gas", "rationale": "These are states of matter.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A substance that cannot be broken down into simpler substances by chemical means is a(n):",
            "answerOptions": [
                { "text": "Compound", "rationale": "A compound can be broken down into elements.", "isCorrect": false },
                { "text": "Mixture", "rationale": "A mixture can be separated by physical means.", "isCorrect": false },
                { "text": "Element", "rationale": "Correct. An element is a pure substance consisting of only one type of atom.", "isCorrect": true },
                { "text": "Solution", "rationale": "A solution is a type of mixture.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The atomic number of an element is determined by the number of:",
            "answerOptions": [
                { "text": "Neutrons in its nucleus.", "rationale": "The number of neutrons determines the isotope.", "isCorrect": false },
                { "text": "Electrons orbiting its nucleus.", "rationale": "In a neutral atom, the number of electrons equals the number of protons, but the atomic number is defined by the protons.", "isCorrect": false },
                { "text": "Protons in its nucleus.", "rationale": "Correct. The number of protons is unique to each element.", "isCorrect": true },
                { "text": "Protons and neutrons combined.", "rationale": "This is the mass number.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A chemical bond formed by the sharing of electrons between atoms is called a(n):",
            "answerOptions": [
                { "text": "Ionic bond", "rationale": "An ionic bond is formed by the transfer of electrons.", "isCorrect": false },
                { "text": "Covalent bond", "rationale": "Correct. This is the type of bond that forms molecules like water (H₂O).", "isCorrect": true },
                { "text": "Hydrogen bond", "rationale": "A hydrogen bond is a weaker attraction between molecules.", "isCorrect": false },
                { "text": "Metallic bond", "rationale": "A metallic bond is found in metals, where electrons are shared in a 'sea'.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "The pH scale measures how acidic or basic a substance is. The scale ranges from 0 to 14. A pH of 7 is neutral. A pH less than 7 indicates acidity, and a pH greater than 7 indicates a base. Pure water has a pH of 7. Lemon juice has a pH of 2, while bleach has a pH of 13.",
            "question": "Which of the following statements is supported by the passage?",
            "answerOptions": [
                { "text": "Lemon juice is a base.", "rationale": "Lemon juice has a pH of 2, which is less than 7, making it acidic.", "isCorrect": false },
                { "text": "A substance with a pH of 8 is considered acidic.", "rationale": "A pH greater than 7 is basic.", "isCorrect": false },
                { "text": "Bleach is more basic than pure water.", "rationale": "Correct. Bleach has a pH of 13, which is significantly greater than water's neutral pH of 7.", "isCorrect": true },
                { "text": "All liquids have a pH of 7.", "rationale": "The passage gives examples of liquids with pH values other than 7.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "The pH scale measures how acidic or basic a substance is. The scale ranges from 0 to 14. A pH of 7 is neutral. A pH less than 7 indicates acidity, and a pH greater than 7 indicates a base. Pure water has a pH of 7. Lemon juice has a pH of 2, while bleach has a pH of 13.",
            "question": "A neutralization reaction occurs when an acid and a base react. What would you expect the pH of the resulting solution to be close to?",
            "answerOptions": [
                { "text": "2", "rationale": "This is a highly acidic pH.", "isCorrect": false },
                { "text": "13", "rationale": "This is a highly basic pH.", "isCorrect": false },
                { "text": "7", "rationale": "Correct. An acid and a base neutralize each other, typically forming a salt and water, with a pH close to neutral.", "isCorrect": true },
                { "text": "0", "rationale": "This is the most acidic point on the scale.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the chemical symbol for water?",
            "answerOptions": [
                { "text": "CO₂", "rationale": "This is the symbol for carbon dioxide.", "isCorrect": false },
                { "text": "O₂", "rationale": "This is the symbol for oxygen gas.", "isCorrect": false },
                { "text": "H₂O", "rationale": "Correct. This indicates that a water molecule is made of two hydrogen atoms and one oxygen atom.", "isCorrect": true },
                { "text": "NaCl", "rationale": "This is the symbol for sodium chloride (table salt).", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A substance that speeds up a chemical reaction without being consumed by the reaction is a(n):",
            "answerOptions": [
                { "text": "Catalyst", "rationale": "Correct. Enzymes are biological catalysts.", "isCorrect": true },
                { "text": "Reactant", "rationale": "A reactant is consumed during a reaction.", "isCorrect": false },
                { "text": "Product", "rationale": "A product is formed during a reaction.", "isCorrect": false },
                { "text": "Inhibitor", "rationale": "An inhibitor slows down a chemical reaction.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "What must be true for a chemical equation to be balanced?",
            "answerOptions": [
                { "text": "There must be the same number of molecules on both sides of the equation.", "rationale": "The number of molecules can change, but the number of atoms of each element must be conserved.", "isCorrect": false },
                { "text": "There must be the same number of atoms of each element on both sides of the equation.", "rationale": "Correct. This satisfies the law of conservation of mass.", "isCorrect": true },
                { "text": "The number of reactants must equal the number of products.", "rationale": "A single reactant can break down into multiple products, and vice versa.", "isCorrect": false },
                { "text": "The states of matter must be the same on both sides.", "rationale": "Reactions often involve changes in state (e.g., two liquids forming a solid).", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which of these is a property of a non-metal?",
            "answerOptions": [
                { "text": "Good conductor of electricity", "rationale": "This is a property of metals.", "isCorrect": false },
                { "text": "Malleable and ductile", "rationale": "These properties (ability to be shaped) are characteristic of metals.", "isCorrect": false },
                { "text": "Dull and brittle", "rationale": "Correct. Non-metals, like sulfur or carbon, are typically poor conductors and are not shiny or easily shaped.", "isCorrect": true },
                { "text": "Forms positive ions (cations)", "rationale": "Metals tend to lose electrons to form positive ions.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A homogeneous mixture of two or more substances is called a:",
            "answerOptions": [
                { "text": "Suspension", "rationale": "A suspension is a heterogeneous mixture where particles can be seen and settle out (e.g., muddy water).", "isCorrect": false },
                { "text": "Compound", "rationale": "A compound is a pure substance with a fixed chemical composition.", "isCorrect": false },
                { "text": "Solution", "rationale": "Correct. In a solution, the solute is evenly distributed in the solvent (e.g., salt dissolved in water).", "isCorrect": true },
                { "text": "Element", "rationale": "An element is a pure substance consisting of one type of atom.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Isotopes are atoms of the same element that have a different number of:",
            "answerOptions": [
                { "text": "Protons", "rationale": "The number of protons defines the element.", "isCorrect": false },
                { "text": "Electrons", "rationale": "A different number of electrons would make it an ion.", "isCorrect": false },
                { "text": "Neutrons", "rationale": "Correct. For example, Carbon-12 and Carbon-14 are isotopes of carbon; they both have 6 protons but have 6 and 8 neutrons, respectively.", "isCorrect": true },
                { "text": "Valence shells", "rationale": "This is not a particle.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Earth and Space Science",
    "id": "sci_earth_space_science_geological_time_7",
    "title": "Earth & Space Science: Geological Time",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Fossils are most often found in which type of rock?",
            "answerOptions": [
                { "text": "Igneous rock", "rationale": "The heat from molten rock would destroy most fossils.", "isCorrect": false },
                { "text": "Metamorphic rock", "rationale": "The heat and pressure that form metamorphic rock would destroy most fossils.", "isCorrect": false },
                { "text": "Sedimentary rock", "rationale": "Correct. The process of sediment layering gently buries organisms and allows for their preservation.", "isCorrect": true },
                { "text": "All types of rock equally.", "rationale": "Fossils are almost exclusively found in sedimentary rock.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The geological principle of superposition states that in an undisturbed sequence of rock layers:",
            "answerOptions": [
                { "text": "The oldest layers are at the top.", "rationale": "This is the opposite of the principle.", "isCorrect": false },
                { "text": "The youngest layers are at the bottom.", "rationale": "This is the opposite of the principle.", "isCorrect": false },
                { "text": "The oldest layers are at the bottom and the youngest layers are at the top.", "rationale": "Correct. This is a fundamental concept used in relative dating.", "isCorrect": true },
                { "text": "The layers are of the same age.", "rationale": "The layers are deposited sequentially over long periods.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Radiometric dating is a technique used to determine the absolute age of a rock or fossil by measuring the:",
            "answerOptions": [
                { "text": "Ratio of a radioactive isotope to its stable decay product.", "rationale": "Correct. By knowing the half-life of the isotope, scientists can calculate the age of the sample based on how much of it has decayed.", "isCorrect": true },
                { "text": "Depth at which the rock was found.", "rationale": "This is used for relative dating, not absolute dating.", "isCorrect": false },
                { "text": "Types of fossils found within the rock.", "rationale": "This is a method of relative dating using index fossils.", "isCorrect": false },
                { "text": "Magnetic alignment of the minerals in the rock.", "rationale": "This is used for paleomagnetism, not radiometric dating.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The half-life of a radioactive isotope is the amount of time it takes for:",
            "answerOptions": [
                { "text": "All of the isotope to decay.", "rationale": "The decay process is exponential; it never reaches zero.", "isCorrect": false },
                { "text": "Half of a sample of the isotope to decay.", "rationale": "Correct. This is the definition of half-life.", "isCorrect": true },
                { "text": "The isotope to become twice as radioactive.", "rationale": "Radioactivity decreases over time.", "isCorrect": false },
                { "text": "The isotope to absorb other particles.", "rationale": "This is unrelated to the concept of half-life.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A paleontologist discovers a fossil in a layer of sedimentary rock. In a layer of volcanic ash above this sedimentary layer, the paleontologist uses radiometric dating and finds that the ash is 68 million years old. In a layer of volcanic ash below the sedimentary layer, the ash is dated to be 72 million years old.",
            "question": "Based on this information, what is the approximate age of the fossil?",
            "answerOptions": [
                { "text": "Younger than 68 million years.", "rationale": "The fossil is in a layer below the 68-million-year-old ash, so it must be older.", "isCorrect": false },
                { "text": "Between 68 and 72 million years old.", "rationale": "Correct. By using the principle of superposition and the absolute dates of the surrounding igneous layers, the paleontologist can bracket the age of the sedimentary layer and the fossil within it.", "isCorrect": true },
                { "text": "Older than 72 million years.", "rationale": "The fossil is in a layer above the 72-million-year-old ash, so it must be younger.", "isCorrect": false },
                { "text": "Exactly 70 million years old.", "rationale": "The data provides a range, not an exact age.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A paleontologist discovers a fossil in a layer of sedimentary rock. In a layer of volcanic ash above this sedimentary layer, the paleontologist uses radiometric dating and finds that the ash is 68 million years old. In a layer of volcanic ash below the sedimentary layer, the ash is dated to be 72 million years old.",
            "question": "Why can't the paleontologist use radiometric dating on the sedimentary rock directly?",
            "answerOptions": [
                { "text": "Sedimentary rocks do not contain radioactive isotopes.", "rationale": "Sedimentary rocks can contain radioactive isotopes.", "isCorrect": false },
                { "text": "Radiometric dating only works on fossils, not rocks.", "rationale": "Radiometric dating is used on rocks, particularly igneous rocks.", "isCorrect": false },
                { "text": "Sedimentary rocks are made of fragments of older rocks, so dating the fragments would give the age of the original rocks, not the age of when the new rock was formed.", "rationale": "Correct. This is a fundamental limitation of radiometric dating for sedimentary rocks, which is why dating igneous layers above and below is a common technique.", "isCorrect": true },
                { "text": "Sedimentary rocks are too old to be dated accurately.", "rationale": "Different isotopes can be used to date rocks of various ages, including very old ones.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The vast majority of Earth's history is encompassed in which era?",
            "answerOptions": [
                { "text": "The Cenozoic Era (the age of mammals)", "rationale": "The Cenozoic is the most recent and shortest era.", "isCorrect": false },
                { "text": "The Mesozoic Era (the age of dinosaurs)", "rationale": "The Mesozoic is a major era, but much shorter than the Precambrian.", "isCorrect": false },
                { "text": "The Paleozoic Era", "rationale": "The Paleozoic era saw the first complex life, but is shorter than the Precambrian.", "isCorrect": false },
                { "text": "The Precambrian Time", "rationale": "Correct. The Precambrian spans from the formation of Earth about 4.6 billion years ago to the beginning of the Cambrian Period, about 541 million years ago, making up about 88% of Earth's history.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The theory that the Earth's continents have moved over geologic time relative to each other is known as:",
            "answerOptions": [
                { "text": "Continental drift", "rationale": "Correct. This theory was first proposed by Alfred Wegener and is now part of the broader theory of plate tectonics.", "isCorrect": true },
                { "text": "The rock cycle", "rationale": "The rock cycle describes the transformation of rocks.", "isCorrect": false },
                { "text": "Superposition", "rationale": "Superposition is a principle of relative dating.", "isCorrect": false },
                { "text": "The Big Bang Theory", "rationale": "The Big Bang Theory describes the origin of the universe.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A mass extinction is an event in which:",
            "answerOptions": [
                { "text": "A single species becomes extinct.", "rationale": "This is a normal extinction event.", "isCorrect": false },
                { "text": "A large number of species on Earth become extinct in a relatively short period of time.", "rationale": "Correct. The extinction of the dinosaurs at the end of the Cretaceous period is a famous example.", "isCorrect": true },
                { "text": "A new species evolves.", "rationale": "This is speciation.", "isCorrect": false },
                { "text": "The Earth's continents come together to form a supercontinent.", "rationale": "This is a process of plate tectonics.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "A fossil that is widespread geographically but is limited to a short span of geologic time is called an index fossil. Why are index fossils useful to geologists?",
            "answerOptions": [
                { "text": "They provide a source of radioactive isotopes for absolute dating.", "rationale": "Fossils themselves are not typically used for radiometric dating.", "isCorrect": false },
                { "text": "They can be used to correlate the age of rock layers in different locations.", "rationale": "Correct. If a geologist finds the same index fossil in rock layers in two different continents, they can infer that the layers are of the same age.", "isCorrect": true },
                { "text": "They always show the exact cause of the organism's death.", "rationale": "The cause of death is rarely preserved.", "isCorrect": false },
                { "text": "They are the only type of fossil that can be found.", "rationale": "Many types of fossils exist.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The age of the Earth is estimated to be approximately:",
            "answerOptions": [
                { "text": "6,000 years old", "rationale": "This is not the scientifically accepted age.", "isCorrect": false },
                { "text": "1 million years old", "rationale": "This is far too young.", "isCorrect": false },
                { "text": "4.5 billion years old", "rationale": "Correct. This age is based on radiometric dating of meteorites and is consistent with the ages of the oldest-known Earth and lunar samples.", "isCorrect": true },
                { "text": "13.8 billion years old", "rationale": "This is the estimated age of the universe.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What evidence did Alfred Wegener use to support his theory of continental drift?",
            "answerOptions": [
                { "text": "He had direct measurements of the continents moving.", "rationale": "The technology to directly measure continental movement did not exist in Wegener's time.", "isCorrect": false },
                { "text": "The apparent fit of the continents, fossil evidence, and similar rock formations across oceans.", "rationale": "Correct. For example, fossils of the same land reptiles were found in both South America and Africa.", "isCorrect": true },
                { "text": "The existence of the Mid-Atlantic Ridge.", "rationale": "The Mid-Atlantic Ridge was discovered later and provided the mechanism for seafloor spreading, which supported and expanded upon Wegener's original theory.", "isCorrect": false },
                { "text": "The theory of evolution by natural selection.", "rationale": "While related, this was not the primary evidence for continental drift.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Life Science",
    "id": "sci_life_science_human_body_systems_8",
    "title": "Life Science: Human Body Systems",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which organ is the primary pump of the circulatory system?",
            "answerOptions": [
                { "text": "Lungs", "rationale": "The lungs are part of the respiratory system and are responsible for gas exchange.", "isCorrect": false },
                { "text": "Brain", "rationale": "The brain is the control center of the nervous system.", "isCorrect": false },
                { "text": "Heart", "rationale": "Correct. The heart is a muscular organ that pumps blood throughout the body.", "isCorrect": true },
                { "text": "Liver", "rationale": "The liver has many functions, including detoxification and bile production, but it does not pump blood.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The main function of the respiratory system is to:",
            "answerOptions": [
                { "text": "Transport nutrients to cells.", "rationale": "This is the primary function of the circulatory system.", "isCorrect": false },
                { "text": "Exchange gases between the body and the external environment.", "rationale": "Correct. This involves taking in oxygen and removing carbon dioxide.", "isCorrect": true },
                { "text": "Break down food into smaller molecules.", "rationale": "This is the primary function of the digestive system.", "isCorrect": false },
                { "text": "Send electrical signals throughout the body.", "rationale": "This is the primary function of the nervous system.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What is the role of the nervous system?",
            "answerOptions": [
                { "text": "To produce hormones that regulate bodily functions.", "rationale": "This is the primary role of the endocrine system.", "isCorrect": false },
                { "text": "To provide structural support and protection for the body.", "rationale": "This is the primary role of the skeletal system.", "isCorrect": false },
                { "text": "To coordinate the body's actions and transmit signals between different parts of the body.", "rationale": "Correct. It is the body's primary communication and control network.", "isCorrect": true },
                { "text": "To eliminate waste products from the body.", "rationale": "This is the primary role of the excretory system.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which system is responsible for breaking down food and absorbing nutrients?",
            "answerOptions": [
                { "text": "Circulatory system", "rationale": "The circulatory system transports nutrients, but does not break down food.", "isCorrect": false },
                { "text": "Digestive system", "rationale": "Correct. Organs like the stomach and intestines are key components of this system.", "isCorrect": true },
                { "text": "Respiratory system", "rationale": "The respiratory system handles gas exchange.", "isCorrect": false },
                { "text": "Skeletal system", "rationale": "The skeletal system provides support and protection.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "Homeostasis is the body's ability to maintain a stable internal environment despite changes in external conditions. For example, when you exercise, your body temperature rises. To cool down, your nervous system signals your sweat glands to produce sweat, which cools the skin as it evaporates. At the same time, your blood vessels dilate to release heat.",
            "question": "This process of sweating and vasodilation to control temperature is an example of what kind of feedback loop?",
            "answerOptions": [
                { "text": "Positive feedback loop", "rationale": "A positive feedback loop amplifies a change, moving the body further away from its set point.", "isCorrect": false },
                { "text": "Negative feedback loop", "rationale": "Correct. This is a negative feedback loop because the body's response (sweating) counteracts the initial change (rising temperature) to return to its set point.", "isCorrect": true },
                { "text": "Neutral feedback loop", "rationale": "This is not a standard biological term.", "isCorrect": false },
                { "text": "Circulatory feedback loop", "rationale": "While the circulatory system is involved, the overall mechanism is a negative feedback loop.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "Homeostasis is the body's ability to maintain a stable internal environment despite changes in external conditions. For example, when you exercise, your body temperature rises. To cool down, your nervous system signals your sweat glands to produce sweat, which cools the skin as it evaporates. At the same time, your blood vessels dilate to release heat.",
            "question": "Which two body systems are primarily interacting in this example of temperature regulation?",
            "answerOptions": [
                { "text": "Digestive and respiratory systems", "rationale": "These systems are not the primary actors in this specific example.", "isCorrect": false },
                { "text": "Skeletal and muscular systems", "rationale": "The muscular system generates the heat, but the nervous and integumentary (skin) systems are the primary actors in the cooling response.", "isCorrect": false },
                { "text": "Nervous and integumentary (skin) systems", "rationale": "Correct. The nervous system acts as the control center, sending signals to the sweat glands and blood vessels, which are part of the integumentary system.", "isCorrect": true },
                { "text": "Endocrine and excretory systems", "rationale": "The endocrine system regulates longer-term processes, and the excretory system is primarily for waste removal.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The skeletal system's functions include providing support, protecting organs, and...",
            "answerOptions": [
                { "text": "Digesting food.", "rationale": "This is a function of the digestive system.", "isCorrect": false },
                { "text": "Producing blood cells.", "rationale": "Correct. Red and white blood cells are produced in the bone marrow.", "isCorrect": true },
                { "text": "Filtering blood.", "rationale": "This is a function of the kidneys, part of the excretory system.", "isCorrect": false },
                { "text": "Pumping blood.", "rationale": "This is a function of the heart.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The endocrine system uses chemical messengers called ___________ to regulate bodily functions.",
            "answerOptions": [
                { "text": "Neurons", "rationale": "Neurons are the cells of the nervous system.", "isCorrect": false },
                { "text": "Antibodies", "rationale": "Antibodies are part of the immune system.", "isCorrect": false },
                { "text": "Hormones", "rationale": "Correct. Hormones are secreted by glands and travel through the bloodstream to target cells.", "isCorrect": true },
                { "text": "Enzymes", "rationale": "Enzymes are proteins that speed up chemical reactions.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The immune system's primary function is to:",
            "answerOptions": [
                { "text": "Defend the body against pathogens like bacteria and viruses.", "rationale": "Correct. It identifies and attacks foreign invaders.", "isCorrect": true },
                { "text": "Carry oxygen to the cells.", "rationale": "This is the function of red blood cells in the circulatory system.", "isCorrect": false },
                { "text": "Enable movement.", "rationale": "This is the function of the muscular system.", "isCorrect": false },
                { "text": "Store minerals.", "rationale": "This is a function of the skeletal system.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "A person eats a large meal. Their blood sugar level rises. In response, the pancreas releases insulin, which causes cells to take up glucose from the blood, lowering blood sugar levels. This is an example of:",
            "answerOptions": [
                { "text": "The digestive system working alone.", "rationale": "This process involves both the digestive and endocrine systems.", "isCorrect": false },
                { "text": "A failure of homeostasis.", "rationale": "This is a successful example of homeostasis, maintaining stable blood sugar.", "isCorrect": false },
                { "text": "The nervous system regulating blood sugar.", "rationale": "While the nervous system can influence it, the primary regulator in this example is the endocrine system (pancreas releasing insulin).", "isCorrect": false },
                { "text": "The endocrine system regulating blood sugar through a negative feedback loop.", "rationale": "Correct. The pancreas (endocrine system) releases insulin to counteract the rise in blood sugar, returning it to normal.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of these is the basic unit of the nervous system?",
            "answerOptions": [
                { "text": "Nephron", "rationale": "The nephron is the basic unit of the kidney.", "isCorrect": false },
                { "text": "Neuron", "rationale": "Correct. Neurons, or nerve cells, transmit nerve impulses.", "isCorrect": true },
                { "text": "Alveolus", "rationale": "The alveolus is the basic unit of gas exchange in the lungs.", "isCorrect": false },
                { "text": "Capillary", "rationale": "Capillaries are the smallest blood vessels.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The interaction between the muscular and skeletal systems to create movement is best described as:",
            "answerOptions": [
                { "text": "Muscles pushing on bones.", "rationale": "Muscles can only pull, not push.", "isCorrect": false },
                { "text": "Bones pushing on muscles.", "rationale": "Bones provide a rigid structure, but do not actively push.", "isCorrect": false },
                { "text": "Muscles pulling on bones, which act as levers.", "rationale": "Correct. Muscles contract, pulling on bones across joints to produce movement.", "isCorrect": true },
                { "text": "Bones and muscles working independently.", "rationale": "They must work together to create coordinated movement.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Scientific Practices",
    "id": "sci_scientific_practices_data_reasoning_9",
    "title": "Scientific Practices: Data Reasoning",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "In the scientific method, what is the first step?",
            "answerOptions": [
                { "text": "Forming a hypothesis.", "rationale": "This is a crucial step, but it comes after making an observation and asking a question.", "isCorrect": false },
                { "text": "Conducting an experiment.", "rationale": "An experiment is designed to test a hypothesis, so it comes later.", "isCorrect": false },
                { "text": "Making an observation and asking a question.", "rationale": "Correct. All scientific inquiry begins with observing the world and asking questions about it.", "isCorrect": true },
                { "text": "Drawing a conclusion.", "rationale": "A conclusion is drawn after analyzing the results of an experiment.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A hypothesis is best described as a(n):",
            "answerOptions": [
                { "text": "Proven fact.", "rationale": "A hypothesis is not yet proven; it is a proposal that needs to be tested.", "isCorrect": false },
                { "text": "Testable prediction or explanation.", "rationale": "Correct. A hypothesis is a proposed explanation for an observation that can be tested through experimentation.", "isCorrect": true },
                { "text": "Detailed summary of the experiment's results.", "rationale": "This is the results section, which comes after the experiment.", "isCorrect": false },
                { "text": "Question about the natural world.", "rationale": "A hypothesis is a potential answer to a question, not the question itself.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "In a controlled experiment, what is the purpose of a control group?",
            "answerOptions": [
                { "text": "To receive the experimental treatment.", "rationale": "The experimental group receives the treatment.", "isCorrect": false },
                { "text": "To have as many variables as possible.", "rationale": "A good experiment limits variables, it does not multiply them.", "isCorrect": false },
                { "text": "To provide a baseline for comparison with the experimental group.", "rationale": "Correct. The control group is identical to the experimental group in every way except for the variable being tested, allowing scientists to see the true effect of that variable.", "isCorrect": true },
                { "text": "To prove the hypothesis is correct.", "rationale": "The purpose is to provide a valid comparison, which may end up supporting or refuting the hypothesis.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The variable that is changed or manipulated by the researcher in an experiment is called the:",
            "answerOptions": [
                { "text": "Dependent variable.", "rationale": "The dependent variable is what is measured in response to the change.", "isCorrect": false },
                { "text": "Independent variable.", "rationale": "Correct. This is the factor that the scientist intentionally changes to see what effect it has.", "isCorrect": true },
                { "text": "Controlled variable.", "rationale": "Controlled variables (or constants) are factors that are kept the same for all groups.", "isCorrect": false },
                { "text": "Extraneous variable.", "rationale": "Extraneous variables are unplanned factors that could influence the outcome.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A researcher wants to test the effect of a new fertilizer on plant growth. She takes 20 identical pea plants. She gives 10 plants plain water (Group A). She gives the other 10 plants water mixed with the new fertilizer (Group B). All other conditions (sunlight, soil, pot size) are kept the same for both groups. She measures the height of the plants after 4 weeks.",
            "question": "In this experiment, what is the dependent variable?",
            "answerOptions": [
                { "text": "The type of fertilizer.", "rationale": "The fertilizer is what the researcher is changing, making it the independent variable.", "isCorrect": false },
                { "text": "The amount of sunlight.", "rationale": "The amount of sunlight is a controlled variable, kept the same for both groups.", "isCorrect": false },
                { "text": "The height of the plants.", "rationale": "Correct. The height of the plants is what is being measured, and it 'depends' on the treatment (the fertilizer).", "isCorrect": true },
                { "text": "Group A.", "rationale": "Group A is the control group.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A researcher wants to test the effect of a new fertilizer on plant growth. She takes 20 identical pea plants. She gives 10 plants plain water (Group A). She gives the other 10 plants water mixed with the new fertilizer (Group B). All other conditions (sunlight, soil, pot size) are kept the same for both groups. She measures the height of the plants after 4 weeks.",
            "question": "Which of the following is the control group?",
            "answerOptions": [
                { "text": "Group B", "rationale": "Group B receives the experimental treatment (the fertilizer), making it the experimental group.", "isCorrect": false },
                { "text": "Group A", "rationale": "Correct. Group A does not receive the fertilizer and serves as the baseline for comparison.", "isCorrect": true },
                { "text": "The amount of water.", "rationale": "The amount of water is a controlled variable.", "isCorrect": false },
                { "text": "The height of the plants after 4 weeks.", "rationale": "This is the dependent variable.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of the following would be the best tool to measure the volume of a liquid?",
            "answerOptions": [
                { "text": "A balance", "rationale": "A balance is used to measure mass.", "isCorrect": false },
                { "text": "A thermometer", "rationale": "A thermometer is used to measure temperature.", "isCorrect": false },
                { "text": "A graduated cylinder", "rationale": "Correct. A graduated cylinder is marked with volume measurements for this purpose.", "isCorrect": true },
                { "text": "A ruler", "rationale": "A ruler is used to measure length.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "Data Table: The effect of temperature on the rate of a chemical reaction. Temperature (°C): 10, 20, 30, 40. Reaction Rate (grams/second): 2, 4, 8, 16.",
            "question": "Based on the data, what is the relationship between temperature and reaction rate?",
            "answerOptions": [
                { "text": "As temperature increases, the reaction rate decreases.", "rationale": "The data shows the opposite trend.", "isCorrect": false },
                { "text": "As temperature increases, the reaction rate increases.", "rationale": "Correct. For every 10°C increase in temperature, the reaction rate doubles.", "isCorrect": true },
                { "text": "Temperature has no effect on the reaction rate.", "rationale": "The data clearly shows a strong relationship.", "isCorrect": false },
                { "text": "The reaction rate is constant.", "rationale": "The reaction rate changes significantly with temperature.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "A scientific theory is different from a hypothesis because a theory is:",
            "answerOptions": [
                { "text": "An educated guess.", "rationale": "This is a better description of a hypothesis.", "isCorrect": false },
                { "text": "A well-substantiated explanation of some aspect of the natural world that is based on a body of facts that have been repeatedly confirmed through observation and experiment.", "rationale": "Correct. A theory is a much broader and more established explanation than a hypothesis.", "isCorrect": true },
                { "text": "A preliminary observation that has not been tested.", "rationale": "A theory is based on extensive testing.", "isCorrect": false },
                { "text": "The same thing as a scientific law.", "rationale": "A scientific law describes what happens under certain conditions, while a theory explains why it happens.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "When a scientist's experimental results do not support their hypothesis, what should they do?",
            "answerOptions": [
                { "text": "Change the results to fit the hypothesis.", "rationale": "This is scientific misconduct.", "isCorrect": false },
                { "text": "Discard the results and start over with a new experiment.", "rationale": "The results are still valuable data.", "isCorrect": false },
                { "text": "Revise the hypothesis or formulate a new one, and then design new experiments to test it.", "rationale": "Correct. Science is a process of refining ideas based on evidence. A refuted hypothesis is a productive part of the process.", "isCorrect": true },
                { "text": "Conclude that the experiment was a complete failure.", "rationale": "An experiment that provides clear data, even if it refutes the hypothesis, is a successful experiment.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "In science, what does the term 'inference' mean?",
            "answerOptions": [
                { "text": "A direct observation using the five senses.", "rationale": "This is a simple observation, not an inference.", "isCorrect": false },
                { "text": "A conclusion or interpretation based on evidence and reasoning.", "rationale": "Correct. An inference is a logical step that goes beyond direct observation. For example, observing smoke and inferring there is a fire.", "isCorrect": true },
                { "text": "A measurement taken with a scientific tool.", "rationale": "This is a form of data collection.", "isCorrect": false },
                { "text": "A variable that is kept constant in an experiment.", "rationale": "This is a controlled variable.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A student is investigating the dissolving rate of salt in water. What is one variable that should be controlled (kept constant) to ensure a fair test?",
            "answerOptions": [
                { "text": "The amount of time it takes for the salt to dissolve.", "rationale": "This is the dependent variable, what is being measured.", "isCorrect": false },
                { "text": "The temperature of the water.", "rationale": "Correct. Water temperature affects dissolving rate, so it must be kept the same in all trials to isolate the effect of the variable being tested (e.g., stirring).", "isCorrect": true },
                { "text": "The number of trials conducted.", "rationale": "Conducting multiple trials is good practice, but not a variable within the experiment itself.", "isCorrect": false },
                { "text": "The hypothesis of the experiment.", "rationale": "The hypothesis is the idea being tested, not a condition of the experiment.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Physical Science",
    "id": "sci_physical_science_newtons_laws_10",
    "title": "Physical Science: Newton's Laws of Motion",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Newton's First Law of Motion is also known as the law of:",
            "answerOptions": [
                { "text": "Action-Reaction", "rationale": "This refers to Newton's Third Law.", "isCorrect": false },
                { "text": "Inertia", "rationale": "Correct. It states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.", "isCorrect": true },
                { "text": "Universal Gravitation", "rationale": "This is a separate law that describes the force of gravity between two objects.", "isCorrect": false },
                { "text": "Acceleration", "rationale": "Newton's Second Law deals with acceleration (F=ma).", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "According to Newton's First Law, an object in motion will stay in motion unless acted upon by an outside force. What is the name of the force that most often opposes motion on Earth?",
            "answerOptions": [
                { "text": "Gravity", "rationale": "Gravity is a force that pulls objects down, but it doesn't always oppose the direction of motion.", "isCorrect": false },
                { "text": "Magnetism", "rationale": "Magnetism only affects certain materials and is not a universal opposing force.", "isCorrect": false },
                { "text": "Inertia", "rationale": "Inertia is the property of an object to resist changes in its state of motion, not a force itself.", "isCorrect": false },
                { "text": "Friction", "rationale": "Correct. Friction is a force that resists motion between two surfaces that are in contact.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Newton's Second Law of Motion is represented by the formula F = ma. What does 'a' stand for?",
            "answerOptions": [
                { "text": "Action", "rationale": "F stands for force, m for mass.", "isCorrect": false },
                { "text": "Altitude", "rationale": "F stands for force, m for mass.", "isCorrect": false },
                { "text": "Acceleration", "rationale": "Correct. The formula states that the force (F) acting on an object is equal to its mass (m) times its acceleration (a).", "isCorrect": true },
                { "text": "Atmosphere", "rationale": "F stands for force, m for mass.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "If you push a 10 kg box with a force of 50 Newtons, what will be the acceleration of the box (assuming no friction)?",
            "answerOptions": [
                { "text": "500 m/s²", "rationale": "This would be m * F. The correct formula is a = F/m.", "isCorrect": false },
                { "text": "5 m/s²", "rationale": "Correct. Using a = F/m, acceleration is 50 N / 10 kg = 5 m/s².", "isCorrect": true },
                { "text": "0.2 m/s²", "rationale": "This would be m / F. The correct formula is a = F/m.", "isCorrect": false },
                { "text": "40 m/s²", "rationale": "This is F - m. The correct formula is a = F/m.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A student is pushing two boxes across a frictionless floor. Box A has a mass of 5 kg and Box B has a mass of 10 kg. The student applies the exact same pushing force to each box.",
            "question": "According to Newton's Second Law, which box will have the greater acceleration?",
            "answerOptions": [
                { "text": "Box A", "rationale": "Correct. Since a = F/m, and the force (F) is the same for both, the box with the smaller mass (m) will have the greater acceleration (a).", "isCorrect": true },
                { "text": "Box B", "rationale": "Box B has a larger mass, so it will have a smaller acceleration for the same amount of force.", "isCorrect": false },
                { "text": "Both boxes will have the same acceleration.", "rationale": "Their accelerations will be different because their masses are different.", "isCorrect": false },
                { "text": "Neither box will accelerate.", "rationale": "An unbalanced force will cause both boxes to accelerate.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "A student is pushing two boxes across a frictionless floor. Box A has a mass of 5 kg and Box B has a mass of 10 kg. The student applies the exact same pushing force to each box.",
            "question": "This scenario primarily demonstrates the inverse relationship between which two factors in Newton's Second Law?",
            "answerOptions": [
                { "text": "Force and acceleration", "rationale": "Force and acceleration have a direct relationship; as force increases, so does acceleration.", "isCorrect": false },
                { "text": "Mass and acceleration", "rationale": "Correct. For a constant force, as mass increases, acceleration decreases. This is an inverse relationship.", "isCorrect": true },
                { "text": "Force and mass", "rationale": "Force and mass are not inversely related in this context.", "isCorrect": false },
                { "text": "Mass and weight", "rationale": "Mass and weight are directly proportional (Weight = mass * gravity), not inversely related.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Newton's Third Law of Motion states that for every action, there is an equal and opposite...",
            "answerOptions": [
                { "text": "Force", "rationale": "This is part of the law, but 'reaction' is the specific term used.", "isCorrect": false },
                { "text": "Acceleration", "rationale": "Acceleration is a result of forces, not the opposite of an action.", "isCorrect": false },
                { "text": "Reaction", "rationale": "Correct. This is the classic statement of the law.", "isCorrect": true },
                { "text": "Mass", "rationale": "Mass is a property of matter, not a response to a force.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A rocket moves forward in space by expelling hot gases from its engine. This is an example of which of Newton's Laws?",
            "answerOptions": [
                { "text": "First Law", "rationale": "The First Law deals with inertia, not the forces of propulsion.", "isCorrect": false },
                { "text": "Second Law", "rationale": "While the Second Law describes the rocket's acceleration, the principle of propulsion is best explained by the Third Law.", "isCorrect": false },
                { "text": "Third Law", "rationale": "Correct. The rocket pushes the gas backward (action), and the gas pushes the rocket forward (reaction).", "isCorrect": true },
                { "text": "Law of Universal Gravitation", "rationale": "This law explains the force of gravity, not how a rocket moves.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "A person is standing on a scale in an elevator. The scale reads 150 lbs when the elevator is stationary. When the elevator begins to accelerate upwards, what will the scale read?",
            "answerOptions": [
                { "text": "Less than 150 lbs", "rationale": "The scale would read less if the elevator were accelerating downwards.", "isCorrect": false },
                { "text": "Exactly 150 lbs", "rationale": "The reading will change because of the additional upward force causing acceleration.", "isCorrect": false },
                { "text": "More than 150 lbs", "rationale": "Correct. The scale measures the normal force. To accelerate you upward, the floor must push on you with a force greater than your weight. By Newton's Third Law, you push on the scale with an equal force, so the reading increases.", "isCorrect": true },
                { "text": "Zero", "rationale": "The scale would only read zero if the elevator were in freefall.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What is the difference between mass and weight?",
            "answerOptions": [
                { "text": "They are the same thing.", "rationale": "They are related but distinct concepts.", "isCorrect": false },
                { "text": "Mass is the amount of matter in an object, while weight is the force of gravity on that object.", "rationale": "Correct. Your mass is the same on Earth and the Moon, but your weight is different.", "isCorrect": true },
                { "text": "Mass is a force, and weight is a measure of inertia.", "rationale": "This is incorrect. Weight is a force, and mass is a measure of inertia.", "isCorrect": false },
                { "text": "Mass depends on gravity, while weight does not.", "rationale": "This is the opposite of the correct relationship.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "If you are sitting in a chair, your body is exerting a downward force on the chair. What is the reaction force according to Newton's Third Law?",
            "answerOptions": [
                { "text": "The force of gravity pulling you down.", "rationale": "This is the action force, not the reaction to your body pushing on the chair.", "isCorrect": false },
                { "text": "The chair exerting an upward force on your body.", "rationale": "Correct. This is the equal and opposite reaction force that prevents you from falling through the chair.", "isCorrect": true },
                { "text": "The floor exerting an upward force on the chair.", "rationale": "This is the reaction force to the chair pushing on the floor.", "isCorrect": false },
                { "text": "The ceiling pulling the chair up.", "rationale": "This force is not present in this scenario.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "A car suddenly stops, and the passengers lurch forward. This phenomenon is best explained by:",
            "answerOptions": [
                { "text": "Newton's Second Law", "rationale": "The second law relates force, mass, and acceleration, but doesn't best explain the passengers' motion relative to the car.", "isCorrect": false },
                { "text": "Newton's Third Law", "rationale": "The third law deals with action-reaction pairs, which is not the primary principle at play here.", "isCorrect": false },
                { "text": "The concept of friction", "rationale": "Friction is the force that stops the car, but inertia explains why the passengers continue to move.", "isCorrect": false },
                { "text": "Newton's First Law (Inertia)", "rationale": "Correct. The car stops due to an outside force (the brakes), but the passengers' bodies continue to move forward because of their inertia, as no force has acted directly on them to stop them yet.", "isCorrect": true }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Earth and Space Science",
    "id": "sci_earth_space_science_weather_climate_11",
    "title": "Earth & Space Science: Weather and Climate",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the primary source of energy that drives weather on Earth?",
            "answerOptions": [
                { "text": "The Earth's core", "rationale": "The Earth's core provides geothermal energy, but it has a negligible effect on weather compared to the sun.", "isCorrect": false },
                { "text": "The Moon's gravity", "rationale": "The Moon's gravity primarily causes ocean tides.", "isCorrect": false },
                { "text": "The Sun", "rationale": "Correct. The sun's energy heats the Earth's surface unevenly, creating temperature differences that drive winds and ocean currents.", "isCorrect": true },
                { "text": "Wind turbines", "rationale": "Wind turbines capture energy from the wind; they do not create it.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The difference between weather and climate is that:",
            "answerOptions": [
                { "text": "Weather is the condition of the atmosphere over a short period of time, while climate is the average weather over a long period of time.", "rationale": "Correct. Weather is what's happening now or in the near future, while climate is the long-term pattern for a region.", "isCorrect": true },
                { "text": "Climate is the condition of the atmosphere over a short period of time, while weather is the average weather over a long period of time.", "rationale": "This reverses the definitions.", "isCorrect": false },
                { "text": "Weather and climate are the same thing.", "rationale": "They are related but distinct concepts.", "isCorrect": false },
                { "text": "Weather only refers to temperature, while climate includes precipitation.", "rationale": "Both weather and climate include multiple factors like temperature, precipitation, wind, and humidity.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What causes wind?",
            "answerOptions": [
                { "text": "The rotation of the Earth on its axis.", "rationale": "The Earth's rotation (the Coriolis effect) influences the direction of wind, but it does not create the wind itself.", "isCorrect": false },
                { "text": "Differences in air pressure, caused by the uneven heating of the Earth.", "rationale": "Correct. Air moves from areas of high pressure to areas of low pressure, creating wind.", "isCorrect": true },
                { "text": "The gravitational pull of the Moon.", "rationale": "This primarily affects tides.", "isCorrect": false },
                { "text": "The movement of ocean currents.", "rationale": "Winds drive surface ocean currents, not the other way around.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A large body of air with relatively uniform temperature and humidity is called a(n):",
            "answerOptions": [
                { "text": "Front", "rationale": "A front is the boundary between two different air masses.", "isCorrect": false },
                { "text": "Jet stream", "rationale": "A jet stream is a fast-flowing, narrow air current found in the atmosphere.", "isCorrect": false },
                { "text": "Air mass", "rationale": "Correct. Air masses are classified based on their source region (e.g., maritime tropical, continental polar).", "isCorrect": true },
                { "text": "Low-pressure system", "rationale": "This is a region where air pressure is lower than the surrounding area, often associated with stormy weather.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "On a weather map, a line with blue triangles on one side is moving towards a city. This line represents a boundary where a cold, dense air mass is replacing a warmer air mass.",
            "question": "What type of weather can the city expect as this boundary passes?",
            "answerOptions": [
                { "text": "A long period of light, steady rain.", "rationale": "This is more typical of a warm front.", "isCorrect": false },
                { "text": "Calm, clear skies and warm temperatures.", "rationale": "This is the opposite of what a cold front typically brings.", "isCorrect": false },
                { "text": "A rapid drop in temperature, strong winds, and a line of heavy showers or thunderstorms.", "rationale": "Correct. The dense cold air forces the warm, moist air to rise rapidly, causing condensation and often intense, short-lived precipitation.", "isCorrect": true },
                { "text": "Fog and drizzle.", "rationale": "This can occur, but it is not the most characteristic weather for a strong cold front.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "On a weather map, a line with blue triangles on one side is moving towards a city. This line represents a boundary where a cold, dense air mass is replacing a warmer air mass.",
            "question": "What is the name of the feature described in the passage?",
            "answerOptions": [
                { "text": "A warm front", "rationale": "A warm front is represented by a line with red semicircles.", "isCorrect": false },
                { "text": "A stationary front", "rationale": "A stationary front has alternating blue triangles and red semicircles on opposite sides.", "isCorrect": false },
                { "text": "An occluded front", "rationale": "An occluded front has alternating triangles and semicircles on the same side.", "isCorrect": false },
                { "text": "A cold front", "rationale": "Correct. This is the standard symbol and description for a cold front.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The process by which water vapor in the air is changed into liquid water is called:",
            "answerOptions": [
                { "text": "Evaporation", "rationale": "Evaporation is the process of liquid water turning into water vapor.", "isCorrect": false },
                { "text": "Condensation", "rationale": "Correct. This is how clouds and dew are formed.", "isCorrect": true },
                { "text": "Precipitation", "rationale": "Precipitation is any form of water that falls from clouds (e.g., rain, snow).", "isCorrect": false },
                { "text": "Transpiration", "rationale": "Transpiration is the process of water movement through a plant and its evaporation from leaves.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The greenhouse effect is a natural process that warms the Earth's surface. Which of the following is a major greenhouse gas?",
            "answerOptions": [
                { "text": "Oxygen", "rationale": "Oxygen is not a significant greenhouse gas.", "isCorrect": false },
                { "text": "Nitrogen", "rationale": "Nitrogen makes up about 78% of the atmosphere but is not a greenhouse gas.", "isCorrect": false },
                { "text": "Carbon dioxide", "rationale": "Correct. Carbon dioxide, along with methane and water vapor, traps heat in the atmosphere, keeping the planet warm enough for life.", "isCorrect": true },
                { "text": "Argon", "rationale": "Argon is an inert gas and not a greenhouse gas.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Coastal regions tend to have more moderate climates than inland areas at the same latitude. This is primarily because:",
            "answerOptions": [
                { "text": "The soil near the coast is different.", "rationale": "Soil type has a minor, if any, effect on regional climate moderation.", "isCorrect": false },
                { "text": "There are more people living near the coast.", "rationale": "Urban heat islands can raise temperatures, but this does not explain the overall moderating effect.", "isCorrect": false },
                { "text": "Water has a high specific heat, meaning it heats up and cools down much more slowly than land.", "rationale": "Correct. In the summer, the ocean absorbs heat, keeping the coast cooler. In the winter, it slowly releases that heat, keeping the coast warmer.", "isCorrect": true },
                { "text": "There is more wind at the coast.", "rationale": "While it may be windy, the wind itself doesn't moderate the temperature; it's the temperature of the air (influenced by the water) that matters.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which tool is used to measure air pressure?",
            "answerOptions": [
                { "text": "Thermometer", "rationale": "A thermometer measures temperature.", "isCorrect": false },
                { "text": "Anemometer", "rationale": "An anemometer measures wind speed.", "isCorrect": false },
                { "text": "Hygrometer", "rationale": "A hygrometer measures humidity.", "isCorrect": false },
                { "text": "Barometer", "rationale": "Correct. A rising barometer often indicates fair weather, while a falling barometer can indicate an approaching storm.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of the following is a form of precipitation?",
            "answerOptions": [
                { "text": "Cloud", "rationale": "A cloud is a collection of water droplets or ice crystals, but it is not precipitation until it falls.", "isCorrect": false },
                { "text": "Fog", "rationale": "Fog is essentially a cloud at ground level.", "isCorrect": false },
                { "text": "Snow", "rationale": "Correct. Snow, rain, sleet, and hail are all forms of precipitation.", "isCorrect": true },
                { "text": "Humidity", "rationale": "Humidity is the amount of water vapor in the air.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "A city is located on the leeward side of a mountain range (the side sheltered from the wind). The prevailing winds in the region carry moist air from the ocean towards the mountains. What kind of climate would this city most likely have?",
            "answerOptions": [
                { "text": "Wet and rainy", "rationale": "The windward side of the mountain receives most of the rain.", "isCorrect": false },
                { "text": "Dry and arid", "rationale": "Correct. This phenomenon is called a rain shadow. The moist air is forced to rise over the mountains, where it cools and releases its moisture as precipitation on the windward side. The air that descends on the leeward side is dry.", "isCorrect": true },
                { "text": "Cold and snowy", "rationale": "While it could be cold, the defining characteristic would be its dryness.", "isCorrect": false },
                { "text": "The same as the coastal region", "rationale": "The mountains create a significant climatic difference between the windward and leeward sides.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Life Science",
    "id": "sci_life_science_photosynthesis_respiration_12",
    "title": "Life Science: Photosynthesis & Respiration",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the primary purpose of photosynthesis?",
            "answerOptions": [
                { "text": "To release energy from food.", "rationale": "This is the purpose of cellular respiration.", "isCorrect": false },
                { "text": "To convert light energy into chemical energy in the form of glucose.", "rationale": "Correct. Plants use sunlight, water, and carbon dioxide to create their own food (glucose).", "isCorrect": true },
                { "text": "To absorb water from the soil.", "rationale": "This is a function of the roots, but it is not the purpose of photosynthesis itself.", "isCorrect": false },
                { "text": "To produce oxygen for animals to breathe.", "rationale": "Oxygen is a byproduct of photosynthesis, but the primary goal for the plant is to create food for itself.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of the following are the reactants (inputs) for photosynthesis?",
            "answerOptions": [
                { "text": "Glucose and oxygen", "rationale": "These are the products of photosynthesis.", "isCorrect": false },
                { "text": "Carbon dioxide, water, and sunlight", "rationale": "Correct. These are the three essential ingredients a plant needs to perform photosynthesis.", "isCorrect": true },
                { "text": "Water and oxygen", "rationale": "Carbon dioxide and sunlight are also needed.", "isCorrect": false },
                { "text": "Glucose and sunlight", "rationale": "Glucose is the product; carbon dioxide and water are the reactants.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "In what part of the plant cell does photosynthesis occur?",
            "answerOptions": [
                { "text": "Mitochondria", "rationale": "Mitochondria are the site of cellular respiration.", "isCorrect": false },
                { "text": "Nucleus", "rationale": "The nucleus contains the cell's genetic material.", "isCorrect": false },
                { "text": "Chloroplast", "rationale": "Correct. Chloroplasts contain chlorophyll, the green pigment that captures light energy.", "isCorrect": true },
                { "text": "Cell wall", "rationale": "The cell wall provides structural support to the plant cell.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What is the primary purpose of cellular respiration?",
            "answerOptions": [
                { "text": "To create food from sunlight.", "rationale": "This is the purpose of photosynthesis.", "isCorrect": false },
                { "text": "To release energy (ATP) from glucose for the cell to use.", "rationale": "Correct. It is the process by which organisms break down food to power their life functions.", "isCorrect": true },
                { "text": "To produce carbon dioxide for plants.", "rationale": "Carbon dioxide is a byproduct of respiration, but its production is not the primary goal.", "isCorrect": false },
                { "text": "To get rid of excess oxygen.", "rationale": "Oxygen is a necessary reactant for aerobic respiration.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A scientist places two aquatic plants of the same species in two identical, sealed containers filled with water. Container 1 is placed in a sunny location, and Container 2 is placed in a dark closet. After 24 hours, the scientist measures the concentration of dissolved oxygen in the water in both containers.",
            "question": "What would be the most likely result of this experiment?",
            "answerOptions": [
                { "text": "The oxygen concentration will be higher in Container 2 than in Container 1.", "rationale": "In the dark, the plant will only respire, consuming oxygen. In the light, it will photosynthesize, producing much more oxygen than it consumes.", "isCorrect": false },
                { "text": "The oxygen concentration will be higher in Container 1 than in Container 2.", "rationale": "Correct. The plant in the light (Container 1) will perform photosynthesis, releasing oxygen. The plant in the dark (Container 2) will only perform cellular respiration, consuming oxygen.", "isCorrect": true },
                { "text": "The oxygen concentration will be the same in both containers.", "rationale": "The presence of light will cause a significant difference in the processes occurring.", "isCorrect": false },
                { "text": "Both containers will have zero oxygen.", "rationale": "The plant in Container 1 will produce oxygen.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A scientist places two aquatic plants of the same species in two identical, sealed containers filled with water. Container 1 is placed in a sunny location, and Container 2 is placed in a dark closet. After 24 hours, the scientist measures the concentration of dissolved oxygen in the water in both containers.",
            "question": "The process responsible for the decrease in oxygen in Container 2 is:",
            "answerOptions": [
                { "text": "Photosynthesis", "rationale": "Photosynthesis produces oxygen and can only happen in the presence of light.", "isCorrect": false },
                { "text": "Cellular respiration", "rationale": "Correct. All living cells, including plant cells, respire constantly to produce ATP. This process consumes oxygen and occurs in both light and dark conditions.", "isCorrect": true },
                { "text": "Transpiration", "rationale": "Transpiration is the movement of water through a plant, not the consumption of oxygen.", "isCorrect": false },
                { "text": "Decomposition", "rationale": "While decomposition consumes oxygen, the primary process for a living plant in the dark is respiration.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of the following organisms perform cellular respiration?",
            "answerOptions": [
                { "text": "Animals only", "rationale": "Plants and many other organisms also respire.", "isCorrect": false },
                { "text": "Plants only", "rationale": "Animals and many other organisms also respire.", "isCorrect": false },
                { "text": "Both plants and animals", "rationale": "Correct. Nearly all living organisms, including plants, animals, fungi, and bacteria, perform cellular respiration to get energy from their food.", "isCorrect": true },
                { "text": "Neither plants nor animals", "rationale": "All living things need energy to survive.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "How are the chemical equations for photosynthesis and aerobic cellular respiration related?",
            "answerOptions": [
                { "text": "They are identical.", "rationale": "They involve the same substances but in different roles.", "isCorrect": false },
                { "text": "They are essentially the reverse of each other.", "rationale": "Correct. The products of photosynthesis (glucose and oxygen) are the reactants of cellular respiration, and the products of cellular respiration (carbon dioxide and water) are the reactants of photosynthesis.", "isCorrect": true },
                { "text": "They are unrelated.", "rationale": "They are very closely related, forming a cycle.", "isCorrect": false },
                { "text": "Photosynthesis is a simplified version of cellular respiration.", "rationale": "They are two distinct, complex processes.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The green color of most plants is due to a pigment called:",
            "answerOptions": [
                { "text": "Hemoglobin", "rationale": "Hemoglobin is the red pigment in blood that carries oxygen.", "isCorrect": false },
                { "text": "Melanin", "rationale": "Melanin is a pigment that gives color to skin, hair, and eyes.", "isCorrect": false },
                { "text": "Chlorophyll", "rationale": "Correct. Chlorophyll absorbs red and blue light and reflects green light, which is why we see plants as green.", "isCorrect": true },
                { "text": "Carotene", "rationale": "Carotene is an orange pigment found in plants like carrots.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "What is the name of the energy currency molecule that is produced during cellular respiration?",
            "answerOptions": [
                { "text": "Glucose", "rationale": "Glucose is the sugar molecule that is broken down to release energy.", "isCorrect": false },
                { "text": "Adenosine triphosphate (ATP)", "rationale": "Correct. ATP stores and transports chemical energy within cells.", "isCorrect": true },
                { "text": "Deoxyribonucleic acid (DNA)", "rationale": "DNA is the molecule that carries genetic instructions.", "isCorrect": false },
                { "text": "Oxygen", "rationale": "Oxygen is a reactant in aerobic respiration, not the energy molecule itself.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What gas is released as a waste product during photosynthesis?",
            "answerOptions": [
                { "text": "Carbon dioxide", "rationale": "Carbon dioxide is a reactant, not a product.", "isCorrect": false },
                { "text": "Nitrogen", "rationale": "Nitrogen is not directly involved in the main photosynthesis equation.", "isCorrect": false },
                { "text": "Oxygen", "rationale": "Correct. This oxygen is crucial for most life on Earth.", "isCorrect": true },
                { "text": "Methane", "rationale": "Methane is not produced during photosynthesis.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "In which organelle does aerobic cellular respiration primarily take place?",
            "answerOptions": [
                { "text": "Chloroplast", "rationale": "Photosynthesis occurs in the chloroplast.", "isCorrect": false },
                { "text": "Mitochondrion", "rationale": "Correct. Mitochondria are often called the 'powerhouses' of the cell because this is where ATP is generated.", "isCorrect": true },
                { "text": "Ribosome", "rationale": "Ribosomes are responsible for protein synthesis.", "isCorrect": false },
                { "text": "Vacuole", "rationale": "Vacuoles are primarily for storage.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Scientific Practices",
    "id": "sci_scientific_practices_experimental_design_13",
    "title": "Scientific Practices: Experimental Design",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A clear, testable statement that predicts the outcome of an experiment is a(n):",
            "answerOptions": [
                { "text": "Observation", "rationale": "An observation is the act of gathering information, which often leads to a hypothesis.", "isCorrect": false },
                { "text": "Conclusion", "rationale": "A conclusion is a summary of the results, drawn after the experiment.", "isCorrect": false },
                { "text": "Hypothesis", "rationale": "Correct. A hypothesis is a specific, predictive statement that can be tested.", "isCorrect": true },
                { "text": "Theory", "rationale": "A theory is a broad explanation that has been repeatedly tested and confirmed.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "In an experiment, the factor that a scientist observes or measures to see if it is affected by a change is the:",
            "answerOptions": [
                { "text": "Independent variable", "rationale": "The independent variable is the factor that the scientist changes.", "isCorrect": false },
                { "text": "Dependent variable", "rationale": "Correct. The dependent variable is the outcome that is measured; its value 'depends' on the independent variable.", "isCorrect": true },
                { "text": "Control variable", "rationale": "Control variables are the factors kept constant throughout the experiment.", "isCorrect": false },
                { "text": "Hypothesis", "rationale": "The hypothesis is the prediction being tested, not the measurement itself.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Why is it important to only change one independent variable at a time in an experiment?",
            "answerOptions": [
                { "text": "To make the experiment take longer.", "rationale": "Efficiency is good, but validity is more important.", "isCorrect": false },
                { "text": "To ensure that the results are due to that single variable and not a combination of factors.", "rationale": "Correct. This allows for a valid conclusion about cause and effect.", "isCorrect": true },
                { "text": "It is not important; you can change multiple variables at once.", "rationale": "Changing multiple variables makes it impossible to know which one caused the observed effect.", "isCorrect": false },
                { "text": "To make the data easier to graph.", "rationale": "While it may make graphing simpler, the primary reason is for experimental validity.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The group in an experiment that does not receive the experimental treatment and is used as a standard for comparison is called the:",
            "answerOptions": [
                { "text": "Experimental group", "rationale": "The experimental group is the one that receives the treatment.", "isCorrect": false },
                { "text": "Variable group", "rationale": "This is not a standard term in experimental design.", "isCorrect": false },
                { "text": "Dependent group", "rationale": "The dependent variable is measured, but it is not a group.", "isCorrect": false },
                { "text": "Control group", "rationale": "Correct. The control group provides a baseline to which the experimental group's results can be compared.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A study was conducted to see if a new energy drink improves test performance. 100 students were randomly divided into two groups of 50. Group A was given the new energy drink 30 minutes before a math test. Group B was given a placebo (a drink that looked and tasted the same but had no active ingredients) 30 minutes before the same math test. The average test scores of the two groups were then compared.",
            "question": "In this experiment, what is the independent variable?",
            "answerOptions": [
                { "text": "The math test scores.", "rationale": "The test scores are what is being measured, making them the dependent variable.", "isCorrect": false },
                { "text": "The type of drink (energy drink or placebo).", "rationale": "Correct. This is the factor that the researchers manipulated to see if it had an effect.", "isCorrect": true },
                { "text": "The number of students in each group.", "rationale": "This is a feature of the experimental design, not a variable being tested.", "isCorrect": false },
                { "text": "The time of day the test was taken.", "rationale": "This should be a controlled variable, kept the same for both groups.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A study was conducted to see if a new energy drink improves test performance. 100 students were randomly divided into two groups of 50. Group A was given the new energy drink 30 minutes before a math test. Group B was given a placebo (a drink that looked and tasted the same but had no active ingredients) 30 minutes before the same math test. The average test scores of the two groups were then compared.",
            "question": "What is the purpose of Group B in this study?",
            "answerOptions": [
                { "text": "To see if the energy drink has any side effects.", "rationale": "The primary purpose is to compare test scores, not side effects.", "isCorrect": false },
                { "text": "To act as the experimental group.", "rationale": "Group A is the experimental group because it receives the active treatment.", "isCorrect": false },
                { "text": "To act as the control group, showing what happens without the active ingredient.", "rationale": "Correct. Using a placebo helps to isolate the effect of the energy drink itself, separate from the psychological effect of simply being given a drink.", "isCorrect": true },
                { "text": "To make the study larger and more impressive.", "rationale": "The group has a specific scientific purpose, not just to increase numbers.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Data that is descriptive and non-numerical (e.g., color, texture) is known as:",
            "answerOptions": [
                { "text": "Quantitative data", "rationale": "Quantitative data is numerical (think 'quantity').", "isCorrect": false },
                { "text": "Qualitative data", "rationale": "Correct. Qualitative data describes qualities or characteristics.", "isCorrect": true },
                { "text": "Variable data", "rationale": "Data can represent variables, but this term doesn't describe the type of data.", "isCorrect": false },
                { "text": "Inferred data", "rationale": "Inferences are conclusions drawn from data, not the data itself.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Why do scientists often repeat an experiment multiple times?",
            "answerOptions": [
                { "text": "To ensure the results are reliable and not due to chance or error.", "rationale": "Correct. This practice, known as replication, is a cornerstone of valid scientific research.", "isCorrect": true },
                { "text": "To get a different result each time.", "rationale": "The goal is to see if the results are consistent.", "isCorrect": false },
                { "text": "To make sure the hypothesis is proven correct.", "rationale": "The goal is to test the hypothesis objectively, not to force a particular outcome.", "isCorrect": false },
                { "text": "To change the variables with each repetition.", "rationale": "For replication, the conditions should be kept as similar as possible.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "In an experiment measuring the growth of three groups of plants under different colored lights (red, blue, and green), what would be an important controlled variable?",
            "answerOptions": [
                { "text": "The final height of the plants.", "rationale": "This would be the dependent variable.", "isCorrect": false },
                { "text": "The color of the light.", "rationale": "This is the independent variable.", "isCorrect": false },
                { "text": "The amount of water given to each plant.", "rationale": "Correct. To ensure that only the light color is affecting the growth, other factors like water, soil type, and temperature must be kept the same for all groups.", "isCorrect": true },
                { "text": "The hypothesis about which light is best.", "rationale": "The hypothesis is the idea being tested, not a condition of the experiment.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "A scientific conclusion should be based on:",
            "answerOptions": [
                { "text": "The scientist's personal opinion or belief.", "rationale": "Scientific conclusions must be objective and based on evidence.", "isCorrect": false },
                { "text": "Whether the results match the hypothesis.", "rationale": "The conclusion should reflect the actual results, whether they support the hypothesis or not.", "isCorrect": false },
                { "text": "An analysis of the data collected during the experiment.", "rationale": "Correct. The data provides the evidence from which a logical conclusion can be drawn.", "isCorrect": true },
                { "text": "The conclusions from a single trial of the experiment.", "rationale": "Conclusions should be based on data from multiple, repeated trials for reliability.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A scientist uses a graph to present their data. What is the primary purpose of graphing data?",
            "answerOptions": [
                { "text": "To make the data look more complicated.", "rationale": "The goal is to simplify and clarify, not complicate.", "isCorrect": false },
                { "text": "To easily visualize patterns and relationships in the data.", "rationale": "Correct. Graphs can make trends, like a positive or negative correlation, much easier to see than a table of numbers.", "isCorrect": true },
                { "text": "To hide any errors made during the experiment.", "rationale": "Graphs should be an accurate representation of the data.", "isCorrect": false },
                { "text": "To replace the need for a written conclusion.", "rationale": "A graph is a tool for analysis and presentation, but a written conclusion is still needed to explain its meaning.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What is the main difference between a scientific law and a scientific theory?",
            "answerOptions": [
                { "text": "A theory is a guess, while a law is a fact.", "rationale": "In science, a theory is a well-substantiated explanation, not just a guess.", "isCorrect": false },
                { "text": "A law describes what happens, while a theory explains why it happens.", "rationale": "Correct. For example, the law of gravity describes the attraction between objects, while the theory of general relativity explains why that attraction occurs.", "isCorrect": true },
                { "text": "A theory becomes a law after it has been proven true.", "rationale": "Theories and laws are different kinds of scientific knowledge; one does not become the other.", "isCorrect": false },
                { "text": "There is no difference.", "rationale": "They are distinct concepts in the philosophy of science.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Physical Science",
    "id": "sci_physical_science_energy_transformations_14",
    "title": "Physical Science: Energy Transformations",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The law of conservation of energy states that energy:",
            "answerOptions": [
                { "text": "Can be created but not destroyed.", "rationale": "This violates the law.", "isCorrect": false },
                { "text": "Can be destroyed but not created.", "rationale": "This also violates the law.", "isCorrect": false },
                { "text": "Can be created and destroyed.", "rationale": "Energy is constant in a closed system.", "isCorrect": false },
                { "text": "Cannot be created or destroyed, only transformed.", "rationale": "Correct. This is the fundamental principle of the conservation of energy.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A flashlight battery converts what type of energy into electrical energy?",
            "answerOptions": [
                { "text": "Chemical energy", "rationale": "Correct. Batteries store potential energy in chemical compounds.", "isCorrect": true },
                { "text": "Mechanical energy", "rationale": "Mechanical energy relates to motion and position.", "isCorrect": false },
                { "text": "Nuclear energy", "rationale": "Nuclear energy is stored in the nucleus of an atom.", "isCorrect": false },
                { "text": "Thermal energy", "rationale": "Thermal energy is related to heat.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "When you rub your hands together on a cold day, you are converting:",
            "answerOptions": [
                { "text": "Chemical energy to thermal energy.", "rationale": "While your body uses chemical energy, the rubbing action is mechanical.", "isCorrect": false },
                { "text": "Mechanical energy to thermal energy.", "rationale": "Correct. The motion (mechanical energy) of your hands creates friction, which generates heat (thermal energy).", "isCorrect": true },
                { "text": "Electrical energy to thermal energy.", "rationale": "There is no electrical input in this action.", "isCorrect": false },
                { "text": "Thermal energy to mechanical energy.", "rationale": "This is the reverse of what is happening.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A solar panel on a roof takes in light energy from the sun and transforms it primarily into:",
            "answerOptions": [
                { "text": "Chemical energy", "rationale": "Some systems use solar energy to drive chemical reactions, but a standard photovoltaic panel produces electricity.", "isCorrect": false },
                { "text": "Mechanical energy", "rationale": "A solar panel has no moving parts to generate mechanical energy.", "isCorrect": false },
                { "text": "Electrical energy", "rationale": "Correct. Photovoltaic cells in the panel convert photons of light into an electric current.", "isCorrect": true },
                { "text": "Nuclear energy", "rationale": "The sun's energy comes from nuclear fusion, but the panel itself performs an energy transformation, not a nuclear reaction.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "An incandescent light bulb works by passing electricity through a thin filament, causing it to glow brightly. However, a significant amount of the electrical energy is not converted into light. An LED bulb passes electricity through a semiconductor to produce light, a much more direct process.",
            "question": "Based on the passage, why is an LED bulb more energy-efficient than an incandescent bulb?",
            "answerOptions": [
                { "text": "The LED bulb converts most of the electrical energy into thermal energy (heat).", "rationale": "This describes the inefficiency of the incandescent bulb.", "isCorrect": false },
                { "text": "The incandescent bulb converts most electrical energy directly into light.", "rationale": "The passage implies the opposite is true.", "isCorrect": false },
                { "text": "The LED bulb loses less energy as heat during the conversion to light.", "rationale": "Correct. The incandescent bulb gets very hot, meaning much of the electrical energy is wasted as thermal energy instead of being converted to the desired form, light.", "isCorrect": true },
                { "text": "The incandescent bulb uses chemical energy.", "rationale": "Both bulbs use electrical energy as their input.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "An incandescent light bulb works by passing electricity through a thin filament, causing it to glow brightly. However, a significant amount of the electrical energy is not converted into light. An LED bulb passes electricity through a semiconductor to produce light, a much more direct process.",
            "question": "The primary unwanted energy transformation in the incandescent light bulb is:",
            "answerOptions": [
                { "text": "Electrical to light", "rationale": "This is the desired transformation.", "isCorrect": false },
                { "text": "Electrical to thermal", "rationale": "Correct. The heat produced by the glowing filament is the main source of energy inefficiency.", "isCorrect": true },
                { "text": "Light to thermal", "rationale": "The transformation starts with electrical energy.", "isCorrect": false },
                { "text": "Chemical to electrical", "rationale": "The bulb uses electricity from an external source.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What energy transformation occurs when a plant performs photosynthesis?",
            "answerOptions": [
                { "text": "Chemical energy to light energy", "rationale": "This is the reverse of photosynthesis.", "isCorrect": false },
                { "text": "Light energy to chemical energy", "rationale": "Correct. Plants use sunlight (light energy) to convert carbon dioxide and water into glucose (chemical energy).", "isCorrect": true },
                { "text": "Thermal energy to chemical energy", "rationale": "While warmth is involved, the primary energy input is light.", "isCorrect": false },
                { "text": "Mechanical energy to light energy", "rationale": "Photosynthesis is a chemical process, not a mechanical one.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A ball is held at the top of a hill. This is an example of stored ________ energy.",
            "answerOptions": [
                { "text": "Kinetic", "rationale": "Kinetic energy is the energy of motion. The ball has it once it starts rolling.", "isCorrect": false },
                { "text": "Potential", "rationale": "Correct. Potential energy is stored energy due to an object's position or state. In this case, it's gravitational potential energy.", "isCorrect": true },
                { "text": "Electrical", "rationale": "Electrical energy involves the flow of electric charge.", "isCorrect": false },
                { "text": "Thermal", "rationale": "Thermal energy is related to heat.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "As the ball from the previous question rolls down the hill, what is the primary energy transformation?",
            "answerOptions": [
                { "text": "Kinetic energy to potential energy.", "rationale": "This would happen if the ball were rolling up a hill.", "isCorrect": false },
                { "text": "Potential energy to kinetic energy.", "rationale": "Correct. The stored energy of position (potential) is converted into the energy of motion (kinetic). Some energy is also lost as heat due to friction.", "isCorrect": true },
                { "text": "Chemical energy to kinetic energy.", "rationale": "The ball itself is not undergoing a chemical reaction.", "isCorrect": false },
                { "text": "Thermal energy to potential energy.", "rationale": "This transformation is not the primary one occurring.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A toaster is designed to convert electrical energy primarily into:",
            "answerOptions": [
                { "text": "Sound energy", "rationale": "A toaster might make a sound, but that is not its main purpose.", "isCorrect": false },
                { "text": "Light energy", "rationale": "The heating elements glow, but the primary function is to produce heat.", "isCorrect": false },
                { "text": "Thermal energy", "rationale": "Correct. A toaster uses electricity to generate heat to toast bread.", "isCorrect": true },
                { "text": "Mechanical energy", "rationale": "The mechanism that pops the toast up is a secondary function.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What energy transformation takes place in a hydroelectric dam?",
            "answerOptions": [
                { "text": "Chemical energy to electrical energy", "rationale": "No chemical reaction is the primary source of power.", "isCorrect": false },
                { "text": "Nuclear energy to mechanical energy", "rationale": "Hydroelectric power does not use nuclear reactions.", "isCorrect": false },
                { "text": "Potential energy to mechanical energy to electrical energy", "rationale": "Correct. Water stored at a height (potential) falls and turns a turbine (mechanical), which drives a generator to produce electricity (electrical).", "isCorrect": true },
                { "text": "Electrical energy to potential energy", "rationale": "This describes a process of pumping water up to a reservoir, not generating power from its fall.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "In any energy transformation, the total amount of energy in a closed system:",
            "answerOptions": [
                { "text": "Increases", "rationale": "This would violate the law of conservation of energy.", "isCorrect": false },
                { "text": "Decreases as some is lost", "rationale": "Energy is not 'lost' but is often converted into less useful forms like heat. The total amount remains the same.", "isCorrect": false },
                { "text": "Remains constant", "rationale": "Correct. It may change form, but the total quantity of energy is conserved.", "isCorrect": true },
                { "text": "Becomes zero", "rationale": "Energy is not eliminated.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Earth and Space Science",
    "id": "sci_earth_space_science_weather_climate_15",
    "title": "Earth & Space Science: Weather and Climate",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the primary source of energy for Earth's weather and climate?",
            "answerOptions": [
                { "text": "The Earth's core", "rationale": "The core's heat drives plate tectonics but has a minimal effect on surface weather.", "isCorrect": false },
                { "text": "The Sun", "rationale": "Correct. The sun's energy heats the Earth's surface and atmosphere unevenly, driving winds and ocean currents.", "isCorrect": true },
                { "text": "The Moon's gravity", "rationale": "The moon's gravity primarily causes ocean tides.", "isCorrect": false },
                { "text": "Human activities", "rationale": "Human activities can influence climate over the long term, but the sun is the primary energy source.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The long-term average of weather conditions in a region is known as its:",
            "answerOptions": [
                { "text": "Forecast", "rationale": "A forecast is a short-term prediction of weather.", "isCorrect": false },
                { "text": "Weather", "rationale": "Weather refers to the short-term, day-to-day atmospheric conditions.", "isCorrect": false },
                { "text": "Climate", "rationale": "Correct. Climate is the statistical summary of weather over long periods (typically 30 years or more).", "isCorrect": true },
                { "text": "Atmosphere", "rationale": "The atmosphere is the envelope of gases surrounding the Earth where weather and climate occur.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which of the following is a greenhouse gas that traps heat in the Earth's atmosphere?",
            "answerOptions": [
                { "text": "Oxygen", "rationale": "Oxygen is essential for respiration but is not a significant greenhouse gas.", "isCorrect": false },
                { "text": "Nitrogen", "rationale": "Nitrogen makes up about 78% of the atmosphere but does not effectively trap heat.", "isCorrect": false },
                { "text": "Argon", "rationale": "Argon is an inert gas and not a greenhouse gas.", "isCorrect": false },
                { "text": "Carbon Dioxide", "rationale": "Correct. Carbon dioxide, along with methane and water vapor, absorbs and re-radiates infrared radiation, warming the lower atmosphere.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A large body of air with relatively uniform temperature and humidity is called a(n):",
            "answerOptions": [
                { "text": "Front", "rationale": "A front is the boundary between two different air masses.", "isCorrect": false },
                { "text": "Air mass", "rationale": "Correct. Air masses are classified based on their source region (e.g., polar, tropical, continental, maritime).", "isCorrect": true },
                { "text": "Jet stream", "rationale": "A jet stream is a fast-flowing, narrow air current found in the atmosphere.", "isCorrect": false },
                { "text": "Cyclone", "rationale": "A cyclone is a large-scale system of winds rotating around a center of low atmospheric pressure.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "The Rain Shadow Effect is a common phenomenon in mountainous regions. As moist air from an ocean moves inland and is forced to rise over a mountain range, it cools. This cooling causes the moisture to condense and fall as precipitation (rain or snow) on the windward side (the side facing the wind) of the mountains. The air that descends on the leeward side (the downwind side) is now much drier.",
            "question": "What type of climate is typically found on the leeward side of a mountain range due to the rain shadow effect?",
            "answerOptions": [
                { "text": "Wet and tropical", "rationale": "This would be found on the windward side if the mountain is in the tropics.", "isCorrect": false },
                { "text": "Dry and arid or semi-arid", "rationale": "Correct. The air has lost most of its moisture on the other side of the mountain, often resulting in a desert or steppe climate.", "isCorrect": true },
                { "text": "Cold and polar", "rationale": "While mountains can be cold, the defining characteristic of the leeward side is dryness, not cold.", "isCorrect": false },
                { "text": "Mild and temperate, with consistent rainfall", "rationale": "This is the opposite of the conditions created by a rain shadow.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "The Rain Shadow Effect is a common phenomenon in mountainous regions. As moist air from an ocean moves inland and is forced to rise over a mountain range, it cools. This cooling causes the moisture to condense and fall as precipitation (rain or snow) on the windward side (the side facing the wind) of the mountains. The air that descends on the leeward side (the downwind side) is now much drier.",
            "question": "According to the passage, why does precipitation fall on the windward side of the mountains?",
            "answerOptions": [
                { "text": "The air warms up as it rises.", "rationale": "The passage states that the air cools as it rises.", "isCorrect": false },
                { "text": "The mountains are colder and freeze the air.", "rationale": "While temperature is a factor, the key process is cooling causing condensation.", "isCorrect": false },
                { "text": "The rising air cools, causing water vapor to condense into droplets.", "rationale": "Correct. This process of cooling and condensation is what forms clouds and leads to precipitation.", "isCorrect": true },
                { "text": "The wind pushes all the clouds to one side.", "rationale": "While wind moves the air, the cooling and condensation is the direct cause of precipitation.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which instrument is used to measure atmospheric pressure?",
            "answerOptions": [
                { "text": "Thermometer", "rationale": "A thermometer measures temperature.", "isCorrect": false },
                { "text": "Anemometer", "rationale": "An anemometer measures wind speed.", "isCorrect": false },
                { "text": "Hygrometer", "rationale": "A hygrometer measures humidity.", "isCorrect": false },
                { "text": "Barometer", "rationale": "Correct. A barometer measures air pressure, and changes can indicate an approaching weather front.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A cold front often brings what kind of weather?",
            "answerOptions": [
                { "text": "Light, steady rain for several days.", "rationale": "This is more characteristic of a warm front.", "isCorrect": false },
                { "text": "Clear skies and calm conditions.", "rationale": "This is often the weather that follows a cold front, but not what the front itself brings.", "isCorrect": false },
                { "text": "Thunderstorms, heavy rain, and a drop in temperature.", "rationale": "Correct. Cold, dense air forces warm, moist air to rise rapidly, creating intense weather conditions.", "isCorrect": true },
                { "text": "Fog and drizzle.", "rationale": "This can occur with various conditions but is not the hallmark of a cold front.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Earth's seasons are caused by:",
            "answerOptions": [
                { "text": "The changing distance between the Earth and the Sun.", "rationale": "Earth's orbit is slightly elliptical, but this distance change is not the primary cause of seasons.", "isCorrect": false },
                { "text": "The tilt of Earth's axis of rotation relative to its orbit around the Sun.", "rationale": "Correct. The 23.5-degree tilt means that different hemispheres receive more direct solar radiation at different times of the year.", "isCorrect": true },
                { "text": "The cycles of solar flares on the Sun's surface.", "rationale": "Solar activity can affect space weather but does not cause the regular, predictable seasons on Earth.", "isCorrect": false },
                { "text": "The speed of the Earth's rotation on its axis.", "rationale": "The speed of rotation determines the length of a day, not the seasons.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The process by which water vapor in the air turns into liquid water is called:",
            "answerOptions": [
                { "text": "Evaporation", "rationale": "Evaporation is the process of liquid turning into gas.", "isCorrect": false },
                { "text": "Condensation", "rationale": "Correct. This is how clouds are formed.", "isCorrect": true },
                { "text": "Precipitation", "rationale": "Precipitation is water falling from the atmosphere (e.g., rain, snow).", "isCorrect": false },
                { "text": "Transpiration", "rationale": "Transpiration is the release of water vapor from plants.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "How do ocean currents affect climate?",
            "answerOptions": [
                { "text": "They have no effect on climate.", "rationale": "Ocean currents are a major driver of climate.", "isCorrect": false },
                { "text": "They only affect the weather directly above the water.", "rationale": "Their influence extends far inland.", "isCorrect": false },
                { "text": "By transporting heat from the equator towards the poles.", "rationale": "Correct. Currents like the Gulf Stream carry warm water to higher latitudes, significantly warming the climates of nearby landmasses.", "isCorrect": true },
                { "text": "By causing the Earth's seasons.", "rationale": "Seasons are caused by the Earth's tilt.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Which of these is the best description of the 'Greenhouse Effect'?",
            "answerOptions": [
                { "text": "A process that cools the Earth by reflecting sunlight.", "rationale": "This is related to albedo, not the greenhouse effect.", "isCorrect": false },
                { "text": "The trapping of heat by certain gases in the atmosphere, which keeps the planet warm.", "rationale": "Correct. It's a natural and necessary process for life, but has been enhanced by human activity.", "isCorrect": true },
                { "text": "The depletion of the ozone layer by industrial chemicals.", "rationale": "Ozone depletion is a separate environmental issue, though related to atmospheric chemistry.", "isCorrect": false },
                { "text": "The seasonal change in the color of plants.", "rationale": "This is a biological process.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Life Science",
    "id": "sci_life_science_human_body_systems_16",
    "title": "Life Science: Human Body Systems",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which body system is primarily responsible for breaking down food into nutrients the body can absorb?",
            "answerOptions": [
                { "text": "Circulatory System", "rationale": "The circulatory system transports nutrients, but does not break down food.", "isCorrect": false },
                { "text": "Respiratory System", "rationale": "The respiratory system is responsible for gas exchange (oxygen and carbon dioxide).", "isCorrect": false },
                { "text": "Digestive System", "rationale": "Correct. The digestive system, including the stomach and intestines, digests food and absorbs nutrients.", "isCorrect": true },
                { "text": "Nervous System", "rationale": "The nervous system is the body's command and communication center.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The main organs of the respiratory system, where gas exchange occurs, are the:",
            "answerOptions": [
                { "text": "Kidneys", "rationale": "The kidneys are part of the urinary system and filter waste from blood.", "isCorrect": false },
                { "text": "Lungs", "rationale": "Correct. In the lungs, oxygen enters the blood and carbon dioxide is removed.", "isCorrect": true },
                { "text": "Intestines", "rationale": "The intestines are part of the digestive system.", "isCorrect": false },
                { "text": "Brain", "rationale": "The brain is the control center of the nervous system.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which two body systems work together to deliver oxygen to cells and remove carbon dioxide?",
            "answerOptions": [
                { "text": "Digestive and Nervous", "rationale": "These systems have different primary functions.", "isCorrect": false },
                { "text": "Skeletal and Muscular", "rationale": "These systems work together for movement and support.", "isCorrect": false },
                { "text": "Respiratory and Circulatory", "rationale": "Correct. The respiratory system takes in oxygen, and the circulatory system (blood) transports it to the cells and carries away waste CO2.", "isCorrect": true },
                { "text": "Endocrine and Urinary", "rationale": "The endocrine system produces hormones, and the urinary system removes waste.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Hormones, which act as chemical messengers in the body, are produced by the:",
            "answerOptions": [
                { "text": "Nervous System", "rationale": "The nervous system uses electrical signals, not hormones, for fast communication.", "isCorrect": false },
                { "text": "Endocrine System", "rationale": "Correct. Glands of the endocrine system, like the thyroid and pituitary, produce and secrete hormones.", "isCorrect": true },
                { "text": "Skeletal System", "rationale": "The skeletal system provides structure and produces blood cells.", "isCorrect": false },
                { "text": "Integumentary System", "rationale": "The integumentary system consists of the skin, hair, and nails.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "Homeostasis is the body's ability to maintain a stable internal environment despite changes in external conditions. For example, when body temperature rises, the nervous system signals sweat glands in the skin to release sweat, which cools the body as it evaporates. Blood vessels in the skin also dilate (widen) to release heat.",
            "question": "Based on the passage, which action is a homeostatic response to the body becoming too cold?",
            "answerOptions": [
                { "text": "Blood vessels dilating", "rationale": "This action releases heat and would make the body colder.", "isCorrect": false },
                { "text": "Sweat glands activating", "rationale": "Sweating cools the body, which is the opposite of the needed response.", "isCorrect": false },
                { "text": "Muscles contracting rapidly (shivering)", "rationale": "Correct. Shivering generates heat, which is a mechanism to raise body temperature back to normal.", "isCorrect": true },
                { "text": "Increasing the breathing rate", "rationale": "While breathing rate changes for other reasons (like exercise), it is not the primary response to cold.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "Homeostasis is the body's ability to maintain a stable internal environment despite changes in external conditions. For example, when body temperature rises, the nervous system signals sweat glands in the skin to release sweat, which cools the body as it evaporates. Blood vessels in the skin also dilate (widen) to release heat.",
            "question": "The passage describes the interaction between which body systems to maintain temperature homeostasis?",
            "answerOptions": [
                { "text": "Nervous and Integumentary (skin)", "rationale": "Correct. The nervous system detects the temperature change and sends signals to effectors in the skin (sweat glands, blood vessels).", "isCorrect": true },
                { "text": "Respiratory and Digestive", "rationale": "These systems are not the primary ones described in the passage for temperature regulation.", "isCorrect": false },
                { "text": "Skeletal and Endocrine", "rationale": "The passage does not mention the roles of the skeleton or hormones in this specific example.", "isCorrect": false },
                { "text": "Circulatory and Urinary", "rationale": "While blood vessels (circulatory) are mentioned, the urinary system is not part of this described process.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "What is the primary function of the skeletal system?",
            "answerOptions": [
                { "text": "To send signals throughout the body.", "rationale": "This is the function of the nervous system.", "isCorrect": false },
                { "text": "To provide a framework of support and to protect internal organs.", "rationale": "Correct. The skeleton gives the body its shape and protects organs like the brain (skull) and heart (rib cage).", "isCorrect": true },
                { "text": "To break down and absorb food.", "rationale": "This is the function of the digestive system.", "isCorrect": false },
                { "text": "To transport oxygen and nutrients.", "rationale": "This is the function of the circulatory system.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The central nervous system is composed of the:",
            "answerOptions": [
                { "text": "Heart and blood vessels", "rationale": "This is the core of the circulatory system.", "isCorrect": false },
                { "text": "Lungs and diaphragm", "rationale": "These are key components of the respiratory system.", "isCorrect": false },
                { "text": "Brain and spinal cord", "rationale": "Correct. This is the body's main processing center, while the peripheral nervous system consists of the nerves that connect it to the rest of the body.", "isCorrect": true },
                { "text": "Kidneys and bladder", "rationale": "These are organs of the urinary system.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Antibodies, which are key components of the adaptive immune response, are produced by:",
            "answerOptions": [
                { "text": "Red blood cells", "rationale": "Red blood cells are responsible for oxygen transport.", "isCorrect": false },
                { "text": "Certain types of white blood cells (B-cells).", "rationale": "Correct. When B-cells (a type of lymphocyte) are activated by a pathogen, they can differentiate into plasma cells that produce large quantities of antibodies.", "isCorrect": true },
                { "text": "Platelets", "rationale": "Platelets are cell fragments involved in blood clotting.", "isCorrect": false },
                { "text": "Neurons", "rationale": "Neurons are the functional cells of the nervous system.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The muscular system is responsible for:",
            "answerOptions": [
                { "text": "Producing hormones.", "rationale": "This is the role of the endocrine system.", "isCorrect": false },
                { "text": "Filtering waste from the blood.", "rationale": "This is the role of the urinary system.", "isCorrect": false },
                { "text": "Movement, posture, and generating heat.", "rationale": "Correct. Muscles contract to produce movement, maintain posture, and generate heat through metabolic activity.", "isCorrect": true },
                { "text": "Exchanging gases with the environment.", "rationale": "This is the role of the respiratory system.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which system filters waste products from the blood and regulates water balance?",
            "answerOptions": [
                { "text": "Digestive System", "rationale": "The digestive system eliminates solid waste, but doesn't filter blood.", "isCorrect": false },
                { "text": "Urinary System", "rationale": "Correct. The kidneys, part of the urinary system, perform this crucial filtering and balancing function.", "isCorrect": true },
                { "text": "Lymphatic System", "rationale": "The lymphatic system is part of the immune system and also returns fluid to the circulatory system.", "isCorrect": false },
                { "text": "Endocrine System", "rationale": "The endocrine system regulates processes using hormones, but does not filter blood.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The heart is the central organ of which body system?",
            "answerOptions": [
                { "text": "Circulatory System", "rationale": "Correct. The heart pumps blood through the vessels of the circulatory system to transport substances throughout the body.", "isCorrect": true },
                { "text": "Nervous System", "rationale": "The brain is the central organ of the nervous system.", "isCorrect": false },
                { "text": "Respiratory System", "rationale": "The lungs are the central organs of the respiratory system.", "isCorrect": false },
                { "text": "Digestive System", "rationale": "The stomach and intestines are central organs of the digestive system.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Physical Science",
    "id": "sci_physical_science_chemical_reactions_17",
    "title": "Physical Science: Chemical Reactions",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which of the following is a sign that a chemical reaction has occurred?",
            "answerOptions": [
                { "text": "A substance dissolves.", "rationale": "Dissolving, like salt in water, is a physical change.", "isCorrect": false },
                { "text": "A substance changes state (e.g., melts).", "rationale": "Changing state is a physical change.", "isCorrect": false },
                { "text": "A new substance with different properties is formed.", "rationale": "Correct. The formation of a new substance is the definition of a chemical change.", "isCorrect": true },
                { "text": "A substance is mixed with another.", "rationale": "Creating a mixture is a physical change unless the substances react.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "In the chemical equation 2H₂ + O₂ → 2H₂O, the substances on the left side (H₂ and O₂) are called:",
            "answerOptions": [
                { "text": "Products", "rationale": "Products are the substances formed, shown on the right side.", "isCorrect": false },
                { "text": "Reactants", "rationale": "Correct. Reactants are the starting materials in a chemical reaction.", "isCorrect": true },
                { "text": "Coefficients", "rationale": "Coefficients are the numbers in front of the formulas (like the '2's).", "isCorrect": false },
                { "text": "Subscripts", "rationale": "Subscripts are the small numbers within a formula (like the '2' in H₂).", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The law of conservation of mass states that in a chemical reaction, mass is:",
            "answerOptions": [
                { "text": "Lost", "rationale": "Mass is not lost, but atoms are rearranged.", "isCorrect": false },
                { "text": "Gained", "rationale": "Mass is not gained; all atoms are accounted for.", "isCorrect": false },
                { "text": "Neither lost nor gained", "rationale": "Correct. The total mass of the reactants must equal the total mass of the products.", "isCorrect": true },
                { "text": "Sometimes lost, sometimes gained", "rationale": "The law is constant for all chemical reactions.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A reaction that releases energy, usually in the form of heat, is called:",
            "answerOptions": [
                { "text": "Endothermic", "rationale": "An endothermic reaction absorbs energy.", "isCorrect": false },
                { "text": "Exothermic", "rationale": "Correct. 'Exo-' means 'out,' and 'therm' refers to heat. Burning wood is a classic example.", "isCorrect": true },
                { "text": "Synthesis", "rationale": "Synthesis is a type of reaction, but it can be either exothermic or endothermic.", "isCorrect": false },
                { "text": "Decomposition", "rationale": "Decomposition is a type of reaction, but it can be either exothermic or endothermic.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A student adds a white crystalline powder (baking soda) to a clear liquid (vinegar) in a beaker. The mixture immediately begins to bubble and fizz vigorously, and the beaker feels cold to the touch. After a few minutes, the bubbling stops.",
            "question": "The fact that the beaker feels cold indicates that the reaction is:",
            "answerOptions": [
                { "text": "Exothermic, releasing heat.", "rationale": "An exothermic reaction would make the beaker feel warm or hot.", "isCorrect": false },
                { "text": "A physical change, not a chemical one.", "rationale": "The formation of a gas (bubbling) is strong evidence of a chemical change.", "isCorrect": false },
                { "text": "Endothermic, absorbing heat from the surroundings.", "rationale": "Correct. The reaction draws thermal energy from the beaker and the liquid, causing them to feel cold.", "isCorrect": true },
                { "text": "A combustion reaction.", "rationale": "Combustion is a type of exothermic reaction that produces heat and light.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "A student adds a white crystalline powder (baking soda) to a clear liquid (vinegar) in a beaker. The mixture immediately begins to bubble and fizz vigorously, and the beaker feels cold to the touch. After a few minutes, the bubbling stops.",
            "question": "What evidence from the description suggests that a new substance (a gas) was formed?",
            "answerOptions": [
                { "text": "The beaker feels cold.", "rationale": "This indicates an energy change, which is a sign of a reaction, but the bubbling is the direct evidence for gas formation.", "isCorrect": false },
                { "text": "The mixture bubbles and fizzes.", "rationale": "Correct. The formation of gas bubbles in a liquid is a classic sign of a chemical reaction producing a gaseous product (in this case, carbon dioxide).", "isCorrect": true },
                { "text": "A white powder was added to a clear liquid.", "rationale": "This describes the reactants before the reaction occurred.", "isCorrect": false },
                { "text": "The bubbling stops after a few minutes.", "rationale": "This indicates the reaction is complete, not that a gas was formed.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Rust forming on an iron nail is an example of a chemical change called:",
            "answerOptions": [
                { "text": "Combustion", "rationale": "Combustion is rapid reaction with oxygen to produce heat and light.", "isCorrect": false },
                { "text": "Neutralization", "rationale": "Neutralization is a reaction between an acid and a base.", "isCorrect": false },
                { "text": "Oxidation", "rationale": "Correct. Rusting is the slow oxidation of iron, where it reacts with oxygen in the presence of water.", "isCorrect": true },
                { "text": "Precipitation", "rationale": "Precipitation is the formation of a solid from a solution.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What does a catalyst do in a chemical reaction?",
            "answerOptions": [
                { "text": "It becomes one of the main products.", "rationale": "A catalyst is not consumed in the reaction.", "isCorrect": false },
                { "text": "It stops the reaction from happening.", "rationale": "An inhibitor stops or slows a reaction; a catalyst speeds it up.", "isCorrect": false },
                { "text": "It increases the rate of the reaction without being used up.", "rationale": "Correct. Catalysts, like enzymes in our bodies, provide an alternative pathway for the reaction that requires less energy.", "isCorrect": true },
                { "text": "It increases the total mass of the products.", "rationale": "This would violate the law of conservation of mass.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Which of the following would likely increase the rate of a chemical reaction between a solid and a liquid?",
            "answerOptions": [
                { "text": "Cooling the liquid.", "rationale": "Lowering the temperature generally slows down reaction rates.", "isCorrect": false },
                { "text": "Using a single, large piece of the solid.", "rationale": "This decreases the surface area available for the reaction.", "isCorrect": false },
                { "text": "Grinding the solid into a fine powder.", "rationale": "Correct. This increases the surface area of the solid, allowing more particles to be in contact with the liquid at once, which speeds up the reaction.", "isCorrect": true },
                { "text": "Stopping any stirring or agitation.", "rationale": "Stirring increases the contact between reactants and speeds up the reaction.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A reaction in which two or more simple substances combine to form a more complex product is a _________ reaction.",
            "answerOptions": [
                { "text": "Decomposition", "rationale": "Decomposition is when a complex substance breaks down into simpler ones.", "isCorrect": false },
                { "text": "Synthesis", "rationale": "Correct. Synthesis means 'to make' or 'to build'. For example, 2H₂ + O₂ → 2H₂O.", "isCorrect": true },
                { "text": "Single displacement", "rationale": "In single displacement, one element replaces another in a compound.", "isCorrect": false },
                { "text": "Double displacement", "rationale": "In double displacement, parts of two compounds switch places.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "What is the pH of a neutral solution, such as pure water?",
            "answerOptions": [
                { "text": "Less than 7", "rationale": "Solutions with a pH less than 7 are acidic.", "isCorrect": false },
                { "text": "Exactly 7", "rationale": "Correct. The pH scale ranges from 0 (very acidic) to 14 (very basic/alkaline), with 7 being neutral.", "isCorrect": true },
                { "text": "Greater than 7", "rationale": "Solutions with a pH greater than 7 are basic or alkaline.", "isCorrect": false },
                { "text": "Exactly 0", "rationale": "A pH of 0 indicates a very strong acid.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "When an acid and a base react, they typically form:",
            "answerOptions": [
                { "text": "A stronger acid and a stronger base.", "rationale": "The reaction moves towards neutrality.", "isCorrect": false },
                { "text": "A salt and water.", "rationale": "Correct. This is a neutralization reaction. For example, HCl (acid) + NaOH (base) → NaCl (a salt) + H₂O (water).", "isCorrect": true },
                { "text": "Only a gas.", "rationale": "While some acid-base reactions can produce a gas, the primary products are a salt and water.", "isCorrect": false },
                { "text": "Two new acids.", "rationale": "The products are a neutral salt and water.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Scientific Practices",
    "id": "sci_scientific_practices_data_interpretation_18",
    "title": "Scientific Practices: Data Interpretation",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "When analyzing data from an experiment, what is the first step?",
            "answerOptions": [
                { "text": "Forming a conclusion immediately.", "rationale": "A conclusion must be based on careful analysis of the data.", "isCorrect": false },
                { "text": "Organizing the data into tables or graphs.", "rationale": "Correct. This makes the data easier to read and helps to identify patterns or trends.", "isCorrect": true },
                { "text": "Changing the hypothesis to fit the data.", "rationale": "The hypothesis should be tested by the data, not changed to fit it.", "isCorrect": false },
                { "text": "Repeating the experiment.", "rationale": "Repetition is important for validity, but it is not the first step in analyzing the data you have.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The variable that is intentionally changed by the experimenter is plotted on which axis of a graph?",
            "answerOptions": [
                { "text": "The y-axis (vertical)", "rationale": "The y-axis is used for the dependent variable, the one that is measured.", "isCorrect": false },
                { "text": "The x-axis (horizontal)", "rationale": "Correct. The independent variable is traditionally plotted on the x-axis.", "isCorrect": true },
                { "text": "Either axis is acceptable.", "rationale": "There is a standard convention for plotting variables to make graphs easy to interpret.", "isCorrect": false },
                { "text": "A third, z-axis.", "rationale": "A z-axis is used for three-dimensional graphs, which are less common in basic data presentation.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "Data Table: The effect of fertilizer on plant height. Plant A (no fertilizer): Week 1 - 5cm, Week 2 - 7cm, Week 3 - 9cm. Plant B (with fertilizer): Week 1 - 6cm, Week 2 - 10cm, Week 3 - 14cm.",
            "question": "Based on the data, what is a reasonable conclusion?",
            "answerOptions": [
                { "text": "Fertilizer has no effect on plant growth.", "rationale": "The data shows a clear difference in growth between the two plants.", "isCorrect": false },
                { "text": "The fertilizer appears to increase the rate of plant growth.", "rationale": "Correct. Plant B grew a total of 8cm in the period, while Plant A only grew 4cm.", "isCorrect": true },
                { "text": "Plant A grew taller than Plant B.", "rationale": "The data shows Plant B was taller by Week 3.", "isCorrect": false },
                { "text": "Both plants stopped growing in Week 3.", "rationale": "Both plants grew between Week 2 and Week 3.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "Data Table: The effect of fertilizer on plant height. Plant A (no fertilizer): Week 1 - 5cm, Week 2 - 7cm, Week 3 - 9cm. Plant B (with fertilizer): Week 1 - 6cm, Week 2 - 10cm, Week 3 - 14cm.",
            "question": "In this experiment, what is the dependent variable?",
            "answerOptions": [
                { "text": "The amount of fertilizer.", "rationale": "This is the independent variable, the factor that was changed.", "isCorrect": false },
                { "text": "The plant height.", "rationale": "Correct. The height is what was measured to see the effect of the fertilizer.", "isCorrect": true },
                { "text": "The week of measurement.", "rationale": "Time is an independent variable that is part of the experimental setup.", "isCorrect": false },
                { "text": "The type of plant.", "rationale": "This should be a controlled variable, with both plants being the same type.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A graph shows the population of a species of fish in a lake over a 10-year period. The line on the graph starts at 500 fish, rises to a peak of 2000 fish at year 5, and then declines to 800 fish by year 10.",
            "question": "What can be inferred from the graph?",
            "answerOptions": [
                { "text": "The fish population grew steadily for 10 years.", "rationale": "The population declined after year 5.", "isCorrect": false },
                { "text": "The lake's environment could not support more than 2000 fish.", "rationale": "Correct. The peak at 2000, followed by a decline, suggests the population exceeded the lake's carrying capacity, leading to a die-off due to limited resources or other factors.", "isCorrect": true },
                { "text": "The fish stopped reproducing after year 5.", "rationale": "A decline doesn't mean reproduction stopped entirely; it means the death rate exceeded the birth rate.", "isCorrect": false },
                { "text": "More fish were added to the lake at year 5.", "rationale": "This is not supported by the data, which shows a natural peak and decline.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "A graph shows the population of a species of fish in a lake over a 10-year period. The line on the graph starts at 500 fish, rises to a peak of 2000 fish at year 5, and then declines to 800 fish by year 10.",
            "question": "During which period was the population growth rate the fastest?",
            "answerOptions": [
                { "text": "Between year 0 and year 5.", "rationale": "Correct. This is the period where the population showed a significant increase, indicating the growth rate was highest.", "isCorrect": true },
                { "text": "Between year 5 and year 10.", "rationale": "The population was declining in this period, so the growth rate was negative.", "isCorrect": false },
                { "text": "At year 5.", "rationale": "At the peak, the growth rate is momentarily zero as the population stops increasing and starts decreasing.", "isCorrect": false },
                { "text": "The growth rate was constant.", "rationale": "The line is a curve, not a straight line, and it changes direction, so the rate was not constant.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A statement that summarizes the results of an experiment and states whether the hypothesis was supported is a(n):",
            "answerOptions": [
                { "text": "Question", "rationale": "The question is what the experiment aims to answer.", "isCorrect": false },
                { "text": "Procedure", "rationale": "The procedure is the set of steps taken during the experiment.", "isCorrect": false },
                { "text": "Conclusion", "rationale": "Correct. The conclusion is the final summary and interpretation of the results.", "isCorrect": true },
                { "text": "Observation", "rationale": "An observation is a piece of data collected, not the final summary.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "If an experiment's results do not support the hypothesis, what is the most appropriate next step for a scientist?",
            "answerOptions": [
                { "text": "Change the results to match the hypothesis.", "rationale": "This is scientific fraud.", "isCorrect": false },
                { "text": "Discard the results and pretend the experiment never happened.", "rationale": "Unexpected results are still valuable data.", "isCorrect": false },
                { "text": "Revise the hypothesis or design a new experiment.", "rationale": "Correct. Science is a process of refining ideas based on evidence. An unsupported hypothesis leads to new questions and new investigations.", "isCorrect": true },
                { "text": "Conclude that the experiment was a complete failure.", "rationale": "An experiment that provides clear data is not a failure, even if it refutes the hypothesis.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Making a prediction about a data point that lies between existing, measured data points is called:",
            "answerOptions": [
                { "text": "Extrapolation", "rationale": "Extrapolation is predicting a value outside the range of the measured data.", "isCorrect": false },
                { "text": "Interpolation", "rationale": "Correct. 'Inter-' means 'between.' Interpolation is estimating a value between two known values.", "isCorrect": true },
                { "text": "Conclusion", "rationale": "A conclusion is a summary, not a specific prediction.", "isCorrect": false },
                { "text": "Hypothesis", "rationale": "A hypothesis is a broad prediction for the whole experiment, not a specific data point.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Which type of graph is best suited for showing percentages or parts of a whole?",
            "answerOptions": [
                { "text": "Line graph", "rationale": "Line graphs are best for showing changes over time.", "isCorrect": false },
                { "text": "Bar graph", "rationale": "Bar graphs are best for comparing quantities among different categories.", "isCorrect": false },
                { "text": "Pie chart", "rationale": "Correct. A pie chart visually represents proportions of a total.", "isCorrect": true },
                { "text": "Scatter plot", "rationale": "Scatter plots are used to show the relationship between two different variables.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "An unexpected result or a data point that lies far outside the main trend of the data is called a(n):",
            "answerOptions": [
                { "text": "Variable", "rationale": "A variable is a factor being tested or measured.", "isCorrect": false },
                { "text": "Outlier", "rationale": "Correct. An outlier is a data point that is significantly different from other observations and may be due to experimental error.", "isCorrect": true },
                { "text": "Control", "rationale": "The control is the standard of comparison in an experiment.", "isCorrect": false },
                { "text": "Constant", "rationale": "A constant is a factor that is kept the same throughout the experiment.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "A scientist claims their new drug is effective. What would be the strongest evidence to support this claim?",
            "answerOptions": [
                { "text": "A testimonial from one person who felt better after taking the drug.", "rationale": "This is anecdotal evidence and is not scientifically reliable.", "isCorrect": false },
                { "text": "A study showing that 10% of users felt better.", "rationale": "This is a weak effect and could be due to chance.", "isCorrect": false },
                { "text": "Data from a large, controlled study showing a statistically significant improvement compared to a placebo.", "rationale": "Correct. This type of study is the gold standard for scientific evidence because it is large, has a comparison group (control), and uses statistical analysis to rule out chance.", "isCorrect": true },
                { "text": "A detailed explanation of how the drug is supposed to work.", "rationale": "A plausible mechanism is good, but it is not evidence that the drug actually works in practice.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Earth and Space Science",
    "id": "sci_earth_space_science_ecosystems_19",
    "title": "Earth & Space Science: Ecosystems",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "All the living and nonliving things interacting in a particular area form a(n):",
            "answerOptions": [
                { "text": "Population", "rationale": "A population is a group of individuals of the same species.", "isCorrect": false },
                { "text": "Community", "rationale": "A community consists of all the different living populations in an area.", "isCorrect": false },
                { "text": "Ecosystem", "rationale": "Correct. An ecosystem includes the community (biotic, or living, factors) and the physical environment (abiotic, or nonliving, factors).", "isCorrect": true },
                { "text": "Biosphere", "rationale": "The biosphere is the part of Earth where life exists.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Organisms that make their own food, usually through photosynthesis, are called:",
            "answerOptions": [
                { "text": "Consumers", "rationale": "Consumers get energy by eating other organisms.", "isCorrect": false },
                { "text": "Decomposers", "rationale": "Decomposers break down dead organic matter.", "isCorrect": false },
                { "text": "Producers", "rationale": "Correct. Plants, algae, and some bacteria are producers and form the base of most food webs.", "isCorrect": true },
                { "text": "Herbivores", "rationale": "Herbivores are a type of consumer that eats plants.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "In a food chain, which organism would be a primary consumer?",
            "answerOptions": [
                { "text": "A lion that eats a zebra.", "rationale": "The lion is a secondary or tertiary consumer.", "isCorrect": false },
                { "text": "A rabbit that eats grass.", "rationale": "Correct. Primary consumers are herbivores that feed directly on producers (grass).", "isCorrect": true },
                { "text": "A mushroom that breaks down a dead log.", "rationale": "The mushroom is a decomposer.", "isCorrect": false },
                { "text": "An oak tree.", "rationale": "The oak tree is a producer.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The nonliving components of an ecosystem, such as sunlight, temperature, and water, are called:",
            "answerOptions": [
                { "text": "Biotic factors", "rationale": "'Bio-' refers to life.", "isCorrect": false },
                { "text": "Abiotic factors", "rationale": "Correct. 'A-' means 'not,' so abiotic means not living.", "isCorrect": true },
                { "text": "Community factors", "rationale": "A community refers only to the living organisms.", "isCorrect": false },
                { "text": "Limiting factors", "rationale": "While abiotic factors can be limiting factors, this is the more general term.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "In a forest ecosystem, wolves were hunted to extinction. This led to a dramatic increase in the deer population. The large number of deer overgrazed the vegetation, eating most of the young saplings. This lack of young trees caused a decline in the population of songbirds that nested in them.",
            "question": "This passage is an example of:",
            "answerOptions": [
                { "text": "A stable ecosystem in equilibrium.", "rationale": "The removal of a key species destabilized the ecosystem.", "isCorrect": false },
                { "text": "A trophic cascade, where the removal of a top predator has effects down the food web.", "rationale": "Correct. Removing the wolves (predator) directly affected the deer (herbivore), which in turn affected the trees (producer) and the birds.", "isCorrect": true },
                { "text": "Primary succession.", "rationale": "Primary succession is the development of an ecosystem in a previously lifeless area.", "isCorrect": false },
                { "text": "The flow of energy from producers to consumers.", "rationale": "While it involves energy flow, the key concept illustrated is the disruption of the food web.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "In a forest ecosystem, wolves were hunted to extinction. This led to a dramatic increase in the deer population. The large number of deer overgrazed the vegetation, eating most of the young saplings. This lack of young trees caused a decline in the population of songbirds that nested in them.",
            "question": "In this ecosystem, what was the role of the wolf?",
            "answerOptions": [
                { "text": "Producer", "rationale": "Wolves do not produce their own food.", "isCorrect": false },
                { "text": "Keystone species", "rationale": "Correct. A keystone species is one that has a disproportionately large effect on its environment relative to its abundance. The wolf's removal caused major changes, indicating its keystone role.", "isCorrect": true },
                { "text": "Decomposer", "rationale": "Decomposers break down dead material.", "isCorrect": false },
                { "text": "Primary consumer", "rationale": "Wolves are carnivores, not herbivores.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The process by which bacteria and fungi break down dead organisms and return nutrients to the soil is called:",
            "answerOptions": [
                { "text": "Photosynthesis", "rationale": "Photosynthesis is how producers make food.", "isCorrect": false },
                { "text": "Respiration", "rationale": "Respiration is the process of releasing energy from food.", "isCorrect": false },
                { "text": "Decomposition", "rationale": "Correct. This is the vital role of decomposers in recycling nutrients.", "isCorrect": true },
                { "text": "Consumption", "rationale": "Consumption is the act of eating other organisms.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A relationship between two species where one benefits and the other is neither harmed nor helped is called:",
            "answerOptions": [
                { "text": "Mutualism", "rationale": "In mutualism, both species benefit.", "isCorrect": false },
                { "text": "Parasitism", "rationale": "In parasitism, one species benefits and the other is harmed.", "isCorrect": false },
                { "text": "Commensalism", "rationale": "Correct. An example is a bird building a nest in a tree; the bird benefits, and the tree is unaffected.", "isCorrect": true },
                { "text": "Predation", "rationale": "In predation, one species (the predator) hunts and kills the other (the prey).", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Approximately how much energy is transferred from one trophic level to the next in an ecosystem?",
            "answerOptions": [
                { "text": "100%", "rationale": "A large amount of energy is lost at each level.", "isCorrect": false },
                { "text": "90%", "rationale": "This is the amount of energy that is typically lost, not transferred.", "isCorrect": false },
                { "text": "50%", "rationale": "The energy transfer is much less efficient than this.", "isCorrect": false },
                { "text": "10%", "rationale": "Correct. About 90% of the energy is lost as heat or used for metabolic processes at each level, so only about 10% is available to the next level.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The natural home or environment of an animal, plant, or other organism is its:",
            "answerOptions": [
                { "text": "Niche", "rationale": "A niche is the role an organism plays in its environment.", "isCorrect": false },
                { "text": "Habitat", "rationale": "Correct. A habitat provides the organism with food, water, shelter, and space.", "isCorrect": true },
                { "text": "Community", "rationale": "A community is all the different populations in an area.", "isCorrect": false },
                { "text": "Trophic level", "rationale": "A trophic level is the position an organism occupies in a food chain.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Which of the following is a major reservoir for carbon in the carbon cycle?",
            "answerOptions": [
                { "text": "The atmosphere, oceans, and fossil fuels", "rationale": "Correct. Carbon is stored in the atmosphere as CO2, dissolved in the oceans, and locked underground in fossil fuels.", "isCorrect": true },
                { "text": "Only in living organisms", "rationale": "Living organisms are part of the cycle, but not the largest reservoirs.", "isCorrect": false },
                { "text": "Rocks and soil only", "rationale": "While rocks and soil contain carbon, the atmosphere and oceans are also major reservoirs.", "isCorrect": false },
                { "text": "In the Earth's core", "rationale": "The carbon cycle involves the surface, atmosphere, and oceans.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Competition is most intense between:",
            "answerOptions": [
                { "text": "Two different species in different ecosystems.", "rationale": "These organisms do not interact.", "isCorrect": false },
                { "text": "A predator and its prey.", "rationale": "This is a predator-prey relationship, not competition.", "isCorrect": false },
                { "text": "Members of the same species in the same area.", "rationale": "Correct. Individuals of the same species have the most similar needs for resources like food, water, and mates, leading to the most intense competition.", "isCorrect": true },
                { "text": "Producers and decomposers.", "rationale": "These organisms occupy different trophic levels and do not compete for the same resources.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Life Science",
    "id": "sci_life_science_genetics_heredity_20",
    "title": "Life Science: Genetics and Heredity",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known organisms is:",
            "answerOptions": [
                { "text": "RNA (Ribonucleic acid)", "rationale": "RNA is crucial for carrying out the instructions, but DNA holds the original blueprint.", "isCorrect": false },
                { "text": "A protein", "rationale": "Proteins are the functional products, built using instructions from DNA.", "isCorrect": false },
                { "text": "An amino acid", "rationale": "Amino acids are the building blocks of proteins.", "isCorrect": false },
                { "text": "DNA (Deoxyribonucleic acid)", "rationale": "Correct. DNA is the fundamental hereditary material in nearly all living things.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A specific sequence of DNA that codes for a functional product, such as a protein, is called a:",
            "answerOptions": [
                { "text": "Chromosome", "rationale": "A chromosome is a large structure made of tightly coiled DNA.", "isCorrect": false },
                { "text": "Gene", "rationale": "Correct. A gene is a distinct unit of heredity and a sequence of nucleotides in DNA.", "isCorrect": true },
                { "text": "Nucleus", "rationale": "The nucleus is the organelle where DNA is stored in eukaryotic cells.", "isCorrect": false },
                { "text": "Allele", "rationale": "An allele is a specific version or variant of a gene.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The observable physical properties of an organism, such as its appearance or behavior, are called its:",
            "answerOptions": [
                { "text": "Genotype", "rationale": "The genotype is the set of genes an organism carries.", "isCorrect": false },
                { "text": "Phenotype", "rationale": "Correct. The phenotype is the composite of an organism's observable characteristics, resulting from the interaction of its genotype with the environment.", "isCorrect": true },
                { "text": "Allele", "rationale": "An allele is a variant form of a gene.", "isCorrect": false },
                { "text": "Genome", "rationale": "The genome is the complete set of genetic instructions for an organism.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "If an individual has two different alleles for a particular gene, they are said to be:",
            "answerOptions": [
                { "text": "Homozygous", "rationale": "Homozygous means having two identical alleles for a gene (e.g., TT or tt).", "isCorrect": false },
                { "text": "Recessive", "rationale": "A recessive allele is one that is masked by a dominant allele.", "isCorrect": false },
                { "text": "Dominant", "rationale": "A dominant allele is one that expresses its trait over another allele.", "isCorrect": false },
                { "text": "Heterozygous", "rationale": "Correct. 'Hetero-' means 'different,' so heterozygous means having two different alleles (e.g., Tt).", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "In pea plants, the allele for tallness (T) is dominant over the allele for shortness (t). A plant that is homozygous dominant (TT) is crossed with a plant that is homozygous recessive (tt).",
            "question": "What will be the genotype of all the offspring in the first generation (F1)?",
            "answerOptions": [
                { "text": "All will be TT.", "rationale": "Each offspring gets one allele from each parent.", "isCorrect": false },
                { "text": "All will be tt.", "rationale": "The offspring inherit the dominant 'T' allele from the tall parent.", "isCorrect": false },
                { "text": "All will be Tt (heterozygous).", "rationale": "Correct. The TT parent can only give a 'T' allele, and the tt parent can only give a 't' allele, so all offspring must be Tt.", "isCorrect": true },
                { "text": "There will be a mix of TT, Tt, and tt.", "rationale": "This ratio would be possible from a cross of two heterozygous parents.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "In pea plants, the allele for tallness (T) is dominant over the allele for shortness (t). A plant that is homozygous dominant (TT) is crossed with a plant that is homozygous recessive (tt).",
            "question": "Based on the cross described, what will be the phenotype of the first-generation offspring?",
            "answerOptions": [
                { "text": "All will be short.", "rationale": "Because the 'T' allele is dominant, it will mask the recessive 't' allele.", "isCorrect": false },
                { "text": "All will be tall.", "rationale": "Correct. Since all offspring have the genotype Tt, the dominant 'T' allele for tallness will be expressed.", "isCorrect": true },
                { "text": "Half will be tall and half will be short.", "rationale": "All offspring have the same genotype (Tt), so they will all have the same phenotype.", "isCorrect": false },
                { "text": "They will be of medium height.", "rationale": "This scenario describes simple dominance, not incomplete dominance where traits blend.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The passing of traits from parents to offspring is known as:",
            "answerOptions": [
                { "text": "Metabolism", "rationale": "Metabolism refers to the chemical processes within a living organism.", "isCorrect": false },
                { "text": "Heredity", "rationale": "Correct. Heredity is the study of how genetic information is passed down through generations.", "isCorrect": true },
                { "text": "Evolution", "rationale": "Evolution is the change in heritable characteristics of biological populations over successive generations.", "isCorrect": false },
                { "text": "Mutation", "rationale": "A mutation is a change in the DNA sequence.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Which process results in the formation of gametes (sex cells) with half the number of chromosomes as the parent cell?",
            "answerOptions": [
                { "text": "Mitosis", "rationale": "Mitosis is cell division that results in two identical daughter cells with the full set of chromosomes.", "isCorrect": false },
                { "text": "Fertilization", "rationale": "Fertilization is the fusion of two gametes to restore the full set of chromosomes.", "isCorrect": false },
                { "text": "Meiosis", "rationale": "Correct. Meiosis is a special type of cell division that reduces the chromosome number by half, creating four haploid cells.", "isCorrect": true },
                { "text": "Replication", "rationale": "Replication is the process of copying a DNA molecule.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "A permanent alteration in the nucleotide sequence of DNA is called a(n):",
            "answerOptions": [
                { "text": "Transcription", "rationale": "Transcription is the process of copying a segment of DNA into RNA.", "isCorrect": false },
                { "text": "Translation", "rationale": "Translation is the process where ribosomes synthesize proteins.", "isCorrect": false },
                { "text": "Mutation", "rationale": "Correct. Mutations can be caused by errors in DNA replication or by environmental factors and can be beneficial, neutral, or harmful.", "isCorrect": true },
                { "text": "Adaptation", "rationale": "An adaptation is a trait that helps an organism survive, which can arise from a mutation.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "In most eukaryotic cells, the genetic material is found inside the:",
            "answerOptions": [
                { "text": "Mitochondrion", "rationale": "Mitochondria have their own small amount of DNA, but the vast majority is in the nucleus.", "isCorrect": false },
                { "text": "Ribosome", "rationale": "Ribosomes are responsible for protein synthesis.", "isCorrect": false },
                { "text": "Cytoplasm", "rationale": "In eukaryotes, the DNA is enclosed within the nucleus, separate from the cytoplasm.", "isCorrect": false },
                { "text": "Nucleus", "rationale": "Correct. The nucleus acts as the control center of the cell and contains the chromosomes.", "isCorrect": true }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The shape of the DNA molecule is most accurately described as a:",
            "answerOptions": [
                { "text": "Single strand", "rationale": "RNA is typically single-stranded.", "isCorrect": false },
                { "text": "Double helix", "rationale": "Correct. This refers to the twisted-ladder structure of two complementary strands.", "isCorrect": true },
                { "text": "Branched chain", "rationale": "DNA has a linear, unbranched structure.", "isCorrect": false },
                { "text": "Globular sphere", "rationale": "Proteins often fold into globular shapes, but DNA does not.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Natural selection acts directly on an organism's:",
            "answerOptions": [
                { "text": "Genotype", "rationale": "Natural selection acts on the physical traits, which are an expression of the genotype.", "isCorrect": false },
                { "text": "Phenotype", "rationale": "Correct. The observable traits (phenotype) of an organism determine how well it survives and reproduces in its environment. This, in turn, influences which alleles are passed on.", "isCorrect": true },
                { "text": "Alleles", "rationale": "Selection acts on the traits (phenotype), which indirectly selects for the underlying alleles.", "isCorrect": false },
                { "text": "Individual genes", "rationale": "Selection favors organisms with advantageous traits, which may be influenced by multiple genes.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Physical Science",
    "id": "sci_physical_science_forces_motion_21",
    "title": "Physical Science: Forces and Motion",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A push or a pull on an object is known as a(n):",
            "answerOptions": [
                { "text": "Inertia", "rationale": "Inertia is an object's resistance to a change in motion, not the push or pull itself.", "isCorrect": false },
                { "text": "Force", "rationale": "Correct. A force is any interaction that, when unopposed, will change the motion of an object.", "isCorrect": true },
                { "text": "Acceleration", "rationale": "Acceleration is the rate of change of velocity, which is caused by a net force.", "isCorrect": false },
                { "text": "Mass", "rationale": "Mass is the amount of matter in an object.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "Newton's First Law of Motion, the law of inertia, states that an object at rest will stay at rest unless:",
            "answerOptions": [
                { "text": "It is moved by a person.", "rationale": "This is too specific; any unbalanced force will do.", "isCorrect": false },
                { "text": "Its mass changes.", "rationale": "A change in mass does not necessarily cause a change in motion.", "isCorrect": false },
                { "text": "Acted upon by an unbalanced force.", "rationale": "Correct. Similarly, an object in motion will stay in motion with the same speed and in the same direction unless acted upon by an unbalanced force.", "isCorrect": true },
                { "text": "Gravity stops acting on it.", "rationale": "Gravity is itself a force that can change an object's state of rest.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "According to Newton's Second Law of Motion, if you push two objects with the same force, the object with the lesser mass will:",
            "answerOptions": [
                { "text": "Accelerate less.", "rationale": "The second law (F=ma) shows that for a constant force, a smaller mass results in greater acceleration.", "isCorrect": false },
                { "text": "Not move.", "rationale": "If there is a net force, there must be acceleration.", "isCorrect": false },
                { "text": "Accelerate more.", "rationale": "Correct. The formula F=ma can be rearranged to a=F/m. If F is constant, a smaller m leads to a larger a.", "isCorrect": true },
                { "text": "Accelerate the same amount.", "rationale": "Acceleration is dependent on both force and mass.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Newton's Third Law of Motion is often stated as: 'For every action, there is an equal and opposite _______.'",
            "answerOptions": [
                { "text": "Force", "rationale": "This word is often used, but 'reaction' is the more traditional term in the statement of the law.", "isCorrect": false },
                { "text": "Reaction", "rationale": "Correct. This means that in every interaction, there is a pair of forces acting on the two interacting objects.", "isCorrect": true },
                { "text": "Acceleration", "rationale": "Forces cause acceleration, but the law refers to the forces themselves.", "isCorrect": false },
                { "text": "Inertia", "rationale": "Inertia is a property of matter, not part of the third law.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A car is traveling at a constant velocity of 50 mph on a straight highway. The force from the engine pushing the car forward is 1,000 Newtons. The combined forces of air resistance and friction acting against the car's motion are also 1,000 Newtons.",
            "question": "What is the net force on the car?",
            "answerOptions": [
                { "text": "2,000 Newtons forward.", "rationale": "The forces are in opposite directions, so they should be subtracted, not added.", "isCorrect": false },
                { "text": "1,000 Newtons forward.", "rationale": "This is only the engine's force, not the net (total) force.", "isCorrect": false },
                { "text": "0 Newtons.", "rationale": "Correct. The forces are balanced (1,000 N forward - 1,000 N backward = 0 N). According to the first law, a net force of zero means the object's velocity is constant.", "isCorrect": true },
                { "text": "1,000 Newtons backward.", "rationale": "This would mean the car is slowing down.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "A car is traveling at a constant velocity of 50 mph on a straight highway. The force from the engine pushing the car forward is 1,000 Newtons. The combined forces of air resistance and friction acting against the car's motion are also 1,000 Newtons.",
            "question": "If the driver suddenly takes their foot off the gas pedal, what will happen to the car's motion?",
            "answerOptions": [
                { "text": "It will speed up.", "rationale": "The forward force from the engine is removed.", "isCorrect": false },
                { "text": "It will continue at a constant velocity forever.", "rationale": "This would only happen if there were no friction or air resistance.", "isCorrect": false },
                { "text": "It will slow down due to the unbalanced force of friction and air resistance.", "rationale": "Correct. The forward force is gone, leaving a net backward force, which causes the car to decelerate.", "isCorrect": true },
                { "text": "It will stop instantly.", "rationale": "Inertia means the car will continue to move forward, though it will slow down over time.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The force that opposes motion between two surfaces that are in contact is called:",
            "answerOptions": [
                { "text": "Gravity", "rationale": "Gravity is the force of attraction between masses.", "isCorrect": false },
                { "text": "Friction", "rationale": "Correct. Friction acts in the direction opposite to motion or attempted motion.", "isCorrect": true },
                { "text": "Inertia", "rationale": "Inertia is a property of matter, not a force.", "isCorrect": false },
                { "text": "Momentum", "rationale": "Momentum is a measure of mass in motion (mass times velocity).", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "An object's speed in a particular direction is called its:",
            "answerOptions": [
                { "text": "Acceleration", "rationale": "Acceleration is the rate of change of velocity.", "isCorrect": false },
                { "text": "Velocity", "rationale": "Correct. Speed is a scalar quantity (e.g., 50 mph), while velocity is a vector quantity (e.g., 50 mph north).", "isCorrect": true },
                { "text": "Pace", "rationale": "Pace is a measure of time per unit distance, the inverse of speed.", "isCorrect": false },
                { "text": "Force", "rationale": "Force is a push or a pull.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Why does a crumpled piece of paper fall faster than a flat sheet of paper of the same mass?",
            "answerOptions": [
                { "text": "The crumpled paper has more mass.", "rationale": "The mass is the same.", "isCorrect": false },
                { "text": "Gravity pulls harder on the crumpled paper.", "rationale": "The force of gravity is the same on both, as their mass is the same.", "isCorrect": false },
                { "text": "The crumpled paper has less air resistance.", "rationale": "Correct. The flat sheet has a larger surface area, so it experiences much more opposing force from the air, slowing its descent.", "isCorrect": true },
                { "text": "The flat sheet has more inertia.", "rationale": "Since they have the same mass, they have the same inertia.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The rate at which an object's velocity changes is called:",
            "answerOptions": [
                { "text": "Speed", "rationale": "Speed is the rate of change of position.", "isCorrect": false },
                { "text": "Momentum", "rationale": "Momentum is mass times velocity.", "isCorrect": false },
                { "text": "Acceleration", "rationale": "Correct. This can be a change in speed, a change in direction, or both.", "isCorrect": true },
                { "text": "Jerk", "rationale": "Jerk is the rate of change of acceleration, a more advanced concept.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The universal force of attraction acting between any two objects with mass is:",
            "answerOptions": [
                { "text": "The strong nuclear force", "rationale": "This force holds atomic nuclei together.", "isCorrect": false },
                { "text": "The electromagnetic force", "rationale": "This force acts between charged particles.", "isCorrect": false },
                { "text": "Gravity", "rationale": "Correct. The strength of gravity depends on the mass of the objects and the distance between them.", "isCorrect": true },
                { "text": "Friction", "rationale": "Friction is a contact force that opposes motion.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "If you are in a car that suddenly stops, your body continues to move forward. This is a demonstration of:",
            "answerOptions": [
                { "text": "Newton's Second Law", "rationale": "The second law relates force, mass, and acceleration.", "isCorrect": false },
                { "text": "Newton's Third Law", "rationale": "The third law is about action-reaction pairs.", "isCorrect": false },
                { "text": "The Law of Inertia (Newton's First Law)", "rationale": "Correct. Your body was in motion and tends to stay in motion until a force (like a seatbelt) acts on it.", "isCorrect": true },
                { "text": "The Law of Universal Gravitation", "rationale": "This law describes the force of gravity.", "isCorrect": false }
            ]
        }
    ]
}
,
{
    "subject": "Science",
    "topic": "Life Science",
    "id": "sci_life_science_natural_selection_22",
    "title": "Life Science: Natural Selection",
    "questions": [
        {
            "questionNumber": 1,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The process by which organisms better adapted to their environment tend to survive and produce more offspring is called:",
            "answerOptions": [
                { "text": "Artificial selection", "rationale": "Artificial selection is when humans breed organisms for specific traits.", "isCorrect": false },
                { "text": "Genetic drift", "rationale": "Genetic drift is the change in the frequency of an existing gene variant in a population due to random chance.", "isCorrect": false },
                { "text": "Natural selection", "rationale": "Correct. This is the primary mechanism of evolution, proposed by Charles Darwin.", "isCorrect": true },
                { "text": "Gene flow", "rationale": "Gene flow is the transfer of genetic material from one population to another.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 2,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "A trait that helps an organism survive and reproduce in its environment is called a(n):",
            "answerOptions": [
                { "text": "Mutation", "rationale": "A mutation is a change in DNA, which might result in an adaptation.", "isCorrect": false },
                { "text": "Adaptation", "rationale": "Correct. Adaptations can be physical (e.g., camouflage) or behavioral (e.g., migration).", "isCorrect": true },
                { "text": "Fossil", "rationale": "A fossil is the preserved remains of an ancient organism.", "isCorrect": false },
                { "text": "Allele", "rationale": "An allele is a variant of a gene.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 3,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "For natural selection to occur, there must be ________ within a population.",
            "answerOptions": [
                { "text": "No competition", "rationale": "Competition for limited resources is a driving force of natural selection.", "isCorrect": false },
                { "text": "A stable, unchanging environment", "rationale": "Environmental changes often drive selection for new adaptations.", "isCorrect": false },
                { "text": "Variation in heritable traits", "rationale": "Correct. If all individuals are identical, there is no basis for selection to favor one over another.", "isCorrect": true },
                { "text": "A very small population size", "rationale": "Natural selection can occur in populations of any size, though its effects can be more pronounced in large populations.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 4,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The term 'survival of the fittest' means that the individuals that are best adapted to their environment will:",
            "answerOptions": [
                { "text": "Live the longest life.", "rationale": "Longevity can be a factor, but reproductive success is the key.", "isCorrect": false },
                { "text": "Be the strongest and fastest.", "rationale": "Fitness is context-dependent; sometimes being small or slow is an advantage.", "isCorrect": false },
                { "text": "Be the most successful at surviving and reproducing.", "rationale": "Correct. 'Fitness' in an evolutionary sense refers to reproductive success.", "isCorrect": true },
                { "text": "Never get sick.", "rationale": "Even the fittest individuals can get sick; fitness is about overall reproductive output.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 5,
            "type": "multipleChoice",
            "difficulty": "hard",
            "passage": "A population of moths lives in a forest with light-colored tree bark. Most of the moths are light-colored, which provides good camouflage from predatory birds. A small percentage of the moths are dark-colored. Due to industrial pollution, the tree bark in the forest becomes blackened with soot over several decades.",
            "question": "What is the most likely outcome for the moth population over time?",
            "answerOptions": [
                { "text": "The entire moth population will die out.", "rationale": "Natural selection will likely lead to adaptation, not extinction, unless the change is too rapid.", "isCorrect": false },
                { "text": "The frequency of the dark-colored moths will increase, as they are now better camouflaged.", "rationale": "Correct. This is a classic example of directional selection. The dark moths have a higher survival rate, so they leave more offspring, and the allele for dark color becomes more common.", "isCorrect": true },
                { "text": "The light-colored moths will learn to hide better.", "rationale": "This suggests the inheritance of acquired characteristics, which is not the mechanism of natural selection.", "isCorrect": false },
                { "text": "The number of light and dark moths will remain the same.", "rationale": "The change in the environment creates a strong selective pressure that will alter the population's characteristics.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 6,
            "type": "multipleChoice",
            "difficulty": "medium",
            "passage": "A population of moths lives in a forest with light-colored tree bark. Most of the moths are light-colored, which provides good camouflage from predatory birds. A small percentage of the moths are dark-colored. Due to industrial pollution, the tree bark in the forest becomes blackened with soot over several decades.",
            "question": "In this scenario, what is the primary selective pressure on the moths?",
            "answerOptions": [
                { "text": "The color of the tree bark.", "rationale": "The bark color is the environmental factor, but the pressure is the action of the predators.", "isCorrect": false },
                { "text": "The industrial pollution.", "rationale": "The pollution is the cause of the environmental change, but not the direct pressure.", "isCorrect": false },
                { "text": "Predation by birds.", "rationale": "Correct. The birds are the 'selecting agent,' preferentially removing the most visible moths from the population.", "isCorrect": true },
                { "text": "Competition for food.", "rationale": "The passage does not mention food as a limiting resource in this context.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 7,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The ultimate source of all new genetic variation is:",
            "answerOptions": [
                { "text": "Natural selection", "rationale": "Natural selection acts on existing variation; it does not create it.", "isCorrect": false },
                { "text": "Mutation", "rationale": "Correct. Random mutations in DNA create new alleles, which are the raw material for evolution.", "isCorrect": true },
                { "text": "Adaptation", "rationale": "An adaptation is a trait that arises from selection acting on variation.", "isCorrect": false },
                { "text": "Reproduction", "rationale": "Reproduction shuffles existing variation, but does not create new alleles.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 8,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "Structures that are similar in different species because they were inherited from a common ancestor are called:",
            "answerOptions": [
                { "text": "Analogous structures", "rationale": "Analogous structures have a similar function but evolved independently (e.g., wings of a bird and an insect).", "isCorrect": false },
                { "text": "Vestigial structures", "rationale": "Vestigial structures are remnants of features that served a function in an organism's ancestors (e.g., the human appendix).", "isCorrect": false },
                { "text": "Homologous structures", "rationale": "Correct. The wing of a bat, the flipper of a whale, and the arm of a human are homologous structures, indicating a shared evolutionary history.", "isCorrect": true },
                { "text": "Convergent structures", "rationale": "This is not a standard term; convergent evolution leads to analogous structures.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 9,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Speciation is the evolutionary process by which:",
            "answerOptions": [
                { "text": "An individual organism changes over its lifetime.", "rationale": "This is development, not speciation.", "isCorrect": false },
                { "text": "New biological species arise.", "rationale": "Correct. This often occurs when a population becomes reproductively isolated from other populations and diverges genetically over time.", "isCorrect": true },
                { "text": "Species go extinct.", "rationale": "This is the opposite of speciation.", "isCorrect": false },
                { "text": "Genes are passed from parent to offspring.", "rationale": "This is heredity.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 10,
            "type": "multipleChoice",
            "difficulty": "easy",
            "question": "The preserved remains or traces of ancient organisms provide evidence for evolution and are known as:",
            "answerOptions": [
                { "text": "DNA", "rationale": "DNA is the genetic material, not the preserved remains.", "isCorrect": false },
                { "text": "Fossils", "rationale": "Correct. The fossil record shows how organisms have changed over geologic time.", "isCorrect": true },
                { "text": "Genes", "rationale": "Genes are units of heredity.", "isCorrect": false },
                { "text": "Embryos", "rationale": "The study of embryos (embryology) also provides evidence for evolution, but fossils are the physical remains.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 11,
            "type": "multipleChoice",
            "difficulty": "medium",
            "question": "The evolution of a new species is most likely to occur under which condition?",
            "answerOptions": [
                { "text": "A population with no genetic variation.", "rationale": "Without variation, there is no raw material for selection.", "isCorrect": false },
                { "text": "Geographic isolation of a population.", "rationale": "Correct. When a population is separated, it can no longer interbreed with the original population. It evolves independently, and over time, may become a distinct species.", "isCorrect": true },
                { "text": "A constant, unchanging environment.", "rationale": "A changing environment often provides the selective pressure that drives speciation.", "isCorrect": false },
                { "text": "Frequent interbreeding with neighboring populations.", "rationale": "This is gene flow, which tends to make populations more similar, preventing speciation.", "isCorrect": false }
            ]
        },
        {
            "questionNumber": 12,
            "type": "multipleChoice",
            "difficulty": "hard",
            "question": "Antibiotic resistance in bacteria is a modern example of natural selection because:",
            "answerOptions": [
                { "text": "Bacteria learn to avoid antibiotics.", "rationale": "Bacteria do not 'learn'; their resistance is based on genetic traits.", "isCorrect": false },
                { "text": "The antibiotics cause mutations that lead to resistance.", "rationale": "The mutations for resistance arise randomly; the antibiotic is the selective pressure that favors them.", "isCorrect": false },
                { "text": "Resistant bacteria survive antibiotic treatment and reproduce, while non-resistant bacteria die.", "rationale": "Correct. The antibiotic acts as a powerful selective agent, and the bacteria with pre-existing resistance are the 'fittest' and pass on their genes.", "isCorrect": true },
                { "text": "All bacteria eventually become resistant over time.", "rationale": "Resistance only becomes common in a population when there is selective pressure from an antibiotic.", "isCorrect": false }
            ]
        }
    ]
}
];
