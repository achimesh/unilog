// @ts-check
const { defineConfig } = require('eslint-define-config');

const global = ['console'];

const domGlobals = ['window', 'document'];

const nodeJSGlobals = [
    'process', 'Buffer', 'TextDecoder', 'TextEncoder', 'URLSearchParams', 'URL'
];

const nodeJSModules = [
    "assert", "buffer", "child_process", "cluster", "crypto", "dgram", "dns",
    "domain", "events", "freelist", "fs", "http", "https", "module", "net", "os",
    "path", "punycode", "querystring", "readline", "repl", "smalloc", "stream", "string_decoder",
    "sys", "timers", "tls", "tracing", "tty", "url", "util", "vm", "zlib", "console", "process"
];

module.exports = defineConfig({
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
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
        "no-restricted-globals": [
            "error",
            ...[].concat(global, domGlobals, nodeJSGlobals).map(name => {
                if (global.includes(name)) {
                    return {
                        name: name,
                        message: 'Environment global objects should be used inside env folder'
                    };
                }
                else if (domGlobals.includes(name)) {
                    return {
                        name: name,
                        message: 'DOM global objects should be used inside env/browser folder'
                    };
                }
                else if (nodeJSGlobals.includes(name)) {
                    return {
                        name: name,
                        message: 'NodeJS global objects should be used inside env/node folder'
                    };
                }
            })
        ],
        'node/no-restricted-import': [
            'error',
            [{
                name: nodeJSModules,
                message: 'NodeJS modules should be used inside env/node folder'
            }]
        ],
        'node/no-restricted-require': [
            'error',
            [{
                name: nodeJSModules,
                message: 'NodeJS modules should be used inside env/node folder'
            }]
        ],
        'node/no-missing-import': [
            'error',
            {
                allowModules: ['types'],
                tryExtensions: ['.ts']
            }
        ],
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-interface': 'off'
    },
    overrides: [
        {
            files: ['src/env/node/**'],
            rules: {
                'node/no-restricted-import': 'off',
                'node/no-restricted-require': 'off'
            }
        }
    ]
});