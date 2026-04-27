const assert = require('assert');
const { test, describe } = require('node:test');

const {
  isEnabled: isFeatureEnabled,
  listFlags,
  FLAGS,
} = require('../src/featureFlags');

describe('featureFlags', () => {
  test('listFlags returns an array containing every registered flag', () => {
    const list = listFlags();
    assert.ok(Array.isArray(list));
    for (const name of Object.keys(FLAGS)) {
      assert.ok(list.find((f) => f.name === name), `missing flag ${name}`);
    }
  });

  test('default flag values match registry', () => {
    for (const [name, def] of Object.entries(FLAGS)) {
      delete process.env[`FEATURE_${name}`];
      assert.strictEqual(isFeatureEnabled(name), def.default, `flag ${name}`);
    }
  });

  test('FEATURE_<NAME> env var overrides default to true', () => {
    const name = 'EMAIL_VERIFICATION_REQUIRED';
    process.env[`FEATURE_${name}`] = 'true';
    assert.strictEqual(isFeatureEnabled(name), true);
    delete process.env[`FEATURE_${name}`];
  });

  test('FEATURE_<NAME>=false overrides default to false', () => {
    const name = 'RATE_LIMITING';
    process.env[`FEATURE_${name}`] = 'false';
    assert.strictEqual(isFeatureEnabled(name), false);
    delete process.env[`FEATURE_${name}`];
  });

  test('unknown flag returns false', () => {
    assert.strictEqual(isFeatureEnabled('NOT_A_REAL_FLAG'), false);
  });
});
