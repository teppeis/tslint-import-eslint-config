'use strict';

const deepEqual = require('deep-strict-equal');

const rules = {};
module.exports = rules;

/**
 * `builtinGlobals` in ESLint is ignored.
 * `check-parameters` in TSLint is always added.
 *
 * @return {string}
 * @see https://eslint.org/docs/rules/no-redeclare
 * @see https://palantir.github.io/tslint/rules/no-duplicate-variable/
 */
rules['no-redeclare'] = () => 'check-parameters';

/**
 * TODO: `allow-new` is mapped from `no-new`
 *
 * @param {!Array<*>} options
 * @return {!Array<string>}
 * @see https://eslint.org/docs/rules/no-unused-expressions
 * @see https://palantir.github.io/tslint/rules/no-unused-expression/
 */
rules['no-unused-expressions'] = options => {
  const opt = options[0];
  const result = [];
  if (!opt) {
    return result;
  }
  if (opt.allowShortCircuit || opt.allowTernary) {
    result.push('allow-fast-null-checks');
  }
  if (opt.allowTaggedTemplates) {
    result.push('allow-tagged-template');
  }
  return result;
};

/**
 * @param {!Array<*>} options
 * @return {!Array<string>}
 * @see https://eslint.org/docs/rules/eqeqeq
 * @see https://palantir.github.io/tslint/rules/triple-equals/
 */
rules.eqeqeq = options => {
  const result = [];
  if (options.length === 0) {
    return [];
  }

  if (options.length === 1) {
    if (options[0] === 'always') {
      return [];
    } else if (options[0] === 'smart') {
      result.push('allow-null-check');
    }
    return result;
  }

  if (
    deepEqual(options, ['always', {null: 'ignore'}]) ||
    deepEqual(options, ['always', {null: 'never'}])
  ) {
    result.push('allow-null-check');
  }
  return result;
};

/**
 * @param {!Array<*>} options
 * @return {!Array<string>}
 * @see https://eslint.org/docs/rules/no-unused-vars
 * @see https://palantir.github.io/tslint/rules/no-unused-variable/
 */
rules['no-unused-vars'] = options => {
  const result = [];
  const ignorePatterns = [];
  if (!options[0]) {
    return result;
  }

  const {arg, varsIgnorePattern, argsIgnorePattern} = options[0];
  if (arg === 'all') {
    result.push('check-parameters');
  }
  if (varsIgnorePattern) {
    ignorePatterns.push(varsIgnorePattern);
  }
  if (argsIgnorePattern) {
    ignorePatterns.push(argsIgnorePattern);
  }
  if (ignorePatterns.length > 0) {
    result.push({'ignore-pattern': ignorePatterns.join('|')});
  }
  return result;
};

/**
 * @param {!Array<*>} options
 * @return {!Array<string>}
 * @see https://eslint.org/docs/rules/no-empty
 * @see https://palantir.github.io/tslint/rules/no-empty/
 */
rules['no-empty'] = options => {
  const result = [];
  if (!options[0]) {
    return result;
  }

  const {allowEmptyCatch} = options[0];
  if (allowEmptyCatch) {
    result.push('allow-empty-catch');
  }
  return result;
};
