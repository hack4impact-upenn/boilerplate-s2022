module.exports = {
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // Add overriden rules specific to server here
    'no-underscore-dangle': [
      'error',
      { allowAfterThis: true, allow: ['_instance'] },
    ],
  },
};
