module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        camelcase: 'off',
        // eslint-disable-next-line no-dupe-keys
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    },
};
