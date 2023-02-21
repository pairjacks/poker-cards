/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  transform: { '^.+\\.[jt]s$': '@swc/jest' },
  testRegex: '^.+\\.test\\.[jt]s?$',
  collectCoverageFrom: ['src/**/*'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__fixtures__/',
    '^types.ts$',
  ],
};

module.exports = config;
