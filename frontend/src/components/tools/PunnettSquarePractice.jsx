import React, { useState, useMemo } from 'react';

// Trait Bank - Each trait has dominant/recessive alleles and phenotypes
const GENETICS_TRAITS = [
  {
    id: 'plant_height',
    name: 'Plant Height',
    dominantAllele: 'T',
    recessiveAllele: 't',
    dominantPhenotype: 'Tall',
    recessivePhenotype: 'Short',
  },
  {
    id: 'flower_color',
    name: 'Flower Color',
    dominantAllele: 'P',
    recessiveAllele: 'p',
    dominantPhenotype: 'Purple',
    recessivePhenotype: 'White',
  },
  {
    id: 'fur_color',
    name: 'Fur Color',
    dominantAllele: 'B',
    recessiveAllele: 'b',
    dominantPhenotype: 'Brown',
    recessivePhenotype: 'White',
  },
  {
    id: 'eye_color',
    name: 'Eye Color',
    dominantAllele: 'E',
    recessiveAllele: 'e',
    dominantPhenotype: 'Brown',
    recessivePhenotype: 'Blue',
  },
];

// Genotype options for parent selection
const GENOTYPE_OPTIONS = [
  { label: 'Homozygous Dominant (e.g., TT)', value: 'homozygous_dominant' },
  { label: 'Heterozygous (e.g., Tt)', value: 'heterozygous' },
  { label: 'Homozygous Recessive (e.g., tt)', value: 'homozygous_recessive' },
];

/**
 * PunnettSquarePractice - Interactive Punnett Square Practice Tool
 * Supports Guided, Assisted, and Freeform modes
 */
