module.exports = ({ env }) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        targets: { node: '10', browsers: 'last 2 versions, > 2%' },
        useBuiltIns: 'usage',
        corejs: 3,
        modules: env('test') ? 'commonjs' : false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
});
