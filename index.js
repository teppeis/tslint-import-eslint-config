'use strict';

const {Linter} = require('eslint');
const Config = require('eslint/lib/config');
const {loadObject} = require('eslint/lib/config/config-file');

function importESLintConfig(config) {
  const context = new Config(
    {
      cwd: process.cwd(),
      useEslintrc: false,
    },
    new Linter()
  );
  const extendedConfig = loadObject(config, context);
  console.log(extendedConfig);

  return {
    rules: {},
    rulesDirectory: [],
  };
}
importESLintConfig({extends: 'teppeis'});

module.exports = importESLintConfig;
