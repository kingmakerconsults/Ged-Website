// Job-search practice prompts. One per day, deterministic by date index.
// Keep prompts concrete and finishable in 15–60 minutes.

export const JOB_SEARCH_PROMPTS = [
  'Apply to 3 entry-level roles that match your top skill.',
  'Update your resume with one quantified achievement (numbers, %, or $).',
  'Reach out to 1 person on LinkedIn who works at a company you like.',
  'Write a 4-sentence elevator pitch about who you are and what you want.',
  'Research 1 employer: mission, products, recent news, and culture.',
  'Save 5 job postings and tag each with what skill they emphasize most.',
  'Practice answering "Tell me about yourself" out loud, twice.',
  'Customize a cover letter for one specific role.',
  'Ask 1 friend or family member to review your resume.',
  'List 3 transferable skills from a non-job experience (volunteer, school, hobby).',
  'Find 2 free certificates you could earn in under 1 week.',
  'Check your email and LinkedIn for any messages you forgot to reply to.',
  'Write a follow-up message for a role you applied to >1 week ago.',
  'Review 3 of your past job descriptions and rewrite one bullet using STAR.',
  'Search for "[your city] hiring events" and bookmark the top 2 listings.',
  'Identify 1 industry you have not considered and find 3 jobs in it.',
  'Take a 10-minute personality / strengths quiz and write down your top 3.',
  'Refresh your professional photo (good light, plain background, smile).',
  'Practice one tough interview question with the STAR framework on paper.',
  'Set a 30-day goal: number of applications, networking touches, and skills.',
];

export function promptForToday(date = new Date()) {
  // Deterministic index based on day-of-year so the prompt is stable for a given day.
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return JOB_SEARCH_PROMPTS[day % JOB_SEARCH_PROMPTS.length];
}

// 12-question company research checklist used in Employer Research tab.
export const COMPANY_RESEARCH_CHECKLIST = [
  { key: 'mission', label: 'Mission / what they do (1 sentence)' },
  { key: 'products', label: 'Main products or services' },
  { key: 'size', label: 'Approximate company size (employees)' },
  { key: 'industry', label: 'Industry / sector' },
  { key: 'recentNews', label: 'Recent news or press in last 6 months' },
  { key: 'leadership', label: 'CEO or hiring manager name' },
  { key: 'culture', label: 'Glassdoor / Indeed rating + 1 review takeaway' },
  { key: 'benefits', label: 'Notable benefits (health, PTO, remote)' },
  { key: 'competitors', label: 'Top 1–2 competitors' },
  { key: 'growth', label: 'Hiring or growing? Any recent funding?' },
  { key: 'whyMe', label: 'Why YOU specifically — 1 sentence' },
  { key: 'questions', label: '2 questions to ask in the interview' },
];

// Salary explainer roles. Median + p25/p75 are illustrative US 2024 figures
// used as conservative anchors; real numbers vary by metro and experience.
// Cost-of-living note is generic guidance, not city-specific.
export const SALARY_ROLES = [
  { role: 'Customer Service Representative', p25: 33000, median: 39000, p75: 47000 },
  { role: 'Administrative Assistant', p25: 36000, median: 44000, p75: 53000 },
  { role: 'Medical Assistant', p25: 35000, median: 42000, p75: 50000 },
  { role: 'Certified Nursing Assistant (CNA)', p25: 32000, median: 38000, p75: 45000 },
  { role: 'Home Health Aide', p25: 28000, median: 33000, p75: 40000 },
  { role: 'Pharmacy Technician', p25: 33000, median: 40000, p75: 49000 },
  { role: 'Dental Assistant', p25: 36000, median: 44000, p75: 53000 },
  { role: 'Retail Sales Associate', p25: 27000, median: 32000, p75: 39000 },
  { role: 'Warehouse Associate', p25: 32000, median: 38000, p75: 45000 },
  { role: 'Forklift Operator', p25: 36000, median: 42000, p75: 50000 },
  { role: 'CDL Truck Driver', p25: 45000, median: 55000, p75: 70000 },
  { role: 'HVAC Technician', p25: 42000, median: 52000, p75: 65000 },
  { role: 'Electrician (Apprentice)', p25: 38000, median: 48000, p75: 60000 },
  { role: 'Plumber (Apprentice)', p25: 38000, median: 49000, p75: 62000 },
  { role: 'Welder', p25: 39000, median: 48000, p75: 60000 },
  { role: 'Cook / Line Cook', p25: 28000, median: 33000, p75: 40000 },
  { role: 'Restaurant Server', p25: 25000, median: 32000, p75: 42000 },
  { role: 'Hotel Front Desk Agent', p25: 28000, median: 33000, p75: 40000 },
  { role: 'Security Guard', p25: 30000, median: 36000, p75: 44000 },
  { role: 'IT Help Desk Technician', p25: 40000, median: 50000, p75: 62000 },
  { role: 'Junior Web Developer', p25: 50000, median: 65000, p75: 85000 },
  { role: 'Bookkeeper', p25: 36000, median: 45000, p75: 56000 },
  { role: 'Bank Teller', p25: 32000, median: 37000, p75: 44000 },
  { role: 'Childcare Worker', p25: 26000, median: 31000, p75: 38000 },
  { role: 'Teacher Assistant', p25: 27000, median: 32000, p75: 39000 },
];
