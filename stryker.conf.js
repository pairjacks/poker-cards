module.exports = (config) => {
  config.set({
    mutate: [
      'src/**/*.ts',
      '!src/**/*@(.test|.spec|Spec).ts',
      '!src/**/types.ts',
      '!src/**/constants.ts',
      '!src/**/__fixtures__/*',
    ],
    mutator: 'typescript',
    testRunner: 'jest',
    reporters: ['progress', 'clear-text', 'html'],
    coverageAnalysis: 'off',
    jest: {
      projectType: 'custom',
      config: require('./jest.config.js'),
      enableFindRelatedTests: true,
    },
  });
};
