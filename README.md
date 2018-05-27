tslint-import-eslint-config
====

## Setup

```console
$ npm i tslint-import-eslint-config
```

edit `tsconfig.js`

```js
const importESLintConfig = require('tslint-import-eslint-config');
module.exports = importESLintConfig({
    extends: ['teppeis/es2018']
});
```

```js
const importESLintConfig = require('tslint-import-eslint-config');
const {rulesDirectory, rules} = importESLintConfig({
    extends: ['teppeis/es2018']
});
module.exports = {
    rulesDirectory,
    rules: {
        ...rules,
        'your-rule-1': true,
        'your-rule-2': true,
    },
};
```
