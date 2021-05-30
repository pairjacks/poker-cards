module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        targets: { node: '12', browsers: 'last 2 versions, > 2%' },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
};
