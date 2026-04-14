'use strict';

/**
 * Immutable GED exam blueprints keyed by subject.
 *
 * Every slot has:
 *   slotId           – unique within the plan
 *   section          – section name (for multi-part exams: part1/part2/part3)
 *   category         – GED content area
 *   stimulusType     – 'passage' | 'image' | 'chart' | 'table' | 'diagram' | 'data' | 'standalone' | 'passage/data'
 *   difficulty       – 'easy' | 'medium' | 'hard'
 *   responseType     – 'single_select' | 'multi_select' | 'numeric' | 'fill_in' | 'inline_dropdown' | 'sentence_rewrite' | 'placement' | 'drag_drop' | 'essay'
 *   calculatorAllowed – boolean (Math only)
 *   questionsNeeded  – number of questions this slot expects
 *   sourcePriority   – ordered list of fill strategies: 'bank' | 'template' | 'ai'
 *   allowMultiSelect – whether multi-select is permitted for this slot
 *   numeracy         – whether this is a numeracy item (Science)
 *   group            – optional group key to keep stimulus-linked items together
 *   preferCuratedAiBank – when true, bank fills should prefer curated AI-bank items before premade bank items
 *   skillIntent      – optional cognitive task tag (Science): 'passage-comprehension' | 'graph-interpretation' |
 *                      'data-table-calculation' | 'experimental-design' | 'formula-application' |
 *                      'inheritance-probability' | 'evidence-tradeoff' | 'dropdown-cloze' | 'concept-application'
 */

// ── Helpers ──────────────────────────────────────────────────────────

let _slotCounter = 0;
function resetSlotCounter() {
  _slotCounter = 0;
}
function nextSlotId(prefix) {
  return `${prefix}_${++_slotCounter}`;
}

function passageSlot(
  prefix,
  category,
  difficulty,
  questionsNeeded,
  extra = {}
) {
  return {
    slotId: nextSlotId(prefix),
    section: extra.section || 'main',
    category,
    stimulusType: extra.stimulusType || 'passage',
    difficulty,
    responseType: extra.responseType || 'single_select',
    calculatorAllowed: extra.calculatorAllowed ?? null,
    questionsNeeded,
    sourcePriority: extra.sourcePriority || ['bank', 'template', 'ai'],
    allowMultiSelect: extra.allowMultiSelect || false,
    numeracy: extra.numeracy || false,
    group: extra.group || null,
    toolsAllowed: extra.toolsAllowed || null,
    skillIntent: extra.skillIntent || null,
  };
}

function imageSlot(prefix, category, difficulty, questionsNeeded, extra = {}) {
  return {
    slotId: nextSlotId(prefix),
    section: extra.section || 'main',
    category,
    stimulusType: extra.stimulusType || 'image',
    difficulty,
    responseType: extra.responseType || 'single_select',
    calculatorAllowed: extra.calculatorAllowed ?? null,
    questionsNeeded,
    sourcePriority: extra.sourcePriority || ['bank', 'template', 'ai'],
    allowMultiSelect: extra.allowMultiSelect || false,
    numeracy: extra.numeracy || false,
    group: extra.group || null,
    toolsAllowed: extra.toolsAllowed || null,
    skillIntent: extra.skillIntent || null,
  };
}

function standaloneSlot(
  prefix,
  category,
  difficulty,
  questionsNeeded,
  extra = {}
) {
  return {
    slotId: nextSlotId(prefix),
    section: extra.section || 'main',
    category,
    stimulusType: 'standalone',
    difficulty,
    responseType: extra.responseType || 'single_select',
    calculatorAllowed: extra.calculatorAllowed ?? null,
    questionsNeeded,
    sourcePriority: extra.sourcePriority || ['bank', 'template', 'ai'],
    allowMultiSelect: extra.allowMultiSelect || false,
    numeracy: extra.numeracy || false,
    group: extra.group || null,
    toolsAllowed: extra.toolsAllowed || null,
    skillIntent: extra.skillIntent || null,
    requireFigure: extra.requireFigure ?? null,
  };
}

