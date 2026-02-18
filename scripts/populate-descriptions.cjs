/**
 * populate-descriptions.js
 * Writes tier + domain-aware descriptions into every entry of
 * supplemental.topics.json that currently has an empty description.
 *
 * Run:  node scripts/populate-descriptions.js
 */

const fs = require('fs');
const path = require('path');

const TOPICS_FILE = path.join(__dirname, '../backend/data/quizzes/supplemental.topics.json');

// ─── Lookup table: tier × (normalised category) → description ────────────────

const DESCRIPTIONS = {
  // ── MATH ──────────────────────────────────────────────────────────────────
  'Number Sense & Operations': {
    foundations:  'Build confidence with whole numbers, fractions, decimals, and basic arithmetic — the bedrock skills every GED math question assumes you have.',
    core:         'Sharpen your number-sense toolkit: work through multi-step calculations, signed numbers, order of operations, and real-number conversions at GED entry level.',
    'test-ready': 'Apply number skills inside word problems and multi-step scenarios that mirror real GED test items — percent change, proportional reasoning, and unit conversion in context.',
    challenge:    'Tackle GED-level and above: complex multi-step problems with percent, ratio, and number relationships embedded in realistic scenarios. Tight answer choices require full precision.',
  },
  'Algebra & Functions': {
    foundations:  'Practice writing and solving single-step equations and learning algebraic vocabulary — the essential first moves before any GED math problem.',
    core:         'Solve two-step equations, evaluate expressions, and work with basic linear functions. Concepts and difficulty align with the lower range of GED Mathematical Reasoning.',
    'test-ready': 'Multi-step algebra in realistic contexts: word problems involving linear equations, systems, function notation, and inequalities—expect two to three operations per question.',
    challenge:    'GED-level and above: complex equation solving, quadratic expressions, function behavior, and answer traps that punish partial work. Every question requires full algebraic mastery.',
  },
  'Geometry & Measurement': {
    foundations:  'Learn to identify shapes, read basic formulas, and calculate area and perimeter with whole-number dimensions — geometry from the ground up.',
    core:         'Apply the GED formula sheet to two-dimension and three-dimension problems: composite figures, coordinate distance, and unit conversion at a steady working pace.',
    'test-ready': 'Multi-step geometry in context: problems combine multiple formulas, require diagram interpretation, and include coordinate-plane setups matching GED question style.',
    challenge:    'GED-level and above: composite-figure problems, 3-D volume and surface area in applied scenarios, coordinate geometry, and similarity/proportional reasoning under pressure.',
  },
  'Data Analysis & Probability': {
    foundations:  'Read basic graphs, compute mean/median/mode, and understand simple probability — the entry-level data skills tested on the GED.',
    core:         'Interpret tables, bar graphs, and line graphs to answer two-step questions about trends, averages, and basic statistical reasoning.',
    'test-ready': 'Analyse complex data sets and multi-panel graphs. Problems require calculating range, interpreting distributions, and evaluating probability scenarios as on the real GED.',
    challenge:    'GED-level and above: data-heavy scenarios with scatter plots, box-and-whisker displays, conditional probability, and statistical inference. Multiple operations required per question.',
  },
  'Quantitative Problem Solving': {
    foundations:  'Translate plain-English word problems into simple arithmetic or one-step equations — the essential bridge between reading and solving on the GED.',
    core:         'Work through multi-step word problems covering ratios, rates, percents, and basic algebra embedded in everyday contexts.',
    'test-ready': 'Extended quantitative scenarios requiring three or more operations, unit analysis, and careful reading — problem structures closely mirror the GED Mathematical Reasoning section.',
    challenge:    'Complex applied problems demanding synthesis across number sense, algebra, and geometry topics. Expect dense problems with excess information and tight, trap-laden answer choices.',
  },
  'Ratios, Rates & Proportions': {
    foundations:  'Build fluency with ratios, unit rates, and simple proportions — the prerequisite skills for every percent and scaling problem on the GED.',
    core:         'Apply proportional reasoning to two-step problems: percent of a whole, scale factors, rate comparisons, and proportional tables at GED entry level.',
    'test-ready': 'Solve percent change, tax/tip/discount, and multi-step ratio problems in real-world contexts that reflect the GED Mathematical Reasoning item format.',
    challenge:    'GED-level and above: complex proportional reasoning across finance, science, and social-data scenarios; compound percent, combined rates, and ratio chains with tight answer traps.',
  },
  'Graphs & Coordinate Plane': {
    foundations:  'Plot points, read coordinates, and identify slope from a graph — core visual-math skills every GED math question on functions and lines may require.',
    core:         'Graph linear equations, identify intercepts, and interpret slope in context. Problems align with the GED\'s emphasis on connecting equations to their graphs.',
    'test-ready': 'Analyse graphs of linear and non-linear functions, interpret slope as a rate of change in applied settings, and solve problems from coordinate-plane diagrams.',
    challenge:    'GED-level and above: systems of equations interpreted graphically, transformations, non-linear function behaviour, and multi-step coordinate geometry under exam conditions.',
  },
  'Diagnostic Composites': {
    foundations:  'A mixed warm-up diagnostic covering the full range of GED math topics at introductory difficulty — identify which domains need more practice before moving on.',
    core:         'A comprehensive diagnostic at GED entry level drawing from all four math content domains — useful for mid-course assessment and study-plan calibration.',
    'test-ready': 'A timed mixed-topic diagnostic mirroring the structure and difficulty of the actual GED Mathematical Reasoning test. Use scores to pinpoint remaining gaps.',
    challenge:    'A full-length, GED-level diagnostic that simulates real test pressure. Questions span all domains with authentic difficulty; use results to guide final review.',
  },

  // ── RLA / LITERACY ────────────────────────────────────────────────────────
  'Reading Comprehension': {
    foundations:  'Read short, clear passages and answer straightforward questions about the main idea and key details — the first step toward GED reading success.',
    core:         'Practise inferring meaning, identifying author purpose, and distinguishing fact from opinion in passages of moderate length and complexity.',
    'test-ready': 'Analyse longer, more complex texts requiring multi-sentence evidence chains, vocabulary-in-context questions, and evaluation of argument quality — modelled on real GED items.',
    challenge:    'GED-level and above: dense literary or informational passages with layered meaning, paired sources, and questions that demand precise textual analysis and critical evaluation.',
  },
  'Evidence & Argumentation': {
    foundations:  'Identify the most direct supporting detail in a short passage — one clear answer, no heavy interpretation needed. Essential for all GED reading questions.',
    core:         'Select and evaluate evidence from passages of moderate difficulty. Questions target the difference between strong and weak support, inference versus fact.',
    'test-ready': 'Evaluate evidence quality, spot logical fallacies, and trace how an author builds or undermines an argument — question styles match the GED Extended Reasoning items.',
    challenge:    'GED-level and above: critically assess evidence across two or more sources, evaluate reasoning chains, and identify unstated assumptions in complex argumentative texts.',
  },
  'Language & Grammar': {
    foundations:  'Review sentence basics: subject-verb agreement, end punctuation, and the most common comma rules — the grammar foundation every GED writer needs.',
    core:         'Apply GED grammar knowledge to pronoun case, modifier placement, parallel structure, and clause punctuation at a working level.',
    'test-ready': 'Edit realistic multi-sentence passages for grammar, mechanics, and style clarity — question formats mirror the GED Reasoning Through Language Arts Editing section.',
    challenge:    'GED-level and above: complex editing tasks involving nested clauses, precise word choice, logical transitions, and style correction in professional-register paragraphs.',
  },
  'Writing & Extended Response': {
    foundations:  'Learn the structure of a well-organised argument: claim, support, and basic conclusion — the structural skeleton the GED Extended Response requires.',
    core:         'Practise developing a two-sided argument with concrete evidence from a provided passage. Focus on thesis clarity and relevant paragraph support.',
    'test-ready': 'Draft and revise extended-response essays near test conditions: 45-minute time awareness, source-based evidence integration, and counter-argument acknowledgement.',
    challenge:    'GED-level and above: respond to paired-document debates, evaluate both sides with nuanced evidence, and write with the precision and register the GED scoring rubric rewards.',
  },
  'Informational Texts': {
    foundations:  'Read functional, real-world documents — workplace memos, instructions, and news summaries — and answer questions about their main ideas and structure.',
    core:         'Interpret charts, graphs, and multi-paragraph informational texts to answer inference and author-purpose questions at GED entry level.',
    'test-ready': 'Analyse complex informational passages on science, history, or social topics — questions require synthesising information and evaluating the author\'s reasoning.',
    challenge:    'GED-level and above: paired informational texts with conflicting perspectives; questions demand comparison, source evaluation, and precise textual evidence.',
  },
  'Literary Texts': {
    foundations:  'Read excerpts from accessible fiction and identify character, setting, and basic theme — the starting point for all literary analysis on the GED.',
    core:         'Analyse character motivation, tone, and figurative language in short literary passages. Questions match the comprehension level of GED fiction items.',
    'test-ready': 'Interpret complex literary elements — irony, symbolism, narrative perspective — in passages drawn from GED-style fiction and drama excerpts.',
    challenge:    'GED-level and above: analyse craft and structure in dense literary passages; compare two excerpts for theme, voice, and authorial technique under timed conditions.',
  },

  // ── SCIENCE ──────────────────────────────────────────────────────────────
  'Life Science': {
    foundations:  'Learn the vocabulary and core concepts of cells, body systems, genetics, and ecosystems — the foundational knowledge every GED Science question in this domain assumes.',
    core:         'Apply biological concepts to two-step questions about cell function, inheritance patterns, and ecosystem interactions at GED entry level.',
    'test-ready': 'Interpret diagrams, data tables, and experimental results related to life science — question structures reflect the GED Science test\'s emphasis on science practices.',
    challenge:    'GED-level and above: complex multi-step questions on evolution, gene expression, ecological modelling, and experimental design. Expect dense scenario stems and data interpretation.',
  },
  'Physical Science': {
    foundations:  'Build core knowledge of matter, energy, forces, and motion — the conceptual bedrock of all GED Physical Science questions.',
    core:         'Apply physics and chemistry concepts to two-step problems involving force, energy transfer, atomic structure, and chemical reactions at GED entry level.',
    'test-ready': 'Interpret graphs and quantitative data on physical phenomena — questions require applying formulas, reading experimental setups, and reasoning about cause and effect.',
    challenge:    'GED-level and above: multi-concept scenarios combining forces, energy, and chemical principles in real-world applied contexts. Data-heavy items require careful quantitative reasoning.',
  },
  'Earth & Space Science': {
    foundations:  'Learn the basics of Earth\'s systems, weather and climate, the rock cycle, and the solar system — essential vocabulary for every GED Earth Science question.',
    core:         'Connect earth and space science concepts to two-step questions about geological processes, climate patterns, and solar-system structure at GED entry level.',
    'test-ready': 'Interpret maps, cross-sections, and climate data. Questions require applying knowledge of Earth\'s systems to analyse scenarios in the style of GED Science items.',
    challenge:    'GED-level and above: complex questions integrating multiple Earth-science systems — climate feedback, plate tectonics, resource cycles, and astronomical events in applied contexts.',
  },
  'Science Practices': {
    foundations:  'Understand what scientific inquiry looks like: hypotheses, variables, experimental design, and reading simple data — the process skills tested throughout the GED Science test.',
    core:         'Apply science-practice skills to evaluate experimental designs, identify conclusions supported by data, and distinguish between correlation and causation.',
    'test-ready': 'Analyse multi-step experiments and data sets; evaluate the validity of a methodology and the strength of evidence. Question style closely mirrors the GED Science Extended Reasoning items.',
    challenge:    'GED-level and above: complex experimental scenarios requiring evaluation of controls, identification of confounding variables, and evidence-based argumentation about scientific claims.',
  },

  // ── SOCIAL STUDIES ────────────────────────────────────────────────────────
  'Civics & Government': {
    foundations:  'Learn the structure of U.S. government, the Constitution, and the rights and responsibilities of citizens — the core vocabulary of every GED Social Studies Civics question.',
    core:         'Apply civics knowledge to questions about government functions, democratic principles, and civil rights at GED entry level.',
    'test-ready': 'Interpret primary source excerpts — constitutional amendments, court decisions, political speeches — and answer questions about government power and civic principles.',
    challenge:    'GED-level and above: analyse complex primary documents and evaluate how constitutional principles have been applied or contested across U.S. history.',
  },
  'U.S. History': {
    foundations:  'Review key events, eras, and figures in U.S. history — the factual baseline that the GED Social Studies test expects every student to know.',
    core:         'Connect historical events to their causes and effects. Questions address major turning points from colonisation through the 20th century at GED entry level.',
    'test-ready': 'Analyse primary and secondary sources about U.S. historical events. Questions require evaluation of historical arguments and evidence in the style of GED Social Studies items.',
    challenge:    'GED-level and above: interpret complex primary documents, compare historical interpretations, and evaluate the long-term significance of major events — authentic GED Social Studies challenge questions.',
  },
  'Economics': {
    foundations:  'Learn fundamental economic concepts — supply and demand, opportunity cost, scarcity, and market structure — the vocabulary foundation for GED Economics questions.',
    core:         'Apply economic principles to two-step problems and graph interpretation: price changes, government policy effects, and basic macroeconomic indicators at GED entry level.',
    'test-ready': 'Analyse graphs, tables, and economic scenarios; interpret how policy changes affect markets and why economic indicators rise or fall. Question style mirrors the GED test.',
    challenge:    'GED-level and above: complex multi-factor economic analysis with data, graph comparison, and evaluation of trade-offs across fiscal, monetary, and international economics scenarios.',
  },
  'Geography & Environment': {
    foundations:  'Identify regions, read maps, and understand how physical geography shapes human settlement and resource use — foundational knowledge for all GED Geography questions.',
    core:         'Connect geographic and environmental concepts to two-step questions about human-environment interaction, migration, cultural regions, and natural resources.',
    'test-ready': 'Interpret maps, charts, and data about global geography, environmental systems, and human geography. Questions mirror the GED Social Studies format and reading demands.',
    challenge:    'GED-level and above: complex analysis of environmental change, geopolitical relationships, and resource economics using data, maps, and source documents in combination.',
  },
  'World History': {
    foundations:  'Survey major world civilisations, empires, and turning points that shaped the modern world — the broad context the GED Social Studies test occasionally draws on.',
    core:         'Connect world history events to economic and political developments. Two-step questions about causes, effects, and historical patterns at GED entry level.',
    'test-ready': 'Analyse global historical events across continents and eras. Questions require synthesising multiple pieces of evidence and evaluating historical arguments.',
    challenge:    'GED-level and above: comparative world history analysis using primary and secondary sources — evaluate how global events, ideologies, and economic systems have intersected.',
  },
};

