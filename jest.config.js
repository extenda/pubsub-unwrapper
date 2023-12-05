module.exports = {
  moduleFileExtensions: [
    "js",
    "json"
  ],
  rootDir: ".",
  testRegex: "__tests__",
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: [
    'lcov',
    'text',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'test-results',
        outputName: 'sonar-report.xml',
      },
    ],
  ],
  testEnvironment: 'node',
};
