'use strict';

const {Linter} = require('eslint');
const Config = require('eslint/lib/config');
const {loadObject} = require('eslint/lib/config/config-file');
const oEntries = require('object.entries');
const {ruleESMap} = require('tslint-eslint-rules/dist/readme/rules');
const camelcase = require('camelcase');
const rules = require('./rules');

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
  let severity = value;
  let options = [];
  if (Array.isArray(value)) {
    [severity, ...options] = value;
  }

  if (severity === 'off' || severity === 0) {
    return [null, null];
  } else if (severity === 'warn' || severity === 1) {
    severity = 'warning';
  } else if (severity === 'error' || severity === 2) {
    severity = 'error';
  } else {
    throw new Error(`invalid rule setting: ${name}, ${value}`);
  }

  const ruleInfo = ruleESMap[camelcase(name)];
  if (!ruleInfo || ruleInfo.provider !== 'native') {
    return [null, null];
  }

  const setting = {severity};
  const rule = rules[name];
  if (rule) {
    setting.options = rule(options);
  }

  return [ruleInfo.tslintRule, setting];
}

module.exports = importESLintConfig;
module.exports.convertESLintRulesToTSLintConfig = convertESLintRulesToTSLintConfig;
