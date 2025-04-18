// eslint-disable-next-line no-undef
module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
        parserOpts: {
            headerPattern: /^\[(?<type>feat|fix|docs|style|refactor|perf|test|chore)\]\s(?<subject>.+)$/,
            headerCorrespondence: ['type', 'subject'],
        },
    },
    rules: {
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'],
        ],
        'subject-empty': [2, 'never'],
        'scope-empty': [0],
        'subject-case': [0],
        'header-max-length': [2, 'always', 72],
    },
};
