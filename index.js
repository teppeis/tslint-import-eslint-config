'use strict';

const {Linter} = require('eslint');
const Config = require('eslint/lib/config');
const {loadObject} = require('eslint/lib/config/config-file');
const oEntries = require('object.entries');
const {ruleESMap} = require('@teppeis/tslint-eslint-rules/dist/readme/rules');
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
  const tsRules = {};
  oEntries(rules).forEach(([name, value]) => {
    convertESLintRule({
      plugins,
      tsRules,
      name,
      value,
    });
  });

  const config = {rules: tsRules};
  if (plugins.size > 0) {
    config.extends = [...plugins.values()];
  }
  return config;
}

function convertESLintRule({plugins, tsRules, name, value}) {
  let severity = value;
  let options = [];
  if (Array.isArray(value)) {
    [severity, ...options] = value;
  }
  let useTslintEslintRules = false;

  const ruleInfo = ruleESMap[camelcase(name)];
  if (!ruleInfo) {
    return;
  }

  if (severity === 'off' || severity === 0) {
    return;
  } else if (severity === 'warn' || severity === 1) {
    severity = 'warning';
  } else if (severity === 'error' || severity === 2) {
    severity = 'error';
  } else {
    throw new Error(`invalid rule setting: ${name}, ${value}`);
  }

  switch (ruleInfo.provider) {
    case 'native':
      break;
    case 'tslint-eslint-rules':
      if (!ruleInfo.available) {
        return;
      }
      useTslintEslintRules = true;
      break;
    default:
      return;
  }

  const setting = {severity};
  const newOptions = convertOptions({name, options, ruleInfo, tsRules});
  if (newOptions === convertOptions.DISABLE) {
    return;
  } else if (newOptions && (!Array.isArray(newOptions) || newOptions.length > 0)) {
    setting.options = newOptions;
  }

  if (useTslintEslintRules) {
    plugins.add('@teppeis/tslint-eslint-rules');
  }
  tsRules[ruleInfo.tslintRule] = setting;
}

module.exports = importESLintConfig;
module.exports.convertESLintRulesToTSLintConfig = convertESLintRulesToTSLintConfig;
