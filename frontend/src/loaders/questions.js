// Dynamic loaders for heavy question datasets and formula sheets
// Using direct static paths so Vite splits them into separate chunks

export async function loadScienceQuestions() {
  const mod = await import('../../data/science/scienceQuestions.js');
  if (typeof window !== 'undefined')
    window.SCIENCE_QUESTIONS = mod.SCIENCE_QUESTIONS;
  return mod.SCIENCE_QUESTIONS;
}

export async function loadMathQuestions() {
  const mod = await import('../../data/math/mathQuestions.js');
  if (typeof window !== 'undefined') window.MATH_QUESTIONS = mod.MATH_QUESTIONS;
  return mod.MATH_QUESTIONS;
}

export async function loadRlaQuestions() {
  const mod = await import('../../data/rla/rlaQuestions.js');
  if (typeof window !== 'undefined') window.RLA_QUESTIONS = mod.RLA_QUESTIONS;
  return mod.RLA_QUESTIONS;
}

export async function loadSocialStudiesQuestions() {
  const mod = await import('../../data/social/socialStudiesQuestions.js');
  if (typeof window !== 'undefined')
    window.SOCIAL_STUDIES_QUESTIONS = mod.SOCIAL_STUDIES_QUESTIONS;
  return mod.SOCIAL_STUDIES_QUESTIONS;
}

export async function loadScienceFormulas() {
  const mod = await import('../../data/science/ScienceFormulas.js');
  if (typeof window !== 'undefined')
    window.ScienceFormulas = mod.ScienceFormulas;
  return mod.ScienceFormulas;
}

export async function loadSciNumeracyQuestions() {
  const mod = await import('../../data/science/SciNumeracyQuestions.js');
  if (typeof window !== 'undefined')
    window.SCI_NUMERACY_QUESTIONS = mod.SCI_NUMERACY_QUESTIONS;
  return mod.SCI_NUMERACY_QUESTIONS;
}

// Optional: expose loaders for legacy code paths
if (typeof window !== 'undefined') {
  window.QuestionLoaders = {
    loadScienceQuestions,
    loadMathQuestions,
    loadRlaQuestions,
    loadSocialStudiesQuestions,
    loadScienceFormulas,
    loadSciNumeracyQuestions,
  };
}