export default function PunnettSquarePractice({ onClose, dark = false }) {
  // Mode selection
  const [mode, setMode] = useState(null); // 'guided', 'assisted', 'freeform'

  // Trait and parent selection
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [parent1Genotype, setParent1Genotype] = useState('');
  const [parent2Genotype, setParent2Genotype] = useState('');

  // Punnett square state
  const [squareCells, setSquareCells] = useState({
    '0-0': '',
    '0-1': '',
    '1-0': '',
    '1-1': '',
  });
  const [currentGuidedCell, setCurrentGuidedCell] = useState('0-0');
  const [cellFeedback, setCellFeedback] = useState({});

  // Ratio questions
  const [genotypeRatioAnswer, setGenotypeRatioAnswer] = useState('');
  const [phenotypeRatioAnswer, setPhenotypeRatioAnswer] = useState('');
  const [probabilityAnswer, setProbabilityAnswer] = useState('');

  // Feedback and results
  const [finalFeedback, setFinalFeedback] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Get alleles from genotype type
  const getAllelesFromType = (genotypeType, trait) => {
    if (!trait) return [];
    switch (genotypeType) {
      case 'homozygous_dominant':
        return [trait.dominantAllele, trait.dominantAllele];
      case 'heterozygous':
        return [trait.dominantAllele, trait.recessiveAllele];
      case 'homozygous_recessive':
        return [trait.recessiveAllele, trait.recessiveAllele];
      default:
        return [];
    }
  };

  // Normalize allele order (dominant first)
  const normalizeGenotype = (genotype, trait) => {
    if (!trait || genotype.length !== 2) return genotype;
    const [a, b] = genotype.split('');
    if (
      a === trait.dominantAllele ||
      (a === trait.dominantAllele && b === trait.recessiveAllele)
    ) {
      return genotype;
    }
    return b + a;
  };

  // Calculate correct Punnett square
  const calculateCorrectSquare = () => {
    if (!selectedTrait) return {};

    const p1Alleles = getAllelesFromType(parent1Genotype, selectedTrait);
    const p2Alleles = getAllelesFromType(parent2Genotype, selectedTrait);

    return {
      '0-0': normalizeGenotype(p1Alleles[0] + p2Alleles[0], selectedTrait),
      '0-1': normalizeGenotype(p1Alleles[0] + p2Alleles[1], selectedTrait),
      '1-0': normalizeGenotype(p1Alleles[1] + p2Alleles[0], selectedTrait),
      '1-1': normalizeGenotype(p1Alleles[1] + p2Alleles[1], selectedTrait),
    };
  };

  // Calculate genotype and phenotype ratios
  const calculateRatios = () => {
    const correctSquare = calculateCorrectSquare();
    const genotypes = Object.values(correctSquare);

    // Count genotypes
    const genotypeCounts = {};
    genotypes.forEach((g) => {
      genotypeCounts[g] = (genotypeCounts[g] || 0) + 1;
    });

    // Count phenotypes
    const phenotypeCounts = { dominant: 0, recessive: 0 };
    genotypes.forEach((g) => {
      if (g.includes(selectedTrait.dominantAllele)) {
        phenotypeCounts.dominant++;
      } else {
        phenotypeCounts.recessive++;
      }
    });

    return { genotypeCounts, phenotypeCounts };
  };

  // Start practice with selected mode
  const startPractice = () => {
    if (!mode || !selectedTrait || !parent1Genotype || !parent2Genotype) {
      alert('Please select mode, trait, and both parent genotypes.');
      return;
    }

    // Reset state
    setSquareCells({ '0-0': '', '0-1': '', '1-0': '', '1-1': '' });
    setCellFeedback({});
    setCurrentGuidedCell('0-0');
    setGenotypeRatioAnswer('');
    setPhenotypeRatioAnswer('');
    setProbabilityAnswer('');
    setFinalFeedback(null);
    setShowExplanation(false);
  };

  // Handle cell input (for guided mode)
  const handleCellInput = (cellKey, value) => {
    if (mode === 'guided') {
      const formatted = value.toUpperCase();
      // Validate immediately
      const correctSquare = calculateCorrectSquare();
      const isCorrect = formatted === correctSquare[cellKey];

      // Keep user input visible even before it is correct
      setSquareCells((prev) => ({ ...prev, [cellKey]: formatted }));

      setCellFeedback((prev) => ({
        ...prev,
        [cellKey]: isCorrect ? 'correct' : 'incorrect',
      }));

      if (isCorrect) {
        // Move to next cell
        const cellOrder = ['0-0', '0-1', '1-0', '1-1'];
        const currentIndex = cellOrder.indexOf(cellKey);
        if (currentIndex < 3) {
          setCurrentGuidedCell(cellOrder[currentIndex + 1]);
        }
      }
    } else {
      // For assisted and freeform, just update the cell
      setSquareCells((prev) => ({ ...prev, [cellKey]: value.toUpperCase() }));
    }
  };

  // Submit final answer (for assisted and freeform modes)
  const submitAnswer = () => {
    const correctSquare = calculateCorrectSquare();
    const { genotypeCounts, phenotypeCounts } = calculateRatios();

    // Check Punnett square
    let squareCorrect = true;
    const newCellFeedback = {};
    Object.keys(correctSquare).forEach((key) => {
      const isCorrect = squareCells[key] === correctSquare[key];
      newCellFeedback[key] = isCorrect ? 'correct' : 'incorrect';
      if (!isCorrect) squareCorrect = false;
    });
    setCellFeedback(newCellFeedback);

    // For assisted mode, show results
    if (mode === 'assisted') {
      setFinalFeedback({
        squareCorrect,
        correctSquare,
        genotypeCounts,
        phenotypeCounts,
      });
      setShowExplanation(true);
    }

    // For freeform mode, also check ratio answers
    if (mode === 'freeform') {
      const dominantCount = phenotypeCounts.dominant;
      const recessiveCount = phenotypeCounts.recessive;
      const dominantPercent = (dominantCount / 4) * 100;

      setFinalFeedback({
        squareCorrect,
        correctSquare,
        genotypeCounts,
        phenotypeCounts,
        genotypeRatioCorrect: genotypeRatioAnswer.includes(
          Object.keys(genotypeCounts).join(':')
        ),
        phenotypeRatioCorrect:
          phenotypeRatioAnswer === `${dominantCount}:${recessiveCount}`,
        probabilityCorrect:
          Math.abs(parseFloat(probabilityAnswer) - dominantPercent) < 1,
        dominantPercent,
      });
      setShowExplanation(true);
    }
  };

  // Reset to mode selection
  const reset = () => {
    setMode(null);
    setSelectedTrait(null);
    setParent1Genotype('');
    setParent2Genotype('');
    setSquareCells({ '0-0': '', '0-1': '', '1-0': '', '1-1': '' });
    setCellFeedback({});
    setFinalFeedback(null);
    setShowExplanation(false);
  };

  // Get parent alleles for display
  const parent1Alleles = useMemo(
    () =>
      selectedTrait ? getAllelesFromType(parent1Genotype, selectedTrait) : [],
    [parent1Genotype, selectedTrait]
  );

  const parent2Alleles = useMemo(
    () =>
      selectedTrait ? getAllelesFromType(parent2Genotype, selectedTrait) : [],
    [parent2Genotype, selectedTrait]
  );

  return (
    <div
      className={`p-6 rounded-xl ${
        dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          🧬 Punnett Square Practice
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-red-500 transition"
          >
            ×
          </button>
        )}
      </div>

      {/* Mode Selection */}
      {!mode && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Select Practice Mode:</h3>

          <button
            onClick={() => setMode('guided')}
            className={`w-full p-4 rounded-lg text-left transition ${
              dark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-blue-50 hover:bg-blue-100'
            }`}
          >
            <div className="font-bold text-lg mb-2">🎯 Guided Mode</div>
            <p
              className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Step-by-step scaffolded learning. Fill one cell at a time with
              immediate feedback and hints.
            </p>
          </button>

          <button
            onClick={() => setMode('assisted')}
            className={`w-full p-4 rounded-lg text-left transition ${
              dark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-green-50 hover:bg-green-100'
            }`}
          >
            <div className="font-bold text-lg mb-2">📝 Assisted Mode</div>
            <p
              className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Parents' genotypes provided. Fill the entire Punnett square and
              identify ratios. Feedback after submission.
            </p>
          </button>

          <button
            onClick={() => setMode('freeform')}
            className={`w-full p-4 rounded-lg text-left transition ${
              dark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-purple-50 hover:bg-purple-100'
            }`}
          >
            <div className="font-bold text-lg mb-2">
              🎓 Freeform / Test Mode
            </div>
            <p
              className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Full GED readiness. Complete the square and answer probability
              questions. No hints.
            </p>
          </button>
        </div>
      )}

      {/* Setup: Trait and Parent Selection */}
      {mode && !finalFeedback && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              ← Change Mode
            </button>
            <div
              className={`px-4 py-2 rounded-lg font-semibold ${
                mode === 'guided'
                  ? 'bg-blue-500 text-white'
                  : mode === 'assisted'
                  ? 'bg-green-500 text-white'
                  : 'bg-purple-500 text-white'
              }`}
            >
              {mode === 'guided'
                ? '🎯 Guided'
                : mode === 'assisted'
                ? '📝 Assisted'
                : '🎓 Freeform'}
            </div>
          </div>

          {/* Trait Selection */}
          <div>
            <label className="block font-semibold mb-2">Select Trait:</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {GENETICS_TRAITS.map((trait) => (
                <button
                  key={trait.id}
                  onClick={() => setSelectedTrait(trait)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedTrait?.id === trait.id
                      ? 'bg-emerald-600 text-white'
                      : dark
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {trait.name}
                </button>
              ))}
            </div>

            {selectedTrait && (
              <div
                className={`mt-3 p-3 rounded-lg text-sm ${
                  dark ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <p>
                  <strong>Dominant ({selectedTrait.dominantAllele}):</strong>{' '}
                  {selectedTrait.dominantPhenotype}
                </p>
                <p>
                  <strong>Recessive ({selectedTrait.recessiveAllele}):</strong>{' '}
                  {selectedTrait.recessivePhenotype}
                </p>
              </div>
            )}
          </div>

          {/* Parent Genotype Selection */}
          {selectedTrait && (
            <>
              <div>
                <label className="block font-semibold mb-2">
                  Parent 1 Genotype:
                </label>
                <select
                  value={parent1Genotype}
                  onChange={(e) => setParent1Genotype(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    dark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">-- Select --</option>
                  {GENOTYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label.replace(
                        'e.g., TT',
                        `e.g., ${getAllelesFromType(
                          opt.value,
                          selectedTrait
                        ).join('')}`
                      )}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Parent 2 Genotype:
                </label>
                <select
                  value={parent2Genotype}
                  onChange={(e) => setParent2Genotype(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    dark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">-- Select --</option>
                  {GENOTYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label.replace(
                        'e.g., TT',
                        `e.g., ${getAllelesFromType(
                          opt.value,
                          selectedTrait
                        ).join('')}`
                      )}
                    </option>
                  ))}
                </select>
              </div>

              {parent1Genotype && parent2Genotype && (
                <button
                  onClick={startPractice}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                >
                  Start Practice
                </button>
              )}
            </>
          )}

          {/* Punnett Square Grid */}
          {parent1Alleles.length > 0 && parent2Alleles.length > 0 && (
            <div
              className={`p-6 rounded-lg ${
                dark ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <h3 className="text-lg font-bold mb-4">Punnett Square:</h3>

              {mode === 'guided' && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    dark ? 'bg-blue-900/30' : 'bg-blue-50'
                  } border-l-4 border-blue-500`}
                >
                  <p className="text-sm">
                    💡 <strong>Hint:</strong> Use one allele from each parent.
                    Capital letters are dominant traits.
                  </p>
                </div>
              )}

              <div className="flex justify-center">
                <div className="inline-grid grid-cols-3 gap-0">
                  {/* Top-left empty cell */}
                  <div className="w-16 h-16"></div>

                  {/* Parent 2 alleles (top row) */}
                  {parent2Alleles.map((allele, i) => (
                    <div
                      key={`p2-${i}`}
                      className={`w-16 h-16 flex items-center justify-center font-bold text-lg border-2 ${
                        dark
                          ? 'border-gray-600 bg-gray-800'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {allele}
                    </div>
                  ))}

                  {/* Grid rows */}
                  {parent1Alleles.map((p1Allele, row) => (
                    <React.Fragment key={`row-${row}`}>
                      {/* Parent 1 allele (left column) */}
                      <div
                        className={`w-16 h-16 flex items-center justify-center font-bold text-lg border-2 ${
                          dark
                            ? 'border-gray-600 bg-gray-800'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {p1Allele}
                      </div>

                      {/* Offspring cells */}
                      {[0, 1].map((col) => {
                        const cellKey = `${row}-${col}`;
                        const feedback = cellFeedback[cellKey];

                        return (
                          <div
                            key={cellKey}
                            className={`w-16 h-16 border-2 ${
                              feedback === 'correct'
                                ? 'bg-green-100 border-green-500'
                                : feedback === 'incorrect'
                                ? 'bg-red-100 border-red-500'
                                : mode === 'guided' &&
                                  cellKey === currentGuidedCell
                                ? 'border-blue-500 border-4'
                                : dark
                                ? 'border-gray-600'
                                : 'border-gray-400'
                            }`}
                          >
                            <input
                              type="text"
                              maxLength={2}
                              value={squareCells[cellKey]}
                              onChange={(e) =>
                                handleCellInput(cellKey, e.target.value)
                              }
                              disabled={
                                mode === 'guided' &&
                                cellKey !== currentGuidedCell
                              }
                              className={`w-full h-full text-center font-bold text-lg ${
                                dark
                                  ? 'bg-gray-800 text-white'
                                  : 'bg-white text-gray-900'
                              } ${
                                mode === 'guided' &&
                                cellKey !== currentGuidedCell
                                  ? 'opacity-50'
                                  : ''
                              }`}
                            />
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Submit button for assisted and freeform modes */}
              {(mode === 'assisted' || mode === 'freeform') && (
                <>
                  {mode === 'freeform' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block font-semibold mb-2">
                          Genotype Ratio:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 1TT:2Tt:1tt"
                          value={genotypeRatioAnswer}
                          onChange={(e) =>
                            setGenotypeRatioAnswer(e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg border ${
                            dark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-2">
                          Phenotype Ratio (Dominant:Recessive):
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 3:1"
                          value={phenotypeRatioAnswer}
                          onChange={(e) =>
                            setPhenotypeRatioAnswer(e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg border ${
                            dark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-2">
                          Probability of {selectedTrait.dominantPhenotype}{' '}
                          phenotype (%):
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 75"
                          value={probabilityAnswer}
                          onChange={(e) => setProbabilityAnswer(e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            dark
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={submitAnswer}
                    className="w-full mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                  >
                    Submit Answer
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Feedback and Explanation */}
      {showExplanation && finalFeedback && (
        <div className="space-y-4 mt-6">
          <div
            className={`p-4 rounded-lg ${
              finalFeedback.squareCorrect
                ? dark
                  ? 'bg-green-900/30'
                  : 'bg-green-50'
                : dark
                ? 'bg-red-900/30'
                : 'bg-red-50'
            } border-2 ${
              finalFeedback.squareCorrect
                ? 'border-green-500'
                : 'border-red-500'
            }`}
          >
            <h3 className="text-xl font-bold mb-2">
              {finalFeedback.squareCorrect
                ? '✓ Punnett Square Correct!'
                : '✗ Some Errors in Punnett Square'}
            </h3>
            {!finalFeedback.squareCorrect && (
              <div className="text-sm space-y-1">
                <p>Correct square:</p>
                <div className="font-mono">
                  <div>
                    {finalFeedback.correctSquare['0-0']} |{' '}
                    {finalFeedback.correctSquare['0-1']}
                  </div>
                  <div>
                    {finalFeedback.correctSquare['1-0']} |{' '}
                    {finalFeedback.correctSquare['1-1']}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* GED-Style Explanation */}
          <div
            className={`p-4 rounded-lg border-2 ${
              dark
                ? 'bg-gray-700 border-gray-600'
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <h4 className="font-bold text-lg mb-3">📚 Explanation:</h4>

            <div className="space-y-3 text-sm">
              <p>
                <strong>Step 1:</strong> Identify alleles from each parent.
                Parent 1 has{' '}
                <span className="font-mono">{parent1Alleles.join('')}</span> and
                Parent 2 has{' '}
                <span className="font-mono">{parent2Alleles.join('')}</span>.
              </p>

              <p>
                <strong>Step 2:</strong> Combine one allele from each parent in
                each square cell. Remember: capital letters (
                {selectedTrait.dominantAllele}) are dominant and will mask
                lowercase ({selectedTrait.recessiveAllele}) recessive traits.
              </p>

              <p>
                <strong>Genotype Ratio:</strong>{' '}
                {Object.entries(finalFeedback.genotypeCounts)
                  .map(([genotype, count]) => `${count} ${genotype}`)
                  .join(' : ')}
              </p>

              <p>
                <strong>Phenotype Ratio:</strong>{' '}
                {finalFeedback.phenotypeCounts.dominant}{' '}
                {selectedTrait.dominantPhenotype} :{' '}
                {finalFeedback.phenotypeCounts.recessive}{' '}
                {selectedTrait.recessivePhenotype}
              </p>

              {mode === 'freeform' && (
                <>
                  <p>
                    <strong>
                      Probability of {selectedTrait.dominantPhenotype}:
                    </strong>{' '}
                    {finalFeedback.phenotypeCounts.dominant}/4 ={' '}
                    {finalFeedback.dominantPercent}%
                  </p>

                  {finalFeedback.genotypeRatioCorrect !== undefined && (
                    <p
                      className={
                        finalFeedback.genotypeRatioCorrect
                          ? 'text-green-600 font-semibold'
                          : 'text-red-600 font-semibold'
                      }
                    >
                      {finalFeedback.genotypeRatioCorrect ? '✓' : '✗'} Genotype
                      ratio answer
                    </p>
                  )}

                  {finalFeedback.phenotypeRatioCorrect !== undefined && (
                    <p
                      className={
                        finalFeedback.phenotypeRatioCorrect
                          ? 'text-green-600 font-semibold'
                          : 'text-red-600 font-semibold'
                      }
                    >
                      {finalFeedback.phenotypeRatioCorrect ? '✓' : '✗'}{' '}
                      Phenotype ratio answer
                    </p>
                  )}

                  {finalFeedback.probabilityCorrect !== undefined && (
                    <p
                      className={
                        finalFeedback.probabilityCorrect
                          ? 'text-green-600 font-semibold'
                          : 'text-red-600 font-semibold'
                      }
                    >
                      {finalFeedback.probabilityCorrect ? '✓' : '✗'} Probability
                      answer
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={reset}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Try Another Problem
            </button>
            <button
              onClick={() => {
                setFinalFeedback(null);
                setShowExplanation(false);
                setSquareCells({ '0-0': '', '0-1': '', '1-0': '', '1-1': '' });
                setCellFeedback({});
                setGenotypeRatioAnswer('');
                setPhenotypeRatioAnswer('');
                setProbabilityAnswer('');
              }}
              className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            >
              Practice Same Cross Again
            </button>
          </div>
        </div>
      )}

      {/* Info Section */}
      {!mode && (
        <div
          className={`mt-6 p-4 rounded-lg text-sm ${
            dark ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <h4 className="font-bold mb-2">About Punnett Squares:</h4>
          <p className={dark ? 'text-gray-300' : 'text-gray-700'}>
            Punnett squares help predict the genetic outcomes when two organisms
            reproduce. Each parent contributes one allele (gene variant) to
            their offspring. Dominant alleles (capital letters) mask recessive
            alleles (lowercase letters) in the phenotype (observable trait).
          </p>
        </div>
      )}
    </div>
  );
}
