import React, { useState, useMemo, useRef, useCallback } from 'react';

// ── Trait Bank ────────────────────────────────────────────────────────
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
  {
    id: 'seed_shape',
    name: 'Seed Shape',
    dominantAllele: 'R',
    recessiveAllele: 'r',
    dominantPhenotype: 'Round',
    recessivePhenotype: 'Wrinkled',
  },
  {
    id: 'coat_texture',
    name: 'Coat Texture',
    dominantAllele: 'C',
    recessiveAllele: 'c',
    dominantPhenotype: 'Curly',
    recessivePhenotype: 'Straight',
  },
  {
    id: 'wing_pattern',
    name: 'Wing Pattern',
    dominantAllele: 'W',
    recessiveAllele: 'w',
    dominantPhenotype: 'Spotted',
    recessivePhenotype: 'Plain',
  },
  {
    id: 'beak_shape',
    name: 'Beak Shape',
    dominantAllele: 'N',
    recessiveAllele: 'n',
    dominantPhenotype: 'Wide',
    recessivePhenotype: 'Narrow',
  },
  {
    id: 'pea_color',
    name: 'Pea Color',
    dominantAllele: 'Y',
    recessiveAllele: 'y',
    dominantPhenotype: 'Yellow',
    recessivePhenotype: 'Green',
  },
  {
    id: 'tail_length',
    name: 'Tail Length',
    dominantAllele: 'L',
    recessiveAllele: 'l',
    dominantPhenotype: 'Long',
    recessivePhenotype: 'Short',
  },
  {
    id: 'horn_presence',
    name: 'Horn Presence',
    dominantAllele: 'H',
    recessiveAllele: 'h',
    dominantPhenotype: 'Horned',
    recessivePhenotype: 'Hornless',
  },
  {
    id: 'scale_color',
    name: 'Scale Color',
    dominantAllele: 'S',
    recessiveAllele: 's',
    dominantPhenotype: 'Dark',
    recessivePhenotype: 'Light',
  },
];

const GENOTYPE_OPTIONS = [
  { label: 'Homozygous Dominant (e.g., TT)', value: 'homozygous_dominant' },
  { label: 'Heterozygous (e.g., Tt)', value: 'heterozygous' },
  { label: 'Homozygous Recessive (e.g., tt)', value: 'homozygous_recessive' },
];

// ── Shared helpers ───────────────────────────────────────────────────
const CELL_ORDER = ['0-0', '0-1', '1-0', '1-1'];
const EMPTY_CELLS = { '0-0': '', '0-1': '', '1-0': '', '1-1': '' };

function getAllelesFromType(genotypeType, trait) {
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
}

/** Dominant allele first (capital letter first). Works for any single-letter pair. */
function normalizeGenotype(g) {
  if (!g || g.length !== 2) return g;
  const [a, b] = g.split('');
  // Capital before lowercase
  if (a === a.toUpperCase() && b === b.toUpperCase()) return g;
  if (a === a.toLowerCase() && b === b.toUpperCase()) return b + a;
  return g;
}

/** Derive ratios from the 4 offspring genotypes. */
function deriveRatios(cells) {
  const genotypes = CELL_ORDER.map((k) => cells[k]).filter(Boolean);
  if (genotypes.length < 4) return null;
  const genoCounts = {};
  genotypes.forEach((g) => {
    genoCounts[g] = (genoCounts[g] || 0) + 1;
  });
  // Phenotype: anything with at least one uppercase letter is dominant-expressing
  let dominant = 0;
  let recessive = 0;
  genotypes.forEach((g) => {
    if (/[A-Z]/.test(g)) dominant++;
    else recessive++;
  });
  return {
    genoCounts,
    phenoCounts: { dominant, recessive },
    genoRatio: Object.entries(genoCounts)
      .map(([g, c]) => `${c} ${g}`)
      .join(' : '),
    phenoRatio: `${dominant}:${recessive}`,
    dominantPct: (dominant / 4) * 100,
  };
}

