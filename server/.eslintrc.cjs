module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'no-underscore-dangle': [
      'off',
      { allowAfterThis: true, allow: ['_instance'] },
    ],
  },
  env: {
    node: true,
  },
};
