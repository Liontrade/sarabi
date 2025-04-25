module.exports = {
    rootDir: '.',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts',
    ],
    testMatch: [
        '<rootDir>/src/**/*.(test|spec).ts?(x)',
    ],
    moduleNameMapper: {
        // CSS → identity-obj-proxy
        '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
        // Obrazki → prosty mock
        '^.+\\.(png|jpe?g|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
