module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "rules": {
    "no-console": "off",
    "no-undef": "off",
    "react/prop-types": "off"
  },
  "parser": "babel-eslint"
};