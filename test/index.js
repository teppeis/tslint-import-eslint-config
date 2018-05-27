'use strict';

const sut = require('../');
const assert = require('assert');

describe('tslint-import-eslint-config', () => {
  it('should be a function', () => {
    assert(typeof sut === 'function');
  });
  it('should return an empty object as `rules` prop for empty config', () => {
    const result = sut({});
    assert.deepEqual(result.rules, {});
  });
});