// ── ~40% Curated AI Bank Preferred / ~60% AI Split ──────────────────
// Routes about 40% of comprehensive questions through the bank path,
// but prefers curated AI-bank items ahead of premade bank items on
// those slots. Remaining slots stay AI-first, which raises curated
// AI-bank coverage without removing the existing fallback chain.

/**
 * Apply bank/AI source priority split across plan slots.
 *
 * @param {Array} slots — mutable array of slot definitions
 * @param {Object} [options]
 * @param {number} [options.bankPct=0.40]  — target fraction for bank-routed slots
 * @param {boolean} [options.preferCuratedAiBank=true] — prefer curated AI-bank items on bank-routed slots
 * @param {boolean} [options.forceEssayAI=true] — always use AI for essay slots
 * @param {string[]} [options.bankGroups]  — specific group keys forced to bank
 * @returns {{ bankCount: number, aiCount: number }}
 */
function applyBankAiSplit(slots, options = {}) {
  const {
    bankPct = 0.4,
    forceEssayAI = true,
    bankGroups = null,
    preferCuratedAiBank = true,
  } = options;
  const totalQ = slots.reduce((s, sl) => s + sl.questionsNeeded, 0);
  const bankTarget = Math.round(totalQ * bankPct);

  const bankIndices = new Set();
  let bankCount = 0;

  // 1. If specific groups are designated as bank, mark all their slots first
  if (bankGroups && bankGroups.length) {
    for (let i = 0; i < slots.length; i++) {
      if (bankGroups.includes(slots[i].group)) {
        bankIndices.add(i);
        bankCount += slots[i].questionsNeeded;
      }
    }
  }

  // 2. Fill remaining bank budget with the most bank-suitable individual slots
  if (bankCount < bankTarget) {
    const scored = slots
      .map((slot, idx) => {
        if (bankIndices.has(idx))
          return { idx, score: -1000, q: slot.questionsNeeded };
        let score = 0;
        if (slot.stimulusType === 'standalone') score += 10;
        if (slot.difficulty === 'easy') score += 3;
        else if (slot.difficulty === 'medium') score += 1;
        if (slot.stimulusType === 'passage' && slot.questionsNeeded <= 2)
          score += 2;
        if (slot.responseType === 'essay') score = -1000;
        return { idx, score, q: slot.questionsNeeded };
      })
      .sort((a, b) => b.score - a.score);

    for (const { idx, score, q } of scored) {
      if (bankCount >= bankTarget) break;
      if (score <= -1000) continue;
      bankIndices.add(idx);
      bankCount += q;
    }
  }

  // 3. Write source priorities into each slot
  for (let i = 0; i < slots.length; i++) {
    if (forceEssayAI && slots[i].responseType === 'essay') {
      slots[i] = { ...slots[i], sourcePriority: ['ai', 'bank'] };
    } else if (bankIndices.has(i)) {
      slots[i] = {
        ...slots[i],
        sourcePriority: ['bank', 'template', 'ai'],
        preferCuratedAiBank,
      };
    } else {
      // For AI-designated slots: respect existing template-first if set
      const current = slots[i].sourcePriority;
      if (current && current[0] === 'template') {
        slots[i] = {
          ...slots[i],
          sourcePriority: ['template', 'ai', 'bank'],
        };
      } else {
        slots[i] = {
          ...slots[i],
          sourcePriority: ['ai', 'template', 'bank'],
        };
      }
    }
  }

  return { bankCount, aiCount: totalQ - bankCount };
}

// ── Difficulty distributors ──────────────────────────────────────────

function distributeDifficulty(count, easyPct, medPct) {
  const easy = Math.round(count * easyPct);
  const hard = Math.round(count * (1 - easyPct - medPct));
  const medium = count - easy - hard;
  return { easy, medium, hard };
}

function assignDifficulties(items, dist) {
  let idx = 0;
  for (let i = 0; i < dist.easy && idx < items.length; i++)
    items[idx++].difficulty = 'easy';
  for (let i = 0; i < dist.medium && idx < items.length; i++)
    items[idx++].difficulty = 'medium';
  for (let i = 0; i < dist.hard && idx < items.length; i++)
    items[idx++].difficulty = 'hard';
}

