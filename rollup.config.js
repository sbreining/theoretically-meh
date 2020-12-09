import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import typescriptPaths from 'rollup-plugin-typescript-paths';
import { main } from './package.json';

export default {
  input: main,
  external: ['axios', 'tmi.js', 'dotenv', 'mysql', 'typeorm'],
  output: {
    dir: 'build',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    typescriptPaths(),
    terser({ format: { comments: false } }),
  ],
};