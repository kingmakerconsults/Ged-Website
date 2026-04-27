// Soft skills daily prompts. Pick deterministically by date so the same
// prompt appears for everyone on the same day.

export const SOFT_SKILLS_PROMPTS = [
  // Communication
  'Describe a time you had to explain something complex to someone with no background. What worked?',
  'Write 3 sentences pitching yourself for a job — no jargon, no "I am passionate about".',
  'Reply to a difficult email in your head right now: what is your opening line?',
  'When was the last time you actively listened (no phone, no interrupting)? What changed?',
  'Practice giving a 30-second update on a task you\u2019re working on.',

  // Teamwork & collaboration
  'What\u2019s one habit you have that makes group work easier? Harder?',
  'Describe a time you disagreed with a teammate. How did you keep it productive?',
  'Who on your last team did you learn the most from? Why?',
  'Write down 3 ways you contribute to a team beyond your specific job.',
  'When you\u2019re stuck, do you ask for help quickly or wait too long? Why?',

  // Time management
  'List your top 3 tasks for tomorrow. Which one is most important — and why?',
  'How long did your last "5-minute task" actually take?',
  'When are you most focused during the day? What kind of work fits there?',
  'What is one recurring task you could automate, batch, or eliminate?',
  'Write your end-of-day shutdown ritual (3 steps).',

  // Problem solving
  'Describe a problem you solved this week. What was your first wrong guess?',
  'Pick a frustration at work or home. List 3 different root causes for it.',
  'When you don\u2019t know how to do something, what is your first step?',
  'Describe a time a creative solution backfired. What did you learn?',
  'How do you decide when "good enough" is actually good enough?',

  // Adaptability
  'Describe the last time your plan got disrupted. How did you recover?',
  'What is one new tool or process you learned in the last 6 months?',
  'How do you stay calm when priorities change unexpectedly?',
  'What\u2019s a comfort-zone task you should hand off?',
  'What\u2019s a stretch task you should ask for?',

  // Emotional intelligence
  'Describe a time someone\u2019s emotion surprised you. Why?',
  'What\u2019s your tell when you\u2019re stressed? Who notices first?',
  'When did you last apologize at work? What did you learn?',
  'Name a coworker\u2019s strength they may not see in themselves.',
  'How do you protect your energy when working with a draining person?',

  // Leadership & ownership
  'When did you take ownership of something nobody asked you to own?',
  'What\u2019s one team norm you would change tomorrow if you could?',
  'How do you give credit when an idea evolves through many people?',
  'Describe a time you held the line on quality when it would have been easier not to.',
  'When you make a mistake, what is your first sentence?',

  // Customer & service mindset
  'Who is the customer of your work? (Not always the obvious answer.)',
  'Describe the experience of being your customer. What sucks about it?',
  'What is one thing you could do this week to make a customer\u2019s life easier?',
  'When you say no to a customer, what comes next?',
  'How do you find out what a customer actually needs vs. what they ask for?',

  // Self-care & resilience
  'What does a recovery day look like for you?',
  'Name something you used to find hard that\u2019s now easy.',
  'Where do you feel "behind" lately? Is the comparison fair?',
  'Write one sentence of permission you\u2019d give yourself this week.',
  'List 3 wins from this week — work, life, anything.',

  // Career & growth
  'What skill do you want to be known for in 2 years?',
  'Who is one person you\u2019d like to learn from? What would you ask?',
  'What feedback have you heard more than once? Are you doing anything about it?',
  'Describe your dream job — only the daily texture, not the title.',
  'What\u2019s one piece of work you\u2019d show in an interview? Why?',

  // Workplace ethics
  'Describe an ethical line you would not cross at work. Why that line?',
  'When have you spoken up when it would have been easier to stay quiet?',
  'How do you handle witnessing something you suspect is wrong?',
  'What\u2019s your policy on personal phone use during work hours?',
  'Have you ever said "this isn\u2019t my job" — and was it the right call?',

  // Networking & relationships
  'Who in your network haven\u2019t you talked to in 3+ months?',
  'Write a 2-sentence message to someone you admire.',
  'What\u2019s the smallest favor you could ask someone today?',
  'Who has helped your career and never been thanked?',
  'How do you remember details about people (kids\u2019 names, projects, etc.)?',
];

export function dailyPromptForDate(date = new Date()) {
  // Index by day-of-year for deterministic same-day result.
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return {
    index: day % SOFT_SKILLS_PROMPTS.length,
    text: SOFT_SKILLS_PROMPTS[day % SOFT_SKILLS_PROMPTS.length],
  };
}
