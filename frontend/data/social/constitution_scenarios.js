// Practice scenarios for Constitution Explorer
export const PRACTICE_SCENARIOS = [
  // ─── 1st Amendment ───
  {
    id: 'scn_001',
    pack: 'speech_press',
    prompt: 'A city passes a law banning peaceful protests in public parks.',
    correctAmendmentId: '1st',
    explanation:
      'The First Amendment protects the right to peaceable assembly and petition. A blanket ban on peaceful protests in public spaces directly violates those rights.',
    difficulty: 'easy',
    tags: ['assembly', 'petition', 'speech_press'],
  },
  {
    id: 'scn_002b',
    pack: 'speech_press',
    prompt:
      'A state law requires all newspapers to get government approval before publishing political opinions.',
    correctAmendmentId: '1st',
    explanation:
      'The First Amendment prohibits "prior restraint" — the government cannot censor the press before publication. This is a core freedom of the press protection.',
    difficulty: 'medium',
    tags: ['speech_press'],
  },
  {
    id: 'scn_002c',
    pack: 'speech_press',
    prompt:
      'A public school principal punishes a student for wearing an armband to protest a government policy.',
    correctAmendmentId: '1st',
    explanation:
      'The First Amendment protects symbolic speech. Public school students do not "shed their constitutional rights at the schoolhouse gate" (Tinker v. Des Moines).',
    difficulty: 'medium',
    tags: ['speech_press', 'assembly'],
  },
  {
    id: 'scn_002d',
    pack: 'speech_press',
    prompt:
      'Congress passes a law declaring one religion the official religion of the United States.',
    correctAmendmentId: '1st',
    explanation:
      'The First Amendment\'s Establishment Clause says Congress cannot make any law "respecting an establishment of religion." A state religion is directly prohibited.',
    difficulty: 'easy',
    tags: ['religion'],
  },
  // ─── 2nd Amendment ───
  {
    id: 'scn_002e',
    pack: 'civil_rights',
    prompt:
      'A federal law bans all private citizens from owning any type of firearm.',
    correctAmendmentId: '2nd',
    explanation:
      'The Second Amendment protects the individual right to keep and bear arms. A complete federal ban would conflict with this right.',
    difficulty: 'easy',
    tags: ['civil_rights'],
  },
  // ─── 3rd Amendment ───
  {
    id: 'scn_003b',
    pack: 'civil_rights',
    prompt:
      "In peacetime, the government orders a family to allow soldiers to live in their home without the family's consent.",
    correctAmendmentId: '3rd',
    explanation:
      "The Third Amendment prohibits the quartering of soldiers in private homes during peacetime without the owner's consent.",
    difficulty: 'easy',
    tags: ['civil_rights', 'privacy'],
  },
  // ─── 4th Amendment ───
  {
    id: 'scn_004b',
    pack: 'criminal_procedure',
    prompt:
      'Police search a home without a warrant or probable cause and seize evidence.',
    correctAmendmentId: '4th',
    explanation:
      'The Fourth Amendment protects against unreasonable searches and seizures. Warrantless, no-probable-cause searches are generally unconstitutional.',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'privacy'],
  },
  {
    id: 'scn_004c',
    pack: 'criminal_procedure',
    prompt:
      'Officers pull over a driver and search the entire car without any reason to suspect a crime.',
    correctAmendmentId: '4th',
    explanation:
      'The Fourth Amendment requires reasonable suspicion or probable cause for a vehicle search. A search without any justification violates this protection.',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'privacy'],
  },
  // ─── 5th Amendment ───
  {
    id: 'scn_005b',
    pack: 'criminal_procedure',
    prompt:
      'A suspect is forced to testify against themselves in their own criminal trial.',
    correctAmendmentId: '5th',
    explanation:
      'The Fifth Amendment includes the right against self-incrimination. Defendants cannot be compelled to be witnesses against themselves.',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'due_process'],
  },
  {
    id: 'scn_005c',
    pack: 'criminal_procedure',
    prompt:
      'A person is found not guilty of robbery. The prosecutor then charges the same person with the same robbery a second time.',
    correctAmendmentId: '5th',
    explanation:
      "The Fifth Amendment's Double Jeopardy Clause prevents a person from being tried twice for the same crime after an acquittal.",
    difficulty: 'medium',
    tags: ['criminal_procedure'],
  },
  {
    id: 'scn_005d',
    pack: 'criminal_procedure',
    prompt:
      "The city demolishes a family's home to build a highway but refuses to pay the family anything.",
    correctAmendmentId: '5th',
    explanation:
      'The Fifth Amendment\'s Takings Clause requires "just compensation" when the government takes private property for public use (eminent domain).',
    difficulty: 'hard',
    tags: ['takings', 'due_process'],
  },
  // ─── 6th Amendment ───
  {
    id: 'scn_006b',
    pack: 'criminal_procedure',
    prompt:
      'A defendant cannot afford a lawyer. The court denies the request for a court-appointed attorney.',
    correctAmendmentId: '6th',
    explanation:
      'The Sixth Amendment guarantees the right to counsel. If a defendant cannot afford a lawyer in a criminal case, the government must provide one (Gideon v. Wainwright).',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'trial_rights'],
  },
  {
    id: 'scn_006c',
    pack: 'criminal_procedure',
    prompt:
      'A defendant is held in jail for three years awaiting trial without being brought before a judge.',
    correctAmendmentId: '6th',
    explanation:
      'The Sixth Amendment guarantees the right to a speedy trial. Holding someone for years without a trial violates this protection.',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'trial_rights'],
  },
  // ─── 8th Amendment ───
  {
    id: 'scn_008b',
    pack: 'criminal_procedure',
    prompt: 'A judge sets a $5,000,000 bail for a minor shoplifting charge.',
    correctAmendmentId: '8th',
    explanation:
      'The Eighth Amendment prohibits excessive bail. Setting an extreme bail amount for a minor offense would be considered excessive.',
    difficulty: 'easy',
    tags: ['criminal_procedure', 'punishment'],
  },
  {
    id: 'scn_008c',
    pack: 'criminal_procedure',
    prompt:
      'A prison uses a form of punishment that most people agree is torturous and inhumane.',
    correctAmendmentId: '8th',
    explanation:
      'The Eighth Amendment bans "cruel and unusual punishments." Courts look at whether punishment shocks the conscience or goes beyond what society considers acceptable.',
    difficulty: 'easy',
    tags: ['criminal_procedure', 'punishment'],
  },
  // ─── 10th Amendment ───
  {
    id: 'scn_010b',
    pack: 'federalism',
    prompt:
      "The federal government tries to force states to enforce a federal gun law, even though the Constitution doesn't give Congress that specific power.",
    correctAmendmentId: '10th',
    explanation:
      'The Tenth Amendment reserves powers not given to the federal government to the states or the people. The federal government cannot commandeer state officials to enforce federal law.',
    difficulty: 'hard',
    tags: ['federalism', 'reserved_rights'],
  },
  // ─── 13th Amendment ───
  {
    id: 'scn_013b',
    pack: 'civil_rights',
    prompt:
      'After the Civil War, a Southern state passes a law requiring formerly enslaved people to work for their former owners under threat of arrest.',
    correctAmendmentId: '13th',
    explanation:
      'The Thirteenth Amendment abolished slavery and involuntary servitude throughout the United States. Laws designed to re-create servitude violate the 13th Amendment.',
    difficulty: 'easy',
    tags: ['civil_rights'],
  },
  // ─── 14th Amendment ───
  {
    id: 'scn_014b',
    pack: 'civil_rights',
    prompt:
      'A state denies equal protection of the laws to a minority group of citizens.',
    correctAmendmentId: '14th',
    explanation:
      "The Fourteenth Amendment's Equal Protection Clause requires every state to treat individuals equally under the law.",
    difficulty: 'medium',
    tags: ['civil_rights', 'equal_protection'],
  },
  {
    id: 'scn_014c',
    pack: 'civil_rights',
    prompt:
      'A child is born in the United States to foreign-national parents. The government claims the child is not a US citizen.',
    correctAmendmentId: '14th',
    explanation:
      'The Fourteenth Amendment guarantees birthright citizenship: "All persons born or naturalized in the United States... are citizens of the United States."',
    difficulty: 'medium',
    tags: ['civil_rights', 'citizenship'],
  },
  {
    id: 'scn_014d',
    pack: 'civil_rights',
    prompt:
      'A state school system provides much better facilities to white students than to Black students.',
    correctAmendmentId: '14th',
    explanation:
      "The Fourteenth Amendment's Equal Protection Clause was the basis of Brown v. Board of Education — states cannot create racially unequal education systems.",
    difficulty: 'hard',
    tags: ['civil_rights', 'equal_protection'],
  },
  // ─── 15th Amendment ───
  {
    id: 'scn_015b',
    pack: 'voting_rights',
    prompt:
      'A state passes a law saying only white men may vote in state elections.',
    correctAmendmentId: '15th',
    explanation:
      'The Fifteenth Amendment prohibits denying the right to vote based on race, color, or previous condition of servitude.',
    difficulty: 'easy',
    tags: ['civil_rights', 'voting'],
  },
  // ─── 16th Amendment ───
  {
    id: 'scn_016b',
    pack: 'elections',
    prompt: "A court rules that Congress has no power to tax people's wages.",
    correctAmendmentId: '16th',
    explanation:
      'The Sixteenth Amendment explicitly grants Congress the power to levy an income tax without apportioning it among the states.',
    difficulty: 'medium',
    tags: ['taxation', 'government_power'],
  },
  // ─── 17th Amendment ───
  {
    id: 'scn_017b',
    pack: 'elections',
    prompt:
      'A state legislature votes to choose the two US Senators for their state, rather than letting citizens vote.',
    correctAmendmentId: '17th',
    explanation:
      'The Seventeenth Amendment requires that US Senators be chosen by direct popular election, not by state legislatures.',
    difficulty: 'medium',
    tags: ['elections', 'legislative'],
  },
  // ─── 19th Amendment ───
  {
    id: 'scn_019b',
    pack: 'voting_rights',
    prompt:
      'A state law says only men may vote in gubernatorial (governor) elections.',
    correctAmendmentId: '19th',
    explanation:
      'The Nineteenth Amendment prohibits denying the right to vote based on sex. This applies to all elections, not just federal ones.',
    difficulty: 'easy',
    tags: ['civil_rights', 'voting'],
  },
  // ─── 22nd Amendment ───
  {
    id: 'scn_022b',
    pack: 'elections',
    prompt:
      'A very popular President wants to run for a third consecutive term in office.',
    correctAmendmentId: '22nd',
    explanation:
      'The Twenty-Second Amendment limits the President to two elected terms. No person can be elected President more than twice.',
    difficulty: 'easy',
    tags: ['executive', 'elections'],
  },
  // ─── 24th Amendment ───
  {
    id: 'scn_024b',
    pack: 'voting_rights',
    prompt:
      'A state requires citizens to pay a $10 fee before they can vote in a US Senate election.',
    correctAmendmentId: '24th',
    explanation:
      'The Twenty-Fourth Amendment bans poll taxes in federal elections. Charging any fee to vote in a federal election is unconstitutional.',
    difficulty: 'medium',
    tags: ['civil_rights', 'voting'],
  },
  // ─── 25th Amendment ───
  {
    id: 'scn_025b',
    pack: 'elections',
    prompt:
      'The President becomes seriously ill and is unable to carry out the duties of the office. Who takes over?',
    correctAmendmentId: '25th',
    explanation:
      'The Twenty-Fifth Amendment establishes the line of presidential succession and procedures for when a President is unable to serve. The Vice President assumes the role.',
    difficulty: 'medium',
    tags: ['executive', 'government_power'],
  },
  // ─── 26th Amendment ───
  {
    id: 'scn_026b',
    pack: 'voting_rights',
    prompt:
      'A state raises the voting age to 21, preventing 18-year-old citizens from voting.',
    correctAmendmentId: '26th',
    explanation:
      'The Twenty-Sixth Amendment guarantees the right to vote to all citizens 18 years old or older. No state can set the voting age higher than 18.',
    difficulty: 'easy',
    tags: ['civil_rights', 'voting'],
  },
  // ─── 27th Amendment ───
  {
    id: 'scn_027b',
    pack: 'elections',
    prompt:
      'Congress votes to increase its own salaries by 20%, effective immediately — before the next election.',
    correctAmendmentId: '27th',
    explanation:
      'The Twenty-Seventh Amendment states that any change to congressional pay cannot take effect until after the next House election. Congress cannot immediately pocket its own raise.',
    difficulty: 'medium',
    tags: ['legislative', 'government_power'],
  },
  // ─── Mixed / multi-concept ───
  {
    id: 'scn_mix_001',
    pack: 'civil_rights',
    prompt:
      "A formerly enslaved man was freed after the Civil War, but his state still won't let him vote because of his race.",
    correctAmendmentId: '15th',
    explanation:
      'The Fifteenth Amendment (1870) specifically addressed this: the right to vote cannot be denied based on race or "previous condition of servitude."',
    difficulty: 'medium',
    tags: ['civil_rights', 'voting'],
  },
  {
    id: 'scn_mix_002',
    pack: 'criminal_procedure',
    prompt:
      'A defendant is convicted of a crime and sentenced to 50 years in prison for stealing a candy bar.',
    correctAmendmentId: '8th',
    explanation:
      'The Eighth Amendment bars "cruel and unusual punishment." Courts weigh whether a sentence is grossly disproportionate to the crime.',
    difficulty: 'hard',
    tags: ['criminal_procedure', 'punishment'],
  },
  {
    id: 'scn_mix_003',
    pack: 'federalism',
    prompt:
      'The federal government passes a law requiring states to create and manage a national ID database — but the Constitution gives Congress no such power.',
    correctAmendmentId: '10th',
    explanation:
      'The Tenth Amendment reserves all non-delegated powers to the states or the people. The federal government cannot force states to administer federal programs.',
    difficulty: 'hard',
    tags: ['federalism', 'reserved_rights'],
  },
];
