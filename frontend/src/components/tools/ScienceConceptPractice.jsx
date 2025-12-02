import React, { useState, useMemo } from 'react';

// Science Concept Questions Data
const SCIENCE_CONCEPT_QUESTIONS = [
  // Physics
  {
    id: 'phys_1',
    category: 'Physics',
    difficulty: 'easy',
    question: 'What is the unit of force in the SI system?',
    choices: [
      { text: 'Newton (N)', correct: true },
      { text: 'Joule (J)', correct: false },
      { text: 'Watt (W)', correct: false },
      { text: 'Pascal (Pa)', correct: false },
    ],
    explanation:
      'Force is measured in newtons (N). One newton is the force required to accelerate a 1 kg mass at 1 m/s².',
  },
  {
    id: 'phys_2',
    category: 'Physics',
    difficulty: 'easy',
    question: 'Which quantity is conserved in an isolated system?',
    choices: [
      { text: 'Energy', correct: true },
      { text: 'Velocity', correct: false },
      { text: 'Force', correct: false },
      { text: 'Power', correct: false },
    ],
    explanation:
      'Total energy remains constant in an isolated system according to the law of conservation of energy.',
  },
  {
    id: 'phys_3',
    category: 'Physics',
    difficulty: 'medium',
    question:
      'An object moves at constant velocity. What is the net force acting on it?',
    choices: [
      { text: 'Zero', correct: true },
      { text: 'Equal to its weight', correct: false },
      { text: 'Increasing', correct: false },
      { text: 'Opposite to its velocity', correct: false },
    ],
    explanation:
      "Newton's First Law states that constant velocity implies zero net force. Forces are balanced.",
  },
  {
    id: 'phys_4',
    category: 'Physics',
    difficulty: 'medium',
    question: 'What is the formula for kinetic energy?',
    choices: [
      { text: 'KE = ½mv²', correct: true },
      { text: 'KE = mv', correct: false },
      { text: 'KE = mgh', correct: false },
      { text: 'KE = Fd', correct: false },
    ],
    explanation:
      'Kinetic energy is calculated as KE = ½mv², where m is mass and v is velocity.',
  },
  // Chemistry
  {
    id: 'chem_1',
    category: 'Chemistry',
    difficulty: 'easy',
    question: 'What is the chemical symbol for water?',
    choices: [
      { text: 'H₂O', correct: true },
      { text: 'CO₂', correct: false },
      { text: 'O₂', correct: false },
      { text: 'NaCl', correct: false },
    ],
    explanation: 'Water is H₂O: two hydrogen atoms bonded to one oxygen atom.',
  },
  {
    id: 'chem_2',
    category: 'Chemistry',
    difficulty: 'easy',
    question: 'What is the smallest unit of an element?',
    choices: [
      { text: 'Atom', correct: true },
      { text: 'Molecule', correct: false },
      { text: 'Cell', correct: false },
      { text: 'Compound', correct: false },
    ],
    explanation:
      'An atom is the smallest unit that retains the properties of an element.',
  },
  {
    id: 'chem_3',
    category: 'Chemistry',
    difficulty: 'medium',
    question:
      'What type of bond forms when electrons are shared between atoms?',
    choices: [
      { text: 'Covalent bond', correct: true },
      { text: 'Ionic bond', correct: false },
      { text: 'Metallic bond', correct: false },
      { text: 'Hydrogen bond', correct: false },
    ],
    explanation:
      'Covalent bonds form when atoms share electrons to achieve stable electron configurations.',
  },
  {
    id: 'chem_4',
    category: 'Chemistry',
    difficulty: 'hard',
    question: 'What happens during an oxidation reaction?',
    choices: [
      { text: 'Loss of electrons', correct: true },
      { text: 'Gain of electrons', correct: false },
      { text: 'Gain of protons', correct: false },
      { text: 'Loss of neutrons', correct: false },
    ],
    explanation:
      'Oxidation is the loss of electrons. Remember: OIL RIG (Oxidation Is Loss, Reduction Is Gain).',
  },
  // Biology
  {
    id: 'bio_1',
    category: 'Biology',
    difficulty: 'easy',
    question: 'What is the basic unit of life?',
    choices: [
      { text: 'Cell', correct: true },
      { text: 'Tissue', correct: false },
      { text: 'Organ', correct: false },
      { text: 'Atom', correct: false },
    ],
    explanation:
      'The cell is the basic structural and functional unit of all living organisms.',
  },
  {
    id: 'bio_2',
    category: 'Biology',
    difficulty: 'easy',
    question: 'What organelle is responsible for photosynthesis?',
    choices: [
      { text: 'Chloroplast', correct: true },
      { text: 'Mitochondria', correct: false },
      { text: 'Nucleus', correct: false },
      { text: 'Ribosome', correct: false },
    ],
    explanation:
      'Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells.',
  },
  {
    id: 'bio_3',
    category: 'Biology',
    difficulty: 'medium',
    question: 'DNA is composed of repeating units called:',
    choices: [
      { text: 'Nucleotides', correct: true },
      { text: 'Amino acids', correct: false },
      { text: 'Proteins', correct: false },
      { text: 'Lipids', correct: false },
    ],
    explanation:
      'Nucleotides are the building blocks of DNA, each containing a sugar, phosphate, and nitrogenous base.',
  },
  {
    id: 'bio_4',
    category: 'Biology',
    difficulty: 'hard',
    question: 'Which process produces the most ATP in cellular respiration?',
    choices: [
      { text: 'Electron transport chain', correct: true },
      { text: 'Glycolysis', correct: false },
      { text: 'Krebs cycle', correct: false },
      { text: 'Fermentation', correct: false },
    ],
    explanation:
      'The electron transport chain produces about 34 ATP molecules, the most of any stage in cellular respiration.',
  },
  // Earth Science
  {
    id: 'earth_1',
    category: 'Earth Science',
    difficulty: 'easy',
    question: 'What causes tides on Earth?',
    choices: [
      { text: "Moon's gravitational pull", correct: true },
      { text: 'Wind patterns', correct: false },
      { text: 'Ocean currents', correct: false },
      { text: "Earth's rotation", correct: false },
    ],
    explanation:
      "Tides are primarily caused by the Moon's gravitational pull on Earth's oceans.",
  },
  {
    id: 'earth_2',
    category: 'Earth Science',
    difficulty: 'medium',
    question: 'Which layer of Earth is the thickest?',
    choices: [
      { text: 'Mantle', correct: true },
      { text: 'Crust', correct: false },
      { text: 'Outer core', correct: false },
      { text: 'Inner core', correct: false },
    ],
    explanation:
      "The mantle makes up about 84% of Earth's volume and extends nearly 2,900 km deep.",
  },
  {
    id: 'earth_3',
    category: 'Earth Science',
    difficulty: 'medium',
    question: 'What type of rock is formed from cooled magma or lava?',
    choices: [
      { text: 'Igneous', correct: true },
      { text: 'Sedimentary', correct: false },
      { text: 'Metamorphic', correct: false },
      { text: 'Crystalline', correct: false },
    ],
    explanation:
      'Igneous rocks form when molten rock (magma or lava) cools and solidifies.',
  },
  {
    id: 'earth_4',
    category: 'Earth Science',
    difficulty: 'hard',
    question: 'What drives plate tectonics?',
    choices: [
      { text: 'Convection currents in the mantle', correct: true },
      { text: 'Ocean currents', correct: false },
      { text: 'Atmospheric pressure', correct: false },
      { text: "Earth's magnetic field", correct: false },
    ],
    explanation:
      "Heat-driven convection currents in the mantle cause tectonic plates to move across Earth's surface.",
  },
];

