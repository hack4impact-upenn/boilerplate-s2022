module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  env: {
    browser: true,
  },
};
