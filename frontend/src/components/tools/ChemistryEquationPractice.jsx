import React, { useState, useMemo, useEffect } from 'react';

// Chemistry equations data
const SCIENCE_CHEMISTRY_EQUATIONS = window.SCIENCE_CHEMISTRY_EQUATIONS || [];

/**
 * ChemistryEquationPractice - Chemical equation balancing practice tool
 */
export default function ChemistryEquationPractice({ onClose, dark = false }) {
  const [mode, setMode] = useState('guided');
  const [currentEquation, setCurrentEquation] = useState(null);
  const [studentCoefficients, setStudentCoefficients] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [statistics, setStatistics] = useState({ correct: 0, total: 0 });
  const [difficulty, setDifficulty] = useState('all');

  const isDark = dark;

  // Helper: Count atoms in a compound
  const parseFormula = (formula) => {
    // Convert Unicode subscripts to regular numbers
    const normalizedFormula = formula
      .replace(/₀/g, '0')
      .replace(/₁/g, '1')
      .replace(/₂/g, '2')
      .replace(/₃/g, '3')
      .replace(/₄/g, '4')
      .replace(/₅/g, '5')
      .replace(/₆/g, '6')
      .replace(/₇/g, '7')
      .replace(/₈/g, '8')
      .replace(/₉/g, '9');

    const atomCounts = {};
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;

    while ((match = regex.exec(normalizedFormula)) !== null) {
      const atom = match[1];
      const count = match[2] ? parseInt(match[2]) : 1;
      atomCounts[atom] = (atomCounts[atom] || 0) + count;
    }
    return atomCounts;
  };

  // Helper: Check if equation is balanced
  const isBalanced = (equation, coeffs) => {
    const leftAtoms = {};
    const rightAtoms = {};

    equation.reactants.forEach((reactant, idx) => {
      const atomCounts = parseFormula(reactant.formula);
      const coeff = coeffs[idx] || 1;
      Object.entries(atomCounts).forEach(([atom, count]) => {
        leftAtoms[atom] = (leftAtoms[atom] || 0) + count * coeff;
      });
    });

    const reactantCount = equation.reactants.length;
    equation.products.forEach((product, idx) => {
      const atomCounts = parseFormula(product.formula);
      const coeff = coeffs[reactantCount + idx] || 1;
      Object.entries(atomCounts).forEach(([atom, count]) => {
        rightAtoms[atom] = (rightAtoms[atom] || 0) + count * coeff;
      });
    });

    const allAtoms = new Set([
      ...Object.keys(leftAtoms),
      ...Object.keys(rightAtoms),
    ]);
    return Array.from(allAtoms).every(
      (atom) => leftAtoms[atom] === rightAtoms[atom]
    );
  };

  // Get unique reaction types
  const reactionTypes = useMemo(() => {
    const types = [
      ...new Set(SCIENCE_CHEMISTRY_EQUATIONS.map((eq) => eq.type)),
    ];
    return types.sort();
  }, []);

  // Get difficulties
  const difficulties = useMemo(() => {
    const diffs = [
      ...new Set(SCIENCE_CHEMISTRY_EQUATIONS.map((eq) => eq.difficulty)),
    ];
    return diffs.sort();
  }, []);

  // Pick random equation based on filters
  const pickRandomEquation = (type = null, diff = null) => {
    let filtered = SCIENCE_CHEMISTRY_EQUATIONS;

    if (type) {
      filtered = filtered.filter((eq) => eq.type === type);
    }

    if (diff && diff !== 'all') {
      filtered = filtered.filter((eq) => eq.difficulty === diff);
    }

    if (filtered.length === 0) {
      alert('No equations match your filters.');
      return null;
    }

    const eq = filtered[Math.floor(Math.random() * filtered.length)];
    return eq;
  };

  // Load new equation
  const loadNewEquation = (type = null) => {
    const eq = pickRandomEquation(type, difficulty);
    if (eq) {
      setCurrentEquation(eq);
      setStudentCoefficients(
        new Array(eq.reactants.length + eq.products.length).fill('')
      );
      setFeedback(null);
      setShowHint(false);
      setShowAnswer(false);
    }
  };

  // Initialize on mount
  useEffect(() => {
    if (SCIENCE_CHEMISTRY_EQUATIONS.length > 0 && !currentEquation) {
      loadNewEquation();
    }
  }, []);

  // Handle coefficient input
  const updateCoefficient = (index, value) => {
    const newCoeffs = [...studentCoefficients];
    newCoeffs[index] = value === '' ? '' : parseInt(value) || '';
    setStudentCoefficients(newCoeffs);
  };

  // Check answer
  const checkAnswer = () => {
    if (!currentEquation) return;

    const coeffs = studentCoefficients.map((c) => {
      if (c === '' || c === null || c === undefined) return null;
      const num = typeof c === 'number' ? c : parseInt(c);
      return isNaN(num) ? null : num;
    });

    if (coeffs.some((c) => c === null)) {
      alert('Please fill in all coefficients.');
      return;
    }

    if (coeffs.some((c) => c <= 0)) {
      alert('Coefficients must be positive integers.');
      return;
    }

    const balanced = isBalanced(currentEquation, coeffs);

    if (balanced) {
      setFeedback({ isCorrect: true });
      setStatistics((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
      }));
    } else {
      setFeedback({ isCorrect: false });
      setStatistics((prev) => ({
        ...prev,
        total: prev.total + 1,
      }));
    }
  };

  // Render formula with subscripts
  const renderFormula = (formula) => {
    if (typeof window.katex === 'undefined') {
      return <span>{formula}</span>;
    }
    try {
      const katexFormula = `\\text{${formula}}`;
      const html = window.katex.renderToString(katexFormula, {
        throwOnError: false,
      });
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
      return <span>{formula}</span>;
    }
  };

  if (SCIENCE_CHEMISTRY_EQUATIONS.length === 0) {
    return (
      <div
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <p>Chemistry equations data is loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-xl ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2
        className="text-3xl font-bold mb-2"
        style={{ color: 'var(--subject-science-accent)' }}
      >
        Chemistry Equation Balancer
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Practice balancing chemical equations in different modes
      </p>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-300 dark:border-gray-600">
        {[
          { id: 'guided', label: 'Guided Balancing' },
          { id: 'unguided', label: 'Unguided' },
          { id: 'reaction-type', label: 'Reaction Type ID' },
          { id: 'random', label: 'Random Mode' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setMode(tab.id);
              setCurrentEquation(null);
              setFeedback(null);
            }}
            className={`px-4 py-2 font-semibold transition border-b-2 ${
              mode === tab.id
                ? 'border-green-600 text-green-600'
                : isDark
                ? 'border-transparent text-gray-400 hover:text-gray-200'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Statistics Panel */}
      <div
        className={`p-4 rounded-lg mb-4 text-center ${
          isDark ? 'bg-gray-700' : 'bg-white'
        }`}
      >
        <p className="font-semibold">
          Progress:{' '}
          <span style={{ color: 'var(--subject-science-accent)' }}>
            {statistics.correct} / {statistics.total}
          </span>
        </p>
        {statistics.total > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            Accuracy:{' '}
            {((statistics.correct / statistics.total) * 100).toFixed(0)}%
          </p>
        )}
      </div>

      {/* Equation Display */}
      {currentEquation && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            isDark ? 'bg-gray-700' : 'bg-white'
          }`}
        >
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">
              Reaction Type:{' '}
              <span style={{ color: 'var(--subject-science-accent)' }}>
                {currentEquation.type.replace(/_/g, ' ').toUpperCase()}
              </span>
            </h3>
            <p className="text-sm">
              Difficulty: <strong>{currentEquation.difficulty}</strong>
            </p>
          </div>

          {/* Equation with Coefficient Inputs */}
          <div className="mb-4 p-3 bg-white rounded-lg border border-gray-300 dark:border-gray-600">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {/* Reactants */}
              {currentEquation.reactants.map((reactant, idx) => (
                <div
                  key={`reactant-${idx}`}
                  className="flex items-center gap-2"
                >
                  {mode === 'guided' || mode === 'random' ? (
                    <>
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={studentCoefficients[idx]}
                          onChange={(e) =>
                            updateCoefficient(idx, e.target.value)
                          }
                          className={`w-12 px-2 py-1 border rounded text-center font-bold ${
                            isDark
                              ? 'bg-gray-800 border-gray-600 text-white'
                              : 'bg-white border-gray-300'
                          }`}
                          placeholder="-"
                        />
                        <span className="text-xs text-gray-500 mt-1">
                          coeff
                        </span>
                      </div>
                      <div>{renderFormula(reactant.formula)}</div>
                    </>
                  ) : (
                    <div>{renderFormula(reactant.formula)}</div>
                  )}
                  {idx < currentEquation.reactants.length - 1 && (
                    <span className="text-xl">+</span>
                  )}
                </div>
              ))}

              <span className="text-xl font-bold">→</span>

              {/* Products */}
              {currentEquation.products.map((product, idx) => (
                <div key={`product-${idx}`} className="flex items-center gap-2">
                  {mode === 'guided' || mode === 'random' ? (
                    <>
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={
                            studentCoefficients[
                              currentEquation.reactants.length + idx
                            ]
                          }
                          onChange={(e) =>
                            updateCoefficient(
                              currentEquation.reactants.length + idx,
                              e.target.value
                            )
                          }
                          className={`w-12 px-2 py-1 border rounded text-center font-bold ${
                            isDark
                              ? 'bg-gray-800 border-gray-600 text-white'
                              : 'bg-white border-gray-300'
                          }`}
                          placeholder="-"
                        />
                        <span className="text-xs text-gray-500 mt-1">
                          coeff
                        </span>
                      </div>
                      <div>{renderFormula(product.formula)}</div>
                    </>
                  ) : (
                    <div>{renderFormula(product.formula)}</div>
                  )}
                  {idx < currentEquation.products.length - 1 && (
                    <span className="text-xl">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Unguided Mode - Display Equation as Text */}
          {mode === 'unguided' && (
            <div
              className={`p-3 rounded-lg mb-4 ${
                isDark ? 'bg-gray-800' : 'bg-blue-50'
              }`}
            >
              <p className="text-sm font-semibold mb-2">
                Balance this equation:
              </p>
              <p className="text-lg font-mono text-center">
                {currentEquation.displayEquation}
              </p>
            </div>
          )}

          {/* Unguided Mode - Coefficient Input */}
          {mode === 'unguided' && (
            <div
              className={`p-3 rounded-lg mb-4 ${
                isDark ? 'bg-gray-800' : 'bg-blue-50'
              }`}
            >
              <p className="text-sm font-semibold mb-3">
                Enter coefficients (space-separated):
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={studentCoefficients.join(' ')}
                  onChange={(e) => {
                    const values = e.target.value
                      .split(' ')
                      .map((v) => v.trim());
                    setStudentCoefficients(values);
                  }}
                  placeholder="e.g., 1 2 1 2"
                  className={`flex-1 px-3 py-2 border rounded-lg ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ({currentEquation.reactants.length} reactant(s),{' '}
                {currentEquation.products.length} product(s))
              </p>
            </div>
          )}

          {/* Difficulty Filter for Guided/Random Mode */}
          {(mode === 'guided' || mode === 'random') && (
            <div className="mb-4 flex gap-2">
              <label className="text-sm font-semibold">Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  loadNewEquation();
                }}
                className={`px-2 py-1 border rounded text-sm ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                }`}
              >
                <option value="all">All Levels</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reaction Type Filter for Reaction Type Mode */}
          {mode === 'reaction-type' && (
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">
                Identify the reaction type:
              </p>
              <div className="flex flex-wrap gap-2">
                {reactionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      loadNewEquation(type);
                      setFeedback(null);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      isDark
                        ? 'bg-gray-600 text-gray-100 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {type.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => loadNewEquation()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
        >
          {currentEquation ? 'Next Problem' : 'Start'}
        </button>

        <button
          onClick={checkAnswer}
          disabled={
            !currentEquation || studentCoefficients.some((c) => c === '')
          }
          className={`px-6 py-2 font-bold rounded-lg transition ${
            !currentEquation || studentCoefficients.some((c) => c === '')
              ? 'bg-gray-400 cursor-not-allowed text-gray-700'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          Check Answer
        </button>

        {currentEquation && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition"
          >
            Show Hint
          </button>
        )}

        {currentEquation && !showAnswer && (
          <button
            onClick={() => setShowAnswer(true)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition"
          >
            Show Answer
          </button>
        )}
      </div>

      {/* Feedback Panel */}
      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            feedback.isCorrect
              ? isDark
                ? 'bg-green-900 border-2 border-green-500 text-green-100'
                : 'bg-green-100 border-2 border-green-500 text-green-800'
              : isDark
              ? 'bg-red-900 border-2 border-red-500 text-red-100'
              : 'bg-red-100 border-2 border-red-500 text-red-800'
          }`}
        >
          {feedback.isCorrect ? (
            <div>
              <p className="font-bold text-lg">✓ Correct! Great job!</p>
              <p className="text-sm mt-1">
                Your coefficients properly balance the equation.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-lg">✗ Not quite right</p>
              <p className="text-sm mt-1">
                Check that all atoms are balanced on both sides of the equation.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hints */}
      {showHint && currentEquation && (
        <div
          className={`p-4 rounded-lg mb-4 border-l-4 ${
            isDark
              ? 'bg-amber-900 border-amber-500 text-amber-100'
              : 'bg-amber-50 border-amber-500 text-amber-900'
          }`}
        >
          <p className="font-semibold mb-2">💡 Hint:</p>
          <div className="text-sm space-y-2">
            <p className="font-medium">
              Current atom counts with your coefficients:
            </p>
            {(() => {
              const coeffs = studentCoefficients.map((c) => {
                if (c === '' || c === null || c === undefined) return 1;
                const num = typeof c === 'number' ? c : parseInt(c);
                return isNaN(num) ? 1 : num;
              });

              const leftAtoms = {};
              const rightAtoms = {};

              currentEquation.reactants.forEach((reactant, idx) => {
                const atomCounts = parseFormula(reactant.formula);
                const coeff = coeffs[idx];
                Object.entries(atomCounts).forEach(([atom, count]) => {
                  leftAtoms[atom] = (leftAtoms[atom] || 0) + count * coeff;
                });
              });

              const reactantCount = currentEquation.reactants.length;
              currentEquation.products.forEach((product, idx) => {
                const atomCounts = parseFormula(product.formula);
                const coeff = coeffs[reactantCount + idx];
                Object.entries(atomCounts).forEach(([atom, count]) => {
                  rightAtoms[atom] = (rightAtoms[atom] || 0) + count * coeff;
                });
              });

              const allAtoms = [
                ...new Set([
                  ...Object.keys(leftAtoms),
                  ...Object.keys(rightAtoms),
                ]),
              ];

              return (
                <div className="space-y-1">
                  {allAtoms.map((atom) => {
                    const left = leftAtoms[atom] || 0;
                    const right = rightAtoms[atom] || 0;
                    const balanced = left === right;
                    return (
                      <div
                        key={atom}
                        className={`flex items-center gap-2 ${
                          !balanced ? 'font-bold' : ''
                        }`}
                      >
                        <span className="w-8">{atom}:</span>
                        <span
                          className={
                            left === right ? 'text-green-600' : 'text-red-600'
                          }
                        >
                          {left} (left) vs {right} (right)
                        </span>
                        {!balanced && (
                          <span className="text-red-600">
                            ← Needs balancing!
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
            <p className="mt-3 italic">
              💡 Tip: Adjust the coefficients so that each atom has the same
              count on both sides.
            </p>
          </div>
        </div>
      )}

      {/* Answer */}
      {showAnswer && currentEquation && (
        <div
          className={`p-4 rounded-lg ${
            isDark
              ? 'bg-purple-900 border-2 border-purple-500 text-purple-100'
              : 'bg-purple-50 border-2 border-purple-500 text-purple-900'
          }`}
        >
          <p className="font-semibold mb-2">Answer:</p>
          <div className="flex items-center gap-2 flex-wrap justify-center p-3 bg-black bg-opacity-20 rounded-lg font-mono text-lg">
            {currentEquation.coefficients.map((coeff, idx) => (
              <span key={idx}>{coeff}</span>
            ))}
          </div>
          <p className="text-xs mt-2">
            Try entering these coefficients to see the balanced equation.
          </p>
        </div>
      )}
    </div>
  );
}
