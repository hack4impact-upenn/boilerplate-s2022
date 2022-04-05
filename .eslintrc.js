module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    // Add overriden rules here
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
