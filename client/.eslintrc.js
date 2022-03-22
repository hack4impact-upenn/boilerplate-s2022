module.exports = {
  rules: {
    // Add overriden rules specific to client here
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
      },
    },
  },
};
