const life = require('./sci_life_science_1');
const physical = require('./sci_physical_science_1');
const earth = require('./sci_earth_space_1');
const data = require('./sci_data_reasoning_1');

const clone = (item) => JSON.parse(JSON.stringify(item));
const pick = (arr, indexes) => indexes.map((i) => arr[i]).filter(Boolean);
const tag = (item, subject, contentArea, originQuizId) => ({
  ...clone(item),
  subject,
  contentArea,
  originQuizId,
});

const questions = [
  ...pick(life, [0, 1, 2]).map((q) =>
    tag(q, 'Science', 'life_science', 'sci_life_science_1')
  ),
  ...pick(physical, [0, 1, 2]).map((q) =>
    tag(q, 'Science', 'physical_science', 'sci_physical_science_1')
  ),
  ...pick(earth, [0, 1]).map((q) =>
    tag(q, 'Science', 'earth_space', 'sci_earth_space_1')
  ),
  ...pick(data, [0, 1]).map((q) =>
    tag(q, 'Science', 'data_interpretation', 'sci_data_reasoning_1')
  ),
];

module.exports = questions.map((q, index) => ({
  ...q,
  questionNumber: index + 1,
}));
