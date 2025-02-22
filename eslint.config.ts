import js from '@eslint/js';
import type { ESLint, Linter } from 'eslint';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- The type doesn't exist.
// @ts-expect-error
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import globals from 'globals';
import ts from 'typescript-eslint';

const config: Linter.Config[] = [
  { settings: { react: { version: 'detect' } } },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },

  // Base JS/ES rules
  {
    plugins: { js },
    rules: {
      ...js.configs.recommended.rules,
      'arrow-body-style': ['error', 'always'],
      curly: 'error',
      'no-console': ['warn'],
      'no-extra-boolean-cast': 'error',
      'no-unneeded-ternary': 'error',
      'object-shorthand': 'error'
    }
  },

  // React rules
  {
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
      'react/hook-use-state': 'warn',
      'react/jsx-sort-props': ['error', { shorthandLast: true }],
      'react/react-in-jsx-scope': 'off'
    }
  },

  // TypeScript rules
  ...([
    ...ts.configs.recommended,
    { rules: { '@typescript-eslint/method-signature-style': ['error', 'property'] } }
  ] as Linter.Config[]),

  // Custom plugins rules
  {
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions as ESLint.Plugin,
      'simple-import-sort': simpleImportSort,
      'sort-destructure-keys': sortDestructureKeys
    },
    rules: {
      'prefer-arrow-functions/prefer-arrow-functions': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages. `react` related packages come first.
            ['^react', '^@?\\w'],

            // Internal packages and relative paths.
            [
              '^(@/.*)(/.*|$)',

              // Side effect imports.
              '^\\u0000',

              // Parent imports. Put `..` last.
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              // Other relative imports. Put same-folder imports and `.` last.
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$'
            ],

            // Style imports.
            ['^.+\\.s?css$']
          ]
        }
      ],
      'sort-destructure-keys/sort-destructure-keys': 'error'
    }
  }
];

export default config;
