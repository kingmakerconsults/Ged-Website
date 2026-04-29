// Structured amendments database for Constitution Explorer — all 27 amendments
export const AMENDMENTS_DB = [
  {
    id: '1st',
    topic: 'Freedoms',
    simple: 'Freedom of speech, religion, press, assembly, and petition.',
    original:
      'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
    difficulty: 'easy',
    tags: ['speech_press', 'religion', 'assembly', 'petition'],
  },
  {
    id: '2nd',
    topic: 'Arms',
    simple: 'Right to keep and bear arms (own guns).',
    original:
      'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
    difficulty: 'medium',
    tags: ['civil_rights'],
  },
  {
    id: '3rd',
    topic: 'Quartering',
    simple:
      'The government cannot force citizens to house soldiers in peacetime.',
    original:
      'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.',
    difficulty: 'easy',
    tags: ['civil_rights', 'privacy'],
  },
  {
    id: '4th',
    topic: 'Privacy',
    simple:
      'Protection against unreasonable searches and seizures (need a warrant).',
    original:
      'The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'privacy'],
  },
  {
    id: '5th',
    topic: 'Due Process',
    simple:
      'Right to remain silent; no double jeopardy; due process required; just compensation for taken property.',
    original:
      'No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury... nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.',
    difficulty: 'hard',
    tags: ['criminal_procedure', 'due_process', 'takings'],
  },
  {
    id: '6th',
    topic: 'Trial',
    simple:
      'Right to a speedy, public trial by jury and the right to a lawyer.',
    original:
      'In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed... and to have the Assistance of Counsel for his defence.',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'trial_rights'],
  },
  {
    id: '7th',
    topic: 'Civil Jury',
    simple:
      'The right to a jury trial in civil (non-criminal) lawsuits over $20.',
    original:
      'In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved, and no fact tried by a jury, shall be otherwise re-examined in any Court of the United States, than according to the rules of the common law.',
    difficulty: 'medium',
    tags: ['trial_rights', 'civil_law'],
  },
  {
    id: '8th',
    topic: 'Punishment',
    simple: 'No cruel or unusual punishment; no excessive bail or fines.',
    original:
      'Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.',
    difficulty: 'easy',
    tags: ['criminal_procedure', 'punishment'],
  },
  {
    id: '9th',
    topic: 'Unenumerated Rights',
    simple:
      'Rights not listed in the Constitution are still held by the people.',
    original:
      'The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.',
    difficulty: 'hard',
    tags: ['civil_rights', 'reserved_rights'],
  },
  {
    id: '10th',
    topic: "States' Rights",
    simple:
      'Powers not given to the federal government belong to the states or the people.',
    original:
      'The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.',
    difficulty: 'medium',
    tags: ['federalism', 'reserved_rights'],
  },
  {
    id: '11th',
    topic: 'State Immunity',
    simple:
      'Citizens of other states (or foreign countries) cannot sue a state in federal court.',
    original:
      'The Judicial power of the United States shall not be construed to extend to any suit in law or equity, commenced or prosecuted against one of the United States by Citizens of another State, or by Citizens or Subjects of any Foreign State.',
    difficulty: 'hard',
    tags: ['federalism', 'judicial_power'],
  },
  {
    id: '12th',
    topic: 'Electoral College',
    simple: 'Electors cast separate ballots for President and Vice President.',
    original:
      'The Electors shall meet in their respective states, and vote by ballot for President and Vice-President... the person having the greatest Number of votes for President, shall be the President, if such number be a majority of the whole number of Electors appointed.',
    difficulty: 'hard',
    tags: ['elections', 'executive'],
  },
  {
    id: '13th',
    topic: 'Abolition of Slavery',
    simple: 'Abolished slavery and involuntary servitude in the United States.',
    original:
      'Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction.',
    difficulty: 'easy',
    tags: ['civil_rights'],
  },
  {
    id: '14th',
    topic: 'Citizenship & Equality',
    simple:
      'Anyone born or naturalized in the US is a citizen; guarantees equal protection and due process.',
    original:
      'All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside. No State shall... deny to any person within its jurisdiction the equal protection of the laws.',
    difficulty: 'hard',
    tags: ['civil_rights', 'equal_protection', 'due_process', 'citizenship'],
  },
  {
    id: '15th',
    topic: 'Voting Rights (Race)',
    simple: 'The right to vote cannot be denied based on race or color.',
    original:
      'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude.',
    difficulty: 'easy',
    tags: ['civil_rights', 'voting'],
  },
  {
    id: '16th',
    topic: 'Income Tax',
    simple: 'Congress has the power to collect a federal income tax.',
    original:
      'The Congress shall have power to lay and collect taxes on incomes, from whatever source derived, without apportionment among the several States, and without regard to any census or enumeration.',
    difficulty: 'medium',
    tags: ['taxation', 'government_power'],
  },
  {
    id: '17th',
    topic: 'Direct Senate Elections',
    simple: 'US Senators are elected directly by the people of each state.',
    original:
      'The Senate of the United States shall be composed of two Senators from each State, elected by the people thereof, for six years; and each Senator shall have one vote.',
    difficulty: 'medium',
    tags: ['elections', 'legislative'],
  },
  {
    id: '18th',
    topic: 'Prohibition',
    simple: 'Banned the manufacture, sale, and transport of alcohol.',
    original:
      'After one year from the ratification of this article the manufacture, sale, or transportation of intoxicating liquors within, the importation thereof into, or the exportation thereof from the United States and all territory subject to the jurisdiction thereof for beverage purposes is hereby prohibited.',
    difficulty: 'easy',
    tags: ['social_policy'],
  },
  {
    id: '19th',
    topic: 'Voting Rights (Sex)',
    simple: "Women's right to vote — cannot be denied based on sex.",
    original:
      'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex.',
    difficulty: 'easy',
    tags: ['civil_rights', 'voting'],
  },
  {
    id: '20th',
    topic: 'Presidential Terms',
    simple:
      'Sets the start date of presidential and congressional terms; reduces the "lame duck" period.',
    original:
      'The terms of the President and the Vice President shall end at noon on the 20th day of January... and the terms of Senators and Representatives at noon on the 3d day of January.',
    difficulty: 'medium',
    tags: ['elections', 'executive', 'legislative'],
  },
  {
    id: '21st',
    topic: 'Repeal of Prohibition',
    simple: 'Repealed the 18th Amendment; alcohol is legal again.',
    original:
      'The eighteenth article of amendment to the Constitution of the United States is hereby repealed.',
    difficulty: 'easy',
    tags: ['social_policy'],
  },
  {
    id: '22nd',
    topic: 'Presidential Term Limits',
    simple: 'A President can only be elected to two terms.',
    original:
      'No person shall be elected to the office of the President more than twice, and no person who has held the office of President, or acted as President, for more than two years of a term to which some other person was elected President shall be elected to the office of the President more than once.',
    difficulty: 'medium',
    tags: ['executive', 'elections'],
  },
  {
    id: '23rd',
    topic: 'DC Electoral Votes',
    simple: 'Washington, D.C. gets electoral votes for President.',
    original:
      'The District constituting the seat of Government of the United States shall appoint in such manner as Congress may direct: A number of electors of President and Vice President equal to the whole number of Senators and Representatives in Congress to which the District would be entitled if it were a State.',
    difficulty: 'medium',
    tags: ['elections', 'electoral_college'],
  },
  {
    id: '24th',
    topic: 'Poll Tax Ban',
    simple: 'Banned charging a fee (poll tax) to vote in federal elections.',
    original:
      'The right of citizens of the United States to vote in any primary or other election for President or Vice President, for electors for President or Vice President, or for Senator or Representative in Congress, shall not be denied or abridged by the United States or any State by reason of failure to pay poll tax or other tax.',
    difficulty: 'medium',
    tags: ['civil_rights', 'voting'],
  },
  {
    id: '25th',
    topic: 'Presidential Succession',
    simple:
      'Establishes who becomes President if the President dies, is removed, or is unable to serve.',
    original:
      'In case of the removal of the President from office or of his death or resignation, the Vice President shall become President.',
    difficulty: 'medium',
    tags: ['executive', 'government_power'],
  },
  {
    id: '26th',
    topic: 'Voting Age',
    simple: 'The voting age is 18; it cannot be raised above 18.',
    original:
      'The right of citizens of the United States, who are eighteen years of age or older, to vote shall not be denied or abridged by the United States or by any State on account of age.',
    difficulty: 'easy',
    tags: ['civil_rights', 'voting'],
  },
  {
    id: '27th',
    topic: 'Congressional Pay',
    simple:
      'Congress cannot give itself a pay raise that takes effect immediately — it must wait until the next election.',
    original:
      'No law, varying the compensation for the services of the Senators and Representatives, shall take effect, until an election of Representatives shall have intervened.',
    difficulty: 'medium',
    tags: ['legislative', 'government_power'],
  },
];

// Packs group scenarios by theme
export const PACKS = [
  { id: 'criminal_procedure', label: 'Criminal Procedure Pack' },
  { id: 'civil_rights', label: 'Civil Rights Pack' },
  { id: 'speech_press', label: 'Press & Speech Pack' },
  { id: 'voting_rights', label: 'Voting Rights Pack' },
  { id: 'federalism', label: 'Federalism & States Pack' },
  { id: 'elections', label: 'Elections & Government Pack' },
];
