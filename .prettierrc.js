/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  proseWrap: 'always',
  useTabs: false,
  bracketSpacing: true,
  printWidth: 100,
  endOfLine: 'lf',
  trailingComma: 'none',
  overrides: [{ files: '*.yml', options: { singleQuote: false } }]
};

export default config;
