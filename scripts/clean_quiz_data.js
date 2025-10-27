import fs from 'fs';
import { expandedQuizData } from '../frontend/data/quiz_data.js';

const cleanedData = `export const expandedQuizData = ${JSON.stringify(expandedQuizData, null, 4)};`;

fs.writeFileSync('frontend/data/quiz_data.js', cleanedData);
