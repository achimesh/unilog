// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-interface': 'off'
    },
    overrides: [
        {
            files: ['.eslintrc.js', 'scripts/**'],
            rules: {
                'no-undef': 'off'
            }
        }
    ]
});