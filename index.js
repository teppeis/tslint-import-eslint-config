'use strict';

const {Linter} = require('eslint');
const Config = require('eslint/lib/config');
const {loadObject} = require('eslint/lib/config/config-file');

function importESLintConfig(config) {
  const {rules = {}} = loadESLintConfig(config);
  return {
    rules,
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

module.exports = importESLintConfig;