// Fall-back blurbs for tiers when categoryName is not matched above
const FALLBACK = {
  foundations:  'Build the core vocabulary and one-step skills this topic requires — the essential foundation for everything that follows on the GED.',
  core:         'Apply key concepts to two-step problems at GED entry level. Questions mirror the lower range of what the actual test expects.',
  'test-ready': 'Work through multi-step problems in realistic contexts with question structures and difficulty that closely mirror the actual GED exam.',
  challenge:    'GED-level and above — complex, multi-concept questions with tight answer choices and scenario-based stems that match or exceed real test difficulty.',
};

// ─── Normalise category key for lookup ────────────────────────────────────────

function normalise(cat = '') {
  // Prefer exact match, then try trimming
  return cat.trim();
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf8'));

let filled = 0;
let skipped = 0;

for (const entry of topics) {
  const existing = (entry.topic.description || '').trim();
  if (existing) { skipped++; continue; }

  const tier = (entry.topic.tier || 'core').toLowerCase();
  const cat  = normalise(entry.categoryName);

  const domainMap  = DESCRIPTIONS[cat] || {};
  const blurb      = domainMap[tier] || FALLBACK[tier] || FALLBACK['core'];

  entry.topic.description = blurb;
  filled++;
}

fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2), 'utf8');

console.log(`Done. Filled: ${filled}  |  Already had description: ${skipped}`);
