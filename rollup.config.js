import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import postcssNested from 'postcss-nested'

// `npm run build` -> `production` is true
// `npm run local` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default [
  {
    input: 'javascripts/application.js',
    output: {
      file: 'public/assets/javascript/application.js',
      format: 'iife', // immediately-invoked function expression — suitable for <script> tags
      sourcemap: false
    },
    plugins: [
      resolve(),
      commonjs(),
      production && terser() // minify, but only in production
    ]
  },
  {
    input: 'styles/application.scss',
    output: {
      file: 'public/assets/styles/application'
    },
    plugins: [
      postcss({
        extract: 'application.css',
        minimize: production,
        plugins: [postcssNested]
      })
    ]
  }
]
