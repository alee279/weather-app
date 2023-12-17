/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@cis-1962/eslint-config/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
