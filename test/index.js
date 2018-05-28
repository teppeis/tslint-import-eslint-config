'use strict';

const assert = require('assert');
const sut = require('../');
const {convertESLintRulesToTSLintConfig: convert} = sut;

describe('tslint-import-eslint-config', () => {
  it('should be a function', () => {
    assert(typeof sut === 'function');
  });
  it('should return an empty object as `rules` prop for empty config', () => {
    assert.deepEqual(sut({}), {rules: {}});
  });
});

describe('convertESLintRulesToTSLintConfig', () => {
  it('should be a function', () => {
    assert(typeof convert === 'function');
  });

  describe('should convert a ESLint rule to the equivalent TSLint rule', () => {
    it('error', () => {
      const actual = convert({'no-cond-assign': 'error'});
      assert.deepEqual(actual, {rules: {'no-conditional-assignment': {severity: 'error'}}});
    });
    it('warn', () => {
      const actual = convert({'no-cond-assign': 'warn'});
      assert.deepEqual(actual, {rules: {'no-conditional-assignment': {severity: 'warning'}}});
    });
    it('2', () => {
      const actual = convert({'no-cond-assign': 2});
      assert.deepEqual(actual, {rules: {'no-conditional-assignment': {severity: 'error'}}});
    });
    it('1', () => {
      const actual = convert({'no-cond-assign': 1});
      assert.deepEqual(actual, {rules: {'no-conditional-assignment': {severity: 'warning'}}});
    });
    it('[error]', () => {
      const actual = convert({'no-cond-assign': ['error']});
      assert.deepEqual(actual, {rules: {'no-conditional-assignment': {severity: 'error'}}});
    });
  });

  describe('should filter disabled ESLint rules', () => {
    it('off', () => {
      const actual = convert({'no-cond-assign': 'off'});
      assert.deepEqual(actual, {rules: {}});
    });
    it('0', () => {
      const actual = convert({'no-cond-assign': 0});
      assert.deepEqual(actual, {rules: {}});
    });
  });

  it('should filter a ESLint rule if it has no equivalent TSLint rule', () => {
    const actual = convert({'foo-bar-baz': 'error'});
    assert.deepEqual(actual, {rules: {}});
  });

  describe('rules', () => {
    it('no-redeclare', () => {
      const actual = convert({'no-redeclare': 'error'});
      assert.deepEqual(actual, {
        rules: {
          'no-duplicate-variable': {severity: 'error', options: 'check-parameters'},
        },
      });
    });
  });
});
