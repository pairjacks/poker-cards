module.exports = {
  mutate: [
    'src/**/*.ts',
    '!src/**/*@(.test|.spec|Spec).ts',
    '!src/**/types.ts',
    '!src/**/constants.ts',
    '!src/**/__fixtures__/*',
  ],
  plugins: ['@stryker-mutator/jest-runner'], 
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'all',
  jest: {
    projectType: 'custom',
    config: require('./jest.config.js'),
    enableFindRelatedTests: true,
  },
};
