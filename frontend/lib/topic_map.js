(function(){
  // Definitive canonical topics per subject (8-10 each)
  const CANONICAL_TOPICS = {
    "Math": [
      "Number Sense & Operations",
      "Fractions & Decimals Problem Solving",
      "Ratios, Rates & Proportions",
      "Percents & Real-World Applications",
      "Algebraic Expressions & Linear Equations",
      "Functions & Graphs",
      "Geometry & Measurement",
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
      // U.S. History (aligned with existing premade eras)
      "U.S. History: Colonial Foundations",
      "U.S. History: The American Revolution",
      "U.S. History: A New Nation & Westward Expansion",
      "U.S. History: Civil War & Reconstruction",
      "U.S. History: Industrialization & Progressive Era",
      "U.S. History: Global Conflicts (WWI–WWII)",
      "U.S. History: Cold War & Civil Rights",
      "U.S. History: Contemporary America",
      // Civics (aligned with premade branches/categories)
      "Civics: The Constitution & Rights",
      "Civics: The Legislative Branch",
      "Civics: The Executive Branch",
      "Civics: The Judicial Branch"
    ],
    "Reasoning Through Language Arts (RLA)": [
      "Reading Comprehension (Informational Text)",
      "Reading Literature & Stories",
      "Grammar, Usage & Conventions",
      "Writing & Revision Skills",
      "Vocabulary & Context Clues"
    ]
  };

  // Exact-name overrides (extend freely as new quizzes are audited)
  const EXACT_NAME_MAP = {
    "Math": {
      // examples
      "Algebra": "Algebraic Expressions & Linear Equations",
      "Algebra & Linear Equations": "Algebraic Expressions & Linear Equations",
      "Algebraic Expressions": "Algebraic Expressions & Linear Equations",
      "Solving Equations": "Algebraic Expressions & Linear Equations",
      "Algebraic Equations Quiz 3": "Algebraic Expressions & Linear Equations",
      "Ratios": "Ratios, Rates & Proportions",
      "Ratios and Proportions": "Ratios, Rates & Proportions",
      "Proportion Word Problems": "Ratios, Rates & Proportions",
      "Rate/Unit Rate": "Ratios, Rates & Proportions",
      "Ratio Practice Set 2": "Ratios, Rates & Proportions",
      "Fractions and Decimals": "Fractions & Decimals Problem Solving",
      "Operations with Fractions": "Fractions & Decimals Problem Solving",
      "Fraction Word Problems": "Fractions & Decimals Problem Solving",
      "Percents": "Percents & Real-World Applications",
      "Percent Word Problems": "Percents & Real-World Applications",
      "Sales/Discount/Markup": "Percents & Real-World Applications",
      "Percent Increase & Decrease": "Percents & Real-World Applications",
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
    "Social Studies": {
      // Helpful exacts (optional; patterns below cover most cases)
      "Foundations (Colonial America)": "U.S. History: Colonial Foundations",
      "The American Revolution (1763-1783)": "U.S. History: The American Revolution",
      "Westward Expansion": "U.S. History: A New Nation & Westward Expansion",
      "A New Nation": "U.S. History: A New Nation & Westward Expansion",
      "A Nation Divided (1824-1877)": "U.S. History: Civil War & Reconstruction",
      "Industrial America (1877-1914)": "U.S. History: Industrialization & Progressive Era",
      "Global Conflicts (1914-1945)": "U.S. History: Global Conflicts (WWI–WWII)",
      "The Cold War Era (1945-1991)": "U.S. History: Cold War & Civil Rights",
      "Contemporary America (1991-Present)": "U.S. History: Contemporary America",
      "The Constitution": "Civics: The Constitution & Rights",
      "The Legislative Branch": "Civics: The Legislative Branch",
      "The Executive Branch": "Civics: The Executive Branch",
      "The Judicial Branch": "Civics: The Judicial Branch"
    },
    "Reasoning Through Language Arts (RLA)": {
      "Reading Comprehension": "Reading Comprehension (Informational Text)",
      "Reading – Informational": "Reading Comprehension (Informational Text)",
      "Reading - Informational": "Reading Comprehension (Informational Text)",
      "Nonfiction Passages": "Reading Comprehension (Informational Text)",
      "Reading Skills": "Reading Comprehension (Informational Text)",
      "Reading – Literature": "Reading Literature & Stories",
      "Reading - Literature": "Reading Literature & Stories",
      "Fiction Passages": "Reading Literature & Stories",
      "Poetry/Literary Excerpts": "Reading Literature & Stories",
      "Grammar": "Grammar, Usage & Conventions",
      "Language & Usage": "Grammar, Usage & Conventions",
      "Conventions": "Grammar, Usage & Conventions",
      "Mechanics": "Grammar, Usage & Conventions",
      "Writing": "Writing & Revision Skills",
      "Extended Response Skills": "Writing & Revision Skills",
      "Editing/Revising": "Writing & Revision Skills"
    }
  };

  // Regex-based patterns per subject for fuzzy grouping
  const PATTERN_MAP = {
    "Math": [
      { re: /number\s*sense|whole\s*numbers|integers|operations?/i, canon: "Number Sense & Operations" },
      { re: /fraction|decimal|mixed\s*number|improper\s*fraction|divide\s*fraction|add\s*fraction/i, canon: "Fractions & Decimals Problem Solving" },
      { re: /ratio|proportion|unit\s*rate|rate\b/i, canon: "Ratios, Rates & Proportions" },
      { re: /percent|discount|markup|markdown|increase|decrease|simple\s*interest/i, canon: "Percents & Real-World Applications" },
      { re: /algebra|linear\s*equations?|expressions?|solve\s*for\s*x|equations?/i, canon: "Algebraic Expressions & Linear Equations" },
      { re: /function|graph|slope|coordinate|line of best fit/i, canon: "Functions & Graphs" },
      { re: /geometry|area|perimeter|volume|surface\s*area|angle|triangle|circle|polygon|2d|3d|solid|shape|prism|cylinder|cone|sphere|net\b/i, canon: "Geometry & Measurement" },
      { re: /measurement|units?\b|convert|formula|inches|feet|meters|centimeters/i, canon: "Geometry & Measurement" },
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
      // U.S. History eras (specific mappings)
      { re: /foundation|colonial|colonies|mercantilism|exploration|french\s*\&?\s*indian|french\s*and\s*indian|mayflower|indentured|columbian\s*exchange|triangular\s*trade|great\s*awakening|albany\s*plan|burgesses|new\s*england\s*colon|middle\s*colon|southern\s*colon/i, canon: "U.S. History: Colonial Foundations" },
      { re: /american\s*revolution|revolution(?!ary\s*guard)|stamp\s*act|townshend|boston\s*tea|intolerable|declaration\s*of\s*independence|patriots?|loyalists?|common\s*sense|saratoga|yorktown|continental\s*(army|congress)|cornwallis/i, canon: "U.S. History: The American Revolution" },
      { re: /articles\s*of\s*confederation|constitutional\s*convention|great\s*compromise|bill\s*of\s*rights|federalists?|anti-?federalists?|louisiana\s*purchase|lewis\s*(&|and)\s*clark|manifest\s*destiny|homestead\s*act|oregon\s*trail|mexican(-|\s*)american\s*war|transcontinental\s*railroad|trail\s*of\s*tears|gadsden\s*purchase|marbury\s*v\.?\s*madison|washington'?s?\s*farewell|national\s*bank|northwest\s*ordinance|new\s*nation|westward\s*expansion/i, canon: "U.S. History: A New Nation & Westward Expansion" },
      { re: /civil\s*war|sectionalism|missouri\s*compromise|compromise\s*of\s*1850|kansas-?nebraska|dred\s*scott|lincoln|emancipation\s*proclamation|gettysburg|anaconda\s*plan|sherman|reconstruction|13th|14th|15th|black\s*codes|sharecropping|compromise\s*of\s*1877|grandfather\s*clause|redeemers/i, canon: "U.S. History: Civil War & Reconstruction" },
      { re: /industrial(ization)?|gilded\s*age|immigration|urbanization|progressive\s*era|muckrakers?|the\s*jungle|meat\s*inspection|pure\s*food\s*and\s*drug|trust\s*buster|roosevelt|conservation|women'?s?\s*suffrage|19th\s*amendment|plessy\s*v\.?\s*ferguson|tenements?|political\s*machines?/i, canon: "U.S. History: Industrialization & Progressive Era" },
      { re: /world\s*war\s*i|\bwwi\b|zimmermann|lusitania|roaring\s*twenties|great\s*depression|hooverville|new\s*deal|\bccc\b|\bwpa\b|world\s*war\s*ii|\bwwii\b|pearl\s*harbor|rosie\s*the\s*riveter|versailles|league\s*of\s*nations/i, canon: "U.S. History: Global Conflicts (WWI–WWII)" },
      { re: /cold\s*war|containment|marshall\s*plan|iron\s*curtain|\bnato\b|domino\s*theory|korean\s*war|cuban\s*missile|brinkmanship|mad\b|sputnik|brown\s*v\.?\s*board|civil\s*rights\s*(act|movement)|voting\s*rights\s*act|martin\s*luther\s*king|berlin\s*wall|soviet\s*union/i, canon: "U.S. History: Cold War & Civil Rights" },
      { re: /contemporary|1991|globalization|war\s*on\s*terror|9\/?11|homeland\s*security|patriot\s*act|iraq|afghanistan|great\s*recession|obama|affordable\s*care\s*act|\baca\b|immigration\s*shift|same-?sex\s*marriage|obergefell/i, canon: "U.S. History: Contemporary America" },
      // Civics & Government (specific branches)
      { re: /constitution|preamble|articles?\b|bill\s*of\s*rights|first\s*amendment|second\s*amendment|fourth\s*amendment|fifth\s*amendment|sixth\s*amendment|eighth\s*amendment|tenth\s*amendment|supremacy\s*clause|popular\s*sovereignty|federalism|checks?\s*and\s*balances/i, canon: "Civics: The Constitution & Rights" },
      { re: /congress|house\s*of\s*representatives|senate|bicameral|how\s*a\s*bill\s*becomes\s*a\s*law|committee|conference\s*committee|revenue\s*bills?|whip\b|filibuster|cloture|power\s*of\s*the\s*purse|enumerated\s*powers?|necessary\s*and\s*proper|elastic\s*clause|advice\s*and\s*consent/i, canon: "Civics: The Legislative Branch" },
      { re: /president|executive\s*branch|cabinet|commander\s*in\s*chief|veto\b|executive\s*order|state\s*of\s*the\s*union|22nd\s*amendment|succession|speaker\s*of\s*the\s*house|secretary\s*of\s*state/i, canon: "Civics: The Executive Branch" },
      { re: /supreme\s*court|article\s*iii|judicial\s*branch|judicial\s*review|marbury\s*v\.?\s*madison|lifetime|rule\s*of\s*four|writ\s*of\s*certiorari/i, canon: "Civics: The Judicial Branch" }
    ],
    "Reasoning Through Language Arts (RLA)": [
      { re: /informational|non\s*fiction|article|text\s*evidence|passage/i, canon: "Reading Comprehension (Informational Text)" },
      { re: /literature|fiction|poetry|poem|novel|theme|character|short\s*story|stories/i, canon: "Reading Literature & Stories" },
      { re: /grammar|usage|parts\s*of\s*speech|punctuation|sentence|comma|verb|subject|mechanics|conventions?/i, canon: "Grammar, Usage & Conventions" },
      { re: /writing|extended\s*response|essay|thesis|argument|revision|editing|revise|edit/i, canon: "Writing & Revision Skills" },
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
