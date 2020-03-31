import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';

const extensions = ['.ts', '.js'];

export default {
  input: './src/index.ts',
  output: [
    { file: './dist/index.js', format: 'cjs' },
    { file: './dist/index.module.js', format: 'es' },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs({ include: 'node_modules/**' }),
    typescript(),
    babel({
      extensions,
      runtimeHelpers: true,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
    }),
    cleanup({ comments: ['license', 'jsdoc'], maxEmptyLines: 1 }),
  ],
  external: ['random-number-csprng'],
};
