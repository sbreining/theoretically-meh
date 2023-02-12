export default {
  // Stop running tests after `n` failures
  bail: 1,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "<rootDir>/coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index.ts",
    "<rootDir>/src/database/*",
    "<rootDir>/src/types/*"
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "babel",

  // This will be used to configure minimum threshold enforcement for coverage results.
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // A list of paths to modules that run some code to configure or set up the testing environment.
  setupFiles: ["dotenv/config"],

  // The test environment that will be used for testing
  testEnvironment: "node",
};
