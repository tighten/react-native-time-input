module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    cacheDirectory: './cache',
    coveragePathIgnorePatterns: ['./app/utils/vendor'],
    coverageThreshold: {
        global: {
            statements: 80,
        },
    },
    transform: { '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js' },
};
