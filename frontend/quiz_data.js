"use strict";

if (typeof AppData === 'undefined') {
    var AppData = {};
}

AppData.quizzes = AppData.quizzes || {};

// Science -> Physical Science -> Chemistry Fundamentals
AppData.quizzes.sci_chem_fundamentals = {
    id: "sci_chem_fundamentals",
    title: "Chemistry Fundamentals",
    description: "Properties of matter, atoms, elements, and the periodic table.",
    quizzes: [
        {
            quizId: "sci_chem_fundamentals_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which of the following best describes a proton?",
                    answerOptions: [
                        { text: "A subatomic particle with a negative charge found orbiting the nucleus.", isCorrect: false, rationale: "This describes an electron." },
                        { text: "A subatomic particle with no charge found within the nucleus.", isCorrect: false, rationale: "This describes a neutron." },
                        { text: "A subatomic particle with a positive charge found within the nucleus.", isCorrect: true, rationale: "Protons are positively charged and located in the atom's nucleus." },
                        { text: "The smallest unit of an element.", isCorrect: false, rationale: "This describes an atom." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "An element is defined by the number of ___ in its nucleus.",
                    answerOptions: [
                        { text: "neutrons", isCorrect: false, rationale: "The number of neutrons can vary, creating isotopes of the same element." },
                        { text: "electrons", isCorrect: false, rationale: "The number of electrons can change, creating ions." },
                        { text: "protons", isCorrect: true, rationale: "The number of protons (the atomic number) is unique to each element and defines it." },
                        { text: "quarks", isCorrect: false, rationale: "Quarks are fundamental particles that make up protons and neutrons." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "What does the atomic number of an element represent?",
                    answerOptions: [
                        { text: "The number of neutrons in the nucleus.", isCorrect: false, rationale: "The atomic number is the count of protons." },
                        { text: "The total number of protons and neutrons.", isCorrect: false, rationale: "This is the mass number, not the atomic number." },
                        { text: "The number of protons in the nucleus.", isCorrect: true, rationale: "The atomic number is the defining characteristic of an element and equals its proton count." },
                        { text: "The number of electrons orbiting the nucleus.", isCorrect: false, rationale: "In a neutral atom, this number is equal to the atomic number, but the atomic number itself is defined by the protons." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The periodic table arranges elements in rows (called periods) and columns (called groups). Elements in the same group share similar chemical properties because they have the same number of valence electrons.</p>",
                    question: "Why do elements in the same group of the periodic table have similar chemical properties?",
                    answerOptions: [
                        { text: "Because they have the same number of protons.", isCorrect: false, rationale: "Elements in a group have different numbers of protons." },
                        { text: "Because they have the same number of neutrons.", isCorrect: false, rationale: "The number of neutrons varies among elements in a group." },
                        { text: "Because they have the same number of valence electrons.", isCorrect: true, rationale: "Valence electrons determine an atom's chemical reactivity, and elements in the same group share this characteristic." },
                        { text: "Because they have the same atomic mass.", isCorrect: false, rationale: "Atomic mass increases as you go down a group." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which of the following is a compound?",
                    answerOptions: [
                        { text: "O (Oxygen)", isCorrect: false, rationale: "Oxygen is an element, consisting of only one type of atom." },
                        { text: "H₂O (Water)", isCorrect: true, rationale: "Water is a compound made of hydrogen and oxygen atoms chemically bonded together." },
                        { text: "He (Helium)", isCorrect: false, rationale: "Helium is an element." },
                        { text: "Fe (Iron)", isCorrect: false, rationale: "Iron is an element." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "A chemical change results in the formation of what?",
                    answerOptions: [
                        { text: "A new substance with different properties.", isCorrect: true, rationale: "A chemical change, like burning wood, creates new substances (ash, smoke) with different properties from the original." },
                        { text: "A change in state, like melting or boiling.", isCorrect: false, rationale: "This is a physical change; the substance's chemical identity remains the same." },
                        { text: "A mixture where substances are not chemically bonded.", isCorrect: false, rationale: "This describes the formation of a mixture, which is a physical change." },
                        { text: "A simple change in shape or size.", isCorrect: false, rationale: "This is a physical change." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>The law of conservation of mass states that in a closed system, mass is neither created nor destroyed by chemical reactions. The mass of the reactants must equal the mass of the products.</p>",
                    question: "If 22 grams of propane react completely with 80 grams of oxygen, what is the total mass of the carbon dioxide and water produced?",
                    answerOptions: [
                        { text: "58 grams", isCorrect: false, rationale: "This would mean mass was lost, violating the law of conservation of mass." },
                        { text: "80 grams", isCorrect: false, rationale: "This only accounts for the mass of the oxygen." },
                        { text: "102 grams", isCorrect: true, rationale: "According to the law of conservation of mass, the total mass of the products must equal the total mass of the reactants (22g + 80g = 102g)." },
                        { text: "It cannot be determined from the information given.", isCorrect: false, rationale: "The law of conservation of mass allows us to determine the total mass." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "Which of the following is an example of a physical change?",
                    answerOptions: [
                        { text: "An iron nail rusting.", isCorrect: false, rationale: "Rusting is a chemical change where iron reacts with oxygen to form iron oxide." },
                        { text: "A piece of paper burning.", isCorrect: false, rationale: "Burning is a chemical change (combustion)." },
                        { text: "An ice cube melting into water.", isCorrect: true, rationale: "Melting is a physical change of state from solid to liquid. The chemical composition (H₂O) remains the same." },
                        { text: "A cake baking in the oven.", isCorrect: false, rationale: "Baking involves chemical reactions that change the ingredients." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "On the pH scale, a substance with a pH of 8 is considered:",
                    answerOptions: [
                        { text: "Strongly acidic", isCorrect: false, rationale: "Strongly acidic substances have a very low pH (e.g., 1-2)." },
                        { text: "Neutral", isCorrect: false, rationale: "A pH of 7 is neutral." },
                        { text: "Slightly basic (alkaline)", isCorrect: true, rationale: "A pH greater than 7 is basic. A pH of 8 is slightly basic." },
                        { text: "Slightly acidic", isCorrect: false, rationale: "Slightly acidic substances have a pH just below 7 (e.g., 5-6)." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>A solution is a homogeneous mixture composed of a solute and a solvent. The solute is the substance that is dissolved, and the solvent is the substance that does the dissolving.</p>",
                    question: "When you dissolve salt in water, what is the salt considered?",
                    answerOptions: [
                        { text: "The solvent", isCorrect: false, rationale: "The solvent is the water, which does the dissolving." },
                        { text: "The solution", isCorrect: false, rationale: "The solution is the entire salt water mixture." },
                        { text: "The solute", isCorrect: true, rationale: "The salt is the substance being dissolved, making it the solute." },
                        { text: "The precipitate", isCorrect: false, rationale: "A precipitate is a solid that forms from a solution during a chemical reaction." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "In the chemical formula CO₂, what does the subscript '2' signify?",
                    answerOptions: [
                        { text: "There are two carbon atoms.", isCorrect: false, rationale: "The subscript applies to the element immediately preceding it (Oxygen)." },
                        { text: "There are two oxygen atoms in the molecule.", isCorrect: true, rationale: "The subscript indicates the number of atoms of that element in one molecule." },
                        { text: "The molecule has a charge of -2.", isCorrect: false, rationale: "Charge is indicated by a superscript, not a subscript." },
                        { text: "There are two molecules of carbon dioxide.", isCorrect: false, rationale: "The number of molecules is indicated by a coefficient in front of the formula." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "What is an isotope?",
                    answerOptions: [
                        { text: "An atom with a different number of protons.", isCorrect: false, rationale: "Changing the number of protons would change the element itself." },
                        { text: "An atom with a different number of electrons.", isCorrect: false, rationale: "This is an ion, not an isotope." },
                        { text: "An atom with the same number of protons but a different number of neutrons.", isCorrect: true, rationale: "Isotopes are variants of an element that differ in mass due to a different number of neutrons." },
                        { text: "A charged particle.", isCorrect: false, rationale: "This is an ion." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>Matter can exist in several states, with the most common being solid, liquid, and gas. In a solid, particles are tightly packed and vibrate in place. In a liquid, particles can slide past one another. In a gas, particles are far apart and move randomly.</p>",
                    question: "Which state of matter is characterized by having a definite volume but no definite shape?",
                    answerOptions: [
                        { text: "Solid", isCorrect: false, rationale: "A solid has both a definite volume and a definite shape." },
                        { text: "Liquid", isCorrect: true, rationale: "A liquid has a definite volume but takes the shape of its container." },
                        { text: "Gas", isCorrect: false, rationale: "A gas has neither a definite volume nor a definite shape." },
                        { text: "Plasma", isCorrect: false, rationale: "Plasma, like a gas, has no definite volume or shape." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "A substance that cannot be broken down into simpler substances by chemical means is called a(n):",
                    answerOptions: [
                        { text: "Compound", isCorrect: false, rationale: "A compound can be broken down into its constituent elements." },
                        { text: "Mixture", isCorrect: false, rationale: "A mixture can be separated by physical means." },
                        { text: "Solution", isCorrect: false, rationale: "A solution is a type of mixture." },
                        { text: "Element", isCorrect: true, rationale: "An element is a pure substance consisting of only one type of atom, which cannot be broken down further by chemical reactions." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The rows in the periodic table are called:",
                    answerOptions: [
                        { text: "Groups", isCorrect: false, rationale: "Groups or families are the columns." },
                        { text: "Periods", isCorrect: true, rationale: "The horizontal rows of the periodic table are called periods." },
                        { text: "Blocks", isCorrect: false, rationale: "Blocks (s, p, d, f) refer to sections of the periodic table based on electron orbitals." },
                        { text: "Families", isCorrect: false, rationale: "Families or groups are the columns." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_chem_fundamentals_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which subatomic particle has a neutral (no) charge?",
                    answerOptions: [
                        { text: "Proton", isCorrect: false, rationale: "Protons have a positive charge." },
                        { text: "Electron", isCorrect: false, rationale: "Electrons have a negative charge." },
                        { text: "Neutron", isCorrect: true, rationale: "Neutrons are neutral and are located in the nucleus." },
                        { text: "Photon", isCorrect: false, rationale: "A photon is a particle of light." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "The mass number of an atom is the total number of which two particles?",
                    answerOptions: [
                        { text: "Protons and electrons", isCorrect: false, rationale: "Electrons have a negligible mass compared to protons and neutrons." },
                        { text: "Protons and neutrons", isCorrect: true, rationale: "The mass number is the sum of protons and neutrons in the nucleus." },
                        { text: "Neutrons and electrons", isCorrect: false, rationale: "Electrons are not included in the mass number." },
                        { text: "Only protons", isCorrect: false, rationale: "This is the atomic number." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "Carbon-12 and Carbon-14 are isotopes. What is the difference between them?",
                    answerOptions: [
                        { text: "They have a different number of protons.", isCorrect: false, rationale: "They are both carbon, so they have the same number of protons (6)." },
                        { text: "Carbon-14 has two more neutrons than Carbon-12.", isCorrect: true, rationale: "The number in the name represents the mass number (protons + neutrons). Since they have the same number of protons, the difference must be in the number of neutrons." },
                        { text: "They have a different number of electrons.", isCorrect: false, rationale: "In a neutral atom, the electron count matches the proton count." },
                        { text: "One is a solid and one is a gas at room temperature.", isCorrect: false, rationale: "Isotopes of an element have the same chemical properties and state of matter." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "What type of chemical bond involves the sharing of electrons between atoms?",
                    answerOptions: [
                        { text: "Ionic bond", isCorrect: false, rationale: "An ionic bond involves the transfer of electrons, not sharing." },
                        { text: "Covalent bond", isCorrect: true, rationale: "A covalent bond is formed when two atoms share one or more pairs of electrons." },
                        { text: "Metallic bond", isCorrect: false, rationale: "A metallic bond involves a 'sea' of shared electrons among many metal atoms." },
                        { text: "Hydrogen bond", isCorrect: false, rationale: "A hydrogen bond is a weaker attraction between molecules, not a bond within a molecule." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which of the following is an element, not a compound?",
                    answerOptions: [
                        { text: "Salt (NaCl)", isCorrect: false, rationale: "Salt is a compound of sodium and chlorine." },
                        { text: "Sugar (C₁₂H₂₂O₁₁)", isCorrect: false, rationale: "Sugar is a compound of carbon, hydrogen, and oxygen." },
                        { text: "Helium (He)", isCorrect: true, rationale: "Helium is an element, listed on the periodic table." },
                        { text: "Carbon Dioxide (CO₂)", isCorrect: false, rationale: "Carbon dioxide is a compound of carbon and oxygen." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "What happens during a chemical reaction?",
                    answerOptions: [
                        { text: "Atoms are created.", isCorrect: false, rationale: "Atoms are not created or destroyed in a chemical reaction, only rearranged." },
                        { text: "Atoms are destroyed.", isCorrect: false, rationale: "Atoms are conserved in a chemical reaction." },
                        { text: "Atoms are rearranged to form new substances.", isCorrect: true, rationale: "In a chemical reaction, bonds between atoms are broken and new bonds are formed, resulting in new substances." },
                        { text: "The state of matter always changes.", isCorrect: false, rationale: "A change of state is a physical change and does not always accompany a chemical reaction." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "Which of the following describes a substance with a pH of 2?",
                    answerOptions: [
                        { text: "Weakly acidic", isCorrect: false, rationale: "A pH of 2 indicates a strong acid." },
                        { text: "Neutral", isCorrect: false, rationale: "Neutral is pH 7." },
                        { text: "Strongly basic", isCorrect: false, rationale: "Strongly basic substances have a high pH (e.g., 13-14)." },
                        { text: "Strongly acidic", isCorrect: true, rationale: "The pH scale is logarithmic; a pH of 2 is very acidic." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>A catalyst is a substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change.</p>",
                    question: "What is the role of a catalyst in a chemical reaction?",
                    answerOptions: [
                        { text: "It is one of the main reactants.", isCorrect: false, rationale: "A catalyst is not a reactant; it is not consumed in the reaction." },
                        { text: "It is the primary product of the reaction.", isCorrect: false, rationale: "A catalyst is not a product." },
                        { text: "It slows down the reaction.", isCorrect: false, rationale: "A substance that slows down a reaction is called an inhibitor." },
                        { text: "It speeds up the reaction without being consumed.", isCorrect: true, rationale: "This is the definition of a catalyst." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The process of a liquid turning into a gas is called:",
                    answerOptions: [
                        { text: "Melting", isCorrect: false, rationale: "Melting is the process of a solid turning into a liquid." },
                        { text: "Freezing", isCorrect: false, rationale: "Freezing is the process of a liquid turning into a solid." },
                        { text: "Evaporation (or boiling)", isCorrect: true, rationale: "This change of state from liquid to gas is known as evaporation or vaporization." },
                        { text: "Condensation", isCorrect: false, rationale: "Condensation is the process of a gas turning into a liquid." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "In the periodic table, elements are ordered by increasing:",
                    answerOptions: [
                        { text: "Atomic mass", isCorrect: false, rationale: "While generally true, there are exceptions (e.g., tellurium and iodine). The fundamental ordering is by atomic number." },
                        { text: "Atomic number", isCorrect: true, rationale: "The periodic table is arranged in order of increasing atomic number (number of protons)." },
                        { text: "Number of neutrons", isCorrect: false, rationale: "The number of neutrons does not follow a simple increasing pattern." },
                        { text: "Electronegativity", isCorrect: false, rationale: "Electronegativity is a property that follows trends on the table, but it is not the primary organizing principle." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "What is a mixture?",
                    answerOptions: [
                        { text: "A substance made of two or more elements chemically bonded together.", isCorrect: false, rationale: "This is the definition of a compound." },
                        { text: "A combination of two or more substances that are not chemically bonded.", isCorrect: true, rationale: "In a mixture, each substance retains its own chemical identity and properties." },
                        { text: "A pure substance that cannot be broken down further.", isCorrect: false, rationale: "This is the definition of an element." },
                        { text: "A substance that has a definite chemical composition.", isCorrect: false, rationale: "This can describe both elements and compounds, but not mixtures." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Which state of matter has particles that are farthest apart and most disordered?",
                    answerOptions: [
                        { text: "Solid", isCorrect: false, rationale: "Solid particles are tightly packed and highly ordered." },
                        { text: "Liquid", isCorrect: false, rationale: "Liquid particles are close together but can move past each other." },
                        { text: "Gas", isCorrect: true, rationale: "Gas particles are far apart and move randomly and rapidly to fill their container." },
                        { text: "Plasma", isCorrect: false, rationale: "Plasma is similar to a gas in this respect, but a gas is the more common answer for this level." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "An atom that has gained or lost electrons and has an electrical charge is called a(n):",
                    answerOptions: [
                        { text: "Isotope", isCorrect: false, rationale: "An isotope has a different number of neutrons." },
                        { text: "Ion", isCorrect: true, rationale: "An ion is a charged atom or molecule." },
                        { text: "Molecule", isCorrect: false, rationale: "A molecule is a group of two or more atoms bonded together." },
                        { text: "Compound", isCorrect: false, rationale: "A compound is a substance formed from two or more different elements." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The columns of the periodic table are called:",
                    answerOptions: [
                        { text: "Periods", isCorrect: false, rationale: "Periods are the rows." },
                        { text: "Groups or Families", isCorrect: true, rationale: "The vertical columns are known as groups or families." },
                        { text: "Series", isCorrect: false, rationale: "Series refers to specific sets of elements like the lanthanides and actinides." },
                        { text: "Blocks", isCorrect: false, rationale: "Blocks refer to the s, p, d, and f sections of the table." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>An acid and a base can react in a neutralization reaction to form a salt and water. For example, hydrochloric acid (HCl) reacts with sodium hydroxide (NaOH) to produce sodium chloride (NaCl) and water (H₂O).</p>",
                    question: "What are the typical products of a neutralization reaction?",
                    answerOptions: [
                        { text: "An acid and a base", isCorrect: false, rationale: "These are the reactants." },
                        { text: "A salt and water", isCorrect: true, rationale: "The reaction between an acid and a base neutralizes them, forming a salt and water." },
                        { text: "Two different acids", isCorrect: false, rationale: "This is incorrect." },
                        { text: "A gas and a solid", isCorrect: false, rationale: "While some reactions produce gases or solids, the defining products of neutralization are a salt and water." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_chem_fundamentals_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Where are electrons located in an atom?",
                    answerOptions: [
                        { text: "Inside the nucleus with the protons.", isCorrect: false, rationale: "The nucleus contains protons and neutrons." },
                        { text: "In orbitals or shells surrounding the nucleus.", isCorrect: true, rationale: "Electrons exist in specific energy levels or orbitals outside the nucleus." },
                        { text: "Bonded to neutrons.", isCorrect: false, rationale: "Electrons are not bonded to neutrons in this way." },
                        { text: "They are not part of a standard atom.", isCorrect: false, rationale: "Electrons are a fundamental component of an atom." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "Which of the following represents a molecule of an element, not a compound?",
                    answerOptions: [
                        { text: "CO₂", isCorrect: false, rationale: "This is a molecule of the compound carbon dioxide." },
                        { text: "H₂O", isCorrect: false, rationale: "This is a molecule of the compound water." },
                        { text: "O₂", isCorrect: true, rationale: "This is a molecule of the element oxygen, as it contains only one type of atom." },
                        { text: "CH₄", isCorrect: false, rationale: "This is a molecule of the compound methane." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "What type of chemical bond is formed when one atom transfers an electron to another, creating charged ions that attract each other?",
                    answerOptions: [
                        { text: "Covalent bond", isCorrect: false, rationale: "A covalent bond involves sharing electrons." },
                        { text: "Ionic bond", isCorrect: true, rationale: "An ionic bond is formed by the electrostatic attraction between oppositely charged ions." },
                        { text: "Metallic bond", isCorrect: false, rationale: "A metallic bond involves a sea of delocalized electrons." },
                        { text: "Polar bond", isCorrect: false, rationale: "A polar bond is a type of covalent bond with unequal sharing of electrons." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "The process of a solid changing directly into a gas without passing through the liquid state is called:",
                    answerOptions: [
                        { text: "Evaporation", isCorrect: false, rationale: "Evaporation is from liquid to gas." },
                        { text: "Condensation", isCorrect: false, rationale: "Condensation is from gas to liquid." },
                        { text: "Sublimation", isCorrect: true, rationale: "Sublimation is the direct transition from solid to gas, like dry ice turning into CO₂ gas." },
                        { text: "Deposition", isCorrect: false, rationale: "Deposition is the direct transition from gas to solid." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The number of protons in an atom of an element is its:",
                    answerOptions: [
                        { text: "Mass number", isCorrect: false, rationale: "Mass number is protons + neutrons." },
                        { text: "Atomic number", isCorrect: true, rationale: "The atomic number is defined by the number of protons." },
                        { text: "Isotope number", isCorrect: false, rationale: "This term is not standard; isotopes are identified by their mass number." },
                        { text: "Valence number", isCorrect: false, rationale: "Valence number refers to the number of electrons in the outermost shell." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "If you have a glass of sugar water, which is the solvent?",
                    answerOptions: [
                        { text: "The sugar", isCorrect: false, rationale: "The sugar is the solute, the substance being dissolved." },
                        { text: "The water", isCorrect: true, rationale: "The water is the solvent, the substance doing the dissolving." },
                        { text: "The glass", isCorrect: false, rationale: "The glass is the container." },
                        { text: "Both the sugar and the water", isCorrect: false, rationale: "The roles are distinct." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "What does the 'Law of Conservation of Mass' state?",
                    answerOptions: [
                        { text: "Mass can be converted into energy.", isCorrect: false, rationale: "This relates to nuclear reactions, not ordinary chemical reactions." },
                        { text: "The total mass of reactants equals the total mass of products in a chemical reaction.", isCorrect: true, rationale: "This law states that mass is neither created nor destroyed." },
                        { text: "Heavier atoms react faster than lighter atoms.", isCorrect: false, rationale: "This is not a statement of the law of conservation of mass." },
                        { text: "The mass of a substance determines its chemical properties.", isCorrect: false, rationale: "Chemical properties are primarily determined by electron configuration." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>A balanced chemical equation represents the conservation of mass. The number of atoms of each element on the reactant side must equal the number of atoms of that element on the product side.</p>",
                    question: "In the balanced equation 2H₂ + O₂ → 2H₂O, how many atoms of oxygen are on the product side?",
                    answerOptions: [
                        { text: "1", isCorrect: false, rationale: "There are 2 molecules of H₂O, and each contains 1 oxygen atom." },
                        { text: "2", isCorrect: true, rationale: "The coefficient '2' in front of H₂O applies to the entire molecule. So, there are 2 * 1 = 2 oxygen atoms." },
                        { text: "3", isCorrect: false, rationale: "This is incorrect." },
                        { text: "4", isCorrect: false, rationale: "There are 4 hydrogen atoms on the product side." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Which state of matter is highly compressible?",
                    answerOptions: [
                        { text: "Solid", isCorrect: false, rationale: "Solids are generally incompressible." },
                        { text: "Liquid", isCorrect: false, rationale: "Liquids are nearly incompressible." },
                        { text: "Gas", isCorrect: true, rationale: "Gases are highly compressible because their particles are far apart." },
                        { text: "All are equally compressible.", isCorrect: false, rationale: "Compressibility varies greatly between states of matter." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "The elements in Group 18 of the periodic table, such as Helium and Neon, are known as:",
                    answerOptions: [
                        { text: "Alkali metals", isCorrect: false, rationale: "Alkali metals are in Group 1." },
                        { text: "Halogens", isCorrect: false, rationale: "Halogens are in Group 17." },
                        { text: "Noble gases", isCorrect: true, rationale: "Group 18 elements are the noble gases, which are known for their chemical inertness." },
                        { text: "Alkaline earth metals", isCorrect: false, rationale: "Alkaline earth metals are in Group 2." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "When an acid reacts with a metal, what gas is typically produced?",
                    answerOptions: [
                        { text: "Oxygen", isCorrect: false, rationale: "Oxygen is not typically produced in this reaction." },
                        { text: "Carbon dioxide", isCorrect: false, rationale: "Carbon dioxide is produced when an acid reacts with a carbonate." },
                        { text: "Hydrogen", isCorrect: true, rationale: "Active metals react with acids to displace hydrogen, producing hydrogen gas and a salt." },
                        { text: "Chlorine", isCorrect: false, rationale: "Chlorine gas would only be produced if the acid contained chlorine and an oxidation reaction occurred." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "What is the primary difference between a mixture and a compound?",
                    answerOptions: [
                        { text: "A mixture can only contain elements, while a compound contains molecules.", isCorrect: false, rationale: "Both can contain multiple elements." },
                        { text: "The components of a mixture are not chemically bonded, while the components of a compound are.", isCorrect: true, rationale: "This is the fundamental difference. A mixture can be separated by physical means, but a compound cannot." },
                        { text: "A mixture is always a liquid, while a compound is always a solid.", isCorrect: false, rationale: "Both can exist in any state of matter." },
                        { text: "There is no difference.", isCorrect: false, rationale: "They are fundamentally different chemical concepts." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "An electron has what type of electrical charge?",
                    answerOptions: [
                        { text: "Positive", isCorrect: false, rationale: "Protons are positive." },
                        { text: "Negative", isCorrect: true, rationale: "Electrons carry a fundamental negative charge." },
                        { text: "Neutral", isCorrect: false, rationale: "Neutrons are neutral." },
                        { text: "Variable", isCorrect: false, rationale: "The charge of an electron is constant." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Vinegar is a common household acid. Its pH is likely to be:",
                    answerOptions: [
                        { text: "Greater than 7", isCorrect: false, rationale: "A pH greater than 7 indicates a base." },
                        { text: "Exactly 7", isCorrect: false, rationale: "A pH of 7 is neutral." },
                        { text: "Less than 7", isCorrect: true, rationale: "Acids have a pH less than 7. Vinegar's pH is typically around 2-3." },
                        { text: "Exactly 0", isCorrect: false, rationale: "A pH of 0 represents a very strong acid, much stronger than vinegar." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "A chemical symbol is:",
                    answerOptions: [
                        { text: "A one or two-letter abbreviation for an element.", isCorrect: true, rationale: "For example, 'H' for hydrogen and 'He' for helium." },
                        { text: "A diagram of an atom.", isCorrect: false, rationale: "This would be an atomic model." },
                        { text: "The number of protons in an atom.", isCorrect: false, rationale: "This is the atomic number." },
                        { text: "A formula that shows how many atoms are in a compound.", isCorrect: false, rationale: "This is a chemical formula." }
                    ]
                }
            ]
        }
    ]
};
// Science -> Physical Science -> Waves, Sound, and Light
AppData.quizzes.sci_waves_sound_light = {
    id: "sci_waves_sound_light",
    title: "Waves, Sound, and Light",
    description: "Properties of waves, the electromagnetic spectrum, and optics.",
    quizzes: [
        {
            quizId: "sci_waves_sound_light_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What is the primary difference between a transverse wave and a longitudinal wave?",
                    answerOptions: [
                        { text: "Transverse waves require a medium, while longitudinal waves do not.", isCorrect: false, rationale: "Both sound (longitudinal) and waves on a string (transverse) require a medium. Light is transverse and does not." },
                        { text: "The direction of particle vibration relative to the direction of wave travel.", isCorrect: true, rationale: "In transverse waves, particles vibrate perpendicular to wave travel. In longitudinal waves, particles vibrate parallel to wave travel." },
                        { text: "Transverse waves carry more energy than longitudinal waves.", isCorrect: false, rationale: "The energy of a wave depends on its amplitude and frequency, not its type." },
                        { text: "Longitudinal waves travel faster than transverse waves.", isCorrect: false, rationale: "Wave speed depends on the medium, not the type of wave." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "Which of the following electromagnetic waves has the highest frequency?",
                    answerOptions: [
                        { text: "Radio waves", isCorrect: false, rationale: "Radio waves have the lowest frequency in the electromagnetic spectrum." },
                        { text: "Infrared", isCorrect: false, rationale: "Infrared has a lower frequency than visible light." },
                        { text: "Ultraviolet (UV)", isCorrect: false, rationale: "UV light has a high frequency, but gamma rays are even higher." },
                        { text: "Gamma rays", isCorrect: true, rationale: "Gamma rays have the highest frequency and highest energy in the electromagnetic spectrum." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "Sound waves are an example of which type of wave?",
                    answerOptions: [
                        { text: "Transverse wave", isCorrect: false, rationale: "In a sound wave, particles of the medium vibrate parallel to the direction of energy transport." },
                        { text: "Longitudinal wave", isCorrect: true, rationale: "Sound waves consist of compressions and rarefactions, which are characteristic of longitudinal waves." },
                        { text: "Electromagnetic wave", isCorrect: false, rationale: "Sound requires a medium to travel, while electromagnetic waves do not." },
                        { text: "Surface wave", isCorrect: false, rationale: "Surface waves occur at the interface between two media, like ripples on water." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The speed of sound depends on the medium through which it travels. It travels fastest in solids, slower in liquids, and slowest in gases because of how closely the particles are packed.</p>",
                    question: "In which of the following would sound travel the fastest?",
                    answerOptions: [
                        { text: "In the air of a classroom", isCorrect: false, rationale: "Air is a gas, where sound travels the slowest." },
                        { text: "In the water of a swimming pool", isCorrect: false, rationale: "Sound travels faster in liquids than in gases, but fastest in solids." },
                        { text: "Through a steel railway track", isCorrect: true, rationale: "Steel is a solid, where particles are tightly packed, allowing sound vibrations to travel very quickly." },
                        { text: "In a vacuum", isCorrect: false, rationale: "Sound cannot travel in a vacuum because there are no particles to vibrate." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What property of a wave is measured in Hertz (Hz)?",
                    answerOptions: [
                        { text: "Amplitude", isCorrect: false, rationale: "Amplitude is related to the wave's energy or intensity." },
                        { text: "Wavelength", isCorrect: false, rationale: "Wavelength is the distance between two corresponding points on a wave." },
                        { text: "Frequency", isCorrect: true, rationale: "Frequency is the number of waves that pass a point per second, measured in Hertz." },
                        { text: "Speed", isCorrect: false, rationale: "Speed is the distance a wave travels per unit of time, measured in meters per second." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "The bending of light as it passes from one medium to another (for example, from air to water) is called:",
                    answerOptions: [
                        { text: "Reflection", isCorrect: false, rationale: "Reflection is the bouncing of light off a surface." },
                        { text: "Refraction", isCorrect: true, rationale: "Refraction is the bending of light due to a change in its speed as it enters a new medium." },
                        { text: "Diffraction", isCorrect: false, rationale: "Diffraction is the bending of waves around an obstacle or through an opening." },
                        { text: "Absorption", isCorrect: false, rationale: "Absorption is when a material takes in the energy of a light wave." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "image",
                    imageUrl: "Images/Science/reflection.png",
                    question: "The diagram shows a light ray striking a plane mirror. According to the law of reflection, what is the relationship between the angle of incidence (i) and the angle of reflection (r)?",
                    answerOptions: [
                        { text: "The angle of incidence is always greater than the angle of reflection.", isCorrect: false, rationale: "This violates the law of reflection." },
                        { text: "The angle of incidence is equal to the angle of reflection.", isCorrect: true, rationale: "The law of reflection states that the angle at which a wave strikes a surface is equal to the angle at which it reflects off the surface." },
                        { text: "The angle of incidence is always less than the angle of reflection.", isCorrect: false, rationale: "This violates the law of reflection." },
                        { text: "There is no consistent relationship between the two angles.", isCorrect: false, rationale: "The relationship is consistent and predictable." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "What determines the color of an object we see?",
                    answerOptions: [
                        { text: "The color of light the object absorbs.", isCorrect: false, rationale: "The absorbed colors are the ones we don't see." },
                        { text: "The color of light the object reflects or transmits.", isCorrect: true, rationale: "A red apple appears red because it reflects red wavelengths of light and absorbs others." },
                        { text: "The frequency of sound the object produces.", isCorrect: false, rationale: "Sound is not related to visible color." },
                        { text: "The temperature of the object.", isCorrect: false, rationale: "While very hot objects can glow, the color of most objects at room temperature is determined by reflection." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Which part of the electromagnetic spectrum is visible to the human eye?",
                    answerOptions: [
                        { text: "X-rays", isCorrect: false, rationale: "X-rays have too high a frequency to be seen." },
                        { text: "Visible light", isCorrect: true, rationale: "The visible spectrum (ROYGBIV) is the small portion of the electromagnetic spectrum that our eyes can detect." },
                        { text: "Microwaves", isCorrect: false, rationale: "Microwaves have too low a frequency to be seen." },
                        { text: "Infrared", isCorrect: false, rationale: "Infrared radiation is felt as heat but is not visible." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "The amplitude of a sound wave determines its:",
                    answerOptions: [
                        { text: "Pitch", isCorrect: false, rationale: "Pitch is determined by the frequency of the sound wave." },
                        { text: "Loudness (volume)", isCorrect: true, rationale: "A larger amplitude corresponds to a louder sound, as it carries more energy." },
                        { text: "Speed", isCorrect: false, rationale: "The speed of sound is determined by the medium." },
                        { text: "Timbre (quality)", isCorrect: false, rationale: "Timbre is determined by the complexity of the sound wave (overtones)." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>A lens that is thicker in the middle and thinner at the edges is a convex lens. It converges light rays to a focal point. A lens that is thinner in the middle and thicker at the edges is a concave lens, which diverges light rays.</p>",
                    question: "Which type of lens is used to correct farsightedness (hyperopia), where light focuses behind the retina?",
                    answerOptions: [
                        { text: "A concave lens, to spread the light out more.", isCorrect: false, rationale: "A concave lens would make the problem worse by diverging the light rays." },
                        { text: "A convex lens, to converge the light rays sooner.", isCorrect: true, rationale: "A convex lens helps bend the light more, allowing it to focus correctly on the retina." },
                        { text: "A flat lens, to not alter the light path.", isCorrect: false, rationale: "A flat piece of glass would not correct the vision problem." },
                        { text: "Either a concave or convex lens can work.", isCorrect: false, rationale: "Only a convex lens can correct farsightedness." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "The distance from the crest of one wave to the crest of the next wave is called the:",
                    answerOptions: [
                        { text: "Frequency", isCorrect: false, rationale: "Frequency is the number of waves per second." },
                        { text: "Amplitude", isCorrect: false, rationale: "Amplitude is the maximum displacement from the equilibrium position." },
                        { text: "Wavelength", isCorrect: true, rationale: "This is the definition of wavelength." },
                        { text: "Period", isCorrect: false, rationale: "Period is the time it takes for one full wave to pass." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "An echo is an example of sound waves being:",
                    answerOptions: [
                        { text: "Reflected", isCorrect: true, rationale: "An echo is a reflection of sound, arriving at the listener some time after the direct sound." },
                        { text: "Refracted", isCorrect: false, rationale: "Refraction is the bending of sound, not its bouncing back." },
                        { text: "Absorbed", isCorrect: false, rationale: "Absorption would prevent an echo." },
                        { text: "Diffracted", isCorrect: false, rationale: "Diffraction is the bending of sound around objects." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Which of the following requires a medium to travel?",
                    answerOptions: [
                        { text: "Light", isCorrect: false, rationale: "Light is an electromagnetic wave and can travel through a vacuum." },
                        { text: "Radio waves", isCorrect: false, rationale: "Radio waves are electromagnetic and can travel through a vacuum." },
                        { text: "X-rays", isCorrect: false, rationale: "X-rays are electromagnetic and can travel through a vacuum." },
                        { text: "Sound", isCorrect: true, rationale: "Sound is a mechanical wave and requires a medium (solid, liquid, or gas) to propagate." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The pitch of a sound is determined by the wave's:",
                    answerOptions: [
                        { text: "Amplitude", isCorrect: false, rationale: "Amplitude determines the loudness." },
                        { text: "Frequency", isCorrect: true, rationale: "A high frequency corresponds to a high pitch, and a low frequency corresponds to a low pitch." },
                        { text: "Speed", isCorrect: false, rationale: "The speed of sound depends on the medium." },
                        { text: "Wavelength", isCorrect: false, rationale: "Wavelength and frequency are related, but frequency is the direct determinant of pitch." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_waves_sound_light_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What is the top part of a transverse wave called?",
                    answerOptions: [
                        { text: "The trough", isCorrect: false, rationale: "The trough is the lowest point of the wave." },
                        { text: "The crest", isCorrect: true, rationale: "The crest is the highest point of a transverse wave." },
                        { text: "The amplitude", isCorrect: false, rationale: "The amplitude is the height of the crest from the equilibrium position." },
                        { text: "The wavelength", isCorrect: false, rationale: "The wavelength is the distance between two crests." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "All electromagnetic waves travel at the same speed in a vacuum. What is this speed called?",
                    answerOptions: [
                        { text: "The speed of sound", isCorrect: false, rationale: "The speed of sound is much slower than the speed of light." },
                        { text: "The speed of light", isCorrect: true, rationale: "All electromagnetic radiation, from radio waves to gamma rays, travels at the speed of light in a vacuum (approximately 300,000 km/s)." },
                        { text: "Mach 1", isCorrect: false, rationale: "Mach 1 is the speed of sound in air." },
                        { text: "Escape velocity", isCorrect: false, rationale: "Escape velocity is the speed needed to escape a planet's gravitational pull." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>In a longitudinal wave, the areas where the particles of the medium are spread apart are called rarefactions, and the areas where they are bunched together are called compressions.</p>",
                    question: "A sound wave is a longitudinal wave. What are the compressions in a sound wave?",
                    answerOptions: [
                        { text: "Areas of low pressure", isCorrect: false, rationale: "Areas of low pressure are rarefactions." },
                        { text: "Areas of high pressure", isCorrect: true, rationale: "Compressions are regions where the particles of the medium are crowded together, resulting in high pressure." },
                        { text: "Areas with no particles", isCorrect: false, rationale: "Sound cannot travel in areas with no particles (a vacuum)." },
                        { text: "Areas where the wave changes direction.", isCorrect: false, rationale: "This relates to refraction or diffraction, not compression." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "The phenomenon of a wave bending as it passes through a narrow opening or around an obstacle is known as:",
                    answerOptions: [
                        { text: "Reflection", isCorrect: false, rationale: "Reflection is the bouncing of a wave off a surface." },
                        { text: "Refraction", isCorrect: false, rationale: "Refraction is the bending of a wave as it enters a new medium." },
                        { text: "Interference", isCorrect: false, rationale: "Interference is when two waves overlap." },
                        { text: "Diffraction", isCorrect: true, rationale: "Diffraction explains why you can hear someone around a corner, as the sound waves bend around the corner." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which of the following has a longer wavelength than red light?",
                    answerOptions: [
                        { text: "Blue light", isCorrect: false, rationale: "Blue light has a shorter wavelength than red light." },
                        { text: "Ultraviolet (UV) light", isCorrect: false, rationale: "UV light has a shorter wavelength than visible light." },
                        { text: "Infrared radiation", isCorrect: true, rationale: "Infrared radiation is just beyond red light in the electromagnetic spectrum and has a longer wavelength." },
                        { text: "X-rays", isCorrect: false, rationale: "X-rays have a much shorter wavelength than visible light." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "A material that does not allow light to pass through it is described as:",
                    answerOptions: [
                        { text: "Transparent", isCorrect: false, rationale: "Transparent materials, like glass, allow light to pass through clearly." },
                        { text: "Translucent", isCorrect: false, rationale: "Translucent materials, like frosted glass, allow some light to pass through but scatter it." },
                        { text: "Opaque", isCorrect: true, rationale: "Opaque materials, like wood or metal, block all light from passing through." },
                        { text: "Reflective", isCorrect: false, rationale: "A reflective material bounces light off, but this doesn't describe its transparency." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "What property of a sound wave is most closely related to its pitch?",
                    answerOptions: [
                        { text: "Its amplitude", isCorrect: false, rationale: "Amplitude is related to loudness." },
                        { text: "Its frequency", isCorrect: true, rationale: "High frequency means a high pitch; low frequency means a low pitch." },
                        { text: "Its speed", isCorrect: false, rationale: "Speed depends on the medium." },
                        { text: "Its phase", isCorrect: false, rationale: "Phase relates to the position of a point in time on a waveform cycle." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>When light strikes a smooth surface, like a mirror, it undergoes specular reflection, where all light rays bounce off at the same angle, creating a clear image. When light strikes a rough surface, it undergoes diffuse reflection, where light rays scatter in many different directions.</p>",
                    question: "Why can't you see your reflection in a piece of paper?",
                    answerOptions: [
                        { text: "The paper undergoes specular reflection.", isCorrect: false, rationale: "Specular reflection would create a clear image." },
                        { text: "The paper absorbs all the light.", isCorrect: false, rationale: "The paper reflects light, which is why we can see it, but it doesn't absorb all of it." },
                        { text: "The paper's rough surface causes diffuse reflection.", isCorrect: true, rationale: "The surface of the paper, though it seems smooth, is rough on a microscopic level, causing light to scatter instead of forming a coherent image." },
                        { text: "The paper refracts the light instead of reflecting it.", isCorrect: false, rationale: "The paper is opaque and primarily reflects light." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "A lens that is thinner in the middle and thicker at the edges is a:",
                    answerOptions: [
                        { text: "Convex lens", isCorrect: false, rationale: "A convex lens is thicker in the middle." },
                        { text: "Concave lens", isCorrect: true, rationale: "This describes a concave lens, which causes light rays to spread out or diverge." },
                        { text: "Plane lens", isCorrect: false, rationale: "A plane lens would be a flat piece of glass." },
                        { text: "Bifocal lens", isCorrect: false, rationale: "A bifocal lens has two different types of lens sections." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What is the unit for measuring the loudness of sound?",
                    answerOptions: [
                        { text: "Hertz (Hz)", isCorrect: false, rationale: "Hertz is the unit for frequency." },
                        { text: "Decibel (dB)", isCorrect: true, rationale: "The decibel scale is used to measure sound intensity, which we perceive as loudness." },
                        { text: "Meter (m)", isCorrect: false, rationale: "A meter is a unit of distance." },
                        { text: "Watt (W)", isCorrect: false, rationale: "A watt is a unit of power." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "Which of these colors of visible light has the shortest wavelength?",
                    answerOptions: [
                        { text: "Red", isCorrect: false, rationale: "Red has the longest wavelength in the visible spectrum." },
                        { text: "Green", isCorrect: false, rationale: "Green has a wavelength shorter than red but longer than violet." },
                        { text: "Yellow", isCorrect: false, rationale: "Yellow has a wavelength between red and green." },
                        { text: "Violet", isCorrect: true, rationale: "Violet has the shortest wavelength and highest frequency in the visible spectrum." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Constructive interference occurs when:",
                    answerOptions: [
                        { text: "The crest of one wave overlaps with the trough of another, canceling each other out.", isCorrect: false, rationale: "This is destructive interference." },
                        { text: "The crest of one wave overlaps with the crest of another, resulting in a wave with a larger amplitude.", isCorrect: true, rationale: "Constructive interference reinforces the waves, making them 'bigger'." },
                        { text: "A wave bounces off a surface.", isCorrect: false, rationale: "This is reflection." },
                        { text: "A wave bends around an object.", isCorrect: false, rationale: "This is diffraction." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Why does a straw in a glass of water appear to be bent?",
                    answerOptions: [
                        { text: "Because of the reflection of light off the water's surface.", isCorrect: false, rationale: "Reflection would show an image on the surface, not make the straw look bent." },
                        { text: "Because of the refraction of light as it passes from water to air.", isCorrect: true, rationale: "The light from the straw bends as it exits the water, creating a visual distortion that makes the straw appear bent at the water line." },
                        { text: "Because of the diffraction of light around the straw.", isCorrect: false, rationale: "Diffraction effects would be too small to notice in this context." },
                        { text: "Because the water absorbs the light from the straw.", isCorrect: false, rationale: "Absorption would make the straw harder to see, not bent." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Which of the following is NOT an electromagnetic wave?",
                    answerOptions: [
                        { text: "Microwaves", isCorrect: false, rationale: "Microwaves are part of the electromagnetic spectrum." },
                        { text: "Visible light", isCorrect: false, rationale: "Visible light is part of the electromagnetic spectrum." },
                        { text: "Sound waves", isCorrect: true, rationale: "Sound waves are mechanical waves that require a medium; they are not electromagnetic." },
                        { text: "Radio waves", isCorrect: false, rationale: "Radio waves are part of the electromagnetic spectrum." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The energy of a wave is most directly related to its:",
                    answerOptions: [
                        { text: "Wavelength", isCorrect: false, rationale: "Wavelength is inversely related to energy." },
                        { text: "Speed", isCorrect: false, rationale: "Wave speed depends on the medium." },
                        { text: "Amplitude", isCorrect: true, rationale: "For a mechanical wave, energy is proportional to the square of the amplitude. For an electromagnetic wave, energy is related to frequency, which in turn relates to amplitude." },
                        { text: "Direction", isCorrect: false, rationale: "The direction of travel does not determine the energy." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_waves_sound_light_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "A wave's frequency is the measure of:",
                    answerOptions: [
                        { text: "How tall the wave is.", isCorrect: false, rationale: "This describes the amplitude." },
                        { text: "How long the wave is.", isCorrect: false, rationale: "This describes the wavelength." },
                        { text: "How many wave cycles pass a point per second.", isCorrect: true, rationale: "This is the definition of frequency, measured in Hertz (Hz)." },
                        { text: "How fast the wave is traveling.", isCorrect: false, rationale: "This is the wave's speed." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "In a vacuum, which of these travels the fastest?",
                    answerOptions: [
                        { text: "A sound wave", isCorrect: false, rationale: "Sound cannot travel in a vacuum." },
                        { text: "A radio wave", isCorrect: false, rationale: "While fast, it travels at the same speed as all other EM waves." },
                        { text: "A light wave", isCorrect: false, rationale: "While fast, it travels at the same speed as all other EM waves." },
                        { text: "All of the above (excluding sound) travel at the same speed.", isCorrect: true, rationale: "All electromagnetic waves (radio, light, etc.) travel at the speed of light in a vacuum." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "What is the lowest point of a transverse wave called?",
                    answerOptions: [
                        { text: "The crest", isCorrect: false, rationale: "The crest is the highest point." },
                        { text: "The trough", isCorrect: true, rationale: "The lowest point of a transverse wave is the trough." },
                        { text: "The baseline", isCorrect: false, rationale: "The baseline or equilibrium is the rest position." },
                        { text: "The amplitude", isCorrect: false, rationale: "The amplitude is the distance from the baseline to the trough." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The Doppler effect is the change in frequency of a wave in relation to an observer who is moving relative to the wave source. A common example is the change in pitch of a siren as an ambulance passes you: the pitch is higher as it approaches and lower as it moves away.</p>",
                    question: "According to the Doppler effect, what happens to the frequency of a sound wave as the source of the sound moves towards you?",
                    answerOptions: [
                        { text: "The frequency decreases.", isCorrect: false, rationale: "The frequency decreases as the source moves away." },
                        { text: "The frequency increases.", isCorrect: true, rationale: "As the source approaches, the sound waves are compressed, leading to a higher frequency and a higher perceived pitch." },
                        { text: "The frequency remains unchanged.", isCorrect: false, rationale: "The Doppler effect describes the change in frequency." },
                        { text: "The wave stops.", isCorrect: false, rationale: "The wave continues to travel." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which type of electromagnetic radiation is used in TV remote controls?",
                    answerOptions: [
                        { text: "Ultraviolet (UV)", isCorrect: false, rationale: "UV light is not used for this purpose." },
                        { text: "X-rays", isCorrect: false, rationale: "X-rays are high-energy radiation and are not used in remotes." },
                        { text: "Infrared (IR)", isCorrect: true, rationale: "Infrared LEDs are commonly used in remote controls to transmit signals." },
                        { text: "Gamma rays", isCorrect: false, rationale: "Gamma rays are the most energetic and are not used in remotes." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "A black t-shirt appears black because it:",
                    answerOptions: [
                        { text: "Reflects all colors of light.", isCorrect: false, rationale: "An object that reflects all colors appears white." },
                        { text: "Absorbs all colors of light.", isCorrect: true, rationale: "A black object absorbs most of the light that hits it, reflecting very little, which is why it appears dark." },
                        { text: "Refracts all colors of light.", isCorrect: false, rationale: "Refraction is the bending of light, not absorption." },
                        { text: "Transmits all colors of light.", isCorrect: false, rationale: "A transparent object transmits light." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "Which of the following would be an example of a transverse wave?",
                    answerOptions: [
                        { text: "A sound wave from a speaker.", isCorrect: false, rationale: "Sound waves are longitudinal." },
                        { text: "A ripple in a pond.", isCorrect: true, rationale: "The water moves up and down while the wave travels outwards, which is characteristic of a transverse wave." },
                        { text: "The compression of a spring.", isCorrect: false, rationale: "This demonstrates a longitudinal wave." },
                        { text: "An earthquake P-wave.", isCorrect: false, rationale: "P-waves (primary waves) are longitudinal." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "A farsighted person has difficulty seeing objects that are close. What type of lens would correct this?",
                    answerOptions: [
                        { text: "A concave lens", isCorrect: false, rationale: "A concave lens is used to correct nearsightedness." },
                        { text: "A convex lens", isCorrect: true, rationale: "A convex (converging) lens helps focus the light from nearby objects onto the retina." },
                        { text: "A polarized lens", isCorrect: false, rationale: "Polarized lenses reduce glare but do not correct focus." },
                        { text: "A dark lens", isCorrect: false, rationale: "A dark lens reduces brightness but does not correct focus." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "text",
                    passage: "<p>The relationship between a wave's speed (v), frequency (f), and wavelength (λ) is given by the formula v = f × λ. This means that for a constant speed, frequency and wavelength are inversely proportional.</p>",
                    question: "If the frequency of a wave increases while its speed stays the same, what happens to its wavelength?",
                    answerOptions: [
                        { text: "The wavelength increases.", isCorrect: false, rationale: "Since they are inversely proportional, if frequency goes up, wavelength must go down." },
                        { text: "The wavelength decreases.", isCorrect: true, rationale: "To keep the speed constant, if you increase the frequency (more waves per second), the length of each wave must get shorter." },
                        { text: "The wavelength stays the same.", isCorrect: false, rationale: "This would mean the speed has to change." },
                        { text: "The wavelength becomes zero.", isCorrect: false, rationale: "The wavelength will decrease but not necessarily to zero." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What is the primary purpose of the lens in the human eye?",
                    answerOptions: [
                        { text: "To detect color.", isCorrect: false, rationale: "Color is detected by cone cells in the retina." },
                        { text: "To focus light onto the retina.", isCorrect: true, rationale: "The lens, along with the cornea, acts to refract and focus incoming light onto the retina at the back of the eye." },
                        { text: "To control the amount of light entering the eye.", isCorrect: false, rationale: "This is the job of the iris and pupil." },
                        { text: "To convert light into electrical signals.", isCorrect: false, rationale: "This is done by photoreceptor cells (rods and cones) in the retina." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "When white light passes through a prism, it separates into a spectrum of colors. This phenomenon is called:",
                    answerOptions: [
                        { text: "Dispersion", isCorrect: true, rationale: "Dispersion is the splitting of white light into its constituent colors because each color (wavelength) is refracted by a slightly different amount." },
                        { text: "Reflection", isCorrect: false, rationale: "Reflection is the bouncing of light." },
                        { text: "Diffraction", isCorrect: false, rationale: "Diffraction is the bending of light around an obstacle." },
                        { text: "Interference", isCorrect: false, rationale: "Interference is the combination of two or more waves." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "A wave transfers _______ from one place to another.",
                    answerOptions: [
                        { text: "Matter", isCorrect: false, rationale: "Waves transfer energy through matter, but the matter itself does not travel with the wave." },
                        { text: "Energy", isCorrect: true, rationale: "The fundamental purpose of a wave is to transfer energy." },
                        { text: "Mass", isCorrect: false, rationale: "Mass and matter are closely related; waves do not transfer mass." },
                        { text: "Particles", isCorrect: false, rationale: "Particles of the medium vibrate, but they do not travel along with the wave." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Which of the following is true about sound?",
                    answerOptions: [
                        { text: "It travels faster in a vacuum than in air.", isCorrect: false, rationale: "Sound cannot travel in a vacuum." },
                        { text: "It travels at the same speed as light.", isCorrect: false, rationale: "Sound is much, much slower than light." },
                        { text: "It is a form of mechanical energy.", isCorrect: true, rationale: "Sound is a mechanical wave, which is a form of mechanical energy that propagates through a medium." },
                        { text: "It is a transverse wave.", isCorrect: false, rationale: "Sound is a longitudinal wave." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Which of these devices works by converting sound waves into electrical signals?",
                    answerOptions: [
                        { text: "A speaker", isCorrect: false, rationale: "A speaker does the opposite; it converts electrical signals into sound waves." },
                        { text: "A microphone", isCorrect: true, rationale: "A microphone has a diaphragm that vibrates in response to sound waves, and this movement is converted into an electrical signal." },
                        { text: "A light bulb", isCorrect: false, rationale: "A light bulb converts electrical energy into light and heat." },
                        { text: "A lens", isCorrect: false, rationale: "A lens focuses light." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The range of human hearing is typically limited by what property of sound?",
                    answerOptions: [
                        { text: "Loudness (Amplitude)", isCorrect: false, rationale: "While there is a threshold of hearing, the primary range is defined by frequency." },
                        { text: "Pitch (Frequency)", isCorrect: true, rationale: "Humans can typically hear sounds in the frequency range of about 20 Hz to 20,000 Hz." },
                        { text: "Speed", isCorrect: false, rationale: "The speed of sound does not limit our range of hearing." },
                        { text: "Direction", isCorrect: false, rationale: "We can hear sounds from all directions." }
                    ]
                }
            ]
        }
    ]
};
// Science -> Earth & Space Science -> Earth's Systems & Resources
AppData.quizzes.sci_earth_systems = {
    id: "sci_earth_systems",
    title: "Earth's Systems & Resources",
    description: "The rock cycle, plate tectonics, weather, and natural resources.",
    quizzes: [
        {
            quizId: "sci_earth_systems_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What are the three main types of rock in the rock cycle?",
                    answerOptions: [
                        { text: "Hard, Soft, and Brittle", isCorrect: false, rationale: "These are properties of rocks, not the main types." },
                        { text: "Igneous, Sedimentary, and Metamorphic", isCorrect: true, rationale: "These are the three major classifications of rocks based on their formation." },
                        { text: "Volcanic, Tectonic, and Oceanic", isCorrect: false, rationale: "These terms relate to geological processes and locations, not the primary rock types." },
                        { text: "Sandstone, Limestone, and Granite", isCorrect: false, rationale: "These are specific examples of the three main types, not the types themselves." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "text",
                    passage: "<p>Igneous rock is formed from the cooling and solidification of molten rock (magma or lava). When this cooling happens below the Earth's surface, it is called intrusive igneous rock. When it happens on the surface, often from a volcanic eruption, it is called extrusive igneous rock.</p>",
                    question: "A rock that forms from lava cooling on the Earth's surface is classified as:",
                    answerOptions: [
                        { text: "Intrusive igneous", isCorrect: false, rationale: "Intrusive igneous rock cools slowly beneath the surface." },
                        { text: "Extrusive igneous", isCorrect: true, rationale: "Extrusive igneous rock forms from the rapid cooling of lava on the surface." },
                        { text: "Sedimentary", isCorrect: false, rationale: "Sedimentary rock is formed from the compaction of sediments." },
                        { text: "Metamorphic", isCorrect: false, rationale: "Metamorphic rock is formed by heat and pressure changing existing rock." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The theory of plate tectonics states that the Earth's lithosphere is divided into large plates that move. What is the primary cause of this movement?",
                    answerOptions: [
                        { text: "The gravitational pull of the Moon.", isCorrect: false, rationale: "The Moon's gravity primarily causes tides, not plate movement." },
                        { text: "Convection currents in the mantle.", isCorrect: true, rationale: "Heat from the Earth's core creates convection currents in the molten mantle, which drag the tectonic plates above them." },
                        { text: "Wind and water erosion on the surface.", isCorrect: false, rationale: "Erosion shapes the surface but does not move the massive tectonic plates." },
                        { text: "The rotation of the Earth on its axis.", isCorrect: false, rationale: "The Earth's rotation has other effects (like the Coriolis effect) but is not the main driver of plate tectonics." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "Which of the following is an example of a renewable resource?",
                    answerOptions: [
                        { text: "Coal", isCorrect: false, rationale: "Coal is a fossil fuel and is non-renewable because it takes millions of years to form." },
                        { text: "Natural Gas", isCorrect: false, rationale: "Natural gas is a non-renewable fossil fuel." },
                        { text: "Petroleum (Oil)", isCorrect: false, rationale: "Oil is a non-renewable fossil fuel." },
                        { text: "Solar energy", isCorrect: true, rationale: "Solar energy comes from the sun and is considered renewable because it will not run out for billions of years." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What process in the rock cycle is responsible for breaking down rocks into smaller pieces called sediment?",
                    answerOptions: [
                        { text: "Compaction", isCorrect: false, rationale: "Compaction is the process of pressing sediments together." },
                        { text: "Melting", isCorrect: false, rationale: "Melting turns rock into magma." },
                        { text: "Weathering and erosion", isCorrect: true, rationale: "Weathering is the breakdown of rock, and erosion is the movement of the resulting sediment." },
                        { text: "Metamorphism", isCorrect: false, rationale: "Metamorphism changes a rock's form through heat and pressure." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "text",
                    passage: "<p>The Earth's atmosphere is composed of several layers. The layer closest to the Earth's surface, where most weather occurs, is called the troposphere.</p>",
                    question: "In which layer of the atmosphere do we experience weather phenomena like clouds, rain, and wind?",
                    answerOptions: [
                        { text: "The Stratosphere", isCorrect: false, rationale: "The stratosphere is above the troposphere and contains the ozone layer." },
                        { text: "The Mesosphere", isCorrect: false, rationale: "The mesosphere is above the stratosphere and is where most meteors burn up." },
                        { text: "The Thermosphere", isCorrect: false, rationale: "The thermosphere is a very high layer with extremely thin air." },
                        { text: "The Troposphere", isCorrect: true, rationale: "The troposphere is the lowest layer of the atmosphere and is where virtually all weather takes place." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "A boundary where two tectonic plates are moving away from each other is called a:",
                    answerOptions: [
                        { text: "Convergent boundary", isCorrect: false, rationale: "At a convergent boundary, plates move towards each other." },
                        { text: "Transform boundary", isCorrect: false, rationale: "At a transform boundary, plates slide past each other." },
                        { text: "Divergent boundary", isCorrect: true, rationale: "Divergent boundaries are where plates pull apart, often creating new crust." },
                        { text: "Subduction zone", isCorrect: false, rationale: "A subduction zone is a type of convergent boundary where one plate goes under another." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "Sedimentary rocks are formed from:",
                    answerOptions: [
                        { text: "The cooling of magma.", isCorrect: false, rationale: "This process forms igneous rocks." },
                        { text: "Heat and pressure acting on existing rocks.", isCorrect: false, rationale: "This process forms metamorphic rocks." },
                        { text: "The compaction and cementation of sediments.", isCorrect: true, rationale: "Layers of sediment (like sand, silt, or dead organisms) are pressed together over time to form sedimentary rock." },
                        { text: "Volcanic eruptions.", isCorrect: false, rationale: "Volcanic eruptions produce extrusive igneous rocks." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Which of the following natural events is most directly caused by the movement of tectonic plates?",
                    answerOptions: [
                        { text: "Hurricanes", isCorrect: false, rationale: "Hurricanes are weather phenomena formed over warm ocean waters." },
                        { text: "Tornadoes", isCorrect: false, rationale: "Tornadoes are weather phenomena related to severe thunderstorms." },
                        { text: "Earthquakes", isCorrect: true, rationale: "Earthquakes are caused by the sudden release of energy when tectonic plates slip past one another." },
                        { text: "Floods", isCorrect: false, rationale: "Floods are caused by excessive rainfall or overflowing bodies of water." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>The water cycle describes the continuous movement of water on, above, and below the surface of the Earth. Key processes include evaporation, condensation, precipitation, and collection.</p>",
                    question: "What is the process called when water vapor in the atmosphere cools and turns back into liquid water, forming clouds?",
                    answerOptions: [
                        { text: "Evaporation", isCorrect: false, rationale: "Evaporation is the process of liquid water turning into water vapor." },
                        { text: "Precipitation", isCorrect: false, rationale: "Precipitation is when water (rain, snow) falls from clouds to the Earth." },
                        { text: "Condensation", isCorrect: true, rationale: "Condensation is the phase change from a gas (water vapor) to a liquid (water droplets), which is how clouds are formed." },
                        { text: "Transpiration", isCorrect: false, rationale: "Transpiration is the release of water vapor from plants." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "Fossil fuels like coal and oil are considered non-renewable because:",
                    answerOptions: [
                        { text: "They are too expensive to extract.", isCorrect: false, rationale: "While extraction can be costly, the primary reason is their formation time." },
                        { text: "They take millions of years to form.", isCorrect: true, rationale: "We consume them far faster than they are created, making them a finite resource." },
                        { text: "They are harmful to the environment.", isCorrect: false, rationale: "While their use can be harmful, this doesn't define them as non-renewable." },
                        { text: "They are found in very few locations.", isCorrect: false, rationale: "While not found everywhere, they are widely distributed, but the supply is limited." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Metamorphic rock is formed under what conditions?",
                    answerOptions: [
                        { text: "Rapid cooling of lava.", isCorrect: false, rationale: "This forms extrusive igneous rock." },
                        { text: "Deposition and burial of sediment.", isCorrect: false, rationale: "This forms sedimentary rock." },
                        { text: "Intense heat and pressure.", isCorrect: true, rationale: "Heat and pressure deep within the Earth's crust can change the structure and mineral composition of existing rocks to form metamorphic rock." },
                        { text: "Radioactive decay of elements.", isCorrect: false, rationale: "Radioactive decay contributes to the Earth's internal heat but is not the direct process of metamorphism." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "What is the name of the supercontinent that is theorized to have existed about 300 million years ago?",
                    answerOptions: [
                        { text: "Gondwana", isCorrect: false, rationale: "Gondwana was a major part of this supercontinent, but not the entire thing." },
                        { text: "Laurasia", isCorrect: false, rationale: "Laurasia was the other major part of this supercontinent." },
                        { text: "Pangaea", isCorrect: true, rationale: "Pangaea was the massive supercontinent that later broke apart to form the continents we know today." },
                        { text: "Eurasia", isCorrect: false, rationale: "Eurasia is the combined landmass of Europe and Asia." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "text",
                    passage: "<p>The Earth's four major systems are the geosphere (land), hydrosphere (water), atmosphere (air), and biosphere (life). These systems interact with each other in complex ways.</p>",
                    question: "A plant absorbing water from the soil is an example of an interaction between which two Earth systems?",
                    answerOptions: [
                        { text: "Atmosphere and Geosphere", isCorrect: false, rationale: "This interaction does not primarily involve the atmosphere." },
                        { text: "Biosphere and Hydrosphere", isCorrect: true, rationale: "A plant (biosphere) is taking in water (hydrosphere)." },
                        { text: "Geosphere and Hydrosphere", isCorrect: false, rationale: "This describes the interaction of land and water, but doesn't include the living plant." },
                        { text: "Atmosphere and Biosphere", isCorrect: false, rationale: "This would be an interaction like breathing or photosynthesis involving air." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Which of these is a major greenhouse gas that contributes to global warming?",
                    answerOptions: [
                        { text: "Oxygen (O₂)", isCorrect: false, rationale: "Oxygen is essential for respiration but is not a significant greenhouse gas." },
                        { text: "Nitrogen (N₂)", isCorrect: false, rationale: "Nitrogen makes up most of our atmosphere but is not a greenhouse gas." },
                        { text: "Carbon Dioxide (CO₂)", isCorrect: true, rationale: "Carbon dioxide, released from burning fossil fuels and other processes, is a primary greenhouse gas that traps heat in the atmosphere." },
                        { text: "Argon (Ar)", isCorrect: false, rationale: "Argon is an inert gas and not a greenhouse gas." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_earth_systems_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which type of rock is formed from the shells and skeletons of marine organisms?",
                    answerOptions: [
                        { text: "Granite, an igneous rock", isCorrect: false, rationale: "Granite is an igneous rock formed from cooled magma." },
                        { text: "Limestone, a sedimentary rock", isCorrect: true, rationale: "Limestone is often formed from the accumulation of calcium carbonate from shells and skeletons." },
                        { text: "Marble, a metamorphic rock", isCorrect: false, rationale: "Marble is formed when limestone is subjected to heat and pressure." },
                        { text: "Obsidian, an igneous rock", isCorrect: false, rationale: "Obsidian is volcanic glass, an extrusive igneous rock." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "What is the process of water movement through a plant and its evaporation from leaves, stems, and flowers?",
                    answerOptions: [
                        { text: "Condensation", isCorrect: false, rationale: "Condensation is the process of water vapor turning into liquid." },
                        { text: "Precipitation", isCorrect: false, rationale: "Precipitation is water falling from the atmosphere." },
                        { text: "Transpiration", isCorrect: true, rationale: "Transpiration is essentially evaporation of water from plant leaves." },
                        { text: "Infiltration", isCorrect: false, rationale: "Infiltration is the process of water on the ground surface entering the soil." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The 'Ring of Fire' is a major area in the basin of the Pacific Ocean where a large number of earthquakes and volcanic eruptions occur. This is caused by:",
                    answerOptions: [
                        { text: "Frequent hurricanes and typhoons.", isCorrect: false, rationale: "These are atmospheric phenomena, not geological." },
                        { text: "The convergence and subduction of tectonic plates.", isCorrect: true, rationale: "The Ring of Fire is defined by active plate boundaries, particularly subduction zones where one plate is forced under another." },
                        { text: "Deep ocean currents.", isCorrect: false, rationale: "Ocean currents do not cause volcanic activity or earthquakes." },
                        { text: "Magnetic field reversals.", isCorrect: false, rationale: "Magnetic reversals are a separate geological phenomenon recorded in rocks." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>Weathering is the breaking down of rocks at the Earth's surface. Chemical weathering involves a chemical change in at least some of the minerals within a rock. Mechanical (or physical) weathering involves physically breaking rocks into smaller fragments without changing their chemical composition.</p>",
                    question: "The formation of rust on an iron-rich rock is an example of what process?",
                    answerOptions: [
                        { text: "Mechanical weathering", isCorrect: false, rationale: "Mechanical weathering would be breaking the rock without a chemical change." },
                        { text: "Chemical weathering", isCorrect: true, rationale: "Rusting (oxidation) is a chemical reaction that changes the composition of the minerals." },
                        { text: "Erosion", isCorrect: false, rationale: "Erosion is the transport of the weathered material, not the breakdown itself." },
                        { text: "Deposition", isCorrect: false, rationale: "Deposition is the settling of sediment." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What is the solid, central part of the Earth called?",
                    answerOptions: [
                        { text: "The crust", isCorrect: false, rationale: "The crust is the thin, outermost layer." },
                        { text: "The mantle", isCorrect: false, rationale: "The mantle is the thick layer between the crust and the core." },
                        { text: "The outer core", isCorrect: false, rationale: "The outer core is liquid." },
                        { text: "The inner core", isCorrect: true, rationale: "The inner core is a dense, solid ball of iron and nickel." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Which of the following is NOT a fossil fuel?",
                    answerOptions: [
                        { text: "Coal", isCorrect: false, rationale: "Coal is a fossil fuel formed from ancient plant matter." },
                        { text: "Oil", isCorrect: false, rationale: "Oil (petroleum) is a fossil fuel formed from ancient marine organisms." },
                        { text: "Uranium", isCorrect: true, rationale: "Uranium is a metal mined from the Earth and used for nuclear power; it is not a fossil fuel." },
                        { text: "Natural Gas", isCorrect: false, rationale: "Natural gas is a fossil fuel often found with oil." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "The process by which rock, sand, and soil are broken down and carried away is called:",
                    answerOptions: [
                        { text: "Metamorphism", isCorrect: false, rationale: "Metamorphism is the changing of rock by heat and pressure." },
                        { text: "Erosion", isCorrect: true, rationale: "Erosion involves the transport of weathered materials by agents like wind, water, and ice." },
                        { text: "Subduction", isCorrect: false, rationale: "Subduction is a tectonic process where one plate moves under another." },
                        { text: "Solidification", isCorrect: false, rationale: "Solidification is the process of liquid turning to solid, like magma cooling." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>The ozone layer, located in the stratosphere, is crucial for life on Earth. It absorbs the majority of the Sun's harmful ultraviolet (UV) radiation.</p>",
                    question: "What is the primary function of the ozone layer?",
                    answerOptions: [
                        { text: "To regulate the Earth's temperature.", isCorrect: false, rationale: "While it has some effect, its primary role is not temperature regulation, which is more related to greenhouse gases." },
                        { text: "To protect life from harmful UV radiation.", isCorrect: true, rationale: "The ozone layer acts as a shield, absorbing most of the dangerous UV-B and UV-C rays." },
                        { text: "To create weather patterns.", isCorrect: false, rationale: "Weather occurs in the troposphere, below the ozone layer." },
                        { text: "To trap meteors.", isCorrect: false, rationale: "Meteors typically burn up in the mesosphere, above the ozone layer." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "A transform boundary is a type of plate boundary where two plates:",
                    answerOptions: [
                        { text: "Collide with each other.", isCorrect: false, rationale: "This is a convergent boundary." },
                        { text: "Move away from each other.", isCorrect: false, rationale: "This is a divergent boundary." },
                        { text: "Slide horizontally past each other.", isCorrect: true, rationale: "The San Andreas Fault is a famous example of a transform boundary." },
                        { text: "Are stationary.", isCorrect: false, rationale: "Tectonic plates are constantly in motion." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "Which of the following is a key component of the hydrosphere?",
                    answerOptions: [
                        { text: "Rocks", isCorrect: false, rationale: "Rocks are part of the geosphere." },
                        { text: "Animals", isCorrect: false, rationale: "Animals are part of the biosphere." },
                        { text: "Oceans", isCorrect: true, rationale: "The hydrosphere includes all water on Earth, with oceans being the largest component." },
                        { text: "The atmosphere", isCorrect: false, rationale: "The atmosphere is its own Earth system." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "What is the primary source of energy that drives the water cycle?",
                    answerOptions: [
                        { text: "Geothermal heat from the Earth's core", isCorrect: false, rationale: "Geothermal heat drives plate tectonics, but not the water cycle." },
                        { text: "The Sun", isCorrect: true, rationale: "Solar energy drives evaporation, the process that lifts water into the atmosphere to begin the cycle." },
                        { text: "The Moon's gravity", isCorrect: false, rationale: "The Moon's gravity drives tides." },
                        { text: "Wind energy", isCorrect: false, rationale: "Wind is part of the weather system driven by solar energy, but the sun is the ultimate source." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "An aquifer is:",
                    answerOptions: [
                        { text: "An underground layer of rock or sediment that holds water.", isCorrect: true, rationale: "Aquifers are significant sources of groundwater for wells and springs." },
                        { text: "A large body of water on the surface, like a lake.", isCorrect: false, rationale: "This is a surface water body, not an aquifer." },
                        { text: "A type of cloud that produces rain.", isCorrect: false, rationale: "This describes a nimbus cloud." },
                        { text: "A river that flows into the ocean.", isCorrect: false, rationale: "This is a river or estuary." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Wind, water, and ice are all agents of:",
                    answerOptions: [
                        { text: "Metamorphism", isCorrect: false, rationale: "Metamorphism is caused by heat and pressure." },
                        { text: "Erosion", isCorrect: true, rationale: "These are the primary natural forces that transport weathered rock and soil." },
                        { text: "Fossilization", isCorrect: false, rationale: "Fossilization is the process of preserving remains." },
                        { text: "Plate tectonics", isCorrect: false, rationale: "Plate tectonics is the movement of the Earth's crust." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "text",
                    passage: "<p>The Earth's axis is tilted at approximately 23.5 degrees. This tilt is the primary reason for the seasons. When the Northern Hemisphere is tilted towards the Sun, it experiences summer, while the Southern Hemisphere experiences winter.</p>",
                    question: "What is the main cause of the Earth's seasons?",
                    answerOptions: [
                        { text: "The distance of the Earth from the Sun.", isCorrect: false, rationale: "The Earth's orbit is elliptical, but this distance variation is not the main cause of seasons." },
                        { text: "The tilt of the Earth's axis.", isCorrect: true, rationale: "The axial tilt causes different parts of the Earth to receive more direct sunlight at different times of the year." },
                        { text: "The amount of cloud cover.", isCorrect: false, rationale: "Cloud cover is a factor in weather, not the cause of the yearly seasonal cycle." },
                        { text: "Ocean currents.", isCorrect: false, rationale: "Ocean currents distribute heat but do not cause the seasons." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Which of these energy sources is considered a form of biomass energy?",
                    answerOptions: [
                        { text: "Wind power", isCorrect: false, rationale: "Wind power is derived from the movement of air." },
                        { text: "Geothermal power", isCorrect: false, rationale: "Geothermal power comes from the Earth's internal heat." },
                        { text: "Hydropower", isCorrect: false, rationale: "Hydropower is derived from the movement of water." },
                        { text: "Wood", isCorrect: true, rationale: "Biomass energy is derived from organic matter, such as wood, crops, and waste." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_earth_systems_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "A rock formed by the alteration of pre-existing rock by heat, pressure, or chemical activity is a(n) _________ rock.",
                    answerOptions: [
                        { text: "Igneous", isCorrect: false, rationale: "Igneous rock is formed from cooled magma or lava." },
                        { text: "Sedimentary", isCorrect: false, rationale: "Sedimentary rock is formed from compacted sediment." },
                        { text: "Metamorphic", isCorrect: true, rationale: "This is the definition of a metamorphic rock, such as marble or slate." },
                        { text: "Volcanic", isCorrect: false, rationale: "Volcanic rock is another term for extrusive igneous rock." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "What is the name of the process in which water soaks into the ground, moving into soil and rock?",
                    answerOptions: [
                        { text: "Runoff", isCorrect: false, rationale: "Runoff is water that flows over the land surface." },
                        { text: "Condensation", isCorrect: false, rationale: "Condensation is the formation of clouds." },
                        { text: "Infiltration", isCorrect: true, rationale: "Infiltration is the process of water entering the ground, which recharges groundwater." },
                        { text: "Evaporation", isCorrect: false, rationale: "Evaporation is water turning into vapor and rising." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "Subduction occurs at which type of plate boundary?",
                    answerOptions: [
                        { text: "Divergent boundary", isCorrect: false, rationale: "At divergent boundaries, plates move apart." },
                        { text: "Convergent boundary", isCorrect: true, rationale: "Subduction happens when two plates collide and one, typically the denser oceanic plate, is forced beneath the other." },
                        { text: "Transform boundary", isCorrect: false, rationale: "At transform boundaries, plates slide past one another." },
                        { text: "All of the above", isCorrect: false, rationale: "Subduction is specific to convergent boundaries." }
                    ]
                },
                {
                    questionNumber: 4,

                  type: "text",
                    passage: "<p>Renewable resources can be replenished naturally over a relatively short period. Non-renewable resources exist in a fixed amount or are used up faster than they can be replaced.</p>",
                    question: "Which of the following resources is considered non-renewable?",
                    answerOptions: [
                        { text: "Wind", isCorrect: false, rationale: "Wind is a renewable resource driven by solar energy." },
                        { text: "Natural gas", isCorrect: true, rationale: "Natural gas is a fossil fuel that takes millions of years to form, making it non-renewable." },
                        { text: "Water", isCorrect: false, rationale: "Water is considered a renewable resource through the water cycle, although fresh water is limited." },
                        { text: "Sunlight", isCorrect: false, rationale: "Sunlight is the ultimate renewable resource." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The mechanical weathering of rock by the freezing and thawing of water in cracks is known as:",
                    answerOptions: [
                        { text: "Oxidation", isCorrect: false, rationale: "Oxidation is a form of chemical weathering." },
                        { text: "Abrasion", isCorrect: false, rationale: "Abrasion is weathering by scraping or grinding." },
                        { text: "Frost wedging", isCorrect: true, rationale: "Water expands when it freezes, exerting pressure that can break rocks apart." },
                        { text: "Acid rain", isCorrect: false, rationale: "Acid rain is a form of chemical weathering." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Which layer of the Earth is composed mainly of liquid iron and nickel?",
                    answerOptions: [
                        { text: "The crust", isCorrect: false, rationale: "The crust is made of solid rock." },
                        { text: "The mantle", isCorrect: false, rationale: "The mantle is composed of semi-molten rock (magma)." },
                        { text: "The outer core", isCorrect: true, rationale: "The outer core's liquid nature and composition are responsible for generating Earth's magnetic field." },
                        { text: "The inner core", isCorrect: false, rationale: "The inner core is solid due to immense pressure." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "Rain, snow, sleet, and hail are all forms of:",
                    answerOptions: [
                        { text: "Condensation", isCorrect: false, rationale: "Condensation is the formation of clouds." },
                        { text: "Evaporation", isCorrect: false, rationale: "Evaporation is water turning into vapor." },
                        { text: "Precipitation", isCorrect: true, rationale: "Precipitation is any form of water that falls from the atmosphere to the Earth's surface." },
                        { text: "Collection", isCorrect: false, rationale: "Collection is when water gathers in bodies like oceans or lakes." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>The Earth's geosphere includes the solid rock, soil, and sediments that make up the planet's landmasses. It also includes the molten rock in the mantle and the solid and liquid core.</p>",
                    question: "A mountain range is part of which of Earth's major systems?",
                    answerOptions: [
                        { text: "The hydrosphere", isCorrect: false, rationale: "The hydrosphere consists of all water on Earth." },
                        { text: "The atmosphere", isCorrect: false, rationale: "The atmosphere is the layer of gases surrounding the Earth." },
                        { text: "The biosphere", isCorrect: false, rationale: "The biosphere includes all living organisms." },
                        { text: "The geosphere", isCorrect: true, rationale: "Mountains are a prominent feature of the geosphere, which encompasses all of Earth's landforms." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The slow process of continents moving over geological time is known as:",
                    answerOptions: [
                        { text: "Continental drift", isCorrect: true, rationale: "This was the initial theory proposed by Alfred Wegener, which later evolved into the theory of plate tectonics." },
                        { text: "Seafloor spreading", isCorrect: false, rationale: "Seafloor spreading is the process by which new oceanic crust is formed at divergent boundaries." },
                        { text: "Subduction", isCorrect: false, rationale: "Subduction is the process of one plate moving under another." },
                        { text: "Erosion", isCorrect: false, rationale: "Erosion is the wearing away of the land surface." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What is the most abundant gas in the Earth's atmosphere?",
                    answerOptions: [
                        { text: "Oxygen", isCorrect: false, rationale: "Oxygen makes up about 21% of the atmosphere." },
                        { text: "Nitrogen", isCorrect: true, rationale: "Nitrogen makes up approximately 78% of the Earth's atmosphere." },
                        { text: "Carbon Dioxide", isCorrect: false, rationale: "Carbon dioxide is a trace gas, making up less than 0.1% of the atmosphere." },
                        { text: "Argon", isCorrect: false, rationale: "Argon makes up about 1% of the atmosphere." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "A volcano is most likely to form at which type of plate boundary?",
                    answerOptions: [
                        { text: "Transform boundary", isCorrect: false, rationale: "Volcanoes are rare at transform boundaries, which are characterized by earthquakes." },
                        { text: "Convergent boundary (subduction zone)", isCorrect: true, rationale: "When one plate subducts under another, it melts and the resulting magma can rise to the surface to form volcanoes." },
                        { text: "Any boundary with enough pressure", isCorrect: false, rationale: "The type of boundary and the processes occurring there are key." },
                        { text: "Divergent boundary (in the ocean)", isCorrect: false, rationale: "While volcanoes do form at divergent boundaries (mid-ocean ridges), the most well-known volcanoes on land are associated with subduction zones." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "The breaking down of rock without changing its chemical composition is called:",
                    answerOptions: [
                        { text: "Chemical weathering", isCorrect: false, rationale: "Chemical weathering involves a change in the rock's composition." },
                        { text: "Mechanical weathering", isCorrect: true, rationale: "This process, also called physical weathering, includes actions like frost wedging and abrasion." },
                        { text: "Erosion", isCorrect: false, rationale: "Erosion is the transport of the broken pieces." },
                        { text: "Deposition", isCorrect: false, rationale: "Deposition is the settling of the transported pieces." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Which of these is an example of a sedimentary rock?",
                    answerOptions: [
                        { text: "Marble", isCorrect: false, rationale: "Marble is a metamorphic rock." },
                        { text: "Sandstone", isCorrect: true, rationale: "Sandstone is formed from cemented grains of sand." },
                        { text: "Granite", isCorrect: false, rationale: "Granite is an igneous rock." },
                        { text: "Basalt", isCorrect: false, rationale: "Basalt is an igneous rock." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "text",
                    passage: "<p>The greenhouse effect is a natural process that warms the Earth's surface. Some of the sun's energy that hits the Earth is reflected back into space, but much of it is trapped in the atmosphere by greenhouse gases. This effect is essential for life, but has been intensified by human activities.</p>",
                    question: "The greenhouse effect is primarily caused by:",
                    answerOptions: [
                        { text: "The ozone layer reflecting all sunlight.", isCorrect: false, rationale: "The ozone layer absorbs UV light, it does not reflect all sunlight." },
                        { text: "Gases in the atmosphere trapping heat.", isCorrect: true, rationale: "Gases like carbon dioxide and methane absorb and re-radiate heat, keeping the planet warm." },
                        { text: "The Earth's magnetic field.", isCorrect: false, rationale: "The magnetic field protects us from solar wind, but doesn't cause the greenhouse effect." },
                        { text: "Heat generated from the Earth's core.", isCorrect: false, rationale: "This geothermal heat is a minor factor in the surface temperature compared to the greenhouse effect." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "All of the living organisms on Earth and the environments they live in are collectively known as the:",
                    answerOptions: [
                        { text: "Geosphere", isCorrect: false, rationale: "The geosphere is the land and rock." },
                        { text: "Hydrosphere", isCorrect: false, rationale: "The hydrosphere is the water." },
                        { text: "Atmosphere", isCorrect: false, rationale: "The atmosphere is the air." },
                        { text: "Biosphere", isCorrect: true, rationale: "The biosphere encompasses all life on Earth." }
                    ]
                }
            ]
        }
    ]
};
// Science -> Earth & Space Science -> Space Science
AppData.quizzes.sci_space_science = {
    id: "sci_space_science",
    title: "Space Science",
    description: "The solar system, stars, galaxies, and the universe.",
    quizzes: [
        {
            quizId: "sci_space_science_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which of the following is the correct order of the planets from the Sun?",
                    answerOptions: [
                        { text: "Earth, Mars, Venus, Jupiter, Saturn, Uranus, Neptune, Mercury", isCorrect: false, rationale: "This order is incorrect." },
                        { text: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune", isCorrect: true, rationale: "This is the correct sequence of the eight planets in our solar system." },
                        { text: "Mercury, Venus, Mars, Earth, Jupiter, Saturn, Neptune, Uranus", isCorrect: false, rationale: "The positions of Mars and Earth are swapped." },
                        { text: "Venus, Mercury, Earth, Mars, Jupiter, Saturn, Uranus, Neptune", isCorrect: false, rationale: "The positions of Venus and Mercury are swapped." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "What is the name of the galaxy that contains our Solar System?",
                    answerOptions: [
                        { text: "Andromeda", isCorrect: false, rationale: "Andromeda is the nearest major galaxy to our own, but it is not our galaxy." },
                        { text: "Triangulum", isCorrect: false, rationale: "The Triangulum Galaxy is a smaller galaxy in our Local Group." },
                        { text: "The Milky Way", isCorrect: true, rationale: "Our Solar System is located in the Milky Way galaxy, a spiral galaxy." },
                        { text: "Centaurus A", isCorrect: false, rationale: "Centaurus A is a different galaxy visible from the Southern Hemisphere." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>A star's life cycle is determined by its mass. Low-mass stars, like our Sun, end their lives as a white dwarf. High-mass stars have a much more dramatic end, exploding in a supernova and potentially leaving behind a neutron star or a black hole.</p>",
                    question: "What is the expected final stage in the life cycle of a very massive star?",
                    answerOptions: [
                        { text: "It will become a red giant and then a white dwarf.", isCorrect: false, rationale: "This is the life path for a low-mass star like our Sun." },
                        { text: "It will explode in a supernova.", isCorrect: true, rationale: "Massive stars have enough mass to cause a catastrophic supernova explosion at the end of their lives." },
                        { text: "It will slowly cool down and become a brown dwarf.", isCorrect: false, rationale: "A brown dwarf is a 'failed star' that never had enough mass to start fusion." },
                        { text: "It will turn into a comet.", isCorrect: false, rationale: "Comets are icy bodies in the solar system, unrelated to a star's death." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "What celestial body is a natural satellite of a planet?",
                    answerOptions: [
                        { text: "An asteroid", isCorrect: false, rationale: "Asteroids are rocky bodies that typically orbit the Sun." },
                        { text: "A comet", isCorrect: false, rationale: "Comets are icy bodies that orbit the Sun, often in highly elliptical orbits." },
                        { text: "A moon", isCorrect: true, rationale: "A moon is a natural satellite that orbits a planet. Earth has one moon." },
                        { text: "A star", isCorrect: false, rationale: "A star is a massive, luminous ball of plasma that planets orbit around." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "A solar eclipse occurs when:",
                    answerOptions: [
                        { text: "The Earth passes directly between the Sun and the Moon.", isCorrect: false, rationale: "This describes a lunar eclipse." },
                        { text: "The Moon passes directly between the Sun and the Earth.", isCorrect: true, rationale: "The Moon blocks the Sun's light, casting a shadow on a part of the Earth." },
                        { text: "The Sun passes directly between the Earth and the Moon.", isCorrect: false, rationale: "This alignment is physically impossible." },
                        { text: "A planet passes between the Earth and the Sun.", isCorrect: false, rationale: "This is called a transit, not an eclipse." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "text",
                    passage: "<p>The Big Bang Theory is the leading scientific theory for how the universe began. It states that the universe started as an extremely hot, dense point that expanded and cooled over billions of years to form the universe as we know it today.</p>",
                    question: "According to the Big Bang Theory, the universe began as:",
                    answerOptions: [
                        { text: "A large, empty void.", isCorrect: false, rationale: "The theory states the universe began from a point of singularity, not from emptiness." },
                        { text: "A single, massive star.", isCorrect: false, rationale: "Stars formed much later in the universe's history." },
                        { text: "A very hot, dense singularity.", isCorrect: true, rationale: "The theory posits that all matter and energy in the universe was initially concentrated in an infinitely small, hot, and dense point." },
                        { text: "A collision of two galaxies.", isCorrect: false, rationale: "Galaxies formed long after the Big Bang." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "What force is responsible for the formation of stars, planets, and galaxies?",
                    answerOptions: [
                        { text: "The strong nuclear force", isCorrect: false, rationale: "The strong force holds atomic nuclei together." },
                        { text: "The weak nuclear force", isCorrect: false, rationale: "The weak force is involved in radioactive decay." },
                        { text: "Electromagnetism", isCorrect: false, rationale: "Electromagnetism governs interactions between charged particles." },
                        { text: "Gravity", isCorrect: true, rationale: "Gravity is the attractive force that pulls matter together, leading to the formation of large-scale structures in the universe." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "What is a light-year?",
                    answerOptions: [
                        { text: "The time it takes for light to travel from the Sun to Earth.", isCorrect: false, rationale: "This is about 8.3 minutes, not a light-year." },
                        { text: "A unit of time equal to 365.25 days.", isCorrect: false, rationale: "This is an Earth year." },
                        { text: "The distance that light travels in one year.", isCorrect: true, rationale: "A light-year is a unit of astronomical distance, not time." },
                        { text: "The time it takes for a star to complete its life cycle.", isCorrect: false, rationale: "A star's life cycle takes millions or billions of years." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The four inner planets (Mercury, Venus, Earth, and Mars) are also known as the:",
                    answerOptions: [
                        { text: "Gas Giants", isCorrect: false, rationale: "The gas giants are Jupiter, Saturn, Uranus, and Neptune." },
                        { text: "Terrestrial Planets", isCorrect: true, rationale: "They are called terrestrial planets because they have solid, rocky surfaces." },
                        { text: "Ice Giants", isCorrect: false, rationale: "The ice giants are Uranus and Neptune." },
                        { text: "Dwarf Planets", isCorrect: false, rationale: "Dwarf planets are another category of celestial objects, like Pluto." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "image",
                    imageUrl: "Images/Science/lunar_eclipse.png",
                    question: "The diagram shows the alignment for a lunar eclipse. This event happens when:",
                    answerOptions: [
                        { text: "The Moon's shadow falls on the Earth.", isCorrect: false, rationale: "This describes a solar eclipse." },
                        { text: "The Earth's shadow falls on the Moon.", isCorrect: true, rationale: "In a lunar eclipse, the Earth is positioned between the Sun and the Moon, causing its shadow to obscure the Moon." },
                        { text: "The Sun is blocked by an asteroid.", isCorrect: false, rationale: "This is not what causes a lunar eclipse." },
                        { text: "The Moon moves into a higher orbit.", isCorrect: false, rationale: "Orbital height does not cause eclipses." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "What process powers the Sun and other stars?",
                    answerOptions: [
                        { text: "Nuclear fission", isCorrect: false, rationale: "Fission is the splitting of atoms, used in nuclear power plants, but not in stars." },
                        { text: "Nuclear fusion", isCorrect: true, rationale: "Stars generate energy by fusing lighter elements, primarily hydrogen, into heavier elements, like helium, in their cores." },
                        { text: "Chemical combustion (burning)", isCorrect: false, rationale: "The Sun is not 'on fire' in the chemical sense; it is a ball of plasma undergoing nuclear reactions." },
                        { text: "Geothermal energy", isCorrect: false, rationale: "Geothermal energy is heat from the interior of a planet, not a star." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "An asteroid belt is located between the orbits of which two planets?",
                    answerOptions: [
                        { text: "Earth and Mars", isCorrect: false, rationale: "There is no major asteroid belt between Earth and Mars." },
                        { text: "Mars and Jupiter", isCorrect: true, rationale: "The main asteroid belt in our solar system is situated between Mars and Jupiter." },
                        { text: "Jupiter and Saturn", isCorrect: false, rationale: "There is no major asteroid belt between Jupiter and Saturn." },
                        { text: "Uranus and Neptune", isCorrect: false, rationale: "The Kuiper Belt is beyond Neptune, but not between Uranus and Neptune." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing. This produces a visible atmosphere or coma, and sometimes also a tail.</p>",
                    question: "What is the main composition of a comet?",
                    answerOptions: [
                        { text: "Rock and metal", isCorrect: false, rationale: "This describes an asteroid." },
                        { text: "Ice, dust, and rock", isCorrect: true, rationale: "Comets are often called 'dirty snowballs' because of their composition of various ices mixed with dust and rock." },
                        { text: "Molten lava", isCorrect: false, rationale: "Comets are extremely cold, not molten." },
                        { text: "Hot gases and plasma", isCorrect: false, rationale: "This describes a star." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "What is a black hole?",
                    answerOptions: [
                        { text: "A large, dark planet that does not reflect light.", isCorrect: false, rationale: "A black hole is not a planet." },
                        { text: "A region of spacetime where gravity is so strong that nothing, not even light, can escape.", isCorrect: true, rationale: "This intense gravity is caused by matter being squeezed into a tiny space, often after a massive star collapses." },
                        { text: "An empty area in space between galaxies.", isCorrect: false, rationale: "This would be called a void." },
                        { text: "A star that has burned out and is no longer hot.", isCorrect: false, rationale: "This would be a black dwarf, a theoretical object." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The apparent shift in the position of a star against a distant background, as seen from two different points in Earth's orbit, is called:",
                    answerOptions: [
                        { text: "Redshift", isCorrect: false, rationale: "Redshift is the stretching of light waves from objects moving away from us." },
                        { text: "Stellar parallax", isCorrect: true, rationale: "Stellar parallax is a crucial method used by astronomers to measure the distances to nearby stars." },
                        { text: "Aberration of starlight", isCorrect: false, rationale: "Aberration is an apparent motion of celestial objects caused by the velocity of the observer." },
                        { text: "Gravitational lensing", isCorrect: false, rationale: "Gravitational lensing is the bending of light by a massive object." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_space_science_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which planet is known as the 'Red Planet' due to its reddish appearance?",
                    answerOptions: [
                        { text: "Venus", isCorrect: false, rationale: "Venus is yellowish-white due to its thick cloud cover." },
                        { text: "Jupiter", isCorrect: false, rationale: "Jupiter is known for its bands of colors and Great Red Spot, but it is not the Red Planet." },
                        { text: "Mars", isCorrect: true, rationale: "The iron oxide (rust) on its surface gives Mars its distinct reddish color." },
                        { text: "Saturn", isCorrect: false, rationale: "Saturn is a pale yellow color." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "A huge, gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter is called a:",
                    answerOptions: [
                        { text: "Solar system", isCorrect: false, rationale: "A solar system consists of a star and the objects that orbit it." },
                        { text: "Nebula", isCorrect: false, rationale: "A nebula is a cloud of gas and dust where stars are born." },
                        { text: "Galaxy", isCorrect: true, rationale: "This is the definition of a galaxy. The Milky Way is an example." },
                        { text: "Constellation", isCorrect: false, rationale: "A constellation is a pattern of stars as seen from Earth." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "What is the largest planet in our solar system?",
                    answerOptions: [
                        { text: "Saturn", isCorrect: false, rationale: "Saturn is the second largest planet." },
                        { text: "Jupiter", isCorrect: true, rationale: "Jupiter is a gas giant and is more massive than all the other planets combined." },
                        { text: "Neptune", isCorrect: false, rationale: "Neptune is the fourth largest planet." },
                        { text: "Earth", isCorrect: false, rationale: "Jupiter is over 11 times the diameter of Earth." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The Sun is a medium-sized, main-sequence star. It is in the most stable phase of its life, steadily fusing hydrogen into helium in its core. It has been in this phase for about 4.6 billion years and is expected to remain so for another 5 billion years.</p>",
                    question: "What is the current stage of our Sun's life cycle?",
                    answerOptions: [
                        { text: "Red Giant", isCorrect: false, rationale: "The Sun will become a red giant in about 5 billion years after it exhausts the hydrogen in its core." },
                        { text: "White Dwarf", isCorrect: false, rationale: "A white dwarf is the final stage for a star like the Sun." },
                        { text: "Main Sequence", isCorrect: true, rationale: "The Sun is currently a main-sequence star, characterized by the fusion of hydrogen into helium." },
                        { text: "Protostar", isCorrect: false, rationale: "A protostar is the earliest stage of a star's life." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "A lunar eclipse can only happen during which phase of the Moon?",
                    answerOptions: [
                        { text: "New Moon", isCorrect: false, rationale: "A New Moon is required for a solar eclipse." },
                        { text: "Full Moon", isCorrect: true, rationale: "A lunar eclipse occurs when the Earth is between the Sun and Moon, which is the alignment that causes a Full Moon." },
                        { text: "First Quarter", isCorrect: false, rationale: "During the quarter phases, the Sun, Earth, and Moon form a right angle, making an eclipse impossible." },
                        { text: "Third Quarter", isCorrect: false, rationale: "Eclipses cannot occur during the quarter phases." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "What is a nebula?",
                    answerOptions: [
                        { text: "A collapsed star.", isCorrect: false, rationale: "A collapsed massive star can form a neutron star or black hole." },
                        { text: "A large cloud of gas and dust in space, often where stars are born.", isCorrect: true, rationale: "Nebulae are known as 'stellar nurseries'." },
                        { text: "A cluster of galaxies.", isCorrect: false, rationale: "A cluster is a group of galaxies, not a cloud of gas." },
                        { text: "The tail of a comet.", isCorrect: false, rationale: "A comet's tail is formed from its own outgassing." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "The four outer planets (Jupiter, Saturn, Uranus, Neptune) are known as:",
                    answerOptions: [
                        { text: "The Terrestrial Planets", isCorrect: false, rationale: "The terrestrial planets are the four inner planets." },
                        { text: "The Gas Giants (or Jovian Planets)", isCorrect: true, rationale: "These planets are massive and composed primarily of hydrogen, helium, and other gases." },
                        { text: "The Asteroid Planets", isCorrect: false, rationale: "This is not a standard classification." },
                        { text: "The Dwarf Planets", isCorrect: false, rationale: "Pluto is a dwarf planet, but the four outer planets are not." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>Redshift is a key piece of evidence for the expansion of the universe. When light from distant galaxies is analyzed, it is found to be shifted toward the red end of the spectrum. This happens because the galaxies are moving away from us, stretching the light waves they emit.</p>",
                    question: "What does the redshift of distant galaxies tell us about the universe?",
                    answerOptions: [
                        { text: "The universe is shrinking.", isCorrect: false, rationale: "A shrinking universe would cause a blueshift." },
                        { text: "The universe is expanding.", isCorrect: true, rationale: "Redshift indicates that distant galaxies are receding from us, which is evidence for the expansion of the universe." },
                        { text: "The universe is static and unchanging.", isCorrect: false, rationale: "Redshift is direct evidence against a static universe." },
                        { text: "The galaxies are getting colder.", isCorrect: false, rationale: "Redshift is related to motion, not temperature." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Which of the following best describes the orbit of most planets in our solar system?",
                    answerOptions: [
                        { text: "A perfect circle", isCorrect: false, rationale: "Planetary orbits are not perfect circles." },
                        { text: "A nearly circular ellipse", isCorrect: true, rationale: "The orbits of the planets are ellipses, but they are very close to being circular." },
                        { text: "A highly elongated ellipse", isCorrect: false, rationale: "Some comets have highly elongated orbits, but planets do not." },
                        { text: "A straight line", isCorrect: false, rationale: "Gravity causes objects to move in curved paths, not straight lines." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What is an astronomical unit (AU)?",
                    answerOptions: [
                        { text: "The distance from the Earth to the Moon.", isCorrect: false, rationale: "This distance is much smaller than an AU." },
                        { text: "The average distance from the Earth to the Sun.", isCorrect: true, rationale: "An AU is a convenient unit for measuring distances within our solar system." },
                        { text: "The diameter of the Sun.", isCorrect: false, rationale: "The Sun's diameter is much smaller than an AU." },
                        { text: "The distance light travels in one month.", isCorrect: false, rationale: "This is a light-month, a different unit of distance." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The point in a star's life cycle when it runs out of hydrogen in its core and begins to fuse helium, causing it to expand greatly, is the ________ phase.",
                    answerOptions: [
                        { text: "Protostar", isCorrect: false, rationale: "A protostar is a forming star." },
                        { text: "Main Sequence", isCorrect: false, rationale: "This is the stable hydrogen-fusing phase." },
                        { text: "Red Giant", isCorrect: true, rationale: "The star swells into a red giant or supergiant as it starts fusing heavier elements." },
                        { text: "White Dwarf", isCorrect: false, rationale: "A white dwarf is the remnant core after the red giant phase." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Which celestial objects are often called 'shooting stars' when they burn up in Earth's atmosphere?",
                    answerOptions: [
                        { text: "Comets", isCorrect: false, rationale: "Comets are large icy bodies that orbit the sun; we see them in the sky but they don't burn up in our atmosphere." },
                        { text: "Asteroids", isCorrect: false, rationale: "Asteroids are large rocky bodies; if one were to enter our atmosphere, it would be a major event." },
                        { text: "Meteors", isCorrect: true, rationale: "A meteor is the streak of light we see when a small particle of debris (a meteoroid) burns up upon entering the atmosphere." },
                        { text: "Planets", isCorrect: false, rationale: "Planets do not enter Earth's atmosphere." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "What is the primary feature that distinguishes a dwarf planet, like Pluto, from a regular planet?",
                    answerOptions: [
                        { text: "It does not orbit the Sun.", isCorrect: false, rationale: "Dwarf planets do orbit the Sun." },
                        { text: "It is not massive enough to be spherical.", isCorrect: false, rationale: "Dwarf planets are massive enough to have been pulled into a spherical shape by their own gravity." },
                        { text: "It has not 'cleared its orbital neighborhood' of other debris.", isCorrect: true, rationale: "This is the key distinction. Planets are gravitationally dominant in their orbits, while dwarf planets share their orbits with other objects." },
                        { text: "It does not have any moons.", isCorrect: false, rationale: "Pluto has several moons." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The seasons on Earth are caused by:",
                    answerOptions: [
                        { text: "The changing distance between the Earth and the Sun.", isCorrect: false, rationale: "This has a very minor effect on the seasons." },
                        { text: "The tilt of the Earth's axis of rotation.", isCorrect: true, rationale: "The tilt causes different hemispheres to receive more direct sunlight at different times of the year." },
                        { text: "The phases of the Moon.", isCorrect: false, rationale: "The Moon's phases do not affect the seasons." },
                        { text: "The Sun's solar cycle.", isCorrect: false, rationale: "The solar cycle affects solar activity but is not the cause of the seasons." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>Galaxies are classified into three main types: spiral, elliptical, and irregular. Spiral galaxies, like our Milky Way, have a central bulge with arms spiraling outwards. Elliptical galaxies are smooth, oval-shaped collections of stars. Irregular galaxies have no distinct shape.</p>",
                    question: "A galaxy that is shaped like a flattened ball and contains mostly older stars is most likely a(n):",
                    answerOptions: [
                        { text: "Spiral galaxy", isCorrect: false, rationale: "Spiral galaxies have distinct arms and contain both old and young stars." },
                        { text: "Elliptical galaxy", isCorrect: true, rationale: "Elliptical galaxies are ellipsoidal and are primarily composed of older, lower-mass stars." },
                        { text: "Irregular galaxy", isCorrect: false, rationale: "Irregular galaxies lack a consistent shape." },
                        { text: "Barred spiral galaxy", isCorrect: false, rationale: "This is a type of spiral galaxy with a central bar structure." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_space_science_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What object is at the center of our Solar System?",
                    answerOptions: [
                        { text: "The Earth", isCorrect: false, rationale: "This was the basis of the geocentric model, which has been disproven." },
                        { text: "The Sun", isCorrect: true, rationale: "The Sun is the star at the center of our Solar System, and its gravity holds the planets in orbit." },
                        { text: "Jupiter", isCorrect: false, rationale: "Jupiter is the largest planet, but it orbits the Sun." },
                        { text: "A black hole", isCorrect: false, rationale: "While there is a supermassive black hole at the center of our galaxy, there is not one at the center of our solar system." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "A constellation is best described as:",
                    answerOptions: [
                        { text: "A group of stars that are physically close to each other in space.", isCorrect: false, rationale: "The stars in a constellation are often very far apart from each other." },
                        { text: "A pattern of stars in the sky as seen from Earth.", isCorrect: true, rationale: "Constellations are human-made patterns used to navigate and organize the night sky." },
                        { text: "A cloud of gas where new stars are forming.", isCorrect: false, rationale: "This is a nebula." },
                        { text: "A gravitationally bound group of millions of stars.", isCorrect: false, rationale: "This is a galaxy or a star cluster." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "Which of these is responsible for causing the tides on Earth?",
                    answerOptions: [
                        { text: "The Earth's magnetic field", isCorrect: false, rationale: "The magnetic field has no significant effect on tides." },
                        { text: "The gravitational pull of the Moon and the Sun", isCorrect: true, rationale: "The Moon's gravity has the primary effect, with the Sun's gravity also contributing, creating the rise and fall of ocean tides." },
                        { text: "The rotation of the Earth", isCorrect: false, rationale: "The rotation contributes to the timing and number of tides per day, but gravity is the cause." },
                        { text: "Plate tectonics", isCorrect: false, rationale: "Plate tectonics shapes ocean basins but does not cause daily tides." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>A star's color is an indication of its surface temperature. The hottest stars appear blue or white, while cooler stars appear red or orange. Our Sun, a yellow star, has a surface temperature that is intermediate between these extremes.</p>",
                    question: "If you observe a bright red star in the night sky, what can you conclude about it?",
                    answerOptions: [
                        { text: "It is one of the hottest stars.", isCorrect: false, rationale: "The hottest stars are blue or white." },
                        { text: "It is relatively cool, for a star.", isCorrect: true, rationale: "Red stars, like Betelgeuse, have a lower surface temperature than yellow or blue stars." },
                        { text: "It is moving towards Earth.", isCorrect: false, rationale: "Motion towards Earth would cause a blueshift, not determine its base color." },
                        { text: "It is about to explode.", isCorrect: false, rationale: "While some red supergiants are near the end of their lives, color alone doesn't indicate an imminent explosion." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What is the difference between a meteoroid, a meteor, and a meteorite?",
                    answerOptions: [
                        { text: "There is no difference; the terms are interchangeable.", isCorrect: false, rationale: "The terms refer to the same object at different stages." },
                        { text: "A meteoroid is in space, a meteor is the light streak in the atmosphere, and a meteorite is what lands on Earth.", isCorrect: true, rationale: "This correctly defines the three stages of a space rock entering our atmosphere and landing on the surface." },
                        { text: "A meteor is in space, a meteorite is in the atmosphere, and a meteoroid lands on Earth.", isCorrect: false, rationale: "This order is incorrect." },
                        { text: "A meteorite is the light streak, a meteor is in space, and a meteoroid lands on Earth.", isCorrect: false, rationale: "This order is incorrect." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "The 'Great Red Spot' is a massive, long-lasting storm on which planet?",
                    answerOptions: [
                        { text: "Mars", isCorrect: false, rationale: "Mars is known for its polar ice caps and dust storms, but not the Great Red Spot." },
                        { text: "Jupiter", isCorrect: true, rationale: "The Great Red Spot is a famous anticyclonic storm on Jupiter that is larger than Earth." },
                        { text: "Saturn", isCorrect: false, rationale: "Saturn has storms, but not the Great Red Spot." },
                        { text: "Neptune", isCorrect: false, rationale: "Neptune has had large dark spots, but the Great Red Spot is on Jupiter." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "The theory that the universe is expanding is supported by the observation that distant galaxies are:",
                    answerOptions: [
                        { text: "Moving towards us (blueshifted).", isCorrect: false, rationale: "A blueshift would indicate the universe is contracting." },
                        { text: "Moving away from us (redshifted).", isCorrect: true, rationale: "The light from almost all distant galaxies is redshifted, providing key evidence for the expansion of the universe." },
                        { text: "Not moving at all.", isCorrect: false, rationale: "This would support a static universe theory, which has been disproven." },
                        { text: "Orbiting our galaxy.", isCorrect: false, rationale: "Other galaxies do not orbit the Milky Way; they are all moving apart from each other." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "What are Saturn's rings primarily made of?",
                    answerOptions: [
                        { text: "Clouds of gas", isCorrect: false, rationale: "The rings are not gaseous." },
                        { text: "Solid bands of rock", isCorrect: false, rationale: "The rings are not solid structures." },
                        { text: "Billions of small particles of ice and rock", isCorrect: true, rationale: "The rings consist of countless individual particles, ranging in size from dust grains to large boulders." },
                        { text: "A liquid ocean", isCorrect: false, rationale: "The rings are not liquid." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "text",
                    passage: "<p>An equinox occurs twice a year, around March 20 and September 22. On these days, the Sun is directly above the Earth's equator, and day and night are of approximately equal length all over the planet.</p>",
                    question: "What is an equinox?",
                    answerOptions: [
                        { text: "The longest day of the year.", isCorrect: false, rationale: "This is the summer solstice." },
                        { text: "The shortest day of the year.", isCorrect: false, rationale: "This is the winter solstice." },
                        { text: "A day when day and night are of nearly equal length.", isCorrect: true, rationale: "This is the definition of an equinox, which marks the beginning of spring and autumn." },
                        { text: "A day when an eclipse occurs.", isCorrect: false, rationale: "Equinoxes are related to Earth's tilt and orbit, not eclipses." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "After a supernova explosion, the core of a very massive star can collapse to form a:",
                    answerOptions: [
                        { text: "White dwarf", isCorrect: false, rationale: "A white dwarf is the remnant of a low-mass star." },
                        { text: "Red giant", isCorrect: false, rationale: "A red giant is a stage before the final collapse." },
                        { text: "Black hole", isCorrect: true, rationale: "If the remnant core is massive enough (more than about three times the mass of the Sun), its gravity will overwhelm all other forces and it will collapse into a black hole." },
                        { text: "Protostar", isCorrect: false, rationale: "A protostar is a star that is just beginning to form." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "Which of the following is considered a dwarf planet?",
                    answerOptions: [
                        { text: "Mars", isCorrect: false, rationale: "Mars is one of the eight major planets." },
                        { text: "Titan", isCorrect: false, rationale: "Titan is a moon of Saturn." },
                        { text: "Pluto", isCorrect: true, rationale: "Pluto was reclassified from a planet to a dwarf planet in 2006." },
                        { text: "Ganymede", isCorrect: false, rationale: "Ganymede is a moon of Jupiter." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "The time it takes for a planet to make one complete trip around the Sun is called its:",
                    answerOptions: [
                        { text: "Rotational period (day)", isCorrect: false, rationale: "The rotational period is the time it takes to spin once on its axis." },
                        { text: "Orbital period (year)", isCorrect: true, rationale: "This is the definition of a planet's year." },
                        { text: "Phase", isCorrect: false, rationale: "Phase refers to the portion of a celestial body we see illuminated." },
                        { text: "Eclipse", isCorrect: false, rationale: "An eclipse is an astronomical event of one object blocking another." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "The hazy, luminous band of light seen in the night sky, composed of stars that cannot be individually distinguished by the naked eye, is the:",
                    answerOptions: [
                        { text: "Aurora Borealis", isCorrect: false, rationale: "The aurora is a natural light display caused by particles from the Sun." },
                        { text: "Zodiacal light", isCorrect: false, rationale: "Zodiacal light is a faint glow caused by sunlight scattering off dust in the solar system." },
                        { text: "Milky Way", isCorrect: true, rationale: "When we look at this band, we are looking into the dense plane of our own galaxy, the Milky Way." },
                        { text: "Andromeda Galaxy", isCorrect: false, rationale: "Andromeda is visible as a faint, fuzzy patch, not a band across the sky." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Which planet is most similar in size and mass to Earth?",
                    answerOptions: [
                        { text: "Mars", isCorrect: false, rationale: "Mars is significantly smaller and less massive than Earth." },
                        { text: "Venus", isCorrect: true, rationale: "Venus is often called Earth's 'sister planet' due to its similar size, mass, and composition." },
                        { text: "Mercury", isCorrect: false, rationale: "Mercury is the smallest planet in the solar system." },
                        { text: "Uranus", isCorrect: false, rationale: "Uranus is an ice giant, much larger than Earth." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>A solstice is an event that occurs twice a year when the Sun reaches its highest or lowest excursion relative to the celestial equator on the celestial sphere. The solstices mark the longest and shortest days of the year.</p>",
                    question: "In the Northern Hemisphere, the summer solstice (around June 21) marks the:",
                    answerOptions: [
                        { text: "Shortest day of the year.", isCorrect: false, rationale: "This is the winter solstice." },
                        { text: "Start of autumn.", isCorrect: false, rationale: "The start of autumn is marked by the autumnal equinox." },
                        { text: "Longest day of the year.", isCorrect: true, rationale: "The summer solstice has the most hours of daylight." },
                        { text: "Time when day and night are equal.", isCorrect: false, rationale: "This is an equinox." }
                    ]
                }
            ]
        }
    ]
};
// Science -> Scientific Numeracy -> Scientific Numeracy
AppData.quizzes.sci_scientific_numeracy = {
    id: "sci_scientific_numeracy",
    title: "Scientific Numeracy",
    description: "Reading data, interpreting charts, and applying basic math to scientific concepts.",
    quizzes: [
        {
            quizId: "sci_scientific_numeracy_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A scientist measures the temperature of a chemical reaction every 5 minutes. The data is as follows: 22°C, 25°C, 28°C, 31°C, 34°C.</p>",
                    question: "Based on the data, what is the average rate of temperature increase per minute?",
                    answerOptions: [
                        { text: "3°C per minute", isCorrect: false, rationale: "The temperature increases by 3°C every 5 minutes, not every minute." },
                        { text: "0.6°C per minute", isCorrect: true, rationale: "The temperature increases by 3°C every 5 minutes. Rate = 3°C / 5 min = 0.6°C/min." },
                        { text: "1.2°C per minute", isCorrect: false, rationale: "This is double the correct rate." },
                        { text: "5°C per minute", isCorrect: false, rationale: "This is the time interval, not the rate of temperature change." }
                    ]
                },
                {
                    questionNumber: 2,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A solution has a concentration of 20 grams of salt per liter of water. You have a beaker containing 0.5 liters of this solution.</p>",
                    question: "How many grams of salt are in the beaker?",
                    answerOptions: [
                        { text: "5 grams", isCorrect: false, rationale: "This would be the amount for 0.25 liters." },
                        { text: "10 grams", isCorrect: true, rationale: "Concentration = mass/volume. Mass = 20 g/L * 0.5 L = 10 grams." },
                        { text: "20 grams", isCorrect: false, rationale: "This is the amount in a full liter." },
                        { text: "40 grams", isCorrect: false, rationale: "This would be the amount in 2 liters." }
                    ]
                },
                {
                    questionNumber: 3,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<table><tr><th>Trial</th><th>Volume (mL)</th><th>Mass (g)</th></tr><tr><td>1</td><td>10</td><td>15</td></tr><tr><td>2</td><td>20</td><td>30</td></tr><tr><td>3</td><td>30</td><td>45</td></tr></table>",
                    question: "A student measures the mass of a liquid at different volumes. Based on the table, what is the density of the liquid? (Density = Mass / Volume)",
                    answerOptions: [
                        { text: "0.67 g/mL", isCorrect: false, rationale: "This is the result of dividing volume by mass (10/15)." },
                        { text: "1.0 g/mL", isCorrect: false, rationale: "This is the density of water, not the liquid in the experiment." },
                        { text: "1.5 g/mL", isCorrect: true, rationale: "In each trial, the density is consistent: 15g/10mL = 1.5 g/mL; 30g/20mL = 1.5 g/mL; 45g/30mL = 1.5 g/mL." },
                        { text: "15 g/mL", isCorrect: false, rationale: "This is the mass from the first trial, not the calculated density." }
                    ]
                },
                {
                    questionNumber: 4,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A car travels a distance of 150 kilometers in 2 hours.</p>",
                    question: "What is the average speed of the car in kilometers per hour (km/h)?",
                    answerOptions: [
                        { text: "50 km/h", isCorrect: false, rationale: "This would be the speed if the journey took 3 hours." },
                        { text: "75 km/h", isCorrect: true, rationale: "Speed = Distance / Time. Speed = 150 km / 2 hours = 75 km/h." },
                        { text: "100 km/h", isCorrect: false, rationale: "This would be the speed if the journey took 1.5 hours." },
                        { text: "300 km/h", isCorrect: false, rationale: "This is the result of multiplying distance and time, not dividing." }
                    ]
                },
                {
                    questionNumber: 5,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A study recorded the number of bacteria in a culture every hour: Hour 1: 500, Hour 2: 1000, Hour 3: 2000, Hour 4: 4000.</p>",
                    question: "Which statement best describes the growth of the bacteria?",
                    answerOptions: [
                        { text: "The bacteria increase by 500 each hour.", isCorrect: false, rationale: "This describes linear growth, but the data shows exponential growth." },
                        { text: "The bacteria are doubling every hour.", isCorrect: true, rationale: "The population doubles from 500 to 1000, 1000 to 2000, and 2000 to 4000 each hour." },
                        { text: "The bacteria are decreasing.", isCorrect: false, rationale: "The data clearly shows an increase." },
                        { text: "The bacteria growth is random.", isCorrect: false, rationale: "The data shows a clear, predictable pattern." }
                    ]
                },
                {
                    questionNumber: 6,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>In a chemical reaction, 32 grams of methane (CH₄) react completely to produce 88 grams of carbon dioxide (CO₂) and a certain amount of water (H₂O). The total mass of the reactants was 160 grams.</p>",
                    question: "According to the law of conservation of mass, what mass of water was produced?",
                    answerOptions: [
                        { text: "40 grams", isCorrect: false, rationale: "This does not balance the total mass." },
                        { text: "72 grams", isCorrect: true, rationale: "Total Reactant Mass = Total Product Mass. 160g = 88g (CO₂) + Xg (H₂O). So, X = 160 - 88 = 72 grams." },
                        { text: "128 grams", isCorrect: false, rationale: "This would be the mass of the other reactant (oxygen), not the water produced." },
                        { text: "280 grams", isCorrect: false, rationale: "This would violate the law of conservation of mass." }
                    ]
                },
                {
                    questionNumber: 7,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A student records the height of a plant over 5 days: Day 1: 2.0 cm, Day 2: 2.5 cm, Day 3: 3.0 cm, Day 4: 3.5 cm, Day 5: 4.0 cm.</p>",
                    question: "What is the mean (average) height of the plant over the 5 days?",
                    answerOptions: [
                        { text: "2.5 cm", isCorrect: false, rationale: "This is the height on Day 2." },
                        { text: "3.0 cm", isCorrect: true, rationale: "The sum of the heights is 2.0+2.5+3.0+3.5+4.0 = 15.0 cm. The mean is 15.0 / 5 = 3.0 cm." },
                        { text: "3.5 cm", isCorrect: false, rationale: "This is the height on Day 4." },
                        { text: "4.0 cm", isCorrect: false, rationale: "This is the height on Day 5." }
                    ]
                },
                {
                    questionNumber: 8,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A machine can pump water at a rate of 50 liters per minute. The machine runs for 1.5 hours.</p>",
                    question: "What is the total volume of water pumped in liters?",
                    answerOptions: [
                        { text: "75 liters", isCorrect: false, rationale: "This is the result of multiplying the rate by 1.5, without converting hours to minutes." },
                        { text: "3000 liters", isCorrect: false, rationale: "This is the volume pumped in one hour (50 * 60)." },
                        { text: "4500 liters", isCorrect: true, rationale: "First, convert 1.5 hours to minutes: 1.5 * 60 = 90 minutes. Then, multiply by the rate: 90 min * 50 L/min = 4500 liters." },
                        { text: "5000 liters", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 9,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A medication's dosage is 15 milligrams (mg) for every kilogram (kg) of a patient's body weight. The patient weighs 60 kg.</p>",
                    question: "What is the correct dosage for this patient?",
                    answerOptions: [
                        { text: "4 mg", isCorrect: false, rationale: "This is the result of dividing weight by dosage." },
                        { text: "60 mg", isCorrect: false, rationale: "This is the patient's weight, not the dosage." },
                        { text: "900 mg", isCorrect: true, rationale: "Dosage = 15 mg/kg * 60 kg = 900 mg." },
                        { text: "1500 mg", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 10,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A lab experiment tests the effectiveness of a fertilizer. The average height of plants with fertilizer was 25 cm, and the average height of plants without fertilizer was 20 cm.</p>",
                    question: "What is the percent increase in height for the plants with fertilizer compared to those without?",
                    answerOptions: [
                        { text: "5%", isCorrect: false, rationale: "The absolute increase is 5 cm, but this is not the percent increase." },
                        { text: "20%", isCorrect: false, rationale: "This is the height of the control group, not the percent increase." },
                        { text: "25%", isCorrect: true, rationale: "Percent increase = ( (New - Old) / Old ) * 100. ( (25 - 20) / 20 ) * 100 = (5 / 20) * 100 = 0.25 * 100 = 25%." },
                        { text: "50%", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 11,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A scientist needs to prepare a 10% saline solution. This means that 10% of the total mass of the solution should be salt. The scientist wants to make 500 grams of the solution.</p>",
                    question: "How many grams of salt does the scientist need?",
                    answerOptions: [
                        { text: "10 grams", isCorrect: false, rationale: "This would be 10% of 100 grams." },
                        { text: "50 grams", isCorrect: true, rationale: "Mass of salt = 10% of 500 g = 0.10 * 500 = 50 grams." },
                        { text: "100 grams", isCorrect: false, rationale: "This would be 20% of the solution." },
                        { text: "450 grams", isCorrect: false, rationale: "This would be the required mass of water, not salt." }
                    ]
                },
                {
                    questionNumber: 12,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A survey asks 200 people about their primary source of news. The results are: TV: 80, Internet: 60, Radio: 40, Print: 20.</p>",
                    question: "What percentage of people surveyed listed the Internet as their primary source?",
                    answerOptions: [
                        { text: "20%", isCorrect: false, rationale: "This is the percentage for Print." },
                        { text: "30%", isCorrect: true, rationale: "Percentage = (Part / Whole) * 100. (60 / 200) * 100 = 0.3 * 100 = 30%." },
                        { text: "40%", isCorrect: false, rationale: "This is the percentage for TV." },
                        { text: "60%", isCorrect: false, rationale: "This is the number of people, not the percentage." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_scientific_numeracy_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A block of wood has a volume of 50 cm³ and a mass of 40 grams.</p>",
                    question: "What is the density of the wood? (Density = Mass / Volume)",
                    answerOptions: [
                        { text: "0.8 g/cm³", isCorrect: true, rationale: "Density = 40 g / 50 cm³ = 0.8 g/cm³." },
                        { text: "1.0 g/cm³", isCorrect: false, rationale: "This is the density of water." },
                        { text: "1.25 g/cm³", isCorrect: false, rationale: "This is the result of dividing volume by mass (50/40)." },
                        { text: "10 g/cm³", isCorrect: false, rationale: "This is the difference between the volume and mass values." }
                    ]
                },
                {
                    questionNumber: 2,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>The half-life of a radioactive substance is 10 years. A sample initially contains 80 grams of the substance.</p>",
                    question: "How many grams of the radioactive substance will remain after 20 years?",
                    answerOptions: [
                        { text: "0 grams", isCorrect: false, rationale: "The substance decays but does not disappear completely in this time." },
                        { text: "10 grams", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20 grams", isCorrect: true, rationale: "After 10 years (one half-life), 40g will remain. After another 10 years (a total of 20 years), half of the remaining 40g will decay, leaving 20g." },
                        { text: "40 grams", isCorrect: false, rationale: "This is the amount remaining after only 10 years." }
                    ]
                },
                {
                    questionNumber: 3,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A map has a scale of 1 centimeter = 5 kilometers. The distance between two cities on the map is 7 centimeters.</p>",
                    question: "What is the actual distance between the two cities?",
                    answerOptions: [
                        { text: "1.4 km", isCorrect: false, rationale: "This is the result of dividing 7 by 5." },
                        { text: "12 km", isCorrect: false, rationale: "This is the sum of 5 and 7." },
                        { text: "35 km", isCorrect: true, rationale: "Distance = 7 cm * 5 km/cm = 35 km." },
                        { text: "75 km", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 4,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>Data on daily rainfall: Monday: 5 mm, Tuesday: 0 mm, Wednesday: 12 mm, Thursday: 3 mm, Friday: 5 mm.</p>",
                    question: "What is the median rainfall for the week?",
                    answerOptions: [
                        { text: "0 mm", isCorrect: false, rationale: "This is the minimum value, not the median." },
                        { text: "5 mm", isCorrect: true, rationale: "To find the median, first order the data: 0, 3, 5, 5, 12. The middle value is 5 mm." },
                        { text: "5.4 mm", isCorrect: false, rationale: "This is the mean (average), not the median." },
                        { text: "12 mm", isCorrect: false, rationale: "This is the maximum value, not the median." }
                    ]
                },
                {
                    questionNumber: 5,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A lab procedure requires 250 milliliters (mL) of a solution. The scientist has a 2-liter bottle of the solution.</p>",
                    question: "How many times can the scientist complete the procedure with the 2-liter bottle? (1 liter = 1000 mL)",
                    answerOptions: [
                        { text: "4 times", isCorrect: false, rationale: "This would be the number of times for a 1-liter bottle." },
                        { text: "8 times", isCorrect: true, rationale: "First, convert 2 liters to milliliters: 2 L * 1000 mL/L = 2000 mL. Then, divide by the amount per procedure: 2000 mL / 250 mL = 8." },
                        { text: "12 times", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20 times", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 6,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>The recommended daily intake of Vitamin C is 60 mg. An orange contains about 15 mg of Vitamin C.</p>",
                    question: "What percentage of the recommended daily intake is provided by one orange?",
                    answerOptions: [
                        { text: "15%", isCorrect: false, rationale: "This is the amount in milligrams, not the percentage." },
                        { text: "25%", isCorrect: true, rationale: "Percentage = (Part / Whole) * 100. (15 mg / 60 mg) * 100 = 0.25 * 100 = 25%." },
                        { text: "30%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "60%", isCorrect: false, rationale: "This is the total recommended amount." }
                    ]
                },
                {
                    questionNumber: 7,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A small engine consumes 0.2 liters of fuel per hour. The fuel tank has a capacity of 1.5 liters.</p>",
                    question: "How long can the engine run on a full tank of fuel?",
                    answerOptions: [
                        { text: "3 hours", isCorrect: false, rationale: "This is the result of multiplying 1.5 by 2." },
                        { text: "5.5 hours", isCorrect: false, rationale: "This is incorrect." },
                        { text: "7.5 hours", isCorrect: true, rationale: "Time = Total Volume / Rate. Time = 1.5 L / 0.2 L/hr = 7.5 hours." },
                        { text: "15 hours", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 8,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A force of 20 Newtons is applied to an object with a mass of 5 kilograms.</p>",
                    question: "What is the acceleration of the object? (Force = mass × acceleration)",
                    answerOptions: [
                        { text: "4 m/s²", isCorrect: true, rationale: "Acceleration = Force / mass. Acceleration = 20 N / 5 kg = 4 m/s²." },
                        { text: "15 m/s²", isCorrect: false, rationale: "This is the difference between the force and mass." },
                        { text: "25 m/s²", isCorrect: false, rationale: "This is the sum of the force and mass." },
                        { text: "100 m/s²", isCorrect: false, rationale: "This is the product of the force and mass." }
                    ]
                },
                {
                    questionNumber: 9,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A student's scores on four science tests are 85, 90, 80, and 95. </p>",
                    question: "What is the student's average (mean) score?",
                    answerOptions: [
                        { text: "85", isCorrect: false, rationale: "This is one of the scores, but not the average." },
                        { text: "87.5", isCorrect: true, rationale: "Sum of scores = 85 + 90 + 80 + 95 = 350. Average = 350 / 4 = 87.5." },
                        { text: "90", isCorrect: false, rationale: "This is one of the scores, but not the average." },
                        { text: "95", isCorrect: false, rationale: "This is the highest score." }
                    ]
                },
                {
                    questionNumber: 10,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A container holds 3 moles of helium gas. The total mass of the gas is 12 grams.</p>",
                    question: "What is the molar mass of helium in grams per mole (g/mol)?",
                    answerOptions: [
                        { text: "3 g/mol", isCorrect: false, rationale: "This is the number of moles." },
                        { text: "4 g/mol", isCorrect: true, rationale: "Molar Mass = Total Mass / Moles. Molar Mass = 12 g / 3 mol = 4 g/mol." },
                        { text: "9 g/mol", isCorrect: false, rationale: "This is incorrect." },
                        { text: "36 g/mol", isCorrect: false, rationale: "This is the product of mass and moles." }
                    ]
                },
                {
                    questionNumber: 11,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A circuit has a voltage of 12 volts and a resistance of 3 ohms.</p>",
                    question: "What is the current in the circuit in amperes (A)? (Voltage = Current × Resistance)",
                    answerOptions: [
                        { text: "4 A", isCorrect: true, rationale: "Current = Voltage / Resistance. Current = 12 V / 3 Ω = 4 A." },
                        { text: "9 A", isCorrect: false, rationale: "This is the difference between voltage and resistance." },
                        { text: "15 A", isCorrect: false, rationale: "This is the sum of voltage and resistance." },
                        { text: "36 A", isCorrect: false, rationale: "This is the product of voltage and resistance." }
                    ]
                },
                {
                    questionNumber: 12,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>The population of a town was 10,000 in the year 2010. In 2020, the population was 12,000.</p>",
                    question: "What was the percentage increase in the population over the 10 years?",
                    answerOptions: [
                        { text: "12%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "16.7%", isCorrect: false, rationale: "This would be the percent decrease if the population went from 12,000 to 10,000." },
                        { text: "20%", isCorrect: true, rationale: "Increase = 12,000 - 10,000 = 2,000. Percent Increase = (Increase / Original) * 100 = (2000 / 10000) * 100 = 0.2 * 100 = 20%." },
                        { text: "2000%", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        },
        {
            quizId: "sci_scientific_numeracy_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A runner completes a 5-kilometer race in 25 minutes.</p>",
                    question: "What is the runner's average speed in kilometers per minute?",
                    answerOptions: [
                        { text: "0.2 km/min", isCorrect: true, rationale: "Speed = Distance / Time. Speed = 5 km / 25 min = 0.2 km/min." },
                        { text: "0.5 km/min", isCorrect: false, rationale: "This would be the speed for a 10-minute race." },
                        { text: "5 km/min", isCorrect: false, rationale: "This would be the speed for a 1-minute race." },
                        { text: "125 km/min", isCorrect: false, rationale: "This is the product of distance and time." }
                    ]
                },
                {
                    questionNumber: 2,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A lab sample has a mass of 150 grams. After dehydration, its mass is 120 grams.</p>",
                    question: "What percentage of the original mass was water?",
                    answerOptions: [
                        { text: "15%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20%", isCorrect: true, rationale: "Mass of water = 150g - 120g = 30g. Percentage = (Mass of Water / Original Mass) * 100 = (30 / 150) * 100 = 0.2 * 100 = 20%." },
                        { text: "25%", isCorrect: false, rationale: "This would be true if the final mass was 112.5g." },
                        { text: "30%", isCorrect: false, rationale: "This is the mass of the water, not the percentage." }
                    ]
                },
                {
                    questionNumber: 3,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>An experiment starts with a temperature of -5°C. The temperature rises by 15°C.</p>",
                    question: "What is the final temperature?",
                    answerOptions: [
                        { text: "-20°C", isCorrect: false, rationale: "This would be the result of subtracting 15." },
                        { text: "-10°C", isCorrect: false, rationale: "This is incorrect." },
                        { text: "10°C", isCorrect: true, rationale: "Final temperature = -5°C + 15°C = 10°C." },
                        { text: "20°C", isCorrect: false, rationale: "This is the sum of the absolute values." }
                    ]
                },
                {
                    questionNumber: 4,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A gear ratio in a machine is 3:1. This means the input gear makes 3 rotations for every 1 rotation of the output gear. The input gear rotates 120 times.</p>",
                    question: "How many times does the output gear rotate?",
                    answerOptions: [
                        { text: "30 times", isCorrect: false, rationale: "This is incorrect." },
                        { text: "40 times", isCorrect: true, rationale: "The output gear rotates 1/3 as many times as the input gear. 120 / 3 = 40 times." },
                        { text: "120 times", isCorrect: false, rationale: "This is the rotation of the input gear." },
                        { text: "360 times", isCorrect: false, rationale: "This would be the case if the ratio was 1:3." }
                    ]
                },
                {
                    questionNumber: 5,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<table><tr><th>Substance</th><th>pH</th></tr><tr><td>Lemon Juice</td><td>2</td></tr><tr><td>Pure Water</td><td>7</td></tr><tr><td>Soap</td><td>10</td></tr><tr><td>Bleach</td><td>13</td></tr></table>",
                    question: "According to the table, how many times more acidic is lemon juice than pure water?",
                    answerOptions: [
                        { text: "5 times", isCorrect: false, rationale: "The pH scale is logarithmic, not linear. The difference is 7-2=5, but this is not the factor." },
                        { text: "100 times", isCorrect: false, rationale: "This would be a pH difference of 2." },
                        { text: "1,000 times", isCorrect: false, rationale: "This would be a pH difference of 3." },
                        { text: "100,000 times", isCorrect: true, rationale: "The pH scale is logarithmic (base 10). A difference of 1 pH unit is a 10x difference in acidity. A difference of 5 pH units (from 7 to 2) is 10^5, or 100,000 times more acidic." }
                    ]
                },
                {
                    questionNumber: 6,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A sound wave travels at 340 meters per second in air. A lightning strike is seen, and the thunder is heard 4 seconds later.</p>",
                    question: "Approximately how far away was the lightning strike in meters?",
                    answerOptions: [
                        { text: "85 meters", isCorrect: false, rationale: "This is the result of dividing speed by time." },
                        { text: "340 meters", isCorrect: false, rationale: "This is the distance it travels in one second." },
                        { text: "1360 meters", isCorrect: true, rationale: "Distance = Speed × Time. Distance = 340 m/s * 4 s = 1360 meters." },
                        { text: "1700 meters", isCorrect: false, rationale: "This would be the distance if the sound took 5 seconds." }
                    ]
                },
                {
                    questionNumber: 7,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>The masses of five samples are: 12g, 15g, 11g, 18g, and 11g.</p>",
                    question: "What is the mode of this data set?",
                    answerOptions: [
                        { text: "11g", isCorrect: true, rationale: "The mode is the value that appears most frequently in a data set. The value 11g appears twice." },
                        { text: "12g", isCorrect: false, rationale: "This value appears only once." },
                        { text: "13.4g", isCorrect: false, rationale: "This is the mean of the data set, not the mode." },
                        { text: "18g", isCorrect: false, rationale: "This is the maximum value, not the mode." }
                    ]
                },
                {
                    questionNumber: 8,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A lab experiment requires a ratio of 2 parts acid to 3 parts water. A chemist needs to make a total of 500 mL of the solution.</p>",
                    question: "How much acid is needed?",
                    answerOptions: [
                        { text: "100 mL", isCorrect: false, rationale: "This is incorrect." },
                        { text: "200 mL", isCorrect: true, rationale: "The total number of parts is 2 + 3 = 5. The fraction of acid is 2/5. Amount of acid = (2/5) * 500 mL = 200 mL." },
                        { text: "250 mL", isCorrect: false, rationale: "This would be a 1:1 ratio." },
                        { text: "300 mL", isCorrect: false, rationale: "This would be the amount of water needed." }
                    ]
                },
                {
                    questionNumber: 9,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A survey of 300 students finds that 120 of them prefer science over other subjects.</p>",
                    question: "What fraction of students prefer science? (Simplify your answer)",
                    answerOptions: [
                        { text: "1/3", isCorrect: false, rationale: "This would be 100 out of 300 students." },
                        { text: "2/5", isCorrect: true, rationale: "The fraction is 120/300. This can be simplified by dividing both numerator and denominator by their greatest common divisor, which is 60. 120/60 = 2, and 300/60 = 5. So, the fraction is 2/5." },
                        { text: "1/2", isCorrect: false, rationale: "This would be 150 out of 300 students." },
                        { text: "3/5", isCorrect: false, rationale: "This would be 180 out of 300 students." }
                    ]
                },
                {
                    questionNumber: 10,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>An investment of $500 earns simple interest at a rate of 4% per year. </p>",
                    question: "How much interest will the investment earn in one year?",
                    answerOptions: [
                        { text: "$4", isCorrect: false, rationale: "This would be the interest on $100." },
                        { text: "$20", isCorrect: true, rationale: "Interest = Principal * Rate. Interest = $500 * 4% = $500 * 0.04 = $20." },
                        { text: "$40", isCorrect: false, rationale: "This would be the result of an 8% interest rate." },
                        { text: "$520", isCorrect: false, rationale: "This is the total amount after one year, not just the interest earned." }
                    ]
                },
                {
                    questionNumber: 11,
                    qaProfileKey: "numeracy",
                    type: "text",
                    passage: "<p>A piece of equipment uses 500 watts of power. It is left on for 6 hours.</p>",
                    question: "How much energy does it consume in kilowatt-hours (kWh)? (1 kilowatt = 1000 watts)",
                    answerOptions: [
                        { text: "0.3 kWh", isCorrect: false, rationale: "This is incorrect." },
                        { text: "3 kWh", isCorrect: true, rationale: "First, convert power to kilowatts: 500 W / 1000 W/kW = 0.5 kW. Then, multiply by time: 0.5 kW * 6 hours = 3 kWh." },
                        { text: "30 kWh", isCorrect: false, rationale: "This is incorrect." },
                        { text: "3000 kWh", isCorrect: false, rationale: "This is the energy consumed in watt-hours, not kilowatt-hours." }
                    ]
                },
                {
                    questionNumber: 12,
                    qaProfileKey: "numeracy",
                    type: "chart",
                    passage: "<p>A scientist cools a liquid from 25°C to -15°C.</p>",
                    question: "What is the total temperature change?",
                    answerOptions: [
                        { text: "10°C", isCorrect: false, rationale: "This is the difference between 25 and 15, ignoring the negative sign." },
                        { text: "25°C", isCorrect: false, rationale: "This is the starting temperature." },
                        { text: "30°C", isCorrect: false, rationale: "This is incorrect." },
                        { text: "40°C", isCorrect: true, rationale: "The change is the difference between the final and initial temperatures. However, the question asks for the total change, which is the magnitude of the drop. The temperature drops 25 degrees to get to 0, and then another 15 degrees. 25 + 15 = 40°C." }
                    ]
                }
            ]
        }
    ]
};
// Math -> Quantitative Problem Solving -> Whole Numbers, Fractions & Decimals
AppData.quizzes.math_whole_numbers_fractions_decimals = {
    id: "math_whole_numbers_fractions_decimals",
    title: "Whole Numbers, Fractions & Decimals",
    description: "Operations with whole numbers, fractions, and decimals.",
    quizzes: [
        {
            quizId: "math_whole_numbers_fractions_decimals_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the result of $3 \\times (5 + 4) - 2$?",
                    answerOptions: [
                        { text: "17", isCorrect: false, rationale: "This result incorrectly adds 4 and 5 before multiplying by 3, but then subtracts 2 from 9 instead of from 27." },
                        { text: "21", isCorrect: false, rationale: "This result incorrectly multiplies 3 by 5 first, then adds 4." },
                        { text: "25", isCorrect: true, rationale: "Following the order of operations (PEMDAS), first calculate the parentheses (5+4=9), then multiply (3*9=27), then subtract (27-2=25)." },
                        { text: "27", isCorrect: false, rationale: "This is the result before the final subtraction." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "Which fraction is equivalent to $\\frac{3}{4}$?",
                    answerOptions: [
                        { text: "$\\frac{6}{10}$", isCorrect: false, rationale: "This fraction simplifies to 3/5, not 3/4." },
                        { text: "$\\frac{9}{12}$", isCorrect: true, rationale: "Multiplying the numerator and denominator of 3/4 by 3 gives 9/12." },
                        { text: "$\\frac{8}{12}$", isCorrect: false, rationale: "This fraction simplifies to 2/3, not 3/4." },
                        { text: "$\\frac{3}{8}$", isCorrect: false, rationale: "This fraction is not equivalent to 3/4." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "Convert the decimal 0.75 into a fraction in its simplest form.",
                    answerOptions: [
                        { text: "$\\frac{75}{100}$", isCorrect: false, rationale: "While correct, this is not in simplest form." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "1/2 is equivalent to 0.5." },
                        { text: "$\\frac{3}{4}$", isCorrect: true, rationale: "0.75 is seventy-five hundredths, or 75/100, which simplifies to 3/4 by dividing the numerator and denominator by 25." },
                        { text: "$\\frac{4}{5}$", isCorrect: false, rationale: "4/5 is equivalent to 0.8." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "knowledge",
                    question: "A recipe calls for $2\\frac{1}{2}$ cups of flour. If you want to make half the recipe, how much flour do you need?",
                    answerOptions: [
                        { text: "$1$ cup", isCorrect: false, rationale: "This is less than half." },
                        { text: "$1\\frac{1}{4}$ cups", isCorrect: true, rationale: "First, convert the mixed number to an improper fraction: 2 1/2 = 5/2. Then, multiply by 1/2: (5/2) * (1/2) = 5/4, which is 1 1/4 cups." },
                        { text: "$1\\frac{1}{2}$ cups", isCorrect: false, rationale: "This is more than half." },
                        { text: "$1\\frac{3}{4}$ cups", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "knowledge",
                    question: "A customer buys items costing $3.25, $12.50, and $7.85. If they pay with a $25 bill, how much change should they receive?",
                    answerOptions: [
                        { text: "$1.40", isCorrect: true, rationale: "Total cost = $3.25 + $12.50 + $7.85 = $23.60. Change = $25.00 - $23.60 = $1.40." },
                        { text: "$1.50", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$2.40", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$23.60", isCorrect: false, rationale: "This is the total cost, not the change." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "What is $\\frac{1}{3} + \\frac{1}{6}$?",
                    answerOptions: [
                        { text: "$\\frac{2}{9}$", isCorrect: false, rationale: "You cannot add fractions by adding the numerators and denominators directly." },
                        { text: "$\\frac{1}{2}$", isCorrect: true, rationale: "Find a common denominator, which is 6. Convert 1/3 to 2/6. Then, add the fractions: 2/6 + 1/6 = 3/6, which simplifies to 1/2." },
                        { text: "$\\frac{1}{3}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{2}{3}$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "Find the product of $0.5 \\times 0.2$.",
                    answerOptions: [
                        { text: "1.0", isCorrect: false, rationale: "This is the result of adding the numbers, not multiplying." },
                        { text: "0.01", isCorrect: false, rationale: "This is incorrect." },
                        { text: "0.1", isCorrect: true, rationale: "5 times 2 is 10. Since there are two decimal places in total (one in each number), the result is 0.10, or 0.1." },
                        { text: "10.0", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "A piece of wood is $8.4$ feet long. If you cut it into 4 equal pieces, how long is each piece?",
                    answerOptions: [
                        { text: "2.0 feet", isCorrect: false, rationale: "This is an estimation, not the exact answer." },
                        { text: "2.1 feet", isCorrect: true, rationale: "Length of each piece = 8.4 feet / 4 = 2.1 feet." },
                        { text: "2.4 feet", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "4.2 feet", isCorrect: false, rationale: "This is the length if you cut it into 2 pieces." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following numbers is a prime number?",
                    answerOptions: [
                        { text: "9", isCorrect: false, rationale: "9 is divisible by 3." },
                        { text: "15", isCorrect: false, rationale: "15 is divisible by 3 and 5." },
                        { text: "21", isCorrect: false, rationale: "21 is divisible by 3 and 7." },
                        { text: "17", isCorrect: true, rationale: "A prime number is a number greater than 1 that has only two divisors: 1 and itself. 17 is only divisible by 1 and 17." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the value of $5^3$?",
                    answerOptions: [
                        { text: "15", isCorrect: false, rationale: "This is the result of 5 * 3." },
                        { text: "25", isCorrect: false, rationale: "This is 5 squared (5^2)." },
                        { text: "125", isCorrect: true, rationale: "5^3 means 5 * 5 * 5, which equals 125." },
                        { text: "53", isCorrect: false, rationale: "This is not the correct calculation." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "knowledge",
                    question: "A baker uses $\\frac{3}{4}$ of a pound of butter for a batch of cookies. If she has 6 pounds of butter, how many batches can she make?",
                    answerOptions: [
                        { text: "4 batches", isCorrect: false, rationale: "This is incorrect." },
                        { text: "6 batches", isCorrect: false, rationale: "This is the total amount of butter she has." },
                        { text: "8 batches", isCorrect: true, rationale: "To find the number of batches, divide the total butter by the amount per batch: 6 / (3/4) = 6 * (4/3) = 24 / 3 = 8 batches." },
                        { text: "9 batches", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "What is $4.5$ divided by $0.9$?",
                    answerOptions: [
                        { text: "0.5", isCorrect: false, rationale: "This is incorrect." },
                        { text: "5", isCorrect: true, rationale: "Dividing by 0.9 is the same as dividing by 9/10, which is the same as multiplying by 10/9. Alternatively, 4.5 / 0.9 is the same as 45 / 9, which equals 5." },
                        { text: "50", isCorrect: false, rationale: "This is incorrect." },
                        { text: "4.05", isCorrect: false, rationale: "This is the result of 4.5 * 0.9." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "A store offers a 20% discount on an item that costs $80. What is the sale price?",
                    answerOptions: [
                        { text: "$16", isCorrect: false, rationale: "This is the amount of the discount, not the final price." },
                        { text: "$60", isCorrect: false, rationale: "This would be a 25% discount." },
                        { text: "$64", isCorrect: true, rationale: "The discount is 20% of $80, which is 0.20 * 80 = $16. The sale price is $80 - $16 = $64." },
                        { text: "$78.40", isCorrect: false, rationale: "This is a 2% discount, not 20%." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "Round 12.345 to the nearest hundredth.",
                    answerOptions: [
                        { text: "12.3", isCorrect: false, rationale: "This is rounding to the nearest tenth." },
                        { text: "12.34", isCorrect: false, rationale: "This is truncating, not rounding. The next digit (5) means you should round up." },
                        { text: "12.35", isCorrect: true, rationale: "The hundredths digit is 4. The next digit is 5, so you round the 4 up to 5." },
                        { text: "12.4", isCorrect: false, rationale: "This is incorrect rounding." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the least common multiple (LCM) of 6 and 8?",
                    answerOptions: [
                        { text: "12", isCorrect: false, rationale: "12 is a multiple of 6, but not of 8." },
                        { text: "18", isCorrect: false, rationale: "18 is a multiple of 6, but not of 8." },
                        { text: "24", isCorrect: true, rationale: "Multiples of 6 are 6, 12, 18, 24... Multiples of 8 are 8, 16, 24... The first multiple they have in common is 24." },
                        { text: "48", isCorrect: false, rationale: "48 is a common multiple, but it is not the least common multiple." }
                    ]
                }
            ]
        },
        {
            quizId: "math_whole_numbers_fractions_decimals_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "Calculate: $50 - 4 \\times (3 + 2)$.",
                    answerOptions: [
                        { text: "30", isCorrect: true, rationale: "First, solve the parentheses: 3 + 2 = 5. Then, multiply: 4 * 5 = 20. Finally, subtract: 50 - 20 = 30." },
                        { text: "41", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "230", isCorrect: false, rationale: "This result incorrectly subtracts 4 from 50 before multiplying." },
                        { text: "90", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "Express the improper fraction $\\frac{11}{4}$ as a mixed number.",
                    answerOptions: [
                        { text: "$1\\frac{3}{4}$", isCorrect: false, rationale: "This would be 7/4." },
                        { text: "$2\\frac{1}{4}$", isCorrect: false, rationale: "This would be 9/4." },
                        { text: "$2\\frac{3}{4}$", isCorrect: true, rationale: "4 goes into 11 two times (2*4=8) with a remainder of 3. So, the mixed number is 2 3/4." },
                        { text: "$3\\frac{1}{4}$", isCorrect: false, rationale: "This would be 13/4." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "What is $2.5$ expressed as a fraction?",
                    answerOptions: [
                        { text: "$\\frac{2}{5}$", isCorrect: false, rationale: "This is equal to 0.4." },
                        { text: "$\\frac{5}{2}$", isCorrect: true, rationale: "2.5 is two and a half, which can be written as the mixed number 2 1/2, or the improper fraction 5/2." },
                        { text: "$\\frac{25}{100}$", isCorrect: false, rationale: "This is equal to 0.25." },
                        { text: "$\\frac{5}{10}$", isCorrect: false, rationale: "This is equal to 0.5." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "knowledge",
                    question: "A carpenter has a board that is 10 feet long. He needs to cut a piece that is $3\\frac{3}{4}$ feet long. How much of the board is left?",
                    answerOptions: [
                        { text: "$6$ feet", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$6\\frac{1}{4}$ feet", isCorrect: true, rationale: "10 - 3 3/4. You can think of 10 as 9 + 4/4. So, (9 4/4) - (3 3/4) = (9-3) and (4/4 - 3/4) = 6 1/4 feet." },
                        { text: "$6\\frac{3}{4}$ feet", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$7\\frac{1}{4}$ feet", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the product of $\\frac{2}{3}$ and $\\frac{3}{5}$?",
                    answerOptions: [
                        { text: "$\\frac{5}{8}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{6}{15}$", isCorrect: false, rationale: "While this is the correct product, it is not in simplest form." },
                        { text: "$\\frac{2}{5}$", isCorrect: true, rationale: "Multiply the numerators (2*3=6) and the denominators (3*5=15) to get 6/15. This simplifies to 2/5 by dividing both by 3." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: true,
                    type: "knowledge",
                    question: "An employee earns $15.50 per hour. If they work for 8 hours, what are their total earnings?",
                    answerOptions: [
                        { text: "$100.00", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$120.00", isCorrect: false, rationale: "This would be the earnings for an hourly rate of $15." },
                        { text: "$124.00", isCorrect: true, rationale: "Total earnings = $15.50/hour * 8 hours = $124.00." },
                        { text: "$132.00", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "Find the sum of $1.25 + 0.7 + 2.05$.",
                    answerOptions: [
                        { text: "3.00", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "4.00", isCorrect: true, rationale: "Align the decimal points and add: 1.25 + 0.70 + 2.05 = 4.00." },
                        { text: "3.90", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "4.20", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: false,
                    type: "knowledge",
                    question: "What is $12$ divided by $\\frac{1}{4}$?",
                    answerOptions: [
                        { text: "3", isCorrect: false, rationale: "This is the result of multiplying 12 by 1/4." },
                        { text: "4", isCorrect: false, rationale: "This is incorrect." },
                        { text: "24", isCorrect: false, rationale: "This is incorrect." },
                        { text: "48", isCorrect: true, rationale: "Dividing by a fraction is the same as multiplying by its reciprocal. So, 12 / (1/4) = 12 * 4 = 48." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "Find the greatest common factor (GCF) of 18 and 24.",
                    answerOptions: [
                        { text: "3", isCorrect: false, rationale: "3 is a common factor, but not the greatest." },
                        { text: "6", isCorrect: true, rationale: "The factors of 18 are 1, 2, 3, 6, 9, 18. The factors of 24 are 1, 2, 3, 4, 6, 8, 12, 24. The greatest factor they share is 6." },
                        { text: "9", isCorrect: false, rationale: "9 is a factor of 18 but not of 24." },
                        { text: "12", isCorrect: false, rationale: "12 is a factor of 24 but not of 18." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: true,
                    type: "knowledge",
                    question: "A car's gas tank holds 15 gallons. If the car gets 25.5 miles per gallon, how far can it travel on a full tank?",
                    answerOptions: [
                        { text: "350.5 miles", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "382.5 miles", isCorrect: true, rationale: "Total distance = 15 gallons * 25.5 miles/gallon = 382.5 miles." },
                        { text: "400 miles", isCorrect: false, rationale: "This is an approximation." },
                        { text: "375.5 miles", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the result of $10 - 3.75$?",
                    answerOptions: [
                        { text: "6.25", isCorrect: true, rationale: "10.00 - 3.75 = 6.25." },
                        { text: "6.75", isCorrect: false, rationale: "This is an incorrect subtraction." },
                        { text: "7.25", isCorrect: false, rationale: "This is an incorrect subtraction." },
                        { text: "13.75", isCorrect: false, rationale: "This is the sum, not the difference." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following is the correct order from least to greatest: $\\frac{1}{2}, 0.6, \\frac{2}{5}$?",
                    answerOptions: [
                        { text: "$\\frac{1}{2}, 0.6, \\frac{2}{5}$", isCorrect: false, rationale: "1/2 is 0.5, which is less than 0.6, but 2/5 (0.4) is the smallest." },
                        { text: "$\\frac{2}{5}, 0.6, \\frac{1}{2}$", isCorrect: false, rationale: "1/2 (0.5) is less than 0.6." },
                        { text: "$0.6, \\frac{1}{2}, \\frac{2}{5}$", isCorrect: false, rationale: "This is in descending order." },
                        { text: "$\\frac{2}{5}, \\frac{1}{2}, 0.6$", isCorrect: true, rationale: "Convert all to decimals to compare: 2/5 = 0.4, 1/2 = 0.5. The correct order is 0.4, 0.5, 0.6." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "A recipe requires $\\frac{3}{4}$ cup of sugar for 12 cookies. How much sugar is needed to make 36 cookies?",
                    answerOptions: [
                        { text: "$1\\frac{1}{2}$ cups", isCorrect: false, rationale: "This is not enough." },
                        { text: "$2$ cups", isCorrect: false, rationale: "This is not enough." },
                        { text: "$2\\frac{1}{4}$ cups", isCorrect: true, rationale: "36 cookies is 3 times the original recipe (36/12 = 3). So, you need 3 times the sugar: 3 * (3/4) = 9/4 = 2 1/4 cups." },
                        { text: "$3$ cups", isCorrect: false, rationale: "This is too much." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the prime factorization of 30?",
                    answerOptions: [
                        { text: "$3 \\times 10$", isCorrect: false, rationale: "10 is not a prime number." },
                        { text: "$5 \\times 6$", isCorrect: false, rationale: "6 is not a prime number." },
                        { text: "$2 \\times 3 \\times 5$", isCorrect: true, rationale: "30 can be broken down into 2 * 15, and 15 can be broken down into 3 * 5. All of these numbers are prime." },
                        { text: "$2 \\times 15$", isCorrect: false, rationale: "15 is not a prime number." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: true,
                    type: "knowledge",
                    question: "A runner's time for three miles was 21.45 minutes. What was the average time per mile?",
                    answerOptions: [
                        { text: "7.00 minutes", isCorrect: false, rationale: "This is an approximation." },
                        { text: "7.05 minutes", isCorrect: false, rationale: "This is incorrect." },
                        { text: "7.15 minutes", isCorrect: true, rationale: "Average time = Total time / Number of miles = 21.45 / 3 = 7.15 minutes." },
                        { text: "7.25 minutes", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        },
        {
            quizId: "math_whole_numbers_fractions_decimals_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "What is $100 \\div 5 - 2 \\times 3$?",
                    answerOptions: [
                        { text: "14", isCorrect: true, rationale: "First, perform division and multiplication from left to right: 100/5 = 20, and 2*3 = 6. Then, subtract: 20 - 6 = 14." },
                        { text: "54", isCorrect: false, rationale: "This result incorrectly subtracts 2 from 5 before multiplying." },
                        { text: "94", isCorrect: false, rationale: "This result incorrectly multiplies 2 by 3 first, then divides." },
                        { text: "4", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify the fraction $\\frac{12}{18}$.",
                    answerOptions: [
                        { text: "$\\frac{6}{9}$", isCorrect: false, rationale: "This can be simplified further." },
                        { text: "$\\frac{4}{6}$", isCorrect: false, rationale: "This can be simplified further." },
                        { text: "$\\frac{2}{3}$", isCorrect: true, rationale: "The greatest common factor of 12 and 18 is 6. Dividing both the numerator and denominator by 6 gives 2/3." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "Which decimal is equivalent to $\\frac{3}{5}$?",
                    answerOptions: [
                        { text: "0.3", isCorrect: false, rationale: "This is 3/10." },
                        { text: "0.5", isCorrect: false, rationale: "This is 1/2." },
                        { text: "0.6", isCorrect: true, rationale: "To convert a fraction to a decimal, divide the numerator by the denominator: 3 / 5 = 0.6." },
                        { text: "3.5", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "knowledge",
                    question: "A company's stock was priced at $45.25. It dropped by $3.50. What is the new price?",
                    answerOptions: [
                        { text: "$41.75", isCorrect: true, rationale: "New price = $45.25 - $3.50 = $41.75." },
                        { text: "$42.25", isCorrect: false, rationale: "This is an incorrect subtraction." },
                        { text: "$42.75", isCorrect: false, rationale: "This is an incorrect subtraction." },
                        { text: "$48.75", isCorrect: false, rationale: "This is the result of adding, not subtracting." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: false,
                    type: "knowledge",
                    question: "Calculate $\\frac{5}{8} - \\frac{1}{4}$.",
                    answerOptions: [
                        { text: "$\\frac{4}{4}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{4}{8}$", isCorrect: false, rationale: "This is not the correct subtraction." },
                        { text: "$\\frac{3}{8}$", isCorrect: true, rationale: "The common denominator is 8. Convert 1/4 to 2/8. Then, subtract: 5/8 - 2/8 = 3/8." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This would be 4/8, which is incorrect." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: true,
                    type: "knowledge",
                    question: "You buy 3.5 pounds of apples at $1.80 per pound. What is the total cost?",
                    answerOptions: [
                        { text: "$5.30", isCorrect: false, rationale: "This is the sum, not the product." },
                        { text: "$6.00", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$6.30", isCorrect: true, rationale: "Total cost = 3.5 pounds * $1.80/pound = $6.30." },
                        { text: "$7.00", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the next number in the sequence: 3, 6, 12, 24, ...?",
                    answerOptions: [
                        { text: "30", isCorrect: false, rationale: "The pattern is not adding 6." },
                        { text: "36", isCorrect: false, rationale: "The pattern is not adding 12." },
                        { text: "48", isCorrect: true, rationale: "This is a geometric sequence where each number is multiplied by 2. 24 * 2 = 48." },
                        { text: "60", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "A pizza is cut into 8 equal slices. If you eat 3 slices, what fraction of the pizza is left?",
                    answerOptions: [
                        { text: "$\\frac{3}{8}$", isCorrect: false, rationale: "This is the fraction that was eaten." },
                        { text: "$\\frac{5}{8}$", isCorrect: true, rationale: "If you eat 3 slices, there are 8 - 3 = 5 slices left. So, 5/8 of the pizza is left." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This would be 4 slices." },
                        { text: "$\\frac{3}{5}$", isCorrect: false, rationale: "This is the ratio of eaten slices to remaining slices." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the value of the digit 7 in the number 45.678?",
                    answerOptions: [
                        { text: "7 tenths", isCorrect: false, rationale: "The tenths place is occupied by the digit 6." },
                        { text: "7 hundredths", isCorrect: true, rationale: "The digit 7 is in the second place after the decimal point, which is the hundredths place. Its value is 7/100 or 0.07." },
                        { text: "7 thousandths", isCorrect: false, rationale: "The thousandths place is occupied by the digit 8." },
                        { text: "7", isCorrect: false, rationale: "Its place value is not 7 ones." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: true,
                    type: "knowledge",
                    question: "A survey of 50 people found that 35 of them own a pet. What percentage of people surveyed own a pet?",
                    answerOptions: [
                        { text: "35%", isCorrect: false, rationale: "This is the number of people, not the percentage." },
                        { text: "60%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "70%", isCorrect: true, rationale: "Percentage = (Part / Whole) * 100 = (35 / 50) * 100 = 0.7 * 100 = 70%." },
                        { text: "75%", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: false,
                    type: "knowledge",
                    question: "What is 25% of 200?",
                    answerOptions: [
                        { text: "25", isCorrect: false, rationale: "This would be 25% of 100." },
                        { text: "50", isCorrect: true, rationale: "25% is equivalent to 1/4. 1/4 of 200 is 50. Alternatively, 0.25 * 200 = 50." },
                        { text: "75", isCorrect: false, rationale: "This would be 75% of 100." },
                        { text: "100", isCorrect: false, rationale: "This would be 50% of 200." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: true,
                    type: "knowledge",
                    question: "A container holds $5\\frac{1}{2}$ gallons of water. If you use $2\\frac{3}{4}$ gallons, how much is left?",
                    answerOptions: [
                        { text: "$2\\frac{1}{2}$ gallons", isCorrect: false, rationale: "This is an incorrect subtraction." },
                        { text: "$2\\frac{3}{4}$ gallons", isCorrect: true, rationale: "Convert to improper fractions: 5 1/2 = 11/2 and 2 3/4 = 11/4. Find a common denominator: 11/2 = 22/4. Now subtract: 22/4 - 11/4 = 11/4, which is 2 3/4 gallons." },
                        { text: "$3$ gallons", isCorrect: false, rationale: "This is an incorrect subtraction." },
                        { text: "$3\\frac{1}{4}$ gallons", isCorrect: false, rationale: "This is an incorrect subtraction." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the absolute value of -15?",
                    answerOptions: [
                        { text: "-15", isCorrect: false, rationale: "The absolute value is the distance from zero, which is always non-negative." },
                        { text: "0", isCorrect: false, rationale: "The absolute value is not 0 unless the number is 0." },
                        { text: "15", isCorrect: true, rationale: "The absolute value of a number is its distance from zero on the number line, which is always a positive value. $|-15| = 15$." },
                        { text: "1.5", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: true,
                    type: "knowledge",
                    question: "If a box of 12 pencils costs $2.40, what is the cost of one pencil?",
                    answerOptions: [
                        { text: "$0.12", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$0.20", isCorrect: true, rationale: "Cost per pencil = Total cost / Number of pencils = $2.40 / 12 = $0.20." },
                        { text: "$0.24", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$0.50", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following numbers is divisible by 3?",
                    answerOptions: [
                        { text: "134", isCorrect: false, rationale: "The sum of the digits is 1+3+4=8, which is not divisible by 3." },
                        { text: "205", isCorrect: false, rationale: "The sum of the digits is 2+0+5=7, which is not divisible by 3." },
                        { text: "312", isCorrect: true, rationale: "A number is divisible by 3 if the sum of its digits is divisible by 3. The sum of the digits is 3+1+2=6, which is divisible by 3." },
                        { text: "401", isCorrect: false, rationale: "The sum of the digits is 4+0+1=5, which is not divisible by 3." }
                    ]
                }
            ]
        }
    ]
};
// Math -> Quantitative Problem Solving -> Ratios, Proportions, and Percents
AppData.quizzes.math_ratios_proportions_percents = {
    id: "math_ratios_proportions_percents",
    title: "Ratios, Proportions, and Percents",
    description: "Solving problems involving ratios, proportions, and percents.",
    quizzes: [
        {
            quizId: "math_ratios_proportions_percents_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "A bag contains 5 red marbles and 3 blue marbles. What is the ratio of red marbles to the total number of marbles?",
                    answerOptions: [
                        { text: "3:5", isCorrect: false, rationale: "This is the ratio of blue marbles to red marbles." },
                        { text: "5:3", isCorrect: false, rationale: "This is the ratio of red marbles to blue marbles." },
                        { text: "5:8", isCorrect: true, rationale: "There are 5 red marbles and a total of 5 + 3 = 8 marbles. The ratio is 5 to 8." },
                        { text: "8:5", isCorrect: false, rationale: "This is the ratio of total marbles to red marbles." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "Convert 45% to a fraction in simplest form.",
                    answerOptions: [
                        { text: "$\\frac{45}{100}$", isCorrect: false, rationale: "This is the correct fraction, but it is not in simplest form." },
                        { text: "$\\frac{9}{20}$", isCorrect: true, rationale: "45% means 45 out of 100. The fraction 45/100 can be simplified by dividing the numerator and denominator by 5." },
                        { text: "$\\frac{4}{5}$", isCorrect: false, rationale: "This is equivalent to 80%." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is equivalent to 50%." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: true,
                    type: "knowledge",
                    question: "If a car travels 120 miles on 5 gallons of gas, how many miles can it travel on a full tank of 18 gallons?",
                    answerOptions: [
                        { text: "24 miles", isCorrect: false, rationale: "This is the car's mileage per gallon, not the total distance." },
                        { text: "360 miles", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "432 miles", isCorrect: true, rationale: "First, find the miles per gallon: 120 miles / 5 gallons = 24 mpg. Then, multiply by the full tank size: 24 mpg * 18 gallons = 432 miles." },
                        { text: "600 miles", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "knowledge",
                    question: "A shirt originally priced at $40 is on sale for 25% off. What is the sale price?",
                    answerOptions: [
                        { text: "$10", isCorrect: false, rationale: "This is the amount of the discount, not the final price." },
                        { text: "$25", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$30", isCorrect: true, rationale: "The discount is 25% of $40, which is 0.25 * $40 = $10. The sale price is $40 - $10 = $30." },
                        { text: "$35", isCorrect: false, rationale: "This would be a 12.5% discount." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for x in the proportion: $\\frac{3}{4} = \\frac{x}{12}$",
                    answerOptions: [
                        { text: "6", isCorrect: false, rationale: "This is incorrect." },
                        { text: "8", isCorrect: false, rationale: "This is incorrect." },
                        { text: "9", isCorrect: true, rationale: "To get from the denominator 4 to 12, you multiply by 3. Therefore, you must also multiply the numerator 3 by 3, which gives x = 9." },
                        { text: "11", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: true,
                    type: "knowledge",
                    question: "A restaurant bill is $60. If you want to leave a 15% tip, how much should the tip be?",
                    answerOptions: [
                        { text: "$6", isCorrect: false, rationale: "This would be a 10% tip." },
                        { text: "$7.50", isCorrect: false, rationale: "This would be a 12.5% tip." },
                        { text: "$9", isCorrect: true, rationale: "To calculate the tip, multiply the bill by the percentage: $60 * 15% = $60 * 0.15 = $9." },
                        { text: "$15", isCorrect: false, rationale: "This would be a 25% tip." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "A recipe calls for a ratio of 2 cups of flour to 1 cup of sugar. If you use 6 cups of flour, how much sugar should you use?",
                    answerOptions: [
                        { text: "2 cups", isCorrect: false, rationale: "This does not maintain the 2:1 ratio." },
                        { text: "3 cups", isCorrect: true, rationale: "The ratio is 2:1. You are using 3 times the amount of flour (6 cups instead of 2), so you need 3 times the amount of sugar: 1 cup * 3 = 3 cups." },
                        { text: "4 cups", isCorrect: false, rationale: "This does not maintain the 2:1 ratio." },
                        { text: "6 cups", isCorrect: false, rationale: "This would be a 1:1 ratio." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: false,
                    type: "knowledge",
                    question: "What is 7% written as a decimal?",
                    answerOptions: [
                        { text: "7.0", isCorrect: false, rationale: "This is the whole number 7." },
                        { text: "0.7", isCorrect: false, rationale: "This is equivalent to 70%." },
                        { text: "0.07", isCorrect: true, rationale: "To convert a percentage to a decimal, divide by 100. 7 / 100 = 0.07." },
                        { text: "0.007", isCorrect: false, rationale: "This is equivalent to 0.7%." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: true,
                    type: "knowledge",
                    question: "In a class of 30 students, 6 students have blue eyes. What percentage of the class has blue eyes?",
                    answerOptions: [
                        { text: "6%", isCorrect: false, rationale: "This is the number of students, not the percentage." },
                        { text: "15%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20%", isCorrect: true, rationale: "Percentage = (Part / Whole) * 100 = (6 / 30) * 100 = 0.2 * 100 = 20%." },
                        { text: "25%", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: true,
                    type: "knowledge",
                    question: "A map has a scale of 1 inch = 20 miles. If two cities are 4.5 inches apart on the map, what is the actual distance between them?",
                    answerOptions: [
                        { text: "45 miles", isCorrect: false, rationale: "This is incorrect." },
                        { text: "80 miles", isCorrect: false, rationale: "This would be the distance for 4 inches." },
                        { text: "90 miles", isCorrect: true, rationale: "Distance = 4.5 inches * 20 miles/inch = 90 miles." },
                        { text: "100 miles", isCorrect: false, rationale: "This would be the distance for 5 inches." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "knowledge",
                    question: "An item costs $50. With sales tax, the total comes to $54. What is the sales tax rate?",
                    answerOptions: [
                        { text: "4%", isCorrect: false, rationale: "This would result in a total of $52." },
                        { text: "5%", isCorrect: false, rationale: "This would result in a total of $52.50." },
                        { text: "8%", isCorrect: true, rationale: "The amount of tax is $54 - $50 = $4. The tax rate is (Tax / Original Price) * 100 = (4 / 50) * 100 = 0.08 * 100 = 8%." },
                        { text: "10%", isCorrect: false, rationale: "This would result in a total of $55." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "A team won 15 games and lost 5 games. What is the ratio of wins to losses, simplified?",
                    answerOptions: [
                        { text: "15:5", isCorrect: false, rationale: "This is the correct ratio, but it is not simplified." },
                        { text: "3:1", isCorrect: true, rationale: "The ratio is 15 wins to 5 losses. This can be simplified by dividing both sides by 5." },
                        { text: "1:3", isCorrect: false, rationale: "This is the ratio of losses to wins." },
                        { text: "3:4", isCorrect: false, rationale: "This is the ratio of wins to total games played." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "If 3 pounds of apples cost $4.50, how much would 5 pounds of apples cost?",
                    answerOptions: [
                        { text: "$1.50", isCorrect: false, rationale: "This is the cost per pound." },
                        { text: "$6.00", isCorrect: false, rationale: "This is the cost of 4 pounds." },
                        { text: "$7.50", isCorrect: true, rationale: "First, find the price per pound: $4.50 / 3 pounds = $1.50 per pound. Then, multiply by the desired weight: $1.50 * 5 = $7.50." },
                        { text: "$9.00", isCorrect: false, rationale: "This is the cost of 6 pounds." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: true,
                    type: "knowledge",
                    question: "A student scored 40 out of 50 on a test. What is their score as a percentage?",
                    answerOptions: [
                        { text: "40%", isCorrect: false, rationale: "This is the number of correct answers, not the percentage." },
                        { text: "75%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "80%", isCorrect: true, rationale: "Percentage = (Score / Total) * 100 = (40 / 50) * 100 = 0.8 * 100 = 80%." },
                        { text: "90%", isCorrect: false, rationale: "This would be a score of 45 out of 50." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: true,
                    type: "knowledge",
                    question: "The price of a computer increased by 10% this year. If the price last year was $800, what is the price this year?",
                    answerOptions: [
                        { text: "$80", isCorrect: false, rationale: "This is the amount of the increase, not the new price." },
                        { text: "$810", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$880", isCorrect: true, rationale: "The increase is 10% of $800, which is 0.10 * 800 = $80. The new price is $800 + $80 = $880." },
                        { text: "$900", isCorrect: false, rationale: "This would be a 12.5% increase." }
                    ]
                }
            ]
        },
        {
            quizId: "math_ratios_proportions_percents_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "In a box of 20 chocolates, 8 are dark chocolate. What is the ratio of dark chocolates to milk chocolates?",
                    answerOptions: [
                        { text: "8:20", isCorrect: false, rationale: "This is the ratio of dark chocolates to the total." },
                        { text: "2:5", isCorrect: false, rationale: "This is the simplified ratio of dark chocolates to the total." },
                        { text: "2:3", isCorrect: true, rationale: "There are 8 dark chocolates and 20 - 8 = 12 milk chocolates. The ratio is 8:12, which simplifies to 2:3 by dividing both by 4." },
                        { text: "3:2", isCorrect: false, rationale: "This is the ratio of milk chocolates to dark chocolates." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "What is 0.65 as a percentage?",
                    answerOptions: [
                        { text: "0.65%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "6.5%", isCorrect: false, rationale: "This would be 0.065 as a decimal." },
                        { text: "65%", isCorrect: true, rationale: "To convert a decimal to a percentage, multiply by 100. 0.65 * 100 = 65%." },
                        { text: "650%", isCorrect: false, rationale: "This would be 6.5 as a decimal." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: true,
                    type: "knowledge",
                    question: "A model airplane is built to a scale of 1:48. If the wingspan of the model is 1.5 feet, what is the wingspan of the actual airplane?",
                    answerOptions: [
                        { text: "32 feet", isCorrect: false, rationale: "This is the result of dividing 48 by 1.5." },
                        { text: "48 feet", isCorrect: false, rationale: "This is the scale factor, not the final wingspan." },
                        { text: "72 feet", isCorrect: true, rationale: "The actual wingspan is 48 times the model's wingspan. 1.5 feet * 48 = 72 feet." },
                        { text: "96 feet", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "knowledge",
                    question: "A salesperson earns a 5% commission on their sales. If they sell a car for $22,000, what is their commission?",
                    answerOptions: [
                        { text: "$500", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$1,100", isCorrect: true, rationale: "Commission = $22,000 * 5% = $22,000 * 0.05 = $1,100." },
                        { text: "$2,200", isCorrect: false, rationale: "This would be a 10% commission." },
                        { text: "$5,500", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following ratios is equivalent to 3:5?",
                    answerOptions: [
                        { text: "5:3", isCorrect: false, rationale: "This is the inverse ratio." },
                        { text: "6:8", isCorrect: false, rationale: "This simplifies to 3:4." },
                        { text: "9:15", isCorrect: true, rationale: "Multiplying both parts of the ratio 3:5 by 3 gives 9:15." },
                        { text: "12:18", isCorrect: false, rationale: "This simplifies to 2:3." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: true,
                    type: "knowledge",
                    question: "A population of a town grew from 8,000 to 9,200. What was the percent increase?",
                    answerOptions: [
                        { text: "12%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "15%", isCorrect: true, rationale: "The increase is 9,200 - 8,000 = 1,200. The percent increase is (Increase / Original) * 100 = (1200 / 8000) * 100 = 0.15 * 100 = 15%." },
                        { text: "18%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20%", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "If 4 pencils cost $1.00, what is the cost of 7 pencils?",
                    answerOptions: [
                        { text: "$0.25", isCorrect: false, rationale: "This is the cost of one pencil." },
                        { text: "$1.50", isCorrect: false, rationale: "This would be the cost of 6 pencils." },
                        { text: "$1.75", isCorrect: true, rationale: "The cost of one pencil is $1.00 / 4 = $0.25. The cost of 7 pencils is 7 * $0.25 = $1.75." },
                        { text: "$2.00", isCorrect: false, rationale: "This would be the cost of 8 pencils." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "A survey of 250 people found that 40% prefer coffee to tea. How many people prefer coffee?",
                    answerOptions: [
                        { text: "40 people", isCorrect: false, rationale: "This is the percentage, not the number of people." },
                        { text: "80 people", isCorrect: false, rationale: "This is incorrect." },
                        { text: "100 people", isCorrect: true, rationale: "Number of people = 250 * 40% = 250 * 0.40 = 100 people." },
                        { text: "150 people", isCorrect: false, rationale: "This would be 60% of the people." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "A drink mix requires 1 part powder to 4 parts water. This is a total of 5 parts. What percentage of the drink is water?",
                    answerOptions: [
                        { text: "20%", isCorrect: false, rationale: "This is the percentage of powder (1/5)." },
                        { text: "25%", isCorrect: false, rationale: "This is the ratio of powder to water (1/4)." },
                        { text: "75%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "80%", isCorrect: true, rationale: "There are 4 parts water out of a total of 5 parts. The fraction is 4/5, which is equal to 80%." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: true,
                    type: "knowledge",
                    question: "A basketball player made 18 out of 25 free throws. What percentage of their free throws did they make?",
                    answerOptions: [
                        { text: "68%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "72%", isCorrect: true, rationale: "Percentage = (Made / Total) * 100 = (18 / 25) * 100 = 0.72 * 100 = 72%." },
                        { text: "75%", isCorrect: false, rationale: "This would be 18.75 shots made." },
                        { text: "82%", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for x: $\\frac{x}{5} = \\frac{12}{20}$",
                    answerOptions: [
                        { text: "2", isCorrect: false, rationale: "This is incorrect." },
                        { text: "3", isCorrect: true, rationale: "The fraction 12/20 simplifies to 3/5. Therefore, x must be 3." },
                        { text: "4", isCorrect: false, rationale: "This is incorrect." },
                        { text: "5", isCorrect: false, rationale: "This would make the fractions unequal." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: true,
                    type: "knowledge",
                    question: "A jacket that normally costs $120 is on sale for $90. What is the percent discount?",
                    answerOptions: [
                        { text: "20%", isCorrect: false, rationale: "A 20% discount would be $24 off." },
                        { text: "25%", isCorrect: true, rationale: "The discount is $120 - $90 = $30. The percent discount is (Discount / Original Price) * 100 = (30 / 120) * 100 = 0.25 * 100 = 25%." },
                        { text: "30%", isCorrect: false, rationale: "A 30% discount would be $36 off." },
                        { text: "33.3%", isCorrect: false, rationale: "This would be the percent markup from $90 to $120." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: false,
                    type: "knowledge",
                    question: "The ratio of teachers to students at a school is 1:20. If there are 500 students, how many teachers are there?",
                    answerOptions: [
                        { text: "20 teachers", isCorrect: false, rationale: "This is the number of students per teacher." },
                        { text: "25 teachers", isCorrect: true, rationale: "Set up a proportion: 1/20 = x/500. Solve for x by multiplying 500 by 1/20, which gives 25." },
                        { text: "30 teachers", isCorrect: false, rationale: "This is incorrect." },
                        { text: "50 teachers", isCorrect: false, rationale: "This would be a 1:10 ratio." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "Express the fraction $\\frac{7}{8}$ as a percentage.",
                    answerOptions: [
                        { text: "78%", isCorrect: false, rationale: "This is an incorrect conversion." },
                        { text: "80%", isCorrect: false, rationale: "This would be 4/5." },
                        { text: "87.5%", isCorrect: true, rationale: "To convert, divide 7 by 8, which gives 0.875. Then multiply by 100 to get 87.5%." },
                        { text: "92.5%", isCorrect: false, rationale: "This is an incorrect conversion." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: true,
                    type: "knowledge",
                    question: "A company produces 5,000 units. A quality check finds that 150 of them are defective. What percentage of the units are NOT defective?",
                    answerOptions: [
                        { text: "3%", isCorrect: false, rationale: "This is the percentage of units that ARE defective." },
                        { text: "95%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "97%", isCorrect: true, rationale: "The number of non-defective units is 5,000 - 150 = 4,850. The percentage is (4850 / 5000) * 100 = 0.97 * 100 = 97%. Alternatively, the defective rate is 150/5000 = 3%, so the non-defective rate is 100% - 3% = 97%." },
                        { text: "98.5%", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        },
        {
            quizId: "math_ratios_proportions_percents_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "A recipe for salad dressing calls for 3 parts oil to 2 parts vinegar. If you use 6 tablespoons of oil, how much vinegar do you need?",
                    answerOptions: [
                        { text: "2 tablespoons", isCorrect: false, rationale: "This does not maintain the ratio." },
                        { text: "3 tablespoons", isCorrect: false, rationale: "This does not maintain the ratio." },
                        { text: "4 tablespoons", isCorrect: true, rationale: "The ratio is 3:2. You are using double the amount of oil (6 instead of 3), so you need double the amount of vinegar: 2 * 2 = 4 tablespoons." },
                        { text: "5 tablespoons", isCorrect: false, rationale: "This does not maintain the ratio." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "What is 125% as a decimal?",
                    answerOptions: [
                        { text: "125.0", isCorrect: false, rationale: "This is incorrect." },
                        { text: "12.5", isCorrect: false, rationale: "This would be 1250%." },
                        { text: "1.25", isCorrect: true, rationale: "To convert a percentage to a decimal, divide by 100. 125 / 100 = 1.25." },
                        { text: "0.125", isCorrect: false, rationale: "This would be 12.5%." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: true,
                    type: "knowledge",
                    question: "If 5 tickets to a concert cost $110, what is the cost of 8 tickets?",
                    answerOptions: [
                        { text: "$22", isCorrect: false, rationale: "This is the cost of one ticket." },
                        { text: "$154", isCorrect: false, rationale: "This is the cost of 7 tickets." },
                        { text: "$176", isCorrect: true, rationale: "First, find the cost per ticket: $110 / 5 = $22. Then, multiply by the number of tickets: $22 * 8 = $176." },
                        { text: "$198", isCorrect: false, rationale: "This is the cost of 9 tickets." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "knowledge",
                    question: "A test has 60 questions. To pass, a student must get at least 70% correct. How many questions must the student answer correctly to pass?",
                    answerOptions: [
                        { text: "35 questions", isCorrect: false, rationale: "This is incorrect." },
                        { text: "42 questions", isCorrect: true, rationale: "Number of correct answers = 60 * 70% = 60 * 0.70 = 42 questions." },
                        { text: "45 questions", isCorrect: false, rationale: "This would be 75%." },
                        { text: "48 questions", isCorrect: false, rationale: "This would be 80%." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: false,
                    type: "knowledge",
                    question: "A mixture contains 10 ounces of water and 2 ounces of lemon juice. What is the ratio of lemon juice to the total mixture?",
                    answerOptions: [
                        { text: "2:10", isCorrect: false, rationale: "This is the ratio of lemon juice to water." },
                        { text: "1:5", isCorrect: false, rationale: "This is the simplified ratio of lemon juice to water." },
                        { text: "1:6", isCorrect: true, rationale: "The total mixture is 10 + 2 = 12 ounces. The ratio of lemon juice to the total is 2:12, which simplifies to 1:6." },
                        { text: "1:12", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: true,
                    type: "knowledge",
                    question: "Last year, a company had 200 employees. This year, it has 230 employees. What is the percentage increase in the number of employees?",
                    answerOptions: [
                        { text: "10%", isCorrect: false, rationale: "This would be an increase of 20 employees." },
                        { text: "15%", isCorrect: true, rationale: "The increase is 230 - 200 = 30. The percent increase is (Increase / Original) * 100 = (30 / 200) * 100 = 0.15 * 100 = 15%." },
                        { text: "20%", isCorrect: false, rationale: "This would be an increase of 40 employees." },
                        { text: "30%", isCorrect: false, rationale: "This is the number of new employees, not the percentage." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for n: $\\frac{5}{n} = \\frac{20}{24}$",
                    answerOptions: [
                        { text: "4", isCorrect: false, rationale: "This is incorrect." },
                        { text: "5", isCorrect: false, rationale: "This is incorrect." },
                        { text: "6", isCorrect: true, rationale: "To get from the numerator 20 to 5, you divide by 4. Therefore, you must also divide the denominator 24 by 4, which gives n = 6." },
                        { text: "8", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "A computer that costs $750 is discounted by 30%. What is the amount of the discount?",
                    answerOptions: [
                        { text: "$30", isCorrect: false, rationale: "This is the percentage, not the dollar amount." },
                        { text: "$225", isCorrect: true, rationale: "Discount = $750 * 30% = $750 * 0.30 = $225." },
                        { text: "$525", isCorrect: false, rationale: "This is the final sale price, not the discount amount." },
                        { text: "$720", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "A basketball team has 12 players. 3 of them are guards. What is the ratio of guards to non-guards?",
                    answerOptions: [
                        { text: "3:12", isCorrect: false, rationale: "This is the ratio of guards to total players." },
                        { text: "1:4", isCorrect: false, rationale: "This is the simplified ratio of guards to total players." },
                        { text: "1:3", isCorrect: true, rationale: "There are 3 guards and 12 - 3 = 9 non-guards. The ratio is 3:9, which simplifies to 1:3." },
                        { text: "1:2", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "What is $\\frac{3}{5}$ as a percentage?",
                    answerOptions: [
                        { text: "35%", isCorrect: false, rationale: "This is an incorrect conversion." },
                        { text: "50%", isCorrect: false, rationale: "This would be 1/2." },
                        { text: "60%", isCorrect: true, rationale: "3 divided by 5 is 0.6. Multiplying by 100 gives 60%." },
                        { text: "75%", isCorrect: false, rationale: "This would be 3/4." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "knowledge",
                    question: "Out of 400 apples in a batch, 6% are bruised. How many apples are bruised?",
                    answerOptions: [
                        { text: "6 apples", isCorrect: false, rationale: "This is the percentage, not the number of apples." },
                        { text: "12 apples", isCorrect: false, rationale: "This would be 3%." },
                        { text: "24 apples", isCorrect: true, rationale: "Number of bruised apples = 400 * 6% = 400 * 0.06 = 24." },
                        { text: "30 apples", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: true,
                    type: "knowledge",
                    question: "If you get 22 correct answers on a 25-question test, what is your score as a percentage?",
                    answerOptions: [
                        { text: "80%", isCorrect: false, rationale: "This would be 20 correct answers." },
                        { text: "85%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "88%", isCorrect: true, rationale: "Score = (22 / 25) * 100 = 0.88 * 100 = 88%." },
                        { text: "92%", isCorrect: false, rationale: "This would be 23 correct answers." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: false,
                    type: "knowledge",
                    question: "A company has a ratio of 5 office workers for every 2 field workers. If there are 10 field workers, how many office workers are there?",
                    answerOptions: [
                        { text: "10 workers", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20 workers", isCorrect: false, rationale: "This is incorrect." },
                        { text: "25 workers", isCorrect: true, rationale: "The number of field workers has been multiplied by 5 (10 instead of 2). So, multiply the number of office workers by 5: 5 * 5 = 25." },
                        { text: "50 workers", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: true,
                    type: "knowledge",
                    question: "A meal costs $42, and you add a 20% tip. What is the total cost of the meal?",
                    answerOptions: [
                        { text: "$8.40", isCorrect: false, rationale: "This is the amount of the tip, not the total cost." },
                        { text: "$48.40", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$50.40", isCorrect: true, rationale: "The tip is 20% of $42, which is 0.20 * 42 = $8.40. The total cost is $42 + $8.40 = $50.40." },
                        { text: "$52.00", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "In a group of 24 people, the ratio of men to women is 1:2. How many women are there?",
                    answerOptions: [
                        { text: "8 women", isCorrect: false, rationale: "This is the number of men in the group." },
                        { text: "12 women", isCorrect: false, rationale: "This would be a 1:1 ratio." },
                        { text: "16 women", isCorrect: true, rationale: "The ratio 1:2 means there are 3 parts in total. Each part is 24 / 3 = 8 people. Since women are 2 parts, there are 2 * 8 = 16 women." },
                        { text: "20 women", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        }
    ]
};
// Math -> Quantitative Problem Solving -> Data Analysis, Probability, and Statistics
AppData.quizzes.math_data_analysis = {
    id: "math_data_analysis",
    title: "Data Analysis, Probability, and Statistics",
    description: "Interpreting charts and graphs, calculating probability, and using statistical measures.",
    quizzes: [
        {
            quizId: "math_data_analysis_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    calculator: true,
                    type: "chart",
                    passage: "<p>A student's test scores are: 85, 92, 78, 88, 92.</p>",
                    question: "What is the mean (average) of the test scores?",
                    answerOptions: [
                        { text: "78", isCorrect: false, rationale: "This is the minimum score, not the average." },
                        { text: "87", isCorrect: true, rationale: "The sum of the scores is 85+92+78+88+92 = 435. The mean is 435 / 5 = 87." },
                        { text: "88", isCorrect: false, rationale: "This is the median score, not the mean." },
                        { text: "92", isCorrect: false, rationale: "This is the mode and the maximum score, but not the mean." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: true,
                    type: "chart",
                    passage: "<p>A student's test scores are: 85, 92, 78, 88, 92.</p>",
                    question: "What is the median of the test scores?",
                    answerOptions: [
                        { text: "85", isCorrect: false, rationale: "This is one of the scores, but not the median." },
                        { text: "87", isCorrect: false, rationale: "This is the mean of the scores." },
                        { text: "88", isCorrect: true, rationale: "To find the median, first order the scores: 78, 85, 88, 92, 92. The middle number is 88." },
                        { text: "92", isCorrect: false, rationale: "This is the mode, not the median." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "A standard six-sided die is rolled. What is the probability of rolling a number greater than 4?",
                    answerOptions: [
                        { text: "$\\frac{1}{6}$", isCorrect: false, rationale: "This is the probability of rolling a single specific number." },
                        { text: "$\\frac{1}{3}$", isCorrect: true, rationale: "There are two favorable outcomes (rolling a 5 or a 6) out of six possible outcomes. The probability is 2/6, which simplifies to 1/3." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is the probability of rolling an even number (2, 4, 6)." },
                        { text: "$\\frac{2}{3}$", isCorrect: false, rationale: "This is the probability of rolling a number less than or equal to 4." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "chart",
                    passage: "<p>A student's test scores are: 85, 92, 78, 88, 92.</p>",
                    question: "What is the mode of the test scores?",
                    answerOptions: [
                        { text: "87", isCorrect: false, rationale: "This is the mean." },
                        { text: "88", isCorrect: false, rationale: "This is the median." },
                        { text: "92", isCorrect: true, rationale: "The mode is the number that appears most frequently. The score 92 appears twice, more than any other score." },
                        { text: "There is no mode.", isCorrect: false, rationale: "There is a mode because one score appears more often than the others." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The daily high temperatures for a week were: 65°F, 68°F, 72°F, 70°F, 68°F, 75°F, 78°F.</p>",
                    question: "What is the range of the temperatures?",
                    answerOptions: [
                        { text: "10°F", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "13°F", isCorrect: true, rationale: "The range is the difference between the highest and lowest values. Range = 78°F - 65°F = 13°F." },
                        { text: "68°F", isCorrect: false, rationale: "This is the mode of the temperatures." },
                        { text: "70.8°F", isCorrect: false, rationale: "This is the mean temperature." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "A bag contains 4 red, 5 blue, and 6 green marbles. What is the probability of drawing a blue marble at random?",
                    answerOptions: [
                        { text: "$\\frac{1}{3}$", isCorrect: true, rationale: "There are 5 blue marbles and a total of 4 + 5 + 6 = 15 marbles. The probability is 5/15, which simplifies to 1/3." },
                        { text: "$\\frac{1}{5}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{4}{15}$", isCorrect: false, rationale: "This is the probability of drawing a red marble." },
                        { text: "$\\frac{2}{5}$", isCorrect: false, rationale: "This is the probability of drawing a green marble." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_graph_1.png",
                    question: "The bar chart shows the number of pets owned by students in a class. How many students are in the class?",
                    answerOptions: [
                        { text: "15", isCorrect: false, rationale: "This is the number of students who own a dog." },
                        { text: "25", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "30", isCorrect: true, rationale: "Add the number of students for each pet type: Dog (15) + Cat (10) + Fish (5) = 30 students." },
                        { text: "35", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: false,
                    type: "knowledge",
                    question: "You flip a fair coin twice. What is the probability of getting heads on both flips?",
                    answerOptions: [
                        { text: "$\\frac{1}{8}$", isCorrect: false, rationale: "This would be the probability for three flips." },
                        { text: "$\\frac{1}{4}$", isCorrect: true, rationale: "The probability of getting heads on one flip is 1/2. The probability of getting heads on two independent flips is (1/2) * (1/2) = 1/4." },
                        { text: "$\\frac{1}{3}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is the probability of getting heads on a single flip." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_pie_chart_1.png",
                    question: "The pie chart shows a family's monthly budget. If the total monthly income is $3,000, how much is spent on Food?",
                    answerOptions: [
                        { text: "$300", isCorrect: false, rationale: "This would be 10% of the budget." },
                        { text: "$600", isCorrect: false, rationale: "This would be 20% of the budget." },
                        { text: "$750", isCorrect: true, rationale: "Food accounts for 25% of the budget. 25% of $3,000 is 0.25 * 3000 = $750." },
                        { text: "$900", isCorrect: false, rationale: "This would be 30% of the budget (Rent)." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "An event that is certain to happen has a probability of:",
                    answerOptions: [
                        { text: "0", isCorrect: false, rationale: "A probability of 0 means the event is impossible." },
                        { text: "0.5", isCorrect: false, rationale: "A probability of 0.5 means the event is equally likely to happen or not happen." },
                        { text: "1", isCorrect: true, rationale: "A probability of 1 (or 100%) represents certainty." },
                        { text: "100", isCorrect: false, rationale: "Probability is expressed as a number between 0 and 1, not 0 and 100." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The number of customers at a cafe each hour is: 10, 15, 12, 18, 15, 20, 22.</p>",
                    question: "What is the median number of customers?",
                    answerOptions: [
                        { text: "12", isCorrect: false, rationale: "This is one of the values, but not the median." },
                        { text: "15", isCorrect: true, rationale: "First, order the data: 10, 12, 15, 15, 18, 20, 22. The middle value is 15." },
                        { text: "16", isCorrect: false, rationale: "This is the mean of the data set." },
                        { text: "18", isCorrect: false, rationale: "This is one of the values, but not the median." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "A spinner has 8 equal sections, numbered 1 through 8. What is the probability of spinning an even number?",
                    answerOptions: [
                        { text: "$\\frac{1}{8}$", isCorrect: false, rationale: "This is the probability of spinning one specific number." },
                        { text: "$\\frac{1}{4}$", isCorrect: false, rationale: "This is the probability of spinning a number divisible by 4." },
                        { text: "$\\frac{1}{2}$", isCorrect: true, rationale: "There are four even numbers (2, 4, 6, 8) out of eight total sections. The probability is 4/8, which simplifies to 1/2." },
                        { text: "$\\frac{3}{4}$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_line_graph_1.png",
                    question: "The line graph shows a company's profit over 5 years. What was the approximate profit in Year 3?",
                    answerOptions: [
                        { text: "$30,000", isCorrect: false, rationale: "The point for Year 3 is higher than this." },
                        { text: "$35,000", isCorrect: true, rationale: "Following the line from Year 3 up to the data point and across to the y-axis shows the profit is at $35,000." },
                        { text: "$40,000", isCorrect: false, rationale: "This was the profit in Year 4." },
                        { text: "$45,000", isCorrect: false, rationale: "This was the profit in Year 5." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: true,
                    type: "chart",
                    passage: "<p>A bowler's scores in a tournament were 150, 165, and 180.</p>",
                    question: "What score does the bowler need in the next game to have an average score of 170?",
                    answerOptions: [
                        { text: "165", isCorrect: false, rationale: "This would result in an average lower than 170." },
                        { text: "170", isCorrect: false, rationale: "This would result in an average lower than 170." },
                        { text: "180", isCorrect: false, rationale: "This would result in an average lower than 170." },
                        { text: "185", isCorrect: true, rationale: "To have an average of 170 over 4 games, the total score must be 170 * 4 = 680. The sum of the first three scores is 150+165+180 = 495. The required score is 680 - 495 = 185." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "A deck of 52 cards is shuffled. What is the probability of drawing a King?",
                    answerOptions: [
                        { text: "$\\frac{1}{52}$", isCorrect: false, rationale: "This is the probability of drawing a specific card, like the King of Spades." },
                        { text: "$\\frac{1}{26}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{1}{13}$", isCorrect: true, rationale: "There are 4 Kings in a 52-card deck. The probability is 4/52, which simplifies to 1/13." },
                        { text: "$\\frac{1}{4}$", isCorrect: false, rationale: "This is the probability of drawing a card from a specific suit." }
                    ]
                }
            ]
        },
        {
            quizId: "math_data_analysis_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The number of goals scored by a soccer team in their last 6 games were: 2, 0, 3, 1, 3, 2.</p>",
                    question: "What is the mean number of goals scored per game?",
                    answerOptions: [
                        { text: "1.5", isCorrect: false, rationale: "This is incorrect." },
                        { text: "2", isCorrect: false, rationale: "This is the median and mode, but not the mean." },
                        { text: "1.83", isCorrect: true, rationale: "The sum of the goals is 2+0+3+1+3+2 = 11. The mean is 11 / 6 ≈ 1.83." },
                        { text: "3", isCorrect: false, rationale: "This is the maximum number of goals." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The weekly salaries of 5 employees are: $500, $550, $500, $600, $800.</p>",
                    question: "What is the median salary?",
                    answerOptions: [
                        { text: "$500", isCorrect: false, rationale: "This is the mode, not the median." },
                        { text: "$550", isCorrect: true, rationale: "First, order the salaries: $500, $500, $550, $600, $800. The middle value is $550." },
                        { text: "$590", isCorrect: false, rationale: "This is the mean salary." },
                        { text: "$600", isCorrect: false, rationale: "This is one of the values, but not the median." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "A bag contains 10 marbles: 5 red, 3 blue, and 2 green. What is the probability of NOT drawing a red marble?",
                    answerOptions: [
                        { text: "$\\frac{1}{5}$", isCorrect: false, rationale: "This is the probability of drawing a green marble." },
                        { text: "$\\frac{3}{10}$", isCorrect: false, rationale: "This is the probability of drawing a blue marble." },
                        { text: "$\\frac{1}{2}$", isCorrect: true, rationale: "There are 5 non-red marbles (3 blue + 2 green) out of a total of 10. The probability is 5/10, which simplifies to 1/2. Alternatively, the probability of drawing a red marble is 1/2, so the probability of not drawing one is 1 - 1/2 = 1/2." },
                        { text: "$\\frac{3}{5}$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The number of books read by students in a month is: 3, 2, 4, 3, 5, 1, 3, 2.</p>",
                    question: "What is the mode of this data set?",
                    answerOptions: [
                        { text: "2", isCorrect: false, rationale: "2 appears twice, but another number appears more often." },
                        { text: "2.875", isCorrect: false, rationale: "This is the mean of the data." },
                        { text: "3", isCorrect: true, rationale: "The number 3 appears three times, which is more than any other number in the set." },
                        { text: "5", isCorrect: false, rationale: "This is the maximum value, not the mode." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The heights of five basketball players are: 190cm, 195cm, 200cm, 195cm, 210cm.</p>",
                    question: "What is the range of the players' heights?",
                    answerOptions: [
                        { text: "5cm", isCorrect: false, rationale: "This is the difference between some of the values, but not the overall range." },
                        { text: "10cm", isCorrect: false, rationale: "This is incorrect." },
                        { text: "15cm", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20cm", isCorrect: true, rationale: "The range is the difference between the maximum and minimum values: 210cm - 190cm = 20cm." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "You roll a standard six-sided die. What is the probability of rolling a prime number? (The prime numbers on a die are 2, 3, and 5).",
                    answerOptions: [
                        { text: "$\\frac{1}{6}$", isCorrect: false, rationale: "This is the probability of rolling one specific number." },
                        { text: "$\\frac{1}{3}$", isCorrect: false, rationale: "This would be the probability of rolling a 5 or 6." },
                        { text: "$\\frac{1}{2}$", isCorrect: true, rationale: "There are three prime numbers (2, 3, 5) out of six possible outcomes. The probability is 3/6, which simplifies to 1/2." },
                        { text: "$\\frac{2}{3}$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_pie_chart_1.png",
                    question: "The pie chart shows a family's monthly budget of $3,000. How much more money is spent on Rent than on Utilities?",
                    answerOptions: [
                        { text: "$150", isCorrect: false, rationale: "This would be a 5% difference." },
                        { text: "$300", isCorrect: false, rationale: "This is the amount spent on Transportation." },
                        { text: "$450", isCorrect: true, rationale: "Rent is 30% and Utilities are 15%. The difference is 15%. 15% of $3,000 is 0.15 * 3000 = $450." },
                        { text: "$600", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: false,
                    type: "knowledge",
                    question: "A drawer contains 6 black socks, 4 white socks, and 2 brown socks. What is the probability of picking a white sock at random?",
                    answerOptions: [
                        { text: "$\\frac{1}{4}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{1}{3}$", isCorrect: true, rationale: "There are 4 white socks and a total of 6+4+2=12 socks. The probability is 4/12, which simplifies to 1/3." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is the probability of picking a black sock." },
                        { text: "$\\frac{2}{3}$", isCorrect: false, rationale: "This is the probability of not picking a white sock." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_line_graph_1.png",
                    question: "According to the line graph, between which two years did the company's profit see the largest increase?",
                    answerOptions: [
                        { text: "Year 1 and Year 2", isCorrect: false, rationale: "The increase was from $20k to $25k, a $5k increase." },
                        { text: "Year 2 and Year 3", isCorrect: false, rationale: "The increase was from $25k to $35k, a $10k increase." },
                        { text: "Year 3 and Year 4", isCorrect: false, rationale: "The increase was from $35k to $40k, a $5k increase." },
                        { text: "The increase was the same for all intervals.", isCorrect: false, rationale: "The graph clearly shows the steepest slope between Year 2 and Year 3, representing the largest increase ($10,000)." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "An event that is impossible has a probability of:",
                    answerOptions: [
                        { text: "0", isCorrect: true, rationale: "A probability of 0 represents an event that cannot happen." },
                        { text: "0.5", isCorrect: false, rationale: "This represents an event with an equal chance of happening or not." },
                        { text: "1", isCorrect: false, rationale: "This represents an event that is certain to happen." },
                        { text: "-1", isCorrect: false, rationale: "Probability cannot be negative." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The weights of 6 packages are: 3 lb, 5 lb, 2 lb, 5 lb, 7 lb, 4 lb.</p>",
                    question: "What is the median weight?",
                    answerOptions: [
                        { text: "4 lb", isCorrect: false, rationale: "This is incorrect." },
                        { text: "4.5 lb", isCorrect: true, rationale: "First, order the weights: 2, 3, 4, 5, 5, 7. Since there is an even number of values, the median is the average of the two middle numbers: (4 + 5) / 2 = 4.5 lb." },
                        { text: "5 lb", isCorrect: false, rationale: "This is the mode, not the median." },
                        { text: "4.33 lb", isCorrect: false, rationale: "This is the mean." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "A spinner is divided into 5 equal sections colored Red, Blue, Green, Yellow, and Orange. What is the probability of the spinner landing on a primary color (Red, Yellow, or Blue)?",
                    answerOptions: [
                        { text: "$\\frac{1}{5}$", isCorrect: false, rationale: "This is the probability of landing on a single color." },
                        { text: "$\\frac{2}{5}$", isCorrect: false, rationale: "This is the probability of landing on a secondary color (Green or Orange)." },
                        { text: "$\\frac{3}{5}$", isCorrect: true, rationale: "There are 3 favorable outcomes (Red, Yellow, Blue) out of 5 possible outcomes." },
                        { text: "$\\frac{4}{5}$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_bar_chart_2.png",
                    question: "The bar chart shows the number of tickets sold for a school play on different days. How many more tickets were sold on Friday than on Wednesday?",
                    answerOptions: [
                        { text: "10", isCorrect: false, rationale: "This is the difference between Thursday and Wednesday." },
                        { text: "15", isCorrect: true, rationale: "On Friday, 40 tickets were sold. On Wednesday, 25 tickets were sold. The difference is 40 - 25 = 15." },
                        { text: "20", isCorrect: false, rationale: "This is the number of tickets sold on Tuesday." },
                        { text: "25", isCorrect: false, rationale: "This is the number of tickets sold on Wednesday." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "If the probability of an event happening is 0.4, what is the probability of the event NOT happening?",
                    answerOptions: [
                        { text: "0.4", isCorrect: false, rationale: "This is the probability of the event happening." },
                        { text: "0.5", isCorrect: false, rationale: "This is incorrect." },
                        { text: "0.6", isCorrect: true, rationale: "The sum of the probabilities of an event happening and not happening is always 1. So, P(not event) = 1 - P(event) = 1 - 0.4 = 0.6." },
                        { text: "1.0", isCorrect: false, rationale: "This represents certainty." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "You have two choices for a sandwich (ham or turkey) and three choices for a drink (soda, water, or juice). How many different meal combinations are possible?",
                    answerOptions: [
                        { text: "2", isCorrect: false, rationale: "This is just the number of sandwich choices." },
                        { text: "3", isCorrect: false, rationale: "This is just the number of drink choices." },
                        { text: "5", isCorrect: false, rationale: "This is the sum of the choices, not the product." },
                        { text: "6", isCorrect: true, rationale: "This is a counting principle problem. The total number of combinations is the product of the number of choices for each option: 2 * 3 = 6." }
                    ]
                }
            ]
        },
        {
            quizId: "math_data_analysis_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The daily rainfall in a city for a week (in inches) was: 0.2, 0.5, 0.0, 1.1, 0.8, 0.2, 0.4.</p>",
                    question: "What was the mean rainfall for the week?",
                    answerOptions: [
                        { text: "0.2 inches", isCorrect: false, rationale: "This is the mode of the data." },
                        { text: "0.4 inches", isCorrect: false, rationale: "This is the median of the data." },
                        { text: "0.46 inches", isCorrect: true, rationale: "The sum is 0.2+0.5+0.0+1.1+0.8+0.2+0.4 = 3.2. The mean is 3.2 / 7 ≈ 0.46 inches." },
                        { text: "1.1 inches", isCorrect: false, rationale: "This is the maximum rainfall, not the mean." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The ages of participants in a seminar are: 22, 28, 22, 35, 41, 35, 22.</p>",
                    question: "What is the mode of the ages?",
                    answerOptions: [
                        { text: "22", isCorrect: true, rationale: "The age 22 appears three times, which is more frequent than any other age." },
                        { text: "28", isCorrect: false, rationale: "This is the median age." },
                        { text: "30.7", isCorrect: false, rationale: "This is the mean age." },
                        { text: "35", isCorrect: false, rationale: "35 appears twice, but 22 appears three times." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "A deck of 52 cards is shuffled. What is the probability of drawing a heart?",
                    answerOptions: [
                        { text: "$\\frac{1}{52}$", isCorrect: false, rationale: "This is the probability of drawing a single specific card." },
                        { text: "$\\frac{1}{13}$", isCorrect: false, rationale: "This is the probability of drawing a card of a specific rank (e.g., a Queen)." },
                        { text: "$\\frac{1}{4}$", isCorrect: true, rationale: "There are 13 hearts in a 52-card deck. The probability is 13/52, which simplifies to 1/4." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is the probability of drawing a card of a specific color (red or black)." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The prices of six different laptops are: $800, $1200, $950, $1500, $800, $1100.</p>",
                    question: "What is the median price?",
                    answerOptions: [
                        { text: "$800", isCorrect: false, rationale: "This is the mode, not the median." },
                        { text: "$950", isCorrect: false, rationale: "This is one of the middle values, but not the average of the two." },
                        { text: "$1025", isCorrect: true, rationale: "Order the prices: $800, $800, $950, $1100, $1200, $1500. The median is the average of the two middle values: ($950 + $1100) / 2 = $1025." },
                        { text: "$1058.33", isCorrect: false, rationale: "This is the mean price." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The scores on a 10-point quiz were: 8, 9, 7, 5, 10, 7, 6, 8, 7.</p>",
                    question: "What is the range of the scores?",
                    answerOptions: [
                        { text: "3", isCorrect: false, rationale: "This is incorrect." },
                        { text: "4", isCorrect: false, rationale: "This is incorrect." },
                        { text: "5", isCorrect: true, rationale: "The highest score is 10 and the lowest score is 5. The range is 10 - 5 = 5." },
                        { text: "7", isCorrect: false, rationale: "This is the mode and median." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "A car rental company has 20 cars: 12 are sedans and 8 are SUVs. What is the probability that a randomly selected car will be an SUV?",
                    answerOptions: [
                        { text: "$\\frac{1}{8}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{2}{5}$", isCorrect: true, rationale: "There are 8 SUVs out of a total of 20 cars. The probability is 8/20, which simplifies to 2/5." },
                        { text: "$\\frac{3}{5}$", isCorrect: false, rationale: "This is the probability of selecting a sedan." },
                        { text: "$\\frac{2}{3}$", isCorrect: false, rationale: "This is the ratio of SUVs to sedans." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_bar_chart_2.png",
                    question: "The bar chart shows ticket sales for a school play. What were the total ticket sales for the entire week (Monday to Friday)?",
                    answerOptions: [
                        { text: "120", isCorrect: false, rationale: "This is an incorrect sum." },
                        { text: "135", isCorrect: true, rationale: "Total sales = Mon(15) + Tue(20) + Wed(25) + Thu(35) + Fri(40) = 135 tickets." },
                        { text: "140", isCorrect: false, rationale: "This is an incorrect sum." },
                        { text: "150", isCorrect: false, rationale: "This is an incorrect sum." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: false,
                    type: "knowledge",
                    question: "You have a bag with 5 red balls and 5 blue balls. You draw one ball, do not replace it, and then draw a second ball. If the first ball was red, what is the probability that the second ball will also be red?",
                    answerOptions: [
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This was the probability of drawing a red ball on the first draw." },
                        { text: "$\\frac{5}{9}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$\\frac{4}{9}$", isCorrect: true, rationale: "After drawing one red ball, there are 4 red balls left and a total of 9 balls remaining in the bag. The probability is 4/9." },
                        { text: "$\\frac{4}{10}$", isCorrect: false, rationale: "This would be the probability if the first ball was replaced." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_line_graph_1.png",
                    question: "Looking at the trend in the line graph, what is a reasonable prediction for the company's profit in Year 6?",
                    answerOptions: [
                        { text: "$40,000", isCorrect: false, rationale: "The trend is positive, so the profit is likely to be higher than in Year 5." },
                        { text: "$45,000", isCorrect: false, rationale: "This was the profit in Year 5." },
                        { text: "$50,000", isCorrect: true, rationale: "The profit has been increasing by at least $5,000 each year. A prediction of $50,000 continues this trend." },
                        { text: "$35,000", isCorrect: false, rationale: "This would represent a significant decrease, which goes against the trend." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "If you roll two standard six-sided dice, which sum is most likely to occur?",
                    answerOptions: [
                        { text: "2", isCorrect: false, rationale: "There is only one way to get a sum of 2 (1+1)." },
                        { text: "7", isCorrect: true, rationale: "A sum of 7 can be made in six different ways (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), making it the most probable outcome." },
                        { text: "9", isCorrect: false, rationale: "There are four ways to get a sum of 9 (3+6, 4+5, 5+4, 6+3)." },
                        { text: "12", isCorrect: false, rationale: "There is only one way to get a sum of 12 (6+6)." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The average of four numbers is 15. Three of the numbers are 10, 12, and 20.</p>",
                    question: "What is the fourth number?",
                    answerOptions: [
                        { text: "15", isCorrect: false, rationale: "This is the average, not the missing number." },
                        { text: "18", isCorrect: true, rationale: "If the average of four numbers is 15, their sum must be 15 * 4 = 60. The sum of the three known numbers is 10 + 12 + 20 = 42. The fourth number is 60 - 42 = 18." },
                        { text: "20", isCorrect: false, rationale: "This is one of the given numbers." },
                        { text: "22", isCorrect: false, rationale: "This would result in a higher average." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of these statistical measures is most affected by an outlier?",
                    answerOptions: [
                        { text: "Mean", isCorrect: true, rationale: "The mean (average) is calculated using all values, so a very high or very low outlier can significantly pull the mean in its direction." },
                        { text: "Median", isCorrect: false, rationale: "The median is the middle value, so it is resistant to outliers." },
                        { text: "Mode", isCorrect: false, rationale: "The mode is the most frequent value and is generally not affected by a single outlier." },
                        { text: "Range", isCorrect: false, rationale: "While the range is affected by outliers (as it uses the min and max), the mean is generally considered the most affected measure of central tendency." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_pie_chart_1.png",
                    question: "The pie chart represents a budget of $3,000. What is the total amount spent on Housing (Rent) and Food combined?",
                    answerOptions: [
                        { text: "$1500", isCorrect: false, rationale: "This is 50% of the budget." },
                        { text: "$1650", isCorrect: true, rationale: "Rent is 30% and Food is 25%. Combined, they are 55% of the budget. 55% of $3,000 is 0.55 * 3000 = $1650." },
                        { text: "$1800", isCorrect: false, rationale: "This is 60% of the budget." },
                        { text: "$2000", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "A weather forecast states there is a 30% chance of rain. What is the probability that it will NOT rain?",
                    answerOptions: [
                        { text: "30%", isCorrect: false, rationale: "This is the probability that it will rain." },
                        { text: "50%", isCorrect: false, rationale: "This is incorrect." },
                        { text: "70%", isCorrect: true, rationale: "The total probability is 100%. The probability of it not raining is 100% - 30% = 70%." },
                        { text: "100%", isCorrect: false, rationale: "This represents certainty." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: true,
                    type: "chart",
                    passage: "<p>The number of employees in different departments of a company are: Sales: 40, Marketing: 20, IT: 15, HR: 5.</p>",
                    question: "If you were to create a pie chart of this data, what would be the angle of the sector representing the Sales department?",
                    answerOptions: [
                        { text: "40 degrees", isCorrect: false, rationale: "This is the number of employees, not the angle." },
                        { text: "90 degrees", isCorrect: false, rationale: "This would represent 25% of the total." },
                        { text: "180 degrees", isCorrect: true, rationale: "First, find the total number of employees: 40+20+15+5 = 80. The Sales department represents 40/80 = 0.5 or 50% of the total. A full circle is 360 degrees, so the angle is 50% of 360, which is 180 degrees." },
                        { text: "200 degrees", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        }
    ]
};
// Math -> Algebraic Problem Solving -> Expressions & Polynomials
AppData.quizzes.math_expressions_polynomials = {
    id: "math_expressions_polynomials",
    title: "Expressions & Polynomials",
    description: "Working with algebraic expressions and polynomials.",
    quizzes: [
        {
            quizId: "math_expressions_polynomials_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify the expression: $3x + 5y - x + 2y$.",
                    answerOptions: [
                        { text: "$2x + 7y$", isCorrect: true, rationale: "Combine the like terms: (3x - x) + (5y + 2y) = 2x + 7y." },
                        { text: "$4x + 7y$", isCorrect: false, rationale: "This incorrectly adds 3x and x instead of subtracting." },
                        { text: "$2x + 3y$", isCorrect: false, rationale: "This incorrectly subtracts 2y from 5y." },
                        { text: "$9xy$", isCorrect: false, rationale: "You cannot combine x and y terms." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "Evaluate the expression $2a + 3b$ when $a=4$ and $b=5$.",
                    answerOptions: [
                        { text: "14", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "23", isCorrect: true, rationale: "Substitute the values: 2(4) + 3(5) = 8 + 15 = 23." },
                        { text: "26", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "35", isCorrect: false, rationale: "This incorrectly combines 2(4) and 3(5) into 2(4+3(5)) or a similar error." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the result of $(x + 5)(x + 2)$?",
                    answerOptions: [
                        { text: "$x^2 + 7x + 10$", isCorrect: true, rationale: "Use the FOIL method: (x*x) + (x*2) + (5*x) + (5*2) = x^2 + 2x + 5x + 10 = x^2 + 7x + 10." },
                        { text: "$x^2 + 10$", isCorrect: false, rationale: "This result misses the middle term (the 'Outer' and 'Inner' parts of FOIL)." },
                        { text: "$x^2 + 7x + 7$", isCorrect: false, rationale: "This incorrectly adds 5 and 2 for the constant term." },
                        { text: "$2x + 7$", isCorrect: false, rationale: "This is an incorrect simplification." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: false,
                    type: "knowledge",
                    question: "Factor the expression: $x^2 - 9$.",
                    answerOptions: [
                        { text: "$(x - 3)(x - 3)$", isCorrect: false, rationale: "This would expand to x^2 - 6x + 9." },
                        { text: "$(x + 3)(x + 3)$", isCorrect: false, rationale: "This would expand to x^2 + 6x + 9." },
                        { text: "$(x - 3)(x + 3)$", isCorrect: true, rationale: "This is a difference of squares, which factors into (a-b)(a+b)." },
                        { text: "$x(x - 9)$", isCorrect: false, rationale: "This would expand to x^2 - 9x." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify: $(3x^2 + 2x - 5) + (x^2 - x + 2)$.",
                    answerOptions: [
                        { text: "$4x^2 + x - 3$", isCorrect: true, rationale: "Combine like terms: (3x^2 + x^2) + (2x - x) + (-5 + 2) = 4x^2 + x - 3." },
                        { text: "$3x^2 + x - 3$", isCorrect: false, rationale: "This incorrectly misses adding the x^2 terms." },
                        { text: "$4x^2 + 3x - 7$", isCorrect: false, rationale: "This incorrectly adds x terms and constant terms." },
                        { text: "$4x^4 + x^2 - 3$", isCorrect: false, rationale: "This incorrectly adds the exponents." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the greatest common factor (GCF) of $4x^2$ and $6x$?",
                    answerOptions: [
                        { text: "$x$", isCorrect: false, rationale: "This is a common factor, but not the greatest." },
                        { text: "$2$", isCorrect: false, rationale: "This is a common factor, but not the greatest." },
                        { text: "$2x$", isCorrect: true, rationale: "The GCF of the coefficients 4 and 6 is 2. The GCF of the variables x^2 and x is x. So the GCF is 2x." },
                        { text: "$12x^2$", isCorrect: false, rationale: "This is the least common multiple (LCM), not the GCF." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "Expand the expression: $2x(3x - 5)$.",
                    answerOptions: [
                        { text: "$6x - 10$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$6x^2 - 10x$", isCorrect: true, rationale: "Distribute the 2x to both terms inside the parentheses: (2x * 3x) - (2x * 5) = 6x^2 - 10x." },
                        { text: "$5x - 5$", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "$6x^2 - 5$", isCorrect: false, rationale: "This forgets to distribute the 2x to the second term." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "The cost of renting a car is given by the expression $C(d) = 30d + 50$, where $d$ is the number of days. What is the cost of renting a car for 4 days?",
                    answerOptions: [
                        { text: "$84", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$120", isCorrect: false, rationale: "This is the cost for the days only, without the flat fee." },
                        { text: "$170", isCorrect: true, rationale: "Substitute d=4 into the expression: C(4) = 30(4) + 50 = 120 + 50 = $170." },
                        { text: "$200", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify: $(8x^2 - 5x + 3) - (3x^2 - 2x + 1)$.",
                    answerOptions: [
                        { text: "$5x^2 - 3x + 2$", isCorrect: true, rationale: "Distribute the negative sign: 8x^2 - 5x + 3 - 3x^2 + 2x - 1. Combine like terms: (8x^2 - 3x^2) + (-5x + 2x) + (3 - 1) = 5x^2 - 3x + 2." },
                        { text: "$5x^2 - 7x + 2$", isCorrect: false, rationale: "This incorrectly subtracts 2x from -5x." },
                        { text: "$11x^2 - 7x + 4$", isCorrect: false, rationale: "This incorrectly adds the expressions." },
                        { text: "$5x^2 - 3x + 4$", isCorrect: false, rationale: "This incorrectly adds the constant terms." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following is a binomial?",
                    answerOptions: [
                        { text: "$5x^2$", isCorrect: false, rationale: "This is a monomial (one term)." },
                        { text: "$x + 5$", isCorrect: true, rationale: "A binomial is a polynomial with two terms." },
                        { text: "$x^2 + 3x - 1$", isCorrect: false, rationale: "This is a trinomial (three terms)." },
                        { text: "$x+y+z$", isCorrect: false, rationale: "This is a trinomial (three terms)." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: false,
                    type: "knowledge",
                    question: "Factor the expression: $5x + 10$.",
                    answerOptions: [
                        { text: "$5(x + 2)$", isCorrect: true, rationale: "The greatest common factor of 5x and 10 is 5. Factoring out 5 leaves (x + 2)." },
                        { text: "$5(x + 10)$", isCorrect: false, rationale: "This would expand to 5x + 50." },
                        { text: "$x(5 + 10)$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$15x$", isCorrect: false, rationale: "This is the result of incorrectly combining the terms." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the degree of the polynomial $4x^3 - 2x^2 + 5x - 1$?",
                    answerOptions: [
                        { text: "1", isCorrect: false, rationale: "This is the degree of the term 5x." },
                        { text: "2", isCorrect: false, rationale: "This is the degree of the term -2x^2." },
                        { text: "3", isCorrect: true, rationale: "The degree of a polynomial is the highest exponent of the variable. In this case, it is 3." },
                        { text: "4", isCorrect: false, rationale: "This is the number of terms, not the degree." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: false,
                    type: "knowledge",
                    question: "Evaluate $x^2 - 4x + 5$ for $x = 3$.",
                    answerOptions: [
                        { text: "-2", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "2", isCorrect: true, rationale: "Substitute x=3: (3)^2 - 4(3) + 5 = 9 - 12 + 5 = 2." },
                        { text: "8", isCorrect: false, rationale: "This is an incorrect calculation." },
                        { text: "26", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "Which expression represents '5 less than twice a number n'?",
                    answerOptions: [
                        { text: "$5 - 2n$", isCorrect: false, rationale: "This represents '5 minus twice a number'." },
                        { text: "$2(n - 5)$", isCorrect: false, rationale: "This represents 'twice the difference of a number and 5'." },
                        { text: "$2n - 5$", isCorrect: true, rationale: "'Twice a number n' is 2n, and '5 less than' that is 2n - 5." },
                        { text: "$n - 5 \\times 2$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify: $(x-4)^2$.",
                    answerOptions: [
                        { text: "$x^2 - 16$", isCorrect: false, rationale: "This incorrectly squares each term individually. It misses the middle term." },
                        { text: "$x^2 + 16$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x^2 - 8x + 16$", isCorrect: true, rationale: "This is equivalent to (x-4)(x-4). Using FOIL: (x*x) + (x*-4) + (-4*x) + (-4*-4) = x^2 - 4x - 4x + 16 = x^2 - 8x + 16." },
                        { text: "$x^2 - 8x - 16$", isCorrect: false, rationale: "The last term should be positive (-4 * -4 = 16)." }
                    ]
                }
            ]
        },
        {
            quizId: "math_expressions_polynomials_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "Combine like terms: $7a - 2b + 3a + 5b$.",
                    answerOptions: [
                        { text: "$10a + 3b$", isCorrect: true, rationale: "Combine the 'a' terms (7a + 3a = 10a) and the 'b' terms (-2b + 5b = 3b)." },
                        { text: "$4a + 3b$", isCorrect: false, rationale: "This incorrectly subtracts 3a from 7a." },
                        { text: "$10a - 3b$", isCorrect: false, rationale: "This incorrectly subtracts 5b from -2b." },
                        { text: "$13ab$", isCorrect: false, rationale: "You cannot combine 'a' and 'b' terms into a single term." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the value of the expression $5(x - 2y)$ when $x=10$ and $y=3$?",
                    answerOptions: [
                        { text: "15", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20", isCorrect: true, rationale: "Substitute the values: 5 * (10 - 2*3) = 5 * (10 - 6) = 5 * 4 = 20." },
                        { text: "40", isCorrect: false, rationale: "This incorrectly evaluates 10-2 first." },
                        { text: "50", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "Multiply the binomials: $(2x + 1)(x - 3)$.",
                    answerOptions: [
                        { text: "$2x^2 - 5x - 3$", isCorrect: true, rationale: "Use FOIL: (2x*x) + (2x*-3) + (1*x) + (1*-3) = 2x^2 - 6x + x - 3 = 2x^2 - 5x - 3." },
                        { text: "$2x^2 - 3$", isCorrect: false, rationale: "This misses the middle term." },
                        { text: "$2x^2 - 7x - 3$", isCorrect: false, rationale: "This incorrectly subtracts x from -6x." },
                        { text: "$3x - 2$", isCorrect: false, rationale: "This is an incorrect simplification." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: false,
                    type: "knowledge",
                    question: "Factor the trinomial: $x^2 + 5x + 6$.",
                    answerOptions: [
                        { text: "$(x + 6)(x + 1)$", isCorrect: false, rationale: "This would expand to x^2 + 7x + 6." },
                        { text: "$(x - 2)(x - 3)$", isCorrect: false, rationale: "This would expand to x^2 - 5x + 6." },
                        { text: "$(x + 2)(x + 3)$", isCorrect: true, rationale: "We need two numbers that multiply to 6 and add to 5. Those numbers are 2 and 3." },
                        { text: "$(x + 5)(x + 1)$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: false,
                    type: "knowledge",
                    question: "Subtract the polynomials: $(5x^2 + 4) - (2x^2 - 3x + 1)$.",
                    answerOptions: [
                        { text: "$3x^2 + 3x + 3$", isCorrect: true, rationale: "Distribute the negative: 5x^2 + 4 - 2x^2 + 3x - 1. Combine like terms: (5x^2-2x^2) + 3x + (4-1) = 3x^2 + 3x + 3." },
                        { text: "$3x^2 - 3x + 3$", isCorrect: false, rationale: "This incorrectly keeps the -3x term negative." },
                        { text: "$3x^2 + 3x + 5$", isCorrect: false, rationale: "This incorrectly adds the constant terms." },
                        { text: "$7x^2 - 3x + 5$", isCorrect: false, rationale: "This incorrectly adds the x^2 terms." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the result of applying the distributive property to $ -3(a - 2b + 4)$?",
                    answerOptions: [
                        { text: "$-3a - 6b - 12$", isCorrect: false, rationale: "The sign for the 'b' term is incorrect." },
                        { text: "$-3a + 6b - 12$", isCorrect: true, rationale: "Multiply each term inside the parentheses by -3: (-3*a) + (-3*-2b) + (-3*4) = -3a + 6b - 12." },
                        { text: "$-3a + 6b + 12$", isCorrect: false, rationale: "The sign for the constant term is incorrect." },
                        { text: "$3a - 6b + 12$", isCorrect: false, rationale: "The sign for the 'a' term is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify the expression $\\frac{12x^3}{3x}$.",
                    answerOptions: [
                        { text: "$4$", isCorrect: false, rationale: "This only divides the coefficients." },
                        { text: "$4x^2$", isCorrect: true, rationale: "Divide the coefficients (12/3 = 4) and subtract the exponents of the variables (x^3 / x^1 = x^(3-1) = x^2)." },
                        { text: "$9x^2$", isCorrect: false, rationale: "This subtracts the coefficients instead of dividing." },
                        { text: "$4x^3$", isCorrect: false, rationale: "This ignores the variable in the denominator." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "The area of a rectangle is given by the expression $A = lw$. What is the area if the length $l = (x+5)$ and the width $w = 3$?",
                    answerOptions: [
                        { text: "$3x + 5$", isCorrect: false, rationale: "This only multiplies the 3 by the x." },
                        { text: "$x + 15$", isCorrect: false, rationale: "This incorrectly adds 3 and 5 and multiplies by x." },
                        { text: "$3x + 15$", isCorrect: true, rationale: "Area = 3 * (x + 5). Distribute the 3 to get 3x + 15." },
                        { text: "$18x$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "Factor out the greatest common factor from $6a^2b - 9ab^2$.",
                    answerOptions: [
                        { text: "$3ab(2a - 3b)$", isCorrect: true, rationale: "The GCF of 6 and 9 is 3. The GCF of a^2 and a is a. The GCF of b and b^2 is b. So the GCF is 3ab. Factoring this out leaves (2a - 3b)." },
                        { text: "$3(2a^2b - 3ab^2)$", isCorrect: false, rationale: "This factors out a common factor, but not the greatest common factor." },
                        { text: "$ab(6a - 9b)$", isCorrect: false, rationale: "This factors out a common factor, but not the greatest common factor." },
                        { text: "$3a^2b^2(2 - 3)$", isCorrect: false, rationale: "This is an incorrect factorization." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "Which term describes a number, a variable, or the product of a number and one or more variables?",
                    answerOptions: [
                        { text: "An expression", isCorrect: false, rationale: "An expression is a combination of one or more terms." },
                        { text: "A polynomial", isCorrect: false, rationale: "A polynomial is a specific type of expression with one or more terms." },
                        { text: "A term", isCorrect: true, rationale: "This is the definition of a term (or monomial)." },
                        { text: "A coefficient", isCorrect: false, rationale: "A coefficient is the numerical factor of a term." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the coefficient of the $x$ term in the expression $4x^2 - x + 7$?",
                    answerOptions: [
                        { text: "4", isCorrect: false, rationale: "This is the coefficient of the x^2 term." },
                        { text: "1", isCorrect: false, rationale: "The term is -x, so the coefficient is not 1." },
                        { text: "-1", isCorrect: true, rationale: "The term -x can be written as -1x, so the coefficient is -1." },
                        { text: "7", isCorrect: false, rationale: "This is the constant term." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify the expression: $-(4x - 3)$.",
                    answerOptions: [
                        { text: "$4x - 3$", isCorrect: false, rationale: "This does not distribute the negative sign." },
                        { text: "$-4x - 3$", isCorrect: false, rationale: "The sign of the second term is incorrect." },
                        { text: "$-4x + 3$", isCorrect: true, rationale: "Distribute the negative sign to both terms inside the parentheses, which flips their signs." },
                        { text: "$4x + 3$", isCorrect: false, rationale: "The sign of the first term is incorrect." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "If $P = 2l + 2w$ is the formula for the perimeter of a rectangle, what is the perimeter if $l=15.5$ and $w=8$?",
                    answerOptions: [
                        { text: "23.5", isCorrect: false, rationale: "This is the sum of the length and width." },
                        { text: "31", isCorrect: false, rationale: "This is 2*l only." },
                        { text: "47", isCorrect: true, rationale: "P = 2(15.5) + 2(8) = 31 + 16 = 47." },
                        { text: "55", isCorrect: false, rationale: "This is an incorrect calculation." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "Factor $y^2 + 2y - 15$.",
                    answerOptions: [
                        { text: "$(y + 5)(y - 3)$", isCorrect: true, rationale: "We need two numbers that multiply to -15 and add to +2. These numbers are +5 and -3." },
                        { text: "$(y - 5)(y + 3)$", isCorrect: false, rationale: "This would result in a middle term of -2y." },
                        { text: "$(y + 15)(y - 1)$", isCorrect: false, rationale: "This would result in a middle term of +14y." },
                        { text: "$(y - 15)(y + 1)$", isCorrect: false, rationale: "This would result in a middle term of -14y." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "What does it mean to 'combine like terms'?",
                    answerOptions: [
                        { text: "Multiply all the coefficients.", isCorrect: false, rationale: "This is not what combining like terms means." },
                        { text: "Add or subtract terms that have the exact same variable part (including exponents).", isCorrect: true, rationale: "For example, 3x and 5x are like terms, but 3x and 5x^2 are not." },
                        { text: "Find the greatest common factor of all the terms.", isCorrect: false, rationale: "This is factoring, not combining terms." },
                        { text: "Substitute values for the variables.", isCorrect: false, rationale: "This is evaluating an expression." }
                    ]
                }
            ]
        },
        {
            quizId: "math_expressions_polynomials_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify: $5x^2 - 3x + 2 - 2x^2 + 5x - 4$.",
                    answerOptions: [
                        { text: "$3x^2 + 2x - 2$", isCorrect: true, rationale: "Combine like terms: (5x^2-2x^2) + (-3x+5x) + (2-4) = 3x^2 + 2x - 2." },
                        { text: "$7x^2 + 2x - 2$", isCorrect: false, rationale: "This incorrectly adds the x^2 terms." },
                        { text: "$3x^2 - 8x - 6$", isCorrect: false, rationale: "This incorrectly subtracts 5x from -3x." },
                        { text: "$3x^2 + 2x + 2$", isCorrect: false, rationale: "This incorrectly calculates the constant term." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "Evaluate $ab - c$ for $a=5, b=-2, c=4$.",
                    answerOptions: [
                        { text: "6", isCorrect: false, rationale: "This is incorrect." },
                        { text: "-6", isCorrect: false, rationale: "This is incorrect." },
                        { text: "-14", isCorrect: true, rationale: "Substitute the values: (5)(-2) - 4 = -10 - 4 = -14." },
                        { text: "14", isCorrect: false, rationale: "This incorrectly calculates (-10) - 4 as +14." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "Multiply: $(3x - 2)(x + 4)$.",
                    answerOptions: [
                        { text: "$3x^2 + 10x - 8$", isCorrect: true, rationale: "FOIL: (3x*x) + (3x*4) + (-2*x) + (-2*4) = 3x^2 + 12x - 2x - 8 = 3x^2 + 10x - 8." },
                        { text: "$3x^2 - 8$", isCorrect: false, rationale: "This misses the middle term." },
                        { text: "$3x^2 - 10x - 8$", isCorrect: false, rationale: "This incorrectly calculates the middle term." },
                        { text: "$4x + 2$", isCorrect: false, rationale: "This is an incorrect simplification." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following is a factor of $x^2 - x - 12$?",
                    answerOptions: [
                        { text: "$(x + 4)$", isCorrect: false, rationale: "If this were a factor, the other would be (x-5) which is incorrect." },
                        { text: "$(x - 3)$", isCorrect: false, rationale: "If this were a factor, the other would be (x+4) which is incorrect." },
                        { text: "$(x - 4)$", isCorrect: true, rationale: "We need two numbers that multiply to -12 and add to -1. These numbers are -4 and +3. So the factors are (x-4) and (x+3)." },
                        { text: "$(x + 2)$", isCorrect: false, rationale: "If this were a factor, the other would be (x-6) which is incorrect." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: false,
                    type: "knowledge",
                    question: "Add: $(a^2 - b^2) + (a^2 + b^2)$.",
                    answerOptions: [
                        { text: "$0$", isCorrect: false, rationale: "This would be the result of subtracting the second expression from the first." },
                        { text: "$2a^2$", isCorrect: true, rationale: "Combine like terms: (a^2+a^2) + (-b^2+b^2) = 2a^2 + 0 = 2a^2." },
                        { text: "$2b^2$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$2a^2 - 2b^2$", isCorrect: false, rationale: "This incorrectly subtracts b^2 from -b^2." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "A number $n$ is increased by 10. Which expression represents this?",
                    answerOptions: [
                        { text: "$10n$", isCorrect: false, rationale: "This represents '10 times a number'." },
                        { text: "$n + 10$", isCorrect: true, rationale: "'Increased by' signifies addition." },
                        { text: "$n - 10$", isCorrect: false, rationale: "This represents 'a number decreased by 10'." },
                        { text: "$10 - n$", isCorrect: false, rationale: "This represents '10 decreased by a number'." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "Expand: $(x+5)^2$.",
                    answerOptions: [
                        { text: "$x^2 + 25$", isCorrect: false, rationale: "This is a common mistake. It misses the middle term from the FOIL process." },
                        { text: "$x^2 + 10$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x^2 + 10x + 25$", isCorrect: true, rationale: "(x+5)(x+5) = x^2 + 5x + 5x + 25 = x^2 + 10x + 25." },
                        { text: "$2x + 10$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "The temperature in Fahrenheit ($F$) can be found using the expression $F = \\frac{9}{5}C + 32$, where $C$ is the temperature in Celsius. If the temperature is 20°C, what is it in Fahrenheit?",
                    answerOptions: [
                        { text: "43°F", isCorrect: false, rationale: "This is incorrect." },
                        { text: "52°F", isCorrect: false, rationale: "This is incorrect." },
                        { text: "68°F", isCorrect: true, rationale: "F = (9/5)*20 + 32 = (1.8)*20 + 32 = 36 + 32 = 68°F." },
                        { text: "75°F", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "Factor completely: $2x^2 - 8$.",
                    answerOptions: [
                        { text: "$2(x^2 - 4)$", isCorrect: false, rationale: "This is a correct first step, but the expression in the parentheses can be factored further." },
                        { text: "$2(x - 2)(x + 2)$", isCorrect: true, rationale: "First, factor out the GCF of 2, leaving 2(x^2-4). Then, factor the difference of squares, x^2-4, into (x-2)(x+2)." },
                        { text: "$(2x - 4)(x + 2)$", isCorrect: false, rationale: "This expands to 2x^2 - 8, but it's not the complete factorization." },
                        { text: "$2(x-2)^2$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "A trinomial is a polynomial with how many terms?",
                    answerOptions: [
                        { text: "1", isCorrect: false, rationale: "This is a monomial." },
                        { text: "2", isCorrect: false, rationale: "This is a binomial." },
                        { text: "3", isCorrect: true, rationale: "The prefix 'tri-' means three." },
                        { text: "4", isCorrect: false, rationale: "This is just called a polynomial of four terms." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: false,
                    type: "knowledge",
                    question: "Evaluate $|x - 5|$ for $x = 2$.",
                    answerOptions: [
                        { text: "-3", isCorrect: false, rationale: "The absolute value cannot be negative." },
                        { text: "3", isCorrect: true, rationale: "Substitute x=2: |2 - 5| = |-3|. The absolute value of -3 is 3." },
                        { text: "7", isCorrect: false, rationale: "This is the result of |2+5|." },
                        { text: "-7", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify the expression $x^2 \\cdot x^3$.",
                    answerOptions: [
                        { text: "$x^5$", isCorrect: true, rationale: "When multiplying terms with the same base, you add the exponents: x^(2+3) = x^5." },
                        { text: "$x^6$", isCorrect: false, rationale: "This is the result of multiplying the exponents." },
                        { text: "$2x^5$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$2x^6$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following expressions is undefined when $x=2$?",
                    answerOptions: [
                        { text: "$x - 2$", isCorrect: false, rationale: "This expression equals 0 when x=2." },
                        { text: "$\\frac{x+2}{x}$", isCorrect: false, rationale: "This expression equals 4/2 = 2 when x=2." },
                        { text: "$\\frac{5}{x - 2}$", isCorrect: true, rationale: "When x=2, the denominator becomes 2-2=0. Division by zero is undefined." },
                        { text: "$x^2 + 2$", isCorrect: false, rationale: "This expression equals 6 when x=2." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the constant term in the polynomial $7x^3 - 4x + 1$?",
                    answerOptions: [
                        { text: "7", isCorrect: false, rationale: "This is the coefficient of the x^3 term." },
                        { text: "-4", isCorrect: false, rationale: "This is the coefficient of the x term." },
                        { text: "1", isCorrect: true, rationale: "The constant term is the term without a variable." },
                        { text: "3", isCorrect: false, rationale: "This is the degree of the polynomial." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "Simplify $\\sqrt{16x^2}$.",
                    answerOptions: [
                        { text: "$4x$", isCorrect: true, rationale: "The square root of 16 is 4, and the square root of x^2 is x." },
                        { text: "$8x$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$4x^2$", isCorrect: false, rationale: "This only takes the square root of the coefficient." },
                        { text: "$16x$", isCorrect: false, rationale: "This only takes the square root of the variable." }
                    ]
                }
            ]
        }
    ]
};
// Math -> Algebraic Problem Solving -> Linear Equations & Functions
AppData.quizzes.math_linear_equations_functions = {
    id: "math_linear_equations_functions",
    title: "Linear Equations & Functions",
    description: "Solving linear equations, inequalities, and working with functions.",
    quizzes: [
        {
            quizId: "math_linear_equations_functions_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for $x$: $2x + 5 = 11$.",
                    answerOptions: [
                        { text: "$x = 2$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x = 3$", isCorrect: true, rationale: "Subtract 5 from both sides: 2x = 6. Then, divide by 2: x = 3." },
                        { text: "$x = 8$", isCorrect: false, rationale: "This is the result of adding 5 to 11 instead of subtracting." },
                        { text: "$x = 10.5$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "If $f(x) = 3x - 1$, what is the value of $f(4)$?",
                    answerOptions: [
                        { text: "7", isCorrect: false, rationale: "This is incorrect." },
                        { text: "11", isCorrect: true, rationale: "Substitute x=4 into the function: f(4) = 3(4) - 1 = 12 - 1 = 11." },
                        { text: "12", isCorrect: false, rationale: "This is the value of 3(4) before subtracting 1." },
                        { text: "13", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the slope of the line given by the equation $y = 2x + 3$?",
                    answerOptions: [
                        { text: "1", isCorrect: false, rationale: "This is incorrect." },
                        { text: "2", isCorrect: true, rationale: "The equation is in slope-intercept form (y = mx + b), where 'm' is the slope. In this case, m = 2." },
                        { text: "3", isCorrect: false, rationale: "This is the y-intercept, not the slope." },
                        { text: "5", isCorrect: false, rationale: "This is the sum of the slope and y-intercept." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve the inequality: $3x < 15$.",
                    answerOptions: [
                        { text: "$x > 5$", isCorrect: false, rationale: "The inequality sign should not be reversed." },
                        { text: "$x < 5$", isCorrect: true, rationale: "Divide both sides by 3. The inequality sign remains the same because you are dividing by a positive number." },
                        { text: "$x < 12$", isCorrect: false, rationale: "This is the result of subtracting 3 instead of dividing." },
                        { text: "$x > 12$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "knowledge",
                    question: "A phone plan costs $20 per month plus $0.10 per minute of calls. Which equation represents the total monthly cost, C, for m minutes?",
                    answerOptions: [
                        { text: "$C = 20m + 0.10$", isCorrect: false, rationale: "This incorrectly multiplies the monthly fee by the minutes." },
                        { text: "$C = 20 + 0.10m$", isCorrect: true, rationale: "The total cost is the fixed fee of $20 plus the variable cost of $0.10 times the number of minutes (m)." },
                        { text: "$C = 20.10m$", isCorrect: false, rationale: "This incorrectly combines the fixed and variable costs." },
                        { text: "$C = (20 + 0.10)m$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for $y$: $5y - 3 = 2y + 9$.",
                    answerOptions: [
                        { text: "$y = 2$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$y = 3$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$y = 4$", isCorrect: true, rationale: "Subtract 2y from both sides: 3y - 3 = 9. Add 3 to both sides: 3y = 12. Divide by 3: y = 4." },
                        { text: "$y = 6$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "image",
                    imageUrl: "Images/math_graph_2.png",
                    question: "What are the coordinates of the y-intercept of the line shown in the graph?",
                    answerOptions: [
                        { text: "(0, 2)", isCorrect: true, rationale: "The y-intercept is the point where the line crosses the y-axis. The graph shows this occurs at y=2." },
                        { text: "(2, 0)", isCorrect: false, rationale: "This is the x-intercept." },
                        { text: "(0, 0)", isCorrect: false, rationale: "The line does not pass through the origin." },
                        { text: "(1, 1)", isCorrect: false, rationale: "This is a point on the line, but not the y-intercept." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "A taxi charges a flat fee of $3 and $2 per mile. If a ride costs $15, how many miles was the trip?",
                    answerOptions: [
                        { text: "5 miles", isCorrect: false, rationale: "This is incorrect." },
                        { text: "6 miles", isCorrect: true, rationale: "Let m be the number of miles. The equation is 2m + 3 = 15. Subtract 3: 2m = 12. Divide by 2: m = 6 miles." },
                        { text: "7.5 miles", isCorrect: false, rationale: "This is the result if there was no flat fee." },
                        { text: "9 miles", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the slope of the line passing through the points (1, 2) and (3, 6)?",
                    answerOptions: [
                        { text: "1", isCorrect: false, rationale: "This is incorrect." },
                        { text: "2", isCorrect: true, rationale: "Slope = (change in y) / (change in x) = (6-2) / (3-1) = 4 / 2 = 2." },
                        { text: "3", isCorrect: false, rationale: "This is incorrect." },
                        { text: "4", isCorrect: false, rationale: "This is the change in y, but not the slope." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "If $f(x) = 5 - 2x$, find the value of $x$ for which $f(x) = -3$.",
                    answerOptions: [
                        { text: "$x = 1$", isCorrect: false, rationale: "f(1) would be 3." },
                        { text: "$x = 4$", isCorrect: true, rationale: "Set the function equal to -3: 5 - 2x = -3. Subtract 5 from both sides: -2x = -8. Divide by -2: x = 4." },
                        { text: "$x = 5$", isCorrect: false, rationale: "f(5) would be -5." },
                        { text: "$x = -4$", isCorrect: false, rationale: "f(-4) would be 13." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for $x$: $4(x + 1) = 20$.",
                    answerOptions: [
                        { text: "$x = 4$", isCorrect: true, rationale: "Divide both sides by 4: x + 1 = 5. Then subtract 1 from both sides: x = 4." },
                        { text: "$x = 5$", isCorrect: false, rationale: "This is the value of x+1." },
                        { text: "$x = 6$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x = 15$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "image",
                    imageUrl: "Images/math_graph_3.png",
                    question: "Which of the following equations represents the line shown in the graph?",
                    answerOptions: [
                        { text: "$y = -x + 1$", isCorrect: true, rationale: "The line has a y-intercept of 1 and a slope of -1 (it goes down 1 for every 1 it goes to the right)." },
                        { text: "$y = x + 1$", isCorrect: false, rationale: "This line would have a positive slope." },
                        { text: "$y = -x - 1$", isCorrect: false, rationale: "This line would have a y-intercept of -1." },
                        { text: "$y = x - 1$", isCorrect: false, rationale: "This line would have a positive slope and a y-intercept of -1." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "The sum of three consecutive integers is 45. What is the largest of these integers?",
                    answerOptions: [
                        { text: "14", isCorrect: false, rationale: "This is the smallest of the three integers." },
                        { text: "15", isCorrect: false, rationale: "This is the middle integer." },
                        { text: "16", isCorrect: true, rationale: "Let the integers be x, x+1, and x+2. Their sum is 3x + 3 = 45. Solving for x gives 3x=42, so x=14. The integers are 14, 15, and 16. The largest is 16." },
                        { text: "17", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve the inequality: $-2x > 8$.",
                    answerOptions: [
                        { text: "$x > -4$", isCorrect: false, rationale: "The inequality sign must be reversed when dividing by a negative number." },
                        { text: "$x < -4$", isCorrect: true, rationale: "Divide both sides by -2 and reverse the inequality sign: x < -4." },
                        { text: "$x > 4$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x < 4$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the x-intercept of the line $y = 3x - 6$?",
                    answerOptions: [
                        { text: "(-2, 0)", isCorrect: false, rationale: "This is incorrect." },
                        { text: "(0, -6)", isCorrect: false, rationale: "This is the y-intercept." },
                        { text: "(2, 0)", isCorrect: true, rationale: "The x-intercept is the point where y=0. Set 0 = 3x - 6. Add 6 to both sides: 6 = 3x. Divide by 3: x = 2." },
                        { text: "(3, 0)", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        },
        {
            quizId: "math_linear_equations_functions_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for $y$: $\\frac{y}{4} - 2 = 3$.",
                    answerOptions: [
                        { text: "$y = 4$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$y = 12$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$y = 20$", isCorrect: true, rationale: "Add 2 to both sides: y/4 = 5. Then, multiply both sides by 4: y = 20." },
                        { text: "$y = 24$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "Given the function $g(t) = 10 - 2t$, what is $g(3)$?",
                    answerOptions: [
                        { text: "4", isCorrect: true, rationale: "g(3) = 10 - 2(3) = 10 - 6 = 4." },
                        { text: "6", isCorrect: false, rationale: "This is the value of 2(3)." },
                        { text: "8", isCorrect: false, rationale: "This is incorrect." },
                        { text: "16", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "In the equation $y = mx + b$, what does the 'b' represent?",
                    answerOptions: [
                        { text: "The slope", isCorrect: false, rationale: "The slope is represented by 'm'." },
                        { text: "The x-intercept", isCorrect: false, rationale: "The x-intercept is the point where y=0." },
                        { text: "The y-intercept", isCorrect: true, rationale: "'b' represents the y-intercept, the point where the line crosses the vertical y-axis." },
                        { text: "A variable", isCorrect: false, rationale: "It is a constant that defines a specific line." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following values of $x$ is a solution to the inequality $2x + 1 \geq 7$?",
                    answerOptions: [
                        { text: "1", isCorrect: false, rationale: "2(1)+1 = 3, which is not greater than or equal to 7." },
                        { text: "2", isCorrect: false, rationale: "2(2)+1 = 5, which is not greater than or equal to 7." },
                        { text: "3", isCorrect: true, rationale: "First, solve the inequality: 2x >= 6, so x >= 3. The value 3 is a solution." },
                        { text: "0", isCorrect: false, rationale: "2(0)+1 = 1, which is not greater than or equal to 7." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "knowledge",
                    question: "A movie ticket costs $12.50. The total cost C is a function of the number of tickets, t. Which equation represents this relationship?",
                    answerOptions: [
                        { text: "$C(t) = 12.50 + t$", isCorrect: false, rationale: "This would add the number of tickets to the price." },
                        { text: "$C(t) = t - 12.50$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$C(t) = \\frac{t}{12.50}$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$C(t) = 12.50t$", isCorrect: true, rationale: "The total cost is the price per ticket ($12.50) multiplied by the number of tickets (t)." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve the equation: $3(x - 2) = 9$.",
                    answerOptions: [
                        { text: "$x = 3$", isCorrect: false, rationale: "This would be the value of x-2." },
                        { text: "$x = 5$", isCorrect: true, rationale: "Divide both sides by 3: x - 2 = 3. Add 2 to both sides: x = 5." },
                        { text: "$x = 7$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x = 11$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "image",
                    imageUrl: "Images/math_graph_4.png",
                    question: "What is the slope of the line shown in the graph?",
                    answerOptions: [
                        { text: "$-2$", isCorrect: false, rationale: "The line is rising from left to right, so the slope is positive." },
                        { text: "$-\\frac{1}{2}$", isCorrect: false, rationale: "The slope is positive." },
                        { text: "$2$", isCorrect: false, rationale: "The line rises 1 unit for every 2 units it moves to the right." },
                        { text: "$\\frac{1}{2}$", isCorrect: true, rationale: "The line passes through (0,1) and (2,2). The slope is (2-1)/(2-0) = 1/2." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "The perimeter of a rectangle is 30 cm. The length is 3 cm longer than the width. What is the width?",
                    answerOptions: [
                        { text: "6 cm", isCorrect: true, rationale: "Let w be the width and l be the length. l = w+3. The perimeter is 2l + 2w = 30. Substitute l: 2(w+3) + 2w = 30. 2w + 6 + 2w = 30. 4w = 24. w = 6 cm." },
                        { text: "9 cm", isCorrect: false, rationale: "This is the length." },
                        { text: "12 cm", isCorrect: false, rationale: "This is incorrect." },
                        { text: "15 cm", isCorrect: false, rationale: "This is half the perimeter." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "Which equation represents a line that is parallel to $y = 5x - 2$?",
                    answerOptions: [
                        { text: "$y = -5x + 3$", isCorrect: false, rationale: "This line has a different slope." },
                        { text: "$y = 5x + 1$", isCorrect: true, rationale: "Parallel lines have the same slope. This line has a slope of 5, the same as the original line." },
                        { text: "$y = \\frac{1}{5}x - 2$", isCorrect: false, rationale: "This line has a different slope." },
                        { text: "$y = -\\frac{1}{5}x + 2$", isCorrect: false, rationale: "This line is perpendicular to the original line." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "A function is a rule that assigns each input to:",
                    answerOptions: [
                        { text: "Exactly one output", isCorrect: true, rationale: "This is the definition of a function; for every input value, there is one and only one output value." },
                        { text: "At least one output", isCorrect: false, rationale: "A function cannot have multiple outputs for a single input." },
                        { text: "A smaller number", isCorrect: false, rationale: "The output can be larger, smaller, or the same as the input." },
                        { text: "A larger number", isCorrect: false, rationale: "The output can be larger, smaller, or the same as the input." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "knowledge",
                    question: "Solve for $x$: $1.5x + 2.5 = 10$.",
                    answerOptions: [
                        { text: "$x = 3$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x = 5$", isCorrect: true, rationale: "Subtract 2.5 from both sides: 1.5x = 7.5. Divide by 1.5: x = 5." },
                        { text: "$x = 7.5$", isCorrect: false, rationale: "This is the value of 1.5x." },
                        { text: "$x = 8.33$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "image",
                    imageUrl: "Images/math_graph_5.png",
                    question: "The graph shows a system of two linear equations. What is the solution to the system?",
                    answerOptions: [
                        { text: "(0, 3)", isCorrect: false, rationale: "This is the y-intercept of one line." },
                        { text: "(2, 1)", isCorrect: true, rationale: "The solution to a system of equations is the point where the lines intersect. The graph shows the intersection at (2, 1)." },
                        { text: "(1, 2)", isCorrect: false, rationale: "This is a point on one of the lines, but not the intersection." },
                        { text: "There is no solution.", isCorrect: false, rationale: "The lines intersect, so there is one solution." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "A cell phone company charges a monthly fee of $25 plus $0.05 per text message. Last month, your bill was $32.50. How many text messages did you send?",
                    answerOptions: [
                        { text: "100", isCorrect: false, rationale: "This is incorrect." },
                        { text: "125", isCorrect: false, rationale: "This is incorrect." },
                        { text: "150", isCorrect: true, rationale: "Let t be the number of texts. The equation is 25 + 0.05t = 32.50. Subtract 25: 0.05t = 7.50. Divide by 0.05: t = 150." },
                        { text: "650", isCorrect: false, rationale: "This is the result of dividing 32.50 by 0.05." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for x: $x - 7 = 3x + 1$.",
                    answerOptions: [
                        { text: "$x = -4$", isCorrect: true, rationale: "Subtract x from both sides: -7 = 2x + 1. Subtract 1: -8 = 2x. Divide by 2: x = -4." },
                        { text: "$x = -3$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x = 3$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x = 4$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "Which of the following describes the graph of $y = -3$?",
                    answerOptions: [
                        { text: "A vertical line passing through x = -3.", isCorrect: false, rationale: "This would be the graph of x = -3." },
                        { text: "A horizontal line passing through y = -3.", isCorrect: true, rationale: "The equation y = c (where c is a constant) is always a horizontal line." },
                        { text: "A line with a slope of -3.", isCorrect: false, rationale: "A horizontal line has a slope of 0." },
                        { text: "A point at (-3, -3).", isCorrect: false, rationale: "This is a single point, not a line." }
                    ]
                }
            ]
        },
        {
            quizId: "math_linear_equations_functions_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for x: $5x - 10 = 15$.",
                    answerOptions: [
                        { text: "$x = 1$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x = 3$", isCorrect: false, rationale: "This would be the result if the equation was 5x=15." },
                        { text: "$x = 5$", isCorrect: true, rationale: "Add 10 to both sides: 5x = 25. Divide by 5: x = 5." },
                        { text: "$x = 25$", isCorrect: false, rationale: "This is the value of 5x." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: false,
                    type: "knowledge",
                    question: "If $h(x) = x^2 + 1$, what is the value of $h(3)$?",
                    answerOptions: [
                        { text: "7", isCorrect: false, rationale: "This is incorrect." },
                        { text: "9", isCorrect: false, rationale: "This is the value of 3^2." },
                        { text: "10", isCorrect: true, rationale: "Substitute x=3: h(3) = (3)^2 + 1 = 9 + 1 = 10." },
                        { text: "12", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the y-intercept of the line $y = 4x - 5$?",
                    answerOptions: [
                        { text: "4", isCorrect: false, rationale: "This is the slope." },
                        { text: "-5", isCorrect: true, rationale: "The equation is in slope-intercept form (y = mx + b), where 'b' is the y-intercept. Here, b = -5." },
                        { text: "5", isCorrect: false, rationale: "The y-intercept is negative." },
                        { text: "1.25", isCorrect: false, rationale: "This is the x-intercept." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve the inequality: $x + 5 > 8$.",
                    answerOptions: [
                        { text: "$x > 3$", isCorrect: true, rationale: "Subtract 5 from both sides." },
                        { text: "$x < 3$", isCorrect: false, rationale: "The inequality sign should not be reversed." },
                        { text: "$x > 13$", isCorrect: false, rationale: "This is the result of adding 5." },
                        { text: "$x < 13$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "knowledge",
                    question: "A plumber charges a $50 service fee and $75 per hour of work. If a job takes 3 hours, what is the total cost?",
                    answerOptions: [
                        { text: "$128", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$225", isCorrect: false, rationale: "This is the cost for the hours only, without the service fee." },
                        { text: "$275", isCorrect: true, rationale: "Total Cost = $50 (fee) + $75/hr * 3 hrs = $50 + $225 = $275." },
                        { text: "$375", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve for $a$: $10 - a = 4$.",
                    answerOptions: [
                        { text: "$a = 4$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$a = 6$", isCorrect: true, rationale: "Subtract 10 from both sides: -a = -6. Multiply by -1: a = 6." },
                        { text: "$a = 14$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$a = -6$", isCorrect: false, rationale: "This is the value of -a." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "image",
                    imageUrl: "Images/math_graph_2.png",
                    question: "What are the coordinates of the x-intercept of the line shown in the graph?",
                    answerOptions: [
                        { text: "(0, 2)", isCorrect: false, rationale: "This is the y-intercept." },
                        { text: "(2, 0)", isCorrect: true, rationale: "The x-intercept is the point where the line crosses the x-axis, which occurs at x=2." },
                        { text: "(0, 0)", isCorrect: false, rationale: "The line does not pass through the origin." },
                        { text: "(-2, 0)", isCorrect: false, rationale: "The x-intercept is positive." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "knowledge",
                    question: "Two numbers have a sum of 25. One number is 9 more than the other. What are the two numbers?",
                    answerOptions: [
                        { text: "10 and 15", isCorrect: false, rationale: "Their sum is 25, but their difference is 5, not 9." },
                        { text: "8 and 17", isCorrect: true, rationale: "Let the numbers be x and x+9. Their sum is 2x+9=25. 2x=16, so x=8. The numbers are 8 and 17." },
                        { text: "7 and 18", isCorrect: false, rationale: "Their sum is 25, but their difference is 11, not 9." },
                        { text: "12 and 13", isCorrect: false, rationale: "Their sum is 25, but their difference is 1, not 9." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "Find the slope of the line that passes through (2, 5) and (4, 1).",
                    answerOptions: [
                        { text: "2", isCorrect: false, rationale: "This is incorrect." },
                        { text: "-2", isCorrect: true, rationale: "Slope = (1-5) / (4-2) = -4 / 2 = -2." },
                        { text: "$\\frac{1}{2}$", isCorrect: false, rationale: "This is the negative reciprocal of the slope." },
                        { text: "$-\\frac{1}{2}$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "Which point is a solution to the equation $y = 2x - 3$?",
                    answerOptions: [
                        { text: "(1, -1)", isCorrect: true, rationale: "Plug in the values: -1 = 2(1) - 3, which simplifies to -1 = 2 - 3, or -1 = -1. This is a true statement." },
                        { text: "(2, 3)", isCorrect: false, rationale: "If x=2, y = 2(2)-3 = 1, not 3." },
                        { text: "(0, 3)", isCorrect: false, rationale: "If x=0, y = 2(0)-3 = -3, not 3." },
                        { text: "(-1, 1)", isCorrect: false, rationale: "If x=-1, y = 2(-1)-3 = -5, not 1." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve the equation: $\\frac{x}{2} + 3 = 7$.",
                    answerOptions: [
                        { text: "$x = 2$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x = 4$", isCorrect: false, rationale: "This would be the value of x/2." },
                        { text: "$x = 8$", isCorrect: true, rationale: "Subtract 3 from both sides: x/2 = 4. Multiply by 2: x = 8." },
                        { text: "$x = 20$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "image",
                    imageUrl: "Images/math_graph_6.png",
                    question: "Which inequality is represented by the graph?",
                    answerOptions: [
                        { text: "$y > 2x + 1$", isCorrect: false, rationale: "The line is dashed, and the shaded region is below the line." },
                        { text: "$y \\geq 2x + 1$", isCorrect: false, rationale: "The line should be dashed for a strict inequality." },
                        { text: "$y < 2x + 1$", isCorrect: true, rationale: "The line has a slope of 2 and a y-intercept of 1. It is dashed (indicating < or >) and the area below it is shaded (indicating <)." },
                        { text: "$y \\leq 2x + 1$", isCorrect: false, rationale: "The line should be solid for 'less than or equal to'." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "A rectangular garden has a length that is twice its width. If the perimeter is 60 meters, what is the width?",
                    answerOptions: [
                        { text: "10 meters", isCorrect: true, rationale: "Let w be the width and l be the length. l=2w. Perimeter = 2l+2w = 60. Substitute l: 2(2w) + 2w = 60. 4w + 2w = 60. 6w = 60. w=10 meters." },
                        { text: "15 meters", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20 meters", isCorrect: false, rationale: "This is the length." },
                        { text: "30 meters", isCorrect: false, rationale: "This is half the perimeter." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "Solve the inequality: $5 - x \\leq 3$.",
                    answerOptions: [
                        { text: "$x \\leq 2$", isCorrect: false, rationale: "The inequality sign needs to be reversed." },
                        { text: "$x \\geq 2$", isCorrect: true, rationale: "Subtract 5 from both sides: -x <= -2. Multiply by -1 and reverse the inequality sign: x >= 2." },
                        { text: "$x \\leq -2$", isCorrect: false, rationale: "This is incorrect." },
                        { text: "$x \\geq -2$", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the domain of a function?",
                    answerOptions: [
                        { text: "The set of all possible output values (y-values).", isCorrect: false, rationale: "This is the range of the function." },
                        { text: "The set of all possible input values (x-values).", isCorrect: true, rationale: "The domain defines all the values that x is allowed to be for the function." },
                        { text: "The slope of the function's graph.", isCorrect: false, rationale: "This is a property of a linear function, but not the domain." },
                        { text: "The point where the function crosses the y-axis.", isCorrect: false, rationale: "This is the y-intercept." }
                    ]
                }
            ]
        }
    ]
};
// Math -> Geometry -> Geometry Basics
AppData.quizzes.math_geometry_basics = {
    id: "math_geometry_basics",
    title: "Geometry Basics",
    description: "Calculating area, perimeter, volume, and surface area.",
    quizzes: [
        {
            quizId: "math_geometry_basics_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_1.png",
                    question: "A rectangle has a length of 12 cm and a width of 5 cm. What is its perimeter?",
                    answerOptions: [
                        { text: "17 cm", isCorrect: false, rationale: "This is the sum of the length and width, not the perimeter." },
                        { text: "34 cm", isCorrect: true, rationale: "The perimeter of a rectangle is 2 * (length + width). P = 2 * (12 + 5) = 2 * 17 = 34 cm." },
                        { text: "60 cm", isCorrect: false, rationale: "This is the area of the rectangle, not the perimeter." },
                        { text: "144 cm", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_1.png",
                    question: "A rectangle has a length of 12 cm and a width of 5 cm. What is its area?",
                    answerOptions: [
                        { text: "17 cm²", isCorrect: false, rationale: "This is the sum of the length and width." },
                        { text: "34 cm²", isCorrect: false, rationale: "This is the perimeter of the rectangle." },
                        { text: "60 cm²", isCorrect: true, rationale: "The area of a rectangle is length * width. A = 12 cm * 5 cm = 60 cm²." },
                        { text: "144 cm²", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_2.png",
                    question: "What is the area of a triangle with a base of 10 inches and a height of 6 inches?",
                    answerOptions: [
                        { text: "15 in²", isCorrect: false, rationale: "This is incorrect." },
                        { text: "30 in²", isCorrect: true, rationale: "The area of a triangle is (1/2) * base * height. A = (1/2) * 10 * 6 = 30 in²." },
                        { text: "60 in²", isCorrect: false, rationale: "This would be the area of a rectangle with the same dimensions." },
                        { text: "16 in²", isCorrect: false, rationale: "This is the sum of the base and height." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_3.png",
                    question: "A circle has a radius of 4 meters. What is its circumference? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "12.56 m", isCorrect: false, rationale: "This would be the circumference if the radius was 2." },
                        { text: "25.12 m", isCorrect: true, rationale: "The formula for circumference is C = 2 * π * r. C = 2 * 3.14 * 4 = 25.12 m." },
                        { text: "50.24 m", isCorrect: false, rationale: "This is the area of the circle, not the circumference." },
                        { text: "16 m", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_3.png",
                    question: "A circle has a radius of 4 meters. What is its area? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "12.56 m²", isCorrect: false, rationale: "This is the circumference if the radius was 2." },
                        { text: "25.12 m²", isCorrect: false, rationale: "This is the circumference of the circle." },
                        { text: "50.24 m²", isCorrect: true, rationale: "The formula for area is A = π * r². A = 3.14 * (4)² = 3.14 * 16 = 50.24 m²." },
                        { text: "16 m²", isCorrect: false, rationale: "This is r squared, not the area." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_4.png",
                    question: "What is the volume of a rectangular prism with a length of 5 ft, a width of 3 ft, and a height of 4 ft?",
                    answerOptions: [
                        { text: "12 ft³", isCorrect: false, rationale: "This is the sum of the dimensions." },
                        { text: "60 ft³", isCorrect: true, rationale: "Volume of a rectangular prism is length * width * height. V = 5 * 3 * 4 = 60 ft³." },
                        { text: "94 ft³", isCorrect: false, rationale: "This is the surface area of the prism." },
                        { text: "120 ft³", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "Two angles in a triangle measure 40° and 60°. What is the measure of the third angle?",
                    answerOptions: [
                        { text: "30°", isCorrect: false, rationale: "The sum of the angles would be 130°, not 180°." },
                        { text: "80°", isCorrect: true, rationale: "The sum of the angles in any triangle is 180°. The third angle is 180° - 40° - 60° = 80°." },
                        { text: "90°", isCorrect: false, rationale: "This would be a right triangle, but the angles do not sum to 180°." },
                        { text: "100°", isCorrect: false, rationale: "This is the sum of the two given angles." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_5.png",
                    question: "What is the volume of a cylinder with a radius of 3 inches and a height of 10 inches? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "94.2 in³", isCorrect: false, rationale: "This would be the volume if the radius was 3 and height was 10, but the formula was V=pi*r*h." },
                        { text: "188.4 in³", isCorrect: false, rationale: "This is the lateral surface area of the cylinder." },
                        { text: "282.6 in³", isCorrect: true, rationale: "The formula for the volume of a cylinder is V = π * r² * h. V = 3.14 * (3)² * 10 = 3.14 * 9 * 10 = 282.6 in³." },
                        { text: "300 in³", isCorrect: false, rationale: "This is an approximation." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: false,
                    type: "knowledge",
                    question: "The Pythagorean theorem, $a^2 + b^2 = c^2$, applies to which type of triangle?",
                    answerOptions: [
                        { text: "Equilateral triangle", isCorrect: false, rationale: "An equilateral triangle has all sides equal." },
                        { text: "Isosceles triangle", isCorrect: false, rationale: "An isosceles triangle has two equal sides." },
                        { text: "Right triangle", isCorrect: true, rationale: "The theorem relates the lengths of the two legs (a and b) to the length of the hypotenuse (c) in a right triangle." },
                        { text: "All triangles", isCorrect: false, rationale: "The theorem is specific to right triangles." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: true,
                    type: "knowledge",
                    question: "A square garden has a side length of 20 feet. What is the area of the garden?",
                    answerOptions: [
                        { text: "40 ft²", isCorrect: false, rationale: "This is the length of two sides." },
                        { text: "80 ft²", isCorrect: false, rationale: "This is the perimeter of the garden." },
                        { text: "400 ft²", isCorrect: true, rationale: "The area of a square is side * side. A = 20 ft * 20 ft = 400 ft²." },
                        { text: "200 ft²", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_4.png",
                    question: "What is the surface area of a rectangular prism with length 5m, width 3m, and height 4m?",
                    answerOptions: [
                        { text: "60 m²", isCorrect: false, rationale: "This is the volume of the prism." },
                        { text: "94 m²", isCorrect: true, rationale: "Surface Area = 2(lw + lh + wh) = 2((5*3) + (5*4) + (3*4)) = 2(15 + 20 + 12) = 2(47) = 94 m²." },
                        { text: "47 m²", isCorrect: false, rationale: "This is half of the surface area." },
                        { text: "120 m²", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "A line segment that passes through the center of a circle and has endpoints on the circle is called the:",
                    answerOptions: [
                        { text: "Radius", isCorrect: false, rationale: "The radius is the distance from the center to any point on the circle." },
                        { text: "Chord", isCorrect: false, rationale: "A chord is a line segment whose endpoints both lie on the circle. The diameter is a special type of chord." },
                        { text: "Diameter", isCorrect: true, rationale: "This is the definition of a diameter." },
                        { text: "Circumference", isCorrect: false, rationale: "The circumference is the distance around the circle." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "A circular swimming pool has a diameter of 10 meters. What is the distance around the pool? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "15.7 m", isCorrect: false, rationale: "This is incorrect." },
                        { text: "31.4 m", isCorrect: true, rationale: "The radius is half the diameter, so r = 5 m. Circumference = 2 * π * r = 2 * 3.14 * 5 = 31.4 m." },
                        { text: "62.8 m", isCorrect: false, rationale: "This is incorrect." },
                        { text: "78.5 m", isCorrect: false, rationale: "This is the area of the pool." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_6.png",
                    question: "In the right triangle shown, what is the length of the hypotenuse (c)?",
                    answerOptions: [
                        { text: "7", isCorrect: false, rationale: "This is the sum of the two legs." },
                        { text: "12", isCorrect: false, rationale: "This is the product of the two legs." },
                        { text: "5", isCorrect: true, rationale: "Using the Pythagorean theorem, a² + b² = c². So, 3² + 4² = c². 9 + 16 = c². 25 = c². Therefore, c = 5." },
                        { text: "25", isCorrect: false, rationale: "This is the value of c², not c." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: true,
                    type: "knowledge",
                    question: "A room is 15 feet long and 10 feet wide. How many square feet of carpeting are needed to cover the floor?",
                    answerOptions: [
                        { text: "25 ft²", isCorrect: false, rationale: "This is the sum of the length and width." },
                        { text: "50 ft²", isCorrect: false, rationale: "This is the perimeter of the room." },
                        { text: "150 ft²", isCorrect: true, rationale: "The area is length * width. Area = 15 ft * 10 ft = 150 ft²." },
                        { text: "300 ft²", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        },
        {
            quizId: "math_geometry_basics_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    calculator: true,
                    type: "knowledge",
                    question: "What is the perimeter of a square with a side length of 7 inches?",
                    answerOptions: [
                        { text: "14 inches", isCorrect: false, rationale: "This is the length of two sides." },
                        { text: "28 inches", isCorrect: true, rationale: "The perimeter of a square is 4 * side length. P = 4 * 7 = 28 inches." },
                        { text: "49 inches", isCorrect: false, rationale: "This is the area of the square." },
                        { text: "21 inches", isCorrect: false, rationale: "This is the length of three sides." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: true,
                    type: "knowledge",
                    question: "The area of a rectangle is 48 cm². If its width is 6 cm, what is its length?",
                    answerOptions: [
                        { text: "6 cm", isCorrect: false, rationale: "This is the width." },
                        { text: "8 cm", isCorrect: true, rationale: "Area = length * width. So, 48 = length * 6. Length = 48 / 6 = 8 cm." },
                        { text: "12 cm", isCorrect: false, rationale: "This is incorrect." },
                        { text: "28 cm", isCorrect: false, rationale: "This is the perimeter of the rectangle." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_2.png",
                    question: "A triangular garden has a base of 12 meters and a height of 5 meters. What is its area?",
                    answerOptions: [
                        { text: "17 m²", isCorrect: false, rationale: "This is the sum of the base and height." },
                        { text: "30 m²", isCorrect: true, rationale: "Area = (1/2) * base * height = (1/2) * 12 * 5 = 30 m²." },
                        { text: "60 m²", isCorrect: false, rationale: "This would be the area of a rectangle with these dimensions." },
                        { text: "24 m²", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_3.png",
                    question: "A circle has a diameter of 20 feet. What is its radius?",
                    answerOptions: [
                        { text: "5 feet", isCorrect: false, rationale: "This is incorrect." },
                        { text: "10 feet", isCorrect: true, rationale: "The radius is half the diameter. r = 20 / 2 = 10 feet." },
                        { text: "20 feet", isCorrect: false, rationale: "This is the diameter." },
                        { text: "31.4 feet", isCorrect: false, rationale: "This is approximately the circumference of a circle with a radius of 5." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_3.png",
                    question: "A circular pizza has a diameter of 14 inches. What is its area? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "43.96 in²", isCorrect: false, rationale: "This is the circumference of the pizza." },
                        { text: "153.86 in²", isCorrect: true, rationale: "The radius is half the diameter, so r = 7 inches. Area = π * r² = 3.14 * (7)² = 3.14 * 49 ≈ 153.86 in²." },
                        { text: "196 in²", isCorrect: false, rationale: "This is 14 * 14." },
                        { text: "615.44 in²", isCorrect: false, rationale: "This is the area if the radius were 14." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_4.png",
                    question: "A cube has an edge length of 5 cm. What is its volume?",
                    answerOptions: [
                        { text: "25 cm³", isCorrect: false, rationale: "This is the area of one face." },
                        { text: "125 cm³", isCorrect: true, rationale: "The volume of a cube is edge³. V = 5 * 5 * 5 = 125 cm³." },
                        { text: "150 cm³", isCorrect: false, rationale: "This is the surface area of the cube." },
                        { text: "60 cm³", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "An isosceles triangle has two sides of equal length. If two angles are 50° each, what is the third angle?",
                    answerOptions: [
                        { text: "50°", isCorrect: false, rationale: "This would make it an equilateral triangle, but the angles don't sum to 180." },
                        { text: "80°", isCorrect: true, rationale: "The sum of angles is 180°. The third angle is 180° - 50° - 50° = 80°." },
                        { text: "90°", isCorrect: false, rationale: "This would make it a right isosceles triangle, but the angles don't sum to 180." },
                        { text: "130°", isCorrect: false, rationale: "This is the sum of the two given angles." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_5.png",
                    question: "A cylindrical can has a height of 8 cm and a radius of 2 cm. What is its volume? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "50.24 cm³", isCorrect: false, rationale: "This is the lateral surface area." },
                        { text: "100.48 cm³", isCorrect: true, rationale: "Volume = π * r² * h = 3.14 * (2)² * 8 = 3.14 * 4 * 8 = 100.48 cm³." },
                        { text: "200.96 cm³", isCorrect: false, rationale: "This is incorrect." },
                        { text: "32 cm³", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_6.png",
                    question: "A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?",
                    answerOptions: [
                        { text: "13", isCorrect: true, rationale: "Using the Pythagorean theorem: 5² + 12² = c². 25 + 144 = c². 169 = c². So, c = 13." },
                        { text: "17", isCorrect: false, rationale: "This is the sum of the two legs." },
                        { text: "169", isCorrect: false, rationale: "This is c², not c." },
                        { text: "60", isCorrect: false, rationale: "This is the product of the two legs." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: true,
                    type: "knowledge",
                    question: "A rectangular field is 100 meters long and 50 meters wide. What is the perimeter of the field?",
                    answerOptions: [
                        { text: "150 m", isCorrect: false, rationale: "This is the sum of one length and one width." },
                        { text: "300 m", isCorrect: true, rationale: "Perimeter = 2 * (length + width) = 2 * (100 + 50) = 2 * 150 = 300 m." },
                        { text: "5000 m", isCorrect: false, rationale: "This is the area of the field." },
                        { text: "2500 m", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_4.png",
                    question: "A cube has an edge length of 3 inches. What is its total surface area?",
                    answerOptions: [
                        { text: "9 in²", isCorrect: false, rationale: "This is the area of one face." },
                        { text: "18 in²", isCorrect: false, rationale: "This is incorrect." },
                        { text: "27 in²", isCorrect: false, rationale: "This is the volume of the cube." },
                        { text: "54 in²", isCorrect: true, rationale: "A cube has 6 identical square faces. The area of one face is 3*3=9 in². The total surface area is 6 * 9 = 54 in²." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the name for a polygon with eight sides?",
                    answerOptions: [
                        { text: "Hexagon", isCorrect: false, rationale: "A hexagon has six sides." },
                        { text: "Heptagon", isCorrect: false, rationale: "A heptagon has seven sides." },
                        { text: "Octagon", isCorrect: true, rationale: "An octagon is a polygon with eight sides." },
                        { text: "Nonagon", isCorrect: false, rationale: "A nonagon has nine sides." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "The circumference of a circle is 18.84 cm. What is its radius? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "3 cm", isCorrect: true, rationale: "C = 2 * π * r. So, 18.84 = 2 * 3.14 * r. 18.84 = 6.28 * r. r = 18.84 / 6.28 = 3 cm." },
                        { text: "6 cm", isCorrect: false, rationale: "This is the diameter." },
                        { text: "9.42 cm", isCorrect: false, rationale: "This is half the circumference." },
                        { text: "28.26 cm", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "Complementary angles are two angles that add up to:",
                    answerOptions: [
                        { text: "45°", isCorrect: false, rationale: "This is incorrect." },
                        { text: "90°", isCorrect: true, rationale: "This is the definition of complementary angles." },
                        { text: "180°", isCorrect: false, rationale: "Angles that add up to 180° are supplementary angles." },
                        { text: "360°", isCorrect: false, rationale: "This is the total degrees in a circle." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: true,
                    type: "knowledge",
                    question: "A pyramid has a square base with sides of 6 meters and a height of 4 meters. What is the volume of the pyramid?",
                    answerOptions: [
                        { text: "24 m³", isCorrect: false, rationale: "This is incorrect." },
                        { text: "36 m³", isCorrect: false, rationale: "This is the area of the base." },
                        { text: "48 m³", isCorrect: true, rationale: "Volume of a pyramid = (1/3) * base_area * height. The base area is 6*6 = 36 m². V = (1/3) * 36 * 4 = 12 * 4 = 48 m³." },
                        { text: "144 m³", isCorrect: false, rationale: "This is the base area times the height, without the 1/3 factor." }
                    ]
                }
            ]
        },
        {
            quizId: "math_geometry_basics_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    calculator: true,
                    type: "knowledge",
                    question: "A rectangular garden is 20 feet long and has a perimeter of 70 feet. What is its width?",
                    answerOptions: [
                        { text: "10 feet", isCorrect: false, rationale: "This is incorrect." },
                        { text: "15 feet", isCorrect: true, rationale: "P = 2l + 2w. 70 = 2(20) + 2w. 70 = 40 + 2w. 30 = 2w. w = 15 feet." },
                        { text: "25 feet", isCorrect: false, rationale: "This is incorrect." },
                        { text: "50 feet", isCorrect: false, rationale: "This is the sum of the perimeter and one length." }
                    ]
                },
                {
                    questionNumber: 2,
                    calculator: true,
                    type: "knowledge",
                    question: "What is the area of a square with a perimeter of 32 cm?",
                    answerOptions: [
                        { text: "8 cm²", isCorrect: false, rationale: "This is the side length." },
                        { text: "32 cm²", isCorrect: false, rationale: "This is the perimeter." },
                        { text: "64 cm²", isCorrect: true, rationale: "First, find the side length: 32 cm / 4 = 8 cm. Then, find the area: 8 cm * 8 cm = 64 cm²." },
                        { text: "256 cm²", isCorrect: false, rationale: "This is 32 * 8." }
                    ]
                },
                {
                    questionNumber: 3,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_2.png",
                    question: "The area of a triangle is 50 square inches. If its height is 10 inches, what is the length of its base?",
                    answerOptions: [
                        { text: "5 inches", isCorrect: false, rationale: "This is incorrect." },
                        { text: "10 inches", isCorrect: true, rationale: "A = (1/2)bh. 50 = (1/2) * b * 10. 50 = 5b. b = 10 inches." },
                        { text: "15 inches", isCorrect: false, rationale: "This is incorrect." },
                        { text: "20 inches", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 4,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_3.png",
                    question: "What is the circumference of a circle with a diameter of 8 cm? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "12.56 cm", isCorrect: false, rationale: "This is the circumference of a circle with a radius of 2." },
                        { text: "25.12 cm", isCorrect: true, rationale: "C = π * d. C = 3.14 * 8 = 25.12 cm." },
                        { text: "50.24 cm", isCorrect: false, rationale: "This is the area of this circle." },
                        { text: "200.96 cm", isCorrect: false, rationale: "This is the area of a circle with a radius of 8." }
                    ]
                },
                {
                    questionNumber: 5,
                    calculator: true,
                    type: "knowledge",
                    question: "A circular rug has an area of 28.26 square feet. What is its radius? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "3 feet", isCorrect: true, rationale: "A = π * r². 28.26 = 3.14 * r². r² = 28.26 / 3.14 = 9. r = 3 feet." },
                        { text: "4.5 feet", isCorrect: false, rationale: "This is incorrect." },
                        { text: "6 feet", isCorrect: false, rationale: "This would be the diameter." },
                        { text: "9 feet", isCorrect: false, rationale: "This is the value of r²." }
                    ]
                },
                {
                    questionNumber: 6,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_4.png",
                    question: "A fish tank in the shape of a rectangular prism is 30 inches long, 12 inches wide, and 16 inches high. How much water can it hold in cubic inches?",
                    answerOptions: [
                        { text: "58 in³", isCorrect: false, rationale: "This is the sum of the dimensions." },
                        { text: "480 in³", isCorrect: false, rationale: "This is incorrect." },
                        { text: "5760 in³", isCorrect: true, rationale: "Volume = length * width * height = 30 * 12 * 16 = 5760 in³." },
                        { text: "2208 in³", isCorrect: false, rationale: "This is the surface area." }
                    ]
                },
                {
                    questionNumber: 7,
                    calculator: false,
                    type: "knowledge",
                    question: "A right triangle has one angle that measures 35°. What is the measure of the other acute angle?",
                    answerOptions: [
                        { text: "45°", isCorrect: false, rationale: "This is incorrect." },
                        { text: "55°", isCorrect: true, rationale: "A right triangle has one 90° angle. The sum of the other two must be 90°. So, 90° - 35° = 55°." },
                        { text: "65°", isCorrect: false, rationale: "This is incorrect." },
                        { text: "145°", isCorrect: false, rationale: "This is the sum of 90 and 55." }
                    ]
                },
                {
                    questionNumber: 8,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_5.png",
                    question: "What is the surface area of a cylinder with a radius of 2 meters and a height of 5 meters? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "62.8 m²", isCorrect: false, rationale: "This is only the lateral surface area (the area of the side)." },
                        { text: "75.36 m²", isCorrect: false, rationale: "This is incorrect." },
                        { text: "87.92 m²", isCorrect: true, rationale: "Surface Area = 2πrh + 2πr². SA = 2(3.14)(2)(5) + 2(3.14)(2)². SA = 62.8 + 25.12 = 87.92 m²." },
                        { text: "125.6 m²", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 9,
                    calculator: true,
                    type: "image",
                    imageUrl: "Images/math_geo_6.png",
                    question: "A right triangle has one leg of 8 cm and a hypotenuse of 10 cm. What is the length of the other leg?",
                    answerOptions: [
                        { text: "2 cm", isCorrect: false, rationale: "This is the difference between 10 and 8." },
                        { text: "6 cm", isCorrect: true, rationale: "a² + b² = c². 8² + b² = 10². 64 + b² = 100. b² = 36. b = 6 cm." },
                        { text: "12.8 cm", isCorrect: false, rationale: "This is incorrect." },
                        { text: "18 cm", isCorrect: false, rationale: "This is the sum of 10 and 8." }
                    ]
                },
                {
                    questionNumber: 10,
                    calculator: false,
                    type: "knowledge",
                    question: "Two angles are supplementary. If one angle measures 110°, what is the measure of the other angle?",
                    answerOptions: [
                        { text: "20°", isCorrect: false, rationale: "This is incorrect." },
                        { text: "70°", isCorrect: true, rationale: "Supplementary angles add up to 180°. 180° - 110° = 70°." },
                        { text: "90°", isCorrect: false, rationale: "This is a right angle." },
                        { text: "250°", isCorrect: false, rationale: "This is the sum of 360 and -110." }
                    ]
                },
                {
                    questionNumber: 11,
                    calculator: true,
                    type: "knowledge",
                    question: "A box in the shape of a cube has a volume of 64 cubic inches. What is the length of one edge?",
                    answerOptions: [
                        { text: "4 inches", isCorrect: true, rationale: "The volume of a cube is edge³. The cube root of 64 is 4, because 4*4*4=64." },
                        { text: "6 inches", isCorrect: false, rationale: "This is incorrect." },
                        { text: "8 inches", isCorrect: false, rationale: "This is the square root of 64." },
                        { text: "16 inches", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    calculator: false,
                    type: "knowledge",
                    question: "A triangle with no equal sides is called:",
                    answerOptions: [
                        { text: "Equilateral", isCorrect: false, rationale: "An equilateral triangle has all three sides equal." },
                        { text: "Isosceles", isCorrect: false, rationale: "An isosceles triangle has two equal sides." },
                        { text: "Scalene", isCorrect: true, rationale: "This is the definition of a scalene triangle." },
                        { text: "Right", isCorrect: false, rationale: "A right triangle has one right angle." }
                    ]
                },
                {
                    questionNumber: 13,
                    calculator: true,
                    type: "knowledge",
                    question: "A circular garden has a circumference of 47.1 feet. What is its diameter? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "7.5 feet", isCorrect: false, rationale: "This is the radius." },
                        { text: "15 feet", isCorrect: true, rationale: "C = π * d. 47.1 = 3.14 * d. d = 47.1 / 3.14 = 15 feet." },
                        { text: "20 feet", isCorrect: false, rationale: "This is incorrect." },
                        { text: "22.5 feet", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 14,
                    calculator: false,
                    type: "knowledge",
                    question: "What is the sum of the interior angles of any quadrilateral?",
                    answerOptions: [
                        { text: "90°", isCorrect: false, rationale: "This is the measure of one angle in a square." },
                        { text: "180°", isCorrect: false, rationale: "This is the sum of angles in a triangle." },
                        { text: "360°", isCorrect: true, rationale: "Any quadrilateral can be divided into two triangles, and the sum of angles in each is 180°. So, 2 * 180 = 360°." },
                        { text: "540°", isCorrect: false, rationale: "This is the sum of angles in a pentagon." }
                    ]
                },
                {
                    questionNumber: 15,
                    calculator: true,
                    type: "knowledge",
                    question: "A soup can is a cylinder with a radius of 1.5 inches and a height of 4 inches. What is the area of the label that goes around the can (the lateral surface area)? (Use π ≈ 3.14)",
                    answerOptions: [
                        { text: "18.84 in²", isCorrect: false, rationale: "This is incorrect." },
                        { text: "28.26 in²", isCorrect: false, rationale: "This is the volume of the can." },
                        { text: "37.68 in²", isCorrect: true, rationale: "The lateral area is the circumference times the height. A = (2 * π * r) * h = (2 * 3.14 * 1.5) * 4 = 9.42 * 4 = 37.68 in²." },
                        { text: "42.39 in²", isCorrect: false, rationale: "This is the total surface area, including the top and bottom." }
                    ]
                }
            ]
        }
    ]
};
// RLA -> Reading Comprehension -> Informational Texts
AppData.quizzes.rla_informational_texts = {
    id: "rla_informational_texts",
    title: "Informational Texts",
    description: "Reading and understanding non-fiction texts.",
    quizzes: [
        {
            quizId: "rla_informational_texts_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "text",
                    passage: "<p>The giant squid is a mysterious creature of the deep ocean. For centuries, the only evidence of its existence came from sucker--scarred whale carcasses and the occasional tentacle found in the stomach of a sperm whale. The first live giant squid wasn't filmed in its natural habitat until 2004. These animals can grow to enormous sizes, with the largest specimens estimated at 43 feet long. Their eyes are the largest in the animal kingdom, measuring up to 11 inches in diameter, allowing them to see in the dark depths they inhabit.</p>",
                    question: "What is the main idea of the passage?",
                    answerOptions: [
                        { text: "Sperm whales are the primary predators of giant squid.", isCorrect: false, rationale: "While the passage mentions sperm whales, their predatory behavior is not the main focus." },
                        { text: "The giant squid is a large, elusive deep-sea animal that was not observed alive in its habitat until recently.", isCorrect: true, rationale: "This statement accurately summarizes the key points of the passage: the squid's mysterious nature, its large size, and the recent first filming." },
                        { text: "Giant squid have the largest eyes of any animal.", isCorrect: false, rationale: "This is a supporting detail, not the main idea of the entire passage." },
                        { text: "Scientists have known about giant squid for centuries.", isCorrect: false, rationale: "The passage states that for centuries, the only evidence was indirect, highlighting how little was known." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "text",
                    passage: "<p>The giant squid is a mysterious creature of the deep ocean. For centuries, the only evidence of its existence came from sucker-scarred whale carcasses and the occasional tentacle found in the stomach of a sperm whale. The first live giant squid wasn't filmed in its natural habitat until 2004. These animals can grow to enormous sizes, with the largest specimens estimated at 43 feet long. Their eyes are the largest in the animal kingdom, measuring up to 11 inches in diameter, allowing them to see in the dark depths they inhabit.</p>",
                    question: "According to the passage, what was the primary source of evidence for the giant squid's existence before 2004?",
                    answerOptions: [
                        { text: "Fossil records", isCorrect: false, rationale: "The passage does not mention fossils." },
                        { text: "Remains found in and on whales", isCorrect: true, rationale: "The passage explicitly states that evidence came from 'sucker-scarred whale carcasses and the occasional tentacle found in the stomach of a sperm whale.'" },
                        { text: "Ancient myths and legends", isCorrect: false, rationale: "While myths exist, the passage focuses on physical evidence." },
                        { text: "Submarine video footage", isCorrect: false, rationale: "The passage states the first live filming was not until 2004." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>To: All Employees<br>From: Management<br>Date: October 24, 2025<br>Subject: New Recycling Policy<br><br>Effective November 1, a new company-wide recycling policy will be implemented to reduce waste and improve our environmental impact. New, color-coded bins will be placed in all break rooms. Blue bins are for paper and cardboard only. Green bins are for glass and aluminum cans. Please flatten all cardboard boxes before placing them in the bin. All other waste should be placed in the black landfill bins. Your cooperation is essential to the success of this initiative.</p>",
                    question: "What is the primary purpose of this memo?",
                    answerOptions: [
                        { text: "To announce the purchase of new trash bins.", isCorrect: false, rationale: "While new bins are mentioned, they are part of a larger policy, which is the main purpose." },
                        { text: "To inform employees about a new recycling program starting November 1.", isCorrect: true, rationale: "The memo clearly states the effective date and details of the new recycling policy." },
                        { text: "To scold employees for not recycling enough.", isCorrect: false, rationale: "The tone is informative, not scolding." },
                        { text: "To ask for volunteers for an environmental committee.", isCorrect: false, rationale: "The memo asks for cooperation but does not mention a committee or volunteers." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>To: All Employees<br>From: Management<br>Date: October 24, 2025<br>Subject: New Recycling Policy<br><br>Effective November 1, a new company-wide recycling policy will be implemented to reduce waste and improve our environmental impact. New, color-coded bins will be placed in all break rooms. Blue bins are for paper and cardboard only. Green bins are for glass and aluminum cans. Please flatten all cardboard boxes before placing them in the bin. All other waste should be placed in the black landfill bins. Your cooperation is essential to the success of this initiative.</p>",
                    question: "According to the memo, where should an employee dispose of an empty aluminum soda can?",
                    answerOptions: [
                        { text: "In the blue bin", isCorrect: false, rationale: "The blue bin is designated for paper and cardboard." },
                        { text: "In the green bin", isCorrect: true, rationale: "The memo specifies that the green bins are for glass and aluminum cans." },
                        { text: "In the black bin", isCorrect: false, rationale: "The black bin is for non-recyclable landfill waste." },
                        { text: "At their own desk", isCorrect: false, rationale: "The memo states the new bins will be in the break rooms." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "text",
                    passage: "<p>The concept of 'separation of powers' in the U.S. government divides governmental authority among three branches: the legislative, the executive, and the judicial. The legislative branch (Congress) is responsible for making laws. The executive branch (headed by the President) is responsible for enforcing the laws. The judicial branch (the court system) is responsible for interpreting the laws. This system, along with checks and balances, is designed to prevent any one branch from becoming too powerful.</p>",
                    question: "Based on the passage, which branch of government is responsible for making laws?",
                    answerOptions: [
                        { text: "The executive branch", isCorrect: false, rationale: "The passage states the executive branch enforces laws." },
                        { text: "The judicial branch", isCorrect: false, rationale: "The passage states the judicial branch interprets laws." },
                        { text: "The legislative branch", isCorrect: true, rationale: "The passage explicitly says, 'The legislative branch (Congress) is responsible for making laws.'" },
                        { text: "All three branches equally", isCorrect: false, rationale: "The passage describes a clear division of primary responsibilities." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "text",
                    passage: "<p>The concept of 'separation of powers' in the U.S. government divides governmental authority among three branches: the legislative, the executive, and the judicial. The legislative branch (Congress) is responsible for making laws. The executive branch (headed by the President) is responsible for enforcing the laws. The judicial branch (the court system) is responsible for interpreting the laws. This system, along with checks and balances, is designed to prevent any one branch from becoming too powerful.</p>",
                    question: "The author implies that the separation of powers is important because it:",
                    answerOptions: [
                        { text: "makes the government more efficient.", isCorrect: false, rationale: "Efficiency is not mentioned; the focus is on preventing the concentration of power." },
                        { text: "ensures that all laws are fair.", isCorrect: false, rationale: "While a goal of the system, the passage's stated reason is about power distribution." },
                        { text: "prevents the concentration of authority.", isCorrect: true, rationale: "The last sentence states the system is 'designed to prevent any one branch from becoming too powerful.'" },
                        { text: "allows for faster decision-making.", isCorrect: false, rationale: "The system of checks and balances often slows down decision-making intentionally." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>The Hoover Dam, completed in 1936, is a concrete arch-gravity dam in the Black Canyon of the Colorado River, on the border between Nevada and Arizona. It was a monumental feat of engineering, constructed during the Great Depression. The dam's generators provide power for public and private utilities in Nevada, Arizona, and California. It also serves a critical role in controlling floods and providing water for irrigation to surrounding arid lands.</p>",
                    question: "Which of the following is NOT mentioned as a function of the Hoover Dam?",
                    answerOptions: [
                        { text: "Generating hydroelectric power", isCorrect: false, rationale: "The passage states that the dam's generators provide power." },
                        { text: "Controlling floods", isCorrect: false, rationale: "The passage mentions that it serves a 'critical role in controlling floods'." },
                        { text: "Providing a tourist attraction", isCorrect: true, rationale: "While the Hoover Dam is a major tourist attraction, the passage does not mention this function. It focuses on its engineering and utility roles." },
                        { text: "Supplying water for irrigation", isCorrect: false, rationale: "The passage mentions its role in 'providing water for irrigation'." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>When preparing for a job interview, it is crucial to research the company beforehand. Understanding the company's mission, products or services, and recent achievements demonstrates genuine interest. You should also be prepared to ask the interviewer thoughtful questions about the role and the company culture. This shows that you are not just looking for any job, but that you are evaluating if the company is a good fit for you as well. Finally, always dress professionally, even if the company has a casual dress code. It is better to be overdressed than underdressed.</p>",
                    question: "What is the author's main argument?",
                    answerOptions: [
                        { text: "The most important part of an interview is dressing professionally.", isCorrect: false, rationale: "This is one piece of advice, but not the main argument." },
                        { text: "Thorough preparation is key to a successful job interview.", isCorrect: true, rationale: "The passage outlines several steps of preparation (research, questions, attire) as being crucial for success." },
                        { text: "Asking questions is the only way to show interest in a company.", isCorrect: false, rationale: "The passage mentions it as one way, along with doing research." },
                        { text: "Job interviews are more for the applicant than the employer.", isCorrect: false, rationale: "The passage suggests it is a two-way evaluation, but does not state it is more for the applicant." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "text",
                    passage: "<p>When preparing for a job interview, it is crucial to research the company beforehand. Understanding the company's mission, products or services, and recent achievements demonstrates genuine interest. You should also be prepared to ask the interviewer thoughtful questions about the role and the company culture. This shows that you are not just looking for any job, but that you are evaluating if the company is a good fit for you as well. Finally, always dress professionally, even if the company has a casual dress code. It is better to be overdressed than underdressed.</p>",
                    question: "The author suggests asking questions during an interview to:",
                    answerOptions: [
                        { text: "prove you know more than the interviewer.", isCorrect: false, rationale: "The purpose is to show thoughtful engagement, not to challenge the interviewer." },
                        { text: "fill awkward silences in the conversation.", isCorrect: false, rationale: "The questions should be thoughtful, not just fillers." },
                        { text: "show you are considering if the company is a good match for you.", isCorrect: true, rationale: "The text says this shows you are 'evaluating if the company is a good fit for you as well.'" },
                        { text: "take control of the interview process.", isCorrect: false, rationale: "The goal is to engage in a two-way conversation, not to take control." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>Photosynthesis is the process by which green plants, algae, and some bacteria use sunlight, water, and carbon dioxide to create their own food in the form of glucose (sugar). During this process, oxygen is released as a byproduct. This is why forests are often called the 'lungs of the planet,' as they play a vital role in producing the oxygen that most living organisms, including humans, need to breathe.</p>",
                    question: "What is the primary role of sunlight in photosynthesis?",
                    answerOptions: [
                        { text: "It provides the carbon needed to create glucose.", isCorrect: false, rationale: "Carbon comes from carbon dioxide." },
                        { text: "It provides the energy to power the chemical reaction.", isCorrect: true, rationale: "Photosynthesis converts light energy into chemical energy stored in glucose." },
                        { text: "It is a byproduct released at the end of the process.", isCorrect: false, rationale: "Oxygen is the byproduct." },
                        { text: "It helps the plant absorb water from the soil.", isCorrect: false, rationale: "Water is absorbed through the roots, a process not directly powered by sunlight." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>Photosynthesis is the process by which green plants, algae, and some bacteria use sunlight, water, and carbon dioxide to create their own food in the form of glucose (sugar). During this process, oxygen is released as a byproduct. This is why forests are often called the 'lungs of the planet,' as they play a vital role in producing the oxygen that most living organisms, including humans, need to breathe.</p>",
                    question: "Why does the author refer to forests as the 'lungs of the planet'?",
                    answerOptions: [
                        { text: "Because trees are shaped like lungs.", isCorrect: false, rationale: "The comparison is functional, not physical." },
                        { text: "Because forests absorb water just as lungs absorb air.", isCorrect: false, rationale: "The comparison is based on the exchange of gases, specifically oxygen." },
                        { text: "Because they produce the oxygen necessary for respiration.", isCorrect: true, rationale: "The passage directly links this phrase to the fact that photosynthesis produces the oxygen that most organisms need to breathe." },
                        { text: "Because they are located in the center of the continents.", isCorrect: false, rationale: "The location is not relevant to the 'lungs' analogy." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "text",
                    passage: "<p>The Great Wall of China is not a single, continuous wall but a series of fortifications built along an east-to-west line across the historical northern borders of China. Construction began as early as the 7th century BC, but the most famous and well-preserved sections were built during the Ming Dynasty (1368–1644). The primary purpose of the wall was to protect Chinese states and empires against raids and invasions from nomadic groups of the Eurasian Steppe. Besides defense, other purposes have included border control, allowing the imposition of duties on silk road trade, and regulation of immigration and emigration.</p>",
                    question: "According to the passage, the most well-known sections of the Great Wall were built during which period?",
                    answerOptions: [
                        { text: "The 7th century BC", isCorrect: false, rationale: "The passage states that construction began then, but the most famous sections were built later." },
                        { text: "The Roman Empire", isCorrect: false, rationale: "The Roman Empire is not mentioned in the passage." },
                        { text: "The Ming Dynasty", isCorrect: true, rationale: "The passage explicitly states, 'the most famous and well-preserved sections were built during the Ming Dynasty'." },
                        { text: "The 20th century", isCorrect: false, rationale: "The construction mentioned in the passage is much older." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>The Great Wall of China is not a single, continuous wall but a series of fortifications built along an east-to-west line across the historical northern borders of China. Construction began as early as the 7th century BC, but the most famous and well-preserved sections were built during the Ming Dynasty (1368–1644). The primary purpose of the wall was to protect Chinese states and empires against raids and invasions from nomadic groups of the Eurasian Steppe. Besides defense, other purposes have included border control, allowing the imposition of duties on silk road trade, and regulation of immigration and emigration.</p>",
                    question: "What was the main reason for building the Great Wall?",
                    answerOptions: [
                        { text: "To create a tourist attraction.", isCorrect: false, rationale: "This was not its original purpose." },
                        { text: "To serve as a major trade route.", isCorrect: false, rationale: "It was used to control trade, not to be the route itself." },
                        { text: "To defend against invasions.", isCorrect: true, rationale: "The text states, 'The primary purpose of the wall was to protect Chinese states and empires against raids and invasions...'" },
                        { text: "To mark the exact border of modern China.", isCorrect: false, rationale: "The wall was built along historical borders, not the borders of modern China." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "text",
                    passage: "<p>A budget is a financial plan for a defined period, often a year or a month. It is a crucial tool for managing income and expenses. Creating a budget involves listing all sources of income and all expenditures, such as rent, utilities, food, and transportation. By tracking where money is going, individuals can identify areas where they can cut back on spending to save for long-term goals, such as buying a house or retirement. A successful budget is one that is realistic and reviewed regularly to adjust for changing circumstances.</p>",
                    question: "What is the first step in creating a budget, according to the passage?",
                    answerOptions: [
                        { text: "Cutting back on spending.", isCorrect: false, rationale: "This is a potential outcome of budgeting, not the first step." },
                        { text: "Saving for long-term goals.", isCorrect: false, rationale: "This is a reason to budget, not the first step." },
                        { text: "Listing all income and expenses.", isCorrect: true, rationale: "The passage says, 'Creating a budget involves listing all sources of income and all expenditures...'" },
                        { text: "Reviewing the budget regularly.", isCorrect: false, rationale: "This is an important step for maintaining a budget, but not the first one." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>A budget is a financial plan for a defined period, often a year or a month. It is a crucial tool for managing income and expenses. Creating a budget involves listing all sources of income and all expenditures, such as rent, utilities, food, and transportation. By tracking where money is going, individuals can identify areas where they can cut back on spending to save for long-term goals, such as buying a house or retirement. A successful budget is one that is realistic and reviewed regularly to adjust for changing circumstances.</p>",
                    question: "The author of the passage would most likely agree that a budget is successful if it is:",
                    answerOptions: [
                        { text: "very strict and never changes.", isCorrect: false, rationale: "The author states a successful budget is 'reviewed regularly to adjust for changing circumstances'." },
                        { text: "only focused on increasing income.", isCorrect: false, rationale: "The passage discusses managing both income and expenses." },
                        { text: "flexible and practical for the individual.", isCorrect: true, rationale: "The passage emphasizes that a successful budget is 'realistic' and can be adjusted, which points to flexibility and practicality." },
                        { text: "created once and then ignored.", isCorrect: false, rationale: "The author specifically advises that a budget should be reviewed regularly." }
                    ]
                }
            ]
        },
        {
            quizId: "rla_informational_texts_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "text",
                    passage: "<p>The discovery of penicillin, one of the world's first antibiotics, was a happy accident. In 1928, Scottish scientist Alexander Fleming returned from a vacation to find that a mold had contaminated one of his petri dishes containing bacteria. He observed that the bacteria were unable to grow in the area surrounding the mold. Fleming identified the mold as Penicillium notatum and hypothesized that it produced a substance that killed bacteria. This discovery paved the way for the development of antibiotics, which have saved countless lives by treating bacterial infections.</p>",
                    question: "What is the central theme of this passage?",
                    answerOptions: [
                        { text: "The life of Alexander Fleming.", isCorrect: false, rationale: "The passage focuses on one specific discovery, not his entire life." },
                        { text: "The dangers of bacterial infections.", isCorrect: false, rationale: "The passage is about the treatment of infections, not the infections themselves." },
                        { text: "The accidental discovery of penicillin had a profound impact on medicine.", isCorrect: true, rationale: "This statement captures the key elements: the accidental nature of the discovery and its life-saving consequences." },
                        { text: "The process of growing bacteria in a lab.", isCorrect: false, rationale: "This is a minor detail, not the central theme." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "text",
                    passage: "<p>The discovery of penicillin, one of the world's first antibiotics, was a happy accident. In 1928, Scottish scientist Alexander Fleming returned from a vacation to find that a mold had contaminated one of his petri dishes containing bacteria. He observed that the bacteria were unable to grow in the area surrounding the mold. Fleming identified the mold as Penicillium notatum and hypothesized that it produced a substance that killed bacteria. This discovery paved the way for the development of antibiotics, which have saved countless lives by treating bacterial infections.</p>",
                    question: "What did Fleming observe in his contaminated petri dish?",
                    answerOptions: [
                        { text: "The bacteria were growing faster than usual.", isCorrect: false, rationale: "The passage states the opposite." },
                        { text: "The mold was changing color.", isCorrect: false, rationale: "The passage does not mention a color change." },
                        { text: "The bacteria did not grow near the mold.", isCorrect: true, rationale: "The passage says he 'observed that the bacteria were unable to grow in the area surrounding the mold.'" },
                        { text: "The dish had been cleaned while he was away.", isCorrect: false, rationale: "The dish was contaminated, not cleaned." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p><strong>Public Service Announcement: Fire Safety</strong><br>Smoke alarms are a critical first line of defense in a house fire. The National Fire Protection Association recommends having a smoke alarm inside each bedroom, outside each sleeping area, and on every level of the home, including the basement. It is also vital to test your smoke alarms every month by pressing the test button. Batteries should be replaced at least once a year, or when the alarm chirps to indicate a low battery. A working smoke alarm can double your chances of surviving a house fire.</p>",
                    question: "What is the main purpose of this announcement?",
                    answerOptions: [
                        { text: "To sell smoke alarms.", isCorrect: false, rationale: "The announcement provides safety advice, not a sales pitch." },
                        { text: "To explain how fires start.", isCorrect: false, rationale: "The focus is on safety and detection, not the causes of fires." },
                        { text: "To provide guidelines for proper smoke alarm installation and maintenance.", isCorrect: true, rationale: "The text gives specific recommendations on where to place alarms, how often to test them, and when to replace batteries." },
                        { text: "To recruit volunteer firefighters.", isCorrect: false, rationale: "There is no mention of recruitment or firefighters." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p><strong>Public Service Announcement: Fire Safety</strong><br>Smoke alarms are a critical first line of defense in a house fire. The National Fire Protection Association recommends having a smoke alarm inside each bedroom, outside each sleeping area, and on every level of the home, including the basement. It is also vital to test your smoke alarms every month by pressing the test button. Batteries should be replaced at least once a year, or when the alarm chirps to indicate a low battery. A working smoke alarm can double your chances of surviving a house fire.</p>",
                    question: "How often should smoke alarm batteries be replaced, according to the announcement?",
                    answerOptions: [
                        { text: "Every month", isCorrect: false, rationale: "The alarms should be tested every month, but batteries replaced less frequently." },
                        { text: "At least once a year", isCorrect: true, rationale: "The text explicitly states, 'Batteries should be replaced at least once a year...'" },
                        { text: "Only when you move into a new home", isCorrect: false, rationale: "The recommendation is for regular, ongoing maintenance." },
                        { text: "Every five years", isCorrect: false, rationale: "This is less frequent than the recommendation." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "text",
                    passage: "<p>The water cycle, or hydrologic cycle, describes the continuous movement of water on, above, and below the surface of the Earth. The cycle has four main stages: evaporation, condensation, precipitation, and collection. Evaporation is the process where the sun's heat turns liquid water into a gas called water vapor. Condensation is when this water vapor cools and turns back into liquid water droplets, forming clouds. Precipitation occurs when these droplets become too heavy and fall back to Earth as rain, snow, or hail. Finally, collection is when the fallen precipitation gathers in rivers, lakes, and oceans.</p>",
                    question: "Which stage of the water cycle involves the formation of clouds?",
                    answerOptions: [
                        { text: "Evaporation", isCorrect: false, rationale: "Evaporation is water turning into vapor, which precedes cloud formation." },
                        { text: "Condensation", isCorrect: true, rationale: "The passage states, 'Condensation is when this water vapor cools and turns back into liquid water droplets, forming clouds.'" },
                        { text: "Precipitation", isCorrect: false, rationale: "Precipitation is water falling from clouds." },
                        { text: "Collection", isCorrect: false, rationale: "Collection is the gathering of water on the Earth's surface." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "text",
                    passage: "<p>The water cycle, or hydrologic cycle, describes the continuous movement of water on, above, and below the surface of the Earth. The cycle has four main stages: evaporation, condensation, precipitation, and collection. Evaporation is the process where the sun's heat turns liquid water into a gas called water vapor. Condensation is when this water vapor cools and turns back into liquid water droplets, forming clouds. Precipitation occurs when these droplets become too heavy and fall back to Earth as rain, snow, or hail. Finally, collection is when the fallen precipitation gathers in rivers, lakes, and oceans.</p>",
                    question: "What is the energy source that drives evaporation?",
                    answerOptions: [
                        { text: "The Earth's core", isCorrect: false, rationale: "The passage attributes this role to the sun." },
                        { text: "Wind", isCorrect: false, rationale: "While wind can affect the rate of evaporation, the sun provides the primary energy." },
                        { text: "The sun's heat", isCorrect: true, rationale: "The passage explicitly says, 'Evaporation is the process where the sun's heat turns liquid water into a gas...'" },
                        { text: "Gravity", isCorrect: false, rationale: "Gravity is the force that causes precipitation to fall." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>Bees are vital to our ecosystem because they are pollinators. As bees travel from flower to flower to collect nectar, they carry pollen on their bodies, transferring it between plants. This process of pollination is essential for many plants, including numerous crops that humans rely on for food, such as almonds, apples, and blueberries. In recent years, bee populations have been declining alarmingly due to factors like habitat loss, pesticide use, and climate change. This decline poses a serious threat to global food security and biodiversity.</p>",
                    question: "According to the passage, why are bees important for humans?",
                    answerOptions: [
                        { text: "They produce honey.", isCorrect: false, rationale: "While bees do produce honey, the passage focuses on their role as pollinators for food crops." },
                        { text: "They are a food source for other animals.", isCorrect: false, rationale: "This is not mentioned in the passage." },
                        { text: "They help produce many of the food crops we eat.", isCorrect: true, rationale: "The passage states that pollination is essential for 'numerous crops that humans rely on for food'." },
                        { text: "They help combat climate change.", isCorrect: false, rationale: "The passage lists climate change as a threat to bees, not something bees combat." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>Bees are vital to our ecosystem because they are pollinators. As bees travel from flower to flower to collect nectar, they carry pollen on their bodies, transferring it between plants. This process of pollination is essential for many plants, including numerous crops that humans rely on for food, such as almonds, apples, and blueberries. In recent years, bee populations have been declining alarmingly due to factors like habitat loss, pesticide use, and climate change. This decline poses a serious threat to global food security and biodiversity.</p>",
                    question: "What is the author's tone in the last sentence of the passage?",
                    answerOptions: [
                        { text: "Optimistic", isCorrect: false, rationale: "The author is expressing concern, not optimism." },
                        { text: "Humorous", isCorrect: false, rationale: "The topic is serious, and the tone is not humorous." },
                        { text: "Concerned", isCorrect: true, rationale: "The phrase 'serious threat' indicates a tone of concern and urgency." },
                        { text: "Neutral", isCorrect: false, rationale: "The author is taking a clear stance on the importance and danger of the situation." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "text",
                    passage: "<p><strong>Instructions: How to Change a Tire</strong><br>1. Park on a level surface and engage the parking brake. 2. Loosen the lug nuts on the flat tire with the lug wrench, but do not remove them completely. 3. Place the jack under the vehicle's frame near the flat tire and raise the car until the tire is off the ground. 4. Remove the lug nuts completely and pull the tire off. 5. Mount the spare tire onto the wheel bolts, replace the lug nuts, and tighten them by hand. 6. Lower the car until the spare tire is touching the ground, then use the wrench to tighten the lug nuts securely. 7. Fully lower the car and remove the jack.</p>",
                    question: "What should be done immediately after raising the car with the jack?",
                    answerOptions: [
                        { text: "Loosen the lug nuts.", isCorrect: false, rationale: "The instructions state to loosen the lug nuts before raising the car." },
                        { text: "Lower the car.", isCorrect: false, rationale: "The car must be raised to change the tire." },
                        { text: "Remove the lug nuts and the tire.", isCorrect: true, rationale: "Step 4, which comes directly after raising the car in step 3, is to 'Remove the lug nuts completely and pull the tire off.'" },
                        { text: "Mount the spare tire.", isCorrect: false, rationale: "The flat tire must be removed before the spare can be mounted." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>The internet has revolutionized the way we access information. Before the widespread availability of the web, research often required a trip to a library and hours spent poring over books, encyclopedias, and journals. Today, a vast repository of human knowledge is accessible instantly via a search engine. However, this convenience comes with a challenge: information overload and the need to critically evaluate sources for accuracy and bias. Unlike the curated collections in a library, the internet contains a mixture of factual content, opinions, and misinformation.</p>",
                    question: "What is the main contrast the author draws between pre-internet research and modern research?",
                    answerOptions: [
                        { text: "Research used to be more expensive.", isCorrect: false, rationale: "The passage does not discuss the cost of research." },
                        { text: "Libraries were the only source of information.", isCorrect: false, rationale: "The passage implies they were a primary source, but not necessarily the only one." },
                        { text: "Modern research is faster but requires more critical evaluation of sources.", isCorrect: true, rationale: "The author highlights the speed of search engines ('instantly') but also the challenge of evaluating sources on the less-curated internet." },
                        { text: "Internet sources are always less reliable than books.", isCorrect: false, rationale: "The author does not make such an absolute claim, but rather points out the need for evaluation." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>The internet has revolutionized the way we access information. Before the widespread availability of the web, research often required a trip to a library and hours spent poring over books, encyclopedias, and journals. Today, a vast repository of human knowledge is accessible instantly via a search engine. However, this convenience comes with a challenge: information overload and the need to critically evaluate sources for accuracy and bias. Unlike the curated collections in a library, the internet contains a mixture of factual content, opinions, and misinformation.</p>",
                    question: "What does the author mean by 'curated collections' in a library?",
                    answerOptions: [
                        { text: "The books are arranged alphabetically.", isCorrect: false, rationale: "While true, 'curated' refers to the selection process, not the arrangement." },
                        { text: "The information has been selected by professionals for reliability and quality.", isCorrect: true, rationale: "Curation involves experts selecting and vetting materials, which contrasts with the unfiltered nature of the internet." },
                        { text: "The library contains only old books.", isCorrect: false, rationale: "Libraries contain both old and new materials." },
                        { text: "The books are available for free.", isCorrect: false, rationale: "'Curated' does not mean free." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "text",
                    passage: "<p>The human heart is a four-chambered muscular organ responsible for pumping blood throughout the body. The two upper chambers are called atria, and the two lower chambers are called ventricles. Deoxygenated blood from the body enters the right atrium, is pumped to the right ventricle, and then sent to the lungs to pick up oxygen. Oxygenated blood returns from the lungs to the left atrium, is pumped to the left ventricle, and then propelled out to the rest of the body through the aorta.</p>",
                    question: "What is the function of the right ventricle?",
                    answerOptions: [
                        { text: "To receive oxygenated blood from the lungs.", isCorrect: false, rationale: "This is the function of the left atrium." },
                        { text: "To pump oxygenated blood to the body.", isCorrect: false, rationale: "This is the function of the left ventricle." },
                        { text: "To receive deoxygenated blood from the body.", isCorrect: false, rationale: "This is the function of the right atrium." },
                        { text: "To pump deoxygenated blood to the lungs.", isCorrect: true, rationale: "The passage states blood flows from the right atrium to the right ventricle and is then 'sent to the lungs to pick up oxygen.'" }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>The human heart is a four-chambered muscular organ responsible for pumping blood throughout the body. The two upper chambers are called atria, and the two lower chambers are called ventricles. Deoxygenated blood from the body enters the right atrium, is pumped to the right ventricle, and then sent to the lungs to pick up oxygen. Oxygenated blood returns from the lungs to the left atrium, is pumped to the left ventricle, and then propelled out to the rest of the body through the aorta.</p>",
                    question: "From where does the left side of the heart receive blood?",
                    answerOptions: [
                        { text: "From the main body systems", isCorrect: false, rationale: "The right side of the heart receives deoxygenated blood from the body." },
                        { text: "From the lungs", isCorrect: true, rationale: "The passage says, 'Oxygenated blood returns from the lungs to the left atrium...'" },
                        { text: "From the right ventricle", isCorrect: false, rationale: "The right ventricle pumps blood to the lungs, not to the left side of the heart." },
                        { text: "From the aorta", isCorrect: false, rationale: "The aorta carries blood away from the left ventricle." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "text",
                    passage: "<p>The Electoral College is the system used in the United States presidential election. When citizens vote, they are not voting directly for the president, but for a slate of 'electors' who are pledged to a particular candidate. Each state is allocated a number of electors equal to its number of Senators (always two) plus its number of Representatives in Congress. To win the presidency, a candidate must secure a majority of the electoral votes, which is currently 270 out of a total of 538.</p>",
                    question: "How is the number of electors for each state determined?",
                    answerOptions: [
                        { text: "It is based solely on the state's population.", isCorrect: false, rationale: "It is based on the number of Representatives (population-based) plus the number of Senators (equal for all states)." },
                        { text: "It is the sum of the state's Senators and Representatives.", isCorrect: true, rationale: "The passage states it is 'equal to its number of Senators (always two) plus its number of Representatives in Congress.'" },
                        { text: "It is a fixed number for every state.", isCorrect: false, rationale: "The number varies from state to state." },
                        { text: "It is determined by the winner of the state's popular vote.", isCorrect: false, rationale: "The popular vote determines which candidate's electors are chosen, not the number of electors." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>The Electoral College is the system used in the United States presidential election. When citizens vote, they are not voting directly for the president, but for a slate of 'electors' who are pledged to a particular candidate. Each state is allocated a number of electors equal to its number of Senators (always two) plus its number of Representatives in Congress. To win the presidency, a candidate must secure a majority of the electoral votes, which is currently 270 out of a total of 538.</p>",
                    question: "What can be inferred from the passage about the U.S. presidential election?",
                    answerOptions: [
                        { text: "The candidate who wins the most individual votes nationwide always wins the presidency.", isCorrect: false, rationale: "The passage describes an indirect system, which implies that winning the nationwide popular vote does not guarantee a win in the Electoral College." },
                        { text: "A candidate could win the presidency without winning the most individual votes.", isCorrect: true, rationale: "Because the system is based on winning states and their electoral votes, it's mathematically possible for a candidate to secure 270 electoral votes while a different candidate gets more individual votes nationwide." },
                        { text: "All states have the same number of electoral votes.", isCorrect: false, rationale: "The number of electors depends on the number of Representatives, which varies by population." },
                        { text: "Citizens vote directly for the president.", isCorrect: false, rationale: "The passage explicitly states that citizens 'are not voting directly for the president'." }
                    ]
                }
            ]
        },
        {
            quizId: "rla_informational_texts_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "text",
                    passage: "<p>The Richter scale, developed in the 1930s, was a groundbreaking tool for measuring the magnitude of earthquakes. However, it had limitations, particularly in accurately measuring the energy released by very large earthquakes. Today, seismologists primarily use the Moment Magnitude Scale (MMS). While the results are often still reported to the public using the familiar 'Richter scale' name, the underlying calculations are based on the more accurate MMS. The MMS is a logarithmic scale, meaning that for each whole number you go up on the scale, the ground motion increases by 10 times and the energy released increases by about 32 times.</p>",
                    question: "What is the main idea of the passage?",
                    answerOptions: [
                        { text: "The Richter scale is the only way to measure earthquakes.", isCorrect: false, rationale: "The passage states it has been largely replaced by the MMS." },
                        { text: "The Moment Magnitude Scale is a more accurate measure for large earthquakes than the Richter scale, though the Richter name is still used publicly.", isCorrect: true, rationale: "This captures the key points: the transition from Richter to the more accurate MMS and the continued public use of the 'Richter' name." },
                        { text: "A magnitude 7 earthquake releases 32 times more energy than a magnitude 6.", isCorrect: false, rationale: "This is a supporting detail explaining how the MMS works, not the main idea." },
                        { text: "Earthquake measurement scales were invented in the 1930s.", isCorrect: false, rationale: "This refers only to the Richter scale, not the modern MMS." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "text",
                    passage: "<p>The Richter scale, developed in the 1930s, was a groundbreaking tool for measuring the magnitude of earthquakes. However, it had limitations, particularly in accurately measuring the energy released by very large earthquakes. Today, seismologists primarily use the Moment Magnitude Scale (MMS). While the results are often still reported to the public using the familiar 'Richter scale' name, the underlying calculations are based on the more accurate MMS. The MMS is a logarithmic scale, meaning that for each whole number you go up on the scale, the ground motion increases by 10 times and the energy released increases by about 32 times.</p>",
                    question: "According to the passage, an increase from magnitude 5.0 to 6.0 on the MMS means the energy released increases by approximately how much?",
                    answerOptions: [
                        { text: "2 times", isCorrect: false, rationale: "This is an incorrect value." },
                        { text: "10 times", isCorrect: false, rationale: "This is the increase in ground motion, not energy released." },
                        { text: "32 times", isCorrect: true, rationale: "The passage states, 'the energy released increases by about 32 times' for each whole number increase." },
                        { text: "100 times", isCorrect: false, rationale: "This is an incorrect value." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p><strong>Memo: On-site Health Clinic Services</strong><br>We are pleased to announce that the on-site health clinic will now offer flu shots to all employees. The clinic is open from 9:00 AM to 4:00 PM, Monday through Thursday. To receive a flu shot, you must schedule an appointment at least 24 hours in advance by using the online portal. Walk-in appointments will not be available. Please bring your employee ID and insurance card to your appointment. The cost of the flu shot is fully covered by our company's wellness program.</p>",
                    question: "What is the primary purpose of this memo?",
                    answerOptions: [
                        { text: "To announce the new hours of the health clinic.", isCorrect: false, rationale: "The memo states the hours but the main purpose is to announce a new service." },
                        { text: "To inform employees about the availability and procedure for getting a flu shot.", isCorrect: true, rationale: "The memo focuses on the new flu shot service, how to schedule it, and what to bring." },
                        { text: "To remind employees to bring their insurance cards to work.", isCorrect: false, rationale: "This is a detail related to the new service, not the main purpose." },
                        { text: "To describe the company's wellness program.", isCorrect: false, rationale: "The wellness program is mentioned, but only in the context of paying for the flu shot." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p><strong>Memo: On-site Health Clinic Services</strong><br>We are pleased to announce that the on-site health clinic will now offer flu shots to all employees. The clinic is open from 9:00 AM to 4:00 PM, Monday through Thursday. To receive a flu shot, you must schedule an appointment at least 24 hours in advance by using the online portal. Walk-in appointments will not be available. Please bring your employee ID and insurance card to your appointment. The cost of the flu shot is fully covered by our company's wellness program.</p>",
                    question: "What must an employee do to get a flu shot?",
                    answerOptions: [
                        { text: "Show up at the clinic on a Friday.", isCorrect: false, rationale: "The clinic is closed on Fridays." },
                        { text: "Pay for the shot when they arrive.", isCorrect: false, rationale: "The memo states the cost is fully covered." },
                        { text: "Schedule an appointment online beforehand.", isCorrect: true, rationale: "The memo clearly says, 'you must schedule an appointment...by using the online portal.'" },
                        { text: "Visit the clinic without an appointment.", isCorrect: false, rationale: "The memo explicitly says, 'Walk-in appointments will not be available.'" }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "text",
                    passage: "<p>Sleep is a vital biological function, yet its exact purposes remain a subject of intense scientific research. One prominent theory is that sleep serves a restorative function, allowing the body and brain to repair themselves. During sleep, the body increases its rate of cell growth and repair, and the brain is believed to flush out toxic metabolic byproducts that accumulate during waking hours. Another theory suggests that sleep is crucial for memory consolidation, the process by which recent learned experiences are transformed into long-term memories.</p>",
                    question: "According to the passage, what is one of the proposed functions of sleep?",
                    answerOptions: [
                        { text: "To increase metabolism", isCorrect: false, rationale: "The passage discusses flushing metabolic byproducts, not increasing metabolism." },
                        { text: "To aid in memory formation", isCorrect: true, rationale: "The passage mentions that sleep is crucial for 'memory consolidation'." },
                        { text: "To decrease cell growth", isCorrect: false, rationale: "The passage states that the rate of cell growth and repair increases during sleep." },
                        { text: "To practice problem-solving", isCorrect: false, rationale: "This is not mentioned in the passage." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "text",
                    passage: "<p>Sleep is a vital biological function, yet its exact purposes remain a subject of intense scientific research. One prominent theory is that sleep serves a restorative function, allowing the body and brain to repair themselves. During sleep, the body increases its rate of cell growth and repair, and the brain is believed to flush out toxic metabolic byproducts that accumulate during waking hours. Another theory suggests that sleep is crucial for memory consolidation, the process by which recent learned experiences are transformed into long-term memories.</p>",
                    question: "The author's use of the phrase 'prominent theory' suggests that the ideas presented are:",
                    answerOptions: [
                        { text: "absolute, proven facts.", isCorrect: false, rationale: "The word 'theory' implies it is a well-supported explanation but not a definitively proven fact." },
                        { text: "unpopular and widely disputed ideas.", isCorrect: false, rationale: "'Prominent' means it is well-known and supported." },
                        { text: "the only possible explanations for sleep.", isCorrect: false, rationale: "The author presents it as 'one prominent theory,' implying there may be others." },
                        { text: "leading and well-regarded explanations.", isCorrect: true, rationale: "A 'prominent theory' is one that is significant and widely accepted in the scientific community, even if still under investigation." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>The Articles of Confederation was the first written constitution of the United States. Ratified in 1781, it created a loose confederation of sovereign states and a weak central government, leaving most of the power with the state governments. The national government under the Articles lacked an executive branch and a national judiciary. It also had no power to tax or regulate commerce, which led to significant economic problems. These weaknesses became increasingly apparent, and they eventually led to the Constitutional Convention of 1787, where the current U.S. Constitution was created to replace the Articles.</p>",
                    question: "What was a major weakness of the government under the Articles of Confederation?",
                    answerOptions: [
                        { text: "It had a powerful executive branch.", isCorrect: false, rationale: "The passage states it 'lacked an executive branch'." },
                        { text: "It could not levy taxes.", isCorrect: true, rationale: "The passage says it 'had no power to tax or regulate commerce, which led to significant economic problems.'" },
                        { text: "It gave too much power to the national government.", isCorrect: false, rationale: "The passage describes a 'weak central government' with 'most of the power with the state governments'." },
                        { text: "It created a strong national court system.", isCorrect: false, rationale: "The passage states it lacked a 'national judiciary'." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>The Articles of Confederation was the first written constitution of the United States. Ratified in 1781, it created a loose confederation of sovereign states and a weak central government, leaving most of the power with the state governments. The national government under the Articles lacked an executive branch and a national judiciary. It also had no power to tax or regulate commerce, which led to significant economic problems. These weaknesses became increasingly apparent, and they eventually led to the Constitutional Convention of 1787, where the current U.S. Constitution was created to replace the Articles.</p>",
                    question: "What can be inferred about the U.S. Constitution that replaced the Articles of Confederation?",
                    answerOptions: [
                        { text: "It further weakened the central government.", isCorrect: false, rationale: "The passage implies the opposite, as the weakness of the central government was the problem." },
                        { text: "It gave more power to the states.", isCorrect: false, rationale: "The goal was to fix the problems caused by states having too much power." },
                        { text: "It was identical to the Articles.", isCorrect: false, rationale: "It was created to 'replace' the Articles due to their weaknesses." },
                        { text: "It created a stronger national government.", isCorrect: true, rationale: "Since the passage details the weaknesses of the 'weak central government' under the Articles, it can be inferred that the replacement Constitution was designed to strengthen it." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "text",
                    passage: "<p>A solar eclipse is a breathtaking celestial event. It occurs when the Moon passes between the Sun and Earth, and the Moon fully or partially blocks the Sun. This casts a shadow onto Earth. There are different types, such as total, partial, and annular eclipses. A total solar eclipse, where the Sun is completely obscured by the Moon, is a rare event for any given location on Earth. It is crucial to never look directly at the Sun during an eclipse without proper eye protection, such as certified eclipse glasses, as direct solar radiation can cause permanent eye damage.</p>",
                    question: "What is the main subject of the passage?",
                    answerOptions: [
                        { text: "The composition of the Moon.", isCorrect: false, rationale: "The passage is not about what the Moon is made of." },
                        { text: "A description of solar eclipses and a warning about eye safety.", isCorrect: true, rationale: "The passage defines what a solar eclipse is, describes different types, and includes a clear safety warning." },
                        { text: "The difference between total and partial eclipses.", isCorrect: false, rationale: "This is a detail, not the main subject." },
                        { text: "The history of eclipse observations.", isCorrect: false, rationale: "The passage does not discuss the history of the subject." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>A solar eclipse is a breathtaking celestial event. It occurs when the Moon passes between the Sun and Earth, and the Moon fully or partially blocks the Sun. This casts a shadow onto Earth. There are different types, such as total, partial, and annular eclipses. A total solar eclipse, where the Sun is completely obscured by the Moon, is a rare event for any given location on Earth. It is crucial to never look directly at the Sun during an eclipse without proper eye protection, such as certified eclipse glasses, as direct solar radiation can cause permanent eye damage.</p>",
                    question: "What causes a solar eclipse?",
                    answerOptions: [
                        { text: "The Earth passing between the Sun and Moon.", isCorrect: false, rationale: "This describes a lunar eclipse." },
                        { text: "The Moon passing between the Sun and Earth.", isCorrect: true, rationale: "The passage clearly states, 'It occurs when the Moon passes between the Sun and Earth...'" },
                        { text: "The Sun moving closer to the Earth.", isCorrect: false, rationale: "This does not cause an eclipse." },
                        { text: "Clouds blocking the Sun's light.", isCorrect: false, rationale: "This is a weather phenomenon, not an eclipse." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>CPR (Cardiopulmonary Resuscitation) is an emergency lifesaving procedure performed when the heart stops beating. Immediate CPR can double or triple the chances of survival after cardiac arrest. The two main components of CPR are chest compressions and rescue breaths. Chest compressions involve pushing hard and fast on the center of the chest to manually pump blood to the brain and other vital organs. Rescue breaths provide oxygen. For untrained bystanders, it is now recommended to perform 'hands-only' CPR, which consists of chest compressions without rescue breaths, until professional help arrives.</p>",
                    question: "What is the main purpose of chest compressions in CPR?",
                    answerOptions: [
                        { text: "To restart the heart with an electrical shock.", isCorrect: false, rationale: "That is the function of a defibrillator, not chest compressions." },
                        { text: "To provide oxygen to the lungs.", isCorrect: false, rationale: "That is the function of rescue breaths." },
                        { text: "To manually circulate blood to vital organs.", isCorrect: true, rationale: "The passage states that compressions 'manually pump blood to the brain and other vital organs.'" },
                        { text: "To clear the person's airway.", isCorrect: false, rationale: "While a clear airway is important, this is not the purpose of the compressions themselves." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "text",
                    passage: "<p>CPR (Cardiopulmonary Resuscitation) is an emergency lifesaving procedure performed when the heart stops beating. Immediate CPR can double or triple the chances of survival after cardiac arrest. The two main components of CPR are chest compressions and rescue breaths. Chest compressions involve pushing hard and fast on the center of the chest to manually pump blood to the brain and other vital organs. Rescue breaths provide oxygen. For untrained bystanders, it is now recommended to perform 'hands-only' CPR, which consists of chest compressions without rescue breaths, until professional help arrives.</p>",
                    question: "What does the passage recommend for an untrained bystander?",
                    answerOptions: [
                        { text: "Do not do anything until a professional arrives.", isCorrect: false, rationale: "The passage recommends performing hands-only CPR." },
                        { text: "Perform chest compressions and rescue breaths.", isCorrect: false, rationale: "This is recommended for trained individuals; the passage suggests hands-only CPR for the untrained." },
                        { text: "Perform only rescue breaths.", isCorrect: false, rationale: "The recommendation is for chest compressions only." },
                        { text: "Perform chest compressions only.", isCorrect: true, rationale: "The passage says, 'it is now recommended to perform 'hands-only' CPR, which consists of chest compressions without rescue breaths'." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>The Dust Bowl was a period of severe dust storms that greatly damaged the ecology and agriculture of the American and Canadian prairies during the 1930s. The phenomenon was caused by a combination of natural and man-made factors. A severe drought was the primary natural cause. However, this was exacerbated by years of extensive farming without crop rotation, fallow fields, or other techniques to prevent wind erosion. The deep plowing of the topsoil had displaced the native, deep-rooted grasses that normally trapped soil and moisture even during periods of drought and high winds.</p>",
                    question: "What was a man-made cause of the Dust Bowl?",
                    answerOptions: [
                        { text: "A severe drought", isCorrect: false, rationale: "The passage identifies the drought as the primary natural cause." },
                        { text: "High winds", isCorrect: false, rationale: "The passage mentions high winds as a condition, but not a man-made cause." },
                        { text: "Farming practices that led to soil erosion", isCorrect: true, rationale: "The passage specifically mentions 'extensive farming without crop rotation...deep plowing...that displaced the native...grasses' as a key cause." },
                        { text: "An increase in native grass populations", isCorrect: false, rationale: "The passage states that the displacement of native grasses was a problem, not an increase." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "text",
                    passage: "<p>The Dust Bowl was a period of severe dust storms that greatly damaged the ecology and agriculture of the American and Canadian prairies during the 1930s. The phenomenon was caused by a combination of natural and man-made factors. A severe drought was the primary natural cause. However, this was exacerbated by years of extensive farming without crop rotation, fallow fields, or other techniques to prevent wind erosion. The deep plowing of the topsoil had displaced the native, deep-rooted grasses that normally trapped soil and moisture even during periods of drought and high winds.</p>",
                    question: "What role did native grasses play before the Dust Bowl?",
                    answerOptions: [
                        { text: "They caused soil erosion.", isCorrect: false, rationale: "The passage states they prevented erosion." },
                        { text: "They were a major cash crop for farmers.", isCorrect: false, rationale: "The passage does not mention them as a cash crop." },
                        { text: "They used up all the moisture in the soil.", isCorrect: false, rationale: "The passage says they helped trap moisture." },
                        { text: "They helped hold the soil in place.", isCorrect: true, rationale: "The passage says the grasses 'normally trapped soil and moisture'." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>Identity theft is a crime where someone wrongfully obtains and uses another person's personal data in some way that involves fraud or deception, typically for economic gain. To protect yourself, experts recommend several strategies. First, create strong, unique passwords for all your online accounts. Second, be cautious about sharing personal information online or over the phone. Third, regularly check your bank and credit card statements for any unauthorized transactions. Finally, shred any physical documents that contain sensitive information before disposing of them.</p>",
                    question: "Which of the following is NOT a recommended strategy for preventing identity theft?",
                    answerOptions: [
                        { text: "Using the same password for all accounts for easy recall.", isCorrect: true, rationale: "This is the opposite of the advice given. The passage recommends 'strong, unique passwords for all your online accounts.'" },
                        { text: "Shredding documents with personal information.", isCorrect: false, rationale: "The passage recommends this as a final point." },
                        { text: "Monitoring bank statements.", isCorrect: false, rationale: "The passage recommends regularly checking statements." },
                        { text: "Being careful about sharing information.", isCorrect: false, rationale: "The passage recommends being cautious about sharing personal information." }
                    ]
                }
            ]
        }
    ]
};
// RLA -> Language & Grammar -> Language, Grammar, and Usage
AppData.quizzes.rla_language_grammar_usage = {
    id: "rla_language_grammar_usage",
    title: "Language, Grammar, and Usage",
    description: "Editing for grammar, usage, and structure in sentences.",
    quizzes: [
        {
            quizId: "rla_language_grammar_usage_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which of the following sentences is grammatically correct?",
                    answerOptions: [
                        { text: "Her and her sister is going to the store.", isCorrect: false, rationale: "The subject pronoun should be 'She' and the verb should be 'are' to agree with the plural subject." },
                        { text: "She and her sister is going to the store.", isCorrect: false, rationale: "The verb should be 'are' to agree with the plural subject 'She and her sister'." },
                        { text: "Her and her sister are going to the store.", isCorrect: false, rationale: "The subject pronoun should be 'She'." },
                        { text: "She and her sister are going to the store.", isCorrect: true, rationale: "This sentence uses the correct subject pronoun ('She') and the correct plural verb ('are')." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    passage: "<p>The team celebrated _______ big victory.</p>",
                    question: "Choose the correct word to complete the sentence.",
                    answerOptions: [
                        { text: "it's", isCorrect: false, rationale: "'It's' is a contraction for 'it is'. The sentence requires a possessive pronoun." },
                        { text: "its", isCorrect: true, rationale: "'Its' is the possessive form of 'it', which is needed here to show the victory belongs to the team." },
                        { text: "its'", isCorrect: false, rationale: "'Its'' is not a word." },
                        { text: "their", isCorrect: false, rationale: "While 'their' is a possessive pronoun, 'team' is a singular collective noun in this context, so 'its' is the more appropriate choice." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    passage: "<p>Neither the students nor the teacher _______ ready for the fire drill.</p>",
                    question: "Which verb form correctly completes the sentence?",
                    answerOptions: [
                        { text: "was", isCorrect: true, rationale: "When subjects are joined by 'neither/nor', the verb agrees with the subject closer to it. In this case, 'teacher' is singular, so the verb is 'was'." },
                        { text: "were", isCorrect: false, rationale: "The verb should agree with the singular subject 'teacher', which is closer to the verb." },
                        { text: "are", isCorrect: false, rationale: "This is the wrong tense and number." },
                        { text: "is", isCorrect: false, rationale: "This is the wrong tense." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "Which sentence uses punctuation correctly?",
                    answerOptions: [
                        { text: "I need to buy eggs milk and bread.", isCorrect: false, rationale: "This sentence is missing commas in a series." },
                        { text: "I need to buy eggs, milk, and bread.", isCorrect: true, rationale: "This sentence correctly uses commas to separate items in a list. The comma before 'and' is the Oxford comma, which is standard in formal writing." },
                        { text: "I need to buy, eggs, milk, and bread.", isCorrect: false, rationale: "There should not be a comma after 'buy'." },
                        { text: "I need to buy eggs, milk and, bread.", isCorrect: false, rationale: "The comma before 'bread' is misplaced." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    passage: "<p>The new policy will _______ everyone in the office.</p>",
                    question: "Choose the correct word to complete the sentence.",
                    answerOptions: [
                        { text: "affect", isCorrect: true, rationale: "'Affect' is a verb meaning 'to influence or have an impact on'. The policy will influence everyone." },
                        { text: "effect", isCorrect: false, rationale: "'Effect' is a noun meaning 'a result or consequence'. While the policy will have an effect, the verb needed here is 'affect'." },
                        { text: "affects", isCorrect: false, rationale: "The subject 'policy' is singular, but since it is paired with 'will', the base form of the verb is required." },
                        { text: "effects", isCorrect: false, rationale: "This is the plural noun form." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Which of the following is a sentence fragment?",
                    answerOptions: [
                        { text: "She went to the library.", isCorrect: false, rationale: "This is a complete sentence with a subject and a verb." },
                        { text: "Because it was raining outside.", isCorrect: true, rationale: "This is a dependent clause. It has a subject and a verb, but it doesn't express a complete thought on its own." },
                        { text: "The game was postponed.", isCorrect: false, rationale: "This is a complete sentence." },
                        { text: "Wait for me.", isCorrect: false, rationale: "This is a complete sentence (an imperative, where the subject 'you' is understood)." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    passage: "<p>John said he felt _______ after the long hike.</p>",
                    question: "Which word correctly completes the sentence?",
                    answerOptions: [
                        { text: "good", isCorrect: false, rationale: "'Good' is an adjective, but when following a linking verb like 'felt', the adverb 'well' is often preferred to describe health." },
                        { text: "well", isCorrect: true, rationale: "'Well' is an adverb that can also function as an adjective meaning 'in good health'. It correctly describes how John felt." },
                        { text: "badly", isCorrect: false, rationale: "This would imply he is bad at the act of feeling, which is not the intended meaning." },
                        { text: "more good", isCorrect: false, rationale: "This is grammatically incorrect." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge, passage",
                    passage: "<p>The manager, along with the two assistants, _______ planning the event.</p>",
                    question: "Choose the correct verb.",
                    answerOptions: [
                        { text: "are", isCorrect: false, rationale: "The phrase 'along with the two assistants' is an interrupting phrase. The subject is 'manager', which is singular." },
                        { text: "were", isCorrect: false, rationale: "This is a plural, past-tense verb." },
                        { text: "is", isCorrect: true, rationale: "The subject of the sentence is 'The manager', which is singular. The interrupting phrase 'along with the two assistants' does not change the number of the subject." },
                        { text: "have been", isCorrect: false, rationale: "This is a plural verb form." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Which sentence contains a run-on sentence?",
                    answerOptions: [
                        { text: "I like to read, but my brother prefers to watch movies.", isCorrect: false, rationale: "This sentence correctly joins two independent clauses with a comma and a coordinating conjunction." },
                        { text: "The sun is shining it is a beautiful day.", isCorrect: true, rationale: "This is a comma splice, a type of run-on sentence. It joins two independent clauses with only a comma, which is incorrect. It needs a period, semicolon, or a coordinating conjunction." },
                        { text: "Although it was late, we decided to go for a walk.", isCorrect: false, rationale: "This sentence correctly uses a dependent clause followed by an independent clause." },
                        { text: "Let's eat grandma.", isCorrect: false, rationale: "This sentence, while humorously ambiguous without a comma, is not a run-on sentence. 'Let's eat, Grandma.' would be the correct punctuation to avoid the ambiguity." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    passage: "<p>This is the person _______ I was telling you about.</p>",
                    question: "Which word best completes the sentence?",
                    answerOptions: [
                        { text: "who", isCorrect: false, rationale: "'Who' is a subject pronoun. The pronoun in this sentence is the object of the preposition 'about'." },
                        { text: "whom", isCorrect: true, rationale: "'Whom' is an object pronoun. Here, it is the object of the preposition 'about' (about whom)." },
                        { text: "which", isCorrect: false, rationale: "'Which' is used to refer to things, not people." },
                        { text: "that", isCorrect: false, rationale: "While 'that' is often used informally in this context, 'whom' is the grammatically correct choice in formal writing." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "Which sentence demonstrates the correct use of an apostrophe?",
                    answerOptions: [
                        { text: "The dog wagged it's tail.", isCorrect: false, rationale: "It's is a contraction for 'it is'. The possessive form is 'its'." },
                        { text: "The students books were on the table.", isCorrect: false, rationale: "To show plural possession, the apostrophe should come after the 's' (students')." },
                        { text: "Charles's cat is very friendly.", isCorrect: true, rationale: "For singular nouns ending in 's', it is standard to add an apostrophe and another 's' to show possession." },
                        { text: "The car's are parked in the garage.", isCorrect: false, rationale: "Apostrophes are not used to make nouns plural." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    passage: "<p>If I _______ you, I would take the job offer.</p>",
                    question: "Choose the correct verb form to complete the sentence.",
                    answerOptions: [
                        { text: "was", isCorrect: false, rationale: "In a hypothetical or contrary-to-fact situation (the subjunctive mood), 'were' is used with 'I'." },
                        { text: "am", isCorrect: false, rationale: "This is the present tense, not the subjunctive mood needed for a hypothetical." },
                        { text: "were", isCorrect: true, rationale: "This sentence expresses a hypothetical situation (I am not you), so it requires the subjunctive mood. The correct form is 'were'." },
                        { text: "be", isCorrect: false, rationale: "This is an incorrect verb form for this context." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Which of these sentences is in the passive voice?",
                    answerOptions: [
                        { text: "The chef prepared a delicious meal.", isCorrect: false, rationale: "This is in the active voice; the subject (chef) performs the action." },
                        { text: "A delicious meal was prepared by the chef.", isCorrect: true, rationale: "This is in the passive voice; the subject (meal) receives the action. The doer of the action (chef) is in a prepositional phrase." },
                        { text: "The meal tasted delicious.", isCorrect: false, rationale: "This uses a linking verb and is in the active voice." },
                        { text: "The chef's meal was delicious.", isCorrect: false, rationale: "This uses a linking verb and is in the active voice." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    passage: "<p>The number of students in the class _______ decreasing.</p>",
                    question: "Choose the correct verb form.",
                    answerOptions: [
                        { text: "is", isCorrect: true, rationale: "The subject of the sentence is 'The number', which is singular. Therefore, the singular verb 'is' is required." },
                        { text: "are", isCorrect: false, rationale: "The word 'students' is the object of the preposition 'of', not the subject. The verb must agree with 'number'." },
                        { text: "were", isCorrect: false, rationale: "This verb is plural and past tense." },
                        { text: "have been", isCorrect: false, rationale: "This verb is plural." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Which sentence uses 'fewer' and 'less' correctly?",
                    answerOptions: [
                        { text: "There are less cars on the road today.", isCorrect: false, rationale: "'Cars' is a countable noun, so 'fewer' should be used." },
                        { text: "I have fewer money than you.", isCorrect: false, rationale: "'Money' is an uncountable noun, so 'less' should be used." },
                        { text: "Please put fewer sugar in my coffee.", isCorrect: false, rationale: "'Sugar' is an uncountable noun, so 'less' should be used." },
                        { text: "There are fewer than 10 items in the express lane.", isCorrect: true, rationale: "'Fewer' is used for countable nouns (items), which is correct in this context." }
                    ]
                }
            ]
        },
        {
            quizId: "rla_language_grammar_usage_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which of the following is a complete sentence?",
                    answerOptions: [
                        { text: "Running through the park on a sunny day.", isCorrect: false, rationale: "This is a participial phrase, not a complete sentence. It lacks a subject performing the action." },
                        { text: "The dog barked loudly at the mailman.", isCorrect: true, rationale: "This sentence has a subject (The dog) and a verb (barked) and expresses a complete thought." },
                        { text: "After the movie was over.", isCorrect: false, rationale: "This is a dependent clause and does not express a complete thought on its own." },
                        { text: "A box of old books and magazines.", isCorrect: false, rationale: "This is a noun phrase; it lacks a verb." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    passage: "<p>The two companies decided to merge _______ resources.</p>",
                    question: "Choose the correct word to complete the sentence.",
                    answerOptions: [
                        { text: "there", isCorrect: false, rationale: "'There' refers to a place." },
                        { text: "they're", isCorrect: false, rationale: "'They're' is a contraction for 'they are'." },
                        { text: "their", isCorrect: true, rationale: "'Their' is a possessive pronoun indicating that the resources belong to the two companies." },
                        { text: "thier", isCorrect: false, rationale: "This is a common misspelling of 'their'." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    passage: "<p>Each of the players _______ a unique skill set.</p>",
                    question: "Which verb form correctly completes the sentence?",
                    answerOptions: [
                        { text: "have", isCorrect: false, rationale: "The subject 'Each' is singular, so the verb must also be singular." },
                        { text: "has", isCorrect: true, rationale: "The subject of the sentence is 'Each', which is a singular pronoun. Therefore, the singular verb 'has' is correct." },
                        { text: "are having", isCorrect: false, rationale: "This is a plural verb form." },
                        { text: "have had", isCorrect: false, rationale: "This is a plural verb form." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "Which sentence is punctuated correctly?",
                    answerOptions: [
                        { text: "The painting a beautiful landscape was sold for a high price.", isCorrect: false, rationale: "The non-essential phrase 'a beautiful landscape' should be set off by commas." },
                        { text: "The painting, a beautiful landscape, was sold for a high price.", isCorrect: true, rationale: "The appositive phrase 'a beautiful landscape' is correctly set off by commas because it provides extra, non-essential information about the painting." },
                        { text: "The painting a beautiful landscape, was sold for a high price.", isCorrect: false, rationale: "A comma is missing before the appositive phrase." },
                        { text: "The painting, a beautiful landscape was sold for a high price.", isCorrect: false, rationale: "A comma is missing after the appositive phrase." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    passage: "<p>I would like to _______ the speaker for her insightful presentation.</p>",
                    question: "Choose the correct word to complete the sentence.",
                    answerOptions: [
                        { text: "compliment", isCorrect: true, rationale: "'Compliment' is a verb meaning 'to praise or express admiration for'." },
                        { text: "complement", isCorrect: false, rationale: "'Complement' is a verb meaning 'to complete or go well with'." },
                        { text: "complimint", isCorrect: false, rationale: "This is a misspelling." },
                        { text: "complemient", isCorrect: false, rationale: "This is a misspelling." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Identify the type of error in the following sentence: 'I went to the store I bought milk.'",
                    answerOptions: [
                        { text: "Sentence fragment", isCorrect: false, rationale: "The sentence contains two complete thoughts, not an incomplete one." },
                        { text: "Comma splice", isCorrect: false, rationale: "A comma splice incorrectly joins two sentences with a comma. This sentence has no punctuation between them." },
                        { text: "Run-on sentence (fused sentence)", isCorrect: true, rationale: "This is a fused sentence, a type of run-on, where two independent clauses are joined with no punctuation or conjunction." },
                        { text: "Misplaced modifier", isCorrect: false, rationale: "There are no misplaced modifiers in the sentence." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    passage: "<p>The committee will present _______ findings at the next meeting.</p>",
                    question: "Which word correctly completes the sentence?",
                    answerOptions: [
                        { text: "it's", isCorrect: false, rationale: "'It's' means 'it is'." },
                        { text: "its", isCorrect: true, rationale: "'Committee' is a singular collective noun, so the singular possessive pronoun 'its' is correct." },
                        { text: "their", isCorrect: false, rationale: "While often used in informal speech, 'its' is the grammatically correct choice for a singular collective noun like 'committee'." },
                        { text: "there", isCorrect: false, rationale: "'There' is a place or is used to start a sentence." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "Which sentence uses commas correctly?",
                    answerOptions: [
                        { text: "After a long, and tiring day we finally went home.", isCorrect: false, rationale: "A comma is not needed after 'long' if 'and' is present. Also, a comma is needed after 'day'." },
                        { text: "After a long, tiring day, we finally went home.", isCorrect: true, rationale: "A comma is used to separate coordinate adjectives ('long, tiring'), and another comma is used to separate the introductory phrase ('After a long, tiring day') from the main clause." },
                        { text: "After a long tiring day, we finally went home.", isCorrect: false, rationale: "A comma is needed between the coordinate adjectives 'long' and 'tiring'." },
                        { text: "After a long, tiring day we finally went home.", isCorrect: false, rationale: "A comma is needed after the introductory phrase." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    passage: "<p>The prize was given to _______ finished the race first.</p>",
                    question: "Choose the correct word to complete the sentence.",
                    answerOptions: [
                        { text: "whoever", isCorrect: true, rationale: "'Whoever' is the subject of the verb 'finished'. The entire clause 'whoever finished the race first' is the object of the preposition 'to'." },
                        { text: "whomever", isCorrect: false, rationale: "'Whomever' is an object pronoun and cannot be the subject of the verb 'finished'." },
                        { text: "who", isCorrect: false, rationale: "'Whoever' is needed to mean 'the person who'." },
                        { text: "whom", isCorrect: false, rationale: "This is an object pronoun and cannot be the subject of 'finished'." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "Which sentence is written in the active voice?",
                    answerOptions: [
                        { text: "The ball was thrown by the quarterback.", isCorrect: false, rationale: "This is passive voice. The subject (ball) receives the action." },
                        { text: "The window was broken by the storm.", isCorrect: false, rationale: "This is passive voice. The subject (window) receives the action." },
                        { text: "The student wrote an excellent essay.", isCorrect: true, rationale: "This is active voice. The subject (student) performs the action (wrote)." },
                        { text: "Mistakes were made.", isCorrect: false, rationale: "This is a classic example of passive voice, where the doer of the action is not named." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "Which sentence correctly uses a semicolon?",
                    answerOptions: [
                        { text: "I have a big test tomorrow; I can't go out tonight.", isCorrect: true, rationale: "A semicolon is used correctly here to join two closely related independent clauses." },
                        { text: "I like; apples, oranges, and bananas.", isCorrect: false, rationale: "A semicolon should not be used to introduce a list." },
                        { text: "Although I was tired; I finished my homework.", isCorrect: false, rationale: "A comma, not a semicolon, should separate a dependent clause from an independent clause." },
                        { text: "The ingredients are; flour, sugar, and eggs.", isCorrect: false, rationale: "A colon, not a semicolon, should be used to introduce this list." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    passage: "<p>Everyone on the team _______ excited about the championship game.</p>",
                    question: "Choose the correct verb.",
                    answerOptions: [
                        { text: "are", isCorrect: false, rationale: "The subject 'Everyone' is a singular pronoun." },
                        { text: "were", isCorrect: false, rationale: "This is a plural, past-tense verb." },
                        { text: "is", isCorrect: true, rationale: "Indefinite pronouns like 'everyone', 'everybody', and 'each' are singular and take a singular verb." },
                        { text: "feel", isCorrect: false, rationale: "This is a plural verb form." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Which sentence uses 'who's' and 'whose' correctly?",
                    answerOptions: [
                        { text: "Who's car is parked illegally?", isCorrect: false, rationale: "'Who's' means 'who is'. The sentence requires the possessive pronoun 'whose'." },
                        { text: "I don't know whose going to the party.", isCorrect: false, rationale: "'Whose' is possessive. The sentence requires the contraction 'who's' (who is)." },
                        { text: "Whose the new manager?", isCorrect: false, rationale: "'Whose' is possessive. The sentence requires the contraction 'who's' (who is)." },
                        { text: "Who's responsible for this, and whose jacket is this?", isCorrect: true, rationale: "This sentence correctly uses 'Who's' as a contraction for 'who is' and 'whose' as a possessive pronoun." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    passage: "<p>The dog, wagging _______ tail, waited for a treat.</p>",
                    question: "Which word correctly completes the sentence?",
                    answerOptions: [
                        { text: "it's", isCorrect: false, rationale: "it's = it is" },
                        { text: "its'", isCorrect: false, rationale: "Not a word." },
                        { text: "its", isCorrect: true, rationale: "The possessive pronoun for 'it' is 'its'." },
                        { text: "their", isCorrect: false, rationale: "The dog is singular, so 'its' is the correct pronoun." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Which of the following contains a misplaced modifier?",
                    answerOptions: [
                        { text: "We saw a flock of geese flying south for the winter.", isCorrect: false, rationale: "The modifier 'flying south for the winter' correctly describes the geese." },
                        { text: "Covered in mud, the pig happily rolled in the pen.", isCorrect: false, rationale: "The modifier 'Covered in mud' correctly describes the pig." },
                        { text: "I bought a car from a local dealer with a leather interior.", isCorrect: true, rationale: "This sentence is ambiguous. Does the dealer have a leather interior? The modifier 'with a leather interior' is misplaced. It should be: 'I bought a car with a leather interior from a local dealer.'" },
                        { text: "Hungry and tired, I decided to order a pizza.", isCorrect: false, rationale: "The modifier 'Hungry and tired' correctly describes 'I'." }
                    ]
                }
            ]
        },
        {
            quizId: "rla_language_grammar_usage_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which sentence is grammatically correct?",
                    answerOptions: [
                        { text: "Me and him are on the same team.", isCorrect: false, rationale: "Object pronouns ('me', 'him') cannot be used as subjects. The correct subject pronouns are 'He' and 'I'." },
                        { text: "Him and I are on the same team.", isCorrect: false, rationale: "'Him' is an object pronoun." },
                        { text: "He and I are on the same team.", isCorrect: true, rationale: "This sentence correctly uses the subject pronouns 'He' and 'I'." },
                        { text: "Me and he are on the same team.", isCorrect: false, rationale: "'Me' is an object pronoun." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    passage: "<p>Please put the book back on _______ shelf.</p>",
                    question: "Choose the correct word to complete the sentence.",
                    answerOptions: [
                        { text: "it's", isCorrect: false, rationale: "Contraction for 'it is'." },
                        { text: "its'", isCorrect: false, rationale: "Not a standard word." },
                        { text: "its", isCorrect: true, rationale: "'Its' is the possessive pronoun needed to show the shelf belongs to 'it' (the book or bookcase)." },
                        { text: "their", isCorrect: false, rationale: "'Their' is plural, but the sentence refers to a single book." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    passage: "<p>The data _______ that the new strategy is working.</p>",
                    question: "Which verb form correctly completes the sentence?",
                    answerOptions: [
                        { text: "show", isCorrect: true, rationale: "The word 'data' is the plural form of 'datum' and therefore takes the plural verb 'show' in formal writing." },
                        { text: "shows", isCorrect: false, rationale: "While 'data' is often treated as singular in informal speech, in formal grammar it is plural." },
                        { text: "is showing", isCorrect: false, rationale: "This uses a singular verb form ('is')." },
                        { text: "has shown", isCorrect: false, rationale: "This uses a singular verb form ('has')." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "Which sentence uses the apostrophe correctly?",
                    answerOptions: [
                        { text: "The childrens toys are all over the floor.", isCorrect: false, rationale: "'Children' is a plural noun. The possessive form is 'children's'." },
                        { text: "The children's toys are all over the floor.", isCorrect: true, rationale: "For a plural noun that does not end in 's', the possessive is formed by adding 's." },
                        { text: "The childrens' toys are all over the floor.", isCorrect: false, rationale: "The apostrophe is misplaced for the plural noun 'children'." },
                        { text: "The children's toy's are all over the floor.", isCorrect: false, rationale: "An apostrophe should not be used to make 'toys' plural." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    passage: "<p>We have _______ time for questions at the end of the presentation.</p>",
                    question: "Choose the correct word to complete the sentence.",
                    answerOptions: [
                        { text: "fewer", isCorrect: false, rationale: "'Fewer' is used for countable nouns (e.g., fewer questions)." },
                        { text: "less", isCorrect: true, rationale: "'Less' is used for uncountable nouns like 'time'." },
                        { text: "more less", isCorrect: false, rationale: "This is grammatically incorrect." },
                        { text: "lesser", isCorrect: false, rationale: "'Lesser' is an adjective meaning 'not so great or important as the other'." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Which of the following is NOT a complete sentence?",
                    answerOptions: [
                        { text: "Stop!", isCorrect: false, rationale: "This is a command (imperative sentence) with the understood subject 'you'." },
                        { text: "The birds were singing.", isCorrect: false, rationale: "This has a subject and a verb and is a complete thought." },
                        { text: "While walking the dog.", isCorrect: true, rationale: "This is a prepositional phrase followed by a gerund. It lacks a subject and a main verb, making it a fragment." },
                        { text: "It is cold outside.", isCorrect: false, rationale: "This is a complete sentence." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    passage: "<p>The argument was between Sarah and _______.</p>",
                    question: "Which pronoun correctly completes the sentence?",
                    answerOptions: [
                        { text: "I", isCorrect: false, rationale: "'I' is a subject pronoun. The pronoun here is the object of the preposition 'between'." },
                        { text: "me", isCorrect: true, rationale: "Pronouns that are objects of a preposition (like 'between') must be in the objective case. 'Me' is the correct object pronoun." },
                        { text: "myself", isCorrect: false, rationale: "'Myself' is a reflexive pronoun and should only be used when the subject is 'I'." },
                        { text: "she", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    passage: "<p>The report concluded that the new software was faster _______ more reliable than the old version.</p>",
                    question: "Choose the correct word.",
                    answerOptions: [
                        { text: "then", isCorrect: false, rationale: "'Then' is an adverb used to indicate time or sequence." },
                        { text: "than", isCorrect: true, rationale: "'Than' is a conjunction used to make comparisons, which is what the sentence is doing." },
                        { text: "that", isCorrect: false, rationale: "'That' is not the correct word for making a comparison." },
                        { text: "as", isCorrect: false, rationale: "'As' is used for comparisons of equality (as fast as), not inequality (faster than)." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Which sentence has a subject-verb agreement error?",
                    answerOptions: [
                        { text: "The cats are sleeping on the porch.", isCorrect: false, rationale: "The plural subject 'cats' agrees with the plural verb 'are'." },
                        { text: "My friend and I go to the same school.", isCorrect: false, rationale: "The compound subject 'My friend and I' is plural and agrees with the plural verb 'go'." },
                        { text: "The list of names are on the desk.", isCorrect: true, rationale: "The subject of the sentence is 'list', which is singular. The verb should be 'is' to agree with 'list'. 'Of names' is a prepositional phrase." },
                        { text: "There is a problem with the engine.", isCorrect: false, rationale: "The subject 'problem' is singular and agrees with the verb 'is'." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "Which sentence uses quotation marks correctly?",
                    answerOptions: [
                        { text: "She said, \"I'll be there soon.\"", isCorrect: true, rationale: "This sentence correctly places a comma before the quote and the period inside the closing quotation mark." },
                        { text: "She said \"I'll be there soon\".", isCorrect: false, rationale: "A comma is needed after 'said', and the period should be inside the quotation marks." },
                        { text: "\"I'll be there soon\", she said.", isCorrect: false, rationale: "The comma should be inside the quotation marks." },
                        { text: "She said, \"I'll be there soon\"!", isCorrect: false, rationale: "The exclamation point should be inside the quotation marks if it is part of the quote." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    passage: "<p>We need to drive _______ down the road to get to the house.</p>",
                    question: "Which phrase correctly completes the sentence?",
                    answerOptions: [
                        { text: "a little farther", isCorrect: true, rationale: "'Farther' refers to a physical distance. 'A little' modifies it correctly." },
                        { text: "a little further", isCorrect: false, rationale: "'Further' typically refers to a figurative or metaphorical distance (e.g., 'further in my career'). 'Farther' is the better choice for physical distance." },
                        { text: "some farther", isCorrect: false, rationale: "This is grammatically awkward." },
                        { text: "some further", isCorrect: false, rationale: "This is grammatically awkward and uses the incorrect word." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Which sentence has a dangling modifier?",
                    answerOptions: [
                        { text: "After finishing my homework, I watched a movie.", isCorrect: false, rationale: "The modifier 'After finishing my homework' correctly describes 'I'." },
                        { text: "Walking down the street, the trees were beautiful.", isCorrect: true, rationale: "This is a dangling modifier because the trees were not walking down the street. It's unclear who was walking. It should be rewritten, for example: 'As I was walking down the street, I thought the trees were beautiful.'" },
                        { text: "The dog, wagging its tail, greeted me at the door.", isCorrect: false, rationale: "The modifier 'wagging its tail' correctly describes the dog." },
                        { text: "To get a good grade, you must study hard.", isCorrect: false, rationale: "The modifier 'To get a good grade' correctly describes the action of 'you'." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    passage: "<p>The team captain, as well as the players, _______ nervous before the game.</p>",
                    question: "Which verb correctly completes the sentence?",
                    answerOptions: [
                        { text: "was", isCorrect: true, rationale: "The subject is 'The team captain', which is singular. The phrase 'as well as the players' is an interrupter and does not make the subject plural." },
                        { text: "were", isCorrect: false, rationale: "The verb must agree with the singular subject 'captain'." },
                        { text: "are", isCorrect: false, rationale: "This is a plural, present-tense verb." },
                        { text: "have been", isCorrect: false, rationale: "This is a plural verb." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Which of the following is a compound sentence?",
                    answerOptions: [
                        { text: "The rain fell steadily all day.", isCorrect: false, rationale: "This is a simple sentence." },
                        { text: "Because the power was out, we couldn't watch TV.", isCorrect: false, rationale: "This is a complex sentence (one independent clause and one dependent clause)." },
                        { text: "I wanted to go to the beach, but it was raining.", isCorrect: true, rationale: "This is a compound sentence because it consists of two independent clauses ('I wanted to go to the beach' and 'it was raining') joined by a coordinating conjunction ('but')." },
                        { text: "Running in the park is good exercise.", isCorrect: false, rationale: "This is a simple sentence." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    passage: "<p>The manager spoke to Susan and _______ about the new project.</p>",
                    question: "Which pronoun correctly completes the sentence?",
                    answerOptions: [
                        { text: "I", isCorrect: false, rationale: "The pronoun is an object of the preposition 'to', so the objective case is needed." },
                        { text: "me", isCorrect: true, rationale: "'Susan' and 'me' are the objects of the preposition 'to'. The objective case pronoun 'me' is correct." },
                        { text: "myself", isCorrect: false, rationale: "The reflexive pronoun 'myself' is not appropriate here." },
                        { text: "she", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        }
    ]
};
// Social Studies -> Civics and Government -> Foundations of American Democracy
AppData.quizzes.ss_foundations_of_american_democracy = {
    id: "ss_foundations_of_american_democracy",
    title: "Foundations of American Democracy",
    description: "Key principles of American democracy, the Constitution, and founding documents.",
    quizzes: [
        {
            quizId: "ss_foundations_of_american_democracy_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "text",
                    passage: "<p>The U.S. Constitution establishes a system of 'federalism,' which divides power between the national government and the state governments. Certain powers, such as the power to declare war and coin money, are delegated exclusively to the national government. Other powers, known as reserved powers, are left to the states, such as the power to establish schools and conduct elections. Some powers, like the power to tax, are concurrent, meaning they are shared by both levels of government.</p>",
                    question: "According to the passage, the power to declare war is an example of a power that belongs to:",
                    answerOptions: [
                        { text: "the state governments only.", isCorrect: false, rationale: "This power is explicitly mentioned as belonging to the national government." },
                        { text: "the national government only.", isCorrect: true, rationale: "The passage states that the power to declare war is 'delegated exclusively to the national government.'" },
                        { text: "both the national and state governments.", isCorrect: false, rationale: "This would be a concurrent power, but declaring war is not." },
                        { text: "local governments.", isCorrect: false, rationale: "The passage discusses the division between national and state governments." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "What are the three branches of the U.S. government as established by the Constitution?",
                    answerOptions: [
                        { text: "Federal, State, and Local", isCorrect: false, rationale: "These are levels of government, not branches." },
                        { text: "Executive, Legislative, and Judicial", isCorrect: true, rationale: "The Constitution establishes these three branches to create a separation of powers." },
                        { text: "President, Congress, and Senate", isCorrect: false, rationale: "The Senate is part of Congress (the Legislative branch)." },
                        { text: "Democratic, Republican, and Independent", isCorrect: false, rationale: "These are political parties, not branches of government." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.' - The Declaration of Independence, 1776</p>",
                    question: "This famous quote is from which founding document?",
                    answerOptions: [
                        { text: "The U.S. Constitution", isCorrect: false, rationale: "The Constitution is the framework of government, but this quote is from the Declaration of Independence." },
                        { text: "The Bill of Rights", isCorrect: false, rationale: "The Bill of Rights consists of the first ten amendments to the Constitution." },
                        { text: "The Declaration of Independence", isCorrect: true, rationale: "This passage is the most famous part of the preamble to the Declaration of Independence." },
                        { text: "The Federalist Papers", isCorrect: false, rationale: "The Federalist Papers were essays arguing for the ratification of the Constitution." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.' - The Declaration of Independence, 1776</p>",
                    question: "What is the main principle expressed in this quote?",
                    answerOptions: [
                        { text: "The need for a strong central government.", isCorrect: false, rationale: "The quote focuses on individual rights, not the structure of government." },
                        { text: "The idea that people have natural rights that cannot be taken away.", isCorrect: true, rationale: "The concept of 'unalienable Rights' like Life, Liberty, and the pursuit of Happiness is the core message of the quote." },
                        { text: "The importance of separating powers among three branches.", isCorrect: false, rationale: "This principle is found in the Constitution, not this quote." },
                        { text: "The right to a trial by jury.", isCorrect: false, rationale: "This is a specific right, but not the broad principle expressed in the quote." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The first ten amendments to the U.S. Constitution are collectively known as:",
                    answerOptions: [
                        { text: "The Articles of Confederation", isCorrect: false, rationale: "The Articles were the first constitution, which was replaced by the current Constitution." },
                        { text: "The Preamble", isCorrect: false, rationale: "The Preamble is the introductory statement to the Constitution." },
                        { text: "The Bill of Rights", isCorrect: true, rationale: "The Bill of Rights was added to the Constitution to protect individual liberties." },
                        { text: "The Declaration of Rights", isCorrect: false, rationale: "This is not the correct name." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "The principle of 'checks and balances' is designed to:",
                    answerOptions: [
                        { text: "ensure the federal budget is balanced each year.", isCorrect: false, rationale: "This is a fiscal goal, not the purpose of the constitutional principle." },
                        { text: "allow each branch of government to limit the powers of the other branches.", isCorrect: true, rationale: "This system prevents any one branch from becoming too powerful. For example, the President can veto laws from Congress, but Congress can override the veto." },
                        { text: "guarantee that all citizens have equal rights.", isCorrect: false, rationale: "This is the principle of 'equal protection', found in the 14th Amendment." },
                        { text: "divide power between the state and national governments.", isCorrect: false, rationale: "This principle is known as federalism." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "Which amendment in the Bill of Rights protects freedom of speech, religion, and the press?",
                    answerOptions: [
                        { text: "The First Amendment", isCorrect: true, rationale: "The First Amendment guarantees these fundamental freedoms of expression." },
                        { text: "The Second Amendment", isCorrect: false, rationale: "The Second Amendment protects the right to bear arms." },
                        { text: "The Fourth Amendment", isCorrect: false, rationale: "The Fourth Amendment protects against unreasonable searches and seizures." },
                        { text: "The Fifth Amendment", isCorrect: false, rationale: "The Fifth Amendment includes rights such as protection against self-incrimination." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>The principle of popular sovereignty is a cornerstone of American democracy. It is the idea that the authority of a government is created and sustained by the consent of its people, through their elected representatives. The phrase 'We the People' at the beginning of the U.S. Constitution is a powerful expression of this principle.</p>",
                    question: "What is popular sovereignty?",
                    answerOptions: [
                        { text: "The idea that the government's power comes from the people.", isCorrect: true, rationale: "The passage defines it as the government's authority being created by the 'consent of its people'." },
                        { text: "The principle that the Supreme Court has the final say on all laws.", isCorrect: false, rationale: "This is the principle of judicial review." },
                        { text: "The division of power between the states and the federal government.", isCorrect: false, rationale: "This is federalism." },
                        { text: "The belief that the monarch has a divine right to rule.", isCorrect: false, rationale: "This is the opposite of popular sovereignty." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The legislative branch of the U.S. federal government is also known as:",
                    answerOptions: [
                        { text: "The Presidency", isCorrect: false, rationale: "The Presidency is the executive branch." },
                        { text: "The Supreme Court", isCorrect: false, rationale: "The Supreme Court is the head of the judicial branch." },
                        { text: "Congress", isCorrect: true, rationale: "Congress, made up of the Senate and the House of Representatives, is the legislative branch responsible for making laws." },
                        { text: "The Cabinet", isCorrect: false, rationale: "The Cabinet is part of the executive branch, advising the President." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What does the term 'bicameral legislature' mean?",
                    answerOptions: [
                        { text: "A legislature with two political parties.", isCorrect: false, rationale: "This describes a two-party system, not the structure of the legislature." },
                        { text: "A legislature that has two separate chambers or houses.", isCorrect: true, rationale: "The U.S. Congress is bicameral, consisting of the Senate and the House of Representatives." },
                        { text: "A legislature where members are elected every two years.", isCorrect: false, rationale: "This describes the term length for the House of Representatives, not the structure." },
                        { text: "A legislature that can be vetoed by the president.", isCorrect: false, rationale: "This describes a check on the legislature's power, not its structure." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The U.S. Constitution can be changed through a process called:",
                    answerOptions: [
                        { text: "A presidential veto", isCorrect: false, rationale: "A veto is the rejection of a bill, not a change to the Constitution." },
                        { text: "A Supreme Court ruling", isCorrect: false, rationale: "The Supreme Court can interpret the Constitution, but it cannot formally change its text." },
                        { text: "The amendment process", isCorrect: true, rationale: "Article V of the Constitution outlines the process for adding amendments to change the document." },
                        { text: "A national election", isCorrect: false, rationale: "Elections choose representatives; they do not directly change the Constitution." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Which of the following is a responsibility of a U.S. citizen?",
                    answerOptions: [
                        { text: "Serving on a jury", isCorrect: true, rationale: "Jury duty is a key civic responsibility required of citizens to ensure the right to a trial by a jury of one's peers." },
                        { text: "Owning a business", isCorrect: false, rationale: "This is an opportunity, not a civic responsibility." },
                        { text: "Traveling to other countries", isCorrect: false, rationale: "This is a right, not a responsibility." },
                        { text: "Joining a political party", isCorrect: false, rationale: "This is a right and a form of political participation, but not a required responsibility." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>The Supremacy Clause, in Article VI of the U.S. Constitution, establishes that the Constitution, federal laws made pursuant to it, and treaties made under its authority, constitute the 'supreme Law of the Land.' It provides that state courts are bound by the supreme law; in case of conflict between federal and state law, the federal law must be applied.</p>",
                    question: "What does the Supremacy Clause establish?",
                    answerOptions: [
                        { text: "The President is the supreme ruler of the country.", isCorrect: false, rationale: "This is incorrect; the Constitution establishes a republic, not a monarchy." },
                        { text: "The Supreme Court has power over all other courts.", isCorrect: false, rationale: "While true, this is not what the Supremacy Clause establishes." },
                        { text: "State laws are superior to federal laws.", isCorrect: false, rationale: "The passage states the opposite." },
                        { text: "The U.S. Constitution and federal laws are the highest laws in the nation.", isCorrect: true, rationale: "The passage clearly defines this as the 'supreme Law of the Land,' which overrides conflicting state laws." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The idea that the government should be divided into three distinct branches is known as:",
                    answerOptions: [
                        { text: "Federalism", isCorrect: false, rationale: "Federalism is the division of power between national and state governments." },
                        { text: "Separation of powers", isCorrect: true, rationale: "This is the core principle of dividing government into legislative, executive, and judicial branches." },
                        { text: "Popular sovereignty", isCorrect: false, rationale: "Popular sovereignty is the idea that power comes from the people." },
                        { text: "Judicial review", isCorrect: false, rationale: "Judicial review is the power of the courts to declare laws unconstitutional." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "How many senators does each state have in the U.S. Senate?",
                    answerOptions: [
                        { text: "One", isCorrect: false, rationale: "This is incorrect." },
                        { text: "Two", isCorrect: true, rationale: "The principle of equal representation for each state in the Senate is a key feature of the U.S. Constitution." },
                        { text: "It depends on the state's population.", isCorrect: false, rationale: "This is how representation is determined for the House of Representatives, not the Senate." },
                        { text: "Four", isCorrect: false, rationale: "This is incorrect." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_foundations_of_american_democracy_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What is the primary function of the judicial branch of the U.S. government?",
                    answerOptions: [
                        { text: "To make laws", isCorrect: false, rationale: "This is the function of the legislative branch." },
                        { text: "To enforce laws", isCorrect: false, rationale: "This is the function of the executive branch." },
                        { text: "To interpret laws and the Constitution", isCorrect: true, rationale: "The judicial branch, headed by the Supreme Court, is responsible for interpreting the meaning of laws and determining if they are constitutional." },
                        { text: "To veto laws", isCorrect: false, rationale: "This is a power of the President (executive branch)." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "The concept of 'rule of law' means that:",
                    answerOptions: [
                        { text: "The ruler makes the laws and is above them.", isCorrect: false, rationale: "This is the opposite of the rule of law." },
                        { text: "Laws can be changed at any time without a process.", isCorrect: false, rationale: "The rule of law requires a stable and predictable legal process." },
                        { text: "Everyone, including government officials, must obey the law.", isCorrect: true, rationale: "The rule of law is the principle that no one is above the law." },
                        { text: "Only citizens must obey the law, not visitors.", isCorrect: false, rationale: "Laws generally apply to everyone within a jurisdiction." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The Preamble to the U.S. Constitution begins with the phrase 'We the People...' It serves as an introduction to the document and outlines the broad goals of the new government, such as to 'establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty'.</p>",
                    question: "What is the purpose of the Preamble?",
                    answerOptions: [
                        { text: "To list the specific rights of citizens.", isCorrect: false, rationale: "This is the purpose of the Bill of Rights." },
                        { text: "To state the goals and purpose of the government.", isCorrect: true, rationale: "The passage states that it 'outlines the broad goals of the new government'." },
                        { text: "To declare independence from Great Britain.", isCorrect: false, rationale: "This was the purpose of the Declaration of Independence." },
                        { text: "To establish the process for amending the Constitution.", isCorrect: false, rationale: "This process is detailed in Article V of the Constitution." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "An example of a 'check' that the legislative branch has on the executive branch is:",
                    answerOptions: [
                        { text: "The power to declare laws unconstitutional.", isCorrect: false, rationale: "This is a power of the judicial branch." },
                        { text: "The power to veto bills.", isCorrect: false, rationale: "This is a power of the executive branch." },
                        { text: "The power to impeach the President.", isCorrect: true, rationale: "Congress (the legislative branch) has the power to impeach and remove the President from office, which is a major check on executive power." },
                        { text: "The power to appoint Supreme Court justices.", isCorrect: false, rationale: "This is a power of the President, though it requires Senate confirmation." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The U.S. has a 'republican' form of government, which means that:",
                    answerOptions: [
                        { text: "All citizens vote directly on all laws.", isCorrect: false, rationale: "This describes a direct democracy, not a republic." },
                        { text: "The government is led by a monarch.", isCorrect: false, rationale: "A republic is the opposite of a monarchy." },
                        { text: "Citizens elect representatives to make laws on their behalf.", isCorrect: true, rationale: "A republic is a system where the people exercise their power by voting for elected officials." },
                        { text: "There are two major political parties.", isCorrect: false, rationale: "This describes a two-party system, which is a feature of U.S. politics but not the definition of a republic." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Which of the following rights is NOT protected by the First Amendment?",
                    answerOptions: [
                        { text: "Freedom of speech", isCorrect: false, rationale: "Freedom of speech is a key protection of the First Amendment." },
                        { text: "The right to bear arms", isCorrect: true, rationale: "The right to bear arms is protected by the Second Amendment, not the First." },
                        { text: "Freedom of the press", isCorrect: false, rationale: "Freedom of the press is protected by the First Amendment." },
                        { text: "Freedom of religion", isCorrect: false, rationale: "Freedom of religion is protected by the First Amendment." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>Federalism is the system of shared power between the national and state governments. The Founders chose this system to balance the need for a strong national government with the desire to preserve the autonomy of the states. It represented a compromise between a unitary system, where all power is centralized, and a confederation, where states retain nearly all power, as was the case under the Articles of Confederation.</p>",
                    question: "Federalism was created as a compromise between which two systems of government?",
                    answerOptions: [
                        { text: "A democracy and a monarchy", isCorrect: false, rationale: "These are different forms of government, not systems of power distribution." },
                        { text: "A unitary system and a confederation", isCorrect: true, rationale: "The passage explicitly states that federalism was a compromise between these two systems." },
                        { text: "A legislative and an executive branch", isCorrect: false, rationale: "These are branches within a government, not systems of government." },
                        { text: "A republic and a dictatorship", isCorrect: false, rationale: "These are different forms of government." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "What is the main idea of the Declaration of Independence?",
                    answerOptions: [
                        { text: "To establish the framework for the U.S. government.", isCorrect: false, rationale: "This was the purpose of the U.S. Constitution." },
                        { text: "To declare the American colonies' separation from Great Britain and justify the reasons.", isCorrect: true, rationale: "The document lists grievances against the King and asserts the colonies' right to be independent." },
                        { text: "To add a Bill of Rights to the Constitution.", isCorrect: false, rationale: "The Bill of Rights was added later." },
                        { text: "To create an alliance between the thirteen colonies.", isCorrect: false, rationale: "While it helped unify them, its primary purpose was to declare independence." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The power of judicial review, established in the case Marbury v. Madison, allows the Supreme Court to:",
                    answerOptions: [
                        { text: "Impeach the President.", isCorrect: false, rationale: "This is a power of Congress." },
                        { text: "Declare laws unconstitutional.", isCorrect: true, rationale: "Judicial review is the power of the courts to determine whether acts of Congress and the President are in accord with the U.S. Constitution." },
                        { text: "Veto legislation.", isCorrect: false, rationale: "This is a power of the President." },
                        { text: "Create new amendments.", isCorrect: false, rationale: "Amendments are created through a separate process outlined in the Constitution." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "In the U.S. Congress, representation in the House of Representatives is based on:",
                    answerOptions: [
                        { text: "Equal representation for each state.", isCorrect: false, rationale: "This is the principle for the Senate." },
                        { text: "The state's population.", isCorrect: true, rationale: "States with larger populations have more representatives in the House." },
                        { text: "The physical size of the state.", isCorrect: false, rationale: "Geographic size does not determine representation." },
                        { text: "The state's economic output.", isCorrect: false, rationale: "Economic output does not determine representation." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The Fifth Amendment protects a citizen from 'double jeopardy.' What does this mean?",
                    answerOptions: [
                        { text: "A person cannot be forced to testify against themselves.", isCorrect: false, rationale: "This is the protection against self-incrimination, also in the Fifth Amendment." },
                        { text: "A person cannot be tried for the same crime twice.", isCorrect: true, rationale: "Double jeopardy prevents an accused person from being tried again on the same (or similar) charges following an acquittal or a conviction." },
                        { text: "A person cannot be jailed without a trial.", isCorrect: false, rationale: "This is related to the right to due process." },
                        { text: "A person has the right to an attorney.", isCorrect: false, rationale: "This is guaranteed by the Sixth Amendment." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "text",
                    passage: "<p>Consent of the governed is a foundational principle of American democracy, meaning that a government's legitimacy and moral right to use state power is only justified and lawful when consented to by the people over whom that political power is exercised. This idea is most powerfully expressed in the Declaration of Independence, which states that governments derive 'their just powers from the consent of the governed'.</p>",
                    question: "The principle of 'consent of the governed' means that government power comes from:",
                    answerOptions: [
                        { text: "a monarch.", isCorrect: false, rationale: "This is the opposite of the principle." },
                        { text: "the military.", isCorrect: false, rationale: "The military is under civilian control in a democracy." },
                        { text: "the people.", isCorrect: true, rationale: "The passage explicitly states that power is justified 'when consented to by the people'." },
                        { text: "the states.", isCorrect: false, rationale: "While states have power under federalism, the ultimate source of authority is the people." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "How long is the term for a U.S. Senator?",
                    answerOptions: [
                        { text: "Two years", isCorrect: false, rationale: "This is the term length for a member of the House of Representatives." },
                        { text: "Four years", isCorrect: false, rationale: "This is the term length for the President." },
                        { text: "Six years", isCorrect: true, rationale: "U.S. Senators are elected to serve six-year terms." },
                        { text: "For life", isCorrect: false, rationale: "This is the term for a Supreme Court Justice." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The 'elastic clause' (or 'necessary and proper' clause) in the Constitution gives Congress:",
                    answerOptions: [
                        { text: "The power to tax.", isCorrect: false, rationale: "The power to tax is an enumerated power, not an implied one." },
                        { text: "Implied powers to make laws needed to carry out its enumerated powers.", isCorrect: true, rationale: "This clause allows Congress to stretch its powers to address new issues and challenges not explicitly mentioned in the Constitution." },
                        { text: "The power to declare war.", isCorrect: false, rationale: "This is an enumerated power." },
                        { text: "The power to regulate interstate commerce.", isCorrect: false, rationale: "This is an enumerated power (the Commerce Clause)." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Which of the following is an example of a civic duty, as opposed to a responsibility?",
                    answerOptions: [
                        { text: "Voting in an election", isCorrect: false, rationale: "Voting is considered a civic responsibility; it is strongly encouraged but not legally required." },
                        { text: "Paying taxes", isCorrect: true, rationale: "A civic duty is an action required by law. Paying taxes is a legal requirement for citizens and residents." },
                        { text: "Staying informed about current events", isCorrect: false, rationale: "This is a civic responsibility." },
                        { text: "Volunteering in the community", isCorrect: false, rationale: "This is a civic responsibility." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_foundations_of_american_democracy_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What is the primary role of the executive branch?",
                    answerOptions: [
                        { text: "To write and pass new laws.", isCorrect: false, rationale: "This is the role of the legislative branch." },
                        { text: "To interpret the Constitution.", isCorrect: false, rationale: "This is the role of the judicial branch." },
                        { text: "To implement and enforce laws.", isCorrect: true, rationale: "The executive branch, led by the President, is responsible for carrying out the laws written by Congress." },
                        { text: "To decide guilt or innocence in legal cases.", isCorrect: false, rationale: "This is the role of the judicial branch (courts and juries)." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "The Bill of Rights was added to the Constitution to:",
                    answerOptions: [
                        { text: "strengthen the power of the federal government.", isCorrect: false, rationale: "It was added to limit the power of the federal government." },
                        { text: "protect individual liberties from government infringement.", isCorrect: true, rationale: "Many states refused to ratify the Constitution until they were promised a bill of rights to protect freedoms like speech, religion, and the right to a fair trial." },
                        { text: "outline the structure of the three branches.", isCorrect: false, rationale: "This is done in the main body of the Constitution." },
                        { text: "grant the government the power to tax.", isCorrect: false, rationale: "This power is granted in the main body of the Constitution." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The U.S. system of government is a representative democracy. This means that citizens do not directly vote on every law. Instead, they elect officials—such as members of Congress and the President—to represent their interests and make decisions on their behalf. Regular elections ensure that these officials remain accountable to the people.</p>",
                    question: "What is a key feature of a representative democracy?",
                    answerOptions: [
                        { text: "A king or queen holds all the power.", isCorrect: false, rationale: "This describes a monarchy." },
                        { text: "Citizens vote on every issue themselves.", isCorrect: false, rationale: "This describes a direct democracy." },
                        { text: "Elected officials make decisions for the people.", isCorrect: true, rationale: "The passage states that citizens 'elect officials...to represent their interests and make decisions on their behalf.'" },
                        { text: "The military is in control of the government.", isCorrect: false, rationale: "This describes a military dictatorship." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "An example of a 'check' the judicial branch has on the other two branches is:",
                    answerOptions: [
                        { text: "The power to veto laws.", isCorrect: false, rationale: "This is an executive power." },
                        { text: "The power to impeach officials.", isCorrect: false, rationale: "This is a legislative power." },
                        { text: "The power to declare laws and executive actions unconstitutional.", isCorrect: true, rationale: "This power of judicial review allows the courts to invalidate actions that violate the Constitution." },
                        { text: "The power to confirm presidential appointments.", isCorrect: false, rationale: "This is a legislative power (of the Senate)." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The Fourth Amendment to the Constitution protects citizens from:",
                    answerOptions: [
                        { text: "Cruel and unusual punishment.", isCorrect: false, rationale: "This is protected by the Eighth Amendment." },
                        { text: "The requirement to quarter soldiers.", isCorrect: false, rationale: "This is protected by the Third Amendment." },
                        { text: "Unreasonable searches and seizures.", isCorrect: true, rationale: "The Fourth Amendment requires that warrants be issued based on probable cause." },
                        { text: "Self-incrimination.", isCorrect: false, rationale: "This is protected by the Fifth Amendment." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "text",
                    passage: "<p>The Federalist Papers were a series of 85 essays written by Alexander Hamilton, James Madison, and John Jay under the pseudonym 'Publius.' Published in 1787 and 1788, these essays were written to persuade the voters of New York to adopt the newly proposed U.S. Constitution. They remain a classic source for interpreting the original intent of the Constitution's framers.</p>",
                    question: "What was the primary purpose of the Federalist Papers?",
                    answerOptions: [
                        { text: "To declare independence from Britain.", isCorrect: false, rationale: "That was the purpose of the Declaration of Independence." },
                        { text: "To argue in favor of ratifying the U.S. Constitution.", isCorrect: true, rationale: "The passage states they were written 'to persuade the voters...to adopt the newly proposed U.S. Constitution.'" },
                        { text: "To propose a new Bill of Rights.", isCorrect: false, rationale: "While the Bill of Rights was a related topic of debate, the papers focused on the main body of the Constitution." },
                        { text: "To criticize the new Constitution.", isCorrect: false, rationale: "The authors were in favor of the Constitution; those who criticized it were known as the Anti-Federalists." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "Under the principle of federalism, which of the following is an example of a power typically reserved for the states?",
                    answerOptions: [
                        { text: "Printing money", isCorrect: false, rationale: "This is an exclusive power of the national government." },
                        { text: "Making treaties with foreign countries", isCorrect: false, rationale: "This is an exclusive power of the national government." },
                        { text: "Issuing driver's licenses", isCorrect: true, rationale: "Powers not delegated to the federal government nor prohibited to the states are reserved for the states. This includes things like managing education, local governments, and issuing licenses." },
                        { text: "Maintaining an army and a navy", isCorrect: false, rationale: "This is an exclusive power of the national government." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "The President of the United States is the head of which branch of government?",
                    answerOptions: [
                        { text: "Legislative", isCorrect: false, rationale: "The legislative branch is Congress." },
                        { text: "Executive", isCorrect: true, rationale: "The President is the chief executive, responsible for enforcing laws." },
                        { text: "Judicial", isCorrect: false, rationale: "The judicial branch is the court system." },
                        { text: "Federal", isCorrect: false, rationale: "This is a level of government, not a branch." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "What is the supreme law of the land in the United States?",
                    answerOptions: [
                        { text: "The Declaration of Independence", isCorrect: false, rationale: "This is a foundational document, but it is not the law of the land." },
                        { text: "The President's executive orders", isCorrect: false, rationale: "Executive orders are a tool of the President but are subject to the Constitution." },
                        { text: "The U.S. Constitution", isCorrect: true, rationale: "The Supremacy Clause in Article VI of the Constitution establishes it as the 'supreme Law of the Land'." },
                        { text: "The Bill of Rights", isCorrect: false, rationale: "The Bill of Rights is part of the Constitution, but the entire Constitution is the supreme law." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>The system of checks and balances ensures that political power is not concentrated in the hands of a single branch. For instance, while Congress has the power to pass laws, the President can veto that legislation. However, Congress can override a presidential veto with a two-thirds vote in both the House and the Senate, a difficult but important check on the President's power.</p>",
                    question: "How can Congress override a presidential veto?",
                    answerOptions: [
                        { text: "By appealing to the Supreme Court.", isCorrect: false, rationale: "The Supreme Court does not have a role in overriding vetoes." },
                        { text: "By getting a majority vote in either the House or the Senate.", isCorrect: false, rationale: "A simple majority in one chamber is not enough." },
                        { text: "By achieving a two-thirds vote in both chambers.", isCorrect: true, rationale: "The passage explicitly states this is the requirement for overriding a veto." },
                        { text: "By waiting for the President's term to end.", isCorrect: false, rationale: "This would not override the veto of the original bill." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The idea that every member of society, including the ruler, must obey the law is known as:",
                    answerOptions: [
                        { text: "Separation of powers", isCorrect: false, rationale: "This is the division of government into branches." },
                        { text: "Rule of law", isCorrect: true, rationale: "This principle holds that the law applies to everyone equally." },
                        { text: "Popular sovereignty", isCorrect: false, rationale: "This is the idea that power comes from the people." },
                        { text: "Federalism", isCorrect: false, rationale: "This is the division of power between national and state governments." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "What does the Second Amendment of the Constitution protect?",
                    answerOptions: [
                        { text: "The right to a speedy trial.", isCorrect: false, rationale: "This is protected by the Sixth Amendment." },
                        { text: "The right to bear arms.", isCorrect: true, rationale: "The Second Amendment deals with the right of the people to keep and bear arms." },
                        { text: "Freedom from unreasonable searches.", isCorrect: false, rationale: "This is protected by the Fourth Amendment." },
                        { text: "Freedom of speech.", isCorrect: false, rationale: "This is protected by the First Amendment." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "A government in which one person possesses unlimited power is called:",
                    answerOptions: [
                        { text: "A democracy", isCorrect: false, rationale: "In a democracy, power rests with the people." },
                        { text: "A republic", isCorrect: false, rationale: "A republic is a form of representative democracy." },
                        { text: "An autocracy", isCorrect: true, rationale: "An autocracy (which includes dictatorships and absolute monarchies) is a system of government where supreme power is concentrated in the hands of one person." },
                        { text: "An oligarchy", isCorrect: false, rationale: "In an oligarchy, power rests with a small group of people." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The House of Representatives has how many voting members?",
                    answerOptions: [
                        { text: "100", isCorrect: false, rationale: "This is the number of members in the Senate." },
                        { text: "435", isCorrect: true, rationale: "The number of voting representatives in the House is fixed at 435 by law." },
                        { text: "538", isCorrect: false, rationale: "This is the total number of electors in the Electoral College." },
                        { text: "50", isCorrect: false, rationale: "This is the number of states." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Which of these is the best example of participating in the democratic process?",
                    answerOptions: [
                        { text: "Paying your taxes", isCorrect: false, rationale: "This is a legal duty, not an act of participation in the process of governing." },
                        { text: "Obeying the law", isCorrect: false, rationale: "This is a legal duty." },
                        { text: "Writing a letter to an elected official", isCorrect: true, rationale: "Contacting representatives to express opinions is a core way for citizens to participate in their government and influence policy." },
                        { text: "Getting a driver's license", isCorrect: false, rationale: "This is a legal process, not a form of democratic participation." }
                    ]
                }
            ]
        }
    ]
};
// Social Studies -> Civics and Government -> Structure of U.S. Government
AppData.quizzes.ss_structure_of_us_government = {
    id: "ss_structure_of_us_government",
    title: "Structure of U.S. Government",
    description: "The three branches of government, their powers, and the system of checks and balances.",
    quizzes: [
        {
            quizId: "ss_structure_of_us_government_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which branch of the U.S. government is responsible for making laws?",
                    answerOptions: [
                        { text: "The Executive Branch", isCorrect: false, rationale: "The executive branch, led by the President, is responsible for enforcing laws." },
                        { text: "The Judicial Branch", isCorrect: false, rationale: "The judicial branch, the court system, is responsible for interpreting laws." },
                        { text: "The Legislative Branch", isCorrect: true, rationale: "The legislative branch, known as Congress, is composed of the Senate and the House of Representatives, and its primary function is to create laws." },
                        { text: "The Federal Branch", isCorrect: false, rationale: "This is a level of government, not a branch." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "How long is the term for a member of the U.S. House of Representatives?",
                    answerOptions: [
                        { text: "Two years", isCorrect: true, rationale: "Members of the House are elected for two-year terms to be more responsive to the immediate needs of the people." },
                        { text: "Four years", isCorrect: false, rationale: "This is the term for the President." },
                        { text: "Six years", isCorrect: false, rationale: "This is the term for a Senator." },
                        { text: "For life", isCorrect: false, rationale: "This is the term for a federal judge, including Supreme Court justices." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The President of the United States leads which branch of government?",
                    answerOptions: [
                        { text: "Legislative", isCorrect: false, rationale: "The legislative branch is Congress." },
                        { text: "Judicial", isCorrect: false, rationale: "The judicial branch is the Supreme Court and lower federal courts." },
                        { text: "Executive", isCorrect: true, rationale: "The President is the head of the executive branch, responsible for administering and enforcing federal laws." },
                        { text: "Parliamentary", isCorrect: false, rationale: "The U.S. has a presidential system, not a parliamentary one." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The system of checks and balances is a fundamental principle of the U.S. Constitution. It is designed to prevent any one branch of government from becoming too powerful. For example, while Congress (legislative) can pass a law, the President (executive) can veto it. As a further check, Congress can override the President's veto with a two-thirds vote in both of its houses.</p>",
                    question: "What is the primary purpose of the system of checks and balances?",
                    answerOptions: [
                        { text: "To make the lawmaking process faster.", isCorrect: false, rationale: "The system often slows the process down to encourage deliberation and prevent rash decisions." },
                        { text: "To ensure one branch does not accumulate too much power.", isCorrect: true, rationale: "The passage explicitly states the system is 'designed to prevent any one branch of government from becoming too powerful.'" },
                        { text: "To give the President the final say on all laws.", isCorrect: false, rationale: "The passage shows that Congress can override a presidential veto." },
                        { text: "To divide power between the states and the federal government.", isCorrect: false, rationale: "This is the principle of federalism, not checks and balances." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which of the following is a power of the U.S. Congress?",
                    answerOptions: [
                        { text: "To declare laws unconstitutional", isCorrect: false, rationale: "This is a power of the judicial branch (judicial review)." },
                        { text: "To appoint ambassadors", isCorrect: false, rationale: "This is a power of the President, though the Senate must confirm them." },
                        { text: "To declare war", isCorrect: true, rationale: "The Constitution grants Congress the exclusive power to declare war." },
                        { text: "To command the armed forces", isCorrect: false, rationale: "The President is the Commander-in-Chief of the armed forces." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "What is the highest court in the United States?",
                    answerOptions: [
                        { text: "The Court of Appeals", isCorrect: false, rationale: "The Courts of Appeals are federal courts, but they are below the Supreme Court." },
                        { text: "The District Court", isCorrect: false, rationale: "District Courts are the trial courts of the federal system, but they are the lowest level." },
                        { text: "The Supreme Court", isCorrect: true, rationale: "The Supreme Court is the highest federal court and the final arbiter of the law." },
                        { text: "The State Supreme Court", isCorrect: false, rationale: "A State Supreme Court is the highest court for that state, but the U.S. Supreme Court is the highest in the entire nation." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "How are Supreme Court justices and other federal judges appointed?",
                    answerOptions: [
                        { text: "They are elected by the people in a national election.", isCorrect: false, rationale: "Federal judges are appointed, not elected, to insulate them from political pressure." },
                        { text: "They are appointed by the President and confirmed by the Senate.", isCorrect: true, rationale: "This is the process outlined in the Constitution, representing a check between the executive and legislative branches." },
                        { text: "They are chosen by the current Supreme Court justices.", isCorrect: false, rationale: "Justices do not choose their own successors." },
                        { text: "They are appointed by the governors of their home states.", isCorrect: false, rationale: "This is a process for some state judges, not federal judges." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>The President of the United States has the power to veto legislation passed by Congress, preventing it from becoming law. This is a powerful check on the legislative branch. However, this veto is not absolute. If the President vetoes a bill, it is sent back to Congress, where it can still become law if both the House of Representatives and the Senate vote to override the veto with a two-thirds majority.</p>",
                    question: "A presidential veto can be overridden by:",
                    answerOptions: [
                        { text: "The Supreme Court", isCorrect: false, rationale: "The Supreme Court can declare a law unconstitutional, but it does not override vetoes." },
                        { text: "A simple majority vote in Congress", isCorrect: false, rationale: "A simple majority is not enough; a supermajority is required." },
                        { text: "A two-thirds vote in both houses of Congress", isCorrect: true, rationale: "The passage explicitly states this is the requirement to override a veto." },
                        { text: "A national referendum of the people", isCorrect: false, rationale: "There is no process for a national referendum to override a veto." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The U.S. Congress is a 'bicameral' legislature, which means it is composed of:",
                    answerOptions: [
                        { text: "One house with members from two parties", isCorrect: false, rationale: "This describes a two-party system, not the structure of the legislature." },
                        { text: "Two houses: the Senate and the House of Representatives", isCorrect: true, rationale: "The term 'bicameral' means 'two chambers'. The U.S. system was designed this way as a compromise between representation by population (House) and equal representation for states (Senate)." },
                        { text: "The President and the Vice President", isCorrect: false, rationale: "These are members of the executive branch." },
                        { text: "Federal and state representatives", isCorrect: false, rationale: "This describes federalism, not the structure of Congress." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What is the role of the President's Cabinet?",
                    answerOptions: [
                        { text: "To serve as members of Congress", isCorrect: false, rationale: "Cabinet members are part of the executive branch, not the legislative branch." },
                        { text: "To serve as the heads of the major federal executive departments and advise the President", isCorrect: true, rationale: "The Cabinet includes the heads of departments like the Department of State, Department of Treasury, and Department of Defense." },
                        { text: "To serve as Supreme Court justices", isCorrect: false, rationale: "Cabinet members are not part of the judicial branch." },
                        { text: "To command the different branches of the military", isCorrect: false, rationale: "While the Secretary of Defense is a cabinet member, the Cabinet as a whole does not command the military." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The power of the House of Representatives to charge a government official with 'Treason, Bribery, or other high Crimes and Misdemeanors' is known as:",
                    answerOptions: [
                        { text: "A veto", isCorrect: false, rationale: "A veto is the President's power to reject a bill." },
                        { text: "Judicial review", isCorrect: false, rationale: "This is the power of the courts." },
                        { text: "Impeachment", isCorrect: true, rationale: "Impeachment is the process by which the House of Representatives brings charges against an official. The Senate then holds a trial to determine whether to remove the official from office." },
                        { text: "An executive order", isCorrect: false, rationale: "This is a directive issued by the President." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "How many voting members are in the U.S. Senate?",
                    answerOptions: [
                        { text: "50", isCorrect: false, rationale: "This is the number of states." },
                        { text: "100", isCorrect: true, rationale: "There are two senators from each of the 50 states, for a total of 100." },
                        { text: "435", isCorrect: false, rationale: "This is the number of members in the House of Representatives." },
                        { text: "538", isCorrect: false, rationale: "This is the total number of electors in the Electoral College." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>The Speaker of the House is the presiding officer of the United States House of Representatives. The Speaker is elected by the majority party in the House and is second in the line of presidential succession, after the Vice President. The Speaker's duties include administering the oath of office to Members, managing the legislative process, and overseeing the business of the House.</p>",
                    question: "According to the passage, who is second in line to succeed the President?",
                    answerOptions: [
                        { text: "The Vice President", isCorrect: false, rationale: "The Vice President is first in the line of succession." },
                        { text: "The Speaker of the House", isCorrect: true, rationale: "The passage explicitly states the Speaker 'is second in the line of presidential succession, after the Vice President.'" },
                        { text: "The Chief Justice of the Supreme Court", isCorrect: false, rationale: "The Chief Justice is in the line of succession, but further down the list." },
                        { text: "The President pro tempore of the Senate", isCorrect: false, rationale: "This position is third in the line of succession." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Which of these is a power of the President of the United States?",
                    answerOptions: [
                        { text: "To write and introduce new bills in Congress", isCorrect: false, rationale: "Only members of Congress can introduce bills." },
                        { text: "To serve as Commander-in-Chief of the armed forces", isCorrect: true, rationale: "The Constitution grants the President this power, placing the military under civilian control." },
                        { text: "To determine the federal budget without approval", isCorrect: false, rationale: "The President proposes a budget, but it must be approved by Congress." },
                        { text: "To serve a term of eight years", isCorrect: false, rationale: "The President serves a four-year term and is limited to two terms." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "A bill cannot become a law until it is:",
                    answerOptions: [
                        { text: "Approved by the Supreme Court.", isCorrect: false, rationale: "The Supreme Court may review a law after it is passed, but does not approve it beforehand." },
                        { text: "Passed by both the House of Representatives and the Senate in identical form.", isCorrect: true, rationale: "For a bill to be sent to the President, it must be approved by a majority in both chambers of Congress." },
                        { text: "Supported by all 50 state governors.", isCorrect: false, rationale: "State governors do not vote on federal laws." },
                        { text: "Written by the President's Cabinet.", isCorrect: false, rationale: "The executive branch does not write bills, though it may propose and advocate for legislation." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_structure_of_us_government_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "The U.S. Senate and the House of Representatives together make up which branch of government?",
                    answerOptions: [
                        { text: "Executive", isCorrect: false, rationale: "The executive branch is the Presidency." },
                        { text: "Legislative", isCorrect: true, rationale: "These two bodies form the bicameral legislature, also known as Congress." },
                        { text: "Judicial", isCorrect: false, rationale: "The judicial branch is the court system." },
                        { text: "Federal", isCorrect: false, rationale: "This is a level of government, not a branch." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "What is the main responsibility of the Supreme Court?",
                    answerOptions: [
                        { text: "To write new laws", isCorrect: false, rationale: "This is a legislative function." },
                        { text: "To enforce federal laws", isCorrect: false, rationale: "This is an executive function." },
                        { text: "To act as the final court of appeals and interpret the Constitution", isCorrect: true, rationale: "The Supreme Court is the highest court in the federal system, and its interpretations of the Constitution are final." },
                        { text: "To command the military", isCorrect: false, rationale: "This is an executive function of the President." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The President's power to appoint ambassadors, cabinet members, and federal judges is an example of a check on the other branches because it requires:",
                    answerOptions: [
                        { text: "Approval from the House of Representatives.", isCorrect: false, rationale: "The House does not have a role in confirming these appointments." },
                        { text: "Confirmation by the Senate.", isCorrect: true, rationale: "The President's appointment power is checked by the Senate's 'advice and consent' role, which requires a majority vote to confirm." },
                        { text: "A ruling from the Supreme Court.", isCorrect: false, rationale: "The judiciary does not have a role in the appointment process." },
                        { text: "A national popular vote.", isCorrect: false, rationale: "The public does not vote on these appointments." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The Constitution grants the President the power to issue pardons for federal crimes. A pardon is an official forgiveness that can restore all rights and privileges to an individual. This power is a check on the judicial branch, as it can be used to overturn a federal criminal conviction. However, the pardon power is not absolute; it does not apply to cases of impeachment and does not cover violations of state law.</p>",
                    question: "According to the passage, the President's pardon power is a check on which branch?",
                    answerOptions: [
                        { text: "The legislative branch", isCorrect: false, rationale: "The passage describes it as a check on the branch that handles criminal convictions." },
                        { text: "The executive branch", isCorrect: false, rationale: "The President is part of the executive branch; the pardon is a power, not a check on itself." },
                        { text: "The judicial branch", isCorrect: true, rationale: "The passage explicitly states that the pardon power 'is a check on the judicial branch, as it can be used to overturn a federal criminal conviction.'" },
                        { text: "State governments", isCorrect: false, rationale: "The passage notes that the pardon power does not apply to state law violations." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which of the following statements about the U.S. government is true?",
                    answerOptions: [
                        { text: "The House of Representatives has 100 members.", isCorrect: false, rationale: "The Senate has 100 members; the House has 435." },
                        { text: "Supreme Court justices serve 10-year terms.", isCorrect: false, rationale: "They serve for life during good behavior." },
                        { text: "All bills to raise revenue (taxes) must originate in the House of Representatives.", isCorrect: true, rationale: "This is specified in the Constitution, as the House was seen as being closest to the people." },
                        { text: "The Vice President is the head of the judicial branch.", isCorrect: false, rationale: "The Vice President's official role is President of the Senate and part of the executive branch." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "The 'elastic clause' of the Constitution gives which branch of government the power to make all laws 'necessary and proper' to carry out its duties?",
                    answerOptions: [
                        { text: "The President", isCorrect: false, rationale: "This power belongs to the lawmaking branch." },
                        { text: "The Supreme Court", isCorrect: false, rationale: "This power belongs to the lawmaking branch." },
                        { text: "Congress", isCorrect: true, rationale: "The 'necessary and proper' clause, or elastic clause, grants Congress implied powers not explicitly listed in the Constitution." },
                        { text: "State Legislatures", isCorrect: false, rationale: "This clause applies to the federal Congress." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "If a state law conflicts with a federal law, which law takes precedence?",
                    answerOptions: [
                        { text: "The state law, because of federalism.", isCorrect: false, rationale: "Federalism divides power, but the Supremacy Clause establishes which law is supreme in a conflict." },
                        { text: "The federal law, because of the Supremacy Clause.", isCorrect: true, rationale: "The Supremacy Clause of the Constitution states that federal law is the 'supreme Law of the Land'." },
                        { text: "The law that was passed first.", isCorrect: false, rationale: "The timing does not determine precedence." },
                        { text: "It must be decided by a popular vote.", isCorrect: false, rationale: "Conflicts are resolved through the court system, not by popular vote." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "The role of the Vice President of the United States includes:",
                    answerOptions: [
                        { text: "Presiding over the House of Representatives.", isCorrect: false, rationale: "The Speaker of the House presides over the House." },
                        { text: "Serving a six-year term.", isCorrect: false, rationale: "The Vice President serves a four-year term with the President." },
                        { text: "Presiding over the Senate and casting tie-breaking votes.", isCorrect: true, rationale: "This is the Vice President's only constitutionally defined duty, aside from succeeding the President." },
                        { text: "Appointing members of the Cabinet.", isCorrect: false, rationale: "This is a power of the President." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "text",
                    passage: "<p>The process of a bill becoming a law is complex. First, a bill is introduced in either the House or the Senate. It is then sent to a committee for review. If the committee approves it, the entire chamber votes on it. If it passes, it goes to the other chamber to repeat the process. Both chambers must pass the exact same version of the bill. Only then is it sent to the President, who can sign it into law or veto it.</p>",
                    question: "What must happen before a bill is sent to the President?",
                    answerOptions: [
                        { text: "It must be approved by the Supreme Court.", isCorrect: false, rationale: "The Supreme Court is not part of the legislative process." },
                        { text: "It must be passed in identical form by both the House and the Senate.", isCorrect: true, rationale: "The passage explicitly states this requirement." },
                        { text: "It must be approved by the voters in a national election.", isCorrect: false, rationale: "Voters elect representatives but do not vote on individual bills." },
                        { text: "It must be introduced by the President.", isCorrect: false, rationale: "Bills are introduced by members of Congress." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "Which of these is a limit on the President's power?",
                    answerOptions: [
                        { text: "The President cannot declare war without the approval of Congress.", isCorrect: true, rationale: "While the President is Commander-in-Chief, the power to officially declare war rests with Congress." },
                        { text: "The President cannot issue executive orders.", isCorrect: false, rationale: "The President can issue executive orders, which are a form of directive." },
                        { text: "The President cannot fire members of the Cabinet.", isCorrect: false, rationale: "The President has the authority to fire Cabinet members." },
                        { text: "The President serves for life.", isCorrect: false, rationale: "The President is limited to two four-year terms by the 22nd Amendment." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The division of the U.S. government into three branches is an example of the principle of:",
                    answerOptions: [
                        { text: "Federalism", isCorrect: false, rationale: "Federalism is the division of power between national and state governments." },
                        { text: "Separation of Powers", isCorrect: true, rationale: "This principle divides governmental authority into the legislative, executive, and judicial branches." },
                        { text: "Popular Sovereignty", isCorrect: false, rationale: "This is the principle that the government's power comes from the people." },
                        { text: "Checks and Balances", isCorrect: false, rationale: "Checks and balances are the powers each branch has over the others; separation of powers is the initial division." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "If the House of Representatives votes to impeach a public official, what happens next?",
                    answerOptions: [
                        { text: "The official is automatically removed from office.", isCorrect: false, rationale: "Impeachment is only the bringing of charges." },
                        { text: "The Supreme Court decides whether the official is guilty.", isCorrect: false, rationale: "The trial is held in the legislative branch." },
                        { text: "The Senate holds a trial to determine whether to remove the official.", isCorrect: true, rationale: "The House acts as the prosecutor, and the Senate serves as the jury. A two-thirds vote in the Senate is required for removal." },
                        { text: "The President can pardon the official to stop the process.", isCorrect: false, rationale: "The President's pardon power does not apply to cases of impeachment." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "The 'Commerce Clause' of the Constitution gives Congress the power to:",
                    answerOptions: [
                        { text: "Regulate commerce with foreign nations and among the states.", isCorrect: true, rationale: "This clause is the basis for much of the federal government's regulation of the economy." },
                        { text: "Coin money and set its value.", isCorrect: false, rationale: "This is a separate enumerated power of Congress." },
                        { text: "Establish post offices.", isCorrect: false, rationale: "This is a separate enumerated power of Congress." },
                        { text: "Borrow money on the credit of the United States.", isCorrect: false, rationale: "This is a separate enumerated power of Congress." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The number of representatives a state has in the House of Representatives is recalculated every 10 years based on:",
                    answerOptions: [
                        { text: "The state's economic performance.", isCorrect: false, rationale: "Representation is not based on economic factors." },
                        { text: "The results of the U.S. Census.", isCorrect: true, rationale: "The census determines the population of each state, and that data is used to apportion the 435 seats in the House." },
                        { text: "The number of registered voters in the state.", isCorrect: false, rationale: "It is based on the total population, not just registered voters." },
                        { text: "A vote by the state legislature.", isCorrect: false, rationale: "This is a federal process based on the census." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "What does it mean that federal judges have lifetime tenure?",
                    answerOptions: [
                        { text: "They must retire at age 70.", isCorrect: false, rationale: "There is no mandatory retirement age." },
                        { text: "They serve until they die, resign, or are impeached and removed.", isCorrect: true, rationale: "This 'good behavior' tenure is meant to ensure their independence from political pressure and public opinion." },
                        { text: "They are re-elected every 10 years.", isCorrect: false, rationale: "Federal judges are not elected." },
                        { text: "Their term is for the lifetime of the President who appointed them.", isCorrect: false, rationale: "Their service is independent of the President who appointed them." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_structure_of_us_government_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which body of Congress has 100 members, with two from each state?",
                    answerOptions: [
                        { text: "The House of Representatives", isCorrect: false, rationale: "The House has 435 members, with representation based on population." },
                        { text: "The Senate", isCorrect: true, rationale: "The Senate is structured to give each state equal representation, regardless of its size." },
                        { text: "The Supreme Court", isCorrect: false, rationale: "The Supreme Court is the highest judicial body and has nine justices." },
                        { text: "The Cabinet", isCorrect: false, rationale: "The Cabinet is part of the executive branch." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "The power to negotiate treaties with foreign countries belongs to which branch?",
                    answerOptions: [
                        { text: "The Legislative Branch", isCorrect: false, rationale: "The Senate must approve treaties, but the President negotiates them." },
                        { text: "The Judicial Branch", isCorrect: false, rationale: "The judicial branch does not have a role in creating treaties." },
                        { text: "The Executive Branch", isCorrect: true, rationale: "The President, as head of the executive branch and the nation's chief diplomat, has the power to negotiate treaties." },
                        { text: "State Governments", isCorrect: false, rationale: "States are not permitted to make treaties with foreign nations." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "If Congress passes a bill, and the President signs it, but the Supreme Court later rules that the law violates the Constitution, this is an example of:",
                    answerOptions: [
                        { text: "A presidential veto", isCorrect: false, rationale: "A veto happens before a bill becomes law." },
                        { text: "Federalism", isCorrect: false, rationale: "Federalism is the division of power between state and national governments." },
                        { text: "Judicial review", isCorrect: true, rationale: "This is the primary check the judicial branch has on the other two branches: the power to declare their actions unconstitutional." },
                        { text: "Impeachment", isCorrect: false, rationale: "Impeachment is the process of charging an official with wrongdoing." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The President is the Commander-in-Chief of the U.S. military. This means the President has supreme operational command over the nation's armed forces. However, this power is checked by Congress, which has the sole power to declare war and the responsibility to appropriate funds for the military. This division of power ensures civilian control over the military and prevents the President from having unchecked war-making authority.</p>",
                    question: "How does Congress check the President's power as Commander-in-Chief?",
                    answerOptions: [
                        { text: "By appointing military generals.", isCorrect: false, rationale: "The President appoints high-ranking officers, though they are confirmed by the Senate." },
                        { text: "By controlling the military's budget and having the power to declare war.", isCorrect: true, rationale: "The passage identifies the powers to 'declare war' and 'appropriate funds' as congressional checks." },
                        { text: "By leading troops in battle.", isCorrect: false, rationale: "Members of Congress do not lead troops." },
                        { text: "By vetoing the President's military orders.", isCorrect: false, rationale: "Congress cannot veto a presidential order; the veto is a presidential power." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Who is the presiding officer of the House of Representatives?",
                    answerOptions: [
                        { text: "The Vice President", isCorrect: false, rationale: "The Vice President is the president of the Senate." },
                        { text: "The President pro tempore", isCorrect: false, rationale: "This is a leadership position in the Senate." },
                        { text: "The Speaker of the House", isCorrect: true, rationale: "The Speaker of the House is elected by the members of the House and is its leader." },
                        { text: "The Chief Justice", isCorrect: false, rationale: "The Chief Justice presides over the Supreme Court." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "For a bill to become a law, it must be approved by:",
                    answerOptions: [
                        { text: "The House of Representatives only", isCorrect: false, rationale: "It must pass both chambers." },
                        { text: "The Senate only", isCorrect: false, rationale: "It must pass both chambers." },
                        { text: "The President only", isCorrect: false, rationale: "The President signs a bill after it has been passed by Congress." },
                        { text: "A majority of both the House and the Senate", isCorrect: true, rationale: "A bill must be passed in identical form by both chambers before it can be sent to the President." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "The 'advice and consent' role of the U.S. Senate applies to which presidential action?",
                    answerOptions: [
                        { text: "Issuing a pardon", isCorrect: false, rationale: "The President's pardon power is not subject to Senate approval." },
                        { text: "Appointing a Supreme Court justice", isCorrect: true, rationale: "All federal judges and many high-level executive branch officials appointed by the President must be confirmed by a majority vote in the Senate." },
                        { text: "Vetoing a bill", isCorrect: false, rationale: "The veto is a power the President can exercise alone." },
                        { text: "Giving the State of the Union address", isCorrect: false, rationale: "This is a duty of the President that does not require Senate consent." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "Which of the following is a function of federal 'executive departments' like the Department of State or Department of Treasury?",
                    answerOptions: [
                        { text: "To interpret the constitutionality of new laws", isCorrect: false, rationale: "This is a function of the judicial branch." },
                        { text: "To carry out the day-to-day administration and enforcement of federal laws", isCorrect: true, rationale: "These departments are the primary organizations within the executive branch responsible for implementing policy in their specific areas." },
                        { text: "To draft and vote on new legislation", isCorrect: false, rationale: "This is a function of the legislative branch." },
                        { text: "To preside over impeachment trials", isCorrect: false, rationale: "The Senate presides over impeachment trials (with the Chief Justice presiding in the case of a president)." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "text",
                    passage: "<p>The U.S. federal court system is structured like a pyramid. At the bottom are the U.S. District Courts, which are the trial courts where cases are initially heard, evidence is presented, and decisions are made. If a party is unsatisfied with a district court's decision, they can appeal to the next level, the U.S. Courts of Appeals. These courts review the trial court's proceedings for errors of law. The final level of appeal is the U.S. Supreme Court, which hears a limited number of cases of major national significance.</p>",
                    question: "In the federal court system, which courts are the primary trial courts?",
                    answerOptions: [
                        { text: "The Supreme Court", isCorrect: false, rationale: "The Supreme Court is primarily an appellate court." },
                        { text: "The Courts of Appeals", isCorrect: false, rationale: "These are appellate courts that review the decisions of lower courts." },
                        { text: "The U.S. District Courts", isCorrect: true, rationale: "The passage identifies the District Courts as 'the trial courts where cases are initially heard.'" },
                        { text: "State Courts", isCorrect: false, rationale: "State courts are part of a separate judicial system, though some cases can be appealed from state supreme courts to the U.S. Supreme Court." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "Representation in the House of Representatives is based on population, while in the Senate it is equal for all states. This arrangement was the result of:",
                    answerOptions: [
                        { text: "The Articles of Confederation", isCorrect: false, rationale: "The Articles had a unicameral legislature with equal representation." },
                        { text: "The Great Compromise (or Connecticut Compromise)", isCorrect: true, rationale: "This compromise during the Constitutional Convention merged the Virginia Plan (representation by population) and the New Jersey Plan (equal representation) to create the bicameral Congress we have today." },
                        { text: "The Three-Fifths Compromise", isCorrect: false, rationale: "This compromise dealt with how to count slaves for the purposes of representation and taxation." },
                        { text: "Marbury v. Madison", isCorrect: false, rationale: "This was a Supreme Court case that established judicial review." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The power to regulate interstate and foreign commerce belongs to:",
                    answerOptions: [
                        { text: "The President", isCorrect: false, rationale: "The President enforces laws, but Congress is given the power to regulate commerce." },
                        { text: "The Supreme Court", isCorrect: false, rationale: "The Supreme Court may rule on cases related to commerce, but it does not regulate it." },
                        { text: "State Governments", isCorrect: false, rationale: "States can regulate commerce within their own borders (intrastate), but not among states (interstate)." },
                        { text: "Congress", isCorrect: true, rationale: "The 'Commerce Clause' in Article I of the Constitution gives this power to the legislative branch." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "An executive order is a directive issued by:",
                    answerOptions: [
                        { text: "The Speaker of the House", isCorrect: false, rationale: "This is a legislative leadership position." },
                        { text: "The Chief Justice of the Supreme Court", isCorrect: false, rationale: "This is a judicial position." },
                        { text: "The President", isCorrect: true, rationale: "Executive orders are issued by the President to manage the operations of the federal government and have the force of law." },
                        { text: "A State Governor", isCorrect: false, rationale: "A governor can issue executive orders at the state level, but not for the federal government." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "If there is a tie vote in the U.S. Senate, who casts the deciding vote?",
                    answerOptions: [
                        { text: "The Speaker of the House", isCorrect: false, rationale: "The Speaker presides over the House, not the Senate." },
                        { text: "The President", isCorrect: false, rationale: "The President does not have a vote in Congress." },
                        { text: "The Vice President", isCorrect: true, rationale: "The Vice President's only constitutionally defined role is to serve as President of the Senate and cast a vote in the event of a tie." },
                        { text: "The Senate Majority Leader", isCorrect: false, rationale: "The Majority Leader is a senator and has a regular vote, but not a special tie-breaking one." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The 'War Powers Resolution' was passed to limit the power of which branch of government?",
                    answerOptions: [
                        { text: "The Judicial Branch", isCorrect: false, rationale: "The judiciary is not involved in deploying troops." },
                        { text: "The Legislative Branch", isCorrect: false, rationale: "The act was passed by the legislative branch to limit another branch." },
                        { text: "The Executive Branch", isCorrect: true, rationale: "The War Powers Resolution was enacted to check the President's power to commit the U.S. to an armed conflict without the consent of Congress." },
                        { text: "State Militias", isCorrect: false, rationale: "This federal law applies to the President." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>Federalism is a system of government in which power is divided between a central national government and various state governments. In the United States, the Constitution grants certain powers to the federal government, such as coining money and regulating interstate commerce, while reserving other powers for the states, such as establishing local governments and conducting elections. Some powers, like taxation, are shared by both.</p>",
                    question: "Which of the following is the best example of federalism in action?",
                    answerOptions: [
                        { text: "The President vetoing a bill passed by Congress.", isCorrect: false, rationale: "This is an example of checks and balances between branches, not federalism." },
                        { text: "The federal government operates the Postal Service, while state governments issue driver's licenses.", isCorrect: true, rationale: "This shows a clear division of responsibilities between the national and state governments, which is the essence of federalism." },
                        { text: "The Supreme Court declares a law unconstitutional.", isCorrect: false, rationale: "This is an example of judicial review." },
                        { text: "A citizen votes for both a U.S. Senator and a member of their state legislature.", isCorrect: false, rationale: "While this happens within a federal system, the division of governmental powers is a better example of the principle itself." }
                    ]
                }
            ]
        }
    ]
};
// Social Studies -> Civics and Government -> Rights and Responsibilities
AppData.quizzes.ss_rights_and_responsibilities = {
    id: "ss_rights_and_responsibilities",
    title: "Rights and Responsibilities",
    description: "The rights of U.S. citizens and their civic responsibilities.",
    quizzes: [
        {
            quizId: "ss_rights_and_responsibilities_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which document is the primary source of citizens' rights in the United States?",
                    answerOptions: [
                        { text: "The Declaration of Independence", isCorrect: false, rationale: "The Declaration outlines principles and grievances but does not grant legal rights." },
                        { text: "The Federalist Papers", isCorrect: false, rationale: "These were essays arguing for the Constitution, not a legal document of rights." },
                        { text: "The U.S. Constitution and its amendments", isCorrect: true, rationale: "The Constitution, particularly the Bill of Rights and other amendments, is the foundation of legal rights in the U.S." },
                        { text: "The Mayflower Compact", isCorrect: false, rationale: "This was an early colonial agreement, not the basis for modern U.S. rights." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "Which of the following is considered both a right and a responsibility of a U.S. citizen?",
                    answerOptions: [
                        { text: "Freedom of speech", isCorrect: false, rationale: "This is a fundamental right, but using it responsibly is a civic virtue, not a required responsibility." },
                        { text: "Paying taxes", isCorrect: false, rationale: "This is a legally required duty, not a right." },
                        { text: "Voting in elections", isCorrect: true, rationale: "Citizens have the right to vote, and it is widely considered a key civic responsibility to participate in the democratic process." },
                        { text: "Owning property", isCorrect: false, rationale: "This is a right, not a responsibility." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The First Amendment to the Constitution protects which of these rights?",
                    answerOptions: [
                        { text: "The right to bear arms", isCorrect: false, rationale: "This is protected by the Second Amendment." },
                        { text: "The right to a trial by jury", isCorrect: false, rationale: "This is protected by the Sixth and Seventh Amendments." },
                        { text: "The right to freedom of religion", isCorrect: true, rationale: "The First Amendment protects freedom of speech, religion, press, assembly, and petition." },
                        { text: "The right to be free from unreasonable searches", isCorrect: false, rationale: "This is protected by the Fourth Amendment." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>In the United States, citizens have the right to due process of law, which is protected by the Fifth and Fourteenth Amendments. This principle ensures that the government must respect all legal rights that are owed to a person. It includes the right to a fair and public trial, the right to be notified of the charges against you, and the right to an attorney.</p>",
                    question: "The principle of 'due process' ensures that:",
                    answerOptions: [
                        { text: "citizens can do whatever they want.", isCorrect: false, rationale: "Due process applies to legal proceedings; it does not grant unlimited freedom." },
                        { text: "the government must follow fair legal procedures.", isCorrect: true, rationale: "The passage states that due process means the government 'must respect all legal rights that are owed to a person,' including fair trial procedures." },
                        { text: "all laws are popular with the people.", isCorrect: false, rationale: "Due process is about the application of law, not its popularity." },
                        { text: "citizens are not required to pay taxes.", isCorrect: false, rationale: "Due process does not relate to the obligation to pay taxes." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which of the following is a civic responsibility of a U.S. citizen?",
                    answerOptions: [
                        { text: "Attending a university", isCorrect: false, rationale: "This is an opportunity, not a civic responsibility." },
                        { text: "Staying informed about community issues", isCorrect: true, rationale: "To participate effectively in a democracy, it is a citizen's responsibility to be informed about the issues and candidates." },
                        { text: "Traveling abroad", isCorrect: false, rationale: "This is a right, not a responsibility." },
                        { text: "Earning a high income", isCorrect: false, rationale: "This is a personal goal, not a civic responsibility." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "The Sixth Amendment guarantees a citizen who has been accused of a crime the right to:",
                    answerOptions: [
                        { text: "Freedom from cruel and unusual punishment.", isCorrect: false, rationale: "This is protected by the Eighth Amendment." },
                        { text: "A speedy and public trial.", isCorrect: true, rationale: "The Sixth Amendment outlines the rights of the accused in a criminal prosecution, including the right to a speedy and public trial by an impartial jury." },
                        { text: "Vote in elections.", isCorrect: false, rationale: "Voting rights are addressed in other amendments (e.g., 15th, 19th, 26th)." },
                        { text: "Remain silent to avoid self-incrimination.", isCorrect: false, rationale: "This is part of the Fifth Amendment." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "Which of these is a mandatory civic duty for eligible U.S. citizens?",
                    answerOptions: [
                        { text: "Voting", isCorrect: false, rationale: "Voting is a responsibility and a right, but it is not mandatory by law." },
                        { text: "Volunteering", isCorrect: false, rationale: "Volunteering is encouraged but not mandatory." },
                        { text: "Serving on a jury when called", isCorrect: true, rationale: "Jury duty is a legal obligation. Eligible citizens who are summoned must serve to ensure the right to a trial by a jury of one's peers." },
                        { text: "Joining a political party", isCorrect: false, rationale: "This is a right of association, not a duty." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>The right to freedom of assembly, protected by the First Amendment, allows people to gather peacefully for political, social, or religious purposes. This right is crucial for protests, parades, and public meetings. However, the right is not absolute. The government can place reasonable 'time, place, and manner' restrictions on assemblies to ensure public safety and order, such as requiring a permit for a large protest or preventing a protest from blocking traffic.</p>",
                    question: "According to the passage, the right to freedom of assembly is limited by:",
                    answerOptions: [
                        { text: "the political party of the participants.", isCorrect: false, rationale: "The right applies regardless of political affiliation." },
                        { text: "the requirement that all assemblies must be silent.", isCorrect: false, rationale: "The passage does not mention this restriction." },
                        { text: "reasonable government restrictions on time, place, and manner.", isCorrect: true, rationale: "The passage explicitly states that the government can impose these types of restrictions for public safety." },
                        { text: "the number of people, which cannot exceed 100.", isCorrect: false, rationale: "The passage does not specify a number limit." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The Fourteenth Amendment's 'equal protection clause' is a cornerstone of civil rights. What does it guarantee?",
                    answerOptions: [
                        { text: "That all citizens will have the same income.", isCorrect: false, rationale: "It guarantees equal treatment under the law, not equal economic outcomes." },
                        { text: "That the law will be applied to all people in the same way.", isCorrect: true, rationale: "The equal protection clause means that states cannot deny any person within their jurisdiction the equal protection of the laws, which is the basis for landmark civil rights decisions." },
                        { text: "That all citizens have the right to a job.", isCorrect: false, rationale: "This is not a constitutionally guaranteed right." },
                        { text: "That the federal government and state governments have equal power.", isCorrect: false, rationale: "This relates to federalism, not the equal protection clause." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What is a primary responsibility of a citizen in a democracy?",
                    answerOptions: [
                        { text: "To agree with all government policies.", isCorrect: false, rationale: "Dissent and disagreement are protected rights and part of a healthy democracy." },
                        { text: "To participate in their community and government.", isCorrect: true, rationale: "Participation, such as voting, staying informed, and engaging in civil discourse, is a key responsibility for citizens." },
                        { text: "To serve in the military.", isCorrect: false, rationale: "Military service is voluntary. Registering for the draft (for males) is a duty, but service itself is not a universal responsibility." },
                        { text: "To work for the government.", isCorrect: false, rationale: "This is a career choice, not a civic responsibility." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The Eighth Amendment to the Constitution protects against:",
                    answerOptions: [
                        { text: "The government establishing a national religion.", isCorrect: false, rationale: "This is covered by the First Amendment." },
                        { text: "The government taking private property without just compensation.", isCorrect: false, rationale: "This is covered by the Fifth Amendment." },
                        { text: "Cruel and unusual punishments.", isCorrect: true, rationale: "The Eighth Amendment also prohibits excessive bail and fines." },
                        { text: "Unreasonable searches of a person's home.", isCorrect: false, rationale: "This is covered by the Fourth Amendment." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "What is selective service registration?",
                    answerOptions: [
                        { text: "A process for volunteering for community service.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "A system for U.S. male citizens (and immigrants) to register for a potential military draft.", isCorrect: true, rationale: "It is a legal duty for eligible males to register with the Selective Service System when they turn 18." },
                        { text: "The process of registering to vote in elections.", isCorrect: false, rationale: "Voter registration is a separate process." },
                        { text: "A program for choosing who serves on a jury.", isCorrect: false, rationale: "Jurors are selected from other lists, such as voter registration and driver's license records." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>The right to petition the government for a redress of grievances, found in the First Amendment, is a foundational democratic right. It allows citizens and groups to bring their concerns to the attention of government officials and to ask for changes in law or policy without fear of punishment. This can take the form of signing a petition, writing letters to elected officials, or organizing a lobby group.</p>",
                    question: "The right to petition allows citizens to:",
                    answerOptions: [
                        { text: "Refuse to pay their taxes.", isCorrect: false, rationale: "This is not protected by the right to petition and is illegal." },
                        { text: "Disobey laws they disagree with.", isCorrect: false, rationale: "The right to petition is a way to try to change laws, not a right to disobey them." },
                        { text: "Express their concerns to the government and ask for action.", isCorrect: true, rationale: "The passage defines this right as allowing citizens 'to bring their concerns to the attention of government officials and to ask for changes'." },
                        { text: "Overthrow the government by force.", isCorrect: false, rationale: "The right to petition is a peaceful means of seeking change within the system." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Which action is an example of respecting the rights of others?",
                    answerOptions: [
                        { text: "Shouting down a speaker you disagree with.", isCorrect: false, rationale: "This infringes on the speaker's right to freedom of speech." },
                        { text: "Listening to a viewpoint different from your own.", isCorrect: true, rationale: "Respecting others' rights includes allowing for the expression of different opinions, which is a key part of civil discourse." },
                        { text: "Vandalizing a political opponent's campaign signs.", isCorrect: false, rationale: "This is a violation of property rights and freedom of expression." },
                        { text: "Spreading unverified rumors online.", isCorrect: false, rationale: "This can be irresponsible and harmful to others." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The principle that a person is 'innocent until proven guilty' is a fundamental part of:",
                    answerOptions: [
                        { text: "The election process.", isCorrect: false, rationale: "This principle applies to the legal system." },
                        { text: "The right to due process.", isCorrect: true, rationale: "The presumption of innocence places the burden of proof on the prosecution and is a core component of a fair trial under the due process clauses." },
                        { text: "The right to vote.", isCorrect: false, rationale: "This principle does not relate to voting." },
                        { text: "The right to free speech.", isCorrect: false, rationale: "This principle does not relate to free speech." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_rights_and_responsibilities_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "The right to vote is also known as:",
                    answerOptions: [
                        { text: "Suffrage", isCorrect: true, rationale: "Suffrage is the legal right to vote in public elections." },
                        { text: "Federalism", isCorrect: false, rationale: "Federalism is the division of power between levels of government." },
                        { text: "Due process", isCorrect: false, rationale: "Due process refers to fair legal procedures." },
                        { text: "Sovereignty", isCorrect: false, rationale: "Sovereignty is supreme power or authority." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "Which of the following is a legal duty required of every U.S. citizen?",
                    answerOptions: [
                        { text: "To attend college", isCorrect: false, rationale: "This is a personal choice, not a legal duty." },
                        { text: "To obey the law", isCorrect: true, rationale: "Obeying federal, state, and local laws is a mandatory duty for all citizens and residents." },
                        { text: "To volunteer in the community", isCorrect: false, rationale: "This is a civic responsibility, but it is not required by law." },
                        { text: "To vote in all elections", isCorrect: false, rationale: "Voting is a right and responsibility, but it is not a legal duty in the U.S." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The Fifth Amendment protects an accused person from self-incrimination. This is commonly known as the right to:",
                    answerOptions: [
                        { text: "An attorney", isCorrect: false, rationale: "The right to an attorney is guaranteed by the Sixth Amendment." },
                        { text: "A speedy trial", isCorrect: false, rationale: "This is also part of the Sixth Amendment." },
                        { text: "Remain silent", isCorrect: true, rationale: "This right ensures that individuals cannot be forced to provide testimony that might be used against them in a criminal trial." },
                        { text: "Freedom of speech", isCorrect: false, rationale: "This is part of the First Amendment." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>Civic participation can take many forms. Voting is one of the most fundamental ways to participate in a democracy. Other forms include attending public meetings, contacting elected officials, volunteering for a political campaign, and staying informed about current events. These actions allow citizens to make their voices heard and to hold their leaders accountable.</p>",
                    question: "Which of the following is an example of civic participation described in the passage?",
                    answerOptions: [
                        { text: "Paying your property taxes", isCorrect: false, rationale: "This is a legal duty, not a form of participation as described." },
                        { text: "Contacting an elected official", isCorrect: true, rationale: "The passage explicitly lists 'contacting elected officials' as a form of participation." },
                        { text: "Running a successful business", isCorrect: false, rationale: "This contributes to the economy but is not a form of civic or political participation." },
                        { text: "Obeying traffic laws", isCorrect: false, rationale: "This is a legal duty." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What does the 'establishment clause' of the First Amendment prevent the government from doing?",
                    answerOptions: [
                        { text: "Restricting the press", isCorrect: false, rationale: "This is prevented by the 'free press' clause." },
                        { text: "Creating a national, government-endorsed religion", isCorrect: true, rationale: "The establishment clause prohibits the government from establishing an official religion, ensuring a separation of church and state." },
                        { text: "Preventing peaceful protests", isCorrect: false, rationale: "This is prevented by the 'freedom of assembly' clause." },
                        { text: "Taking property without compensation", isCorrect: false, rationale: "This is prevented by the Fifth Amendment." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Which of the following is a responsibility that comes with the right to freedom of speech?",
                    answerOptions: [
                        { text: "The responsibility to say only things the government agrees with.", isCorrect: false, rationale: "Freedom of speech specifically protects the right to criticize the government." },
                        { text: "The responsibility to not use speech to incite violence or harm others.", isCorrect: true, rationale: "Rights are not absolute. The right to free speech does not protect libel, slander, or incitement to violence, and citizens have a responsibility to use their rights in a way that does not infringe on the safety and rights of others." },
                        { text: "The responsibility to speak loudly at all times.", isCorrect: false, rationale: "This is not a responsibility." },
                        { text: "The responsibility to run for political office.", isCorrect: false, rationale: "This is a right, not a responsibility tied to free speech." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "The idea that the government cannot take a person's life, liberty, or property without following fair legal steps is known as:",
                    answerOptions: [
                        { text: "Popular sovereignty", isCorrect: false, rationale: "This is the idea that power comes from the people." },
                        { text: "Due process of law", isCorrect: true, rationale: "This principle, found in the 5th and 14th Amendments, ensures that legal proceedings are fair and that citizens are not arbitrarily deprived of their rights." },
                        { text: "Checks and balances", isCorrect: false, rationale: "This is the system of powers between government branches." },
                        { text: "Eminent domain", isCorrect: false, rationale: "Eminent domain is the government's right to take private property for public use, but it requires 'just compensation' as part of due process." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>The 19th Amendment to the U.S. Constitution, ratified in 1920, was a landmark victory for the women's suffrage movement. It states that 'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex.' This amendment effectively granted American women the right to vote in all elections.</p>",
                    question: "What right did the 19th Amendment secure?",
                    answerOptions: [
                        { text: "The right to freedom of speech", isCorrect: false, rationale: "This is secured by the First Amendment." },
                        { text: "The right for all men to vote regardless of race", isCorrect: false, rationale: "This was the purpose of the 15th Amendment." },
                        { text: "The right for women to vote", isCorrect: true, rationale: "The passage clearly states that the 19th Amendment granted American women the right to vote." },
                        { text: "The right for citizens aged 18 and older to vote", isCorrect: false, rationale: "This was established by the 26th Amendment." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Which of the following is an example of a citizen exercising their right to freedom of the press?",
                    answerOptions: [
                        { text: "A citizen serves on a jury.", isCorrect: false, rationale: "This is a civic duty." },
                        { text: "A journalist publishes an article critical of a government policy.", isCorrect: true, rationale: "Freedom of the press protects the right of journalists and the public to report news and express opinions without government censorship." },
                        { text: "A citizen votes in a presidential election.", isCorrect: false, rationale: "This is exercising the right to vote." },
                        { text: "A citizen attends a peaceful protest.", isCorrect: false, rationale: "This is exercising the right to freedom of assembly." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "To be a responsible citizen, one should:",
                    answerOptions: [
                        { text: "Pay taxes, serve on juries, and respect the law.", isCorrect: true, rationale: "These are core duties and responsibilities of citizenship." },
                        { text: "Only vote for the winning candidate.", isCorrect: false, rationale: "The responsibility is to participate by voting, regardless of the outcome." },
                        { text: "Only obey laws that one personally agrees with.", isCorrect: false, rationale: "The rule of law requires obeying all laws." },
                        { text: "Avoid all involvement in politics.", isCorrect: false, rationale: "A responsible citizen is typically an engaged and informed one." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures' is protected by which amendment?",
                    answerOptions: [
                        { text: "The First Amendment", isCorrect: false, rationale: "This amendment protects freedoms of expression." },
                        { text: "The Fourth Amendment", isCorrect: true, rationale: "This is the main provision of the Fourth Amendment, which generally requires a warrant for government searches." },
                        { text: "The Sixth Amendment", isCorrect: false, rationale: "This amendment deals with the rights of the accused in a criminal trial." },
                        { text: "The Tenth Amendment", isCorrect: false, rationale: "This amendment deals with powers reserved to the states and the people." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Which of the following is a way U.S. citizens can influence their government?",
                    answerOptions: [
                        { text: "By ignoring election results.", isCorrect: false, rationale: "This is not a way to influence government." },
                        { text: "By writing to their elected representatives.", isCorrect: true, rationale: "Contacting officials is a direct way to express opinions and influence policy decisions." },
                        { text: "By refusing to serve on a jury.", isCorrect: false, rationale: "This is a failure to perform a civic duty and is illegal." },
                        { text: "By refusing to pay federal income tax.", isCorrect: false, rationale: "This is illegal and not a legitimate way to influence government." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>Allegiance means loyalty. In the United States, citizens are expected to show allegiance to the country. This is symbolized by the Pledge of Allegiance to the flag and the promise to 'support and defend the Constitution and laws of the United States of America' when becoming a naturalized citizen or serving in a government or military role.</p>",
                    question: "Pledging allegiance as a U.S. citizen primarily means showing loyalty to:",
                    answerOptions: [
                        { text: "a particular political party.", isCorrect: false, rationale: "Allegiance is to the country and its principles, not a party." },
                        { text: "the current President.", isCorrect: false, rationale: "Allegiance is to the office and the Constitution, not the individual holding the office." },
                        { text: "the Constitution and the laws of the country.", isCorrect: true, rationale: "The passage explicitly links allegiance to the promise to 'support and defend the Constitution and laws'." },
                        { text: "the state where one resides.", isCorrect: false, rationale: "While citizens are subject to state laws, their primary allegiance is to the nation." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The 26th Amendment lowered the voting age to 18. This was largely a response to what historical circumstance?",
                    answerOptions: [
                        { text: "The Great Depression", isCorrect: false, rationale: "This was a different era with different political issues." },
                        { text: "The fact that 18-year-olds were being drafted to fight in the Vietnam War.", isCorrect: true, rationale: "The argument 'old enough to fight, old enough to vote' was a powerful driver for the passage of the 26th Amendment." },
                        { text: "The women's suffrage movement", isCorrect: false, rationale: "This led to the 19th Amendment." },
                        { text: "The Civil Rights Movement of the 1960s", isCorrect: false, rationale: "The Civil Rights Movement was focused on ending racial discrimination, which led to other voting rights legislation like the Voting Rights Act of 1965." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "What is the difference between a civic responsibility and a civic duty?",
                    answerOptions: [
                        { text: "There is no difference.", isCorrect: false, rationale: "The terms have distinct meanings in civics." },
                        { text: "Duties are required by law, while responsibilities are things a citizen should do voluntarily.", isCorrect: true, rationale: "For example, paying taxes is a duty, while voting is a responsibility. One is legally mandatory, the other is a voluntary but important part of good citizenship." },
                        { text: "Responsibilities are for all residents, while duties are only for citizens.", isCorrect: false, rationale: "Both residents and citizens have certain duties (like obeying the law) and responsibilities." },
                        { text: "Duties relate to the federal government, while responsibilities relate to state government.", isCorrect: false, rationale: "This is not the correct distinction." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_rights_and_responsibilities_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which of these is a right guaranteed by the Bill of Rights?",
                    answerOptions: [
                        { text: "The right to a public education", isCorrect: false, rationale: "While education is provided by states, it is not a right guaranteed in the Bill of Rights." },
                        { text: "The right to a fair trial", isCorrect: true, rationale: "Several amendments, particularly the Sixth, protect the rights of the accused, including the right to a speedy, public, and impartial trial." },
                        { text: "The right to a government job", isCorrect: false, rationale: "This is not a guaranteed right." },
                        { text: "The right to own a car", isCorrect: false, rationale: "This is not a constitutional right." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "One of the responsibilities of citizenship is to tolerate and respect the beliefs of others. This is important in a diverse society in order to:",
                    answerOptions: [
                        { text: "ensure that everyone thinks the same way.", isCorrect: false, rationale: "The goal is to coexist peacefully despite differences, not to eliminate them." },
                        { text: "maintain a peaceful and functioning democracy.", isCorrect: true, rationale: "Respect for diverse viewpoints is essential for civil discourse and the peaceful operation of a democratic society." },
                        { text: "prove that your own beliefs are superior.", isCorrect: false, rationale: "This is the opposite of tolerance and respect." },
                        { text: "make sure no one ever criticizes the government.", isCorrect: false, rationale: "Criticism of the government is a protected right." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The 'free exercise' clause of the First Amendment protects a citizen's right to practice their religion as they please, so long as the practice does not run afoul of 'public morals' or a 'compelling governmental interest.' For example, the government cannot prevent someone from attending a religious service, but it can prohibit religious practices that involve criminal activity.</p>",
                    question: "The 'free exercise' clause protects which right?",
                    answerOptions: [
                        { text: "The right to any form of speech", isCorrect: false, rationale: "This is covered by the 'freedom of speech' clause." },
                        { text: "The right to practice one's religion", isCorrect: true, rationale: "The passage defines this clause as protecting a citizen's right to 'practice their religion as they please,' within certain limits." },
                        { text: "The right to a jury trial", isCorrect: false, rationale: "This is protected by the Sixth Amendment." },
                        { text: "The right to own property", isCorrect: false, rationale: "This is protected by the Fifth Amendment." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "Which action is an example of fulfilling a civic responsibility?",
                    answerOptions: [
                        { text: "Paying your electricity bill", isCorrect: false, rationale: "This is a personal financial responsibility." },
                        { text: "Volunteering at a local food bank", isCorrect: true, rationale: "Contributing to the well-being of the community is a key civic responsibility." },
                        { text: "Going on vacation", isCorrect: false, rationale: "This is a personal activity." },
                        { text: "Buying a new television", isCorrect: false, rationale: "This is a consumer choice." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The phrase 'pleading the Fifth' refers to a person's right to:",
                    answerOptions: [
                        { text: "confront their accuser in court.", isCorrect: false, rationale: "This is a Sixth Amendment right." },
                        { text: "avoid self-incrimination.", isCorrect: true, rationale: "The Fifth Amendment protects individuals from being compelled to be a witness against themselves in a criminal case." },
                        { text: "practice their religion freely.", isCorrect: false, rationale: "This is a First Amendment right." },
                        { text: "speak freely without censorship.", isCorrect: false, rationale: "This is a First Amendment right." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Naturalization is the process by which:",
                    answerOptions: [
                        { text: "A person born in the U.S. claims their citizenship.", isCorrect: false, rationale: "Citizenship by birth in the U.S. is automatic (jus soli)." },
                        { text: "An immigrant to the United States can become a U.S. citizen.", isCorrect: true, rationale: "Naturalization is the legal process that grants citizenship to a foreign citizen or national after they fulfill the requirements established by Congress." },
                        { text: "A citizen registers to vote.", isCorrect: false, rationale: "This is voter registration." },
                        { text: "A citizen is called for jury duty.", isCorrect: false, rationale: "This is a jury summons." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>Freedom of the press is a right guaranteed by the First Amendment. It ensures that journalists and media organizations can report on the actions of the government and on public affairs without censorship or fear of reprisal. A free press is considered a vital 'watchdog' that holds powerful people and institutions accountable to the public.</p>",
                    question: "What is the 'watchdog' role of the press described in the passage?",
                    answerOptions: [
                        { text: "To only report stories that the government approves.", isCorrect: false, rationale: "The passage states the press can report without censorship." },
                        { text: "To entertain the public with celebrity news.", isCorrect: false, rationale: "While some media does this, the 'watchdog' role refers to public affairs." },
                        { text: "To hold the government and other powerful entities accountable.", isCorrect: true, rationale: "The passage explicitly defines the 'watchdog' role as holding 'powerful people and institutions accountable to the public.'" },
                        { text: "To create propaganda to support the government.", isCorrect: false, rationale: "This is the opposite of the watchdog role." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "Which of the following is a legal duty for U.S. citizens aged 18-25 who are male?",
                    answerOptions: [
                        { text: "Serving in the military for two years", isCorrect: false, rationale: "Military service is voluntary." },
                        { text: "Registering with the Selective Service System", isCorrect: true, rationale: "Nearly all male U.S. citizens and male immigrants must register for a potential military draft when they turn 18." },
                        { text: "Voting in every presidential election", isCorrect: false, rationale: "Voting is a responsibility, not a mandatory duty." },
                        { text: "Joining a local militia", isCorrect: false, rationale: "This is not a legal duty." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The right to due process, the right to a jury trial, and the right to legal counsel are all protections for:",
                    answerOptions: [
                        { text: "Individuals accused of a crime.", isCorrect: true, rationale: "These rights, found in the 5th and 6th Amendments, are fundamental to ensuring a fair criminal justice system." },
                        { text: "The President of the United States.", isCorrect: false, rationale: "These rights apply to all individuals, not just the President." },
                        { text: "State governments.", isCorrect: false, rationale: "These are rights of individuals against the government." },
                        { text: "The press.", isCorrect: false, rationale: "The press has specific rights under the First Amendment." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "A citizen's right to privacy is primarily derived from which amendment's protection against unreasonable government intrusion?",
                    answerOptions: [
                        { text: "First Amendment", isCorrect: false, rationale: "This protects expression." },
                        { text: "Second Amendment", isCorrect: false, rationale: "This protects the right to bear arms." },
                        { text: "Fourth Amendment", isCorrect: true, rationale: "The protection against 'unreasonable searches and seizures' is the primary constitutional basis for the right to privacy." },
                        { text: "Eighth Amendment", isCorrect: false, rationale: "This protects against cruel and unusual punishment." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "Which of the following is a key responsibility of a citizen?",
                    answerOptions: [
                        { text: "To become wealthy.", isCorrect: false, rationale: "This is a personal goal." },
                        { text: "To respect and obey laws.", isCorrect: true, rationale: "Respecting the rule of law is a fundamental responsibility of citizenship." },
                        { text: "To run for public office.", isCorrect: false, rationale: "This is a right and a high level of civic engagement, but not a basic responsibility for all citizens." },
                        { text: "To own a home.", isCorrect: false, rationale: "This is a personal goal." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "text",
                    passage: "<p>The 15th Amendment (1870) states that the right of citizens to vote 'shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude.' While this was a major step, many states used other means, like poll taxes and literacy tests, to disenfranchise African American voters for many decades afterward.</p>",
                    question: "What right did the 15th Amendment aim to protect?",
                    answerOptions: [
                        { text: "The right of women to vote", isCorrect: false, rationale: "This was the 19th Amendment." },
                        { text: "The right of all citizens to freedom of speech", isCorrect: false, rationale: "This is the First Amendment." },
                        { text: "The right of men to vote regardless of their race", isCorrect: true, rationale: "The amendment explicitly prohibits denying the vote based on 'race, color, or previous condition of servitude.'" },
                        { text: "The right of 18-year-olds to vote", isCorrect: false, rationale: "This was the 26th Amendment." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Which of these actions is a way for a citizen to be civically engaged?",
                    answerOptions: [
                        { text: "Watching a fictional TV show", isCorrect: false, rationale: "This is entertainment." },
                        { text: "Attending a city council meeting", isCorrect: true, rationale: "Participating in or observing local government is a direct form of civic engagement." },
                        { text: "Shopping at a local business", isCorrect: false, rationale: "This supports the local economy but is not civic engagement." },
                        { text: "Following a celebrity on social media", isCorrect: false, rationale: "This is a social activity." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The right to 'take the Fifth' protects an individual from:",
                    answerOptions: [
                        { text: "Being tried for the same crime twice (double jeopardy).", isCorrect: false, rationale: "This is another right protected by the Fifth Amendment, but it is not what 'taking the Fifth' refers to." },
                        { text: "Being forced to testify against oneself.", isCorrect: true, rationale: "This right against self-incrimination allows a person to refuse to answer questions that might incriminate them." },
                        { text: "Having their property taken without compensation.", isCorrect: false, rationale: "This is another right protected by the Fifth Amendment." },
                        { text: "Being denied freedom of speech.", isCorrect: false, rationale: "This is a First Amendment right." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Which of the following best describes the relationship between rights and responsibilities?",
                    answerOptions: [
                        { text: "They are unrelated concepts.", isCorrect: false, rationale: "Rights and responsibilities are closely linked in a democracy." },
                        { text: "For the government to protect our rights, citizens must fulfill their responsibilities.", isCorrect: true, rationale: "A functioning democracy that can protect rights depends on citizens participating, obeying laws, respecting others, and serving when required." },
                        { text: "Having rights means you do not have any responsibilities.", isCorrect: false, rationale: "This is incorrect; rights come with responsibilities." },
                        { text: "You only have responsibilities if you are an elected official.", isCorrect: false, rationale: "All citizens have responsibilities." }
                    ]
                }
            ]
        }
    ]
};
// Social Studies -> U.S. History -> Colonial Period and the American Revolution
AppData.quizzes.ss_colonial_period_revolution = {
    id: "ss_colonial_period_revolution",
    title: "Colonial Period and the American Revolution",
    description: "Early colonization, causes of the revolution, and the founding of the nation.",
    quizzes: [
        {
            quizId: "ss_colonial_period_revolution_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What was the primary reason for the founding of the Jamestown colony in 1607?",
                    answerOptions: [
                        { text: "To seek religious freedom.", isCorrect: false, rationale: "Religious freedom was the primary motivation for colonies like Plymouth and Massachusetts Bay, but not Jamestown." },
                        { text: "To establish a military outpost against the Spanish.", isCorrect: false, rationale: "While defense was a concern, it was not the primary reason." },
                        { text: "As a commercial venture to find gold and other valuable resources.", isCorrect: true, rationale: "Jamestown was founded by the Virginia Company of London with the goal of making a profit for its investors." },
                        { text: "To create a penal colony for British prisoners.", isCorrect: false, rationale: "The colony of Georgia had this as one of its functions, but not Jamestown." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "The slogan 'No taxation without representation' was a key grievance of the American colonists. What did it mean?",
                    answerOptions: [
                        { text: "They did not want to pay any taxes at all.", isCorrect: false, rationale: "The colonists were not against taxation in principle, but against being taxed by a government in which they had no voice." },
                        { text: "They believed they should not be taxed by the British Parliament because they had no elected officials to represent them.", isCorrect: true, rationale: "This was the core of the issue; colonists argued that taxes could only be levied by their own colonial legislatures." },
                        { text: "They wanted to be represented by the King, not Parliament.", isCorrect: false, rationale: "Their grievance was with the entire system of being governed from afar without representation." },
                        { text: "They believed taxes were only fair if they were used for local projects.", isCorrect: false, rationale: "The issue was the legitimacy of the taxing authority, not how the money was spent." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The Boston Tea Party in 1773 was a political protest by the Sons of Liberty in Boston. Disguised as Native Americans, the demonstrators destroyed an entire shipment of tea sent by the East India Company in defiance of the Tea Act. The British government responded harshly to this event with a series of punitive laws known as the Coercive Acts (or Intolerable Acts), which further inflamed tensions between Britain and the colonies.</p>",
                    question: "What was the immediate British response to the Boston Tea Party?",
                    answerOptions: [
                        { text: "They lowered the tax on tea.", isCorrect: false, rationale: "Their response was punitive, not conciliatory." },
                        { text: "They granted the colonies representation in Parliament.", isCorrect: false, rationale: "This was the colonists' demand, but it was not granted." },
                        { text: "They passed a series of harsh, punitive laws known as the Coercive Acts.", isCorrect: true, rationale: "The passage states, 'The British government responded harshly...with a series of punitive laws known as the Coercive Acts'." },
                        { text: "They declared war on the colonies.", isCorrect: false, rationale: "While the Acts were a major step towards war, the formal declaration of war came later." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "Who was the primary author of the Declaration of Independence?",
                    answerOptions: [
                        { text: "George Washington", isCorrect: false, rationale: "George Washington was the commander of the Continental Army and later the first President." },
                        { text: "Benjamin Franklin", isCorrect: false, rationale: "Benjamin Franklin was a key diplomat and statesman who helped edit the document." },
                        { text: "Thomas Jefferson", isCorrect: true, rationale: "Thomas Jefferson was chosen by the Committee of Five to be the principal author of the Declaration." },
                        { text: "John Adams", isCorrect: false, rationale: "John Adams was a leading advocate for independence and served on the drafting committee." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The first battles of the American Revolutionary War were fought in which two towns?",
                    answerOptions: [
                        { text: "Boston and New York", isCorrect: false, rationale: "Boston was a center of revolutionary activity, but the first shots were fired elsewhere." },
                        { text: "Lexington and Concord", isCorrect: true, rationale: "The 'shot heard 'round the world' was fired at Lexington on April 19, 1775, as British troops marched to Concord to seize colonial military supplies." },
                        { text: "Philadelphia and Yorktown", isCorrect: false, rationale: "Philadelphia was where the Declaration was signed, and Yorktown was the site of the final major battle." },
                        { text: "Saratoga and Trenton", isCorrect: false, rationale: "These were important battles, but not the first of the war." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "What was the main purpose of the Stamp Act of 1765?",
                    answerOptions: [
                        { text: "To regulate the postal service.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "To place a direct tax on the American colonies for printed materials.", isCorrect: true, rationale: "The Act required that many printed materials in the colonies, such as legal documents, magazines, and newspapers, be produced on stamped paper from London, carrying an embossed revenue stamp." },
                        { text: "To encourage trade between the colonies and France.", isCorrect: false, rationale: "British policy aimed to restrict, not encourage, trade with its rival, France." },
                        { text: "To create a colonial parliament.", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>The triangular trade was a complex transatlantic trading network that connected Europe, Africa, and the Americas. European ships would carry manufactured goods to Africa, where they would be exchanged for enslaved Africans. These enslaved people were then transported across the Atlantic in the brutal 'Middle Passage' to the Americas. In the Americas, they were sold, and the ships were loaded with raw materials, such as sugar, cotton, and tobacco, for the return trip to Europe.</p>",
                    question: "What was transported from Africa to the Americas in the 'Middle Passage'?",
                    answerOptions: [
                        { text: "Manufactured goods", isCorrect: false, rationale: "Manufactured goods were transported from Europe to Africa." },
                        { text: "Raw materials like sugar and cotton", isCorrect: false, rationale: "Raw materials were transported from the Americas to Europe." },
                        { text: "Enslaved Africans", isCorrect: true, rationale: "The passage explicitly states that enslaved Africans were transported across the Atlantic in the 'Middle Passage'." },
                        { text: "Gold and silver", isCorrect: false, rationale: "The passage does not mention gold and silver as the primary cargo on this leg of the trade." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "Who were the Pilgrims?",
                    answerOptions: [
                        { text: "English colonists who founded the Jamestown settlement for commercial purposes.", isCorrect: false, rationale: "This describes the Jamestown settlers." },
                        { text: "English Separatists who founded the Plymouth Colony to seek religious freedom.", isCorrect: true, rationale: "The Pilgrims were a group of Puritans who had separated from the Church of England and sought a place to practice their faith freely." },
                        { text: "French explorers who mapped the Mississippi River.", isCorrect: false, rationale: "The Pilgrims were English." },
                        { text: "Spanish missionaries who established settlements in California.", isCorrect: false, rationale: "The Pilgrims were English and settled in New England." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The Battle of Saratoga is considered a turning point in the Revolutionary War because:",
                    answerOptions: [
                        { text: "It was the first major battle of the war.", isCorrect: false, rationale: "The first battles were at Lexington and Concord." },
                        { text: "It was the final battle where the British surrendered.", isCorrect: false, rationale: "The final major battle was at Yorktown." },
                        { text: "It convinced France to formally ally with the United States.", isCorrect: true, rationale: "The decisive American victory at Saratoga showed that the colonists could win, which persuaded France to provide crucial military and financial support." },
                        { text: "It led to the capture of George Washington.", isCorrect: false, rationale: "George Washington was never captured." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What was the primary crop that saved the Jamestown colony and made it profitable?",
                    answerOptions: [
                        { text: "Corn", isCorrect: false, rationale: "Corn was a vital food source, but it was not the major cash crop." },
                        { text: "Cotton", isCorrect: false, rationale: "Cotton became a major crop in the South much later." },
                        { text: "Tobacco", isCorrect: true, rationale: "The cultivation of a marketable strain of tobacco by John Rolfe turned the struggling colony into a profitable enterprise." },
                        { text: "Sugar", isCorrect: false, rationale: "Sugar was primarily grown in the Caribbean, not Virginia." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>The French and Indian War (1754-1763), known in Europe as the Seven Years' War, was fought between Great Britain and France for control of North America. Although Britain was victorious and gained a vast amount of new territory, the war was extremely expensive. To pay off its war debts, the British government began imposing new taxes on the American colonies, which was a direct cause of the tensions that led to the American Revolution.</p>",
                    question: "What was a major consequence of the French and Indian War?",
                    answerOptions: [
                        { text: "France gained control of Canada.", isCorrect: false, rationale: "The passage states that Britain was victorious and gained territory." },
                        { text: "The British government began imposing new taxes on the colonies to pay for the war.", isCorrect: true, rationale: "The passage explicitly links the war debt to the new taxes that angered the colonists." },
                        { text: "The American colonies declared independence immediately after the war.", isCorrect: false, rationale: "The war's consequences led to the revolution, but independence was not declared immediately." },
                        { text: "The thirteen colonies were given to France.", isCorrect: false, rationale: "Britain won the war." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "The Mayflower Compact, signed by the Pilgrims in 1620, is significant because it was:",
                    answerOptions: [
                        { text: "A declaration of war against England.", isCorrect: false, rationale: "It was an agreement to form a government, not a declaration of war." },
                        { text: "A peace treaty with Native American tribes.", isCorrect: false, rationale: "It was an internal agreement among the colonists." },
                        { text: "An early form of self-government and a social contract.", isCorrect: true, rationale: "The signers agreed to create and obey their own laws for the good of the colony, establishing a foundation for self-rule." },
                        { text: "A charter for a profitable trading company.", isCorrect: false, rationale: "This describes the charter for a colony like Jamestown." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "What was the purpose of Thomas Paine's pamphlet, 'Common Sense'?",
                    answerOptions: [
                        { text: "To argue for reconciliation with Great Britain.", isCorrect: false, rationale: "It argued for the opposite." },
                        { text: "To advocate for the cause of American independence in plain language.", isCorrect: true, rationale: "'Common Sense' was a hugely influential pamphlet that used clear, simple arguments to persuade the common people to support independence from Britain." },
                        { text: "To propose a new form of government under the Articles of Confederation.", isCorrect: false, rationale: "It focused on the need to break away, not the specifics of a new government." },
                        { text: "To protest the Stamp Act.", isCorrect: false, rationale: "While Paine opposed British taxation, the pamphlet's main goal was to argue for full independence." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The final major battle of the American Revolution, where Lord Cornwallis surrendered to George Washington, was fought at:",
                    answerOptions: [
                        { text: "Saratoga", isCorrect: false, rationale: "Saratoga was a turning point, but not the final battle." },
                        { text: "Bunker Hill", isCorrect: false, rationale: "This was an early battle near Boston." },
                        { text: "Yorktown", isCorrect: true, rationale: "The siege of Yorktown in 1781, with the help of the French fleet, led to the surrender of the main British army and effectively ended the war." },
                        { text: "Trenton", isCorrect: false, rationale: "This was a crucial victory, but it occurred in 1776." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Who were the Loyalists during the American Revolution?",
                    answerOptions: [
                        { text: "Colonists who remained loyal to Great Britain.", isCorrect: true, rationale: "Loyalists, also known as Tories, opposed the revolution and wished to remain part of the British Empire." },
                        { text: "Soldiers in the Continental Army.", isCorrect: false, rationale: "These soldiers were fighting for independence." },
                        { text: "French citizens who supported the American cause.", isCorrect: false, rationale: "These were foreign allies, not colonists." },
                        { text: "Members of the Sons of Liberty.", isCorrect: false, rationale: "The Sons of Liberty were Patriots who advocated for independence." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_colonial_period_revolution_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which colonial region's economy was most dependent on shipbuilding, fishing, and trade?",
                    answerOptions: [
                        { text: "The New England Colonies", isCorrect: true, rationale: "Due to rocky soil and a harsh climate, New England's economy was based on the sea (fishing, whaling, shipbuilding) and commerce." },
                        { text: "The Middle Colonies", isCorrect: false, rationale: "The Middle Colonies were known as the 'breadbasket' for their grain production." },
                        { text: "The Southern Colonies", isCorrect: false, rationale: "The Southern Colonies' economy was based on large-scale agriculture of cash crops like tobacco and rice." },
                        { text: "The Western Frontier", isCorrect: false, rationale: "The frontier economy was based on small-scale farming and fur trapping." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "The Quartering Act was a British law that required American colonists to:",
                    answerOptions: [
                        { text: "Pay a tax on one-quarter of their income.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "Serve in the British army for one-quarter of the year.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "Provide housing and supplies for British soldiers.", isCorrect: true, rationale: "The Act was a major source of resentment as it forced colonists to house and feed soldiers in their homes and public buildings." },
                        { text: "Give one-quarter of their crops to the British government.", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The first government of the United States was established by the Articles of Confederation. It created a weak national government that lacked the power to tax or raise a national army effectively. These weaknesses became clear during events like Shays' Rebellion, an armed uprising in Massachusetts. The inability of the national government to respond to the crisis highlighted the need for a stronger central government, leading to the Constitutional Convention.</p>",
                    question: "What document established the first, weak government of the United States after the revolution?",
                    answerOptions: [
                        { text: "The Declaration of Independence", isCorrect: false, rationale: "This document declared independence but did not create a system of government." },
                        { text: "The Bill of Rights", isCorrect: false, rationale: "This was added to the Constitution later." },
                        { text: "The Articles of Confederation", isCorrect: true, rationale: "The passage identifies the Articles as the first government and details its weaknesses." },
                        { text: "The U.S. Constitution", isCorrect: false, rationale: "The Constitution replaced the Articles of Confederation to create a stronger government." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "Who was the commander of the Continental Army during the American Revolution?",
                    answerOptions: [
                        { text: "Thomas Jefferson", isCorrect: false, rationale: "Jefferson was a statesman and the primary author of the Declaration of Independence." },
                        { text: "John Hancock", isCorrect: false, rationale: "Hancock was a merchant, statesman, and the first to sign the Declaration of Independence." },
                        { text: "George Washington", isCorrect: true, rationale: "Washington was appointed as the commander-in-chief of the Continental Army in 1775 and led it throughout the war." },
                        { text: "Paul Revere", isCorrect: false, rationale: "Revere was a patriot famous for his midnight ride, but he was not the army's commander." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The 'shot heard 'round the world' refers to the first shot fired at:",
                    answerOptions: [
                        { text: "The Battle of Yorktown", isCorrect: false, rationale: "This was the last major battle." },
                        { text: "The Boston Massacre", isCorrect: false, rationale: "This was a deadly riot, but it occurred before the war began." },
                        { text: "The Battle of Lexington", isCorrect: true, rationale: "This phrase describes the beginning of open armed conflict between the colonists and British troops at Lexington and Concord." },
                        { text: "The Battle of Bunker Hill", isCorrect: false, rationale: "This was an early and significant battle, but not the first." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "text",
                    passage: "<p>The Proclamation of 1763, issued by King George III after the French and Indian War, forbade American colonists from settling west of the Appalachian Mountains. The British government intended this measure to prevent costly conflicts with Native American tribes in the newly acquired territories. However, many colonists, who believed they had fought for the right to expand westward, viewed the proclamation as a tyrannical limit on their freedom.</p>",
                    question: "What was the purpose of the Proclamation of 1763?",
                    answerOptions: [
                        { text: "To encourage colonists to settle in the Ohio River Valley.", isCorrect: false, rationale: "It did the opposite; it forbade settlement there." },
                        { text: "To prevent conflicts between colonists and Native Americans by limiting westward expansion.", isCorrect: true, rationale: "The passage states the British intended the measure 'to prevent costly conflicts with Native American tribes'." },
                        { text: "To create a new tax on land purchases.", isCorrect: false, rationale: "The proclamation was about settlement boundaries, not taxation." },
                        { text: "To grant Native American tribes representation in colonial governments.", isCorrect: false, rationale: "This was not a provision of the proclamation." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "Which of the following was a reason for the colonists' victory in the American Revolution?",
                    answerOptions: [
                        { text: "The British army was small and poorly trained.", isCorrect: false, rationale: "The British army was one of the most powerful and professional armies in the world at the time." },
                        { text: "The colonists had a superior navy.", isCorrect: false, rationale: "The colonists had a very small navy; naval superiority was a major British advantage until the French alliance." },
                        { text: "The colonists were fighting on their own land and had strong leadership.", isCorrect: true, rationale: "Advantages such as familiarity with the terrain, the leadership of George Washington, and a strong motivation for independence were crucial factors." },
                        { text: "All Native American tribes allied with the colonists.", isCorrect: false, rationale: "Many tribes sided with the British, hoping to halt colonial expansion." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "The House of Burgesses in Virginia is significant because it was:",
                    answerOptions: [
                        { text: "The first major battle of the Revolution.", isCorrect: false, rationale: "This was a legislative body." },
                        { text: "The first elected representative assembly in the American colonies.", isCorrect: true, rationale: "Established in 1619, it was an early step toward self-government in America." },
                        { text: "The site of the signing of the Declaration of Independence.", isCorrect: false, rationale: "This occurred in Philadelphia." },
                        { text: "The company that founded the Jamestown colony.", isCorrect: false, rationale: "Jamestown was founded by the Virginia Company." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "What was the Boston Massacre?",
                    answerOptions: [
                        { text: "The final battle of the American Revolution.", isCorrect: false, rationale: "The final battle was at Yorktown." },
                        { text: "A protest where colonists threw tea into the harbor.", isCorrect: false, rationale: "This was the Boston Tea Party." },
                        { text: "A 1770 incident where British soldiers fired into a crowd of colonists, killing five people.", isCorrect: true, rationale: "The event was heavily publicized by patriots like Paul Revere and Samuel Adams to fuel anti-British sentiment." },
                        { text: "A naval battle fought in Boston Harbor.", isCorrect: false, rationale: "The Boston Massacre was a street confrontation." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>Mercantilism was the economic theory that drove European colonization. It held that a nation's wealth and power were best served by increasing exports and accumulating precious metals, like gold and silver. Colonies were crucial to this system. They served as a source of cheap raw materials for the mother country's industries and as a captive market for its manufactured goods. British laws like the Navigation Acts were designed to enforce this system by restricting colonial trade with other nations.</p>",
                    question: "According to the theory of mercantilism, what was the primary role of colonies?",
                    answerOptions: [
                        { text: "To develop their own independent economies.", isCorrect: false, rationale: "Mercantilism sought to prevent this and keep colonies dependent." },
                        { text: "To provide the mother country with raw materials and a market for its goods.", isCorrect: true, rationale: "The passage explicitly states colonies served as a 'source of cheap raw materials' and a 'captive market'." },
                        { text: "To form alliances with other colonial powers.", isCorrect: false, rationale: "Trade was meant to be restricted to the mother country." },
                        { text: "To become centers of art and culture.", isCorrect: false, rationale: "The role was economic and strategic, not cultural." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "What document, signed on July 4, 1776, formally announced the colonies' break from Great Britain?",
                    answerOptions: [
                        { text: "The Constitution", isCorrect: false, rationale: "The Constitution was written after the war to establish the new government." },
                        { text: "The Bill of Rights", isCorrect: false, rationale: "The Bill of Rights was added to the Constitution." },
                        { text: "The Declaration of Independence", isCorrect: true, rationale: "This document articulated the philosophical reasons for the separation and formally declared the colonies to be independent." },
                        { text: "The Articles of Confederation", isCorrect: false, rationale: "This was the first framework of government for the new nation." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Which European country became the colonists' most important ally during the American Revolution?",
                    answerOptions: [
                        { text: "Spain", isCorrect: false, rationale: "Spain did provide some support, but France's contribution was far greater." },
                        { text: "Germany", isCorrect: false, rationale: "German mercenaries (Hessians) were hired by the British to fight against the colonists." },
                        { text: "France", isCorrect: true, rationale: "Following the American victory at Saratoga, France formally allied with the United States, providing crucial money, troops, and naval support." },
                        { text: "The Netherlands", isCorrect: false, rationale: "The Netherlands provided some financial loans but was not the primary military ally." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "The 'Intolerable Acts' were a series of British laws passed in response to what event?",
                    answerOptions: [
                        { text: "The Boston Tea Party", isCorrect: true, rationale: "These punitive laws, which included closing the port of Boston, were a direct retaliation for the destruction of the tea." },
                        { text: "The signing of the Declaration of Independence", isCorrect: false, rationale: "The Acts were passed in 1774, before the Declaration was signed." },
                        { text: "The Battle of Bunker Hill", isCorrect: false, rationale: "The Acts predated this battle." },
                        { text: "The Stamp Act protests", isCorrect: false, rationale: "The Stamp Act was repealed due to colonial protest; the Intolerable Acts were a punishment." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Valley Forge is a significant site in the American Revolution because:",
                    answerOptions: [
                        { text: "It was the location of the final British surrender.", isCorrect: false, rationale: "This was at Yorktown." },
                        { text: "It was where the Continental Army endured a harsh winter and emerged as a more disciplined fighting force.", isCorrect: true, rationale: "Despite extreme hardship during the winter of 1777-1778, the training received at Valley Forge from Baron von Steuben greatly professionalized the army." },
                        { text: "It was the first capital of the United States.", isCorrect: false, rationale: "The first capital was New York City (briefly), then Philadelphia." },
                        { text: "It was the site of the first battle.", isCorrect: false, rationale: "This was at Lexington and Concord." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>Salutary neglect was an unofficial British policy of avoiding strict enforcement of parliamentary laws, particularly trade laws, meant to keep the American colonies obedient to Great Britain. This policy was in effect for much of the 17th and 18th centuries. The end of salutary neglect after the French and Indian War, and the beginning of stricter enforcement and new taxes, was a major factor in the growing unrest that led to the American Revolution.</p>",
                    question: "What was the policy of 'salutary neglect'?",
                    answerOptions: [
                        { text: "A policy of heavily taxing the colonies.", isCorrect: false, rationale: "Salutary neglect was the opposite; it was a period of lax enforcement." },
                        { text: "A policy of not strictly enforcing British laws in the colonies.", isCorrect: true, rationale: "The passage defines it as an 'unofficial British policy of avoiding strict enforcement of parliamentary laws'." },
                        { text: "A policy of providing financial aid to the colonies.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "A policy of encouraging colonial self-government.", isCorrect: false, rationale: "While it had that effect, the policy's intent was to maintain obedience, not formally encourage self-government." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_colonial_period_revolution_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which group of colonies was known for its religious tolerance and diverse population, including Quakers, Germans, and Dutch?",
                    answerOptions: [
                        { text: "The New England Colonies", isCorrect: false, rationale: "The New England colonies were primarily founded by Puritans and were not known for religious tolerance." },
                        { text: "The Middle Colonies", isCorrect: true, rationale: "Colonies like Pennsylvania (founded by the Quaker William Penn) and New York were known for their diversity and tolerance." },
                        { text: "The Southern Colonies", isCorrect: false, rationale: "The Southern colonies were primarily Anglican and their economies were focused on agriculture." },
                        { text: "The French Colonies", isCorrect: false, rationale: "This question refers to the British colonies." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "What was the main economic activity in the Southern colonies during the colonial period?",
                    answerOptions: [
                        { text: "Shipbuilding and fishing", isCorrect: false, rationale: "This was characteristic of the New England colonies." },
                        { text: "Fur trading and small farming", isCorrect: false, rationale: "This was more common in the frontier and Middle Colonies." },
                        { text: "Large-scale agriculture of cash crops like tobacco and rice", isCorrect: true, rationale: "The Southern economy was dominated by the plantation system, which relied on enslaved labor to grow crops for export." },
                        { text: "Manufacturing and industry", isCorrect: false, rationale: "Manufacturing was not a major part of the colonial economy." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The Committees of Correspondence were created by the American colonists to:",
                    answerOptions: [
                        { text: "Organize the Boston Tea Party.", isCorrect: false, rationale: "While they helped spread the word, their purpose was broader communication." },
                        { text: "Share information and coordinate resistance to British policies.", isCorrect: true, rationale: "These committees were a network of communication that helped unify the colonies in their opposition to the British." },
                        { text: "Write the Declaration of Independence.", isCorrect: false, rationale: "The Declaration was written by a committee of the Second Continental Congress." },
                        { text: "Negotiate a peace treaty with France.", isCorrect: false, rationale: "This was a function of diplomats like Benjamin Franklin." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The Battle of Yorktown in 1781 was the culmination of the Revolutionary War. The combined American and French forces, led by George Washington and the Comte de Rochambeau, surrounded the British army under Lord Cornwallis at Yorktown, Virginia. The French fleet, under the Comte de Grasse, blocked any British escape or reinforcement by sea. Trapped and outnumbered, Cornwallis was forced to surrender, effectively ending the war and securing American independence.</p>",
                    question: "What was the crucial role of the French navy at the Battle of Yorktown?",
                    answerOptions: [
                        { text: "They transported British troops to the battle.", isCorrect: false, rationale: "They were allied with the Americans, not the British." },
                        { text: "They blockaded the coast, preventing the British from escaping or receiving help.", isCorrect: true, rationale: "The passage states that the French fleet 'blocked any British escape or reinforcement by sea.'" },
                        { text: "They negotiated the terms of surrender.", isCorrect: false, rationale: "Their role was military, not diplomatic, in this instance." },
                        { text: "They provided food and supplies to the British army.", isCorrect: false, rationale: "They were fighting against the British." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which of the following was NOT a cause of the American Revolution?",
                    answerOptions: [
                        { text: "British taxes imposed on the colonies after the French and Indian War.", isCorrect: false, rationale: "This was a major cause." },
                        { text: "The colonists' lack of representation in the British Parliament.", isCorrect: false, rationale: "This was a central grievance." },
                        { text: "Restrictions on colonial trade through laws like the Navigation Acts.", isCorrect: false, rationale: "These mercantilist policies were a long-standing source of tension." },
                        { text: "The British government's support for colonial independence.", isCorrect: true, rationale: "The British government opposed colonial independence, which is why the war was fought." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Who were the minutemen?",
                    answerOptions: [
                        { text: "British soldiers stationed in Boston.", isCorrect: false, rationale: "The minutemen were colonial militia." },
                        { text: "Members of the colonial militia who were ready to fight at a minute's notice.", isCorrect: true, rationale: "They were a key part of the colonial defense, especially in the early battles of Lexington and Concord." },
                        { text: "Spies working for George Washington.", isCorrect: false, rationale: "While Washington had spies, the term 'minutemen' refers to militia." },
                        { text: "The authors of the Declaration of Independence.", isCorrect: false, rationale: "These were statesmen and writers." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "The Sons of Liberty was a secret organization formed in the American colonies to:",
                    answerOptions: [
                        { text: "Promote loyalty to King George III.", isCorrect: false, rationale: "They were a Patriot organization that opposed the King." },
                        { text: "Protest and resist British policies like the Stamp Act.", isCorrect: true, rationale: "The Sons of Liberty organized protests, boycotts, and sometimes violent demonstrations against British taxation and laws." },
                        { text: "Establish a new colonial currency.", isCorrect: false, rationale: "This was not their purpose." },
                        { text: "Negotiate treaties with Native American tribes.", isCorrect: false, rationale: "This was typically handled by colonial governments." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>Indentured servitude was a common labor system in the early colonies. An indentured servant was a person who signed a contract (an indenture) to work for a colonial employer for a specified number of years, typically four to seven. In exchange for their labor, they received passage to the colonies, food, and shelter. At the end of their term, they were granted their freedom and often a small plot of land or some tools. This system provided a crucial labor force for the colonies before the widespread institution of slavery.</p>",
                    question: "What did an indentured servant receive in exchange for their labor?",
                    answerOptions: [
                        { text: "A large salary and benefits.", isCorrect: false, rationale: "Indentured servants were not paid a salary." },
                        { text: "Passage to the colonies, room, and board, with freedom at the end of the contract.", isCorrect: true, rationale: "The passage lists these as the key components of the exchange for their labor." },
                        { text: "Immediate citizenship and voting rights.", isCorrect: false, rationale: "Citizenship was not part of the contract." },
                        { text: "A high-ranking position in the colonial government.", isCorrect: false, rationale: "This was not part of the agreement." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "What was the significance of the pamphlet 'Common Sense' by Thomas Paine?",
                    answerOptions: [
                        { text: "It was the first constitution of the United States.", isCorrect: false, rationale: "This was the Articles of Confederation." },
                        { text: "It persuaded many colonists to support the idea of independence from Britain.", isCorrect: true, rationale: "Published in 1776, its powerful, plain-spoken arguments against monarchy and for independence were incredibly influential in swaying public opinion." },
                        { text: "It outlined George Washington's military strategy.", isCorrect: false, rationale: "It was a political, not a military, document." },
                        { text: "It was a peace proposal sent to King George III.", isCorrect: false, rationale: "It was a call for independence, not peace." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "Which of the following was a result of the Treaty of Paris of 1783?",
                    answerOptions: [
                        { text: "France received all territory west of the Mississippi River.", isCorrect: false, rationale: "This was a result of an earlier treaty." },
                        { text: "Great Britain formally recognized the United States as an independent nation.", isCorrect: true, rationale: "This was the primary outcome of the treaty that officially ended the American Revolution." },
                        { text: "The colonies were placed under military rule.", isCorrect: false, rationale: "The war resulted in independence, not military rule." },
                        { text: "The colonists agreed to pay all of Britain's war debts.", isCorrect: false, rationale: "This was not a condition of the treaty." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The Quartering Act, Stamp Act, and Tea Act were all examples of:",
                    answerOptions: [
                        { text: "British policies that angered the colonists and led to revolution.", isCorrect: true, rationale: "These acts, which imposed taxes and regulations without colonial consent, were major sources of the conflict." },
                        { text: "Laws passed by the colonial assemblies.", isCorrect: false, rationale: "These were laws passed by the British Parliament." },
                        { text: "Early attempts at self-government in the colonies.", isCorrect: false, rationale: "These were impositions of external government, not self-government." },
                        { text: "Agreements between the colonists and Native American tribes.", isCorrect: false, rationale: "These were laws from the British government." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "What was the name of the legislative body that brought together representatives from the colonies to respond to British actions before and during the Revolution?",
                    answerOptions: [
                        { text: "The House of Burgesses", isCorrect: false, rationale: "This was the legislature of the Virginia colony only." },
                        { text: "The Sons of Liberty", isCorrect: false, rationale: "This was a protest group, not a formal legislative body." },
                        { text: "The Continental Congress", isCorrect: true, rationale: "The First and Second Continental Congresses met to coordinate the colonial response to Britain, eventually declaring independence and managing the war effort." },
                        { text: "Parliament", isCorrect: false, rationale: "Parliament was the legislature of Great Britain." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "text",
                    passage: "<p>The winter of 1777-1778 at Valley Forge was a time of immense hardship for the Continental Army. Soldiers suffered from a lack of food, clothing, and proper shelter, and disease was rampant. Despite the brutal conditions and low morale, it was also a time of transformation. Under the instruction of the Prussian officer Baron von Steuben, the army underwent rigorous training and emerged as a more disciplined and professional fighting force, capable of facing the British army in open battle.</p>",
                    question: "What was a positive outcome of the Continental Army's winter at Valley Forge?",
                    answerOptions: [
                        { text: "They won a major battle against the British.", isCorrect: false, rationale: "Valley Forge was a winter encampment, not a battle." },
                        { text: "They received ample supplies from France.", isCorrect: false, rationale: "The passage highlights the lack of supplies as a major hardship." },
                        { text: "The soldiers became better trained and more disciplined.", isCorrect: true, rationale: "The passage states that under Baron von Steuben, the army 'emerged as a more disciplined and professional fighting force.'" },
                        { text: "The British surrendered, ending the war.", isCorrect: false, rationale: "The war continued for several more years." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Who was Benedict Arnold?",
                    answerOptions: [
                        { text: "A celebrated American general who later became a traitor.", isCorrect: true, rationale: "Arnold was an accomplished general for the Continental Army early in the war, but he later conspired to surrender the fort at West Point to the British, becoming the most famous traitor in U.S. history." },
                        { text: "The British general who surrendered at Yorktown.", isCorrect: false, rationale: "That was Lord Cornwallis." },
                        { text: "A French diplomat who helped secure the alliance.", isCorrect: false, rationale: "This describes figures like the Marquis de Lafayette." },
                        { text: "The author of 'Common Sense'.", isCorrect: false, rationale: "That was Thomas Paine." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The phrase 'life, liberty, and the pursuit of happiness' from the Declaration of Independence is an example of:",
                    answerOptions: [
                        { text: "Checks and balances", isCorrect: false, rationale: "This is a principle of government structure." },
                        { text: "Unalienable rights", isCorrect: true, rationale: "The Declaration asserts that these are natural, fundamental rights that cannot be taken away by the government." },
                        { text: "Federalism", isCorrect: false, rationale: "This is the division of power between state and national governments." },
                        { text: "The rule of law", isCorrect: false, rationale: "While related, the phrase specifically refers to fundamental human rights." }
                    ]
                }
            ]
        }
    ]
};
// Social Studies -> U.S. History -> A New Nation and Westward Expansion
AppData.quizzes.ss_new_nation_westward_expansion = {
    id: "ss_new_nation_westward_expansion",
    title: "A New Nation and Westward Expansion",
    description: "The early republic, westward expansion, and the lead-up to the Civil War.",
    quizzes: [
        {
            quizId: "ss_new_nation_westward_expansion_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What was the Louisiana Purchase of 1803?",
                    answerOptions: [
                        { text: "The purchase of Florida from Spain.", isCorrect: false, rationale: "The U.S. acquired Florida from Spain in 1819 through the Adams-Onís Treaty." },
                        { text: "The acquisition of a vast territory west of the Mississippi River from France.", isCorrect: true, rationale: "President Thomas Jefferson orchestrated the purchase from Napoleon's France, roughly doubling the size of the United States." },
                        { text: "The annexation of Texas.", isCorrect: false, rationale: "Texas was annexed in 1845 after it had been an independent republic." },
                        { text: "The purchase of Alaska from Russia.", isCorrect: false, rationale: "The U.S. purchased Alaska from Russia in 1867." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "Who were Lewis and Clark?",
                    answerOptions: [
                        { text: "Inventors of the cotton gin.", isCorrect: false, rationale: "The cotton gin was invented by Eli Whitney." },
                        { text: "Leaders of an expedition to explore the Louisiana Purchase territory.", isCorrect: true, rationale: "Their 'Corps of Discovery' expedition from 1804 to 1806 was commissioned by President Jefferson to map the new territory, establish trade with Native American tribes, and find a water route to the Pacific Ocean." },
                        { text: "Generals in the War of 1812.", isCorrect: false, rationale: "They were explorers, not primarily generals in that conflict." },
                        { text: "The first two Chief Justices of the Supreme Court.", isCorrect: false, rationale: "John Jay was the first Chief Justice." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The concept of 'Manifest Destiny' was the belief that:",
                    answerOptions: [
                        { text: "The United States should avoid interfering with foreign countries.", isCorrect: false, rationale: "This describes a policy of isolationism." },
                        { text: "The United States was divinely ordained to expand its territory westward to the Pacific Ocean.", isCorrect: true, rationale: "This 19th-century belief fueled westward expansion, the annexation of Texas, and the war with Mexico." },
                        { text: "Slavery should be abolished immediately.", isCorrect: false, rationale: "This was the goal of the abolitionist movement. Manifest Destiny often exacerbated the conflict over slavery in new territories." },
                        { text: "The federal government should have limited powers.", isCorrect: false, rationale: "This relates to the principle of states' rights." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The Missouri Compromise of 1820 was a law passed to address the growing sectional conflict over the expansion of slavery. It admitted Missouri to the Union as a slave state and Maine as a free state, preserving the balance of power between free and slave states in the Senate. It also prohibited slavery in the remaining Louisiana Purchase territory north of the 36°30′ parallel.</p>",
                    question: "What was the main purpose of the Missouri Compromise?",
                    answerOptions: [
                        { text: "To abolish slavery in the United States.", isCorrect: false, rationale: "It was a temporary solution that allowed slavery to continue and expand." },
                        { text: "To purchase more territory from France.", isCorrect: false, rationale: "This is unrelated to the Louisiana Purchase itself." },
                        { text: "To temporarily resolve the issue of slavery's expansion by maintaining a balance between free and slave states.", isCorrect: true, rationale: "The passage explains that it admitted one slave state and one free state to preserve the balance of power and drew a line for future expansion." },
                        { text: "To admit California as a free state.", isCorrect: false, rationale: "This was part of the Compromise of 1850, not the Missouri Compromise." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What was a major cause of the War of 1812 between the United States and Great Britain?",
                    answerOptions: [
                        { text: "A dispute over the border of Texas.", isCorrect: false, rationale: "This was a cause of the Mexican-American War." },
                        { text: "The British practice of impressment, or forcing American sailors into the British navy.", isCorrect: true, rationale: "Impressment, along with British trade restrictions and support for Native American attacks on the frontier, were the primary causes of the war." },
                        { text: "The assassination of President James Madison.", isCorrect: false, rationale: "No U.S. President was assassinated during this period." },
                        { text: "The sinking of the Lusitania.", isCorrect: false, rationale: "This was a cause of the U.S. entry into World War I." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "The 'Trail of Tears' refers to:",
                    answerOptions: [
                        { text: "The journey of pioneers along the Oregon Trail.", isCorrect: false, rationale: "The Oregon Trail was a voluntary migration westward." },
                        { text: "The forced removal of Cherokee and other Native American tribes from their ancestral lands to territory in the west.", isCorrect: true, rationale: "This tragic event in the 1830s, authorized by the Indian Removal Act, resulted in the deaths of thousands of Native Americans." },
                        { text: "The escape of enslaved people via the Underground Railroad.", isCorrect: false, rationale: "This was a network for seeking freedom, not a government-forced removal." },
                        { text: "The difficult winter encampment of the Continental Army at Valley Forge.", isCorrect: false, rationale: "This occurred during the Revolutionary War." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "What was the Monroe Doctrine?",
                    answerOptions: [
                        { text: "A policy that promoted U.S. colonization of Africa.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "A U.S. foreign policy that declared the Western Hemisphere off-limits to further European colonization.", isCorrect: true, rationale: "Issued in 1823, the Monroe Doctrine warned European powers not to interfere with the newly independent nations of Latin America." },
                        { text: "A compromise that admitted Missouri as a slave state.", isCorrect: false, rationale: "This was the Missouri Compromise." },
                        { text: "A law that authorized the forced removal of Native American tribes.", isCorrect: false, rationale: "This was the Indian Removal Act." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "text",
                    passage: "<p>The Industrial Revolution began to take hold in the United States in the early 19th century. The construction of canals, such as the Erie Canal, and later, railroads, created a transportation network that linked the agricultural West with the manufacturing centers of the East. Innovations like the cotton gin and the mechanical reaper transformed agriculture, while textile mills in New England marked the beginning of factory-based production.</p>",
                    question: "According to the passage, what was the significance of the Erie Canal and railroads?",
                    answerOptions: [
                        { text: "They were the primary sites of battles in the Civil War.", isCorrect: false, rationale: "Their significance was economic, not military, in this context." },
                        { text: "They created a transportation network that connected different regions of the country.", isCorrect: true, rationale: "The passage explicitly states they 'created a transportation network that linked the agricultural West with the manufacturing centers of the East.'" },
                        { text: "They were projects built entirely by enslaved labor.", isCorrect: false, rationale: "While various labor sources were used, the passage does not state they were built entirely by enslaved people." },
                        { text: "They were the main cause of the War of 1812.", isCorrect: false, rationale: "They were part of the economic development that occurred after the War of 1812." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The California Gold Rush of 1849 led to:",
                    answerOptions: [
                        { text: "A decrease in the population of California.", isCorrect: false, rationale: "It led to a massive and rapid increase." },
                        { text: "A rapid increase in population and a push for California to become a state.", isCorrect: true, rationale: "The influx of hundreds of thousands of 'forty-niners' dramatically increased California's population, leading to its admission as a free state in the Compromise of 1850." },
                        { text: "A war between the United States and Spain.", isCorrect: false, rationale: "The territory was acquired from Mexico, not Spain, before the Gold Rush." },
                        { text: "The immediate abolition of slavery in the United States.", isCorrect: false, rationale: "It intensified the debate over slavery's expansion but did not lead to its abolition." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "The Alien and Sedition Acts, passed during John Adams' presidency, were controversial because they:",
                    answerOptions: [
                        { text: "Restricted freedom of speech and the press, and made it harder for immigrants to become citizens.", isCorrect: true, rationale: "These laws were widely seen as an attack on civil liberties and were used to suppress criticism of the government." },
                        { text: "Abolished slavery in the northern states.", isCorrect: false, rationale: "This was done by individual state actions over time." },
                        { text: "Established the first Bank of the United States.", isCorrect: false, rationale: "The bank was established earlier, under Washington's presidency." },
                        { text: "Authorized the Louisiana Purchase.", isCorrect: false, rationale: "This occurred during Jefferson's presidency." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "What was the significance of the Supreme Court case Marbury v. Madison (1803)?",
                    answerOptions: [
                        { text: "It established the principle of judicial review.", isCorrect: true, rationale: "This landmark case established the Supreme Court's power to declare an act of Congress unconstitutional." },
                        { text: "It legalized the 'separate but equal' doctrine.", isCorrect: false, rationale: "This was the outcome of Plessy v. Ferguson in 1896." },
                        { text: "It confirmed the federal government's power to regulate interstate commerce.", isCorrect: false, rationale: "This was established in Gibbons v. Ogden." },
                        { text: "It outlawed slavery in the territories.", isCorrect: false, rationale: "This was the issue in the Dred Scott case." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "text",
                    passage: "<p>The Nullification Crisis of 1832-33 involved a confrontation between South Carolina and the federal government. South Carolina declared the federal tariffs of 1828 and 1832 to be unconstitutional and therefore null and void within the state. The crisis was a key event in the ongoing debate over states' rights versus federal authority. President Andrew Jackson firmly opposed South Carolina's position, threatening to use military force to enforce the federal law.</p>",
                    question: "The Nullification Crisis was a dispute over what issue?",
                    answerOptions: [
                        { text: "The abolition of slavery.", isCorrect: false, rationale: "The crisis was about tariffs, although the underlying issue of states' rights was closely tied to the defense of slavery." },
                        { text: "The right of a state to declare a federal law unconstitutional.", isCorrect: true, rationale: "The passage states that South Carolina declared the federal tariffs 'unconstitutional and therefore null and void,' which is the core of the crisis." },
                        { text: "The admission of new states to the Union.", isCorrect: false, rationale: "This was not the central issue of the Nullification Crisis." },
                        { text: "The election of Andrew Jackson as president.", isCorrect: false, rationale: "Jackson was the president during the crisis." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "The Seneca Falls Convention of 1848 is significant because it was the first major:",
                    answerOptions: [
                        { text: "Abolitionist meeting to demand the end of slavery.", isCorrect: false, rationale: "While many attendees were abolitionists, the convention's primary focus was different." },
                        { text: "Women's rights convention in the United States.", isCorrect: true, rationale: "The convention, organized by Elizabeth Cady Stanton and Lucretia Mott, issued the 'Declaration of Sentiments' and is considered the beginning of the organized women's suffrage movement." },
                        { text: "Convention to draft the U.S. Constitution.", isCorrect: false, rationale: "The Constitutional Convention was in 1787." },
                        { text: "Meeting to organize labor unions.", isCorrect: false, rationale: "This was not the focus of the Seneca Falls Convention." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "What was the primary goal of the abolitionist movement?",
                    answerOptions: [
                        { text: "To end the consumption of alcohol (temperance).", isCorrect: false, rationale: "This was the goal of the temperance movement." },
                        { text: "To secure the right to vote for women (suffrage).", isCorrect: false, rationale: "This was the goal of the suffrage movement." },
                        { text: "To bring an immediate end to slavery.", isCorrect: true, rationale: "Abolitionists, such as William Lloyd Garrison and Frederick Douglass, advocated for the complete and immediate emancipation of all enslaved people." },
                        { text: "To promote westward expansion.", isCorrect: false, rationale: "This was Manifest Destiny, not abolitionism." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The Mexican-American War (1846-1848) resulted in:",
                    answerOptions: [
                        { text: "The United States giving up territory to Mexico.", isCorrect: false, rationale: "The U.S. gained territory." },
                        { text: "The U.S. acquisition of a vast amount of territory, including present-day California, Nevada, and Utah.", isCorrect: true, rationale: "The Treaty of Guadalupe Hidalgo ended the war and ceded the Mexican Cession to the United States." },
                        { text: "The independence of Texas from Mexico.", isCorrect: false, rationale: "Texas had already achieved independence before the war; its annexation by the U.S. was a cause of the war." },
                        { text: "The purchase of the Louisiana Territory.", isCorrect: false, rationale: "This occurred in 1803." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_new_nation_westward_expansion_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "The expedition led by Lewis and Clark was primarily intended to:",
                    answerOptions: [
                        { text: "Conquer new territories from Native American tribes.", isCorrect: false, rationale: "The mission was one of exploration and diplomacy, not conquest." },
                        { text: "Explore and map the newly acquired Louisiana Territory.", isCorrect: true, rationale: "President Jefferson tasked them with exploring the land, finding a route to the Pacific, and establishing American presence." },
                        { text: "Establish a new capital city in the west.", isCorrect: false, rationale: "This was not a goal of the expedition." },
                        { text: "Fight the British in the War of 1812.", isCorrect: false, rationale: "The expedition took place before the War of 1812." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "The War of 1812 is sometimes called the 'Second War of American Independence' because it:",
                    answerOptions: [
                        { text: "Resulted in the U.S. acquiring a large amount of new territory from Britain.", isCorrect: false, rationale: "The war did not result in significant territorial changes." },
                        { text: "Was fought to finally end British interference in U.S. affairs and confirm American sovereignty.", isCorrect: true, rationale: "The war was a result of ongoing British impressment of sailors and trade restrictions, and the American victory solidified its status as a truly independent nation." },
                        { text: "Was fought to free the U.S. from French control.", isCorrect: false, rationale: "The war was fought against Great Britain." },
                        { text: "Led to the writing of the U.S. Constitution.", isCorrect: false, rationale: "The Constitution was written decades earlier." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "Which invention by Eli Whitney in 1793 revolutionized the Southern economy and dramatically increased the demand for enslaved labor?",
                    answerOptions: [
                        { text: "The steam engine", isCorrect: false, rationale: "The steam engine, improved by James Watt, was crucial to the Industrial Revolution but was not invented by Whitney." },
                        { text: "The mechanical reaper", isCorrect: false, rationale: "This was invented by Cyrus McCormick and transformed agriculture in the Midwest." },
                        { text: "The cotton gin", isCorrect: true, rationale: "The cotton gin made it much easier to separate cotton fibers from their seeds, making short-staple cotton a hugely profitable crop and leading to a massive expansion of slavery." },
                        { text: "The telegraph", isCorrect: false, rationale: "This was invented by Samuel Morse and revolutionized communication." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The 'spoils system' became a prominent feature of American politics during the presidency of Andrew Jackson. It is the practice where a winning political party gives government jobs to its supporters, friends, and relatives as a reward for their loyalty and as an incentive to keep working for the party. This practice was justified as a way to reform the government by replacing entrenched officeholders, but it also led to corruption and incompetence.</p>",
                    question: "The 'spoils system' refers to the practice of:",
                    answerOptions: [
                        { text: "Appointing government officials based on merit and qualifications.", isCorrect: false, rationale: "This describes a merit system, which was a reform created to end the spoils system." },
                        { text: "Giving government jobs to loyal political supporters.", isCorrect: true, rationale: "The passage defines it as the practice of a winning party giving jobs to its supporters as a reward." },
                        { text: "Sharing the spoils of war with allied nations.", isCorrect: false, rationale: "This is unrelated to the political practice." },
                        { text: "Allowing states to nullify federal laws.", isCorrect: false, rationale: "This was the doctrine of nullification." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "The forced migration of thousands of Native Americans from the southeastern United States to territory west of the Mississippi is known as the:",
                    answerOptions: [
                        { text: "Oregon Trail", isCorrect: false, rationale: "This was the path of westward pioneers." },
                        { text: "Gold Rush", isCorrect: false, rationale: "This was the mass migration to California in search of gold." },
                        { text: "Trail of Tears", isCorrect: true, rationale: "This refers to the devastating journey of the Cherokee, Choctaw, and other tribes under the Indian Removal Act." },
                        { text: "Underground Railroad", isCorrect: false, rationale: "This was the network that helped enslaved people escape to freedom." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "What was a key component of the Compromise of 1850?",
                    answerOptions: [
                        { text: "The admission of Missouri as a slave state.", isCorrect: false, rationale: "This was part of the Missouri Compromise of 1820." },
                        { text: "The admission of California as a free state and the passage of a stricter Fugitive Slave Act.", isCorrect: true, rationale: "This compromise attempted to balance the interests of free and slave states by admitting California as free, while strengthening the law that required the return of escaped slaves." },
                        { text: "The abolition of slavery in all U.S. territories.", isCorrect: false, rationale: "This did not happen until the 13th Amendment after the Civil War." },
                        { text: "The purchase of Florida from Spain.", isCorrect: false, rationale: "This occurred much earlier." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>The Dred Scott v. Sandford Supreme Court decision of 1857 was a major event in the lead-up to the Civil War. The Court ruled that African Americans were not and could not be citizens of the United States. It also declared the Missouri Compromise unconstitutional, thus allowing slavery to expand into all western territories. The decision was celebrated in the South but outraged the North, further deepening the sectional divide.</p>",
                    question: "What was a major outcome of the Dred Scott decision?",
                    answerOptions: [
                        { text: "It granted citizenship to African Americans.", isCorrect: false, rationale: "The decision did the exact opposite, ruling they were not citizens." },
                        { text: "It abolished slavery in the South.", isCorrect: false, rationale: "It strengthened the institution of slavery." },
                        { text: "It ruled that the Missouri Compromise was unconstitutional and that Congress could not ban slavery in the territories.", isCorrect: true, rationale: "The passage clearly states these two outcomes of the decision." },
                        { text: "It led to an immediate compromise between the North and South.", isCorrect: false, rationale: "The passage states that it 'outraged the North' and deepened the divide." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "The term 'Manifest Destiny' was used to justify:",
                    answerOptions: [
                        { text: "The abolition of slavery.", isCorrect: false, rationale: "This was a separate movement." },
                        { text: "The westward expansion of the United States to the Pacific Ocean.", isCorrect: true, rationale: "It was the belief that this expansion was not only inevitable but also a divine right." },
                        { text: "The secession of the Southern states.", isCorrect: false, rationale: "This was justified by the doctrine of states' rights." },
                        { text: "The creation of a national bank.", isCorrect: false, rationale: "This was a separate political and economic issue." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "What was the main purpose of the first political parties in the U.S., the Federalists and the Democratic-Republicans?",
                    answerOptions: [
                        { text: "They were formed over disagreements about the power of the federal government and the economic future of the country.", isCorrect: true, rationale: "The Federalists, led by Hamilton, favored a strong central government and a manufacturing economy, while the Democratic-Republicans, led by Jefferson, favored states' rights and an agrarian economy." },
                        { text: "They were formed to support or oppose the American Revolution.", isCorrect: false, rationale: "These parties formed after the Revolution, during Washington's presidency." },
                        { text: "They were formed based on differing views on slavery.", isCorrect: false, rationale: "While slavery was an issue, it was not the primary dividing line for the first parties." },
                        { text: "They were regional parties, one for the North and one for the South.", isCorrect: false, rationale: "While they had regional strongholds, their ideological differences were the main basis for their formation." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "The Erie Canal, completed in 1825, connected the Hudson River to which of the Great Lakes?",
                    answerOptions: [
                        { text: "Lake Superior", isCorrect: false, rationale: "This is the westernmost Great Lake." },
                        { text: "Lake Michigan", isCorrect: false, rationale: "The canal did not connect directly to Lake Michigan." },
                        { text: "Lake Huron", isCorrect: false, rationale: "This is incorrect." },
                        { text: "Lake Erie", isCorrect: true, rationale: "The canal stretched from Albany on the Hudson River to Buffalo on Lake Erie, creating a navigable water route from the Atlantic Ocean to the Great Lakes." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The 'Underground Railroad' was:",
                    answerOptions: [
                        { text: "The first subway system built in the United States.", isCorrect: false, rationale: "It was not a literal railroad." },
                        { text: "A network of secret routes and safe houses used by enslaved African Americans to escape to free states and Canada.", isCorrect: true, rationale: "It was a system of resistance against slavery, operated by abolitionists and formerly enslaved people like Harriet Tubman." },
                        { text: "A railroad built to transport gold during the California Gold Rush.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "A military supply line during the Civil War.", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "text",
                    passage: "<p>The Kansas-Nebraska Act of 1854 was a pivotal law that further intensified sectional conflict. It allowed settlers in the territories of Kansas and Nebraska to decide for themselves whether to allow slavery within their borders, a principle known as 'popular sovereignty.' This act effectively repealed the Missouri Compromise of 1820, which had prohibited slavery in that region. The result was a violent struggle between pro-slavery and anti-slavery settlers in Kansas, an event known as 'Bleeding Kansas'.</p>",
                    question: "The Kansas-Nebraska Act allowed for the issue of slavery in new territories to be decided by:",
                    answerOptions: [
                        { text: "The President", isCorrect: false, rationale: "The decision was left to the settlers." },
                        { text: "The Supreme Court", isCorrect: false, rationale: "The decision was left to the settlers." },
                        { text: "Popular sovereignty", isCorrect: true, rationale: "The passage defines this as allowing 'settlers in the territories...to decide for themselves whether to allow slavery'." },
                        { text: "The Missouri Compromise", isCorrect: false, rationale: "The passage states that the Act repealed the Missouri Compromise." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "John Brown's raid on Harpers Ferry in 1859 was an attempt to:",
                    answerOptions: [
                        { text: "Negotiate a peaceful end to slavery with Southern leaders.", isCorrect: false, rationale: "John Brown was a radical abolitionist who believed in using violence." },
                        { text: "Start an armed slave revolt by seizing a federal arsenal.", isCorrect: true, rationale: "Brown's plan was to capture the arsenal at Harpers Ferry, Virginia, and arm enslaved people to begin a rebellion. The raid failed, but it further polarized the nation." },
                        { text: "Establish a new colony for freed slaves in the West.", isCorrect: false, rationale: "This was not his plan." },
                        { text: "Protest the Dred Scott decision at the Supreme Court.", isCorrect: false, rationale: "His action was a direct military assault, not a legal protest." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The annexation of Texas and the subsequent Mexican-American War are key examples of what 19th-century ideology?",
                    answerOptions: [
                        { text: "Abolitionism", isCorrect: false, rationale: "These events were often opposed by abolitionists, who feared the expansion of slavery." },
                        { text: "Isolationism", isCorrect: false, rationale: "These were acts of expansion, not isolation." },
                        { text: "Manifest Destiny", isCorrect: true, rationale: "The desire to acquire Texas and western territories like California was driven by the belief in America's Manifest Destiny to expand across the continent." },
                        { text: "Nullification", isCorrect: false, rationale: "This was the doctrine of states' rights." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The period following the War of 1812, characterized by a sense of national purpose and unity, is often called the:",
                    answerOptions: [
                        { text: "Era of Good Feelings", isCorrect: true, rationale: "This term describes the period of one-party rule by the Democratic-Republicans and a surge in American nationalism after the war." },
                        { text: "Age of Jackson", isCorrect: false, rationale: "This refers to a later period characterized by the rise of the common man and Jacksonian democracy." },
                        { text: "Gilded Age", isCorrect: false, rationale: "This refers to the late 19th century." },
                        { text: "Progressive Era", isCorrect: false, rationale: "This refers to the early 20th century." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_new_nation_westward_expansion_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which major land acquisition in 1803 doubled the size of the United States?",
                    answerOptions: [
                        { text: "The Gadsden Purchase", isCorrect: false, rationale: "This was a smaller purchase of land from Mexico in 1853." },
                        { text: "The Annexation of Texas", isCorrect: false, rationale: "This added a large territory but did not double the country's size." },
                        { text: "The Louisiana Purchase", isCorrect: true, rationale: "The purchase of the Louisiana Territory from France was the largest territorial expansion in U.S. history." },
                        { text: "The Oregon Treaty", isCorrect: false, rationale: "This treaty with Britain established the border in the Pacific Northwest." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "text",
                    passage: "<p>The Monroe Doctrine was a U.S. foreign policy proclamation made by President James Monroe in 1823. It asserted that the Western Hemisphere was no longer open to colonization by European powers. While the U.S. did not have the military power to enforce this at the time, it became a cornerstone of American foreign policy, signaling the country's growing confidence and its intention to be the dominant power in the Americas.</p>",
                    question: "What was the main message of the Monroe Doctrine?",
                    answerOptions: [
                        { text: "The U.S. should form alliances with European powers.", isCorrect: false, rationale: "It was a warning to European powers to stay out of the Americas." },
                        { text: "European powers should not attempt to colonize or interfere with the independent nations of the Americas.", isCorrect: true, rationale: "The passage states it declared the Western Hemisphere 'off-limits to further European colonization'." },
                        { text: "The U.S. had the right to colonize Africa and Asia.", isCorrect: false, rationale: "It was focused on the Western Hemisphere." },
                        { text: "The U.S. should sell the Louisiana Territory back to France.", isCorrect: false, rationale: "This is unrelated to the Monroe Doctrine." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "The women's suffrage movement, which sought the right to vote for women, officially began with what event in 1848?",
                    answerOptions: [
                        { text: "The passage of the 19th Amendment", isCorrect: false, rationale: "This was the ultimate victory of the movement, not its beginning." },
                        { text: "The Seneca Falls Convention", isCorrect: true, rationale: "This convention is widely considered the start of the organized women's rights and suffrage movement in the United States." },
                        { text: "The abolitionist movement", isCorrect: false, rationale: "While the two movements were closely linked, the abolitionist movement was focused on ending slavery." },
                        { text: "The Nullification Crisis", isCorrect: false, rationale: "This was a dispute over tariffs and states' rights." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "The election of which president in 1860 was a major catalyst for the secession of the Southern states and the start of the Civil War?",
                    answerOptions: [
                        { text: "Andrew Jackson", isCorrect: false, rationale: "Jackson was president in the 1830s." },
                        { text: "Thomas Jefferson", isCorrect: false, rationale: "Jefferson was president in the early 1800s." },
                        { text: "Abraham Lincoln", isCorrect: true, rationale: "Lincoln ran on a platform of preventing the expansion of slavery into the western territories. His election was seen as a threat to the institution of slavery, leading seven southern states to secede before his inauguration." },
                        { text: "Ulysses S. Grant", isCorrect: false, rationale: "Grant was a Union general during the Civil War and became president after." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What was the 'Corrupt Bargain' of 1824?",
                    answerOptions: [
                        { text: "The secret sale of military plans to a foreign country.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "The agreement that led to the Missouri Compromise.", isCorrect: false, rationale: "This was a legislative compromise." },
                        { text: "The accusation that Henry Clay used his influence to make John Quincy Adams president in exchange for becoming Secretary of State.", isCorrect: true, rationale: "In the 1824 election, no candidate won a majority of electoral votes. The House of Representatives decided the election, and Andrew Jackson's supporters accused Clay of making a 'corrupt bargain' to give Adams the presidency." },
                        { text: "The purchase of Alaska from Russia at a very low price.", isCorrect: false, rationale: "This was known as 'Seward's Folly'." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "The temperance movement was a social movement that advocated for:",
                    answerOptions: [
                        { text: "The abolition of slavery.", isCorrect: false, rationale: "This was the abolitionist movement." },
                        { text: "The right to vote for women.", isCorrect: false, rationale: "This was the suffrage movement." },
                        { text: "The reduction or prohibition of alcoholic beverages.", isCorrect: true, rationale: "The temperance movement was a major social reform effort in the 19th and early 20th centuries." },
                        { text: "The reform of prisons and mental asylums.", isCorrect: false, rationale: "This was another important reform movement, led by figures like Dorothea Dix." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>The concept of 'judicial review' was established by the landmark Supreme Court case Marbury v. Madison in 1803. Chief Justice John Marshall argued that the Constitution is the supreme law of the land and that the judicial branch has the duty to interpret the law. Therefore, if a law passed by Congress conflicts with the Constitution, the Supreme Court has the power to declare that law unconstitutional and void.</p>",
                    question: "The power of judicial review gives the Supreme Court the authority to:",
                    answerOptions: [
                        { text: "Veto laws passed by Congress.", isCorrect: false, rationale: "This is a power of the President." },
                        { text: "Write and pass new laws.", isCorrect: false, rationale: "This is a power of Congress." },
                        { text: "Declare laws unconstitutional.", isCorrect: true, rationale: "The passage explicitly states this is the power established by Marbury v. Madison." },
                        { text: "Impeach the President.", isCorrect: false, rationale: "This is a power of Congress." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "What was the name of the agreement that admitted Maine as a free state and Missouri as a slave state in 1820?",
                    answerOptions: [
                        { text: "The Compromise of 1850", isCorrect: false, rationale: "This compromise dealt with California and other territories." },
                        { text: "The Kansas-Nebraska Act", isCorrect: false, rationale: "This 1854 act dealt with slavery in those territories." },
                        { text: "The Missouri Compromise", isCorrect: true, rationale: "This compromise maintained the balance of power between free and slave states in the Senate for several decades." },
                        { text: "The Monroe Doctrine", isCorrect: false, rationale: "This was a foreign policy statement." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The first two political parties in the U.S. were the Federalists and the:",
                    answerOptions: [
                        { text: "Whigs", isCorrect: false, rationale: "The Whig party emerged later to oppose the Democrats." },
                        { text: "Democratic-Republicans", isCorrect: true, rationale: "Led by Thomas Jefferson and James Madison, this party opposed the Federalist vision of a strong central government." },
                        { text: "Republicans", isCorrect: false, rationale: "The Republican party was founded in the 1850s on an anti-slavery platform." },
                        { text: "Democrats", isCorrect: false, rationale: "The Democratic party evolved from the Democratic-Republicans during the Age of Jackson." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "The Oregon Trail was:",
                    answerOptions: [
                        { text: "A secret route for escaped slaves.", isCorrect: false, rationale: "This was the Underground Railroad." },
                        { text: "A major overland route used by pioneers migrating to the Pacific Northwest in the 19th century.", isCorrect: true, rationale: "The trail stretched from Missouri to the Oregon Country and was a key part of westward expansion." },
                        { text: "The path of the first transcontinental railroad.", isCorrect: false, rationale: "The railroad followed a different route." },
                        { text: "The route taken by Lewis and Clark.", isCorrect: false, rationale: "Lewis and Clark's route was primarily along the Missouri River." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "The belief that states had the right to declare federal laws null and void was called:",
                    answerOptions: [
                        { text: "Federalism", isCorrect: false, rationale: "Federalism is the division of powers, not the nullification of laws." },
                        { text: "Nullification", isCorrect: true, rationale: "This doctrine, most famously advocated by John C. Calhoun of South Carolina, was a major point of contention over states' rights." },
                        { text: "Abolition", isCorrect: false, rationale: "Abolition was the movement to end slavery." },
                        { text: "Manifest Destiny", isCorrect: false, rationale: "This was the belief in westward expansion." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "text",
                    passage: "<p>The presidency of Andrew Jackson is often called the 'Age of the Common Man.' Jacksonian democracy expanded suffrage to most white men, regardless of whether they owned property. This was a departure from the early republic, where voting was often restricted to property-owning elites. Jackson portrayed himself as a champion of the common people against the interests of the wealthy and powerful, fundamentally changing American politics.</p>",
                    question: "What was a major political change during the 'Age of the Common Man'?",
                    answerOptions: [
                        { text: "The right to vote was given to women.", isCorrect: false, rationale: "This did not happen until the 20th century." },
                        { text: "The voting rights of African Americans were protected.", isCorrect: false, rationale: "This era saw the expansion of slavery and the removal of Native Americans; it did not advance rights for African Americans." },
                        { text: "The requirement to own property to vote was eliminated for most white men.", isCorrect: true, rationale: "The passage states that suffrage was expanded to 'most white men, regardless of whether they owned property'." },
                        { text: "The Electoral College was abolished.", isCorrect: false, rationale: "The Electoral College is still in use today." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "What was Harriet Tubman's role in the abolitionist movement?",
                    answerOptions: [
                        { text: "She was the author of the influential anti-slavery novel 'Uncle Tom's Cabin'.", isCorrect: false, rationale: "This was Harriet Beecher Stowe." },
                        { text: "She was a famous conductor on the Underground Railroad who led many enslaved people to freedom.", isCorrect: true, rationale: "Tubman was a former slave who risked her life repeatedly to guide others to freedom." },
                        { text: "She was a lawyer who argued against slavery in the Dred Scott case.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "She was a politician who advocated for the Missouri Compromise.", isCorrect: false, rationale: "She was an abolitionist who would have opposed any compromise with slavery." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The discovery of gold in California in 1848 led to:",
                    answerOptions: [
                        { text: "A massive migration to California and its rapid admission to the Union.", isCorrect: true, rationale: "The Gold Rush caused a population boom that quickly led to California applying for and being granted statehood." },
                        { text: "A decline in the U.S. economy.", isCorrect: false, rationale: "It led to an economic boom." },
                        { text: "The immediate end of the Mexican-American War.", isCorrect: false, rationale: "The war ended just before gold was discovered." },
                        { text: "The construction of the Panama Canal.", isCorrect: false, rationale: "The Panama Canal was built much later." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "Which political party was formed in the 1850s with the primary goal of stopping the expansion of slavery into the western territories?",
                    answerOptions: [
                        { text: "The Democratic Party", isCorrect: false, rationale: "The Democratic Party at this time was deeply divided over slavery but was not an anti-slavery party." },
                        { text: "The Whig Party", isCorrect: false, rationale: "The Whig Party collapsed over the issue of slavery." },
                        { text: "The Federalist Party", isCorrect: false, rationale: "The Federalist Party had disappeared decades earlier." },
                        { text: "The Republican Party", isCorrect: true, rationale: "The Republican Party was founded in 1854 by anti-slavery activists. Its first platform was centered on preventing the extension of slavery." }
                    ]
                }
            ]
        }
    ]
};
// Social Studies -> U.S. History -> Civil War and Reconstruction
AppData.quizzes.ss_civil_war_reconstruction = {
    id: "ss_civil_war_reconstruction",
    title: "Civil War and Reconstruction",
    description: "The causes and outcomes of the Civil War and the era of Reconstruction.",
    quizzes: [
        {
            quizId: "ss_civil_war_reconstruction_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "What was the immediate cause of the secession of the first seven Southern states in 1860-1861?",
                    answerOptions: [
                        { text: "The passage of a high federal tariff.", isCorrect: false, rationale: "While tariffs were a point of contention, the immediate trigger was the election." },
                        { text: "The Supreme Court's decision in Dred Scott v. Sandford.", isCorrect: false, rationale: "This decision favored the South, but it was the election of 1860 that was the immediate cause." },
                        { text: "The election of Abraham Lincoln as President.", isCorrect: true, rationale: "Lincoln's victory on an anti-slavery expansion platform was seen by the South as a direct threat to the institution of slavery, leading to their secession." },
                        { text: "John Brown's raid on Harpers Ferry.", isCorrect: false, rationale: "This event increased tensions but was not the final trigger for secession." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "The Emancipation Proclamation, issued by President Lincoln in 1863, declared that:",
                    answerOptions: [
                        { text: "slavery was illegal throughout the entire United States.", isCorrect: false, rationale: "It was a strategic military order and did not apply to slave states that remained loyal to the Union." },
                        { text: "enslaved people in the Confederate states were free.", isCorrect: true, rationale: "It was a war measure that declared slaves in the rebellious states to be free, weakening the Confederate war effort and shifting the moral purpose of the war." },
                        { text: "all African Americans were granted U.S. citizenship.", isCorrect: false, rationale: "Citizenship was later addressed by the 14th Amendment." },
                        { text: "enslaved people would be gradually freed over 20 years.", isCorrect: false, rationale: "It declared an immediate, though not universal, emancipation." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "knowledge",
                    question: "Which battle is considered the turning point of the Civil War in the East?",
                    answerOptions: [
                        { text: "The Battle of Antietam", isCorrect: false, rationale: "This battle was strategically important as it prompted the Emancipation Proclamation, but Gettysburg is considered the major turning point." },
                        { text: "The Battle of Gettysburg", isCorrect: true, rationale: "The Union victory at Gettysburg in July 1863 ended General Lee's second invasion of the North and marked the point from which the Confederacy was largely on the defensive." },
                        { text: "The First Battle of Bull Run", isCorrect: false, rationale: "This was the first major battle and a Confederate victory, showing the war would be long and bloody." },
                        { text: "The Siege of Vicksburg", isCorrect: false, rationale: "Vicksburg was a turning point in the West, giving the Union control of the Mississippi River." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "text",
                    passage: "<p>The period after the Civil War, from 1865 to 1877, is known as Reconstruction. The primary goals of Reconstruction were to rebuild the South, reintegrate the former Confederate states into the Union, and address the status of the newly freed African Americans. This era saw the passage of the 13th, 14th, and 15th Amendments, which abolished slavery, granted citizenship, and established voting rights for African American men.</p>",
                    question: "What was a major goal of the Reconstruction era?",
                    answerOptions: [
                        { text: "To expand U.S. territory westward.", isCorrect: false, rationale: "This was a feature of the pre-war era." },
                        { text: "To reintegrate the Southern states into the Union.", isCorrect: true, rationale: "The passage explicitly lists this as a primary goal of Reconstruction." },
                        { text: "To establish a new currency.", isCorrect: false, rationale: "This was not a primary goal of Reconstruction." },
                        { text: "To reduce the power of the federal government.", isCorrect: false, rationale: "Reconstruction involved a significant use of federal power to enforce its policies in the South." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which amendment to the Constitution officially abolished slavery throughout the United States?",
                    answerOptions: [
                        { text: "The 13th Amendment", isCorrect: true, rationale: "Ratified in 1865, the 13th Amendment formally abolished slavery and involuntary servitude, except as punishment for a crime." },
                        { text: "The 14th Amendment", isCorrect: false, rationale: "The 14th Amendment granted citizenship and equal protection under the law." },
                        { text: "The 15th Amendment", isCorrect: false, rationale: "The 15th Amendment prohibited the denial of the right to vote based on race." },
                        { text: "The Emancipation Proclamation", isCorrect: false, rationale: "This was an executive order that freed slaves in the Confederacy, but it was the 13th Amendment that abolished slavery nationwide." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "What was the primary advantage of the Union (the North) at the start of the Civil War?",
                    answerOptions: [
                        { text: "Superior military leadership.", isCorrect: false, rationale: "In the early years of the war, the Confederacy was generally considered to have superior military leadership." },
                        { text: "A stronger industrial base and larger population.", isCorrect: true, rationale: "The North's factories, railroads, and larger population gave it a significant long-term advantage in resources and manpower." },
                        { text: "The support of foreign allies like Britain and France.", isCorrect: false, rationale: "Britain and France remained officially neutral, though they had economic ties to both sides." },
                        { text: "Fighting a defensive war on familiar territory.", isCorrect: false, rationale: "This was the primary advantage of the Confederacy (the South)." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>Sharecropping was an agricultural system that emerged in the South after the Civil War. In this system, a landowner allows a tenant (often a formerly enslaved person) to use the land in return for a share of the crops produced on their portion of land. While it offered a semblance of independence, the system often trapped sharecroppers in a cycle of debt and poverty, as they had to buy supplies on credit from the landowner and were frequently left with little to no profit after the harvest was divided.</p>",
                    question: "What was a major economic consequence of the sharecropping system for many former slaves?",
                    answerOptions: [
                        { text: "It allowed them to quickly achieve economic independence and wealth.", isCorrect: false, rationale: "The passage states the opposite, that it trapped them in debt." },
                        { text: "It created a cycle of debt that was difficult to escape.", isCorrect: true, rationale: "The passage describes how the system 'often trapped sharecroppers in a cycle of debt and poverty'." },
                        { text: "It led to the redistribution of land from plantation owners to former slaves.", isCorrect: false, rationale: "The land remained in the hands of the original owners." },
                        { text: "It encouraged the growth of industrial factories in the South.", isCorrect: false, rationale: "Sharecropping was an agricultural system that kept the South's economy tied to farming." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "The assassination of President Abraham Lincoln in 1865 was carried out by:",
                    answerOptions: [
                        { text: "A Confederate soldier during a battle.", isCorrect: false, rationale: "Lincoln was assassinated after the war had ended." },
                        { text: "John Wilkes Booth, a Confederate sympathizer.", isCorrect: true, rationale: "Booth, a well-known actor, shot Lincoln at Ford's Theatre as part of a conspiracy to decapitate the Union government." },
                        { text: "A disgruntled Union general.", isCorrect: false, rationale: "The assassin was a Confederate sympathizer." },
                        { text: "An anarchist protestor.", isCorrect: false, rationale: "The assassination was directly related to the Civil War." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The 'Black Codes' were laws passed by Southern states immediately after the Civil War with the purpose of:",
                    answerOptions: [
                        { text: "Ensuring equal rights and protections for African Americans.", isCorrect: false, rationale: "They were designed to do the opposite." },
                        { text: "Restricting the freedom of African Americans and compelling them to work in a labor economy based on low wages or debt.", isCorrect: true, rationale: "These codes were a way for white-dominated Southern legislatures to control the newly freed population and maintain a system similar to slavery." },
                        { text: "Providing education and land to former slaves.", isCorrect: false, rationale: "This was a goal of some Reconstruction efforts, like the Freedmen's Bureau, but it was opposed by the Black Codes." },
                        { text: "Punishing former Confederate leaders.", isCorrect: false, rationale: "These codes were created by governments led by former Confederates." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "What was the significance of the Battle of Vicksburg?",
                    answerOptions: [
                        { text: "It was the first major battle of the war.", isCorrect: false, rationale: "This was the First Battle of Bull Run." },
                        { text: "It gave the Union control of the Mississippi River, splitting the Confederacy in two.", isCorrect: true, rationale: "The capture of Vicksburg in July 1863 was a major strategic victory and a key part of the Union's 'Anaconda Plan'." },
                        { text: "It was the battle that led to the Emancipation Proclamation.", isCorrect: false, rationale: "That was the Battle of Antietam." },
                        { text: "It was the final surrender of the Confederate army.", isCorrect: false, rationale: "The final surrender was at Appomattox Court House." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>The 14th Amendment, ratified in 1868, is one of the most important of the Reconstruction Amendments. Its first section includes the Citizenship Clause, which granted citizenship to all persons born or naturalized in the United States, including former slaves. It also contains the Equal Protection Clause, which requires states to provide equal protection under the law to all people within their jurisdictions.</p>",
                    question: "What was a key provision of the 14th Amendment?",
                    answerOptions: [
                        { text: "It abolished slavery.", isCorrect: false, rationale: "This was the 13th Amendment." },
                        { text: "It granted citizenship to all persons born in the U.S. and guaranteed equal protection of the laws.", isCorrect: true, rationale: "The passage identifies the Citizenship Clause and the Equal Protection Clause as key parts of the amendment." },
                        { text: "It gave women the right to vote.", isCorrect: false, rationale: "This was the 19th Amendment." },
                        { text: "It prohibited the sale of alcohol.", isCorrect: false, rationale: "This was the 18th Amendment." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "What was the Freedmen's Bureau?",
                    answerOptions: [
                        { text: "A Southern organization created to enforce the Black Codes.", isCorrect: false, rationale: "It was a federal agency designed to help, not restrict, former slaves." },
                        { text: "A federal agency created to help former slaves and poor whites in the South after the Civil War.", isCorrect: true, rationale: "The Bureau provided food, housing, medical aid, established schools, and offered legal assistance during the Reconstruction era." },
                        { text: "A political party for African Americans.", isCorrect: false, rationale: "It was a government agency." },
                        { text: "A bank created to manage the South's economy.", isCorrect: false, rationale: "It was primarily a social welfare agency." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "The formal end of the Civil War occurred when General Robert E. Lee surrendered to General Ulysses S. Grant at:",
                    answerOptions: [
                        { text: "Gettysburg, Pennsylvania", isCorrect: false, rationale: "Gettysburg was a turning point, not the end of the war." },
                        { text: "Richmond, Virginia", isCorrect: false, rationale: "Richmond was the Confederate capital, but the surrender took place elsewhere." },
                        { text: "Appomattox Court House, Virginia", isCorrect: true, rationale: "Lee's surrender of the Army of Northern Virginia on April 9, 1865, is generally considered the end of the Civil War." },
                        { text: "Washington, D.C.", isCorrect: false, rationale: "This was the Union capital." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Who were carpetbaggers and scalawags during Reconstruction?",
                    answerOptions: [
                        { text: "Carpetbaggers were Southerners who supported the Union; scalawags were Northerners who moved South.", isCorrect: false, rationale: "This reverses the definitions." },
                        { text: "Carpetbaggers were Northerners who moved South; scalawags were white Southerners who supported Reconstruction.", isCorrect: true, rationale: "These were derogatory terms used by opponents of Reconstruction to describe these two groups." },
                        { text: "Both were terms for African American political leaders.", isCorrect: false, rationale: "These terms referred to white Republicans." },
                        { text: "Both were terms for Confederate soldiers.", isCorrect: false, rationale: "They were terms for supporters of the Republican-led Reconstruction." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The Compromise of 1877, which resolved the disputed presidential election of 1876, is significant because it:",
                    answerOptions: [
                        { text: "Formally began the Reconstruction era.", isCorrect: false, rationale: "It effectively ended it." },
                        { text: "Led to the withdrawal of federal troops from the South, effectively ending Reconstruction.", isCorrect: true, rationale: "In the compromise, Republican Rutherford B. Hayes was given the presidency in exchange for the removal of federal troops, which allowed Southern Democrats to regain control and end the era of Reconstruction." },
                        { text: "Granted voting rights to all African American men.", isCorrect: false, rationale: "This was the 15th Amendment, passed earlier. The end of Reconstruction led to the disenfranchisement of Black voters." },
                        { text: "Admitted California to the Union as a free state.", isCorrect: false, rationale: "This was the Compromise of 1850." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_civil_war_reconstruction_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Sectionalism, states' rights, and slavery were the primary __________ of the Civil War.",
                    answerOptions: [
                        { text: "outcomes", isCorrect: false, rationale: "These were the reasons the war was fought, not its results." },
                        { text: "battles", isCorrect: false, rationale: "These are ideological and economic issues, not battles." },
                        { text: "causes", isCorrect: true, rationale: "These three interconnected issues were the fundamental, long-term causes of the conflict between the North and South." },
                        { text: "amendments", isCorrect: false, rationale: "The Reconstruction amendments were an outcome of the war." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "Which side had the advantage of fighting a defensive war on familiar terrain?",
                    answerOptions: [
                        { text: "The Union (North)", isCorrect: false, rationale: "The Union's goal was to invade and conquer the South to preserve the nation." },
                        { text: "The Confederacy (South)", isCorrect: true, rationale: "The South's strategic goal was simply to defend its territory and outlast the North's will to fight, which gave them a significant advantage." },
                        { text: "Both sides equally", isCorrect: false, rationale: "The vast majority of the war was fought in the South." },
                        { text: "Foreign allies", isCorrect: false, rationale: "Foreign nations did not fight on American soil during the war." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The Gettysburg Address is a speech delivered by President Abraham Lincoln in November 1863 at the dedication of the Soldiers' National Cemetery in Gettysburg, Pennsylvania. In it, Lincoln framed the Civil War as a struggle not just for the preservation of the Union, but as 'a new birth of freedom' that would bring true equality to all of its citizens. He urged the living to ensure that the soldiers had not 'died in vain'.</p>",
                    question: "What was the main theme of Lincoln's Gettysburg Address?",
                    answerOptions: [
                        { text: "To celebrate the military victory at Gettysburg.", isCorrect: false, rationale: "While the occasion was the dedication of a cemetery for the battle, the speech's purpose was to redefine the meaning of the war." },
                        { text: "To propose a peace treaty with the Confederacy.", isCorrect: false, rationale: "The speech was a call to continue the fight." },
                        { text: "To honor the fallen soldiers and redefine the purpose of the war as a struggle for freedom and equality.", isCorrect: true, rationale: "The passage highlights how Lincoln framed the war as a fight for a 'new birth of freedom' and honored the soldiers who had died." },
                        { text: "To outline his plan for Reconstruction after the war.", isCorrect: false, rationale: "Reconstruction plans were developed later; this speech focused on the purpose of the war itself." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "The 15th Amendment to the Constitution, ratified in 1870, stated that:",
                    answerOptions: [
                        { text: "Slavery was illegal.", isCorrect: false, rationale: "This was the 13th Amendment." },
                        { text: "All persons born in the U.S. were citizens.", isCorrect: false, rationale: "This was the 14th Amendment." },
                        { text: "The right to vote could not be denied based on race, color, or previous condition of servitude.", isCorrect: true, rationale: "This amendment was specifically intended to protect the voting rights of African American men." },
                        { text: "Women had the right to vote.", isCorrect: false, rationale: "This was the 19th Amendment." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Who was the president of the Confederate States of America?",
                    answerOptions: [
                        { text: "Robert E. Lee", isCorrect: false, rationale: "Robert E. Lee was the commanding general of the Confederate army." },
                        { text: "Jefferson Davis", isCorrect: true, rationale: "Davis, a former U.S. Senator from Mississippi, was elected as the president of the Confederacy." },
                        { text: "Stonewall Jackson", isCorrect: false, rationale: "Jackson was a prominent Confederate general." },
                        { text: "Stephen Douglas", isCorrect: false, rationale: "Douglas was a U.S. Senator from Illinois who ran against Lincoln for president in 1860." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "What was General William T. Sherman's 'March to the Sea'?",
                    answerOptions: [
                        { text: "A failed Confederate attempt to capture Washington, D.C.", isCorrect: false, rationale: "This was a Union military campaign." },
                        { text: "A Union military campaign that involved marching through Georgia and destroying military and civilian property.", isCorrect: true, rationale: "Sherman's campaign of 'total war' was designed to break the will of the Southern people to continue fighting by destroying their resources and infrastructure." },
                        { text: "The first naval battle of the Civil War.", isCorrect: false, rationale: "This was a land-based campaign." },
                        { text: "A peaceful protest march led by abolitionists.", isCorrect: false, rationale: "It was a destructive military campaign." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>After President Lincoln's assassination, his Vice President, Andrew Johnson, became president. Johnson's plan for Reconstruction was lenient toward the former Confederate states. He pardoned many former Confederate leaders and allowed Southern states to quickly rejoin the Union with few conditions. His approach clashed with the Radical Republicans in Congress, who wanted to punish the South and protect the rights of newly freed African Americans. This conflict led to Johnson's impeachment by the House of Representatives.</p>",
                    question: "President Andrew Johnson's Reconstruction plan was opposed by Radical Republicans because:",
                    answerOptions: [
                        { text: "it was too harsh on the Southern states.", isCorrect: false, rationale: "The passage describes his plan as 'lenient'." },
                        { text: "it did not do enough to protect the rights of former slaves.", isCorrect: true, rationale: "The passage states that Radical Republicans wanted to 'protect the rights of newly freed African Americans,' which Johnson's lenient plan failed to do." },
                        { text: "it refused to allow Southern states to rejoin the Union.", isCorrect: false, rationale: "His plan allowed them to rejoin quickly." },
                        { text: "it called for the execution of all former Confederate leaders.", isCorrect: false, rationale: "The passage states he pardoned many of them." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "What were 'Jim Crow' laws?",
                    answerOptions: [
                        { text: "Laws passed during Reconstruction to protect the rights of African Americans.", isCorrect: false, rationale: "Jim Crow laws did the opposite." },
                        { text: "State and local laws enacted in the South after Reconstruction that enforced racial segregation.", isCorrect: true, rationale: "These laws mandated 'separate but equal' status for African Americans, leading to decades of discrimination and inequality." },
                        { text: "Federal laws that abolished slavery.", isCorrect: false, rationale: "This was the 13th Amendment." },
                        { text: "Laws that regulated the sale of alcohol.", isCorrect: false, rationale: "This was Prohibition." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Which of the following was a major advantage for the Confederacy (the South) during the Civil War?",
                    answerOptions: [
                        { text: "A larger population", isCorrect: false, rationale: "The North had a much larger population." },
                        { text: "A more extensive railroad network", isCorrect: false, rationale: "The North had a superior industrial and transportation infrastructure." },
                        { text: "Experienced military leadership", isCorrect: true, rationale: "Many of the most experienced officers from the U.S. Army, such as Robert E. Lee, sided with the Confederacy at the start of the war." },
                        { text: "A strong industrial economy", isCorrect: false, rationale: "The South's economy was primarily agrarian." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "The Battle of Antietam is historically significant because:",
                    answerOptions: [
                        { text: "It was the final battle of the war.", isCorrect: false, rationale: "This was Appomattox Court House." },
                        { text: "It was a decisive Confederate victory that led to the capture of Washington, D.C.", isCorrect: false, rationale: "It was a strategic Union victory, and Washington, D.C. was never captured." },
                        { text: "The Union victory gave President Lincoln the political standing to issue the Emancipation Proclamation.", isCorrect: true, rationale: "Lincoln was waiting for a Union victory to issue the proclamation, and the battle, though bloody, was enough of a success to provide that opportunity." },
                        { text: "It gave the Union control of the Mississippi River.", isCorrect: false, rationale: "This was the result of the Siege of Vicksburg." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>The Ku Klux Klan (KKK) was a secret society founded by Confederate veterans in the South during Reconstruction. Its primary goal was to oppose the policies of Radical Reconstruction and to maintain white supremacy. Using intimidation, violence, and murder, the KKK targeted African Americans, as well as white Republicans, to prevent them from exercising their political rights, particularly the right to vote.</p>",
                    question: "What was the main purpose of the Ku Klux Klan during Reconstruction?",
                    answerOptions: [
                        { text: "To provide aid and education to former slaves.", isCorrect: false, rationale: "This was the purpose of the Freedmen's Bureau." },
                        { text: "To help rebuild the Southern economy through industrialization.", isCorrect: false, rationale: "The KKK was a terrorist organization, not an economic one." },
                        { text: "To use violence and intimidation to suppress the rights of African Americans and their supporters.", isCorrect: true, rationale: "The passage clearly states that the KKK targeted African Americans and white Republicans to prevent them from exercising their political rights." },
                        { text: "To advocate for a peaceful reconciliation between the North and South.", isCorrect: false, rationale: "The KKK used violence to resist the outcomes of the war." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "What was the immediate effect of the Emancipation Proclamation on the slaves in the border states that remained in the Union?",
                    answerOptions: [
                        { text: "They were immediately freed.", isCorrect: false, rationale: "The Proclamation only applied to states in rebellion." },
                        { text: "They were not directly affected, as the proclamation only applied to states in rebellion.", isCorrect: true, rationale: "Lincoln carefully worded the proclamation to apply only to the Confederacy, to avoid alienating the crucial border states (like Kentucky and Maryland) where slavery was still legal." },
                        { text: "They were given the right to vote.", isCorrect: false, rationale: "The proclamation was about emancipation, not suffrage." },
                        { text: "They were forced to join the Confederate army.", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Who became president after Abraham Lincoln was assassinated?",
                    answerOptions: [
                        { text: "Ulysses S. Grant", isCorrect: false, rationale: "Grant was elected president after Johnson's term." },
                        { text: "Andrew Johnson", isCorrect: true, rationale: "As Vice President, Johnson assumed the presidency upon Lincoln's death." },
                        { text: "Robert E. Lee", isCorrect: false, rationale: "Lee was the Confederate general." },
                        { text: "Jefferson Davis", isCorrect: false, rationale: "Davis was the president of the Confederacy." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "The end of Reconstruction in 1877 allowed:",
                    answerOptions: [
                        { text: "The federal government to increase its control over the South.", isCorrect: false, rationale: "It marked the end of federal intervention." },
                        { text: "Southern Democrats to regain political power and establish systems of segregation.", isCorrect: true, rationale: "The withdrawal of federal troops allowed 'Redeemer' governments to come to power, effectively ending the political and social gains made by African Americans during Reconstruction." },
                        { text: "African Americans to achieve full social and political equality.", isCorrect: false, rationale: "The end of Reconstruction led to the opposite outcome." },
                        { text: "The Southern economy to become primarily industrial.", isCorrect: false, rationale: "The Southern economy remained largely agricultural for many more decades." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "What was the anaconda plan?",
                    answerOptions: [
                        { text: "The Confederate strategy to capture Washington, D.C.", isCorrect: false, rationale: "This was a Union strategy." },
                        { text: "The Union's three-part strategy to blockade the South, control the Mississippi River, and capture the Confederate capital.", isCorrect: true, rationale: "The plan was designed to 'squeeze' the Confederacy by cutting off its trade and splitting its territory." },
                        { text: "A plan to assassinate President Lincoln.", isCorrect: false, rationale: "This was a military strategy." },
                        { text: "The Reconstruction plan proposed by Andrew Johnson.", isCorrect: false, rationale: "This was a military strategy." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_civil_war_reconstruction_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which of the following was a significant advantage for the South (Confederacy) at the beginning of the Civil War?",
                    answerOptions: [
                        { text: "A large and well-established navy.", isCorrect: false, rationale: "The South had a very small navy; the Union had a significant naval advantage." },
                        { text: "A strong belief in its cause and the need to defend its homeland.", isCorrect: true, rationale: "Fighting a defensive war to protect their way of life provided a powerful motivation for Confederate soldiers." },
                        { text: "A large industrial capacity to produce weapons and supplies.", isCorrect: false, rationale: "This was a major advantage for the North." },
                        { text: "A larger population to draw soldiers from.", isCorrect: false, rationale: "The North had a population of about 22 million, compared to the South's 9 million (of whom more than a third were enslaved)." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "What was the purpose of the 13th Amendment?",
                    answerOptions: [
                        { text: "To grant citizenship to former slaves.", isCorrect: false, rationale: "This was the 14th Amendment." },
                        { text: "To give all men the right to vote, regardless of race.", isCorrect: false, rationale: "This was the 15th Amendment." },
                        { text: "To abolish slavery throughout the United States.", isCorrect: true, rationale: "Ratified after the war, this amendment made slavery and involuntary servitude unconstitutional." },
                        { text: "To define the powers of the three branches of government.", isCorrect: false, rationale: "This is done in the main body of the Constitution." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The Battle of Fort Sumter in April 1861 was the first military engagement of the Civil War. Confederate forces opened fire on the Union-held fort in the harbor of Charleston, South Carolina. After a day of bombardment, the Union garrison surrendered. While there were no casualties in the battle itself, the attack on a federal fort galvanized the North, and President Lincoln called for 75,000 volunteers to put down the rebellion, marking the beginning of the full-scale war.</p>",
                    question: "What was the significance of the Battle of Fort Sumter?",
                    answerOptions: [
                        { text: "It was a major turning point that favored the Union.", isCorrect: false, rationale: "It was the first battle, not a turning point." },
                        { text: "It was the first armed conflict that began the Civil War.", isCorrect: true, rationale: "The passage identifies it as the 'first military engagement of the Civil War'." },
                        { text: "It was the battle where the Confederacy surrendered.", isCorrect: false, rationale: "This was the first battle, not the last." },
                        { text: "It led to the issuing of the Emancipation Proclamation.", isCorrect: false, rationale: "The Emancipation Proclamation was issued after the Battle of Antietam." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "During Reconstruction, the term 'scalawag' was used by opponents to describe:",
                    answerOptions: [
                        { text: "Northerners who moved to the South to profit from Reconstruction.", isCorrect: false, rationale: "This was the derogatory term 'carpetbagger'." },
                        { text: "White Southerners who supported Republican Reconstruction policies.", isCorrect: true, rationale: "They were seen as traitors to the South by their opponents." },
                        { text: "African Americans who were elected to political office.", isCorrect: false, rationale: "This term was used for white Republicans." },
                        { text: "Former Confederate generals.", isCorrect: false, rationale: "This term was used for their opponents." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What was the main goal of the Radical Republicans in Congress during Reconstruction?",
                    answerOptions: [
                        { text: "To quickly and leniently readmit the Southern states to the Union.", isCorrect: false, rationale: "This was the approach of Presidents Lincoln and Johnson." },
                        { text: "To punish the South for the Civil War and to secure full civil rights for African Americans.", isCorrect: true, rationale: "Radical Republicans believed the South should be transformed and that the rights of former slaves needed strong federal protection." },
                        { text: "To repeal the 13th Amendment.", isCorrect: false, rationale: "They championed the 13th, 14th, and 15th Amendments." },
                        { text: "To elect a former Confederate general as president.", isCorrect: false, rationale: "This is the opposite of their goals." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Which of these was NOT part of the Union's 'Anaconda Plan'?",
                    answerOptions: [
                        { text: "Blockade Southern ports to cut off trade.", isCorrect: false, rationale: "This was a key part of the plan." },
                        { text: "Gain control of the Mississippi River.", isCorrect: false, rationale: "This was a key part of the plan to split the Confederacy." },
                        { text: "Capture the Confederate capital of Richmond.", isCorrect: false, rationale: "This was a key part of the plan." },
                        { text: "Convince Britain and France to ally with the Union.", isCorrect: true, rationale: "A major goal of Union diplomacy was to keep Britain and France neutral, not to secure them as military allies." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>The 14th Amendment's Citizenship Clause overturned the Dred Scott decision by stating that 'All persons born or naturalized in the United States... are citizens of the United States and of the State wherein they reside.' This constitutional guarantee of birthright citizenship was a radical and essential step in securing rights for formerly enslaved people.</p>",
                    question: "The Citizenship Clause of the 14th Amendment was important because it:",
                    answerOptions: [
                        { text: "Abolished slavery.", isCorrect: false, rationale: "Slavery was abolished by the 13th Amendment." },
                        { text: "Overturned the Dred Scott decision by granting citizenship to former slaves.", isCorrect: true, rationale: "The passage explicitly states that the amendment 'overturned the Dred Scott decision by stating that 'All persons born... in the United States... are citizens'.'" },
                        { text: "Gave all citizens the right to vote.", isCorrect: false, rationale: "Voting rights were specifically addressed in the 15th (for race) and 19th (for sex) Amendments." },
                        { text: "Established the sharecropping system.", isCorrect: false, rationale: "This was an economic system, not a constitutional amendment." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "What was the purpose of the Freedmen's Bureau?",
                    answerOptions: [
                        { text: "To manage the Confederate army.", isCorrect: false, rationale: "It was a Union agency created after the war." },
                        { text: "To provide assistance like food, education, and legal help to former slaves.", isCorrect: true, rationale: "It was a crucial, though underfunded, federal effort to aid the transition from slavery to freedom." },
                        { text: "To enforce the segregation of races in the South.", isCorrect: false, rationale: "It was created to help African Americans, not to segregate them." },
                        { text: "To oversee the construction of railroads in the West.", isCorrect: false, rationale: "Its focus was on the South and the aftermath of slavery." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Who was the most famous general of the Confederate Army?",
                    answerOptions: [
                        { text: "Ulysses S. Grant", isCorrect: false, rationale: "Grant was the final and most successful commanding general of the Union Army." },
                        { text: "William T. Sherman", isCorrect: false, rationale: "Sherman was a famous Union general known for his 'March to the Sea'." },
                        { text: "Robert E. Lee", isCorrect: true, rationale: "Lee commanded the Army of Northern Virginia and is considered one of the most brilliant military tacticians in American history." },
                        { text: "George McClellan", isCorrect: false, rationale: "McClellan was an early, and overly cautious, general for the Union." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "The conflict over 'states' rights' leading up to the Civil War was primarily about:",
                    answerOptions: [
                        { text: "The right of states to regulate their own economies without federal interference.", isCorrect: false, rationale: "While a part of the debate, this was secondary to the main issue." },
                        { text: "The right of states to nullify federal laws they disagreed with, particularly those that might threaten the institution of slavery.", isCorrect: true, rationale: "The Southern defense of 'states' rights' was fundamentally about protecting the right to own slaves from a potentially hostile federal government." },
                        { text: "The right of states to create their own foreign policy.", isCorrect: false, rationale: "Foreign policy is an exclusive power of the federal government." },
                        { text: "The right of states to decide their own borders.", isCorrect: false, rationale: "This is not what the states' rights debate was about." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>The Homestead Act of 1862 was a law passed by the U.S. Congress during the Civil War. It encouraged western migration by providing settlers with 160 acres of public land. In exchange, homesteaders paid a small filing fee and were required to complete five years of continuous residence before receiving ownership of the land. The act helped to accelerate the settlement of the American West.</p>",
                    question: "The Homestead Act was designed to:",
                    answerOptions: [
                        { text: "Create large national parks.", isCorrect: false, rationale: "It was designed to transfer public land to private citizens." },
                        { text: "Encourage settlement of the western territories.", isCorrect: true, rationale: "The passage states that the act 'encouraged western migration by providing settlers with 160 acres of public land'." },
                        { text: "Fund the Union war effort through land sales.", isCorrect: false, rationale: "The land was given away for a very small fee, not sold for profit." },
                        { text: "Grant land to former slaves in the South.", isCorrect: false, rationale: "This was a separate, and largely unfulfilled, proposal ('40 acres and a mule'). The Homestead Act was for the West." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "The impeachment of President Andrew Johnson was primarily the result of:",
                    answerOptions: [
                        { text: "His leniency toward the South and his battles with Radical Republicans over Reconstruction.", isCorrect: true, rationale: "The technical grounds for impeachment were his violation of the Tenure of Office Act, but the underlying cause was the deep political conflict between the President and Congress over how to handle Reconstruction." },
                        { text: "His role in the assassination of Abraham Lincoln.", isCorrect: false, rationale: "He was the victim of an assassination attempt himself, but was not involved in the conspiracy." },
                        { text: "A financial corruption scandal.", isCorrect: false, rationale: "The impeachment was about a power struggle, not financial corruption." },
                        { text: "His failure to effectively manage the military.", isCorrect: false, rationale: "The Civil War was over by the time he was president." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "Which of the following was an immediate result of the end of Reconstruction in 1877?",
                    answerOptions: [
                        { text: "The beginning of a long period of racial equality in the South.", isCorrect: false, rationale: "The opposite occurred." },
                        { text: "The loss of political power for African Americans in the South.", isCorrect: true, rationale: "With federal troops gone, Southern Democratic governments quickly passed laws to disenfranchise Black voters and establish segregation." },
                        { text: "The industrialization of the Southern economy.", isCorrect: false, rationale: "The South remained largely agricultural." },
                        { text: "The election of a Republican president.", isCorrect: false, rationale: "The Compromise of 1877 put a Republican in office, but the long-term political result in the South was the rise of the 'Solid South' for the Democratic party." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Who was Ulysses S. Grant?",
                    answerOptions: [
                        { text: "The President of the Confederacy.", isCorrect: false, rationale: "This was Jefferson Davis." },
                        { text: "The leading general of the Union Army and later President of the United States.", isCorrect: true, rationale: "Grant's victories in the West, and later as commander of all Union armies, were crucial to winning the war. He was elected President in 1868." },
                        { text: "An influential abolitionist and author.", isCorrect: false, rationale: "This describes figures like Frederick Douglass or William Lloyd Garrison." },
                        { text: "The assassin of Abraham Lincoln.", isCorrect: false, rationale: "This was John Wilkes Booth." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The term 'secession' refers to:",
                    answerOptions: [
                        { text: "The act of formally withdrawing from a federation or body, especially a political state.", isCorrect: true, rationale: "The Civil War began when Southern states seceded from the United States." },
                        { text: "The process of adding a new amendment to the Constitution.", isCorrect: false, rationale: "This is the amendment process." },
                        { text: "A military strategy of surrounding an enemy.", isCorrect: false, rationale: "This is a siege or blockade." },
                        { text: "A system where land is rented in exchange for a share of the crops.", isCorrect: false, rationale: "This is sharecropping." }
                    ]
                }
            ]
        }
    ]
};
// Social Studies -> U.S. History -> The Industrial Revolution, Progressive Era, and the Gilded Age
AppData.quizzes.ss_industrial_revolution_progressive_era = {
    id: "ss_industrial_revolution_progressive_era",
    title: "The Industrial Revolution, Progressive Era, and the Gilded Age",
    description: "Industrialization, immigration, and reform movements from the late 19th to early 20th centuries.",
    quizzes: [
        {
            quizId: "ss_industrial_revolution_progressive_era_set1",
            label: "Quiz A",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "The period in the late 19th century characterized by rapid industrialization, economic growth, and significant wealth inequality was known as:",
                    answerOptions: [
                        { text: "The Progressive Era", isCorrect: false, rationale: "The Progressive Era was a period of reform that followed and overlapped with the Gilded Age." },
                        { text: "The Gilded Age", isCorrect: true, rationale: "Coined by Mark Twain, this term refers to the era's glittering surface of wealth and prosperity that masked underlying social problems and corruption." },
                        { text: "Reconstruction", isCorrect: false, rationale: "Reconstruction was the period immediately following the Civil War." },
                        { text: "The Roaring Twenties", isCorrect: false, rationale: "This refers to the 1920s." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "What was a major goal of the Progressive Movement in the early 20th century?",
                    answerOptions: [
                        { text: "To reduce the power of the federal government.", isCorrect: false, rationale: "Progressives often sought to use the power of the government to regulate business and solve social problems." },
                        { text: "To correct the social and economic problems caused by industrialization.", isCorrect: true, rationale: "The movement addressed issues such as political corruption, unsafe working conditions, child labor, and the power of large corporations (trusts)." },
                        { text: "To promote westward expansion.", isCorrect: false, rationale: "This was a feature of the 19th century, before the Progressive Era." },
                        { text: "To limit immigration to the United States.", isCorrect: false, rationale: "While some Progressives were nativists, the movement's main goals were focused on domestic reform." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The Transcontinental Railroad, completed in 1869, was a transformative project. It connected the eastern U.S. rail network with the Pacific coast, creating a national transportation system. The railroad drastically reduced travel time across the continent from months to about a week. It facilitated trade, encouraged settlement in the West, and was a key factor in the economic integration of the nation. However, its construction also had devastating consequences for Native American tribes, whose lands were crossed and whose buffalo herds were decimated.</p>",
                    question: "What was a major effect of the completion of the Transcontinental Railroad?",
                    answerOptions: [
                        { text: "It led to a decline in westward settlement.", isCorrect: false, rationale: "The passage states it 'encouraged settlement in the West'." },
                        { text: "It significantly reduced cross-country travel time and boosted the national economy.", isCorrect: true, rationale: "The passage highlights the reduction in travel time and how it 'facilitated trade' and promoted 'economic integration'." },
                        { text: "It improved relations between the U.S. government and Native American tribes.", isCorrect: false, rationale: "The passage notes its 'devastating consequences' for Native Americans." },
                        { text: "It was the main cause of the Civil War.", isCorrect: false, rationale: "It was completed after the Civil War." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "Journalists who exposed corruption in politics and business during the Progressive Era were known as:",
                    answerOptions: [
                        { text: "Robber Barons", isCorrect: false, rationale: "This was a negative term for powerful industrialists of the Gilded Age." },
                        { text: "Muckrakers", isCorrect: true, rationale: "Writers like Upton Sinclair ('The Jungle') and Ida Tarbell ('The History of the Standard Oil Company') were called muckrakers for their investigative journalism that exposed societal problems." },
                        { text: "Yellow Journalists", isCorrect: false, rationale: "Yellow journalism refers to sensationalized, often exaggerated news reporting to attract readers." },
                        { text: "Carpetbaggers", isCorrect: false, rationale: "This was a term used during Reconstruction." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What was the purpose of the Sherman Antitrust Act of 1890?",
                    answerOptions: [
                        { text: "To encourage the formation of large business monopolies.", isCorrect: false, rationale: "It was designed to do the opposite." },
                        { text: "To regulate railroad prices.", isCorrect: false, rationale: "This was the purpose of the Interstate Commerce Act." },
                        { text: "To prohibit business practices that led to monopolies and restricted competition.", isCorrect: true, rationale: "It was the first federal law to outlaw monopolistic business practices, aiming to promote fair competition." },
                        { text: "To establish a federal income tax.", isCorrect: false, rationale: "This was done by the 16th Amendment." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "Upton Sinclair's novel 'The Jungle' exposed unsanitary conditions in which industry?",
                    answerOptions: [
                        { text: "The steel industry", isCorrect: false, rationale: "The novel was not about the steel industry." },
                        { text: "The railroad industry", isCorrect: false, rationale: "The novel was not about the railroad industry." },
                        { text: "The meatpacking industry", isCorrect: true, rationale: "Sinclair's shocking descriptions of the Chicago meatpacking plants led to public outrage and the passage of the Meat Inspection Act and the Pure Food and Drug Act in 1906." },
                        { text: "The oil industry", isCorrect: false, rationale: "The oil industry was famously exposed by Ida Tarbell." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>In the late 19th and early 20th centuries, millions of immigrants came to the United States, primarily from Southern and Eastern Europe. Most arrived at processing centers like Ellis Island in New York. They were often drawn by the promise of economic opportunity and political freedom. These 'New Immigrants' settled in rapidly growing cities, worked in factories, and contributed to the nation's industrial growth, while also facing challenges such as discrimination, low wages, and crowded living conditions in tenements.</p>",
                    question: "According to the passage, where did the majority of 'New Immigrants' in the late 19th century come from?",
                    answerOptions: [
                        { text: "Northern and Western Europe", isCorrect: false, rationale: "This describes the 'Old Immigrants' who came in earlier waves." },
                        { text: "Southern and Eastern Europe", isCorrect: true, rationale: "The passage explicitly identifies immigrants from this region as the primary group during this period." },
                        { text: "Latin America", isCorrect: false, rationale: "Immigration from Latin America became more prominent in later decades." },
                        { text: "Asia", isCorrect: false, rationale: "While there was some immigration from Asia, the largest group was from Europe." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "What was a major goal of labor unions during the Gilded Age and Progressive Era?",
                    answerOptions: [
                        { text: "To advocate for government ownership of all factories.", isCorrect: false, rationale: "This was a socialist goal, not the primary aim of most major U.S. labor unions." },
                        { text: "To improve wages, working hours, and safety conditions for workers.", isCorrect: true, rationale: "Organizations like the American Federation of Labor (AFL) fought for basic rights for workers through collective bargaining and strikes." },
                        { text: "To oppose new immigration.", isCorrect: false, rationale: "While some unions had nativist stances, their main goal was improving working conditions." },
                        { text: "To support the formation of business trusts.", isCorrect: false, rationale: "Labor unions were the primary opponents of powerful trusts." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The 19th Amendment, ratified in 1920, was a major achievement of the Progressive Era. What right did it grant?",
                    answerOptions: [
                        { text: "The right to a federal income tax", isCorrect: false, rationale: "This was the 16th Amendment." },
                        { text: "The direct election of senators", isCorrect: false, rationale: "This was the 17th Amendment." },
                        { text: "The prohibition of alcohol", isCorrect: false, rationale: "This was the 18th Amendment." },
                        { text: "The right for women to vote", isCorrect: true, rationale: "The 19th Amendment, the culmination of the women's suffrage movement, prohibits the denial of the right to vote on the basis of sex." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>Political machines were powerful organizations that controlled politics in many cities during the Gilded Age. Led by a 'boss,' the machine would provide services and aid to immigrants and the poor in exchange for their votes. While they sometimes provided a necessary social safety net, they were also characterized by widespread corruption, including bribery and election fraud. Tammany Hall in New York City, led by Boss Tweed, is the most famous example of a political machine.</p>",
                    question: "How did political machines maintain their power?",
                    answerOptions: [
                        { text: "By winning elections through fair and open debate.", isCorrect: false, rationale: "The passage states they were characterized by corruption and election fraud." },
                        { text: "By providing essential services to voters in exchange for their political support.", isCorrect: true, rationale: "The passage explains that they 'provide services and aid to immigrants and the poor in exchange for their votes'." },
                        { text: "By supporting Progressive reforms like the secret ballot.", isCorrect: false, rationale: "Reforms like the secret ballot were designed to break the power of political machines." },
                        { text: "By refusing to engage with immigrant communities.", isCorrect: false, rationale: "They specifically targeted immigrant communities to gain their votes." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "What was the main purpose of settlement houses, like Hull House founded by Jane Addams?",
                    answerOptions: [
                        { text: "To serve as headquarters for political machines.", isCorrect: false, rationale: "They were part of the reform movement that often opposed political machines." },
                        { text: "To provide social services, education, and assistance to immigrants and the urban poor.", isCorrect: true, rationale: "Settlement houses were a key part of the Progressive social reform movement, offering services like childcare, English classes, and healthcare." },
                        { text: "To build luxury apartments for the wealthy.", isCorrect: false, rationale: "They served the poor, not the wealthy." },
                        { text: "To function as factories for new immigrants.", isCorrect: false, rationale: "They provided social support, not factory jobs." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "Industrialists like Andrew Carnegie (steel) and John D. Rockefeller (oil) were sometimes called 'captains of industry' and sometimes 'robber barons'. Why?",
                    answerOptions: [
                        { text: "Because they commanded ships during the Civil War.", isCorrect: false, rationale: "These terms relate to their business practices." },
                        { text: "Because they built their fortunes through innovative business practices but also by crushing competition and exploiting workers.", isCorrect: true, rationale: "'Captains of industry' highlights their positive contributions (innovation, economic growth), while 'robber barons' refers to their ruthless tactics (monopolies, low wages)." },
                        { text: "Because they stole their original ideas from other inventors.", isCorrect: false, rationale: "While their tactics were ruthless, the term is broader than just stealing ideas." },
                        { text: "Because they donated their entire fortunes to the government.", isCorrect: false, rationale: "While some, like Carnegie, were famous philanthropists, they did not give their entire fortunes to the government." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "The Pendleton Civil Service Act was passed to:",
                    answerOptions: [
                        { text: "End the spoils system by requiring government jobs to be awarded based on merit.", isCorrect: true, rationale: "The act created the Civil Service Commission and required applicants for many government jobs to pass a competitive exam, a direct response to the corruption of the spoils system." },
                        { text: "Give the president more power to appoint political supporters to government jobs.", isCorrect: false, rationale: "It did the opposite." },
                        { text: "Regulate the railroad industry.", isCorrect: false, rationale: "That was the Interstate Commerce Act." },
                        { text: "Provide pensions for Civil War veterans.", isCorrect: false, rationale: "This was handled through separate legislation." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "Which of these was a major challenge faced by factory workers during the Gilded Age?",
                    answerOptions: [
                        { text: "High wages and short working hours.", isCorrect: false, rationale: "The opposite was true; wages were low and hours were long." },
                        { text: "Guaranteed job security and benefits.", isCorrect: false, rationale: "There was virtually no job security or benefits like health insurance." },
                        { text: "Unsafe working conditions and the use of child labor.", isCorrect: true, rationale: "Factories were often dangerous, and with few regulations, companies frequently employed children for low wages." },
                        { text: "Too much free time.", isCorrect: false, rationale: "Workers often had 10-12 hour workdays, six days a week." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>The Supreme Court case Plessy v. Ferguson (1896) was a major setback for civil rights. The case involved a Louisiana law that required separate railway cars for blacks and whites. The Court upheld the law, establishing the 'separate but equal' doctrine. This legal precedent was used for the next several decades to justify segregation in all aspects of public life, such as schools, hospitals, and restaurants.</p>",
                    question: "What legal doctrine was established by the Plessy v. Ferguson decision?",
                    answerOptions: [
                        { text: "Judicial review", isCorrect: false, rationale: "This was established by Marbury v. Madison." },
                        { text: "'Separate but equal'", isCorrect: true, rationale: "The passage states the Court 'establishing the 'separate but equal' doctrine,' which became the legal basis for segregation." },
                        { text: "'Clear and present danger'", isCorrect: false, rationale: "This is a standard used for limiting freedom of speech." },
                        { text: "'Innocent until proven guilty'", isCorrect: false, rationale: "This is a principle of criminal law." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_industrial_revolution_progressive_era_set2",
            label: "Quiz B",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "Which invention is most closely associated with Thomas Edison?",
                    answerOptions: [
                        { text: "The telephone", isCorrect: false, rationale: "The telephone was invented by Alexander Graham Bell." },
                        { text: "The practical incandescent light bulb", isCorrect: true, rationale: "While not the sole inventor of electric light, Edison's development of a commercially viable and long-lasting light bulb was a key innovation of the era." },
                        { text: "The airplane", isCorrect: false, rationale: "The airplane was invented by the Wright brothers." },
                        { text: "The assembly line", isCorrect: false, rationale: "The moving assembly line was perfected by Henry Ford for automobile production." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "A business that has complete control over a particular industry, with little to no competition, is called a:",
                    answerOptions: [
                        { text: "Corporation", isCorrect: false, rationale: "A corporation is a legal business structure, but it does not necessarily have complete control." },
                        { text: "Labor union", isCorrect: false, rationale: "A labor union is an organization of workers." },
                        { text: "Monopoly", isCorrect: true, rationale: "A monopoly (or trust) was the goal of many Gilded Age industrialists, as it allowed them to control prices and eliminate competition." },
                        { text: "Partnership", isCorrect: false, rationale: "A partnership is a business owned by two or more people." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The Haymarket Riot of 1886 was a major event in the history of the American labor movement. During a labor demonstration in Chicago supporting an eight-hour workday, a bomb was thrown at police, who then opened fire. The event led to the deaths of several police officers and civilians. In the aftermath, public opinion turned against the labor movement, which was increasingly associated with anarchism and violence. Several labor leaders were convicted of conspiracy, despite a lack of evidence connecting them to the bomb.</p>",
                    question: "What was a major consequence of the Haymarket Riot?",
                    answerOptions: [
                        { text: "The immediate establishment of the eight-hour workday.", isCorrect: false, rationale: "The event was a setback for this goal." },
                        { text: "A decline in public support for the labor movement.", isCorrect: true, rationale: "The passage states that 'public opinion turned against the labor movement' because of its association with violence." },
                        { text: "The government passed laws to protect striking workers.", isCorrect: false, rationale: "The government response was to crack down on labor activism." },
                        { text: "The police were found guilty of inciting the riot.", isCorrect: false, rationale: "The passage states that labor leaders were convicted, not the police." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "President Theodore Roosevelt's domestic policy agenda was known as the:",
                    answerOptions: [
                        { text: "New Deal", isCorrect: false, rationale: "This was Franklin D. Roosevelt's program during the Great Depression." },
                        { text: "Great Society", isCorrect: false, rationale: "This was Lyndon B. Johnson's program in the 1960s." },
                        { text: "Square Deal", isCorrect: true, rationale: "Roosevelt's Square Deal focused on the 'Three Cs': conservation of natural resources, control of corporations, and consumer protection." },
                        { text: "New Frontier", isCorrect: false, rationale: "This was John F. Kennedy's program." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "What was the purpose of the Chinese Exclusion Act of 1882?",
                    answerOptions: [
                        { text: "To encourage immigration from China to work on the railroads.", isCorrect: false, rationale: "Chinese laborers had already been crucial in building the railroads; this act was designed to stop further immigration." },
                        { text: "To prohibit the immigration of Chinese laborers to the United States.", isCorrect: true, rationale: "This was the first significant law restricting immigration into the United States of a specific ethnic group, driven by economic fears and racial prejudice." },
                        { text: "To grant U.S. citizenship to all Chinese immigrants.", isCorrect: false, rationale: "It did the opposite, making it harder for those already here to become citizens." },
                        { text: "To establish a trade agreement with China.", isCorrect: false, rationale: "It was an immigration law, not a trade agreement." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "knowledge",
                    question: "The term 'urbanization' refers to:",
                    answerOptions: [
                        { text: "The process of moving from cities to rural areas.", isCorrect: false, rationale: "This is the opposite of urbanization." },
                        { text: "The growth of cities and the migration of people to them.", isCorrect: true, rationale: "The Industrial Revolution fueled rapid urbanization, as people moved from farms to cities in search of factory jobs." },
                        { text: "A movement to reform and improve city governments.", isCorrect: false, rationale: "This was a goal of the Progressive movement." },
                        { text: "The creation of national parks.", isCorrect: false, rationale: "This is related to conservation, not urbanization." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "text",
                    passage: "<p>The Populist Party, or People's Party, was a political party in the late 19th century that was particularly popular among struggling farmers and laborers. Their platform called for a number of reforms designed to give more power to the common people. These included the direct election of senators, a graduated income tax, and government ownership of the railroads. While the party itself was short-lived, many of its ideas were later adopted by the Progressive movement.</p>",
                    question: "Which of the following was a reform advocated by the Populist Party?",
                    answerOptions: [
                        { text: "The abolition of all taxes.", isCorrect: false, rationale: "They advocated for a graduated income tax, not the abolition of all taxes." },
                        { text: "The direct election of senators.", isCorrect: true, rationale: "The passage explicitly lists this as one of their proposed reforms. At the time, senators were chosen by state legislatures." },
                        { text: "A return to a gold-only currency standard.", isCorrect: false, rationale: "The Populists famously advocated for the 'free coinage of silver' to increase the money supply and help debtors." },
                        { text: "The elimination of labor unions.", isCorrect: false, rationale: "The party was popular with laborers and would not have supported this." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "Tenements, which were common in large cities during the Gilded Age, were:",
                    answerOptions: [
                        { text: "Luxury apartments for the wealthy.", isCorrect: false, rationale: "The wealthy lived in mansions, not tenements." },
                        { text: "Large, modern factories.", isCorrect: false, rationale: "Tenements were residential buildings." },
                        { text: "Crowded, often unsanitary apartment buildings that housed poor immigrant and working-class families.", isCorrect: true, rationale: "Reformers like Jacob Riis exposed the terrible living conditions in tenements in his book 'How the Other Half Lives'." },
                        { text: "Government buildings that provided social services.", isCorrect: false, rationale: "These were privately owned, overcrowded housing." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "The 17th Amendment changed the U.S. government by:",
                    answerOptions: [
                        { text: "Establishing a federal income tax.", isCorrect: false, rationale: "This was the 16th Amendment." },
                        { text: "Allowing for the direct election of U.S. Senators by the people.", isCorrect: true, rationale: "Previously, senators were chosen by state legislatures. This Progressive-era reform was intended to make the Senate more responsive to the public and reduce corruption." },
                        { text: "Prohibiting the sale of alcohol.", isCorrect: false, rationale: "This was the 18th Amendment." },
                        { text: "Granting women the right to vote.", isCorrect: false, rationale: "This was the 19th Amendment." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "knowledge",
                    question: "Who was a leading figure in the women's suffrage movement?",
                    answerOptions: [
                        { text: "Jane Addams", isCorrect: false, rationale: "Jane Addams was a pioneer of the settlement house movement." },
                        { text: "Ida Tarbell", isCorrect: false, rationale: "Ida Tarbell was a muckraking journalist who exposed the Standard Oil Company." },
                        { text: "Harriet Beecher Stowe", isCorrect: false, rationale: "She was an abolitionist and author of 'Uncle Tom's Cabin'." },
                        { text: "Susan B. Anthony", isCorrect: true, rationale: "Anthony, along with Elizabeth Cady Stanton, was a key leader of the National American Woman Suffrage Association and a tireless advocate for women's right to vote." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "text",
                    passage: "<p>The Bessemer process, developed in the mid-19th century, was a new technique for making steel from iron. By blasting air through molten iron to burn out impurities, the process made it possible to produce large quantities of high-quality steel cheaply and efficiently. This innovation was crucial to the Industrial Revolution, providing the strong, durable material needed to build railroads, skyscrapers, bridges, and heavy machinery.</p>",
                    question: "What was the main significance of the Bessemer process?",
                    answerOptions: [
                        { text: "It allowed for the creation of the first telephone.", isCorrect: false, rationale: "This is unrelated to steel production." },
                        { text: "It enabled the cheap and efficient mass production of steel.", isCorrect: true, rationale: "The passage states the process made it possible to 'produce large quantities of high-quality steel cheaply and efficiently'." },
                        { text: "It was a new method for refining oil.", isCorrect: false, rationale: "This is unrelated to steel production." },
                        { text: "It created a safer work environment in factories.", isCorrect: false, rationale: "While a technological innovation, the passage focuses on its impact on production, not safety." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "President Theodore Roosevelt was known as a 'trust buster' because he:",
                    answerOptions: [
                        { text: "Believed all large corporations were bad and should be broken up.", isCorrect: false, rationale: "Roosevelt distinguished between 'good' trusts that were efficient and 'bad' trusts that stifled competition." },
                        { text: "Used the Sherman Antitrust Act to break up powerful monopolies that were harmful to the public interest.", isCorrect: true, rationale: "His administration took legal action against several major trusts, most famously the Northern Securities railroad monopoly." },
                        { text: "Encouraged the formation of trusts to strengthen the economy.", isCorrect: false, rationale: "He sought to regulate and control trusts, not encourage them." },
                        { text: "Was the first president to create a business trust.", isCorrect: false, rationale: "He was known for breaking them up, not creating them." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "The term 'nativism' in the late 19th and early 20th centuries refers to:",
                    answerOptions: [
                        { text: "A movement to conserve natural resources.", isCorrect: false, rationale: "This was the conservation movement." },
                        { text: "A policy of favoring native-born inhabitants over immigrants.", isCorrect: true, rationale: "Nativism was a political and social movement characterized by hostility toward immigrants, particularly those from Southern and Eastern Europe and Asia." },
                        { text: "A belief in the importance of Native American culture.", isCorrect: false, rationale: "Nativism was not about respecting Native Americans; it was an anti-immigrant ideology." },
                        { text: "A style of art and literature.", isCorrect: false, rationale: "This is unrelated." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "What was the primary focus of the conservation movement led by figures like Theodore Roosevelt and John Muir?",
                    answerOptions: [
                        { text: "To preserve natural resources and wilderness areas from industrial development.", isCorrect: true, rationale: "Roosevelt created national parks, forests, and monuments, while Muir advocated for the preservation of wilderness for its own sake." },
                        { text: "To conserve energy in factories.", isCorrect: false, rationale: "The movement was focused on natural lands, not industrial efficiency." },
                        { text: "To ensure that all Americans had access to clean water.", isCorrect: false, rationale: "While related to public health, the conservation movement was primarily about land and wildlife." },
                        { text: "To save historical buildings from being demolished.", isCorrect: false, rationale: "This is historic preservation, a different type of conservation." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "knowledge",
                    question: "The Triangle Shirtwaist Factory fire of 1911 was a significant event in the Progressive Era because:",
                    answerOptions: [
                        { text: "It led to the passage of the Sherman Antitrust Act.", isCorrect: false, rationale: "The Sherman Act was passed in 1890, before the fire." },
                        { text: "It started the women's suffrage movement.", isCorrect: false, rationale: "The suffrage movement was already well-established." },
                        { text: "It highlighted the dangerous conditions in factories and led to new workplace safety laws.", isCorrect: true, rationale: "The deaths of nearly 150 workers, mostly young immigrant women, due to locked doors and inadequate fire escapes, led to a public outcry and a wave of new safety regulations." },
                        { text: "It was the first major strike organized by a labor union.", isCorrect: false, rationale: "There had been many major strikes before this event." }
                    ]
                }
            ]
        },
        {
            quizId: "ss_industrial_revolution_progressive_era_set3",
            label: "Quiz C",
            questions: [
                {
                    questionNumber: 1,
                    type: "knowledge",
                    question: "The rapid growth of cities in the late 19th century is known as:",
                    answerOptions: [
                        { text: "Suburbanization", isCorrect: false, rationale: "This refers to the growth of areas outside of cities, which happened later." },
                        { text: "Urbanization", isCorrect: true, rationale: "This period saw a massive shift in population from rural areas to urban centers, driven by industrialization and immigration." },
                        { text: "Gentrification", isCorrect: false, rationale: "This is a more modern term for the renewal of deteriorating urban neighborhoods." },
                        { text: "Westward Expansion", isCorrect: false, rationale: "This refers to the settlement of the western territories." }
                    ]
                },
                {
                    questionNumber: 2,
                    type: "knowledge",
                    question: "Who was Ida B. Wells?",
                    answerOptions: [
                        { text: "A leader in the women's suffrage movement.", isCorrect: false, rationale: "While she supported suffrage, her primary focus was different." },
                        { text: "A muckraking journalist and anti-lynching crusader.", isCorrect: true, rationale: "Wells was an influential African American journalist who courageously documented and exposed the horrors of lynching in the South." },
                        { text: "The founder of the Hull House settlement house.", isCorrect: false, rationale: "This was Jane Addams." },
                        { text: "The inventor of a new steel-making process.", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 3,
                    type: "text",
                    passage: "<p>The development of the steel plow by John Deere and the mechanical reaper by Cyrus McCormick were key innovations in the 19th century. These new farm machines allowed farmers to cultivate much larger areas of land with far less labor. This increased agricultural productivity helped to feed the growing cities and also contributed to the westward migration, as farmers could now manage the vast lands of the prairies.</p>",
                    question: "What was the main impact of inventions like the steel plow and the mechanical reaper?",
                    answerOptions: [
                        { text: "They made farming more difficult and less profitable.", isCorrect: false, rationale: "They made farming much more efficient." },
                        { text: "They increased agricultural productivity and encouraged westward settlement.", isCorrect: true, rationale: "The passage states that these machines 'allowed farmers to cultivate much larger areas...with far less labor' and 'contributed to the westward migration'." },
                        { text: "They led to a decline in the population of cities.", isCorrect: false, rationale: "By making farming more efficient, they freed up labor to move to cities for factory jobs." },
                        { text: "They were primarily used in factories in the East.", isCorrect: false, rationale: "These were agricultural machines used on farms." }
                    ]
                },
                {
                    questionNumber: 4,
                    type: "knowledge",
                    question: "The term 'Gilded Age' suggests that the period was characterized by:",
                    answerOptions: [
                        { text: "Universal prosperity and equality.", isCorrect: false, rationale: "The term implies that the prosperity was a thin layer hiding problems." },
                        { text: "A glittering, wealthy surface that concealed underlying poverty and corruption.", isCorrect: true, rationale: "Something that is 'gilded' is covered in a thin layer of gold. The term, coined by Mark Twain, implies that the era's wealth was a facade." },
                        { text: "A focus on agricultural and rural life.", isCorrect: false, rationale: "It was an age of industrialization and urbanization." },
                        { text: "A strong and honest government.", isCorrect: false, rationale: "The era was known for its political corruption." }
                    ]
                },
                {
                    questionNumber: 5,
                    type: "knowledge",
                    question: "Which of the following was a key reform of the Progressive Movement?",
                    answerOptions: [
                        { text: "Abolishing the federal income tax", isCorrect: false, rationale: "The Progressives supported and passed the 16th Amendment, which created the federal income tax." },
                        { text: "Consumer protection laws, such as the Pure Food and Drug Act", isCorrect: true, rationale: "In response to muckraking exposes of unsanitary and unsafe products, Progressives passed laws to regulate food and medicine." },
                        { text: "Weakening the power of labor unions", isCorrect: false, rationale: "While some Progressives were wary of union power, many supported workers' rights to organize." },
                        { text: "Expanding the spoils system", isCorrect: false, rationale: "Progressives sought to end the spoils system through civil service reform." }
                    ]
                },
                {
                    questionNumber: 6,
                    type: "text",
                    passage: "<p>The rise of big business in the Gilded Age was marked by the formation of trusts. A trust was a business arrangement where a group of companies in the same industry would be managed by a single board of trustees. This allowed them to operate as a monopoly, setting prices and eliminating competition. John D. Rockefeller's Standard Oil was one of the most powerful trusts, controlling almost all of the oil refining in the country.</p>",
                    question: "What was the main economic advantage of a trust?",
                    answerOptions: [
                        { text: "It promoted competition among many small businesses.", isCorrect: false, rationale: "It did the opposite." },
                        { text: "It allowed a group of companies to act as a monopoly and control an industry.", isCorrect: true, rationale: "The passage states that a trust allowed companies to 'operate as a monopoly, setting prices and eliminating competition'." },
                        { text: "It gave more power to workers and labor unions.", isCorrect: false, rationale: "Trusts often had poor relationships with labor unions." },
                        { text: "It lowered prices for consumers through intense competition.", isCorrect: false, rationale: "By eliminating competition, trusts could raise prices." }
                    ]
                },
                {
                    questionNumber: 7,
                    type: "knowledge",
                    question: "What was Ellis Island?",
                    answerOptions: [
                        { text: "A prison for Confederate soldiers after the Civil War.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "The main immigration processing station in New York Harbor for millions of immigrants arriving from Europe.", isCorrect: true, rationale: "From 1892 to 1954, Ellis Island was the gateway to America for over 12 million immigrants." },
                        { text: "The site of the first battle of the American Revolution.", isCorrect: false, rationale: "This was Lexington and Concord." },
                        { text: "A large factory complex in Chicago.", isCorrect: false, rationale: "This is incorrect." }
                    ]
                },
                {
                    questionNumber: 8,
                    type: "knowledge",
                    question: "The 18th Amendment, a key goal of the temperance movement, is unique in U.S. history because it:",
                    answerOptions: [
                        { text: "was the only amendment to be repealed by a later amendment.", isCorrect: true, rationale: "The 18th Amendment, which established Prohibition (the ban on alcohol), was repealed by the 21st Amendment in 1933." },
                        { text: "was the first amendment to be passed.", isCorrect: false, rationale: "The first ten amendments are the Bill of Rights." },
                        { text: "gave women the right to vote.", isCorrect: false, rationale: "This was the 19th Amendment." },
                        { text: "is the longest amendment in the Constitution.", isCorrect: false, rationale: "It is quite short." }
                    ]
                },
                {
                    questionNumber: 9,
                    type: "knowledge",
                    question: "Who were the 'robber barons'?",
                    answerOptions: [
                        { text: "Progressive reformers who fought against corruption.", isCorrect: false, rationale: "This is incorrect." },
                        { text: "A negative term for the powerful and wealthy industrialists of the Gilded Age.", isCorrect: true, rationale: "The term implies that they acquired their wealth through ruthless and unethical business practices, such as exploiting workers and crushing competition." },
                        { text: "Leaders of political machines in major cities.", isCorrect: false, rationale: "These were known as 'bosses'." },
                        { text: "Journalists who exposed corporate abuses.", isCorrect: false, rationale: "These were the 'muckrakers'." }
                    ]
                },
                {
                    questionNumber: 10,
                    type: "text",
                    passage: "<p>The Progressive Era saw a number of reforms aimed at making the political process more democratic and responsive to the people. These included the initiative, which allows citizens to propose laws directly; the referendum, which allows citizens to vote on laws; and the recall, which allows citizens to remove an elected official from office before their term is over. Another key reform was the 17th Amendment, which established the direct election of senators.</p>",
                    question: "Which of the following was a Progressive reform designed to increase citizen participation in government?",
                    answerOptions: [
                        { text: "The spoils system", isCorrect: false, rationale: "The spoils system was a practice of political patronage that Progressives sought to end." },
                        { text: "The initiative, referendum, and recall", isCorrect: true, rationale: "The passage identifies these as reforms that allow citizens to propose laws, vote on laws, and remove officials, all increasing their direct power." },
                        { text: "The formation of business trusts", isCorrect: false, rationale: "Progressives sought to regulate or break up trusts." },
                        { text: "The Chinese Exclusion Act", isCorrect: false, rationale: "This was a nativist immigration law, not a democratic reform." }
                    ]
                },
                {
                    questionNumber: 11,
                    type: "knowledge",
                    question: "Jacob Riis's book 'How the Other Half Lives' was a work of muckraking journalism that exposed:",
                    answerOptions: [
                        { text: "The corruption of the Standard Oil monopoly.", isCorrect: false, rationale: "This was the subject of Ida Tarbell's work." },
                        { text: "The unsanitary conditions of the meatpacking industry.", isCorrect: false, rationale: "This was the subject of Upton Sinclair's 'The Jungle'." },
                        { text: "The poverty and squalid living conditions in New York City tenements.", isCorrect: true, rationale: "Riis used powerful photographs and prose to show the harsh reality of life for the urban poor." },
                        { text: "The corrupt practices of political machines.", isCorrect: false, rationale: "While related, Riis's focus was on living conditions, not the political process itself." }
                    ]
                },
                {
                    questionNumber: 12,
                    type: "knowledge",
                    question: "What was a consequence of the rapid urbanization of the late 19th century?",
                    answerOptions: [
                        { text: "A decrease in pollution and a cleaner environment.", isCorrect: false, rationale: "Cities became overcrowded and polluted." },
                        { text: "Overcrowded housing, poor sanitation, and the spread of disease.", isCorrect: true, rationale: "The rapid, unregulated growth of cities led to numerous social and public health problems." },
                        { text: "A decline in immigration.", isCorrect: false, rationale: "Immigration was a major driver of urbanization." },
                        { text: "The disappearance of the wealthy class.", isCorrect: false, rationale: "The era was known for the immense wealth of its industrialists." }
                    ]
                },
                {
                    questionNumber: 13,
                    type: "knowledge",
                    question: "The 'New Freedom' was the progressive platform of which president?",
                    answerOptions: [
                        { text: "Theodore Roosevelt", isCorrect: false, rationale: "Roosevelt's platform was the 'Square Deal' (and later, 'New Nationalism')." },
                        { text: "Woodrow Wilson", isCorrect: true, rationale: "Wilson's 'New Freedom' platform focused on attacking what he called the 'triple wall of privilege': the trusts, the tariffs, and the banks." },
                        { text: "William Howard Taft", isCorrect: false, rationale: "Taft continued many of Roosevelt's policies but did not have a platform with this name." },
                        { text: "Franklin D. Roosevelt", isCorrect: false, rationale: "His platform was the 'New Deal'." }
                    ]
                },
                {
                    questionNumber: 14,
                    type: "knowledge",
                    question: "What was the primary goal of the Sherman Antitrust Act and the Clayton Antitrust Act?",
                    answerOptions: [
                        { text: "To promote fair industrial competition by breaking up monopolies.", isCorrect: true, rationale: "These acts were the federal government's primary tools for combating the power of trusts and monopolies during the Progressive Era." },
                        { text: "To protect the environment from industrial pollution.", isCorrect: false, rationale: "This was the goal of the conservation movement." },
                        { text: "To establish a minimum wage for factory workers.", isCorrect: false, rationale: "While a goal of some reformers, this was not the purpose of the antitrust acts." },
                        { text: "To provide social security for the elderly.", isCorrect: false, rationale: "This was part of the New Deal in the 1930s." }
                    ]
                },
                {
                    questionNumber: 15,
                    type: "text",
                    passage: "<p>The assembly line, most famously perfected by Henry Ford for the manufacture of the Model T automobile, was a revolutionary production process. It involved breaking down the manufacturing of a product into a series of small, sequential steps. Each worker was responsible for performing a single, repetitive task as the product moved along a conveyor belt. This process dramatically increased efficiency and lowered the cost of production, making goods like the automobile affordable for the average person for the first time.</p>",
                    question: "What was the main advantage of the assembly line?",
                    answerOptions: [
                        { text: "It made factory work more varied and interesting for employees.", isCorrect: false, rationale: "The passage describes the work as performing a 'single, repetitive task'." },
                        { text: "It increased the skill level required for each worker.", isCorrect: false, rationale: "It decreased the skill level required, as each worker only had to master one simple task." },
                        { text: "It dramatically increased production efficiency and lowered costs.", isCorrect: true, rationale: "The passage explicitly states that the process 'dramatically increased efficiency and lowered the cost of production'." },
                        { text: "It improved the quality of handcrafted goods.", isCorrect: false, rationale: "It was a method for mass production, not handcrafted goods." }
                    ]
                }
            ]
        }
    ]
};