// ═══════════════════════════════════════════════════════════════════════
//  SOCIAL STUDIES  —  30 questions
//  Modeled after GED Ready® format: heavy on primary-source passages,
//  data interpretation (tables/graphs/timelines), dual-source
//  comparison, scenario/application, and 1-2 multi-select items.
// ═══════════════════════════════════════════════════════════════════════

function buildSocialStudiesPlan() {
  resetSlotCounter();
  const P = 'ss';
  const slots = [];

  // Category counts: Civics 16, History 7, Economics 4, Geography 3  = 30
  // Stimulus mix (GED Ready style):
  //   passage: 18   (primary source excerpts, speeches, constitutional text)
  //   image:    5   (charts, graphs, maps, photos)
  //   standalone: 7 (scenario/application, knowledge recall)
  // Includes: 2 dual-source comparison, 4 data-interpretation, 1 multi-select

  // --- Civics & Government: 16 questions ---
  // 4 passage groups × 2q = 8 passage questions (primary sources, amendments, speeches)
  slots.push(
    passageSlot(P, 'Civics & Government', 'easy', 2, { group: 'civ_passage_1' })
  );
  slots.push(
    passageSlot(P, 'Civics & Government', 'medium', 2, {
      group: 'civ_passage_2',
    })
  );
  slots.push(
    passageSlot(P, 'Civics & Government', 'medium', 2, {
      group: 'civ_passage_3',
    })
  );
  slots.push(
    passageSlot(P, 'Civics & Government', 'hard', 2, { group: 'civ_passage_4' })
  );
  // 1 dual-source comparison passage group (2 opposing excerpts → 1 question)
  slots.push(
    passageSlot(P, 'Civics & Government', 'hard', 1, {
      group: 'civ_dual_source_1',
      skillIntent: 'dual-source-comparison',
    })
  );
  // 1 multi-select slot (e.g., identify which 1st Amendment rights apply)
  slots.push(
    standaloneSlot(P, 'Civics & Government', 'medium', 1, {
      responseType: 'multi_select',
      allowMultiSelect: true,
    })
  );
  // Images: 2 image slots (graph, political cartoon, etc.)
  slots.push(imageSlot(P, 'Civics & Government', 'medium', 1));
  slots.push(imageSlot(P, 'Civics & Government', 'hard', 1));
  // Standalone: 16 - 9(passage) - 1(multi) - 2(image) = 4
  slots.push(standaloneSlot(P, 'Civics & Government', 'easy', 1));
  slots.push(standaloneSlot(P, 'Civics & Government', 'easy', 1));
  slots.push(standaloneSlot(P, 'Civics & Government', 'medium', 1));
  slots.push(standaloneSlot(P, 'Civics & Government', 'medium', 1));

  // --- U.S. History: 7 questions ---
  // 2 passage groups × 2q = 4 passage questions (Jim Crow, Eisenhower, etc.)
  slots.push(
    passageSlot(P, 'U.S. History', 'medium', 2, { group: 'hist_passage_1' })
  );
  slots.push(
    passageSlot(P, 'U.S. History', 'hard', 2, { group: 'hist_passage_2' })
  );
  // 1 data-interpretation slot (timeline, table)
  slots.push(
    imageSlot(P, 'U.S. History', 'medium', 1, {
      skillIntent: 'data-interpretation',
    })
  );
  // 1 image slot (historical photo, map)
  slots.push(imageSlot(P, 'U.S. History', 'hard', 1));
  // 1 standalone
  slots.push(standaloneSlot(P, 'U.S. History', 'easy', 1));

  // --- Economics: 4 questions ---
  // 1 passage group × 2q = 2 (policy debates, financial reform)
  slots.push(
    passageSlot(P, 'Economics', 'medium', 2, {
      group: 'econ_passage_1',
      skillIntent: 'dual-source-comparison',
    })
  );
  // 1 data-interpretation (table or graph)
  slots.push(
    imageSlot(P, 'Economics', 'hard', 1, {
      skillIntent: 'data-interpretation',
    })
  );
  // 1 scenario/application standalone
  slots.push(standaloneSlot(P, 'Economics', 'medium', 1));

  // --- Geography & the World: 3 questions ---
  // 1 passage group × 2q = 2 (ancient democracy, world governance)
  slots.push(
    passageSlot(P, 'Geography & the World', 'medium', 2, {
      group: 'geo_passage_1',
    })
  );
  // 1 standalone
  slots.push(standaloneSlot(P, 'Geography & the World', 'hard', 1));

  // Verify totals
  const totalQ = slots.reduce((s, sl) => s + sl.questionsNeeded, 0);
  // totalQ should be 30

  // Tally stimulus types
  const passageQ = slots
    .filter((s) => s.stimulusType === 'passage')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  const imageQ = slots
    .filter((s) => s.stimulusType === 'image')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  const standaloneQ = slots
    .filter((s) => s.stimulusType === 'standalone')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);

  // Difficulty distribution: easy=7, medium=15, hard=8
  const diffCounts = { easy: 0, medium: 0, hard: 0 };
  for (const s of slots) {
    diffCounts[s.difficulty] =
      (diffCounts[s.difficulty] || 0) + s.questionsNeeded;
  }

  // Apply ~40% curated-AI-bank-preferred / ~60% AI split (12 bank-routed, 18 AI-routed)
  const bankAiSplit = applyBankAiSplit(slots);

  return {
    subject: 'Social Studies',
    type: 'single-part',
    totalQuestions: 30,
    invariants: {
      totalQuestions: 30,
      categories: {
        'Civics & Government': 16,
        'U.S. History': 7,
        Economics: 4,
        'Geography & the World': 3,
      },
      stimulus: { passage: passageQ, image: imageQ, standalone: standaloneQ },
      difficulty: { easy: 7, medium: 15, hard: 8 },
    },
    slots,
    computed: {
      totalQ,
      passageQ,
      imageQ,
      standaloneQ,
      diffCounts,
      bankAiSplit,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════
//  SCIENCE  —  38 questions
// ═══════════════════════════════════════════════════════════════════════

function buildSciencePlan() {
  resetSlotCounter();
  const P = 'sci';
  const slots = [];
  const templateFirst = ['template', 'bank', 'ai'];

  // ─── Redesigned Science Comprehensive ─────────────────────────────
  // 38 questions: Life 15 · Physical 15 · Earth & Space 8
  // Stimulus mix (comprehension-first):
  //   passage/data ≈ 14   chart/table/diagram ≈ 12   standalone ≈ 12
  // Numeracy minimum: 13
  // Genetics questions tagged with toolsAllowed: ['punnett-square']

  // ── Life Science: 15 questions ────────────────────────────────────
  // 3 passage groups × 2q = 6 (one for genetics)
  slots.push(
    passageSlot(P, 'Life Science', 'easy', 2, {
      group: 'life_p1',
      stimulusType: 'passage/data',
      skillIntent: 'passage-comprehension',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    passageSlot(P, 'Life Science', 'medium', 2, {
      group: 'life_p2',
      stimulusType: 'passage/data',
      skillIntent: 'passage-comprehension',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    passageSlot(P, 'Life Science', 'medium', 1, {
      group: 'life_genetics',
      stimulusType: 'passage/data',
      skillIntent: 'inheritance-probability',
      toolsAllowed: ['punnett-square'],
      sourcePriority: templateFirst,
    })
  );
  // 2 chart/table slots × 2q = 4
  slots.push(
    imageSlot(P, 'Life Science', 'medium', 2, {
      stimulusType: 'chart',
      group: 'life_chart1',
      skillIntent: 'graph-interpretation',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    imageSlot(P, 'Life Science', 'hard', 2, {
      stimulusType: 'table',
      group: 'life_table1',
      skillIntent: 'data-table-calculation',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 1 additional curated image + 2 standalone
  slots.push(
    imageSlot(P, 'Life Science', 'medium', 1, {
      stimulusType: 'image',
      group: 'life_image1',
      skillIntent: 'graph-interpretation',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    standaloneSlot(P, 'Life Science', 'easy', 1, {
      skillIntent: 'experimental-design',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    standaloneSlot(P, 'Life Science', 'easy', 1, {
      skillIntent: 'concept-application',
    })
  );
  slots.push(
    standaloneSlot(P, 'Life Science', 'medium', 1, {
      skillIntent: 'concept-application',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 1 evidence-tradeoff passage (repurposed from generic literacy)
  slots.push(
    passageSlot(P, 'Life Science', 'medium', 2, {
      group: 'life_literacy',
      stimulusType: 'passage/data',
      skillIntent: 'evidence-tradeoff',
      sourcePriority: templateFirst,
    })
  );

  // ── Physical Science: 15 questions ────────────────────────────────
  // 3 passage groups × 2q = 6
  slots.push(
    passageSlot(P, 'Physical Science', 'medium', 2, {
      group: 'phys_p1',
      stimulusType: 'passage/data',
      skillIntent: 'passage-comprehension',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    passageSlot(P, 'Physical Science', 'hard', 2, {
      group: 'phys_p2',
      stimulusType: 'passage/data',
      skillIntent: 'experimental-design',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    passageSlot(P, 'Physical Science', 'medium', 2, {
      group: 'phys_p3',
      stimulusType: 'passage/data',
      skillIntent: 'formula-application',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 3 chart/table slots: 2×2q + 1×1q = 5
  slots.push(
    imageSlot(P, 'Physical Science', 'medium', 2, {
      stimulusType: 'chart',
      group: 'phys_table1',
      skillIntent: 'data-table-calculation',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    imageSlot(P, 'Physical Science', 'hard', 2, {
      stimulusType: 'chart',
      group: 'phys_chart1',
      skillIntent: 'graph-interpretation',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    imageSlot(P, 'Physical Science', 'medium', 1, {
      stimulusType: 'image',
      group: 'phys_image1',
      skillIntent: 'graph-interpretation',
      sourcePriority: templateFirst,
    })
  );
  // 2 standalone (numeracy-heavy for Physical)
  slots.push(
    standaloneSlot(P, 'Physical Science', 'easy', 1, {
      skillIntent: 'concept-application',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    standaloneSlot(P, 'Physical Science', 'medium', 1, {
      skillIntent: 'dropdown-cloze',
      responseType: 'inline_dropdown',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 2 chemistry balancing (planned slots)
  slots.push(
    standaloneSlot(P, 'Physical Science', 'medium', 1, {
      skillIntent: 'formula-application',
      numeracy: true,
      group: 'chem_balance',
      sourcePriority: ['template', 'bank', 'ai'],
    })
  );
  slots.push(
    standaloneSlot(P, 'Physical Science', 'hard', 1, {
      skillIntent: 'formula-application',
      numeracy: true,
      group: 'chem_balance',
      sourcePriority: ['template', 'bank', 'ai'],
    })
  );

  // ── Earth & Space Science: 8 questions ────────────────────────────
  // 1 passage group × 2q = 2 (evidence-tradeoff: competing claims about Earth systems)
  slots.push(
    passageSlot(P, 'Earth & Space Science', 'medium', 2, {
      group: 'earth_p1',
      stimulusType: 'passage/data',
      skillIntent: 'evidence-tradeoff',
      sourcePriority: templateFirst,
    })
  );
  // 1 diagram question + 1 chart slot worth 3 questions = 4
  slots.push(
    imageSlot(P, 'Earth & Space Science', 'easy', 1, {
      stimulusType: 'diagram',
      group: 'earth_diag1',
      skillIntent: 'graph-interpretation',
    })
  );
  slots.push(
    imageSlot(P, 'Earth & Space Science', 'medium', 2, {
      stimulusType: 'chart',
      group: 'earth_chart1',
      skillIntent: 'data-table-calculation',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    imageSlot(P, 'Earth & Space Science', 'medium', 1, {
      stimulusType: 'chart',
      group: 'earth_chart2',
      skillIntent: 'data-table-calculation',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 2 standalone
  slots.push(
    standaloneSlot(P, 'Earth & Space Science', 'easy', 1, {
      skillIntent: 'concept-application',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    standaloneSlot(P, 'Earth & Space Science', 'medium', 1, {
      skillIntent: 'experimental-design',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );

  const totalQ = slots.reduce((s, sl) => s + sl.questionsNeeded, 0);
  const numeracySlots = slots
    .filter((s) => s.numeracy)
    .reduce((s, sl) => s + sl.questionsNeeded, 0);

  // Apply ~40% curated-AI-bank-preferred / ~60% AI split (15 bank-routed, 23 AI-routed)
  const bankAiSplit = applyBankAiSplit(slots);

  return {
    subject: 'Science',
    type: 'single-part',
    totalQuestions: 38,
    invariants: {
      totalQuestions: 38,
      categories: {
        'Life Science': 15,
        'Physical Science': 15,
        'Earth & Space Science': 8,
      },
      stimulus: {
        'passage/data': 16,
        'chart/table/diagram': 13,
        standalone: 9,
      },
      difficulty: { easy: 9, medium: 19, hard: 10 },
      numeracyMinimum: 13,
      skillIntentMinimums: {
        'experimental-design': 2,
        'evidence-tradeoff': 2,
        'data-table-calculation': 3,
        'graph-interpretation': 3,
        'formula-application': 2,
        'inheritance-probability': 1,
      },
    },
    slots,
    computed: { totalQ, numeracySlots, bankAiSplit },
  };
}

// ═══════════════════════════════════════════════════════════════════════
//  RLA  —  multi-part: 20 + essay + 25
// ═══════════════════════════════════════════════════════════════════════

function buildRlaPlan() {
  resetSlotCounter();
  const P = 'rla';
  const slots = [];

  // --- Part 1: Reading (20 questions across 4 passage groups) ---
  // 2 informational + 1 paired argumentative + 1 literary group, 5 questions each
  const readingPassages = [
    { group: 'rla_read_info1', type: 'informational' },
    { group: 'rla_read_info2', type: 'informational' },
    { group: 'rla_read_paired1', type: 'paired_argument' },
    { group: 'rla_read_lit1', type: 'literary' },
  ];
  for (const pg of readingPassages) {
    slots.push(
      passageSlot(P, 'Reading Comprehension', 'easy', 1, {
        section: 'part1_reading',
        group: pg.group,
        responseType: 'single_select',
      })
    );
    slots.push(
      passageSlot(P, 'Reading Comprehension', 'medium', 2, {
        section: 'part1_reading',
        group: pg.group,
        responseType: 'single_select',
      })
    );
    slots.push(
      passageSlot(P, 'Reading Comprehension', 'medium', 1, {
        section: 'part1_reading',
        group: pg.group,
        allowMultiSelect: true,
        responseType: 'multi_select',
      })
    );
    slots.push(
      passageSlot(P, 'Reading Comprehension', 'hard', 1, {
        section: 'part1_reading',
        group: pg.group,
        responseType: 'single_select',
      })
    );
  }

  // --- Part 2: Essay (1 essay package with 2 opposing passages) ---
  slots.push({
    slotId: nextSlotId(P),
    section: 'part2_essay',
    category: 'Extended Response',
    stimulusType: 'passage',
    difficulty: 'hard',
    responseType: 'essay',
    calculatorAllowed: null,
    questionsNeeded: 1,
    sourcePriority: ['ai', 'bank'],
    allowMultiSelect: false,
    numeracy: false,
    group: 'rla_essay',
  });

  // --- Part 3: Language & Grammar (25 questions across 7 documents) ---
  // 7 docs, mix of 3-4 questions each → 3+4+3+4+4+4+3 = 25
  const langDocs = [
    { group: 'rla_lang_doc1', count: 3 },
    { group: 'rla_lang_doc2', count: 4 },
    { group: 'rla_lang_doc3', count: 3 },
    { group: 'rla_lang_doc4', count: 4 },
    { group: 'rla_lang_doc5', count: 4 },
    { group: 'rla_lang_doc6', count: 4 },
    { group: 'rla_lang_doc7', count: 3 },
  ];
  const langResponseTypes = [
    'single_select',
    'inline_dropdown',
    'sentence_rewrite',
    'placement',
  ];
  let langIdx = 0;
  for (const doc of langDocs) {
    for (let i = 0; i < doc.count; i++) {
      const diff = i === 0 ? 'easy' : i < doc.count - 1 ? 'medium' : 'hard';
      slots.push(
        passageSlot(P, 'Language Arts', diff, 1, {
          section: 'part3_language',
          group: doc.group,
          responseType: langResponseTypes[langIdx % langResponseTypes.length],
        })
      );
      langIdx++;
    }
  }

  const totalReading = slots
    .filter((s) => s.section === 'part1_reading')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  const totalEssay = slots
    .filter((s) => s.section === 'part2_essay')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  const totalLanguage = slots
    .filter((s) => s.section === 'part3_language')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);

  // Apply ~40% curated-AI-bank-preferred / ~60% AI split.
  // Designate 1 reading passage group + 3 language doc groups, then fill to ~18 bank-routed questions.
  // Essay always uses AI.
  const bankAiSplit = applyBankAiSplit(slots, {
    bankGroups: [
      'rla_read_info1',
      'rla_lang_doc1',
      'rla_lang_doc3',
      'rla_lang_doc7',
    ],
  });

  return {
    subject: 'RLA',
    type: 'multi-part-rla',
    totalQuestions: 46, // 20 + 1 essay + 25
    invariants: {
      part1_reading: 20,
      part2_essay: 1,
      part3_language: 25,
      totalMCQuestions: 45,
    },
    slots,
    computed: { totalReading, totalEssay, totalLanguage, bankAiSplit },
  };
}

// ═══════════════════════════════════════════════════════════════════════
//  MATH  —  multi-part: 5 non-calculator + 41 calculator = 46
// ═══════════════════════════════════════════════════════════════════════

function buildMathPlan() {
  resetSlotCounter();
  const P = 'math';
  const slots = [];

  // --- Part 1: Non-Calculator (5 questions) ---
  const nonCalcCategories = [
    'Number Operations',
    'Number Operations',
    'Expressions & Equations',
    'Expressions & Equations',
    'Quantitative Reasoning',
  ];
  const nonCalcDiffs = ['easy', 'medium', 'medium', 'hard', 'medium'];
  for (let i = 0; i < 5; i++) {
    slots.push(
      standaloneSlot(P, nonCalcCategories[i], nonCalcDiffs[i], 1, {
        section: 'part1_non_calculator',
        calculatorAllowed: false,
      })
    );
  }

  // --- Part 2: Calculator (35 questions) ---
  // GED Ready® composition scaled to 40 total:
  //   ~30% Algebra, ~22% Data Analysis, ~10% each Graphing/Geometry/
  //   Number Ops/Ratios.  Data Analysis includes 3 shared-stimulus
  //   groups of 2 questions each (like GED wind-turbine / art-store
  //   scenarios).
  //
  // Category distribution for Part 2 (31 MC + 4 fill-in/numeric):
  //   Algebra (Expressions, Equations, Inequalities): 10 MC + 1 fill-in = 11
  //   Data Analysis & Probability:                     8 MC + 1 numeric =  9
  //     (includes 3 grouped scenarios × 2 Qs each = 6 grouped MC)
  //   Graphing & Functions:                            3 MC + 1 fill-in =  4
  //   Geometry:                                        4 MC + 1 numeric =  5
  //   Ratios, Proportions, and Percents:               4 MC             =  4
  //   Number Operations:                               2 MC             =  2
  //   Total:                                          31 MC + 4 alt     = 35
  //
  // Difficulty across Part 2: easy≈8, medium≈19, hard≈8

  // Algebra / Expressions, Equations, and Inequalities (10 MC questions)
  for (let i = 0; i < 2; i++)
    slots.push(
      standaloneSlot(P, 'Expressions, Equations, and Inequalities', 'easy', 1, {
        section: 'part2_calculator',
        calculatorAllowed: true,
      })
    );
  for (let i = 0; i < 6; i++)
    slots.push(
      standaloneSlot(
        P,
        'Expressions, Equations, and Inequalities',
        'medium',
        1,
        { section: 'part2_calculator', calculatorAllowed: true }
      )
    );
  for (let i = 0; i < 2; i++)
    slots.push(
      standaloneSlot(P, 'Expressions, Equations, and Inequalities', 'hard', 1, {
        section: 'part2_calculator',
        calculatorAllowed: true,
      })
    );

  // Graphing & Functions (3 MC questions)
  slots.push(
    standaloneSlot(P, 'Graphing & Functions', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );
  slots.push(
    standaloneSlot(P, 'Graphing & Functions', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );
  slots.push(
    standaloneSlot(P, 'Graphing & Functions', 'hard', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );

  // Geometry (4 MC questions — 2 with visual figures, 2 text-only)
  slots.push(
    standaloneSlot(P, 'Geometry', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      requireFigure: true,
    })
  );
  slots.push(
    standaloneSlot(P, 'Geometry', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      requireFigure: true,
    })
  );
  slots.push(
    standaloneSlot(P, 'Geometry', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );
  slots.push(
    standaloneSlot(P, 'Geometry', 'hard', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );

  // Ratios, Proportions, and Percents (4 MC questions)
  slots.push(
    standaloneSlot(P, 'Ratios, Proportions, and Percents', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );
  for (let i = 0; i < 2; i++)
    slots.push(
      standaloneSlot(P, 'Ratios, Proportions, and Percents', 'medium', 1, {
        section: 'part2_calculator',
        calculatorAllowed: true,
      })
    );
  slots.push(
    standaloneSlot(P, 'Ratios, Proportions, and Percents', 'hard', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );

  // Number Operations (2 MC questions in Part 2)
  slots.push(
    standaloneSlot(P, 'Number Operations', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );
  slots.push(
    standaloneSlot(P, 'Number Operations', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );

  // Data Analysis & Probability (8 MC questions)
  // 3 shared-stimulus groups × 2 Qs each = 6 grouped
  // + 2 standalone data questions
  slots.push(
    passageSlot(P, 'Data Analysis & Probability', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      stimulusType: 'passage/data',
      group: 'math_data_scenario_1',
    })
  );
  slots.push(
    passageSlot(P, 'Data Analysis & Probability', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      stimulusType: 'passage/data',
      group: 'math_data_scenario_1',
    })
  );
  slots.push(
    passageSlot(P, 'Data Analysis & Probability', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      stimulusType: 'passage/data',
      group: 'math_data_scenario_2',
    })
  );
  slots.push(
    passageSlot(P, 'Data Analysis & Probability', 'hard', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      stimulusType: 'passage/data',
      group: 'math_data_scenario_2',
    })
  );
  slots.push(
    passageSlot(P, 'Data Analysis & Probability', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      stimulusType: 'passage/data',
      group: 'math_data_scenario_3',
    })
  );
  slots.push(
    passageSlot(P, 'Data Analysis & Probability', 'hard', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      stimulusType: 'passage/data',
      group: 'math_data_scenario_3',
    })
  );
  // 2 standalone data questions
  slots.push(
    standaloneSlot(P, 'Data Analysis & Probability', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );
  slots.push(
    standaloneSlot(P, 'Data Analysis & Probability', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );

  // Fill-in / Numeric Response (4 questions – reduced to match GED ~10%)
  slots.push(
    standaloneSlot(P, 'Expressions, Equations, and Inequalities', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      responseType: 'fill_in',
    })
  );
  slots.push(
    standaloneSlot(P, 'Geometry', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      responseType: 'numeric',
    })
  );
  slots.push(
    standaloneSlot(P, 'Data Analysis & Probability', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      responseType: 'numeric',
    })
  );
  slots.push(
    standaloneSlot(P, 'Graphing & Functions', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      responseType: 'fill_in',
    })
  );

  const totalPart1 = slots
    .filter((s) => s.section === 'part1_non_calculator')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);
  const totalPart2 = slots
    .filter((s) => s.section === 'part2_calculator')
    .reduce((s, sl) => s + sl.questionsNeeded, 0);

  // Apply ~40% curated-AI-bank-preferred / ~60% AI split (16 bank-routed, 24 AI-routed)
  const bankAiSplit = applyBankAiSplit(slots);

  return {
    subject: 'Math',
    type: 'multi-part-math',
    totalQuestions: 40,
    invariants: {
      part1_non_calculator: 5,
      part2_calculator: 35,
      totalQuestions: 40,
      noRandomNumericAssignment: true,
    },
    slots,
    computed: { totalPart1, totalPart2, bankAiSplit },
  };
}

// ═══════════════════════════════════════════════════════════════════════
//  Exports
// ═══════════════════════════════════════════════════════════════════════

module.exports = {
  buildSocialStudiesPlan,
  buildSciencePlan,
  buildRlaPlan,
  buildMathPlan,
};
