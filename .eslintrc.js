module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    // Add overriden rules here
    'no-console': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
};
