// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    extends: [
        'plugin:node/recommended'
    ],
    rules: {
        'node/no-missing-import': [
            'error',
            {
                allowModules: ['types'],
                tryExtensions: ['.ts']
            }
        ],
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-unsupported-features/es-syntax': 'off'
    }
});