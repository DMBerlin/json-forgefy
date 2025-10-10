module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env']
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn'
  }
};
