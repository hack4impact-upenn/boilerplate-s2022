module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'no-console': 'warn',
    'no-underscore-dangle': [
      'error',
      { allowAfterThis: true, allow: ['_instance'] },
    ],
  },
  env: {
    node: true,
  },
};
