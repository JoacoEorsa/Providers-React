/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	semi: true,
	tabWidth: 2,
	singleQuote: false,
	arrowParens: "always",
	proseWrap: "always",
	useTabs: true,
	bracketSpacing: true,
	printWidth: 100,
	quoteProps: "as-needed",
	endOfLine: "auto",
	trailingComma: "es5",
	overrides: [{ files: "*.yml", options: { singleQuote: false } }],
};

export default config;
