module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'no-console': 'warn',
    'no-underscore-dangle': [
      'off',
      { allowAfterThis: true, allow: ['_instance'] },
    ],
  },
  env: {
    node: true,
  },
};
