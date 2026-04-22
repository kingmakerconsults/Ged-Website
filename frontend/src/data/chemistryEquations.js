/**
 * Wrapper around the legacy `science_chemistry_equations.js` script that
 * assigns to `window.SCIENCE_CHEMISTRY_EQUATIONS`. Provides an ES module
 * surface so consuming components can import the data directly instead of
 * reading from the global.
 *
 * If the legacy global script has not loaded yet (e.g. during tests or SSR),
 * `getChemistryEquations()` returns an empty array. Components should call
 * the function lazily (not at module-evaluation time) so they pick up the
 * data once the page script tag has run.
 */
export function getChemistryEquations() {
  if (typeof window === 'undefined') return [];
  const data = window.SCIENCE_CHEMISTRY_EQUATIONS;
  return Array.isArray(data) ? data : [];
}

export default getChemistryEquations;
