/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import path from 'path';

export default {
    clearMocks: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
    ],
    globals: {
        __IS_DEV__: true,
        __API__: '',
        __PROJECT__: 'jest',
    },
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    modulePaths: [
        '<RootDir>src',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    },
    rootDir: '../../',
    testEnvironment: 'jsdom',
    testMatch: [
        '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
    ],
    transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
    reporters: [
        'default',
        ['jest-html-reporters', {
            publicPath: '<rootDir>/report/unit',
            filename: 'report.html',
            openReport: true,
            inlineSource: true,
        }],
    ],
};
