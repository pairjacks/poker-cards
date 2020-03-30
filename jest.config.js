module.exports = {
  verbose: true,
  testRegex: '^.+\\.test\\.[jt]s?$',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '^types.ts$'],
};
