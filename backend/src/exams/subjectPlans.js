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
    requireFigure: extra.requireFigure ?? null,
  };
}

// ── 40% Bank / 60% AI Split ─────────────────────────────────────────
// Reduces AI generation load by designating ~40% of questions to be
// pulled from the premade question bank first, while keeping 60% as
// fresh AI-generated content. This makes comprehensives faster and
// more reliable without sacrificing variety.

/**
 * Apply bank/AI source priority split across plan slots.
 *
 * @param {Array} slots — mutable array of slot definitions
 * @param {Object} [options]
 * @param {number} [options.bankPct=0.40]  — target fraction for bank-first slots
 * @param {boolean} [options.forceEssayAI=true] — always use AI for essay slots
 * @param {string[]} [options.bankGroups]  — specific group keys forced to bank
 * @returns {{ bankCount: number, aiCount: number }}
 */
function applyBankAiSplit(slots, options = {}) {
  const { bankPct = 0.4, forceEssayAI = true, bankGroups = null } = options;
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
      slots[i] = { ...slots[i], sourcePriority: ['bank', 'template', 'ai'] };
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
//  SOCIAL STUDIES  —  35 questions
// ═══════════════════════════════════════════════════════════════════════

function buildSocialStudiesPlan() {
  resetSlotCounter();
  const P = 'ss';
  const slots = [];

  // Category counts: Civics 18, History 7, Economics 5, Geography 5
  // Passage: 14 total  (Civics 6, History 4, Econ 2, Geo 2)
  // Image:   10 total  (Civics 4, History 2, Econ 2, Geo 2)
  // Standalone: 11 total (Civics 8, History 1, Econ 1, Geo 1)

  // We build passage groups (each yields multiple questions) plus individual image/standalone slots.

  // --- Civics & Government: 18 questions ---
  // 3 passage groups × 2q = 6 passage questions  (we need 5 passage-type → use groups of mixed size)
  const civicsGroup1 = `civ_passage_1`;
  const civicsGroup2 = `civ_passage_2`;
  const civicsGroup3 = `civ_passage_3`;
  slots.push(
    passageSlot(P, 'Civics & Government', 'easy', 2, { group: civicsGroup1 })
  );
  slots.push(
    passageSlot(P, 'Civics & Government', 'medium', 2, { group: civicsGroup2 })
  );
  slots.push(
    passageSlot(P, 'Civics & Government', 'medium', 2, { group: civicsGroup3 })
  );
  // Images: 4 image slots × 1q each = 4
  slots.push(imageSlot(P, 'Civics & Government', 'easy', 1));
  slots.push(imageSlot(P, 'Civics & Government', 'medium', 1));
  slots.push(imageSlot(P, 'Civics & Government', 'hard', 1));
  slots.push(imageSlot(P, 'Civics & Government', 'medium', 1));
  // Standalone: 8 slots to fill remaining  → 18 - 6(passage) - 4(image) = 8
  for (let i = 0; i < 8; i++) {
    const diff = i < 3 ? 'easy' : i < 7 ? 'medium' : 'hard';
    slots.push(standaloneSlot(P, 'Civics & Government', diff, 1));
  }

  // --- U.S. History: 7 questions ---
  // 2 passage groups × 2q = 4 passage questions
  const histGroup1 = `hist_passage_1`;
  const histGroup2 = `hist_passage_2`;
  slots.push(
    passageSlot(P, 'U.S. History', 'medium', 2, { group: histGroup1 })
  );
  slots.push(passageSlot(P, 'U.S. History', 'hard', 2, { group: histGroup2 }));
  // 2 image slots × 1q
  slots.push(imageSlot(P, 'U.S. History', 'medium', 1));
  slots.push(imageSlot(P, 'U.S. History', 'hard', 1));
  // Standalone: 7 - 4 - 2 = 1
  slots.push(standaloneSlot(P, 'U.S. History', 'easy', 1));

  // --- Economics: 5 questions ---
  // 1 passage group × 2q = 2
  const econGroup1 = `econ_passage_1`;
  slots.push(passageSlot(P, 'Economics', 'medium', 2, { group: econGroup1 }));
  // 2 image slots
  slots.push(imageSlot(P, 'Economics', 'hard', 1));
  slots.push(imageSlot(P, 'Economics', 'medium', 1));
  // Standalone: 5 - 2 - 2 = 1
  slots.push(standaloneSlot(P, 'Economics', 'easy', 1));

  // --- Geography & the World: 5 questions ---
  // 1 passage group × 2q = 2
  const geoGroup1 = `geo_passage_1`;
  slots.push(
    passageSlot(P, 'Geography & the World', 'medium', 2, { group: geoGroup1 })
  );
  // 2 image slots
  slots.push(imageSlot(P, 'Geography & the World', 'easy', 1));
  slots.push(imageSlot(P, 'Geography & the World', 'medium', 1));
  // Standalone: 5 - 2 - 2 = 1
  slots.push(standaloneSlot(P, 'Geography & the World', 'hard', 1));

  // Verify totals
  const totalQ = slots.reduce((s, sl) => s + sl.questionsNeeded, 0);
  // totalQ should be 35

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

  // Adjust difficulty distribution to hit: easy=10, medium=17, hard=8
  const diffCounts = { easy: 0, medium: 0, hard: 0 };
  for (const s of slots) {
    diffCounts[s.difficulty] =
      (diffCounts[s.difficulty] || 0) + s.questionsNeeded;
  }

  // Apply 40% bank / 60% AI split
  const bankAiSplit = applyBankAiSplit(slots);

  return {
    subject: 'Social Studies',
    type: 'single-part',
    totalQuestions: 35,
    invariants: {
      totalQuestions: 35,
      categories: {
        'Civics & Government': 18,
        'U.S. History': 7,
        Economics: 5,
        'Geography & the World': 5,
      },
      stimulus: { passage: 14, image: 10, standalone: 11 },
      difficulty: { easy: 10, medium: 17, hard: 8 },
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
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    passageSlot(P, 'Life Science', 'medium', 2, {
      group: 'life_p2',
      stimulusType: 'passage/data',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    passageSlot(P, 'Life Science', 'medium', 1, {
      group: 'life_genetics',
      stimulusType: 'passage/data',
      toolsAllowed: ['punnett-square'],
      sourcePriority: templateFirst,
    })
  );
  // 2 chart/table slots × 2q = 4
  slots.push(
    imageSlot(P, 'Life Science', 'medium', 2, {
      stimulusType: 'chart',
      group: 'life_chart1',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    imageSlot(P, 'Life Science', 'hard', 2, {
      stimulusType: 'table',
      group: 'life_table1',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 1 additional curated image + 2 standalone
  slots.push(
    imageSlot(P, 'Life Science', 'medium', 1, {
      stimulusType: 'image',
      group: 'life_image1',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    standaloneSlot(P, 'Life Science', 'easy', 1, {
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(standaloneSlot(P, 'Life Science', 'easy', 1));
  slots.push(
    standaloneSlot(P, 'Life Science', 'medium', 1, {
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 1 science literacy passage (planned, not appended)
  slots.push(
    passageSlot(P, 'Life Science', 'medium', 2, {
      group: 'life_literacy',
      stimulusType: 'passage/data',
      sourcePriority: templateFirst,
    })
  );

  // ── Physical Science: 15 questions ────────────────────────────────
  // 3 passage groups × 2q = 6
  slots.push(
    passageSlot(P, 'Physical Science', 'medium', 2, {
      group: 'phys_p1',
      stimulusType: 'passage/data',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    passageSlot(P, 'Physical Science', 'hard', 2, {
      group: 'phys_p2',
      stimulusType: 'passage/data',
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    passageSlot(P, 'Physical Science', 'medium', 2, {
      group: 'phys_p3',
      stimulusType: 'passage/data',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 3 chart/table slots: 2×2q + 1×1q = 5
  slots.push(
    imageSlot(P, 'Physical Science', 'medium', 2, {
      stimulusType: 'chart',
      group: 'phys_table1',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    imageSlot(P, 'Physical Science', 'hard', 2, {
      stimulusType: 'chart',
      group: 'phys_chart1',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    imageSlot(P, 'Physical Science', 'medium', 1, {
      stimulusType: 'image',
      group: 'phys_image1',
      sourcePriority: templateFirst,
    })
  );
  // 2 standalone (numeracy-heavy for Physical)
  slots.push(
    standaloneSlot(P, 'Physical Science', 'easy', 1, {
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    standaloneSlot(P, 'Physical Science', 'medium', 1, {
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 2 chemistry balancing (planned slots)
  slots.push(
    standaloneSlot(P, 'Physical Science', 'medium', 1, {
      numeracy: true,
      group: 'chem_balance',
      sourcePriority: ['template', 'bank', 'ai'],
    })
  );
  slots.push(
    standaloneSlot(P, 'Physical Science', 'hard', 1, {
      numeracy: true,
      group: 'chem_balance',
      sourcePriority: ['template', 'bank', 'ai'],
    })
  );

  // ── Earth & Space Science: 8 questions ────────────────────────────
  // 1 passage group × 2q = 2
  slots.push(
    passageSlot(P, 'Earth & Space Science', 'medium', 2, {
      group: 'earth_p1',
      stimulusType: 'passage/data',
      sourcePriority: templateFirst,
    })
  );
  // 1 diagram question + 1 chart slot worth 3 questions = 4
  slots.push(
    imageSlot(P, 'Earth & Space Science', 'easy', 1, {
      stimulusType: 'diagram',
      group: 'earth_diag1',
    })
  );
  slots.push(
    imageSlot(P, 'Earth & Space Science', 'medium', 2, {
      stimulusType: 'chart',
      group: 'earth_chart1',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    imageSlot(P, 'Earth & Space Science', 'medium', 1, {
      stimulusType: 'chart',
      group: 'earth_chart2',
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  // 2 standalone
  slots.push(
    standaloneSlot(P, 'Earth & Space Science', 'easy', 1, {
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );
  slots.push(
    standaloneSlot(P, 'Earth & Space Science', 'medium', 1, {
      numeracy: true,
      sourcePriority: templateFirst,
    })
  );

  const totalQ = slots.reduce((s, sl) => s + sl.questionsNeeded, 0);
  const numeracySlots = slots
    .filter((s) => s.numeracy)
    .reduce((s, sl) => s + sl.questionsNeeded, 0);

  // Apply 40% bank / 60% AI split
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

  // --- Part 1: Reading (20 questions across 4 passages) ---
  // 3 informational + 1 literary passage, 5 questions each
  const readingPassages = [
    { group: 'rla_read_info1', type: 'informational' },
    { group: 'rla_read_info2', type: 'informational' },
    { group: 'rla_read_info3', type: 'informational' },
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

  // Apply 40% bank / 60% AI split.
  // Designate reading passage groups + language doc groups.
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

  // --- Part 2: Calculator (41 questions) ---
  // GED Math is ~55% Algebraic Reasoning. Distribute to reflect that.
  //
  // Category distribution for Part 2 (33 MC + 8 fill-in/numeric):
  //   Algebra (Expressions, Equations, Inequalities): 15 MC + 3 fill-in = 18
  //   Graphing & Functions:                             5 MC + 1 fill-in =  6
  //   Geometry:                                         5 MC + 1 numeric =  6
  //   Ratios, Proportions, and Percents:                4 MC + 1 fill-in =  5
  //   Data Analysis & Probability:                      4 MC + 1 numeric =  5
  //   Number Operations (fill-in only):                                    1
  //   Total:                                           33 MC + 8 alt     = 41
  //
  // Difficulty: easy=10, medium=22, hard=9

  // Algebra / Expressions, Equations, and Inequalities (15 MC questions)
  for (let i = 0; i < 4; i++)
    slots.push(
      standaloneSlot(P, 'Expressions, Equations, and Inequalities', 'easy', 1, {
        section: 'part2_calculator',
        calculatorAllowed: true,
      })
    );
  for (let i = 0; i < 8; i++)
    slots.push(
      standaloneSlot(
        P,
        'Expressions, Equations, and Inequalities',
        'medium',
        1,
        { section: 'part2_calculator', calculatorAllowed: true }
      )
    );
  for (let i = 0; i < 3; i++)
    slots.push(
      standaloneSlot(P, 'Expressions, Equations, and Inequalities', 'hard', 1, {
        section: 'part2_calculator',
        calculatorAllowed: true,
      })
    );

  // Graphing & Functions (5 MC questions)
  slots.push(
    standaloneSlot(P, 'Graphing & Functions', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );
  for (let i = 0; i < 3; i++)
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

  // Geometry (5 MC questions — 3 with visual figures, 2 text-only word problems)
  slots.push(
    standaloneSlot(P, 'Geometry', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      requireFigure: true,
    })
  );
  for (let i = 0; i < 2; i++)
    slots.push(
      standaloneSlot(P, 'Geometry', 'medium', 1, {
        section: 'part2_calculator',
        calculatorAllowed: true,
        requireFigure: i === 0,
      })
    );
  for (let i = 0; i < 2; i++)
    slots.push(
      standaloneSlot(P, 'Geometry', 'hard', 1, {
        section: 'part2_calculator',
        calculatorAllowed: true,
        requireFigure: i === 0,
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

  // Data Analysis & Probability (4 MC questions – some with data stimulus)
  slots.push(
    passageSlot(P, 'Data Analysis & Probability', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      stimulusType: 'passage/data',
    })
  );
  slots.push(
    passageSlot(P, 'Data Analysis & Probability', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      stimulusType: 'passage/data',
    })
  );
  slots.push(
    standaloneSlot(P, 'Data Analysis & Probability', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );
  slots.push(
    standaloneSlot(P, 'Data Analysis & Probability', 'hard', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
    })
  );

  // Fill-in / Numeric Response (8 questions – distributed across categories)
  slots.push(
    standaloneSlot(P, 'Number Operations', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      responseType: 'numeric',
    })
  );
  slots.push(
    standaloneSlot(P, 'Expressions, Equations, and Inequalities', 'easy', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      responseType: 'fill_in',
    })
  );
  slots.push(
    standaloneSlot(P, 'Expressions, Equations, and Inequalities', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      responseType: 'fill_in',
    })
  );
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
    standaloneSlot(P, 'Ratios, Proportions, and Percents', 'medium', 1, {
      section: 'part2_calculator',
      calculatorAllowed: true,
      responseType: 'fill_in',
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

  // Apply 40% bank / 60% AI split
  const bankAiSplit = applyBankAiSplit(slots);

  return {
    subject: 'Math',
    type: 'multi-part-math',
    totalQuestions: 46,
    invariants: {
      part1_non_calculator: 5,
      part2_calculator: 41,
      totalQuestions: 46,
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