/**
 * ScienceConceptPractice - Multiple-choice science concept questions
 */
export default function ScienceConceptPractice({ onClose, dark = false }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const categories = useMemo(() => {
    const unique = [
      ...new Set(SCIENCE_CONCEPT_QUESTIONS.map((q) => q.category)),
    ];
    return unique.sort();
  }, []);

  const difficulties = useMemo(() => {
    const unique = [
      ...new Set(SCIENCE_CONCEPT_QUESTIONS.map((q) => q.difficulty)),
    ];
    return ['all', ...unique.sort()];
  }, []);

  function selectNewQuestion() {
    if (!selectedCategory) {
      alert('Please select a category first.');
      return;
    }
    let pool = SCIENCE_CONCEPT_QUESTIONS.filter(
      (q) => q.category === selectedCategory
    );
    if (selectedDifficulty !== 'all') {
      pool = pool.filter((q) => q.difficulty === selectedDifficulty);
    }
    if (pool.length === 0) {
      alert('No questions available for this selection.');
      return;
    }
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(picked);
    setSelectedChoice(null);
    setRevealed(false);
  }

  function grade() {
    if (!currentQuestion) return;
    if (selectedChoice === null) {
      alert('Please select an answer first.');
      return;
    }
    setRevealed(true);
  }

  return (
    <div
      className={`p-6 rounded-xl ${
        dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
        🔬 Science Concept Practice
      </h2>

      {/* Category Selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Category:</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : dark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Difficulty:</label>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                selectedDifficulty === diff
                  ? 'bg-purple-600 text-white'
                  : dark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* New Question Button */}
      <div className="mb-6">
        <button
          onClick={selectNewQuestion}
          disabled={!selectedCategory}
          className={`px-6 py-3 rounded-lg font-bold text-white transition ${
            !selectedCategory
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          New Question
        </button>
      </div>

      {/* Question Display */}
      {currentQuestion ? (
        <div
          className={`p-4 rounded-lg mb-4 ${
            dark ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                currentQuestion.difficulty === 'easy'
                  ? 'bg-green-200 text-green-800'
                  : currentQuestion.difficulty === 'medium'
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-red-200 text-red-800'
              }`}
            >
              {currentQuestion.difficulty.toUpperCase()}
            </span>
            <span className="text-xs opacity-70">
              {currentQuestion.category}
            </span>
          </div>

          <h3 className="text-lg font-bold mb-3">Question:</h3>
          <p className="mb-4">{currentQuestion.question}</p>

          <div className="space-y-2 mb-4">
            {currentQuestion.choices.map((ch, idx) => {
              const chosen = selectedChoice === idx;
              const correct = ch.correct;
              let btnStyle = chosen ? 'ring-2 ring-blue-500' : '';

              if (revealed) {
                if (correct) {
                  btnStyle += ' bg-green-600 text-white';
                } else if (chosen && !correct) {
                  btnStyle += ' bg-red-600 text-white';
                } else {
                  btnStyle += dark ? ' bg-gray-600' : ' bg-gray-200';
                }
              } else {
                btnStyle += chosen
                  ? ' bg-blue-600 text-white'
                  : dark
                  ? ' bg-gray-600 text-gray-100'
                  : ' bg-gray-200 text-gray-800';
              }

              return (
                <button
                  key={idx}
                  disabled={revealed}
                  onClick={() => setSelectedChoice(idx)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${btnStyle}`}
                >
                  {ch.text}
                </button>
              );
            })}
          </div>

          {!revealed && (
            <button
              onClick={grade}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
            >
              Check Answer
            </button>
          )}

          {revealed && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                currentQuestion.choices[selectedChoice].correct
                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                  : 'bg-red-100 text-red-800 border-2 border-red-500'
              }`}
            >
              <p className="font-bold mb-2">
                {currentQuestion.choices[selectedChoice].correct
                  ? '✓ Correct!'
                  : '✗ Incorrect'}
              </p>
              <p className="text-sm">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`p-4 text-center ${
            dark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <p>Select a category and click "New Question" to begin.</p>
          <p className="text-sm mt-2">
            Practice with {SCIENCE_CONCEPT_QUESTIONS.length} questions across 4
            categories!
          </p>
        </div>
      )}
    </div>
  );
}
