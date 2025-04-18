// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    settings: { react: { version: 'detect' } },
    rules: {
        'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    },
};
