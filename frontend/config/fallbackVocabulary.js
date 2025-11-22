// Centralized fallback vocabulary data and normalization helpers
// Extracted from app.jsx to reduce monolith size.

/**
 * Fallback vocabulary terms used when no subject-specific vocabulary is provided.
 */
export const FALLBACK_VOCABULARY = {
  Science: [
    {
      term: 'Hypothesis',
      definition:
        'A testable explanation for an observation that can be supported or refuted through experimentation.',
    },
    {
      term: 'Variable',
      definition: 'A factor in an experiment that can change or be controlled.',
    },
    {
      term: 'Control Group',
      definition:
        'The group in an experiment that does not receive the independent variable and is used for comparison.',
    },
    {
      term: 'Ecosystem',
      definition:
        'A community of living organisms interacting with each other and with their physical environment.',
    },
    {
      term: 'Photosynthesis',
      definition:
        'The process by which plants use light energy to convert carbon dioxide and water into glucose and oxygen.',
    },
    {
      term: 'Cellular Respiration',
      definition:
        'The process in which cells break down glucose and oxygen to release energy, carbon dioxide, and water.',
    },
    {
      term: 'Mitosis',
      definition:
        'A type of cell division that results in two identical daughter cells.',
    },
    {
      term: 'DNA',
      definition:
        'The molecule that carries genetic information in living organisms.',
    },
    {
      term: 'Atom',
      definition:
        'The smallest unit of an element that retains the properties of that element.',
    },
    {
      term: 'Molecule',
      definition: 'Two or more atoms that are chemically bonded together.',
    },
    {
      term: 'Gravity',
      definition: 'The force of attraction between objects with mass.',
    },
    {
      term: 'Qualitative Observation',
      definition:
        'An observation that describes qualities or characteristics without using numbers.',
    },
    {
      term: 'Quantitative Observation',
      definition:
        'An observation that uses numbers or measurements to describe what is observed.',
    },
    {
      term: 'Homeostasis',
      definition:
        'The process by which organisms maintain stable internal conditions despite external changes.',
    },
    {
      term: 'Independent Variable',
      definition:
        'The factor that is purposely changed in an experiment to test its effect.',
    },
    {
      term: 'Dependent Variable',
      definition:
        'The factor that is measured in an experiment and changes in response to the independent variable.',
    },
    {
      term: 'Scientific Method',
      definition:
        'A systematic process of asking questions, forming hypotheses, conducting experiments, and drawing conclusions.',
    },
    {
      term: 'Plate Tectonics',
      definition:
        "The theory explaining the movement of Earth's lithospheric plates and the activity at their boundaries.",
    },
    {
      term: 'Fossil',
      definition:
        'The preserved remains, impression, or trace of an organism from the past.',
    },
    {
      term: 'Energy Transfer',
      definition:
        'The movement of energy from one object or system to another.',
    },
  ],
  Math: [
    {
      term: 'Integer',
      definition: 'A whole number that can be positive, negative, or zero.',
    },
    {
      term: 'Fraction',
      definition:
        'A number that represents a part of a whole or a part of a set.',
    },
    {
      term: 'Decimal',
      definition:
        'A number that uses a decimal point to show a value smaller than one.',
    },
    {
      term: 'Percent',
      definition: 'A ratio that compares a number to 100.',
    },
    {
      term: 'Ratio',
      definition: 'A comparison of two quantities by division.',
    },
    {
      term: 'Proportion',
      definition: 'An equation stating that two ratios are equivalent.',
    },
    {
      term: 'Equation',
      definition:
        'A mathematical statement that shows two expressions are equal.',
    },
    {
      term: 'Variable',
      definition:
        'A symbol, usually a letter, that represents an unknown value.',
    },
    {
      term: 'Coefficient',
      definition:
        'The number that is multiplied by a variable in an algebraic expression.',
    },
    {
      term: 'Expression',
      definition:
        'A mathematical phrase that can contain numbers, variables, and operations.',
    },
    {
      term: 'Inequality',
      definition:
        'A mathematical statement that compares two expressions using greater than, less than, or equal to symbols.',
    },
    {
      term: 'Slope',
      definition:
        'A measure of the steepness of a line, found by the ratio of rise over run.',
    },
    {
      term: 'Quadratic Equation',
      definition:
        'An equation in the form ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.',
    },
    {
      term: 'Linear Function',
      definition: 'A function whose graph is a straight line.',
    },
    {
      term: 'Pythagorean Theorem',
      definition:
        'A formula that relates the side lengths of a right triangle: a + b = c.',
    },
    {
      term: 'Mean',
      definition:
        'The average of a set of numbers, found by adding the numbers and dividing by how many there are.',
    },
    {
      term: 'Median',
      definition: 'The middle value in an ordered set of numbers.',
    },
    {
      term: 'Mode',
      definition: 'The number that appears most often in a set of data.',
    },
    {
      term: 'Range',
      definition:
        'The difference between the highest and lowest values in a data set.',
    },
    {
      term: 'Probability',
      definition:
        'The likelihood that an event will occur, expressed as a ratio, fraction, or percent.',
    },
    {
      term: 'Factor',
      definition: 'A number that divides another number evenly.',
    },
    {
      term: 'Multiple',
      definition: 'The product of a number and any whole number.',
    },
    {
      term: 'Prime Number',
      definition:
        'A whole number greater than 1 that has exactly two factors: 1 and itself.',
    },
    {
      term: 'Composite Number',
      definition:
        'A whole number greater than 1 that has more than two factors.',
    },
    {
      term: 'Perimeter',
      definition: 'The total distance around the outside of a shape.',
    },
    {
      term: 'Area',
      definition: 'The amount of surface covered by a shape.',
    },
    {
      term: 'Volume',
      definition: 'The amount of space a three-dimensional object occupies.',
    },
    {
      term: 'Circumference',
      definition: 'The distance around a circle.',
    },
    {
      term: 'Exponent',
      definition:
        'A small number written above and to the right of a base number that shows how many times the base is multiplied by itself.',
    },
    {
      term: 'Order of Operations',
      definition:
        'The rules that tell you the correct sequence to evaluate a mathematical expression (PEMDAS).',
    },
  ],
  'Reasoning Through Language Arts (RLA)': [
    {
      term: 'Main Idea',
      definition:
        'The central point or most important concept that an author wants the reader to understand.',
    },
    {
      term: 'Supporting Detail',
      definition:
        'Information that explains, proves, or enhances the main idea.',
    },
    {
      term: 'Inference',
      definition:
        'A conclusion drawn from evidence and reasoning rather than from explicit statements.',
    },
    {
      term: 'Theme',
      definition:
        'The central message or underlying meaning of a text, often expressed as a statement about life or human nature.',
    },
    {
      term: 'Tone',
      definition:
        'The attitude or feeling the author conveys through word choice and writing style.',
    },
    {
      term: 'Context Clues',
      definition:
        'Hints within a text that help readers determine the meaning of an unfamiliar word.',
    },
    {
      term: 'Summarize',
      definition:
        'To restate the main ideas of a text briefly, in your own words.',
    },
    {
      term: 'Claim',
      definition:
        'A statement or assertion that something is true, often requiring evidence or support.',
    },
    {
      term: 'Evidence',
      definition:
        'Information such as facts, examples, or quotes that support a claim or argument.',
    },
    {
      term: 'Counterargument',
      definition:
        'An argument or perspective that opposes or challenges the main claim.',
    },
    {
      term: 'Transition Words',
      definition:
        'Words or phrases (e.g., however, therefore, in addition) that connect ideas and help writing flow smoothly.',
    },
    {
      term: 'Point of View',
      definition:
        'The perspective from which a story or argument is told (e.g., first person, third person).',
    },
    {
      term: 'Audience',
      definition:
        'The intended readers or listeners for a piece of writing or speech.',
    },
    {
      term: 'Purpose',
      definition:
        'The reason an author writes a text, such as to inform, persuade, entertain, or explain.',
    },
    {
      term: 'Figurative Language',
      definition:
        'Language that uses words or expressions with a meaning different from the literal interpretation (e.g., metaphors, similes).',
    },
    {
      term: 'Paraphrase',
      definition:
        'To restate information or ideas from a source using different words, while maintaining the original meaning.',
    },
    {
      term: 'Thesis Statement',
      definition:
        'A sentence or two that clearly states the main argument or focus of an essay.',
    },
    {
      term: 'Revision',
      definition:
        'The process of reviewing and improving a draft by changing content, organization, or word choice.',
    },
    {
      term: 'Editing',
      definition:
        'The process of correcting grammar, spelling, punctuation, and other mechanical errors in writing.',
    },
    {
      term: 'Coherence',
      definition:
        'The quality of writing that makes ideas clear and logically connected.',
    },
  ],
  'Social Studies': [
    {
      term: 'Democracy',
      definition:
        'A system of government in which power is vested in the people, who exercise it directly or through elected representatives.',
    },
    {
      term: 'Constitution',
      definition:
        'A written document that outlines the fundamental laws and principles of a nation or state.',
    },
    {
      term: 'Checks and Balances',
      definition:
        'A system in which each branch of government has the power to limit or check the other branches.',
    },
    {
      term: 'Separation of Powers',
      definition:
        'The division of government responsibilities into distinct branches to prevent concentration of power.',
    },
    {
      term: 'Federalism',
      definition:
        'A system of government in which power is divided between a central authority and constituent political units (e.g., states).',
    },
    {
      term: 'Amendment',
      definition:
        'A formal change or addition to a legal document, especially the U.S. Constitution.',
    },
    {
      term: 'Civil Rights',
      definition:
        'Rights that protect individuals from discrimination and ensure equal treatment under the law.',
    },
    {
      term: 'Suffrage',
      definition: 'The right to vote in political elections.',
    },
    {
      term: 'Imperialism',
      definition:
        "A policy of extending a country's power and influence through colonization, military force, or other means.",
    },
    {
      term: 'Nationalism',
      definition:
        "A strong sense of pride in and devotion to one's country, often emphasizing national interests over international concerns.",
    },
    {
      term: 'Revolution',
      definition:
        'A fundamental and often sudden change in political power or organizational structures, usually achieved through uprising.',
    },
    {
      term: 'Migration',
      definition:
        'The movement of people from one place to another, often to find work, safety, or better living conditions.',
    },
    {
      term: 'Culture',
      definition:
        'The shared beliefs, values, customs, behaviors, and artifacts that characterize a group or society.',
    },
    {
      term: 'Urbanization',
      definition:
        'The process by which an increasing percentage of a population comes to live in cities and urban areas.',
    },
    {
      term: 'Economy',
      definition:
        'The system of production, distribution, and consumption of goods and services in a society.',
    },
    {
      term: 'Scarcity',
      definition:
        'The fundamental economic problem of having unlimited wants and needs but limited resources.',
    },
    {
      term: 'Supply and Demand',
      definition:
        'The relationship between the amount of a product available and the desire of buyers for it, which affects price.',
    },
    {
      term: 'Gross Domestic Product (GDP)',
      definition:
        'The total value of all goods and services produced in a country during a specific time period.',
    },
    {
      term: 'Primary Source',
      definition:
        'An original document or firsthand account created at the time of an event.',
    },
    {
      term: 'Secondary Source',
      definition:
        'A document or account that interprets or analyzes primary sources.',
    },
    {
      term: 'Manifest Destiny',
      definition:
        'The 19th-century belief that the United States was destined to expand across the North American continent.',
    },
    {
      term: 'Reconstruction',
      definition:
        'The period after the U.S. Civil War when southern states were reorganized and reintegrated into the Union.',
    },
    {
      term: 'Great Depression',
      definition:
        'A severe worldwide economic downturn that took place during the 1930s.',
    },
    {
      term: 'Cold War',
      definition:
        'The period of political tension and military rivalry between the United States and the Soviet Union after World War II.',
    },
    {
      term: 'Bill of Rights',
      definition:
        'The first ten amendments to the U.S. Constitution that protect individual liberties.',
    },
    {
      term: 'Legislature',
      definition: 'The branch of government responsible for making laws.',
    },
    {
      term: 'Executive Branch',
      definition: 'The branch of government responsible for enforcing laws.',
    },
    {
      term: 'Judicial Branch',
      definition:
        'The branch of government responsible for interpreting laws and administering justice.',
    },
    {
      term: 'Monarchy',
      definition:
        'A form of government in which a single person, such as a king or queen, rules for life.',
    },
    {
      term: 'Tariff',
      definition: 'A tax imposed on imported goods.',
    },
    {
      term: 'Treaty',
      definition: 'A formal agreement between two or more countries.',
    },
  ],
};

