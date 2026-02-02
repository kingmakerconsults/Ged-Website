const mainIdea = require('./rla_main_idea_01');
const inference = require('./rla_inference_01');
const evidence = require('./rla_evidence_01');
const argument = require('./rla_info_arguments');

const clone = (item) => JSON.parse(JSON.stringify(item));
const pick = (arr, indexes) => indexes.map((i) => arr[i]).filter(Boolean);
const tag = (item, subject, contentArea, originQuizId) => ({
  ...clone(item),
  subject,
  contentArea,
  originQuizId,
});

const questions = [
  ...pick(mainIdea, [0, 1, 2]).map((q) =>
    tag(q, 'RLA', 'main_idea', 'rla_main_idea_01')
  ),
  ...pick(inference, [0, 1, 2]).map((q) =>
    tag(q, 'RLA', 'inference', 'rla_inference_01')
  ),
  ...pick(evidence, [0, 1]).map((q) =>
    tag(q, 'RLA', 'evidence', 'rla_evidence_01')
  ),
  ...pick(argument, [0, 1]).map((q) =>
    tag(q, 'RLA', 'argument', 'rla_info_arguments')
  ),
];

module.exports = questions.map((q, index) => ({
  ...q,
  questionNumber: index + 1,
}));
