'use strict';

const assert = require('assert');
const sut = require('../');
const {convertESLintRulesToTSLintConfig: convert} = sut;

describe('tslint-import-eslint-config', () => {
  it('should return an empty object as `rules` prop for empty config', () => {
    assert.deepEqual(sut({}), {rules: {}});
  });
});

describe('convertESLintRulesToTSLintConfig', () => {
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

  describe('should support tslint-eslint-rules', () => {
    it('should add "extends: tslint-eslint-rules"', () => {
      const actual = convert({'no-constant-condition': 'error'});
      assert.deepEqual(actual, {
        extends: ['tslint-eslint-rules'],
        rules: {'no-constant-condition': {severity: 'error'}},
      });
    });
    it('should not duplicate "extends: tslint-eslint-rules"', () => {
      const actual = convert({'no-constant-condition': 'error', 'no-control-regex': 'error'});
      assert.deepEqual(actual, {
        extends: ['tslint-eslint-rules'],
        rules: {
          'no-constant-condition': {severity: 'error'},
          'no-control-regex': {severity: 'error'},
        },
      });
    });
    it('should filter unavailable rules', () => {
      const actual = convert({yoda: 'error'});
      assert.deepEqual(actual, {rules: {}});
    });
  });

  it('should filter a ESLint rule if it has no equivalent TSLint rule', () => {
    const actual = convert({'foo-bar-baz': 'error'});
    assert.deepEqual(actual, {rules: {}});
  });
});
