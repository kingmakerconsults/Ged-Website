/**
 * history_timeline_sets.js - History Timeline Builder data
 * Chronological ordering and cause-effect scenarios
 */

export const HISTORY_TIMELINE_SETS = [
  {
    id: 'civil_rights_basic',
    difficulty: 'medium',
    tags: ['us_history', 'civil_rights', '20th_century'],
    title: 'Key Civil Rights Events',
    events: [
      {
        id: 'brown_v_board',
        label: 'Brown v. Board of Education decision',
        year: 1954,
      },
      {
        id: 'montgomery_bus_boycott',
        label: 'Montgomery Bus Boycott',
        year: 1955,
      },
      { id: 'civil_rights_act', label: 'Civil Rights Act passed', year: 1964 },
      {
        id: 'voting_rights_act',
        label: 'Voting Rights Act passed',
        year: 1965,
      },
    ],
    explanation:
      'These events show the progression of the Civil Rights Movement. They demonstrate how legal challenges, grassroots activism, and legislative action worked together to advance racial equality.',
  },
  {
    id: 'american_independence',
    difficulty: 'easy',
    tags: ['us_history', 'colonial', 'revolution'],
    title: 'Path to American Independence',
    events: [
      {
        id: 'declaration_independence',
        label: 'Declaration of Independence signed',
        year: 1776,
      },
      {
        id: 'boston_tea_party',
        label: 'Boston Tea Party (protest)',
        year: 1773,
      },
      {
        id: 'revolutionary_war_starts',
        label: 'American Revolutionary War begins',
        year: 1775,
      },
      {
        id: 'treaty_paris',
        label: 'Treaty of Paris (British recognize independence)',
        year: 1783,
      },
    ],
    explanation:
      'These events trace the timeline from colonial grievances through the Revolutionary War to formal independence. Understanding this sequence is key to understanding American origins.',
  },
  {
    id: 'westward_expansion',
    difficulty: 'medium',
    tags: ['us_history', 'expansion', '19th_century'],
    title: 'Westward Expansion Timeline',
    events: [
      { id: 'louisiana_purchase', label: 'Louisiana Purchase', year: 1803 },
      { id: 'lewis_clark', label: 'Lewis & Clark Expedition', year: 1804 },
      {
        id: 'indian_removal_act',
        label: 'Indian Removal Act (forced relocation)',
        year: 1830,
      },
      {
        id: 'homestead_act',
        label: 'Homestead Act (land grants to settlers)',
        year: 1862,
      },
    ],
    explanation:
      'This timeline shows the expansion of the United States westward, including its effects on Native American populations. This period fundamentally shaped the geographic and political contours of the modern US.',
  },
  {
    id: 'world_war_2',
    difficulty: 'medium',
    tags: ['world_history', '20th_century', 'war'],
    title: 'World War II Key Events',
    events: [
      {
        id: 'germany_invades_poland',
        label: 'Germany invades Poland',
        year: 1939,
      },
      {
        id: 'pearl_harbor',
        label: 'Attack on Pearl Harbor (US enters war)',
        year: 1941,
      },
      { id: 'd_day', label: 'D-Day invasion of Normandy', year: 1944 },
      {
        id: 'japan_surrender',
        label: 'Japan surrenders (war ends)',
        year: 1945,
      },
    ],
    explanation:
      "These events outline World War II's major turning points, from initial Axis aggression to the eventual Allied victory. This war reshaped the global political order.",
  },
  {
    id: 'great_depression_new_deal',
    difficulty: 'hard',
    tags: ['us_history', 'economy', '20th_century'],
    title: 'Great Depression & New Deal Era',
    events: [
      {
        id: 'stock_market_crash',
        label: 'Stock Market Crash (Great Depression begins)',
        year: 1929,
      },
      {
        id: 'fdr_elected',
        label: 'Franklin D. Roosevelt elected president',
        year: 1932,
      },
      {
        id: 'new_deal_starts',
        label: 'New Deal programs begin',
        year: 1933,
      },
      {
        id: 'social_security',
        label: 'Social Security Act passed',
        year: 1935,
      },
    ],
    explanation:
      "The Great Depression was the worst economic crisis in American history. FDR's New Deal programs fundamentally expanded the federal government's role in providing economic relief and social safety nets.",
  },
  {
    id: 'american_industrial_revolution',
    difficulty: 'hard',
    tags: ['us_history', 'economy', '19th_century'],
    title: 'American Industrial Revolution',
    events: [
      { id: 'cotton_gin', label: 'Eli Whitney invents cotton gin', year: 1793 },
      {
        id: 'first_railroad',
        label: 'First successful US railroad (Baltimore & Ohio)',
        year: 1830,
      },
      { id: 'telegraph', label: 'Samuel Morse invents telegraph', year: 1844 },
      {
        id: 'transcontinental_railroad',
        label: 'Transcontinental Railroad completed',
        year: 1869,
      },
    ],
    explanation:
      'These technological innovations transformed American society from agricultural to industrial. They enabled mass production, rapid communication, and continental connection.',
  },
  {
    id: 'civil_war_reconstruction',
    difficulty: 'medium',
    tags: ['us_history', 'civil_war', '19th_century'],
    title: 'Civil War & Reconstruction',
    events: [
      {
        id: 'fort_sumter',
        label: 'Battle of Fort Sumter (war begins)',
        year: 1861,
      },
      {
        id: 'gettysburg',
        label: 'Battle of Gettysburg (turning point)',
        year: 1863,
      },
      {
        id: 'emancipation_proclamation',
        label: 'Emancipation Proclamation (enslaved people freed)',
        year: 1863,
      },
      {
        id: 'lee_surrenders',
        label: 'General Lee surrenders at Appomattox',
        year: 1865,
      },
    ],
    explanation:
      'The Civil War was fought to preserve the Union and end slavery. These events mark major military and political turning points in this pivotal conflict.',
  },
  {
    id: 'cold_war_early',
    difficulty: 'medium',
    tags: ['world_history', 'cold_war', '20th_century'],
    title: 'Early Cold War Events',
    events: [
      {
        id: 'berlin_blockade',
        label: 'Berlin Blockade and Airlift',
        year: 1948,
      },
      { id: 'korean_war', label: 'Korean War begins', year: 1950 },
      {
        id: 'cuban_missile_crisis',
        label: 'Cuban Missile Crisis (nuclear standoff)',
        year: 1962,
      },
      {
        id: 'soviet_space',
        label: 'Soviet Union launches Sputnik',
        year: 1957,
      },
    ],
    explanation:
      'These events define the early Cold War period between the United States and Soviet Union. They illustrate the ideological and military tensions that dominated post-WWII geopolitics.',
  },
  // ── New Timeline Sets ────────────────────────────────────────────────
  {
    id: 'womens_suffrage',
    difficulty: 'medium',
    tags: ['us_history', 'civil_rights', '20th_century'],
    title: "Women's Suffrage in America",
    events: [
      {
        id: 'seneca_falls',
        label: "Seneca Falls Convention — first women's rights convention",
        year: 1848,
      },
      {
        id: 'nawsa_founded',
        label: 'National American Woman Suffrage Association founded',
        year: 1890,
      },
      {
        id: 'womens_suffrage_wyoming',
        label: 'Wyoming becomes first state to grant women the vote',
        year: 1869,
      },
      {
        id: '19th_amendment',
        label: '19th Amendment ratified — women gain right to vote nationally',
        year: 1920,
      },
    ],
    explanation:
      "The fight for women's suffrage spanned over 70 years. The Seneca Falls Convention launched the formal movement, and decades of activism culminated in the 19th Amendment.",
  },
  {
    id: 'reconstruction_amendments',
    difficulty: 'medium',
    tags: ['us_history', 'civil_rights', '19th_century'],
    title: 'Reconstruction Era Amendments',
    events: [
      {
        id: '13th_amendment',
        label: '13th Amendment ratified — slavery abolished',
        year: 1865,
      },
      {
        id: 'civil_rights_act_1866',
        label:
          'Civil Rights Act of 1866 — citizenship for formerly enslaved people',
        year: 1866,
      },
      {
        id: '14th_amendment',
        label: '14th Amendment ratified — citizenship and equal protection',
        year: 1868,
      },
      {
        id: '15th_amendment',
        label: '15th Amendment ratified — voting rights regardless of race',
        year: 1870,
      },
    ],
    explanation:
      'The Reconstruction Amendments reshaped American law after the Civil War by abolishing slavery and establishing legal equality for formerly enslaved people.',
  },
  {
    id: 'space_race',
    difficulty: 'medium',
    tags: ['world_history', 'cold_war', '20th_century', 'science'],
    title: 'The Space Race',
    events: [
      {
        id: 'sputnik',
        label: 'Soviet Union launches Sputnik — first artificial satellite',
        year: 1957,
      },
      {
        id: 'yuri_gagarin',
        label: 'Yuri Gagarin becomes first human in space',
        year: 1961,
      },
      {
        id: 'apollo_11',
        label: 'Apollo 11 — first humans land on the Moon',
        year: 1969,
      },
      {
        id: 'nasa_founded',
        label: 'NASA established',
        year: 1958,
      },
    ],
    explanation:
      'The Space Race was part of the Cold War competition between the US and Soviet Union. The US victory with Apollo 11 marked a defining moment in human history.',
  },
  {
    id: 'world_war_1',
    difficulty: 'hard',
    tags: ['world_history', 'war', '20th_century'],
    title: 'World War I Timeline',
    events: [
      {
        id: 'archduke_assassinated',
        label: 'Archduke Franz Ferdinand assassinated — war begins',
        year: 1914,
      },
      {
        id: 'us_enters_wwi',
        label: 'United States enters World War I',
        year: 1917,
      },
      {
        id: 'armistice',
        label: 'Armistice signed — fighting ends',
        year: 1918,
      },
      {
        id: 'treaty_versailles',
        label: 'Treaty of Versailles — official peace settlement',
        year: 1919,
      },
    ],
    explanation:
      'World War I began with a political assassination and escalated into a global conflict. The harsh terms of the Treaty of Versailles contributed to the conditions that led to World War II.',
  },
  {
    id: 'civil_rights_extended',
    difficulty: 'hard',
    tags: ['us_history', 'civil_rights', '20th_century'],
    title: 'Civil Rights Movement — Deeper Timeline',
    events: [
      {
        id: 'emmett_till',
        label: 'Murder of Emmett Till — galvanizes civil rights movement',
        year: 1955,
      },
      {
        id: 'little_rock',
        label: 'Little Rock Nine integrate Arkansas high school',
        year: 1957,
      },
      {
        id: 'march_washington',
        label: 'March on Washington — "I Have a Dream" speech',
        year: 1963,
      },
      {
        id: 'selma_march',
        label: 'Selma to Montgomery marches',
        year: 1965,
      },
    ],
    explanation:
      'These events deepened and accelerated the Civil Rights Movement. Public attention to racial violence and powerful demonstrations of nonviolent protest pressured Congress to act.',
  },
  {
    id: 'american_revolution_expanded',
    difficulty: 'medium',
    tags: ['us_history', 'colonial', 'revolution'],
    title: 'Road to Revolution — Causes',
    events: [
      {
        id: 'proclamation_1763',
        label: 'Proclamation of 1763 — Britain limits colonial expansion',
        year: 1763,
      },
      {
        id: 'stamp_act',
        label: 'Stamp Act — first direct tax on colonists',
        year: 1765,
      },
      {
        id: 'boston_massacre',
        label: 'Boston Massacre — British soldiers kill colonists',
        year: 1770,
      },
      {
        id: 'intolerable_acts',
        label: 'Intolerable Acts — punishment for Boston Tea Party',
        year: 1774,
      },
    ],
    explanation:
      'These events show how British policies escalated colonial tensions toward revolution. Each act increased colonial resistance until armed conflict became inevitable.',
  },
  {
    id: 'immigration_early_20th',
    difficulty: 'medium',
    tags: ['us_history', 'immigration', '20th_century'],
    title: 'Immigration & Nativism in America',
    events: [
      {
        id: 'ellis_island_opens',
        label: 'Ellis Island immigration station opens',
        year: 1892,
      },
      {
        id: 'chinese_exclusion',
        label: 'Chinese Exclusion Act — restricts Chinese immigration',
        year: 1882,
      },
      {
        id: 'quota_act',
        label: 'Emergency Quota Act — limits European immigration',
        year: 1921,
      },
      {
        id: 'hart_celler',
        label: 'Hart-Celler Act — ends national-origin quotas',
        year: 1965,
      },
    ],
    explanation:
      'US immigration policy has shifted between openness and restriction. These events trace how racial and economic fears shaped immigration law over a century.',
  },
  {
    id: 'new_deal_programs',
    difficulty: 'hard',
    tags: ['us_history', 'economy', '20th_century'],
    title: 'New Deal — Key Programs',
    events: [
      {
        id: 'civilian_conservation',
        label: 'Civilian Conservation Corps (CCC) created — jobs for young men',
        year: 1933,
      },
      {
        id: 'fdic_created',
        label: 'FDIC created — insures bank deposits',
        year: 1933,
      },
      {
        id: 'social_security_act',
        label: 'Social Security Act — retirement and unemployment insurance',
        year: 1935,
      },
      {
        id: 'fair_labor_standards',
        label: 'Fair Labor Standards Act — minimum wage established',
        year: 1938,
      },
    ],
    explanation:
      "FDR's New Deal created the foundations of the modern American social safety net. These programs are still in effect today and represent the largest expansion of federal power since the Civil War.",
  },
  {
    id: 'cold_war_end',
    difficulty: 'hard',
    tags: ['world_history', 'cold_war', '20th_century'],
    title: 'End of the Cold War',
    events: [
      {
        id: 'reagan_election',
        label: 'Ronald Reagan elected — escalates military spending',
        year: 1980,
      },
      {
        id: 'gorbachev_reforms',
        label: 'Gorbachev introduces glasnost and perestroika in USSR',
        year: 1985,
      },
      {
        id: 'berlin_wall_falls',
        label: 'Berlin Wall falls',
        year: 1989,
      },
      {
        id: 'soviet_dissolves',
        label: 'Soviet Union officially dissolves',
        year: 1991,
      },
    ],
    explanation:
      'The Cold War ended not with war but with the internal collapse of the Soviet system. Political reform, economic failure, and popular uprisings in Eastern Europe brought down the Iron Curtain.',
  },
  {
    id: 'vietnam_era',
    difficulty: 'hard',
    tags: ['us_history', 'cold_war', 'war', '20th_century'],
    title: 'Vietnam War Era',
    events: [
      {
        id: 'gulf_of_tonkin',
        label:
          'Gulf of Tonkin Resolution — US escalates involvement in Vietnam',
        year: 1964,
      },
      {
        id: 'tet_offensive',
        label: 'Tet Offensive — major North Vietnamese assault',
        year: 1968,
      },
      {
        id: 'kent_state',
        label: 'Kent State shootings — anti-war protests intensify',
        year: 1970,
      },
      {
        id: 'paris_peace_accords',
        label: 'Paris Peace Accords — US withdraws from Vietnam',
        year: 1973,
      },
    ],
    explanation:
      'The Vietnam War was one of the most divisive conflicts in American history. It led to massive anti-war protests, eroded public trust in government, and ended in US withdrawal.',
  },
  {
    id: 'us_founding_documents',
    difficulty: 'easy',
    tags: ['us_history', 'government', 'colonial'],
    title: 'US Founding Documents',
    events: [
      {
        id: 'articles_of_confederation',
        label: 'Articles of Confederation — first US national government',
        year: 1781,
      },
      {
        id: 'constitutional_convention',
        label: 'Constitutional Convention — US Constitution written',
        year: 1787,
      },
      {
        id: 'constitution_ratified',
        label: 'US Constitution ratified',
        year: 1788,
      },
      {
        id: 'bill_of_rights',
        label: 'Bill of Rights ratified (first 10 amendments)',
        year: 1791,
      },
    ],
    explanation:
      "The US didn't get its current government structure right away. The Articles of Confederation were too weak, leading to the Constitutional Convention and eventually the Bill of Rights.",
  },
];
