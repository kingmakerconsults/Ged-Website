const { buildAppData } = require('./quizzes');

const ALL_QUIZZES = buildAppData();

module.exports = { ALL_QUIZZES };
