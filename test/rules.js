'use strict';

const assert = require('assert');
const sut = require('../');
const {convertESLintRulesToTSLintConfig: convert} = sut;

describe('rules', () => {
  describe('no-redeclare', () => {
    it('no option', () => {
      const actual = convert({'no-redeclare': 'error'});
      assert.deepEqual(actual, {
        rules: {
          'no-duplicate-variable': {severity: 'error', options: 'check-parameters'},
        },
      });
    });
  });

  describe('no-unused-expressions', () => {
    it('no option', () => {
      const actual = convert({'no-unused-expressions': 'error'});
      assert.deepEqual(actual, {
        rules: {
          'no-unused-expression': {
            severity: 'error',
            options: [],
          },
        },
      });
    });
    it('allowShortCircuit', () => {
      const actual = convert({'no-unused-expressions': ['error', {allowShortCircuit: true}]});
      assert.deepEqual(actual, {
        rules: {
          'no-unused-expression': {
            severity: 'error',
            options: ['allow-fast-null-checks'],
          },
        },
      });
    });
    it('allowTernary', () => {
      const actual = convert({'no-unused-expressions': ['error', {allowTernary: true}]});
      assert.deepEqual(actual, {
        rules: {
          'no-unused-expression': {
            severity: 'error',
            options: ['allow-fast-null-checks'],
          },
        },
      });
    });
    it('allowTaggedTemplates', () => {
      const actual = convert({'no-unused-expressions': ['error', {allowTaggedTemplates: true}]});
      assert.deepEqual(actual, {
        rules: {
          'no-unused-expression': {
            severity: 'error',
            options: ['allow-tagged-template'],
          },
        },
      });
    });
  });

  describe('eqeqeq', () => {
    it('no option', () => {
      const actual = convert({eqeqeq: 'error'});
      assert.deepEqual(actual, {rules: {'triple-equals': {severity: 'error', options: []}}});
    });
    it('always, {null: "ignore"}', () => {
      const actual = convert({eqeqeq: ['error', 'always', {null: 'ignore'}]});
      assert.deepEqual(actual, {
        rules: {'triple-equals': {severity: 'error', options: ['allow-null-check']}},
      });
    });
    it('always, {null: "never"}', () => {
      const actual = convert({eqeqeq: ['error', 'always', {null: 'never'}]});
      assert.deepEqual(actual, {
        rules: {'triple-equals': {severity: 'error', options: ['allow-null-check']}},
      });
    });
    it('smart', () => {
      const actual = convert({eqeqeq: ['error', 'smart']});
      assert.deepEqual(actual, {
        rules: {'triple-equals': {severity: 'error', options: ['allow-null-check']}},
      });
    });
  });

  describe('no-unused-vars', () => {
    it('no option', () => {
      const actual = convert({'no-unused-vars': 'error'});
      assert.deepEqual(actual, {
        rules: {'no-unused-variable': {severity: 'error', options: []}},
      });
    });
    it('{arg: "all"}', () => {
      const actual = convert({'no-unused-vars': ['error', {arg: 'all'}]});
      assert.deepEqual(actual, {
        rules: {'no-unused-variable': {severity: 'error', options: ['check-parameters']}},
      });
    });
    it('varsIgnorePattern', () => {
      const actual = convert({'no-unused-vars': ['error', {varsIgnorePattern: '^_v'}]});
      assert.deepEqual(actual, {
        rules: {'no-unused-variable': {severity: 'error', options: [{'ignore-pattern': '^_v'}]}},
      });
    });
    it('argsIgnorePattern', () => {
      const actual = convert({'no-unused-vars': ['error', {argsIgnorePattern: '^_a'}]});
      assert.deepEqual(actual, {
        rules: {'no-unused-variable': {severity: 'error', options: [{'ignore-pattern': '^_a'}]}},
      });
    });
    it('varsIgnorePattern and argsIgnorePattern', () => {
      const actual = convert({
        'no-unused-vars': ['error', {varsIgnorePattern: '^_v', argsIgnorePattern: '^_a'}],
      });
      assert.deepEqual(actual, {
        rules: {
          'no-unused-variable': {severity: 'error', options: [{'ignore-pattern': '^_v|^_a'}]},
        },
      });
    });
  });
});
