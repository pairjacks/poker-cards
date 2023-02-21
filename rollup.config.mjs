import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc';
import dts from 'rollup-plugin-dts';

const extensions = ['.ts', '.js'];

/** @type {import("rollup").RollupOptions} */
export default [
  {
    input: './src/index.ts',
    output: [
      { file: './dist/index.js', format: 'cjs' },
      { file: './dist/index.esm.js', format: 'es' },
    ],
    plugins: [resolve({ extensions }), commonjs(), swc.default()],
  },
  {
    input: './tmp/index.d.ts',
    output: [{ file: './dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
