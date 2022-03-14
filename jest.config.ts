import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
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

export default config;
