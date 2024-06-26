// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: [
    'apps/**',
    'packages/**',
    'node_modules/**',
    'dist/**',
    'build.ts',
    'devBuild.ts',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-ts-comment': [
      'off',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    'import/no-unresolved': ['error', { ignore: ['cloudflare:workers'] }],
    'no-useless-escape': 'off',
    'no-useless-catch': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-empty': 'off',
    'no-case-declarations': 'off',
  },
}
