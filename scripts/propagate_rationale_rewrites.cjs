#!/usr/bin/env node
/**
 * Propagate question-specific rationale rewrites across files that contain
 * the same questions. Each rule maps an option text + old rationale → new
 * rationale. Replaces all occurrences across the listed target files.
 */
const fs = require('fs');
const path = require('path');

// Each rule: { optionText, oldRationale, newRationale }
// Match works on JSON-style ("text"\s*:) blocks.
function buildRule(optionText, oldRationale, newRationale) {
  return { optionText, oldRationale, newRationale };
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Build a regex fragment matching a JS-string literal whose decoded value
// equals the given raw string. Supports both 'single' and "double" quoted
// strings, with backslash escaping for the quote, backslash, and newlines.
function strLitRe(raw) {
  // For both single- and double-quoted forms we represent each character of
  // the raw string with an alternation that accepts either the literal char
  // or its backslash-escaped form (when meaningful).
  function inside(quote) {
    const altQuote = quote === '"' ? "'" : '"';
    return raw
      .split('')
      .map((ch) => {
        if (ch === quote) return '\\\\' + escapeRe(quote);
        if (ch === '\\') return '\\\\\\\\';
        if (ch === '\n') return '(?:\\\\n|\\n)';
        if (ch === '\r') return '(?:\\\\r|\\r)';
        if (ch === altQuote)
          return (
            '(?:' + escapeRe(altQuote) + '|\\\\' + escapeRe(altQuote) + ')'
          );
        return escapeRe(ch);
      })
      .join('');
  }
  return '(?:"' + inside('"') + '"|\'' + inside("'") + "')";
}

// Match a key, allowing JSON ("key") or JS bare identifier (key) form.
function keyRe(name) {
  return '(?:"' + name + '"|' + name + ')';
}

function applyRulesToFile(filePath, rules) {
  let src = fs.readFileSync(filePath, 'utf8');
  let totalReplaced = 0;
  for (const rule of rules) {
    const tLit = strLitRe(rule.optionText);
    const oldRLit = strLitRe(rule.oldRationale);
    const textKey = keyRe('text');
    const ratKey = keyRe('rationale');
    // We require the option block to contain the matching text AND the
    // matching old rationale within the same {..} braces. Order is flexible.
    const ratFinder = new RegExp(ratKey + '\\s*:\\s*' + oldRLit);

    function attempt(orderRe) {
      src = src.replace(orderRe, (block) => {
        totalReplaced++;
        return block.replace(
          ratFinder,
          'rationale: ' + JSON.stringify(rule.newRationale)
        );
      });
    }

    // text ... rationale
    attempt(
      new RegExp(
        '\\{[^{}]*?' +
          textKey +
          '\\s*:\\s*' +
          tLit +
          '[^{}]*?' +
          ratKey +
          '\\s*:\\s*' +
          oldRLit +
          '[^{}]*?\\}',
        'g'
      )
    );
    // rationale ... text
    attempt(
      new RegExp(
        '\\{[^{}]*?' +
          ratKey +
          '\\s*:\\s*' +
          oldRLit +
          '[^{}]*?' +
          textKey +
          '\\s*:\\s*' +
          tLit +
          '[^{}]*?\\}',
        'g'
      )
    );
  }
  if (totalReplaced > 0) {
    fs.writeFileSync(filePath, src, 'utf8');
  }
  return totalReplaced;
}

module.exports = { applyRulesToFile, buildRule };

if (require.main === module) {
  const TARGETS = [
    'backend/data/quizzes/social-studies/ss_us_hist_new_nation_quiz2.js',
    'backend/data/quizzes/social-studies/ss_us_hist_new_nation_quiz3.js',
    'backend/data/quizzes/social-studies/ss_us_hist_new_nation.js',
  ];

  // Rules derived from quiz1 hand-rewrites (Q6-Q12 in quiz1, but Q1-Q5/Q1-Q12
  // elsewhere — match by option text, not by question number).
  const RULES = [
    // ===== Q6: Manifest Destiny =====
    buildRule(
      'That the United States should limit its territory to the original thirteen colonies.',
      'This answer is incorrect. Consider the key details in the question.',
      'Incorrect. Manifest Destiny was an expansionist doctrine, not an isolationist one; its central claim was that the U.S. should grow far beyond the original thirteen colonies.'
    ),
    buildRule(
      'That American settlers were destined to expand across the continent, spreading their institutions with them.',
      'That American settlers were destined to expand across the continent, spreading their institutions with them.',
      'Correct. As the passage explains, Manifest Destiny held that Americans were destined — even duty-bound — to spread across North America and carry democracy and Protestant Christianity with them.'
    ),
    buildRule(
      'That the United States should form a military alliance with Mexico.',
      'This option does not accurately reflect the passage or question context.',
      'Incorrect. Manifest Destiny justified war with Mexico (not alliance with it) in order to seize western lands; it never advocated a U.S.–Mexican military partnership.'
    ),
    buildRule(
      'That Native American tribes should be given full citizenship.',
      'This is not the correct answer based on the information provided.',
      'Incorrect. Manifest Destiny was used to justify the removal of Native American tribes from their lands, not to extend citizenship to them.'
    ),

    // ===== Q7: Transcontinental Railroad =====
    buildRule(
      'The Lewis and Clark Expedition',
      'This answer is incorrect. Review the passage carefully to find the correct information.',
      'Incorrect. The Lewis and Clark Expedition occurred from 1804 to 1806 to explore the Louisiana Purchase — over 60 years before 1869 — and did not provide rapid coast-to-coast travel.'
    ),
    buildRule(
      'The construction of the Transcontinental Railroad',
      'The construction of the Transcontinental Railroad',
      'Correct. Completed at Promontory Summit, Utah in 1869, the Transcontinental Railroad linked the eastern rail network with the Pacific coast, dramatically cutting the cost and time of transcontinental travel and trade.'
    ),
    buildRule(
      'The California Gold Rush',
      'This answer is incorrect. Consider the key details in the question.',
      'Incorrect. The California Gold Rush peaked around 1848–1855 and drew migrants westward, but it did not build the transportation infrastructure described, and it predates 1869.'
    ),
    buildRule(
      'The passage of the Homestead Act',
      'This option does not accurately reflect the passage or question context.',
      'Incorrect. The Homestead Act was passed in 1862 and offered free land to settlers; it did not, by itself, provide the faster cross-country travel and trade described in the question.'
    ),

    // ===== Q8: Homestead Act =====
    buildRule(
      'To create national parks and preserve wilderness.',
      'This answer is incorrect. Consider the key details in the question.',
      'Incorrect. The Homestead Act distributed government land for cultivation and settlement; the federal national-park system began later, with Yellowstone in 1872.'
    ),
    buildRule(
      'To sell government land to railroad companies.',
      'This is not the correct answer based on the information provided.',
      'Incorrect. Land grants to railroads were made under separate Pacific Railroad Acts; the Homestead Act specifically gave 160-acre plots to individual settlers, not corporations.'
    ),
    buildRule(
      'To encourage the settlement of the American West by individual farmers.',
      'To encourage the settlement of the American West by individual farmers.',
      'Correct. The Act gave any qualifying adult citizen up to 160 acres of public land in exchange for building a home and farming it for five years, directly promoting individual western settlement.'
    ),
    buildRule(
      'To establish large, government-owned farms.',
      'While this might seem plausible, it is not supported by the information given.',
      'Incorrect. The Homestead Act transferred land out of government ownership into private hands of individual settlers, not into large state-run farms.'
    ),

    // ===== Q9: Trail of Tears =====
    buildRule(
      'The Oregon Trail',
      'This is not the correct answer based on the information provided.',
      'Incorrect. The Oregon Trail was a voluntary overland route used by settlers heading west; it was not the forced relocation of the Cherokee from the Southeast.'
    ),
    buildRule(
      'The Trail of Tears',
      'The Trail of Tears',
      'Correct. Following the Indian Removal Act of 1830, the U.S. government forcibly relocated the Cherokee and other tribes to Indian Territory (now Oklahoma); thousands died on the journey, which became known as the Trail of Tears.'
    ),
    buildRule(
      'The Great Migration',
      'This answer is incorrect. Consider the key details in the question.',
      'Incorrect. The Great Migration refers to the early-20th-century movement of African Americans from the rural South to northern cities, not the forced removal of the Cherokee in the 1830s.'
    ),
    buildRule(
      'The Santa Fe Trail',
      'While this might seem plausible, it is not supported by the information given.',
      'Incorrect. The Santa Fe Trail was a 19th-century commercial trade route between Missouri and New Mexico; it had nothing to do with the forced removal of the Cherokee Nation.'
    ),

    // ===== Q10: California Gold Rush =====
    buildRule(
      "A rapid increase in California's population and its admission to the Union as a state.",
      "A rapid increase in California's population and its admission to the Union as a state.",
      "Correct. As the passage notes, roughly 300,000 'forty-niners' poured into California after gold was discovered in 1848, swelling the population enough that California was admitted to the Union as a state in 1850."
    ),
    buildRule(
      'A war between the United States and Mexico.',
      'While this might seem plausible, it is not supported by the information given.',
      "Incorrect. The Mexican-American War (1846–1848) ended just before gold was discovered at Sutter's Mill; the Gold Rush was a consequence of that war's territorial transfer, not a cause of war."
    ),
    buildRule(
      'The discovery of a water route to the Pacific Ocean.',
      'This option does not accurately reflect the passage or question context.',
      'Incorrect. No new water route to the Pacific was discovered during the Gold Rush; migrants reached California overland or by sea around South America.'
    ),
    buildRule(
      'A decline in the value of gold.',
      'This is not the correct answer based on the information provided.',
      "Incorrect. Although large quantities of gold entered circulation, the major consequences described in the passage were demographic and political (population growth and statehood), not a collapse in gold's value."
    ),

    // ===== Q11: Oregon Trail motivation =====
    buildRule(
      'To find gold and become rich.',
      '"To find gold and become rich." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      'Incorrect. Gold-seekers used the California Trail to reach the gold fields; pioneers on the Oregon Trail were primarily heading to the fertile Willamette Valley to farm.'
    ),
    buildRule(
      'To establish new trade routes with Asia.',
      'This answer is incorrect. Review the passage carefully to find the correct information.',
      'Incorrect. The Oregon Trail was a wagon route across the continent for settlers; trans-Pacific trade with Asia was conducted by ship, not by overland pioneers.'
    ),
    buildRule(
      'To acquire fertile farmland and start new lives in the West.',
      'To acquire fertile farmland and start new lives in the West.',
      'Correct. Most Oregon Trail pioneers were drawn by reports of rich farmland in the Pacific Northwest and the chance to claim cheap or free land for homesteads.'
    ),
    buildRule(
      'To escape religious persecution in the East.',
      '"To escape religious persecution in the East." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      "Incorrect. Some religious groups (notably the Mormons) migrated west, but they used the Mormon Trail to Utah; the typical Oregon Trail pioneer's primary motive was farmland, not religious refuge."
    ),

    // ===== Q12: Mexican-American War =====
    buildRule(
      'The United States lost territory to Mexico.',
      'While this might seem plausible, it is not supported by the information given.',
      'Incorrect. The opposite occurred: under the Treaty of Guadalupe Hidalgo, Mexico ceded the Mexican Cession to the United States, not the other way around.'
    ),
    buildRule(
      'The United States acquired a vast amount of territory, significantly expanding its borders.',
      'The United States acquired a vast amount of territory, significantly expanding its borders.',
      'Correct. The Treaty of Guadalupe Hidalgo (1848) transferred a huge area — including modern California, Nevada, Utah, and parts of several other states — to the United States, dramatically enlarging the country.'
    ),
    buildRule(
      'Mexico and the United States formed a permanent military alliance.',
      'This is not the correct answer based on the information provided.',
      'Incorrect. The war ended with a peace treaty and a territorial cession, not a military alliance; the two nations remained separate sovereign states.'
    ),
    buildRule(
      'The issue of slavery in the new territories was permanently resolved.',
      'This answer is incorrect. Consider the key details in the question.',
      'Incorrect. Whether slavery would be allowed in the newly acquired lands became one of the most divisive issues of the 1850s, leading to the Compromise of 1850 and ultimately the Civil War.'
    ),
  ];

  let total = 0;
  for (const t of TARGETS) {
    const fp = path.resolve(t);
    const n = applyRulesToFile(fp, RULES);
    console.log(`  ${t}: ${n} replacements`);
    total += n;
  }
  console.log(`Total replacements: ${total}`);
}
