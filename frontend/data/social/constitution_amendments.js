// Structured amendments database for Constitution Explorer
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
    simple: 'Right to remain silent; no double jeopardy; due process required.',
    original:
      'No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury... nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.',
    difficulty: 'hard',
    tags: ['criminal_procedure', 'due_process', 'takings'],
  },
  {
    id: '6th',
    topic: 'Trial',
    simple: 'Right to a speedy, public trial and a lawyer.',
    original:
      'In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed... and to have the Assistance of Counsel for his defence.',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'trial_rights'],
  },
  {
    id: '8th',
    topic: 'Punishment',
    simple: 'No cruel or unusual punishment; no excessive bail.',
    original:
      'Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.',
    difficulty: 'easy',
    tags: ['criminal_procedure', 'punishment'],
  },
  {
    id: '13th',
    topic: 'Slavery',
    simple: 'Abolished slavery in the United States.',
    original:
      'Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction.',
    difficulty: 'easy',
    tags: ['civil_rights'],
  },
  {
    id: '14th',
    topic: 'Equality',
    simple:
      'Grants citizenship to anyone born in the US; guarantees equal protection under the law.',
    original:
      'All persons born or naturalized in the United States... nor deny to any person within its jurisdiction the equal protection of the laws.',
    difficulty: 'hard',
    tags: ['civil_rights', 'equal_protection', 'due_process'],
  },
  {
    id: '19th',
    topic: 'Voting (Sex)',
    simple: "Women's right to vote.",
    original:
      'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex.',
    difficulty: 'medium',
    tags: ['civil_rights', 'voting'],
  },
];

// Future: packs can group scenarios by theme
export const PACKS = [
  { id: 'criminal_procedure', label: 'Criminal Procedure Pack' },
  { id: 'civil_rights', label: 'Civil Rights Pack' },
  { id: 'speech_press', label: 'Press & Speech Pack' },
];
