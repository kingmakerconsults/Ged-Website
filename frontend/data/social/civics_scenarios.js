/**
 * civics_scenarios.js - Civics Reasoning Lab data
 * Government structure, branches, and checks-and-balances scenarios
 */

export const CIVICS_SCENARIOS = [
  {
    id: 'veto_1',
    difficulty: 'easy',
    tags: ['federal', 'executive', 'checks_and_balances'],
    text: 'The President refuses to sign a bill that Congress passed. What branch of government is this power from?',
    correctBranch: 'executive',
    correctLevel: 'federal',
    correctPowerType: 'check_on_legislative',
    explanation:
      'The President (executive branch) can veto legislation passed by Congress. This is a check on the legislative branch, a key part of our system of checks and balances.',
  },
  {
    id: 'judicial_review_1',
    difficulty: 'medium',
    tags: ['federal', 'judicial', 'judicial_review'],
    text: 'The Supreme Court rules that a law passed by Congress is unconstitutional.',
    correctBranch: 'judicial',
    correctLevel: 'federal',
    correctPowerType: 'judicial_review',
    explanation:
      'The judicial branch uses judicial review to interpret laws and strike down those that violate the Constitution. This power allows the courts to check both the legislative and executive branches.',
  },
  {
    id: 'senate_ratify_treaty',
    difficulty: 'easy',
    tags: ['federal', 'legislative', 'checks_and_balances'],
    text: 'The Senate votes to approve a treaty signed by the President.',
    correctBranch: 'legislative',
    correctLevel: 'federal',
    correctPowerType: 'check_on_executive',
    explanation:
      'The Senate (part of Congress) must ratify international treaties signed by the President. This ensures that the executive cannot unilaterally commit the nation to international agreements.',
  },
  {
    id: 'impeachment_1',
    difficulty: 'medium',
    tags: ['federal', 'legislative', 'checks_and_balances'],
    text: 'The House of Representatives votes to impeach a federal judge.',
    correctBranch: 'legislative',
    correctLevel: 'federal',
    correctPowerType: 'check_on_judicial',
    explanation:
      'Congress can impeach federal judges (and other officials) for "high crimes and misdemeanors." The House brings charges, and the Senate conducts the trial. This is the legislative branch checking the judicial branch.',
  },
  {
    id: 'state_governor_veto',
    difficulty: 'medium',
    tags: ['state', 'executive', 'checks_and_balances'],
    text: 'A state governor vetoes a bill passed by the state legislature.',
    correctBranch: 'executive',
    correctLevel: 'state',
    correctPowerType: 'check_on_legislative',
    explanation:
      'State governors have the same veto power that the President has at the federal level. This allows the state executive to block legislation from the state legislature.',
  },
  {
    id: 'local_school_board_1',
    difficulty: 'easy',
    tags: ['local', 'legislative', 'education'],
    text: 'The local school board votes to approve a new curriculum for all elementary schools.',
    correctBranch: 'legislative',
    correctLevel: 'local',
    correctPowerType: 'passes_laws',
    explanation:
      'School boards are local legislative bodies that make decisions about education. They pass policies and regulations governing public schools in their district.',
  },
  {
    id: 'city_council_budget',
    difficulty: 'easy',
    tags: ['local', 'legislative', 'budget'],
    text: 'The city council approves the municipal budget for the next fiscal year.',
    correctBranch: 'legislative',
    correctLevel: 'local',
    correctPowerType: 'passes_laws',
    explanation:
      'City councils are local legislative bodies that control municipal budgets and pass local ordinances. They represent the interests of citizens in their city or town.',
  },
  {
    id: 'senate_confirm_judge',
    difficulty: 'medium',
    tags: ['federal', 'legislative', 'checks_and_balances'],
    text: 'The Senate votes to confirm a Supreme Court justice nominated by the President.',
    correctBranch: 'legislative',
    correctLevel: 'federal',
    correctPowerType: 'check_on_executive',
    explanation:
      'The President nominates Supreme Court justices, but the Senate must confirm them. This ensures that the judiciary is not controlled solely by the executive branch.',
  },
  {
    id: 'state_tax_law',
    difficulty: 'easy',
    tags: ['state', 'legislative', 'taxes'],
    text: 'The state legislature passes a new income tax law.',
    correctBranch: 'legislative',
    correctLevel: 'state',
    correctPowerType: 'passes_laws',
    explanation:
      'State legislatures have the power to levy taxes within their state. These taxes fund state services like education, infrastructure, and public safety.',
  },
  {
    id: 'fed_reserve_interest_rates',
    difficulty: 'hard',
    tags: ['federal', 'executive', 'economic'],
    text: 'The Federal Reserve Board adjusts interest rates to control inflation.',
    correctBranch: 'executive',
    correctLevel: 'federal',
    correctPowerType: 'enforces_laws',
    explanation:
      'The Federal Reserve, part of the executive branch, controls monetary policy by adjusting interest rates. This is separate from Congress and is designed to regulate the economy and manage inflation.',
  },
  {
    id: 'constitutional_amendment',
    difficulty: 'hard',
    tags: ['federal', 'legislative', 'constitution'],
    text: 'Congress proposes an amendment to the Constitution, and the states vote to ratify it.',
    correctBranch: 'legislative',
    correctLevel: 'federal',
    correctPowerType: 'check_on_constitution',
    explanation:
      'Amending the Constitution requires a two-thirds vote in both houses of Congress, followed by ratification by three-fourths of the states. This is the most fundamental power of the legislative branch.',
  },
  {
    id: 'state_court_ruling',
    difficulty: 'medium',
    tags: ['state', 'judicial', 'judicial_review'],
    text: 'A state supreme court rules that a state law violates the state constitution.',
    correctBranch: 'judicial',
    correctLevel: 'state',
    correctPowerType: 'judicial_review',
    explanation:
      'State courts have the power to interpret state laws and constitutions. Like federal courts, they can strike down laws they find unconstitutional.',
  },
  {
    id: 'mayor_appoints_police_chief',
    difficulty: 'easy',
    tags: ['local', 'executive', 'appointments'],
    text: 'The mayor appoints a new police chief to run the city police department.',
    correctBranch: 'executive',
    correctLevel: 'local',
    correctPowerType: 'enforces_laws',
    explanation:
      'Mayors are the chief executives of cities and towns. They appoint officials to manage city departments and enforce local laws and ordinances.',
  },
  // ── New scenarios ─────────────────────────────────────────────────────
  {
    id: 'congress_declares_war',
    difficulty: 'medium',
    tags: ['federal', 'legislative', 'war_powers'],
    text: 'Congress votes to formally declare war on a foreign nation.',
    correctBranch: 'legislative',
    correctLevel: 'federal',
    correctPowerType: 'passes_laws',
    explanation:
      'The Constitution gives Congress — not the President — the power to formally declare war. This is a key legislative power intended to prevent any single person from leading the country into war alone.',
  },
  {
    id: 'president_executive_order',
    difficulty: 'medium',
    tags: ['federal', 'executive', 'executive_power'],
    text: 'The President signs an executive order directing all federal agencies to adopt a new environmental policy.',
    correctBranch: 'executive',
    correctLevel: 'federal',
    correctPowerType: 'enforces_laws',
    explanation:
      'Executive orders are official directives signed by the President that have the force of law and are used to manage federal operations. They do not require Congressional approval.',
  },
  {
    id: 'state_legislature_education',
    difficulty: 'easy',
    tags: ['state', 'legislative', 'education'],
    text: 'The state legislature passes a law requiring all students to pass a standardized exit exam to graduate high school.',
    correctBranch: 'legislative',
    correctLevel: 'state',
    correctPowerType: 'passes_laws',
    explanation:
      'Education policy is largely a state responsibility under the 10th Amendment. State legislatures set education standards and requirements within their states.',
  },
  {
    id: 'override_veto',
    difficulty: 'hard',
    tags: ['federal', 'legislative', 'checks_and_balances'],
    text: 'The President vetoes a bill, but both the House and Senate vote by a two-thirds majority to override the veto.',
    correctBranch: 'legislative',
    correctLevel: 'federal',
    correctPowerType: 'check_on_executive',
    explanation:
      "Congress can override a presidential veto with a two-thirds majority in both chambers. This is the legislative check on the executive's veto power.",
  },
  {
    id: 'federal_court_injunction',
    difficulty: 'hard',
    tags: ['federal', 'judicial', 'judicial_review'],
    text: 'A federal district court issues an injunction blocking a presidential executive order from taking effect.',
    correctBranch: 'judicial',
    correctLevel: 'federal',
    correctPowerType: 'check_on_executive',
    explanation:
      'Federal courts can issue injunctions blocking executive actions they find unconstitutional or illegal. This is a judicial check on executive power.',
  },
  {
    id: 'state_driver_license',
    difficulty: 'easy',
    tags: ['state', 'executive', 'enforces_laws'],
    text: "The state DMV (Department of Motor Vehicles) issues driver's licenses and enforces traffic laws.",
    correctBranch: 'executive',
    correctLevel: 'state',
    correctPowerType: 'enforces_laws',
    explanation:
      'State executive departments and agencies implement and enforce state laws. The DMV is a state executive agency; issuing licenses is an executive function.',
  },
  {
    id: 'house_appropriations',
    difficulty: 'medium',
    tags: ['federal', 'legislative', 'budget'],
    text: 'The House of Representatives passes a spending bill that funds all federal agencies for the next year.',
    correctBranch: 'legislative',
    correctLevel: 'federal',
    correctPowerType: 'passes_laws',
    explanation:
      'The Constitution gives Congress the "power of the purse." All federal spending bills must originate in the House of Representatives. Without congressional approval, the executive branch cannot spend money.',
  },
  {
    id: 'local_zoning_board',
    difficulty: 'easy',
    tags: ['local', 'legislative', 'zoning'],
    text: 'The county zoning board approves a new housing development plan.',
    correctBranch: 'legislative',
    correctLevel: 'local',
    correctPowerType: 'passes_laws',
    explanation:
      'Local zoning and planning boards are quasi-legislative bodies that regulate land use within a local jurisdiction. Their decisions have the force of local law.',
  },
  {
    id: 'supreme_court_appeals',
    difficulty: 'medium',
    tags: ['federal', 'judicial', 'appellate'],
    text: 'The Supreme Court agrees to hear an appeal from a citizen who believes their civil rights were violated by a state law.',
    correctBranch: 'judicial',
    correctLevel: 'federal',
    correctPowerType: 'judicial_review',
    explanation:
      'The Supreme Court is the highest court in the land and can hear appeals from lower courts. When it reviews whether a law violates the Constitution, that is judicial review.',
  },
  {
    id: 'state_governor_pardons',
    difficulty: 'medium',
    tags: ['state', 'executive', 'pardon'],
    text: 'The governor grants a pardon to a prisoner convicted of a state crime.',
    correctBranch: 'executive',
    correctLevel: 'state',
    correctPowerType: 'enforces_laws',
    explanation:
      "Governors have the power to pardon individuals convicted of state crimes, reducing or eliminating their sentence. This is an executive power, mirroring the President's pardon power at the federal level.",
  },
  {
    id: 'congress_investigates',
    difficulty: 'hard',
    tags: ['federal', 'legislative', 'oversight'],
    text: 'A Senate committee subpoenas officials from the executive branch to testify about how federal money was spent.',
    correctBranch: 'legislative',
    correctLevel: 'federal',
    correctPowerType: 'check_on_executive',
    explanation:
      'Congress has oversight power over the executive branch and can compel officials to testify through subpoenas. This keeps the executive branch accountable to the legislature.',
  },
  {
    id: 'county_sheriff',
    difficulty: 'easy',
    tags: ['local', 'executive', 'law_enforcement'],
    text: "The county sheriff's department enforces laws and patrols unincorporated areas of the county.",
    correctBranch: 'executive',
    correctLevel: 'local',
    correctPowerType: 'enforces_laws',
    explanation:
      'The county sheriff is an elected executive official who runs law enforcement for the county. Enforcing laws is a core executive function at all levels of government.',
  },
];