// ═══════════════════════════════════════════════════════════════════════
//  Exam-Mode Scratch-Pad Grid
// ═══════════════════════════════════════════════════════════════════════
function ExamPunnettGrid({ dark, onClose }) {
  // Header alleles (editable)
  const [p1a, setP1a] = useState('');
  const [p1b, setP1b] = useState('');
  const [p2a, setP2a] = useState('');
  const [p2b, setP2b] = useState('');
  // Offspring cells
  const [cells, setCells] = useState({ ...EMPTY_CELLS });
  const cellRefs = useRef({});

  const handleCellChange = useCallback((key, val) => {
    setCells((prev) => ({
      ...prev,
      [key]: val.length <= 2 ? val : val.slice(0, 2),
    }));
  }, []);

  // Tab-key flow: p1a → p1b → p2a → p2b → 0-0 → 0-1 → 1-0 → 1-1
  const TAB_ORDER = ['p1a', 'p1b', 'p2a', 'p2b', ...CELL_ORDER];
  const focusNext = useCallback(
    (currentId) => {
      const idx = TAB_ORDER.indexOf(currentId);
      if (idx >= 0 && idx < TAB_ORDER.length - 1) {
        cellRefs.current[TAB_ORDER[idx + 1]]?.focus();
      }
    },
    [TAB_ORDER]
  );

  const handleKeyDown = useCallback(
    (id) => (e) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        const idx = TAB_ORDER.indexOf(id);
        if (idx >= 0 && idx < TAB_ORDER.length - 1) {
          e.preventDefault();
          focusNext(id);
        }
      }
    },
    [focusNext, TAB_ORDER]
  );

  const setRef = useCallback(
    (id) => (el) => {
      cellRefs.current[id] = el;
    },
    []
  );

  const ratios = useMemo(() => deriveRatios(cells), [cells]);

  const clearAll = () => {
    setP1a('');
    setP1b('');
    setP2a('');
    setP2b('');
    setCells({ ...EMPTY_CELLS });
    cellRefs.current['p1a']?.focus();
  };

  // Shared cell styles using CSS variables for theme consistency
  const headerCellClass =
    'flex items-center justify-center font-bold text-lg rounded-md border-2 transition-colors duration-150 ' +
    'min-w-[3.5rem] min-h-[3.5rem] aspect-square ' +
    (dark
      ? 'border-[var(--border-primary,#4b5563)] bg-[var(--surface-secondary,#1f2937)] text-white'
      : 'border-[var(--border-primary,#d1d5db)] bg-[var(--surface-secondary,#f9fafb)] text-gray-900');

  const inputCellClass =
    'w-full h-full text-center font-bold text-lg bg-transparent outline-none ' +
    'focus:ring-2 focus:ring-[var(--accent-blue,#3b82f6)] focus:ring-inset rounded-md ' +
    (dark
      ? 'text-white placeholder:text-gray-500'
      : 'text-gray-900 placeholder:text-gray-300');

  const offspringCellClass = (key) =>
    'flex items-center justify-center border-2 rounded-md transition-all duration-200 ' +
    'min-w-[3.5rem] min-h-[3.5rem] aspect-square ' +
    (cells[key]
      ? dark
        ? 'border-emerald-500/60 bg-emerald-900/20'
        : 'border-emerald-400 bg-emerald-50'
      : dark
        ? 'border-[var(--border-primary,#4b5563)] bg-[var(--surface-primary,#111827)]'
        : 'border-[var(--border-primary,#d1d5db)] bg-white');

  return (
    <div
      className={`rounded-xl p-5 ${
        dark
          ? 'bg-[var(--surface-primary,#111827)] text-white'
          : 'bg-[var(--surface-primary,#ffffff)] text-gray-900'
      }`}
      style={{ maxWidth: 400, margin: '0 auto' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          🧬 Punnett Square
        </h3>
        <div className="flex gap-2">
          <button
            onClick={clearAll}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              dark
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Clear
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                dark
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label="Close Punnett Square"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <p className={`text-xs mb-3 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        Type parent alleles in the header cells, then fill in offspring
        genotypes. Ratios auto-calculate below.
      </p>

      {/* 3×3 Grid */}
      <div className="flex justify-center mb-4">
        <div className="inline-grid grid-cols-3 gap-1.5">
          {/* Top-left: label */}
          <div className="flex items-center justify-center min-w-[3.5rem] min-h-[3.5rem]">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider ${
                dark ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              P♀ ↓ / P♂ →
            </span>
          </div>

          {/* Parent 2 alleles (top header) */}
          <div className={headerCellClass}>
            <input
              ref={setRef('p2a')}
              type="text"
              maxLength={1}
              value={p2a}
              onChange={(e) => setP2a(e.target.value)}
              onKeyDown={handleKeyDown('p2a')}
              className={inputCellClass}
              placeholder="?"
              aria-label="Parent 2, allele 1"
            />
          </div>
          <div className={headerCellClass}>
            <input
              ref={setRef('p2b')}
              type="text"
              maxLength={1}
              value={p2b}
              onChange={(e) => setP2b(e.target.value)}
              onKeyDown={handleKeyDown('p2b')}
              className={inputCellClass}
              placeholder="?"
              aria-label="Parent 2, allele 2"
            />
          </div>

          {/* Row 1 */}
          <div className={headerCellClass}>
            <input
              ref={setRef('p1a')}
              type="text"
              maxLength={1}
              value={p1a}
              onChange={(e) => setP1a(e.target.value)}
              onKeyDown={handleKeyDown('p1a')}
              className={inputCellClass}
              placeholder="?"
              aria-label="Parent 1, allele 1"
              autoFocus
            />
          </div>
          <div className={offspringCellClass('0-0')}>
            <input
              ref={setRef('0-0')}
              type="text"
              maxLength={2}
              value={cells['0-0']}
              onChange={(e) => handleCellChange('0-0', e.target.value)}
              onKeyDown={handleKeyDown('0-0')}
              className={inputCellClass}
              placeholder="—"
              aria-label="Offspring row 1, column 1"
            />
          </div>
          <div className={offspringCellClass('0-1')}>
            <input
              ref={setRef('0-1')}
              type="text"
              maxLength={2}
              value={cells['0-1']}
              onChange={(e) => handleCellChange('0-1', e.target.value)}
              onKeyDown={handleKeyDown('0-1')}
              className={inputCellClass}
              placeholder="—"
              aria-label="Offspring row 1, column 2"
            />
          </div>

          {/* Row 2 */}
          <div className={headerCellClass}>
            <input
              ref={setRef('p1b')}
              type="text"
              maxLength={1}
              value={p1b}
              onChange={(e) => setP1b(e.target.value)}
              onKeyDown={handleKeyDown('p1b')}
              className={inputCellClass}
              placeholder="?"
              aria-label="Parent 1, allele 2"
            />
          </div>
          <div className={offspringCellClass('1-0')}>
            <input
              ref={setRef('1-0')}
              type="text"
              maxLength={2}
              value={cells['1-0']}
              onChange={(e) => handleCellChange('1-0', e.target.value)}
              onKeyDown={handleKeyDown('1-0')}
              className={inputCellClass}
              placeholder="—"
              aria-label="Offspring row 2, column 1"
            />
          </div>
          <div className={offspringCellClass('1-1')}>
            <input
              ref={setRef('1-1')}
              type="text"
              maxLength={2}
              value={cells['1-1']}
              onChange={(e) => handleCellChange('1-1', e.target.value)}
              onKeyDown={handleKeyDown('1-1')}
              className={inputCellClass}
              placeholder="—"
              aria-label="Offspring row 2, column 2"
            />
          </div>
        </div>
      </div>

      {/* Auto-calculated ratios (read-only) */}
      {ratios && (
        <div
          className={`rounded-lg p-3 text-sm space-y-1 transition-opacity duration-300 ${
            dark ? 'bg-gray-800/60 text-gray-300' : 'bg-gray-50 text-gray-700'
          }`}
        >
          <div className="flex justify-between">
            <span className="font-semibold">Genotype ratio:</span>
            <span className="font-mono">{ratios.genoRatio}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phenotype ratio:</span>
            <span className="font-mono">{ratios.phenoRatio}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Dominant %:</span>
            <span className="font-mono">{ratios.dominantPct}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  Practice Mode (original 3-mode workflow, modernized)
// ═══════════════════════════════════════════════════════════════════════
function PracticePunnett({ dark, onClose }) {
  const [mode, setMode] = useState(null);
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [parent1Genotype, setParent1Genotype] = useState('');
  const [parent2Genotype, setParent2Genotype] = useState('');

  const [squareCells, setSquareCells] = useState({ ...EMPTY_CELLS });
  const [currentGuidedCell, setCurrentGuidedCell] = useState('0-0');
  const [cellFeedback, setCellFeedback] = useState({});

  const [genotypeRatioAnswer, setGenotypeRatioAnswer] = useState('');
  const [phenotypeRatioAnswer, setPhenotypeRatioAnswer] = useState('');
  const [probabilityAnswer, setProbabilityAnswer] = useState('');

  const [finalFeedback, setFinalFeedback] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [validationMsg, setValidationMsg] = useState('');

  const calculateCorrectSquare = useCallback(() => {
    if (!selectedTrait) return {};
    const p1 = getAllelesFromType(parent1Genotype, selectedTrait);
    const p2 = getAllelesFromType(parent2Genotype, selectedTrait);
    return {
      '0-0': normalizeGenotype(p1[0] + p2[0]),
      '0-1': normalizeGenotype(p1[0] + p2[1]),
      '1-0': normalizeGenotype(p1[1] + p2[0]),
      '1-1': normalizeGenotype(p1[1] + p2[1]),
    };
  }, [selectedTrait, parent1Genotype, parent2Genotype]);

  const calculateRatios = useCallback(() => {
    const correct = calculateCorrectSquare();
    const genotypes = Object.values(correct);
    const genoCounts = {};
    genotypes.forEach((g) => {
      genoCounts[g] = (genoCounts[g] || 0) + 1;
    });
    const phenoCounts = { dominant: 0, recessive: 0 };
    genotypes.forEach((g) => {
      if (g.includes(selectedTrait.dominantAllele)) phenoCounts.dominant++;
      else phenoCounts.recessive++;
    });
    return { genoCounts, phenoCounts };
  }, [calculateCorrectSquare, selectedTrait]);

  const startPractice = () => {
    if (!mode || !selectedTrait || !parent1Genotype || !parent2Genotype) {
      setValidationMsg('Please select mode, trait, and both parent genotypes.');
      return;
    }
    setValidationMsg('');
    setSquareCells({ ...EMPTY_CELLS });
    setCellFeedback({});
    setCurrentGuidedCell('0-0');
    setGenotypeRatioAnswer('');
    setPhenotypeRatioAnswer('');
    setProbabilityAnswer('');
    setFinalFeedback(null);
    setShowExplanation(false);
  };

  const handleCellInput = (cellKey, value) => {
    const formatted = value.toUpperCase();
    setSquareCells((prev) => ({ ...prev, [cellKey]: formatted }));

    if (mode === 'guided') {
      const correct = calculateCorrectSquare();
      const isCorrect = formatted === correct[cellKey];
      setCellFeedback((prev) => ({
        ...prev,
        [cellKey]: isCorrect
          ? 'correct'
          : formatted.length >= 2
            ? 'incorrect'
            : null,
      }));
      if (isCorrect) {
        const idx = CELL_ORDER.indexOf(cellKey);
        if (idx < 3) {
          setCurrentGuidedCell(CELL_ORDER[idx + 1]);
        } else {
          // Last cell correct — auto-submit for guided mode
          const updatedCells = { ...squareCells, [cellKey]: formatted };
          const finalFb = {};
          Object.keys(correct).forEach((k) => {
            finalFb[k] =
              updatedCells[k] === correct[k] ? 'correct' : 'incorrect';
          });
          setCellFeedback(finalFb);
          const { genoCounts, phenoCounts } = (() => {
            const genotypes = Object.values(correct);
            const gc = {};
            genotypes.forEach((g) => {
              gc[g] = (gc[g] || 0) + 1;
            });
            let dom = 0,
              rec = 0;
            genotypes.forEach((g) => {
              if (g.includes(selectedTrait.dominantAllele)) dom++;
              else rec++;
            });
            return {
              genoCounts: gc,
              phenoCounts: { dominant: dom, recessive: rec },
            };
          })();
          setFinalFeedback({
            squareCorrect: true,
            correctSquare: correct,
            genoCounts,
            phenoCounts,
          });
          setShowExplanation(true);
        }
      }
    }
  };

  const submitAnswer = () => {
    const correct = calculateCorrectSquare();
    const { genoCounts, phenoCounts } = calculateRatios();
    let squareCorrect = true;
    const fb = {};
    Object.keys(correct).forEach((k) => {
      const ok = squareCells[k] === correct[k];
      fb[k] = ok ? 'correct' : 'incorrect';
      if (!ok) squareCorrect = false;
    });
    setCellFeedback(fb);

    const base = {
      squareCorrect,
      correctSquare: correct,
      genoCounts,
      phenoCounts,
    };

    if (mode === 'freeform') {
      const domPct = (phenoCounts.dominant / 4) * 100;
      setFinalFeedback({
        ...base,
        genotypeRatioCorrect: genotypeRatioAnswer
          .replace(/\s/g, '')
          .includes(Object.keys(genoCounts).join(':')),
        phenotypeRatioCorrect:
          phenotypeRatioAnswer.replace(/\s/g, '') ===
          `${phenoCounts.dominant}:${phenoCounts.recessive}`,
        probabilityCorrect:
          Math.abs(parseFloat(probabilityAnswer) - domPct) < 1,
        dominantPercent: domPct,
      });
    } else {
      setFinalFeedback(base);
    }
    setShowExplanation(true);
  };

  const reset = () => {
    setMode(null);
    setSelectedTrait(null);
    setParent1Genotype('');
    setParent2Genotype('');
    setSquareCells({ ...EMPTY_CELLS });
    setCellFeedback({});
    setFinalFeedback(null);
    setShowExplanation(false);
    setValidationMsg('');
  };

  const p1Alleles = useMemo(
    () =>
      selectedTrait ? getAllelesFromType(parent1Genotype, selectedTrait) : [],
    [parent1Genotype, selectedTrait]
  );
  const p2Alleles = useMemo(
    () =>
      selectedTrait ? getAllelesFromType(parent2Genotype, selectedTrait) : [],
    [parent2Genotype, selectedTrait]
  );

  // Shared classes
  const surface = dark
    ? 'bg-[var(--surface-primary,#111827)] text-white'
    : 'bg-[var(--surface-primary,#ffffff)] text-gray-900';
  const card = dark
    ? 'bg-[var(--surface-secondary,#1f2937)]'
    : 'bg-[var(--surface-secondary,#f9fafb)]';
  const borderCol = dark
    ? 'border-[var(--border-primary,#4b5563)]'
    : 'border-[var(--border-primary,#d1d5db)]';

  return (
    <div className={`p-6 rounded-xl ${surface}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>🧬</span>
          <span style={{ color: 'var(--accent-blue, #10b981)' }}>
            Punnett Square Practice
          </span>
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:opacity-70 transition"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      {/* Mode Selection */}
      {!mode && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-3">Select Practice Mode:</h3>

          {[
            {
              id: 'guided',
              icon: '🎯',
              label: 'Guided Mode',
              desc: 'Step-by-step scaffolded learning. Fill one cell at a time with immediate feedback and hints.',
            },
            {
              id: 'assisted',
              icon: '📝',
              label: 'Assisted Mode',
              desc: "Parents' genotypes provided. Fill the entire square and identify ratios.",
            },
            {
              id: 'freeform',
              icon: '🎓',
              label: 'Freeform / Test Mode',
              desc: 'Full GED readiness. Complete the square and answer probability questions. No hints.',
            },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-full p-4 rounded-lg text-left transition border ${borderCol} hover:border-[var(--accent-blue,#3b82f6)] ${card}`}
            >
              <div className="font-bold text-base mb-1">
                {m.icon} {m.label}
              </div>
              <p
                className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {m.desc}
              </p>
            </button>
          ))}

          <div className={`mt-4 p-3 rounded-lg text-sm ${card}`}>
            <h4 className="font-bold mb-1">About Punnett Squares</h4>
            <p className={dark ? 'text-gray-400' : 'text-gray-600'}>
              Punnett squares predict genetic outcomes when two organisms
              reproduce. Each parent contributes one allele. Dominant alleles
              (capital letters) mask recessive alleles (lowercase) in the
              phenotype.
            </p>
          </div>
        </div>
      )}

      {/* Setup + Grid */}
      {mode && !showExplanation && (
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={reset}
              className={`px-3 py-1.5 text-sm font-semibold rounded-md transition ${
                dark
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              ← Change Mode
            </button>
            <span
              className="px-3 py-1.5 text-sm font-semibold rounded-md"
              style={{
                background: 'var(--accent-blue, #3b82f6)',
                color: '#fff',
              }}
            >
              {mode === 'guided'
                ? '🎯 Guided'
                : mode === 'assisted'
                  ? '📝 Assisted'
                  : '🎓 Freeform'}
            </span>
          </div>

          {validationMsg && (
            <p
              className="text-sm font-semibold"
              style={{ color: 'var(--danger-text, #dc2626)' }}
            >
              {validationMsg}
            </p>
          )}

          {/* Trait Selection */}
          <div>
            <label className="block font-semibold mb-2 text-sm">
              Select Trait:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {GENETICS_TRAITS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrait(t)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition border ${
                    selectedTrait?.id === t.id
                      ? 'border-emerald-500 bg-emerald-600 text-white'
                      : `${borderCol} ${card} hover:border-[var(--accent-blue,#3b82f6)]`
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            {selectedTrait && (
              <div className={`mt-2 p-2 rounded-lg text-xs ${card}`}>
                <span className="font-semibold">
                  {selectedTrait.dominantAllele} ={' '}
                  {selectedTrait.dominantPhenotype}
                </span>
                {' · '}
                <span className="font-semibold">
                  {selectedTrait.recessiveAllele} ={' '}
                  {selectedTrait.recessivePhenotype}
                </span>
              </div>
            )}
          </div>

          {/* Parent Selectors */}
          {selectedTrait && (
            <>
              {['Parent 1', 'Parent 2'].map((label, idx) => {
                const val = idx === 0 ? parent1Genotype : parent2Genotype;
                const setter =
                  idx === 0 ? setParent1Genotype : setParent2Genotype;
                return (
                  <div key={label}>
                    <label className="block font-semibold mb-1 text-sm">
                      {label} Genotype:
                    </label>
                    <select
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        dark
                          ? 'bg-[var(--surface-secondary,#1f2937)] border-[var(--border-primary,#4b5563)] text-white'
                          : 'bg-white border-[var(--border-primary,#d1d5db)]'
                      }`}
                    >
                      <option value="">-- Select --</option>
                      {GENOTYPE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label.replace(
                            'e.g., TT',
                            `e.g., ${getAllelesFromType(o.value, selectedTrait).join('')}`
                          )}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}

              {parent1Genotype && parent2Genotype && (
                <button
                  onClick={startPractice}
                  className="w-full px-4 py-2.5 font-bold rounded-lg transition text-sm"
                  style={{
                    background: 'var(--accent-blue, #3b82f6)',
                    color: '#fff',
                  }}
                >
                  Start Practice
                </button>
              )}
            </>
          )}

          {/* Grid */}
          {p1Alleles.length > 0 && p2Alleles.length > 0 && (
            <div className={`p-4 rounded-lg ${card}`}>
              <h3 className="text-base font-bold mb-3">Punnett Square:</h3>
              {mode === 'guided' && (
                <div
                  className={`mb-3 p-2 rounded-lg text-xs ${
                    dark ? 'bg-blue-900/20' : 'bg-blue-50'
                  } border-l-4 border-[var(--accent-blue,#3b82f6)]`}
                >
                  💡 <strong>Hint:</strong> Combine one allele from each parent.
                  Capital = dominant.
                </div>
              )}

              <div className="flex justify-center">
                <div className="inline-grid grid-cols-3 gap-1">
                  <div className="min-w-[3.5rem] min-h-[3.5rem]" />
                  {p2Alleles.map((a, i) => (
                    <div
                      key={`p2-${i}`}
                      className={`flex items-center justify-center font-bold text-lg rounded-md border-2 min-w-[3.5rem] min-h-[3.5rem] ${
                        dark
                          ? 'border-[var(--border-primary,#4b5563)] bg-[var(--surface-secondary,#1f2937)]'
                          : 'border-[var(--border-primary,#d1d5db)] bg-[var(--surface-secondary,#f9fafb)]'
                      }`}
                    >
                      {a}
                    </div>
                  ))}
                  {p1Alleles.map((p1a, row) => (
                    <React.Fragment key={`row-${row}`}>
                      <div
                        className={`flex items-center justify-center font-bold text-lg rounded-md border-2 min-w-[3.5rem] min-h-[3.5rem] ${
                          dark
                            ? 'border-[var(--border-primary,#4b5563)] bg-[var(--surface-secondary,#1f2937)]'
                            : 'border-[var(--border-primary,#d1d5db)] bg-[var(--surface-secondary,#f9fafb)]'
                        }`}
                      >
                        {p1a}
                      </div>
                      {[0, 1].map((col) => {
                        const key = `${row}-${col}`;
                        const fb = cellFeedback[key];
                        let cellBorder = borderCol;
                        let cellBg = dark
                          ? 'bg-[var(--surface-primary,#111827)]'
                          : 'bg-white';
                        if (fb === 'correct') {
                          cellBorder = 'border-emerald-500';
                          cellBg = dark ? 'bg-emerald-900/20' : 'bg-emerald-50';
                        } else if (fb === 'incorrect') {
                          cellBorder = 'border-red-500';
                          cellBg = dark ? 'bg-red-900/20' : 'bg-red-50';
                        } else if (
                          mode === 'guided' &&
                          key === currentGuidedCell
                        ) {
                          cellBorder =
                            'border-[var(--accent-blue,#3b82f6)] border-[3px]';
                        }
                        return (
                          <div
                            key={key}
                            className={`flex items-center justify-center border-2 rounded-md min-w-[3.5rem] min-h-[3.5rem] transition-all duration-200 ${cellBorder} ${cellBg}`}
                          >
                            <input
                              type="text"
                              maxLength={2}
                              value={squareCells[key]}
                              onChange={(e) =>
                                handleCellInput(key, e.target.value)
                              }
                              disabled={
                                mode === 'guided' && key !== currentGuidedCell
                              }
                              className={`w-full h-full text-center font-bold text-lg bg-transparent outline-none focus:ring-2 focus:ring-[var(--accent-blue,#3b82f6)] focus:ring-inset rounded-md ${
                                dark ? 'text-white' : 'text-gray-900'
                              } ${mode === 'guided' && key !== currentGuidedCell ? 'opacity-40' : ''}`}
                            />
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {(mode === 'assisted' || mode === 'freeform') && (
                <>
                  {mode === 'freeform' && (
                    <div className="mt-4 space-y-3">
                      {[
                        {
                          label: 'Genotype Ratio',
                          ph: 'e.g., 1TT:2Tt:1tt',
                          val: genotypeRatioAnswer,
                          set: setGenotypeRatioAnswer,
                          type: 'text',
                        },
                        {
                          label: 'Phenotype Ratio (Dom:Rec)',
                          ph: 'e.g., 3:1',
                          val: phenotypeRatioAnswer,
                          set: setPhenotypeRatioAnswer,
                          type: 'text',
                        },
                        {
                          label: `Probability of ${selectedTrait.dominantPhenotype} (%)`,
                          ph: 'e.g., 75',
                          val: probabilityAnswer,
                          set: setProbabilityAnswer,
                          type: 'number',
                        },
                      ].map((f) => (
                        <div key={f.label}>
                          <label className="block font-semibold mb-1 text-sm">
                            {f.label}:
                          </label>
                          <input
                            type={f.type}
                            placeholder={f.ph}
                            value={f.val}
                            onChange={(e) => f.set(e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm ${
                              dark
                                ? 'bg-[var(--surface-secondary,#1f2937)] border-[var(--border-primary,#4b5563)] text-white'
                                : 'bg-white border-[var(--border-primary,#d1d5db)]'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={submitAnswer}
                    className="w-full mt-4 px-4 py-2.5 font-bold rounded-lg transition text-sm"
                    style={{
                      background: 'var(--success-bg, #16a34a)',
                      color: '#fff',
                    }}
                  >
                    Submit Answer
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {showExplanation && finalFeedback && (
        <div className="space-y-4 mt-4">
          <div
            className={`p-4 rounded-lg border-2 ${
              finalFeedback.squareCorrect
                ? 'border-emerald-500 ' +
                  (dark ? 'bg-emerald-900/20' : 'bg-emerald-50')
                : 'border-red-500 ' + (dark ? 'bg-red-900/20' : 'bg-red-50')
            }`}
          >
            <h3 className="text-lg font-bold mb-1">
              {finalFeedback.squareCorrect
                ? '✓ Punnett Square Correct!'
                : '✗ Some Errors in Punnett Square'}
            </h3>
            {!finalFeedback.squareCorrect && (
              <div className="text-sm font-mono mt-1">
                {finalFeedback.correctSquare['0-0']} |{' '}
                {finalFeedback.correctSquare['0-1']}
                <br />
                {finalFeedback.correctSquare['1-0']} |{' '}
                {finalFeedback.correctSquare['1-1']}
              </div>
            )}
          </div>

          <div className={`p-4 rounded-lg border ${borderCol} ${card}`}>
            <h4 className="font-bold mb-2">📚 Explanation</h4>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Step 1:</strong> Parent 1 alleles:{' '}
                <span className="font-mono">{p1Alleles.join('')}</span>, Parent
                2: <span className="font-mono">{p2Alleles.join('')}</span>.
              </p>
              <p>
                <strong>Step 2:</strong> Combine one allele from each parent per
                cell. {selectedTrait.dominantAllele} (dominant) masks{' '}
                {selectedTrait.recessiveAllele} (recessive).
              </p>
              <p>
                <strong>Genotype:</strong>{' '}
                {Object.entries(finalFeedback.genoCounts)
                  .map(([g, c]) => `${c} ${g}`)
                  .join(' : ')}
              </p>
              <p>
                <strong>Phenotype:</strong> {finalFeedback.phenoCounts.dominant}{' '}
                {selectedTrait.dominantPhenotype} :{' '}
                {finalFeedback.phenoCounts.recessive}{' '}
                {selectedTrait.recessivePhenotype}
              </p>
              {mode === 'freeform' &&
                finalFeedback.dominantPercent !== undefined && (
                  <>
                    <p>
                      <strong>Dominant probability:</strong>{' '}
                      {finalFeedback.phenoCounts.dominant}/4 ={' '}
                      {finalFeedback.dominantPercent}%
                    </p>
                    {[
                      { key: 'genotypeRatioCorrect', label: 'Genotype ratio' },
                      {
                        key: 'phenotypeRatioCorrect',
                        label: 'Phenotype ratio',
                      },
                      { key: 'probabilityCorrect', label: 'Probability' },
                    ].map(
                      (item) =>
                        finalFeedback[item.key] !== undefined && (
                          <p
                            key={item.key}
                            className="font-semibold"
                            style={{
                              color: finalFeedback[item.key]
                                ? 'var(--success-text, #16a34a)'
                                : 'var(--danger-text, #dc2626)',
                            }}
                          >
                            {finalFeedback[item.key] ? '✓' : '✗'} {item.label}
                          </p>
                        )
                    )}
                  </>
                )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={reset}
              className="flex-1 px-4 py-2.5 font-bold rounded-lg text-sm transition"
              style={{
                background: 'var(--accent-blue, #3b82f6)',
                color: '#fff',
              }}
            >
              Try Another Problem
            </button>
            <button
              onClick={() => {
                setFinalFeedback(null);
                setShowExplanation(false);
                setSquareCells({ ...EMPTY_CELLS });
                setCellFeedback({});
                setGenotypeRatioAnswer('');
                setPhenotypeRatioAnswer('');
                setProbabilityAnswer('');
              }}
              className="flex-1 px-4 py-2.5 font-bold rounded-lg text-sm transition"
              style={{
                background: 'var(--success-bg, #16a34a)',
                color: '#fff',
              }}
            >
              Practice Same Cross
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  Public API
// ═══════════════════════════════════════════════════════════════════════

/**
 * PunnettSquarePractice
 *
 * Props:
 *   examMode {boolean} – if true, renders a blank scratch-pad grid (no mode
 *                         selection, no trait picker, no grading). Intended
 *                         for use as an in-exam tool alongside genetics questions.
 *   onClose  {function} – callback to close the tool / modal
 *   dark     {boolean}  – dark-theme flag
 */
export default function PunnettSquarePractice({
  examMode = false,
  onClose,
  dark = false,
}) {
  if (examMode) return <ExamPunnettGrid dark={dark} onClose={onClose} />;
  return <PracticePunnett dark={dark} onClose={onClose} />;
}
