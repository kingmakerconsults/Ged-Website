const civics = require('./ss_civics_constitution_quiz1');
const history = require('./ss_us_hist_foundations_quiz1');
const economics = require('./ss_econ_foundations');
const geography = require('./ss_geo_map_skills');
const data = require('./social_studies_img_bar_graphs');

const clone = (item) => JSON.parse(JSON.stringify(item));
const pick = (arr, indexes) => indexes.map((i) => arr[i]).filter(Boolean);
const tag = (item, subject, contentArea, originQuizId) => ({
  ...clone(item),
  subject,
  contentArea,
  originQuizId,
});

const questions = [
  ...pick(civics, [0, 1]).map((q) =>
    tag(q, 'Social Studies', 'civics', 'ss_civics_constitution_quiz1')
  ),
  ...pick(history, [0, 1]).map((q) =>
    tag(q, 'Social Studies', 'us_history', 'ss_us_hist_foundations_quiz1')
  ),
  ...pick(economics, [0, 1]).map((q) =>
    tag(q, 'Social Studies', 'economics', 'ss_econ_foundations')
  ),
  ...pick(geography, [0, 1]).map((q) =>
    tag(q, 'Social Studies', 'geography', 'ss_geo_map_skills')
  ),
  ...pick(data, [0, 1]).map((q) =>
    tag(
      q,
      'Social Studies',
      'data_interpretation',
      'social_studies_img_bar_graphs'
    )
  ),
];

module.exports = questions.map((q, index) => ({
  ...q,
  questionNumber: index + 1,
}));
