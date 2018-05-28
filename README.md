tslint-import-eslint-config
====

## Setup

```console
$ npm i tslint-import-eslint-config
```

edit `tslint.js`

```js
const importESLintConfig = require('tslint-import-eslint-config');

module.exports = importESLintConfig({
  extends: ['teppeis/es2018'],
});

Object.assign(module.exports.rules, {
  'your-rule-1': true,
  'your-rule-2': true,
});
```
