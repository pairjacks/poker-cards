module.exports = {
  parser: '@typescript-eslint/parser',
  env: { es6: true, node: true, browser: false },
  plugins: ['@typescript-eslint', 'filenames', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'camelcase': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '[iI]gnored' },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      // Allows us to order root level exports by importance
      // Keep an eye on this for undefined behaviour
      { functions: false, classes: false, variables: false },
    ],
    'filenames/match-regex': ['error', '^[a-z-.]+$', true],
    'filenames/match-exported': ['error', 'kebab'],
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-unused-modules': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['*.config.*', '*.conf.*'],
      rules: {
        'filenames/match-exported': 'off',
      },
    },
    {
      files: ['src/**/*'],
      env: { node: false, browser: true },
      plugins: ['tsdoc'],
      rules: {
        'no-console': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        'tsdoc/syntax': 'warn',
      },
    },
    {
      files: ['**/*.test.*'],
      env: { 'node': true, 'jest/globals': true },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
};
