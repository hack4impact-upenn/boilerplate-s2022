module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // Add overriden rules specific to server here
    // 'no-underscore-dangle': [
    //   'error',
    //   { allowAfterThis: true, allow: ['_instance'] },
    // ],
  },
  env: {
    browser: true,
  },
};