/**
 * Normalize a raw vocabulary entry (string or object) into a standard shape.
 * @param {string|object} entry - The raw vocabulary entry.
 * @returns {object|null} Normalized entry with term, definition, and optional example.
 */
export function normalizeVocabularyEntry(entry) {
  if (!entry) return null;
  if (typeof entry === 'string') {
    const trimmed = entry.trim();
    return trimmed ? { term: trimmed, definition: '' } : null;
  }
  if (typeof entry !== 'object') return null;
  const term = typeof entry.term === 'string' ? entry.term.trim() : '';
  if (!term) return null;
  const definition =
    typeof entry.definition === 'string' ? entry.definition.trim() : '';
  const example = typeof entry.example === 'string' ? entry.example.trim() : '';
  const normalized = { term, definition };
  if (example) {
    normalized.example = example;
  }
  return normalized;
}

/**
 * Merge base vocabulary with an override map keyed by subject name.
 * @param {object} base - The base vocabulary object.
 * @param {object} override - Override vocabulary object keyed by subject.
 * @returns {object} Merged vocabulary data.
 */
export function mergeVocabularyData(base, override) {
  const result = { ...base };
  if (!override || typeof override !== 'object') {
    return result;
  }
  Object.entries(override).forEach(([subject, entries]) => {
    if (!Array.isArray(entries)) {
      return;
    }
    const normalizedEntries = entries
      .map(normalizeVocabularyEntry)
      .filter(Boolean);
    if (normalizedEntries.length) {
      result[subject] = normalizedEntries;
    }
  });
  return result;
}
