// sim/careers.js
// Career state logic

import careers from '../data/careers.json';
import { applyMonthlyRaises } from './economy.js';

export function initCareerState(careerDef) {
  return {
    currentTitle: careerDef.title,
    currentBasePay:
      careerDef.type === 'salary' ? careerDef.salary : careerDef.hourly,
    type: careerDef.type,
    hours_per_week: careerDef.hours_per_week,
    raise: careerDef.raise,
    promotion: careerDef.promotion,
    monthsInRole: 0,
  };
}

export function advanceCareer(careerState, perfScore) {
  return applyMonthlyRaises(careerState, perfScore);
}
