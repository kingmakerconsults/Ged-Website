// sim/assessments.js
// GED-aligned mini-assessments

export function maybeAttachAssessment(stageCtx) {
  // Simple generator: 2-3 MC questions from current month
  const { gross, net, expenses, month } = stageCtx;
  let questions = [];
  if (month % 3 === 0) {
    questions.push({
      q: `If your gross pay is $${gross} and your net is $${net}, what percent is taken out for taxes?`,
      a: Math.round(((gross - net) / gross) * 100),
      choices: [10, 15, 20, 25],
    });
    questions.push({
      q: `Your expenses this month are $${expenses}. If you save $200, what percent of your income did you save?`,
      a: Math.round((200 / gross) * 100),
      choices: [5, 10, 15, 20],
    });
  }
  return questions;
}

export function onAssessmentAnswered(correct, perfScore) {
  // correct: boolean, perfScore: number
  if (correct) return Math.min(perfScore + 0.05, 1.2);
  else return Math.max(perfScore - 0.05, 0.7);
}
