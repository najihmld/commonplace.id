import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    plugins: [
      'prettier',
      'unicorn',
      '@typescript-eslint',
      'unused-imports',
      'tailwindcss',
      'simple-import-sort',
    ],
    rules: {
      'prettier/prettier': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['/android', '/ios'],
        },
      ],
      'max-params': ['error', 3], // Limit the number of parameters in a function to use object instead
      'max-lines-per-function': ['error', 70],

      'react/no-inline-styles': 'off',
      'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'react/require-default-props': 'off', // Allow non-defined react props as undefined

      // <Button variant={'secondary'}> ->  <Button variant="secondary">
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],

      '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: true,
        },
      ], // Ensure `import type` is used when it's necessary
      'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
      'import/no-cycle': ['error', { maxDepth: '∞' }],
      'tailwindcss/classnames-order': [
        'warn',
        {
          officialSorting: true,
        },
      ], // Follow the same ordering as the official plugin `prettier-plugin-tailwindcss`
      'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
      'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  }),
];

export default eslintConfig;
