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
      assert.deepEqual(actual, {rules: {'triple-equals': {severity: 'error'}}});
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
        rules: {'no-unused-variable': {severity: 'error'}},
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

  describe('no-empty', () => {
    it('no option', () => {
      const actual = convert({'no-empty': 'error'});
      assert.deepEqual(actual, {
        rules: {'no-empty': {severity: 'error'}},
      });
    });
    it('allowEmptyCatch', () => {
      const actual = convert({'no-empty': ['error', {allowEmptyCatch: true}]});
      assert.deepEqual(actual, {
        rules: {'no-empty': {severity: 'error', options: ['allow-empty-catch']}},
      });
    });
  });

  describe('no-constant-condition', () => {
    it('no option', () => {
      const actual = convert({'no-constant-condition': 'error'});
      assert.deepEqual(actual, {
        extends: ['tslint-eslint-rules'],
        rules: {'no-constant-condition': {severity: 'error'}},
      });
    });
    it('{checkLoops: false}', () => {
      const actual = convert({'no-constant-condition': ['error', {checkLoops: false}]});
      assert.deepEqual(actual, {
        extends: ['tslint-eslint-rules'],
        rules: {'no-constant-condition': {severity: 'error', options: [{checkLoops: false}]}},
      });
    });
  });

  describe('object-shorthand', () => {
    it('no option', () => {
      const actual = convert({'object-shorthand': 'error'});
      assert.deepEqual(actual, {
        rules: {'object-literal-shorthand': {severity: 'error'}},
      });
    });
    it('always', () => {
      const actual = convert({'object-shorthand': ['error', 'always']});
      assert.deepEqual(actual, {
        rules: {'object-literal-shorthand': {severity: 'error'}},
      });
    });
    it('never', () => {
      const actual = convert({'object-shorthand': ['error', 'never']});
      assert.deepEqual(actual, {
        rules: {'object-literal-shorthand': {severity: 'error', options: 'never'}},
      });
    });
    it('methods: disabled', () => {
      const actual = convert({'object-shorthand': ['error', 'methods']});
      assert.deepEqual(actual, {rules: {}});
    });
    it('always, avoidQuotes: disabled', () => {
      const actual = convert({'object-shorthand': ['error', 'always', {avoidQuotes: true}]});
      assert.deepEqual(actual, {rules: {}});
    });
  });
});
