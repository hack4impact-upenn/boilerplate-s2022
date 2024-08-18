module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'react/require-default-props': 0,
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/extensions': [
      2,
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'always',
        tsx: 'always',
      },
    ],
  },
  env: {
    browser: true,
  },
};
