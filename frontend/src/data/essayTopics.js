// frontend/src/data/essayTopics.js
// Mirror of the GED Essay Practice Tool's argument topics so the
// collaborative essay session can reuse the same topic list.
// Keep this list in sync with `passagesData` in
// frontend/src/legacy/LegacyRootApp.jsx (Essay Practice Tool component).

export const ESSAY_TOPICS = [
  'Should the Voting Age Be Lowered to 16?',
  'Is Universal Basic Income (UBI) a Viable Solution to Poverty?',
  'Should Governments Aggressively Subsidize Renewable Energy?',
  'Does Social Media Do More Harm Than Good for Teen Mental Health?',
  'Should Schools Ban the Use of Smartphones in the Classroom?',
  'Should Homework in High School Be Limited to One Hour per Night?',
  'Should Public Transit Be Free in Major Cities?',
  'Should Schools Adopt Year-Round Academic Calendars?',
  'Should Cities Ban Single-Use Plastic Bags?',
  'Should Public Colleges Be Tuition-Free?',
  'Should Voting Be Compulsory in National Elections?',
  'Should School Cafeterias Adopt Plant-Forward Menus?',
  'Should Cities Implement Congestion Pricing for Downtown Driving?',
  'Should Public Schools Enforce Strict Student Dress Codes?',
  'Should High Schools Require a Financial Literacy Course for Graduation?',
];

export function buildEssayPromptForTopic(topic) {
  return `After reading both passages about "${topic}", write an essay in which you explain which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.`;
}
