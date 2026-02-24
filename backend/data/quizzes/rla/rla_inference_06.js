// Reading Comprehension — Core: Inference — Practice 6
// 10 questions | data-driven inference, cause-effect reasoning, distinguishing supported vs. unsupported conclusions
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "A 2022 poll of 3,000 American adults found that 61% could not name all three branches of the federal government. Among adults under 35, the figure was 71%. The same poll found that 44% of respondents said they could not explain what the First Amendment protects.",
    question: "What can be reasonably inferred from the poll results about civic knowledge?",
    answerOptions: [
      { text: "The majority of Americans have taken civics courses and passed them.", isCorrect: false, rationale: "No data on course completion is given." },
      { text: "There is a significant and widespread gap in basic civic knowledge among American adults, with younger adults showing even lower familiarity.", isCorrect: true, rationale: "61% unable to name three branches and 71% among under-35s directly support a widespread knowledge gap." },
      { text: "All Americans who can name all three branches are also familiar with the First Amendment.", isCorrect: false, rationale: "The poll measures two separate knowledge areas — no such correlation is stated." },
      { text: "The U.S. should eliminate its three-branch government structure.", isCorrect: false, rationale: "The poll reveals knowledge gaps, not a policy prescription." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "A hospital tracked hand-washing compliance among staff for six months. When reminder signs were posted near sinks, compliance rose from 42% to 67%. When the signs were removed for a follow-up period, compliance dropped back to 48% within two weeks.",
    question: "What does the drop after the signs were removed most reasonably suggest?",
    answerOptions: [
      { text: "Hospital staff forgot how to wash their hands.", isCorrect: false, rationale: "The issue is not knowledge — they washed at 67% when reminded. The behaviour declined, not the skill." },
      { text: "The signs served as behavioural prompts, and without them staff reverted to old habits rather than internalising the practice.", isCorrect: true, rationale: "If compliance were internalised, it would persist without signs. The rapid decline shows the signs were driving compliance, not a lasting habit change." },
      { text: "Hand-washing has no effect on patient health.", isCorrect: false, rationale: "The passage addresses compliance rates, not hand-washing outcomes." },
      { text: "The hospital should fire all non-compliant staff.", isCorrect: false, rationale: "This is a policy recommendation not supported by the data." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "A small fishing village recorded 400 annual fishing trips in 1980. By 2000, the total catch per trip had fallen by 58% despite the use of more efficient modern boats and equipment. By 2020, many fishing families had abandoned the trade entirely.",
    question: "What is the most reasonable inference about the state of fish populations over this period?",
    answerOptions: [
      { text: "Modern equipment caused fish to swim to deeper water temporarily.", isCorrect: false, rationale: "Temporary depth migration doesn't explain a 40-year decline across catch totals." },
      { text: "The fish population in the village's fishing waters likely declined substantially due to overfishing or environmental change.", isCorrect: true, rationale: "More efficient equipment plus dramatically lower catch per trip across 40 years strongly suggests resource depletion." },
      { text: "The fishing families left because they found higher-paying industries.", isCorrect: false, rationale: "The passage doesn't mention employment alternatives — the most direct inference is about fish populations." },
      { text: "Fishing in 2000 was less efficient than fishing in 1980.", isCorrect: false, rationale: "The passage says modern boats are more efficient — catch decline despite efficiency gains points to resource depletion." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "A school district introduced free breakfast for all students in 2019. By the end of the school year, tardiness dropped 18%, nurse visits for headaches and stomach aches fell 31%, and disciplinary referrals in morning classes decreased 22%. Test scores did not change significantly.",
    question: "What can be most reasonably inferred from these combined results?",
    answerOptions: [
      { text: "Free breakfast made students smarter, as shown by the test score data.", isCorrect: false, rationale: "Test scores did not change significantly — the data does not support an academic performance improvement." },
      { text: "Providing breakfast addressed physical needs that were interfering with attendance, health, and behaviour — though the academic benefit may take longer to appear.", isCorrect: true, rationale: "Three behavioural/health metrics improved while academic scores held steady, suggesting physical barriers were reduced even if cognitive gains need more time." },
      { text: "The programme was a failure because test scores did not increase.", isCorrect: false, rationale: "Three other significant improvements occurred — calling the programme a failure ignores those gains." },
      { text: "Students ate breakfast at home before the programme and ate double breakfasts after.", isCorrect: false, rationale: "No data on prior breakfast habits or double-eating is presented." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "A tech company surveyed 800 remote employees. Those who had a dedicated home office reported 23% higher productivity than those who worked from couches, beds, or kitchen tables. However, employees working from dedicated offices also reported 15% more difficulty 'disconnecting' from work at the end of the day.",
    question: "What trade-off does the survey data most clearly suggest?",
    answerOptions: [
      { text: "Remote work is always worse than office work.", isCorrect: false, rationale: "The survey compares two remote setups — it doesn't compare remote to in-office at all." },
      { text: "A dedicated home workspace may boost productivity but also blur the boundary between work and personal life, making it harder to stop working.", isCorrect: true, rationale: "Higher productivity plus difficulty disconnecting is a classic boundary-blurring trade-off — both findings point to the same spatial association." },
      { text: "Employees who work from couches are lazy.", isCorrect: false, rationale: "Lower productivity in a less structured space is not evidence of laziness — it may reflect ergonomics, distractions, or setup limitations." },
      { text: "All companies should require employees to have a home office.", isCorrect: false, rationale: "The survey describes correlations, not a policy prescription — and the disconnection cost is significant." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "The following data appeared in a city crime report: burglary rates in Westside fell by 34% in the year a neighbourhood watch programme was introduced. However, burglary rates in the adjacent Northside neighbourhood — with no watch programme — rose by 28% in the same year.",
    question: "What do these two data points together most reasonably suggest?",
    answerOptions: [
      { text: "The neighbourhood watch eliminated burglary from the entire city.", isCorrect: false, rationale: "Northside rates rose — the programme clearly did not eliminate citywide burglary." },
      { text: "Some burglars may have shifted their activity from Westside to Northside rather than stopping burglary altogether.", isCorrect: true, rationale: "A simultaneous fall in one area and rise in the adjacent area is a classic displacement pattern — burglars shifted locations rather than stopping." },
      { text: "Neighbourhood watches always reduce crime in every area they operate.", isCorrect: false, rationale: "This case shows crime displaced to an adjacent area — 'always' and 'every area' are unsupported generalisations." },
      { text: "The police failed to respond effectively to the Northside increase.", isCorrect: false, rationale: "Police response is not discussed — the data pattern is about displacement, not policing." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A nationwide study found that counties with the highest number of doctors per capita also had the highest rates of diagnostic surgeries. Critics argued this proved that doctors were performing unnecessary procedures. Defenders of the medical community pointed out that areas with more doctors may also attract sicker patients who travel for specialised care.",
    question: "Why does the defenders' alternative explanation weaken the critics' inference?",
    answerOptions: [
      { text: "It proves that all surgeries in those counties were medically necessary.", isCorrect: false, rationale: "'Proves all necessary' is too absolute — the defenders offer a plausible alternative, not definitive proof." },
      { text: "It identifies a confounding variable — patient migration to medical hubs — that could explain the correlation without concluding that doctors perform unnecessary procedures.", isCorrect: true, rationale: "If sicker patients travel to doctor-rich areas, higher surgery rates would be expected even without unnecessary procedures. This alternative explanation breaks the critics' causal chain." },
      { text: "It shows that the study's data was fabricated.", isCorrect: false, rationale: "The defenders accept the data — they dispute the interpretation, not the numbers." },
      { text: "It means fewer doctors should be trained in the future.", isCorrect: false, rationale: "Neither side argues for reducing the number of doctors." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A literary excerpt: 'Grandmother always set five places at the dinner table, even after Grandfather passed. The fifth plate gleamed, untouched, through every meal. When visitors asked about it, she would smile and change the subject. One evening, her grandson moved the plate to the cupboard. Grandmother set it back before the next meal without saying a word.'",
    question: "What does Grandmother's silent replacement of the plate most strongly reveal?",
    answerOptions: [
      { text: "She has forgotten that Grandfather passed away.", isCorrect: false, rationale: "Her smile and subject-changing when asked show awareness — this is not forgetfulness." },
      { text: "Maintaining the place setting is a deliberate act of continuing connection with Grandfather — removing it would make his absence feel final in a way she is not ready to accept.", isCorrect: true, rationale: "The silent, immediate restoration without explanation shows the ritual is deeply intentional and emotionally necessary." },
      { text: "She sets the plate for a visitor she expects to arrive.", isCorrect: false, rationale: "The pattern has continued since Grandfather's death and she deflects questions — it's not about an expected guest." },
      { text: "She is angry at her grandson for moving the plate.", isCorrect: false, rationale: "She replaces it silently without confrontation — this suggests quiet resolve, not anger." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "Between 1970 and 2020, the average American new-build house grew from 1,500 to 2,300 square feet. During the same period, the average household size shrank from 3.1 to 2.5 people. Home energy costs rose steadily, and surveys showed that the rooms cited as 'least used' were formal dining rooms and guest bedrooms.",
    question: "What do these combined trends most strongly suggest?",
    answerOptions: [
      { text: "Larger homes are always more comfortable than smaller ones.", isCorrect: false, rationale: "Comfort is subjective and not measured — unused rooms suggest the opposite." },
      { text: "Americans have been building increasingly large homes for shrinking households, resulting in substantial unused space and higher energy costs for rooms that serve little practical function.", isCorrect: true, rationale: "More square footage, fewer people, rising costs, and rooms identified as unused together create a clear pattern of excess space relative to need." },
      { text: "Home prices decreased as houses got larger.", isCorrect: false, rationale: "No price data is provided — and larger homes typically cost more, not less." },
      { text: "All Americans prefer smaller homes but are forced to buy large ones.", isCorrect: false, rationale: "No preference data or coercion is described — the trend reflects market choices, not forced behaviour." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A psychology experiment offered participants $5 to write an essay arguing a position they disagreed with. A second group was offered $1 for the same task. Surprisingly, the $1 group later reported greater agreement with the position they had argued than the $5 group. Researchers explained that the $5 group had sufficient external justification for writing the essay, while the $1 group did not.",
    question: "What does the researchers' explanation imply about how people resolve the discomfort of arguing a position they reject?",
    answerOptions: [
      { text: "People who are paid more always believe what they write.", isCorrect: false, rationale: "The opposite occurred — the $5 group showed less attitude change." },
      { text: "When external justification (like a larger payment) is insufficient, people may unconsciously shift their beliefs to reduce the internal conflict of having argued something they disagreed with.", isCorrect: true, rationale: "The $1 group had no strong external reason for writing the essay, so they resolved the discomfort by moving their beliefs toward the position — a core finding in cognitive dissonance research." },
      { text: "The $1 group wrote better essays than the $5 group.", isCorrect: false, rationale: "Essay quality is not discussed — the finding is about attitude change, not writing quality." },
      { text: "Participants in both groups lied about their opinions to seem consistent.", isCorrect: false, rationale: "The researchers frame this as genuine attitude shift, not lying — cognitive dissonance is an unconscious process." },
    ],
    challenge_tags: ['rla-2'],
  },
];