module.exports = ({ env }) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        targets: { node: '10', browsers: 'last 2 versions, > 2%' },
        ...(env('test')
          ? { modules: 'commonjs', useBuiltIns: false }
          : { modules: false, useBuiltIns: 'usage', corejs: 3 }),
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
});
