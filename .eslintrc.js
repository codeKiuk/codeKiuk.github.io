module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import', 'unused-imports'],
  extends: [
    // TypeScript ESLint recommanded style 적용
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-alert': 'off',
    'no-console': 'warn',
    'unused-imports/no-unused-imports': 'error',

    // react
    'react/jsx-key': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': ['error'],
    'react/display-name': ['off'],

    // typescript
    'import/no-unresolved': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_|^[A-Z]',
      },
    ],
  },
  globals: {
    JSX: true,
  },
}
