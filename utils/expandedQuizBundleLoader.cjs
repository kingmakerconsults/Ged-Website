const fs = require('fs');
const vm = require('node:vm');

function loadExpandedQuizBundleData(bundlePath) {
  const raw = fs.readFileSync(bundlePath, 'utf8');
  const sandbox = {};
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;

  vm.createContext(sandbox);
  new vm.Script(raw, { filename: bundlePath }).runInContext(sandbox, {
    timeout: 2000,
  });

  if (!sandbox.ExpandedQuizData || typeof sandbox.ExpandedQuizData !== 'object') {
    throw new Error('ExpandedQuizData not found in bundle');
  }

  return sandbox.ExpandedQuizData;
}

module.exports = {
  loadExpandedQuizBundleData,
};