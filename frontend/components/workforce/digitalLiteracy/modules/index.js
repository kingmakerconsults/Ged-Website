/**
 * modules/index.js — registry of all 22 Digital Literacy modules.
 * Imported by DigitalLiteracyAcademy to render the bucketed list.
 *
 * Each module file exports { MODULE } with:
 *   { id, title, standardId, standardLabel, bucket, intro, learningGoals,
 *     simComponent, quiz }
 */
import { MODULE as A1 } from './bucketA/PhoneKeyboardLogin.jsx';
import { MODULE as A2 } from './bucketA/BasicComputerSkills.jsx';
import { MODULE as A3 } from './bucketA/InternetBasics.jsx';
import { MODULE as A4 } from './bucketA/UsingEmail.jsx';
import { MODULE as A5 } from './bucketA/Windows10.jsx';
import { MODULE as A6 } from './bucketA/Windows11.jsx';
import { MODULE as A7 } from './bucketA/MacOS.jsx';
import { MODULE as B1 } from './bucketB/MsWord.jsx';
import { MODULE as B2 } from './bucketB/MsExcel.jsx';
import { MODULE as B3 } from './bucketB/MsPowerPoint.jsx';
import { MODULE as B4 } from './bucketB/GoogleDocs.jsx';
import { MODULE as C1 } from './bucketC/SocialMedia.jsx';
import { MODULE as C2 } from './bucketC/InformationLiteracy.jsx';
import { MODULE as C3 } from './bucketC/CareerSearchSkills.jsx';
import { MODULE as C4 } from './bucketC/K12DistanceLearning.jsx';
import { MODULE as C5 } from './bucketC/Telehealth.jsx';
import { MODULE as C6 } from './bucketC/DigitalFootprint.jsx';
import { MODULE as C7 } from './bucketC/Cybersecurity.jsx';
import { MODULE as D1 } from './bucketD/AiLiteracy.jsx';
import { MODULE as D2 } from './bucketD/SmartphonePrivacy.jsx';
import { MODULE as D3 } from './bucketD/VideoConferencing.jsx';
import { MODULE as D4 } from './bucketD/WebAccessibility.jsx';
import { MODULE as D5 } from './bucketD/CivicGovServices.jsx';

export const BUCKETS = [
  {
    key: 'A',
    title: 'Essential Computer Skills',
    desc: 'Northstar Bucket A — devices, OS, browsing, email.',
    modules: [A1, A2, A3, A4, A5, A6, A7],
  },
  {
    key: 'B',
    title: 'Essential Software Skills',
    desc: 'Northstar Bucket B — Word, Excel, PowerPoint, Google Docs.',
    modules: [B1, B2, B3, B4],
  },
  {
    key: 'C',
    title: 'Using Technology in Daily Life',
    desc: 'Northstar Bucket C — social, info literacy, career, K-12, telehealth, footprint, cybersecurity.',
    modules: [C1, C2, C3, C4, C5, C6, C7],
  },
  {
    key: 'D',
    title: 'Modern & Workforce (Beyond Northstar)',
    desc: 'AI literacy, smartphone privacy, video conferencing, accessibility, civic services.',
    modules: [D1, D2, D3, D4, D5],
  },
];

export const ALL_MODULES = BUCKETS.flatMap((b) => b.modules);

export function findModule(id) {
  return ALL_MODULES.find((m) => m.id === id);
}
