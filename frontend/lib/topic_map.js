(function(){
  // Definitive canonical topics per subject (8-10 each)
  const CANONICAL_TOPICS = {
    "Math": [
      "Number Sense & Operations",
      "Fractions & Decimals",
      "Ratios & Proportions",
      "Percents & Problem Solving",
      "Algebraic Expressions & Equations",
      "Functions & Graphs",
      "Geometry Basics (Area, Perimeter, Volume)",
      "Measurement & Formulas",
      "Data Analysis & Statistics",
      "Math Foundations / Scientific Numeracy"
    ],
    "Science": [
      "Life Science (Cell Biology & Genetics)",
      "Physical Science (Physics & Chemistry Principles)",
      "Earth & Space Science (Weather, Climate, and Geology)",
      "Scientific Practices & Data Interpretation",
      "Human Body Systems & Health",
      "Environmental Science & Energy Flow"
    ],
    "Social Studies": [
      "U.S. History (Colonial Era → Modern Times)",
      "Civics & Government (Constitution, Rights, Democracy)",
      "Economics & Personal Finance",
      "Geography & Global Issues",
      "Historical Analysis & Primary Sources"
    ],
    "Reasoning Through Language Arts (RLA)": [
      "Reading Comprehension (Informational Text)",
      "Reading Literature (Fiction & Poetry)",
      "Grammar & Language Usage",
      "Writing & Extended Response",
      "Vocabulary & Context Clues"
    ]
  };

  // Exact-name overrides (extend freely as new quizzes are audited)
  const EXACT_NAME_MAP = {
    "Math": {
      // examples
      "Algebra & Linear Equations": "Algebraic Expressions & Equations",
      "Algebraic Equations Quiz 3": "Algebraic Expressions & Equations",
      "Ratio Practice Set 2": "Ratios & Proportions",
      "Percent Increase & Decrease": "Percents & Problem Solving",
      "Mean Median Mode": "Data Analysis & Statistics",
      "Scientific Numeracy": "Math Foundations / Scientific Numeracy"
    },
    "Science": {
      "Life Science Basics": "Life Science (Cell Biology & Genetics)",
      "Ecosystems & Environment": "Environmental Science & Energy Flow",
      "Chemistry Fundamentals": "Physical Science (Physics & Chemistry Principles)",
      "Physics in Motion": "Physical Science (Physics & Chemistry Principles)",
      "Earth & Space Systems": "Earth & Space Science (Weather, Climate, and Geology)",
      "Scientific Numeracy": "Scientific Practices & Data Interpretation"
    },
    "Social Studies": {},
    "Reasoning Through Language Arts (RLA)": {}
  };

  // Regex-based patterns per subject for fuzzy grouping
  const PATTERN_MAP = {
    "Math": [
      { re: /number\s*sense|whole\s*numbers|integers|operations?/i, canon: "Number Sense & Operations" },
      { re: /fraction|decimal/i, canon: "Fractions & Decimals" },
      { re: /ratio|proportion/i, canon: "Ratios & Proportions" },
      { re: /percent|discount|markup|markdown|increase|decrease/i, canon: "Percents & Problem Solving" },
      { re: /algebra|linear\s*equations?|expressions?|solve\s*for\s*x|equations?/i, canon: "Algebraic Expressions & Equations" },
      { re: /function|graph|slope|coordinate|line of best fit/i, canon: "Functions & Graphs" },
      { re: /geometry|area|perimeter|volume|surface\s*area|angle|triangle|circle|polygon/i, canon: "Geometry Basics (Area, Perimeter, Volume)" },
      { re: /measurement|units?\b|convert|formula/i, canon: "Measurement & Formulas" },
      { re: /statistics|data|mean|median|mode|range|probability|histogram|box\s*plot/i, canon: "Data Analysis & Statistics" },
      { re: /scientific\s*numeracy|foundations?|numeracy/i, canon: "Math Foundations / Scientific Numeracy" }
    ],
    "Science": [
      { re: /life\s*science|cell|photosynthesis|dna|gene|genetic|mitochondria|organelles?/i, canon: "Life Science (Cell Biology & Genetics)" },
      { re: /chemistry|periodic|atom|bond|ph\b|acid|base|molecule|compound/i, canon: "Physical Science (Physics & Chemistry Principles)" },
      { re: /physics|newton|motion|force|energy|wave|electric|ohm|voltage|current|resistance/i, canon: "Physical Science (Physics & Chemistry Principles)" },
      { re: /earth|space|planet|rock\s*cycle|plate\s*tectonics|meteorology|weather|climate|solar|moon|eclipse|atmosphere/i, canon: "Earth & Space Science (Weather, Climate, and Geology)" },
      { re: /data|graph|experiment|scientific\s*method|table|chart|interpret/i, canon: "Scientific Practices & Data Interpretation" },
      { re: /human\s*body|system|circulatory|respiratory|digestive|nervous|homeostasis|health/i, canon: "Human Body Systems & Health" },
      { re: /ecosystem|environment|biodiversity|food\s*web|energy\s*flow|producer|consumer|decomposer|carbon\s*cycle|water\s*cycle|invasive|succession|acid\s*rain/i, canon: "Environmental Science & Energy Flow" }
    ],
    "Social Studies": [
      { re: /u\.?s\.?\s*history|revolution|civil\s*war|reconstruction|industrial|world\s*war|cold\s*war|colonial|modern/i, canon: "U.S. History (Colonial Era → Modern Times)" },
      { re: /civics|government|constitution|rights|democracy|legislative|executive|judicial|amendment|federalism/i, canon: "Civics & Government (Constitution, Rights, Democracy)" },
      { re: /economics?|market|supply|demand|inflation|gdp|personal\s*finance|budget|tax|interest/i, canon: "Economics & Personal Finance" },
      { re: /geography|map|latitude|longitude|global|climate\s*change|migration|population/i, canon: "Geography & Global Issues" },
      { re: /primary\s*source|document|analysis|historical|timeline|cause|effect/i, canon: "Historical Analysis & Primary Sources" }
    ],
    "Reasoning Through Language Arts (RLA)": [
      { re: /informational|non\s*fiction|article|text\s*evidence|passage/i, canon: "Reading Comprehension (Informational Text)" },
      { re: /literature|fiction|poetry|poem|novel|theme|character/i, canon: "Reading Literature (Fiction & Poetry)" },
      { re: /grammar|usage|parts\s*of\s*speech|punctuation|sentence|comma|verb|subject/i, canon: "Grammar & Language Usage" },
      { re: /writing|extended\s*response|essay|thesis|argument|revision|editing/i, canon: "Writing & Extended Response" },
      { re: /vocabulary|context\s*clues|synonym|antonym|word\s*meaning/i, canon: "Vocabulary & Context Clues" }
    ]
  };

  function resolveCanonicalTopic(subject, sourceTitleOrId) {
    const subj = subject || '';
    const src = (sourceTitleOrId || '').toString().trim();
    if (!subj || !src) return null;

    // 1) Exact-name overrides
    const exact = EXACT_NAME_MAP[subj] || {};
    if (Object.prototype.hasOwnProperty.call(exact, src)) {
      return exact[src];
    }

    // 2) Pattern-based matches
    const patterns = PATTERN_MAP[subj] || [];
    for (const { re, canon } of patterns) {
      if (re.test(src)) return canon;
    }

    // 3) Fallback: if the src is already in canonical list, accept it
    const canonList = CANONICAL_TOPICS[subj] || [];
    if (canonList.includes(src)) return src;

    return null;
  }

  // Expose globals for the SPA
  if (typeof window !== 'undefined') {
    window.CANONICAL_TOPICS = CANONICAL_TOPICS;
    window.TOPIC_NAME_NORMALIZER = { EXACT_NAME_MAP, PATTERN_MAP };
    window.resolveCanonicalTopic = resolveCanonicalTopic;
    // Use canonical topics to drive ordering and filtering by default
    window.CURATED_SAQ_TOPICS = CANONICAL_TOPICS;

    // Centralized getter for Smith-a-Quiz topic lists (no fallback to filenames)
    window.getSmithAQuizTopics = function getSmithAQuizTopics(subject) {
      const list = (CANONICAL_TOPICS && CANONICAL_TOPICS[subject]) ? CANONICAL_TOPICS[subject] : [];
      try {
        if (Array.isArray(list)) {
          console.log(`[Smith-a-Quiz] topics rendered: ${subject} → ${list.length} topics (canonical mode)`);
        } else {
          console.warn('[Smith-a-Quiz] canonical topics missing for subject:', subject);
        }
      } catch {}
      return Array.isArray(list) ? list.slice() : [];
    };
  }
})();
