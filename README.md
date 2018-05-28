tslint-import-eslint-config
====

Import your ESLint config into TSLint.

[![NPM version][npm-image]][npm-url]
![Node.js Version Support][node-version]
[![Build Status][circleci-image]][circleci-url]
[![Dependency Status][deps-image]][deps-url]
![License][license]

The rule mappings between ESLint and TSLint are provided by [tslint-eslint-rules](https://github.com/buzinas/tslint-eslint-rules). Thanks!

## Setup

```console
$ npm i tslint-import-eslint-config
```

Edit your `tslint.js`

```js
const importESLintConfig = require('tslint-import-eslint-config');

// import from ESLint
module.exports = importESLintConfig({
  extends: ['teppeis/es2018'],
  rules: {
    eqeqeq: ['error', 'always', {null: 'ignore'}]
  }
});

// override TSLint rules
Object.assign(module.exports.rules, {
  'your-rule-1': true,
  'your-rule-2': true,
});
```

Run with TSLint

```console
$ tslint -c tslint.js *.ts
```

## License

Licensed under the MIT license.
Copyright (c) 2018, Teppei Sato

[npm-image]: https://img.shields.io/npm/v/tslint-import-eslint-config.svg
[npm-url]: https://npmjs.org/package/tslint-import-eslint-config
[npm-downloads-image]: https://img.shields.io/npm/dm/tslint-import-eslint-config.svg
[circleci-image]: https://circleci.com/gh/teppeis/tslint-import-eslint-config.svg?style=shield
[circleci-url]: https://circleci.com/gh/teppeis/tslint-import-eslint-config
[deps-image]: https://img.shields.io/david/teppeis/tslint-import-eslint-config.svg
[deps-url]: https://david-dm.org/teppeis/tslint-import-eslint-config
[node-version]: https://img.shields.io/badge/Node.js%20support-v6,v8,v10-brightgreen.svg
[license]: https://img.shields.io/npm/l/tslint-import-eslint-config.svg
