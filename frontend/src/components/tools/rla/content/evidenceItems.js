// Each item: short passage broken into sentences, a claim, and the
// index of the sentence that best supports the claim.
export const EVIDENCE_ITEMS = [
  {
    id: 'e1',
    claim: 'Community gardens improve neighborhood food access.',
    sentences: [
      'The Maple Street community garden was started in 2019 by three volunteer families.',
      'Members rotate watering and weeding shifts on a shared online calendar.',
      'Last summer, the garden distributed more than 1,200 pounds of free vegetables to nearby residents.',
      'A local artist painted a mural on the garden\u2019s back fence.',
    ],
    correctIndex: 2,
    explanation:
      'The donation total is a direct measure of improved food access, while the other sentences describe management or aesthetics.',
  },
  {
    id: 'e2',
    claim:
      'The new bike lanes have reduced collisions in the downtown corridor.',
    sentences: [
      'The downtown bike lanes were painted bright green in 2023.',
      'Cyclists report feeling safer when cars are clearly separated from bikes.',
      'Police data show a 38 percent drop in bike-car collisions on the corridor since the lanes opened.',
      'Some drivers complain that the lanes shrink turning space at intersections.',
    ],
    correctIndex: 2,
    explanation:
      'Collision data directly supports the claim. Driver complaints and rider opinions are weaker forms of evidence for safety.',
  },
  {
    id: 'e3',
    claim: 'Free online tutoring helped students improve in algebra.',
    sentences: [
      'Several school districts launched free online tutoring during the pandemic.',
      'Students could log in any evening and chat with a tutor in real time.',
      'After one semester, average algebra grades rose by half a letter grade among students who attended at least three sessions.',
      'Tutors were recruited from local universities.',
    ],
    correctIndex: 2,
    explanation:
      'The grade improvement is the measurable outcome that supports the claim about academic gains.',
  },
  {
    id: 'e4',
    claim: 'The author believes the city should expand recycling options.',
    sentences: [
      'Recycling rates in our city have stalled at 21 percent for three years running.',
      'Many neighborhoods still lack curbside pickup for glass and electronics.',
      'Adding monthly pickup for these items would eliminate the most common excuse residents give for tossing recyclables in the trash.',
      'A 2022 EPA report defines high recycling rates as anything above 35 percent.',
    ],
    correctIndex: 2,
    explanation:
      'Sentence 3 directly recommends an expansion, which most clearly aligns with the author\u2019s position.',
  },
  {
    id: 'e5',
    claim: 'Reading habits among teenagers have declined.',
    sentences: [
      'A national survey reported that 17-year-olds who read for fun every day fell from 31 percent in 1984 to 16 percent in 2023.',
      'Many high schools still assign at least four novels per year.',
      'Some teens prefer podcasts and audiobooks over print.',
      'Public libraries continue to expand their teen sections.',
    ],
    correctIndex: 0,
    explanation:
      'The survey statistic is the strongest evidence of a decline; the other sentences describe related context but not the trend.',
  },
  {
    id: 'e6',
    claim: 'A four-day workweek can boost employee productivity.',
    sentences: [
      'Many companies have experimented with shortening the workweek.',
      'In a 2022 trial of 61 UK companies, output stayed steady or improved while staff worked one fewer day per week.',
      'Some employees use the extra day off for medical appointments.',
      'Switching to a four-day week often requires adjusting customer-service hours.',
    ],
    correctIndex: 1,
    explanation:
      'The trial outcome directly tests productivity; the other sentences describe practical effects but not productivity itself.',
  },
  {
    id: 'e7',
    claim:
      'Wearing a helmet significantly reduces head injuries among cyclists.',
    sentences: [
      'Helmets come in many styles and price ranges.',
      'A meta-analysis of 64 studies found that helmet use reduced serious head injuries among cyclists by about 60 percent.',
      'Local laws differ on whether helmets are required.',
      'Some riders feel that helmets are uncomfortable on long trips.',
    ],
    correctIndex: 1,
    explanation:
      'A meta-analysis with a percent-reduction figure is the strongest form of evidence for the safety claim.',
  },
  {
    id: 'e8',
    claim: 'After-school sports programs help students stay engaged in school.',
    sentences: [
      'After-school sports include soccer, basketball, and track in most middle schools.',
      'Coaches often double as classroom teachers.',
      'A district report found that students in after-school sports had attendance rates 12 percent higher than peers who did not participate.',
      'Practices typically run from 3:30 to 5 p.m.',
    ],
    correctIndex: 2,
    explanation:
      'The attendance comparison is the clearest measure of engagement linked to the programs.',
  },
];
