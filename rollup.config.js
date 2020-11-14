import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { main } from './package.json';

export default {
  input: main,
  external: ['tmi.js', 'dotenv'],
  output: {
    dir: 'build',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    terser({ format: { comments: false } }),
  ],
};