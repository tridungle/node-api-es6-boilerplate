module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_update', '_doc'] }],
    'no-param-reassign': ['error', { props: false }],
    'class-methods-use-this': 'off',
    'max-classes-per-file': 1,
    'import/no-cycle': 2
  },
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  }
}
