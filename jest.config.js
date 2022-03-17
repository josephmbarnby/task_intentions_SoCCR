const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/test/__mocks__/styles.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  },
};
