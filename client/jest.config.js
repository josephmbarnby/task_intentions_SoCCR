module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["jest-canvas-mock"],
  roots: ["test"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/test/__mocks__/styles.js",
    "^src(.*)$": "<rootDir>/src$1",
    "^test(.*)$": "<rootDir>/test$1",
  },
};
