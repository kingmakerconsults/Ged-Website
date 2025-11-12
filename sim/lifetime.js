// sim/lifetime.js
// Time, age, and pacing engine for 40-50 year simulation

export function initClock({ startAgeYears = 20, retirementTarget = 67, maxYears = 50 } = {}) {
  return {
    birthYear: 2025 - startAgeYears,
    currentYear: 2025,
    currentMonth: 0, // 0-11
    ageMonths: startAgeYears * 12,
    retirementTarget,
    maxYears,
    startAgeYears,
    monthsPassed: 0,
    autoAdvanceMs: 100, // milliseconds per month tick
    paused: false
  };
}

export function advanceOneMonth(clock) {
  clock.monthsPassed++;
  clock.ageMonths++;
  clock.currentMonth++;
  if (clock.currentMonth >= 12) {
    clock.currentMonth = 0;
    clock.currentYear++;
  }
}

export function getAgeYears(clock) {
  return clock.ageMonths / 12;
}

export function shouldPauseForCheckpoint(clock) {
  const ageYears = Math.floor(getAgeYears(clock));
  // Pause every 5 years after age 25
  return ageYears >= 25 && ageYears % 5 === 0 && clock.currentMonth === 0;
}

export function isRetirementAge(clock) {
  return getAgeYears(clock) >= clock.retirementTarget;
}

export function reachedEnd(clock) {
  return getAgeYears(clock) >= clock.startAgeYears + clock.maxYears;
}

export function getDecade(clock) {
  return Math.floor(getAgeYears(clock) / 10) * 10;
}

export function formatAge(clock) {
  const years = Math.floor(getAgeYears(clock));
  const months = clock.ageMonths % 12;
  return `${years}y ${months}m`;
}
