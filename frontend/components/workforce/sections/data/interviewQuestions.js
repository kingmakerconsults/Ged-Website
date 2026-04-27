// Interview question bank. Categorized for filtering. Mix of behavioral,
// situational, and entry-level role-specific questions appropriate for
// adult learners completing GED + entering or re-entering the workforce.

export const INTERVIEW_QUESTIONS = [
  // --- Behavioral (16) ---
  { id: 'b1', category: 'Behavioral', text: 'Tell me about yourself.' },
  { id: 'b2', category: 'Behavioral', text: 'Why are you interested in this role?' },
  { id: 'b3', category: 'Behavioral', text: 'What are your greatest strengths?' },
  { id: 'b4', category: 'Behavioral', text: 'What is a weakness you are working on?' },
  { id: 'b5', category: 'Behavioral', text: 'Describe a time you overcame a difficult challenge.' },
  { id: 'b6', category: 'Behavioral', text: 'Tell me about a time you had to learn a new skill quickly.' },
  { id: 'b7', category: 'Behavioral', text: 'Give an example of a time you worked with a difficult coworker.' },
  { id: 'b8', category: 'Behavioral', text: 'Describe a time you made a mistake. How did you handle it?' },
  { id: 'b9', category: 'Behavioral', text: 'Tell me about a goal you set and how you achieved it.' },
  { id: 'b10', category: 'Behavioral', text: 'Describe a time you led a project or a team.' },
  { id: 'b11', category: 'Behavioral', text: 'Tell me about a time you received critical feedback.' },
  { id: 'b12', category: 'Behavioral', text: 'Describe a time you missed a deadline.' },
  { id: 'b13', category: 'Behavioral', text: 'Tell me about a proud accomplishment outside of work or school.' },
  { id: 'b14', category: 'Behavioral', text: 'Why are you leaving your current job (or why did you leave your last one)?' },
  { id: 'b15', category: 'Behavioral', text: 'Where do you see yourself in 3 years?' },
  { id: 'b16', category: 'Behavioral', text: 'Why should we hire you over other candidates?' },

  // --- Situational (15) ---
  { id: 's1', category: 'Situational', text: 'A coworker keeps interrupting you in meetings. What do you do?' },
  { id: 's2', category: 'Situational', text: 'You disagree with your manager\u2019s decision. How do you handle it?' },
  { id: 's3', category: 'Situational', text: 'You finish your work early. What do you do?' },
  { id: 's4', category: 'Situational', text: 'A customer is yelling at you about something that is not your fault. Walk me through your response.' },
  { id: 's5', category: 'Situational', text: 'You are asked to do something you have never done. What is your approach?' },
  { id: 's6', category: 'Situational', text: 'Two managers give you tasks at the same time. How do you prioritize?' },
  { id: 's7', category: 'Situational', text: 'You notice a coworker doing something against company policy. What do you do?' },
  { id: 's8', category: 'Situational', text: 'You realize halfway through a shift that you made an error on a previous order. What now?' },
  { id: 's9', category: 'Situational', text: 'You are running late for work. Walk me through what you do.' },
  { id: 's10', category: 'Situational', text: 'A team member is not pulling their weight. How do you address it?' },
  { id: 's11', category: 'Situational', text: 'You are asked to work weekends for the next month. How do you respond?' },
  { id: 's12', category: 'Situational', text: 'Your computer crashes 30 minutes before a deadline. What do you do?' },
  { id: 's13', category: 'Situational', text: 'A coworker confides in you about a personal problem. What is your approach?' },
  { id: 's14', category: 'Situational', text: 'You are given an instruction that conflicts with your training. What do you do?' },
  { id: 's15', category: 'Situational', text: 'You are training a new hire who is making the same mistake repeatedly. What do you do?' },

  // --- Role-specific: Customer-facing (10) ---
  { id: 'c1', category: 'Customer-facing', text: 'How do you stay calm with an angry customer?' },
  { id: 'c2', category: 'Customer-facing', text: 'Describe a time you turned an unhappy customer into a happy one.' },
  { id: 'c3', category: 'Customer-facing', text: 'How would you upsell or recommend an additional product?' },
  { id: 'c4', category: 'Customer-facing', text: 'A customer asks for something against store policy. What do you say?' },
  { id: 'c5', category: 'Customer-facing', text: 'How do you handle multiple customers needing help at once?' },
  { id: 'c6', category: 'Customer-facing', text: 'What does excellent customer service look like to you?' },
  { id: 'c7', category: 'Customer-facing', text: 'How do you handle a customer who says "I want to speak to your manager"?' },
  { id: 'c8', category: 'Customer-facing', text: 'Describe a time you went above and beyond for a customer.' },
  { id: 'c9', category: 'Customer-facing', text: 'A customer is rude but the request is reasonable. How do you respond?' },
  { id: 'c10', category: 'Customer-facing', text: 'How would you politely end an unproductive conversation?' },

  // --- Role-specific: Healthcare / Direct care (8) ---
  { id: 'h1', category: 'Healthcare', text: 'Why do you want to work in healthcare?' },
  { id: 'h2', category: 'Healthcare', text: 'How do you maintain patient confidentiality (HIPAA)?' },
  { id: 'h3', category: 'Healthcare', text: 'Describe a time you provided compassionate care under stress.' },
  { id: 'h4', category: 'Healthcare', text: 'How do you handle a patient who refuses care?' },
  { id: 'h5', category: 'Healthcare', text: 'What would you do if you witnessed unsafe care from a coworker?' },
  { id: 'h6', category: 'Healthcare', text: 'How do you stay organized during a busy shift?' },
  { id: 'h7', category: 'Healthcare', text: 'Tell me about a time you advocated for a patient or resident.' },
  { id: 'h8', category: 'Healthcare', text: 'Describe how you would respond to a fall or medical emergency.' },

  // --- Role-specific: Trades / Warehouse / Driving (7) ---
  { id: 't1', category: 'Trades', text: 'How do you keep yourself safe on the job?' },
  { id: 't2', category: 'Trades', text: 'Describe your experience reading blueprints, schematics, or work orders.' },
  { id: 't3', category: 'Trades', text: 'Tell me about a time you spotted a safety issue and reported it.' },
  { id: 't4', category: 'Trades', text: 'How do you handle physically demanding shifts?' },
  { id: 't5', category: 'Trades', text: 'How comfortable are you with PPE and lockout/tagout?' },
  { id: 't6', category: 'Trades', text: 'Describe a problem you solved using only the tools available.' },
  { id: 't7', category: 'Trades', text: 'Why did you choose this trade?' },

  // --- Closing (4) ---
  { id: 'cl1', category: 'Closing', text: 'What questions do you have for us?' },
  { id: 'cl2', category: 'Closing', text: 'What are your salary expectations?' },
  { id: 'cl3', category: 'Closing', text: 'When could you start?' },
  { id: 'cl4', category: 'Closing', text: 'Is there anything we did not cover that you want us to know?' },
];

export const INTERVIEW_CATEGORIES = [
  'All',
  'Behavioral',
  'Situational',
  'Customer-facing',
  'Healthcare',
  'Trades',
  'Closing',
];
