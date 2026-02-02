const algebra = require('./math_algebra_02');
const numberSense = require('./math_number_sense_01');
const geometry = require('./math_geometry_01');
const data = require('./math_data_01');

const clone = (item) => JSON.parse(JSON.stringify(item));
const pick = (arr, indexes) => indexes.map((i) => arr[i]).filter(Boolean);
const tag = (item, subject, contentArea, originQuizId) => ({
  ...clone(item),
  subject,
  contentArea,
  originQuizId,
});

const questions = [
  ...pick(numberSense, [0, 1, 2]).map((q) =>
    tag(q, 'Math', 'number_ops', 'math_number_sense_01')
  ),
  ...pick(algebra, [0, 1, 2]).map((q) =>
    tag(q, 'Math', 'algebra', 'math_algebra_02')
  ),
  ...pick(geometry, [0, 1]).map((q) =>
    tag(q, 'Math', 'geometry', 'math_geometry_01')
  ),
  ...pick(data, [0, 1]).map((q) => tag(q, 'Math', 'data', 'math_data_01')),
];

module.exports = questions.map((q, index) => ({
  ...q,
  questionNumber: index + 1,
}));
