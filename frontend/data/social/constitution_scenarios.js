// Practice scenarios for Constitution Explorer
export const PRACTICE_SCENARIOS = [
  {
    id: 'scn_001',
    pack: 'speech_press',
    prompt: 'A city passes a law banning peaceful protests in public parks.',
    correctAmendmentId: '1st',
    explanation:
      'The First Amendment protects the right to assembly and petition, so banning peaceful protests infringes those rights.',
    difficulty: 'easy',
    tags: ['assembly', 'petition', 'speech_press'],
  },
  {
    id: 'scn_002',
    pack: 'criminal_procedure',
    prompt:
      'Police search a home without a warrant or probable cause and seize evidence.',
    correctAmendmentId: '4th',
    explanation:
      'The Fourth Amendment protects against unreasonable searches and seizures and generally requires a warrant based on probable cause.',
    difficulty: 'medium',
    tags: ['criminal_procedure', 'privacy'],
  },
  {
    id: 'scn_003',
    pack: 'criminal_procedure',
    prompt:
      'A suspect is compelled to testify against themselves during a criminal trial.',
    correctAmendmentId: '5th',
    explanation:
      'The Fifth Amendment protects against self-incrimination and ensures due process.',
    difficulty: 'hard',
    tags: ['criminal_procedure', 'due_process'],
  },
  {
    id: 'scn_004',
    pack: 'civil_rights',
    prompt:
      'A state denies equal protection of the laws to a group of citizens.',
    correctAmendmentId: '14th',
    explanation:
      'The Fourteenth Amendment guarantees equal protection and due process for all persons.',
    difficulty: 'hard',
    tags: ['civil_rights', 'equal_protection'],
  },
];
