module.exports = {
  jsonrepair(text) {
    if (typeof text !== 'string') {
      throw new TypeError('jsonrepair stub expects a string input');
    }
    return text;
  }
};
