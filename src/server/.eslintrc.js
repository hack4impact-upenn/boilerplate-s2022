module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-underscore-dangle': [
      'error',
      { allowAfterThis: true, allow: ['_instance'] },
    ],
  },
};
