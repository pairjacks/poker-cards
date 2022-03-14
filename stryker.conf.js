module.exports = {
  mutate: [
    'src/**/*.ts',
    '!src/**/*@(.test|.spec|Spec).ts',
    '!src/**/types.ts',
    '!src/**/constants.ts',
    '!src/**/__fixtures__/*',
  ],
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'all',
  jest: {
    projectType: 'custom',
    config: './jest.config.ts',
    enableFindRelatedTests: true,
  },
};
