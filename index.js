'use strict';

const {Linter} = require('eslint');
const Config = require('eslint/lib/config');
const {loadObject} = require('eslint/lib/config/config-file');
const oEntries = require('object.entries');
const {ruleESMap} = require('tslint-eslint-rules/dist/readme/rules');
const camelcase = require('camelcase');
const convertOptions = require('./rules');

function importESLintConfig(config) {
  const {rules = {}} = loadESLintConfig(config);
  return convertESLintRulesToTSLintConfig(rules);
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
  const plugins = new Set();
  const tsRules = oEntries(rules)
    .map(convertESLintRule.bind(null, plugins))
    .filter(([name, value]) => name && value)
    .reduce((prev, [name, value]) => {
      prev[name] = value;
      return prev;
    }, {});

  const config = {rules: tsRules};
  if (plugins.size > 0) {
    config.extends = [...plugins.values()];
  }
  return config;
}

function convertESLintRule(plugins, [name, value]) {
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
  if (!ruleInfo) {
    return [null, null];
  }

  switch (ruleInfo.provider) {
    case 'native':
      break;
    case 'tslint-eslint-rules':
      if (!ruleInfo.available) {
        return [null, null];
      }
      plugins.add('tslint-eslint-rules');
      break;
    default:
      return [null, null];
  }

  const setting = {severity};
  const newOptions = convertOptions(name, options, ruleInfo);
  if (newOptions === convertOptions.DISABLE) {
    return [null, null];
  } else if (newOptions && (!Array.isArray(newOptions) || newOptions.length > 0)) {
    setting.options = newOptions;
  }

  return [ruleInfo.tslintRule, setting];
}

module.exports = importESLintConfig;
module.exports.convertESLintRulesToTSLintConfig = convertESLintRulesToTSLintConfig;
