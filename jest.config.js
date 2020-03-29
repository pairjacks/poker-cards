module.exports = {
  verbose: true,
  testRegex: '^.+\\.test\\.[jt]s?$',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};
