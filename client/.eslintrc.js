module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  env: {
    browser: true,
  },
};
