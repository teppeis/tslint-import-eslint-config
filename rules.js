'use strict';

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
