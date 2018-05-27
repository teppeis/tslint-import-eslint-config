'use strict';

const sut = require('../');
const assert = require('assert');

describe('tslint-import-eslint-config', () => {
  it('should be a function', () => {
    assert(typeof sut === 'function');
  });
  it('should return `rules` and `rulesDirectory`', () => {
    const result = sut({});
    assert.deepEqual(result, {rules: {}, rulesDirectory: []});
  });
});
