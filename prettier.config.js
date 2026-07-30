// @ts-check
/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  vueIndentScriptAndStyle: false,
  htmlWhitespaceSensitivity: 'strict',
  overrides: [
    {
      files: '*.md',
      options: { printWidth: 80, proseWrap: 'always' },
    },
    {
      files: '*.{json,yml,yaml}',
      options: { singleQuote: false },
    },
    {
      files: '*.rs',
      options: { tabWidth: 4, printWidth: 100 },
    },
  ],
};
