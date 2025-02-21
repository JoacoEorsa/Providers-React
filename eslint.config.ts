import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import arrowFunctionPlugin from 'eslint-plugin-prefer-arrow-functions';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { settings: { react: { version: 'detect' } } },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: { 'prefer-arrow-functions': arrowFunctionPlugin },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prefer-arrow-functions/prefer-arrow-functions': 'error',
      'object-shorthand': 'error'
    }
  }
];
