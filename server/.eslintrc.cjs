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
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'always',
        tsx: 'always',
      },
    ],
  },
  env: {
    node: true,
  },
};
