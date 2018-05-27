'use strict';

const {Linter} = require('eslint');
const Config = require('eslint/lib/config');
const {loadObject} = require('eslint/lib/config/config-file');
const oEntries = require('object.entries');

function importESLintConfig(config) {
  const {rules = {}} = loadESLintConfig(config);
  const tsConfig = convertESLintRulesToTSLintConfig(rules);
  return {
    rules: tsConfig.rules,
  };
}

function loadESLintConfig(config) {
  const context = new Config(
    {
      cwd: process.cwd(),
      useEslintrc: false,
    },
    new Linter()
  );
  return loadObject(config, context);
}

function convertESLintRulesToTSLintConfig(rules) {
  const tsRules = oEntries(rules)
    .map(convertESLintRule)
    .filter(([name, value]) => name && value)
    .reduce((prev, [name, value]) => {
      prev[name] = value;
      return prev;
    }, {});

  return {
    rules: tsRules,
  };
}

function convertESLintRule([name, value]) {
  if (Array.isArray(value)) {
    // TODO: extract options
    value = value[0];
  }

  if (value === 'off' || value === 0) {
    return [null, null];
  } else if (value === 'warn' || value === 1) {
    value = 'warning';
  } else if (value === 'error' || value === 2) {
    value = 'error';
  } else {
    throw new Error(`invalid rule setting: ${name}, ${value}`);
  }

  return [es2ts[name], {severity: value}];
}

const es2ts = {
  'no-cond-assign': 'no-conditional-assignment',
};

module.exports = importESLintConfig;
module.exports.convertESLintRulesToTSLintConfig = convertESLintRulesToTSLintConfig;
