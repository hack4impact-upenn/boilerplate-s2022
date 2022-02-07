module.exports = {
  rules: {
    // Add overriden rules specific to server here
    'no-underscore-dangle': [
      'error',
      { allowAfterThis: true, allow: ['_instance'] },
    ],
  },
};
