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
];
