// frontend/data/science_chemistry_equations.js
// Chemical equations data with balancing coefficients and reaction types
const SCIENCE_CHEMISTRY_EQUATIONS = [
  // Combustion Reactions
  {
    id: 'eq_001',
    type: 'combustion',
    difficulty: 'easy',
    reactants: [
      { formula: 'CH₄', name: 'methane' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    products: [
      { formula: 'CO₂', name: 'carbon dioxide' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [1, 2, 1, 2],
    displayEquation: 'CH₄ + O₂ → CO₂ + H₂O',
  },
  {
    id: 'eq_002',
    type: 'combustion',
    difficulty: 'easy',
    reactants: [
      { formula: 'C₂H₆', name: 'ethane' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    products: [
      { formula: 'CO₂', name: 'carbon dioxide' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [2, 7, 4, 6],
    displayEquation: 'C₂H₆ + O₂ → CO₂ + H₂O',
  },
  {
    id: 'eq_003',
    type: 'combustion',
    difficulty: 'medium',
    reactants: [
      { formula: 'C₃H₈', name: 'propane' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    products: [
      { formula: 'CO₂', name: 'carbon dioxide' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [1, 5, 3, 4],
    displayEquation: 'C₃H₈ + O₂ → CO₂ + H₂O',
  },
  {
    id: 'eq_004',
    type: 'combustion',
    difficulty: 'medium',
    reactants: [
      { formula: 'C', name: 'carbon' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    products: [{ formula: 'CO₂', name: 'carbon dioxide' }],
    coefficients: [1, 1, 1],
    displayEquation: 'C + O₂ → CO₂',
  },
  // Synthesis Reactions
  {
    id: 'eq_005',
    type: 'synthesis',
    difficulty: 'easy',
    reactants: [
      { formula: 'H₂', name: 'hydrogen' },
      { formula: 'Cl₂', name: 'chlorine' },
    ],
    products: [{ formula: 'HCl', name: 'hydrogen chloride' }],
    coefficients: [1, 1, 2],
    displayEquation: 'H₂ + Cl₂ → HCl',
  },
  {
    id: 'eq_006',
    type: 'synthesis',
    difficulty: 'easy',
    reactants: [
      { formula: 'Na', name: 'sodium' },
      { formula: 'Cl₂', name: 'chlorine' },
    ],
    products: [{ formula: 'NaCl', name: 'sodium chloride' }],
    coefficients: [2, 1, 2],
    displayEquation: 'Na + Cl₂ → NaCl',
  },
  {
    id: 'eq_007',
    type: 'synthesis',
    difficulty: 'medium',
    reactants: [
      { formula: 'N₂', name: 'nitrogen' },
      { formula: 'H₂', name: 'hydrogen' },
    ],
    products: [{ formula: 'NH₃', name: 'ammonia' }],
    coefficients: [1, 3, 2],
    displayEquation: 'N₂ + H₂ → NH₃',
  },
  {
    id: 'eq_008',
    type: 'synthesis',
    difficulty: 'medium',
    reactants: [
      { formula: 'Fe', name: 'iron' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    products: [{ formula: 'Fe₂O₃', name: 'iron(III) oxide' }],
    coefficients: [4, 3, 2],
    displayEquation: 'Fe + O₂ → Fe₂O₃',
  },
  // Decomposition Reactions
  {
    id: 'eq_009',
    type: 'decomposition',
    difficulty: 'easy',
    reactants: [{ formula: 'H₂O₂', name: 'hydrogen peroxide' }],
    products: [
      { formula: 'H₂O', name: 'water' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    coefficients: [2, 2, 1],
    displayEquation: 'H₂O₂ → H₂O + O₂',
  },
  {
    id: 'eq_010',
    type: 'decomposition',
    difficulty: 'medium',
    reactants: [{ formula: 'CaCO₃', name: 'calcium carbonate' }],
    products: [
      { formula: 'CaO', name: 'calcium oxide' },
      { formula: 'CO₂', name: 'carbon dioxide' },
    ],
    coefficients: [1, 1, 1],
    displayEquation: 'CaCO₃ → CaO + CO₂',
  },
  {
    id: 'eq_011',
    type: 'decomposition',
    difficulty: 'medium',
    reactants: [{ formula: '2H₂O', name: 'water' }],
    products: [
      { formula: 'H₂', name: 'hydrogen' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    coefficients: [2, 2, 1],
    displayEquation: 'H₂O → H₂ + O₂',
  },
  {
    id: 'eq_012',
    type: 'decomposition',
    difficulty: 'hard',
    reactants: [{ formula: 'KMnO₄', name: 'potassium permanganate' }],
    products: [
      { formula: 'K₂MnO₄', name: 'potassium manganate' },
      { formula: 'MnO₂', name: 'manganese dioxide' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    coefficients: [2, 1, 1, 1],
    displayEquation: 'KMnO₄ → K₂MnO₄ + MnO₂ + O₂',
  },
  // Single Displacement Reactions
  {
    id: 'eq_013',
    type: 'single_displacement',
    difficulty: 'easy',
    reactants: [
      { formula: 'Fe', name: 'iron' },
      { formula: 'HCl', name: 'hydrochloric acid' },
    ],
    products: [
      { formula: 'FeCl₂', name: 'iron(II) chloride' },
      { formula: 'H₂', name: 'hydrogen' },
    ],
    coefficients: [1, 2, 1, 1],
    displayEquation: 'Fe + HCl → FeCl₂ + H₂',
  },
  {
    id: 'eq_014',
    type: 'single_displacement',
    difficulty: 'easy',
    reactants: [
      { formula: 'Zn', name: 'zinc' },
      { formula: 'Cu²⁺', name: 'copper ion' },
    ],
    products: [
      { formula: 'Zn²⁺', name: 'zinc ion' },
      { formula: 'Cu', name: 'copper' },
    ],
    coefficients: [1, 1, 1, 1],
    displayEquation: 'Zn + Cu²⁺ → Zn²⁺ + Cu',
  },
  {
    id: 'eq_015',
    type: 'single_displacement',
    difficulty: 'medium',
    reactants: [
      { formula: 'Cl₂', name: 'chlorine' },
      { formula: 'KBr', name: 'potassium bromide' },
    ],
    products: [
      { formula: 'KCl', name: 'potassium chloride' },
      { formula: 'Br₂', name: 'bromine' },
    ],
    coefficients: [1, 2, 2, 1],
    displayEquation: 'Cl₂ + KBr → KCl + Br₂',
  },
  // Double Displacement Reactions
  {
    id: 'eq_016',
    type: 'double_displacement',
    difficulty: 'easy',
    reactants: [
      { formula: 'AgNO₃', name: 'silver nitrate' },
      { formula: 'NaCl', name: 'sodium chloride' },
    ],
    products: [
      { formula: 'AgCl', name: 'silver chloride' },
      { formula: 'NaNO₃', name: 'sodium nitrate' },
    ],
    coefficients: [1, 1, 1, 1],
    displayEquation: 'AgNO₃ + NaCl → AgCl + NaNO₃',
  },
  {
    id: 'eq_017',
    type: 'double_displacement',
    difficulty: 'easy',
    reactants: [
      { formula: 'HCl', name: 'hydrochloric acid' },
      { formula: 'NaOH', name: 'sodium hydroxide' },
    ],
    products: [
      { formula: 'NaCl', name: 'sodium chloride' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [1, 1, 1, 1],
    displayEquation: 'HCl + NaOH → NaCl + H₂O',
  },
  {
    id: 'eq_018',
    type: 'double_displacement',
    difficulty: 'medium',
    reactants: [
      { formula: 'Ba(NO₃)₂', name: 'barium nitrate' },
      { formula: 'K₂SO₄', name: 'potassium sulfate' },
    ],
    products: [
      { formula: 'BaSO₄', name: 'barium sulfate' },
      { formula: 'KNO₃', name: 'potassium nitrate' },
    ],
    coefficients: [1, 1, 1, 2],
    displayEquation: 'Ba(NO₃)₂ + K₂SO₄ → BaSO₄ + KNO₃',
  },
  // Redox Reactions
  {
    id: 'eq_019',
    type: 'redox',
    difficulty: 'medium',
    reactants: [
      { formula: 'Cu', name: 'copper' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    products: [{ formula: 'CuO', name: 'copper oxide' }],
    coefficients: [4, 1, 2],
    displayEquation: 'Cu + O₂ → CuO',
  },
  {
    id: 'eq_020',
    type: 'redox',
    difficulty: 'hard',
    reactants: [
      { formula: 'KMnO₄', name: 'potassium permanganate' },
      { formula: 'H₂C₂O₄', name: 'oxalic acid' },
      { formula: 'H₂SO₄', name: 'sulfuric acid' },
    ],
    products: [
      { formula: 'K₂SO₄', name: 'potassium sulfate' },
      { formula: 'MnSO₄', name: 'manganese sulfate' },
      { formula: 'CO₂', name: 'carbon dioxide' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [2, 5, 3, 1, 2, 10, 8],
    displayEquation: 'KMnO₄ + H₂C₂O₄ + H₂SO₄ → K₂SO₄ + MnSO₄ + CO₂ + H₂O',
  },
  // Acid-Base Reactions
  {
    id: 'eq_021',
    type: 'acid_base',
    difficulty: 'easy',
    reactants: [
      { formula: 'H₂SO₄', name: 'sulfuric acid' },
      { formula: 'NaOH', name: 'sodium hydroxide' },
    ],
    products: [
      { formula: 'Na₂SO₄', name: 'sodium sulfate' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [1, 2, 1, 2],
    displayEquation: 'H₂SO₄ + NaOH → Na₂SO₄ + H₂O',
  },
  {
    id: 'eq_022',
    type: 'acid_base',
    difficulty: 'easy',
    reactants: [
      { formula: 'HNO₃', name: 'nitric acid' },
      { formula: 'KOH', name: 'potassium hydroxide' },
    ],
    products: [
      { formula: 'KNO₃', name: 'potassium nitrate' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [1, 1, 1, 1],
    displayEquation: 'HNO₃ + KOH → KNO₃ + H₂O',
  },
  {
    id: 'eq_023',
    type: 'acid_base',
    difficulty: 'medium',
    reactants: [
      { formula: 'H₃PO₄', name: 'phosphoric acid' },
      { formula: 'Ca(OH)₂', name: 'calcium hydroxide' },
    ],
    products: [
      { formula: 'Ca₃(PO₄)₂', name: 'calcium phosphate' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [2, 3, 1, 6],
    displayEquation: 'H₃PO₄ + Ca(OH)₂ → Ca₃(PO₄)₂ + H₂O',
  },
  // Photosynthesis and Respiration
  {
    id: 'eq_024',
    type: 'biological',
    difficulty: 'hard',
    reactants: [
      { formula: 'CO₂', name: 'carbon dioxide' },
      { formula: 'H₂O', name: 'water' },
    ],
    products: [
      { formula: 'C₆H₁₂O₆', name: 'glucose' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    coefficients: [6, 6, 1, 6],
    displayEquation: 'CO₂ + H₂O → C₆H₁₂O₆ + O₂',
  },
  {
    id: 'eq_025',
    type: 'biological',
    difficulty: 'hard',
    reactants: [
      { formula: 'C₆H₁₂O₆', name: 'glucose' },
      { formula: 'O₂', name: 'oxygen' },
    ],
    products: [
      { formula: 'CO₂', name: 'carbon dioxide' },
      { formula: 'H₂O', name: 'water' },
    ],
    coefficients: [1, 6, 6, 6],
    displayEquation: 'C₆H₁₂O₆ + O₂ → CO₂ + H₂O',
  },
];

// Assign to window for global access
window.SCIENCE_CHEMISTRY_EQUATIONS = SCIENCE_CHEMISTRY_EQUATIONS;
